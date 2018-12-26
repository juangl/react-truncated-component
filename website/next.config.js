// next.config.js
const withMDX = require("@zeit/next-mdx")({
  extension: /\.(md|mdx)$/,
});
module.exports = withMDX();
