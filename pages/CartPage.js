class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart_description h4 a');
        this.cartPrices = page.locator('.cart_total .cart_total_price');
        this.proceedToCheckoutButton = page.locator('.btn.btn-default.check_out');
    }

    async getCartProducts() {
        const productNames = await this.cartItems.allTextContents();
        const productPrices = await this.cartPrices.allTextContents();

        return productNames.map((name, index) => ({
            name,
            price: productPrices[index]
        }));
    }

    async proceedToCheckout() {
        await this.proceedToCheckoutButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}

export default CartPage;
