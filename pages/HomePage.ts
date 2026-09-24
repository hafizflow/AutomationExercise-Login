import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly logo: Locator;

  constructor(page: Page) {
    super(page);
    this.logo = page.locator('img[alt="Website for automation practice"]');
  }

  async open(): Promise<void> {
    await this.prepare();
    await this.page.goto('/');
    await this.dismissConsentIfShown();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(/Automation Exercise/i);
    await expect(this.logo).toBeVisible();
    await expect(this.signupLoginLink).toBeVisible();
  }

  async goToLogin(): Promise<void> {
    await this.signupLoginLink.click();
    await expect(this.page).toHaveURL(/\/login/);
  }
}
