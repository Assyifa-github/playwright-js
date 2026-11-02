# Playwright UI Test Template

A reusable Playwright setup for web UI tests. Tests use the Page Object Model, read environment data from YAML, and can be filtered by tag.

## Prerequisites

* Node.js 18+
* npm

## Setup

```bash
npm install
npx playwright install
```

## Configuration

`TARGET` chooses which YAML file is loaded: `data-test/config-<TARGET>.yaml`.

If `TARGET` is not set, the default is `demo`.

Put the base URL, credentials, and other environment data in that file. Sample files are included for `demo`, `staging`, and `test`. Replace the values before running against a real environment.

## Run tests

```bash
npm test
```

```bash
TARGET=demo npx playwright test --project=chromium
TARGET=demo npx playwright test --project=chromium --headed
TARGET=demo npx playwright test -g "@smoke" --project=chromium
```

Tags live in the test or `describe` title, for example `@smoke` or `@regression`.

```bash
npx playwright test -g "@smoke|@regression"
npx playwright test -g "@smoke" --grep-invert "@wip"
```

Open the HTML report:

```bash
npm run report
```

Other useful flags: `--project=firefox`, `--project=webkit`, `--workers=1`, `--retries=2`, `--debug`.

## Slack reporting

Slack is off unless `SLACK` is set. Put the webhook in `playwright.config.js`. The message layout is in `custom-layout-report.js`.

```bash
SLACK=off TARGET=demo npx playwright test
SLACK=on-failure TARGET=demo npx playwright test
SLACK=always TARGET=demo npx playwright test
```

## Project structure

| Path | Purpose |
| --- | --- |
| `tests/` | Specs |
| `pages/` | Page objects. `BasePage` exposes them to the specs |
| `data-test/` | Per-environment YAML |
| `configReader.js` | Loads `data-test/config-${TARGET}.yaml` |
| `global-setup.js` | Runs once before the suite |
| `playwright.config.js` | Browsers, timeouts, and reporters |
| `custom-layout-report.js` | Slack report layout |

## Add a new flow

1. Create a page object in `pages/`.
2. Register it in `pages/_basePage.js`.
3. Add a spec under `tests/`.
4. Put environment-specific values in the YAML file for that `TARGET`.
