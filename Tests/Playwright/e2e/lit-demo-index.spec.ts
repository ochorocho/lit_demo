import { test, expect } from '../fixtures/backend';

test.describe('lit_demo index module', () => {
  test.beforeEach(async ({ backend }) => {
    await backend.gotoLitDemo();
  });

  test.describe('ld-counter', () => {
    test('renders with start value 0', async ({ backend }) => {
      const counter = backend.contentFrame.locator('ld-counter');
      await expect(counter).toBeVisible();
      await expect(counter).toHaveAttribute('start', '0');
    });

    test('clicking up increments the displayed count to 1', async ({ backend }) => {
      const counter = backend.contentFrame.locator('ld-counter');
      // The up button contains an icon with identifier actions-arrow-up-alt
      await counter.locator('button.btn-primary').first().click();
      await expect(counter.locator('.card-text')).toContainText('1');
    });

    test('clicking down decrements the displayed count', async ({ backend }) => {
      const counter = backend.contentFrame.locator('ld-counter');
      // Start at 0, click down -> -1
      await counter.locator('button.btn-secondary').click();
      await expect(counter.locator('.card-text')).toContainText('-1');
    });

    test('clicking reset returns the count to the start value', async ({ backend }) => {
      const counter = backend.contentFrame.locator('ld-counter');
      const upBtn = counter.locator('button.btn-primary').first();
      const resetBtn = counter.locator('button', { hasText: 'reset' });

      await upBtn.click();
      await upBtn.click();
      await expect(counter.locator('.card-text')).toContainText('2');

      await resetBtn.click();
      await expect(counter.locator('.card-text')).toContainText('0');
    });

    test('VengaBus easter-egg: up/down/up/down/up/down/up/down shows .marquee content', async ({ backend }) => {
      const counter = backend.contentFrame.locator('ld-counter');
      const upBtn = counter.locator('button.btn-primary').first();
      const downBtn = counter.locator('button.btn-secondary');

      // Sequence: 1,0,1,0,1,0,1,0 (up then down, alternating four times)
      for (let i = 0; i < 4; i++) {
        await upBtn.click();
        await downBtn.click();
      }

      await expect(counter.locator('.marquee')).toContainText('VengaBus');
    });
  });

  test.describe('typo3-surfcamp', () => {
    test('renders "TYPO3 SurfCamp 2026"', async ({ backend }) => {
      const surfcamp = backend.contentFrame.locator('typo3-surfcamp');
      await expect(surfcamp).toBeVisible();
      // The component renders into shadow DOM; access text via the host text content
      await expect(surfcamp).toContainText('TYPO3 SurfCamp 2026');
    });
  });
});