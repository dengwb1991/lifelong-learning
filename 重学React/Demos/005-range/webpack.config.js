const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './index.js',
  optimization: {
    minimize: false
  },
  devServer: {
    hot: true,
    inline: true,
    open: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: '8080',
    compress: true,
    overlay: {
      errors: true,
      warnings: false
    },
    quiet: true,
    clientLogLevel: 'warning',
    progress: true,
    watchOptions: {
      poll: false
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [[
              '@babel/plugin-transform-react-jsx',
              { pragma: 'OwlReact.createElement' }
            ]]
          }
        }
      }
    ]
  },
};