pbjsChunk([16],{

/***/ 302:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(303);
module.exports = __webpack_require__(304);


/***/ }),

/***/ 303:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spec = undefined;

var _bidderFactory = __webpack_require__(6);

var _mediaTypes = __webpack_require__(12);

function RhythmOneBidAdapter() {
  this.code = 'rhythmone';
  this.supportedMediaTypes = [_mediaTypes.VIDEO, _mediaTypes.BANNER];

  this.isBidRequestValid = function (bid) {
    return true;
  };

  function getFirstParam(key, validBidRequests) {
    for (var i = 0; i < validBidRequests.length; i++) {
      if (validBidRequests[i].params && validBidRequests[i].params[key]) {
        return validBidRequests[i].params[key];
      }
    }
  }

  var slotsToBids = {};
  var that = this;
  var version = '1.0.0.0';

  this.buildRequests = function (BRs) {
    var fallbackPlacementId = getFirstParam('placementId', BRs);
    if (fallbackPlacementId === undefined || BRs.length < 1) {
      return [];
    }

    slotsToBids = {};

    var query = [];
    var w = typeof window !== 'undefined' ? window : {};

    function p(k, v) {
      if (v instanceof Array) {
        v = v.join(',');
      }
      if (typeof v !== 'undefined') {
        query.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
      }
    }

    function attempt(valueFunction, defaultValue) {
      try {
        return valueFunction();
      } catch (ex) {}
      return defaultValue;
    }

    p('domain', attempt((function () {
      var d = w.document.location.ancestorOrigins;
      if (d && d.length > 0) {
        return d[d.length - 1];
      }
      return w.top.document.location.hostname; // try/catch is in the attempt function
    }), ''));
    p('url', attempt((function () {
      var l;
      // try/catch is in the attempt function
      try {
        l = w.top.document.location.href.toString();
      } catch (ex) {
        l = w.document.location.href.toString();
      }
      return l;
    }), ''));

    function getRMPUrl() {
      var url = getFirstParam('endpoint', BRs) || '//tag.1rx.io/rmp/{placementId}/0/{path}?z={zone}';
      var defaultZone = getFirstParam('zone', BRs) || '1r';
      var defaultPath = getFirstParam('path', BRs) || 'mvo';

      url = url.replace(/\{placementId\}/i, fallbackPlacementId);
      url = url.replace(/\{zone\}/i, defaultZone);
      url = url.replace(/\{path\}/i, defaultPath);

      p('title', attempt((function () {
        return w.top.document.title;
      }), '')); // try/catch is in the attempt function
      p('dsh', w.screen ? w.screen.height : '');
      p('dsw', w.screen ? w.screen.width : '');
      p('tz', new Date().getTimezoneOffset());
      p('dtype', /(ios|ipod|ipad|iphone|android)/i.test(w.navigator.userAgent) ? 1 : /(smart[-]?tv|hbbtv|appletv|googletv|hdmi|netcast\.tv|viera|nettv|roku|\bdtv\b|sonydtv|inettvbrowser|\btv\b)/i.test(w.navigator.userAgent) ? 3 : 2);
      p('flash', attempt((function () {
        var n = w.navigator;
        var p = n.plugins;
        var m = n.mimeTypes;
        var t = 'application/x-shockwave-flash';
        var x = w.ActiveXObject;

        if (p && p['Shockwave Flash'] && m && m[t] && m[t].enabledPlugin) {
          return 1;
        }

        if (x) {
          try {
            if (new w.ActiveXObject('ShockwaveFlash.ShockwaveFlash')) {
              return 1;
            }
          } catch (e) {}
        }

        return 0;
      }), 0));

      var heights = [];
      var widths = [];
      var floors = [];
      var mediaTypes = [];
      var i = 0;
      var configuredPlacements = [];
      var fat = /(^v|(\.0)+$)/gi;

      p('hbv', w.pbjs.version.replace(fat, '') + ',' + version.replace(fat, ''));

      for (; i < BRs.length; i++) {
        var th = [];
        var tw = [];
        var params = BRs[i].params || {};

        slotsToBids[BRs[i].adUnitCode || BRs[i].placementCode] = BRs[i];

        if (BRs[i].sizes.length > 0 && typeof BRs[i].sizes[0] === 'number') {
          BRs[i].sizes = [BRs[i].sizes];
        }

        for (var j = 0; j < BRs[i].sizes.length; j++) {
          tw.push(BRs[i].sizes[j][0]);
          th.push(BRs[i].sizes[j][1]);
        }
        configuredPlacements.push(BRs[i].adUnitCode || BRs[i].placementCode);
        heights.push(th.join('|'));
        widths.push(tw.join('|'));
        mediaTypes.push(BRs[i].mediaTypes && BRs[i].mediaTypes.video ? 'v' : 'd');
        floors.push(params.floor || 0);
      }

      p('imp', configuredPlacements);
      p('w', widths);
      p('h', heights);
      p('floor', floors);
      p('t', mediaTypes);

      url += '&' + query.join('&') + '&';

      return url;
    }

    return [{
      method: 'GET',
      url: getRMPUrl()
    }];
  };

  this.interpretResponse = function (serverResponse) {
    var responses = serverResponse.body || [];
    var bids = [];
    var i = 0;

    if (responses.seatbid) {
      var temp = [];
      for (i = 0; i < responses.seatbid.length; i++) {
        for (var j = 0; j < responses.seatbid[i].bid.length; j++) {
          temp.push(responses.seatbid[i].bid[j]);
        }
      }
      responses = temp;
    }

    for (i = 0; i < responses.length; i++) {
      var bid = responses[i];
      var bidRequest = slotsToBids[bid.impid];
      var bidResponse = {
        requestId: bidRequest.bidId,
        bidderCode: that.code,
        cpm: parseFloat(bid.price),
        width: bid.w,
        height: bid.h,
        creativeId: bid.crid,
        currency: 'USD',
        netRevenue: true,
        ttl: 1000
      };

      if (bidRequest.mediaTypes && bidRequest.mediaTypes.video) {
        bidResponse.vastUrl = bid.nurl;
        bidResponse.ttl = 10000;
      } else {
        bidResponse.ad = bid.adm;
      }
      bids.push(bidResponse);
    }
    return bids;
  };
}

var spec = exports.spec = new RhythmOneBidAdapter();
(0, _bidderFactory.registerBidder)(spec);

/***/ }),

/***/ 304:
/***/ (function(module, exports) {



/***/ })

},[302]);