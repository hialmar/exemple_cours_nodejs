var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Salut tout le monde !');
});

process.on('SIGINT', function() {
  console.log("Demande d'arrêt par SIGINT");

  server.close(() => console.log("Arrêt"));
});

process.on('SIGTERM', function() {
  console.log("Demande d'arrêt par SIGTERM");

  server.close(() => console.log("Arrêt"));
});

server.listen(8080);

