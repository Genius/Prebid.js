pbjsChunk([35],{

/***/ 408:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(409);


/***/ }),

/***/ 409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_AnalyticsAdapter_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_storageManager_js__ = __webpack_require__(9);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }






var storage = Object(__WEBPACK_IMPORTED_MODULE_4__src_storageManager_js__["b" /* getStorageManager */])();

var CONSTANTS = __webpack_require__(5);

var ANALYTICS_TYPE = 'endpoint';
var FINTEZA_HOST = 'https://content.mql5.com/tr';
var BID_REQUEST_TRACK = 'Bid Request %BIDDER%';
var BID_RESPONSE_PRICE_TRACK = 'Bid Response Price %BIDDER%';
var BID_RESPONSE_TIME_TRACK = 'Bid Response Time %BIDDER%';
var BID_TIMEOUT_TRACK = 'Bid Timeout %BIDDER%';
var BID_WON_TRACK = 'Bid Won %BIDDER%';
var FIRST_VISIT_DATE = '_fz_fvdt';
var SESSION_ID = '_fz_ssn';
var SESSION_DURATION = 30 * 60 * 1000;
var SESSION_RAND_PART = 9;
var TRACK_TIME_KEY = '_fz_tr';
var UNIQ_ID_KEY = '_fz_uniq';

function getPageInfo() {
  var pageInfo = {
    domain: window.location.hostname
  };

  if (document.referrer) {
    pageInfo.referrerDomain = __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["parseUrl"](document.referrer).hostname;
  }

  return pageInfo;
}

function getUniqId() {
  var cookies;

  try {
    cookies = parseCookies(document.cookie);
  } catch (a) {
    cookies = {};
  }

  var isUniqFromLS;
  var uniq = cookies[UNIQ_ID_KEY];

  if (!uniq) {
    try {
      if (storage.hasLocalStorage()) {
        uniq = storage.getDataFromLocalStorage(UNIQ_ID_KEY) || '';
        isUniqFromLS = true;
      }
    } catch (b) {}
  }

  if (uniq && isNaN(uniq)) {
    uniq = null;
  }

  if (uniq && isUniqFromLS) {
    var expires = new Date();
    expires.setFullYear(expires.getFullYear() + 10);

    try {
      storage.setCookie(UNIQ_ID_KEY, uniq, expires.toUTCString());
    } catch (e) {}
  }

  return uniq;
}

function initFirstVisit() {
  var now;
  var visitDate;
  var cookies;

  try {
    cookies = parseCookies(document.cookie);
  } catch (a) {
    cookies = {};
  }

  visitDate = cookies[FIRST_VISIT_DATE];

  if (!visitDate) {
    now = new Date();
    visitDate = parseInt(now.getTime() / 1000, 10);
    now.setFullYear(now.getFullYear() + 20);

    try {
      storage.setCookie(FIRST_VISIT_DATE, visitDate, now.toUTCString());
    } catch (e) {}
  }

  return visitDate;
}

function trim(string) {
  if (string.trim) {
    return string.trim();
  }

  return string.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}

function parseCookies(cookie) {
  var values = {};
  var arr, item;
  var param, value;
  var i, j;

  if (!cookie || !storage.cookiesAreEnabled()) {
    return {};
  }

  arr = cookie.split(';');

  for (i = 0, j = arr.length; i < j; i++) {
    item = arr[i];

    if (!item) {
      continue;
    }

    param = item.split('=');

    if (param.length <= 1) {
      continue;
    }

    value = decodeURIComponent(param[0]);
    value = trim(value);
    values[value] = decodeURIComponent(param[1]);
  }

  return values;
}

function getRandAsStr(digits) {
  var str = '';
  var rand = 0;
  var i;
  digits = digits || 4;

  for (i = 0; i < digits; i++) {
    rand = Math.random() * 10 >>> 0;
    str += '' + rand;
  }

  return str;
}

function getSessionBegin(session) {
  if (!session || typeof session !== 'string') {
    return 0;
  }

  var len = session.length;

  if (len && len <= SESSION_RAND_PART) {
    return 0;
  }

  var timestamp = session.substring(0, len - SESSION_RAND_PART);
  return parseInt(timestamp, 10);
}

function initSession() {
  var now = new Date();
  var expires = new Date(now.getTime() + SESSION_DURATION);
  var timestamp = Math.floor(now.getTime() / 1000);
  var begin = 0;
  var cookies;
  var sessionId;
  var sessionDuration;
  var isNew = false;

  try {
    cookies = parseCookies(document.cookie);
  } catch (a) {
    cookies = {};
  }

  sessionId = cookies[SESSION_ID];

  if (!sessionId || !checkSessionByExpires() || !checkSessionByReferer() || !checkSessionByDay()) {
    sessionId = '' + timestamp + getRandAsStr(SESSION_RAND_PART);
    begin = timestamp;
    isNew = true;
  } else {
    begin = getSessionBegin(sessionId);
  }

  if (begin > 0) {
    sessionDuration = Math.floor(timestamp - begin);
  } else {
    sessionDuration = -1;
  }

  try {
    storage.setCookie(SESSION_ID, sessionId, expires.toUTCString());
  } catch (e) {}

  return {
    isNew: isNew,
    id: sessionId,
    duration: sessionDuration
  };
}

function checkSessionByExpires() {
  var timestamp = getTrackRequestLastTime();
  var now = new Date().getTime();

  if (now > timestamp + SESSION_DURATION) {
    return false;
  }

  return true;
}

function checkSessionByReferer() {
  var referrer = fntzAnalyticsAdapter.context.pageInfo.referrerDomain;
  var domain = fntzAnalyticsAdapter.context.pageInfo.domain;
  return referrer === '' || domain === referrer;
}

function checkSessionByDay() {
  var last = getTrackRequestLastTime();

  if (last) {
    last = new Date(last);
    var now = new Date();
    return last.getUTCDate() === now.getUTCDate() && last.getUTCMonth() === now.getUTCMonth() && last.getUTCFullYear() === now.getUTCFullYear();
  }

  return false;
}

function saveTrackRequestTime() {
  var now = new Date().getTime();
  var expires = new Date(now + SESSION_DURATION);

  try {
    if (storage.hasLocalStorage()) {
      storage.setDataInLocalStorage(TRACK_TIME_KEY, now.toString());
    } else {
      storage.setCookie(TRACK_TIME_KEY, now.toString(), expires.toUTCString());
    }
  } catch (a) {}
}

function getTrackRequestLastTime() {
  var cookie;

  try {
    if (storage.hasLocalStorage()) {
      return parseInt(storage.getDataFromLocalStorage(TRACK_TIME_KEY) || 0, 10);
    }

    cookie = parseCookies(document.cookie);
    cookie = cookie[TRACK_TIME_KEY];

    if (cookie) {
      return parseInt(cookie, 10);
    }
  } catch (e) {}

  return 0;
}

function getAntiCacheParam() {
  var date = new Date();
  var rand = Math.random() * 99999 + 1 >>> 0;
  return [date.getTime(), rand].join('');
}

function replaceBidder(str, bidder) {
  var _str = str;
  _str = _str.replace(/\%bidder\%/, bidder.toLowerCase());
  _str = _str.replace(/\%BIDDER\%/, bidder.toUpperCase());
  _str = _str.replace(/\%Bidder\%/, bidder.charAt(0).toUpperCase() + bidder.slice(1).toLowerCase());
  return _str;
}

function prepareBidRequestedParams(args) {
  return [{
    event: encodeURIComponent(replaceBidder(fntzAnalyticsAdapter.context.bidRequestTrack, args.bidderCode)),
    ref: encodeURIComponent(window.location.href)
  }];
}

function prepareBidResponseParams(args) {
  return [{
    event: encodeURIComponent(replaceBidder(fntzAnalyticsAdapter.context.bidResponsePriceTrack, args.bidderCode)),
    value: args.cpm,
    unit: 'usd'
  }, {
    event: encodeURIComponent(replaceBidder(fntzAnalyticsAdapter.context.bidResponseTimeTrack, args.bidderCode)),
    value: args.timeToRespond,
    unit: 'ms'
  }];
}

function prepareBidWonParams(args) {
  return [{
    event: encodeURIComponent(replaceBidder(fntzAnalyticsAdapter.context.bidWonTrack, args.bidderCode)),
    value: args.cpm,
    unit: 'usd'
  }];
}

function prepareBidTimeoutParams(args) {
  return args.map(function (bid) {
    return {
      event: encodeURIComponent(replaceBidder(fntzAnalyticsAdapter.context.bidTimeoutTrack, bid.bidder)),
      value: bid.timeout,
      unit: 'ms'
    };
  });
}

function prepareTrackData(evtype, args) {
  var prepareParams = null;

  switch (evtype) {
    case CONSTANTS.EVENTS.BID_REQUESTED:
      prepareParams = prepareBidRequestedParams;
      break;

    case CONSTANTS.EVENTS.BID_RESPONSE:
      prepareParams = prepareBidResponseParams;
      break;

    case CONSTANTS.EVENTS.BID_WON:
      prepareParams = prepareBidWonParams;
      break;

    case CONSTANTS.EVENTS.BID_TIMEOUT:
      prepareParams = prepareBidTimeoutParams;
      break;
  }

  if (!prepareParams) {
    return null;
  }

  var data = prepareParams(args);

  if (!data) {
    return null;
  }

  var session = initSession();
  return data.map(function (d) {
    var trackData = _extends(d, {
      id: fntzAnalyticsAdapter.context.id,
      ref: encodeURIComponent(window.location.href),
      title: encodeURIComponent(document.title),
      scr_res: fntzAnalyticsAdapter.context.screenResolution,
      fv_date: fntzAnalyticsAdapter.context.firstVisit,
      ac: getAntiCacheParam()
    });

    if (fntzAnalyticsAdapter.context.uniqId) {
      trackData.fz_uniq = fntzAnalyticsAdapter.context.uniqId;
    }

    if (session.id) {
      trackData.ssn = session.id;
    }

    if (session.isNew) {
      session.isNew = false;
      trackData.ssn_start = 1;
    }

    trackData.ssn_dr = session.duration;
    return trackData;
  });
}

function sendTrackRequest(trackData) {
  try {
    Object(__WEBPACK_IMPORTED_MODULE_0__src_ajax_js__["a" /* ajax */])(fntzAnalyticsAdapter.context.host, null, trackData, {
      method: 'GET',
      withCredentials: true,
      contentType: 'application/x-www-form-urlencoded'
    });
    saveTrackRequestTime();
  } catch (err) {
    __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["logError"]('Error on send data: ', err);
  }
}

var fntzAnalyticsAdapter = _extends(Object(__WEBPACK_IMPORTED_MODULE_1__src_AnalyticsAdapter_js__["a" /* default */])({
  FINTEZA_HOST: FINTEZA_HOST,
  ANALYTICS_TYPE: ANALYTICS_TYPE
}), {
  track: function track(_ref) {
    var eventType = _ref.eventType,
        args = _ref.args;

    if (typeof args !== 'undefined') {
      var trackData = prepareTrackData(eventType, args);

      if (!trackData) {
        return;
      }

      trackData.forEach(sendTrackRequest);
    }
  }
});

fntzAnalyticsAdapter.originEnableAnalytics = fntzAnalyticsAdapter.enableAnalytics;

fntzAnalyticsAdapter.enableAnalytics = function (config) {
  if (!config.options.id) {
    __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["logError"]('Client ID (id) option is not defined. Analytics won\'t work');
    return;
  }

  fntzAnalyticsAdapter.context = {
    host: config.options.host || FINTEZA_HOST,
    id: config.options.id,
    bidRequestTrack: config.options.bidRequestTrack || BID_REQUEST_TRACK,
    bidResponsePriceTrack: config.options.bidResponsePriceTrack || BID_RESPONSE_PRICE_TRACK,
    bidResponseTimeTrack: config.options.bidResponseTimeTrack || BID_RESPONSE_TIME_TRACK,
    bidTimeoutTrack: config.options.bidTimeoutTrack || BID_TIMEOUT_TRACK,
    bidWonTrack: config.options.bidWonTrack || BID_WON_TRACK,
    firstVisit: initFirstVisit(),
    screenResolution: "".concat(window.screen.width, "x").concat(window.screen.height),
    uniqId: getUniqId(),
    pageInfo: getPageInfo()
  };
  fntzAnalyticsAdapter.originEnableAnalytics(config);
};

__WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__["default"].registerAnalyticsAdapter({
  adapter: fntzAnalyticsAdapter,
  code: 'finteza'
});
/* harmony default export */ __webpack_exports__["default"] = (fntzAnalyticsAdapter);

/***/ }),

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

/***/ })

},[408]);