(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.util = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.transformCamelCase = transformCamelCase;
  /**
   * kebab-case -> camelCase
   */
  function transformCamelCase(str) {
    var re = /-(\w)/g;
    return str.replace(re, function ($0, $1) {
      return $1.toUpperCase();
    });
  }
});