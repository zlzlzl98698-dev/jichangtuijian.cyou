const fs = require('fs');
const path = require('path');

let scriptContent = fs.readFileSync(path.join(__dirname, 'build12kHomepage.js'), 'utf8');

const vpsComparisonJSX = `
        {/* Section 1.1: Self-built VPS vs Dedicated Line Airport */}
        <div className="container" style={{ maxWidth: '1080px', margin: '36px auto 0 auto', padding: '0 20px' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8', marginBottom: '14px' }}>
              💡 2026 深度思辨：自建 VPS 翻墙 vs 采购商业专线机场，哪种才是最优解？
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: '14px' }}>
              在 2018 年以前，很多技术极客推崇「买一台搬瓦工、Linode 或 Vultr 自建 Shadowsocks/V2Ray」。但在 2026 年的今天，自建 VPS 的技术可行性与经济效益均已全面崩塌，原因在于三大无法逾越的物理现实：
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              <div style={{ background: 'rgba(8, 13, 26, 0.7)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <h4 style={{ color: '#f8fafc', fontSize: '1rem', margin: '0 0 8px 0' }}>1. 资金成本倒挂严重（10 倍差价）</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.7, margin: 0 }}>
                  一台最便宜的海外 VPS 每月需要 5～10 美元（约合 35～70 元人民币），仅拥有 1 个公网 IP、1 个机房节点与单薄的公网直连链路；而订阅 <strong>光速云</strong> 年付仅需 99 元起（月均仅 8 元），或者购买大佬云仅需 5.6 元/月，即可同时享有全球 30+ 地区专线、数千兆带宽池与多线智能负载均衡。
                </p>
              </div>

              <div style={{ background: 'rgba(8, 13, 26, 0.7)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <h4 style={{ color: '#f8fafc', fontSize: '1rem', margin: '0 0 8px 0' }}>2. 恶劣的单 IP 脆弱性与换 IP 惩罚</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.7, margin: 0 }}>
                  自建 VPS 的公网 IP 一旦在敏感时期被 GFW 探测封锁 TCP 端口或阻断 ICMP，云服务商每次更换 IP 需要额外收取 2～8 美元不等的高额工单费用；而成熟商业机场拥有上千个分布式动态 IP 落地池，服务商由自动化运维系统在毫秒级内完成故障节点的隔离与替换，用户端完全无感。
                </p>
              </div>

              <div style={{ background: 'rgba(8, 13, 26, 0.7)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <h4 style={{ color: '#f8fafc', fontSize: '1rem', margin: '0 0 8px 0' }}>3. 流媒体与 AI 大模型 100% 拦截封杀</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.7, margin: 0 }}>
                  自建 VPS 必然分配到公网 Data Center 机房段 IP，在 IPQS 欺诈分检测中评分为高风险红标，直接被 OpenAI 与 Claude 全局阻断，访问 Netflix 只能观看无版权自制剧。唯有商业机场依靠规模效应采购本地原生住宅 ISP 广播 IP，方能长久稳定解锁全部业务特权。
                </p>
              </div>
            </div>
          </div>
        </div>
`;

scriptContent = scriptContent.replace(
  '{/* Featured Main Recommendation - 光速云 */}',
  vpsComparisonJSX + '\n        {/* Featured Main Recommendation - 光速云 */}'
);

fs.writeFileSync(path.join(__dirname, 'build12kHomepage.js'), scriptContent, 'utf8');
console.log('Added VPS comparison section to build12kHomepage.js');
