pbjsChunk([71],{

/***/ 608:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(609);


/***/ }),

/***/ 609:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_bidfactory__ = __webpack_require__(23);




var CONSTANTS = __webpack_require__(4);

var BIDDER_CODE = 'tim';

function parseBidRequest(bidRequest) {
  var params = bidRequest.url.split('?')[1];
  var obj = {};
  var pairs = params.split('&');

  try {
    for (var i in pairs) {
      var split = pairs[i].split('=');
      obj[decodeURIComponent(split[0])] = decodeURIComponent(split[1]);
    }
  } catch (e) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](e);
  }

  return JSON.parse(obj.br);
}

function formatAdMarkup(bid) {
  var adm = bid.adm;

  if ('nurl' in bid) {
    adm += createTrackPixelHtml(bid.nurl);
  }

  return "<!DOCTYPE html><html><head><title></title><body style='margin:0px;padding:0px;'>".concat(adm, "</body></head>");
}

function createTrackPixelHtml(url) {
  if (!url) {
    return '';
  }

  var img = '<div style="position:absolute;left:0px;top:0px;visibility:hidden;">';
  img += '<img src="' + url + '"></div>';
  return img;
}

var spec = {
  code: BIDDER_CODE,
  aliases: ['timmedia'],
  isBidRequestValid: function isBidRequestValid(bid) {
    if (bid.params && bid.params.publisherid && bid.params.placementCode) {
      return true;
    }

    if (!bid.params) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('bid not valid: params were not provided');
    } else if (!bid.params.publisherid) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('bid not valid: publisherid was not provided');
    } else if (!bid.params.placementCode) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('bid not valid: placementCode was not provided');
    }

    return false;
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var requests = [];

    for (var i = 0; i < validBidRequests.length; i++) {
      requests.push(this.createRTBRequestURL(validBidRequests[i]));
    }

    return requests;
  },
  createRTBRequestURL: function createRTBRequestURL(bidReq) {
    // build bid request object
    var domain = window.location.host;
    var page = window.location.href;
    var publisherid = bidReq.params.publisherid;
    var bidFloor = bidReq.params.bidfloor;
    var placementCode = bidReq.params.placementCode;
    var adW = bidReq.mediaTypes.banner.sizes[0][0];
    var adH = bidReq.mediaTypes.banner.sizes[0][1]; // build bid request with impressions

    var bidRequest = {
      id: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getUniqueIdentifierStr"](),
      imp: [{
        id: bidReq.bidId,
        banner: {
          w: adW,
          h: adH
        },
        tagid: placementCode,
        bidfloor: bidFloor
      }],
      site: {
        domain: domain,
        page: page,
        publisher: {
          id: publisherid
        }
      },
      device: {
        'language': this.getLanguage(),
        'w': adW,
        'h': adH,
        'js': 1,
        'ua': navigator.userAgent
      }
    };

    if (!bidFloor) {
      delete bidRequest.imp['bidfloor'];
    }

    bidRequest.bidId = bidReq.bidId;
    var url = '//hb.timmedia-hb.com/api/v2/services/prebid/' + publisherid + '/' + placementCode + '?' + 'br=' + encodeURIComponent(JSON.stringify(bidRequest));
    return {
      method: 'GET',
      url: url,
      data: '',
      options: {
        withCredentials: false
      }
    };
  },
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    bidRequest = parseBidRequest(bidRequest);
    var bidResp = serverResponse.body;
    var bidResponses = [];

    if (!bidResp || !bidResp.id || !bidResp.seatbid || bidResp.seatbid.length === 0 || !bidResp.seatbid[0].bid || bidResp.seatbid[0].bid.length === 0) {
      return [];
    }

    bidResp.seatbid[0].bid.forEach(function (bidderBid) {
      var responseCPM;
      var placementCode = '';

      if (bidRequest) {
        var bidResponse = __WEBPACK_IMPORTED_MODULE_2__src_bidfactory__["a" /* createBid */](1);
        placementCode = bidRequest.placementCode;
        bidRequest.status = CONSTANTS.STATUS.GOOD;
        responseCPM = parseFloat(bidderBid.price);

        if (responseCPM === 0) {
          var bid = __WEBPACK_IMPORTED_MODULE_2__src_bidfactory__["a" /* createBid */](2);
          bid.bidderCode = BIDDER_CODE;
          bidResponses.push(bid);
          return bidResponses;
        }

        bidResponse.placementCode = placementCode;
        bidResponse.size = bidRequest.sizes;
        bidResponse.creativeId = bidderBid.id;
        bidResponse.bidderCode = BIDDER_CODE;
        bidResponse.cpm = responseCPM;
        bidResponse.ad = formatAdMarkup(bidderBid);
        bidResponse.width = parseInt(bidderBid.w);
        bidResponse.height = parseInt(bidderBid.h);
        bidResponse.currency = bidResp.cur;
        bidResponse.netRevenue = true;
        bidResponse.requestId = bidRequest.bidId;
        bidResponse.ttl = 180;
        bidResponses.push(bidResponse);
      }
    });
    return bidResponses;
  },
  getLanguage: function getLanguage() {
    var language = navigator.language ? 'language' : 'userLanguage';
    return navigator[language].split('-')[0];
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    var syncs = [];
    return syncs;
  },
  onTimeout: function onTimeout(data) {// Bidder specifc code
  },
  onBidWon: function onBidWon(bid) {// Bidder specific code
  },
  onSetTargeting: function onSetTargeting(bid) {// Bidder specific code
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[608]);