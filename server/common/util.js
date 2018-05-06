const getNowDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return {
    year: year,
    month: month
  }
}

module.exports = {
  getNowDate: getNowDate
}