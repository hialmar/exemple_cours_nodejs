// importe le module express
const express = require('express');

// crée l'app
const app = express();

// inclusion du plugin standard qui permet de récupérer des données d'un formulaire HTML POST
app.use(express.urlencoded({ extended: true }))
// inclusion du plugin standard qui permet de récupérer des objets envoyés au format JSON pour un POST ou un PUT
app.use(express.json());

// Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
app.use(express.static(__dirname + '/public'));

// route get pour la racine
app.get('/', function (req, res) {
    res.send('Hello World!');
});

// exemple de route avec paramètres dans l'URL
app.get('/users/:userId/books/:bookId', function (req, res) {
    // on retourne l'objet au format JSON
    res.json(req.params);
    // on l'affiche
    console.log(req.params);
});

// exemple de route qui traite une query-string (?nom=valeur&nom2=valeur2...
app.get('/chemin', function (req, res) {
    // on retourne l'objet au format JSON
    res.json(req.query);
    // on l'affiche
    console.log(req.query);
});

app.post('/chemin', function(req,res) {
    // on retourne l'objet au format JSON
    res.json(req.body);
    // on l'affiche
    console.log(req.body);
});

// l'app écoute sur le port 3000
app.listen(3000, function () {
    console.log('En écoute sur le port 3000!');
});
