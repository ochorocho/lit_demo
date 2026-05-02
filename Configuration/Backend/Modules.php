<?php

use Ochorocho\LitDemo\Controller\BackendController;

return [
    'lit_demo' => [
        'parent' => 'content',
        'position' => ['after' => '*'],
        'access' => 'user',
        'path' => '/module/web/lit-demo',
        'navigationComponent' => null,
        'inheritNavigationComponentFromMainModule' => false,
        'iconIdentifier' => 'lit-demo-logo',
        'labels' => 'LLL:EXT:lit_demo/Resources/Private/Language/locallang_mod.xlf',
        'routes' => [
            '_default' => [
                'target' => BackendController::class . '::indexAction',
            ],
        ],
    ],
    'lit_demo_component' => [
        'parent' => 'content',
        'position' => ['after' => '*'],
        'access' => 'user',
        'path' => '/module/web/lit-demo-component',
        'navigationComponent' => null,
        'inheritNavigationComponentFromMainModule' => false,
        'iconIdentifier' => 'lit-demo-logo-component',
        'labels' => 'LLL:EXT:lit_demo/Resources/Private/Language/locallang_mod_component.xlf',
        'routes' => [
            '_default' => [
                'target' => BackendController::class . '::componentAction',
            ],
        ],
    ],
];
