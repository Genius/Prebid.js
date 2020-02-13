pbjsChunk([67],{

/***/ 616:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(617);


/***/ }),

/***/ 617:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tripleliftAdapterSpec", function() { return tripleliftAdapterSpec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils__ = __webpack_require__(0);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }




var BIDDER_CODE = 'triplelift';
var STR_ENDPOINT = 'https://tlx.3lift.com/header/auction?';
var gdprApplies = true;
var consentString = null;
var tripleliftAdapterSpec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_0__src_mediaTypes__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return typeof bid.params.inventoryCode !== 'undefined';
  },
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var tlCall = STR_ENDPOINT;

    var data = _buildPostBody(bidRequests);

    tlCall = __WEBPACK_IMPORTED_MODULE_2__src_utils__["tryAppendQueryString"](tlCall, 'lib', 'prebid');
    tlCall = __WEBPACK_IMPORTED_MODULE_2__src_utils__["tryAppendQueryString"](tlCall, 'v', "2.37.0");

    if (bidderRequest && bidderRequest.refererInfo) {
      var referrer = bidderRequest.refererInfo.referer;
      tlCall = __WEBPACK_IMPORTED_MODULE_2__src_utils__["tryAppendQueryString"](tlCall, 'referrer', referrer);
    }

    if (bidderRequest && bidderRequest.timeout) {
      tlCall = __WEBPACK_IMPORTED_MODULE_2__src_utils__["tryAppendQueryString"](tlCall, 'tmax', bidderRequest.timeout);
    }

    if (bidderRequest && bidderRequest.gdprConsent) {
      if (typeof bidderRequest.gdprConsent.gdprApplies !== 'undefined') {
        gdprApplies = bidderRequest.gdprConsent.gdprApplies;
        tlCall = __WEBPACK_IMPORTED_MODULE_2__src_utils__["tryAppendQueryString"](tlCall, 'gdpr', gdprApplies.toString());
      }

      if (typeof bidderRequest.gdprConsent.consentString !== 'undefined') {
        consentString = bidderRequest.gdprConsent.consentString;
        tlCall = __WEBPACK_IMPORTED_MODULE_2__src_utils__["tryAppendQueryString"](tlCall, 'cmp_cs', consentString);
      }
    }

    if (tlCall.lastIndexOf('&') === tlCall.length - 1) {
      tlCall = tlCall.substring(0, tlCall.length - 1);
    }

    __WEBPACK_IMPORTED_MODULE_2__src_utils__["logMessage"]('tlCall request built: ' + tlCall);
    return {
      method: 'POST',
      url: tlCall,
      data: data,
      bidderRequest: bidderRequest
    };
  },
  interpretResponse: function interpretResponse(serverResponse, _ref) {
    var bidderRequest = _ref.bidderRequest;
    var bids = serverResponse.body.bids || [];
    return bids.map(function (bid) {
      return _buildResponseObject(bidderRequest, bid);
    });
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    var ibCall = '//ib.3lift.com/sync?';

    if (consentString !== null) {
      ibCall = __WEBPACK_IMPORTED_MODULE_2__src_utils__["tryAppendQueryString"](ibCall, 'gdpr', gdprApplies);
      ibCall = __WEBPACK_IMPORTED_MODULE_2__src_utils__["tryAppendQueryString"](ibCall, 'cmp_cs', consentString);
    }

    if (syncOptions.iframeEnabled) {
      return [{
        type: 'iframe',
        url: ibCall
      }];
    }
  }
};

function _buildPostBody(bidRequests) {
  var data = {};
  data.imp = bidRequests.map(function (bid, index) {
    return {
      id: index,
      tagid: bid.params.inventoryCode,
      floor: bid.params.floor,
      banner: {
        format: _sizes(bid.sizes)
      }
    };
  });
  var eids = [].concat(_toConsumableArray(getUnifiedIdEids(bidRequests)), _toConsumableArray(getIdentityLinkEids(bidRequests)));

  if (eids.length > 0) {
    data.user = {
      ext: {
        eids: eids
      }
    };
  }

  return data;
}

function getUnifiedIdEids(bidRequests) {
  return getEids(bidRequests, 'tdid', 'adserver.org', 'TDID');
}

function getIdentityLinkEids(bidRequests) {
  return getEids(bidRequests, 'idl_env', 'liveramp.com', 'idl');
}

function getEids(bidRequests, type, source, rtiPartner) {
  return bidRequests.map(getUserId(type)) // bids -> userIds of a certain type
  .filter(function (x) {
    return !!x;
  }) // filter out null userIds
  .map(formatEid(source, rtiPartner)); // userIds -> eid objects
}

function getUserId(type) {
  return function (bid) {
    return bid && bid.userId && bid.userId[type];
  };
}

function formatEid(source, rtiPartner) {
  return function (id) {
    return {
      source: source,
      uids: [{
        id: id,
        ext: {
          rtiPartner: rtiPartner
        }
      }]
    };
  };
}

function _sizes(sizeArray) {
  var sizes = sizeArray.filter(_isValidSize);
  return sizes.map(function (size) {
    return {
      w: size[0],
      h: size[1]
    };
  });
}

function _isValidSize(size) {
  return size.length === 2 && typeof size[0] === 'number' && typeof size[1] === 'number';
}

function _buildResponseObject(bidderRequest, bid) {
  var bidResponse = {};
  var width = bid.width || 1;
  var height = bid.height || 1;
  var dealId = bid.deal_id || '';
  var creativeId = bid.crid || '';

  if (bid.cpm != 0 && bid.ad) {
    bidResponse = {
      requestId: bidderRequest.bids[bid.imp_id].bidId,
      cpm: bid.cpm,
      width: width,
      height: height,
      netRevenue: true,
      ad: bid.ad,
      creativeId: creativeId,
      dealId: dealId,
      currency: 'USD',
      ttl: 33
    };
  }

  ;
  return bidResponse;
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(tripleliftAdapterSpec);

/***/ })

},[616]);