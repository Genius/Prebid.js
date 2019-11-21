pbjsChunk([13],{

/***/ 316:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(317);
module.exports = __webpack_require__(318);


/***/ }),

/***/ 317:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spec = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _utils = __webpack_require__(0);

var utils = _interopRequireWildcard(_utils);

var _bidderFactory = __webpack_require__(6);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var spec = exports.spec = {
  code: 'sekindoUM',
  supportedMediaTypes: ['video'],
  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    if (bid.mediaType == 'video' || _typeof(bid.mediaTypes) == 'object' && _typeof(bid.mediaTypes.video) == 'object') {
      if (_typeof(bid.params.video) != 'object' || typeof bid.params.video.playerWidth == 'undefined' || typeof bid.params.video.playerHeight == 'undefined') {
        return false;
      }
    }
    return !!bid.params.spaceId;
  },
  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {validBidRequests[]} - an array of bids
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var pubUrl = null;
    if (parent !== window) {
      pubUrl = document.referrer;
    } else {
      pubUrl = window.location.href;
    }

    return validBidRequests.map((function (bidRequest) {
      var subId = utils.getBidIdParameter('subId', bidRequest.params);
      var spaceId = utils.getBidIdParameter('spaceId', bidRequest.params);
      var bidfloor = utils.getBidIdParameter('bidfloor', bidRequest.params);
      var protocol = document.location.protocol === 'https:' ? 's' : '';
      var queryString = '';

      queryString = utils.tryAppendQueryString(queryString, 's', spaceId);
      queryString = utils.tryAppendQueryString(queryString, 'subId', subId);
      queryString = utils.tryAppendQueryString(queryString, 'pubUrl', pubUrl);
      queryString = utils.tryAppendQueryString(queryString, 'hbTId', bidRequest.transactionId);
      queryString = utils.tryAppendQueryString(queryString, 'hbBidId', bidRequest.bidId);
      queryString = utils.tryAppendQueryString(queryString, 'hbver', '4');
      queryString = utils.tryAppendQueryString(queryString, 'hbcb', '1'); /// legasy
      queryString = utils.tryAppendQueryString(queryString, 'dcpmflr', bidfloor);
      queryString = utils.tryAppendQueryString(queryString, 'protocol', protocol);
      if (bidRequest.mediaType === 'video' || _typeof(bidRequest.mediaTypes) == 'object' && _typeof(bidRequest.mediaTypes.video) == 'object') {
        queryString = utils.tryAppendQueryString(queryString, 'x', bidRequest.params.playerWidth);
        queryString = utils.tryAppendQueryString(queryString, 'y', bidRequest.params.playerHeight);
        if (typeof vid_vastType != 'undefined') {
          queryString = utils.tryAppendQueryString(queryString, 'vid_vastType', bidRequest.params.vid_vastType);
        }
        if (_typeof(bidRequest.mediaTypes) == 'object' && _typeof(bidRequest.mediaTypes.video) == 'object' && typeof bidRequest.mediaTypes.video.context == 'string') {
          queryString = utils.tryAppendQueryString(queryString, 'vid_context', bidRequest.mediaTypes.video.context);
        }
      }

      var endpointUrl = 'http' + protocol + '://hb.sekindo.com/live/liveView.php';

      return {
        method: 'GET',
        url: endpointUrl,
        data: queryString
      };
    }));
  },
  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    if ((typeof serverResponse === 'undefined' ? 'undefined' : _typeof(serverResponse)) !== 'object') {
      return [];
    }

    var bidResponses = [];
    var bidResponse = {
      requestId: serverResponse.body.id,
      bidderCode: spec.code,
      cpm: serverResponse.body.cpm,
      width: serverResponse.body.width,
      height: serverResponse.body.height,
      creativeId: serverResponse.body.creativeId,
      currency: serverResponse.body.currency,
      netRevenue: serverResponse.body.netRevenue,
      ttl: serverResponse.body.ttl
    };
    if (bidRequest.mediaType == 'video') {
      if (typeof serverResponse.body.vastUrl != 'undefined') {
        bidResponse.vastUrl = serverResponse.body.vastUrl;
      } else {
        bidResponse.vastXml = serverResponse.body.vastXml;
      }
    } else {
      bidResponse.ad = serverResponse.body.ad;
    }

    bidResponses.push(bidResponse);
    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    if (syncOptions.iframeEnabled) {
      return [{
        type: 'iframe',
        url: 'ADAPTER_SYNC_URL'
      }];
    }
  }
};
(0, _bidderFactory.registerBidder)(spec);

/***/ }),

/***/ 318:
/***/ (function(module, exports) {



/***/ })

},[316]);