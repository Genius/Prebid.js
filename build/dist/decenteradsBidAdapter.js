pbjsChunk([207],{

/***/ 280:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(281);


/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils__ = __webpack_require__(0);



var BIDDER_CODE = 'decenterads';
var URL = '//supply.decenterads.com/?c=o&m=multi';
var URL_SYNC = '//supply.decenterads.com/?c=o&m=cookie';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["c" /* NATIVE */]],
  isBidRequestValid: function isBidRequestValid(opts) {
    return Boolean(opts.bidId && opts.params && !isNaN(opts.params.placementId));
  },
  buildRequests: function buildRequests(validBidRequests) {
    validBidRequests = validBidRequests || [];
    var winTop = window;

    try {
      window.top.location.toString();
      winTop = window.top;
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils__["logMessage"](e);
    }

    var location = __WEBPACK_IMPORTED_MODULE_2__src_utils__["getTopWindowLocation"]();
    var placements = [];

    for (var i = 0; i < validBidRequests.length; i++) {
      var p = validBidRequests[i];
      placements.push({
        placementId: p.params.placementId,
        bidId: p.bidId,
        traffic: p.params.traffic || __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */]
      });
    }

    return {
      method: 'POST',
      url: URL,
      data: {
        deviceWidth: winTop.screen.width,
        deviceHeight: winTop.screen.height,
        language: navigator && navigator.language ? navigator.language : '',
        secure: +(location.protocol === 'https:'),
        host: location.host,
        page: location.pathname,
        placements: placements
      }
    };
  },
  interpretResponse: function interpretResponse(opts) {
    var body = opts.body;
    var response = [];

    for (var i = 0; i < body.length; i++) {
      var item = body[i];

      if (isBidResponseValid(item)) {
        delete item.mediaType;
        response.push(item);
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

/***/ })

},[280]);