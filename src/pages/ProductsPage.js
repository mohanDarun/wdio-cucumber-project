class InventoryPage {
  get inventoryList() {
    return $('.inventory_list');
  }
  get productSortDropdown() {
    return $('//select[@class="product_sort_container"]');
  }
  get cartIcon() {
    return $('.shopping_cart_badge');
  }

  productAddToCart(productName) {
    return $(`//div[text()="${productName}"]/ancestor::div[@class="inventory_item"]//button`);
  }

  async addProductToCart(productName) {
    const addToCartButton = await this.productAddToCart(productName);
    await addToCartButton.scrollIntoView();
    await addToCartButton.click();
  }

  async sortProductsBy(option) {
    await this.productSortDropdown.selectByVisibleText(option);
  }

  async addProductsToCart(productNames) {
    for (const productName of productNames) {
      const addToCartButton = await this.productAddToCart(productName);
      await addToCartButton.scrollIntoView();
      await addToCartButton.click();
    }
  }
  
}

export default new InventoryPage();
