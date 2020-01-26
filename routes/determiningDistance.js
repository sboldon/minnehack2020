var loc2 = '2900 S 9th St, Minneapolis, MN 55406, USA'
var reciever = 'tsadpbb@gmail.com'
var address = '2900 S 9th St, Minneapolis, MN 55406, USA'

const { PythonShell } = require('python-shell');
const spawn = require("child_process").spawn;
const pythonProcess = spawn('python',['newlocation.py', address, loc2]);
pythonProcess.stdout.on('data', (data) => {
    if (data) {
        const pythonProcess = spawn('python',['sendgmail.py', reciever, address]);
    }
});