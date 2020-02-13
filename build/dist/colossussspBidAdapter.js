pbjsChunk([218],{

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(247);


/***/ }),

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils__ = __webpack_require__(0);



var BIDDER_CODE = 'colossusssp';
var URL = '//colossusssp.com/?c=o&m=multi';
var URL_SYNC = '//colossusssp.com/?c=o&m=cookie';

function isBidResponseValid(bid) {
  if (!bid.requestId || !bid.cpm || !bid.creativeId || !bid.ttl || !bid.currency) {
    return false;
  }

  switch (bid.mediaType) {
    case __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */]:
      return Boolean(bid.width && bid.height && bid.ad);

    case __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["d" /* VIDEO */]:
      return Boolean(bid.vastUrl);

    case __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["c" /* NATIVE */]:
      return Boolean(bid.native);

    default:
      return false;
  }
}

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
    return Boolean(bid.bidId && bid.params && !isNaN(bid.params.placement_id));
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} validBidRequests A non-empty list of valid bid requests that should be sent to the Server.
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests) {
    var winTop = window;

    try {
      window.top.location.toString();
      winTop = window.top;
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils__["logMessage"](e);
    }

    ;
    var location = __WEBPACK_IMPORTED_MODULE_2__src_utils__["getTopWindowLocation"]();
    var placements = [];
    var request = {
      'deviceWidth': winTop.screen.width,
      'deviceHeight': winTop.screen.height,
      'language': navigator && navigator.language ? navigator.language : '',
      'secure': location.protocol === 'https:' ? 1 : 0,
      'host': location.host,
      'page': location.pathname,
      'placements': placements
    };

    for (var i = 0; i < validBidRequests.length; i++) {
      var bid = validBidRequests[i];
      var placement = {
        placementId: bid.params.placement_id,
        bidId: bid.bidId,
        sizes: bid.sizes,
        traffic: bid.params.traffic || __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */]
      };
      placements.push(placement);
    }

    return {
      method: 'POST',
      url: URL,
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
    var response = [];

    try {
      serverResponse = serverResponse.body;

      for (var i = 0; i < serverResponse.length; i++) {
        var resItem = serverResponse[i];

        if (isBidResponseValid(resItem)) {
          response.push(resItem);
        }
      }
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils__["logMessage"](e);
    }

    ;
    return response;
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

},[246]);