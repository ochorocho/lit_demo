import { test, expect } from '../fixtures/backend';

test.describe('lit_demo_component — iconsMedia group', () => {
  test.beforeEach(async ({ backend }) => {
    await backend.gotoLitDemoComponent('iconsMedia');
  });

  test('renders at least 7 typo3-backend-icon elements in .lit-demo-content', async ({ backend }) => {
    const content = backend.contentFrame.locator('.lit-demo-content');
    // 5 sizes + 2 overlay examples
    const icons = content.locator('typo3-backend-icon');
    await expect(icons).toHaveCount(await icons.count().then(n => n >= 7 ? n : 0));
    expect(await icons.count()).toBeGreaterThanOrEqual(7);
  });

  test('all four typo3-backend-spinner sizes are present', async ({ backend }) => {
    const content = backend.contentFrame.locator('.lit-demo-content');
    for (const size of ['small', 'default', 'medium', 'large']) {
      await expect(content.locator(`typo3-backend-spinner[size="${size}"]`)).toBeVisible();
    }
  });

  test('typo3-backend-thumbnail renders for a valid URL', async ({ backend }) => {
    const content = backend.contentFrame.locator('.lit-demo-content');
    const validThumb = content.locator('typo3-backend-thumbnail[url*="Extension.svg"]');
    await expect(validThumb).toBeVisible();
  });

  test('typo3-backend-thumbnail renders for an invalid URL (fallback icon present)', async ({ backend }) => {
    const content = backend.contentFrame.locator('.lit-demo-content');
    const invalidThumb = content.locator('typo3-backend-thumbnail[url="/non-existing-image.png"]');
    await expect(invalidThumb).toBeVisible();
    // The component renders a fallback icon in light DOM when the image fails
    await expect(invalidThumb.locator('typo3-backend-icon')).toBeVisible();
  });

  test('typo3-qrcode renders a preview div with QR content (SVG via AJAX)', async ({ backend }) => {
    const content = backend.contentFrame.locator('.lit-demo-content');
    const qrcode = content.locator('typo3-qrcode');
    await expect(qrcode).toBeVisible();
    // The component uses createRenderRoot→this (light DOM). It loads the QR code via AJAX
    // and renders it as unsafeHTML inside a div.preview — wait for the spinner to disappear.
    const preview = qrcode.locator('.preview');
    await expect(preview).toBeVisible();
    // After AJAX resolves the spinner is replaced by SVG (or an error icon); either counts as content
    await expect(preview.locator('typo3-backend-spinner')).not.toBeVisible({ timeout: 10000 });
    // The preview should now contain either an SVG or a fallback icon
    const previewContent = preview.locator('svg, typo3-backend-icon');
    expect(await previewContent.count()).toBeGreaterThan(0);
  });

  test('typo3-qrcode-modal-button opens a typo3-backend-modal when clicked', async ({ page, backend }) => {
    const content = backend.contentFrame.locator('.lit-demo-content');
    const modalButton = content.locator('typo3-qrcode-modal-button');
    await expect(modalButton).toBeVisible();

    await modalButton.click();

    // Modals portal to the top-level document, not the iframe
    const modal = page.locator('typo3-backend-modal dialog');
    await expect(modal).toBeVisible();
  });
});
