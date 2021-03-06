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
        exclude: /node_modules/,
        exclude: /tests/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'main.js',
    publicPath: "/project1/",
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    publicPath: '/'
  },
  plugins: [new CopyWebpackPlugin([
    "src/index.html",
    { from: 'src/static/**/*', to: '', transformPath: (targetPath, sourcePath) => targetPath.replace("src", "")},
  ])]
};
