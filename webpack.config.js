const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { DefinePlugin } = require('webpack');

const rootDir = process.cwd()

module.exports = function (config) {
  const isProduction = !!config.production
  process.env.isProduction = isProduction;

  return {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? undefined : 'source-map',
    context: rootDir,
    entry: {
      'index': './src/index.js'
    },
    output: {
      filename: 'bundle.[chunkhash:6].js',
      path: path.resolve(__dirname, './build'),
      publicPath: isProduction ? './' : '/'
    },
    externals: isProduction ? {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'axios': 'axios',
      '@solana/web3.js': 'solanaWeb3',
      'fabric': 'fabric'
    } : {},
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: ['babel-loader'],
          exclude: /node_modules/
        }
      ]
    },
    devServer: {
      hot: true
    },
    resolve: {
      fallback: { "crypto": false, "assert": false }
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin(
        { extractComments: false }
      )],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            filename: '[id]_vendors.js'
          },
        },
      }
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(rootDir, './index.html'),
        name: 'cwm-banner'
      }),
      new DefinePlugin({
        TITLE: JSON.stringify('cwm-banner')
      }),
      !isProduction && new ReactRefreshWebpackPlugin()
    ].filter(Boolean)
  }
}