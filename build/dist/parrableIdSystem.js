pbjsChunk([145],{

/***/ 583:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(584);


/***/ }),

/***/ 584:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parrableIdSubmodule", function() { return parrableIdSubmodule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_hook_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_refererDetection_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_adapterManager_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_storageManager_js__ = __webpack_require__(9);
/**
 * This module adds Parrable to the User ID module
 * The {@link module:modules/userId} module is required
 * @module modules/parrableIdSystem
 * @requires module:modules/userId
 */






var PARRABLE_URL = 'https://h.parrable.com/prebid';
var PARRABLE_COOKIE_NAME = '_parrable_id';
var LEGACY_ID_COOKIE_NAME = '_parrable_eid';
var LEGACY_OPTOUT_COOKIE_NAME = '_parrable_optout';
var ONE_YEAR_MS = 364 * 24 * 60 * 60 * 1000;
var EXPIRE_COOKIE_DATE = 'Thu, 01 Jan 1970 00:00:00 GMT';
var storage = Object(__WEBPACK_IMPORTED_MODULE_5__src_storageManager_js__["b" /* getStorageManager */])();

function getExpirationDate() {
  var oneYearFromNow = new Date(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["timestamp"]() + ONE_YEAR_MS);
  return oneYearFromNow.toGMTString();
}

function deserializeParrableId(parrableIdStr) {
  var parrableId = {};
  var values = parrableIdStr.split(',');
  values.forEach(function (value) {
    var pair = value.split(':'); // unpack a value of 1 as true

    parrableId[pair[0]] = +pair[1] === 1 ? true : pair[1];
  });
  return parrableId;
}

function serializeParrableId(parrableId) {
  var components = [];

  if (parrableId.eid) {
    components.push('eid:' + parrableId.eid);
  }

  if (parrableId.ibaOptout) {
    components.push('ibaOptout:1');
  }

  if (parrableId.ccpaOptout) {
    components.push('ccpaOptout:1');
  }

  return components.join(',');
}

function isValidConfig(configParams) {
  if (!configParams) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('User ID - parrableId submodule requires configParams');
    return false;
  }

  if (!configParams.partner) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('User ID - parrableId submodule requires partner list');
    return false;
  }

  if (configParams.storage) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('User ID - parrableId submodule does not require a storage config');
  }

  return true;
}

function readCookie() {
  var parrableIdStr = storage.getCookie(PARRABLE_COOKIE_NAME);

  if (parrableIdStr) {
    return deserializeParrableId(decodeURIComponent(parrableIdStr));
  }

  return null;
}

function writeCookie(parrableId) {
  if (parrableId) {
    var parrableIdStr = encodeURIComponent(serializeParrableId(parrableId));
    storage.setCookie(PARRABLE_COOKIE_NAME, parrableIdStr, getExpirationDate(), 'lax');
  }
}

function readLegacyCookies() {
  var eid = storage.getCookie(LEGACY_ID_COOKIE_NAME);
  var ibaOptout = storage.getCookie(LEGACY_OPTOUT_COOKIE_NAME) === 'true';

  if (eid || ibaOptout) {
    var parrableId = {};

    if (eid) {
      parrableId.eid = eid;
    }

    if (ibaOptout) {
      parrableId.ibaOptout = ibaOptout;
    }

    return parrableId;
  }

  return null;
}

function migrateLegacyCookies(parrableId) {
  if (parrableId) {
    writeCookie(parrableId);

    if (parrableId.eid) {
      storage.setCookie(LEGACY_ID_COOKIE_NAME, '', EXPIRE_COOKIE_DATE);
    }

    if (parrableId.ibaOptout) {
      storage.setCookie(LEGACY_OPTOUT_COOKIE_NAME, '', EXPIRE_COOKIE_DATE);
    }
  }
}

function fetchId(configParams) {
  if (!isValidConfig(configParams)) return;
  var parrableId = readCookie();

  if (!parrableId) {
    parrableId = readLegacyCookies();
    migrateLegacyCookies(parrableId);
  }

  var eid = parrableId ? parrableId.eid : null;
  var refererInfo = Object(__WEBPACK_IMPORTED_MODULE_3__src_refererDetection_js__["a" /* getRefererInfo */])();
  var uspString = __WEBPACK_IMPORTED_MODULE_4__src_adapterManager_js__["uspDataHandler"].getConsentData();
  var data = {
    eid: eid,
    trackers: configParams.partner.split(','),
    url: refererInfo.referer
  };
  var searchParams = {
    data: btoa(JSON.stringify(data)),
    _rand: Math.random()
  };

  if (uspString) {
    searchParams.us_privacy = uspString;
  }

  var options = {
    method: 'GET',
    withCredentials: true
  };

  var callback = function callback(cb) {
    var callbacks = {
      success: function success(response) {
        var newParrableId = parrableId ? __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepClone"](parrableId) : {};

        if (response) {
          try {
            var responseObj = JSON.parse(response);

            if (responseObj) {
              if (responseObj.ccpaOptout !== true) {
                newParrableId.eid = responseObj.eid;
              } else {
                newParrableId.eid = null;
                newParrableId.ccpaOptout = true;
              }

              if (responseObj.ibaOptout === true) {
                newParrableId.ibaOptout = true;
              }
            }
          } catch (error) {
            __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](error);
            cb();
          }

          writeCookie(newParrableId);
          cb(newParrableId);
        } else {
          __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('parrableId: ID fetch returned an empty result');
          cb();
        }
      },
      error: function error(_error) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("parrableId: ID fetch encountered an error", _error);
        cb();
      }
    };
    Object(__WEBPACK_IMPORTED_MODULE_1__src_ajax_js__["a" /* ajax */])(PARRABLE_URL, callbacks, searchParams, options);
  };

  return {
    callback: callback,
    id: parrableId
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
   * @param {ParrableId} parrableId
   * @return {(Object|undefined}
   */
  decode: function decode(parrableId) {
    if (parrableId && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isPlainObject"](parrableId)) {
      return {
        parrableId: parrableId
      };
    }

    return undefined;
  },

  /**
   * performs action to obtain id and return a value in the callback's response argument
   * @function
   * @param {SubmoduleParams} [configParams]
   * @param {ConsentData} [consentData]
   * @returns {function(callback:function), id:ParrableId}
   */
  getId: function getId(configParams, gdprConsentData, currentStoredId) {
    return fetchId(configParams);
  }
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_hook_js__["e" /* submodule */])('userId', parrableIdSubmodule);

/***/ })

},[583]);