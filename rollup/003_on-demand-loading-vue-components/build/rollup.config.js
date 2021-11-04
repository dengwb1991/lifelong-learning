import plugins from './plugins'
import components from './components.config'
import cssnano from 'cssnano'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

// if (process.env.NODE_ENV !== 'production') {
//   plugins.push(serve({
//     contentBase: '', 
//     port: 8020
//   }), livereload('dist'))
// }

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: 'lib/index.umd.js',
        format: 'umd',
        name: 'rollupVue'
      },
      {
        file: 'lib/index.esm.js',
        format: 'es',
        name: 'rollupVue'
      },
      {
        file: 'lib/index.cjs.js',
        format: 'cjs',
        name: 'rollupVue'
      }
    ],
    external:[  //外部库， 使用'umd'文件时需要先引入这个外部库
      'vue'
    ],
    plugins: plugins(),
  },
  ...components
]