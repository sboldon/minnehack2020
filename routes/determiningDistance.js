var loc2 = 'whatever'
var reciever = 'ineedit'
var address = 'reallyneedit'

const spawn = require("child_process").spawn;
const pythonProcess = spawn('python',['newlocation.py', address, loc2]);
pythonProcess.stdout.on('data', (data) => {
    if (data) {
        const spawn = require('child_process').spawn;
        const pythonProcess = spawn('python',['sendgmail.py', reciever, address]);
    }
});