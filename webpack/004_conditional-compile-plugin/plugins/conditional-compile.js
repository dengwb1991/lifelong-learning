const anymatch = require('anymatch')

class ConditionalCompilePulgin {
  static NS = 'ConditionalCompilePulgin'

  _options = {
    // 默认会对以下文件类型进行条件编译
    exts: ['vue', 'js', 'ts', 'css', 'stylus', 'less'],
    values: {
      _PLATFORM: 'web',
    },

    // 默认不对node_modules下的文件做处理
    excludes: [/node_modules/],
  }

  constructor(options) {
    this._options = Object.assign(this._options, options)
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(
      ConditionalCompilePulgin.NS,
      (compilation) => {
        compilation.hooks.normalModuleLoader.tap(
          ConditionalCompilePulgin.NS,
          (loaderContext, module) => {
            const userRequest = module.userRequest
            
            if (!(typeof module.userRequest === 'string')) {
              return
            }

            const excludesMatcher = this._options.excludes
            
            /**
             * 不对符合excludes规则的文件做条件编译处理
             * 过滤掉携带 node_modules 文件路径
             */
            if (anymatch(excludesMatcher, userRequest)) {
              return
            }
            /**
             * 匹配文件名后缀是否符合扩展规则
             */
            const includesMatcher = this._options.exts.map(
              ext => new RegExp(`\.${ext}$`)
            )
            if (anymatch(includesMatcher, userRequest)) {
              module.loaders.push({
                options: {
                  values: this._options.values,
                },
                ident: 'conditional-compile-plugin-loader',
                loader: require.resolve(
                  `${__dirname}/loader`
                ),
              })
            }
          }
        )
      }
    )
  }
}

module.exports = ConditionalCompilePulgin;
