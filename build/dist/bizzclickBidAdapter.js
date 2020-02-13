pbjsChunk([233],{

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(217);


/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils__ = __webpack_require__(0);



var BIDDER_CODE = 'bizzclick';
var URL = '//supply.bizzclick.com/?c=o&m=multi';
var URL_SYNC = '//supply.bizzclick.com/?c=o&m=cookie';

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
  }

  return false;
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
    return Boolean(bid.bidId && bid.params && !isNaN(bid.params.placementId) && bid.params.type);
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
    var len = validBidRequests.length;

    for (var i = 0; i < len; i++) {
      var bid = validBidRequests[i];
      var placement = {
        placementId: bid.params.placementId,
        bidId: bid.bidId,
        sizes: bid.sizes,
        type: bid.params.type
      };
      placements.push(placement);
    }

    return {
      method: 'POST',
      url: URL,
      data: {
        'deviceWidth': winTop.screen.width,
        'deviceHeight': winTop.screen.height,
        'secure': location.protocol === 'https:' ? 1 : 0,
        'host': location.host,
        'page': location.pathname,
        'placements': placements
      }
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
  */
  interpretResponse: function interpretResponse(bidResponses) {
    var res = [];
    bidResponses = bidResponses.body;
    var len = bidResponses.length;

    for (var i = 0; i < len; i++) {
      var bid = bidResponses[i];

      if (isBidResponseValid(bid)) {
        res.push(bid);
      }
    }

    return res;
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

},[216]);