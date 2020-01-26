const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const { PythonShell } = require('python-shell');

const router = express.Router();

// function runMaps() {
//   return spawn('python', [
//     '-u',
//     path.join(__dirname, '../location-services/location.py'),
//   ]);
// }

// function runScript() {
//   return spawn('python', [
//     '-u',
//     path.join(__dirname, '../location-services/get-address.py'),
//   ]);
// }

// router.get('/', (req, res, next) => {
//   // const python = runMaps();

//   const python = runScript();

//   python.stdout.on('data', data => {
//     console.log(`data:${data}`);
//   });
//   python.stderr.on('data', data => {
//     console.log(`error:${data}`);
//   });
//   python.stderr.on('close', () => {
//     console.log('Closed');
//   });

//   res.send('ok!');
// });

router.get('/', (req, res, next) => {
  const file = path.join(__dirname, '../location-services/get-address.py');
  const packageName = 'googlemaps';
  const options = {
    args: [packageName],
    pythonPath: '/usr/local/bin/python3.7',
  };
  const python = PythonShell.run(file, options, (err, results) => {
    if (err) throw err;
    else console.log(results);
  });

  python.on('message', function(message) {
    // received a message sent from the Python script (a simple "print" statement)
    // res.send(message);
  });

  // end the input stream and allow the process to exit
  python.end(function(err) {
    if (err) {
      throw err;
    }

    console.log('finished');
  });
});

module.exports = router;
