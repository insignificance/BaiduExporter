var webpack = require('webpack');
module.exports = {
	context: __dirname + '/src',
	entry: {
		home: './home.js',
		share: './share.js',
		album: './album.js',
		baidu: './baidu.js',
		inject: './inject.js'
	},
	output: {
		path: __dirname + '/BaiduExporter/js',
		filename: '[name].js' // 为上面entry的key值
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin(),
	],
};
