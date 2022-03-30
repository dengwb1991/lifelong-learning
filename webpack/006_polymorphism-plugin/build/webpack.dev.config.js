const webpack = require('webpack')
const AddModePlugin = require('../plugins/addModePlugin.js')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: JSON.stringify(true)
    }),
    new AddModePlugin({
      env: 'production'
    })
  ]
}