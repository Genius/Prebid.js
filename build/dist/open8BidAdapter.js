pbjsChunk([103],{

/***/ 373:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(374);


/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Renderer__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_ajax__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__ = __webpack_require__(2);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }






var BIDDER_CODE = 'open8';
var URL = 'https://as.vt.open8.com/v1/control/prebid';
var AD_TYPE = {
  VIDEO: 1,
  BANNER: 2
};
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.slotKey;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var requests = [];

    for (var i = 0; i < validBidRequests.length; i++) {
      var bid = validBidRequests[i];
      var queryString = '';
      var slotKey = __WEBPACK_IMPORTED_MODULE_2__src_utils__["getBidIdParameter"]('slotKey', bid.params);
      queryString = __WEBPACK_IMPORTED_MODULE_2__src_utils__["tryAppendQueryString"](queryString, 'slot_key', slotKey);
      queryString = __WEBPACK_IMPORTED_MODULE_2__src_utils__["tryAppendQueryString"](queryString, 'imp_id', generateImpId());
      queryString += 'bid_id=' + bid.bidId;
      requests.push({
        method: 'GET',
        url: URL,
        data: queryString
      });
    }

    return requests;
  },
  interpretResponse: function interpretResponse(serverResponse, request) {
    var bidderResponse = serverResponse.body;

    if (!bidderResponse.isAdReturn) {
      return [];
    }

    var ad = bidderResponse.ad;
    var bid = {
      slotKey: bidderResponse.slotKey,
      userId: bidderResponse.userId,
      impId: bidderResponse.impId,
      media: bidderResponse.media,
      ds: ad.ds,
      spd: ad.spd,
      fa: ad.fa,
      pr: ad.pr,
      mr: ad.mr,
      nurl: ad.nurl,
      requestId: ad.bidId,
      cpm: ad.price,
      creativeId: ad.creativeId,
      dealId: ad.dealId,
      currency: ad.currency || 'JPY',
      netRevenue: true,
      ttl: 360 // 6 minutes

    };

    if (ad.adType === AD_TYPE.VIDEO) {
      var videoAd = bidderResponse.ad.video;

      _extends(bid, {
        vastXml: videoAd.vastXml,
        width: videoAd.w,
        height: videoAd.h,
        renderer: newRenderer(bidderResponse),
        adResponse: bidderResponse,
        mediaType: __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["d" /* VIDEO */]
      });
    } else if (ad.adType === AD_TYPE.BANNER) {
      var bannerAd = bidderResponse.ad.banner;

      _extends(bid, {
        width: bannerAd.w,
        height: bannerAd.h,
        ad: bannerAd.adm,
        mediaType: __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["b" /* BANNER */]
      });

      if (bannerAd.imps) {
        try {
          bannerAd.imps.forEach(function (impTrackUrl) {
            var tracker = __WEBPACK_IMPORTED_MODULE_2__src_utils__["createTrackPixelHtml"](impTrackUrl);
            bid.ad += tracker;
          });
        } catch (error) {
          __WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"]('Error appending imp tracking pixel', error);
        }
      }
    }

    return [bid];
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    var syncs = [];

    if (syncOptions.iframeEnabled && serverResponses.length) {
      var syncIFs = serverResponses[0].body.syncIFs;

      if (syncIFs) {
        syncIFs.forEach(function (sync) {
          syncs.push({
            type: 'iframe',
            url: sync
          });
        });
      }
    }

    if (syncOptions.pixelEnabled && serverResponses.length) {
      var syncPixs = serverResponses[0].body.syncPixels;

      if (syncPixs) {
        syncPixs.forEach(function (sync) {
          syncs.push({
            type: 'image',
            url: sync
          });
        });
      }
    }

    return syncs;
  },
  onBidWon: function onBidWon(bid) {
    if (!bid.nurl) {
      return;
    }

    var winUrl = bid.nurl.replace(/\$\{AUCTION_PRICE\}/, bid.cpm);
    Object(__WEBPACK_IMPORTED_MODULE_1__src_ajax__["a" /* ajax */])(winUrl, null);
  }
};

function generateImpId() {
  var l = 16;
  var c = 'abcdefghijklmnopqrstuvwsyz0123456789';
  var cl = c.length;
  var r = '';

  for (var i = 0; i < l; i++) {
    r += c[Math.floor(Math.random() * cl)];
  }

  return r;
}

function newRenderer(bidderResponse) {
  var renderer = __WEBPACK_IMPORTED_MODULE_0__src_Renderer__["a" /* Renderer */].install({
    id: bidderResponse.ad.bidId,
    url: bidderResponse.ad.video.purl,
    loaded: false
  });

  try {
    renderer.setRender(outstreamRender);
  } catch (err) {
    __WEBPACK_IMPORTED_MODULE_2__src_utils__["logWarn"]('Prebid Error calling setRender on newRenderer', err);
  }

  return renderer;
}

function outstreamRender(bid) {
  bid.renderer.push(function () {
    window.op8.renderPrebid({
      vastXml: bid.vastXml,
      adUnitCode: bid.adUnitCode,
      slotKey: bid.slotKey,
      impId: bid.impId,
      userId: bid.userId,
      media: bid.media,
      ds: bid.ds,
      spd: bid.spd,
      fa: bid.fa,
      pr: bid.pr,
      mr: bid.mr,
      adResponse: bid.adResponse,
      mediaType: bid.mediaType
    });
  });
}

Object(__WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[373]);