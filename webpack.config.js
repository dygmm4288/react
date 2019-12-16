const path = require("path");
const webpack = require("webpack");
module.exports = {
	name: "word-relay-setting",
	mode: "development", //실서비스는: production
	devtool: "eval",
	resolve: {
		extensions: [".js", ".jsx"]
	}, //알아서 찾아줌

	/* entry output 이 제일 중요 */
	entry: {
		app: [
			"./client",
			"babel-polyfill"
			/* "./component/nomad/App.css",
			"./component/nomad/Movie.css" */
		]
	}, //입력
	module: {
		//loaders
		rules: [
			{
				test: /\.jsx?/,
				loader: "babel-loader",
				options: {
					presets: [
						[
							"@babel/preset-env",
							{
								targets: {
									browsers: [
										"> 5% in KR",
										"last 2 chrome versions"
									]
								},
								debug: true
							}
						],
						"@babel/preset-react"
					],
					plugins: [
						"@babel/plugin-proposal-class-properties",
						"react-hot-loader/babel",
						"@babel/plugin-transform-regenerator"
					]
				}
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			}
		]
	},
	plugins: [new webpack.LoaderOptionsPlugin({ debug: true })],
	output: {
		path: __dirname,
		filename: "app.js"
	} // 출력
};
