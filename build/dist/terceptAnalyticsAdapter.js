pbjsChunk([6],{

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

/***/ 738:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(739);


/***/ }),

/***/ 739:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_AnalyticsAdapter_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_constants_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__src_constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_utils_js__ = __webpack_require__(0);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }






var emptyUrl = '';
var analyticsType = 'endpoint';
var terceptAnalyticsVersion = 'v1.0.0';
var defaultHostName = 'us-central1-quikr-ebay.cloudfunctions.net';
var defaultPathName = '/prebid-analytics';
var initOptions;
var auctionTimestamp;
var events = {
  bids: []
};

var terceptAnalyticsAdapter = _extends(Object(__WEBPACK_IMPORTED_MODULE_1__src_AnalyticsAdapter_js__["a" /* default */])({
  emptyUrl: emptyUrl,
  analyticsType: analyticsType
}), {
  track: function track(_ref) {
    var eventType = _ref.eventType,
        args = _ref.args;

    if (typeof args !== 'undefined') {
      if (eventType === __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default.a.EVENTS.BID_TIMEOUT) {
        args.forEach(function (item) {
          mapBidResponse(item, 'timeout');
        });
      } else if (eventType === __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default.a.EVENTS.AUCTION_INIT) {
        events.auctionInit = args;
        auctionTimestamp = args.timestamp;
      } else if (eventType === __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default.a.EVENTS.BID_REQUESTED) {
        mapBidRequests(args).forEach(function (item) {
          events.bids.push(item);
        });
      } else if (eventType === __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default.a.EVENTS.BID_RESPONSE) {
        mapBidResponse(args, 'response');
      } else if (eventType === __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default.a.EVENTS.BID_WON) {
        send({
          bidWon: mapBidResponse(args, 'win')
        }, 'won');
      }
    }

    if (eventType === __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default.a.EVENTS.AUCTION_END) {
      send(events, 'auctionEnd');
    }
  }
});

function mapBidRequests(params) {
  var arr = [];

  if (typeof params.bids !== 'undefined' && params.bids.length) {
    params.bids.forEach(function (bid) {
      arr.push({
        bidderCode: bid.bidder,
        bidId: bid.bidId,
        adUnitCode: bid.adUnitCode,
        requestId: bid.bidderRequestId,
        auctionId: bid.auctionId,
        transactionId: bid.transactionId,
        sizes: __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["parseSizesInput"](bid.mediaTypes.banner.sizes).toString(),
        renderStatus: 1,
        requestTimestamp: params.auctionStart
      });
    });
  }

  return arr;
}

function mapBidResponse(bidResponse, status) {
  if (status !== 'win') {
    var bid = events.bids.filter(function (o) {
      return o.bidId === bidResponse.bidId || o.bidId === bidResponse.requestId;
    })[0];

    _extends(bid, {
      bidderCode: bidResponse.bidder,
      bidId: status === 'timeout' ? bidResponse.bidId : bidResponse.requestId,
      adUnitCode: bidResponse.adUnitCode,
      auctionId: bidResponse.auctionId,
      creativeId: bidResponse.creativeId,
      transactionId: bidResponse.transactionId,
      currency: bidResponse.currency,
      cpm: bidResponse.cpm,
      netRevenue: bidResponse.netRevenue,
      mediaType: bidResponse.mediaType,
      statusMessage: bidResponse.statusMessage,
      status: bidResponse.status,
      renderStatus: status === 'timeout' ? 3 : 2,
      timeToRespond: bidResponse.timeToRespond,
      requestTimestamp: bidResponse.requestTimestamp,
      responseTimestamp: bidResponse.responseTimestamp
    });
  } else {
    return {
      bidderCode: bidResponse.bidder,
      bidId: bidResponse.requestId,
      adUnitCode: bidResponse.adUnitCode,
      auctionId: bidResponse.auctionId,
      creativeId: bidResponse.creativeId,
      transactionId: bidResponse.transactionId,
      currency: bidResponse.currency,
      cpm: bidResponse.cpm,
      netRevenue: bidResponse.netRevenue,
      renderedSize: bidResponse.size,
      mediaType: bidResponse.mediaType,
      statusMessage: bidResponse.statusMessage,
      status: bidResponse.status,
      renderStatus: 4,
      timeToRespond: bidResponse.timeToRespond,
      requestTimestamp: bidResponse.requestTimestamp,
      responseTimestamp: bidResponse.responseTimestamp
    };
  }
}

function send(data, status) {
  var location = __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["getWindowLocation"]();

  if (typeof data !== 'undefined' && typeof data.auctionInit !== 'undefined') {
    _extends(data.auctionInit, {
      host: location.host,
      path: location.pathname,
      search: location.search
    });
  }

  data.initOptions = initOptions;
  var terceptAnalyticsRequestUrl = __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["buildUrl"]({
    protocol: 'https',
    hostname: initOptions && initOptions.hostName || defaultHostName,
    pathname: initOptions && initOptions.pathName || defaultPathName,
    search: {
      auctionTimestamp: auctionTimestamp,
      terceptAnalyticsVersion: terceptAnalyticsVersion,
      prebidVersion: pbjs.version
    }
  });
  Object(__WEBPACK_IMPORTED_MODULE_0__src_ajax_js__["a" /* ajax */])(terceptAnalyticsRequestUrl, undefined, JSON.stringify(data), {
    method: 'POST',
    contentType: 'text/plain'
  });
}

terceptAnalyticsAdapter.originEnableAnalytics = terceptAnalyticsAdapter.enableAnalytics;

terceptAnalyticsAdapter.enableAnalytics = function (config) {
  initOptions = config.options;
  terceptAnalyticsAdapter.originEnableAnalytics(config);
};

__WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__["default"].registerAnalyticsAdapter({
  adapter: terceptAnalyticsAdapter,
  code: 'tercept'
});
/* harmony default export */ __webpack_exports__["default"] = (terceptAnalyticsAdapter);

/***/ })

},[738]);