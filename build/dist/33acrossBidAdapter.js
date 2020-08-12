pbjsChunk([205],{

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(123);


/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils__ = __webpack_require__(0);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




var BIDDER_CODE = '33across';
var END_POINT = 'https://ssc.33across.com/api/v1/hb';
var SYNC_ENDPOINT = 'https://ssc-cms.33across.com/ps/?m=xch&rt=html&ru=deb';
var adapterState = {};
var NON_MEASURABLE = 'nm'; // All this assumes that only one bid is ever returned by ttx

function _createBidResponse(response) {
  return {
    requestId: response.id,
    bidderCode: BIDDER_CODE,
    cpm: response.seatbid[0].bid[0].price,
    width: response.seatbid[0].bid[0].w,
    height: response.seatbid[0].bid[0].h,
    ad: response.seatbid[0].bid[0].adm,
    ttl: response.seatbid[0].bid[0].ttl || 60,
    creativeId: response.seatbid[0].bid[0].crid,
    currency: response.cur,
    netRevenue: true
  };
}

function _isViewabilityMeasurable(element) {
  return !_isIframe() && element !== null;
}

function _getViewability(element, topWin) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      w = _ref.w,
      h = _ref.h;

  return topWin.document.visibilityState === 'visible' ? _getPercentInView(element, topWin, {
    w: w,
    h: h
  }) : 0;
}

function _mapAdUnitPathToElementId(adUnitCode) {
  if (__WEBPACK_IMPORTED_MODULE_2__src_utils__["isGptPubadsDefined"]()) {
    var adSlots = googletag.pubads().getSlots();
    var isMatchingAdSlot = __WEBPACK_IMPORTED_MODULE_2__src_utils__["isSlotMatchingAdUnitCode"](adUnitCode);

    for (var i = 0; i < adSlots.length; i++) {
      if (isMatchingAdSlot(adSlots[i])) {
        var id = adSlots[i].getSlotElementId();
        __WEBPACK_IMPORTED_MODULE_2__src_utils__["logInfo"]("[33Across Adapter] Map ad unit path to HTML element id: '".concat(adUnitCode, "' -> ").concat(id));
        return id;
      }
    }
  }

  __WEBPACK_IMPORTED_MODULE_2__src_utils__["logWarn"]("[33Across Adapter] Unable to locate element for ad unit code: '".concat(adUnitCode, "'"));
  return null;
}

function _getAdSlotHTMLElement(adUnitCode) {
  return document.getElementById(adUnitCode) || document.getElementById(_mapAdUnitPathToElementId(adUnitCode));
} // Infer the necessary data from valid bid for a minimal ttxRequest and create HTTP request
// NOTE: At this point, TTX only accepts request for a single impression


function _createServerRequest(bidRequest) {
  var gdprConsent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var ttxRequest = {};
  var params = bidRequest.params;

  var element = _getAdSlotHTMLElement(bidRequest.adUnitCode);

  var sizes = _transformSizes(bidRequest.sizes);

  var minSize = _getMinSize(sizes);

  var viewabilityAmount = _isViewabilityMeasurable(element) ? _getViewability(element, __WEBPACK_IMPORTED_MODULE_2__src_utils__["getWindowTop"](), minSize) : NON_MEASURABLE;
  var contributeViewability = ViewabilityContributor(viewabilityAmount);
  /*
   * Infer data for the request payload
   */

  ttxRequest.imp = [];
  ttxRequest.imp[0] = {
    banner: {
      format: sizes.map(function (size) {
        return _extends(size, {
          ext: {}
        });
      })
    },
    ext: {
      ttx: {
        prod: params.productId
      }
    }
  };
  ttxRequest.site = {
    id: params.siteId
  }; // Go ahead send the bidId in request to 33exchange so it's kept track of in the bid response and
  // therefore in ad targetting process

  ttxRequest.id = bidRequest.bidId; // Set GDPR related fields

  ttxRequest.user = {
    ext: {
      consent: gdprConsent.consentString
    }
  };
  ttxRequest.regs = {
    ext: {
      gdpr: gdprConsent.gdprApplies === true ? 1 : 0
    }
  };
  ttxRequest.ext = {
    ttx: {
      prebidStartedAt: Date.now(),
      caller: [{
        'name': 'prebidjs',
        'version': "3.0.0"
      }]
    }
  }; // Finally, set the openRTB 'test' param if this is to be a test bid

  if (params.test === 1) {
    ttxRequest.test = 1;
  }
  /*
   * Now construct the full server request
   */


  var options = {
    contentType: 'text/plain',
    withCredentials: true
  }; // Allow the ability to configure the HB endpoint for testing purposes.

  var ttxSettings = __WEBPACK_IMPORTED_MODULE_1__src_config__["b" /* config */].getConfig('ttxSettings');
  var url = ttxSettings && ttxSettings.url || END_POINT; // Return the server request

  return {
    'method': 'POST',
    'url': url,
    'data': JSON.stringify(contributeViewability(ttxRequest)),
    'options': options
  };
} // Sync object will always be of type iframe for TTX


function _createSync(_ref2) {
  var _ref2$siteId = _ref2.siteId,
      siteId = _ref2$siteId === void 0 ? 'zzz000000000003zzz' : _ref2$siteId,
      _ref2$gdprConsent = _ref2.gdprConsent,
      gdprConsent = _ref2$gdprConsent === void 0 ? {} : _ref2$gdprConsent;
  var ttxSettings = __WEBPACK_IMPORTED_MODULE_1__src_config__["b" /* config */].getConfig('ttxSettings');
  var syncUrl = ttxSettings && ttxSettings.syncUrl || SYNC_ENDPOINT;
  var consentString = gdprConsent.consentString,
      gdprApplies = gdprConsent.gdprApplies;
  var sync = {
    type: 'iframe',
    url: "".concat(syncUrl, "&id=").concat(siteId, "&gdpr_consent=").concat(encodeURIComponent(consentString))
  };

  if (typeof gdprApplies === 'boolean') {
    sync.url += "&gdpr=".concat(Number(gdprApplies));
  }

  return sync;
}

function _getSize(size) {
  return {
    w: parseInt(size[0], 10),
    h: parseInt(size[1], 10)
  };
}

function _getMinSize(sizes) {
  return sizes.reduce(function (min, size) {
    return size.h * size.w < min.h * min.w ? size : min;
  });
}

function _getBoundingBox(element) {
  var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      w = _ref3.w,
      h = _ref3.h;

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

function _transformSizes(sizes) {
  if (__WEBPACK_IMPORTED_MODULE_2__src_utils__["isArray"](sizes) && sizes.length === 2 && !__WEBPACK_IMPORTED_MODULE_2__src_utils__["isArray"](sizes[0])) {
    return [_getSize(sizes)];
  }

  return sizes.map(_getSize);
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
  var _ref4 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      w = _ref4.w,
      h = _ref4.h;

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
/**
 * Viewability contribution to request..
 */


function ViewabilityContributor(viewabilityAmount) {
  function contributeViewability(ttxRequest) {
    var req = _extends({}, ttxRequest);

    var imp = req.imp = req.imp.map(function (impItem) {
      return _extends({}, impItem);
    });

    var banner = imp[0].banner = _extends({}, imp[0].banner);

    var ext = banner.ext = _extends({}, banner.ext);

    var ttx = ext.ttx = _extends({}, ext.ttx);

    ttx.viewability = {
      amount: isNaN(viewabilityAmount) ? viewabilityAmount : Math.round(viewabilityAmount)
    };
    return req;
  }

  return contributeViewability;
}

function _isIframe() {
  try {
    return __WEBPACK_IMPORTED_MODULE_2__src_utils__["getWindowSelf"]() !== __WEBPACK_IMPORTED_MODULE_2__src_utils__["getWindowTop"]();
  } catch (e) {
    return true;
  }
}

function isBidRequestValid(bid) {
  if (bid.bidder !== BIDDER_CODE || typeof bid.params === 'undefined') {
    return false;
  }

  if (typeof bid.params.siteId === 'undefined' || typeof bid.params.productId === 'undefined') {
    return false;
  }

  return true;
} // NOTE: With regards to gdrp consent data,
// - the server independently infers gdpr applicability therefore, setting the default value to false


function buildRequests(bidRequests, bidderRequest) {
  var gdprConsent = _extends({
    consentString: undefined,
    gdprApplies: false
  }, bidderRequest && bidderRequest.gdprConsent);

  adapterState.uniqueSiteIds = bidRequests.map(function (req) {
    return req.params.siteId;
  }).filter(__WEBPACK_IMPORTED_MODULE_2__src_utils__["uniques"]);
  return bidRequests.map(function (req) {
    return _createServerRequest(req, gdprConsent);
  });
} // NOTE: At this point, the response from 33exchange will only ever contain one bid i.e. the highest bid


function interpretResponse(serverResponse, bidRequest) {
  var bidResponses = []; // If there are bids, look at the first bid of the first seatbid (see NOTE above for assumption about ttx)

  if (serverResponse.body.seatbid.length > 0 && serverResponse.body.seatbid[0].bid.length > 0) {
    bidResponses.push(_createBidResponse(serverResponse.body));
  }

  return bidResponses;
} // Register one sync per unique guid so long as iframe is enable
// Else no syncs
// For logic on how we handle gdpr data see _createSyncs and module's unit tests
// '33acrossBidAdapter#getUserSyncs'


function getUserSyncs(syncOptions, responses, gdprConsent) {
  return syncOptions.iframeEnabled ? adapterState.uniqueSiteIds.map(function (siteId) {
    return _createSync({
      gdprConsent: gdprConsent,
      siteId: siteId
    });
  }) : [];
}

var spec = {
  NON_MEASURABLE: NON_MEASURABLE,
  code: BIDDER_CODE,
  isBidRequestValid: isBidRequestValid,
  buildRequests: buildRequests,
  interpretResponse: interpretResponse,
  getUserSyncs: getUserSyncs
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[122]);