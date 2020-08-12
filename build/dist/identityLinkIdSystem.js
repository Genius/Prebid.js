pbjsChunk([136],{

/***/ 294:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(295);


/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identityLinkSubmodule", function() { return identityLinkSubmodule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_hook__ = __webpack_require__(13);
/**
 * This module adds IdentityLink to the User ID module
 * The {@link module:modules/userId} module is required
 * @module modules/identityLinkSubmodule
 * @requires module:modules/userId
 */



/** @type {Submodule} */

var identityLinkSubmodule = {
  /**
   * used to link submodule with config
   * @type {string}
   */
  name: 'identityLink',

  /**
   * decode the stored id value for passing to bid requests
   * @function
   * @param {string} value
   * @returns {{idl_env:string}}
   */
  decode: function decode(value) {
    return {
      'idl_env': value
    };
  },

  /**
   * performs action to obtain id and return a value in the callback's response argument
   * @function
   * @param {ConsentData} [consentData]
   * @param {SubmoduleParams} [configParams]
   * @returns {IdResponse|undefined}
   */
  getId: function getId(configParams, consentData) {
    if (!configParams || typeof configParams.pid !== 'string') {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('identityLink submodule requires partner id to be defined');
      return;
    }

    var hasGdpr = consentData && typeof consentData.gdprApplies === 'boolean' && consentData.gdprApplies ? 1 : 0;
    var gdprConsentString = hasGdpr ? consentData.consentString : ''; // use protocol relative urls for http or https

    var url = "https://api.rlcdn.com/api/identity/envelope?pid=".concat(configParams.pid).concat(hasGdpr ? '&ct=1&cv=' + gdprConsentString : '');
    var resp; // if ats library is initialised, use it to retrieve envelope. If not use standard third party endpoint

    if (window.ats) {
      resp = function resp(callback) {
        window.ats.retrieveEnvelope(function (envelope) {
          if (envelope) {
            callback(JSON.parse(envelope).envelope);
          } else {
            getEnvelope(url, callback);
          }
        });
      };
    } else {
      resp = function resp(callback) {
        getEnvelope(url, callback);
      };
    }

    return {
      callback: resp
    };
  }
}; // return envelope from third party endpoint

function getEnvelope(url, callback) {
  Object(__WEBPACK_IMPORTED_MODULE_1__src_ajax_js__["a" /* ajax */])(url, function (response) {
    var responseObj;

    if (response) {
      try {
        responseObj = JSON.parse(response);
      } catch (error) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](error);
      }
    }

    callback(responseObj.envelope);
  }, undefined, {
    method: 'GET',
    withCredentials: true
  });
}

Object(__WEBPACK_IMPORTED_MODULE_2__src_hook__["e" /* submodule */])('userId', identityLinkSubmodule);

/***/ })

},[294]);