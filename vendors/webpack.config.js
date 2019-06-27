const path = require("path");

const isProduction =
  typeof NODE_ENV !== "undefined" && NODE_ENV === "production";
const mode = isProduction ? "production" : "development";
const devtool = isProduction ? false : "inline-source-map";

module.exports = {
  entry: "./app.ts",
  target: "node",
  mode,
  devtool,
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      routes: path.resolve(__dirname, './api/routes'),
      controllers: path.resolve(__dirname, './api/controllers'),
      helpers: path.resolve(__dirname, './api/helpers'),
      modules: path.resolve(__dirname, './api/db'),
      service: path.resolve(__dirname, './api/services'),
      types: path.resolve(__dirname, './api/types')
    },
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist")
  },
};
