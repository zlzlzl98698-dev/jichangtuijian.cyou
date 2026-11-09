import React from 'react';

interface UnlockMatrixProps {
  brandName: string;
  chatgpt?: 'yes' | 'partial' | 'no';
  claude?: 'yes' | 'partial' | 'no';
  gemini?: 'yes' | 'partial' | 'no';
  netflix?: 'yes' | 'partial' | 'no';
  disney?: 'yes' | 'partial' | 'no';
  youtube?: 'yes' | 'partial' | 'no';
  tiktok?: 'yes' | 'partial' | 'no';
}

export default function UnlockMatrix({
  brandName,
  chatgpt = 'yes',
  claude = 'yes',
  gemini = 'partial',
  netflix = 'yes',
  disney = 'yes',
  youtube = 'yes',
  tiktok = 'yes'
}: UnlockMatrixProps): JSX.Element {
  const renderBadge = (status: 'yes' | 'partial' | 'no', label: string) => {
    let bg = 'rgba(16, 185, 129, 0.15)';
    let color = '#34d399';
    let icon = '🟢 支持';
    if (status === 'partial') {
      bg = 'rgba(245, 158, 11, 0.15)';
      color = '#fbbf24';
      icon = '🟡 视节点';
    } else if (status === 'no') {
      bg = 'rgba(239, 68, 68, 0.15)';
      color = '#f87171';
      icon = '🔴 不支持';
    }

    return (
      <div style={{
        padding: '10px 14px',
        borderRadius: '8px',
        background: bg,
        border: `1px solid ${color}33`,
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
      }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{label}</span>
        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: color }}>{icon}</span>
      </div>
    );
  };

  return (
    <div style={{
      background: '#0b1329',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '10px',
      padding: '20px',
      margin: '20px 0'
    }}>
      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f1f5f9', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>⚡ {brandName} · AI 与全球流媒体原生解锁矩阵</span>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '10px'
      }}>
        {renderBadge(chatgpt, 'ChatGPT (OpenAI)')}
        {renderBadge(claude, 'Claude 3.5 Sonnet')}
        {renderBadge(gemini, 'Google Gemini Pro')}
        {renderBadge(netflix, 'Netflix (网飞原创)')}
        {renderBadge(disney, 'Disney+ 跨区')}
        {renderBadge(youtube, 'YouTube 4K Premium')}
        {renderBadge(tiktok, 'TikTok 跨区出海')}
      </div>
      <div style={{ marginTop: '10px', fontSize: '0.72rem', color: '#64748b' }}>
        * 状态基于本实验室在 Windows / macOS 多环境实测。AI 封锁规则动态变动，建议优先使用台湾、新加坡或香港原生节点。
      </div>
    </div>
  );
}
