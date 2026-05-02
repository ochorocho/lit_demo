import { test, expect } from '../fixtures/backend';

test.describe('lit_demo_component — editing group', () => {
  test.beforeEach(async ({ backend }) => {
    await backend.gotoLitDemoComponent('editing');
  });

  test.describe('typo3-backend-editable-page-title', () => {
    test('renders in read-only mode (pageid=0, editable attribute absent)', async ({ backend }) => {
      const content = backend.contentFrame.locator('.lit-demo-content');
      const editableTitle = content.locator('typo3-backend-editable-page-title');
      await expect(editableTitle).toBeVisible();
      // pageid="0" means not editable — no edit button should appear
      await expect(editableTitle).toHaveAttribute('pageid', '0');
      // In read-only mode the component renders an <h1> inside shadow DOM
      // We verify the pagetitle attribute is set
      await expect(editableTitle).toHaveAttribute('pagetitle', 'Click me to start editing');
    });
  });

  test.describe('typo3-backend-draggable-resizable', () => {
    test('renders with resize handles in light DOM', async ({ backend }) => {
      const content = backend.contentFrame.locator('.lit-demo-content');
      const draggable = content.locator('typo3-backend-draggable-resizable');
      await expect(draggable).toBeVisible();
      // createRenderRoot returns this (light DOM), so resize handles are queryable
      const seHandle = draggable.locator('[data-resize="se"]');
      await expect(seHandle).toBeVisible();
    });
  });

  test.describe('typo3-copy-to-clipboard', () => {
    test('clicking the button dispatches a success notification', async ({ page, backend }) => {
      // Grant clipboard permissions so the browser API call succeeds in headless Chromium
      await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);

      const content = backend.contentFrame.locator('.lit-demo-content');
      const copyBtn = content.locator('typo3-copy-to-clipboard');
      await expect(copyBtn).toBeVisible();

      await copyBtn.click();

      // Notification portals to the top-level document
      const notification = page.locator('typo3-notification-message');
      await expect(notification).toBeVisible();
    });
  });
});
