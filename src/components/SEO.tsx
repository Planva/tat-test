import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const SITE_NAME = 'TAT Test Online';
const BASE_URL = 'https://www.tat-test.com';
const LOGO_URL = `${BASE_URL}/logo.svg`;
const DEFAULT_IMAGE = 'https://images.tat-test.com/tat-images1.jpg';
const SUPPORTED_LANGS = ['en'] as const;

const OG_LOCALE_MAP: Record<(typeof SUPPORTED_LANGS)[number], string> = {
  en: 'en_US'
};

const BREADCRUMB_LABELS: Record<string, string> = {
  'tat-test-online': 'Take the TAT Test',
  'tat-test-results': 'TAT Test Results',
  'tat-test-privacy': 'Privacy Policy',
  'tat-test-about': 'About the TAT Test',
  'tat-test-cards': 'TAT Test Cards',
  'tat-test-research': 'TAT Test Research',
  terms: 'Terms & Disclaimer',
  contact: 'Contact',
  'editorial-standards': 'Editorial Standards',
  upload: 'Upload TAT Images'
};

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  canonical?: string;
  noIndex?: boolean;
  structuredData?: Array<Record<string, unknown>>;
}

function normalizePath(pathname: string) {
  if (pathname === '/') {
    return '/';
  }

  const langPrefix = pathname.match(/^\/(hi|id|it|ur|fr)(\/.*)?$/);
  if (!langPrefix) {
    return pathname;
  }

  const [, , rest] = langPrefix;
  return rest && rest.length > 0 ? rest : '/';
}

function buildHref(lang: string, basePath: string) {
  if (lang === 'en') {
    return basePath === '/' ? `${BASE_URL}/` : `${BASE_URL}${basePath}`;
  }

  if (basePath === '/') {
    return `${BASE_URL}/${lang}`;
  }

  return `${BASE_URL}/${lang}${basePath}`;
}

export function SEO({
  title,
  description,
  image = DEFAULT_IMAGE,
  type = 'website',
  canonical,
  noIndex = false,
  structuredData = []
}: SEOProps) {
  const { i18n } = useTranslation();
  const location = useLocation();
  const pathname = location.pathname === '' ? '/' : location.pathname;

  const normalizedPath = normalizePath(pathname);
  const resolvedLang =
    (SUPPORTED_LANGS.find((lang) => lang === i18n.language) ?? 'en') as (typeof SUPPORTED_LANGS)[number];

  const currentUrl = `${BASE_URL}${pathname === '/' ? '/' : pathname}`;
  const canonicalUrl = canonical ?? currentUrl;
  const ogLocale = OG_LOCALE_MAP[resolvedLang] ?? 'en_US';
  const fullTitle = `${title} | ${SITE_NAME}`;

  const actualSegments =
    pathname === '/' ? [] : pathname.split('/').filter((segment) => segment.length > 0);

  const breadcrumbListElements: Array<Record<string, unknown>> = [];
  const accumulatedSegments: string[] = [];

  actualSegments.forEach((segment) => {
    accumulatedSegments.push(segment);
    if ((SUPPORTED_LANGS as readonly string[]).includes(segment)) {
      return;
    }

    const label =
      BREADCRUMB_LABELS[segment] ??
      segment
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, (letter) => letter.toUpperCase());

    breadcrumbListElements.push({
      '@type': 'ListItem',
      position: breadcrumbListElements.length + 2,
      name: label,
      item: `${BASE_URL}/${accumulatedSegments.join('/')}`
    });
  });

  const breadcrumbStructuredData =
    breadcrumbListElements.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: BASE_URL
            },
            ...breadcrumbListElements
          ]
        }
      : null;

  const baseStructuredData =
    type === 'article'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          description,
          inLanguage: resolvedLang,
          mainEntityOfPage: canonicalUrl,
          author: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: BASE_URL
          },
          publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: {
              '@type': 'ImageObject',
              url: LOGO_URL
            }
          },
          image: [
            {
              '@type': 'ImageObject',
              url: image
            }
          ]
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: title,
          description,
          inLanguage: resolvedLang,
          url: canonicalUrl
        };

  const structuredDataPayload = [baseStructuredData, ...structuredData];

  if (breadcrumbStructuredData) {
    structuredDataPayload.push(breadcrumbStructuredData);
  }

  return (
    <Helmet
      htmlAttributes={{ lang: resolvedLang }}
      title={fullTitle}
      defaultTitle={`${SITE_NAME} – Thematic Apperception Test`}
    >
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={ogLocale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={fullTitle} />

      <link rel="canonical" href={canonicalUrl} />
      {SUPPORTED_LANGS.map((lang) => {
        const href = buildHref(lang, normalizedPath);
        return <link rel="alternate" hrefLang={lang} href={href} key={lang} />;
      })}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={buildHref('en', normalizedPath)}
      />

      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="googlebot" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />

      {structuredDataPayload.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </Helmet>
  );
}
