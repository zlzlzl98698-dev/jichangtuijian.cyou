const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getAllHtmlFiles('build');
console.log('Total HTML files indexed:', htmlFiles.length);

const issues = {
  canonicalMissing: [],
  canonicalNonHttps: [],
  canonicalWrongDomain: [],
  externalAffiliateWithoutNofollow: [],
  allOutboundLinks: [],
  missingH1: [],
  multipleH1: [],
  thinContent: [],
  jsonLdErrors: [],
  jsonLdFound: [],
  gaTrackingIds: new Set(),
  emptyLinks: [],
  internalBrokenLinks: [],
  duplicateTitles: {},
  duplicateDescriptions: {}
};

const domain = 'https://jichangtuijian.cyou';
const existingRoutes = new Set(htmlFiles.map(f => {
  let route = path.relative('build', f).replace(/\\/g, '/');
  if (route.endsWith('index.html')) route = route.slice(0, -10);
  else if (route.endsWith('.html')) route = route.slice(0, -5);
  if (!route.startsWith('/')) route = '/' + route;
  if (!route.endsWith('/') && !path.extname(route)) route = route + '/';
  return route;
}));

for (const f of htmlFiles) {
  const relPath = path.relative('build', f).replace(/\\/g, '/');
  const html = fs.readFileSync(f, 'utf8');

  // 1. Canonical Check
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["'](.*?)["']/i) ||
                         html.match(/<link[^>]*href=["'](.*?)["'][^>]*rel=["']canonical["']/i);
  if (!canonicalMatch) {
    issues.canonicalMissing.push(relPath);
  } else {
    const cUrl = canonicalMatch[1];
    if (!cUrl.startsWith('https://')) issues.canonicalNonHttps.push({ file: relPath, url: cUrl });
    if (!cUrl.startsWith(domain)) issues.canonicalWrongDomain.push({ file: relPath, url: cUrl });
  }

  // 2. Title & Description Check
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/i);
  if (titleMatch) {
    const title = titleMatch[1].trim();
    if (!issues.duplicateTitles[title]) issues.duplicateTitles[title] = [];
    issues.duplicateTitles[title].push(relPath);
  }

  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["'](.*?)["']/i) ||
                    html.match(/<meta[^>]*content=["'](.*?)["'][^>]*name=["']description["']/i);
  if (descMatch) {
    const desc = descMatch[1].trim();
    if (!issues.duplicateDescriptions[desc]) issues.duplicateDescriptions[desc] = [];
    issues.duplicateDescriptions[desc].push(relPath);
  }

  // 3. H1 tags
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  if (h1Matches.length === 0 && !relPath.includes('404')) issues.missingH1.push(relPath);
  if (h1Matches.length > 1) issues.multipleH1.push({ file: relPath, count: h1Matches.length });

  // 4. External links and rel attributes
  const linkMatches = [...html.matchAll(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi)];
  for (const match of linkMatches) {
    const fullTag = match[0];
    const href = match[1];

    if (href.startsWith('http://') || href.startsWith('https://')) {
      if (!href.startsWith(domain)) {
        // Outbound link
        const relMatch = fullTag.match(/rel=["'](.*?)["']/i);
        const rel = relMatch ? relMatch[1] : '';
        const hasNofollow = rel.includes('nofollow');
        const hasSponsored = rel.includes('sponsored');

        // Check if commercial / affiliate / invite / referral
        const isCommercial = href.includes('gsyvipaff') || href.includes('aff') || href.includes('code=') || href.includes('invite') || href.includes('channel') || href.includes('t.me');
        if (isCommercial && (!hasNofollow || !hasSponsored)) {
          issues.externalAffiliateWithoutNofollow.push({ file: relPath, href, rel, tag: fullTag });
        }
        issues.allOutboundLinks.push({ file: relPath, href, rel });
      }
    } else if (href.startsWith('/') && !href.startsWith('/img/') && !href.startsWith('/assets/')) {
      // Internal link check
      let targetRoute = href.split('#')[0].split('?')[0];
      if (!targetRoute.endsWith('/') && !path.extname(targetRoute)) targetRoute += '/';
      // verify if targetRoute exists in existingRoutes
      if (targetRoute !== '/' && !existingRoutes.has(targetRoute)) {
        issues.internalBrokenLinks.push({ source: relPath, target: href });
      }
    }
  }

  // 5. GA / Tracking code
  const gaMatches = [...html.matchAll(/(G-[A-Z0-9]{6,}|UA-[0-9-]+|hm\.baidu\.com)/gi)];
  for (const g of gaMatches) issues.gaTrackingIds.add(g[0]);

  // 6. JSON-LD Schema
  const jsonLdMatches = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const jm of jsonLdMatches) {
    try {
      const parsed = JSON.parse(jm[1]);
      issues.jsonLdFound.push({ file: relPath, type: parsed['@type'] || (parsed['@graph'] ? 'Graph' : 'Unknown') });
    } catch (e) {
      issues.jsonLdErrors.push({ file: relPath, error: e.message });
    }
  }

  // 7. Word count (Chinese characters in body)
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    const cleanText = bodyMatch[1]
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<nav[\s\S]*?<\/nav>/gi, '')
      .replace(/<footer[\s\S]*?<\/footer>/gi, '')
      .replace(/<[^>]+>/g, '');
    const chineseChars = (cleanText.match(/[\u4e00-\u9fa5]/g) || []).length;
    if (chineseChars < 1500 && !relPath.includes('404') && !relPath.includes('search') && !relPath.includes('markdown-page')) {
      issues.thinContent.push({ file: relPath, count: chineseChars });
    }
  }

  // 8. Empty links
  const emptyLinksMatch = [...html.matchAll(/<a\s+[^>]*href=["'](#|javascript:void\(0\);?)["'][^>]*>/gi)];
  if (emptyLinksMatch.length > 0) {
    issues.emptyLinks.push({ file: relPath, count: emptyLinksMatch.length });
  }
}

console.log('--------------------------------------------------');
console.log('AUDIT RESULTS:');
console.log('Missing Canonical count:', issues.canonicalMissing.length);
console.log('Non-HTTPS Canonical count:', issues.canonicalNonHttps.length);
console.log('Wrong Domain Canonical count:', issues.canonicalWrongDomain.length);
console.log('Commercial links WITHOUT nofollow/sponsored:', issues.externalAffiliateWithoutNofollow.length);
if (issues.externalAffiliateWithoutNofollow.length > 0) {
  console.log('Sample Missing Nofollow:');
  issues.externalAffiliateWithoutNofollow.slice(0, 10).forEach(x => console.log('  *', x.file, '->', x.href, '| rel="' + x.rel + '"'));
}
console.log('Total Outbound Links found:', issues.allOutboundLinks.length);
console.log('GA/Tracking IDs detected:', [...issues.gaTrackingIds]);
console.log('JSON-LD Syntax Errors:', issues.jsonLdErrors.length);
console.log('JSON-LD Blocks Found:', issues.jsonLdFound.length);
console.log('Multiple H1 pages:', issues.multipleH1.length);
console.log('Missing H1 pages:', issues.missingH1.length);
console.log('Thin Content (<1500 chars) count:', issues.thinContent.length);
if (issues.thinContent.length > 0) {
  console.log('Sample Thin Content:');
  issues.thinContent.slice(0, 10).forEach(x => console.log('  *', x.file, ':', x.count, 'chars'));
}
console.log('Internal Broken Link candidates:', issues.internalBrokenLinks.length);
if (issues.internalBrokenLinks.length > 0) {
  console.log('Sample Broken Links:');
  issues.internalBrokenLinks.slice(0, 10).forEach(x => console.log('  *', x.source, '->', x.target));
}
console.log('Duplicate Titles (count > 1):');
Object.entries(issues.duplicateTitles).filter(([t, files]) => files.length > 1).forEach(([t, files]) => {
  console.log('  *', t, '-> Used in', files.length, 'files:', files.slice(0, 3));
});
