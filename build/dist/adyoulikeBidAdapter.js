pbjsChunk([187],{

/***/ 173:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(174);


/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_url__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find__);

 // import { config } from '../src/config';



var VERSION = '1.0';
var BIDDER_CODE = 'adyoulike';
var DEFAULT_DC = 'hb-api';
var spec = {
  code: BIDDER_CODE,
  aliases: ['ayl'],
  // short code

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    var sizes = getSize(getSizeArray(bid));

    if (!bid.params || !bid.params.placement || !sizes.width || !sizes.height) {
      return false;
    }

    return true;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {bidRequests} - bidRequests.bids[] is an array of AdUnits and bids
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var payload = {
      Version: VERSION,
      Bids: bidRequests.reduce(function (accumulator, bid) {
        var sizesArray = getSizeArray(bid);
        var size = getSize(sizesArray);
        accumulator[bid.bidId] = {};
        accumulator[bid.bidId].PlacementID = bid.params.placement;
        accumulator[bid.bidId].TransactionID = bid.transactionId;
        accumulator[bid.bidId].Width = size.width;
        accumulator[bid.bidId].Height = size.height;
        accumulator[bid.bidId].AvailableSizes = sizesArray.join(',');
        return accumulator;
      }, {}),
      PageRefreshed: getPageRefreshed()
    };

    if (bidderRequest && bidderRequest.gdprConsent) {
      payload.gdprConsent = {
        consentString: bidderRequest.gdprConsent.consentString,
        consentRequired: typeof bidderRequest.gdprConsent.gdprApplies === 'boolean' ? bidderRequest.gdprConsent.gdprApplies : true
      };
    }

    var data = JSON.stringify(payload);
    var options = {
      withCredentials: true
    };
    return {
      method: 'POST',
      url: createEndpoint(bidRequests, bidderRequest),
      data: data,
      options: options
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = []; // For this adapter, serverResponse is a list

    serverResponse.body.forEach(function (response) {
      var bid = createBid(response);

      if (bid) {
        bidResponses.push(bid);
      }
    });
    return bidResponses;
  }
};
/* Get hostname from bids */

function getHostname(bidderRequest) {
  var dcHostname = __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find___default()(bidderRequest, function (bid) {
    return bid.params.DC;
  });

  if (dcHostname) {
    return '-' + dcHostname.params.DC;
  }

  return '';
}
/* Get current page referrer url */


function getReferrerUrl(bidderRequest) {
  var referer = '';

  if (bidderRequest && bidderRequest.refererInfo) {
    referer = encodeURIComponent(bidderRequest.refererInfo.referer);
  }

  return referer;
}
/* Get current page canonical url */


function getCanonicalUrl() {
  var link;

  if (window.self !== window.top) {
    try {
      link = window.top.document.head.querySelector('link[rel="canonical"][href]');
    } catch (e) {}
  } else {
    link = document.head.querySelector('link[rel="canonical"][href]');
  }

  if (link) {
    return link.href;
  }

  return '';
}
/* Get information on page refresh */


function getPageRefreshed() {
  try {
    if (performance && performance.navigation) {
      return performance.navigation.type === performance.navigation.TYPE_RELOAD;
    }
  } catch (e) {}

  return false;
}
/* Create endpoint url */


function createEndpoint(bidRequests, bidderRequest) {
  var host = getHostname(bidRequests);
  return Object(__WEBPACK_IMPORTED_MODULE_1__src_url__["a" /* format */])({
    protocol: 'https',
    host: "".concat(DEFAULT_DC).concat(host, ".omnitagjs.com"),
    pathname: '/hb-api/prebid/v1',
    search: createEndpointQS(bidderRequest)
  });
}
/* Create endpoint query string */


function createEndpointQS(bidderRequest) {
  var qs = {};
  var ref = getReferrerUrl(bidderRequest);

  if (ref) {
    qs.RefererUrl = encodeURIComponent(ref);
  }

  var can = getCanonicalUrl();

  if (can) {
    qs.CanonicalUrl = encodeURIComponent(can);
  }

  return qs;
}

function getSizeArray(bid) {
  var inputSize = bid.sizes;

  if (bid.mediaTypes && bid.mediaTypes.banner) {
    inputSize = bid.mediaTypes.banner.sizes;
  }

  return __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](inputSize);
}
/* Get parsed size from request size */


function getSize(sizesArray) {
  var parsed = {}; // the main requested size is the first one

  var size = sizesArray[0];

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
/* Create bid from response */


function createBid(response) {
  if (!response || !response.Ad) {
    return;
  }

  return {
    requestId: response.BidID,
    width: response.Width,
    height: response.Height,
    ad: response.Ad,
    ttl: 3600,
    creativeId: response.CreativeID,
    cpm: response.Price,
    netRevenue: true,
    currency: 'USD'
  };
}

Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[173]);