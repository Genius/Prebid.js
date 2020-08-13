pbjsChunk([231],{

/***/ 384:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(385);


/***/ }),

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils_js__ = __webpack_require__(0);



var BIDDER_CODE = 'e_volution';
var AD_URL = 'https://service.e-volution.ai/?c=o&m=multi';
var URL_SYNC = 'https://service.e-volution.ai/?c=o&m=sync';
var NO_SYNC = true;

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
  noSync: NO_SYNC,
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
      var traff = bid.params.traffic || __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */];
      placements.push({
        placementId: bid.params.placementId,
        bidId: bid.bidId,
        sizes: bid.mediaTypes && bid.mediaTypes[traff] && bid.mediaTypes[traff].sizes ? bid.mediaTypes[traff].sizes : [],
        traffic: traff
      });

      if (bid.schain) {
        placements.schain = bid.schain;
      }
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
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    if (NO_SYNC) {
      return false;
    } else {
      return [{
        type: 'image',
        url: URL_SYNC
      }];
    }
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[384]);