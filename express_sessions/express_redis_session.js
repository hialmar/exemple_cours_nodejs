// importation du module express
const express = require('express');
// Charge le middleware de logging
const morgan = require('morgan');
// Charge le middleware de favicon
const favicon = require('serve-favicon');
// Charge le middleware qui traite les corps des requêtes POST et PUT
const bodyParser = require('body-parser');

// création de l'application web
const app = express();

// Active le middleware de logging
app.use(morgan('combined'))
	// Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
.use(express.static(__dirname + '/public'))
	// Active la favicon indiquée
.use(favicon(__dirname + '/public/favicon.ico'));

// Active body parser pour traiter les résultats de formulaire POST
app.use(bodyParser.urlencoded({ extended: true }));

// importe le module redis
const redis = require('redis')
// importe le middleware pour gérer les sessions HTTP
const session = require('express-session')

// importe le module qui connecte le middleware qui traite les sessions
// à redis
const RedisStore = require('connect-redis')(session)
// crée un client redis
const redisClient = redis.createClient()

// met en place les sessions avec redis
app.use(
	session({
		store: new RedisStore({ client: redisClient }),
		secret: 'my super secret à moi',
		saveUninitialized: false,
		resave: false,
	})
);

// en cas d'erreur avec redis on affiche sur la console
redisClient.on('error', console.log);

// en cas de réception d'une requête get sur la racine
app.get('/', function(req, res) {
	// on récupère la session
	const sess = req.session;
	//console.log(sess);
	// si la session est vide
	if (!('taches' in sess)) {
		// on crée le tableau de taches
	    sess.taches = [];
	}
	// on affiche le template en lui donnant le tableau de taches
    res.render('form.ejs', {taches : sess.taches});
});

// route qui gère la suppression d'une tache
app.get('/supp/:numero', function(req, res) {
	// récupère la session
	const sess = req.session;
	//console.log(sess);
	// si la session est vide
	if (!('taches' in sess)) {
		// crée le tableau de taches
	    sess.taches = [];
	} else {
		// examine les paramètres de la requête
		console.log(req.params);
		// si le numéro existe et est un nombre
		if(typeof req.params.numero === 'string' && typeof parseInt(req.params.numero) === 'number') {
			console.log(req.params.numero);
			// on enlève la tache correspondante
			sess.taches.splice(parseInt(req.params.numero), 1);
			console.log(sess.taches);
		}
	}
	// on réaffiche le template avec les autres taches
    res.render('form.ejs', {taches : sess.taches});
});

// route qui gère le résultat du formulaire POST
app.post('/', function(req, res) {
	// on récupère les sessions
	const sess = req.session;
	//console.log(sess);
	// si le tableau de taches existe
	if ('taches' in sess) {
	    //console.log(sess.taches);
	    console.log(req.body);
	    // s'il y a bien une tache dans le body
	    if ('tache' in req.body) {
	    	// on ajoute la tache
	    	sess.taches.push(req.body.tache);
	    }
	} else {
		// on crée un tableau vide
	    sess.taches = [];
	}
	// on affiche la nouvelle liste de taches
    res.render('form.ejs', {taches : sess.taches});
});

// le serveur tourne sur le port 3000
app.listen(3000, function() {
	console.log('Le serveur fonctionne sur le port 3000!');
});
