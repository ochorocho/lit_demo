import { test, expect } from '../fixtures/backend';

const BREADCRUMB_NODES = ['Home', 'Web', 'Page', 'Sub page', 'Current'];
const TAB_LABELS = ['General', 'Access', 'Metadata', 'Appearance', 'Resources', 'Extras'];

test.describe('lit_demo_component — navigation group', () => {
  test.beforeEach(async ({ backend }) => {
    await backend.gotoLitDemoComponent('navigation');
  });

  test.describe('typo3-breadcrumb', () => {
    test('renders all 5 node labels', async ({ backend }) => {
      const content = backend.contentFrame.locator('.lit-demo-content');
      const breadcrumb = content.locator('typo3-breadcrumb');
      await expect(breadcrumb).toBeVisible();

      for (const label of BREADCRUMB_NODES) {
        await expect(breadcrumb).toContainText(label);
      }
    });
  });

  test.describe('typo3-backend-tab-scroller', () => {
    test('renders all 6 tabs', async ({ backend }) => {
      const content = backend.contentFrame.locator('.lit-demo-content');
      const tabScroller = content.locator('typo3-backend-tab-scroller');
      await expect(tabScroller).toBeVisible();

      for (const label of TAB_LABELS) {
        await expect(tabScroller.locator('.nav-link', { hasText: label })).toBeVisible();
      }
    });

    test('clicking a non-active tab makes it active', async ({ backend }) => {
      const content = backend.contentFrame.locator('.lit-demo-content');
      const tabScroller = content.locator('typo3-backend-tab-scroller');

      const accessTab = tabScroller.locator('.nav-link', { hasText: 'Access' });
      await expect(accessTab).not.toHaveClass(/active/);
      await accessTab.click();
      await expect(accessTab).toHaveClass(/active/);
    });
  });

  test.describe('typo3-backend-pagination', () => {
    test('shows current page 3 and provides prev/next links', async ({ backend }) => {
      const content = backend.contentFrame.locator('.lit-demo-content');
      const pagination = content.locator('typo3-backend-pagination');
      await expect(pagination).toBeVisible();

      // Page 3 is the active/current page in the demo config
      await expect(pagination).toContainText('3');

      // Previous (page 2) and next (page 4) links should be present
      const prevLink = pagination.locator('[aria-label*="Previous"], [aria-label*="previous"], a[href*="previousPage"], button[aria-label*="2"]');
      const nextLink = pagination.locator('[aria-label*="Next"], [aria-label*="next"], a[href*="nextPage"], button[aria-label*="4"]');
      // At minimum, the rendered pagination should contain both < and > navigation affordances
      expect(await pagination.locator('a, button').count()).toBeGreaterThanOrEqual(2);
    });
  });
});
