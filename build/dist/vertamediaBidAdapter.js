pbjsChunk([3],{

/***/ 379:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(380);
module.exports = __webpack_require__(381);


/***/ }),

/***/ 380:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spec = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = __webpack_require__(0);

var utils = _interopRequireWildcard(_utils);

var _bidderFactory = __webpack_require__(6);

var _mediaTypes = __webpack_require__(12);

var _Renderer = __webpack_require__(18);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var URL = '//rtb.vertamedia.com/hb/';
var BIDDER_CODE = 'vertamedia';

var spec = exports.spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [_mediaTypes.VIDEO],
  isBidRequestValid: function isBidRequestValid(bid) {
    return Boolean(bid && bid.params && bid.params.aid);
  },

  /**
   * Make a server request from the list of BidRequests
   * @param bidRequests
   * @param bidderRequest
   */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    return bidRequests.map((function (bid) {
      return {
        data: prepareRTBRequestParams(bid),
        bidderRequest: bidderRequest,
        method: 'GET',
        url: URL
      };
    }));
  },

  /**
   * Unpack the response from the server into a list of bids
   * @param serverResponse
   * @param bidderRequest
   * @return {Bid[]} An array of bids which were nested inside the server
   */
  interpretResponse: function interpretResponse(serverResponse, _ref) {
    var bidderRequest = _ref.bidderRequest;

    serverResponse = serverResponse.body;
    var isInvalidValidResp = !serverResponse || !serverResponse.bids || !serverResponse.bids.length;
    var videoMediaType = utils.deepAccess(bidderRequest.bids[0], 'mediaTypes.video');
    var context = utils.deepAccess(bidderRequest.bids[0], 'mediaTypes.video.context');
    var isMediaTypeOutstream = videoMediaType && context === 'outstream';

    var bids = [];

    if (isInvalidValidResp) {
      var extMessage = serverResponse && serverResponse.ext && serverResponse.ext.message ? ': ' + serverResponse.ext.message : '';
      var errorMessage = 'in response for ' + bidderRequest.bidderCode + ' adapter ' + extMessage;

      utils.logError(errorMessage);

      return bids;
    }

    serverResponse.bids.forEach((function (serverBid) {
      if (serverBid.cpm !== 0) {
        var bid = createBid(isMediaTypeOutstream, serverBid);
        bids.push(bid);
      }
    }));

    return bids;
  }
};

/**
 * Prepare all parameters for request
 * @param bid {object}
 * @returns {object}
 */
function prepareRTBRequestParams(bid) {
  var size = getSize(bid.sizes);

  return {
    domain: utils.getTopWindowLocation().hostname,
    callbackId: bid.bidId,
    aid: bid.params.aid,
    h: size.height,
    w: size.width
  };
}

/**
 * Prepare size for request
 * @param requestSizes {array}
 * @returns {object} bid The bid to validate
 */
function getSize(requestSizes) {
  var size = utils.parseSizesInput(requestSizes)[0];
  var parsed = {};

  if (typeof size !== 'string') {
    return parsed;
  }

  var parsedSize = size.toUpperCase().split('X');

  return {
    height: parseInt(parsedSize[1], 10) || undefined,
    width: parseInt(parsedSize[0], 10) || undefined
  };
}

/**
 * Configure new bid by response
 * @param isMediaTypeOutstream {boolean}
 * @param bidResponse {object}
 * @returns {object}
 */
function createBid(isMediaTypeOutstream, bidResponse) {
  var bid = {
    requestId: bidResponse.requestId,
    creativeId: bidResponse.cmpId,
    vastUrl: bidResponse.vastUrl,
    height: bidResponse.height,
    currency: bidResponse.cur,
    width: bidResponse.width,
    cpm: bidResponse.cpm,
    mediaType: 'video',
    netRevenue: true,
    ttl: 3600
  };

  if (isMediaTypeOutstream) {
    _extends(bid, {
      adResponse: bidResponse,
      renderer: newRenderer(bidResponse.requestId)
    });
  }

  return bid;
}

function newRenderer(requestId) {
  var renderer = _Renderer.Renderer.install({
    id: requestId,
    url: '//player.vertamedia.com/outstream-unit/2.01/outstream.min.js',
    loaded: false
  });

  renderer.setRender(outstreamRender);

  return renderer;
}

function outstreamRender(bid) {
  bid.renderer.push((function () {
    window.VOutstreamAPI.initOutstreams([{
      width: bid.width,
      height: bid.height,
      vastUrl: bid.vastUrl,
      elId: bid.adUnitCode
    }]);
  }));
}

(0, _bidderFactory.registerBidder)(spec);

/***/ }),

/***/ 381:
/***/ (function(module, exports) {



/***/ })

},[379]);