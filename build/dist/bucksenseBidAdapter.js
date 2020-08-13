pbjsChunk([263],{

/***/ 307:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(308);


/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils_js__ = __webpack_require__(0);



var WHO = 'BKSHBID-005';
var BIDDER_CODE = 'bucksense';
var URL = 'https://prebid.bksn.se/prebidjs/';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {object} bid The bid to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
  */
  isBidRequestValid: function isBidRequestValid(bid) {
    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logInfo"](WHO + ' isBidRequestValid() - INPUT bid:', bid);

    if (bid.bidder !== BIDDER_CODE || typeof bid.params === 'undefined') {
      return false;
    }

    if (typeof bid.params.placementId === 'undefined') {
      return false;
    }

    return true;
  },

  /**
    * Make a server request from the list of BidRequests.
    *
    * @param {BidRequest[]} validBidRequests A non-empty list of valid bid requests that should be sent to the Server.
    * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logInfo"](WHO + ' buildRequests() - INPUT validBidRequests:', validBidRequests, 'INPUT bidderRequest:', bidderRequest);
    var requests = [];
    var len = validBidRequests.length;

    for (var i = 0; i < len; i++) {
      var bid = validBidRequests[i];
      var params = {};

      for (var key in bid.params) {
        if (bid.params.hasOwnProperty(key)) {
          params[key] = encodeURI(bid.params[key]);
        }
      }

      delete bid.params;
      var sizes = bid.sizes;
      delete bid.sizes;
      var sendData = {
        'pub_id': location.host,
        'pl_id': '' + params.placementId,
        'secure': location.protocol === 'https:' ? 1 : 0,
        'href': encodeURI(location.href),
        'bid_id': bid.bidId,
        'params': params,
        'sizes': sizes,
        '_bid': bidderRequest
      };
      requests.push({
        method: 'POST',
        url: URL,
        data: sendData
      });
    }

    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logInfo"](WHO + ' buildRequests() - requests:', requests);
    return requests;
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
  */
  interpretResponse: function interpretResponse(serverResponse, request) {
    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logInfo"](WHO + ' interpretResponse() - INPUT serverResponse:', serverResponse, 'INPUT request:', request);
    var bidResponses = [];

    if (serverResponse.body) {
      var oResponse = serverResponse.body;
      var sRequestID = oResponse.requestId || '';
      var nCPM = oResponse.cpm || 0;
      var nWidth = oResponse.width || 0;
      var nHeight = oResponse.height || 0;
      var nTTL = oResponse.ttl || 0;
      var sCreativeID = oResponse.creativeId || 0;
      var sCurrency = oResponse.currency || 'USD';
      var bNetRevenue = oResponse.netRevenue || true;
      var sAd = oResponse.ad || '';

      if (request && sRequestID.length == 0) {
        __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logInfo"](WHO + ' interpretResponse() - use RequestID from Placments');
        sRequestID = request.data.bid_id || '';
      }

      if (request && request.data.params.hasOwnProperty('testcpm')) {
        __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logInfo"](WHO + ' interpretResponse() - use Test CPM ');
        nCPM = request.data.params.testcpm;
      }

      var bidResponse = {
        requestId: sRequestID,
        cpm: nCPM,
        width: nWidth,
        height: nHeight,
        ttl: nTTL,
        creativeId: sCreativeID,
        currency: sCurrency,
        netRevenue: bNetRevenue,
        ad: sAd
      };
      bidResponses.push(bidResponse);
    } else {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logInfo"](WHO + ' interpretResponse() - serverResponse not valid');
    }

    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logInfo"](WHO + ' interpretResponse() - return', bidResponses);
    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[307]);