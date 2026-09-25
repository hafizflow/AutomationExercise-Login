const { test } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { LoginPage } = require('../pages/LoginPage');

test('registered user can log in successfully', async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);

  await home.open();
  await home.goToLogin();
  await login.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
  await login.expectLoginSuccessful();
});
