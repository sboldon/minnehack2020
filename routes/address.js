const express = require('express');
const path = require('path');
const { spawn } = require('child_process');

function runMaps() {
  return spawn('python', [
    '-u',
    path.join(__dirname, '../location-services/location.py'),
  ]);
}

function runScript() {
  return spawn('python', [
    '-u',
    path.join(__dirname, '../location-services/child-test.py'),
    '--foo',
    'some value for foo',
  ]);
}

const router = express.Router();
router.get('/', (req, res, next) => {
  // const python = runMaps();

  const python = runScript();

  python.stdout.on('data', data => {
    console.log(`data:${data}`);
  });
  python.stderr.on('data', data => {
    console.log(`error:${data}`);
  });
  python.stderr.on('close', () => {
    console.log('Closed');
  });

  res.send('ok!');
});

module.exports = router;
