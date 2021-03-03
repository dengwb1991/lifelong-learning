const HtmlWebpackPlugin = require('html-webpack-plugin')

const conditionalCompiler = {
  loader: 'js-conditional-compile-loader',
  options: {
      isDebug: process.env.NODE_ENV === 'development', // optional, this expression is default
      envTest: process.env.ENV_CONFIG === 'test', // any prop name you want, used for /* IFTRUE_evnTest ...js code... FITRUE_evnTest */
      myFlag: process.env.npm_config_myflag, // enabled when running command: `npm run build --myflag`
  }
}

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
        test: /\.js$/i,
        use: [conditionalCompiler],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}