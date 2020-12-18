// importe le constructeur Sequelize du module sequelize
const { Sequelize } = require('sequelize');

// récupère la fonction qui initialise les modèles de données
const initModels = require("./models/init-models");


// définit et exporte la classe Carnet
module.exports = class Carnet {

    // constructeur
    constructor() {
        // se connecte à mysql
        this.sequelize = new Sequelize('mysql://root:root@localhost:8889/miage');
        // initialise les modèles
        this.models = initModels(this.sequelize);
    }

    // méthode qui renvoie tout le carnet
    async recupererCarnet() {
        const personnes = await this.models.carnetadresse.findAll();
        console.log(personnes);
        return personnes;
    }

    // méthode qui ajoute une personne
    async ajouterPersonne(nom, prenom, adresse, codepostal, ville) {
        // vérifie qu'il n'existe pas déjà
        if(! await this.estPresent(nom)) {
            // il nous faut un objet
            const personne = {'nom':nom, 'prenom':prenom, 'adresse':adresse,
                'codepostal':codepostal, 'ville':ville, 'dernieremodif': new Date()};
            // on crée une nouvelle personne
            let personneModel = this.models.carnetadresse.build(personne);
            // on la sauve dans la BD
            await personneModel.save();
            // on renvoie vrai
            return true;
        } else {
            // on renvoie faux
            return false;
        }
    }

    // teste si une personne est présente
    async estPresent(nom) {
        // on cherche la personne
        return await this.models.carnetadresse.findOne({where: {'nom': nom}}) !== null;
    }

    // permet de récupérer la personne de nom donné en paramètre
    async recupererPersonne(nom) {
        // on cherche la personne
        let personne = await this.models.carnetadresse.findOne({ where: {'nom':nom}});
        console.log(personne);
        // si elle n'y est pas, on renvoie null
        return personne;
    }

    // modifie une personne
    async modifierPersonne(nom, prenom, adresse, codePostal, ville) {
        let personne = this.recupererPersonne(nom);
        if(personne !== null) {
            // on met à jour les attributs qui peuvent changer
            personne.prenom = prenom;
            personne.adresse = adresse;
            personne.codepostal = codePostal;
            personne.ville = ville;
            // on met à jour la date de dernière modification
            personne.dernieremodif = new Date();

            // on met à jour dans la BD
            await this.models.carnetadresse.update(personne, { where: {'nom':nom}});

            return true;
        } else {
            return false;
        }
    }

    // supprime une personne
    supprimerPersonne(nom) {
        // on cherche la personne
        this.models.carnetadresse.destroy({ where: {'nom':nom}});
    }

    fermerConnexionSGBD() {
        this.sequelize.close();
    }
}
