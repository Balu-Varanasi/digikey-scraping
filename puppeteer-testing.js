const puppeteer = require('puppeteer');
const fs = require('fs');
(async () => {
  const browser = await puppeteer.launch({
    ignoreDefaultArgs: ['--disable-extensions'],
  });
  console.log(await browser.userAgent());
  console.log(await browser.version());
  const page = await browser.newPage();
  const promises = [];
  promises.push(page.waitForNavigation());
  await page.goto('https://www.digikey.com/en/products/filter/embedded-microprocessors/694?s=N4IgTCBcDaIMYFMA2CBOB7AdiAugXyA',{
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
      })
  await browser.close();
})();
