const https = require('https');
const Iconv = require('iconv').Iconv;

const iconv = new Iconv('windows-1251', 'utf-8');

module.exports = (video, cb) => {
  const options = {
    host: 'vk.com',
    path: video,
  };
  console.log(options);
  const request = https.request(options, (res) => {
    let html = '';
    res.on('data', (chunk) => {
      html += iconv.convert(chunk).toString();
    });

    res.on('end', () => cb(html));

    res.on('error', () => cb(html));
  });
  request.end();
};
