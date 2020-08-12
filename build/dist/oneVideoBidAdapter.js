pbjsChunk([105],{

/***/ 369:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(370);


/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var BIDDER_CODE = 'oneVideo';
var spec = {
  code: 'oneVideo',
  ENDPOINT: 'https://ads.adaptv.advertising.com/rtb/openrtb?ext_id=',
  SYNC_ENDPOINT1: 'https://cm.g.doubleclick.net/pixel?google_nid=adaptv_dbm&google_cm&google_sc',
  SYNC_ENDPOINT2: 'https://pr-bh.ybp.yahoo.com/sync/adaptv_ortb/{combo_uid}',
  SYNC_ENDPOINT3: 'https://sync-tm.everesttech.net/upi/pid/m7y5t93k?redir=https%3A%2F%2Fsync.adap.tv%2Fsync%3Ftype%3Dgif%26key%3Dtubemogul%26uid%3D%24%7BUSER_ID%7D',
  SYNC_ENDPOINT4: 'https://match.adsrvr.org/track/cmf/generic?ttd_pid=adaptv&ttd_tpi=1',
  supportedMediaTypes: ['video'],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    if (bid.bidder !== BIDDER_CODE || typeof bid.params === 'undefined') {
      return false;
    } // Video validations


    if (typeof bid.params.video === 'undefined' || typeof bid.params.video.playerWidth === 'undefined' || typeof bid.params.video.playerHeight == 'undefined' || typeof bid.params.video.mimes == 'undefined') {
      return false;
    } // Pub Id validation


    if (typeof bid.params.pubId === 'undefined') {
      return false;
    }

    return true;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {validBidRequests[]} - an array of bids
   * @param bidderRequest
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(bids, bidRequest) {
    var consentData = bidRequest ? bidRequest.gdprConsent : null;
    return bids.map(function (bid) {
      return {
        method: 'POST',

        /** removing adding local protocal since we
         * can get cookie data only if we call with https. */
        url: spec.ENDPOINT + bid.params.pubId,
        data: getRequestData(bid, consentData, bidRequest),
        bidRequest: bid
      };
    });
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(response, _ref) {
    var bidRequest = _ref.bidRequest;
    var bid;
    var size;
    var bidResponse;

    try {
      response = response.body;
      bid = response.seatbid[0].bid[0];
    } catch (e) {
      response = null;
    }

    if (!response || !bid || !bid.adm && !bid.nurl || !bid.price) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]("No valid bids from ".concat(spec.code, " bidder"));
      return [];
    }

    size = getSize(bidRequest.sizes);
    bidResponse = {
      requestId: bidRequest.bidId,
      bidderCode: spec.code,
      cpm: bid.price,
      adId: bid.adid,
      creativeId: bid.crid,
      width: size.width,
      height: size.height,
      mediaType: 'video',
      currency: response.cur,
      ttl: 100,
      netRevenue: true,
      adUnitCode: bidRequest.adUnitCode
    };

    if (bid.nurl) {
      bidResponse.vastUrl = bid.nurl;
    } else if (bid.adm) {
      bidResponse.vastXml = bid.adm;
    }

    bidResponse.renderer = bidRequest.mediaTypes.video.context === 'outstream' ? newRenderer(bidRequest, bidResponse) : undefined;
    return bidResponse;
  },

  /**
   * Register the user sync pixels which should be dropped after the auction.
   *
   * @param {SyncOptions} syncOptions Which user syncs are allowed?
   * @param {ServerResponse[]} serverResponses List of server's responses.
   * @return {UserSync[]} The user syncs which should be dropped.
   */
  getUserSyncs: function getUserSyncs(syncOptions) {
    if (syncOptions.pixelEnabled) {
      return [{
        type: 'image',
        url: spec.SYNC_ENDPOINT1
      }, {
        type: 'image',
        url: spec.SYNC_ENDPOINT2
      }, {
        type: 'image',
        url: spec.SYNC_ENDPOINT3
      }, {
        type: 'image',
        url: spec.SYNC_ENDPOINT4
      }];
    }
  }
};

function getSize(sizes) {
  var parsedSizes = __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](sizes);

  var _ref2 = parsedSizes.length ? parsedSizes[0].split('x') : [],
      _ref3 = _slicedToArray(_ref2, 2),
      width = _ref3[0],
      height = _ref3[1];

  return {
    width: parseInt(width, 10) || undefined,
    height: parseInt(height, 10) || undefined
  };
}

function isConsentRequired(consentData) {
  return !!(consentData && consentData.gdprApplies);
}

function getRequestData(bid, consentData, bidRequest) {
  var loc = bidRequest.refererInfo.referer;
  var page = bid.params.site && bid.params.site.page ? bid.params.site.page : loc.href;
  var ref = bid.params.site && bid.params.site.referrer ? bid.params.site.referrer : bidRequest.refererInfo.referer;
  var bidData = {
    id: __WEBPACK_IMPORTED_MODULE_0__src_utils__["generateUUID"](),
    at: 2,
    cur: bid.cur || 'USD',
    imp: [{
      id: '1',
      secure: isSecure(),
      bidfloor: bid.params.bidfloor,
      ext: {
        hb: 1
      }
    }],
    site: {
      page: page,
      ref: ref
    },
    device: {
      ua: navigator.userAgent
    },
    tmax: 200
  };

  if (bid.params.video.display == undefined || bid.params.video.display != 1) {
    bidData.imp[0].video = {
      mimes: bid.params.video.mimes,
      w: bid.params.video.playerWidth,
      h: bid.params.video.playerHeight,
      pos: bid.params.video.position
    };

    if (bid.params.video.maxbitrate) {
      bidData.imp[0].video.maxbitrate = bid.params.video.maxbitrate;
    }

    if (bid.params.video.maxduration) {
      bidData.imp[0].video.maxduration = bid.params.video.maxduration;
    }

    if (bid.params.video.minduration) {
      bidData.imp[0].video.minduration = bid.params.video.minduration;
    }

    if (bid.params.video.api) {
      bidData.imp[0].video.api = bid.params.video.api;
    }

    if (bid.params.video.delivery) {
      bidData.imp[0].video.delivery = bid.params.video.delivery;
    }

    if (bid.params.video.position) {
      bidData.imp[0].video.pos = bid.params.video.position;
    }

    if (bid.params.video.playbackmethod) {
      bidData.imp[0].video.playbackmethod = bid.params.video.playbackmethod;
    }

    if (bid.params.video.placement) {
      bidData.imp[0].video.placement = bid.params.video.placement;
    }

    if (bid.params.video.rewarded) {
      bidData.imp[0].ext.rewarded = bid.params.video.rewarded;
    }
  } else if (bid.params.video.display == 1) {
    bidData.imp[0].banner = {
      mimes: bid.params.video.mimes,
      w: bid.params.video.playerWidth,
      h: bid.params.video.playerHeight,
      pos: bid.params.video.position
    };

    if (bid.params.video.placement) {
      bidData.imp[0].banner.placement = bid.params.video.placement;
    }
  }

  if (bid.params.video.inventoryid) {
    bidData.imp[0].ext.inventoryid = bid.params.video.inventoryid;
  }

  if (bid.params.video.sid) {
    bidData.source = {
      ext: {
        schain: {
          complete: 1,
          nodes: [{
            sid: bid.params.video.sid,
            rid: bidData.id
          }]
        }
      }
    };
  }

  if (bid.params.site && bid.params.site.id) {
    bidData.site.id = bid.params.site.id;
  }

  if (isConsentRequired(consentData)) {
    bidData.regs = {
      ext: {
        gdpr: 1
      }
    };

    if (consentData.consentString) {
      bidData.user = {
        ext: {
          consent: consentData.consentString
        }
      };
    }
  }

  if (bidRequest && bidRequest.uspConsent) {
    bidData.regs = {
      ext: {
        us_privacy: bidRequest.uspConsent
      }
    };
  }

  return bidData;
}

function isSecure() {
  return document.location.protocol === 'https:';
}
/**
 * Create oneVideo renderer
 * @returns {*}
 */


function newRenderer(bidRequest, bid) {
  if (!bidRequest.renderer) {
    bidRequest.renderer = {};
    bidRequest.renderer.url = 'https://cdn.vidible.tv/prod/hb-outstream-renderer/renderer.js';

    bidRequest.renderer.render = function (bid) {
      setTimeout(function () {
        o2PlayerRender(bid);
      }, 700);
    };
  }
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[369]);