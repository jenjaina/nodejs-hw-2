// HW: keypress module follow readme log up, down, left, right when you press your arrow keys
// Make Web server push your directions via socket.io to the browser and display the direction command

// Set up Web server
var app = require('express')();
var server = require('http').Server(app);
var port = process.env.PORT || 3002;

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/site/index.html');
});

server.listen(port, function () {
  console.log("Listening on "+port);
});

// Set up key logging
var keypress = require('keypress');
keypress(process.stdin);

// Set up socket io
var io = require('socket.io')(server);

io.on('connection', function (socket) {
  socket.on('keyPressed', function (key) {
    io.emit('keypress', key);
  });
});

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  console.log('Received "keypress" of:', key);
  io.emit('keyPressed', key);

  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();