class APIPage {
  constructor(page) {
    this.page = page;
    this.apiTesting = page.locator(`//a[normalize-space(text())='API Testing']`);
    this.api1 = page.locator(`//u[normalize-space(text())='API 1: Get All Products List']`);
    this.api7 = page.locator(`//u[normalize-space(text())='API 7: POST To Verify Login with valid details']`);
    this.api8 = page.locator(`//u[normalize-space(text())='API 8: POST To Verify Login without email parameter']`);
  }

  async clickAPITesting() {
    await this.apiTesting.click();
  }

  async clickAPI_1() {
    await this.api1.click();
  }

  async clickAPI_7() {
    await this.api7.click();
  }

  async clickAPI_8() {
    await this.api8.click();
  }

  async captureAPIInfo(listNum) {
    const apiDetails = await this.page.locator('ul.list-group').nth(listNum);
    const apiInfo = {};

    const listItems = await apiDetails.locator('li').all();
    for (const li of listItems) {
        const text = await li.innerText();

        if (text.includes("API URL:")) {
            apiInfo.url = await li.locator('a').getAttribute('href');
        } else if (text.includes("Request Method:")) {
            apiInfo.method = text.split("Request Method:")[1].trim();
        } else if (text.includes("Request Parameters:")) {
            apiInfo.requestParams = text.split("Request Parameters:")[1].trim().split(',').map(param => param.trim());
        } else if (text.includes("Response Code:")) {
            apiInfo.expectedStatus = parseInt(text.split("Response Code:")[1].trim(), 10);
        } else if (text.includes("Response Message:")) {
            apiInfo.expectedMessage = text.split("Response Message:")[1].trim();
        } else if (text.includes("Response JSON:")) {
            apiInfo.validateResponse = text.split("Response JSON:")[1].trim();
        }
    }

    return apiInfo;
}
}

export default APIPage;
