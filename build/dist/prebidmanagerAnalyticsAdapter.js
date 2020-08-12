pbjsChunk([15],{

/***/ 402:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(403);


/***/ }),

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_ajax__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_AnalyticsAdapter__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapterManager__ = __webpack_require__(7);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




/**
 * prebidmanagerAnalyticsAdapter.js - analytics adapter for prebidmanager
 */

var DEFAULT_EVENT_URL = 'https://endpoint.prebidmanager.com/endpoint';
var analyticsType = 'endpoint';
var analyticsName = 'Prebid Manager Analytics: ';

var utils = __webpack_require__(0);

var CONSTANTS = __webpack_require__(5);

var ajax = Object(__WEBPACK_IMPORTED_MODULE_0__src_ajax__["b" /* ajaxBuilder */])(0);
var _VERSION = 1;
var initOptions = null;

var _pageViewId = utils.generateUUID();

var _startAuction = 0;
var _bidRequestTimeout = 0;
var flushInterval;
var pmAnalyticsEnabled = false;
var w = window;
var d = document;
var e = d.documentElement;
var g = d.getElementsByTagName('body')[0];
var x = w.innerWidth || e.clientWidth || g.clientWidth;
var y = w.innerHeight || e.clientHeight || g.clientHeight;
var _pageView = {
  eventType: 'pageView',
  userAgent: window.navigator.userAgent,
  timestamp: Date.now(),
  timezoneOffset: new Date().getTimezoneOffset(),
  language: window.navigator.language,
  vendor: window.navigator.vendor,
  screenWidth: x,
  screenHeight: y
};
var _eventQueue = [_pageView];

var prebidmanagerAnalytics = _extends(Object(__WEBPACK_IMPORTED_MODULE_1__src_AnalyticsAdapter__["a" /* default */])({
  url: DEFAULT_EVENT_URL,
  analyticsType: analyticsType
}), {
  track: function track(_ref) {
    var eventType = _ref.eventType,
        args = _ref.args;
    handleEvent(eventType, args);
  }
});

prebidmanagerAnalytics.originEnableAnalytics = prebidmanagerAnalytics.enableAnalytics;

prebidmanagerAnalytics.enableAnalytics = function (config) {
  initOptions = config.options || {};
  initOptions.url = initOptions.url || DEFAULT_EVENT_URL;
  pmAnalyticsEnabled = true;
  prebidmanagerAnalytics.originEnableAnalytics(config);
  flushInterval = setInterval(flush, 1000);
};

prebidmanagerAnalytics.originDisableAnalytics = prebidmanagerAnalytics.disableAnalytics;

prebidmanagerAnalytics.disableAnalytics = function () {
  if (!pmAnalyticsEnabled) {
    return;
  }

  flush();
  clearInterval(flushInterval);
  prebidmanagerAnalytics.originDisableAnalytics();
};

function flush() {
  if (!pmAnalyticsEnabled) {
    return;
  }

  if (_eventQueue.length > 1) {
    var data = {
      pageViewId: _pageViewId,
      ver: _VERSION,
      bundleId: initOptions.bundleId,
      events: _eventQueue
    };
    ajax(initOptions.url, function () {
      return utils.logInfo("".concat(analyticsName, " sent events batch"));
    }, _VERSION + ':' + JSON.stringify(data), {
      contentType: 'text/plain',
      method: 'POST',
      withCredentials: true
    });
    _eventQueue = [_pageView];
  }
}

function handleEvent(eventType, eventArgs) {
  eventArgs = eventArgs ? JSON.parse(JSON.stringify(eventArgs)) : {};
  var pmEvent = {};

  switch (eventType) {
    case CONSTANTS.EVENTS.AUCTION_INIT:
      {
        pmEvent = eventArgs;
        _startAuction = pmEvent.timestamp;
        _bidRequestTimeout = pmEvent.timeout;
        break;
      }

    case CONSTANTS.EVENTS.AUCTION_END:
      {
        pmEvent = eventArgs;
        pmEvent.start = _startAuction;
        pmEvent.end = Date.now();
        break;
      }

    case CONSTANTS.EVENTS.BID_ADJUSTMENT:
      {
        pmEvent.bidders = eventArgs;
        break;
      }

    case CONSTANTS.EVENTS.BID_TIMEOUT:
      {
        pmEvent.bidders = eventArgs;
        pmEvent.duration = _bidRequestTimeout;
        break;
      }

    case CONSTANTS.EVENTS.BID_REQUESTED:
      {
        pmEvent = eventArgs;
        break;
      }

    case CONSTANTS.EVENTS.BID_RESPONSE:
      {
        pmEvent = eventArgs;
        delete pmEvent.ad;
        break;
      }

    case CONSTANTS.EVENTS.BID_WON:
      {
        pmEvent = eventArgs;
        delete pmEvent.ad;
        delete pmEvent.adUrl;
        break;
      }

    case CONSTANTS.EVENTS.BIDDER_DONE:
      {
        pmEvent = eventArgs;
        break;
      }

    case CONSTANTS.EVENTS.SET_TARGETING:
      {
        pmEvent.targetings = eventArgs;
        break;
      }

    case CONSTANTS.EVENTS.REQUEST_BIDS:
      {
        pmEvent = eventArgs;
        break;
      }

    case CONSTANTS.EVENTS.ADD_AD_UNITS:
      {
        pmEvent = eventArgs;
        break;
      }

    case CONSTANTS.EVENTS.AD_RENDER_FAILED:
      {
        pmEvent = eventArgs;
        break;
      }

    default:
      return;
  }

  pmEvent.eventType = eventType;
  pmEvent.timestamp = pmEvent.timestamp || Date.now();
  sendEvent(pmEvent);
}

function sendEvent(event) {
  _eventQueue.push(event);

  utils.logInfo("".concat(analyticsName, "Event ").concat(event.eventType, ":"), event);

  if (event.eventType === CONSTANTS.EVENTS.AUCTION_END) {
    flush();
  }
}

__WEBPACK_IMPORTED_MODULE_2__src_adapterManager__["default"].registerAnalyticsAdapter({
  adapter: prebidmanagerAnalytics,
  code: 'prebidmanager'
});

prebidmanagerAnalytics.getOptions = function () {
  return initOptions;
};

prebidmanagerAnalytics.flush = flush;
/* harmony default export */ __webpack_exports__["default"] = (prebidmanagerAnalytics);

/***/ }),

/***/ 6:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = AnalyticsAdapter;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__constants__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ajax__ = __webpack_require__(4);
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

/***/ })

},[402]);