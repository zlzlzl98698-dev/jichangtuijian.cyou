const fs = require('fs');
const path = require('path');

const obsDir = path.join(__dirname, '../docs/observatory');
if (!fs.existsSync(obsDir)) fs.mkdirSync(obsDir, { recursive: true });

const obsDocs = [
  {
    id: 'index',
    title: '机场 cyou 网络可观测性实验室：标准与评测准则',
    description: '揭秘机场测速、延迟抖动、TCP 握手与大模型保活的技术观测体系。',
    content: `# 机场 cyou 网络可观测性实验室：标准与评测准则

欢迎来到 **机场 cyou (jichangtuijian.cyou)** 网络可观测性实验室。

---

## 我们的评测三大铁律

1. **真实可测，拒绝虚标**：绝不编造未经验证的极速截图与 100% 解锁神话。所有数据分为 \`Measured Data (实测采集)\` 与 \`Vendor Spec (官方标称)\` 双重清晰标识。
2. **严打伪专线与中转冒充**：深入解析 BGP 入口与海外落地拓扑，区分真正的内网物理专线（IEPL/IPLC）与公网隧道中转（Tunnel Relay）。
3. **完全合规与透明披露**：所有注册通道均明确标注 \`rel="nofollow sponsored noopener"\`，透明披露推广分成机制，维护最客观的技术公正性。
`
  },
  {
    id: 'iepl-vs-iplc',
    title: 'IEPL 与 IPLC 专线硬核技术深度解析：本质区别与选型策略',
    description: '物理专线、以太网私网专线与公网隧道的底层网络拓扑全景解密。',
    content: `# IEPL 与 IPLC 专线硬核技术深度解析

> **术语速览**：
> - **IPLC (International Private Leased Circuit)**：国际私有租用线路（点对点物理裸纤/TDM）。
> - **IEPL (International Ethernet Private Leased line)**：国际以太网私有专线（基于二层以太网跨国互联）。

---

## 一、为什么物理专线不会被墙？

普通的公网直连或中转，数据包必须经过公网骨干路由与国家级防火墙（GFW）。在高敏感时期，GFW 通过深度数据包检测（DPI）对未知加密流量进行重置或限速 QoS。

而 **IPLC / IEPL** 属于企业向电信运营商（如中国电信 CN2 / 中国移动 CMI）直接租赁的**内网跨境物理通道**。流量在境内入口被打包后，直接在专用物理信道内跨境传输，完全绕过公网出口网关，因此具有 **0 丢包、0 阻断、延迟恒定** 的极致物理特性。

---

## 二、代表性专线机场推荐
- **IEPL 代表**：**[光速云](/docs/brands/guangsu)**、**[微风网络](/docs/brands/weifeng)**
- **IPLC 代表**：**[唯兔云](/docs/brands/weitu)**、**[闪跃](/docs/brands/shanyue)**、**[U1S1](/docs/brands/u1s1)**
`
  },
  {
    id: 'protocols',
    title: '2026 主流代理协议全景横评：VLESS vs Trojan vs Hysteria 2',
    description: '从加密握手开销、TCP 拥塞控制、UDP 弱网加速到 Reality 偷证书黑科技全方位对比。',
    content: `# 2026 主流代理协议全景横评：VLESS vs Trojan vs Hysteria 2

随着网络审查与探测手段的进化，早期的 Shadowsocks 和 VMess 逐渐被现代协议替代。

---

## 协议特性横向对比

| 协议名称 | 底层传输 | 伪装特性 | 弱网性能 | 推荐适用场景 |
| :--- | :--- | :--- | :--- | :--- |
| **VLESS (Reality)** | TCP + TLS 伪装 | 借用真实合规境外大厂证书，抗主动探测能力极高 | 优秀 | 敏感时期最稳健选择 |
| **Trojan** | TCP + HTTPS | 将流量完全伪装成标准 Web 网页访问 | 良好 | 老牌通用标准，全平台兼容 |
| **Hysteria 2 (Hy2)** | UDP (QUIC) | 暴力多倍重发机制，针对丢包环境专项优化 | **极强 (弱网神器)** | 移动4G/5G、校园网与高丢包环境 |
| **Shadowsocks** | TCP / UDP | 纯对称加密，开销极低 | 依靠专线通道保护 | 专线机场标配内网传输协议 |
`
  },
  {
    id: 'speedtest-guide',
    title: '晚高峰测速方法论与机场避坑防套路指南',
    description: '如何科学评估机场节点真实表现，识别「假测速图」、「流量倍率刺客」与「虚报带宽」。',
    content: `# 晚高峰测速方法论与机场避坑防套路指南

---

## 测速四大常见误区与避坑策略

1. **警惕「凌晨测速图」**：很多商家只在凌晨 3 点展示千兆跑满截图。衡量一条专线好坏的唯一黄金标准是 **工作日 20:30 - 22:30（晚高峰黄金期）** 的丢包与延迟表现。
2. **警惕「倍率刺客」**：部分机场宣传月费极低，但高质量节点标有 \`3x\` 甚至 \`10x\` 倍率，实际可用流量缩水数倍。本站主推的 **[光速云](/docs/brands/guangsu)** 与 **[唯兔云](/docs/brands/weitu)** 均为全节点 1 倍率。
3. **警惕「无理由大额三年付」**：小作坊机场往往以三年超低价吸引用户入坑随后跑路。**务必优先选择运营超过 2~3 年以上的老牌知名服务商**。
`
  },
  {
    id: 'disclaimer',
    title: '免责声明、合规推广披露与隐私保护承诺',
    description: '机场 cyou 平台法律声明、推广返利透明度标准与用户网络安全规范。',
    content: `# 免责声明、合规推广披露与隐私保护承诺

---

## 1. 技术评测与中立声明
本网站（**jichangtuijian.cyou**）由独立网络技术极客团队维护，专注于网络性能观测、分布式路由延迟采集与软件配置技术交流。本站所有测评数据均以真实测试和客观分析为准绳，绝不承诺特定商家的绝对可用率。

## 2. 联盟推广披露 (Affiliate Disclosure)
本站部分外链包含带有专属跟踪代码的推广注册链接（Affiliate Links）。当用户通过这些链接完成订阅时，服务商可能会向本站支付微薄的服务器与测试网络维护佣金。**这绝对不会增加用户的订阅费用，且用户可享受本站专属优惠码折扣。**

所有外部推广链接均严格注入：
\`\`\`html
target="_blank" rel="nofollow sponsored noopener"
\`\`\`
符合 Google 与 Bing 搜索引擎内容质量指南。
`
  }
];

obsDocs.forEach((doc) => {
  const content = `---
title: ${doc.title}
description: ${doc.description}
---

${doc.content}
`;
  fs.writeFileSync(path.join(obsDir, `${doc.id}.mdx`), content, 'utf-8');
});

console.log('Successfully generated 5 observatory docs.');
