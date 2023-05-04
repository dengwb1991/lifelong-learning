const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const types = require('@babel/types')

const sourceCode = `
console.log(1);

function func() {
    console.info(2);
}

export default class Clazz {
    say() {
        console.debug(3);
    }
    render() {
        return <div>{console.error(4)}</div>
    }
}
`

const ast = parser.parse(sourceCode, {
  sourceType: 'unambiguous',
  plugins: ['jsx']
})

// traverse(ast, {
//   CallExpression(path, state) {
//     if (types.isMemberExpression(path.node.callee)
//       && path.node.callee.object.name === 'console'
//       && ['log', 'info', 'debug', 'error'].includes(path.node.callee.property.name)) {
//         const { line, column } = path.node.loc.start
//         path.node.arguments.unshift(types.stringLiteral(`filename: (${line}, ${column})`))
//     }

//   }
// })


const targetCalleeName = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`);

traverse(ast, {
    CallExpression(path, state) {
        // const calleeName = generate(path.node.callee).code;
        const calleeName = path.get('callee').toString()
        if (targetCalleeName.includes(calleeName)) {
            const { line, column } = path.node.loc.start;
            path.node.arguments.unshift(types.stringLiteral(`filename: (${line}, ${column})`))
        }
    }
});

const { code, map } = generate(ast)

console.log(code)

/**
console.log("filename: (2, 0)", 1);
function func() {
  console.info("filename: (5, 4)", 2);
}
export default class Clazz {
  say() {
    console.debug("filename: (10, 8)", 3);
  }
  render() {
    return <div>{console.error("filename: (13, 21)", 4)}</div>;
  }
}
 */
