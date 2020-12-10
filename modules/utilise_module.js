var monModule = require("./monmodule");

var MonNouveauType = require("./monmodule").MonNouveauType;
monModule.direBonjour();

monModule.direByeBye();

var objet = new MonNouveauType('Hello, World!');

objet.methode();

console.log(monModule.maVariable);
