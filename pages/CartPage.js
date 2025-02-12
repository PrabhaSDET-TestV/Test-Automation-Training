class CartPage {
  constructor(page) {
      this.page = page;
      this.cartItems = page.locator('.cart_info .product-name');
      this.cartPrices = page.locator('.cart_info .price');
      this.proceedToCheckout = page.locator('.btn-checkout');
  }

  async getCartProducts() {
      return await this.cartItems.allTextContents();
  }

  async getCartPrices() {
      return await this.cartPrices.allTextContents();
  }

  async proceedToCheckout() {
      await this.proceedToCheckout.click();
      await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = CartPage;
