// importation du module fs : entrées/sorties fichier
const fs = require('fs');

// ouverture d'un flux en lecture
const readableStream = fs.createReadStream('/var/log/system.log');
let data = '';

// attend l'événement qui indique qu'on peut lire des données
readableStream.on('readable', function() {
    let chunk;
    // lecture bloquante des données
    while ((chunk=readableStream.read()) != null) {
        // concaténation des données lues
        data += chunk;
        // affichage de la longueur
        console.log('data '+chunk.length);
    }
});

// attend l'événement qui indique que la lecture est terminée
readableStream.on('end', function() {
    console.log('end')
});
