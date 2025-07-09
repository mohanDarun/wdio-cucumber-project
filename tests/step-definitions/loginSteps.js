const { Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../pages/LoginPage');
const { getPage } = require('../support/hooks'); // Import function
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');


const { error } = require('console');


Given('I open the SauceDemo login page', async function () {
    this.loginPage = new LoginPage(this.page); // ✅ Use `this.page` here
    await this.loginPage.goto();
});

When('I enter valid credentials', async function () {
    await this.loginPage.enterCredentials('standard_user', 'secret_sauce');
});

When('I enter invalid credentials', async function () {
    await this.loginPage.enterCredentials('invalid_user', 'wrong_password');
});

When('I leave the username and password fields empty', async function () {
    await this.loginPage.enterCredentials('', '');
});

When('I click the login button', async function () {
    await this.loginPage.clickLogin();
});

Then('I should see the inventory page', async function () {
    await this.page.waitForSelector('.inventory_list'); // ✅ Using `this.page`
});

Then('I should see an error message {string}' , async function (expectedMessage) {
    const errorMessage = await this.loginPage.getErrorMessage();
    if (errorMessage !== expectedMessage){
        throw new Error (`Expected "${expectedMessage}" , but got : "${errorMessage}"`);
    }
});

Then( 'I should see a list of products' , async function () {
    const inventoryPage = new InventoryPage(this.page);
    const productCount = await inventoryPage.getProductCount();
    if(productCount === 0 ){
        throw new error ('No products found on inventory page');
    }

    console.log(`✅ ${productCount} product(s) found.`) ;
});

Given('I am logged in to the inventory page', async function () {
    const loginPage = new LoginPage(this.page);
    await loginPage.goto();
    await loginPage.enterCredentials('standard_user', 'secret_sauce');
    await loginPage.clickLogin();

    this.inventoryPage = new InventoryPage(this.page);
});

When('I sort products by {string}', async function (sortOption) {
    await this.inventoryPage.sortProducts(sortOption);
});

Then('the first product should have the lowest price' , async function () {
   const prices =  await this.inventoryPage.getAllProductPrices();
   if (prices[0] !== Math.min(...prices)){
        throw new Error(`Expected first price to be lowest , but got ${prices[0]}`);
   }
});

Then('the last product should have the highest price' , async function () {
    const prices = await this.inventoryPage.getAllProductPrices();
    const last = prices[prices.length - 1];
    if (last !== Math.max(...prices)){
        throw new Error(`Expected last price to be highest , but got ${last}`)
    }
});

When('I add the {string} to the cart', { timeout: 10000 }, async function (productName) {
    await this.inventoryPage.addProductToCart(productName);
    await this.page.waitForTimeout(3000);
});


Then('the cart icon should display {string}' , async function (expectedCount) {
    const actualCount = await this.inventoryPage.getCartCount();
    if (actualCount !== expectedCount){
        throw new Error(`Expected cart count "${expectedCount}" , but got "${actualCount}"`);
    }
});

Then('both items should appear in the shopping cart', async function () {
    await this.inventoryPage.goToCart();
    const cartPage = new CartPage(this.page);
    const cartItems = await cartPage.getCartItems();

    const expectedItems = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];
    for (const item of expectedItems) {
        if(!cartItems.includes(item)){
            throw new Error (`Expected item "${item}" not found in cart`)
        }
    }
});

When('I go to the cart', async function () {
    await this.inventoryPage.goToCart();
    this.cartPage = new CartPage(this.page); // reuse for later steps
});

When('I remove the {string} from the cart', async function (productName) {
    await this.cartPage.removeProduct(productName);
    await this.page.waitForTimeout(3000);

});

Then('only {string} should remain in the cart', async function (expectedProduct) {
    const items = await this.cartPage.getCartItems();

    if (items.length !== 1 || items[0] !== expectedProduct) {
        throw new Error(`Expected only "${expectedProduct}" to remain, but got: [${items.join(', ')}]`);
    }
});


Given('I have {string} in my cart', async function (productName) {
    const loginPage = new LoginPage(this.page);
    await loginPage.goto();
    await loginPage.enterCredentials('standard_user', 'secret_sauce');
    await loginPage.clickLogin();

    this.inventoryPage = new InventoryPage(this.page);
    await this.inventoryPage.addProductToCart(productName);
    await this.inventoryPage.goToCart();

    this.cartPage = new CartPage(this.page);
});

When('I proceed to checkout with:', async function (dataTable) {
    const [firstName, lastName, zipCode] = dataTable.rows()[0];

    // ✅ Make sure this is done BEFORE using its methods
    this.checkoutPage = new CheckoutPage(this.page);

    await this.checkoutPage.startCheckout();
    await this.checkoutPage.fillCheckoutForm({ firstName, lastName, zipCode });
});


When('I complete the order', async function () {
    await this.checkoutPage.completeOrder();
});

Then('I should see the confirmation message {string}', async function (expectedMessage) {
    const actualMessage = await this.checkoutPage.getConfirmationMessage();
    if (actualMessage.trim() !== expectedMessage) {
        throw new Error(`Expected: "${expectedMessage}", but got: "${actualMessage}"`);
    }
});

