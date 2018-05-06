const request = require('request');
const cheerio = require('cheerio');
const util = require('./util');
const Entities = require('html-entities').XmlEntities;
const everydaydata_models = require('../models/everydaydata');
entities = new Entities();

const baseAirURL = 'http://www.tianqihoubao.com/aqi/haerbin-date.html';
const baseLishiURL = 'http://www.tianqihoubao.com/lishi/haerbin/month/date.html'
const date = util.getNowDate();
const curDate = date.year + '' + (date.month < 10 ? '0' + date.month : date.month);
const lastDate = date.year + '' + (date.month < 10 ? '0' + (date.month - 1) : date.month - 1);
const dateArr = [lastDate, curDate];

const api = async (url) => {
  return new Promise((resolve, reject) => {
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(body);
      }
    })
  })
}

const getAir = async () => {
  const result = [];
  for (let i = 0; i < dateArr.length; i++) {
    let time = dateArr[i];
    let airURL = baseAirURL.replace(/date/, time);
    let lishiURL = baseLishiURL.replace(/date/, time);
    let $airTable;
    let $lishiTable;
    await api(airURL)
    .then(html => {
      const $ = cheerio.load(html);
      $airTable = $('table tbody').children();
    });
    await api(lishiURL)
    .then(html => {
      const $ = cheerio.load(html);
      $lishiTable = $('table tbody').children();
    });
    let lastDate = '';                 //  api接口有坑，去掉重复数据
    let j = 1;
    for (let i = 1; i < $airTable.length; i++) {
      let $airItem = $airTable.eq(i);
      let $lishiItem = $lishiTable.eq(j);
      let date = $airItem.children().eq(0).text();
      if (lastDate === date) {
        j--;
        continue;
      } else {
        lastDate = date;
        result.push({
          date: $airItem.children().eq(0).text().replace(/^\s+|\s+$/g,""),
          aqi: $airItem.children().eq(2).text().replace(/^\s+|\s+$/g,""),
          pm25: $airItem.children().eq(4).text().replace(/^\s+|\s+$/g,""),
          pm10: $airItem.children().eq(5).text().replace(/^\s+|\s+$/g,""),
          so2: $airItem.children().eq(6).text().replace(/^\s+|\s+$/g,""),
          no2: $airItem.children().eq(7).text().replace(/^\s+|\s+$/g,""),
          co: $airItem.children().eq(8).text().replace(/^\s+|\s+$/g,""),
          o3: $airItem.children().eq(9).text().replace(/^\s+|\s+$/g,""),
        })
      }
      j++;
    }
  }
  await everydaydata_models.setAirInfo(result);
}

setImmediate(() => {
  getAir();
}, 24 * 60 * 60 * 1000);

module.exports = {
  getAir: getAir
}