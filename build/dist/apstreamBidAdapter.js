pbjsChunk([281],{

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(268);


/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_storageManager_js__ = __webpack_require__(9);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var CONSTANTS = {
  DSU_KEY: 'apr_dsu',
  BIDDER_CODE: 'apstream',
  GVLID: 394
};
var storage = Object(__WEBPACK_IMPORTED_MODULE_3__src_storageManager_js__["b" /* getStorageManager */])(CONSTANTS.GVLID, CONSTANTS.BIDDER_CODE);

var dsuModule = function () {
  'use strict';

  var DSU_KEY = 'apr_dsu';
  var DSU_VERSION_NUMBER = '1';
  var SIGNATURE_SALT = 'YicAu6ZpNG';
  var DSU_CREATOR = {
    'USERREPORT': '1'
  };

  function stringToU8(str) {
    if (typeof TextEncoder === 'function') {
      return new TextEncoder().encode(str);
    }

    str = unescape(encodeURIComponent(str));
    var bytes = new Uint8Array(str.length);

    for (var i = 0, j = str.length; i < j; i++) {
      bytes[i] = str.charCodeAt(i);
    }

    return bytes;
  }

  function _add(a, b) {
    var rl = a.l + b.l;
    var a2 = {
      h: a.h + b.h + (rl / 2 >>> 31) >>> 0,
      l: rl >>> 0
    };
    a.h = a2.h;
    a.l = a2.l;
  }

  function _xor(a, b) {
    a.h ^= b.h;
    a.h >>>= 0;
    a.l ^= b.l;
    a.l >>>= 0;
  }

  function _rotl(a, n) {
    var a2 = {
      h: a.h << n | a.l >>> 32 - n,
      l: a.l << n | a.h >>> 32 - n
    };
    a.h = a2.h;
    a.l = a2.l;
  }

  function _rotl32(a) {
    var al = a.l;
    a.l = a.h;
    a.h = al;
  }

  function _compress(v0, v1, v2, v3) {
    _add(v0, v1);

    _add(v2, v3);

    _rotl(v1, 13);

    _rotl(v3, 16);

    _xor(v1, v0);

    _xor(v3, v2);

    _rotl32(v0);

    _add(v2, v1);

    _add(v0, v3);

    _rotl(v1, 17);

    _rotl(v3, 21);

    _xor(v1, v2);

    _xor(v3, v0);

    _rotl32(v2);
  }

  function _getInt(a, offset) {
    return a[offset + 3] << 24 | a[offset + 2] << 16 | a[offset + 1] << 8 | a[offset];
  }

  function hash(key, m) {
    if (typeof m === 'string') {
      m = stringToU8(m);
    }

    var k0 = {
      h: key[1] >>> 0,
      l: key[0] >>> 0
    };
    var k1 = {
      h: key[3] >>> 0,
      l: key[2] >>> 0
    };
    var v0 = {
      h: k0.h,
      l: k0.l
    };
    var v2 = k0;
    var v1 = {
      h: k1.h,
      l: k1.l
    };
    var v3 = k1;
    var ml = m.length;
    var ml7 = ml - 7;
    var buf = new Uint8Array(new ArrayBuffer(8));

    _xor(v0, {
      h: 0x736f6d65,
      l: 0x70736575
    });

    _xor(v1, {
      h: 0x646f7261,
      l: 0x6e646f6d
    });

    _xor(v2, {
      h: 0x6c796765,
      l: 0x6e657261
    });

    _xor(v3, {
      h: 0x74656462,
      l: 0x79746573
    });

    var mp = 0;

    while (mp < ml7) {
      var mi = {
        h: _getInt(m, mp + 4),
        l: _getInt(m, mp)
      };

      _xor(v3, mi);

      _compress(v0, v1, v2, v3);

      _compress(v0, v1, v2, v3);

      _xor(v0, mi);

      mp += 8;
    }

    buf[7] = ml;
    var ic = 0;

    while (mp < ml) {
      buf[ic++] = m[mp++];
    }

    while (ic < 7) {
      buf[ic++] = 0;
    }

    var mil = {
      h: buf[7] << 24 | buf[6] << 16 | buf[5] << 8 | buf[4],
      l: buf[3] << 24 | buf[2] << 16 | buf[1] << 8 | buf[0]
    };

    _xor(v3, mil);

    _compress(v0, v1, v2, v3);

    _compress(v0, v1, v2, v3);

    _xor(v0, mil);

    _xor(v2, {
      h: 0,
      l: 0xff
    });

    _compress(v0, v1, v2, v3);

    _compress(v0, v1, v2, v3);

    _compress(v0, v1, v2, v3);

    _compress(v0, v1, v2, v3);

    var h = v0;

    _xor(h, v1);

    _xor(h, v2);

    _xor(h, v3);

    return h;
  }

  function hashHex(key, m) {
    var r = hash(key, m);
    return ('0000000' + r.h.toString(16)).substr(-8) + ('0000000' + r.l.toString(16)).substr(-8);
  }

  var SIPHASH_KEY = [0x86395a57, 0x6b5ba7f7, 0x69732c07, 0x2a6ef48d];
  var hashWithKey = hashHex.bind(null, SIPHASH_KEY);
  var parseUrlRegex = new RegExp('^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?');
  var overwrite = null;
  var cache = {};

  function parseUrl(url) {
    var addscheme = url.indexOf('/') !== 0 && url.indexOf('/') !== -1 && (url.indexOf(':') === -1 || url.indexOf(':') > url.indexOf('/'));
    var match = parseUrlRegex.exec(addscheme ? 'noscheme://' + url : url);
    var res = {
      scheme: addscheme ? '' : match[2] || '',
      host: match[4] || '',
      hostname: match[4] ? match[4].split(':')[0] : '',
      pathname: match[5] || '',
      search: match[7] || '',
      hash: match[9] || '',
      toString: function toString() {
        return url;
      }
    };
    res.origin = res.scheme + '://' + res.host;
    return res;
  }

  function location() {
    var url = overwrite || window.location.toString();
    url = url.replace(/\.demo\.audienceproject\.com\//, '/');

    if (cache.url === url) {
      return cache.parsed;
    }

    var parsed = parseUrl(url);
    cache.url = url;
    cache.parsed = parsed;
    return parsed;
  }

  function getDaysSinceApEpoch() {
    var timeDiff = new Date().getTime() - new Date(2019, 0, 1).getTime();
    var daysSinceApEpoch = Math.floor(timeDiff / (1000 * 3600 * 24));
    return daysSinceApEpoch;
  }

  function generateDsu() {
    var dsuId = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["generateUUID"]();
    var loc = location();
    var dsuIdSuffix = hashWithKey(dsuId + loc.toString());
    var suffix4 = dsuIdSuffix.substr(0, 4);
    var suffix8 = dsuIdSuffix.substr(4);
    dsuId = dsuId.substr(0, 19) + suffix4 + '-' + suffix8;
    var daysSinceApEpoch = getDaysSinceApEpoch();
    var originHash = hashWithKey(loc.origin);
    var metadata = [DSU_CREATOR.USERREPORT, daysSinceApEpoch, originHash].join('.');
    var signature = hashWithKey(dsuId + metadata + SIGNATURE_SALT);
    return [DSU_VERSION_NUMBER, signature, dsuId, metadata].join('.');
  }

  function readOrCreateDsu() {
    var dsu;

    try {
      dsu = storage.getDataFromLocalStorage(DSU_KEY);
    } catch (err) {
      return null;
    }

    if (!dsu) {
      dsu = generateDsu();
    }

    try {
      storage.setDataInLocalStorage(DSU_KEY, dsu);
    } catch (err) {
      return null;
    }

    return dsu;
  }

  return {
    readOrCreateDsu: readOrCreateDsu
  };
}();

function serializeSizes(sizes) {
  if (Array.isArray(sizes[0]) === false) {
    sizes = [sizes];
  }

  return sizes.map(function (s) {
    return s[0] + 'x' + s[1];
  }).join('_');
}

function getRawConsentString(gdprConsentConfig) {
  if (!gdprConsentConfig || gdprConsentConfig.gdprApplies === false) {
    return null;
  }

  return gdprConsentConfig.consentString;
}

function getConsentStringFromPrebid(gdprConsentConfig) {
  var consentString = getRawConsentString(gdprConsentConfig);

  if (!consentString) {
    return null;
  }

  var isIab = __WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('consentManagement.cmpApi') != 'static';
  var vendorConsents = gdprConsentConfig.vendorData.vendorConsents || (gdprConsentConfig.vendorData.vendor || {}).consents || {};
  var isConsentGiven = !!vendorConsents[CONSTANTS.GVLID.toString(10)];
  return isIab && isConsentGiven ? consentString : null;
}

function getIabConsentString(bidderRequest) {
  if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bidderRequest, 'gdprConsent')) {
    return getConsentStringFromPrebid(bidderRequest.gdprConsent);
  }

  return 'disabled';
}

function injectPixels(ad, pixels, scripts) {
  if (!pixels && !scripts) {
    return ad;
  }

  var trackedAd = ad;

  if (pixels) {
    pixels.forEach(function (pixel) {
      var tracker = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["createTrackPixelHtml"](pixel);
      trackedAd += tracker;
    });
  }

  if (scripts) {
    scripts.forEach(function (script) {
      var tracker = "<script src=\"".concat(script, "\"></script>");
      trackedAd += tracker;
    });
  }

  return trackedAd;
}

function getScreenParams() {
  return "".concat(window.screen.width, "x").concat(window.screen.height, "@").concat(window.devicePixelRatio);
}

function getBids(bids) {
  var bidArr = bids.map(function (bid) {
    var bidId = bid.bidId;
    var mediaType = '';
    var mediaTypes = Object.keys(bid.mediaTypes);

    switch (mediaTypes[0]) {
      case 'video':
        mediaType = 'v';
        break;

      case 'native':
        mediaType = 'n';
        break;

      case 'audio':
        mediaType = 'a';
        break;

      default:
        mediaType = 'b';
        break;
    }

    var adUnitCode = ",c=".concat(bid.adUnitCode);

    if (bid.params.code) {
      adUnitCode = ",c=".concat(encodeURIComponent(bid.params.code));
    }

    if (bid.params.adunitId) {
      adUnitCode = ",u=".concat(encodeURIComponent(bid.params.adunitId));
    }

    return "".concat(bidId, ":t=").concat(mediaType, ",s=").concat(serializeSizes(bid.sizes)).concat(adUnitCode);
  });
  return bidArr.join(';');
}

;

function getEndpointsGroups(bidRequests) {
  var endpoints = [];

  var getEndpoint = function getEndpoint(bid) {
    if (bid.params.test) {
      return "https://mock-bapi.userreport.com/v2/".concat(bid.params.publisherId, "/bid");
    }

    if (bid.params.endpoint) {
      return "".concat(bid.params.endpoint).concat(bid.params.publisherId, "/bid");
    }

    return "https://bapi.userreport.com/v2/".concat(bid.params.publisherId, "/bid");
  };

  bidRequests.forEach(function (bid) {
    var exist = endpoints.filter(function (item) {
      return item.endpoint.indexOf(bid.params.endpoint) > -1;
    })[0];

    if (exist) {
      exist.bids.push(bid);
    } else {
      endpoints.push({
        endpoint: getEndpoint(bid),
        bids: [bid]
      });
    }
  });
  return endpoints;
}

function isBidRequestValid(bid) {
  var isPublisherIdExist = !!bid.params.publisherId;
  var isOneMediaType = Object.keys(bid.mediaTypes).length === 1;
  return isPublisherIdExist && isOneMediaType;
}

function buildRequests(bidRequests, bidderRequest) {
  var data = {
    med: encodeURIComponent(window.location.href),
    auid: bidderRequest.auctionId,
    ref: document.referrer,
    dnt: __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["getDNT"]() ? 1 : 0,
    sr: getScreenParams()
  };
  var consentData = getRawConsentString(bidderRequest.gdprConsent);
  data.iab_consent = consentData;
  var options = {
    withCredentials: true
  };
  var isConsent = getIabConsentString(bidderRequest);
  var noDsu = __WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('apstream.noDsu');

  if (!isConsent || noDsu) {
    data.dsu = '';
  } else {
    data.dsu = dsuModule.readOrCreateDsu();
  }

  if (!isConsent || isConsent === 'disabled') {
    options.withCredentials = false;
  }

  var endpoints = getEndpointsGroups(bidRequests);
  var serverRequests = endpoints.map(function (item) {
    return {
      method: 'GET',
      url: item.endpoint,
      data: _objectSpread(_objectSpread({}, data), {}, {
        bids: getBids(item.bids),
        rnd: Math.random()
      }),
      options: options
    };
  });
  return serverRequests;
}

function interpretResponse(serverResponse) {
  var bidResponses = serverResponse && serverResponse.body;

  if (!bidResponses || !bidResponses.length) {
    return [];
  }

  return bidResponses.map(function (x) {
    return {
      requestId: x.bidId,
      cpm: x.bidDetails.cpm,
      width: x.bidDetails.width,
      height: x.bidDetails.height,
      creativeId: x.bidDetails.creativeId,
      currency: x.bidDetails.currency || 'USD',
      netRevenue: x.bidDetails.netRevenue,
      dealId: x.bidDetails.dealId,
      ad: injectPixels(x.bidDetails.ad, x.bidDetails.noticeUrls, x.bidDetails.impressionScripts),
      ttl: x.bidDetails.ttl
    };
  });
}

var spec = {
  code: CONSTANTS.BIDDER_CODE,
  gvlid: CONSTANTS.GVLID,
  isBidRequestValid: isBidRequestValid,
  buildRequests: buildRequests,
  interpretResponse: interpretResponse
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[267]);