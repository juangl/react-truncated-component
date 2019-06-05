// next.config.js
const { PHASE_PRODUCTION_SERVER } =
  process.env.NODE_ENV === "development"
    ? {}
    : !process.env.NOW_REGION
    ? require("next/constants")
    : require("next-server/constants");

module.exports = (phase, ...rest) => {
  if (phase === PHASE_PRODUCTION_SERVER) {
    // Config used to run in production.
    return {};
  }

  const withPlugins = require("next-compose-plugins");
  const css = require("@zeit/next-css");
  const mdx = require("@zeit/next-mdx");

  const withMDX = mdx({
    extension: /\.(md|mdx)$/,
    options: {
      hastPlugins: [require("@mapbox/rehype-prism")],
    },
  });

  let config = withPlugins([[withMDX], [css]], {
    target: "serverless",
  })(phase, ...rest);

  return config;
};
