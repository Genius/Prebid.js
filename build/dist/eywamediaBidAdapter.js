pbjsChunk([194],{

/***/ 308:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(309);


/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);


var BIDDER_CODE = 'eywamedia';
var CURRENCY = 'USD';
var VERSION = '1.0.0';
var TIME_TO_LIVE = 360;
var NET_REVENUE = true;
var COOKIE_NAME = 'emaduuid';
var UUID_LEN = 36;
var SERVER_ENDPOINT = 'https://adtarbostg.eywamedia.com/auctions/prebidjs/3000';
var localWindow = getTopWindow();
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: ['banner'],

  /**
    * Determines whether or not the given bid request is valid.
    * @param {object} bid, bid to validate
    * @return boolean, true if valid, otherwise false
    */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.publisherId;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} bidRequests A non-empty list of bid requests which should be sent to the Server.
   * @return requestPayload Info describing the request to the server.
   */
  buildRequests: function buildRequests(bidRequests, bidRequest) {
    var device = getDeviceInfo();
    var site = getSiteInfo();
    var user = getUserInfo();
    var requestPayload = {
      id: __WEBPACK_IMPORTED_MODULE_0__src_utils__["generateUUID"](),
      publisherId: bidRequests[0].params.publisherId,
      device: device,
      site: site,
      user: user,
      bidPayload: bidRequests,
      cacheBust: new Date().getTime().toString(),
      adapterVersion: VERSION,
      tmax: bidRequest.timeout
    };
    return {
      method: 'POST',
      url: SERVER_ENDPOINT,
      options: {
        contentType: 'application/json'
      },
      data: requestPayload
    };
  },

  /**
   * Makes Eywamedia Ad Server response compatible to Prebid specs
   * @param serverResponse successful response from Ad Server
   * @param bidderRequest original bidRequest
   * @return {Bid[]} an array of bids
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidObject, response;
    var bidRespones = [];
    var responses = serverResponse.body;

    for (var i = 0; i < responses.length; i++) {
      response = responses[i];
      bidObject = {
        requestId: response.bidId,
        cpm: response.cpm,
        width: parseInt(response.width),
        height: parseInt(response.height),
        creativeId: response.bidId,
        currency: CURRENCY,
        netRevenue: NET_REVENUE,
        ttl: TIME_TO_LIVE,
        ad: response.ad,
        bidderCode: BIDDER_CODE,
        transactionId: response.transactionId,
        mediaType: response.respType
      };
      bidRespones.push(bidObject);
    }

    return bidRespones;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);
/***************************************
 * Helper Functions
 ***************************************/

/**
 * get device type
 */

function getDeviceType() {
  var ua = navigator.userAgent; // Tablets must be checked before phones.

  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 5; // "Tablet"
  }

  if (/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/.test(ua)) {
    return 4; // "Phone"
  }

  return 2; // Personal Computers
}

;
/**
 * get device info
 */

function getDeviceInfo() {
  var language = navigator.language;
  return {
    ua: navigator.userAgent,
    language: navigator[language],
    devicetype: getDeviceType(),
    dnt: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getDNT"](),
    geo: {},
    js: 1
  };
}

;
/**
 * get site info
 */

function getSiteInfo() {
  var topLocation = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowLocation"]();
  return {
    domain: topLocation.hostname,
    page: topLocation.href,
    referrer: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowReferrer"](),
    desc: getPageDescription(),
    title: localWindow.document.title
  };
}

;
/**
 * get user info
 */

function getUserInfo() {
  return {
    id: getUserID()
  };
}

;
/**
 * get user Id
 */

var getUserID = function getUserID() {
  var i = document.cookie.indexOf(COOKIE_NAME);

  if (i === -1) {
    var uuid = __WEBPACK_IMPORTED_MODULE_0__src_utils__["generateUUID"]();
    document.cookie = "".concat(COOKIE_NAME, "=").concat(uuid, "; path=/");
    return uuid;
  }

  var j = i + COOKIE_NAME.length + 1;
  return document.cookie.substring(j, j + UUID_LEN);
};
/**
 * get page description
 */


function getPageDescription() {
  if (document.querySelector('meta[name="description"]')) {
    return document.querySelector('meta[name="description"]').getAttribute('content'); // Value of the description metadata from the publisher's page.
  } else {
    return '';
  }
}

;

function getTopWindow() {
  try {
    return window.top;
  } catch (e) {
    return window;
  }
}

;

/***/ })

},[308]);