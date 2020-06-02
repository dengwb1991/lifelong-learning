## 一、Babel原理

> https://juejin.im/post/5af302e4f265da0b745229bb babel原理及插件开发

babel的转译过程分为三个阶段：解析(parsing)、转换(transforming)、生成(generating)。

### 解析

使用babylon（巴比伦？）这个解析器，它会根据输入的javascript代码字符串根据ESTree规范生成AST（抽象语法树）。

### 转换

用 babel-traverse 对 AST 树进行遍历转译,得到新的AST树, 根据一定的规则转换、修改AST。

### 生成

使用babel-generator将修改后的AST转换成普通代码。


* @babel/parser 将 js 代码 ------->>>  AST 抽象语法树；
* @babel/traverse 对 AST 节点进行递归遍历；
* @babel/types 对具体的 AST 节点进行进行修改；
* @babel/generator AST 抽象语法树 ------->>> 新的 js 代码；

进入 [@babel/parser](https://babeljs.io/docs/en/babel-parser) 官网开头就介绍了它是使用的 Acorn 来解析 js 代码成 AST 语法树


## 二、AST 抽象语法树

> https://juejin.im/post/5af302e4f265da0b745229bb#heading-4 手把手带你入门 AST 抽象语法树

### AST 是什么

抽象语法树 (Abstract Syntax Tree)，简称 AST，它是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。

### AST 有什么用

1. 编辑器的错误提示、代码格式化、代码高亮、代码自动补全；
2. elint、pretiier 对代码错误或风格的检查；
3. webpack 通过 babel 转译 javascript 语法；


### AST 如何生成

读取 js 文件中的字符流，通过词法分析生成 token，通过语法分析( Parser )生成 AST，最后生成机器码执行。

整个解析过程主要分为以下两个步骤：

* 分词：将整个代码字符串分割成最小语法单元数组
* 语法分析：在分词基础上建立分析语法单元之间的关系

JS Parser 是 js 语法解析器，它可以将 js 源码转成 AST，常见的 Parser 有 esprima、traceur、**acorn**、shift 等。

### 词法分析

词法分析，也称之为扫描（scanner），简单来说就是调用 next() 方法，一个一个字母的来读取字符，然后与定义好的 JavaScript 关键字符做比较，生成对应的Token。Token 是一个不可分割的最小单元:

> 例如 var 这三个字符，它只能作为一个整体，语义上不能再被分解，因此它是一个 Token。

词法分析器里，每个关键字是一个 Token ，每个标识符是一个 Token，每个操作符是一个 Token，每个标点符号也都是一个 Token。除此之外，还会过滤掉源程序中的注释和空白字符（换行符、空格、制表符等。
最终，整个代码将被分割进一个tokens列表（或者说一维数组）。

### 语法分析

语法分析会将词法分析出来的 Token 转化成有语法含义的抽象语法树结构。同时，验证语法，语法如果有错的话，抛出语法错误。

