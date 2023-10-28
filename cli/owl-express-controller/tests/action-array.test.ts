import { ControllerContext } from '../src/controller'
import { ActionArray, execute } from '../src/action-array'

describe('action-array', () => {

  test('basic', async () => {
    const actions = new ActionArray()
    actions
      .pushAction(() => {
        return { one: '1' }
      })
      .pushAction((context: any, data: any) => {
        return { ...data, two: '2' }
      })

    const ret = await execute(actions, new ControllerContext())
    expect(ret).toEqual({
      one: '1', two: '2',
    })
  })

  /**
   * 初始值
   */
  test('initial-data', async () => {
    const actions = new ActionArray()
    actions
      .pushAction((context: any, data: any) => {
        return { one: '1', ...data }
      })
      .pushAction((context: any, data: any) => {
        return { ...data, two: '2' }
      })

    const ret = await execute(actions, new ControllerContext(), { message: 'success' })
    expect(ret).toEqual({
      one: '1', two: '2', message: 'success',
    })
  })

  /**
   * 修改 context
   */
  test('update-context', async () => {
    const actions = new ActionArray()
    actions
      .pushAction((context: any, data: any) => {
        context.user = { name: 'UserName' }
        return { one: '1', ...data }
      })
      .pushAction((context: any, data: any) => {
        context.user.role = 1
        return { ...data, two: '2' }
      })
    const context = new ControllerContext()
    const ret = await execute(actions, context, { message: 'success' })
    expect(ret).toEqual({
      one: '1', two: '2', message: 'success',
    })
    expect((context as any).user).toEqual({
      name: 'UserName',
      role: 1,
    })
  })
})


describe('action-array:catch', () => {
  /**
   * 异常抛出
   */
  test('catch', async () => {
    const actions = new ActionArray()
    actions
      .pushAction(() => {
        throw new Error('throw error')
      })
      .pushAction(() => {
        return { error: 0 }
      })
    try {
      await execute(actions, new ControllerContext())
    } catch (error) {
      expect(error.message).toMatch('throw error')
    }
  })

  /**
   * 异常捕获
   */
  test('error-handler', async () => {
    const actions = new ActionArray()
    actions
      .pushAction(() => {
        throw new Error('throw error')
      })
      .pushAction((error: Error, context: any, preRet: any) => {
        return { error: 0 }
      })
    const ret = await execute(actions, new ControllerContext())
    expect(ret).toEqual({
      error: 0,
    })
  })

  /**
   * 异步异常捕获
   */
  test('error-handler:async', async () => {
    const actions = new ActionArray()
    actions
      .pushAction(() => {
        return Promise.resolve().then(() => {
          throw new Error('throw error')
        })
      })
      .pushAction((error: Error, context: any, preRet: any) => {
        return { error: 0 }
      })
    const ret = await execute(actions, new ControllerContext())
    expect(ret).toEqual({
      error: 0,
    })
  })

  /**
   * 异常隔层捕获
   */
  test('error-handler:skip-next', async () => {
    const actions = new ActionArray()
    actions
      .pushAction(() => {
        throw new Error('throw error')
      })
      .pushAction((context: any, preRet: any) => {
        return { message: 'success' }
      })
      .pushAction((error: Error, context: any, preRet: any) => {
        return { error: 0 }
      })
    const ret = await execute(actions, new ControllerContext())
    expect(ret).toEqual({
      error: 0,
    })
  })

  /**
   * 异常隔层抛出
   */
  test('catch:skip-next', async () => {
    const actions = new ActionArray()
    actions
      .pushAction(() => {
        throw new Error('throw error')
      })
      .pushAction((context: any, preRet: any) => {
        return { message: 'success' }
      })
    try {
      await execute(actions, new ControllerContext())
    } catch (error) {
      expect(error.message).toMatch('throw error')
    }
  })

  /**
   * 异步异常隔层抛出
   */
  test('catch:skip-next:async', async () => {
    const actions = new ActionArray()
    actions
      .pushAction(() => {
        return Promise.resolve().then(() => {
          throw new Error('throw error')
        })
      })
      .pushAction((context: any, preRet: any) => {
        return { message: 'success' }
      })
    try {
      await execute(actions, new ControllerContext())
    } catch (error) {
      expect(error.message).toMatch('throw error')
    }
  })

})
