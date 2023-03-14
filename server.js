const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    // Leggi il file index.html dal disco
    fs.readFile('./index.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end(`Errore: ${err}`);
      } else {
        // Invia il contenuto del file come risposta
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  } else {
    res.writeHead(404);
    res.end('Pagina non trovata');
  }
});

server.listen(3000, () => {
  console.log('Il server è in ascolto sulla porta 3000');
});
