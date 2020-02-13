pbjsChunk([81],{

/***/ 586:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(587);


/***/ }),

/***/ 587:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogError", function() { return LogError; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var errorUrl = 'https://pcb.aws.lijit.com/c';
var errorpxls = [];
var spec = {
  code: 'sovrn',
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */]],

  /**
   * Check if the bid is a valid zone ID in either number or string form
   * @param {object} bid the Sovrn bid to validate
   * @return boolean for whether or not a bid is valid
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params.tagid && !isNaN(parseFloat(bid.params.tagid)) && isFinite(bid.params.tagid));
  },

  /**
   * Format the bid request object for our endpoint
   * @param {BidRequest[]} bidRequests Array of Sovrn bidders
   * @return object of parameters for Prebid AJAX request
   */
  buildRequests: function buildRequests(bidReqs, bidderRequest) {
    try {
      var loc = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowLocation"]();
      var sovrnImps = [];
      var iv;

      __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](bidReqs, function (bid) {
        iv = iv || __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('iv', bid.params);
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
        sovrnImps.push({
          id: bid.bidId,
          banner: {
            format: processedSizes,
            w: 1,
            h: 1
          },
          tagid: String(__WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('tagid', bid.params)),
          bidfloor: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('bidfloor', bid.params)
        });
      });

      var sovrnBidReq = {
        id: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getUniqueIdentifierStr"](),
        imp: sovrnImps,
        site: {
          domain: loc.host,
          page: loc.host + loc.pathname + loc.search + loc.hash
        }
      };

      if (bidderRequest && bidderRequest.gdprConsent) {
        sovrnBidReq.regs = {
          ext: {
            gdpr: +bidderRequest.gdprConsent.gdprApplies
          }
        };
        sovrnBidReq.user = {
          ext: {
            consent: bidderRequest.gdprConsent.consentString
          }
        };
      }

      var url = "//ap.lijit.com/rtb/bid?" + "src=Genius_prebid_2.37.0";
      if (iv) url += "&iv=".concat(iv);
      return {
        method: 'POST',
        url: url,
        data: JSON.stringify(sovrnBidReq),
        options: {
          contentType: 'text/plain'
        }
      };
    } catch (e) {
      new LogError(e, {
        bidReqs: bidReqs,
        bidderRequest: bidderRequest
      }).append();
    }
  },

  /**
   * Format Sovrn responses as Prebid bid responses
   * @param {id, seatbid} sovrnResponse A successful response from Sovrn.
   * @return {Bid[]} An array of formatted bids.
  */
  interpretResponse: function interpretResponse(_ref) {
    var _ref$body = _ref.body,
        id = _ref$body.id,
        seatbid = _ref$body.seatbid;

    try {
      var sovrnBidResponses = [];

      if (id && seatbid && seatbid.length > 0 && seatbid[0].bid && seatbid[0].bid.length > 0) {
        seatbid[0].bid.map(function (sovrnBid) {
          sovrnBidResponses.push({
            requestId: sovrnBid.impid,
            cpm: parseFloat(sovrnBid.price),
            width: parseInt(sovrnBid.w),
            height: parseInt(sovrnBid.h),
            creativeId: sovrnBid.crid || sovrnBid.id,
            dealId: sovrnBid.dealid || null,
            currency: 'USD',
            netRevenue: true,
            mediaType: __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */],
            ad: decodeURIComponent("".concat(sovrnBid.adm, "<img src=\"").concat(sovrnBid.nurl, "\">")),
            ttl: 60
          });
        });
      }

      return sovrnBidResponses;
    } catch (e) {
      new LogError(e, {
        id: id,
        seatbid: seatbid
      }).append();
    }
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses, gdprConsent) {
    try {
      var tracks = [];

      if (serverResponses && serverResponses.length !== 0 && syncOptions.iframeEnabled) {
        var iidArr = serverResponses.filter(function (rsp) {
          return rsp.body && rsp.body.ext && rsp.body.ext.iid;
        }).map(function (rsp) {
          return rsp.body.ext.iid;
        });
        var consentString = '';

        if (gdprConsent && gdprConsent.gdprApplies && typeof gdprConsent.consentString === 'string') {
          consentString = gdprConsent.consentString;
        }

        if (iidArr[0]) {
          tracks.push({
            type: 'iframe',
            url: '//ap.lijit.com/beacon?informer=' + iidArr[0] + '&gdpr_consent=' + consentString
          });
        }
      }

      if (errorpxls.length && syncOptions.pixelEnabled) {
        tracks = tracks.concat(errorpxls);
      }

      return tracks;
    } catch (e) {
      if (syncOptions.pixelEnabled) {
        return errorpxls;
      }

      return [];
    }
  }
};
var LogError =
/*#__PURE__*/
function () {
  function LogError(e, data) {
    _classCallCheck(this, LogError);

    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"](e);
    this.error = {};
    this.error.t = __WEBPACK_IMPORTED_MODULE_0__src_utils__["timestamp"]();
    this.error.m = e.message;
    this.error.s = e.stack;
    this.error.d = data;
    this.error.v = "Genius_prebid_2.37.0";
    this.error.u = __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowLocation"]().href;
    this.error.ua = navigator.userAgent;
  }

  _createClass(LogError, [{
    key: "buildErrorString",
    value: function buildErrorString(obj) {
      return errorUrl + '?b=' + btoa(JSON.stringify(obj));
    }
  }, {
    key: "append",
    value: function append() {
      var errstr = this.buildErrorString(this.error);

      if (errstr.length > 2083) {
        delete this.error.d;
        errstr = this.buildErrorString(this.error);

        if (errstr.length > 2083) {
          delete this.error.s;
          errstr = this.buildErrorString(this.error);

          if (errstr.length > 2083) {
            errstr = this.buildErrorString({
              m: 'unknown error message',
              t: this.error.t,
              u: this.error.u
            });
          }
        }
      }

      var obj = {
        type: 'image',
        url: errstr
      };
      errorpxls.push(obj);
    }
  }], [{
    key: "getErrPxls",
    value: function getErrPxls() {
      return errorpxls;
    }
  }]);

  return LogError;
}();
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[586]);