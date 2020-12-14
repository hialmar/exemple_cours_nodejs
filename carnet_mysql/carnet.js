// importe le module mysql
const mysql = require('mysql');

// définit et exporte la classe Carnet
module.exports = class Carnet {

    // constructeur
    constructor() {
        // crée la connexion vers mysql
        this.con = mysql.createConnection({
            host: "localhost",
            port: 8889,
            user: "root",
            password: "root",
            database: "miage"
        });
        // tente de se connecter
        this.con.connect(function(err) {
            if (err) throw err;
            console.log("Connecté !");
        });
    }

    // méthode pour renvoyer tout le carnet sur la réponse res en paramètre
    renvoyerCarnet(res) {
        // on lance la requête select * from
        this.con.query("SELECT * FROM carnetadresse", function (err, result, fields) {
            if (err) throw err;
            // on renvoie le résultat sous forme de JSON
            res.json(result);
        });
    }

    // méthode pour ajouter une personne dans le carnet
    // on renvoie aussi une réponse sur res
    ajouterPersonne(nom, prenom, adresse, codePostal, ville, res) {
        // sauvegarde this pour pouvoir l'utiliser ensuite
        const self = this;
        // cherche si le nom est déjà présent
        this.con.query("SELECT * FROM carnetadresse WHERE nom = ?", nom, function (err, result) {
            if (err) throw err;
            // si on n'a rien trouvé
            if(result.length === 0) {
                // requête d'insertion
                var sql = "INSERT INTO carnetadresse (nom, prenom, adresse, codepostal, ville, dernieremodif) VALUES (?, ?, ?, ?, ?, NOW())";
                // exécute la requête d'insertion avec des paramètres
                self.con.query(sql, [nom, prenom, adresse, codePostal, ville], function (err, result) {
                    if (err) throw err;
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
        // fait le select from where
        this.con.query("SELECT * FROM carnetadresse WHERE nom = ?", nom, function (err, result) {
            if (err) throw err;
            // s'il y a un résultat au moins
            if (result.length !== 0) {
                // renvoie le premier résultat sous forme de JSON
                res.json(result[0]);
            } else {
                // retourne une erreur 404
                res.status(404).send("La personne n'existe pas");
            }
        });
    }

    // méthode pour modifier une personne
    // renvoie le résultat sur res
    modifierPersonne(nom, prenom, adresse, codePostal, ville, res) {
        // sauvegarde this pour pouvoir l'utiliser ensuite
        const self = this;
        // est-ce que la personne existe
        this.con.query("SELECT * FROM carnetadresse WHERE nom = ?", nom, function (err, result) {
            if (err) throw err;
            // s'il y a au moins un résultat
            if(result.length !== 0) {
                // requête update
                var sql = "UPDATE carnetadresse SET prenom = ?, adresse = ?, codepostal = ?, ville = ?, dernieremodif=NOW() WHERE nom=?";
                // exécute la requête update
                self.con.query(sql, [prenom, adresse, codePostal, ville, nom], function (err, result) {
                    if (err) throw err;
                    // tout s'est bien passé
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
        // exécute la requête delete
        this.con.query("DELETE FROM carnetadresse WHERE nom = ?", nom, function (err, result) {
            if (err) throw err;
            // on affiche toujours le même message
            res.send("Personne supprimée du carnet");
        });
    }

    // méthode de fermeture de la connexion avec mysql
    fermer() {
        this.con.end();
    }
}
