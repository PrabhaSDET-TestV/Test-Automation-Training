import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import homePageData from '../data/homePageData.json';

test.describe('Home Page Verification', () => {
  let homePage;  // Declare homePage at the describe level

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);  // Initialize HomePage
    await homePage.navigate();
  });

  test('Verify menu options', async () => {
    const menuOptions = await homePage.getMenuOptions();
    expect(menuOptions).toEqual(homePageData.menuOptions);
  });

  test('Verify carousel contains expected slides', async () => {
    expect(await homePage.getCarouselSlideCount()).toBe(homePageData.carouselSlides);
  });

  test('Verify categories section count', async () => {
    expect(await homePage.getCategoryCount()).toBe(homePageData.categoriesCount);
  });

  test('Verify brands section count', async () => {
    expect(await homePage.getBrandCount()).toBe(homePageData.brandsCount);
  });

  test('Verify featured items are visible', async () => {
    expect(await homePage.isFeaturedItemsVisible()).toBe(true);
  });

  test('Verify footer subscription section is visible', async () => {
    expect(await homePage.isFooterSubscriptionVisible()).toBe(true);
  });

  test('Verify subscription functionality', async () => {
    await homePage.subscribe('testuser@example.com');
    // Add an assertion here to check for a confirmation message if needed
  });
});
