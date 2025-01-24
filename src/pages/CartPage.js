class CartPage {
  get cartItems() {
    return $$('//div[@class="inventory_item_name"]');
  }
  productRemoveFromCart(productName) {
    return $(`//div[text()="${productName}"]/ancestor::div[@class="cart_item_label"]//button`);
  }

  async removeProductFromCart(productName) {
    const removeButton = await this.productRemoveFromCart(productName);
    await removeButton.click();
  }

  async verifyCartItems() {
    const items = await this.cartItems;
    return items.map(async (item) => await item.getText());
  }
}

export default new CartPage();
