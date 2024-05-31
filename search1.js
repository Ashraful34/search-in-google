const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navigate to Google homepage
    await page.goto('https://www.google.com', { waitUntil: 'load', timeout: 0 });

    // Wait for the search input field to be present
    await page.waitForSelector('input[name="q"]');
    
    console.log('Please type your query in the Google search input field and press Enter.');
    
    // Wait for the user to press Enter (submitting the search)
    await page.waitForNavigation({ waitUntil: 'load', timeout: 0 });

    // Evaluate the search results
    const results = await page.evaluate(() => {
      const resultElements = document.querySelectorAll('#rso .g');
      const titles = [];
      resultElements.forEach(element => {
        const titleElement = element.querySelector('h3');
        if (titleElement) {
          titles.push(titleElement.innerText);
        }
      });
      return titles;
    });

    // Log the results to the console
    console.log(results);

    // Close the browser
    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();
