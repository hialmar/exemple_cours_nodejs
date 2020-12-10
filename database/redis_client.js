const redis = require("redis");
// création d'un client avec les paramètres par défaut
const client = redis.createClient();

// si on veut choisir la base de donnée 3, au lieu de la bd 0 (celle par défaut) il faut faire :
// client.select(3, function() { /* ... */ });

// callback en cas d'erreur
client.on("error", function (err) {
    console.log("Error " + err);
});

// réalise un set simple
client.set("string key", "string val", redis.print);
// réalise un set sur une table de hashing
client.hset("hash key", "hashtest 1", "some value", redis.print);
// ajoute une autre clé dans la table de hashing
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
// liste les clés de la table de hashing
client.hkeys("hash key", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
    // se déconnecte
    client.quit();
});
