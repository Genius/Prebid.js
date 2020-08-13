pbjsChunk([25],{

/***/ 591:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(592);


/***/ }),

/***/ 592:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["resetSyncedStatus"] = resetSyncedStatus;
/* harmony export (immutable) */ __webpack_exports__["resetWurlMap"] = resetWurlMap;
/* harmony export (immutable) */ __webpack_exports__["PrebidServer"] = PrebidServer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapter_js__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_bidfactory_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_constants_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__src_constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_adapterManager_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_native_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_events_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_events_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__src_events_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_pure_features_array_includes_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__config_js__ = __webpack_require__(593);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_pure_features_array_find_js__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }















var getConfig = __WEBPACK_IMPORTED_MODULE_5__src_config_js__["b" /* config */].getConfig;
var TYPE = __WEBPACK_IMPORTED_MODULE_3__src_constants_json__["S2S"].SRC;
var _synced = false;
var DEFAULT_S2S_TTL = 60;
var DEFAULT_S2S_CURRENCY = 'USD';
var DEFAULT_S2S_NETREVENUE = true;

var _s2sConfig;
/**
 * @typedef {Object} AdapterOptions
 * @summary s2sConfig parameter that adds arguments to resulting OpenRTB payload that goes to Prebid Server
 * @example
 * // example of multiple bidder configuration
 * pbjs.setConfig({
 *    s2sConfig: {
 *       adapterOptions: {
 *          rubicon: {singleRequest: false}
 *          appnexus: {key: "value"}
 *       }
 *    }
 * });
 */

/**
 * @typedef {Object} S2SDefaultConfig
 * @property {boolean} enabled
 * @property {number} timeout
 * @property {number} maxBids
 * @property {string} adapter
 * @property {AdapterOptions} adapterOptions
 */

/**
 * @type {S2SDefaultConfig}
 */


var s2sDefaultConfig = {
  enabled: false,
  timeout: 1000,
  maxBids: 1,
  adapter: 'prebidServer',
  adapterOptions: {},
  syncUrlModifier: {}
};
__WEBPACK_IMPORTED_MODULE_5__src_config_js__["b" /* config */].setDefaults({
  's2sConfig': s2sDefaultConfig
});
/**
 * Set config for server to server header bidding
 * @typedef {Object} options - required
 * @property {boolean} enabled enables S2S bidding
 * @property {string[]} bidders bidders to request S2S
 * @property {string} endpoint endpoint to contact
 *  === optional params below ===
 * @property {number} [timeout] timeout for S2S bidders - should be lower than `pbjs.requestBids({timeout})`
 * @property {number} [defaultTtl] ttl for S2S bidders when pbs does not return a ttl on the response - defaults to 60`
 * @property {boolean} [cacheMarkup] whether to cache the adm result
 * @property {string} [adapter] adapter code to use for S2S
 * @property {string} [syncEndpoint] endpoint URL for syncing cookies
 * @property {Object} [extPrebid] properties will be merged into request.ext.prebid
 * @property {AdapterOptions} [adapterOptions] adds arguments to resulting OpenRTB payload to Prebid Server
 */

function setS2sConfig(options) {
  if (options.defaultVendor) {
    var vendor = options.defaultVendor;
    var optionKeys = Object.keys(options);

    if (__WEBPACK_IMPORTED_MODULE_11__config_js__["a" /* S2S_VENDORS */][vendor]) {
      // vendor keys will be set if either: the key was not specified by user
      // or if the user did not set their own distinct value (ie using the system default) to override the vendor
      Object.keys(__WEBPACK_IMPORTED_MODULE_11__config_js__["a" /* S2S_VENDORS */][vendor]).forEach(function (vendorKey) {
        if (s2sDefaultConfig[vendorKey] === options[vendorKey] || !__WEBPACK_IMPORTED_MODULE_10_core_js_pure_features_array_includes_js___default()(optionKeys, vendorKey)) {
          options[vendorKey] = __WEBPACK_IMPORTED_MODULE_11__config_js__["a" /* S2S_VENDORS */][vendor][vendorKey];
        }
      });
    } else {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"]('Incorrect or unavailable prebid server default vendor option: ' + vendor);
      return false;
    }
  }

  var keys = Object.keys(options);

  if (['accountId', 'bidders', 'endpoint'].filter(function (key) {
    if (!__WEBPACK_IMPORTED_MODULE_10_core_js_pure_features_array_includes_js___default()(keys, key)) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"](key + ' missing in server to server config');
      return true;
    }

    return false;
  }).length > 0) {
    return;
  }

  _s2sConfig = options;
}

getConfig('s2sConfig', function (_ref) {
  var s2sConfig = _ref.s2sConfig;
  return setS2sConfig(s2sConfig);
});
/**
 * resets the _synced variable back to false, primiarily used for testing purposes
*/

function resetSyncedStatus() {
  _synced = false;
}
/**
 * @param  {Array} bidderCodes list of bidders to request user syncs for.
 */

function queueSync(bidderCodes, gdprConsent, uspConsent) {
  if (_synced) {
    return;
  }

  _synced = true;
  var payload = {
    uuid: __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["generateUUID"](),
    bidders: bidderCodes,
    account: _s2sConfig.accountId
  };
  var userSyncLimit = _s2sConfig.userSyncLimit;

  if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isNumber"](userSyncLimit) && userSyncLimit > 0) {
    payload['limit'] = userSyncLimit;
  }

  if (gdprConsent) {
    // only populate gdpr field if we know CMP returned consent information (ie didn't timeout or have an error)
    if (typeof gdprConsent.consentString !== 'undefined') {
      payload.gdpr = gdprConsent.gdprApplies ? 1 : 0;
    } // attempt to populate gdpr_consent if we know gdprApplies or it may apply


    if (gdprConsent.gdprApplies !== false) {
      payload.gdpr_consent = gdprConsent.consentString;
    }
  } // US Privace (CCPA) support


  if (uspConsent) {
    payload.us_privacy = uspConsent;
  }

  var jsonPayload = JSON.stringify(payload);
  Object(__WEBPACK_IMPORTED_MODULE_12__src_ajax_js__["a" /* ajax */])(_s2sConfig.syncEndpoint, function (response) {
    try {
      response = JSON.parse(response);
      doAllSyncs(response.bidder_status);
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"](e);
    }
  }, jsonPayload, {
    contentType: 'text/plain',
    withCredentials: true
  });
}

function doAllSyncs(bidders) {
  if (bidders.length === 0) {
    return;
  }

  var thisSync = bidders.pop();

  if (thisSync.no_cookie) {
    doPreBidderSync(thisSync.usersync.type, thisSync.usersync.url, thisSync.bidder, __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["bind"].call(doAllSyncs, null, bidders));
  } else {
    doAllSyncs(bidders);
  }
}
/**
 * Modify the cookie sync url from prebid server to add new params.
 *
 * @param {string} type the type of sync, "image", "redirect", "iframe"
 * @param {string} url the url to sync
 * @param {string} bidder name of bidder doing sync for
 * @param {function} done an exit callback; to signify this pixel has either: finished rendering or something went wrong
 */


function doPreBidderSync(type, url, bidder, done) {
  if (_s2sConfig.syncUrlModifier && typeof _s2sConfig.syncUrlModifier[bidder] === 'function') {
    var newSyncUrl = _s2sConfig.syncUrlModifier[bidder](type, url, bidder);

    doBidderSync(type, newSyncUrl, bidder, done);
  } else {
    doBidderSync(type, url, bidder, done);
  }
}
/**
 * Run a cookie sync for the given type, url, and bidder
 *
 * @param {string} type the type of sync, "image", "redirect", "iframe"
 * @param {string} url the url to sync
 * @param {string} bidder name of bidder doing sync for
 * @param {function} done an exit callback; to signify this pixel has either: finished rendering or something went wrong
 */


function doBidderSync(type, url, bidder, done) {
  if (!url) {
    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"]("No sync url for bidder \"".concat(bidder, "\": ").concat(url));
    done();
  } else if (type === 'image' || type === 'redirect') {
    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logMessage"]("Invoking image pixel user sync for bidder: \"".concat(bidder, "\""));
    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["triggerPixel"](url, done);
  } else if (type == 'iframe') {
    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logMessage"]("Invoking iframe user sync for bidder: \"".concat(bidder, "\""));
    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["insertUserSyncIframe"](url, done);
  } else {
    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"]("User sync type \"".concat(type, "\" not supported for bidder: \"").concat(bidder, "\""));
    done();
  }
}
/**
 * Do client-side syncs for bidders.
 *
 * @param {Array} bidders a list of bidder names
 */


function doClientSideSyncs(bidders) {
  bidders.forEach(function (bidder) {
    var clientAdapter = __WEBPACK_IMPORTED_MODULE_4__src_adapterManager_js__["default"].getBidAdapter(bidder);

    if (clientAdapter && clientAdapter.registerSyncs) {
      clientAdapter.registerSyncs([]);
    }
  });
}

function _appendSiteAppDevice(request, pageUrl) {
  if (!request) return; // ORTB specifies app OR site

  if (_typeof(__WEBPACK_IMPORTED_MODULE_5__src_config_js__["b" /* config */].getConfig('app')) === 'object') {
    request.app = __WEBPACK_IMPORTED_MODULE_5__src_config_js__["b" /* config */].getConfig('app');
    request.app.publisher = {
      id: _s2sConfig.accountId
    };
  } else {
    request.site = {};

    if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isPlainObject"](__WEBPACK_IMPORTED_MODULE_5__src_config_js__["b" /* config */].getConfig('site'))) {
      request.site = __WEBPACK_IMPORTED_MODULE_5__src_config_js__["b" /* config */].getConfig('site');
    } // set publisher.id if not already defined


    if (!__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](request.site, 'publisher.id')) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepSetValue"](request.site, 'publisher.id', _s2sConfig.accountId);
    } // set site.page if not already defined


    if (!request.site.page) {
      request.site.page = pageUrl;
    }
  }

  if (_typeof(__WEBPACK_IMPORTED_MODULE_5__src_config_js__["b" /* config */].getConfig('device')) === 'object') {
    request.device = __WEBPACK_IMPORTED_MODULE_5__src_config_js__["b" /* config */].getConfig('device');
  }

  if (!request.device) {
    request.device = {};
  }

  if (!request.device.w) {
    request.device.w = window.innerWidth;
  }

  if (!request.device.h) {
    request.device.h = window.innerHeight;
  }
}

function addBidderFirstPartyDataToRequest(request) {
  var bidderConfig = __WEBPACK_IMPORTED_MODULE_5__src_config_js__["b" /* config */].getBidderConfig();
  var fpdConfigs = Object.keys(bidderConfig).reduce(function (acc, bidder) {
    var currBidderConfig = bidderConfig[bidder];

    if (currBidderConfig.fpd) {
      var fpd = {};

      if (currBidderConfig.fpd.context) {
        fpd.site = currBidderConfig.fpd.context;
      }

      if (currBidderConfig.fpd.user) {
        fpd.user = currBidderConfig.fpd.user;
      }

      acc.push({
        bidders: [bidder],
        config: {
          fpd: fpd
        }
      });
    }

    return acc;
  }, []);

  if (fpdConfigs.length) {
    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepSetValue"](request, 'ext.prebid.bidderconfig', fpdConfigs);
  }
} // https://iabtechlab.com/wp-content/uploads/2016/07/OpenRTB-Native-Ads-Specification-Final-1.2.pdf#page=40


var nativeDataIdMap = {
  sponsoredBy: 1,
  // sponsored
  body: 2,
  // desc
  rating: 3,
  likes: 4,
  downloads: 5,
  price: 6,
  salePrice: 7,
  phone: 8,
  address: 9,
  body2: 10,
  // desc2
  cta: 12 // ctatext

};
var nativeDataNames = Object.keys(nativeDataIdMap);
var nativeImgIdMap = {
  icon: 1,
  image: 3
};
var nativeEventTrackerEventMap = {
  impression: 1,
  'viewable-mrc50': 2,
  'viewable-mrc100': 3,
  'viewable-video50': 4
};
var nativeEventTrackerMethodMap = {
  img: 1,
  js: 2
}; // enable reverse lookup

[nativeDataIdMap, nativeImgIdMap, nativeEventTrackerEventMap, nativeEventTrackerMethodMap].forEach(function (map) {
  Object.keys(map).forEach(function (key) {
    map[map[key]] = key;
  });
});
/*
 * Protocol spec for OpenRTB endpoint
 * e.g., https://<prebid-server-url>/v1/openrtb2/auction
 */

var bidIdMap = {};
var nativeAssetCache = {}; // store processed native params to preserve

/**
 * map wurl to auction id and adId for use in the BID_WON event
 */

var wurlMap = {};
/**
 * @param {string} auctionId
 * @param {string} adId generated value set to bidObject.adId by bidderFactory Bid()
 * @param {string} wurl events.winurl passed from prebidServer as wurl
 */

function addWurl(auctionId, adId, wurl) {
  if ([auctionId, adId].every(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isStr"])) {
    wurlMap["".concat(auctionId).concat(adId)] = wurl;
  }
}
/**
 * @param {string} auctionId
 * @param {string} adId generated value set to bidObject.adId by bidderFactory Bid()
 */


function removeWurl(auctionId, adId) {
  if ([auctionId, adId].every(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isStr"])) {
    wurlMap["".concat(auctionId).concat(adId)] = undefined;
  }
}
/**
 * @param {string} auctionId
 * @param {string} adId generated value set to bidObject.adId by bidderFactory Bid()
 * @return {(string|undefined)} events.winurl which was passed as wurl
 */


function getWurl(auctionId, adId) {
  if ([auctionId, adId].every(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isStr"])) {
    return wurlMap["".concat(auctionId).concat(adId)];
  }
}
/**
 * remove all cached wurls
 */


function resetWurlMap() {
  wurlMap = {};
}
var OPEN_RTB_PROTOCOL = {
  buildRequest: function buildRequest(s2sBidRequest, bidRequests, adUnits) {
    var imps = [];
    var aliases = {};
    var firstBidRequest = bidRequests[0]; // transform ad unit into array of OpenRTB impression objects

    adUnits.forEach(function (adUnit) {
      var nativeParams = Object(__WEBPACK_IMPORTED_MODULE_7__src_native_js__["g" /* processNativeAdUnitParams */])(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](adUnit, 'mediaTypes.native'));
      var nativeAssets;

      if (nativeParams) {
        try {
          nativeAssets = nativeAssetCache[adUnit.code] = Object.keys(nativeParams).reduce(function (assets, type) {
            var params = nativeParams[type];

            function newAsset(obj) {
              return _extends({
                required: params.required ? 1 : 0
              }, obj ? __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["cleanObj"](obj) : {});
            }

            switch (type) {
              case 'image':
              case 'icon':
                var imgTypeId = nativeImgIdMap[type];
                var asset = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["cleanObj"]({
                  type: imgTypeId,
                  w: __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](params, 'sizes.0'),
                  h: __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](params, 'sizes.1'),
                  wmin: __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](params, 'aspect_ratios.0.min_width'),
                  hmin: __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](params, 'aspect_ratios.0.min_height')
                });

                if (!(asset.w && asset.h || asset.hmin && asset.wmin)) {
                  throw 'invalid img sizes (must provide sizes or min_height & min_width if using aspect_ratios)';
                }

                if (Array.isArray(params.aspect_ratios)) {
                  // pass aspect_ratios as ext data I guess?
                  asset.ext = {
                    aspectratios: params.aspect_ratios.map(function (ratio) {
                      return "".concat(ratio.ratio_width, ":").concat(ratio.ratio_height);
                    })
                  };
                }

                assets.push(newAsset({
                  img: asset
                }));
                break;

              case 'title':
                if (!params.len) {
                  throw 'invalid title.len';
                }

                assets.push(newAsset({
                  title: {
                    len: params.len
                  }
                }));
                break;

              default:
                var dataAssetTypeId = nativeDataIdMap[type];

                if (dataAssetTypeId) {
                  assets.push(newAsset({
                    data: {
                      type: dataAssetTypeId,
                      len: params.len
                    }
                  }));
                }

            }

            return assets;
          }, []);
        } catch (e) {
          __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"]('error creating native request: ' + String(e));
        }
      }

      var videoParams = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](adUnit, 'mediaTypes.video');
      var bannerParams = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](adUnit, 'mediaTypes.banner');
      adUnit.bids.forEach(function (bid) {
        // OpenRTB response contains the adunit code and bidder name. These are
        // combined to create a unique key for each bid since an id isn't returned
        bidIdMap["".concat(adUnit.code).concat(bid.bidder)] = bid.bid_id; // check for and store valid aliases to add to the request

        if (__WEBPACK_IMPORTED_MODULE_4__src_adapterManager_js__["default"].aliasRegistry[bid.bidder]) {
          aliases[bid.bidder] = __WEBPACK_IMPORTED_MODULE_4__src_adapterManager_js__["default"].aliasRegistry[bid.bidder];
        }
      });
      var mediaTypes = {};

      if (bannerParams && bannerParams.sizes) {
        var sizes = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["parseSizesInput"](bannerParams.sizes); // get banner sizes in form [{ w: <int>, h: <int> }, ...]

        var format = sizes.map(function (size) {
          var _size$split = size.split('x'),
              _size$split2 = _slicedToArray(_size$split, 2),
              width = _size$split2[0],
              height = _size$split2[1];

          var w = parseInt(width, 10);
          var h = parseInt(height, 10);
          return {
            w: w,
            h: h
          };
        });
        mediaTypes['banner'] = {
          format: format
        };
      }

      if (!__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isEmpty"](videoParams)) {
        if (videoParams.context === 'outstream' && !adUnit.renderer) {
          // Don't push oustream w/o renderer to request object.
          __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"]('Outstream bid without renderer cannot be sent to Prebid Server.');
        } else {
          mediaTypes['video'] = videoParams;
        }
      }

      if (nativeAssets) {
        try {
          mediaTypes['native'] = {
            request: JSON.stringify({
              // TODO: determine best way to pass these and if we allow defaults
              context: 1,
              plcmttype: 1,
              eventtrackers: [{
                event: 1,
                methods: [1]
              }],
              // TODO: figure out how to support privacy field
              // privacy: int
              assets: nativeAssets
            }),
            ver: '1.2'
          };
        } catch (e) {
          __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"]('error creating native request: ' + String(e));
        }
      } // get bidder params in form { <bidder code>: {...params} }


      var ext = adUnit.bids.reduce(function (acc, bid) {
        var adapter = __WEBPACK_IMPORTED_MODULE_4__src_adapterManager_js__["default"].bidderRegistry[bid.bidder];

        if (adapter && adapter.getSpec().transformBidParams) {
          bid.params = adapter.getSpec().transformBidParams(bid.params, true);
        }

        acc[bid.bidder] = _s2sConfig.adapterOptions && _s2sConfig.adapterOptions[bid.bidder] ? _extends({}, bid.params, _s2sConfig.adapterOptions[bid.bidder]) : bid.params;
        return acc;
      }, {});
      var imp = {
        id: adUnit.code,
        ext: ext,
        secure: _s2sConfig.secure
      };
      /**
       * Prebid AdSlot
       * @type {(string|undefined)}
       */

      var pbAdSlot = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](adUnit, 'fpd.context.pbAdSlot');

      if (typeof pbAdSlot === 'string' && pbAdSlot) {
        __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepSetValue"](imp, 'ext.context.data.pbadslot', pbAdSlot);
      }
      /**
       * GAM Ad Unit
       * @type {(string|undefined)}
       */


      var gamAdUnit = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](adUnit, 'fpd.context.adServer.adSlot');

      if (typeof gamAdUnit === 'string' && gamAdUnit) {
        __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepSetValue"](imp, 'ext.context.data.adslot', gamAdUnit);
      }

      _extends(imp, mediaTypes); // if storedAuctionResponse has been set, pass SRID


      var storedAuctionResponseBid = __WEBPACK_IMPORTED_MODULE_13_core_js_pure_features_array_find_js___default()(firstBidRequest.bids, function (bid) {
        return bid.adUnitCode === adUnit.code && bid.storedAuctionResponse;
      });

      if (storedAuctionResponseBid) {
        __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepSetValue"](imp, 'ext.prebid.storedauctionresponse.id', storedAuctionResponseBid.storedAuctionResponse.toString());
      }

      if (imp.banner || imp.video || imp.native) {
        imps.push(imp);
      }
    });

    if (!imps.length) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"]('Request to Prebid Server rejected due to invalid media type(s) in adUnit.');
      return;
    }

    var request = {
      id: s2sBidRequest.tid,
      source: {
        tid: s2sBidRequest.tid
      },
      tmax: _s2sConfig.timeout,
      imp: imps,
      test: getConfig('debug') ? 1 : 0,
      ext: {
        prebid: {
          // set ext.prebid.auctiontimestamp with the auction timestamp. Data type is long integer.
          auctiontimestamp: firstBidRequest.auctionStart,
          targeting: {
            // includewinners is always true for openrtb
            includewinners: true,
            // includebidderkeys always false for openrtb
            includebidderkeys: false
          }
        }
      }
    }; // s2sConfig video.ext.prebid is passed through openrtb to PBS

    if (_s2sConfig.extPrebid && _typeof(_s2sConfig.extPrebid) === 'object') {
      request.ext.prebid = _extends(request.ext.prebid, _s2sConfig.extPrebid);
    }
    /**
     * @type {(string[]|string|undefined)} - OpenRTB property 'cur', currencies available for bids
     */


    var adServerCur = __WEBPACK_IMPORTED_MODULE_5__src_config_js__["b" /* config */].getConfig('currency.adServerCurrency');

    if (adServerCur && typeof adServerCur === 'string') {
      // if the value is a string, wrap it with an array
      request.cur = [adServerCur];
    } else if (Array.isArray(adServerCur) && adServerCur.length) {
      // if it's an array, get the first element
      request.cur = [adServerCur[0]];
    }

    _appendSiteAppDevice(request, firstBidRequest.refererInfo.referer); // pass schain object if it is present


    var schain = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bidRequests, '0.bids.0.schain');

    if (schain) {
      request.source.ext = {
        schain: schain
      };
    }

    if (!__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isEmpty"](aliases)) {
      request.ext.prebid.aliases = aliases;
    }

    var bidUserIdAsEids = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bidRequests, '0.bids.0.userIdAsEids');

    if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isArray"](bidUserIdAsEids) && bidUserIdAsEids.length > 0) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepSetValue"](request, 'user.ext.eids', bidUserIdAsEids);
    }

    if (bidRequests) {
      if (firstBidRequest.gdprConsent) {
        // note - gdprApplies & consentString may be undefined in certain use-cases for consentManagement module
        var gdprApplies;

        if (typeof firstBidRequest.gdprConsent.gdprApplies === 'boolean') {
          gdprApplies = firstBidRequest.gdprConsent.gdprApplies ? 1 : 0;
        }

        __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepSetValue"](request, 'regs.ext.gdpr', gdprApplies);
        __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepSetValue"](request, 'user.ext.consent', firstBidRequest.gdprConsent.consentString);
      } // US Privacy (CCPA) support


      if (firstBidRequest.uspConsent) {
        __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepSetValue"](request, 'regs.ext.us_privacy', firstBidRequest.uspConsent);
      }
    }

    if (getConfig('coppa') === true) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepSetValue"](request, 'regs.coppa', 1);
    }

    var commonFpd = getConfig('fpd') || {};

    if (commonFpd.context) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepSetValue"](request, 'site.ext.data', commonFpd.context);
    }

    if (commonFpd.user) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepSetValue"](request, 'user.ext.data', commonFpd.user);
    }

    addBidderFirstPartyDataToRequest(request);
    return request;
  },
  interpretResponse: function interpretResponse(response, bidderRequests) {
    var bids = [];

    if (response.seatbid) {
      // a seatbid object contains a `bid` array and a `seat` string
      response.seatbid.forEach(function (seatbid) {
        (seatbid.bid || []).forEach(function (bid) {
          var bidRequest;
          var key = "".concat(bid.impid).concat(seatbid.seat);

          if (bidIdMap[key]) {
            bidRequest = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["getBidRequest"](bidIdMap[key], bidderRequests);
          }

          var cpm = bid.price;
          var status = cpm !== 0 ? __WEBPACK_IMPORTED_MODULE_3__src_constants_json__["STATUS"].GOOD : __WEBPACK_IMPORTED_MODULE_3__src_constants_json__["STATUS"].NO_BID;
          var bidObject = Object(__WEBPACK_IMPORTED_MODULE_1__src_bidfactory_js__["a" /* createBid */])(status, bidRequest || {
            bidder: seatbid.seat,
            src: TYPE
          });
          bidObject.cpm = cpm;
          var serverResponseTimeMs = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](response, ['ext', 'responsetimemillis', seatbid.seat].join('.'));

          if (bidRequest && serverResponseTimeMs) {
            bidRequest.serverResponseTimeMs = serverResponseTimeMs;
          } // Look for seatbid[].bid[].ext.prebid.bidid and place it in the bidResponse object for use in analytics adapters as 'pbsBidId'


          var bidId = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bid, 'ext.prebid.bidid');

          if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isStr"](bidId)) {
            bidObject.pbsBidId = bidId;
          } // store wurl by auctionId and adId so it can be accessed from the BID_WON event handler


          if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isStr"](__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bid, 'ext.prebid.events.win'))) {
            addWurl(bidRequest.auctionId, bidObject.adId, __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bid, 'ext.prebid.events.win'));
          }

          var extPrebidTargeting = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bid, 'ext.prebid.targeting'); // If ext.prebid.targeting exists, add it as a property value named 'adserverTargeting'
          // The removal of hb_winurl and hb_bidid targeting values is temporary
          // once we get through the transition, this block will be removed.

          if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isPlainObject"](extPrebidTargeting)) {
            // If wurl exists, remove hb_winurl and hb_bidid targeting attributes
            if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isStr"](__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bid, 'ext.prebid.events.win'))) {
              extPrebidTargeting = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["getDefinedParams"](extPrebidTargeting, Object.keys(extPrebidTargeting).filter(function (i) {
                return i.indexOf('hb_winurl') === -1 && i.indexOf('hb_bidid') === -1;
              }));
            }

            bidObject.adserverTargeting = extPrebidTargeting;
          }

          bidObject.seatBidId = bid.id;

          if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bid, 'ext.prebid.type') === __WEBPACK_IMPORTED_MODULE_6__src_mediaTypes_js__["d" /* VIDEO */]) {
            bidObject.mediaType = __WEBPACK_IMPORTED_MODULE_6__src_mediaTypes_js__["d" /* VIDEO */];
            var sizes = bidRequest.sizes && bidRequest.sizes[0];
            bidObject.playerHeight = sizes[0];
            bidObject.playerWidth = sizes[1]; // try to get cache values from 'response.ext.prebid.cache.js'
            // else try 'bid.ext.prebid.targeting' as fallback

            if (bid.ext.prebid.cache && _typeof(bid.ext.prebid.cache.vastXml) === 'object' && bid.ext.prebid.cache.vastXml.cacheId && bid.ext.prebid.cache.vastXml.url) {
              bidObject.videoCacheKey = bid.ext.prebid.cache.vastXml.cacheId;
              bidObject.vastUrl = bid.ext.prebid.cache.vastXml.url;
            } else if (extPrebidTargeting && extPrebidTargeting.hb_uuid && extPrebidTargeting.hb_cache_host && extPrebidTargeting.hb_cache_path) {
              bidObject.videoCacheKey = extPrebidTargeting.hb_uuid; // build url using key and cache host

              bidObject.vastUrl = "https://".concat(extPrebidTargeting.hb_cache_host).concat(extPrebidTargeting.hb_cache_path, "?uuid=").concat(extPrebidTargeting.hb_uuid);
            }

            if (bid.adm) {
              bidObject.vastXml = bid.adm;
            }

            if (!bidObject.vastUrl && bid.nurl) {
              bidObject.vastUrl = bid.nurl;
            }
          } else if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bid, 'ext.prebid.type') === __WEBPACK_IMPORTED_MODULE_6__src_mediaTypes_js__["c" /* NATIVE */]) {
            var _trackers;

            bidObject.mediaType = __WEBPACK_IMPORTED_MODULE_6__src_mediaTypes_js__["c" /* NATIVE */];
            var adm;

            if (typeof bid.adm === 'string') {
              adm = bidObject.adm = JSON.parse(bid.adm);
            } else {
              adm = bidObject.adm = bid.adm;
            }

            var trackers = (_trackers = {}, _defineProperty(_trackers, nativeEventTrackerMethodMap.img, adm.imptrackers || []), _defineProperty(_trackers, nativeEventTrackerMethodMap.js, adm.jstracker ? [adm.jstracker] : []), _trackers);

            if (adm.eventtrackers) {
              adm.eventtrackers.forEach(function (tracker) {
                switch (tracker.method) {
                  case nativeEventTrackerMethodMap.img:
                    trackers[nativeEventTrackerMethodMap.img].push(tracker.url);
                    break;

                  case nativeEventTrackerMethodMap.js:
                    trackers[nativeEventTrackerMethodMap.js].push(tracker.url);
                    break;
                }
              });
            }

            if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isPlainObject"](adm) && Array.isArray(adm.assets)) {
              var origAssets = nativeAssetCache[bidRequest.adUnitCode];
              bidObject.native = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["cleanObj"](adm.assets.reduce(function (native, asset) {
                var origAsset = origAssets[asset.id];

                if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isPlainObject"](asset.img)) {
                  native[origAsset.img.type ? nativeImgIdMap[origAsset.img.type] : 'image'] = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["pick"](asset.img, ['url', 'w as width', 'h as height']);
                } else if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isPlainObject"](asset.title)) {
                  native['title'] = asset.title.text;
                } else if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isPlainObject"](asset.data)) {
                  nativeDataNames.forEach(function (dataType) {
                    if (nativeDataIdMap[dataType] === origAsset.data.type) {
                      native[dataType] = asset.data.value;
                    }
                  });
                }

                return native;
              }, __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["cleanObj"]({
                clickUrl: adm.link,
                clickTrackers: __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](adm, 'link.clicktrackers'),
                impressionTrackers: trackers[nativeEventTrackerMethodMap.img],
                javascriptTrackers: trackers[nativeEventTrackerMethodMap.js]
              })));
            } else {
              __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"]('prebid server native response contained no assets');
            }
          } else {
            // banner
            if (bid.adm && bid.nurl) {
              bidObject.ad = bid.adm;
              bidObject.ad += __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["createTrackPixelHtml"](decodeURIComponent(bid.nurl));
            } else if (bid.adm) {
              bidObject.ad = bid.adm;
            } else if (bid.nurl) {
              bidObject.adUrl = bid.nurl;
            }
          }

          bidObject.width = bid.w;
          bidObject.height = bid.h;

          if (bid.dealid) {
            bidObject.dealId = bid.dealid;
          }

          bidObject.requestId = bidRequest.bidId || bidRequest.bid_Id;
          bidObject.creative_id = bid.crid;
          bidObject.creativeId = bid.crid;

          if (bid.burl) {
            bidObject.burl = bid.burl;
          }

          bidObject.currency = response.cur ? response.cur : DEFAULT_S2S_CURRENCY;
          bidObject.meta = bidObject.meta || {};

          if (bid.adomain) {
            bidObject.meta.advertiserDomains = bid.adomain;
          } // TODO: Remove when prebid-server returns ttl and netRevenue


          var configTtl = _s2sConfig.defaultTtl || DEFAULT_S2S_TTL;
          bidObject.ttl = bid.ttl ? bid.ttl : configTtl;
          bidObject.netRevenue = bid.netRevenue ? bid.netRevenue : DEFAULT_S2S_NETREVENUE;
          bids.push({
            adUnit: bid.impid,
            bid: bidObject
          });
        });
      });
    }

    return bids;
  }
};
/**
 * BID_WON event to request the wurl
 * @param {Bid} bid the winning bid object
 */

function bidWonHandler(bid) {
  var wurl = getWurl(bid.auctionId, bid.adId);

  if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isStr"](wurl)) {
    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logMessage"]("Invoking image pixel for wurl on BID_WIN: \"".concat(wurl, "\""));
    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["triggerPixel"](wurl); // remove from wurl cache, since the wurl url was called

    removeWurl(bid.auctionId, bid.adId);
  }
}
/**
 * Bidder adapter for Prebid Server
 */


function PrebidServer() {
  var baseAdapter = new __WEBPACK_IMPORTED_MODULE_0__src_adapter_js__["a" /* default */]('prebidServer');
  /* Prebid executes this function when the page asks to send out bid requests */

  baseAdapter.callBids = function (s2sBidRequest, bidRequests, addBidResponse, done, ajax) {
    var adUnits = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepClone"](s2sBidRequest.ad_units); // at this point ad units should have a size array either directly or mapped so filter for that

    var validAdUnits = adUnits.filter(function (unit) {
      return unit.mediaTypes && (unit.mediaTypes.native || unit.mediaTypes.banner && unit.mediaTypes.banner.sizes || unit.mediaTypes.video && unit.mediaTypes.video.playerSize);
    }); // in case config.bidders contains invalid bidders, we only process those we sent requests for

    var requestedBidders = validAdUnits.map(function (adUnit) {
      return adUnit.bids.map(function (bid) {
        return bid.bidder;
      }).filter(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["uniques"]);
    }).reduce(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["flatten"]).filter(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["uniques"]);

    if (_s2sConfig && _s2sConfig.syncEndpoint) {
      var gdprConsent, uspConsent;

      if (Array.isArray(bidRequests) && bidRequests.length > 0) {
        gdprConsent = bidRequests[0].gdprConsent;
        uspConsent = bidRequests[0].uspConsent;
      }

      var syncBidders = _s2sConfig.bidders.map(function (bidder) {
        return __WEBPACK_IMPORTED_MODULE_4__src_adapterManager_js__["default"].aliasRegistry[bidder] || bidder;
      }).filter(function (bidder, index, array) {
        return array.indexOf(bidder) === index;
      });

      queueSync(syncBidders, gdprConsent, uspConsent);
    }

    var request = OPEN_RTB_PROTOCOL.buildRequest(s2sBidRequest, bidRequests, validAdUnits);
    var requestJson = request && JSON.stringify(request);

    if (request && requestJson) {
      ajax(_s2sConfig.endpoint, {
        success: function success(response) {
          return handleResponse(response, requestedBidders, bidRequests, addBidResponse, done);
        },
        error: done
      }, requestJson, {
        contentType: 'text/plain',
        withCredentials: true
      });
    }
  };
  /* Notify Prebid of bid responses so bids can get in the auction */


  function handleResponse(response, requestedBidders, bidderRequests, addBidResponse, done) {
    var result;
    var bids = [];

    try {
      result = JSON.parse(response);
      bids = OPEN_RTB_PROTOCOL.interpretResponse(result, bidderRequests, requestedBidders);
      bids.forEach(function (_ref2) {
        var adUnit = _ref2.adUnit,
            bid = _ref2.bid;

        if (Object(__WEBPACK_IMPORTED_MODULE_8__src_adapters_bidderFactory_js__["isValid"])(adUnit, bid, bidderRequests)) {
          addBidResponse(adUnit, bid);
        }
      });
      bidderRequests.forEach(function (bidderRequest) {
        return __WEBPACK_IMPORTED_MODULE_9__src_events_js___default.a.emit(__WEBPACK_IMPORTED_MODULE_3__src_constants_json__["EVENTS"].BIDDER_DONE, bidderRequest);
      });
    } catch (error) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"](error);
    }

    if (!result || result.status && __WEBPACK_IMPORTED_MODULE_10_core_js_pure_features_array_includes_js___default()(result.status, 'Error')) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"]('error parsing response: ', result.status);
    }

    done();
    doClientSideSyncs(requestedBidders);
  } // Listen for bid won to call wurl


  __WEBPACK_IMPORTED_MODULE_9__src_events_js___default.a.on(__WEBPACK_IMPORTED_MODULE_3__src_constants_json__["EVENTS"].BID_WON, bidWonHandler);
  return _extends(this, {
    callBids: baseAdapter.callBids,
    setBidderCode: baseAdapter.setBidderCode,
    type: TYPE
  });
}
__WEBPACK_IMPORTED_MODULE_4__src_adapterManager_js__["default"].registerBidAdapter(new PrebidServer(), 'prebidServer');

/***/ }),

/***/ 593:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return S2S_VENDORS; });
// accountId and bidders params are not included here, should be configured by end-user
var S2S_VENDORS = {
  'appnexus': {
    adapter: 'prebidServer',
    enabled: true,
    endpoint: 'https://prebid.adnxs.com/pbs/v1/openrtb2/auction',
    syncEndpoint: 'https://prebid.adnxs.com/pbs/v1/cookie_sync',
    timeout: 1000
  },
  'rubicon': {
    adapter: 'prebidServer',
    enabled: true,
    endpoint: 'https://prebid-server.rubiconproject.com/openrtb2/auction',
    syncEndpoint: 'https://prebid-server.rubiconproject.com/cookie_sync',
    timeout: 500
  }
};

/***/ })

},[591]);