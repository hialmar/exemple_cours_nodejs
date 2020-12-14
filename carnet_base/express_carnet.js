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
        if(carnet.ajouterPersonne(req.body.nom, req.body.prenom, req.body.adresse, req.body.codepostal, req.body.ville)) {
            // on renvoit un message au client
            res.send("Ajout ok");
        } else {
            // on renvoie une erreur 400
            res.status(400).send('Il était déjà présent');
        }
    } else {
        // on renvoie une erreur 400
        res.status(400).send('Il manque des informations');
    }
});

// route qui retourne tout le carnet
app.get('/carnet', function(req,res) {
    // on le renvoie au format JSON
    res.json(carnet.carnet);
});

// route qui retourne un élément du carnet
app.get('/carnet/:nom', function(req,res) {
    // on appelle la méthode recupererPersonne de carnet
    let personne = carnet.recupererPersonne(req.params.nom);
    // si la personne existe
    if(personne !== null) {
        // on la renvoie au format JSON
        res.json(personne);
    } else {
        // on envoie une erreur 404
        res.status(404).send("La personne n'existe pas");
    }
});

// route pour effacer un élément du carnet
app.delete('/carnet/:nom', function(req,res) {
    // on le supprime du carnet
    carnet.supprimerPersonne(req.params.nom);
    // on renvoie un message au client
    res.send("Personne supprimée du carnet");
});

// route pour modifier un élément du carnet (sur un PUT)
app.put('/carnet/:nom', function(req,res) {
    console.log(req.body);
    // on vérifie que tout est bien précisé sur la requête
    if(estPresent(req.body.nom) && estPresent(req.body.prenom) &&
        estPresent(req.body.adresse) && estPresent(req.body.codepostal) &&
        estPresent(req.body.ville))
    {
        if(carnet.estPresent(req.body.nom)) {
            // on appelle la méthode modifierPersonne du carnet
            carnet.modifierPersonne(req.body.nom, req.body.prenom, req.body.adresse, req.body.codepostal, req.body.ville);
            // on renvoit un message au client
            res.send("Modification ok");
        } else {
            // on envoie une erreur 404
            res.status(404).send("La personne n'existe pas");
        }
    } else {
        // on renvoie une erreur 400
        res.status(400).send('Il manque des informations');
    }
});


// l'app écoute le port 3000
app.listen(3000, function () {
    console.log('App en écoute sur le port 3000!');
});
