pbjsChunk([38],{

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(111);


/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storage", function() { return storage; });
/* harmony export (immutable) */ __webpack_exports__["getUmtSource"] = getUmtSource;
/* harmony export (immutable) */ __webpack_exports__["ExpiringQueue"] = ExpiringQueue;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_constants_json__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__src_constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapterManager__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_url__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_ajax__ = __webpack_require__(5);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }







var ANALYTICS_VERSION = '1.0.0';
var DEFAULT_QUEUE_TIMEOUT = 4000;
var DEFAULT_HOST = 'tag.adkernel.com';
var ADK_HB_EVENTS = {
  AUCTION_INIT: 'auctionInit',
  BID_REQUEST: 'bidRequested',
  BID_RESPONSE: 'bidResponse',
  BID_WON: 'bidWon',
  AUCTION_END: 'auctionEnd',
  TIMEOUT: 'adapterTimedOut'
};

function buildRequestTemplate(pubId) {
  var url = __WEBPACK_IMPORTED_MODULE_4__src_utils__["getTopWindowUrl"]();
  var ref = __WEBPACK_IMPORTED_MODULE_4__src_utils__["getTopWindowReferrer"]();
  var topLocation = __WEBPACK_IMPORTED_MODULE_4__src_utils__["getTopWindowLocation"]();
  return {
    ver: ANALYTICS_VERSION,
    domain: topLocation.hostname,
    path: topLocation.pathname,
    accId: pubId,
    env: {
      screen: {
        w: window.screen.width,
        h: window.screen.height
      },
      lang: navigator.language
    },
    src: getUmtSource(url, ref)
  };
}

var analyticsAdapter = _extends(Object(__WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter__["a" /* default */])({
  analyticsType: 'endpoint'
}), {
  track: function track(_ref) {
    var eventType = _ref.eventType,
        args = _ref.args;

    if (!analyticsAdapter.context) {
      return;
    }

    var handler = null;

    switch (eventType) {
      case __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default.a.EVENTS.AUCTION_INIT:
        if (analyticsAdapter.context.queue) {
          analyticsAdapter.context.queue.init();
        }

        handler = trackAuctionInit;
        break;

      case __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default.a.EVENTS.BID_REQUESTED:
        handler = trackBidRequest;
        break;

      case __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default.a.EVENTS.BID_RESPONSE:
        handler = trackBidResponse;
        break;

      case __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default.a.EVENTS.BID_WON:
        handler = trackBidWon;
        break;

      case __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default.a.EVENTS.BID_TIMEOUT:
        handler = trackBidTimeout;
        break;

      case __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default.a.EVENTS.AUCTION_END:
        handler = trackAuctionEnd;
        break;
    }

    if (handler) {
      var events = handler(args);

      if (analyticsAdapter.context.queue) {
        analyticsAdapter.context.queue.push(events);
      }

      if (eventType === __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default.a.EVENTS.AUCTION_END) {
        sendAll();
      }
    }
  }
});

analyticsAdapter.context = {};
analyticsAdapter.originEnableAnalytics = analyticsAdapter.enableAnalytics;

analyticsAdapter.enableAnalytics = function (config) {
  if (!config.options.pubId) {
    __WEBPACK_IMPORTED_MODULE_4__src_utils__["logError"]('PubId is not defined. Analytics won\'t work');
    return;
  }

  analyticsAdapter.context = {
    host: config.options.host || DEFAULT_HOST,
    pubId: config.options.pubId,
    requestTemplate: buildRequestTemplate(config.options.pubId),
    queue: new ExpiringQueue(sendAll, config.options.queueTimeout || DEFAULT_QUEUE_TIMEOUT)
  };
  analyticsAdapter.originEnableAnalytics(config);
};

__WEBPACK_IMPORTED_MODULE_2__src_adapterManager__["default"].registerAnalyticsAdapter({
  adapter: analyticsAdapter,
  code: 'adkernelAdn'
});
/* harmony default export */ __webpack_exports__["default"] = (analyticsAdapter);

function sendAll() {
  var events = analyticsAdapter.context.queue.popAll();

  if (events.length !== 0) {
    var req = _extends({}, analyticsAdapter.context.requestTemplate, {
      hb_ev: events
    });

    analyticsAdapter.ajaxCall(JSON.stringify(req));
  }
}

analyticsAdapter.ajaxCall = function ajaxCall(data) {
  Object(__WEBPACK_IMPORTED_MODULE_5__src_ajax__["a" /* ajax */])("//".concat(analyticsAdapter.context.host, "/hb-analytics"), function () {}, data);
};

function trackAuctionInit() {
  analyticsAdapter.context.auctionTimeStart = Date.now();
  var event = createHbEvent(undefined, ADK_HB_EVENTS.AUCTION_INIT);
  return [event];
}

function trackBidRequest(args) {
  return args.bids.map(function (bid) {
    return createHbEvent(args.bidderCode, ADK_HB_EVENTS.BID_REQUEST, bid.adUnitCode);
  });
}

function trackBidResponse(args) {
  var event = createHbEvent(args.bidderCode, ADK_HB_EVENTS.BID_RESPONSE, args.adUnitCode, args.cpm, args.timeToRespond / 1000);
  return [event];
}

function trackBidWon(args) {
  var event = createHbEvent(args.bidderCode, ADK_HB_EVENTS.BID_WON, args.adUnitCode, args.cpm);
  return [event];
}

function trackAuctionEnd(args) {
  var event = createHbEvent(undefined, ADK_HB_EVENTS.AUCTION_END, undefined, undefined, (Date.now() - analyticsAdapter.context.auctionTimeStart) / 1000);
  return [event];
}

function trackBidTimeout(args) {
  return args.map(function (bidderName) {
    return createHbEvent(bidderName, ADK_HB_EVENTS.TIMEOUT);
  });
}

function createHbEvent(adapter, event) {
  var tagid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var time = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var ev = {
    event: event
  };

  if (adapter) {
    ev.adapter = adapter;
  }

  if (tagid) {
    ev.tagid = tagid;
  }

  if (value) {
    ev.val = value;
  }

  if (time) {
    ev.time = time;
  }

  return ev;
}

var UTM_TAGS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_c1', 'utm_c2', 'utm_c3', 'utm_c4', 'utm_c5'];
var ADKERNEL_PREBID_KEY = 'adk_dpt_analytics';
var DIRECT = '(direct)';
var REFERRAL = '(referral)';
var ORGANIC = '(organic)';
var storage = {
  getItem: function getItem(name) {
    return localStorage.getItem(name);
  },
  setItem: function setItem(name, value) {
    localStorage.setItem(name, value);
  }
};
function getUmtSource(pageUrl, referrer) {
  var prevUtm = getPreviousTrafficSource();
  var currUtm = getCurrentTrafficSource(pageUrl, referrer);

  var _chooseActualUtm = chooseActualUtm(prevUtm, currUtm),
      _chooseActualUtm2 = _slicedToArray(_chooseActualUtm, 2),
      updated = _chooseActualUtm2[0],
      actual = _chooseActualUtm2[1];

  if (updated) {
    storeUtm(actual);
  }

  return actual;

  function getPreviousTrafficSource() {
    var val = storage.getItem(ADKERNEL_PREBID_KEY);

    if (!val) {
      return getDirect();
    }

    return JSON.parse(val);
  }

  function getCurrentTrafficSource(pageUrl, referrer) {
    var source = getUTM(pageUrl);

    if (source) {
      return source;
    }

    if (referrer) {
      var se = getSearchEngine(referrer);

      if (se) {
        return asUtm(se, ORGANIC, ORGANIC);
      }

      var parsedUrl = Object(__WEBPACK_IMPORTED_MODULE_3__src_url__["c" /* parse */])(pageUrl);

      var _getReferrer = getReferrer(referrer),
          _getReferrer2 = _slicedToArray(_getReferrer, 2),
          refHost = _getReferrer2[0],
          refPath = _getReferrer2[1];

      if (refHost && refHost !== parsedUrl.hostname) {
        return asUtm(refHost, REFERRAL, REFERRAL, '', refPath);
      }
    }

    return getDirect();
  }

  function getSearchEngine(pageUrl) {
    var engines = {
      'google': /^https?\:\/\/(?:www\.)?(?:google\.(?:com?\.)?(?:com|cat|[a-z]{2})|g.cn)\//i,
      'yandex': /^https?\:\/\/(?:www\.)?ya(?:ndex\.(?:com|net)?\.?(?:asia|mobi|org|[a-z]{2})?|\.ru)\//i,
      'bing': /^https?\:\/\/(?:www\.)?bing\.com\//i,
      'duckduckgo': /^https?\:\/\/(?:www\.)?duckduckgo\.com\//i,
      'ask': /^https?\:\/\/(?:www\.)?ask\.com\//i,
      'yahoo': /^https?\:\/\/(?:[-a-z]+\.)?(?:search\.)?yahoo\.com\//i
    };

    for (var engine in engines) {
      if (engines.hasOwnProperty(engine) && engines[engine].test(pageUrl)) {
        return engine;
      }
    }
  }

  function getReferrer(referrer) {
    var ref = Object(__WEBPACK_IMPORTED_MODULE_3__src_url__["c" /* parse */])(referrer);
    return [ref.hostname, ref.pathname];
  }

  function getUTM(pageUrl) {
    var urlParameters = Object(__WEBPACK_IMPORTED_MODULE_3__src_url__["c" /* parse */])(pageUrl).search;

    if (!urlParameters['utm_campaign'] || !urlParameters['utm_source']) {
      return;
    }

    var utmArgs = [];

    __WEBPACK_IMPORTED_MODULE_4__src_utils__["_each"](UTM_TAGS, function (utmTagName) {
      var utmValue = urlParameters[utmTagName] || '';
      utmArgs.push(utmValue);
    });

    return asUtm.apply(this, utmArgs);
  }

  function getDirect() {
    return asUtm(DIRECT, DIRECT, DIRECT);
  }

  function storeUtm(utm) {
    var val = JSON.stringify(utm);
    storage.setItem(ADKERNEL_PREBID_KEY, val);
  }

  function asUtm(source, medium, campaign) {
    var term = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var content = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
    var c1 = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';
    var c2 = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '';
    var c3 = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : '';
    var c4 = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : '';
    var c5 = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : '';
    var result = {
      source: source,
      medium: medium,
      campaign: campaign
    };

    if (term) {
      result.term = term;
    }

    if (content) {
      result.content = content;
    }

    if (c1) {
      result.c1 = c1;
    }

    if (c2) {
      result.c2 = c2;
    }

    if (c3) {
      result.c3 = c3;
    }

    if (c4) {
      result.c4 = c4;
    }

    if (c5) {
      result.c5 = c5;
    }

    return result;
  }

  function chooseActualUtm(prev, curr) {
    if (ord(prev) < ord(curr)) {
      return [true, curr];
    }

    if (ord(prev) > ord(curr)) {
      return [false, prev];
    } else {
      if (prev.campaign === REFERRAL && prev.content !== curr.content) {
        return [true, curr];
      } else if (prev.campaign === ORGANIC && prev.source !== curr.source) {
        return [true, curr];
      } else if (isCampaignTraffic(prev) && (prev.campaign !== curr.campaign || prev.source !== curr.source)) {
        return [true, curr];
      }
    }

    return [false, prev];
  }

  function ord(utm) {
    switch (utm.campaign) {
      case DIRECT:
        return 0;

      case ORGANIC:
        return 1;

      case REFERRAL:
        return 2;

      default:
        return 3;
    }
  }

  function isCampaignTraffic(utm) {
    return [DIRECT, REFERRAL, ORGANIC].indexOf(utm.campaign) === -1;
  }
}
/**
 * Expiring queue implementation. Fires callback on elapsed timeout since last last update or creation.
 * @param callback
 * @param ttl
 * @constructor
 */

function ExpiringQueue(callback, ttl) {
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
  /**
   * For test/debug purposes only
   * @return {Array}
   */


  this.peekAll = function () {
    return queue;
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
    }, ttl);
  }
}

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

},[110]);