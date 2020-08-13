pbjsChunk([253],{

/***/ 327:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(328);


/***/ }),

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__ = __webpack_require__(1);



var BIDDER_CODE = 'coinzilla';
var ENDPOINT_URL = 'https://request.czilladx.com/serve/request.php';
var spec = {
  code: BIDDER_CODE,
  aliases: ['czlla'],
  // short code

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.placementId;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @return Array Info describing the request to the server.
   * @param validBidRequests
   * @param bidderRequest
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    if (validBidRequests.length === 0) {
      return [];
    }

    return validBidRequests.map(function (bidRequest) {
      var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](bidRequest.params.size || bidRequest.sizes)[0];
      var width = sizes.split('x')[0];
      var height = sizes.split('x')[1];
      var payload = {
        placementId: bidRequest.params.placementId,
        width: width,
        height: height,
        bidId: bidRequest.bidId,
        referer: bidderRequest.refererInfo.referer
      };
      return {
        method: 'POST',
        url: ENDPOINT_URL,
        data: payload
      };
    });
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {ServerResponse} serverResponse A successful response from the server.
   * @param bidRequest
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = [];
    var response = serverResponse.body;
    var creativeId = response.creativeId || 0;
    var width = response.width || 0;
    var height = response.height || 0;
    var cpm = response.cpm || 0;

    if (width !== 0 && height !== 0 && cpm !== 0 && creativeId !== 0) {
      var dealId = response.dealid || '';
      var currency = response.currency || 'EUR';
      var netRevenue = response.netRevenue === undefined ? true : response.netRevenue;
      var referrer = bidRequest.data.referer;
      var bidResponse = {
        requestId: response.requestId,
        cpm: cpm,
        width: response.width,
        height: response.height,
        creativeId: creativeId,
        dealId: dealId,
        currency: currency,
        netRevenue: netRevenue,
        ttl: __WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('_bidderTimeout'),
        referrer: referrer,
        ad: response.ad
      };
      bidResponses.push(bidResponse);
    }

    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[327]);