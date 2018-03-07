/**
 * @component webpack.dev.js
 * @description 开发环境配置
 * @time 2018/3/6
 * @author JOKER XU
 */
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.js');

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = merge(base, {
  output: {
	filename: 'static/js/[name].js', //
	path: resolve('dist'), // 输出的文件地址
	publicPath: 'static'
  },
  devtool: 'inline-source-map',
  module: {
	rules: [
	  {
		test: /\.css$/,
		use: ["style-loader", "css-loader"]
	  },
	  {
		test: /\.less$/,
		use: ["style-loader", "css-loader", "less-loader"]
	  },
	]
  },
  devServer: {
	contentBase: './dist',
	compress: true,
	port: 9000,
	historyApiFallback: true,//不跳转
	inline: true//实时刷新
  },
  plugins: [
	new webpack.NamedModulesPlugin(),
	new webpack.HotModuleReplacementPlugin()
  ],
});