/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      // Serve the preserved launch/teaser page (public/coming-soon.html)
      // at a clean URL, free of store chrome.
      { source: "/coming-soon", destination: "/coming-soon.html" },
    ];
  },
};

export default nextConfig;
