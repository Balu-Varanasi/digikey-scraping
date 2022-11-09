const puppeteer = require('puppeteer');
const fs = require('fs');
(async () => {
  const browser = await puppeteer.launch({
    headless: 'chrome',
    ignoreDefaultArgs: ['--disable-extensions'],
  });
  const page = await browser.newPage();
  /*
  await page.setUserAgent('user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36');
  console.log(await browser.userAgent());
  console.log(await browser.version());
  await p.setViewport({ width: 1000, height: 500 })
  const promises = [];
  promises.push(page.waitForNavigation());
  await page.goto('https://www.digikey.com/en/products/filter/embedded/microprocessors/694?s=N4IgTCBcDaIMYFMA2CBOB7AdiAugGhAFYpQAHKAZgNPMjEIF8Gg',{
  waitUntil: 'networkidle2',
  });
  await Promise.all(promises);
  //const element = await waitForSelectors([["aria/2","aria/[role=\"generic\"]"],["[data-testid=btn-page-2] > span"]]);
  //await element.click();
  const data = await page.evaluate(() => document.querySelector('*').outerHTML);
  await page.screenshot({path: 'example.png'});
        console.log(data);
        fs.writeFile('Output.html', data, (err) => {

          // In case of a error throw err.
          if (err) throw err;
      })*/
  await browser.close();
})();
