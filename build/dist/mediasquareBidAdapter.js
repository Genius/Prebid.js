pbjsChunk([172],{

/***/ 527:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(528);


/***/ }),

/***/ 528:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__ = __webpack_require__(2);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }





var BIDDER_CODE = 'mediasquare';
var BIDDER_URL_PROD = 'https://pbs-front.mediasquare.fr/';
var BIDDER_URL_TEST = 'https://bidder-test.mediasquare.fr/';
var BIDDER_ENDPOINT_AUCTION = 'msq_prebid';
var BIDDER_ENDPOINT_SYNC = 'cookie_sync';
var BIDDER_ENDPOINT_WINNING = 'winning';
var spec = {
  code: BIDDER_CODE,
  aliases: ['msq'],
  // short code
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */]],

  /**
         * Determines whether or not the given bid request is valid.
         *
         * @param {BidRequest} bid The bid params to validate.
         * @return boolean True if this is a valid bid, and false otherwise.
         */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params.owner && bid.params.code);
  },

  /**
         * Make a server request from the list of BidRequests.
         *
         * @param {validBidRequests[]} - an array of bids
         * @return ServerRequest Info describing the request to the server.
         */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var codes = [];
    var endpoint = document.location.search.match(/msq_test=true/) ? BIDDER_URL_TEST : BIDDER_URL_PROD;
    var test = __WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('debug') ? 1 : 0;
    var adunitValue = null;
    Object.keys(validBidRequests).forEach(function (key) {
      adunitValue = validBidRequests[key];
      codes.push({
        owner: adunitValue.params.owner,
        code: adunitValue.params.code,
        adunit: adunitValue.adUnitCode,
        bidId: adunitValue.bidId,
        auctionId: adunitValue.auctionId,
        transactionId: adunitValue.transactionId,
        mediatypes: adunitValue.mediaTypes
      });
    });
    var payload = {
      codes: codes,
      referer: encodeURIComponent(bidderRequest.refererInfo.referer)
    };

    if (bidderRequest) {
      // modules informations (gdpr, ccpa, schain, userId)
      if (bidderRequest.gdprConsent) {
        payload.gdpr = {
          consent_string: bidderRequest.gdprConsent.consentString,
          consent_required: bidderRequest.gdprConsent.gdprApplies
        };
      }

      if (bidderRequest.uspConsent) {
        payload.uspConsent = bidderRequest.uspConsent;
      }

      if (bidderRequest.schain) {
        payload.schain = bidderRequest.schain;
      }

      if (bidderRequest.userId) {
        payload.userId = bidderRequest.userId;
      }
    }

    ;

    if (test) {
      payload.debug = true;
    }

    var payloadString = JSON.stringify(payload);
    return {
      method: 'POST',
      url: endpoint + BIDDER_ENDPOINT_AUCTION,
      data: payloadString
    };
  },

  /**
         * Unpack the response from the server into a list of bids.
         *
         * @param {ServerResponse} serverResponse A successful response from the server.
         * @return {Bid[]} An array of bids which were nested inside the server.
         */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var serverBody = serverResponse.body; // const headerValue = serverResponse.headers.get('some-response-header');

    var bidResponses = [];
    var bidResponse = null;
    var value = null;

    if (serverBody.hasOwnProperty('responses')) {
      Object.keys(serverBody['responses']).forEach(function (key) {
        value = serverBody['responses'][key];
        bidResponse = {
          requestId: value['bid_id'],
          cpm: value['cpm'],
          width: value['width'],
          height: value['height'],
          creativeId: value['creative_id'],
          currency: value['currency'],
          netRevenue: value['net_revenue'],
          ttl: value['ttl'],
          ad: value['ad'],
          mediasquare: {
            'bidder': value['bidder'],
            'code': value['code']
          }
        };

        if (value.hasOwnProperty('deal_id')) {
          bidResponse['dealId'] = value['deal_id'];
        }

        bidResponses.push(bidResponse);
      });
    }

    return bidResponses;
  },

  /**
     * Register the user sync pixels which should be dropped after the auction.
     *
     * @param {SyncOptions} syncOptions Which user syncs are allowed?
     * @param {ServerResponse[]} serverResponses List of server's responses.
     * @return {UserSync[]} The user syncs which should be dropped.
     */
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses, gdprConsent, uspConsent) {
    var params = '';
    var endpoint = document.location.search.match(/msq_test=true/) ? BIDDER_URL_TEST : BIDDER_URL_PROD;

    if (serverResponses[0].body.hasOwnProperty('cookies') && _typeof(serverResponses[0].body.cookies) === 'object') {
      return serverResponses[0].body.cookies;
    } else {
      if (gdprConsent && typeof gdprConsent.consentString === 'string') {
        params += typeof gdprConsent.gdprApplies === 'boolean' ? "&gdpr=".concat(Number(gdprConsent.gdprApplies), "&gdpr_consent=").concat(gdprConsent.consentString) : "&gdpr_consent=".concat(gdprConsent.consentString);
      }

      if (uspConsent && typeof uspConsent === 'string') {
        params += '&uspConsent=' + uspConsent;
      }

      return {
        type: 'iframe',
        url: endpoint + BIDDER_ENDPOINT_SYNC + '?type=iframe' + params
      };
    }
  },

  /**
     * Register bidder specific code, which will execute if a bid from this bidder won the auction
     * @param {Bid} The bid that won the auction
     */
  onBidWon: function onBidWon(bid) {
    // fires a pixel to confirm a winning bid
    var params = [];
    var endpoint = document.location.search.match(/msq_test=true/) ? BIDDER_URL_TEST : BIDDER_URL_PROD;
    var paramsToSearchFor = ['cpm', 'size', 'mediaType', 'currency', 'creativeId', 'adUnitCode', 'timeToRespond', 'auctionId', 'requestId'];

    if (bid.hasOwnProperty('mediasquare')) {
      if (bid['mediasquare'].hasOwnProperty('bidder')) {
        params.push('bidder=' + bid['mediasquare']['bidder']);
      }

      if (bid['mediasquare'].hasOwnProperty('code')) {
        params.push('code=' + bid['mediasquare']['code']);
      }
    }

    ;

    for (var i = 0; i < paramsToSearchFor.length; i++) {
      if (bid.hasOwnProperty(paramsToSearchFor[i])) {
        params.push(paramsToSearchFor[i] + '=' + bid[paramsToSearchFor[i]]);
      }
    }

    if (params.length > 0) {
      params = '?' + params.join('&');
    }

    Object(__WEBPACK_IMPORTED_MODULE_0__src_ajax_js__["a" /* ajax */])(endpoint + BIDDER_ENDPOINT_WINNING + params, null);
    return true;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[527]);