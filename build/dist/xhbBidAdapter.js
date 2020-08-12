pbjsChunk([35],{

/***/ 540:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(541);


/***/ }),

/***/ 541:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Renderer__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_library_fn_array_find__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_library_fn_array_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_library_fn_array_find__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_library_fn_array_includes__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_library_fn_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_library_fn_array_includes__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }







var BIDDER_CODE = 'xhb';
var URL = 'https://ib.adnxs.com/ut/v3/prebid';
var VIDEO_TARGETING = ['id', 'mimes', 'minduration', 'maxduration', 'startdelay', 'skippable', 'playback_method', 'frameworks'];
var USER_PARAMS = ['age', 'external_uid', 'segments', 'gender', 'dnt', 'language'];
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
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["c" /* NATIVE */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {object} bid The bid to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params.placementId || bid.params.member && bid.params.invCode);
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} bidRequests A non-empty list of bid requests which should be sent to the Server.
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var tags = bidRequests.map(bidToTag);
    var userObjBid = __WEBPACK_IMPORTED_MODULE_4_core_js_library_fn_array_find___default()(bidRequests, hasUserInfo);
    var userObj;

    if (userObjBid) {
      userObj = {};
      Object.keys(userObjBid.params.user).filter(function (param) {
        return __WEBPACK_IMPORTED_MODULE_5_core_js_library_fn_array_includes___default()(USER_PARAMS, param);
      }).forEach(function (param) {
        return userObj[param] = userObjBid.params.user[param];
      });
    }

    var memberIdBid = __WEBPACK_IMPORTED_MODULE_4_core_js_library_fn_array_find___default()(bidRequests, hasMemberId);
    var member = memberIdBid ? parseInt(memberIdBid.params.member, 10) : 0;
    var payload = {
      tags: _toConsumableArray(tags),
      user: userObj,
      sdk: {
        source: SOURCE,
        version: "3.0.0"
      }
    };

    if (member > 0) {
      payload.member_id = member;
    }

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
      url: URL,
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
    var _this = this;

    var bidderRequest = _ref.bidderRequest;
    serverResponse = serverResponse.body;
    var bids = [];

    if (!serverResponse || serverResponse.error) {
      var errorMessage = "in response for ".concat(bidderRequest.bidderCode, " adapter");

      if (serverResponse && serverResponse.error) {
        errorMessage += ": ".concat(serverResponse.error);
      }

      __WEBPACK_IMPORTED_MODULE_1__src_utils__["logError"](errorMessage);
      return bids;
    }

    if (serverResponse.tags) {
      serverResponse.tags.forEach(function (serverBid) {
        var rtbBid = getRtbBid(serverBid);

        if (rtbBid) {
          if (rtbBid.cpm !== 0 && __WEBPACK_IMPORTED_MODULE_5_core_js_library_fn_array_includes___default()(_this.supportedMediaTypes, rtbBid.ad_type)) {
            var bid = newBid(serverBid, rtbBid, bidderRequest);
            bid.mediaType = parseMediaType(rtbBid);
            bids.push(bid);
          }
        }
      });
    }

    return bids;
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    if (syncOptions.iframeEnabled) {
      return [{
        type: 'iframe',
        url: 'https://acdn.adnxs.com/ib/static/usersync/v3/async_usersync.html'
      }];
    }
  }
};

function newRenderer(adUnitCode, rtbBid) {
  var rendererOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var renderer = __WEBPACK_IMPORTED_MODULE_0__src_Renderer__["a" /* Renderer */].install({
    id: rtbBid.renderer_id,
    url: rtbBid.renderer_url,
    config: rendererOptions,
    loaded: false
  });

  try {
    renderer.setRender(outstreamRender);
  } catch (err) {
    __WEBPACK_IMPORTED_MODULE_1__src_utils__["logWarn"]('Prebid Error calling setRender on renderer', err);
  }

  renderer.setEventHandlers({
    impression: function impression() {
      return __WEBPACK_IMPORTED_MODULE_1__src_utils__["logMessage"]('xhb outstream video impression event');
    },
    loaded: function loaded() {
      return __WEBPACK_IMPORTED_MODULE_1__src_utils__["logMessage"]('xhb outstream video loaded event');
    },
    ended: function ended() {
      __WEBPACK_IMPORTED_MODULE_1__src_utils__["logMessage"]('xhb outstream renderer video event');
      document.querySelector("#".concat(adUnitCode)).style.display = 'none';
    }
  });
  return renderer;
}
/* Turn keywords parameter into ut-compatible format */


function getKeywords(keywords) {
  var arrs = [];

  __WEBPACK_IMPORTED_MODULE_1__src_utils__["_each"](keywords, function (v, k) {
    if (__WEBPACK_IMPORTED_MODULE_1__src_utils__["isArray"](v)) {
      var values = [];

      __WEBPACK_IMPORTED_MODULE_1__src_utils__["_each"](v, function (val) {
        val = __WEBPACK_IMPORTED_MODULE_1__src_utils__["getValueString"]('keywords.' + k, val);

        if (val) {
          values.push(val);
        }
      });

      v = values;
    } else {
      v = __WEBPACK_IMPORTED_MODULE_1__src_utils__["getValueString"]('keywords.' + k, v);

      if (__WEBPACK_IMPORTED_MODULE_1__src_utils__["isStr"](v)) {
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


function newBid(serverBid, rtbBid, bidderRequest) {
  var bid = {
    requestId: serverBid.uuid,
    cpm: 0.00,
    creativeId: rtbBid.creative_id,
    dealId: 99999999,
    currency: 'USD',
    netRevenue: true,
    ttl: 300,
    appnexus: {
      buyerMemberId: rtbBid.buyer_member_id
    }
  };

  if (rtbBid.rtb.video) {
    _extends(bid, {
      width: rtbBid.rtb.video.player_width,
      height: rtbBid.rtb.video.player_height,
      vastUrl: rtbBid.rtb.video.asset_url,
      vastImpUrl: rtbBid.notify_url,
      ttl: 3600
    }); // This supports Outstream Video


    if (rtbBid.renderer_url) {
      var rendererOptions = __WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](bidderRequest.bids[0], 'renderer.options');

      _extends(bid, {
        adResponse: serverBid,
        renderer: newRenderer(bid.adUnitCode, rtbBid, rendererOptions)
      });

      bid.adResponse.ad = bid.adResponse.ads[0];
      bid.adResponse.ad.video = bid.adResponse.ad.rtb.video;
    }
  } else if (rtbBid.rtb[__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["c" /* NATIVE */]]) {
    var nativeAd = rtbBid.rtb[__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["c" /* NATIVE */]];
    bid[__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["c" /* NATIVE */]] = {
      title: nativeAd.title,
      body: nativeAd.desc,
      cta: nativeAd.ctatext,
      sponsoredBy: nativeAd.sponsored,
      clickUrl: nativeAd.link.url,
      clickTrackers: nativeAd.link.click_trackers,
      impressionTrackers: nativeAd.impression_trackers,
      javascriptTrackers: nativeAd.javascript_trackers
    };

    if (nativeAd.main_img) {
      bid['native'].image = {
        url: nativeAd.main_img.url,
        height: nativeAd.main_img.height,
        width: nativeAd.main_img.width
      };
    }

    if (nativeAd.icon) {
      bid['native'].icon = {
        url: nativeAd.icon.url,
        height: nativeAd.icon.height,
        width: nativeAd.icon.width
      };
    }
  } else {
    _extends(bid, {
      width: rtbBid.rtb.banner.width,
      height: rtbBid.rtb.banner.height,
      ad: rtbBid.rtb.banner.content
    });

    try {
      var url = rtbBid.rtb.trackers[0].impression_urls[0];
      var tracker = __WEBPACK_IMPORTED_MODULE_1__src_utils__["createTrackPixelHtml"](url);
      bid.ad += tracker;
    } catch (error) {
      __WEBPACK_IMPORTED_MODULE_1__src_utils__["logError"]('Error appending tracking pixel', error);
    }
  }

  return bid;
}

function bidToTag(bid) {
  var tag = {};
  tag.sizes = transformSizes(bid.sizes);
  tag.primary_size = tag.sizes[0];
  tag.ad_types = [];
  tag.uuid = bid.bidId;

  if (bid.params.placementId) {
    tag.id = parseInt(bid.params.placementId, 10);
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

  if (!__WEBPACK_IMPORTED_MODULE_1__src_utils__["isEmpty"](bid.params.keywords)) {
    tag.keywords = getKeywords(bid.params.keywords);
  }

  if (bid.mediaType === __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["c" /* NATIVE */] || __WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](bid, "mediaTypes.".concat(__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["c" /* NATIVE */]))) {
    tag.ad_types.push(__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["c" /* NATIVE */]);

    if (bid.nativeParams) {
      var nativeRequest = buildNativeRequest(bid.nativeParams);
      tag[__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["c" /* NATIVE */]] = {
        layouts: [nativeRequest]
      };
    }
  }

  var videoMediaType = __WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](bid, "mediaTypes.".concat(__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["d" /* VIDEO */]));
  var context = __WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](bid, 'mediaTypes.video.context');

  if (bid.mediaType === __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["d" /* VIDEO */] || videoMediaType) {
    tag.ad_types.push(__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["d" /* VIDEO */]);
  } // instream gets vastUrl, outstream gets vastXml


  if (bid.mediaType === __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["d" /* VIDEO */] || videoMediaType && context !== 'outstream') {
    tag.require_asset_url = true;
  }

  if (bid.params.video) {
    tag.video = {}; // place any valid video params on the tag

    Object.keys(bid.params.video).filter(function (param) {
      return __WEBPACK_IMPORTED_MODULE_5_core_js_library_fn_array_includes___default()(VIDEO_TARGETING, param);
    }).forEach(function (param) {
      return tag.video[param] = bid.params.video[param];
    });
  }

  if (__WEBPACK_IMPORTED_MODULE_1__src_utils__["isEmpty"](bid.mediaType) && __WEBPACK_IMPORTED_MODULE_1__src_utils__["isEmpty"](bid.mediaTypes) || bid.mediaType === __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["b" /* BANNER */] || bid.mediaTypes && bid.mediaTypes[__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["b" /* BANNER */]]) {
    tag.ad_types.push(__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["b" /* BANNER */]);
  }

  return tag;
}
/* Turn bid request sizes into ut-compatible format */


function transformSizes(requestSizes) {
  var sizes = [];
  var sizeObj = {};

  if (__WEBPACK_IMPORTED_MODULE_1__src_utils__["isArray"](requestSizes) && requestSizes.length === 2 && !__WEBPACK_IMPORTED_MODULE_1__src_utils__["isArray"](requestSizes[0])) {
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

function hasUserInfo(bid) {
  return !!bid.params.user;
}

function hasMemberId(bid) {
  return !!parseInt(bid.params.member, 10);
}

function getRtbBid(tag) {
  return tag && tag.ads && tag.ads.length && __WEBPACK_IMPORTED_MODULE_4_core_js_library_fn_array_find___default()(tag.ads, function (ad) {
    return ad.rtb;
  });
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
        return !__WEBPACK_IMPORTED_MODULE_5_core_js_library_fn_array_includes___default()(requiredKeys, key);
      }); // if none are left over, the minimum params needs to be sent

      if (remaining.length === 0) {
        request[requestKey] = _extends({}, request[requestKey], minimumParams);
      }
    }
  });
  return request;
}

function outstreamRender(bid) {
  // push to render queue because ANOutstreamVideo may not be loaded yet
  bid.renderer.push(function () {
    window.ANOutstreamVideo.renderAd({
      tagId: bid.adResponse.tag_id,
      sizes: [bid.getSize().split('x')],
      targetId: bid.adUnitCode,
      // target div id to render video
      uuid: bid.adResponse.uuid,
      adResponse: bid.adResponse,
      rendererOptions: bid.renderer.getConfig()
    }, handleOutstreamRendererEvents.bind(null, bid));
  });
}

function handleOutstreamRendererEvents(bid, id, eventName) {
  bid.renderer.handleVideoEvent({
    id: id,
    eventName: eventName
  });
}

function parseMediaType(rtbBid) {
  var adType = rtbBid.ad_type;

  if (adType === __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["d" /* VIDEO */]) {
    return __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["d" /* VIDEO */];
  } else if (adType === __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["c" /* NATIVE */]) {
    return __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["c" /* NATIVE */];
  } else {
    return __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["b" /* BANNER */];
  }
}

Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[540]);