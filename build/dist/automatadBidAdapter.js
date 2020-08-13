pbjsChunk([276],{

/***/ 279:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(280);


/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_ajax_js__ = __webpack_require__(4);




var BIDDER = 'automatad';
var ENDPOINT_URL = 'https://rtb2.automatad.com/ortb2';
var DEFAULT_BID_TTL = 30;
var DEFAULT_CURRENCY = 'USD';
var DEFAULT_NET_REVENUE = true;
var spec = {
  code: BIDDER,
  aliases: ['atd'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    // will receive request bid. check if have necessary params for bidding
    return bid && bid.hasOwnProperty('params') && bid.params.hasOwnProperty('siteId') && bid.params.hasOwnProperty('placementId') && bid.hasOwnProperty('mediaTypes') && bid.mediaTypes.hasOwnProperty('banner');
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    if (!validBidRequests || !bidderRequest) {
      return;
    }

    var siteId = validBidRequests[0].params.siteId;
    var placementId = validBidRequests[0].params.placementId;
    var impressions = validBidRequests.map(function (bidRequest) {
      return {
        id: bidRequest.bidId,
        banner: {
          format: bidRequest.sizes.map(function (sizeArr) {
            return {
              w: sizeArr[0],
              h: sizeArr[1]
            };
          })
        }
      };
    }); // params from bid request

    var openrtbRequest = {
      id: validBidRequests[0].auctionId,
      imp: impressions,
      site: {
        id: siteId,
        placement: placementId,
        domain: window.location.hostname,
        page: window.location.href,
        ref: bidderRequest.refererInfo ? bidderRequest.refererInfo.referer || null : null
      }
    };
    var payloadString = JSON.stringify(openrtbRequest);
    return {
      method: 'POST',
      url: ENDPOINT_URL + '/resp',
      data: payloadString,
      options: {
        contentType: 'application/json',
        withCredentials: false,
        crossOrigin: true
      }
    };
  },
  interpretResponse: function interpretResponse(serverResponse, request) {
    var bidResponses = [];
    var response = (serverResponse || {}).body;

    if (response && response.seatbid && response.seatbid.length === 1 && response.seatbid[0].bid && response.seatbid[0].bid.length) {
      response.seatbid[0].bid.forEach(function (bid) {
        bidResponses.push({
          requestId: bid.impid,
          cpm: bid.price,
          ad: bid.adm,
          adDomain: bid.adomain[0],
          currency: DEFAULT_CURRENCY,
          ttl: DEFAULT_BID_TTL,
          creativeId: bid.crid,
          width: bid.w,
          height: bid.h,
          netRevenue: DEFAULT_NET_REVENUE,
          nurl: bid.nurl
        });
      });
    } else {
      __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logInfo"]('automatad :: no valid responses to interpret');
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponse) {
    return [{
      type: 'iframe',
      url: 'https://rtb2.automatad.com/ortb2/async_usersync'
    }];
  },
  onBidWon: function onBidWon(bid) {
    if (!bid.nurl) {
      return;
    }

    var winCpm = bid.hasOwnProperty('originalCpm') ? bid.originalCpm : bid.cpm;
    var winCurr = bid.hasOwnProperty('originalCurrency') && bid.hasOwnProperty('originalCpm') ? bid.originalCurrency : bid.currency;
    var winUrl = bid.nurl.replace(/\$\{AUCTION_PRICE\}/, winCpm).replace(/\$\{AUCTION_IMP_ID\}/, bid.requestId).replace(/\$\{AUCTION_CURRENCY\}/, winCurr).replace(/\$\{AUCTION_ID\}/, bid.auctionId);
    spec.ajaxCall(winUrl, null);
    return true;
  },
  ajaxCall: function ajaxCall(endpoint, data) {
    Object(__WEBPACK_IMPORTED_MODULE_3__src_ajax_js__["a" /* ajax */])(endpoint, data);
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[279]);