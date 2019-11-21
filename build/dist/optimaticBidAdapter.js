pbjsChunk([25],{

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(266);
module.exports = __webpack_require__(267);


/***/ }),

/***/ 266:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spec = exports.ENDPOINT = undefined;

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _utils = __webpack_require__(0);

var utils = _interopRequireWildcard(_utils);

var _bidderFactory = __webpack_require__(6);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var ENDPOINT = exports.ENDPOINT = '//mg-bid.optimatic.com/adrequest/';

var spec = exports.spec = {
  code: 'optimatic',

  supportedMediaTypes: ['video'],

  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid && bid.params && bid.params.placement && bid.params.bidfloor);
  },

  buildRequests: function buildRequests(bids) {
    return bids.map((function (bid) {
      return {
        method: 'POST',
        url: ENDPOINT + bid.params.placement,
        data: getData(bid),
        options: { contentType: 'application/json' },
        bidRequest: bid
      };
    }));
  },

  interpretResponse: function interpretResponse(response, _ref) {
    var bidRequest = _ref.bidRequest;

    var bid = void 0;
    var size = void 0;
    var bidResponse = void 0;
    try {
      response = response.body;
      bid = response.seatbid[0].bid[0];
    } catch (e) {
      response = null;
    }
    if (!response || !bid || !bid.adm || !bid.price) {
      utils.logWarn('No valid bids from ' + spec.code + ' bidder');
      return [];
    }
    size = getSize(bidRequest.sizes);
    bidResponse = {
      requestId: bidRequest.bidId,
      bidderCode: spec.code,
      cpm: bid.price,
      creativeId: bid.id,
      vastXml: bid.adm,
      width: size.width,
      height: size.height,
      mediaType: 'video',
      currency: response.cur,
      ttl: 300,
      netRevenue: true
    };
    return bidResponse;
  }
};

function getSize(sizes) {
  var parsedSizes = utils.parseSizesInput(sizes);

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
  var loc = utils.getTopWindowLocation();
  var global = window.top ? window.top : window;
  return {
    id: utils.generateUUID(),
    imp: [{
      id: '1',
      bidfloor: bid.params.bidfloor,
      video: {
        mimes: ['video/mp4', 'video/ogg', 'video/webm', 'video/x-flv', 'application/javascript', 'application/x-shockwave-flash'],
        width: size.width,
        height: size.height
      }
    }],
    site: {
      id: '1',
      domain: loc.host,
      page: loc.href,
      ref: utils.getTopWindowReferrer(),
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

(0, _bidderFactory.registerBidder)(spec);

/***/ }),

/***/ 267:
/***/ (function(module, exports) {



/***/ })

},[265]);