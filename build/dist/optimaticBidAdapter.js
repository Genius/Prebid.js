pbjsChunk([132],{

/***/ 451:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(452);


/***/ }),

/***/ 452:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ENDPOINT", function() { return ENDPOINT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var ENDPOINT = '//mg-bid.optimatic.com/adrequest/';
var spec = {
  version: '1.0.4',
  code: 'optimatic',
  supportedMediaTypes: ['video'],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid && bid.params && bid.params.placement && bid.params.bidfloor);
  },
  buildRequests: function buildRequests(bids) {
    return bids.map(function (bid) {
      return {
        method: 'POST',
        url: ENDPOINT + bid.params.placement,
        data: getData(bid),
        options: {
          contentType: 'application/json'
        },
        bidRequest: bid
      };
    });
  },
  interpretResponse: function interpretResponse(response, _ref) {
    var bidRequest = _ref.bidRequest;
    var bid;
    var size;
    var bidResponse;

    try {
      response = response.body;
      bid = response.seatbid[0].bid[0];
    } catch (e) {
      response = null;
    }

    if (!response || !bid || !bid.adm && !bid.nurl || !bid.price) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]("No valid bids from ".concat(spec.code, " bidder"));
      return [];
    }

    size = getSize(bidRequest.sizes);
    bidResponse = {
      requestId: bidRequest.bidId,
      bidderCode: spec.code,
      cpm: bid.price,
      creativeId: bid.id,
      width: size.width,
      height: size.height,
      mediaType: 'video',
      currency: response.cur,
      ttl: 300,
      netRevenue: true
    };

    if (bid.nurl) {
      bidResponse.vastUrl = bid.nurl;
    } else if (bid.adm) {
      bidResponse.vastXml = bid.adm;
    }

    return bidResponse;
  }
};

function getSize(sizes) {
  var parsedSizes = __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](sizes);

  var _ref2 = parsedSizes.length ? parsedSizes[0].split('x') : [],
      _ref3 = _slicedToArray(_ref2, 2),
      width = _ref3[0],
      height = _ref3[1];

  return {
    width: parseInt(width, 10) || undefined,
    height: parseInt(height, 10) || undefined
  };
}

function getData(bid) {
  var size = getSize(bid.sizes);
  var loc = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowLocation"]();
  var global = window.top ? window.top : window;
  return {
    id: __WEBPACK_IMPORTED_MODULE_0__src_utils__["generateUUID"](),
    imp: [{
      id: '1',
      bidfloor: bid.params.bidfloor,
      video: {
        mimes: ['video/mp4', 'video/ogg', 'video/webm', 'video/x-flv', 'application/javascript', 'application/x-shockwave-flash'],
        w: size.width,
        h: size.height
      }
    }],
    site: {
      id: '1',
      domain: loc.host,
      page: loc.href,
      ref: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowReferrer"](),
      publisher: {
        id: '1'
      }
    },
    device: {
      ua: global.navigator.userAgent,
      ip: '127.0.0.1',
      devicetype: 1
    }
  };
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[451]);