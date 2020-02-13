pbjsChunk([75],{

/***/ 600:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(601);


/***/ }),

/***/ 601:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);

var spec = {
  code: 'taphype',
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.placementId;
  },
  buildRequests: function buildRequests(bidRequests) {
    var requests = bidRequests.map(function (bid) {
      var params = {
        placementId: bid.params.placementId,
        url: encodeURIComponent(window.location.href),
        size: bid.sizes[0][0] + 'x' + bid.sizes[0][1],
        rnd: Math.random(),
        bidId: bid.bidId
      };
      return {
        method: 'GET',
        url: 'https://us-central1-taphype-internal.cloudfunctions.net/th-prebid',
        data: params,
        options: {
          withCredentials: false
        }
      };
    });
    return requests;
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    if (!serverResponse || !serverResponse.body || !serverResponse.body.ad) {
      return [];
    }

    var bid = serverResponse.body;
    var sizes = bid.size.split(',');
    return [{
      requestId: bidRequest.data.bidId,
      cpm: bid.price,
      width: sizes[0],
      height: sizes[1],
      creativeId: bidRequest.data.bidId,
      currency: bid.currency || 'USD',
      netRevenue: true,
      ad: bid.ad,
      ttl: 360
    }];
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[600]);