pbjsChunk([146],{

/***/ 581:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(582);


/***/ }),

/***/ 582:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);


var PAPYRUS_ENDPOINT = 'https://prebid.papyrus.global';
var PAPYRUS_CODE = 'papyrus';
var spec = {
  code: PAPYRUS_CODE,

  /**
  * Determines whether or not the given bid request is valid. Valid bid request must have placementId and hbid
  *
  * @param {BidRequest} bid The bid params to validate.
  * @return boolean True if this is a valid bid, and false otherwise.
  */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid && bid.params && bid.params.address && bid.params.placementId);
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} validBidRequests - an array of bids
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests) {
    var bidParams = [];

    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](validBidRequests, function (bid) {
      bidParams.push({
        address: bid.params.address,
        placementId: bid.params.placementId,
        bidId: bid.bidId,
        transactionId: bid.transactionId,
        sizes: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](bid.sizes)
      });
    });

    return {
      method: 'POST',
      url: PAPYRUS_ENDPOINT,
      data: bidParams
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, request) {
    var bidResponses = [];

    if (serverResponse && serverResponse.body && serverResponse.body.bids) {
      serverResponse.body.bids.forEach(function (bid) {
        var bidResponse = {
          requestId: bid.id,
          creativeId: bid.id,
          adId: bid.id,
          transactionId: bid.transactionId,
          cpm: bid.cpm,
          width: bid.width,
          height: bid.height,
          currency: bid.currency,
          netRevenue: true,
          ttl: 300,
          ad: bid.ad
        };
        bidResponses.push(bidResponse);
      });
    }

    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[581]);