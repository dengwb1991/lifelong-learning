;(function(){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../../_common/util', '../_style/common.css', './style/index.css'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../../_common/util'), require('../_style/common.css'), require('./style/index.css'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.util, global.common, global.index);
    global.index = mod.exports;
  }
})(this, function (exports, _util) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'd-button',
    props: {
      msg: {
        type: String,
        default: '按钮'
      }
    },
    created: function created() {
      (0, _util.transformCamelCase)('Abc');
    }
  };
});
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"d-button"},[_vm._v("\n  "+_vm._s(_vm.msg)+"\n")])}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-73fc7322"
