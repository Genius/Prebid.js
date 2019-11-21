pbjsChunk([66],{

/***/ 377:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(378);


/***/ }),

/***/ 378:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adapter = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = __webpack_require__(0);

var utils = _interopRequireWildcard(_utils);

var _Renderer = __webpack_require__(18);

var _bidderFactory = __webpack_require__(6);

var _mediaTypes = __webpack_require__(12);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function configureUniversalTag(exchangeRenderer) {
  parent.window.unruly = parent.window.unruly || {};
  parent.window.unruly['native'] = parent.window.unruly['native'] || {};
  parent.window.unruly['native'].siteId = parent.window.unruly['native'].siteId || exchangeRenderer.siteId;
  parent.window.unruly['native'].supplyMode = 'prebid';
}

function configureRendererQueue() {
  parent.window.unruly['native'].prebid = parent.window.unruly['native'].prebid || {};
  parent.window.unruly['native'].prebid.uq = parent.window.unruly['native'].prebid.uq || [];
}

function notifyRenderer(bidResponseBid) {
  parent.window.unruly['native'].prebid.uq.push(['render', bidResponseBid]);
}

var serverResponseToBid = function serverResponseToBid(bid, rendererInstance) {
  return {
    requestId: bid.bidId,
    cpm: bid.cpm,
    width: bid.width,
    height: bid.height,
    vastUrl: bid.vastUrl,
    netRevenue: true,
    creativeId: bid.bidId,
    ttl: 360,
    currency: 'USD',
    renderer: rendererInstance
  };
};

var buildPrebidResponseAndInstallRenderer = function buildPrebidResponseAndInstallRenderer(bids) {
  return bids.filter((function (serverBid) {
    return !!utils.deepAccess(serverBid, 'ext.renderer');
  })).map((function (serverBid) {
    var exchangeRenderer = utils.deepAccess(serverBid, 'ext.renderer');
    configureUniversalTag(exchangeRenderer);
    configureRendererQueue();

    var rendererInstance = _Renderer.Renderer.install(_extends({}, exchangeRenderer, { callback: function callback() {} }));
    return { rendererInstance: rendererInstance, serverBid: serverBid };
  })).map((function (_ref) {
    var rendererInstance = _ref.rendererInstance,
        serverBid = _ref.serverBid;

    var prebidBid = serverResponseToBid(serverBid, rendererInstance);

    var rendererConfig = _extends({}, prebidBid, {
      renderer: rendererInstance,
      adUnitCode: serverBid.ext.adUnitCode
    });

    rendererInstance.setRender((function () {
      notifyRenderer(rendererConfig);
    }));

    return prebidBid;
  }));
};

var adapter = exports.adapter = {
  code: 'unruly',
  supportedMediaTypes: [_mediaTypes.VIDEO],
  isBidRequestValid: function isBidRequestValid(bid) {
    if (!bid) return false;

    var context = utils.deepAccess(bid, 'mediaTypes.video.context');

    return bid.mediaType === 'video' || context === 'outstream';
  },

  buildRequests: function buildRequests(validBidRequests) {
    var url = 'https://targeting.unrulymedia.com/prebid';
    var method = 'POST';
    var data = { bidRequests: validBidRequests };
    var options = { contentType: 'application/json' };

    return {
      url: url,
      method: method,
      data: data,
      options: options
    };
  },

  interpretResponse: function interpretResponse() {
    var serverResponse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var serverResponseBody = serverResponse.body;
    var noBidsResponse = [];
    var isInvalidResponse = !serverResponseBody || !serverResponseBody.bids;

    return isInvalidResponse ? noBidsResponse : buildPrebidResponseAndInstallRenderer(serverResponseBody.bids);
  }
};

(0, _bidderFactory.registerBidder)(adapter);

/***/ })

},[377]);