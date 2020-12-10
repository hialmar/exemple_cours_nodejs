const Personne = require('./personne');

module.exports = class Carnet {

    // constructeur
    constructor() {
        this._carnet = [];
    }

    get carnet() {
        return this._carnet;
    }

    ajouterPersonne(nom, prenom, adresse, codepostal, ville) {
        if(!this.estPresent(nom)) {
            let personne = new Personne(nom, prenom, adresse, codepostal, ville);
            this._carnet.push(personne);
        }
    }

    estPresent(nom) {
        for(let pos in this._carnet) {
            if(this._carnet[pos].getNom() === nom) {
                return true;
            }
        }
        return false;
    }

    recupererPersonne(nom) {
        for(let pos in this._carnet) {
            if(this._carnet[pos].getNom() === nom) {
                return this._carnet[pos];
            }
        }
        return null;
    }

    modifierPersonne(nom, prenom, adresse, codePostal, ville) {
        for(let personne of this._carnet) {
            if(personne.getNom() === nom) {
                personne.setPrenom(prenom);
                personne.setAdresse(adresse);
                personne.setCodePostal(codePostal);
                personne.setVille(ville);
            }
        }
    }

    supprimerPersonne(nom) {
        for(let pos=0; pos < this._carnet.length; pos++)
        {
            if (this._carnet[pos].getNom() === nom) {
                this._carnet.splice(pos, 1);
            }
        }
    }
}
