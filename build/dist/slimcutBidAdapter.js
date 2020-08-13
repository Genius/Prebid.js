pbjsChunk([104],{

/***/ 694:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(695);


/***/ }),

/***/ 695:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_ajax_js__ = __webpack_require__(4);



var BIDDER_CODE = 'slimcut';
var ENDPOINT_URL = 'https://sb.freeskreen.com/pbr';
var spec = {
  code: BIDDER_CODE,
  aliases: ['scm'],
  supportedMediaTypes: ['video', 'banner'],

  /**
     * Determines whether or not the given bid request is valid.
     *
     * @param {BidRequest} bid The bid params to validate.
     * @return boolean True if this is a valid bid, and false otherwise.
     */
  isBidRequestValid: function isBidRequestValid(bid) {
    var isValid = false;

    if (typeof bid.params !== 'undefined' && !isNaN(parseInt(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getValue"](bid.params, 'placementId'))) && parseInt(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getValue"](bid.params, 'placementId')) > 0) {
      isValid = true;
    }

    return isValid;
  },

  /**
     * Make a server request from the list of BidRequests.
     *
     * @param {validBidRequests[]} an array of bids
     * @return ServerRequest Info describing the request to the server.
     */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var bids = validBidRequests.map(buildRequestObject);
    var payload = {
      referrer: getReferrerInfo(bidderRequest),
      data: bids,
      deviceWidth: screen.width
    };
    var gdpr = bidderRequest.gdprConsent;

    if (bidderRequest && gdpr) {
      var isCmp = typeof gdpr.gdprApplies === 'boolean';
      var isConsentString = typeof gdpr.consentString === 'string';
      payload.gdpr_iab = {
        consent: isConsentString ? gdpr.consentString : '',
        status: isCmp ? gdpr.gdprApplies : -1
      };
    }

    var payloadString = JSON.stringify(payload);
    return {
      method: 'POST',
      url: ENDPOINT_URL,
      data: payloadString
    };
  },

  /**
     * Unpack the response from the server into a list of bids.
     *
     * @param {*} serverResponse A successful response from the server.
     * @return {Bid[]} An array of bids which were nested inside the server.
     */
  interpretResponse: function interpretResponse(serverResponse, request) {
    var bidResponses = [];
    serverResponse = serverResponse.body;

    if (serverResponse.responses) {
      serverResponse.responses.forEach(function (bid) {
        var bidResponse = {
          cpm: bid.cpm,
          width: bid.width,
          height: bid.height,
          currency: bid.currency,
          netRevenue: bid.netRevenue,
          ttl: bid.ttl,
          ad: bid.ad,
          requestId: bid.requestId,
          creativeId: bid.creativeId,
          transactionId: bid.tranactionId,
          winUrl: bid.winUrl
        };
        bidResponses.push(bidResponse);
      });
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    if (syncOptions.iframeEnabled) {
      return [{
        type: 'iframe',
        url: 'https://sb.freeskreen.com/async_usersync.html'
      }];
    }

    return [];
  },
  onBidWon: function onBidWon(bid) {
    Object(__WEBPACK_IMPORTED_MODULE_2__src_ajax_js__["a" /* ajax */])(bid.winUrl + bid.cpm, null);
  }
};

function buildRequestObject(bid) {
  var reqObj = {};
  var placementId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getValue"](bid.params, 'placementId');
  reqObj.sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](bid.sizes);
  reqObj.bidId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('bidId', bid);
  reqObj.bidderRequestId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('bidderRequestId', bid);
  reqObj.placementId = parseInt(placementId);
  reqObj.adUnitCode = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('adUnitCode', bid);
  reqObj.auctionId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('auctionId', bid);
  reqObj.transactionId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('transactionId', bid);
  return reqObj;
}

function getReferrerInfo(bidderRequest) {
  var ref = window.location.href;

  if (bidderRequest && bidderRequest.refererInfo && bidderRequest.refererInfo.referer) {
    ref = bidderRequest.refererInfo.referer;
  }

  return ref;
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[694]);