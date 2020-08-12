pbjsChunk([174],{

/***/ 203:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(204);


/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "britepoolIdSubmodule", function() { return britepoolIdSubmodule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_ajax__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_hook__ = __webpack_require__(13);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * This module adds BritePoolId to the User ID module
 * The {@link module:modules/userId} module is required
 * @module modules/britepoolIdSystem
 * @requires module:modules/userId
 */



/** @type {Submodule} */

var britepoolIdSubmodule = {
  /**
   * Used to link submodule with config
   * @type {string}
   */
  name: 'britepoolId',

  /**
   * Decode the stored id value for passing to bid requests
   * @function
   * @param {string} value
   * @returns {{britepoolid:string}}
   */
  decode: function decode(value) {
    return value && typeof value['primaryBPID'] === 'string' ? {
      'britepoolid': value['primaryBPID']
    } : null;
  },

  /**
   * Performs action to obtain id and return a value in the callback's response argument
   * @function
   * @param {SubmoduleParams} [configParams]
   * @returns {function(callback:function)}
   */
  getId: function getId(submoduleConfigParams, consentData) {
    var _britepoolIdSubmodule = britepoolIdSubmodule.createParams(submoduleConfigParams, consentData),
        params = _britepoolIdSubmodule.params,
        headers = _britepoolIdSubmodule.headers,
        url = _britepoolIdSubmodule.url,
        getter = _britepoolIdSubmodule.getter,
        errors = _britepoolIdSubmodule.errors;

    var getterResponse = null;

    if (typeof getter === 'function') {
      getterResponse = getter(params); // First let's rule out that the response is not a function

      if (typeof getterResponse !== 'function') {
        // Optimization to return value from getter
        return {
          id: britepoolIdSubmodule.normalizeValue(getterResponse)
        };
      }
    } // Return for async operation


    return {
      callback: function callback(_callback) {
        if (errors.length > 0) {
          errors.forEach(function (error) {
            return __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](error);
          });

          _callback();

          return;
        }

        if (getterResponse) {
          // Resolve the getter function response
          try {
            getterResponse(function (response) {
              _callback(britepoolIdSubmodule.normalizeValue(response));
            });
          } catch (error) {
            if (error !== '') __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](error);

            _callback();
          }
        } else {
          Object(__WEBPACK_IMPORTED_MODULE_1__src_ajax__["a" /* ajax */])(url, {
            success: function success(response) {
              var responseObj = britepoolIdSubmodule.normalizeValue(response);

              _callback(responseObj ? {
                primaryBPID: responseObj.primaryBPID
              } : null);
            },
            error: function error(_error) {
              if (_error !== '') __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](_error);

              _callback();
            }
          }, JSON.stringify(params), {
            customHeaders: headers,
            contentType: 'application/json',
            method: 'POST',
            withCredentials: true
          });
        }
      }
    };
  },

  /**
   * Helper method to create params for our API call
   * @param {SubmoduleParams} [configParams]
   * @returns {object} Object with parsed out params
   */
  createParams: function createParams(submoduleConfigParams, consentData) {
    var errors = [];
    var headers = {};

    var params = _extends({}, submoduleConfigParams);

    if (params.getter) {
      // Custom getter will not require other params
      if (typeof params.getter !== 'function') {
        errors.push("".concat(MODULE_NAME, " - britepoolId submodule requires getter to be a function"));
        return {
          errors: errors
        };
      }
    } else {
      if (params.api_key) {
        // Add x-api-key into the header
        headers['x-api-key'] = params.api_key;
      }
    }

    var url = params.url || 'https://api.britepool.com/v1/britepool/id';
    var getter = params.getter;
    delete params.api_key;
    delete params.url;
    delete params.getter;
    return {
      params: params,
      headers: headers,
      url: url,
      getter: getter,
      errors: errors
    };
  },

  /**
   * Helper method to normalize a JSON value
   */
  normalizeValue: function normalizeValue(value) {
    var valueObj = null;

    if (_typeof(value) === 'object') {
      valueObj = value;
    } else if (typeof value === 'string') {
      try {
        valueObj = JSON.parse(value);
      } catch (error) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](error);
      }
    }

    return valueObj;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_hook__["e" /* submodule */])('userId', britepoolIdSubmodule);

/***/ })

},[203]);