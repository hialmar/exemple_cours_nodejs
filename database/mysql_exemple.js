// importation du module mysql
const mysql = require('mysql');

// prépare la connexion
const con = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "miage"
});

// se connecte
con.connect(function(err) {
    // en cas d'erreur on lance une exception
    if (err) throw err;
    console.log("Connected!");
});

// requête d'insertion paramétrée
const sql = "INSERT INTO carnetadresse (nom, prenom, adresse, codepostal, ville, dernieremodif) VALUES (?, ?, ?, ?, ?, NOW())";
// ici on précise un tableau contenant les paramètres
con.query(sql, ['Dupond', 'Jean', '1 place du Capitole', 31000, 'Toulouse'], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
});
// select all
con.query("SELECT * FROM carnetadresse", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
});
// select from where
con.query("SELECT * FROM carnetadresse WHERE nom = ?", ['Dupond'], function (err, result) {
    if (err) throw err;
    console.log(result);
});
// select all ordonné
con.query("SELECT * FROM carnetadresse ORDER BY nom", function (err, result) {
    if (err) throw err;
    console.log(result);
});
// ferme la connexion avec la BD
con.end();
