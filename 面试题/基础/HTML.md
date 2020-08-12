## 一、!DOCTYPE HTML 作用

`<!DOCTYPE>` 声明位于HTML文档中的第一行，处于 `<html>` 标签之前。告知浏览器的解析器用什么文档标准解析这个文档。DOCTYPE不存在或格式不正确会导致文档以兼容模式呈现。

标准模式的排版和JS运作模式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示,模拟老式浏览器的行为以防止站点无法工作。

## 二、页面导入样式时，使用link和@import有什么区别？

1. 属性差异，link属于XHTML标签，除了加载CSS外，还能用于定义RSS, 定义rel连接属性等作用；而@import是CSS提供的，只能用于加载CSS
2. 加载机制差异，页面被加载的时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载
3. 兼容性差异，import是CSS2.1 提出的，只在IE5以上才能被识别，而link是XHTML标签，无兼容问题
4. link支持使用js控制DOM去改变样式，而@import不支持

## 三、介绍一下你对浏览器内核的理解

主要分成两部分：渲染引擎(layout engineer或Rendering Engine)和JS引擎

渲染引擎：负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入CSS等），以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。所有网页浏览器、电子邮件客户端以及其它需要编辑、显示网络内容的应用程序都需要内核。

JS引擎：解析和执行javascript来实现网页的动态效果。

最开始渲染引擎和JS引擎并没有区分的很明确，后来JS引擎越来越独立，内核就倾向于只指渲染引擎。

## 四、常见的浏览器内核有哪些

1. Trident：IE 浏览器内核；
2. Gecko：Firefox 浏览器内核；
3. Presto：Opera 浏览器内核；
4. Webkit：Safari 浏览器内核；
5. Blink：谷歌浏览器内核，属于 Webkit 的一个分支，与 Opera 一起在研发；

IE：Trident，IE 内核；
Chrome：以前是 Webkit，现在是 Blink 内核；
Firefox：Gecko 内核；
Safari：Webkit 内核；
Opera：一起是 Presto，现在是 Blink 内核；
360、猎豹浏览器内核：IE + Blink 双内核；
搜狗、遨游、QQ 浏览器内核：Trident（兼容模式）+ Webkit（高速模式）；
百度浏览器、世界之窗内核：IE 内核；
2345 浏览器：以前是 IE 内核，现在是 IE + Blink 双内核；
UC 浏览器内核：Webkit + Trident；

## 五、行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

CSS规范规定，每个元素都有display属性，确定该元素的类型，每个元素都有默认的display值，如div的display默认值为“block”，则为“块级”元素；span默认display属性值为“inline”，是“行内”元素。

（1）行内元素有：a b span img input select strong（强调的语气）

（2）块级元素有：div ul ol li dl dt dd h1 h2 h3 h4…p

（3）常见的空元素：
```html
<br> <hr> <img> <input> <link> <meta>
```
鲜为人知的是：
```html
<area> <base> <col> <command> <embed> <keygen> <param> <source> <track> <wbr>
```

## 六、请描述一下 cookies，sessionStorage 和 localStorage 的区别？

Cookie是保存在客户端的多组记录，在客户端以文件的形式存在。在与服务通信时，Cookie中通常会被要求保存会话的Session ID等信息，以用于识别客户端。服务器通过response响应头的set-Cookie字段来让客户端在本地Cookie中记录信息，下面是一个示例：

```
[HTTP/1.1 200 OK]
Server:[bfe/1.0.8.18]
Etag:["58860415-98b"]
Cache-Control:[private, no-cache, no-store, proxy-revalidate, no-transform]
Connection:[Keep-Alive]
Set-Cookie:[BDORZ=27315; max-age=86400; domain=.baidu.com; path=/]
Pragma:[no-cache]
Last-Modified:[Mon, 23 Jan 2017 13:24:37 GMT]
Content-Length:[2443]
Date:[Mon, 09 Apr 2018 09:59:06 GMT]
Content-Type:[text/html]
```

Cookie包含什么信息？

它可以记录你的用户ID、密码、浏览过的网页、停留的时间等信息。当你再次来到该网站时，网站通过读取Cookies，得知你的相关信息，就可以做出相应的动作，如在页面显示欢迎你的标语，或者让你不用输入ID、密码就直接登录等等。一个网站只能读取它自己放置的信息，不能读取其他网站的Cookie文件。因此，Cookie文件还保存了host属性，即网站的域名或ip。
这些属性以名值对的方式进行保存，为了安全，它的内容大多进行了加密处理。Cookie文件的命名格式是：用户名@网站地址[数字].txt

区别：

cookie数据始终在同源的http请求中携带（即使不需要），记会在浏览器和服务器间来回传递。
sessionStorage 和 localStorage 不会自动把数据发给服务器，仅在本地保存。

1. 存储大小

cookie数据大小不能超过4k。

sessionStorage 和 localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。

2. 有期时间

localStorage 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据；

sessionStorage 数据在当前浏览器窗口关闭后自动删除。

cookie 设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭

## 七、iframe 有那些缺点

1. iframe会阻塞主页面的Onload事件
2. 搜索引擎的检索程序无法解读这种页面，不利于SEO
3. iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载

使用iframe之前需要考虑这两个缺点。如果需要使用iframe，最好是通过javascript, 动态给iframe添加src属性值，这样可以绕开以上两个问题

## 八、如何实现浏览器内多个标签页之间的通信

WebSocket、SharedWorker；

也可以调用localstorge、cookies等本地存储方式；

localstorge另一个浏览上下文里被添加、修改或删除时，它都会触发一个事件，

我们通过监听事件，控制它的值来进行页面信息通信；

注意quirks：Safari 在无痕模式下设置localstorge值时会抛出 QuotaExceededError 的异常

两个页面监听

```js
window.addEventListener('storage', function (e) {
  alert(e.newValue)
})
```

若在同一个页面中想绑定监听，需要自定义

```js
var orignalSetItem = localStorage.setItem;
localStorage.setItem = function(key,newValue){
  var setItemEvent = new Event("setItemEvent")
  setItemEvent.newValue = newValue
  window.dispatchEvent(setItemEvent)
  orignalSetItem.apply(this,arguments)
}
window.addEventListener("setItemEvent", function (e) {
    alert(e.newValue);
})
localStorage.setItem("name", "abc")
```

## 九、什么情况会触发重排（回流 reflow）和重绘（repaint）？

* 调整窗口大小、改变布局大小、字号 都会触发重排、重绘
* 染树需要重新分析且节点尺寸需要重新计算就称为重排。节点的几何属性或者样式发生变化就称为重绘。

例如：

1. 通过 `display: none` 隐藏一个DOM节点 触发重排和重绘.

2. 通过 `visibility: hidden` 隐藏一个DOM节点 只触发重绘，因为没有几何变化.

3. 改变字体颜色 只触发重绘.

4. `translate` 不会引起重排