const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const FileListPlugin = require('../plugins/fileListPlugin.js')
const webpack = require('webpack')


module.exports = {
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      IS_DEV: JSON.stringify(false)
    }),
    // new FileListPlugin()
  ]
}