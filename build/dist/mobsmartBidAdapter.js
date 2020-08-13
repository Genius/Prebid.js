pbjsChunk([168],{

/***/ 535:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(536);


/***/ }),

/***/ 536:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config_js__ = __webpack_require__(3);


var BIDDER_CODE = 'mobsmart';
var ENDPOINT = 'https://prebid.mobsmart.net/prebid/endpoint';
var spec = {
  code: BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    if (bid.bidder !== BIDDER_CODE) {
      return false;
    }

    return true;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var timeout = __WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('bidderTimeout');
    var referrer = encodeURIComponent(bidderRequest.refererInfo.referer);
    return validBidRequests.map(function (bidRequest) {
      var adUnit = {
        code: bidRequest.adUnitCode,
        bids: {
          bidder: bidRequest.bidder,
          params: bidRequest.params
        },
        mediaTypes: bidRequest.mediaTypes
      };

      if (bidRequest.hasOwnProperty('sizes') && bidRequest.sizes.length > 0) {
        adUnit.sizes = bidRequest.sizes;
      }

      var request = {
        auctionId: bidRequest.auctionId,
        requestId: bidRequest.bidId,
        bidRequestsCount: bidRequest.bidRequestsCount,
        bidderRequestId: bidRequest.bidderRequestId,
        transactionId: bidRequest.transactionId,
        referrer: referrer,
        timeout: timeout,
        adUnit: adUnit
      };

      if (bidRequest.userId && bidRequest.userId.pubcid) {
        request.userId = {
          pubcid: bidRequest.userId.pubcid
        };
      }

      return {
        method: 'POST',
        url: ENDPOINT,
        data: JSON.stringify(request)
      };
    });
  },
  interpretResponse: function interpretResponse(serverResponse) {
    var bidResponses = [];

    if (serverResponse.body) {
      var response = serverResponse.body;
      var bidResponse = {
        requestId: response.requestId,
        cpm: response.cpm,
        width: response.width,
        height: response.height,
        creativeId: response.creativeId,
        currency: response.currency,
        netRevenue: response.netRevenue,
        ttl: response.ttl,
        ad: response.ad
      };
      bidResponses.push(bidResponse);
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    var syncs = [];

    if (syncOptions.iframeEnabled) {
      syncs.push({
        type: 'iframe',
        url: 'https://tags.mobsmart.net/tags/iframe'
      });
    } else if (syncOptions.pixelEnabled) {
      syncs.push({
        type: 'image',
        url: 'https://tags.mobsmart.net/tags/image'
      });
    }

    return syncs;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[535]);