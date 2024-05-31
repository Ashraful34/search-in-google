const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    var query = "what is puppeteer?";
    console.log("query: " + query);
    await page.goto('https://www.google.com/search?q=' + encodeURIComponent(query), { waitUntil: 'load', timeout: 0 });

    var results = await page.evaluate(() => {
      var resultElements = document.querySelectorAll('#rso .g');
      var titles = [];
      resultElements.forEach(element => {
        var titleElement = element.querySelector('h3');
        if (titleElement) {
          titles.push(titleElement.innerText);
        }
      });
      return titles;
    });

    console.log(results);

    await browser.close();
  } catch (error) {
    console.log(error);
  }
})();
