// importation du module fs : entrées/sorties fichier
const fs = require('fs');

// création d'un flux en écriture
const writableStream = fs.createWriteStream('file2.txt');

// on écrit sur le flux
for(let i = 0; i < 100; i++) {
	writableStream.write('Ligne '+i+'\n');
}

// on écrit puis on ferme le fichier
writableStream.end('Fin du fichier');


