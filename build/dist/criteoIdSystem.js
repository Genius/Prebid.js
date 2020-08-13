pbjsChunk([240],{

/***/ 364:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(365);


/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storage", function() { return storage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "criteoIdSubmodule", function() { return criteoIdSubmodule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_refererDetection_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_hook_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_storageManager_js__ = __webpack_require__(9);
/**
 * This module adds Criteo Real Time User Sync to the User ID module
 * The {@link module:modules/userId} module is required
 * @module modules/criteoIdSystem
 * @requires module:modules/userId
 */





var storage = Object(__WEBPACK_IMPORTED_MODULE_4__src_storageManager_js__["b" /* getStorageManager */])();
var bididStorageKey = 'cto_bidid';
var bundleStorageKey = 'cto_bundle';
var cookieWriteableKey = 'cto_test_cookie';
var cookiesMaxAge = 13 * 30 * 24 * 60 * 60 * 1000;
var pastDateString = new Date(0).toString();
var expirationString = new Date(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["timestamp"]() + cookiesMaxAge).toString();

function areCookiesWriteable() {
  storage.setCookie(cookieWriteableKey, '1');
  var canWrite = storage.getCookie(cookieWriteableKey) === '1';
  storage.setCookie(cookieWriteableKey, '', pastDateString);
  return canWrite;
}

function extractProtocolHost(url) {
  var returnOnlyHost = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var parsedUrl = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseUrl"](url);
  return returnOnlyHost ? "".concat(parsedUrl.hostname) : "".concat(parsedUrl.protocol, "://").concat(parsedUrl.hostname).concat(parsedUrl.port ? ':' + parsedUrl.port : '', "/");
}

function getFromAllStorages(key) {
  return storage.getCookie(key) || storage.getDataFromLocalStorage(key);
}

function saveOnAllStorages(key, value) {
  if (key && value) {
    storage.setCookie(key, value, expirationString);
    storage.setDataInLocalStorage(key, value);
  }
}

function deleteFromAllStorages(key) {
  storage.setCookie(key, '', pastDateString);
  storage.removeDataFromLocalStorage(key);
}

function getCriteoDataFromAllStorages() {
  return {
    bundle: getFromAllStorages(bundleStorageKey),
    bidId: getFromAllStorages(bididStorageKey)
  };
}

function buildCriteoUsersyncUrl(topUrl, domain, bundle, areCookiesWriteable, isPublishertagPresent, gdprString) {
  var url = 'https://gum.criteo.com/sid/json?origin=prebid' + "".concat(topUrl ? '&topUrl=' + encodeURIComponent(topUrl) : '') + "".concat(domain ? '&domain=' + encodeURIComponent(domain) : '') + "".concat(bundle ? '&bundle=' + encodeURIComponent(bundle) : '') + "".concat(gdprString ? '&gdprString=' + encodeURIComponent(gdprString) : '') + "".concat(areCookiesWriteable ? '&cw=1' : '') + "".concat(isPublishertagPresent ? '&pbt=1' : '');
  return url;
}

function callCriteoUserSync(parsedCriteoData, gdprString) {
  var cw = areCookiesWriteable();
  var topUrl = extractProtocolHost(Object(__WEBPACK_IMPORTED_MODULE_2__src_refererDetection_js__["a" /* getRefererInfo */])().referer);
  var domain = extractProtocolHost(document.location.href, true);
  var isPublishertagPresent = typeof criteo_pubtag !== 'undefined'; // eslint-disable-line camelcase

  var url = buildCriteoUsersyncUrl(topUrl, domain, parsedCriteoData.bundle, cw, isPublishertagPresent, gdprString);
  __WEBPACK_IMPORTED_MODULE_1__src_ajax_js__["b" /* ajaxBuilder */]()(url, function (response) {
    var jsonResponse = JSON.parse(response);

    if (jsonResponse.bidId) {
      saveOnAllStorages(bididStorageKey, jsonResponse.bidId);
    } else {
      deleteFromAllStorages(bididStorageKey);
    }

    if (jsonResponse.acwsUrl) {
      var urlsToCall = typeof jsonResponse.acwsUrl === 'string' ? [jsonResponse.acwsUrl] : jsonResponse.acwsUrl;
      urlsToCall.forEach(function (url) {
        return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["triggerPixel"](url);
      });
    } else if (jsonResponse.bundle) {
      saveOnAllStorages(bundleStorageKey, jsonResponse.bundle);
    }
  });
}
/** @type {Submodule} */


var criteoIdSubmodule = {
  /**
   * used to link submodule with config
   * @type {string}
   */
  name: 'criteo',

  /**
   * decode the stored id value for passing to bid requests
   * @function
   * @returns {{criteoId: string} | undefined}
   */
  decode: function decode(bidId) {
    return bidId;
  },

  /**
   * get the Criteo Id from local storages and initiate a new user sync
   * @function
   * @param {SubmoduleParams} [configParams]
   * @param {ConsentData} [consentData]
   * @returns {{id: {criteoId: string} | undefined}}}
   */
  getId: function getId(configParams, consentData) {
    var hasGdprData = consentData && typeof consentData.gdprApplies === 'boolean' && consentData.gdprApplies;
    var gdprConsentString = hasGdprData ? consentData.consentString : undefined;
    var localData = getCriteoDataFromAllStorages();
    callCriteoUserSync(localData, gdprConsentString);
    return {
      id: localData.bidId ? {
        criteoId: localData.bidId
      } : undefined
    };
  }
};
Object(__WEBPACK_IMPORTED_MODULE_3__src_hook_js__["e" /* submodule */])('userId', criteoIdSubmodule);

/***/ })

},[364]);