pbjsChunk([58],{

/***/ 802:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(803);


/***/ }),

/***/ 803:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config_js__ = __webpack_require__(3);



var domain = 'hb.justbidit.xyz';
var httpsPort = 8843;
var path = '/prebid';
var ENDPOINT = "https://".concat(domain, ":").concat(httpsPort).concat(path);
var BIDDER_CODE = 'waardex';
/**
 * @param {Array} requestSizes
 *
 * @returns {Array}
 * */

function transformSizes(requestSizes) {
  var sizes = [];

  if (Array.isArray(requestSizes) && !Array.isArray(requestSizes[0])) {
    sizes[0] = {
      width: parseInt(requestSizes[0], 10) || 0,
      height: parseInt(requestSizes[1], 10) || 0
    };
  } else if (Array.isArray(requestSizes) && Array.isArray(requestSizes[0])) {
    sizes = requestSizes.map(function (item) {
      return {
        width: parseInt(item[0], 10) || 0,
        height: parseInt(item[1], 10) || 0
      };
    });
  }

  return sizes;
}
/**
 * @param {Object} banner
 * @param {Array<Array[Number]>} banner.sizes
 *
 * @returns {Object}
 * */


function createBannerObject(banner) {
  return {
    sizes: transformSizes(banner.sizes)
  };
}
/**
 * @param {Array} validBidRequests
 *
 * @returns {Object}
 * */


function buildBidRequests(validBidRequests) {
  return validBidRequests.map(function (validBidRequest) {
    var params = validBidRequest.params;
    var item = {
      bidId: validBidRequest.bidId,
      bidfloor: parseFloat(params.bidfloor) || 0,
      position: parseInt(params.position) || 1,
      instl: parseInt(params.instl) || 0
    };

    if (validBidRequest.mediaTypes[__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */]]) {
      item[__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */]] = createBannerObject(validBidRequest.mediaTypes[__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */]]);
    }

    return item;
  });
}
/**
 * @param {Object} bidderRequest
 * @param {String} bidderRequest.userAgent
 * @param {String} bidderRequest.refererInfo
 * @param {String} bidderRequest.uspConsent
 * @param {Object} bidderRequest.gdprConsent
 * @param {String} bidderRequest.gdprConsent.consentString
 * @param {String} bidderRequest.gdprConsent.gdprApplies
 *
 * @returns {Object} - {
 *   ua: string,
 *   language: string,
 *   [referer]: string,
 *   [us_privacy]: string,
 *   [consent_string]: string,
 *   [consent_required]: string,
 *   [coppa]: boolean,
 * }
 * */


function getCommonBidsData(bidderRequest) {
  var payload = {
    ua: navigator.userAgent || '',
    language: navigator.language && navigator.language.indexOf('-') !== -1 ? navigator.language.split('-')[0] : ''
  };

  if (bidderRequest && bidderRequest.refererInfo) {
    payload.referer = encodeURIComponent(bidderRequest.refererInfo.referer);
  }

  if (bidderRequest && bidderRequest.uspConsent) {
    payload.us_privacy = bidderRequest.uspConsent;
  }

  if (bidderRequest && bidderRequest.gdprConsent) {
    payload.gdpr_consent = {
      consent_string: bidderRequest.gdprConsent.consentString,
      consent_required: bidderRequest.gdprConsent.gdprApplies
    };
  }

  payload.coppa = !!__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('coppa');
  return payload;
}
/**
 * this function checks either bid response is valid or noе
 *
 * @param {Object} bid
 * @param {string} bid.requestId
 * @param {number} bid.cpm
 * @param {string} bid.creativeId
 * @param {number} bid.ttl
 * @param {string} bid.currency
 * @param {number} bid.width
 * @param {number} bid.height
 * @param {string} bid.ad
 *
 * @returns {boolean}
 * */


function isBidValid(bid) {
  if (!bid.requestId || !bid.cpm || !bid.creativeId || !bid.ttl || !bid.currency) {
    return false;
  }

  return Boolean(bid.width && bid.height && bid.ad);
}
/**
 * @param {Object} serverBid
 *
 * @returns {Object|null}
 * */


function createBid(serverBid) {
  var bid = {
    requestId: serverBid.id,
    cpm: serverBid.price,
    currency: 'USD',
    width: serverBid.w,
    height: serverBid.h,
    creativeId: serverBid.crid,
    netRevenue: true,
    ttl: 3000,
    ad: serverBid.adm,
    dealId: serverBid.dealid,
    meta: {
      cid: serverBid.cid,
      adomain: serverBid.adomain,
      mediaType: serverBid.ext.mediaType
    }
  };
  return isBidValid(bid) ? bid : null;
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return Boolean(bid.bidId && bid.params && +bid.params.zoneId);
  },

  /**
   * @param {Object[]} validBidRequests -  array of valid bid requests
   * @param {Object} bidderRequest - an array of valid bid requests
   *
   * */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var payload = getCommonBidsData(bidderRequest);
    payload.bidRequests = buildBidRequests(validBidRequests);
    var zoneId = '';

    if (validBidRequests[0] && validBidRequests[0].params && +validBidRequests[0].params.zoneId) {
      zoneId = +validBidRequests[0].params.zoneId;
    }

    var url = "".concat(ENDPOINT, "?pubId=").concat(zoneId);
    return {
      method: 'POST',
      url: url,
      data: payload
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bids = [];
    serverResponse = serverResponse.body;

    if (serverResponse.seatbid && serverResponse.seatbid[0]) {
      var oneSeatBid = serverResponse.seatbid[0];
      oneSeatBid.bid.forEach(function (serverBid) {
        var bid = createBid(serverBid);

        if (bid) {
          bids.push(bid);
        }
      });
    }

    return bids;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[802]);