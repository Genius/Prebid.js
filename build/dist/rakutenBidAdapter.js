pbjsChunk([129],{

/***/ 630:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(631);


/***/ }),

/***/ 631:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config_js__ = __webpack_require__(3);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var BIDDER_CODE = 'rakuten';
var ENDPOINT = 'https://s-bid.rmp.rakuten.com/h';
var spec = {
  code: BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.adSpotId;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var bidRequests = [];
    validBidRequests.forEach(function (bid) {
      var _a, _b;

      var params = bid.params;
      bidRequests.push({
        method: 'GET',
        url: __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('rakuten.endpoint') || ENDPOINT,
        data: _objectSpread(_objectSpread({
          bi: bid.bidId,
          t: params.adSpotId,
          s: document.location.protocol,
          ua: navigator.userAgent,
          l: navigator.browserLanguage || navigator.language,
          d: document.domain,
          tp: bidderRequest.refererInfo.stack[0] || window.location.href,
          pp: bidderRequest.refererInfo.referer,
          gdpr: ((_a = bidderRequest.gdprConsent) === null || _a === void 0 ? void 0 : _a.gdprApplies) ? 1 : 0
        }, ((_b = bidderRequest.gdprConsent) === null || _b === void 0 ? void 0 : _b.consentString) && {
          cd: bidderRequest.gdprConsent.consentString
        }), bidderRequest.uspConsent && {
          ccpa: bidderRequest.uspConsent
        })
      });
    });
    return bidRequests;
  },
  interpretResponse: function interpretResponse(response, request) {
    var sb = response.body;
    var bidResponses = [];

    if (sb.cpm && sb.ad) {
      bidResponses.push({
        requestId: sb.bid_id,
        cpm: sb.cpm,
        width: sb.width || 0,
        height: sb.height || 0,
        creativeId: sb.creative_id || 0,
        dealId: sb.deal_id || '',
        currency: sb.currency || 'USD',
        netRevenue: typeof sb.net_revenue === 'undefined' ? true : !!sb.net_revenue,
        mediaType: __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */],
        ttl: sb.ttl,
        ad: sb.ad
      });
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    var syncs = [];

    if (syncOptions.pixelEnabled && serverResponses[0].body !== undefined) {
      var bidResponseObj = serverResponses[0].body;

      if (!bidResponseObj) {
        return [];
      }

      if (bidResponseObj.sync_urls && bidResponseObj.sync_urls.length > 0) {
        bidResponseObj.sync_urls.forEach(function (syncUrl) {
          if (syncUrl && syncUrl !== 'null' && syncUrl.length > 0) {
            syncs.push({
              type: 'image',
              url: syncUrl
            });
          }
        });
      }
    }

    return syncs;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[630]);