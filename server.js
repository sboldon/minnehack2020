const express = require('express');
const path = require('path');
const WebSocket = require('ws');
const testAPIRouter = require('./routes/test-api');
const addressRouter = require('./routes/address');
const userRouter = require('./routes/userRouter');

const app = express();
const port = process.env.PORT || 5000;

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

const httpServer = app.listen(port, () => {
  console.log(`http server running on port: ${port}`);
});

const wss = new WebSocket.Server({ server: httpServer, clientTracking: true });
const users = {};

wss.clients.add();

wss.on('connection', ws => {
  ws.on('message', data => {
    const msg = JSON.parse(data);
    if (msg.newUser) {
      users[msg.uid] = ws;
    } else {
      users[msg.toUser].send(`${msg.fromUser} is requesting your help`);
    }
    console.log('server received %s', msg);
  });

  ws.send('server reply');
});
