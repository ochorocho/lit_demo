import { test as base, expect, type FrameLocator, type Page } from '@playwright/test';

export class LitDemoBackend {
  readonly contentFrame: FrameLocator;
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.contentFrame = page.frameLocator('#typo3-contentIframe');
  }

  /**
   * Navigate to the lit_demo module (Web → "Lit it up!").
   * Waits for the typo3-module-loaded document event before resolving.
   */
  async gotoLitDemo(): Promise<void> {
    await this.page.goto('module/web/layout');
    const moduleLink = this.page.locator('a[data-modulemenu-identifier="lit_demo"]');
    const moduleLoaded = this.waitForModuleLoaded();
    await moduleLink.click();
    await moduleLoaded;
    await expect(moduleLink).toHaveClass(/modulemenu-action-active/);
  }

  /**
   * Navigate to the lit_demo_component module (Web → "Core Web Components").
   * Appends ?group=<group> when a group key is provided.
   */
  async gotoLitDemoComponent(group?: string): Promise<void> {
    const path = group
      ? `module/web/lit-demo-component?group=${group}`
      : 'module/web/lit-demo-component';

    const moduleLoaded = this.waitForModuleLoaded();
    await this.page.goto(path);
    await moduleLoaded;
  }

  /**
   * Returns a promise that resolves when the typo3-module-loaded event fires
   * on the top-level document.
   */
  private waitForModuleLoaded(): Promise<unknown> {
    return this.page.waitForFunction(() => {
      return new Promise((resolve) => {
        document.addEventListener('typo3-module-loaded', () => resolve(true), { once: true });
      });
    });
  }
}

type LitDemoFixtures = {
  backend: LitDemoBackend;
};

export const test = base.extend<LitDemoFixtures>({
  backend: async ({ page }, use) => {
    await use(new LitDemoBackend(page));
  },
});

export { expect } from '@playwright/test';
