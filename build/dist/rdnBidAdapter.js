pbjsChunk([109],{

/***/ 508:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(509);


/***/ }),

/***/ 509:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_config__ = __webpack_require__(3);




var BIDDER_CODE = 'rdn';
var ENDPOINT = 'https://s-bid.rmp.rakuten.co.jp/h';
var spec = {
  code: BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.adSpotId;
  },
  buildRequests: function buildRequests(validBidRequests) {
    var bidRequests = [];
    validBidRequests.forEach(function (bid) {
      var params = bid.params;
      bidRequests.push({
        method: 'GET',
        url: __WEBPACK_IMPORTED_MODULE_3__src_config__["b" /* config */].getConfig('rdn.endpoint') || ENDPOINT,
        data: {
          bi: bid.bidId,
          t: params.adSpotId,
          s: document.location.protocol,
          ua: navigator.userAgent,
          l: navigator.browserLanguage || navigator.language,
          d: document.domain,
          tp: encodeURIComponent(__WEBPACK_IMPORTED_MODULE_1__src_utils__["getTopWindowUrl"]()),
          pp: encodeURIComponent(__WEBPACK_IMPORTED_MODULE_1__src_utils__["getTopWindowReferrer"]())
        }
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
        currency: sb.currency || 'JPY',
        netRevenue: typeof sb.net_revenue === 'undefined' ? true : !!sb.net_revenue,
        mediaType: __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */],
        ttl: sb.ttl,
        referrer: __WEBPACK_IMPORTED_MODULE_1__src_utils__["getTopWindowUrl"](),
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
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[508]);