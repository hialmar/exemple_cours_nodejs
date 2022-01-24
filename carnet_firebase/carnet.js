// importe la classe Personne
const Personne = require('./personne');

// importe le module d'admin de firebase
const admin = require("firebase-admin");

// importe l'objet d'authentification
const serviceAccount = require("./cours-node-eea47-firebase-adminsdk-w75j0-0f53a176e0.json");

// définit et exporte la classe Carnet
module.exports = class Carnet {

    // constructeur
    constructor() {
        // crée le cache
        this._carnet = [];

        // connexion à firebase
        this.admin = admin;
        this.admin.initializeApp({
            credential: this.admin.credential.cert(serviceAccount),
            databaseURL: "https://cours-node-eea47-default-rtdb.firebaseio.com"
        });

        // récupération de la base de donnée
        this.db = this.admin.database();

        // récupération de la racine de la BD
        this.ref = this.db.ref();

        // sauvegarde de la référence à this pour le callback
        const self = this;
        // la callback sera appelé à chaque changement de la BD
        this.ref.on('value', (snapshot) => {
            // on vide le cache
            self._carnet = [];
            // on parcours les noeuds fils
            snapshot.forEach((childSnapshot) => {
                // on récupère la clé
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                console.log(childKey);
                console.log(childData);
                // on crée une personne avec les informations
                const personne = new Personne(childData);
                // il faut aussi sauver la clé
                personne.setCle(childKey);
                // on l'ajoute au cache du carnet
                self._carnet.push(personne);
            });
        });
    }

    // méthode qui renvoie tout le carnet
    get carnet() {
        return this._carnet;
    }

    // méthode qui ajoute une personne
    ajouterPersonne(nom, prenom, adresse, codePostal, ville) {
        // vérifie qu'il n'existe pas déjà
        if(!this.estPresent(nom)) {
            // crée la personne
            const personne = new Personne(
                {'nom':nom, 'prenom':prenom, 'adresse':adresse,
                    'codePostal':codePostal, 'ville':ville});
            // l'ajoute au cache du carnet (optionnel ici)
            this._carnet.push(personne);
            // il faut aussi l'ajouter dans firebase
            const nouveauNoeud = this.ref.push();
            nouveauNoeud.set(personne);
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
                // il faut aussi faire la mise à jour dans firebase
                const refFils = this.ref.child(personne.getCle());
                refFils.update(personne);
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
                const personne = this._carnet[pos];
                // on l'enlève
                this._carnet.splice(pos, 1);
                // il faut aussi l'enlever de firebase
                const refFils = this.ref.child(personne.getCle());
                refFils.remove();
            }
        }
    }
}
