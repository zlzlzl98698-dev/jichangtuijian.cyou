const fs = require('fs');
const path = require('path');

const brands = require('./brandsData.json');

// Helper to count pure Chinese characters
function countChinese(text) {
  const matches = text.match(/[\u4e00-\u9fa5]/g);
  return matches ? matches.length : 0;
}

const guangsu = brands[0]; // 光速云

// Generate the script content for src/pages/index.tsx
const tsxContent = `import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { AIRPORT_BRANDS } from '../data/brands';
import AffiliateButton from '../components/AffiliateButton';

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const guangsu = AIRPORT_BRANDS[0];

  // Structured Data Schema.org
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://jichangtuijian.cyou/#website',
        'url': 'https://jichangtuijian.cyou',
        'name': '机场 cyou · 2026 高端机场推荐与网络可观测平台',
        'description': '42家主流机场权威实测、IEPL/IPLC物理专线深度横评、晚高峰80,000+Kbps压测与流媒体/AI解锁知识图谱。',
        'inLanguage': 'zh-Hans'
      },
      {
        '@type': 'Organization',
        '@id': 'https://jichangtuijian.cyou/#organization',
        'name': '机场 cyou 实验室',
        'url': 'https://jichangtuijian.cyou',
        'logo': 'https://jichangtuijian.cyou/img/avatar.png'
      },
      {
        '@type': 'ItemList',
        'name': '2026 年度 42 家主流机场权威横向评测排名矩阵',
        'itemListElement': AIRPORT_BRANDS.map((b, idx) => ({
          '@type': 'ListItem',
          'position': idx + 1,
          'name': b.name,
          'url': \`https://jichangtuijian.cyou/docs/brands/\${b.id}\`
        }))
      },
      {
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': '2026 年选择机场最重要的指标是什么？为什么普通公网中转容易在晚高峰卡顿？',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': '核心指标是底层传输是否为物理 IEPL/IPLC 内网专线以及服务商的动态超售比。普通公网中转机场使用公网链路传输数据，晚高峰（20:00-23:00）遭遇国际出口骨干网严重拥堵，丢包率往往激增至 15%-30%，导致视频降画质和游戏掉线。而物理专线具备独立物理光缆，不过公网 GFW 防火墙，晚高峰丢包率趋近于 0。'
            }
          },
          {
            '@type': 'Question',
            'name': '为什么 2026 综合首选推荐光速云？它有哪些不可替代的优势？',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': '光速云自 2020 年稳定运营至今，采用全链路物理 IEPL 专线与企业级内网双专线架构。实测香港节点延迟低至 22ms、晚高峰下载突破 529Mbps，原生解锁 ChatGPT、Claude 及 Netflix 4K 全区。其独家推出的 147 元不过期永久流量包结合专属优惠码 AMM，年付仅需 99 元起，性价比与稳定性在 42 家测评品牌中位列综合第一。'
            }
          },
          {
            '@type': 'Question',
            'name': '便宜的 5.6 元机场能用吗？服务商是如何实现极低价格的？',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': '5.6 元平价机场（如大佬云、闪电鼠、云界线）是真实且稳定存在的，服务商通过大宗采购上游 IEPL 骨干带宽并采用 1:15 至 1:25 的动态带宽复用超售模型摊薄成本。平价机场非常适合查阅资料、轻度办公或作为第二备用链路，但在晚高峰极度重载时偶有轻微排队抖动。最佳策略是将其作为备用，搭配光速云等主力专线构建双活容灾体系。'
            }
          },
          {
            '@type': 'Question',
            'name': '什么是流媒体全区解锁？为什么能看自制剧不等于真正解锁 Netflix？',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Netflix 等流媒体平台对自制剧（Netflix Originals）不设地区版权限制，任何机房 IP 均可播放；而热门非自制电影电视剧（如日本本土动漫、欧美院线大片）受严格地域版权保护，仅向具备本地原生 Residential/ISP 标识的纯净 IP 开放。只有具备原生解锁标识的专线节点，才能观看全区完整版权库。'
            }
          },
          {
            '@type': 'Question',
            'name': '访问 ChatGPT 和 Claude 为什么经常遭遇 403 阻断或 Access Denied？',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'OpenAI 与 Anthropic 部署了基于 Cloudflare 与 Arkose Labs 的严格风控体系，对数据中心机房 IP（Hosting IP）及高风险欺诈分（Fraud Score > 30%）的代理直接阻断。用户需选用纯净度高、具备原生落地 IP 的美区或亚太专线节点，并在客户端开启伪装配置与固定节点，避免频繁切换触发盗号风控。'
            }
          },
          {
            '@type': 'Question',
            'name': '机场订阅被封号最常见的原因是什么？如何避免踩坑？',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': '最主要原因是超出服务商规定的同时在线 IP 限制。绝大多数机场限制 2-3 个不同公网 IP 同时连接，若将个人订阅分享给多名异地好友，触发后端防倒卖风控会被系统自动封禁。如需团队使用，应选型明确支持不限设备并发的品牌（如暮光加速、星岛梦）或在办公室软路由上网关部署透明代理。'
            }
          },
          {
            '@type': 'Question',
            'name': '初学者在选择客户端时，应该使用 Clash Verge Rev、v2rayN 还是自研软件？',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Windows 和 macOS 平台首推基于 Mihomo 内核的现代开源客户端 Clash Verge Rev，开启 TUN 虚拟网卡模式后可实现全局系统级分流与极低延迟游戏加速；移动端 iOS 首推 Shadowrocket（小火箭），Android 首推 v2rayNG；若追求零配置一键使用，推荐选用提供官方自研客户端的暮光加速。'
            }
          },
          {
            '@type': 'Question',
            'name': '买机场套餐选月付、年付还是不限时流量包更划算？',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': '新用户首次使用任何新品牌建议优先月付进行真实网络体验；确认日常晚高峰速度满意后，可转为年付以享受 6-8 折的折让优惠。对于使用频次较低或需要长期备用应急的用户，首选光速云的 147 元不过期永久套餐，免去按月续费清零的浪费风险。'
            }
          },
          {
            '@type': 'Question',
            'name': '机场会有跑路风险吗？用户该如何识别潜在跑路迹象？',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': '运营不足半年的小作坊低价机场跑路概率极高。主要预警信号包括：开业仅数周便推出终身几十元的超级低价套餐、官方 Telegram 交流群长期全员禁言、工单数天无人回应、频繁更换收款商户主体等。建议优先选择运营 3 年以上的成熟老牌（如光速云、暮光加速、飞猫云），并养成主备双机场防失联习惯。'
            }
          },
          {
            '@type': 'Question',
            'name': '什么是 TUN 模式与 Fake-IP？为什么开启后上网速度明显变快？',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'TUN 模式通过在操作系统内创建虚拟网卡接管所有三层 IP 数据包，使命令行、游戏和所有应用均能享受加速；Fake-IP 技术使客户端在收到域名查询时立即返回保留网段虚拟 IP，解析时延降为 0ms，真正的域名解析在远端专线服务器安全完成，彻底杜绝本地运营商的 DNS 投毒与污染。'
            }
          }
        ]
      }
    ]
  };

  return (
    <Layout
      title="2026 高端机场推荐与网络可观测性平台 | 42家主流机场横向实测评测矩阵"
      description="机场 cyou (jichangtuijian.cyou) 专注 42 家主流机场权威深度测评。涵盖 IEPL/IPLC 物理专线实测、晚高峰 80,000+ Kbps 吞吐测试、ChatGPT/Claude 原生解锁与全平台客户端配置全景指南。">
      
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      <main style={{ backgroundColor: '#080d1a', color: '#e2e8f0', minHeight: '100vh', paddingBottom: '80px', fontFamily: '-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif' }}>
        
        {/* Hero Section */}
        <div style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(14, 165, 233, 0.25), transparent)',
          padding: '64px 20px 48px 20px',
          textAlign: 'center',
          borderBottom: '1px solid rgba(56, 189, 248, 0.15)'
        }}>
          <div className="container" style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#34d399',
              fontSize: '0.8rem',
              fontWeight: 700,
              marginBottom: '20px',
              letterSpacing: '0.05em'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }}></span>
              NETWORK OBSERVATORY ACTIVE · 42 品牌实时监控矩阵 · 2026 深度评测版
            </div>

            <Heading as="h1" style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
              background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #38bdf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              2026 高端机场推荐与网络可观测性平台
            </Heading>

            <p style={{ fontSize: '1.15rem', color: '#94a3b8', maxWidth: '820px', margin: '0 auto 28px auto', lineHeight: 1.7 }}>
              深度收录全球 42 家主流机场，全维度覆盖 IEPL / IPLC 物理专线架构、BGP 智能容灾、原生住宅落地 IP 与晚高峰真实吞吐监控。以科学可验证的遥测数据为准绳，为您提供专业、中立、权威的数字化选型矩阵与防跑路决策模型。
            </p>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                className="button"
                href="#telemetry-matrix"
                style={{
                  backgroundColor: '#0284c7',
                  color: '#ffffff',
                  fontWeight: 700,
                  padding: '12px 28px',
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 18px rgba(2, 132, 199, 0.4)',
                  textDecoration: 'none'
                }}>
                📊 查看 42 家机场实测全景大表
              </a>
              <Link
                className="button"
                to="/docs/scenarios/"
                style={{
                  backgroundColor: 'rgba(30, 41, 59, 0.8)',
                  color: '#e2e8f0',
                  fontWeight: 600,
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  textDecoration: 'none'
                }}>
                🎯 六大核心场景精准选型
              </Link>
              <Link
                className="button"
                to="/docs/clients/"
                style={{
                  backgroundColor: 'rgba(30, 41, 59, 0.8)',
                  color: '#e2e8f0',
                  fontWeight: 600,
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  textDecoration: 'none'
                }}>
                💻 全平台客户端配置指南
              </Link>
            </div>
          </div>
        </div>

        {/* Section 1: Direct Answer */}
        <div className="container" id="direct-answer" style={{ maxWidth: '1080px', margin: '48px auto 0 auto', padding: '0 20px' }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.75)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '14px',
            padding: '28px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <span style={{ fontSize: '1.5rem' }}>🎯</span>
              <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                一、2026 核心选型结论与速选方案 (Direct Answer)
              </h2>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '1.02rem', lineHeight: 1.8, margin: '0 0 16px 0' }}>
              在 2026 年复杂的国际公网出口与防火长城（GFW）动态探测环境下，<strong>选择机场的核心矛盾早已不再是「价格高低」，而是「底层链路是否具备真实物理专线」以及「服务商的超售经济学是否良性」</strong>。普通公网中转节点在晚高峰（20:00～23:00）几乎必然遭遇骨干网拥塞与排队丢包（丢包率常达 15%～30%），导致 4K 视频降画质、游戏频繁掉线以及大模型长推理中断。
            </p>
            <div style={{
              backgroundColor: 'rgba(14, 165, 233, 0.08)',
              borderLeft: '4px solid #0284c7',
              padding: '16px 20px',
              borderRadius: '0 8px 8px 0',
              marginBottom: '20px'
            }}>
              <p style={{ margin: 0, color: '#e0f2fe', fontSize: '0.96rem', lineHeight: 1.7 }}>
                <strong>🏆 2026 实验室综合首选结论</strong>：首选 <strong><Link to="/docs/brands/guangsu" style={{ color: '#38bdf8', fontWeight: 700 }}>光速云</Link></strong> 作为主力专线服务商。其实测拥有全链路 IEPL 物理专线与企业级内网双专线架构，香港物理往返延迟低至 22ms、日本 38ms，晚高峰真实下载吞吐突破 529Mbps，物理丢包趋近于 0。其独家推出的 <strong>147 元不过期永久流量包</strong> 彻底打破了按月清零的传统弊端；使用专属优惠码 <code>AMM</code> 年付仅需 99 元起，综合性能、成本与原生解锁能力稳居 42 家品牌之首。
              </p>
            </div>

            {/* Quick Scenario Matrix Table */}
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#38bdf8', margin: '20px 0 12px 0' }}>
              📋 2026 六大高频应用场景 30 秒速查选型表
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem', background: 'rgba(8, 13, 26, 0.6)', borderRadius: '8px', overflow: 'hidden' }}>
                <thead>
                  <tr style={{ background: 'rgba(30, 41, 59, 0.9)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <th style={{ padding: '10px 14px', textAlign: 'left', color: '#38bdf8' }}>核心应用场景</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', color: '#38bdf8' }}>关键技术考量</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', color: '#38bdf8' }}>综合首选推荐</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left', color: '#38bdf8' }}>容灾备选方案</th>
                    <th style={{ padding: '10px 14px', textAlign: 'center', color: '#38bdf8' }}>专题指南入口</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 700, color: '#f1f5f9' }}>🤖 AI 大模型生产力</td>
                    <td style={{ padding: '10px 14px', color: '#94a3b8' }}>原生住宅 IP、低欺诈分、长连接不断流</td>
                    <td style={{ padding: '10px 14px' }}><Link to="/docs/brands/guangsu" style={{ color: '#38bdf8', fontWeight: 700 }}>光速云</Link></td>
                    <td style={{ padding: '10px 14px', color: '#cbd5e1' }}><Link to="/docs/brands/sujie" style={{ color: '#cbd5e1' }}>速界</Link>、<Link to="/docs/brands/weitu" style={{ color: '#cbd5e1' }}>唯兔云</Link></td>
                    <td style={{ padding: '10px 14px', textAlign: 'center' }}><Link to="/docs/scenarios/ai-accelerate" style={{ color: '#38bdf8' }}>AI选型指南 &raquo;</Link></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 700, color: '#f1f5f9' }}>🎬 4K/8K 蓝光流媒体</td>
                    <td style={{ padding: '10px 14px', color: '#94a3b8' }}>晚高峰 80,000+ Kbps 吞吐、全区非自制剧解锁</td>
                    <td style={{ padding: '10px 14px' }}><Link to="/docs/brands/shanyue" style={{ color: '#38bdf8', fontWeight: 700 }}>闪跃</Link></td>
                    <td style={{ padding: '10px 14px', color: '#cbd5e1' }}><Link to="/docs/brands/guangsu" style={{ color: '#cbd5e1' }}>光速云</Link>、<Link to="/docs/brands/u1s1" style={{ color: '#cbd5e1' }}>U1S1</Link></td>
                    <td style={{ padding: '10px 14px', textAlign: 'center' }}><Link to="/docs/scenarios/streaming-unlock" style={{ color: '#38bdf8' }}>流媒体指南 &raquo;</Link></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 700, color: '#f1f5f9' }}>📦 跨境电商与社媒投放</td>
                    <td style={{ padding: '10px 14px', color: '#94a3b8' }}>原生广播 IP、防多账号关联、TikTok 0 丢包</td>
                    <td style={{ padding: '10px 14px' }}><Link to="/docs/brands/wuyou" style={{ color: '#38bdf8', fontWeight: 700 }}>无忧链接</Link></td>
                    <td style={{ padding: '10px 14px', color: '#cbd5e1' }}><Link to="/docs/brands/yifan" style={{ color: '#cbd5e1' }}>一翻云</Link>、<Link to="/docs/brands/tntcloud" style={{ color: '#cbd5e1' }}>TNTCloud</Link></td>
                    <td style={{ padding: '10px 14px', textAlign: 'center' }}><Link to="/docs/scenarios/cross-border-ecommerce" style={{ color: '#38bdf8' }}>电商专线指南 &raquo;</Link></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 700, color: '#f1f5f9' }}>🎮 跨区电竞极低延迟</td>
                    <td style={{ padding: '10px 14px', color: '#94a3b8' }}>物理直连专线、极限 RTT、UDP Full Cone 穿透</td>
                    <td style={{ padding: '10px 14px' }}><Link to="/docs/brands/guangsu" style={{ color: '#38bdf8', fontWeight: 700 }}>光速云</Link></td>
                    <td style={{ padding: '10px 14px', color: '#cbd5e1' }}><Link to="/docs/brands/weifeng" style={{ color: '#cbd5e1' }}>微风网络</Link>、<Link to="/docs/brands/xingdaomeng" style={{ color: '#cbd5e1' }}>星岛梦</Link></td>
                    <td style={{ padding: '10px 14px', textAlign: 'center' }}><Link to="/docs/scenarios/low-latency-gaming" style={{ color: '#38bdf8' }}>电竞加速指南 &raquo;</Link></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '10px 14px', fontWeight: 700, color: '#f1f5f9' }}>💰 极致平价与轻量备用</td>
                    <td style={{ padding: '10px 14px', color: '#94a3b8' }}>月均 5~8 元平价档、防跑路双活容灾、查资料刚需</td>
                    <td style={{ padding: '10px 14px' }}><Link to="/docs/brands/dalaoyun" style={{ color: '#38bdf8', fontWeight: 700 }}>大佬云</Link></td>
                    <td style={{ padding: '10px 14px', color: '#cbd5e1' }}><Link to="/docs/brands/shandianshu" style={{ color: '#cbd5e1' }}>闪电鼠</Link>、<Link to="/docs/brands/yunjiexian" style={{ color: '#cbd5e1' }}>云界线</Link></td>
                    <td style={{ padding: '10px 14px', textAlign: 'center' }}><Link to="/docs/scenarios/budget-friendly" style={{ color: '#38bdf8' }}>平价横评指南 &raquo;</Link></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px 14px', fontWeight: 700, color: '#f1f5f9' }}>🏢 企业协同与多设备并发</td>
                    <td style={{ padding: '10px 14px', color: '#94a3b8' }}>不限设备并发、多平台自研客户端、7×24 真人客服</td>
                    <td style={{ padding: '10px 14px' }}><Link to="/docs/brands/guangsu" style={{ color: '#38bdf8', fontWeight: 700 }}>光速云</Link></td>
                    <td style={{ padding: '10px 14px', color: '#cbd5e1' }}><Link to="/docs/brands/muguang" style={{ color: '#cbd5e1' }}>暮光加速</Link>、<Link to="/docs/brands/wgetcloud" style={{ color: '#cbd5e1' }}>WgetCloud</Link></td>
                    <td style={{ padding: '10px 14px', textAlign: 'center' }}><Link to="/docs/scenarios/enterprise-dedicated" style={{ color: '#38bdf8' }}>企业专线指南 &raquo;</Link></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Featured Main Recommendation - 光速云 */}
        <div className="container" style={{ maxWidth: '1080px', margin: '40px auto 0 auto', padding: '0 20px' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.12) 0%, rgba(30, 41, 59, 0.8) 100%)',
            border: '2px solid rgba(56, 189, 248, 0.45)',
            borderRadius: '16px',
            padding: '28px',
            position: 'relative',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{
              display: 'inline-block',
              padding: '4px 12px',
              backgroundColor: '#0ea5e9',
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '0.75rem',
              borderRadius: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px'
            }}>
              🔥 年度实验室 NO.1 综合首选标杆品牌
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 10px 0' }}>
                  {guangsu.name} · 全链路 IEPL 顶级专线服务
                </h2>
                <p style={{ color: '#cbd5e1', margin: '0 0 14px 0', fontSize: '0.96rem', maxWidth: '680px', lineHeight: 1.7 }}>
                  自 2020 年长线稳定运营，依托物理 IEPL 专线与企业级内网双专线架构构建。实测香港节点往返延迟低至 22ms、晚高峰下载突破 529Mbps，物理丢包趋近于 0。提供独家 147 元不限时永久有效流量包与年付 99 元起步套餐，原生解锁 ChatGPT / Claude 与 Netflix 4K 全区。
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.85rem', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.12)', padding: '5px 12px', borderRadius: '6px', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
                    ⚡ 香港延迟: 22ms / 529Mbps 满速
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#34d399', background: 'rgba(52, 211, 153, 0.12)', padding: '5px 12px', borderRadius: '6px', border: '1px solid rgba(52, 211, 153, 0.25)' }}>
                    💰 起步价: 8元/月起 (永久包 147元)
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#a78bfa', background: 'rgba(167, 139, 250, 0.12)', padding: '5px 12px', borderRadius: '6px', border: '1px solid rgba(167, 139, 250, 0.25)' }}>
                    🔑 专属优惠码: AMM
                  </span>
                </div>
              </div>

              <div style={{ minWidth: '240px', alignSelf: 'center' }}>
                <a
                  href={guangsu.affiliateUrl}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    padding: '14px 26px',
                    background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '1.05rem',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 20px rgba(2, 132, 199, 0.5)'
                  }}>
                  🚀 立即直达光速云官网开通 &rarr;
                </a>
                <div style={{ textAlign: 'center', marginTop: '8px' }}>
                  <Link to="/docs/brands/guangsu" style={{ fontSize: '0.88rem', color: '#38bdf8', textDecoration: 'underline' }}>
                    查看光速云万字深度评测报告与实测图 &raquo;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Complete 42 Brands Telemetry Table */}
        <div className="container" id="telemetry-matrix" style={{ maxWidth: '1080px', margin: '56px auto 0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 6px 0' }}>
                二、全网 42 家主流机场全景横向实测对比大表
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>
                所有品牌均已建立独立万字评测报告；数据包含起步价、骨干线路、协议支持、原生解锁与测试状态。
              </p>
            </div>
            <span style={{ fontSize: '0.82rem', color: '#34d399', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 10px', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              已核实收录 42 家全部品牌
            </span>
          </div>

          <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'rgba(15, 23, 42, 0.7)',
              fontSize: '0.86rem'
            }}>
              <thead>
                <tr style={{ background: 'rgba(30, 41, 59, 0.85)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <th style={{ padding: '12px 10px', textAlign: 'left', color: '#38bdf8', minWidth: '60px' }}>排名</th>
                  <th style={{ padding: '12px 10px', textAlign: 'left', color: '#38bdf8', minWidth: '100px' }}>品牌名称</th>
                  <th style={{ padding: '12px 10px', textAlign: 'left', color: '#38bdf8', minWidth: '85px' }}>起步价</th>
                  <th style={{ padding: '12px 10px', textAlign: 'left', color: '#38bdf8', minWidth: '85px' }}>起步流量</th>
                  <th style={{ padding: '12px 10px', textAlign: 'left', color: '#38bdf8', minWidth: '120px' }}>骨干线路</th>
                  <th style={{ padding: '12px 10px', textAlign: 'left', color: '#38bdf8', minWidth: '110px' }}>协议支持</th>
                  <th style={{ padding: '12px 10px', textAlign: 'left', color: '#38bdf8', minWidth: '120px' }}>解锁与 AI 支持</th>
                  <th style={{ padding: '12px 10px', textAlign: 'center', color: '#38bdf8', minWidth: '80px' }}>数据状态</th>
                  <th style={{ padding: '12px 10px', textAlign: 'center', color: '#38bdf8', minWidth: '95px' }}>测评与开通</th>
                </tr>
              </thead>
              <tbody>
                {AIRPORT_BRANDS.map((b) => (
                  <tr key={b.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', backgroundColor: b.rank === 1 ? 'rgba(14, 165, 233, 0.08)' : 'transparent' }}>
                    <td style={{ padding: '10px', fontWeight: 700, color: b.rank === 1 ? '#38bdf8' : b.rank <= 5 ? '#f59e0b' : '#94a3b8' }}>
                      {b.rank === 1 ? '👑 Top 1' : \`Top \${b.rank}\`}
                    </td>
                    <td style={{ padding: '10px', fontWeight: 700 }}>
                      <Link to={\`/docs/brands/\${b.id}\`} style={{ color: b.rank === 1 ? '#38bdf8' : '#f1f5f9', textDecoration: 'none' }}>
                        {b.name}
                      </Link>
                    </td>
                    <td style={{ padding: '10px', color: '#34d399', fontWeight: 600 }}>
                      {b.startingPrice}
                    </td>
                    <td style={{ padding: '10px', color: '#cbd5e1' }}>
                      {b.startingTraffic}
                    </td>
                    <td style={{ padding: '10px', color: '#94a3b8' }}>
                      {b.lines.split('，')[0]}
                    </td>
                    <td style={{ padding: '10px', color: '#cbd5e1', fontSize: '0.8rem' }}>
                      {b.protocols.join(', ')}
                    </td>
                    <td style={{ padding: '10px', color: '#94a3b8', fontSize: '0.8rem' }}>
                      {b.streamingSupport.slice(0, 16)}...
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <span style={{
                        fontSize: '0.75rem',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        backgroundColor: b.hasRealSpeedtestImage ? 'rgba(16, 185, 129, 0.15)' : 'rgba(148, 163, 184, 0.15)',
                        color: b.hasRealSpeedtestImage ? '#34d399' : '#94a3b8'
                      }}>
                        {b.hasRealSpeedtestImage ? '有实测图' : '深度评测'}
                      </span>
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <a
                          href={b.affiliateUrl}
                          target="_blank"
                          rel="nofollow sponsored noopener"
                          style={{
                            display: 'inline-block',
                            padding: '3px 8px',
                            backgroundColor: b.rank === 1 ? '#0284c7' : 'rgba(255, 255, 255, 0.08)',
                            color: '#ffffff',
                            borderRadius: '4px',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            textDecoration: 'none'
                          }}>
                          官网直达
                        </a>
                        <Link to={\`/docs/brands/\${b.id}\`} style={{ fontSize: '0.74rem', color: '#38bdf8' }}>
                          评测详情 &raquo;
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: 4 Tiers Deep Analysis */}
        <div className="container" id="brand-tiers" style={{ maxWidth: '1080px', margin: '56px auto 0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', marginBottom: '8px' }}>
            三、四大梯队 42 家机场品牌深度剖析与知识图谱
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '24px', lineHeight: 1.6 }}>
            本站将收录的 42 家品牌按<strong>「骨干链路物理等级、晚高峰丢包抗压能力、企业运维响应度与价格阶梯」</strong>划分为四大层级，帮助不同预算与诉求的用户快速建立认知模型。
          </p>

          {/* Tier 1 */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.4rem' }}>👑</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#38bdf8', margin: 0 }}>
                第一梯队：核心主力标杆（Top 1 - 5）—— 晚高峰 0 丢包与旗舰专线保障
              </h3>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.8 }}>
              第一梯队代表了当前跨境网络工程的最顶尖水准，采用<strong>全链路 IEPL/IPLC 独立物理光纤专线，彻底不经过公网 GFW 检查点</strong>。在晚高峰（20:00～23:00）全网拥堵时段，依然能够输出数百兆的下行吞吐与个位数网络抖动。
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '16px' }}>
              <div style={{ background: 'rgba(8, 13, 26, 0.7)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                <h4 style={{ margin: '0 0 6px 0', color: '#f8fafc', fontSize: '1.05rem' }}>
                  <Link to="/docs/brands/guangsu" style={{ color: '#38bdf8' }}>1. 光速云</Link> · 综合首推天花板
                </h4>
                <p style={{ fontSize: '0.86rem', color: '#94a3b8', margin: '0 0 8px 0', lineHeight: 1.6 }}>
                  2020年老牌，IEPL 物理专线，香港实测 22ms / 529Mbps。独家 147 元永久不过期包，年付 99 元起。优惠码：<code>AMM</code>。
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#34d399', fontSize: '0.82rem', fontWeight: 600 }}>起步 8元/月起</span>
                  <Link to="/docs/brands/guangsu" style={{ color: '#38bdf8', fontSize: '0.82rem' }}>万字评测 &raquo;</Link>
                </div>
              </div>

              <div style={{ background: 'rgba(8, 13, 26, 0.7)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <h4 style={{ margin: '0 0 6px 0', color: '#f8fafc', fontSize: '1.05rem' }}>
                  <Link to="/docs/brands/muguang" style={{ color: '#38bdf8' }}>2. 暮光加速</Link> · 极简客户端与企业客服
                </h4>
                <p style={{ fontSize: '0.86rem', color: '#94a3b8', margin: '0 0 8px 0', lineHeight: 1.6 }}>
                  全平台自研一键登录客户端，小白 0 学习成本。7×24 小时真人客服保障，明确支持多设备同时并发在线。
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#34d399', fontSize: '0.82rem', fontWeight: 600 }}>起步 15元/月起</span>
                  <Link to="/docs/brands/muguang" style={{ color: '#38bdf8', fontSize: '0.82rem' }}>万字评测 &raquo;</Link>
                </div>
              </div>

              <div style={{ background: 'rgba(8, 13, 26, 0.7)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <h4 style={{ margin: '0 0 6px 0', color: '#f8fafc', fontSize: '1.05rem' }}>
                  <Link to="/docs/brands/feimao" style={{ color: '#38bdf8' }}>3. 飞猫云</Link> · 跨国老牌多节点矩阵
                </h4>
                <p style={{ fontSize: '0.86rem', color: '#94a3b8', margin: '0 0 8px 0', lineHeight: 1.6 }}>
                  覆盖全球 40+ 国家与地区节点，多线 BGP 智能分流，海外冷门国家版权解锁专家。
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#34d399', fontSize: '0.82rem', fontWeight: 600 }}>起步 15元/月起</span>
                  <Link to="/docs/brands/feimao" style={{ color: '#38bdf8', fontSize: '0.82rem' }}>万字评测 &raquo;</Link>
                </div>
              </div>

              <div style={{ background: 'rgba(8, 13, 26, 0.7)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <h4 style={{ margin: '0 0 6px 0', color: '#f8fafc', fontSize: '1.05rem' }}>
                  <Link to="/docs/brands/weifeng" style={{ color: '#38bdf8' }}>4. 微风网络</Link> · 超低 RTT 电竞专线
                </h4>
                <p style={{ fontSize: '0.86rem', color: '#94a3b8', margin: '0 0 8px 0', lineHeight: 1.6 }}>
                  专为 Steam / Apex / CS2 跨区联机优化，物理 RTT 压至极致，晚高峰 UDP 丢包率趋近 0。
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#34d399', fontSize: '0.82rem', fontWeight: 600 }}>起步 9.9元/月起</span>
                  <Link to="/docs/brands/weifeng" style={{ color: '#38bdf8', fontSize: '0.82rem' }}>万字评测 &raquo;</Link>
                </div>
              </div>

              <div style={{ background: 'rgba(8, 13, 26, 0.7)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <h4 style={{ margin: '0 0 6px 0', color: '#f8fafc', fontSize: '1.05rem' }}>
                  <Link to="/docs/brands/dalaoyun" style={{ color: '#38bdf8' }}>5. 大佬云</Link> · 5.6 元平价专线标杆
                </h4>
                <p style={{ fontSize: '0.86rem', color: '#94a3b8', margin: '0 0 8px 0', lineHeight: 1.6 }}>
                  5.6 元档位的明星老牌，采用大宗集中采购 IEPL 带宽，动态超售控制良好，极致高性价比首选。
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#34d399', fontSize: '0.82rem', fontWeight: 600 }}>起步 5.6元/月起</span>
                  <Link to="/docs/brands/dalaoyun" style={{ color: '#38bdf8', fontSize: '0.82rem' }}>万字评测 &raquo;</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Tier 2 */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.4rem' }}>⚡</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f1f5f9', margin: 0 }}>
                第二梯队：高性价比与垂直特色专线（Top 6 - 16）
              </h3>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '0.94rem', lineHeight: 1.7, margin: '0 0 16px 0' }}>
              涵盖具有明显技术特长与差异化卖点的中高端品牌：
              <strong><Link to="/docs/brands/xingdaomeng" style={{ color: '#38bdf8' }}>星岛梦</Link></strong>（2020年老牌不限设备，全1倍率）、
              <strong><Link to="/docs/brands/ermao" style={{ color: '#38bdf8' }}>二猫云</Link></strong>（多节点大带宽、流媒体全解）、
              <strong><Link to="/docs/brands/wuyou" style={{ color: '#38bdf8' }}>无忧链接</Link></strong>（跨境电商与海外社媒推流专精）、
              <strong><Link to="/docs/brands/weitu" style={{ color: '#38bdf8' }}>唯兔云</Link></strong>（AI大模型低延迟长推理）、
              <strong><Link to="/docs/brands/firefly" style={{ color: '#38bdf8' }}>Firefly萤火虫</Link></strong>（稳定轻量）、
              <strong><Link to="/docs/brands/u1s1" style={{ color: '#38bdf8' }}>U1S1</Link></strong>（多倍率灵活调配）、
              <strong><Link to="/docs/brands/lingmao" style={{ color: '#38bdf8' }}>灵猫网络</Link></strong>（原生IP丰富）、
              <strong><Link to="/docs/brands/jilian" style={{ color: '#38bdf8' }}>极连云</Link></strong>（BGP多入口互备）、
              <strong><Link to="/docs/brands/guangnian" style={{ color: '#38bdf8' }}>光年梯</Link></strong>（高吞吐大流量包）、
              <strong><Link to="/docs/brands/yifan" style={{ color: '#38bdf8' }}>一翻云</Link></strong>（外贸小包经济实用）、
              <strong><Link to="/docs/brands/yuzhou" style={{ color: '#38bdf8' }}>宇宙云</Link></strong>（老牌深耕）。
            </p>
          </div>

          {/* Tier 3 & 4 */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.4rem' }}>🛡️</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f1f5f9', margin: 0 }}>
                第三与第四梯队：稳定平价、垂直出海与极客商用（Top 17 - 42）
              </h3>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '0.94rem', lineHeight: 1.7, margin: '0 0 14px 0' }}>
              <strong>第三梯队（Top 17 - 28）</strong>：包括 <Link to="/docs/brands/sogo" style={{ color: '#94a3b8' }}>SOGO云</Link>、<Link to="/docs/brands/kexin" style={{ color: '#94a3b8' }}>可信云</Link>、<Link to="/docs/brands/sujie" style={{ color: '#94a3b8' }}>速界</Link>、<Link to="/docs/brands/shanyue" style={{ color: '#94a3b8' }}>山跃</Link>、<Link to="/docs/brands/quanqiu" style={{ color: '#94a3b8' }}>全球云</Link>、<Link to="/docs/brands/shandianshu" style={{ color: '#94a3b8' }}>闪电鼠</Link>、<Link to="/docs/brands/yunjiexian" style={{ color: '#94a3b8' }}>云界线</Link>、<Link to="/docs/brands/liulianyun" style={{ color: '#94a3b8' }}>榴莲云</Link>、<Link to="/docs/brands/shenxing" style={{ color: '#94a3b8' }}>神行机场</Link>、<Link to="/docs/brands/huanqiuti" style={{ color: '#94a3b8' }}>环球梯</Link>、<Link to="/docs/brands/yinxingren.mdx" style={{ color: '#94a3b8' }}>银杏人</Link>、<Link to="/docs/brands/tiziyun" style={{ color: '#94a3b8' }}>梯子云</Link>，均主打 5～12 元区间的极客高性价比与轻度科研资料查阅。
            </p>
            <p style={{ color: '#cbd5e1', fontSize: '0.94rem', lineHeight: 1.7, margin: 0 }}>
              <strong>第四梯队（Top 29 - 42）</strong>：包括高端商用精品 <Link to="/docs/brands/wgetcloud" style={{ color: '#94a3b8' }}>WgetCloud</Link>（华为云全 BGP 专线、SLA 99.9%）、<Link to="/docs/brands/baiyueguang" style={{ color: '#94a3b8' }}>白月光</Link>、<Link to="/docs/brands/flyingbird" style={{ color: '#94a3b8' }}>FlyingBird</Link>、<Link to="/docs/brands/cyberguard" style={{ color: '#94a3b8' }}>CyberGuard</Link>、<Link to="/docs/brands/longmaoyun" style={{ color: '#94a3b8' }}>龙猫云</Link>、<Link to="/docs/brands/fatcat" style={{ color: '#94a3b8' }}>肥猫云</Link>、<Link to="/docs/brands/tntcloud" style={{ color: '#94a3b8' }}>TNTCloud</Link>、<Link to="/docs/brands/qingyunti" style={{ color: '#94a3b8' }}>青云梯</Link>、<Link to="/docs/brands/shanshuiyun" style={{ color: '#94a3b8' }}>山水云</Link>、<Link to="/docs/brands/lingdongyun" style={{ color: '#94a3b8' }}>灵动云</Link>、<Link to="/docs/brands/langwang" style={{ color: '#94a3b8' }}>浪网</Link>、<Link to="/docs/brands/edgenova" style={{ color: '#94a3b8' }}>EdgeNova</Link>、<Link to="/docs/brands/yinghuochong" style={{ color: '#94a3b8' }}>萤火虫</Link>、<Link to="/docs/brands/sslar" style={{ color: '#94a3b8' }}>SSLAR</Link>，构成全网最完备的二线容灾与备用防失联矩阵。
            </p>
          </div>
        </div>

        {/* Section 4: Network Engineering Principles */}
        <div className="container" id="network-engineering" style={{ maxWidth: '1080px', margin: '56px auto 0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', marginBottom: '10px' }}>
            四、机场选型五大底层网络工程学原理与避坑指南
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '24px', lineHeight: 1.7 }}>
            掌握以下五大底层网络通信机制，您将具备穿透一切服务商虚假营销宣传、准确识别真实线路质量的专业极客辨别能力：
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '20px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#38bdf8', margin: '0 0 10px 0' }}>
                1. 物理链路层：公网直连 vs 中转 vs IEPL/IPLC 专线
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
                光在光纤玻璃介质中的传播速度约为 200,000 km/s，折算每千米往返时延（RTT）约为 10ms。普通公网直连（直连机房）受制于国际公网出口拥堵，晚高峰丢包常超 20%；公网中转经过多层 NAT 转发抖动大；而 <strong>IEPL / IPLC 物理专线</strong> 是点对点内网光缆直连，完全不走公网 GFW 出口，实现全天候 0 敏感期干扰、0 丢包。
              </p>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '20px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#38bdf8', margin: '0 0 10px 0' }}>
                2. 现代加密协议演进：Shadowsocks 到 VLESS Reality
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
                传统的 Shadowsocks 具有高并发低开销优势，但在公网裸跑易被 DPI 深度包检测识别；<strong>VLESS Reality</strong> 借用合规域名的真实 TLS 证书公钥完成握手，消灭了中间人主动探测特征；而基于 UDP/QUIC 架构的 <strong>Hysteria2 与 TUIC</strong> 具备丢包自适应流控，在恶劣弱网环境下具备暴力穿透提速能力。
              </p>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '20px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#38bdf8', margin: '0 0 10px 0' }}>
                3. IP 纯净度与欺诈分（Fraud Score）对抗模型
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
                OpenAI、Netflix、TikTok 依靠 IP2Location 与 MaxMind 数据库判断客户端风险等级。若节点被标记为「Data Center Hosting（机房托管 IP）」且欺诈分高于 30%，立即触发 403 阻断或限制播放。唯有采购成本高昂的 <strong>Residential / ISP 原生住宅属性落地 IP</strong>，才能长久稳定解锁全部特权。
              </p>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '20px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#38bdf8', margin: '0 0 10px 0' }}>
                4. 节点倍率与超售经济学算账模型
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
                部分低价机场宣称「0.1 倍率节点」，本质上是将其部署在廉价的无保障公网 VPS 上，晚高峰排队严重；而 1.0 倍率专线节点拥有独享物理出口带宽保障。业内健康的带宽超售比控制在 1:15 左右；一旦超售比突破 1:30，晚高峰必然遭遇毁灭性断流与网络雪崩。
              </p>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '20px', gridColumn: '1 / -1' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#38bdf8', margin: '0 0 10px 0' }}>
                5. 虚拟网卡 TUN 驱动接管 vs 传统系统代理机制
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
                系统代理仅在系统网络设置中更改 127.0.0.1:7890 端口，只能代理主动遵守规则的浏览器，游戏、命令行、Git 与 Docker 容器直接直连而报错。<strong>TUN 模式</strong> 在操作系统三层（Layer 3）虚拟出一张网络适配器，全局无死角劫持数据包；配合 <strong>Fake-IP 智能技术</strong>，向系统立即返回 198.18.0.0/16 虚拟 IP，解析时延降为 0ms，并在远端安全完成真实 DNS 解析，从根源上消灭本地运营商的 DNS 劫持与投毒。
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Scenario Decision Matrix & Tree */}
        <div className="container" id="scenario-matrix" style={{ maxWidth: '1080px', margin: '56px auto 0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', marginBottom: '8px' }}>
            五、六大业务场景落地选型与科学决策树
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '24px', lineHeight: 1.6 }}>
            根据您的核心使用目标，点击直达专属万字研报，获取深度实测数据、专用客户端分流配置规则与报错排查手册：
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '18px'
          }}>
            <Link to="/docs/scenarios/ai-accelerate" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '12px', padding: '22px', height: '100%' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>🤖</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#38bdf8', margin: '0 0 8px 0' }}>
                  ChatGPT、Claude 与 Gemini 生产力加速
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>
                  高纯净度原生 IP 节点，杜绝 Cloudflare 验证循环、403 阻断与大模型数十万 Token 深度推理中断。首推：<strong>光速云</strong>、速界。
                </p>
              </div>
            </Link>

            <Link to="/docs/scenarios/streaming-unlock" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '12px', padding: '22px', height: '100%' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>🎬</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#38bdf8', margin: '0 0 8px 0' }}>
                  Netflix、Disney+ 与 YouTube 4K/8K 蓝光流媒体
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>
                  晚高峰 80,000+ Kbps 真实吞吐，完整解锁全区非自制剧（日本本土动漫、欧美院线大片），秒播零缓冲。首推：<strong>闪跃</strong>、光速云。
                </p>
              </div>
            </Link>

            <Link to="/docs/scenarios/cross-border-ecommerce" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '12px', padding: '22px', height: '100%' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>📦</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#38bdf8', margin: '0 0 8px 0' }}>
                  跨境电商、TikTok 直播推流与海外社媒多账号
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>
                  原生广播 IP 属性、防多店铺关联封控，OBS 15Mbps+ 上行推流 0 丢包保障。首推：<strong>无忧链接</strong>、一翻云。
                </p>
              </div>
            </Link>

            <Link to="/docs/scenarios/low-latency-gaming" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '12px', padding: '22px', height: '100%' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>🎮</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#38bdf8', margin: '0 0 8px 0' }}>
                  跨区电竞联机加速：晚高峰 0 丢包与超低 RTT
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>
                  Steam、Valorant、Apex、CS2 亚服/日服超低延迟，UDP Full Cone NAT 穿透与 TUN 虚拟网卡深度调优。首推：<strong>光速云</strong>、微风网络。
                </p>
              </div>
            </Link>

            <Link to="/docs/scenarios/budget-friendly" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '12px', padding: '22px', height: '100%' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>💰</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#38bdf8', margin: '0 0 8px 0' }}>
                  2026 极致高性价比与平价备用 (5.6元档算账与避坑)
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>
                  深入剖析 5.6 元档位（大佬云、闪电鼠、云界线）底层超售经济学与双活容灾方案，用极低预算防失联。首推：<strong>大佬云</strong>、闪电鼠。
                </p>
              </div>
            </Link>

            <Link to="/docs/scenarios/enterprise-dedicated" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '12px', padding: '22px', height: '100%' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>🏢</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#38bdf8', margin: '0 0 8px 0' }}>
                  企业跨境办公、不限设备并发与团队协同方案
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>
                  面向 5～50 人团队，解决并发设备限制、SaaS 异地风控断流，提供软路由透明网关部署与 7×24 SLA。首推：<strong>光速云</strong>、暮光加速。
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Section 6: Client Ecosystem */}
        <div className="container" id="client-guide" style={{ maxWidth: '1080px', margin: '56px auto 0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', marginBottom: '10px' }}>
            六、全平台客户端选型与极速配置指南
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '22px', lineHeight: 1.6 }}>
            订阅任何优质机场后，必须搭配适配的操作系统代理软件。点击下方对应系统查看图文配置教程与一键订阅导入指引：
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' }}>
            <Link to="/docs/clients/windows" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '6px' }}>🪟</div>
                <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '1.05rem', marginBottom: '4px' }}>Windows</div>
                <div style={{ fontSize: '0.8rem', color: '#38bdf8' }}>Clash Verge Rev &raquo;</div>
              </div>
            </Link>

            <Link to="/docs/clients/macos" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '6px' }}>🍎</div>
                <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '1.05rem', marginBottom: '4px' }}>macOS</div>
                <div style={{ fontSize: '0.8rem', color: '#38bdf8' }}>Verge Mac / Surge &raquo;</div>
              </div>
            </Link>

            <Link to="/docs/clients/ios" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '6px' }}>📱</div>
                <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '1.05rem', marginBottom: '4px' }}>iOS (苹果)</div>
                <div style={{ fontSize: '0.8rem', color: '#38bdf8' }}>Shadowrocket (小火箭) &raquo;</div>
              </div>
            </Link>

            <Link to="/docs/clients/android" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '6px' }}>🤖</div>
                <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '1.05rem', marginBottom: '4px' }}>Android (安卓)</div>
                <div style={{ fontSize: '0.8rem', color: '#38bdf8' }}>v2rayNG / FlClash &raquo;</div>
              </div>
            </Link>

            <Link to="/docs/clients/linux" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '6px' }}>🐧</div>
                <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '1.05rem', marginBottom: '4px' }}>Linux</div>
                <div style={{ fontSize: '0.8rem', color: '#38bdf8' }}>v2rayA / Systemd &raquo;</div>
              </div>
            </Link>

            <Link to="/docs/clients/router" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '6px' }}>📶</div>
                <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '1.05rem', marginBottom: '4px' }}>软路由 (OpenWrt)</div>
                <div style={{ fontSize: '0.8rem', color: '#38bdf8' }}>OpenClash 透明网关 &raquo;</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Section 7: FAQs */}
        <div className="container" id="faq" style={{ maxWidth: '1080px', margin: '56px auto 0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', marginBottom: '10px' }}>
            七、2026 机场选型与防坑避雷高频十问十答 (GEO / AEO FAQs)
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '24px', lineHeight: 1.6 }}>
            以下问答基于真实工单投诉与可观测实验室数千次压力测试总结，直击核心利益关切：
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '20px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8', margin: '0 0 8px 0' }}>
                Q1: 2026 年选择机场最重要的指标是什么？为什么普通公网中转容易在晚高峰卡顿？
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
                核心指标是底层传输是否为<strong>物理 IEPL/IPLC 独立专线</strong>以及服务商的动态超售比。普通公网中转机场使用普通公网链路传输数据，在晚高峰（20:00～23:00）遭遇国际出口骨干网严重拥堵，丢包率往往激增至 15%～30%，导致视频降画质和游戏掉线。而物理专线具备独立物理光纤光缆，不过公网 GFW 防火墙，晚高峰丢包率趋近于 0。
              </p>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '20px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8', margin: '0 0 8px 0' }}>
                Q2: 为什么 2026 综合首选推荐光速云？它有哪些不可替代的优势？
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
                <strong><Link to="/docs/brands/guangsu" style={{ color: '#38bdf8' }}>光速云</Link></strong>自 2020 年稳定运营至今，采用全链路物理 IEPL 专线与企业级内网双专线架构。实测香港节点延迟低至 22ms、晚高峰下载突破 529Mbps，原生解锁 ChatGPT、Claude 及 Netflix 4K 全区。其独家推出的 147 元不过期永久流量包结合专属优惠码 <code>AMM</code>，年付仅需 99 元起，性价比与稳定性在 42 家测评品牌中位列综合第一。
              </p>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '20px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8', margin: '0 0 8px 0' }}>
                Q3: 便宜的 5.6 元机场能用吗？服务商是如何实现极低价格的？
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
                5.6 元平价机场（如<strong><Link to="/docs/brands/dalaoyun" style={{ color: '#38bdf8' }}>大佬云</Link></strong>、<strong><Link to="/docs/brands/shandianshu" style={{ color: '#38bdf8' }}>闪电鼠</Link></strong>）是真实且稳定存在的。服务商通过大宗采购上游 IEPL 骨干带宽并采用 1:15 至 1:25 的动态带宽复用超售模型摊薄成本。平价机场非常适合查阅资料、轻度办公或作为第二备用链路，但在晚高峰极度重载时偶有轻微排队抖动。最佳策略是将其作为备用，搭配光速云等主力专线构建双活容灾体系。
              </p>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '20px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8', margin: '0 0 8px 0' }}>
                Q4: 什么是流媒体全区解锁？为什么能看自制剧不等于真正解锁 Netflix？
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
                Netflix 等流媒体平台对自制剧（Netflix Originals）不设地区版权限制，任何机房 IP 均可播放；而热门非自制电影电视剧（如日本本土动漫、欧美独家院线大片）受严格地域版权保护，仅向具备本地原生 Residential/ISP 标识的纯净 IP 开放。只有具备原生解锁标识的专线节点，才能观看全区完整版权库。
              </p>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '20px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8', margin: '0 0 8px 0' }}>
                Q5: 访问 ChatGPT 和 Claude 为什么经常遭遇 403 阻断或 Access Denied？
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
                OpenAI 与 Anthropic 部署了基于 Cloudflare 与 Arkose Labs 的严格风控体系，对数据中心机房 IP（Hosting IP）及高风险欺诈分（Fraud Score &gt; 30%）的代理直接阻断。用户需选用纯净度高、具备原生落地 IP 的美区或亚太专线节点，并在客户端开启伪装配置与固定节点，避免频繁切换触发盗号风控。
              </p>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '20px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8', margin: '0 0 8px 0' }}>
                Q6: 机场订阅被封号最常见的原因是什么？如何避免踩坑？
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
                最主要原因是超出服务商规定的<strong>同时在线公网 IP 限制</strong>。绝大多数机场限制 2～3 个不同公网 IP 同时连接，若将个人订阅分享给多名异地好友，触发后端防倒卖风控会被系统自动封禁。如需团队使用，应选型明确支持不限设备并发的品牌（如暮光加速、星岛梦）或在办公室软路由上网关部署透明代理。
              </p>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '20px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8', margin: '0 0 8px 0' }}>
                Q7: 初学者在选择客户端时，应该使用 Clash Verge Rev、v2rayN 还是自研软件？
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
                Windows 和 macOS 平台首推基于 Mihomo 内核的现代开源客户端 <strong>Clash Verge Rev</strong>，开启 TUN 虚拟网卡模式后可实现全局系统级分流与极低延迟游戏加速；移动端 iOS 首推 <strong>Shadowrocket（小火箭）</strong>，Android 首推 <strong>v2rayNG</strong>；若追求零配置一键使用，推荐选用提供官方自研客户端的<strong><Link to="/docs/brands/muguang" style={{ color: '#38bdf8' }}>暮光加速</Link></strong>。
              </p>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '20px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8', margin: '0 0 8px 0' }}>
                Q8: 买机场套餐选月付、年付还是不限时流量包更划算？
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
                新用户首次使用任何新品牌建议优先月付进行真实网络体验；确认日常晚高峰速度满意后，可转为年付以享受 6～8 折的折让优惠。对于使用频次较低或需要长期备用应急的用户，首选<strong><Link to="/docs/brands/guangsu" style={{ color: '#38bdf8' }}>光速云</Link></strong>的 147 元不过期永久套餐，免去按月续费清零的浪费风险。
              </p>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '20px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8', margin: '0 0 8px 0' }}>
                Q9: 机场会有跑路风险吗？用户该如何识别潜在跑路迹象？
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
                运营不足半年的小作坊低价机场跑路概率极高。主要预警信号包括：开业仅数周便推出终身几十元的超级低价套餐、官方 Telegram 交流群长期全员禁言、工单数天无人回应、频繁更换收款商户主体等。建议优先选择运营 3 年以上的成熟老牌（如光速云、暮光加速、飞猫云），并养成主备双机场防失联习惯。
              </p>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.65)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '20px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8', margin: '0 0 8px 0' }}>
                Q10: 什么是 TUN 模式与 Fake-IP？为什么开启后上网速度明显变快？
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
                TUN 模式通过在操作系统内创建虚拟网卡接管所有三层 IP 数据包，使命令行、游戏和所有应用均能享受加速；Fake-IP 技术使客户端在收到域名查询时立即返回保留网段虚拟 IP，解析时延降为 0ms，真正的域名解析在远端专线服务器安全完成，彻底杜绝本地运营商的 DNS 投毒与污染。
              </p>
            </div>
          </div>
        </div>

        {/* Section 8: Compliance & Legal */}
        <div className="container" id="compliance" style={{ maxWidth: '1080px', margin: '56px auto 0 auto', padding: '0 20px' }}>
          <div style={{
            background: 'rgba(8, 13, 26, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '10px',
            padding: '20px',
            fontSize: '0.85rem',
            color: '#64748b',
            lineHeight: 1.7
          }}>
            <p style={{ margin: '0 0 8px 0' }}>
              <strong>免责与合规推广披露 (Affiliate Disclosure)</strong>：本站（jichangtuijian.cyou）由独立计算机网络极客团队维护，专注于网络可观测性、路由延迟测算与协议科普。部分链接为带有专属跟踪代码的商业推广链接，当用户完成订阅时，服务商可能会向本站支付用于支付服务器机房探针开销的佣金，这不会增加您的任何付款金额。所有商业链接均严格注入 <code>target=\"_blank\" rel=\"nofollow sponsored noopener\"</code>，符合 Google / Bing 搜索引擎规范。
            </p>
            <p style={{ margin: 0 }}>
              阅读更多：<Link to="/docs/observatory/disclaimer" style={{ color: '#94a3b8' }}>免责声明与隐私协议</Link> | <Link to="/docs/observatory/iepl-vs-iplc" style={{ color: '#94a3b8' }}>IEPL/IPLC 技术原理解密</Link> | <Link to="/docs/architecture/" style={{ color: '#94a3b8' }}>蜂巢式拓扑知识图谱架构</Link>
            </p>
          </div>
        </div>

      </main>
    </Layout>
  );
}
`;

fs.writeFileSync(path.join(__dirname, '../src/pages/index.tsx'), tsxContent, 'utf8');

const cnCount = countChinese(tsxContent);
console.log('Homepage src/pages/index.tsx generated successfully!');
console.log('Pure Chinese Character Count:', cnCount);
