pbjsChunk([15],{

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

/***/ 662:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(663);


/***/ }),

/***/ 663:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SEND_TIMEOUT", function() { return SEND_TIMEOUT; });
/* harmony export (immutable) */ __webpack_exports__["getHostNameFromReferer"] = getHostNameFromReferer;
/* harmony export (immutable) */ __webpack_exports__["parseBidResponse"] = parseBidResponse;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapterManager_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_constants_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__src_constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_prebidGlobal_js__ = __webpack_require__(20);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }








var _CONSTANTS$EVENTS = __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS,
    AUCTION_INIT = _CONSTANTS$EVENTS.AUCTION_INIT,
    AUCTION_END = _CONSTANTS$EVENTS.AUCTION_END,
    BID_REQUESTED = _CONSTANTS$EVENTS.BID_REQUESTED,
    BID_RESPONSE = _CONSTANTS$EVENTS.BID_RESPONSE,
    BIDDER_DONE = _CONSTANTS$EVENTS.BIDDER_DONE,
    BID_TIMEOUT = _CONSTANTS$EVENTS.BID_TIMEOUT,
    BID_WON = _CONSTANTS$EVENTS.BID_WON,
    SET_TARGETING = _CONSTANTS$EVENTS.SET_TARGETING,
    _CONSTANTS$STATUS = __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.STATUS,
    GOOD = _CONSTANTS$STATUS.GOOD,
    NO_BID = _CONSTANTS$STATUS.NO_BID,
    BID_REJECTED = __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.BID_STATUS.BID_REJECTED;
var serverConfig;
__WEBPACK_IMPORTED_MODULE_4__src_config_js__["b" /* config */].getConfig('s2sConfig', function (_ref) {
  var s2sConfig = _ref.s2sConfig;
  serverConfig = s2sConfig;
});
var SEND_TIMEOUT = 3000;
var DEFAULT_INTEGRATION = 'pbjs';
var cache = {
  auctions: {},
  targeting: {},
  timeouts: {}
};
var validFloorProviders = ['rubicon', 'rubi', 'magnite', 'mgni'];
function getHostNameFromReferer(referer) {
  try {
    rubiconAdapter.referrerHostname = __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["parseUrl"](referer, {
      noDecodeWholeURL: true
    }).hostname;
  } catch (e) {
    __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["logError"]('Rubicon Analytics: Unable to parse hostname from supplied url: ', referer, e);
    rubiconAdapter.referrerHostname = '';
  }

  return rubiconAdapter.referrerHostname;
}
;

function stringProperties(obj) {
  return Object.keys(obj).reduce(function (newObj, prop) {
    var value = obj[prop];

    if (typeof value === 'number') {
      value = value.toFixed(3);
    } else if (typeof value !== 'string') {
      value = String(value);
    }

    newObj[prop] = value;
    return newObj;
  }, {});
}

function sizeToDimensions(size) {
  return {
    width: size.w || size[0],
    height: size.h || size[1]
  };
}

function validMediaType(type) {
  return ['banner', 'native', 'video'].indexOf(type) !== -1;
}

function formatSource(src) {
  if (typeof src === 'undefined') {
    src = 'client';
  } else if (src === 's2s') {
    src = 'server';
  }

  return src.toLowerCase();
}

function sendMessage(auctionId, bidWonId) {
  function formatBid(bid) {
    return __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["pick"](bid, ['bidder', 'bidId', function (bidId) {
      return __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["deepAccess"](bid, 'bidResponse.pbsBidId') || __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["deepAccess"](bid, 'bidResponse.seatBidId') || bidId;
    }, 'status', 'error', 'source', function (source, bid) {
      if (source) {
        return source;
      }

      return serverConfig && Array.isArray(serverConfig.bidders) && serverConfig.bidders.indexOf(bid.bidder) !== -1 ? 'server' : 'client';
    }, 'clientLatencyMillis', 'serverLatencyMillis', 'params', 'bidResponse', function (bidResponse) {
      return bidResponse ? __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["pick"](bidResponse, ['bidPriceUSD', 'dealId', 'dimensions', 'mediaType', 'floorValue', 'floorRule']) : undefined;
    }]);
  }

  function formatBidWon(bid) {
    return _extends(formatBid(bid), __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["pick"](bid.adUnit, ['adUnitCode', 'transactionId', 'videoAdFormat', function () {
      return bid.videoAdFormat;
    }, 'mediaTypes']), {
      adserverTargeting: stringProperties(cache.targeting[bid.adUnit.adUnitCode] || {}),
      bidwonStatus: 'success',
      // hard-coded for now
      accountId: accountId,
      siteId: bid.siteId,
      zoneId: bid.zoneId,
      samplingFactor: samplingFactor
    });
  }

  var auctionCache = cache.auctions[auctionId];
  var referrer = __WEBPACK_IMPORTED_MODULE_4__src_config_js__["b" /* config */].getConfig('pageUrl') || auctionCache.referrer;
  var message = {
    eventTimeMillis: Date.now(),
    integration: __WEBPACK_IMPORTED_MODULE_4__src_config_js__["b" /* config */].getConfig('rubicon.int_type') || DEFAULT_INTEGRATION,
    version: "4.2.0",
    referrerUri: referrer,
    referrerHostname: rubiconAdapter.referrerHostname || getHostNameFromReferer(referrer)
  };
  var wrapperName = __WEBPACK_IMPORTED_MODULE_4__src_config_js__["b" /* config */].getConfig('rubicon.wrapperName');

  if (wrapperName) {
    message.wrapperName = wrapperName;
  }

  if (auctionCache && !auctionCache.sent) {
    var adUnitMap = Object.keys(auctionCache.bids).reduce(function (adUnits, bidId) {
      var bid = auctionCache.bids[bidId];
      var adUnit = adUnits[bid.adUnit.adUnitCode];

      if (!adUnit) {
        adUnit = adUnits[bid.adUnit.adUnitCode] = __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["pick"](bid.adUnit, ['adUnitCode', 'transactionId', 'mediaTypes', 'dimensions', 'adserverTargeting', function () {
          return stringProperties(cache.targeting[bid.adUnit.adUnitCode] || {});
        }, 'adSlot']);
        adUnit.bids = [];
        adUnit.status = 'no-bid'; // default it to be no bid
      } // Add site and zone id if not there and if we found a rubicon bidder


      if ((!adUnit.siteId || !adUnit.zoneId) && rubiconAliases.indexOf(bid.bidder) !== -1) {
        if (__WEBPACK_IMPORTED_MODULE_5__src_utils_js__["deepAccess"](bid, 'params.accountId') == accountId) {
          adUnit.accountId = parseInt(accountId);
          adUnit.siteId = parseInt(__WEBPACK_IMPORTED_MODULE_5__src_utils_js__["deepAccess"](bid, 'params.siteId'));
          adUnit.zoneId = parseInt(__WEBPACK_IMPORTED_MODULE_5__src_utils_js__["deepAccess"](bid, 'params.zoneId'));
        }
      }

      if (bid.videoAdFormat && !adUnit.videoAdFormat) {
        adUnit.videoAdFormat = bid.videoAdFormat;
      } // determine adUnit.status from its bid statuses.  Use priority below to determine, higher index is better


      var statusPriority = ['error', 'no-bid', 'success'];

      if (statusPriority.indexOf(bid.status) > statusPriority.indexOf(adUnit.status)) {
        adUnit.status = bid.status;
      }

      adUnit.bids.push(formatBid(bid));
      return adUnits;
    }, {}); // We need to mark each cached bid response with its appropriate rubicon site-zone id
    // This allows the bidWon events to have these params even in the case of a delayed render

    Object.keys(auctionCache.bids).forEach(function (bidId) {
      var adCode = auctionCache.bids[bidId].adUnit.adUnitCode;

      _extends(auctionCache.bids[bidId], __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["pick"](adUnitMap[adCode], ['accountId', 'siteId', 'zoneId']));
    });
    var auction = {
      clientTimeoutMillis: auctionCache.timeout,
      samplingFactor: samplingFactor,
      accountId: accountId,
      adUnits: Object.keys(adUnitMap).map(function (i) {
        return adUnitMap[i];
      })
    }; // pick our of top level floor data we want to send!

    if (auctionCache.floorData) {
      if (auctionCache.floorData.location === 'noData') {
        auction.floors = __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["pick"](auctionCache.floorData, ['location', 'fetchStatus']);
      } else {
        auction.floors = __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["pick"](auctionCache.floorData, ['location', 'modelName', function () {
          return auctionCache.floorData.modelVersion;
        }, 'skipped', 'enforcement', function () {
          return __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["deepAccess"](auctionCache.floorData, 'enforcements.enforceJS');
        }, 'dealsEnforced', function () {
          return __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["deepAccess"](auctionCache.floorData, 'enforcements.floorDeals');
        }, 'skipRate', 'fetchStatus']);
      }
    }

    if (serverConfig) {
      auction.serverTimeoutMillis = serverConfig.timeout;
    }

    message.auctions = [auction];
    var bidsWon = Object.keys(auctionCache.bidsWon).reduce(function (memo, adUnitCode) {
      var bidId = auctionCache.bidsWon[adUnitCode];

      if (bidId) {
        memo.push(formatBidWon(auctionCache.bids[bidId]));
      }

      return memo;
    }, []);

    if (bidsWon.length > 0) {
      message.bidsWon = bidsWon;
    }

    auctionCache.sent = true;
  } else if (bidWonId && auctionCache && auctionCache.bids[bidWonId]) {
    message.bidsWon = [formatBidWon(auctionCache.bids[bidWonId])];
  }

  Object(__WEBPACK_IMPORTED_MODULE_3__src_ajax_js__["a" /* ajax */])(this.getUrl(), null, JSON.stringify(message), {
    contentType: 'application/json'
  });
}

function getBidPrice(bid) {
  // get the cpm from bidResponse
  var cpm;
  var currency;

  if (bid.status === BID_REJECTED && __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["deepAccess"](bid, 'floorData.cpmAfterAdjustments')) {
    // if bid was rejected and bid.floorData.cpmAfterAdjustments use it
    cpm = bid.floorData.cpmAfterAdjustments;
    currency = bid.floorData.floorCurrency;
  } else if (typeof bid.currency === 'string' && bid.currency.toUpperCase() === 'USD') {
    // bid is in USD use it
    return Number(bid.cpm);
  } else {
    // else grab cpm
    cpm = bid.cpm;
    currency = bid.currency;
  } // if after this it is still going and is USD then return it.


  if (currency === 'USD') {
    return Number(cpm);
  } // otherwise we convert and return


  try {
    return Number(Object(__WEBPACK_IMPORTED_MODULE_6__src_prebidGlobal_js__["a" /* getGlobal */])().convertCurrency(cpm, currency, 'USD'));
  } catch (err) {
    __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["logWarn"]('Rubicon Analytics Adapter: Could not determine the bidPriceUSD of the bid ', bid);
  }
}

function parseBidResponse(bid, previousBidResponse, auctionFloorData) {
  // The current bidResponse for this matching requestId/bidRequestId
  var responsePrice = getBidPrice(bid); // we need to compare it with the previous one (if there was one)

  if (previousBidResponse && previousBidResponse.bidPriceUSD > responsePrice) {
    return previousBidResponse;
  }

  var bidResponse = __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["pick"](bid, ['bidPriceUSD', function () {
    return responsePrice;
  }, 'dealId', 'status', 'mediaType', 'dimensions', function () {
    return __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["pick"](bid, ['width', 'height']);
  }, 'seatBidId']);

  if (auctionFloorData) {
    bidResponse.floorValue = __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["deepAccess"](bid, 'floorData.floorValue');
    bidResponse.floorRule = __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["debugTurnedOn"]() ? __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["deepAccess"](bid, 'floorData.floorRule') : undefined;
  }

  return bidResponse;
}
var samplingFactor = 1;
var accountId; // List of known rubicon aliases
// This gets updated on auction init to account for any custom aliases present

var rubiconAliases = ['rubicon'];
/*
  Checks the alias registry for any entries of the rubicon bid adapter.
  adds to the rubiconAliases list if found
*/

function setRubiconAliases(aliasRegistry) {
  Object.keys(aliasRegistry).forEach(function (alias) {
    if (aliasRegistry[alias] === 'rubicon') {
      rubiconAliases.push(alias);
    }
  });
}

var baseAdapter = Object(__WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter_js__["a" /* default */])({
  analyticsType: 'endpoint'
});

var rubiconAdapter = _extends({}, baseAdapter, {
  referrerHostname: '',
  enableAnalytics: function enableAnalytics() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var error = false;
    samplingFactor = 1;

    if (_typeof(config.options) === 'object') {
      if (config.options.accountId) {
        accountId = Number(config.options.accountId);
      }

      if (config.options.endpoint) {
        this.getUrl = function () {
          return config.options.endpoint;
        };
      } else {
        __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["logError"]('required endpoint missing from rubicon analytics');
        error = true;
      }

      if (typeof config.options.sampling !== 'undefined') {
        samplingFactor = 1 / parseFloat(config.options.sampling);
      }

      if (typeof config.options.samplingFactor !== 'undefined') {
        if (typeof config.options.sampling !== 'undefined') {
          __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["logWarn"]('Both options.samplingFactor and options.sampling enabled in rubicon analytics, defaulting to samplingFactor');
        }

        samplingFactor = parseFloat(config.options.samplingFactor);
        config.options.sampling = 1 / samplingFactor;
      }
    }

    var validSamplingFactors = [1, 10, 20, 40, 100];

    if (validSamplingFactors.indexOf(samplingFactor) === -1) {
      error = true;
      __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["logError"]('invalid samplingFactor for rubicon analytics: ' + samplingFactor + ', must be one of ' + validSamplingFactors.join(', '));
    } else if (!accountId) {
      error = true;
      __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["logError"]('required accountId missing for rubicon analytics');
    }

    if (!error) {
      baseAdapter.enableAnalytics.call(this, config);
    }
  },
  disableAnalytics: function disableAnalytics() {
    this.getUrl = baseAdapter.getUrl;
    accountId = null;
    baseAdapter.disableAnalytics.apply(this, arguments);
  },
  track: function track(_ref2) {
    var _this = this;

    var eventType = _ref2.eventType,
        args = _ref2.args;

    switch (eventType) {
      case AUCTION_INIT:
        // set the rubicon aliases
        setRubiconAliases(__WEBPACK_IMPORTED_MODULE_1__src_adapterManager_js__["default"].aliasRegistry);
        var cacheEntry = __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["pick"](args, ['timestamp', 'timeout']);
        cacheEntry.bids = {};
        cacheEntry.bidsWon = {};
        cacheEntry.referrer = args.bidderRequests[0].refererInfo.referer;
        var floorProvider = __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["deepAccess"](args, 'bidderRequests.0.bids.0.floorData.floorProvider');

        if (validFloorProviders.indexOf(floorProvider) !== -1) {
          cacheEntry.floorData = _objectSpread({}, args.bidderRequests[0].bids[0].floorData);
        }

        cache.auctions[args.auctionId] = cacheEntry;
        break;

      case BID_REQUESTED:
        _extends(cache.auctions[args.auctionId].bids, args.bids.reduce(function (memo, bid) {
          // mark adUnits we expect bidWon events for
          cache.auctions[args.auctionId].bidsWon[bid.adUnitCode] = false;
          memo[bid.bidId] = __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["pick"](bid, ['bidder', function (bidder) {
            return bidder.toLowerCase();
          }, 'bidId', 'status', function () {
            return 'no-bid';
          }, // default a bid to no-bid until response is recieved or bid is timed out
          'finalSource as source', 'params', function (params, bid) {
            switch (bid.bidder) {
              // specify bidder params we want here
              case 'rubicon':
                return __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["pick"](params, ['accountId', 'siteId', 'zoneId']);
            }
          }, 'videoAdFormat', function (_, cachedBid) {
            if (cachedBid.bidder === 'rubicon') {
              return {
                201: 'pre-roll',
                202: 'interstitial',
                203: 'outstream',
                204: 'mid-roll',
                205: 'post-roll',
                207: 'vertical'
              }[__WEBPACK_IMPORTED_MODULE_5__src_utils_js__["deepAccess"](bid, 'params.video.size_id')];
            } else {
              var startdelay = parseInt(__WEBPACK_IMPORTED_MODULE_5__src_utils_js__["deepAccess"](bid, 'params.video.startdelay'), 10);

              if (!isNaN(startdelay)) {
                if (startdelay > 0) {
                  return 'mid-roll';
                }

                return {
                  '0': 'pre-roll',
                  '-1': 'mid-roll',
                  '-2': 'post-roll'
                }[startdelay];
              }
            }
          }, 'adUnit', function () {
            return __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["pick"](bid, ['adUnitCode', 'transactionId', 'sizes as dimensions', function (sizes) {
              return sizes.map(sizeToDimensions);
            }, 'mediaTypes', function (types) {
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

              return ['banner'];
            }]);
          }]);
          return memo;
        }, {}));

        break;

      case BID_RESPONSE:
        var auctionEntry = cache.auctions[args.auctionId];
        var bid = auctionEntry.bids[args.requestId]; // If floor resolved gptSlot but we have not yet, then update the adUnit to have the adSlot name

        if (!__WEBPACK_IMPORTED_MODULE_5__src_utils_js__["deepAccess"](bid, 'adUnit.adSlot') && __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["deepAccess"](args, 'floorData.matchedFields.gptSlot')) {
          bid.adUnit.adSlot = args.floorData.matchedFields.gptSlot;
        } // if we have not set enforcements yet set it


        if (auctionEntry.floorData && !auctionEntry.floorData.enforcements && __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["deepAccess"](args, 'floorData.enforcements')) {
          auctionEntry.floorData.enforcements = _objectSpread({}, args.floorData.enforcements);
        }

        if (!bid) {
          __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["logError"]('Rubicon Anlytics Adapter Error: Could not find associated bid request for bid response with requestId: ', args.requestId);
          break;
        }

        bid.source = formatSource(bid.source || args.source);

        switch (args.getStatusCode()) {
          case GOOD:
            bid.status = 'success';
            delete bid.error; // it's possible for this to be set by a previous timeout

            break;

          case NO_BID:
            bid.status = args.status === BID_REJECTED ? 'rejected' : 'no-bid';
            delete bid.error;
            break;

          default:
            bid.status = 'error';
            bid.error = {
              code: 'request-error'
            };
        }

        bid.clientLatencyMillis = Date.now() - cache.auctions[args.auctionId].timestamp;
        bid.bidResponse = parseBidResponse(args, bid.bidResponse, auctionEntry.floorData);
        break;

      case BIDDER_DONE:
        args.bids.forEach(function (bid) {
          var cachedBid = cache.auctions[bid.auctionId].bids[bid.bidId || bid.requestId];

          if (typeof bid.serverResponseTimeMs !== 'undefined') {
            cachedBid.serverLatencyMillis = bid.serverResponseTimeMs;
          }

          if (!cachedBid.status) {
            cachedBid.status = 'no-bid';
          }

          if (!cachedBid.clientLatencyMillis) {
            cachedBid.clientLatencyMillis = Date.now() - cache.auctions[bid.auctionId].timestamp;
          }
        });
        break;

      case SET_TARGETING:
        _extends(cache.targeting, args);

        break;

      case BID_WON:
        var auctionCache = cache.auctions[args.auctionId];
        auctionCache.bidsWon[args.adUnitCode] = args.requestId; // check if this BID_WON missed the boat, if so send by itself

        if (auctionCache.sent === true) {
          sendMessage.call(this, args.auctionId, args.requestId);
        } else if (Object.keys(auctionCache.bidsWon).reduce(function (memo, adUnitCode) {
          // only send if we've received bidWon events for all adUnits in auction
          memo = memo && auctionCache.bidsWon[adUnitCode];
          return memo;
        }, true)) {
          clearTimeout(cache.timeouts[args.auctionId]);
          delete cache.timeouts[args.auctionId];
          sendMessage.call(this, args.auctionId);
        }

        break;

      case AUCTION_END:
        // start timer to send batched payload just in case we don't hear any BID_WON events
        cache.timeouts[args.auctionId] = setTimeout(function () {
          sendMessage.call(_this, args.auctionId);
        }, SEND_TIMEOUT);
        break;

      case BID_TIMEOUT:
        args.forEach(function (badBid) {
          var auctionCache = cache.auctions[badBid.auctionId];
          var bid = auctionCache.bids[badBid.bidId || badBid.requestId];
          bid.status = 'error';
          bid.error = {
            code: 'timeout-error'
          };
        });
        break;
    }
  }
});

__WEBPACK_IMPORTED_MODULE_1__src_adapterManager_js__["default"].registerAnalyticsAdapter({
  adapter: rubiconAdapter,
  code: 'rubicon'
});
/* harmony default export */ __webpack_exports__["default"] = (rubiconAdapter);

/***/ })

},[662]);