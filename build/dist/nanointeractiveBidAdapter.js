pbjsChunk([142],{

/***/ 429:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(430);


/***/ }),

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIDDER_CODE", function() { return BIDDER_CODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "END_POINT_URL", function() { return END_POINT_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SSP_PLACEMENT_ID", function() { return SSP_PLACEMENT_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NQ", function() { return NQ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NQ_NAME", function() { return NQ_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CATEGORY", function() { return CATEGORY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CATEGORY_NAME", function() { return CATEGORY_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SUB_ID", function() { return SUB_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REF", function() { return REF; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOCATION", function() { return LOCATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__ = __webpack_require__(1);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var BIDDER_CODE = 'nanointeractive';
var END_POINT_URL = 'https://ad.audiencemanager.de';
var SSP_PLACEMENT_ID = 'pid';
var NQ = 'nq';
var NQ_NAME = 'name';
var CATEGORY = 'category';
var CATEGORY_NAME = 'categoryName';
var SUB_ID = 'subId';
var REF = 'ref';
var LOCATION = 'loc';
var spec = {
  code: BIDDER_CODE,
  aliases: ['ni'],
  isBidRequestValid: function isBidRequestValid(bid) {
    var pid = bid.params[SSP_PLACEMENT_ID];
    return !!pid;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var payload = [];
    validBidRequests.forEach(function (bid) {
      return payload.push(createSingleBidRequest(bid, bidderRequest));
    });
    var url = getEndpointUrl('main') + '/hb';
    return {
      method: 'POST',
      url: url,
      data: JSON.stringify(payload)
    };
  },
  interpretResponse: function interpretResponse(serverResponse) {
    var bids = [];
    serverResponse.body.forEach(function (serverBid) {
      if (isEngineResponseValid(serverBid)) {
        bids.push(createSingleBidResponse(serverBid));
      }
    });
    return bids;
  }
};

function createSingleBidRequest(bid, bidderRequest) {
  var _data;

  var location = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidderRequest, 'refererInfo.referer');
  var origin = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getOrigin"]();
  var data = (_data = {}, _defineProperty(_data, SSP_PLACEMENT_ID, bid.params[SSP_PLACEMENT_ID]), _defineProperty(_data, NQ, [createNqParam(bid)]), _defineProperty(_data, CATEGORY, [createCategoryParam(bid)]), _defineProperty(_data, SUB_ID, createSubIdParam(bid)), _defineProperty(_data, REF, createRefParam()), _defineProperty(_data, "sizes", bid.sizes.map(function (value) {
    return value[0] + 'x' + value[1];
  })), _defineProperty(_data, "bidId", bid.bidId), _defineProperty(_data, "cors", origin), _defineProperty(_data, LOCATION, location), _defineProperty(_data, "lsUserId", getLsUserId()), _data);

  if (bidderRequest && bidderRequest.gdprConsent) {
    data['gdprConsent'] = bidderRequest.gdprConsent.consentString;
    data['gdprApplies'] = bidderRequest.gdprConsent.gdprApplies ? '1' : '0';
  }

  return data;
}

function createSingleBidResponse(serverBid) {
  if (serverBid.userId) {
    localStorage.setItem('lsUserId', serverBid.userId);
  }

  return {
    requestId: serverBid.id,
    cpm: serverBid.cpm,
    width: serverBid.width,
    height: serverBid.height,
    ad: serverBid.ad,
    ttl: serverBid.ttl,
    creativeId: serverBid.creativeId,
    netRevenue: serverBid.netRevenue || true,
    currency: serverBid.currency
  };
}

function createNqParam(bid) {
  return bid.params[NQ_NAME] ? __WEBPACK_IMPORTED_MODULE_0__src_utils__["getParameterByName"](bid.params[NQ_NAME]) : bid.params[NQ] || null;
}

function createCategoryParam(bid) {
  return bid.params[CATEGORY_NAME] ? __WEBPACK_IMPORTED_MODULE_0__src_utils__["getParameterByName"](bid.params[CATEGORY_NAME]) : bid.params[CATEGORY] || null;
}

function createSubIdParam(bid) {
  return bid.params[SUB_ID] || null;
}

function createRefParam() {
  try {
    return window.top.document.referrer;
  } catch (ex) {
    return document.referrer;
  }
}

function isEngineResponseValid(response) {
  return !!response.cpm && !!response.ad;
}
/**
 * Used mainly for debugging
 *
 * @param type
 * @returns string
 */


function getEndpointUrl(type) {
  var nanoConfig = __WEBPACK_IMPORTED_MODULE_1__src_config__["b" /* config */].getConfig('nano');
  return nanoConfig && nanoConfig['endpointUrl'] || END_POINT_URL;
}

function getLsUserId() {
  if (localStorage.getItem('lsUserId') != null) {
    return localStorage.getItem('lsUserId');
  }

  return null;
}

Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[429]);