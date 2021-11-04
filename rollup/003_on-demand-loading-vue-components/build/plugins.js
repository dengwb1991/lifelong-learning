import babel from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import postcss from "rollup-plugin-postcss"
import autoprefixer from 'autoprefixer'
import vue from 'rollup-plugin-vue'

const postcssPlugins = [autoprefixer()]

const plugins = function (config) {

  let postcssDefault = {
    plugins: postcssPlugins
  }
  if (config && config.postcss) {
    postcssDefault = Object.assign(postcssDefault, config.postcss)
  }
  return [
    postcss(postcssDefault),
    vue({
      css: false,
      style: {
        trim: false,
        postcssPlugins
      }
    }),
    babel({
      exclude: '**/node_modules/**',
    }),
    commonjs()
  ]
}

export default plugins