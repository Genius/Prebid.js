pbjsChunk([222],{

/***/ 404:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(405);


/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_ajax_js__ = __webpack_require__(4);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





/**
 * Version of the FeedAd bid adapter
 * @type {string}
 */

var VERSION = '1.0.0';
/**
 * @typedef {object} FeedAdApiBidRequest
 * @inner
 *
 * @property {number} ad_type
 * @property {string} client_token
 * @property {string} placement_id
 * @property {string} sdk_version
 * @property {boolean} app_hybrid
 *
 * @property {string} [app_bundle_id]
 * @property {string} [app_name]
 * @property {object} [custom_params]
 * @property {number} [connectivity]
 * @property {string} [device_adid]
 * @property {string} [device_platform]
 */

/**
 * @typedef {object} FeedAdApiBidResponse
 * @inner
 *
 * @property {string} ad - Ad HTML payload
 * @property {number} cpm - number / float
 * @property {string} creativeId - ID of creative for tracking
 * @property {string} currency - 3-letter ISO 4217 currency-code
 * @property {number} height - Height of creative returned in [].ad
 * @property {boolean} netRevenue - Is the CPM net (true) or gross (false)?
 * @property {string} requestId - bids[].bidId
 * @property {number} ttl - Time to live for this ad
 * @property {number} width - Width of creative returned in [].ad
 */

/**
 * @typedef {object} FeedAdApiTrackingParams
 * @inner
 *
 * @property app_hybrid {boolean}
 * @property client_token {string}
 * @property klass {'prebid_bidWon'|'prebid_bidTimeout'}
 * @property placement_id {string}
 * @property prebid_auction_id {string}
 * @property prebid_bid_id {string}
 * @property prebid_transaction_id {string}
 * @property referer {string}
 * @property sdk_version {string}
 * @property [app_bundle_id] {string}
 * @property [app_name] {string}
 * @property [device_adid] {string}
 * @property [device_platform] {1|2|3} 1 - Android | 2 - iOS | 3 - Windows
 */

/**
 * Bidder network identity code
 * @type {string}
 */

var BIDDER_CODE = 'feedad';
/**
 * The media types supported by FeedAd
 * @type {MediaType[]}
 */

var MEDIA_TYPES = [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */]];
/**
 * Tag for logging
 * @type {string}
 */

var TAG = '[FeedAd]';
/**
 * Pattern for valid placement IDs
 * @type {RegExp}
 */

var PLACEMENT_ID_PATTERN = /^[a-z0-9][a-z0-9_-]+[a-z0-9]$/;
var API_ENDPOINT = 'https://api.feedad.com';
var API_PATH_BID_REQUEST = '/1/prebid/web/bids';
var API_PATH_TRACK_REQUEST = '/1/prebid/web/events';
/**
 * Stores temporary auction metadata
 * @type {Object.<string, {referer: string, transactionId: string}>}
 */

var BID_METADATA = {};
/**
 * Checks if the bid is compatible with FeedAd.
 *
 * @param {BidRequest} bid - the bid to check
 * @return {boolean} true if the bid is valid
 */

function isBidRequestValid(bid) {
  var clientToken = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'params.clientToken');

  if (!clientToken || !isValidClientToken(clientToken)) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"](TAG, "missing or invalid parameter 'clientToken'. found value:", clientToken);
    return false;
  }

  var placementId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'params.placementId');

  if (!placementId || !isValidPlacementId(placementId)) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"](TAG, "missing or invalid parameter 'placementId'. found value:", placementId);
    return false;
  }

  return true;
}
/**
 * Checks if a client token is valid
 * @param {string} clientToken - the client token
 * @return {boolean} true if the token is valid
 */


function isValidClientToken(clientToken) {
  return typeof clientToken === 'string' && clientToken.length > 0;
}
/**
 * Checks if the given placement id is of a correct format.
 * Valid IDs are words of lowercase letters from a to z and numbers from 0 to 9.
 * The words can be separated by hyphens or underscores.
 * Multiple separators must not follow each other.
 * The whole placement ID must not be larger than 256 characters.
 *
 * @param placementId - the placement id to verify
 * @returns if the placement ID is valid.
 */


function isValidPlacementId(placementId) {
  return typeof placementId === 'string' && placementId.length > 0 && placementId.length <= 256 && PLACEMENT_ID_PATTERN.test(placementId);
}
/**
 * Checks if the given media types contain unsupported settings
 * @param {MediaTypes} mediaTypes - the media types to check
 * @return {MediaTypes} the unsupported settings, empty when all types are supported
 */


function filterSupportedMediaTypes(mediaTypes) {
  return {
    banner: mediaTypes.banner,
    video: mediaTypes.video && mediaTypes.video.context === 'outstream' ? mediaTypes.video : undefined,
    native: undefined
  };
}
/**
 * Checks if the given media types are empty
 * @param {MediaTypes} mediaTypes - the types to check
 * @return {boolean} true if the types are empty
 */


function isMediaTypesEmpty(mediaTypes) {
  return Object.keys(mediaTypes).every(function (type) {
    return mediaTypes[type] === undefined;
  });
}
/**
 * Creates the bid request params the api expects from the prebid bid request
 * @param {BidRequest} request - the validated prebid bid request
 * @return {FeedAdApiBidRequest}
 */


function createApiBidRParams(request) {
  return {
    ad_type: 0,
    client_token: request.params.clientToken,
    placement_id: request.params.placementId,
    sdk_version: "prebid_".concat(VERSION),
    app_hybrid: false
  };
}
/**
 * Builds the bid request to the FeedAd Server
 * @param {BidRequest[]} validBidRequests - all validated bid requests
 * @param {object} bidderRequest - meta information
 * @return {ServerRequest|ServerRequest[]}
 */


function buildRequests(validBidRequests, bidderRequest) {
  if (!bidderRequest) {
    return [];
  }

  var acceptableRequests = validBidRequests.filter(function (request) {
    return !isMediaTypesEmpty(filterSupportedMediaTypes(request.mediaTypes));
  });

  if (acceptableRequests.length === 0) {
    return [];
  }

  var data = _extends({}, bidderRequest, {
    bids: acceptableRequests.map(function (req) {
      req.params = createApiBidRParams(req);
      return req;
    })
  });

  data.bids.forEach(function (bid) {
    return BID_METADATA[bid.bidId] = {
      referer: data.refererInfo.referer,
      transactionId: bid.transactionId
    };
  });
  return {
    method: 'POST',
    url: "".concat(API_ENDPOINT).concat(API_PATH_BID_REQUEST),
    data: data,
    options: {
      contentType: 'application/json'
    }
  };
}
/**
 * Adapts the FeedAd server response to Prebid format
 * @param {ServerResponse} serverResponse - the FeedAd server response
 * @param {BidRequest} request - the initial bid request
 * @returns {Bid[]} the FeedAd bids
 */


function interpretResponse(serverResponse, request) {
  /**
   * @type FeedAdApiBidResponse[]
   */
  return typeof serverResponse.body === 'string' ? JSON.parse(serverResponse.body) : serverResponse.body;
}
/**
 * Creates the parameters for the FeedAd tracking call
 * @param {object} data - prebid data
 * @param {'prebid_bidWon'|'prebid_bidTimeout'} klass - type of tracking call
 * @return {FeedAdApiTrackingParams|null}
 */


function createTrackingParams(data, klass) {
  var bidId = data.bidId || data.requestId;

  if (!BID_METADATA.hasOwnProperty(bidId)) {
    return null;
  }

  var _BID_METADATA$bidId = BID_METADATA[bidId],
      referer = _BID_METADATA$bidId.referer,
      transactionId = _BID_METADATA$bidId.transactionId;
  delete BID_METADATA[bidId];
  return {
    app_hybrid: false,
    client_token: data.params[0].clientToken,
    placement_id: data.params[0].placementId,
    klass: klass,
    prebid_auction_id: data.auctionId,
    prebid_bid_id: bidId,
    prebid_transaction_id: transactionId,
    referer: referer,
    sdk_version: VERSION
  };
}
/**
 * Creates a tracking handler for the given event type
 * @param klass - the event type
 * @return {Function} the tracking handler function
 */


function trackingHandlerFactory(klass) {
  return function (data) {
    if (!data) {
      return;
    }

    var params = createTrackingParams(data, klass);

    if (params) {
      Object(__WEBPACK_IMPORTED_MODULE_3__src_ajax_js__["a" /* ajax */])("".concat(API_ENDPOINT).concat(API_PATH_TRACK_REQUEST), null, JSON.stringify(params), {
        withCredentials: true,
        method: 'POST',
        contentType: 'application/json'
      });
    }
  };
}
/**
 * @type {BidderSpec}
 */


var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: MEDIA_TYPES,
  isBidRequestValid: isBidRequestValid,
  buildRequests: buildRequests,
  interpretResponse: interpretResponse,
  onTimeout: trackingHandlerFactory('prebid_bidTimeout'),
  onBidWon: trackingHandlerFactory('prebid_bidWon')
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[404]);