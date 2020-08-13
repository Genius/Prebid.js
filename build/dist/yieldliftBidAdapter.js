pbjsChunk([51],{

/***/ 816:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(817);


/***/ }),

/***/ 817:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);



var ENDPOINT_URL = 'https://x.yieldlift.com/auction';
var DEFAULT_BID_TTL = 30;
var DEFAULT_CURRENCY = 'USD';
var DEFAULT_NET_REVENUE = true;
var spec = {
  code: 'yieldlift',
  aliases: ['yl'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.unitId && typeof bid.params.unitId === 'string' || !!bid.params.networkId && typeof bid.params.networkId === 'string' || !!bid.params.publisherId && typeof bid.params.publisherId === 'string';
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    if (!validBidRequests || !bidderRequest) {
      return;
    }

    var publisherId = validBidRequests[0].params.publisherId;
    var networkId = validBidRequests[0].params.networkId;
    var impressions = validBidRequests.map(function (bidRequest) {
      return {
        id: bidRequest.bidId,
        banner: {
          format: bidRequest.mediaTypes.banner.sizes.map(function (sizeArr) {
            return {
              w: sizeArr[0],
              h: sizeArr[1]
            };
          })
        },
        ext: {
          exchange: {
            unitId: bidRequest.params.unitId
          }
        }
      };
    });
    var openrtbRequest = {
      id: bidderRequest.auctionId,
      imp: impressions,
      site: {
        domain: window.location.hostname,
        page: window.location.href,
        ref: bidderRequest.refererInfo ? bidderRequest.refererInfo.referer || null : null
      },
      ext: {
        exchange: {
          publisherId: publisherId,
          networkId: networkId
        }
      }
    }; // adding schain object

    if (validBidRequests[0].schain) {
      __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["deepSetValue"](openrtbRequest, 'source.ext.schain', validBidRequests[0].schain);
    } // Attaching GDPR Consent Params


    if (bidderRequest.gdprConsent) {
      __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["deepSetValue"](openrtbRequest, 'user.ext.consent', bidderRequest.gdprConsent.consentString);
      __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["deepSetValue"](openrtbRequest, 'regs.ext.gdpr', bidderRequest.gdprConsent.gdprApplies ? 1 : 0);
    } // CCPA


    if (bidderRequest.uspConsent) {
      __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["deepSetValue"](openrtbRequest, 'regs.ext.us_privacy', bidderRequest.uspConsent);
    }

    var payloadString = JSON.stringify(openrtbRequest);
    return {
      method: 'POST',
      url: ENDPOINT_URL,
      data: payloadString
    };
  },
  interpretResponse: function interpretResponse(serverResponse) {
    var bidResponses = [];
    var response = (serverResponse || {}).body; // response is always one seat (exchange) with (optional) bids for each impression

    if (response && response.seatbid && response.seatbid.length === 1 && response.seatbid[0].bid && response.seatbid[0].bid.length) {
      response.seatbid[0].bid.forEach(function (bid) {
        bidResponses.push({
          requestId: bid.impid,
          cpm: bid.price,
          width: bid.w,
          height: bid.h,
          ad: bid.adm,
          ttl: DEFAULT_BID_TTL,
          creativeId: bid.crid,
          netRevenue: DEFAULT_NET_REVENUE,
          currency: DEFAULT_CURRENCY
        });
      });
    } else {
      __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logInfo"]('yieldlift.interpretResponse :: no valid responses to interpret');
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logInfo"]('yieldlift.getUserSyncs', 'syncOptions', syncOptions, 'serverResponses', serverResponses);
    var syncs = [];

    if (!syncOptions.iframeEnabled && !syncOptions.pixelEnabled) {
      return syncs;
    }

    serverResponses.forEach(function (resp) {
      var userSync = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["deepAccess"](resp, 'body.ext.usersync');

      if (userSync) {
        var syncDetails = [];
        Object.keys(userSync).forEach(function (key) {
          var value = userSync[key];

          if (value.syncs && value.syncs.length) {
            syncDetails = syncDetails.concat(value.syncs);
          }
        });
        syncDetails.forEach(function (syncDetails) {
          syncs.push({
            type: syncDetails.type === 'iframe' ? 'iframe' : 'image',
            url: syncDetails.url
          });
        });

        if (!syncOptions.iframeEnabled) {
          syncs = syncs.filter(function (s) {
            return s.type !== 'iframe';
          });
        }

        if (!syncOptions.pixelEnabled) {
          syncs = syncs.filter(function (s) {
            return s.type !== 'image';
          });
        }
      }
    });
    __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logInfo"]('yieldlift.getUserSyncs result=%o', syncs);
    return syncs;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[816]);