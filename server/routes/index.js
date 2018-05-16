// import { serveStatic } from './C:/Users/Lxp/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/serve-static';

const router = require('koa-router')()
const searchData = require('../controller/searchData')
const news = require('../controller/news')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/searchDataTest/:city', searchData.searchData)

router.get('/getNewsTest', searchData.getNews)

router.get('/getAirTest', searchData.getAir)

router.get('/getAirQulityData', searchData.getAirQulityData)

router.get('/News', news.getNews)
router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
