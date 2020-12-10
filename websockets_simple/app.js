var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('evt1', { hello: 'world' });
  socket.on('evt2', function (data) {
    console.log(data);
    io.emit('diffusion', { recu: 'par tous'});
  });
});
