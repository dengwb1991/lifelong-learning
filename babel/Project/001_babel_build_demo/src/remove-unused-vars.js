module.exports = function ({ types: t }) {
  return {
    visitor: {
      Program(path) {
        const usedIdentifiers = new Set()  // 创建一个 Set 用于存储被使用的标识符。

        // 遍历所有节点，记录被使用的标识符
        path.traverse({
          Identifier(path) {
            if (path.isReferenced()) {
              usedIdentifiers.add(path.node.name)  // 如果标识符被引用，则将其名称添加到集合中。
            }
          }
        })

        // 删除未被使用的变量声明
        path.traverse({
          VariableDeclaration(path) {
            path.get('declarations').forEach(declarationPath => {
              const id = declarationPath.get('id')
              if (t.isIdentifier(id) && !usedIdentifiers.has(id.node.name)) {
                declarationPath.remove()  // 如果变量声明中的标识符未被使用，则删除该声明。
              }
            })
          }
        })

        // 删除未被使用的函数声明
        path.traverse({
          FunctionDeclaration(path) {
            if (!usedIdentifiers.has(path.node.id.name)) {
              path.remove()  // 如果函数声明的名称未被使用，则删除该声明。
            }
          }
        })

        // 删除未被使用的类声明
        path.traverse({
          ClassDeclaration(path) {
            if (!usedIdentifiers.has(path.node.id.name)) {
              path.remove()  // 如果函数声明的名称未被使用，则删除该声明。
            }
          }
        })
      }
    }
  }
}