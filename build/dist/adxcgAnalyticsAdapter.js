pbjsChunk([30],{

/***/ 167:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(168);


/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_ajax__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_AnalyticsAdapter__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapterManager__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_constants_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__src_constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_url__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_utils__ = __webpack_require__(0);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }







/**
 * Analytics adapter from adxcg.com
 * maintainer info@adxcg.com
 * updated 201911 for prebid 3.0
 */

var emptyUrl = '';
var analyticsType = 'endpoint';
var adxcgAnalyticsVersion = 'v2.01';

var adxcgAnalyticsAdapter = _extends(Object(__WEBPACK_IMPORTED_MODULE_1__src_AnalyticsAdapter__["a" /* default */])({
  emptyUrl: emptyUrl,
  analyticsType: analyticsType
}), {
  track: function track(_ref) {
    var eventType = _ref.eventType,
        args = _ref.args;

    switch (eventType) {
      case __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default.a.EVENTS.AUCTION_INIT:
        adxcgAnalyticsAdapter.context.events.auctionInit = mapAuctionInit(args);
        adxcgAnalyticsAdapter.context.auctionTimestamp = args.timestamp;
        break;

      case __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default.a.EVENTS.BID_REQUESTED:
        adxcgAnalyticsAdapter.context.auctionId = args.auctionId;
        adxcgAnalyticsAdapter.context.events.bidRequests.push(mapBidRequested(args));
        break;

      case __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default.a.EVENTS.BID_ADJUSTMENT:
        break;

      case __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default.a.EVENTS.BID_TIMEOUT:
        adxcgAnalyticsAdapter.context.events.bidTimeout = args.map(function (item) {
          return item.bidder;
        }).filter(__WEBPACK_IMPORTED_MODULE_5__src_utils__["uniques"]);
        break;

      case __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default.a.EVENTS.BIDDER_DONE:
        break;

      case __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default.a.EVENTS.BID_RESPONSE:
        adxcgAnalyticsAdapter.context.events.bidResponses.push(mapBidResponse(args, eventType));
        break;

      case __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default.a.EVENTS.BID_WON:
        var outData2 = {
          bidWons: mapBidWon(args)
        };
        send(outData2);
        break;

      case __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default.a.EVENTS.AUCTION_END:
        send(adxcgAnalyticsAdapter.context.events);
        break;
    }
  }
});

function mapAuctionInit(auctionInit) {
  return {
    timeout: auctionInit.timeout
  };
}

function mapBidRequested(bidRequests) {
  return {
    bidderCode: bidRequests.bidderCode,
    time: bidRequests.start,
    bids: bidRequests.bids.map(function (bid) {
      return {
        transactionId: bid.transactionId,
        adUnitCode: bid.adUnitCode,
        bidId: bid.bidId,
        start: bid.startTime,
        sizes: __WEBPACK_IMPORTED_MODULE_5__src_utils__["parseSizesInput"](bid.sizes).toString(),
        params: bid.params
      };
    })
  };
}

function mapBidResponse(bidResponse, eventType) {
  return {
    bidderCode: bidResponse.bidder,
    transactionId: bidResponse.transactionId,
    adUnitCode: bidResponse.adUnitCode,
    statusMessage: bidResponse.statusMessage,
    mediaType: bidResponse.mediaType,
    renderedSize: bidResponse.size,
    cpm: bidResponse.cpm,
    currency: bidResponse.currency,
    netRevenue: bidResponse.netRevenue,
    timeToRespond: bidResponse.timeToRespond,
    bidId: eventType === __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default.a.EVENTS.BID_TIMEOUT ? bidResponse.bidId : bidResponse.requestId,
    dealId: bidResponse.dealId,
    status: bidResponse.status,
    creativeId: bidResponse.creativeId.toString()
  };
}

function mapBidWon(bidResponse) {
  return [{
    bidderCode: bidResponse.bidder,
    adUnitCode: bidResponse.adUnitCode,
    statusMessage: bidResponse.statusMessage,
    mediaType: bidResponse.mediaType,
    renderedSize: bidResponse.size,
    cpm: bidResponse.cpm,
    currency: bidResponse.currency,
    netRevenue: bidResponse.netRevenue,
    timeToRespond: bidResponse.timeToRespond,
    bidId: bidResponse.requestId,
    dealId: bidResponse.dealId,
    status: bidResponse.status,
    creativeId: bidResponse.creativeId.toString()
  }];
}

function send(data) {
  var adxcgAnalyticsRequestUrl = __WEBPACK_IMPORTED_MODULE_4__src_url__["a" /* format */]({
    protocol: 'https',
    hostname: adxcgAnalyticsAdapter.context.host,
    pathname: '/pbrx/v2',
    search: {
      pid: adxcgAnalyticsAdapter.context.initOptions.publisherId,
      aid: adxcgAnalyticsAdapter.context.auctionId,
      ats: adxcgAnalyticsAdapter.context.auctionTimestamp,
      aav: adxcgAnalyticsVersion,
      iob: intersectionObserverAvailable(window) ? '1' : '0',
      pbv: pbjs.version,
      sz: window.screen.width + 'x' + window.screen.height
    }
  });
  Object(__WEBPACK_IMPORTED_MODULE_0__src_ajax__["a" /* ajax */])(adxcgAnalyticsRequestUrl, undefined, JSON.stringify(data), {
    contentType: 'text/plain',
    method: 'POST',
    withCredentials: true
  });
}

function intersectionObserverAvailable(win) {
  return win && win.IntersectionObserver && win.IntersectionObserverEntry && win.IntersectionObserverEntry.prototype && 'intersectionRatio' in win.IntersectionObserverEntry.prototype;
}

adxcgAnalyticsAdapter.context = {};
adxcgAnalyticsAdapter.originEnableAnalytics = adxcgAnalyticsAdapter.enableAnalytics;

adxcgAnalyticsAdapter.enableAnalytics = function (config) {
  if (!config.options.publisherId) {
    __WEBPACK_IMPORTED_MODULE_5__src_utils__["logError"]('PublisherId option is not defined. Analytics won\'t work');
    return;
  }

  adxcgAnalyticsAdapter.context = {
    events: {
      bidRequests: [],
      bidResponses: []
    },
    initOptions: config.options,
    host: config.options.host || 'hbarxs.adxcg.net'
  };
  adxcgAnalyticsAdapter.originEnableAnalytics(config);
};

__WEBPACK_IMPORTED_MODULE_2__src_adapterManager__["default"].registerAnalyticsAdapter({
  adapter: adxcgAnalyticsAdapter,
  code: 'adxcg'
});
/* harmony default export */ __webpack_exports__["default"] = (adxcgAnalyticsAdapter);

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

},[167]);