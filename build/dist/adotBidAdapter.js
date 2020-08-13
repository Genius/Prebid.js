pbjsChunk([301],{

/***/ 217:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(218);


/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return adotBidderSpec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Renderer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var ADAPTER_VERSION = 'v1.0.0';
var BID_METHOD = 'POST';
var BIDDER_URL = 'https://dsp.adotmob.com/headerbidding/bidrequest';
var SUPPORTED_VIDEO_CONTEXTS = ['instream', 'outstream'];
var SUPPORTED_INSTREAM_CONTEXTS = ['pre-roll', 'mid-roll', 'post-roll'];
var NATIVE_PLACEMENTS = {
  title: {
    id: 1,
    name: 'title'
  },
  icon: {
    id: 2,
    type: 1,
    name: 'img'
  },
  image: {
    id: 3,
    type: 3,
    name: 'img'
  },
  sponsoredBy: {
    id: 4,
    name: 'data',
    type: 1
  },
  body: {
    id: 5,
    name: 'data',
    type: 2
  },
  cta: {
    id: 6,
    type: 12,
    name: 'data'
  }
};
var NATIVE_ID_MAPPING = {
  1: 'title',
  2: 'icon',
  3: 'image',
  4: 'sponsoredBy',
  5: 'body',
  6: 'cta'
};
var SUPPORTED_VIDEO_MIMES = ['video/mp4'];
var DOMAIN_REGEX = new RegExp('//([^/]*)');
var FIRST_PRICE = 1;
var BID_SUPPORTED_MEDIA_TYPES = ['banner', 'video', 'native'];
var TTL = 10;
var NET_REVENUE = true; // eslint-disable-next-line no-template-curly-in-string

var AUCTION_PRICE = '${AUCTION_PRICE}';
var OUTSTREAM_VIDEO_PLAYER_URL = 'https://adserver.adotmob.com/video/player.min.js';

function isNone(value) {
  return value === null || value === undefined;
}

function groupBy(values, key) {
  var groups = values.reduce(function (acc, value) {
    var groupId = value[key];
    if (!acc[groupId]) acc[groupId] = [];
    acc[groupId].push(value);
    return acc;
  }, {});
  return Object.keys(groups).map(function (id) {
    return {
      id: id,
      key: key,
      values: groups[id]
    };
  });
}

function validateMediaTypes(mediaTypes, allowedMediaTypes) {
  if (!Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(mediaTypes)) return false;
  if (!allowedMediaTypes.some(function (mediaType) {
    return mediaType in mediaTypes;
  })) return false;

  if (isBanner(mediaTypes)) {
    if (!validateBanner(mediaTypes.banner)) return false;
  }

  if (isVideo(mediaTypes)) {
    if (!validateVideo(mediaTypes.video)) return false;
  }

  return true;
}

function isBanner(mediaTypes) {
  return Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(mediaTypes) && Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(mediaTypes.banner);
}

function isVideo(mediaTypes) {
  return Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(mediaTypes) && Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(mediaTypes.video);
}

function validateBanner(banner) {
  return Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(banner) && Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isArray"])(banner.sizes) && banner.sizes.length > 0 && banner.sizes.every(validateMediaSizes);
}

function validateVideo(video) {
  if (!Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(video)) return false;
  if (!Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isStr"])(video.context)) return false;
  if (SUPPORTED_VIDEO_CONTEXTS.indexOf(video.context) === -1) return false;
  if (!video.playerSize) return true;
  if (!Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isArray"])(video.playerSize)) return false;
  return video.playerSize.every(validateMediaSizes);
}

function validateMediaSizes(mediaSize) {
  return Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isArray"])(mediaSize) && mediaSize.length === 2 && mediaSize.every(function (size) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isNumber"])(size) && size >= 0;
  });
}

function validateParameters(parameters, adUnit) {
  if (isVideo(adUnit.mediaTypes)) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(parameters)) return false;
    if (!validateVideoParameters(parameters.video, adUnit)) return false;
  }

  return true;
}

function validateVideoParameters(video, adUnit) {
  if (!video) return false;
  if (!Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isArray"])(video.mimes)) return false;
  if (video.mimes.length === 0) return false;
  if (!video.mimes.every(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isStr"])) return false;
  if (video.minDuration && !Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isNumber"])(video.minDuration)) return false;
  if (video.maxDuration && !Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isNumber"])(video.maxDuration)) return false;
  if (!Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isArray"])(video.protocols)) return false;
  if (video.protocols.length === 0) return false;
  if (!video.protocols.every(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isNumber"])) return false;

  if (isInstream(adUnit.mediaTypes.video)) {
    if (!video.instreamContext) return false;
    if (SUPPORTED_INSTREAM_CONTEXTS.indexOf(video.instreamContext) === -1) return false;
  }

  return true;
}

function validateServerRequest(serverRequest) {
  return Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(serverRequest) && Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(serverRequest.data) && Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isArray"])(serverRequest.data.imp) && Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(serverRequest._adot_internal) && Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isArray"])(serverRequest._adot_internal.impressions);
}

function createServerRequestFromAdUnits(adUnits, bidRequestId, adUnitContext) {
  return {
    method: BID_METHOD,
    url: BIDDER_URL,
    data: generateBidRequestsFromAdUnits(adUnits, bidRequestId, adUnitContext),
    _adot_internal: generateAdotInternal(adUnits)
  };
}

function generateAdotInternal(adUnits) {
  var impressions = adUnits.reduce(function (acc, adUnit) {
    var bidId = adUnit.bidId,
        mediaTypes = adUnit.mediaTypes,
        adUnitCode = adUnit.adUnitCode,
        params = adUnit.params;
    var base = {
      bidId: bidId,
      adUnitCode: adUnitCode,
      container: params.video && params.video.container
    };
    var imps = Object.keys(mediaTypes).reduce(function (acc, mediaType, index) {
      var data = mediaTypes[mediaType];
      var impressionId = "".concat(bidId, "_").concat(index);
      if (mediaType !== 'banner') return acc.concat(_objectSpread(_objectSpread({}, base), {}, {
        impressionId: impressionId
      }));
      var bannerImps = data.sizes.map(function (item, i) {
        return _objectSpread(_objectSpread({}, base), {}, {
          impressionId: "".concat(impressionId, "_").concat(i)
        });
      });
      return acc.concat(bannerImps);
    }, []);
    return acc.concat(imps);
  }, []);
  return {
    impressions: impressions
  };
}

function generateBidRequestsFromAdUnits(adUnits, bidRequestId, adUnitContext) {
  return {
    id: bidRequestId,
    imp: adUnits.reduce(generateImpressionsFromAdUnit, []),
    site: generateSiteFromAdUnitContext(adUnitContext),
    device: getDeviceInfo(),
    user: getUserInfoFromAdUnitContext(adUnitContext),
    regs: getRegulationFromAdUnitContext(adUnitContext),
    at: FIRST_PRICE,
    ext: generateBidRequestExtension()
  };
}

function generateImpressionsFromAdUnit(acc, adUnit) {
  var bidId = adUnit.bidId,
      mediaTypes = adUnit.mediaTypes,
      params = adUnit.params;
  var placementId = params.placementId;
  var pmp = {};
  if (placementId) pmp.deals = [{
    id: placementId
  }];
  var imps = Object.keys(mediaTypes).reduce(function (acc, mediaType, index) {
    var data = mediaTypes[mediaType];
    var impId = "".concat(bidId, "_").concat(index);
    if (mediaType === 'banner') return acc.concat(generateBannerFromAdUnit(impId, data, params));
    if (mediaType === 'video') return acc.concat({
      id: impId,
      video: generateVideoFromAdUnit(data, params),
      pmp: pmp
    });
    if (mediaType === 'native') return acc.concat({
      id: impId,
      native: generateNativeFromAdUnit(data, params),
      pmp: pmp
    });
  }, []);
  return acc.concat(imps);
}

function isImpressionAVideo(impression) {
  return Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(impression) && Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(impression.video);
}

function generateBannerFromAdUnit(impId, data, params) {
  var position = params.position,
      placementId = params.placementId;
  var pos = position || 0;
  var pmp = {};
  if (placementId) pmp.deals = [{
    id: placementId
  }];
  return data.sizes.map(function (_ref, index) {
    var _ref2 = _slicedToArray(_ref, 2),
        w = _ref2[0],
        h = _ref2[1];

    return {
      id: "".concat(impId, "_").concat(index),
      banner: {
        format: [{
          w: w,
          h: h
        }],
        w: w,
        h: h,
        pos: pos
      },
      pmp: pmp
    };
  });
}

function generateVideoFromAdUnit(data, params) {
  var playerSize = data.playerSize;
  var hasPlayerSize = Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isArray"])(playerSize) && playerSize.length > 0;
  var position = params.position,
      _params$video = params.video,
      video = _params$video === void 0 ? {} : _params$video;
  var minDuration = video.minDuration,
      maxDuration = video.maxDuration,
      protocols = video.protocols;
  var size = {
    width: hasPlayerSize ? playerSize[0][0] : null,
    height: hasPlayerSize ? playerSize[0][1] : null
  };
  var duration = {
    min: Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isNumber"])(minDuration) ? minDuration : null,
    max: Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isNumber"])(maxDuration) ? maxDuration : null
  };
  return {
    mimes: SUPPORTED_VIDEO_MIMES,
    w: size.width,
    h: size.height,
    startdelay: computeStartDelay(data, params),
    minduration: duration.min,
    maxduration: duration.max,
    protocols: protocols,
    pos: position || 0
  };
}

function isInstream(video) {
  return Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(video) && video.context === 'instream';
}

function isOutstream(video) {
  return Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(video) && video.startdelay === null;
}

function computeStartDelay(data, params) {
  if (isInstream(data)) {
    if (params.video.instreamContext === 'pre-roll') return 0;
    if (params.video.instreamContext === 'mid-roll') return -1;
    if (params.video.instreamContext === 'post-roll') return -2;
  }

  return null;
}

function generateNativeFromAdUnit(data, params) {
  var placements = NATIVE_PLACEMENTS;
  var assets = Object.keys(data).reduce(function (acc, placement) {
    var placementData = data[placement];
    var assetInfo = placements[placement];
    if (!assetInfo) return acc;
    var id = assetInfo.id,
        name = assetInfo.name,
        type = assetInfo.type;
    var required = placementData.required,
        len = placementData.len,
        sizes = placementData.sizes;
    var wmin = sizes && sizes[0];
    var hmin = sizes && sizes[1];
    var content = {};
    if (type) content.type = type;
    if (len) content.len = len;
    if (wmin) content.wmin = wmin;
    if (hmin) content.hmin = hmin;
    acc.push(_defineProperty({
      id: id,
      required: required
    }, name, content));
    return acc;
  }, []);
  return {
    request: JSON.stringify({
      assets: assets
    })
  };
}

function generateSiteFromAdUnitContext(adUnitContext) {
  if (!adUnitContext || !adUnitContext.refererInfo) return null;
  var domain = extractSiteDomainFromURL(adUnitContext.refererInfo.referer);
  if (!domain) return null;
  return {
    page: adUnitContext.refererInfo.referer,
    domain: domain,
    name: domain
  };
}

function extractSiteDomainFromURL(url) {
  if (!url || !Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isStr"])(url)) return null;
  var domain = url.match(DOMAIN_REGEX);
  if (Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isArray"])(domain) && domain.length === 2) return domain[1];
  return null;
}

function getDeviceInfo() {
  return {
    ua: navigator.userAgent,
    language: navigator.language
  };
}

function getUserInfoFromAdUnitContext(adUnitContext) {
  if (!adUnitContext || !adUnitContext.gdprConsent) return null;
  if (!Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isStr"])(adUnitContext.gdprConsent.consentString)) return null;
  return {
    ext: {
      consent: adUnitContext.gdprConsent.consentString
    }
  };
}

function getRegulationFromAdUnitContext(adUnitContext) {
  if (!adUnitContext || !adUnitContext.gdprConsent) return null;
  if (!Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isBoolean"])(adUnitContext.gdprConsent.gdprApplies)) return null;
  return {
    ext: {
      gdpr: adUnitContext.gdprConsent.gdprApplies
    }
  };
}

function generateBidRequestExtension() {
  return {
    adot: {
      adapter_version: ADAPTER_VERSION
    },
    should_use_gzip: true
  };
}

function validateServerResponse(serverResponse) {
  return Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(serverResponse) && Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(serverResponse.body) && Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isStr"])(serverResponse.body.cur) && Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isArray"])(serverResponse.body.seatbid);
}

function seatBidsToAds(seatBid, bidResponse, serverRequest) {
  return seatBid.bid.filter(function (bid) {
    return validateBids(bid, serverRequest);
  }).map(function (bid) {
    return generateAdFromBid(bid, bidResponse, serverRequest);
  });
}

function validateBids(bid, serverRequest) {
  if (!Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(bid)) return false;
  if (!Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isStr"])(bid.impid)) return false;
  if (!Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isStr"])(bid.crid)) return false;
  if (!Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isNumber"])(bid.price)) return false;
  if (!Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(bid.ext)) return false;
  if (!Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(bid.ext.adot)) return false;
  if (!Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isStr"])(bid.ext.adot.media_type)) return false;
  if (BID_SUPPORTED_MEDIA_TYPES.indexOf(bid.ext.adot.media_type) === -1) return false;
  if (!bid.adm && !bid.nurl) return false;

  if (bid.adm) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isStr"])(bid.adm)) return false;
    if (bid.adm.indexOf(AUCTION_PRICE) === -1) return false;
  }

  if (bid.nurl) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isStr"])(bid.nurl)) return false;
    if (bid.nurl.indexOf(AUCTION_PRICE) === -1) return false;
  }

  if (isBidABanner(bid)) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isNumber"])(bid.h)) return false;
    if (!Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isNumber"])(bid.w)) return false;
  }

  if (isBidAVideo(bid)) {
    if (!(isNone(bid.h) || Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isNumber"])(bid.h))) return false;
    if (!(isNone(bid.w) || Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isNumber"])(bid.w))) return false;
  }

  var impression = getImpressionData(serverRequest, bid.impid);
  if (!Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(impression.openRTB)) return false;
  if (!Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(impression.internal)) return false;
  if (!Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isStr"])(impression.internal.adUnitCode)) return false;

  if (isBidABanner(bid)) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(impression.openRTB.banner)) return false;
  }

  if (isBidAVideo(bid)) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(impression.openRTB.video)) return false;
  }

  if (isBidANative(bid)) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(impression.openRTB.native) || !tryParse(bid.adm)) return false;
  }

  return true;
}

function isBidABanner(bid) {
  return Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(bid) && Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(bid.ext) && Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(bid.ext.adot) && bid.ext.adot.media_type === 'banner';
}

function isBidAVideo(bid) {
  return Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(bid) && Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(bid.ext) && Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(bid.ext.adot) && bid.ext.adot.media_type === 'video';
}

function isBidANative(bid) {
  return Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(bid) && Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(bid.ext) && Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(bid.ext.adot) && bid.ext.adot.media_type === 'native';
}

function getImpressionData(serverRequest, impressionId) {
  var openRTBImpression = __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js___default()(serverRequest.data.imp, function (imp) {
    return imp.id === impressionId;
  });
  var internalImpression = __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js___default()(serverRequest._adot_internal.impressions, function (imp) {
    return imp.impressionId === impressionId;
  });
  return {
    id: impressionId,
    openRTB: openRTBImpression || null,
    internal: internalImpression || null
  };
}

function generateAdFromBid(bid, bidResponse, serverRequest) {
  var impressionData = getImpressionData(serverRequest, bid.impid);
  var isVideo = isBidAVideo(bid);
  var base = {
    requestId: impressionData.internal.bidId,
    cpm: bid.price,
    currency: bidResponse.cur,
    ttl: TTL,
    creativeId: bid.crid,
    netRevenue: NET_REVENUE,
    mediaType: bid.ext.adot.media_type
  };
  if (isBidANative(bid)) return _objectSpread(_objectSpread({}, base), {}, {
    native: formatNativeData(bid.adm)
  });
  var size = getSizeFromBid(bid, impressionData);
  var creative = getCreativeFromBid(bid, impressionData);
  return _objectSpread(_objectSpread({}, base), {}, {
    height: size.height,
    width: size.width,
    ad: creative.markup,
    adUrl: creative.markupUrl,
    vastXml: isVideo && !Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isStr"])(creative.markupUrl) ? creative.markup : null,
    vastUrl: isVideo && Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isStr"])(creative.markupUrl) ? creative.markupUrl : null,
    renderer: creative.renderer
  });
}

function formatNativeData(adm) {
  var parsedAdm = tryParse(adm);
  var _parsedAdm$native = parsedAdm.native,
      assets = _parsedAdm$native.assets,
      _parsedAdm$native$lin = _parsedAdm$native.link,
      url = _parsedAdm$native$lin.url,
      clicktrackers = _parsedAdm$native$lin.clicktrackers,
      imptrackers = _parsedAdm$native.imptrackers,
      jstracker = _parsedAdm$native.jstracker;
  var placements = NATIVE_PLACEMENTS;
  var placementIds = NATIVE_ID_MAPPING;
  return assets.reduce(function (acc, asset) {
    var placementName = placementIds[asset.id];
    var content = placementName && asset[placements[placementName].name];
    if (!content) return acc;
    acc[placementName] = content.text || content.value || {
      url: content.url,
      width: content.w,
      height: content.h
    };
    return acc;
  }, {
    clickUrl: url,
    clickTrackers: clicktrackers,
    impressionTrackers: imptrackers,
    javascriptTrackers: jstracker && [jstracker]
  });
}

function getSizeFromBid(bid, impressionData) {
  if (Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isNumber"])(bid.w) && Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isNumber"])(bid.h)) {
    return {
      width: bid.w,
      height: bid.h
    };
  }

  if (isImpressionAVideo(impressionData.openRTB)) {
    var video = impressionData.openRTB.video;

    if (Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isNumber"])(video.w) && Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isNumber"])(video.h)) {
      return {
        width: video.w,
        height: video.h
      };
    }
  }

  return {
    width: null,
    height: null
  };
}

function getCreativeFromBid(bid, impressionData) {
  var shouldUseAdMarkup = !!bid.adm;
  return {
    markup: shouldUseAdMarkup ? bid.adm : null,
    markupUrl: !shouldUseAdMarkup ? bid.nurl : null,
    renderer: getRendererFromBid(bid, impressionData)
  };
}

function getRendererFromBid(bid, impressionData) {
  var isOutstreamImpression = isBidAVideo(bid) && isImpressionAVideo(impressionData.openRTB) && isOutstream(impressionData.openRTB.video);
  return isOutstreamImpression ? buildOutstreamRenderer(impressionData) : null;
}

function buildOutstreamRenderer(impressionData) {
  var renderer = __WEBPACK_IMPORTED_MODULE_0__src_Renderer_js__["a" /* Renderer */].install({
    url: OUTSTREAM_VIDEO_PLAYER_URL,
    loaded: false,
    adUnitCode: impressionData.internal.adUnitCode
  });
  renderer.setRender(function (ad) {
    ad.renderer.push(function () {
      var container = impressionData.internal.container ? document.querySelector(impressionData.internal.container) : document.getElementById(impressionData.internal.adUnitCode);
      var player = new window.VASTPlayer(container);
      player.on('ready', function () {
        player.adVolume = 0;
        player.startAd();
      });

      try {
        Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isStr"])(ad.adUrl) ? player.load(ad.adUrl) : player.loadXml(ad.ad);
      } catch (err) {
        Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["logError"])(err);
      }
    });
  });
  return renderer;
}

function tryParse(data) {
  try {
    return JSON.parse(data);
  } catch (err) {
    Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["logError"])(err);
    return null;
  }
}

var adotBidderSpec = {
  code: 'adot',
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["c" /* NATIVE */]],
  isBidRequestValid: function isBidRequestValid(adUnit) {
    var allowedBidderCodes = [this.code];
    return Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(adUnit) && allowedBidderCodes.indexOf(adUnit.bidder) !== -1 && Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isStr"])(adUnit.adUnitCode) && Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isStr"])(adUnit.bidderRequestId) && Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isStr"])(adUnit.bidId) && validateMediaTypes(adUnit.mediaTypes, this.supportedMediaTypes) && validateParameters(adUnit.params, adUnit);
  },
  buildRequests: function buildRequests(adUnits, adUnitContext) {
    if (!adUnits) return null;
    return groupBy(adUnits, 'bidderRequestId').map(function (group) {
      var bidRequestId = group.id;
      var adUnits = groupBy(group.values, 'bidId').map(function (group) {
        var length = group.values.length;
        return length > 0 && group.values[length - 1];
      });
      return createServerRequestFromAdUnits(adUnits, bidRequestId, adUnitContext);
    });
  },
  interpretResponse: function interpretResponse(serverResponse, serverRequest) {
    if (!validateServerRequest(serverRequest)) return [];
    if (!validateServerResponse(serverResponse)) return [];
    var bidResponse = serverResponse.body;
    return bidResponse.seatbid.filter(function (seatBid) {
      return Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"])(seatBid) && Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isArray"])(seatBid.bid);
    }).reduce(function (acc, seatBid) {
      return acc.concat(seatBidsToAds(seatBid, bidResponse, serverRequest));
    }, []);
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(adotBidderSpec);


/***/ })

},[217]);