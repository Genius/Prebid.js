pbjsChunk([43],{

/***/ 176:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(177);


/***/ }),

/***/ 177:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * This module adds [DFP support]{@link https://www.doubleclickbygoogle.com/} for Video to Prebid.
                                                                                                                                                                                                                                                                   */

exports['default'] = buildDfpVideoUrl;

var _adServerManager = __webpack_require__(178);

var _targeting = __webpack_require__(28);

var _url = __webpack_require__(13);

var _utils = __webpack_require__(0);

var _config = __webpack_require__(8);

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
    (0, _utils.logError)('A params object or a url is required to use pbjs.adServers.dfp.buildVideoUrl');
    return;
  }

  var adUnit = options.adUnit;
  var bid = options.bid || (0, _targeting.getWinningBids)(adUnit.code)[0];

  var urlComponents = {};

  if (options.url) {
    // when both `url` and `params` are given, parsed url will be overwriten
    // with any matching param components
    urlComponents = (0, _url.parse)(options.url);

    if ((0, _utils.isEmpty)(options.params)) {
      return buildUrlFromAdserverUrlComponents(urlComponents, bid);
    }
  }

  var derivedParams = {
    correlator: Date.now(),
    sz: (0, _utils.parseSizesInput)(adUnit.sizes).join('|'),
    url: location.href
  };

  var adserverTargeting = bid && bid.adserverTargeting || {};

  var customParams = _extends({}, adserverTargeting, { hb_uuid: bid && bid.videoCacheKey },
  // hb_uuid should be deprecated and replaced by hb_cache_id
  { hb_cache_id: bid && bid.videoCacheKey }, options.params.cust_params);

  var queryParams = _extends({}, defaultParamConstants, urlComponents.search, derivedParams, options.params, { cust_params: encodeURIComponent((0, _url.formatQS)(customParams)) });

  var descriptionUrl = getDescriptionUrl(bid, options, 'params');
  if (descriptionUrl) {
    queryParams.description_url = descriptionUrl;
  }

  return (0, _url.format)({
    protocol: 'https',
    host: 'pubads.g.doubleclick.net',
    pathname: '/gampad/ads',
    search: queryParams
  });
}

/**
 * Builds a video url from a base dfp video url and a winning bid, appending
 * Prebid-specific key-values.
 * @param {Object} components base video adserver url parsed into components object
 * @param {AdapterBidResponse} bid winning bid object to append parameters from
 * @return {string} video url
 */
function buildUrlFromAdserverUrlComponents(components, bid) {
  var descriptionUrl = getDescriptionUrl(bid, components, 'search');
  if (descriptionUrl) {
    components.search.description_url = descriptionUrl;
  }

  var adserverTargeting = bid && bid.adserverTargeting || {};
  var customParams = _extends({}, adserverTargeting);
  components.search.cust_params = encodeURIComponent((0, _url.formatQS)(customParams));

  return (0, _url.format)(components);
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
  if (_config.config.getConfig('usePrebidCache')) {
    return;
  }

  if (!(0, _utils.deepAccess)(components, prop + '.description_url')) {
    var vastUrl = bid && bid.vastUrl;
    if (vastUrl) {
      return encodeURIComponent(vastUrl);
    }
  } else {
    (0, _utils.logError)('input cannnot contain description_url');
  }
}

(0, _adServerManager.registerVideoSupport)('dfp', {
  buildVideoUrl: buildDfpVideoUrl
});

/***/ }),

/***/ 178:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerVideoSupport = registerVideoSupport;

var _prebidGlobal = __webpack_require__(46);

var _utils = __webpack_require__(0);

var prebid = (0, _prebidGlobal.getGlobal)();

/**
 * This file defines the plugin points in prebid-core for AdServer-specific functionality.
 *
 * Its main job is to expose functions for AdServer modules to append functionality to the Prebid public API.
 * For a given Ad Server with name "adServerName", these functions will only change the API in the
 * pbjs.adServers[adServerName] namespace.
 */

/**
 * @typedef {Object} CachedVideoBid
 *
 * @property {string} videoCacheId The ID which can be used to retrieve this video from prebid-server.
 *   This is the same ID given to the callback in the videoCache's store function.
 */

/**
 * @function VideoAdUrlBuilder
 *
 * @param {CachedVideoBid} bid The winning Bid which the ad server should show, assuming it beats out
 *   the competition.
 *
 * @param {Object} options Options required by the Ad Server to make a valid AdServer URL.
 *   This object will have different properties depending on the specific ad server supported.
 *   For more information, see the docs inside the ad server module you're supporting.
 *
 * @return {string} A URL which can be passed into the Video player to play an ad.
 */

/**
 * @typedef {Object} VideoSupport
 *
 * @function {VideoAdUrlBuilder} buildVideoAdUrl
 */

/**
 * Enable video support for the Ad Server.
 *
 * @property {string} name The identifying name for this adserver.
 * @property {VideoSupport} videoSupport An object with the functions needed to support video in Prebid.
 */
function registerVideoSupport(name, videoSupport) {
  prebid.adServers = prebid.adServers || {};
  prebid.adServers[name] = prebid.adServers[name] || {};
  if (prebid.adServers[name].buildVideoUrl) {
    (0, _utils.logWarn)('Multiple calls to registerVideoSupport for AdServer ' + name + '. Expect surprising behavior.');
    return;
  }
  prebid.adServers[name].buildVideoUrl = videoSupport.buildVideoUrl;
}

/***/ })

},[176]);