pbjsChunk([84],{

/***/ 574:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(575);


/***/ }),

/***/ 575:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_includes__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_includes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__ = __webpack_require__(2);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }





var VIDEO_TARGETING = ['mimes', 'minduration', 'maxduration', 'protocols', 'startdelay', 'linearity', 'skip', 'delivery', 'pos', 'api', 'ext', 'battr'];
var BANNER_TARGETING = ['battr', 'btype', 'pos', 'mimes', 'ext'];
var SITE_TARGETING = ['name', 'domain', 'cat', 'keywords', 'content'];
var APP_TARGETING = ['name', 'bundle', 'domain', 'storeUrl', 'cat', 'ver', 'keywords', 'content'];
var spec = {
  code: 'somo',
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["d" /* VIDEO */]],
  aliases: ['somoaudience'],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid && bid.params && bid.params.placementId);
  },
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    return bidRequests.map(function (bidRequest) {
      var da = openRtbRequest(bidRequest, bidderRequest);
      return {
        method: 'POST',
        url: '//publisher-east.mobileadtrading.com/rtb/bid?s=' + bidRequest.params.placementId.toString(),
        data: da,
        bidRequest: bidRequest
      };
    });
  },
  interpretResponse: function interpretResponse(response, request) {
    return bidResponseAvailable(request, response);
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses, gdprConsent) {
    var syncs = [];
    var url = '//publisher-east.mobileadtrading.com/usersync';

    if (syncOptions.pixelEnabled) {
      if (gdprConsent && typeof gdprConsent.consentString === 'string') {
        // add 'gdpr' only if 'gdprApplies' is defined
        if (typeof gdprConsent.gdprApplies === 'boolean') {
          url += "?gdpr=".concat(Number(gdprConsent.gdprApplies), "&gdpr_consent=").concat(gdprConsent.consentString);
        }
      }

      syncs.push({
        type: 'image',
        url: url
      });
    }

    return syncs;
  }
};

function bidResponseAvailable(bidRequest, bidResponse) {
  var bidResponses = [];

  if (bidResponse.body) {
    var bidData = bidResponse.body.seatbid[0].bid[0];
    var bid = {
      requestId: bidData.impid,
      cpm: bidData.price,
      width: bidData.w,
      height: bidData.h,
      ad: bidData.adm,
      ttl: 360,
      creativeId: bidData.crid,
      adId: bidData.impid,
      netRevenue: false,
      currency: 'USD'
    };

    if (isVideo(bidRequest.bidRequest)) {
      bid.vastXml = bidData.adm;
      bid.mediaType = 'video';
    } else {
      bid.ad = bidData.adm;
      bid.mediaType = 'banner';
    }

    bidResponses.push(bid);
  }

  return bidResponses;
}

function openRtbRequest(bidRequest, bidderRequest) {
  var openRtbRequest = {
    id: bidRequest.bidderRequestId,
    imp: [openRtbImpression(bidRequest)],
    at: 1,
    tmax: 400,
    site: openRtbSite(bidRequest),
    app: openRtbApp(bidRequest),
    device: openRtbDevice(),
    bcat: openRtbBCat(bidRequest),
    badv: openRtbBAdv(bidRequest),
    ext: {
      prebid: "2.37.0"
    }
  };

  if (bidderRequest != undefined) {
    openRtbRequest = populateOpenRtbGdpr(bidderRequest.gdprConsent, openRtbRequest);
  }

  return openRtbRequest;
}

function populateOpenRtbGdpr(gdpr, bidRequest) {
  if (gdpr && bidRequest && 'gdprApplies' in gdpr) {
    if (!('reqs' in bidRequest)) {
      bidRequest.reqs = {};
    }

    if (!('ext' in bidRequest.reqs)) {
      bidRequest.reqs.ext = {};
    }

    bidRequest.reqs.ext.gdpr = gdpr.gdprApplies;

    if ('consentString' in gdpr) {
      if (!('user' in bidRequest)) {
        bidRequest.user = {};
      }

      if (!('ext' in bidRequest.user)) {
        bidRequest.user.ext = {};
      }

      bidRequest.user.ext.consent = gdpr.consentString;
    }
  }

  return bidRequest;
}

function openRtbImpression(bidRequest) {
  var imp = {
    'id': bidRequest.bidId,
    bidfloor: bidRequest.params.bidfloor || 0
  };

  if (isVideo(bidRequest)) {
    imp.video = {};

    if (bidRequest.sizes) {
      var sizes = getSizes(bidRequest.sizes);
      imp.video.w = sizes[0];
      imp.video.h = sizes[1];
    }

    if (bidRequest.params.video) {
      Object.keys(bidRequest.params.video).filter(function (param) {
        return __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_includes___default()(VIDEO_TARGETING, param);
      }).forEach(function (param) {
        return imp.video[param] = bidRequest.params.video[param];
      });
    }
  } else {
    imp.banner = {
      topframe: 0
    };

    if (bidRequest.sizes) {
      var _sizes = getSizes(bidRequest.sizes);

      imp.banner.w = _sizes[0];
      imp.banner.h = _sizes[1];
    }

    if (bidRequest.params.banner) {
      Object.keys(bidRequest.params.banner).filter(function (param) {
        return __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_includes___default()(BANNER_TARGETING, param);
      }).forEach(function (param) {
        return imp.banner[param] = bidRequest.params.banner[param];
      });
    }
  }

  return imp;
}

function isApp(bidRequest) {
  if (bidRequest.params.app) {
    return true;
  } else {
    return false;
  }
}

function openRtbSite(bidRequest) {
  if (!isApp(bidRequest)) {
    var site = {
      ref: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowReferrer"](),
      page: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowLocation"]().href
    };

    if (bidRequest.params.site) {
      Object.keys(bidRequest.params.site).filter(function (param) {
        return __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_includes___default()(SITE_TARGETING, param);
      }).forEach(function (param) {
        return site[param] = bidRequest.params.site[param];
      });
    }

    if (site.domain == undefined) {
      site.domain = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowLocation"]().hostname;
    }

    return site;
  } else {
    return null;
  }
}

function openRtbApp(bidRequest) {
  if (isApp(bidRequest)) {
    var app = {};
    Object.keys(bidRequest.params.app).filter(function (param) {
      return __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_includes___default()(APP_TARGETING, param);
    }).forEach(function (param) {
      return app[param] = bidRequest.params.app[param];
    });
    return app;
  } else {
    return null;
  }
}

function openRtbDevice() {
  return {
    ip: 'check',
    ua: navigator.userAgent,
    language: navigator.language || navigator.browserLanguage || navigator.userLanguage || navigator.systemLanguage
  };
}

function openRtbBCat(bidRequest) {
  if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](bidRequest.params.bcat)) {
    return bidRequest.params.bcat;
  }

  return [];
}

function openRtbBAdv(bidRequest) {
  if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](bidRequest.params.badv)) {
    return bidRequest.params.badv;
  }

  return [];
}

function isVideo(format) {
  return __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](format, 'mediaTypes.video') || format.mediaType == 'video';
}
/* Turn bid request sizes into compatible format */


function getSizes(requestSizes) {
  var width = 0;
  var height = 0;

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](requestSizes) && requestSizes.length === 2 && !__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](requestSizes[0])) {
    width = parseInt(requestSizes[0], 10);
    height = parseInt(requestSizes[1], 10);
  } else if (_typeof(requestSizes) === 'object') {
    for (var i = 0; i < requestSizes.length; i++) {
      var size = requestSizes[i];
      width = parseInt(size[0], 10);
      height = parseInt(size[1], 10);
      break;
    }
  }

  return [width, height];
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[574]);