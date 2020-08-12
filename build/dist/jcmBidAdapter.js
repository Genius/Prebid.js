pbjsChunk([131],{

/***/ 309:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(310);


/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);


var BIDDER_CODE = 'jcm';
var URL = 'https://media.adfrontiers.com/pq';
var spec = {
  code: BIDDER_CODE,
  aliases: ['jcarter'],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params && bid.params.siteId && bid.bidId);
  },
  buildRequests: function buildRequests(validBidRequests) {
    var BidRequestStr = {
      bids: []
    };

    for (var i = 0; i < validBidRequests.length; i++) {
      var adSizes = '';
      var bid = validBidRequests[i];

      for (var x = 0; x < bid.sizes.length; x++) {
        adSizes += __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseGPTSingleSizeArray"](bid.sizes[x]);

        if (x !== bid.sizes.length - 1) {
          adSizes += ',';
        }
      }

      BidRequestStr.bids.push({
        'callbackId': bid.bidId,
        'siteId': bid.params.siteId,
        'adSizes': adSizes
      });
    }

    var JSONStr = JSON.stringify(BidRequestStr);
    var dataStr = 't=hb&ver=1.0&compact=true&bids=' + encodeURIComponent(JSONStr);
    return {
      method: 'GET',
      url: URL,
      data: dataStr
    };
  },
  interpretResponse: function interpretResponse(serverResponse) {
    var bidResponses = [];
    serverResponse = serverResponse.body; // loop through serverResponses

    if (serverResponse) {
      if (serverResponse.bids) {
        var bids = serverResponse.bids;

        for (var i = 0; i < bids.length; i++) {
          var bid = bids[i];
          var bidResponse = {
            requestId: bid.callbackId,
            bidderCode: spec.code,
            cpm: bid.cpm,
            width: bid.width,
            height: bid.height,
            creativeId: bid.creativeId,
            currency: 'USD',
            netRevenue: bid.netRevenue,
            ttl: bid.ttl,
            ad: decodeURIComponent(bid.ad.replace(/\+/g, '%20'))
          };
          bidResponses.push(bidResponse);
        }

        ;
      }

      ;
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    if (syncOptions.iframeEnabled) {
      return [{
        type: 'iframe',
        url: 'https://media.adfrontiers.com/hb/jcm_usersync.html'
      }];
    }

    if (syncOptions.image) {
      return [{
        type: 'image',
        url: 'https://media.adfrontiers.com/hb/jcm_usersync.png'
      }];
    }
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[309]);