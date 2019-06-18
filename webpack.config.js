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
    },
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist")
  },
};
