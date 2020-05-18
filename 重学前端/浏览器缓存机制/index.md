https://www.jianshu.com/p/54cc04190252

# 浏览器缓存机制

## 浏览器缓存

强缓存、协议缓存

### 强缓存

Expires: 1. 指定资源到期的时间是服务器端的具体的时间点，2. 修改了本地时间，可能会造成缓存失效.

Cache-control: 可以组合使用多种指令 如 no-cache

两者对比: 1. Cache-control 优先级高于 Expires 2. Expires 是 http1.0 的产物 3. Cache-control 是 http1.1的产物

### 协商缓存

Last-Modified / If-Modified-Since: 只能以秒计时，有局限性

Etag / If-None-Match: 1. 响应请求时，返回一个唯一标识 ETag  2. ETag由服务器生成，资源有变化它会重新生成

两者对比: 1. 精确度上，Etag 要优于Last-Modified  2.性能上，Etag要逊于Last-Modified 3.优先级上，服务器校验优先考虑Etag

### 缓存的机制

1. 强制缓存优先于协议缓存进行
2. 协商缓存失败，返回200，重新返回资源和缓存表示
3. 协商缓存生效则返回304，继续使用缓存


## 缓存位置

Service Worker、Memory Cache、Disk Cache、Push Cache

1. Service Worker: 自由控制缓存哪些文件、如何匹配缓存、如何读去缓存； 并且缓存是持续性的；
2. Memory Cache: 内存中的缓存；读取高效；缓存持续性很短；
3. Disk Cache: 存储在硬盘中的缓存；读取速度慢；对比Memory Cache容量和存储时效性高；
4. Push Cache: 只在会话（Session）中存在；会话结束就被释放，并且缓存时间也很短暂.

## 实际应用场景

1. 频繁变动的资源：Cache-Control no-cache
2. 不常变化的资源：Cache-Control max-age=34536000

## 用户行为的影响

1. 地址栏输入地址

查找 Disk Cache 中是否有匹配；没有匹配则发送网络请求

2. 普通刷新

有限使用 Memory Cache；其次才是 Disk cache

3. 强制刷新

浏览器不使用缓存