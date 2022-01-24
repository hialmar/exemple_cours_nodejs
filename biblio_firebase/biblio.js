// importe la classe Personne
const Livre = require('./livre');

// importe le module d'admin de firebase
const admin = require("firebase-admin");

// importe l'objet d'authentification
const serviceAccount = require("./cours-node-eea47-firebase-adminsdk-w75j0-6d88695a05.json");

// définit et exporte la classe Bibliotheque
module.exports = class Bibliotheque {

    // constructeur
    constructor() {
        // crée le cache
        this._biblio = [];

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
            self._biblio = [];
            // on parcours les noeuds fils
            snapshot.forEach((childSnapshot) => {
                // on récupère la clé
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                console.log(childKey);
                console.log(childData);
                // on crée un livre avec les informations
                const livre = new Livre(childData);
                // il faut aussi sauver la clé
                livre.setCle(childKey);
                // on l'ajoute au cache
                self._biblio.push(livre);
            });
        });
    }

    // méthode qui renvoie toute la biblio
    get biblio() {
        return this._biblio;
    }

    // méthode qui ajoute un livre
    ajouterLivre(titre, auteur, annee) {
        // vérifie qu'il n'existe pas déjà
        if(!this.estPresent(titre)) {
            // crée le livre
            const livre = new Livre(
                {'titre':titre, 'auteur':auteur, 'annee':annee});
            // l'ajoute au cache (optionnel ici)
            this._biblio.push(livre);
            // il faut aussi l'ajouter dans firebase
            const nouveauNoeud = this.ref.push();
            nouveauNoeud.set(livre);
            // on renvoie vrai
            return true;
        } else {
            // on renvoie faux
            return false;
        }
    }

    // teste si un livre est présent
    estPresent(titre) {
        // on cherche le livre
        for(let pos in this._biblio) {
            // on teste si le titre est le même
            if(this._biblio[pos].getTitre() === titre) {
                // il est présent
                return true;
            }
        }
        // si on ne l'a pas trouvé
        return false;
    }

    // permet de récupérer le livre de titre donné en paramètre
    recupererLivre(titre) {
        // on cherche le livre
        for(let pos in this._biblio) {
            // on teste si le titre est le même
            if(this._biblio[pos].getTitre() === titre) {
                // on retourne le livre
                return this._biblio[pos];
            }
        }
        // il n'y est pas, on renvoie null
        return null;
    }

    // modifie un livre
    modifierLivre(titre, auteur, annee) {
        // on cherche le livre
        for(let livre of this._biblio) {
            // si il a bien le même titre
            if(livre.getTitre() === titre) {
                // on met à jour les autres infos
                livre.setAuteur(auteur);
                livre.setAnnee(annee);
                // il faut aussi faire la mise à jour dans firebase
                const refFils = this.ref.child(livre.getCle());
                refFils.update(livre);
            }
        }
    }

    // supprime un livre
    supprimerLivre(titre) {
        // on cherche le livre
        for(let pos=0; pos < this._biblio.length; pos++)
        {
            // si il a bien le même titre
            if (this._biblio[pos].getTitre() === titre) {
                const livre = this._biblio[pos];
                // on l'enlève
                this._biblio.splice(pos, 1);
                // il faut aussi l'enlever de firebase
                const refFils = this.ref.child(livre.getCle());
                refFils.remove();
            }
        }
    }
}
