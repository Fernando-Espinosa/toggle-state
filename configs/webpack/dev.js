// development config
const { merge } = require('webpack-merge');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: './index.tsx', // the entry point of our app
  devServer: {
    historyApiFallback: true, // fixes error 404-ish errors when using react router :see this SO question: https://stackoverflow.com/questions/43209666/react-router-v4-cannot-get-url
    host: '0.0.0.0',
    port: 8080,
    allowedHosts: 'all',
    devMiddleware: { writeToDisk: true },
    hot: true, // enable HMR on the server
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [new ReactRefreshPlugin()],

  optimization: {
    runtimeChunk: 'single',
  },
});
