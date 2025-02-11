class APIPage {
    constructor(page) {
      this.page = page;
      this.apiListButton = page.locator('a[href="/api_list"]');
      this.apiTabs = page.locator('.panel-heading a');
      this.apiDetails = page.locator('.panel-collapse.in');
    }
  
    async navigate() {
      await this.page.goto('https://automationexercise.com/');
    }
  
    async openAPIList() {
      await this.apiListButton.click();
    }
  
    async expandAPITabs(count = 5) {
      const tabs = await this.apiTabs.all();
      for (let i = 0; i < Math.min(count, tabs.length); i++) {
        await tabs[i].click();
        await this.page.waitForTimeout(500);
      }
    }
  
    async getAPIInfo() {
      return await this.apiDetails.allTextContents();
    }
  }
  
  export default APIPage;
  