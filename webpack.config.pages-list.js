const webpack                   = require("webpack");
const path                      = require('path');
const glob                      = require('glob');
const HTMLWbpackPlugin          = require('html-webpack-plugin');
const BeautifyHtmlWebpackPlugin = require('beautify-html-webpack-plugin');
const fs                        = require('fs');

const isDev = process.env.NODE_ENV === 'development';
const outputDir = isDev ? '_dev' : 'build';
const pagesList = require('./src/pages.json').reduce( (list, el) =>
{
	el.name = el.name ? el.name + ' / ' + el.filename + '.html' : el.filename + '.html';
	return list.concat(el);
}, []);

module.exports = {
	entry: path.resolve(__dirname, 'src/templates/pages-list.js'),
	stats: 'errors-warnings',
	output:
	{
		path: path.resolve(__dirname, outputDir + '/pages-list/'),
		filename: 'pages-list.js',
	},
	plugins:
	[
		new HTMLWbpackPlugin({
			filename: 'index.html',
			template: 'src/templates/pages-list.twig',
			minify: false,
		}),
		new BeautifyHtmlWebpackPlugin({
			"indent_size": 4,
			"indent_with_tabs": true,
		}),
	],
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
							data: {pagesList},
						},
					},
				]
			},
		]
	},
};
