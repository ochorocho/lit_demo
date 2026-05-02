import { test, expect } from '../fixtures/backend';

test.describe('lit_demo_component — forms group', () => {
  test.beforeEach(async ({ backend }) => {
    await backend.gotoLitDemoComponent('forms');
  });

  test('color-picker renders with swatches attribute and a visible input', async ({ backend }) => {
    const content = backend.contentFrame.locator('.lit-demo-content');
    const picker = content.locator('typo3-backend-color-picker');
    await expect(picker).toBeVisible();
    // The wrapped <input type="text"> is in light DOM
    const input = picker.locator('input[type="text"]');
    await expect(input).toBeVisible();
  });

  test('typo3-backend-datetime renders a <time> element with formatted text per attribute set', async ({ backend }) => {
    const content = backend.contentFrame.locator('.lit-demo-content');
    const datetimes = content.locator('typo3-backend-datetime');
    // Forms partial renders four display-only datetime elements (datetime/relative/custom/timestamp).
    await expect(datetimes).toHaveCount(4);
    // Each is a display-only formatter that wraps a semantic <time> element with non-empty text.
    for (let i = 0; i < 4; i++) {
      const time = datetimes.nth(i).locator('time');
      await expect(time).toBeAttached();
      await expect(time).not.toBeEmpty();
    }
  });

  test('typo3-formengine-element-datetime initializes flatpickr and renders a visible picker + calendar button', async ({ backend }) => {
    const content = backend.contentFrame.locator('.lit-demo-content');
    const datetime = content.locator('typo3-formengine-element-datetime');
    await expect(datetime).toBeVisible();

    // The original input keeps its config attributes but flatpickr converts it to hidden
    // and adds `data-datepicker-initialized="1"` once the picker has wired up.
    const originalInput = datetime.locator('#lit-demo-datetime-input');
    await expect(originalInput).toHaveAttribute('data-input-type', 'datetimepicker');
    await expect(originalInput).toHaveAttribute('data-date-type', 'datetime');
    await expect(originalInput).toHaveAttribute('data-datepicker-initialized', '1');

    // flatpickr injects a sibling <input type="text" class="form-control t3js-datetimepicker ... input">
    // that the user actually types into. The original (with our id) is now type="hidden".
    const visibleInput = datetime.locator('input.t3js-datetimepicker[type="text"]');
    await expect(visibleInput).toBeVisible();

    // Calendar button has an actions-edit-pick-date icon and focuses the input on click.
    const triggerButton = datetime.locator('button[data-action-focus="#lit-demo-datetime-input"]');
    await expect(triggerButton).toBeVisible();
    await expect(triggerButton.locator('typo3-backend-icon[identifier="actions-edit-pick-date"]')).toBeAttached();
  });

  test('combobox: typing filters choices, clicking a choice updates the input', async ({ backend }) => {
    const content = backend.contentFrame.locator('.lit-demo-content');
    const combobox = content.locator('typo3-backend-combobox');
    await expect(combobox).toBeVisible();

    const input = combobox.locator('input[type="text"]');
    await input.click();
    await input.fill('ban');

    // After typing, the "Banana" choice should be visible
    const bananaChoice = combobox.locator('typo3-backend-combobox-choice[value="banana"]');
    await expect(bananaChoice).toBeVisible();

    await bananaChoice.click();
    // The combobox sets input.value = choiceElement.value attribute ("banana"), not the label text
    await expect(input).toHaveValue('banana');
  });

  test('char-counter wires its target, un-hides on focus, and reports remaining count', async ({ backend }) => {
    const content = backend.contentFrame.locator('.lit-demo-content');
    const charInput = content.locator('#lit-demo-char-input');
    const counter = content.locator('typo3-backend-formengine-char-counter');

    await expect(charInput).toBeVisible();
    await expect(counter).toBeAttached();
    await expect(counter).toHaveAttribute('target', '#lit-demo-char-input');
    // Hidden by default — connectedCallback sets `this.hidden = true`.
    await expect(counter).toHaveAttribute('hidden', '');

    await charInput.focus();

    // Focus listener un-hides and renders the remaining-character message.
    await expect(counter).not.toHaveAttribute('hidden', '');
    await expect(counter).toContainText(/\d+/);
  });

  test('table-wizard renders a table in light DOM', async ({ backend }) => {
    const content = backend.contentFrame.locator('.lit-demo-content');
    const wizard = content.locator('typo3-formengine-table-wizard');
    await expect(wizard).toBeVisible();

    // The wizard renders a <table> in light DOM (createRenderRoot returns this)
    const table = wizard.locator('table');
    await expect(table).toBeVisible();

    // The wizard reads table data from a sibling <textarea> via the 'selector' attribute.
    // In the demo, 'selector' is not set so the wizard renders a minimal table; at minimum
    // one row is always present.
    const rows = table.locator('tr');
    expect(await rows.count()).toBeGreaterThanOrEqual(1);
  });
});
