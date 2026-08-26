import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const publicRoutes = ['/', '/work/rangers-legends', '/start-a-project'];
const socialImagePath = '/cwt-social-preview.png';

const normalizeSiteUrl = (value) => {
  if (!value) {
    return '';
  }

  const trimmedValue = value.trim().replace(/\/+$/, '');

  if (/^https?:\/\//i.test(trimmedValue)) {
    return trimmedValue;
  }

  return `https://${trimmedValue}`;
};

const createMetadataPlugin = (siteUrl) => ({
  name: 'cwt-metadata',
  transformIndexHtml(html) {
    if (!siteUrl) {
      return html;
    }

    const absoluteSocialImageUrl = `${siteUrl}${socialImagePath}`;
    const homeUrl = `${siteUrl}/`;

    return html
      .replaceAll(`content="${socialImagePath}"`, `content="${absoluteSocialImageUrl}"`)
      .replace(
        '<meta property="og:type" content="website" />',
        `<link rel="canonical" href="${homeUrl}" />\n    <meta property="og:type" content="website" />\n    <meta property="og:url" content="${homeUrl}" />`,
      );
  },
  generateBundle() {
    if (!siteUrl) {
      return;
    }

    const sitemap = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...publicRoutes.map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`),
      '</urlset>',
      '',
    ].join('\n');

    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source: sitemap,
    });
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = normalizeSiteUrl(env.VITE_SITE_URL);

  return {
    plugins: [react(), createMetadataPlugin(siteUrl)],
  };
});
