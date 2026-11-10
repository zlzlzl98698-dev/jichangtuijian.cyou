import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  brandSidebar: [
    {
      type: 'doc',
      id: 'brands/index',
      label: '🏆 42家机场品牌总览与选型矩阵',
    },
    {
      type: 'category',
      label: '🌟 顶级主力推选 (Top 10)',
      collapsed: false,
      items: [
        'brands/guangsu',
        'brands/muguang',
        'brands/feimao',
        'brands/weifeng',
        'brands/dalaoyun',
        'brands/xingdaomeng',
        'brands/ermao',
        'brands/wuyou',
        'brands/weitu',
        'brands/firefly',
      ],
    },
    {
      type: 'category',
      label: '⚡ 新晋高速与特色品牌 (11-28)',
      collapsed: false,
      items: [
        'brands/yuzhou',
        'brands/u1s1',
        'brands/lingmao',
        'brands/jilian',
        'brands/guangnian',
        'brands/yifan',
        'brands/sogo',
        'brands/kexin',
        'brands/sujie',
        'brands/shanyue',
        'brands/quanqiu',
        'brands/shandianshu',
        'brands/yunjiexian',
        'brands/liulianyun',
        'brands/shenxing',
        'brands/huanqiuti',
        'brands/yinxingren',
        'brands/tiziyun',
      ],
    },
    {
      type: 'category',
      label: '🌐 长期备用与特定场景品牌 (29-42)',
      collapsed: true,
      items: [
        'brands/wgetcloud',
        'brands/baiyueguang',
        'brands/flyingbird',
        'brands/cyberguard',
        'brands/longmaoyun',
        'brands/fatcat',
        'brands/tntcloud',
        'brands/qingyunti',
        'brands/shanshuiyun',
        'brands/lingdongyun',
        'brands/langwang',
        'brands/edgenova',
        'brands/yinghuochong',
        'brands/sslar',
      ],
    },
  ],

  scenarioSidebar: [
    {
      type: 'doc',
      id: 'scenarios/index',
      label: '🎯 场景选型方法论',
    },
    'scenarios/ai-accelerate',
    'scenarios/streaming-unlock',
    'scenarios/cross-border-ecommerce',
    'scenarios/low-latency-gaming',
    'scenarios/budget-friendly',
    'scenarios/enterprise-dedicated',
  ],

  clientSidebar: [
    {
      type: 'doc',
      id: 'clients/index',
      label: '💻 2026 全平台客户端下载大全',
    },
    'clients/windows',
    'clients/macos',
    'clients/ios',
    'clients/android',
    'clients/linux',
    'clients/router',
  ],

  observatorySidebar: [
    {
      type: 'doc',
      id: 'observatory/index',
      label: '📡 网络可观测实验室概述',
    },
    'observatory/iepl-vs-iplc',
    'observatory/protocols',
    'observatory/speedtest-guide',
    'observatory/disclaimer',
  ],

  architectureSidebar: [
    {
      type: 'doc',
      id: 'architecture/index',
      label: '🏛️ 架构与蜂巢内链拓扑',
    },
    {
      type: 'doc',
      id: 'architecture/topic-clusters',
      label: '🌐 800篇内容集群与标题矩阵',
    },
  ],
};

export default sidebars;
