// importe le module express
const express = require('express');
// crée l'application
const app = express();

// inclusion du plugin standard qui permet de récupérer des données d'un formulaire HTML POST
app.use(express.urlencoded({extended: true}))
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
app.post('/carnet', async function (req, res) {
    try {
        console.log(req.body);
        // on vérifie que le body a bien tous les attributs
        if (estPresent(req.body.nom) && estPresent(req.body.prenom) &&
            estPresent(req.body.adresse) && estPresent(req.body.codepostal) &&
            estPresent(req.body.ville)) {
            // on appelle la méthode ajouterPersonne de carnet
            if (await carnet.ajouterPersonne(req.body.nom, req.body.prenom, req.body.adresse, req.body.codepostal, req.body.ville)) {
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
    } catch (e) {
        res.status(500).send('Erreur interne serveur ');
        console.log(e);
    }
});

// route qui retourne tout le carnet
app.get('/carnet', async function (req, res) {
    try {// on le renvoie au format JSON
        res.json(await carnet.recupererCarnet());
    } catch (e) {
        res.status(500).send('Erreur interne serveur ');
        console.log(e);
    }
});

// route qui retourne un élément du carnet
app.get('/carnet/:nom', async function (req, res) {
    try {
        // on appelle la méthode recupererPersonne de carnet
        let personne = await carnet.recupererPersonne(req.params.nom);
        // si la personne existe
        if (personne !== null) {
            // on la renvoie au format JSON
            res.json(personne);
        } else {
            // on envoie une erreur 404
            res.status(404).send("La personne n'existe pas");
        }
    } catch (e) {
        res.status(500).send('Erreur interne serveur ');
        console.log(e);
    }
});

// route pour effacer un élément du carnet
app.delete('/carnet/:nom', function (req, res) {
    try {    // on le supprime du carnet
        carnet.supprimerPersonne(req.params.nom);
        // on renvoie un message au client
        res.send("Personne supprimée du carnet");
    } catch (e) {
        res.status(500).send('Erreur interne serveur ');
        console.log(e);
    }
});

// route pour modifier un élément du carnet (sur un PUT)
app.put('/carnet/:nom', async function (req, res) {
    try {
        console.log(req.body);
        // on vérifie que tout est bien précisé sur la requête
        if (estPresent(req.params.nom) && estPresent(req.body.prenom) &&
            estPresent(req.body.adresse) && estPresent(req.body.codepostal) &&
            estPresent(req.body.ville)) {
            if (await carnet.estPresent(req.params.nom)) {
                // on appelle la méthode modifierPersonne du carnet
                carnet.modifierPersonne(req.params.nom, req.body.prenom, req.body.adresse, req.body.codepostal, req.body.ville);
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

    } catch (e) {
        res.status(500).send('Erreur interne serveur ');
        console.log(e);
    }

});


// l'app écoute le port 3000
let server = app.listen(3000, function () {
    console.log('App en écoute sur le port 3000!');
});

// gestion du signal SIGINT pour l'arrêt
process.on('SIGINT', function () {
    console.log("Demande d'arrêt par SIGINT");

    // on ferme la connexion au SGBD
    carnet.fermerConnexionSGBD();

    console.log('Arrêt du serveur...');

    // on arrête le serveur de l'app
    server.close(() => console.log("Fait"));
});

// gestion du signal SIGTERM pour l'arrêt
process.on('SIGTERM', function () {
    console.log("Demande d'arrêt par SIGTERM");

    // on ferme la connexion au SGBD
    carnet.fermerConnexionSGBD();

    console.log('Arrêt du serveur...');

    // on arrête le serveur de l'app
    server.close(() => console.log("Fait"));
});

// Stocke tous les sockets ouverts
let sockets = {}, nextSocketId = 0;
server.on('connection', function (socket) {
    // Stocke le nouveau socket
    const socketId = nextSocketId++;
    sockets[socketId] = socket;
    console.log('socket', socketId, 'ouvert');

    // Enlève le socket quand il est fermé
    socket.on('close', function () {
        console.log('socket', socketId, 'fermé');
        delete sockets[socketId];
    });

    // Précise un timeout de 4s sur le socket
    // Il faut probablement augmenter cette valeur pour un vrai serveur
    socket.setTimeout(4000);
});
