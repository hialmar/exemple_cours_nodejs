let express = require('express');
let app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.json()); // inclusion du plugin pour parser du JSON
app.use(bodyParser.urlencoded()); // inclusion du plugin pour récupérer des données d'un formulaire HTML POST

app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)

const Carnet = require('./carnet');

let carnet = new Carnet();

function estPresent(attribut) {
    return attribut !== undefined;
}

app.post('/carnet', function(req,res) {
    console.log(req.body);
    if(estPresent(req.body.nom) && estPresent(req.body.prenom) &&
        estPresent(req.body.adresse) && estPresent(req.body.codepostal) &&
        estPresent(req.body.ville)) {
        carnet.ajouterPersonne(req.body.nom, req.body.prenom, req.body.adresse, req.body.codepostal, req.body.ville, res);
    } else {
        res.status(400).send('Il manque des informations');
    }
});

app.get('/carnet', function(req,res) {
    carnet.renvoyerCarnet(res);
});

app.get('/carnet/:nom', function(req,res) {
    carnet.recupererPersonne(req.params.nom, res);
});

app.delete('/carnet/:nom', function(req,res) {
    carnet.supprimerPersonne(req.params.nom, res);
});

app.put('/carnet/:nom', function(req,res) {
    console.log(req.body);
    if(estPresent(req.body.nom) && estPresent(req.body.prenom) &&
        estPresent(req.body.adresse) && estPresent(req.body.codepostal) &&
        estPresent(req.body.ville)) {
        carnet.modifierPersonne(req.body.nom, req.body.prenom, req.body.adresse, req.body.codepostal, req.body.ville, res);
    } else {
        res.status(400).send('Il manque des informations');
    }
});

let server = app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

process.on('SIGINT', function() {
    console.log("Demande d'arrêt par SIGINT");

    carnet.fermer();

    server.close(() => console.log("Arrêt"));
});

process.on('SIGTERM', function() {
    console.log("Demande d'arrêt par SIGTERM");

    carnet.fermer();

    server.close(() => console.log("Arrêt"));
});
