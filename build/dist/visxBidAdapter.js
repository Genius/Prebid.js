pbjsChunk([52],{

/***/ 650:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(651);


/***/ }),

/***/ 651:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config__ = __webpack_require__(3);



var BIDDER_CODE = 'visx';
var ENDPOINT_URL = '//t.visx.net/hb';
var TIME_TO_LIVE = 360;
var DEFAULT_CUR = 'EUR';
var ADAPTER_SYNC_URL = '//t.visx.net/push_sync';
var LOG_ERROR_MESS = {
  noAuid: 'Bid from response has no auid parameter - ',
  noAdm: 'Bid from response has no adm parameter - ',
  noBid: 'Array of bid objects is empty',
  noPlacementCode: 'Can\'t find in requested bids the bid with auid - ',
  emptyUids: 'Uids should not be empty',
  emptySeatbid: 'Seatbid array from response has an empty item',
  emptyResponse: 'Response is empty',
  hasEmptySeatbidArray: 'Response has empty seatbid array',
  hasNoArrayOfBids: 'Seatbid from response has no array of bid objects - ',
  notAllowedCurrency: 'Currency is not supported - ',
  currencyMismatch: 'Currency from the request is not match currency from the response - '
};
var currencyWhiteList = ['EUR', 'USD', 'GBP', 'PLN'];
var spec = {
  code: BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.uid;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var auids = [];
    var bidsMap = {};
    var slotsMapByUid = {};
    var sizeMap = {};
    var bids = validBidRequests || [];
    var currency = __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig("currency.bidderCurrencyDefault.".concat(BIDDER_CODE)) || __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('currency.adServerCurrency') || DEFAULT_CUR;
    var reqId;

    if (currencyWhiteList.indexOf(currency) === -1) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](LOG_ERROR_MESS.notAllowedCurrency + currency);
      return;
    }

    bids.forEach(function (bid) {
      reqId = bid.bidderRequestId;
      var uid = bid.params.uid,
          adUnitCode = bid.adUnitCode;
      auids.push(uid);
      var sizesId = __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](bid.sizes);

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
      pt: 'net',
      auids: auids.join(','),
      sizes: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getKeys"](sizeMap).join(','),
      r: reqId,
      cur: currency,
      wrapperType: 'Prebid_js',
      wrapperVersion: "2.37.0"
    };

    if (bidderRequest) {
      if (bidderRequest.refererInfo && bidderRequest.refererInfo.referer) {
        payload.u = bidderRequest.refererInfo.referer;
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
      data: payload,
      bidsMap: bidsMap
    };
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    serverResponse = serverResponse && serverResponse.body;
    var bidResponses = [];
    var bidsWithoutSizeMatching = [];
    var bidsMap = bidRequest.bidsMap;
    var currency = bidRequest.data.cur;
    var errorMessage;
    if (!serverResponse) errorMessage = LOG_ERROR_MESS.emptyResponse;else if (serverResponse.seatbid && !serverResponse.seatbid.length) {
      errorMessage = LOG_ERROR_MESS.hasEmptySeatbidArray;
    }

    if (!errorMessage && serverResponse.seatbid) {
      serverResponse.seatbid.forEach(function (respItem) {
        _addBidResponse(_getBidFromResponse(respItem), bidsMap, currency, bidResponses, bidsWithoutSizeMatching);
      });
      bidsWithoutSizeMatching.forEach(function (serverBid) {
        _addBidResponse(serverBid, bidsMap, currency, bidResponses);
      });
    }

    if (errorMessage) __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](errorMessage);
    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses, gdprConsent) {
    if (syncOptions.pixelEnabled) {
      var query = [];

      if (gdprConsent) {
        if (gdprConsent.consentString) {
          query.push('gdpr_consent=' + encodeURIComponent(gdprConsent.consentString));
        }

        query.push('gdpr_applies=' + encodeURIComponent(typeof gdprConsent.gdprApplies === 'boolean' ? Number(gdprConsent.gdprApplies) : 1));
      }

      return [{
        type: 'image',
        url: ADAPTER_SYNC_URL + (query.length ? '?' + query.join('&') : '')
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

function _addBidResponse(serverBid, bidsMap, currency, bidResponses, bidsWithoutSizeMatching) {
  if (!serverBid) return;
  var errorMessage;
  if (!serverBid.auid) errorMessage = LOG_ERROR_MESS.noAuid + JSON.stringify(serverBid);
  if (!serverBid.adm) errorMessage = LOG_ERROR_MESS.noAdm + JSON.stringify(serverBid);else {
    var reqCurrency = currency || DEFAULT_CUR;
    var awaitingBids = bidsMap[serverBid.auid];

    if (awaitingBids) {
      if (serverBid.cur && serverBid.cur !== reqCurrency) {
        errorMessage = LOG_ERROR_MESS.currencyMismatch + reqCurrency + ' - ' + serverBid.cur;
      } else {
        var sizeId = bidsWithoutSizeMatching ? "".concat(serverBid.w, "x").concat(serverBid.h) : Object.keys(awaitingBids)[0];

        if (awaitingBids[sizeId]) {
          var slot = awaitingBids[sizeId][0];
          var bid = slot.bids.shift();
          bidResponses.push({
            requestId: bid.bidId,
            bidderCode: spec.code,
            cpm: serverBid.price,
            width: serverBid.w,
            height: serverBid.h,
            creativeId: serverBid.auid,
            currency: reqCurrency,
            netRevenue: true,
            ttl: TIME_TO_LIVE,
            ad: serverBid.adm,
            dealId: serverBid.dealid
          });

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
        } else {
          bidsWithoutSizeMatching && bidsWithoutSizeMatching.push(serverBid);
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

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[650]);