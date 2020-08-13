pbjsChunk([23],{

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

/***/ }),

/***/ 608:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(609);


/***/ }),

/***/ 609:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapterManager_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_constants_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__src_constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_prebidGlobal_js__ = __webpack_require__(20);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }







 /// /////////// CONSTANTS //////////////

var ADAPTER_CODE = 'pubmatic';
var SEND_TIMEOUT = 2000;
var END_POINT_HOST = 'https://t.pubmatic.com/';
var END_POINT_BID_LOGGER = END_POINT_HOST + 'wl?';
var END_POINT_WIN_BID_LOGGER = END_POINT_HOST + 'wt?';
var LOG_PRE_FIX = 'PubMatic-Analytics: ';
var cache = {
  auctions: {}
};
var SUCCESS = 'success';
var NO_BID = 'no-bid';
var ERROR = 'error';
var REQUEST_ERROR = 'request-error';
var TIMEOUT_ERROR = 'timeout-error';
var EMPTY_STRING = '';
var MEDIA_TYPE_BANNER = 'banner';
var CURRENCY_USD = 'USD';
var BID_PRECISION = 2; // todo: input profileId and profileVersionId ; defaults to zero or one

var DEFAULT_PUBLISHER_ID = 0;
var DEFAULT_PROFILE_ID = 0;
var DEFAULT_PROFILE_VERSION_ID = 0;
var enc = window.encodeURIComponent; /// /////////// VARIABLES //////////////

var publisherId = DEFAULT_PUBLISHER_ID; // int: mandatory

var profileId = DEFAULT_PROFILE_ID; // int: optional

var profileVersionId = DEFAULT_PROFILE_VERSION_ID; // int: optional

var s2sBidders = []; /// /////////// HELPER FUNCTIONS //////////////

function sizeToDimensions(size) {
  return {
    width: size.w || size[0],
    height: size.h || size[1]
  };
}

function validMediaType(type) {
  return {
    'banner': 1,
    'native': 1,
    'video': 1
  }.hasOwnProperty(type);
}

function formatSource(src) {
  if (typeof src === 'undefined') {
    src = 'client';
  } else if (src === 's2s') {
    src = 'server';
  }

  return src.toLowerCase();
}

function setMediaTypes(types, bid) {
  if (bid.mediaType && validMediaType(bid.mediaType)) {
    return [bid.mediaType];
  }

  if (Array.isArray(types)) {
    return types.filter(validMediaType);
  }

  if (_typeof(types) === 'object') {
    if (!bid.sizes) {
      bid.dimensions = [];

      __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["_each"](types, function (type) {
        return bid.dimensions = bid.dimensions.concat(type.sizes.map(sizeToDimensions));
      });
    }

    return Object.keys(types).filter(validMediaType);
  }

  return [MEDIA_TYPE_BANNER];
}

function copyRequiredBidDetails(bid) {
  return __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["pick"](bid, ['bidder', function (bidder) {
    return bidder.toLowerCase();
  }, 'bidId', 'status', function () {
    return NO_BID;
  }, // default a bid to NO_BID until response is recieved or bid is timed out
  'finalSource as source', 'params', 'adUnit', function () {
    return __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["pick"](bid, ['adUnitCode', 'transactionId', 'sizes as dimensions', function (sizes) {
      return sizes.map(sizeToDimensions);
    }, 'mediaTypes', function (types) {
      return setMediaTypes(types, bid);
    }]);
  }]);
}

function setBidStatus(bid, args) {
  switch (args.getStatusCode()) {
    case __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.STATUS.GOOD:
      bid.status = SUCCESS;
      delete bid.error; // it's possible for this to be set by a previous timeout

      break;

    case __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.STATUS.NO_BID:
      bid.status = NO_BID;
      delete bid.error;
      break;

    default:
      bid.status = ERROR;
      bid.error = {
        code: REQUEST_ERROR
      };
  }
}

function parseBidResponse(bid) {
  return __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["pick"](bid, ['bidPriceUSD', function () {
    // todo: check whether currency cases are handled here
    if (typeof bid.currency === 'string' && bid.currency.toUpperCase() === CURRENCY_USD) {
      return window.parseFloat(Number(bid.cpm).toFixed(BID_PRECISION));
    } // use currency conversion function if present


    if (typeof bid.getCpmInNewCurrency === 'function') {
      return window.parseFloat(Number(bid.getCpmInNewCurrency(CURRENCY_USD)).toFixed(BID_PRECISION));
    }

    __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["logWarn"](LOG_PRE_FIX + 'Could not determine the Net cpm in USD for the bid thus using bid.cpm', bid);
    return bid.cpm;
  }, 'bidGrossCpmUSD', function () {
    if (typeof bid.originalCurrency === 'string' && bid.originalCurrency.toUpperCase() === CURRENCY_USD) {
      return window.parseFloat(Number(bid.originalCpm).toFixed(BID_PRECISION));
    } // use currency conversion function if present


    if (typeof Object(__WEBPACK_IMPORTED_MODULE_6__src_prebidGlobal_js__["a" /* getGlobal */])().convertCurrency === 'function') {
      return window.parseFloat(Number(Object(__WEBPACK_IMPORTED_MODULE_6__src_prebidGlobal_js__["a" /* getGlobal */])().convertCurrency(bid.originalCpm, bid.originalCurrency, CURRENCY_USD)).toFixed(BID_PRECISION));
    }

    __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["logWarn"](LOG_PRE_FIX + 'Could not determine the Gross cpm in USD for the bid, thus using bid.originalCpm', bid);
    return bid.originalCpm;
  }, 'dealId', 'currency', 'cpm', function () {
    return window.parseFloat(Number(bid.cpm).toFixed(BID_PRECISION));
  }, 'originalCpm', function () {
    return window.parseFloat(Number(bid.originalCpm).toFixed(BID_PRECISION));
  }, 'originalCurrency', 'dealChannel', 'meta', 'status', 'error', 'bidId', 'mediaType', 'params', 'mi', 'partnerImpId', // partner impression ID
  'dimensions', function () {
    return __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["pick"](bid, ['width', 'height']);
  }]);
}

function getDomainFromUrl(url) {
  var a = window.document.createElement('a');
  a.href = url;
  return a.hostname;
}

function gatherPartnerBidsForAdUnitForLogger(adUnit, adUnitId, highestBid) {
  highestBid = highestBid && highestBid.length > 0 ? highestBid[0] : null;
  return Object.keys(adUnit.bids).reduce(function (partnerBids, bidId) {
    var bid = adUnit.bids[bidId];
    partnerBids.push({
      'pn': bid.bidder,
      'bidid': bid.bidId,
      'db': bid.bidResponse ? 0 : 1,
      'kgpv': bid.params.kgpv ? bid.params.kgpv : adUnitId,
      'kgpsv': bid.params.kgpv ? bid.params.kgpv : adUnitId,
      'psz': bid.bidResponse ? bid.bidResponse.dimensions.width + 'x' + bid.bidResponse.dimensions.height : '0x0',
      'eg': bid.bidResponse ? bid.bidResponse.bidGrossCpmUSD : 0,
      'en': bid.bidResponse ? bid.bidResponse.bidPriceUSD : 0,
      'di': bid.bidResponse ? bid.bidResponse.dealId || EMPTY_STRING : EMPTY_STRING,
      'dc': bid.bidResponse ? bid.bidResponse.dealChannel || EMPTY_STRING : EMPTY_STRING,
      'l1': bid.bidResponse ? bid.clientLatencyTimeMs : 0,
      'l2': 0,
      'ss': s2sBidders.indexOf(bid.bidder) > -1 ? 1 : 0,
      't': bid.status == ERROR && bid.error.code == TIMEOUT_ERROR ? 1 : 0,
      'wb': highestBid && highestBid.requestId === bid.bidId ? 1 : 0,
      'mi': bid.bidResponse ? bid.bidResponse.mi || undefined : undefined,
      'af': bid.bidResponse ? bid.bidResponse.mediaType || undefined : undefined,
      'ocpm': bid.bidResponse ? bid.bidResponse.originalCpm || 0 : 0,
      'ocry': bid.bidResponse ? bid.bidResponse.originalCurrency || CURRENCY_USD : CURRENCY_USD,
      'piid': bid.bidResponse ? bid.bidResponse.partnerImpId || EMPTY_STRING : EMPTY_STRING
    });
    return partnerBids;
  }, []);
}

function executeBidsLoggerCall(e, highestCpmBids) {
  var auctionId = e.auctionId;
  var referrer = __WEBPACK_IMPORTED_MODULE_4__src_config_js__["b" /* config */].getConfig('pageUrl') || cache.auctions[auctionId].referer || '';
  var auctionCache = cache.auctions[auctionId];
  var outputObj = {
    s: []
  };
  var pixelURL = END_POINT_BID_LOGGER;

  if (!auctionCache) {
    return;
  }

  if (auctionCache.sent) {
    return;
  }

  pixelURL += 'pubid=' + publisherId;
  outputObj['pubid'] = '' + publisherId;
  outputObj['iid'] = '' + auctionId;
  outputObj['to'] = '' + auctionCache.timeout;
  outputObj['purl'] = referrer;
  outputObj['orig'] = getDomainFromUrl(referrer);
  outputObj['tst'] = Math.round(new window.Date().getTime() / 1000);
  outputObj['pid'] = '' + profileId;
  outputObj['pdvid'] = '' + profileVersionId;

  outputObj['tgid'] = function () {
    var testGroupId = parseInt(__WEBPACK_IMPORTED_MODULE_4__src_config_js__["b" /* config */].getConfig('testGroupId') || 0);

    if (testGroupId <= 15 && testGroupId >= 0) {
      return testGroupId;
    }

    return 0;
  }(); // GDPR support


  if (auctionCache.gdprConsent) {
    outputObj['cns'] = auctionCache.gdprConsent.consentString || '';
    outputObj['gdpr'] = auctionCache.gdprConsent.gdprApplies === true ? 1 : 0;
    pixelURL += '&gdEn=1';
  }

  outputObj.s = Object.keys(auctionCache.adUnitCodes).reduce(function (slotsArray, adUnitId) {
    var adUnit = auctionCache.adUnitCodes[adUnitId];
    var slotObject = {
      'sn': adUnitId,
      'sz': adUnit.dimensions.map(function (e) {
        return e[0] + 'x' + e[1];
      }),
      'ps': gatherPartnerBidsForAdUnitForLogger(adUnit, adUnitId, highestCpmBids.filter(function (bid) {
        return bid.adUnitCode === adUnitId;
      }))
    };
    slotsArray.push(slotObject);
    return slotsArray;
  }, []);
  auctionCache.sent = true;
  Object(__WEBPACK_IMPORTED_MODULE_3__src_ajax_js__["a" /* ajax */])(pixelURL, null, 'json=' + enc(JSON.stringify(outputObj)), {
    contentType: 'application/x-www-form-urlencoded',
    withCredentials: true,
    method: 'POST'
  });
}

function executeBidWonLoggerCall(auctionId, adUnitId) {
  var winningBidId = cache.auctions[auctionId].adUnitCodes[adUnitId].bidWon;
  var winningBid = cache.auctions[auctionId].adUnitCodes[adUnitId].bids[winningBidId];
  var pixelURL = END_POINT_WIN_BID_LOGGER;
  pixelURL += 'pubid=' + publisherId;
  pixelURL += '&purl=' + enc(__WEBPACK_IMPORTED_MODULE_4__src_config_js__["b" /* config */].getConfig('pageUrl') || cache.auctions[auctionId].referer || '');
  pixelURL += '&tst=' + Math.round(new window.Date().getTime() / 1000);
  pixelURL += '&iid=' + enc(auctionId);
  pixelURL += '&bidid=' + enc(winningBidId);
  pixelURL += '&pid=' + enc(profileId);
  pixelURL += '&pdvid=' + enc(profileVersionId);
  pixelURL += '&slot=' + enc(adUnitId);
  pixelURL += '&pn=' + enc(winningBid.bidder);
  pixelURL += '&en=' + enc(winningBid.bidResponse.bidPriceUSD);
  pixelURL += '&eg=' + enc(winningBid.bidResponse.bidGrossCpmUSD);
  pixelURL += '&kgpv=' + enc(winningBid.params.kgpv || adUnitId);
  pixelURL += '&piid=' + enc(winningBid.bidResponse.partnerImpId || EMPTY_STRING);
  Object(__WEBPACK_IMPORTED_MODULE_3__src_ajax_js__["a" /* ajax */])(pixelURL, null, null, {
    contentType: 'application/x-www-form-urlencoded',
    withCredentials: true,
    method: 'GET'
  });
} /// /////////// ADAPTER EVENT HANDLER FUNCTIONS //////////////


function auctionInitHandler(args) {
  s2sBidders = function () {
    var s2sConf = __WEBPACK_IMPORTED_MODULE_4__src_config_js__["b" /* config */].getConfig('s2sConfig');
    return s2sConf && __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["isArray"](s2sConf.bidders) ? s2sConf.bidders : [];
  }();

  var cacheEntry = __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["pick"](args, ['timestamp', 'timeout', 'bidderDonePendingCount', function () {
    return args.bidderRequests.length;
  }]);
  cacheEntry.adUnitCodes = {};
  cacheEntry.referer = args.bidderRequests[0].refererInfo.referer;
  cache.auctions[args.auctionId] = cacheEntry;
}

function bidRequestedHandler(args) {
  cache.auctions[args.auctionId].gdprConsent = args.gdprConsent || undefined;
  args.bids.forEach(function (bid) {
    if (!cache.auctions[args.auctionId].adUnitCodes.hasOwnProperty(bid.adUnitCode)) {
      cache.auctions[args.auctionId].adUnitCodes[bid.adUnitCode] = {
        bids: {},
        bidWon: false,
        dimensions: bid.sizes
      };
    }

    cache.auctions[args.auctionId].adUnitCodes[bid.adUnitCode].bids[bid.bidId] = copyRequiredBidDetails(bid);
  });
}

function bidResponseHandler(args) {
  var bid = cache.auctions[args.auctionId].adUnitCodes[args.adUnitCode].bids[args.requestId];

  if (!bid) {
    __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["logError"](LOG_PRE_FIX + 'Could not find associated bid request for bid response with requestId: ', args.requestId);
    return;
  }

  bid.source = formatSource(bid.source || args.source);
  setBidStatus(bid, args);
  bid.clientLatencyTimeMs = Date.now() - cache.auctions[args.auctionId].timestamp;
  bid.bidResponse = parseBidResponse(args);
}

function bidderDoneHandler(args) {
  cache.auctions[args.auctionId].bidderDonePendingCount--;
  args.bids.forEach(function (bid) {
    var cachedBid = cache.auctions[bid.auctionId].adUnitCodes[bid.adUnitCode].bids[bid.bidId || bid.requestId];

    if (typeof bid.serverResponseTimeMs !== 'undefined') {
      cachedBid.serverLatencyTimeMs = bid.serverResponseTimeMs;
    }

    if (!cachedBid.status) {
      cachedBid.status = NO_BID;
    }

    if (!cachedBid.clientLatencyTimeMs) {
      cachedBid.clientLatencyTimeMs = Date.now() - cache.auctions[bid.auctionId].timestamp;
    }
  });
}

function bidWonHandler(args) {
  var auctionCache = cache.auctions[args.auctionId];
  auctionCache.adUnitCodes[args.adUnitCode].bidWon = args.requestId;
  executeBidWonLoggerCall(args.auctionId, args.adUnitCode);
}

function auctionEndHandler(args) {
  var _this = this;

  // if for the given auction bidderDonePendingCount == 0 then execute logger call sooners
  var highestCpmBids = Object(__WEBPACK_IMPORTED_MODULE_6__src_prebidGlobal_js__["a" /* getGlobal */])().getHighestCpmBids() || [];
  setTimeout(function () {
    executeBidsLoggerCall.call(_this, args, highestCpmBids);
  }, cache.auctions[args.auctionId].bidderDonePendingCount === 0 ? 500 : SEND_TIMEOUT);
}

function bidTimeoutHandler(args) {
  // db = 1 and t = 1 means bidder did NOT respond with a bid but we got a timeout notification
  // db = 0 and t = 1 means bidder did  respond with a bid but post timeout
  args.forEach(function (badBid) {
    var auctionCache = cache.auctions[badBid.auctionId];
    var bid = auctionCache.adUnitCodes[badBid.adUnitCode].bids[badBid.bidId || badBid.requestId];

    if (bid) {
      bid.status = ERROR;
      bid.error = {
        code: TIMEOUT_ERROR
      };
    } else {
      __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["logWarn"](LOG_PRE_FIX + 'bid not found');
    }
  });
} /// /////////// ADAPTER DEFINITION //////////////


var baseAdapter = Object(__WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter_js__["a" /* default */])({
  analyticsType: 'endpoint'
});

var pubmaticAdapter = _extends({}, baseAdapter, {
  enableAnalytics: function enableAnalytics() {
    var conf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var error = false;

    if (_typeof(conf.options) === 'object') {
      if (conf.options.publisherId) {
        publisherId = Number(conf.options.publisherId);
      }

      profileId = Number(conf.options.profileId) || DEFAULT_PROFILE_ID;
      profileVersionId = Number(conf.options.profileVersionId) || DEFAULT_PROFILE_VERSION_ID;
    } else {
      __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["logError"](LOG_PRE_FIX + 'Config not found.');
      error = true;
    }

    if (!publisherId) {
      __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["logError"](LOG_PRE_FIX + 'Missing publisherId(Number).');
      error = true;
    }

    if (error) {
      __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["logError"](LOG_PRE_FIX + 'Not collecting data due to error(s).');
    } else {
      baseAdapter.enableAnalytics.call(this, conf);
    }
  },
  disableAnalytics: function disableAnalytics() {
    publisherId = DEFAULT_PUBLISHER_ID;
    profileId = DEFAULT_PROFILE_ID;
    profileVersionId = DEFAULT_PROFILE_VERSION_ID;
    s2sBidders = [];
    baseAdapter.disableAnalytics.apply(this, arguments);
  },
  track: function track(_ref) {
    var eventType = _ref.eventType,
        args = _ref.args;

    switch (eventType) {
      case __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.AUCTION_INIT:
        auctionInitHandler(args);
        break;

      case __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.BID_REQUESTED:
        bidRequestedHandler(args);
        break;

      case __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.BID_RESPONSE:
        bidResponseHandler(args);
        break;

      case __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.BIDDER_DONE:
        bidderDoneHandler(args);
        break;

      case __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.BID_WON:
        bidWonHandler(args);
        break;

      case __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.AUCTION_END:
        auctionEndHandler(args);
        break;

      case __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.BID_TIMEOUT:
        bidTimeoutHandler(args);
        break;
    }
  }
}); /// /////////// ADAPTER REGISTRATION //////////////


__WEBPACK_IMPORTED_MODULE_1__src_adapterManager_js__["default"].registerAnalyticsAdapter({
  adapter: pubmaticAdapter,
  code: ADAPTER_CODE
});
/* harmony default export */ __webpack_exports__["default"] = (pubmaticAdapter);

/***/ })

},[608]);