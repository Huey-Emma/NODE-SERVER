const fs = require('fs'),
  path = require('path');

const requestHandler = (req, res) => {
  const { url, method } = req;

  if (url === '/') {
    fs.readFile(
      path.join(__dirname, '/public', 'index.html'),
      (err, fileContent) => {
        if (err) throw Error;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(fileContent);
      }
    );
  }

  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', chunk => body.push(chunk));
    return req.on('end', _ => {
      // Extract Form Body
      let message = (arr =>
        Buffer.concat(arr)
          .toString()
          .split('=')[1])(body);

      // Save form input to txt file
      const saveToFile = fName => ext => cnt =>
        fs.writeFileSync(path.join(__dirname, '/data', `${fName}.${ext}`), cnt);

      const addFileName = saveToFile('message');
      const addExtention = addFileName('txt');
      const addMessage = addExtention(message);

      return res.end('<h1>Message Sent</h1>');
    });
  }
};

module.exports = requestHandler;
