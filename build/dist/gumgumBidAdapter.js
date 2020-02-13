pbjsChunk([28],{

/***/ 17:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 338:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(339);


/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_includes__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_includes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_includes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory__ = __webpack_require__(1);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }





var BIDDER_CODE = 'gumgum';
var ALIAS_BIDDER_CODE = ['gg'];
var BID_ENDPOINT = "https://g2.gumgum.com/hbid/imp";
var DT_CREDENTIALS = {
  member: 'YcXr87z2lpbB'
};
var TIME_TO_LIVE = 60;
var browserParams = {};
var pageViewId = null; // TODO: potential 0 values for browserParams sent to ad server

function _getBrowserParams(topWindowUrl) {
  var topWindow;
  var topScreen;
  var topUrl;
  var ggad;
  var ns;

  function getNetworkSpeed() {
    var connection = window.navigator && (window.navigator.connection || window.navigator.mozConnection || window.navigator.webkitConnection);
    var Mbps = connection && (connection.downlink || connection.bandwidth);
    return Mbps ? Math.round(Mbps * 1024) : null; // 1 megabit -> 1024 kilobits
  }

  function getOgURL() {
    var ogURL = '';
    var ogURLSelector = "meta[property='og:url']";
    var head = document && document.getElementsByTagName('head')[0];
    var ogURLElement = head.querySelector(ogURLSelector);
    ogURL = ogURLElement ? ogURLElement.content : null;
    return ogURL;
  }

  if (browserParams.vw) {
    // we've already initialized browserParams, just return it.
    return browserParams;
  }

  try {
    topWindow = global.top;
    topScreen = topWindow.screen;
    topUrl = topWindowUrl || __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"]();
  } catch (error) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](error);
    return browserParams;
  }

  browserParams = {
    vw: topWindow.innerWidth,
    vh: topWindow.innerHeight,
    sw: topScreen.width,
    sh: topScreen.height,
    pu: topUrl,
    ce: __WEBPACK_IMPORTED_MODULE_0__src_utils__["cookiesAreEnabled"](),
    dpr: topWindow.devicePixelRatio || 1,
    jcsi: JSON.stringify({
      t: 0,
      rq: 8
    }),
    ogu: getOgURL()
  };
  ns = getNetworkSpeed();

  if (ns) {
    browserParams.ns = ns;
  }

  ggad = (topUrl.match(/#ggad=(\w+)$/) || [0, 0])[1];

  if (ggad) {
    browserParams[isNaN(ggad) ? 'eAdBuyId' : 'adBuyId'] = ggad;
  }

  return browserParams;
}

function getWrapperCode(wrapper, data) {
  return wrapper.replace('AD_JSON', window.btoa(JSON.stringify(data)));
}

function _getTradeDeskIDParam(userId) {
  var unifiedIdObj = {};

  if (userId.tdid) {
    unifiedIdObj.tdid = userId.tdid;
  }

  return unifiedIdObj;
}

function _getDigiTrustQueryParams(userId) {
  var digiTrustId = userId.digitrustid && userId.digitrustid.data;

  if (!digiTrustId) {
    var digiTrustUser = window.DigiTrust && window.DigiTrust.getUser ? window.DigiTrust.getUser(DT_CREDENTIALS) : {};
    digiTrustId = digiTrustUser && digiTrustUser.success && digiTrustUser.identity || '';
  } // Verify there is an ID and this user has not opted out


  if (!digiTrustId || digiTrustId.privacy && digiTrustId.privacy.optout) {
    return {};
  }

  return {
    dt: digiTrustId.id
  };
}
/**
 * Determines whether or not the given bid request is valid.
 *
 * @param {BidRequest} bid The bid params to validate.
 * @return boolean True if this is a valid bid, and false otherwise.
 */


function isBidRequestValid(bid) {
  var params = bid.params,
      adUnitCode = bid.adUnitCode;

  switch (true) {
    case !!params.inScreen:
      break;

    case !!params.inSlot:
      break;

    case !!params.ICV:
      break;

    default:
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]("[GumGum] No product selected for the placement ".concat(adUnitCode, ", please check your implementation."));
      return false;
  }

  if (params.bidfloor && !(typeof params.bidfloor === 'number' && isFinite(params.bidfloor))) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]('[GumGum] bidfloor must be a Number');
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
  var bids = [];
  var gdprConsent = bidderRequest && bidderRequest.gdprConsent;

  __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](validBidRequests, function (bidRequest) {
    var timeout = __WEBPACK_IMPORTED_MODULE_1__src_config__["b" /* config */].getConfig('bidderTimeout');
    var bidId = bidRequest.bidId,
        _bidRequest$params = bidRequest.params,
        params = _bidRequest$params === void 0 ? {} : _bidRequest$params,
        transactionId = bidRequest.transactionId,
        _bidRequest$userId = bidRequest.userId,
        userId = _bidRequest$userId === void 0 ? {} : _bidRequest$userId;
    var data = {};
    var topWindowUrl = bidderRequest && bidderRequest.refererInfo && bidderRequest.refererInfo.referer;

    if (pageViewId) {
      data.pv = pageViewId;
    }

    if (params.bidfloor) {
      data.fp = params.bidfloor;
    }

    if (params.inScreen) {
      data.t = params.inScreen;
      data.pi = 2;
    }

    if (params.inSlot) {
      data.si = parseInt(params.inSlot, 10);
      data.pi = 3;
    }

    if (params.ICV) {
      data.ni = parseInt(params.ICV, 10);
      data.pi = 5;
    }

    if (gdprConsent) {
      data.gdprApplies = gdprConsent.gdprApplies ? 1 : 0;
    }

    if (data.gdprApplies) {
      data.gdprConsent = gdprConsent.consentString;
    }

    bids.push({
      id: bidId,
      tmax: timeout,
      tId: transactionId,
      pi: data.pi,
      selector: params.selector,
      sizes: bidRequest.sizes || bidRequest.mediatype[banner].sizes,
      url: BID_ENDPOINT,
      method: 'GET',
      data: _extends(data, _getBrowserParams(topWindowUrl), _getDigiTrustQueryParams(userId), _getTradeDeskIDParam(userId))
    });
  });

  return bids;
}
/**
 * Unpack the response from the server into a list of bids.
 *
 * @param {*} serverResponse A successful response from the server.
 * @return {Bid[]} An array of bids which were nested inside the server.
 */


function interpretResponse(serverResponse, bidRequest) {
  var bidResponses = [];
  var serverResponseBody = serverResponse.body;
  var defaultResponse = {
    ad: {
      price: 0,
      id: 0,
      markup: ''
    },
    pag: {
      pvid: 0
    }
  };

  var _Object$assign = _extends(defaultResponse, serverResponseBody),
      _Object$assign$ad = _Object$assign.ad,
      cpm = _Object$assign$ad.price,
      creativeId = _Object$assign$ad.id,
      markup = _Object$assign$ad.markup,
      wrapper = _Object$assign.cw,
      pvid = _Object$assign.pag.pvid;

  var data = bidRequest.data || {};
  var product = data.pi;
  var isTestUnit = product === 3 && data.si === 9;
  var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](bidRequest.sizes);

  var _sizes$0$split = sizes[0].split('x'),
      _sizes$0$split2 = _slicedToArray(_sizes$0$split, 2),
      width = _sizes$0$split2[0],
      height = _sizes$0$split2[1]; // return 1x1 when breakout expected


  if ((product === 2 || product === 5) && __WEBPACK_IMPORTED_MODULE_2_core_js_library_fn_array_includes___default()(sizes, '1x1')) {
    width = '1';
    height = '1';
  } // update Page View ID from server response


  pageViewId = pvid;

  if (creativeId) {
    bidResponses.push({
      // dealId: DEAL_ID,
      // referrer: REFERER,
      ad: wrapper ? getWrapperCode(wrapper, _extends({}, serverResponseBody, {
        bidRequest: bidRequest
      })) : markup,
      cpm: isTestUnit ? 0.1 : cpm,
      creativeId: creativeId,
      currency: 'USD',
      height: height,
      netRevenue: true,
      requestId: bidRequest.id,
      ttl: TIME_TO_LIVE,
      width: width
    });
  }

  return bidResponses;
}
/**
 * Register the user sync pixels which should be dropped after the auction.
 *
 * @param {SyncOptions} syncOptions Which user syncs are allowed?
 * @param {ServerResponse[]} serverResponses List of server's responses.
 * @return {UserSync[]} The user syncs which should be dropped.
 */


function getUserSyncs(syncOptions, serverResponses) {
  var responses = serverResponses.map(function (response) {
    return response.body && response.body.pxs && response.body.pxs.scr || [];
  });
  var userSyncs = responses.reduce(function (usersyncs, response) {
    return usersyncs.concat(response);
  }, []);
  var syncs = userSyncs.map(function (sync) {
    return {
      type: sync.t === 'f' ? 'iframe' : 'image',
      url: sync.u
    };
  });
  return syncs;
}

var spec = {
  code: BIDDER_CODE,
  aliases: ALIAS_BIDDER_CODE,
  isBidRequestValid: isBidRequestValid,
  buildRequests: buildRequests,
  interpretResponse: interpretResponse,
  getUserSyncs: getUserSyncs
};
Object(__WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory__["registerBidder"])(spec);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(17)))

/***/ })

},[338]);