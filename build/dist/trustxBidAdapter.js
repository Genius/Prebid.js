pbjsChunk([23],{

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(241);


/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var bidfactory = __webpack_require__(3);
var bidmanager = __webpack_require__(2);
var adloader = __webpack_require__(5);
var adaptermanager = __webpack_require__(1);
var CONSTANTS = __webpack_require__(4);

var TrustxAdapter = function TrustxAdapter() {
  var bidderCode = 'trustx';
  var reqHost = '//sofia.trustx.org';
  var reqPath = '/hb?';
  var LOG_ERROR_MESS = {
    noAuid: 'Bid from response has no auid parameter - ',
    noAdm: 'Bid from response has no adm parameter - ',
    noBid: 'Array of bid objects is empty',
    noPlacementCode: 'Can\'t find placementCode for bid with auid - ',
    havePCodeFor: ', placementCode is available only for the following uids - ',
    emptyUids: 'Uids should be not empty',
    emptySeatbid: 'Seatbid array from response has empty item',
    emptyResponse: 'Response is empty',
    hasEmptySeatbidArray: 'Response has empty seatbid array',
    hasNoArrayOfBids: 'Seatbid from response has no array of bid objects - '
  };

  function _makeHandler(auids, placementMap) {
    var cbName = bidderCode + '_callback_wrapper_' + auids.join('_');
    pbjs[cbName] = function (resp) {
      delete pbjs[cbName];
      _responseProcessing(resp, auids, placementMap);
    };
    return 'pbjs.' + cbName;
  }

  function _sendRequest(auids, placementMap) {
    var query = [];
    var path = reqPath;
    query.push('u=' + encodeURIComponent(location.href));
    query.push('auids=' + encodeURIComponent(auids.join(',')));
    query.push('cb=' + _makeHandler(auids, placementMap));
    query.push('pt=' + (window.globalPrebidTrustxPriceType === 'gross' ? 'gross' : 'net'));

    adloader.loadScript(reqHost + path + query.join('&'));
  }

  function _callBids(params) {
    var auids = [];
    var placementMap = {};
    var hasBid;
    var bid;
    var bids = params.bids || [];
    for (var i = 0; i < bids.length; i++) {
      bid = bids[i];
      if (bid && bid.bidder === bidderCode && bid.placementCode) {
        hasBid = true;
        if (bid.params && bid.params.uid) {
          if (!placementMap[bid.params.uid]) {
            placementMap[bid.params.uid] = [bid.placementCode];
            auids.push(bid.params.uid);
          } else {
            placementMap[bid.params.uid].push(bid.placementCode);
          }
        }
      }
    }

    if (auids.length) {
      _sendRequest(auids, placementMap);
    } else if (hasBid) {
      utils.logError(LOG_ERROR_MESS.emptyUids);
    }
  }

  function _getBidFromResponse(resp) {
    if (!resp) {
      utils.logError(LOG_ERROR_MESS.emptySeatbid);
    } else if (!resp.bid) {
      utils.logError(LOG_ERROR_MESS.hasNoArrayOfBids + JSON.stringify(resp));
    } else if (!resp.bid[0]) {
      utils.logError(LOG_ERROR_MESS.noBid);
    }
    return resp && resp.bid && resp.bid[0];
  }

  function _forEachPlacement(error, bid, placementCode) {
    var bidObject;
    if (error) {
      bidObject = bidfactory.createBid(CONSTANTS.STATUS.NO_BID, bid);
    } else {
      bidObject = bidfactory.createBid(CONSTANTS.STATUS.GOOD, bid);
      bidObject.cpm = bid.price;
      bidObject.ad = bid.adm;
      bidObject.width = bid.w;
      bidObject.height = bid.h;
      if (bid.dealid) {
        bidObject.dealId = bid.dealid;
      }
    }
    bidObject.bidderCode = bidderCode;
    bidmanager.addBidResponse(placementCode, bidObject);
  }

  function _addBidResponse(bid, auids, placementMap) {
    if (!bid) return;
    var errorMessage, placementCodes;
    if (!bid.auid) errorMessage = LOG_ERROR_MESS.noAuid + JSON.stringify(bid);else {
      placementCodes = placementMap.hasOwnProperty(bid.auid) && placementMap[bid.auid];
      if (!placementCodes) {
        errorMessage = LOG_ERROR_MESS.noPlacementCode + bid.auid + LOG_ERROR_MESS.havePCodeFor + auids.join(',');
      }
    }

    if (!errorMessage) {
      if (!bid.adm) errorMessage = LOG_ERROR_MESS.noAdm + JSON.stringify(bid);

      var l = placementCodes.length;
      while (l--) {
        _forEachPlacement(errorMessage, bid, placementCodes[l]);
      }

      delete placementMap[bid.auid];
    }

    if (errorMessage) {
      utils.logError(errorMessage);
    }
  }

  function _responseProcessing(resp, auids, placementMap) {
    var errorMessage;

    if (!resp) errorMessage = LOG_ERROR_MESS.emptyResponse;else if (resp.seatbid && !resp.seatbid.length) errorMessage = LOG_ERROR_MESS.hasEmptySeatbidArray;

    if (!errorMessage) {
      resp = resp.seatbid || [];
      var l = resp.length;
      while (l--) {
        _addBidResponse(_getBidFromResponse(resp[l]), auids, placementMap);
      }
    }

    var n, bidObj;
    for (var auid in placementMap) {
      if (placementMap.hasOwnProperty(auid) && placementMap[auid]) {
        n = placementMap[auid].length;
        while (n--) {
          bidObj = bidfactory.createBid(CONSTANTS.STATUS.NO_BID);
          bidObj.bidderCode = bidderCode;
          bidmanager.addBidResponse(placementMap[auid][n], bidObj);
        }
      }
    }

    if (errorMessage) utils.logError(errorMessage);
  }

  return {
    callBids: _callBids
  };
};

adaptermanager.registerBidAdapter(new TrustxAdapter(), 'trustx');

module.exports = TrustxAdapter;

/***/ })

},[240]);