import { test, expect } from '@playwright/test';
import CartPage from '../pages/CartPage';

test('Verify Shopping Cart Flow for T-shirts', async ({ page }) => {
  const cartPage = new CartPage(page);
  await cartPage.navigate();
  await cartPage.goToTShirts();

  // Add first T-shirt
  await cartPage.addTShirtToCart(0);

  // Add another T-shirt
  await cartPage.addTShirtToCart(1);

  // Open cart and verify items
  await cartPage.openCart();
  expect(await cartPage.verifyCartItems()).toBe(2);

  // Proceed to checkout
  await cartPage.proceedToCheckout();
});
