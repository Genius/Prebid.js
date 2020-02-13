pbjsChunk([205],{

/***/ 284:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(285);


/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony export (immutable) */ __webpack_exports__["getCookieUid"] = getCookieUid;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);



var BIDDER_CODE = 'dgads';
var UID_NAME = 'dgads_uid';
var ENDPOINT = 'https://ads-tr.bigmining.com/ad/p/bid';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["c" /* NATIVE */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    var params = bid.params;

    if (!/^\d+$/.test(params.location_id)) {
      return false;
    }

    if (!/^\d+$/.test(params.site_id)) {
      return false;
    }

    return true;
  },
  buildRequests: function buildRequests(bidRequests) {
    if (bidRequests.length === 0) {
      return {};
    }

    return bidRequests.map(function (bidRequest) {
      var params = bidRequest.params;
      var data = {};
      data['_loc'] = params.location_id;
      data['_medium'] = params.site_id;
      data['transaction_id'] = bidRequest.transactionId;
      data['bid_id'] = bidRequest.bidId;
      data['referer'] = __WEBPACK_IMPORTED_MODULE_1__src_utils__["getTopWindowUrl"]();
      data['_uid'] = getCookieUid(UID_NAME);
      return {
        method: 'GET',
        url: ENDPOINT,
        data: data
      };
    });
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = [];
    var responseObj = serverResponse.body;
    var ads = responseObj.bids;
    var bidResponse = {};

    if (__WEBPACK_IMPORTED_MODULE_1__src_utils__["isEmpty"](ads)) {
      return [];
    }

    __WEBPACK_IMPORTED_MODULE_1__src_utils__["_each"](ads, function (ad) {
      bidResponse.requestId = ad.bidId;
      bidResponse.bidderCode = BIDDER_CODE;
      bidResponse.cpm = ad.cpm;
      bidResponse.creativeId = ad.creativeId;
      bidResponse.currency = 'JPY';
      bidResponse.netRevenue = true;
      bidResponse.ttl = ad.ttl;
      bidResponse.referrer = __WEBPACK_IMPORTED_MODULE_1__src_utils__["getTopWindowUrl"]();

      if (ad.isNative == 1) {
        bidResponse.mediaType = __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["c" /* NATIVE */];
        bidResponse.native = setNativeResponse(ad);
      } else {
        bidResponse.width = parseInt(ad.w);
        bidResponse.height = parseInt(ad.h);
        bidResponse.ad = ad.ad;
      }

      bidResponses.push(bidResponse);
    });

    return bidResponses;
  }
};

function setNativeResponse(ad) {
  var nativeResponce = {};
  nativeResponce.image = {
    url: ad.image,
    width: parseInt(ad.w),
    height: parseInt(ad.h)
  };
  nativeResponce.title = ad.title;
  nativeResponce.body = ad.desc;
  nativeResponce.sponsoredBy = ad.sponsoredBy;
  nativeResponce.clickUrl = ad.clickUrl;
  nativeResponce.clickTrackers = ad.clickTrackers || [];
  nativeResponce.impressionTrackers = ad.impressionTrackers || [];
  return nativeResponce;
}

function getCookieUid(uidName) {
  if (__WEBPACK_IMPORTED_MODULE_1__src_utils__["cookiesAreEnabled"]()) {
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
      var value = cookies[i].split('=');

      if (value[0].indexOf(uidName) > -1) {
        return value[1];
      }
    }
  }

  return '';
}
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[284]);