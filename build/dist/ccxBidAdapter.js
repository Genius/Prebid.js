pbjsChunk([225],{

/***/ 232:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(233);


/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config__ = __webpack_require__(3);



var BIDDER_CODE = 'ccx';
var BID_URL = 'https://delivery.clickonometrics.pl/ortb/prebid/bid';
var SUPPORTED_VIDEO_PROTOCOLS = [2, 3, 5, 6];
var SUPPORTED_VIDEO_MIMES = ['video/mp4', 'video/x-flv'];
var SUPPORTED_VIDEO_PLAYBACK_METHODS = [1, 2, 3, 4];

function _getDeviceObj() {
  var device = {};
  device.w = screen.width;
  device.y = screen.height;
  device.ua = navigator.userAgent;
  return device;
}

function _getSiteObj() {
  var site = {};
  var url = __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('pageUrl') || __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"]();

  if (url.length > 0) {
    url = url.split('?')[0];
  }

  site.page = url;
  return site;
}

function _validateSizes(sizeObj, type) {
  if (!__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](sizeObj) || typeof sizeObj[0] === 'undefined') {
    return false;
  }

  if (type === 'video' && (!__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](sizeObj[0]) || sizeObj[0].length !== 2)) {
    return false;
  }

  var result = true;

  if (type === 'banner') {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](sizeObj, function (size) {
      if (!__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](size) || size.length !== 2) {
        result = false;
      }
    });

    return result;
  }

  if (type === 'old') {
    if (!__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](sizeObj[0]) && sizeObj.length !== 2) {
      result = false;
    } else if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](sizeObj[0])) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](sizeObj, function (size) {
        if (!__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](size) || size.length !== 2) {
          result = false;
        }
      });
    }

    return result;
  }

  return true;
}

function _buildBid(bid) {
  var placement = {};
  placement.id = bid.bidId;
  placement.secure = 1;
  var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.banner.sizes') || __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.video.playerSize') || __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'sizes');

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.banner') || __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaType') === 'banner' || !__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.video') && !__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaType')) {
    placement.banner = {
      'format': []
    };

    if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](sizes[0])) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](sizes, function (size) {
        placement.banner.format.push({
          'w': size[0],
          'h': size[1]
        });
      });
    } else {
      placement.banner.format.push({
        'w': sizes[0],
        'h': sizes[1]
      });
    }
  } else if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.video') || __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaType') === 'video') {
    placement.video = {};

    if (typeof sizes !== 'undefined') {
      if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](sizes[0])) {
        placement.video.w = sizes[0][0];
        placement.video.h = sizes[0][1];
      } else {
        placement.video.w = sizes[0];
        placement.video.h = sizes[1];
      }
    }

    placement.video.protocols = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'params.video.protocols') || SUPPORTED_VIDEO_PROTOCOLS;
    placement.video.mimes = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'params.video.mimes') || SUPPORTED_VIDEO_MIMES;
    placement.video.playbackmethod = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'params.video.playbackmethod') || SUPPORTED_VIDEO_PLAYBACK_METHODS;
    placement.video.skip = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'params.video.skip') || 0;

    if (placement.video.skip === 1 && __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'params.video.skipafter')) {
      placement.video.skipafter = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'params.video.skipafter');
    }
  }

  placement.ext = {
    'pid': bid.params.placementId
  };
  return placement;
}

function _buildResponse(bid, currency, ttl) {
  var resp = {
    requestId: bid.impid,
    cpm: bid.price,
    width: bid.w,
    height: bid.h,
    creativeId: bid.crid,
    netRevenue: false,
    ttl: ttl,
    currency: currency
  };

  if (bid.ext.type === 'video') {
    resp.vastXml = bid.adm;
  } else {
    resp.ad = bid.adm;
  }

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'dealid')) {
    resp.dealId = bid.dealid;
  }

  return resp;
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: ['banner', 'video'],
  isBidRequestValid: function isBidRequestValid(bid) {
    if (!__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'params.placementId')) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]('placementId param is reqeuired.');
      return false;
    }

    if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.banner.sizes')) {
      var isValid = _validateSizes(bid.mediaTypes.banner.sizes, 'banner');

      if (!isValid) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]('Bid sizes are invalid.');
      }

      return isValid;
    } else if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.video.playerSize')) {
      var _isValid = _validateSizes(bid.mediaTypes.video.playerSize, 'video');

      if (!_isValid) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]('Bid sizes are invalid.');
      }

      return _isValid;
    } else if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'sizes')) {
      var _isValid2 = _validateSizes(bid.sizes, 'old');

      if (!_isValid2) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]('Bid sizes are invalid.');
      }

      return _isValid2;
    } else {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]('Bid sizes are required.');
      return false;
    }
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    // check if validBidRequests is not empty
    if (validBidRequests.length > 0) {
      var requestBody = {};
      requestBody.imp = [];
      requestBody.site = _getSiteObj();
      requestBody.device = _getDeviceObj();
      requestBody.id = bidderRequest.bids[0].auctionId;
      requestBody.ext = {
        'ce': __WEBPACK_IMPORTED_MODULE_0__src_utils__["cookiesAreEnabled"]() ? 1 : 0
      };

      __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](validBidRequests, function (bid) {
        requestBody.imp.push(_buildBid(bid));
      }); // Return the server request


      return {
        'method': 'POST',
        'url': BID_URL,
        'data': JSON.stringify(requestBody)
      };
    }
  },
  interpretResponse: function interpretResponse(serverResponse, request) {
    var bidResponses = []; // response is not empty (HTTP 204)

    if (!__WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](serverResponse.body)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](serverResponse.body.seatbid, function (seatbid) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](seatbid.bid, function (bid) {
          bidResponses.push(_buildResponse(bid, serverResponse.body.cur, serverResponse.body.ext.ttl));
        });
      });
    }

    return bidResponses;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    var syncs = [];

    if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](serverResponses[0], 'body.ext.usersync') && !__WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](serverResponses[0].body.ext.usersync)) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](serverResponses[0].body.ext.usersync, function (match) {
        if (syncOptions.iframeEnabled && match.type === 'iframe' || syncOptions.pixelEnabled && match.type === 'image') {
          syncs.push({
            type: match.type,
            url: match.url
          });
        }
      });
    }

    return syncs;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[232]);