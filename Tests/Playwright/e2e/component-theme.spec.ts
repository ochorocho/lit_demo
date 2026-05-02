import { test, expect } from '../fixtures/backend';

test.describe('lit_demo_component — theme group', () => {
  test.beforeEach(async ({ backend }) => {
    await backend.gotoLitDemoComponent('theme');
  });

  test('typo3-backend-color-scheme-switch is rendered', async ({ backend }) => {
    const content = backend.contentFrame.locator('.lit-demo-content');
    const switcher = content.locator('typo3-backend-color-scheme-switch');
    await expect(switcher).toBeVisible();
  });

  test('the switch renders a btn-group with at least two buttons once initialized', async ({ backend }) => {
    const content = backend.contentFrame.locator('.lit-demo-content');
    const switcher = content.locator('typo3-backend-color-scheme-switch');
    await expect(switcher).toBeVisible();
    // createRenderRoot returns this (light DOM) — buttons are directly queryable.
    // Wait for the TYPO3 backend to supply colorSchemes + activeColorScheme attributes
    // so Lit re-renders the btn-group with real content.
    const btnGroup = switcher.locator('.btn-group');
    await expect(btnGroup).toBeVisible();
    const buttons = btnGroup.locator('button');
    expect(await buttons.count()).toBeGreaterThanOrEqual(2);
  });

  test('expand button opens a dropdown-list with three scheme options', async ({ backend }) => {
    const content = backend.contentFrame.locator('.lit-demo-content');
    const switcher = content.locator('typo3-backend-color-scheme-switch');

    const btnGroup = switcher.locator('.btn-group');
    await expect(btnGroup).toBeVisible();

    // The second button in the btn-group is the chevron/expand trigger
    const expandBtn = btnGroup.locator('button').nth(1);
    await expandBtn.click();

    // After expanding, a .dropdown-list appears with three scheme options
    const dropdownItems = switcher.locator('.dropdown-list .dropdown-item');
    await expect(dropdownItems).toHaveCount(3);
  });

  test('clicking a dropdown item dispatches typo3:color-scheme:update event on the iframe document', async ({ page, backend }) => {
    const content = backend.contentFrame.locator('.lit-demo-content');
    const switcher = content.locator('typo3-backend-color-scheme-switch');

    const btnGroup = switcher.locator('.btn-group');
    await expect(btnGroup).toBeVisible();

    // Expand the dropdown first
    const expandBtn = btnGroup.locator('button').nth(1);
    await expandBtn.click();

    const dropdownItems = switcher.locator('.dropdown-list .dropdown-item');
    await expect(dropdownItems.first()).toBeVisible();

    // Listen for the event on the iframe document (main page evaluates JS against host document)
    const eventFired = page.waitForFunction(() => {
      const iframe = document.querySelector('#typo3-contentIframe') as HTMLIFrameElement;
      if (!iframe?.contentDocument) { return false; }
      return new Promise<boolean>((resolve) => {
        iframe.contentDocument!.addEventListener(
          'typo3:color-scheme:update',
          () => resolve(true),
          { once: true }
        );
      });
    }, undefined, { timeout: 10000 });

    await dropdownItems.first().click();
    await eventFired;
  });
});
