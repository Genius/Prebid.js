pbjsChunk([309],{

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(198);


/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_includes_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_config_js__ = __webpack_require__(3);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







/*
 * In case you're AdKernel whitelable platform's client who needs branded adapter to
 * work with Adkernel platform - DO NOT COPY THIS ADAPTER UNDER NEW NAME
 *
 * Please contact prebid@adkernel.com and we'll add your adapter as an alias.
 */

var VIDEO_TARGETING = Object.freeze(['mimes', 'minduration', 'maxduration', 'protocols', 'startdelay', 'linearity', 'boxingallowed', 'playbackmethod', 'delivery', 'pos', 'api', 'ext']);
var VERSION = '1.5';
var SYNC_IFRAME = 1;
var SYNC_IMAGE = 2;
var SYNC_TYPES = Object.freeze({
  1: 'iframe',
  2: 'image'
});
var NATIVE_MODEL = [{
  name: 'title',
  assetType: 'title'
}, {
  name: 'icon',
  assetType: 'img',
  type: 1
}, {
  name: 'image',
  assetType: 'img',
  type: 3
}, {
  name: 'body',
  assetType: 'data',
  type: 2
}, {
  name: 'body2',
  assetType: 'data',
  type: 10
}, {
  name: 'sponsoredBy',
  assetType: 'data',
  type: 1
}, {
  name: 'phone',
  assetType: 'data',
  type: 8
}, {
  name: 'address',
  assetType: 'data',
  type: 9
}, {
  name: 'price',
  assetType: 'data',
  type: 6
}, {
  name: 'salePrice',
  assetType: 'data',
  type: 7
}, {
  name: 'cta',
  assetType: 'data',
  type: 12
}, {
  name: 'rating',
  assetType: 'data',
  type: 3
}, {
  name: 'downloads',
  assetType: 'data',
  type: 5
}, {
  name: 'likes',
  assetType: 'data',
  type: 4
}, {
  name: 'displayUrl',
  assetType: 'data',
  type: 11
}];
var NATIVE_INDEX = NATIVE_MODEL.reduce(function (acc, val, idx) {
  acc[val.name] = _objectSpread({
    id: idx
  }, val);
  return acc;
}, {});
/**
 * Adapter for requesting bids from AdKernel white-label display platform
 */

var spec = {
  code: 'adkernel',
  aliases: ['headbidding', 'adsolut', 'oftmediahb', 'audiencemedia', 'waardex_ak', 'roqoon'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["c" /* NATIVE */]],

  /**
   * Validates bid request for adunit
   * @param bidRequest {BidRequest}
   * @returns {boolean}
   */
  isBidRequestValid: function isBidRequestValid(bidRequest) {
    return 'params' in bidRequest && typeof bidRequest.params.host !== 'undefined' && 'zoneId' in bidRequest.params && !isNaN(Number(bidRequest.params.zoneId)) && bidRequest.params.zoneId > 0 && bidRequest.mediaTypes && (bidRequest.mediaTypes.banner || bidRequest.mediaTypes.video || bidRequest.mediaTypes.native && validateNativeAdUnit(bidRequest.mediaTypes.native));
  },

  /**
   * Builds http request for each unique combination of adkernel host/zone
   * @param bidRequests {BidRequest[]}
   * @param bidderRequest {BidderRequest}
   * @returns {ServerRequest[]}
   */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var impDispatch = dispatchImps(bidRequests, bidderRequest.refererInfo);
    var requests = [];
    Object.keys(impDispatch).forEach(function (host) {
      Object.keys(impDispatch[host]).forEach(function (zoneId) {
        var request = buildRtbRequest(impDispatch[host][zoneId], bidderRequest);
        requests.push({
          method: 'POST',
          url: "https://".concat(host, "/hb?zone=").concat(zoneId, "&v=").concat(VERSION),
          data: JSON.stringify(request)
        });
      });
    });
    return requests;
  },

  /**
   * Parse response from adkernel backend
   * @param serverResponse {ServerResponse}
   * @param serverRequest {ServerRequest}
   * @returns {Bid[]}
   */
  interpretResponse: function interpretResponse(serverResponse, serverRequest) {
    var response = serverResponse.body;

    if (!response.seatbid) {
      return [];
    }

    var rtbRequest = JSON.parse(serverRequest.data);
    var rtbBids = response.seatbid.map(function (seatbid) {
      return seatbid.bid;
    }).reduce(function (a, b) {
      return a.concat(b);
    }, []);
    return rtbBids.map(function (rtbBid) {
      var imp = __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default()(rtbRequest.imp, function (imp) {
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
        prBid.mediaType = __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */];
        prBid.width = rtbBid.w;
        prBid.height = rtbBid.h;
        prBid.ad = formatAdMarkup(rtbBid);
      } else if ('video' in imp) {
        prBid.mediaType = __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */];
        prBid.vastUrl = rtbBid.nurl;
        prBid.width = imp.video.w;
        prBid.height = imp.video.h;
      } else if ('native' in imp) {
        prBid.mediaType = __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["c" /* NATIVE */];
        prBid.native = buildNativeAd(JSON.parse(rtbBid.adm));
      }

      return prBid;
    });
  },

  /**
   * Extracts user-syncs information from server response
   * @param syncOptions {SyncOptions}
   * @param serverResponses {ServerResponse[]}
   * @returns {UserSync[]}
   */
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    if (!serverResponses || serverResponses.length === 0 || !syncOptions.iframeEnabled && !syncOptions.pixelEnabled) {
      return [];
    }

    return serverResponses.filter(function (rsp) {
      return rsp.body && rsp.body.ext && rsp.body.ext.adk_usersync;
    }).map(function (rsp) {
      return rsp.body.ext.adk_usersync;
    }).reduce(function (a, b) {
      return a.concat(b);
    }, []).map(function (_ref) {
      var url = _ref.url,
          type = _ref.type;
      return {
        type: SYNC_TYPES[type],
        url: url
      };
    });
  }
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__["registerBidder"])(spec);
/**
 * Dispatch impressions by ad network host and zone
 * @param bidRequests {BidRequest[]}
 * @param refererInfo {refererInfo}
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
 *  Builds rtb imp object for single adunit
 *  @param bidRequest {BidRequest}
 *  @param secure {boolean}
 */


function buildImp(bidRequest, secure) {
  var imp = {
    'id': bidRequest.bidId,
    'tagid': bidRequest.adUnitCode
  };

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, "mediaTypes.banner")) {
    var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getAdUnitSizes"](bidRequest);
    imp.banner = {
      format: sizes.map(function (wh) {
        return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseGPTSingleSizeArrayToRtbSize"](wh);
      }),
      topframe: 0
    };
  } else if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.video')) {
    var _sizes = bidRequest.mediaTypes.video.playerSize || [];

    imp.video = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseGPTSingleSizeArrayToRtbSize"](_sizes[0]) || {};

    if (bidRequest.params.video) {
      Object.keys(bidRequest.params.video).filter(function (key) {
        return __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_includes_js___default()(VIDEO_TARGETING, key);
      }).forEach(function (key) {
        return imp.video[key] = bidRequest.params.video[key];
      });
    }
  } else if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.native')) {
    var nativeRequest = buildNativeRequest(bidRequest.mediaTypes.native);
    imp.native = {
      ver: '1.1',
      request: JSON.stringify(nativeRequest)
    };
  }

  if (secure) {
    imp.secure = 1;
  }

  return imp;
}
/**
 * Builds native request from native adunit
 */


function buildNativeRequest(nativeReq) {
  var request = {
    ver: '1.1',
    assets: []
  };

  for (var _i = 0, _Object$keys = Object.keys(nativeReq); _i < _Object$keys.length; _i++) {
    var k = _Object$keys[_i];
    var v = nativeReq[k];
    var desc = NATIVE_INDEX[k];

    if (desc === undefined) {
      continue;
    }

    var assetRoot = {
      id: desc.id,
      required: ~~v.required
    };

    if (desc.assetType === 'img') {
      assetRoot[desc.assetType] = buildImageAsset(desc, v);
    } else if (desc.assetType === 'data') {
      assetRoot.data = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["cleanObj"]({
        type: desc.type,
        len: v.len
      });
    } else if (desc.assetType === 'title') {
      assetRoot.title = {
        len: v.len || 90
      };
    } else {
      return;
    }

    request.assets.push(assetRoot);
  }

  return request;
}
/**
 *  Builds image asset request
 */


function buildImageAsset(desc, val) {
  var img = {
    type: desc.type
  };

  if (val.sizes) {
    var _val$sizes = _slicedToArray(val.sizes, 2);

    img.w = _val$sizes[0];
    img.h = _val$sizes[1];
  } else if (val.aspect_ratios) {
    img.wmin = val.aspect_ratios[0].min_width;
    img.hmin = val.aspect_ratios[0].min_height;
  }

  return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["cleanObj"](img);
}
/**
 * Checks if configuration allows specified sync method
 * @param syncRule {Object}
 * @param bidderCode {string}
 * @returns {boolean}
 */


function isSyncMethodAllowed(syncRule, bidderCode) {
  if (!syncRule) {
    return false;
  }

  var bidders = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](syncRule.bidders) ? syncRule.bidders : [bidderCode];
  var rule = syncRule.filter === 'include';
  return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["contains"](bidders, bidderCode) === rule;
}
/**
 * Get preferred user-sync method based on publisher configuration
 * @param bidderCode {string}
 * @returns {number|undefined}
 */


function getAllowedSyncMethod(bidderCode) {
  if (!__WEBPACK_IMPORTED_MODULE_5__src_config_js__["b" /* config */].getConfig('userSync.syncEnabled')) {
    return;
  }

  var filterConfig = __WEBPACK_IMPORTED_MODULE_5__src_config_js__["b" /* config */].getConfig('userSync.filterSettings');

  if (isSyncMethodAllowed(filterConfig.all, bidderCode) || isSyncMethodAllowed(filterConfig.iframe, bidderCode)) {
    return SYNC_IFRAME;
  } else if (isSyncMethodAllowed(filterConfig.image, bidderCode)) {
    return SYNC_IMAGE;
  }
}
/**
 * Builds complete rtb request
 * @param imps {Object} Collection of rtb impressions
 * @param bidderRequest {BidderRequest}
 * @return {Object} Complete rtb request
 */


function buildRtbRequest(imps, bidderRequest) {
  var bidderCode = bidderRequest.bidderCode,
      gdprConsent = bidderRequest.gdprConsent,
      auctionId = bidderRequest.auctionId,
      refererInfo = bidderRequest.refererInfo,
      timeout = bidderRequest.timeout,
      uspConsent = bidderRequest.uspConsent;
  var req = {
    'id': auctionId,
    'imp': imps,
    'site': createSite(refererInfo),
    'at': 1,
    'device': {
      'ip': 'caller',
      'ua': 'caller',
      'js': 1,
      'language': getLanguage()
    },
    'tmax': parseInt(timeout)
  };

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getDNT"]()) {
    req.device.dnt = 1;
  }

  if (gdprConsent) {
    if (gdprConsent.gdprApplies !== undefined) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](req, 'regs.ext.gdpr', ~~gdprConsent.gdprApplies);
    }

    if (gdprConsent.consentString !== undefined) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](req, 'user.ext.consent', gdprConsent.consentString);
    }
  }

  if (uspConsent) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](req, 'regs.ext.us_privacy', uspConsent);
  }

  var syncMethod = getAllowedSyncMethod(bidderCode);

  if (syncMethod) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](req, 'ext.adk_usersync', syncMethod);
  }

  return req;
}
/**
 * Get browser language
 * @returns {String}
 */


function getLanguage() {
  var language = navigator.language ? 'language' : 'userLanguage';
  return navigator[language].split('-')[0];
}
/**
 * Creates site description object
 */


function createSite(refInfo) {
  var url = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseUrl"](refInfo.referer);
  var site = {
    'domain': url.hostname,
    'page': "".concat(url.protocol, "://").concat(url.hostname).concat(url.pathname)
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
    adm += __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["createTrackPixelHtml"]("".concat(bid.nurl, "&px=1"));
  }

  return adm;
}
/**
 * Basic validates to comply with platform requirements
 */


function validateNativeAdUnit(adUnit) {
  return validateNativeImageSize(adUnit.image) && validateNativeImageSize(adUnit.icon) && !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](adUnit, 'privacyLink.required') && // not supported yet
  !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](adUnit, 'privacyIcon.required'); // not supported yet
}
/**
 * Validates image asset size definition
 */


function validateNativeImageSize(img) {
  if (!img) {
    return true;
  }

  if (img.sizes) {
    return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArrayOfNums"](img.sizes, 2);
  }

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](img.aspect_ratios)) {
    return img.aspect_ratios.length > 0 && img.aspect_ratios[0].min_height && img.aspect_ratios[0].min_width;
  }

  return true;
}
/**
 * Creates native ad for native 1.1 response
 */


function buildNativeAd(nativeResp) {
  var _nativeResp$native = nativeResp.native,
      assets = _nativeResp$native.assets,
      link = _nativeResp$native.link,
      imptrackers = _nativeResp$native.imptrackers,
      jstracker = _nativeResp$native.jstracker,
      privacy = _nativeResp$native.privacy;
  var nativeAd = {
    clickUrl: link.url,
    impressionTrackers: imptrackers,
    javascriptTrackers: jstracker ? [jstracker] : undefined,
    privacyLink: privacy
  };

  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](assets, function (asset) {
    var assetName = NATIVE_MODEL[asset.id].name;
    var assetType = NATIVE_MODEL[asset.id].assetType;
    nativeAd[assetName] = asset[assetType].text || asset[assetType].value || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["cleanObj"]({
      url: asset[assetType].url,
      width: asset[assetType].w,
      height: asset[assetType].h
    });
  });

  return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["cleanObj"](nativeAd);
}

/***/ })

},[197]);