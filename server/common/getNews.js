const request = require('request');
const cheerio = require('cheerio');
const news_models = require('../models/news');

const baseURL = 'http://www.tianqihoubao.com';

const api = async () => {
  return new Promise((resolve, reject) => {
    request(baseURL + '/news', function (error, response, body) {
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
    const $news = $('ul.list.f14px').children().children();
    const result = [];
    for (let i = 0; i < $news.length; i++) {
      let item = $news.eq(i);
      result.push({
        title: item.text(),
        link: baseURL + item.attr('href')
      })
    }
    news_models.setNews(result);
  });
}

setInterval(() => {
  getNews();
}, 6 * 60 * 60 * 1000)