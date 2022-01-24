// définit et exporte la classe Personne
module.exports = class Personne {
    // ajout d'un attribut pour stocker la clé du noeud Firebase correspondant à la Personne
    _cle=null;
    // constructeur
    constructor(objet) {
        this.nom = objet.nom;
        this.prenom = objet.prenom;
        this.adresse = objet.adresse;
        this.codePostal = objet.codePostal;
        this.ville = objet.ville;
    }

    // Getters et Setters
    getNom() {
        return this.nom;
    }

    setNom(value) {
        this.nom = value;
    }

    getPrenom() {
        return this.prenom;
    }

    setPrenom(value) {
        this.prenom = value;
    }

    getAdresse() {
        return this.adresse;
    }

    setAdresse(value) {
        this.adresse = value;
    }

    getCodePostal() {
        return this.codePostal;
    }

    setCodePostal(value) {
        this.codePostal = value;
    }

    getVille() {
        return this.ville;
    }

    setVille(value) {
        this.ville = value;
    }


    getCle() {
        return this._cle;
    }

    setCle(value) {
        this._cle = value;
    }
}
