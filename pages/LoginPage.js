const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('input[data-qa="login-email"]');
    this.passwordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.loggedInAs = page.locator('a', { hasText: 'Logged in as' });
    this.logoutLink = page.locator('a[href="/logout"]');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginSuccessful() {
    await expect(this.loggedInAs).toBeVisible();
    await expect(this.logoutLink).toBeVisible();
  }
}

module.exports = { LoginPage };
