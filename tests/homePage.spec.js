import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import homePageData from '../data/homePageData.json';

test.describe('Home Page Verification', () => {
  test.beforeEach(async ({ page }) => {
    this.homePage = new HomePage(page);
    await this.homePage.navigate();
  });

  test('Verify menu options', async () => {
    const menuOptions = await this.homePage.getMenuOptions();
    expect(menuOptions).toEqual(homePageData.menuOptions);
  });

  test('Verify carousel contains expected slides', async () => {
    expect(await this.homePage.getCarouselSlideCount()).toBe(homePageData.carouselSlides);
  });

  test('Verify categories section count', async () => {
    expect(await this.homePage.getCategoryCount()).toBe(homePageData.categoriesCount);
  });

  test('Verify brands section count', async () => {
    expect(await this.homePage.getBrandCount()).toBe(homePageData.brandsCount);
  });
});
