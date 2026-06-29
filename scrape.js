const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  console.log('Starting browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  console.log('Navigating to Measurement page...');
  await page.goto('https://3dbharat.com/measurement', { waitUntil: 'networkidle2' });
  
  console.log('Waiting for content to load...');
  await new Promise(r => setTimeout(r, 8000)); // wait for 3D and JS
  
  console.log('Extracting text and structure...');
  
  const data = await page.evaluate(() => {
     const sections = Array.from(document.querySelectorAll('section, header, footer, div'));
     let content = [];
     sections.forEach(sec => {
         if(sec.innerText && sec.innerText.trim().length > 20) {
             content.push({
                 tag: sec.tagName,
                 class: sec.className,
                 text: sec.innerText.substring(0, 500).replace(/\n/g, ' ')
             });
         }
     });
     return content;
  });
  
  const html = await page.content();
  fs.writeFileSync('3dbharat_measurement.json', JSON.stringify(data, null, 2));
  fs.writeFileSync('3dbharat_measurement.txt', html);
  
  console.log('Saved to 3dbharat_measurement.txt');
  
  await browser.close();
  console.log('✅ Scraping done! Created 3dbharat_measurement.json and 3dbharat_measurement.txt');
})();
