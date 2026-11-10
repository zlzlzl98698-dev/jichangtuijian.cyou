const fs = require('fs');
const path = require('path');

let scriptContent = fs.readFileSync(path.join(__dirname, 'build12kHomepage.js'), 'utf8');

const mtrMethodologyJSX = `
        {/* Section 4.1: MTR Telemetry Methodology */}
        <div className="container" style={{ maxWidth: '1080px', margin: '36px auto 0 auto', padding: '0 20px' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8', marginBottom: '14px' }}>
              📡 可观测实验室技术准绳：如何看懂 MTR 路由跳数与晚高峰极限压测数据
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: '16px' }}>
              普通用户往往只看 Speedtest 单次测速的峰值数字，但峰值只能反映「某个毫秒瞬时的带宽」，而无法反映「持续通信的质量与网络弹性」。本实验室在评测 42 家机场时，核心依据 <strong>MTR (My Traceroute)</strong> 进行多样本持续统计：
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              <div style={{ background: 'rgba(8, 13, 26, 0.7)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <h4 style={{ color: '#f8fafc', fontSize: '1rem', margin: '0 0 8px 0' }}>Loss% (真实丢包率 vs ICMP 速率限制)</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>
                  如果中间某个路由跳数出现 100% 丢包，但后续跳数与目标落地机没有丢包，说明该中间路由器配置了 ICMP Rate Limiting（安全限速），并非真正的线路物理丢包；只有当某跳及其后续所有跳数均出现一致的丢包百分比时，才代表物理专线或机房上游确实发生了不可逆的骨干网拥塞。
                </p>
              </div>

              <div style={{ background: 'rgba(8, 13, 26, 0.7)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <h4 style={{ color: '#f8fafc', fontSize: '1rem', margin: '0 0 8px 0' }}>StDev (标准差与网络抖动 Jitter 算法)</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>
                  平均延迟（Avg）低并不代表网络好。如果 Avg 为 40ms 但标准差（StDev）高达 25ms，说明数据包在传输过程中队列等待极其不均匀，游戏联机会严重卡顿。高品质物理专线（如光速云）能够将 StDev 控制在 1.5ms 以内，输出一条平直无波澜的高品质数据传输通道。
                </p>
              </div>

              <div style={{ background: 'rgba(8, 13, 26, 0.7)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <h4 style={{ color: '#f8fafc', fontSize: '1rem', margin: '0 0 8px 0' }}>BGP Anycast 多入口跨域调度路径</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>
                  通过分析入口 IP 的 AS 号与 BGP 宣告广播，我们能精准判断服务商是否为中国电信 CN2 GIA、中国联通 9929、中国移动 CMIN2 等优质接入点。双向三网优化的 BGP 入口能够在用户本地运营商发生偶发性光缆剪断时，于数十毫秒内通过 BGP 路由重敛收自动将流量无感导向健康省份入口。
                </p>
              </div>
            </div>
          </div>
        </div>
`;

scriptContent = scriptContent.replace(
  '{/* Section 5: Scenario Decision Matrix */}',
  mtrMethodologyJSX + '\n        {/* Section 5: Scenario Decision Matrix */}'
);

fs.writeFileSync(path.join(__dirname, 'build12kHomepage.js'), scriptContent, 'utf8');
console.log('Added MTR methodology section to build12kHomepage.js');
