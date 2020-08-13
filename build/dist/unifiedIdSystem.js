pbjsChunk([72],{

/***/ 772:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(773);


/***/ }),

/***/ 773:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unifiedIdSubmodule", function() { return unifiedIdSubmodule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_hook_js__ = __webpack_require__(13);
/**
 * This module adds UnifiedId to the User ID module
 * The {@link module:modules/userId} module is required
 * @module modules/unifiedIdSystem
 * @requires module:modules/userId
 */



var MODULE_NAME = 'unifiedId';
/** @type {Submodule} */

var unifiedIdSubmodule = {
  /**
   * used to link submodule with config
   * @type {string}
   */
  name: MODULE_NAME,

  /**
   * decode the stored id value for passing to bid requests
   * @function
   * @param {{TDID:string}} value
   * @returns {{tdid:Object}}
   */
  decode: function decode(value) {
    return value && typeof value['TDID'] === 'string' ? {
      'tdid': value['TDID']
    } : undefined;
  },

  /**
   * performs action to obtain id and return a value in the callback's response argument
   * @function
   * @param {SubmoduleParams} [configParams]
   * @returns {IdResponse|undefined}
   */
  getId: function getId(configParams) {
    if (!configParams || typeof configParams.partner !== 'string' && typeof configParams.url !== 'string') {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('User ID - unifiedId submodule requires either partner or url to be defined');
      return;
    } // use protocol relative urls for http or https


    var url = configParams.url || "https://match.adsrvr.org/track/rid?ttd_pid=".concat(configParams.partner, "&fmt=json");

    var resp = function resp(callback) {
      var callbacks = {
        success: function success(response) {
          var responseObj;

          if (response) {
            try {
              responseObj = JSON.parse(response);
            } catch (error) {
              __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](error);
            }
          }

          callback(responseObj);
        },
        error: function error(_error) {
          __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("".concat(MODULE_NAME, ": ID fetch encountered an error"), _error);
          callback();
        }
      };
      Object(__WEBPACK_IMPORTED_MODULE_1__src_ajax_js__["a" /* ajax */])(url, callbacks, undefined, {
        method: 'GET',
        withCredentials: true
      });
    };

    return {
      callback: resp
    };
  }
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_hook_js__["e" /* submodule */])('userId', unifiedIdSubmodule);

/***/ })

},[772]);