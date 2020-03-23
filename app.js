const http = require('http');

const requestHandler = require('./router');

const PORT = 8080;

const server = http.createServer(requestHandler);

server.listen(PORT, _ => console.log(`Server is listening on port ${PORT}`));
