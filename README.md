#  Use Lit in the TYPO3 Backend 

## Install

Given you have already set up the TYPO3 Core using
[bmack/tryout](https://github.com/bmack/tryout) only the following
steps are required to install EXT:lit_demo:

1. Go into the local repository folder: `cd packages/`
2. Clone the demo repository: `git clone git@github.com:ochorocho/lit_demo.git`
3. Install the extension: `ddev composer req ochorocho/lit-demo:@dev`

## WebComponents

All paths are relative to `typo3-core/Build/Sources/TypeScript/`.

| Tag                                     | Category      | File                                               |
|-----------------------------------------|---------------|----------------------------------------------------|
| typo3-backend-icon                      | UI primitive  | backend/element/icon-element.ts                    |
| typo3-backend-modal                     | UI primitive  | backend/modal.ts                                   |
| typo3-notification-message              | UI primitive  | backend/notification.ts                            |
| typo3-backend-alert                     | UI primitive  | backend/element/alert-element.ts                   |
| typo3-backend-spinner                   | UI primitive  | backend/element/spinner-element.ts                 |
| typo3-backend-progress-bar              | UI primitive  | backend/element/progress-bar-element.ts            |
| typo3-backend-progress-tracker          | UI primitive  | backend/element/progress-tracker-element.ts        |
| typo3-backend-pagination                | UI primitive  | backend/element/pagination.ts                      |
| typo3-breadcrumb                        | UI primitive  | backend/element/breadcrumb.ts                      |
| typo3-backend-thumbnail                 | UI primitive  | backend/element/thumbnail-element.ts               |
| typo3-backend-datetime                  | UI primitive  | backend/element/datetime-element.ts                |
| typo3-backend-tab-scroller              | UI primitive  | backend/tab.ts                                     |
| typo3-backend-combobox                  | UI primitive  | backend/element/combobox-element.ts                |
| typo3-backend-combobox-choice           | UI primitive  | backend/element/combobox-element.ts                |
| typo3-backend-context-menu              | UI primitive  | backend/context-menu.ts                            |
| typo3-backend-color-picker              | UI primitive  | backend/color-picker.ts                            |
| typo3-backend-draggable-resizable       | UI primitive  | backend/element/draggable-resizable-element.ts     |
| typo3-backend-sidebar-toggle            | UI primitive  | backend/element/sidebar-toggle-element.ts          |
| typo3-backend-editable-page-title       | UI primitive  | backend/element/editable-page-title.ts             |
| typo3-backend-grid-editor               | UI primitive  | backend/grid-editor.ts                             |
| typo3-backend-wizard                    | UI primitive  | backend/wizard/wizard.ts                           |
| typo3-copy-to-clipboard                 | Action helper | backend/copy-to-clipboard.ts                       |
| typo3-immediate-action                  | Action helper | backend/element/immediate-action-element.ts        |
| typo3-backend-dispatch-modal-button     | Action helper | backend/element/dispatch-modal-button.ts           |
| typo3-qrcode                            | Action helper | backend/element/qrcode-element.ts                  |
| typo3-qrcode-modal-button               | Action helper | backend/element/qrcode-modal-button.ts             |
| typo3-recordlist-record-download-button | Action helper | backend/record-download-button.ts                  |
| typo3-t3editor-codemirror               | Editor        | backend/code-editor/element/code-mirror-element.ts |

## Challenge

### a) Create a WebComponent to display the weather data

1. Fetch data from the weather API: `https://api.open-meteo.com/v1/forecast?latitude=28.33&longitude=-14.01&hourly=temperature_2m`
2. Loop over the provided `hourly` data (`time`, `temperature_2m`)
3. Create a graph with the collected data

### b) Query GitHub user stats

1. Fetch your GitHub Users Repo `https://api.github.com/users/{user}/repos?per_page=100&page=1`
2. Loop over the returned repos and collect the 'url'
3. Loop over the collected repo urls and count your commits:
   `https://api.github.com/repos/{user}/{repo}/commits?author={user}&per_page=100&page=1`
4. Dynamically display the data while its retrieved
   e.g. | repo path | commit count |

## Resources

* Lit Docs: https://lit.dev/docs/
* Working with the shadow DOM: https://lit.dev/docs/components/shadow-dom/#accessing-nodes-in-the-shadow-dom
* Component styling: https://lit.dev/docs/components/styles/
* Lifecycle https://lit.dev/docs/components/lifecycle/