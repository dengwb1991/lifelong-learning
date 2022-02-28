// https://github.com/michael-ciniawsky/postcss-load-config
const browserslist = require('./package.json').browserslist

module.exports = () => {
  const plugins = {
    'postcss-url': {url: 'inline'},
    'cssnano': {
      preset: ['default', {
        zindex: false,
        mergeIdents: false,
        discardUnused: false,
        autoprefixer: false,
        reduceIdents: false,
      }]
    },
    'autoprefixer': { overrideBrowserslist: browserslist }
  }
  return {
    plugins
  }
}