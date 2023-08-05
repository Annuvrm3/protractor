var EC = protractor.ExpectedConditions;
const { browser } = require('protractor');
let campaign = require('../../../pages/campaign_creation.js');

describe('delete campaign', function(){
  it('login_CCDMS', function(){
    let url = "https://saral-staging.ccdms.in/login"; 
    let user_name = "admin@jarvis.consulting";
    let set_password = "Praveen@2022";
    let otp = "010203";

    // campaign.login(url, user_name, set_password, otp);
    campaign.get(url);
    browser.manage().window().maximize();
    campaign.setUserName(user_name);
    campaign.setPassword(set_password);
    campaign.sendOTP();
    campaign.setOtp(otp);
    campaign.submit();
    browser.sleep(3000);
    })
  
  it('delete automated campaigns', async function () {
    var currentDate = new Date();
    var day = currentDate.getDate().toString().padStart(2, '0');
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    var formattedDate = day + '-' + month + '-' + currentDate.getFullYear();
  
    campaign.left_panel();
    await browser.sleep(2000);
    campaign.Campaigns();
    await browser.sleep(5000);

  
    const elements = element.all(by.xpath('(//tbody/tr/td/a[contains(text(),"Automated")])'));
    // const elementCount = elements.count();
    

    for (const ele of await elements) {
      await ele.click();
      await browser.sleep(2000);

      const button = element(by.css('button.ui.fluid.button'));

      // Check if the button is enabled
      const isEnabled = await button.isEnabled();
      if (isEnabled) {
        await closeDate();
        await sendEndDate(formattedDate);
        await saveEndDate();
      } 
      else {
        // Button is disabled, handle the disabled state
        console.log("Button is disabled. Cannot click.");
      }

      await campaignsPage();
      await browser.sleep(2000);
    }
  });

    async function closeDate() {
      let date = element(by.xpath('(//button[@onclick="showDateModal()"])'));
      await browser.executeScript("arguments[0].click();", date);
    };

    async function sendEndDate(formattedDate) {
      const end_date = element(by.xpath('(//input[@id="input_date"])'));
      await browser.executeScript("arguments[0].scrollIntoView(true);", end_date);
      await end_date.sendKeys(formattedDate);
    };

    async function saveEndDate() {
      let saveButton = element(by.xpath('(//button[text()="Save"])[last()]'));
      await saveButton.click();
    };

    async function campaignsPage() {
      let return_campaign_page = element(by.xpath('//*[@id="top_body"]/div[1]/div[2]/ol/li[2]/a'));
      await return_campaign_page.click();
    };
});
// })