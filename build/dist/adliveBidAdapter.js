pbjsChunk([262],{

/***/ 116:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(117);


/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);



var BIDDER_CODE = 'adlive';
var ENDPOINT_URL = 'https://api.publishers.adlive.io/get?pbjs=1';
var CURRENCY = 'USD';
var TIME_TO_LIVE = 360;
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params.hashes && __WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](bid.params.hashes));
  },
  buildRequests: function buildRequests(validBidRequests) {
    var requests = [];

    __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](validBidRequests, function (bid) {
      requests.push({
        method: 'POST',
        url: ENDPOINT_URL,
        options: {
          contentType: 'application/json',
          withCredentials: true
        },
        data: JSON.stringify({
          transaction_id: bid.bidId,
          hashes: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('hashes', bid.params)
        }),
        bidId: bid.bidId
      });
    });

    return requests;
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    try {
      var response = serverResponse.body;
      var bidResponses = [];

      __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](response, function (bidResponse) {
        if (!bidResponse.is_passback) {
          bidResponses.push({
            requestId: bidRequest.bidId,
            cpm: bidResponse.price,
            width: bidResponse.size[0],
            height: bidResponse.size[1],
            creativeId: bidResponse.hash,
            currency: CURRENCY,
            netRevenue: false,
            ttl: TIME_TO_LIVE,
            ad: bidResponse.content
          });
        }
      });

      return bidResponses;
    } catch (err) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](err);
      return [];
    }
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[116]);