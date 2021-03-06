const http = require('http');
const request = require('request');
const videoLinkParser = require('./parser/video-link-parser');
const os = require('os');

const hostname = os.hostname();
const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  if (req.url==='/') {
    res.end('Index page!');
  }

  videoLinkParser(req.url, (video) => {
    if (video) {
      const headers = {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename=${encodeURIComponent(video.name)}.mp4`,
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
