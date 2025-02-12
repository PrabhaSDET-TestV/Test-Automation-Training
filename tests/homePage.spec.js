import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import homePageData from '../data/homePageData.json';

test.describe('Home Page Verification', () => {
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
  });

  test('Verify menu options', async () => {
    const menuOptions = await homePage.getMenuOptions();
    console.log(menuOptions)
    expect(menuOptions).toEqual(homePageData.menuOptions);
  });

  test('Verify carousel contains expected slides', async () => {
    const { slideCount } = await homePage.getCarouselDetails();
    expect(slideCount).toBe(homePageData.carouselSlides);
  });
  
  test('Verify categories section', async () => {
    const { count, names } = await homePage.getCategories();
    console.log(count , names);
    expect(count).toBe(homePageData.categoriesCount);
    expect(names).toEqual(homePageData.expectedCategories);
  });
  
  test('Verify brands section count and names', async () => {
    const { count, names } = await homePage.getBrandDetails();
    console.log(names)
    expect(count).toBe(homePageData.brandsCount);
    expect(names).toEqual(homePageData.brandsList);
  });

  test('Verify featured items are visible', async () => {
    expect(await homePage.isFeaturedItemsVisible()).toBe(true);
  });

  test('Verify footer subscription section visibility', async () => {
    expect(await homePage.isFooterSubscriptionVisible()).toBe(true);
    expect(await homePage.isSubscriptionButtonVisible()).toBe(true);
  });
  
});
