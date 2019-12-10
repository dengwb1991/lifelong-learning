'use strict'
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    app: './src/redux/index.ts',
  },
  output: {
    filename: 'kana-redux.js',
    publicPath: '/',
    path: path.resolve(__dirname, '../dist'),
    library: 'kana-redux',
    libraryTarget: 'umd'
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  optimization: {
    minimize: false,
    splitChunks: {
      chunks: 'all'
    }
  }
}