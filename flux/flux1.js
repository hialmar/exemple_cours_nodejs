// importation du module fs : entrées/sorties fichier
const fs = require('fs');

// ouverture d'un flux en lecture
const readableStream = fs.createReadStream('/var/log/system.log');
let data = '';

// attend l'événement qui indique que des données sont disponibles
readableStream.on('data', function(chunk) {
    // concatène les données dans la variable data
    data+=chunk;
    // affiche la longueur des données récupérées
    console.log('data '+chunk.length);
});

// attend l'événement qui indique que la lecture est terminée
readableStream.on('end', function() {
    // affiche un message
    console.log('end');
});
