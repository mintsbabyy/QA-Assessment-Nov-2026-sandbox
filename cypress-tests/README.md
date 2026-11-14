# Cypress UI automation (Task C)

Automates the Routag sandbox dashboard:
1. A business successfully creates a delivery.
2. Validation errors appear when required fields are missing.

## Run

```
# 1. start the sandbox (separate terminal)
cd sandbox && npm install && npm start

# 2. run the tests
cd cypress-tests
npm install
cp .env.example .env        # then fill in BUSINESS_PASSWORD (see root README)
```

Cypress reads configuration from environment variables (`BASE_URL`, `BUSINESS_EMAIL`, `BUSINESS_PASSWORD`).

PowerShell:
```
$env:BUSINESS_EMAIL="business1@sandbox.test"; $env:BUSINESS_PASSWORD="<password from root README>"; npx cypress run
```
bash:
```
export $(grep -v '^#' .env | xargs) && npx cypress run
```

## Layout
- `cypress.config.js` – baseUrl and env wiring
- `cypress/support/e2e.js` – `cy.login()` command
- `cypress/e2e/delivery.cy.js` – the two scenarios
- `.env.example` – required variables (no secrets committed)

Tests reset sandbox data (`POST /api/v1/reset`) before each test and use no fixed sleeps.
