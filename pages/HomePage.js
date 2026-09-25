const { expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page;
    this.signupLoginLink = page.locator('a[href="/login"]', { hasText: 'Signup / Login' });
  }

  async open() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle(/Automation Exercise/i);
  }

  async goToLogin() {
    await this.signupLoginLink.click();
    await expect(this.page).toHaveURL(/\/login/);
  }
}

module.exports = { HomePage };
