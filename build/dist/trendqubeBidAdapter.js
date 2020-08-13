pbjsChunk([83],{

/***/ 748:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(749);


/***/ }),

/***/ 749:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils_js__ = __webpack_require__(0);



var BIDDER_CODE = 'trendqube';
var AD_URL = 'https://ads.trendqube.com/?c=o&m=multi';

function isBidResponseValid(bid) {
  if (!bid.requestId || !bid.cpm || !bid.creativeId || !bid.ttl || !bid.currency) {
    return false;
  }

  switch (bid.mediaType) {
    case __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */]:
      return Boolean(bid.width && bid.height && bid.ad);

    case __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */]:
      return Boolean(bid.vastUrl);

    case __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["c" /* NATIVE */]:
      return Boolean(bid.native && bid.native.title && bid.native.image && bid.native.impressionTrackers);

    default:
      return false;
  }
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["c" /* NATIVE */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return Boolean(bid.bidId && bid.params && !isNaN(parseInt(bid.params.placementId)));
  },
  buildRequests: function buildRequests() {
    var validBidRequests = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var bidderRequest = arguments.length > 1 ? arguments[1] : undefined;
    var winTop = window;
    var location;

    try {
      location = new URL(bidderRequest.refererInfo.referer);
      winTop = window.top;
    } catch (e) {
      location = winTop.location;
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logMessage"](e);
    }

    ;
    var placements = [];
    var request = {
      'deviceWidth': winTop.screen.width,
      'deviceHeight': winTop.screen.height,
      'language': navigator && navigator.language ? navigator.language.split('-')[0] : '',
      'secure': 1,
      'host': location.host,
      'page': location.pathname,
      'placements': placements
    };

    if (bidderRequest) {
      if (bidderRequest.uspConsent) {
        request.ccpa = bidderRequest.uspConsent;
      }

      if (bidderRequest.gdprConsent) {
        request.gdpr = bidderRequest.gdprConsent;
      }
    }

    var len = validBidRequests.length;

    for (var i = 0; i < len; i++) {
      var bid = validBidRequests[i];
      var sizes = void 0;

      if (bid.mediaTypes) {
        if (bid.mediaTypes[__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */]] && bid.mediaTypes[__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */]].sizes) {
          sizes = bid.mediaTypes[__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */]].sizes;
        } else if (bid.mediaTypes[__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */]] && bid.mediaTypes[__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */]].playerSize) {
          sizes = bid.mediaTypes[__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */]].playerSize;
        }
      }

      placements.push({
        placementId: bid.params.placementId,
        bidId: bid.bidId,
        sizes: sizes || [],
        wPlayer: sizes ? sizes[0] : 0,
        hPlayer: sizes ? sizes[1] : 0,
        traffic: bid.params.traffic || __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */],
        schain: bid.schain || {}
      });
    }

    return {
      method: 'POST',
      url: AD_URL,
      data: request
    };
  },
  interpretResponse: function interpretResponse(serverResponse) {
    var response = [];

    for (var i = 0; i < serverResponse.body.length; i++) {
      var resItem = serverResponse.body[i];

      if (isBidResponseValid(resItem)) {
        response.push(resItem);
      }
    }

    return response;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[748]);