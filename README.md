
# COIN SWAP AUTOMATION

This project demonstrates an automation script built with Puppeteer to perform swaps on the "https://swap.defillama.com/" website.

## Prerequisites

- Node.js (v12 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```sh
git clone https://github.com/FalconG2001/puppeteer-automation.git
```

2. Install the dependencies

```sh
cd <project_folder>
npm install
```

## Usage

1. Open the **index.js** file and modify the swap operations as per your requirements. You can update the token or chain names, selectors, and amount in the run method.

2. Run the automation script:

```sh
npm start
```

The script will launch a Puppeteer-controlled browser and perform the specified swap operations on the [swap.defillama.com](https://swap.defillama.com/) website.

**Note:** By default, the browser runs in non-headless mode, meaning you can see the browser window during the automation process. If you want to run the browser in headless mode, update the headless option in the launchBrowser method of the **SwapCoinAutomation** class.

## Class: SwapCoinAutomation
Constructor
```js
Constructor()
```
- Initializes the `SwapCoinAutomation` class.
- Sets the `browser` and `page` properties to `null`.

### Methods
```js
launchBrowser()
```
- Launches a Puppeteer-controlled browser.
- Sets the `browser` property.

```js
createPage()
```
- Creates a new page in the Puppeteer-controlled browser.
- Sets the `page` property.

```js
goToPage(url: string)
```
- Navigates the Puppeteer-controlled browser to the specified `url`.

```js
searchAndSelect(name: string, searchSelector: string, child: number = 0)
```
- Types the `name` into the search input field specified by `searchSelector`.
- Waits for the specified selector to be available on the page.
- Presses the **"Enter"** key if `child` is `0`.
- Clicks on the specified child element if `child` is not `0`.

```js
enterAmount(amount: number, inputSelector: string)
```
- Clicks on the input field specified by `inputSelector`.
- Retrieves the current value of the input field.
- Clears the input field by pressing the **"Backspace"** key for each character.
- Types the specified `amount` into the input field.

```js
performCoinSwap(child: number, tokenName: string, option: number = 0, sellAmount: number = 0)
```
- Performs a swap operation based on the provided parameters.
- `child` specifies the index of the target element on the page.
- `tokenName` is the name of the token to search and select.
- `option` specifies whether to select the token from the first or second search result (default is 0).
- `sellAmount` is the amount to be entered in the input field (default is 0).

```js
run()
```
- Executes the automation script.
- Calls the necessary methods to navigate to the website, perform searches, and execute swaps.
