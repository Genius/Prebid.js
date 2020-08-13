pbjsChunk([224],{

/***/ 400:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(401);


/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__ = __webpack_require__(2);




var BIDDER_CODE = 'etarget';
var countryMap = {
  1: 'sk',
  2: 'cz',
  3: 'hu',
  4: 'ro',
  5: 'rs',
  6: 'bg',
  7: 'pl',
  8: 'hr',
  9: 'at',
  10: 'co',
  11: 'de',
  255: 'en'
};
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params.refid && bid.params.country);
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var i, l, bid, reqParams, netRevenue, gdprObject;
    var request = [];
    var bids = JSON.parse(JSON.stringify(validBidRequests));
    var lastCountry = 'sk';

    for (i = 0, l = bids.length; i < l; i++) {
      bid = bids[i];

      if (countryMap[bid.params.country]) {
        lastCountry = countryMap[bid.params.country];
      }

      reqParams = bid.params;
      reqParams.transactionId = bid.transactionId;
      request.push(formRequestUrl(reqParams));
    }

    request.unshift('https://' + lastCountry + '.search.etargetnet.com/hb/?hbget=1');
    netRevenue = 'net';

    if (bidderRequest && bidderRequest.gdprConsent && bidderRequest.gdprConsent.gdprApplies) {
      gdprObject = {
        gdpr: bidderRequest.gdprConsent.gdprApplies,
        gdpr_consent: bidderRequest.gdprConsent.consentString
      };
      request.push('gdpr=' + gdprObject.gdpr);
      request.push('gdpr_consent=' + gdprObject.gdpr_consent);
    }

    return {
      method: 'POST',
      url: request.join('&'),
      data: bidderRequest,
      bids: validBidRequests,
      netRevenue: netRevenue,
      bidder: 'etarget',
      gdpr: gdprObject
    };

    function formRequestUrl(reqData) {
      var key;
      var url = [];

      for (key in reqData) {
        if (reqData.hasOwnProperty(key) && reqData[key]) {
          url.push(key, '=', reqData[key], '&');
        }
      }

      return encodeURIComponent(btoa(url.join('').slice(0, -1)));
    }
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var VALID_RESPONSES = {
      banner: 1,
      video: 1
    };
    var bidObject, bid, type;
    var bidRespones = [];
    var bids = bidRequest.bids;
    var responses = serverResponse.body;
    var data = [];

    for (var i = 0; i < responses.length; i++) {
      data = responses[i];
      type = data.response === 'banner' ? __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */] : __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */];
      bid = bids[i];

      if (VALID_RESPONSES[data.response] && (verifySize(data, bid.sizes) || type === __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */])) {
        bidObject = {
          requestId: bid.bidId,
          cpm: data.win_bid ? data.win_bid : 0,
          width: data.width,
          height: data.height,
          creativeId: data.creativeId,
          currency: data.win_cur,
          netRevenue: true,
          ttl: 360,
          ad: data.banner,
          vastXml: data.vast_content,
          vastUrl: data.vast_link,
          mediaType: data.response,
          transactionId: bid.transactionId
        };

        if (bidRequest.gdpr) {
          bidObject.gdpr = bidRequest.gdpr.gdpr;
          bidObject.gdpr_consent = bidRequest.gdpr.gdpr_consent;
        }

        bidRespones.push(bidObject);
      }
    }

    return bidRespones;

    function verifySize(adItem, validSizes) {
      for (var j = 0, k = validSizes.length; j < k; j++) {
        if (adItem.width == validSizes[j][0] && adItem.height == validSizes[j][1]) {
          return true;
        }
      }

      return false;
    }
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[400]);