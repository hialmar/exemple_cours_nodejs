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

// importe le constructeur Sequelize du module sequelize
const { Sequelize } = require('sequelize');

// se connecte à mysql
const sequelize = new Sequelize('mysql://root:root@localhost:8889/miage');

// récupère la fonction qui initialise les modèles de données
const initModels = require("./models/init-models");
// initialise les modèles
const models = initModels(sequelize);

// vérifie si un attribut est présent
function estPresent(attribut) {
    return attribut !== undefined;
}

// route pour la méthode POST : création d'une personne
app.post('/carnet', async function(req,res) {
    console.log(req.body);

    // on vérifie que le body a bien tous les attributs
    if(estPresent(req.body.nom) && estPresent(req.body.prenom) &&
        estPresent(req.body.adresse) && estPresent(req.body.codepostal) &&
        estPresent(req.body.ville))
    {
        // on vérifie s'il est déjà présent
        let personne = await models.carnetadresse.findOne({ where: {nom:req.body.nom}});
        // si la personne existait
        if (personne !== null) {
            // on renvoie une erreur 400
            res.status(400).send('Il y a déjà quelqu\'un avec ce nom');
        } else {
            // on ajoute la date de modif
            req.body.dernieremodif = Date.now();
            // on crée une nouvelle personne
            personne = models.carnetadresse.build(req.body);
            // on la sauve dans la BD
            await personne.save();
            // on renvoie un message
            res.send('Personne ajoutée');
        }
    } else {
        // on envoie une erreur 400
        res.status(400).send('Il manque des informations');
    }
});

// route qui retourne tout le carnet
app.get('/carnet', async function(req,res) {
    // on récupère toutes les personnes
    const personnes = await models.carnetadresse.findAll();
    // s'il y en a
    if (personnes !== null) {
        // on les renvoie au format JSON
        res.json(personnes);
    } else {
        // on renvoie une erreur 404
        res.status(404).send('Il n\'y a personne dans le carnet');
    }
});

// route qui retourne un élément du carnet
app.get('/carnet/:nom', async function(req,res) {
    // on cherche la personne
    const personne = await models.carnetadresse.findOne({ where: {nom:req.params.nom}});
    // si elle existe
    if (personne !== null) {
        // on la renvoie au format JSON
        res.json(personne);
    } else {
        // on renvoie une erreur 404
        res.status(404).send('Il n\'y a personne de ce nom dans le carnet');
    }
});

// route pour effacer un élément du carnet
app.delete('/carnet/:nom', function(req,res) {
    // on demande l'effacement
    models.carnetadresse.destroy({ where: {nom:req.params.nom}});
    // on renvoie un message
    res.send('Effacement ok');
});

// route pour modifier un élément du carnet (sur un PUT)
app.put('/carnet/:nom', async function(req,res) {
    console.log(req.body);
    // on vérifie que tout est bien précisé sur la requête
    if(estPresent(req.params.nom) && estPresent(req.body.prenom) &&
        estPresent(req.body.adresse) && estPresent(req.body.codepostal) &&
        estPresent(req.body.ville))
    {
        // on cherche la personne
        if(await models.carnetadresse.findOne({ where: {nom:req.params.nom}})) {
            // on met à jour la date
            req.body.dernieremodif = Date.now();
            // on met à jour la personne dans la BD
            await models.carnetadresse.update(req.body, { where: {nom:req.params.nom}});
            // on envoie un message
            res.send('Modification ok');
        } else {
            // on renvoie une erreur 404
            res.status(404).send('Il n\'y a personne de ce nom dans le carnet');
        }
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
    sequelize.close();

    // on ferme l'app
    server.close(() => console.log("Arrêt"));
});

// gestion du signal SIGTERM pour l'arrêt
process.on('SIGTERM', function() {
    console.log("Demande d'arrêt par SIGTERM");

    // on ferme la connexion au SGBD
    sequelize.close();

    // on ferme l'app
    server.close(() => console.log("Arrêt"));
});
