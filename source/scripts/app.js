import { rssParse } from './rssparse';
// App Start.
(function() {
  console.warn('beep…boop…beep\n%c🙇 hello world!', 'font-size:  16px');
})();

rssParse('https://sfbay.craigslist.org/search/eby/apa?nh=61&min_price=1000&max_price=2000&availabilityMode=0&housing_type=1&format=rss');
