pbjsChunk([0],{

/***/ 359:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(360);


/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADAPTER_VERSION", function() { return ADAPTER_VERSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROFILE_ID_PUBLISHERTAG", function() { return PROFILE_ID_PUBLISHERTAG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony export (immutable) */ __webpack_exports__["tryGetCriteoFastBid"] = tryGetCriteoFastBid;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adloader_js__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_find_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_criteo_direct_rsa_validate_build_verify_js__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_criteo_direct_rsa_validate_build_verify_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_criteo_direct_rsa_validate_build_verify_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_storageManager_js__ = __webpack_require__(9);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }









var GVLID = 91;
var ADAPTER_VERSION = 32;
var BIDDER_CODE = 'criteo';
var CDB_ENDPOINT = 'https://bidder.criteo.com/cdb';
var PROFILE_ID_INLINE = 207;
var PROFILE_ID_PUBLISHERTAG = 185;
var storage = Object(__WEBPACK_IMPORTED_MODULE_7__src_storageManager_js__["b" /* getStorageManager */])(GVLID);
var LOG_PREFIX = 'Criteo: '; // Unminified source code can be found in: https://github.com/Prebid-org/prebid-js-external-js-criteo/blob/master/dist/prod.js

var PUBLISHER_TAG_URL = 'https://static.criteo.net/js/ld/publishertag.prebid.js';
var FAST_BID_PUBKEY_E = 65537;
var FAST_BID_PUBKEY_N = 'ztQYwCE5BU7T9CDM5he6rKoabstXRmkzx54zFPZkWbK530dwtLBDeaWBMxHBUT55CYyboR/EZ4efghPi3CoNGfGWezpjko9P6p2EwGArtHEeS4slhu/SpSIFMjG6fdrpRoNuIAMhq1Z+Pr/+HOd1pThFKeGFr2/NhtAg+TXAzaU=';
/** @type {BidderSpec} */

var spec = {
  code: BIDDER_CODE,
  gvlid: GVLID,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */], __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["c" /* NATIVE */]],

  /**
   * @param {object} bid
   * @return {boolean}
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    // either one of zoneId or networkId should be set
    if (!(bid && bid.params && (bid.params.zoneId || bid.params.networkId))) {
      return false;
    } // video media types requires some mandatory params


    if (hasVideoMediaType(bid)) {
      if (!hasValidVideoMediaType(bid)) {
        return false;
      }
    }

    return true;
  },

  /**
   * @param {BidRequest[]} bidRequests
   * @param {*} bidderRequest
   * @return {ServerRequest}
   */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var url;
    var data;

    _extends(bidderRequest, {
      publisherExt: __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('fpd.context'),
      userExt: __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('fpd.user'),
      ceh: __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('criteo.ceh')
    }); // If publisher tag not already loaded try to get it from fast bid


    if (!publisherTagAvailable()) {
      window.Criteo = window.Criteo || {};
      window.Criteo.usePrebidEvents = false;
      tryGetCriteoFastBid(); // Reload the PublisherTag after the timeout to ensure FastBid is up-to-date and tracking done properly

      setTimeout(function () {
        Object(__WEBPACK_IMPORTED_MODULE_0__src_adloader_js__["a" /* loadExternalScript */])(PUBLISHER_TAG_URL, BIDDER_CODE);
      }, bidderRequest.timeout);
    }

    if (publisherTagAvailable()) {
      // eslint-disable-next-line no-undef
      var adapter = new Criteo.PubTag.Adapters.Prebid(PROFILE_ID_PUBLISHERTAG, ADAPTER_VERSION, bidRequests, bidderRequest, "4.2.0");
      var enableSendAllBids = __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('enableSendAllBids');

      if (adapter.setEnableSendAllBids && typeof adapter.setEnableSendAllBids === 'function' && typeof enableSendAllBids === 'boolean') {
        adapter.setEnableSendAllBids(enableSendAllBids);
      }

      url = adapter.buildCdbUrl();
      data = adapter.buildCdbRequest();
    } else {
      var context = buildContext(bidRequests, bidderRequest);
      url = buildCdbUrl(context);
      data = buildCdbRequest(context, bidRequests, bidderRequest);
    }

    if (data) {
      return {
        method: 'POST',
        url: url,
        data: data,
        bidRequests: bidRequests
      };
    }
  },

  /**
   * @param {*} response
   * @param {ServerRequest} request
   * @return {Bid[]}
   */
  interpretResponse: function interpretResponse(response, request) {
    var body = response.body || response;

    if (publisherTagAvailable()) {
      // eslint-disable-next-line no-undef
      var adapter = Criteo.PubTag.Adapters.Prebid.GetAdapter(request);

      if (adapter) {
        return adapter.interpretResponse(body, request);
      }
    }

    var bids = [];

    if (body && body.slots && __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["isArray"](body.slots)) {
      body.slots.forEach(function (slot) {
        var bidRequest = __WEBPACK_IMPORTED_MODULE_5_core_js_pure_features_array_find_js___default()(request.bidRequests, function (b) {
          return b.adUnitCode === slot.impid && (!b.params.zoneId || parseInt(b.params.zoneId) === slot.zoneid);
        });
        var bidId = bidRequest.bidId;
        var bid = {
          requestId: bidId,
          adId: slot.bidId || __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["getUniqueIdentifierStr"](),
          cpm: slot.cpm,
          currency: slot.currency,
          netRevenue: true,
          ttl: slot.ttl || 60,
          creativeId: bidId,
          width: slot.width,
          height: slot.height,
          dealId: slot.dealCode
        };

        if (slot.native) {
          if (bidRequest.params.nativeCallback) {
            bid.ad = createNativeAd(bidId, slot.native, bidRequest.params.nativeCallback);
          } else if (__WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('enableSendAllBids') === true) {
            return;
          } else {
            bid.native = createPrebidNativeAd(slot.native);
            bid.mediaType = __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["c" /* NATIVE */];
          }
        } else if (slot.video) {
          bid.vastUrl = slot.displayurl;
          bid.mediaType = __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["d" /* VIDEO */];
        } else {
          bid.ad = slot.creative;
        }

        bids.push(bid);
      });
    }

    return bids;
  },

  /**
   * @param {TimedOutBid} timeoutData
   */
  onTimeout: function onTimeout(timeoutData) {
    if (publisherTagAvailable() && Array.isArray(timeoutData)) {
      var auctionsIds = [];
      timeoutData.forEach(function (bid) {
        if (auctionsIds.indexOf(bid.auctionId) === -1) {
          auctionsIds.push(bid.auctionId); // eslint-disable-next-line no-undef

          var adapter = Criteo.PubTag.Adapters.Prebid.GetAdapter(bid.auctionId);
          adapter.handleBidTimeout();
        }
      });
    }
  },

  /**
   * @param {Bid} bid
   */
  onBidWon: function onBidWon(bid) {
    if (publisherTagAvailable() && bid) {
      // eslint-disable-next-line no-undef
      var adapter = Criteo.PubTag.Adapters.Prebid.GetAdapter(bid.auctionId);
      adapter.handleBidWon(bid);
    }
  },

  /**
   * @param {Bid} bid
   */
  onSetTargeting: function onSetTargeting(bid) {
    if (publisherTagAvailable()) {
      // eslint-disable-next-line no-undef
      var adapter = Criteo.PubTag.Adapters.Prebid.GetAdapter(bid.auctionId);
      adapter.handleSetTargeting(bid);
    }
  }
};
/**
 * @return {boolean}
 */

function publisherTagAvailable() {
  // eslint-disable-next-line no-undef
  return typeof Criteo !== 'undefined' && Criteo.PubTag && Criteo.PubTag.Adapters && Criteo.PubTag.Adapters.Prebid;
}
/**
 * @param {BidRequest[]} bidRequests
 * @param bidderRequest
 */


function buildContext(bidRequests, bidderRequest) {
  var referrer = '';

  if (bidderRequest && bidderRequest.refererInfo) {
    referrer = bidderRequest.refererInfo.referer;
  }

  var queryString = __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["parseUrl"](referrer).search;
  var context = {
    url: referrer,
    debug: queryString['pbt_debug'] === '1',
    noLog: queryString['pbt_nolog'] === '1',
    amp: false
  };
  bidRequests.forEach(function (bidRequest) {
    if (bidRequest.params.integrationMode === 'amp') {
      context.amp = true;
    }
  });
  return context;
}
/**
 * @param {CriteoContext} context
 * @return {string}
 */


function buildCdbUrl(context) {
  var url = CDB_ENDPOINT;
  url += '?profileId=' + PROFILE_ID_INLINE;
  url += '&av=' + String(ADAPTER_VERSION);
  url += '&wv=' + encodeURIComponent("4.2.0");
  url += '&cb=' + String(Math.floor(Math.random() * 99999999999));

  if (context.amp) {
    url += '&im=1';
  }

  if (context.debug) {
    url += '&debug=1';
  }

  if (context.noLog) {
    url += '&nolog=1';
  }

  return url;
}

function checkNativeSendId(bidRequest) {
  return !(bidRequest.nativeParams && (bidRequest.nativeParams.image && bidRequest.nativeParams.image.sendId !== true || bidRequest.nativeParams.icon && bidRequest.nativeParams.icon.sendId !== true || bidRequest.nativeParams.clickUrl && bidRequest.nativeParams.clickUrl.sendId !== true || bidRequest.nativeParams.displayUrl && bidRequest.nativeParams.displayUrl.sendId !== true || bidRequest.nativeParams.privacyLink && bidRequest.nativeParams.privacyLink.sendId !== true || bidRequest.nativeParams.privacyIcon && bidRequest.nativeParams.privacyIcon.sendId !== true));
}
/**
 * @param {CriteoContext} context
 * @param {BidRequest[]} bidRequests
 * @param bidderRequest
 * @return {*}
 */


function buildCdbRequest(context, bidRequests, bidderRequest) {
  var networkId;
  var request = {
    publisher: {
      url: context.url,
      ext: bidderRequest.publisherExt
    },
    slots: bidRequests.map(function (bidRequest) {
      networkId = bidRequest.params.networkId || networkId;
      var slot = {
        impid: bidRequest.adUnitCode,
        transactionid: bidRequest.transactionId,
        auctionId: bidRequest.auctionId
      };

      if (bidRequest.params.zoneId) {
        slot.zoneid = bidRequest.params.zoneId;
      }

      if (bidRequest.fpd && bidRequest.fpd.context) {
        slot.ext = bidRequest.fpd.context;
      }

      if (bidRequest.params.ext) {
        slot.ext = _extends({}, slot.ext, bidRequest.params.ext);
      }

      if (bidRequest.params.publisherSubId) {
        slot.publishersubid = bidRequest.params.publisherSubId;
      }

      if (bidRequest.params.nativeCallback || __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["deepAccess"](bidRequest, "mediaTypes.".concat(__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes_js__["c" /* NATIVE */]))) {
        slot.native = true;

        if (!checkNativeSendId(bidRequest)) {
          __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logWarn"](LOG_PREFIX + 'all native assets containing URL should be sent as placeholders with sendId(icon, image, clickUrl, displayUrl, privacyLink, privacyIcon)');
        }

        slot.sizes = parseSizes(retrieveBannerSizes(bidRequest), parseNativeSize);
      } else {
        slot.sizes = parseSizes(retrieveBannerSizes(bidRequest), parseSize);
      }

      if (hasVideoMediaType(bidRequest)) {
        var video = {
          playersizes: parseSizes(__WEBPACK_IMPORTED_MODULE_4__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.video.playerSize'), parseSize),
          mimes: bidRequest.mediaTypes.video.mimes,
          protocols: bidRequest.mediaTypes.video.protocols,
          maxduration: bidRequest.mediaTypes.video.maxduration,
          api: bidRequest.mediaTypes.video.api
        };
        video.skip = bidRequest.params.video.skip;
        video.placement = bidRequest.params.video.placement;
        video.minduration = bidRequest.params.video.minduration;
        video.playbackmethod = bidRequest.params.video.playbackmethod;
        video.startdelay = bidRequest.params.video.startdelay;
        slot.video = video;
      }

      return slot;
    })
  };

  if (networkId) {
    request.publisher.networkid = networkId;
  }

  request.user = {
    ext: bidderRequest.userExt
  };

  if (bidderRequest && bidderRequest.ceh) {
    request.user.ceh = bidderRequest.ceh;
  }

  if (bidderRequest && bidderRequest.gdprConsent) {
    request.gdprConsent = {};

    if (typeof bidderRequest.gdprConsent.gdprApplies !== 'undefined') {
      request.gdprConsent.gdprApplies = !!bidderRequest.gdprConsent.gdprApplies;
    }

    request.gdprConsent.version = bidderRequest.gdprConsent.apiVersion;

    if (typeof bidderRequest.gdprConsent.consentString !== 'undefined') {
      request.gdprConsent.consentData = bidderRequest.gdprConsent.consentString;
    }
  }

  if (bidderRequest && bidderRequest.uspConsent) {
    request.user.uspIab = bidderRequest.uspConsent;
  }

  return request;
}

function retrieveBannerSizes(bidRequest) {
  return __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.banner.sizes') || bidRequest.sizes;
}

function parseSizes(sizes, parser) {
  if (Array.isArray(sizes[0])) {
    // is there several sizes ? (ie. [[728,90],[200,300]])
    return sizes.map(function (size) {
      return parser(size);
    });
  }

  return [parser(sizes)]; // or a single one ? (ie. [728,90])
}

function parseSize(size) {
  return size[0] + 'x' + size[1];
}

function parseNativeSize(size) {
  if (size[0] === undefined && size[1] === undefined) {
    return '2x2';
  }

  return size[0] + 'x' + size[1];
}

function hasVideoMediaType(bidRequest) {
  if (__WEBPACK_IMPORTED_MODULE_4__src_utils_js__["deepAccess"](bidRequest, 'params.video') === undefined) {
    return false;
  }

  return __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.video') !== undefined;
}

function hasValidVideoMediaType(bidRequest) {
  var isValid = true;
  var requiredMediaTypesParams = ['mimes', 'playerSize', 'maxduration', 'protocols', 'api'];
  requiredMediaTypesParams.forEach(function (param) {
    if (__WEBPACK_IMPORTED_MODULE_4__src_utils_js__["deepAccess"](bidRequest, 'mediaTypes.video.' + param) === undefined) {
      isValid = false;
      __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logError"]('Criteo Bid Adapter: mediaTypes.video.' + param + ' is required');
    }
  });
  var requiredParams = ['skip', 'placement', 'playbackmethod'];
  requiredParams.forEach(function (param) {
    if (__WEBPACK_IMPORTED_MODULE_4__src_utils_js__["deepAccess"](bidRequest, 'params.video.' + param) === undefined) {
      isValid = false;
      __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logError"]('Criteo Bid Adapter: params.video.' + param + ' is required');
    }
  });

  if (isValid) {
    // We do not support long form for now, also we have to check that context & placement are consistent
    if (bidRequest.mediaTypes.video.context == 'instream' && bidRequest.params.video.placement === 1) {
      return true;
    } else if (bidRequest.mediaTypes.video.context == 'outstream' && bidRequest.params.video.placement !== 1) {
      return true;
    }
  }

  return false;
}
/**
 * Create prebid compatible native ad with native payload
 * @param {*} payload
 * @returns prebid native ad assets
 */


function createPrebidNativeAd(payload) {
  return {
    title: payload.products[0].title,
    body: payload.products[0].description,
    sponsoredBy: payload.advertiser.description,
    icon: payload.advertiser.logo,
    image: payload.products[0].image,
    clickUrl: payload.products[0].click_url,
    privacyLink: payload.privacy.optout_click_url,
    privacyIcon: payload.privacy.optout_image_url,
    cta: payload.products[0].call_to_action,
    price: payload.products[0].price,
    impressionTrackers: payload.impression_pixels.map(function (pix) {
      return pix.url;
    })
  };
}
/**
 * @param {string} id
 * @param {*} payload
 * @param {*} callback
 * @return {string}
 */


function createNativeAd(id, payload, callback) {
  // Store the callback and payload in a global object to be later accessed from the creative
  var slotsName = 'criteo_prebid_native_slots';
  window[slotsName] = window[slotsName] || {};
  window[slotsName][id] = {
    callback: callback,
    payload: payload
  }; // The creative is in an iframe so we have to get the callback and payload
  // from the parent window (doesn't work with safeframes)

  return "\n<script type=\"text/javascript\">\nfor (var i = 0; i < 10; ++i) {\n var slots = window.parent.".concat(slotsName, ";\n  if(!slots){continue;}\n  var responseSlot = slots[\"").concat(id, "\"];\n  responseSlot.callback(responseSlot.payload);\n  break;\n}\n</script>");
}

function tryGetCriteoFastBid() {
  try {
    var fastBidStorageKey = 'criteo_fast_bid';
    var hashPrefix = '// Hash: ';
    var fastBidFromStorage = storage.getDataFromLocalStorage(fastBidStorageKey);

    if (fastBidFromStorage !== null) {
      // The value stored must contain the file's encrypted hash as first line
      var firstLineEndPosition = fastBidFromStorage.indexOf('\n');
      var firstLine = fastBidFromStorage.substr(0, firstLineEndPosition).trim();

      if (firstLine.substr(0, hashPrefix.length) !== hashPrefix) {
        __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logWarn"]('No hash found in FastBid');
        storage.removeDataFromLocalStorage(fastBidStorageKey);
      } else {
        // Remove the hash part from the locally stored value
        var publisherTagHash = firstLine.substr(hashPrefix.length);
        var publisherTag = fastBidFromStorage.substr(firstLineEndPosition + 1);

        if (Object(__WEBPACK_IMPORTED_MODULE_6_criteo_direct_rsa_validate_build_verify_js__["verify"])(publisherTag, publisherTagHash, FAST_BID_PUBKEY_N, FAST_BID_PUBKEY_E)) {
          __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logInfo"]('Using Criteo FastBid');
          eval(publisherTag); // eslint-disable-line no-eval
        } else {
          __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logWarn"]('Invalid Criteo FastBid found');
          storage.removeDataFromLocalStorage(fastBidStorageKey);
        }
      }
    }
  } catch (e) {// Unable to get fast bid
  }
}
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ }),

/***/ 361:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var jsbnLite_1 = __webpack_require__(362);
var sha256_1 = __webpack_require__(363);
function verify(code, hash, nStrPubKey, ePubKey) {
    var x = new jsbnLite_1.BigInteger(jsbnLite_1.b64toHex(hash));
    var m = new jsbnLite_1.BigInteger(jsbnLite_1.b64toHex(nStrPubKey));
    var r = x.modPowInt(ePubKey, m);
    return jsbnLite_1.removeExtraSymbols(r.toHexString()) === sha256_1.Sha256.hash(code);
}
exports.verify = verify;


/***/ }),

/***/ 362:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Bits per digit
var dbits;
// JavaScript engine analysis
var canary = 0xdeadbeefcafe;
var j_lm = ((canary & 0xffffff) == 0xefcafe);
var BigInteger = /** @class */ (function () {
    function BigInteger(a) {
        if (a !== null) {
            this.fromHexString(a);
        }
    }
    BigInteger.prototype.toHexString = function () {
        if (this.s < 0) {
            return "-" + this.negate().toHexString();
        }
        var k = 4;
        var km = (1 << k) - 1;
        var d;
        var m = false;
        var r = "";
        var i = this.t;
        var p = this.DB - (i * this.DB) % k;
        if (i-- > 0) {
            if (p < this.DB && (d = this[i] >> p) > 0) {
                m = true;
                r = int2char(d);
            }
            while (i >= 0) {
                if (p < k) {
                    d = (this[i] & ((1 << p) - 1)) << (k - p);
                    d |= this[--i] >> (p += this.DB - k);
                }
                else {
                    d = (this[i] >> (p -= k)) & km;
                    if (p <= 0) {
                        p += this.DB;
                        --i;
                    }
                }
                if (d > 0) {
                    m = true;
                }
                if (m) {
                    r += int2char(d);
                }
            }
        }
        return m ? r : "0";
    };
    BigInteger.prototype.fromHexString = function (s) {
        if (s === null) {
            return;
        }
        var k = 4;
        this.t = 0;
        this.s = 0;
        var i = s.length;
        var mi = false;
        var sh = 0;
        while (--i >= 0) {
            var x = (k == 8) ? (+s[i]) & 0xff : intAt(s, i);
            if (x < 0) {
                if (s.charAt(i) == "-") {
                    mi = true;
                }
                continue;
            }
            mi = false;
            if (sh == 0) {
                this[this.t++] = x;
            }
            else if (sh + k > this.DB) {
                this[this.t - 1] |= (x & ((1 << (this.DB - sh)) - 1)) << sh;
                this[this.t++] = (x >> (this.DB - sh));
            }
            else {
                this[this.t - 1] |= x << sh;
            }
            sh += k;
            if (sh >= this.DB) {
                sh -= this.DB;
            }
        }
        if (k == 8 && ((+s[0]) & 0x80) != 0) {
            this.s = -1;
            if (sh > 0) {
                this[this.t - 1] |= ((1 << (this.DB - sh)) - 1) << sh;
            }
        }
        this.clamp();
        if (mi) {
            BigInteger.ZERO.subTo(this, this);
        }
    };
    BigInteger.prototype.negate = function () {
        var r = nbi();
        BigInteger.ZERO.subTo(this, r);
        return r;
    };
    BigInteger.prototype.abs = function () {
        return (this.s < 0) ? this.negate() : this;
    };
    BigInteger.prototype.mod = function (a) {
        var r = nbi();
        this.abs().divRemTo(a, null, r);
        if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
            a.subTo(r, r);
        }
        return r;
    };
    BigInteger.prototype.copyTo = function (r) {
        for (var i = this.t - 1; i >= 0; --i) {
            r[i] = this[i];
        }
        r.t = this.t;
        r.s = this.s;
    };
    BigInteger.prototype.lShiftTo = function (n, r) {
        var bs = n % this.DB;
        var cbs = this.DB - bs;
        var bm = (1 << cbs) - 1;
        var ds = Math.floor(n / this.DB);
        var c = (this.s << bs) & this.DM;
        for (var i = this.t - 1; i >= 0; --i) {
            r[i + ds + 1] = (this[i] >> cbs) | c;
            c = (this[i] & bm) << bs;
        }
        for (var i = ds - 1; i >= 0; --i) {
            r[i] = 0;
        }
        r[ds] = c;
        r.t = this.t + ds + 1;
        r.s = this.s;
        r.clamp();
    };
    BigInteger.prototype.invDigit = function () {
        if (this.t < 1) {
            return 0;
        }
        var x = this[0];
        if ((x & 1) == 0) {
            return 0;
        }
        var y = x & 3; // y == 1/x mod 2^2
        y = (y * (2 - (x & 0xf) * y)) & 0xf; // y == 1/x mod 2^4
        y = (y * (2 - (x & 0xff) * y)) & 0xff; // y == 1/x mod 2^8
        y = (y * (2 - (((x & 0xffff) * y) & 0xffff))) & 0xffff; // y == 1/x mod 2^16
        // last step - calculate inverse mod DV directly;
        // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
        y = (y * (2 - x * y % this.DV)) % this.DV; // y == 1/x mod 2^dbits
        // we really want the negative inverse, and -DV < y < DV
        return (y > 0) ? this.DV - y : -y;
    };
    BigInteger.prototype.dlShiftTo = function (n, r) {
        var i;
        for (i = this.t - 1; i >= 0; --i) {
            r[i + n] = this[i];
        }
        for (i = n - 1; i >= 0; --i) {
            r[i] = 0;
        }
        r.t = this.t + n;
        r.s = this.s;
    };
    BigInteger.prototype.squareTo = function (r) {
        var x = this.abs();
        var i = r.t = 2 * x.t;
        while (--i >= 0) {
            r[i] = 0;
        }
        for (i = 0; i < x.t - 1; ++i) {
            var c = x.am(i, x[i], r, 2 * i, 0, 1);
            if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
                r[i + x.t] -= x.DV;
                r[i + x.t + 1] = 1;
            }
        }
        if (r.t > 0) {
            r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
        }
        r.s = 0;
        r.clamp();
    };
    BigInteger.prototype.multiplyTo = function (a, r) {
        var x = this.abs();
        var y = a.abs();
        var i = x.t;
        r.t = i + y.t;
        while (--i >= 0) {
            r[i] = 0;
        }
        for (i = 0; i < y.t; ++i) {
            r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
        }
        r.s = 0;
        r.clamp();
        if (this.s != a.s) {
            BigInteger.ZERO.subTo(r, r);
        }
    };
    BigInteger.prototype.divRemTo = function (m, q, r) {
        var pm = m.abs();
        if (pm.t <= 0) {
            return;
        }
        var pt = this.abs();
        if (pt.t < pm.t) {
            if (q != null) {
                q.fromHexString("0");
            }
            if (r != null) {
                this.copyTo(r);
            }
            return;
        }
        if (r == null) {
            r = nbi();
        }
        var y = nbi();
        var ts = this.s;
        var ms = m.s;
        var nsh = this.DB - nbits(pm[pm.t - 1]); // normalize modulus
        if (nsh > 0) {
            pm.lShiftTo(nsh, y);
            pt.lShiftTo(nsh, r);
        }
        else {
            pm.copyTo(y);
            pt.copyTo(r);
        }
        var ys = y.t;
        var y0 = y[ys - 1];
        if (y0 == 0) {
            return;
        }
        var yt = y0 * (1 << this.F1) + ((ys > 1) ? y[ys - 2] >> this.F2 : 0);
        var d1 = this.FV / yt;
        var d2 = (1 << this.F1) / yt;
        var e = 1 << this.F2;
        var i = r.t;
        var j = i - ys;
        var t = (q == null) ? nbi() : q;
        y.dlShiftTo(j, t);
        if (r.compareTo(t) >= 0) {
            r[r.t++] = 1;
            r.subTo(t, r);
        }
        BigInteger.ONE.dlShiftTo(ys, t);
        t.subTo(y, y); // "negative" y so we can replace sub with am later
        while (y.t < ys) {
            y[y.t++] = 0;
        }
        while (--j >= 0) {
            // Estimate quotient digit
            var qd = (r[--i] == y0) ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
            if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) { // Try it out
                y.dlShiftTo(j, t);
                r.subTo(t, r);
                while (r[i] < --qd) {
                    r.subTo(t, r);
                }
            }
        }
        if (q != null) {
            r.drShiftTo(ys, q);
            if (ts != ms) {
                BigInteger.ZERO.subTo(q, q);
            }
        }
        r.t = ys;
        r.clamp();
        if (nsh > 0) {
            r.rShiftTo(nsh, r);
        } // Denormalize remainder
        if (ts < 0) {
            BigInteger.ZERO.subTo(r, r);
        }
    };
    BigInteger.prototype.rShiftTo = function (n, r) {
        r.s = this.s;
        var ds = Math.floor(n / this.DB);
        if (ds >= this.t) {
            r.t = 0;
            return;
        }
        var bs = n % this.DB;
        var cbs = this.DB - bs;
        var bm = (1 << bs) - 1;
        r[0] = this[ds] >> bs;
        for (var i = ds + 1; i < this.t; ++i) {
            r[i - ds - 1] |= (this[i] & bm) << cbs;
            r[i - ds] = this[i] >> bs;
        }
        if (bs > 0) {
            r[this.t - ds - 1] |= (this.s & bm) << cbs;
        }
        r.t = this.t - ds;
        r.clamp();
    };
    BigInteger.prototype.drShiftTo = function (n, r) {
        for (var i = n; i < this.t; ++i) {
            r[i - n] = this[i];
        }
        r.t = Math.max(this.t - n, 0);
        r.s = this.s;
    };
    BigInteger.prototype.subTo = function (a, r) {
        var i = 0;
        var c = 0;
        var m = Math.min(a.t, this.t);
        while (i < m) {
            c += this[i] - a[i];
            r[i++] = c & this.DM;
            c >>= this.DB;
        }
        if (a.t < this.t) {
            c -= a.s;
            while (i < this.t) {
                c += this[i];
                r[i++] = c & this.DM;
                c >>= this.DB;
            }
            c += this.s;
        }
        else {
            c += this.s;
            while (i < a.t) {
                c -= a[i];
                r[i++] = c & this.DM;
                c >>= this.DB;
            }
            c -= a.s;
        }
        r.s = (c < 0) ? -1 : 0;
        if (c < -1) {
            r[i++] = this.DV + c;
        }
        else if (c > 0) {
            r[i++] = c;
        }
        r.t = i;
        r.clamp();
    };
    BigInteger.prototype.clamp = function () {
        var c = this.s & this.DM;
        while (this.t > 0 && this[this.t - 1] == c) {
            --this.t;
        }
    };
    BigInteger.prototype.modPowInt = function (e, m) {
        var z;
        if (e < 256 || m.isEven()) {
            z = new Classic(m);
        }
        else {
            z = new Montgomery(m);
        }
        return this.exp(e, z);
    };
    BigInteger.prototype.exp = function (e, z) {
        if (e > 0xffffffff || e < 1) {
            return BigInteger.ONE;
        }
        var r = nbi();
        var r2 = nbi();
        var g = z.convert(this);
        var i = nbits(e) - 1;
        g.copyTo(r);
        while (--i >= 0) {
            z.sqrTo(r, r2);
            if ((e & (1 << i)) > 0) {
                z.mulTo(r2, g, r);
            }
            else {
                var t = r;
                r = r2;
                r2 = t;
            }
        }
        return z.revert(r);
    };
    BigInteger.prototype.isEven = function () {
        return ((this.t > 0) ? (this[0] & 1) : this.s) == 0;
    };
    BigInteger.prototype.compareTo = function (a) {
        var r = this.s - a.s;
        if (r != 0) {
            return r;
        }
        var i = this.t;
        r = i - a.t;
        if (r != 0) {
            return (this.s < 0) ? -r : r;
        }
        while (--i >= 0) {
            if ((r = this[i] - a[i]) != 0) {
                return r;
            }
        }
        return 0;
    };
    BigInteger.prototype.am1 = function (i, x, w, j, c, n) {
        while (--n >= 0) {
            var v = x * this[i++] + w[j] + c;
            c = Math.floor(v / 0x4000000);
            w[j++] = v & 0x3ffffff;
        }
        return c;
    };
    // am2 avoids a big mult-and-extract completely.
    // Max digit bits should be <= 30 because we do bitwise ops
    // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
    BigInteger.prototype.am2 = function (i, x, w, j, c, n) {
        var xl = x & 0x7fff;
        var xh = x >> 15;
        while (--n >= 0) {
            var l = this[i] & 0x7fff;
            var h = this[i++] >> 15;
            var m = xh * l + h * xl;
            l = xl * l + ((m & 0x7fff) << 15) + w[j] + (c & 0x3fffffff);
            c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
            w[j++] = l & 0x3fffffff;
        }
        return c;
    };
    // Alternately, set max digit bits to 28 since some
    // browsers slow down when dealing with 32-bit numbers.
    BigInteger.prototype.am3 = function (i, x, w, j, c, n) {
        var xl = x & 0x3fff;
        var xh = x >> 14;
        while (--n >= 0) {
            var l = this[i] & 0x3fff;
            var h = this[i++] >> 14;
            var m = xh * l + h * xl;
            l = xl * l + ((m & 0x3fff) << 14) + w[j] + c;
            c = (l >> 28) + (m >> 14) + xh * h;
            w[j++] = l & 0xfffffff;
        }
        return c;
    };
    return BigInteger;
}());
exports.BigInteger = BigInteger;
function nbi() { return new BigInteger(null); }
exports.nbi = nbi;
function nbits(x) {
    var r = 1;
    var t;
    if ((t = x >>> 16) != 0) {
        x = t;
        r += 16;
    }
    if ((t = x >> 8) != 0) {
        x = t;
        r += 8;
    }
    if ((t = x >> 4) != 0) {
        x = t;
        r += 4;
    }
    if ((t = x >> 2) != 0) {
        x = t;
        r += 2;
    }
    if ((t = x >> 1) != 0) {
        x = t;
        r += 1;
    }
    return r;
}
exports.nbits = nbits;
var BI_RC = [];
var rr;
var vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv) {
    BI_RC[rr++] = vv;
}
rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv;
}
rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv;
}
function intAt(s, i) {
    var c = BI_RC[s.charCodeAt(i)];
    return (c == null) ? -1 : c;
}
exports.intAt = intAt;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
function int2char(n) {
    return BI_RM.charAt(n);
}
exports.int2char = int2char;
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad = "=";
function b64toHex(s) {
    var ret = "";
    var i;
    var k = 0; // b64 state, 0-3
    var slop = 0;
    for (i = 0; i < s.length; ++i) {
        if (s.charAt(i) == b64pad) {
            break;
        }
        var v = b64map.indexOf(s.charAt(i));
        if (v < 0) {
            continue;
        }
        if (k == 0) {
            ret += int2char(v >> 2);
            slop = v & 3;
            k = 1;
        }
        else if (k == 1) {
            ret += int2char((slop << 2) | (v >> 4));
            slop = v & 0xf;
            k = 2;
        }
        else if (k == 2) {
            ret += int2char(slop);
            ret += int2char(v >> 2);
            slop = v & 3;
            k = 3;
        }
        else {
            ret += int2char((slop << 2) | (v >> 4));
            ret += int2char(v & 0xf);
            k = 0;
        }
    }
    if (k == 1) {
        ret += int2char(slop << 2);
    }
    return ret;
}
exports.b64toHex = b64toHex;
function removeExtraSymbols(s) {
    return s
        .replace(/^1f+00/, "")
        .replace("3031300d060960864801650304020105000420", "");
}
exports.removeExtraSymbols = removeExtraSymbols;
var Classic = /** @class */ (function () {
    function Classic(m) {
        this.m = m;
    }
    // Classic.prototype.convert = cConvert;
    Classic.prototype.convert = function (x) {
        if (x.s < 0 || x.compareTo(this.m) >= 0) {
            return x.mod(this.m);
        }
        else {
            return x;
        }
    };
    // Classic.prototype.revert = cRevert;
    Classic.prototype.revert = function (x) {
        return x;
    };
    // Classic.prototype.reduce = cReduce;
    Classic.prototype.reduce = function (x) {
        x.divRemTo(this.m, null, x);
    };
    // Classic.prototype.mulTo = cMulTo;
    Classic.prototype.mulTo = function (x, y, r) {
        x.multiplyTo(y, r);
        this.reduce(r);
    };
    // Classic.prototype.sqrTo = cSqrTo;
    Classic.prototype.sqrTo = function (x, r) {
        x.squareTo(r);
        this.reduce(r);
    };
    return Classic;
}());
var Montgomery = /** @class */ (function () {
    function Montgomery(m) {
        this.m = m;
        this.mp = m.invDigit();
        this.mpl = this.mp & 0x7fff;
        this.mph = this.mp >> 15;
        this.um = (1 << (m.DB - 15)) - 1;
        this.mt2 = 2 * m.t;
    }
    // Montgomery.prototype.convert = montConvert;
    // xR mod m
    Montgomery.prototype.convert = function (x) {
        var r = nbi();
        x.abs().dlShiftTo(this.m.t, r);
        r.divRemTo(this.m, null, r);
        if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) {
            this.m.subTo(r, r);
        }
        return r;
    };
    // Montgomery.prototype.revert = montRevert;
    // x/R mod m
    Montgomery.prototype.revert = function (x) {
        var r = nbi();
        x.copyTo(r);
        this.reduce(r);
        return r;
    };
    // Montgomery.prototype.reduce = montReduce;
    // x = x/R mod m (HAC 14.32)
    Montgomery.prototype.reduce = function (x) {
        while (x.t <= this.mt2) {
            // pad x so am has enough room later
            x[x.t++] = 0;
        }
        for (var i = 0; i < this.m.t; ++i) {
            // faster way of calculating u0 = x[i]*mp mod DV
            var j = x[i] & 0x7fff;
            var u0 = (j * this.mpl + (((j * this.mph + (x[i] >> 15) * this.mpl) & this.um) << 15)) & x.DM;
            // use am to combine the multiply-shift-add into one call
            j = i + this.m.t;
            x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
            // propagate carry
            while (x[j] >= x.DV) {
                x[j] -= x.DV;
                x[++j]++;
            }
        }
        x.clamp();
        x.drShiftTo(this.m.t, x);
        if (x.compareTo(this.m) >= 0) {
            x.subTo(this.m, x);
        }
    };
    // Montgomery.prototype.mulTo = montMulTo;
    // r = "xy/R mod m"; x,y != r
    Montgomery.prototype.mulTo = function (x, y, r) {
        x.multiplyTo(y, r);
        this.reduce(r);
    };
    // Montgomery.prototype.sqrTo = montSqrTo;
    // r = "x^2/R mod m"; x != r
    Montgomery.prototype.sqrTo = function (x, r) {
        x.squareTo(r);
        this.reduce(r);
    };
    return Montgomery;
}());
function nbv(i) {
    var r = nbi();
    r.fromHexString(i.toString());
    return r;
}
exports.nbv = nbv;
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);
if (j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
    BigInteger.prototype.am = BigInteger.prototype.am2;
    dbits = 30;
}
else if (j_lm && (navigator.appName != "Netscape")) {
    BigInteger.prototype.am = BigInteger.prototype.am1;
    dbits = 26;
}
else { // Mozilla/Netscape seems to prefer am3
    BigInteger.prototype.am = BigInteger.prototype.am3;
    dbits = 28;
}
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = ((1 << dbits) - 1);
BigInteger.prototype.DV = (1 << dbits);
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;


/***/ }),

/***/ 363:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Sha256 = /** @class */ (function () {
    function Sha256() {
    }
    Sha256.hash = function (msg) {
        msg = Sha256.utf8Encode(msg || "");
        var K = [
            0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
            0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
            0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
            0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
            0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
            0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
            0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
            0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
        ];
        var H = [
            0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
        ];
        msg += String.fromCharCode(0x80);
        var l = msg.length / 4 + 2;
        var N = Math.ceil(l / 16);
        var M = new Array(N);
        for (var i = 0; i < N; i++) {
            M[i] = new Array(16);
            for (var j = 0; j < 16; j++) {
                M[i][j] = (msg.charCodeAt(i * 64 + j * 4) << 24) | (msg.charCodeAt(i * 64 + j * 4 + 1) << 16)
                    | (msg.charCodeAt(i * 64 + j * 4 + 2) << 8) | (msg.charCodeAt(i * 64 + j * 4 + 3) << 0);
            }
        }
        var lenHi = ((msg.length - 1) * 8) / Math.pow(2, 32);
        var lenLo = ((msg.length - 1) * 8) >>> 0;
        M[N - 1][14] = Math.floor(lenHi);
        M[N - 1][15] = lenLo;
        for (var i = 0; i < N; i++) {
            var W = new Array(64);
            for (var t = 0; t < 16; t++)
                W[t] = M[i][t];
            for (var t = 16; t < 64; t++) {
                W[t] = (Sha256.q1(W[t - 2]) + W[t - 7] + Sha256.q0(W[t - 15]) + W[t - 16]) >>> 0;
            }
            var a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
            for (var t = 0; t < 64; t++) {
                var T1 = h + Sha256.z1(e) + Sha256.Ch(e, f, g) + K[t] + W[t];
                var T2 = Sha256.z0(a) + Sha256.Maj(a, b, c);
                h = g;
                g = f;
                f = e;
                e = (d + T1) >>> 0;
                d = c;
                c = b;
                b = a;
                a = (T1 + T2) >>> 0;
            }
            H[0] = (H[0] + a) >>> 0;
            H[1] = (H[1] + b) >>> 0;
            H[2] = (H[2] + c) >>> 0;
            H[3] = (H[3] + d) >>> 0;
            H[4] = (H[4] + e) >>> 0;
            H[5] = (H[5] + f) >>> 0;
            H[6] = (H[6] + g) >>> 0;
            H[7] = (H[7] + h) >>> 0;
        }
        var R = new Array(H.length);
        for (var h = 0; h < H.length; h++)
            R[h] = ('00000000' + H[h].toString(16)).slice(-8);
        return R.join('');
    };
    Sha256.utf8Encode = function (str) {
        try {
            return new TextEncoder().encode(str).reduce(function (prev, curr) { return prev + String.fromCharCode(curr); }, '');
        }
        catch (e) {
            return unescape(encodeURIComponent(str));
        }
    };
    Sha256.ROTR = function (n, x) {
        return (x >>> n) | (x << (32 - n));
    };
    Sha256.z0 = function (x) { return Sha256.ROTR(2, x) ^ Sha256.ROTR(13, x) ^ Sha256.ROTR(22, x); };
    Sha256.z1 = function (x) { return Sha256.ROTR(6, x) ^ Sha256.ROTR(11, x) ^ Sha256.ROTR(25, x); };
    Sha256.q0 = function (x) { return Sha256.ROTR(7, x) ^ Sha256.ROTR(18, x) ^ (x >>> 3); };
    Sha256.q1 = function (x) { return Sha256.ROTR(17, x) ^ Sha256.ROTR(19, x) ^ (x >>> 10); };
    Sha256.Ch = function (x, y, z) { return (x & y) ^ (~x & z); };
    Sha256.Maj = function (x, y, z) { return (x & y) ^ (x & z) ^ (y & z); };
    return Sha256;
}());
exports.Sha256 = Sha256;


/***/ })

},[359]);