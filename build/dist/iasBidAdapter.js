pbjsChunk([138],{

/***/ 290:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(291);


/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var BIDDER_CODE = 'ias';
var otherBidIds = [];

function isBidRequestValid(bid) {
  var _bid$params = bid.params,
      pubId = _bid$params.pubId,
      adUnitPath = _bid$params.adUnitPath;
  return !!(pubId && adUnitPath);
}
/**
 * Converts GPT-style size array into a string
 * @param  {Array} sizes:  list of GPT-style sizes, e.g. [[300, 250], [300, 300]]
 * @return {String} a string containing sizes, e.g. '[300.250,300.300]'
 */


function stringifySlotSizes(sizes) {
  var result = '';

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](sizes)) {
    result = sizes.reduce(function (acc, size) {
      acc.push(size.join('.'));
      return acc;
    }, []);
    result = '[' + result.join(',') + ']';
  }

  return result;
}

function stringifySlot(bidRequest) {
  var id = bidRequest.adUnitCode;
  var ss = stringifySlotSizes(bidRequest.sizes);
  var p = bidRequest.params.adUnitPath;
  var slot = {
    id: id,
    ss: ss,
    p: p
  };
  var keyValues = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getKeys"](slot).map(function (key) {
    return [key, slot[key]].join(':');
  });
  return '{' + keyValues.join(',') + '}';
}

function stringifyWindowSize() {
  return [window.innerWidth || -1, window.innerHeight || -1].join('.');
}

function stringifyScreenSize() {
  return [window.screen && window.screen.width || -1, window.screen && window.screen.height || -1].join('.');
}

function buildRequests(bidRequests) {
  var IAS_HOST = 'https://pixel.adsafeprotected.com/services/pub';
  var anId = bidRequests[0].params.pubId;
  var queries = [];
  queries.push(['anId', anId]);
  queries = queries.concat(bidRequests.reduce(function (acc, request) {
    acc.push(['slot', stringifySlot(request)]);
    return acc;
  }, []));
  queries.push(['wr', stringifyWindowSize()]);
  queries.push(['sr', stringifyScreenSize()]);
  queries.push(['url', encodeURIComponent(window.location.href)]);
  var queryString = encodeURI(queries.map(function (qs) {
    return qs.join('=');
  }).join('&'));
  bidRequests.forEach(function (request) {
    if (bidRequests[0].bidId != request.bidId) {
      otherBidIds.push(request.bidId);
    }
  });
  return {
    method: 'GET',
    url: IAS_HOST,
    data: queryString,
    bidRequest: bidRequests[0]
  };
}

function getPageLevelKeywords(response) {
  var result = {};
  shallowMerge(result, response.brandSafety);
  result.fr = response.fr;
  result.custom = response.custom;
  return result;
}

function shallowMerge(dest, src) {
  __WEBPACK_IMPORTED_MODULE_0__src_utils__["getKeys"](src).reduce(function (dest, srcKey) {
    dest[srcKey] = src[srcKey];
    return dest;
  }, dest);
}

function interpretResponse(serverResponse, request) {
  var iasResponse = serverResponse.body;
  var bidResponses = []; // Keys in common bid response are not used;
  // Necessary to get around with prebid's common bid response check

  var commonBidResponse = {
    requestId: request.bidRequest.bidId,
    cpm: 0.01,
    width: 100,
    height: 200,
    creativeId: 434,
    dealId: 42,
    currency: 'USD',
    netRevenue: true,
    ttl: 360
  };
  shallowMerge(commonBidResponse, getPageLevelKeywords(iasResponse));
  commonBidResponse.slots = iasResponse.slots;
  bidResponses.push(commonBidResponse);
  otherBidIds.forEach(function (bidId) {
    var otherResponse = _extends({}, commonBidResponse);

    otherResponse.requestId = bidId;
    bidResponses.push(otherResponse);
  });
  return bidResponses;
}

var spec = {
  code: BIDDER_CODE,
  aliases: [],
  isBidRequestValid: isBidRequestValid,
  buildRequests: buildRequests,
  interpretResponse: interpretResponse
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[290]);