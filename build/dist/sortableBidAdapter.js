pbjsChunk([96],{

/***/ 716:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(717);


/***/ }),

/***/ 717:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__ = __webpack_require__(2);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var BIDDER_CODE = 'sortable';
var SERVER_URL = 'https://c.deployads.com';

function setAssetRequired(native, asset) {
  if (native.required) {
    asset.required = 1;
  }

  return asset;
}

function buildNativeRequest(nativeMediaType) {
  var assets = [];
  var title = nativeMediaType.title;

  if (title) {
    assets.push(setAssetRequired(title, {
      title: {
        len: title.len
      }
    }));
  }

  var img = nativeMediaType.image;

  if (img) {
    assets.push(setAssetRequired(img, {
      img: {
        type: 3,
        // Main
        wmin: 1,
        hmin: 1
      }
    }));
  }

  var icon = nativeMediaType.icon;

  if (icon) {
    assets.push(setAssetRequired(icon, {
      img: {
        type: 1,
        // Icon
        wmin: 1,
        hmin: 1
      }
    }));
  }

  var body = nativeMediaType.body;

  if (body) {
    assets.push(setAssetRequired(body, {
      data: {
        type: 2
      }
    }));
  }

  var cta = nativeMediaType.cta;

  if (cta) {
    assets.push(setAssetRequired(cta, {
      data: {
        type: 12
      }
    }));
  }

  var sponsoredBy = nativeMediaType.sponsoredBy;

  if (sponsoredBy) {
    assets.push(setAssetRequired(sponsoredBy, {
      data: {
        type: 1
      }
    }));
  }

  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](assets, function (asset, id) {
    return asset.id = id;
  });

  return {
    ver: '1',
    request: JSON.stringify({
      ver: '1',
      assets: assets
    })
  };
}

function tryParseNativeResponse(adm) {
  var native = null;

  try {
    native = JSON.parse(adm);
  } catch (e) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('Sortable bid adapter unable to parse native bid response:\n\n' + e);
  }

  return native && native.native;
}

function createImgObject(img) {
  if (img.w || img.h) {
    return {
      url: img.url,
      width: img.w,
      height: img.h
    };
  } else {
    return img.url;
  }
}

function interpretNativeResponse(response) {
  var native = {};

  if (response.link) {
    native.clickUrl = response.link.url;
  }

  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](response.assets, function (asset) {
    switch (asset.id) {
      case 1:
        native.title = asset.title.text;
        break;

      case 2:
        native.image = createImgObject(asset.img);
        break;

      case 3:
        native.icon = createImgObject(asset.img);
        break;

      case 4:
        native.body = asset.data.value;
        break;

      case 5:
        native.cta = asset.data.value;
        break;

      case 6:
        native.sponsoredBy = asset.data.value;
        break;
    }
  });

  return native;
}

function transformSyncs(responses, type, syncs) {
  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](responses, function (res) {
    if (res.body && res.body.ext && res.body.ext.sync_dsps && res.body.ext.sync_dsps.length) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](res.body.ext.sync_dsps, function (sync) {
        if (sync[0] === type && sync[1]) {
          syncs.push({
            type: type,
            url: sync[1]
          });
        }
      });
    }
  });
}

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["c" /* NATIVE */], __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */]],
  isBidRequestValid: function isBidRequestValid(bid) {
    var sortableConfig = __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('sortable');
    var haveSiteId = sortableConfig && !!sortableConfig.siteId || bid.params.siteId;
    var validFloor = !bid.params.floor || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isNumber"](bid.params.floor);
    var validSize = /\d+x\d+/;
    var validFloorSizeMap = !bid.params.floorSizeMap || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isPlainObject"](bid.params.floorSizeMap) && Object.keys(bid.params.floorSizeMap).every(function (size) {
      return size.match(validSize) && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isNumber"](bid.params.floorSizeMap[size]);
    });
    var validKeywords = !bid.params.keywords || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isPlainObject"](bid.params.keywords) && Object.keys(bid.params.keywords).every(function (key) {
      return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](key) && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](bid.params.keywords[key]);
    });
    var isBanner = !bid.mediaTypes || bid.mediaTypes[__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */]] || !(bid.mediaTypes[__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["c" /* NATIVE */]] || bid.mediaTypes[__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */]]);
    var bannerSizes = isBanner ? __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, "mediaType.".concat(__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */], ".sizes")) || bid.sizes : null;
    return !!(bid.params.tagId && haveSiteId && validFloor && validFloorSizeMap && validKeywords && (!isBanner || bannerSizes && bannerSizes.length > 0 && bannerSizes.every(function (sizeArr) {
      return sizeArr.length == 2 && sizeArr.every(function (num) {
        return __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isNumber"](num);
      });
    })));
  },
  buildRequests: function buildRequests(validBidReqs, bidderRequest) {
    var sortableConfig = __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('sortable') || {};
    var globalSiteId = sortableConfig.siteId;
    var loc = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["parseUrl"](bidderRequest.refererInfo.referer);

    var sortableImps = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_map"](validBidReqs, function (bid) {
      var rv = {
        id: bid.bidId,
        tagid: bid.params.tagId,
        ext: {}
      };
      var bannerMediaType = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, "mediaTypes.".concat(__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */]));
      var nativeMediaType = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, "mediaTypes.".concat(__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["c" /* NATIVE */]));
      var videoMediaType = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, "mediaTypes.".concat(__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */]));

      if (bannerMediaType || !(nativeMediaType || videoMediaType)) {
        var bannerSizes = bannerMediaType && bannerMediaType.sizes || bid.sizes;
        rv.banner = {
          format: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_map"](bannerSizes, function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                width = _ref2[0],
                height = _ref2[1];

            return {
              w: width,
              h: height
            };
          })
        };
      }

      if (nativeMediaType) {
        rv.native = buildNativeRequest(nativeMediaType);
      }

      if (videoMediaType && videoMediaType.context === 'instream') {
        var video = {
          placement: 1
        };
        video.mimes = videoMediaType.mimes || [];
        video.minduration = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'params.video.minduration') || 10;
        video.maxduration = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'params.video.maxduration') || 60;
        var startDelay = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'params.video.startdelay');

        if (startDelay != null) {
          video.startdelay = startDelay;
        }

        if (videoMediaType.playerSize && videoMediaType.playerSize.length) {
          var size = videoMediaType.playerSize[0];
          video.w = size[0];
          video.h = size[1];
        }

        if (videoMediaType.api) {
          video.api = videoMediaType.api;
        }

        if (videoMediaType.protocols) {
          video.protocols = videoMediaType.protocols;
        }

        if (videoMediaType.playbackmethod) {
          video.playbackmethod = videoMediaType.playbackmethod;
        }

        rv.video = video;
      }

      if (bid.params.floor) {
        rv.bidfloor = bid.params.floor;
      }

      if (bid.params.keywords) {
        rv.ext.keywords = bid.params.keywords;
      }

      if (bid.params.bidderParams) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](bid.params.bidderParams, function (params, partner) {
          rv.ext[partner] = params;
        });
      }

      if (bid.params.floorSizeMap) {
        rv.ext.floorSizeMap = bid.params.floorSizeMap;
      }

      return rv;
    });

    var gdprConsent = bidderRequest && bidderRequest.gdprConsent;
    var sortableBidReq = {
      id: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getUniqueIdentifierStr"](),
      imp: sortableImps,
      source: {
        ext: {
          schain: validBidReqs[0].schain
        }
      },
      regs: {
        ext: {}
      },
      site: {
        domain: loc.hostname,
        page: loc.href,
        ref: loc.href,
        publisher: {
          id: globalSiteId || validBidReqs[0].params.siteId
        },
        device: {
          w: screen.width,
          h: screen.height
        }
      }
    };

    if (bidderRequest && bidderRequest.timeout > 0) {
      sortableBidReq.tmax = bidderRequest.timeout;
    }

    if (gdprConsent) {
      sortableBidReq.user = {
        ext: {
          consent: gdprConsent.consentString
        }
      };

      if (typeof gdprConsent.gdprApplies == 'boolean') {
        sortableBidReq.regs.ext.gdpr = gdprConsent.gdprApplies ? 1 : 0;
      }
    }

    if (bidderRequest.uspConsent) {
      sortableBidReq.regs.ext.us_privacy = bidderRequest.uspConsent;
    }

    return {
      method: 'POST',
      url: "".concat(SERVER_URL, "/openrtb2/auction?src=Genius_prebid_4.2.0&host=").concat(loc.hostname),
      data: JSON.stringify(sortableBidReq),
      options: {
        contentType: 'text/plain'
      }
    };
  },
  interpretResponse: function interpretResponse(serverResponse) {
    var _serverResponse$body = serverResponse.body,
        id = _serverResponse$body.id,
        seatbid = _serverResponse$body.seatbid;
    var sortableBids = [];

    if (id && seatbid) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](seatbid, function (seatbid) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["_each"](seatbid.bid, function (bid) {
          var bidObj = {
            requestId: bid.impid,
            cpm: parseFloat(bid.price),
            width: parseInt(bid.w),
            height: parseInt(bid.h),
            creativeId: bid.crid || bid.id,
            dealId: bid.dealid || null,
            currency: 'USD',
            netRevenue: true,
            mediaType: __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */],
            ttl: 60
          };

          if (bid.adm) {
            var adFormat = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'ext.ad_format');

            if (adFormat === 'native') {
              var native = tryParseNativeResponse(bid.adm);

              if (!native) {
                return;
              }

              bidObj.mediaType = __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["c" /* NATIVE */];
              bidObj.native = interpretNativeResponse(native);
            } else if (adFormat === 'instream') {
              bidObj.mediaType = __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */];
              bidObj.vastXml = bid.adm;
            } else {
              bidObj.mediaType = __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */];
              bidObj.ad = bid.adm;

              if (bid.nurl) {
                bidObj.ad += __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["createTrackPixelHtml"](decodeURIComponent(bid.nurl));
              }
            }
          } else if (bid.nurl) {
            bidObj.adUrl = bid.nurl;
          }

          if (bid.ext) {
            bidObj[BIDDER_CODE] = bid.ext;
          }

          sortableBids.push(bidObj);
        });
      });
    }

    return sortableBids;
  },
  getUserSyncs: function getUserSyncs(syncOptions, responses) {
    var syncs = [];

    if (syncOptions.iframeEnabled) {
      transformSyncs(responses, 'iframe', syncs);
    }

    if (syncOptions.pixelEnabled) {
      transformSyncs(responses, 'image', syncs);
    }

    return syncs;
  },
  onTimeout: function onTimeout(details) {
    fetch("".concat(SERVER_URL, "/prebid/timeout"), {
      method: 'POST',
      body: JSON.stringify(details),
      mode: 'no-cors',
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    });
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[716]);