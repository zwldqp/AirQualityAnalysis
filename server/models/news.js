const client = require("./mysql");

const setNews = async (news) => {      // 插入新闻
  await client.startTransaction();
  let sql = 'insert ignore into news (id, title, link, date)';
  for (let i = 0; i < news.length; i++) {
    let item = news[i];
    sql += ' select '
    sql += 'null, "' + item.title + '", "' + item.link + '", "' + item.date + '"';
    if (i !== news.length - 1) {
      sql += ' union';
    }
  }
  const res = await client.executeTransaction(sql, []);
  await client.stopTransaction();
  return res;
}

const getNews = async () => {     
  await client.startTransaction();
  let sql = 'select * from news';
  const res = await client.executeTransaction(sql, []);
  await client.stopTransaction();
  return res;
}

module.exports = {
  setNews: setNews,
  getNews: getNews
}