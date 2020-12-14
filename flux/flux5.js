// importation du module fs : entrées/sorties fichier
const fs = require('fs');
// importation du module zlib
const zlib = require('zlib');

// création du flux en lecture
fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip()) // ajout du pipe sur la commande qui décompresse
  .pipe(fs.createWriteStream('output.txt')); // ajout du pipe vers le flux en sortie
