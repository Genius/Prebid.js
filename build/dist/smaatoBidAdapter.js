pbjsChunk([103],{

/***/ 696:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(697);


/***/ }),

/***/ 697:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__ = __webpack_require__(2);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





var BIDDER_CODE = 'smaato';
var SMAATO_ENDPOINT = 'https://prebid.ad.smaato.net/oapi/prebid';
var CLIENT = "prebid_js_4.2.0_1.0";
/**
* Transform BidRequest to OpenRTB-formatted BidRequest Object
* @param {Array<BidRequest>} validBidRequests
* @param {any} bidderRequest
* @returns {string}
*/

var buildOpenRtbBidRequestPayload = function buildOpenRtbBidRequestPayload(validBidRequests, bidderRequest) {
  /**
   * Turn incoming prebid sizes into openRtb format mapping.
   * @param {*} sizes in format [[10, 10], [20, 20]]
   * @returns array of openRtb format mappings [{w: 10, h: 10}, {w: 20, h: 20}]
   */
  var parseSizes = function parseSizes(sizes) {
    return sizes.map(function (size) {
      return {
        w: size[0],
        h: size[1]
      };
    });
  };

  var imp = validBidRequests.map(function (br) {
    var bannerMediaType = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](br, 'mediaTypes.banner');
    var videoMediaType = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](br, 'mediaTypes.video');
    var result = {
      id: br.bidId,
      tagid: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](br, 'params.adspaceId')
    };

    if (bannerMediaType) {
      var sizes = parseSizes(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getAdUnitSizes"](br));
      result.banner = {
        w: sizes[0].w,
        h: sizes[0].h,
        format: sizes
      };
    }

    if (videoMediaType) {
      result.video = {
        mimes: videoMediaType.mimes,
        minduration: videoMediaType.minduration,
        startdelay: videoMediaType.startdelay,
        linearity: videoMediaType.linearity,
        w: videoMediaType.playerSize[0][0],
        h: videoMediaType.playerSize[0][1],
        maxduration: videoMediaType.maxduration,
        skip: videoMediaType.skip,
        protocols: videoMediaType.protocols,
        ext: {
          rewarded: videoMediaType.ext && videoMediaType.ext.rewarded ? videoMediaType.ext.rewarded : 0
        },
        skipmin: videoMediaType.skipmin,
        api: videoMediaType.api
      };
    }

    return result;
  });
  var request = {
    id: bidderRequest.auctionId,
    at: 1,
    imp: imp,
    cur: ['USD'],
    tmax: bidderRequest.timeout,
    site: {
      id: window.location.hostname,
      publisher: {
        id: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](validBidRequests[0], 'params.publisherId')
      },
      domain: window.location.hostname,
      page: window.location.href,
      ref: bidderRequest.refererInfo.referer
    },
    device: {
      language: navigator && navigator.language ? navigator.language.split('-')[0] : '',
      ua: navigator.userAgent,
      dnt: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getDNT"]() ? 1 : 0,
      h: screen.height,
      w: screen.width
    },
    regs: {
      coppa: __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('coppa') === true ? 1 : 0,
      ext: {}
    },
    user: {
      ext: {}
    },
    ext: {
      client: CLIENT
    }
  };

  _extends(request.user, __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('fpd.user'));

  _extends(request.site, __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('fpd.context'));

  if (bidderRequest.gdprConsent && bidderRequest.gdprConsent.gdprApplies === true) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](request, 'regs.ext.gdpr', bidderRequest.gdprConsent.gdprApplies ? 1 : 0);
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](request, 'user.ext.consent', bidderRequest.gdprConsent.consentString);
  }

  if (bidderRequest.uspConsent !== undefined) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](request, 'regs.ext.us_privacy', bidderRequest.uspConsent);
  }

  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('[SMAATO] OpenRTB Request:', request);
  return JSON.stringify(request);
};

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */]],

  /**
      * Determines whether or not the given bid request is valid.
      *
      * @param {BidRequest} bid The bid params to validate.
      * @return boolean True if this is a valid bid, and false otherwise.
      */
  isBidRequestValid: function isBidRequestValid(bid) {
    return _typeof(bid.params) === 'object' && typeof bid.params.publisherId === 'string' && typeof bid.params.adspaceId === 'string';
  },

  /**
      * Make a server request from the list of BidRequests.
      *
      * @param {validBidRequests[]} - an array of bids
      * @return ServerRequest Info describing the request to the server.
      */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('[SMAATO] Client version:', CLIENT);
    return {
      method: 'POST',
      url: validBidRequests[0].params.endpoint || SMAATO_ENDPOINT,
      data: buildOpenRtbBidRequestPayload(validBidRequests, bidderRequest),
      options: {
        withCredentials: true,
        crossOrigin: true
      }
    };
  },

  /**
      * Unpack the response from the server into a list of bids.
      *
      * @param {ServerResponse} serverResponse A successful response from the server.
      * @return {Bid[]} An array of bids which were nested inside the server.
      */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    // response is empty (HTTP 204)
    if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](serverResponse.body)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('[SMAATO] Empty response body HTTP 204, no bids');
      return []; // no bids
    }

    var serverResponseHeaders = serverResponse.headers;
    var smtAdType = serverResponseHeaders.get('X-SMT-ADTYPE');
    var smtExpires = serverResponseHeaders.get('X-SMT-Expires');
    var ttlSec = 300;
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('[SMAATO] Expires:', smtExpires);

    if (smtExpires) {
      ttlSec = Math.floor((smtExpires - Date.now()) / 1000);
    }

    var res = serverResponse.body;
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('[SMAATO] OpenRTB Response:', res);
    var bids = [];
    res.seatbid.forEach(function (sb) {
      sb.bid.forEach(function (b) {
        var resultingBid = {
          requestId: b.impid,
          cpm: b.price || 0,
          width: b.w,
          height: b.h,
          ttl: ttlSec,
          creativeId: b.crid,
          dealId: b.dealid || null,
          netRevenue: true,
          currency: res.cur,
          meta: {
            advertiserDomains: b.adomain,
            networkName: b.bidderName,
            agencyId: sb.seat
          }
        };

        switch (smtAdType) {
          case 'Img':
            resultingBid.ad = createImgAd(b.adm);
            resultingBid.meta.mediaType = __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */];
            bids.push(resultingBid);
            break;

          case 'Richmedia':
            resultingBid.ad = createRichmediaAd(b.adm);
            resultingBid.meta.mediaType = __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */];
            bids.push(resultingBid);
            break;

          case 'Video':
            resultingBid.vastXml = b.adm;
            resultingBid.meta.mediaType = __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */];
            bids.push(resultingBid);
            break;

          default:
            __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('[SMAATO] Invalid ad type:', smtAdType);
        }
      });
    });
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('[SMAATO] Prebid bids:', bids);
    return bids;
  },

  /**
      * Register the user sync pixels which should be dropped after the auction.
      *
      * @param {SyncOptions} syncOptions Which user syncs are allowed?
      * @param {ServerResponse[]} serverResponses List of server's responses.
      * @return {UserSync[]} The user syncs which should be dropped.
      */
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses, gdprConsent, uspConsent) {
    var syncs = [];
    return syncs;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

var createImgAd = function createImgAd(adm) {
  var image = JSON.parse(adm).image;
  var clickEvent = '';
  image.clicktrackers.forEach(function (src) {
    clickEvent += "fetch(decodeURIComponent('".concat(encodeURIComponent(src), "'), {cache: 'no-cache'});");
  });
  var markup = "<div style=\"cursor:pointer\" onclick=\"".concat(clickEvent, ";window.open(decodeURIComponent('").concat(encodeURIComponent(image.img.ctaurl), "'));\"><img src=\"").concat(image.img.url, "\" width=\"").concat(image.img.w, "\" height=\"").concat(image.img.h, "\"/>");
  image.impressiontrackers.forEach(function (src) {
    markup += "<img src=\"".concat(src, "\" alt=\"\" width=\"0\" height=\"0\"/>");
  });
  return markup + '</div>';
};

var createRichmediaAd = function createRichmediaAd(adm) {
  var rich = JSON.parse(adm).richmedia;
  var clickEvent = '';
  rich.clicktrackers.forEach(function (src) {
    clickEvent += "fetch(decodeURIComponent('".concat(encodeURIComponent(src), "'), {cache: 'no-cache'});");
  });
  var markup = "<div onclick=\"".concat(clickEvent, "\">").concat(rich.mediadata.content);
  rich.impressiontrackers.forEach(function (src) {
    markup += "<img src=\"".concat(src, "\" alt=\"\" width=\"0\" height=\"0\"/>");
  });
  return markup + '</div>';
};

/***/ })

},[696]);