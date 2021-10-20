import babel from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import postcss from "rollup-plugin-postcss"
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import vue from 'rollup-plugin-vue'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const postcssPlugins = [autoprefixer()]

const plugins = [
  postcss({
    plugins: postcssPlugins,
    // extract: 'css/index.css'
  }),
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

if (process.env.NODE_ENV !== 'production') {
  plugins.push(serve({
    contentBase: '', 
    port: 8020
  }), livereload('dist'))
}

export default {
  input: "./src/index.js",
  output: [
    {
      file: './dist/my-lib-umd.js',
      format: 'umd',
      name: 'myLib'
    },
    {
      file: './dist/my-lib-es.js',
      format: 'es'
    },
    {
      file: './dist/my-lib-cjs.js',
      format: 'cjs'
    }
  ],
  external:[  //外部库， 使用'umd'文件时需要先引入这个外部库
    'vue'
  ],
  plugins,
}