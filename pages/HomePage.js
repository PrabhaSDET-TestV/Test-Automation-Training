class HomePage {
  constructor(page) {
    this.page = page;
    this.menuOptions = page.locator('.nav.navbar-nav li a');
    this.carouselSlides = page.locator('#slider-carousel .carousel-inner .item');
    this.categorySection = page.locator('.category-products .panel-title a');
    this.brandLogos = page.locator('.brands-name ul li a');
    this.featuredItems = page.locator('.features_items');
    this.footerSubscription = page.locator('#susbscribe_email');
    this.subscribeButton = page.locator('#subscribe');
  }

  async navigate() {
    await this.page.goto('https://automationexercise.com/');
  }

  async getMenuOptions() {
    const menuItems = await this.menuOptions.allTextContents();
    return menuItems.map(item => 
      item.replace(/[^\w\s/-]/g, '').trim().replace(/\s+/g, ' ') // Remove icons, trim spaces
    );
  }
  
  async getCarouselDetails() {
    const slideCount = await this.carouselSlides.count();
    return { slideCount };
  }

  async getCategories() {
    const categories = await this.categorySection.allTextContents();
    return {
      count: categories.length,
      names: categories.map(name => name.trim()) // Trim extra spaces
    };
  }
  
  async getBrandDetails() {
    const count = await this.brandLogos.count();
    const names = await this.brandLogos.allInnerTexts();
    return { count, names: names.map(name => name.replace(/\(\d+\)/, '').trim()) }; // Remove product count from names
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
