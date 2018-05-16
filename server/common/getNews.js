const request = require('request');
const cheerio = require('cheerio');
const news_models = require('../models/news');

const baseURL = 'http://www.cma.gov.cn/2011xwzx/2011xqxxw/2011xqxyw/';

const api = async () => {
  return new Promise((resolve, reject) => {
    request(baseURL, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(body);
      }
    })
  });
}

const getNews = async () => {
  api()
  .then(html => {
    const $ = cheerio.load(html);
    const $news = $('table').eq(1).children().children().eq(1).children().eq(0).children().eq(1).children().children();
    const result = [];
    for (let i = 0; i < $news.length - 1; i++) {
      let $content = $news.eq(i).children().eq(1);
      let $time = $news.eq(i).children().eq(2);
      if ($content.text() === '') continue;
      result.push({
        title: $content.text(),
        link: baseURL + $content.children().attr('href').substring(2),
        date: $time.text().replace(/^\s+|\s+$/g,"")
      })
    }
    news_models.setNews(result);
  });
}

setInterval(() => {
  getNews();
}, 6 * 60 * 60 * 1000)

module.exports = {
  getNews: getNews
}