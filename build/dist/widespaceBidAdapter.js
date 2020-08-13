pbjsChunk([56],{

/***/ 806:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(807);


/***/ }),

/***/ 807:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storage", function() { return storage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_storageManager_js__ = __webpack_require__(9);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }







var storage = Object(__WEBPACK_IMPORTED_MODULE_5__src_storageManager_js__["b" /* getStorageManager */])();
var BIDDER_CODE = 'widespace';
var WS_ADAPTER_VERSION = '2.0.1';
var LS_KEYS = {
  PERF_DATA: 'wsPerfData',
  LC_UID: 'wsLcuid',
  CUST_DATA: 'wsCustomData'
};
var preReqTime = 0;
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: ['banner'],
  isBidRequestValid: function isBidRequestValid(bid) {
    if (bid.params && bid.params.sid) {
      return true;
    }

    return false;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var serverRequests = [];
    var REQUEST_SERVER_URL = getEngineUrl();
    var DEMO_DATA_PARAMS = ['gender', 'country', 'region', 'postal', 'city', 'yob'];
    var PERF_DATA = getData(LS_KEYS.PERF_DATA).map(function (perfData) {
      return JSON.parse(perfData);
    });
    var CUST_DATA = getData(LS_KEYS.CUST_DATA, false)[0];
    var LC_UID = getLcuid();
    var isInHostileIframe = false;

    try {
      window.top.location.toString();
      isInHostileIframe = false;
    } catch (e) {
      isInHostileIframe = true;
    }

    validBidRequests.forEach(function (bid, i) {
      var data = {
        'screenWidthPx': screen && screen.width,
        'screenHeightPx': screen && screen.height,
        'adSpaceHttpRefUrl': getTopWindowReferrer(),
        'referer': (isInHostileIframe ? window : window.top).location.href.split('#')[0],
        'inFrame': 1,
        'sid': bid.params.sid,
        'lcuid': LC_UID,
        'vol': isInHostileIframe ? '' : visibleOnLoad(document.getElementById(bid.adUnitCode)),
        'gdprCmp': bidderRequest && bidderRequest.gdprConsent ? 1 : 0,
        'hb': '1',
        'hb.cd': CUST_DATA ? encodedParamValue(CUST_DATA) : '',
        'hb.floor': bid.bidfloor || '',
        'hb.spb': i === 0 ? pixelSyncPossibility() : -1,
        'hb.ver': WS_ADAPTER_VERSION,
        'hb.name': "prebidjs-4.2.0",
        'hb.bidId': bid.bidId,
        'hb.sizes': Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["parseSizesInput"])(bid.sizes).join(','),
        'hb.currency': bid.params.cur || bid.params.currency || ''
      }; // Include demo data

      if (bid.params.demo) {
        DEMO_DATA_PARAMS.forEach(function (key) {
          if (bid.params.demo[key]) {
            data[key] = bid.params.demo[key];
          }
        });
      } // Include performance data


      if (PERF_DATA[i]) {
        Object.keys(PERF_DATA[i]).forEach(function (perfDataKey) {
          data[perfDataKey] = PERF_DATA[i][perfDataKey];
        });
      } // Include connection info if available


      var CONNECTION = navigator.connection || navigator.webkitConnection;

      if (CONNECTION && CONNECTION.type && CONNECTION.downlinkMax) {
        data['netinfo.type'] = CONNECTION.type;
        data['netinfo.downlinkMax'] = CONNECTION.downlinkMax;
      } // Include debug data when available


      if (!isInHostileIframe) {
        var DEBUG_AD = (__WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js___default()(window.top.location.hash.split('&'), function (val) {
          return __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js___default()(val, 'WS_DEBUG_FORCEADID');
        }) || '').split('=')[1];
        data.forceAdId = DEBUG_AD;
      } // GDPR Consent info


      if (data.gdprCmp) {
        var _bidderRequest$gdprCo = bidderRequest.gdprConsent,
            gdprApplies = _bidderRequest$gdprCo.gdprApplies,
            consentString = _bidderRequest$gdprCo.consentString,
            vendorData = _bidderRequest$gdprCo.vendorData;
        var hasGlobalScope = vendorData && vendorData.hasGlobalScope;
        data.gdprApplies = gdprApplies ? 1 : gdprApplies === undefined ? '' : 0;
        data.gdprConsentData = consentString;
        data.gdprHasGlobalScope = hasGlobalScope ? 1 : hasGlobalScope === undefined ? '' : 0;
      } // Remove empty params


      Object.keys(data).forEach(function (key) {
        if (data[key] === '' || data[key] === undefined) {
          delete data[key];
        }
      });
      serverRequests.push({
        method: 'POST',
        options: {
          contentType: 'application/x-www-form-urlencoded'
        },
        url: REQUEST_SERVER_URL,
        data: Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["parseQueryStringParameters"])(data)
      });
    });
    preReqTime = Date.now();
    return serverRequests;
  },
  interpretResponse: function interpretResponse(serverResponse, request) {
    var responseTime = Date.now() - preReqTime;
    var successBids = serverResponse.body || [];
    var bidResponses = [];
    successBids.forEach(function (bid) {
      storeData({
        'perf_status': 'OK',
        'perf_reqid': bid.reqId,
        'perf_ms': responseTime
      }, "".concat(LS_KEYS.PERF_DATA).concat(bid.reqId));

      if (bid.status === 'ad') {
        bidResponses.push({
          requestId: bid.bidId,
          cpm: bid.cpm,
          width: bid.width,
          height: bid.height,
          creativeId: bid.adId,
          currency: bid.currency,
          netRevenue: Boolean(bid.netRev),
          ttl: bid.ttl,
          referrer: getTopWindowReferrer(),
          ad: bid.code
        });
      }
    });
    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    var serverResponses = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var userSyncs = [];
    userSyncs = serverResponses.reduce(function (allSyncPixels, response) {
      if (response && response.body && response.body[0]) {
        (response.body[0].syncPixels || []).forEach(function (url) {
          allSyncPixels.push({
            type: 'image',
            url: url
          });
        });
      }

      return allSyncPixels;
    }, []);
    return userSyncs;
  }
};

function storeData(data, name) {
  var stringify = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var value = stringify ? JSON.stringify(data) : data;

  if (storage.hasLocalStorage()) {
    storage.setDataInLocalStorage(name, value);
    return true;
  } else if (storage.cookiesAreEnabled()) {
    var theDate = new Date();
    var expDate = new Date(theDate.setMonth(theDate.getMonth() + 12)).toGMTString();
    storage.setCookie(name, value, expDate);
    return true;
  }
}

function getData(name) {
  var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var data = [];

  if (storage.hasLocalStorage()) {
    Object.keys(localStorage).filter(function (key) {
      if (key.indexOf(name) > -1) {
        data.push(storage.getDataFromLocalStorage(key));

        if (remove) {
          storage.removeDataFromLocalStorage(key);
        }
      }
    });
  }

  if (storage.cookiesAreEnabled()) {
    document.cookie.split(';').forEach(function (item) {
      var value = item.split('=');

      if (value[0].indexOf(name) > -1) {
        data.push(value[1]);

        if (remove) {
          storage.setCookie(value[0], '', 'Thu, 01 Jan 1970 00:00:01 GMT');
        }
      }
    });
  }

  return data;
}

function pixelSyncPossibility() {
  var userSync = __WEBPACK_IMPORTED_MODULE_0__src_config_js__["b" /* config */].getConfig('userSync');
  return userSync && userSync.pixelEnabled && userSync.syncEnabled ? userSync.syncsPerBidder : -1;
}

function visibleOnLoad(element) {
  if (element && element.getBoundingClientRect) {
    var topPos = element.getBoundingClientRect().top;
    return topPos < screen.height && topPos >= window.top.pageYOffset ? 1 : 0;
  }

  ;
  return '';
}

function getLcuid() {
  var lcuid = getData(LS_KEYS.LC_UID, false)[0];

  if (!lcuid) {
    var random = ('4' + new Date().getTime() + String(Math.floor(Math.random() * 1000000000))).substring(0, 18);
    storeData(random, LS_KEYS.LC_UID, false);
    lcuid = getData(LS_KEYS.LC_UID, false)[0];
  }

  return lcuid;
}

function encodedParamValue(value) {
  var requiredStringify = _typeof(JSON.parse(JSON.stringify(value))) === 'object';
  return encodeURIComponent(requiredStringify ? JSON.stringify(value) : value);
}

function getEngineUrl() {
  var ENGINE_URL = 'https://engine.widespace.com/map/engine/dynadreq';
  return window.wisp && window.wisp.ENGINE_URL ? window.wisp.ENGINE_URL : ENGINE_URL;
}

function getTopWindowReferrer() {
  try {
    return window.top.document.referrer;
  } catch (e) {
    return '';
  }
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[806]);