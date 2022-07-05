# @babel/parser

将 `JS` 代码转换为 `AST` 抽象语法树

可以通过 [AST explorer](https://astexplorer.net/) 来在线测试

## 示例

1. 使用示例

```js
require("@babel/parser").parse("let a = 1", {
  sourceType: "module"
});
```

## options 配置项 

| 选项 | 说明 | 简介 |
| -- | -- | -- |
| allowImportExportEverywhere | 默认情况下，导入和导出声明只能出现在程序的顶层。如果将此选项设置为true，则可以在允许语句的任何位置使用它们 | 允许任何地方写import |
| allowAwaitOutsideFunction | 默认情况下，仅允许在异步函数内部或在启用topLevelAwait插件时，在模块的顶级范围内使用await，可以将该值设置为true | 允许顶层await |
| allowReturnOutsideFunction | 默认情况下，函数外的return语句会引发错误。将此设置为true，不会报错 | 允许函数外面写return |
| allowSuperOutsideMethod | 默认情况下，在类和方法之外不允许使用。将此设置为true，不会报错 | 允许其他地方写super |
| allowUndeclaredExports | 默认情况下，导出未在当前模块作用域中声明的标识符将引发错误。设置为true后将不会报错 | 允许导出一个未声明的变量 |
| attachComment | 默认情况下，Babel将注释附加到相邻的AST节点。如果此选项设置为false，则不会附加注释。当输入代码有许多注释时，它可以提供高达30%的性能改进@babel/eslint解析器将为您设置它。不建议在Babel transform中使用attachComment:false，因为这样做会删除输出代码中的所有注 | 释是否保留注释 |
| createParenthesizedExpressions | 当此选项设置为true时，如果给表达式节点包了一层圆括号，会被保留，如果设置为false，表达式的括号不会保留 | 是否保留包裹表达式的圆括号 |
| errorRecovery | 默认情况下，Babel在发现一些无效代码时总是抛出错误。当此选项设置为true时，它将存储解析错误并尝试继续解析无效的输入文件。生成的AST将具有一个errors属性，表示所有解析错误的数组。请注意，即使启用此选项，@babel/parser也可能抛出不可恢复的错误 | 是否出现错误后，不停止解析 |
| plugins | 包含要启用的插件的数组 | 插件数组 |
| sourceType | 指示应在其中解析代码的模式。可以是“script”、“module”或“unambiguous”之一。默认为“script”。“unambiguous”将使@babel/parser根据ES6导入或导出语句的存在尝试猜测。带有ES6导入和导出的文件被视为“module”，否则为“script”。 | 解析代码模式，推荐unambiguous |
| sourceFilename | 将输出AST节点与其源文件名关联。从多个输入文件的AST生成代码和源映射时非常有用 | ast节点携带当前解析的文件名称 |
| startColumn | 默认情况下，解析的代码被视为从第1行第0列开始。您可以提供一个列编号，以供选择。用于与其他源工具集成。 | 可以选择从哪一列开始解析 |
| startLine | 默认情况下，解析的代码被视为从第1行第0列开始。您可以提供一个行号，以供选择。用于与其他源工具集成。 | 可以选择从哪一行开始解析 |
| strictMode | 默认情况下，ECMAScript代码仅在“use strict”时解析为strict；指令存在，或者如果解析的文件是ECMAScript模块。将此选项设置为true以始终在严格模式下解析文件 | 解析的文件都会加上use strict |
| ranges | 向每个节点添加范围属性：[node.start，node.end] | 给ast节点添加range |
| tokens | 将所有已解析的令牌添加到文件节点上的令牌属性 | 为File Ast节点上的tokens属性，添加所有token |


## babel支持typescript

babel/parser内部实现了所有可配置的语法，例如typescript、top-level-await，本文只讨论如何配置并支持各种语法

支持 `typescript` 如下

```js
const parser = require('@babel/parser')

const ast = parser.parse(`
  const a: number = 1
`, {
+  plugins: ['typescript']
})
```