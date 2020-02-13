pbjsChunk([2],{

/***/ 17:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 544:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(545);


/***/ }),

/***/ 545:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_ajax__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_constants_json__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__src_constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_AnalyticsAdapter__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_adapterManager__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_utils__ = __webpack_require__(0);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* COPYRIGHT SCALEABLE LLC 2019 */





var BID_TIMEOUT = __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default.a.EVENTS.BID_TIMEOUT;
var AUCTION_INIT = __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default.a.EVENTS.AUCTION_INIT;
var BID_RESPONSE = __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default.a.EVENTS.BID_RESPONSE;
var BID_WON = __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default.a.EVENTS.BID_WON;
var AUCTION_END = __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default.a.EVENTS.AUCTION_END;
var URL = 'https://auction.scaleable.ai/';
var ANALYTICS_TYPE = 'endpoint';
var auctionData = {};

var scaleableAnalytics = _extends({}, Object(__WEBPACK_IMPORTED_MODULE_2__src_AnalyticsAdapter__["a" /* default */])({
  URL: URL,
  ANALYTICS_TYPE: ANALYTICS_TYPE
}), {
  // Override AnalyticsAdapter functions by supplying custom methods
  track: function track(_ref) {
    var eventType = _ref.eventType,
        args = _ref.args;

    switch (eventType) {
      case AUCTION_INIT:
        onAuctionInit(args);
        break;

      case AUCTION_END:
        onAuctionEnd(args);
        break;

      case BID_WON:
        onBidWon(args);
        break;

      case BID_RESPONSE:
        onBidResponse(args);
        break;

      case BID_TIMEOUT:
        onBidTimeout(args);
        break;

      default:
        break;
    }
  }
});

scaleableAnalytics.config = {};
scaleableAnalytics.originEnableAnalytics = scaleableAnalytics.enableAnalytics;

scaleableAnalytics.enableAnalytics = function (config) {
  scaleableAnalytics.config = config;
  scaleableAnalytics.originEnableAnalytics(config);

  scaleableAnalytics.enableAnalytics = function _enable() {
    return __WEBPACK_IMPORTED_MODULE_4__src_utils__["logMessage"]("Analytics adapter for \"".concat(global, "\" already enabled, unnecessary call to `enableAnalytics`."));
  };
};

scaleableAnalytics.getAuctionData = function () {
  return auctionData;
};

var sendDataToServer = function sendDataToServer(data) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__src_ajax__["a" /* ajax */])(URL, function () {}, JSON.stringify(data));
}; // Track auction initiated


var onAuctionInit = function onAuctionInit(args) {
  var config = scaleableAnalytics.config || {
    options: {}
  };

  for (var idx = args.adUnitCodes.length; idx--;) {
    var data = {
      event: 'request',
      site: config.options.site,
      adunit: args.adUnitCodes[idx]
    };
    sendDataToServer(data);
  }
}; // Handle all events besides requests and wins


var onAuctionEnd = function onAuctionEnd(args) {
  for (var adunit in auctionData) {
    sendDataToServer(auctionData[adunit]);
  }
}; // Bid Win Events occur after auction end


var onBidWon = function onBidWon(args) {
  var config = scaleableAnalytics.config || {
    options: {}
  };
  var data = {
    event: 'win',
    site: config.options.site,
    adunit: args.adUnitCode,
    code: args.bidderCode,
    cpm: args.cpm,
    ttr: args.timeToRespond
  };
  sendDataToServer(data);
};

var onBidResponse = function onBidResponse(args) {
  var config = scaleableAnalytics.config || {
    options: {}
  };

  if (!auctionData[args.adUnitCode]) {
    auctionData[args.adUnitCode] = {
      event: 'bids',
      bids: [],
      adunit: args.adUnitCode,
      site: config.options.site
    };
  }

  var currBidData = {
    code: args.bidderCode,
    cpm: args.cpm,
    ttr: args.timeToRespond
  };
  auctionData[args.adUnitCode].bids.push(currBidData);
};

var onBidTimeout = function onBidTimeout(args) {
  var config = scaleableAnalytics.config || {
    options: {}
  };

  for (var i = args.length; i--;) {
    var currObj = args[i];

    if (!auctionData[currObj.adUnitCode]) {
      auctionData[currObj.adUnitCode] = {
        event: 'bids',
        bids: [],
        timeouts: [],
        adunit: currObj.adUnitCode,
        site: config.options.site
      };
    }

    auctionData[currObj.adUnitCode].timeouts.push(currObj.bidder);
  }
};

__WEBPACK_IMPORTED_MODULE_3__src_adapterManager__["default"].registerAnalyticsAdapter({
  adapter: scaleableAnalytics,
  code: 'scaleable'
});
/* harmony default export */ __webpack_exports__["default"] = (scaleableAnalytics);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(17)))

/***/ }),

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

/***/ })

},[544]);