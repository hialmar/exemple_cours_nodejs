var fs = require('fs');
var writableStream = fs.createWriteStream('file2.txt');

for(var i = 0; i < 100; i++) {
	writableStream.write('Ligne '+i+'\n');
}
writableStream.end('Fin du fichier');


