pbjsChunk([229],{

/***/ 388:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(389);


/***/ }),

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__ = __webpack_require__(2);




var BIDDER_CODE = 'edgequeryx';
var spec = {
  code: BIDDER_CODE,
  aliases: ['eqx'],
  // short code
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params && bid.params.accountId && bid.params.widgetId);
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} validBidRequests an array of bids
   * @param {BidderRequest} bidderRequest bidder request object
   * @return {ServerRequest[]} Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    // use bidderRequest.bids[] to get bidder-dependent request info
    // if your bidder supports multiple currencies, use config.getConfig(currency)
    // to find which one the ad server needs
    // pull requested transaction ID from bidderRequest.bids[].transactionId
    return validBidRequests.map(function (bid) {
      // Common bid request attributes for banner, outstream and instream.
      var payload = {
        accountId: bid.params.accountId,
        widgetId: bid.params.widgetId,
        currencyCode: 'EUR',
        tagId: bid.adUnitCode,
        transactionId: bid.transactionId,
        timeout: __WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('bidderTimeout'),
        bidId: bid.bidId,
        prebidVersion: "4.2.0"
      };
      var bannerMediaType = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.banner');
      payload.sizes = bannerMediaType.sizes.map(function (size) {
        return {
          w: size[0],
          h: size[1]
        };
      });
      var payloadString = JSON.stringify(payload);
      return {
        method: 'POST',
        url: (bid.params.domain !== undefined ? bid.params.domain : 'https://deep.edgequery.io') + '/prebid/x',
        data: payloadString
      };
    });
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @param {*} bidRequestString
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequestString) {
    var bidResponses = [];
    var response = serverResponse.body;

    try {
      if (response) {
        var bidResponse = {
          requestId: response.requestId,
          cpm: response.cpm,
          currency: response.currency,
          width: response.width,
          height: response.height,
          ad: response.ad,
          ttl: response.ttl,
          creativeId: response.creativeId,
          netRevenue: response.netRevenue
        };
        bidResponses.push(bidResponse);
      }
    } catch (error) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('Error while parsing Edge Query X response', error);
    }

    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[388]);