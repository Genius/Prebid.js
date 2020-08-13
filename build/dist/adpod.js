pbjsChunk([299],{

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(222);


/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["callPrebidCacheHook"] = callPrebidCacheHook;
/* harmony export (immutable) */ __webpack_exports__["checkAdUnitSetupHook"] = checkAdUnitSetupHook;
/* harmony export (immutable) */ __webpack_exports__["checkVideoBidSetupHook"] = checkVideoBidSetupHook;
/* harmony export (immutable) */ __webpack_exports__["adpodSetConfig"] = adpodSetConfig;
/* harmony export (immutable) */ __webpack_exports__["callPrebidCacheAfterAuction"] = callPrebidCacheAfterAuction;
/* harmony export (immutable) */ __webpack_exports__["sortByPricePerSecond"] = sortByPricePerSecond;
/* harmony export (immutable) */ __webpack_exports__["getTargeting"] = getTargeting;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_auction_js__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_prebid_js__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_video_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_hook_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_videoCache_js__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_pure_features_set__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_pure_features_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_pure_features_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_pure_features_array_find_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__src_auctionManager_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_constants_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__src_constants_json__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * This module houses the functionality to evaluate and process adpod adunits/bids.  Specifically there are several hooked functions,
 * that either supplement the base function (ie to check something additional or unique to adpod objects) or to replace the base function
 * entirely when appropriate.
 *
 * Brief outline of each hook:
 * - `callPrebidCacheHook` - for any adpod bids, this function will temporarily hold them in a queue in order to send the bids to Prebid Cache in bulk
 * - `checkAdUnitSetupHook` - evaluates the adUnits to ensure that required fields for adpod adUnits are present.  Invalid adpod adUntis are removed from the array.
 * - `checkVideoBidSetupHook` - evaluates the adpod bid returned from an adaptor/bidder to ensure required fields are populated; also initializes duration bucket field.
 *
 * To initialize the module, there is an `initAdpodHooks()` function that should be imported and executed by a corresponding `...AdServerVideo`
 * module that designed to support adpod video type ads.  This import process allows this module to effectively act as a sub-module.
 */













var from = __webpack_require__(89);

var TARGETING_KEY_PB_CAT_DUR = 'hb_pb_cat_dur';
var TARGETING_KEY_CACHE_ID = 'hb_cache_id';
var queueTimeDelay = 50;
var queueSizeLimit = 5;
var bidCacheRegistry = createBidCacheRegistry();
/**
 * Create a registry object that stores/manages bids while be held in queue for Prebid Cache.
 * @returns registry object with defined accessor functions
 */

function createBidCacheRegistry() {
  var registry = {};

  function setupRegistrySlot(auctionId) {
    registry[auctionId] = {};
    registry[auctionId].bidStorage = new __WEBPACK_IMPORTED_MODULE_8_core_js_pure_features_set___default.a();
    registry[auctionId].queueDispatcher = createDispatcher(queueTimeDelay);
    registry[auctionId].initialCacheKey = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["generateUUID"]();
  }

  return {
    addBid: function addBid(bid) {
      // create parent level object based on auction ID (in case there are concurrent auctions running) to store objects for that auction
      if (!registry[bid.auctionId]) {
        setupRegistrySlot(bid.auctionId);
      }

      registry[bid.auctionId].bidStorage.add(bid);
    },
    removeBid: function removeBid(bid) {
      registry[bid.auctionId].bidStorage.delete(bid);
    },
    getBids: function getBids(bid) {
      return registry[bid.auctionId] && registry[bid.auctionId].bidStorage.values();
    },
    getQueueDispatcher: function getQueueDispatcher(bid) {
      return registry[bid.auctionId] && registry[bid.auctionId].queueDispatcher;
    },
    setupInitialCacheKey: function setupInitialCacheKey(bid) {
      if (!registry[bid.auctionId]) {
        registry[bid.auctionId] = {};
        registry[bid.auctionId].initialCacheKey = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["generateUUID"]();
      }
    },
    getInitialCacheKey: function getInitialCacheKey(bid) {
      return registry[bid.auctionId] && registry[bid.auctionId].initialCacheKey;
    }
  };
}
/**
 * Creates a function that when called updates the bid queue and extends the running timer (when called subsequently).
 * Once the time threshold for the queue (defined by queueSizeLimit) is reached, the queue will be flushed by calling the `firePrebidCacheCall` function.
 * If there is a long enough time between calls (based on timeoutDration), the queue will automatically flush itself.
 * @param {Number} timeoutDuration number of milliseconds to pass before timer expires and current bid queue is flushed
 * @returns {Function}
 */


function createDispatcher(timeoutDuration) {
  var timeout;
  var counter = 1;
  return function (auctionInstance, bidListArr, afterBidAdded, killQueue) {
    var context = this;

    var callbackFn = function callbackFn() {
      firePrebidCacheCall.call(context, auctionInstance, bidListArr, afterBidAdded);
    };

    clearTimeout(timeout);

    if (!killQueue) {
      // want to fire off the queue if either: size limit is reached or time has passed since last call to dispatcher
      if (counter === queueSizeLimit) {
        counter = 1;
        callbackFn();
      } else {
        counter++;
        timeout = setTimeout(callbackFn, timeoutDuration);
      }
    } else {
      counter = 1;
    }
  };
}

function getPricePartForAdpodKey(bid) {
  var pricePart;
  var prioritizeDeals = __WEBPACK_IMPORTED_MODULE_6__src_config_js__["b" /* config */].getConfig('adpod.prioritizeDeals');

  if (prioritizeDeals && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'video.dealTier')) {
    var adpodDealPrefix = __WEBPACK_IMPORTED_MODULE_6__src_config_js__["b" /* config */].getConfig("adpod.dealTier.".concat(bid.bidderCode, ".prefix"));
    pricePart = adpodDealPrefix ? adpodDealPrefix + __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'video.dealTier') : __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'video.dealTier');
  } else {
    var granularity = Object(__WEBPACK_IMPORTED_MODULE_1__src_auction_js__["i" /* getPriceGranularity */])(bid.mediaType);
    pricePart = Object(__WEBPACK_IMPORTED_MODULE_1__src_auction_js__["h" /* getPriceByGranularity */])(granularity)(bid);
  }

  return pricePart;
}
/**
 * This function reads certain fields from the bid to generate a specific key used for caching the bid in Prebid Cache
 * @param {Object} bid bid object to update
 * @param {Boolean} brandCategoryExclusion value read from setConfig; influences whether category is required or not
 */


function attachPriceIndustryDurationKeyToBid(bid, brandCategoryExclusion) {
  var initialCacheKey = bidCacheRegistry.getInitialCacheKey(bid);
  var duration = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'video.durationBucket');
  var pricePart = getPricePartForAdpodKey(bid);
  var pcd;

  if (brandCategoryExclusion) {
    var category = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'meta.adServerCatId');
    pcd = "".concat(pricePart, "_").concat(category, "_").concat(duration, "s");
  } else {
    pcd = "".concat(pricePart, "_").concat(duration, "s");
  }

  if (!bid.adserverTargeting) {
    bid.adserverTargeting = {};
  }

  bid.adserverTargeting[TARGETING_KEY_PB_CAT_DUR] = pcd;
  bid.adserverTargeting[TARGETING_KEY_CACHE_ID] = initialCacheKey;
  bid.videoCacheKey = initialCacheKey;
  bid.customCacheKey = "".concat(pcd, "_").concat(initialCacheKey);
}
/**
 * Updates the running queue for the associated auction.
 * Does a check to ensure the auction is still running; if it's not - the previously running queue is killed.
 * @param {*} auctionInstance running context of the auction
 * @param {Object} bidResponse bid object being added to queue
 * @param {Function} afterBidAdded callback function used when Prebid Cache responds
 */


function updateBidQueue(auctionInstance, bidResponse, afterBidAdded) {
  var bidListIter = bidCacheRegistry.getBids(bidResponse);

  if (bidListIter) {
    var bidListArr = from(bidListIter);
    var callDispatcher = bidCacheRegistry.getQueueDispatcher(bidResponse);
    var killQueue = !!(auctionInstance.getAuctionStatus() !== __WEBPACK_IMPORTED_MODULE_1__src_auction_js__["b" /* AUCTION_IN_PROGRESS */]);
    callDispatcher(auctionInstance, bidListArr, afterBidAdded, killQueue);
  } else {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('Attempted to cache a bid from an unknown auction. Bid:', bidResponse);
  }
}
/**
 * Small helper function to remove bids from internal storage; normally b/c they're about to sent to Prebid Cache for processing.
 * @param {Array[Object]} bidResponses list of bids to remove
 */


function removeBidsFromStorage(bidResponses) {
  for (var i = 0; i < bidResponses.length; i++) {
    bidCacheRegistry.removeBid(bidResponses[i]);
  }
}
/**
 * This function will send a list of bids to Prebid Cache.  It also removes the same bids from the internal bidCacheRegistry
 * to maintain which bids are in queue.
 * If the bids are successfully cached, they will be added to the respective auction.
 * @param {*} auctionInstance running context of the auction
 * @param {Array[Object]} bidList list of bid objects that need to be sent to Prebid Cache
 * @param {Function} afterBidAdded callback function used when Prebid Cache responds
 */


function firePrebidCacheCall(auctionInstance, bidList, afterBidAdded) {
  // remove entries now so other incoming bids won't accidentally have a stale version of the list while PBC is processing the current submitted list
  removeBidsFromStorage(bidList);
  Object(__WEBPACK_IMPORTED_MODULE_5__src_videoCache_js__["b" /* store */])(bidList, function (error, cacheIds) {
    if (error) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("Failed to save to the video cache: ".concat(error, ". Video bid(s) must be discarded."));

      for (var i = 0; i < bidList.length; i++) {
        Object(__WEBPACK_IMPORTED_MODULE_1__src_auction_js__["g" /* doCallbacksIfTimedout */])(auctionInstance, bidList[i]);
      }
    } else {
      for (var _i = 0; _i < cacheIds.length; _i++) {
        // when uuid in response is empty string then the key already existed, so this bid wasn't cached
        if (cacheIds[_i].uuid !== '') {
          Object(__WEBPACK_IMPORTED_MODULE_1__src_auction_js__["d" /* addBidToAuction */])(auctionInstance, bidList[_i]);
        } else {
          __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]("Detected a bid was not cached because the custom key was already registered.  Attempted to use key: ".concat(bidList[_i].customCacheKey, ". Bid was: "), bidList[_i]);
        }

        afterBidAdded();
      }
    }
  });
}
/**
 * This is the main hook function to handle adpod bids; maintains the logic to temporarily hold bids in a queue in order to send bulk requests to Prebid Cache.
 * @param {Function} fn reference to original function (used by hook logic)
 * @param {*} auctionInstance running context of the auction
 * @param {Object} bidResponse incoming bid; if adpod, will be processed through hook function.  If not adpod, returns to original function.
 * @param {Function} afterBidAdded callback function used when Prebid Cache responds
 * @param {Object} bidderRequest copy of bid's associated bidderRequest object
 */


function callPrebidCacheHook(fn, auctionInstance, bidResponse, afterBidAdded, bidderRequest) {
  var videoConfig = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidderRequest, 'mediaTypes.video');

  if (videoConfig && videoConfig.context === __WEBPACK_IMPORTED_MODULE_7__src_mediaTypes_js__["a" /* ADPOD */]) {
    var brandCategoryExclusion = __WEBPACK_IMPORTED_MODULE_6__src_config_js__["b" /* config */].getConfig('adpod.brandCategoryExclusion');
    var adServerCatId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidResponse, 'meta.adServerCatId');

    if (!adServerCatId && brandCategoryExclusion) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('Detected a bid without meta.adServerCatId while setConfig({adpod.brandCategoryExclusion}) was enabled.  This bid has been rejected:', bidResponse);
      afterBidAdded();
    } else {
      if (__WEBPACK_IMPORTED_MODULE_6__src_config_js__["b" /* config */].getConfig('adpod.deferCaching') === false) {
        bidCacheRegistry.addBid(bidResponse);
        attachPriceIndustryDurationKeyToBid(bidResponse, brandCategoryExclusion);
        updateBidQueue(auctionInstance, bidResponse, afterBidAdded);
      } else {
        // generate targeting keys for bid
        bidCacheRegistry.setupInitialCacheKey(bidResponse);
        attachPriceIndustryDurationKeyToBid(bidResponse, brandCategoryExclusion); // add bid to auction

        Object(__WEBPACK_IMPORTED_MODULE_1__src_auction_js__["d" /* addBidToAuction */])(auctionInstance, bidResponse);
        afterBidAdded();
      }
    }
  } else {
    fn.call(this, auctionInstance, bidResponse, afterBidAdded, bidderRequest);
  }
}
/**
 * This hook function will review the adUnit setup and verify certain required values are present in any adpod adUnits.
 * If the fields are missing or incorrectly setup, the adUnit is removed from the list.
 * @param {Function} fn reference to original function (used by hook logic)
 * @param {Array[Object]} adUnits list of adUnits to be evaluated
 * @returns {Array[Object]} list of adUnits that passed the check
 */

function checkAdUnitSetupHook(fn, adUnits) {
  var goodAdUnits = adUnits.filter(function (adUnit) {
    var mediaTypes = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](adUnit, 'mediaTypes');
    var videoConfig = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](mediaTypes, 'video');

    if (videoConfig && videoConfig.context === __WEBPACK_IMPORTED_MODULE_7__src_mediaTypes_js__["a" /* ADPOD */]) {
      // run check to see if other mediaTypes are defined (ie multi-format); reject adUnit if so
      if (Object.keys(mediaTypes).length > 1) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("Detected more than one mediaType in adUnitCode: ".concat(adUnit.code, " while attempting to define an 'adpod' video adUnit.  'adpod' adUnits cannot be mixed with other mediaTypes.  This adUnit will be removed from the auction."));
        return false;
      }

      var errMsg = "Detected missing or incorrectly setup fields for an adpod adUnit.  Please review the following fields of adUnitCode: ".concat(adUnit.code, ".  This adUnit will be removed from the auction.");
      var playerSize = !!(videoConfig.playerSize && (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArrayOfNums"](videoConfig.playerSize, 2) || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](videoConfig.playerSize) && videoConfig.playerSize.every(function (sz) {
        return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArrayOfNums"](sz, 2);
      })) || videoConfig.sizeConfig);
      var adPodDurationSec = !!(videoConfig.adPodDurationSec && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isNumber"](videoConfig.adPodDurationSec) && videoConfig.adPodDurationSec > 0);
      var durationRangeSec = !!(videoConfig.durationRangeSec && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArrayOfNums"](videoConfig.durationRangeSec) && videoConfig.durationRangeSec.every(function (range) {
        return range > 0;
      }));

      if (!playerSize || !adPodDurationSec || !durationRangeSec) {
        errMsg += !playerSize ? '\nmediaTypes.video.playerSize' : '';
        errMsg += !adPodDurationSec ? '\nmediaTypes.video.adPodDurationSec' : '';
        errMsg += !durationRangeSec ? '\nmediaTypes.video.durationRangeSec' : '';
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"](errMsg);
        return false;
      }
    }

    return true;
  });
  adUnits = goodAdUnits;
  fn.call(this, adUnits);
}
/**
 * This check evaluates the incoming bid's `video.durationSeconds` field and tests it against specific logic depending on adUnit config.  Summary of logic below:
 * when adUnit.mediaTypes.video.requireExactDuration is true
 *  - only bids that exactly match those listed values are accepted (don't round at all).
 *  - populate the `bid.video.durationBucket` field with the matching duration value
 * when adUnit.mediaTypes.video.requireExactDuration is false
 *  - round the duration to the next highest specified duration value based on adunit.  If the duration is above a range within a set buffer, that bid falls down into that bucket.
 *      (eg if range was [5, 15, 30] -> 2s is rounded to 5s; 17s is rounded back to 15s; 18s is rounded up to 30s)
 *  - if the bid is above the range of the listed durations (and outside the buffer), reject the bid
 *  - set the rounded duration value in the `bid.video.durationBucket` field for accepted bids
 * @param {Object} bidderRequest copy of the bidderRequest object associated to bidResponse
 * @param {Object} bidResponse incoming bidResponse being evaluated by bidderFactory
 * @returns {boolean} return false if bid duration is deemed invalid as per adUnit configuration; return true if fine
*/

function checkBidDuration(bidderRequest, bidResponse) {
  var buffer = 2;
  var bidDuration = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidResponse, 'video.durationSeconds');
  var videoConfig = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidderRequest, 'mediaTypes.video');
  var adUnitRanges = videoConfig.durationRangeSec;
  adUnitRanges.sort(function (a, b) {
    return a - b;
  }); // ensure the ranges are sorted in numeric order

  if (!videoConfig.requireExactDuration) {
    var max = Math.max.apply(Math, _toConsumableArray(adUnitRanges));

    if (bidDuration <= max + buffer) {
      var nextHighestRange = __WEBPACK_IMPORTED_MODULE_9_core_js_pure_features_array_find_js___default()(adUnitRanges, function (range) {
        return range + buffer >= bidDuration;
      });
      bidResponse.video.durationBucket = nextHighestRange;
    } else {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("Detected a bid with a duration value outside the accepted ranges specified in adUnit.mediaTypes.video.durationRangeSec.  Rejecting bid: ", bidResponse);
      return false;
    }
  } else {
    if (__WEBPACK_IMPORTED_MODULE_9_core_js_pure_features_array_find_js___default()(adUnitRanges, function (range) {
      return range === bidDuration;
    })) {
      bidResponse.video.durationBucket = bidDuration;
    } else {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("Detected a bid with a duration value not part of the list of accepted ranges specified in adUnit.mediaTypes.video.durationRangeSec.  Exact match durations must be used for this adUnit. Rejecting bid: ", bidResponse);
      return false;
    }
  }

  return true;
}
/**
 * This hooked function evaluates an adpod bid and determines if the required fields are present.
 * If it's found to not be an adpod bid, it will return to original function via hook logic
 * @param {Function} fn reference to original function (used by hook logic)
 * @param {Object} bid incoming bid object
 * @param {Object} bidRequest bidRequest object of associated bid
 * @param {Object} videoMediaType copy of the `bidRequest.mediaTypes.video` object; used in original function
 * @param {String} context value of the `bidRequest.mediaTypes.video.context` field; used in original function
 * @returns {boolean} this return is only used for adpod bids
 */


function checkVideoBidSetupHook(fn, bid, bidRequest, videoMediaType, context) {
  if (context === __WEBPACK_IMPORTED_MODULE_7__src_mediaTypes_js__["a" /* ADPOD */]) {
    var result = true;
    var brandCategoryExclusion = __WEBPACK_IMPORTED_MODULE_6__src_config_js__["b" /* config */].getConfig('adpod.brandCategoryExclusion');

    if (brandCategoryExclusion && !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'meta.primaryCatId')) {
      result = false;
    }

    if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'video')) {
      if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'video.context') || bid.video.context !== __WEBPACK_IMPORTED_MODULE_7__src_mediaTypes_js__["a" /* ADPOD */]) {
        result = false;
      }

      if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'video.durationSeconds') || bid.video.durationSeconds <= 0) {
        result = false;
      } else {
        var isBidGood = checkBidDuration(bidRequest, bid);
        if (!isBidGood) result = false;
      }
    }

    if (!__WEBPACK_IMPORTED_MODULE_6__src_config_js__["b" /* config */].getConfig('cache.url') && bid.vastXml && !bid.vastUrl) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("\n        This bid contains only vastXml and will not work when a prebid cache url is not specified.\n        Try enabling prebid cache with pbjs.setConfig({ cache: {url: \"...\"} });\n      ");
      result = false;
    }

    ;
    fn.bail(result);
  } else {
    fn.call(this, bid, bidRequest, videoMediaType, context);
  }
}
/**
 * This function reads the (optional) settings for the adpod as set from the setConfig()
 * @param {Object} config contains the config settings for adpod module
 */

function adpodSetConfig(config) {
  if (config.bidQueueTimeDelay !== undefined) {
    if (typeof config.bidQueueTimeDelay === 'number' && config.bidQueueTimeDelay > 0) {
      queueTimeDelay = config.bidQueueTimeDelay;
    } else {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("Detected invalid value for adpod.bidQueueTimeDelay in setConfig; must be a positive number.  Using default: ".concat(queueTimeDelay));
    }
  }

  if (config.bidQueueSizeLimit !== undefined) {
    if (typeof config.bidQueueSizeLimit === 'number' && config.bidQueueSizeLimit > 0) {
      queueSizeLimit = config.bidQueueSizeLimit;
    } else {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("Detected invalid value for adpod.bidQueueSizeLimit in setConfig; must be a positive number.  Using default: ".concat(queueSizeLimit));
    }
  }
}
__WEBPACK_IMPORTED_MODULE_6__src_config_js__["b" /* config */].getConfig('adpod', function (config) {
  return adpodSetConfig(config.adpod);
});
/**
 * This function initializes the adpod module's hooks.  This is called by the corresponding adserver video module.
 */

function initAdpodHooks() {
  Object(__WEBPACK_IMPORTED_MODULE_4__src_hook_js__["d" /* setupBeforeHookFnOnce */])(__WEBPACK_IMPORTED_MODULE_1__src_auction_js__["f" /* callPrebidCache */], callPrebidCacheHook);
  Object(__WEBPACK_IMPORTED_MODULE_4__src_hook_js__["d" /* setupBeforeHookFnOnce */])(__WEBPACK_IMPORTED_MODULE_2__src_prebid_js__["checkAdUnitSetup"], checkAdUnitSetupHook);
  Object(__WEBPACK_IMPORTED_MODULE_4__src_hook_js__["d" /* setupBeforeHookFnOnce */])(__WEBPACK_IMPORTED_MODULE_3__src_video_js__["c" /* checkVideoBidSetup */], checkVideoBidSetupHook);
}

initAdpodHooks();
/**
 *
 * @param {Array[Object]} bids list of 'winning' bids that need to be cached
 * @param {Function} callback send the cached bids (or error) back to adserverVideoModule for further processing
 }}
 */

function callPrebidCacheAfterAuction(bids, callback) {
  // will call PBC here and execute cb param to initialize player code
  Object(__WEBPACK_IMPORTED_MODULE_5__src_videoCache_js__["b" /* store */])(bids, function (error, cacheIds) {
    if (error) {
      callback(error, null);
    } else {
      var successfulCachedBids = [];

      for (var i = 0; i < cacheIds.length; i++) {
        if (cacheIds[i] !== '') {
          successfulCachedBids.push(bids[i]);
        }
      }

      callback(null, successfulCachedBids);
    }
  });
}
/**
 * Compare function to be used in sorting long-form bids. This will compare bids on price per second.
 * @param {Object} bid
 * @param {Object} bid
 */

function sortByPricePerSecond(a, b) {
  if (a.adserverTargeting[__WEBPACK_IMPORTED_MODULE_11__src_constants_json___default.a.TARGETING_KEYS.PRICE_BUCKET] / a.video.durationBucket < b.adserverTargeting[__WEBPACK_IMPORTED_MODULE_11__src_constants_json___default.a.TARGETING_KEYS.PRICE_BUCKET] / b.video.durationBucket) {
    return 1;
  }

  if (a.adserverTargeting[__WEBPACK_IMPORTED_MODULE_11__src_constants_json___default.a.TARGETING_KEYS.PRICE_BUCKET] / a.video.durationBucket > b.adserverTargeting[__WEBPACK_IMPORTED_MODULE_11__src_constants_json___default.a.TARGETING_KEYS.PRICE_BUCKET] / b.video.durationBucket) {
    return -1;
  }

  return 0;
}
/**
 * This function returns targeting keyvalue pairs for long-form adserver modules. Freewheel and GAM are currently supporting Prebid long-form
 * @param {Object} options
 * @param {Array[string]} codes
 * @param {function} callback
 * @returns targeting kvs for adUnitCodes
 */

function getTargeting() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      codes = _ref.codes,
      callback = _ref.callback;

  if (!callback) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('No callback function was defined in the getTargeting call.  Aborting getTargeting().');
    return;
  }

  codes = codes || [];
  var adPodAdUnits = getAdPodAdUnits(codes);
  var bidsReceived = __WEBPACK_IMPORTED_MODULE_10__src_auctionManager_js__["a" /* auctionManager */].getBidsReceived();
  var competiveExclusionEnabled = __WEBPACK_IMPORTED_MODULE_6__src_config_js__["b" /* config */].getConfig('adpod.brandCategoryExclusion');
  var deferCachingSetting = __WEBPACK_IMPORTED_MODULE_6__src_config_js__["b" /* config */].getConfig('adpod.deferCaching');
  var deferCachingEnabled = typeof deferCachingSetting === 'boolean' ? deferCachingSetting : true;
  var bids = getBidsForAdpod(bidsReceived, adPodAdUnits);
  bids = competiveExclusionEnabled || deferCachingEnabled ? getExclusiveBids(bids) : bids;
  var prioritizeDeals = __WEBPACK_IMPORTED_MODULE_6__src_config_js__["b" /* config */].getConfig('adpod.prioritizeDeals');

  if (prioritizeDeals) {
    var _bids$reduce = bids.reduce(function (partitions, bid) {
      var bidDealTier = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'video.dealTier');
      var minDealTier = __WEBPACK_IMPORTED_MODULE_6__src_config_js__["b" /* config */].getConfig("adpod.dealTier.".concat(bid.bidderCode, ".minDealTier"));

      if (minDealTier && bidDealTier) {
        if (bidDealTier >= minDealTier) {
          partitions[1].push(bid);
        } else {
          partitions[0].push(bid);
        }
      } else if (bidDealTier) {
        partitions[1].push(bid);
      } else {
        partitions[0].push(bid);
      }

      return partitions;
    }, [[], []]),
        _bids$reduce2 = _slicedToArray(_bids$reduce, 2),
        otherBids = _bids$reduce2[0],
        highPriorityDealBids = _bids$reduce2[1];

    highPriorityDealBids.sort(sortByPricePerSecond);
    otherBids.sort(sortByPricePerSecond);
    bids = highPriorityDealBids.concat(otherBids);
  } else {
    bids.sort(sortByPricePerSecond);
  }

  var targeting = {};

  if (deferCachingEnabled === false) {
    adPodAdUnits.forEach(function (adUnit) {
      var adPodTargeting = [];
      var adPodDurationSeconds = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](adUnit, 'mediaTypes.video.adPodDurationSec');
      bids.filter(function (bid) {
        return bid.adUnitCode === adUnit.code;
      }).forEach(function (bid, index, arr) {
        if (bid.video.durationBucket <= adPodDurationSeconds) {
          adPodTargeting.push(_defineProperty({}, TARGETING_KEY_PB_CAT_DUR, bid.adserverTargeting[TARGETING_KEY_PB_CAT_DUR]));
          adPodDurationSeconds -= bid.video.durationBucket;
        }

        if (index === arr.length - 1 && adPodTargeting.length > 0) {
          adPodTargeting.push(_defineProperty({}, TARGETING_KEY_CACHE_ID, bid.adserverTargeting[TARGETING_KEY_CACHE_ID]));
        }
      });
      targeting[adUnit.code] = adPodTargeting;
    });
    callback(null, targeting);
  } else {
    var bidsToCache = [];
    adPodAdUnits.forEach(function (adUnit) {
      var adPodDurationSeconds = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](adUnit, 'mediaTypes.video.adPodDurationSec');
      bids.filter(function (bid) {
        return bid.adUnitCode === adUnit.code;
      }).forEach(function (bid) {
        if (bid.video.durationBucket <= adPodDurationSeconds) {
          bidsToCache.push(bid);
          adPodDurationSeconds -= bid.video.durationBucket;
        }
      });
    });
    callPrebidCacheAfterAuction(bidsToCache, function (error, bidsSuccessfullyCached) {
      if (error) {
        callback(error, null);
      } else {
        var groupedBids = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["groupBy"](bidsSuccessfullyCached, 'adUnitCode');
        Object.keys(groupedBids).forEach(function (adUnitCode) {
          var adPodTargeting = [];
          groupedBids[adUnitCode].forEach(function (bid, index, arr) {
            adPodTargeting.push(_defineProperty({}, TARGETING_KEY_PB_CAT_DUR, bid.adserverTargeting[TARGETING_KEY_PB_CAT_DUR]));

            if (index === arr.length - 1 && adPodTargeting.length > 0) {
              adPodTargeting.push(_defineProperty({}, TARGETING_KEY_CACHE_ID, bid.adserverTargeting[TARGETING_KEY_CACHE_ID]));
            }
          });
          targeting[adUnitCode] = adPodTargeting;
        });
        callback(null, targeting);
      }
    });
  }

  return targeting;
}
/**
 * This function returns the adunit of mediaType adpod
 * @param {Array} codes adUnitCodes
 * @returns {Array[Object]} adunits of mediaType adpod
 */

function getAdPodAdUnits(codes) {
  return __WEBPACK_IMPORTED_MODULE_10__src_auctionManager_js__["a" /* auctionManager */].getAdUnits().filter(function (adUnit) {
    return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](adUnit, 'mediaTypes.video.context') === __WEBPACK_IMPORTED_MODULE_7__src_mediaTypes_js__["a" /* ADPOD */];
  }).filter(function (adUnit) {
    return codes.length > 0 ? codes.indexOf(adUnit.code) != -1 : true;
  });
}
/**
 * This function removes bids of same category. It will be used when competitive exclusion is enabled.
 * @param {Array[Object]} bidsReceived
 * @returns {Array[Object]} unique category bids
 */


function getExclusiveBids(bidsReceived) {
  var bids = bidsReceived.map(function (bid) {
    return _extends({}, bid, _defineProperty({}, TARGETING_KEY_PB_CAT_DUR, bid.adserverTargeting[TARGETING_KEY_PB_CAT_DUR]));
  });
  bids = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["groupBy"](bids, TARGETING_KEY_PB_CAT_DUR);
  var filteredBids = [];
  Object.keys(bids).forEach(function (targetingKey) {
    bids[targetingKey].sort(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["compareOn"]('responseTimestamp'));
    filteredBids.push(bids[targetingKey][0]);
  });
  return filteredBids;
}
/**
 * This function returns bids for adpod adunits
 * @param {Array[Object]} bidsReceived
 * @param {Array[Object]} adPodAdUnits
 * @returns {Array[Object]} bids of mediaType adpod
 */


function getBidsForAdpod(bidsReceived, adPodAdUnits) {
  var adUnitCodes = adPodAdUnits.map(function (adUnit) {
    return adUnit.code;
  });
  return bidsReceived.filter(function (bid) {
    return adUnitCodes.indexOf(bid.adUnitCode) != -1 && bid.video && bid.video.context === __WEBPACK_IMPORTED_MODULE_7__src_mediaTypes_js__["a" /* ADPOD */];
  });
}

var sharedMethods = {
  TARGETING_KEY_PB_CAT_DUR: TARGETING_KEY_PB_CAT_DUR,
  TARGETING_KEY_CACHE_ID: TARGETING_KEY_CACHE_ID,
  'getTargeting': getTargeting
};
Object.freeze(sharedMethods);
Object(__WEBPACK_IMPORTED_MODULE_4__src_hook_js__["c" /* module */])('adpod', function shareAdpodUtilities() {
  if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isPlainObject"](arguments.length <= 0 ? undefined : arguments[0])) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('Adpod module needs plain object to share methods with submodule');
    return;
  }

  function addMethods(object, func) {
    for (var name in func) {
      object[name] = func[name];
    }
  }

  addMethods(arguments.length <= 0 ? undefined : arguments[0], sharedMethods);
});

/***/ })

},[221]);