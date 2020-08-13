pbjsChunk([261],{

/***/ 311:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(312);


/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_Renderer_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__ = __webpack_require__(2);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var BIDDER_CODE = 'byplay';
var ENDPOINT_URL = 'https://prebid.byplay.net/bidder';
var VIDEO_PLAYER_URL = 'https://cdn.byplay.net/prebid-byplay-v2.js';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.sectionId;
  },
  buildRequests: function buildRequests(validBidRequests) {
    return validBidRequests.map(function (req) {
      var payload = _objectSpread({
        requestId: req.bidId,
        sectionId: req.params.sectionId
      }, req.params.env ? {
        env: req.params.env
      } : {});

      return {
        method: 'POST',
        url: ENDPOINT_URL,
        data: JSON.stringify(payload),
        options: {
          withCredentials: false
        }
      };
    });
  },
  interpretResponse: function interpretResponse(serverResponse, bidderRequest) {
    var response = serverResponse.body;
    var data = JSON.parse(bidderRequest.data);
    var bidResponse = {
      requestId: data.requestId,
      cpm: response.cpm,
      width: response.width,
      height: response.height,
      creativeId: response.creativeId || '0',
      ttl: __WEBPACK_IMPORTED_MODULE_0__src_config_js__["b" /* config */].getConfig('_bidderTimeout'),
      currency: 'JPY',
      netRevenue: response.netRevenue,
      mediaType: __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */],
      vastXml: response.vastXml,
      renderer: createRenderer()
    };
    return [bidResponse];
  }
};

function createRenderer() {
  var renderer = __WEBPACK_IMPORTED_MODULE_2__src_Renderer_js__["a" /* Renderer */].install({
    url: VIDEO_PLAYER_URL
  });
  renderer.setRender(function (bid) {
    bid.renderer.push(function () {
      window.adtagRender(bid);
    });
  });
  return renderer;
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[311]);