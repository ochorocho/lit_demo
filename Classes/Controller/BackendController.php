<?php

declare(strict_types=1);

namespace Ochorocho\LitDemo\Controller;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Backend\Attribute\AsController;
use TYPO3\CMS\Backend\Template\ModuleTemplateFactory;
use TYPO3\CMS\Core\Localization\LanguageService;
use TYPO3\CMS\Core\Page\PageRenderer;

#[AsController]
final readonly class BackendController
{
    private const COMPONENT_GROUPS = [
        'overview',
        'iconsMedia',
        'feedback',
        'forms',
        'modals',
        'editor',
        'navigation',
        'editing',
        'theme',
    ];

    public function __construct(
        private ModuleTemplateFactory $moduleTemplateFactory,
        private PageRenderer $pageRenderer,
    ) {}

    public function indexAction(ServerRequestInterface $request): ResponseInterface
    {
        $this->pageRenderer->addCssFile('EXT:lit_demo/Resources/Public/Css/lit-demo.css');
        $this->pageRenderer->loadJavaScriptModule('@ochorocho/lit-demo/app.js');

        $view = $this->moduleTemplateFactory->create($request);
        return $view->renderResponse('Backend/Index');
    }

    public function componentAction(ServerRequestInterface $request): ResponseInterface
    {
        $this->pageRenderer->addCssFile('EXT:lit_demo/Resources/Public/Css/lit-demo.css');
        $this->pageRenderer->loadJavaScriptModule('@ochorocho/lit-demo/component/component-demos.js');

        $group = (string)($request->getQueryParams()['group'] ?? 'overview');
        if (!in_array($group, self::COMPONENT_GROUPS, true)) {
            $group = 'overview';
        }

        $languageService = $this->getLanguageService();
        $moduleTitle = $languageService->sL(
            'LLL:EXT:lit_demo/Resources/Private/Language/locallang_mod_component.xlf:mlang_tabs_tab'
        );
        $groupTitle = $languageService->sL(
            'LLL:EXT:lit_demo/Resources/Private/Language/locallang_mod_component.xlf:group.' . $group
        );

        $view = $this->moduleTemplateFactory->create($request);
        $view->setTitle($moduleTitle, $groupTitle);
        $view->assignMultiple([
            'currentGroup' => $group,
            'currentGroupPartial' => ucfirst($group),
            'groups' => self::COMPONENT_GROUPS,
            'routeIdentifier' => 'lit_demo_component',
        ]);

        return $view->renderResponse('Backend/Component');
    }

    private function getLanguageService(): LanguageService
    {
        return $GLOBALS['LANG'];
    }
}
