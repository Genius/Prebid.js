pbjsChunk([181],{

/***/ 505:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(506);


/***/ }),

/***/ 506:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storage", function() { return storage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lotamePanoramaIdSubmodule", function() { return lotamePanoramaIdSubmodule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_hook_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_storageManager_js__ = __webpack_require__(9);
/**
 * This module adds LotamePanoramaId to the User ID module
 * The {@link module:modules/userId} module is required
 * @module modules/lotamePanoramaId
 * @requires module:modules/userId
 */




var KEY_ID = 'panoramaId';
var KEY_EXPIRY = "".concat(KEY_ID, "_expiry");
var KEY_PROFILE = '_cc_id';
var MODULE_NAME = 'lotamePanoramaId';
var NINE_MONTHS_MS = 23328000 * 1000;
var DAYS_TO_CACHE = 7;
var DAY_MS = 60 * 60 * 24 * 1000;
var storage = Object(__WEBPACK_IMPORTED_MODULE_3__src_storageManager_js__["b" /* getStorageManager */])(null, MODULE_NAME);
/**
 * Set the Lotame First Party Profile ID in the first party namespace
 * @param {String} profileId
 */

function setProfileId(profileId) {
  if (storage.cookiesAreEnabled()) {
    var expirationDate = new Date(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["timestamp"]() + NINE_MONTHS_MS).toUTCString();
    storage.setCookie(KEY_PROFILE, profileId, expirationDate, 'Lax', undefined, undefined);
  }

  if (storage.hasLocalStorage()) {
    storage.setDataInLocalStorage(KEY_PROFILE, profileId, undefined);
  }
}
/**
 * Get the Lotame profile id by checking cookies first and then local storage
 */


function getProfileId() {
  if (storage.cookiesAreEnabled()) {
    return storage.getCookie(KEY_PROFILE, undefined);
  }

  if (storage.hasLocalStorage()) {
    return storage.getDataFromLocalStorage(KEY_PROFILE, undefined);
  }
}
/**
 * Get a value from browser storage by checking cookies first and then local storage
 * @param {String} key
 */


function getFromStorage(key) {
  var value = null;

  if (storage.cookiesAreEnabled()) {
    value = storage.getCookie(key, undefined);
  }

  if (storage.hasLocalStorage() && value === null) {
    var storedValueExp = storage.getDataFromLocalStorage("".concat(key, "_exp"), undefined);

    if (storedValueExp === '') {
      value = storage.getDataFromLocalStorage(key, undefined);
    } else if (storedValueExp) {
      if (new Date(storedValueExp).getTime() - Date.now() > 0) {
        value = storage.getDataFromLocalStorage(key, undefined);
      }
    }
  }

  return value;
}
/**
 * Save a key/value pair to the browser cache (cookies and local storage)
 * @param {String} key
 * @param {String} value
 * @param {Number} expirationTimestamp
 */


function saveLotameCache(key, value) {
  var expirationTimestamp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["timestamp"]() + DAYS_TO_CACHE * DAY_MS;

  if (key && value) {
    var expirationDate = new Date(expirationTimestamp).toUTCString();

    if (storage.cookiesAreEnabled()) {
      storage.setCookie(key, value, expirationDate, 'Lax', undefined, undefined);
    }

    if (storage.hasLocalStorage()) {
      storage.setDataInLocalStorage("".concat(key, "_exp"), String(expirationTimestamp), undefined);
      storage.setDataInLocalStorage(key, value, undefined);
    }
  }
}
/**
 * Retrieve all the cached values from cookies and/or local storage
 */


function getLotameLocalCache() {
  var cache = {
    data: getFromStorage(KEY_ID),
    expiryTimestampMs: 0
  };

  try {
    var rawExpiry = getFromStorage(KEY_EXPIRY);

    if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](rawExpiry)) {
      cache.expiryTimestampMs = parseInt(rawExpiry, 0);
    }
  } catch (error) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](error);
  }

  return cache;
}
/**
 * Clear a cached value from cookies and local storage
 * @param {String} key
 */


function clearLotameCache(key) {
  if (key) {
    if (storage.cookiesAreEnabled()) {
      var expirationDate = new Date(0).toUTCString();
      storage.setCookie(key, '', expirationDate, 'Lax', undefined, undefined);
    }

    if (storage.hasLocalStorage()) {
      storage.removeDataFromLocalStorage(key, undefined);
    }
  }
}
/** @type {Submodule} */


var lotamePanoramaIdSubmodule = {
  /**
   * used to link submodule with config
   * @type {string}
   */
  name: MODULE_NAME,

  /**
   * Decode the stored id value for passing to bid requests
   * @function decode
   * @param {(Object|string)} value
   * @returns {(Object|undefined)}
   */
  decode: function decode(value, configParams) {
    return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](value) ? {
      'lotamePanoramaId': value
    } : undefined;
  },

  /**
   * Retrieve the Lotame Panorama Id
   * @function
   * @param {SubmoduleParams} [configParams]
   * @param {ConsentData} [consentData]
   * @param {(Object|undefined)} cacheIdObj
   * @returns {IdResponse|undefined}
   */
  getId: function getId(configParams, consentData, cacheIdObj) {
    var localCache = getLotameLocalCache();
    var refreshNeeded = Date.now() > localCache.expiryTimestampMs;

    if (!refreshNeeded) {
      return {
        id: localCache.data
      };
    }

    var storedUserId = getProfileId();

    var resolveIdFunction = function resolveIdFunction(callback) {
      var queryParams = {};

      if (storedUserId) {
        queryParams.fp = storedUserId;
      }

      if (consentData && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isBoolean"](consentData.gdprApplies)) {
        queryParams.gdpr_applies = consentData.gdprApplies;

        if (consentData.gdprApplies) {
          queryParams.gdpr_consent = consentData.consentString;
        }
      }

      var url = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["buildUrl"]({
        protocol: 'https',
        host: "id.crwdcntrl.net",
        pathname: '/id',
        search: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](queryParams) ? undefined : queryParams
      });
      Object(__WEBPACK_IMPORTED_MODULE_1__src_ajax_js__["a" /* ajax */])(url, function (response) {
        var coreId;

        if (response) {
          try {
            var responseObj = JSON.parse(response);
            saveLotameCache(KEY_EXPIRY, responseObj.expiry_ts);

            if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](responseObj.profile_id)) {
              setProfileId(responseObj.profile_id);

              if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](responseObj.core_id)) {
                saveLotameCache(KEY_ID, responseObj.core_id, responseObj.expiry_ts);
                coreId = responseObj.core_id;
              } else {
                clearLotameCache(KEY_ID);
              }
            } else {
              clearLotameCache(KEY_PROFILE);
              clearLotameCache(KEY_ID);
            }
          } catch (error) {
            __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](error);
          }
        }

        callback(coreId);
      }, undefined, {
        method: 'GET',
        withCredentials: true
      });
    };

    return {
      callback: resolveIdFunction
    };
  }
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_hook_js__["e" /* submodule */])('userId', lotamePanoramaIdSubmodule);

/***/ })

},[505]);