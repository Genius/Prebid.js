pbjsChunk([98],{

/***/ 385:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(386);


/***/ }),

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);


var spec = {
  code: 'otm',
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_0__src_mediaTypes__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.tid;
  },
  buildRequests: function buildRequests(bidRequests) {
    var requests = bidRequests.map(function (bid) {
      var size = getMaxPrioritySize(bid.sizes);
      var params = {
        tz: getTz(),
        w: size[0],
        h: size[1],
        s: bid.params.tid,
        bidid: bid.bidId,
        transactionid: bid.transactionId,
        auctionid: bid.auctionId,
        bidfloor: bid.params.bidfloor
      };
      return {
        method: 'GET',
        url: 'https://ssp.otm-r.com/adjson',
        data: params
      };
    });
    return requests;
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    if (!serverResponse || !serverResponse.body) {
      return [];
    }

    var answer = [];
    serverResponse.body.forEach(function (bid) {
      if (bid.ad) {
        answer.push({
          requestId: bid.bidid,
          cpm: bid.cpm,
          width: bid.w,
          height: bid.h,
          creativeId: bid.creativeid,
          currency: bid.currency || 'RUB',
          netRevenue: true,
          ad: bid.ad,
          ttl: bid.ttl,
          transactionId: bid.transactionid
        });
      }
    });
    return answer;
  }
};

function getTz() {
  return new Date().getTimezoneOffset();
}

function getMaxPrioritySize(sizes) {
  var maxPrioritySize = null;
  var sizesByPriority = [[300, 250], [240, 400], [728, 90], [300, 600], [970, 250], [300, 50], [320, 100]];

  var sizeToString = function sizeToString(size) {
    return size[0] + 'x' + size[1];
  };

  var sizesAsString = sizes.map(sizeToString);
  sizesByPriority.forEach(function (size) {
    if (!maxPrioritySize) {
      if (sizesAsString.indexOf(sizeToString(size)) !== -1) {
        maxPrioritySize = size;
      }
    }
  });

  if (maxPrioritySize) {
    return maxPrioritySize;
  } else {
    return sizes[0];
  }
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[385]);