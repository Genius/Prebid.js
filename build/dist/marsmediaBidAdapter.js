pbjsChunk([151],{

/***/ 411:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(412);


/***/ }),

/***/ 412:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);


var BIDDER_CODE = 'marsmedia';

function getDomain() {
  if (!__WEBPACK_IMPORTED_MODULE_0__src_utils__["inIframe"]()) {
    return window.location.hostname;
  }

  var origins = window.document.location.ancestorOrigins;

  if (origins && origins.length > 0) {
    return origins[origins.length - 1];
  }
}

var spec = {
  code: BIDDER_CODE,
  aliases: ['mars'],
  isBidRequestValid: function isBidRequestValid(bid) {
    return bid.params.publisherID !== null;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    try {
      var protocol = window.location.protocol === 'https:';
      var parse = getSize(validBidRequests[0].sizes);
      var publisherId = validBidRequests[0].params.publisherID;
      var payload = {
        id: validBidRequests[0].bidId,
        cur: ['USD'],
        language: window.navigator.userLanguage || window.navigator.language,
        site: {
          id: publisherId,
          domain: getDomain(),
          page: document.URL,
          ref: document.referrer,
          publisher: {
            id: publisherId,
            domain: getDomain()
          }
        },
        imp: [{
          id: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getUniqueIdentifierStr"](),
          banner: {
            w: parse.width,
            h: parse.height,
            secure: protocol
          },
          bidfloor: parseFloat(validBidRequests[0].params.floor) > 0 ? validBidRequests[0].params.floor : 0
        }],
        device: {
          ua: navigator.userAgent
        },
        user: {
          id: publisherId
        },
        publisher: {
          id: publisherId,
          domain: getDomain()
        }
      };

      if (bidderRequest && bidderRequest.gdprConsent) {
        payload.gdpr = {
          applies: bidderRequest.gdprConsent.gdprApplies,
          consent: bidderRequest.gdprConsent.consentString
        };
      }

      return {
        method: 'POST',
        url: '//bid306.rtbsrv.com/bidder/?bid=3mhdom',
        data: JSON.stringify(payload)
      };
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](e, {
        validBidRequests: validBidRequests,
        bidderRequest: bidderRequest
      });
    }
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = [];
    var res = serverResponse.body;

    if (!res) {
      return [];
    }

    for (var x = 0; x < res.seatbid.length; x++) {
      var bidAd = res.seatbid[x].bid[0];
      bidResponses.push({
        requestId: res.id,
        cpm: Number(bidAd.price),
        width: bidAd.w,
        height: bidAd.h,
        ad: bidAd.adm,
        ttl: 60,
        creativeId: bidAd.cid,
        netRevenue: true,
        currency: 'USD'
      });
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    return [];
  }
};

function getSize(requestSizes) {
  var parsed = {};
  var size = __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](requestSizes)[0];

  if (typeof size !== 'string') {
    return parsed;
  }

  var parsedSize = size.toUpperCase().split('X');
  var width = parseInt(parsedSize[0], 10);

  if (width) {
    parsed.width = width;
  }

  var height = parseInt(parsedSize[1], 10);

  if (height) {
    parsed.height = height;
  }

  return parsed;
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[411]);