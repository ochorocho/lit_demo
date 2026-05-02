// Side-effect imports: each registers a custom element via @customElement.
import '@typo3/backend/element/icon-element.js';
import '@typo3/backend/element/spinner-element.js';
import '@typo3/backend/element/thumbnail-element.js';
import '@typo3/backend/element/qrcode-element.js';
import '@typo3/backend/element/qrcode-modal-button.js';
import '@typo3/backend/element/alert-element.js';
import '@typo3/backend/element/progress-bar-element.js';
import '@typo3/backend/element/progress-tracker-element.js';
import '@typo3/backend/color-picker.js';
import '@typo3/backend/element/datetime-element.js';
import '@typo3/backend/form-engine/element/datetime-element.js';
import '@typo3/backend/element/combobox-element.js';
import '@typo3/backend/form-engine/element/extra/char-counter.js';
import '@typo3/backend/form-engine/element/table-wizard-element.js';
import '@typo3/backend/element/dispatch-modal-button.js';
import '@typo3/backend/code-editor/element/code-mirror-element.js';
import '@typo3/backend/element/breadcrumb.js';
import '@typo3/backend/tab.js';
import '@typo3/backend/element/pagination.js';
import '@typo3/backend/element/editable-page-title.js';
import '@typo3/backend/element/draggable-resizable-element.js';
import '@typo3/backend/copy-to-clipboard.js';
import '@typo3/backend/color-scheme-switch.js';

// Imperative APIs used by the "Modals" and "Feedback" demo buttons.
import Modal, { Sizes, Types } from '@typo3/backend/modal.js';
import Notification from '@typo3/backend/notification.js';
import { SeverityEnum } from '@typo3/backend/enum/severity.js';

document.addEventListener('click', (event) => {
  const modalTrigger = event.target.closest('[data-lit-demo-modal-trigger]');
  if (modalTrigger) {
    const variant = modalTrigger.dataset.litDemoModalTrigger;
    if (variant === 'confirm') {
      Modal.advanced({
        title: 'Confirm action',
        content: 'Are you sure you want to continue? This is a confirmation modal.',
        severity: SeverityEnum.warning,
        type: Types.default,
        size: Sizes.small,
        buttons: [
          { text: 'Cancel', btnClass: 'btn-default', name: 'cancel', trigger: (_, modal) => modal.hideModal() },
          { text: 'Confirm', btnClass: 'btn-warning', name: 'ok', trigger: (_, modal) => modal.hideModal() },
        ],
      });
    } else {
      Modal.advanced({
        title: 'Demo modal',
        content: 'A programmatic typo3-backend-modal opened via Modal.advanced().',
        severity: SeverityEnum.info,
        type: Types.default,
        size: Sizes.default,
      });
    }
    return;
  }

  const notificationTrigger = event.target.closest('[data-lit-demo-notification]');
  if (notificationTrigger) {
    const variant = notificationTrigger.dataset.litDemoNotification;
    switch (variant) {
      case 'success':
        Notification.success('Saved', 'The record was saved successfully.', 4);
        break;
      case 'warning':
        Notification.warning('Heads up', 'This action cannot be undone.', 4);
        break;
      case 'error':
        Notification.error('Failed', 'Something went wrong. Please try again.', 6);
        break;
      default:
        Notification.info('Info', 'A neutral notification.', 4);
    }
  }
});
