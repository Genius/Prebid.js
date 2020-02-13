pbjsChunk([57],{

/***/ 640:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(641);


/***/ }),

/***/ 641:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);


var BIDDER_CODE = 'vertoz';
var BASE_URI = '//hb.vrtzads.com/vzhbidder/bid?';
var spec = {
  code: BIDDER_CODE,

  /**
  * Determines whether or not the given bid request is valid.
  *
  * @param {BidRequest} bid The bid params to validate.
  * @return boolean True if this is a valid bid, and false otherwise.
  */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.placementId;
  },

  /**
  * Make a server request from the list of BidRequests.
  *
  * @param {validBidRequests[]} - an array of bids
  * @return ServerRequest Info describing the request to the server.
  */
  buildRequests: function buildRequests(bidRequestsArr) {
    var bidRequests = bidRequestsArr || [];
    return bidRequests.map(function (bid) {
      var slotBidId = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getValue"](bid, 'bidId');
      var cb = Math.round(new Date().getTime() / 1000);
      var vzEndPoint = BASE_URI;
      var reqParams = bid.params || {};
      var placementId = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getValue"](reqParams, 'placementId');
      var cpm = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getValue"](reqParams, 'cpmFloor');

      if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmptyStr"](placementId)) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('missing params:', BIDDER_CODE, 'Enter valid vzPlacementId');
        return;
      }

      var reqSrc = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowLocation"]().href;
      var vzReq = {
        _vzPlacementId: placementId,
        _rqsrc: reqSrc,
        _cb: cb,
        _slotBidId: slotBidId,
        _cpm: cpm,
        _cbn: "pbjs"
      };
      var queryParamValue = encodeURIComponent(JSON.stringify(vzReq));
      return {
        method: 'POST',
        data: {
          q: queryParamValue
        },
        url: vzEndPoint
      };
    });
  },

  /**
  * Unpack the response from the server into a list of bids.
  *
  * @param {ServerResponse} serverResponse A successful response from the server.
  * @return {Bid[]} An array of bids which were nested inside the server.
  */
  interpretResponse: function interpretResponse(serverResponse) {
    var bidRespObj = serverResponse.body;
    var bidResponses = [];

    if (bidRespObj.cpm) {
      var bidResponse = {
        requestId: bidRespObj.slotBidId,
        cpm: Number(bidRespObj.cpm),
        width: Number(bidRespObj.adWidth),
        height: Number(bidRespObj.adHeight),
        netRevenue: true,
        mediaType: 'banner',
        currency: 'USD',
        dealId: null,
        creativeId: bidRespObj.bid,
        ttl: 300,
        ad: bidRespObj.ad + __WEBPACK_IMPORTED_MODULE_0__src_utils__["createTrackPixelHtml"](decodeURIComponent(bidRespObj.nurl))
      };
      bidResponses.push(bidResponse);
    }

    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[640]);