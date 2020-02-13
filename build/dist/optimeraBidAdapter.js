pbjsChunk([131],{

/***/ 453:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(454);


/***/ }),

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils__ = __webpack_require__(0);


var BIDDER_CODE = 'optimera';
var SCORES_BASE_URL = 'https://dyv1bugovvq1g.cloudfront.net/';
var spec = {
  code: BIDDER_CODE,

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {bidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bidRequest) {
    if (typeof bidRequest.params !== 'undefined' && typeof bidRequest.params.clientID !== 'undefined') {
      return true;
    }

    return false;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * We call the existing scores data file for ad slot placement scores.
   * These scores will be added to the dealId to be pushed to DFP.
   *
   * @param {validBidRequests[]} - an array of bids
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests) {
    var optimeraHost = window.location.host;
    var optimeraPathName = window.location.pathname;

    if (typeof validBidRequests[0].params.clientID !== 'undefined') {
      var clientID = validBidRequests[0].params.clientID;
      var scoresURL = "".concat(SCORES_BASE_URL + clientID, "/").concat(optimeraHost).concat(optimeraPathName, ".js");
      return {
        method: 'GET',
        url: scoresURL,
        payload: validBidRequests
      };
    }

    return {};
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * Some required bid params are not needed for this so default
   * values are used.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var validBids = bidRequest.payload;
    var bidResponses = [];
    var dealId = '';

    if (typeof serverResponse.body !== 'undefined') {
      var scores = serverResponse.body;

      for (var i = 0; i < validBids.length; i += 1) {
        if (typeof validBids[i].params.clientID !== 'undefined') {
          if (validBids[i].adUnitCode in scores) {
            var deviceDealId = Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"])(scores, "device.".concat(validBids[i].params.device, ".").concat(validBids[i].adUnitCode));
            dealId = deviceDealId || scores[validBids[i].adUnitCode];
          }

          var bidResponse = {
            requestId: validBids[i].bidId,
            ad: '<div></div>',
            cpm: 0.01,
            width: 0,
            height: 0,
            dealId: dealId,
            ttl: 300,
            creativeId: '1',
            netRevenue: '0',
            currency: 'USD'
          };
          bidResponses.push(bidResponse);
        }
      }
    }

    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[453]);