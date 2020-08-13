pbjsChunk([264],{

/***/ 305:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(306);


/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["addBrowsiTag"] = addBrowsiTag;
/* harmony export (immutable) */ __webpack_exports__["setData"] = setData;
/* harmony export (immutable) */ __webpack_exports__["isIdMatchingAdUnit"] = isIdMatchingAdUnit;
/* harmony export (immutable) */ __webpack_exports__["getMacroId"] = getMacroId;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "browsiSubmodule", function() { return browsiSubmodule; });
/* harmony export (immutable) */ __webpack_exports__["init"] = init;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_hook_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_adloader_js__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_storageManager_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This module adds browsi provider to the eal time data module
 * The {@link module:modules/realTimeData} module is required
 * The module will fetch predictions from browsi server
 * The module will place browsi bootstrap script on page
 * @module modules/browsiProvider
 * @requires module:modules/realTimeData
 */

/**
 * @typedef {Object} ModuleParams
 * @property {string} siteKey
 * @property {string} pubKey
 * @property {string} url
 * @property {?string} keyName
 * @property {?number} auctionDelay
 * @property {?number} timeout
 */







var storage = Object(__WEBPACK_IMPORTED_MODULE_5__src_storageManager_js__["b" /* getStorageManager */])();
/** @type {string} */

var MODULE_NAME = 'realTimeData';
/** @type {number} */

var DEF_TIMEOUT = 1000;
/** @type {ModuleParams} */

var _moduleParams = {};
/** @type {null|Object} */

var _data = null;
/** @type {null | function} */

var _dataReadyCallback = null;
/**
 * add browsi script to page
 * @param {Object} data
 */

function addBrowsiTag(data) {
  var script = Object(__WEBPACK_IMPORTED_MODULE_4__src_adloader_js__["a" /* loadExternalScript */])(data.u, 'browsi');
  script.async = true;
  script.setAttribute('data-sitekey', _moduleParams.siteKey);
  script.setAttribute('data-pubkey', _moduleParams.pubKey);
  script.setAttribute('prebidbpt', 'true');
  script.setAttribute('id', 'browsi-tag');
  script.setAttribute('src', data.u);
  script.prebidData = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["deepClone"](data);

  if (_moduleParams.keyName) {
    script.prebidData.kn = _moduleParams.keyName;
  }

  return script;
}
/**
 * collect required data from page
 * send data to browsi server to get predictions
 */

function collectData() {
  var win = window.top;
  var doc = win.document;
  var browsiData = null;

  try {
    browsiData = storage.getDataFromLocalStorage('__brtd');
  } catch (e) {
    __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logError"]('unable to parse __brtd');
  }

  var predictorData = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, {
    sk: _moduleParams.siteKey,
    sw: win.screen && win.screen.width || -1,
    sh: win.screen && win.screen.height || -1,
    url: "".concat(doc.location.protocol, "//").concat(doc.location.host).concat(doc.location.pathname)
  }), browsiData ? {
    us: browsiData
  } : {
    us: '{}'
  }), document.referrer ? {
    r: document.referrer
  } : {}), document.title ? {
    at: document.title
  } : {});

  getPredictionsFromServer("//".concat(_moduleParams.url, "/prebid?").concat(toUrlParams(predictorData)));
}

function setData(data) {
  _data = data;

  if (typeof _dataReadyCallback === 'function') {
    _dataReadyCallback(_data);

    _dataReadyCallback = null;
  }
}
/**
 * wait for data from server
 * call callback when data is ready
 * @param {function} callback
 */

function waitForData(callback) {
  if (_data) {
    _dataReadyCallback = null;
    callback(_data);
  } else {
    _dataReadyCallback = callback;
  }
}
/**
 * filter server data according to adUnits received
 * call callback (onDone) when data is ready
 * @param {adUnit[]} adUnits
 * @param {function} onDone callback function
 */


function sendDataToModule(adUnits, onDone) {
  try {
    waitForData(function (_predictionsData) {
      var _predictions = _predictionsData.p;

      if (!_predictions || !Object.keys(_predictions).length) {
        return onDone({});
      }

      var dataToReturn = adUnits.reduce(function (rp, cau) {
        var adUnitCode = cau && cau.code;

        if (!adUnitCode) {
          return rp;
        }

        var adSlot = getSlotByCode(adUnitCode);
        var identifier = adSlot ? getMacroId(_predictionsData.pmd, adSlot) : adUnitCode;
        var predictionData = _predictions[identifier];

        if (!predictionData) {
          return rp;
        }

        if (predictionData.p) {
          if (!isIdMatchingAdUnit(adSlot, predictionData.w)) {
            return rp;
          }

          rp[adUnitCode] = getKVObject(predictionData.p, _predictionsData.kn);
        }

        return rp;
      }, {});
      return onDone(dataToReturn);
    });
  } catch (e) {
    onDone({});
  }
}
/**
 * get all slots on page
 * @return {Object[]} slot GoogleTag slots
 */


function getAllSlots() {
  return __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isGptPubadsDefined"]() && window.googletag.pubads().getSlots();
}
/**
 * get prediction and return valid object for key value set
 * @param {number} p
 * @param {string?} keyName
 * @return {Object} key:value
 */


function getKVObject(p, keyName) {
  var prValue = p < 0 ? 'NA' : (Math.floor(p * 10) / 10).toFixed(2);
  var prObject = {};
  prObject[(_moduleParams['keyName'] || keyName).toString()] = prValue.toString();
  return prObject;
}
/**
 * check if placement id matches one of given ad units
 * @param {Object} slot google slot
 * @param {string[]} whitelist ad units
 * @return {boolean}
 */


function isIdMatchingAdUnit(slot, whitelist) {
  if (!whitelist || !whitelist.length || !slot) {
    return true;
  }

  var slotAdUnits = slot.getAdUnitPath();
  return whitelist.indexOf(slotAdUnits) !== -1;
}
/**
 * get GPT slot by placement id
 * @param {string} code placement id
 * @return {?Object}
 */

function getSlotByCode(code) {
  var slots = getAllSlots();

  if (!slots || !slots.length) {
    return null;
  }

  return __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js___default()(slots, function (s) {
    return s.getSlotElementId() === code || s.getAdUnitPath() === code;
  }) || null;
}
/**
 * generate id according to macro script
 * @param {Object} macro replacement macro
 * @param {Object} slot google slot
 * @return {?Object}
 */


function getMacroId(macro, slot) {
  if (macro) {
    try {
      var macroResult = evaluate(macro, slot.getSlotElementId(), slot.getAdUnitPath(), function (match, p1) {
        return p1 && slot.getTargeting(p1).join('_') || 'NA';
      });
      return macroResult;
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logError"]("failed to evaluate: ".concat(macro));
    }
  }

  return slot.getSlotElementId();
}

function evaluate(macro, divId, adUnit, replacer) {
  var macroResult = macro.p.replace(/['"]+/g, '').replace(/<DIV_ID>/g, divId);

  if (adUnit) {
    macroResult = macroResult.replace(/<AD_UNIT>/g, adUnit);
  }

  if (replacer) {
    macroResult = macroResult.replace(/<KEY_(\w+)>/g, replacer);
  }

  if (macro.s) {
    macroResult = macroResult.substring(macro.s.s, macro.s.e);
  }

  return macroResult;
}
/**
 * XMLHttpRequest to get data form browsi server
 * @param {string} url server url with query params
 */


function getPredictionsFromServer(url) {
  var ajax = Object(__WEBPACK_IMPORTED_MODULE_3__src_ajax_js__["b" /* ajaxBuilder */])(_moduleParams.auctionDelay || _moduleParams.timeout || DEF_TIMEOUT);
  ajax(url, {
    success: function success(response, req) {
      if (req.status === 200) {
        try {
          var data = JSON.parse(response);

          if (data && data.p && data.kn) {
            setData({
              p: data.p,
              kn: data.kn,
              pmd: data.pmd
            });
          } else {
            setData({});
          }

          addBrowsiTag(data);
        } catch (err) {
          __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logError"]('unable to parse data');
          setData({});
        }
      } else if (req.status === 204) {
        // unrecognized site key
        setData({});
      }
    },
    error: function error() {
      setData({});
      __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logError"]('unable to get prediction data');
    }
  });
}
/**
 * serialize object and return query params string
 * @param {Object} data
 * @return {string}
 */


function toUrlParams(data) {
  return Object.keys(data).map(function (key) {
    return key + '=' + encodeURIComponent(data[key]);
  }).join('&');
}
/** @type {RtdSubmodule} */


var browsiSubmodule = {
  /**
   * used to link submodule with realTimeData
   * @type {string}
   */
  name: 'browsi',

  /**
   * get data and send back to realTimeData module
   * @function
   * @param {adUnit[]} adUnits
   * @param {function} onDone
   */
  getData: sendDataToModule
};
function init(config) {
  var confListener = config.getConfig(MODULE_NAME, function (_ref) {
    var realTimeData = _ref.realTimeData;

    try {
      _moduleParams = realTimeData.dataProviders && realTimeData.dataProviders.filter(function (pr) {
        return pr.name && pr.name.toLowerCase() === 'browsi';
      })[0].params;
      _moduleParams.auctionDelay = realTimeData.auctionDelay;
      _moduleParams.timeout = realTimeData.timeout;
    } catch (e) {
      _moduleParams = {};
    }

    if (_moduleParams.siteKey && _moduleParams.pubKey && _moduleParams.url) {
      confListener();
      collectData();
    } else {
      __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logError"]('missing params for Browsi provider');
    }
  });
}
Object(__WEBPACK_IMPORTED_MODULE_2__src_hook_js__["e" /* submodule */])('realTimeData', browsiSubmodule);
init(__WEBPACK_IMPORTED_MODULE_0__src_config_js__["b" /* config */]);

/***/ })

},[305]);