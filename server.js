const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const moment = require('moment');
const path = require('path');
const iotHubClient = require('./IoThub/iot-hub.js');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res/*, next*/) {
  res.redirect('/');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      try {
        console.log('sending data ' + data);
        client.send(data);
      } catch (e) {
        console.error(e);
      }
    }
  });
};

var iotHubReader = new iotHubClient(process.env['Azure.IoT.IoTHub.ConnectionString'], process.env['Azure.IoT.IoTHub.ConsumerGroup']);
iotHubReader.startReadMessage(function (obj, date) {
  try {
    console.log(date);
    date = date || Date.now()
    wss.broadcast(JSON.stringify(Object.assign(obj, { time: moment.utc(date).format('YYYY:MM:DD[T]hh:mm:ss') }, {compressor_on_time: ontime(obj.signal)}, 
    {relativehumidity: relativehumidity(obj.temperature, 7)})));
  } catch (err) {
    console.log(obj);
    console.error(err);
  }
});

var port = normalizePort(process.env.PORT || '3000');
server.listen(port, function listening() {
  console.log('Listening on %d', server.address().port);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

//A function to record how long the compressor has been on 
var startTime = new Date() , endTime = new Date(), time_diff = 0, prev_signal = 0 ; 
function ontime (signal){
  if (prev_signal = 0) {
    if (signal = 0){
      prev_signal = 0;
      return 0;
    } else {
      startTime = Date.now();
      prev_signal = 1;
      return 0;
    }
  } else {
    if (signal = 0){
      prev_signal = 0;
      return 0;
    } else {
      endTime = Date.now();
      time_diff = Math.round((endTime - startTime)/1000) ;
      prev_signal = 1;
      return (time_diff);
    }
  }    
}

// Calculate Relative humidity using Temperature at a certain dewpoint
//---> reference https://en.wikipedia.org/wiki/Dew_point
function relativehumidity(t, dewpoint) {
  var b = 18.678 ;
  var c = 257.14 ; //in Celsius
  var d = 234.5 ; // in Celsius
  var t_dp = dewpoint ; // in Celsius

  var A = Math.exp((b*t_dp)/(c+t_dp)) ; 
  var B = Math.exp((b-(t/d))*(t/(c+t))) ;
  return ((A/B)*100)
  }