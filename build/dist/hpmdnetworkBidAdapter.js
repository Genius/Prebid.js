pbjsChunk([179],{

/***/ 342:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(343);


/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__ = __webpack_require__(2);


var BIDDER_CODE = 'hpmdnetwork';
var BIDDER_CODE_ALIAS = 'hpmd';
var HPMDNETWORK_HOST = '//banner.hpmdnetwork.ru/bidder/request';
var DEFAULT_TTL = 300;
var DEFAULT_CURRENCY = 'RUB';
var spec = {
  code: BIDDER_CODE,
  aliases: [BIDDER_CODE_ALIAS],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */]],
  isBidRequestValid: isBidRequestValid,
  buildRequests: buildRequests,
  interpretResponse: interpretResponse
};

function isBidRequestValid(bid) {
  var placementId = bid.params.placementId;
  return !!placementId;
}

function buildRequests(validBidRequests, bidderRequest) {
  var payload = {};
  payload.places = [];
  validBidRequests.forEach(function (bidRequest) {
    var place = {
      id: bidRequest.bidId,
      placementId: bidRequest.params.placementId + ''
    };
    payload.places.push(place);
  });
  payload.url = bidderRequest.refererInfo.referer;
  payload.settings = {
    currency: DEFAULT_CURRENCY
  };
  return {
    method: 'POST',
    url: HPMDNETWORK_HOST,
    data: payload
  };
}

function interpretResponse(serverResponse) {
  var body = serverResponse.body;
  var bidResponses = [];

  if (body.bids) {
    body.bids.forEach(function (bid) {
      var size = getCreativeSize(bid);
      var bidResponse = {
        requestId: bid.id,
        cpm: bid.cpm,
        ad: wrapDisplayUrl(bid.displayUrl),
        width: size.width,
        height: size.height,
        creativeId: bid.creativeId || generateRandomInt(),
        currency: bid.currency || DEFAULT_CURRENCY,
        netRevenue: true,
        ttl: bid.ttl || DEFAULT_TTL
      };
      bidResponses.push(bidResponse);
    });
  }

  return bidResponses;
}

function wrapDisplayUrl(displayUrl) {
  return "<html><head></head><body style=\"margin:0;width:0;height:0;\"><script async src=\"".concat(displayUrl, "\"></script></body></html>");
}

function getCreativeSize(creativeSize) {
  var size = {
    width: 1,
    height: 1
  };

  if (!!creativeSize.width && creativeSize.width !== -1) {
    size.width = creativeSize.width;
  }

  if (!!creativeSize.height && creativeSize.height !== -1) {
    size.height = creativeSize.height;
  }

  return size;
}

function generateRandomInt() {
  return Math.random().toString(16).substring(2);
}

Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[342]);