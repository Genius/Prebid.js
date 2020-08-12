pbjsChunk([93],{

/***/ 395:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(396);


/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parrableIdSubmodule", function() { return parrableIdSubmodule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_ajax__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_hook__ = __webpack_require__(13);
/**
 * This module adds Parrable to the User ID module
 * The {@link module:modules/userId} module is required
 * @module modules/parrableIdSystem
 * @requires module:modules/userId
 */



var PARRABLE_URL = 'https://h.parrable.com/prebid';

function isValidConfig(configParams) {
  if (!configParams) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('User ID - parrableId submodule requires configParams');
    return false;
  }

  if (!configParams.partner) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('User ID - parrableId submodule requires partner list');
    return false;
  }

  return true;
}

function fetchId(configParams, consentData, currentStoredId) {
  if (!isValidConfig(configParams)) return;
  var data = {
    eid: currentStoredId || null,
    trackers: configParams.partner.split(',')
  };
  var searchParams = {
    data: btoa(JSON.stringify(data)),
    _rand: Math.random()
  };
  var options = {
    method: 'GET',
    withCredentials: true
  };

  var callback = function callback(cb) {
    var onSuccess = function onSuccess(response) {
      var eid;

      if (response) {
        try {
          var responseObj = JSON.parse(response);
          eid = responseObj ? responseObj.eid : undefined;
        } catch (error) {
          __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](error);
        }
      }

      cb(eid);
    };

    Object(__WEBPACK_IMPORTED_MODULE_1__src_ajax__["a" /* ajax */])(PARRABLE_URL, onSuccess, searchParams, options);
  };

  return {
    callback: callback
  };
}

;
/** @type {Submodule} */

var parrableIdSubmodule = {
  /**
   * used to link submodule with config
   * @type {string}
   */
  name: 'parrableId',

  /**
   * decode the stored id value for passing to bid requests
   * @function
   * @param {Object|string} value
   * @return {(Object|undefined}
   */
  decode: function decode(value) {
    return value && typeof value === 'string' ? {
      'parrableid': value
    } : undefined;
  },

  /**
   * performs action to obtain id and return a value in the callback's response argument
   * @function
   * @param {SubmoduleParams} [configParams]
   * @param {ConsentData} [consentData]
   * @returns {function(callback:function)}
   */
  getId: function getId(configParams, consentData, currentStoredId) {
    return fetchId(configParams, consentData, currentStoredId);
  }
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_hook__["e" /* submodule */])('userId', parrableIdSubmodule);

/***/ })

},[395]);