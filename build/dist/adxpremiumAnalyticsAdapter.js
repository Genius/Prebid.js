pbjsChunk([42],{

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(248);


/***/ }),

/***/ 248:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["testSend"] = testSend;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_AnalyticsAdapter_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_constants_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__src_constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_utils_js__ = __webpack_require__(0);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }






var analyticsType = 'endpoint';
var defaultUrl = 'https://adxpremium.services/graphql';
var reqCountry = window.reqCountry || null; // Events needed

var _CONSTANTS$EVENTS = __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default.a.EVENTS,
    AUCTION_INIT = _CONSTANTS$EVENTS.AUCTION_INIT,
    BID_REQUESTED = _CONSTANTS$EVENTS.BID_REQUESTED,
    BID_TIMEOUT = _CONSTANTS$EVENTS.BID_TIMEOUT,
    BID_RESPONSE = _CONSTANTS$EVENTS.BID_RESPONSE,
    BID_WON = _CONSTANTS$EVENTS.BID_WON,
    AUCTION_END = _CONSTANTS$EVENTS.AUCTION_END;
var timeoutBased = false;
var requestSent = false;
var requestDelivered = false;
var elementIds = []; // Memory objects

var completeObject = {
  publisher_id: null,
  auction_id: null,
  referer: null,
  screen_resolution: window.screen.width + 'x' + window.screen.height,
  device_type: null,
  geo: reqCountry,
  events: []
}; // Upgraded object

var upgradedObject = null;

var adxpremiumAnalyticsAdapter = _extends(Object(__WEBPACK_IMPORTED_MODULE_1__src_AnalyticsAdapter_js__["a" /* default */])({
  defaultUrl: defaultUrl,
  analyticsType: analyticsType
}), {
  track: function track(_ref) {
    var eventType = _ref.eventType,
        args = _ref.args;

    switch (eventType) {
      case AUCTION_INIT:
        auctionInit(args);
        break;

      case BID_REQUESTED:
        bidRequested(args);
        break;

      case BID_RESPONSE:
        bidResponse(args);
        break;

      case BID_WON:
        bidWon(args);
        break;

      case BID_TIMEOUT:
        bidTimeout(args);
        break;

      case AUCTION_END:
        auctionEnd(args);
        break;

      default:
        break;
    }
  }
}); // DFP support


var googletag = window.googletag || {};
googletag.cmd = googletag.cmd || [];
googletag.cmd.push(function () {
  googletag.pubads().addEventListener('slotRenderEnded', function (args) {
    clearSlot(args.slot.getSlotElementId());
  });
}); // Event handlers

var bidResponsesMapper = {};
var bidRequestsMapper = {};
var bidMapper = {};

function auctionInit(args) {
  // Clear events
  completeObject.events = []; // Allow new requests

  requestSent = false;
  requestDelivered = false; // Reset mappers

  bidResponsesMapper = {};
  bidRequestsMapper = {};
  bidMapper = {};
  completeObject.auction_id = args.auctionId;
  completeObject.publisher_id = adxpremiumAnalyticsAdapter.initOptions.pubId;

  try {
    completeObject.referer = encodeURI(args.bidderRequests[0].refererInfo.referer.split('?')[0]);
  } catch (e) {
    __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logError"]('AdxPremium Analytics - ' + e.message);
  }

  if (args.adUnitCodes && args.adUnitCodes.length > 0) {
    elementIds = args.adUnitCodes;
  }

  completeObject.device_type = deviceType();
}

function bidRequested(args) {
  var tmpObject = {
    type: 'REQUEST',
    bidder_code: args.bidderCode,
    event_timestamp: args.start,
    bid_gpt_codes: {}
  };
  args.bids.forEach(function (bid) {
    tmpObject.bid_gpt_codes[bid.adUnitCode] = bid.sizes;
    bidMapper[bid.bidId] = bid.bidderRequestId;
  });
  bidRequestsMapper[args.bidderRequestId] = completeObject.events.push(tmpObject) - 1;
}

function bidResponse(args) {
  var tmpObject = {
    type: 'RESPONSE',
    bidder_code: args.bidderCode,
    event_timestamp: args.responseTimestamp,
    size: args.size,
    gpt_code: args.adUnitCode,
    currency: args.currency,
    creative_id: args.creativeId,
    time_to_respond: args.timeToRespond,
    cpm: args.cpm,
    is_winning: false
  };
  bidResponsesMapper[args.requestId] = completeObject.events.push(tmpObject) - 1;
}

function bidWon(args) {
  var eventIndex = bidResponsesMapper[args.requestId];

  if (eventIndex !== undefined) {
    if (requestDelivered) {
      if (completeObject.events[eventIndex]) {
        // do the upgrade
        __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logInfo"]('AdxPremium Analytics - Upgrading request');
        completeObject.events[eventIndex].is_winning = true;
        completeObject.events[eventIndex].is_upgrade = true;
        upgradedObject = __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["deepClone"](completeObject);
        upgradedObject.events = [completeObject.events[eventIndex]];
        sendEvent(upgradedObject); // send upgrade
      } else {
        __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logInfo"]('AdxPremium Analytics - CANNOT FIND INDEX FOR REQUEST ' + args.requestId);
      }
    } else {
      completeObject.events[eventIndex].is_winning = true;
    }
  } else {
    __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logInfo"]('AdxPremium Analytics - Response not found, creating new one.');
    var tmpObject = {
      type: 'RESPONSE',
      bidder_code: args.bidderCode,
      event_timestamp: args.responseTimestamp,
      size: args.size,
      gpt_code: args.adUnitCode,
      currency: args.currency,
      creative_id: args.creativeId,
      time_to_respond: args.timeToRespond,
      cpm: args.cpm,
      is_winning: true,
      is_lost: true
    };
    var lostObject = __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["deepClone"](completeObject);
    lostObject.events = [tmpObject];
    sendEvent(lostObject); // send lost object
  }
}

function bidTimeout(args) {
  var timeoutObject = __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["deepClone"](completeObject);
  timeoutObject.events = [];
  var usedRequestIds = [];
  args.forEach(function (bid) {
    var pulledRequestId = bidMapper[bid.bidId];
    var eventIndex = bidRequestsMapper[pulledRequestId];

    if (eventIndex !== undefined && completeObject.events[eventIndex] && usedRequestIds.indexOf(pulledRequestId) == -1) {
      // mark as timeouted
      var tempEventIndex = timeoutObject.events.push(completeObject.events[eventIndex]) - 1;
      timeoutObject.events[tempEventIndex]['type'] = 'TIMEOUT';
      usedRequestIds.push(pulledRequestId); // mark as used
    }
  });

  if (timeoutObject.events.length > 0) {
    sendEvent(timeoutObject); // send timeouted

    __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logInfo"]('AdxPremium Analytics - Sending timeouted requests');
  }
}

function auctionEnd(args) {
  __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logInfo"]('AdxPremium Analytics - Auction Ended at ' + Date.now());

  if (timeoutBased) {
    setTimeout(function () {
      requestSent = true;
      sendEvent(completeObject);
    }, 3500);
  } else {
    sendEventFallback();
  }
} // Methods


function deviceType() {
  if (/ipad|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase())) {
    return 'tablet';
  }

  if (/iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(navigator.userAgent.toLowerCase())) {
    return 'mobile';
  }

  return 'desktop';
}

function clearSlot(elementId) {
  if (elementIds.includes(elementId)) {
    elementIds.splice(elementIds.indexOf(elementId), 1);
    __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logInfo"]('AdxPremium Analytics - Done with: ' + elementId);
  }

  if (elementIds.length == 0 && !requestSent && !timeoutBased) {
    requestSent = true;
    sendEvent(completeObject);
    __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logInfo"]('AdxPremium Analytics - Everything ready');
  }
}

function testSend() {
  sendEvent(completeObject);
  __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logInfo"]('AdxPremium Analytics - Sending without any conditions, used for testing');
}

function sendEventFallback() {
  setTimeout(function () {
    if (!requestSent) {
      requestSent = true;
      sendEvent(completeObject);
      __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logInfo"]('AdxPremium Analytics - Sending event using fallback method.');
    }
  }, 2000);
}

function sendEvent(completeObject) {
  requestDelivered = true;

  try {
    var responseEvents = btoa(JSON.stringify(completeObject));
    var mutation = "mutation {createEvent(input: {event: {eventData: \"".concat(responseEvents, "\"}}) {event {createTime } } }");
    var dataToSend = JSON.stringify({
      query: mutation
    });
    var ajaxEndpoint = defaultUrl;

    if (adxpremiumAnalyticsAdapter.initOptions.sid) {
      ajaxEndpoint = 'https://' + adxpremiumAnalyticsAdapter.initOptions.sid + '.adxpremium.services/graphql';
    }

    Object(__WEBPACK_IMPORTED_MODULE_0__src_ajax_js__["a" /* ajax */])(ajaxEndpoint, function () {
      __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logInfo"]('AdxPremium Analytics - Sending complete events at ' + Date.now());
    }, dataToSend, {
      contentType: 'application/json',
      method: 'POST'
    });
  } catch (err) {
    __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logError"]('AdxPremium Analytics - Sending event error: ' + err);
  }
} // save the base class function


adxpremiumAnalyticsAdapter.originEnableAnalytics = adxpremiumAnalyticsAdapter.enableAnalytics; // override enableAnalytics so we can get access to the config passed in from the page

adxpremiumAnalyticsAdapter.enableAnalytics = function (config) {
  adxpremiumAnalyticsAdapter.initOptions = config.options;

  if (!config.options.pubId) {
    __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logError"]('AdxPremium Analytics - Publisher ID (pubId) option is not defined. Analytics won\'t work');
    return;
  }

  adxpremiumAnalyticsAdapter.originEnableAnalytics(config); // call the base class function
};

__WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__["default"].registerAnalyticsAdapter({
  adapter: adxpremiumAnalyticsAdapter,
  code: 'adxpremium'
});
/* harmony default export */ __webpack_exports__["default"] = (adxpremiumAnalyticsAdapter);

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

},[247]);