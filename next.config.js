/* eslint-disable @typescript-eslint/no-var-requires */
const withMDX = require("@next/mdx");

module.exports = withMDX()({
  webpack: function (config) {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: "js-yaml-loader",
    });
    return config;
  },
});
