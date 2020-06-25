## 初始 Canvas

Canvas 就是画布

Canvas 的默认大小为300像素×150像素（宽×高，像素的单位是px）。但是，可以使用HTML的高度和宽度属性来自定义Canvas 的尺寸。为了在 Canvas 上绘制图形，我们使用一个JavaScript上下文对象，它能动态创建图像（ creates graphics on the fly）。

#### Canvas vs SVG

1. Canvas是使用 JS 动态生成的，SVG 是使用 XML 静态描述的
2. Canvas基于位图，SVG基于矢量图
3. 发生修改时，Canvas需要重绘，SVG不需要重绘

## 基本用法

1. 获取 canvas 对象
2. 获取上下文环境对象 context
3. 开始绘制图形

```html
<canvas id="tutorial" width="150" height="150"></canvas>
```

该元素可以使用CSS来定义大小，但在绘制时图像会伸缩以适应它的框架尺寸：如果CSS的尺寸与初始画布的比例不一致，它会出现扭曲。

最终画布大小取决于元素内定一个 width 和 height，而非 css.

#### 渲染上下文（The rendering context）

`<canvas>` 元素创造了一个固定大小的画布，它公开了一个或多个**渲染上下文**，其可以用来绘制和处理要展示的内容。

通过简单的测试 `getContext()` 方法的存在，脚本可以检查编程支持性.

```js
var canvas = document.getElementById('tutorial');

if (canvas.getContext){
  var ctx = canvas.getContext('2d');
  // drawing code here
} else {
  // canvas-unsupported code here
}
```

#### 第一个示例

就花一条直线：**Demos/0001-first-canvas.html**