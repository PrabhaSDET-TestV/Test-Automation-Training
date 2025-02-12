import { test, expect } from '@playwright/test';
import APIPage from '../pages/APIPage';

test('API 1: Get All Products List', async ({ page, request }) => {
  const apiPage = new APIPage(page);
  
  await page.goto("https://automationexercise.com/");
  await apiPage.clickAPITesting();
  await apiPage.clickAPI_1(); // Expand the API details section
  
  const apiInfo = await apiPage.captureAPIInfo(0);
  console.log("Extracted API Info:", apiInfo);

  
  let response = await request.get(apiInfo.url);
  // Validate Response
  expect(response.status()).toBe(apiInfo.expectedStatus);

  const responseBody = await response.json();

  // Check if response has expected structure
  expect(responseBody).toHaveProperty('responseCode');
  expect(responseBody).toHaveProperty('products');
  // Validate 'products' is an array and contains expected fields
  expect(Array.isArray(responseBody.products)).toBe(true);
  expect(responseBody.products.length).toBeGreaterThan(0);

  for (const product of responseBody.products) {
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('brand');
    expect(product).toHaveProperty('category');

    // Validate category structure
    expect(product.category).toHaveProperty('usertype');
    expect(product.category).toHaveProperty('category');
    expect(product.category.usertype).toHaveProperty('usertype');
  }

  console.log("API response validated successfully!");
});

test('API 7: POST To Verify Login with valid details', async ({ page, request }) => {
  const apiPage = new APIPage(page);
  
  await page.goto("https://automationexercise.com/");
  await apiPage.clickAPITesting();
  await apiPage.clickAPI_7(); // Expand the API details section

  const apiInfo = await apiPage.captureAPIInfo(6);
  console.log("Extracted API Info:", apiInfo);
  
  const requestPayload = {
    email: "testuserprabha32@gmail.com",
    password: "Test@100"
  };
  
  const response = await request.post(apiInfo.url, {
    form: requestPayload
  });

  // Validate the HTTP status
  expect(response.status()).toBe(apiInfo.expectedStatus);
  
  const responseBody = await response.json();
  console.log("API Response:", JSON.stringify(responseBody, null, 2));

   // Validate Response Structure
  expect(responseBody).toHaveProperty('responseCode', apiInfo.expectedStatus);
  expect(responseBody).toHaveProperty('message', apiInfo.expectedMessage);

  console.log("API response validated successfully!");
});

test('API 8: POST To Verify Login without email parameter', async ({ page, request }) => {
  const apiPage = new APIPage(page);
  
  await page.goto("https://automationexercise.com/");
  await apiPage.clickAPITesting();
  await apiPage.clickAPI_8(); // Expand the API details section

  const apiInfo = await apiPage.captureAPIInfo(7);
  console.log("Extracted API Info:", apiInfo);

  const requestPayload = {
    email: "",
    password: "Test@101"
  };
  
  const response = await request.post(apiInfo.url, {
    form: requestPayload
  });

  // Validate the HTTP status
  expect(response.status()).toBe(200);
  
  const responseBody = await response.json();
  console.log("API Response:", JSON.stringify(responseBody, null, 2));
  
  // Validate Response Structure
  expect(responseBody).toHaveProperty('responseCode', apiInfo.expectedStatus);
  expect(responseBody).toHaveProperty('message', apiInfo.expectedMessage);
});