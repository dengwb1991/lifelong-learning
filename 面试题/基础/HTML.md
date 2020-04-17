## !DOCTYPE HTML 作用

`<!DOCTYPE>` 声明位于HTML文档中的第一行，处于 `<html>` 标签之前。告知浏览器的解析器用什么文档标准解析这个文档。DOCTYPE不存在或格式不正确会导致文档以兼容模式呈现。

标准模式的排版和JS运作模式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示,模拟老式浏览器的行为以防止站点无法工作。

## 页面导入样式时，使用link和@import有什么区别？

1. 属性差异，link属于XHTML标签，除了加载CSS外，还能用于定义RSS, 定义rel连接属性等作用；而@import是CSS提供的，只能用于加载CSS
2. 加载机制差异，页面被加载的时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载
3. 兼容性差异，import是CSS2.1 提出的，只在IE5以上才能被识别，而link是XHTML标签，无兼容问题
4. link支持使用js控制DOM去改变样式，而@import不支持

## 介绍一下你对浏览器内核的理解

主要分成两部分：渲染引擎(layout engineer或Rendering Engine)和JS引擎

渲染引擎：负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入CSS等），以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。所有网页浏览器、电子邮件客户端以及其它需要编辑、显示网络内容的应用程序都需要内核。

JS引擎：解析和执行javascript来实现网页的动态效果。

最开始渲染引擎和JS引擎并没有区分的很明确，后来JS引擎越来越独立，内核就倾向于只指渲染引擎。

## 常见的浏览器内核有哪些

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

## 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

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
