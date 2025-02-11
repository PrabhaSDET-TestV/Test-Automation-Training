import { test, expect } from '@playwright/test';
import APIPage from '../pages/APIPage';
import apiTestData from '../data/apiTestData.json';

test('Verify API Documentation', async ({ page, request }) => {
  const apiPage = new APIPage(page);
  await apiPage.navigate();
  await apiPage.openAPIList();
  await apiPage.expandAPITabs(5);

  for (const api of apiTestData) {
    console.log(`Testing API: ${api.apiName}`);
    
    let response;
    if (api.method === 'GET') {
      response = await request.get(api.url);
    } else if (api.method === 'POST') {
      response = await request.post(api.url, { data: api.requestBody });
    }

    expect(response.status()).toBe(api.expectedStatus);

    if (api.validateResponse) {
      const responseBody = await response.json();
      expect(responseBody).toHaveProperty(api.validateResponse);
    }
  }
});
