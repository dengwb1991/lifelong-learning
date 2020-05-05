## 一、盒模型

margin（外边距）、border（边距）、padding（内边距）、content（内容区域）

### box-sizing

默认为：content-box

```
实际宽高 = border + padding + width/height
```

border-box 宽高包括 `border` 和 `padding`

IE的 content 部分默认包括 `border` 和 `padding`

## 二、垂直居中

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

## 三、了解 Flex 布局么？平常有使用 Flex 进行布局么？

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

## 四、CSS 中解决浮动中高度塌陷的方案有哪些

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

## 五、CSS 如何实现三列布局，左侧和右侧固定宽度，中间自适应宽度？

1. 利用float, 两个元素分别左右浮动，设置固定宽度，另外一个元素设置margin相对于浮动元素的宽度，该元素不设置宽度即可.

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
          width:100%;
          border:1px solid blue;
       }
       .block1 {
          width:50px;
          height:200px;
          float: left;
          border:1px solid red;
       }
       .block2 {
          width:50px;
          height:200px;
          float: right;
          border:1px solid red;
       }
       .block3 {
          margin: 0 50px;
          height:200px;
          border:1px solid red;
       }
   </style>
</head>
<body>
    <div class="container">
        <div class="block1"><span>块1</span></div>
        <div class="block2"><span>块2</span></div>
        <div class="block3"><span>块3</span></div>
    </div>
</body>
</html>
```

2. 利用绝对定位，方法同上两个元素分别设置position: absolute. 另一个元素设置margin
3. 利用flex布局，若不使用order属性的话，将子元素1和3分别设置固定宽度，元素2设置flex：1即可
4. 圣杯布局

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
          height:200px;
          border:1px solid blue;
          padding: 0 200px 0 120px;
       }
       .block1 {
          width:120px;
          height:200px;
          float: left;
          margin-left: -120px;
          border:1px solid red;
       }
       .block2 {
          width:200px;
          float: right;
          height:200px;
          margin-right: -200px;
          border:1px solid red;
       }
       .block3 {
          height:200px;
          border:1px solid red;
       }
   </style>
</head>
<body>
    <div class="container">
        <div class="block1"><span>块1</span></div>
        <div class="block2"><span>块2</span></div>
        <div class="block3"><span>块3</span></div>
    </div>
</body>
</html>
```

## 六、说说CSS选择器以及这些选择器的优先级

* !important
* 内联样式（1000）
* ID选择器（0100）
* 类选择器/属性选择器/伪类选择器（0010）
* 元素选择器/关系选择器/伪元素选择器（0001）
* 通配符选择器（0000）

### 权重

标签的权重为1，class的权重为10，id的权重为100

```css
/*权重为1*/
div {}
/*权重为10*/
.class1 {}
/*权重为100*/
#id1 {}
/*权重为100+1=101*/
#id1 div {}
/*权重为10+1=11*/
.class1 div {}
/*权重为10+10+1=21*/
.class1 .class2 div {}
```

## 七、CSS选择符有哪些？哪些属性可以继承？

```
1.id选择器（ # myid）
2.类选择器（.myclassname）
3.标签选择器（div, h1, p）
4.相邻选择器（h1 + p）
5.子选择器（ul > li）
6.后代选择器（li a）
7.通配符选择器（ * ）
8.属性选择器（a[rel = "external"]）
9.伪类选择器（a:hover, li:nth-child）
```

可继承的样式： font-size font-family color, UL LI DL DD DT

不可继承的样式：border padding margin width height

## 八、BFC

### BFC 定义

BFC(Block formatting context)直译为"块级格式化上下文", 它是一个独立的渲染区域.

BFC是一个独立的布局环境，其中的元素布局是不受外界的影响，并且在一个BFC中，块盒与行盒（行盒由一行中所有的内联元素所组成）都会垂直的沿着其父元素的边框排列。

### BFC 布局规则

1. 内部的盒会在垂直方向一个接一个排列
2. Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
3. 每个元素的margin box的左边，与容器块border box的左边相接触(对于从左往右的格式化，否则相反)，即使存在浮动也是如此
4. BFC的区域不会与float box重叠
5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此
6. 计算BFC的高度时，浮动元素也参与计算

### 如何创建 BFC

1. float的值不是none
2. position的值不是static或者relative
3. display的值是inline-block、table-cell、flex、table-caption或者inline-flex
4. overflow的值不是visible

### BFC 解决哪些问题

1. 垂直外边距重叠问题
2. 去除浮动
3. 自适用两列布局

### 示例

1. 解决垂直外边距重叠问题

```html
<!DOCTYPE html>
<html>
<head>
   <style type="text/css">
      *{
          margin: 0;
          padding: 0;
      }
      p {
          color: #f55;
          background: yellow;
          width: 200px;
          line-height: 100px;
          text-align:center;
          margin: 30px;
      }
      div{
          overflow: hidden;
      }
   </style>
</head>
<body>
  <p>1</p>
  <div>
    <p>2</p>
  </div>
</body>
</html>
```

2. 自适应两列布局，BFC的区域不会与float box重叠

```html
<!DOCTYPE html>
<html>
<head>
   <style type="text/css">
    *{
        margin: 0;
        padding: 0;
    }
    body {
        width: 100%;
        position: relative;
    }
    .left {
        width: 100px;
        height: 150px;
        float: left;
        background: rgb(139, 214, 78);
        text-align: center;
        line-height: 150px;
        font-size: 20px;
    }
    .right {
        overflow: hidden;
        height: 300px;
        background: rgb(170, 54, 236);
        text-align: center;
        line-height: 300px;
        font-size: 40px;
    }
   </style>
</head>
<body>
  <div class="left">LEFT</div>
  <div class="right">RIGHT</div>
</body>
</html>
```

3. 清楚浮动，当我们不给父节点设置高度，子节点设置浮动的时候，会发生高度塌陷，给父节点设置 overflow

```html
<!DOCTYPE html>
<html>
<head>
   <style type="text/css">
    .par {
        border: 5px solid rgb(91, 243, 30);
        width: 300px;
        overflow: hidden;
    }
    .child {
        border: 5px solid rgb(233, 250, 84);
        width:100px;
        height: 100px;
        float: left;
    }
   </style>
</head>
<body>
  <div class="par">
    <div class="child"></div>
    <div class="child"></div>
  </div>
</body>
</html>
```

## 九、伪元素和伪类有什么区别

1. 伪元素包含

:first-letter 特殊的样式添加到文本的首个字符
:first-line 特殊的样式添加到文本的首行
:before 在某元素之前插入某些内容
:after 在某元素之后插入某些内容

2. 伪类包含

:active 将样式添加到被激活的元素
:focus 将样式添加到被选中的元素
:hover 当鼠标悬浮在元素上方时，样式添加到该元素
:link 将特殊的样式添加到未被访问的链接
:visited 将特殊的样式添加到被访问的链接
:first-child 将特殊的样式添加到元素的第一个子元素
:lang 允许创作者来定义指定的元素中使用的语言

## 十、CSS 中的 background 的 background-image 属性可以和 background-color 属性一起生效么？

可以，background-color 属性不会覆盖 background-image 属性，但如果 background 属性中设置了 color，并声明在前，则后声明的 background-color 属性会覆盖.

## 十一、绝对定位和浮动的区别和运用

当一个元素使用绝对定位后，它的位置将依据浏览器左上角开始计算或相对于父容器（在父容器使用相对定位时）。 绝对定位使元素脱离文档流，因此不占据空间。普通文档流中元素的布局就当绝对定位的元素不存在时一样。因为绝对定位的框与文档流无关，所以它们可以覆盖页面上的其他元素。

而浮动元素的定位还是基于正常的文档流，然后从文档流中抽出并尽可能远的移动至左侧或者右侧。文字内容会围绕在浮动元素周围。当一个元素从正常文档流中抽出后，仍然在文档流中的其他元素将忽略该元素并填补他原先的空间。它只是改变了文档流的显示，而没有脱离文档流，理解了这一点，就很容易弄明白什么时候用定位，什么时候用浮动了。

一个元素浮动或绝对定位后，它将自动转换为块级元素，而不论该元素本身是什么类型。