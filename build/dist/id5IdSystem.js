pbjsChunk([202],{

/***/ 446:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(447);


/***/ }),

/***/ 447:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "id5IdSubmodule", function() { return id5IdSubmodule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_hook_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_refererDetection_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_storageManager_js__ = __webpack_require__(9);
/**
 * This module adds ID5 to the User ID module
 * The {@link module:modules/userId} module is required
 * @module modules/id5IdSystem
 * @requires module:modules/userId
 */





var MODULE_NAME = 'id5Id';
var GVLID = 131;
var BASE_NB_COOKIE_NAME = 'id5id.1st';
var NB_COOKIE_EXP_DAYS = 30 * 24 * 60 * 60 * 1000; // 30 days

var storage = Object(__WEBPACK_IMPORTED_MODULE_4__src_storageManager_js__["b" /* getStorageManager */])(GVLID, MODULE_NAME);
/** @type {Submodule} */

var id5IdSubmodule = {
  /**
   * used to link submodule with config
   * @type {string}
   */
  name: 'id5Id',

  /**
   * Vendor id of ID5
   * @type {Number}
   */
  gvlid: GVLID,

  /**
   * decode the stored id value for passing to bid requests
   * @function decode
   * @param {(Object|string)} value
   * @returns {(Object|undefined)}
   */
  decode: function decode(value) {
    if (value && typeof value.ID5ID === 'string') {
      // don't lose our legacy value from cache
      return {
        'id5id': value.ID5ID
      };
    } else if (value && typeof value.universal_uid === 'string') {
      return {
        'id5id': value.universal_uid
      };
    } else {
      return undefined;
    }
  },

  /**
   * performs action to obtain id and return a value in the callback's response argument
   * @function getId
   * @param {SubmoduleParams} [configParams]
   * @param {ConsentData} [consentData]
   * @param {(Object|undefined)} cacheIdObj
   * @returns {IdResponse|undefined}
   */
  getId: function getId(configParams, consentData, cacheIdObj) {
    if (!hasRequiredParams(configParams)) {
      return undefined;
    }

    var hasGdpr = consentData && typeof consentData.gdprApplies === 'boolean' && consentData.gdprApplies ? 1 : 0;
    var gdprConsentString = hasGdpr ? consentData.consentString : '';
    var url = "https://id5-sync.com/g/v2/".concat(configParams.partner, ".json?gdpr_consent=").concat(gdprConsentString, "&gdpr=").concat(hasGdpr);
    var referer = Object(__WEBPACK_IMPORTED_MODULE_3__src_refererDetection_js__["a" /* getRefererInfo */])();
    var signature = cacheIdObj && cacheIdObj.signature ? cacheIdObj.signature : '';
    var pubId = cacheIdObj && cacheIdObj.ID5ID ? cacheIdObj.ID5ID : ''; // TODO: remove when 1puid isn't needed

    var data = {
      'partner': configParams.partner,
      '1puid': pubId,
      // TODO: remove when 1puid isn't needed
      'nbPage': incrementNb(configParams),
      'o': 'pbjs',
      'pd': configParams.pd || '',
      'rf': referer.referer,
      's': signature,
      'top': referer.reachedTop ? 1 : 0,
      'u': referer.stack[0] || window.location.href,
      'v': "4.2.0"
    };

    var resp = function resp(callback) {
      var callbacks = {
        success: function success(response) {
          var responseObj;

          if (response) {
            try {
              responseObj = JSON.parse(response);
              resetNb(configParams);
            } catch (error) {
              __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](error);
            }
          }

          callback(responseObj);
        },
        error: function error(_error) {
          __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("id5Id: ID fetch encountered an error", _error);
          callback();
        }
      };
      Object(__WEBPACK_IMPORTED_MODULE_1__src_ajax_js__["a" /* ajax */])(url, callbacks, JSON.stringify(data), {
        method: 'POST',
        withCredentials: true
      });
    };

    return {
      callback: resp
    };
  },

  /**
   * Similar to Submodule#getId, this optional method returns response to for id that exists already.
   *  If IdResponse#id is defined, then it will be written to the current active storage even if it exists already.
   *  If IdResponse#callback is defined, then it'll called at the end of auction.
   *  It's permissible to return neither, one, or both fields.
   * @function extendId
   * @param {SubmoduleParams} configParams
   * @param {Object} cacheIdObj - existing id, if any
   * @return {(IdResponse|function(callback:function))} A response object that contains id and/or callback.
   */
  extendId: function extendId(configParams, cacheIdObj) {
    incrementNb(configParams);
    return cacheIdObj;
  }
};

function hasRequiredParams(configParams) {
  if (!configParams || typeof configParams.partner !== 'number') {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("User ID - ID5 submodule requires partner to be defined as a number");
    return false;
  }

  return true;
}

function nbCookieName(configParams) {
  return hasRequiredParams(configParams) ? "".concat(BASE_NB_COOKIE_NAME, "_").concat(configParams.partner, "_nb") : undefined;
}

function nbCookieExpStr(expDays) {
  return new Date(Date.now() + expDays).toUTCString();
}

function storeNbInCookie(configParams, nb) {
  storage.setCookie(nbCookieName(configParams), nb, nbCookieExpStr(NB_COOKIE_EXP_DAYS), 'Lax');
}

function getNbFromCookie(configParams) {
  var cacheNb = storage.getCookie(nbCookieName(configParams));
  return cacheNb ? parseInt(cacheNb) : 0;
}

function incrementNb(configParams) {
  var nb = getNbFromCookie(configParams) + 1;
  storeNbInCookie(configParams, nb);
  return nb;
}

function resetNb(configParams) {
  storeNbInCookie(configParams, 0);
}

Object(__WEBPACK_IMPORTED_MODULE_2__src_hook_js__["e" /* submodule */])('userId', id5IdSubmodule);

/***/ })

},[446]);