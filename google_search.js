const puppeteer = require('puppeteer');

(async ()=>{
  try {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    var query = "what is puppeter ?";
    console.log("query : " + query);
    await page.goto('https://www.google.com/search?q' + query, {waitUntil: 'load', timeout: 0});
    var numResult = await page.evaluate(()=>{
      var i = 0;
      document.getElementById("rso").childNodes.forEach(element =>{
        if(element.tagName == "DIV"){
          i++;
        }
      });
      return i;
    });
    var results = [];
    for(let index = 1; index <=numResult; index++){
      await page.waitForXPath('//*[@id="rso"]/div['+ index+']');
      var [xpath]= await page.$x('//*[@id="rso"]/div['+ index+']');
      var check = await page.evaluate(el=> el.getElementsByTagName('H3').length, xpath);
      if(check == 1){
        var data = await page.evaluate(el=> el.getElementsByTagName('H3')[0].innerText, xpath);
        SpeechRecognitionResultList.push(data);
      }
    }
    console.log(results);
    await browser.close();
  } catch (error) {
    console.log(error);
  }
})();