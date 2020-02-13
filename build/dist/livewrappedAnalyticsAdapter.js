pbjsChunk([25],{

/***/ 391:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(392);


/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BID_WON_TIMEOUT", function() { return BID_WON_TIMEOUT; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_ajax__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_AnalyticsAdapter__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_constants_json__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__src_constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_adapterManager__ = __webpack_require__(7);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }






var ANALYTICSTYPE = 'endpoint';
var URL = '//lwadm.com/analytics/10';
var EMPTYURL = '';
var REQUESTSENT = 1;
var RESPONSESENT = 2;
var WINSENT = 4;
var TIMEOUTSENT = 8;
var initOptions;
var BID_WON_TIMEOUT = 500;
var cache = {
  auctions: {},
  bidAdUnits: {}
};

var livewrappedAnalyticsAdapter = _extends(Object(__WEBPACK_IMPORTED_MODULE_2__src_AnalyticsAdapter__["a" /* default */])({
  EMPTYURL: EMPTYURL,
  ANALYTICSTYPE: ANALYTICSTYPE
}), {
  track: function track(_ref) {
    var eventType = _ref.eventType,
        args = _ref.args;
    var time = __WEBPACK_IMPORTED_MODULE_0__src_utils__["timestamp"]();
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('LIVEWRAPPED_EVENT:', [eventType, args]);

    switch (eventType) {
      case __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default.a.EVENTS.AUCTION_INIT:
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('LIVEWRAPPED_AUCTION_INIT:', args);
        cache.auctions[args.auctionId] = {
          bids: {}
        };
        break;

      case __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default.a.EVENTS.BID_REQUESTED:
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('LIVEWRAPPED_BID_REQUESTED:', args);
        cache.auctions[args.auctionId].timeStamp = args.start;
        args.bids.forEach(function (bidRequest) {
          cache.auctions[args.auctionId].bids[bidRequest.bidId] = {
            bidder: bidRequest.bidder,
            adUnit: bidRequest.adUnitCode,
            isBid: false,
            won: false,
            timeout: false,
            sendStatus: 0,
            readyToSend: 0,
            start: args.start
          };
          __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"](bidRequest);
        });
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"](livewrappedAnalyticsAdapter.requestEvents);
        break;

      case __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default.a.EVENTS.BID_RESPONSE:
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('LIVEWRAPPED_BID_RESPONSE:', args);
        var bidResponse = cache.auctions[args.auctionId].bids[args.requestId];
        bidResponse.isBid = args.getStatusCode() === __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default.a.STATUS.GOOD;
        bidResponse.width = args.width;
        bidResponse.height = args.height;
        bidResponse.cpm = args.cpm;
        bidResponse.ttr = args.timeToRespond;
        bidResponse.readyToSend = 1;

        if (!bidResponse.ttr) {
          bidResponse.ttr = time - bidResponse.start;
        }

        if (!cache.bidAdUnits[bidResponse.adUnit]) {
          cache.bidAdUnits[bidResponse.adUnit] = {
            sent: 0,
            timeStamp: cache.auctions[args.auctionId].timeStamp
          };
        }

        break;

      case __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default.a.EVENTS.BIDDER_DONE:
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('LIVEWRAPPED_BIDDER_DONE:', args);
        args.bids.forEach(function (doneBid) {
          var bid = cache.auctions[doneBid.auctionId].bids[doneBid.bidId || doneBid.requestId];

          if (!bid.ttr) {
            bid.ttr = time - bid.start;
          }

          bid.readyToSend = 1;
        });
        break;

      case __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default.a.EVENTS.BID_WON:
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('LIVEWRAPPED_BID_WON:', args);
        var wonBid = cache.auctions[args.auctionId].bids[args.requestId];
        wonBid.won = true;

        if (wonBid.sendStatus != 0) {
          livewrappedAnalyticsAdapter.sendEvents();
        }

        break;

      case __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default.a.EVENTS.BID_TIMEOUT:
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('LIVEWRAPPED_BID_TIMEOUT:', args);
        args.forEach(function (timeout) {
          cache.auctions[timeout.auctionId].bids[timeout.bidId].timeout = true;
        });
        break;

      case __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default.a.EVENTS.AUCTION_END:
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('LIVEWRAPPED_AUCTION_END:', args);
        setTimeout(function () {
          livewrappedAnalyticsAdapter.sendEvents();
        }, BID_WON_TIMEOUT);
        break;
    }
  }
}); // save the base class function


livewrappedAnalyticsAdapter.originEnableAnalytics = livewrappedAnalyticsAdapter.enableAnalytics;
livewrappedAnalyticsAdapter.allRequestEvents = []; // override enableAnalytics so we can get access to the config passed in from the page

livewrappedAnalyticsAdapter.enableAnalytics = function (config) {
  initOptions = config.options;
  livewrappedAnalyticsAdapter.originEnableAnalytics(config);
};

livewrappedAnalyticsAdapter.sendEvents = function () {
  var events = {
    publisherId: initOptions.publisherId,
    requests: getSentRequests(),
    responses: getResponses(),
    wins: getWins(),
    timeouts: getTimeouts(),
    bidAdUnits: getbidAdUnits(),
    rcv: getAdblockerRecovered()
  };

  if (events.requests.length == 0 && events.responses.length == 0 && events.wins.length == 0 && events.timeouts.length == 0) {
    return;
  }

  Object(__WEBPACK_IMPORTED_MODULE_1__src_ajax__["a" /* ajax */])(URL, undefined, JSON.stringify(events), {
    method: 'POST'
  });
};

function getAdblockerRecovered() {
  try {
    return __WEBPACK_IMPORTED_MODULE_0__src_utils__["getWindowTop"]().I12C && __WEBPACK_IMPORTED_MODULE_0__src_utils__["getWindowTop"]().I12C.Morph === 1;
  } catch (e) {}
}

function getSentRequests() {
  var sentRequests = [];
  Object.keys(cache.auctions).forEach(function (auctionId) {
    Object.keys(cache.auctions[auctionId].bids).forEach(function (bidId) {
      var auction = cache.auctions[auctionId];
      var bid = auction.bids[bidId];

      if (!(bid.sendStatus & REQUESTSENT)) {
        bid.sendStatus |= REQUESTSENT;
        sentRequests.push({
          timeStamp: auction.timeStamp,
          adUnit: bid.adUnit,
          bidder: bid.bidder
        });
      }
    });
  });
  return sentRequests;
}

function getResponses() {
  var responses = [];
  Object.keys(cache.auctions).forEach(function (auctionId) {
    Object.keys(cache.auctions[auctionId].bids).forEach(function (bidId) {
      var auction = cache.auctions[auctionId];
      var bid = auction.bids[bidId];

      if (bid.readyToSend && !(bid.sendStatus & RESPONSESENT) && !bid.timeout) {
        bid.sendStatus |= RESPONSESENT;
        responses.push({
          timeStamp: auction.timeStamp,
          adUnit: bid.adUnit,
          bidder: bid.bidder,
          width: bid.width,
          height: bid.height,
          cpm: bid.cpm,
          ttr: bid.ttr,
          IsBid: bid.isBid
        });
      }
    });
  });
  return responses;
}

function getWins() {
  var wins = [];
  Object.keys(cache.auctions).forEach(function (auctionId) {
    Object.keys(cache.auctions[auctionId].bids).forEach(function (bidId) {
      var auction = cache.auctions[auctionId];
      var bid = auction.bids[bidId];

      if (!(bid.sendStatus & WINSENT) && bid.won) {
        bid.sendStatus |= WINSENT;
        wins.push({
          timeStamp: auction.timeStamp,
          adUnit: bid.adUnit,
          bidder: bid.bidder,
          width: bid.width,
          height: bid.height,
          cpm: bid.cpm
        });
      }
    });
  });
  return wins;
}

function getTimeouts() {
  var timeouts = [];
  Object.keys(cache.auctions).forEach(function (auctionId) {
    Object.keys(cache.auctions[auctionId].bids).forEach(function (bidId) {
      var auction = cache.auctions[auctionId];
      var bid = auction.bids[bidId];

      if (!(bid.sendStatus & TIMEOUTSENT) && bid.timeout) {
        bid.sendStatus |= TIMEOUTSENT;
        timeouts.push({
          bidder: bid.bidder,
          adUnit: bid.adUnit,
          timeStamp: auction.timeStamp
        });
      }
    });
  });
  return timeouts;
}

function getbidAdUnits() {
  var bidAdUnits = [];
  Object.keys(cache.bidAdUnits).forEach(function (adUnit) {
    var bidAdUnit = cache.bidAdUnits[adUnit];

    if (!bidAdUnit.sent) {
      bidAdUnit.sent = 1;
      bidAdUnits.push({
        adUnit: adUnit,
        timeStamp: bidAdUnit.timeStamp
      });
    }
  });
  return bidAdUnits;
}

__WEBPACK_IMPORTED_MODULE_4__src_adapterManager__["default"].registerAnalyticsAdapter({
  adapter: livewrappedAnalyticsAdapter,
  code: 'livewrapped'
});
/* harmony default export */ __webpack_exports__["default"] = (livewrappedAnalyticsAdapter);

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

},[391]);