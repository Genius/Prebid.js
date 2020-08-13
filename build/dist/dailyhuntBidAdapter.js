pbjsChunk([238],{

/***/ 368:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(369);


/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_video_js__ = __webpack_require__(36);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }







var BIDDER_CODE = 'dailyhunt';
var BIDDER_ALIAS = 'dh';
var SUPPORTED_MEDIA_TYPES = [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["c" /* NATIVE */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */]];
var PROD_PREBID_ENDPOINT_URL = 'https://pbs.dailyhunt.in/openrtb2/auction?partner=';
var PROD_PREBID_TEST_ENDPOINT_URL = 'https://qa-pbs-van.dailyhunt.in/openrtb2/auction?partner=';
var ORTB_NATIVE_TYPE_MAPPING = {
  img: {
    '3': 'image',
    '1': 'icon'
  },
  data: {
    '1': 'sponsoredBy',
    '2': 'body',
    '3': 'rating',
    '4': 'likes',
    '5': 'downloads',
    '6': 'price',
    '7': 'salePrice',
    '8': 'phone',
    '9': 'address',
    '10': 'body2',
    '11': 'displayUrl',
    '12': 'cta'
  }
};
var ORTB_NATIVE_PARAMS = {
  title: {
    id: 0,
    name: 'title'
  },
  icon: {
    id: 1,
    type: 1,
    name: 'img'
  },
  image: {
    id: 2,
    type: 3,
    name: 'img'
  },
  sponsoredBy: {
    id: 3,
    name: 'data',
    type: 1
  },
  body: {
    id: 4,
    name: 'data',
    type: 2
  },
  cta: {
    id: 5,
    type: 12,
    name: 'data'
  },
  body2: {
    id: 4,
    name: 'data',
    type: 10
  }
}; // Encode URI.

var _encodeURIComponent = function _encodeURIComponent(a) {
  var b = window.encodeURIComponent(a);
  b = b.replace(/'/g, '%27');
  return b;
}; // Extract key from collections.


var extractKeyInfo = function extractKeyInfo(collection, key) {
  for (var i = 0, result; i < collection.length; i++) {
    result = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](collection[i].params, key);

    if (result) {
      return result;
    }
  }

  return undefined;
}; // Flattern Array.


var flatten = function flatten(arr) {
  var _ref;

  return (_ref = []).concat.apply(_ref, _toConsumableArray(arr));
};

var createOrtbRequest = function createOrtbRequest(validBidRequests, bidderRequest) {
  var device = createOrtbDeviceObj(validBidRequests);
  var user = createOrtbUserObj(validBidRequests);
  var site = createOrtbSiteObj(validBidRequests, bidderRequest.refererInfo.referer);
  return {
    id: bidderRequest.auctionId,
    imp: [],
    site: site,
    device: device,
    user: user
  };
};

var createOrtbDeviceObj = function createOrtbDeviceObj(validBidRequests) {
  var device = _objectSpread({}, extractKeyInfo(validBidRequests, "device"));

  device.ua = navigator.userAgent;
  return device;
};

var createOrtbUserObj = function createOrtbUserObj(validBidRequests) {
  return _objectSpread({}, extractKeyInfo(validBidRequests, "user"));
};

var createOrtbSiteObj = function createOrtbSiteObj(validBidRequests, page) {
  var site = _objectSpread(_objectSpread({}, extractKeyInfo(validBidRequests, "site")), {}, {
    page: page
  });

  var publisher = createOrtbPublisherObj(validBidRequests);

  if (publisher) {
    site.publisher = publisher;
  }

  return site;
};

var createOrtbPublisherObj = function createOrtbPublisherObj(validBidRequests) {
  return _objectSpread({}, extractKeyInfo(validBidRequests, "publisher"));
};

var createOrtbImpObj = function createOrtbImpObj(bid) {
  var params = bid.params;
  var testMode = !!bid.params.test_mode; // Validate Banner Request.

  var bannerObj = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bid.mediaTypes, "banner");
  var nativeObj = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bid.mediaTypes, "native");
  var videoObj = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bid.mediaTypes, "video");
  var imp = {
    id: bid.bidId,
    bidfloor: params.bidfloor ? params.bidfloor : 0,
    ext: {
      dailyhunt: {
        placement_id: params.placement_id,
        publisher_id: params.publisher_id,
        partner: params.partner_name
      }
    }
  }; // Test Mode Campaign.

  if (testMode) {
    imp.ext.test_mode = testMode;
  }

  if (bannerObj) {
    imp.banner = _objectSpread({}, createOrtbImpBannerObj(bid, bannerObj));
  } else if (nativeObj) {
    imp.native = _objectSpread({}, createOrtbImpNativeObj(bid, nativeObj));
  } else if (videoObj) {
    imp.video = _objectSpread({}, createOrtbImpVideoObj(bid, videoObj));
  }

  return imp;
};

var createOrtbImpBannerObj = function createOrtbImpBannerObj(bid, bannerObj) {
  var format = [];
  bannerObj.sizes.forEach(function (size) {
    return format.push({
      w: size[0],
      h: size[1]
    });
  });
  return {
    id: 'banner-' + bid.bidId,
    format: format
  };
};

var createOrtbImpNativeObj = function createOrtbImpNativeObj(bid, nativeObj) {
  var assets = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["_map"](bid.nativeParams, function (bidParams, key) {
    var props = ORTB_NATIVE_PARAMS[key];
    var asset = {
      required: bidParams.required & 1
    };

    if (props) {
      var h = 0;
      var w = 0;
      asset.id = props.id;

      if (bidParams.sizes) {
        var sizes = flatten(bidParams.sizes);
        w = sizes[0];
        h = sizes[1];
      }

      asset[props.name] = {
        len: bidParams.len ? bidParams.len : 20,
        type: props.type,
        w: w,
        h: h
      };
      return asset;
    }
  }).filter(Boolean);

  var request = {
    assets: assets,
    ver: '1,0'
  };
  return {
    request: JSON.stringify(request)
  };
};

var createOrtbImpVideoObj = function createOrtbImpVideoObj(bid, videoObj) {
  var obj = {};
  var params = bid.params;

  if (!__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isEmpty"](bid.params.video)) {
    obj = _objectSpread({}, params.video);
  } else {
    obj = {
      mimes: ['video/mp4']
    };
  }

  obj.ext = _objectSpread({}, videoObj);
  return obj;
};

var createServerRequest = function createServerRequest(ortbRequest, validBidRequests) {
  var isTestMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'false';
  return {
    method: 'POST',
    url: isTestMode === 'true' ? PROD_PREBID_TEST_ENDPOINT_URL + validBidRequests[0].params.partner_name : PROD_PREBID_ENDPOINT_URL + validBidRequests[0].params.partner_name,
    data: JSON.stringify(ortbRequest),
    options: {
      contentType: 'application/json',
      withCredentials: true
    },
    bids: validBidRequests
  };
};

var createPrebidBannerBid = function createPrebidBannerBid(bid, bidResponse) {
  return {
    requestId: bid.bidId,
    cpm: bidResponse.price.toFixed(2),
    creativeId: bidResponse.crid,
    width: bidResponse.w,
    height: bidResponse.h,
    ttl: 360,
    netRevenue: bid.netRevenue === 'net',
    currency: 'USD',
    ad: bidResponse.adm,
    mediaType: 'banner',
    winUrl: bidResponse.nurl
  };
};

var createPrebidNativeBid = function createPrebidNativeBid(bid, bidResponse) {
  return {
    requestId: bid.bidId,
    cpm: bidResponse.price.toFixed(2),
    creativeId: bidResponse.crid,
    currency: 'USD',
    ttl: 360,
    netRevenue: bid.netRevenue === 'net',
    native: parseNative(bidResponse),
    mediaType: 'native',
    winUrl: bidResponse.nurl,
    width: bidResponse.w,
    height: bidResponse.h
  };
};

var parseNative = function parseNative(bid) {
  var adm = JSON.parse(bid.adm);
  var _adm$native = adm.native,
      assets = _adm$native.assets,
      link = _adm$native.link,
      imptrackers = _adm$native.imptrackers,
      jstracker = _adm$native.jstracker;
  var result = {
    clickUrl: _encodeURIComponent(link.url),
    clickTrackers: link.clicktrackers || [],
    impressionTrackers: imptrackers || [],
    javascriptTrackers: jstracker ? [jstracker] : []
  };
  assets.forEach(function (asset) {
    if (!__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isEmpty"](asset.title)) {
      result.title = asset.title.text;
    } else if (!__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isEmpty"](asset.img)) {
      result[ORTB_NATIVE_TYPE_MAPPING.img[asset.img.type]] = {
        url: asset.img.url,
        height: asset.img.h,
        width: asset.img.w
      };
    } else if (!__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isEmpty"](asset.data)) {
      result[ORTB_NATIVE_TYPE_MAPPING.data[asset.data.type]] = asset.data.value;
    }
  });
  return result;
};

var createPrebidVideoBid = function createPrebidVideoBid(bid, bidResponse) {
  var videoBid = {
    requestId: bid.bidId,
    cpm: bidResponse.price.toFixed(2),
    creativeId: bidResponse.crid,
    width: bidResponse.w,
    height: bidResponse.h,
    ttl: 360,
    netRevenue: bid.netRevenue === 'net',
    currency: 'USD',
    mediaType: 'video',
    winUrl: bidResponse.nurl
  };
  var videoContext = bid.mediaTypes.video.context;

  switch (videoContext) {
    case __WEBPACK_IMPORTED_MODULE_5__src_video_js__["b" /* OUTSTREAM */]:
      videoBid.vastXml = bidResponse.adm;
      break;

    case __WEBPACK_IMPORTED_MODULE_5__src_video_js__["a" /* INSTREAM */]:
      videoBid.videoCacheKey = bidResponse.ext.bidder.cacheKey;
      videoBid.vastUrl = bidResponse.ext.bidder.vastUrl;
      break;
  }

  return videoBid;
};

var getQueryVariable = function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');

    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }

  return false;
};

var spec = {
  code: BIDDER_CODE,
  aliases: [BIDDER_ALIAS],
  supportedMediaTypes: SUPPORTED_MEDIA_TYPES,
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.placement_id && !!bid.params.publisher_id && !!bid.params.partner_name;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var serverRequests = []; // ORTB Request.

    var ortbReq = createOrtbRequest(validBidRequests, bidderRequest);
    validBidRequests.forEach(function (bid) {
      var imp = createOrtbImpObj(bid);
      ortbReq.imp.push(imp);
    });
    serverRequests.push(_objectSpread({}, createServerRequest(ortbReq, validBidRequests, getQueryVariable('dh_test'))));
    return serverRequests;
  },
  interpretResponse: function interpretResponse(serverResponse, request) {
    var seatbid = serverResponse.body.seatbid;
    var bids = request.bids;
    var prebidResponse = [];
    var seatBids = seatbid[0].bid;
    seatBids.forEach(function (ortbResponseBid) {
      var bidId = ortbResponseBid.impid;
      var actualBid = __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js___default()(bids, function (bid) {
        return bid.bidId === bidId;
      });
      var bidMediaType = ortbResponseBid.ext.prebid.type;

      switch (bidMediaType) {
        case __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */]:
          prebidResponse.push(createPrebidBannerBid(actualBid, ortbResponseBid));
          break;

        case __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["c" /* NATIVE */]:
          prebidResponse.push(createPrebidNativeBid(actualBid, ortbResponseBid));
          break;

        case __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */]:
          prebidResponse.push(createPrebidVideoBid(actualBid, ortbResponseBid));
          break;
      }
    });
    return prebidResponse;
  },
  onBidWon: function onBidWon(bid) {
    Object(__WEBPACK_IMPORTED_MODULE_3__src_ajax_js__["a" /* ajax */])(bid.winUrl, null, null, {
      method: 'GET'
    });
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[368]);