pbjsChunk([147],{

/***/ 266:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(267);


/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIDDER_CODE", function() { return BIDDER_CODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADAPTER_VERSION", function() { return ADAPTER_VERSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOMAIN", function() { return DOMAIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOMAIN_STAGING", function() { return DOMAIN_STAGING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOMAIN_DEVELOPMENT", function() { return DOMAIN_DEVELOPMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENTS_PATH", function() { return EVENTS_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIDDER_PATH", function() { return BIDDER_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USER_SYNC_IFRAME_PATH", function() { return USER_SYNC_IFRAME_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USER_SYNC_IMAGE_PATH", function() { return USER_SYNC_IMAGE_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PRODUCTION", function() { return PRODUCTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STAGING", function() { return STAGING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEVELOPMENT", function() { return DEVELOPMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_ENV", function() { return DEFAULT_ENV; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ON_ADAPTER_CALLED", function() { return ON_ADAPTER_CALLED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ON_BID_WON", function() { return ON_BID_WON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ON_BIDDER_TIMEOUT", function() { return ON_BIDDER_TIMEOUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IN_CONTENT", function() { return IN_CONTENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FOOTER", function() { return FOOTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OVERLAY", function() { return OVERLAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WALLPAPER", function() { return WALLPAPER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VENDOR_ID", function() { return VENDOR_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBidRequestValid", function() { return isBidRequestValid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buildRequests", function() { return _buildRequests; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interpretResponse", function() { return interpretResponse; });
/* harmony export (immutable) */ __webpack_exports__["onAdapterCalled"] = onAdapterCalled;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onBidWon", function() { return _onBidWon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onTimeout", function() { return _onTimeout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserSyncs", function() { return _getUserSyncs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "domain", function() { return domain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventsUrl", function() { return eventsUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bidderUrl", function() { return bidderUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userSyncIframeUrl", function() { return userSyncIframeUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userSyncImageUrl", function() { return userSyncImageUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateSizes", function() { return validateSizes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateContext", function() { return validateContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateExternalId", function() { return validateExternalId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conformBidRequest", function() { return conformBidRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gdprConsent", function() { return gdprConsent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "requestsPayload", function() { return requestsPayload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getViewDimensions", function() { return getViewDimensions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDeviceDimensions", function() { return getDeviceDimensions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDocumentDimensions", function() { return getDocumentDimensions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isWebGLEnabled", function() { return isWebGLEnabled; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDeviceInfo", function() { return getDeviceInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveEnv", function() { return resolveEnv; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveDebug", function() { return resolveDebug; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_url__ = __webpack_require__(9);
/**
 * This file contains Emoteev bid adpater.
 *
 * It is organised as follows:
 *   - Constants values;
 *   - Spec API functions, which should be pristine pure;
 *   - Ancillary functions, which should be as pure as possible;
 *   - Adapter API, where unpure side-effects happen.
 *
 * The code style is « functional core, imperative shell ».
 *
 * @link   https://www.emoteev.io
 * @file   This files defines the spec of EmoteevBidAdapter.
 * @author Emoteev Engineering <engineering@emoteev.io>.
 */





var BIDDER_CODE = 'emoteev';
/**
 * Version number of the adapter API.
 */

var ADAPTER_VERSION = '1.35.0';
var DOMAIN = 'prebid.emoteev.xyz';
var DOMAIN_STAGING = 'prebid-staging.emoteev.xyz';
var DOMAIN_DEVELOPMENT = 'localhost:3000';
/**
 * Path of Emoteev endpoint for events.
 */

var EVENTS_PATH = '/api/ad_event.json';
/**
 * Path of Emoteev bidder.
 */

var BIDDER_PATH = '/api/prebid/bid';
var USER_SYNC_IFRAME_PATH = '/api/prebid/sync-iframe';
var USER_SYNC_IMAGE_PATH = '/api/prebid/sync-image';
var PRODUCTION = 'production';
var STAGING = 'staging';
var DEVELOPMENT = 'development';
var DEFAULT_ENV = PRODUCTION;
var ON_ADAPTER_CALLED = 'on_adapter_called';
var ON_BID_WON = 'on_bid_won';
var ON_BIDDER_TIMEOUT = 'on_bidder_timeout';
var IN_CONTENT = 'content';
var FOOTER = 'footer';
var OVERLAY = 'overlay';
var WALLPAPER = 'wallpaper';
/**
 * Vendor ID assigned to Emoteev from the Global Vendor & CMP List.
 *
 * See https://vendorlist.consensu.org/vendorinfo.json for more information.
 * @type {number}
 */

var VENDOR_ID = 15;
/**
 * Pure function. See http://prebid.org/dev-docs/bidder-adaptor.html#valid-build-requests-array for detailed semantic.
 *
 * @param {AdUnit.bidRequest} bidRequest
 * @returns {boolean} Is this bidRequest valid?
 */

var isBidRequestValid = function isBidRequestValid(bidRequest) {
  return !!(bidRequest && bidRequest.params && Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"])(bidRequest, 'params.adSpaceId') && validateContext(Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"])(bidRequest, 'params.context')) && validateExternalId(Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"])(bidRequest, 'params.externalId')) && bidRequest.bidder === BIDDER_CODE && validateSizes(Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"])(bidRequest, 'mediaTypes.banner.sizes')));
};
/**
 * Pure function. See http://prebid.org/dev-docs/bidder-adaptor.html#serverrequest-objects for detailed semantic.
 *
 * @param {string} env Emoteev environment parameter
 * @param {boolean} debug Pbjs debug parameter.
 * @param {string} currency See http://prebid.org/dev-docs/modules/currency.html for detailed semantic.
 * @param {Array<BidRequest>} validBidRequests Takes an array of bid requests, which are guaranteed to have passed the isBidRequestValid() test.
 * @param  bidderRequest General context for a bidder request being constructed
 * @returns {ServerRequest}
 */

var _buildRequests = function buildRequests(env, debug, currency, validBidRequests, bidderRequest) {
  return {
    method: 'POST',
    url: bidderUrl(env),
    data: JSON.stringify(requestsPayload(debug, currency, validBidRequests, bidderRequest)) // Keys with undefined values will be filtered out.

  };
};
/**
 * Pure function. See http://prebid.org/dev-docs/bidder-adaptor.html#interpreting-the-response for detailed semantic.
 *
 * @param {Array} serverResponse.body The body of the server response is an array of bid objects.
 * @returns {Array}
 */



var interpretResponse = function interpretResponse(serverResponse) {
  return serverResponse.body;
};
/**
 * Pure function. See http://prebid.org/dev-docs/bidder-adaptor.html#registering-on-set-targeting for detailed semantic.
 *
 * @param {string} env Emoteev environment parameter.
 * @param {BidRequest} bidRequest
 * @returns {UrlObject}
 */

function onAdapterCalled(env, bidRequest) {
  return {
    protocol: 'https',
    hostname: domain(env),
    pathname: EVENTS_PATH,
    search: {
      eventName: ON_ADAPTER_CALLED,
      pubcId: Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"])(bidRequest, 'crumbs.pubcid'),
      bidId: bidRequest.bidId,
      adSpaceId: Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"])(bidRequest, 'params.adSpaceId'),
      cache_buster: Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["getUniqueIdentifierStr"])()
    }
  };
}
/**
 * Pure function. See http://prebid.org/dev-docs/bidder-adaptor.html#registering-on-bid-won for detailed semantic.
 *
 * @param {string} env Emoteev environment parameter.
 * @param {string} pubcId Publisher common id. See http://prebid.org/dev-docs/modules/pubCommonId.html for detailed semantic.
 * @param bidObject
 * @returns {UrlObject}
 */

var _onBidWon = function onBidWon(env, pubcId, bidObject) {
  var bidId = bidObject.requestId;
  return {
    protocol: 'https',
    hostname: domain(env),
    pathname: EVENTS_PATH,
    search: {
      eventName: ON_BID_WON,
      pubcId: pubcId,
      bidId: bidId,
      cache_buster: Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["getUniqueIdentifierStr"])()
    }
  };
};
/**
 * Pure function. See http://prebid.org/dev-docs/bidder-adaptor.html#registering-on-timeout for detailed semantic.
 *
 * @param {string} env Emoteev environment parameter.
 * @param {BidRequest} bidRequest
 * @returns {UrlObject}
 */




var _onTimeout = function onTimeout(env, bidRequest) {
  return {
    protocol: 'https',
    hostname: domain(env),
    pathname: EVENTS_PATH,
    search: {
      eventName: ON_BIDDER_TIMEOUT,
      pubcId: Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"])(bidRequest, 'crumbs.pubcid'),
      bidId: bidRequest.bidId,
      adSpaceId: Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"])(bidRequest, 'params.adSpaceId'),
      timeout: bidRequest.timeout,
      cache_buster: Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["getUniqueIdentifierStr"])()
    }
  };
};
/**
 * Pure function. See http://prebid.org/dev-docs/bidder-adaptor.html#registering-user-syncs for detailed semantic.
 *
 * @param {string} env Emoteev environment parameter
 * @param {SyncOptions} syncOptions
 * @returns userSyncs
 */




var _getUserSyncs = function getUserSyncs(env, syncOptions) {
  var syncs = [];

  if (syncOptions.pixelEnabled) {
    syncs.push({
      type: 'image',
      url: userSyncImageUrl(env)
    });
  }

  if (syncOptions.iframeEnabled) {
    syncs.push({
      type: 'iframe',
      url: userSyncIframeUrl(env)
    });
  }

  return syncs;
};
/**
 * Pure function.
 *
 * @param {string} env Emoteev environment parameter
 * @returns {string} The domain for network calls to Emoteev.
 */



var domain = function domain(env) {
  switch (env) {
    case DEVELOPMENT:
      return DOMAIN_DEVELOPMENT;

    case STAGING:
      return DOMAIN_STAGING;

    default:
      return DOMAIN;
  }
};
/**
 * Pure function.
 *
 * @param {string} env Emoteev environment parameter
 * @returns {string} The full URL which events is sent to.
 */

var eventsUrl = function eventsUrl(env) {
  return __WEBPACK_IMPORTED_MODULE_4__src_url__["a" /* format */]({
    protocol: env === DEVELOPMENT ? 'http' : 'https',
    hostname: domain(env),
    pathname: EVENTS_PATH
  });
};
/**
 * Pure function.
 *
 * @param {string} env Emoteev environment parameter
 * @returns {string} The full URL which bidderRequest is sent to.
 */

var bidderUrl = function bidderUrl(env) {
  return __WEBPACK_IMPORTED_MODULE_4__src_url__["a" /* format */]({
    protocol: env === DEVELOPMENT ? 'http' : 'https',
    hostname: domain(env),
    pathname: BIDDER_PATH
  });
};
/**
 * Pure function.
 *
 * @param {string} env Emoteev environment parameter
 * @returns {string} The full URL called for iframe-based user sync
 */

var userSyncIframeUrl = function userSyncIframeUrl(env) {
  return __WEBPACK_IMPORTED_MODULE_4__src_url__["a" /* format */]({
    protocol: env === DEVELOPMENT ? 'http' : 'https',
    hostname: domain(env),
    pathname: USER_SYNC_IFRAME_PATH
  });
};
/**
 * Pure function.
 *
 * @param {string} env Emoteev environment parameter
 * @returns {string} The full URL called for image-based user sync
 */

var userSyncImageUrl = function userSyncImageUrl(env) {
  return __WEBPACK_IMPORTED_MODULE_4__src_url__["a" /* format */]({
    protocol: env === DEVELOPMENT ? 'http' : 'https',
    hostname: domain(env),
    pathname: USER_SYNC_IMAGE_PATH
  });
};
/**
 * Pure function.
 *
 * @param {Array<Array<int>>} sizes
 * @returns {boolean} are sizes valid?
 */

var validateSizes = function validateSizes(sizes) {
  return Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["isArray"])(sizes) && sizes.length > 0 && sizes.every(function (size) {
    return Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["isArray"])(size) && size.length === 2;
  });
};
/**
 * Pure function.
 *
 * @param {string} context
 * @returns {boolean} is param `context` valid?
 */

var validateContext = function validateContext(context) {
  return Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["contains"])([IN_CONTENT, FOOTER, OVERLAY, WALLPAPER], context);
};
/**
 * Pure function.
 *
 * @param {(number|null|undefined)} externalId
 * @returns {boolean} is param `externalId` valid?
 */

var validateExternalId = function validateExternalId(externalId) {
  return externalId === undefined || externalId === null || Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["isInteger"])(externalId) && externalId > 0;
};
/**
 * Pure function.
 *
 * @param {BidRequest} bidRequest
 * @returns {object} An object which represents a BidRequest for Emoteev server side.
 */

var conformBidRequest = function conformBidRequest(bidRequest) {
  return {
    params: bidRequest.params,
    crumbs: bidRequest.crumbs,
    sizes: bidRequest.sizes,
    bidId: bidRequest.bidId,
    bidderRequestId: bidRequest.bidderRequestId
  };
};
/**
 * Pure function.
 *
 * @param {object} bidderRequest
 * @returns {(boolean|undefined)} raw consent data.
 */

var gdprConsent = function gdprConsent(bidderRequest) {
  return (Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"])(bidderRequest, 'gdprConsent.vendorData.vendorConsents') || {})[VENDOR_ID];
};
/**
 * Pure function.
 *
 * @param {boolean} debug Pbjs debug parameter
 * @param {string} currency See http://prebid.org/dev-docs/modules/currency.html for detailed information
 * @param {BidRequest} validBidRequests
 * @param {object} bidderRequest
 * @returns
 */

var requestsPayload = function requestsPayload(debug, currency, validBidRequests, bidderRequest) {
  return {
    akPbjsVersion: ADAPTER_VERSION,
    bidRequests: validBidRequests.map(conformBidRequest),
    currency: currency,
    debug: debug,
    language: navigator.language,
    refererInfo: bidderRequest.refererInfo,
    deviceInfo: getDeviceInfo(getDeviceDimensions(window), getViewDimensions(window, document), getDocumentDimensions(document), isWebGLEnabled(document)),
    userAgent: navigator.userAgent,
    gdprApplies: Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"])(bidderRequest, 'gdprConsent.gdprApplies'),
    gdprConsent: gdprConsent(bidderRequest)
  };
};
/**
 * Pure function
 * @param {Window} window
 * @param {Document} document
 * @returns {{width: number, height: number}} View dimensions
 */

var getViewDimensions = function getViewDimensions(window, document) {
  var w = window;
  var prefix = 'inner';

  if (window.innerWidth === undefined || window.innerWidth === null) {
    w = document.documentElement || document.body;
    prefix = 'client';
  }

  return {
    width: w["".concat(prefix, "Width")],
    height: w["".concat(prefix, "Height")]
  };
};
/**
 * Pure function
 * @param {Window} window
 * @returns {{width: number, height: number}} Device dimensions
 */

var getDeviceDimensions = function getDeviceDimensions(window) {
  return {
    width: window.screen ? window.screen.width : '',
    height: window.screen ? window.screen.height : ''
  };
};
/**
 * Pure function
 * @param {Document} document
 * @returns {{width: number, height: number}} Document dimensions
 */

var getDocumentDimensions = function getDocumentDimensions(document) {
  var de = document.documentElement;
  var be = document.body;
  var bodyHeight = be ? Math.max(be.offsetHeight, be.scrollHeight) : 0;
  var w = Math.max(de.clientWidth, de.offsetWidth, de.scrollWidth);
  var h = Math.max(de.clientHeight, de.offsetHeight, de.scrollHeight, bodyHeight);
  return {
    width: isNaN(w) ? '' : w,
    height: isNaN(h) ? '' : h
  };
};
/**
 * Unpure function
 * @param {Document} document
 * @returns {boolean} Is WebGL enabled?
 */

var isWebGLEnabled = function isWebGLEnabled(document) {
  // Create test canvas
  var canvas = document.createElement('canvas'); // The gl context

  var gl = null; // Try to get the regular WebGL

  try {
    gl = canvas.getContext('webgl');
  } catch (ex) {
    canvas = undefined;
    return false;
  } // No regular WebGL found


  if (!gl) {
    // Try experimental WebGL
    try {
      gl = canvas.getContext('experimental-webgl');
    } catch (ex) {
      canvas = undefined;
      return false;
    }
  }

  return !!gl;
};
/**
 * Pure function
 * @param {{width: number, height: number}} deviceDimensions
 * @param {{width: number, height: number}} viewDimensions
 * @param {{width: number, height: number}} documentDimensions
 * @param {boolean} webGL
 * @returns {object} Device information
 */

var getDeviceInfo = function getDeviceInfo(deviceDimensions, viewDimensions, documentDimensions, webGL) {
  return {
    browserWidth: viewDimensions.width,
    browserHeight: viewDimensions.height,
    deviceWidth: deviceDimensions.width,
    deviceHeight: deviceDimensions.height,
    documentWidth: documentDimensions.width,
    documentHeight: documentDimensions.height,
    webGL: webGL
  };
};
/**
 * Pure function
 * @param {object} config pbjs config value
 * @param {string} parameter Environment override from URL query param.
 * @returns {string} One of [PRODUCTION, STAGING, DEVELOPMENT].
 */

var resolveEnv = function resolveEnv(config, parameter) {
  var configEnv = Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["deepAccess"])(config, 'emoteev.env');
  if (Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["contains"])([PRODUCTION, STAGING, DEVELOPMENT], parameter)) return parameter;else if (Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["contains"])([PRODUCTION, STAGING, DEVELOPMENT], configEnv)) return configEnv;else return DEFAULT_ENV;
};
/**
 * Pure function
 * @param {object} config pbjs config value
 * @param {string} parameter Debug override from URL query param.
 * @returns {boolean}
 */

var resolveDebug = function resolveDebug(config, parameter) {
  if (parameter && parameter.length && parameter.length > 0) return JSON.parse(parameter);else if (config.debug) return config.debug;else return false;
};
/**
 * EmoteevBidAdapter spec
 * @access public
 * @type {BidderSpec}
 */

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */]],
  isBidRequestValid: isBidRequestValid,
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    return _buildRequests(resolveEnv(__WEBPACK_IMPORTED_MODULE_3__src_config__["b" /* config */].getConfig(), Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["getParameterByName"])('emoteevEnv')), resolveDebug(__WEBPACK_IMPORTED_MODULE_3__src_config__["b" /* config */].getConfig(), Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["getParameterByName"])('debug')), __WEBPACK_IMPORTED_MODULE_3__src_config__["b" /* config */].getConfig('currency'), validBidRequests, bidderRequest);
  },
  interpretResponse: interpretResponse,
  onBidWon: function onBidWon(bidObject) {
    return Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["triggerPixel"])(__WEBPACK_IMPORTED_MODULE_4__src_url__["a" /* format */](_onBidWon(resolveEnv(__WEBPACK_IMPORTED_MODULE_3__src_config__["b" /* config */].getConfig(), Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["getParameterByName"])('emoteevEnv')), Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["getCookie"])('_pubcid'), bidObject)));
  },
  onTimeout: function onTimeout(bidRequest) {
    return Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["triggerPixel"])(__WEBPACK_IMPORTED_MODULE_4__src_url__["a" /* format */](_onTimeout(resolveEnv(__WEBPACK_IMPORTED_MODULE_3__src_config__["b" /* config */].getConfig(), Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["getParameterByName"])('emoteevEnv')), bidRequest)));
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    return _getUserSyncs(resolveEnv(__WEBPACK_IMPORTED_MODULE_3__src_config__["b" /* config */].getConfig(), Object(__WEBPACK_IMPORTED_MODULE_2__src_utils__["getParameterByName"])('emoteevEnv')), syncOptions);
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[266]);