pbjsChunk([162],{

/***/ 547:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(548);


/***/ }),

/***/ 548:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "netIdSubmodule", function() { return netIdSubmodule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_hook_js__ = __webpack_require__(13);
/**
 * This module adds netId to the User ID module
 * The {@link module:modules/userId} module is required
 * @module modules/netIdSystem
 * @requires module:modules/userId
 */

/** @type {Submodule} */

var netIdSubmodule = {
  /**
   * used to link submodule with config
   * @type {string}
   */
  name: 'netId',

  /**
   * decode the stored id value for passing to bid requests
   * @function decode
   * @param {(Object|string)} value
   * @returns {(Object|undefined)}
   */
  decode: function decode(value) {
    return value && typeof value['netId'] === 'string' ? {
      'netId': value['netId']
    } : undefined;
  },

  /**
   * performs action to obtain id and return a value in the callback's response argument
   * @function
   * @param {SubmoduleParams} [configParams]
   * @param {ConsentData} [consentData]
   * @param {(Object|undefined)} cacheIdObj
   * @returns {IdResponse|undefined}
   */
  getId: function getId(configParams) {
    /* currently not possible */
    return {};
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_hook_js__["e" /* submodule */])('userId', netIdSubmodule);

/***/ })

},[547]);