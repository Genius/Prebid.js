pbjsChunk([106],{

/***/ 367:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(368);


/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__ = __webpack_require__(2);



var BIDDER_CODE = 'nobid';
window.nobidVersion = '1.1.0';

function log(msg, obj) {
  __WEBPACK_IMPORTED_MODULE_0__src_utils__["logInfo"]('-NoBid- ' + msg, obj);
}

function nobidBuildRequests(bids, bidderRequest) {
  var serializeState = function serializeState(divIds, siteId, adunits) {
    var filterAdUnitsByIds = function filterAdUnitsByIds(divIds, adUnits) {
      var filtered = [];

      if (!divIds || !divIds.length) {
        filtered = adUnits;
      } else if (adUnits) {
        var a = [];
        if (!(divIds instanceof Array)) a.push(divIds);else a = divIds;

        for (var i = 0, l = adUnits.length; i < l; i++) {
          var adUnit = adUnits[i];

          if (adUnit && adUnit.d && a.indexOf(adUnit.d) > -1) {
            filtered.push(adUnit);
          }
        }
      }

      return filtered;
    };

    var gdprConsent = function gdprConsent(bidderRequest) {
      var gdprConsent = {};

      if (bidderRequest && bidderRequest.gdprConsent) {
        gdprConsent = {
          consentString: bidderRequest.gdprConsent.consentString,
          // will check if the gdprApplies field was populated with a boolean value (ie from page config).  If it's undefined, then default to true
          consentRequired: typeof bidderRequest.gdprConsent.gdprApplies === 'boolean' ? bidderRequest.gdprConsent.gdprApplies : false
        };
      }

      return gdprConsent;
    };

    var topLocation = function topLocation(bidderRequest) {
      var ret = '';

      if (bidderRequest && bidderRequest.refererInfo && bidderRequest.refererInfo.referer) {
        ret = bidderRequest.refererInfo.referer;
      } else {
        ret = window.context && window.context.location && window.context.location.href ? window.context.location.href : document.location.href;
      }

      return encodeURIComponent(ret.replace(/\%/g, ''));
    };

    var timestamp = function timestamp() {
      var date = new Date();

      var zp = function zp(val) {
        return val <= 9 ? '0' + val : '' + val;
      };

      var d = date.getDate();
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var h = date.getHours();
      var min = date.getMinutes();
      var s = date.getSeconds();
      return '' + y + '-' + zp(m) + '-' + zp(d) + ' ' + zp(h) + ':' + zp(min) + ':' + zp(s);
    };

    var clientDim = function clientDim() {
      try {
        return "".concat(screen.width, "x").concat(screen.height);
      } catch (e) {
        console.error(e);
      }
    };

    var state = {};
    state['sid'] = siteId;
    state['l'] = topLocation(bidderRequest);
    state['tt'] = encodeURIComponent(document.title);
    state['tt'] = state['tt'].replace(/'|;|quot;|39;|&amp;|&|#|\r\n|\r|\n|\t|\f|\%0A|\"|\%22|\%5C|\%23|\%26|\%26|\%09/gm, '');
    state['a'] = filterAdUnitsByIds(divIds, adunits || []);
    state['t'] = timestamp();
    state['tz'] = Math.round(new Date().getTimezoneOffset());
    state['r'] = clientDim();
    state['lang'] = navigator.languages && navigator.languages[0] || navigator.language || navigator.userLanguage;
    state['ref'] = document.referrer;
    state['gdpr'] = gdprConsent(bidderRequest);
    return state;
  };

  function newAdunit(adunitObject, adunits) {
    var getAdUnit = function getAdUnit(divid, adunits) {
      for (var i = 0; i < adunits.length; i++) {
        if (adunits[i].d === divid) {
          return adunits[i];
        }
      }

      return false;
    };

    var removeByAttrValue = function removeByAttrValue(array, attribute, value) {
      for (var i = array.length - 1; i >= 0; i--) {
        var entry = array[i];

        if (entry[attribute] && entry[attribute] === value) {
          array.splice(i, 1);
        }
      }
    };

    var a = getAdUnit(adunitObject.div, adunits) || {};

    if (adunitObject.account) {
      a.s = adunitObject.account;
    }

    if (adunitObject.sizes) {
      a.z = adunitObject.sizes;
    }

    if (adunitObject.div) {
      a.d = adunitObject.div;
    }

    if (adunitObject.targeting) {
      a.g = adunitObject.targeting;
    } else {
      a.g = {};
    }

    if (adunitObject.companion) {
      a.c = adunitObject.companion;
    }

    if (adunitObject.div) {
      removeByAttrValue(adunits, 'd', adunitObject.div);
    }

    if (adunitObject.sizeMapping) {
      a.sm = adunitObject.sizeMapping;
    }

    if (adunitObject.siteId) {
      a.sid = adunitObject.siteId;
    }
    /* {"BIDDER_ID":{"WxH":"TAG_ID", "WxH":"TAG_ID"}} */


    if (adunitObject.rtb) {
      a.rtb = adunitObject.rtb;
    }

    adunits.push(a);
    return adunits;
  }
  /* DISCOVER SLOTS */


  var divids = [];
  var siteId = 0;
  var adunits = [];

  for (var i = 0; i < bids.length; i++) {
    var bid = bids[i];
    var divid = bid.adUnitCode;
    divids.push(divid);
    var sizes = bid.sizes;
    siteId = typeof bid.params['siteId'] != 'undefined' && bid.params['siteId'] ? bid.params['siteId'] : siteId;

    if (siteId && bid.params && bid.params.tags) {
      newAdunit({
        div: divid,
        sizes: sizes,
        rtb: bid.params.tags,
        siteId: siteId
      }, adunits);
    } else if (siteId) {
      newAdunit({
        div: divid,
        sizes: sizes,
        siteId: siteId
      }, adunits);
    }
  }

  if (siteId) {
    return serializeState(divids, siteId, adunits);
  } else {
    return false;
  }
}

function nobidInterpretResponse(response, bidRequest) {
  var findBid = function findBid(divid, bids) {
    for (var i = 0; i < bids.length; i++) {
      if (bids[i].adUnitCode === divid) {
        return bids[i];
      }
    }

    return false;
  };

  var bidResponses = [];

  for (var i = 0; response.bids && i < response.bids.length; i++) {
    var bid = response.bids[i];
    if (bid.bdrid < 100 || !bidRequest || !bidRequest.bidderRequest || !bidRequest.bidderRequest.bids) continue;
    nobid.bidResponses['' + bid.id] = bid;
    var reqBid = findBid(bid.divid, bidRequest.bidderRequest.bids);
    if (!reqBid) continue;
    var bidResponse = {
      requestId: reqBid.bidId,
      cpm: 1 * (bid.price ? bid.price : bid.bucket ? bid.bucket : 0),
      width: bid.size.w,
      height: bid.size.h,
      creativeId: bid.creativeid || '',
      dealId: bid.dealid || '',
      currency: 'USD',
      netRevenue: true,
      ttl: 300,
      ad: bid.adm,
      mediaType: __WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */]
    };
    bidResponses.push(bidResponse);
  }

  return bidResponses;
}

;
window.nobid = window.nobid || {};
nobid.bidResponses = nobid.bidResponses || {};
nobid.timeoutTotal = 0;
nobid.bidWonTotal = 0;

nobid.renderTag = function (doc, id, win) {
  log('nobid.renderTag()', id);
  var bid = nobid.bidResponses['' + id];

  if (bid && bid.adm2) {
    log('nobid.renderTag() found tag', id);
    var markup = bid.adm2;
    doc.write(markup);
    doc.close();
    return;
  }

  log('nobid.renderTag() tag NOT FOUND *ERROR*', id);
};

var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_2__src_mediaTypes__["b" /* BANNER */]],

  /**
  * Determines whether or not the given bid request is valid.
  *
  * @param {BidRequest} bid The bid params to validate.
  * @return boolean True if this is a valid bid, and false otherwise.
  */
  isBidRequestValid: function isBidRequestValid(bid) {
    log('isBidRequestValid', bid);
    return !!bid.params.siteId;
  },

  /**
  * Make a server request from the list of BidRequests.
  *
  * @param {validBidRequests[]} - an array of bids
  * @return ServerRequest Info describing the request to the server.
  */
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    function resolveEndpoint() {
      var ret = 'https://ads.servenobid.com/';
      var env = typeof __WEBPACK_IMPORTED_MODULE_0__src_utils__["getParameterByName"] === 'function' && __WEBPACK_IMPORTED_MODULE_0__src_utils__["getParameterByName"]('nobid-env');
      if (!env) ret = 'https://ads.servenobid.com/';else if (env == 'beta') ret = 'https://beta.servenobid.com/';else if (env == 'dev') ret = 'https://localhost:8282/';else if (env == 'qa') ret = 'https://qa-ads.nobid.com/';
      return ret;
    }

    var buildEndpoint = function buildEndpoint() {
      return resolveEndpoint() + 'adreq?cb=' + Math.floor(Math.random() * 11000);
    };

    log('buildRequests', validBidRequests);

    if (!validBidRequests || validBidRequests.length <= 0) {
      log('Empty validBidRequests');
      return;
    }

    var payload = nobidBuildRequests(validBidRequests, bidderRequest);
    if (!payload) return;
    var payloadString = JSON.stringify(payload).replace(/'|&|#/g, '');
    var endpoint = buildEndpoint();
    return {
      method: 'POST',
      url: endpoint,
      data: payloadString,
      bidderRequest: bidderRequest
    };
  },

  /**
     * Unpack the response from the server into a list of bids.
     *
     * @param {ServerResponse} serverResponse A successful response from the server.
     * @return {Bid[]} An array of bids which were nested inside the server.
     */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    log('interpretResponse', serverResponse);
    log('interpretResponse', bidRequest);
    return nobidInterpretResponse(serverResponse.body, bidRequest);
  },

  /**
     * Register the user sync pixels which should be dropped after the auction.
     *
     * @param {SyncOptions} syncOptions Which user syncs are allowed?
     * @param {ServerResponse[]} serverResponses List of server's responses.
     * @return {UserSync[]} The user syncs which should be dropped.
     */
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses, gdprConsent) {
    if (syncOptions.iframeEnabled) {
      var params = '';

      if (gdprConsent && typeof gdprConsent.consentString === 'string') {
        // add 'gdpr' only if 'gdprApplies' is defined
        if (typeof gdprConsent.gdprApplies === 'boolean') {
          params += "?gdpr=".concat(Number(gdprConsent.gdprApplies), "&gdpr_consent=").concat(gdprConsent.consentString);
        } else {
          params += "?gdpr_consent=".concat(gdprConsent.consentString);
        }
      }

      return [{
        type: 'iframe',
        url: 'https://s3.amazonaws.com/nobid-public/sync.html' + params
      }];
    } else {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]('-NoBid- Please enable iframe based user sync.', syncOptions);
      return [];
    }
  },

  /**
     * Register bidder specific code, which will execute if bidder timed out after an auction
     * @param {data} Containing timeout specific data
     */
  onTimeout: function onTimeout(data) {
    nobid.timeoutTotal++;
    log('Timeout total: ' + nobid.timeoutTotal, data);
    return nobid.timeoutTotal;
  },
  onBidWon: function onBidWon(data) {
    nobid.bidWonTotal++;
    log('BidWon total: ' + nobid.bidWonTotal, data);
    return nobid.bidWonTotal;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[367]);