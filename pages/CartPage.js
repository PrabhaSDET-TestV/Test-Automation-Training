class CartPage {
    constructor(page) {
      this.page = page;
      this.menCategory = page.locator('a[href="#Men"]');
      this.tshirtsSubCategory = page.locator('a[href="/category_products/3"]');
      this.productList = page.locator('.features_items .product-image-wrapper');
      this.addToCartButtons = page.locator('.product-overlay a.add-to-cart');
      this.continueShoppingButton = page.locator('button:has-text("Continue Shopping")');
      this.viewCartButton = page.locator('a[href="/view_cart"]');
      this.cartProducts = page.locator('.cart_info table tbody tr');
      this.checkoutButton = page.locator('.check_out');
    }
  
    async navigate() {
      await this.page.goto('https://automationexercise.com/');
    }
  
    async goToTShirts() {
      await this.menCategory.hover();
      await this.tshirtsSubCategory.click();
    }
  
    async addTShirtToCart(index) {
      const product = this.productList.nth(index);
      await product.hover();
      await this.addToCartButtons.nth(index).click();
      await this.continueShoppingButton.click();
    }
  
    async openCart() {
      await this.viewCartButton.click();
    }
  
    async verifyCartItems() {
      return await this.cartProducts.count();
    }
  
    async proceedToCheckout() {
      await this.checkoutButton.click();
    }
  }
  
  export default CartPage;
  