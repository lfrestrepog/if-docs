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
    path: '/blog',
    component: ComponentCreator('/blog', '933'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', 'ebe'),
    exact: true
  },
  {
    path: '/blog/first-blog-post',
    component: ComponentCreator('/blog/first-blog-post', '18f'),
    exact: true
  },
  {
    path: '/blog/long-blog-post',
    component: ComponentCreator('/blog/long-blog-post', '67b'),
    exact: true
  },
  {
    path: '/blog/mdx-blog-post',
    component: ComponentCreator('/blog/mdx-blog-post', '6ab'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '1cf'),
    exact: true
  },
  {
    path: '/blog/tags/docusaurus',
    component: ComponentCreator('/blog/tags/docusaurus', '341'),
    exact: true
  },
  {
    path: '/blog/tags/facebook',
    component: ComponentCreator('/blog/tags/facebook', 'fce'),
    exact: true
  },
  {
    path: '/blog/tags/hello',
    component: ComponentCreator('/blog/tags/hello', 'a27'),
    exact: true
  },
  {
    path: '/blog/tags/hola',
    component: ComponentCreator('/blog/tags/hola', '1d5'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome', 'b7f'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '06b'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '1cb'),
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
        path: '/docs/specification/Computation Pipeline',
        component: ComponentCreator('/docs/specification/Computation Pipeline', '408'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/Durations',
        component: ComponentCreator('/docs/specification/Durations', 'dfa'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/Granularity',
        component: ComponentCreator('/docs/specification/Granularity', '09d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/Impact',
        component: ComponentCreator('/docs/specification/Impact', '280'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/Impact Engine Framework',
        component: ComponentCreator('/docs/specification/Impact Engine Framework', 'a43'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/Impact Graph',
        component: ComponentCreator('/docs/specification/Impact Graph', '544'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/Impact Model Plugin',
        component: ComponentCreator('/docs/specification/Impact Model Plugin', 'dc1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/Impl (Impact YAML)',
        component: ComponentCreator('/docs/specification/Impl (Impact YAML)', '941'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/Inputs',
        component: ComponentCreator('/docs/specification/Inputs', '0a8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/Model Pipeline',
        component: ComponentCreator('/docs/specification/Model Pipeline', '1e4'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/Model Plugin Configuration',
        component: ComponentCreator('/docs/specification/Model Plugin Configuration', '804'),
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
        path: '/docs/tutorials/How to write impls',
        component: ComponentCreator('/docs/tutorials/How to write impls', '8f5'),
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
