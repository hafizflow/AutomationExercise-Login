# Automation Exercise – Login Automation (Playwright + JavaScript)

Automates the login flow on <https://www.automationexercise.com/>:
launch the site, go to the Login page, enter the registered email and password,
submit, and verify the login succeeded ("Logged in as ..." and the Logout link are visible).

## Setup

Requires Node.js 18+.

```bash
npm install
npx playwright install chromium
cp .env.example .env    # then fill in the email and password of the account you registered
```

## Run

```bash
npm test               # headless
npm run test:headed    # watch the browser
npm run report         # open the HTML report
```

## Structure

- `pages/HomePage.js`, `pages/LoginPage.js` – page objects
- `tests/login.spec.js` – the login test
- `playwright.config.js` – Playwright config
