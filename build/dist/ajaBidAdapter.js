pbjsChunk([287],{

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(252);


/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Renderer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__ = __webpack_require__(2);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





var BIDDER_CODE = 'aja';
var URL = 'https://ad.as.amanad.adtdp.com/v2/prebid';
var SDK_TYPE = 5;
var AD_TYPE = {
  BANNER: 1,
  NATIVE: 2,
  VIDEO: 3
};
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["c" /* NATIVE */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.asi;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var bidRequests = [];

    for (var i = 0, len = validBidRequests.length; i < len; i++) {
      var bid = validBidRequests[i];
      var queryString = '';
      var asi = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["getBidIdParameter"]('asi', bid.params);
      queryString = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["tryAppendQueryString"](queryString, 'asi', asi);
      queryString = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["tryAppendQueryString"](queryString, 'skt', SDK_TYPE);
      queryString = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["tryAppendQueryString"](queryString, 'prebid_id', bid.bidId);
      queryString = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["tryAppendQueryString"](queryString, 'prebid_ver', "4.2.0");

      if (bidderRequest && bidderRequest.refererInfo) {
        queryString = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["tryAppendQueryString"](queryString, 'page_url', bidderRequest.refererInfo.referer);
      }

      bidRequests.push({
        method: 'GET',
        url: URL,
        data: queryString
      });
    }

    return bidRequests;
  },
  interpretResponse: function interpretResponse(bidderResponse, request) {
    var bidderResponseBody = bidderResponse.body;

    if (!bidderResponseBody.is_ad_return) {
      return [];
    }

    var ad = bidderResponseBody.ad;
    var bid = {
      requestId: ad.prebid_id,
      cpm: ad.price,
      creativeId: ad.creative_id,
      dealId: ad.deal_id,
      currency: ad.currency || 'USD',
      netRevenue: true,
      ttl: 300 // 5 minutes

    };

    if (AD_TYPE.VIDEO === ad.ad_type) {
      var videoAd = bidderResponseBody.ad.video;

      _extends(bid, {
        vastXml: videoAd.vtag,
        width: videoAd.w,
        height: videoAd.h,
        renderer: newRenderer(bidderResponseBody),
        adResponse: bidderResponseBody,
        mediaType: __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */]
      });
    } else if (AD_TYPE.BANNER === ad.ad_type) {
      var bannerAd = bidderResponseBody.ad.banner;

      _extends(bid, {
        width: bannerAd.w,
        height: bannerAd.h,
        ad: bannerAd.tag,
        mediaType: __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */]
      });

      try {
        bannerAd.imps.forEach(function (impTracker) {
          var tracker = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["createTrackPixelHtml"](impTracker);
          bid.ad += tracker;
        });
      } catch (error) {
        __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logError"]('Error appending tracking pixel', error);
      }
    } else if (AD_TYPE.NATIVE === ad.ad_type) {
      var nativeAds = ad.native.template_and_ads.ads;
      nativeAds.forEach(function (nativeAd) {
        var assets = nativeAd.assets;

        _extends(bid, {
          mediaType: __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["c" /* NATIVE */]
        });

        bid.native = {
          title: assets.title,
          body: assets.description,
          cta: assets.cta_text,
          sponsoredBy: assets.sponsor,
          clickUrl: assets.lp_link,
          impressionTrackers: nativeAd.imps,
          privacyLink: assets.adchoice_url
        };

        if (assets.img_main !== undefined) {
          bid.native.image = {
            url: assets.img_main,
            width: parseInt(assets.img_main_width, 10),
            height: parseInt(assets.img_main_height, 10)
          };
        }

        if (assets.img_icon !== undefined) {
          bid.native.icon = {
            url: assets.img_icon,
            width: parseInt(assets.img_icon_width, 10),
            height: parseInt(assets.img_icon_height, 10)
          };
        }
      });
    }

    return [bid];
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    var syncs = [];

    if (!serverResponses.length) {
      return syncs;
    }

    var bidderResponseBody = serverResponses[0].body;

    if (syncOptions.pixelEnabled && bidderResponseBody.syncs) {
      bidderResponseBody.syncs.forEach(function (sync) {
        syncs.push({
          type: 'image',
          url: sync
        });
      });
    }

    if (syncOptions.iframeEnabled && bidderResponseBody.sync_htmls) {
      bidderResponseBody.sync_htmls.forEach(function (sync) {
        syncs.push({
          type: 'iframe',
          url: sync
        });
      });
    }

    return syncs;
  }
};

function newRenderer(bidderResponse) {
  var renderer = __WEBPACK_IMPORTED_MODULE_0__src_Renderer_js__["a" /* Renderer */].install({
    id: bidderResponse.ad.prebid_id,
    url: bidderResponse.ad.video.purl,
    loaded: false
  });

  try {
    renderer.setRender(outstreamRender);
  } catch (err) {
    __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logWarn"]('Prebid Error calling setRender on newRenderer', err);
  }

  return renderer;
}

function outstreamRender(bid) {
  bid.renderer.push(function () {
    window.aja_vast_player.init({
      vast_tag: bid.adResponse.ad.video.vtag,
      ad_unit_code: bid.adUnitCode,
      // target div id to render video
      width: bid.width,
      height: bid.height,
      progress: bid.adResponse.ad.video.progress,
      loop: bid.adResponse.ad.video.loop,
      inread: bid.adResponse.ad.video.inread
    });
  });
}

Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[251]);