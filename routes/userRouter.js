const express = require('express');
const admin = require('firebase-admin');
const geohash = require('ngeohash');
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

// updates db with user's coordinates
router.post('/update-location', (req, res) => {
  const hash = geohash.encode(req.body.location.lat, req.body.location.lng);
  db.collection('users')
    .doc(req.body.uid)
    .set({ location: hash });

  res.send('location updated');
});

router.get('/nearby-users', (req, res) => {
  const { minLat, minLng, maxLat, maxLng } = getBoundingBox(
    JSON.parse(req.query.location)
  );

  const lowerLim = geohash.encode(minLat, minLng);
  const upperLim = geohash.encode(maxLat, maxLng);

  // console.log(lowerLim, upperLim);

  db.collection('users')
    .where('location', '>=', lowerLim)
    .where('location', '<=', upperLim)
    .onSnapshot(snap => {
      snap.forEach(doc => {
        console.log(doc.id, doc.data());
      });
    });

  // console.log(lowerLim, upperLim);
  // console.log(minLat, minLng, maxLat, maxLng);
});

function rad2deg(rad) {
  return rad * (180 / Math.PI);
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function getBoundingBox({ lat, lng }) {
  const radius = 1.60934;
  const earthRad = 6371;
  const maxLat = lat + rad2deg(radius / earthRad);
  const minLat = lat - rad2deg(radius / earthRad);
  const maxLng =
    lng + rad2deg(Math.asin(radius / earthRad) / Math.cos(deg2rad(lat)));
  const minLng =
    lng - rad2deg(Math.asin(radius / earthRad) / Math.cos(deg2rad(lat)));

  return {
    minLat,
    minLng,
    maxLat,
    maxLng,
  };
}

module.exports = router;
