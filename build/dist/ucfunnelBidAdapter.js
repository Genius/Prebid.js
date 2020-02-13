pbjsChunk([64],{

/***/ 622:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(623);


/***/ }),

/***/ 623:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }




var VER = 'ADGENT_PREBID-2018011501';
var BIDDER_CODE = 'ucfunnel';
var VIDEO_CONTEXT = {
  INSTREAM: 0,
  OUSTREAM: 2
};
var spec = {
  code: BIDDER_CODE,
  ENDPOINT: '//hb.aralego.com/header',
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["c" /* NATIVE */]],

  /**
   * Check if the bid is a valid zone ID in either number or string form
   * @param {object} bid the ucfunnel bid to validate
   * @return boolean for whether or not a bid is valid
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    var isVideoMediaType = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.video');
    var videoContext = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.video.context');

    if (_typeof(bid.params) !== 'object' || typeof bid.params.adid != 'string') {
      return false;
    }

    if (isVideoMediaType && videoContext === 'outstream') {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]('Warning: outstream video is not supported yet');
      return false;
    }

    return true;
  },

  /**
   * @param {BidRequest[]} bidRequests
   * @param {*} bidderRequest
   * @return {ServerRequest}
   */
  buildRequests: function buildRequests(bids, bidderRequest) {
    return bids.map(function (bid) {
      return {
        method: 'GET',
        url: location.protocol + spec.ENDPOINT,
        data: getRequestData(bid, bidderRequest),
        bidRequest: bid
      };
    });
  },

  /**
   * Format ucfunnel responses as Prebid bid responses
   * @param {ucfunnelResponseObj} ucfunnelResponse A successful response from ucfunnel.
   * @return {Bid[]} An array of formatted bids.
  */
  interpretResponse: function interpretResponse(ucfunnelResponseObj, request) {
    var bidRequest = request.bidRequest;
    var ad = ucfunnelResponseObj ? ucfunnelResponseObj.body : {};
    var videoPlayerSize = parseSizes(bidRequest);
    var bid = {
      requestId: bidRequest.bidId,
      cpm: ad.cpm || 0,
      creativeId: ad.ad_id,
      dealId: ad.deal || null,
      currency: 'USD',
      netRevenue: true,
      ttl: 1800
    };

    if (ad.creative_type) {
      bid.mediaType = ad.creative_type;
    }

    switch (ad.creative_type) {
      case __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["c" /* NATIVE */]:
        var nativeAd = ad.native;

        _extends(bid, {
          width: 1,
          height: 1,
          native: {
            title: nativeAd.title,
            body: nativeAd.desc,
            cta: nativeAd.ctatext,
            sponsoredBy: nativeAd.sponsored,
            image: nativeAd.image || nativeAd.image.url,
            icon: nativeAd.icon || nativeAd.icon.url,
            clickUrl: nativeAd.clickUrl,
            impressionTrackers: nativeAd.impressionTrackers
          }
        });

        break;

      case __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */]:
        _extends(bid, {
          vastUrl: ad.vastUrl,
          vastXml: ad.vastXml
        });

        if (videoPlayerSize && videoPlayerSize.length === 2) {
          _extends(bid, {
            width: videoPlayerSize[0],
            height: videoPlayerSize[1]
          });
        }

        break;

      case __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */]:
      default:
        _extends(bid, {
          width: ad.width,
          height: ad.height,
          ad: ad.adm
        });

    }

    return [bid];
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    if (syncOptions.iframeEnabled) {
      return [{
        type: 'iframe',
        url: '//cdn.aralego.com/ucfad/cookie/sync.html'
      }];
    } else if (syncOptions.pixelEnabled) {
      return [{
        type: 'image',
        url: '//sync.aralego.com/idSync'
      }];
    }
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

function transformSizes(requestSizes) {
  if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](requestSizes) && requestSizes.length === 2 && !__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](requestSizes[0])) {
    return [parseInt(requestSizes[0], 10), parseInt(requestSizes[1], 10)];
  } else if (_typeof(requestSizes) === 'object' && requestSizes.length) {
    return requestSizes[0];
  }
}

function parseSizes(bid) {
  var params = bid.params;

  if (bid.mediaType === __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */]) {
    var size = [];

    if (params.video && params.video.playerWidth && params.video.playerHeight) {
      size = [params.video.playerWidth, params.video.playerHeight];
      return size;
    }
  }

  return transformSizes(bid.sizes);
}

function getRequestData(bid, bidderRequest) {
  var size = parseSizes(bid);
  var loc = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowLocation"]();
  var host = loc.host;
  var page = loc.href;
  var ref = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowReferrer"]();
  var language = navigator.language;
  var dnt = navigator.doNotTrack == 'yes' || navigator.doNotTrack == '1' || navigator.msDoNotTrack == '1' ? 1 : 0;
  var videoContext = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.video.context');
  var videoMediaType = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.video');
  var userIdTdid = bid.userId && bid.userId.tdid ? bid.userId.tdid : ''; // general bid data

  var bidData = {
    ver: VER,
    ifr: 0,
    bl: language,
    je: 1,
    dnt: dnt,
    host: host,
    u: page,
    ru: ref,
    adid: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('adid', bid.params),
    w: size[0],
    h: size[1],
    tdid: userIdTdid
  };

  if (bid.mediaType === 'video' || videoMediaType) {
    switch (videoContext) {
      case 'outstream':
        bidData.atype = VIDEO_CONTEXT.OUSTREAM;
        break;

      case 'instream':
      default:
        bidData.atype = VIDEO_CONTEXT.INSTREAM;
        break;
    }
  }

  if (bidderRequest && bidderRequest.gdprConsent) {
    _extends(bidData, {
      gdpr: bidderRequest.gdprConsent.gdprApplies ? 1 : 0,
      euconsent: bidderRequest.gdprConsent.consentString
    });
  }

  return bidData;
}

/***/ })

},[622]);