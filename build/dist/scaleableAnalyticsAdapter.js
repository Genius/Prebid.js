pbjsChunk([14],{

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

/***/ 670:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(671);


/***/ }),

/***/ 671:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_constants_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__src_constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_AnalyticsAdapter_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_adapterManager_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_utils_js__ = __webpack_require__(0);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* COPYRIGHT SCALEABLE LLC 2019 */




 // Object.entries polyfill

var entries = Object.entries || function (obj) {
  var ownProps = Object.keys(obj);
  var i = ownProps.length;
  var resArray = new Array(i); // preallocate the Array

  while (i--) {
    resArray[i] = [ownProps[i], obj[ownProps[i]]];
  }

  return resArray;
};

var BID_TIMEOUT = __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default.a.EVENTS.BID_TIMEOUT;
var AUCTION_INIT = __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default.a.EVENTS.AUCTION_INIT;
var BID_WON = __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default.a.EVENTS.BID_WON;
var AUCTION_END = __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default.a.EVENTS.AUCTION_END;
var URL = 'https://auction.scaleable.ai/';
var ANALYTICS_TYPE = 'endpoint';
var auctionData = {};

var scaleableAnalytics = _extends({}, Object(__WEBPACK_IMPORTED_MODULE_2__src_AnalyticsAdapter_js__["a" /* default */])({
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
    return __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logMessage"]("Analytics adapter for \"".concat(global, "\" already enabled, unnecessary call to `enableAnalytics`."));
  };
};

scaleableAnalytics.getAuctionData = function () {
  return auctionData;
};

var sendDataToServer = function sendDataToServer(data) {
  return Object(__WEBPACK_IMPORTED_MODULE_0__src_ajax_js__["a" /* ajax */])(URL, function () {}, JSON.stringify(data));
}; // Track auction initiated


var onAuctionInit = function onAuctionInit(args) {
  var config = scaleableAnalytics.config || {
    options: {}
  };
  var adunitObj = {};
  var adunits = []; // Loop through adunit codes first

  args.adUnitCodes.forEach(function (code) {
    adunitObj[code] = [{
      bidder: 'scaleable_adunit_request'
    }];
  }); // Loop through bidder requests and bids

  args.bidderRequests.forEach(function (bidderObj) {
    bidderObj.bids.forEach(function (bidObj) {
      adunitObj[bidObj.adUnitCode].push({
        bidder: bidObj.bidder,
        params: bidObj.params
      });
    });
  });
  entries(adunitObj).forEach(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        adunitCode = _ref3[0],
        bidRequests = _ref3[1];

    adunits.push({
      code: adunitCode,
      bidRequests: bidRequests
    });
  });
  var data = {
    event: 'request',
    site: config.options.site,
    adunits: adunits
  };
  sendDataToServer(data);
}; // Handle all events besides requests and wins


var onAuctionEnd = function onAuctionEnd(args) {
  var config = scaleableAnalytics.config || {
    options: {}
  };
  var adunitObj = {};
  var adunits = []; // Add Bids Received

  args.bidsReceived.forEach(function (bidObj) {
    if (!adunitObj[bidObj.adUnitCode]) {
      adunitObj[bidObj.adUnitCode] = [];
    }

    adunitObj[bidObj.adUnitCode].push({
      bidder: bidObj.bidderCode || bidObj.bidder,
      cpm: bidObj.cpm,
      currency: bidObj.currency,
      dealId: bidObj.dealId,
      type: bidObj.mediaType,
      ttr: bidObj.timeToRespond,
      size: bidObj.size
    });
  }); // Add in other data (timeouts) as we push to adunits

  entries(adunitObj).forEach(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
        adunitCode = _ref5[0],
        bidsReceived = _ref5[1];

    var bidData = bidsReceived.concat(auctionData[adunitCode] || []);
    adunits.push({
      code: adunitCode,
      bidData: bidData
    });
    delete auctionData[adunitCode];
  }); // Add in any missed auction data

  entries(auctionData).forEach(function (_ref6) {
    var _ref7 = _slicedToArray(_ref6, 2),
        adunitCode = _ref7[0],
        bidData = _ref7[1];

    adunits.push({
      code: adunitCode,
      bidData: bidData
    });
  });
  var data = {
    event: 'bids',
    site: config.options.site,
    adunits: adunits
  };

  if (adunits.length) {
    sendDataToServer(data);
  } // Reset auctionData


  auctionData = {};
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
    ttr: args.timeToRespond,
    params: args.params
  };
  sendDataToServer(data);
};

var onBidTimeout = function onBidTimeout(args) {
  args.forEach(function (currObj) {
    if (!auctionData[currObj.adUnitCode]) {
      auctionData[currObj.adUnitCode] = [];
    }

    auctionData[currObj.adUnitCode].push({
      timeouts: 1,
      bidder: currObj.bidder
    });
  });
};

__WEBPACK_IMPORTED_MODULE_3__src_adapterManager_js__["default"].registerAnalyticsAdapter({
  adapter: scaleableAnalytics,
  code: 'scaleable'
});
/* harmony default export */ __webpack_exports__["default"] = (scaleableAnalytics);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(33)))

/***/ })

},[670]);