// importe la classe Personne
const Personne = require('./personne');

// définit et exporte la classe Carnet
module.exports = class Carnet {

    // constructeur
    constructor() {
        this._carnet = [];
    }

    // méthode qui renvoie tout le carnet
    get carnet() {
        return this._carnet;
    }

    // méthode qui ajoute une personne
    ajouterPersonne(nom, prenom, adresse, codepostal, ville) {
        // vérifie qu'il n'existe pas déjà
        if(!this.estPresent(nom)) {
            // crée la personne
            const personne = new Personne(nom, prenom, adresse, codepostal, ville);
            // l'ajoute au carnet
            this._carnet.push(personne);
            // on renvoie vrai
            return true;
        } else {
            // on renvoie faux
            return false;
        }
    }

    // teste si une personne est présente
    estPresent(nom) {
        // on cherche la personne
        for(let pos in this._carnet) {
            // on teste si le nom est le même
            if(this._carnet[pos].getNom() === nom) {
                // elle est présente
                return true;
            }
        }
        // si on ne l'a pas trouvée
        return false;
    }

    // permet de récupérer la personne de nom donné en paramètre
    recupererPersonne(nom) {
        // on cherche la personne
        for(let pos in this._carnet) {
            // on teste si le nom est le même
            if(this._carnet[pos].getNom() === nom) {
                // on retourne la personne
                return this._carnet[pos];
            }
        }
        // elle n'y est pas, on renvoie null
        return null;
    }

    // modifie une personne
    modifierPersonne(nom, prenom, adresse, codePostal, ville) {
        // on cherche la personne
        for(let personne of this._carnet) {
            // si elle a bien le même nom
            if(personne.getNom() === nom) {
                // on met à jour les autres infos
                personne.setPrenom(prenom);
                personne.setAdresse(adresse);
                personne.setCodePostal(codePostal);
                personne.setVille(ville);
            }
        }
    }

    // supprime une personne
    supprimerPersonne(nom) {
        // on cherche la personne
        for(let pos=0; pos < this._carnet.length; pos++)
        {
            // si elle a bien le même nom
            if (this._carnet[pos].getNom() === nom) {
                // on l'enlève
                this._carnet.splice(pos, 1);
            }
        }
    }
}
