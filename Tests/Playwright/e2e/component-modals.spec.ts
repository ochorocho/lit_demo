import { test, expect } from '../fixtures/backend';

test.describe('lit_demo_component — modals group', () => {
  test.beforeEach(async ({ backend }) => {
    await backend.gotoLitDemoComponent('modals');
  });

  test('default modal trigger opens typo3-backend-modal with title "Demo modal"', async ({ page, backend }) => {
    const content = backend.contentFrame.locator('.lit-demo-content');
    const trigger = content.locator('[data-lit-demo-modal-trigger="default"]');
    await expect(trigger).toBeVisible();

    await trigger.click();

    // Modal portals to the top-level document; it uses <dialog> inside typo3-backend-modal
    const modal = page.locator('typo3-backend-modal dialog');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Demo modal');

    // Close via the modal close button
    const closeBtn = modal.locator('button.t3js-modal-close').or(modal.locator('button[aria-label="Close"]'));
    await closeBtn.first().click();
    await expect(modal).not.toBeVisible();
  });

  test('confirm modal has Cancel and Confirm buttons; Cancel hides the modal', async ({ page, backend }) => {
    const content = backend.contentFrame.locator('.lit-demo-content');
    const trigger = content.locator('[data-lit-demo-modal-trigger="confirm"]');
    await expect(trigger).toBeVisible();

    await trigger.click();

    const modal = page.locator('typo3-backend-modal dialog');
    await expect(modal).toBeVisible();

    const cancelBtn = modal.locator('button[name="cancel"]');
    const confirmBtn = modal.locator('button[name="ok"]');
    await expect(cancelBtn).toBeVisible();
    await expect(confirmBtn).toBeVisible();

    await cancelBtn.click();
    await expect(modal).not.toBeVisible();
  });

  test('typo3-backend-dispatch-modal-button is rendered', async ({ backend }) => {
    const content = backend.contentFrame.locator('.lit-demo-content');
    const dispatchBtn = content.locator('typo3-backend-dispatch-modal-button');
    await expect(dispatchBtn).toBeVisible();
  });
});
