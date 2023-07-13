import puppeteer from "puppeteer";

class SwapCoinAutomation {
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
  }

  async goToPage(url) {
    await this.page.goto(url);
  }

  async searchAndSelect(tokenName, searchSelector, childNum = 0) {
    await this.page.waitForSelector(searchSelector);
    await this.page.type(searchSelector, tokenName, { delay: 100 });
    await new Promise((r) => setTimeout(r, 1500));

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

  async performCoinSwap(selector, tokenName, route = 0, sellAmount = 0) {
    const searchSelector = 'input[placeholder="Search... (Symbol or Address)"]';
    const inputSelector = `#__next > div > div > div.sc-889ee977-0.gCbopq > main > div.sc-55ee4011-1.cZHlms > div.sc-55ee4011-3.dlZmAt > div.sc-55ee4011-0.iXoIVV > div.css-1urcov8 > div:nth-child(${selector}) > div.css-1k491an > div > input`;
    const btnSelector = `#__next > div > div > div.sc-889ee977-0.gCbopq > main > div.sc-55ee4011-1.cZHlms > div.sc-55ee4011-3.dlZmAt > div.sc-55ee4011-0.iXoIVV > div.css-1urcov8 > div:nth-child(${selector}) > div.css-1k491an > button`;

    if (sellAmount !== 0) {
      await this.enterAmount(sellAmount, inputSelector);
    }
    await this.page.click(btnSelector);

    if (route === 1) {
      await this.searchAndSelect(tokenName, searchSelector, 2);
      await new Promise((r) => setTimeout(r, 5000));
      await this.page.click(
        "#__next > div > div > div.sc-889ee977-0.gCbopq > main > div.sc-55ee4011-1.cZHlms > div.sc-55ee4011-3.dlZmAt > div.sc-55ee4011-2.fcGAPg > div:nth-child(5)"
      );
    } else {
      await this.searchAndSelect(tokenName, searchSelector, 1);
      await new Promise((r) => setTimeout(r, 1500));
    }
  }

  async run() {
    try {
      await this.launchBrowser();
      await this.createPage();

      await this.goToPage("https://swap.defillama.com/");

      await this.searchAndSelect("arbi", "#react-select-2-input");

      await this.performCoinSwap(1, "wbtc", 0, 12);
      await this.performCoinSwap(3, "usd coin", 1);
    } catch (error) {
      console.log(error);
    }
  }
}

const swapCoinAutomation = new SwapCoinAutomation();
swapCoinAutomation.run();
