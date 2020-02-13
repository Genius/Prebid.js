pbjsChunk([236],{

/***/ 210:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(211);


/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);


var BIDDER_CODE = 'bidfluence';

function stdTimezoneOffset(t) {
  var jan = new Date(t.getFullYear(), 0, 1);
  var jul = new Date(t.getFullYear(), 6, 1);
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

function dst(t) {
  return t.getTimezoneOffset() < stdTimezoneOffset(t);
}

function getBdfTz(d) {
  var tz = d.getTimezoneOffset();

  if (dst(d)) {
    tz += 60;
  }

  return tz.toString();
}

function getUTCDate() {
  var m = new Date();
  var dateString = m.getUTCFullYear() + '/' + ('0' + (m.getUTCMonth() + 1)).slice(-2) + '/' + ('0' + m.getUTCDate()).slice(-2) + ' ' + ('0' + m.getUTCHours()).slice(-2) + ':' + ('0' + m.getUTCMinutes()).slice(-2) + ':' + ('0' + m.getUTCSeconds()).slice(-2);
  return dateString;
}

var spec = {
  code: BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.placementId || !!bid.params.publisherId;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var body = document.getElementsByTagName('body')[0];
    var refInfo = bidderRequest.refererInfo;
    var gdpr = bidderRequest.gdprConsent;
    var vpW = Math.max(window.innerWidth || body.clientWidth || 0) + 2;
    var vpH = Math.max(window.innerHeight || body.clientHeight || 0) + 2;
    var sr = screen.height > screen.width ? screen.height + 'x' + screen.width + 'x' + screen.colorDepth : screen.width + 'x' + screen.height + 'x' + screen.colorDepth;
    var payload = {
      v: '2.0',
      azr: true,
      ck: __WEBPACK_IMPORTED_MODULE_0__src_utils__["cookiesAreEnabled"](),
      re: refInfo ? refInfo.referer : '',
      st: refInfo ? refInfo.stack : [],
      tz: getBdfTz(new Date()),
      sr: sr,
      tm: bidderRequest.timeout,
      vp: vpW + 'x' + vpH,
      sdt: getUTCDate(),
      top: refInfo ? refInfo.reachedTop : false,
      gdpr: gdpr ? gdpr.gdprApplies : false,
      gdprc: gdpr ? gdpr.consentString : '',
      bids: []
    };

    __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](validBidRequests, function (bidRequest) {
      var params = bidRequest.params;
      var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](bidRequest.sizes)[0];
      var width = sizes.split('x')[0];
      var height = sizes.split('x')[1];
      var currentBidPayload = {
        bid: bidRequest.bidId,
        tid: params.placementId,
        pid: params.publisherId,
        rp: params.reservePrice || 0,
        w: width,
        h: height
      };
      payload.bids.push(currentBidPayload);
    });

    var payloadString = JSON.stringify(payload);
    return {
      method: 'POST',
      url: "//bdf".concat(payload.bids[0].pid, ".bidfluence.com/Prebid"),
      data: payloadString,
      options: {
        contentType: 'text/plain'
      }
    };
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = [];
    var response = serverResponse.body;

    __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](response.Bids, function (currentResponse) {
      var cpm = currentResponse.Cpm || 0;

      if (cpm > 0) {
        var bidResponse = {
          requestId: currentResponse.BidId,
          cpm: cpm,
          width: currentResponse.Width,
          height: currentResponse.Height,
          creativeId: currentResponse.CreativeId,
          ad: currentResponse.Ad,
          currency: 'USD',
          netRevenue: true,
          ttl: 360
        };
        bidResponses.push(bidResponse);
      }
    });

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(serverResponses) {
    if (serverResponses.userSyncs) {
      var syncs = serverResponses.UserSyncs.map(function (sync) {
        return {
          type: sync.Type === 'ifr' ? 'iframe' : 'image',
          url: sync.Url
        };
      });
      return syncs;
    }
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[210]);