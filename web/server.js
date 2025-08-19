const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const publicDir = path.join(__dirname, 'public');

function serveStatic(filePath, contentType, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const file = req.url === '/' ? 'index.html' : req.url.slice(1);
    const filePath = path.join(publicDir, file);
    const ext = path.extname(filePath);
    const contentType = ext === '.js' ? 'text/javascript' : ext === '.css' ? 'text/css' : 'text/html';
    serveStatic(filePath, contentType, res);
    return;
  }

  if (req.method === 'POST' && req.url === '/api/chat') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const { prompt } = JSON.parse(body);
        const codexCli = path.resolve(__dirname, '..', 'codex-cli', 'bin', 'codex.js');
        const child = spawn('node', [codexCli, prompt]);
        let output = '';
        child.stdout.on('data', data => {
          output += data.toString();
        });
        child.stderr.on('data', data => {
          output += data.toString();
        });
        child.on('close', () => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ output }));
        });
      } catch (err) {
        res.writeHead(400);
        res.end(err.message);
      }
    });
    return;
  }

  res.writeHead(404);
  res.end();
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Codex Web UI running at http://localhost:${port}`);
});
