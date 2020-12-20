# 变色龙

[github](https://github.com/didi/chameleon)

[文档](https://cml.didi.cn/)


## 起步

安装全局命令

```bash
$ npm i -g chameleon-tool
```

## 创建项目与启动

* 执行 cml init project
* 输入项目名称
* 等待自动执行 npm install 依赖
* 切换到项目根目录执行cml dev

## 创建页面与组件

```bash
$ cml init page

$ cml init component
```

## CMSS 

CMSS(Chameleon Style Sheets)是一套样式语言，用于描述 CML 的组件样式。

* 可采用 FlexBox 布局，请勿使用 float 方式布局