pbjsChunk([22],{

/***/ 302:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(303);


/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_ajax__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_AnalyticsAdapter__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapterManager__ = __webpack_require__(7);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * invisiblyAdapterAdapter.js - analytics adapter for Invisibly
 */



var DEFAULT_EVENT_URL = 'https://api.pymx5.com/v1/' + 'sites/events';
var analyticsType = 'endpoint';
var analyticsName = 'Invisibly Analytics Adapter:';

var utils = __webpack_require__(0);

var CONSTANTS = __webpack_require__(5);

var ajax = Object(__WEBPACK_IMPORTED_MODULE_0__src_ajax__["b" /* ajaxBuilder */])(0); // Events needed

var _CONSTANTS$EVENTS = CONSTANTS.EVENTS,
    AUCTION_INIT = _CONSTANTS$EVENTS.AUCTION_INIT,
    AUCTION_END = _CONSTANTS$EVENTS.AUCTION_END,
    BID_ADJUSTMENT = _CONSTANTS$EVENTS.BID_ADJUSTMENT,
    BID_TIMEOUT = _CONSTANTS$EVENTS.BID_TIMEOUT,
    BID_REQUESTED = _CONSTANTS$EVENTS.BID_REQUESTED,
    BID_RESPONSE = _CONSTANTS$EVENTS.BID_RESPONSE,
    NO_BID = _CONSTANTS$EVENTS.NO_BID,
    BID_WON = _CONSTANTS$EVENTS.BID_WON,
    BIDDER_DONE = _CONSTANTS$EVENTS.BIDDER_DONE,
    SET_TARGETING = _CONSTANTS$EVENTS.SET_TARGETING,
    REQUEST_BIDS = _CONSTANTS$EVENTS.REQUEST_BIDS,
    ADD_AD_UNITS = _CONSTANTS$EVENTS.ADD_AD_UNITS,
    AD_RENDER_FAILED = _CONSTANTS$EVENTS.AD_RENDER_FAILED;
var _VERSION = 1;

var _pageViewId = utils.generateUUID();

var initOptions = null;
var _startAuction = 0;
var _bidRequestTimeout = 0;
var flushInterval;
var invisiblyAnalyticsEnabled = false;
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

var invisiblyAdapter = _extends(Object(__WEBPACK_IMPORTED_MODULE_1__src_AnalyticsAdapter__["a" /* default */])({
  url: DEFAULT_EVENT_URL,
  analyticsType: analyticsType
}), {
  track: function track(_ref) {
    var eventType = _ref.eventType,
        args = _ref.args;
    handleEvent(eventType, args);
  },
  sendEvent: sendEvent
});

invisiblyAdapter.originEnableAnalytics = invisiblyAdapter.enableAnalytics;

invisiblyAdapter.enableAnalytics = function (config) {
  initOptions = config.options || {};
  initOptions.url = initOptions.url || DEFAULT_EVENT_URL;

  if (initOptions.url && initOptions.account) {
    invisiblyAnalyticsEnabled = true;
    invisiblyAdapter.originEnableAnalytics(config);
  } else {
    invisiblyAnalyticsEnabled = false;
    invisiblyAdapter.originDisableAnalytics();
  }

  flushInterval = setInterval(flush, 1000);
};

invisiblyAdapter.originDisableAnalytics = invisiblyAdapter.disableAnalytics;

invisiblyAdapter.disableAnalytics = function () {
  if (!invisiblyAnalyticsEnabled) {
    return;
  }

  flush();
  clearInterval(flushInterval);
  invisiblyAdapter.originDisableAnalytics();
};

function flush() {
  if (!invisiblyAnalyticsEnabled) {
    return;
  }

  if (_eventQueue.length > 0) {
    while (_eventQueue.length) {
      var eventFromQue = _eventQueue.shift();

      var eventtype = 'PREBID_' + eventFromQue.eventType;
      delete eventFromQue.eventType;

      var data = _objectSpread({
        pageViewId: _pageViewId,
        ver: _VERSION,
        bundleId: initOptions.bundleId
      }, eventFromQue);

      var payload = {
        event_type: eventtype,
        event_data: _objectSpread({}, data)
      };
      ajax(initOptions.url, function () {
        return utils.logInfo("".concat(analyticsName, " sent events batch"));
      }, JSON.stringify(payload), {
        contentType: 'application/json',
        method: 'POST',
        withCredentials: true
      });
    }
  }
}

function handleEvent(eventType, eventArgs) {
  eventArgs = eventArgs ? JSON.parse(JSON.stringify(eventArgs)) : {};
  var invisiblyEvent = {};

  switch (eventType) {
    case AUCTION_INIT:
      {
        invisiblyEvent = eventArgs;
        _startAuction = invisiblyEvent.timestamp;
        _bidRequestTimeout = invisiblyEvent.timeout;
        break;
      }

    case AUCTION_END:
      {
        invisiblyEvent = eventArgs;
        invisiblyEvent.start = _startAuction;
        invisiblyEvent.end = Date.now();
        break;
      }

    case BID_ADJUSTMENT:
      {
        invisiblyEvent.bidders = eventArgs;
        break;
      }

    case BID_TIMEOUT:
      {
        invisiblyEvent.bidders = eventArgs;
        invisiblyEvent.duration = _bidRequestTimeout;
        break;
      }

    case BID_REQUESTED:
      {
        invisiblyEvent = eventArgs;
        break;
      }

    case BID_RESPONSE:
      {
        invisiblyEvent = eventArgs;
        break;
      }

    case NO_BID:
      {
        invisiblyEvent.noBid = eventArgs;
        break;
      }

    case BID_WON:
      {
        invisiblyEvent = eventArgs;
        break;
      }

    case BIDDER_DONE:
      {
        invisiblyEvent = eventArgs;
        break;
      }

    case SET_TARGETING:
      {
        invisiblyEvent.targetings = eventArgs;
        break;
      }

    case REQUEST_BIDS:
      {
        invisiblyEvent = eventArgs;
        break;
      }

    case ADD_AD_UNITS:
      {
        invisiblyEvent = eventArgs;
        break;
      }

    case AD_RENDER_FAILED:
      {
        invisiblyEvent = eventArgs;
        break;
      }

    default:
      return;
  }

  invisiblyEvent.eventType = eventType;
  invisiblyEvent.timestamp = invisiblyEvent.timestamp || Date.now();
  sendEvent(invisiblyEvent);
}

function sendEvent(event) {
  _eventQueue.push(event);

  utils.logInfo("".concat(analyticsName, "Event ").concat(event.eventType, ":"), event);

  if (event.eventType === AUCTION_END) {
    flush();
    clearInterval(flushInterval);
  }
}

__WEBPACK_IMPORTED_MODULE_2__src_adapterManager__["default"].registerAnalyticsAdapter({
  adapter: invisiblyAdapter,
  code: 'invisiblyAnalytics'
});

invisiblyAdapter.getOptions = function () {
  return initOptions;
};

invisiblyAdapter.flush = flush;
/* harmony default export */ __webpack_exports__["default"] = (invisiblyAdapter);

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

},[302]);