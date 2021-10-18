const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const configureWebpack = {}

if (process.env.NODE_ENV === 'production') {
  configureWebpack.externals = {
    'mand-mobile': 'mand-mobile'
  }
  configureWebpack.plugins = [new BundleAnalyzerPlugin()]
}

module.exports = {
  configureWebpack
}