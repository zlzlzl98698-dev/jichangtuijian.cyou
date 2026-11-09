import React from 'react';
import { AirportBrand, BRAND_MAP } from '../data/brands';

interface ObservatoryCardProps {
  brand?: AirportBrand;
  brandId?: string;
}

export default function ObservatoryCard({ brand, brandId }: ObservatoryCardProps): JSX.Element | null {
  const activeBrand = brand || (brandId ? BRAND_MAP.get(brandId) : undefined);
  if (!activeBrand) return null;

  const isMeasured = activeBrand.dataStatus === 'measured';
  const statusColor = isMeasured ? '#10b981' : '#f59e0b';
  const statusLabel = isMeasured ? 'Measured Data (实测采集)' : 'Vendor Spec (官方标称)';

  return (
    <div style={{
      background: 'linear-gradient(145deg, #0d1527 0%, #111e38 100%)',
      border: '1px solid rgba(56, 189, 248, 0.2)',
      borderRadius: '12px',
      padding: '24px',
      margin: '24px 0',
      color: '#e2e8f0',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace'
    }}>
      {/* Header bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        paddingBottom: '14px',
        marginBottom: '18px',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            display: 'inline-block',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: statusColor,
            boxShadow: `0 0 10px ${statusColor}`
          }}></span>
          <span style={{ fontWeight: 700, fontSize: '1.15rem', color: '#f8fafc', letterSpacing: '0.02em' }}>
            {activeBrand.name} · 网络可观测监控报告
          </span>
        </div>
        <span style={{
          fontSize: '0.75rem',
          padding: '4px 10px',
          borderRadius: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          color: statusColor,
          border: `1px solid ${statusColor}44`,
          fontWeight: 600,
          textTransform: 'uppercase'
        }}>
          {statusLabel}
        </span>
      </div>

      {/* Metric Highlights */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>起步资费</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8' }}>{activeBrand.startingPrice}</div>
        </div>
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>起步流量</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#a78bfa' }}>{activeBrand.startingTraffic}</div>
        </div>
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>骨干线路</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#34d399', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{activeBrand.lines.split('，')[0]}</div>
        </div>
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>核心协议</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#f43f5e' }}>{activeBrand.protocols.join(' / ')}</div>
        </div>
      </div>

      {/* Speedtest Rows */}
      {activeBrand.speedData && activeBrand.speedData.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', marginBottom: '8px', letterSpacing: '0.05em' }}>
            REGIONAL LATENCY & THROUGHPUT (节点实测吞吐)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activeBrand.speedData.map((s, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                background: 'rgba(15, 23, 42, 0.4)',
                borderRadius: '6px',
                borderLeft: '3px solid #38bdf8',
                fontSize: '0.85rem'
              }}>
                <span style={{ fontWeight: 600, color: '#f1f5f9' }}>{s.region}</span>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <span style={{ color: '#cbd5e1' }}>延迟: <strong style={{ color: '#34d399' }}>{s.latency}</strong></span>
                  <span style={{ color: '#cbd5e1' }}>下行: <strong style={{ color: '#38bdf8' }}>{s.download}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer metadata */}
      <div style={{
        fontSize: '0.75rem',
        color: '#64748b',
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        paddingTop: '10px',
        flexWrap: 'wrap',
        gap: '6px'
      }}>
        <span>基准运维核验: {activeBrand.yearOperated} 稳定运营</span>
        <span>可观测实验室评级: {activeBrand.badge}</span>
      </div>
    </div>
  );
}
