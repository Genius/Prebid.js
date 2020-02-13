pbjsChunk([159],{

/***/ 389:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(390);


/***/ }),

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "liveIntentIdSubmodule", function() { return liveIntentIdSubmodule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_ajax__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_hook__ = __webpack_require__(13);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This module adds LiveIntentId to the User ID module
 * The {@link module:modules/userId} module is required
 * @module modules/liveIntentIdSystem
 * @requires module:modules/userId
 */



var MODULE_NAME = 'liveIntentId';
var LIVE_CONNECT_DUID_KEY = '_li_duid';
var DOMAIN_USER_ID_QUERY_PARAM_KEY = 'duid';
var DEFAULT_LIVEINTENT_IDENTITY_URL = '//idx.liadm.com';
var DEFAULT_PREBID_SOURCE = 'prebid';
/** @type {Submodule} */

var liveIntentIdSubmodule = {
  /**
   * used to link submodule with config
   * @type {string}
   */
  name: MODULE_NAME,

  /**
   * decode the stored id value for passing to bid requests. Note that lipb object is a wrapper for everything, and
   * internally it could contain more data other than `lipbid`(e.g. `segments`) depending on the `partner` and
   * `publisherId` params.
   * @function
   * @param {{unifiedId:string}} value
   * @returns {{lipb:Object}}
   */
  decode: function decode(value) {
    function composeIdObject(value) {
      var base = {
        'lipbid': value['unifiedId']
      };
      delete value.unifiedId;
      return {
        'lipb': _objectSpread({}, base, {}, value)
      };
    }

    return value && typeof value['unifiedId'] === 'string' ? composeIdObject(value) : undefined;
  },

  /**
   * performs action to obtain id and return a value in the callback's response argument
   * @function
   * @param {SubmoduleParams} [configParams]
   * @returns {IdResponse|undefined}
   */
  getId: function getId(configParams) {
    var publisherId = configParams && configParams.publisherId;

    if (!publisherId && typeof publisherId !== 'string') {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]("".concat(MODULE_NAME, " - publisherId must be defined, not a '").concat(publisherId, "'"));
      return;
    }

    var baseUrl = DEFAULT_LIVEINTENT_IDENTITY_URL;
    var source = DEFAULT_PREBID_SOURCE;

    if (configParams.url) {
      baseUrl = configParams.url;
    }

    if (configParams.partner) {
      source = configParams.partner;
    }

    var additionalIdentifierNames = configParams.identifiersToResolve || [];
    var additionalIdentifiers = additionalIdentifierNames.concat([LIVE_CONNECT_DUID_KEY]).reduce(function (obj, identifier) {
      var value = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getCookie"](identifier) || __WEBPACK_IMPORTED_MODULE_0__src_utils__["getDataFromLocalStorage"](identifier);
      var key = identifier.replace(LIVE_CONNECT_DUID_KEY, DOMAIN_USER_ID_QUERY_PARAM_KEY);

      if (value) {
        if (_typeof(value) === 'object') {
          obj[key] = JSON.stringify(value);
        } else {
          obj[key] = value;
        }
      }

      return obj;
    }, {});
    var queryString = __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseQueryStringParameters"](additionalIdentifiers);
    var url = "".concat(baseUrl, "/idex/").concat(source, "/").concat(publisherId, "?").concat(queryString);

    var result = function result(callback) {
      Object(__WEBPACK_IMPORTED_MODULE_1__src_ajax__["a" /* ajax */])(url, function (response) {
        var responseObj = {};

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
      callback: result
    };
  }
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_hook__["e" /* submodule */])('userId', liveIntentIdSubmodule);

/***/ })

},[389]);