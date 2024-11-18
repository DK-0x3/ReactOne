import {IBuildOptions} from "./types/config";
import {buildPlugins} from "./buildPlugins";
import {buildLoaders} from "./buildLoaders";
import {buildResolvers} from "./buildResolvers";
import webpack from "webpack";
import {buildDevServer} from "./buildDevServer";

export function buildWebpackConfig(options: IBuildOptions): webpack.Configuration {
	const {paths, mode, isDev} = options;

	return {
		mode,
		devServer: isDev ? buildDevServer(options): undefined,
		entry: paths.entry,
		output: {
			filename: "[name].[contenthash].js",
			path: paths.build,
			clean: true,
		},
		devtool: isDev ? 'inline-source-map' : undefined,
		plugins: buildPlugins(options),
		module: {
			rules: buildLoaders(options),
		},
		resolve: buildResolvers(options),
	}
}
