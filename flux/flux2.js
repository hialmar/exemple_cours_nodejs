var fs = require('fs');
var readableStream = fs.createReadStream('/var/log/system.log');
var data = '';
var chunk;

readableStream.on('readable', function() {
    while ((chunk=readableStream.read()) != null) {
        data += chunk;
        console.log('data '+chunk.length);
    }
});

readableStream.on('end', function() {
    console.log('end')
});
