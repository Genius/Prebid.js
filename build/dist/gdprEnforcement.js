pbjsChunk([215],{

/***/ 420:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(421);


/***/ }),

/***/ 421:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "purpose1Rule", function() { return purpose1Rule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "purpose2Rule", function() { return purpose2Rule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enforcementRules", function() { return enforcementRules; });
/* harmony export (immutable) */ __webpack_exports__["validateRules"] = validateRules;
/* harmony export (immutable) */ __webpack_exports__["deviceAccessHook"] = deviceAccessHook;
/* harmony export (immutable) */ __webpack_exports__["userSyncHook"] = userSyncHook;
/* harmony export (immutable) */ __webpack_exports__["userIdHook"] = userIdHook;
/* harmony export (immutable) */ __webpack_exports__["makeBidRequestsHook"] = makeBidRequestsHook;
/* harmony export (immutable) */ __webpack_exports__["setEnforcementConfig"] = setEnforcementConfig;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_includes_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_hook_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_storageManager_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_events_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_events_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__src_events_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_constants_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__src_constants_json__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * This module gives publishers extra set of features to enforce individual purposes of TCF v2
 */











var TCF2 = {
  'purpose1': {
    id: 1,
    name: 'storage'
  },
  'purpose2': {
    id: 2,
    name: 'basicAds'
  }
};
var DEFAULT_RULES = [{
  purpose: 'storage',
  enforcePurpose: true,
  enforceVendor: true,
  vendorExceptions: []
}, {
  purpose: 'basicAds',
  enforcePurpose: true,
  enforceVendor: true,
  vendorExceptions: []
}];
var purpose1Rule;
var purpose2Rule;
var addedDeviceAccessHook = false;
var enforcementRules;

function getGvlid(bidderCode) {
  var gvlid;
  bidderCode = bidderCode || __WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getCurrentBidder();

  if (bidderCode) {
    var gvlMapping = __WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('gvlMapping');

    if (gvlMapping && gvlMapping[bidderCode]) {
      gvlid = gvlMapping[bidderCode];
    } else {
      var bidder = __WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__["default"].getBidAdapter(bidderCode);

      if (bidder && bidder.getSpec) {
        gvlid = bidder.getSpec().gvlid;
      }
    }
  }

  return gvlid;
}

function getGvlidForUserIdModule(userIdModule) {
  var gvlId;
  var gvlMapping = __WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('gvlMapping');

  if (gvlMapping && gvlMapping[userIdModule.name]) {
    gvlId = gvlMapping[userIdModule.name];
  } else {
    gvlId = userIdModule.gvlid;
  }

  return gvlId;
}
/**
 * This function takes in a rule and consentData and validates against the consentData provided. Depending on what it returns,
 * the caller may decide to suppress a TCF-sensitive activity.
 * @param {Object} rule - enforcement rules set in config
 * @param {Object} consentData - gdpr consent data
 * @param {string=} currentModule - Bidder code of the current module
 * @param {number=} gvlId - GVL ID for the module
 * @returns {boolean}
 */


function validateRules(rule, consentData, currentModule, gvlId) {
  var purposeId = TCF2[Object.keys(TCF2).filter(function (purposeName) {
    return TCF2[purposeName].name === rule.purpose;
  })[0]].id; // return 'true' if vendor present in 'vendorExceptions'

  if (__WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_includes_js___default()(rule.vendorExceptions || [], currentModule)) {
    return true;
  } // get data from the consent string


  var purposeConsent = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](consentData, "vendorData.purpose.consents.".concat(purposeId));
  var vendorConsent = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](consentData, "vendorData.vendor.consents.".concat(gvlId));
  var liTransparency = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](consentData, "vendorData.purpose.legitimateInterests.".concat(purposeId));
  /*
    Since vendor exceptions have already been handled, the purpose as a whole is allowed if it's not being enforced
    or the user has consented. Similar with vendors.
  */

  var purposeAllowed = rule.enforcePurpose === false || purposeConsent === true;
  var vendorAllowed = rule.enforceVendor === false || vendorConsent === true;
  /*
    Few if any vendors should be declaring Legitimate Interest for Device Access (Purpose 1), but some are claiming
    LI for Basic Ads (Purpose 2). Prebid.js can't check to see who's declaring what legal basis, so if LI has been
    established for Purpose 2, allow the auction to take place and let the server sort out the legal basis calculation.
  */

  if (purposeId === 2) {
    return purposeAllowed && vendorAllowed || liTransparency === true;
  }

  return purposeAllowed && vendorAllowed;
}
/**
 * This hook checks whether module has permission to access device or not. Device access include cookie and local storage
 * @param {Function} fn reference to original function (used by hook logic)
 * @param {Number=} gvlid gvlid of the module
 * @param {string=} moduleName name of the module
 */

function deviceAccessHook(fn, gvlid, moduleName, result) {
  result = _extends({}, {
    hasEnforcementHook: true
  });

  if (!Object(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["hasDeviceAccess"])()) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('Device access is disabled by Publisher');
    result.valid = false;
    fn.call(this, gvlid, moduleName, result);
  } else {
    var consentData = __WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__["gdprDataHandler"].getConsentData();

    if (consentData && consentData.gdprApplies) {
      if (consentData.apiVersion === 2) {
        var curBidder = __WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getCurrentBidder(); // Bidders have a copy of storage object with bidder code binded. Aliases will also pass the same bidder code when invoking storage functions and hence if alias tries to access device we will try to grab the gvl id for alias instead of original bidder

        if (curBidder && curBidder != moduleName && __WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__["default"].aliasRegistry[curBidder] === moduleName) {
          gvlid = getGvlid(curBidder);
        } else {
          gvlid = getGvlid(moduleName);
        }

        var curModule = moduleName || curBidder;
        var isAllowed = validateRules(purpose1Rule, consentData, curModule, gvlid);

        if (isAllowed) {
          result.valid = true;
          fn.call(this, gvlid, moduleName, result);
        } else {
          curModule && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("Device access denied for ".concat(curModule, " by TCF2"));
          result.valid = false;
          fn.call(this, gvlid, moduleName, result);
        }
      } else {
        // The module doesn't enforce TCF1.1 strings
        result.valid = true;
        fn.call(this, gvlid, moduleName, result);
      }
    } else {
      result.valid = true;
      fn.call(this, gvlid, moduleName, result);
    }
  }
}
/**
 * This hook checks if a bidder has consent for user sync or not
 * @param {Function} fn reference to original function (used by hook logic)
 * @param  {...any} args args
 */

function userSyncHook(fn) {
  var consentData = __WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__["gdprDataHandler"].getConsentData();

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (consentData && consentData.gdprApplies) {
    if (consentData.apiVersion === 2) {
      var gvlid = getGvlid();
      var curBidder = __WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getCurrentBidder();
      var isAllowed = validateRules(purpose1Rule, consentData, curBidder, gvlid);

      if (isAllowed) {
        fn.call.apply(fn, [this].concat(args));
      } else {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("User sync not allowed for ".concat(curBidder));
      }
    } else {
      // The module doesn't enforce TCF1.1 strings
      fn.call.apply(fn, [this].concat(args));
    }
  } else {
    fn.call.apply(fn, [this].concat(args));
  }
}
/**
 * This hook checks if user id module is given consent or not
 * @param {Function} fn reference to original function (used by hook logic)
 * @param  {Submodule[]} submodules Array of user id submodules
 * @param {Object} consentData GDPR consent data
 */

function userIdHook(fn, submodules, consentData) {
  if (consentData && consentData.gdprApplies) {
    if (consentData.apiVersion === 2) {
      var userIdModules = submodules.map(function (submodule) {
        var gvlid = getGvlidForUserIdModule(submodule.submodule);
        var moduleName = submodule.submodule.name;
        var isAllowed = validateRules(purpose1Rule, consentData, moduleName, gvlid);

        if (isAllowed) {
          return submodule;
        } else {
          __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("User denied permission to fetch user id for ".concat(moduleName, " User id module"));
        }

        return undefined;
      }).filter(function (module) {
        return module;
      });
      fn.call(this, userIdModules, _objectSpread(_objectSpread({}, consentData), {}, {
        hasValidated: true
      }));
    } else {
      // The module doesn't enforce TCF1.1 strings
      fn.call(this, submodules, consentData);
    }
  } else {
    fn.call(this, submodules, consentData);
  }
}
/**
 * Checks if a bidder is allowed in Auction.
 * Enforces "purpose 2 (basic ads)" of TCF v2.0 spec
 * @param {Function} fn - Function reference to the original function.
 * @param {Array<adUnits>} adUnits
 */

function makeBidRequestsHook(fn, adUnits) {
  var consentData = __WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__["gdprDataHandler"].getConsentData();

  for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  if (consentData && consentData.gdprApplies) {
    if (consentData.apiVersion === 2) {
      var disabledBidders = [];
      adUnits.forEach(function (adUnit) {
        adUnit.bids = adUnit.bids.filter(function (bid) {
          var currBidder = bid.bidder;
          var gvlId = getGvlid(currBidder);
          if (__WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_array_includes_js___default()(disabledBidders, currBidder)) return false;
          var isAllowed = !!validateRules(purpose2Rule, consentData, currBidder, gvlId);

          if (!isAllowed) {
            __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("TCF2 blocked auction for ".concat(currBidder));
            __WEBPACK_IMPORTED_MODULE_8__src_events_js___default.a.emit(__WEBPACK_IMPORTED_MODULE_9__src_constants_json__["EVENTS"].BIDDER_BLOCKED, currBidder);
            disabledBidders.push(currBidder);
          }

          return isAllowed;
        });
      });
      fn.call.apply(fn, [this, adUnits].concat(args));
    } else {
      // The module doesn't enforce TCF1.1 strings
      fn.call.apply(fn, [this, adUnits].concat(args));
    }
  } else {
    fn.call.apply(fn, [this, adUnits].concat(args));
  }
}

var hasPurpose1 = function hasPurpose1(rule) {
  return rule.purpose === TCF2.purpose1.name;
};

var hasPurpose2 = function hasPurpose2(rule) {
  return rule.purpose === TCF2.purpose2.name;
};
/**
 * A configuration function that initializes some module variables, as well as adds hooks
 * @param {Object} config - GDPR enforcement config object
 */


function setEnforcementConfig(config) {
  var rules = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](config, 'gdpr.rules');

  if (!rules) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('TCF2: enforcing P1 and P2');
    enforcementRules = DEFAULT_RULES;
  } else {
    enforcementRules = rules;
  }

  purpose1Rule = __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default()(enforcementRules, hasPurpose1);
  purpose2Rule = __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default()(enforcementRules, hasPurpose2);

  if (!purpose1Rule) {
    purpose1Rule = DEFAULT_RULES[0];
  }

  if (!purpose2Rule) {
    purpose2Rule = DEFAULT_RULES[1];
  }

  if (purpose1Rule && !addedDeviceAccessHook) {
    addedDeviceAccessHook = true;
    __WEBPACK_IMPORTED_MODULE_7__src_storageManager_js__["d" /* validateStorageEnforcement */].before(deviceAccessHook, 49);
    __WEBPACK_IMPORTED_MODULE_5__src_adapters_bidderFactory_js__["registerSyncInner"].before(userSyncHook, 48); // Using getHook as user id and gdprEnforcement are both optional modules. Using import will auto include the file in build

    Object(__WEBPACK_IMPORTED_MODULE_6__src_hook_js__["a" /* getHook */])('validateGdprEnforcement').before(userIdHook, 47);
  }

  if (purpose2Rule) {
    Object(__WEBPACK_IMPORTED_MODULE_6__src_hook_js__["a" /* getHook */])('makeBidRequests').before(makeBidRequestsHook);
  }
}
__WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('consentManagement', function (config) {
  return setEnforcementConfig(config.consentManagement);
});

/***/ })

},[420]);