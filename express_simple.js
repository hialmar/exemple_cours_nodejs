// importation du module express
var express = require('express');

// création de l'application web
var app = express();

// gestion d'un get sur la racine du serveur
app.get('/', function (req, res) {
  // envoie le message au client
  res.send('Hello World!');
});

// gestion d'un get sur le chemin /home
app.get('/home', function(req, res) {
  // envoie le message au client
  res.send('Hello Home');
});

// lancement de l'application web sur le port 3000
app.listen(3000, function () {
  // affichage du numéro de port
  console.log('L\'app écoute sur le port 3000!');
});
