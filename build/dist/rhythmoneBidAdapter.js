pbjsChunk([105],{

/***/ 520:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(521);


/***/ }),

/***/ 521:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);






function RhythmOneBidAdapter() {
  this.code = 'rhythmone';
  this.supportedMediaTypes = [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */]];
  var SUPPORTED_VIDEO_PROTOCOLS = [2, 3, 5, 6];
  var SUPPORTED_VIDEO_MIMES = ['video/mp4'];
  var SUPPORTED_VIDEO_PLAYBACK_METHODS = [1, 2, 3, 4];
  var SUPPORTED_VIDEO_DELIVERY = [1];
  var SUPPORTED_VIDEO_API = [1, 2, 5];
  var slotsToBids = {};
  var that = this;
  var version = '2.1';

  this.isBidRequestValid = function (bid) {
    return !!(bid.params && bid.params.placementId);
  };

  this.getUserSyncs = function (syncOptions, responses, gdprConsent) {
    return [];
  };

  function frameImp(BRs, bidderRequest) {
    var impList = [];
    var isSecure = 0;

    if (bidderRequest && bidderRequest.refererInfo && bidderRequest.refererInfo.stack.length) {
      // clever trick to get the protocol
      var el = document.createElement('a');
      el.href = bidderRequest.refererInfo.stack[0];
      isSecure = el.protocol == 'https:' ? 1 : 0;
    }

    for (var i = 0; i < BRs.length; i++) {
      slotsToBids[BRs[i].adUnitCode] = BRs[i];
      var impObj = {};
      impObj.id = BRs[i].adUnitCode;
      impObj.bidfloor = parseFloat(__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](BRs[i], 'params.floor')) || 0;
      impObj.secure = isSecure;

      if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](BRs[i], 'mediaTypes.banner') || __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](BRs[i], 'mediaType') === 'banner') {
        var banner = frameBanner(BRs[i]);

        if (banner) {
          impObj.banner = banner;
        }
      }

      if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](BRs[i], 'mediaTypes.video') || __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](BRs[i], 'mediaType') === 'video') {
        impObj.video = frameVideo(BRs[i]);
      }

      if (!(impObj.banner || impObj.video)) {
        continue;
      }

      impObj.ext = frameExt(BRs[i]);
      impList.push(impObj);
    }

    return impList;
  }

  function frameSite(bidderRequest) {
    var site = {
      domain: '',
      page: '',
      ref: ''
    };

    if (bidderRequest && bidderRequest.refererInfo) {
      var ri = bidderRequest.refererInfo;
      site.ref = ri.referer;

      if (ri.stack.length) {
        site.page = ri.stack[ri.stack.length - 1]; // clever trick to get the domain

        var el = document.createElement('a');
        el.href = ri.stack[0];
        site.domain = el.hostname;
      }
    }

    return site;
  }

  function frameDevice() {
    return {
      ua: navigator.userAgent,
      ip: '',
      // Empty Ip string is required, server gets the ip from HTTP header
      dnt: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getDNT"]() ? 1 : 0
    };
  }

  function getValidSizeSet(dimensionList) {
    var w = parseInt(dimensionList[0]);
    var h = parseInt(dimensionList[1]); // clever check for NaN

    if (!(w !== w || h !== h)) {
      // eslint-disable-line
      return [w, h];
    }

    return false;
  }

  function frameBanner(adUnit) {
    // adUnit.sizes is scheduled to be deprecated, continue its support but prefer adUnit.mediaTypes.banner
    var sizeList = adUnit.sizes;

    if (adUnit.mediaTypes && adUnit.mediaTypes.banner) {
      sizeList = adUnit.mediaTypes.banner.sizes;
    }

    var sizeStringList = __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](sizeList);
    var format = [];
    sizeStringList.forEach(function (size) {
      if (size) {
        var dimensionList = getValidSizeSet(size.split('x'));

        if (dimensionList) {
          format.push({
            'w': dimensionList[0],
            'h': dimensionList[1]
          });
        }
      }
    });

    if (format.length) {
      return {
        'format': format
      };
    }

    return false;
  }

  function frameVideo(bid) {
    var size = [];

    if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.video.playerSize')) {
      var dimensionSet = bid.mediaTypes.video.playerSize;

      if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](bid.mediaTypes.video.playerSize[0])) {
        dimensionSet = bid.mediaTypes.video.playerSize[0];
      }

      var validSize = getValidSizeSet(dimensionSet);

      if (validSize) {
        size = validSize;
      }
    }

    return {
      mimes: __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.video.mimes') || SUPPORTED_VIDEO_MIMES,
      protocols: __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.video.protocols') || SUPPORTED_VIDEO_PROTOCOLS,
      w: size[0],
      h: size[1],
      startdelay: __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.video.startdelay') || 0,
      skip: __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.video.skip') || 0,
      playbackmethod: __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.video.playbackmethod') || SUPPORTED_VIDEO_PLAYBACK_METHODS,
      delivery: __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.video.delivery') || SUPPORTED_VIDEO_DELIVERY,
      api: __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.video.api') || SUPPORTED_VIDEO_API
    };
  }

  function frameExt(bid) {
    return {
      bidder: {
        placementId: bid.params['placementId'],
        zone: bid.params && bid.params['zone'] ? bid.params['zone'] : '1r',
        path: bid.params && bid.params['path'] ? bid.params['path'] : 'mvo'
      }
    };
  }

  function frameBid(BRs, bidderRequest) {
    return {
      id: BRs[0].bidderRequestId,
      imp: frameImp(BRs, bidderRequest),
      site: frameSite(bidderRequest),
      device: frameDevice(),
      user: {
        ext: {
          consent: __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidderRequest, 'gdprConsent.gdprApplies') ? bidderRequest.gdprConsent.consentString : ''
        }
      },
      at: 1,
      tmax: 1000,
      regs: {
        ext: {
          gdpr: __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidderRequest, 'gdprConsent.gdprApplies') ? Boolean(bidderRequest.gdprConsent.gdprApplies & 1) : false
        }
      }
    };
  }

  function getFirstParam(key, validBidRequests) {
    for (var i = 0; i < validBidRequests.length; i++) {
      if (validBidRequests[i].params && validBidRequests[i].params[key]) {
        return validBidRequests[i].params[key];
      }
    }
  }

  this.buildRequests = function (BRs, bidderRequest) {
    var fallbackPlacementId = getFirstParam('placementId', BRs);

    if (fallbackPlacementId === undefined || BRs.length < 1) {
      return [];
    }

    var rmpUrl = getFirstParam('endpoint', BRs) || '//tag.1rx.io/rmp/{placementId}/0/{path}?z={zone}';
    var defaultZone = getFirstParam('zone', BRs) || '1r';
    var defaultPath = getFirstParam('path', BRs) || 'mvo';
    rmpUrl = rmpUrl.replace(/\{placementId\}/i, fallbackPlacementId);
    rmpUrl = rmpUrl.replace(/\{zone\}/i, defaultZone);
    rmpUrl = rmpUrl.replace(/\{path\}/i, defaultPath);
    var fat = /(^v|(\.0)+$)/gi;
    var prebidVersion = "2.37.0";
    rmpUrl += '&hbv=' + prebidVersion.replace(fat, '') + ',' + version.replace(fat, '');
    var bidRequest = frameBid(BRs, bidderRequest);

    if (!bidRequest.imp.length) {
      return {};
    }

    return {
      method: 'POST',
      url: rmpUrl,
      data: JSON.stringify(bidRequest)
    };
  };

  this.interpretResponse = function (serverResponse) {
    var responses = serverResponse.body || [];
    var bids = [];
    var i = 0;

    if (responses.seatbid) {
      var temp = [];

      for (i = 0; i < responses.seatbid.length; i++) {
        for (var j = 0; j < responses.seatbid[i].bid.length; j++) {
          temp.push(responses.seatbid[i].bid[j]);
        }
      }

      responses = temp;
    }

    for (i = 0; i < responses.length; i++) {
      var bid = responses[i];
      var bidRequest = slotsToBids[bid.impid];
      var bidResponse = {
        requestId: bidRequest.bidId,
        bidderCode: that.code,
        cpm: parseFloat(bid.price),
        width: bid.w,
        height: bid.h,
        creativeId: bid.crid,
        currency: 'USD',
        netRevenue: true,
        ttl: 350
      };

      if (bidRequest.mediaTypes && bidRequest.mediaTypes.video) {
        bidResponse.vastUrl = bid.nurl;
        bidResponse.mediaType = 'video';
        bidResponse.ttl = 600;
      } else {
        bidResponse.ad = bid.adm;
      }

      bids.push(bidResponse);
    }

    return bids;
  };
}

var spec = new RhythmOneBidAdapter();
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[520]);