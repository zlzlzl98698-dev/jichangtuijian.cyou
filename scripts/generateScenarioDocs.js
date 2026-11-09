const fs = require('fs');
const path = require('path');

// 1. SCENARIOS GENERATION
const scenariosDir = path.join(__dirname, '../docs/scenarios');
if (!fs.existsSync(scenariosDir)) fs.mkdirSync(scenariosDir, { recursive: true });

const scenarioDocs = [
  {
    id: 'index',
    title: '2026年机场场景选型决策指南与应用匹配矩阵',
    description: '针对 AI 大模型、4K 流媒体、跨境电商推流、电竞加速与极致省钱等不同场景的机场选型全景矩阵。',
    content: `# 2026年机场场景选型决策指南与应用匹配矩阵

> **导言**：没有一个机场能够在所有维度（价格、极限延迟、节点数量、设备并发、解锁纯净度）上同时做到完美。最理想的选型策略是根据**核心使用场景**进行精准匹配。

---

## 核心应用场景与首选品牌速查

| 核心应用场景 | 关键技术考量 | 推荐首选品牌 | 备选推荐 | 详细指南入口 |
| :--- | :--- | :--- | :--- | :--- |
| **🤖 AI 大模型生产力** | 原生住宅/机房 IP、长连接不断流 | **[光速云](/docs/brands/guangsu)**、**[速界](/docs/brands/sujie)** | [唯兔云](/docs/brands/weitu) | [AI 专用选型](/docs/scenarios/ai-accelerate) |
| **🎬 4K/8K 流媒体影音** | 晚高峰下行吞吐、全区原生解锁 | **[闪跃](/docs/brands/shanyue)**、**[光速云](/docs/brands/guangsu)** | [U1S1](/docs/brands/u1s1) | [流媒体专线选型](/docs/scenarios/streaming-unlock) |
| **📦 跨境电商与社媒投放** | 纯净原生 IP、TikTok 防封控 | **[无忧链接](/docs/brands/wuyou)**、**[一翻云](/docs/brands/yifan)** | [TNTCloud](/docs/brands/tntcloud) | [电商与直播选型](/docs/scenarios/cross-border-ecommerce) |
| **🎮 电竞跨区与低延迟** | 物理直连专线、极限 RTT 与 0 丢包 | **[光速云](/docs/brands/guangsu)**、**[微风网络](/docs/brands/weifeng)** | [星岛梦](/docs/brands/xingdaomeng) | [电竞专线选型](/docs/scenarios/low-latency-gaming) |
| **💰 极低预算与轻量备用** | 月均 5-8 元、防失联、查阅资料 | **[大佬云](/docs/brands/dalaoyun)**、**[闪电鼠](/docs/brands/shandianshu)** | [云界线](/docs/brands/yunjiexian) | [平价档横评](/docs/scenarios/budget-friendly) |
| **🏢 团队办公与高并发** | 不限设备并发、多平台自研客户端 | **[暮光加速](/docs/brands/muguang)**、**[WgetCloud](/docs/brands/wgetcloud)** | [二猫云](/docs/brands/ermao) | [企业与团队选型](/docs/scenarios/enterprise-dedicated) |
`
  },
  {
    id: 'ai-accelerate',
    title: 'ChatGPT、Claude 与 Gemini 专属加速机场深度选型指南',
    description: '针对 OpenAI ChatGPT、Anthropic Claude、Google Gemini 的代理风控机制、IP 纯净度检测及防降级专线配置。',
    content: `# 2026 年 ChatGPT、Claude 与 Gemini 专属加速机场深度选型指南

> **核心摘要**：大模型厂商（尤其 OpenAI 与 Anthropic）部署了极度严苛的 IP 风险评分算法。使用机房劣质黑名单 IP 访问会导致 \`Access Denied\`、Claude 账号无预警封禁或 ChatGPT 4o 强行降级为基础模型。

---

## 一、AI 平台的风控拦截机制揭秘

1. **欺诈评分 (Fraud Score / IPQS)**：当出口 IP 的欺诈值超过 60 时，OpenAI 会在握手阶段触发 Cloudflare 验证码死循环。
2. **ASN 数据中心标记**：机房原生托管 IP（Hosting/DataCenter）比住宅广播 IP（Residential）更容易被 Anthropic 判定为爬虫或批量滥用。
3. **TCP 保活与长 Token 推理中断**：深度推理（如 o1 / Claude 3.5 Sonnet）往往需要保持单次 HTTP 连接持续长达 60~120 秒，劣质代理服务器因超时自动斩断 TCP 连接会导致输出到一半崩溃。

---

## 二、Top 3 深度适配 AI 大模型的专线推荐

### 1. [光速云 (综合推荐首选)](/docs/brands/guangsu)
- **技术优势**：IEPL 专线出口搭配亚太原生高信誉 IP 节点，对 Claude 3.5 与 ChatGPT o1 兼容性极高。
- **实测表现**：晚高峰连接 ChatGPT 4o 响应延迟低于 600ms，长时间代码推理无断连断流。
- **优惠码**：\`AMM\`

### 2. [速界 (25元档 AI 针对型)](/docs/brands/sujie)
- **技术优势**：全站核心定位即面向生产力 AI，官方持续动态清洗被拉黑出口 IP。
- **实测表现**：全节点标配 Gemini 与 Claude 原生连通性调优。
- **优惠码**：\`sss1111\`

### 3. [一翻云 (原生住宅 IP + Hysteria 2)](/docs/brands/yifan)
- **技术优势**：提供真实家庭住宅 IP 节点，彻底杜绝数据中心 IP 风控。
`
  },
  {
    id: 'streaming-unlock',
    title: 'Netflix、Disney+ 与 YouTube 4K/8K 流媒体全区解锁机场指南',
    description: '2026年全球流媒体非自制剧解锁、4K 蓝光高码率无卡顿专线机场选型与 DNS 分流技巧。',
    content: `# 2026 年 Netflix、Disney+ 与 YouTube 4K/8K 流媒体全区解锁机场指南

> **流媒体核心法则**：能打开网页不等于能看自制剧，能看自制剧不等于能看全区本地版权剧（如 Netflix 日本区独播动画）。

---

## 一、流媒体解锁的三层境界

1. **第一层：仅解锁自制剧 (Netflix Originals Only)**：由于代理 IP 缺乏本地原生 DNS 解析支持，Netflix 仅展示全球共有版权剧集。
2. **第二层：非自制版权全区解锁**：节点具备本地 Residential / ISP 原生标识，可正常观看各地区域独家买断电视剧与电影。
3. **第三层：晚高峰 4K/8K 80,000+ Kbps 极速缓冲**：单节点拥有充足物理带宽与 BGP 智能分流，拖动进度条秒播无转圈。

---

## 二、流媒体推荐梯队

- **[闪跃](/docs/brands/shanyue)**：顶级 IPLC 专线，骨干网原生解锁，实测香港节点下载突破 548Mbps。
- **[光速云](/docs/brands/guangsu)**：高带宽 IEPL 专线，香港/日本/新加坡全节点原生解锁 Netflix 与 Disney+。
- **[唯兔云](/docs/brands/weitu)**：全节点 1 倍率 IPLC 纯专线，三网智能优化，晚高峰播放 YouTube 4K 零缓冲。
`
  },
  {
    id: 'cross-border-ecommerce',
    title: '跨境电商、TikTok 直播推流与海外社媒多账号运营专用专线',
    description: '外贸独立站、亚马逊运营、TikTok 直播无掉帧专线及防止关联封号的网络架构方案。',
    content: `# 2026 跨境电商、TikTok 直播推流与海外社媒多账号运营专线

> **外贸核心痛点**：IP 频繁跳跃导致店铺被判定异地登陆触发人脸审核；直播推流延迟与丢包导致直播间掉权重。

---

## 一、跨境电商运营的关键网络指标

- **固定出口与静态 IP 保护**：严禁在短时间内在同一个浏览器指纹下频繁切换国家出口。
- **上行推流带宽保障**：TikTok 1080P 高清直播推流要求持续稳定在 8Mbps~15Mbps 上行且 **0% 丢包**。
- **原生区域识别 (ISP Tag)**：IP 归属地必须精准匹配目标受众国（如美区、英区、印尼区）。

---

## 二、电商与直播专属服务商推荐

- **[无忧链接](/docs/brands/wuyou)**：专注跨境电商与 TikTok 跨区直连，专属客户端开箱即用。
- **[一翻云](/docs/brands/yifan)**：原生住宅 IP，大幅降低社交媒体平台与电商店铺防关联风险。
- **[TNTCloud](/docs/brands/tntcloud)**：老牌团队提供定制化电商大带宽专线支持。
`
  },
  {
    id: 'low-latency-gaming',
    title: '跨区电竞游戏专线：晚高峰零丢包与超低 RTT 网络方案',
    description: '针对 Steam、Valorant、Apex Legends 亚服/日服/美服跨区联机加速的专线评测。',
    content: `# 2026 跨区电竞游戏专线：晚高峰零丢包与超低 RTT 网络方案

> **游戏联机核心**：看重的不只是下载速度（Bandwidth），而是 **往返延迟 (RTT)**、**抖动 (Jitter)** 与 **丢包率 (Packet Loss)**。

---

## 一、为什么普通中转机场不能玩外服游戏？

公网中转线路在经过多层 NAT 转换后，会引入严重的排队抖动。一瞬间的 5% 丢包就会导致游戏中出现人物瞬移或开枪判定丢失。只有全程通过内网直通物理专线（IEPL/IPLC），且入口直连骨干网节点，才能维持稳定的 30ms 以内极低抖动。

---

## 二、电竞推荐首选

- **[光速云](/docs/brands/guangsu)**：香港节点实测仅 22ms，台湾 41ms，配合 Clash TUN 模式可直接加速全电脑游戏 UDP 流量。
- **[微风网络](/docs/brands/weifeng)**：纯 IEPL 专线，香港实测 25ms，单节点下载达 546Mbps。
`
  },
  {
    id: 'budget-friendly',
    title: '2026 极致高性价比与平价备用机场横向盘点 (5-8元档)',
    description: '深度横评 5.6 元档极限平价机场：大佬云、闪电鼠、云界线、榴莲云、环球梯，教你花最少钱买到靠谱专线。',
    content: `# 2026 极致高性价比与平价备用机场横向盘点 (5-8元档)

> **平价真相**：5.6 元/月的价格在 2026 年是真实存在的！它们通常通过集约化大宗采购 IEPL 专线容量并压缩闲置冗余来实现极低单价。

---

## 一、5.6 元平价五虎横评

| 品牌名称 | 起步月均价 | 基础月流量 | 核心协议 | 优惠折扣 | 评测入口 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **[大佬云](/docs/brands/dalaoyun)** | ¥5.6/月 | 60GB | VLESS | 季付以上 7 折 (\`dly888\`) | [查看测评](/docs/brands/dalaoyun) |
| **[闪电鼠](/docs/brands/shandianshu)** | ¥5.6/月 | 60GB | VLESS | 季付以上 7 折 (\`sd88\`) | [查看测评](/docs/brands/shandianshu) |
| **[云界线](/docs/brands/yunjiexian)** | ¥5.6/月 | 60GB | VLESS | 季付以上 7 折 (\`yjx888\`) | [查看测评](/docs/brands/yunjiexian) |
| **[榴莲云](/docs/brands/liulianyun)** | ¥5.6/月 | 60GB | IEPL | 季付以上 7 折 (\`ll88\`) | [查看测评](/docs/brands/liulianyun) |
| **[环球梯](/docs/brands/huanqiuti)** | ¥5.6/月 | 60GB | VLESS | 季付以上 7 折 (\`HQ66\`) | [查看测评](/docs/brands/huanqiuti) |

---

## 二、平价机场使用技巧
1. **备用策略**：作为主力机场临时维护时的第二备份。
2. **流量分配**：日常刷 X、阅读文档、浏览 GitHub 走平价机场；4K 视频与重度 AI 走主力专线。
`
  },
  {
    id: 'enterprise-dedicated',
    title: '企业跨境办公、不限设备并发与团队协同机场解决方案',
    description: '面向中小型出海企业、设计工作室与远程团队的多人并发共享专线指南。',
    content: `# 2026 企业跨境办公、不限设备并发与团队协同机场解决方案

> **团队痛点**：普通机场限制 2~3 台设备同时在线，一旦团队多人在公司和移动端同时登录，会被系统判定违规共享账号导致断流。

---

## 一、企业选型必备条件

1. **设备并发无上限 (Unlimited Devices)**：允许多 IP、多客户端同时建立 TCP 连接。
2. **多平台统一客户端**：Windows、macOS、iOS、Android 全覆盖，员工无需技术支持即可自主登录。
3. **高 SLA 运维响应**：具备真人技术团队与快速工单响应机制。

---

## 二、团队推荐品牌

- **[暮光加速](/docs/brands/muguang)**：主打跨平台多设备同时在线，提供 7×24 小时真人客服保障。
- **[星岛梦](/docs/brands/xingdaomeng)**：2020年老牌，全节点 1 倍率且明确支持不限设备使用。
- **[WgetCloud](/docs/brands/wgetcloud)**：高规格商用精品专线，多核心容灾，适合预算充足的企业采购。
`
  }
];

scenarioDocs.forEach((doc) => {
  const content = `---
title: ${doc.title}
description: ${doc.description}
---

${doc.content}
`;
  fs.writeFileSync(path.join(scenariosDir, `${doc.id}.mdx`), content, 'utf-8');
});

console.log('Successfully generated 7 scenario docs.');
