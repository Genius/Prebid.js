pbjsChunk([63],{

/***/ 480:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(481);


/***/ }),

/***/ 481:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_url__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__ = __webpack_require__(2);




var spec = {
  code: 'sovrn',
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["b" /* BANNER */]],

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
      var sovrnImps = [];
      var iv;
      var schain;
      var digitrust;

      __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](bidReqs, function (bid) {
        if (!digitrust) {
          var bidRequestDigitrust = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'userId.digitrustid.data');

          if (bidRequestDigitrust && (!bidRequestDigitrust.privacy || !bidRequestDigitrust.privacy.optout)) {
            digitrust = {
              id: bidRequestDigitrust.id,
              keyv: bidRequestDigitrust.keyv
            };
          }
        }

        if (bid.schain) {
          schain = schain || bid.schain;
        }

        iv = iv || __WEBPACK_IMPORTED_MODULE_0__src_utils__["getBidIdParameter"]('iv', bid.params);
        var bidSizes = bid.mediaTypes && bid.mediaTypes.banner && bid.mediaTypes.banner.sizes || bid.sizes;
        bidSizes = __WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](bidSizes) && __WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](bidSizes[0]) ? bidSizes : [bidSizes];
        bidSizes = bidSizes.filter(function (size) {
          return __WEBPACK_IMPORTED_MODULE_0__src_utils__["isArray"](size);
        });
        var processedSizes = bidSizes.map(function (size) {
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

      var page = bidderRequest.refererInfo.referer; // clever trick to get the domain

      var domain = Object(__WEBPACK_IMPORTED_MODULE_1__src_url__["c" /* parse */])(page).hostname;
      var sovrnBidReq = {
        id: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getUniqueIdentifierStr"](),
        imp: sovrnImps,
        site: {
          page: page,
          domain: domain
        }
      };

      if (schain) {
        sovrnBidReq.source = {
          ext: {
            schain: schain
          }
        };
      }

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

      if (digitrust) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepSetValue"](sovrnBidReq, 'user.ext.digitrust', {
          id: digitrust.id,
          keyv: digitrust.keyv
        });
      }

      var url = "https://ap.lijit.com/rtb/bid?" + "src=Genius_prebid_3.0.0";
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
      console.log('error in build:');
      console.log(e);
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
            mediaType: __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["b" /* BANNER */],
            ad: decodeURIComponent("".concat(sovrnBid.adm, "<img src=\"").concat(sovrnBid.nurl, "\">")),
            ttl: 60
          });
        });
      }

      return sovrnBidResponses;
    } catch (e) {
      console.log('error in interpret:');
      console.log(e);
    }
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses, gdprConsent) {
    try {
      var tracks = [];

      if (serverResponses && serverResponses.length !== 0) {
        if (syncOptions.iframeEnabled) {
          var iidArr = serverResponses.filter(function (resp) {
            return __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](resp, 'body.ext.iid');
          }).map(function (resp) {
            return resp.body.ext.iid;
          });
          var consentString = '';

          if (gdprConsent && gdprConsent.gdprApplies && typeof gdprConsent.consentString === 'string') {
            consentString = gdprConsent.consentString;
          }

          if (iidArr[0]) {
            tracks.push({
              type: 'iframe',
              url: 'https://ap.lijit.com/beacon?informer=' + iidArr[0] + '&gdpr_consent=' + consentString
            });
          }
        }

        if (syncOptions.pixelEnabled) {
          serverResponses.filter(function (resp) {
            return __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](resp, 'body.ext.sync.pixels');
          }).reduce(function (acc, resp) {
            return acc.concat(resp.body.ext.sync.pixels);
          }, []).map(function (pixel) {
            return pixel.url;
          }).forEach(function (url) {
            return tracks.push({
              type: 'image',
              url: url
            });
          });
        }
      }

      return tracks;
    } catch (e) {
      return [];
    }
  }
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[480]);