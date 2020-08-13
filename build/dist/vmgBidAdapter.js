pbjsChunk([61],{

/***/ 796:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(797);


/***/ }),

/***/ 797:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);

var BIDDER_CODE = 'vmg';
var ENDPOINT = 'https://predict.vmg.nyc';
var spec = {
  code: BIDDER_CODE,

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bidRequest) {
    if (typeof bidRequest !== 'undefined') {
      return true;
    } else {
      return false;
    }
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {validBidRequests[]} - an array of bids
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var bidRequests = [];
    var referer = window.location.href;

    try {
      referer = typeof bidderRequest.refererInfo === 'undefined' ? window.top.location.href : bidderRequest.refererInfo.referer;
    } catch (e) {}

    validBidRequests.forEach(function (validBidRequest) {
      bidRequests.push({
        adUnitCode: validBidRequest.adUnitCode,
        referer: referer,
        bidId: validBidRequest.bidId
      });
    });
    return {
      method: 'POST',
      url: ENDPOINT,
      data: JSON.stringify(bidRequests)
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * Some required bid params are not needed for this so default
   * values are used.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var validBids = JSON.parse(bidRequest.data);
    var bidResponses = [];

    if (typeof serverResponse.body !== 'undefined') {
      var deals = serverResponse.body;
      validBids.forEach(function (validBid) {
        if (typeof deals[validBid.adUnitCode] !== 'undefined') {
          var bidResponse = {
            requestId: validBid.bidId,
            ad: '<div></div>',
            cpm: 0.01,
            width: 0,
            height: 0,
            dealId: deals[validBid.adUnitCode],
            ttl: 300,
            creativeId: '1',
            netRevenue: '0',
            currency: 'USD'
          };
          bidResponses.push(bidResponse);
        }
      });
    }

    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[796]);