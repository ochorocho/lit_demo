import { html } from 'lit';

const greetingStep = {
  key: 'greeting',
  title: 'Greeting',
  autoAdvance: false,
  isComplete: () => true,
  render: () => html`<p>Hello from the first wizard step.</p>`,
};

const detailsStep = {
  key: 'details',
  title: 'Details',
  autoAdvance: false,
  isComplete: () => true,
  render: () => html`<p>Second step — add any markup or form controls here.</p>`,
};

const submissionService = {
  execute: async () => ({ success: true, finisher: { type: 'noop' } }),
};

const wizard = document.getElementById('demo-wizard');
if (wizard) {
  wizard.steps = [greetingStep, detailsStep];
  wizard.submissionService = submissionService;
}
