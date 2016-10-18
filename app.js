const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
app.use('/', express.static('static'));

function trim(s){ 
  return ( s || '' ).replace( /^\s+|\s+$/g, '' ); 
}

//hardware part
var switch_status = true;

var spawn = require('child_process').spawn;
var py    = spawn('python', ['randombulb.py']);

py.stderr.on('data', (err) => {
  console.log('stderr', err.toString('utf8'));
});
  
py.stdout.on('data', function(data){
  data = data.toString('utf8');
  data = trim(data);
  console.log('I received data: ', data);
  data = (data == 'true');
  if (data != switch_status) {
    status_has_changed(data);
    switch_status = data;  
  }
});

py.stdout.on('end', function(){
  console.log('function has ended');
});


app.get('/', (req, res) => {
  res.redirect('switch-socket.html');
});

// A function called by the hardware poller
function status_has_changed(status) {
  io.emit('get status', status);
}

io.on('connection', (socket) => {
  //This is basically the GET request!
  console.log('connected');
  
  socket.on('get status', (status) => {
    console.log(`GET request received of ${status}`);
    
    if (switch_status !== status) {
      io.emit('get status', switch_status);
    }
    // otherwise, wait for the hardware polling; see status_has_changed
  });

  socket.on('switch status', (status) => {
    console.log('got something');
    console.log(status);
    // Change switch status here
    var success = false;

    // assume it worked
    success = true;

    if (success) {
      io.emit('switch status', status);  
    }
    else {
      io.emit('switch status', switch_status);
    }
  });

  
});

http.listen(5000, function(){
  console.log('listening on *:5000');
});

