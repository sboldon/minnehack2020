const express = require('express');
const path = require('path');
// const mongoose = require('mongoose');
require('dotenv').config();
const testAPIRouter = require('./routes/test-api');
const addressRouter = require('./routes/address');

const app = express();
const port = process.env.PORT || 80;

app.use(express.json()); // essentially bodyParser

// API ROUTES //
app.use('/testAPI', testAPIRouter);
app.use('/address', addressRouter);

// PRODUCTION BUILD //
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build'))); // serve static files from React
  app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/build/index.html`));
  });
}

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});

var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://notional-plate-266304.firebaseio.com"
});