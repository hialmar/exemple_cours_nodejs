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

// importe la classe Bibliotheque depuis le module biblio
const Bibliotheque = require('./biblio');

// création de la biblio
const biblio = new Bibliotheque();

// vérifie si un attribut est présent
function estPresent(attribut) {
    return attribut !== undefined;
}

// route pour la méthode POST : création d'un livre
app.post('/biblio', function(req,res) {
    console.log(req.body);
    // on vérifie que le body a bien tous les attributs
    if(estPresent(req.body.titre) && estPresent(req.body.auteur) &&
        estPresent(req.body.annee))
    {
        // on appelle la méthode ajouterLivre de biblio
        if(biblio.ajouterLivre(req.body.titre, req.body.auteur, req.body.annee)) {
            // on renvoie le livre
            res.json(biblio.recupererLivre(req.body.titre));
        } else {
            // on renvoie une erreur 400
            res.status(400).json({erreur:'Il était déjà présent'});
        }
    } else {
        // on renvoie une erreur 400
        res.status(400).json({erreur:'Il manque des informations'});
    }
});

// route qui retourne toute la biblio
app.get('/biblio', function(req,res) {
    // on le renvoie au format JSON
    res.json(biblio.biblio);
});

// route qui retourne un élément de la biblio
app.get('/biblio/:titre', function(req,res) {
    console.log(req.params.titre);
    // on appelle la méthode recupererLivre de biblio
    let livre = biblio.recupererLivre(req.params.titre);
    // si la personne existe
    if(livre !== null) {
        // on la renvoie au format JSON
        res.json(livre);
    } else {
        // on envoie une erreur 404
        res.status(404).json({erreur:"Le livre n'existe pas"});
    }
});

// route pour effacer un élément de la biblio
app.delete('/biblio/:titre', function(req,res) {
    // on le supprime de la biblio
    biblio.supprimerLivre(req.params.titre);
    // on renvoie un message au client
    res.json({});
});

// route pour modifier un élément de la biblio (sur un PUT)
app.put('/biblio/:titre', function(req,res) {
    console.log(req.body);
    // on vérifie que tout est bien précisé sur la requête
    if(estPresent(req.params.titre) && estPresent(req.body.auteur) &&
        estPresent(req.body.annee))
    {
        if(biblio.estPresent(req.params.titre)) {
            // on appelle la méthode modifierLivre de la biblio
            biblio.modifierLivre(req.params.titre, req.body.auteur, req.body.annee);
            // on renvoie un message au client
            res.json(biblio.recupererLivre(req.params.titre));
        } else {
            // on envoie une erreur 404
            res.status(404).json({erreur:"Le livre n'existe pas"});
        }
    } else {
        // on renvoie une erreur 400
        res.status(400).send({erreur:'Il manque des informations'});
    }
});


// l'app écoute le port 3000
app.listen(3000, function () {
    console.log('App en écoute sur le port 3000!');
});
