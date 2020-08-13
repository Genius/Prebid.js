pbjsChunk([47],{

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(171);


/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapterManager_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_constants_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__src_constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_ajax_js__ = __webpack_require__(4);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





var analyticsType = 'endpoint';
var url = 'https://analytics.wmgroup.us/analytic/collection';
var _CONSTANTS$EVENTS = __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS,
    AUCTION_INIT = _CONSTANTS$EVENTS.AUCTION_INIT,
    AUCTION_END = _CONSTANTS$EVENTS.AUCTION_END,
    BID_REQUESTED = _CONSTANTS$EVENTS.BID_REQUESTED,
    BID_WON = _CONSTANTS$EVENTS.BID_WON,
    BID_TIMEOUT = _CONSTANTS$EVENTS.BID_TIMEOUT,
    NO_BID = _CONSTANTS$EVENTS.NO_BID,
    BID_RESPONSE = _CONSTANTS$EVENTS.BID_RESPONSE;
var timestampInit = null;
var noBidArray = [];
var noBidObject = {};
var isBidArray = [];
var isBidObject = {};
var bidTimeOutArray = [];
var bidTimeOutObject = {};
var bidWonArray = [];
var bidWonObject = {};
var initOptions = {};

function postAjax(url, data) {
  Object(__WEBPACK_IMPORTED_MODULE_3__src_ajax_js__["a" /* ajax */])(url, function () {}, data, {
    contentType: 'application/json',
    method: 'POST'
  });
}

function handleInitSizes(adUnits) {
  return adUnits.map(function (adUnit) {
    return adUnit.sizes.toString() || '';
  });
}

function handleInitTypes(adUnits) {
  return adUnits.map(function (adUnit) {
    return Object.keys(adUnit.mediaTypes).toString();
  });
}

function detectDevice() {
  if (/ipad|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase())) {
    return 'tablet';
  }

  if (/iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(navigator.userAgent.toLowerCase())) {
    return 'mobile';
  }

  return 'desktop';
}

function detectOsAndBrowser() {
  var module = {
    options: [],
    header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
    dataos: [{
      name: 'Windows Phone',
      value: 'Windows Phone',
      version: 'OS'
    }, {
      name: 'Windows',
      value: 'Win',
      version: 'NT'
    }, {
      name: 'iOS',
      value: 'iPhone',
      version: 'OS'
    }, {
      name: 'iOS',
      value: 'iPad',
      version: 'OS'
    }, {
      name: 'Kindle',
      value: 'Silk',
      version: 'Silk'
    }, {
      name: 'Android',
      value: 'Android',
      version: 'Android'
    }, {
      name: 'PlayBook',
      value: 'PlayBook',
      version: 'OS'
    }, {
      name: 'BlackBerry',
      value: 'BlackBerry',
      version: '/'
    }, {
      name: 'Macintosh',
      value: 'Mac',
      version: 'OS X'
    }, {
      name: 'Linux',
      value: 'Linux',
      version: 'rv'
    }, {
      name: 'Palm',
      value: 'Palm',
      version: 'PalmOS'
    }],
    databrowser: [{
      name: 'Yandex Browser',
      value: 'YaBrowser',
      version: 'YaBrowser'
    }, {
      name: 'Opera Mini',
      value: 'Opera Mini',
      version: 'Opera Mini'
    }, {
      name: 'Amigo',
      value: 'Amigo',
      version: 'Amigo'
    }, {
      name: 'Atom',
      value: 'Atom',
      version: 'Atom'
    }, {
      name: 'Opera',
      value: 'OPR',
      version: 'OPR'
    }, {
      name: 'Edge',
      value: 'Edge',
      version: 'Edge'
    }, {
      name: 'Internet Explorer',
      value: 'Trident',
      version: 'rv'
    }, {
      name: 'Chrome',
      value: 'Chrome',
      version: 'Chrome'
    }, {
      name: 'Firefox',
      value: 'Firefox',
      version: 'Firefox'
    }, {
      name: 'Safari',
      value: 'Safari',
      version: 'Version'
    }, {
      name: 'Internet Explorer',
      value: 'MSIE',
      version: 'MSIE'
    }, {
      name: 'Opera',
      value: 'Opera',
      version: 'Opera'
    }, {
      name: 'BlackBerry',
      value: 'CLDC',
      version: 'CLDC'
    }, {
      name: 'Mozilla',
      value: 'Mozilla',
      version: 'Mozilla'
    }],
    init: function init() {
      var agent = this.header.join(' ');
      var os = this.matchItem(agent, this.dataos);
      var browser = this.matchItem(agent, this.databrowser);
      return {
        os: os,
        browser: browser
      };
    },
    getVersion: function getVersion(name, version) {
      if (name === 'Windows') {
        switch (parseFloat(version).toFixed(1)) {
          case '5.0':
            return '2000';

          case '5.1':
            return 'XP';

          case '5.2':
            return 'Server 2003';

          case '6.0':
            return 'Vista';

          case '6.1':
            return '7';

          case '6.2':
            return '8';

          case '6.3':
            return '8.1';

          default:
            return parseInt(version) || 'other';
        }
      } else return parseInt(version) || 'other';
    },
    matchItem: function matchItem(string, data) {
      var i = 0;
      var j = 0;
      var regex, regexv, match, matches, version;

      for (i = 0; i < data.length; i += 1) {
        regex = new RegExp(data[i].value, 'i');
        match = regex.test(string);

        if (match) {
          regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
          matches = string.match(regexv);
          version = '';

          if (matches) {
            if (matches[1]) {
              matches = matches[1];
            }
          }

          if (matches) {
            matches = matches.split(/[._]+/);

            for (j = 0; j < matches.length; j += 1) {
              if (j === 0) {
                version += matches[j] + '.';
              } else {
                version += matches[j];
              }
            }
          } else {
            version = 'other';
          }

          return {
            name: data[i].name,
            version: this.getVersion(data[i].name, version)
          };
        }
      }

      return {
        name: 'unknown',
        version: 'other'
      };
    }
  };
  var e = module.init();
  var result = {};
  result.os = e.os.name + ' ' + e.os.version;
  result.browser = e.browser.name + ' ' + e.browser.version;
  return result;
}

function handleAuctionInit(eventType, args) {
  initOptions.c_timeout = args.timeout;
  initOptions.ad_unit_size = handleInitSizes(args.adUnits);
  initOptions.ad_unit_type = handleInitTypes(args.adUnits);
  initOptions.device = detectDevice();
  initOptions.os = detectOsAndBrowser().os;
  initOptions.browser = detectOsAndBrowser().browser;
  timestampInit = args.timestamp;
}

function parseBidType(mediaTypes, mediaType) {
  if (!mediaTypes) {
    return [mediaType];
  } else {
    return Object.keys(mediaTypes) || [''];
  }
}

function parseSizes(sizes, width, height) {
  if (sizes !== undefined) {
    return sizes.map(function (s) {
      return s.toString();
    });
  } else {
    return ["".concat(width, ",").concat(height)];
  }
}

function mapObject(_ref) {
  var bidder = _ref.bidder,
      adUnitCode = _ref.adUnitCode,
      auctionId = _ref.auctionId,
      transactionId = _ref.transactionId,
      sizes = _ref.sizes,
      size = _ref.size,
      mediaTypes = _ref.mediaTypes,
      mediaType = _ref.mediaType,
      cpm = _ref.cpm,
      currency = _ref.currency,
      originalCpm = _ref.originalCpm,
      originalCurrency = _ref.originalCurrency,
      height = _ref.height,
      width = _ref.width;
  return {
    bidder: bidder,
    auction_id: auctionId,
    ad_unit_code: adUnitCode,
    transaction_id: transactionId || '',
    bid_size: size || sizes || width && height !== undefined ? parseSizes(sizes, width, height) : [''],
    bid_type: mediaType || mediaTypes ? parseBidType(mediaTypes, mediaType) : [''],
    time_ms: Date.now() - timestampInit,
    cur: originalCurrency !== undefined ? originalCurrency : currency || '',
    price: cpm !== undefined ? cpm.toString().substring(0, 4) : '',
    cur_native: originalCurrency || '',
    price_native: originalCpm !== undefined ? originalCpm.toString().substring(0, 4) : ''
  };
}

function mapUpLevelObject(object, eventType, array) {
  _extends(object, {
    status: eventType || '',
    bids: array || []
  });
}

function handleEvent(array, object, eventType, args) {
  array.push(mapObject(args));
  mapUpLevelObject(object, eventType, array);
}

function handleNoBid(eventType, args) {
  handleEvent(noBidArray, noBidObject, eventType, args);
}

function handleBidResponse(eventType, args) {
  handleEvent(isBidArray, isBidObject, eventType, args);
}

function handleBidTimeout(eventType, args) {
  args.forEach(function (bid) {
    bidTimeOutArray.push(mapObject(bid));
  });
  mapUpLevelObject(bidTimeOutObject, eventType, bidTimeOutArray);
}

function handleBidWon(eventType, args) {
  handleEvent(bidWonArray, bidWonObject, eventType, args);
  sendRequest(bidWonObject);
}

function handleBidRequested(args) {}

function sendRequest() {
  for (var _len = arguments.length, objects = new Array(_len), _key = 0; _key < _len; _key++) {
    objects[_key] = arguments[_key];
  }

  var obj = {
    publisher_id: initOptions.publisher_id.toString() || '',
    site: initOptions.site || '',
    ad_unit_size: initOptions.ad_unit_size || [''],
    ad_unit_type: initOptions.ad_unit_type || [''],
    device: initOptions.device || '',
    os: initOptions.os || '',
    browser: initOptions.browser || '',
    c_timeout: initOptions.c_timeout || 0,
    events: Object.keys(objects).length ? objects : []
  };
  postAjax(url, JSON.stringify(obj));
}

function handleAuctionEnd() {
  sendRequest(noBidObject, isBidObject, bidTimeOutObject);
}

var adWMGAnalyticsAdapter = _extends(Object(__WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter_js__["a" /* default */])({
  url: url,
  analyticsType: analyticsType
}), {
  track: function track(_ref2) {
    var eventType = _ref2.eventType,
        args = _ref2.args;

    switch (eventType) {
      case AUCTION_INIT:
        handleAuctionInit(eventType, args);
        break;

      case BID_REQUESTED:
        handleBidRequested(args);
        break;

      case BID_RESPONSE:
        handleBidResponse(eventType, args);
        break;

      case NO_BID:
        handleNoBid(eventType, args);
        break;

      case BID_TIMEOUT:
        handleBidTimeout(eventType, args);
        break;

      case BID_WON:
        handleBidWon(eventType, args);
        break;

      case AUCTION_END:
        handleAuctionEnd();
    }
  }
});

adWMGAnalyticsAdapter.originEnableAnalytics = adWMGAnalyticsAdapter.enableAnalytics;

adWMGAnalyticsAdapter.enableAnalytics = function (config) {
  initOptions = config.options;
  adWMGAnalyticsAdapter.originEnableAnalytics(config);
};

__WEBPACK_IMPORTED_MODULE_1__src_adapterManager_js__["default"].registerAnalyticsAdapter({
  adapter: adWMGAnalyticsAdapter,
  code: 'adWMG'
});
/* harmony default export */ __webpack_exports__["default"] = (adWMGAnalyticsAdapter);

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

},[170]);