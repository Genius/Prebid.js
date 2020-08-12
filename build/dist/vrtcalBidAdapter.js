pbjsChunk([37],{

/***/ 536:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(537);


/***/ }),

/***/ 537:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_ajax__ = __webpack_require__(4);



var spec = {
  code: 'vrtcal',
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    if (bid.bidId == '' || bid.auctionId == '') {
      return false;
    } else {
      return true;
    } // No extras params required

  },
  buildRequests: function buildRequests(bidRequests) {
    var requests = bidRequests.map(function (bid) {
      var params = {
        prebidJS: 1,
        prebidAdUnitCode: bid.adUnitCode,
        id: bid.bidId,
        imp: [{
          id: '1',
          banner: {},
          bidfloor: 0.75
        }],
        site: {
          id: 'VRTCAL_FILLED',
          name: 'VRTCAL_FILLED',
          cat: ['VRTCAL_FILLED'],
          domain: decodeURIComponent(window.location.href).replace('https://', '').replace('http://', '').split('/')[0]
        },
        device: {
          ua: 'VRTCAL_FILLED',
          ip: 'VRTCAL_FILLED'
        }
      };

      if (typeof bid.mediaTypes !== 'undefined' && typeof bid.mediaTypes.banner !== 'undefined' && typeof bid.mediaTypes.banner.sizes !== 'undefined') {
        params.imp[0].banner.w = bid.mediaTypes.banner.sizes[0][0];
        params.imp[0].banner.h = bid.mediaTypes.banner.sizes[0][1];
      } else {
        params.imp[0].banner.w = bid.sizes[0][0];
        params.imp[0].banner.h = bid.sizes[0][1];
      }

      return {
        method: 'POST',
        url: 'https://rtb.vrtcal.com/bidder_prebid.vap?ssp=1804',
        data: JSON.stringify(params),
        options: {
          withCredentials: false,
          crossOrigin: true
        }
      };
    });
    return requests;
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    if (!serverResponse || !serverResponse.body) {
      return [];
    }

    var bidResponses = [];
    var response = serverResponse.body;

    if (response) {
      var bidResponse = {
        requestId: response.id,
        cpm: response.seatbid[0].bid[0].price,
        width: response.seatbid[0].bid[0].w,
        height: response.seatbid[0].bid[0].h,
        creativeId: response.seatbid[0].bid[0].crid,
        currency: 'USD',
        netRevenue: true,
        ttl: 900,
        ad: response.seatbid[0].bid[0].adm,
        nurl: response.seatbid[0].bid[0].nurl
      };
      bidResponses.push(bidResponse);
    }

    return bidResponses;
  },
  onBidWon: function onBidWon(bid) {
    if (!bid.nurl) {
      return false;
    }

    var winUrl = bid.nurl.replace(/\$\{AUCTION_PRICE\}/, bid.cpm);
    Object(__WEBPACK_IMPORTED_MODULE_2__src_ajax__["a" /* ajax */])(winUrl, null);
    return true;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[536]);