pbjsChunk([5],{

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

/***/ 762:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(763);


/***/ }),

/***/ 763:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ANALYTICS_VERSION", function() { return ANALYTICS_VERSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIDDER_STATUS", function() { return BIDDER_STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseBidderCode", function() { return parseBidderCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseAdUnitCode", function() { return parseAdUnitCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ucfunnelAnalyticsAdapter", function() { return ucfunnelAnalyticsAdapter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_AnalyticsAdapter_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_constants_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__src_constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_adapterManager_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_prebidGlobal_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_utils_js__ = __webpack_require__(0);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }







var analyticsType = 'endpoint';
var ANALYTICS_VERSION = '1.0.0';
var ANALYTICS_SERVER = 'https://hbwa.aralego.com';
var _CONSTANTS$EVENTS = __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS,
    AUCTION_END = _CONSTANTS$EVENTS.AUCTION_END,
    BID_WON = _CONSTANTS$EVENTS.BID_WON,
    BID_TIMEOUT = _CONSTANTS$EVENTS.BID_TIMEOUT;
var BIDDER_STATUS = {
  BID: 'bid',
  NO_BID: 'noBid',
  BID_WON: 'bidWon',
  TIMEOUT: 'timeout'
};
var analyticsOptions = {};
var parseBidderCode = function parseBidderCode(bid) {
  var bidderCode = bid.bidderCode || bid.bidder;
  return bidderCode.toLowerCase();
};
var parseAdUnitCode = function parseAdUnitCode(bidResponse) {
  return bidResponse.adUnitCode.toLowerCase();
};
var ucfunnelAnalyticsAdapter = _extends(Object(__WEBPACK_IMPORTED_MODULE_1__src_AnalyticsAdapter_js__["a" /* default */])({
  ANALYTICS_SERVER: ANALYTICS_SERVER,
  analyticsType: analyticsType
}), {
  cachedAuctions: {},
  initConfig: function initConfig(config) {
    /**
     * Required option: pbuid
     * Required option: adid
     * @type {boolean}
     */
    analyticsOptions.options = Object(__WEBPACK_IMPORTED_MODULE_5__src_utils_js__["deepClone"])(config.options);

    if (typeof config.options.pbuid !== 'string' || config.options.pbuid.length < 1) {
      Object(__WEBPACK_IMPORTED_MODULE_5__src_utils_js__["logError"])('"options.pbuid" is required.');
      return false;
    }

    if (typeof config.options.adid !== 'string' || config.options.adid.length < 1) {
      Object(__WEBPACK_IMPORTED_MODULE_5__src_utils_js__["logError"])('"options.adid" is required.');
      return false;
    }

    analyticsOptions.sampled = true;

    if (typeof config.options.sampling === 'number') {
      analyticsOptions.sampled = Math.random() < parseFloat(config.options.sampling);
    }

    analyticsOptions.pbuid = config.options.pbuid;
    analyticsOptions.adid = config.options.adid;
    analyticsOptions.server = ANALYTICS_SERVER;
    return true;
  },
  sendEventMessage: function sendEventMessage(endPoint, data) {
    Object(__WEBPACK_IMPORTED_MODULE_5__src_utils_js__["logInfo"])("AJAX: ".concat(endPoint, ": ") + JSON.stringify(data));
    Object(__WEBPACK_IMPORTED_MODULE_0__src_ajax_js__["a" /* ajax */])("".concat(analyticsOptions.server, "/").concat(endPoint), null, JSON.stringify(data), {
      contentType: 'application/json',
      withCredentials: true
    });
  },
  createCommonMessage: function createCommonMessage(auctionId) {
    return {
      version: ANALYTICS_VERSION,
      auctionId: auctionId,
      referrer: window.location.href,
      sampling: analyticsOptions.options.sampling,
      prebid: "4.2.0",
      adid: analyticsOptions.adid,
      pbuid: analyticsOptions.pbuid,
      adUnits: {}
    };
  },
  serializeBidResponse: function serializeBidResponse(bid, status) {
    var result = {
      prebidWon: status === BIDDER_STATUS.BID_WON,
      isTimeout: status === BIDDER_STATUS.TIMEOUT,
      status: status
    };

    if (status === BIDDER_STATUS.BID || status === BIDDER_STATUS.BID_WON) {
      _extends(result, {
        time: bid.timeToRespond,
        cpm: bid.cpm,
        currency: bid.currency
      });
    }

    return result;
  },
  addBidResponseToMessage: function addBidResponseToMessage(message, bid, status) {
    var adUnitCode = parseAdUnitCode(bid);
    message.adUnits[adUnitCode] = message.adUnits[adUnitCode] || {};
    var bidder = parseBidderCode(bid);
    var bidResponse = this.serializeBidResponse(bid, status);
    message.adUnits[adUnitCode][bidder] = bidResponse;
  },
  createBidMessage: function createBidMessage(auctionEndArgs, winningBids, timeoutBids) {
    var _this = this;

    var auctionId = auctionEndArgs.auctionId,
        timestamp = auctionEndArgs.timestamp,
        auctionEnd = auctionEndArgs.auctionEnd,
        adUnitCodes = auctionEndArgs.adUnitCodes,
        bidsReceived = auctionEndArgs.bidsReceived,
        noBids = auctionEndArgs.noBids;
    var message = this.createCommonMessage(auctionId);
    message.auctionElapsed = auctionEnd - timestamp;
    adUnitCodes.forEach(function (adUnitCode) {
      message.adUnits[adUnitCode] = {};
    }); // In this situation, the bid exists in both noBids and bids arrays.

    noBids.forEach(function (bid) {
      return _this.addBidResponseToMessage(message, bid, BIDDER_STATUS.NO_BID);
    }); // This array may contain some timeout bids (responses come back after auction timeout)

    bidsReceived.forEach(function (bid) {
      return _this.addBidResponseToMessage(message, bid, BIDDER_STATUS.BID);
    }); // We handle timeout after bids since it's possible that a bid has a response, but the response comes back
    // after auction end. In this case, the bid exists in both bidsReceived and timeoutBids arrays.

    timeoutBids.forEach(function (bid) {
      return _this.addBidResponseToMessage(message, bid, BIDDER_STATUS.TIMEOUT);
    }); // mark the winning bids with prebidWon = true

    winningBids.forEach(function (bid) {
      var adUnitCode = parseAdUnitCode(bid);
      var bidder = parseBidderCode(bid);
      message.adUnits[adUnitCode][bidder].prebidWon = true;
    });
    return message;
  },
  createImpressionMessage: function createImpressionMessage(bid) {
    var message = this.createCommonMessage(bid.auctionId);
    this.addBidResponseToMessage(message, bid, BIDDER_STATUS.BID_WON);
    return message;
  },
  getCachedAuction: function getCachedAuction(auctionId) {
    this.cachedAuctions[auctionId] = this.cachedAuctions[auctionId] || {
      timeoutBids: []
    };
    return this.cachedAuctions[auctionId];
  },
  handleAuctionEnd: function handleAuctionEnd(auctionEndArgs) {
    var cachedAuction = this.getCachedAuction(auctionEndArgs.auctionId);
    var highestCpmBids = Object(__WEBPACK_IMPORTED_MODULE_4__src_prebidGlobal_js__["a" /* getGlobal */])().getHighestCpmBids();
    this.sendEventMessage('bid', this.createBidMessage(auctionEndArgs, highestCpmBids, cachedAuction.timeoutBids));
  },
  handleBidTimeout: function handleBidTimeout(timeoutBids) {
    var _this2 = this;

    timeoutBids.forEach(function (bid) {
      var cachedAuction = _this2.getCachedAuction(bid.auctionId);

      cachedAuction.timeoutBids.push(bid);
    });
  },
  handleBidWon: function handleBidWon(bidWonArgs) {
    this.sendEventMessage('imp', this.createImpressionMessage(bidWonArgs));
  },
  track: function track(_ref) {
    var eventType = _ref.eventType,
        args = _ref.args;

    if (analyticsOptions.sampled) {
      switch (eventType) {
        case BID_WON:
          this.handleBidWon(args);
          break;

        case BID_TIMEOUT:
          this.handleBidTimeout(args);
          break;

        case AUCTION_END:
          this.handleAuctionEnd(args);
          break;
      }
    }
  },
  getAnalyticsOptions: function getAnalyticsOptions() {
    return analyticsOptions;
  }
}); // save the base class function

ucfunnelAnalyticsAdapter.originEnableAnalytics = ucfunnelAnalyticsAdapter.enableAnalytics; // override enableAnalytics so we can get access to the config passed in from the page

ucfunnelAnalyticsAdapter.enableAnalytics = function (config) {
  if (this.initConfig(config)) {
    ucfunnelAnalyticsAdapter.originEnableAnalytics(config); // call the base class function
  }
};

__WEBPACK_IMPORTED_MODULE_3__src_adapterManager_js__["default"].registerAnalyticsAdapter({
  adapter: ucfunnelAnalyticsAdapter,
  code: 'ucfunnelAnalytics'
});

/***/ })

},[762]);