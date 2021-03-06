pbjsChunk([171],{

/***/ 358:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(359);


/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var BIDDER_CODE = 'inskin';
var CONFIG = {
  'inskin': {
    'BASE_URI': 'https://mfad.inskinad.com/api/v2'
  }
};
var spec = {
  code: BIDDER_CODE,

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params.networkId && bid.params.siteId);
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {validBidRequests[]} - an array of bids
   * @param {bidderRequest} - the full bidder request object
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    // Do we need to group by bidder? i.e. to make multiple requests for
    // different endpoints.
    var ret = {
      method: 'POST',
      url: '',
      data: '',
      bidRequest: []
    };

    if (validBidRequests.length < 1) {
      return ret;
    }

    var ENDPOINT_URL;

    var data = _extends({
      placements: [],
      time: Date.now(),
      user: {},
      url: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"](),
      enableBotFiltering: true,
      includePricingData: true,
      parallel: true
    }, validBidRequests[0].params);

    if (bidderRequest && bidderRequest.gdprConsent) {
      data.consent = {
        gdprVendorId: 150,
        gdprConsentString: bidderRequest.gdprConsent.consentString,
        // will check if the gdprApplies field was populated with a boolean value (ie from page config).  If it's undefined, then default to true
        gdprConsentRequired: typeof bidderRequest.gdprConsent.gdprApplies === 'boolean' ? bidderRequest.gdprConsent.gdprApplies : true
      };
    }

    validBidRequests.map(function (bid) {
      var config = CONFIG[bid.bidder];
      ENDPOINT_URL = config.BASE_URI;

      var placement = _extends({
        divName: bid.bidId,
        adTypes: bid.adTypes || getSize(bid.sizes),
        eventIds: [40, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295]
      }, bid.params);

      placement.adTypes.push(5, 9, 163, 2163, 3006);

      if (placement.networkId && placement.siteId) {
        data.placements.push(placement);
      }
    });
    ret.data = JSON.stringify(data);
    ret.bidRequest = validBidRequests;
    ret.url = ENDPOINT_URL;
    return ret;
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bid;
    var bids;
    var bidId;
    var bidObj;
    var bidResponses = [];
    var bidsMap = {};
    bids = bidRequest.bidRequest;
    serverResponse = (serverResponse || {}).body;

    for (var i = 0; i < bids.length; i++) {
      bid = {};
      bidObj = bids[i];
      bidId = bidObj.bidId;
      bidsMap[bidId] = bidObj;

      if (serverResponse) {
        var decision = serverResponse.decisions && serverResponse.decisions[bidId];
        var data = decision && decision.contents && decision.contents[0] && decision.contents[0].data;
        var pubCPM = data && data.customData && data.customData.pubCPM;
        var clearPrice = decision && decision.pricing && decision.pricing.clearPrice;
        var price = pubCPM || clearPrice;

        if (decision && price) {
          decision.impressionUrl += '&property:pubcpm=' + price;
          bidObj.price = price;
          bid.requestId = bidId;
          bid.cpm = price;
          bid.width = decision.width;
          bid.height = decision.height;
          bid.ad = retrieveAd(bidId, decision);
          bid.currency = 'USD';
          bid.creativeId = decision.adId;
          bid.ttl = 360;
          bid.netRevenue = true;
          bid.referrer = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"]();
          bidResponses.push(bid);
        }
      }
    }

    if (bidResponses.length) {
      window.addEventListener('message', function (e) {
        if (!e.data || e.data.from !== 'ism-bid') {
          return;
        }

        var decision = serverResponse.decisions && serverResponse.decisions[e.data.bidId];

        if (!decision) {
          return;
        }

        var id = 'ism_tag_' + Math.floor(Math.random() * 10e16);
        window[id] = {
          bidId: e.data.bidId,
          bidPrice: bidsMap[e.data.bidId].price,
          serverResponse: serverResponse
        };
        var script = document.createElement('script');
        script.src = 'https://cdn.inskinad.com/isfe/publishercode/' + bidsMap[e.data.bidId].params.siteId + '/default.js?autoload&id=' + id;
        document.getElementsByTagName('head')[0].appendChild(script);
      });
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    var userSyncs = [];

    if (syncOptions.pixelEnabled) {
      userSyncs.push({
        type: 'image',
        url: 'https://e.serverbid.com/udb/9969/match?redir=https%3A%2F%2Fmfad.inskinad.com%2Fudb%2F9874%2Fpool%2Fset%2Fi.gif%3FpoolId%3D9969%26poolKey%3D'
      });
      userSyncs.push({
        type: 'image',
        url: 'https://ssum.casalemedia.com/usermatchredir?s=185638&cb=https%3A%2F%2Fmfad.inskinad.com%2Fudb%2F9874%2Fsync%2Fi.gif%3FpartnerId%3D1%26userId%3D'
      });
    }

    if (syncOptions.iframeEnabled) {
      userSyncs.push({
        type: 'iframe',
        url: 'https://ssum-sec.casalemedia.com/usermatch?s=184665&cb=https%3A%2F%2Fmfad.inskinad.com%2Fudb%2F9874%2Fsync%2Fi.gif%3FpartnerId%3D1%26userId%3D'
      });
    }

    return userSyncs;
  }
};
var sizeMap = [null, '120x90', '120x90', '468x60', '728x90', '300x250', '160x600', '120x600', '300x100', '180x150', '336x280', '240x400', '234x60', '88x31', '120x60', '120x240', '125x125', '220x250', '250x250', '250x90', '0x0', '200x90', '300x50', '320x50', '320x480', '185x185', '620x45', '300x125', '800x250'];
sizeMap[77] = '970x90';
sizeMap[123] = '970x250';
sizeMap[43] = '300x600';

function getSize(sizes) {
  var result = [];
  sizes.forEach(function (size) {
    var index = sizeMap.indexOf(size[0] + 'x' + size[1]);

    if (index >= 0) {
      result.push(index);
    }
  });
  return result;
}

function retrieveAd(bidId, decision) {
  return "<script>window.top.postMessage({from: 'ism-bid', bidId: '" + bidId + "'}, '*');\x3c/script>" + __WEBPACK_IMPORTED_MODULE_0__src_utils__["createTrackPixelHtml"](decision.impressionUrl);
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[358]);