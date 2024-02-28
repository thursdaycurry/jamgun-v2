// 'use strict';

// const puppeteer = require('puppeteer');
// require('dotenv').config();

// const delay = (milliseconds, message) =>
//   new Promise((resolve) => {
//     console.log(`🟩 ${message}`);
//     setTimeout(resolve, milliseconds);
//   });

// (async () => {
//   const browser = await puppeteer.launch({
//     headless: false,
//   });
//   const page = await browser.newPage();
//   await page.goto(process.env.JUMPIT_TARGET_URL);
//   await delay(2000, `웹페이지 도착`);

//   const btn_apply = await page.$eval(
//     '.position_wing_con > div > div',
//     (button) => button.innerText
//   );

//   if (btn_apply === '지원하기') {
//     await page.click('.position_wing_con > div > div');
//   }

//   await browser.close();
// })();
