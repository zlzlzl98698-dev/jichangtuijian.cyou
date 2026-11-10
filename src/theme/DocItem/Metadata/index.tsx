import React, {type ReactNode} from 'react';
import Metadata from '@theme-original/DocItem/Metadata';
import type MetadataType from '@theme/DocItem/Metadata';
import type {WrapperProps} from '@docusaurus/types';
import Head from '@docusaurus/Head';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

type Props = WrapperProps<typeof MetadataType>;

export default function MetadataWrapper(props: Props): ReactNode {
  const {metadata} = useDoc();
  
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    'headline': metadata.title,
    'description': metadata.description,
    'url': `https://jichangtuijian.cyou${metadata.permalink}`,
    'inLanguage': 'zh-CN',
    'datePublished': '2026-01-01T08:00:00+08:00',
    'dateModified': '2026-11-10T12:00:00+08:00',
    'author': {
      '@type': 'Organization',
      'name': '机场 cyou 网络可观测实验室',
      'url': 'https://jichangtuijian.cyou'
    },
    'publisher': {
      '@type': 'Organization',
      'name': '机场 cyou',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://jichangtuijian.cyou/img/avatar.png'
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://jichangtuijian.cyou${metadata.permalink}`
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': '首页',
        'item': 'https://jichangtuijian.cyou/'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': metadata.title,
        'item': `https://jichangtuijian.cyou${metadata.permalink}`
      }
    ]
  };

  return (
    <>
      <Metadata {...props} />
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Head>
    </>
  );
}
