/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.namsanlaw.com',
  generateRobotsTxt: true,
  trailingSlash: true,
  // next-sitemap derives routes from the Next build manifests in `.next`
  // (build-manifest.json + prerender-manifest.json). With output:'export',
  // the prerender-manifest lists every SSG route — all 146 /ko/** and /en/**
  // pages incl. dynamic news/work/member/policy detail routes — so reading
  // `.next` captures the full export. Output is written into the export dir.
  sourceDir: '.next',
  outDir: 'out',
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
