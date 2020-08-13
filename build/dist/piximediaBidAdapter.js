pbjsChunk([143],{

/***/ 587:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(588);


/***/ }),

/***/ 588:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);


var BIDDER_CODE = 'piximedia';
var ENDPOINT = 'https://ad.piximedia.com/prebid';
var spec = {
  code: BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params && bid.params.siteId && bid.params.placementId);
  },
  buildRequests: function buildRequests(validBidRequests) {
    return validBidRequests.map(function (bidRequest) {
      var parseSized = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](bidRequest.sizes);
      var arrSize = parseSized[0].split('x');
      return {
        method: 'GET',
        url: ENDPOINT,
        data: {
          timestamp: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["timestamp"](),
          pver: '1.0',
          pbparams: JSON.stringify(bidRequest.params),
          pbsizes: JSON.stringify(parseSized),
          pbwidth: arrSize[0],
          pbheight: arrSize[1],
          pbbidid: bidRequest.bidId
        }
      };
    });
  },
  interpretResponse: function interpretResponse(serverResponse, request) {
    var res = serverResponse.body;
    var bidResponse = {
      requestId: res.bidId,
      cpm: parseFloat(res.cpm),
      width: res.width,
      height: res.height,
      creativeId: res.creative_id,
      currency: res.currency,
      netRevenue: true,
      ttl: 300,
      ad: res.adm
    };
    return [bidResponse];
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[587]);