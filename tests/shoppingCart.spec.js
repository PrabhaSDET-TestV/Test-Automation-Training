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

    // Step 3: Add the first T-shirt
    const product1 = "Pure Cotton Neon Green Tshirt";
    await productPage.scrollToProduct(product1);
    const productDetails1 = await productPage.verifyProductDetails(product1);
    console.log(productDetails1);
    expect(productDetails1.name).toBe(testData.product1Name);
    expect(productDetails1.addToCartVisible).toBe(true);
    await productPage.addToCart(product1);
    await productPage.continueShopping();

    // Step 4: Add the second T-shirt
    const product2 = "GRAPHIC DESIGN MEN T SHIRT - BLUE";
    await productPage.scrollToProduct(product2);
    const productDetails2 = await productPage.verifyProductDetails(product2);
    console.log(productDetails2);
    expect(productDetails2.name).toBe(testData.product2Name);
    expect(productDetails2.addToCartVisible).toBe(true);
    await productPage.addToCart(product2);

    // Step 5: View cart
    await productPage.viewCart();

    // Step 6: Verify cart contains correct products
    const cartProducts = await cartPage.getCartProducts();
    expect(cartProducts).toEqual(testData.expectedCartProducts);

    // Step 7: Proceed to checkout
    await cartPage.proceedToCheckout();
});
