import React, { useState } from 'react';
import { getAffiliateInfo } from '../data/affiliateLinks';

interface AffiliateButtonProps {
  brandId: string;
  brandName: string;
  coupon?: string;
  size?: 'normal' | 'large';
}

export default function AffiliateButton({
  brandId,
  brandName,
  coupon,
  size = 'normal'
}: AffiliateButtonProps): JSX.Element {
  const info = getAffiliateInfo(brandId);
  const activeCoupon = coupon || info.coupon;
  const [copied, setCopied] = useState(false);

  const copyCoupon = (e: React.MouseEvent) => {
    e.preventDefault();
    if (activeCoupon && activeCoupon !== '暂无') {
      navigator.clipboard.writeText(activeCoupon);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isLarge = size === 'large';

  return (
    <div style={{
      margin: '20px 0',
      padding: isLarge ? '20px' : '16px',
      background: 'rgba(15, 23, 42, 0.7)',
      border: '1px solid rgba(56, 189, 248, 0.3)',
      borderRadius: '10px',
      boxShadow: '0 4px 14px 0 rgba(0, 118, 255, 0.15)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: isLarge ? '1.15rem' : '1rem', color: '#f8fafc', marginBottom: '4px' }}>
            🚀 直达 {brandName} 官方注册通道
          </div>
          {activeCoupon && activeCoupon !== '暂无' && (
            <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              专属优惠码：
              <code style={{
                background: 'rgba(56, 189, 248, 0.15)',
                color: '#38bdf8',
                padding: '2px 8px',
                borderRadius: '4px',
                fontWeight: 700,
                border: '1px dashed #38bdf8'
              }}>
                {activeCoupon}
              </code>
              <button
                onClick={copyCoupon}
                style={{
                  marginLeft: '8px',
                  background: copied ? '#10b981' : '#334155',
                  color: '#ffffff',
                  border: 'none',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  transition: 'background 0.2s'
                }}
              >
                {copied ? '已复制！' : '复制码'}
              </button>
            </div>
          )}
        </div>

        <a
          href={info.url}
          target={info.target}
          rel={info.rel}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isLarge ? '12px 28px' : '9px 20px',
            background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: isLarge ? '1rem' : '0.9rem',
            borderRadius: '8px',
            textDecoration: 'none',
            boxShadow: '0 4px 15px rgba(2, 132, 199, 0.4)',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease'
          }}
        >
          立即前往官网开通 &rarr;
        </a>
      </div>

      <div style={{
        marginTop: '10px',
        fontSize: '0.72rem',
        color: '#64748b',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        paddingTop: '6px'
      }}>
        ℹ️ {info.disclaimer}
      </div>
    </div>
  );
}
