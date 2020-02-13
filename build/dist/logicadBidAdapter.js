pbjsChunk([155],{

/***/ 401:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(402);


/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__ = __webpack_require__(2);


var BIDDER_CODE = 'logicad';
var ENDPOINT_URL = 'https://pb.ladsp.com/adrequest/prebid';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params && bid.params.tid);
  },
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var requests = [];

    for (var i = 0, len = bidRequests.length; i < len; i++) {
      var request = {
        method: 'POST',
        url: ENDPOINT_URL,
        data: JSON.stringify(newBidRequest(bidRequests[i], bidderRequest)),
        options: {},
        bidderRequest: bidderRequest
      };
      requests.push(request);
    }

    return requests;
  },
  interpretResponse: function interpretResponse(serverResponse, bidderRequest) {
    serverResponse = serverResponse.body;
    var bids = [];

    if (!serverResponse || serverResponse.error) {
      return bids;
    }

    serverResponse.seatbid.forEach(function (seatbid) {
      bids.push(seatbid.bid);
    });
    return bids;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    if (serverResponses.length > 0 && serverResponses[0].body.userSync && syncOptions.pixelEnabled && serverResponses[0].body.userSync.type == 'image') {
      return [{
        type: 'image',
        url: serverResponses[0].body.userSync.url
      }];
    }

    return [];
  }
};

function newBidRequest(bid, bidderRequest) {
  return {
    auctionId: bid.auctionId,
    bidderRequestId: bid.bidderRequestId,
    bids: [{
      adUnitCode: bid.adUnitCode,
      bidId: bid.bidId,
      transactionId: bid.transactionId,
      sizes: bid.sizes,
      params: bid.params,
      mediaTypes: bid.mediaTypes
    }],
    prebidJsVersion: "2.37.0",
    referrer: bidderRequest.refererInfo.referer,
    auctionStartTime: bidderRequest.auctionStart
  };
}

Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[401]);