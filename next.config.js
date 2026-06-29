/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',
  trailingSlash: true,
  // Lint is a dev/CI concern, not a build gate — the project's ESLint config is
  // not wired for Next's build-time linting. Run `yarn lint` separately.
  eslint: { ignoreDuringBuilds: true },
  images: {
    // 'unoptimized' REMOVED. Do NOT set loaderFile — next-image-export-optimizer
    // ships its own custom loader internally; setting loaderFile would break it.
    loader: 'custom',
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  transpilePackages: ['next-image-export-optimizer'],
  compiler: { styledComponents: true },
  env: {
    nextImageExportOptimizer_imageFolderPath: 'public/images',
    nextImageExportOptimizer_exportFolderPath: 'out',
    nextImageExportOptimizer_quality: '75',
    nextImageExportOptimizer_storePicturesInWEBP: 'true',
    nextImageExportOptimizer_generateAndUseBlurImages: 'true',
    nextImageExportOptimizer_remoteImageCacheTTL: '86400',
  },
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
