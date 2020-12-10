var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var favicon = require('serve-favicon'); // Charge le middleware de favicon
var bodyParser = require('body-parser');

var app = express();

app.use(morgan('combined')) // Active le middleware de logging
.use(express.static(__dirname + '/public')) // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
.use(favicon(__dirname + '/public/favicon.ico')); // Active la favicon indiquée

app.use(bodyParser.urlencoded({ extended: true }));

const redis = require('redis')
const session = require('express-session')

let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()

app.use(
	session({
		store: new RedisStore({ client: redisClient }),
		secret: 'my super secret à moi',
		saveUninitialized: false,
		resave: false,
	})
);
redisClient.on('error', console.log);

app.get('/', function(req, res) {
	var sess = req.session;
	//console.log(sess);
	if (!('taches' in sess)) {
	    sess.taches = [];
	}
    res.render('form.ejs', {taches : sess.taches});
});

app.get('/supp/:numero', function(req, res) {
	var sess = req.session;
	//console.log(sess);
	if (!('taches' in sess)) {
	    sess.taches = [];
	} else {
		console.log(req.params);
		if(typeof req.params.numero === 'string' && typeof parseInt(req.params.numero) === 'number') {
			console.log(req.params.numero);
			sess.taches.splice(parseInt(req.params.numero), 1);
			console.log(sess.taches);
		}
	}
    res.render('form.ejs', {taches : sess.taches});
});


app.post('/', function(req, res) {
	var sess = req.session;
	//console.log(sess);
	if ('taches' in sess) {
	    //console.log(sess.taches);
	    console.log(req.body);
	    if ('tache' in req.body) {
	    	sess.taches.push(req.body.tache);
	    }
	} else {
	    sess.taches = [];
	}
    res.render('form.ejs', {taches : sess.taches});
});

app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});
