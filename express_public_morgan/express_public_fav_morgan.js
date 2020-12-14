// importation du module express
const express = require('express');
// Charge le middleware de logging
const morgan = require('morgan');
// Charge le middleware de favicon
const favicon = require('serve-favicon');

// création de l'app
const app = express();

// Active le middleware de logging
app.use(morgan('combined'));

// Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
app.use(express.static(__dirname + '/public'));

// Active la favicon indiquée
app.use(favicon(__dirname + '/public/favicon.ico'));

// Route get sur /
app.get('/', function(req,res) {
    res.send('Hello World!');
})

// ajoute la fonction catch all pour les erreurs 404
app.use(function(req, res){
    res.send('Error 404');
});

// L'app tourne sur le port 3000
app.listen(3000, function() {
    console.log('En écoute sur le port 3000!');
});
