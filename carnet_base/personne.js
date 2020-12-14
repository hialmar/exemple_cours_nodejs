// définit et exporte la classe Personne
module.exports = class Personne {
    // constructeur
    constructor(nom, prenom, adresse, codePostal, ville) {
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = adresse;
        this.codePostal = codePostal;
        this.ville = ville;
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
}
