function direBonjour() {
    console.log('Bonjour !');
}

var direByeBye = function() {
    console.log('Bye bye !');
}

function MonNouveauType(param) {
    this.attribut = param;

    this.methode = function () {
        console.log(this.attribut);
    }
}

exports.direBonjour = direBonjour;
exports.direByeBye = direByeBye;
exports.MonNouveauType = MonNouveauType;
exports.maVariable = 'Hello';
