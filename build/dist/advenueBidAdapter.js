pbjsChunk([291],{

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(240);


/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils_js__ = __webpack_require__(0);



var BIDDER_CODE = 'advenue';
var URL_MULTI = 'https://ssp.advenuemedia.co.uk/?c=o&m=multi';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["c" /* NATIVE */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {object} bid The bid to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return Boolean(bid.bidId && bid.params && !isNaN(bid.params.placementId) && spec.supportedMediaTypes.indexOf(bid.params.traffic) !== -1);
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} validBidRequests A non-empty list of valid bid requests that should be sent to the Server.
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var winTop;

    try {
      winTop = window.top;
      winTop.location.toString();
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logMessage"](e);
      winTop = window;
    }

    ;
    var location = bidderRequest ? new URL(bidderRequest.refererInfo.referer) : winTop.location;
    var placements = [];
    var request = {
      'secure': location.protocol === 'https:' ? 1 : 0,
      'deviceWidth': winTop.screen.width,
      'deviceHeight': winTop.screen.height,
      'host': location.host,
      'page': location.pathname,
      'placements': placements
    };

    for (var i = 0; i < validBidRequests.length; i++) {
      var bid = validBidRequests[i];
      var params = bid.params;
      placements.push({
        placementId: params.placementId,
        bidId: bid.bidId,
        sizes: bid.sizes,
        traffic: params.traffic
      });
    }

    return {
      method: 'POST',
      url: URL_MULTI,
      data: request
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse) {
    try {
      serverResponse = serverResponse.body;
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logMessage"](e);
    }

    ;
    return serverResponse;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[239]);