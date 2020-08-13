pbjsChunk([49],{

/***/ 822:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(823);


/***/ }),

/***/ 823:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_Renderer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__ = __webpack_require__(2);





var BIDDER_CODE = 'yieldone';
var ENDPOINT_URL = 'https://y.one.impact-ad.jp/h_bid';
var USER_SYNC_URL = 'https://y.one.impact-ad.jp/push_sync';
var VIDEO_PLAYER_URL = 'https://img.ak.impact-ad.jp/ic/pone/ivt/firstview/js/dac-video-prebid.min.js';
var CMER_PLAYER_URL = 'https://an.cmertv.com/hb/renderer/cmertv-video-yone-prebid.min.js';
var VIEWABLE_PERCENTAGE_URL = 'https://img.ak.impact-ad.jp/ic/pone/ivt/firstview/js/prebid-adformat-config.js';
var spec = {
  code: BIDDER_CODE,
  aliases: ['y1'],
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["d" /* VIDEO */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.placementId;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    return validBidRequests.map(function (bidRequest) {
      var params = bidRequest.params;
      var placementId = params.placementId;
      var cb = Math.floor(Math.random() * 99999999999);
      var referrer = bidderRequest.refererInfo.referer;
      var bidId = bidRequest.bidId;
      var transactionId = bidRequest.transactionId;
      var unitCode = bidRequest.adUnitCode;
      var timeout = __WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('bidderTimeout');
      var payload = {
        v: 'hb1',
        p: placementId,
        cb: cb,
        r: referrer,
        uid: bidId,
        tid: transactionId,
        uc: unitCode,
        tmax: timeout,
        t: 'i'
      };
      var videoMediaType = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.video');

      if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](bidRequest.mediaType) && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isEmpty"](bidRequest.mediaTypes) || bidRequest.mediaType === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["b" /* BANNER */] || bidRequest.mediaTypes && bidRequest.mediaTypes[__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["b" /* BANNER */]]) {
        var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.banner.sizes') || bidRequest.sizes;
        payload.sz = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](sizes).join(',');
      } else if (bidRequest.mediaType === __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["d" /* VIDEO */] || videoMediaType) {
        var _sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.video.playerSize') || bidRequest.sizes;

        var size = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](_sizes)[0];
        payload.w = size.split('x')[0];
        payload.h = size.split('x')[1];
      }

      return {
        method: 'GET',
        url: ENDPOINT_URL,
        data: payload
      };
    });
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = [];
    var response = serverResponse.body;
    var crid = response.crid || 0;
    var width = response.width || 0;
    var height = response.height || 0;
    var cpm = response.cpm * 1000 || 0;

    if (width !== 0 && height !== 0 && cpm !== 0 && crid !== 0) {
      var dealId = response.dealId || '';
      var renderId = response.renderid || '';
      var currency = response.currency || 'JPY';
      var netRevenue = response.netRevenue === undefined ? true : response.netRevenue;
      var referrer = bidRequest.data.r || '';
      var bidResponse = {
        requestId: response.uid,
        cpm: cpm,
        width: response.width,
        height: response.height,
        creativeId: crid,
        dealId: dealId,
        currency: currency,
        netRevenue: netRevenue,
        ttl: __WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('_bidderTimeout'),
        referrer: referrer
      };

      if (response.adTag && renderId === 'ViewableRendering') {
        bidResponse.mediaType = __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["b" /* BANNER */];
        var viewableScript = "\n        <script src=\"".concat(VIEWABLE_PERCENTAGE_URL, "\"></script>\n        <script>\n        let width =").concat(bidResponse.width, ";\n        let height =").concat(bidResponse.height, ";\n        let adTag = `").concat(response.adTag.replace(/\\/g, '\\\\').replace(/\//g, '\\/').replace(/'/g, "\\'").replace(/"/g, '\\"'), "`;\n        let targetId =\"").concat(bidRequest.data.uc, "\";\n        window.YONEPBViewable = {};\n        window.YONEPBViewable.executed = false;\n        const viewablePercentage = window.pb_conf.viewablePercentage;\n        const viewableRange = height * 0.01 * viewablePercentage;\n        const iframe = document.createElement('iframe');\n        iframe.setAttribute(\"style\", \"border: 0; margin: 0 auto; left: 0; top: 0; width:\" + width + \"px; height:\" + height + \"px;\");\n        iframe.frameBorder = 0; iframe.scrolling = 'no';\n        const inDap = document.createElement('script');\n        inDap.innerHTML = \"inDapIF = true;\";\n        iframe.appendChild(inDap);\n        window.frameElement.parentElement.appendChild(iframe);\n        const doc = iframe.contentWindow ? iframe.contentWindow.document : iframe.contentDocument;\n        if(!window.parent.$sf){\n          let target = window.top.document.getElementById(targetId);\n          window.top.addEventListener('scroll', () => {\n              const targetRect = target.getBoundingClientRect();\n              if (!window.YONEPBViewable.executed && window.top.innerHeight - targetRect.top > viewableRange) {\n                  window.YONEPBViewable.executed = true;\n                  doc.open(); doc.write(adTag); doc.close();\n                  window.frameElement.style.display = \"none\";\n              }\n            }, false);\n        }else{\n          let disp = function(){\n            if(!window.YONEPBViewable.executed && window.parent.$sf.ext.inViewPercentage() > viewablePercentage){\n                window.YONEPBViewable.executed = true;\n                doc.open(); doc.write(adTag); doc.close();\n                window.frameElement.style.display = \"none\";\n            }\n            let id = setTimeout(disp, 100);\n            if(window.YONEPBViewable.executed){clearTimeout(id);}\n          };\n          disp();\n        }\n        </script>\n        ");
        bidResponse.ad = viewableScript;
      } else if (response.adTag) {
        bidResponse.mediaType = __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["b" /* BANNER */];
        bidResponse.ad = response.adTag;
      } else if (response.adm) {
        bidResponse.mediaType = __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes_js__["d" /* VIDEO */];
        bidResponse.vastXml = response.adm;

        if (renderId === 'cmer') {
          bidResponse.renderer = newCmerRenderer(response);
        } else {
          bidResponse.renderer = newRenderer(response);
        }
      }

      bidResponses.push(bidResponse);
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    if (syncOptions.iframeEnabled) {
      return [{
        type: 'iframe',
        url: USER_SYNC_URL
      }];
    }
  }
};

function newRenderer(response) {
  var renderer = __WEBPACK_IMPORTED_MODULE_3__src_Renderer_js__["a" /* Renderer */].install({
    id: response.uid,
    url: VIDEO_PLAYER_URL,
    loaded: false
  });

  try {
    renderer.setRender(outstreamRender);
  } catch (err) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('Prebid Error calling setRender on newRenderer', err);
  }

  return renderer;
}

function outstreamRender(bid) {
  bid.renderer.push(function () {
    window.DACIVTPREBID.renderPrebid(bid);
  });
}

function newCmerRenderer(response) {
  var renderer = __WEBPACK_IMPORTED_MODULE_3__src_Renderer_js__["a" /* Renderer */].install({
    id: response.uid,
    url: CMER_PLAYER_URL,
    loaded: false
  });

  try {
    renderer.setRender(cmerRender);
  } catch (err) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('Prebid Error calling setRender on newRenderer', err);
  }

  return renderer;
}

function cmerRender(bid) {
  bid.renderer.push(function () {
    window.CMERYONEPREBID.renderPrebid(bid);
  });
}

Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[822]);