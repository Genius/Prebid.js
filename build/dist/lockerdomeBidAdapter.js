pbjsChunk([124],{

/***/ 329:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(330);


/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__ = __webpack_require__(1);



var spec = {
  code: 'lockerdome',
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.adUnitId;
  },
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var schain;
    var adUnitBidRequests = bidRequests.map(function (bid) {
      if (bid.schain) schain = schain || bid.schain;
      return {
        requestId: bid.bidId,
        adUnitCode: bid.adUnitCode,
        adUnitId: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('adUnitId', bid.params),
        sizes: bid.mediaTypes && bid.mediaTypes.banner && bid.mediaTypes.banner.sizes
      };
    });
    var bidderRequestCanonicalUrl = bidderRequest && bidderRequest.refererInfo && bidderRequest.refererInfo.canonicalUrl || '';
    var bidderRequestReferer = bidderRequest && bidderRequest.refererInfo && bidderRequest.refererInfo.referer || '';
    var payload = {
      bidRequests: adUnitBidRequests,
      url: encodeURIComponent(bidderRequestCanonicalUrl),
      referrer: encodeURIComponent(bidderRequestReferer)
    };

    if (schain) {
      payload.schain = schain;
    }

    if (bidderRequest) {
      if (bidderRequest.gdprConsent) {
        payload.gdpr = {
          applies: bidderRequest.gdprConsent.gdprApplies,
          consent: bidderRequest.gdprConsent.consentString
        };
      }

      if (bidderRequest.uspConsent) {
        payload.us_privacy = {
          consent: bidderRequest.uspConsent
        };
      }
    }

    var payloadString = JSON.stringify(payload);
    return {
      method: 'POST',
      url: 'https://lockerdome.com/ladbid/prebid',
      data: payloadString
    };
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    if (!serverResponse || !serverResponse.body || !serverResponse.body.bids) {
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
        netRevenue: bid.netRevenue,
        ad: bid.ad,
        ttl: bid.ttl
      };
    });
  }
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[329]);