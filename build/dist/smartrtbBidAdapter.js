pbjsChunk([102],{

/***/ 700:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(701);


/***/ }),

/***/ 701:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__ = __webpack_require__(1);



var BIDDER_CODE = 'smartrtb';

function getDomain() {
  if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["inIframe"]()) {
    return window.location.hostname;
  }

  var origins = window.document.location.ancestorOrigins;

  if (origins && origins.length > 0) {
    return origins[origins.length - 1];
  }
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: ['banner', 'video'],
  aliases: ['smrtb'],
  isBidRequestValid: function isBidRequestValid(bid) {
    return bid.params.pubId !== null && bid.params.medId !== null && bid.params.zoneId !== null;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var stack = bidderRequest.refererInfo && bidderRequest.refererInfo.stack ? bidderRequest.refererInfo : [];
    var spb = __WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('userSync') && __WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('userSync').syncsPerBidder ? __WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('userSync').syncsPerBidder : 5;
    var payload = {
      start_time: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["timestamp"](),
      language: window.navigator.userLanguage || window.navigator.language,
      site: {
        domain: getDomain(),
        iframe: !bidderRequest.refererInfo.reachedTop,
        url: stack && stack.length > 0 ? [stack.length - 1] : null,
        https: window.location.protocol === 'https:',
        referrer: bidderRequest.refererInfo.referer
      },
      imps: [],
      user_ids: validBidRequests[0].userId,
      sync_limit: spb
    };

    if (bidderRequest && bidderRequest.gdprConsent) {
      payload.gdpr = {
        applies: bidderRequest.gdprConsent.gdprApplies,
        consent: bidderRequest.gdprConsent.consentString
      };
    }

    for (var x = 0; x < validBidRequests.length; x++) {
      var req = validBidRequests[x];
      payload.imps.push({
        zone_id: req.params.zoneId,
        bid_id: req.bidId,
        imp_id: req.transactionId,
        sizes: req.sizes,
        force_bid: req.params.forceBid,
        media_types: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](req, 'mediaTypes'),
        has_renderer: req.renderer !== undefined
      });
    }

    var params = validBidRequests[0].params;
    var url = params.endpoint ? params.endpoint : 'https://market-global.smrtb.com/json/publisher/prebid';
    return {
      method: 'POST',
      url: url,
      data: JSON.stringify(payload)
    };
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = [];

    if (!serverResponse || !serverResponse.body) {
      return bidResponses;
    }

    var res = serverResponse.body;

    if (!res.bids || !res.bids.length) {
      return [];
    }

    for (var x = 0; x < serverResponse.body.bids.length; x++) {
      var bid = serverResponse.body.bids[x];
      bidResponses.push({
        requestId: bid.bid_id,
        cpm: bid.cpm,
        width: bid.w,
        height: bid.h,
        ad: bid.html,
        vastUrl: bid.vast_url,
        vastXml: bid.vast_xml,
        mediaType: bid.html ? 'banner' : 'video',
        ttl: 120,
        creativeId: bid.crid,
        dealId: bid.deal_id,
        netRevenue: true,
        currency: 'USD'
      });
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    var syncs = [];

    if (!serverResponses.length || !serverResponses[0].body) {
      return syncs;
    }

    var pixels = serverResponses[0].body.pixels;

    if (!pixels || !pixels.length) {
      return syncs;
    }

    for (var x = 0; x < pixels.length; x++) {
      var pixel = pixels[x];

      if (pixel.type === 'iframe' && syncOptions.iframeEnabled || pixel.type === 'image' && syncOptions.pixelEnabled) {
        syncs.push(pixel);
      }
    }

    return syncs;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[700]);