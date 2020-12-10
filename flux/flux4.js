var fs = require('fs');
var readableStream = fs.createReadStream('file.txt');
var writableStream = fs.createWriteStream('file2.txt');

readableStream.pipe(writableStream);
