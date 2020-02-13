pbjsChunk([77],{

/***/ 596:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(597);


/***/ }),

/***/ 597:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);


var BIDDER_CODE = 'supply2';
var ENDPOINT_URL = '//pool.supply2.com/hb';
var TIME_TO_LIVE = 360;
var ADAPTER_SYNC_URL = '//pool.supply2.com/push_sync';
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
   * @param {bidderRequest} bidderRequest - bidder request object
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var auids = [];
    var bidsMap = {};
    var bids = validBidRequests || [];
    var priceType = 'net';
    var reqId;
    bids.forEach(function (bid) {
      if (bid.params.priceType === 'gross') {
        priceType = 'gross';
      }

      reqId = bid.bidderRequestId;

      if (!bidsMap[bid.params.uid]) {
        bidsMap[bid.params.uid] = [bid];
        auids.push(bid.params.uid);
      } else {
        bidsMap[bid.params.uid].push(bid);
      }
    });
    var payload = {
      u: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"](),
      pt: priceType,
      auids: auids.join(','),
      r: reqId
    };

    if (bidderRequest) {
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
        _addBidResponse(_getBidFromResponse(respItem), bidsMap, priceType, bidResponses);
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

function _addBidResponse(serverBid, bidsMap, priceType, bidResponses) {
  if (!serverBid) return;
  var errorMessage;
  if (!serverBid.auid) errorMessage = LOG_ERROR_MESS.noAuid + JSON.stringify(serverBid);
  if (!serverBid.adm) errorMessage = LOG_ERROR_MESS.noAdm + JSON.stringify(serverBid);else {
    var awaitingBids = bidsMap[serverBid.auid];

    if (awaitingBids) {
      awaitingBids.forEach(function (bid) {
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
          ad: serverBid.adm,
          dealId: serverBid.dealid
        };
        bidResponses.push(bidResponse);
      });
    } else {
      errorMessage = LOG_ERROR_MESS.noPlacementCode + serverBid.auid;
    }
  }

  if (errorMessage) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](errorMessage);
  }
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[596]);