import {
  decorator,
} from '../src'


export const passport = decorator.before(function (params: any) {
  // this.res.locals = {
  //   name: 123,
  // }
  // console.log('passport', params)
})


export const end = decorator.after(function (context: any, data: any) {
  this.res.json({
    error: 0,
    data,
  })
})


// #region == 测试装饰器执行顺序

export const decor1 = decorator.before((ctx1: any, data: any) => {
  ctx1.injects = Array.isArray(ctx1.injects) && ctx1.injects.length ? ctx1.injects.concat('d1') : ['d1']
})

export const decor2 = decorator.beforeWithOptions(() => {
  return (ctx2: any) => {
    ctx2.injects = Array.isArray(ctx2.injects) && ctx2.injects.length ? ctx2.injects.concat('d2') : ['d2']
  }
})

export const decor3 = decorator.before((ctx2: any, data: any) => {
  ctx2.injects = Array.isArray(ctx2.injects) && ctx2.injects.length ? ctx2.injects.concat('d3') : ['d3']
})

// #endregion

export const name = decorator.beforeClass(function (context: any) {
  // console.log('createBeforeFilterDecoratorInClass', data)
  context.injects = { ...context.injects, name: 'hhaha' }
  return context
})
