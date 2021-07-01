let env = ''

if (IS_DEV) {
  env = 'Dev'
  console.log('is dev')
}

if (!IS_DEV) {
  env = 'Prod'
  console.log('is prod')
}

let text: string = `Hello TypeScript 当前环境为 ${env}`

let app = document.getElementById('app')

if (app) {
  app.innerHTML = text
}

