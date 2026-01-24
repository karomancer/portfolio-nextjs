/** @type {import('next').NextConfig} */
const path = require("path");
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  // options: {
  //   // If you use remark-gfm, you'll need to use next.config.mjs
  //   // as the package is ESM only
  //   // https://github.com/remarkjs/remark-gfm#install
  //   remarkPlugins: [],
  //   rehypePlugins: [],
  //   // If you use `MDXProvider`, uncomment the following line.
  //   // providerImportSource: "@mdx-js/react",
  // },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  // Configure pageExtensions to include md and mdx
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
  // Enable image optimization with allowed external domains
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.dribbble.com' },
      { protocol: 'https', hostname: 'miro.medium.com' },
      { protocol: 'https', hostname: 'cdn-images-1.medium.com' },
      { protocol: 'https', hostname: '**.medium.com' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/linktree',
        destination: 'https://linktr.ee/chowtime',
        permanent: true,
      },
    ]
  },
};

// Merge MDX config with Next.js config
module.exports = withMDX(nextConfig);