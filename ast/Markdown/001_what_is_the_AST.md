# AST

## AST 是什么

抽象语法树 (Abstract Syntax Tree)，简称 AST，它是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。

## AST 有什么用处

1. 编译器的错误提示、代码格式化、代码高亮、代码自动不全等；
2. `eslint`、`pretiier` 对代码错误或风格的检查；
3. `webpack` 通过 `babel` 转译 `javascript` 语法;

## AST 如何生成

js 执行的第一步是读取 js 文件中的字符流，然后通过词法分析生成 token，之后再通过语法分析( Parser )生成 AST，最后生成机器码执行。

整个解析过程主要分为以下两个步骤：

1. 分词：将整个代码字符串分割成最小语法单元数组
2. 语法分析：在分词基础上建立分析语法单元之间的关系

JS Parser 是 js 语法解析器，它可以将 js 源码转成 AST，常见的 Parser 有 esprima、traceur、acorn、shift 等。

### 词法分析

词法分析，也称之为扫描（scanner），简单来说就是调用 next() 方法，一个一个字母的来读取字符，然后与定义好的 JavaScript 关键字符做比较，生成对应的Token。Token 是一个不可分割的最小单元:

例如 var 这三个字符，它只能作为一个整体，语义上不能再被分解，因此它是一个 Token。

词法分析器里，每个关键字是一个 Token ，每个标识符是一个 Token，每个操作符是一个 Token，每个标点符号也都是一个 Token。除此之外，还会过滤掉源程序中的注释和空白字符、换行符、空格、制表符等。

最终，整个代码将被分割进一个tokens列表（或者说一维数组）。

### 语法分析

语法分析会将词法分析出来的 Token 转化成有语法含义的抽象语法树结构。同时，验证语法，语法如果有错的话，抛出语法错误。


## 案例

### 案例1

```js
const fn = a => a;
```

```json
// AST
{
  "type": "Program",
  "start": 0,
  "end": 18,
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 0,
      "end": 18,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 6,
          "end": 17,
          "id": {
            "type": "Identifier",
            "start": 6,
            "end": 8,
            "name": "fn"
          },
          "init": {
            "type": "ArrowFunctionExpression",
            "start": 11,
            "end": 17,
            "id": null,
            "expression": true,
            "generator": false,
            "async": false,
            "params": [
              {
                "type": "Identifier",
                "start": 11,
                "end": 12,
                "name": "a"
              }
            ],
            "body": {
              "type": "Identifier",
              "start": 16,
              "end": 17,
              "name": "a"
            }
          }
        }
      ],
      "kind": "const"
    }
  ],
  "sourceType": "module"
}
```

## 链接

[在线转AST](https://astexplorer.net/)

http://www.goyth.com/2018/12/23/AST/#Identifier

https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md

https://github.com/CodeLittlePrince/blog/issues/19

https://juejin.im/post/582425402e958a129926fcb4