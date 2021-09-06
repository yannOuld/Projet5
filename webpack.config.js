const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
module.exports = module.exports = {
  mode: "production",
  entry: {
    app: "./cart.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};