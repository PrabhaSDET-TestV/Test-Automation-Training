class HomePage {
  constructor(page) {
    this.page = page;
    this.menuOptions = page.locator('.nav.navbar-nav li a');
    this.carouselSlides = page.locator('.carousel-inner .item');
    this.categorySection = page.locator('.category-products');
    this.brandLogos = page.locator('.brands-name ul li');
    this.featuredItems = page.locator('.features_items');
    this.footerSubscription = page.locator('#susbscribe_email');
    this.subscribeButton = page.locator('#subscribe');
  }

  async navigate() {
    await this.page.goto('https://automationexercise.com/');
  }

  async getMenuOptions() {
    return await this.menuOptions.allTextContents();
  }

  async getCarouselSlideCount() {
    return await this.carouselSlides.count();
  }

  async getCategoryCount() {
    return await this.categorySection.locator('h2').count();
  }

  async getBrandCount() {
    return await this.brandLogos.count();
  }

  async isFeaturedItemsVisible() {
    return await this.featuredItems.isVisible();
  }

  async isFooterSubscriptionVisible() {
    return await this.footerSubscription.isVisible();
  }

  async subscribe(email) {
    await this.footerSubscription.fill(email);
    await this.subscribeButton.click();
  }
}

export default HomePage;
