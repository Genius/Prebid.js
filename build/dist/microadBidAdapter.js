pbjsChunk([170],{

/***/ 531:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(532);


/***/ }),

/***/ 532:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENVIRONMENT", function() { return ENVIRONMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__ = __webpack_require__(2);


var BIDDER_CODE = 'microad';
var ENDPOINT_URLS = {
  'production': 'https://s-rtb-pb.send.microad.jp/prebid',
  'test': 'https://rtbtest.send.microad.jp/prebid'
};
var ENVIRONMENT = 'production';
/* eslint-disable no-template-curly-in-string */

var EXT_URL_STRING = '${COMPASS_EXT_URL}';
var EXT_REF_STRING = '${COMPASS_EXT_REF}';
var EXT_IFA_STRING = '${COMPASS_EXT_IFA}';
var EXT_APPID_STRING = '${COMPASS_EXT_APPID}';
var EXT_GEO_STRING = '${COMPASS_EXT_GEO}';
/* eslint-enable no-template-curly-in-string */

var BANNER_CODE = 1;
var NATIVE_CODE = 2;
var VIDEO_CODE = 4;

function createCBT() {
  var randomValue = Math.floor(Math.random() * Math.pow(10, 18)).toString(16);
  var date = new Date().getTime().toString(16);
  return randomValue + date;
}

function createBitSequenceFromMediaType(hi, code) {
  return (hi ? -1 : 0) & code;
}

function convertMediaTypes(bid) {
  return createBitSequenceFromMediaType(bid.mediaTypes.banner, BANNER_CODE) | createBitSequenceFromMediaType(bid.mediaTypes.native, NATIVE_CODE) | createBitSequenceFromMediaType(bid.mediaTypes.video, VIDEO_CODE);
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid && bid.params && bid.params.spot && bid.mediaTypes && (bid.mediaTypes.banner || bid.mediaTypes.native || bid.mediaTypes.video));
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var requests = [];
    validBidRequests.forEach(function (bid) {
      var bidParams = bid.params;
      var params = {
        spot: bidParams.spot,
        url: bidderRequest.refererInfo.canonicalUrl || window.location.href,
        referrer: bidderRequest.refererInfo.referer,
        bid_id: bid.bidId,
        transaction_id: bid.transactionId,
        media_types: convertMediaTypes(bid),
        cbt: createCBT()
      };

      if (bidParams.url) {
        params['url_macro'] = bidParams.url.replace(EXT_URL_STRING, '');
      }

      if (bidParams.referrer) {
        params['referrer_macro'] = bidParams.referrer.replace(EXT_REF_STRING, '');
      }

      if (bidParams.ifa) {
        params['ifa'] = bidParams.ifa.replace(EXT_IFA_STRING, '');
      }

      if (bidParams.appid) {
        params['appid'] = bidParams.appid.replace(EXT_APPID_STRING, '');
      }

      if (bidParams.geo) {
        var geo = bidParams.geo.replace(EXT_GEO_STRING, '');

        if (/^[0-9.\-]+,[0-9.\-]+$/.test(geo)) {
          params['geo'] = geo;
        }
      }

      requests.push({
        method: 'GET',
        url: ENDPOINT_URLS[ENVIRONMENT],
        data: params,
        options: {
          Accept: 'application/json'
        }
      });
    });
    return requests;
  },
  interpretResponse: function interpretResponse(serverResponse) {
    var body = serverResponse.body;
    var bidResponses = [];

    if (body.cpm && body.cpm > 0) {
      var bidResponse = {
        requestId: body.requestId,
        cpm: body.cpm,
        width: body.width,
        height: body.height,
        ad: body.ad,
        ttl: body.ttl,
        creativeId: body.creativeId,
        netRevenue: body.netRevenue,
        currency: body.currency
      };

      if (body.dealId) {
        bidResponse['dealId'] = body.dealId;
      }

      bidResponses.push(bidResponse);
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    var syncs = [];

    if (!syncOptions.iframeEnabled && !syncOptions.pixelEnabled) {
      return syncs;
    }

    serverResponses.forEach(function (resp) {
      var syncIframeUrls = resp.body.syncUrls.iframe;
      var syncImageUrls = resp.body.syncUrls.image;

      if (syncOptions.iframeEnabled && syncIframeUrls) {
        syncIframeUrls.forEach(function (syncIframeUrl) {
          syncs.push({
            type: 'iframe',
            url: syncIframeUrl
          });
        });
      }

      if (syncOptions.pixelEnabled && syncImageUrls) {
        syncImageUrls.forEach(function (syncImageUrl) {
          syncs.push({
            type: 'image',
            url: syncImageUrl
          });
        });
      }
    });
    return syncs;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[531]);