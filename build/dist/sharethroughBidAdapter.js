pbjsChunk([90],{

/***/ 560:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(561);


/***/ }),

/***/ 561:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sharethroughInternal", function() { return sharethroughInternal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sharethroughAdapterSpec", function() { return sharethroughAdapterSpec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__ = __webpack_require__(1);

var VERSION = '3.1.0';
var BIDDER_CODE = 'sharethrough';
var STR_ENDPOINT = document.location.protocol + '//btlr.sharethrough.com/WYu2BXv1/v1';
var DEFAULT_SIZE = [1, 1]; // this allows stubbing of utility function that is used internally by the sharethrough adapter

var sharethroughInternal = {
  b64EncodeUnicode: b64EncodeUnicode,
  handleIframe: handleIframe,
  isLockedInFrame: isLockedInFrame
};
var sharethroughAdapterSpec = {
  code: BIDDER_CODE,
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!bid.params.pkey && bid.bidder === BIDDER_CODE;
  },
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    return bidRequests.map(function (bidRequest) {
      var query = {
        placement_key: bidRequest.params.pkey,
        bidId: bidRequest.bidId,
        consent_required: false,
        instant_play_capable: canAutoPlayHTML5Video(),
        hbSource: 'prebid',
        hbVersion: "2.37.0",
        strVersion: VERSION
      };

      if (bidderRequest && bidderRequest.gdprConsent && bidderRequest.gdprConsent.consentString) {
        query.consent_string = bidderRequest.gdprConsent.consentString;
      }

      if (bidderRequest && bidderRequest.gdprConsent) {
        query.consent_required = !!bidderRequest.gdprConsent.gdprApplies;
      }

      if (bidRequest.userId && bidRequest.userId.tdid) {
        query.ttduid = bidRequest.userId.tdid;
      }

      if (bidRequest.schain) {
        query.schain = JSON.stringify(bidRequest.schain);
      }

      if (bidRequest.bidfloor) {
        query.bidfloor = parseFloat(bidRequest.bidfloor);
      } // Data that does not need to go to the server,
      // but we need as part of interpretResponse()


      var strData = {
        skipIframeBusting: bidRequest.params.iframe,
        iframeSize: bidRequest.params.iframeSize,
        sizes: bidRequest.sizes
      };
      return {
        method: 'GET',
        url: STR_ENDPOINT,
        data: query,
        strData: strData
      };
    });
  },
  interpretResponse: function interpretResponse(_ref, req) {
    var body = _ref.body;

    if (!body || !body.creatives || !body.creatives.length) {
      return [];
    }

    var creative = body.creatives[0];
    var size = DEFAULT_SIZE;

    if (req.strData.iframeSize || req.strData.sizes.length) {
      size = req.strData.iframeSize ? req.strData.iframeSize : getLargestSize(req.strData.sizes);
    }

    return [{
      requestId: req.data.bidId,
      width: size[0],
      height: size[1],
      cpm: creative.cpm,
      creativeId: creative.creative.creative_key,
      dealId: creative.creative.deal_id,
      currency: 'USD',
      netRevenue: true,
      ttl: 360,
      ad: generateAd(body, req)
    }];
  },
  getUserSyncs: function getUserSyncs(syncOptions, serverResponses) {
    var syncs = [];
    var shouldCookieSync = syncOptions.pixelEnabled && serverResponses.length > 0 && serverResponses[0].body && serverResponses[0].body.cookieSyncUrls;

    if (shouldCookieSync) {
      serverResponses[0].body.cookieSyncUrls.forEach(function (url) {
        syncs.push({
          type: 'image',
          url: url
        });
      });
    }

    return syncs;
  },
  // Empty implementation for prebid core to be able to find it
  onTimeout: function onTimeout(data) {},
  // Empty implementation for prebid core to be able to find it
  onBidWon: function onBidWon(bid) {},
  // Empty implementation for prebid core to be able to find it
  onSetTargeting: function onSetTargeting(bid) {}
};

function getLargestSize(sizes) {
  function area(size) {
    return size[0] * size[1];
  }

  return sizes.reduce(function (prev, current) {
    if (area(current) > area(prev)) {
      return current;
    } else {
      return prev;
    }
  });
}

function generateAd(body, req) {
  var strRespId = "str_response_".concat(req.data.bidId);
  var adMarkup = "\n    <div data-str-native-key=\"".concat(req.data.placement_key, "\" data-stx-response-name=\"").concat(strRespId, "\">\n    </div>\n    <script>var ").concat(strRespId, " = \"").concat(b64EncodeUnicode(JSON.stringify(body)), "\"</script>\n  ");

  if (req.strData.skipIframeBusting) {
    // Don't break out of iframe
    adMarkup = adMarkup + "<script src=\"//native.sharethrough.com/assets/sfp.js\"></script>";
  } else {
    // Add logic to the markup that detects whether or not in top level document is accessible
    // this logic will deploy sfp.js and/or iframe buster script(s) as appropriate
    adMarkup = adMarkup + "\n      <script>\n        (".concat(sharethroughInternal.isLockedInFrame.toString(), ")()\n      </script>\n      <script>\n        (").concat(sharethroughInternal.handleIframe.toString(), ")()\n      </script>");
  }

  return adMarkup;
}

function handleIframe() {
  // only load iframe buster JS if we can access the top level document
  // if we are 'locked in' to this frame then no point trying to bust out: we may as well render in the frame instead
  var iframeBusterLoaded = false;

  if (!window.lockedInFrame) {
    var sfpIframeBusterJs = document.createElement('script');
    sfpIframeBusterJs.src = '//native.sharethrough.com/assets/sfp-set-targeting.js';
    sfpIframeBusterJs.type = 'text/javascript';

    try {
      window.document.getElementsByTagName('body')[0].appendChild(sfpIframeBusterJs);
      iframeBusterLoaded = true;
    } catch (e) {
      console.error(e);
    }
  }

  var clientJsLoaded = !iframeBusterLoaded ? !!(window.STR && window.STR.Tag) : !!(window.top.STR && window.top.STR.Tag);

  if (!clientJsLoaded) {
    var sfpJs = document.createElement('script');
    sfpJs.src = '//native.sharethrough.com/assets/sfp.js';
    sfpJs.type = 'text/javascript'; // only add sfp js to window.top if iframe busting successfully loaded; otherwise, add to iframe

    try {
      if (iframeBusterLoaded) {
        window.top.document.getElementsByTagName('body')[0].appendChild(sfpJs);
      } else {
        window.document.getElementsByTagName('body')[0].appendChild(sfpJs);
      }
    } catch (e) {
      console.error(e);
    }
  }
} // determines if we are capable of busting out of the iframe we are in
// if we catch a DOMException when trying to access top-level document, it means we're stuck in the frame we're in


function isLockedInFrame() {
  window.lockedInFrame = false;

  try {
    window.lockedInFrame = !window.top.document;
  } catch (e) {
    window.lockedInFrame = e instanceof DOMException;
  }
} // See https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem


function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

function canAutoPlayHTML5Video() {
  var userAgent = navigator.userAgent;
  if (!userAgent) return false;
  var isAndroid = /Android/i.test(userAgent);
  var isiOS = /iPhone|iPad|iPod/i.test(userAgent);
  var chromeVersion = parseInt((/Chrome\/([0-9]+)/.exec(userAgent) || [0, 0])[1]);
  var chromeiOSVersion = parseInt((/CriOS\/([0-9]+)/.exec(userAgent) || [0, 0])[1]);
  var safariVersion = parseInt((/Version\/([0-9]+)/.exec(userAgent) || [0, 0])[1]);

  if (isAndroid && chromeVersion >= 53 || isiOS && (safariVersion >= 10 || chromeiOSVersion >= 53) || !(isAndroid || isiOS)) {
    return true;
  } else {
    return false;
  }
}

Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory__["registerBidder"])(sharethroughAdapterSpec);

/***/ })

},[560]);