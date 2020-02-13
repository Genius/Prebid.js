pbjsChunk([168],{

/***/ 366:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(367);


/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_number_is_integer__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_number_is_integer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_number_is_integer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_adapters_bidderFactory__ = __webpack_require__(1);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }






var BIDDER_CODE = 'ix';
var BANNER_SECURE_BID_URL = 'https://as-sec.casalemedia.com/cygnus';
var SUPPORTED_AD_TYPES = [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */]];
var ENDPOINT_VERSION = 7.2;
var CENT_TO_DOLLAR_FACTOR = 100;
var TIME_TO_LIVE = 35;
var NET_REVENUE = true;
var PRICE_TO_DOLLAR_FACTOR = {
  JPY: 1
};
/**
 * Transform valid bid request config object to impression object that will be sent to ad server.
 *
 * @param  {object} bid A valid bid request config object.
 * @return {object}     A impression object that will be sent to ad server.
 */

function bidToBannerImp(bid) {
  var imp = {};
  imp.id = bid.bidId;
  imp.banner = {};
  imp.banner.w = bid.params.size[0];
  imp.banner.h = bid.params.size[1];
  imp.banner.topframe = __WEBPACK_IMPORTED_MODULE_0__src_utils__["inIframe"]() ? 0 : 1;
  imp.ext = {};
  imp.ext.siteID = bid.params.siteId;

  if (bid.params.hasOwnProperty('id') && (typeof bid.params.id === 'string' || typeof bid.params.id === 'number')) {
    imp.ext.sid = String(bid.params.id);
  } else {
    imp.ext.sid = "".concat(bid.params.size[0], "x").concat(bid.params.size[1]);
  }

  if (bid.params.hasOwnProperty('bidFloor') && bid.params.hasOwnProperty('bidFloorCur')) {
    imp.bidfloor = bid.params.bidFloor;
    imp.bidfloorcur = bid.params.bidFloorCur;
  }

  return imp;
}
/**
 * Parses a raw bid for the relevant information.
 *
 * @param  {object} rawBid   The bid to be parsed.
 * @param  {string} currency Global currency in bid response.
 * @return {object} bid      The parsed bid.
 */


function parseBid(rawBid, currency) {
  var bid = {};

  if (PRICE_TO_DOLLAR_FACTOR.hasOwnProperty(currency)) {
    bid.cpm = rawBid.price / PRICE_TO_DOLLAR_FACTOR[currency];
  } else {
    bid.cpm = rawBid.price / CENT_TO_DOLLAR_FACTOR;
  }

  bid.requestId = rawBid.impid;
  bid.width = rawBid.w;
  bid.height = rawBid.h;
  bid.ad = rawBid.adm;
  bid.dealId = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](rawBid, 'ext.dealid');
  bid.ttl = TIME_TO_LIVE;
  bid.netRevenue = NET_REVENUE;
  bid.currency = currency;
  bid.creativeId = rawBid.hasOwnProperty('crid') ? rawBid.crid : '-';
  bid.meta = {};
  bid.meta.networkId = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](rawBid, 'ext.dspid');
  bid.meta.brandId = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](rawBid, 'ext.advbrandid');
  bid.meta.brandName = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](rawBid, 'ext.advbrand');
  return bid;
}
/**
 * Determines whether or not the given object is valid size format.
 *
 * @param  {*}       size The object to be validated.
 * @return {boolean}      True if this is a valid size format, and false otherwise.
 */


function isValidSize(size) {
  return Array.isArray(size) && size.length === 2 && __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_number_is_integer___default()(size[0]) && __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_number_is_integer___default()(size[1]);
}
/**
 * Determines whether or not the given size object is an element of the size
 * array.
 *
 * @param  {array}  sizeArray The size array.
 * @param  {object} size      The size object.
 * @return {boolean}          True if the size object is an element of the size array, and false
 *                            otherwise.
 */


function includesSize(sizeArray, size) {
  if (isValidSize(sizeArray)) {
    return sizeArray[0] === size[0] && sizeArray[1] === size[1];
  }

  for (var i = 0; i < sizeArray.length; i++) {
    if (sizeArray[i][0] === size[0] && sizeArray[i][1] === size[1]) {
      return true;
    }
  }

  return false;
}
/**
 * Determines whether or not the given bidFloor parameters are valid.
 *
 * @param  {*}       bidFloor    The bidFloor parameter inside bid request config.
 * @param  {*}       bidFloorCur The bidFloorCur parameter inside bid request config.
 * @return {boolean}             True if this is a valid biFfloor parameters format, and false
 *                               otherwise.
 */


function isValidBidFloorParams(bidFloor, bidFloorCur) {
  var curRegex = /^[A-Z]{3}$/;
  return Boolean(typeof bidFloor === 'number' && typeof bidFloorCur === 'string' && bidFloorCur.match(curRegex));
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: SUPPORTED_AD_TYPES,

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param  {object}  bid The bid to validate.
   * @return {boolean}     True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    if (!isValidSize(bid.params.size)) {
      return false;
    }

    if (!includesSize(bid.sizes, bid.params.size)) {
      return false;
    }

    if (bid.hasOwnProperty('mediaType') && bid.mediaType !== 'banner') {
      return false;
    }

    if (bid.hasOwnProperty('mediaTypes') && !__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.banner.sizes')) {
      return false;
    }

    if (typeof bid.params.siteId !== 'string' && typeof bid.params.siteId !== 'number') {
      return false;
    }

    var hasBidFloor = bid.params.hasOwnProperty('bidFloor');
    var hasBidFloorCur = bid.params.hasOwnProperty('bidFloorCur');

    if (hasBidFloor || hasBidFloorCur) {
      return hasBidFloor && hasBidFloorCur && isValidBidFloorParams(bid.params.bidFloor, bid.params.bidFloorCur);
    }

    return true;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param  {array}  validBidRequests A list of valid bid request config objects.
   * @param  {object} options          A object contains bids and other info like gdprConsent.
   * @return {object}                  Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, options) {
    var bannerImps = [];
    var userEids = [];
    var validBidRequest = null;
    var bannerImp = null; // Always use secure HTTPS protocol.

    var baseUrl = BANNER_SECURE_BID_URL;

    for (var i = 0; i < validBidRequests.length; i++) {
      validBidRequest = validBidRequests[i]; // Transform the bid request based on the banner format.

      bannerImp = bidToBannerImp(validBidRequest);
      bannerImps.push(bannerImp);
    } // RTI ids will be included in the bid request if the function getIdentityInfo() is loaded
    // and if the data for the partner exist


    if (window.headertag && typeof window.headertag.getIdentityInfo === 'function') {
      var identityInfo = window.headertag.getIdentityInfo();

      if (identityInfo && _typeof(identityInfo) === 'object') {
        for (var partnerName in identityInfo) {
          if (identityInfo.hasOwnProperty(partnerName)) {
            var response = identityInfo[partnerName];

            if (!response.responsePending && response.data && _typeof(response.data) === 'object' && Object.keys(response.data).length) {
              userEids.push(response.data);
            }
          }
        }
      }
    }

    var r = {}; // Since bidderRequestId are the same for different bid request, just use the first one.

    r.id = validBidRequests[0].bidderRequestId;
    r.imp = bannerImps;
    r.site = {};
    r.ext = {};
    r.ext.source = 'prebid';

    if (userEids.length > 0) {
      r.user = {};
      r.user.eids = userEids;
    }

    if (document.referrer && document.referrer !== '') {
      r.site.ref = document.referrer;
    } // Apply GDPR information to the request if GDPR is enabled.


    if (options) {
      if (options.gdprConsent) {
        var gdprConsent = options.gdprConsent;

        if (gdprConsent.hasOwnProperty('gdprApplies')) {
          r.regs = {
            ext: {
              gdpr: gdprConsent.gdprApplies ? 1 : 0
            }
          };
        }

        if (gdprConsent.hasOwnProperty('consentString')) {
          r.user = r.user || {};
          r.user.ext = {
            consent: gdprConsent.consentString || ''
          };
        }
      }

      if (options.refererInfo) {
        r.site.page = options.refererInfo.referer;
      }
    }

    var payload = {}; // Parse additional runtime configs.

    var otherIxConfig = __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('ix');

    if (otherIxConfig) {
      // Append firstPartyData to r.site.page if firstPartyData exists.
      if (_typeof(otherIxConfig.firstPartyData) === 'object') {
        var firstPartyData = otherIxConfig.firstPartyData;
        var firstPartyString = '?';

        for (var key in firstPartyData) {
          if (firstPartyData.hasOwnProperty(key)) {
            firstPartyString += "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(firstPartyData[key]), "&");
          }
        }

        firstPartyString = firstPartyString.slice(0, -1);
        r.site.page += firstPartyString;
      } // Create t in payload if timeout is configured.


      if (typeof otherIxConfig.timeout === 'number') {
        payload.t = otherIxConfig.timeout;
      }
    } // Use the siteId in the first bid request as the main siteId.


    payload.s = validBidRequests[0].params.siteId;
    payload.v = ENDPOINT_VERSION;
    payload.r = JSON.stringify(r);
    payload.ac = 'j';
    payload.sd = 1;
    return {
      method: 'GET',
      url: baseUrl,
      data: payload
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param  {object} serverResponse A successful response from the server.
   * @return {array}                 An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse) {
    var bids = [];
    var bid = null;

    if (!serverResponse.hasOwnProperty('body') || !serverResponse.body.hasOwnProperty('seatbid')) {
      return bids;
    }

    var responseBody = serverResponse.body;
    var seatbid = responseBody.seatbid;

    for (var i = 0; i < seatbid.length; i++) {
      if (!seatbid[i].hasOwnProperty('bid')) {
        continue;
      } // Transform rawBid in bid response to the format that will be accepted by prebid.


      var innerBids = seatbid[i].bid;

      for (var j = 0; j < innerBids.length; j++) {
        bid = parseBid(innerBids[j], responseBody.cur);
        bids.push(bid);
      }
    }

    return bids;
  },

  /**
   * Covert bid param types for S2S
   * @param {Object} params bid params
   * @param {Boolean} isOpenRtb boolean to check openrtb2 protocol
   * @return {Object} params bid params
   */
  transformBidParams: function transformBidParams(params, isOpenRtb) {
    return __WEBPACK_IMPORTED_MODULE_0__src_utils__["convertTypes"]({
      'siteID': 'number'
    }, params);
  }
};
Object(__WEBPACK_IMPORTED_MODULE_4__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[366]);