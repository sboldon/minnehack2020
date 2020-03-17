const express = require('express');
const path = require('path');
const testAPIRouter = require('./routes/test-api');
const usersRouter = require('./routes/usersRouter');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // parse req.body JSON

// API ROUTES //
app.use('/testAPI', testAPIRouter);
app.use('/users', usersRouter);

// PRODUCTION BUILD //
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      // force heroku to use https
      res.redirect(`https://${req.header('host')}${req.url}`);
    else next();
  });
  app.use(express.static(path.join(__dirname, 'client/build'))); // serve static files from React
  app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/build/index.html`));
  });
}

app.listen(port, () => {
  console.log(`http server running on port: ${port}`);
});
