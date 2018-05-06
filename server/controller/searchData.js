const request = require('request');

const suibian = (ctx) => {
    return new Promise((resolve, rejected) => {
        request(`http://tj.nineton.cn/Heart/index/all?city=${ctx.params.city}&language=zh-chs&unit=c&aqi=city&alarm=1&key=78928e706123c1a8f1766f062bc8676b`, function (error, response, body) {
            resolve(body);
        });
    })
}

const searchData = async (ctx) => {
    const zhi = await suibian(ctx);
    ctx.response.body = zhi
}

module.exports = {
    searchData: searchData
}