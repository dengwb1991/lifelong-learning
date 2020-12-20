var __CML__GLOBAL = require("../../../../manifest.js");
__CML__GLOBAL.webpackJsonp([5],{

/***/ "../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/babel-loader/lib/index.js?{\"filename\":\"/usr/local/lib/node_modules/chameleon-tool/chameleon.js\"}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/chameleon-loader/src/selector.js?type=script&index=0&fileType=component&media=dev&cmlType=qq&isInjectBaseStyle=true&check={\"enable\":true,\"enableTypes\":[]}!./node_modules/chameleon-ui-builtin/components/richtext/richtext.qq.cml":
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _richHandle = __webpack_require__("./node_modules/chameleon-ui-builtin/components/richtext/richHandle.js");

var _richHandle2 = _interopRequireDefault(_richHandle);

var _chameleonRuntime = __webpack_require__("./node_modules/chameleon-runtime/index.js");

var _chameleonRuntime2 = _interopRequireDefault(_chameleonRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __INTERFACE__FILEPATH = "/Users/didi/MyWorkspaces/lifelong-learning/chameleon/first-sample/hello-cml/node_modules/chameleon-ui-builtin/components/richtext/richtext.interface";
var __CML_ERROR__ = function throwError(content) {
  throw new Error("\u6587\u4EF6\u4F4D\u7F6E: " + __INTERFACE__FILEPATH + "\n            " + content);
};

var __enableTypes__ = [];
var __INTERFAE__DEFINES__ = {
  "types": {
    "richConfig": {
      "color": "String",
      "font_size": "Number",
      "start": "Number",
      "end": "Number",
      "font_family": "String",
      "font_weight": "String",
      "font_style": "String",
      "text_decoration": "String"
    },
    "richMessageArray": ["CMLObject"],
    "richData": {
      "message": "String",
      "rich_message": "richMessageArray"
    }
  },
  "interfaces": {
    "RichtextInterface": {
      "richData": "richData"
    }
  },
  "classes": {}
};
var __CML__DEFINES__ = {
  "types": {},
  "interfaces": {},
  "classes": {
    "Richtext": ["RichtextInterface"]
  }
};
var __CML__WRAPPER__ = __webpack_require__("../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/chameleon-loader/src/runtime/check.js");

var Richtext = function Richtext() {
  _classCallCheck(this, Richtext);

  this.props = {
    richData: {
      type: Object
    }
  };
  this.computed = {
    richList: function richList() {
      var richList = (0, _richHandle2.default)(this.richData);
      richList = richList.map(function (item, index) {
        var tempStyle = '';

        if (item.color) {
          tempStyle += "color:" + item.color + ";";
        }

        if (item.font_size) {
          tempStyle += "font-size:" + item.font_size + "cpx;";
        }

        if (item.font_family) {
          tempStyle += "font-family:" + item.font_family + ";";
        }

        if (item.font_weight) {
          tempStyle += "font-weight:" + item.font_weight + ";";
        }

        if (item.font_style) {
          tempStyle += "font-style:" + item.font_style + ";";
        }

        if (item.text_decoration) {
          tempStyle += "text-decoration:" + item.text_decoration + ";";
        }

        item.style = tempStyle;
        return item;
      });
      return richList;
    }
  };
  this.methods = {
    clickText: function clickText(ind) {
      if (this.richList[ind].click) {
        this.richList[ind].callback();
      }
    }
  };
};

exports.default = __CML__WRAPPER__(new Richtext(), __CML_ERROR__, __enableTypes__, __INTERFAE__DEFINES__, __CML__DEFINES__);


module.exports = function () {
  _chameleonRuntime2.default.createComponent(exports.default).getOptions();
};

/***/ }),

/***/ "../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/cml-extract-css-webpack-plugin/dist/loader.js?{\"omit\":1,\"remove\":true}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/vue-style-loader/index.js!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/chameleon-css-loader/index.js?{\"platform\":\"miniapp\",\"cmlType\":\"qq\"}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/postcss-loader/lib/index.js?{\"sourceMap\":false,\"config\":{\"path\":\"/usr/local/lib/node_modules/chameleon-tool/configs/postcss/qq/.postcssrc.js\"}}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/less-loader/dist/cjs.js?{\"sourceMap\":false}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/chameleon-css-loader/index.js?{\"media\":true,\"cmlType\":\"qq\"}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/chameleon-loader/src/selector.js?type=styles&index=0&fileType=component&media=dev&cmlType=qq&isInjectBaseStyle=true&check={\"enable\":true,\"enableTypes\":[]}!./node_modules/chameleon-ui-builtin/components/richtext/richtext.qq.cml":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/chameleon-ui-builtin/components/richtext/richHandle.js":
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = richHandle;
function richHandle(richData) {
  var richConf = richData.rich_message,
      richTexts = richData.message.split('');
  //切割文本
  richTexts = richTexts.map(function (item) {
    return {
      text: item,
      index: -1
    };
  });
  // 过滤错误配置
  richConf = richConf.filter(function (item) {
    var start = item.start,
        end = item.end;

    start = parseInt(start, 10);
    end = parseInt(end, 10);
    return !isNaN(start) && !isNaN(end) && start <= end;
  });
  // 遍历获取文本对应样式index
  richConf.forEach(function (item, index) {
    var start = item.start,
        end = item.end;

    start = parseInt(start, 10);
    end = parseInt(end, 10);
    start = start < 0 ? 0 : start;
    end = end > richTexts.length - 1 ? richTexts.length - 1 : end;
    for (var i = start; i <= end; i++) {
      richTexts[i].index = index;
    }
  });
  var start = 0,
      end = richTexts.length;
  var richList = [];
  while (start < end) {
    var i = start;
    var rIndex = richTexts[i].index;
    var conf = rIndex === -1 ? null : richConf[rIndex];
    var ri = {
      font_size: conf && conf.font_size,
      color: conf && conf.color,
      font_family: conf && conf.font_family,
      font_weight: conf && conf.font_weight,
      font_style: conf && conf.font_style,
      text_decoration: conf && conf.text_decoration,
      click: conf && conf.click,
      callback: conf && conf.callback,
      text: ''
    };
    for (; i < end; i++) {
      if (richTexts[i].index !== rIndex) {
        break;
      }
      ri.text += richTexts[i].text;
    }
    richList.push(ri);
    start = i;
  }

  return richList;
}

/***/ }),

/***/ "./node_modules/chameleon-ui-builtin/components/richtext/richtext.qq.cml":
/***/ (function(module, exports, __webpack_require__) {

var __cml__style0 = __webpack_require__("../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/cml-extract-css-webpack-plugin/dist/loader.js?{\"omit\":1,\"remove\":true}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/vue-style-loader/index.js!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/chameleon-css-loader/index.js?{\"platform\":\"miniapp\",\"cmlType\":\"qq\"}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/postcss-loader/lib/index.js?{\"sourceMap\":false,\"config\":{\"path\":\"/usr/local/lib/node_modules/chameleon-tool/configs/postcss/qq/.postcssrc.js\"}}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/less-loader/dist/cjs.js?{\"sourceMap\":false}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/chameleon-css-loader/index.js?{\"media\":true,\"cmlType\":\"qq\"}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/chameleon-loader/src/selector.js?type=styles&index=0&fileType=component&media=dev&cmlType=qq&isInjectBaseStyle=true&check={\"enable\":true,\"enableTypes\":[]}!./node_modules/chameleon-ui-builtin/components/richtext/richtext.qq.cml");
var __cml__script = __webpack_require__("../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/babel-loader/lib/index.js?{\"filename\":\"/usr/local/lib/node_modules/chameleon-tool/chameleon.js\"}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/chameleon-loader/src/selector.js?type=script&index=0&fileType=component&media=dev&cmlType=qq&isInjectBaseStyle=true&check={\"enable\":true,\"enableTypes\":[]}!./node_modules/chameleon-ui-builtin/components/richtext/richtext.qq.cml");

      __CML__GLOBAL.__CMLCOMPONNETS__['npm/chameleon-ui-builtin/components/richtext/richtext'] = __cml__script;


/***/ })

},["./node_modules/chameleon-ui-builtin/components/richtext/richtext.qq.cml"])
module.exports = __CML__GLOBAL.__CMLCOMPONNETS__['npm/chameleon-ui-builtin/components/richtext/richtext'];