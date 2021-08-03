let env = ''

//#if _ENV === 'wx'
env = 'wx'
console.log('is wx')
//#endif

//#if _ENV === 'qq'
env = 'qq'
console.log('is qq')
//#endif
let text: string = `Hello TypeScript 当前环境为 ${env}`

let app = document.getElementById('app')

if (app) {
  app.innerHTML = text
}

