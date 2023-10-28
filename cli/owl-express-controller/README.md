基于 `express` 的装饰器扩展，快速签发路由装饰器。

----

为 express 装饰器扩展，它基于路由封装一套装饰器的生命周期，用于快速签发路由装饰器，本身并不包含装饰器的签发

`ontroller` 的核心思想是提供 AOP（面向切面编程）的能力，适用于将业务无关的逻辑抽离出来（例如日志统计、异常处理、参数解析和校验等），开发者只需要沉浸在自己的业务逻辑场景中即可，保证了业务模块的纯净和高内聚。


## 快速开始

新建 `controllers/home-controller.ts`：

```ts

import { decorator } from './controller'
// 签发装饰器
const path = decorator.configWithOptions((path: string) => {
  return function (route) {
    route.path = path
    return route
  }
})

export default class HomeController {
  @path('/test/path')
  public path(params: any) {
    // do something...
  }
}
```

入口 `app.ts`：

```ts
// app.ts
import * as express from 'express'
import createController from './controller'

const ex = express()
createController({
  root: path.resolve('./controllers'),
  app: ex,
})

ex.listen(3001, () => {
  console.log('Example app listening on port 3001!')
})

// 访问 localhost:3000/test/path 即可
```

