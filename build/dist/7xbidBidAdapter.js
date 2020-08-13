pbjsChunk([320],{

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(165);


/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_getUrlVars", function() { return _getUrlVars; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);


var BIDDER_CODE = '7xbid';
var BIDDER_ALIAS = '7xb';
var ENDPOINT_BANNER = '//bidder.7xbid.com/api/v1/prebid/banner';
var ENDPOINT_NATIVE = '//bidder.7xbid.com/api/v1/prebid/native';
var COOKIE_SYNC_URL = '//bidder.7xbid.com/api/v1/cookie/gen';
var SUPPORTED_MEDIA_TYPES = ['banner', 'native'];
var SUPPORTED_CURRENCIES = ['USD', 'JPY'];
var DEFAULT_CURRENCY = 'JPY';
var NET_REVENUE = true;
/**
  * updated to support prebid 3.0 - remove utils.getTopWindowUrl()
  */

var _encodeURIComponent = function _encodeURIComponent(a) {
  var b = window.encodeURIComponent(a);
  b = b.replace(/'/g, '%27');
  return b;
};

var _getUrlVars = function _getUrlVars(url) {
  var hash;
  var myJson = {};
  var hashes = url.slice(url.indexOf('?') + 1).split('&');

  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    myJson[hash[0]] = hash[1];
  }

  return myJson;
};
var spec = {
  code: BIDDER_CODE,
  aliases: [BIDDER_ALIAS],
  // short code
  supportedMediaTypes: SUPPORTED_MEDIA_TYPES,
  isBidRequestValid: function isBidRequestValid(bid) {
    if (!bid.params.placementId) {
      return false;
    }

    if (bid.params.hasOwnProperty('currency') && SUPPORTED_CURRENCIES.indexOf(bid.params.currency) === -1) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('Invalid currency type, we support only JPY and USD!');
      return false;
    }

    return true;
  },

  /**
    * Make a server request from the list of BidRequests.
    *
    * @param {validBidRequests[]} - an array of bids
    * @return ServerRequest Info describing the request to the server.
    */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var serverRequests = [];
    var refererInfo;

    if (bidderRequest && bidderRequest.refererInfo) {
      refererInfo = bidderRequest.refererInfo;
    }

    validBidRequests.forEach(function (bid, i) {
      var endpoint = ENDPOINT_BANNER;
      var data = {
        'placementid': bid.params.placementId,
        'cur': bid.params.hasOwnProperty('currency') ? bid.params.currency : DEFAULT_CURRENCY,
        'ua': navigator.userAgent,
        'loc': __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidderRequest, 'refererInfo.referer'),
        'topframe': window.parent === window.self ? 1 : 0,
        'sw': screen && screen.width,
        'sh': screen && screen.height,
        'cb': Math.floor(Math.random() * 99999999999),
        'tpaf': 1,
        'cks': 1,
        'requestid': bid.bidId
      };

      if (bid.hasOwnProperty('nativeParams')) {
        endpoint = ENDPOINT_NATIVE;
        data.tkf = 1; // return url tracker

        data.ad_track = '1';
        data.apiv = '1.1.0';
      }

      if (refererInfo && refererInfo.referer) {
        data.referer = refererInfo.referer;
      } else {
        data.referer = '';
      }

      serverRequests.push({
        method: 'GET',
        url: endpoint,
        data: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseQueryStringParameters"](data)
      });
    });
    return serverRequests;
  },
  interpretResponse: function interpretResponse(serverResponse, request) {
    var data = _getUrlVars(request.data);

    var successBid = serverResponse.body || {};
    var bidResponses = [];

    if (successBid.hasOwnProperty(data.placementid)) {
      var bid = successBid[data.placementid];
      var bidResponse = {
        requestId: bid.requestid,
        cpm: bid.price,
        creativeId: bid.creativeId,
        currency: bid.cur,
        netRevenue: NET_REVENUE,
        ttl: 700
      };

      if (bid.hasOwnProperty('title')) {
        // it is native ad response
        bidResponse.mediaType = 'native';
        bidResponse.native = {
          title: bid.title,
          body: bid.description,
          cta: bid.cta,
          sponsoredBy: bid.advertiser,
          clickUrl: _encodeURIComponent(bid.landingURL),
          impressionTrackers: bid.trackings
        };

        if (bid.screenshots) {
          bidResponse.native.image = {
            url: bid.screenshots.url,
            height: bid.screenshots.height,
            width: bid.screenshots.width
          };
        }

        if (bid.icon) {
          bidResponse.native.icon = {
            url: bid.icon.url,
            height: bid.icon.height,
            width: bid.icon.width
          };
        }
      } else {
        bidResponse.ad = bid.adm;
        bidResponse.width = bid.width;
        bidResponse.height = bid.height;
      }

      bidResponses.push(bidResponse);
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    return [{
      type: 'image',
      url: COOKIE_SYNC_URL
    }];
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[164]);