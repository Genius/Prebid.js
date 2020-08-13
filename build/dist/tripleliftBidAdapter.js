pbjsChunk([80],{

/***/ 754:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(755);


/***/ }),

/***/ 755:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tripleliftAdapterSpec", function() { return tripleliftAdapterSpec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_config_js__ = __webpack_require__(3);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





var BIDDER_CODE = 'triplelift';
var STR_ENDPOINT = 'https://tlx.3lift.com/header/auction?';
var gdprApplies = true;
var consentString = null;
var tripleliftAdapterSpec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_0__src_mediaTypes_js__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return typeof bid.params.inventoryCode !== 'undefined';
  },
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var tlCall = STR_ENDPOINT;

    var data = _buildPostBody(bidRequests);

    tlCall = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["tryAppendQueryString"](tlCall, 'lib', 'prebid');
    tlCall = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["tryAppendQueryString"](tlCall, 'v', "4.2.0");

    if (bidderRequest && bidderRequest.refererInfo) {
      var referrer = bidderRequest.refererInfo.referer;
      tlCall = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["tryAppendQueryString"](tlCall, 'referrer', referrer);
    }

    if (bidderRequest && bidderRequest.timeout) {
      tlCall = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["tryAppendQueryString"](tlCall, 'tmax', bidderRequest.timeout);
    }

    if (bidderRequest && bidderRequest.gdprConsent) {
      if (typeof bidderRequest.gdprConsent.gdprApplies !== 'undefined') {
        gdprApplies = bidderRequest.gdprConsent.gdprApplies;
        tlCall = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["tryAppendQueryString"](tlCall, 'gdpr', gdprApplies.toString());
      }

      if (typeof bidderRequest.gdprConsent.consentString !== 'undefined') {
        consentString = bidderRequest.gdprConsent.consentString;
        tlCall = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["tryAppendQueryString"](tlCall, 'cmp_cs', consentString);
      }
    }

    if (bidderRequest && bidderRequest.uspConsent) {
      tlCall = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["tryAppendQueryString"](tlCall, 'us_privacy', bidderRequest.uspConsent);
    }

    if (__WEBPACK_IMPORTED_MODULE_3__src_config_js__["b" /* config */].getConfig('coppa') === true) {
      tlCall = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["tryAppendQueryString"](tlCall, 'coppa', true);
    }

    if (tlCall.lastIndexOf('&') === tlCall.length - 1) {
      tlCall = tlCall.substring(0, tlCall.length - 1);
    }

    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logMessage"]('tlCall request built: ' + tlCall);
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
  getUserSyncs: function getUserSyncs(syncOptions, responses, gdprConsent, usPrivacy) {
    var syncType = _getSyncType(syncOptions);

    if (!syncType) return;
    var syncEndpoint = 'https://eb2.3lift.com/sync?';

    if (syncType === 'image') {
      syncEndpoint = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["tryAppendQueryString"](syncEndpoint, 'px', 1);
      syncEndpoint = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["tryAppendQueryString"](syncEndpoint, 'src', 'prebid');
    }

    if (consentString !== null) {
      syncEndpoint = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["tryAppendQueryString"](syncEndpoint, 'gdpr', gdprApplies);
      syncEndpoint = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["tryAppendQueryString"](syncEndpoint, 'cmp_cs', consentString);
    }

    if (usPrivacy) {
      syncEndpoint = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["tryAppendQueryString"](syncEndpoint, 'us_privacy', usPrivacy);
    }

    return [{
      type: syncType,
      url: syncEndpoint
    }];
  }
};

function _getSyncType(syncOptions) {
  if (!syncOptions) return;
  if (syncOptions.iframeEnabled) return 'iframe';
  if (syncOptions.pixelEnabled) return 'image';
}

function _buildPostBody(bidRequests) {
  var data = {};
  var schain = bidRequests[0].schain;
  data.imp = bidRequests.map(function (bid, index) {
    return {
      id: index,
      tagid: bid.params.inventoryCode,
      floor: _getFloor(bid),
      banner: {
        format: _sizes(bid.sizes)
      }
    };
  });
  var eids = [].concat(_toConsumableArray(getUnifiedIdEids(bidRequests)), _toConsumableArray(getIdentityLinkEids(bidRequests)), _toConsumableArray(getCriteoEids(bidRequests)));

  if (eids.length > 0) {
    data.user = {
      ext: {
        eids: eids
      }
    };
  }

  if (schain) {
    data.ext = {
      schain: schain
    };
  }

  return data;
}

function _getFloor(bid) {
  var floor = null;

  if (typeof bid.getFloor === 'function') {
    var floorInfo = bid.getFloor({
      currency: 'USD',
      mediaType: 'banner',
      size: _sizes(bid.sizes)
    });

    if (_typeof(floorInfo) === 'object' && floorInfo.currency === 'USD' && !isNaN(parseFloat(floorInfo.floor))) {
      floor = parseFloat(floorInfo.floor);
    }
  }

  return floor !== null ? floor : bid.params.floor;
}

function getUnifiedIdEids(bidRequests) {
  return getEids(bidRequests, 'tdid', 'adserver.org', 'TDID');
}

function getIdentityLinkEids(bidRequests) {
  return getEids(bidRequests, 'idl_env', 'liveramp.com', 'idl');
}

function getCriteoEids(bidRequests) {
  return getEids(bidRequests, 'criteoId', 'criteo.com', 'criteoId');
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
      ttl: 300,
      tl_source: bid.tl_source
    };
  }

  ;
  return bidResponse;
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(tripleliftAdapterSpec);

/***/ })

},[754]);