# AST 示例

* 使用Babel解析js代码转换成AST语法树，再重新生成新的代码

## 使用Babel工具

* @babel/parser: 将 `JS` 代码转换为 `AST` 抽象语法树

* @babel/traverse: 对 `AST` 节点进行递归遍历
  
* @babel/types: 对具体的 `AST` 节点进行修改

* @babel/generator: 将 `AST` 抽象语法树转换为新的 `JS` 代码


## 目标

将

```js
function getData() {
  console.log("data")
}
```

转换为

```

function getData() {
  console.log("data")
}

```


## 使用

1. 安装包

```bash
$ npm i @babel/parser @babel/traverse @babel/types @babel/generator -D --registry=https://registry.npmjs.org/
```

2. 创建index.js

```js
const generator = require("@babel/generator");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse");
const types = require("@babel/types");

function compile(code) {
  // 1.parse 将代码解析为抽象语法树（AST）
  const ast = parser.parse(code);

  // 2,traverse 转换代码
  traverse.default(ast, {});

  // 3. generator 将 AST 转回成代码
  return generator.default(ast, {}, code);
}

const code = `
function getData() {
  console.log("data")
}
`;
const newCode = compile(code)
console.log(newCode)
```

```bash

$ node src/index.js

{
  code: 'function getData() {\n  console.log("data");\n}',
  decodedMap: undefined,
  map: [Getter/Setter],
  rawMappings: [Getter/Setter]
}

```

3. 查看其AST文件

```json
{
  "type": "Program",
  "body": [
    {
      "type": "FunctionDeclaration",
      "id": {
        "type": "Identifier",
        "name": "getData"
      },
      "params": [],
      "body": {
        "type": "BlockStatement",
        "body": [
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "CallExpression",
              "callee": {
                "type": "MemberExpression",
                "computed": false,
                "object": {
                  "type": "Identifier",
                  "name": "console"
                },
                "property": {
                  "type": "Identifier",
                  "name": "log"
                }
              },
              "arguments": [
                {
                  "type": "Literal",
                  "value": "data",
                  "raw": "\"data\""
                }
              ]
            }
          }
        ]
      },
      "generator": false,
      "expression": false,
      "async": false
    }
  ],
  "sourceType": "script"
}
```

只需要在 `arguments` 中插入一个项即可

4. 使用 traverse.default 进行修改 `AST`

代码修改为：

```js
const generator = require("@babel/generator");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse");
const types = require("@babel/types");

function compile(code) {
  // 1.parse 将代码解析为抽象语法树（AST）
  const ast = parser.parse(code);
  // ---------------------------------------新增start
  const visitor = {
    CallExpression(path) {
      // 拿到 callee 数据
      const { callee } = path.node;
      // 判断是否是调用了 console.log 方法
      // 1. 判断是否是成员表达式节点，上面截图有详细介绍
      // 2. 判断是否是 console 对象
      // 3. 判断对象的属性是否是 log
      const isConsoleLog =
        types.isMemberExpression(callee) &&
        callee.object.name === "console" &&
        callee.property.name === "log";
      if (isConsoleLog) {
        // 如果是 console.log 的调用 找到上一个父节点是函数
        const funcPath = path.findParent(p => {
          return p.isFunctionDeclaration();
        });
        // 取函数的名称
        const funcName = funcPath.node.id.name;
        // 将名称通过 types 来放到函数的参数前面去
        path.node.arguments.unshift(types.stringLiteral(funcName));
      }
    }
  };
  // ---------------------------------------新增end
  // 2,traverse 转换代码
  traverse.default(ast, visitor);

  // 3. generator 将 AST 转回成代码
  return generator.default(ast, {}, code);
}

const code = `
function getData() {
  console.log("data")
}
`;
const newCode = compile(code)
console.log(newCode)
```

5. 执行

```js
$ node src/index.js
```