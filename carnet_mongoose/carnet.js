// importe le module mongoose
const mongoose = require('mongoose');

// définit et exporte la classe Carnet
module.exports = class Carnet {

    // constructeur
    constructor() {
        // se connecte à la base mongodb test
        mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
        // crée un modèle de document pour le Carnet d'Adresse
        this.CarnetAdresse = mongoose.model('CarnetAdresse', { nom: String, prenom: String, adresse: String,
            codePostal: Number, ville: String });
    }

    // méthode pour renvoyer tout le carnet sur la réponse res en paramètre
    renvoyerCarnet(res) {
        // on cherche tous les documents du modèle
        this.CarnetAdresse.find(function (err, adresses) {
            if (err) return console.error(err);
            console.log(adresses);
            // on renvoie le résultat sous forme de JSON
            res.json(adresses);
        });
    }

    // méthode pour ajouter une personne dans le carnet
    // on renvoie aussi une réponse sur res
    ajouterPersonne(nom, prenom, adresse, codePostal, ville, res) {
        // sauvegarde this pour pouvoir l'utiliser ensuite
        const self = this;
        // cherche si le nom est déjà présent
        this.CarnetAdresse.find({'nom': nom}, function (err, adresses) {
            if (err) return console.error(err);
            // si on n'a rien trouvé
            if(adresses.length === 0) {
                // on crée une nouvelle personne
                const personne = new self.CarnetAdresse({ 'nom': nom, 'prenom': prenom, 'adresse': adresse,
                    'codePostal': codePostal, 'ville': ville });

                // on la sauve dans un document
                personne.save().then(function() {
                    console.log('Nouvelle adresse sauvée');
                    res.send("Ajout ok");
                });
            } else {
                res.send("Déjà présent");
            }
        });
    }

    // methode pour récupérer une personne
    // renvoyée sur res
    recupererPersonne(nom, res) {
        // on cherche la personne
        this.CarnetAdresse.find({'nom': nom}, function (err, adresses) {
            if (err) return console.error(err);
            // s'il y a un résultat au moins
            if (adresses.length !== 0) {
                // renvoie le premier résultat sous forme de JSON
                res.json(adresses[0]);
            } else {
                // retourne une erreur 404
                res.status(404).send("La personne n'existe pas");
            }
        });
    }

    // méthode pour modifier une personne
    // renvoie le résultat sur res
    modifierPersonne(nom, prenom, adresse, codePostal, ville, res) {
        // cherche la personne
        this.CarnetAdresse.find({'nom': nom}, function (err, adresses) {
            if (err) return console.error(err);
            // s'il y a au moins un résultat
            if (adresses.length !== 0) {
                // met à jour les données
                adresses[0].prenom = prenom;
                adresses[0].adresse = adresse;
                adresses[0].codePostal = codePostal;
                adresses[0].ville = ville;
                // sauve le document avec les nouvelles données
                adresses[0].save().then(function() {
                    console.log('Adresse modifiée');
                    res.send("Modification ok");
                });
            } else {
                // renvoie l'erreur 404
                res.status(404).send("La personne n'existe pas");
            }
        });
    }

    // méthode de suppression d'une personne
    // renvoie le résultat sur res
    supprimerPersonne(nom, res) {
        this.CarnetAdresse.deleteOne({'nom': nom}, function (err, adresses) {
            if (err) return console.error(err);
            res.send('Addresse supprimée');
        });
    }

    // méthode de fermeture de la connexion avec mongodb
    fermer() {
        mongoose.disconnect()
    }
}
