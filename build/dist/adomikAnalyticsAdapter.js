pbjsChunk([0],{

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

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(25);
var $find = __webpack_require__(39)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY]((function () { forced = false; }));
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(27)(KEY);


/***/ }),

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(42);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(112);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(21);
var isArray = __webpack_require__(113);
var SPECIES = __webpack_require__(114)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(41);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(115)('wks');
var uid = __webpack_require__(117);
var Symbol = __webpack_require__(20).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(16);
var global = __webpack_require__(20);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(116) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ 116:
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ 117:
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(119);
module.exports = __webpack_require__(16).Array.findIndex;


/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(25);
var $find = __webpack_require__(39)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY]((function () { forced = false; }));
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(27)(KEY);


/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(37);
var IObject = __webpack_require__(40);
var toObject = __webpack_require__(110);
var toLength = __webpack_require__(43);
var asc = __webpack_require__(111);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(98);


/***/ }),

/***/ 98:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _AnalyticsAdapter = __webpack_require__(10);

var _AnalyticsAdapter2 = _interopRequireDefault(_AnalyticsAdapter);

var _constants = __webpack_require__(3);

var _constants2 = _interopRequireDefault(_constants);

var _adaptermanager = __webpack_require__(1);

var _adaptermanager2 = _interopRequireDefault(_adaptermanager);

var _utils = __webpack_require__(0);

var _find = __webpack_require__(99);

var _find2 = _interopRequireDefault(_find);

var _findIndex = __webpack_require__(118);

var _findIndex2 = _interopRequireDefault(_findIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Events used in adomik analytics adapter
var auctionInit = _constants2['default'].EVENTS.AUCTION_INIT;
var auctionEnd = _constants2['default'].EVENTS.AUCTION_END;
var bidRequested = _constants2['default'].EVENTS.BID_REQUESTED;
var bidResponse = _constants2['default'].EVENTS.BID_RESPONSE;
var bidWon = _constants2['default'].EVENTS.BID_WON;
var bidTimeout = _constants2['default'].EVENTS.BID_TIMEOUT;

var adomikAdapter = _extends((0, _AnalyticsAdapter2['default'])({}), {
  // Track every event needed
  track: function track(_ref) {
    var eventType = _ref.eventType,
        args = _ref.args;

    switch (eventType) {
      case auctionInit:
        adomikAdapter.initializeBucketEvents();
        adomikAdapter.currentContext.id = args.requestId;
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
        args.bids.forEach((function (bid) {
          adomikAdapter.bucketEvents.push({
            type: 'request',
            event: {
              bidder: bid.bidder.toUpperCase(),
              placementCode: bid.placementCode
            }
          });
        }));
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
    eventsByPlacementCode: groupedTypedEvents.map((function (typedEventsByType) {
      var sizes = [];
      var eventKeys = ['request', 'response', 'winner'];
      var events = {};

      eventKeys.forEach((function (eventKey) {
        events[eventKey + 's'] = [];
        if (typedEventsByType[eventKey] !== undefined) {
          typedEventsByType[eventKey].forEach((function (typedEvent) {
            if (typedEvent.event.size !== undefined) {
              var size = adomikAdapter.sizeUtils.handleSize(sizes, typedEvent.event.size);
              if (size !== null) {
                sizes = [].concat(_toConsumableArray(sizes), [size]);
              }
            }
            events[eventKey + 's'] = [].concat(_toConsumableArray(events[eventKey + 's']), [typedEvent.event]);
          }));
        }
      }));

      return {
        placementCode: typedEventsByType.placementCode,
        sizes: sizes,
        events: events
      };
    }))
  };

  var stringBulkEvents = JSON.stringify(bulkEvents);
  (0, _utils.logInfo)('Events sent to adomik prebid analytic ' + stringBulkEvents);

  // Encode object in base64
  var encodedBuf = window.btoa(stringBulkEvents);

  // Create final url and split it in 1600 characters max (+endpoint length)
  var encodedUri = encodeURIComponent(encodedBuf);
  var splittedUrl = encodedUri.match(/.{1,1600}/g);

  splittedUrl.forEach((function (split, i) {
    var partUrl = split + '&id=' + adomikAdapter.currentContext.id + '&part=' + i + '&on=' + (splittedUrl.length - 1);
    var img = new Image(1, 1);
    img.src = 'https://' + adomikAdapter.currentContext.url + '/?q=' + partUrl;
  }));
};

adomikAdapter.sendWonEvent = function (wonEvent) {
  var stringWonEvent = JSON.stringify(wonEvent);
  (0, _utils.logInfo)('Won event sent to adomik prebid analytic ' + wonEvent);

  // Encode object in base64
  var encodedBuf = window.btoa(stringWonEvent);
  var encodedUri = encodeURIComponent(encodedBuf);
  var img = new Image(1, 1);
  img.src = 'https://' + adomikAdapter.currentContext.url + '/?q=' + encodedUri + '&id=' + adomikAdapter.currentContext.id + '&won=true';
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
    return (0, _find2['default'])(sizes, (function (size) {
      return size.height === typedEventSize.height && size.width === typedEventSize.width;
    }));
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
  adomikAdapter.bucketEvents.forEach((function (typedEvent, i) {
    var _ref2 = [typedEvent.event.placementCode, typedEvent.type],
        placementCode = _ref2[0],
        type = _ref2[1];

    var existTypedEvent = (0, _findIndex2['default'])(groupedTypedEvents, (function (groupedTypedEvent) {
      return groupedTypedEvent.placementCode === placementCode;
    }));

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
  }));

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
    (0, _utils.logInfo)('Adomik Analytics enabled with config', initOptions);
    adomikAdapter.adapterEnableAnalytics(config);
  }
};

_adaptermanager2['default'].registerAnalyticsAdapter({
  adapter: adomikAdapter,
  code: 'adomik'
});

exports['default'] = adomikAdapter;

/***/ }),

/***/ 99:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(100);
module.exports = __webpack_require__(16).Array.find;


/***/ })

},[97]);