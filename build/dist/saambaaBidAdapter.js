pbjsChunk([114],{

/***/ 668:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(669);


/***/ }),

/***/ 669:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VIDEO_ENDPOINT", function() { return VIDEO_ENDPOINT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BANNER_ENDPOINT", function() { return BANNER_ENDPOINT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OUTSTREAM_SRC", function() { return OUTSTREAM_SRC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VIDEO_TARGETING", function() { return VIDEO_TARGETING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_MIMES", function() { return DEFAULT_MIMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_includes_js__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var ADAPTER_VERSION = '1.0';
var BIDDER_CODE = 'saambaa';
var VIDEO_ENDPOINT = 'https://nep.advangelists.com/xp/get?pubid=';
var BANNER_ENDPOINT = 'https://nep.advangelists.com/xp/get?pubid=';
var OUTSTREAM_SRC = 'https://player-cdn.beachfrontmedia.com/playerapi/loader/outstream.js';
var VIDEO_TARGETING = ['mimes', 'playbackmethod', 'maxduration', 'skip'];
var DEFAULT_MIMES = ['video/mp4', 'application/javascript'];
var pubid = '';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */]],
  isBidRequestValid: function isBidRequestValid(bidRequest) {
    if (typeof bidRequest != 'undefined') {
      if (bidRequest.bidder !== BIDDER_CODE && typeof bidRequest.params === 'undefined') {
        return false;
      }

      if (bidRequest === '' || bidRequest.params.placement === '' || bidRequest.params.pubid === '') {
        return false;
      }

      return true;
    } else {
      return false;
    }
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
      pubid = getVideoBidParam(bid, 'pubid');
      requests.push({
        method: 'POST',
        url: VIDEO_ENDPOINT + pubid,
        data: createVideoRequestData(bid, bidderRequest),
        bidRequest: bid
      });
    });
    bannerBids.forEach(function (bid) {
      pubid = getBannerBidParam(bid, 'pubid');
      requests.push({
        method: 'POST',
        url: BANNER_ENDPOINT + pubid,
        data: createBannerRequestData(bid, bidderRequest),
        bidRequest: bid
      });
    });
    return requests;
  },
  interpretResponse: function interpretResponse(serverResponse, _ref) {
    var bidRequest = _ref.bidRequest;
    var response = serverResponse.body;

    if (response !== null && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](response) == false) {
      if (isVideoBid(bidRequest)) {
        var bidResponse = {
          requestId: response.id,
          bidderCode: BIDDER_CODE,
          cpm: response.seatbid[0].bid[0].price,
          width: response.seatbid[0].bid[0].w,
          height: response.seatbid[0].bid[0].h,
          ttl: response.seatbid[0].bid[0].ttl || 60,
          creativeId: response.seatbid[0].bid[0].crid,
          currency: response.cur,
          meta: {
            'advertiserDomains': response.seatbid[0].bid[0].adomain
          },
          mediaType: __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */],
          netRevenue: true
        };

        if (response.seatbid[0].bid[0].adm) {
          bidResponse.vastXml = response.seatbid[0].bid[0].adm;
          bidResponse.adResponse = {
            content: response.seatbid[0].bid[0].adm
          };
        } else {
          bidResponse.vastUrl = response.seatbid[0].bid[0].nurl;
        }

        return bidResponse;
      } else {
        return {
          requestId: response.id,
          bidderCode: BIDDER_CODE,
          cpm: response.seatbid[0].bid[0].price,
          width: response.seatbid[0].bid[0].w,
          height: response.seatbid[0].bid[0].h,
          ad: response.seatbid[0].bid[0].adm,
          ttl: response.seatbid[0].bid[0].ttl || 60,
          creativeId: response.seatbid[0].bid[0].crid,
          currency: response.cur,
          meta: {
            'advertiserDomains': response.seatbid[0].bid[0].adomain
          },
          mediaType: __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */],
          netRevenue: true
        };
      }
    }
  }
};

function isBannerBid(bid) {
  return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.banner') || !isVideoBid(bid);
}

function isVideoBid(bid) {
  return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.video');
}

function isVideoBidValid(bid) {
  return isVideoBid(bid) && getVideoBidParam(bid, 'pubid') && getVideoBidParam(bid, 'placement');
}

function isBannerBidValid(bid) {
  return isBannerBid(bid) && getBannerBidParam(bid, 'pubid') && getBannerBidParam(bid, 'placement');
}

function getVideoBidParam(bid, key) {
  return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'params.video.' + key) || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'params.' + key);
}

function getBannerBidParam(bid, key) {
  return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'params.banner.' + key) || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'params.' + key);
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

function findAndFillParam(o, key, value) {
  try {
    if (typeof value === 'function') {
      o[key] = value();
    } else {
      o[key] = value;
    }
  } catch (ex) {}
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
  var cs = __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js___default()(clientStrings, function (cs) {
    return cs.r.test(navigator.userAgent);
  });
  return cs ? cs.s : 'unknown';
}

function getFirstSize(sizes) {
  return sizes && sizes.length ? sizes[0] : {
    w: undefined,
    h: undefined
  };
}

function parseSizes(sizes) {
  return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](sizes).map(function (size) {
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
  return parseSizes(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.video.playerSize') || bid.sizes);
}

function getBannerSizes(bid) {
  return parseSizes(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.banner.sizes') || bid.sizes);
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
    return __WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_includes_js___default()(VIDEO_TARGETING, param);
  }).reduce(function (obj, param) {
    obj[param] = bid.params.video[param];
    return obj;
  }, {});
}

function createVideoRequestData(bid, bidderRequest) {
  var topLocation = getTopWindowLocation(bidderRequest);
  var topReferrer = getTopWindowReferrer(); // if size is explicitly given via adapter params

  var paramSize = getVideoBidParam(bid, 'size');
  var sizes = [];

  if (typeof paramSize !== 'undefined' && paramSize != '') {
    sizes = parseSizes(paramSize);
  } else {
    sizes = getVideoSizes(bid);
  }

  var firstSize = getFirstSize(sizes);
  var video = getVideoTargetingParams(bid);
  var o = {
    'device': {
      'langauge': global.navigator.language.split('-')[0],
      'dnt': global.navigator.doNotTrack === 1 ? 1 : 0,
      'devicetype': isMobile() ? 4 : isConnectedTV() ? 3 : 2,
      'js': 1,
      'os': getOsVersion()
    },
    'at': 2,
    'site': {},
    'tmax': 3000,
    'cur': ['USD'],
    'id': bid.bidId,
    'imp': [],
    'regs': {
      'ext': {}
    },
    'user': {
      'ext': {}
    }
  };
  o.site['page'] = topLocation.href;
  o.site['domain'] = topLocation.hostname;
  o.site['search'] = topLocation.search;
  o.site['domain'] = topLocation.hostname;
  o.site['ref'] = topReferrer;
  o.site['mobile'] = isMobile() ? 1 : 0;
  var secure = topLocation.protocol.indexOf('https') === 0 ? 1 : 0;
  o.device['dnt'] = getDoNotTrack() ? 1 : 0;
  findAndFillParam(o.site, 'name', function () {
    return global.top.document.title;
  });
  findAndFillParam(o.device, 'h', function () {
    return global.screen.height;
  });
  findAndFillParam(o.device, 'w', function () {
    return global.screen.width;
  });
  var placement = getVideoBidParam(bid, 'placement');
  var floor = getVideoBidParam(bid, 'floor');

  if (floor == null) {
    floor = 0.5;
  }

  for (var j = 0; j < sizes.length; j++) {
    o.imp.push({
      'id': '' + j,
      'displaymanager': '' + BIDDER_CODE,
      'displaymanagerver': '' + ADAPTER_VERSION,
      'tagId': placement,
      'bidfloor': floor,
      'bidfloorcur': 'USD',
      'secure': secure,
      'video': _extends({
        'id': __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["generateUUID"](),
        'pos': 0,
        'w': firstSize.w,
        'h': firstSize.h,
        'mimes': DEFAULT_MIMES
      }, video)
    });
  }

  if (bidderRequest && bidderRequest.gdprConsent) {
    var _bidderRequest$gdprCo = bidderRequest.gdprConsent,
        gdprApplies = _bidderRequest$gdprCo.gdprApplies,
        consentString = _bidderRequest$gdprCo.consentString;
    o.regs.ext = {
      'gdpr': gdprApplies ? 1 : 0
    };
    o.user.ext = {
      'consent': consentString
    };
  }

  return o;
}

function getTopWindowLocation(bidderRequest) {
  var url = bidderRequest && bidderRequest.refererInfo && bidderRequest.refererInfo.referer;
  return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseUrl"](__WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('pageUrl') || url, {
    decodeSearchAsString: true
  });
}

function createBannerRequestData(bid, bidderRequest) {
  var topLocation = getTopWindowLocation(bidderRequest);
  var topReferrer = getTopWindowReferrer(); // if size is explicitly given via adapter params

  var paramSize = getBannerBidParam(bid, 'size');
  var sizes = [];

  if (typeof paramSize !== 'undefined' && paramSize != '') {
    sizes = parseSizes(paramSize);
  } else {
    sizes = getBannerSizes(bid);
  }

  var o = {
    'device': {
      'langauge': global.navigator.language.split('-')[0],
      'dnt': global.navigator.doNotTrack === 1 ? 1 : 0,
      'devicetype': isMobile() ? 4 : isConnectedTV() ? 3 : 2,
      'js': 1
    },
    'at': 2,
    'site': {},
    'tmax': 3000,
    'cur': ['USD'],
    'id': bid.bidId,
    'imp': [],
    'regs': {
      'ext': {}
    },
    'user': {
      'ext': {}
    }
  };
  o.site['page'] = topLocation.href;
  o.site['domain'] = topLocation.hostname;
  o.site['search'] = topLocation.search;
  o.site['domain'] = topLocation.hostname;
  o.site['ref'] = topReferrer;
  o.site['mobile'] = isMobile() ? 1 : 0;
  var secure = topLocation.protocol.indexOf('https') === 0 ? 1 : 0;
  o.device['dnt'] = getDoNotTrack() ? 1 : 0;
  findAndFillParam(o.site, 'name', function () {
    return global.top.document.title;
  });
  findAndFillParam(o.device, 'h', function () {
    return global.screen.height;
  });
  findAndFillParam(o.device, 'w', function () {
    return global.screen.width;
  });
  var placement = getBannerBidParam(bid, 'placement');

  for (var j = 0; j < sizes.length; j++) {
    var size = sizes[j];
    var floor = getBannerBidParam(bid, 'floor');

    if (floor == null) {
      floor = 0.1;
    }

    o.imp.push({
      'id': '' + j,
      'displaymanager': '' + BIDDER_CODE,
      'displaymanagerver': '' + ADAPTER_VERSION,
      'tagId': placement,
      'bidfloor': floor,
      'bidfloorcur': 'USD',
      'secure': secure,
      'banner': {
        'id': __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["generateUUID"](),
        'pos': 0,
        'w': size['w'],
        'h': size['h']
      }
    });
  }

  if (bidderRequest && bidderRequest.gdprConsent) {
    var _bidderRequest$gdprCo2 = bidderRequest.gdprConsent,
        gdprApplies = _bidderRequest$gdprCo2.gdprApplies,
        consentString = _bidderRequest$gdprCo2.consentString;
    o.regs.ext = {
      'gdpr': gdprApplies ? 1 : 0
    };
    o.user.ext = {
      'consent': consentString
    };
  }

  return o;
}

Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__["registerBidder"])(spec);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(33)))

/***/ })

},[668]);