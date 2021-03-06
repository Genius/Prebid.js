pbjsChunk([10],{

/***/ 562:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(563);


/***/ }),

/***/ 563:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_library_fn_array_includes__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_library_fn_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_library_fn_array_includes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_AnalyticsAdapter__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_constants_json__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__src_constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_adapterManager__ = __webpack_require__(7);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* Sigmoid Analytics Adapter for prebid.js v1.1.0-pre
Updated : 2018-03-28 */





var utils = __webpack_require__(0);

var url = 'https://kinesis.us-east-1.amazonaws.com/';
var analyticsType = 'endpoint';
var auctionInitConst = __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.AUCTION_INIT;
var auctionEndConst = __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.AUCTION_END;
var bidWonConst = __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.BID_WON;
var bidRequestConst = __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.BID_REQUESTED;
var bidAdjustmentConst = __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.BID_ADJUSTMENT;
var bidResponseConst = __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.BID_RESPONSE;
var initOptions = {
  publisherIds: [],
  utmTagData: [],
  adUnits: []
};
var bidWon = {
  options: {},
  events: []
};
var eventStack = {
  options: {},
  events: []
};
var auctionStatus = 'not_started';
var localStoragePrefix = 'sigmoid_analytics_';
var utmTags = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
var utmTimeoutKey = 'utm_timeout';
var utmTimeout = 60 * 60 * 1000;
var sessionTimeout = 60 * 60 * 1000;
var sessionIdStorageKey = 'session_id';
var sessionTimeoutKey = 'session_timeout';

function getParameterByName(param) {
  var vars = {};
  window.location.href.replace(location.hash, '').replace(/[?&]+([^=&]+)=?([^&]*)?/gi, function (m, key, value) {
    vars[key] = value !== undefined ? value : '';
  });
  return vars[param] ? vars[param] : '';
}

function buildSessionIdLocalStorageKey() {
  return localStoragePrefix.concat(sessionIdStorageKey);
}

function buildSessionIdTimeoutLocalStorageKey() {
  return localStoragePrefix.concat(sessionTimeoutKey);
}

function updateSessionId() {
  if (isSessionIdTimeoutExpired()) {
    var newSessionId = utils.generateUUID();
    localStorage.setItem(buildSessionIdLocalStorageKey(), newSessionId);
  }

  initOptions.sessionId = getSessionId();
  updateSessionIdTimeout();
}

function updateSessionIdTimeout() {
  localStorage.setItem(buildSessionIdTimeoutLocalStorageKey(), Date.now());
}

function isSessionIdTimeoutExpired() {
  var cpmSessionTimestamp = localStorage.getItem(buildSessionIdTimeoutLocalStorageKey());
  return Date.now() - cpmSessionTimestamp > sessionTimeout;
}

function getSessionId() {
  return localStorage.getItem(buildSessionIdLocalStorageKey()) ? localStorage.getItem(buildSessionIdLocalStorageKey()) : '';
}

function updateUtmTimeout() {
  localStorage.setItem(buildUtmLocalStorageTimeoutKey(), Date.now());
}

function isUtmTimeoutExpired() {
  var utmTimestamp = localStorage.getItem(buildUtmLocalStorageTimeoutKey());
  return Date.now() - utmTimestamp > utmTimeout;
}

function buildUtmLocalStorageTimeoutKey() {
  return localStoragePrefix.concat(utmTimeoutKey);
}

function buildUtmLocalStorageKey(utmMarkKey) {
  return localStoragePrefix.concat(utmMarkKey);
}

function checkOptions() {
  if (typeof initOptions.publisherIds === 'undefined') {
    return false;
  }

  return initOptions.publisherIds.length > 0;
}

function checkAdUnitConfig() {
  if (typeof initOptions.adUnits === 'undefined') {
    return false;
  }

  return initOptions.adUnits.length > 0;
}

function buildBidWon(eventType, args) {
  bidWon.options = initOptions;

  if (checkAdUnitConfig()) {
    if (__WEBPACK_IMPORTED_MODULE_0_core_js_library_fn_array_includes___default()(initOptions.adUnits, args.adUnitCode)) {
      bidWon.events = [{
        args: args,
        eventType: eventType
      }];
    }
  } else {
    bidWon.events = [{
      args: args,
      eventType: eventType
    }];
  }
}

function buildEventStack() {
  eventStack.options = initOptions;
}

function filterBidsByAdUnit(bids) {
  var filteredBids = [];
  bids.forEach(function (bid) {
    if (__WEBPACK_IMPORTED_MODULE_0_core_js_library_fn_array_includes___default()(initOptions.adUnits, bid.placementCode)) {
      filteredBids.push(bid);
    }
  });
  return filteredBids;
}

function isValidEvent(eventType, adUnitCode) {
  if (checkAdUnitConfig()) {
    var validationEvents = [bidAdjustmentConst, bidResponseConst, bidWonConst];

    if (!__WEBPACK_IMPORTED_MODULE_0_core_js_library_fn_array_includes___default()(initOptions.adUnits, adUnitCode) && __WEBPACK_IMPORTED_MODULE_0_core_js_library_fn_array_includes___default()(validationEvents, eventType)) {
      return false;
    }
  }

  return true;
}

function isValidEventStack() {
  if (eventStack.events.length > 0) {
    return eventStack.events.some(function (event) {
      return bidRequestConst === event.eventType || bidWonConst === event.eventType;
    });
  }

  return false;
}

function isValidBidWon() {
  return bidWon.events.length > 0;
}

function flushEventStack() {
  eventStack.events = [];
}

var sigmoidAdapter = _extends(Object(__WEBPACK_IMPORTED_MODULE_1__src_AnalyticsAdapter__["a" /* default */])({
  url: url,
  analyticsType: analyticsType
}), {
  track: function track(_ref) {
    var eventType = _ref.eventType,
        args = _ref.args;

    if (!checkOptions()) {
      return;
    }

    var info = _extends({}, args);

    if (info && info.ad) {
      info.ad = '';
    }

    if (eventType === auctionInitConst) {
      auctionStatus = 'started';
    }

    if (eventType === bidWonConst && auctionStatus === 'not_started') {
      updateSessionId();
      buildBidWon(eventType, info);

      if (isValidBidWon()) {
        send(eventType, bidWon, 'bidWon');
      }

      return;
    }

    if (eventType === auctionEndConst) {
      updateSessionId();
      buildEventStack();

      if (isValidEventStack()) {
        send(eventType, eventStack, 'eventStack');
      }

      auctionStatus = 'not_started';
    } else {
      pushEvent(eventType, info);
    }
  }
});

sigmoidAdapter.originEnableAnalytics = sigmoidAdapter.enableAnalytics;

sigmoidAdapter.enableAnalytics = function (config) {
  initOptions = config.options;
  initOptions.utmTagData = this.buildUtmTagData();
  utils.logInfo('Sigmoid Analytics enabled with config', initOptions);
  sigmoidAdapter.originEnableAnalytics(config);
};

sigmoidAdapter.buildUtmTagData = function () {
  var utmTagData = {};
  var utmTagsDetected = false;
  utmTags.forEach(function (utmTagKey) {
    var utmTagValue = getParameterByName(utmTagKey);

    if (utmTagValue !== '') {
      utmTagsDetected = true;
    }

    utmTagData[utmTagKey] = utmTagValue;
  });
  utmTags.forEach(function (utmTagKey) {
    if (utmTagsDetected) {
      localStorage.setItem(buildUtmLocalStorageKey(utmTagKey), utmTagData[utmTagKey]);
      updateUtmTimeout();
    } else {
      if (!isUtmTimeoutExpired()) {
        utmTagData[utmTagKey] = localStorage.getItem(buildUtmLocalStorageKey(utmTagKey)) ? localStorage.getItem(buildUtmLocalStorageKey(utmTagKey)) : '';
        updateUtmTimeout();
      }
    }
  });
  return utmTagData;
};

function send(eventType, data, sendDataType) {
  AWS.config.credentials = new AWS.Credentials({
    accessKeyId: 'accesskey',
    secretAccessKey: 'secretkey'
  });
  AWS.config.region = 'us-east-1';
  AWS.config.credentials.get(function (err) {
    // attach event listener
    if (err) {
      utils.logError(err);
      return;
    } // create kinesis service object


    var kinesis = new AWS.Kinesis({
      apiVersion: '2013-12-02'
    });
    var dataList = [];
    var jsonData = {};
    jsonData['Data'] = JSON.stringify(data) + '\n';
    jsonData['PartitionKey'] = 'partition-' + Math.random().toString(36).substring(7);
    dataList.push(jsonData);
    kinesis.putRecords({
      Records: dataList,
      StreamName: 'sample-stream'
    });

    if (sendDataType === 'eventStack') {
      flushEventStack();
    }
  });
}

;

function pushEvent(eventType, args) {
  if (eventType === bidRequestConst) {
    if (checkAdUnitConfig()) {
      args.bids = filterBidsByAdUnit(args.bids);
    }

    if (args.bids.length > 0) {
      eventStack.events.push({
        eventType: eventType,
        args: args
      });
    }
  } else {
    if (isValidEvent(eventType, args.adUnitCode)) {
      eventStack.events.push({
        eventType: eventType,
        args: args
      });
    }
  }
}

__WEBPACK_IMPORTED_MODULE_3__src_adapterManager__["default"].registerAnalyticsAdapter({
  adapter: sigmoidAdapter,
  code: 'sigmoid'
});
/* harmony default export */ __webpack_exports__["default"] = (sigmoidAdapter);

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

},[562]);