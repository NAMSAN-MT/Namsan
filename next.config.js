/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  compiler: { styledComponents: true },
  webpack(config) {
    // This repo consumes every SVG as a URL string (<img src>, css url(...)),
    // NOT as a React component — so emit SVGs as static asset URLs.
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.toString().includes('svg'),
    );
    if (fileLoaderRule) fileLoaderRule.exclude = /\.svg$/i;
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      type: 'asset/resource',
    });
    return config;
  },
};
