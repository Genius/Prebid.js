pbjsChunk([173],{

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(206);


/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["addBrowsiTag"] = addBrowsiTag;
/* harmony export (immutable) */ __webpack_exports__["setData"] = setData;
/* harmony export (immutable) */ __webpack_exports__["isIdMatchingAdUnit"] = isIdMatchingAdUnit;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "browsiSubmodule", function() { return browsiSubmodule; });
/* harmony export (immutable) */ __webpack_exports__["init"] = init;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_hook__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_ajax__ = __webpack_require__(4);
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
 * @property {number} auctionDelay
 */




/** @type {string} */

var MODULE_NAME = 'realTimeData';
/** @type {ModuleParams} */

var _moduleParams = {};
/** @type {null|Object} */

var _data = null;
/** @type {null | function} */

var _dataReadyCallback = null;
/**
 * add browsi script to page
 * @param {string} bptUrl
 */

function addBrowsiTag(bptUrl) {
  var script = document.createElement('script');
  script.async = true;
  script.setAttribute('data-sitekey', _moduleParams.siteKey);
  script.setAttribute('data-pubkey', _moduleParams.pubKey);
  script.setAttribute('prebidbpt', 'true');
  script.setAttribute('id', 'browsi-tag');
  script.setAttribute('src', bptUrl);
  document.head.appendChild(script);
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
    browsiData = __WEBPACK_IMPORTED_MODULE_1__src_utils__["getDataFromLocalStorage"]('__brtd');
  } catch (e) {
    __WEBPACK_IMPORTED_MODULE_1__src_utils__["logError"]('unable to parse __brtd');
  }

  var predictorData = _objectSpread({}, {
    sk: _moduleParams.siteKey,
    sw: win.screen && win.screen.width || -1,
    sh: win.screen && win.screen.height || -1,
    url: encodeURIComponent("".concat(doc.location.protocol, "//").concat(doc.location.host).concat(doc.location.pathname))
  }, {}, browsiData ? {
    us: browsiData
  } : {
    us: '{}'
  }, {}, document.referrer ? {
    r: document.referrer
  } : {}, {}, document.title ? {
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

      var slots = getAllSlots();

      if (!slots) {
        return onDone({});
      }

      var dataToReturn = adUnits.reduce(function (rp, cau) {
        var adUnitCode = cau && cau.code;

        if (!adUnitCode) {
          return rp;
        }

        var predictionData = _predictions[adUnitCode];

        if (!predictionData) {
          return rp;
        }

        if (predictionData.p) {
          if (!isIdMatchingAdUnit(adUnitCode, slots, predictionData.w)) {
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
  return __WEBPACK_IMPORTED_MODULE_1__src_utils__["isGptPubadsDefined"] && window.googletag.pubads().getSlots();
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
 * @param {number} id placement id
 * @param {Object[]} allSlots google slots on page
 * @param {string[]} whitelist ad units
 * @return {boolean}
 */


function isIdMatchingAdUnit(id, allSlots, whitelist) {
  if (!whitelist || !whitelist.length) {
    return true;
  }

  var slot = allSlots.filter(function (s) {
    return s.getSlotElementId() === id;
  });
  var slotAdUnits = slot.map(function (s) {
    return s.getAdUnitPath();
  });
  return slotAdUnits.some(function (a) {
    return whitelist.indexOf(a) !== -1;
  });
}
/**
 * XMLHttpRequest to get data form browsi server
 * @param {string} url server url with query params
 */

function getPredictionsFromServer(url) {
  Object(__WEBPACK_IMPORTED_MODULE_3__src_ajax__["a" /* ajax */])(url, {
    success: function success(response, req) {
      if (req.status === 200) {
        try {
          var data = JSON.parse(response);

          if (data && data.p && data.kn) {
            setData({
              p: data.p,
              kn: data.kn
            });
          } else {
            setData({});
          }

          addBrowsiTag(data.u);
        } catch (err) {
          __WEBPACK_IMPORTED_MODULE_1__src_utils__["logError"]('unable to parse data');
          setData({});
        }
      } else if (req.status === 204) {
        // unrecognized site key
        setData({});
      }
    },
    error: function error() {
      setData({});
      __WEBPACK_IMPORTED_MODULE_1__src_utils__["logError"]('unable to get prediction data');
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
    } catch (e) {
      _moduleParams = {};
    }

    if (_moduleParams.siteKey && _moduleParams.pubKey && _moduleParams.url) {
      confListener();
      collectData();
    } else {
      __WEBPACK_IMPORTED_MODULE_1__src_utils__["logError"]('missing params for Browsi provider');
    }
  });
}
Object(__WEBPACK_IMPORTED_MODULE_2__src_hook__["e" /* submodule */])('realTimeData', browsiSubmodule);
init(__WEBPACK_IMPORTED_MODULE_0__src_config_js__["b" /* config */]);

/***/ })

},[205]);