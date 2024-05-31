const puppeteer = require("puppeteer");
(async()=> {
    try {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto('https:/facebook.com');
        await page.screenshot({path: 'lol.png'});
        await browser.close();
    } catch (error) {
        console.log(error);
    }
})();