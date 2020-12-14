// importation du module fs : entrées/sorties fichier
var fs = require('fs');

// création d'un flux en écriture
var writableStream = fs.createWriteStream('file2.txt');

// on écrit sur le flux
for(var i = 0; i < 100; i++) {
	writableStream.write('Ligne '+i+'\n');
}

// on écrit puis on ferme le fichier
writableStream.end('Fin du fichier');


