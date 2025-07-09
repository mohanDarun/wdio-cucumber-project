class inventoryPage {
    constructor(page) { this.page = page; }

    get inventoryList() { return '.inventory_list'; }
    get inventoryItem() { return '.inventory_item'; }
    get sortDropdown() { return '[data-test="product-sort-container"]'; }
    get priceSelector() { return '.inventory_item_price'; }
    get cartIcon() { return '.shopping_cart_badge'; }
    get cartLink() { return '.shopping_cart_link'; }

    async isInventoryPageVisible() {
        await this.page.waitForSelector(this.inventoryList);
    }

    async getProductCount() {
        return await this.page.locator(this.inventoryItem).count();
    }

    async sortProducts(option) {
        await this.page.selectOption(this.sortDropdown, { label: option });
        await this.page.waitForTimeout(1000);
    }

    async getAllProductPrices() {
        const priceElements = await this.page.$$(this.priceSelector);
        const prices = [];

        for (const el of priceElements) {
            const text = await el.textContent();
            const price = parseFloat(text.replace('$', ''));
            prices.push(price);
        }
        return prices;
    }

    async addProductToCart(productName) {
        const productCard = this.page.locator('.inventory_item').filter({
            has: this.page.locator('.inventory_item_name', { hasText: productName })
        });
        await productCard.locator('button').click();
    }


    async getCartCount() {
        return this.page.textContent(this.cartIcon);
    }

    async goToCart() {
        await this.page.click(this.cartLink);
    }

}

module.exports = inventoryPage;