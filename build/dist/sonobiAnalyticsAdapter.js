pbjsChunk([10],{

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

/***/ 710:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(711);


/***/ }),

/***/ 711:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_constants_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__src_constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_ajax_js__ = __webpack_require__(4);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var utils = __webpack_require__(0);

var ajax = Object(__WEBPACK_IMPORTED_MODULE_3__src_ajax_js__["b" /* ajaxBuilder */])(0);
var DEFAULT_EVENT_URL = 'apex.go.sonobi.com/keymaker';
var analyticsType = 'endpoint';
var QUEUE_TIMEOUT_DEFAULT = 200;
var _CONSTANTS$EVENTS = __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default.a.EVENTS,
    AUCTION_INIT = _CONSTANTS$EVENTS.AUCTION_INIT,
    AUCTION_END = _CONSTANTS$EVENTS.AUCTION_END,
    BID_REQUESTED = _CONSTANTS$EVENTS.BID_REQUESTED,
    BID_ADJUSTMENT = _CONSTANTS$EVENTS.BID_ADJUSTMENT,
    BIDDER_DONE = _CONSTANTS$EVENTS.BIDDER_DONE,
    BID_WON = _CONSTANTS$EVENTS.BID_WON,
    BID_RESPONSE = _CONSTANTS$EVENTS.BID_RESPONSE,
    BID_TIMEOUT = _CONSTANTS$EVENTS.BID_TIMEOUT;
var initOptions = {};
var auctionCache = {};
var auctionTtl = 60 * 60 * 1000;

function deleteOldAuctions() {
  for (var auctionId in auctionCache) {
    var auction = auctionCache[auctionId];

    if (Date.now() - auction.start > auctionTtl) {
      delete auctionCache[auctionId];
    }
  }
}

function buildAuctionEntity(args) {
  return {
    'id': args.auctionId,
    'start': args.timestamp,
    'timeout': args.timeout,
    'adUnits': {},
    'stats': {},
    'queue': [],
    'qTimeout': false
  };
}

function buildAdUnit(data) {
  return "/".concat(initOptions.pubId, "/").concat(initOptions.siteId, "/").concat(data.adUnitCode.toLowerCase());
}

function getLatency(data) {
  if (!data.responseTimestamp) {
    return -1;
  } else {
    return data.responseTimestamp - data.requestTimestamp;
  }
}

function getBid(data) {
  if (data.cpm) {
    return Math.round(data.cpm * 100);
  } else {
    return 0;
  }
}

function buildItem(data, response) {
  var phase = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var size = data.width ? {
    width: data.width,
    height: data.height
  } : {
    width: data.sizes[0][0],
    height: data.sizes[0][1]
  };
  return {
    'bidid': data.bidId || data.requestId,
    'p': phase,
    'buyerid': data.bidder.toLowerCase(),
    'bid': getBid(data),
    'adunit_code': buildAdUnit(data),
    's': "".concat(size.width, "x").concat(size.height),
    'latency': getLatency(data),
    'response': response,
    'jsLatency': getLatency(data),
    'buyername': data.bidder.toLowerCase()
  };
}

function sendQueue(auctionId) {
  var auction = auctionCache[auctionId];
  var data = auction.queue;
  auction.queue = [];
  auction.qTimeout = false;
  sonobiAdapter.sendData(auction, data);
}

function addToAuctionQueue(auctionId, id) {
  var auction = auctionCache[auctionId];
  auction.queue = auction.queue.filter(function (item) {
    if (item.bidid !== id) {
      return true;
    }

    return auction.stats[id].data.p !== item.p;
  });
  auction.queue.push(utils.deepClone(auction.stats[id].data));

  if (!auction.qTimeout) {
    auction.qTimeout = setTimeout(function () {
      sendQueue(auctionId);
    }, initOptions.delay);
  }
}

function updateBidStats(auctionId, id, data) {
  var auction = auctionCache[auctionId];
  auction.stats[id].data = _objectSpread(_objectSpread({}, auction.stats[id].data), data);
  addToAuctionQueue(auctionId, id);
  logInfo('Updated Bid Stats: ', auction.stats[id]);
  return auction.stats[id];
}

function handleOtherEvents(eventType, args) {
  logInfo('Other Event: ' + eventType, args);
}

function handlerAuctionInit(args) {
  auctionCache[args.auctionId] = buildAuctionEntity(args);
  deleteOldAuctions();
  logInfo('Auction Init', args);
}

function handlerBidRequested(args) {
  var auction = auctionCache[args.auctionId];
  var data = [];
  var phase = 1;
  var response = 1;
  args.bids.forEach(function (bidRequest) {
    auction = auctionCache[bidRequest.auctionId];
    var built = buildItem(bidRequest, response, phase);
    auction.stats[built.bidid] = {
      id: built.bidid,
      adUnitCode: bidRequest.adUnitCode,
      data: built
    };
    addToAuctionQueue(args.auctionId, built.bidid);
  });
  logInfo('Bids Requested ', data);
}

function handlerBidAdjustment(args) {
  logInfo('Bid Adjustment', args);
}

function handlerBidderDone(args) {
  logInfo('Bidder Done', args);
}

function handlerAuctionEnd(args) {
  var winners = {};
  args.bidsReceived.forEach(function (bid) {
    if (!winners[bid.adUnitCode]) {
      winners[bid.adUnitCode] = {
        bidId: bid.requestId,
        cpm: bid.cpm
      };
    } else if (winners[bid.adUnitCode].cpm < bid.cpm) {
      winners[bid.adUnitCode] = {
        bidId: bid.requestId,
        cpm: bid.cpm
      };
    }
  });
  args.adUnitCodes.forEach(function (adUnitCode) {
    if (winners[adUnitCode]) {
      var bidId = winners[adUnitCode].bidId;
      updateBidStats(args.auctionId, bidId, {
        response: 4
      });
    }
  });
  logInfo('Auction End', args);
  logInfo('Auction Cache', auctionCache[args.auctionId].stats);
}

function handlerBidWon(args) {
  var auctionId = args.auctionId,
      requestId = args.requestId;
  var res = updateBidStats(auctionId, requestId, {
    p: 3,
    response: 6
  });
  logInfo('Bid Won ', args);
  logInfo('Bid Update Result: ', res);
}

function handlerBidResponse(args) {
  var auctionId = args.auctionId,
      requestId = args.requestId,
      cpm = args.cpm,
      size = args.size,
      timeToRespond = args.timeToRespond;
  updateBidStats(auctionId, requestId, {
    bid: cpm,
    s: size,
    jsLatency: timeToRespond,
    latency: timeToRespond,
    p: 2,
    response: 9
  });
  logInfo('Bid Response ', args);
}

function handlerBidTimeout(args) {
  var auctionId = args.auctionId,
      bidId = args.bidId;
  logInfo('Bid Timeout ', args);
  updateBidStats(auctionId, bidId, {
    p: 2,
    response: 0,
    latency: args.timeout,
    jsLatency: args.timeout
  });
}

var sonobiAdapter = _extends(Object(__WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter_js__["a" /* default */])({
  url: DEFAULT_EVENT_URL,
  analyticsType: analyticsType
}), {
  track: function track(_ref) {
    var eventType = _ref.eventType,
        args = _ref.args;

    switch (eventType) {
      case AUCTION_INIT:
        handlerAuctionInit(args);
        break;

      case BID_REQUESTED:
        handlerBidRequested(args);
        break;

      case BID_ADJUSTMENT:
        handlerBidAdjustment(args);
        break;

      case BIDDER_DONE:
        handlerBidderDone(args);
        break;

      case AUCTION_END:
        handlerAuctionEnd(args);
        break;

      case BID_WON:
        handlerBidWon(args);
        break;

      case BID_RESPONSE:
        handlerBidResponse(args);
        break;

      case BID_TIMEOUT:
        handlerBidTimeout(args);
        break;

      default:
        handleOtherEvents(eventType, args);
        break;
    }
  }
});

sonobiAdapter.originEnableAnalytics = sonobiAdapter.enableAnalytics;

sonobiAdapter.enableAnalytics = function (config) {
  if (this.initConfig(config)) {
    logInfo('Analytics adapter enabled', initOptions);
    sonobiAdapter.originEnableAnalytics(config);
  }
};

sonobiAdapter.initConfig = function (config) {
  var isCorrectConfig = true;
  initOptions = {};
  initOptions.options = utils.deepClone(config.options);
  initOptions.pubId = initOptions.options.pubId || null;
  initOptions.siteId = initOptions.options.siteId || null;
  initOptions.delay = initOptions.options.delay || QUEUE_TIMEOUT_DEFAULT;

  if (!initOptions.pubId) {
    logError('"options.pubId" is empty');
    isCorrectConfig = false;
  }

  if (!initOptions.siteId) {
    logError('"options.siteId" is empty');
    isCorrectConfig = false;
  }

  initOptions.server = DEFAULT_EVENT_URL;
  initOptions.host = initOptions.options.host || window.location.hostname;
  this.initOptions = initOptions;
  return isCorrectConfig;
};

sonobiAdapter.getOptions = function () {
  return initOptions;
};

sonobiAdapter.sendData = function (auction, data) {
  var url = 'https://' + initOptions.server + '?pageviewid=' + auction.id + '&corscred=1&pubId=' + initOptions.pubId + '&siteId=' + initOptions.siteId;
  ajax(url, function () {
    logInfo('Auction [' + auction.id + '] sent ', data);
  }, JSON.stringify(data), {
    method: 'POST',
    // withCredentials: true,
    contentType: 'text/plain'
  });
};

function logInfo(message, meta) {
  utils.logInfo(buildLogMessage(message), meta);
}

function logError(message) {
  utils.logError(buildLogMessage(message));
}

function buildLogMessage(message) {
  return 'Sonobi Prebid Analytics: ' + message;
}

__WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__["default"].registerAnalyticsAdapter({
  adapter: sonobiAdapter,
  code: 'sonobi'
});
/* harmony default export */ __webpack_exports__["default"] = (sonobiAdapter);

/***/ })

},[710]);