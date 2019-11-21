pbjsChunk([29],{

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(250);
module.exports = __webpack_require__(251);


/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spec = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _bidderFactory = __webpack_require__(6);

var _utils = __webpack_require__(0);

var utils = _interopRequireWildcard(_utils);

var _config = __webpack_require__(8);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var BIDDER_CODE = 'medianet';
var BID_URL = 'https://prebid.media.net/rtb/prebid';

pbjs.medianetGlobals = {};

function siteDetails(site) {
  site = site || {};
  var siteData = {
    domain: site.domain || utils.getTopWindowLocation().host,
    page: site.page || utils.getTopWindowUrl(),
    ref: site.ref || utils.getTopWindowReferrer()
  };
  return _extends(siteData, getPageMeta());
}

function getPageMeta() {
  var canonicalUrl = getUrlFromSelector('link[rel="canonical"]', 'href');
  var ogUrl = getUrlFromSelector('meta[property="og:url"]', 'content');
  var twitterUrl = getUrlFromSelector('meta[name="twitter:url"]', 'content');

  return _extends({}, canonicalUrl && { 'canonical_url': canonicalUrl }, ogUrl && { 'og_url': ogUrl }, twitterUrl && { 'twitter_url': twitterUrl });
}

function getUrlFromSelector(selector, attribute) {
  var attr = getAttributeFromSelector(selector, attribute);
  return attr && getAbsoluteUrl(attr);
}

function getAttributeFromSelector(selector, attribute) {
  try {
    var doc = window.top.document;
    var element = doc.querySelector(selector);
    if (element !== null && element[attribute]) {
      return element[attribute];
    }
  } catch (e) {}
}

function getAbsoluteUrl(url) {
  var aTag = window.top.document.createElement('a');
  aTag.href = url;

  return aTag.href;
}

function filterUrlsByType(urls, type) {
  return urls.filter((function (url) {
    return url.type === type;
  }));
}

function transformSizes(sizes) {
  if (utils.isArray(sizes) && sizes.length === 2 && !utils.isArray(sizes[0])) {
    return [getSize(sizes)];
  }

  return sizes.map((function (size) {
    return getSize(size);
  }));
}

function getSize(size) {
  return {
    w: parseInt(size[0], 10),
    h: parseInt(size[1], 10)
  };
}

function configuredParams(params) {
  return {
    customer_id: params.cid,
    prebid_version: pbjs.version
  };
}

function slotParams(bidRequest) {
  // check with Media.net Account manager for  bid floor and crid parameters
  var params = {
    id: bidRequest.bidId,
    ext: {
      dfp_id: bidRequest.adUnitCode
    },
    banner: transformSizes(bidRequest.sizes),
    all: bidRequest.params
  };

  if (bidRequest.params.crid) {
    params.tagid = bidRequest.params.crid.toString();
  }

  var bidFloor = parseFloat(bidRequest.params.bidfloor);
  if (bidFloor) {
    params.bidfloor = bidFloor;
  }
  return params;
}

function generatePayload(bidRequests) {
  return {
    site: siteDetails(bidRequests[0].params.site),
    ext: configuredParams(bidRequests[0].params),
    id: bidRequests[0].bidderRequestId,
    imp: bidRequests.map((function (request) {
      return slotParams(request);
    })),
    tmax: _config.config.getConfig('bidderTimeout')
  };
}

function isValidBid(bid) {
  return bid.no_bid === false && parseFloat(bid.cpm) > 0.0;
}

function fetchCookieSyncUrls(response) {
  if (!utils.isEmpty(response) && response[0].body && response[0].body.ext && utils.isArray(response[0].body.ext.csUrl)) {
    return response[0].body.ext.csUrl;
  }

  return [];
}

var spec = exports.spec = {

  code: BIDDER_CODE,

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {object} bid The bid to validate.
   * @return boolean True if this is a valid bid (if cid is present), and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    if (!bid.params) {
      utils.logError(BIDDER_CODE + ' : Missing bid parameters');
      return false;
    }

    if (!bid.params.cid || !utils.isStr(bid.params.cid) || utils.isEmptyStr(bid.params.cid)) {
      utils.logError(BIDDER_CODE + ' : cid should be a string');
      return false;
    }
    _extends(pbjs.medianetGlobals, !pbjs.medianetGlobals.cid && { cid: bid.params.cid });
    return true;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} bidRequests A non-empty list of bid requests which should be sent to the Server.
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(bidRequests) {
    var payload = generatePayload(bidRequests);

    return {
      method: 'POST',
      url: BID_URL,
      data: JSON.stringify(payload)
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, request) {
    var validBids = [];

    if (!serverResponse || !serverResponse.body) {
      utils.logInfo(BIDDER_CODE + ' : response is empty');
      return validBids;
    }

    var bids = serverResponse.body.bidList;
    if (!utils.isArray(bids) || bids.length === 0) {
      utils.logInfo(BIDDER_CODE + ' : no bids');
      return validBids;
    }
    validBids = bids.filter((function (bid) {
      return isValidBid(bid);
    }));

    return validBids;
  },

  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    var cookieSyncUrls = fetchCookieSyncUrls(serverResponses);

    if (syncOptions.iframeEnabled) {
      return filterUrlsByType(cookieSyncUrls, 'iframe');
    }

    if (syncOptions.pixelEnabled) {
      return filterUrlsByType(cookieSyncUrls, 'image');
    }
  }
};
(0, _bidderFactory.registerBidder)(spec);

/***/ }),

/***/ 251:
/***/ (function(module, exports) {



/***/ })

},[249]);