const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require("path")

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          // loader: 'ploy-loader',
          loader: 'polymorphism-loader',
          options: {
            mode: 'prod'
          }
        }, 'babel-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  resolveLoader: {
    modules: [
      path.resolve(__dirname, "../node_modules"),
      path.resolve(__dirname, "../loaders"),
    ],
  },
}