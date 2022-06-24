# Web Components

前端组件化，目前主要由三项技术组成：

[Custom elements-自定义元素](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements)

[HTML templates](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_templates_and_slots)

[Shadow DOM](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_shadow_DOM)

## Custom elements

自定义元素就像 Vue 和 React 中的类组件，首先我们需要使用 ES2015 语法来定义一个类，接着，使用浏览器原生的 customElements.define() 方法，告诉浏览器我要注册一个元素/标签 user-text，（自定义元素的名称必须包含连词线，用与区别原生的 HTML 元素，就像 React 的自定义组件名使用时必须大写一样）。


### 代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <user-text></user-text>
    <script>
        class UserText extends HTMLElement {
            constructor () {
                super();
                this.innerHTML = "我是内容";
            }
        }
        globalThis.customElements.define("user-text", UserText);
    </script>
</body>
</html>
```

### 生命周期

* connectedCallback：当 custom element 首次被插入文档 DOM 时，被调用，俗称组件上树。
* disconnectedCallback：当 custom element 从文档 DOM 中删除时，被调用，俗称组件下树或组件消亡。
* adoptedCallback：当 custom element 被移动到新的文档时，被调用，这个 API 常和 document.adoptNode 配合使用。
* attributeChangedCallback: 当 custom element 增加、删除、修改自身属性时，被调用，俗称组件更新。


## HTML templates

页面上的元素最终是要给用户呈现内容，在自定义组件里，我们通过字符串的方式来接受要展现给用户的内容，这种方式非常不利于组织我们的 HTML，我们需要一个写 HTML 的地方，这个技术就是模板 (Templates)，非常像 Vue 的模版渲染，如果你熟悉 Vue ，完全可以无障碍切换。


### 代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <template id="user-text-template">
        <p>你好，我是模版！</p>
    </template>
    <user-text></user-text>
    <script>
        class UserText extends HTMLElement {
            constructor () {
                super();
            }
            connectedCallback () {
                const oldNode = document.getElementById("user-text-template").content;
                const newNode = oldNode.cloneNode(true);
                this.appendChild(newNode);
            }
        }
        globalThis.customElements.define("user-text", UserText);
    </script>
</body>
</html>
```

如果，自定义元素需要动态传值给我们的自定义组件，可以使用插槽 `slot`，语法基本同 `Vue`，但是此时还无法演示，因为 `slot` 标签对标准的 `DOM`（更专业点叫 `light DOM`）无效，只对 **`shadow DOM`** 是有效的

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <template id="user-text-template">
        <style>
            p {
                color: red;
            }
        </style>
        <p id="templateDOM">你好，我是模版！</p>
        <p><slot>因为我是无效的，我也会默认展示</slot></p>
    </template>
    <user-text>
        <p>light DOM 环境下，slot 标签没用</p>
    </user-text>
    <script>
        class UserText extends HTMLElement {
            constructor () {
                super();
            }
            connectedCallback () {
                const oldNode = document.getElementById("user-text-template").content;
                const newNode = oldNode.cloneNode(true);
                this.appendChild(newNode);
            }
        }
        globalThis.customElements.define("user-text", UserText);
        console.log(document.getElementById("templateDOM"));
    </script>
</body>
</html>
```

除了，slot 无法使用，我们还观察到 template 元素及其内容不会在 DOM 中呈现，必须通过 JS 的方式去访问、style 标签内的样式是作用到全局的、template 里面的 DOM 也可以被全局访问。


## shadow DOM

Web components 的一个重要属性是封装——可以将标记结构、样式和行为隐藏起来，并与页面上的其他代码相隔离，保证不同的部分不会混在一起，可使代码更加干净、整洁。其中，Shadow DOM 接口是关键所在，它可以将一个隐藏的、独立的 DOM 附加到一个元素上。

### 代码

```html
<!-- Demo/003_shadow_dom/001_demo.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <template id="user-text-template">
        <style>
            p {
                color: red;
            }
        </style>
        <p id="templateDOM">你好，我是模版！</p>
        <p><slot>因为我是无效的，我也会默认展示</slot></p>
    </template>
    <user-text>
        <p>light DOM 环境下，slot 标签没用</p>
    </user-text>
    <p>测试 shadow DOM 样式不作用全局</p>
    <script>
        class UserText extends HTMLElement {
            constructor () {
                super();
            }
            connectedCallback () {
                this.attachShadow({ mode: "open" });
                const oldNode = document.getElementById("user-text-template").content;
                const newNode = oldNode.cloneNode(true);
                this.shadowRoot.appendChild(newNode);
            }
        }
        globalThis.customElements.define("user-text", UserText);
        console.log(document.getElementById("templateDOM"));
    </script>
</body>
</html>
```

使用 `attachShadow`，组件的样式应该与代码封装在一起，只对自定义元素生效，不影响外部的全局样式、DOM 默认与外部 DOM 隔离，内部任何代码都无法影响外部，同时 slot 也生效了

### css穿透

```html
<!-- Demo/003_shadow_dom/002_demo.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS 变量样式穿透</title>
    <style>
        [type="primary"] {
            --ui-button-border: 1px solid transparent;
            --ui-button-background: deepskyblue;
            --ui-button-color: #fff;
        }
    </style>
</head>
<body>
    <template id="ui-button-template">
        <style>
            button {
                cursor: pointer;
                padding: 9px 1em;
                border: var(--ui-button-border, 1px solid #ccc);
                border-radius: var(--ui-button-radius, 4px);
                background-color: var(--ui-button-background, #fff);
                color:  var(--ui-button-color, #333);
            }
        </style>
        <button ><slot></slot></button>
    </template>
    <ui-button type="primary">按钮</ui-button>
    <script>
        class UiButton extends HTMLElement {
            constructor () {
                super();
            }
            connectedCallback () {
                this.attachShadow( { mode: "open" });
                const oldNode = document.getElementById("ui-button-template").content;
                const newNode = oldNode.cloneNode(true);
                this.shadowRoot.appendChild(newNode);
            }
        }
        globalThis.customElements.define("ui-button", UiButton);
    </script>
</body>
</html>
```

### ::part 样式穿透

```html
<!-- Demo/003_shadow_dom/003_demo.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>::part 样式穿透</title>
    <style>
        [type="primary"]::part(button) {
            cursor: pointer;
                padding: 9px 1em;
                border: 1px solid #ccc;
                border-radius: 4px;
                background-color: skyblue;;
                color:  #987;
        }
    </style>
</head>
<body>
    <template id="ui-button-template">
        <button part="button"><slot></slot></button>
    </template>
    <ui-button type="primary">按钮</ui-button>
    <script>
        class UiButton extends HTMLElement {
            constructor () {
                super();
            }
            connectedCallback () {
                this.attachShadow( { mode: "open" });
                const oldNode = document.getElementById("ui-button-template").content;
                const newNode = oldNode.cloneNode(true);
                this.shadowRoot.appendChild(newNode);
            }
        }
        globalThis.customElements.define("ui-button", UiButton);
    </script>
</body>
</html>
```