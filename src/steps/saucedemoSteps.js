import { Given, When, Then } from '@cucumber/cucumber';
// import { expect } from 'webdriverio';
// import { expect } from 'chai';
import LoginPage from '../pages/LoginPage.js';
import InventoryPage from '../pages/ProductsPage.js';
import CartPage from '../pages/CartPage.js';
import CheckoutPage from '../pages/CheckoutPage.js';

// Login Steps
Given('I am on the Sauce Demo login page', async () => {
  await LoginPage.open();
});

Given('I am logged in to the inventory page', async () => {
  await LoginPage.open();
  await LoginPage.login('standard_user', 'secret_sauce');
  await LoginPage.loginButton.click();
  await expect(InventoryPage.inventoryList).toBeDisplayed();
});

When('I enter valid credentials', async () => {
  await LoginPage.login('standard_user', 'secret_sauce');
});

When('I enter invalid credentials', async () => {
  await LoginPage.login('invalid_user', 'invalid_password');
});

When('I click the login button', async () => {
  await LoginPage.loginButton.click();

});

Then('I should see the inventory page', async () => {
  await expect(InventoryPage.inventoryList).toBeDisplayed();
});

Then('I should see an error message', async () => {
  const errorMessage = await LoginPage.getErrorMessage();
  await expect(errorMessage).toContain('Epic sadface');
});

// Sorting Products
When('I sort products by {string}', async (option) => {
  await InventoryPage.sortProductsBy(option);
});

Then('the products should be sorted by price in ascending order', async () => {
  const prices = await $$('//div[@class="inventory_item_price"]').map(async (el) =>
    parseFloat((await el.getText()).replace('$', ''))
  );
  await expect(prices).toEqual(prices.sort((a, b) => a - b));
});

// Cart Operations
When('I add the {string} to the cart', async (productName) => {
  await InventoryPage.addProductToCart(productName);
});

Then('the cart icon displays {int} items', async (itemCount) => {
  const cartBadgeText = await InventoryPage.cartIcon.getText();
  await expect(parseInt(cartBadgeText)).toEqual(itemCount);
  await browser.refresh();
});

Given('I have items in my cart', async () => {
  await browser.pause(2000);
  await $('//a[@class="shopping_cart_link"]').click();
  await browser.pause(2000);
  const isBackpackInCart = await $('//div[text()="Sauce Labs Backpack"]');
  const isBikeLightInCart = await $('//div[text()="Sauce Labs Bike Light"]');
  await expect(isBackpackInCart).toExist();
  await expect(isBikeLightInCart).toExist();

});

When('I remove the {string} from the cart', async (productName) => {

  await CartPage.removeProductFromCart(productName); 
});

Then('the cart icon should show {int} item', async (itemCount) => {
  const cartBadgeText = await InventoryPage.cartIcon.getText();
  await expect(parseInt(cartBadgeText)).toEqual(itemCount);
});

// Checkout Steps
When('I proceed to the checkout page', async () => {
  await InventoryPage.addProductToCart('Sauce Labs Backpack');
  await InventoryPage.addProductToCart('Sauce Labs Bike Light');
  // Navigate to the cart page
  await $('.shopping_cart_link').click();
  await CheckoutPage.checkoutButton.click();
});

When('I fill in my details with valid information', async () => {
  await CheckoutPage.fillCheckoutDetails('John', 'Doe', '12345');
});

When('I complete the order', async () => {
  await CheckoutPage.completeOrder();
});

Then('I should see the order confirmation message', async () => {
  const confirmationText = await CheckoutPage.confirmationMessage.getText();
  await expect(confirmationText).toEqual('Thank you for your order!');
});

