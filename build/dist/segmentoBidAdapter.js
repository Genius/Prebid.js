pbjsChunk([110],{

/***/ 678:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(679);


/***/ }),

/***/ 679:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);

var BIDDER_CODE = 'segmento';
var URL = 'https://prebid-bidder.rutarget.ru/bid';
var SYNC_IFRAME_URL = 'https://tag.rutarget.ru/tag?event=otherPage&check=true&response=syncframe&synconly=true';
var SYNC_IMAGE_URL = 'https://tag.rutarget.ru/tag?event=otherPage&check=true&synconly=true';
var RUB = 'RUB';
var TIME_TO_LIVE = 0;
var spec = {
  code: BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    return Boolean(bid && bid.params && !isNaN(bid.params.placementId));
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var payload = {
      places: [],
      settings: {
        currency: RUB,
        referrer: bidderRequest.refererInfo && bidderRequest.refererInfo.referer
      }
    };

    for (var i = 0; i < validBidRequests.length; i++) {
      var bid = validBidRequests[i];
      payload.places.push({
        id: bid.bidId,
        placementId: bid.params.placementId,
        sizes: bid.sizes
      });
    }

    return {
      method: 'POST',
      url: URL,
      data: payload
    };
  },
  interpretResponse: function interpretResponse(serverResponse) {
    var bids = serverResponse.body && serverResponse.body.bids;

    if (!bids) {
      return [];
    }

    var bidResponses = [];

    for (var i = 0; i < bids.length; i++) {
      var bid = bids[i];
      bidResponses.push({
        requestId: bid.id,
        cpm: bid.cpm,
        width: bid.size.width,
        height: bid.size.height,
        creativeId: bid.creativeId,
        currency: RUB,
        netRevenue: true,
        ttl: TIME_TO_LIVE,
        adUrl: bid.displayUrl
      });
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    if (syncOptions.iframeEnabled) {
      return [{
        type: 'iframe',
        url: SYNC_IFRAME_URL
      }];
    }

    if (syncOptions.pixelEnabled) {
      return [{
        type: 'image',
        url: SYNC_IMAGE_URL
      }];
    }

    return [];
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[678]);