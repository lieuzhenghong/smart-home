var express = require('express');
var app = express();
var http = require('http').Server(app);
const bodyParser = require('body-parser');


// Hardware switch status.
switch_status = true;

app.use('/static', express.static('static'));
app.use(bodyParser.json()); // allows me to call req.body

app.get('/', (req, res) => {
  res.redirect('/static/switch.html');
});
  
app.get('/switch', (req, res) => {
  /*
  TODO: this is the backend. Get the status of the switch
  */
  var status = (req.query.status == 'true');
  console.log('polling electrical components');
  setInterval(()=> {
   if (status != switch_status) {
    console.log('sending response');
    res.json({'switch': switch_status});
  }   
  }, 1000); 
  // This throws the error can't set request headers after they are sent
})

app.put('/switch', (req, res) => {
  /*
  TODO: this is the backend. Change the status of the switch
  Needs error handling if switch does not respond, for example
  Toggle the switch here... then return
  */
  var status = req.body['switch'];
  // toggleHardwareSwitch();
  switch_status = status;
  var success = true;
  if (success) {
    res.json({'success': true, 'status': req.body['switch']});
  }
  else {
    res.json({"success": false})
  }
})

http.listen(5000, function(){
  console.log('listening on *:5000');
});
