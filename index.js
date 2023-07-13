import puppeteer from "puppeteer";

class SwapAutomation {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async launchBrowser() {
    this.browser = await puppeteer.launch({
      defaultViewport: false,
      headless: false,
    });
  }

  async createPage() {
    this.page = await this.browser.newPage();
    // await this.page.exposeFunction("getItem", (a) => {
    //   console.log(a);
    // });
  }

  async goToPage(url) {
    await this.page.goto(url);
  }

  async searchAndSelect(tokenName, inputSelector, childNum = 0) {
    await this.page.waitForSelector(inputSelector);
    await this.page.type(inputSelector, tokenName, { delay: 100 });
    await this.page.waitForTimeout(1500);

    if (childNum === 0) {
      this.page.keyboard.press("Enter");
    } else {
      this.page.click(
        `section[role = "dialog"] > div.List > div > div:nth-child(${childNum})`
      );
    }
  }

  async enterAmount(amount, inputSelector) {
    await this.page.click(inputSelector);
    const sellVal = await this.page.$eval(inputSelector, (el) => el.value);
    for (let i = 0; i < sellVal.length; i++) {
      await this.page.keyboard.press("Backspace");
    }
    await this.page.type(inputSelector, amount.toString());
  }

  async performSwap(
    sellAmount,
    sellInputSelector,
    elSelector,
    buyTokenName,
    buyInputSelector,
    route = 0
  ) {
    if (sellAmount !== 0) {
      await this.enterAmount(sellAmount, sellInputSelector);
    }
    await this.page.click(elSelector);

    if (route === 1) {
      await this.searchAndSelect(buyTokenName, buyInputSelector, 2);
      await this.page.waitForTimeout(7000);
      await this.page.click(
        "#__next > div > div > div.sc-889ee977-0.gCbopq > main > div.sc-55ee4011-1.cZHlms > div.sc-55ee4011-3.dlZmAt > div.sc-55ee4011-2.fcGAPg > div:nth-child(5)"
      );
    } else {
      await this.searchAndSelect(buyTokenName, buyInputSelector, 1);
    }
  }

  async run() {
    try {
      await this.launchBrowser();
      await this.createPage();

      await this.goToPage("https://swap.defillama.com/");

      await this.searchAndSelect("arbi", "#react-select-2-input");

      await this.performSwap(
        12,
        "#__next > div > div > div.sc-889ee977-0.gCbopq > main > div.sc-55ee4011-1.cZHlms > div.sc-55ee4011-3.dlZmAt > div.sc-55ee4011-0.iXoIVV > div.css-1urcov8 > div:nth-child(1) > div.css-1k491an > div > input",
        "#__next > div > div > div.sc-889ee977-0.gCbopq > main > div.sc-55ee4011-1.cZHlms > div.sc-55ee4011-3.dlZmAt > div.sc-55ee4011-0.iXoIVV > div.css-1urcov8 > div:nth-child(1) > div.css-1k491an > button",
        "wbtc",
        'input[placeholder="Search... (Symbol or Address)"]'
      );

      await this.performSwap(
        0,
        "#__next > div > div > div.sc-889ee977-0.gCbopq > main > div.sc-55ee4011-1.cZHlms > div.sc-55ee4011-3.dlZmAt > div.sc-55ee4011-0.iXoIVV > div.css-1urcov8 > div:nth-child(3) > div.css-1k491an > div > input",
        "#__next > div > div > div.sc-889ee977-0.gCbopq > main > div.sc-55ee4011-1.cZHlms > div.sc-55ee4011-3.dlZmAt > div.sc-55ee4011-0.iXoIVV > div.css-1urcov8 > div:nth-child(3) > div.css-1k491an > button",
        "usd coin",
        'input[placeholder="Search... (Symbol or Address)"]',
        1
      );

      await this.page.waitForTimeout(5000);
    } catch (error) {
    } finally {
    }
  }
}

const swapAutomation = new SwapAutomation();
swapAutomation.run();
