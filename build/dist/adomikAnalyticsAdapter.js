pbjsChunk([44],{

/***/ 213:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(214);


/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_constants_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__src_constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_find_index_js__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_find_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_find_index_js__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }






 // Events used in adomik analytics adapter

var auctionInit = __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default.a.EVENTS.AUCTION_INIT;
var auctionEnd = __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default.a.EVENTS.AUCTION_END;
var bidRequested = __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default.a.EVENTS.BID_REQUESTED;
var bidResponse = __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default.a.EVENTS.BID_RESPONSE;
var bidWon = __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default.a.EVENTS.BID_WON;
var bidTimeout = __WEBPACK_IMPORTED_MODULE_1__src_constants_json___default.a.EVENTS.BID_TIMEOUT;

var adomikAdapter = _extends(Object(__WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter_js__["a" /* default */])({}), {
  // Track every event needed
  track: function track(_ref) {
    var eventType = _ref.eventType,
        args = _ref.args;

    switch (eventType) {
      case auctionInit:
        adomikAdapter.initializeBucketEvents();
        adomikAdapter.currentContext.id = args.auctionId;
        break;

      case bidTimeout:
        adomikAdapter.currentContext.timeouted = true;
        break;

      case bidResponse:
        adomikAdapter.bucketEvents.push({
          type: 'response',
          event: adomikAdapter.buildBidResponse(args)
        });
        break;

      case bidWon:
        adomikAdapter.sendWonEvent({
          id: args.adId,
          placementCode: args.adUnitCode
        });
        break;

      case bidRequested:
        args.bids.forEach(function (bid) {
          adomikAdapter.bucketEvents.push({
            type: 'request',
            event: {
              bidder: bid.bidder.toUpperCase(),
              placementCode: bid.placementCode
            }
          });
        });
        break;

      case auctionEnd:
        if (adomikAdapter.bucketEvents.length > 0) {
          adomikAdapter.sendTypedEvent();
        }

        break;
    }
  }
});

adomikAdapter.initializeBucketEvents = function () {
  adomikAdapter.bucketEvents = [];
};

adomikAdapter.sendTypedEvent = function () {
  var groupedTypedEvents = adomikAdapter.buildTypedEvents();
  var bulkEvents = {
    uid: adomikAdapter.currentContext.uid,
    ahbaid: adomikAdapter.currentContext.id,
    hostname: window.location.hostname,
    eventsByPlacementCode: groupedTypedEvents.map(function (typedEventsByType) {
      var sizes = [];
      var eventKeys = ['request', 'response', 'winner'];
      var events = {};
      eventKeys.forEach(function (eventKey) {
        events["".concat(eventKey, "s")] = [];

        if (typedEventsByType[eventKey] !== undefined) {
          typedEventsByType[eventKey].forEach(function (typedEvent) {
            if (typedEvent.event.size !== undefined) {
              var size = adomikAdapter.sizeUtils.handleSize(sizes, typedEvent.event.size);

              if (size !== null) {
                sizes = [].concat(_toConsumableArray(sizes), [size]);
              }
            }

            events["".concat(eventKey, "s")] = [].concat(_toConsumableArray(events["".concat(eventKey, "s")]), [typedEvent.event]);
          });
        }
      });
      return {
        placementCode: typedEventsByType.placementCode,
        sizes: sizes,
        events: events
      };
    })
  };
  var stringBulkEvents = JSON.stringify(bulkEvents);
  Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["logInfo"])('Events sent to adomik prebid analytic ' + stringBulkEvents); // Encode object in base64

  var encodedBuf = window.btoa(stringBulkEvents); // Create final url and split it in 1600 characters max (+endpoint length)

  var encodedUri = encodeURIComponent(encodedBuf);
  var splittedUrl = encodedUri.match(/.{1,1600}/g);
  splittedUrl.forEach(function (split, i) {
    var partUrl = "".concat(split, "&id=").concat(adomikAdapter.currentContext.id, "&part=").concat(i, "&on=").concat(splittedUrl.length - 1);
    var img = new Image(1, 1);
    img.src = 'https://' + adomikAdapter.currentContext.url + '/?q=' + partUrl;
  });
};

adomikAdapter.sendWonEvent = function (wonEvent) {
  var stringWonEvent = JSON.stringify(wonEvent);
  Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["logInfo"])('Won event sent to adomik prebid analytic ' + wonEvent); // Encode object in base64

  var encodedBuf = window.btoa(stringWonEvent);
  var encodedUri = encodeURIComponent(encodedBuf);
  var img = new Image(1, 1);
  img.src = "https://".concat(adomikAdapter.currentContext.url, "/?q=").concat(encodedUri, "&id=").concat(adomikAdapter.currentContext.id, "&won=true");
};

adomikAdapter.buildBidResponse = function (bid) {
  return {
    bidder: bid.bidderCode.toUpperCase(),
    placementCode: bid.adUnitCode,
    id: bid.adId,
    status: bid.statusMessage === 'Bid available' ? 'VALID' : 'EMPTY_OR_ERROR',
    cpm: parseFloat(bid.cpm),
    size: {
      width: Number(bid.width),
      height: Number(bid.height)
    },
    timeToRespond: bid.timeToRespond,
    afterTimeout: adomikAdapter.currentContext.timeouted
  };
};

adomikAdapter.sizeUtils = {
  sizeAlreadyExists: function sizeAlreadyExists(sizes, typedEventSize) {
    return __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_find_js___default()(sizes, function (size) {
      return size.height === typedEventSize.height && size.width === typedEventSize.width;
    });
  },
  formatSize: function formatSize(typedEventSize) {
    return {
      width: Number(typedEventSize.width),
      height: Number(typedEventSize.height)
    };
  },
  handleSize: function handleSize(sizes, typedEventSize) {
    var formattedSize = null;

    if (adomikAdapter.sizeUtils.sizeAlreadyExists(sizes, typedEventSize) === undefined) {
      formattedSize = adomikAdapter.sizeUtils.formatSize(typedEventSize);
    }

    return formattedSize;
  }
};

adomikAdapter.buildTypedEvents = function () {
  var groupedTypedEvents = [];
  adomikAdapter.bucketEvents.forEach(function (typedEvent, i) {
    var _ref2 = [typedEvent.event.placementCode, typedEvent.type],
        placementCode = _ref2[0],
        type = _ref2[1];
    var existTypedEvent = __WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_find_index_js___default()(groupedTypedEvents, function (groupedTypedEvent) {
      return groupedTypedEvent.placementCode === placementCode;
    });

    if (existTypedEvent === -1) {
      groupedTypedEvents.push(_defineProperty({
        placementCode: placementCode
      }, type, [typedEvent]));
      existTypedEvent = groupedTypedEvents.length - 1;
    }

    if (groupedTypedEvents[existTypedEvent][type]) {
      groupedTypedEvents[existTypedEvent][type] = [].concat(_toConsumableArray(groupedTypedEvents[existTypedEvent][type]), [typedEvent]);
    } else {
      groupedTypedEvents[existTypedEvent][type] = [typedEvent];
    }
  });
  return groupedTypedEvents;
};

adomikAdapter.adapterEnableAnalytics = adomikAdapter.enableAnalytics;

adomikAdapter.enableAnalytics = function (config) {
  adomikAdapter.currentContext = {};
  var initOptions = config.options;

  if (initOptions) {
    adomikAdapter.currentContext = {
      uid: initOptions.id,
      url: initOptions.url,
      id: '',
      timeouted: false
    };
    Object(__WEBPACK_IMPORTED_MODULE_3__src_utils_js__["logInfo"])('Adomik Analytics enabled with config', initOptions);
    adomikAdapter.adapterEnableAnalytics(config);
  }
};

__WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__["default"].registerAnalyticsAdapter({
  adapter: adomikAdapter,
  code: 'adomik'
});
/* harmony default export */ __webpack_exports__["default"] = (adomikAdapter);

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

},[213]);