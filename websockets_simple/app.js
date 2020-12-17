// récupération du module express et création de l'app
const app = require('express')();
// création d'un serveur pour l'app
const server = require('http').Server(app);
// récupération de la partie serveur des websockets
const io = require('socket.io')(server);

// le serveur web va fonctionner sur le port 3000
server.listen(3000, function () {
  console.log('Serveur lancé sur le port 3000!');
});

// Renvoie le fichier index.html lors d'une requête sur la racine
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// attend l'événement connection
io.on('connection', function (socket) {
  // envoie un événement custom evt1 avec en paramètre un objet
  socket.emit('evt1', { hello: 'world' });

  // attend un événement custom evt2
  socket.on('evt2', function (data) {
    // affiche le paramètre de l'événement
    console.log(data);
    // diffuse un message à tout le monde
    io.emit('diffusion', { recu: 'par tous'});
  });
});
