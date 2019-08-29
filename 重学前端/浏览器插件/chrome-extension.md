# manifest.json

[chrome-plugin-demo](https://github.com/sxei/chrome-plugin-demo)

```js
{
  // 清单文件的版本，这个必须写，而且必须是2
  "manifest_version": 2,
  // 名称
  "name": "name",
  // 版本
  "version": "1.0.0",
  // 描述
  "description": "This is a chrome extension",
  // 图标
  "icons": {
    "16": "images/icon.png",
    "48": "images/icon.png",
    "128": "images/icon.png"
  },
  // 持续在后台中运行、可以设置 html、js
  "background": {
    "page": "background.html",
    "scripts": ["background.js"]
  },
  // 浏览器设置
  "page_action": {
    "default_icon": "images/icon.png",
    "default_title": "Title",
    "default_popup": "popup.html"
  },
  // 注入[可以设置多个]
  "content_scripts": [
    {
      //"matches": ["http://*/*", "https://*/*"],
      // "<all_urls>" 表示匹配所有地址
      "matches": ["<all_urls>"],
      "js": ["jquery.js"],
      "css": ["bootstrap.css"],
      // 注入时间 document_start / document_end / document_idle，默认document_idle 闲置
      "run_at": "document_start"
    }
  ],
  "permissions": [
		"contextMenus", // 右键菜单
		"tabs", // 标签
		"notifications", // 通知
		"webRequest", // web请求
		"webRequestBlocking", // 阻塞式web请求
		"storage", // 插件本地存储
		"http://*/*", // 可以通过 executeScript 或者 insertCSS 访问的网站
		"https://*/*" // 可以通过 executeScript 或者 insertCSS 访问的网站
  ],
  // 普通页面能够直接访问的插件资源列表，如果不设置是无法直接访问的
  "web_accessible_resources": ["inject.js"],
  // 插件主页
  "homepage_url": "https://github.com/dengwb1991",
  // 覆盖浏览器默认页面
  "chrome_url_overrides": {
    "newtab": "newtab.html"
  },
  // Chrome40以前的插件配置页写法
  "options_page": "options.html",
  // Chrome40以后的插件配置页写法，如果2个都写，新版Chrome只认后面这一个
  "options_ui": {
    "page": "options.html",
    // 添加一些默认的样式，推荐使用
    "chrome_style": true
  },
  // 向地址栏注册一个关键字以提供搜索建议，只能设置一个关键字
  "omnibox": {
    "keyword" : "go"
  },
  // 默认语言
  "default_locale": "zh_CN",
  // devtools页面入口，注意只能指向一个HTML文件，不能是JS文件
  "devtools_page": "devtools.html"
}
```