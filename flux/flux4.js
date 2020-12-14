// importation du module fs : entrées/sorties fichier
var fs = require('fs');

// création d'un flux en lecture
var readableStream = fs.createReadStream('file.txt');
// création d'un flux en écriture
var writableStream = fs.createWriteStream('file2.txt');
// on redirige le flux en lecture sur celui en écriture
// ça recopie automatiquement les données
readableStream.pipe(writableStream);
