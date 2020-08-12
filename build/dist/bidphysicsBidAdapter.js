pbjsChunk([176],{

/***/ 199:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(200);


/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);



var ENDPOINT_URL = 'https://exchange.bidphysics.com/auction';
var DEFAULT_BID_TTL = 30;
var DEFAULT_CURRENCY = 'USD';
var DEFAULT_NET_REVENUE = true;
var spec = {
  code: 'bidphysics',
  aliases: ['yieldlift'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */]],
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
          format: bidRequest.sizes.map(function (sizeArr) {
            return {
              w: sizeArr[0],
              h: sizeArr[1]
            };
          })
        },
        ext: {
          bidphysics: {
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
        bidphysics: {
          publisherId: publisherId,
          networkId: networkId
        }
      }
    }; // apply gdpr

    if (bidderRequest.gdprConsent) {
      openrtbRequest.regs = {
        ext: {
          gdpr: bidderRequest.gdprConsent.gdprApplies ? 1 : 0
        }
      };
      openrtbRequest.user = {
        ext: {
          consent: bidderRequest.gdprConsent.consentString
        }
      };
    }

    var payloadString = JSON.stringify(openrtbRequest);
    return {
      method: 'POST',
      url: ENDPOINT_URL,
      data: payloadString
    };
  },
  interpretResponse: function interpretResponse(serverResponse, request) {
    var bidResponses = [];
    var response = (serverResponse || {}).body; // response is always one seat (bidphysics) with (optional) bids for each impression

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
      __WEBPACK_IMPORTED_MODULE_1__src_utils__["logInfo"]('bidphysics.interpretResponse :: no valid responses to interpret');
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    __WEBPACK_IMPORTED_MODULE_1__src_utils__["logInfo"]('bidphysics.getUserSyncs', 'syncOptions', syncOptions, 'serverResponses', serverResponses);
    var syncs = [];

    if (!syncOptions.iframeEnabled && !syncOptions.pixelEnabled) {
      return syncs;
    }

    serverResponses.forEach(function (resp) {
      var userSync = __WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](resp, 'body.ext.usersync');

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
    __WEBPACK_IMPORTED_MODULE_1__src_utils__["logInfo"]('bidphysics.getUserSyncs result=%o', syncs);
    return syncs;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[199]);