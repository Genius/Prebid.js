pbjsChunk([16],{

/***/ 399:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(400);


/***/ }),

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["resetSyncedStatus"] = resetSyncedStatus;
/* harmony export (immutable) */ __webpack_exports__["PrebidServer"] = PrebidServer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapter__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_bidfactory__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_constants__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_constants___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__src_constants__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_adapterManager__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_native__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_events__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_events___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__src_events__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_library_fn_array_includes__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_library_fn_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_library_fn_array_includes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__config_js__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__src_ajax__ = __webpack_require__(4);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }














var getConfig = __WEBPACK_IMPORTED_MODULE_5__src_config__["b" /* config */].getConfig;
var TYPE = __WEBPACK_IMPORTED_MODULE_3__src_constants__["S2S"].SRC;
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
__WEBPACK_IMPORTED_MODULE_5__src_config__["b" /* config */].setDefaults({
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
        if (s2sDefaultConfig[vendorKey] === options[vendorKey] || !__WEBPACK_IMPORTED_MODULE_10_core_js_library_fn_array_includes___default()(optionKeys, vendorKey)) {
          options[vendorKey] = __WEBPACK_IMPORTED_MODULE_11__config_js__["a" /* S2S_VENDORS */][vendor][vendorKey];
        }
      });
    } else {
      __WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"]('Incorrect or unavailable prebid server default vendor option: ' + vendor);
      return false;
    }
  }

  var keys = Object.keys(options);

  if (['accountId', 'bidders', 'endpoint'].filter(function (key) {
    if (!__WEBPACK_IMPORTED_MODULE_10_core_js_library_fn_array_includes___default()(keys, key)) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"](key + ' missing in server to server config');
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
    uuid: __WEBPACK_IMPORTED_MODULE_2__src_utils__["generateUUID"](),
    bidders: bidderCodes,
    account: _s2sConfig.accountId
  };
  var userSyncLimit = _s2sConfig.userSyncLimit;

  if (__WEBPACK_IMPORTED_MODULE_2__src_utils__["isNumber"](userSyncLimit) && userSyncLimit > 0) {
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
  Object(__WEBPACK_IMPORTED_MODULE_12__src_ajax__["a" /* ajax */])(_s2sConfig.syncEndpoint, function (response) {
    try {
      response = JSON.parse(response);
      doAllSyncs(response.bidder_status);
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"](e);
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
    doPreBidderSync(thisSync.usersync.type, thisSync.usersync.url, thisSync.bidder, __WEBPACK_IMPORTED_MODULE_2__src_utils__["bind"].call(doAllSyncs, null, bidders));
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
    __WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"]("No sync url for bidder \"".concat(bidder, "\": ").concat(url));
    done();
  } else if (type === 'image' || type === 'redirect') {
    __WEBPACK_IMPORTED_MODULE_2__src_utils__["logMessage"]("Invoking image pixel user sync for bidder: \"".concat(bidder, "\""));
    __WEBPACK_IMPORTED_MODULE_2__src_utils__["triggerPixel"](url, done);
  } else if (type == 'iframe') {
    __WEBPACK_IMPORTED_MODULE_2__src_utils__["logMessage"]("Invoking iframe user sync for bidder: \"".concat(bidder, "\""));
    __WEBPACK_IMPORTED_MODULE_2__src_utils__["insertUserSyncIframe"](url, done);
  } else {
    __WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"]("User sync type \"".concat(type, "\" not supported for bidder: \"").concat(bidder, "\""));
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
    var clientAdapter = __WEBPACK_IMPORTED_MODULE_4__src_adapterManager__["default"].getBidAdapter(bidder);

    if (clientAdapter && clientAdapter.registerSyncs) {
      clientAdapter.registerSyncs([]);
    }
  });
}

function _getDigiTrustQueryParams() {
  var bidRequest = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  function getDigiTrustId(bidRequest) {
    var bidRequestDigitrust = __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](bidRequest, 'bids.0.userId.digitrustid.data');

    if (bidRequestDigitrust) {
      return bidRequestDigitrust;
    }

    var digiTrustUser = __WEBPACK_IMPORTED_MODULE_5__src_config__["b" /* config */].getConfig('digiTrustId');
    return digiTrustUser && digiTrustUser.success && digiTrustUser.identity || null;
  }

  var digiTrustId = getDigiTrustId(bidRequest); // Verify there is an ID and this user has not opted out

  if (!digiTrustId || digiTrustId.privacy && digiTrustId.privacy.optout) {
    return null;
  }

  return {
    id: digiTrustId.id,
    keyv: digiTrustId.keyv
  };
}

function _appendSiteAppDevice(request, pageUrl) {
  if (!request) return; // ORTB specifies app OR site

  if (_typeof(__WEBPACK_IMPORTED_MODULE_5__src_config__["b" /* config */].getConfig('app')) === 'object') {
    request.app = __WEBPACK_IMPORTED_MODULE_5__src_config__["b" /* config */].getConfig('app');
    request.app.publisher = {
      id: _s2sConfig.accountId
    };
  } else {
    request.site = {
      publisher: {
        id: _s2sConfig.accountId
      },
      page: pageUrl
    };
  }

  if (_typeof(__WEBPACK_IMPORTED_MODULE_5__src_config__["b" /* config */].getConfig('device')) === 'object') {
    request.device = __WEBPACK_IMPORTED_MODULE_5__src_config__["b" /* config */].getConfig('device');
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

var OPEN_RTB_PROTOCOL = {
  buildRequest: function buildRequest(s2sBidRequest, bidRequests, adUnits) {
    var imps = [];
    var aliases = {}; // transform ad unit into array of OpenRTB impression objects

    adUnits.forEach(function (adUnit) {
      var nativeParams = Object(__WEBPACK_IMPORTED_MODULE_7__src_native__["g" /* processNativeAdUnitParams */])(__WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](adUnit, 'mediaTypes.native'));
      var nativeAssets;

      if (nativeParams) {
        try {
          nativeAssets = nativeAssetCache[adUnit.code] = Object.keys(nativeParams).reduce(function (assets, type) {
            var params = nativeParams[type];

            function newAsset(obj) {
              return _extends({
                required: params.required ? 1 : 0
              }, obj ? __WEBPACK_IMPORTED_MODULE_2__src_utils__["cleanObj"](obj) : {});
            }

            switch (type) {
              case 'image':
              case 'icon':
                var imgTypeId = nativeImgIdMap[type];
                var asset = __WEBPACK_IMPORTED_MODULE_2__src_utils__["cleanObj"]({
                  type: imgTypeId,
                  w: __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](params, 'sizes.0'),
                  h: __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](params, 'sizes.1'),
                  wmin: __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](params, 'aspect_ratios.0.min_width'),
                  hmin: __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](params, 'aspect_ratios.0.min_height')
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
          __WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"]('error creating native request: ' + String(e));
        }
      }

      var videoParams = __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](adUnit, 'mediaTypes.video');
      var bannerParams = __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](adUnit, 'mediaTypes.banner');
      adUnit.bids.forEach(function (bid) {
        // OpenRTB response contains the adunit code and bidder name. These are
        // combined to create a unique key for each bid since an id isn't returned
        bidIdMap["".concat(adUnit.code).concat(bid.bidder)] = bid.bid_id; // check for and store valid aliases to add to the request

        if (__WEBPACK_IMPORTED_MODULE_4__src_adapterManager__["default"].aliasRegistry[bid.bidder]) {
          aliases[bid.bidder] = __WEBPACK_IMPORTED_MODULE_4__src_adapterManager__["default"].aliasRegistry[bid.bidder];
        }
      });
      var mediaTypes = {};

      if (bannerParams && bannerParams.sizes) {
        var sizes = __WEBPACK_IMPORTED_MODULE_2__src_utils__["parseSizesInput"](bannerParams.sizes); // get banner sizes in form [{ w: <int>, h: <int> }, ...]

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

      if (!__WEBPACK_IMPORTED_MODULE_2__src_utils__["isEmpty"](videoParams)) {
        if (videoParams.context === 'outstream' && !adUnit.renderer) {
          // Don't push oustream w/o renderer to request object.
          __WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"]('Outstream bid without renderer cannot be sent to Prebid Server.');
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
          __WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"]('error creating native request: ' + String(e));
        }
      } // get bidder params in form { <bidder code>: {...params} }


      var ext = adUnit.bids.reduce(function (acc, bid) {
        var adapter = __WEBPACK_IMPORTED_MODULE_4__src_adapterManager__["default"].bidderRegistry[bid.bidder];

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

      _extends(imp, mediaTypes);

      if (imp.banner || imp.video || imp.native) {
        imps.push(imp);
      }
    });

    if (!imps.length) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"]('Request to Prebid Server rejected due to invalid media type(s) in adUnit.');
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


    var adServerCur = __WEBPACK_IMPORTED_MODULE_5__src_config__["b" /* config */].getConfig('currency.adServerCurrency');

    if (adServerCur && typeof adServerCur === 'string') {
      // if the value is a string, wrap it with an array
      request.cur = [adServerCur];
    } else if (Array.isArray(adServerCur) && adServerCur.length) {
      // if it's an array, get the first element
      request.cur = [adServerCur[0]];
    }

    _appendSiteAppDevice(request, bidRequests[0].refererInfo.referer);

    var digiTrust = _getDigiTrustQueryParams(bidRequests && bidRequests[0]);

    if (digiTrust) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepSetValue"](request, 'user.ext.digitrust', digiTrust);
    } // pass schain object if it is present


    var schain = __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](bidRequests, '0.bids.0.schain');

    if (schain) {
      request.source.ext = {
        schain: schain
      };
    }

    if (!__WEBPACK_IMPORTED_MODULE_2__src_utils__["isEmpty"](aliases)) {
      request.ext.prebid.aliases = aliases;
    }

    var bidUserId = __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](bidRequests, '0.bids.0.userId');

    if (bidUserId && _typeof(bidUserId) === 'object' && (bidUserId.tdid || bidUserId.pubcid || bidUserId.parrableid || bidUserId.lipb || bidUserId.id5id || bidUserId.criteoId || bidUserId.britepoolid)) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepSetValue"](request, 'user.ext.eids', []);

      if (bidUserId.tdid) {
        request.user.ext.eids.push({
          source: 'adserver.org',
          uids: [{
            id: bidUserId.tdid,
            ext: {
              rtiPartner: 'TDID'
            }
          }]
        });
      }

      if (bidUserId.pubcid) {
        request.user.ext.eids.push({
          source: 'pubcid.org',
          uids: [{
            id: bidUserId.pubcid
          }]
        });
      }

      if (bidUserId.parrableid) {
        request.user.ext.eids.push({
          source: 'parrable.com',
          uids: [{
            id: bidUserId.parrableid
          }]
        });
      }

      if (bidUserId.lipb && bidUserId.lipb.lipbid) {
        var liveIntent = {
          source: 'liveintent.com',
          uids: [{
            id: bidUserId.lipb.lipbid
          }]
        };

        if (Array.isArray(bidUserId.lipb.segments) && bidUserId.lipb.segments.length) {
          liveIntent.ext = {
            segments: bidUserId.lipb.segments
          };
        }

        request.user.ext.eids.push(liveIntent);
      }

      if (bidUserId.id5id) {
        request.user.ext.eids.push({
          source: 'id5-sync.com',
          uids: [{
            id: bidUserId.id5id
          }]
        });
      }

      if (bidUserId.criteoId) {
        request.user.ext.eids.push({
          source: 'criteo.com',
          uids: [{
            id: bidUserId.criteoId
          }]
        });
      }

      if (bidUserId.britepoolid) {
        request.user.ext.eids.push({
          source: 'britepool.com',
          uids: [{
            id: bidUserId.britepoolid
          }]
        });
      }
    }

    if (bidRequests) {
      if (bidRequests[0].gdprConsent) {
        // note - gdprApplies & consentString may be undefined in certain use-cases for consentManagement module
        var gdprApplies;

        if (typeof bidRequests[0].gdprConsent.gdprApplies === 'boolean') {
          gdprApplies = bidRequests[0].gdprConsent.gdprApplies ? 1 : 0;
        }

        __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepSetValue"](request, 'regs.ext.gdpr', gdprApplies);
        __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepSetValue"](request, 'user.ext.consent', bidRequests[0].gdprConsent.consentString);
      } // US Privacy (CCPA) support


      if (bidRequests[0].uspConsent) {
        __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepSetValue"](request, 'regs.ext.us_privacy', bidRequests[0].uspConsent);
      }
    }

    if (getConfig('coppa') === true) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepSetValue"](request, 'regs.coppa', 1);
    }

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
            bidRequest = __WEBPACK_IMPORTED_MODULE_2__src_utils__["getBidRequest"](bidIdMap[key], bidderRequests);
          }

          var cpm = bid.price;
          var status = cpm !== 0 ? __WEBPACK_IMPORTED_MODULE_3__src_constants__["STATUS"].GOOD : __WEBPACK_IMPORTED_MODULE_3__src_constants__["STATUS"].NO_BID;
          var bidObject = Object(__WEBPACK_IMPORTED_MODULE_1__src_bidfactory__["a" /* createBid */])(status, bidRequest || {
            bidder: seatbid.seat,
            src: TYPE
          });
          bidObject.cpm = cpm;
          var serverResponseTimeMs = __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](response, ['ext', 'responsetimemillis', seatbid.seat].join('.'));

          if (bidRequest && serverResponseTimeMs) {
            bidRequest.serverResponseTimeMs = serverResponseTimeMs;
          }

          var extPrebidTargeting = __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](bid, 'ext.prebid.targeting'); // If ext.prebid.targeting exists, add it as a property value named 'adserverTargeting'

          if (extPrebidTargeting && _typeof(extPrebidTargeting) === 'object') {
            bidObject.adserverTargeting = extPrebidTargeting;
          }

          bidObject.seatBidId = bid.id;

          if (__WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](bid, 'ext.prebid.type') === __WEBPACK_IMPORTED_MODULE_6__src_mediaTypes__["d" /* VIDEO */]) {
            bidObject.mediaType = __WEBPACK_IMPORTED_MODULE_6__src_mediaTypes__["d" /* VIDEO */];
            var sizes = bidRequest.sizes && bidRequest.sizes[0];
            bidObject.playerHeight = sizes[0];
            bidObject.playerWidth = sizes[1]; // try to get cache values from 'response.ext.prebid.cache'
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
          } else if (__WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](bid, 'ext.prebid.type') === __WEBPACK_IMPORTED_MODULE_6__src_mediaTypes__["c" /* NATIVE */]) {
            var _trackers;

            bidObject.mediaType = __WEBPACK_IMPORTED_MODULE_6__src_mediaTypes__["c" /* NATIVE */];
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

            if (__WEBPACK_IMPORTED_MODULE_2__src_utils__["isPlainObject"](adm) && Array.isArray(adm.assets)) {
              var origAssets = nativeAssetCache[bidRequest.adUnitCode];
              bidObject.native = __WEBPACK_IMPORTED_MODULE_2__src_utils__["cleanObj"](adm.assets.reduce(function (native, asset) {
                var origAsset = origAssets[asset.id];

                if (__WEBPACK_IMPORTED_MODULE_2__src_utils__["isPlainObject"](asset.img)) {
                  native[origAsset.img.type ? nativeImgIdMap[origAsset.img.type] : 'image'] = __WEBPACK_IMPORTED_MODULE_2__src_utils__["pick"](asset.img, ['url', 'w as width', 'h as height']);
                } else if (__WEBPACK_IMPORTED_MODULE_2__src_utils__["isPlainObject"](asset.title)) {
                  native['title'] = asset.title.text;
                } else if (__WEBPACK_IMPORTED_MODULE_2__src_utils__["isPlainObject"](asset.data)) {
                  nativeDataNames.forEach(function (dataType) {
                    if (nativeDataIdMap[dataType] === origAsset.data.type) {
                      native[dataType] = asset.data.value;
                    }
                  });
                }

                return native;
              }, __WEBPACK_IMPORTED_MODULE_2__src_utils__["cleanObj"]({
                clickUrl: adm.link,
                clickTrackers: __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"](adm, 'link.clicktrackers'),
                impressionTrackers: trackers[nativeEventTrackerMethodMap.img],
                javascriptTrackers: trackers[nativeEventTrackerMethodMap.js]
              })));
            } else {
              __WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"]('prebid server native response contained no assets');
            }
          } else {
            // banner
            if (bid.adm && bid.nurl) {
              bidObject.ad = bid.adm;
              bidObject.ad += __WEBPACK_IMPORTED_MODULE_2__src_utils__["createTrackPixelHtml"](decodeURIComponent(bid.nurl));
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
          } // TODO: Remove when prebid-server returns ttl, currency and netRevenue


          bidObject.ttl = bid.ttl ? bid.ttl : DEFAULT_S2S_TTL;
          bidObject.currency = bid.currency ? bid.currency : DEFAULT_S2S_CURRENCY;
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
 * Bidder adapter for Prebid Server
 */

function PrebidServer() {
  var baseAdapter = new __WEBPACK_IMPORTED_MODULE_0__src_adapter__["a" /* default */]('prebidServer');
  /* Prebid executes this function when the page asks to send out bid requests */

  baseAdapter.callBids = function (s2sBidRequest, bidRequests, addBidResponse, done, ajax) {
    var adUnits = __WEBPACK_IMPORTED_MODULE_2__src_utils__["deepClone"](s2sBidRequest.ad_units); // at this point ad units should have a size array either directly or mapped so filter for that

    var validAdUnits = adUnits.filter(function (unit) {
      return unit.mediaTypes && (unit.mediaTypes.native || unit.mediaTypes.banner && unit.mediaTypes.banner.sizes || unit.mediaTypes.video && unit.mediaTypes.video.playerSize);
    }); // in case config.bidders contains invalid bidders, we only process those we sent requests for

    var requestedBidders = validAdUnits.map(function (adUnit) {
      return adUnit.bids.map(function (bid) {
        return bid.bidder;
      }).filter(__WEBPACK_IMPORTED_MODULE_2__src_utils__["uniques"]);
    }).reduce(__WEBPACK_IMPORTED_MODULE_2__src_utils__["flatten"]).filter(__WEBPACK_IMPORTED_MODULE_2__src_utils__["uniques"]);

    if (_s2sConfig && _s2sConfig.syncEndpoint) {
      var gdprConsent, uspConsent;

      if (Array.isArray(bidRequests) && bidRequests.length > 0) {
        gdprConsent = bidRequests[0].gdprConsent;
        uspConsent = bidRequests[0].uspConsent;
      }

      var syncBidders = _s2sConfig.bidders.map(function (bidder) {
        return __WEBPACK_IMPORTED_MODULE_4__src_adapterManager__["default"].aliasRegistry[bidder] || bidder;
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

        if (Object(__WEBPACK_IMPORTED_MODULE_8__src_adapters_bidderFactory__["isValid"])(adUnit, bid, bidderRequests)) {
          addBidResponse(adUnit, bid);
        }
      });
      bidderRequests.forEach(function (bidderRequest) {
        return __WEBPACK_IMPORTED_MODULE_9__src_events___default.a.emit(__WEBPACK_IMPORTED_MODULE_3__src_constants__["EVENTS"].BIDDER_DONE, bidderRequest);
      });
    } catch (error) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"](error);
    }

    if (!result || result.status && __WEBPACK_IMPORTED_MODULE_10_core_js_library_fn_array_includes___default()(result.status, 'Error')) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils__["logError"]('error parsing response: ', result.status);
    }

    done();
    doClientSideSyncs(requestedBidders);
  }

  return _extends(this, {
    callBids: baseAdapter.callBids,
    setBidderCode: baseAdapter.setBidderCode,
    type: TYPE
  });
}
__WEBPACK_IMPORTED_MODULE_4__src_adapterManager__["default"].registerBidAdapter(new PrebidServer(), 'prebidServer');

/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return S2S_VENDORS; });
// accountId and bidders params are not included here, should be configured by end-user
var S2S_VENDORS = {
  'appnexus': {
    adapter: 'prebidServer',
    enabled: true,
    endpoint: '//prebid.adnxs.com/pbs/v1/openrtb2/auction',
    syncEndpoint: '//prebid.adnxs.com/pbs/v1/cookie_sync',
    timeout: 1000
  },
  'rubicon': {
    adapter: 'prebidServer',
    enabled: true,
    endpoint: '//prebid-server.rubiconproject.com/openrtb2/auction',
    syncEndpoint: '//prebid-server.rubiconproject.com/cookie_sync',
    timeout: 500
  }
};

/***/ })

},[399]);