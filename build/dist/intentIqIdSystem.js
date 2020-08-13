pbjsChunk([196],{

/***/ 458:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(459);


/***/ }),

/***/ 459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intentIqIdSubmodule", function() { return intentIqIdSubmodule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_hook_js__ = __webpack_require__(13);
/**
 * This module adds IntentIqId to the User ID module
 * The {@link module:modules/userId} module is required
 * @module modules/intentIqIdSystem
 * @requires module:modules/userId
 */



var MODULE_NAME = 'intentIqId';
/** @type {Submodule} */

var intentIqIdSubmodule = {
  /**
   * used to link submodule with config
   * @type {string}
   */
  name: MODULE_NAME,

  /**
   * decode the stored id value for passing to bid requests
   * @function
   * @param {{ctrid:string}} value
   * @returns {{intentIqId:string}}
   */
  decode: function decode(value) {
    return value && typeof value['ctrid'] === 'string' ? {
      'intentIqId': value['ctrid']
    } : undefined;
  },

  /**
   * performs action to obtain id and return a value in the callback's response argument
   * @function
   * @param {SubmoduleParams} [configParams]
   * @returns {IdResponse|undefined}
   */
  getId: function getId(configParams) {
    if (!configParams || typeof configParams.partner !== 'number') {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('User ID - intentIqId submodule requires a valid partner to be defined');
      return;
    } // use protocol relative urls for http or https


    var url = "https://api.intentiq.com/profiles_engine/ProfilesEngineServlet?at=39&mi=10&dpi=".concat(configParams.partner, "&pt=17&dpn=1");

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
Object(__WEBPACK_IMPORTED_MODULE_2__src_hook_js__["e" /* submodule */])('userId', intentIqIdSubmodule);

/***/ })

},[458]);