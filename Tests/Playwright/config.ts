export default {
  // Trailing slash is required for relative page.goto() calls like 'module/web/lit-demo'
  baseUrl: process.env.PLAYWRIGHT_BASE_URL || 'https://tryout.ddev.site/typo3/',
  login: {
    admin: {
      username: process.env.TYPO3_ADMIN_USERNAME || 'admin',
      password: process.env.TYPO3_ADMIN_PASSWORD || 'Password.1',
    },
  },
};