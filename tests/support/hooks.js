const { BeforeAll, Before, AfterAll } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

let browser, context, page; // Declare globally

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
});

Before(async function () {
    this.page = await context.newPage();}) ;

AfterAll(async function () {
    await browser.close();
});

module.exports = { getPage: () => page }; // Export function to get `page`
