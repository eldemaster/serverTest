const http = require('http');
const url = require('url');
const qs = require('querystring');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);

  if (pathname === '/') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write('Errore del server');
        res.end();
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
      }
    });
  } else if (pathname === '/salva' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { nome, email, interessi } = qs.parse(body);
      console.log(`Salvato il profilo di ${nome} (${email}): ${interessi}`);

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write('Profilo salvato');
      res.end();
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('Pagina non trovata');
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Server in ascolto sulla porta 3000');
});
