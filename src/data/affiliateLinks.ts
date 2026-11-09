/**
 * 机场 cyou (jichangtuijian.cyou)
 * 推广链接与合规标准映射表
 * 
 * 合规要求：
 * 1. 统一包含 target="_blank" rel="nofollow sponsored noopener"
 * 2. 标明赞助/推广透明度说明，符合 Google/Bing SEO 准则
 */

import { BRAND_MAP } from './brands';

export interface AffiliateMeta {
  url: string;
  rel: string;
  target: string;
  coupon?: string;
  disclaimer: string;
}

export function getAffiliateInfo(brandId: string): AffiliateMeta {
  const brand = BRAND_MAP.get(brandId);
  const url = brand?.affiliateUrl || 'https://sahude.gsyvipaff.com/#/?code=keqgvT5Y';
  return {
    url,
    rel: 'nofollow sponsored noopener',
    target: '_blank',
    coupon: brand?.coupon,
    disclaimer: '含推广链接，通过链接注册可能为本站带来技术维护佣金，绝不影响用户实际支付价格与享有的折扣权益。'
  };
}
