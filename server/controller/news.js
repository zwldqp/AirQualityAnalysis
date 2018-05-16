const request = require('request');
const news = require('../models/news')

const getNews = async (ctx) => {
    const data = await news.getNews();
    ctx.response.body = data
}

module.exports = {
    getNews: getNews
}