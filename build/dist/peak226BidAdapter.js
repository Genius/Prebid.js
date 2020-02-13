pbjsChunk([122],{

/***/ 471:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(472);


/***/ }),

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils__ = __webpack_require__(0);



var BIDDER_CODE = 'peak226';
var URL = '//a.ad216.com/header_bid';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    var params = bid.params;
    return !!params.uid;
  },
  buildRequests: function buildRequests(validBidRequests) {
    var bidsMap = validBidRequests.reduce(function (res, bid) {
      var uid = bid.params.uid;
      res[uid] = res[uid] || [];
      res[uid].push(bid);
      return res;
    }, {});
    return {
      method: 'GET',
      url: URL + toQueryString({
        u: Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["getTopWindowUrl"])(),
        auids: Object.keys(bidsMap).join(',')
      }),
      bidsMap: bidsMap
    };
  },
  interpretResponse: function interpretResponse(serverResponse, _ref) {
    var bidsMap = _ref.bidsMap;
    var response = serverResponse.body;
    var bidResponses = [];

    if (!response) {
      Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["logWarn"])("No response from ".concat(spec.code, " bidder"));
      return bidResponses;
    }

    if (!response.seatbid || !response.seatbid.length) {
      Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["logWarn"])("No seatbid in response from ".concat(spec.code, " bidder"));
      return bidResponses;
    }

    response.seatbid.forEach(function (seatbid, i) {
      if (!seatbid.bid || !seatbid.bid.length) {
        Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["logWarn"])("No bid in seatbid[".concat(i, "] response from ").concat(spec.code, " bidder"));
        return;
      }

      seatbid.bid.forEach(function (responseBid) {
        var requestBids = bidsMap[responseBid.auid];
        requestBids.forEach(function (requestBid) {
          bidResponses.push({
            requestId: requestBid.bidId,
            bidderCode: spec.code,
            width: responseBid.w,
            height: responseBid.h,
            mediaType: __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */],
            creativeId: responseBid.auid,
            ad: responseBid.adm,
            cpm: responseBid.price,
            currency: 'USD',
            netRevenue: true,
            ttl: 360
          });
        });
      });
    });
    return bidResponses;
  }
};

function toQueryString(obj) {
  return Object.keys(obj).reduce(function (str, key, i) {
    return typeof obj[key] === 'undefined' || obj[key] === '' ? str : "".concat(str).concat(str ? '&' : '?').concat(key, "=").concat(encodeURIComponent(obj[key]));
  }, '');
}

Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[471]);