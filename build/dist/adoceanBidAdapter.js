pbjsChunk([302],{

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(212);


/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);


var BIDDER_CODE = 'adocean';

function buildEndpointUrl(emiter, payloadMap) {
  var payload = [];

  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](payloadMap, function (v, k) {
    payload.push(k + '=' + encodeURIComponent(v));
  });

  var randomizedPart = Math.random().toString().slice(2);
  return 'https://' + emiter + '/_' + randomizedPart + '/ad.json?' + payload.join('&');
}

function buildRequest(masterBidRequests, masterId, gdprConsent) {
  var emiter;
  var payload = {
    id: masterId,
    aosspsizes: []
  };

  if (gdprConsent) {
    payload.gdpr_consent = gdprConsent.consentString || undefined;
    payload.gdpr = gdprConsent.gdprApplies ? 1 : 0;
  }

  var bidIdMap = {};

  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](masterBidRequests, function (bid, slaveId) {
    if (!emiter) {
      emiter = bid.params.emiter;
    }

    var slaveSizes = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](bid.mediaTypes.banner.sizes).join('_');
    var rawSlaveId = bid.params.slaveId.replace('adocean', '');
    payload.aosspsizes.push(rawSlaveId + '~' + slaveSizes);
    bidIdMap[slaveId] = bid.bidId;
  });

  payload.aosspsizes = payload.aosspsizes.join('-');
  return {
    method: 'GET',
    url: buildEndpointUrl(emiter, payload),
    data: '',
    bidIdMap: bidIdMap
  };
}

function assignToMaster(bidRequest, bidRequestsByMaster) {
  var masterId = bidRequest.params.masterId;
  var slaveId = bidRequest.params.slaveId;
  var masterBidRequests = bidRequestsByMaster[masterId] = bidRequestsByMaster[masterId] || [{}];
  var i = 0;

  while (masterBidRequests[i] && masterBidRequests[i][slaveId]) {
    i++;
  }

  if (!masterBidRequests[i]) {
    masterBidRequests[i] = {};
  }

  masterBidRequests[i][slaveId] = bidRequest;
}

function _interpretResponse(placementResponse, bidRequest, bids) {
  var requestId = bidRequest.bidIdMap[placementResponse.id];

  if (!placementResponse.error && requestId) {
    var adCode = '<script type="application/javascript">(function(){var wu="' + (placementResponse.winUrl || '') + '",su="' + (placementResponse.statsUrl || '') + '".replace(/\\[TIMESTAMP\\]/,(new Date()).getTime());';
    adCode += 'if(navigator.sendBeacon){if(wu){navigator.sendBeacon(wu)||((new Image(1,1)).src=wu)};if(su){navigator.sendBeacon(su)||((new Image(1,1)).src=su)}}';
    adCode += 'else{if(wu){(new Image(1,1)).src=wu;}if(su){(new Image(1,1)).src=su;}}';
    adCode += '})();<\/script>';
    adCode += decodeURIComponent(placementResponse.code);
    var bid = {
      ad: adCode,
      cpm: parseFloat(placementResponse.price),
      currency: placementResponse.currency,
      height: parseInt(placementResponse.height, 10),
      requestId: requestId,
      width: parseInt(placementResponse.width, 10),
      netRevenue: false,
      ttl: parseInt(placementResponse.ttl),
      creativeId: placementResponse.crid
    };
    bids.push(bid);
  }
}

var spec = {
  code: BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    var requiredParams = ['slaveId', 'masterId', 'emiter'];

    if (requiredParams.some(function (name) {
      return !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](bid.params[name]) || !bid.params[name].length;
    })) {
      return false;
    }

    return !!bid.mediaTypes.banner;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var bidRequestsByMaster = {};
    var requests = [];

    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](validBidRequests, function (bidRequest) {
      assignToMaster(bidRequest, bidRequestsByMaster);
    });

    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](bidRequestsByMaster, function (masterRequests, masterId) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](masterRequests, function (instanceRequests) {
        requests.push(buildRequest(instanceRequests, masterId, bidderRequest.gdprConsent));
      });
    });

    return requests;
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bids = [];

    if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](serverResponse.body)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](serverResponse.body, function (placementResponse) {
        _interpretResponse(placementResponse, bidRequest, bids);
      });
    }

    return bids;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[211]);