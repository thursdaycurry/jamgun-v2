/**
 * @license
 * Copyright 2017 Google Inc.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const puppeteer = require('puppeteer');
require('dotenv').config();

const delay = (milliseconds, message) =>
  new Promise((resolve) => {
    message && console.log(`🟩 ${message}`);
    setTimeout(resolve, milliseconds);
  });

async function autoScroll(page, scrollCount) {
  await page.evaluate(async (scrollCount) => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 1000;
      var count = 0;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        count += 1;

        console.log('Scrolling...');
        if (count >= scrollCount) {
          clearInterval(timer);
          resolve();
        }
      }, 1000);
    });
  }, scrollCount);
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto(process.env.JUMPIT_TARGET_URL);
  await delay(2000, `웹페이지 도착`);

  try {
    const btn_first_popup = await page.waitForSelector(
      'button ::-p-text(오늘은 이대로 볼래요)',
      { visible: true }
    );
    await delay(2000, `첫 팝업 -> 메인화면`);
    await btn_first_popup.click();
  } catch (error) {
    console.log('첫 팝업 버튼이 없네요');
  }

  const btn_login = await page.waitForSelector(
    'button ::-p-text(회원가입/로그인)'
  );
  await delay(2000, `메인화면 -> 로그인 버튼 클릭`);
  await btn_login.click();

  await page.waitForSelector('#email');
  await page.type('#email', process.env.JUMPIT_EMAIL); // id #email에 메일 주소 기입
  await delay(2000, `이메일 기입`);
  page.keyboard.press('Enter');

  await page.waitForSelector('#password');
  await page.type('#password', process.env.JUMPIT_PASSWORD);
  await delay(2000, `비밀번호 기입`);
  page.keyboard.press('Enter');

  console.log(`🟫 로그인 성공================`);

  await delay(2000, `대기`);
  await page.goto(process.env.JUMPIT_TARGET_URL2);
  await delay(2000, `대기`);
  const btn_order_recent = await page.waitForSelector(
    'button ::-p-text(최신순)',
    { visible: true }
  );
  await btn_order_recent.click();
  await delay(2000, `최신순 정렬 클릭`);

  /**
   * 브라우저 창에 콘솔로그 띄움
   * puppeteer 실행환경에서 node.js 콘솔에서 출력 안됨. 따라서 page.on 메소드로 console 이벤트 감지하여 로그 띄어주는 방식으로
   */
  // await page.on('console', (msg) => console.log('🟩 LOG:', msg.text()));

  // 10개 기준 약 50개 게시물 확인 가능
  await autoScroll(page, 10);

  const jobArticles = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll('body > main > div > section > section > div'),
      (element) => {
        const anchor = element.querySelector('a');
        const img = element.querySelector('img');
        const viewCount = element.querySelector('.position_view_count span');
        const titles = Array.from(
          element.querySelectorAll('ul > li'),
          (li) => li.innerText
        );

        return {
          title: anchor ? anchor.title : null,
          href: anchor ? anchor.href : null,
          imgSrc: img ? img.src : null,
          viewCount: viewCount ? viewCount.innerText : null,
          techStacks: titles,
        };
      }
    )
  );

  const filteredJobArticles = jobArticles.filter((job) => {
    const regex = /^https:\/\/www\.jumpit\.co\.kr\/position\/\d+$/;
    return regex.test(job.href);
  });

  console.log(filteredJobArticles);

  const records = [];

  for await (const job of filteredJobArticles) {
    console.log(job.href);
    page.goto(job.href);
    await delay(3000, `페이지 이동`);

    // 스크린샷 남기기
    // const today = new Date();
    // today.toISOString().substring(0, 10);
    // await page.screenshot({
    //   path: `./log/captures/${today}-${records.length}.png`,
    //   fullPage: false,
    // });

    const btn_apply = await page.$eval(
      '.position_wing_con > div > div',
      (button) => button.innerText
    );

    let isApplied = false;

    if (btn_apply === '지원하기') {
      await page.click('.position_wing_con > div > div');
      await delay(2000, `지원하기 버튼 누르기`);

      await page.click(
        'form > div > main > div > section:nth-child(4) > ul > li > div:nth-child(1) > input[type=checkbox]'
      );
      await delay(2000, `체크박스 선택`);

      await page.click('.position_wing_con > div > div');

      isApplied = true;
    }

    records.push({
      title: job.title,
      url: job.href,
      viewCount: job.viewCount,
      techStacks: job.techStacks,
      isApplied,
    });

    await delay(3000, `다음 페이지`);
    // page.goBack();
  }

  console.log(records);

  const count_apply = Number(records.filter((job) => job.isApplied).length);

  console.log(
    `🟥 총 ${records.length}건의 게시글 중, ${count_apply}건 지원, ${
      records.length - count_apply
    }건 패스`
  );

  await browser.close();
})();
