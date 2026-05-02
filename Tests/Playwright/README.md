# lit_demo Playwright Tests

End-to-end tests for the `lit_demo` TYPO3 extension backend modules.

## Prerequisites

- DDEV environment running (`ddev start`)
- Node 22 available inside the DDEV web container

## Installation

Install dependencies (including Playwright browser binaries) inside the DDEV web container:

```bash
ddev exec --dir /var/www/html/packages/lit_demo/Tests/Playwright npm install --no-audit --no-fund
ddev exec --dir /var/www/html/packages/lit_demo/Tests/Playwright npx playwright install chromium
```

## Running tests

The default base URL is `https://tryout.ddev.site/typo3/`. Override it via the
`PLAYWRIGHT_BASE_URL` environment variable (trailing slash required).

### All tests (headless, using the DDEV public URL from the host)

```bash
cd packages/lit_demo/Tests/Playwright
npx playwright test
```

### All tests inside the DDEV web container (uses internal URL)

```bash
ddev exec --dir /var/www/html/packages/lit_demo/Tests/Playwright \
  bash -c 'PLAYWRIGHT_BASE_URL=http://web/typo3/ npx playwright test'
```

### Login setup only

```bash
ddev exec --dir /var/www/html/packages/lit_demo/Tests/Playwright \
  bash -c 'PLAYWRIGHT_BASE_URL=http://web/typo3/ npx playwright test --project=login'
```

### Single spec

```bash
ddev exec --dir /var/www/html/packages/lit_demo/Tests/Playwright \
  bash -c 'PLAYWRIGHT_BASE_URL=http://web/typo3/ npx playwright test e2e/component-icons-media.spec.ts'
```

### Headed (from host, default DDEV URL)

```bash
cd packages/lit_demo/Tests/Playwright
npm run test:headed
```

### HTML report

```bash
cd packages/lit_demo/Tests/Playwright
npm run report
```

## Credentials

Default credentials: `admin` / `Password.1`

Override via environment variables:

```bash
TYPO3_ADMIN_USERNAME=admin TYPO3_ADMIN_PASSWORD=Password.1
```

## File layout

```
Tests/Playwright/
├── playwright.config.ts       # Playwright configuration
├── config.ts                  # baseUrl + credentials
├── tsconfig.json
├── package.json
├── .gitignore
├── README.md
├── helper/
│   └── login.setup.ts         # Authentication setup (runs once, saves .auth/login.json)
├── fixtures/
│   └── backend.ts             # LitDemoBackend fixture + test export
└── e2e/
    ├── lit-demo-index.spec.ts         # ld-counter + typo3-surfcamp
    ├── component-overview.spec.ts     # Overview group (8 cards)
    ├── component-icons-media.spec.ts  # IconsMedia group
    ├── component-feedback.spec.ts     # Feedback group
    ├── component-forms.spec.ts        # Forms group
    ├── component-modals.spec.ts       # Modals group
    ├── component-editor.spec.ts       # Editor group
    ├── component-navigation.spec.ts   # Navigation group
    ├── component-editing.spec.ts      # Editing group
    └── component-theme.spec.ts        # Theme group
```

## Notes

- All component DOM lives inside `#typo3-contentIframe`. Assertions use `backend.contentFrame.locator(...)`.
- Notifications and modals are portalled to the top-level page — assert those via `page.locator(...)`.
- `ignoreHTTPSErrors: true` is set in `playwright.config.ts` to accommodate DDEV's self-signed certificate.
