import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '机场 cyou · 2026 高端机场推荐与网络可观测性平台',
  tagline: '42家主流机场权威实测 · IEPL/IPLC专线万字测评矩阵 · AI与全球流媒体解锁可观测实验室',
  favicon: 'img/favicon.png',

  url: 'https://jichangtuijian.cyou',
  baseUrl: '/',

  organizationName: 'jichang-cyou',
  projectName: 'jichangtuijian-web',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en', 'zh'],
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        docsRouteBasePath: '/docs',
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.8,
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    metadata: [
      { name: 'keywords', content: '机场推荐, 2026机场推荐, 光速云, IPLC专线, IEPL专线, 便宜机场, 稳定机场, ChatGPT代理, 流媒体解锁, Clash客户端' },
      { name: 'description', content: '机场 cyou (jichangtuijian.cyou) 专注于 42 家主流机场的深度测速评测、延迟监控、晚高峰稳定性分析与 AI/流媒体解锁验证，提供客观中立的选型指南。' },
      { name: 'author', content: '机场 cyou 网络可观测实验室' },
    ],
    navbar: {
      title: '机场 cyou',
      logo: {
        alt: '机场 cyou 实验室',
        src: 'img/avatar.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'brandSidebar',
          position: 'left',
          label: '🏆 42家机场品牌库',
        },
        {
          type: 'docSidebar',
          sidebarId: 'scenarioSidebar',
          position: 'left',
          label: '🎯 专线与场景选型',
        },
        {
          type: 'docSidebar',
          sidebarId: 'clientSidebar',
          position: 'left',
          label: '💻 客户端与配置',
        },
        {
          type: 'docSidebar',
          sidebarId: 'observatorySidebar',
          position: 'left',
          label: '📡 协议与可观测实验室',
        },
        {
          type: 'docSidebar',
          sidebarId: 'architectureSidebar',
          position: 'left',
          label: '🏛️ 架构与知识图谱',
        },
        {
          href: 'https://sahude.gsyvipaff.com/#/?code=keqgvT5Y',
          label: '🚀 主推·光速云',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '核心评测矩阵',
          items: [
            { label: '光速云 (No.1 综合主推)', to: '/docs/brands/guangsu' },
            { label: '暮光加速 (多设备团队)', to: '/docs/brands/muguang' },
            { label: '飞猫云 (小白即开即用)', to: '/docs/brands/feimao' },
            { label: '微风网络 (入门IEPL)', to: '/docs/brands/weifeng' },
            { label: '唯兔云 (IPLC全能)', to: '/docs/brands/weitu' },
            { label: '星岛梦 (老牌不限设备)', to: '/docs/brands/xingdaomeng' },
          ],
        },
        {
          title: '场景专题',
          items: [
            { label: 'ChatGPT & Claude 专用加速', to: '/docs/scenarios/ai-accelerate' },
            { label: 'Netflix & 流媒体 4K 解锁', to: '/docs/scenarios/streaming-unlock' },
            { label: '跨境电商与 TikTok 直播专用', to: '/docs/scenarios/cross-border-ecommerce' },
            { label: '晚高峰零卡顿游戏低延迟', to: '/docs/scenarios/low-latency-gaming' },
          ],
        },
        {
          title: '客户端生态',
          items: [
            { label: 'Windows (Clash Verge / v2rayN)', to: '/docs/clients/windows' },
            { label: 'Android (v2rayNG / FlClash)', to: '/docs/clients/android' },
            { label: 'iOS (小火箭 / Stash / Surge)', to: '/docs/clients/ios' },
            { label: 'macOS (Clash Verge / sing-box)', to: '/docs/clients/macos' },
            { label: '软路由 (OpenClash / PassWall)', to: '/docs/clients/router' },
          ],
        },
        {
          title: '网络可观测与全站架构',
          items: [
            { label: 'IEPL vs IPLC 专线硬核技术解密', to: '/docs/observatory/iepl-vs-iplc' },
            { label: 'VLESS vs Trojan vs Hysteria2', to: '/docs/observatory/protocols' },
            { label: '晚高峰测速方法与防坑指南', to: '/docs/observatory/speedtest-guide' },
            { label: '全站架构与蜂巢内链拓扑', to: '/docs/architecture' },
            { label: '800篇内容集群与标题矩阵', to: '/docs/architecture/topic-clusters' },
            { label: '免责声明与合规推广说明', to: '/docs/observatory/disclaimer' },
          ],
        },
      ],
      copyright: `Copyright © 2026 机场 cyou (jichangtuijian.cyou). 本站包含合规推广链接，通过链接订阅可能为本平台带来微量运维赞助，不影响用户享有价格与特惠。`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
