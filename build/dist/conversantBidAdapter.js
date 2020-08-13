pbjsChunk([244],{

/***/ 351:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(352);


/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storage", function() { return storage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_storageManager_js__ = __webpack_require__(9);




var GVLID = 24;
var storage = Object(__WEBPACK_IMPORTED_MODULE_3__src_storageManager_js__["b" /* getStorageManager */])(GVLID);
var BIDDER_CODE = 'conversant';
var URL = 'https://web.hb.ad.cpe.dotomi.com/cvx/client/hb/ortb/25';
var spec = {
  code: BIDDER_CODE,
  gvlid: GVLID,
  aliases: ['cnvr'],
  // short code
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid - The bid params to validate.
   * @return {boolean} True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    if (!bid || !bid.params) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"](BIDDER_CODE + ': Missing bid parameters');
      return false;
    }

    if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](bid.params.site_id)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"](BIDDER_CODE + ': site_id must be specified as a string');
      return false;
    }

    if (isVideoRequest(bid)) {
      if (!bid.params.mimes) {
        // Give a warning but let it pass
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"](BIDDER_CODE + ': mimes should be specified for videos');
      } else if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](bid.params.mimes) || !bid.params.mimes.every(function (s) {
        return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](s);
      })) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"](BIDDER_CODE + ': mimes must be an array of strings');
        return false;
      }
    }

    return true;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} validBidRequests - an array of bids
   * @param bidderRequest
   * @return {ServerRequest} Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var page = bidderRequest && bidderRequest.refererInfo ? bidderRequest.refererInfo.referer : '';
    var siteId = '';
    var requestId = '';
    var pubcid = null;
    var pubcidName = '_pubcid';
    var bidurl = URL;
    var conversantImps = validBidRequests.map(function (bid) {
      var bidfloor = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('bidfloor', bid.params);
      siteId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('site_id', bid.params) || siteId;
      pubcidName = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('pubcid_name', bid.params) || pubcidName;
      requestId = bid.auctionId;
      var imp = {
        id: bid.bidId,
        secure: 1,
        bidfloor: bidfloor || 0,
        displaymanager: 'Prebid.js',
        displaymanagerver: "4.2.0"
      };
      copyOptProperty(bid.params.tag_id, imp, 'tagid');

      if (isVideoRequest(bid)) {
        var videoData = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.video') || {};
        var format = convertSizes(videoData.playerSize || bid.sizes);
        var video = {};

        if (format && format[0]) {
          copyOptProperty(format[0].w, video, 'w');
          copyOptProperty(format[0].h, video, 'h');
        }

        copyOptProperty(bid.params.position, video, 'pos');
        copyOptProperty(bid.params.mimes || videoData.mimes, video, 'mimes');
        copyOptProperty(bid.params.maxduration, video, 'maxduration');
        copyOptProperty(bid.params.protocols || videoData.protocols, video, 'protocols');
        copyOptProperty(bid.params.api || videoData.api, video, 'api');
        imp.video = video;
      } else {
        var bannerData = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.banner') || {};

        var _format = convertSizes(bannerData.sizes || bid.sizes);

        var banner = {
          format: _format
        };
        copyOptProperty(bid.params.position, banner, 'pos');
        imp.banner = banner;
      }

      if (bid.userId && bid.userId.pubcid) {
        pubcid = bid.userId.pubcid;
      } else if (bid.crumbs && bid.crumbs.pubcid) {
        pubcid = bid.crumbs.pubcid;
      }

      if (bid.params.white_label_url) {
        bidurl = bid.params.white_label_url;
      }

      return imp;
    });
    var payload = {
      id: requestId,
      imp: conversantImps,
      site: {
        id: siteId,
        mobile: document.querySelector('meta[name="viewport"][content*="width=device-width"]') !== null ? 1 : 0,
        page: page
      },
      device: getDevice(),
      at: 1
    };
    var userExt = {};

    if (bidderRequest) {
      // Add GDPR flag and consent string
      if (bidderRequest.gdprConsent) {
        userExt.consent = bidderRequest.gdprConsent.consentString;

        if (typeof bidderRequest.gdprConsent.gdprApplies === 'boolean') {
          __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](payload, 'regs.ext.gdpr', bidderRequest.gdprConsent.gdprApplies ? 1 : 0);
        }
      }

      if (bidderRequest.uspConsent) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](payload, 'regs.ext.us_privacy', bidderRequest.uspConsent);
      }
    }

    if (!pubcid) {
      pubcid = readStoredValue(pubcidName);
    } // Add common id if available


    if (pubcid) {
      userExt.fpc = pubcid;
    } // Add Eids if available


    var eids = collectEids(validBidRequests);

    if (eids.length > 0) {
      userExt.eids = eids;
    } // Only add the user object if it's not empty


    if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](userExt)) {
      payload.user = {
        ext: userExt
      };
    }

    return {
      method: 'POST',
      url: bidurl,
      data: payload
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @param bidRequest
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = [];
    var requestMap = {};
    serverResponse = serverResponse.body;

    if (bidRequest && bidRequest.data && bidRequest.data.imp) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](bidRequest.data.imp, function (imp) {
        return requestMap[imp.id] = imp;
      });
    }

    if (serverResponse && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](serverResponse.seatbid)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](serverResponse.seatbid, function (bidList) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](bidList.bid, function (conversantBid) {
          var responseCPM = parseFloat(conversantBid.price);

          if (responseCPM > 0.0 && conversantBid.impid) {
            var responseAd = conversantBid.adm || '';
            var responseNurl = conversantBid.nurl || '';
            var request = requestMap[conversantBid.impid];
            var bid = {
              requestId: conversantBid.impid,
              currency: serverResponse.cur || 'USD',
              cpm: responseCPM,
              creativeId: conversantBid.crid || '',
              ttl: 300,
              netRevenue: true
            };

            if (request.video) {
              if (responseAd.charAt(0) === '<') {
                bid.vastXml = responseAd;
              } else {
                bid.vastUrl = responseAd;
              }

              bid.mediaType = 'video';
              bid.width = request.video.w;
              bid.height = request.video.h;
            } else {
              bid.ad = responseAd + '<img src="' + responseNurl + '" />';
              bid.width = conversantBid.w;
              bid.height = conversantBid.h;
            }

            bidResponses.push(bid);
          }
        });
      });
    }

    return bidResponses;
  },

  /**
   * Covert bid param types for S2S
   * @param {Object} params bid params
   * @param {Boolean} isOpenRtb boolean to check openrtb2 protocol
   * @return {Object} params bid params
   */
  transformBidParams: function transformBidParams(params, isOpenRtb) {
    return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["convertTypes"]({
      'site_id': 'string',
      'secure': 'number',
      'mobile': 'number'
    }, params);
  }
};
/**
 * Determine do-not-track state
 *
 * @returns {boolean}
 */

function getDNT() {
  return navigator.doNotTrack === '1' || window.doNotTrack === '1' || navigator.msDoNoTrack === '1' || navigator.doNotTrack === 'yes';
}
/**
 * Return openrtb device object that includes ua, width, and height.
 *
 * @returns {Device} Openrtb device object
 */


function getDevice() {
  var language = navigator.language ? 'language' : 'userLanguage';
  return {
    h: screen.height,
    w: screen.width,
    dnt: getDNT() ? 1 : 0,
    language: navigator[language].split('-')[0],
    make: navigator.vendor ? navigator.vendor : '',
    ua: navigator.userAgent
  };
}
/**
 * Convert arrays of widths and heights to an array of objects with w and h properties.
 *
 * [[300, 250], [300, 600]] => [{w: 300, h: 250}, {w: 300, h: 600}]
 *
 * @param {Array.<Array.<number>>} bidSizes - arrays of widths and heights
 * @returns {object[]} Array of objects with w and h
 */


function convertSizes(bidSizes) {
  var format;

  if (Array.isArray(bidSizes)) {
    if (bidSizes.length === 2 && typeof bidSizes[0] === 'number' && typeof bidSizes[1] === 'number') {
      format = [{
        w: bidSizes[0],
        h: bidSizes[1]
      }];
    } else {
      format = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_map"](bidSizes, function (d) {
        return {
          w: d[0],
          h: d[1]
        };
      });
    }
  }

  return format;
}
/**
 * Check if it's a video bid request
 *
 * @param {BidRequest} bid - Bid request generated from ad slots
 * @returns {boolean} True if it's a video bid
 */


function isVideoRequest(bid) {
  return bid.mediaType === 'video' || !!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.video');
}
/**
 * Copy property if exists from src to dst
 *
 * @param {object} src - source object
 * @param {object} dst - destination object
 * @param {string} dstName - destination property name
 */


function copyOptProperty(src, dst, dstName) {
  if (src) {
    dst[dstName] = src;
  }
}
/**
 * Collect IDs from validBidRequests and store them as an extended id array
 * @param bidRequests valid bid requests
 */


function collectEids(bidRequests) {
  var request = bidRequests[0]; // bidRequests have the same userId object

  var eids = [];

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](request.userIdAsEids) && request.userIdAsEids.length > 0) {
    // later following white-list can be converted to block-list if needed
    var requiredSourceValues = {
      'adserver.org': 1,
      'liveramp.com': 1,
      'criteo.com': 1,
      'id5-sync.com': 1,
      'parrable.com': 1,
      'digitru.st': 1,
      'liveintent.com': 1
    };
    request.userIdAsEids.forEach(function (eid) {
      if (requiredSourceValues.hasOwnProperty(eid.source)) {
        eids.push(eid);
      }
    });
  }

  return eids;
}
/**
 * Look for a stored value from both cookie and local storage and return the first value found.
 * @param key Key for the search
 * @return {string} Stored value
 */


function readStoredValue(key) {
  var storedValue;

  try {
    // check cookies first
    storedValue = storage.getCookie(key);

    if (!storedValue) {
      // check expiration time before reading local storage
      var storedValueExp = storage.getDataFromLocalStorage("".concat(key, "_exp"));

      if (storedValueExp === '' || storedValueExp && new Date(storedValueExp).getTime() - Date.now() > 0) {
        storedValue = storage.getDataFromLocalStorage(key);
        storedValue = storedValue ? decodeURIComponent(storedValue) : storedValue;
      }
    } // deserialize JSON if needed


    if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](storedValue) && storedValue.charAt(0) === '{') {
      storedValue = JSON.parse(storedValue);
    }
  } catch (e) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](e);
  }

  return storedValue;
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[351]);