var listeComptes = {};

function Position(somme) {
  this.somme = somme;
  this.date = new Date();
}

function Compte(somme) {
  this.position = new Position(somme);
  
  this.ajouter = function(somme) {
  	this.position.somme += somme;
  	this.position.date = new Date();
  }
  this.retirer = function(somme) {
  	this.position.somme -= somme;
  	this.position.date = new Date();
  }
}

var creerCompte = function(id, somme) {
	// s'il n'existe pas
	if (typeof listeComptes[id] === 'undefined') {		
		// on le cree
		listeComptes[id] = new Compte(somme);
		console.log(listeComptes);
		return 1;
    }
    return 0;
}

var ajouterAuCompte = function(id, somme) {
	console.log(listeComptes);
	// s'il n'existe pas
	if (typeof listeComptes[id] === 'undefined')
		return 0;
    listeComptes[id].ajouter(somme);
    return 1;
}

var retirerDuCompte = function(id, somme) {
	console.log(listeComptes);
	// s'il n'existe pas
	if (typeof listeComptes[id] === 'undefined')
		return 0;
    listeComptes[id].retirer(somme);
    return 1;
}

var positionDuCompte = function(id) {
	console.log(listeComptes);
	// s'il n'existe pas
	if (typeof listeComptes[id] === 'undefined')
		return {};
    return listeComptes[id].position;
}

exports.creerCompte = creerCompte;
exports.ajouterAuCompte = ajouterAuCompte;
exports.retirerDuCompte = retirerDuCompte;
exports.positionDuCompte = positionDuCompte;
