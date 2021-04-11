const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://chatilyzer.com');
  await page.screenshot({path: './public/uploads'});

  await browser.close();
})();