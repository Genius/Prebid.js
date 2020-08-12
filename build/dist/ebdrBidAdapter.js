pbjsChunk([148],{

/***/ 264:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(265);


/***/ }),

/***/ 265:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__ = __webpack_require__(1);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var BIDDER_CODE = 'ebdr';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["d" /* VIDEO */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid && bid.params && bid.params.zoneid);
  },
  buildRequests: function buildRequests(bids) {
    var rtbServerDomain = 'dsp.bnmla.com';
    var domain = window.location.host;
    var page = window.location.pathname + location.search + location.hash;
    var ebdrImps = [];
    var ebdrReq = {};
    var ebdrParams = {};
    var zoneid = '';
    var requestId = '';
    bids.forEach(function (bid) {
      var _ebdrImps$push;

      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('Log bid', bid);
      var bidFloor = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('bidfloor', bid.params);
      var whArr = getWidthAndHeight(bid);

      var _mediaTypes = bid.mediaTypes && bid.mediaTypes.video ? __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["d" /* VIDEO */] : __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */];

      zoneid = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('zoneid', bid.params);
      requestId = bid.bidderRequestId;
      ebdrImps.push((_ebdrImps$push = {
        id: bid.bidId
      }, _defineProperty(_ebdrImps$push, _mediaTypes, {
        w: whArr[0],
        h: whArr[1]
      }), _defineProperty(_ebdrImps$push, "bidfloor", bidFloor), _ebdrImps$push));
      ebdrReq[bid.bidId] = {
        mediaTypes: _mediaTypes,
        w: whArr[0],
        h: whArr[1]
      };
      ebdrParams['latitude'] = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('latitude', bid.params);
      ebdrParams['longitude'] = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('longitude', bid.params);
      ebdrParams['ifa'] = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('IDFA', bid.params).length > __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('ADID', bid.params).length ? __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('IDFA', bid.params) : __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('ADID', bid.params);
    });
    var ebdrBidReq = {
      id: requestId,
      imp: ebdrImps,
      site: {
        domain: domain,
        page: page
      },
      device: {
        geo: {
          lat: ebdrParams.latitude,
          log: ebdrParams.longitude
        },
        ifa: ebdrParams.ifa
      }
    };
    return {
      method: 'GET',
      url: 'https://' + rtbServerDomain + '/hb?' + '&zoneid=' + zoneid + '&br=' + encodeURIComponent(JSON.stringify(ebdrBidReq)),
      bids: ebdrReq
    };
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('Log serverResponse', serverResponse);
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('Log bidRequest', bidRequest);
    var ebdrResponseImps = [];
    var ebdrResponseObj = serverResponse.body;

    if (!ebdrResponseObj || !ebdrResponseObj.seatbid || ebdrResponseObj.seatbid.length === 0 || !ebdrResponseObj.seatbid[0].bid || ebdrResponseObj.seatbid[0].bid.length === 0) {
      return [];
    }

    ebdrResponseObj.seatbid[0].bid.forEach(function (ebdrBid) {
      var _response;

      var responseCPM;
      responseCPM = parseFloat(ebdrBid.price);
      var adm;
      var type;

      var _mediaTypes;

      var vastURL;

      if (bidRequest.bids[ebdrBid.id].mediaTypes == __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */]) {
        adm = decodeURIComponent(ebdrBid.adm);
        type = 'ad';
        _mediaTypes = __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */];
      } else {
        adm = ebdrBid.adm;
        type = 'vastXml';
        _mediaTypes = __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["d" /* VIDEO */];

        if (ebdrBid.nurl) {
          vastURL = ebdrBid.nurl;
        }
      }

      var response = (_response = {
        requestId: ebdrBid.id
      }, _defineProperty(_response, type, adm), _defineProperty(_response, "mediaType", _mediaTypes), _defineProperty(_response, "creativeId", ebdrBid.crid), _defineProperty(_response, "cpm", responseCPM), _defineProperty(_response, "width", ebdrBid.w), _defineProperty(_response, "height", ebdrBid.h), _defineProperty(_response, "currency", 'USD'), _defineProperty(_response, "netRevenue", true), _defineProperty(_response, "ttl", 3600), _response);

      if (vastURL) {
        response.vastUrl = vastURL;
      }

      ebdrResponseImps.push(response);
    });
    return ebdrResponseImps;
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    var syncs = [];

    if (syncOptions.pixelEnabled) {
      var ebdrResponseObj = serverResponses.body;

      if (!ebdrResponseObj || !ebdrResponseObj.seatbid || ebdrResponseObj.seatbid.length === 0 || !ebdrResponseObj.seatbid[0].bid || ebdrResponseObj.seatbid[0].bid.length === 0) {
        return [];
      }

      ebdrResponseObj.seatbid[0].bid.forEach(function (ebdrBid) {
        if (ebdrBid.iurl && ebdrBid.iurl.length > 0) {
          syncs.push({
            type: 'image',
            url: ebdrBid.iurl
          });
        }
      });
    }

    return syncs;
  }
};

function getWidthAndHeight(bid) {
  var adW = null;
  var adH = null; // Handing old bidder only has size object

  if (bid.sizes && bid.sizes.length) {
    var sizeArrayLength = bid.sizes.length;

    if (sizeArrayLength === 2 && typeof bid.sizes[0] === 'number' && typeof bid.sizes[1] === 'number') {
      adW = bid.sizes[0];
      adH = bid.sizes[1];
    }
  }

  var _mediaTypes = bid.mediaTypes && bid.mediaTypes.video ? __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["d" /* VIDEO */] : __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */];

  if (bid.mediaTypes && bid.mediaTypes[_mediaTypes]) {
    if (_mediaTypes == __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */] && bid.mediaTypes[_mediaTypes].sizes && bid.mediaTypes[_mediaTypes].sizes[0] && bid.mediaTypes[_mediaTypes].sizes[0].length === 2) {
      adW = bid.mediaTypes[_mediaTypes].sizes[0][0];
      adH = bid.mediaTypes[_mediaTypes].sizes[0][1];
    } else if (_mediaTypes == __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["d" /* VIDEO */] && bid.mediaTypes[_mediaTypes].playerSize && bid.mediaTypes[_mediaTypes].playerSize.length === 2) {
      adW = bid.mediaTypes[_mediaTypes].playerSize[0];
      adH = bid.mediaTypes[_mediaTypes].playerSize[1];
    }
  }

  return [adW, adH];
}

Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[264]);