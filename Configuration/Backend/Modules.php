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
    'lit_demo_example' => [
        'parent' => 'content',
        'position' => ['after' => '*'],
        'access' => 'user',
        'path' => '/module/web/lit-demo-example',
        'navigationComponent' => null,
        'inheritNavigationComponentFromMainModule' => false,
        'iconIdentifier' => 'lit-demo-logo',
        'labels' => 'LLL:EXT:lit_demo/Resources/Private/Language/locallang_mod2.xlf',
        'routes' => [
            '_default' => [
                'target' => BackendController::class . '::exampleAction',
            ],
        ],
    ],
];
