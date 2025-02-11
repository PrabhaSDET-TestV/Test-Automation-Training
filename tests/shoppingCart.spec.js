import { test, expect } from '@playwright/test';
import CartPage from '../pages/CartPage';
import cartTestData from '../data/cartTestData.json';

test('Verify Shopping Cart Flow for T-shirts', async ({ page }) => {
  const cartPage = new CartPage(page);
  await cartPage.navigate();
  await cartPage.goToTShirts();

  for (const product of cartTestData.products) {
    await cartPage.addTShirtToCart(product.productIndex);
  }

  await cartPage.openCart();
  expect(await cartPage.verifyCartItems()).toBe(cartTestData.products.length);

  await cartPage.proceedToCheckout();
});
