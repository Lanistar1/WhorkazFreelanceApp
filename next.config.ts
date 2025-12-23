// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;



import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // This setting tells Next.js to trust the Cloudinary domain
    // for image optimization and use with the <Image> component.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // 'port' and 'pathname' can be left empty for broad access
        port: '',
        pathname: '/**', 
      },
    ],
  },
};

export default nextConfig;