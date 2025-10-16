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
  // Disable image optimization to prevent file mapping issues
  images: {
    unoptimized: true,
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