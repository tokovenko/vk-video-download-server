const http = require('http');
const request = require('request');
const videoLinkParser = require('./parser/video-link-parser');

const hostname = 'localhost';
const port = 3001;

const server = http.createServer((req, res) => {
  videoLinkParser(req.url, (video) => {
    if (video) {
      const headers = {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename=${encodeURIComponent(video.name)}`,
      };
      res.writeHead(200, headers);
      request(video.link).pipe(res);
    } else {
      res.writeHead(404);
      res.end('File not found!');
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
