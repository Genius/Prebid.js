pbjsChunk([172],{

/***/ 356:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(357);


/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);


var BIDDER_CODE = 'innity';
var ENDPOINT = location.protocol + '//as.innity.com/synd/';
var spec = {
  code: BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params && bid.params.pub && bid.params.zone);
  },
  buildRequests: function buildRequests(validBidRequests) {
    return validBidRequests.map(function (bidRequest) {
      var parseSized = __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](bidRequest.sizes);
      var arrSize = parseSized[0].split('x');
      return {
        method: 'GET',
        url: ENDPOINT,
        data: {
          cb: __WEBPACK_IMPORTED_MODULE_0__src_utils__["timestamp"](),
          ver: 2,
          hb: 1,
          output: 'js',
          pub: bidRequest.params.pub,
          zone: bidRequest.params.zone,
          url: encodeURIComponent(__WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"]()),
          width: arrSize[0],
          height: arrSize[1],
          vpw: window.screen.width,
          vph: window.screen.height,
          callback: 'json',
          callback_uid: bidRequest.bidId,
          auction: bidRequest.auctionId
        }
      };
    });
  },
  interpretResponse: function interpretResponse(serverResponse, request) {
    var res = serverResponse.body;
    var bidResponse = {
      requestId: res.callback_uid,
      cpm: parseFloat(res.cpm) / 100,
      width: res.width,
      height: res.height,
      creativeId: res.creative_id,
      currency: 'USD',
      netRevenue: true,
      ttl: 60,
      ad: '<script src="' + location.protocol + '//cdn.innity.net/frame_util.js"></script>' + res.tag
    };
    return [bidResponse];
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[356]);