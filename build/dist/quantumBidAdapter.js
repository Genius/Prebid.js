pbjsChunk([111],{

/***/ 504:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(505);


/***/ }),

/***/ 505:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__ = __webpack_require__(1);



var BIDDER_CODE = 'quantum';
var ENDPOINT_URL = '//s.sspqns.com/hb';
var spec = {
  code: BIDDER_CODE,
  aliases: ['quantx', 'qtx'],
  // short code
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_1__src_mediaTypes__["c" /* NATIVE */]],

  /**
   * Determines whether or not the given bid request is valid.
   *
   * @param {BidRequest} bid The bid params to validate.
   * @return boolean True if this is a valid bid, and false otherwise.
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    return !!(bid.params && bid.params.placementId);
  },

  /**
   * Make a server request from the list of BidRequests.
   *
   * @param {validBidRequests[]} - an array of bids
   * @return ServerRequest Info describing the request to the server.
   */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    return bidRequests.map(function (bid) {
      var qtxRequest = {};
      var bidId = '';
      var params = bid.params;
      var placementId = params.placementId;
      var devEnpoint = false;

      if (params.useDev && params.useDev === '1') {
        devEnpoint = '//sdev.sspqns.com/hb';
      }

      var renderMode = 'native';

      for (var i = 0; i < bid.sizes.length; i++) {
        if (bid.sizes[i][0] > 1 && bid.sizes[i][1] > 1) {
          renderMode = 'banner';
          break;
        }
      }

      var mediaType = bid.mediaType === 'native' || __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.native') ? 'native' : 'banner';

      if (mediaType === 'native') {
        renderMode = 'native';
      }

      if (!bidId) {
        bidId = bid.bidId;
      }

      qtxRequest.auid = placementId;

      if (bidderRequest && bidderRequest.gdprConsent) {
        qtxRequest.quantx_user_consent_string = bidderRequest.gdprConsent.consentString;
        qtxRequest.quantx_gdpr = bidderRequest.gdprConsent.gdprApplies === true ? 1 : 0;
      }

      ;
      var url = devEnpoint || ENDPOINT_URL;
      return {
        method: 'GET',
        bidId: bidId,
        sizes: bid.sizes,
        mediaType: mediaType,
        renderMode: renderMode,
        url: url,
        'data': qtxRequest,
        bidderRequest: bidderRequest
      };
    });
  },

  /**
   * Unpack the response from the server into a list of bids.
   *
   * @param {ServerResponse} serverResponse A successful response from the server.
   * @return {Bid[]} An array of bids which were nested inside the server.
   */
  interpretResponse: function interpretResponse(serverResponse, bidRequest) {
    var serverBody = serverResponse.body;
    var bidResponses = [];
    var responseCPM;
    var bid = {};
    var id = bidRequest.bidId;

    if (serverBody.price && serverBody.price !== 0) {
      responseCPM = parseFloat(serverBody.price);
      bid.creativeId = serverBody.creative_id || '0';
      bid.cpm = responseCPM;
      bid.requestId = bidRequest.bidId;
      bid.width = 1;
      bid.height = 1;
      bid.ttl = 200;
      bid.netRevenue = true;
      bid.currency = 'USD';

      if (serverBody.native) {
        bid.native = serverBody.native;
      }

      if (serverBody.cobj) {
        bid.cobj = serverBody.cobj;
      }

      if (!__WEBPACK_IMPORTED_MODULE_0__src_utils__["isEmpty"](bidRequest.sizes)) {
        bid.width = bidRequest.sizes[0][0];
        bid.height = bidRequest.sizes[0][1];
      }

      bid.nurl = serverBody.nurl;
      bid.sync = serverBody.sync;

      if (bidRequest.renderMode && bidRequest.renderMode === 'banner') {
        bid.mediaType = 'banner';

        if (serverBody.native) {
          var adAssetsUrl = '//cdn.elasticad.net/native/serve/js/quantx/quantumAd/';
          var assets = serverBody.native.assets;
          var link = serverBody.native.link;
          var trackers = [];

          if (serverBody.native.imptrackers) {
            trackers = serverBody.native.imptrackers;
          }

          var jstracker = '';

          if (serverBody.native.jstracker) {
            jstracker = encodeURIComponent(serverBody.native.jstracker);
          }

          if (serverBody.nurl) {
            trackers.push(serverBody.nurl);
          }

          var ad = {};
          ad['trackers'] = trackers;
          ad['jstrackers'] = jstracker;
          ad['eventtrackers'] = serverBody.native.eventtrackers || [];

          for (var i = 0; i < assets.length; i++) {
            var asset = assets[i];

            switch (asset['id']) {
              case 1:
                ad['title'] = asset['title']['text'];
                break;

              case 2:
                ad['sponsor_logo'] = asset['img']['url'];
                break;

              case 3:
                ad['content'] = asset['data']['value'];
                break;

              case 4:
                ad['main_image'] = asset['img']['url'];
                break;

              case 6:
                ad['teaser_type'] = 'vast';
                ad['video_url'] = asset['video']['vasttag'];
                break;

              case 10:
                ad['sponsor_name'] = asset['data']['value'];
                break;

              case 2001:
                ad['expanded_content_type'] = 'embed';
                ad['expanded_summary'] = asset['data']['value'];
                break;

              case 2002:
                ad['expanded_content_type'] = 'vast';
                ad['expanded_summary'] = asset['data']['value'];
                break;

              case 2003:
                ad['sponsor_url'] = asset['data']['value'];
                break;

              case 2004:
                // prism
                ad['content_type'] = 'prism';
                break;

              case 2005:
                // internal_landing_page
                ad['content_type'] = 'internal_landing_page';
                ad['internal_content_link'] = asset['data']['value'];
                break;

              case 2006:
                // teaser as vast
                ad['teaser_type'] = 'vast';
                ad['video_url'] = asset['data']['value'];
                break;

              case 2007:
                ad['autoexpand_content_type'] = asset['data']['value'];
                break;

              case 2022:
                // content page
                ad['content_type'] = 'full_text';
                ad['full_text'] = asset['data']['value'];
                break;
            }
          }

          ad['action_url'] = link.url;

          if (!ad['sponsor_url']) {
            ad['sponsor_url'] = ad['action_url'];
          }

          ad['clicktrackers'] = [];

          if (link.clicktrackers) {
            ad['clicktrackers'] = link.clicktrackers;
          }

          ad['main_image'] = '//resize-ssp.adux.com/scalecrop-290x130/' + window.btoa(ad['main_image']) + '/external';
          bid.ad = '<div id="ead_' + id + '\">' + '<div class="ad_container ead_' + id + '" style="clear: both; display:inline-block;width:100%">' + '  <div class="image_content">' + '    <a href="' + ad['action_url'] + '" class="ea_expand" target="_blank"><img src="' + ad['main_image'] + '" class="ea_image ead_image">' + '    </a>' + '  </div>' + '  <div class="ead_content"><a href="' + ad['action_url'] + '" class="ea_expand" style="text-decoration: none" target="_blank"><h2 style="margin:0px;">' + ad['title'] + '</h2></a>' + '    <p class="ea_summary">' + ad['content'] + '&nbsp;</p></div>' + '  <div style="text-align:right;" class="ea_hide_brand_logo ea_hide_brand_name">' + '    <p style="margin:0;"><span class="ea_creative_var_label">Sponsored by</span>' + '      <a href="' + ad['sponsor_url'] + '" class="ea_link" target="_blank" style="display:inline;" target="_blank"><img src="' + ad['sponsor_logo'] + '" class="ea_image" style="vertical-align:middle;"></a>' + '    </p>' + '  </div>' + '</div>' + '<script type="application/javascript">var eanAD = ' + JSON.stringify(ad) + ';</script>' + '<script src="' + adAssetsUrl + 'qad.js" type="application/javascript"></script>' + '<link rel="stylesheet" href="' + adAssetsUrl + 'qad.css">' + '</div>';
        }
      } else {
        // native
        bid.mediaType = 'native';

        if (bidRequest.mediaType === 'native') {
          if (serverBody.native) {
            var _assets = serverBody.native.assets;
            var _link = serverBody.native.link;
            var _trackers = [];

            if (serverBody.native.imptrackers) {
              _trackers = serverBody.native.imptrackers;
            }

            if (serverBody.nurl) {
              _trackers.push(serverBody.nurl);
            }

            var native = {};

            for (var _i = 0; _i < _assets.length; _i++) {
              var _asset = _assets[_i];

              switch (_asset['id']) {
                case 1:
                  native.title = _asset['title']['text'];
                  break;

                case 2:
                  native.icon = {
                    url: _asset['img']['url'],
                    width: _asset['img']['w'],
                    height: _asset['img']['h']
                  };
                  break;

                case 3:
                  native.body = _asset['data']['value'];
                  break;

                case 4:
                  native.image = {
                    url: _asset['img']['url'],
                    width: _asset['img']['w'],
                    height: _asset['img']['h']
                  };
                  break;

                case 10:
                  native.sponsoredBy = _asset['data']['value'];
                  break;
              }
            }

            native.cta = 'read more';

            if (serverBody.language) {
              native.cta = 'read more';
            }

            native.clickUrl = _link.url;
            native.impressionTrackers = _trackers;

            if (_link.clicktrackers) {
              native.clickTrackers = _link.clicktrackers;
            }

            native.eventtrackers = native.eventtrackers || [];
            bid.qtx_native = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepClone"](serverBody.native);
            bid.native = native;
          }
        }
      }

      bidResponses.push(bid);
    }

    return bidResponses;
  },

  /**
   * Register the user sync pixels which should be dropped after the auction.
   *
   * @param {SyncOptions} syncOptions Which user syncs are allowed?
   * @param {ServerResponse} serverResponse A successful response from the server
   * @return {UserSync[]} The user syncs which should be dropped.
   */
  getUserSyncs: function getUserSyncs(syncOptions, serverResponse) {
    var syncs = [];

    __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](serverResponse, function (serverResponse) {
      if (serverResponse.body && serverResponse.body.sync) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](serverResponse.body.sync, function (pixel) {
          syncs.push({
            type: 'image',
            url: pixel
          });
        });
      }
    });

    return syncs;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_2__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[504]);