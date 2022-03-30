const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const CustomPlugin = require('../plugins/addModePlugin.js')

module.exports = {
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      IS_DEV: JSON.stringify(false)
    }),
    new CustomPlugin({
      env: 'production'
    })
  ]
}