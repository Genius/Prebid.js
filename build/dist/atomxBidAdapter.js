pbjsChunk([240],{

/***/ 202:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(203);


/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);


var BIDDER_CODE = 'atomx';

function getDomain() {
  var domain = '';

  try {
    if (domain === '' && window.top == window) {
      domain = window.location.href;
    }

    if (domain === '' && window.top == window.parent) {
      domain = document.referrer;
    }

    if (domain == '') {
      var atomxt = 'atomxtest'; // It should be impossible to change the window.location.ancestorOrigins.

      window.location.ancestorOrigins[0] = atomxt;

      if (window.location.ancestorOrigins[0] != atomxt) {
        var ancestorOrigins = window.location.ancestorOrigins; // If the length is 0 we are a javascript tag running in the main domain.
        // But window.top != window or window.location.hostname is empty.

        if (ancestorOrigins.length == 0) {
          // This browser is so fucked up, just return an empty string.
          return '';
        } // ancestorOrigins is an array where [0] is our own window.location
        // and [length-1] is the top window.location.


        domain = ancestorOrigins[ancestorOrigins.length - 1];
      }
    }
  } catch (unused) {}

  if (domain === '') {
    domain = document.referrer;
  }

  if (domain === '') {
    domain = window.location.href;
  }

  return domain.substr(0, 512);
}

var spec = {
  code: BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    return bid.params && !!bid.params.id;
  },
  buildRequests: function buildRequests(validBidRequests) {
    return validBidRequests.map(function (bidRequest) {
      return {
        method: 'GET',
        url: location.protocol + '//p.ato.mx/placement',
        data: {
          v: 12,
          id: bidRequest.params.id,
          size: __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](bidRequest.sizes)[0],
          prebid: bidRequest.bidId,
          b: 0,
          h: '7t3y9',
          type: 'javascript',
          screen: window.screen.width + 'x' + window.screen.height + 'x' + window.screen.colorDepth,
          timezone: new Date().getTimezoneOffset(),
          domain: getDomain(),
          r: document.referrer.substr(0, 512)
        }
      };
    });
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var body = serverResponse.body;
    var res = {
      requestId: body.code,
      cpm: body.cpm * 1000,
      width: body.width,
      height: body.height,
      creativeId: body.creative_id,
      currency: 'USD',
      netRevenue: true,
      ttl: 60
    };

    if (body.adm) {
      res.ad = body.adm;
    } else {
      res.adUrl = body.url;
    }

    return [res];
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    return [];
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[202]);