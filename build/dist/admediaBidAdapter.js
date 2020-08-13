pbjsChunk([305],{

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(206);


/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);


var BIDDER_CODE = 'admedia';
var ENDPOINT_URL = 'https://prebid.admedia.com/bidder/';
var spec = {
  code: BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    return bid.params && !!bid.params.aid;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var payload = {};

    if (bidderRequest && bidderRequest.refererInfo) {
      payload.referer = encodeURIComponent(bidderRequest.refererInfo.referer);
    }

    payload.tags = [];

    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](validBidRequests, function (bid) {
      var tag = {
        id: bid.bidId,
        sizes: bid.sizes,
        aid: bid.params.aid
      };
      payload.tags.push(tag);
    });

    var payloadString = JSON.stringify(payload);
    return {
      method: 'POST',
      url: ENDPOINT_URL,
      data: payloadString
    };
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = [];

    if (!serverResponse.body.tags) {
      return bidResponses;
    }

    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](serverResponse.body.tags, function (response) {
      if (!response.error && response.cpm > 0) {
        var bidResponse = {
          requestId: response.id,
          cpm: response.cpm,
          width: response.width,
          height: response.height,
          creativeId: response.id,
          dealId: response.id,
          currency: 'USD',
          netRevenue: true,
          ttl: 120,
          // referrer: REFERER,
          ad: response.ad
        };
        bidResponses.push(bidResponse);
      }
    });

    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[205]);