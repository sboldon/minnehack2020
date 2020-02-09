const express = require('express');
const path = require('path');
const testAPIRouter = require('./routes/test-api');
const addressRouter = require('./routes/address');
const userRouter = require('./routes/userRouter');

const app = express();
const port = process.env.PORT || 80;

app.use(express.json()); // essentially bodyParser

// API ROUTES //
app.use('/testAPI', testAPIRouter);
app.use('/address', addressRouter);
app.use('/user', userRouter);

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
