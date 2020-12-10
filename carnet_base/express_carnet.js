var express = require('express');
var app = express();

var bodyParser = require('body-parser');
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
        carnet.ajouterPersonne(req.body.nom, req.body.prenom, req.body.adresse, req.body.codepostal, req.body.ville);

        res.send("Ajout ok");
    } else {
        res.status(400).send('Il manque des informations');
    }
});

app.get('/carnet', function(req,res) {
    res.json(carnet.carnet);
});

app.get('/carnet/:nom', function(req,res) {
    let personne = carnet.recupererPersonne(req.params.nom);
    if(personne !== null)
        res.json(personne);
    else
        res.status(404).send("La personne n'existe pas");
});

app.delete('/carnet/:nom', function(req,res) {
    carnet.supprimerPersonne(req.params.nom);
    res.send("Personne supprimée du carnet");
});

app.put('/carnet/:nom', function(req,res) {
    console.log(req.body);
    if(estPresent(req.body.nom) && estPresent(req.body.prenom) &&
        estPresent(req.body.adresse) && estPresent(req.body.codepostal) &&
        estPresent(req.body.ville)) {
        carnet.modifierPersonne(req.body.nom, req.body.prenom, req.body.adresse, req.body.codepostal, req.body.ville);

        res.send("Modification ok");
    } else {
        res.status(400).send('Il manque des informations');
    }
});



app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
