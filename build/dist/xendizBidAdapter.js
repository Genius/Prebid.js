pbjsChunk([47],{

/***/ 662:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(663);


/***/ }),

/***/ 663:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);



var BIDDER_CODE = 'xendiz';
var PREBID_ENDPOINT = 'prebid.xendiz.com';
var SYNC_ENDPOINT = 'https://advsync.com/xendiz/ssp/?pixel=1';

var buildURI = function buildURI() {
  return "//".concat(PREBID_ENDPOINT, "/request");
};

var getDevice = function getDevice() {
  var lang = navigator.language || '';
  var width = window.screen.width;
  var height = window.screen.height;
  return [lang, width, height];
};

var buildItem = function buildItem(req) {
  return [req.bidId, req.params, req.adUnitCode, req.sizes.map(function (s) {
    return "".concat(s[0], "x").concat(s[1]);
  })];
};

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {object} bid The bid to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.pid;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} bidRequests A non-empty list of bid requests which should be sent to the Server.
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(bidRequests) {
    var payload = {
      id: bidRequests[0].auctionId,
      items: bidRequests.map(buildItem),
      device: getDevice(),
      page: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"](),
      dt: +new Date()
    };
    var payloadString = JSON.stringify(payload);
    return {
      method: 'POST',
      url: buildURI(),
      data: payloadString
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse) {
    var bids = serverResponse.body.bids.map(function (bid) {
      return {
        requestId: bid.id,
        cpm: bid.price,
        width: bid.w,
        height: bid.h,
        creativeId: bid.crid,
        netRevenue: bid.netRevenue !== undefined ? bid.netRevenue : true,
        dealId: bid.dealid,
        currency: bid.cur || 'USD',
        ttl: bid.exp || 900,
        ad: bid.adm
      };
    });
    return bids;
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    if (syncOptions.pixelEnabled) {
      return [{
        type: 'image',
        url: SYNC_ENDPOINT
      }];
    }
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[662]);