import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: false,
    headless: false,
  });

  const page = await browser.newPage();
  // const navigationPromise = page.waitForNavigation({
  //   waitUntil: "domcontentloaded",
  // });

  await page.goto("https://swap.defillama.com/");
  await page.exposeFunction("getItem", function (a) {
    console.log(a);
  });

  await page.type("#react-select-2-input", "arbi");
  page.keyboard.press("Enter");

  const sellVal = await page.$eval(
    "#__next > div > div > div.sc-889ee977-0.gCbopq > main > div.sc-55ee4011-1.cZHlms > div.sc-55ee4011-3.dlZmAt > div.sc-55ee4011-0.iXoIVV > div.css-1urcov8 > div:nth-child(1) > div.css-1k491an > div > input",
    (el) => el.value
  );

  await page.click(
    "#__next > div > div > div.sc-889ee977-0.gCbopq > main > div.sc-55ee4011-1.cZHlms > div.sc-55ee4011-3.dlZmAt > div.sc-55ee4011-0.iXoIVV > div.css-1urcov8 > div:nth-child(1) > div.css-1k491an > div > input"
  );
  for (let i = 0; i < sellVal.length; i++) {
    await page.keyboard.press("Backspace");
  }

  await page.type(
    "#__next > div > div > div.sc-889ee977-0.gCbopq > main > div.sc-55ee4011-1.cZHlms > div.sc-55ee4011-3.dlZmAt > div.sc-55ee4011-0.iXoIVV > div.css-1urcov8 > div:nth-child(1) > div.css-1k491an > div > input",
    "12"
  );

  await page.click(
    "#__next > div > div > div.sc-889ee977-0.gCbopq > main > div.sc-55ee4011-1.cZHlms > div.sc-55ee4011-3.dlZmAt > div.sc-55ee4011-0.iXoIVV > div.css-1urcov8 > div:nth-child(1) > div.css-1k491an > button"
  );

  await page.type(
    'input[placeholder="Search... (Symbol or Address)"]',
    "wbtc",
    { delay: 100 }
  );

  await page.waitForTimeout(1000);

  await page.click(
    'section[role = "dialog"] > div.List > div > div:nth-child(1)'
  );

  await page.click(
    "#__next > div > div > div.sc-889ee977-0.gCbopq > main > div.sc-55ee4011-1.cZHlms > div.sc-55ee4011-3.dlZmAt > div.sc-55ee4011-0.iXoIVV > div.css-1urcov8 > div:nth-child(3) > div.css-1k491an > button"
  );
  await page.type(
    'input[placeholder="Search... (Symbol or Address)"]',
    "usd coin",
    { delay: 100 }
  );
  await page.waitForTimeout(1500);

  await page.click(
    'section[role = "dialog"] > div.List > div > div:nth-child(2)'
  );

  await page.waitForTimeout(7000);
  await page.click(
    "#__next > div > div > div.sc-889ee977-0.gCbopq > main > div.sc-55ee4011-1.cZHlms > div.sc-55ee4011-3.dlZmAt > div.sc-55ee4011-2.fcGAPg > div:nth-child(4)"
  );
})();
