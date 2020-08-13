pbjsChunk([27],{

/***/ 523:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(524);


/***/ }),

/***/ 524:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapterManager_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_constants_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__src_constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_refererDetection_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_auction_js__ = __webpack_require__(40);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }








var analyticsType = 'endpoint';
var ENDPOINT = 'https://pb-logs.media.net/log?logid=kfk&evtid=prebid_analytics_events_client';
var CONFIG_URL = 'https://prebid.media.net/rtb/prebid/analytics/config';
var EVENT_PIXEL_URL = 'https://qsearch-a.akamaihd.net/log';
var DEFAULT_LOGGING_PERCENT = 50;
var PRICE_GRANULARITY = {
  'auto': 'pbAg',
  'custom': 'pbCg',
  'dense': 'pbDg',
  'low': 'pbLg',
  'medium': 'pbMg',
  'high': 'pbHg'
};
var MEDIANET_BIDDER_CODE = 'medianet'; // eslint-disable-next-line no-undef

var PREBID_VERSION = pbjs.version;
var ERROR_CONFIG_JSON_PARSE = 'analytics_config_parse_fail';
var ERROR_CONFIG_FETCH = 'analytics_config_ajax_fail';
var BID_SUCCESS = 1;
var BID_NOBID = 2;
var BID_TIMEOUT = 3;
var BID_FLOOR_REJECTED = 12;
var DUMMY_BIDDER = '-2';
var CONFIG_PENDING = 0;
var CONFIG_PASS = 1;
var CONFIG_ERROR = 3;
var VALID_URL_KEY = ['canonical_url', 'og_url', 'twitter_url'];
var DEFAULT_URL_KEY = 'page';
var auctions = {};
var config;
var pageDetails;
var logsQueue = [];

var ErrorLogger = /*#__PURE__*/function () {
  function ErrorLogger(event, additionalData) {
    _classCallCheck(this, ErrorLogger);

    this.event = event;
    this.logid = 'kfk';
    this.evtid = 'projectevents';
    this.project = 'prebidanalytics';
    this.dn = pageDetails.domain || '';
    this.requrl = pageDetails.requrl || '';
    this.event = this.event;
    this.pbversion = PREBID_VERSION;
    this.cid = config.cid || '';
    this.rd = additionalData;
  }

  _createClass(ErrorLogger, [{
    key: "send",
    value: function send() {
      var url = EVENT_PIXEL_URL + '?' + formatQS(this);
      __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["triggerPixel"](url);
    }
  }]);

  return ErrorLogger;
}();

var Configure = /*#__PURE__*/function () {
  function Configure(cid) {
    _classCallCheck(this, Configure);

    this.cid = cid;
    this.pubLper = -1;
    this.ajaxState = CONFIG_PENDING;
    this.loggingPercent = DEFAULT_LOGGING_PERCENT;
    this.urlToConsume = DEFAULT_URL_KEY;
    this.debug = false;
    this.gdprConsent = undefined;
    this.uspConsent = undefined;
  }

  _createClass(Configure, [{
    key: "getLoggingData",
    value: function getLoggingData() {
      return {
        cid: this.cid,
        lper: Math.round(100 / this.loggingPercent),
        plper: this.pubLper,
        gdpr: this.gdprConsent,
        ccpa: this.uspConsent,
        ajx: this.ajaxState,
        pbv: PREBID_VERSION,
        flt: 1
      };
    }
  }, {
    key: "_configURL",
    value: function _configURL() {
      return CONFIG_URL + '?cid=' + encodeURIComponent(this.cid) + '&dn=' + encodeURIComponent(pageDetails.domain);
    }
  }, {
    key: "_parseResponse",
    value: function _parseResponse(response) {
      try {
        response = JSON.parse(response);

        if (isNaN(response.percentage)) {
          throw new Error('not a number');
        }

        this.loggingPercent = response.percentage;
        this.urlToConsume = VALID_URL_KEY.includes(response.urlKey) ? response.urlKey : this.urlToConsume;
        this.ajaxState = CONFIG_PASS;
      } catch (e) {
        this.ajaxState = CONFIG_ERROR;
        /* eslint no-new: "error" */

        new ErrorLogger(ERROR_CONFIG_JSON_PARSE, e).send();
      }
    }
  }, {
    key: "_errorFetch",
    value: function _errorFetch() {
      this.ajaxState = CONFIG_ERROR;
      /* eslint no-new: "error" */

      new ErrorLogger(ERROR_CONFIG_FETCH).send();
    }
  }, {
    key: "init",
    value: function init() {
      // Forces Logging % to 100%
      var urlObj = URL.parseUrl(pageDetails.page);

      if (__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["deepAccess"](urlObj, 'search.medianet_test') || urlObj.hostname === 'localhost') {
        this.loggingPercent = 100;
        this.ajaxState = CONFIG_PASS;
        this.debug = true;
        return;
      }

      Object(__WEBPACK_IMPORTED_MODULE_4__src_ajax_js__["a" /* ajax */])(this._configURL(), {
        success: this._parseResponse.bind(this),
        error: this._errorFetch.bind(this)
      });
    }
  }, {
    key: "publisherLper",
    set: function set(plper) {
      this.pubLper = plper;
    }
  }]);

  return Configure;
}();

var PageDetail = /*#__PURE__*/function () {
  function PageDetail() {
    _classCallCheck(this, PageDetail);

    var canonicalUrl = this._getUrlFromSelector('link[rel="canonical"]', 'href');

    var ogUrl = this._getUrlFromSelector('meta[property="og:url"]', 'content');

    var twitterUrl = this._getUrlFromSelector('meta[name="twitter:url"]', 'content');

    var refererInfo = Object(__WEBPACK_IMPORTED_MODULE_5__src_refererDetection_js__["a" /* getRefererInfo */])();
    this.domain = URL.parseUrl(refererInfo.referer).host;
    this.page = refererInfo.referer;
    this.is_top = refererInfo.reachedTop;
    this.referrer = this._getTopWindowReferrer();
    this.canonical_url = canonicalUrl;
    this.og_url = ogUrl;
    this.twitter_url = twitterUrl;
    this.screen = this._getWindowSize();
  }

  _createClass(PageDetail, [{
    key: "_getTopWindowReferrer",
    value: function _getTopWindowReferrer() {
      try {
        return window.top.document.referrer;
      } catch (e) {
        return document.referrer;
      }
    }
  }, {
    key: "_getWindowSize",
    value: function _getWindowSize() {
      var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || -1;
      var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || -1;
      return "".concat(w, "x").concat(h);
    }
  }, {
    key: "_getAttributeFromSelector",
    value: function _getAttributeFromSelector(selector, attribute) {
      try {
        var doc = __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["getWindowTop"]().document;
        var element = doc.querySelector(selector);

        if (element !== null && element[attribute]) {
          return element[attribute];
        }
      } catch (e) {}
    }
  }, {
    key: "_getAbsoluteUrl",
    value: function _getAbsoluteUrl(url) {
      var aTag = __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["getWindowTop"]().document.createElement('a');
      aTag.href = url;
      return aTag.href;
    }
  }, {
    key: "_getUrlFromSelector",
    value: function _getUrlFromSelector(selector, attribute) {
      var attr = this._getAttributeFromSelector(selector, attribute);

      return attr && this._getAbsoluteUrl(attr);
    }
  }, {
    key: "getLoggingData",
    value: function getLoggingData() {
      return {
        requrl: this[config.urlToConsume] || this.page,
        dn: this.domain,
        ref: this.referrer,
        screen: this.screen
      };
    }
  }]);

  return PageDetail;
}();

var AdSlot = /*#__PURE__*/function () {
  function AdSlot(mediaTypes, allMediaTypeSizes, tmax, supplyAdCode, adext, context, adSize) {
    _classCallCheck(this, AdSlot);

    this.mediaTypes = mediaTypes;
    this.allMediaTypeSizes = allMediaTypeSizes;
    this.tmax = tmax;
    this.supplyAdCode = supplyAdCode;
    this.adext = adext;
    this.logged = false;
    this.targeting = undefined;
    this.medianetPresent = 0; // shouldBeLogged is assigned when requested,
    // since we are waiting for logging percent response

    this.shouldBeLogged = undefined;
    this.context = context;
    this.adSize = adSize; // old ad unit sizes
  }

  _createClass(AdSlot, [{
    key: "getShouldBeLogged",
    value: function getShouldBeLogged() {
      if (this.shouldBeLogged === undefined) {
        this.shouldBeLogged = isSampled();
      }

      return this.shouldBeLogged;
    }
  }, {
    key: "getLoggingData",
    value: function getLoggingData() {
      return _extends({
        supcrid: this.supplyAdCode,
        mediaTypes: this.mediaTypes && this.mediaTypes.join('|'),
        szs: this.allMediaTypeSizes.map(function (sz) {
          return sz.join('x');
        }).join('|'),
        tmax: this.tmax,
        targ: JSON.stringify(this.targeting),
        ismn: this.medianetPresent,
        vplcmtt: this.context,
        sz2: this.adSize.map(function (sz) {
          return sz.join('x');
        }).join('|')
      }, this.adext && {
        'adext': JSON.stringify(this.adext)
      });
    }
  }]);

  return AdSlot;
}();

var Bid = /*#__PURE__*/function () {
  function Bid(bidId, bidder, src, start, supplyAdCode) {
    _classCallCheck(this, Bid);

    this.bidId = bidId;
    this.bidder = bidder;
    this.src = src;
    this.start = start;
    this.supplyAdCode = supplyAdCode;
    this.iwb = 0;
    this.winner = 0;
    this.status = bidder === DUMMY_BIDDER ? BID_SUCCESS : BID_TIMEOUT;
    this.ext = {};
    this.originalCpm = undefined;
    this.cpm = undefined;
    this.dfpbd = undefined;
    this.width = undefined;
    this.height = undefined;
    this.mediaType = undefined;
    this.timeToRespond = undefined;
    this.dealId = undefined;
    this.creativeId = undefined;
    this.adId = undefined;
    this.currency = undefined;
    this.crid = undefined;
    this.pubcrid = undefined;
    this.mpvid = undefined;
    this.floorPrice = undefined;
    this.floorRule = undefined;
  }

  _createClass(Bid, [{
    key: "getLoggingData",
    value: function getLoggingData() {
      return {
        adid: this.adId,
        pvnm: this.bidder,
        src: this.src,
        ogbdp: this.originalCpm,
        bdp: this.cpm,
        cbdp: this.dfpbd,
        dfpbd: this.dfpbd,
        size: this.size,
        mtype: this.mediaType,
        dId: this.dealId,
        winner: this.winner,
        curr: this.currency,
        rests: this.timeToRespond,
        status: this.status,
        iwb: this.iwb,
        crid: this.crid,
        pubcrid: this.pubcrid,
        mpvid: this.mpvid,
        bidflr: this.floorPrice,
        flrrule: this.floorRule,
        ext: JSON.stringify(this.ext)
      };
    }
  }, {
    key: "size",
    get: function get() {
      if (!this.width || !this.height) {
        return '';
      }

      return this.width + 'x' + this.height;
    }
  }]);

  return Bid;
}();

var Auction = /*#__PURE__*/function () {
  function Auction(acid) {
    _classCallCheck(this, Auction);

    this.acid = acid;
    this.status = __WEBPACK_IMPORTED_MODULE_6__src_auction_js__["b" /* AUCTION_IN_PROGRESS */];
    this.bids = [];
    this.adSlots = {};
    this.auctionInitTime = undefined;
    this.auctionStartTime = undefined;
    this.setTargetingTime = undefined;
    this.auctionEndTime = undefined;
    this.bidWonTime = undefined;
    this.floorData = {};
  }

  _createClass(Auction, [{
    key: "hasEnded",
    value: function hasEnded() {
      return this.status === __WEBPACK_IMPORTED_MODULE_6__src_auction_js__["a" /* AUCTION_COMPLETED */];
    }
  }, {
    key: "getLoggingData",
    value: function getLoggingData() {
      return {
        sts: this.auctionStartTime - this.auctionInitTime,
        ets: this.auctionEndTime - this.auctionInitTime,
        tts: this.setTargetingTime - this.auctionInitTime,
        wts: this.bidWonTime - this.auctionInitTime,
        aucstatus: this.status,
        acid: this.acid,
        flrdata: this._mergeFieldsToLog({
          ln: this.floorData.location,
          skp: this.floorData.skipped,
          enfj: __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["deepAccess"](this.floorData, 'enforcements.enforceJS'),
          enfd: __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["deepAccess"](this.floorData, 'enforcements.floorDeals'),
          sr: this.floorData.skipRate,
          fs: this.floorData.fetchStatus
        }),
        flrver: this.floorData.modelVersion
      };
    }
  }, {
    key: "addSlot",
    value: function addSlot(supplyAdCode, _ref) {
      var mediaTypes = _ref.mediaTypes,
          allMediaTypeSizes = _ref.allMediaTypeSizes,
          tmax = _ref.tmax,
          adext = _ref.adext,
          context = _ref.context,
          adSize = _ref.adSize;

      if (supplyAdCode && this.adSlots[supplyAdCode] === undefined) {
        this.adSlots[supplyAdCode] = new AdSlot(mediaTypes, allMediaTypeSizes, tmax, supplyAdCode, adext, context, adSize);
        this.addBid(new Bid('-1', DUMMY_BIDDER, 'client', '-1', supplyAdCode));
      }
    }
  }, {
    key: "addBid",
    value: function addBid(bid) {
      this.bids.push(bid);
    }
  }, {
    key: "findBid",
    value: function findBid(key, value) {
      return this.bids.filter(function (bid) {
        return bid[key] === value;
      })[0];
    }
  }, {
    key: "getAdslotBids",
    value: function getAdslotBids(adslot) {
      return this.bids.filter(function (bid) {
        return bid.supplyAdCode === adslot;
      }).map(function (bid) {
        return bid.getLoggingData();
      });
    }
  }, {
    key: "getWinnerAdslotBid",
    value: function getWinnerAdslotBid(adslot) {
      return this.getAdslotBids(adslot).filter(function (bid) {
        return bid.winner;
      });
    }
  }, {
    key: "_mergeFieldsToLog",
    value: function _mergeFieldsToLog(objParams) {
      var logParams = [];
      var value;

      for (var _i = 0, _Object$keys = Object.keys(objParams); _i < _Object$keys.length; _i++) {
        var param = _Object$keys[_i];
        value = objParams[param];
        logParams.push(param + '=' + (value === undefined ? '' : value));
      }

      return logParams.join('||');
    }
  }]);

  return Auction;
}();

function auctionInitHandler(_ref2) {
  var auctionId = _ref2.auctionId,
      timestamp = _ref2.timestamp,
      bidderRequests = _ref2.bidderRequests;

  if (auctionId && auctions[auctionId] === undefined) {
    auctions[auctionId] = new Auction(auctionId);
    auctions[auctionId].auctionInitTime = timestamp;
  }

  var floorData = __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["deepAccess"](bidderRequests, '0.bids.0.floorData');

  if (floorData) {
    auctions[auctionId].floorData = _objectSpread({}, floorData);
  }
}

function bidRequestedHandler(_ref3) {
  var auctionId = _ref3.auctionId,
      auctionStart = _ref3.auctionStart,
      bids = _ref3.bids,
      start = _ref3.start,
      timeout = _ref3.timeout,
      uspConsent = _ref3.uspConsent,
      gdpr = _ref3.gdpr;

  if (!(auctions[auctionId] instanceof Auction)) {
    return;
  }

  if (gdpr && gdpr.gdprApplies) {
    config.gdprConsent = gdpr.consentString || '';
  }

  config.uspConsent = config.uspConsent || uspConsent;
  bids.forEach(function (bid) {
    var adUnitCode = bid.adUnitCode,
        bidder = bid.bidder,
        mediaTypes = bid.mediaTypes,
        sizes = bid.sizes,
        bidId = bid.bidId,
        src = bid.src;

    if (!auctions[auctionId].adSlots[adUnitCode]) {
      auctions[auctionId].auctionStartTime = auctionStart;

      var sizeObject = _getSizes(mediaTypes, sizes);

      auctions[auctionId].addSlot(adUnitCode, _extends({}, mediaTypes instanceof Object && {
        mediaTypes: Object.keys(mediaTypes)
      }, {
        allMediaTypeSizes: [].concat(sizeObject.banner, sizeObject.native, sizeObject.video)
      }, {
        adext: __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["deepAccess"](mediaTypes, 'banner.ext') || ''
      }, {
        tmax: timeout
      }, {
        context: __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["deepAccess"](mediaTypes, 'video.context') || ''
      }, {
        adSize: sizeObject.banner
      }));
    }

    var bidObj = new Bid(bidId, bidder, src, start, adUnitCode);
    auctions[auctionId].addBid(bidObj);

    if (bidder === MEDIANET_BIDDER_CODE) {
      bidObj.crid = __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["deepAccess"](bid, 'params.crid');
      bidObj.pubcrid = __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["deepAccess"](bid, 'params.crid');
      auctions[auctionId].adSlots[adUnitCode].medianetPresent = 1;
    }
  });
}

function _getSizes(mediaTypes, sizes) {
  var banner = __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["deepAccess"](mediaTypes, 'banner.sizes') || sizes || [];
  var native = __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["deepAccess"](mediaTypes, 'native') ? [[1, 1]] : [];
  var playerSize = __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["deepAccess"](mediaTypes, 'video.playerSize') || [];
  var video = [];

  if (playerSize.length === 2) {
    video = [playerSize];
  }

  return {
    banner: banner,
    native: native,
    video: video
  };
}

function bidResponseHandler(bid) {
  var width = bid.width,
      height = bid.height,
      mediaType = bid.mediaType,
      cpm = bid.cpm,
      requestId = bid.requestId,
      timeToRespond = bid.timeToRespond,
      auctionId = bid.auctionId,
      dealId = bid.dealId;
  var originalCpm = bid.originalCpm,
      bidderCode = bid.bidderCode,
      creativeId = bid.creativeId,
      adId = bid.adId,
      currency = bid.currency;

  if (!(auctions[auctionId] instanceof Auction)) {
    return;
  }

  var bidObj = auctions[auctionId].findBid('bidId', requestId);

  if (!(bidObj instanceof Bid)) {
    return;
  }

  _extends(bidObj, {
    cpm: cpm,
    width: width,
    height: height,
    mediaType: mediaType,
    timeToRespond: timeToRespond,
    dealId: dealId,
    creativeId: creativeId
  }, {
    adId: adId,
    currency: currency
  });

  bidObj.floorPrice = __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["deepAccess"](bid, 'floorData.floorValue');
  bidObj.floorRule = __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["deepAccess"](bid, 'floorData.floorRule');
  bidObj.originalCpm = originalCpm || cpm;
  var dfpbd = __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["deepAccess"](bid, 'adserverTargeting.hb_pb');

  if (!dfpbd) {
    var priceGranularity = Object(__WEBPACK_IMPORTED_MODULE_6__src_auction_js__["i" /* getPriceGranularity */])(mediaType, bid);
    var priceGranularityKey = PRICE_GRANULARITY[priceGranularity];
    dfpbd = bid[priceGranularityKey] || cpm;
  }

  bidObj.dfpbd = dfpbd;

  if (bid.status === __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.BID_STATUS.BID_REJECTED) {
    bidObj.status = BID_FLOOR_REJECTED;
  } else {
    bidObj.status = BID_SUCCESS;
  }

  if (bidderCode === MEDIANET_BIDDER_CODE && bid.ext instanceof Object) {
    _extends(bidObj, {
      'ext': bid.ext
    }, {
      'mpvid': bid.ext.pvid
    }, bid.ext.crid && {
      'crid': bid.ext.crid
    });
  }
}

function noBidResponseHandler(_ref4) {
  var auctionId = _ref4.auctionId,
      bidId = _ref4.bidId;

  if (!(auctions[auctionId] instanceof Auction)) {
    return;
  }

  if (auctions[auctionId].hasEnded()) {
    return;
  }

  var bidObj = auctions[auctionId].findBid('bidId', bidId);

  if (!(bidObj instanceof Bid)) {
    return;
  }

  bidObj.status = BID_NOBID;
}

function bidTimeoutHandler(timedOutBids) {
  timedOutBids.map(function (_ref5) {
    var bidId = _ref5.bidId,
        auctionId = _ref5.auctionId;

    if (!(auctions[auctionId] instanceof Auction)) {
      return;
    }

    var bidObj = auctions[auctionId].findBid('bidId', bidId);

    if (!(bidObj instanceof Bid)) {
      return;
    }

    bidObj.status = BID_TIMEOUT;
  });
}

function auctionEndHandler(_ref6) {
  var auctionId = _ref6.auctionId,
      auctionEnd = _ref6.auctionEnd;

  if (!(auctions[auctionId] instanceof Auction)) {
    return;
  }

  auctions[auctionId].status = __WEBPACK_IMPORTED_MODULE_6__src_auction_js__["a" /* AUCTION_COMPLETED */];
  auctions[auctionId].auctionEndTime = auctionEnd;
}

function setTargetingHandler(params) {
  var _loop = function _loop() {
    var adunit = _Object$keys2[_i2];

    var _loop2 = function _loop2() {
      var auctionId = _Object$keys3[_i3];
      var auctionObj = auctions[auctionId];
      var adunitObj = auctionObj.adSlots[adunit];

      if (!(adunitObj instanceof AdSlot)) {
        return "continue";
      }

      adunitObj.targeting = params[adunit];
      auctionObj.setTargetingTime = Date.now();
      var targetingObj = Object.keys(params[adunit]).reduce(function (result, key) {
        if (key.indexOf('hb_adid') !== -1) {
          result[key] = params[adunit][key];
        }

        return result;
      }, {});
      var bidAdIds = Object.keys(targetingObj).map(function (k) {
        return targetingObj[k];
      });
      auctionObj.bids.filter(function (bid) {
        return bidAdIds.indexOf(bid.adId) !== -1;
      }).map(function (bid) {
        bid.iwb = 1;
      });
      sendEvent(auctionId, adunit, false);
    };

    for (var _i3 = 0, _Object$keys3 = Object.keys(auctions); _i3 < _Object$keys3.length; _i3++) {
      var _ret = _loop2();

      if (_ret === "continue") continue;
    }
  };

  for (var _i2 = 0, _Object$keys2 = Object.keys(params); _i2 < _Object$keys2.length; _i2++) {
    _loop();
  }
}

function bidWonHandler(bid) {
  var requestId = bid.requestId,
      auctionId = bid.auctionId,
      adUnitCode = bid.adUnitCode;

  if (!(auctions[auctionId] instanceof Auction)) {
    return;
  }

  var bidObj = auctions[auctionId].findBid('bidId', requestId);

  if (!(bidObj instanceof Bid)) {
    return;
  }

  auctions[auctionId].bidWonTime = Date.now();
  bidObj.winner = 1;
  sendEvent(auctionId, adUnitCode, true);
}

function isSampled() {
  return Math.random() * 100 < parseFloat(config.loggingPercent);
}

function isValidAuctionAdSlot(acid, adtag) {
  return auctions[acid] instanceof Auction && auctions[acid].adSlots[adtag] instanceof AdSlot;
}

function sendEvent(id, adunit, isBidWonEvent) {
  if (!isValidAuctionAdSlot(id, adunit)) {
    return;
  }

  if (isBidWonEvent) {
    fireAuctionLog(id, adunit, isBidWonEvent);
  } else if (auctions[id].adSlots[adunit].getShouldBeLogged() && !auctions[id].adSlots[adunit].logged) {
    auctions[id].adSlots[adunit].logged = true;
    fireAuctionLog(id, adunit, isBidWonEvent);
  }
}

function getCommonLoggingData(acid, adtag) {
  var commonParams = _extends(pageDetails.getLoggingData(), config.getLoggingData());

  var adunitParams = auctions[acid].adSlots[adtag].getLoggingData();
  var auctionParams = auctions[acid].getLoggingData();
  return _extends(commonParams, adunitParams, auctionParams);
}

function fireAuctionLog(acid, adtag, isBidWonEvent) {
  var commonParams = getCommonLoggingData(acid, adtag);
  var targeting = __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["deepAccess"](commonParams, 'targ');
  Object.keys(commonParams).forEach(function (key) {
    return commonParams[key] == null && delete commonParams[key];
  });
  delete commonParams.targ;
  var bidParams;

  if (isBidWonEvent) {
    bidParams = auctions[acid].getWinnerAdslotBid(adtag);
    commonParams.lper = 1;
  } else {
    bidParams = auctions[acid].getAdslotBids(adtag).map(function (_ref7) {
      var winner = _ref7.winner,
          restParams = _objectWithoutProperties(_ref7, ["winner"]);

      return restParams;
    });
    delete commonParams.wts;
  }

  var mnetPresent = bidParams.filter(function (b) {
    return b.pvnm === MEDIANET_BIDDER_CODE;
  }).length > 0;

  if (!mnetPresent) {
    bidParams = bidParams.map(function (_ref8) {
      var mpvid = _ref8.mpvid,
          crid = _ref8.crid,
          ext = _ref8.ext,
          pubcrid = _ref8.pubcrid,
          restParams = _objectWithoutProperties(_ref8, ["mpvid", "crid", "ext", "pubcrid"]);

      return restParams;
    });
  }

  var url = formatQS(commonParams) + '&';
  bidParams.forEach(function (bidParams) {
    url = url + formatQS(bidParams) + '&';
  });
  url = url + formatQS({
    targ: targeting
  });
  firePixel(url);
}

function formatQS(data) {
  return __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["_map"](data, function (value, key) {
    if (value === undefined) {
      return key + '=';
    }

    if (__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["isPlainObject"](value)) {
      value = JSON.stringify(value);
    }

    return key + '=' + encodeURIComponent(value);
  }).join('&');
}

function firePixel(qs) {
  logsQueue.push(ENDPOINT + '&' + qs);
  __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["triggerPixel"](ENDPOINT + '&' + qs);
}

var URL = /*#__PURE__*/function () {
  function URL() {
    _classCallCheck(this, URL);
  }

  _createClass(URL, null, [{
    key: "parseUrl",
    value: function parseUrl(url) {
      var parsed = document.createElement('a');
      parsed.href = decodeURIComponent(url);
      return {
        hostname: parsed.hostname,
        search: URL.parseQS(parsed.search || ''),
        host: parsed.host || window.location.host
      };
    }
  }, {
    key: "parseQS",
    value: function parseQS(query) {
      return !query ? {} : query.replace(/^\?/, '').split('&').reduce(function (acc, criteria) {
        var _criteria$split = criteria.split('='),
            _criteria$split2 = _slicedToArray(_criteria$split, 2),
            k = _criteria$split2[0],
            v = _criteria$split2[1];

        if (/\[\]$/.test(k)) {
          k = k.replace('[]', '');
          acc[k] = acc[k] || [];
          acc[k].push(v);
        } else {
          acc[k] = v || '';
        }

        return acc;
      }, {});
    }
  }]);

  return URL;
}();

var medianetAnalytics = _extends(Object(__WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter_js__["a" /* default */])({
  URL: URL,
  analyticsType: analyticsType
}), {
  getlogsQueue: function getlogsQueue() {
    return logsQueue;
  },
  clearlogsQueue: function clearlogsQueue() {
    logsQueue = [];
    auctions = {};
  },
  track: function track(_ref9) {
    var eventType = _ref9.eventType,
        args = _ref9.args;

    if (config.debug) {
      __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["logInfo"](eventType, args);
    }

    switch (eventType) {
      case __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.AUCTION_INIT:
        {
          auctionInitHandler(args);
          break;
        }

      case __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.BID_REQUESTED:
        {
          bidRequestedHandler(args);
          break;
        }

      case __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.BID_RESPONSE:
        {
          bidResponseHandler(args);
          break;
        }

      case __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.BID_TIMEOUT:
        {
          bidTimeoutHandler(args);
          break;
        }

      case __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.NO_BID:
        {
          noBidResponseHandler(args);
          break;
        }

      case __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.AUCTION_END:
        {
          auctionEndHandler(args);
          break;
        }

      case __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.SET_TARGETING:
        {
          setTargetingHandler(args);
          break;
        }

      case __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.BID_WON:
        {
          bidWonHandler(args);
          break;
        }
    }
  }
});

medianetAnalytics.originEnableAnalytics = medianetAnalytics.enableAnalytics;

medianetAnalytics.enableAnalytics = function (configuration) {
  if (!configuration || !configuration.options || !configuration.options.cid) {
    __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["logError"]('Media.net Analytics adapter: cid is required.');
    return;
  }

  pbjs.medianetGlobals = pbjs.medianetGlobals || {};
  pbjs.medianetGlobals.analyticsEnabled = true;
  pageDetails = new PageDetail();
  config = new Configure(configuration.options.cid);
  config.publisherLper = configuration.options.sampling || '';
  config.init();
  configuration.options.sampling = 1;
  medianetAnalytics.originEnableAnalytics(configuration);
};

__WEBPACK_IMPORTED_MODULE_1__src_adapterManager_js__["default"].registerAnalyticsAdapter({
  adapter: medianetAnalytics,
  code: 'medianetAnalytics'
});
/* harmony default export */ __webpack_exports__["default"] = (medianetAnalytics);

/***/ }),

/***/ 6:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = AnalyticsAdapter;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ajax_js__ = __webpack_require__(4);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }




var events = __webpack_require__(8);

var utils = __webpack_require__(0);

var _CONSTANTS$EVENTS = __WEBPACK_IMPORTED_MODULE_0__constants_json___default.a.EVENTS,
    AUCTION_INIT = _CONSTANTS$EVENTS.AUCTION_INIT,
    AUCTION_END = _CONSTANTS$EVENTS.AUCTION_END,
    REQUEST_BIDS = _CONSTANTS$EVENTS.REQUEST_BIDS,
    BID_REQUESTED = _CONSTANTS$EVENTS.BID_REQUESTED,
    BID_TIMEOUT = _CONSTANTS$EVENTS.BID_TIMEOUT,
    BID_RESPONSE = _CONSTANTS$EVENTS.BID_RESPONSE,
    NO_BID = _CONSTANTS$EVENTS.NO_BID,
    BID_WON = _CONSTANTS$EVENTS.BID_WON,
    BID_ADJUSTMENT = _CONSTANTS$EVENTS.BID_ADJUSTMENT,
    BIDDER_DONE = _CONSTANTS$EVENTS.BIDDER_DONE,
    SET_TARGETING = _CONSTANTS$EVENTS.SET_TARGETING,
    AD_RENDER_FAILED = _CONSTANTS$EVENTS.AD_RENDER_FAILED,
    ADD_AD_UNITS = _CONSTANTS$EVENTS.ADD_AD_UNITS;
var ENDPOINT = 'endpoint';
var BUNDLE = 'bundle';
var _sampled = true;
function AnalyticsAdapter(_ref) {
  var url = _ref.url,
      analyticsType = _ref.analyticsType,
      global = _ref.global,
      handler = _ref.handler;
  var _queue = [];
  var _eventCount = 0;
  var _enableCheck = true;

  var _handlers;

  if (analyticsType === ENDPOINT || BUNDLE) {
    _emptyQueue();
  }

  return {
    track: _track,
    enqueue: _enqueue,
    enableAnalytics: _enable,
    disableAnalytics: _disable,
    getAdapterType: function getAdapterType() {
      return analyticsType;
    },
    getGlobal: function getGlobal() {
      return global;
    },
    getHandler: function getHandler() {
      return handler;
    },
    getUrl: function getUrl() {
      return url;
    }
  };

  function _track(_ref2) {
    var eventType = _ref2.eventType,
        args = _ref2.args;

    if (this.getAdapterType() === BUNDLE) {
      window[global](handler, eventType, args);
    }

    if (this.getAdapterType() === ENDPOINT) {
      _callEndpoint.apply(void 0, arguments);
    }
  }

  function _callEndpoint(_ref3) {
    var eventType = _ref3.eventType,
        args = _ref3.args,
        callback = _ref3.callback;
    Object(__WEBPACK_IMPORTED_MODULE_1__ajax_js__["a" /* ajax */])(url, callback, JSON.stringify({
      eventType: eventType,
      args: args
    }));
  }

  function _enqueue(_ref4) {
    var eventType = _ref4.eventType,
        args = _ref4.args;

    var _this = this;

    if (global && window[global] && eventType && args) {
      this.track({
        eventType: eventType,
        args: args
      });
    } else {
      _queue.push(function () {
        _eventCount++;

        _this.track({
          eventType: eventType,
          args: args
        });
      });
    }
  }

  function _enable(config) {
    var _this2 = this;

    var _this = this;

    if (_typeof(config) === 'object' && _typeof(config.options) === 'object') {
      _sampled = typeof config.options.sampling === 'undefined' || Math.random() < parseFloat(config.options.sampling);
    } else {
      _sampled = true;
    }

    if (_sampled) {
      var _handlers2;

      // first send all events fired before enableAnalytics called
      events.getEvents().forEach(function (event) {
        if (!event) {
          return;
        }

        var eventType = event.eventType,
            args = event.args;

        if (eventType !== BID_TIMEOUT) {
          _enqueue.call(_this, {
            eventType: eventType,
            args: args
          });
        }
      }); // Next register event listeners to send data immediately

      _handlers = (_handlers2 = {}, _defineProperty(_handlers2, REQUEST_BIDS, function (args) {
        return _this2.enqueue({
          eventType: REQUEST_BIDS,
          args: args
        });
      }), _defineProperty(_handlers2, BID_REQUESTED, function (args) {
        return _this2.enqueue({
          eventType: BID_REQUESTED,
          args: args
        });
      }), _defineProperty(_handlers2, BID_RESPONSE, function (args) {
        return _this2.enqueue({
          eventType: BID_RESPONSE,
          args: args
        });
      }), _defineProperty(_handlers2, NO_BID, function (args) {
        return _this2.enqueue({
          eventType: NO_BID,
          args: args
        });
      }), _defineProperty(_handlers2, BID_TIMEOUT, function (args) {
        return _this2.enqueue({
          eventType: BID_TIMEOUT,
          args: args
        });
      }), _defineProperty(_handlers2, BID_WON, function (args) {
        return _this2.enqueue({
          eventType: BID_WON,
          args: args
        });
      }), _defineProperty(_handlers2, BID_ADJUSTMENT, function (args) {
        return _this2.enqueue({
          eventType: BID_ADJUSTMENT,
          args: args
        });
      }), _defineProperty(_handlers2, BIDDER_DONE, function (args) {
        return _this2.enqueue({
          eventType: BIDDER_DONE,
          args: args
        });
      }), _defineProperty(_handlers2, SET_TARGETING, function (args) {
        return _this2.enqueue({
          eventType: SET_TARGETING,
          args: args
        });
      }), _defineProperty(_handlers2, AUCTION_END, function (args) {
        return _this2.enqueue({
          eventType: AUCTION_END,
          args: args
        });
      }), _defineProperty(_handlers2, AD_RENDER_FAILED, function (args) {
        return _this2.enqueue({
          eventType: AD_RENDER_FAILED,
          args: args
        });
      }), _defineProperty(_handlers2, ADD_AD_UNITS, function (args) {
        return _this2.enqueue({
          eventType: ADD_AD_UNITS,
          args: args
        });
      }), _defineProperty(_handlers2, AUCTION_INIT, function (args) {
        args.config = _typeof(config) === 'object' ? config.options || {} : {}; // enableAnaltyics configuration object

        _this2.enqueue({
          eventType: AUCTION_INIT,
          args: args
        });
      }), _handlers2);

      utils._each(_handlers, function (handler, event) {
        events.on(event, handler);
      });
    } else {
      utils.logMessage("Analytics adapter for \"".concat(global, "\" disabled by sampling"));
    } // finally set this function to return log message, prevents multiple adapter listeners


    this._oldEnable = this.enableAnalytics;

    this.enableAnalytics = function _enable() {
      return utils.logMessage("Analytics adapter for \"".concat(global, "\" already enabled, unnecessary call to `enableAnalytics`."));
    };
  }

  function _disable() {
    utils._each(_handlers, function (handler, event) {
      events.off(event, handler);
    });

    this.enableAnalytics = this._oldEnable ? this._oldEnable : _enable;
  }

  function _emptyQueue() {
    if (_enableCheck) {
      for (var i = 0; i < _queue.length; i++) {
        _queue[i]();
      } // override push to execute the command immediately from now on


      _queue.push = function (fn) {
        fn();
      };

      _enableCheck = false;
    }

    utils.logMessage("event count sent to ".concat(global, ": ").concat(_eventCount));
  }
}

/***/ })

},[523]);