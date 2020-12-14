// importation du module
const monModule = require("./monmodule");

// importation du type depuis le module
const MonNouveauType = require("./monmodule").MonNouveauType;

// appel des fonctions importées
monModule.direBonjour();

monModule.direByeBye();

// création d'un objet avec le type importé
const objet = new MonNouveauType('Hello, World!');

objet.methode();

// affichage de la variable importée
console.log(monModule.maVariable);
