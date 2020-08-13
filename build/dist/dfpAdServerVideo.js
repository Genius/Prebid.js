pbjsChunk([235],{

/***/ 376:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(377);


/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adpodUtils", function() { return adpodUtils; });
/* harmony export (immutable) */ __webpack_exports__["buildDfpVideoUrl"] = buildDfpVideoUrl;
/* harmony export (immutable) */ __webpack_exports__["notifyTranslationModule"] = notifyTranslationModule;
/* harmony export (immutable) */ __webpack_exports__["buildAdpodVideoUrl"] = buildAdpodVideoUrl;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adServerManager_js__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_targeting_js__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_hook_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_auctionManager_js__ = __webpack_require__(26);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * This module adds [DFP support]{@link https://www.doubleclickbygoogle.com/} for Video to Prebid.
 */






/**
 * @typedef {Object} DfpVideoParams
 *
 * This object contains the params needed to form a URL which hits the
 * [DFP API]{@link https://support.google.com/dfp_premium/answer/1068325?hl=en}.
 *
 * All params (except iu, mentioned below) should be considered optional. This module will choose reasonable
 * defaults for all of the other required params.
 *
 * The cust_params property, if present, must be an object. It will be merged with the rest of the
 * standard Prebid targeting params (hb_adid, hb_bidder, etc).
 *
 * @param {string} iu This param *must* be included, in order for us to create a valid request.
 * @param [string] description_url This field is required if you want Ad Exchange to bid on our ad unit...
 *   but otherwise optional
 */

/**
 * @typedef {Object} DfpVideoOptions
 *
 * @param {Object} adUnit The adUnit which this bid is supposed to help fill.
 * @param [Object] bid The bid which should be considered alongside the rest of the adserver's demand.
 *   If this isn't defined, then we'll use the winning bid for the adUnit.
 *
 * @param {DfpVideoParams} [params] Query params which should be set on the DFP request.
 *   These will override this module's defaults whenever they conflict.
 * @param {string} [url] video adserver url
 */

/** Safe defaults which work on pretty much all video calls. */

var defaultParamConstants = {
  env: 'vp',
  gdfp_req: 1,
  output: 'xml_vast3',
  unviewed_position_start: 1
};
var adpodUtils = {};
/**
 * Merge all the bid data and publisher-supplied options into a single URL, and then return it.
 *
 * @see [The DFP API]{@link https://support.google.com/dfp_premium/answer/1068325?hl=en#env} for details.
 *
 * @param {DfpVideoOptions} options Options which should be used to construct the URL.
 *
 * @return {string} A URL which calls DFP, letting options.bid
 *   (or the auction's winning bid for this adUnit, if undefined) compete alongside the rest of the
 *   demand in DFP.
 */

function buildDfpVideoUrl(options) {
  if (!options.params && !options.url) {
    Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"])("A params object or a url is required to use pbjs.adServers.dfp.buildVideoUrl");
    return;
  }

  var adUnit = options.adUnit;
  var bid = options.bid || __WEBPACK_IMPORTED_MODULE_1__src_targeting_js__["a" /* targeting */].getWinningBids(adUnit.code)[0];
  var urlComponents = {};

  if (options.url) {
    // when both `url` and `params` are given, parsed url will be overwriten
    // with any matching param components
    urlComponents = Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["parseUrl"])(options.url, {
      noDecodeWholeURL: true
    });

    if (Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isEmpty"])(options.params)) {
      return buildUrlFromAdserverUrlComponents(urlComponents, bid, options);
    }
  }

  var derivedParams = {
    correlator: Date.now(),
    sz: Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["parseSizesInput"])(adUnit.sizes).join('|'),
    url: encodeURIComponent(location.href)
  };
  var encodedCustomParams = getCustParams(bid, options);

  var queryParams = _extends({}, defaultParamConstants, urlComponents.search, derivedParams, options.params, {
    cust_params: encodedCustomParams
  });

  var descriptionUrl = getDescriptionUrl(bid, options, 'params');

  if (descriptionUrl) {
    queryParams.description_url = descriptionUrl;
  }

  return Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["buildUrl"])({
    protocol: 'https',
    host: 'securepubads.g.doubleclick.net',
    pathname: '/gampad/ads',
    search: queryParams
  });
}
function notifyTranslationModule(fn) {
  fn.call(this, 'dfp');
}
Object(__WEBPACK_IMPORTED_MODULE_4__src_hook_js__["a" /* getHook */])('registerAdserver').before(notifyTranslationModule);
/**
 * @typedef {Object} DfpAdpodOptions
 *
 * @param {string} code Ad Unit code
 * @param {Object} params Query params which should be set on the DFP request.
 * These will override this module's defaults whenever they conflict.
 * @param {function} callback Callback function to execute when master tag is ready
 */

/**
 * Creates master tag url for long-form
 * @param {DfpAdpodOptions} options
 * @returns {string} A URL which calls DFP with custom adpod targeting key values to compete with rest of the demand in DFP
 */

function buildAdpodVideoUrl() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      code = _ref.code,
      params = _ref.params,
      callback = _ref.callback;

  if (!params || !callback) {
    Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"])("A params object and a callback is required to use pbjs.adServers.dfp.buildAdpodVideoUrl");
    return;
  }

  var derivedParams = {
    correlator: Date.now(),
    sz: getSizeForAdUnit(code),
    url: encodeURIComponent(location.href)
  };

  function getSizeForAdUnit(code) {
    var adUnit = __WEBPACK_IMPORTED_MODULE_5__src_auctionManager_js__["a" /* auctionManager */].getAdUnits().filter(function (adUnit) {
      return adUnit.code === code;
    });
    var sizes = Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"])(adUnit[0], 'mediaTypes.video.playerSize');
    return Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["parseSizesInput"])(sizes).join('|');
  }

  adpodUtils.getTargeting({
    'codes': [code],
    'callback': createMasterTag
  });

  function createMasterTag(err, targeting) {
    var _initialValue;

    if (err) {
      callback(err, null);
      return;
    }

    var initialValue = (_initialValue = {}, _defineProperty(_initialValue, adpodUtils.TARGETING_KEY_PB_CAT_DUR, undefined), _defineProperty(_initialValue, adpodUtils.TARGETING_KEY_CACHE_ID, undefined), _initialValue);
    var customParams = {};

    if (targeting[code]) {
      customParams = targeting[code].reduce(function (acc, curValue) {
        if (Object.keys(curValue)[0] === adpodUtils.TARGETING_KEY_PB_CAT_DUR) {
          acc[adpodUtils.TARGETING_KEY_PB_CAT_DUR] = typeof acc[adpodUtils.TARGETING_KEY_PB_CAT_DUR] !== 'undefined' ? acc[adpodUtils.TARGETING_KEY_PB_CAT_DUR] + ',' + curValue[adpodUtils.TARGETING_KEY_PB_CAT_DUR] : curValue[adpodUtils.TARGETING_KEY_PB_CAT_DUR];
        } else if (Object.keys(curValue)[0] === adpodUtils.TARGETING_KEY_CACHE_ID) {
          acc[adpodUtils.TARGETING_KEY_CACHE_ID] = curValue[adpodUtils.TARGETING_KEY_CACHE_ID];
        }

        return acc;
      }, initialValue);
    }

    var encodedCustomParams = encodeURIComponent(Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["formatQS"])(customParams));

    var queryParams = _extends({}, defaultParamConstants, derivedParams, params, {
      cust_params: encodedCustomParams
    });

    var masterTag = Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["buildUrl"])({
      protocol: 'https',
      host: 'securepubads.g.doubleclick.net',
      pathname: '/gampad/ads',
      search: queryParams
    });
    callback(null, masterTag);
  }
}
/**
 * Builds a video url from a base dfp video url and a winning bid, appending
 * Prebid-specific key-values.
 * @param {Object} components base video adserver url parsed into components object
 * @param {AdapterBidResponse} bid winning bid object to append parameters from
 * @param {Object} options Options which should be used to construct the URL (used for custom params).
 * @return {string} video url
 */

function buildUrlFromAdserverUrlComponents(components, bid, options) {
  var descriptionUrl = getDescriptionUrl(bid, components, 'search');

  if (descriptionUrl) {
    components.search.description_url = descriptionUrl;
  }

  var encodedCustomParams = getCustParams(bid, options);
  components.search.cust_params = components.search.cust_params ? components.search.cust_params + '%26' + encodedCustomParams : encodedCustomParams;
  return Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["buildUrl"])(components);
}
/**
 * Returns the encoded vast url if it exists on a bid object, only if prebid-cache
 * is disabled, and description_url is not already set on a given input
 * @param {AdapterBidResponse} bid object to check for vast url
 * @param {Object} components the object to check that description_url is NOT set on
 * @param {string} prop the property of components that would contain description_url
 * @return {string | undefined} The encoded vast url if it exists, or undefined
 */


function getDescriptionUrl(bid, components, prop) {
  if (__WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig('cache.url')) {
    return;
  }

  if (!Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"])(components, "".concat(prop, ".description_url"))) {
    var vastUrl = bid && bid.vastUrl;

    if (vastUrl) {
      return encodeURIComponent(vastUrl);
    }
  } else {
    Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"])("input cannnot contain description_url");
  }
}
/**
 * Returns the encoded `cust_params` from the bid.adserverTargeting and adds the `hb_uuid`, and `hb_cache_id`. Optionally the options.params.cust_params
 * @param {AdapterBidResponse} bid
 * @param {Object} options this is the options passed in from the `buildDfpVideoUrl` function
 * @return {Object} Encoded key value pairs for cust_params
 */


function getCustParams(bid, options) {
  var adserverTargeting = bid && bid.adserverTargeting || {};
  var allTargetingData = {};
  var adUnit = options && options.adUnit;

  if (adUnit) {
    var allTargeting = __WEBPACK_IMPORTED_MODULE_1__src_targeting_js__["a" /* targeting */].getAllTargeting(adUnit.code);
    allTargetingData = allTargeting ? allTargeting[adUnit.code] : {};
  }

  var optCustParams = Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"])(options, 'params.cust_params');

  var customParams = _extends({}, // Why are we adding standard keys here ? Refer https://github.com/prebid/Prebid.js/issues/3664
  {
    hb_uuid: bid && bid.videoCacheKey
  }, // hb_uuid will be deprecated and replaced by hb_cache_id
  {
    hb_cache_id: bid && bid.videoCacheKey
  }, allTargetingData, adserverTargeting, optCustParams);

  return encodeURIComponent(Object(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["formatQS"])(customParams));
}

Object(__WEBPACK_IMPORTED_MODULE_0__src_adServerManager_js__["a" /* registerVideoSupport */])('dfp', {
  buildVideoUrl: buildDfpVideoUrl,
  buildAdpodVideoUrl: buildAdpodVideoUrl,
  getAdpodTargeting: function getAdpodTargeting(args) {
    return adpodUtils.getTargeting(args);
  }
});
Object(__WEBPACK_IMPORTED_MODULE_4__src_hook_js__["e" /* submodule */])('adpod', adpodUtils);

/***/ })

},[376]);