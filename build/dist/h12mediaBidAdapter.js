pbjsChunk([206],{

/***/ 438:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(439);


/***/ }),

/***/ 439:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_find_js__);



var BIDDER_CODE = 'h12media';
var DEFAULT_URL = 'https://bidder.h12-media.com/prebid/';
var DEFAULT_CURRENCY = 'USD';
var DEFAULT_TTL = 360;
var DEFAULT_NET_REVENUE = false;
var spec = {
  code: BIDDER_CODE,
  aliases: ['h12'],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params && bid.params.pubid);
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var requestUrl = validBidRequests[0].params.endpointdom || DEFAULT_URL;
    var isiframe = !(window.self === window.top || window.frameElement);
    var screenSize = getClientDimensions();
    var docSize = getDocumentDimensions();
    var bidrequests = validBidRequests.map(function (bidRequest) {
      var bidderParams = bidRequest.params;
      var adUnitElement = document.getElementById(bidRequest.adUnitCode);
      var ishidden = !isVisible(adUnitElement);
      var coords = {
        x: adUnitElement && adUnitElement.getBoundingClientRect().x,
        y: adUnitElement && adUnitElement.getBoundingClientRect().y
      };
      return {
        bidId: bidRequest.bidId,
        transactionId: bidRequest.transactionId,
        adunitId: bidRequest.adUnitCode,
        pubid: bidderParams.pubid,
        placementid: bidderParams.placementid || '',
        size: bidderParams.size || '',
        adunitSize: bidRequest.mediaTypes.banner.sizes || [],
        coords: coords,
        ishidden: ishidden
      };
    });
    return {
      method: 'POST',
      url: requestUrl,
      options: {
        withCredentials: false
      },
      data: {
        gdpr: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidderRequest, 'gdprConsent.gdprApplies') ? Boolean(bidderRequest.gdprConsent.gdprApplies & 1) : false,
        gdpr_cs: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidderRequest, 'gdprConsent.gdprApplies') ? bidderRequest.gdprConsent.consentString : '',
        topLevelUrl: window.top.location.href,
        refererUrl: bidderRequest.refererInfo ? bidderRequest.refererInfo.referer : '',
        isiframe: isiframe,
        version: "4.2.0",
        visitorInfo: {
          localTime: getLocalDateFormatted(),
          dayOfWeek: new Date().getDay(),
          screenWidth: screenSize[0],
          screenHeight: screenSize[1],
          docWidth: docSize[0],
          docHeight: docSize[1],
          scrollbarx: window.scrollX,
          scrollbary: window.scrollY
        },
        bidrequests: bidrequests
      }
    };
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequests) {
    var bidResponses = [];

    try {
      var serverBody = serverResponse.body;

      if (serverBody) {
        if (serverBody.bids) {
          serverBody.bids.forEach(function (bidBody) {
            var bidRequest = __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_find_js___default()(bidRequests.data.bidrequests, function (bid) {
              return bid.bidId === bidBody.bidId;
            });
            var bidResponse = {
              currency: serverBody.currency || DEFAULT_CURRENCY,
              netRevenue: serverBody.netRevenue || DEFAULT_NET_REVENUE,
              ttl: serverBody.ttl || DEFAULT_TTL,
              requestId: bidBody.bidId,
              cpm: bidBody.cpm,
              width: bidBody.width,
              height: bidBody.height,
              creativeId: bidBody.creativeId,
              ad: bidBody.ad,
              meta: bidBody.meta,
              mediaType: 'banner'
            };

            if (bidRequest) {
              bidResponse.pubid = bidRequest.pubid;
              bidResponse.placementid = bidRequest.placementid;
              bidResponse.size = bidRequest.size;
            }

            bidResponses.push(bidResponse);
          });
        }
      }

      return bidResponses;
    } catch (err) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](err);
    }
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses, gdprConsent) {
    var serverBody = serverResponses[0].body;
    var syncs = [];
    gdprConsent = gdprConsent || {
      gdprApplies: false,
      consentString: ''
    };

    if (serverBody) {
      if (serverBody.bids) {
        serverBody.bids.forEach(function (bidBody) {
          var userSyncUrls = bidBody.usersync || [];

          var userSyncUrlProcess = function userSyncUrlProcess(url) {
            return url.replace('{gdpr}', gdprConsent.gdprApplies).replace('{gdpr_cs}', gdprConsent.consentString);
          };

          userSyncUrls.forEach(function (sync) {
            if (syncOptions.iframeEnabled && sync.type === 'iframe' && sync.url) {
              syncs.push({
                type: 'iframe',
                url: userSyncUrlProcess(sync.url)
              });
            }

            if (syncOptions.pixelEnabled && sync.type === 'image' && sync.url) {
              syncs.push({
                type: 'image',
                url: userSyncUrlProcess(sync.url)
              });
            }
          });
        });
      }
    }

    return syncs;
  }
};

function getContext(elem) {
  return elem && window.document.body.contains(elem) ? window : window.top.document.body.contains(elem) ? top : undefined;
}

function isDefined(val) {
  return val !== null && typeof val !== 'undefined';
}

function getIsHidden(elem) {
  var lastElem = elem;
  var elemHidden = false;
  var m;
  m = 0;

  do {
    m = m + 1;

    try {
      if (getContext(elem).getComputedStyle(lastElem).getPropertyValue('display') === 'none' || getContext(elem).getComputedStyle(lastElem).getPropertyValue('visibility') === 'hidden') {
        return true;
      } else {
        elemHidden = false;
        lastElem = lastElem.parentElement;
      }
    } catch (o) {
      return false;
    }
  } while (m < 250 && lastElem != null && elemHidden === false);

  return elemHidden;
}

function isVisible(element) {
  return element && isDefined(getContext(element)) && !getIsHidden(element);
}

function getClientDimensions() {
  try {
    var t = window.top.innerWidth || window.top.document.documentElement.clientWidth || window.top.document.body.clientWidth;
    var e = window.top.innerHeight || window.top.document.documentElement.clientHeight || window.top.document.body.clientHeight;
    return [Math.round(t), Math.round(e)];
  } catch (i) {
    return [0, 0];
  }
}

function getDocumentDimensions() {
  try {
    var D = window.top.document;
    return [D.body.offsetWidth, Math.max(D.body.scrollHeight, D.documentElement.scrollHeight, D.body.offsetHeight, D.documentElement.offsetHeight, D.body.clientHeight, D.documentElement.clientHeight)];
  } catch (t) {
    return [-1, -1];
  }
}

function getLocalDateFormatted() {
  var two = function two(num) {
    return ('0' + num).slice(-2);
  };

  var d = new Date();
  return "".concat(d.getFullYear(), "-").concat(two(d.getMonth() + 1), "-").concat(two(d.getDate()), " ").concat(two(d.getHours()), ":").concat(two(d.getMinutes()), ":").concat(two(d.getSeconds()));
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[438]);