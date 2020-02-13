pbjsChunk([24],{

/***/ 395:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(396);


/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapterManager__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_constants_json__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__src_constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_utils__ = __webpack_require__(0);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





var _CONSTANTS$EVENTS = __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS,
    BID_REQUESTED = _CONSTANTS$EVENTS.BID_REQUESTED,
    BID_TIMEOUT = _CONSTANTS$EVENTS.BID_TIMEOUT,
    BID_RESPONSE = _CONSTANTS$EVENTS.BID_RESPONSE,
    BID_WON = _CONSTANTS$EVENTS.BID_WON;
var prebidVersion = "2.37.0";
var adapterConfig = {
  /** Name of the `rta` function, override only when instructed. */
  rtaFunctionName: 'rta',

  /** This is optional but highly recommended. The value returned by the
   *  function will be used as ad impression ad unit attribute value.
   *
   *  As such if you have placement (10293845) or ad unit codes
   *  (div-gpt-ad-124984-0) but you want these to be translated to meaningful
   *  values like 'SIDEBAR-AD-01-MOBILE' then this function shall express this
   *  mapping.
   */
  getAdUnitName: function getAdUnitName(placementOrAdUnitCode) {
    return placementOrAdUnitCode;
  },

  /**
   * Function used to extract placement/adUnitCode (depending on prebid
   * version).
   *
   * The extracted value will be passed to the `getAdUnitName()` for mapping into
   * human friendly value.
   */
  getPlacementOrAdUnitCode: function getPlacementOrAdUnitCode(bid, version) {
    return version[0] === '0' ? bid.placementCode : bid.adUnitCode;
  },

  /**
   * Optional reference to Google Publisher Tag (gpt)
   */
  googlePublisherTag: false,

  /**
   * Do not override unless instructed. Useful for testing. Allows to redefined
   * the event that triggers the ad impression event.
   */
  wireGooglePublisherTag: function wireGooglePublisherTag(gpt, cb) {
    gpt.pubads().addEventListener('slotRenderEnded', function (event) {
      cb(event.slot);
    });
  },

  /**
   * Map which keeps BID_WON events. Keyed by adId property.
   */
  prebidWinnersCache: {},

  /**
   * Map which keeps all BID_RESPONSE events. Keyed by adId property.
   */
  prebidBidResponsesCache: {},

  /**
   * Decides if the GPT slot contains prebid ad impression or not.
   *
   * When BID_WON event is emitted adid is added to prebidWinnersCache,
   * then we check if prebidWinnersCache contains slot.hb_adid.
   *
   * This function is optional and used only when googlePublisherTag is provided.
   *
   * Default implementation uses slot's `hb_adid` targeting parameter.
   *
   * @param slot the gpt slot
   */
  isPrebidAdImpression: function isPrebidAdImpression(slot) {
    var hbAdIdTargeting = slot.getTargeting('hb_adid');

    if (hbAdIdTargeting.length > 0) {
      var hbAdId = hbAdIdTargeting[0];
      return typeof this.prebidWinnersCache[hbAdId] !== 'undefined';
    }

    return false;
  },

  /**
   * If isPrebidAdImpression decides that slot contain prebid ad impression,
   * this function should return prebids highest ad impression partner for that
   * slot.
   *
   * Default implementation uses slot's `hb_adid` targeting value to find
   * highest bid response and when present then returns `bidder`.
   *
   * @param instanceConfig merged analytics adapter instance configuration
   * @param slot the gpt slot for which the name of the highest bidder shall be
   * returned
   * @param version the version of the prebid.js library
   */
  getHighestPrebidAdImpressionPartner: function getHighestPrebidAdImpressionPartner(instanceConfig, slot, version) {
    var bid = getHighestPrebidBidResponseBySlotTargeting(instanceConfig, slot, version); // this is bid response event has `bidder` while bid won has bidderCode property

    return bid ? bid.bidderCode || bid.bidder : null;
  },

  /**
   * If isPrebidAdImpression decides that slot contain prebid ad impression,
   * this function should return prebids highest ad impression value for that
   * slot.
   *
   * Default implementation uses slot's `hb_adid` targeting value to find
   * highest bid response and when present then returns `cpm`.
   *
   * @param instanceConfig merged analytics adapter instance configuration
   * @param slot the gpt slot for which the highest ad impression value shall be
   * returned
   * @param version the version of the prebid.js library
   */
  getHighestPrebidAdImpressionValue: function getHighestPrebidAdImpressionValue(instanceConfig, slot, version) {
    var bid = getHighestPrebidBidResponseBySlotTargeting(instanceConfig, slot, version);
    return bid ? bid.cpm : null;
  },

  /**
   * This function should return proper ad unit name for slot given as a
   * parameter. Unit names returned by this function should be meaningful, for
   * example 'FOO_728x90_TOP'. The values returned shall be inline with
   * `getAdUnitName`.
   *
   * Required when googlePublisherTag is defined.
   *
   * @param slot the gpt slot to translate into friendly name
   * @param version the version of the prebid.js library
   */
  getAdUnitNameByGooglePublisherTagSlot: function getAdUnitNameByGooglePublisherTagSlot(slot, version) {
    throw 'Required when googlePublisherTag is defined.';
  },

  /**
   * Function used to prepare and return parameters provided to rta.
   * More information will be in docs given by LiveYield team.
   *
   * When googlePublisherTag is not provided, second parameter(slot) will always
   * equal null.
   *
   * @param resolution the original ad impression details
   * @param slot gpt slot, will be empty in pure Prebid.js-case (when
   *             googlePublisherTag is not provided)
   * @param hbPartner the name of the highest bidding partner
   * @param hbValue the value of the highest bid
   * @param version version of the prebid.js library
   */
  postProcessResolution: function postProcessResolution(resolution, slot, hbPartner, hbValue, version) {
    return resolution;
  }
};

var cpmToMicroUSD = function cpmToMicroUSD(v) {
  return isNaN(v) ? 0 : Math.round(v * 1000);
};

var getHighestPrebidBidResponseBySlotTargeting = function getHighestPrebidBidResponseBySlotTargeting(instanceConfig, slot, version) {
  var hbAdIdTargeting = slot.getTargeting('hb_adid');

  if (hbAdIdTargeting.length > 0) {
    var hbAdId = hbAdIdTargeting[0];
    return instanceConfig.prebidWinnersCache[hbAdId] || instanceConfig.prebidBidResponsesCache[hbAdId];
  }

  return null;
};

var liveyield = _extends(Object(__WEBPACK_IMPORTED_MODULE_0__src_AnalyticsAdapter__["a" /* default */])({
  analyticsType: 'bundle'
}), {
  track: function track(_ref) {
    var eventType = _ref.eventType,
        args = _ref.args;

    switch (eventType) {
      case BID_REQUESTED:
        args.bids.forEach(function (b) {
          try {
            window[liveyield.instanceConfig.rtaFunctionName]('bidRequested', liveyield.instanceConfig.getAdUnitName(liveyield.instanceConfig.getPlacementOrAdUnitCode(b, prebidVersion)), args.bidderCode);
          } catch (e) {
            __WEBPACK_IMPORTED_MODULE_3__src_utils__["logError"](e);
          }
        });
        break;

      case BID_RESPONSE:
        liveyield.instanceConfig.prebidBidResponsesCache[args.adId] = args;
        var cpm = args.statusMessage === 'Bid available' ? args.cpm : null;

        try {
          window[liveyield.instanceConfig.rtaFunctionName]('addBid', liveyield.instanceConfig.getAdUnitName(liveyield.instanceConfig.getPlacementOrAdUnitCode(args, prebidVersion)), args.bidder || 'unknown', cpmToMicroUSD(cpm), typeof args.bidder === 'undefined', args.statusMessage !== 'Bid available');
        } catch (e) {
          __WEBPACK_IMPORTED_MODULE_3__src_utils__["logError"](e);
        }

        break;

      case BID_TIMEOUT:
        window[liveyield.instanceConfig.rtaFunctionName]('biddersTimeout', args);
        break;

      case BID_WON:
        liveyield.instanceConfig.prebidWinnersCache[args.adId] = args;

        if (liveyield.instanceConfig.googlePublisherTag) {
          break;
        }

        try {
          var ad = liveyield.instanceConfig.getAdUnitName(liveyield.instanceConfig.getPlacementOrAdUnitCode(args, prebidVersion));

          if (!ad) {
            __WEBPACK_IMPORTED_MODULE_3__src_utils__["logError"]('Cannot find ad by unit name: ' + liveyield.instanceConfig.getAdUnitName(liveyield.instanceConfig.getPlacementOrAdUnitCode(args, prebidVersion)));
            break;
          }

          if (!args.bidderCode || !args.cpm) {
            __WEBPACK_IMPORTED_MODULE_3__src_utils__["logError"]('Bidder code or cpm is not valid');
            break;
          }

          var resolution = {
            targetings: []
          };
          resolution.prebidWon = true;
          resolution.prebidPartner = args.bidderCode;
          resolution.prebidValue = cpmToMicroUSD(parseFloat(args.cpm));
          var resolutionToUse = liveyield.instanceConfig.postProcessResolution(resolution, null, resolution.prebidPartner, resolution.prebidValue, prebidVersion);
          window[liveyield.instanceConfig.rtaFunctionName]('resolveSlot', liveyield.instanceConfig.getAdUnitName(liveyield.instanceConfig.getPlacementOrAdUnitCode(args, prebidVersion)), resolutionToUse);
        } catch (e) {
          __WEBPACK_IMPORTED_MODULE_3__src_utils__["logError"](e);
        }

        break;
    }
  }
});

liveyield.originEnableAnalytics = liveyield.enableAnalytics;
/**
 * Minimal valid config:
 *
 * ```
 * {
 *   provider: 'liveyield',
 *   options: {
 *      // will be provided by the LiveYield team
 *     customerId: 'UUID',
 *      // will be provided by the LiveYield team,
 *     customerName: 'Customer Name',
 *      // do NOT use window.location.host, use constant value
 *     customerSite: 'Fixed Site Name',
 *     // this is used to be inline with GA 'sessionizer' which closes the session on midnight (EST-time).
 *     sessionTimezoneOffset: '-300'
 *   }
 * }
 * ```
 */

liveyield.enableAnalytics = function (config) {
  if (!config || !config.provider || config.provider !== 'liveyield') {
    __WEBPACK_IMPORTED_MODULE_3__src_utils__["logError"]('expected config.provider to equal liveyield');
    return;
  }

  if (!config.options) {
    __WEBPACK_IMPORTED_MODULE_3__src_utils__["logError"]('options must be defined');
    return;
  }

  if (!config.options.customerId) {
    __WEBPACK_IMPORTED_MODULE_3__src_utils__["logError"]('options.customerId is required');
    return;
  }

  if (!config.options.customerName) {
    __WEBPACK_IMPORTED_MODULE_3__src_utils__["logError"]('options.customerName is required');
    return;
  }

  if (!config.options.customerSite) {
    __WEBPACK_IMPORTED_MODULE_3__src_utils__["logError"]('options.customerSite is required');
    return;
  }

  if (!config.options.sessionTimezoneOffset) {
    __WEBPACK_IMPORTED_MODULE_3__src_utils__["logError"]('options.sessionTimezoneOffset is required');
    return;
  }

  liveyield.instanceConfig = _extends({
    prebidWinnersCache: {},
    prebidBidResponsesCache: {}
  }, adapterConfig, config.options);

  if (typeof window[liveyield.instanceConfig.rtaFunctionName] !== 'function') {
    __WEBPACK_IMPORTED_MODULE_3__src_utils__["logError"]("Function ".concat(liveyield.instanceConfig.rtaFunctionName, " is not defined.") + "Make sure that LiveYield snippet in included before the Prebid Analytics configuration.");
    return;
  }

  if (liveyield.instanceConfig.googlePublisherTag) {
    liveyield.instanceConfig.wireGooglePublisherTag(liveyield.instanceConfig.googlePublisherTag, onSlotRenderEnded(liveyield.instanceConfig));
  }

  var additionalParams = {
    customerTimezone: config.options.customerTimezone,
    contentId: config.options.contentId,
    contentPart: config.options.contentPart,
    contentAuthor: config.options.contentAuthor,
    contentTitle: config.options.contentTitle,
    contentCategory: config.options.contentCategory,
    contentLayout: config.options.contentLayout,
    contentVariants: config.options.contentVariants,
    contentTimezone: config.options.contentTimezone,
    cstringDim1: config.options.cstringDim1,
    cstringDim2: config.options.cstringDim2,
    cintDim1: config.options.cintDim1,
    cintDim2: config.options.cintDim2,
    cintArrayDim1: config.options.cintArrayDim1,
    cintArrayDim2: config.options.cintArrayDim2,
    cuniqueStringMet1: config.options.cuniqueStringMet1,
    cuniqueStringMet2: config.options.cuniqueStringMet2,
    cavgIntMet1: config.options.cavgIntMet1,
    cavgIntMet2: config.options.cavgIntMet2,
    csumIntMet1: config.options.csumIntMet1,
    csumIntMet2: config.options.csumIntMet2
  };
  Object.keys(additionalParams).forEach(function (key) {
    return additionalParams[key] == null && delete additionalParams[key];
  });
  window[liveyield.instanceConfig.rtaFunctionName]('create', config.options.customerId, config.options.customerName, config.options.customerSite, config.options.sessionTimezoneOffset, additionalParams);
  liveyield.originEnableAnalytics(config);
};

var onSlotRenderEnded = function onSlotRenderEnded(instanceConfig) {
  var addDfpDetails = function addDfpDetails(resolution, slot) {
    var responseInformation = slot.getResponseInformation();

    if (responseInformation) {
      resolution.dfpAdvertiserId = responseInformation.advertiserId;
      resolution.dfpLineItemId = responseInformation.sourceAgnosticLineItemId;
      resolution.dfpCreativeId = responseInformation.creativeId;
    }
  };

  var addPrebidDetails = function addPrebidDetails(resolution, slot) {
    if (instanceConfig.isPrebidAdImpression(slot)) {
      resolution.prebidWon = true;
    }

    var highestPrebidAdImpPartner = instanceConfig.getHighestPrebidAdImpressionPartner(instanceConfig, slot, prebidVersion);
    var highestPrebidAdImpValue = instanceConfig.getHighestPrebidAdImpressionValue(instanceConfig, slot, prebidVersion);

    if (highestPrebidAdImpPartner) {
      resolution.prebidPartner = highestPrebidAdImpPartner;
    }

    if (highestPrebidAdImpValue) {
      resolution.prebidValue = cpmToMicroUSD(parseFloat(highestPrebidAdImpValue));
    }
  };

  return function (slot) {
    var resolution = {
      targetings: []
    };
    addDfpDetails(resolution, slot);
    addPrebidDetails(resolution, slot);
    var resolutionToUse = instanceConfig.postProcessResolution(resolution, slot, resolution.highestPrebidAdImpPartner, resolution.highestPrebidAdImpValue, prebidVersion);
    window[instanceConfig.rtaFunctionName]('resolveSlot', instanceConfig.getAdUnitNameByGooglePublisherTagSlot(slot, prebidVersion), resolutionToUse);
  };
};

__WEBPACK_IMPORTED_MODULE_1__src_adapterManager__["default"].registerAnalyticsAdapter({
  adapter: liveyield,
  code: 'liveyield'
});
/* harmony default export */ __webpack_exports__["default"] = (liveyield);

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

},[395]);