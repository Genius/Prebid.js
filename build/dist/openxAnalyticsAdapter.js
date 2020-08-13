pbjsChunk([26],{

/***/ 565:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(566);


/***/ }),

/***/ 566:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_constants_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__src_constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_utils_js__ = __webpack_require__(0);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }







var _CONSTANTS$EVENTS = __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default.a.EVENTS,
    AUCTION_INIT = _CONSTANTS$EVENTS.AUCTION_INIT,
    BID_REQUESTED = _CONSTANTS$EVENTS.BID_REQUESTED,
    BID_RESPONSE = _CONSTANTS$EVENTS.BID_RESPONSE,
    BID_TIMEOUT = _CONSTANTS$EVENTS.BID_TIMEOUT,
    BID_WON = _CONSTANTS$EVENTS.BID_WON;
var SLOT_LOADED = 'slotOnload';
var ENDPOINT = 'https://ads.openx.net/w/1.0/pban';
var initOptions;
var auctionMap = {};

function onAuctionInit(_ref) {
  var auctionId = _ref.auctionId;
  auctionMap[auctionId] = {
    adUnitMap: {}
  };
}

function onBidRequested(_ref2) {
  var auctionId = _ref2.auctionId,
      auctionStart = _ref2.auctionStart,
      bids = _ref2.bids,
      start = _ref2.start;
  var adUnitMap = auctionMap[auctionId]['adUnitMap'];
  bids.forEach(function (bid) {
    var adUnitCode = bid.adUnitCode,
        bidId = bid.bidId,
        bidder = bid.bidder,
        params = bid.params,
        transactionId = bid.transactionId;
    adUnitMap[adUnitCode] = adUnitMap[adUnitCode] || {
      auctionId: auctionId,
      auctionStart: auctionStart,
      transactionId: transactionId,
      bidMap: {}
    };
    adUnitMap[adUnitCode]['bidMap'][bidId] = {
      bidder: bidder,
      params: params,
      requestTimestamp: start
    };
  });
}

function onBidResponse(_ref3) {
  var auctionId = _ref3.auctionId,
      adUnitCode = _ref3.adUnitCode,
      bidId = _ref3.requestId,
      cpm = _ref3.cpm,
      creativeId = _ref3.creativeId,
      responseTimestamp = _ref3.responseTimestamp,
      ts = _ref3.ts,
      adId = _ref3.adId;
  var adUnit = auctionMap[auctionId]['adUnitMap'][adUnitCode];
  var bid = adUnit['bidMap'][bidId];
  bid.cpm = cpm;
  bid.creativeId = creativeId;
  bid.responseTimestamp = responseTimestamp;
  bid.ts = ts;
  bid.adId = adId;
}

function onBidTimeout(args) {
  __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["_map"](args, function (value) {
    return value;
  }).forEach(function (_ref4) {
    var auctionId = _ref4.auctionId,
        adUnitCode = _ref4.adUnitCode,
        bidId = _ref4.bidId;
    var bid = auctionMap[auctionId]['adUnitMap'][adUnitCode]['bidMap'][bidId];
    bid.timedOut = true;
  });
}

function onBidWon(_ref5) {
  var auctionId = _ref5.auctionId,
      adUnitCode = _ref5.adUnitCode,
      bidId = _ref5.requestId;
  var adUnit = auctionMap[auctionId]['adUnitMap'][adUnitCode];
  var bid = adUnit['bidMap'][bidId];
  bid.won = true;
}

function onSlotLoaded(_ref6) {
  var slot = _ref6.slot;
  var targeting = slot.getTargetingKeys().reduce(function (targeting, key) {
    targeting[key] = slot.getTargeting(key);
    return targeting;
  }, {});
  __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["logMessage"]('GPT slot is loaded. Current targeting set on slot:', targeting);
  var adId = slot.getTargeting('hb_adid')[0];

  if (!adId) {
    return;
  }

  var adUnit = getAdUnitByAdId(adId);

  if (!adUnit) {
    return;
  }

  var adUnitData = getAdUnitData(adUnit);
  var performanceData = getPerformanceData(adUnit.auctionStart);
  var commonFields = {
    'hb.asiid': slot.getAdUnitPath(),
    'hb.cur': __WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig('currency.adServerCurrency'),
    'hb.pubid': initOptions.publisherId
  };

  var data = _extends({}, adUnitData, performanceData, commonFields);

  sendEvent(data);
}

function getAdUnitByAdId(adId) {
  var result;

  __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["_map"](auctionMap, function (value) {
    return value;
  }).forEach(function (auction) {
    __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["_map"](auction.adUnitMap, function (value) {
      return value;
    }).forEach(function (adUnit) {
      __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["_map"](adUnit.bidMap, function (value) {
        return value;
      }).forEach(function (bid) {
        if (adId === bid.adId) {
          result = adUnit;
        }
      });
    });
  });

  return result;
}

function getAdUnitData(adUnit) {
  var bids = __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["_map"](adUnit.bidMap, function (value) {
    return value;
  });

  var bidders = bids.map(function (bid) {
    return bid.bidder;
  });
  var requestTimes = bids.map(function (bid) {
    return bid.requestTimestamp && bid.requestTimestamp - adUnit.auctionStart;
  });
  var responseTimes = bids.map(function (bid) {
    return bid.responseTimestamp && bid.responseTimestamp - adUnit.auctionStart;
  });
  var bidValues = bids.map(function (bid) {
    return bid.cpm || 0;
  });
  var timeouts = bids.map(function (bid) {
    return !!bid.timedOut;
  });
  var creativeIds = bids.map(function (bid) {
    return bid.creativeId;
  });
  var winningBid = bids.filter(function (bid) {
    return bid.won;
  })[0];
  var winningExchangeIndex = bids.indexOf(winningBid);
  var openxBid = bids.filter(function (bid) {
    return bid.bidder === 'openx';
  })[0];
  return {
    'hb.ct': adUnit.auctionStart,
    'hb.rid': adUnit.auctionId,
    'hb.exn': bidders.join(','),
    'hb.sts': requestTimes.join(','),
    'hb.ets': responseTimes.join(','),
    'hb.bv': bidValues.join(','),
    'hb.to': timeouts.join(','),
    'hb.crid': creativeIds.join(','),
    'hb.we': winningExchangeIndex,
    'hb.g1': winningExchangeIndex === -1,
    dddid: adUnit.transactionId,
    ts: openxBid && openxBid.ts,
    auid: openxBid && openxBid.params && openxBid.params.unit
  };
}

function getPerformanceData(auctionStart) {
  var timing;

  try {
    timing = window.top.performance.timing;
  } catch (e) {}

  if (!timing) {
    return;
  }

  var _timing = timing,
      fetchStart = _timing.fetchStart,
      domContentLoadedEventEnd = _timing.domContentLoadedEventEnd,
      loadEventEnd = _timing.loadEventEnd;
  var domContentLoadTime = domContentLoadedEventEnd - fetchStart;
  var pageLoadTime = loadEventEnd - fetchStart;
  var timeToAuction = auctionStart - fetchStart;
  var timeToRender = Date.now() - fetchStart;
  return {
    'hb.dcl': domContentLoadTime,
    'hb.dl': pageLoadTime,
    'hb.tta': timeToAuction,
    'hb.ttr': timeToRender
  };
}

function sendEvent(data) {
  __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["_map"](data, function (value, key) {
    return [key, value];
  }).forEach(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        key = _ref8[0],
        value = _ref8[1];

    if (value === undefined || value === null || typeof value === 'number' && isNaN(value)) {
      delete data[key];
    }
  });

  Object(__WEBPACK_IMPORTED_MODULE_4__src_ajax_js__["a" /* ajax */])(ENDPOINT, null, data, {
    method: 'GET'
  });
}

var googletag = window.googletag || {};
googletag.cmd = googletag.cmd || [];
googletag.cmd.push(function () {
  googletag.pubads().addEventListener(SLOT_LOADED, function (args) {
    openxAdapter.track({
      eventType: SLOT_LOADED,
      args: args
    });
  });
});

var openxAdapter = _extends(Object(__WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter_js__["a" /* default */])({
  url: ENDPOINT,
  analyticsType: 'endpoint'
}), {
  track: function track(_ref9) {
    var eventType = _ref9.eventType,
        args = _ref9.args;
    __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["logMessage"](eventType, _extends({}, args));

    switch (eventType) {
      case AUCTION_INIT:
        onAuctionInit(args);
        break;

      case BID_REQUESTED:
        onBidRequested(args);
        break;

      case BID_RESPONSE:
        onBidResponse(args);
        break;

      case BID_TIMEOUT:
        onBidTimeout(args);
        break;

      case BID_WON:
        onBidWon(args);
        break;

      case SLOT_LOADED:
        onSlotLoaded(args);
        break;
    }
  }
}); // save the base class function


openxAdapter.originEnableAnalytics = openxAdapter.enableAnalytics; // override enableAnalytics so we can get access to the config passed in from the page

openxAdapter.enableAnalytics = function (config) {
  if (!config || !config.options || !config.options.publisherId) {
    __WEBPACK_IMPORTED_MODULE_5__src_utils_js__["logError"]('OpenX analytics adapter: publisherId is required.');
    return;
  }

  initOptions = config.options;
  openxAdapter.originEnableAnalytics(config); // call the base class function
}; // reset the cache for unit tests


openxAdapter.reset = function () {
  auctionMap = {};
};

__WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__["default"].registerAnalyticsAdapter({
  adapter: openxAdapter,
  code: 'openx'
});
/* harmony default export */ __webpack_exports__["default"] = (openxAdapter);

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

},[565]);