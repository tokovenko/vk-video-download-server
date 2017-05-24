const loadPage = require('./load-page');

module.exports = (video, cb) => {
  loadPage(video, (html) => {
    const videos = html.match(/[^"]+mp4[^"]+/g);
    console.log(videos);
    if (!videos) {
      cb(null);
    } else {
      const firstVideo = videos.shift();
      const link = firstVideo.replace(/\\\//g, '/');

      const result = html.match(/mv_title\\"[^>]+>([^<]+)</);
      const name = result ? result[1] : video;
      cb({ link, name });
    }
  });
};
