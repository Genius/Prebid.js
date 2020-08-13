pbjsChunk([209],{

/***/ 432:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(433);


/***/ }),

/***/ 433:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_config_js__ = __webpack_require__(3);





var BIDDER_CODE = 'grid';
var ENDPOINT_URL = 'https://grid.bidswitch.net/hb';
var NEW_ENDPOINT_URL = 'https://grid.bidswitch.net/hbjson';
var SYNC_URL = 'https://x.bidswitch.net/sync?ssp=themediagrid';
var TIME_TO_LIVE = 360;
var RENDERER_URL = 'https://acdn.adnxs.com/video/outstream/ANOutstreamVideo.js';
var hasSynced = false;
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
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */]],

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
   * @param {bidderRequest} bidderRequest bidder request object
   * @return {ServerRequest[]} Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var oldFormatBids = [];
    var newFormatBids = [];
    validBidRequests.forEach(function (bid) {
      bid.params.useNewFormat ? newFormatBids.push(bid) : oldFormatBids.push(bid);
    });
    var requests = [];

    if (newFormatBids.length) {
      requests.push(buildNewRequest(newFormatBids, bidderRequest));
    }

    if (oldFormatBids.length) {
      requests.push(buildOldRequest(oldFormatBids, bidderRequest));
    }

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
      serverResponse.seatbid.forEach(function (respItem) {
        _addBidResponse(_getBidFromResponse(respItem), bidRequest, bidResponses);
      });
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

function isPopulatedArray(arr) {
  return !!(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](arr) && arr.length > 0);
}

function deleteValues(keyPairObj) {
  if (isPopulatedArray(keyPairObj.value) && keyPairObj.value[0] === '') {
    delete keyPairObj.value;
  }
}

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

function _addBidResponse(serverBid, bidRequest, bidResponses) {
  if (!serverBid) return;
  var errorMessage;
  if (!serverBid.auid) errorMessage = LOG_ERROR_MESS.noAuid + JSON.stringify(serverBid);
  if (!serverBid.adm) errorMessage = LOG_ERROR_MESS.noAdm + JSON.stringify(serverBid);else {
    var bid = null;
    var slot = null;
    var bidsMap = bidRequest.bidsMap;

    if (bidRequest.newFormat) {
      bid = bidsMap[serverBid.impid];
    } else {
      var awaitingBids = bidsMap[serverBid.auid];

      if (awaitingBids) {
        var sizeId = "".concat(serverBid.w, "x").concat(serverBid.h);

        if (awaitingBids[sizeId]) {
          slot = awaitingBids[sizeId][0];
          bid = slot.bids.shift();
        }
      } else {
        errorMessage = LOG_ERROR_MESS.noPlacementCode + serverBid.auid;
      }
    }

    if (bid) {
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
        netRevenue: false,
        ttl: TIME_TO_LIVE,
        dealId: serverBid.dealid
      };

      if (serverBid.content_type === 'video') {
        bidResponse.vastXml = serverBid.adm;
        bidResponse.mediaType = __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */];
        bidResponse.adResponse = {
          content: bidResponse.vastXml
        };

        if (!bid.renderer && (!bid.mediaTypes || !bid.mediaTypes.video || bid.mediaTypes.video.context === 'outstream')) {
          bidResponse.renderer = createRenderer(bidResponse, {
            id: bid.bidId,
            url: RENDERER_URL
          });
        }
      } else {
        bidResponse.ad = serverBid.adm;
        bidResponse.mediaType = __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */];
      }

      bidResponses.push(bidResponse);

      if (slot && !slot.bids.length) {
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

            if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getKeys"](parent).length) {
              delete bidsMap[uid];
            }
          }
        });
      }
    }
  }

  if (errorMessage) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](errorMessage);
  }
}

function buildOldRequest(validBidRequests, bidderRequest) {
  var auids = [];
  var bidsMap = {};
  var slotsMapByUid = {};
  var sizeMap = {};
  var bids = validBidRequests || [];
  var pageKeywords = null;
  var reqId;
  bids.forEach(function (bid) {
    reqId = bid.bidderRequestId;
    var uid = bid.params.uid,
        adUnitCode = bid.adUnitCode,
        mediaTypes = bid.mediaTypes;
    auids.push(uid);
    var sizesId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](bid.sizes);

    if (!pageKeywords && !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](bid.params.keywords)) {
      pageKeywords = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["transformBidderParamKeywords"](bid.params.keywords);
    }

    var addedSizes = {};
    sizesId.forEach(function (sizeId) {
      addedSizes[sizeId] = true;
    });
    var bannerSizesId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](mediaTypes, 'banner.sizes'));
    var videoSizesId = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](mediaTypes, 'video.playerSize'));
    bannerSizesId.concat(videoSizesId).forEach(function (sizeId) {
      if (!addedSizes[sizeId]) {
        addedSizes[sizeId] = true;
        sizesId.push(sizeId);
      }
    });

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
  var configKeywords = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["transformBidderParamKeywords"]({
    'user': __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](__WEBPACK_IMPORTED_MODULE_4__src_config_js__["b" /* config */].getConfig('fpd.user'), 'keywords') || null,
    'context': __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](__WEBPACK_IMPORTED_MODULE_4__src_config_js__["b" /* config */].getConfig('fpd.context'), 'keywords') || null
  });

  if (configKeywords.length) {
    pageKeywords = (pageKeywords || []).concat(configKeywords);
  }

  if (pageKeywords && pageKeywords.length > 0) {
    pageKeywords.forEach(deleteValues);
  }

  var payload = {
    auids: auids.join(','),
    sizes: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getKeys"](sizeMap).join(','),
    r: reqId,
    wrapperType: 'Prebid_js',
    wrapperVersion: "4.2.0"
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

    if (bidderRequest.uspConsent) {
      payload.us_privacy = bidderRequest.uspConsent;
    }
  }

  return {
    method: 'GET',
    url: ENDPOINT_URL,
    data: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseQueryStringParameters"](payload).replace(/\&$/, ''),
    bidsMap: bidsMap
  };
}

function buildNewRequest(validBidRequests, bidderRequest) {
  var pageKeywords = null;
  var jwpseg = null;
  var content = null;
  var schain = null;
  var userId = null;
  var user = null;
  var userExt = null;
  var bidderRequestId = bidderRequest.bidderRequestId,
      auctionId = bidderRequest.auctionId,
      gdprConsent = bidderRequest.gdprConsent,
      uspConsent = bidderRequest.uspConsent,
      timeout = bidderRequest.timeout,
      refererInfo = bidderRequest.refererInfo;
  var referer = refererInfo ? encodeURIComponent(refererInfo.referer) : '';
  var imp = [];
  var bidsMap = {};
  validBidRequests.forEach(function (bid) {
    if (!bidderRequestId) {
      bidderRequestId = bid.bidderRequestId;
    }

    if (!auctionId) {
      auctionId = bid.auctionId;
    }

    if (!schain) {
      schain = bid.schain;
    }

    if (!userId) {
      userId = bid.userId;
    }

    var _bid$params = bid.params,
        uid = _bid$params.uid,
        keywords = _bid$params.keywords,
        mediaTypes = bid.mediaTypes,
        bidId = bid.bidId,
        adUnitCode = bid.adUnitCode,
        realTimeData = bid.realTimeData;
    bidsMap[bidId] = bid;

    if (!pageKeywords && !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](keywords)) {
      pageKeywords = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["transformBidderParamKeywords"](keywords);
    }

    if (realTimeData && realTimeData.jwTargeting) {
      if (!jwpseg && realTimeData.jwTargeting.segments) {
        jwpseg = realTimeData.segments;
      }

      if (!content && realTimeData.content) {
        content = realTimeData.content;
      }
    }

    var impObj = {
      id: bidId,
      tagid: uid.toString(),
      ext: {
        divid: adUnitCode
      }
    };

    if (!mediaTypes || mediaTypes[__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */]]) {
      var banner = createBannerRequest(bid, mediaTypes ? mediaTypes[__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */]] : {});

      if (banner) {
        impObj.banner = banner;
      }
    }

    if (mediaTypes && mediaTypes[__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */]]) {
      var video = createVideoRequest(bid, mediaTypes[__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */]]);

      if (video) {
        impObj.video = video;
      }
    }

    if (impObj.banner || impObj.video) {
      imp.push(impObj);
    }
  });
  var source = {
    tid: auctionId,
    ext: {
      wrapper: 'Prebid_js',
      wrapper_version: "4.2.0"
    }
  };

  if (schain) {
    source.ext.schain = schain;
  }

  var tmax = __WEBPACK_IMPORTED_MODULE_4__src_config_js__["b" /* config */].getConfig('bidderTimeout') || timeout;
  var request = {
    id: bidderRequestId,
    site: {
      page: referer
    },
    tmax: tmax,
    source: source,
    imp: imp
  };

  if (content) {
    request.site.content = content;
  }

  if (jwpseg && jwpseg.length) {
    user = {
      data: [{
        name: 'iow_labs_pub_data',
        segment: jwpseg.map(function (seg) {
          return {
            name: 'jwpseg',
            value: seg
          };
        })
      }]
    };
  }

  if (gdprConsent && gdprConsent.consentString) {
    userExt = {
      consent: gdprConsent.consentString
    };
  }

  if (userId) {
    userExt = userExt || {};

    if (userId.tdid) {
      userExt.unifiedid = userId.tdid;
    }

    if (userId.id5id) {
      userExt.id5id = userId.id5id;
    }

    if (userId.digitrustid && userId.digitrustid.data && userId.digitrustid.data.id) {
      userExt.digitrustid = userId.digitrustid.data.id;
    }

    if (userId.lipb && userId.lipb.lipbid) {
      userExt.liveintentid = userId.lipb.lipbid;
    }
  }

  if (userExt && Object.keys(userExt).length) {
    user = user || {};
    user.ext = userExt;
  }

  if (user) {
    request.user = user;
  }

  var configKeywords = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["transformBidderParamKeywords"]({
    'user': __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](__WEBPACK_IMPORTED_MODULE_4__src_config_js__["b" /* config */].getConfig('fpd.user'), 'keywords') || null,
    'context': __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](__WEBPACK_IMPORTED_MODULE_4__src_config_js__["b" /* config */].getConfig('fpd.context'), 'keywords') || null
  });

  if (configKeywords.length) {
    pageKeywords = (pageKeywords || []).concat(configKeywords);
  }

  if (pageKeywords && pageKeywords.length > 0) {
    pageKeywords.forEach(deleteValues);
  }

  if (pageKeywords) {
    request.ext = {
      keywords: pageKeywords
    };
  }

  if (gdprConsent && gdprConsent.gdprApplies) {
    request.regs = {
      ext: {
        gdpr: gdprConsent.gdprApplies ? 1 : 0
      }
    };
  }

  if (uspConsent) {
    if (!request.regs) {
      request.regs = {
        ext: {}
      };
    }

    request.regs.ext.us_privacy = uspConsent;
  }

  return {
    method: 'POST',
    url: NEW_ENDPOINT_URL,
    data: JSON.stringify(request),
    newFormat: true,
    bidsMap: bidsMap
  };
}

function createVideoRequest(bid, mediaType) {
  var playerSize = mediaType.playerSize,
      mimes = mediaType.mimes,
      durationRangeSec = mediaType.durationRangeSec;
  var size = (playerSize || bid.sizes || [])[0];
  if (!size) return;
  var result = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseGPTSingleSizeArrayToRtbSize"](size);

  if (mimes) {
    result.mimes = mimes;
  }

  if (durationRangeSec && durationRangeSec.length === 2) {
    result.minduration = durationRangeSec[0];
    result.maxduration = durationRangeSec[1];
  }

  return result;
}

function createBannerRequest(bid, mediaType) {
  var sizes = mediaType.sizes || bid.sizes;
  if (!sizes || !sizes.length) return;
  var format = sizes.map(function (size) {
    return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseGPTSingleSizeArrayToRtbSize"](size);
  });
  var result = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseGPTSingleSizeArrayToRtbSize"](sizes[0]);

  if (format.length) {
    result.format = format;
  }

  return result;
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

},[432]);