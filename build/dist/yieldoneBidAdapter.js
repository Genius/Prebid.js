pbjsChunk([41],{

/***/ 676:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(677);


/***/ }),

/***/ 677:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_Renderer__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__ = __webpack_require__(2);





var BIDDER_CODE = 'yieldone';
var ENDPOINT_URL = 'https://y.one.impact-ad.jp/h_bid';
var USER_SYNC_URL = 'https://y.one.impact-ad.jp/push_sync';
var VIDEO_PLAYER_URL = 'https://img.ak.impact-ad.jp/ic/pone/ivt/firstview/js/dac-video-prebid.min.js';
var spec = {
  code: BIDDER_CODE,
  aliases: ['y1'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["d" /* VIDEO */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.placementId;
  },
  buildRequests: function buildRequests(validBidRequests) {
    return validBidRequests.map(function (bidRequest) {
      var params = bidRequest.params;
      var placementId = params.placementId;
      var cb = Math.floor(Math.random() * 99999999999);
      var referrer = encodeURIComponent(__WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"]());
      var bidId = bidRequest.bidId;
      var unitCode = bidRequest.adUnitCode;
      var timeout = __WEBPACK_IMPORTED_MODULE_1__src_config__["b" /* config */].getConfig('bidderTimeout');
      var payload = {
        v: 'hb1',
        p: placementId,
        cb: cb,
        r: referrer,
        uid: bidId,
        uc: unitCode,
        tmax: timeout,
        t: 'i'
      };
      var videoMediaType = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest, 'mediaTypes.video');

      if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](bidRequest.mediaType) && __WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](bidRequest.mediaTypes) || bidRequest.mediaType === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["b" /* BANNER */] || bidRequest.mediaTypes && bidRequest.mediaTypes[__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["b" /* BANNER */]]) {
        var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest, 'mediaTypes.banner.sizes') || bidRequest.sizes;
        payload.sz = __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](sizes).join(',');
      } else if (bidRequest.mediaType === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["d" /* VIDEO */] || videoMediaType) {
        var _sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest, 'mediaTypes.video.playerSize') || bidRequest.sizes;

        var size = __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](_sizes)[0];
        payload.w = size.split('x')[0];
        payload.h = size.split('x')[1];
      }

      return {
        method: 'GET',
        url: ENDPOINT_URL,
        data: payload
      };
    });
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = [];
    var response = serverResponse.body;
    var crid = response.crid || 0;
    var width = response.width || 0;
    var height = response.height || 0;
    var cpm = response.cpm * 1000 || 0;

    if (width !== 0 && height !== 0 && cpm !== 0 && crid !== 0) {
      var dealId = response.dealId || '';
      var currency = response.currency || 'JPY';
      var netRevenue = response.netRevenue === undefined ? true : response.netRevenue;
      var referrer = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"]();
      var bidResponse = {
        requestId: response.uid,
        cpm: cpm,
        width: response.width,
        height: response.height,
        creativeId: crid,
        dealId: dealId,
        currency: currency,
        netRevenue: netRevenue,
        ttl: __WEBPACK_IMPORTED_MODULE_1__src_config__["b" /* config */].getConfig('_bidderTimeout'),
        referrer: referrer
      };

      if (response.adTag) {
        bidResponse.mediaType = __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["b" /* BANNER */];
        bidResponse.ad = response.adTag;
      } else if (response.adm) {
        bidResponse.mediaType = __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["d" /* VIDEO */];
        bidResponse.vastXml = response.adm;
        bidResponse.renderer = newRenderer(response);
      }

      bidResponses.push(bidResponse);
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    if (syncOptions.iframeEnabled) {
      return [{
        type: 'iframe',
        url: USER_SYNC_URL
      }];
    }
  }
};

function newRenderer(response) {
  var renderer = __WEBPACK_IMPORTED_MODULE_3__src_Renderer__["a" /* Renderer */].install({
    id: response.uid,
    url: VIDEO_PLAYER_URL,
    loaded: false
  });

  try {
    renderer.setRender(outstreamRender);
  } catch (err) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]('Prebid Error calling setRender on newRenderer', err);
  }

  return renderer;
}

function outstreamRender(bid) {
  bid.renderer.push(function () {
    window.DACIVTPREBID.renderPrebid(bid);
  });
}

Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[676]);