pbjsChunk([52],{

/***/ 814:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(815);


/***/ }),

/***/ 815:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_find_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_Renderer_js__ = __webpack_require__(11);





var ENDPOINT = 'https://ad.yieldlab.net';
var BIDDER_CODE = 'yieldlab';
var BID_RESPONSE_TTL_SEC = 300;
var CURRENCY_CODE = 'EUR';
var OUTSTREAMPLAYER_URL = 'https://ad2.movad.net/dynamic.ad?a=o193092&ma_loadEvent=ma-start-event';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    if (bid && bid.params && bid.params.adslotId && bid.params.supplyId) {
      return true;
    }

    return false;
  },

  /**
   * This method should build correct URL
   * @param validBidRequests
   * @returns {{method: string, url: string}}
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var adslotIds = [];
    var timestamp = Date.now();
    var query = {
      ts: timestamp,
      json: true
    };

    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](validBidRequests, function (bid) {
      adslotIds.push(bid.params.adslotId);

      if (bid.params.targeting) {
        query.t = createTargetingString(bid.params.targeting);
      }

      if (bid.userIdAsEids && Array.isArray(bid.userIdAsEids)) {
        query.ids = createUserIdString(bid.userIdAsEids);
      }

      if (bid.params.customParams && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isPlainObject"](bid.params.customParams)) {
        for (var prop in bid.params.customParams) {
          query[prop] = bid.params.customParams[prop];
        }
      }
    });

    if (bidderRequest) {
      if (bidderRequest.refererInfo && bidderRequest.refererInfo.referer) {
        query.pubref = bidderRequest.refererInfo.referer;
      }

      if (bidderRequest.gdprConsent) {
        query.gdpr = typeof bidderRequest.gdprConsent.gdprApplies === 'boolean' ? bidderRequest.gdprConsent.gdprApplies : true;

        if (query.gdpr) {
          query.consent = bidderRequest.gdprConsent.consentString;
        }
      }
    }

    var adslots = adslotIds.join(',');
    var queryString = createQueryString(query);
    return {
      method: 'GET',
      url: "".concat(ENDPOINT, "/yp/").concat(adslots, "?").concat(queryString),
      validBidRequests: validBidRequests
    };
  },

  /**
   * Map ad values and pricing and stuff
   * @param serverResponse
   * @param originalBidRequest
   */
  interpretResponse: function interpretResponse(serverResponse, originalBidRequest) {
    var bidResponses = [];
    var timestamp = Date.now();
    originalBidRequest.validBidRequests.forEach(function (bidRequest) {
      if (!serverResponse.body) {
        return;
      }

      var matchedBid = __WEBPACK_IMPORTED_MODULE_2_core_js_pure_features_array_find_js___default()(serverResponse.body, function (bidResponse) {
        return bidRequest.params.adslotId == bidResponse.id;
      });

      if (matchedBid) {
        var primarysize = bidRequest.sizes.length === 2 && !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](bidRequest.sizes[0]) ? bidRequest.sizes : bidRequest.sizes[0];
        var customsize = bidRequest.params.adSize !== undefined ? parseSize(bidRequest.params.adSize) : primarysize;
        var extId = bidRequest.params.extId !== undefined ? '&id=' + bidRequest.params.extId : '';
        var adType = matchedBid.adtype !== undefined ? matchedBid.adtype : '';
        var bidResponse = {
          requestId: bidRequest.bidId,
          cpm: matchedBid.price / 100,
          width: customsize[0],
          height: customsize[1],
          creativeId: '' + matchedBid.id,
          dealId: matchedBid['c.dealid'] ? matchedBid['c.dealid'] : matchedBid.pid,
          currency: CURRENCY_CODE,
          netRevenue: false,
          ttl: BID_RESPONSE_TTL_SEC,
          referrer: '',
          ad: "<script src=\"".concat(ENDPOINT, "/d/").concat(matchedBid.id, "/").concat(bidRequest.params.supplyId, "/").concat(customsize[0], "x").concat(customsize[1], "?ts=").concat(timestamp).concat(extId, "\"></script>")
        };

        if (isVideo(bidRequest, adType)) {
          var playersize = getPlayerSize(bidRequest);

          if (playersize) {
            bidResponse.width = playersize[0];
            bidResponse.height = playersize[1];
          }

          bidResponse.mediaType = __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */];
          bidResponse.vastUrl = "".concat(ENDPOINT, "/d/").concat(matchedBid.id, "/").concat(bidRequest.params.supplyId, "/").concat(customsize[0], "x").concat(customsize[1], "?ts=").concat(timestamp).concat(extId);

          if (isOutstream(bidRequest)) {
            var renderer = __WEBPACK_IMPORTED_MODULE_4__src_Renderer_js__["a" /* Renderer */].install({
              id: bidRequest.bidId,
              url: OUTSTREAMPLAYER_URL,
              loaded: false
            });
            renderer.setRender(outstreamRender);
            bidResponse.renderer = renderer;
          }
        }

        bidResponses.push(bidResponse);
      }
    });
    return bidResponses;
  }
};
/**
 * Is this a video format?
 * @param {Object} format
 * @param {String} adtype
 * @returns {Boolean}
 */

function isVideo(format, adtype) {
  return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](format, 'mediaTypes.video') && adtype.toLowerCase() === 'video';
}
/**
 * Is this an outstream context?
 * @param {Object} format
 * @returns {Boolean}
 */


function isOutstream(format) {
  var context = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](format, 'mediaTypes.video.context');
  return context === 'outstream';
}
/**
 * Gets optional player size
 * @param {Object} format
 * @returns {Array}
 */


function getPlayerSize(format) {
  var playerSize = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](format, 'mediaTypes.video.playerSize');
  return playerSize && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](playerSize[0]) ? playerSize[0] : playerSize;
}
/**
 * Expands a 'WxH' string as a 2-element [W, H] array
 * @param {String} size
 * @returns {Array}
 */


function parseSize(size) {
  return size.split('x').map(Number);
}
/**
 * Creates a string out of an array of eids with source and uid
 * @param {Array} eids
 * @returns {String}
 */


function createUserIdString(eids) {
  var str = [];

  for (var i = 0; i < eids.length; i++) {
    str.push(eids[i].source + ':' + eids[i].uids[0].id);
  }

  return str.join(',');
}
/**
 * Creates a querystring out of an object with key-values
 * @param {Object} obj
 * @returns {String}
 */


function createQueryString(obj) {
  var str = [];

  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  }

  return str.join('&');
}
/**
 * Creates an unencoded targeting string out of an object with key-values
 * @param {Object} obj
 * @returns {String}
 */


function createTargetingString(obj) {
  var str = [];

  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      var key = p;
      var val = obj[p];
      str.push(key + '=' + val);
    }
  }

  return str.join('&');
}
/**
 * Handles an outstream response after the library is loaded
 * @param {Object} bid
 */


function outstreamRender(bid) {
  bid.renderer.push(function () {
    window.ma_width = bid.width;
    window.ma_height = bid.height;
    window.ma_vastUrl = bid.vastUrl;
    window.ma_container = bid.adUnitCode;
    window.document.dispatchEvent(new Event('ma-start-event'));
  });
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[814]);