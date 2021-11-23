const path = require("path");
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.cjs',
    clean: true,
  },
  optimization: {
    nodeEnv: 'production'
  },
  target: 'node',
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  mode: "production",
};
