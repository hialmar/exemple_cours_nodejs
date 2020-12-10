var http = require("http");

http.get('http://torguet.net/cours/', (res) => {
  console.log(`Got response: ${res.statusCode}`);
  // consume response body
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});

