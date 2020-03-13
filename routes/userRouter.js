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
    privateKey: process.env.PRIVATE_KEY,
    clientEmail: process.env.CLIENT_EMAIL,
  }),
  databaseURL: process.env.DB_URL,
});

const db = admin.firestore();
const router = express.Router();

// updates db with user's coordinates as a geohashed string
router.post('/update-location', (req, res) => {
  const hash = geohash.encode(req.body.location.lat, req.body.location.lng);
  db.collection('users')
    .doc(req.body.uid)
    .set({ location: hash });

  res.send('location updated');
});

router.get('/nearby-users', (req, res) => {
  const ws = new WebSocket('ws://localhost:5000');

  ws.on('message', data => {
    console.log('client recieved %s', data);
  });

  const { minLat, minLng, maxLat, maxLng } = getBoundingBox(
    JSON.parse(req.query.location)
  );

  const lowerLim = geohash.encode(minLat, minLng);
  const upperLim = geohash.encode(maxLat, maxLng);

  db.collection('users')
    .where('location', '>=', lowerLim)
    .where('location', '<=', upperLim)
    .onSnapshot(snap => {
      snap.forEach(doc => {
        console.log(doc.id, doc.data());
        const msg = {
          newUser: false,
          fromUser: req.query.uid,
          toUser: doc.id,
          location: doc.data(),
        };
        ws.send(JSON.stringify(msg));
      });
    });
});

module.exports = router;
