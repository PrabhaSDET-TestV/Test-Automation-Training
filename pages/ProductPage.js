class ProductPage {
    constructor(page) {
        this.page = page;
        this.tshirtProduct = page.getByText('Pure Cotton Neon Green Tshirt').first();
        this.addToCartButton = this.tshirtProduct.locator('.add-to-cart');
        this.successPopup = page.locator('.modal-content'); // Success message popup
        this.continueShoppingButton = page.locator('.btn-success:has-text("Continue Shopping")');
        this.viewCartButton = page.locator('.btn-success:has-text("View Cart")');
    }

    async scrollToProduct() {
        await this.tshirtProduct.scrollIntoViewIfNeeded();
    }

    async verifyProductDetails() {
        return {
            name: await this.tshirtProduct.textContent(),
            addToCartVisible: await this.addToCartButton.isVisible(),
        };
    }

    async addToCart() {
        await this.addToCartButton.click();
        await this.page.waitForSelector('.modal-content', { state: 'visible' });
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
        await this.page.waitForSelector('.modal-content', { state: 'hidden' });
    }

    async viewCart() {
        await this.viewCartButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}

module.exports = ProductPage;
