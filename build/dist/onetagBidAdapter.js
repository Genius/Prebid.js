pbjsChunk([104],{

/***/ 371:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(372);


/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });


function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _require = __webpack_require__(1),
    registerBidder = _require.registerBidder;

var ENDPOINT = 'https://onetag-sys.com/prebid-request';
var USER_SYNC_ENDPOINT = 'https://onetag-sys.com/usync/';
var BIDDER_CODE = 'onetag';
var BANNER = 'banner'; // =======
// Object BidRequest
//
//          .params
// required    .pubId:  string
// optional    .type: "BANNER" | "VIDEO" | "NATIVE"  --> only BANNER at present

/**
 * Determines whether or not the given bid request is valid.
 *
 * @param {BidRequest} bid The bid params to validate.
 * @return boolean True if this is a valid bid, and false otherwise.
 */

function isBidRequestValid(bid) {
  if (typeof bid === 'undefined' || bid.bidder !== BIDDER_CODE || typeof bid.params === 'undefined') {
    return false;
  }

  if (typeof bid.params.pubId !== 'string' || typeof bid.sizes === 'undefined' || bid.sizes.length === 0) {
    return false;
  }

  return true;
}
/**
 * Make a server request from the list of BidRequests.
 *
 * @param {validBidRequests[]} - an array of bids
 * @return ServerRequest Info describing the request to the server.
 */


function buildRequests(validBidRequests, bidderRequest) {
  var bids = validBidRequests.map(requestsToBids);
  var bidObject = {
    'bids': bids
  };
  var pageInfo = getPageInfo();

  var payload = _extends(bidObject, pageInfo);

  if (bidderRequest && bidderRequest.gdprConsent) {
    payload.gdprConsent = {
      consentString: bidderRequest.gdprConsent.consentString,
      consentRequired: bidderRequest.gdprConsent.gdprApplies
    };
  }

  var payloadString = JSON.stringify(payload);
  return {
    method: 'POST',
    url: ENDPOINT,
    data: payloadString
  };
}

function interpretResponse(serverResponse, request) {
  var body = serverResponse.body;
  var bids = [];

  if (typeof serverResponse === 'string') {
    try {
      body = JSON.parse(serverResponse);
    } catch (e) {
      return bids;
    }
  }

  if (!body || body.nobid && body.nobid === true) {
    return bids;
  }

  if (body.bids) {
    body.bids.forEach(function (bid) {
      bids.push({
        requestId: bid.requestId,
        cpm: bid.cpm,
        width: bid.width,
        height: bid.height,
        creativeId: bid.creativeId,
        dealId: bid.dealId ? bid.dealId : '',
        currency: bid.currency,
        netRevenue: false,
        mediaType: bids.type ? bids.type : BANNER,
        ad: bid.ad,
        ttl: bid.ttl || 300
      });
    });
  }

  return bids;
}
/**
 * Returns information about the page needed by the server in an object to be converted in JSON
 * @returns {{location: *, referrer: (*|string), masked: *, wWidth: (*|Number), wHeight: (*|Number), sWidth, sHeight, date: string, timeOffset: number}}
 */


function getPageInfo() {
  var w, d, l, r, m, p, e, t, s;

  for (w = window, d = w.document, l = d.location.href, r = d.referrer, m = 0, e = encodeURIComponent, t = new Date(), s = screen; w !== w.parent;) {
    try {
      p = w.parent;
      l = p.location.href;
      r = p.document.referrer;
      w = p;
    } catch (e) {
      m = top !== w.parent ? 2 : 1;
      break;
    }
  }

  var params = {
    location: e(l),
    referrer: e(r) || '0',
    masked: m,
    wWidth: w.innerWidth,
    wHeight: w.innerHeight,
    oWidth: w.outerWidth,
    oHeight: w.outerHeight,
    sWidth: s.width,
    sHeight: s.height,
    aWidth: s.availWidth,
    aHeight: s.availHeight,
    sLeft: 'screenLeft' in w ? w.screenLeft : w.screenX,
    sTop: 'screenTop' in w ? w.screenTop : w.screenY,
    hLength: history.length,
    date: t.toUTCString(),
    timeOffset: t.getTimezoneOffset()
  };
  return params;
}

function requestsToBids(bid) {
  var toRet = {};
  var params = bid.params;
  toRet['adUnitCode'] = bid.adUnitCode;
  toRet['bidId'] = bid.bidId;
  toRet['bidderRequestId'] = bid.bidderRequestId;
  toRet['auctionId'] = bid.auctionId;
  toRet['transactionId'] = bid.transactionId;
  toRet['sizes'] = [];
  var sizes = bid.sizes;

  for (var i = 0, lenght = sizes.length; i < lenght; i++) {
    var size = sizes[i];
    toRet['sizes'].push({
      width: size[0],
      height: size[1]
    });
  }

  toRet['pubId'] = params.pubId;

  if (params.type) {
    toRet['type'] = params.type;
  }

  if (params.pubClick) {
    toRet['click'] = params.pubClick;
  }

  if (params.dealId) {
    toRet['dealId'] = params.dealId;
  }

  return toRet;
}

function getUserSyncs(syncOptions, serverResponses, gdprConsent) {
  var syncs = [];

  if (syncOptions.iframeEnabled) {
    var rnd = new Date().getTime();
    var params = '?cb=' + rnd;

    if (gdprConsent && typeof gdprConsent.consentString === 'string') {
      params += '&gdpr_consent=' + gdprConsent.consentString;

      if (typeof gdprConsent.gdprApplies === 'boolean') {
        params += '&gdpr=' + (gdprConsent.gdprApplies ? 1 : 0);
      }
    }

    syncs.push({
      type: 'iframe',
      url: USER_SYNC_ENDPOINT + params
    });
  }

  return syncs;
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [BANNER],
  isBidRequestValid: isBidRequestValid,
  buildRequests: buildRequests,
  interpretResponse: interpretResponse,
  getUserSyncs: getUserSyncs
}; // Starting point

registerBidder(spec);

/***/ })

},[371]);