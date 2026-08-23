const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 1000, deviceScaleFactor: 2 });
  await page.goto('file:///f:/Evil Droid/Sandbox/workspace/bbr-site/auction-week-poster.html', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 500));
  const card = await page.$('.card');
  await card.screenshot({ path: 'C:/Users/lucas/AppData/Local/Temp/auction-week-preview.png' });
  console.log('saved preview.png');
  await browser.close();
})();
