pbjsChunk([222],{

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(239);


/***/ }),

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);



var BIDDER_CODE = 'clickforce';
var ENDPOINT_URL = '//ad.doublemax.net/adserver/prebid.json?cb=' + new Date().getTime() + '&hb=1&ver=1.21';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["c" /* NATIVE */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return bid && bid.params && !!bid.params.zone;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} validBidRequests - an array of bids
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests) {
    var bidParams = [];

    __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](validBidRequests, function (bid) {
      bidParams.push({
        z: bid.params.zone,
        bidId: bid.bidId
      });
    });

    return {
      method: 'POST',
      url: ENDPOINT_URL,
      data: bidParams,
      validBidRequests: validBidRequests
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @param {*} bidRequest
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var cfResponses = [];
    var bidRequestList = [];

    if (typeof bidRequest != 'undefined') {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](bidRequest.validBidRequests, function (req) {
        bidRequestList[req.bidId] = req;
      });
    }

    __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](serverResponse.body, function (response) {
      if (response.requestId != null) {
        // native ad size
        if (response.width == 3) {
          cfResponses.push({
            requestId: response.requestId,
            cpm: response.cpm,
            width: response.width,
            height: response.height,
            creativeId: response.creativeId,
            currency: response.currency,
            netRevenue: response.netRevenue,
            ttl: response.ttl,
            native: {
              title: response.tag.content.title,
              body: response.tag.content.content,
              image: {
                url: response.tag.content.image,
                height: 900,
                width: 1600
              },
              icon: {
                url: response.tag.content.icon,
                height: 900,
                width: 900
              },
              clickUrl: response.tag.cu,
              cta: response.tag.content.button_text,
              sponsoredBy: response.tag.content.advertiser,
              impressionTrackers: response.tag.iu
            },
            mediaType: 'native'
          });
        } else {
          // display ad
          cfResponses.push({
            requestId: response.requestId,
            cpm: response.cpm,
            width: response.width,
            height: response.height,
            creativeId: response.creativeId,
            currency: response.currency,
            netRevenue: response.netRevenue,
            ttl: response.ttl,
            ad: response.tag,
            mediaType: 'banner'
          });
        }
      }
    });

    return cfResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    if (syncOptions.iframeEnabled) {
      return [{
        type: 'iframe',
        url: 'https://cdn.doublemax.net/js/capmapping.htm'
      }];
    } else if (syncOptions.pixelEnabled) {
      return [{
        type: 'image',
        url: 'https://c.doublemax.net/cm'
      }];
    }
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[238]);