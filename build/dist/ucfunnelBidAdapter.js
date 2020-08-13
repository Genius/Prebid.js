pbjsChunk([76],{

/***/ 764:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(765);


/***/ }),

/***/ 765:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_storageManager_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_utils_js__ = __webpack_require__(0);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }





var storage = Object(__WEBPACK_IMPORTED_MODULE_2__src_storageManager_js__["b" /* getStorageManager */])();
var COOKIE_NAME = 'ucf_uid';
var VER = 'ADGENT_PREBID-2018011501';
var BIDDER_CODE = 'ucfunnel';
var VIDEO_CONTEXT = {
  INSTREAM: 0,
  OUSTREAM: 2
};
var spec = {
  code: BIDDER_CODE,
  ENDPOINT: 'https://hb.aralego.com/header',
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["c" /* NATIVE */]],

  /**
   * Check if the bid is a valid zone ID in either number or string form
   * @param {object} bid the ucfunnel bid to validate
   * @return boolean for whether or not a bid is valid
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    var isVideoMediaType = bid.mediaTypes && bid.mediaTypes.video != null;
    var videoContext = bid.mediaTypes && bid.mediaTypes.video != null ? bid.mediaTypes.video.videoContext : '';

    if (_typeof(bid.params) !== 'object' || typeof bid.params.adid != 'string') {
      return false;
    }

    if (isVideoMediaType && videoContext === 'outstream') {
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
        url: spec.ENDPOINT,
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
      creativeId: ad.ad_id || bidRequest.params.adid,
      dealId: ad.deal || null,
      currency: 'USD',
      netRevenue: true,
      ttl: 1800
    };

    if (bidRequest.params && bidRequest.params.bidfloor && ad.cpm && ad.cpm < bidRequest.params.bidfloor) {
      bid.cpm = 0;
    }

    if (ad.creative_type) {
      bid.mediaType = ad.creative_type;
    }

    switch (ad.creative_type) {
      case __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["c" /* NATIVE */]:
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
            clickTrackers: nativeAd.clicktrackers ? nativeAd.clicktrackers : [],
            impressionTrackers: nativeAd.impressionTrackers
          }
        });

        break;

      case __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */]:
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

      case __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */]:
      default:
        var size = parseSizes(bidRequest);

        _extends(bid, {
          width: ad.width || size[0],
          height: ad.height || size[1],
          ad: ad.adm || ''
        });

    }

    return [bid];
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    if (syncOptions.iframeEnabled) {
      return [{
        type: 'iframe',
        url: 'https://cdn.aralego.net/ucfad/cookie/sync.html'
      }];
    } else if (syncOptions.pixelEnabled) {
      return [{
        type: 'image',
        url: 'https://sync.aralego.com/idSync'
      }];
    }
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

function transformSizes(requestSizes) {
  if (_typeof(requestSizes) === 'object' && requestSizes.length) {
    return requestSizes[0];
  }
}

function parseSizes(bid) {
  var params = bid.params;

  if (bid.mediaType === __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */]) {
    var size = [];

    if (params.video && params.video.playerWidth && params.video.playerHeight) {
      size = [params.video.playerWidth, params.video.playerHeight];
      return size;
    }
  }

  return transformSizes(bid.sizes);
}

function getSupplyChain(schain) {
  var supplyChain = '';

  if (schain != null && schain.nodes) {
    supplyChain = schain.ver + ',' + schain.complete;

    for (var i = 0; i < schain.nodes.length; i++) {
      supplyChain += '!';
      supplyChain += schain.nodes[i].asi ? encodeURIComponent(schain.nodes[i].asi) : '';
      supplyChain += ',';
      supplyChain += schain.nodes[i].sid ? encodeURIComponent(schain.nodes[i].sid) : '';
      supplyChain += ',';
      supplyChain += schain.nodes[i].hp ? encodeURIComponent(schain.nodes[i].hp) : '';
      supplyChain += ',';
      supplyChain += schain.nodes[i].rid ? encodeURIComponent(schain.nodes[i].rid) : '';
      supplyChain += ',';
      supplyChain += schain.nodes[i].name ? encodeURIComponent(schain.nodes[i].name) : '';
      supplyChain += ',';
      supplyChain += schain.nodes[i].domain ? encodeURIComponent(schain.nodes[i].domain) : '';
    }
  }

  return supplyChain;
}

function getRequestData(bid, bidderRequest) {
  var size = parseSizes(bid);
  var language = navigator.language;
  var dnt = navigator.doNotTrack == 'yes' || navigator.doNotTrack == '1' || navigator.msDoNotTrack == '1' ? 1 : 0;
  var userIdTdid = bid.userId && bid.userId.tdid ? bid.userId.tdid : '';
  var supplyChain = getSupplyChain(bid.schain); // general bid data

  var bidData = {
    ver: VER,
    ifr: 0,
    bl: language,
    je: 1,
    dnt: dnt,
    adid: bid.params.adid,
    tdid: userIdTdid,
    schain: supplyChain,
    fp: bid.params.bidfloor
  };

  try {
    bidData.host = window.top.location.hostname;
    bidData.u = window.top.location.href;
    bidData.xr = 0;
  } catch (e) {
    bidData.host = window.location.hostname;
    bidData.u = document.referrer || window.location.href;
    bidData.xr = 1;
  }

  if (window.location.ancestorOrigins && window.location.ancestorOrigins.length > 0) {
    bidData.ao = window.location.ancestorOrigins[window.location.ancestorOrigins.length - 1];
  }

  if (storage.cookiesAreEnabled()) {
    var ucfUid = '';

    if (storage.getCookie(COOKIE_NAME) != undefined) {
      ucfUid = storage.getCookie(COOKIE_NAME);
      bidData.ucfUid = ucfUid;
    } else {
      ucfUid = __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["generateUUID"]();
      bidData.ucfUid = ucfUid;
      storage.setCookie(COOKIE_NAME, ucfUid);
    }
  }

  if (size != undefined && size.length == 2) {
    bidData.w = size[0];
    bidData.h = size[1];
  }

  if (bidderRequest && bidderRequest.uspConsent) {
    _extends(bidData, {
      usprivacy: bidderRequest.uspConsent
    });
  }

  if (bid.mediaTypes && bid.mediaTypes.video != null) {
    var videoContext = bid.mediaTypes.video.context;

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

},[764]);