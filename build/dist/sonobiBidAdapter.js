pbjsChunk([83],{

/***/ 578:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(579);


/***/ }),

/***/ 579:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_isInbounds", function() { return _isInbounds; });
/* harmony export (immutable) */ __webpack_exports__["_getPlatform"] = _getPlatform;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_Renderer__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_userSync__ = __webpack_require__(27);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var BIDDER_CODE = 'sonobi';
var STR_ENDPOINT = 'https://apex.go.sonobi.com/trinity.json';
var PAGEVIEW_ID = Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["generateUUID"])();
var SONOBI_DIGITRUST_KEY = 'fhnS5drwmH';
var OUTSTREAM_REDNERER_URL = 'https://mtrx.go.sonobi.com/sbi_outstream_renderer.js';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid - The bid params to validate.
   * @return {boolean} True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    if (!bid.params) {
      return false;
    }

    if (!bid.params.ad_unit && !bid.params.placement_id) {
      return false;
    }

    if (!Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"])(bid, 'mediaTypes.banner') && !Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"])(bid, 'mediaTypes.video')) {
      return false;
    }

    if (Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"])(bid, 'mediaTypes.banner')) {
      // Sonobi does not support multi type bids, favor banner over video
      if (!Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"])(bid, 'mediaTypes.banner.sizes') && !bid.params.sizes) {
        // sizes at the banner or params level is required.
        return false;
      }
    } else if (Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"])(bid, 'mediaTypes.video')) {
      if (Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"])(bid, 'mediaTypes.video.context') === 'outstream' && !bid.params.sizes) {
        // bids.params.sizes is required for outstream video adUnits
        return false;
      }

      if (Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"])(bid, 'mediaTypes.video.context') === 'instream' && !Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"])(bid, 'mediaTypes.video.playerSize')) {
        // playerSize is required for instream adUnits.
        return false;
      }
    }

    return true;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} validBidRequests - an array of bids
   * @return {object} ServerRequest - Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var bids = validBidRequests.map(function (bid) {
      var slotIdentifier = _validateSlot(bid);

      if (/^[\/]?[\d]+[[\/].+[\/]?]?$/.test(slotIdentifier)) {
        slotIdentifier = slotIdentifier.charAt(0) === '/' ? slotIdentifier : '/' + slotIdentifier;
        return _defineProperty({}, "".concat(slotIdentifier, "|").concat(bid.bidId), "".concat(_validateSize(bid)).concat(_validateFloor(bid)));
      } else if (/^[0-9a-fA-F]{20}$/.test(slotIdentifier) && slotIdentifier.length === 20) {
        return _defineProperty({}, bid.bidId, "".concat(slotIdentifier, "|").concat(_validateSize(bid)).concat(_validateFloor(bid)));
      } else {
        Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["logError"])("The ad unit code or Sonobi Placement id for slot ".concat(bid.bidId, " is invalid"));
      }
    });
    var data = {};
    bids.forEach(function (bid) {
      _extends(data, bid);
    });
    var payload = {
      'key_maker': JSON.stringify(data),
      'ref': bidderRequest.refererInfo.referer,
      's': Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["generateUUID"])(),
      'pv': PAGEVIEW_ID,
      'vp': _getPlatform(),
      'lib_name': 'prebid',
      'lib_v': "2.37.0",
      'us': 0
    };

    if (__WEBPACK_IMPORTED_MODULE_3__src_config__["b" /* config */].getConfig('userSync') && __WEBPACK_IMPORTED_MODULE_3__src_config__["b" /* config */].getConfig('userSync').syncsPerBidder) {
      payload.us = __WEBPACK_IMPORTED_MODULE_3__src_config__["b" /* config */].getConfig('userSync').syncsPerBidder;
    } // use userSync's internal function to determine if we can drop an iframe sync pixel


    if (_iframeAllowed()) {
      payload.ius = 1;
    } else {
      payload.ius = 0;
    }

    if (Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"])(validBidRequests[0], 'params.hfa')) {
      payload.hfa = Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"])(validBidRequests[0], 'params.hfa');
    } else if (Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"])(validBidRequests[0], 'userId.pubcid')) {
      payload.hfa = "PRE-".concat(validBidRequests[0].userId.pubcid);
    } else if (Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"])(validBidRequests[0], 'crumbs.pubcid')) {
      payload.hfa = "PRE-".concat(validBidRequests[0].crumbs.pubcid);
    }

    if (Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"])(validBidRequests[0], 'userId.tdid')) {
      payload.tdid = validBidRequests[0].userId.tdid;
    }

    if (validBidRequests[0].params.referrer) {
      payload.ref = validBidRequests[0].params.referrer;
    } // Apply GDPR parameters to request.


    if (bidderRequest && bidderRequest.gdprConsent) {
      payload.gdpr = bidderRequest.gdprConsent.gdprApplies ? 'true' : 'false';

      if (bidderRequest.gdprConsent.consentString) {
        payload.consent_string = bidderRequest.gdprConsent.consentString;
      }
    }

    var digitrust = _getDigiTrustObject(SONOBI_DIGITRUST_KEY);

    if (digitrust) {
      payload.digid = digitrust.id;
      payload.digkeyv = digitrust.keyv;
    }

    if (validBidRequests[0].schain) {
      payload.schain = JSON.stringify(validBidRequests[0].schain);
    }

    if (Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"])(validBidRequests[0], 'userId') && Object.keys(validBidRequests[0].userId).length > 0) {
      payload.userid = JSON.stringify(validBidRequests[0].userId);
    } // If there is no key_maker data, then don't make the request.


    if (Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["isEmpty"])(data)) {
      return null;
    }

    return {
      method: 'GET',
      url: STR_ENDPOINT,
      withCredentials: true,
      data: payload,
      bidderRequests: validBidRequests
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @param {*} bidderRequest - Info describing the request to the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidderRequest) {
    var bidResponse = serverResponse.body;
    var bidsReturned = [];
    var referrer = bidderRequest.data.ref;

    if (Object.keys(bidResponse.slots).length === 0) {
      return bidsReturned;
    }

    Object.keys(bidResponse.slots).forEach(function (slot) {
      var bid = bidResponse.slots[slot];

      var bidId = _getBidIdFromTrinityKey(slot);

      var bidRequest = _findBidderRequest(bidderRequest.bidderRequests, bidId);

      var mediaType = null;

      if (bid.sbi_ct === 'video') {
        mediaType = 'video';
        var context = Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"])(bidRequest, 'mediaTypes.video.context');

        if (context === 'outstream') {
          mediaType = 'outstream';
        }
      }

      var createCreative = _creative(mediaType, referrer);

      if (bid.sbi_aid && bid.sbi_mouse && bid.sbi_size) {
        var _bid$sbi_size$split = bid.sbi_size.split('x'),
            _bid$sbi_size$split2 = _slicedToArray(_bid$sbi_size$split, 2),
            _bid$sbi_size$split2$ = _bid$sbi_size$split2[0],
            width = _bid$sbi_size$split2$ === void 0 ? 1 : _bid$sbi_size$split2$,
            _bid$sbi_size$split2$2 = _bid$sbi_size$split2[1],
            height = _bid$sbi_size$split2$2 === void 0 ? 1 : _bid$sbi_size$split2$2;

        var bids = {
          requestId: bidId,
          cpm: Number(bid.sbi_mouse),
          width: Number(width),
          height: Number(height),
          ad: createCreative(bidResponse.sbi_dc, bid.sbi_aid),
          ttl: 500,
          creativeId: bid.sbi_crid || bid.sbi_aid,
          aid: bid.sbi_aid,
          netRevenue: true,
          currency: 'USD'
        };

        if (bid.sbi_dozer) {
          bids.dealId = bid.sbi_dozer;
        }

        if (mediaType === 'video') {
          bids.mediaType = 'video';
          bids.vastUrl = createCreative(bidResponse.sbi_dc, bid.sbi_aid);
          delete bids.ad;
          delete bids.width;
          delete bids.height;
        } else if (mediaType === 'outstream' && bidRequest) {
          bids.mediaType = 'video';
          bids.vastUrl = createCreative(bidResponse.sbi_dc, bid.sbi_aid);
          bids.renderer = newRenderer(bidRequest.adUnitCode, bids, Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"])(bidRequest, 'renderer.options'));
          var videoSize = Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"])(bidRequest, 'params.sizes');

          if (Array.isArray(videoSize) && Array.isArray(videoSize[0])) {
            // handle case of multiple sizes
            videoSize = videoSize[0]; // Only take the first size for outstream
          }

          if (videoSize) {
            bids.width = videoSize[0];
            bids.height = videoSize[1];
          }
        }

        bidsReturned.push(bids);
      }
    });
    return bidsReturned;
  },

  /**
   * Register User Sync.
   */
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    var syncs = [];

    try {
      if (syncOptions.pixelEnabled) {
        serverResponses[0].body.sbi_px.forEach(function (pixel) {
          syncs.push({
            type: pixel.type,
            url: pixel.url
          });
        });
      }
    } catch (e) {}

    return syncs;
  }
};

function _findBidderRequest(bidderRequests, bidId) {
  for (var i = 0; i < bidderRequests.length; i++) {
    if (bidderRequests[i].bidId === bidId) {
      return bidderRequests[i];
    }
  }
}

function _validateSize(bid) {
  if (Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"])(bid, 'mediaTypes.video')) {
    return ''; // Video bids arent allowed to override sizes via the trinity request
  }

  if (bid.params.sizes) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["parseSizesInput"])(bid.params.sizes).join(',');
  }

  if (Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"])(bid, 'mediaTypes.banner.sizes')) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["parseSizesInput"])(Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"])(bid, 'mediaTypes.banner.sizes')).join(',');
  } // Handle deprecated sizes definition


  if (bid.sizes) {
    return Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["parseSizesInput"])(bid.sizes).join(',');
  }
}

function _validateSlot(bid) {
  if (bid.params.ad_unit) {
    return bid.params.ad_unit;
  }

  return bid.params.placement_id;
}

function _validateFloor(bid) {
  if (bid.params.floor) {
    return "|f=".concat(bid.params.floor);
  }

  return '';
}

var _creative = function _creative(mediaType, referer) {
  return function (sbiDc, sbiAid) {
    if (mediaType === 'video' || mediaType === 'outstream') {
      return _videoCreative(sbiDc, sbiAid, referer);
    }

    var src = "https://".concat(sbiDc, "apex.go.sonobi.com/sbi.js?aid=").concat(sbiAid, "&as=null&ref=").concat(encodeURIComponent(referer));
    return '<script type="text/javascript" src="' + src + '"></script>';
  };
};

function _videoCreative(sbiDc, sbiAid, referer) {
  return "https://".concat(sbiDc, "apex.go.sonobi.com/vast.xml?vid=").concat(sbiAid, "&ref=").concat(encodeURIComponent(referer));
}

function _getBidIdFromTrinityKey(key) {
  return key.split('|').slice(-1)[0];
}
/**
 * @param context - the window to determine the innerWidth from. This is purely for test purposes as it should always be the current window
 */


var _isInbounds = function _isInbounds() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  return function () {
    var lowerBound = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var upperBound = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.MAX_SAFE_INTEGER;
    return context.innerWidth >= lowerBound && context.innerWidth < upperBound;
  };
};
/**
 * @param context - the window to determine the innerWidth from. This is purely for test purposes as it should always be the current window
 */

function _getPlatform() {
  var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;

  var isInBounds = _isInbounds(context);

  var MOBILE_VIEWPORT = {
    lt: 768
  };
  var TABLET_VIEWPORT = {
    lt: 992,
    ge: 768
  };

  if (isInBounds(0, MOBILE_VIEWPORT.lt)) {
    return 'mobile';
  }

  if (isInBounds(TABLET_VIEWPORT.ge, TABLET_VIEWPORT.lt)) {
    return 'tablet';
  }

  return 'desktop';
} // https://github.com/digi-trust/dt-cdn/wiki/Integration-Guide

function _getDigiTrustObject(key) {
  function getDigiTrustId() {
    var digiTrustUser = window.DigiTrust && (__WEBPACK_IMPORTED_MODULE_3__src_config__["b" /* config */].getConfig('digiTrustId') || window.DigiTrust.getUser({
      member: key
    }));
    return digiTrustUser && digiTrustUser.success && digiTrustUser.identity || null;
  }

  var digiTrustId = getDigiTrustId(); // Verify there is an ID and this user has not opted out

  if (!digiTrustId || digiTrustId.privacy && digiTrustId.privacy.optout) {
    return null;
  }

  return digiTrustId;
}

function newRenderer(adUnitCode, bid) {
  var rendererOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var renderer = __WEBPACK_IMPORTED_MODULE_4__src_Renderer__["a" /* Renderer */].install({
    id: bid.aid,
    url: OUTSTREAM_REDNERER_URL,
    config: rendererOptions,
    loaded: false,
    adUnitCode: adUnitCode
  });

  try {
    renderer.setRender(outstreamRender);
  } catch (err) {
    Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["logWarn"])('Prebid Error calling setRender on renderer', err);
  }

  renderer.setEventHandlers({
    impression: function impression() {
      return Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["logMessage"])('Sonobi outstream video impression event');
    },
    loaded: function loaded() {
      return Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["logMessage"])('Sonobi outstream video loaded event');
    },
    ended: function ended() {
      Object(__WEBPACK_IMPORTED_MODULE_1__src_utils__["logMessage"])('Sonobi outstream renderer video event'); // document.querySelector(`#${adUnitCode}`).style.display = 'none';
    }
  });
  return renderer;
}

function outstreamRender(bid) {
  // push to render queue because SbiOutstreamRenderer may not be loaded yet
  bid.renderer.push(function () {
    var _bid$getSize$split = bid.getSize().split('x'),
        _bid$getSize$split2 = _slicedToArray(_bid$getSize$split, 2),
        width = _bid$getSize$split2[0],
        height = _bid$getSize$split2[1];

    var renderer = new window.SbiOutstreamRenderer();
    renderer.init({
      vastUrl: bid.vastUrl,
      height: height,
      width: width
    });
    renderer.setRootElement(bid.adUnitCode);
  });
}

function _iframeAllowed() {
  return __WEBPACK_IMPORTED_MODULE_5__src_userSync__["a" /* userSync */].canBidderRegisterSync('iframe', BIDDER_CODE);
}

Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[578]);