const isDev                     = process.env.NODE_ENV === 'development';
const webpack                   = require("webpack");
const path                      = require('path');
const glob                      = require('glob');
const HTMLWbpackPlugin          = require('html-webpack-plugin');
const {CleanWebpackPlugin}      = require('clean-webpack-plugin');
const CopyWebpackPlugin         = require('copy-webpack-plugin');
const MiniCssExtractPlugin      = require('mini-css-extract-plugin');
const CssMinimizerPlugin        = require("css-minimizer-webpack-plugin");
const BeautifyHtmlWebpackPlugin = require('beautify-html-webpack-plugin');
const TerserPlugin              = require('terser-webpack-plugin');
const dotenv                    = require('dotenv').config({path: path.join(__dirname, isDev ? '.env' : '.env.prod')});

const getEnvs =
{
	names()
	{
		return Object.keys(dotenv.parsed);
	},
	list()
	{
		let output = {};

		for(let key in dotenv.parsed)
			output['process.env.' + key] = dotenv.parsed[key];

		return JSON.stringify(output);
	},
};

const outputDir = isDev ? '_dev' : 'build';
const plugins   = [];
const rules     = [];

const htmlCompiler = glob.sync('src/pages/*.twig').map((filePath) =>
{
	let filename = filePath.replace(/.+\//, '');

	return new HTMLWbpackPlugin({
		filename: filename.replace('twig', 'html'),
		template: filePath.replace('src', '.'),
		inject  : 'body',
		minify  : false,
		js      : isDev ? ['./main.js', './critical.js'] : ['./js/main.js', './js/critical.js'],
	});
});

plugins.push(htmlCompiler);

if(!isDev)
{
	plugins.push(new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: ['!pages-list/*.*', '!pages-list']}));

	rules.push(
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options:
				{
					presets:
					[
						'@babel/preset-env',
					]
				}
			}
		}
	);
}

module.exports = {
	target: ['web', 'es5'],
	mode: 'production',
	stats: 'errors-warnings',
	context: path.resolve(__dirname, 'src'),
	entry:
	{
		critical: path.resolve(__dirname, 'src/assets/js/critical.js'),
		main: path.resolve(__dirname, 'src/assets/js/main.ts'),
	},
	output: {
		path: path.resolve(__dirname, outputDir),
		filename: 'js/[name].js',
		chunkFormat: 'module',
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
				{
					from: path.resolve(__dirname, 'src/assets/img'),
					to: path.resolve(__dirname, outputDir + '/img'),
				},
				{
					from: path.resolve(__dirname, 'src/requests'),
					to: path.resolve(__dirname, outputDir + '/requests'),
				},
			]
		}),
		new webpack.ProvidePlugin({
			$     : 'jquery',
			'$'   : 'jquery',
			jquery: 'jquery',
			jQuery: 'jquery',
		}),
		new webpack.DefinePlugin({
			...getEnvs.list()
		}),
		new webpack.EnvironmentPlugin(getEnvs.names()),
	].concat(...plugins),
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
								'src'    : path.resolve(__dirname, 'src'),
								'blocks' : path.resolve(__dirname, 'src/blocks'),
								'assets' : path.resolve(__dirname, 'src/assets'),
								'layouts': path.resolve(__dirname, 'src/layouts'),
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
						options:
						{
							url: false,
						},
					},
					{
						loader: 'sass-loader',
						options:
						{
							additionalData: `$img: "${process.env.CSS_IMG}"; $svg: "${process.env.CSS_SVG}"; $fonts: "${process.env.CSS_FONTS}";`
						}
					},
				],
			},
			{
				test: /\.(png|jpe?g|webp|git|svg|)$/i,
				use:
				[
					{
						loader: `img-optimize-loader`,
						options:
						{
							name: '[path][name].[ext]',
							compress:
							{
								webp:
								{
									quality: 100,
								},
								disableOnDevelopment: true
							}
						},
					},
				],
			},
			{
				test: /\.tsx?$/,
				use:
				[
					'babel-loader',
					'ts-loader',
				],
				exclude: /node_modules/,
			},
		].concat(rules),
	},
	resolve:
	{
		alias:
		{
			'@' : path.resolve(__dirname, 'src'),
			'@a': path.resolve(__dirname, 'src/assets'),
			'@b': path.resolve(__dirname, 'src/blocks'),
			'@p': path.resolve(__dirname, 'src/pages'),
		},
		extensions: ['.tsx', '.ts', '.js'],
	},
	optimization:
	{
		minimize : !isDev,
		minimizer:
		[
			new TerserPlugin({
				parallel: true,
				extractComments: false,
				terserOptions:
				{
					ecma           : undefined,
					parse          : {},
					compress       : false,
					mangle         : false,
					module         : false,
					output         : null,
					format         : {comments: false},
					toplevel       : false,
					nameCache      : null,
					ie8            : false,
					keep_classnames: true,
					keep_fnames    : true,
					safari10       : true,
				},
			}),
		]
	},
	devServer:
	{
		port: 3000,
		hot : !isDev,
		historyApiFallback:
		{
			index: '/pages/'
		}
	},
};