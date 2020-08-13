pbjsChunk([219],{

/***/ 412:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(413);


/***/ }),

/***/ 413:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adpodUtils", function() { return adpodUtils; });
/* harmony export (immutable) */ __webpack_exports__["notifyTranslationModule"] = notifyTranslationModule;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adServerManager_js__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_hook_js__ = __webpack_require__(13);
/**
 * This module adds Freewheel support for Video to Prebid.
 */


var adpodUtils = {};
function notifyTranslationModule(fn) {
  fn.call(this, 'freewheel');
}
Object(__WEBPACK_IMPORTED_MODULE_1__src_hook_js__["a" /* getHook */])('registerAdserver').before(notifyTranslationModule);
Object(__WEBPACK_IMPORTED_MODULE_0__src_adServerManager_js__["a" /* registerVideoSupport */])('freewheel', {
  getTargeting: function getTargeting(args) {
    return adpodUtils.getTargeting(args);
  }
});
Object(__WEBPACK_IMPORTED_MODULE_1__src_hook_js__["e" /* submodule */])('adpod', adpodUtils);

/***/ })

},[412]);