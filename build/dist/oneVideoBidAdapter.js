pbjsChunk([157],{

/***/ 557:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(558);


/***/ }),

/***/ 558:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var BIDDER_CODE = 'oneVideo';
var spec = {
  code: 'oneVideo',
  VERSION: '3.0.3',
  ENDPOINT: 'https://ads.adaptv.advertising.com/rtb/openrtb?ext_id=',
  E2ETESTENDPOINT: 'https://ads-wc.v.ssp.yahoo.com/rtb/openrtb?ext_id=',
  SYNC_ENDPOINT1: 'https://cm.g.doubleclick.net/pixel?google_nid=adaptv_dbm&google_cm&google_sc',
  SYNC_ENDPOINT2: 'https://pr-bh.ybp.yahoo.com/sync/adaptv_ortb/{combo_uid}',
  SYNC_ENDPOINT3: 'https://match.adsrvr.org/track/cmf/generic?ttd_pid=adaptv&ttd_tpi=1',
  supportedMediaTypes: ['video', 'banner'],

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
    } // Prevend DAP Outstream validation, Banner DAP validation & Multi-Format adUnit support


    if (bid.mediaTypes.video) {
      if (bid.mediaTypes.video.context === 'outstream' && bid.params.video.display === 1) {
        return false;
      }
    } else if (bid.mediaTypes.banner && !bid.params.video.display) {
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
      var url = spec.ENDPOINT;
      var pubId = bid.params.pubId;

      if (bid.params.video.e2etest) {
        url = spec.E2ETESTENDPOINT;
        pubId = 'HBExchange';
      }

      return {
        method: 'POST',

        /** removing adding local protocal since we
         * can get cookie data only if we call with https. */
        url: url + pubId,
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
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("No valid bids from ".concat(spec.code, " bidder"));
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
      currency: response.cur,
      ttl: 100,
      netRevenue: true,
      adUnitCode: bidRequest.adUnitCode
    };
    bidResponse.mediaType = bidRequest.mediaTypes.banner ? 'banner' : 'video';

    if (bid.nurl) {
      bidResponse.vastUrl = bid.nurl;
    } else if (bid.adm && bidRequest.params.video.display === 1) {
      bidResponse.ad = bid.adm;
    } else if (bid.adm) {
      bidResponse.vastXml = bid.adm;
    }

    if (bidRequest.mediaTypes.video) {
      bidResponse.renderer = bidRequest.mediaTypes.video.context === 'outstream' ? newRenderer(bidRequest, bidResponse) : undefined;
    }

    return bidResponse;
  },

  /**
   * Register the user sync pixels which should be dropped after the auction.
   *
   * @param {SyncOptions} syncOptions Which user syncs are allowed?
   * @param {ServerResponse[]} serverResponses List of server's responses.
   * @return {UserSync[]} The user syncs which should be dropped.
   */
  getUserSyncs: function getUserSyncs(syncOptions, responses) {
    var consentData = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var gdprApplies = consentData.gdprApplies,
        _consentData$consentS = consentData.consentString,
        consentString = _consentData$consentS === void 0 ? '' : _consentData$consentS;

    if (syncOptions.pixelEnabled) {
      return [{
        type: 'image',
        url: spec.SYNC_ENDPOINT1
      }, {
        type: 'image',
        url: spec.SYNC_ENDPOINT2
      }, {
        type: 'image',
        url: "https://sync-tm.everesttech.net/upi/pid/m7y5t93k?gdpr=".concat(gdprApplies ? 1 : 0, "&gdpr_consent=").concat(consentString, "&redir=https%3A%2F%2Fpixel.advertising.com%2Fups%2F55986%2Fsync%3Fuid%3D%24%7BUSER_ID%7D%26_origin%3D0") + encodeURI("&gdpr=".concat(gdprApplies ? 1 : 0, "&gdpr_consent=").concat(consentString))
      }, {
        type: 'image',
        url: spec.SYNC_ENDPOINT3
      }];
    }
  }
};

function getSize(sizes) {
  var parsedSizes = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseSizesInput"](sizes);

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
    id: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["generateUUID"](),
    at: 2,
    cur: bid.cur || 'USD',
    imp: [{
      id: '1',
      secure: isSecure(),
      bidfloor: bid.params.bidfloor,
      ext: {
        hb: 1,
        prebidver: "4.2.0",
        adapterver: spec.VERSION
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

    bidData.imp[0].video.linearity = 1;
    bidData.imp[0].video.protocols = bid.params.video.protocols || [2, 5];
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

    if (bid.params.video.maxduration) {
      bidData.imp[0].banner.ext = bidData.imp[0].banner.ext || {};
      bidData.imp[0].banner.ext.maxduration = bid.params.video.maxduration;
    }

    if (bid.params.video.minduration) {
      bidData.imp[0].banner.ext = bidData.imp[0].banner.ext || {};
      bidData.imp[0].banner.ext.minduration = bid.params.video.minduration;
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

    if (bid.params.video.hp == 1) {
      bidData.source.ext.schain.nodes[0].hp = bid.params.video.hp;
    }
  } else if (bid.schain) {
    bidData.source = {
      ext: {
        schain: bid.schain
      }
    };
    bidData.source.ext.schain.nodes[0].rid = bidData.id;
  }

  if (bid.params.site && bid.params.site.id) {
    bidData.site.id = bid.params.site.id;
  }

  if (isConsentRequired(consentData) || bidRequest && bidRequest.uspConsent) {
    bidData.regs = {
      ext: {}
    };

    if (isConsentRequired(consentData)) {
      bidData.regs.ext.gdpr = 1;
    }

    if (consentData && consentData.consentString) {
      bidData.user = {
        ext: {
          consent: consentData.consentString
        }
      };
    } // ccpa support


    if (bidRequest && bidRequest.uspConsent) {
      bidData.regs.ext.us_privacy = bidRequest.uspConsent;
    }
  }

  if (bid.params.video.e2etest) {
    bidData.imp[0].bidfloor = null;
    bidData.imp[0].video.w = 300;
    bidData.imp[0].video.h = 250;
    bidData.imp[0].video.mimes = ['video/mp4', 'application/javascript'];
    bidData.imp[0].video.api = [2];
    bidData.site.page = 'https://verizonmedia.com';
    bidData.site.ref = 'https://verizonmedia.com';
    bidData.tmax = 1000;
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
        // eslint-disable-next-line no-undef
        o2PlayerRender(bid);
      }, 700);
    };
  }
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[557]);