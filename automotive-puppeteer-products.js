const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const fs = require('fs');

const contents = fs.readFileSync('automotive-oem.txt', 'utf-8');
const arr = contents.split(/\r?\n/);

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

  let curr = 1;
  for (const pro of arr){
    console.log(curr)
    await page.goto(pro,{
      waitUntil: 'networkidle2',
      ignoreHTTPSerrors: true
    });
    await Promise.all(promises);
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    await page.screenshot({path: `automotive-pro-pages/example${curr}.png`});
          console.log(data);
          fs.writeFile(`automotive-pro-pages/Output${curr}.html`, data, (err) => {
      
            // In case of a error throw err.
            if (err) throw err;
      })
      promises.push(new Promise(r => setTimeout(r, 3500)));
      curr += 1;
    }
  await browser.close(); 
})();