// eslint-disable-next-line @typescript-eslint/no-var-requires,max-len
const withTM = require('next-transpile-modules')([
  'react-datepicker',
  'react-loader-spinner',
]); // pass the modules you would like to see transpiled



module.exports = withTM({
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
});
