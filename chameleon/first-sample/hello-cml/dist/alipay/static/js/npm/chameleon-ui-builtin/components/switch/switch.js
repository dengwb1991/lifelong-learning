var __CML__GLOBAL = require("../../../../manifest.js");
__CML__GLOBAL.webpackJsonp([14],{

/***/ "../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/babel-loader/lib/index.js?{\"filename\":\"/usr/local/lib/node_modules/chameleon-tool/chameleon.js\"}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/chameleon-loader/src/selector.js?type=script&index=0&fileType=component&media=dev&cmlType=alipay&isInjectBaseStyle=true&check={\"enable\":true,\"enableTypes\":[]}!./node_modules/chameleon-ui-builtin/components/switch/switch.alipay.cml":
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chameleonRuntime = __webpack_require__("./node_modules/chameleon-runtime/index.js");

var _chameleonRuntime2 = _interopRequireDefault(_chameleonRuntime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __INTERFACE__FILEPATH = "/Users/didi/MyWorkspaces/lifelong-learning/chameleon/first-sample/hello-cml/node_modules/chameleon-ui-builtin/components/switch/switch.interface";
var __CML_ERROR__ = function throwError(content) {
  throw new Error("\u6587\u4EF6\u4F4D\u7F6E: " + __INTERFACE__FILEPATH + "\n            " + content);
};

var __enableTypes__ = [];
var __INTERFAE__DEFINES__ = {
  "types": {
    "valueDetail": {
      "value": "Boolean"
    }
  },
  "interfaces": {
    "SwitchInterface": {
      "checked": "Boolean",
      "disabled": "Boolean",
      "label": "String",
      "opencolor": "String",
      "changeevent": {
        "input": ["valueDetail"],
        "output": "Undefined"
      },
      "change": {
        "input": ["valueDetail"],
        "output": "Undefined"
      }
    }
  },
  "classes": {}
};
var __CML__DEFINES__ = {
  "types": {},
  "interfaces": {},
  "classes": {
    "Switch": ["SwitchInterface"]
  }
};
var __CML__WRAPPER__ = __webpack_require__("../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/chameleon-loader/src/runtime/check.js");

var Switch = function Switch() {
  _classCallCheck(this, Switch);

  this.props = {
    checked: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    opencolor: {
      type: String,
      default: '#fc9153'
    }
  };
  this.methods = {
    switchChange: function switchChange(e) {
      this.$cmlEmit('change', {
        value: e.detail.value
      });
      this.$cmlEmit('changeevent', {
        value: e.detail.value
      });
    }
  };
};

exports.default = __CML__WRAPPER__(new Switch(), __CML_ERROR__, __enableTypes__, __INTERFAE__DEFINES__, __CML__DEFINES__);


module.exports = function () {
  _chameleonRuntime2.default.createComponent(exports.default).getOptions();
};

/***/ }),

/***/ "../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/cml-extract-css-webpack-plugin/dist/loader.js?{\"omit\":1,\"remove\":true}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/vue-style-loader/index.js!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/chameleon-css-loader/index.js?{\"platform\":\"miniapp\",\"cmlType\":\"alipay\"}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/postcss-loader/lib/index.js?{\"sourceMap\":false,\"config\":{\"path\":\"/usr/local/lib/node_modules/chameleon-tool/configs/postcss/alipay/.postcssrc.js\"}}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/less-loader/dist/cjs.js?{\"sourceMap\":false}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/chameleon-css-loader/index.js?{\"media\":true,\"cmlType\":\"alipay\"}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/chameleon-loader/src/selector.js?type=styles&index=0&fileType=component&media=dev&cmlType=alipay&isInjectBaseStyle=true&check={\"enable\":true,\"enableTypes\":[]}!./node_modules/chameleon-ui-builtin/components/switch/switch.alipay.cml":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./node_modules/chameleon-ui-builtin/components/switch/switch.alipay.cml":
/***/ (function(module, exports, __webpack_require__) {

var __cml__style0 = __webpack_require__("../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/cml-extract-css-webpack-plugin/dist/loader.js?{\"omit\":1,\"remove\":true}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/vue-style-loader/index.js!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/css-loader/index.js?{\"sourceMap\":false}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/chameleon-css-loader/index.js?{\"platform\":\"miniapp\",\"cmlType\":\"alipay\"}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/postcss-loader/lib/index.js?{\"sourceMap\":false,\"config\":{\"path\":\"/usr/local/lib/node_modules/chameleon-tool/configs/postcss/alipay/.postcssrc.js\"}}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/less-loader/dist/cjs.js?{\"sourceMap\":false}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/chameleon-css-loader/index.js?{\"media\":true,\"cmlType\":\"alipay\"}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/chameleon-loader/src/selector.js?type=styles&index=0&fileType=component&media=dev&cmlType=alipay&isInjectBaseStyle=true&check={\"enable\":true,\"enableTypes\":[]}!./node_modules/chameleon-ui-builtin/components/switch/switch.alipay.cml");
var __cml__script = __webpack_require__("../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/babel-loader/lib/index.js?{\"filename\":\"/usr/local/lib/node_modules/chameleon-tool/chameleon.js\"}!../../../../../../../usr/local/lib/node_modules/chameleon-tool/node_modules/chameleon-loader/src/selector.js?type=script&index=0&fileType=component&media=dev&cmlType=alipay&isInjectBaseStyle=true&check={\"enable\":true,\"enableTypes\":[]}!./node_modules/chameleon-ui-builtin/components/switch/switch.alipay.cml");

      __CML__GLOBAL.__CMLCOMPONNETS__['npm/chameleon-ui-builtin/components/switch/switch'] = __cml__script;


/***/ })

},["./node_modules/chameleon-ui-builtin/components/switch/switch.alipay.cml"])
module.exports = __CML__GLOBAL.__CMLCOMPONNETS__['npm/chameleon-ui-builtin/components/switch/switch'];