pbjsChunk([231],{

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(221);


/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }





var BIDDER_CODE = 'bridgewell';
var REQUEST_ENDPOINT = '//rec.scupio.com/recweb/prebid.aspx?cb=' + Math.random();
var BIDDER_VERSION = '0.0.2';
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["c" /* NATIVE */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    var valid = false;
    var typeOfCpmWeight;

    if (bid && bid.params) {
      if (bid.params.ChannelID) {
        // cpmWeight is optinal parameter and should above than zero
        typeOfCpmWeight = _typeof(bid.params.cpmWeight);

        if (typeOfCpmWeight === 'undefined') {
          bid.params.cpmWeight = 1;
          valid = true;
        } else if (typeOfCpmWeight === 'number' && bid.params.cpmWeight > 0) {
          valid = true;
        } else {
          valid = false;
        }
      }
    }

    return valid;
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} validBidRequests - an array of bids
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests) {
    var adUnits = [];

    __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](validBidRequests, function (bid) {
      adUnits.push({
        ChannelID: bid.params.ChannelID,
        mediaTypes: bid.mediaTypes || {
          banner: {
            sizes: bid.sizes
          }
        }
      });
    });

    return {
      method: 'POST',
      url: REQUEST_ENDPOINT,
      data: {
        version: {
          prebid: "2.37.0",
          bridgewell: BIDDER_VERSION
        },
        inIframe: __WEBPACK_IMPORTED_MODULE_0__src_utils__["inIframe"](),
        url: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowUrl"](),
        referrer: __WEBPACK_IMPORTED_MODULE_0__src_utils__["getTopWindowReferrer"](),
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

    __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](bidRequest.validBidRequests, function (req) {
      var bidResponse = {};

      if (!serverResponse.body) {
        return;
      }

      var matchedResponse = __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find___default()(serverResponse.body, function (res) {
        var valid = false;

        if (!!res && !res.consumed) {
          // response exists and not consumed
          if (res.width && res.height) {
            var mediaTypes = req.mediaTypes; // for prebid 1.0 and later usage, mediaTypes.banner.sizes

            var sizes = mediaTypes && mediaTypes.banner && mediaTypes.banner.sizes ? mediaTypes.banner.sizes : req.sizes;

            if (sizes) {
              var sizeValid;
              var width = res.width;
              var height = res.height; // check response size validation

              if (typeof sizes[0] === 'number') {
                // for foramt Array[Number] check
                sizeValid = width === sizes[0] && height === sizes[1];
              } else {
                // for format Array[Array[Number]] check
                sizeValid = __WEBPACK_IMPORTED_MODULE_3_core_js_library_fn_array_find___default()(sizes, function (size) {
                  return width === size[0] && height === size[1];
                });
              }

              if (sizeValid || mediaTypes && mediaTypes.native) {
                // dont care native sizes
                valid = true;
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
        bidResponse.cpm = matchedResponse.cpm * req.params.cpmWeight;
        bidResponse.width = matchedResponse.width;
        bidResponse.height = matchedResponse.height;
        bidResponse.ttl = matchedResponse.ttl;
        bidResponse.creativeId = matchedResponse.id;
        bidResponse.netRevenue = matchedResponse.netRevenue;
        bidResponse.currency = matchedResponse.currency;
        bidResponse.mediaType = matchedResponse.mediaType; // check required parameters by matchedResponse.mediaType

        switch (matchedResponse.mediaType) {
          case __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */]:
            // check banner required parameters
            if (typeof matchedResponse.ad !== 'string') {
              return;
            }

            bidResponse.ad = matchedResponse.ad;
            break;

          case __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["c" /* NATIVE */]:
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
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[220]);