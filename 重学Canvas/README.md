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

## 直线图形

Canvas 图形分为两种：直线和曲线图形

直线图形包括：直线、矩形、对变形

* 坐标系

1. 数学坐标系：Y轴正方向向上
2. W3C坐标系：Y轴正放向向下

**Canvas使用的W3C坐标系**。

#### 语法

```js
cxt.moveTo(x1, y1)
cxt.lineTo(x2, y2)
cxt.stroke()
```

`moveTo` 方法传入起点位置坐标，`lineTo` 方法传入终点位置坐标。最终调用 `stroke` 方法才会生效。

若画多条线 `moveTo` 和 `lineTo` 可以重复使用，最终调用一次 `stroke` 即可。

#### 第一个示例

就画一条直线：**Demos/0001-first-canvas.html**

## 矩形图形

#### 语法

```js
cxt.strokeStyle = 属性值
cxt.strokeRect(x, y, width, height)
```

`strokeStyle` 是 context 对象的一个属性，`strokeRect` 是方法

注意：`strokeStyle` 在 `strokeRect` 前定义，否则将不生效

#### 矩形示例

矩形：**Demos/0002-rectangle.html**

## 填充矩形

#### 语法

```js
cxt.fillStyle = 属性值
cxt.fillRect(x, y, width, height)
```

规则与 stroke 一样.

#### 填充矩形

矩形：**Demos/0002-rectangle.html**