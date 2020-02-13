pbjsChunk([178],{

/***/ 344:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(345);


/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils__ = __webpack_require__(0);


var BIDDER_CODE = 'huddledmasses';
var URL = '//huddledmassessupply.com/?c=o&m=multi';
var URL_SYNC = '//huddledmassessupply.com/?c=o&m=cookie';
var sizeObj = {
  '468x60': 1,
  '728x90': 2,
  '300x600': 10,
  '300x250': 15,
  '300x100': 19,
  '320x50': 43,
  '300x50': 44,
  '300x300': 48,
  '300x1050': 54,
  '970x90': 55,
  '970x250': 57,
  '1000x90': 58,
  '320x80': 59,
  '640x480': 65,
  '320x480': 67,
  '320x320': 72,
  '320x160': 73,
  '480x300': 83,
  '970x310': 94,
  '970x210': 96,
  '480x320': 101,
  '768x1024': 102,
  '1000x300': 113,
  '320x100': 117,
  '800x250': 118,
  '200x600': 119
};

__WEBPACK_IMPORTED_MODULE_1__src_utils__["_each"](sizeObj, function (item, key) {
  return sizeObj[item] = key;
});

var spec = {
  code: BIDDER_CODE,

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {object} bid The bid to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !isNaN(bid.params.placement_id) && (bid.params.sizes !== undefined && bid.params.sizes.length > 0 && bid.params.sizes.some(function (sizeIndex) {
      return sizeObj[sizeIndex] !== undefined;
    }) || bid.sizes !== undefined && bid.sizes.length > 0 && bid.sizes.map(function (size) {
      return "".concat(size[0], "x").concat(size[1]);
    }).some(function (size) {
      return sizeObj[size] !== undefined;
    }));
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
      __WEBPACK_IMPORTED_MODULE_1__src_utils__["logMessage"](e);
    }

    ;
    var location = __WEBPACK_IMPORTED_MODULE_1__src_utils__["getTopWindowLocation"]();
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
      var placement = {};
      placement['placementId'] = bid.params.placement_id;
      placement['bidId'] = bid.bidId;
      placement['sizes'] = bid.sizes;
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

        if (resItem.width && !isNaN(resItem.width) && resItem.height && !isNaN(resItem.height) && resItem.requestId && typeof resItem.requestId === 'string' && resItem.cpm && !isNaN(resItem.cpm) && resItem.ad && typeof resItem.ad === 'string' && resItem.ttl && !isNaN(resItem.ttl) && resItem.creativeId && typeof resItem.creativeId === 'string' && resItem.netRevenue && typeof resItem.netRevenue === 'boolean' && resItem.currency && typeof resItem.currency === 'string') {
          response.push(resItem);
        }
      }
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_1__src_utils__["logMessage"](e);
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

},[344]);