pbjsChunk([156],{

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(247);


/***/ }),

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "criteortusIdSubmodule", function() { return criteortusIdSubmodule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_ajax__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_hook__ = __webpack_require__(13);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * This module adds Criteo Real Time User Sync to the User ID module
 * The {@link module:modules/userId} module is required
 * @module modules/criteortusIdSystem
 * @requires module:modules/userId
 */



var key = '__pbjs_criteo_rtus';
/** @type {Submodule} */

var criteortusIdSubmodule = {
  /**
   * used to link submodule with config
   * @type {string}
   */
  name: 'criteortus',

  /**
   * decode the stored id value for passing to bid requests
   * @function
   * @returns {{criteortus:Object}}
   */
  decode: function decode() {
    var uid = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getCookie"](key);

    try {
      uid = JSON.parse(uid);
      return {
        'criteortus': uid
      };
    } catch (error) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('Error in parsing criteo rtus data', error);
    }
  },

  /**
   * performs action to obtain id and return a value in the callback's response argument
   * @function
   * @param {SubmoduleParams} [configParams]
   * @returns {IdResponse|undefined}
   */
  getId: function getId(configParams) {
    if (!configParams || !__WEBPACK_IMPORTED_MODULE_0__src_utils__["isPlainObject"](configParams.clientIdentifier)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('User ID - Criteo rtus requires client identifier to be defined');
      return;
    }

    var uid = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getCookie"](key);

    if (uid) {
      return {
        id: uid
      };
    } else {
      var userIds = {};

      var resp = function resp(callback) {
        var bidders = Object.keys(configParams.clientIdentifier);

        function afterAllResponses() {
          // criteo rtus user id expires in 1 hour
          var expiresStr = new Date(Date.now() + 60 * 60 * 1000).toUTCString();
          __WEBPACK_IMPORTED_MODULE_0__src_utils__["setCookie"](key, JSON.stringify(userIds), expiresStr);
          callback(userIds);
        }

        var onResponse = __WEBPACK_IMPORTED_MODULE_0__src_utils__["delayExecution"](afterAllResponses, bidders.length);
        bidders.forEach(function (bidder) {
          var url = "https://gum.criteo.com/sync?c=".concat(configParams.clientIdentifier[bidder], "&r=3");

          var getSuccessHandler = function getSuccessHandler(bidder) {
            return function onSuccess(response) {
              if (response) {
                try {
                  response = JSON.parse(response);
                  userIds[bidder] = response;
                  onResponse();
                } catch (error) {
                  __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](error);
                }
              }
            };
          };

          var getFailureHandler = function getFailureHandler(bidder) {
            return function onFailure(error) {
              __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]("Criteo RTUS server call failed for ".concat(bidder), error);
              onResponse();
            };
          };

          Object(__WEBPACK_IMPORTED_MODULE_1__src_ajax__["a" /* ajax */])(url, {
            success: getSuccessHandler(bidder),
            error: getFailureHandler(bidder)
          }, undefined, _extends({
            method: 'GET',
            withCredentials: true
          }));
        });
      };

      return {
        callback: resp
      };
    }
  }
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_hook__["e" /* submodule */])('userId', criteortusIdSubmodule);

/***/ })

},[246]);