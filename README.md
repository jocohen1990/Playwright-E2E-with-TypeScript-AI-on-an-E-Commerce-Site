# Valentino's Magic Beans: QA Automation Suite

[![CI](https://github.com/jocohen1990/valentino-magic-beans/actions/workflows/cicd.yml/badge.svg)](https://github.com/jocohen1990/valentino-magic-beans/actions/workflows/cicd.yml)

UI, API and end-to-end test automation for [Valentino's Magic Beans](https://valentinos-magic-beans.click), a demo coffee e-commerce store, built with **Playwright** and **TypeScript**.

The application under test was created by Valentin Despa and Alex Dan for their Udemy course *Playwright E2E Testing with AI for Beginners - Zero to Hero*. All test code, structure and CI in this repository are my own.

## What's covered

| Suite | Folder | What it checks |
| --- | --- | --- |
| **E2E** | `tests/e2e` | A guest buys a product, gets an order ID, and tracks the order. Prices, totals and customer details are checked at every step. |
| **UI** | `tests/ui` | Cart (add, change quantity, remove, totals), order tracking form, footer disclaimer, logged-in session, and email-verified sign-up. |
| **API** | `tests/api` | `GET /products`, `GET /products/:id` (including 404), and `POST /orders` (happy path plus 400 validation). |
| **Network** | `tests/network` | Mocked API responses, API failure handling, and blocked images. |

## Design

- **Page Object Model.** Each page is a class in `tests/pages` with its locators defined once in the constructor. Shared header and footer live in `tests/pages/components`.
- **Fixtures.** `tests/fixtures.ts` extends Playwright's `test` so specs receive page objects directly (`async ({ cartPage }) => ...`) with no setup code.
- **Locator strategy.** The suite uses `getByTestId` (configured for the app's `data-test-id` attribute) first, then role and text locators. It never uses CSS styling classes.
- **Assertions live in specs.** Page objects expose locators and actions, and specs decide what to assert, which keeps failures readable.
- **Test data** is in `tests/data`, and typed API contracts are in `tests/api/types.ts`.
- **Authentication** runs once in `tests/setup/auth.setup.ts`, which saves the session. Specs named `*.auth.spec.ts` reuse that session.
- **Readable reports.** Long flows use `test.step` so the HTML report shows exactly which step failed.

## Project structure

```
├── tests/
│   ├── api/            # REST API tests + response types
│   ├── data/           # Test data (products, customers, cards)
│   ├── e2e/            # Full user journeys
│   ├── network/        # Request mocking and blocking
│   ├── pages/          # Page objects (+ components/)
│   ├── setup/          # Login session setup
│   ├── ui/             # Feature-level UI tests
│   └── fixtures.ts     # Page-object fixtures
├── utils/              # Env helpers, price parsing, MailSlurp wrapper
├── playwright.config.ts
├── Dockerfile
└── .github/workflows/cicd.yml
```

## Getting started

Requires Node.js 20 or later.

```bash
git clone https://github.com/jocohen1990/valentino-magic-beans.git
cd valentino-magic-beans
npm ci
npx playwright install --with-deps chromium
cp .env.example .env   # then fill in LOGIN_EMAIL / LOGIN_PASS
```

## Running tests

| Command | Runs |
| --- | --- |
| `npm test` | Everything |
| `npm run test:api` | API tests |
| `npm run test:ui` | UI and network tests (including the logged-in session) |
| `npm run test:e2e` | End-to-end journeys |
| `npm run typecheck` | TypeScript type check |
| `npm run report` | Open the last HTML report |

The sign-up test creates a real MailSlurp inbox, so it is skipped unless `SIGN_UP_FLOW=true` and `MAIL_SLURP_API_KEY` are set.

### Docker

```bash
docker build -t valentino-tests .
docker run --rm --env-file .env valentino-tests
```

## CI

GitHub Actions runs on every push and pull request to `main`. A type-check job runs first, then the API, UI and E2E suites run in parallel inside the official Playwright container. Each suite uploads its own HTML report as a build artifact. `LOGIN_EMAIL` and `LOGIN_PASS` are stored as repository secrets.

## AI-assisted test generation

Some tests were first drafted with GitHub Copilot and the Playwright MCP server, using the prompts in `.github/prompts`. Each draft was then reviewed and refactored by hand to follow the conventions above.
