pbjsChunk([137],{

/***/ 292:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(293);


/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "id5IdSubmodule", function() { return id5IdSubmodule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_ajax__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_hook__ = __webpack_require__(13);
/**
 * This module adds ID5 to the User ID module
 * The {@link module:modules/userId} module is required
 * @module modules/unifiedIdSystem
 * @requires module:modules/userId
 */



/** @type {Submodule} */

var id5IdSubmodule = {
  /**
   * used to link submodule with config
   * @type {string}
   */
  name: 'id5Id',

  /**
   * decode the stored id value for passing to bid requests
   * @function decode
   * @param {(Object|string)} value
   * @returns {(Object|undefined)}
   */
  decode: function decode(value) {
    return value && typeof value['ID5ID'] === 'string' ? {
      'id5id': value['ID5ID']
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
  getId: function getId(configParams, consentData, cacheIdObj) {
    if (!configParams || typeof configParams.partner !== 'number') {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]("User ID - ID5 submodule requires partner to be defined as a number");
      return undefined;
    }

    var hasGdpr = consentData && typeof consentData.gdprApplies === 'boolean' && consentData.gdprApplies ? 1 : 0;
    var gdprConsentString = hasGdpr ? consentData.consentString : '';
    var storedUserId = this.decode(cacheIdObj);
    var url = "https://id5-sync.com/g/v1/".concat(configParams.partner, ".json?1puid=").concat(storedUserId ? storedUserId.id5id : '', "&gdpr=").concat(hasGdpr, "&gdpr_consent=").concat(gdprConsentString);

    var resp = function resp(callback) {
      Object(__WEBPACK_IMPORTED_MODULE_1__src_ajax__["a" /* ajax */])(url, function (response) {
        var responseObj;

        if (response) {
          try {
            responseObj = JSON.parse(response);
          } catch (error) {
            __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](error);
          }
        }

        callback(responseObj);
      }, undefined, {
        method: 'GET',
        withCredentials: true
      });
    };

    return {
      callback: resp
    };
  }
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_hook__["e" /* submodule */])('userId', id5IdSubmodule);

/***/ })

},[292]);