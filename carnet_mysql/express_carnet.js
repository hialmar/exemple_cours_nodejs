// importe le module express
const express = require('express');

// crée l'application
const app = express();

// inclusion du plugin standard qui permet de récupérer des données d'un formulaire HTML POST
app.use(express.urlencoded({ extended: true }))
// inclusion du plugin standard qui permet de récupérer des objets envoyés au format JSON pour un POST ou un PUT
app.use(express.json());

// Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
app.use(express.static(__dirname + '/public'));

// importe la classe Carnet depuis le module carnet
const Carnet = require('./carnet');

// création du carnet
const carnet = new Carnet();

// vérifie si un attribut est présent
function estPresent(attribut) {
    return attribut !== undefined;
}

// route pour la méthode POST : création d'une personne
app.post('/carnet', function(req,res) {
    console.log(req.body);
    // on vérifie que le body a bien tous les attributs
    if(estPresent(req.body.nom) && estPresent(req.body.prenom) &&
        estPresent(req.body.adresse) && estPresent(req.body.codepostal) &&
        estPresent(req.body.ville))
    {
        // on appelle la méthode ajouterPersonne de carnet
        carnet.ajouterPersonne(req.body.nom, req.body.prenom, req.body.adresse, req.body.codepostal, req.body.ville, res);
    } else {
        // on renvoie une erreur 400
        res.status(400).send('Il manque des informations');
    }
});

// route qui retourne tout le carnet
app.get('/carnet', function(req,res) {
    // la méthode de carnet fait tout le travail
    carnet.renvoyerCarnet(res);
});

// route qui retourne un élément du carnet
app.get('/carnet/:nom', function(req,res) {
    // on délégue à la méthode de carnet
    carnet.recupererPersonne(req.params.nom, res);
});

// route pour effacer un élément du carnet
app.delete('/carnet/:nom', function(req,res) {
    // on délégue à la méthode de carnet
    carnet.supprimerPersonne(req.params.nom, res);
});

// route pour modifier un élément du carnet (sur un PUT)
app.put('/carnet/:nom', function(req,res) {
    console.log(req.body);
    // on vérifie que tout est bien précisé sur la requête
    if(estPresent(req.body.nom) && estPresent(req.body.prenom) &&
        estPresent(req.body.adresse) && estPresent(req.body.codepostal) &&
        estPresent(req.body.ville))
    {
        // on appelle la méthode modifierPersonne du carnet
        carnet.modifierPersonne(req.body.nom, req.body.prenom, req.body.adresse, req.body.codepostal, req.body.ville, res);
    } else {
        // on renvoie une erreur 400
        res.status(400).send('Il manque des informations');
    }
});

// l'app écoute le port 3000
let server = app.listen(3000, function () {
    console.log('App en écoute sur le port 3000!');
});

// gestion du signal SIGINT pour l'arrêt
process.on('SIGINT', function() {
    console.log("Demande d'arrêt par SIGINT");

    // on ferme la connexion au SGBD
    carnet.fermer();

    // on ferme l'app
    server.close(() => console.log("Arrêt"));
});

// gestion du signal SIGTERM pour l'arrêt
process.on('SIGTERM', function() {
    console.log("Demande d'arrêt par SIGTERM");

    // on ferme la connexion au SGBD
    carnet.fermer();

    // on ferme l'app
    server.close(() => console.log("Arrêt"));
});
