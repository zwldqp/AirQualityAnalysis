const router = require('koa-router')()
const searchData = require('../controller/searchData')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/searchDataTest/:city', searchData.searchData)

router.get('/getNewsTest', searchData.getNews)

router.get('/getAirTest', searchData.getAir)

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
