pbjsChunk([226],{

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(231);


/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerAdserver", function() { return registerAdserver; });
/* harmony export (immutable) */ __webpack_exports__["getAdserverCategoryHook"] = getAdserverCategoryHook;
/* harmony export (immutable) */ __webpack_exports__["initTranslation"] = initTranslation;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_hook__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_ajax__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_auction__ = __webpack_require__(39);
/**
 * This module translates iab category to freewheel industry using translation mapping file
 * Publisher can set translation file by using setConfig method
 *
 * Example:
 * config.setConfig({
 *    'brandCategoryTranslation': {
 *      'translationFile': 'http://sample.com'
 *    }
 * });
 * If publisher has not defined translation file than prebid will use default prebid translation file provided here //cdn.jsdelivr.net/gh/prebid/category-mapping-file@1/freewheel-mapping.json
 */





var DEFAULT_TRANSLATION_FILE_URL = 'https://cdn.jsdelivr.net/gh/prebid/category-mapping-file@1/freewheel-mapping.json';
var DEFAULT_IAB_TO_FW_MAPPING_KEY = 'iabToFwMappingkey';
var DEFAULT_IAB_TO_FW_MAPPING_KEY_PUB = 'iabToFwMappingkeyPub';
var refreshInDays = 1;
var registerAdserver = Object(__WEBPACK_IMPORTED_MODULE_1__src_hook__["b" /* hook */])('async', function (adServer) {
  var url;

  if (adServer === 'freewheel') {
    url = DEFAULT_TRANSLATION_FILE_URL;
    initTranslation(url, DEFAULT_IAB_TO_FW_MAPPING_KEY);
  }
}, 'registerAdserver');
registerAdserver();
function getAdserverCategoryHook(fn, adUnitCode, bid) {
  if (!bid) {
    return fn.call(this, adUnitCode); // if no bid, call original and let it display warnings
  }

  if (!__WEBPACK_IMPORTED_MODULE_0__src_config__["b" /* config */].getConfig('adpod.brandCategoryExclusion')) {
    return fn.call(this, adUnitCode, bid);
  }

  var localStorageKey = __WEBPACK_IMPORTED_MODULE_0__src_config__["b" /* config */].getConfig('brandCategoryTranslation.translationFile') ? DEFAULT_IAB_TO_FW_MAPPING_KEY_PUB : DEFAULT_IAB_TO_FW_MAPPING_KEY;

  if (bid.meta && !bid.meta.adServerCatId) {
    var mapping = Object(__WEBPACK_IMPORTED_MODULE_3__src_utils__["getDataFromLocalStorage"])(localStorageKey);

    if (mapping) {
      try {
        mapping = JSON.parse(mapping);
      } catch (error) {
        Object(__WEBPACK_IMPORTED_MODULE_3__src_utils__["logError"])('Failed to parse translation mapping file');
      }

      if (bid.meta.iabSubCatId && mapping['mapping'] && mapping['mapping'][bid.meta.iabSubCatId]) {
        bid.meta.adServerCatId = mapping['mapping'][bid.meta.iabSubCatId]['id'];
      } else {
        // This bid will be automatically ignored by adpod module as adServerCatId was not found
        bid.meta.adServerCatId = undefined;
      }
    } else {
      Object(__WEBPACK_IMPORTED_MODULE_3__src_utils__["logError"])('Translation mapping data not found in local storage');
    }
  }

  fn.call(this, adUnitCode, bid);
}
function initTranslation(url, localStorageKey) {
  Object(__WEBPACK_IMPORTED_MODULE_1__src_hook__["d" /* setupBeforeHookFnOnce */])(__WEBPACK_IMPORTED_MODULE_4__src_auction__["c" /* addBidResponse */], getAdserverCategoryHook, 50);
  var mappingData = Object(__WEBPACK_IMPORTED_MODULE_3__src_utils__["getDataFromLocalStorage"])(localStorageKey);

  if (!mappingData || Object(__WEBPACK_IMPORTED_MODULE_3__src_utils__["timestamp"])() < mappingData.lastUpdated + refreshInDays * 24 * 60 * 60 * 1000) {
    Object(__WEBPACK_IMPORTED_MODULE_2__src_ajax__["a" /* ajax */])(url, {
      success: function success(response) {
        try {
          response = JSON.parse(response);
          response['lastUpdated'] = Object(__WEBPACK_IMPORTED_MODULE_3__src_utils__["timestamp"])();
          Object(__WEBPACK_IMPORTED_MODULE_3__src_utils__["setDataInLocalStorage"])(localStorageKey, JSON.stringify(response));
        } catch (error) {
          Object(__WEBPACK_IMPORTED_MODULE_3__src_utils__["logError"])('Failed to parse translation mapping file');
        }
      },
      error: function error() {
        Object(__WEBPACK_IMPORTED_MODULE_3__src_utils__["logError"])('Failed to load brand category translation file.');
      }
    });
  }
}

function setConfig(config) {
  if (config.translationFile) {
    // if publisher has defined the translation file, preload that file here
    initTranslation(config.translationFile, DEFAULT_IAB_TO_FW_MAPPING_KEY_PUB);
  }
}

__WEBPACK_IMPORTED_MODULE_0__src_config__["b" /* config */].getConfig('brandCategoryTranslation', function (config) {
  return setConfig(config.brandCategoryTranslation);
});

/***/ })

},[230]);