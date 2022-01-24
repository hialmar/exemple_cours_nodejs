// définit et exporte la classe Livre
module.exports = class Livre {
    // ajout d'un attribut pour stocker la clé du noeud Firebase correspondant au livre
    _cle=null;
    // constructeur
    constructor(objet) {
        this.titre = objet.titre;
        this.auteur = objet.auteur;
        this.annee = objet.annee;
    }

    // Getters et Setters
    getTitre() {
        return this.titre;
    }

    setTitre(value) {
        this.titre = value;
    }

    getAuteur() {
        return this.auteur;
    }

    setAuteur(value) {
        this.auteur = value;
    }

    getAnnee() {
        return this.annee;
    }

    setAnnee(value) {
        this.annee = value;
    }

    getCle() {
        return this._cle;
    }

    setCle(value) {
        this._cle = value;
    }
}
