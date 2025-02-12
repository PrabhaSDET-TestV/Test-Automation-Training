import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage.js';
import ProductPage from '../pages/ProductPage.js';
import CartPage from '../pages/CartPage.js';
import testData from '../data/cartTestData.json'

test('Verify Shopping Cart Flow for T-shirts', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    // Step 1: Launch the website
    await homePage.navigate();

    // Step 2: Navigate to "Men" Category → "T-shirts"
    await homePage.goToMenTShirts();

    // Step 3: Scroll to "Pure Cotton Neon Green Tshirt"
    await productPage.scrollToProduct();

    // Step 4: Verify product details
    const productDetails = await productPage.verifyProductDetails();
    expect(productDetails.name).toBe(testData.productName);
    expect(productDetails.addToCartVisible).toBe(true);

    // Step 5: Add product to cart
    await productPage.addToCart();
    await productPage.continueShopping();

    // Step 6: Add another T-shirt
    await productPage.addToCart();

    // Step 7: View cart
    await productPage.viewCart();

    // Step 8: Verify cart contains correct products
    const cartProducts = await cartPage.getCartProducts();
    expect(cartProducts).toEqual(testData.expectedCartProducts);

    // Step 9: Proceed to checkout
    await cartPage.proceedToCheckout();
});
