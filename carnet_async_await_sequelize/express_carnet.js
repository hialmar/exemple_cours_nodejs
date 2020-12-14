let express = require('express');
let app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.json()); // inclusion du plugin pour parser du JSON
app.use(bodyParser.urlencoded()); // inclusion du plugin pour récupérer des données d'un formulaire HTML POST

app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mysql://root:root@localhost:8889/miage') // Example for postgres

var initModels = require("./models/init-models");
var models = initModels(sequelize);

function estPresent(attribut) {
    return attribut !== undefined;
}

app.post('/carnet', async function(req,res) {
    console.log(req.body);
    if(estPresent(req.body.nom) && estPresent(req.body.prenom) &&
        estPresent(req.body.adresse) && estPresent(req.body.codepostal) &&
        estPresent(req.body.ville))
    {
        let personne = await models.carnetadresse.findOne({ where: {nom:req.body.nom}});
        if (personne !== null) {
            res.status(400).send('Il y a déjà quelqu\'un avec ce nom');
        } else {
            req.body.dernieremodif = Date.now();
            personne = models.carnetadresse.build(req.body);
            await personne.save();
            res.send('Personne ajoutée');
        }
    } else {
        res.status(400).send('Il manque des informations');
    }
});

app.get('/carnet', async function(req,res) {
    let personnes = await models.carnetadresse.findAll();
    if (personnes !== null) {
        res.json(personnes);
    } else {
        res.status(404).send('Il n\'y a personne dans le carnet');
    }
});

app.get('/carnet/:nom', async function(req,res) {
    let personne = await models.carnetadresse.findOne({ where: {nom:req.params.nom}});
    if (personne !== null) {
        res.json(personne);
    } else {
        res.status(404).send('Il n\'y a personne de ce nom dans le carnet');
    }
});

app.delete('/carnet/:nom', function(req,res) {
    models.carnetadresse.destroy({ where: {nom:req.params.nom}});
    res.send('Effacement ok');
});

app.put('/carnet/:nom', async function(req,res) {
    console.log(req.body);
    if(estPresent(req.body.nom) && estPresent(req.body.prenom) &&
        estPresent(req.body.adresse) && estPresent(req.body.codepostal) &&
        estPresent(req.body.ville))
    {
        if(await models.carnetadresse.findOne({ where: {nom:req.params.nom}})) {
            await models.carnetadresse.update(req.body, { where: {nom:req.params.nom}});
            res.send('Modification ok');
        } else {
            res.status(404).send('Il n\'y a personne de ce nom dans le carnet');
        }
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
