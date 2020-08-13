pbjsChunk([267],{

/***/ 299:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(300);


/***/ }),

/***/ 300:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js__);




var BIDDER_CODE = 'bridgewell';
var REQUEST_ENDPOINT = 'https://prebid.scupio.com/recweb/prebid.aspx?cb=' + Math.random();
var BIDDER_VERSION = '0.0.2';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["c" /* NATIVE */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    var valid = false;

    if (bid && bid.params && bid.params.ChannelID) {
      valid = true;
    }

    return valid;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} validBidRequests - an array of bids
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var adUnits = [];

    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](validBidRequests, function (bid) {
      adUnits.push({
        ChannelID: bid.params.ChannelID,
        adUnitCode: bid.adUnitCode,
        mediaTypes: bid.mediaTypes || {
          banner: {
            sizes: bid.sizes
          }
        }
      });
    });

    var topUrl = '';

    if (bidderRequest && bidderRequest.refererInfo) {
      topUrl = bidderRequest.refererInfo.referer;
    }

    return {
      method: 'POST',
      url: REQUEST_ENDPOINT,
      data: {
        version: {
          prebid: "4.2.0",
          bridgewell: BIDDER_VERSION
        },
        inIframe: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["inIframe"](),
        url: topUrl,
        referrer: getTopWindowReferrer(),
        adUnits: adUnits
      },
      validBidRequests: validBidRequests
    };
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @param {*} bidRequest
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var bidResponses = []; // map responses to requests

    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](bidRequest.validBidRequests, function (req) {
      var bidResponse = {};

      if (!serverResponse.body) {
        return;
      }

      var matchedResponse = __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default()(serverResponse.body, function (res) {
        var valid = false;

        if (res && !res.consumed) {
          var mediaTypes = req.mediaTypes;
          var adUnitCode = req.adUnitCode;

          if (res.adUnitCode) {
            return res.adUnitCode === adUnitCode;
          } else if (res.width && res.height && mediaTypes) {
            if (mediaTypes.native) {
              // dont care native sizes
              valid = true;
            } else if (mediaTypes.banner) {
              if (mediaTypes.banner.sizes) {
                var width = res.width;
                var height = res.height;
                var sizes = mediaTypes.banner.sizes; // check response size validation

                if (typeof sizes[0] === 'number') {
                  // for foramt Array[Number] check
                  valid = width === sizes[0] && height === sizes[1];
                } else {
                  // for format Array[Array[Number]] check
                  valid = !!__WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_find_js___default()(sizes, function (size) {
                    return width === size[0] && height === size[1];
                  });
                }
              }
            }
          }
        }

        return valid;
      });

      if (matchedResponse) {
        matchedResponse.consumed = true; // check required parameters

        if (typeof matchedResponse.cpm !== 'number') {
          return;
        } else if (typeof matchedResponse.netRevenue !== 'boolean') {
          return;
        } else if (typeof matchedResponse.currency !== 'string') {
          return;
        } else if (typeof matchedResponse.mediaType !== 'string') {
          return;
        }

        bidResponse.requestId = req.bidId;
        bidResponse.cpm = matchedResponse.cpm;
        bidResponse.width = matchedResponse.width;
        bidResponse.height = matchedResponse.height;
        bidResponse.ttl = matchedResponse.ttl;
        bidResponse.creativeId = matchedResponse.id;
        bidResponse.netRevenue = matchedResponse.netRevenue;
        bidResponse.currency = matchedResponse.currency;
        bidResponse.mediaType = matchedResponse.mediaType; // check required parameters by matchedResponse.mediaType

        switch (matchedResponse.mediaType) {
          case __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["b" /* BANNER */]:
            // check banner required parameters
            if (typeof matchedResponse.ad !== 'string') {
              return;
            }

            bidResponse.ad = matchedResponse.ad;
            break;

          case __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes_js__["c" /* NATIVE */]:
            // check native required parameters
            if (!matchedResponse.native) {
              return;
            }

            var reqNativeLayout = req.mediaTypes.native;
            var resNative = matchedResponse.native; // check title

            var title = reqNativeLayout.title;

            if (title && title.required) {
              if (typeof resNative.title !== 'string') {
                return;
              } else if (title.len && title.len < resNative.title.length) {
                return;
              }
            } // check body


            var body = reqNativeLayout.body;

            if (body && body.required) {
              if (typeof resNative.body !== 'string') {
                return;
              }
            } // check image


            var image = reqNativeLayout.image;

            if (image && image.required) {
              if (resNative.image) {
                if (typeof resNative.image.url !== 'string') {
                  // check image url
                  return;
                } else {
                  if (resNative.image.width !== image.sizes[0] || resNative.image.height !== image.sizes[1]) {
                    // check image sizes
                    return;
                  }
                }
              } else {
                return;
              }
            } // check sponsoredBy


            var sponsoredBy = reqNativeLayout.sponsoredBy;

            if (sponsoredBy && sponsoredBy.required) {
              if (typeof resNative.sponsoredBy !== 'string') {
                return;
              }
            } // check icon


            var icon = reqNativeLayout.icon;

            if (icon && icon.required) {
              if (resNative.icon) {
                if (typeof resNative.icon.url !== 'string') {
                  // check icon url
                  return;
                } else {
                  if (resNative.icon.width !== icon.sizes[0] || resNative.icon.height !== icon.sizes[0]) {
                    // check image sizes
                    return;
                  }
                }
              } else {
                return;
              }
            } // check clickUrl


            if (typeof resNative.clickUrl !== 'string') {
              return;
            } // check clickTracker


            var clickTrackers = resNative.clickTrackers;

            if (clickTrackers) {
              if (clickTrackers.length === 0) {
                return;
              }
            } else {
              return;
            } // check impressionTrackers


            var impressionTrackers = resNative.impressionTrackers;

            if (impressionTrackers) {
              if (impressionTrackers.length === 0) {
                return;
              }
            } else {
              return;
            }

            bidResponse.native = matchedResponse.native;
            break;

          default:
            // response mediaType is not supported
            return;
        }

        bidResponses.push(bidResponse);
      }
    });

    return bidResponses;
  }
};

function getTopWindowReferrer() {
  try {
    return window.top.document.referrer;
  } catch (e) {
    return '';
  }
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[299]);