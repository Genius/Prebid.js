pbjsChunk([129],{

/***/ 457:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(458);


/***/ }),

/***/ 458:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config__ = __webpack_require__(3);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




var BIDDER_CODE = 'orbitsoft';
var styleParamsMap = {
  'title.family': 'f1',
  // headerFont
  'title.size': 'fs1',
  // headerFontSize
  'title.weight': 'w1',
  // headerWeight
  'title.style': 's1',
  // headerStyle
  'title.color': 'c3',
  // headerColor
  'description.family': 'f2',
  // descriptionFont
  'description.size': 'fs2',
  // descriptionFontSize
  'description.weight': 'w2',
  // descriptionWeight
  'description.style': 's2',
  // descriptionStyle
  'description.color': 'c4',
  // descriptionColor
  'url.family': 'f3',
  // urlFont
  'url.size': 'fs3',
  // urlFontSize
  'url.weight': 'w3',
  // urlWeight
  'url.style': 's3',
  // urlStyle
  'url.color': 'c5',
  // urlColor
  'colors.background': 'c2',
  // borderColor
  'colors.border': 'c1',
  // borderColor
  'colors.link': 'c6' // lnkColor

};
var spec = {
  code: BIDDER_CODE,
  aliases: ['oas', 'mediafuseLift'],
  // short code and customer aliases
  isBidRequestValid: function isBidRequestValid(bid) {
    switch (true) {
      case !('params' in bid):
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](bid.bidder + ': No required params');
        return false;

      case !bid.params.placementId:
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](bid.bidder + ': No required param placementId');
        return false;

      case !bid.params.requestUrl:
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](bid.bidder + ': No required param requestUrl');
        return false;
    }

    return true;
  },
  buildRequests: function buildRequests(validBidRequests) {
    var bidRequest;
    var serverRequests = [];

    for (var i = 0; i < validBidRequests.length; i++) {
      bidRequest = validBidRequests[i];
      var bidRequestParams = bidRequest.params;
      var callbackId = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getUniqueIdentifierStr"]();
      var placementId = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('placementId', bidRequestParams);
      var requestUrl = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('requestUrl', bidRequestParams);
      var referrer = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('ref', bidRequestParams);
      var location = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('loc', bidRequestParams); // Append location & referrer

      if (location === '') {
        location = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"]();
      }

      if (referrer === '') {
        referrer = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowReferrer"]();
      } // Styles params


      var stylesParams = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('style', bidRequestParams);
      var stylesParamsArray = {};

      for (var currentValue in stylesParams) {
        if (stylesParams.hasOwnProperty(currentValue)) {
          var currentStyle = stylesParams[currentValue];

          for (var field in currentStyle) {
            if (currentStyle.hasOwnProperty(field)) {
              var styleField = styleParamsMap[currentValue + '.' + field];

              if (typeof styleField !== 'undefined') {
                stylesParamsArray[styleField] = currentStyle[field];
              }
            }
          }
        }
      } // Custom params


      var customParams = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('customParams', bidRequestParams);
      var customParamsArray = {};

      for (var customField in customParams) {
        if (customParams.hasOwnProperty(customField)) {
          customParamsArray['c.' + customField] = customParams[customField];
        }
      } // Sizes params (not supports by server, for future features)


      var sizesParams = bidRequest.sizes;
      var parsedSizes = __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](sizesParams);
      serverRequests.push({
        method: 'GET',
        url: requestUrl,
        data: _extends({
          'scid': placementId,
          'callback_uid': callbackId,
          'loc': location,
          'ref': referrer,
          'size': parsedSizes
        }, stylesParamsArray, customParamsArray),
        options: {
          withCredentials: false
        },
        bidRequest: bidRequest
      });
    }

    return serverRequests;
  },
  interpretResponse: function interpretResponse(serverResponse, request) {
    var bidResponses = [];

    if (!serverResponse || serverResponse.error) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](BIDDER_CODE + ': Server response error');
      return bidResponses;
    }

    var serverBody = serverResponse.body;

    if (!serverBody) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](BIDDER_CODE + ': Empty bid response');
      return bidResponses;
    }

    var CPM = serverBody.cpm;
    var WIDTH = serverBody.width;
    var HEIGHT = serverBody.height;
    var CREATIVE = serverBody.content_url;
    var CALLBACK_UID = serverBody.callback_uid;
    var TIME_TO_LIVE = __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('_bidderTimeout');
    var REFERER = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"]();
    var bidRequest = request.bidRequest;

    if (CPM > 0 && WIDTH > 0 && HEIGHT > 0) {
      var bidResponse = {
        requestId: bidRequest.bidId,
        cpm: CPM,
        width: WIDTH,
        height: HEIGHT,
        creativeId: CALLBACK_UID,
        ttl: TIME_TO_LIVE,
        referrer: REFERER,
        currency: 'USD',
        netRevenue: true,
        adUrl: CREATIVE
      };
      bidResponses.push(bidResponse);
    }

    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[457]);