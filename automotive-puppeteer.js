const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { executablePath } = require('puppeteer');

puppeteer.use(StealthPlugin());
const fs = require('fs');
(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    IgnoreHTTPSErrors: true,
    args: ["--ignore-certificate-errors"],
    // add this
    executablePath: executablePath(),
  });
  const page = await browser.newPage();
  console.log(await browser.userAgent());
  console.log(await browser.version());
  const promises = [];
  promises.push(page.waitForNavigation());

  await page.goto('https://web.archive.org/web/20210613134731/https://automotiveoem.com/1-Source-Design_10854',{
  waitUntil: 'networkidle2',
  ignoreHTTPSerrors: true
  });
  await Promise.all(promises);
  page.setDefaultNavigationTimeout(0);
  let curr = 1;
  while (await page.$(`body > div.container.body > div > div.right_col > div:nth-child(4) > div > div > div.pagination_main.hidden-print > div > nav > ul > li:nth-child(4) > a > span:nth-child(1)`) != null){
    console.log(curr)
    if(curr != 1){
    promises.push(page.waitForNavigation());
    await page.click(`body > div.container.body > div > div.right_col > div:nth-child(4) > div > div > div.pagination_main.hidden-print > div > nav > ul > li:nth-child(4) > a > span:nth-child(1)`);
    promises.push(new Promise(r => setTimeout(r, 4000)));
    await Promise.all(promises);

    }
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    await page.screenshot({path: `automotive-temp-pages-wayback/example${curr}.png`});
          console.log(data);
          fs.writeFile(`automotive-temp-pages-wayback/Output${curr}.html`, data, (err) => {

            // In case of a error throw err.
            if (err) throw err;
      })
      curr +=1
    }
  await browser.close();
})();