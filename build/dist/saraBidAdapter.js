pbjsChunk([97],{

/***/ 542:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(543);


/***/ }),

/***/ 543:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);


var BIDDER_CODE = 'sara';
var ENDPOINT_URL = '//ad.sara.media/hb';
var ADAPTER_SYNC_URL = '//ad.sara.media/push_sync';
var TIME_TO_LIVE = 360;
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
/**
 * Dentsu Aegis Network Marketplace Bid Adapter.
 * Contact: niels@baarsma.net
 *
 */

var spec = {
  code: BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.uid;
  },
  buildRequests: function buildRequests(validBidRequests) {
    var auids = [];
    var bidsMap = {};
    var bids = validBidRequests || [];
    var priceType = 'net';
    var reqId;
    bids.forEach(function (bid) {
      if (bid.params.priceType === 'gross') {
        priceType = 'gross';
      }

      if (!bidsMap[bid.params.uid]) {
        bidsMap[bid.params.uid] = [bid];
        auids.push(bid.params.uid);
      } else {
        bidsMap[bid.params.uid].push(bid);
      }

      reqId = bid.bidderRequestId;
    });
    var payload = {
      u: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"](),
      pt: priceType,
      auids: auids.join(','),
      r: reqId
    };
    return {
      method: 'GET',
      url: ENDPOINT_URL,
      data: __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseQueryStringParameters"](payload).replace(/\&$/, ''),
      bidsMap: bidsMap
    };
  },
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

},[542]);