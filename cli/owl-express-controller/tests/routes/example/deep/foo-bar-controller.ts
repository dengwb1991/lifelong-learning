import { BaseController } from '../../../../src'
import { decor1, decor2, decor3, end, name } from '../../../decorators'

export default class FooBarController extends BaseController {
  @end
  // @path('321', 1)
  public camelTest(params: any) {
    return true
  }

  // 装饰器的执行顺序是由近及远（从下往上）的
  @end
  @decor1
  @decor2()
  @decor3
  public orderTest(...args: any) {
    return args
  }

  @end
  @decor3
  @decor2()
  @decor1
  public orderTest2(...args: any) {
    return args
  }

  @decor2()
  @end
  @decor1
  public orderTest3(...args: any) {
    return args
  }
}
