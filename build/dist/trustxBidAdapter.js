pbjsChunk([66],{

/***/ 618:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(619);


/***/ }),

/***/ 619:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_Renderer__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__ = __webpack_require__(2);




var BIDDER_CODE = 'trustx';
var ENDPOINT_URL = '//sofia.trustx.org/hb';
var TIME_TO_LIVE = 360;
var ADAPTER_SYNC_URL = '//sofia.trustx.org/push_sync';
var RENDERER_URL = '//acdn.adnxs.com/video/outstream/ANOutstreamVideo.js';
var LOG_ERROR_MESS = {
  noAuid: 'Bid from response has no auid parameter - ',
  noAdm: 'Bid from response has no adm parameter - ',
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
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["d" /* VIDEO */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.uid;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} validBidRequests - an array of bids
   * @param {bidderRequest} - bidder request object
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var auids = [];
    var bidsMap = {};
    var slotsMapByUid = {};
    var sizeMap = {};
    var bids = validBidRequests || [];
    var priceType = 'net';
    var pageKeywords;
    var reqId;
    bids.forEach(function (bid) {
      if (bid.params.priceType === 'gross') {
        priceType = 'gross';
      }

      reqId = bid.bidderRequestId;
      var uid = bid.params.uid,
          adUnitCode = bid.adUnitCode;
      auids.push(uid);
      var sizesId = __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](bid.sizes);

      if (!pageKeywords && !__WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](bid.params.keywords)) {
        var keywords = __WEBPACK_IMPORTED_MODULE_0__src_utils__["transformBidderParamKeywords"](bid.params.keywords);

        if (keywords.length > 0) {
          keywords.forEach(deleteValues);
        }

        pageKeywords = keywords;
      }

      if (!slotsMapByUid[uid]) {
        slotsMapByUid[uid] = {};
      }

      var slotsMap = slotsMapByUid[uid];

      if (!slotsMap[adUnitCode]) {
        slotsMap[adUnitCode] = {
          adUnitCode: adUnitCode,
          bids: [bid],
          parents: []
        };
      } else {
        slotsMap[adUnitCode].bids.push(bid);
      }

      var slot = slotsMap[adUnitCode];
      sizesId.forEach(function (sizeId) {
        sizeMap[sizeId] = true;

        if (!bidsMap[uid]) {
          bidsMap[uid] = {};
        }

        if (!bidsMap[uid][sizeId]) {
          bidsMap[uid][sizeId] = [slot];
        } else {
          bidsMap[uid][sizeId].push(slot);
        }

        slot.parents.push({
          parent: bidsMap[uid],
          key: sizeId,
          uid: uid
        });
      });
    });
    var payload = {
      pt: priceType,
      auids: auids.join(','),
      sizes: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getKeys"](sizeMap).join(','),
      r: reqId,
      wrapperType: 'Prebid_js',
      wrapperVersion: "2.37.0"
    };

    if (pageKeywords) {
      payload.keywords = JSON.stringify(pageKeywords);
    }

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
    }

    return {
      method: 'GET',
      url: ENDPOINT_URL,
      data: __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseQueryStringParameters"](payload).replace(/\&$/, ''),
      bidsMap: bidsMap
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @param {*} bidRequest
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var RendererConst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : __WEBPACK_IMPORTED_MODULE_2__src_Renderer__["a" /* Renderer */];
    serverResponse = serverResponse && serverResponse.body;
    var bidResponses = [];
    var bidsMap = bidRequest.bidsMap;
    var priceType = bidRequest.data.pt;
    var errorMessage;
    if (!serverResponse) errorMessage = LOG_ERROR_MESS.emptyResponse;else if (serverResponse.seatbid && !serverResponse.seatbid.length) {
      errorMessage = LOG_ERROR_MESS.hasEmptySeatbidArray;
    }

    if (!errorMessage && serverResponse.seatbid) {
      serverResponse.seatbid.forEach(function (respItem) {
        _addBidResponse(_getBidFromResponse(respItem), bidsMap, priceType, bidResponses, RendererConst);
      });
    }

    if (errorMessage) __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](errorMessage);
    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    if (syncOptions.pixelEnabled) {
      return [{
        type: 'image',
        url: ADAPTER_SYNC_URL
      }];
    }
  }
};

function isPopulatedArray(arr) {
  return !!(__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](arr) && arr.length > 0);
}

function deleteValues(keyPairObj) {
  if (isPopulatedArray(keyPairObj.value) && keyPairObj.value[0] === '') {
    delete keyPairObj.value;
  }
}

function _getBidFromResponse(respItem) {
  if (!respItem) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](LOG_ERROR_MESS.emptySeatbid);
  } else if (!respItem.bid) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](LOG_ERROR_MESS.hasNoArrayOfBids + JSON.stringify(respItem));
  } else if (!respItem.bid[0]) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](LOG_ERROR_MESS.noBid);
  }

  return respItem && respItem.bid && respItem.bid[0];
}

function _addBidResponse(serverBid, bidsMap, priceType, bidResponses, RendererConst) {
  if (!serverBid) return;
  var errorMessage;
  if (!serverBid.auid) errorMessage = LOG_ERROR_MESS.noAuid + JSON.stringify(serverBid);
  if (!serverBid.adm) errorMessage = LOG_ERROR_MESS.noAdm + JSON.stringify(serverBid);else {
    var awaitingBids = bidsMap[serverBid.auid];

    if (awaitingBids) {
      var sizeId = "".concat(serverBid.w, "x").concat(serverBid.h);

      if (awaitingBids[sizeId]) {
        var slot = awaitingBids[sizeId][0];
        var bid = slot.bids.shift();
        var bidResponse = {
          requestId: bid.bidId,
          // bid.bidderRequestId,
          bidderCode: spec.code,
          cpm: serverBid.price,
          width: serverBid.w,
          height: serverBid.h,
          creativeId: serverBid.auid,
          // bid.bidId,
          currency: 'USD',
          netRevenue: priceType !== 'gross',
          ttl: TIME_TO_LIVE,
          dealId: serverBid.dealid
        };

        if (serverBid.content_type === 'video') {
          bidResponse.vastXml = serverBid.adm;
          bidResponse.mediaType = __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["d" /* VIDEO */];
          bidResponse.adResponse = {
            content: bidResponse.vastXml
          };

          if (!bid.renderer && (!bid.mediaTypes || !bid.mediaTypes.video || bid.mediaTypes.video.context === 'outstream')) {
            bidResponse.renderer = createRenderer(bidResponse, {
              id: bid.bidId,
              url: RENDERER_URL
            }, RendererConst);
          }
        } else {
          bidResponse.ad = serverBid.adm;
          bidResponse.mediaType = __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["b" /* BANNER */];
        }

        bidResponses.push(bidResponse);

        if (!slot.bids.length) {
          slot.parents.forEach(function (_ref) {
            var parent = _ref.parent,
                key = _ref.key,
                uid = _ref.uid;
            var index = parent[key].indexOf(slot);

            if (index > -1) {
              parent[key].splice(index, 1);
            }

            if (!parent[key].length) {
              delete parent[key];

              if (!__WEBPACK_IMPORTED_MODULE_0__src_utils__["getKeys"](parent).length) {
                delete bidsMap[uid];
              }
            }
          });
        }
      }
    } else {
      errorMessage = LOG_ERROR_MESS.noPlacementCode + serverBid.auid;
    }
  }

  if (errorMessage) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](errorMessage);
  }
}

function outstreamRender(bid) {
  bid.renderer.push(function () {
    window.ANOutstreamVideo.renderAd({
      targetId: bid.adUnitCode,
      adResponse: bid.adResponse
    });
  });
}

function createRenderer(bid, rendererParams, RendererConst) {
  var rendererInst = RendererConst.install({
    id: rendererParams.id,
    url: rendererParams.url,
    loaded: false
  });

  try {
    rendererInst.setRender(outstreamRender);
  } catch (err) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]('Prebid Error calling setRender on renderer', err);
  }

  return rendererInst;
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[618]);