// importe le module redis
const redis = require("redis");
// crée un client avec les paramètres par défaut.
const client = redis.createClient();

// callback en cas d'erreur
client.on("error", function(error) {
    console.error(error);
});

// fait un set simple
client.set("nom", "Dupond", function(err, result) {
    if(err)
        console.log(err);
    else
        console.log(result); // va afficher OK
});

// fait un get
client.get("nom", function(err, result) {
    if(err)
        console.log(err);
    else
        console.log(result); // va afficher value
});

// tente de récupérer quelque chose qui n'existe pas
client.get("unkown", function(err, result) {
    if(err)
        console.log(err);
    else
        console.log(result); // va afficher null
});

// ferme la connection
client.quit();
