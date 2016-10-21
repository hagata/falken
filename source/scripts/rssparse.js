import { feedparser as FeedParser } from 'feedparser';
import request from 'request';
// var request = require('request');

let rssParse = function(url) {

  console.log(request);
  var req = request(url)
    , feedparser = new FeedParser([options]);

  req.on('error', function (error) {
    // handle any request errors
  });
  req.on('response', function (res) {
    var stream = this;

    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

    stream.pipe(feedparser);
  });


  feedparser.on('error', function(error) {
    // always handle errors
  });
  feedparser.on('readable', function() {
    // This is where the action is!
    var stream = this
      , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
      , item;

    while (item = stream.read()) {
      console.log(item);
    }
  });
};

export { rssParse };
// const rssparse = 'foo';
// export { rssParse };