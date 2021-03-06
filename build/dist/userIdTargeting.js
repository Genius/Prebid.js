pbjsChunk([59],{

/***/ 636:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(637);


/***/ }),

/***/ 637:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["userIdTargeting"] = userIdTargeting;
/* harmony export (immutable) */ __webpack_exports__["init"] = init;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_prebidGlobal__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_constants_json__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__src_constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_events__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__src_events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_utils__ = __webpack_require__(0);





var MODULE_NAME = 'userIdTargeting';
var GAM = 'GAM';
var GAM_KEYS_CONFIG = 'GAM_KEYS';
function userIdTargeting(userIds, config) {
  if (!Object(__WEBPACK_IMPORTED_MODULE_4__src_utils__["isPlainObject"])(config)) {
    Object(__WEBPACK_IMPORTED_MODULE_4__src_utils__["logInfo"])(MODULE_NAME + ': Invalid config found, not sharing userIds externally.');
    return;
  }

  var PUB_GAM_KEYS = Object(__WEBPACK_IMPORTED_MODULE_4__src_utils__["isPlainObject"])(config[GAM_KEYS_CONFIG]) ? config[GAM_KEYS_CONFIG] : {};
  var SHARE_WITH_GAM = Object(__WEBPACK_IMPORTED_MODULE_4__src_utils__["isBoolean"])(config[GAM]) ? config[GAM] : false;
  var GAM_API;

  if (!SHARE_WITH_GAM) {
    Object(__WEBPACK_IMPORTED_MODULE_4__src_utils__["logInfo"])(MODULE_NAME + ': Not enabled for ' + GAM);
  }

  if (window.googletag && Object(__WEBPACK_IMPORTED_MODULE_4__src_utils__["isFn"])(window.googletag.pubads) && Object(__WEBPACK_IMPORTED_MODULE_4__src_utils__["hasOwn"])(window.googletag.pubads(), 'setTargeting') && Object(__WEBPACK_IMPORTED_MODULE_4__src_utils__["isFn"])(window.googletag.pubads().setTargeting)) {
    GAM_API = window.googletag.pubads().setTargeting;
  } else {
    SHARE_WITH_GAM = false;
    Object(__WEBPACK_IMPORTED_MODULE_4__src_utils__["logInfo"])(MODULE_NAME + ': Could not find googletag.pubads().setTargeting API. Not adding User Ids in targeting.');
    return;
  }

  Object.keys(userIds).forEach(function (key) {
    if (userIds[key]) {
      // PUB_GAM_KEYS: { "tdid": '' } means the publisher does not want to send the tdid to GAM
      if (SHARE_WITH_GAM && PUB_GAM_KEYS[key] !== '') {
        var uidStr;

        if (Object(__WEBPACK_IMPORTED_MODULE_4__src_utils__["isStr"])(userIds[key])) {
          uidStr = userIds[key];
        } else if (Object(__WEBPACK_IMPORTED_MODULE_4__src_utils__["isPlainObject"])(userIds[key])) {
          uidStr = JSON.stringify(userIds[key]);
        } else {
          Object(__WEBPACK_IMPORTED_MODULE_4__src_utils__["logInfo"])(MODULE_NAME + ': ' + key + ' User ID is not an object or a string.');
          return;
        }

        GAM_API(Object(__WEBPACK_IMPORTED_MODULE_4__src_utils__["hasOwn"])(PUB_GAM_KEYS, key) ? PUB_GAM_KEYS[key] : key, [uidStr]);
      }
    }
  });
}
function init(config) {
  __WEBPACK_IMPORTED_MODULE_3__src_events___default.a.on(__WEBPACK_IMPORTED_MODULE_2__src_constants_json___default.a.EVENTS.AUCTION_END, function () {
    userIdTargeting(Object(__WEBPACK_IMPORTED_MODULE_1__src_prebidGlobal__["a" /* getGlobal */])().getUserIds(), config.getConfig(MODULE_NAME));
  });
}
init(__WEBPACK_IMPORTED_MODULE_0__src_config__["b" /* config */]);

/***/ })

},[636]);