pbjsChunk([161],{

/***/ 549:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(550);


/***/ }),

/***/ 550:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_storageManager_js__ = __webpack_require__(9);




var storage = Object(__WEBPACK_IMPORTED_MODULE_3__src_storageManager_js__["b" /* getStorageManager */])();
var BIDDER_CODE = 'newborntownWeb';
var REQUEST_URL = 'https://us-west.solortb.com/adx/api/rtb?from=4';

function randomn(n) {
  return parseInt((Math.random() + 1) * Math.pow(10, n - 1)) + '';
}

function generateGUID() {
  var d = new Date().getTime();
  var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
  });
  return guid;
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

var platform = function getPlatform() {
  var ua = navigator.userAgent;

  if (ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1) {
    return 'Android';
  }

  if (ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    return 'iOS';
  }

  return 'windows';
}();

function getLanguage() {
  var language = navigator.language ? 'language' : 'userLanguage';
  return navigator[language].split('-')[0];
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["c" /* NATIVE */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params.publisher_id && bid.params.slot_id && bid.params.bidfloor);
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var requestArr = [];

    if (validBidRequests.length === 0) {
      return null;
    }

    var guid;

    if (storage.getDataFromLocalStorage('sax_user_id') == null) {
      storage.setDataInLocalStorage('sax_user_id', generateGUID());
    }

    guid = storage.getDataFromLocalStorage('sax_user_id');

    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](validBidRequests, function (bidRequest) {
      var bidRequestObj = bidRequest.params;
      var req = {
        id: randomn(12) + randomn(12),
        tmax: bidderRequest.timeout,
        bidId: bidRequest.bidId,
        user: {
          id: guid
        },
        imp: [{
          id: '1',
          bidfloor: bidRequestObj.bidfloor,
          bidfloorcur: 'USD',
          banner: {
            w: 0,
            h: 0
          }
        }],
        site: {
          domain: window.location.host,
          id: bidRequestObj.slot_id,
          page: window.location.href,
          publisher: {
            id: bidRequestObj.publisher_id
          }
        },
        device: {
          ip: '',
          ua: navigator.userAgent,
          os: platform,
          geo: {
            country: '',
            type: 0,
            ipservice: 1,
            region: '',
            city: ''
          },
          language: getLanguage(),
          devicetype: _getDeviceType()
        },
        ext: {
          solomath: {
            slotid: bidRequestObj.slot_id
          }
        }
      };
      var sizes = bidRequest.sizes;

      if (sizes) {
        if (sizes && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](sizes[0])) {
          req.imp[0].banner.w = sizes[0][0];
          req.imp[0].banner.h = sizes[0][1];
        } else if (sizes && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isNumber"](sizes[0])) {
          req.imp[0].banner.w = sizes[0];
          req.imp[0].banner.h = sizes[1];
        }
      } else {
        return false;
      }

      var options = {
        withCredentials: false
      };
      requestArr.push({
        method: 'POST',
        url: REQUEST_URL,
        data: req,
        bidderRequest: bidderRequest,
        options: options
      });
    });

    return requestArr;
  },
  interpretResponse: function interpretResponse(serverResponse, request) {
    var bidResponses = [];

    if (serverResponse.body.seatbid && serverResponse.body.seatbid.length > 0 && serverResponse.body.seatbid[0].bid && serverResponse.body.seatbid[0].bid.length > 0 && serverResponse.body.seatbid[0].bid[0].adm) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](serverResponse.body.seatbid[0].bid, function (bodyAds) {
        var adstr = '';
        adstr = bodyAds.adm;
        var bidResponse = {
          requestId: request.data.bidId || 0,
          cpm: bodyAds.price || 0,
          width: bodyAds.w ? bodyAds.w : 0,
          height: bodyAds.h ? bodyAds.h : 0,
          ad: adstr,
          netRevenue: true,
          currency: serverResponse.body.cur || 'USD',
          ttl: 600,
          creativeId: bodyAds.cid
        };
        bidResponses.push(bidResponse);
      });
    }

    return bidResponses;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[549]);