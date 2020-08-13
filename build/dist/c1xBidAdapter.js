pbjsChunk([260],{

/***/ 313:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(314);


/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c1xAdapter", function() { return c1xAdapter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_userSync_js__ = __webpack_require__(43);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




var BIDDER_CODE = 'c1x';
var URL = 'https://ht.c1exchange.com/ht';
var PIXEL_ENDPOINT = 'https://px.c1exchange.com/pubpixel/';
var LOG_MSG = {
  invalidBid: 'C1X: [ERROR] bidder returns an invalid bid',
  noSite: 'C1X: [ERROR] no site id supplied',
  noBid: 'C1X: [INFO] creating a NO bid for Adunit: ',
  bidWin: 'C1X: [INFO] creating a bid for Adunit: '
};
/**
 * Adapter for requesting bids from C1X header tag server.
 * v3.1 (c) C1X Inc., 2018
 */

var c1xAdapter = {
  code: BIDDER_CODE,
  // check the bids sent to c1x bidder
  isBidRequestValid: function isBidRequestValid(bid) {
    var siteId = bid.params.siteId || '';

    if (!siteId) {
      __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logError"](LOG_MSG.noSite);
    }

    return !!(bid.adUnitCode && siteId);
  },
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var payload = {};
    var tagObj = {};
    var pixelUrl = '';
    var adunits = bidRequests.length;
    var rnd = new Date().getTime();
    var c1xTags = bidRequests.map(bidToTag);
    var bidIdTags = bidRequests.map(bidToShortTag); // include only adUnitCode and bidId from request obj
    // flattened tags in a tag object

    tagObj = c1xTags.reduce(function (current, next) {
      return _extends(current, next);
    });
    var pixelId = tagObj.pixelId;
    payload = {
      adunits: adunits.toString(),
      rnd: rnd.toString(),
      response: 'json',
      compress: 'gzip'
    }; // for GDPR support

    if (bidderRequest && bidderRequest.gdprConsent) {
      payload['consent_string'] = bidderRequest.gdprConsent.consentString;
      payload['consent_required'] = typeof bidderRequest.gdprConsent.gdprApplies === 'boolean' ? bidderRequest.gdprConsent.gdprApplies.toString() : 'true';
    }

    if (pixelId) {
      pixelUrl = PIXEL_ENDPOINT + pixelId;

      if (payload.consent_required) {
        pixelUrl += '&gdpr=' + (bidderRequest.gdprConsent.gdprApplies ? 1 : 0);
        pixelUrl += '&consent=' + encodeURIComponent(bidderRequest.gdprConsent.consentString || '');
      }

      __WEBPACK_IMPORTED_MODULE_2__src_userSync_js__["a" /* userSync */].registerSync('image', BIDDER_CODE, pixelUrl);
    }

    _extends(payload, tagObj);

    var payloadString = stringifyPayload(payload); // ServerRequest object

    return {
      method: 'GET',
      url: URL,
      data: payloadString,
      bids: bidIdTags
    };
  },
  interpretResponse: function interpretResponse(serverResponse, requests) {
    serverResponse = serverResponse.body;
    requests = requests.bids || [];
    var currency = 'USD';
    var bidResponses = [];
    var netRevenue = false;

    if (!serverResponse || serverResponse.error) {
      var errorMessage = serverResponse.error;
      __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logError"](LOG_MSG.invalidBid + errorMessage);
      return bidResponses;
    } else {
      serverResponse.forEach(function (bid) {
        if (bid.bid) {
          if (bid.bidType === 'NET_BID') {
            netRevenue = !netRevenue;
          }

          var curBid = {
            width: bid.width,
            height: bid.height,
            cpm: bid.cpm,
            ad: bid.ad,
            creativeId: bid.crid,
            currency: currency,
            ttl: 300,
            netRevenue: netRevenue
          };

          for (var i = 0; i < requests.length; i++) {
            if (bid.adId === requests[i].adUnitCode) {
              curBid.requestId = requests[i].bidId;
            }
          }

          __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logInfo"](LOG_MSG.bidWin + bid.adId + ' size: ' + curBid.width + 'x' + curBid.height);
          bidResponses.push(curBid);
        } else {
          // no bid
          __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["logInfo"](LOG_MSG.noBid + bid.adId);
        }
      });
    }

    return bidResponses;
  }
};

function bidToTag(bid, index) {
  var tag = {};
  var adIndex = 'a' + (index + 1).toString(); // ad unit id for c1x

  var sizeKey = adIndex + 's';
  var priceKey = adIndex + 'p'; // TODO: Multiple Floor Prices

  var sizesArr = bid.sizes;
  var floorPriceMap = bid.params.floorPriceMap || '';
  tag['site'] = bid.params.siteId || ''; // prevent pixelId becoming undefined when publishers don't fill this param in ad units they have on the same page

  if (bid.params.pixelId) {
    tag['pixelId'] = bid.params.pixelId;
  }

  tag[adIndex] = bid.adUnitCode;
  tag[sizeKey] = sizesArr.reduce(function (prev, current) {
    return prev + (prev === '' ? '' : ',') + current.join('x');
  }, '');
  var newSizeArr = tag[sizeKey].split(',');

  if (floorPriceMap) {
    newSizeArr.forEach(function (size) {
      if (size in floorPriceMap) {
        tag[priceKey] = floorPriceMap[size].toString();
      } // we only accept one cpm price in floorPriceMap

    });
  }

  if (bid.params.pageurl) {
    tag['pageurl'] = bid.params.pageurl;
  }

  return tag;
}

function bidToShortTag(bid) {
  var tag = {};
  tag.adUnitCode = bid.adUnitCode;
  tag.bidId = bid.bidId;
  return tag;
}

function stringifyPayload(payload) {
  var payloadString = '';
  payloadString = JSON.stringify(payload).replace(/":"|","|{"|"}/g, function (foundChar) {
    if (foundChar == '":"') return '=';else if (foundChar == '","') return '&';else return '';
  });
  return payloadString;
}

Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(c1xAdapter);

/***/ })

},[313]);