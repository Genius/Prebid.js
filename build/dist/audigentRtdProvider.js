pbjsChunk([277],{

/***/ 277:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(278);


/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["setData"] = setData;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "audigentSubmodule", function() { return audigentSubmodule; });
/* harmony export (immutable) */ __webpack_exports__["init"] = init;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_prebidGlobal_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_hook_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_storageManager_js__ = __webpack_require__(9);
/**
 * This module adds audigent provider to the real time data module
 * The {@link module:modules/realTimeData} module is required
 * The module will fetch segments from audigent server
 * @module modules/audigentRtdProvider
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






var storage = Object(__WEBPACK_IMPORTED_MODULE_5__src_storageManager_js__["b" /* getStorageManager */])();
/** @type {string} */

var MODULE_NAME = 'realTimeData';
/** @type {ModuleParams} */

var _moduleParams = {};
/**
 * XMLHttpRequest to get data form audigent server
 * @param {string} url server url with query params
 */

function setData(data) {
  storage.setDataInLocalStorage('__adgntseg', JSON.stringify(data));
}

function getSegments(adUnits, onDone) {
  try {
    var jsonData = storage.getDataFromLocalStorage('__adgntseg');

    if (jsonData) {
      var data = JSON.parse(jsonData);

      if (data.audigent_segments) {
        var dataToReturn = adUnits.reduce(function (rp, cau) {
          var adUnitCode = cau && cau.code;

          if (!adUnitCode) {
            return rp;
          }

          rp[adUnitCode] = data;
          return rp;
        }, {});
        onDone(dataToReturn);
        return;
      }
    }

    getSegmentsAsync(adUnits, onDone);
  } catch (e) {
    getSegmentsAsync(adUnits, onDone);
  }
}

function getSegmentsAsync(adUnits, onDone) {
  var userIds = Object(__WEBPACK_IMPORTED_MODULE_1__src_prebidGlobal_js__["a" /* getGlobal */])().getUserIds();
  var tdid = null;

  if (userIds && userIds['tdid']) {
    tdid = userIds['tdid'];
  } else {
    onDone({});
  }

  var url = "https://seg.ad.gt/api/v1/rtb_segments?tdid=".concat(tdid);
  Object(__WEBPACK_IMPORTED_MODULE_4__src_ajax_js__["a" /* ajax */])(url, {
    success: function success(response, req) {
      if (req.status === 200) {
        try {
          var data = JSON.parse(response);

          if (data && data.audigent_segments) {
            setData(data);
            var dataToReturn = adUnits.reduce(function (rp, cau) {
              var adUnitCode = cau && cau.code;

              if (!adUnitCode) {
                return rp;
              }

              rp[adUnitCode] = data;
              return rp;
            }, {});
            onDone(dataToReturn);
          } else {
            onDone({});
          }
        } catch (err) {
          __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"]('unable to parse audigent segment data');
          onDone({});
        }
      } else if (req.status === 204) {
        // unrecognized site key
        onDone({});
      }
    },
    error: function error() {
      onDone({});
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"]('unable to get audigent segment data');
    }
  });
}
/** @type {RtdSubmodule} */


var audigentSubmodule = {
  /**
   * used to link submodule with realTimeData
   * @type {string}
   */
  name: 'audigent',

  /**
   * get data and send back to realTimeData module
   * @function
   * @param {adUnit[]} adUnits
   * @param {function} onDone
   */
  getData: getSegments
};
function init(config) {
  var confListener = config.getConfig(MODULE_NAME, function (_ref) {
    var realTimeData = _ref.realTimeData;

    try {
      _moduleParams = realTimeData.dataProviders && realTimeData.dataProviders.filter(function (pr) {
        return pr.name && pr.name.toLowerCase() === 'audigent';
      })[0].params;
      _moduleParams.auctionDelay = realTimeData.auctionDelay;
    } catch (e) {
      _moduleParams = {};
    }

    confListener();
  });
}
Object(__WEBPACK_IMPORTED_MODULE_3__src_hook_js__["e" /* submodule */])('realTimeData', audigentSubmodule);
init(__WEBPACK_IMPORTED_MODULE_0__src_config_js__["b" /* config */]);

/***/ })

},[277]);