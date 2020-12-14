// importation du module http
const http = require('http');

// création du serveur web
const server = http.createServer(function(req, res) {
  // fonction callback
  // on envoie le code OK
  res.writeHead(200);
  // on envoie le message et on arrête d'envoyer
  res.end('Salut tout le monde !');
});

// traitement de l'événement signal SIGINT (Ctrl-C)
process.on('SIGINT', function() {
  console.log("Demande d'arrêt par SIGINT");
  // arrêt du serveur
  server.close(() => console.log("Arrêt"));
});

// traitement de l'événement signal SIGTERM (kill normal)
process.on('SIGTERM', function() {
  console.log("Demande d'arrêt par SIGTERM");
  // arrêt du serveur
  server.close(() => console.log("Arrêt"));
});

// lance le serveur sur le port 3000
server.listen(3000, function () {
  // affichage du numéro de port
  console.log('Le serveur écoute sur le port 3000!');
});


