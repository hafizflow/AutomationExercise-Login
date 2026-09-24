import { Page, Locator } from '@playwright/test';

/** Common header elements and helpers shared by every page of the site. */
export class BasePage {
  readonly page: Page;
  readonly signupLoginLink: Locator;
  readonly logoutLink: Locator;
  readonly loggedInAs: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupLoginLink = page.locator('a[href="/login"]', { hasText: 'Signup / Login' });
    this.logoutLink = page.locator('a[href="/logout"]');
    this.loggedInAs = page.locator('a', { hasText: 'Logged in as' });
  }

  /**
   * The site shows a Google "consent" dialog in some regions and heavy third-party ads.
   * Ad requests are blocked so they can't cover elements or slow the page down,
   * and the consent dialog is accepted if it appears.
   */
  async prepare(): Promise<void> {
    await this.page.route(/(googlesyndication|doubleclick|googleadservices|adservice\.google|fundingchoicesmessages)/, (route) =>
      route.abort(),
    );
  }

  async dismissConsentIfShown(): Promise<void> {
    const consent = this.page.locator('button.fc-cta-consent, button:has-text("Consent")').first();
    if (await consent.isVisible({ timeout: 2_000 }).catch(() => false)) {
      await consent.click();
    }
  }
}
