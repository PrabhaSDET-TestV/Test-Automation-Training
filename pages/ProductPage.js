class ProductPage {
    constructor(page) {
        this.page = page;
    }

    getProductLocator(productName) {
        return this.page.locator('.productinfo').filter({ hasText: productName });
    }

    getAddToCartButton(productName) {
        return this.getProductLocator(productName).getByRole('link', { name: 'Add to cart' });
    }

    async scrollToProduct(productName) {
        const product = this.getProductLocator(productName).first();
        await product.scrollIntoViewIfNeeded();
    }

    async verifyProductDetails(productName) {
        const product = this.getProductLocator(productName);
        return {
            name: await product.locator('p').textContent(),
            addToCartVisible: await this.getAddToCartButton(productName).first().isVisible(),
        };
    }

    async addToCart(productName) {
        await this.getAddToCartButton(productName).first().click();
        await this.page.waitForSelector('.modal-content', { state: 'visible' });
    }

    async continueShopping() {
        await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
    }

    async viewCart() {
        await this.page.getByRole('link', { name: 'View Cart' }).click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}

export default ProductPage;
