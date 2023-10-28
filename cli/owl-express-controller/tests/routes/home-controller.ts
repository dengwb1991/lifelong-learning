import { BaseController } from '../../src'
import { passport, end, name } from '../decorators'

@name
export default class HomeController extends BaseController {
  @passport
  @end
  // @path('321', 1)
  public test(params: any) {
    // console.log('test', params)
    return params
  }
}
