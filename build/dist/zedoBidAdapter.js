pbjsChunk([48],{

/***/ 826:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(827);


/***/ }),

/***/ 827:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_Renderer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_refererDetection_js__ = __webpack_require__(30);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }







var BIDDER_CODE = 'zedo';
var SECURE_URL = 'https://saxp.zedo.com/asw/fmh.json';
var DIM_TYPE = {
  '7': 'display',
  '9': 'display',
  '14': 'display',
  '70': 'SBR',
  '83': 'CurtainRaiser',
  '85': 'Inarticle',
  '86': 'pswipeup',
  '88': 'Inview',
  '100': 'display',
  '101': 'display',
  '102': 'display',
  '103': 'display' // '85': 'pre-mid-post-roll',

};
var SECURE_EVENT_PIXEL_URL = 'tt1.zedo.com/log/p.gif';
var spec = {
  code: BIDDER_CODE,
  aliases: [],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {object} bid The bid to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params && bid.params.channelCode && bid.params.dimId);
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} bidRequests A non-empty list of bid requests which should be sent to the Server.
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var data = {
      placements: []
    };
    bidRequests.map(function (bidRequest) {
      var channelCode = parseInt(bidRequest.params.channelCode);
      var network = parseInt(channelCode / 1000000);
      var channel = channelCode % 1000000;
      var dim = getSizes(bidRequest.sizes);
      var placement = {
        id: bidRequest.bidId,
        network: network,
        channel: channel,
        publisher: bidRequest.params.pubId ? bidRequest.params.pubId : 0,
        width: dim[0],
        height: dim[1],
        dimension: bidRequest.params.dimId,
        version: "4.2.0",
        keyword: '',
        transactionId: bidRequest.transactionId
      };

      if (bidderRequest && bidderRequest.gdprConsent) {
        if (typeof bidderRequest.gdprConsent.gdprApplies === 'boolean') {
          data.gdpr = Number(bidderRequest.gdprConsent.gdprApplies);
        }

        data.gdpr_consent = bidderRequest.gdprConsent.consentString;
      } // Add CCPA consent string


      if (bidderRequest && bidderRequest.uspConsent) {
        data.usp = bidderRequest.uspConsent;
      }

      var dimType = DIM_TYPE[String(bidRequest.params.dimId)];

      if (dimType) {
        placement['renderers'] = [{
          'name': dimType
        }];
      } else {
        // default to display
        placement['renderers'] = [{
          'name': 'display'
        }];
      }

      data['placements'].push(placement);
    }); // adding schain object

    if (bidRequests[0].schain) {
      data['supplyChain'] = getSupplyChain(bidRequests[0].schain);
    }

    return {
      method: 'GET',
      url: SECURE_URL,
      data: 'g=' + JSON.stringify(data)
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, request) {
    serverResponse = serverResponse.body;
    var bids = [];

    if (!serverResponse || serverResponse.error) {
      var errorMessage = "in response for ".concat(request.bidderCode, " adapter");

      if (serverResponse && serverResponse.error) {
        errorMessage += ": ".concat(serverResponse.error);
      }

      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](errorMessage);
      return bids;
    }

    if (serverResponse.ad) {
      serverResponse.ad.forEach(function (ad) {
        var creativeBid = getCreative(ad);

        if (creativeBid) {
          if (parseInt(creativeBid.cpm) !== 0) {
            var bid = newBid(ad, creativeBid, request);
            bid.mediaType = parseMediaType(creativeBid);
            bids.push(bid);
          }
        }
      });
    }

    return bids;
  },
  getUserSyncs: function getUserSyncs(syncOptions, responses, gdprConsent) {
    if (syncOptions.iframeEnabled) {
      var url = 'https://tt3.zedo.com/rs/us/fcs.html';

      if (gdprConsent && typeof gdprConsent.consentString === 'string') {
        // add 'gdpr' only if 'gdprApplies' is defined
        if (typeof gdprConsent.gdprApplies === 'boolean') {
          url += "?gdpr=".concat(Number(gdprConsent.gdprApplies), "&gdpr_consent=").concat(gdprConsent.consentString);
        } else {
          url += "?gdpr_consent=".concat(gdprConsent.consentString);
        }
      }

      return [{
        type: 'iframe',
        url: url
      }];
    }
  },
  onTimeout: function onTimeout(timeoutData) {
    try {
      logEvent('117', timeoutData);
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](e);
    }
  },
  onBidWon: function onBidWon(bid) {
    try {
      logEvent('116', [bid]);
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](e);
    }
  }
};

function getSupplyChain(supplyChain) {
  return {
    complete: supplyChain.complete,
    nodes: supplyChain.nodes
  };
}

;

function getCreative(ad) {
  return ad && ad.creatives && ad.creatives.length && __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find___default()(ad.creatives, function (creative) {
    return creative.adId;
  });
}

;
/**
 * Unpack the Server's Bid into a Prebid-compatible one.
 * @param serverBid
 * @param rtbBid
 * @param bidderRequest
 * @return Bid
 */

function newBid(serverBid, creativeBid, bidderRequest) {
  var bid = {
    requestId: serverBid.slotId,
    creativeId: creativeBid.adId,
    network: serverBid.network,
    adType: creativeBid.creativeDetails.type,
    dealId: 99999999,
    currency: 'USD',
    netRevenue: true,
    ttl: 300
  };

  if (creativeBid.creativeDetails.type === 'VAST') {
    _extends(bid, {
      width: creativeBid.width,
      height: creativeBid.height,
      vastXml: creativeBid.creativeDetails.adContent,
      cpm: parseInt(creativeBid.bidCpm) / 1000000,
      ttl: 3600
    });

    var rendererOptions = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidderRequest, 'renderer.options');
    var rendererUrl = 'https://ss3.zedo.com/gecko/beta/fmpbgt.min.js';

    _extends(bid, {
      adResponse: serverBid,
      renderer: getRenderer(bid.adUnitCode, serverBid.slotId, rendererUrl, rendererOptions)
    });
  } else {
    _extends(bid, {
      width: creativeBid.width,
      height: creativeBid.height,
      cpm: parseInt(creativeBid.bidCpm) / 1000000,
      ad: creativeBid.creativeDetails.adContent
    });
  }

  return bid;
}
/* Turn bid request sizes into compatible format */


function getSizes(requestSizes) {
  var width = 0;
  var height = 0;

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](requestSizes) && requestSizes.length === 2 && !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](requestSizes[0])) {
    width = parseInt(requestSizes[0], 10);
    height = parseInt(requestSizes[1], 10);
  } else if (_typeof(requestSizes) === 'object') {
    for (var i = 0; i < requestSizes.length; i++) {
      var size = requestSizes[i];
      width = parseInt(size[0], 10);
      height = parseInt(size[1], 10);
      break;
    }
  }

  return [width, height];
}

function getRenderer(adUnitCode, rendererId, rendererUrl) {
  var rendererOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var renderer = __WEBPACK_IMPORTED_MODULE_4__src_Renderer_js__["a" /* Renderer */].install({
    id: rendererId,
    url: rendererUrl,
    config: rendererOptions,
    loaded: false
  });

  try {
    renderer.setRender(videoRenderer);
  } catch (err) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('Prebid Error calling setRender on renderer', err);
  }

  renderer.setEventHandlers({
    impression: function impression() {
      return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logMessage"]('ZEDO video impression');
    },
    loaded: function loaded() {
      return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logMessage"]('ZEDO video loaded');
    },
    ended: function ended() {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logMessage"]('ZEDO renderer video ended');
      document.querySelector("#".concat(adUnitCode)).style.display = 'none';
    }
  });
  return renderer;
}

function videoRenderer(bid) {
  // push to render queue
  var refererInfo = Object(__WEBPACK_IMPORTED_MODULE_5__src_refererDetection_js__["a" /* getRefererInfo */])();
  var referrer = '';

  if (refererInfo) {
    referrer = refererInfo.referer;
  }

  bid.renderer.push(function () {
    var channelCode = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'params.0.channelCode') || 0;
    var dimId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'params.0.dimId') || 0;
    var publisher = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'params.0.pubId') || 0;
    var options = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'params.0.options') || {};
    var channel = channelCode > 0 ? channelCode - bid.network * 1000000 : 0;
    var rndr = new window.ZdPBTag(bid.adUnitCode, bid.network, bid.width, bid.height, bid.adType, bid.vastXml, channel, dimId, encodeURI(referrer) || '', options);
    rndr.renderAd(publisher);
  });
}

function parseMediaType(creativeBid) {
  var adType = creativeBid.creativeDetails.type;

  if (adType === 'VAST') {
    return __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["d" /* VIDEO */];
  } else {
    return __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */];
  }
}

function logEvent(eid, data) {
  var getParams = {
    protocol: 'https',
    hostname: SECURE_EVENT_PIXEL_URL,
    search: getLoggingData(eid, data)
  };
  var eventUrl = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["buildUrl"](getParams).replace(/&/g, ';');
  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["triggerPixel"](eventUrl);
}

function getLoggingData(eid, data) {
  data = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](data) && data || [];
  var params = {};
  var channel, network, dim, publisher, adunitCode, timeToRespond, cpm;
  data.map(function (adunit) {
    adunitCode = adunit.adUnitCode;
    channel = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](adunit, 'params.0.channelCode') || 0;
    network = channel > 0 ? parseInt(channel / 1000000) : 0;
    dim = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](adunit, 'params.0.dimId') * 256 || 0;
    publisher = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](adunit, 'params.0.pubId') || 0;
    timeToRespond = adunit.timeout ? adunit.timeout : adunit.timeToRespond;
    cpm = adunit.cpm;
  });
  var referrer = '';
  var refererInfo = Object(__WEBPACK_IMPORTED_MODULE_5__src_refererDetection_js__["a" /* getRefererInfo */])();

  if (refererInfo) {
    referrer = refererInfo.referer;
  }

  params.n = network;
  params.c = channel;
  params.s = publisher;
  params.x = dim;
  params.ai = encodeURI('Prebid^zedo^' + adunitCode + '^' + cpm + '^' + timeToRespond);
  params.pu = encodeURI(referrer) || '';
  params.eid = eid;
  params.e = 'e';
  params.z = Math.random();
  return params;
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[826]);