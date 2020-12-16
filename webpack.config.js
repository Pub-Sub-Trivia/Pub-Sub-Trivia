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
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: true
      }
    }
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
      template: "./client/index.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
