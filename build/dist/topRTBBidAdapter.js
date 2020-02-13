pbjsChunk([70],{

/***/ 610:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(611);


/***/ }),

/***/ 611:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);



var BIDDER_CODE = 'topRTB';
var ENDPOINT_URL = 'https://ssp.toprtb.com/ssp/rest/ReqAd?ref=www.google.com&hbid=0&adUnitId=';
var adName = '';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.banner')) {
      adName = 'banner';
      return bid.params && !!bid.params.adUnitId;
    }

    if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.video')) {
      adName = 'video';
      return bid.params && !!bid.params.adUnitId;
    }
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var adunitid = [];

    __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](validBidRequests, function (bid) {
      adunitid.push(bid.params.adUnitId + '_' + bid.bidId);
    });

    return {
      method: 'GET',
      url: ENDPOINT_URL + adunitid.toString()
    };
  },
  interpretResponse: function interpretResponse(serverResponses, request) {
    var bidResponses = [];

    __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](serverResponses.body, function (response) {
      if (response.cpm > 0) {
        var bidResponse = {
          requestId: response.bidId,
          cpm: response.cpm,
          width: response.width,
          height: response.height,
          ad: response.mediadata,
          ttl: response.ttl,
          creativeId: response.id,
          netRevenue: true,
          currency: response.currency,
          tracking: response.tracking,
          impression: response.impression
        };

        if (adName == 'video') {
          bidResponse.vastXml = response.mediadata;
          bidResponse.mediaType = 'video';
        } else {
          bidResponse.ad = response.mediadata;
          bidResponse.mediaType = 'banner';
        }

        bidResponses.push(bidResponse);
      }
    });

    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[610]);