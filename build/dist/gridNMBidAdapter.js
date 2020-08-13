pbjsChunk([208],{

/***/ 434:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(435);


/***/ }),

/***/ 435:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony export (immutable) */ __webpack_exports__["resetUserSync"] = resetUserSync;
/* harmony export (immutable) */ __webpack_exports__["getSyncUrl"] = getSyncUrl;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_Renderer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__ = __webpack_require__(2);




var BIDDER_CODE = 'gridNM';
var ENDPOINT_URL = 'https://grid.bidswitch.net/hbnm';
var SYNC_URL = 'https://x.bidswitch.net/sync?ssp=themediagrid';
var TIME_TO_LIVE = 360;
var RENDERER_URL = 'https://acdn.adnxs.com/video/outstream/ANOutstreamVideo.js';
var hasSynced = false;
var LOG_ERROR_MESS = {
  noAdm: 'Bid from response has no adm parameter - ',
  noPrice: 'Bid from response has no price parameter - ',
  wrongContentType: 'Bid from response has wrong content_type parameter - ',
  noBid: 'Array of bid objects is empty',
  noPlacementCode: 'Can\'t find in requested bids the bid with auid - ',
  emptyUids: 'Uids should be not empty',
  emptySeatbid: 'Seatbid array from response has empty item',
  emptyResponse: 'Response is empty',
  hasEmptySeatbidArray: 'Response has empty seatbid array',
  hasNoArrayOfBids: 'Seatbid from response has no array of bid objects - '
};
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    var invalid = !bid.params.source || !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](bid.params.source) || !bid.params.secid || !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](bid.params.secid) || !bid.params.pubid || !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](bid.params.pubid);

    if (!invalid) {
      invalid = !bid.params.video || !bid.params.video.protocols || !bid.params.video.mimes;
    }

    if (!invalid) {
      var _bid$params$video = bid.params.video,
          protocols = _bid$params$video.protocols,
          mimes = _bid$params$video.mimes;
      invalid = !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](mimes) || !mimes.length || mimes.filter(function (it) {
        return !(it && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](it));
      }).length;

      if (!invalid) {
        invalid = !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](protocols) || !protocols.length || protocols.filter(function (it) {
          return !(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isNumber"](it) && it > 0 && !(it % 1));
        }).length;
      }
    }

    return !invalid;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} validBidRequests - an array of bids
   * @param {bidderRequest} bidderRequest bidder request object
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var bids = validBidRequests || [];
    var requests = [];
    bids.forEach(function (bid) {
      var params = bid.params,
          bidderRequestId = bid.bidderRequestId,
          sizes = bid.sizes;
      var payload = {
        sizes: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](sizes).join(','),
        r: bidderRequestId,
        wrapperType: 'Prebid_js',
        wrapperVersion: "4.2.0"
      };

      if (bidderRequest) {
        if (bidderRequest.refererInfo && bidderRequest.refererInfo.referer) {
          payload.u = bidderRequest.refererInfo.referer;
        }

        if (bidderRequest.timeout) {
          payload.wtimeout = bidderRequest.timeout;
        }

        if (bidderRequest.gdprConsent) {
          if (bidderRequest.gdprConsent.consentString) {
            payload.gdpr_consent = bidderRequest.gdprConsent.consentString;
          }

          payload.gdpr_applies = typeof bidderRequest.gdprConsent.gdprApplies === 'boolean' ? Number(bidderRequest.gdprConsent.gdprApplies) : 1;
        }

        if (bidderRequest.uspConsent) {
          payload.us_privacy = bidderRequest.uspConsent;
        }
      }

      requests.push({
        method: 'POST',
        url: ENDPOINT_URL + '?' + __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseQueryStringParameters"](payload).replace(/\&$/, ''),
        bid: bid,
        data: params // content

      });
    });
    return requests;
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @param {*} bidRequest
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    serverResponse = serverResponse && serverResponse.body;
    var bidResponses = [];
    var errorMessage;
    if (!serverResponse) errorMessage = LOG_ERROR_MESS.emptyResponse;else if (serverResponse.seatbid && !serverResponse.seatbid.length) {
      errorMessage = LOG_ERROR_MESS.hasEmptySeatbidArray;
    }

    if (!errorMessage && serverResponse.seatbid) {
      var serverBid = _getBidFromResponse(serverResponse.seatbid[0]);

      if (serverBid) {
        if (!serverBid.adm) errorMessage = LOG_ERROR_MESS.noAdm + JSON.stringify(serverBid);else if (!serverBid.price) errorMessage = LOG_ERROR_MESS.noPrice + JSON.stringify(serverBid);else if (serverBid.content_type !== 'video') errorMessage = LOG_ERROR_MESS.wrongContentType + serverBid.content_type;

        if (!errorMessage) {
          var bid = bidRequest.bid;

          if (!serverBid.w || !serverBid.h) {
            var size = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](bid.sizes)[0].split('x');
            serverBid.w = size[0];
            serverBid.h = size[1];
          }

          var bidResponse = {
            requestId: bid.bidId,
            bidderCode: spec.code,
            cpm: serverBid.price,
            width: serverBid.w,
            height: serverBid.h,
            creativeId: serverBid.auid || bid.bidderRequestId,
            currency: 'USD',
            netRevenue: false,
            ttl: TIME_TO_LIVE,
            dealId: serverBid.dealid,
            vastXml: serverBid.adm,
            mediaType: __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */],
            adResponse: {
              content: serverBid.adm
            }
          };

          if (!bid.renderer && (!bid.mediaTypes || !bid.mediaTypes.video || bid.mediaTypes.video.context === 'outstream')) {
            bidResponse.renderer = createRenderer(bidResponse, {
              id: bid.bidId,
              url: RENDERER_URL
            });
          }

          bidResponses.push(bidResponse);
        }
      }
    }

    if (errorMessage) __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](errorMessage);
    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions, responses, gdprConsent, uspConsent) {
    if (!hasSynced && syncOptions.pixelEnabled) {
      var params = '';

      if (gdprConsent && typeof gdprConsent.consentString === 'string') {
        if (typeof gdprConsent.gdprApplies === 'boolean') {
          params += "&gdpr=".concat(Number(gdprConsent.gdprApplies), "&gdpr_consent=").concat(gdprConsent.consentString);
        } else {
          params += "&gdpr_consent=".concat(gdprConsent.consentString);
        }
      }

      if (uspConsent) {
        params += "&us_privacy=".concat(uspConsent);
      }

      hasSynced = true;
      return {
        type: 'image',
        url: SYNC_URL + params
      };
    }
  }
};

function _getBidFromResponse(respItem) {
  if (!respItem) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](LOG_ERROR_MESS.emptySeatbid);
  } else if (!respItem.bid) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](LOG_ERROR_MESS.hasNoArrayOfBids + JSON.stringify(respItem));
  } else if (!respItem.bid[0]) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](LOG_ERROR_MESS.noBid);
  }

  return respItem && respItem.bid && respItem.bid[0];
}

function outstreamRender(bid) {
  bid.renderer.push(function () {
    window.ANOutstreamVideo.renderAd({
      targetId: bid.adUnitCode,
      adResponse: bid.adResponse
    });
  });
}

function createRenderer(bid, rendererParams) {
  var renderer = __WEBPACK_IMPORTED_MODULE_2__src_Renderer_js__["a" /* Renderer */].install({
    id: rendererParams.id,
    url: rendererParams.url,
    loaded: false
  });

  try {
    renderer.setRender(outstreamRender);
  } catch (err) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('Prebid Error calling setRender on renderer', err);
  }

  return renderer;
}

function resetUserSync() {
  hasSynced = false;
}
function getSyncUrl() {
  return SYNC_URL;
}
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[434]);