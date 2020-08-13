pbjsChunk([254],{

/***/ 325:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(326);


/***/ }),

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);


var BIDDER_CODE = 'clicktripz';
var ENDPOINT_URL = 'https://www.clicktripz.com/x/prebid/v1';
var spec = {
  code: BIDDER_CODE,
  aliases: ['ctz'],
  // short code
  isBidRequestValid: function isBidRequestValid(bid) {
    if (bid && bid.params && bid.params.placementId && bid.params.siteId) {
      return true;
    }

    return false;
  },
  buildRequests: function buildRequests(validBidRequests) {
    var bidRequests = [];

    Object(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"])(validBidRequests, function (bid) {
      bidRequests.push({
        bidId: bid.bidId,
        placementId: bid.params.placementId,
        siteId: bid.params.siteId,
        sizes: bid.sizes.map(function (size) {
          return size.join('x');
        })
      });
    });

    return {
      method: 'POST',
      url: ENDPOINT_URL,
      data: bidRequests
    };
  },
  interpretResponse: function interpretResponse(serverResponse) {
    var bidResponses = [];

    if (serverResponse && serverResponse.body) {
      Object(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"])(serverResponse.body, function (bid) {
        if (bid.errors) {
          Object(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"])(bid.errors);
          return;
        }

        var size = bid.size.split('x');
        bidResponses.push({
          requestId: bid.bidId,
          cpm: bid.cpm,
          width: size[0],
          height: size[1],
          creativeId: bid.creativeId,
          currency: bid.currency,
          netRevenue: bid.netRevenue,
          ttl: bid.ttl,
          adUrl: bid.adUrl
        });
      });
    }

    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[325]);