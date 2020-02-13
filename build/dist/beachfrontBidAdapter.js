pbjsChunk([238],{

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(207);


/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VIDEO_ENDPOINT", function() { return VIDEO_ENDPOINT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BANNER_ENDPOINT", function() { return BANNER_ENDPOINT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OUTSTREAM_SRC", function() { return OUTSTREAM_SRC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VIDEO_TARGETING", function() { return VIDEO_TARGETING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_MIMES", function() { return DEFAULT_MIMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_url__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_Renderer__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_library_fn_array_find__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_library_fn_array_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_library_fn_array_find__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_library_fn_array_includes__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_library_fn_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_library_fn_array_includes__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var ADAPTER_VERSION = '1.7';
var ADAPTER_NAME = 'BFIO_PREBID';
var OUTSTREAM = 'outstream';
var VIDEO_ENDPOINT = 'https://reachms.bfmio.com/bid.json?exchange_id=';
var BANNER_ENDPOINT = 'https://display.bfmio.com/prebid_display';
var OUTSTREAM_SRC = '//player-cdn.beachfrontmedia.com/playerapi/loader/outstream.js';
var VIDEO_TARGETING = ['mimes', 'playbackmethod', 'maxduration', 'placement'];
var DEFAULT_MIMES = ['video/mp4', 'application/javascript'];
var appId = '';
var spec = {
  code: 'beachfront',
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_5__src_mediaTypes__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_5__src_mediaTypes__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(isVideoBidValid(bid) || isBannerBidValid(bid));
  },
  buildRequests: function buildRequests(bids, bidderRequest) {
    var requests = [];
    var videoBids = bids.filter(function (bid) {
      return isVideoBidValid(bid);
    });
    var bannerBids = bids.filter(function (bid) {
      return isBannerBidValid(bid);
    });
    videoBids.forEach(function (bid) {
      appId = getVideoBidParam(bid, 'appId');
      requests.push({
        method: 'POST',
        url: VIDEO_ENDPOINT + appId,
        data: createVideoRequestData(bid, bidderRequest),
        bidRequest: bid
      });
    });

    if (bannerBids.length) {
      appId = getBannerBidParam(bannerBids[0], 'appId');
      requests.push({
        method: 'POST',
        url: BANNER_ENDPOINT,
        data: createBannerRequestData(bannerBids, bidderRequest),
        bidRequest: bannerBids
      });
    }

    return requests;
  },
  interpretResponse: function interpretResponse(response, _ref) {
    var bidRequest = _ref.bidRequest;
    response = response.body;

    if (isVideoBid(bidRequest)) {
      if (!response || !response.url || !response.bidPrice) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]("No valid video bids from ".concat(spec.code, " bidder"));
        return [];
      }

      var sizes = getVideoSizes(bidRequest);
      var firstSize = getFirstSize(sizes);
      var context = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest, 'mediaTypes.video.context');
      return {
        requestId: bidRequest.bidId,
        bidderCode: spec.code,
        vastUrl: response.url,
        cpm: response.bidPrice,
        width: firstSize.w,
        height: firstSize.h,
        creativeId: response.cmpId,
        renderer: context === OUTSTREAM ? createRenderer(bidRequest) : null,
        mediaType: __WEBPACK_IMPORTED_MODULE_5__src_mediaTypes__["d" /* VIDEO */],
        currency: 'USD',
        netRevenue: true,
        ttl: 300
      };
    } else {
      if (!response || !response.length) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]("No valid banner bids from ".concat(spec.code, " bidder"));
        return [];
      }

      return response.filter(function (bid) {
        return bid.adm;
      }).map(function (bid) {
        var request = __WEBPACK_IMPORTED_MODULE_6_core_js_library_fn_array_find___default()(bidRequest, function (req) {
          return req.adUnitCode === bid.slot;
        });
        return {
          requestId: request.bidId,
          bidderCode: spec.code,
          ad: bid.adm,
          creativeId: bid.crid,
          cpm: bid.price,
          width: bid.w,
          height: bid.h,
          mediaType: __WEBPACK_IMPORTED_MODULE_5__src_mediaTypes__["b" /* BANNER */],
          currency: 'USD',
          netRevenue: true,
          ttl: 300
        };
      });
    }
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    var serverResponses = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var gdprConsent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var syncs = [];
    var gdprApplies = gdprConsent.gdprApplies,
        consentString = gdprConsent.consentString;
    var bannerResponse = __WEBPACK_IMPORTED_MODULE_6_core_js_library_fn_array_find___default()(serverResponses, function (res) {
      return __WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](res.body);
    });

    if (bannerResponse) {
      if (syncOptions.iframeEnabled) {
        bannerResponse.body.filter(function (bid) {
          return bid.sync;
        }).forEach(function (bid) {
          syncs.push({
            type: 'iframe',
            url: bid.sync
          });
        });
      }
    } else if (syncOptions.iframeEnabled) {
      syncs.push({
        type: 'iframe',
        url: "https://sync.bfmio.com/sync_iframe?ifg=1&id=".concat(appId, "&gdpr=").concat(gdprApplies ? 1 : 0, "&gc=").concat(consentString || '', "&gce=1")
      });
    } else if (syncOptions.pixelEnabled) {
      syncs.push({
        type: 'image',
        url: "https://sync.bfmio.com/syncb?pid=144&id=".concat(appId, "&gdpr=").concat(gdprApplies ? 1 : 0, "&gc=").concat(consentString || '', "&gce=1")
      });
    }

    return syncs;
  }
};

function createRenderer(bidRequest) {
  var renderer = __WEBPACK_IMPORTED_MODULE_4__src_Renderer__["a" /* Renderer */].install({
    id: bidRequest.bidId,
    url: OUTSTREAM_SRC,
    loaded: false
  });
  renderer.setRender(function (bid) {
    bid.renderer.push(function () {
      window.Beachfront.Player(bid.adUnitCode, {
        adTagUrl: bid.vastUrl,
        width: bid.width,
        height: bid.height,
        expandInView: getPlayerBidParam(bidRequest, 'expandInView', false),
        collapseOnComplete: getPlayerBidParam(bidRequest, 'collapseOnComplete', true),
        progressColor: getPlayerBidParam(bidRequest, 'progressColor')
      });
    });
  });
  return renderer;
}

function getFirstSize(sizes) {
  return sizes && sizes.length ? sizes[0] : {
    w: undefined,
    h: undefined
  };
}

function parseSizes(sizes) {
  return __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](sizes).map(function (size) {
    var _size$split = size.split('x'),
        _size$split2 = _slicedToArray(_size$split, 2),
        width = _size$split2[0],
        height = _size$split2[1];

    return {
      w: parseInt(width, 10) || undefined,
      h: parseInt(height, 10) || undefined
    };
  });
}

function getVideoSizes(bid) {
  return parseSizes(__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.video.playerSize') || bid.sizes);
}

function getBannerSizes(bid) {
  return parseSizes(__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.banner.sizes') || bid.sizes);
}

function getOsVersion() {
  var clientStrings = [{
    s: 'Android',
    r: /Android/
  }, {
    s: 'iOS',
    r: /(iPhone|iPad|iPod)/
  }, {
    s: 'Mac OS X',
    r: /Mac OS X/
  }, {
    s: 'Mac OS',
    r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/
  }, {
    s: 'Linux',
    r: /(Linux|X11)/
  }, {
    s: 'Windows 10',
    r: /(Windows 10.0|Windows NT 10.0)/
  }, {
    s: 'Windows 8.1',
    r: /(Windows 8.1|Windows NT 6.3)/
  }, {
    s: 'Windows 8',
    r: /(Windows 8|Windows NT 6.2)/
  }, {
    s: 'Windows 7',
    r: /(Windows 7|Windows NT 6.1)/
  }, {
    s: 'Windows Vista',
    r: /Windows NT 6.0/
  }, {
    s: 'Windows Server 2003',
    r: /Windows NT 5.2/
  }, {
    s: 'Windows XP',
    r: /(Windows NT 5.1|Windows XP)/
  }, {
    s: 'UNIX',
    r: /UNIX/
  }, {
    s: 'Search Bot',
    r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
  }];
  var cs = __WEBPACK_IMPORTED_MODULE_6_core_js_library_fn_array_find___default()(clientStrings, function (cs) {
    return cs.r.test(navigator.userAgent);
  });
  return cs ? cs.s : 'unknown';
}

function isMobile() {
  return /(ios|ipod|ipad|iphone|android)/i.test(navigator.userAgent);
}

function isConnectedTV() {
  return /(smart[-]?tv|hbbtv|appletv|googletv|hdmi|netcast\.tv|viera|nettv|roku|\bdtv\b|sonydtv|inettvbrowser|\btv\b)/i.test(navigator.userAgent);
}

function getDoNotTrack() {
  return navigator.doNotTrack === '1' || window.doNotTrack === '1' || navigator.msDoNoTrack === '1' || navigator.doNotTrack === 'yes';
}

function isVideoBid(bid) {
  return __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.video');
}

function isBannerBid(bid) {
  return __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.banner') || !isVideoBid(bid);
}

function getVideoBidParam(bid, key) {
  return __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'params.video.' + key) || __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'params.' + key);
}

function getBannerBidParam(bid, key) {
  return __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'params.banner.' + key) || __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'params.' + key);
}

function getPlayerBidParam(bid, key, defaultValue) {
  var param = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'params.player.' + key);
  return param === undefined ? defaultValue : param;
}

function isVideoBidValid(bid) {
  return isVideoBid(bid) && getVideoBidParam(bid, 'appId') && getVideoBidParam(bid, 'bidfloor');
}

function isBannerBidValid(bid) {
  return isBannerBid(bid) && getBannerBidParam(bid, 'appId') && getBannerBidParam(bid, 'bidfloor');
}

function getTopWindowLocation(bidderRequest) {
  var url = bidderRequest && bidderRequest.refererInfo && bidderRequest.refererInfo.referer;
  return Object(__WEBPACK_IMPORTED_MODULE_1__src_url__["c" /* parse */])(__WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('pageUrl') || url, {
    decodeSearchAsString: true
  });
}

function getTopWindowReferrer() {
  try {
    return window.top.document.referrer;
  } catch (e) {
    return '';
  }
}

function getVideoTargetingParams(bid) {
  return Object.keys(Object(bid.params.video)).filter(function (param) {
    return __WEBPACK_IMPORTED_MODULE_7_core_js_library_fn_array_includes___default()(VIDEO_TARGETING, param);
  }).reduce(function (obj, param) {
    obj[param] = bid.params.video[param];
    return obj;
  }, {});
}

function createVideoRequestData(bid, bidderRequest) {
  var sizes = getVideoSizes(bid);
  var firstSize = getFirstSize(sizes);
  var video = getVideoTargetingParams(bid);
  var appId = getVideoBidParam(bid, 'appId');
  var bidfloor = getVideoBidParam(bid, 'bidfloor');
  var topLocation = getTopWindowLocation(bidderRequest);
  var payload = {
    isPrebid: true,
    appId: appId,
    domain: document.location.hostname,
    id: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getUniqueIdentifierStr"](),
    imp: [{
      video: _extends({
        w: firstSize.w,
        h: firstSize.h,
        mimes: DEFAULT_MIMES
      }, video),
      bidfloor: bidfloor,
      secure: topLocation.protocol === 'https:' ? 1 : 0
    }],
    site: {
      page: topLocation.href,
      domain: topLocation.hostname
    },
    device: {
      ua: navigator.userAgent,
      language: navigator.language,
      devicetype: isMobile() ? 1 : isConnectedTV() ? 3 : 2,
      dnt: getDoNotTrack() ? 1 : 0,
      js: 1,
      geo: {}
    },
    regs: {
      ext: {}
    },
    user: {
      ext: {}
    },
    cur: ['USD']
  };

  if (bidderRequest && bidderRequest.gdprConsent) {
    var _bidderRequest$gdprCo = bidderRequest.gdprConsent,
        gdprApplies = _bidderRequest$gdprCo.gdprApplies,
        consentString = _bidderRequest$gdprCo.consentString;
    payload.regs.ext.gdpr = gdprApplies ? 1 : 0;
    payload.user.ext.consent = consentString;
  }

  if (bid.userId && bid.userId.tdid) {
    payload.user.ext.eids = [{
      source: 'adserver.org',
      uids: [{
        id: bid.userId.tdid,
        ext: {
          rtiPartner: 'TDID'
        }
      }]
    }];
  }

  return payload;
}

function createBannerRequestData(bids, bidderRequest) {
  var topLocation = getTopWindowLocation(bidderRequest);
  var topReferrer = getTopWindowReferrer();
  var slots = bids.map(function (bid) {
    return {
      slot: bid.adUnitCode,
      id: getBannerBidParam(bid, 'appId'),
      bidfloor: getBannerBidParam(bid, 'bidfloor'),
      sizes: getBannerSizes(bid)
    };
  });
  var payload = {
    slots: slots,
    page: topLocation.href,
    domain: topLocation.hostname,
    search: topLocation.search,
    secure: topLocation.protocol.indexOf('https') === 0 ? 1 : 0,
    referrer: topReferrer,
    ua: navigator.userAgent,
    deviceOs: getOsVersion(),
    isMobile: isMobile() ? 1 : 0,
    dnt: getDoNotTrack() ? 1 : 0,
    adapterVersion: ADAPTER_VERSION,
    adapterName: ADAPTER_NAME
  };

  if (bidderRequest && bidderRequest.gdprConsent) {
    var _bidderRequest$gdprCo2 = bidderRequest.gdprConsent,
        gdprApplies = _bidderRequest$gdprCo2.gdprApplies,
        consentString = _bidderRequest$gdprCo2.consentString;
    payload.gdpr = gdprApplies ? 1 : 0;
    payload.gdprConsent = consentString;
  }

  if (bids[0] && bids[0].userId && bids[0].userId.tdid) {
    payload.tdid = bids[0].userId.tdid;
  }

  return payload;
}

Object(__WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[206]);