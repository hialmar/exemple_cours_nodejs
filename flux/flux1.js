var fs = require('fs');
var readableStream = fs.createReadStream('/var/log/system.log');
var data = '';

readableStream.on('data', function(chunk) {
    data+=chunk;
    console.log('data '+chunk.length);
});

readableStream.on('end', function() {
    console.log('end');
});
