const fs = require('fs');
const path = require('path');

const clientsDir = path.join(__dirname, '../docs/clients');
if (!fs.existsSync(clientsDir)) fs.mkdirSync(clientsDir, { recursive: true });

const clientDocs = [
  {
    id: 'index',
    title: '2026 全平台机场代理客户端下载与配置大全',
    description: '涵盖 Windows、macOS、iOS、Android、Linux 与软路由的全平台代理软件下载汇总与内核比较。',
    content: `# 2026 全平台机场代理客户端下载与配置大全

机场代理客户端主要分为两大类别：
1. **第三方通用客户端**：如 Clash Verge Rev、v2rayN、Shadowrocket、FlClash、Hiddify，可灵活导入任何兼容的机场订阅链接，支持规则分流与自定义路由。
2. **机场自研专属客户端**：由特定机场服务商提供，免去复杂的订阅配置，下载登录账号即可一键使用。

---

## 全平台主流客户端推荐速查表

| 操作系统 | 首选推荐客户端 | 备选进阶客户端 | 核心特色 | 专有教程入口 |
| :--- | :--- | :--- | :--- | :--- |
| **🪟 Windows** | **Clash Verge Rev** | v2rayN / FlClash | Mihomo 内核、TUN 全局路由、规则智能分流 | [Windows 教程](/docs/clients/windows) |
| **🍎 macOS** | **Clash Verge Rev (Mac)** | Surge Mac / sing-box | 完美适配 Apple Silicon M 系列芯片、UI 优雅 | [macOS 教程](/docs/clients/macos) |
| **📱 iOS (iPhone/iPad)** | **Shadowrocket (小火箭)** | Stash / Quantumult X | 规则分流、节点测速、省电持久 | [iOS 教程](/docs/clients/ios) |
| **🤖 Android (安卓)** | **v2rayNG** | FlClash / Clash Meta | 广泛兼容、后台保活良好、多协议支持 | [Android 教程](/docs/clients/android) |
| **🐧 Linux** | **Clash Verge Rev** | v2rayA (Web UI) | 提供 DEB/RPM/AppImage，支持无桌面服务器 | [Linux 教程](/docs/clients/linux) |
| **📶 软路由 (OpenWrt)** | **OpenClash** | PassWall2 / Nikki | 全屋智能分流、透明代理、家庭设备无感加速 | [软路由教程](/docs/clients/router) |
`
  },
  {
    id: 'windows',
    title: 'Windows 电脑客户端推荐与配置教程 (Clash Verge Rev / v2rayN)',
    description: 'Windows 11/10 平台最佳客户端选择：Clash Verge Rev、v2rayN、FlClash 的下载与 TUN 模式配置。',
    content: `# Windows 电脑客户端推荐与配置教程

在 Windows 环境下，**Clash Verge Rev** 已成为绝对主流。

---

## 推荐客户端横向对比

| 客户端名称 | 内核支持 | 主要特点 | 适合人群 |
| :--- | :--- | :--- | :--- |
| **Clash Verge Rev** | Mihomo (Meta) | 界面现代、内置订阅管理、TUN 虚拟网卡模式、规则自动分流 | **强烈推荐所有新手与进阶用户** |
| **v2rayN** | Xray / sing-box | 深度支持多协议，节点列表管理功能极其强大 | 极客与多协议测试用户 |
| **FlClash** | Mihomo | 轻量、简洁、跨平台一致界面 | 极简主义用户 |
| **Hiddify** | 多协议自适应 | 多协议、自动优选节点 | 追求极简配置的新手 |

---

## Clash Verge Rev 快速上手三步法

1. **下载安装**：前往 GitHub 官方 Release 页面下载最新的 \`.exe\` 安装包完成安装。
2. **导入机场订阅**：
   - 在已购机场（如 **[光速云](/docs/brands/guangsu)**）后台复制 Clash 订阅链接。
   - 打开 Clash Verge Rev，进入「订阅 (Profiles)」界面，粘贴链接并点击「导入 (Import)」。
3. **开启系统代理**：在主界面选择心仪节点，勾选「系统代理 (System Proxy)」即可开始高速畅游。
`
  },
  {
    id: 'macos',
    title: 'macOS 苹果电脑客户端指南 (Clash Verge Rev / sing-box)',
    description: '针对 Apple Silicon (M1/M2/M3/M4) 与 Intel 架构优化的 macOS 客户端选择与安装注意。',
    content: `# macOS 苹果电脑客户端指南

macOS 客户端需重点注意 **Apple Silicon (M 系列芯片)** 与 **Intel 芯片** 的安装包架构差异。

---

## 推荐 macOS 客户端

- **Clash Verge Rev for Mac**：目前 Mac 上体验最出色的开源客户端，支持 ARM64 与 x64 双架构。
- **sing-box for macOS (SFM)**：官方 sing-box 原生客户端，资源占用极低。
- **Surge Mac**：业界天花板级网络分析与代理调试工具，功能强大（商业付费）。

---

## 注意事项：首次打开提示「文件已损坏」解决办法
macOS 强化了 Gatekeeper 安全检测，若遇到无法打开，可在终端中执行：
\`\`\`bash
sudo xattr -r -d com.apple.quarantine /Applications/Clash\\ Verge.app
\`\`\`
`
  },
  {
    id: 'ios',
    title: 'iOS (iPhone / iPad) 客户端选型与下载指南',
    description: '美区 App Store 付费应用选购建议：Shadowrocket (小火箭)、Stash、Quantumult X 与 Surge 5。',
    content: `# iOS (iPhone / iPad) 客户端选型与下载指南

由于苹果政策限制，大陆 App Store 无法上架代理客户端。用户需使用**非国区 Apple ID**（如美区、港区）登录 App Store 下载。

---

## iOS 客户端推荐

| 客户端名称 | App Store 售价 (美区) | 核心优势 | 推荐指数 |
| :--- | :--- | :--- | :--- |
| **Shadowrocket (小火箭)** | $2.99 | 性价比极高、更新极快、几乎所有机场都支持一键导入 | ⭐⭐⭐⭐⭐ |
| **Stash** | $3.99 | 完美兼容 Clash 规则配置，UI 极其贴合 iOS 原生风格 | ⭐⭐⭐⭐⭐ |
| **Quantumult X (圈 X)** | $7.99 | 强大的脚本编写与 HTTP 重写分流能力 | ⭐⭐⭐⭐ |
| **Surge 5** | 免费下载 (内购订阅) | 专业级网络调试与规则管理 | ⭐⭐⭐⭐ |
`
  },
  {
    id: 'android',
    title: 'Android 安卓客户端推荐与省电保活设置 (v2rayNG / FlClash)',
    description: 'Android 平台最全代理客户端汇总：v2rayNG、FlClash、Clash Meta 及防止系统后台杀进程指南。',
    content: `# Android 安卓客户端推荐与省电保活设置

安卓平台开源工具百花齐放，主流选择以 **v2rayNG** 和 **FlClash** 为主。

---

## 客户端对比

- **v2rayNG**：安卓端常青树，支持 VLESS、VMess、Trojan、Shadowsocks 等全协议，稳定可靠。
- **FlClash**：基于 Flutter 与 Mihomo 内核开发，界面极度美观流畅。
- **Clash Meta for Android (CMFA)**：全面支持 Meta 规则分流与多策略组切换。

> ⚠️ **安全警告**：请通过 GitHub 官方 Release 仓库下载 APK，切勿使用已被第三方篡改的非官方修改版。
`
  },
  {
    id: 'linux',
    title: 'Linux 客户端安装配置教程 (GUI图形端与透明网关)',
    description: '针对 Ubuntu、Debian、Arch Linux 的桌面端客户端及无头服务器代理方案。',
    content: `# Linux 客户端安装配置教程

Linux 场景分为 **桌面图形界面** 与 **无桌面服务器 (Headless)** 两种模式。

---

## 常用工具

1. **桌面环境 (Ubuntu / Fedora / Arch)**：推荐使用 **Clash Verge Rev (AppImage / DEB)** 或 **FlClash**。
2. **服务器 / NAS 环境**：推荐使用 **v2rayA**，提供直观的 Web 控制面板，便于在浏览器中远程管理节点与透明代理。
`
  },
  {
    id: 'router',
    title: 'OpenWrt 软路由与家庭网关透明代理配置指南',
    description: 'OpenClash、PassWall2、Nikki 的安装依赖、CPU 架构匹配与防 DNS 污染设置。',
    content: `# OpenWrt 软路由与家庭网关透明代理配置指南

在软路由上部署透明代理，可实现家中所有设备（手机、电脑、电视盒子、Switch、PS5）无感连通全球互联网。

---

## 主流软路由插件选择

- **OpenClash**：基于 Mihomo 内核，功能丰富，具备完善的策略组与 Dashboard 监控。
- **PassWall2**：以轻量稳定著称，分流规则简洁，适合低配路由器。
- **Nikki**：现代化新插件，要求 OpenWrt 24.10+ 版本，支持原生 nftables 防火墙。
`
  }
];

clientDocs.forEach((doc) => {
  const content = `---
title: ${doc.title}
description: ${doc.description}
---

${doc.content}
`;
  fs.writeFileSync(path.join(clientsDir, `${doc.id}.mdx`), content, 'utf-8');
});

console.log('Successfully generated 7 client docs.');
