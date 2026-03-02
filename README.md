# Valentino Magic Beans

This repository contains end-to-end and API tests for the Valentino Magic Beans web
application. The test suite is implemented using [Playwright](https://playwright.dev/)
with TypeScript and is designed to be run both locally and on GitHub Actions.

## Key Features

- Playwright tests organized into several suites: basic, API, setup, utils, and UI flows.
- Page object models located under `tests/pages` for reusability.
- Custom utilities such as `EmailUtils` to support common operations.
- Test setup files under `tests/setup` for authentication workflows.
- API tests under `tests/api` including e2e and service-specific specs.

## Playwright MCP & GitHub Copilot

A portion of the test code was generated using Playwright MCP and GitHub
CoPilot. Specifically, a GitHub CoPilot generated test file was used as a
starting point and refined to meet project needs.

## Docker & GitHub Actions

A Docker image has been added for use in GitHub Actions workflows. The
`cicd.yml` workflow builds the image and runs the tests inside a container,
enabling consistent results between local and CI environments.

## Node & TypeScript Versions

- Node.js: 22.11.0 (as specified in `package.json` engines field)
- TypeScript: 5.5.3 (as used in project dependencies)

> 💡 Ensure your local environment matches these versions to avoid
> compatibility issues.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/username/valentino-magic-beans.git
   cd valentino-magic-beans
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run tests locally:
   ```bash
   npx playwright test
   ```
4. To run inside Docker (mirrors GitHub Actions):
   ```bash
   docker build -t valentino-tests .
   docker run --rm valentino-tests
   ```

## Project Structure

```
├── tests/               # Playwright test specs and helpers
│   ├── api/
│   ├── basic/
│   ├── pages/
│   ├── setup/
│   └── utils/
├── package.json
├── playwright.config.ts
├── Dockerfile
└── .github/workflows    # CI/CD pipeline with Docker support
```
