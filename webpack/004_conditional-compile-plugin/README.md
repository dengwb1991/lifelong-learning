# 手写条件编译

代码再 plugins/conditional-compile.js 和 plugins/loader.js

conditional-compile 负责筛选文件路径

loader 负责将 code 中定义好的特殊条件代码 进行筛选 其中使用了 `jscc`