pbjsChunk([195],{

/***/ 146:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(147);


/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



var BIDDER_CODE = 'admatic';
var ENDPOINT_URL = 'https://ads4.admatic.com.tr/prebid/v3/bidrequest';
var spec = {
  code: BIDDER_CODE,
  aliases: ['admatic'],
  // short code

  /**
  * Determines whether or not the given bid request is valid.
  *
  * @param {BidRequest} bid The bid params to validate.
  * @return boolean True if this is a valid bid, and false otherwise.
  */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params.pid && bid.params.wid && bid.params.url);
  },

  /**
  * Make a server request from the list of BidRequests.
  *
  * @param {validBidRequests[]} - an array of bids
  * @return ServerRequest Info describing the request to the server.
  */
  buildRequests: function buildRequests(validBidRequests) {
    var payload = {
      request: []
    };

    for (var i = 0; i < validBidRequests.length; i++) {
      var validBidRequest = validBidRequests[i];
      payload.auctionId = validBidRequest.auctionId;
      payload.bidder = validBidRequest.bidder;
      payload.bidderRequestId = validBidRequest.bidderRequestId;
      payload.pid = validBidRequest.params.pid;
      payload.wid = validBidRequest.params.wid;
      payload.url = validBidRequest.params.url;
      var request = {
        adUnitCode: validBidRequest.adUnitCode,
        bidId: validBidRequest.bidId,
        transactionId: validBidRequest.transactionId,
        priceType: validBidRequest.params.priceType,
        sizes: transformSizes(validBidRequest.sizes)
      };
      payload.request.push(request);
    }

    var payloadString = JSON.stringify(payload);
    return {
      method: 'POST',
      url: ENDPOINT_URL,
      data: payloadString,
      bidder: 'admatic',
      bids: validBidRequests
    };
  },

  /**
  * Unpack the response from the server into a list of bids.
  *
  * @param {ServerResponse} serverResponse A successful response from the server.
  * @return {Bid[]} An array of bids which were nested inside the server.
  */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var serverBody = serverResponse.body;
    var bidResponses = [];

    if (serverBody) {
      if (serverBody.tags && serverBody.tags.length > 0) {
        serverBody.tags.forEach(function (serverBid) {
          if (serverBid != null) {
            if (serverBid.cpm !== 0) {
              var bidResponse = {
                requestId: serverBid.bidId,
                cpm: serverBid.cpm,
                width: serverBid.width,
                height: serverBid.height,
                creativeId: serverBid.creativeId,
                dealId: serverBid.dealId,
                currency: serverBid.currency,
                netRevenue: serverBid.netRevenue,
                ttl: serverBid.ttl,
                referrer: serverBid.referrer,
                ad: serverBid.ad
              };
              bidResponses.push(bidResponse);
            }
          }
        });
      }
    }

    return bidResponses;
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

    if (syncOptions.iframeEnabled) {
      syncs.push({
        type: 'iframe',
        url: 'https://ads4.admatic.com.tr/prebid/static/usersync/v3/async_usersync.html'
      });
    }

    if (syncOptions.pixelEnabled && serverResponses.length > 0) {
      syncs.push({
        type: 'image',
        url: 'https://ads5.admatic.com.tr/prebid/v3/bidrequest/usersync'
      });
    }

    return syncs;
  }
};
/* Turn bid request sizes into ut-compatible format */

function transformSizes(requestSizes) {
  var sizes = [];
  var sizeObj = {};

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](requestSizes) && requestSizes.length === 2 && !__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](requestSizes[0])) {
    sizeObj.width = parseInt(requestSizes[0], 10);
    sizeObj.height = parseInt(requestSizes[1], 10);
    sizes.push(sizeObj);
  } else if (_typeof(requestSizes) === 'object') {
    for (var i = 0; i < requestSizes.length; i++) {
      var size = requestSizes[i];
      sizeObj = {};
      sizeObj.width = parseInt(size[0], 10);
      sizeObj.height = parseInt(size[1], 10);
      sizes.push(sizeObj);
    }
  }

  return sizes;
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[146]);