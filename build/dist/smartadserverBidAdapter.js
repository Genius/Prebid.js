pbjsChunk([11],{

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createEidsArray;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
 // Each user-id sub-module is expected to mention respective config here

var USER_IDS_CONFIG = {
  // key-name : {config}
  // intentIqId
  'intentIqId': {
    source: 'intentiq.com',
    atype: 1
  },
  // pubCommonId
  'pubcid': {
    source: 'pubcid.org',
    atype: 1
  },
  // unifiedId
  'tdid': {
    source: 'adserver.org',
    atype: 1,
    getUidExt: function getUidExt() {
      return {
        rtiPartner: 'TDID'
      };
    }
  },
  // id5Id
  'id5id': {
    source: 'id5-sync.com',
    atype: 1
  },
  // parrableId
  'parrableId': {
    source: 'parrable.com',
    atype: 1,
    getValue: function getValue(parrableId) {
      if (parrableId.eid) {
        return parrableId.eid;
      }

      if (parrableId.ccpaOptout) {
        // If the EID was suppressed due to a non consenting ccpa optout then
        // we still wish to provide this as a reason to the adapters
        return '';
      }

      return null;
    },
    getUidExt: function getUidExt(parrableId) {
      var extendedData = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["pick"](parrableId, ['ibaOptout', 'ccpaOptout']);

      if (Object.keys(extendedData).length) {
        return extendedData;
      }
    }
  },
  // identityLink
  'idl_env': {
    source: 'liveramp.com',
    atype: 1
  },
  // liveIntentId
  'lipb': {
    getValue: function getValue(data) {
      return data.lipbid;
    },
    source: 'liveintent.com',
    atype: 1,
    getEidExt: function getEidExt(data) {
      if (Array.isArray(data.segments) && data.segments.length) {
        return {
          segments: data.segments
        };
      }
    }
  },
  // britepoolId
  'britepoolid': {
    source: 'britepool.com',
    atype: 1
  },
  // lotamePanoramaId
  lotamePanoramaId: {
    source: 'crwdcntrl.net',
    atype: 1
  },
  // criteo
  'criteoId': {
    source: 'criteo.com',
    atype: 1
  },
  // NetId
  'netId': {
    source: 'netid.de',
    atype: 1
  },
  // sharedid
  'sharedid': {
    source: 'sharedid.org',
    atype: 1,
    getValue: function getValue(data) {
      return data.id;
    },
    getUidExt: function getUidExt(data) {
      return data && data.third ? {
        third: data.third
      } : undefined;
    }
  }
}; // this function will create an eid object for the given UserId sub-module

function createEidObject(userIdData, subModuleKey) {
  var conf = USER_IDS_CONFIG[subModuleKey];

  if (conf && userIdData) {
    var eid = {};
    eid.source = conf['source'];
    var value = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isFn"](conf['getValue']) ? conf['getValue'](userIdData) : userIdData;

    if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](value)) {
      var uid = {
        id: value,
        atype: conf['atype']
      }; // getUidExt

      if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isFn"](conf['getUidExt'])) {
        var uidExt = conf['getUidExt'](userIdData);

        if (uidExt) {
          uid.ext = uidExt;
        }
      }

      eid.uids = [uid]; // getEidExt

      if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isFn"](conf['getEidExt'])) {
        var eidExt = conf['getEidExt'](userIdData);

        if (eidExt) {
          eid.ext = eidExt;
        }
      }

      return eid;
    }
  }

  return null;
} // this function will generate eids array for all available IDs in bidRequest.userId
// this function will be called by userId module
// if any adapter does not want any particular userId to be passed then adapter can use Array.filter(e => e.source != 'tdid')


function createEidsArray(bidRequestUserId) {
  var eids = [];

  for (var subModuleKey in bidRequestUserId) {
    if (bidRequestUserId.hasOwnProperty(subModuleKey)) {
      var eid = createEidObject(bidRequestUserId[subModuleKey], subModuleKey);

      if (eid) {
        eids.push(eid);
      }
    }
  }

  return eids;
}

/***/ }),

/***/ 698:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(699);


/***/ }),

/***/ 699:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__userId_eids_js__ = __webpack_require__(44);





var BIDDER_CODE = 'smartadserver';
var spec = {
  code: BIDDER_CODE,
  aliases: ['smart'],
  // short code
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params && bid.params.siteId && bid.params.pageId && bid.params.formatId);
  },

  /**
   * Serialize a supply chain object to a string uri encoded
   *
   * @param {*} schain object
   */
  serializeSupplyChain: function serializeSupplyChain(schain) {
    if (!schain || !schain.nodes) return null;
    var nodesProperties = ['asi', 'sid', 'hp', 'rid', 'name', 'domain'];
    return "".concat(schain.ver, ",").concat(schain.complete, "!") + schain.nodes.map(function (node) {
      return nodesProperties.map(function (prop) {
        return node[prop] ? encodeURIComponent(node[prop]) : '';
      }).join(',');
    }).join('!');
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {BidRequest[]} validBidRequests an array of bids
   * @param {BidderRequest} bidderRequest bidder request object
   * @return {ServerRequest[]} Info describing the request to the server.
   */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    // use bidderRequest.bids[] to get bidder-dependent request info
    // if your bidder supports multiple currencies, use config.getConfig(currency)
    // to find which one the ad server needs
    // pull requested transaction ID from bidderRequest.bids[].transactionId
    return validBidRequests.map(function (bid) {
      // Common bid request attributes for banner, outstream and instream.
      var payload = {
        siteid: bid.params.siteId,
        pageid: bid.params.pageId,
        formatid: bid.params.formatId,
        currencyCode: __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('currency.adServerCurrency'),
        bidfloor: bid.params.bidfloor || 0.0,
        targeting: bid.params.target && bid.params.target !== '' ? bid.params.target : undefined,
        buid: bid.params.buId && bid.params.buId !== '' ? bid.params.buId : undefined,
        appname: bid.params.appName && bid.params.appName !== '' ? bid.params.appName : undefined,
        ckid: bid.params.ckId || 0,
        tagId: bid.adUnitCode,
        pageDomain: bidderRequest && bidderRequest.refererInfo && bidderRequest.refererInfo.referer ? bidderRequest.refererInfo.referer : undefined,
        transactionId: bid.transactionId,
        timeout: __WEBPACK_IMPORTED_MODULE_2__src_config_js__["b" /* config */].getConfig('bidderTimeout'),
        bidId: bid.bidId,
        prebidVersion: "4.2.0",
        schain: spec.serializeSupplyChain(bid.schain)
      };
      var videoMediaType = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.video');

      if (!videoMediaType) {
        var bannerMediaType = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](bid, 'mediaTypes.banner');
        payload.sizes = bannerMediaType.sizes.map(function (size) {
          return {
            w: size[0],
            h: size[1]
          };
        });
      } else if (videoMediaType && videoMediaType.context === 'instream') {
        // Specific attributes for instream.
        var playerSize = videoMediaType.playerSize[0];
        payload.isVideo = true;
        payload.videoData = {
          videoProtocol: bid.params.video.protocol,
          playerWidth: playerSize[0],
          playerHeight: playerSize[1],
          adBreak: bid.params.video.startDelay || 1
        };
      } else {
        return {};
      }

      if (bidderRequest && bidderRequest.gdprConsent) {
        payload.gdpr_consent = bidderRequest.gdprConsent.consentString;
        payload.gdpr = bidderRequest.gdprConsent.gdprApplies; // we're handling the undefined case server side
      }

      if (bid && bid.userId) {
        payload.eids = Object(__WEBPACK_IMPORTED_MODULE_4__userId_eids_js__["a" /* createEidsArray */])(bid.userId);
      }

      if (bidderRequest && bidderRequest.uspConsent) {
        payload.us_privacy = bidderRequest.uspConsent;
      }

      var payloadString = JSON.stringify(payload);
      return {
        method: 'POST',
        url: (bid.params.domain !== undefined ? bid.params.domain : 'https://prg.smartadserver.com') + '/prebid/v1',
        data: payloadString
      };
    });
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {*} serverResponse A successful response from the server.
   * @param {*} bidRequestString
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequestString) {
    var bidResponses = [];
    var response = serverResponse.body;

    try {
      if (response) {
        var bidRequest = JSON.parse(bidRequestString.data);
        var bidResponse = {
          requestId: bidRequest.bidId,
          cpm: response.cpm,
          width: response.width,
          height: response.height,
          creativeId: response.creativeId,
          dealId: response.dealId,
          currency: response.currency,
          netRevenue: response.isNetCpm,
          ttl: response.ttl
        };

        if (bidRequest.isVideo) {
          bidResponse.mediaType = __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes_js__["d" /* VIDEO */];
          bidResponse.vastUrl = response.adUrl;
          bidResponse.vastXml = response.ad;
        } else {
          bidResponse.adUrl = response.adUrl;
          bidResponse.ad = response.ad;
        }

        bidResponses.push(bidResponse);
      }
    } catch (error) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('Error while parsing smart server response', error);
    }

    return bidResponses;
  },

  /**
   * User syncs.
   *
   * @param {*} syncOptions Publisher prebid configuration.
   * @param {*} serverResponses A successful response from the server.
   * @return {syncs[]} An array of syncs that should be executed.
   */
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    var syncs = [];

    if (syncOptions.iframeEnabled && serverResponses.length > 0) {
      syncs.push({
        type: 'iframe',
        url: serverResponses[0].body.cSyncUrl
      });
    }

    return syncs;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_3__src_adapters_bidderFactory_js__["registerBidder"])(spec);

/***/ })

},[698]);