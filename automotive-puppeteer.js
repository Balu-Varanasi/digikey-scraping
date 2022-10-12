const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs');
(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    IgnoreHTTPSErrors: true,
    args: ["--ignore-certificate-errors"]
  });
  const page = await browser.newPage();
  console.log(await browser.userAgent());
  console.log(await browser.version());
  const promises = [];
  promises.push(page.waitForNavigation());

  await page.goto('https://automotiveoem.com/INDEX',{
  waitUntil: 'networkidle2',
  ignoreHTTPSerrors: true
  });
  await Promise.all(promises);
  let curr = 1;
  while (await page.$(`#datatable-responsive_next`) != null || curr >= 5){
    console.log(curr)
    if(curr != 1){
    await page.click(`#datatable-responsive_next`);
      promises.push(new Promise(r => setTimeout(r, 3000)));
      await Promise.all(promises);
    }
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    await page.screenshot({path: `automotive-temp-pages/example${curr}.png`});
          console.log(data);
          fs.writeFile(`automotive-temp-pages/Output${curr}.html`, data, (err) => {
      
            // In case of a error throw err.
            if (err) throw err;
      })
      curr +=1
    }
  await browser.close(); 
})();