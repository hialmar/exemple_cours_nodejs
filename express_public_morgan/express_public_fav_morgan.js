var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var favicon = require('serve-favicon'); // Charge le middleware de favicon

var app = express();

app.use(morgan('combined')); // Active le middleware de logging

app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)

app.use(favicon(__dirname + '/public/favicon.ico')); // Active la favicon indiquée

app.get('/', function(req,res) {
    res.send('Hello World!');
})

app.use(function(req, res){ // Répond enfin
    res.send('Error 404');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
