pbjsChunk([75],{

/***/ 446:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(447);


/***/ }),

/***/ 447:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FASTLANE_ENDPOINT", function() { return FASTLANE_ENDPOINT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VIDEO_ENDPOINT", function() { return VIDEO_ENDPOINT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SYNC_ENDPOINT", function() { return SYNC_ENDPOINT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spec", function() { return spec; });
/* harmony export (immutable) */ __webpack_exports__["hasVideoMediaType"] = hasVideoMediaType;
/* harmony export (immutable) */ __webpack_exports__["masSizeOrdering"] = masSizeOrdering;
/* harmony export (immutable) */ __webpack_exports__["determineRubiconVideoSizeId"] = determineRubiconVideoSizeId;
/* harmony export (immutable) */ __webpack_exports__["getPriceGranularity"] = getPriceGranularity;
/* harmony export (immutable) */ __webpack_exports__["hasValidVideoParams"] = hasValidVideoParams;
/* harmony export (immutable) */ __webpack_exports__["hasValidSupplyChainParams"] = hasValidSupplyChainParams;
/* harmony export (immutable) */ __webpack_exports__["encodeParam"] = encodeParam;
/* harmony export (immutable) */ __webpack_exports__["resetUserSync"] = resetUserSync;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__ = __webpack_require__(2);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }





var DEFAULT_INTEGRATION = 'pbjs_lite'; // always use https, regardless of whether or not current page is secure

var FASTLANE_ENDPOINT = 'https://fastlane.rubiconproject.com/a/api/fastlane.json';
var VIDEO_ENDPOINT = 'https://prebid-server.rubiconproject.com/openrtb2/auction';
var SYNC_ENDPOINT = 'https://eus.rubiconproject.com/usync.html';
var DIGITRUST_PROP_NAMES = {
  FASTLANE: {
    id: 'dt.id',
    keyv: 'dt.keyv',
    pref: 'dt.pref'
  },
  PREBID_SERVER: {
    id: 'id',
    keyv: 'keyv'
  }
};
var sizeMap = {
  1: '468x60',
  2: '728x90',
  5: '120x90',
  8: '120x600',
  9: '160x600',
  10: '300x600',
  13: '200x200',
  14: '250x250',
  15: '300x250',
  16: '336x280',
  17: '240x400',
  19: '300x100',
  31: '980x120',
  32: '250x360',
  33: '180x500',
  35: '980x150',
  37: '468x400',
  38: '930x180',
  39: '750x100',
  40: '750x200',
  41: '750x300',
  42: '2x4',
  43: '320x50',
  44: '300x50',
  48: '300x300',
  53: '1024x768',
  54: '300x1050',
  55: '970x90',
  57: '970x250',
  58: '1000x90',
  59: '320x80',
  60: '320x150',
  61: '1000x1000',
  64: '580x500',
  65: '640x480',
  66: '930x600',
  67: '320x480',
  68: '1800x1000',
  72: '320x320',
  73: '320x160',
  78: '980x240',
  79: '980x300',
  80: '980x400',
  83: '480x300',
  94: '970x310',
  96: '970x210',
  101: '480x320',
  102: '768x1024',
  103: '480x280',
  105: '250x800',
  108: '320x240',
  113: '1000x300',
  117: '320x100',
  125: '800x250',
  126: '200x600',
  144: '980x600',
  145: '980x150',
  152: '1000x250',
  156: '640x320',
  159: '320x250',
  179: '250x600',
  195: '600x300',
  198: '640x360',
  199: '640x200',
  213: '1030x590',
  214: '980x360',
  221: '1x1',
  229: '320x180',
  232: '580x400',
  234: '6x6',
  251: '2x2',
  257: '400x600',
  264: '970x1000',
  265: '1920x1080',
  278: '320x500',
  288: '640x380'
};

__WEBPACK_IMPORTED_MODULE_0__src_utils__["_each"](sizeMap, function (item, key) {
  return sizeMap[item] = key;
});

var spec = {
  code: 'rubicon',
  supportedMediaTypes: [__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["b" /* BANNER */], __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["d" /* VIDEO */]],

  /**
   * @param {object} bid
   * @return boolean
   */
  isBidRequestValid: function isBidRequestValid(bid) {
    if (_typeof(bid.params) !== 'object') {
      return false;
    } // validate account, site, zone have numeric values


    for (var i = 0, props = ['accountId', 'siteId', 'zoneId']; i < props.length; i++) {
      bid.params[props[i]] = parseInt(bid.params[props[i]]);

      if (isNaN(bid.params[props[i]])) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('Rubicon: wrong format of accountId or siteId or zoneId.');
        return false;
      }
    }

    var bidFormat = bidType(bid, true); // bidType is undefined? Return false

    if (!bidFormat) {
      return false;
    } else if (bidFormat === 'video') {
      // bidType is video, make sure it has required params
      return hasValidVideoParams(bid);
    } // bidType is banner? return true


    return true;
  },

  /**
   * @param {BidRequest[]} bidRequests
   * @param bidderRequest
   * @return BidRequest[]
   */
  buildRequests: function buildRequests(bidRequests, bidderRequest) {
    // separate video bids because the requests are structured differently
    var requests = [];
    var videoRequests = bidRequests.filter(function (bidRequest) {
      return bidType(bidRequest) === 'video';
    }).map(function (bidRequest) {
      bidRequest.startTime = new Date().getTime();
      var data = {
        id: bidRequest.transactionId,
        test: __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('debug') ? 1 : 0,
        cur: ['USD'],
        source: {
          tid: bidRequest.transactionId
        },
        tmax: __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('TTL') || 1000,
        imp: [{
          exp: 300,
          id: bidRequest.adUnitCode,
          secure: 1,
          ext: _defineProperty({}, bidRequest.bidder, bidRequest.params),
          video: __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest, 'mediaTypes.video') || {}
        }],
        ext: {
          prebid: {
            cache: {
              vastxml: {
                returnCreative: false // don't return the VAST

              }
            },
            targeting: {
              includewinners: true,
              // includebidderkeys always false for openrtb
              includebidderkeys: false,
              pricegranularity: getPriceGranularity(__WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */])
            }
          }
        }
      }; // Add alias if it is there

      if (bidRequest.bidder !== 'rubicon') {
        data.ext.prebid.aliases = _defineProperty({}, bidRequest.bidder, 'rubicon');
      }

      var bidFloor = parseFloat(__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest, 'params.floor'));

      if (!isNaN(bidFloor)) {
        data.imp[0].bidfloor = bidFloor;
      } // if value is set, will overwrite with same value


      data.imp[0].ext[bidRequest.bidder].video.size_id = determineRubiconVideoSizeId(bidRequest);
      appendSiteAppDevice(data, bidRequest, bidderRequest);
      addVideoParameters(data, bidRequest);

      var digiTrust = _getDigiTrustQueryParams(bidRequest, 'PREBID_SERVER');

      if (digiTrust) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepSetValue"](data, 'user.ext.digitrust', digiTrust);
      }

      if (bidderRequest.gdprConsent) {
        // note - gdprApplies & consentString may be undefined in certain use-cases for consentManagement module
        var gdprApplies;

        if (typeof bidderRequest.gdprConsent.gdprApplies === 'boolean') {
          gdprApplies = bidderRequest.gdprConsent.gdprApplies ? 1 : 0;
        }

        __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepSetValue"](data, 'regs.ext.gdpr', gdprApplies);
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepSetValue"](data, 'user.ext.consent', bidderRequest.gdprConsent.consentString);
      }

      if (bidderRequest.uspConsent) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepSetValue"](data, 'regs.ext.us_privacy', bidderRequest.uspConsent);
      }

      if (bidRequest.userId && _typeof(bidRequest.userId) === 'object' && (bidRequest.userId.tdid || bidRequest.userId.pubcid || bidRequest.userId.lipb)) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepSetValue"](data, 'user.ext.eids', []);

        if (bidRequest.userId.tdid) {
          data.user.ext.eids.push({
            source: 'adserver.org',
            uids: [{
              id: bidRequest.userId.tdid,
              ext: {
                rtiPartner: 'TDID'
              }
            }]
          });
        }

        if (bidRequest.userId.pubcid) {
          data.user.ext.eids.push({
            source: 'pubcommon',
            uids: [{
              id: bidRequest.userId.pubcid
            }]
          });
        } // support liveintent ID


        if (bidRequest.userId.lipb && bidRequest.userId.lipb.lipbid) {
          data.user.ext.eids.push({
            source: 'liveintent.com',
            uids: [{
              id: bidRequest.userId.lipb.lipbid
            }]
          });
          data.user.ext.tpid = {
            source: 'liveintent.com',
            uid: bidRequest.userId.lipb.lipbid
          };

          if (Array.isArray(bidRequest.userId.lipb.segments) && bidRequest.userId.lipb.segments.length) {
            __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepSetValue"](data, 'rp.target.LIseg', bidRequest.userId.lipb.segments);
          }
        }
      }

      if (__WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('coppa') === true) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepSetValue"](data, 'regs.coppa', 1);
      }

      if (bidRequest.schain && hasValidSupplyChainParams(bidRequest.schain)) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepSetValue"](data, 'source.ext.schain', bidRequest.schain);
      }

      return {
        method: 'POST',
        url: VIDEO_ENDPOINT,
        data: data,
        bidRequest: bidRequest
      };
    });

    if (__WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('rubicon.singleRequest') !== true) {
      // bids are not grouped if single request mode is not enabled
      requests = videoRequests.concat(bidRequests.filter(function (bidRequest) {
        return bidType(bidRequest) === 'banner';
      }).map(function (bidRequest) {
        var bidParams = spec.createSlotParams(bidRequest, bidderRequest);
        return {
          method: 'GET',
          url: FASTLANE_ENDPOINT,
          data: spec.getOrderedParams(bidParams).reduce(function (paramString, key) {
            var propValue = bidParams[key];
            return __WEBPACK_IMPORTED_MODULE_0__src_utils__["isStr"](propValue) && propValue !== '' || __WEBPACK_IMPORTED_MODULE_0__src_utils__["isNumber"](propValue) ? "".concat(paramString).concat(encodeParam(key, propValue), "&") : paramString;
          }, '') + "slots=1&rand=".concat(Math.random()),
          bidRequest: bidRequest
        };
      }));
    } else {
      // single request requires bids to be grouped by site id into a single request
      // note: utils.groupBy wasn't used because deep property access was needed
      var nonVideoRequests = bidRequests.filter(function (bidRequest) {
        return bidType(bidRequest) === 'banner';
      });
      var groupedBidRequests = nonVideoRequests.reduce(function (groupedBids, bid) {
        (groupedBids[bid.params['siteId']] = groupedBids[bid.params['siteId']] || []).push(bid);
        return groupedBids;
      }, {}); // fastlane SRA has a limit of 10 slots

      var SRA_BID_LIMIT = 10; // multiple requests are used if bids groups have more than 10 bids

      requests = videoRequests.concat(Object.keys(groupedBidRequests).reduce(function (aggregate, bidGroupKey) {
        // for each partioned bidGroup, append a bidRequest to requests list
        partitionArray(groupedBidRequests[bidGroupKey], SRA_BID_LIMIT).forEach(function (bidsInGroup) {
          var combinedSlotParams = spec.combineSlotUrlParams(bidsInGroup.map(function (bidRequest) {
            return spec.createSlotParams(bidRequest, bidderRequest);
          })); // SRA request returns grouped bidRequest arrays not a plain bidRequest

          aggregate.push({
            method: 'GET',
            url: FASTLANE_ENDPOINT,
            data: spec.getOrderedParams(combinedSlotParams).reduce(function (paramString, key) {
              var propValue = combinedSlotParams[key];
              return __WEBPACK_IMPORTED_MODULE_0__src_utils__["isStr"](propValue) && propValue !== '' || __WEBPACK_IMPORTED_MODULE_0__src_utils__["isNumber"](propValue) ? "".concat(paramString).concat(encodeParam(key, propValue), "&") : paramString;
            }, '') + "slots=".concat(bidsInGroup.length, "&rand=").concat(Math.random()),
            bidRequest: bidsInGroup
          });
        });
        return aggregate;
      }, []));
    }

    return requests;
  },
  getOrderedParams: function getOrderedParams(params) {
    var containsTgV = /^tg_v/;
    var containsTgI = /^tg_i/;
    var orderedParams = ['account_id', 'site_id', 'zone_id', 'size_id', 'alt_size_ids', 'p_pos', 'gdpr', 'gdpr_consent', 'us_privacy', 'rp_schain', 'tpid_tdid', 'tpid_liveintent.com', 'tg_v.LIseg', 'dt.id', 'dt.keyv', 'dt.pref', 'rf', 'p_geo.latitude', 'p_geo.longitude', 'kw'].concat(Object.keys(params).filter(function (item) {
      return containsTgV.test(item);
    })).concat(Object.keys(params).filter(function (item) {
      return containsTgI.test(item);
    })).concat(['tk_flint', 'x_source.tid', 'x_source.pchain', 'p_screen_res', 'rp_floor', 'rp_secure', 'tk_user_key']);
    return orderedParams.concat(Object.keys(params).filter(function (item) {
      return orderedParams.indexOf(item) === -1;
    }));
  },

  /**
   * @summary combines param values from an array of slots into a single semicolon delineated value
   * or just one value if they are all the same.
   * @param {Object[]} aSlotUrlParams - example [{p1: 'foo', p2: 'test'}, {p2: 'test'}, {p1: 'bar', p2: 'test'}]
   * @return {Object} - example {p1: 'foo;;bar', p2: 'test'}
   */
  combineSlotUrlParams: function combineSlotUrlParams(aSlotUrlParams) {
    // if only have params for one slot, return those params
    if (aSlotUrlParams.length === 1) {
      return aSlotUrlParams[0];
    } // reduce param values from all slot objects into an array of values in a single object


    var oCombinedSlotUrlParams = aSlotUrlParams.reduce(function (oCombinedParams, oSlotUrlParams, iIndex) {
      Object.keys(oSlotUrlParams).forEach(function (param) {
        if (!oCombinedParams.hasOwnProperty(param)) {
          oCombinedParams[param] = new Array(aSlotUrlParams.length); // initialize array;
        } // insert into the proper element of the array


        oCombinedParams[param].splice(iIndex, 1, oSlotUrlParams[param]);
      });
      return oCombinedParams;
    }, {}); // convert arrays into semicolon delimited strings

    var re = new RegExp('^([^;]*)(;\\1)+$'); // regex to test for duplication

    Object.keys(oCombinedSlotUrlParams).forEach(function (param) {
      var sValues = oCombinedSlotUrlParams[param].join(';'); // consolidate param values into one value if they are all the same

      var match = sValues.match(re);
      oCombinedSlotUrlParams[param] = match ? match[1] : sValues;
    });
    return oCombinedSlotUrlParams;
  },

  /**
   * @param {BidRequest} bidRequest
   * @param {Object} bidderRequest
   * @returns {Object} - object key values named and formatted as slot params
   */
  createSlotParams: function createSlotParams(bidRequest, bidderRequest) {
    bidRequest.startTime = new Date().getTime();
    var params = bidRequest.params; // use rubicon sizes if provided, otherwise adUnit.sizes

    var parsedSizes = parseSizes(bidRequest, 'banner');

    var _ref = params.latLong || [],
        _ref2 = _slicedToArray(_ref, 2),
        latitude = _ref2[0],
        longitude = _ref2[1];

    var configIntType = __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('rubicon.int_type');
    var data = {
      'account_id': params.accountId,
      'site_id': params.siteId,
      'zone_id': params.zoneId,
      'size_id': parsedSizes[0],
      'alt_size_ids': parsedSizes.slice(1).join(',') || undefined,
      'rp_floor': (params.floor = parseFloat(params.floor)) > 0.01 ? params.floor : 0.01,
      'rp_secure': '1',
      'tk_flint': "".concat(configIntType || DEFAULT_INTEGRATION, "_v3.0.0"),
      'x_source.tid': bidRequest.transactionId,
      'x_source.pchain': params.pchain,
      'p_screen_res': _getScreenResolution(),
      'kw': Array.isArray(params.keywords) ? params.keywords.join(',') : '',
      'tk_user_key': params.userId,
      'p_geo.latitude': isNaN(parseFloat(latitude)) ? undefined : parseFloat(latitude).toFixed(4),
      'p_geo.longitude': isNaN(parseFloat(longitude)) ? undefined : parseFloat(longitude).toFixed(4),
      'tg_fl.eid': bidRequest.code,
      'rf': _getPageUrl(bidRequest, bidderRequest)
    }; // add p_pos only if specified and valid
    // For SRA we need to explicitly put empty semi colons so AE treats it as empty, instead of copying the latter value

    data['p_pos'] = params.position === 'atf' || params.position === 'btf' ? params.position : '';

    if (bidRequest.userId) {
      if (bidRequest.userId.tdid) {
        data['tpid_tdid'] = bidRequest.userId.tdid;
      } // support liveintent ID


      if (bidRequest.userId.lipb && bidRequest.userId.lipb.lipbid) {
        data['tpid_liveintent.com'] = bidRequest.userId.lipb.lipbid;

        if (Array.isArray(bidRequest.userId.lipb.segments) && bidRequest.userId.lipb.segments.length) {
          data['tg_v.LIseg'] = bidRequest.userId.lipb.segments.join(',');
        }
      }
    }

    if (bidderRequest.gdprConsent) {
      // add 'gdpr' only if 'gdprApplies' is defined
      if (typeof bidderRequest.gdprConsent.gdprApplies === 'boolean') {
        data['gdpr'] = Number(bidderRequest.gdprConsent.gdprApplies);
      }

      data['gdpr_consent'] = bidderRequest.gdprConsent.consentString;
    }

    if (bidderRequest.uspConsent) {
      data['us_privacy'] = encodeURIComponent(bidderRequest.uspConsent);
    } // visitor properties


    if (params.visitor !== null && _typeof(params.visitor) === 'object') {
      Object.keys(params.visitor).forEach(function (key) {
        if (params.visitor[key] != null) {
          data["tg_v.".concat(key)] = params.visitor[key].toString(); // initialize array;
        }
      });
    } // inventory properties


    if (params.inventory !== null && _typeof(params.inventory) === 'object') {
      Object.keys(params.inventory).forEach(function (key) {
        if (params.inventory[key] != null) {
          data["tg_i.".concat(key)] = params.inventory[key].toString();
        }
      });
    } // digitrust properties


    var digitrustParams = _getDigiTrustQueryParams(bidRequest, 'FASTLANE');

    _extends(data, digitrustParams);

    if (__WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('coppa') === true) {
      data['coppa'] = 1;
    } // if SupplyChain is supplied and contains all required fields


    if (bidRequest.schain && hasValidSupplyChainParams(bidRequest.schain)) {
      data.rp_schain = spec.serializeSupplyChain(bidRequest.schain);
    }

    return data;
  },

  /**
   * Serializes schain params according to OpenRTB requirements
   * @param {Object} supplyChain
   * @returns {String}
   */
  serializeSupplyChain: function serializeSupplyChain(supplyChain) {
    var supplyChainIsValid = hasValidSupplyChainParams(supplyChain);
    if (!supplyChainIsValid) return '';
    var ver = supplyChain.ver,
        complete = supplyChain.complete,
        nodes = supplyChain.nodes;
    return "".concat(ver, ",").concat(complete, "!").concat(spec.serializeSupplyChainNodes(nodes));
  },

  /**
   * Properly sorts schain object params
   * @param {Array} nodes
   * @returns {String}
   */
  serializeSupplyChainNodes: function serializeSupplyChainNodes(nodes) {
    var nodePropOrder = ['asi', 'sid', 'hp', 'rid', 'name', 'domain'];
    return nodes.map(function (node) {
      return nodePropOrder.map(function (prop) {
        return encodeURIComponent(node[prop] || '');
      }).join(',');
    }).join('!');
  },

  /**
   * @param {*} responseObj
   * @param {BidRequest|Object.<string, BidRequest[]>} bidRequest - if request was SRA the bidRequest argument will be a keyed BidRequest array object,
   * non-SRA responses return a plain BidRequest object
   * @return {Bid[]} An array of bids which
   */
  interpretResponse: function interpretResponse(responseObj, _ref3) {
    var bidRequest = _ref3.bidRequest;
    responseObj = responseObj.body; // check overall response

    if (!responseObj || _typeof(responseObj) !== 'object') {
      return [];
    } // video response from PBS Java openRTB


    if (responseObj.seatbid) {
      var responseErrors = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](responseObj, 'ext.errors.rubicon');

      if (Array.isArray(responseErrors) && responseErrors.length > 0) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]('Rubicon: Error in video response');
      }

      var bids = [];
      responseObj.seatbid.forEach(function (seatbid) {
        (seatbid.bid || []).forEach(function (bid) {
          var bidObject = {
            requestId: bidRequest.bidId,
            currency: responseObj.cur || 'USD',
            creativeId: bid.crid,
            cpm: bid.price || 0,
            bidderCode: seatbid.seat,
            ttl: 300,
            netRevenue: __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('rubicon.netRevenue') !== false,
            // If anything other than false, netRev is true
            width: bid.w || __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest, 'mediaTypes.video.w') || __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest, 'params.video.playerWidth'),
            height: bid.h || __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest, 'mediaTypes.video.h') || __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest, 'params.video.playerHeight')
          };

          if (bid.id) {
            bidObject.seatBidId = bid.id;
          }

          if (bid.dealid) {
            bidObject.dealId = bid.dealid;
          }

          var serverResponseTimeMs = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](responseObj, 'ext.responsetimemillis.rubicon');

          if (bidRequest && serverResponseTimeMs) {
            bidRequest.serverResponseTimeMs = serverResponseTimeMs;
          }

          if (__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'ext.prebid.type') === __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["d" /* VIDEO */]) {
            bidObject.mediaType = __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["d" /* VIDEO */];
            var extPrebidTargeting = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'ext.prebid.targeting'); // If ext.prebid.targeting exists, add it as a property value named 'adserverTargeting'

            if (extPrebidTargeting && _typeof(extPrebidTargeting) === 'object') {
              bidObject.adserverTargeting = extPrebidTargeting;
            } // try to get cache values from 'response.ext.prebid.cache'
            // else try 'bid.ext.prebid.targeting' as fallback


            if (bid.ext.prebid.cache && _typeof(bid.ext.prebid.cache.vastXml) === 'object' && bid.ext.prebid.cache.vastXml.cacheId && bid.ext.prebid.cache.vastXml.url) {
              bidObject.videoCacheKey = bid.ext.prebid.cache.vastXml.cacheId;
              bidObject.vastUrl = bid.ext.prebid.cache.vastXml.url;
            } else if (extPrebidTargeting && extPrebidTargeting.hb_uuid && extPrebidTargeting.hb_cache_host && extPrebidTargeting.hb_cache_path) {
              bidObject.videoCacheKey = extPrebidTargeting.hb_uuid; // build url using key and cache host

              bidObject.vastUrl = "https://".concat(extPrebidTargeting.hb_cache_host).concat(extPrebidTargeting.hb_cache_path, "?uuid=").concat(extPrebidTargeting.hb_uuid);
            }

            if (bid.adm) {
              bidObject.vastXml = bid.adm;
            }

            if (bid.nurl) {
              bidObject.vastUrl = bid.nurl;
            }

            if (!bidObject.vastUrl && bid.nurl) {
              bidObject.vastUrl = bid.nurl;
            }
          } else {
            __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]('Rubicon: video response received non-video media type');
          }

          bids.push(bidObject);
        });
      });
      return bids;
    }

    var ads = responseObj.ads; // video ads array is wrapped in an object

    if (_typeof(bidRequest) === 'object' && !Array.isArray(bidRequest) && bidType(bidRequest) === 'video' && _typeof(ads) === 'object') {
      ads = ads[bidRequest.adUnitCode];
    } // check the ad response


    if (!Array.isArray(ads) || ads.length < 1) {
      return [];
    }

    return ads.reduce(function (bids, ad, i) {
      if (ad.status !== 'ok') {
        return bids;
      } // associate bidRequests; assuming ads matches bidRequest


      var associatedBidRequest = Array.isArray(bidRequest) ? bidRequest[i] : bidRequest;

      if (associatedBidRequest && _typeof(associatedBidRequest) === 'object') {
        var bid = {
          requestId: associatedBidRequest.bidId,
          currency: 'USD',
          creativeId: ad.creative_id || "".concat(ad.network || '', "-").concat(ad.advertiser || ''),
          cpm: ad.cpm || 0,
          dealId: ad.deal,
          ttl: 300,
          // 5 minutes
          netRevenue: __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('rubicon.netRevenue') !== false,
          // If anything other than false, netRev is true
          rubicon: {
            advertiserId: ad.advertiser,
            networkId: ad.network
          },
          meta: {
            advertiserId: ad.advertiser,
            networkId: ad.network
          }
        };

        if (ad.creative_type) {
          bid.mediaType = ad.creative_type;
        }

        if (ad.creative_type === __WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["d" /* VIDEO */]) {
          bid.width = associatedBidRequest.params.video.playerWidth;
          bid.height = associatedBidRequest.params.video.playerHeight;
          bid.vastUrl = ad.creative_depot_url;
          bid.impression_id = ad.impression_id;
          bid.videoCacheKey = ad.impression_id;
        } else {
          bid.ad = _renderCreative(ad.script, ad.impression_id);

          var _sizeMap$ad$size_id$s = sizeMap[ad.size_id].split('x').map(function (num) {
            return Number(num);
          });

          var _sizeMap$ad$size_id$s2 = _slicedToArray(_sizeMap$ad$size_id$s, 2);

          bid.width = _sizeMap$ad$size_id$s2[0];
          bid.height = _sizeMap$ad$size_id$s2[1];
        } // add server-side targeting


        bid.rubiconTargeting = (Array.isArray(ad.targeting) ? ad.targeting : []).reduce(function (memo, item) {
          memo[item.key] = item.values[0];
          return memo;
        }, {
          'rpfl_elemid': associatedBidRequest.adUnitCode
        });
        bids.push(bid);
      } else {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]("Rubicon: bidRequest undefined at index position:".concat(i), bidRequest, responseObj);
      }

      return bids;
    }, []).sort(function (adA, adB) {
      return (adB.cpm || 0.0) - (adA.cpm || 0.0);
    });
  },
  getUserSyncs: function getUserSyncs(syncOptions, responses, gdprConsent, uspConsent) {
    if (!hasSynced && syncOptions.iframeEnabled) {
      // data is only assigned if params are available to pass to SYNC_ENDPOINT
      var params = '';

      if (gdprConsent && typeof gdprConsent.consentString === 'string') {
        // add 'gdpr' only if 'gdprApplies' is defined
        if (typeof gdprConsent.gdprApplies === 'boolean') {
          params += "?gdpr=".concat(Number(gdprConsent.gdprApplies), "&gdpr_consent=").concat(gdprConsent.consentString);
        } else {
          params += "?gdpr_consent=".concat(gdprConsent.consentString);
        }
      }

      if (uspConsent) {
        params += "".concat(params ? '&' : '?', "us_privacy=").concat(encodeURIComponent(uspConsent));
      }

      hasSynced = true;
      return {
        type: 'iframe',
        url: SYNC_ENDPOINT + params
      };
    }
  },

  /**
   * Covert bid param types for S2S
   * @param {Object} params bid params
   * @param {Boolean} isOpenRtb boolean to check openrtb2 protocol
   * @return {Object} params bid params
   */
  transformBidParams: function transformBidParams(params, isOpenRtb) {
    return __WEBPACK_IMPORTED_MODULE_0__src_utils__["convertTypes"]({
      'accountId': 'number',
      'siteId': 'number',
      'zoneId': 'number'
    }, params);
  }
};

function _getScreenResolution() {
  return [window.screen.width, window.screen.height].join('x');
}

function _getDigiTrustQueryParams() {
  var _digiTrustQueryParams;

  var bidRequest = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var endpointName = arguments.length > 1 ? arguments[1] : undefined;

  if (!endpointName || !DIGITRUST_PROP_NAMES[endpointName]) {
    return null;
  }

  var propNames = DIGITRUST_PROP_NAMES[endpointName];

  function getDigiTrustId() {
    var bidRequestDigitrust = __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest, 'userId.digitrustid.data');

    if (bidRequestDigitrust) {
      return bidRequestDigitrust;
    }

    var digiTrustUser = window.DigiTrust && (__WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('digiTrustId') || window.DigiTrust.getUser({
      member: 'T9QSFKPDN9'
    }));
    return digiTrustUser && digiTrustUser.success && digiTrustUser.identity || null;
  }

  var digiTrustId = getDigiTrustId(); // Verify there is an ID and this user has not opted out

  if (!digiTrustId || digiTrustId.privacy && digiTrustId.privacy.optout) {
    return null;
  }

  var digiTrustQueryParams = (_digiTrustQueryParams = {}, _defineProperty(_digiTrustQueryParams, propNames.id, digiTrustId.id), _defineProperty(_digiTrustQueryParams, propNames.keyv, digiTrustId.keyv), _digiTrustQueryParams);

  if (propNames.pref) {
    digiTrustQueryParams[propNames.pref] = 0;
  }

  return digiTrustQueryParams;
}
/**
 * @param {BidRequest} bidRequest
 * @param bidderRequest
 * @returns {string}
 */


function _getPageUrl(bidRequest, bidderRequest) {
  var pageUrl = __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('pageUrl');

  if (bidRequest.params.referrer) {
    pageUrl = bidRequest.params.referrer;
  } else if (!pageUrl) {
    pageUrl = bidderRequest.refererInfo.referer;
  }

  return bidRequest.params.secure ? pageUrl.replace(/^http:/i, 'https:') : pageUrl;
}

function _renderCreative(script, impId) {
  return "<html>\n<head><script type='text/javascript'>inDapIF=true;</script></head>\n<body style='margin : 0; padding: 0;'>\n<!-- Rubicon Project Ad Tag -->\n<div data-rp-impression-id='".concat(impId, "'>\n<script type='text/javascript'>").concat(script, "</script>\n</div>\n</body>\n</html>");
}

function parseSizes(bid, mediaType) {
  var params = bid.params;

  if (mediaType === 'video') {
    var size = [];

    if (params.video && params.video.playerWidth && params.video.playerHeight) {
      size = [params.video.playerWidth, params.video.playerHeight];
    } else if (Array.isArray(__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.video.playerSize')) && bid.mediaTypes.video.playerSize.length === 1) {
      size = bid.mediaTypes.video.playerSize[0];
    } else if (Array.isArray(bid.sizes) && bid.sizes.length > 0 && Array.isArray(bid.sizes[0]) && bid.sizes[0].length > 1) {
      size = bid.sizes[0];
    }

    return size;
  } // deprecated: temp legacy support


  var sizes = [];

  if (Array.isArray(params.sizes)) {
    sizes = params.sizes;
  } else if (typeof __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.banner.sizes') !== 'undefined') {
    sizes = mapSizes(bid.mediaTypes.banner.sizes);
  } else if (Array.isArray(bid.sizes) && bid.sizes.length > 0) {
    sizes = mapSizes(bid.sizes);
  } else {
    __WEBPACK_IMPORTED_MODULE_0__src_utils__["logWarn"]('Rubicon: no sizes are setup or found');
  }

  return masSizeOrdering(sizes);
}
/**
 * @param {Object} data
 * @param bidRequest
 * @param bidderRequest
 */


function appendSiteAppDevice(data, bidRequest, bidderRequest) {
  if (!data) return; // ORTB specifies app OR site

  if (_typeof(__WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('app')) === 'object') {
    data.app = __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('app');
  } else {
    data.site = {
      page: _getPageUrl(bidRequest, bidderRequest)
    };
  }

  if (_typeof(__WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('device')) === 'object') {
    data.device = __WEBPACK_IMPORTED_MODULE_2__src_config__["b" /* config */].getConfig('device');
  } // Add language to site and device objects if there


  if (bidRequest.params.video.language) {
    ['site', 'device'].forEach(function (param) {
      if (data[param]) {
        data[param].content = _extends({
          language: bidRequest.params.video.language
        }, data[param].content);
      }
    });
  }
}
/**
 * @param {Object} data
 * @param {BidRequest} bidRequest
 */


function addVideoParameters(data, bidRequest) {
  if (_typeof(data.imp[0].video) === 'object' && data.imp[0].video.skip === undefined) {
    data.imp[0].video.skip = bidRequest.params.video.skip;
  }

  if (_typeof(data.imp[0].video) === 'object' && data.imp[0].video.skipafter === undefined) {
    data.imp[0].video.skipafter = bidRequest.params.video.skipdelay;
  } // video.pos can already be specified by adunit.mediatypes.video.pos.
  // but if not, it might be specified in the params


  if (_typeof(data.imp[0].video) === 'object' && data.imp[0].video.pos === undefined) {
    if (bidRequest.params.position === 'atf') {
      data.imp[0].video.pos = 1;
    } else if (bidRequest.params.position === 'btf') {
      data.imp[0].video.pos = 3;
    }
  }

  var size = parseSizes(bidRequest, 'video');
  data.imp[0].video.w = size[0];
  data.imp[0].video.h = size[1];
}
/**
 * @param sizes
 * @returns {*}
 */


function mapSizes(sizes) {
  return __WEBPACK_IMPORTED_MODULE_0__src_utils__["parseSizesInput"](sizes) // map sizes while excluding non-matches
  .reduce(function (result, size) {
    var mappedSize = parseInt(sizeMap[size], 10);

    if (mappedSize) {
      result.push(mappedSize);
    }

    return result;
  }, []);
}
/**
 * Test if bid has mediaType or mediaTypes set for video.
 * Also makes sure the video object is present in the rubicon bidder params
 * @param {BidRequest} bidRequest
 * @returns {boolean}
 */


function hasVideoMediaType(bidRequest) {
  if (_typeof(__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest, 'params.video')) !== 'object') {
    return false;
  }

  return typeof __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bidRequest, "mediaTypes.".concat(__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["d" /* VIDEO */])) !== 'undefined';
}
/**
 * Determine bidRequest mediaType
 * @param bid the bid to test
 * @param log whether we should log errors/warnings for invalid bids
 * @returns {string|undefined} Returns 'video' or 'banner' if resolves to a type, or undefined otherwise (invalid).
 */

function bidType(bid) {
  var log = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  // Is it considered video ad unit by rubicon
  if (hasVideoMediaType(bid)) {
    // Removed legacy mediaType support. new way using mediaTypes.video object is now required
    // We require either context as instream or outstream
    if (['outstream', 'instream'].indexOf(__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, "mediaTypes.".concat(__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["d" /* VIDEO */], ".context"))) === -1) {
      if (log) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('Rubicon: mediaTypes.video.context must be outstream or instream');
      }

      return;
    } // we require playerWidth and playerHeight to come from one of params.playerWidth/playerHeight or mediaTypes.video.playerSize or adUnit.sizes


    if (parseSizes(bid, 'video').length < 2) {
      if (log) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('Rubicon: could not determine the playerSize of the video');
      }

      return;
    }

    if (log) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logMessage"]('Rubicon: making video request for adUnit', bid.adUnitCode);
    }

    return 'video';
  } else {
    // we require banner sizes to come from one of params.sizes or mediaTypes.banner.sizes or adUnit.sizes, in that order
    // if we cannot determine them, we reject it!
    if (parseSizes(bid, 'banner').length === 0) {
      if (log) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('Rubicon: could not determine the sizes for banner request');
      }

      return;
    } // everything looks good for banner so lets do it


    if (log) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logMessage"]('Rubicon: making banner request for adUnit', bid.adUnitCode);
    }

    return 'banner';
  }
}

function masSizeOrdering(sizes) {
  var MAS_SIZE_PRIORITY = [15, 2, 9];
  return sizes.sort(function (first, second) {
    // sort by MAS_SIZE_PRIORITY priority order
    var firstPriority = MAS_SIZE_PRIORITY.indexOf(first);
    var secondPriority = MAS_SIZE_PRIORITY.indexOf(second);

    if (firstPriority > -1 || secondPriority > -1) {
      if (firstPriority === -1) {
        return 1;
      }

      if (secondPriority === -1) {
        return -1;
      }

      return firstPriority - secondPriority;
    } // and finally ascending order


    return first - second;
  });
}
function determineRubiconVideoSizeId(bid) {
  // If we have size_id in the bid then use it
  var rubiconSizeId = parseInt(__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'params.video.size_id'));

  if (!isNaN(rubiconSizeId)) {
    return rubiconSizeId;
  } // otherwise 203 for outstream and 201 for instream
  // When this function is used we know it has to be one of outstream or instream


  return __WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, "mediaTypes.".concat(__WEBPACK_IMPORTED_MODULE_3__src_mediaTypes__["d" /* VIDEO */], ".context")) === 'outstream' ? 203 : 201;
}
/**
 * @param {PrebidConfig} config
 * @returns {{ranges: {ranges: Object[]}}}
 */

function getPriceGranularity(config) {
  return {
    ranges: {
      low: [{
        max: 5.00,
        increment: 0.50
      }],
      medium: [{
        max: 20.00,
        increment: 0.10
      }],
      high: [{
        max: 20.00,
        increment: 0.01
      }],
      auto: [{
        max: 5.00,
        increment: 0.05
      }, {
        min: 5.00,
        max: 10.00,
        increment: 0.10
      }, {
        min: 10.00,
        max: 20.00,
        increment: 0.50
      }],
      dense: [{
        max: 3.00,
        increment: 0.01
      }, {
        min: 3.00,
        max: 8.00,
        increment: 0.05
      }, {
        min: 8.00,
        max: 20.00,
        increment: 0.50
      }],
      custom: config.getConfig('customPriceBucket') && config.getConfig('customPriceBucket').buckets
    }[config.getConfig('priceGranularity')]
  };
} // Function to validate the required video params

function hasValidVideoParams(bid) {
  var isValid = true; // incase future javascript changes the string represenation of the array or number classes!

  var arrayType = Object.prototype.toString.call([]);
  var numberType = Object.prototype.toString.call(0); // required params and their associated object type

  var requiredParams = {
    mimes: arrayType,
    protocols: arrayType,
    maxduration: numberType,
    linearity: numberType,
    api: arrayType
  }; // loop through each param and verify it has the correct

  Object.keys(requiredParams).forEach(function (param) {
    if (Object.prototype.toString.call(__WEBPACK_IMPORTED_MODULE_0__src_utils__["deepAccess"](bid, 'mediaTypes.video.' + param)) !== requiredParams[param]) {
      isValid = false;
      __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('Rubicon: mediaTypes.video.' + param + ' is required and must be of type: ' + requiredParams[param]);
    }
  });
  return isValid;
}
/**
 * Make sure the required params are present
 * @param {Object} schain
 * @param {Bool}
 */

function hasValidSupplyChainParams(schain) {
  var isValid = false;
  var requiredFields = ['asi', 'sid', 'hp'];
  if (!schain.nodes) return isValid;
  isValid = schain.nodes.reduce(function (status, node) {
    if (!status) return status;
    return requiredFields.every(function (field) {
      return node[field];
    });
  }, true);
  if (!isValid) __WEBPACK_IMPORTED_MODULE_0__src_utils__["logError"]('Rubicon: required schain params missing');
  return isValid;
}
/**
 * Creates a URL key value param, encoding the
 * param unless the key is schain
 * @param {String} key
 * @param {String} param
 * @returns {String}
 */

function encodeParam(key, param) {
  if (key === 'rp_schain') return "rp_schain=".concat(param);
  return "".concat(key, "=").concat(encodeURIComponent(param));
}
/**
 * split array into multiple arrays of defined size
 * @param {Array} array
 * @param {number} size
 * @returns {Array}
 */

function partitionArray(array, size) {
  return array.map(function (e, i) {
    return i % size === 0 ? array.slice(i, i + size) : null;
  }).filter(function (e) {
    return e;
  });
}

var hasSynced = false;
function resetUserSync() {
  hasSynced = false;
}
Object(__WEBPACK_IMPORTED_MODULE_1__src_adapters_bidderFactory__["registerBidder"])(spec);

/***/ })

},[446]);