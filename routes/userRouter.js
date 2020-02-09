const express = require('express');
const admin = require('firebase-admin');
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
  db.collection('users')
    .doc(req.body.uid)
    .set(req.body.location);

  res.send('location updated');
});

router.get('/nearby-users', (req, res) => {
  console.log('dummy-line');
});

// function getBoundingBox(lat, lng) {
//   const maxLat
// }

module.exports = router;
