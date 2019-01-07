const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const outputDir = path.join(__dirname, "dist/");
const isProd = process.env.NODE_ENV === "production";

module.exports = {
	entry: "./lib/es6/src/Index.bs.js",
	mode: isProd ? "production" : "development",
	output: {
		path: outputDir,
		filename: "Index.js"
	},
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"]
	},
	module: {
		rules: [{
			test: /\.tsx?$/,
			loader: "ts-loader"
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "src/index.html",
			inject: false
		})
	],
	devServer: {
		compress: true,
		contentBase: outputDir,
		port: process.env.PORT || 3000,
		historyApiFallback: true
	}
};
