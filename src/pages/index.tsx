import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { AIRPORT_BRANDS } from '../data/brands';
import AffiliateButton from '../components/AffiliateButton';

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const top10 = AIRPORT_BRANDS.slice(0, 10);
  const guangsu = AIRPORT_BRANDS[0];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://jichangtuijian.cyou/#website',
        'url': 'https://jichangtuijian.cyou',
        'name': '机场 cyou · 2026 高端机场推荐与网络可观测平台',
        'description': '42家主流机场权威实测、IEPL/IPLC专线深度横评与流媒体/AI解锁知识图谱。',
        'inLanguage': 'zh-Hans'
      },
      {
        '@type': 'Organization',
        '@id': 'https://jichangtuijian.cyou/#organization',
        'name': '机场 cyou 实验室',
        'url': 'https://jichangtuijian.cyou',
        'logo': 'https://jichangtuijian.cyou/img/avatar.png'
      }
    ]
  };

  return (
    <Layout
      title="2026 优质机场推荐与专线实测选型矩阵"
      description="机场 cyou (jichangtuijian.cyou) 专注于 42 家主流机场的深度测速评测、延迟监控、晚高峰稳定性分析与 AI/流媒体解锁验证。">
      
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>

      <main style={{ backgroundColor: '#080d1a', color: '#e2e8f0', minHeight: '100vh', paddingBottom: '60px' }}>
        {/* Hero Section */}
        <div style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(14, 165, 233, 0.25), transparent)',
          padding: '64px 20px 48px 20px',
          textAlign: 'center',
          borderBottom: '1px solid rgba(56, 189, 248, 0.15)'
        }}>
          <div className="container" style={{ maxWidth: '1040px', margin: '0 auto' }}>
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
              NETWORK OBSERVATORY ACTIVE · 42 品牌实时监控矩阵
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

            <p style={{ fontSize: '1.15rem', color: '#94a3b8', maxWidth: '720px', margin: '0 auto 28px auto', lineHeight: 1.6 }}>
              深度收录 42 家主流机场，覆盖 IEPL / IPLC 物理专线、BGP 智能容灾与原生落地 IP。以真实晚高峰数据为准绳，为您提供客观的数字化选型依据。
            </p>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                className="button"
                to="/docs/brands/"
                style={{
                  backgroundColor: '#0284c7',
                  color: '#ffffff',
                  fontWeight: 700,
                  padding: '12px 28px',
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 18px rgba(2, 132, 199, 0.4)'
                }}>
                🏆 浏览 42 家品牌评测库
              </Link>
              <Link
                className="button"
                to="/docs/scenarios/"
                style={{
                  backgroundColor: 'rgba(30, 41, 59, 0.8)',
                  color: '#e2e8f0',
                  fontWeight: 600,
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.15)'
                }}>
                🎯 场景快速选型指南
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Main Recommendation - 光速云 */}
        <div className="container" style={{ maxWidth: '1040px', margin: '40px auto 0 auto', padding: '0 20px' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(30, 41, 59, 0.7) 100%)',
            border: '2px solid rgba(56, 189, 248, 0.4)',
            borderRadius: '16px',
            padding: '28px',
            position: 'relative',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)'
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
              🔥 年度实验室 No.1 综合主推
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 8px 0' }}>
                  {guangsu.name} · 旗舰专线服务
                </h2>
                <p style={{ color: '#94a3b8', margin: '0 0 12px 0', fontSize: '0.95rem', maxWidth: '640px' }}>
                  2020年长线稳定运营，IEPL专线 + 企业内网双专线架构。提供 147 元不过期永久包，年付 99 元起步，原生解锁 ChatGPT / Claude 与 Netflix 4K，晚高峰丢包趋近于 0。
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.85rem', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', padding: '4px 10px', borderRadius: '4px' }}>
                    ⚡ 香港延迟: 22ms / 529Mbps
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#34d399', background: 'rgba(52, 211, 153, 0.1)', padding: '4px 10px', borderRadius: '4px' }}>
                    💰 起步价: 8元/月起
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#a78bfa', background: 'rgba(167, 139, 250, 0.1)', padding: '4px 10px', borderRadius: '4px' }}>
                    🔑 优惠码: AMM
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
                    padding: '14px 24px',
                    background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '1.05rem',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 20px rgba(2, 132, 199, 0.5)'
                  }}>
                  🚀 立即直达光速云官网 &rarr;
                </a>
                <div style={{ textAlign: 'center', marginTop: '6px' }}>
                  <Link to={`/docs/brands/${guangsu.id}`} style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                    查看光速云万字评测报告 &raquo;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top 10 Live Matrix Table */}
        <div className="container" style={{ maxWidth: '1040px', margin: '48px auto 0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '8px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
              📊 第一梯队：核心主推与高优先级专线榜单
            </h2>
            <Link to="/docs/brands/" style={{ fontSize: '0.9rem', color: '#38bdf8' }}>
              查看全部 42 家机场矩阵 &rarr;
            </Link>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'rgba(15, 23, 42, 0.6)',
              borderRadius: '10px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <thead>
                <tr style={{ background: 'rgba(30, 41, 59, 0.8)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#38bdf8' }}>排名</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#38bdf8' }}>品牌名称</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#38bdf8' }}>起步价</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#38bdf8' }}>核心特色</th>
                  <th style={{ padding: '12px', textAlign: 'left', color: '#38bdf8' }}>骨干线路</th>
                  <th style={{ padding: '12px', textAlign: 'center', color: '#38bdf8' }}>专属通道</th>
                </tr>
              </thead>
              <tbody>
                {top10.map((b) => (
                  <tr key={b.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '12px', fontWeight: 700, color: b.rank === 1 ? '#38bdf8' : '#94a3b8' }}>
                      Top {b.rank}
                    </td>
                    <td style={{ padding: '12px', fontWeight: 700 }}>
                      <Link to={`/docs/brands/${b.id}`} style={{ color: '#f1f5f9' }}>
                        {b.name}
                      </Link>
                    </td>
                    <td style={{ padding: '12px', color: '#34d399', fontWeight: 600 }}>
                      {b.startingPrice}
                    </td>
                    <td style={{ padding: '12px', color: '#cbd5e1', fontSize: '0.85rem' }}>
                      {b.badge}
                    </td>
                    <td style={{ padding: '12px', color: '#94a3b8', fontSize: '0.85rem' }}>
                      {b.lines.split('，')[0]}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <a
                        href={b.affiliateUrl}
                        target="_blank"
                        rel="nofollow sponsored noopener"
                        style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          backgroundColor: b.rank === 1 ? '#0284c7' : 'rgba(255, 255, 255, 0.08)',
                          color: '#ffffff',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          textDecoration: 'none'
                        }}>
                        直达开通
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6 Scenario Grid */}
        <div className="container" style={{ maxWidth: '1040px', margin: '56px auto 0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f8fafc', marginBottom: '20px' }}>
            🎯 场景化精准选型决策
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '18px'
          }}>
            <Link to="/docs/scenarios/ai-accelerate" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '20px',
                transition: 'border 0.2s',
                height: '100%'
              }}>
                <div style={{ fontSize: '1.6rem', marginBottom: '8px' }}>🤖</div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#38bdf8', margin: '0 0 6px 0' }}>
                  ChatGPT & Claude 生产力加速
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                  高信誉度原生 IP 节点，避免 Cloudflare 验证死循环与大模型长 Token 输出中断。
                </p>
              </div>
            </Link>

            <Link to="/docs/scenarios/streaming-unlock" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '20px',
                transition: 'border 0.2s',
                height: '100%'
              }}>
                <div style={{ fontSize: '1.6rem', marginBottom: '8px' }}>🎬</div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#38bdf8', margin: '0 0 6px 0' }}>
                  Netflix & YouTube 4K/8K 蓝光流媒体
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                  晚高峰 500Mbps+ 真实吞吐，完整解锁全区非自制剧，拖拽进度条秒播零缓冲。
                </p>
              </div>
            </Link>

            <Link to="/docs/scenarios/budget-friendly" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '20px',
                transition: 'border 0.2s',
                height: '100%'
              }}>
                <div style={{ fontSize: '1.6rem', marginBottom: '8px' }}>💰</div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#38bdf8', margin: '0 0 6px 0' }}>
                  5.6 元极限平价专线与轻量备用
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                  大佬云、闪电鼠、云界线等 5.6 元档位专线实测，花最低成本保障网络防失联。
                </p>
              </div>
            </Link>

            <Link to="/docs/scenarios/cross-border-ecommerce" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '20px',
                transition: 'border 0.2s',
                height: '100%'
              }}>
                <div style={{ fontSize: '1.6rem', marginBottom: '8px' }}>📦</div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#38bdf8', margin: '0 0 6px 0' }}>
                  跨境电商与 TikTok 直播推流
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                  原生住宅 IP、固定出口防多账号关联，15Mbps+ 上行推流 0 丢包保障。
                </p>
              </div>
            </Link>

            <Link to="/docs/clients/" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '20px',
                transition: 'border 0.2s',
                height: '100%'
              }}>
                <div style={{ fontSize: '1.6rem', marginBottom: '8px' }}>💻</div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#38bdf8', margin: '0 0 6px 0' }}>
                  2026 全平台客户端下载与指引
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                  Clash Verge Rev、v2rayN、Shadowrocket (小火箭)、sing-box 配置与下载。
                </p>
              </div>
            </Link>

            <Link to="/docs/observatory/iepl-vs-iplc" style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '20px',
                transition: 'border 0.2s',
                height: '100%'
              }}>
                <div style={{ fontSize: '1.6rem', marginBottom: '8px' }}>📡</div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#38bdf8', margin: '0 0 6px 0' }}>
                  IEPL vs IPLC 专线硬核解密
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
                  物理裸纤与公网中转有何根本差异？为什么专线能够做到高敏感期 0 阻断。
                </p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
