pbjsChunk([212],{

/***/ 426:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(427);


/***/ }),

/***/ 427:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__ = __webpack_require__(2);




var BIDDER_CODE = 'gmossp';
var ENDPOINT = 'https://sp.gmossp-sp.jp/hb/prebid/query.ad';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.sid;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {validBidRequests[]} - an array of bids
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var bidRequests = [];
    var url = bidderRequest.refererInfo.referer;
    var cur = getCurrencyType();
    var dnt = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["getDNT"]() ? '1' : '0';

    for (var i = 0; i < validBidRequests.length; i++) {
      var queryString = '';
      var request = validBidRequests[i];
      var tid = request.transactionId;
      var bid = request.bidId;
      var ver = "4.2.0";
      var sid = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["getBidIdParameter"]('sid', request.params);
      queryString = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["tryAppendQueryString"](queryString, 'tid', tid);
      queryString = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["tryAppendQueryString"](queryString, 'bid', bid);
      queryString = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["tryAppendQueryString"](queryString, 'ver', ver);
      queryString = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["tryAppendQueryString"](queryString, 'sid', sid);
      queryString = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["tryAppendQueryString"](queryString, 'url', url);
      queryString = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["tryAppendQueryString"](queryString, 'cur', cur);
      queryString = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["tryAppendQueryString"](queryString, 'dnt', dnt);
      bidRequests.push({
        method: 'GET',
        url: ENDPOINT,
        data: queryString
      });
    }

    return bidRequests;
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(bidderResponse, requests) {
    var res = bidderResponse.body;

    if (__WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isEmpty"](res)) {
      return [];
    }

    try {
      res.imps.forEach(function (impTracker) {
        var tracker = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["createTrackPixelHtml"](impTracker);
        res.ad += tracker;
      });
    } catch (error) {
      __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logError"]('Error appending tracking pixel', error);
    }

    var bid = {
      requestId: res.bid,
      cpm: res.price,
      currency: res.cur,
      width: res.w,
      height: res.h,
      ad: res.ad,
      creativeId: res.creativeId,
      netRevenue: true,
      ttl: res.ttl || 300
    };
    return [bid];
  },

  /**
   * Register the user sync pixels which should be dropped after the auction.
   *
   * @param {SyncOptions} syncOptions Which user syncs are allowed?
   * @param {ServerResponse[]} serverResponses List of server's responses.
   * @return {UserSync[]} The user syncs which should be dropped.
   */
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    var syncs = [];

    if (!serverResponses.length) {
      return syncs;
    }

    serverResponses.forEach(function (res) {
      if (syncOptions.pixelEnabled && res.body && res.body.syncs.length) {
        res.body.syncs.forEach(function (sync) {
          syncs.push({
            type: 'image',
            url: sync
          });
        });
      }
    });
    return syncs;
  }
};

function getCurrencyType() {
  if (__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('currency.adServerCurrency')) {
    return __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('currency.adServerCurrency');
  }

  return 'JPY';
}

Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[426]);