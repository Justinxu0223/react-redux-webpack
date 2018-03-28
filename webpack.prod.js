/**
 * @component webpack.prod.js
 * @description 生产环境
 * @time 2018/3/6
 * @author JOKER XU
 */
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 分离css
const ManifestPlugin = require('webpack-manifest-plugin');
const base = require('./webpack.base.js');

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = merge(base, {
  output: {
    filename: 'static/js/[name].[hash:7].js', //
    path: resolve('dist'), // 输出的文件地址
    publicPath: './'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: [/node_modules/, resolve('src/styles')],
        loader: ExtractTextPlugin.extract({
          fallback: {
            loader: require.resolve('style-loader'),
            options: {
              hmr: false,
            },
          },
          use: [
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                minimize: true,
                sourceMap: true,
                modules: true,
                localIdentName: "[local]_[hash:base64:8]"
              },
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                ident: 'postcss',
                sourceMap: true,
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009',
                  }),
                ],
              },
            },
          ],
        }),
      },
      {
        test: /\.less$/,
        exclude: [/node_modules/, resolve('src/styles')],
        loader: ExtractTextPlugin.extract({
          fallback: {
            loader: require.resolve('style-loader'),
            options: {
              hmr: false,
            },
          },
          use: [
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                minimize: true,
                sourceMap: true,
                modules: true,
                localIdentName: "[local]_[hash:base64:8]"
              },
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                ident: 'postcss',
                sourceMap: true,
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009',
                  }),
                ],
              },
            },
            {
              loader: require.resolve('less-loader'),
              options: {
                importLoaders: 2,
                minimize: true,
                sourceMap: true,
              },
            },
          ],
        }),
        // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
      },
      // 对antd-design 和src/styles全局样式配置
      {
        test: /\.css$/,
        include: [/node_modules/, resolve('src/styles')],
        loader: ExtractTextPlugin.extract({
          fallback: {
            loader: require.resolve('style-loader'),
            options: {
              hmr: false,
            },
          },
          use: [
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                minimize: true,
                sourceMap: true,
              },
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                ident: 'postcss',
                sourceMap: true,
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009',
                  }),
                ],
              },
            },
          ],
        }),
      },
      {
        test: /\.less$/,
        include: [/node_modules/, resolve('src/styles')],
        loader: ExtractTextPlugin.extract({
          fallback: {
            loader: require.resolve('style-loader'),
            options: {
              hmr: false,
            },
          },
          use: [
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                minimize: true,
                sourceMap: true,
              },
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                ident: 'postcss',
                sourceMap: true,
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009',
                  }),
                ],
              },
            },
            {
              loader: require.resolve('less-loader'),
              options: {
                importLoaders: 2,
                minimize: true,
                sourceMap: true,
              },
            },
          ],
        }),
        // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
      },
    ]
  },
  plugins: [
    new webpack.BannerPlugin('上海市******版权所有，翻版必究'),
    new ManifestPlugin({
      fileName: 'asset-manifest.json', // 生成映射
    }),
    new webpack.optimize.UglifyJsPlugin({ // 压缩JS
      compress: {
        warnings: false,
        comparisons: false,
      },
      mangle: {
        safari10: true,
      },
      output: {
        comments: false,
        ascii_only: true,
      },
      sourceMap: true,
    }),
    new ExtractTextPlugin({
      filename: "static/css/[name].[hash:7].css",
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
});
