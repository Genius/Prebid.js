pbjsChunk([53],{

/***/ 648:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(649);


/***/ }),

/***/ 649:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);


var utils = __webpack_require__(0);

var BIDDER_CODE = 'videoreach';
var ENDPOINT_URL = '//a.videoreach.com/hb/';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: ['banner'],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.TagId;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var data = {
      referrer: utils.getTopWindowUrl(),
      data: validBidRequests.map(function (bid) {
        return {
          TagId: utils.getValue(bid.params, 'TagId'),
          bidId: utils.getBidIdParameter('bidId', bid),
          bidderRequestId: utils.getBidIdParameter('bidderRequestId', bid),
          auctionId: utils.getBidIdParameter('auctionId', bid),
          transactionId: utils.getBidIdParameter('transactionId', bid)
        };
      })
    };

    if (bidderRequest && bidderRequest.gdprConsent) {
      data.gdpr = {
        consent_string: bidderRequest.gdprConsent.consentString,
        consent_required: bidderRequest.gdprConsent.gdprApplies
      };
    }

    return {
      method: 'POST',
      url: ENDPOINT_URL,
      data: JSON.stringify(data)
    };
  },
  interpretResponse: function interpretResponse(serverResponse) {
    var bidResponses = [];
    serverResponse = serverResponse.body;

    if (serverResponse.responses) {
      serverResponse.responses.forEach(function (bid) {
        var bidResponse = {
          cpm: bid.cpm,
          width: bid.width,
          height: bid.height,
          currency: bid.currency,
          netRevenue: true,
          ttl: bid.ttl,
          ad: bid.ad,
          requestId: bid.bidId,
          creativeId: bid.creativeId
        };
        bidResponses.push(bidResponse);
      });
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions, responses, gdprConsent) {
    var syncs = [];

    if (syncOptions.pixelEnabled && responses.length && responses[0].body.responses.length) {
      var SyncPixels = responses[0].body.responses[0].sync;
      var params = '';

      if (gdprConsent && typeof gdprConsent.consentString === 'string') {
        if (typeof gdprConsent.gdprApplies === 'boolean') {
          params += 'gdpr=' + gdprConsent.gdprApplies + '&gdpr_consent=' + gdprConsent.consentString;
        } else {
          params += 'gdpr_consent=' + gdprConsent.consentString;
        }
      }

      var gdpr;

      if (SyncPixels) {
        SyncPixels.forEach(function (sync) {
          gdpr = params ? (sync.split('?')[1] ? '&' : '?') + params : '';
          syncs.push({
            type: 'image',
            url: sync + gdpr
          });
        });
      }
    }

    return syncs;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[648]);