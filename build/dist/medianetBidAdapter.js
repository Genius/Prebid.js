pbjsChunk([117],{

/***/ 345:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(346);


/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_url__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_refererDetection__ = __webpack_require__(30);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }







var BIDDER_CODE = 'medianet';
var BID_URL = 'https://prebid.media.net/rtb/prebid';
var SLOT_VISIBILITY = {
  NOT_DETERMINED: 0,
  ABOVE_THE_FOLD: 1,
  BELOW_THE_FOLD: 2
};
var EVENTS = {
  TIMEOUT_EVENT_NAME: 'client_timeout',
  BID_WON_EVENT_NAME: 'client_bid_won'
};
var EVENT_PIXEL_URL = 'qsearch-a.akamaihd.net/log';
var refererInfo = Object(__WEBPACK_IMPORTED_MODULE_5__src_refererDetection__["b" /* getRefererInfo */])();
var mnData = {};
mnData.urlData = {
  domain: __WEBPACK_IMPORTED_MODULE_3__src_url__["c" /* parse */](refererInfo.referer).host,
  page: refererInfo.referer,
  isTop: refererInfo.reachedTop
};
pbjs.medianetGlobals = {};

function getTopWindowReferrer() {
  try {
    return window.top.document.referrer;
  } catch (e) {
    return document.referrer;
  }
}

function siteDetails(site) {
  site = site || {};
  var siteData = {
    domain: site.domain || mnData.urlData.domain,
    page: site.page || mnData.urlData.page,
    ref: site.ref || getTopWindowReferrer(),
    isTop: site.isTop || mnData.urlData.isTop
  };
  return _extends(siteData, getPageMeta());
}

function getPageMeta() {
  if (mnData.pageMeta) {
    return mnData.pageMeta;
  }

  var canonicalUrl = getUrlFromSelector('link[rel="canonical"]', 'href');
  var ogUrl = getUrlFromSelector('meta[property="og:url"]', 'content');
  var twitterUrl = getUrlFromSelector('meta[name="twitter:url"]', 'content');
  mnData.pageMeta = _extends({}, canonicalUrl && {
    'canonical_url': canonicalUrl
  }, ogUrl && {
    'og_url': ogUrl
  }, twitterUrl && {
    'twitter_url': twitterUrl
  });
  return mnData.pageMeta;
}

function getUrlFromSelector(selector, attribute) {
  var attr = getAttributeFromSelector(selector, attribute);
  return attr && getAbsoluteUrl(attr);
}

function getAttributeFromSelector(selector, attribute) {
  try {
    var doc = __WEBPACK_IMPORTED_MODULE_1__src_utils__["getWindowTop"]().document;
    var element = doc.querySelector(selector);

    if (element !== null && element[attribute]) {
      return element[attribute];
    }
  } catch (e) {}
}

function getAbsoluteUrl(url) {
  var aTag = __WEBPACK_IMPORTED_MODULE_1__src_utils__["getWindowTop"]().document.createElement('a');
  aTag.href = url;
  return aTag.href;
}

function filterUrlsByType(urls, type) {
  return urls.filter(function (url) {
    return url.type === type;
  });
}

function transformSizes(sizes) {
  if (__WEBPACK_IMPORTED_MODULE_1__src_utils__["isArray"](sizes) && sizes.length === 2 && !__WEBPACK_IMPORTED_MODULE_1__src_utils__["isArray"](sizes[0])) {
    return [getSize(sizes)];
  }

  return sizes.map(function (size) {
    return getSize(size);
  });
}

function getSize(size) {
  return {
    w: parseInt(size[0], 10),
    h: parseInt(size[1], 10)
  };
}

function getWindowSize() {
  return {
    w: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || -1,
    h: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || -1
  };
}

function getCoordinates(id) {
  var element = document.getElementById(id);

  if (element && element.getBoundingClientRect) {
    var rect = element.getBoundingClientRect();
    var coordinates = {};
    coordinates.top_left = {
      y: rect.top,
      x: rect.left
    };
    coordinates.bottom_right = {
      y: rect.bottom,
      x: rect.right
    };
    return coordinates;
  }

  return null;
}

function extParams(params, gdpr) {
  var ext = {
    customer_id: params.cid,
    prebid_version: pbjs.version
  };
  ext.gdpr_applies = !!(gdpr && gdpr.gdprApplies);

  if (ext.gdpr_applies) {
    ext.gdpr_consent_string = gdpr.consentString || '';
  }

  var windowSize = spec.getWindowSize();

  if (windowSize.w !== -1 && windowSize.h !== -1) {
    ext.screen = windowSize;
  }

  return ext;
}

function slotParams(bidRequest) {
  // check with Media.net Account manager for  bid floor and crid parameters
  var params = {
    id: bidRequest.bidId,
    ext: {
      dfp_id: bidRequest.adUnitCode,
      display_count: bidRequest.bidRequestsCount
    },
    all: bidRequest.params
  };
  var bannerSizes = __WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](bidRequest, 'mediaTypes.banner.sizes') || bidRequest.sizes || [];

  if (bannerSizes.length > 0) {
    params.banner = transformSizes(bannerSizes);
  }

  if (bidRequest.nativeParams) {
    try {
      params.native = JSON.stringify(bidRequest.nativeParams);
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_1__src_utils__["logError"]("".concat(BIDDER_CODE, " : Incorrect JSON : bidRequest.nativeParams"));
    }
  }

  if (bidRequest.params.crid) {
    params.tagid = bidRequest.params.crid.toString();
  }

  var bidFloor = parseFloat(bidRequest.params.bidfloor);

  if (bidFloor) {
    params.bidfloor = bidFloor;
  }

  var coordinates = getCoordinates(bidRequest.adUnitCode);

  if (coordinates && params.banner && params.banner.length !== 0) {
    var normCoordinates = normalizeCoordinates(coordinates);
    params.ext.coordinates = normCoordinates;
    params.ext.viewability = getSlotVisibility(coordinates.top_left, getMinSize(params.banner));

    if (getSlotVisibility(normCoordinates.top_left, getMinSize(params.banner)) > 0.5) {
      params.ext.visibility = SLOT_VISIBILITY.ABOVE_THE_FOLD;
    } else {
      params.ext.visibility = SLOT_VISIBILITY.BELOW_THE_FOLD;
    }
  } else {
    params.ext.visibility = SLOT_VISIBILITY.NOT_DETERMINED;
  }

  return params;
}

function getMinSize(sizes) {
  return sizes.reduce(function (min, size) {
    return size.h * size.w < min.h * min.w ? size : min;
  });
}

function getSlotVisibility(topLeft, size) {
  var maxArea = size.w * size.h;
  var windowSize = spec.getWindowSize();
  var bottomRight = {
    x: topLeft.x + size.w,
    y: topLeft.y + size.h
  };

  if (maxArea === 0 || windowSize.w === -1 || windowSize.h === -1) {
    return 0;
  }

  return getOverlapArea(topLeft, bottomRight, {
    x: 0,
    y: 0
  }, {
    x: windowSize.w,
    y: windowSize.h
  }) / maxArea;
} // find the overlapping area between two rectangles


function getOverlapArea(topLeft1, bottomRight1, topLeft2, bottomRight2) {
  // If no overlap, return 0
  if (topLeft1.x > bottomRight2.x || bottomRight1.x < topLeft2.x || topLeft1.y > bottomRight2.y || bottomRight1.y < topLeft2.y) {
    return 0;
  } // return overlapping area : [ min of rightmost/bottommost co-ordinates ] - [ max of leftmost/topmost co-ordinates ]


  return (Math.min(bottomRight1.x, bottomRight2.x) - Math.max(topLeft1.x, topLeft2.x)) * (Math.min(bottomRight1.y, bottomRight2.y) - Math.max(topLeft1.y, topLeft2.y));
}

function normalizeCoordinates(coordinates) {
  return {
    top_left: {
      x: coordinates.top_left.x + window.pageXOffset,
      y: coordinates.top_left.y + window.pageYOffset
    },
    bottom_right: {
      x: coordinates.bottom_right.x + window.pageXOffset,
      y: coordinates.bottom_right.y + window.pageYOffset
    }
  };
}

function generatePayload(bidRequests, bidderRequests) {
  return {
    site: siteDetails(bidRequests[0].params.site),
    ext: extParams(bidRequests[0].params, bidderRequests.gdprConsent),
    id: bidRequests[0].auctionId,
    imp: bidRequests.map(function (request) {
      return slotParams(request);
    }),
    tmax: bidderRequests.timeout || __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('bidderTimeout')
  };
}

function isValidBid(bid) {
  return bid.no_bid === false && parseFloat(bid.cpm) > 0.0;
}

function fetchCookieSyncUrls(response) {
  if (!__WEBPACK_IMPORTED_MODULE_1__src_utils__["isEmpty"](response) && response[0].body && response[0].body.ext && __WEBPACK_IMPORTED_MODULE_1__src_utils__["isArray"](response[0].body.ext.csUrl)) {
    return response[0].body.ext.csUrl;
  }

  return [];
}

function getLoggingData(event, data) {
  data = __WEBPACK_IMPORTED_MODULE_1__src_utils__["isArray"](data) && data || [];
  var params = {};
  params.logid = 'kfk';
  params.evtid = 'projectevents';
  params.project = 'prebid';
  params.acid = __WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](data, '0.auctionId') || '';
  params.cid = pbjs.medianetGlobals.cid || '';
  params.crid = data.map(function (adunit) {
    return __WEBPACK_IMPORTED_MODULE_1__src_utils__["deepAccess"](adunit, 'params.0.crid') || adunit.adUnitCode;
  }).join('|');
  params.adunit_count = data.length || 0;
  params.dn = mnData.urlData.domain || '';
  params.requrl = mnData.urlData.page || '';
  params.istop = mnData.urlData.isTop || '';
  params.event = event.name || '';
  params.value = event.value || '';
  params.rd = event.related_data || '';
  return params;
}

function logEvent(event, data) {
  var getParams = {
    protocol: 'https',
    hostname: EVENT_PIXEL_URL,
    search: getLoggingData(event, data)
  };
  __WEBPACK_IMPORTED_MODULE_1__src_utils__["triggerPixel"](__WEBPACK_IMPORTED_MODULE_3__src_url__["a" /* format */](getParams));
}

function clearMnData() {
  mnData = {};
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_4__src_mediaTypes__["c" /* NATIVE */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {object} bid The bid to validate.
   * @return boolean True if this is a valid bid (if cid is present), and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    if (!bid.params) {
      __WEBPACK_IMPORTED_MODULE_1__src_utils__["logError"]("".concat(BIDDER_CODE, " : Missing bid parameters"));
      return false;
    }

    if (!bid.params.cid || !__WEBPACK_IMPORTED_MODULE_1__src_utils__["isStr"](bid.params.cid) || __WEBPACK_IMPORTED_MODULE_1__src_utils__["isEmptyStr"](bid.params.cid)) {
      __WEBPACK_IMPORTED_MODULE_1__src_utils__["logError"]("".concat(BIDDER_CODE, " : cid should be a string"));
      return false;
    }

    _extends(pbjs.medianetGlobals, !pbjs.medianetGlobals.cid && {
      cid: bid.params.cid
    });

    return true;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} bidRequests A non-empty list of bid requests which should be sent to the Server.
   * @param {BidderRequests} bidderRequests
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(bidRequests, bidderRequests) {
    var payload = generatePayload(bidRequests, bidderRequests);
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
      __WEBPACK_IMPORTED_MODULE_1__src_utils__["logInfo"]("".concat(BIDDER_CODE, " : response is empty"));
      return validBids;
    }

    var bids = serverResponse.body.bidList;

    if (!__WEBPACK_IMPORTED_MODULE_1__src_utils__["isArray"](bids) || bids.length === 0) {
      __WEBPACK_IMPORTED_MODULE_1__src_utils__["logInfo"]("".concat(BIDDER_CODE, " : no bids"));
      return validBids;
    }

    validBids = bids.filter(function (bid) {
      return isValidBid(bid);
    });
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
  },

  /**
   * @param {TimedOutBid} timeoutData
   */
  onTimeout: function onTimeout(timeoutData) {
    try {
      var eventData = {
        name: EVENTS.TIMEOUT_EVENT_NAME,
        value: timeoutData.length,
        related_data: timeoutData[0].timeout || __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('bidderTimeout')
      };
      logEvent(eventData, timeoutData);
    } catch (e) {}
  },

  /**
   * @param {TimedOutBid} timeoutData
   */
  onBidWon: function onBidWon(bid) {
    try {
      var eventData = {
        name: EVENTS.BID_WON_EVENT_NAME,
        value: bid.cpm
      };
      logEvent(eventData, [bid]);
    } catch (e) {}
  },
  clearMnData: clearMnData,
  getWindowSize: getWindowSize
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[345]);