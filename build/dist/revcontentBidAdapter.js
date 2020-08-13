pbjsChunk([123],{

/***/ 644:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(645);


/***/ }),

/***/ 645:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_utils_js__ = __webpack_require__(0);
// jshint esversion: 6, es3: false, node: true




var BIDDER_CODE = 'revcontent';
var NATIVE_PARAMS = {
  title: {
    id: 0,
    name: 'title'
  },
  image: {
    id: 3,
    type: 3,
    name: 'img'
  },
  sponsoredBy: {
    id: 5,
    name: 'data',
    type: 1
  }
};
var spec = {
  code: BIDDER_CODE,
  supportedMediaTypes: ['native'],
  isBidRequestValid: function isBidRequestValid(bid) {
    return typeof bid.params.apiKey !== 'undefined' && typeof bid.params.userId !== 'undefined' && bid.hasOwnProperty('nativeParams');
  },
  buildRequests: function buildRequests(validBidRequests, bidderRequest) {
    var userId = validBidRequests[0].params.userId;
    var widgetId = validBidRequests[0].params.widgetId;
    var apiKey = validBidRequests[0].params.apiKey;
    var domain = validBidRequests[0].params.domain;
    var host = validBidRequests[0].params.endpoint;

    if (typeof host === 'undefined') {
      host = 'trends.revcontent.com';
    }

    var serverRequests = [];
    var refererInfo;

    if (bidderRequest && bidderRequest.refererInfo) {
      refererInfo = bidderRequest.refererInfo.referer;
    }

    if (typeof domain === 'undefined') {
      domain = extractHostname(refererInfo);
    }

    var endpoint = 'https://' + host + '/rtb?apiKey=' + apiKey + '&userId=' + userId;

    if (!isNaN(widgetId) && widgetId > 0) {
      endpoint = endpoint + '&widgetId=' + widgetId;
    }

    var bidfloor = 0.1;

    if (!isNaN(validBidRequests[0].params.bidfloor) && validBidRequests[0].params.bidfloor > 0) {
      bidfloor = validBidRequests[0].params.bidfloor;
    }

    var imp = validBidRequests.map(function (bid, id) {
      if (bid.hasOwnProperty('nativeParams')) {
        var assets = __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["_map"](bid.nativeParams, function (bidParams, key) {
          var props = NATIVE_PARAMS[key];
          var asset = {
            required: bidParams.required & 1
          };

          if (props) {
            asset.id = props.id;
            var wmin, hmin, w, h;
            var aRatios = bidParams.aspect_ratios;

            if (aRatios && aRatios[0]) {
              aRatios = aRatios[0];
              wmin = aRatios.min_width || 0;
              hmin = aRatios.ratio_height * wmin / aRatios.ratio_width | 0;
            }

            asset[props.name] = {
              len: bidParams.len,
              type: props.type,
              wmin: wmin,
              hmin: hmin,
              w: w,
              h: h
            };
            return asset;
          }
        }).filter(Boolean);

        return {
          id: id + 1,
          tagid: bid.params.mid,
          bidderRequestId: bid.bidderRequestId,
          auctionId: bid.auctionId,
          transactionId: bid.transactionId,
          native: {
            request: {
              ver: '1.1',
              context: 2,
              contextsubtype: 21,
              plcmttype: 1,
              plcmtcnt: 1,
              assets: assets
            },
            ver: '1.1',
            battr: [1, 3, 8, 11, 17]
          },
          instl: 0,
          bidfloor: bidfloor,
          secure: '1'
        };
      }
    });
    var data = {
      id: bidderRequest.auctionId,
      imp: imp,
      site: {
        id: widgetId,
        domain: domain,
        page: refererInfo,
        cat: ['IAB17'],
        publisher: {
          id: userId,
          domain: domain
        }
      },
      device: {
        ua: navigator.userAgent,
        language: 'en'
      },
      user: {
        id: 1
      },
      at: 2,
      bcat: ['IAB24', 'IAB25', 'IAB25-1', 'IAB25-2', 'IAB25-3', 'IAB25-4', 'IAB25-5', 'IAB25-6', 'IAB25-7', 'IAB26', 'IAB26-1', 'IAB26-2', 'IAB26-3', 'IAB26-4']
    };
    serverRequests.push({
      method: 'POST',
      options: {
        contentType: 'application/json'
      },
      url: endpoint,
      data: JSON.stringify(data),
      bid: validBidRequests
    });
    return serverRequests;
  },
  interpretResponse: function interpretResponse(serverResponse, originalBidRequest) {
    if (!serverResponse.body) {
      return;
    }

    var seatbid = serverResponse.body.seatbid[0];
    var bidResponses = [];

    var _loop = function _loop() {
      var adm = JSON.parse(seatbid.bid[x]['adm']);
      var ad = {
        clickUrl: adm.link.url
      };
      adm.assets.forEach(function (asset) {
        switch (asset.id) {
          case 3:
            ad['image'] = {
              url: asset.img.url,
              height: 1,
              width: 1
            };
            break;

          case 0:
            ad['title'] = asset.title.text;
            break;

          case 5:
            ad['sponsoredBy'] = asset.data.value;
            break;
        }
      });
      size = originalBidRequest.bid[0].params.size;
      var bidResponse = {
        bidder: BIDDER_CODE,
        requestId: originalBidRequest.bid[0].bidId,
        cpm: seatbid.bid[x]['price'],
        creativeId: seatbid.bid[x]['adid'],
        currency: 'USD',
        netRevenue: true,
        ttl: 360,
        nurl: seatbid.bid[x]['nurl'],
        bidderCode: 'revcontent',
        mediaType: 'native',
        native: ad,
        width: size.width,
        height: size.height,
        ad: displayNative(ad, getTemplate(size, originalBidRequest.bid[0].params.template))
      };
      bidResponses.push(bidResponse);
    };

    for (var x in seatbid.bid) {
      var size;

      _loop();
    }

    return bidResponses;
  },
  onBidWon: function onBidWon(bid) {
    __WEBPACK_IMPORTED_MODULE_1__src_utils_js__["triggerPixel"](bid.nurl);
    return true;
  }
};
Object(__WEBPACK_IMPORTED_MODULE_0__src_adapters_bidderFactory_js__["registerBidder"])(spec);

function displayNative(ad, template) {
  template = template.replace(/{image}/g, ad['image']['url']);
  template = template.replace(/{title}/g, ad['title']);
  template = template.replace(/{clickUrl}/g, ad['clickUrl']);
  template = template.replace(/{sponsoredBy}/g, ad['sponsoredBy']);
  return template;
}

function getTemplate(size, customTemplate) {
  if (typeof customTemplate !== 'undefined' && customTemplate !== '') {
    return customTemplate;
  }

  if (size.width == 300 && size.height == 250) {
    return '<a href="{clickUrl}" rel="nofollow sponsored"  target="_blank" style="border: 1px solid #eee;    width: 298px;    height: 248px;    display: block;"><div style="background-image:url({image});width: 300px;height: 165px;background-repeat: none;background-size: cover;border-bottom:5px solid;border-color:#3f92f7"><div style="position: absolute;top: 160px;left:12px"><h1 style="max-height:45px;overflow:hidden;color: #000;font-family: Georgia;font-weight:normal;font-size: 19px; position: relative; width: 290px;margin-bottom:3px">{title}</h1> <div style="border:1px solid #3f92f7;background-color:#3f92f7;color:#fff;text-align:center;width:94%;height:17px;line-height: 20px;font-size:15px;padding:2px">SEE MORE</div></div></div></a>';
  }

  if (size.width == 728 && size.height == 90) {
    return '<a href="{clickUrl}" rel="nofollow sponsored"  target="_blank" style="    border: 1px solid #eee;    width: 726px;    height: 86px;    display: block;"><div style="border-right:5px solid #3f92f7;background-image:url({image});width: 130px;height: 88px;background-repeat: no-repeat;background-size: cover;"><div style="position: absolute;left:125px;"><h1 style="color: #000;width:80%;font-family: Georgia;font-weight:normal;font-size: 24px; position: relative; width: 100%%;margin-bottom:-5px;margin-left:20px;">{title}</h1> <div style="text-align:center;line-height: 39px;margin-top:-45px;height:40px;border-radius:50%;display:inline-block;border:1px solid #3f92f7;background-color:#3f92f7;width:7%;float:right;color:#fff;margin-right:20px;">&#x3e;</div></div></div></a>';
  }

  if (size.width == 300 && size.height == 600) {
    return '<a href="{clickUrl}" rel="nofollow sponsored"  target="_blank" style="    border: 1px solid #eee;    width: 296px;    height: 597px;    display: block;"><div style="border-bottom:5px solid #3f92f7;background-image:url({image});width: 298px;height: 230px;background-repeat: no-repeat;background-size: cover;"><div style="position: absolute;top:220px;"><h1 style="color: #000;font-family: Georgia;font-weight:normal;font-size: 45px; position: relative; width: 97%;margin-left:3px;height:270px;max-height:270px;overflow:hidden;">{title}</h1> <div style="text-align:center;line-height: 39px;height:40px;border-radius:50%;display:inline-block;border:1px solid #3f92f7;background-color:#3f92f7;width:15%;font-size:25px;color:#fff;margin-left:38%;margin-top:-15px">&#x3e;</div></div></div></a>';
  }

  return '';
}

function extractHostname(url) {
  if (typeof url == 'undefined' || url == null) {
    return '';
  }

  var hostname;

  if (url.indexOf('//') > -1) {
    hostname = url.split('/')[2];
  } else {
    hostname = url.split('/')[0];
  }

  hostname = hostname.split(':')[0];
  hostname = hostname.split('?')[0];
  return hostname;
}

/***/ })

},[644]);