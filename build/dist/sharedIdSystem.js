pbjsChunk([108],{

/***/ 682:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(683);


/***/ }),

/***/ 683:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sharedIdSubmodule", function() { return sharedIdSubmodule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_hook_js__ = __webpack_require__(13);
/**
 * This module adds Shared ID support to the User ID module
 * The {@link module:modules/userId} module is required.
 * @module modules/sharedIdSystem
 * @requires module:modules/userId
 */



var MODULE_NAME = 'sharedId';
var ID_SVC = 'https://id.sharedid.org/id';
var DEFAULT_24_HOURS = 86400;
var OPT_OUT_VALUE = '00000000000000000000000000'; // These values should NEVER change. If
// they do, we're no longer making ulids!

var ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'; // Crockford's Base32

var ENCODING_LEN = ENCODING.length;
var TIME_MAX = Math.pow(2, 48) - 1;
var TIME_LEN = 10;
var RANDOM_LEN = 16;
var id = factory();
/**
 * Constructs cookie value
 * @param value
 * @param needsSync
 * @returns {string}
 */

function constructCookieValue(value, needsSync) {
  var cookieValue = {};
  cookieValue.id = value;
  cookieValue.ts = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["timestamp"]();

  if (needsSync) {
    cookieValue.ns = true;
  }

  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('SharedId: cookie Value: ' + JSON.stringify(cookieValue));
  return cookieValue;
}
/**
 * Checks if id needs to be synced
 * @param configParams
 * @param storedId
 * @returns {boolean}
 */


function isIdSynced(configParams, storedId) {
  var needSync = storedId.ns;

  if (needSync) {
    return true;
  }

  if (!configParams || typeof configParams.syncTime !== 'number') {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('SharedId: Sync time is not configured or is not a number');
  }

  var syncTime = !configParams || typeof configParams.syncTime !== 'number' ? DEFAULT_24_HOURS : configParams.syncTime;

  if (syncTime > DEFAULT_24_HOURS) {
    syncTime = DEFAULT_24_HOURS;
  }

  var cookieTimestamp = storedId.ts;

  if (cookieTimestamp) {
    var secondBetweenTwoDate = timeDifferenceInSeconds(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["timestamp"](), cookieTimestamp);
    return secondBetweenTwoDate >= syncTime;
  }

  return false;
}
/**
 * Gets time difference in secounds
 * @param date1
 * @param date2
 * @returns {number}
 */


function timeDifferenceInSeconds(date1, date2) {
  var diff = (date1 - date2) / 1000;
  return Math.abs(Math.round(diff));
}
/**
 * id generation call back
 * @param result
 * @param callback
 * @returns {{success: success, error: error}}
 */


function idGenerationCallback(callback) {
  return {
    success: function success(responseBody) {
      var value = {};

      if (responseBody) {
        try {
          var responseObj = JSON.parse(responseBody);
          __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('SharedId: Generated SharedId: ' + responseObj.sharedId);
          value = constructCookieValue(responseObj.sharedId, false);
        } catch (error) {
          __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](error);
        }
      }

      callback(value);
    },
    error: function error(statusText, responseBody) {
      var value = constructCookieValue(id(), true);
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('SharedId: Ulid Generated SharedId: ' + value.id);
      callback(value);
    }
  };
}
/**
 * existing id generation call back
 * @param result
 * @param callback
 * @returns {{success: success, error: error}}
 */


function existingIdCallback(storedId, callback) {
  return {
    success: function success(responseBody) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('SharedId: id to be synced: ' + storedId.id);

      if (responseBody) {
        try {
          var responseObj = JSON.parse(responseBody);
          storedId = constructCookieValue(responseObj.sharedId, false);
          __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('SharedId: Older SharedId: ' + storedId.id);
        } catch (error) {
          __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](error);
        }
      }

      callback(storedId);
    },
    error: function error() {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('SharedId: Sync error for id : ' + storedId.id);
      callback(storedId);
    }
  };
}
/**
 * Encode the id
 * @param value
 * @returns {string|*}
 */


function encodeId(value) {
  var result = {};
  var sharedId = value && typeof value['id'] === 'string' ? value['id'] : undefined;

  if (sharedId == OPT_OUT_VALUE) {
    return undefined;
  }

  if (sharedId) {
    var bidIds = {
      id: sharedId
    };
    var ns = value && typeof value['ns'] === 'boolean' ? value['ns'] : undefined;

    if (ns == undefined) {
      bidIds.third = sharedId;
    }

    result.sharedid = bidIds;
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('SharedId: Decoded value ' + JSON.stringify(result));
    return result;
  }

  return sharedId;
}
/**
 * the factory to generate unique identifier based on time and current pseudorandom number
 * @param {string} the current pseudorandom number generator
 * @returns {function(*=): *}
 */


function factory(currPrng) {
  if (!currPrng) {
    currPrng = detectPrng();
  }

  return function ulid(seedTime) {
    if (isNaN(seedTime)) {
      seedTime = Date.now();
    }

    return encodeTime(seedTime, TIME_LEN) + encodeRandom(RANDOM_LEN, currPrng);
  };
}
/**
 * creates and logs the error message
 * @function
 * @param {string} error message
 * @returns {Error}
 */


function createError(message) {
  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](message);
  var err = new Error(message);
  err.source = 'sharedId';
  return err;
}
/**
 * gets a a random charcter from generated pseudorandom number
 * @param {string} the generated pseudorandom number
 * @returns {string}
 */


function randomChar(prng) {
  var rand = Math.floor(prng() * ENCODING_LEN);

  if (rand === ENCODING_LEN) {
    rand = ENCODING_LEN - 1;
  }

  return ENCODING.charAt(rand);
}
/**
 * encodes the time based on the length
 * @param now
 * @param len
 * @returns {string} encoded time.
 */


function encodeTime(now, len) {
  if (isNaN(now)) {
    throw new Error(now + ' must be a number');
  }

  if (Number.isInteger(now) === false) {
    throw createError('time must be an integer');
  }

  if (now > TIME_MAX) {
    throw createError('cannot encode time greater than ' + TIME_MAX);
  }

  if (now < 0) {
    throw createError('time must be positive');
  }

  if (Number.isInteger(len) === false) {
    throw createError('length must be an integer');
  }

  if (len < 0) {
    throw createError('length must be positive');
  }

  var mod;
  var str = '';

  for (; len > 0; len--) {
    mod = now % ENCODING_LEN;
    str = ENCODING.charAt(mod) + str;
    now = (now - mod) / ENCODING_LEN;
  }

  return str;
}
/**
 * encodes random character
 * @param len
 * @param prng
 * @returns {string}
 */


function encodeRandom(len, prng) {
  var str = '';

  for (; len > 0; len--) {
    str = randomChar(prng) + str;
  }

  return str;
}
/**
 * detects the pseudorandom number generator and generates the random number
 * @function
 * @param {string} error message
 * @returns {string} a random number
 */


function detectPrng(root) {
  if (!root) {
    root = typeof window !== 'undefined' ? window : null;
  }

  var browserCrypto = root && (root.crypto || root.msCrypto);

  if (browserCrypto) {
    return function () {
      var buffer = new Uint8Array(1);
      browserCrypto.getRandomValues(buffer);
      return buffer[0] / 0xff;
    };
  }

  return function () {
    return Math.random();
  };
}
/** @type {Submodule} */


var sharedIdSubmodule = {
  /**
   * used to link submodule with config
   * @type {string}
   */
  name: MODULE_NAME,

  /**
   * decode the stored id value for passing to bid requests
   * @function
   * @param {string} value
   * @returns {{sharedid:{ id: string, third:string}} or undefined if value doesn't exists
   */
  decode: function decode(value) {
    return value ? encodeId(value) : undefined;
  },

  /**
   * performs action to obtain id and return a value.
   * @function
   * @param {SubmoduleParams} [configParams]
   * @returns {sharedId}
   */
  getId: function getId(configParams) {
    var resp = function resp(callback) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('SharedId: Sharedid doesnt exists, new cookie creation');
      Object(__WEBPACK_IMPORTED_MODULE_1__src_ajax_js__["a" /* ajax */])(ID_SVC, idGenerationCallback(callback), undefined, {
        method: 'GET',
        withCredentials: true
      });
    };

    return {
      callback: resp
    };
  },

  /**
   * performs actions even if the id exists and returns a value
   * @param configParams
   * @param storedId
   * @returns {{callback: *}}
   */
  extendId: function extendId(configParams, storedId) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('SharedId: Existing shared id ' + storedId.id);

    var resp = function resp(callback) {
      var needSync = isIdSynced(configParams, storedId);

      if (needSync) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('SharedId: Existing shared id ' + storedId + ' is not synced');
        var sharedIdPayload = {};
        sharedIdPayload.sharedId = storedId.id;
        var payloadString = JSON.stringify(sharedIdPayload);
        Object(__WEBPACK_IMPORTED_MODULE_1__src_ajax_js__["a" /* ajax */])(ID_SVC, existingIdCallback(storedId, callback), payloadString, {
          method: 'POST',
          withCredentials: true
        });
      }
    };

    return {
      callback: resp
    };
  }
}; // Register submodule for userId

Object(__WEBPACK_IMPORTED_MODULE_2__src_hook_js__["e" /* submodule */])('userId', sharedIdSubmodule);

/***/ })

},[682]);