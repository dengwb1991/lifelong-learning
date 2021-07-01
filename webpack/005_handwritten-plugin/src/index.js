var text = 'hellp typescript ' + IS_DEV;

let app = document.getElementById('app')

if (app) {
  app.innerHTML = text
}

if (IS_DEV) {
  console.log('is dev')
}

if (!IS_DEV) {
  console.log('is prod')
}