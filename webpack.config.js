const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'main.js',
    publicPath: "/",
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    publicPath: '/'
  },
  plugins: [new CopyWebpackPlugin([
    "src/index.html",
    "src/static"
  ])]
};
