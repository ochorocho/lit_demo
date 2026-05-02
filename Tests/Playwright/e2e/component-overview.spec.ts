import { test, expect } from '../fixtures/backend';

const EXPECTED_GROUPS = [
  'iconsMedia',
  'feedback',
  'forms',
  'modals',
  'editor',
  'navigation',
  'editing',
  'theme',
];

test.describe('lit_demo_component — overview group', () => {
  test.beforeEach(async ({ backend }) => {
    await backend.gotoLitDemoComponent('overview');
  });

  test('renders exactly 8 group cards', async ({ backend }) => {
    const cards = backend.contentFrame.locator('.card-container .card');
    await expect(cards).toHaveCount(8);
  });

  for (const group of EXPECTED_GROUPS) {
    test(`card for "${group}" links to ?group=${group}`, async ({ backend }) => {
      const card = backend.contentFrame.locator('.card-container .card', {
        has: backend.contentFrame.locator(`a[href*="group=${group}"]`),
      });
      await expect(card).toBeVisible();
      // The card link's href contains the group key as a query parameter
      const link = card.locator(`a[href*="group=${group}"]`);
      await expect(link).toBeVisible();
    });
  }
});
