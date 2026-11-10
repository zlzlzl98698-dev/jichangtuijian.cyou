const fs = require('fs');
const path = require('path');

let scriptContent = fs.readFileSync(path.join(__dirname, 'build12kHomepage.js'), 'utf8');

const scenarioDetailsJSX = `
        {/* Section 5.1: Technical Depth of Scenarios */}
        <div className="container" style={{ maxWidth: '1080px', margin: '36px auto 0 auto', padding: '0 20px' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8', marginBottom: '14px' }}>
              🔬 深度剖析：不同业务场景对网络底层通信的差异化物理要求
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: '16px' }}>
              很多用户误以为「测速软件跑到 500Mbps 就代表所有场景都能顺畅无阻」，这在现代计算机网络工程中是一个典型的认知误区。不同应用协议对底层传输指标的物理敏感点存在本质差异：
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              <div style={{ background: 'rgba(8, 13, 26, 0.7)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <h4 style={{ color: '#f8fafc', fontSize: '1.05rem', margin: '0 0 8px 0' }}>🤖 AI 研发与长推理：痛点在「TCP 长连接保活与 IPQS 绿标」</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.7, margin: 0 }}>
                  使用 OpenAI o1/o3、Claude 3.5 Sonnet 或 DeepSeek 进行数十万 Token 复杂推理时，HTTP 请求往往需要持续保持长达 2～5 分钟的双向数据流（Server-Sent Events）。普通公网中转节点若配置了短超时的 NAT 转换表，或者遭遇链路抖动，会导致 Socket 瞬间重置，生成任务全功尽弃。必须选用拥有高信誉度原生 IP 与稳定长连接保活机制的专线服务。
                </p>
              </div>

              <div style={{ background: 'rgba(8, 13, 26, 0.7)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <h4 style={{ color: '#f8fafc', fontSize: '1.05rem', margin: '0 0 8px 0' }}>🎬 4K/8K 蓝光流媒体：痛点在「持续突发下行与 Anycast 本地调度」</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.7, margin: 0 }}>
                  Netflix 与 YouTube 采用自适应码率（ABR）算法。当检测到瞬时吞吐低于 25Mbps 时，画面会在数秒内自动从 4K 骤降至 1080P 或 720P。同时，流媒体 CDN 依据客户端 IP 的 /24 网段进行地理位置负载就近调度，非原生 IP 极易被调度到万里之外的欧美中继机房，导致初始缓冲时间长达十数秒。
                </p>
              </div>

              <div style={{ background: 'rgba(8, 13, 26, 0.7)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <h4 style={{ color: '#f8fafc', fontSize: '1.05rem', margin: '0 0 8px 0' }}>🎮 跨区电竞联机：痛点在「UDP 报文抖动 Jitter 与 NAT 穿透类型」</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.7, margin: 0 }}>
                  FPS 射击游戏（CS2、Valorant、Apex）服务器每秒进行 64 或 128 次状态同步（Tick Rate）。一旦遭遇超过 2% 的微小丢包或高于 5ms 的网络抖动，系统插值算法就会失效，引发开枪判定无效或人物被拉回原位。同时，对称型 NAT（Symmetric NAT）会直接阻断 P2P 战局匹配，必须要求节点支持 Full Cone NAT 穿透。
                </p>
              </div>

              <div style={{ background: 'rgba(8, 13, 26, 0.7)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <h4 style={{ color: '#f8fafc', fontSize: '1.05rem', margin: '0 0 8px 0' }}>📦 跨境电商与社媒：痛点在「固定出口属性与防多账号关联」</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.7, margin: 0 }}>
                  TikTok、亚马逊与 PayPal 的反作弊系统会记录登录 IP 的历史指纹。如果多个独立店铺在几天内由同一个共享机房动态 IP 频繁登录，会被关联引擎直接判定为矩阵操纵而批量封店。跨境卖家必须锁定纯净、固定的原生广播节点，并杜绝节点频繁轮询变动。
                </p>
              </div>
            </div>
          </div>
        </div>
`;

const clientOptimizationJSX = `
        {/* Section 6.1: Client Optimization */}
        <div className="container" style={{ maxWidth: '1080px', margin: '36px auto 0 auto', padding: '0 20px' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8', marginBottom: '14px' }}>
              ⚙️ 客户端进阶调优核心参数指引 (Mihomo / Clash Verge Rev)
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: '16px' }}>
              要在日常使用中彻底发挥 IEPL 物理专线的极速性能并彻底消灭 DNS 污染，建议在 Clash Verge Rev 的扩展配置（Merge Script）中开启以下工业级核心参数：
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              <div style={{ background: 'rgba(8, 13, 26, 0.7)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <h4 style={{ color: '#f8fafc', fontSize: '1rem', margin: '0 0 8px 0' }}>1. 开启混合协议栈 TUN 虚拟网卡 (Mixed Stack)</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>
                  配置 <code>tun.stack: mixed</code> 与 <code>auto-route: true</code>，允许 TCP 流量走 gVisor 轻量协议栈降低系统资源开销，而 UDP 流量走 System 原生网络栈，从而确保 Valorant 与 Steam 游戏的极限低时延与零封包积压。
                </p>
              </div>

              <div style={{ background: 'rgba(8, 13, 26, 0.7)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <h4 style={{ color: '#f8fafc', fontSize: '1rem', margin: '0 0 8px 0' }}>2. 部署分流安全的 DNS 防投毒体系</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>
                  nameserver 配置国内阿里 DNS（223.5.5.5）与腾讯 DNS（119.29.29.29）用于极速解析国内高并发服务；fallback 配置经过 TLS 加密的境外 DNS（https://dns.google/dns-query），并设置 <code>fallback-filter.geoip: true</code>，彻底屏蔽本地电信运营商针对海外域名的 DNS 劫持。
                </p>
              </div>

              <div style={{ background: 'rgba(8, 13, 26, 0.7)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <h4 style={{ color: '#f8fafc', fontSize: '1rem', margin: '0 0 8px 0' }}>3. 启用 TCP 并发抢跑与长连接心跳保活</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>
                  配置 <code>tcp-concurrent: true</code>，允许内核向多条专线节点同时发起 TCP 握手试探，自动采纳最快响应的数据包返回，首屏建连时延降低 40%；同时设置 <code>keep-alive-interval: 30</code>，确保 SSH 与大模型推理长连接不被中间路由器静默断开。
                </p>
              </div>

              <div style={{ background: 'rgba(8, 13, 26, 0.7)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <h4 style={{ color: '#f8fafc', fontSize: '1rem', margin: '0 0 8px 0' }}>4. 建立主备双机场自动故障转移策略组</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>
                  创建类型为 <code>fallback</code> 的代理组，设置 <code>url: http://www.gstatic.com/generate_204</code> 与 <code>interval: 60</code>。将光速云作为第一主力节点，大佬云作为第二备用节点。主专线一旦遭遇极端不可抗力检修，客户端在数秒内自动无感切换至备用专线，业务零中断。
                </p>
              </div>
            </div>
          </div>
        </div>
`;

scriptContent = scriptContent.replace(
  '{/* Section 6: Client Ecosystem */}',
  scenarioDetailsJSX + '\n        {/* Section 6: Client Ecosystem */}'
);

scriptContent = scriptContent.replace(
  '{/* Section 7: FAQs */}',
  clientOptimizationJSX + '\n        {/* Section 7: FAQs */}'
);

fs.writeFileSync(path.join(__dirname, 'build12kHomepage.js'), scriptContent, 'utf8');
console.log('build12kHomepage.js updated with scenario details and client optimizations!');
