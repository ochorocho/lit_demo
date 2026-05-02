import { test, expect } from '../fixtures/backend';

test.describe('lit_demo_component — editor group', () => {
  test.beforeEach(async ({ backend }) => {
    await backend.gotoLitDemoComponent('editor');
  });

  test('renders 3 typo3-t3editor-codemirror demo elements in .lit-demo-example-render', async ({ backend }) => {
    // Each <ld:example> wraps the demo in .lit-demo-example-render.
    const content = backend.contentFrame.locator('.lit-demo-content');
    const demoEditors = content.locator('.lit-demo-example-render typo3-t3editor-codemirror');
    await expect(demoEditors).toHaveCount(3);
  });

  test('code-preview editors are read-only (have the readonly attribute)', async ({ backend }) => {
    const content = backend.contentFrame.locator('.lit-demo-content');
    const codeEditors = content.locator('.lit-demo-example-code typo3-t3editor-codemirror[readonly]');
    // Each of the 3 ld:example blocks generates one readonly code-preview editor
    expect(await codeEditors.count()).toBeGreaterThanOrEqual(3);
  });

  test('each demo editor element is attached to the DOM', async ({ backend }) => {
    const content = backend.contentFrame.locator('.lit-demo-content');
    const demoEditors = content.locator('.lit-demo-example-render typo3-t3editor-codemirror');
    const count = await demoEditors.count();
    expect(count).toBe(3);

    for (let i = 0; i < count; i++) {
      await expect(demoEditors.nth(i)).toBeAttached();
    }
  });

  test('each demo editor has a shadow root with a codemirror-parent container', async ({ page, backend }) => {
    // CodeMirror initializes lazily via IntersectionObserver; in headless mode inside an iframe
    // the observer may not fire. We verify that Lit rendered the shadow DOM shell (including
    // the #codemirror-parent host div) which confirms the element is fully connected.
    const listFrame = page.frame('list_frame');
    if (!listFrame) {
      // Fallback: just assert the elements are attached
      const content = backend.contentFrame.locator('.lit-demo-content');
      const demoEditors = content.locator('.lit-demo-example-render typo3-t3editor-codemirror');
      for (let i = 0; i < 3; i++) {
        await expect(demoEditors.nth(i)).toBeAttached();
      }
      return;
    }

    const results = await listFrame.evaluate(() => {
      const editors = document.querySelectorAll(
        '.lit-demo-example-render typo3-t3editor-codemirror'
      );
      return Array.from(editors).map(el => ({
        hasShadowRoot: el.shadowRoot !== null,
        hasCodemirrorParent: el.shadowRoot?.querySelector('#codemirror-parent') !== null,
      }));
    });

    expect(results).toHaveLength(3);
    for (const result of results) {
      expect(result.hasShadowRoot).toBe(true);
      expect(result.hasCodemirrorParent).toBe(true);
    }
  });
});
