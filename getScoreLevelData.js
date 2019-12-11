/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-loop-func */
/* eslint-disable linebreak-style */
const path = require('path');

global.appRoot = path.resolve(__dirname);
const cheerio = require('cheerio');

const queryOrder = require(`${global.appRoot}/utility/http`);
// const DatabaseUtility = require(`${global.appRoot}/utility/db`);
const utility = require(`${global.appRoot}/utility/utility`);
//  const { EventEmitter } = require('events');
// const event = new EventEmitter();
// const db = new DatabaseUtility();
// let provinceMap = {};
// event.on('DB data prepared', () => {
// console.log('The data is ready for the next step');
const host = 'http://kaoshi.edu.sina.com.cn/college/scorelist?tab=file&wl=&local=1&syear=';
queryOrder(host, 11).then((arr) => {
  console.log(arr)
  const $ = cheerio.load(arr[0]);
  const page = $('#score > div.tabsContainer > div.pageNumWrap > span').text();
  console.log(page);
});
/* const result = [];
var pageNumber = 0;
for (let cityNo = 1; cityNo < 33; cityNo++) {
  const host = `http://kaoshi.edu.sina.com.cn/college/scorelist?tab=file&wl=&local=${cityNo}&syear=`;
  queryOrder(host, 11).then((arr) => {
    const $ = cheerio.load(arr[0]);
    pageNumber = $('#score > div.tabsContainer > div.pageNumWrap > span').text();
    const ar = pageNumber.split('/');
    console.log(parseInt(ar[1], 10));
  });
} */
/* for (let cityNo = 1; cityNo < 33; cityNo++) {
  // eslint-disable-next-line no-plusplus
  for (let page = 1; page < pageNumber[cityNo - 1]; page++) {
    const host = `http://kaoshi.edu.sina.com.cn/college/scorelist?tab=file&wl=&local=${cityNo}&syear=&page=${page}`;
    queryOrder(host, 11).then((arr) => {
      const $ = cheerio.load(arr[0]);
      $('#score > div.tabsContainer > table > tbody > tr').each((i, v) => {
        const record = [];
        if (i > 0) {
          const tds = $(v).find('td');
          tds.each((ii, vv) => {
            if (ii < 6) {
              record.push($(vv).text());
            }
          });
          result.push(record);
        }
      });
      console.log(result);
    });
  }
}

// }
// }) */
