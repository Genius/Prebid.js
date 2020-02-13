pbjsChunk([117],{

/***/ 488:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(489);


/***/ }),

/***/ 489:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_ajax__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_utils__ = __webpack_require__(0);




var BIDDER_CODE = 'project-limelight';
var URL = '//ads.project-limelight.com/hb';
/**
 * Determines whether or not the given bid response is valid.
 *
 * @param {object} bid The bid to validate.
 * @return boolean True if this is a valid bid, and false otherwise.
 */

function isBidResponseValid(bid) {
  if (!bid.requestId || !bid.cpm || !bid.creativeId || !bid.ttl || !bid.currency) {
    return false;
  }

  switch (bid.mediaType) {
    case __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */]:
      return Boolean(bid.width && bid.height && bid.ad);

    case __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["d" /* VIDEO */]:
      return Boolean(bid.vastXml || bid.vastUrl);
  }

  return false;
}

function extractBidSizes(bid) {
  var bidSizes = [];
  bid.sizes.forEach(function (size) {
    bidSizes.push({
      width: size[0],
      height: size[1]
    });
  });
  return bidSizes;
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["d" /* VIDEO */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {object} bid The bid to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return Boolean(bid.bidId && bid.params);
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var winTop;

    try {
      winTop = window.top;
      winTop.location.toString();
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_3__src_utils__["logMessage"](e);
      winTop = window;
    }

    ;
    var placements = [];
    var request = {
      'secure': location.protocol === 'https:',
      'deviceWidth': winTop.screen.width,
      'deviceHeight': winTop.screen.height,
      'adUnits': placements
    };

    for (var i = 0; i < validBidRequests.length; i++) {
      var bid = validBidRequests[i];
      var params = bid.params;
      placements.push({
        id: params.adUnitId,
        bidId: bid.bidId,
        transactionId: bid.transactionId,
        sizes: extractBidSizes(bid),
        type: params.adUnitType.toUpperCase()
      });
    }

    return {
      method: 'POST',
      url: URL,
      data: request
    };
  },
  onBidWon: function onBidWon(bid) {
    var cpm = bid.pbMg;

    if (bid.nurl !== '') {
      bid.nurl = bid.nurl.replace(/\$\{AUCTION_PRICE\}/, cpm);
      Object(__WEBPACK_IMPORTED_MODULE_2__src_ajax__["a" /* ajax */])(bid.nurl, null);
    }

    ;
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(bidResponses) {
    var res = [];
    var bidResponsesBody = bidResponses.body;
    var len = bidResponsesBody.length;

    for (var i = 0; i < len; i++) {
      var bid = bidResponsesBody[i];

      if (isBidResponseValid(bid)) {
        res.push(bid);
      }
    }

    return res;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[488]);