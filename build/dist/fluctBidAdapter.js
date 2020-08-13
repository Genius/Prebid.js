pbjsChunk([220],{

/***/ 410:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(411);


/***/ }),

/***/ 411:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);


var BIDDER_CODE = 'fluct';
var END_POINT = 'https://hb.adingo.jp/prebid';
var VERSION = '1.2';
var NET_REVENUE = true;
var TTL = 300;
var spec = {
  code: BIDDER_CODE,
  aliases: ['adingo'],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params.groupId && bid.params.tagId);
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {validBidRequests[]} - an array of bids.
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var serverRequests = [];
    var referer = bidderRequest.refererInfo.referer;

    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](validBidRequests, function (request) {
      var data = Object();
      data.referer = referer;
      data.adUnitCode = request.adUnitCode;
      data.bidId = request.bidId;
      data.transactionId = request.transactionId;
      data.sizes = [];

      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](request.sizes, function (size) {
        data.sizes.push({
          w: size[0],
          h: size[1]
        });
      });

      data.params = request.params;
      serverRequests.push({
        method: 'POST',
        url: END_POINT,
        options: {
          contentType: 'application/json',
          withCredentials: true,
          customHeaders: {
            'x-fluct-app': 'prebid/fluctBidAdapter',
            'x-fluct-version': VERSION,
            'x-openrtb-version': 2.5
          }
        },
        data: data
      });
    });

    return serverRequests;
  },

  /*
   * Unpack the respnse from the server into a list of bids.
   *
   * @param {serverResponse} serverResponse A successful response from the server.
   * @return {bid[]} An array of bids which weer nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, serverRequest) {
    var bidResponses = [];
    var res = serverResponse.body;

    if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](res) && !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](res.seatbid) && !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](res.seatbid[0].bid)) {
      var bid = res.seatbid[0].bid[0];
      var dealId = bid.dealid;
      var beaconUrl = bid.burl;
      var callImpBeacon = "<script type=\"application/javascript\">" + "(function() { var img = new Image(); img.src = \"".concat(beaconUrl, "\"})()") + "</script>";
      var data = {
        bidderCode: BIDDER_CODE,
        requestId: res.id,
        currency: res.cur,
        cpm: parseFloat(bid.price) || 0,
        netRevenue: NET_REVENUE,
        width: bid.w,
        height: bid.h,
        creativeId: bid.crid,
        ttl: TTL,
        ad: bid.adm + callImpBeacon
      };

      if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](dealId)) {
        data.dealId = dealId;
      }

      bidResponses.push(data);
    }

    return bidResponses;
  },

  /*
   * Register the user sync pixels which should be dropped after the auction.
   *
   * @params {syncOptions} syncOptions which user syncs are allowed?
   * @params {ServerResponse[]} serverResponses List of server's responses.
   * @return {UserSync[]} The user syncs which should be dropped.
   *
   */
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    return [];
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[410]);