pbjsChunk([8],{

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

/***/ 718:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(719);


/***/ }),

/***/ 719:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapterManager_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_constants_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__src_constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }









var ajax = Object(__WEBPACK_IMPORTED_MODULE_3__src_ajax_js__["b" /* ajaxBuilder */])(0);
var _CONSTANTS$EVENTS = __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS,
    AUCTION_END = _CONSTANTS$EVENTS.AUCTION_END,
    BID_REQUESTED = _CONSTANTS$EVENTS.BID_REQUESTED,
    BID_ADJUSTMENT = _CONSTANTS$EVENTS.BID_ADJUSTMENT,
    BID_RESPONSE = _CONSTANTS$EVENTS.BID_RESPONSE,
    BID_WON = _CONSTANTS$EVENTS.BID_WON;
var pbaUrl = 'https://pba.aws.lijit.com/analytics';
var currentAuctions = {};
var analyticsType = 'endpoint';

var getClosestTop = function getClosestTop() {
  var topFrame = window;
  var err = false;

  try {
    while (topFrame.parent.document !== topFrame.document) {
      if (topFrame.parent.document) {
        topFrame = topFrame.parent;
      } else {
        throw new Error();
      }
    }
  } catch (e) {// bException = true;
  }

  return {
    topFrame: topFrame,
    err: err
  };
};

var getBestPageUrl = function getBestPageUrl(_ref) {
  var crossDomainError = _ref.err,
      topFrame = _ref.topFrame;
  var sBestPageUrl = '';

  if (!crossDomainError) {
    // easy case- we can get top frame location
    sBestPageUrl = topFrame.location.href;
  } else {
    try {
      try {
        sBestPageUrl = window.top.location.href;
      } catch (e) {
        var aOrigins = window.location.ancestorOrigins;
        sBestPageUrl = aOrigins[aOrigins.length - 1];
      }
    } catch (e) {
      sBestPageUrl = topFrame.document.referrer;
    }
  }

  return sBestPageUrl;
};

var rootURL = getBestPageUrl(getClosestTop());

var sovrnAnalyticsAdapter = _extends(Object(__WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter_js__["a" /* default */])({
  url: pbaUrl,
  analyticsType: analyticsType
}), {
  track: function track(_ref2) {
    var eventType = _ref2.eventType,
        args = _ref2.args;

    try {
      if (eventType === BID_WON) {
        new BidWinner(this.sovrnId, args).send();
        return;
      }

      if (args && args.auctionId && currentAuctions[args.auctionId] && currentAuctions[args.auctionId].status === 'complete') {
        throw new Error('Event Received after Auction Close Auction Id ' + args.auctionId);
      }

      if (args && args.auctionId && currentAuctions[args.auctionId] === undefined) {
        currentAuctions[args.auctionId] = new AuctionData(this.sovrnId, args.auctionId);
      }

      switch (eventType) {
        case BID_REQUESTED:
          currentAuctions[args.auctionId].bidRequested(args);
          break;

        case BID_ADJUSTMENT:
          currentAuctions[args.auctionId].originalBid(args);
          break;

        case BID_RESPONSE:
          currentAuctions[args.auctionId].adjustedBid(args);
          break;

        case AUCTION_END:
          currentAuctions[args.auctionId].send();
          break;
      }
    } catch (e) {
      new LogError(e, this.sovrnId, {
        eventType: eventType,
        args: args
      }).send();
    }
  }
});

sovrnAnalyticsAdapter.getAuctions = function () {
  return currentAuctions;
};

sovrnAnalyticsAdapter.originEnableAnalytics = sovrnAnalyticsAdapter.enableAnalytics; // override enableAnalytics so we can get access to the config passed in from the page

sovrnAnalyticsAdapter.enableAnalytics = function (config) {
  var sovrnId = '';

  if (config && config.options && (config.options.sovrnId || config.options.affiliateId)) {
    sovrnId = config.options.sovrnId || config.options.affiliateId;
  } else {
    __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logError"]('Need Sovrn Id to log auction results. Please contact a Sovrn representative if you do not know your Sovrn Id.');
    return;
  }

  sovrnAnalyticsAdapter.sovrnId = sovrnId;

  if (config.options.pbaUrl) {
    pbaUrl = config.options.pbaUrl;
  }

  sovrnAnalyticsAdapter.originEnableAnalytics(config); // call the base class function
};

__WEBPACK_IMPORTED_MODULE_1__src_adapterManager_js__["default"].registerAnalyticsAdapter({
  adapter: sovrnAnalyticsAdapter,
  code: 'sovrn'
});
/** Class Representing a Winning Bid */

var BidWinner = /*#__PURE__*/function () {
  /**
   * Creates a new bid winner
   * @param {string} sovrnId - the affiliate id from the analytics config
   * @param {*} event - the args object from the auction event
   */
  function BidWinner(sovrnId, event) {
    _classCallCheck(this, BidWinner);

    this.body = {}; // eslint-disable-next-line no-undef

    this.body.prebidVersion = "Genius_prebid_4.2.0";
    this.body.sovrnId = sovrnId;
    this.body.winningBid = JSON.parse(JSON.stringify(event));
    this.body.url = rootURL;
    this.body.payload = 'winner';
    delete this.body.winningBid.ad;
  }
  /**
   * Sends the auction to the the ingest server
   */


  _createClass(BidWinner, [{
    key: "send",
    value: function send() {
      this.body.ts = __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["timestamp"]();
      ajax(pbaUrl, null, JSON.stringify(this.body), {
        contentType: 'application/json',
        method: 'POST'
      });
    }
  }]);

  return BidWinner;
}();
/** Class representing an Auction */


var AuctionData = /*#__PURE__*/function () {
  /**
   * Create a new auction data collector
   * @param {string} sovrnId - the affiliate id from the analytics config
   * @param {string} auctionId - the auction id from the auction event
   */
  function AuctionData(sovrnId, auctionId) {
    _classCallCheck(this, AuctionData);

    this.auction = {}; // eslint-disable-next-line no-undef

    this.auction.prebidVersion = "Genius_prebid_4.2.0";
    this.auction.sovrnId = sovrnId;
    this.auction.auctionId = auctionId;
    this.auction.payload = 'auction';
    this.auction.timeouts = {
      buffer: __WEBPACK_IMPORTED_MODULE_5__src_config_js__["b" /* config */].getConfig('timeoutBuffer'),
      bidder: __WEBPACK_IMPORTED_MODULE_5__src_config_js__["b" /* config */].getConfig('bidderTimeout')
    };
    this.auction.priceGranularity = __WEBPACK_IMPORTED_MODULE_5__src_config_js__["b" /* config */].getConfig('priceGranularity');
    this.auction.url = rootURL;
    this.auction.requests = [];
    this.auction.unsynced = [];
    this.dropBidFields = ['auctionId', 'ad', 'requestId', 'bidderCode'];
    setTimeout(function (id) {
      delete currentAuctions[id];
    }, 300000, this.auction.auctionId);
  }
  /**
   * Record a bid request event
   * @param {*} event - the args object from the auction event
   */


  _createClass(AuctionData, [{
    key: "bidRequested",
    value: function bidRequested(event) {
      var eventCopy = JSON.parse(JSON.stringify(event));
      delete eventCopy.doneCbCallCount;
      delete eventCopy.auctionId;
      this.auction.requests.push(eventCopy);
    }
    /**
     * Finds the bid from the auction that the event is associated with
     * @param {*} event - the args object from the auction event
     * @return {*} - the bid
     */

  }, {
    key: "findBid",
    value: function findBid(event) {
      var bidder = __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js___default()(this.auction.requests, function (r) {
        return r.bidderCode === event.bidderCode;
      });

      if (!bidder) {
        this.auction.unsynced.push(JSON.parse(JSON.stringify(event)));
      }

      var bid = __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js___default()(bidder.bids, function (b) {
        return b.bidId === event.requestId;
      });

      if (!bid) {
        event.unmatched = true;
        bidder.bids.push(JSON.parse(JSON.stringify(event)));
      }

      return bid;
    }
    /**
     * Records the original bid before any adjustments have been made
     * @param {*} event - the args object from the auction event
     * NOTE: the bid adjustment occurs before the bid response
     * the bid adjustment seems to be the bid ready to be adjusted
     */

  }, {
    key: "originalBid",
    value: function originalBid(event) {
      var bid = this.findBid(event);

      if (bid) {
        _extends(bid, JSON.parse(JSON.stringify(event)));

        this.dropBidFields.forEach(function (f) {
          return delete bid[f];
        });
      }
    }
    /**
     * Replaces original values with adjusted values and records the original values for changed values
     * in bid.originalValues
     * @param {*} event - the args object from the auction event
     */

  }, {
    key: "adjustedBid",
    value: function adjustedBid(event) {
      var _this = this;

      var bid = this.findBid(event);

      if (bid) {
        bid.originalValues = Object.keys(event).reduce(function (o, k) {
          if (JSON.stringify(bid[k]) !== JSON.stringify(event[k]) && !__WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js___default()(_this.dropBidFields, k)) {
            o[k] = bid[k];
            bid[k] = event[k];
          }

          return o;
        }, {});
      }
    }
    /**
     * Sends the auction to the the ingest server
     */

  }, {
    key: "send",
    value: function send() {
      var _this2 = this;

      var maxBids = {};
      this.auction.requests.forEach(function (request) {
        request.bids.forEach(function (bid) {
          maxBids[bid.adUnitCode] = maxBids[bid.adUnitCode] || {
            cpm: 0
          };

          if (bid.cpm > maxBids[bid.adUnitCode].cpm) {
            maxBids[bid.adUnitCode] = bid;
          }
        });
      });
      Object.keys(maxBids).forEach(function (unit) {
        maxBids[unit].isAuctionWinner = true;
      });
      this.auction.ts = __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["timestamp"]();
      ajax(pbaUrl, function () {
        currentAuctions[_this2.auction.auctionId] = {
          status: 'complete',
          auctionId: _this2.auction.auctionId
        };
      }, JSON.stringify(this.auction), {
        contentType: 'application/json',
        method: 'POST'
      });
    }
  }]);

  return AuctionData;
}();

var LogError = /*#__PURE__*/function () {
  function LogError(e, sovrnId, data) {
    _classCallCheck(this, LogError);

    this.error = {};
    this.error.payload = 'error';
    this.error.message = e.message;
    this.error.stack = e.stack;
    this.error.data = data; // eslint-disable-next-line no-undef

    this.error.prebidVersion = "Genius_prebid_4.2.0";
    this.error.sovrnId = sovrnId;
    this.error.url = rootURL;
    this.error.userAgent = navigator.userAgent;
  }

  _createClass(LogError, [{
    key: "send",
    value: function send() {
      if (this.error.data && this.error.data.requests) {
        this.error.data.requests.forEach(function (request) {
          if (request.bids) {
            request.bids.forEach(function (bid) {
              if (bid.ad) {
                delete bid.ad;
              }
            });
          }
        });
      }

      if (ErrorEvent.data && this.error.data.ad) {
        delete this.error.data.ad;
      }

      this.error.ts = __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["timestamp"]();
      ajax(pbaUrl, null, JSON.stringify(this.error), {
        contentType: 'application/json',
        method: 'POST'
      });
    }
  }]);

  return LogError;
}();

/* harmony default export */ __webpack_exports__["default"] = (sovrnAnalyticsAdapter);

/***/ })

},[718]);