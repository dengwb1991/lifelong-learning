# Karma

Karma是一个基于Node.js的JavaScript测试执行过程管理工具（Test Runner），

## 目的

Karma是一个测试工具，能让你的代码在浏览器环境下测试。需要它的原因在于，你的代码可能是设计在浏览器端执行的，在node环境下测试可能有些bug暴露不出来；另外，浏览器有兼容问题，karma提供了手段让你的代码自动在多个浏览器（chrome，firefox，ie等）环境下运行。如果你的代码只会运行在node端，那么你不需要用karma。

## karma ? mocha ? chai ？

karma是runner是管理工具

mocha是测试框架 (asmine、mocha、qunit、nodeunit、nunit、jasmine)

chai是断言库 (better-assert、expect、 unexpected、shuould)

3者个关系：chai => mocha => karma

## 安装
创建项目karma-test

```bash
$ cd karma-test/

$ npm init

$ npm install karma --save-dev

$ karma init

< Which testing framework do you want to use ? >
Press tab to list possible options. Enter to move to the next question.

> asmine / mocha /qunit / nodeunit / nunit

< Do you want to use Require.js ? >
This will add Require.js plugin.
Press tab to list possible options. Enter to move to the next question.

> yes / no

< Do you want to capture any browsers automatically ? >
Press tab to list possible options. Enter empty string to move to the next question.

> IE / Opera / PhantomJS / Safari / Firefox / ChromeCanary / ChromeHeadless / Chrome 

< What is the location of your source and test files ? >
You can use glob patterns, eg. "js/*.js" or "test/**/*Spec.js".
Enter empty string to move to the next question.

> 

< Should any of the files included by the previous patterns be excluded ? >
You can use glob patterns, eg. "**/*.swp".
Enter empty string to move to the next question

> 

< Do you wanna generate a bootstrap file for RequireJS? >
This will generate test-main.js/coffee that configures RequireJS and starts the tests.

> yes / no

< Which files do you want to include with <script> tag ? >
> This should be a script that bootstraps your test by configuring Require.js and kicking __karma__.start(), probably your test-main.js file.
Enter empty string to move to the next question.

>

< Do you want Karma to watch all the files and run the tests on change ? >
Press tab to list possible options.

> yes / no
```

## karma.config.js
```js
/***
 * Created by laixiangran on 2015/12/22.
 * karma单元测试配置文件
 */

module.exports = function(config) {

    config.set({
        /***
         * 基础路径，用在files，exclude属性上
         */
        basePath: "",
        /**
         * 测试框架
         * 可用的框架：https://npmjs.org/browse/keyword/karma-adapter
         */
        frameworks: ["jasmine"],
        /**
         * 需要加载到浏览器的文件列表
         */
        files: [
            "karmaTest/*.js"
        ],
        /**
         * 排除的文件列表
         */
        exclude: [
        ],
        /**
         * 在浏览器使用之前处理匹配的文件
         * 可用的预处理: https://npmjs.org/browse/keyword/karma-preprocessor
         */
        preprocessors: {
            "karmaTest/test.js" : "coverage"
        },
        /**
         * 使用测试结果报告者
         * 可能的值: "dots", "progress"
         * 可用的报告者：https://npmjs.org/browse/keyword/karma-reporter
         */
        reporters: ["progress", "coverage"],
        /**
         * 使用reporters为"coverage"时报告输出的类型和那目录
         */
        coverageReporter: {
            type: "html",
            dir: "karmaTest/coverage"
        },
        /**
         * 服务端口号
         */
        port: 9876,
        /**
         * 启用或禁用输出报告或者日志中的颜色
         */
        colors: true,
        /**
         * 日志等级
         * 可能的值：
         * config.LOG_DISABLE //不输出信息
         * config.LOG_ERROR    //只输出错误信息
         * config.LOG_WARN //只输出警告信息
         * config.LOG_INFO //输出全部信息
         * config.LOG_DEBUG //输出调试信息
         */
        logLevel: config.LOG_INFO,
        /**
         * 启用或禁用自动检测文件变化进行测试
         */
        autoWatch: true,
        /**
         * 测试启动的浏览器
         * 可用的浏览器：https://npmjs.org/browse/keyword/karma-launcher
         */
        browsers: ["Chrome"],
        /**
         * 开启或禁用持续集成模式
         * 设置为true, Karma将打开浏览器，执行测试并最后退出
         */
        singleRun: true,
        /**
         * 并发级别（启动的浏览器数）
         */
        concurrency: Infinity
    });
};

```