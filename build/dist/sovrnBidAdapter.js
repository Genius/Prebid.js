pbjsChunk([95],{

/***/ 720:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(721);


/***/ }),

/***/ 721:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);



var spec = {
  code: 'sovrn',
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */]],

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
      var unifiedID;

      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](bidReqs, function (bid) {
        if (!unifiedID) {
          unifiedID = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'userId.tdid');
        }

        if (bid.schain) {
          schain = schain || bid.schain;
        }

        iv = iv || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('iv', bid.params);
        var bidSizes = bid.mediaTypes && bid.mediaTypes.banner && bid.mediaTypes.banner.sizes || bid.sizes;
        bidSizes = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](bidSizes) && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](bidSizes[0]) ? bidSizes : [bidSizes];
        bidSizes = bidSizes.filter(function (size) {
          return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArray"](size);
        });
        var processedSizes = bidSizes.map(function (size) {
          return {
            w: parseInt(size[0], 10),
            h: parseInt(size[1], 10)
          };
        });
        sovrnImps.push({
          adunitcode: bid.adUnitCode,
          id: bid.bidId,
          banner: {
            format: processedSizes,
            w: 1,
            h: 1
          },
          tagid: String(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('tagid', bid.params)),
          bidfloor: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getBidIdParameter"]('bidfloor', bid.params)
        });
      });

      var page = bidderRequest.refererInfo.referer; // clever trick to get the domain

      var domain = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseUrl"](page).hostname;
      var sovrnBidReq = {
        id: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getUniqueIdentifierStr"](),
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

      if (bidderRequest.gdprConsent) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](sovrnBidReq, 'regs.ext.gdpr', +bidderRequest.gdprConsent.gdprApplies);
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](sovrnBidReq, 'user.ext.consent', bidderRequest.gdprConsent.consentString);
      }

      if (bidderRequest.uspConsent) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](sovrnBidReq, 'regs.ext.us_privacy', bidderRequest.uspConsent);
      }

      if (unifiedID) {
        var idArray = [{
          source: 'adserver.org',
          uids: [{
            id: unifiedID,
            ext: {
              rtiPartner: 'TDID'
            }
          }]
        }];
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepSetValue"](sovrnBidReq, 'user.ext.eids', idArray);
      }

      var url = "https://ap.lijit.com/rtb/bid?src=Genius_prebid_4.2.0";
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
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('Could not build bidrequest, error deatils:', e);
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
            mediaType: __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */],
            ad: decodeURIComponent("".concat(sovrnBid.adm, "<img src=\"").concat(sovrnBid.nurl, "\">")),
            ttl: 60
          });
        });
      }

      return sovrnBidResponses;
    } catch (e) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('Could not intrepret bidresponse, error deatils:', e);
    }
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses, gdprConsent, uspConsent) {
    try {
      var tracks = [];

      if (serverResponses && serverResponses.length !== 0) {
        if (syncOptions.iframeEnabled) {
          var iidArr = serverResponses.filter(function (resp) {
            return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](resp, 'body.ext.iid');
          }).map(function (resp) {
            return resp.body.ext.iid;
          });
          var params = [];

          if (gdprConsent && gdprConsent.gdprApplies && typeof gdprConsent.consentString === 'string') {
            params.push(['gdpr_consent', gdprConsent.consentString]);
          }

          if (uspConsent) {
            params.push(['us_privacy', uspConsent]);
          }

          if (iidArr[0]) {
            params.push(['informer', iidArr[0]]);
            tracks.push({
              type: 'iframe',
              url: 'https://ap.lijit.com/beacon?' + params.map(function (p) {
                return p.join('=');
              }).join('&')
            });
          }
        }

        if (syncOptions.pixelEnabled) {
          serverResponses.filter(function (resp) {
            return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](resp, 'body.ext.sync.pixels');
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
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[720]);