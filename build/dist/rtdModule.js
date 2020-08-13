pbjsChunk([117],{

/***/ 660:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(661);


/***/ }),

/***/ 661:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["attachRealTimeDataProvider"] = attachRealTimeDataProvider;
/* harmony export (immutable) */ __webpack_exports__["init"] = init;
/* harmony export (immutable) */ __webpack_exports__["validateProviderDataForGPT"] = validateProviderDataForGPT;
/* harmony export (immutable) */ __webpack_exports__["setTargetsAfterRequestBids"] = setTargetsAfterRequestBids;
/* harmony export (immutable) */ __webpack_exports__["deepMerge"] = deepMerge;
/* harmony export (immutable) */ __webpack_exports__["requestBidsHook"] = requestBidsHook;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_prebidGlobal_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_targeting_js__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_hook_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_utils_js__ = __webpack_require__(0);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * This module adds Real time data support to prebid.js
 * @module modules/realTimeData
 */

/**
 * @interface RtdSubmodule
 */

/**
 * @function
 * @summary return real time data
 * @name RtdSubmodule#getData
 * @param {AdUnit[]} adUnits
 * @param {function} onDone
 */

/**
 * @property
 * @summary used to link submodule with config
 * @name RtdSubmodule#name
 * @type {string}
 */

/**
 * @interface ModuleConfig
 */

/**
 * @property
 * @summary sub module name
 * @name ModuleConfig#name
 * @type {string}
 */

/**
 * @property
 * @summary auction delay
 * @name ModuleConfig#auctionDelay
 * @type {number}
 */

/**
 * @property
 * @summary params for provide (sub module)
 * @name ModuleConfig#params
 * @type {Object}
 */

/**
 * @property
 * @summary timeout (if no auction dealy)
 * @name ModuleConfig#timeout
 * @type {number}
 */





/** @type {string} */

var MODULE_NAME = 'realTimeData';
/** @type {number} */

var DEF_TIMEOUT = 1000;
/** @type {RtdSubmodule[]} */

var subModules = [];
/** @type {ModuleConfig} */

var _moduleConfig;
/**
 * enable submodule in User ID
 * @param {RtdSubmodule} submodule
 */


function attachRealTimeDataProvider(submodule) {
  subModules.push(submodule);
}
function init(config) {
  var confListener = config.getConfig(MODULE_NAME, function (_ref) {
    var realTimeData = _ref.realTimeData;

    if (!realTimeData.dataProviders) {
      __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logError"]('missing parameters for real time module');
      return;
    }

    confListener(); // unsubscribe config listener

    _moduleConfig = realTimeData;

    if (typeof _moduleConfig.auctionDelay === 'undefined') {
      _moduleConfig.auctionDelay = 0;
    } // delay bidding process only if auctionDelay > 0


    if (!_moduleConfig.auctionDelay > 0) {
      Object(__WEBPACK_IMPORTED_MODULE_3__src_hook_js__["a" /* getHook */])('bidsBackCallback').before(setTargetsAfterRequestBids);
    } else {
      Object(__WEBPACK_IMPORTED_MODULE_0__src_prebidGlobal_js__["a" /* getGlobal */])().requestBids.before(requestBidsHook);
    }
  });
}
/**
 * get data from sub module
 * @param {AdUnit[]} adUnits received from auction
 * @param {function} callback callback function on data received
 */

function getProviderData(adUnits, callback) {
  var callbackExpected = subModules.length;
  var dataReceived = [];
  var processDone = false;
  var dataWaitTimeout = setTimeout(function () {
    processDone = true;
    callback(dataReceived);
  }, _moduleConfig.auctionDelay || _moduleConfig.timeout || DEF_TIMEOUT);
  subModules.forEach(function (sm) {
    sm.getData(adUnits, onDataReceived);
  });

  function onDataReceived(data) {
    if (processDone) {
      return;
    }

    dataReceived.push(data);

    if (dataReceived.length === callbackExpected) {
      processDone = true;
      clearTimeout(dataWaitTimeout);
      callback(dataReceived);
    }
  }
}
/**
 * delete invalid data received from provider
 * this is to ensure working flow for GPT
 * @param {Object} data received from provider
 * @return {Object} valid data for GPT targeting
 */


function validateProviderDataForGPT(data) {
  // data must be an object, contains object with string as value
  if (_typeof(data) !== 'object') {
    return {};
  }

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      for (var innerKey in data[key]) {
        if (data[key].hasOwnProperty(innerKey)) {
          if (typeof data[key][innerKey] !== 'string') {
            __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logWarn"]("removing ".concat(key, ": {").concat(innerKey, ":").concat(data[key][innerKey], " } from GPT targeting because of invalid type (must be string)"));
            delete data[key][innerKey];
          }
        }
      }
    }
  }

  return data;
}
/**
 * run hook after bids request and before callback
 * get data from provider and set key values to primary ad server
 * @param {function} next - next hook function
 * @param {AdUnit[]} adUnits received from auction
 */

function setTargetsAfterRequestBids(next, adUnits) {
  getProviderData(adUnits, function (data) {
    if (data && Object.keys(data).length) {
      var _mergedData = deepMerge(data);

      if (Object.keys(_mergedData).length) {
        setDataForPrimaryAdServer(_mergedData);
      }
    }

    next(adUnits);
  });
}
/**
 * deep merge array of objects
 * @param {array} arr - objects array
 * @return {Object} merged object
 */

function deepMerge(arr) {
  if (!Array.isArray(arr) || !arr.length) {
    return {};
  }

  return arr.reduce(function (merged, obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (!merged.hasOwnProperty(key)) merged[key] = obj[key];else {
          // duplicate key - merge values
          var dp = obj[key];

          for (var dk in dp) {
            if (dp.hasOwnProperty(dk)) merged[key][dk] = dp[dk];
          }
        }
      }
    }

    return merged;
  }, {});
}
/**
 * run hook before bids request
 * get data from provider and set key values to primary ad server & bidders
 * @param {function} fn - hook function
 * @param {Object} reqBidsConfigObj - request bids object
 */

function requestBidsHook(fn, reqBidsConfigObj) {
  var _this = this;

  getProviderData(reqBidsConfigObj.adUnits || Object(__WEBPACK_IMPORTED_MODULE_0__src_prebidGlobal_js__["a" /* getGlobal */])().adUnits, function (data) {
    if (data && Object.keys(data).length) {
      var _mergedData = deepMerge(data);

      if (Object.keys(_mergedData).length) {
        setDataForPrimaryAdServer(_mergedData);
        addIdDataToAdUnitBids(reqBidsConfigObj.adUnits || Object(__WEBPACK_IMPORTED_MODULE_0__src_prebidGlobal_js__["a" /* getGlobal */])().adUnits, _mergedData);
      }
    }

    return fn.call(_this, reqBidsConfigObj);
  });
}
/**
 * set data to primary ad server
 * @param {Object} data - key values to set
 */

function setDataForPrimaryAdServer(data) {
  data = validateProviderDataForGPT(data);

  if (__WEBPACK_IMPORTED_MODULE_4__src_utils_js__["isGptPubadsDefined"]()) {
    __WEBPACK_IMPORTED_MODULE_2__src_targeting_js__["a" /* targeting */].setTargetingForGPT(data, null);
  } else {
    window.googletag = window.googletag || {};
    window.googletag.cmd = window.googletag.cmd || [];
    window.googletag.cmd.push(function () {
      __WEBPACK_IMPORTED_MODULE_2__src_targeting_js__["a" /* targeting */].setTargetingForGPT(data, null);
    });
  }
}
/**
 * @param {AdUnit[]} adUnits
 *  @param {Object} data - key values to set
 */


function addIdDataToAdUnitBids(adUnits, data) {
  adUnits.forEach(function (adUnit) {
    adUnit.bids = adUnit.bids.map(function (bid) {
      var rd = data[adUnit.code] || {};
      return _extends(bid, {
        realTimeData: rd
      });
    });
  });
}

init(__WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */]);
Object(__WEBPACK_IMPORTED_MODULE_3__src_hook_js__["c" /* module */])('realTimeData', attachRealTimeDataProvider);

/***/ })

},[660]);