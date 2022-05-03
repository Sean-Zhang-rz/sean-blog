/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // webpack: (config, options) => {
  //   config.module.rules.push({
  //     test: /\.png$/,
  //     use: [
  //       {
  //         loader: 'file-loader',
  //         options: {
  //           // outputPath:'static',
  //           // publicPath: '_next/static'
  //         }
  //       }
  //     ]
  //   })

  //   return config
  // }
};

module.exports = nextConfig;
