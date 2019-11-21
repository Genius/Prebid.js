pbjsChunk([10],{

/***/ 324:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(325);
module.exports = __webpack_require__(326);


/***/ }),

/***/ 325:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sharethroughAdapterSpec = undefined;

var _bidderFactory = __webpack_require__(6);

var BIDDER_CODE = 'sharethrough';
var VERSION = '2.0.0';
var STR_ENDPOINT = document.location.protocol + '//btlr.sharethrough.com/header-bid/v1';

var sharethroughAdapterSpec = exports.sharethroughAdapterSpec = {
  code: BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.pkey && bid.bidder === BIDDER_CODE;
  },
  buildRequests: function buildRequests(bidRequests) {
    return bidRequests.map((function (bid) {
      return {
        method: 'GET',
        url: STR_ENDPOINT,
        data: {
          bidId: bid.bidId,
          placement_key: bid.params.pkey,
          hbVersion: '0.34.9',
          strVersion: VERSION,
          hbSource: 'prebid'
        }
      };
    }));
  },
  interpretResponse: function interpretResponse(_ref, req) {
    var body = _ref.body;

    if (!Object.keys(body).length) return [];

    var creative = body.creatives[0];

    return [{
      requestId: req.data.bidId,
      width: 0,
      height: 0,
      cpm: creative.cpm,
      creativeId: creative.creative.creative_key,
      deal_id: creative.creative.deal_id,
      currency: 'USD',
      netRevenue: true,
      ttl: 360,
      ad: generateAd(body, req)
    }];
  }
};

function generateAd(body, req) {
  var strRespId = 'str_response_' + req.data.bidId;

  return '\n    <div data-str-native-key="' + req.data.placement_key + '" data-stx-response-name="' + strRespId + '">\n    </div>\n    <script>var ' + strRespId + ' = "' + b64EncodeUnicode(JSON.stringify(body)) + '"</script>\n    <script src="//native.sharethrough.com/assets/sfp-set-targeting.js"></script>\n    <script>\n    (function() {\n      if (!(window.STR && window.STR.Tag) && !(window.top.STR && window.top.STR.Tag)) {\n        const sfp_js = document.createElement(\'script\');\n        sfp_js.src = "//native.sharethrough.com/assets/sfp.js";\n        sfp_js.type = \'text/javascript\';\n        sfp_js.charset = \'utf-8\';\n        try {\n            window.top.document.getElementsByTagName(\'body\')[0].appendChild(sfp_js);\n        } catch (e) {\n          console.log(e);\n        }\n      }\n    })()\n    </script>';
}

// See https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (function toSolidBytes(match, p1) {
    return String.fromCharCode('0x' + p1);
  })));
}

(0, _bidderFactory.registerBidder)(sharethroughAdapterSpec);

/***/ }),

/***/ 326:
/***/ (function(module, exports) {



/***/ })

},[324]);