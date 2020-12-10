var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // inclusion du plugin pour parser du JSON
app.use(bodyParser.urlencoded()); // inclusion du plugin pour récupérer des données d'un formulaire HTML POST

app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)


app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/users/:userId/books/:bookId', function (req, res) {
    res.json(req.params);
    console.log(req.params);
});

app.get('/chemin', function (req, res) {
    res.json(req.query);
    console.log(req.query);
});

app.post('/chemin', function(req,res) {
    res.json(req.body);
    console.log(req.body);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
