pbjsChunk([97],{

/***/ 387:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(388);


/***/ }),

/***/ 388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }


var BIDDER_CODE = 'outcon';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: ['banner', 'video'],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!((bid.params.pod || bid.params.internalId && bid.params.publisher) && bid.params.env);
  },
  buildRequests: function buildRequests(validBidRequests) {
    for (var i = 0; i < validBidRequests.length; i++) {
      var url = '';
      var par = '';
      if (validBidRequests[i].params.pod != undefined) par = 'get?pod=' + validBidRequests[i].params.pod + '&bidId=' + validBidRequests[i].bidId;else par = 'get?internalId=' + validBidRequests[i].params.internalId + '&publisher=' + validBidRequests[i].params.publisher + '&bidId=' + validBidRequests[i].bidId;
      par = par + '&vast=true';

      switch (validBidRequests[i].params.env) {
        case 'test':
          par = par + '&demo=true';
          url = 'https://test.outcondigital.com/ad/' + par;
          break;

        case 'api':
          url = 'https://api.outcondigital.com/ad/' + par;
          break;

        case 'stg':
          url = 'https://stg.outcondigital.com/ad/' + par;
          break;
      }

      return {
        method: 'GET',
        url: url,
        data: {}
      };
    }
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = [];
    var bidResponse = {
      requestId: serverResponse.body.bidId,
      cpm: serverResponse.body.cpm,
      width: serverResponse.body.creatives[0].width,
      height: serverResponse.body.creatives[0].height,
      creativeId: serverResponse.body.creatives[0].id,
      currency: serverResponse.body.cur,
      netRevenue: true,
      ttl: 300,
      ad: wrapDisplayUrl(serverResponse.body.creatives[0].url, serverResponse.body.type),
      vastImpUrl: serverResponse.body.trackingURL,
      mediaType: serverResponse.body.type
    };

    if (serverResponse.body.type == 'video') {
      _extends(bidResponse, {
        vastUrl: serverResponse.body.vastURL,
        ttl: 3600
      });
    }

    bidResponses.push(bidResponse);
    return bidResponses;
  }
};

function wrapDisplayUrl(displayUrl, type) {
  if (type == 'video') return "<html><head></head><body style='margin : 0; padding: 0;'><div><video width=\"100%\"; height=\"100%\"; autoplay = true><source src=\"".concat(displayUrl, "\"></video></div></body>");
  if (type == 'banner') return "<html><head></head><body style='margin : 0; padding: 0;'><div><img width:\"100%\"; height:\"100%\"; src=\"".concat(displayUrl, "\"></div></body>");
  return null;
}

Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[387]);