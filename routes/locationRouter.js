const express = require('express');
const path = require('path');
const admin = require('firebase-admin');

const router = express.Router();
router.get('/', (req, res, next) => {
  console.log(req.body);
  res.send('ok');
});

router.post('/update-location', (req, res, next) => {
  console.log(req.body);
  res.send('ok');
});

// // const auth = path.join(`${__dirname}/notional-plate-266304-firebase-adminsdk-ladun-c714ac8e12.json`);
// // eslint-disable-next-line import/no-dynamic-require
// const serviceAccount = require(auth);
// require('dotenv').config();

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://notional-plate-266304.firebaseio.com',
// });

// const router = express.Router();
// router.get('/', (req, res, next) => {
//   res.send('API is working!');
// });

module.exports = router;
