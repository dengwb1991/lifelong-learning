## 盒模型

margin（外边距）、border（边距）、padding（内边距）、content（内容区域）

### box-sizing

默认为：content-box

```
实际宽高 = border + padding + width/height
```

border-box 宽高包括 `border` 和 `padding`

IE的 content 部分默认包括 `border` 和 `padding`

## 垂直居中

1. 绝对定位 div 居中

```css
div {
 	position: absolute;
 	width: 300px;
 	height: 300px;
 	margin: auto;
 	top: 0;
 	left: 0;
 	bottom: 0;
 	right: 0;
}
```

2. 已知宽高

```css
div {
 	position: relative; /* 相对定位或绝对定位均可 */
 	width:500px;
 	height:300px;
 	top: 50%;
 	left: 50%;
 	margin: -150px 0 0 -250px; /* 外边距为自身宽高的一半 */
}
```

3. transform

```css
div {
 	position: absolute;
 	width:500px;
 	height:300px;
 	top: 50%;
 	left: 50%;
 	transform: translate(-50%, -50%);
}
```

4. flex

```css
.container {
 	display: flex;
 	align-items: center; 		/* 垂直居中 */
 	justify-content: center;	/* 水平居中 */
}
```

## 了解 Flex 布局么？平常有使用 Flex 进行布局么？

Flex 是由**容器**(flex container)和**项目**(flex item)两部分组成

### 容器属性

6种 `flex-direction`、`flex-wrap`、`flex-flow`、`justify-content`、`align-items`、`align-content`

#### flex-direction

决定主轴的方向（即项目的排列方向）

1. row（默认值）：主轴为水平方向，起点在左端。
2. row-reverse：主轴为水平方向，起点在右端。
3. column：主轴为垂直方向，起点在上沿。
4. column-reverse：主轴为垂直方向，起点在下沿。

#### flex-wrap

默认情况下，项目都排在一条线（又称"轴线"）上。`flex-wrap` 属性定义，如果一条轴线排不下，**如何换行**。

1. nowrap（默认）：不换行。
2. wrap：换行，第一行在上方。
3. wrap-reverse：换行，第一行在下方。

#### flex-flow

`flex-flow` 属性是 `flex-direction` 属性和 `flex-wrap` 属性的简写形式，默认值为row nowrap.

#### justify-content

定义了项目在主轴上的对齐方式

1. flex-start（默认值）：左对齐
2. flex-end：右对齐
3. center： 居中
4. space-between：两端对齐，项目之间的间隔都相等。
5. space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

#### align-items

定义项目在交叉轴上如何对齐

1. flex-start：交叉轴的起点对齐。
2. flex-end：交叉轴的终点对齐。
3. center：交叉轴的中点对齐。
4. baseline: 项目的第一行文字的基线对齐。
5. stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

#### align-content

定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

1. flex-start：与交叉轴的起点对齐。
2. flex-end：与交叉轴的终点对齐。
3. center：与交叉轴的中点对齐。
4. space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
5. space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
6. stretch（默认值）：轴线占满整个交叉轴。

### 项目属性

6种 `order`、`flex-grow`、`flex-shrink`、`flex-basis`、`flex`、`align-self`

#### order

定义项目的排列顺序。数值越小，排列越靠前，默认为 0。

#### flex-grow

定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

如果所有项目的 `flex-grow` 属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的 `flex-grow` 属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

#### flex-shrink

定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。

#### flex-basis

定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。

#### flex

flex 属性是`flex-grow`, `flex-shrink` 和 `flex-basis` 的简写，默认值为 0 1 auto。后两个属性可选。

该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

#### align-self

允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

该属性可能取6个值，除了auto，其他都与align-items属性完全一致。

## CSS 中解决浮动中高度塌陷的方案有哪些

### 塌陷原因

如果父元素**只包含浮动元素**，且父元素**未设置高度**的时候，那么它的高度就会踏缩为零，这是因为浮动元素脱离了文档流，包围它们的父块中没有内容了，所以**塌陷**了

### 清楚浮动的方法，优缺点

1. 使用带 clear 属性的空元素

.clear { clear: both }

 在父块中、浮动元素后使用一个空元素，如<div class="clear"></div>，并在css中赋予 .clear{clear：both}属性即可清除浮动。也可使用<br class="clear"/>或<hr class="clear"/>来进行清除。

给空元素设置clear后，因为它的左右两边不能有任何浮动元素，所以空元素下移到浮动元素下方。而空元素又包含在父块中，相当于把父块撑开了，视觉上起到了父块包含浮动元素的效果。

缺点：显而易见，会新增空元素.

2. overflow

给父元素设置 `overflow: hidden` 或者 `auto` 、 `overlay`、 `scroll`

3. 使用伪元素

```css
.clear:after{
	content: ' ';
	clear: both;
	display: block;
	height: 0;
	visibility: hidden;
}
```

```html
<!DOCTYPE html>
<html>
<head>
   <style type="text/css">
   * {
           margin:0;
           padding:0;
   }
       .container {
           width:300px;
           /* height:156px; */
           border:1px solid blue;
           margin:100px;
       }
       .block1 {
           width:50px;
           height:50px;
           border:1px solid red;
       }
       .block2 {
           width:50px;
           height:50px;
           border:1px solid red;
       }
       .block3 {
           width:50px;
           height:50px;
           border:1px solid red;
			 }
			 .clear {
           clear: both
       }
   </style>
</head>
<body>
    <div class="container">
        <div class="block1"><span>块1</span></div>
        <div class="block2"><span>块2</span></div>
				<div class="block3"><span>块3</span></div>
				<div class="clear"></div>
    </div>
</body>
</html>
```