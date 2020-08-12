pbjsChunk([42],{

/***/ 526:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(527);


/***/ }),

/***/ 527:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URL", function() { return URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var URL = 'https://prebid.cootlogix.com';
var BIDDER_CODE = 'vidazoo';
var CURRENCY = 'USD';
var TTL_SECONDS = 60 * 5;
var INTERNAL_SYNC_TYPE = {
  IFRAME: 'iframe',
  IMAGE: 'img'
};
var EXTERNAL_SYNC_TYPE = {
  IFRAME: 'iframe',
  IMAGE: 'image'
};

function isBidRequestValid(bid) {
  var params = bid.params || {};
  return !!(params.cId && params.pId);
}

function buildRequest(bid, topWindowUrl, size, bidderRequest) {
  var params = bid.params,
      bidId = bid.bidId;
  var bidFloor = params.bidFloor,
      cId = params.cId,
      pId = params.pId,
      ext = params.ext; // Prebid's util function returns AppNexus style sizes (i.e. 300x250)

  var _size$split = size.split('x'),
      _size$split2 = _slicedToArray(_size$split, 2),
      width = _size$split2[0],
      height = _size$split2[1];

  var dto = {
    method: 'GET',
    url: "".concat(URL, "/prebid/").concat(cId),
    data: {
      url: encodeURIComponent(topWindowUrl),
      cb: Date.now(),
      bidFloor: bidFloor,
      bidId: bidId,
      publisherId: pId,
      consent: bidderRequest.gdprConsent && bidderRequest.gdprConsent.consentString,
      width: width,
      height: height
    }
  };

  __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](ext, function (value, key) {
    dto.data['ext.' + key] = value;
  });

  return dto;
}

function buildRequests(validBidRequests, bidderRequest) {
  var topWindowUrl = bidderRequest.refererInfo.referer;
  var requests = [];
  validBidRequests.forEach(function (validBidRequest) {
    var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](validBidRequest.sizes);
    sizes.forEach(function (size) {
      var request = buildRequest(validBidRequest, topWindowUrl, size, bidderRequest);
      requests.push(request);
    });
  });
  return requests;
}

function interpretResponse(serverResponse, request) {
  if (!serverResponse || !serverResponse.body) {
    return [];
  }

  var _serverResponse$body = serverResponse.body,
      creativeId = _serverResponse$body.creativeId,
      ad = _serverResponse$body.ad,
      price = _serverResponse$body.price,
      exp = _serverResponse$body.exp;

  if (!ad || !price) {
    return [];
  }

  var _request$data = request.data,
      bidId = _request$data.bidId,
      width = _request$data.width,
      height = _request$data.height;

  try {
    return [{
      requestId: bidId,
      cpm: price,
      width: width,
      height: height,
      creativeId: creativeId,
      currency: CURRENCY,
      netRevenue: true,
      ttl: exp || TTL_SECONDS,
      ad: ad
    }];
  } catch (e) {
    return [];
  }
}

function getUserSyncs(syncOptions, responses) {
  var iframeEnabled = syncOptions.iframeEnabled,
      pixelEnabled = syncOptions.pixelEnabled;

  if (iframeEnabled) {
    return [{
      type: 'iframe',
      url: 'https://static.cootlogix.com/basev/sync/user_sync.html'
    }];
  }

  if (pixelEnabled) {
    var lookup = {};
    var syncs = [];
    responses.forEach(function (response) {
      var body = response.body;
      var cookies = body ? body.cookies || [] : [];
      cookies.forEach(function (cookie) {
        switch (cookie.type) {
          case INTERNAL_SYNC_TYPE.IFRAME:
            break;

          case INTERNAL_SYNC_TYPE.IMAGE:
            if (pixelEnabled && !lookup[cookie.src]) {
              syncs.push({
                type: EXTERNAL_SYNC_TYPE.IMAGE,
                url: cookie.src
              });
            }

            break;
        }
      });
    });
    return syncs;
  }

  return [];
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */]],
  isBidRequestValid: isBidRequestValid,
  buildRequests: buildRequests,
  interpretResponse: interpretResponse,
  getUserSyncs: getUserSyncs
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[526]);