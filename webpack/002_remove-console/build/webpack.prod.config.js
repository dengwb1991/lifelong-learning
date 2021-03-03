const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const terserPlugin = new TerserPlugin({
  cache: true,
  parallel: true,
  extractComments: true,
  terserOptions: {
    compress: {
      warnings: false,
      drop_console: true,
      drop_debugger: true,
      pure_funcs: ['console.log'] //移除console.log函数
    }
  }
})

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [terserPlugin]
  },
  plugins: [
    new CleanWebpackPlugin(),
  ]
}