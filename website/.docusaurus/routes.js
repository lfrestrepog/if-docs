import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', 'c15'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '09c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', '251'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'dbb'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '68d'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '6aa'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', 'aec'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '06b'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '439'),
    routes: [
      {
        path: '/docs/background',
        component: ComponentCreator('/docs/background', 'ef0'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/models/',
        component: ComponentCreator('/docs/models/', '34c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/models/boavizta',
        component: ComponentCreator('/docs/models/boavizta', '2ae'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/models/ccf',
        component: ComponentCreator('/docs/models/ccf', '44d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/models/cloud-instance-metadata',
        component: ComponentCreator('/docs/models/cloud-instance-metadata', '6be'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/models/sci',
        component: ComponentCreator('/docs/models/sci', 'c3f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/models/sci-e',
        component: ComponentCreator('/docs/models/sci-e', 'ed9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/models/sci-m',
        component: ComponentCreator('/docs/models/sci-m', 'f4f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/models/sci-o',
        component: ComponentCreator('/docs/models/sci-o', 'a8c'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/models/shell',
        component: ComponentCreator('/docs/models/shell', '865'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/models/teads-aws',
        component: ComponentCreator('/docs/models/teads-aws', 'c13'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/models/teads-cpu',
        component: ComponentCreator('/docs/models/teads-cpu', 'e0e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/models/watt-time',
        component: ComponentCreator('/docs/models/watt-time', 'b96'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/overview',
        component: ComponentCreator('/docs/overview', '5c2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/',
        component: ComponentCreator('/docs/specification/', 'bb2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/computation-pipeline',
        component: ComponentCreator('/docs/specification/computation-pipeline', '8d8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/durations',
        component: ComponentCreator('/docs/specification/durations', '0f9'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/granularity',
        component: ComponentCreator('/docs/specification/granularity', 'f47'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/impact',
        component: ComponentCreator('/docs/specification/impact', '67e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/impact-engine-framework',
        component: ComponentCreator('/docs/specification/impact-engine-framework', '466'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/impact-graph',
        component: ComponentCreator('/docs/specification/impact-graph', '384'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/impact-model-plugin',
        component: ComponentCreator('/docs/specification/impact-model-plugin', 'e2a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/impl',
        component: ComponentCreator('/docs/specification/impl', '59a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/inputs',
        component: ComponentCreator('/docs/specification/inputs', '949'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/model-pipeline',
        component: ComponentCreator('/docs/specification/model-pipeline', 'ec4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/model-plugin-config',
        component: ComponentCreator('/docs/specification/model-plugin-config', '168'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/Terminology',
        component: ComponentCreator('/docs/Terminology', '580'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorials/',
        component: ComponentCreator('/docs/tutorials/', '434'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorials/how-to-build-models',
        component: ComponentCreator('/docs/tutorials/how-to-build-models', '099'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorials/how-to-write-impls',
        component: ComponentCreator('/docs/tutorials/how-to-write-impls', '2b1'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'ddf'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
