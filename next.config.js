/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, context) => {
        // for windows hot reload 
        if(process.env.NEXT_WEBPACK_USEPOLLING ==="1") {
          config.watchOptions = {
            ignored: ['**/node_modules', '**/package-lock.json'],
            poll: 400,
            aggregateTimeout: 300
          }
        }
        return config
      },
};
module.exports = nextConfig;
