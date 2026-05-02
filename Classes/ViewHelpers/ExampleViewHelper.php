<?php

declare(strict_types=1);

namespace Ochorocho\LitDemo\ViewHelpers;

use TYPO3\CMS\Backend\CodeEditor\CodeEditor;
use TYPO3\CMS\Backend\CodeEditor\Registry\ModeRegistry;
use TYPO3\CMS\Core\Page\PageRenderer;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;

/**
 * Renders a "demo + source code + import" tile for a TYPO3 web component.
 *
 * ```
 *    <ld:example codeLanguage="html" import="@typo3/backend/element/icon-element">
 *        <typo3-backend-icon identifier="actions-check" size="default"></typo3-backend-icon>
 *    </ld:example>
 * ```
 */
final class ExampleViewHelper extends AbstractViewHelper
{
    /**
     * @var bool
     */
    protected $escapeOutput = false;

    /**
     * @var bool
     */
    protected $escapeChildren = false;

    public function __construct(
        private readonly PageRenderer $pageRenderer,
        private readonly CodeEditor $codeEditor,
        private readonly ModeRegistry $modeRegistry,
    ) {}

    public function initializeArguments(): void
    {
        $this->registerArgument('codePreview', 'bool', 'if true, show the source code of the example', false, true);
        $this->registerArgument('codeLanguage', 'string', 'the code language identifier used for the code preview, e.g. html, php, javascript, json', false, 'html');
        $this->registerArgument('customCode', 'string', 'custom code displayed as code preview instead of the rendered children', false, '');
        $this->registerArgument('import', 'string', 'JS module specifier shown as the consumer "import" line, e.g. @typo3/backend/element/icon-element', false, '');
        $this->registerArgument('importNote', 'string', 'free-text note shown next to the import line (e.g. "named import: Modal")', false, '');
        $this->registerArgument('decodeEntities', 'bool', 'if true, entities like &lt; and &gt; are decoded in the code preview', false, false);
    }

    public function render(): string
    {
        $this->pageRenderer->loadJavaScriptModule('@typo3/backend/code-editor/element/code-mirror-element.js');
        $this->codeEditor->registerConfiguration();

        $content = (string)$this->renderChildren();
        $codePreview = (bool)$this->arguments['codePreview'];
        $code = '';
        $codeLineCount = 1;
        $codeMirrorAttributes = [];
        $textareaAttributes = [];

        if ($codePreview) {
            $rawCode = $this->arguments['customCode'] !== '' ? (string)$this->arguments['customCode'] : $content;
            $rawLines = explode("\n", $rawCode);
            $lines = [];
            foreach ($rawLines as $line) {
                $line = preg_replace('/(\s)/', ' ', $line) ?? '';
                if (trim($line) !== '') {
                    $lines[] = $line;
                }
            }
            if ($lines === []) {
                $lines = [''];
            }
            $indentSize = strlen($lines[0]) - strlen(ltrim($lines[0]));
            $codeLines = [];
            foreach ($lines as $line) {
                $tmp = substr($line, $indentSize) ?: '';
                $spaces = strlen($tmp) - strlen(ltrim($tmp));
                $codeLines[] = str_repeat(' ', $spaces) . ltrim($line);
            }
            $code = implode(chr(10), $codeLines);
            $codeLineCount = count($codeLines);

            $language = (string)$this->arguments['codeLanguage'];
            if ($language !== '' && $this->modeRegistry->isRegistered($language)) {
                $mode = $this->modeRegistry->getByFormatCode($language);
            } else {
                $mode = $this->modeRegistry->getDefaultMode();
            }

            $codeMirrorAttributes = [
                'mode' => GeneralUtility::jsonEncodeForHtmlAttribute($mode->getModule(), false),
                'readonly' => 'readonly',
            ];
            $textareaAttributes = [
                'wrap' => 'off',
                'rows' => $codeLineCount,
            ];
        }

        $exampleId = uniqid('lit-demo-example-');
        $exampleAttributes = [
            'id' => $exampleId,
            'class' => 'lit-demo-example-render mb-4',
        ];

        $markup = [];
        $markup[] = '<div class="lit-demo-example">';
        $markup[] =     '<div class="lit-demo-example-content">';
        $markup[] =         '<div ' . GeneralUtility::implodeAttributes($exampleAttributes, true) . '>';
        $markup[] =             $content;
        $markup[] =         '</div>';
        $markup[] =     '</div>';

        if ($codePreview) {
            $markup[] = '<div class="lit-demo-example-code">';
            $markup[] =     '<typo3-t3editor-codemirror ' . GeneralUtility::implodeAttributes($codeMirrorAttributes, true) . '>';
            $markup[] =         '<textarea ' . GeneralUtility::implodeAttributes($textareaAttributes, true) . '>';
            $markup[] =             $this->arguments['decodeEntities'] ? htmlspecialchars_decode($code) : htmlspecialchars($code);
            $markup[] =         '</textarea>';
            $markup[] =     '</typo3-t3editor-codemirror>';

            $import = (string)$this->arguments['import'];
            $importNote = (string)$this->arguments['importNote'];
            if ($import !== '' || $importNote !== '') {
                $markup[] = '<div class="lit-demo-example-import">';
                if ($import !== '') {
                    $markup[] =     '<span class="lit-demo-example-import-label">Import</span> ';
                    $markup[] =     '<code>' . htmlspecialchars($import) . '</code>';
                }
                if ($importNote !== '') {
                    $markup[] =     ' <span class="lit-demo-example-import-note">' . htmlspecialchars($importNote) . '</span>';
                }
                $markup[] = '</div>';
            }

            $markup[] = '</div>';
        }
        $markup[] = '</div>';

        return implode('', $markup);
    }
}
