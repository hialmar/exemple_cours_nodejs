// importation du module http
var http = require("http");

// envoie une requête get
http.get('http://torguet.net/cours/', (res) => {
  // affichage du code réponse
  console.log(`J'ai eu le code réponse : ${res.statusCode}`);
  // attends l'événement permettant de récupérer le corps de la réponse
  res.on('data', (chunk) => {
    // affiche le corps de la réponse
    console.log(`BODY: ${chunk}`);
  });
}).on('error', (e) => { // en cas d'erreur
  // affiche un message
  console.log(`Il y a eu une erreur: ${e.message}`);
});

