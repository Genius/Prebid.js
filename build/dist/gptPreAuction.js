pbjsChunk([210],{

/***/ 430:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(431);


/***/ }),

/***/ 431:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_currentConfig", function() { return _currentConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appendGptSlots", function() { return appendGptSlots; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appendPbAdSlot", function() { return appendPbAdSlot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeBidRequestsHook", function() { return makeBidRequestsHook; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_hook_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js__);
var _this = this;





var MODULE_NAME = 'GPT Pre-Auction';
var _currentConfig = {};
var hooksAdded = false;
var appendGptSlots = function appendGptSlots(adUnits) {
  var _currentConfig2 = _currentConfig,
      customGptSlotMatching = _currentConfig2.customGptSlotMatching;

  if (!__WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isGptPubadsDefined"]()) {
    return;
  }

  var adUnitMap = adUnits.reduce(function (acc, adUnit) {
    acc[adUnit.code] = adUnit;
    return acc;
  }, {});
  window.googletag.pubads().getSlots().forEach(function (slot) {
    var matchingAdUnitCode = __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default()(Object.keys(adUnitMap), customGptSlotMatching ? customGptSlotMatching(slot) : __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isAdUnitCodeMatchingSlot"](slot));

    if (matchingAdUnitCode) {
      var adUnit = adUnitMap[matchingAdUnitCode];
      adUnit.fpd = adUnit.fpd || {};
      adUnit.fpd.context = adUnit.fpd.context || {};
      var context = adUnit.fpd.context;
      context.adServer = context.adServer || {};
      context.adServer.name = 'gam';
      context.adServer.adSlot = slot.getAdUnitPath();
    }
  });
};
var appendPbAdSlot = function appendPbAdSlot(adUnit) {
  adUnit.fpd = adUnit.fpd || {};
  adUnit.fpd.context = adUnit.fpd.context || {};
  var context = adUnit.fpd.context;
  var _currentConfig3 = _currentConfig,
      customPbAdSlot = _currentConfig3.customPbAdSlot;

  if (customPbAdSlot) {
    context.pbAdSlot = customPbAdSlot(adUnit.code, __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["deepAccess"](context, 'adServer.adSlot'));
    return;
  } // use context.pbAdSlot if set


  if (context.pbAdSlot) {
    return;
  } // use data attribute 'data-adslotid' if set


  try {
    var adUnitCodeDiv = document.getElementById(adUnit.code);

    if (adUnitCodeDiv.dataset.adslotid) {
      context.pbAdSlot = adUnitCodeDiv.dataset.adslotid;
      return;
    }
  } catch (e) {} // banner adUnit, use GPT adunit if defined


  if (context.adServer) {
    context.pbAdSlot = context.adServer.adSlot;
    return;
  }

  context.pbAdSlot = adUnit.code;
};
var makeBidRequestsHook = function makeBidRequestsHook(fn, adUnits) {
  appendGptSlots(adUnits);
  adUnits.forEach(function (adUnit) {
    appendPbAdSlot(adUnit);
  });

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return fn.call.apply(fn, [_this, adUnits].concat(args));
};

var handleSetGptConfig = function handleSetGptConfig(moduleConfig) {
  _currentConfig = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["pick"](moduleConfig, ['enabled', function (enabled) {
    return enabled !== false;
  }, 'customGptSlotMatching', function (customGptSlotMatching) {
    return typeof customGptSlotMatching === 'function' && customGptSlotMatching;
  }, 'customPbAdSlot', function (customPbAdSlot) {
    return typeof customPbAdSlot === 'function' && customPbAdSlot;
  }]);

  if (_currentConfig.enabled) {
    if (!hooksAdded) {
      Object(__WEBPACK_IMPORTED_MODULE_2__src_hook_js__["a" /* getHook */])('makeBidRequests').before(makeBidRequestsHook);
      hooksAdded = true;
    }
  } else {
    __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logInfo"]("".concat(MODULE_NAME, ": Turning off module"));
    _currentConfig = {};
    Object(__WEBPACK_IMPORTED_MODULE_2__src_hook_js__["a" /* getHook */])('makeBidRequests').getHooks({
      hook: makeBidRequestsHook
    }).remove();
    hooksAdded = false;
  }
};

__WEBPACK_IMPORTED_MODULE_0__src_config_js__["b" /* config */].getConfig('gptPreAuction', function (config) {
  return handleSetGptConfig(config.gptPreAuction);
});
handleSetGptConfig({});

/***/ })

},[430]);