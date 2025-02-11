import { test, expect } from '@playwright/test';
import APIPage from '../pages/APIPage';

test('Verify API Documentation', async ({ page, request }) => {
  const apiPage = new APIPage(page);
  await apiPage.navigate();
  await apiPage.openAPIList();
  await apiPage.expandAPITabs(5);

  const apiInfo = await apiPage.getAPIInfo();
  console.log(apiInfo);

  // Sample API request validation
  const response = await request.get('https://automationexercise.com/api/productsList');
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('products');
});
