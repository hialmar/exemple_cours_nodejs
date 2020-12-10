var app = require('express')();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var banque = require('./banque');

function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}

server.listen(8080);

app.use(bodyParser.urlencoded({ extended: true })); // pour parser les formulaires

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/comptes/', function (req, res) {
	res.setHeader('Content-Type', 'text/html');
	console.log(req.body);
	if(typeof req.body.id === 'undefined' || ! isInt(req.body.somme)) {
		res.send("<p>Il faut préciser les paramètres</p>");
  	} else if(banque.creerCompte(req.body.id,parseInt(req.body.somme))) {
  		res.send("<p>Le compte d'id "+req.body.id+" est créé</p>");
  	} else {
  		res.send("<p>Le compte d'id "+req.body.id+" existe déjà</p>");
  	}
});

app.get('/compte/', function(req, res) {
	
	console.log(req.query);
	if(typeof req.query.id === 'undefined') {
		res.setHeader('Content-Type', 'text/html');
		res.send("<p>Il faut préciser le paramètre</p>");
  	} else {
  		var pos = banque.positionDuCompte(req.query.id);
   		if(typeof pos.somme !== 'undefined') {
   			console.log(pos);
  			res.json(pos);
  		} else {
  			res.setHeader('Content-Type', 'text/html');
  			res.send("<p>Le compte d'id "+req.query.id+" n'existe pas</p>");
  		}
  	}
});

app.post('/compte/', function(req, res) {
	res.setHeader('Content-Type', 'text/html');
	console.log(req.query);
	if(typeof req.body.id === 'undefined' || ! isInt(req.body.somme)) {
		res.send("<p>Il faut préciser les paramètres</p>");
  	} else {
   		if(req.body.somme > 0) {
   			if(banque.ajouterAuCompte(req.body.id,parseInt(req.body.somme))) {
  				res.send("<p>Le compte d'id "+req.body.id+" a été crédité</p>");
  			} else {
  				res.send("<p>Le compte d'id "+req.body.id+" n'existe pas</p>");
  			}
  		} else {
  			if(banque.retirerDuCompte(req.body.id, - parseInt(req.body.somme))) {
  				res.send("<p>Le compte d'id "+req.body.id+" a été débité</p>");
  			} else {
  				res.send("<p>Le compte d'id "+req.body.id+" n'existe pas</p>");
  			}
  		}
  	}
});

