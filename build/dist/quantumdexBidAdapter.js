pbjsChunk([131],{

/***/ 626:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(627);


/***/ }),

/***/ 627:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



var BIDDER_CODE = 'quantumdex';
var CONFIG = {
  'quantumdex': {
    'ENDPOINT': 'https://useast.quantumdex.io/auction/quantumdex',
    'USERSYNC': 'https://sync.quantumdex.io/usersync/quantumdex'
  },
  'valueimpression': {
    'ENDPOINT': 'https://useast.quantumdex.io/auction/adapter',
    'USERSYNC': 'https://sync.quantumdex.io/usersync/adapter'
  }
};
var bidderConfig = CONFIG['quantumdex'];
var bySlotTargetKey = {};
var bySlotSizesCount = {};
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: ['banner', 'video'],
  aliases: ['valueimpression'],
  isBidRequestValid: function isBidRequestValid(bid) {
    if (!bid.params) {
      return false;
    }

    if (!bid.params.siteId) {
      return false;
    }

    if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.banner') && !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.video')) {
      return false;
    }

    if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.banner')) {
      // Quantumdex does not support multi type bids, favor banner over video
      if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.banner.sizes')) {
        // sizes at the banner is required.
        return false;
      }
    } else if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.video')) {
      if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.video.playerSize')) {
        // playerSize is required for instream adUnits.
        return false;
      }
    }

    return true;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var bids = JSON.parse(JSON.stringify(validBidRequests));
    bidderConfig = CONFIG[bids[0].bidder];
    var payload = {};
    bids.forEach(function (bidReq) {
      var targetKey = 0;

      if (bySlotTargetKey[bidReq.adUnitCode] != undefined) {
        targetKey = bySlotTargetKey[bidReq.adUnitCode];
      } else {
        var biggestSize = _getBiggestSize(bidReq.sizes);

        if (biggestSize) {
          if (bySlotSizesCount[biggestSize] != undefined) {
            bySlotSizesCount[biggestSize]++;
            targetKey = bySlotSizesCount[biggestSize];
          } else {
            bySlotSizesCount[biggestSize] = 0;
            targetKey = 0;
          }
        }
      }

      bySlotTargetKey[bidReq.adUnitCode] = targetKey;
      bidReq.targetKey = targetKey;
    });
    payload.device = {};
    payload.device.ua = navigator.userAgent;
    payload.device.height = window.top.innerHeight;
    payload.device.width = window.top.innerWidth;
    payload.device.dnt = _getDoNotTrack();
    payload.device.language = navigator.language;
    payload.site = {};
    payload.site.id = bids[0].params.siteId;
    payload.site.page = _extractTopWindowUrlFromBidderRequest(bidderRequest);
    payload.site.referrer = _extractTopWindowReferrerFromBidderRequest(bidderRequest);
    payload.site.hostname = window.top.location.hostname; // Apply GDPR parameters to request.

    payload.gdpr = {};

    if (bidderRequest && bidderRequest.gdprConsent) {
      payload.gdpr.gdprApplies = bidderRequest.gdprConsent.gdprApplies ? 'true' : 'false';

      if (bidderRequest.gdprConsent.consentString) {
        payload.gdpr.consentString = bidderRequest.gdprConsent.consentString;
      }
    } // Apply schain.


    if (bids[0].schain) {
      payload.schain = JSON.stringify(bids[0].schain);
    } // Apply us_privacy.


    if (bidderRequest && bidderRequest.uspConsent) {
      payload.us_privacy = bidderRequest.uspConsent;
    }

    payload.bids = bids;
    return {
      method: 'POST',
      url: bidderConfig.ENDPOINT,
      data: payload,
      withCredentials: true,
      bidderRequests: bids
    };
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var serverBody = serverResponse.body;
    var serverBids = serverBody.bids; // check overall response

    if (!serverBody || _typeof(serverBody) !== 'object') {
      return [];
    }

    if (!serverBids || _typeof(serverBids) !== 'object') {
      return [];
    }

    var bidResponses = [];
    serverBids.forEach(function (bid) {
      var bidResponse = {
        requestId: bid.requestId,
        cpm: bid.cpm,
        width: bid.width,
        height: bid.height,
        creativeId: bid.creativeId,
        dealId: bid.dealId,
        currency: bid.currency,
        netRevenue: bid.netRevenue,
        ttl: bid.ttl,
        mediaType: bid.mediaType
      };

      if (bid.vastXml) {
        bidResponse.vastXml = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["replaceAuctionPrice"](bid.vastXml, bid.cpm);
      } else {
        bidResponse.ad = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["replaceAuctionPrice"](bid.ad, bid.cpm);
      }

      bidResponses.push(bidResponse);
    });
    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    var syncs = [];

    try {
      if (syncOptions.iframeEnabled) {
        syncs.push({
          type: 'iframe',
          url: bidderConfig.USERSYNC
        });
      }

      if (serverResponses.length > 0 && serverResponses[0].body && serverResponses[0].body.pixel) {
        serverResponses[0].body.pixel.forEach(function (px) {
          if (px.type === 'image' && syncOptions.pixelEnabled) {
            syncs.push({
              type: 'image',
              url: px.url
            });
          }

          if (px.type === 'iframe' && syncOptions.iframeEnabled) {
            syncs.push({
              type: 'iframe',
              url: px.url
            });
          }
        });
      }
    } catch (e) {}

    return syncs;
  }
};

function _getBiggestSize(sizes) {
  if (sizes.length <= 0) return false;
  var acreage = 0;
  var index = 0;

  for (var i = 0; i < sizes.length; i++) {
    var currentAcreage = sizes[i][0] * sizes[i][1];

    if (currentAcreage >= acreage) {
      acreage = currentAcreage;
      index = i;
    }
  }

  return sizes[index][0] + 'x' + sizes[index][1];
}

function _getDoNotTrack() {
  if (window.top.doNotTrack || navigator.doNotTrack || navigator.msDoNotTrack) {
    if (window.top.doNotTrack == '1' || navigator.doNotTrack == 'yes' || navigator.doNotTrack == '1' || navigator.msDoNotTrack == '1') {
      return 1;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
}
/**
 * Extracts the page url from given bid request or use the (top) window location as fallback
 *
 * @param {*} bidderRequest
 * @returns {string}
 */


function _extractTopWindowUrlFromBidderRequest(bidderRequest) {
  if (bidderRequest && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidderRequest, 'refererInfo.canonicalUrl')) {
    return bidderRequest.refererInfo.canonicalUrl;
  }

  try {
    return window.top.location.href;
  } catch (e) {
    return window.location.href;
  }
}
/**
 * Extracts the referrer from given bid request or use the (top) document referrer as fallback
 *
 * @param {*} bidderRequest
 * @returns {string}
 */


function _extractTopWindowReferrerFromBidderRequest(bidderRequest) {
  if (bidderRequest && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidderRequest, 'refererInfo.referer')) {
    return bidderRequest.refererInfo.referer;
  }

  try {
    return window.top.document.referrer;
  } catch (e) {
    return window.document.referrer;
  }
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[626]);