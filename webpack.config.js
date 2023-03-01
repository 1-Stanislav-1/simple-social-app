const path = require("path");

module.exports = {
	mode: "development",
	entry: "./index.jsx",
	output: {
		path: path.resolve(__dirname, "./"),
		filename: "script.js"
	},
	devServer: {
		historyApiFallback: true,
		static: {
			directory: path.join(__dirname, "/"),
		},
		port: 8081,
		open: true
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader"
				]
			},
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-react"]
				}
			}
		]
	}
}
