import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';

test.describe('Home Page Verification', () => {
  test.beforeEach(async ({ page }) => {
    this.homePage = new HomePage(page);
    await this.homePage.navigate();
  });

  test('Verify menu options', async () => {
    const menuOptions = await this.homePage.getMenuOptions();
    expect(menuOptions).toEqual([
      'Home', 'Products', 'Cart', 'Signup / Login', 'Test Cases', 'API Testing', 'Video Tutorials', 'Contact us'
    ]);
  });

  test('Verify carousel contains 3 slides', async () => {
    expect(await this.homePage.getCarouselSlideCount()).toBe(3);
  });

  test('Verify categories section contains 3 categories', async () => {
    expect(await this.homePage.getCategoryCount()).toBe(3);
  });

  test('Verify brands section contains 9 brands', async () => {
    expect(await this.homePage.getBrandCount()).toBe(9);
  });

  test('Verify featured items section is visible', async () => {
    expect(await this.homePage.isFeaturedItemsVisible()).toBeTruthy();
  });

  test('Verify footer subscription is visible', async () => {
    expect(await this.homePage.isFooterSubscriptionVisible()).toBeTruthy();
  });
});
