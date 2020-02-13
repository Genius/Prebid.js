pbjsChunk([86],{

/***/ 570:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(571);


/***/ }),

/***/ 571:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils__ = __webpack_require__(0);



var BIDDER_CODE = 'smartyads';
var URL = '//ssp-nj.webtradehub.com/?c=o&m=multi';
var URL_SYNC = '//ssp-nj.webtradehub.com/?c=o&m=cookie';

function isBidResponseValid(bid) {
  if (!bid.requestId || !bid.cpm || !bid.creativeId || !bid.ttl || !bid.currency) {
    return false;
  }

  switch (bid['mediaType']) {
    case __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */]:
      return Boolean(bid.width && bid.height && bid.ad);

    case __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["d" /* VIDEO */]:
      return Boolean(bid.vastUrl);

    case __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["c" /* NATIVE */]:
      return Boolean(bid.title && bid.image && bid.impressionTrackers);

    default:
      return false;
  }
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["c" /* NATIVE */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return Boolean(bid.bidId && bid.params && !isNaN(bid.params.placementId));
  },
  buildRequests: function buildRequests() {
    var validBidRequests = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var winTop = window;

    try {
      window.top.location.toString();
      winTop = window.top;
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils__["logMessage"](e);
    }

    var location = __WEBPACK_IMPORTED_MODULE_2__src_utils__["getTopWindowLocation"]();
    var placements = [];
    var request = {
      'deviceWidth': winTop.screen.width,
      'deviceHeight': winTop.screen.height,
      'language': navigator && navigator.language ? navigator.language : '',
      'secure': location.protocol === 'https:' ? 1 : 0,
      'host': location.host,
      'page': location.pathname,
      'placements': placements
    };
    var len = validBidRequests.length;

    for (var i = 0; i < len; i++) {
      var bid = validBidRequests[i];
      placements.push({
        placementId: bid.params.placementId,
        bidId: bid.bidId,
        traffic: bid.params.traffic || __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */]
      });
    }

    return {
      method: 'POST',
      url: URL,
      data: request
    };
  },
  interpretResponse: function interpretResponse(serverResponse) {
    var response = [];
    serverResponse = serverResponse.body;

    for (var i = 0; i < serverResponse.length; i++) {
      var resItem = serverResponse[i];

      if (isBidResponseValid(resItem)) {
        delete resItem.mediaType;
        response.push(resItem);
      }
    }

    return response;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    return [{
      type: 'image',
      url: URL_SYNC
    }];
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[570]);