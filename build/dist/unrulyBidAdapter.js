pbjsChunk([71],{

/***/ 774:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(775);


/***/ }),

/***/ 775:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adapter", function() { return adapter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_Renderer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__ = __webpack_require__(2);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }






function configureUniversalTag(exchangeRenderer) {
  if (!exchangeRenderer.config) throw new Error('UnrulyBidAdapter: Missing renderer config.');
  if (!exchangeRenderer.config.siteId) throw new Error('UnrulyBidAdapter: Missing renderer siteId.');
  parent.window.unruly = parent.window.unruly || {};
  parent.window.unruly['native'] = parent.window.unruly['native'] || {};
  parent.window.unruly['native'].siteId = parent.window.unruly['native'].siteId || exchangeRenderer.config.siteId;
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
    renderer: rendererInstance,
    mediaType: __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */]
  };
};

var buildPrebidResponseAndInstallRenderer = function buildPrebidResponseAndInstallRenderer(bids) {
  return bids.filter(function (serverBid) {
    var hasConfig = !!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](serverBid, 'ext.renderer.config');
    var hasSiteId = !!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](serverBid, 'ext.renderer.config.siteId');
    if (!hasConfig) __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](new Error('UnrulyBidAdapter: Missing renderer config.'));
    if (!hasSiteId) __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](new Error('UnrulyBidAdapter: Missing renderer siteId.'));
    return hasSiteId;
  }).map(function (serverBid) {
    var exchangeRenderer = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](serverBid, 'ext.renderer');
    configureUniversalTag(exchangeRenderer);
    configureRendererQueue();
    var rendererInstance = __WEBPACK_IMPORTED_MODULE_1__src_Renderer_js__["a" /* Renderer */].install(_extends({}, exchangeRenderer, {
      callback: function callback() {}
    }));
    return {
      rendererInstance: rendererInstance,
      serverBid: serverBid
    };
  }).map(function (_ref) {
    var rendererInstance = _ref.rendererInstance,
        serverBid = _ref.serverBid;
    var prebidBid = serverResponseToBid(serverBid, rendererInstance);

    var rendererConfig = _extends({}, prebidBid, {
      renderer: rendererInstance,
      adUnitCode: serverBid.ext.adUnitCode
    });

    rendererInstance.setRender(function () {
      notifyRenderer(rendererConfig);
    });
    return prebidBid;
  });
};

var adapter = {
  code: 'unruly',
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    if (!bid) return false;
    var context = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.video.context');
    return bid.mediaType === 'video' || context === 'outstream';
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var url = 'https://targeting.unrulymedia.com/prebid';
    var method = 'POST';
    var data = {
      bidRequests: validBidRequests,
      bidderRequest: bidderRequest
    };
    var options = {
      contentType: 'text/plain'
    };
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
  },
  getUserSyncs: function getUserSyncs(syncOptions, response, gdprConsent) {
    var params = '';

    if (gdprConsent && 'gdprApplies' in gdprConsent) {
      if (gdprConsent.gdprApplies && typeof gdprConsent.consentString === 'string') {
        params += "?gdpr=1&gdpr_consent=".concat(gdprConsent.consentString);
      } else {
        params += "?gdpr=0";
      }
    }

    var syncs = [];

    if (syncOptions.iframeEnabled) {
      syncs.push({
        type: 'iframe',
        url: 'https://video.unrulymedia.com/iframes/third-party-iframes.html' + params
      });
    }

    return syncs;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__["registerBidder"])(adapter);

/***/ })

},[774]);