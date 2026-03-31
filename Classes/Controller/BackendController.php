<?php

declare(strict_types=1);

namespace Ochorocho\LitDemo\Controller;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Backend\Attribute\AsController;
use TYPO3\CMS\Backend\Template\ModuleTemplateFactory;
use TYPO3\CMS\Core\Page\PageRenderer;

#[AsController]
final readonly class BackendController
{
    public function __construct(
        private ModuleTemplateFactory $moduleTemplateFactory,
        private PageRenderer $pageRenderer,
    ) {}

    public function indexAction(ServerRequestInterface $request): ResponseInterface
    {
        // Add inline labels to be used with the lit-helper e.g. lll('label-identifier')
        $this->pageRenderer->addInlineLanguageLabelFile('EXT:lit_demo/Resources/Private/Language/locallang.xlf');
        $this->pageRenderer->addCssFile('EXT:lit_demo/Resources/Public/Css/lit-demo.css');
        $this->pageRenderer->loadJavaScriptModule('@ochorocho/lit-demo/app.js');

        $view = $this->moduleTemplateFactory->create($request);
        return $view->renderResponse('Backend/Index');
    }
}
