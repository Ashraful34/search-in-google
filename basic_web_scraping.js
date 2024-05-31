const puppeteer = require('puppeteer');

async function run() {
    try {
        // Launch a new browser instance
        const browser = await puppeteer.launch({ headless: false });
        
        // Create a new page and wait until it is fully created
        const page = await browser.newPage();
        
        // Navigate to Facebook
        await page.goto('https://youtube.com', { waitUntil: 'networkidle2' });
        
        // Get the page title
        const title = await page.title();
        console.log(title);
        
        // Get the text content of the first h1 element
        const heading = await page.$eval('h1', element => element.textContent);
        console.log(heading);
        
        // Take a screenshot of the page
        await page.screenshot({ path: 'youtube.png' });
        
        // Save the page as a PDF
        await page.pdf({ path: 'youtube.pdf', format: 'A4' });
        
        // Close the browser
        await browser.close();
    } catch (error) {
        console.error( error);
    }
}

run();