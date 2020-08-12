pbjsChunk([86],{

/***/ 418:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(419);


/***/ }),

/***/ 419:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_Renderer__ = __webpack_require__(11);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint dot-notation:0, quote-props:0 */



var NATIVE_DEFAULTS = {
  TITLE_LEN: 100,
  DESCR_LEN: 200,
  SPONSORED_BY_LEN: 50,
  IMG_MIN: 150,
  ICON_MIN: 50
};
var DEFAULT_BID_TTL = 20;
var DEFAULT_CURRENCY = 'USD';
var DEFAULT_NET_REVENUE = true;
var KNOWN_PARAMS = ['cp', 'ct', 'cf', 'video', 'battr', 'bcat', 'badv', 'bidfloor'];
/**
 * PulsePoint Bid Adapter.
 * Contact: ExchangeTeam@pulsepoint.com
 *
 * Aliases - pulseLite and pulsepointLite are supported for backwards compatibility.
 * Formats - Display/Native/Video formats supported.
 *
 */

var spec = {
  code: 'pulsepoint',
  aliases: ['pulseLite', 'pulsepointLite'],
  supportedMediaTypes: ['banner', 'native', 'video'],
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid && bid.params && bid.params.cp && bid.params.ct);
  },
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    var request = {
      id: bidRequests[0].bidderRequestId,
      imp: bidRequests.map(function (slot) {
        return impression(slot);
      }),
      site: site(bidRequests, bidderRequest),
      app: app(bidRequests),
      device: device(),
      bcat: bidRequests[0].params.bcat,
      badv: bidRequests[0].params.badv,
      user: user(bidRequests[0], bidderRequest),
      regs: regs(bidderRequest),
      source: source(bidRequests[0].schain)
    };
    return {
      method: 'POST',
      url: 'https://bid.contextweb.com/header/ortb?src=prebid',
      data: request,
      bidderRequest: bidderRequest
    };
  },
  interpretResponse: function interpretResponse(response, request) {
    return bidResponseAvailable(request, response);
  },
  getUserSyncs: function getUserSyncs(syncOptions) {
    if (syncOptions.iframeEnabled) {
      return [{
        type: 'iframe',
        url: 'https://bh.contextweb.com/visitormatch'
      }];
    } else if (syncOptions.pixelEnabled) {
      return [{
        type: 'image',
        url: 'https://bh.contextweb.com/visitormatch/prebid'
      }];
    }
  },
  transformBidParams: function transformBidParams(params, isOpenRtb) {
    return __WEBPACK_IMPORTED_MODULE_0__src_utils__["convertTypes"]({
      'cf': 'string',
      'cp': 'number',
      'ct': 'number'
    }, params);
  }
};
/**
 * Callback for bids, after the call to PulsePoint completes.
 */

function bidResponseAvailable(request, response) {
  var idToImpMap = {};
  var idToBidMap = {};
  var idToSlotConfig = {};
  var bidResponse = response.body; // extract the request bids and the response bids, keyed by impr-id

  var ortbRequest = request.data;
  ortbRequest.imp.forEach(function (imp) {
    idToImpMap[imp.id] = imp;
  });

  if (bidResponse) {
    bidResponse.seatbid.forEach(function (seatBid) {
      return seatBid.bid.forEach(function (bid) {
        idToBidMap[bid.impid] = bid;
      });
    });
  }

  if (request.bidderRequest && request.bidderRequest.bids) {
    request.bidderRequest.bids.forEach(function (bid) {
      idToSlotConfig[bid.bidId] = bid;
    });
  }

  var bids = [];
  Object.keys(idToImpMap).forEach(function (id) {
    if (idToBidMap[id]) {
      var bid = {
        requestId: id,
        cpm: idToBidMap[id].price,
        creative_id: idToBidMap[id].crid,
        creativeId: idToBidMap[id].crid,
        adId: id,
        ttl: idToBidMap[id].exp || DEFAULT_BID_TTL,
        netRevenue: DEFAULT_NET_REVENUE,
        currency: bidResponse.cur || DEFAULT_CURRENCY
      };

      if (idToImpMap[id]['native']) {
        bid['native'] = nativeResponse(idToImpMap[id], idToBidMap[id]);
        bid.mediaType = 'native';
      } else if (idToImpMap[id].video) {
        // for outstream, a renderer is specified
        if (idToSlotConfig[id] && __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](idToSlotConfig[id], 'mediaTypes.video.context') === 'outstream') {
          bid.renderer = outstreamRenderer(__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](idToSlotConfig[id], 'renderer.options'), __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](idToBidMap[id], 'ext.outstream'));
        }

        bid.vastXml = idToBidMap[id].adm;
        bid.mediaType = 'video';
        bid.width = idToBidMap[id].w;
        bid.height = idToBidMap[id].h;
      } else {
        bid.ad = idToBidMap[id].adm;
        bid.width = idToImpMap[id].banner.w;
        bid.height = idToImpMap[id].banner.h;
      }

      bids.push(bid);
    }
  });
  return bids;
}
/**
 * Produces an OpenRTBImpression from a slot config.
 */


function impression(slot) {
  return {
    id: slot.bidId,
    banner: banner(slot),
    'native': nativeImpression(slot),
    tagid: slot.params.ct.toString(),
    video: video(slot),
    bidfloor: slot.params.bidfloor,
    ext: ext(slot)
  };
}
/**
 * Produces an OpenRTB Banner object for the slot given.
 */


function banner(slot) {
  var size = adSize(slot);
  return slot.nativeParams || slot.params.video ? null : {
    w: size[0],
    h: size[1],
    battr: slot.params.battr
  };
}
/**
 * Produces an OpenRTB Video object for the slot given
 */


function video(slot) {
  if (slot.params.video) {
    return _extends({}, slot.params.video, {
      battr: slot.params.battr
    });
  }

  return null;
}
/**
 * Unknown params are captured and sent on ext
 */


function ext(slot) {
  var ext = {};
  var knownParamsMap = {};
  KNOWN_PARAMS.forEach(function (value) {
    return knownParamsMap[value] = 1;
  });
  Object.keys(slot.params).forEach(function (key) {
    if (!knownParamsMap[key]) {
      ext[key] = slot.params[key];
    }
  });
  return Object.keys(ext).length > 0 ? {
    prebid: ext
  } : null;
}
/**
 * Sets up the renderer on the bid, for outstream bid responses.
 */


function outstreamRenderer(rendererOptions, outstreamExtOptions) {
  var renderer = __WEBPACK_IMPORTED_MODULE_2__src_Renderer__["a" /* Renderer */].install({
    url: outstreamExtOptions.rendererUrl,
    config: {
      defaultOptions: outstreamExtOptions.config,
      rendererOptions: rendererOptions,
      type: outstreamExtOptions.type
    },
    loaded: false
  });
  renderer.setRender(function (bid) {
    bid.renderer.push(function () {
      var config = bid.renderer.getConfig();
      new window.PulsePointOutstreamRenderer().render({
        adUnitCode: bid.adUnitCode,
        vastXml: bid.vastXml,
        type: config.type,
        defaultOptions: config.defaultOptions,
        rendererOptions: rendererOptions
      });
    });
  });
  return renderer;
}
/**
 * Produces an OpenRTB Native object for the slot given.
 */


function nativeImpression(slot) {
  if (slot.nativeParams) {
    var assets = [];
    addAsset(assets, titleAsset(assets.length + 1, slot.nativeParams.title, NATIVE_DEFAULTS.TITLE_LEN));
    addAsset(assets, dataAsset(assets.length + 1, slot.nativeParams.body, 2, NATIVE_DEFAULTS.DESCR_LEN));
    addAsset(assets, dataAsset(assets.length + 1, slot.nativeParams.sponsoredBy, 1, NATIVE_DEFAULTS.SPONSORED_BY_LEN));
    addAsset(assets, imageAsset(assets.length + 1, slot.nativeParams.icon, 1, NATIVE_DEFAULTS.ICON_MIN, NATIVE_DEFAULTS.ICON_MIN));
    addAsset(assets, imageAsset(assets.length + 1, slot.nativeParams.image, 3, NATIVE_DEFAULTS.IMG_MIN, NATIVE_DEFAULTS.IMG_MIN));
    return {
      request: JSON.stringify({
        assets: assets
      }),
      ver: '1.1',
      battr: slot.params.battr
    };
  }

  return null;
}
/**
 * Helper method to add an asset to the assets list.
 */


function addAsset(assets, asset) {
  if (asset) {
    assets.push(asset);
  }
}
/**
 * Produces a Native Title asset for the configuration given.
 */


function titleAsset(id, params, defaultLen) {
  if (params) {
    return {
      id: id,
      required: params.required ? 1 : 0,
      title: {
        len: params.len || defaultLen
      }
    };
  }

  return null;
}
/**
 * Produces a Native Image asset for the configuration given.
 */


function imageAsset(id, params, type, defaultMinWidth, defaultMinHeight) {
  return params ? {
    id: id,
    required: params.required ? 1 : 0,
    img: {
      type: type,
      wmin: params.wmin || defaultMinWidth,
      hmin: params.hmin || defaultMinHeight
    }
  } : null;
}
/**
 * Produces a Native Data asset for the configuration given.
 */


function dataAsset(id, params, type, defaultLen) {
  return params ? {
    id: id,
    required: params.required ? 1 : 0,
    data: {
      type: type,
      len: params.len || defaultLen
    }
  } : null;
}
/**
 * Produces an OpenRTB site object.
 */


function site(bidRequests, bidderRequest) {
  var pubId = bidRequests && bidRequests.length > 0 ? bidRequests[0].params.cp : '0';
  var appParams = bidRequests[0].params.app;

  if (!appParams) {
    return {
      publisher: {
        id: pubId.toString()
      },
      ref: referrer(),
      page: bidderRequest && bidderRequest.refererInfo ? bidderRequest.refererInfo.referer : ''
    };
  }

  return null;
}
/**
 * Produces an OpenRTB App object.
 */


function app(bidderRequest) {
  var pubId = bidderRequest && bidderRequest.length > 0 ? bidderRequest[0].params.cp : '0';
  var appParams = bidderRequest[0].params.app;

  if (appParams) {
    return {
      publisher: {
        id: pubId.toString()
      },
      bundle: appParams.bundle,
      storeurl: appParams.storeUrl,
      domain: appParams.domain
    };
  }

  return null;
}
/**
 * Attempts to capture the referrer url.
 */


function referrer() {
  try {
    return window.top.document.referrer;
  } catch (e) {
    return document.referrer;
  }
}
/**
 * Produces an OpenRTB Device object.
 */


function device() {
  return {
    ua: navigator.userAgent,
    language: navigator.language || navigator.browserLanguage || navigator.userLanguage || navigator.systemLanguage
  };
}
/**
 * Safely parses the input given. Returns null on
 * parsing failure.
 */


function parse(rawResponse) {
  try {
    if (rawResponse) {
      return JSON.parse(rawResponse);
    }
  } catch (ex) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('pulsepointLite.safeParse', 'ERROR', ex);
  }

  return null;
}
/**
 * Determines the AdSize for the slot.
 */


function adSize(slot) {
  if (slot.params.cf) {
    var size = slot.params.cf.toUpperCase().split('X');
    var width = parseInt(slot.params.cw || size[0], 10);
    var height = parseInt(slot.params.ch || size[1], 10);
    return [width, height];
  }

  return [1, 1];
}
/**
 * Handles the user level attributes and produces
 * an openrtb User object.
 */


function user(bidRequest, bidderRequest) {
  var ext = {};

  if (bidderRequest) {
    if (bidderRequest.gdprConsent) {
      ext.consent = bidderRequest.gdprConsent.consentString;
    }
  }

  if (bidRequest) {
    if (bidRequest.userId) {
      ext.eids = [];
      addExternalUserId(ext.eids, bidRequest.userId.pubcid, 'pubcommon');
      addExternalUserId(ext.eids, bidRequest.userId.britepoolid, 'britepool.com');
      addExternalUserId(ext.eids, bidRequest.userId.criteoId, 'criteo');
      addExternalUserId(ext.eids, bidRequest.userId.idl_env, 'identityLink');
      addExternalUserId(ext.eids, bidRequest.userId.id5id, 'id5-sync.com');
      addExternalUserId(ext.eids, bidRequest.userId.parrableid, 'parrable.com'); // liveintent

      if (bidRequest.userId.lipb && bidRequest.userId.lipb.lipbid) {
        addExternalUserId(ext.eids, bidRequest.userId.lipb.lipbid, 'liveintent.com');
      } // TTD


      addExternalUserId(ext.eids, bidRequest.userId.tdid, 'adserver.org', {
        rtiPartner: 'TDID'
      }); // digitrust

      var digitrustResponse = bidRequest.userId.digitrustid;

      if (digitrustResponse && digitrustResponse.data) {
        var digitrust = {};

        if (digitrustResponse.data.id) {
          digitrust.id = digitrustResponse.data.id;
        }

        if (digitrustResponse.data.keyv) {
          digitrust.keyv = digitrustResponse.data.keyv;
        }

        ext.digitrust = digitrust;
      }
    }
  }

  return {
    ext: ext
  };
}
/**
 * Produces external userid object in ortb 3.0 model.
 */


function addExternalUserId(eids, id, source, uidExt) {
  if (id) {
    var uid = {
      id: id
    };

    if (uidExt) {
      uid.ext = uidExt;
    }

    eids.push({
      source: source,
      uids: [uid]
    });
  }
}
/**
 * Produces the regulations ortb object
 */


function regs(bidderRequest) {
  if (bidderRequest.gdprConsent || bidderRequest.uspConsent) {
    var ext = {}; // GDPR applies attribute (actual consent value is in user object)

    if (bidderRequest.gdprConsent) {
      ext.gdpr = bidderRequest.gdprConsent.gdprApplies ? 1 : 0;
    } // CCPA


    if (bidderRequest.uspConsent) {
      ext.us_privacy = bidderRequest.uspConsent;
    }

    return {
      ext: ext
    };
  }

  return null;
}
/**
 * Creates source object with supply chain
 */


function source(schain) {
  if (schain) {
    return {
      ext: {
        schain: schain
      }
    };
  }

  return null;
}
/**
 * Parses the native response from the Bid given.
 */


function nativeResponse(imp, bid) {
  if (imp['native']) {
    var nativeAd = parse(bid.adm);
    var keys = {};

    if (nativeAd && nativeAd['native'] && nativeAd['native'].assets) {
      nativeAd['native'].assets.forEach(function (asset) {
        keys.title = asset.title ? asset.title.text : keys.title;
        keys.body = asset.data && asset.data.type === 2 ? asset.data.value : keys.body;
        keys.sponsoredBy = asset.data && asset.data.type === 1 ? asset.data.value : keys.sponsoredBy;
        keys.image = asset.img && asset.img.type === 3 ? asset.img.url : keys.image;
        keys.icon = asset.img && asset.img.type === 1 ? asset.img.url : keys.icon;
      });

      if (nativeAd['native'].link) {
        keys.clickUrl = encodeURIComponent(nativeAd['native'].link.url);
      }

      keys.impressionTrackers = nativeAd['native'].imptrackers;
      return keys;
    }
  }

  return null;
}

Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[418]);