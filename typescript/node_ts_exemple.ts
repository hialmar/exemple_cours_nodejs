// récupération de la déclaration de classe
const Utilisateur = require('./mon_module');

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
