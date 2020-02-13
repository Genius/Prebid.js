pbjsChunk([165],{

/***/ 377:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(378);


/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__ = __webpack_require__(1);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




var BIDDER_CODE = 'kargo';
var HOST = 'https://krk.kargo.com';
var SYNC = 'https://crb.kargo.com/api/v1/initsyncrnd/{UUID}?seed={SEED}&idx={INDEX}';
var SYNC_COUNT = 5;
var sessionId, lastPageUrl, requestCounter;
var spec = {
  code: BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    if (!bid || !bid.params) {
      return false;
    }

    return !!bid.params.placementId;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var currencyObj = __WEBPACK_IMPORTED_MODULE_1__src_config__["b" /* config */].getConfig('currency');
    var currency = currencyObj && currencyObj.adServerCurrency || 'USD';
    var bidIds = {};
    var bidSizes = {};

    __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](validBidRequests, function (bid) {
      bidIds[bid.bidId] = bid.params.placementId;
      bidSizes[bid.bidId] = bid.sizes;
    });

    var tdid;

    if (validBidRequests.length > 0 && validBidRequests[0].userId && validBidRequests[0].userId.tdid) {
      tdid = validBidRequests[0].userId.tdid;
    }

    var transformedParams = _extends({}, {
      sessionId: spec._getSessionId(),
      requestCount: spec._getRequestCount(),
      timeout: bidderRequest.timeout,
      currency: currency,
      cpmGranularity: 1,
      timestamp: new Date().getTime(),
      cpmRange: {
        floor: 0,
        ceil: 20
      },
      bidIDs: bidIds,
      bidSizes: bidSizes,
      prebidRawBidRequests: validBidRequests
    }, spec._getAllMetadata(tdid));

    var encodedParams = encodeURIComponent(JSON.stringify(transformedParams));
    return _extends({}, bidderRequest, {
      method: 'GET',
      url: "".concat(HOST, "/api/v2/bid"),
      data: "json=".concat(encodedParams),
      currency: currency
    });
  },
  interpretResponse: function interpretResponse(response, bidRequest) {
    var bids = response.body;
    var bidResponses = [];

    for (var bidId in bids) {
      var adUnit = bids[bidId];
      bidResponses.push({
        requestId: bidId,
        cpm: Number(adUnit.cpm),
        width: adUnit.width,
        height: adUnit.height,
        ad: adUnit.adm,
        ttl: 300,
        creativeId: adUnit.id,
        dealId: adUnit.targetingCustom,
        netRevenue: true,
        currency: bidRequest.currency
      });
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    var syncs = [];

    var seed = spec._generateRandomUuid();

    var clientId = spec._getClientId();

    if (syncOptions.iframeEnabled && seed && clientId) {
      for (var i = 0; i < SYNC_COUNT; i++) {
        syncs.push({
          type: 'iframe',
          url: SYNC.replace('{UUID}', clientId).replace('{SEED}', seed).replace('{INDEX}', i)
        });
      }
    }

    return syncs;
  },
  // PRIVATE
  _readCookie: function _readCookie(name) {
    var nameEquals = "".concat(name, "=");
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];

      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length);
      }

      if (cookie.indexOf(nameEquals) === 0) {
        return cookie.substring(nameEquals.length, cookie.length);
      }
    }

    return null;
  },
  _getCrbFromCookie: function _getCrbFromCookie() {
    try {
      var crb = JSON.parse(decodeURIComponent(spec._readCookie('krg_crb')));

      if (crb && crb.v) {
        var vParsed = JSON.parse(atob(crb.v));

        if (vParsed) {
          return vParsed;
        }
      }

      return {};
    } catch (e) {
      return {};
    }
  },
  _getCrbFromLocalStorage: function _getCrbFromLocalStorage() {
    try {
      return JSON.parse(atob(spec._getLocalStorageSafely('krg_crb')));
    } catch (e) {
      return {};
    }
  },
  _getCrb: function _getCrb() {
    var localStorageCrb = spec._getCrbFromLocalStorage();

    if (Object.keys(localStorageCrb).length) {
      return localStorageCrb;
    }

    return spec._getCrbFromCookie();
  },
  _getKruxUserId: function _getKruxUserId() {
    return spec._getLocalStorageSafely('kxkar_user');
  },
  _getKruxSegments: function _getKruxSegments() {
    return spec._getLocalStorageSafely('kxkar_segs');
  },
  _getKrux: function _getKrux() {
    var segmentsStr = spec._getKruxSegments();

    var segments = [];

    if (segmentsStr) {
      segments = segmentsStr.split(',');
    }

    return {
      userID: spec._getKruxUserId(),
      segments: segments
    };
  },
  _getLocalStorageSafely: function _getLocalStorageSafely(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },
  _getUserIds: function _getUserIds(tdid) {
    var crb = spec._getCrb();

    var userIds = {
      kargoID: crb.userId,
      clientID: crb.clientId,
      crbIDs: crb.syncIds || {},
      optOut: crb.optOut
    };

    if (tdid) {
      userIds.tdID = tdid;
    }

    return userIds;
  },
  _getClientId: function _getClientId() {
    var crb = spec._getCrb();

    return crb.clientId;
  },
  _getAllMetadata: function _getAllMetadata(tdid) {
    return {
      userIDs: spec._getUserIds(tdid),
      krux: spec._getKrux(),
      pageURL: window.location.href,
      rawCRB: spec._readCookie('krg_crb'),
      rawCRBLocalStorage: spec._getLocalStorageSafely('krg_crb')
    };
  },
  _getSessionId: function _getSessionId() {
    if (!sessionId) {
      sessionId = spec._generateRandomUuid();
    }

    return sessionId;
  },
  _getRequestCount: function _getRequestCount() {
    if (lastPageUrl === window.location.pathname) {
      return ++requestCounter;
    }

    lastPageUrl = window.location.pathname;
    return requestCounter = 0;
  },
  _generateRandomUuid: function _generateRandomUuid() {
    try {
      // crypto.getRandomValues is supported everywhere but Opera Mini for years
      var buffer = new Uint8Array(16);
      crypto.getRandomValues(buffer);
      buffer[6] = buffer[6] & ~176 | 64;
      buffer[8] = buffer[8] & ~64 | 128;
      var hex = Array.prototype.map.call(new Uint8Array(buffer), function (x) {
        return ('00' + x.toString(16)).slice(-2);
      }).join('');
      return hex.slice(0, 8) + '-' + hex.slice(8, 12) + '-' + hex.slice(12, 16) + '-' + hex.slice(16, 20) + '-' + hex.slice(20);
    } catch (e) {
      return '';
    }
  }
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[377]);