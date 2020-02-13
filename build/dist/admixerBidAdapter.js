pbjsChunk([258],{

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(125);


/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);


var BIDDER_CODE = 'admixer';
var ALIASES = ['go2net'];
var ENDPOINT_URL = '//inv-nets.admixer.net/prebid.1.0.aspx';
var spec = {
  code: BIDDER_CODE,
  aliases: ALIASES,
  supportedMediaTypes: ['banner', 'video'],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.zone;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {bidderRequest} - bidderRequest.bids[] is an array of AdUnits and bids
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(bidderRequest) {
    var payload = {
      imps: [],
      referrer: encodeURIComponent(__WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"]())
    };
    bidderRequest.forEach(function (bid) {
      payload.imps.push(bid);
    });
    var payloadString = JSON.stringify(payload);
    return {
      method: 'GET',
      url: ENDPOINT_URL,
      data: "data=".concat(payloadString)
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = []; // loop through serverResponses {

    try {
      serverResponse = serverResponse.body;
      serverResponse.forEach(function (bidResponse) {
        var bidResp = {
          requestId: bidResponse.bidId,
          cpm: bidResponse.cpm,
          width: bidResponse.width,
          height: bidResponse.height,
          ad: bidResponse.ad,
          ttl: bidResponse.ttl,
          creativeId: bidResponse.creativeId,
          netRevenue: bidResponse.netRevenue,
          currency: bidResponse.currency,
          vastUrl: bidResponse.vastUrl
        };
        bidResponses.push(bidResp);
      });
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](e);
    }

    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[124]);