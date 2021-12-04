const webpack                   = require("webpack");
const path                      = require('path');
const glob                      = require('glob');
const HTMLWbpackPlugin          = require('html-webpack-plugin');
const {CleanWebpackPlugin}      = require('clean-webpack-plugin');
const CopyWebpackPlugin         = require('copy-webpack-plugin');
const MiniCssExtractPlugin      = require('mini-css-extract-plugin');
const CssMinimizerPlugin        = require("css-minimizer-webpack-plugin");
const BeautifyHtmlWebpackPlugin = require('beautify-html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const outputDir = isDev ? '_dev' : 'build';

const plugins = [];
const rules = [];

if(!isDev)
{
	plugins.push(new CleanWebpackPlugin());

	rules.push(
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options:
				{
					presets: ['@babel/preset-env']
				}
			}
		}
	);
}

const htmlCompiler = glob.sync('src/pages/**/*.twig').map((filePath) =>
{
	let filename = filePath.replace(/.+\//, '');

	return new HTMLWbpackPlugin({
		filename: 'pages/' + filename.replace('twig', 'html'),
		template: filePath.replace('src', '.'),
		inject: 'body',
		scriptLoading: 'blocking',
		minify: false,
		css: isDev ? ['./main.css', './critical.css'] : ['./css/main.css', './css/critical.css'],
		js: isDev ? ['./main.js', './critical.js'] : ['./js/main.js', './js/critical.js'],
	});
});

module.exports = {
	mode: isDev ? 'development' : 'production',
	context: path.resolve(__dirname, 'src'),
	entry:
	{
		main: path.resolve(__dirname, 'src/assets/js/main.js'),
		critical: path.resolve(__dirname, 'src/assets/js/critical.js'),
	},
	output: {
		path: path.resolve(__dirname, outputDir),
		filename: 'js/[name].js',
	},
	plugins:
	[
		new BeautifyHtmlWebpackPlugin({
			"indent_size": 4,
			"indent_with_tabs": true,
		}),
		new MiniCssExtractPlugin({
			filename: "css/[name].css",
		}),
		new CopyWebpackPlugin({
			patterns:
			[
				{
					from: path.resolve(__dirname, 'src/assets/fonts'),
					to: path.resolve(__dirname, outputDir + '/fonts'),
				},
			]
		})
	].concat(plugins).concat(htmlCompiler),
	module:
	{
		rules:
		[
			{
				test: /\.twig$/,
				use:
				[
					'raw-loader',
					{
						loader: 'twig-html-loader',
						options:
						{
							namespaces:
							{
								'src': path.resolve(__dirname, 'src'),
								'blocks': path.resolve(__dirname, 'src/blocks'),
							}
						}
					},
				]
			},
			{
				test: /\.scss$/,
				use:
				[
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							url: false
						}
					},
					'sass-loader',
				],
			},
		].concat(rules),
	},
	resolve:
	{
		alias:
		{
			'@': path.resolve(__dirname, 'src')
		}
	},
	devServer:
	{
		// host: '0.0.0.0',
		// useLocalIp: true,
		port: 3000,
		hot: true,
	},
	// watch: isDev,
};