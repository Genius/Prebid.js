pbjsChunk([197],{

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(143);


/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_library_fn_array_includes__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_library_fn_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_library_fn_array_includes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_url__ = __webpack_require__(9);






/*
 * In case you're AdKernel whitelable platform's client who needs branded adapter to
 * work with Adkernel platform - DO NOT COPY THIS ADAPTER UNDER NEW NAME
 *
 * Please contact prebid@adkernel.com and we'll add your adapter as an alias.
 */

var VIDEO_TARGETING = ['mimes', 'minduration', 'maxduration', 'protocols', 'startdelay', 'linearity', 'boxingallowed', 'playbackmethod', 'delivery', 'pos', 'api', 'ext'];
var VERSION = '1.3';
/**
 * Adapter for requesting bids from AdKernel white-label display platform
 */

var spec = {
  code: 'adkernel',
  aliases: ['headbidding', 'adsolut', 'oftmediahb', 'audiencemedia', 'waardex_ak', 'roqoon'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["d" /* VIDEO */]],
  isBidRequestValid: function isBidRequestValid(bidRequest) {
    return 'params' in bidRequest && typeof bidRequest.params.host !== 'undefined' && 'zoneId' in bidRequest.params && !isNaN(Number(bidRequest.params.zoneId)) && bidRequest.params.zoneId > 0 && bidRequest.mediaTypes && (bidRequest.mediaTypes.banner || bidRequest.mediaTypes.video);
  },
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var impDispatch = dispatchImps(bidRequests, bidderRequest.refererInfo);
    var gdprConsent = bidderRequest.gdprConsent,
        auctionId = bidderRequest.auctionId,
        refererInfo = bidderRequest.refererInfo,
        timeout = bidderRequest.timeout;
    var requests = [];
    Object.keys(impDispatch).forEach(function (host) {
      Object.keys(impDispatch[host]).forEach(function (zoneId) {
        var request = buildRtbRequest(impDispatch[host][zoneId], auctionId, gdprConsent, refererInfo, timeout);
        requests.push({
          method: 'POST',
          url: "https://".concat(host, "/hb?zone=").concat(zoneId, "&v=").concat(VERSION),
          data: JSON.stringify(request)
        });
      });
    });
    return requests;
  },
  interpretResponse: function interpretResponse(serverResponse, request) {
    var response = serverResponse.body;

    if (!response.seatbid) {
      return [];
    }

    var rtbRequest = JSON.parse(request.data);
    var rtbBids = response.seatbid.map(function (seatbid) {
      return seatbid.bid;
    }).reduce(function (a, b) {
      return a.concat(b);
    }, []);
    return rtbBids.map(function (rtbBid) {
      var imp = __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find___default()(rtbRequest.imp, function (imp) {
        return imp.id === rtbBid.impid;
      });
      var prBid = {
        requestId: rtbBid.impid,
        cpm: rtbBid.price,
        creativeId: rtbBid.crid,
        currency: 'USD',
        ttl: 360,
        netRevenue: true
      };

      if ('banner' in imp) {
        prBid.mediaType = __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */];
        prBid.width = rtbBid.w;
        prBid.height = rtbBid.h;
        prBid.ad = formatAdMarkup(rtbBid);
      }

      if ('video' in imp) {
        prBid.mediaType = __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["d" /* VIDEO */];
        prBid.vastUrl = rtbBid.nurl;
        prBid.width = imp.video.w;
        prBid.height = imp.video.h;
      }

      return prBid;
    });
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    if (!syncOptions.iframeEnabled || !serverResponses || serverResponses.length === 0) {
      return [];
    }

    return serverResponses.filter(function (rsp) {
      return rsp.body && rsp.body.ext && rsp.body.ext.adk_usersync;
    }).map(function (rsp) {
      return rsp.body.ext.adk_usersync;
    }).reduce(function (a, b) {
      return a.concat(b);
    }, []).map(function (syncUrl) {
      return {
        type: 'iframe',
        url: syncUrl
      };
    });
  }
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__["registerBidder"])(spec);
/**
 *  Dispatch impressions by ad network host and zone
 */

function dispatchImps(bidRequests, refererInfo) {
  var secure = refererInfo && refererInfo.referer.indexOf('https:') === 0;
  return bidRequests.map(function (bidRequest) {
    return buildImp(bidRequest, secure);
  }).reduce(function (acc, curr, index) {
    var bidRequest = bidRequests[index];
    var _bidRequest$params = bidRequest.params,
        zoneId = _bidRequest$params.zoneId,
        host = _bidRequest$params.host;
    acc[host] = acc[host] || {};
    acc[host][zoneId] = acc[host][zoneId] || [];
    acc[host][zoneId].push(curr);
    return acc;
  }, {});
}
/**
 *  Builds parameters object for single impression
 */


function buildImp(bidRequest, secure) {
  var imp = {
    'id': bidRequest.bidId,
    'tagid': bidRequest.adUnitCode
  };

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest, "mediaTypes.banner")) {
    var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getAdUnitSizes"](bidRequest);
    imp.banner = {
      format: sizes.map(function (wh) {
        return __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseGPTSingleSizeArrayToRtbSize"](wh);
      }),
      topframe: 0
    };
  } else if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest, 'mediaTypes.video')) {
    var _sizes = bidRequest.mediaTypes.video.playerSize || [];

    imp.video = __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseGPTSingleSizeArrayToRtbSize"](_sizes[0]) || {};

    if (bidRequest.params.video) {
      Object.keys(bidRequest.params.video).filter(function (key) {
        return __WEBPACK_IMPORTED_MODULE_4_core_js_library_fn_array_includes___default()(VIDEO_TARGETING, key);
      }).forEach(function (key) {
        return imp.video[key] = bidRequest.params.video[key];
      });
    }
  }

  if (secure) {
    imp.secure = 1;
  }

  return imp;
}
/**
 * Builds complete rtb request
 * @param imps collection of impressions
 * @param auctionId
 * @param gdprConsent
 * @param refInfo
 * @param timeout
 * @return Object complete rtb request
 */


function buildRtbRequest(imps, auctionId, gdprConsent, refInfo, timeout) {
  var req = {
    'id': auctionId,
    'imp': imps,
    'site': createSite(refInfo),
    'at': 1,
    'device': {
      'ip': 'caller',
      'ua': 'caller',
      'js': 1,
      'language': getLanguage()
    },
    'tmax': parseInt(timeout),
    'ext': {
      'adk_usersync': 1
    }
  };

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["getDNT"]()) {
    req.device.dnt = 1;
  }

  if (gdprConsent && gdprConsent.gdprApplies !== undefined) {
    req.regs = {
      ext: {
        gdpr: Number(gdprConsent.gdprApplies)
      }
    };
  }

  if (gdprConsent && gdprConsent.consentString !== undefined) {
    req.user = {
      ext: {
        consent: gdprConsent.consentString
      }
    };
  }

  return req;
}

function getLanguage() {
  var language = navigator.language ? 'language' : 'userLanguage';
  return navigator[language].split('-')[0];
}
/**
 * Creates site description object
 */


function createSite(refInfo) {
  var url = Object(__WEBPACK_IMPORTED_MODULE_5__src_url__["c" /* parse */])(refInfo.referer);
  var site = {
    'domain': url.hostname,
    'page': url.protocol + '://' + url.hostname + url.pathname
  };

  if (self === top && document.referrer) {
    site.ref = document.referrer;
  }

  var keywords = document.getElementsByTagName('meta')['keywords'];

  if (keywords && keywords.content) {
    site.keywords = keywords.content;
  }

  return site;
}
/**
 *  Format creative with optional nurl call
 *  @param bid rtb Bid object
 */


function formatAdMarkup(bid) {
  var adm = bid.adm;

  if ('nurl' in bid) {
    adm += __WEBPACK_IMPORTED_MODULE_0__src_utils__["createTrackPixelHtml"]("".concat(bid.nurl, "&px=1"));
  }

  return adm;
}

/***/ })

},[142]);