pbjsChunk([194],{

/***/ 464:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(465);


/***/ }),

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_number_is_integer_js__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_number_is_integer_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_number_is_integer_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_adapters_bidderFactory_js__ = __webpack_require__(1);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }







var BIDDER_CODE = 'ix';
var SECURE_BID_URL = 'https://htlb.casalemedia.com/cygnus';
var SUPPORTED_AD_TYPES = [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */]];
var BANNER_ENDPOINT_VERSION = 7.2;
var VIDEO_ENDPOINT_VERSION = 8.1;
var CENT_TO_DOLLAR_FACTOR = 100;
var BANNER_TIME_TO_LIVE = 300;
var VIDEO_TIME_TO_LIVE = 3600; // 1hr

var NET_REVENUE = true;
var PRICE_TO_DOLLAR_FACTOR = {
  JPY: 1
};
var USER_SYNC_URL = 'https://js-sec.indexww.com/um/ixmatch.html';
/**
 * Transform valid bid request config object to banner impression object that will be sent to ad server.
 *
 * @param  {object} bid A valid bid request config object.
 * @return {object}     A impression object that will be sent to ad server.
 */

function bidToBannerImp(bid) {
  var imp = bidToImp(bid);
  imp.banner = {};
  imp.banner.w = bid.params.size[0];
  imp.banner.h = bid.params.size[1];
  imp.banner.topframe = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["inIframe"]() ? 0 : 1;
  return imp;
}
/**
 * Transform valid bid request config object to video impression object that will be sent to ad server.
 *
 * @param  {object} bid A valid bid request config object.
 * @return {object}     A impression object that will be sent to ad server.
 */


function bidToVideoImp(bid) {
  var imp = bidToImp(bid);
  imp.video = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepClone"](bid.params.video);
  imp.video.w = bid.params.size[0];
  imp.video.h = bid.params.size[1];
  var context = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.video.context');

  if (context) {
    if (context === 'instream') {
      imp.video.placement = 1;
    } else if (context === 'outstream') {
      imp.video.placement = 4;
    } else {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("ix bidder params: video context '".concat(context, "' is not supported"));
    }
  }

  return imp;
}

function bidToImp(bid) {
  var imp = {};
  imp.id = bid.bidId;
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


function parseBid(rawBid, currency, bidRequest) {
  var bid = {};

  if (PRICE_TO_DOLLAR_FACTOR.hasOwnProperty(currency)) {
    bid.cpm = rawBid.price / PRICE_TO_DOLLAR_FACTOR[currency];
  } else {
    bid.cpm = rawBid.price / CENT_TO_DOLLAR_FACTOR;
  }

  bid.requestId = rawBid.impid;
  bid.dealId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](rawBid, 'ext.dealid');
  bid.netRevenue = NET_REVENUE;
  bid.currency = currency;
  bid.creativeId = rawBid.hasOwnProperty('crid') ? rawBid.crid : '-'; // in the event of a video

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](rawBid, 'ext.vasturl')) {
    bid.vastUrl = rawBid.ext.vasturl;
    bid.width = bidRequest.video.w;
    bid.height = bidRequest.video.h;
    bid.mediaType = __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */];
    bid.ttl = VIDEO_TIME_TO_LIVE;
  } else {
    bid.ad = rawBid.adm;
    bid.width = rawBid.w;
    bid.height = rawBid.h;
    bid.mediaType = __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */];
    bid.ttl = BANNER_TIME_TO_LIVE;
  }

  bid.meta = {};
  bid.meta.networkId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](rawBid, 'ext.dspid');
  bid.meta.brandId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](rawBid, 'ext.advbrandid');
  bid.meta.brandName = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](rawBid, 'ext.advbrand');

  if (rawBid.adomain && rawBid.adomain.length > 0) {
    bid.meta.advertiserDomains = rawBid.adomain;
  }

  return bid;
}
/**
 * Determines whether or not the given object is valid size format.
 *
 * @param  {*}       size The object to be validated.
 * @return {boolean}      True if this is a valid size format, and false otherwise.
 */


function isValidSize(size) {
  return Array.isArray(size) && size.length === 2 && __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_number_is_integer_js___default()(size[0]) && __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_number_is_integer_js___default()(size[1]);
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
 * @return {boolean}             True if this is a valid bidFloor parameters format, and false
 *                               otherwise.
 */


function isValidBidFloorParams(bidFloor, bidFloorCur) {
  var curRegex = /^[A-Z]{3}$/;
  return Boolean(typeof bidFloor === 'number' && typeof bidFloorCur === 'string' && bidFloorCur.match(curRegex));
}
/**
 * Finds the impression with the associated id.
 *
 * @param  {*}      id          Id of the impression.
 * @param  {array}  impressions List of impressions sent in the request.
 * @return {object}             The impression with the associated id.
 */


function getBidRequest(id, impressions) {
  if (!id) {
    return;
  }

  return __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default()(impressions, function (imp) {
    return imp.id === id;
  });
}
/**
 * Adds a User ID module's response into user Eids array.
 *
 * @param  {array}  userEids       An array of objects containing user ids,
 *                                 will be attached to bid request later.
 * @param  {object} seenIdPartners An object with Identity partners names already added,
 *                                 updated with new partner name.
 * @param  {*}      id             The id obtained from User ID module.
 * @param  {string} source         The URL of the User ID module.
 * @param  {string} ixlPartnerName The name of the Identity Partner in IX Library.
 * @param  {string} rtiPartner     The name of the User ID provider in Prebid.
 * @return {boolean}               True if successfully added the ID to the userEids, false otherwise.
 */


function addUserEids(userEids, seenIdPartners, id, source, ixlPartnerName, rtiPartner) {
  if (id) {
    // mark the partnername that IX RTI uses
    seenIdPartners[ixlPartnerName] = 1;
    userEids.push({
      source: source,
      uids: [{
        id: id,
        ext: {
          rtiPartner: rtiPartner
        }
      }]
    });
    return true;
  }

  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('Tried to add a user ID from Prebid, the ID received was null');
  return false;
}
/**
 * Builds a request object to be sent to the ad server based on bid requests.
 *
 * @param  {array}  validBidRequests A list of valid bid request config objects.
 * @param  {object} bidderRequest    An object containing other info like gdprConsent.
 * @param  {array}  impressions      List of impression objects describing the bids.
 * @param  {array}  version          Endpoint version denoting banner or video.
 * @return {object}                  Info describing the request to the server.
 *
 */


function buildRequest(validBidRequests, bidderRequest, impressions, version) {
  var userEids = []; // Always use secure HTTPS protocol.

  var baseUrl = SECURE_BID_URL; // Dict for identity partners already populated from prebid

  var seenIdPartners = {}; // Get ids from Prebid User ID Modules

  var userId = validBidRequests[0].userId;

  if (userId && _typeof(userId) === 'object') {
    if (userId.idl_env) {
      addUserEids(userEids, seenIdPartners, userId.idl_env, 'liveramp.com', 'LiveRampIp', 'idl');
    }
  } // RTI ids will be included in the bid request if the function getIdentityInfo() is loaded
  // and if the data for the partner exist


  if (window.headertag && typeof window.headertag.getIdentityInfo === 'function') {
    var identityInfo = window.headertag.getIdentityInfo();

    if (identityInfo && _typeof(identityInfo) === 'object') {
      for (var partnerName in identityInfo) {
        if (identityInfo.hasOwnProperty(partnerName)) {
          // check if not already populated by prebid cache
          if (!seenIdPartners.hasOwnProperty(partnerName)) {
            var response = identityInfo[partnerName];

            if (!response.responsePending && response.data && _typeof(response.data) === 'object' && Object.keys(response.data).length) {
              userEids.push(response.data);
            }
          }
        }
      }
    }
  }

  var r = {}; // Since bidderRequestId are the same for different bid request, just use the first one.

  r.id = validBidRequests[0].bidderRequestId;
  r.imp = impressions;
  r.site = {};
  r.ext = {};
  r.ext.source = 'prebid'; // if an schain is provided, send it along

  if (validBidRequests[0].schain) {
    r.source = {
      ext: {
        schain: validBidRequests[0].schain
      }
    };
  }

  if (userEids.length > 0) {
    r.user = {};
    r.user.eids = userEids;
  }

  if (document.referrer && document.referrer !== '') {
    r.site.ref = document.referrer;
  } // Apply GDPR information to the request if GDPR is enabled.


  if (bidderRequest) {
    if (bidderRequest.gdprConsent) {
      var gdprConsent = bidderRequest.gdprConsent;

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

    if (bidderRequest.uspConsent) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](r, 'regs.ext.us_privacy', bidderRequest.uspConsent);
    }

    if (bidderRequest.refererInfo) {
      r.site.page = bidderRequest.refererInfo.referer;
    }
  }

  var payload = {}; // Parse additional runtime configs.

  var bidderCode = bidderRequest && bidderRequest.bidderCode || 'ix';
  var otherIxConfig = __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig(bidderCode);

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
  payload.v = version;
  payload.r = JSON.stringify(r);
  payload.ac = 'j';
  payload.sd = 1;

  if (version === VIDEO_ENDPOINT_VERSION) {
    payload.nf = 1;
  }

  return {
    method: 'GET',
    url: baseUrl,
    data: payload
  };
}
/**
 *
 * @param  {array}   bannerSizeList list of banner sizes
 * @param  {array}   bannerSize the size to be removed
 * @return {boolean} true if succesfully removed, false if not found
 */


function removeFromSizes(bannerSizeList, bannerSize) {
  for (var i = 0; i < bannerSizeList.length; i++) {
    if (bannerSize[0] == bannerSizeList[i][0] && bannerSize[1] == bannerSizeList[i][1]) {
      bannerSizeList.splice(i, 1);
      return true;
    }
  } // size not found


  return false;
}
/**
 * Updates the Object to track missing banner sizes.
 *
 * @param {object} validBidRequest    The bid request for an ad unit's with a configured size.
 * @param {object} missingBannerSizes The object containing missing banner sizes
 * @param {object} imp                The impression for the bidrequest
 */


function updateMissingSizes(validBidRequest, missingBannerSizes, imp) {
  var transactionID = validBidRequest.transactionId;

  if (missingBannerSizes.hasOwnProperty(transactionID)) {
    var currentSizeList = [];

    if (missingBannerSizes[transactionID].hasOwnProperty('missingSizes')) {
      currentSizeList = missingBannerSizes[transactionID].missingSizes;
    }

    removeFromSizes(currentSizeList, validBidRequest.params.size);
    missingBannerSizes[transactionID].missingSizes = currentSizeList;
  } else {
    // New Ad Unit
    if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](validBidRequest, 'mediaTypes.banner.sizes')) {
      var sizeList = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepClone"](validBidRequest.mediaTypes.banner.sizes);
      removeFromSizes(sizeList, validBidRequest.params.size);
      var newAdUnitEntry = {
        'missingSizes': sizeList,
        'impression': imp
      };
      missingBannerSizes[transactionID] = newAdUnitEntry;
    }
  }
}
/**
 *
 * @param  {object} imp      Impression object to be modified
 * @param  {array}  newSize  The new size to be applied
 * @return {object} newImp   Updated impression object
 */


function createMissingBannerImp(imp, newSize) {
  var newImp = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepClone"](imp);
  newImp.ext.sid = "".concat(newSize[0], "x").concat(newSize[1]);
  newImp.banner.w = newSize[0];
  newImp.banner.h = newSize[1];
  return newImp;
}

var spec = {
  code: BIDDER_CODE,
  gvlid: 10,
  supportedMediaTypes: SUPPORTED_AD_TYPES,

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param  {object}  bid The bid to validate.
   * @return {boolean}     True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    if (!isValidSize(bid.params.size)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('ix bidder params: bid size has invalid format.');
      return false;
    }

    if (!includesSize(bid.sizes, bid.params.size)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('ix bidder params: bid size is not included in ad unit sizes.');
      return false;
    }

    if (bid.hasOwnProperty('mediaType') && !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["contains"](SUPPORTED_AD_TYPES, bid.mediaType)) {
      return false;
    }

    if (bid.hasOwnProperty('mediaTypes') && !(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.banner.sizes') || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.video.playerSize'))) {
      return false;
    }

    if (typeof bid.params.siteId !== 'string' && typeof bid.params.siteId !== 'number') {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('ix bidder params: siteId must be string or number value.');
      return false;
    }

    var hasBidFloor = bid.params.hasOwnProperty('bidFloor');
    var hasBidFloorCur = bid.params.hasOwnProperty('bidFloorCur');

    if (hasBidFloor || hasBidFloorCur) {
      if (!(hasBidFloor && hasBidFloorCur && isValidBidFloorParams(bid.params.bidFloor, bid.params.bidFloorCur))) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('ix bidder params: bidFloor / bidFloorCur parameter has invalid format.');
        return false;
      }
    }

    return true;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param  {array}  validBidRequests A list of valid bid request config objects.
   * @param  {object} bidderRequest    A object contains bids and other info like gdprConsent.
   * @return {object}                  Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var reqs = [];
    var bannerImps = [];
    var videoImps = [];
    var validBidRequest = null; // To capture the missing sizes i.e not configured for ix

    var missingBannerSizes = {};

    for (var i = 0; i < validBidRequests.length; i++) {
      validBidRequest = validBidRequests[i];

      if (validBidRequest.mediaType === __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */] || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](validBidRequest, 'mediaTypes.video')) {
        if (validBidRequest.mediaType === __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */] || includesSize(validBidRequest.mediaTypes.video.playerSize, validBidRequest.params.size)) {
          videoImps.push(bidToVideoImp(validBidRequest));
        } else {
          __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('Bid size is not included in video playerSize');
        }
      }

      if (validBidRequest.mediaType === __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */] || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](validBidRequest, 'mediaTypes.banner') || !validBidRequest.mediaType && !validBidRequest.mediaTypes) {
        var imp = bidToBannerImp(validBidRequest);
        bannerImps.push(imp);
        updateMissingSizes(validBidRequest, missingBannerSizes, imp);
      }
    } // Finding the missing banner sizes ,and making impressions for them


    for (var transactionID in missingBannerSizes) {
      if (missingBannerSizes.hasOwnProperty(transactionID)) {
        var missingSizes = missingBannerSizes[transactionID].missingSizes;

        for (var _i = 0; _i < missingSizes.length; _i++) {
          var origImp = missingBannerSizes[transactionID].impression;
          var newImp = createMissingBannerImp(origImp, missingSizes[_i]);
          bannerImps.push(newImp);
        }
      }
    }

    if (bannerImps.length > 0) {
      reqs.push(buildRequest(validBidRequests, bidderRequest, bannerImps, BANNER_ENDPOINT_VERSION));
    }

    if (videoImps.length > 0) {
      reqs.push(buildRequest(validBidRequests, bidderRequest, videoImps, VIDEO_ENDPOINT_VERSION));
    }

    return reqs;
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param  {object} serverResponse A successful response from the server.
   * @param  {object} bidderRequest  The bid request sent to the server.
   * @return {array}                 An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidderRequest) {
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
      var requestBid = JSON.parse(bidderRequest.data.r);

      for (var j = 0; j < innerBids.length; j++) {
        var bidRequest = getBidRequest(innerBids[j].impid, requestBid.imp);
        bid = parseBid(innerBids[j], responseBody.cur, bidRequest);
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
    return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["convertTypes"]({
      'siteID': 'number'
    }, params);
  },

  /**
   * Determine which user syncs should occur
   * @param {object} syncOptions
   * @param {array} serverResponses
   * @returns {array} User sync pixels
   */
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    return syncOptions.iframeEnabled ? [{
      type: 'iframe',
      url: USER_SYNC_URL
    }] : [];
  }
};
Object(__WEBPACK_IMPORTED_MODULE_5__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[464]);