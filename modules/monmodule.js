// défintion de fonctions
function direBonjour() {
    console.log('Bonjour !');
}

var direByeBye = function() {
    console.log('Bye bye !');
}

// définition d'un nouveau type
function MonNouveauType(param) {
    this.attribut = param;

    this.methode = function () {
        console.log(this.attribut);
    }
}

// on exporte les fonctions
exports.direBonjour = direBonjour;
exports.direByeBye = direByeBye;
// on exporte le nouveau type
exports.MonNouveauType = MonNouveauType;
// on exporte une variable
exports.maVariable = 'Hello';
