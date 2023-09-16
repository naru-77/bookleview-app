module.exports = function override(webpackConfig) {
  webpackConfig.resolve.fallback = {
    ...webpackConfig.resolve.fallback, // 既存のfallback設定を継承
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    zlib: require.resolve("browserify-zlib"),
    stream: require.resolve("stream-browserify"),
  };
  return webpackConfig;
};
