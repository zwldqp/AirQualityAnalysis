const client = require("./mysql");

const setAirInfo = async (air) => {
  console.log(air.length);
  await client.startTransaction();
  let sql = 'insert ignore into everydaydata (id, date, PM25, PM10, So2, No2, Co, O3, aqi)';
  for (let i = 0; i < air.length; i++) {
    let item = air[i];
    sql += ' select '
    sql += 'null, "' + item.date + '", ' + item.pm25 + ', ' + item.pm10 + ', ' + item.so2 + ', ' + item.no2 + ', ' + item.co + ', ' + item.o3 + ', ' + item.aqi;
    if (i !== air.length - 1) {
      sql += ' union';
    }
  }
  const res = await client.executeTransaction(sql, []);
  await client.stopTransaction();
  return res;
}

module.exports = {
  setAirInfo: setAirInfo
}