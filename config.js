const admin = require('firebase-admin');
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
module.exports = db;
