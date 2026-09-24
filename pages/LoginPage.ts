import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly loginHeading: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.loginHeading = page.getByRole('heading', { name: 'Login to your account' });
    this.emailInput = page.locator('input[data-qa="login-email"]');
    this.passwordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.errorMessage = page.getByText('Your email or password is incorrect!');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.loginHeading).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** Successful login: header shows "Logged in as <name>" and a Logout link, and the user leaves /login. */
  async expectLoggedInAs(name: string): Promise<void> {
    await expect(this.loggedInAs).toBeVisible();
    await expect(this.loggedInAs).toContainText(`Logged in as ${name}`);
    await expect(this.logoutLink).toBeVisible();
    await expect(this.signupLoginLink).toHaveCount(0);
    await expect(this.page).not.toHaveURL(/\/login$/);
  }
}
