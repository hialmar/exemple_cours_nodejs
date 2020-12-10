var http = require('http');
var fs = require('fs');
var ent = require('ent'); // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io')(server);

io.sockets.on('connection', function (socket) {
	socket.on('message', function (message) {
		message = ent.encode(message);
		socket.emit('message', '<p><strong>' + socket.pseudo + '</strong> ' +message+'</p>\n');
    	socket.broadcast.emit('message', '<p><strong>' + socket.pseudo + '</strong> ' +message+'</p>\n');
	});
	
	socket.on('petit_nouveau', function(pseudo) {
    	socket.pseudo = ent.encode(pseudo);
    	socket.broadcast.emit('message', '<p><i>' + socket.pseudo + ' a rejoint le Chat !</i></p>\n');
	});
});

server.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
