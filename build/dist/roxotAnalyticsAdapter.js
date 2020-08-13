pbjsChunk([16],{

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

/***/ 652:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(653);


/***/ }),

/***/ 653:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_constants_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__src_constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_storageManager_js__ = __webpack_require__(9);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }







var storage = Object(__WEBPACK_IMPORTED_MODULE_5__src_storageManager_js__["b" /* getStorageManager */])();

var utils = __webpack_require__(0);

var ajax = Object(__WEBPACK_IMPORTED_MODULE_4__src_ajax_js__["b" /* ajaxBuilder */])(0);
var DEFAULT_EVENT_URL = 'pa.rxthdr.com/v3';
var DEFAULT_SERVER_CONFIG_URL = 'pa.rxthdr.com/v3';
var analyticsType = 'endpoint';
var _CONSTANTS$EVENTS = __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default.a.EVENTS,
    AUCTION_INIT = _CONSTANTS$EVENTS.AUCTION_INIT,
    AUCTION_END = _CONSTANTS$EVENTS.AUCTION_END,
    BID_REQUESTED = _CONSTANTS$EVENTS.BID_REQUESTED,
    BID_ADJUSTMENT = _CONSTANTS$EVENTS.BID_ADJUSTMENT,
    BIDDER_DONE = _CONSTANTS$EVENTS.BIDDER_DONE,
    BID_WON = _CONSTANTS$EVENTS.BID_WON;
var AUCTION_STATUS = {
  'RUNNING': 'running',
  'FINISHED': 'finished'
};
var BIDDER_STATUS = {
  'REQUESTED': 'requested',
  'BID': 'bid',
  'NO_BID': 'noBid',
  'TIMEOUT': 'timeout'
};
var ROXOT_EVENTS = {
  'AUCTION': 'a',
  'IMPRESSION': 'i',
  'BID_AFTER_TIMEOUT': 'bat'
};
var initOptions = {};
var localStoragePrefix = 'roxot_analytics_';
var utmTags = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
var utmTtlKey = 'utm_ttl';
var utmTtl = 60 * 60 * 1000;
var isNewKey = 'is_new_flag';
var isNewTtl = 60 * 60 * 1000;
var auctionCache = {};
var auctionTtl = 60 * 60 * 1000;
var sendEventCache = [];
var sendEventTimeoutId = null;
var sendEventTimeoutTime = 1000;

function detectDevice() {
  if (/ipad|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase())) {
    return 'tablet';
  }

  if (/iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(navigator.userAgent.toLowerCase())) {
    return 'mobile';
  }

  return 'desktop';
}

function checkIsNewFlag() {
  var key = buildLocalStorageKey(isNewKey);
  var lastUpdate = Number(storage.getDataFromLocalStorage(key));
  storage.setDataInLocalStorage(key, Date.now());
  return Date.now() - lastUpdate > isNewTtl;
}

function updateUtmTimeout() {
  storage.setDataInLocalStorage(buildLocalStorageKey(utmTtlKey), Date.now());
}

function isUtmTimeoutExpired() {
  var utmTimestamp = storage.getDataFromLocalStorage(buildLocalStorageKey(utmTtlKey));
  return Date.now() - utmTimestamp > utmTtl;
}

function buildLocalStorageKey(key) {
  return localStoragePrefix.concat(key);
}

function isSupportedAdUnit(adUnit) {
  if (!initOptions.adUnits.length) {
    return true;
  }

  return __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js___default()(initOptions.adUnits, adUnit);
}

function deleteOldAuctions() {
  for (var auctionId in auctionCache) {
    var auction = auctionCache[auctionId];

    if (Date.now() - auction.start > auctionTtl) {
      delete auctionCache[auctionId];
    }
  }
}

function buildAuctionEntity(args) {
  return {
    'id': args.auctionId,
    'start': args.timestamp,
    'timeout': args.timeout,
    'adUnits': {}
  };
}

function extractAdUnitCode(args) {
  return args.adUnitCode.toLowerCase();
}

function extractBidder(args) {
  return args.bidder.toLowerCase();
}

function buildAdUnitAuctionEntity(auction, bidRequest) {
  return {
    'adUnit': extractAdUnitCode(bidRequest),
    'start': auction.start,
    'timeout': auction.timeout,
    'finish': 0,
    'status': AUCTION_STATUS.RUNNING,
    'bidders': {}
  };
}

function buildBidderRequest(auction, bidRequest) {
  return {
    'bidder': extractBidder(bidRequest),
    'isAfterTimeout': auction.status === AUCTION_STATUS.FINISHED ? 1 : 0,
    'start': bidRequest.startTime || Date.now(),
    'finish': 0,
    'status': BIDDER_STATUS.REQUESTED,
    'cpm': -1,
    'size': {
      'width': 0,
      'height': 0
    },
    'mediaType': '-',
    'source': bidRequest.source || 'client'
  };
}

function buildBidAfterTimeout(adUnitAuction, args) {
  return {
    'auction': utils.deepClone(adUnitAuction),
    'adUnit': extractAdUnitCode(args),
    'bidder': extractBidder(args),
    'cpm': args.cpm,
    'size': {
      'width': args.width || 0,
      'height': args.height || 0
    },
    'mediaType': args.mediaType || '-',
    'start': args.requestTimestamp,
    'finish': args.responseTimestamp
  };
}

function buildImpression(adUnitAuction, args) {
  return {
    'isNew': checkIsNewFlag() ? 1 : 0,
    'auction': utils.deepClone(adUnitAuction),
    'adUnit': extractAdUnitCode(args),
    'bidder': extractBidder(args),
    'cpm': args.cpm,
    'size': {
      'width': args.width,
      'height': args.height
    },
    'mediaType': args.mediaType,
    'source': args.source || 'client'
  };
}

function handleAuctionInit(args) {
  auctionCache[args.auctionId] = buildAuctionEntity(args);
  deleteOldAuctions();
}

function handleBidRequested(args) {
  var auction = auctionCache[args.auctionId];
  args.bids.forEach(function (bidRequest) {
    var adUnitCode = extractAdUnitCode(bidRequest);
    var bidder = extractBidder(bidRequest);

    if (!isSupportedAdUnit(adUnitCode)) {
      return;
    }

    auction['adUnits'][adUnitCode] = auction['adUnits'][adUnitCode] || buildAdUnitAuctionEntity(auction, bidRequest);
    var adUnitAuction = auction['adUnits'][adUnitCode];
    adUnitAuction['bidders'][bidder] = adUnitAuction['bidders'][bidder] || buildBidderRequest(auction, bidRequest);
  });
}

function handleBidAdjustment(args) {
  var adUnitCode = extractAdUnitCode(args);
  var bidder = extractBidder(args);

  if (!isSupportedAdUnit(adUnitCode)) {
    return;
  }

  var adUnitAuction = auctionCache[args.auctionId]['adUnits'][adUnitCode];

  if (adUnitAuction.status === AUCTION_STATUS.FINISHED) {
    handleBidAfterTimeout(adUnitAuction, args);
    return;
  }

  var bidderRequest = adUnitAuction['bidders'][bidder];

  if (bidderRequest.cpm < args.cpm) {
    bidderRequest.cpm = args.cpm;
    bidderRequest.finish = args.responseTimestamp;
    bidderRequest.status = args.cpm === 0 ? BIDDER_STATUS.NO_BID : BIDDER_STATUS.BID;
    bidderRequest.size.width = args.width || 0;
    bidderRequest.size.height = args.height || 0;
    bidderRequest.mediaType = args.mediaType || '-';
    bidderRequest.source = args.source || 'client';
  }
}

function handleBidAfterTimeout(adUnitAuction, args) {
  var bidder = extractBidder(args);
  var bidderRequest = adUnitAuction['bidders'][bidder];
  var bidAfterTimeout = buildBidAfterTimeout(adUnitAuction, args);

  if (bidAfterTimeout.cpm > bidderRequest.cpm) {
    bidderRequest.cpm = bidAfterTimeout.cpm;
    bidderRequest.isAfterTimeout = 1;
    bidderRequest.finish = bidAfterTimeout.finish;
    bidderRequest.size = bidAfterTimeout.size;
    bidderRequest.mediaType = bidAfterTimeout.mediaType;
    bidderRequest.status = bidAfterTimeout.cpm === 0 ? BIDDER_STATUS.NO_BID : BIDDER_STATUS.BID;
  }

  registerEvent(ROXOT_EVENTS.BID_AFTER_TIMEOUT, 'Bid After Timeout', bidAfterTimeout);
}

function handleBidderDone(args) {
  var auction = auctionCache[args.auctionId];
  args.bids.forEach(function (bidDone) {
    var adUnitCode = extractAdUnitCode(bidDone);
    var bidder = extractBidder(bidDone);

    if (!isSupportedAdUnit(adUnitCode)) {
      return;
    }

    var adUnitAuction = auction['adUnits'][adUnitCode];

    if (adUnitAuction.status === AUCTION_STATUS.FINISHED) {
      return;
    }

    var bidderRequest = adUnitAuction['bidders'][bidder];

    if (bidderRequest.status !== BIDDER_STATUS.REQUESTED) {
      return;
    }

    bidderRequest.finish = Date.now();
    bidderRequest.status = BIDDER_STATUS.NO_BID;
    bidderRequest.cpm = 0;
  });
}

function handleAuctionEnd(args) {
  var auction = auctionCache[args.auctionId];

  if (!Object.keys(auction.adUnits).length) {
    delete auctionCache[args.auctionId];
  }

  var finish = Date.now();
  auction.finish = finish;

  for (var adUnit in auction.adUnits) {
    var adUnitAuction = auction.adUnits[adUnit];
    adUnitAuction.finish = finish;
    adUnitAuction.status = AUCTION_STATUS.FINISHED;

    for (var bidder in adUnitAuction.bidders) {
      var bidderRequest = adUnitAuction.bidders[bidder];

      if (bidderRequest.status !== BIDDER_STATUS.REQUESTED) {
        continue;
      }

      bidderRequest.status = BIDDER_STATUS.TIMEOUT;
    }
  }

  registerEvent(ROXOT_EVENTS.AUCTION, 'Auction', auction);
}

function handleBidWon(args) {
  var adUnitCode = extractAdUnitCode(args);

  if (!isSupportedAdUnit(adUnitCode)) {
    return;
  }

  var adUnitAuction = auctionCache[args.auctionId]['adUnits'][adUnitCode];
  var impression = buildImpression(adUnitAuction, args);
  registerEvent(ROXOT_EVENTS.IMPRESSION, 'Bid won', impression);
}

function handleOtherEvents(eventType, args) {
  registerEvent(eventType, eventType, args);
}

var roxotAdapter = _extends(Object(__WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter_js__["a" /* default */])({
  url: DEFAULT_EVENT_URL,
  analyticsType: analyticsType
}), {
  track: function track(_ref) {
    var eventType = _ref.eventType,
        args = _ref.args;

    switch (eventType) {
      case AUCTION_INIT:
        handleAuctionInit(args);
        break;

      case BID_REQUESTED:
        handleBidRequested(args);
        break;

      case BID_ADJUSTMENT:
        handleBidAdjustment(args);
        break;

      case BIDDER_DONE:
        handleBidderDone(args);
        break;

      case AUCTION_END:
        handleAuctionEnd(args);
        break;

      case BID_WON:
        handleBidWon(args);
        break;

      default:
        handleOtherEvents(eventType, args);
        break;
    }
  }
});

roxotAdapter.originEnableAnalytics = roxotAdapter.enableAnalytics;

roxotAdapter.enableAnalytics = function (config) {
  if (this.initConfig(config)) {
    logInfo('Analytics adapter enabled', initOptions);
    roxotAdapter.originEnableAnalytics(config);
  }
};

roxotAdapter.buildUtmTagData = function () {
  var utmTagData = {};
  var utmTagsDetected = false;
  utmTags.forEach(function (utmTagKey) {
    var utmTagValue = utils.getParameterByName(utmTagKey);

    if (utmTagValue !== '') {
      utmTagsDetected = true;
    }

    utmTagData[utmTagKey] = utmTagValue;
  });
  utmTags.forEach(function (utmTagKey) {
    if (utmTagsDetected) {
      storage.setDataInLocalStorage(buildLocalStorageKey(utmTagKey), utmTagData[utmTagKey]);
      updateUtmTimeout();
    } else {
      if (!isUtmTimeoutExpired()) {
        utmTagData[utmTagKey] = storage.getDataFromLocalStorage(buildLocalStorageKey(utmTagKey)) ? storage.getDataFromLocalStorage(buildLocalStorageKey(utmTagKey)) : '';
        updateUtmTimeout();
      }
    }
  });
  return utmTagData;
};

roxotAdapter.initConfig = function (config) {
  var isCorrectConfig = true;
  initOptions = {};
  initOptions.options = utils.deepClone(config.options);
  initOptions.publisherId = initOptions.options.publisherId || initOptions.options.publisherIds[0] || null;

  if (!initOptions.publisherId) {
    logError('"options.publisherId" is empty');
    isCorrectConfig = false;
  }

  initOptions.adUnits = initOptions.options.adUnits || [];
  initOptions.adUnits = initOptions.adUnits.map(function (value) {
    return value.toLowerCase();
  });
  initOptions.server = initOptions.options.server || DEFAULT_EVENT_URL;
  initOptions.configServer = initOptions.options.configServer || initOptions.options.server || DEFAULT_SERVER_CONFIG_URL;
  initOptions.utmTagData = this.buildUtmTagData();
  initOptions.host = initOptions.options.host || window.location.hostname;
  initOptions.device = detectDevice();
  loadServerConfig();
  return isCorrectConfig;
};

roxotAdapter.getOptions = function () {
  return initOptions;
};

function registerEvent(eventType, eventName, data) {
  var eventData = {
    eventType: eventType,
    eventName: eventName,
    data: data
  };
  sendEventCache.push(eventData);
  logInfo('Register event', eventData);
  typeof initOptions.serverConfig === 'undefined' ? checkEventAfterTimeout() : checkSendEvent();
}

function checkSendEvent() {
  if (sendEventTimeoutId) {
    clearTimeout(sendEventTimeoutId);
    sendEventTimeoutId = null;
  }

  if (typeof initOptions.serverConfig === 'undefined') {
    checkEventAfterTimeout();
    return;
  }

  while (sendEventCache.length) {
    var event = sendEventCache.shift();
    var isNeedSend = initOptions.serverConfig[event.eventType] || 0;

    if (Number(isNeedSend) === 0) {
      logInfo('Skip event ' + event.eventName, event);
      continue;
    }

    sendEvent(event.eventType, event.eventName, event.data);
  }
}

function checkEventAfterTimeout() {
  if (sendEventTimeoutId) {
    return;
  }

  sendEventTimeoutId = setTimeout(checkSendEvent, sendEventTimeoutTime);
}

function sendEvent(eventType, eventName, data) {
  var url = 'https://' + initOptions.server + '/' + eventType + '?publisherId=' + initOptions.publisherId + '&host=' + initOptions.host;
  var eventData = {
    'event': eventType,
    'eventName': eventName,
    'options': initOptions,
    'data': data
  };
  ajax(url, function () {
    logInfo(eventName + ' sent', eventData);
  }, JSON.stringify(eventData), {
    contentType: 'text/plain',
    method: 'POST',
    withCredentials: true
  });
}

function loadServerConfig() {
  var url = 'https://' + initOptions.configServer + '/c' + '?publisherId=' + initOptions.publisherId + '&host=' + initOptions.host;
  ajax(url, {
    'success': function success(data) {
      initOptions.serverConfig = JSON.parse(data);
    },
    'error': function error() {
      initOptions.serverConfig = {};
      initOptions.serverConfig[ROXOT_EVENTS.AUCTION] = 1;
      initOptions.serverConfig[ROXOT_EVENTS.IMPRESSION] = 1;
      initOptions.serverConfig[ROXOT_EVENTS.BID_AFTER_TIMEOUT] = 1;
      initOptions.serverConfig['isError'] = 1;
    }
  }, null, {
    contentType: 'text/json',
    method: 'GET',
    withCredentials: true
  });
}

function logInfo(message, meta) {
  utils.logInfo(buildLogMessage(message), meta);
}

function logError(message) {
  utils.logError(buildLogMessage(message));
}

function buildLogMessage(message) {
  return 'Roxot Prebid Analytics: ' + message;
}

__WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__["default"].registerAnalyticsAdapter({
  adapter: roxotAdapter,
  code: 'roxot'
});
/* harmony default export */ __webpack_exports__["default"] = (roxotAdapter);

/***/ })

},[652]);