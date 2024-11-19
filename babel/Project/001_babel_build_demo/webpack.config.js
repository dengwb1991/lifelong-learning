const path = require('path');

module.exports = {
  entry: './src/index.js', // 入口文件
  output: {
    filename: 'bundle.js', // 输出文件名
    path: path.resolve(__dirname, 'dist') // 输出目录
  },
  module: {
    rules: [
      {
        test: /\.js$/, // 匹配 .js 文件
        use: 'babel-loader', // 使用 Babel 进行转译
        exclude: /node_modules/ // 不转译 node_modules 目录下的代码
      }
    ]
  }
};