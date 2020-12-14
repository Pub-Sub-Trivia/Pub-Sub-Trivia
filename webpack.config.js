const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./client/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "bundle.js",
  },
  mode: process.env.NODE_ENV,
  devServer: {
    host: "localhost",
    port: 8080,
    // Match the output path
    contentBase: path.resolve(__dirname, "dist"),
    // Enable HMR on the devServer
    hot: true,
    // Match the output 'publicPath'
    publicPath: "/",
    // fallback to the root for other urls
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:3000",
      secure: false,
    },
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings (third)
          "style-loader",
          // Translates CSS into CommonJS (second)
          "css-loader",
          // Compiles Sass to CSS (first)
          "sass-loader",
        ],
      },
      {
        test: /\.(png|ico|jpe?g|gif|svg)$/i,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[hash].[ext]",
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
