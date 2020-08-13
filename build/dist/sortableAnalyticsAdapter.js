pbjsChunk([9],{

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

/***/ 714:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(715);


/***/ }),

/***/ 715:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_PBID_TIMEOUT", function() { return DEFAULT_PBID_TIMEOUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TIMEOUT_FOR_REGISTRY", function() { return TIMEOUT_FOR_REGISTRY; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_constants_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__src_constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_prebidGlobal_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_config_js__ = __webpack_require__(3);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }








var DEFAULT_PROTOCOL = 'https';
var DEFAULT_HOST = 'pa.deployads.com';
var DEFAULT_URL = "".concat(DEFAULT_PROTOCOL, "://").concat(DEFAULT_HOST, "/pae");
var ANALYTICS_TYPE = 'endpoint';
var UTM_STORE_KEY = 'sortable_utm';
var DEFAULT_PBID_TIMEOUT = 1000;
var TIMEOUT_FOR_REGISTRY = 250;
var settings = {};
var _CONSTANTS$EVENTS = __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default.a.EVENTS,
    AUCTION_INIT = _CONSTANTS$EVENTS.AUCTION_INIT,
    AUCTION_END = _CONSTANTS$EVENTS.AUCTION_END,
    BID_REQUESTED = _CONSTANTS$EVENTS.BID_REQUESTED,
    BID_ADJUSTMENT = _CONSTANTS$EVENTS.BID_ADJUSTMENT,
    BID_WON = _CONSTANTS$EVENTS.BID_WON,
    BID_TIMEOUT = _CONSTANTS$EVENTS.BID_TIMEOUT;

var minsToMillis = function minsToMillis(mins) {
  return mins * 60 * 1000;
};

var UTM_TTL = minsToMillis(30);
var SORTABLE_EVENTS = {
  BID_WON: 'pbrw',
  BID_TIMEOUT: 'pbto',
  ERROR: 'pber',
  PB_BID: 'pbid'
};
var UTM_PARAMS = ['utm_campaign', 'utm_source', 'utm_medium', 'utm_content', 'utm_term'];
var EVENT_KEYS_SHORT_NAMES = {
  'auctionId': 'ai',
  'adUnitCode': 'ac',
  'adId': 'adi',
  'bidderAlias': 'bs',
  'bidFactor': 'bif',
  'bidId': 'bid',
  'bidRequestCount': 'brc',
  'bidderRequestId': 'brid',
  'bidRequestedSizes': 'rs',
  'bidTopCpm': 'btcp',
  'bidTopCpmCurrency': 'btcc',
  'bidTopIsNetRevenue': 'btin',
  'bidTopFactor': 'btif',
  'bidTopSrc': 'btsrc',
  'cpm': 'c',
  'currency': 'cc',
  'dealId': 'did',
  'isNetRevenue': 'inr',
  'isTop': 'it',
  'isWinner': 'iw',
  'isTimeout': 'ito',
  'mediaType': 'mt',
  'reachedTop': 'rtp',
  'numIframes': 'nif',
  'size': 'siz',
  'start': 'st',
  'tagId': 'tgid',
  'transactionId': 'trid',
  'ttl': 'ttl',
  'ttr': 'ttr',
  'url': 'u',
  'utm_campaign': 'uc',
  'utm_source': 'us',
  'utm_medium': 'um',
  'utm_content': 'un',
  'utm_term': 'ut'
};
var auctionCache = {};
var bidderFactors = null;
var timeoutId = null;
var eventsToBeSent = [];

function getStorage() {
  try {
    return window['sessionStorage'];
  } catch (e) {
    return null;
  }
}

function putParams(k, v) {
  try {
    var storage = getStorage();

    if (!storage) {
      return false;
    }

    if (v === null) {
      storage.removeItem(k);
    } else {
      storage.setItem(k, JSON.stringify(v));
    }

    return true;
  } catch (e) {
    return false;
  }
}

function getParams(k) {
  try {
    var storage = getStorage();

    if (!storage) {
      return null;
    }

    var value = storage.getItem(k);
    return value === null ? null : JSON.parse(value);
  } catch (e) {
    return null;
  }
}

function storeParams(key, paramsToSave) {
  if (!settings.disableSessionTracking) {
    for (var property in paramsToSave) {
      if (paramsToSave.hasOwnProperty(property)) {
        putParams(key, paramsToSave);
        break;
      }
    }
  }
}

function getSiteKey(options) {
  var sortableConfig = __WEBPACK_IMPORTED_MODULE_6__src_config_js__["b" /* config */].getConfig('sortable') || {};
  var globalSiteId = sortableConfig.siteId;
  return globalSiteId || options.siteId;
}

function generateRandomId() {
  var s = (+new Date()).toString(36);

  for (var i = 0; i < 6; ++i) {
    s += (Math.random() * 36 | 0).toString(36);
  }

  return s;
}

function getSessionParams() {
  var stillValid = function stillValid(paramsFromStorage) {
    return paramsFromStorage.created < +new Date() + UTM_TTL;
  };

  var sessionParams = null;

  if (!settings.disableSessionTracking) {
    var paramsFromStorage = getParams(UTM_STORE_KEY);
    sessionParams = paramsFromStorage && stillValid(paramsFromStorage) ? paramsFromStorage : null;
  }

  sessionParams = sessionParams || {
    'created': +new Date(),
    'sessionId': generateRandomId()
  };
  var urlParams = UTM_PARAMS.map(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["getParameterByName"]);

  if (UTM_PARAMS.every(function (key) {
    return !sessionParams[key];
  })) {
    UTM_PARAMS.forEach(function (v, i) {
      return sessionParams[v] = urlParams[i] || sessionParams[v];
    });
    sessionParams.created = +new Date();
    storeParams(UTM_STORE_KEY, sessionParams);
  }

  return sessionParams;
}

function getPrebidVersion() {
  return Object(__WEBPACK_IMPORTED_MODULE_5__src_prebidGlobal_js__["a" /* getGlobal */])().version;
}

function getFactor(bidder) {
  if (bidder && bidder.bidCpmAdjustment) {
    return bidder.bidCpmAdjustment(1.0);
  } else {
    return null;
  }
}

function getBiddersFactors() {
  var pb = Object(__WEBPACK_IMPORTED_MODULE_5__src_prebidGlobal_js__["a" /* getGlobal */])();
  var result = {};

  if (pb && pb.bidderSettings) {
    Object.keys(pb.bidderSettings).forEach(function (bidderKey) {
      var bidder = pb.bidderSettings[bidderKey];
      var factor = getFactor(bidder);

      if (factor !== null) {
        result[bidderKey] = factor;
      }
    });
  }

  return result;
}

function getBaseEvent(auctionId, adUnitCode, bidderCode) {
  var event = {};
  event.s = settings.key;
  event.ai = auctionId;
  event.ac = adUnitCode;
  event.bs = bidderCode;
  return event;
}

function getBidBaseEvent(auctionId, adUnitCode, bidderCode) {
  var sessionParams = getSessionParams();
  var prebidVersion = getPrebidVersion();
  var event = getBaseEvent(auctionId, adUnitCode, bidderCode);
  event.sid = sessionParams.sessionId;
  event.pv = settings.pageviewId;
  event.to = auctionCache[auctionId].timeout;
  event.pbv = prebidVersion;
  UTM_PARAMS.filter(function (k) {
    return sessionParams[k];
  }).forEach(function (k) {
    return event[EVENT_KEYS_SHORT_NAMES[k]] = sessionParams[k];
  });
  return event;
}

function createPBBidEvent(bid) {
  var event = getBidBaseEvent(bid.auctionId, bid.adUnitCode, bid.bidderAlias);
  Object.keys(bid).forEach(function (k) {
    var shortName = EVENT_KEYS_SHORT_NAMES[k];

    if (shortName) {
      event[shortName] = bid[k];
    }
  });
  event._type = SORTABLE_EVENTS.PB_BID;
  return event;
}

function getBidFactor(bidderAlias) {
  if (!bidderFactors) {
    bidderFactors = getBiddersFactors();
  }

  var factor = bidderFactors[bidderAlias];
  return typeof factor !== 'undefined' ? factor : 1.0;
}

function createPrebidBidWonEvent(_ref) {
  var auctionId = _ref.auctionId,
      adUnitCode = _ref.adUnitCode,
      bidderAlias = _ref.bidderAlias,
      cpm = _ref.cpm,
      currency = _ref.currency,
      isNetRevenue = _ref.isNetRevenue;
  var bidFactor = getBidFactor(bidderAlias);
  var event = getBaseEvent(auctionId, adUnitCode, bidderAlias);
  event.bif = bidFactor;
  bidderFactors = null;
  event.c = cpm;
  event.cc = currency;
  event.inr = isNetRevenue;
  event._type = SORTABLE_EVENTS.BID_WON;
  return event;
}

function createPrebidTimeoutEvent(_ref2) {
  var auctionId = _ref2.auctionId,
      adUnitCode = _ref2.adUnitCode,
      bidderAlias = _ref2.bidderAlias;
  var event = getBaseEvent(auctionId, adUnitCode, bidderAlias);
  event._type = SORTABLE_EVENTS.BID_TIMEOUT;
  return event;
}

function getDistinct(arr) {
  return arr.filter(function (v, i, a) {
    return a.indexOf(v) === i;
  });
}

function groupBy(list, keyGetterFn) {
  var map = {};
  list.forEach(function (item) {
    var key = keyGetterFn(item);
    map[key] = map[key] ? map[key].concat(item) : [item];
  });
  return map;
}

function mergeAndCompressEventsByType(events, type) {
  if (!events.length) {
    return {};
  }

  var allKeys = getDistinct(events.map(function (ev) {
    return Object.keys(ev);
  }).reduce(function (prev, curr) {
    return prev.concat(curr);
  }, []));
  var eventsAsMap = {};
  allKeys.forEach(function (k) {
    events.forEach(function (ev) {
      return eventsAsMap[k] = eventsAsMap[k] ? eventsAsMap[k].concat(ev[k]) : [ev[k]];
    });
  });

  var allSame = function allSame(arr) {
    return arr.every(function (el) {
      return arr[0] === el;
    });
  };

  Object.keys(eventsAsMap).forEach(function (k) {
    return eventsAsMap[k] = eventsAsMap[k].length && allSame(eventsAsMap[k]) ? eventsAsMap[k][0] : eventsAsMap[k];
  });
  eventsAsMap._count = events.length;
  var result = {};
  result[type] = eventsAsMap;
  return result;
}

function mergeAndCompressEvents(events) {
  var types = getDistinct(events.map(function (e) {
    return e._type;
  }));
  var groupedEvents = groupBy(events, function (e) {
    return e._type;
  });
  var results = types.map(function (t) {
    return groupedEvents[t];
  }).map(function (events) {
    return mergeAndCompressEventsByType(events, events[0]._type);
  });
  return results.reduce(function (prev, eventMap) {
    var key = Object.keys(eventMap)[0];
    prev[key] = eventMap[key];
    return prev;
  }, {});
}

function registerEvents(events) {
  eventsToBeSent = eventsToBeSent.concat(events);

  if (!timeoutId) {
    timeoutId = setTimeout(function () {
      var _eventsToBeSent = eventsToBeSent.slice();

      eventsToBeSent = [];
      sendEvents(_eventsToBeSent);
      timeoutId = null;
    }, TIMEOUT_FOR_REGISTRY);
  }
}

function sendEvents(events) {
  var url = settings.url;
  var mergedEvents = mergeAndCompressEvents(events);
  var options = {
    'contentType': 'text/plain',
    'method': 'POST',
    'withCredentials': true
  };

  var onSend = function onSend() {
    return __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["logInfo"]('Sortable Analytics data sent');
  };

  Object(__WEBPACK_IMPORTED_MODULE_4__src_ajax_js__["a" /* ajax */])(url, onSend, JSON.stringify(mergedEvents), options);
} // converts [[300, 250], [728, 90]] to '300x250,728x90'


function sizesToString(sizes) {
  return sizes.map(function (s) {
    return s.join('x');
  }).join(',');
}

function dimsToSizeString(width, height) {
  return "".concat(width, "x").concat(height);
}

function handleBidRequested(event) {
  var refererInfo = event.refererInfo;
  var url = refererInfo.referer;
  var reachedTop = refererInfo.reachedTop;
  var numIframes = refererInfo.numIframes;
  event.bids.forEach(function (bid) {
    var auctionId = bid.auctionId;
    var adUnitCode = bid.adUnitCode;
    var tagId = bid.bidder === 'sortable' ? bid.params.tagId : '';

    if (!auctionCache[auctionId].adUnits[adUnitCode]) {
      auctionCache[auctionId].adUnits[adUnitCode] = {
        bids: {}
      };
    }

    var adUnit = auctionCache[auctionId].adUnits[adUnitCode];
    var bids = adUnit.bids;
    var newBid = {
      adUnitCode: bid.adUnitCode,
      auctionId: event.auctionId,
      bidderAlias: bid.bidder,
      bidId: bid.bidId,
      bidderRequestId: bid.bidderRequestId,
      bidRequestCount: bid.bidRequestsCount,
      bidRequestedSizes: sizesToString(bid.sizes),
      currency: bid.currency,
      cpm: 0.0,
      isTimeout: false,
      isTop: false,
      isWinner: false,
      numIframes: numIframes,
      start: event.start,
      tagId: tagId,
      transactionId: bid.transactionId,
      reachedTop: reachedTop,
      url: encodeURI(url)
    };
    bids[newBid.bidderAlias] = newBid;
  });
}

function handleBidAdjustment(event) {
  var auctionId = event.auctionId;
  var adUnitCode = event.adUnitCode;
  var adUnit = auctionCache[auctionId].adUnits[adUnitCode];
  var bid = adUnit.bids[event.bidderCode];
  var bidFactor = getBidFactor(event.bidderCode);
  bid.adId = event.adId;
  bid.adUnitCode = event.adUnitCode;
  bid.auctionId = event.auctionId;
  bid.bidderAlias = event.bidderCode;
  bid.bidFactor = bidFactor;
  bid.cpm = event.cpm;
  bid.currency = event.currency;
  bid.dealId = event.dealId;
  bid.isNetRevenue = event.netRevenue;
  bid.mediaType = event.mediaType;
  bid.responseTimestamp = event.responseTimestamp;
  bid.size = dimsToSizeString(event.width, event.height);
  bid.ttl = event.ttl;
  bid.ttr = event.timeToRespond;
}

function handleBidWon(event) {
  var auctionId = event.auctionId;
  var auction = auctionCache[auctionId];

  if (auction) {
    var adUnitCode = event.adUnitCode;
    var adUnit = auction.adUnits[adUnitCode];
    Object.keys(adUnit.bids).forEach(function (bidderCode) {
      var bidFromUnit = adUnit.bids[bidderCode];
      bidFromUnit.isWinner = event.bidderCode === bidderCode;
    });
  } else {
    var ev = createPrebidBidWonEvent({
      adUnitCode: event.adUnitCode,
      auctionId: event.auctionId,
      bidderAlias: event.bidderCode,
      currency: event.currency,
      cpm: event.cpm,
      isNetRevenue: event.netRevenue
    });
    registerEvents([ev]);
  }
}

function handleBidTimeout(event) {
  event.forEach(function (timeout) {
    var auctionId = timeout.auctionId;
    var adUnitCode = timeout.adUnitCode;
    var bidderAlias = timeout.bidder;
    var auction = auctionCache[auctionId];

    if (auction) {
      var adUnit = auction.adUnits[adUnitCode];
      var bid = adUnit.bids[bidderAlias];
      bid.isTimeout = true;
    } else {
      var prebidTimeoutEvent = createPrebidTimeoutEvent({
        auctionId: auctionId,
        adUnitCode: adUnitCode,
        bidderAlias: bidderAlias
      });
      registerEvents([prebidTimeoutEvent]);
    }
  });
}

function handleAuctionInit(event) {
  var auctionId = event.auctionId;
  var timeout = event.timeout;
  auctionCache[auctionId] = {
    timeout: timeout,
    auctionId: auctionId,
    adUnits: {}
  };
}

function handleAuctionEnd(event) {
  var auction = auctionCache[event.auctionId];
  var adUnits = auction.adUnits;
  setTimeout(function () {
    var events = Object.keys(adUnits).map(function (adUnitCode) {
      var bidderKeys = Object.keys(auction.adUnits[adUnitCode].bids);
      var bids = bidderKeys.map(function (bidderCode) {
        return auction.adUnits[adUnitCode].bids[bidderCode];
      });
      var highestBid = bids.length ? bids.reduce(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["getOldestHighestCpmBid"]) : null;
      return bidderKeys.map(function (bidderCode) {
        var bid = auction.adUnits[adUnitCode].bids[bidderCode];

        if (highestBid && highestBid.cpm) {
          bid.isTop = highestBid.bidderAlias === bid.bidderAlias;
          bid.bidTopFactor = getBidFactor(highestBid.bidderAlias);
          bid.bidTopCpm = highestBid.cpm;
          bid.bidTopCpmCurrency = highestBid.currency;
          bid.bidTopIsNetRevenue = highestBid.isNetRevenue;
          bid.bidTopSrc = highestBid.bidderAlias;
        }

        return createPBBidEvent(bid);
      });
    }).reduce(function (prev, curr) {
      return prev.concat(curr);
    }, []);
    bidderFactors = null;
    sendEvents(events);
    delete auctionCache[event.auctionId];
  }, settings.timeoutForPbid);
}

function handleError(eventType, event, e) {
  var ev = {};
  ev.s = settings.key;
  ev.ti = eventType;
  ev.args = JSON.stringify(event);
  ev.msg = e.message;
  ev._type = SORTABLE_EVENTS.ERROR;
  registerEvents([ev]);
}

var sortableAnalyticsAdapter = _extends(Object(__WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter_js__["a" /* default */])({
  url: DEFAULT_URL,
  ANALYTICS_TYPE: ANALYTICS_TYPE
}), {
  track: function track(_ref3) {
    var eventType = _ref3.eventType,
        args = _ref3.args;

    try {
      switch (eventType) {
        case AUCTION_INIT:
          handleAuctionInit(args);
          break;

        case AUCTION_END:
          handleAuctionEnd(args);
          break;

        case BID_REQUESTED:
          handleBidRequested(args);
          break;

        case BID_ADJUSTMENT:
          handleBidAdjustment(args);
          break;

        case BID_WON:
          handleBidWon(args);
          break;

        case BID_TIMEOUT:
          handleBidTimeout(args);
          break;
      }
    } catch (e) {
      handleError(eventType, args, e);
    }
  }
});

sortableAnalyticsAdapter.originEnableAnalytics = sortableAnalyticsAdapter.enableAnalytics;

sortableAnalyticsAdapter.enableAnalytics = function (setupConfig) {
  if (this.initConfig(setupConfig)) {
    __WEBPACK_IMPORTED_MODULE_3__src_utils_js__["logInfo"]('Sortable Analytics adapter enabled');
    sortableAnalyticsAdapter.originEnableAnalytics(setupConfig);
  }
};

sortableAnalyticsAdapter.initConfig = function (setupConfig) {
  settings.disableSessionTracking = setupConfig.disableSessionTracking === undefined ? false : setupConfig.disableSessionTracking;
  settings.key = getSiteKey(setupConfig.options);
  settings.protocol = setupConfig.options.protocol || DEFAULT_PROTOCOL;
  settings.url = "".concat(settings.protocol, "://").concat(setupConfig.options.eventHost || DEFAULT_HOST, "/pae/").concat(settings.key);
  settings.pageviewId = generateRandomId();
  settings.timeoutForPbid = setupConfig.timeoutForPbid ? Math.max(setupConfig.timeoutForPbid, 0) : DEFAULT_PBID_TIMEOUT;
  return !!settings.key;
};

sortableAnalyticsAdapter.getOptions = function () {
  return settings;
};

__WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__["default"].registerAnalyticsAdapter({
  adapter: sortableAnalyticsAdapter,
  code: 'sortable'
});
/* harmony default export */ __webpack_exports__["default"] = (sortableAnalyticsAdapter);

/***/ })

},[714]);