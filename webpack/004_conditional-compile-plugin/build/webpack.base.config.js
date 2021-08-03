const HtmlWebpackPlugin = require('html-webpack-plugin')
const ConditionalCompilePlugin  = require('../plugins/conditional-compile.js')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: [{
          loader: 'ts-loader'
        }],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new ConditionalCompilePlugin({
      values: {
        '_ENV': process.env.TARGET_ENV // 条件编译参数
      }
    })
  ]
}