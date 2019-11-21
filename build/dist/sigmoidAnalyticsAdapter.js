pbjsChunk([1],{

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports['default'] = AnalyticsAdapter;

var _constants = __webpack_require__(3);

var _constants2 = _interopRequireDefault(_constants);

var _adloader = __webpack_require__(5);

var _ajax = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var events = __webpack_require__(11);
var utils = __webpack_require__(0);

var AUCTION_INIT = _constants2['default'].EVENTS.AUCTION_INIT;
var AUCTION_END = _constants2['default'].EVENTS.AUCTION_END;
var BID_REQUESTED = _constants2['default'].EVENTS.BID_REQUESTED;
var BID_TIMEOUT = _constants2['default'].EVENTS.BID_TIMEOUT;
var BID_RESPONSE = _constants2['default'].EVENTS.BID_RESPONSE;
var BID_WON = _constants2['default'].EVENTS.BID_WON;
var BID_ADJUSTMENT = _constants2['default'].EVENTS.BID_ADJUSTMENT;
var SET_TARGETING = _constants2['default'].EVENTS.SET_TARGETING;

var LIBRARY = 'library';
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

  if (analyticsType === LIBRARY) {
    (0, _adloader.loadScript)(url, _emptyQueue);
  }

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

    if (this.getAdapterType() === LIBRARY || BUNDLE) {
      window[global](handler, eventType, args);
    }

    if (this.getAdapterType() === ENDPOINT) {
      _callEndpoint.apply(undefined, arguments);
    }
  }

  function _callEndpoint(_ref3) {
    var eventType = _ref3.eventType,
        args = _ref3.args,
        callback = _ref3.callback;

    (0, _ajax.ajax)(url, callback, JSON.stringify({ eventType: eventType, args: args }));
  }

  function _enqueue(_ref4) {
    var eventType = _ref4.eventType,
        args = _ref4.args;

    var _this = this;

    if (global && window[global] && eventType && args) {
      this.track({ eventType: eventType, args: args });
    } else {
      _queue.push((function () {
        _eventCount++;
        _this.track({ eventType: eventType, args: args });
      }));
    }
  }

  function _enable(config) {
    var _this2 = this;

    var _this = this;

    if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && _typeof(config.options) === 'object') {
      _sampled = typeof config.options.sampling === 'undefined' || Math.random() < parseFloat(config.options.sampling);
    } else {
      _sampled = true;
    }

    if (_sampled) {
      var _handlers2;

      // first send all events fired before enableAnalytics called
      events.getEvents().forEach((function (event) {
        if (!event) {
          return;
        }

        var eventType = event.eventType,
            args = event.args;


        if (eventType !== BID_TIMEOUT) {
          _enqueue.call(_this, { eventType: eventType, args: args });
        }
      }));

      // Next register event listeners to send data immediately

      _handlers = (_handlers2 = {}, _defineProperty(_handlers2, BID_REQUESTED, (function (args) {
        return _this2.enqueue({ eventType: BID_REQUESTED, args: args });
      })), _defineProperty(_handlers2, BID_RESPONSE, (function (args) {
        return _this2.enqueue({ eventType: BID_RESPONSE, args: args });
      })), _defineProperty(_handlers2, BID_TIMEOUT, (function (args) {
        return _this2.enqueue({ eventType: BID_TIMEOUT, args: args });
      })), _defineProperty(_handlers2, BID_WON, (function (args) {
        return _this2.enqueue({ eventType: BID_WON, args: args });
      })), _defineProperty(_handlers2, BID_ADJUSTMENT, (function (args) {
        return _this2.enqueue({ eventType: BID_ADJUSTMENT, args: args });
      })), _defineProperty(_handlers2, SET_TARGETING, (function (args) {
        return _this2.enqueue({ eventType: SET_TARGETING, args: args });
      })), _defineProperty(_handlers2, AUCTION_END, (function (args) {
        return _this2.enqueue({ eventType: AUCTION_END, args: args });
      })), _defineProperty(_handlers2, AUCTION_INIT, (function (args) {
        args.config = config.options; // enableAnaltyics configuration object
        _this2.enqueue({ eventType: AUCTION_INIT, args: args });
      })), _handlers2);

      utils._each(_handlers, (function (handler, event) {
        events.on(event, handler);
      }));
    } else {
      utils.logMessage('Analytics adapter for "' + global + '" disabled by sampling');
    }

    // finally set this function to return log message, prevents multiple adapter listeners
    this.enableAnalytics = function _enable() {
      return utils.logMessage('Analytics adapter for "' + global + '" already enabled, unnecessary call to `enableAnalytics`.');
    };
  }

  function _disable() {
    utils._each(_handlers, (function (handler, event) {
      events.off(event, handler);
    }));
  }

  function _emptyQueue() {
    if (_enableCheck) {
      for (var i = 0; i < _queue.length; i++) {
        _queue[i]();
      }

      // override push to execute the command immediately from now on
      _queue.push = function (fn) {
        fn();
      };

      _enableCheck = false;
    }

    utils.logMessage('event count sent to ' + global + ': ' + _eventCount);
  }
}

/***/ }),

/***/ 327:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(328);
module.exports = __webpack_require__(334);


/***/ }),

/***/ 328:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* Sigmoid Analytics Adapter for prebid.js all versions
                                                                                                                                                                                                                                                                  Updated : 2018-04-20 */


var _includes = __webpack_require__(329);

var _includes2 = _interopRequireDefault(_includes);

var _AnalyticsAdapter = __webpack_require__(10);

var _AnalyticsAdapter2 = _interopRequireDefault(_AnalyticsAdapter);

var _constants = __webpack_require__(3);

var _constants2 = _interopRequireDefault(_constants);

var _adaptermanager = __webpack_require__(1);

var _adaptermanager2 = _interopRequireDefault(_adaptermanager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var utils = __webpack_require__(0);

var url = 'https://kinesis.us-east-1.amazonaws.com/';
var analyticsType = 'endpoint';

var auctionInitConst = _constants2['default'].EVENTS.AUCTION_INIT;
var auctionEndConst = _constants2['default'].EVENTS.AUCTION_END;
var bidWonConst = _constants2['default'].EVENTS.BID_WON;
var bidRequestConst = _constants2['default'].EVENTS.BID_REQUESTED;
var bidAdjustmentConst = _constants2['default'].EVENTS.BID_ADJUSTMENT;
var bidResponseConst = _constants2['default'].EVENTS.BID_RESPONSE;

var initOptions = { publisherIds: [], utmTagData: [], adUnits: [] };
var bidWon = { options: {}, events: [] };
var eventStack = { options: {}, events: [] };

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
  window.location.href.replace(location.hash, '').replace(/[?&]+([^=&]+)=?([^&]*)?/gi, (function (m, key, value) {
    vars[key] = value !== undefined ? value : '';
  }));

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
    if ((0, _includes2['default'])(initOptions.adUnits, args.adUnitCode)) {
      bidWon.events = [{ args: args, eventType: eventType }];
    }
  } else {
    bidWon.events = [{ args: args, eventType: eventType }];
  }
}

function buildEventStack() {
  eventStack.options = initOptions;
}

function filterBidsByAdUnit(bids) {
  var filteredBids = [];
  bids.forEach((function (bid) {
    if ((0, _includes2['default'])(initOptions.adUnits, bid.placementCode)) {
      filteredBids.push(bid);
    }
  }));
  return filteredBids;
}

function isValidEvent(eventType, adUnitCode) {
  if (checkAdUnitConfig()) {
    var validationEvents = [bidAdjustmentConst, bidResponseConst, bidWonConst];
    if (!(0, _includes2['default'])(initOptions.adUnits, adUnitCode) && (0, _includes2['default'])(validationEvents, eventType)) {
      return false;
    }
  }
  return true;
}

function isValidEventStack() {
  if (eventStack.events.length > 0) {
    return eventStack.events.some((function (event) {
      return bidRequestConst === event.eventType || bidWonConst === event.eventType;
    }));
  }
  return false;
}

function isValidBidWon() {
  return bidWon.events.length > 0;
}

function flushEventStack() {
  eventStack.events = [];
}

var sigmoidAdapter = _extends((0, _AnalyticsAdapter2['default'])({ url: url, analyticsType: analyticsType }), {
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
  utmTags.forEach((function (utmTagKey) {
    var utmTagValue = getParameterByName(utmTagKey);
    if (utmTagValue !== '') {
      utmTagsDetected = true;
    }
    utmTagData[utmTagKey] = utmTagValue;
  }));
  utmTags.forEach((function (utmTagKey) {
    if (utmTagsDetected) {
      localStorage.setItem(buildUtmLocalStorageKey(utmTagKey), utmTagData[utmTagKey]);
      updateUtmTimeout();
    } else {
      if (!isUtmTimeoutExpired()) {
        utmTagData[utmTagKey] = localStorage.getItem(buildUtmLocalStorageKey(utmTagKey)) ? localStorage.getItem(buildUtmLocalStorageKey(utmTagKey)) : '';
        updateUtmTimeout();
      }
    }
  }));
  return utmTagData;
};

function send(eventType, data, sendDataType) {
  AWS.config.credentials = new AWS.Credentials({
    accessKeyId: initOptions.accessKey, secretAccessKey: initOptions.secretKey
  });

  AWS.config.region = 'us-east-1';
  AWS.config.credentials.get((function (err) {
    // attach event listener
    if (err) {
      utils.logError(err);
      return;
    }
    // create kinesis service object
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
      StreamName: initOptions.streamName
    }, (function (err, newdata) {
      if (err) {
        utils.logError(err);
      }
    }));
    if (sendDataType === 'eventStack') {
      flushEventStack();
    }
  }));
};

function pushEvent(eventType, args) {
  if (eventType === bidRequestConst) {
    if (checkAdUnitConfig()) {
      args.bids = filterBidsByAdUnit(args.bids);
    }
    if (args.bids.length > 0) {
      eventStack.events.push({ eventType: eventType, args: args });
    }
  } else {
    if (isValidEvent(eventType, args.adUnitCode)) {
      eventStack.events.push({ eventType: eventType, args: args });
    }
  }
}

_adaptermanager2['default'].registerAnalyticsAdapter({
  adapter: sigmoidAdapter,
  code: 'sigmoid'
});

exports['default'] = sigmoidAdapter;

/***/ }),

/***/ 329:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(330);
module.exports = __webpack_require__(16).Array.includes;


/***/ }),

/***/ 330:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(25);
var $includes = __webpack_require__(331)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(27)('includes');


/***/ }),

/***/ 331:
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(332);
var toLength = __webpack_require__(43);
var toAbsoluteIndex = __webpack_require__(333);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ 332:
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(40);
var defined = __webpack_require__(42);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ 333:
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(44);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ 334:
/***/ (function(module, exports) {



/***/ })

},[327]);