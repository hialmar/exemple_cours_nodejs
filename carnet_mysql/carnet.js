let mysql = require('mysql');

module.exports = class Carnet {

    // constructeur
    constructor() {
        this.con = mysql.createConnection({
            host: "localhost",
            port: 8889,
            user: "root",
            password: "root",
            database: "miage"
        });

        this.con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
        });
    }

    renvoyerCarnet(res) {
        this.con.query("SELECT * FROM carnetadresse", function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    }

    ajouterPersonne(nom, prenom, adresse, codePostal, ville, res) {
        let self = this;
        this.con.query("SELECT * FROM carnetadresse WHERE nom = ?", nom, function (err, result) {
            if (err) throw err;
            if(result.length === 0) {
                var sql = "INSERT INTO carnetadresse (nom, prenom, adresse, codepostal, ville, dernieremodif) VALUES (?, ?, ?, ?, ?, NOW())";
                self.con.query(sql, [nom, prenom, adresse, codePostal, ville], function (err, result) {
                    if (err) throw err;
                    res.send("Ajout ok");
                });
            } else {
                res.send("Déjà présent");
            }
        });
    }

    recupererPersonne(nom, res) {
        this.con.query("SELECT * FROM carnetadresse WHERE nom = ?", nom, function (err, result) {
            if (err) throw err;
            if (result.length !== 0)
                res.json(result[0]);
            else
                res.status(404).send("La personne n'existe pas");
        });
    }

    modifierPersonne(nom, prenom, adresse, codePostal, ville, res) {
        let self = this;
        this.con.query("SELECT * FROM carnetadresse WHERE nom = ?", nom, function (err, result) {
            if (err) throw err;
            if(result.length !== 0) {
                var sql = "UPDATE carnetadresse SET prenom = ?, adresse = ?, codepostal = ?, ville = ?, dernieremodif=NOW() WHERE nom=?";
                self.con.query(sql, [prenom, adresse, codePostal, ville, nom], function (err, result) {
                    if (err) throw err;
                    res.send("Modification ok");
                });
            } else {
                res.status(404).send("La personne n'existe pas");
            }
        });
    }

    supprimerPersonne(nom, res) {
        this.con.query("DELETE FROM carnetadresse WHERE nom = ?", nom, function (err, result) {
            if (err) throw err;
            res.send("Personne supprimée du carnet");
        });
    }

    fermer() {
        this.con.end();
    }
}
