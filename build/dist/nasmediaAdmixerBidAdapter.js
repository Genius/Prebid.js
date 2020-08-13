pbjsChunk([163],{

/***/ 545:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(546);


/***/ }),

/***/ 546:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__ = __webpack_require__(2);


var ADMIXER_ENDPOINT = 'https://adn.admixer.co.kr:10443/prebid/ad_req';
var BIDDER_CODE = 'nasmediaAdmixer';
var DEFAULT_BID_TTL = 360;
var DEFAULT_CURRENCY = 'USD';
var DEFAULT_REVENUE = false;
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid && bid.params && bid.params.media_key && bid.params.adunit_id);
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    return validBidRequests.map(function (bid) {
      var payload = {
        media_key: bid.params.media_key,
        adunit_id: bid.params.adunit_id,
        req_id: bid.bidId,
        referrer: bidderRequest.refererInfo.referer,
        os: getOs(),
        platform: getPlatform()
      };
      return {
        method: 'GET',
        url: ADMIXER_ENDPOINT,
        data: payload
      };
    });
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var serverBody = serverResponse.body;
    var bidResponses = [];

    if (serverBody && serverBody.error_code === 0 && serverBody.body && serverBody.body.length > 0) {
      var bidData = serverBody.body[0];
      var bidResponse = {
        ad: bidData.ad,
        requestId: serverBody.req_id,
        creativeId: bidData.ad_id,
        cpm: bidData.cpm,
        width: bidData.width,
        height: bidData.height,
        currency: bidData.currency ? bidData.currency : DEFAULT_CURRENCY,
        netRevenue: DEFAULT_REVENUE,
        ttl: DEFAULT_BID_TTL
      };
      bidResponses.push(bidResponse);
    }

    return bidResponses;
  }
};

function getOs() {
  var ua = navigator.userAgent;

  if (ua.match(/(iPhone|iPod|iPad)/)) {
    return 'ios';
  } else if (ua.match(/Android/)) {
    return 'android';
  } else if (ua.match(/Window/)) {
    return 'windows';
  } else {
    return 'etc';
  }
}

function getPlatform() {
  return isMobile() ? 'm_web' : 'pc_web';
}

function isMobile() {
  return /(ios|ipod|ipad|iphone|android)/i.test(navigator.userAgent.toLowerCase());
}

Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[545]);