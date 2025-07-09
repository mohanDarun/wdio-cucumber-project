class CartPage {
    constructor(page){
        this.page = page ;
    }

    get cartItemNames() { return '.cart_item .inventory_item_name'};
    
    async removeProduct(productName) {
  
      const product = this.page.locator('.cart_item').filter({
          has: this.page.locator(`.inventory_item_name`, { hasText: productName }),
      });
  
      const button = product.locator('button');
  
      await button.waitFor({ state: 'visible', timeout: 5000 }); // 💡 Ensure it's there
      await button.click();
  }
  

    async getCartItems () {
       const items =  await this.page.$$(this.cartItemNames);
       const names = [];

       for (const item of items) {
        const name = await item.textContent();
        names.push(name.trim());
       }

       return names ;
    }

    async removeProducts(productName){
        this.page.locator()
    }

}module.exports = CartPage;