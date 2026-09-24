import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { credentials } from '../utils/env';

test.describe('Login – automationexercise.com', () => {
  test('registered user can log in successfully', async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);

    await test.step('Launch the website', async () => {
      await home.open();
      await home.expectLoaded();
    });

    await test.step('Navigate to the Login page', async () => {
      await home.goToLogin();
      await login.expectLoaded();
    });

    await test.step('Enter registered email and password and submit', async () => {
      await login.login(credentials.email, credentials.password);
    });

    await test.step('Verify login was successful', async () => {
      await login.expectLoggedInAs(credentials.name);
      await expect(login.errorMessage).toHaveCount(0);
    });
  });

  test('wrong password shows an error and keeps the user logged out', async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);

    await home.open();
    await home.goToLogin();
    await login.login(credentials.email, 'definitely-the-wrong-password');

    await expect(login.errorMessage).toBeVisible();
    await expect(login.loggedInAs).toHaveCount(0);
    await expect(page).toHaveURL(/\/login/);
  });
});
