const fs = require('fs');
const path = require('path');

let scriptContent = fs.readFileSync(path.join(__dirname, 'build12kHomepage.js'), 'utf8');

const megaHubsBannerJSX = `
        {/* Five Mega Topic Matrices Entry Grid */}
        <div className="container" style={{ maxWidth: '1080px', margin: '36px auto 0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
              📚 五大超级专题知识图谱矩阵（万字级支柱页 + 集群深解）
            </h2>
            <span style={{ fontSize: '0.82rem', color: '#38bdf8' }}>全站蜂巢互联 · 2026 权威百科</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(195px, 1fr))', gap: '14px' }}>
            <Link to="/docs/rankings/" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.14) 0%, rgba(15, 23, 42, 0.8) 100%)', border: '1px solid rgba(56, 189, 248, 0.35)', borderRadius: '10px', padding: '16px', height: '100%' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>🥇</div>
                <div style={{ fontWeight: 700, color: '#38bdf8', fontSize: '1.02rem', marginBottom: '4px' }}>42家机场推荐总榜</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>资费阶梯、物理专线榜与晚高峰实测排名 &raquo;</div>
              </div>
            </Link>

            <Link to="/docs/free-nodes/" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(52, 211, 153, 0.3)', borderRadius: '10px', padding: '16px', height: '100%' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>🎁</div>
                <div style={{ fontWeight: 700, color: '#34d399', fontSize: '1.02rem', marginBottom: '4px' }}>免费节点与订阅百科</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>开源节点验证、安全蜜罐拆解与付费对照 &raquo;</div>
              </div>
            </Link>

            <Link to="/docs/free-trial/" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(167, 139, 250, 0.3)', borderRadius: '10px', padding: '16px', height: '100%' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>⚡</div>
                <div style={{ fontWeight: 700, color: '#a78bfa', fontSize: '1.02rem', marginBottom: '4px' }}>免费试用与 1 元体验</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>免绑卡 0 元试跑与 AMM 优惠码转正攻略 &raquo;</div>
              </div>
            </Link>

            <Link to="/docs/blacklist-scam/" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: '10px', padding: '16px', height: '100%' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>🚨</div>
                <div style={{ fontWeight: 700, color: '#fb7185', fontSize: '1.02rem', marginBottom: '4px' }}>机场跑路预警防御</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>庞氏资金盘识别、前兆自检与主备容灾 &raquo;</div>
              </div>
            </Link>

            <Link to="/docs/faq/" style={{ textDecoration: 'none' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: '10px', padding: '16px', height: '100%' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>❓</div>
                <div style={{ fontWeight: 700, color: '#fbbf24', fontSize: '1.02rem', marginBottom: '4px' }}>机场 FAQ 排障全书</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5 }}>Timeout 报错、DNS防泄漏与并发规则精解 &raquo;</div>
              </div>
            </Link>
          </div>
        </div>
`;

scriptContent = scriptContent.replace(
  '{/* Section 1: Direct Answer */}',
  megaHubsBannerJSX + '\n        {/* Section 1: Direct Answer */}'
);

fs.writeFileSync(path.join(__dirname, 'build12kHomepage.js'), scriptContent, 'utf8');
console.log('Added Five Mega Topic Matrices Banner to build12kHomepage.js');
