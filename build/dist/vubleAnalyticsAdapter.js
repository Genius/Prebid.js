pbjsChunk([5],{

/***/ 6:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = AnalyticsAdapter;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__constants__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ajax__ = __webpack_require__(5);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }




var events = __webpack_require__(8);

var utils = __webpack_require__(0);

var _CONSTANTS$EVENTS = __WEBPACK_IMPORTED_MODULE_0__constants___default.a.EVENTS,
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
    Object(__WEBPACK_IMPORTED_MODULE_1__ajax__["a" /* ajax */])(url, callback, JSON.stringify({
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

/***/ 654:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(655);


/***/ }),

/***/ 655:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["ExpiringQueue"] = ExpiringQueue;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapterManager__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_constants_json__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__src_constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_ajax__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_utils__ = __webpack_require__(0);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * vuble.js - Vuble Prebid Analytics Adapter
 */





var ANALYTICS_VERSION = '1.0.0';
var DEFAULT_QUEUE_TIMEOUT = 4000;
var DEFAULT_HOST = 'player.mediabong';
var analyticsType = 'endpoint';
var EVENTS = [__WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.AUCTION_INIT, __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.AUCTION_END, __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.BID_REQUESTED, __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.BID_RESPONSE, __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.BID_WON, __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.BID_TIMEOUT];

var vubleAnalytics = _extends(Object(__WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter__["a" /* default */])({
  analyticsType: analyticsType
}), {
  track: function track(_ref) {
    var eventType = _ref.eventType,
        args = _ref.args;

    if (!vubleAnalytics.context) {
      return;
    }

    if (EVENTS.indexOf(eventType) !== -1) {
      if (eventType === __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.AUCTION_INIT && vubleAnalytics.context.queue) {
        vubleAnalytics.context.queue.init();
      }

      var events = deal[eventType](args);

      if (vubleAnalytics.context.queue) {
        vubleAnalytics.context.queue.push(events);
      }

      if (eventType === __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.AUCTION_END) {
        sendAll();
      }
    }
  }
});

vubleAnalytics.context = {};
vubleAnalytics.originEnableAnalytics = vubleAnalytics.enableAnalytics;

vubleAnalytics.enableAnalytics = function (config) {
  if (!config.options.pubId) {
    __WEBPACK_IMPORTED_MODULE_4__src_utils__["logError"]('The publisher id is not defined. Analytics won\'t work');
    return;
  }

  if (!config.options.host) {
    if (!config.options.env) {
      __WEBPACK_IMPORTED_MODULE_4__src_utils__["logError"]('The environement is not defined. Analytics won\'t work');
      return;
    }

    config.options.host = DEFAULT_HOST + '.' + config.options.env + '/t';
  }

  vubleAnalytics.context = {
    host: config.options.host,
    pubId: config.options.pubId,
    requestTemplate: buildRequestTemplate(config.options.pubId),
    queue: new ExpiringQueue(sendAll, config.options.queueTimeout || DEFAULT_QUEUE_TIMEOUT)
  };
  vubleAnalytics.originEnableAnalytics(config);
};

__WEBPACK_IMPORTED_MODULE_1__src_adapterManager__["default"].registerAnalyticsAdapter({
  adapter: vubleAnalytics,
  code: 'vuble'
});
/* harmony default export */ __webpack_exports__["default"] = (vubleAnalytics);

function sendAll() {
  var events = vubleAnalytics.context.queue.popAll();

  if (events.length !== 0) {
    var req = _extends({}, vubleAnalytics.context.requestTemplate, {
      rtb: events
    });

    Object(__WEBPACK_IMPORTED_MODULE_3__src_ajax__["a" /* ajax */])("//".concat(vubleAnalytics.context.host, "/rtb.php"), undefined, JSON.stringify(req));
  }
}

var deal = {
  auctionInit: function auctionInit() {
    vubleAnalytics.context.auctionTimeStart = Date.now();
    return [{
      event: __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.AUCTION_INIT,
      date: vubleAnalytics.context.auctionTimeStart
    }];
  },
  bidRequested: function bidRequested(args) {
    return args.bids.map(function (bid) {
      var vubleEvent = {
        event: __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.BID_REQUESTED
      };

      if (typeof args.bidderCode !== 'undefined') {
        vubleEvent.adapter = args.bidderCode;
      }

      if (typeof bid.bidId !== 'undefined') {
        vubleEvent.bidder = bid.bidId;
      }

      if (typeof bid.bidderRequestId !== 'undefined') {
        vubleEvent.id = bid.bidderRequestId;
      }

      if (typeof bid.params.floorPrice !== 'undefined') {
        vubleEvent.floor = bid.params.floorPrice;
      }

      if (typeof bid.params.zoneId !== 'undefined') {
        vubleEvent.zoneId = bid.params.zoneId;
      }

      if (typeof bid.mediaTypes !== 'undefined' && typeof bid.mediaTypes.videos !== 'undefined' && typeof bid.mediaTypes.videos.context !== 'undefined') {
        vubleEvent.context = bid.mediaTypes.videos.context;
      }

      if (typeof bid.sizes !== 'undefined') {
        vubleEvent.size = bid.sizes;
      }

      return vubleEvent;
    });
  },
  bidResponse: function bidResponse(args) {
    var event = formalizeBidEvent(args.bidderCode, __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.BID_RESPONSE, args.cpm, args.dealId, args.adId);
    return [event];
  },
  bidWon: function bidWon(args) {
    var event = formalizeBidEvent(args.bidderCode, __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.BID_WON, args.cpm, args.dealId);
    return [event];
  },
  auctionEnd: function auctionEnd() {
    return [{
      event: __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.AUCTION_END,
      time: (Date.now() - vubleAnalytics.context.auctionTimeStart) / 1000
    }];
  },
  bidTimeout: function bidTimeout(args) {
    return args.map(function (bid) {
      return {
        adapter: bid,
        event: __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.BID_TIMEOUT
      };
    });
  }
};

function formalizeBidEvent(adapter, event) {
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var dealId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var id = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var vubleEvent = {
    event: event
  };

  if (adapter) {
    vubleEvent.adapter = adapter;
  }

  if (value) {
    vubleEvent.val = value;
  }

  if (dealId) {
    vubleEvent.id = dealId;
  }

  if (id) {
    vubleEvent.id = id;
  }

  return vubleEvent;
}

function buildRequestTemplate(pubId) {
  var topLocation = __WEBPACK_IMPORTED_MODULE_4__src_utils__["getTopWindowLocation"]();
  return {
    ver: ANALYTICS_VERSION,
    domain: topLocation.hostname,
    path: topLocation.pathname,
    pubid: pubId,
    width: window.screen.width,
    height: window.screen.height,
    lang: navigator.language
  };
}
/**
 * Expiring queue implementation
 * @param callback
 * @param time
 */


function ExpiringQueue(callback, time) {
  var queue = [];
  var timeoutId;

  this.push = function (event) {
    if (event instanceof Array) {
      queue.push.apply(queue, event);
    } else {
      queue.push(event);
    }

    reset();
  };

  this.popAll = function () {
    var result = queue;
    queue = [];
    reset();
    return result;
  };

  this.init = reset;

  function reset() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(function () {
      if (queue.length) {
        callback();
      }
    }, time);
  }
}

/***/ })

},[654]);