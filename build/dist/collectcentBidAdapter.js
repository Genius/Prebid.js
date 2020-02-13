pbjsChunk([220],{

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(243);


/***/ }),

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils__ = __webpack_require__(0);



var BIDDER_CODE = 'collectcent';
var URL_MULTI = '//publishers.motionspots.com/?c=o&m=multi';
var URL_SYNC = '//publishers.motionspots.com/?c=o&m=cookie';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["c" /* NATIVE */]],

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
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils__["logMessage"](e);
      winTop = window;
    }

    ;
    var placements = [];
    var location = bidderRequest ? new URL(bidderRequest.refererInfo.referer) : winTop.location;
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
      __WEBPACK_IMPORTED_MODULE_2__src_utils__["logMessage"](e);
    }

    ;
    return serverResponse;
  },
  getUserSyncs: function getUserSyncs() {
    return [{
      type: 'image',
      url: URL_SYNC
    }];
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[242]);