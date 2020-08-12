pbjsChunk([88],{

/***/ 410:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(411);


/***/ }),

/***/ 411:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pubCommonIdSubmodule", function() { return pubCommonIdSubmodule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_url__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_hook__ = __webpack_require__(13);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * This module adds PubCommonId to the User ID module
 * The {@link module:modules/userId} module is required
 * @module modules/pubCommonIdSystem
 * @requires module:modules/userId
 */



var PUB_COMMON_ID = 'PublisherCommonId';
var MODULE_NAME = 'pubCommonId';
/** @type {Submodule} */

var pubCommonIdSubmodule = {
  /**
   * used to link submodule with config
   * @type {string}
   */
  name: MODULE_NAME,

  /**
   * Return a callback function that calls the pixelUrl with id as a query parameter
   * @param pixelUrl
   * @param id
   * @returns {function}
   */
  makeCallback: function makeCallback(pixelUrl) {
    var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    if (!pixelUrl) {
      return;
    } // Use pubcid as a cache buster


    var urlInfo = __WEBPACK_IMPORTED_MODULE_1__src_url__["c" /* parse */](pixelUrl);
    urlInfo.search.id = encodeURIComponent('pubcid:' + id);
    var targetUrl = __WEBPACK_IMPORTED_MODULE_1__src_url__["a" /* format */](urlInfo);
    return function () {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["triggerPixel"](targetUrl);
    };
  },

  /**
   * decode the stored id value for passing to bid requests
   * @function
   * @param {string} value
   * @returns {{pubcid:string}}
   */
  decode: function decode(value) {
    return {
      'pubcid': value
    };
  },

  /**
   * performs action to obtain id
   * @function
   * @param {SubmoduleParams} [configParams]
   * @returns {IdResponse}
   */
  getId: function getId() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$create = _ref.create,
        create = _ref$create === void 0 ? true : _ref$create,
        pixelUrl = _ref.pixelUrl;

    try {
      if (_typeof(window[PUB_COMMON_ID]) === 'object') {
        // If the page includes its own pubcid module, then save a copy of id.
        return {
          id: window[PUB_COMMON_ID].getId()
        };
      }
    } catch (e) {}

    var newId = create ? __WEBPACK_IMPORTED_MODULE_0__src_utils__["generateUUID"]() : undefined;
    return {
      id: newId,
      callback: this.makeCallback(pixelUrl, newId)
    };
  },

  /**
   * performs action to extend an id
   * @function
   * @param {SubmoduleParams} [configParams]
   * @param {Object} storedId existing id
   * @returns {IdResponse|undefined}
   */
  extendId: function extendId() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$extend = _ref2.extend,
        extend = _ref2$extend === void 0 ? false : _ref2$extend,
        pixelUrl = _ref2.pixelUrl;

    var storedId = arguments.length > 1 ? arguments[1] : undefined;

    try {
      if (_typeof(window[PUB_COMMON_ID]) === 'object') {
        // If the page includes its onw pubcid module, then there is nothing to do.
        return;
      }
    } catch (e) {}

    if (extend) {
      // When extending, only one of response fields is needed
      var callback = this.makeCallback(pixelUrl, storedId);
      return callback ? {
        callback: callback
      } : {
        id: storedId
      };
    }
  }
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_hook__["e" /* submodule */])('userId', pubCommonIdSubmodule);

/***/ })

},[410]);