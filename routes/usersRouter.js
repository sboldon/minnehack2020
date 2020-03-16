const express = require('express');
const WebSocket = require('ws');
const admin = require('firebase-admin');
const geohash = require('ngeohash');
const getBoundingBox = require('../location-services/proximity_helpers');
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert({
    type: 'service_account',
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey:
      process.env.NODE_ENV === 'production'
        ? JSON.parse(process.env.PRIVATE_KEY)
        : process.env.PRIVATE_KEY,
  }),
  databaseURL: process.env.DB_URL,
});

const db = admin.firestore();
const router = express.Router();

// create document for new user in db
router.post('/:uid', (req, res) => {
  const user = db.collection('users').doc(req.params.uid);
  user
    .get()
    .then(doc => {
      if (!doc.exists) {
        user.set({ location: '', pulseActive: false });
        res.status(201).send('account created');
      } else {
        res.status(204).send();
      }
    })
    .catch(e => {
      res.status(503).send(e);
    });
});

// update user's location as a geohashed string
router.put('/:uid/location', (req, res) => {
  const { lat, lng } = req.body.location;
  const hash = geohash.encode(lat, lng);

  db.collection('users')
    .doc(req.params.uid)
    .update({ location: hash });

  res.status(200).send('location updated!');
});

// update user's pulseActive state
router.put('/:uid/pulse-state', (req, res) => {
  db.collection('users')
    .doc(req.params.uid)
    .update({ pulseActive: req.body.isActive });

  res.status(200).send(`pulse active: ${req.body.isActive}`);
});

// contact users within 1mi radius via websockets,
// returns bounding box coords to client
router.post('/:uid/emergency', (req, res) => {
  const { minLat, minLng, maxLat, maxLng } = getBoundingBox(req.body.location);
  const lowerLim = geohash.encode(minLat, minLng);
  const upperLim = geohash.encode(maxLat, maxLng);

  console.log(lowerLim, upperLim);

  // users with in radius – excluding anyone with active pulse
  const nearbyUsers = db
    .collection('users')
    .where('pulseActive', '==', false)
    .where('location', '>=', lowerLim)
    .where('location', '<=', upperLim);

  nearbyUsers
    .get()
    .then(snap => {
      if (snap.empty) {
        res.status(404).send('Unable to find nearby users');
      } else {
        // on success
        snap.forEach(doc => {
          console.log(doc.id, doc.data());
        });
        res
          .status(200)
          .send(JSON.stringify({ minLat, minLng, maxLat, maxLng }));
      }
    })
    .catch(e => {
      res.status(503).send(e);
    });

  console.log('-----');
  // db.collection('users')
  //   .where('location', '>=', lowerLim)
  //   .where('location', '<=', upperLim)
  //   .onSnapshot(snap => {
  //     snap.forEach(doc => {
  //       console.log(doc.id, doc.data());
  //       const msg = {
  //         newUser: false,
  //         fromUser: req.params.uid,
  //         toUser: doc.id,
  //         location: doc.data(),
  //       };
  //       // if (msg.fromUser !== msg.toUser) ws.send(JSON.stringify(msg));
  //     });
  //     console.log();
  //   });
});

module.exports = router;
