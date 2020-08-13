pbjsChunk([207],{

/***/ 436:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(437);


/***/ }),

/***/ 437:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_storageManager_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_includes__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_includes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_adapters_bidderFactory_js__ = __webpack_require__(1);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var storage = Object(__WEBPACK_IMPORTED_MODULE_3__src_storageManager_js__["b" /* getStorageManager */])();
var BIDDER_CODE = 'gumgum';
var ALIAS_BIDDER_CODE = ['gg'];
var BID_ENDPOINT = "https://g2.gumgum.com/hbid/imp";
var JCSI = {
  t: 0,
  rq: 8,
  pbv: "4.2.0"
};
var SUPPORTED_MEDIA_TYPES = [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */]];
var TIME_TO_LIVE = 60;
var DELAY_REQUEST_TIME = 1800000; // setting to 30 mins

var invalidRequestIds = {};
var browserParams = {};
var pageViewId = null; // TODO: potential 0 values for browserParams sent to ad server

function _getBrowserParams(topWindowUrl) {
  var topWindow;
  var topScreen;
  var topUrl;
  var ggad;
  var ns;

  function getNetworkSpeed() {
    var connection = window.navigator && (window.navigator.connection || window.navigator.mozConnection || window.navigator.webkitConnection);
    var Mbps = connection && (connection.downlink || connection.bandwidth);
    return Mbps ? Math.round(Mbps * 1024) : null;
  }

  function getOgURL() {
    var ogURL = '';
    var ogURLSelector = "meta[property='og:url']";
    var head = document && document.getElementsByTagName('head')[0];
    var ogURLElement = head.querySelector(ogURLSelector);
    ogURL = ogURLElement ? ogURLElement.content : null;
    return ogURL;
  }

  if (browserParams.vw) {
    // we've already initialized browserParams, just return it.
    return browserParams;
  }

  try {
    topWindow = global.top;
    topScreen = topWindow.screen;
    topUrl = topWindowUrl || '';
  } catch (error) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](error);
    return browserParams;
  }

  browserParams = {
    vw: topWindow.innerWidth,
    vh: topWindow.innerHeight,
    sw: topScreen.width,
    sh: topScreen.height,
    pu: topUrl,
    ce: storage.cookiesAreEnabled(),
    dpr: topWindow.devicePixelRatio || 1,
    jcsi: JSON.stringify(JCSI),
    ogu: getOgURL()
  };
  ns = getNetworkSpeed();

  if (ns) {
    browserParams.ns = ns;
  }

  ggad = (topUrl.match(/#ggad=(\w+)$/) || [0, 0])[1];

  if (ggad) {
    browserParams[isNaN(ggad) ? 'eAdBuyId' : 'adBuyId'] = ggad;
  }

  return browserParams;
}

function getWrapperCode(wrapper, data) {
  return wrapper.replace('AD_JSON', window.btoa(JSON.stringify(data)));
}

function _getTradeDeskIDParam(userId) {
  var unifiedIdObj = {};

  if (userId.tdid) {
    unifiedIdObj.tdid = userId.tdid;
  }

  return unifiedIdObj;
}

function _getDigiTrustQueryParams(userId) {
  var digiTrustId = userId.digitrustid && userId.digitrustid.data; // Verify there is an ID and this user has not opted out

  if (!digiTrustId || digiTrustId.privacy && digiTrustId.privacy.optout) {
    return {};
  }

  return {
    dt: digiTrustId.id
  };
}
/**
 * Serializes the supply chain object according to IAB standards
 * @see https://github.com/InteractiveAdvertisingBureau/openrtb/blob/master/supplychainobject.md
 * @param {Object} schainObj supply chain object
 * @returns {string}
 */


function _serializeSupplyChainObj(schainObj) {
  var serializedSchain = "".concat(schainObj.ver, ",").concat(schainObj.complete); // order of properties: asi,sid,hp,rid,name,domain

  schainObj.nodes.map(function (node) {
    serializedSchain += "!".concat(encodeURIComponent(node['asi'] || ''), ",");
    serializedSchain += "".concat(encodeURIComponent(node['sid'] || ''), ",");
    serializedSchain += "".concat(encodeURIComponent(node['hp'] || ''), ",");
    serializedSchain += "".concat(encodeURIComponent(node['rid'] || ''), ",");
    serializedSchain += "".concat(encodeURIComponent(node['name'] || ''), ",");
    serializedSchain += "".concat(encodeURIComponent(node['domain'] || ''));
  });
  return serializedSchain;
}
/**
 * Determines whether or not the given bid request is valid.
 *
 * @param {BidRequest} bid The bid params to validate.
 * @return boolean True if this is a valid bid, and false otherwise.
 */


function isBidRequestValid(bid) {
  var params = bid.params,
      adUnitCode = bid.adUnitCode;
  var id = params.inScreen || params.inScreenPubID || params.inSlot || params.ICV || params.video || params.inVideo;

  if (invalidRequestIds[id]) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("[GumGum] Please check the implementation for ".concat(id, " for the placement ").concat(adUnitCode));
    return false;
  }

  switch (true) {
    case !!params.inScreen:
      break;

    case !!params.inScreenPubID:
      break;

    case !!params.inSlot:
      break;

    case !!params.ICV:
      break;

    case !!params.video:
      break;

    case !!params.inVideo:
      break;

    case !!params.videoPubID:
      break;

    default:
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("[GumGum] No product selected for the placement ".concat(adUnitCode, ", please check your implementation."));
      return false;
  }

  if (params.bidfloor && !(typeof params.bidfloor === 'number' && isFinite(params.bidfloor))) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('[GumGum] bidfloor must be a Number');
    return false;
  }

  return true;
}
/**
 * Renames vid params from mediatypes.video keys
 * @param {Object} attributes
 * @returns {Object}
 */


function _getVidParams(attributes) {
  var mind = attributes.minduration,
      maxd = attributes.maxduration,
      li = attributes.linearity,
      sd = attributes.startdelay,
      pt = attributes.placement,
      _attributes$protocols = attributes.protocols,
      protocols = _attributes$protocols === void 0 ? [] : _attributes$protocols,
      _attributes$playerSiz = attributes.playerSize,
      playerSize = _attributes$playerSiz === void 0 ? [] : _attributes$playerSiz;
  var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](playerSize);

  var _ref = sizes[0] && sizes[0].split('x'),
      _ref2 = _slicedToArray(_ref, 2),
      viw = _ref2[0],
      vih = _ref2[1];

  var pr = '';

  if (protocols.length) {
    pr = protocols.join(',');
  }

  return {
    mind: mind,
    maxd: maxd,
    li: li,
    sd: sd,
    pt: pt,
    pr: pr,
    viw: viw,
    vih: vih
  };
}
/**
 * Gets bidfloor
 * @param {Object} mediaTypes
 * @param {Number} bidfloor
 * @param {Object} bid
 * @returns {Number} floor
 */


function _getFloor(mediaTypes, bidfloor, bid) {
  var curMediaType = Object.keys(mediaTypes)[0] || 'banner';
  var floor = bidfloor || 0;

  if (typeof bid.getFloor === 'function') {
    var floorInfo = bid.getFloor({
      currency: 'USD',
      mediaType: curMediaType,
      size: '*'
    });

    if (_typeof(floorInfo) === 'object' && floorInfo.currency === 'USD' && !isNaN(parseFloat(floorInfo.floor))) {
      floor = Math.max(floor, parseFloat(floorInfo.floor));
    }
  }

  return floor;
}
/**
 * Make a server request from the list of BidRequests.
 *
 * @param {validBidRequests[]} - an array of bids
 * @return ServerRequest Info describing the request to the server.
 */


function buildRequests(validBidRequests, bidderRequest) {
  var bids = [];
  var gdprConsent = bidderRequest && bidderRequest.gdprConsent;
  var uspConsent = bidderRequest && bidderRequest.uspConsent;
  var timeout = __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('bidderTimeout');
  var topWindowUrl = bidderRequest && bidderRequest.refererInfo && bidderRequest.refererInfo.referer;

  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](validBidRequests, function (bidRequest) {
    var bidId = bidRequest.bidId,
        _bidRequest$mediaType = bidRequest.mediaTypes,
        mediaTypes = _bidRequest$mediaType === void 0 ? {} : _bidRequest$mediaType,
        _bidRequest$params = bidRequest.params,
        params = _bidRequest$params === void 0 ? {} : _bidRequest$params,
        schain = bidRequest.schain,
        transactionId = bidRequest.transactionId,
        _bidRequest$userId = bidRequest.userId,
        userId = _bidRequest$userId === void 0 ? {} : _bidRequest$userId;

    var bidFloor = _getFloor(mediaTypes, params.bidfloor, bidRequest);

    var sizes = [1, 1];
    var data = {};

    if (mediaTypes.banner) {
      sizes = mediaTypes.banner.sizes;
    } else if (mediaTypes.video) {
      sizes = mediaTypes.video.playerSize;
    }

    if (pageViewId) {
      data.pv = pageViewId;
    }

    if (bidFloor) {
      data.fp = bidFloor;
    }

    if (params.inScreenPubID) {
      data.pubId = params.inScreenPubID;
      data.pi = 2;
    }

    if (params.inScreen) {
      data.t = params.inScreen;
      data.pi = 2;
    }

    if (params.inSlot) {
      data.si = parseInt(params.inSlot, 10);
      data.pi = 3;
    }

    if (params.ICV) {
      data.ni = parseInt(params.ICV, 10);
      data.pi = 5;
    }

    if (params.videoPubID) {
      data = _extends(data, _getVidParams(mediaTypes.video));
      data.pubId = params.videoPubID;
      data.pi = 7;
    }

    if (params.video) {
      data = _extends(data, _getVidParams(mediaTypes.video));
      data.t = params.video;
      data.pi = 7;
    }

    if (params.inVideo) {
      data = _extends(data, _getVidParams(mediaTypes.video));
      data.t = params.inVideo;
      data.pi = 6;
    }

    if (gdprConsent) {
      data.gdprApplies = gdprConsent.gdprApplies ? 1 : 0;
    }

    if (data.gdprApplies) {
      data.gdprConsent = gdprConsent.consentString;
    }

    if (uspConsent) {
      data.uspConsent = uspConsent;
    }

    if (schain && schain.nodes) {
      data.schain = _serializeSupplyChainObj(schain);
    }

    bids.push({
      id: bidId,
      tmax: timeout,
      tId: transactionId,
      pi: data.pi,
      selector: params.selector,
      sizes: sizes,
      url: BID_ENDPOINT,
      method: 'GET',
      data: _extends(data, _getBrowserParams(topWindowUrl), _getDigiTrustQueryParams(userId), _getTradeDeskIDParam(userId))
    });
  });

  return bids;
}
/**
 * Unpack the response from the server into a list of bids.
 *
 * @param {*} serverResponse A successful response from the server.
 * @return {Bid[]} An array of bids which were nested inside the server.
 */


function interpretResponse(serverResponse, bidRequest) {
  var bidResponses = [];
  var serverResponseBody = serverResponse.body;

  if (!serverResponseBody || serverResponseBody.err) {
    var _data = bidRequest.data || {};

    var id = _data.t || _data.si || _data.ni || _data.pubId;
    var delayTime = serverResponseBody ? serverResponseBody.err.drt : DELAY_REQUEST_TIME;
    invalidRequestIds[id] = {
      productId: _data.pi,
      timestamp: new Date().getTime()
    };
    setTimeout(function () {
      !!invalidRequestIds[id] && delete invalidRequestIds[id];
    }, delayTime);
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("[GumGum] Please check the implementation for ".concat(id));
  }

  var defaultResponse = {
    ad: {
      price: 0,
      id: 0,
      markup: ''
    },
    pag: {
      pvid: 0
    }
  };

  var _Object$assign = _extends(defaultResponse, serverResponseBody),
      _Object$assign$ad = _Object$assign.ad,
      cpm = _Object$assign$ad.price,
      creativeId = _Object$assign$ad.id,
      markup = _Object$assign$ad.markup,
      cur = _Object$assign$ad.cur,
      wrapper = _Object$assign.cw,
      pvid = _Object$assign.pag.pvid,
      jcsi = _Object$assign.jcsi;

  var data = bidRequest.data || {};
  var product = data.pi;
  var isTestUnit = product === 3 && data.si === 9;
  var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](bidRequest.sizes);

  var _sizes$0$split = sizes[0].split('x'),
      _sizes$0$split2 = _slicedToArray(_sizes$0$split, 2),
      width = _sizes$0$split2[0],
      height = _sizes$0$split2[1]; // return 1x1 when breakout expected


  if ((product === 2 || product === 5) && __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_includes___default()(sizes, '1x1')) {
    width = '1';
    height = '1';
  }

  if (jcsi) {
    serverResponseBody.jcsi = JCSI;
  } // update Page View ID from server response


  pageViewId = pvid;

  if (creativeId) {
    bidResponses.push(_objectSpread(_objectSpread(_objectSpread({}, product === 7 && {
      vastXml: markup
    }), {}, {
      ad: wrapper ? getWrapperCode(wrapper, _extends({}, serverResponseBody, {
        bidRequest: bidRequest
      })) : markup
    }, product === 6 && {
      ad: markup
    }), {}, {
      cpm: isTestUnit ? 0.1 : cpm,
      creativeId: creativeId,
      currency: cur || 'USD',
      height: height,
      netRevenue: true,
      requestId: bidRequest.id,
      ttl: TIME_TO_LIVE,
      width: width
    }));
  }

  return bidResponses;
}
/**
 * Register the user sync pixels which should be dropped after the auction.
 *
 * @param {SyncOptions} syncOptions Which user syncs are allowed?
 * @param {ServerResponse[]} serverResponses List of server's responses.
 * @return {UserSync[]} The user syncs which should be dropped.
 */


function getUserSyncs(syncOptions, serverResponses) {
  var responses = serverResponses.map(function (response) {
    return response.body && response.body.pxs && response.body.pxs.scr || [];
  });
  var userSyncs = responses.reduce(function (usersyncs, response) {
    return usersyncs.concat(response);
  }, []);
  var syncs = userSyncs.map(function (sync) {
    return {
      type: sync.t === 'f' ? 'iframe' : 'image',
      url: sync.u
    };
  });
  return syncs;
}

var spec = {
  code: BIDDER_CODE,
  aliases: ALIAS_BIDDER_CODE,
  isBidRequestValid: isBidRequestValid,
  buildRequests: buildRequests,
  interpretResponse: interpretResponse,
  getUserSyncs: getUserSyncs,
  supportedMediaTypes: SUPPORTED_MEDIA_TYPES
};
Object(__WEBPACK_IMPORTED_MODULE_5__src_adapters_bidderFactory_js__["registerBidder"])(spec);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(33)))

/***/ })

},[436]);