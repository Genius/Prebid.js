pbjsChunk([137],{

/***/ 439:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(440);


/***/ }),

/***/ 440:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config__ = __webpack_require__(3);



var BIDDER_CODE = 'oneplanetonly';
var EDNPOINT = '//show.oneplanetonly.com/prebid';

function createEndpoint(siteId) {
  return "".concat(EDNPOINT, "?siteId=").concat(siteId);
}

function isBidRequestValid(bid) {
  return !!(bid.params.siteId && bid.params.adUnitId);
}

function buildRequests(bidReqs) {
  var firstBid = bidReqs[0] || {};
  var siteId = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('siteId', firstBid.params);
  var adUnits = bidReqs.map(function (bid) {
    return {
      id: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('adUnitId', bid.params),
      bidId: bid.bidId,
      sizes: __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](bid.sizes)
    };
  });
  var bidRequest = {
    id: firstBid.auctionId,
    ver: 1,
    prebidVer: "2.37.0",
    transactionId: firstBid.transactionId,
    currency: __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('currency.adServerCurrency'),
    timeout: __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('bidderTimeout'),
    siteId: siteId,
    domain: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowLocation"]().hostname,
    page: __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('pageUrl') || __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"](),
    referrer: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowReferrer"](),
    adUnits: adUnits
  };
  return {
    method: 'POST',
    url: createEndpoint(siteId),
    data: bidRequest,
    options: {
      contentType: 'application/json',
      withCredentials: true
    }
  };
}

function interpretResponse(serverResponse, request) {
  if (!serverResponse.body.bids) {
    return [];
  }

  return serverResponse.body.bids.map(function (bid) {
    return {
      requestId: bid.requestId,
      cpm: bid.cpm,
      width: bid.width,
      height: bid.height,
      creativeId: bid.creativeId,
      currency: bid.currency,
      netRevenue: true,
      ad: bid.ad,
      ttl: bid.ttl
    };
  });
}

var spec = {
  code: BIDDER_CODE,
  aliases: ['opo'],
  // short code
  isBidRequestValid: isBidRequestValid,
  buildRequests: buildRequests,
  interpretResponse: interpretResponse
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[439]);