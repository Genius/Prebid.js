pbjsChunk([282],{

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(266);


/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_Renderer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_auctionManager_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__src_video_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_storageManager_js__ = __webpack_require__(9);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }











var BIDDER_CODE = 'appnexus';
var URL = 'https://ib.adnxs.com/ut/v3/prebid';
var VIDEO_TARGETING = ['id', 'minduration', 'maxduration', 'skippable', 'playback_method', 'frameworks', 'context', 'skipoffset'];
var USER_PARAMS = ['age', 'externalUid', 'segments', 'gender', 'dnt', 'language'];
var APP_DEVICE_PARAMS = ['geo', 'device_id']; // appid is collected separately

var DEBUG_PARAMS = ['enabled', 'dongle', 'member_id', 'debug_timeout'];
var VIDEO_MAPPING = {
  playback_method: {
    'unknown': 0,
    'auto_play_sound_on': 1,
    'auto_play_sound_off': 2,
    'click_to_play': 3,
    'mouse_over': 4,
    'auto_play_sound_unknown': 5
  },
  context: {
    'unknown': 0,
    'pre_roll': 1,
    'mid_roll': 2,
    'post_roll': 3,
    'outstream': 4,
    'in-banner': 5
  }
};
var NATIVE_MAPPING = {
  body: 'description',
  body2: 'desc2',
  cta: 'ctatext',
  image: {
    serverName: 'main_image',
    requiredParams: {
      required: true
    }
  },
  icon: {
    serverName: 'icon',
    requiredParams: {
      required: true
    }
  },
  sponsoredBy: 'sponsored_by',
  privacyLink: 'privacy_link',
  salePrice: 'saleprice',
  displayUrl: 'displayurl'
};
var SOURCE = 'pbjs';
var MAX_IMPS_PER_REQUEST = 15;
var mappingFileUrl = 'https://acdn.adnxs.com/prebid/appnexus-mapping/mappings.json';
var SCRIPT_TAG_START = '<script';
var VIEWABILITY_URL_START = /\/\/cdn\.adnxs\.com\/v/;
var VIEWABILITY_FILE_NAME = 'trk.js';
var GVLID = 32;
var storage = Object(__WEBPACK_IMPORTED_MODULE_9__src_storageManager_js__["b" /* getStorageManager */])(GVLID, BIDDER_CODE);
var spec = {
  code: BIDDER_CODE,
  gvlid: GVLID,
  aliases: [{
    code: 'appnexusAst',
    gvlid: 32
  }, {
    code: 'brealtime'
  }, {
    code: 'emxdigital',
    gvlid: 183
  }, {
    code: 'pagescience'
  }, {
    code: 'defymedia'
  }, {
    code: 'gourmetads'
  }, {
    code: 'matomy'
  }, {
    code: 'featureforward'
  }, {
    code: 'oftmedia'
  }, {
    code: 'districtm',
    gvlid: 144
  }, {
    code: 'adasta'
  }, {
    code: 'beintoo',
    gvlid: 618
  }],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["c" /* NATIVE */]],

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
    var userObjBid = __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js___default()(bidRequests, hasUserInfo);
    var userObj = {};

    if (__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('coppa') === true) {
      userObj = {
        'coppa': true
      };
    }

    if (userObjBid) {
      Object.keys(userObjBid.params.user).filter(function (param) {
        return __WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js___default()(USER_PARAMS, param);
      }).forEach(function (param) {
        var uparam = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["convertCamelToUnderscore"](param);
        userObj[uparam] = userObjBid.params.user[param];
      });
    }

    var appDeviceObjBid = __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js___default()(bidRequests, hasAppDeviceInfo);
    var appDeviceObj;

    if (appDeviceObjBid && appDeviceObjBid.params && appDeviceObjBid.params.app) {
      appDeviceObj = {};
      Object.keys(appDeviceObjBid.params.app).filter(function (param) {
        return __WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js___default()(APP_DEVICE_PARAMS, param);
      }).forEach(function (param) {
        return appDeviceObj[param] = appDeviceObjBid.params.app[param];
      });
    }

    var appIdObjBid = __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js___default()(bidRequests, hasAppId);
    var appIdObj;

    if (appIdObjBid && appIdObjBid.params && appDeviceObjBid.params.app && appDeviceObjBid.params.app.id) {
      appIdObj = {
        appid: appIdObjBid.params.app.id
      };
    }

    var debugObj = {};
    var debugObjParams = {};
    var debugCookieName = 'apn_prebid_debug';
    var debugCookie = storage.getCookie(debugCookieName) || null;

    if (debugCookie) {
      try {
        debugObj = JSON.parse(debugCookie);
      } catch (e) {
        __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logError"]('AppNexus Debug Auction Cookie Error:\n\n' + e);
      }
    } else {
      var debugBidRequest = __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js___default()(bidRequests, hasDebug);

      if (debugBidRequest && debugBidRequest.debug) {
        debugObj = debugBidRequest.debug;
      }
    }

    if (debugObj && debugObj.enabled) {
      Object.keys(debugObj).filter(function (param) {
        return __WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js___default()(DEBUG_PARAMS, param);
      }).forEach(function (param) {
        debugObjParams[param] = debugObj[param];
      });
    }

    var memberIdBid = __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js___default()(bidRequests, hasMemberId);
    var member = memberIdBid ? parseInt(memberIdBid.params.member, 10) : 0;
    var schain = bidRequests[0].schain;
    var payload = {
      tags: _toConsumableArray(tags),
      user: userObj,
      sdk: {
        source: SOURCE,
        version: "4.2.0"
      },
      schain: schain
    };

    if (member > 0) {
      payload.member_id = member;
    }

    if (appDeviceObjBid) {
      payload.device = appDeviceObj;
    }

    if (appIdObjBid) {
      payload.app = appIdObj;
    }

    if (__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('adpod.brandCategoryExclusion')) {
      payload.brand_category_uniqueness = true;
    }

    if (debugObjParams.enabled) {
      payload.debug = debugObjParams;
      __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logInfo"]('AppNexus Debug Auction Settings:\n\n' + JSON.stringify(debugObjParams, null, 4));
    }

    if (bidderRequest && bidderRequest.gdprConsent) {
      // note - objects for impbus use underscore instead of camelCase
      payload.gdpr_consent = {
        consent_string: bidderRequest.gdprConsent.consentString,
        consent_required: bidderRequest.gdprConsent.gdprApplies
      };
    }

    if (bidderRequest && bidderRequest.uspConsent) {
      payload.us_privacy = bidderRequest.uspConsent;
    }

    if (bidderRequest && bidderRequest.refererInfo) {
      var refererinfo = {
        rd_ref: encodeURIComponent(bidderRequest.refererInfo.referer),
        rd_top: bidderRequest.refererInfo.reachedTop,
        rd_ifs: bidderRequest.refererInfo.numIframes,
        rd_stk: bidderRequest.refererInfo.stack.map(function (url) {
          return encodeURIComponent(url);
        }).join(',')
      };
      payload.referrer_detection = refererinfo;
    }

    var hasAdPodBid = __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js___default()(bidRequests, hasAdPod);

    if (hasAdPodBid) {
      bidRequests.filter(hasAdPod).forEach(function (adPodBid) {
        var adPodTags = createAdPodRequest(tags, adPodBid); // don't need the original adpod placement because it's in adPodTags

        var nonPodTags = payload.tags.filter(function (tag) {
          return tag.uuid !== adPodBid.bidId;
        });
        payload.tags = [].concat(_toConsumableArray(nonPodTags), _toConsumableArray(adPodTags));
      });
    }

    var eids = [];
    var criteoId = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["deepAccess"](bidRequests[0], "userId.criteoId");

    if (criteoId) {
      eids.push({
        source: 'criteo.com',
        id: criteoId
      });
    }

    var tdid = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["deepAccess"](bidRequests[0], "userId.tdid");

    if (tdid) {
      eids.push({
        source: 'adserver.org',
        id: tdid,
        rti_partner: 'TDID'
      });
    }

    if (eids.length) {
      payload.eids = eids;
    }

    if (tags[0].publisher_id) {
      payload.publisher_id = tags[0].publisher_id;
    }

    var request = formatRequest(payload, bidderRequest);
    return request;
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

      __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logError"](errorMessage);
      return bids;
    }

    if (serverResponse.tags) {
      serverResponse.tags.forEach(function (serverBid) {
        var rtbBid = getRtbBid(serverBid);

        if (rtbBid) {
          if (rtbBid.cpm !== 0 && __WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js___default()(_this.supportedMediaTypes, rtbBid.ad_type)) {
            var bid = newBid(serverBid, rtbBid, bidderRequest);
            bid.mediaType = parseMediaType(rtbBid);
            bids.push(bid);
          }
        }
      });
    }

    if (serverResponse.debug && serverResponse.debug.debug_info) {
      var debugHeader = 'AppNexus Debug Auction for Prebid\n\n';
      var debugText = debugHeader + serverResponse.debug.debug_info;
      debugText = debugText.replace(/(<td>|<th>)/gm, '\t') // Tables
      .replace(/(<\/td>|<\/th>)/gm, '\n') // Tables
      .replace(/^<br>/gm, '') // Remove leading <br>
      .replace(/(<br>\n|<br>)/gm, '\n') // <br>
      .replace(/<h1>(.*)<\/h1>/gm, '\n\n===== $1 =====\n\n') // Header H1
      .replace(/<h[2-6]>(.*)<\/h[2-6]>/gm, '\n\n*** $1 ***\n\n') // Headers
      .replace(/(<([^>]+)>)/igm, ''); // Remove any other tags

      __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logMessage"]('https://console.appnexus.com/docs/understanding-the-debug-auction');
      __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logMessage"](debugText);
    }

    return bids;
  },

  /**
   * @typedef {Object} mappingFileInfo
   * @property {string} url  mapping file json url
   * @property {number} refreshInDays prebid stores mapping data in localstorage so you can return in how many days you want to update value stored in localstorage.
   * @property {string} localStorageKey unique key to store your mapping json in localstorage
   */

  /**
   * Returns mapping file info. This info will be used by bidderFactory to preload mapping file and store data in local storage
   * @returns {mappingFileInfo}
   */
  getMappingFileInfo: function getMappingFileInfo() {
    return {
      url: mappingFileUrl,
      refreshInDays: 2
    };
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    if (syncOptions.iframeEnabled) {
      return [{
        type: 'iframe',
        url: 'https://acdn.adnxs.com/dmp/async_usersync.html'
      }];
    }
  },
  transformBidParams: function transformBidParams(params, isOpenRtb) {
    params = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["convertTypes"]({
      'member': 'string',
      'invCode': 'string',
      'placementId': 'number',
      'keywords': __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["transformBidderParamKeywords"],
      'publisherId': 'number'
    }, params);

    if (isOpenRtb) {
      params.use_pmt_rule = typeof params.usePaymentRule === 'boolean' ? params.usePaymentRule : false;

      if (params.usePaymentRule) {
        delete params.usePaymentRule;
      }

      if (isPopulatedArray(params.keywords)) {
        params.keywords.forEach(deleteValues);
      }

      Object.keys(params).forEach(function (paramKey) {
        var convertedKey = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["convertCamelToUnderscore"](paramKey);

        if (convertedKey !== paramKey) {
          params[convertedKey] = params[paramKey];
          delete params[paramKey];
        }
      });
    }

    return params;
  },

  /**
   * Add element selector to javascript tracker to improve native viewability
   * @param {Bid} bid
   */
  onBidWon: function onBidWon(bid) {
    if (bid.native) {
      reloadViewabilityScriptWithCorrectParameters(bid);
    }
  }
};

function isPopulatedArray(arr) {
  return !!(__WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isArray"](arr) && arr.length > 0);
}

function deleteValues(keyPairObj) {
  if (isPopulatedArray(keyPairObj.value) && keyPairObj.value[0] === '') {
    delete keyPairObj.value;
  }
}

function reloadViewabilityScriptWithCorrectParameters(bid) {
  var viewJsPayload = getAppnexusViewabilityScriptFromJsTrackers(bid.native.javascriptTrackers);

  if (viewJsPayload) {
    var prebidParams = 'pbjs_adid=' + bid.adId + ';pbjs_auc=' + bid.adUnitCode;
    var jsTrackerSrc = getViewabilityScriptUrlFromPayload(viewJsPayload);
    var newJsTrackerSrc = jsTrackerSrc.replace('dom_id=%native_dom_id%', prebidParams); // find iframe containing script tag

    var frameArray = document.getElementsByTagName('iframe'); // boolean var to modify only one script. That way if there are muliple scripts,
    // they won't all point to the same creative.

    var modifiedAScript = false; // first, loop on all ifames

    for (var i = 0; i < frameArray.length && !modifiedAScript; i++) {
      var currentFrame = frameArray[i];

      try {
        // IE-compatible, see https://stackoverflow.com/a/3999191/2112089
        var nestedDoc = currentFrame.contentDocument || currentFrame.contentWindow.document;

        if (nestedDoc) {
          // if the doc is present, we look for our jstracker
          var scriptArray = nestedDoc.getElementsByTagName('script');

          for (var j = 0; j < scriptArray.length && !modifiedAScript; j++) {
            var currentScript = scriptArray[j];

            if (currentScript.getAttribute('data-src') == jsTrackerSrc) {
              currentScript.setAttribute('src', newJsTrackerSrc);
              currentScript.setAttribute('data-src', '');

              if (currentScript.removeAttribute) {
                currentScript.removeAttribute('data-src');
              }

              modifiedAScript = true;
            }
          }
        }
      } catch (exception) {
        // trying to access a cross-domain iframe raises a SecurityError
        // this is expected and ignored
        if (!(exception instanceof DOMException && exception.name === 'SecurityError')) {
          // all other cases are raised again to be treated by the calling function
          throw exception;
        }
      }
    }
  }
}

function strIsAppnexusViewabilityScript(str) {
  var regexMatchUrlStart = str.match(VIEWABILITY_URL_START);
  var viewUrlStartInStr = regexMatchUrlStart != null && regexMatchUrlStart.length >= 1;
  var regexMatchFileName = str.match(VIEWABILITY_FILE_NAME);
  var fileNameInStr = regexMatchFileName != null && regexMatchFileName.length >= 1;
  return str.startsWith(SCRIPT_TAG_START) && fileNameInStr && viewUrlStartInStr;
}

function getAppnexusViewabilityScriptFromJsTrackers(jsTrackerArray) {
  var viewJsPayload;

  if (__WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isStr"](jsTrackerArray) && strIsAppnexusViewabilityScript(jsTrackerArray)) {
    viewJsPayload = jsTrackerArray;
  } else if (__WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isArray"](jsTrackerArray)) {
    for (var i = 0; i < jsTrackerArray.length; i++) {
      var currentJsTracker = jsTrackerArray[i];

      if (strIsAppnexusViewabilityScript(currentJsTracker)) {
        viewJsPayload = currentJsTracker;
      }
    }
  }

  return viewJsPayload;
}

function getViewabilityScriptUrlFromPayload(viewJsPayload) {
  // extracting the content of the src attribute
  // -> substring between src=" and "
  var indexOfFirstQuote = viewJsPayload.indexOf('src="') + 5; // offset of 5: the length of 'src=' + 1

  var indexOfSecondQuote = viewJsPayload.indexOf('"', indexOfFirstQuote);
  var jsTrackerSrc = viewJsPayload.substring(indexOfFirstQuote, indexOfSecondQuote);
  return jsTrackerSrc;
}

function hasPurpose1Consent(bidderRequest) {
  var result = true;

  if (bidderRequest && bidderRequest.gdprConsent) {
    if (bidderRequest.gdprConsent.gdprApplies && bidderRequest.gdprConsent.apiVersion === 2) {
      result = !!(__WEBPACK_IMPORTED_MODULE_1__src_utils_js__["deepAccess"](bidderRequest.gdprConsent, 'vendorData.purpose.consents.1') === true);
    }
  }

  return result;
}

function formatRequest(payload, bidderRequest) {
  var request = [];
  var options = {};

  if (!hasPurpose1Consent(bidderRequest)) {
    options = {
      withCredentials: false
    };
  }

  if (payload.tags.length > MAX_IMPS_PER_REQUEST) {
    var clonedPayload = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["deepClone"](payload);
    __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["chunk"](payload.tags, MAX_IMPS_PER_REQUEST).forEach(function (tags) {
      clonedPayload.tags = tags;
      var payloadString = JSON.stringify(clonedPayload);
      request.push({
        method: 'POST',
        url: URL,
        data: payloadString,
        bidderRequest: bidderRequest,
        options: options
      });
    });
  } else {
    var payloadString = JSON.stringify(payload);
    request = {
      method: 'POST',
      url: URL,
      data: payloadString,
      bidderRequest: bidderRequest,
      options: options
    };
  }

  return request;
}

function newRenderer(adUnitCode, rtbBid) {
  var rendererOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var renderer = __WEBPACK_IMPORTED_MODULE_0__src_Renderer_js__["a" /* Renderer */].install({
    id: rtbBid.renderer_id,
    url: rtbBid.renderer_url,
    config: rendererOptions,
    loaded: false,
    adUnitCode: adUnitCode
  });

  try {
    renderer.setRender(outstreamRender);
  } catch (err) {
    __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logWarn"]('Prebid Error calling setRender on renderer', err);
  }

  renderer.setEventHandlers({
    impression: function impression() {
      return __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logMessage"]('AppNexus outstream video impression event');
    },
    loaded: function loaded() {
      return __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logMessage"]('AppNexus outstream video loaded event');
    },
    ended: function ended() {
      __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logMessage"]('AppNexus outstream renderer video event');
      document.querySelector("#".concat(adUnitCode)).style.display = 'none';
    }
  });
  return renderer;
}
/**
 * Unpack the Server's Bid into a Prebid-compatible one.
 * @param serverBid
 * @param rtbBid
 * @param bidderRequest
 * @return Bid
 */


function newBid(serverBid, rtbBid, bidderRequest) {
  var bidRequest = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["getBidRequest"](serverBid.uuid, [bidderRequest]);
  var bid = {
    requestId: serverBid.uuid,
    cpm: rtbBid.cpm,
    creativeId: rtbBid.creative_id,
    dealId: rtbBid.deal_id,
    currency: 'USD',
    netRevenue: true,
    ttl: 300,
    adUnitCode: bidRequest.adUnitCode,
    appnexus: {
      buyerMemberId: rtbBid.buyer_member_id,
      dealPriority: rtbBid.deal_priority,
      dealCode: rtbBid.deal_code
    }
  };

  if (rtbBid.advertiser_id) {
    bid.meta = _extends({}, bid.meta, {
      advertiserId: rtbBid.advertiser_id
    });
  }

  if (rtbBid.rtb.video) {
    // shared video properties used for all 3 contexts
    _extends(bid, {
      width: rtbBid.rtb.video.player_width,
      height: rtbBid.rtb.video.player_height,
      vastImpUrl: rtbBid.notify_url,
      ttl: 3600
    });

    var videoContext = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.video.context');

    switch (videoContext) {
      case __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["a" /* ADPOD */]:
        var primaryCatId = Object(__WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory_js__["getIabSubCategory"])(bidRequest.bidder, rtbBid.brand_category_id);
        bid.meta = _extends({}, bid.meta, {
          primaryCatId: primaryCatId
        });
        var dealTier = rtbBid.deal_priority;
        bid.video = {
          context: __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["a" /* ADPOD */],
          durationSeconds: Math.floor(rtbBid.rtb.video.duration_ms / 1000),
          dealTier: dealTier
        };
        bid.vastUrl = rtbBid.rtb.video.asset_url;
        break;

      case __WEBPACK_IMPORTED_MODULE_8__src_video_js__["b" /* OUTSTREAM */]:
        bid.adResponse = serverBid;
        bid.adResponse.ad = bid.adResponse.ads[0];
        bid.adResponse.ad.video = bid.adResponse.ad.rtb.video;
        bid.vastXml = rtbBid.rtb.video.content;

        if (rtbBid.renderer_url) {
          var videoBid = __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js___default()(bidderRequest.bids, function (bid) {
            return bid.bidId === serverBid.uuid;
          });
          var rendererOptions = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["deepAccess"](videoBid, 'renderer.options');
          bid.renderer = newRenderer(bid.adUnitCode, rtbBid, rendererOptions);
        }

        break;

      case __WEBPACK_IMPORTED_MODULE_8__src_video_js__["a" /* INSTREAM */]:
        bid.vastUrl = rtbBid.notify_url + '&redir=' + encodeURIComponent(rtbBid.rtb.video.asset_url);
        break;
    }
  } else if (rtbBid.rtb[__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["c" /* NATIVE */]]) {
    var nativeAd = rtbBid.rtb[__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["c" /* NATIVE */]]; // setting up the jsTracker:
    // we put it as a data-src attribute so that the tracker isn't called
    // until we have the adId (see onBidWon)

    var jsTrackerDisarmed = rtbBid.viewability.config.replace('src=', 'data-src=');
    var jsTrackers = nativeAd.javascript_trackers;

    if (jsTrackers == undefined) {
      jsTrackers = jsTrackerDisarmed;
    } else if (__WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isStr"](jsTrackers)) {
      jsTrackers = [jsTrackers, jsTrackerDisarmed];
    } else {
      jsTrackers.push(jsTrackerDisarmed);
    }

    bid[__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["c" /* NATIVE */]] = {
      title: nativeAd.title,
      body: nativeAd.desc,
      body2: nativeAd.desc2,
      cta: nativeAd.ctatext,
      rating: nativeAd.rating,
      sponsoredBy: nativeAd.sponsored,
      privacyLink: nativeAd.privacy_link,
      address: nativeAd.address,
      downloads: nativeAd.downloads,
      likes: nativeAd.likes,
      phone: nativeAd.phone,
      price: nativeAd.price,
      salePrice: nativeAd.saleprice,
      clickUrl: nativeAd.link.url,
      displayUrl: nativeAd.displayurl,
      clickTrackers: nativeAd.link.click_trackers,
      impressionTrackers: nativeAd.impression_trackers,
      javascriptTrackers: jsTrackers
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
      if (rtbBid.rtb.trackers) {
        var url = rtbBid.rtb.trackers[0].impression_urls[0];
        var tracker = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["createTrackPixelHtml"](url);
        bid.ad += tracker;
      }
    } catch (error) {
      __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logError"]('Error appending tracking pixel', error);
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

  if (bid.params.publisherId) {
    tag.publisher_id = parseInt(bid.params.publisherId, 10);
  }

  if (bid.params.externalImpId) {
    tag.external_imp_id = bid.params.externalImpId;
  }

  if (!__WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isEmpty"](bid.params.keywords)) {
    var keywords = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["transformBidderParamKeywords"](bid.params.keywords);

    if (keywords.length > 0) {
      keywords.forEach(deleteValues);
    }

    tag.keywords = keywords;
  }

  if (bid.mediaType === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["c" /* NATIVE */] || __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["deepAccess"](bid, "mediaTypes.".concat(__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["c" /* NATIVE */]))) {
    tag.ad_types.push(__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["c" /* NATIVE */]);

    if (tag.sizes.length === 0) {
      tag.sizes = transformSizes([1, 1]);
    }

    if (bid.nativeParams) {
      var nativeRequest = buildNativeRequest(bid.nativeParams);
      tag[__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["c" /* NATIVE */]] = {
        layouts: [nativeRequest]
      };
    }
  }

  var videoMediaType = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["deepAccess"](bid, "mediaTypes.".concat(__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["d" /* VIDEO */]));
  var context = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["deepAccess"](bid, 'mediaTypes.video.context');

  if (videoMediaType && context === 'adpod') {
    tag.hb_source = 7;
  } else {
    tag.hb_source = 1;
  }

  if (bid.mediaType === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["d" /* VIDEO */] || videoMediaType) {
    tag.ad_types.push(__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["d" /* VIDEO */]);
  } // instream gets vastUrl, outstream gets vastXml


  if (bid.mediaType === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["d" /* VIDEO */] || videoMediaType && context !== 'outstream') {
    tag.require_asset_url = true;
  }

  if (bid.params.video) {
    tag.video = {}; // place any valid video params on the tag

    Object.keys(bid.params.video).filter(function (param) {
      return __WEBPACK_IMPORTED_MODULE_7_core_js_pure_features_array_includes_js___default()(VIDEO_TARGETING, param);
    }).forEach(function (param) {
      switch (param) {
        case 'context':
        case 'playback_method':
          var type = bid.params.video[param];
          type = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isArray"](type) ? type[0] : type;
          tag.video[param] = VIDEO_MAPPING[param][type];
          break;

        default:
          tag.video[param] = bid.params.video[param];
      }
    });
  }

  if (bid.renderer) {
    tag.video = _extends({}, tag.video, {
      custom_renderer_present: true
    });
  }

  var adUnit = __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js___default()(__WEBPACK_IMPORTED_MODULE_5__src_auctionManager_js__["a" /* auctionManager */].getAdUnits(), function (au) {
    return bid.transactionId === au.transactionId;
  });

  if (adUnit && adUnit.mediaTypes && adUnit.mediaTypes.banner) {
    tag.ad_types.push(__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["b" /* BANNER */]);
  }

  if (tag.ad_types.length === 0) {
    delete tag.ad_types;
  }

  return tag;
}
/* Turn bid request sizes into ut-compatible format */


function transformSizes(requestSizes) {
  var sizes = [];
  var sizeObj = {};

  if (__WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isArray"](requestSizes) && requestSizes.length === 2 && !__WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isArray"](requestSizes[0])) {
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

function hasAppDeviceInfo(bid) {
  if (bid.params) {
    return !!bid.params.app;
  }
}

function hasAppId(bid) {
  if (bid.params && bid.params.app) {
    return !!bid.params.app.id;
  }

  return !!bid.params.app;
}

function hasDebug(bid) {
  return !!bid.debug;
}

function hasAdPod(bid) {
  return bid.mediaTypes && bid.mediaTypes.video && bid.mediaTypes.video.context === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["a" /* ADPOD */];
}
/**
 * Expand an adpod placement into a set of request objects according to the
 * total adpod duration and the range of duration seconds. Sets minduration/
 * maxduration video property according to requireExactDuration configuration
 */


function createAdPodRequest(tags, adPodBid) {
  var _adPodBid$mediaTypes$ = adPodBid.mediaTypes.video,
      durationRangeSec = _adPodBid$mediaTypes$.durationRangeSec,
      requireExactDuration = _adPodBid$mediaTypes$.requireExactDuration;
  var numberOfPlacements = getAdPodPlacementNumber(adPodBid.mediaTypes.video);
  var maxDuration = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["getMaxValueFromArray"](durationRangeSec);
  var tagToDuplicate = tags.filter(function (tag) {
    return tag.uuid === adPodBid.bidId;
  });
  var request = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["fill"].apply(__WEBPACK_IMPORTED_MODULE_1__src_utils_js__, _toConsumableArray(tagToDuplicate).concat([numberOfPlacements]));

  if (requireExactDuration) {
    var divider = Math.ceil(numberOfPlacements / durationRangeSec.length);
    var chunked = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["chunk"](request, divider); // each configured duration is set as min/maxduration for a subset of requests

    durationRangeSec.forEach(function (duration, index) {
      chunked[index].map(function (tag) {
        setVideoProperty(tag, 'minduration', duration);
        setVideoProperty(tag, 'maxduration', duration);
      });
    });
  } else {
    // all maxdurations should be the same
    request.map(function (tag) {
      return setVideoProperty(tag, 'maxduration', maxDuration);
    });
  }

  return request;
}

function getAdPodPlacementNumber(videoParams) {
  var adPodDurationSec = videoParams.adPodDurationSec,
      durationRangeSec = videoParams.durationRangeSec,
      requireExactDuration = videoParams.requireExactDuration;
  var minAllowedDuration = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["getMinValueFromArray"](durationRangeSec);
  var numberOfPlacements = Math.floor(adPodDurationSec / minAllowedDuration);
  return requireExactDuration ? Math.max(numberOfPlacements, durationRangeSec.length) : numberOfPlacements;
}

function setVideoProperty(tag, key, value) {
  if (__WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isEmpty"](tag.video)) {
    tag.video = {};
  }

  tag.video[key] = value;
}

function getRtbBid(tag) {
  return tag && tag.ads && tag.ads.length && __WEBPACK_IMPORTED_MODULE_6_core_js_pure_features_array_find_js___default()(tag.ads, function (ad) {
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
    request[requestKey] = _extends({}, requiredParams, params[key]); // convert the sizes of image/icon assets to proper format (if needed)

    var isImageAsset = !!(requestKey === NATIVE_MAPPING.image.serverName || requestKey === NATIVE_MAPPING.icon.serverName);

    if (isImageAsset && request[requestKey].sizes) {
      var sizes = request[requestKey].sizes;

      if (__WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isArrayOfNums"](sizes) || __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isArray"](sizes) && sizes.length > 0 && sizes.every(function (sz) {
        return __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["isArrayOfNums"](sz);
      })) {
        request[requestKey].sizes = transformSizes(request[requestKey].sizes);
      }
    }

    if (requestKey === NATIVE_MAPPING.privacyLink) {
      request.privacy_supported = true;
    }
  });
  return request;
}
/**
 * This function hides google div container for outstream bids to remove unwanted space on page. Appnexus renderer creates a new iframe outside of google iframe to render the outstream creative.
 * @param {string} elementId element id
 */


function hidedfpContainer(elementId) {
  var el = document.getElementById(elementId).querySelectorAll("div[id^='google_ads']");

  if (el[0]) {
    el[0].style.setProperty('display', 'none');
  }
}

function outstreamRender(bid) {
  // push to render queue because ANOutstreamVideo may not be loaded yet
  hidedfpContainer(bid.adUnitCode);
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

  if (adType === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["d" /* VIDEO */]) {
    return __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["d" /* VIDEO */];
  } else if (adType === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["c" /* NATIVE */]) {
    return __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["c" /* NATIVE */];
  } else {
    return __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["b" /* BANNER */];
  }
}

Object(__WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[265]);