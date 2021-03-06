pbjsChunk([144],{

/***/ 425:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(426);


/***/ }),

/***/ 426:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_url__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory__ = __webpack_require__(1);




var BIDDER_CODE = 'mytarget';
var BIDDER_URL = '//ad.mail.ru/hbid_prebid/';
var DEFAULT_CURRENCY = 'RUB';
var DEFAULT_TTL = 180;

function buildPlacement(bidRequest) {
  var bidId = bidRequest.bidId,
      params = bidRequest.params;
  var placementId = params.placementId,
      position = params.position,
      response = params.response,
      bidfloor = params.bidfloor;
  var placement = {
    placementId: placementId,
    id: bidId,
    position: position || 0,
    response: response || 0
  };

  if (typeof bidfloor !== 'undefined') {
    placement.bidfloor = bidfloor;
  }

  return placement;
}

function getSiteName(referrer) {
  var sitename = __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('mytarget.sitename');

  if (!sitename) {
    sitename = __WEBPACK_IMPORTED_MODULE_1__src_url__["c" /* parse */](referrer).hostname;
  }

  return sitename;
}

function getCurrency() {
  var currency = __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('currency.adServerCurrency');
  return currency === 'USD' ? currency : DEFAULT_CURRENCY;
}

function generateRandomId() {
  return Math.random().toString(16).substring(2);
}

var spec = {
  code: BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.placementId;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var referrer = '';

    if (bidderRequest && bidderRequest.refererInfo) {
      referrer = bidderRequest.refererInfo.referer;
    }

    var payload = {
      places: __WEBPACK_IMPORTED_MODULE_0__src_utils__["_map"](validBidRequests, buildPlacement),
      site: {
        sitename: getSiteName(referrer),
        page: referrer
      },
      settings: {
        currency: getCurrency(),
        windowSize: {
          width: window.screen.width,
          height: window.screen.height
        }
      }
    };
    return {
      method: 'POST',
      url: BIDDER_URL,
      data: payload
    };
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var body = serverResponse.body;

    if (body.bids) {
      return __WEBPACK_IMPORTED_MODULE_0__src_utils__["_map"](body.bids, function (bid) {
        var bidResponse = {
          requestId: bid.id,
          cpm: bid.price,
          width: bid.size.width,
          height: bid.size.height,
          ttl: bid.ttl || DEFAULT_TTL,
          currency: bid.currency || DEFAULT_CURRENCY,
          creativeId: bid.creativeId || generateRandomId(),
          netRevenue: true
        };

        if (bid.adm) {
          bidResponse.ad = bid.adm;
        } else {
          bidResponse.adUrl = bid.displayUrl;
        }

        return bidResponse;
      });
    }

    return [];
  }
};
Object(__WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[425]);