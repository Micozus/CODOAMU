const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Optimalization plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// PWA plugins
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contentHash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[contentHash].css' }),
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: './src/static/robots.txt', to: './' },
      { from: './src/static/sitemap.xml', to: './' }
    ]),
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true
      },
      favicon: './src/favicon.ico'
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/template2.html',
      filename: 'about.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true
      },
      favicon: './src/favicon.ico'
    }),
    new WebpackPwaManifest({
      name: 'Webpack Starter',
      short_name: 'Webpack',
      description: 'Webpack Babel PWA SASS Starter',
      background_color: '#ffffff',
      theme_color: '#151615',
      display: 'standalone',
      orientation: 'portrait',
      icons: [
        {
          src: './src/icons-manifest/icon-72x72.png',
          type: 'image/png',
          sizes: '72x72'
        },
        {
          src: './src/icons-manifest/icon-96x96.png',
          type: 'image/png',
          sizes: '96x96'
        },
        {
          src: './src/icons-manifest/icon-128x128.png',
          type: 'image/png',
          sizes: '128x128'
        },
        {
          src: './src/icons-manifest/icon-144x144.png',
          type: 'image/png',
          sizes: '144x144'
        },
        {
          src: './src/icons-manifest/icon-152x152.png',
          type: 'image/png',
          sizes: '152x152'
        },
        {
          src: './src/icons-manifest/icon-192x192.png',
          type: 'image/png',
          sizes: '192x192'
        },
        {
          src: './src/icons-manifest/icon-384x384.png',
          type: 'image/png',
          sizes: '384x384'
        },
        {
          src: './src/icons-manifest/icon-512x512.png',
          type: 'image/png',
          sizes: '512x512'
        }
      ]
    }),
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: './src/src-sw.js',
      swDest: 'sw.js'
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  }
});
