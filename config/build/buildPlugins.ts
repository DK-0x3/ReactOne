import HTMLWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import { IBuildOptions } from './types/config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export function buildPlugins({ paths, isDev }: IBuildOptions): webpack.WebpackPluginInstance[] {
	const plugins = [
		new HTMLWebpackPlugin({
			template: paths.html,
		}),
		new webpack.ProgressPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[contenthash].css',
			chunkFilename: 'css/[name].[contenthash].css',
		}),
		new webpack.DefinePlugin({
			__IS_DEV__: JSON.stringify(isDev),
		})
	];

	if (isDev) {
		plugins.push(new webpack.HotModuleReplacementPlugin());
		plugins.push(new BundleAnalyzerPlugin({ openAnalyzer: false }));
	}

	return plugins;
}
