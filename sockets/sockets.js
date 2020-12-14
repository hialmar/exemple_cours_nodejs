// importation du module http
var http = require('http');
// importation du module fs : gestion de fichier
var fs = require('fs');
// importation du module ent
// Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
var ent = require('ent');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io')(server);

// attente de l'événement connection
io.sockets.on('connection', function (socket) {
	// attente des événements message
	socket.on('message', function (message) {
		// protège les caractères spéciaux
		message = ent.encode(message);
		// renvoie l'événement message à celui qui nous a envoyé le message
		socket.emit('message', '<p><strong>' + socket.pseudo + '</strong> ' +message+'</p>\n');
		// diffuse le message à tout le monde
    	socket.broadcast.emit('message', '<p><strong>' + socket.pseudo + '</strong> ' +message+'</p>\n');
	});

	// attente d'un message initial avec le pseudo
	socket.on('petit_nouveau', function(pseudo) {
		// protège les caractères spéciaux
    	socket.pseudo = ent.encode(pseudo);
    	// diffuse un message à tout le monde
    	socket.broadcast.emit('message', '<p><i>' + socket.pseudo + ' a rejoint le Chat !</i></p>\n');
	});
});

// Le serveur
server.listen(3000, function () {
	console.log('Le serveur tourne sur le port 3000!');
});
