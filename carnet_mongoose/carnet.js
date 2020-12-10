const Personne = require('./personne');
const mongoose = require('mongoose');

module.exports = class Carnet {

    // constructeur
    constructor() {
        mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
        this.CarnetAdresse = mongoose.model('CarnetAdresse', { nom: String, prenom: String, adresse: String,
            codePostal: Number, ville: String });
    }

    renvoyerCarnet(res) {
        this.CarnetAdresse.find(function (err, adresses) {
            if (err) return console.error(err);
            console.log(adresses);
            res.json(adresses);
        });
    }

    ajouterPersonne(nom, prenom, adresse, codePostal, ville, res) {
        let self = this;

        this.CarnetAdresse.find({'nom': nom}, function (err, adresses) {
            if (err) return console.error(err);
            if(adresses.length === 0) {
                const personne = new self.CarnetAdresse({ 'nom': nom, 'prenom': prenom, 'adresse': adresse,
                    'codePostal': codePostal, 'ville': ville });

                personne.save().then(function() {
                    console.log('Nouvelle adresse sauvée');
                    res.send("Ajout ok");
                });
            } else {
                res.send("Déjà présent");
            }
        });
    }

    recupererPersonne(nom, res) {
        this.CarnetAdresse.find({'nom': nom}, function (err, adresses) {
            if (err) return console.error(err);
            if (adresses.length !== 0)
                res.json(adresses[0]);
            else
                res.status(404).send("La personne n'existe pas");
        });
    }

    modifierPersonne(nom, prenom, adresse, codePostal, ville, res) {
        this.CarnetAdresse.find({'nom': nom}, function (err, adresses) {
            if (err) return console.error(err);
            if (adresses.length !== 0) {
                adresses[0].prenom = prenom;
                adresses[0].adresse = adresse;
                adresses[0].codePostal = codePostal;
                adresses[0].ville = ville;
                adresses[0].save().then(function() {
                    console.log('Adresse modifiée');
                    res.send("Modification ok");
                });
            } else {
                res.status(404).send("La personne n'existe pas");
            }
        });
    }

    supprimerPersonne(nom, res) {
        this.CarnetAdresse.deleteOne({'nom': nom}, function (err, adresses) {
            if (err) return console.error(err);
            res.send('Addresse supprimée');
        });
    }

    fermer() {
        mongoose.disconnect()
    }
}
