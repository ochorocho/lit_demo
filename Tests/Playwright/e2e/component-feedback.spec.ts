import { test, expect } from '../fixtures/backend';

test.describe('lit_demo_component — feedback group', () => {
  test.beforeEach(async ({ backend }) => {
    await backend.gotoLitDemoComponent('feedback');
  });

  test('renders 4 typo3-backend-alert elements with the four severities', async ({ backend }) => {
    const content = backend.contentFrame.locator('.lit-demo-content');
    for (const severity of ['info', 'ok', 'warning', 'error']) {
      const alert = content.locator(`typo3-backend-alert[severity="${severity}"]`);
      await expect(alert).toBeVisible();
    }
  });

  test('dismissible alert has a close button', async ({ backend }) => {
    const content = backend.contentFrame.locator('.lit-demo-content');
    // The warning and error alerts have the "dismissible" boolean attribute
    const dismissibleAlert = content.locator('typo3-backend-alert[severity="warning"]');
    await expect(dismissibleAlert).toBeVisible();

    // createRenderRoot returns this — button.close is rendered directly in light DOM
    const closeBtn = dismissibleAlert.locator('button.close[data-bs-dismiss="alert"]');
    await expect(closeBtn).toBeVisible();
  });

  test('determinate progress bars have a value attribute', async ({ backend }) => {
    const content = backend.contentFrame.locator('.lit-demo-content');
    const bars = content.locator('typo3-backend-progress-bar[value]');
    // Three determinate bars are defined (25, 60, 100)
    expect(await bars.count()).toBeGreaterThanOrEqual(3);
  });

  test('indeterminate progress bar has no value attribute', async ({ backend }) => {
    const content = backend.contentFrame.locator('.lit-demo-content');
    // The last progress-bar in the demo has no value attribute
    const indeterminate = content.locator('typo3-backend-progress-bar:not([value])');
    await expect(indeterminate).toBeVisible();
  });

  test('typo3-backend-progress-tracker has 4 stages and active="2"', async ({ backend }) => {
    const content = backend.contentFrame.locator('.lit-demo-content');
    const tracker = content.locator('typo3-backend-progress-tracker');
    await expect(tracker).toBeVisible();
    await expect(tracker).toHaveAttribute('active', '2');
    // stages attribute encodes the 4 stage labels as JSON
    const stagesAttr = await tracker.getAttribute('stages');
    const stages = JSON.parse(stagesAttr ?? '[]');
    expect(stages).toHaveLength(4);
  });

  test('clicking a notification trigger button dispatches a typo3-notification-message', async ({ page, backend }) => {
    const content = backend.contentFrame.locator('.lit-demo-content');
    const successBtn = content.locator('[data-lit-demo-notification="success"]');
    await expect(successBtn).toBeVisible();

    await successBtn.click();

    // Notifications portal to the top-level document body
    const notification = page.locator('typo3-notification-message');
    await expect(notification).toBeVisible();
  });
});
