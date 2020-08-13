pbjsChunk([82],{

/***/ 750:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(751);


/***/ }),

/***/ 751:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_bidfactory_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__ = __webpack_require__(2);





var CONSTANTS = __webpack_require__(5);

var BIDDER_CODE = 'tribeos';
var ENDPOINT_URL = 'https://bidder.tribeos.tech/prebid/';
var LOG_PREFIX = 'TRIBEOS: ';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */]],

  /**
  * Determines whether or not the given bid request is valid.
  *
  * @param {BidRequest}
  *            bid The bid params to validate.
  * @return boolean True if this is a valid bid, and false otherwise.
  */
  isBidRequestValid: function isBidRequestValid(bid) {
    if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](bid.params.placementId)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](LOG_PREFIX, 'placementId is required, please contact tribeOS for placementId. Bid details: ', JSON.stringify(bid));
      return false;
    }

    return true;
  },

  /**
  * Make a server request from the list of BidRequests.
  *
  * @param {validBidRequests[]} -
  *            an array of bids
  * @return ServerRequest Info describing the request to the server.
  */
  buildRequests: function buildRequests(validBidRequests) {
    var requests = [];

    for (var i = 0; i < validBidRequests.length; i++) {
      requests.push(this.buidRTBRequest(validBidRequests[i]));
    }

    return requests;
  },
  buidRTBRequest: function buidRTBRequest(bidReq) {
    // build bid request object
    var placementId = bidReq.params.placementId;
    var bidFloor = bidReq.params.bidfloor;
    var placementCode = bidReq.params.placementCode;
    var adWidth = bidReq.mediaTypes.banner.sizes[0][0];
    var adHeight = bidReq.mediaTypes.banner.sizes[0][1]; // build bid request with impressions

    var bidRequest = {
      id: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getUniqueIdentifierStr"](),
      imp: [{
        id: bidReq.bidId,
        banner: {
          w: adWidth,
          h: adHeight
        },
        tagid: placementCode,
        bidfloor: bidFloor
      }],
      site: {
        domain: window.location.host,
        page: window.location.href,
        publisher: {
          id: placementId
        }
      },
      device: {
        'language': navigator.language || navigator.browserLanguage || navigator.userLanguage || navigator.systemLanguage,
        'w': adWidth,
        'h': adHeight,
        'js': 1,
        'ua': navigator.userAgent
      }
    }; // apply gdpr

    if (bidReq.gdprConsent) {
      bidRequest.regs = {
        ext: {
          gdpr: bidReq.gdprConsent.gdprApplies ? 1 : 0
        }
      };
      bidRequest.user = {
        ext: {
          consent: bidReq.gdprConsent.consentString
        }
      };
    }

    bidRequest.bidId = bidReq.bidId;
    var url = ENDPOINT_URL + placementId + '/requests';

    if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](bidReq.params.endpointUrl)) {
      url = bidReq.params.endpointUrl + placementId + '/requests';
    }

    return {
      method: 'POST',
      url: url,
      data: JSON.stringify(bidRequest),
      options: {
        withCredentials: true,
        contentType: 'application/json'
      }
    };
  },

  /**
  * Unpack the response from the server into a list of bids.
  *
  * @param {ServerResponse}
  *            serverResponse A successful response from the server.
  * @return {Bid[]} An array of bids which were nested inside the server.
  */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var responseBody = serverResponse.body;
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"](LOG_PREFIX, 'response body: ', JSON.stringify(serverResponse));

    if (!responseBody || !responseBody.id) {
      return [];
    }

    var bidResponses = [];
    responseBody.seatbid[0].bid.forEach(function (bidderBid) {
      var responsePrice;
      var placementCode = '';

      if (bidRequest) {
        var bidResponse = __WEBPACK_IMPORTED_MODULE_2__src_bidfactory_js__["a" /* createBid */](1);
        placementCode = bidRequest.placementCode;
        bidRequest.status = CONSTANTS.STATUS.GOOD;
        responsePrice = parseFloat(bidderBid.price);

        if (responsePrice === 0) {
          var bid = __WEBPACK_IMPORTED_MODULE_2__src_bidfactory_js__["a" /* createBid */](2);
          bid.bidderCode = BIDDER_CODE;
          bidResponses.push(bid);
          __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"](LOG_PREFIX, 'response price is zero. Response data: ', JSON.stringify(bidRequest));
          return bidResponses;
        }

        bidResponse.placementCode = placementCode;
        bidResponse.size = bidRequest.sizes;
        bidResponse.creativeId = bidderBid.crid;
        bidResponse.bidderCode = BIDDER_CODE;
        bidResponse.cpm = responsePrice;
        bidResponse.ad = bidderBid.adm;
        bidResponse.width = parseInt(bidderBid.w);
        bidResponse.height = parseInt(bidderBid.h);
        bidResponse.currency = responseBody.cur;
        bidResponse.netRevenue = true;
        bidResponse.requestId = bidderBid.impid;
        bidResponse.ttl = 180;
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"](LOG_PREFIX, 'bid response data: ', JSON.stringify(bidResponse));
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"](LOG_PREFIX, 'bid request data: ', JSON.stringify(bidRequest));
        bidResponses.push(bidResponse);
      }
    });
    return bidResponses;
  }
  /**
  * Register bidder specific code, which will execute if a bid from this
  * bidder won the auction
  *
  * @param {Bid}
  *            The bid that won the auction
  */
  //  onBidWon: function(bid) {
  //    ajax(this.nurls[bid.requestId], null);
  //  }

};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[750]);