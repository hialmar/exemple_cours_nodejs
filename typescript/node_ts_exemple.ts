// récupération de la déclaration de classe
const Utilisateur = require('./mon_module');

// note : il faut regarder ici https://node.green/ pour savoir quelle version de JS est supportée par Node
// aujourd'hui es2016 est complétement géré.

// création
let util = new Utilisateur('dupond', 'duduche');

// affichage
util.afficher();

// test du mot de passe
console.log(util.checkPassword('duduche'));

// changement du mot de passe
// note : ça utilise le setter
util.password = 'nouveau';

// test du mot de passe
console.log(util.checkPassword('duduche'));
