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