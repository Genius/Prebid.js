pbjsChunk([204],{

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(125);


/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["resetUserSync"] = resetUserSync;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);


var BIDDER_CODE = 'aardvark';
var DEFAULT_ENDPOINT = 'bidder.rtk.io';
var SYNC_ENDPOINT = 'sync.rtk.io';
var AARDVARK_TTL = 300;
var AARDVARK_CURRENCY = 'USD';
var hasSynced = false;
function resetUserSync() {
  hasSynced = false;
}
var spec = {
  code: BIDDER_CODE,
  aliases: ['adsparc', 'safereach'],
  isBidRequestValid: function isBidRequestValid(bid) {
    return typeof bid.params.ai === 'string' && !!bid.params.ai.length && typeof bid.params.sc === 'string' && !!bid.params.sc.length;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var auctionCodes = [];
    var requests = [];
    var requestsMap = {};
    var referer = bidderRequest.refererInfo.referer;
    var pageCategories = [];
    var tdId = '';
    var width = window.innerWidth;
    var height = window.innerHeight; // This reference to window.top can cause issues when loaded in an iframe if not protected with a try/catch.

    try {
      var topWin = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getWindowTop"]();

      if (topWin.rtkcategories && Array.isArray(topWin.rtkcategories)) {
        pageCategories = topWin.rtkcategories;
      }

      width = topWin.innerWidth;
      height = topWin.innerHeight;
    } catch (e) {}

    if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["isStr"](__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](validBidRequests, '0.userId.tdid'))) {
      tdId = validBidRequests[0].userId.tdid;
    }

    __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](validBidRequests, function (b) {
      var rMap = requestsMap[b.params.ai];

      if (!rMap) {
        rMap = {
          shortCodes: [],
          payload: {
            version: 1,
            jsonp: false,
            rtkreferer: referer,
            w: width,
            h: height
          },
          endpoint: DEFAULT_ENDPOINT
        };

        if (tdId) {
          rMap.payload.tdid = tdId;
        }

        if (pageCategories && pageCategories.length) {
          rMap.payload.categories = pageCategories.slice(0);
        }

        if (b.params.categories && b.params.categories.length) {
          rMap.payload.categories = rMap.payload.categories || [];

          __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](b.params.categories, function (cat) {
            rMap.payload.categories.push(cat);
          });
        }

        if (bidderRequest && bidderRequest.gdprConsent) {
          rMap.payload.gdpr = false;

          if (typeof bidderRequest.gdprConsent.gdprApplies === 'boolean') {
            rMap.payload.gdpr = bidderRequest.gdprConsent.gdprApplies;
          }

          if (rMap.payload.gdpr) {
            rMap.payload.consent = bidderRequest.gdprConsent.consentString;
          }
        }

        requestsMap[b.params.ai] = rMap;
        auctionCodes.push(b.params.ai);
      }

      rMap.shortCodes.push(b.params.sc);
      rMap.payload[b.params.sc] = b.bidId;

      if (typeof b.params.host === 'string' && b.params.host.length && b.params.host !== rMap.endpoint) {
        rMap.endpoint = b.params.host;
      }
    });

    __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](auctionCodes, function (auctionId) {
      var req = requestsMap[auctionId];
      requests.push({
        method: 'GET',
        url: "https://".concat(req.endpoint, "/").concat(auctionId, "/").concat(req.shortCodes.join('_'), "/aardvark"),
        data: req.payload,
        bidderRequest: bidderRequest
      });
    });

    return requests;
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = [];

    if (!Array.isArray(serverResponse.body)) {
      serverResponse.body = [serverResponse.body];
    }

    __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](serverResponse.body, function (rawBid) {
      var cpm = +(rawBid.cpm || 0);

      if (!cpm) {
        return;
      }

      var bidResponse = {
        requestId: rawBid.cid,
        cpm: cpm,
        width: rawBid.width || 0,
        height: rawBid.height || 0,
        currency: rawBid.currency ? rawBid.currency : AARDVARK_CURRENCY,
        netRevenue: rawBid.netRevenue ? rawBid.netRevenue : true,
        ttl: rawBid.ttl ? rawBid.ttl : AARDVARK_TTL,
        creativeId: rawBid.creativeId || 0
      };

      if (rawBid.hasOwnProperty('dealId')) {
        bidResponse.dealId = rawBid.dealId;
      }

      if (rawBid.hasOwnProperty('ex')) {
        bidResponse.ex = rawBid.ex;
      }

      switch (rawBid.media) {
        case 'banner':
          bidResponse.ad = rawBid.adm + __WEBPACK_IMPORTED_MODULE_0__src_utils__["createTrackPixelHtml"](decodeURIComponent(rawBid.nurl));
          break;

        default:
          return __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('bad Aardvark response (media)', rawBid);
      }

      bidResponses.push(bidResponse);
    });

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses, gdprConsent) {
    var syncs = [];
    var url = 'https://' + SYNC_ENDPOINT + '/cs';
    var gdprApplies = false;

    if (gdprConsent && typeof gdprConsent.gdprApplies === 'boolean') {
      gdprApplies = gdprConsent.gdprApplies;
    }

    if (syncOptions.iframeEnabled) {
      if (!hasSynced) {
        hasSynced = true;

        if (gdprApplies) {
          url = url + '?g=1&c=' + encodeURIComponent(gdprConsent.consentString);
        }

        syncs.push({
          type: 'iframe',
          url: url
        });
      }
    } else {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]('Aardvark: Please enable iframe based user sync.');
    }

    return syncs;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[124]);