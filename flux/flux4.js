// importation du module fs : entrées/sorties fichier
const fs = require('fs');

// création d'un flux en lecture
const readableStream = fs.createReadStream('file.txt');
// création d'un flux en écriture
const writableStream = fs.createWriteStream('file2.txt');
// on redirige le flux en lecture sur celui en écriture
// ça recopie automatiquement les données
readableStream.pipe(writableStream);
