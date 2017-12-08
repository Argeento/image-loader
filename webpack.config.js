const { resolve } = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const packageInfo = require('./package.json')

module.exports = {
	entry: {
		'image-loader': './src/index.js',
		'image-loader.min': './src/index.js'
	},
	output: {
		path: resolve(__dirname, 'dist'),
		filename: '[name].js',
		library: packageInfo.name,
		libraryExport: 'default'
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		new UglifyJsPlugin({
			test: /\.min\.js$/
		})
	]
}
