pbjsChunk([107],{

/***/ 365:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(366);


/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);



var BIDDER_CODE = 'nextMillennium';
var HOST = 'https://brainlyads.com';
var CURRENCY = 'USD';
var TIME_TO_LIVE = 360;
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params.placement_id && __WEBPACK_IMPORTED_MODULE_0__src_utils__["isNumber"](bid.params.placement_id));
  },
  buildRequests: function buildRequests(validBidRequests) {
    var requests = [];

    __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](validBidRequests, function (bid) {
      requests.push({
        method: 'POST',
        url: HOST + '/hb/s2s',
        options: {
          contentType: 'application/json',
          withCredentials: true
        },
        data: JSON.stringify({
          placement_id: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('placement_id', bid.params)
        }),
        bidId: bid.bidId
      });
    });

    return requests;
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    try {
      var bidResponse = serverResponse.body;
      var bidResponses = [];

      if (Number(bidResponse.cpm) > 0) {
        bidResponses.push({
          requestId: bidRequest.bidId,
          cpm: bidResponse.cpm,
          width: bidResponse.width,
          height: bidResponse.height,
          creativeId: bidResponse.creativeId,
          currency: CURRENCY,
          netRevenue: false,
          ttl: TIME_TO_LIVE,
          ad: bidResponse.ad
        });
      }

      return bidResponses;
    } catch (err) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](err);
      return [];
    }
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    var syncs = [];

    if (syncOptions.iframeEnabled) {
      syncs.push({
        type: 'iframe',
        url: HOST + '/hb/s2s/matching'
      });
    }

    if (syncOptions.pixelEnabled) {
      syncs.push({
        type: 'image',
        url: HOST + '/hb/s2s/matching'
      });
    }

    return syncs;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[365]);