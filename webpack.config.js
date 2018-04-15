const path = require('path');
const webpack = require('webpack');
const htmlWebpack = require('html-webpack-plugin');

module.exports = {
	entry: {
		script: './src/script.js'
	}, 
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: '[name].bundle.js'
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader'
			]
		},
		{
			test: /\.js$/,
			exclude: /node_modules/,
		}]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new htmlWebpack({
			template: path.join(__dirname, 'src', 'index.html'),
			inject: 'body'
		})
	]
}