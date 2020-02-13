pbjsChunk([230],{

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(223);


/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_url__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_config__ = __webpack_require__(3);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }






var BIDDER_CODE = 'brightcom';
var URL = 'https://brightcombid.marphezis.com/hb';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["b" /* BANNER */]],
  isBidRequestValid: isBidRequestValid,
  buildRequests: buildRequests,
  interpretResponse: interpretResponse,
  getUserSyncs: getUserSyncs
};

function buildRequests(bidReqs, bidderRequest) {
  try {
    var referrer = '';

    if (bidderRequest && bidderRequest.refererInfo) {
      referrer = bidderRequest.refererInfo.referer;
    }

    var brightcomImps = [];
    var publisherId = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('publisherId', bidReqs[0].params);

    __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](bidReqs, function (bid) {
      bid.sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](bid.sizes) && __WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](bid.sizes[0]) ? bid.sizes : [bid.sizes];
      bid.sizes = bid.sizes.filter(function (size) {
        return __WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](size);
      });
      var processedSizes = bid.sizes.map(function (size) {
        return {
          w: parseInt(size[0], 10),
          h: parseInt(size[1], 10)
        };
      });
      var element = document.getElementById(bid.adUnitCode);

      var minSize = _getMinSize(processedSizes);

      var viewabilityAmount = _isViewabilityMeasurable(element) ? _getViewability(element, __WEBPACK_IMPORTED_MODULE_0__src_utils__["getWindowTop"](), minSize) : 'na';
      var viewabilityAmountRounded = isNaN(viewabilityAmount) ? viewabilityAmount : Math.round(viewabilityAmount);
      var imp = {
        id: bid.bidId,
        banner: {
          format: processedSizes,
          ext: {
            viewability: viewabilityAmountRounded
          }
        },
        tagid: String(bid.adUnitCode)
      };
      var bidFloor = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('bidFloor', bid.params);

      if (bidFloor) {
        imp.bidfloor = bidFloor;
      }

      brightcomImps.push(imp);
    });

    var brightcomBidReq = {
      id: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getUniqueIdentifierStr"](),
      imp: brightcomImps,
      site: {
        domain: __WEBPACK_IMPORTED_MODULE_1__src_url__["c" /* parse */](referrer).host,
        page: referrer,
        publisher: {
          id: publisherId
        }
      },
      device: {
        devicetype: _getDeviceType(),
        w: screen.width,
        h: screen.height
      },
      tmax: __WEBPACK_IMPORTED_MODULE_4__src_config__["b" /* config */].getConfig('bidderTimeout')
    };
    return {
      method: 'POST',
      url: URL,
      data: JSON.stringify(brightcomBidReq),
      options: {
        contentType: 'text/plain',
        withCredentials: false
      }
    };
  } catch (e) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](e, {
      bidReqs: bidReqs,
      bidderRequest: bidderRequest
    });
  }
}

function isBidRequestValid(bid) {
  if (bid.bidder !== BIDDER_CODE || typeof bid.params === 'undefined') {
    return false;
  }

  if (typeof bid.params.publisherId === 'undefined') {
    return false;
  }

  return true;
}

function interpretResponse(serverResponse) {
  if (!serverResponse.body || _typeof(serverResponse.body) != 'object') {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]('Brightcom server returned empty/non-json response: ' + JSON.stringify(serverResponse.body));
    return [];
  }

  var _serverResponse$body = serverResponse.body,
      id = _serverResponse$body.id,
      seatbid = _serverResponse$body.seatbid;

  try {
    var brightcomBidResponses = [];

    if (id && seatbid && seatbid.length > 0 && seatbid[0].bid && seatbid[0].bid.length > 0) {
      seatbid[0].bid.map(function (brightcomBid) {
        brightcomBidResponses.push({
          requestId: brightcomBid.impid,
          cpm: parseFloat(brightcomBid.price),
          width: parseInt(brightcomBid.w),
          height: parseInt(brightcomBid.h),
          creativeId: brightcomBid.crid || brightcomBid.id,
          currency: 'USD',
          netRevenue: true,
          mediaType: __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["b" /* BANNER */],
          ad: _getAdMarkup(brightcomBid),
          ttl: 60
        });
      });
    }

    return brightcomBidResponses;
  } catch (e) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](e, {
      id: id,
      seatbid: seatbid
    });
  }
} // Don't do user sync for now


function getUserSyncs(syncOptions, responses, gdprConsent) {
  return [];
}

function _isMobile() {
  return /(ios|ipod|ipad|iphone|android)/i.test(navigator.userAgent);
}

function _isConnectedTV() {
  return /(smart[-]?tv|hbbtv|appletv|googletv|hdmi|netcast\.tv|viera|nettv|roku|\bdtv\b|sonydtv|inettvbrowser|\btv\b)/i.test(navigator.userAgent);
}

function _getDeviceType() {
  return _isMobile() ? 1 : _isConnectedTV() ? 3 : 2;
}

function _getAdMarkup(bid) {
  var adm = bid.adm;

  if ('nurl' in bid) {
    adm += __WEBPACK_IMPORTED_MODULE_0__src_utils__["createTrackPixelHtml"](bid.nurl);
  }

  return adm;
}

function _isViewabilityMeasurable(element) {
  return !_isIframe() && element !== null;
}

function _getViewability(element, topWin) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      w = _ref.w,
      h = _ref.h;

  return __WEBPACK_IMPORTED_MODULE_0__src_utils__["getWindowTop"]().document.visibilityState === 'visible' ? _getPercentInView(element, topWin, {
    w: w,
    h: h
  }) : 0;
}

function _isIframe() {
  try {
    return __WEBPACK_IMPORTED_MODULE_0__src_utils__["getWindowSelf"]() !== __WEBPACK_IMPORTED_MODULE_0__src_utils__["getWindowTop"]();
  } catch (e) {
    return true;
  }
}

function _getMinSize(sizes) {
  return sizes.reduce(function (min, size) {
    return size.h * size.w < min.h * min.w ? size : min;
  });
}

function _getBoundingBox(element) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      w = _ref2.w,
      h = _ref2.h;

  var _element$getBoundingC = element.getBoundingClientRect(),
      width = _element$getBoundingC.width,
      height = _element$getBoundingC.height,
      left = _element$getBoundingC.left,
      top = _element$getBoundingC.top,
      right = _element$getBoundingC.right,
      bottom = _element$getBoundingC.bottom;

  if ((width === 0 || height === 0) && w && h) {
    width = w;
    height = h;
    right = left + w;
    bottom = top + h;
  }

  return {
    width: width,
    height: height,
    left: left,
    top: top,
    right: right,
    bottom: bottom
  };
}

function _getIntersectionOfRects(rects) {
  var bbox = {
    left: rects[0].left,
    right: rects[0].right,
    top: rects[0].top,
    bottom: rects[0].bottom
  };

  for (var i = 1; i < rects.length; ++i) {
    bbox.left = Math.max(bbox.left, rects[i].left);
    bbox.right = Math.min(bbox.right, rects[i].right);

    if (bbox.left >= bbox.right) {
      return null;
    }

    bbox.top = Math.max(bbox.top, rects[i].top);
    bbox.bottom = Math.min(bbox.bottom, rects[i].bottom);

    if (bbox.top >= bbox.bottom) {
      return null;
    }
  }

  bbox.width = bbox.right - bbox.left;
  bbox.height = bbox.bottom - bbox.top;
  return bbox;
}

function _getPercentInView(element, topWin) {
  var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      w = _ref3.w,
      h = _ref3.h;

  var elementBoundingBox = _getBoundingBox(element, {
    w: w,
    h: h
  }); // Obtain the intersection of the element and the viewport


  var elementInViewBoundingBox = _getIntersectionOfRects([{
    left: 0,
    top: 0,
    right: topWin.innerWidth,
    bottom: topWin.innerHeight
  }, elementBoundingBox]);

  var elementInViewArea, elementTotalArea;

  if (elementInViewBoundingBox !== null) {
    // Some or all of the element is in view
    elementInViewArea = elementInViewBoundingBox.width * elementInViewBoundingBox.height;
    elementTotalArea = elementBoundingBox.width * elementBoundingBox.height;
    return elementInViewArea / elementTotalArea * 100;
  } // No overlap between element and the viewport; therefore, the element
  // lies completely out of view


  return 0;
}

Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[222]);