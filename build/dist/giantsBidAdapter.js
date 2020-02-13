pbjsChunk([184],{

/***/ 330:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(331);


/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_includes__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_includes__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }





var BIDDER_CODE = 'giants';
var URL = '//d.admp.io/hb';
var VIDEO_TARGETING = ['id', 'mimes', 'minduration', 'maxduration', 'startdelay', 'skippable', 'playback_method', 'frameworks'];
var NATIVE_MAPPING = {
  body: 'description',
  cta: 'ctatext',
  image: {
    serverName: 'main_image',
    requiredParams: {
      required: true
    },
    minimumParams: {
      sizes: [{}]
    }
  },
  icon: {
    serverName: 'icon',
    requiredParams: {
      required: true
    },
    minimumParams: {
      sizes: [{}]
    }
  },
  sponsoredBy: 'sponsored_by'
};
var SOURCE = 'pbjs';
var spec = {
  code: BIDDER_CODE,
  aliases: [],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["c" /* NATIVE */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {object} bid The bid to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.zoneId;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} bidRequests A non-empty list of bid requests which should be sent to the Server.
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var tags = bidRequests.map(bidToTag); // const zoneIds = bidRequests.map(bidToZoneId);
    // var firstBid = bidRequests[0];

    var ref = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"]();
    var url = URL + '/multi?url=' + ref; // + '&callback=window.$$PREBID_GLOBAL$$.giantsResponse&callback_uid=' + bid.bidId;

    var payload = {
      tags: _toConsumableArray(tags),
      // user: userObj,
      sdk: {
        source: SOURCE,
        version: "2.37.0"
      }
    }; // if (member > 0) {
    //   payload.member_id = member;
    // }

    if (bidderRequest && bidderRequest.gdprConsent) {
      // note - objects for impbus use underscore instead of camelCase
      payload.gdpr_consent = {
        consent_string: bidderRequest.gdprConsent.consentString,
        consent_required: bidderRequest.gdprConsent.gdprApplies
      };
    }

    var payloadString = JSON.stringify(payload);
    return {
      method: 'POST',
      // url: URL,
      url: url,
      data: payloadString,
      bidderRequest: bidderRequest
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, _ref) {
    var bidderRequest = _ref.bidderRequest;
    serverResponse = serverResponse.body;
    var bids = [];

    if (!serverResponse || serverResponse.error) {
      var errorMessage = "in response for ".concat(bidderRequest.bidderCode, " adapter");

      if (serverResponse && serverResponse.error) {
        errorMessage += ": ".concat(serverResponse.error);
      }

      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](errorMessage);
      return bids;
    }

    if (serverResponse.tags) {
      serverResponse.tags.forEach(function (serverBid) {
        if (serverBid.cpm && serverBid.cpm !== 0) {
          var bid = newBid(serverBid, bidderRequest);
          bid.mediaType = __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */];
          bids.push(bid);
        }
      });
    }

    return bids;
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    if (syncOptions.iframeEnabled) {
      return [{
        type: 'iframe',
        url: '//d.admp.io/ping'
      }];
    }
  }
};
/* Turn keywords parameter into ut-compatible format */

function getKeywords(keywords) {
  var arrs = [];

  __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](keywords, function (v, k) {
    if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](v)) {
      var values = [];

      __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](v, function (val) {
        val = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getValueString"]('keywords.' + k, val);

        if (val) {
          values.push(val);
        }
      });

      v = values;
    } else {
      v = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getValueString"]('keywords.' + k, v);

      if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["isStr"](v)) {
        v = [v];
      } else {
        return;
      } // unsuported types - don't send a key

    }

    arrs.push({
      key: k,
      value: v
    });
  });

  return arrs;
}
/**
 * Unpack the Server's Bid into a Prebid-compatible one.
 * @param serverBid
 * @param rtbBid
 * @param bidderRequest
 * @return Bid
 */


function newBid(serverBid, bidderRequest) {
  var bid = {
    requestId: serverBid.uuid,
    cpm: serverBid.cpm,
    creativeId: serverBid.creative_id,
    // dealId: rtbBid.deal_id,
    currency: 'USD',
    netRevenue: true,
    ttl: 300
  };

  _extends(bid, {
    width: serverBid.width,
    height: serverBid.height,
    // ad: serverBid.ad
    ad: _renderCreative(serverBid.adUrl, serverBid.width, serverBid.height)
  }); // try {
  //   const url = rtbBid.rtb.trackers[0].impression_urls[0];
  //   const tracker = utils.createTrackPixelHtml(url);
  //   bid.ad += tracker;
  // } catch (error) {
  //   utils.logError('Error appending tracking pixel', error);
  // }


  return bid;
}

function bidToTag(bid) {
  var tag = {};
  tag.sizes = transformSizes(bid.sizes);
  tag.primary_size = tag.sizes[0];
  tag.ad_types = [];
  tag.uuid = bid.bidId;

  if (bid.params.zoneId) {
    tag.id = bid.params.zoneId;
  } else {
    tag.code = bid.params.invCode;
  }

  tag.allow_smaller_sizes = bid.params.allowSmallerSizes || false;
  tag.use_pmt_rule = bid.params.usePaymentRule || false;
  tag.prebid = true;
  tag.disable_psa = true;

  if (bid.params.reserve) {
    tag.reserve = bid.params.reserve;
  }

  if (bid.params.position) {
    tag.position = {
      'above': 1,
      'below': 2
    }[bid.params.position] || 0;
  }

  if (bid.params.trafficSourceCode) {
    tag.traffic_source_code = bid.params.trafficSourceCode;
  }

  if (bid.params.privateSizes) {
    tag.private_sizes = transformSizes(bid.params.privateSizes);
  }

  if (bid.params.supplyType) {
    tag.supply_type = bid.params.supplyType;
  }

  if (bid.params.pubClick) {
    tag.pubclick = bid.params.pubClick;
  }

  if (bid.params.extInvCode) {
    tag.ext_inv_code = bid.params.extInvCode;
  }

  if (bid.params.externalImpId) {
    tag.external_imp_id = bid.params.externalImpId;
  }

  if (!__WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](bid.params.keywords)) {
    tag.keywords = getKeywords(bid.params.keywords);
  }

  if (bid.mediaType === __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["c" /* NATIVE */] || __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, "mediaTypes.".concat(__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["c" /* NATIVE */]))) {
    tag.ad_types.push(__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["c" /* NATIVE */]);

    if (bid.nativeParams) {
      var nativeRequest = buildNativeRequest(bid.nativeParams);
      tag[__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["c" /* NATIVE */]] = {
        layouts: [nativeRequest]
      };
    }
  }

  var videoMediaType = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, "mediaTypes.".concat(__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */]));
  var context = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.video.context');

  if (bid.mediaType === __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */] || videoMediaType) {
    tag.ad_types.push(__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */]);
  } // instream gets vastUrl, outstream gets vastXml


  if (bid.mediaType === __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */] || videoMediaType && context !== 'outstream') {
    tag.require_asset_url = true;
  }

  if (bid.params.video) {
    tag.video = {}; // place any valid video params on the tag

    Object.keys(bid.params.video).filter(function (param) {
      return __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_includes___default()(VIDEO_TARGETING, param);
    }).forEach(function (param) {
      return tag.video[param] = bid.params.video[param];
    });
  }

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](bid.mediaType) && __WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](bid.mediaTypes) || bid.mediaType === __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */] || bid.mediaTypes && bid.mediaTypes[__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */]]) {
    tag.ad_types.push(__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */]);
  }

  return tag;
} // function bidToZoneId(bid) {
//   return bid.params.zoneId;
// }

/* Turn bid request sizes into ut-compatible format */


function transformSizes(requestSizes) {
  var sizes = [];
  var sizeObj = {};

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](requestSizes) && requestSizes.length === 2 && !__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](requestSizes[0])) {
    sizeObj.width = parseInt(requestSizes[0], 10);
    sizeObj.height = parseInt(requestSizes[1], 10);
    sizes.push(sizeObj);
  } else if (_typeof(requestSizes) === 'object') {
    for (var i = 0; i < requestSizes.length; i++) {
      var size = requestSizes[i];
      sizeObj = {};
      sizeObj.width = parseInt(size[0], 10);
      sizeObj.height = parseInt(size[1], 10);
      sizes.push(sizeObj);
    }
  }

  return sizes;
}

function buildNativeRequest(params) {
  var request = {}; // map standard prebid native asset identifier to /ut parameters
  // e.g., tag specifies `body` but /ut only knows `description`.
  // mapping may be in form {tag: '<server name>'} or
  // {tag: {serverName: '<server name>', requiredParams: {...}}}

  Object.keys(params).forEach(function (key) {
    // check if one of the <server name> forms is used, otherwise
    // a mapping wasn't specified so pass the key straight through
    var requestKey = NATIVE_MAPPING[key] && NATIVE_MAPPING[key].serverName || NATIVE_MAPPING[key] || key; // required params are always passed on request

    var requiredParams = NATIVE_MAPPING[key] && NATIVE_MAPPING[key].requiredParams;
    request[requestKey] = _extends({}, requiredParams, params[key]); // minimum params are passed if no non-required params given on adunit

    var minimumParams = NATIVE_MAPPING[key] && NATIVE_MAPPING[key].minimumParams;

    if (requiredParams && minimumParams) {
      // subtract required keys from adunit keys
      var adunitKeys = Object.keys(params[key]);
      var requiredKeys = Object.keys(requiredParams);
      var remaining = adunitKeys.filter(function (key) {
        return !__WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_includes___default()(requiredKeys, key);
      }); // if none are left over, the minimum params needs to be sent

      if (remaining.length === 0) {
        request[requestKey] = _extends({}, request[requestKey], minimumParams);
      }
    }
  });
  return request;
}

function _renderCreative(adUrl, width, height) {
  return "<html>\n    <head><script type='text/javascript'>inDapIF=true;</script></head>\n    <body style='margin : 0; padding: 0;'>\n    <!-- GIANTS BANNER -->\n    <iframe src='".concat(adUrl, "' style=\"border: 0px; width: ").concat(width, "px; height: ").concat(height, "px\">\n    </div>\n    </body>\n    </html>");
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[330]);