# Automation Exercise – Login Automation (Playwright + TypeScript)

Automated test for the login flow on <https://www.automationexercise.com/>, built with
[Playwright Test](https://playwright.dev) and TypeScript using the Page Object Model.

## Scenario covered

| # | Step | How it is verified |
|---|------|--------------------|
| 1 | Launch the website | Page title contains "Automation Exercise", logo and "Signup / Login" link are visible |
| 2 | Navigate to the Login page | URL is `/login`, heading "Login to your account" and both inputs are visible |
| 3 | Enter registered email and password | Filled via `data-qa="login-email"` / `data-qa="login-password"` |
| 4 | Submit the login form | Click `data-qa="login-button"` |
| 5 | Verify login succeeded | Header shows **"Logged in as &lt;your name&gt;"**, a **Logout** link appears, "Signup / Login" is gone, no error message |

A second (negative) test checks that a wrong password shows
"Your email or password is incorrect!" and the user stays logged out.

## Project structure

```
automationexercise-login/
├── pages/
│   ├── BasePage.ts        # shared header locators, ad blocking, consent-dialog handling
│   ├── HomePage.ts        # open site, go to login
│   └── LoginPage.ts       # login form actions + success/failure assertions
├── tests/
│   └── login.spec.ts      # the test scenarios
├── utils/
│   └── env.ts             # reads credentials from .env
├── playwright.config.ts   # browsers, timeouts, reports, screenshots/video/trace on failure
├── .env.example           # template for your credentials
├── .github/workflows/playwright.yml  # optional CI (uses repository secrets)
├── package.json
└── tsconfig.json
```

## Prerequisites

- Node.js 18 or newer
- An account created manually at <https://www.automationexercise.com/signup>

## Setup

```bash
npm install
npx playwright install          # downloads Chromium and Firefox
cp .env.example .env            # Windows: copy .env.example .env
```

Edit `.env` with the account you registered:

```
USER_EMAIL=the.email@you.registered
USER_PASSWORD=the-password-you-chose
USER_NAME=The Name You Entered At Signup
```

`USER_NAME` must match the name typed on the signup form, because the test checks the
"Logged in as &lt;name&gt;" text. `.env` is git-ignored so your credentials are never committed.

## Running the tests

```bash
npm test                 # all tests, Chromium + Firefox, headless
npm run test:chrome      # Chromium only
npm run test:headed      # watch the browser
npm run report           # open the HTML report
```

Expected output:

```
✓ [chromium] › login.spec.ts › Login – automationexercise.com › registered user can log in successfully
✓ [chromium] › login.spec.ts › Login – automationexercise.com › wrong password shows an error and keeps the user logged out
```

On failure, a screenshot, video and trace are saved in `test-results/`
(open a trace with `npx playwright show-trace <path>/trace.zip`).

## Notes on stability

- The site loads a lot of third-party ads. Ad domains are blocked in `BasePage.prepare()`
  so ads can't cover elements or slow the page down.
- In some regions a Google consent dialog appears; it is accepted automatically if shown.
- Locators use the site's `data-qa` attributes and accessible roles rather than brittle CSS paths.

## CI (optional)

Add `USER_EMAIL`, `USER_PASSWORD` and `USER_NAME` as repository secrets on GitHub; the
workflow in `.github/workflows/playwright.yml` runs the tests on every push and uploads the HTML report.
