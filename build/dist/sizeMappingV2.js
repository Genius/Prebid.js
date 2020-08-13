pbjsChunk([105],{

/***/ 692:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(693);


/***/ }),

/***/ 693:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "internal", function() { return internal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sizeMappingInternalStore", function() { return sizeMappingInternalStore; });
/* harmony export (immutable) */ __webpack_exports__["isUsingNewSizeMapping"] = isUsingNewSizeMapping;
/* harmony export (immutable) */ __webpack_exports__["checkAdUnitSetupHook"] = checkAdUnitSetupHook;
/* harmony export (immutable) */ __webpack_exports__["checkBidderSizeConfigFormat"] = checkBidderSizeConfigFormat;
/* harmony export (immutable) */ __webpack_exports__["isLabelActivated"] = isLabelActivated;
/* harmony export (immutable) */ __webpack_exports__["getFilteredMediaTypes"] = getFilteredMediaTypes;
/* harmony export (immutable) */ __webpack_exports__["isSizeConfigActivated"] = isSizeConfigActivated;
/* harmony export (immutable) */ __webpack_exports__["getActiveSizeBucket"] = getActiveSizeBucket;
/* harmony export (immutable) */ __webpack_exports__["getRelevantMediaTypesForBidder"] = getRelevantMediaTypesForBidder;
/* harmony export (immutable) */ __webpack_exports__["getAdUnitDetail"] = getAdUnitDetail;
/* harmony export (immutable) */ __webpack_exports__["getBids"] = getBids;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_native_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adUnits_js__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_hook_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_prebid_js__ = __webpack_require__(68);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * This module adds support for the new size mapping spec, Advanced Size Mapping. It's documented here. https://github.com/prebid/Prebid.js/issues/4129
 * The implementation is an alternative to global sizeConfig. It introduces 'Ad Unit' & 'Bidder' level sizeConfigs and also supports 'labels' for conditional
 * rendering. Read full API documentation on Prebid.org, http://prebid.org/dev-docs/modules/sizeMappingV2.html
 */





 // Allows for stubbing of these functions while writing unit tests.

var internal = {
  checkBidderSizeConfigFormat: checkBidderSizeConfigFormat,
  getActiveSizeBucket: getActiveSizeBucket,
  getFilteredMediaTypes: getFilteredMediaTypes,
  getAdUnitDetail: getAdUnitDetail,
  getRelevantMediaTypesForBidder: getRelevantMediaTypesForBidder,
  isLabelActivated: isLabelActivated
};
/*
  'sizeMappingInternalStore' contains information on, whether a particular auction is using size mapping V2 (the new size mapping spec),
  and it also contains additional information on each adUnit, such as, mediaTypes, activeViewport, etc. This information is required by
  the 'getBids' function.
*/

var sizeMappingInternalStore = createSizeMappingInternalStore();

function createSizeMappingInternalStore() {
  var sizeMappingInternalStore = {};
  return {
    initializeStore: function initializeStore(auctionId, isUsingSizeMappingBool) {
      sizeMappingInternalStore[auctionId] = {
        usingSizeMappingV2: isUsingSizeMappingBool,
        adUnits: []
      };
    },
    getAuctionDetail: function getAuctionDetail(auctionId) {
      return sizeMappingInternalStore[auctionId];
    },
    setAuctionDetail: function setAuctionDetail(auctionId, adUnitDetail) {
      sizeMappingInternalStore[auctionId].adUnits.push(adUnitDetail);
    }
  };
}
/*
  Returns "true" if at least one of the adUnits in the adUnits array is using an Ad Unit and/or Bidder level sizeConfig,
  otherwise, returns "false."
*/


function isUsingNewSizeMapping(adUnits) {
  var isUsingSizeMappingBool = false;
  adUnits.forEach(function (adUnit) {
    if (adUnit.mediaTypes) {
      // checks for the presence of sizeConfig property at the adUnit.mediaTypes object
      Object.keys(adUnit.mediaTypes).forEach(function (mediaType) {
        if (adUnit.mediaTypes[mediaType].sizeConfig) {
          if (isUsingSizeMappingBool === false) {
            isUsingSizeMappingBool = true;
          }
        }
      }); // checks for the presence of sizeConfig property at the adUnit.bids[].bidder object

      adUnit.bids.forEach(function (bidder) {
        if (bidder.sizeConfig) {
          if (isUsingSizeMappingBool === false) {
            isUsingSizeMappingBool = true;
          }
        }
      });
    }
  });
  return isUsingSizeMappingBool;
}
/**
  This hooked function executes before the function 'checkAdUnitSetup', that is defined in /src/prebid.js. It's necessary to run this funtion before
  because it applies a series of checks in order to determine the correctness of the 'sizeConfig' array, which, the original 'checkAdUnitSetup' function
  does not recognize.
  @params {Array<AdUnits>} adUnits
  @returns {Array<AdUnits>} validateAdUnits - Unrecognized properties are deleted.
*/

function checkAdUnitSetupHook(adUnits) {
  var validateSizeConfig = function validateSizeConfig(mediaType, sizeConfig, adUnitCode) {
    var isValid = true;
    var associatedProperty = {
      banner: 'sizes',
      video: 'playerSize',
      native: 'active'
    };
    var propertyName = associatedProperty[mediaType];
    var conditionalLogMessages = {
      banner: 'Removing mediaTypes.banner from ad unit.',
      video: 'Removing mediaTypes.video.sizeConfig from ad unit.',
      native: 'Removing mediaTypes.native.sizeConfig from ad unit.'
    };

    if (Array.isArray(sizeConfig)) {
      sizeConfig.forEach(function (config, index) {
        var keys = Object.keys(config);
        /*
          Check #1 (Applies to 'banner', 'video' and 'native' media types.)
          Verify that all config objects include 'minViewPort' and 'sizes' property.
          If they do not, return 'false'.
        */

        if (!(__WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js___default()(keys, 'minViewPort') && __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js___default()(keys, propertyName))) {
          __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("Ad unit ".concat(adUnitCode, ": Missing required property 'minViewPort' or 'sizes' from 'mediaTypes.").concat(mediaType, ".sizeConfig[").concat(index, "]'. ").concat(conditionalLogMessages[mediaType]));
          isValid = false;
          return;
        }
        /*
          Check #2 (Applies to 'banner', 'video' and 'native' media types.)
          Verify that 'config.minViewPort' property is in [width, height] format.
          If not, return false.
        */


        if (!__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArrayOfNums"](config.minViewPort, 2)) {
          __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("Ad unit ".concat(adUnitCode, ": Invalid declaration of 'minViewPort' in 'mediaTypes.").concat(mediaType, ".sizeConfig[").concat(index, "]'. ").concat(conditionalLogMessages[mediaType]));
          isValid = false;
          return;
        }
        /*
          Check #3 (Applies only to 'banner' and 'video' media types.)
          Verify that 'config.sizes' (in case of banner) or 'config.playerSize' (in case of video)
          property is in [width, height] format. If not, return 'false'.
        */


        if (mediaType === 'banner' || mediaType === 'video') {
          var showError = false;

          if (Array.isArray(config[propertyName])) {
            var validatedSizes = __WEBPACK_IMPORTED_MODULE_5__src_prebid_js__["adUnitSetupChecks"].validateSizes(config[propertyName]);

            if (config[propertyName].length > 0 && validatedSizes.length === 0) {
              isValid = false;
              showError = true;
            }
          } else {
            // Either 'sizes' or 'playerSize' is not declared as an array, which makes it invalid by default.
            isValid = false;
            showError = true;
          }

          if (showError) {
            __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("Ad unit ".concat(adUnitCode, ": Invalid declaration of '").concat(propertyName, "' in 'mediaTypes.").concat(mediaType, ".sizeConfig[").concat(index, "]'. ").concat(conditionalLogMessages[mediaType]));
            return;
          }
        }
        /*
          Check #4 (Applies only to 'native' media type)
          Verify that 'config.active' is a 'boolean'.
          If not, return 'false'.
        */


        if (mediaType === 'native') {
          if (typeof config[propertyName] !== 'boolean') {
            __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("Ad unit ".concat(adUnitCode, ": Invalid declaration of 'active' in 'mediaTypes.").concat(mediaType, ".sizeConfig[").concat(index, "]'. ").concat(conditionalLogMessages[mediaType]));
            isValid = false;
          }
        }
      });
    } else {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("Ad unit ".concat(adUnitCode, ": Invalid declaration of 'sizeConfig' in 'mediaTypes.").concat(mediaType, ".sizeConfig'. ").concat(conditionalLogMessages[mediaType]));
      isValid = false;
      return isValid;
    } // If all checks have passed, isValid should equal 'true'


    return isValid;
  };

  var validatedAdUnits = [];
  adUnits.forEach(function (adUnit) {
    var mediaTypes = adUnit.mediaTypes;
    var validatedBanner, validatedVideo, validatedNative;

    if (!mediaTypes || Object.keys(mediaTypes).length === 0) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("Detected adUnit.code '".concat(adUnit.code, "' did not have a 'mediaTypes' object defined. This is a required field for the auction, so this adUnit has been removed."));
      return;
    }

    if (mediaTypes.banner) {
      if (mediaTypes.banner.sizes) {
        // Ad unit is using 'mediaTypes.banner.sizes' instead of the new property 'sizeConfig'. Apply the old checks!
        validatedBanner = __WEBPACK_IMPORTED_MODULE_5__src_prebid_js__["adUnitSetupChecks"].validateBannerMediaType(adUnit);
      } else if (mediaTypes.banner.sizeConfig) {
        // Ad unit is using the 'sizeConfig' property, 'mediaTypes.banner.sizeConfig'. Apply the new checks!
        validatedBanner = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepClone"](adUnit);
        var isBannerValid = validateSizeConfig('banner', mediaTypes.banner.sizeConfig, adUnit.code);

        if (!isBannerValid) {
          delete validatedBanner.mediaTypes.banner;
        } else {
          /*
            Make sure 'sizes' field is always an array of arrays. If not, make it so.
            For example, [] becomes [[]], and [360, 400] becomes [[360, 400]]
          */
          validatedBanner.mediaTypes.banner.sizeConfig.forEach(function (config) {
            if (!Array.isArray(config.sizes[0])) {
              config.sizes = [config.sizes];
            }
          });
        }
      } else {
        // Ad unit is invalid since it's mediaType property does not have either 'sizes' or 'sizeConfig' declared.
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("Ad unit ".concat(adUnit.code, ": 'mediaTypes.banner' does not contain either 'sizes' or 'sizeConfig' property. Removing 'mediaTypes.banner' from ad unit."));
        validatedBanner = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepClone"](adUnit);
        delete validatedBanner.mediaTypes.banner;
      }
    }

    if (mediaTypes.video) {
      if (mediaTypes.video.playerSize) {
        // Ad unit is using 'mediaTypes.video.playerSize' instead of the new property 'sizeConfig'. Apply the old checks!
        validatedVideo = validatedBanner ? __WEBPACK_IMPORTED_MODULE_5__src_prebid_js__["adUnitSetupChecks"].validateVideoMediaType(validatedBanner) : __WEBPACK_IMPORTED_MODULE_5__src_prebid_js__["adUnitSetupChecks"].validateVideoMediaType(adUnit);
      } else if (mediaTypes.video.sizeConfig) {
        // Ad unit is using the 'sizeConfig' property, 'mediaTypes.video.sizeConfig'. Apply the new checks!
        validatedVideo = validatedBanner || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepClone"](adUnit);
        var isVideoValid = validateSizeConfig('video', mediaTypes.video.sizeConfig, adUnit.code);

        if (!isVideoValid) {
          delete validatedVideo.mediaTypes.video.sizeConfig;
        } else {
          /*
            Make sure 'playerSize' field is always an array of arrays. If not, make it so.
            For example, [] becomes [[]], and [640, 400] becomes [[640, 400]]
          */
          validatedVideo.mediaTypes.video.sizeConfig.forEach(function (config) {
            if (!Array.isArray(config.playerSize[0])) {
              config.playerSize = [config.playerSize];
            }
          });
        }
      }
    }

    if (mediaTypes.native) {
      // Apply the old native checks
      validatedNative = validatedVideo ? __WEBPACK_IMPORTED_MODULE_5__src_prebid_js__["adUnitSetupChecks"].validateNativeMediaType(validatedVideo) : validatedBanner ? __WEBPACK_IMPORTED_MODULE_5__src_prebid_js__["adUnitSetupChecks"].validateNativeMediaType(validatedBanner) : __WEBPACK_IMPORTED_MODULE_5__src_prebid_js__["adUnitSetupChecks"].validateNativeMediaType(adUnit); // Apply the new checks if 'mediaTypes.native.sizeConfig' detected

      if (mediaTypes.native.sizeConfig) {
        var isNativeValid = validateSizeConfig('native', mediaTypes.native.sizeConfig, adUnit.code);

        if (!isNativeValid) {
          delete validatedNative.mediaTypes.native.sizeConfig;
        }
      }
    }

    var validatedAdUnit = _extends({}, validatedBanner, validatedVideo, validatedNative);

    validatedAdUnits.push(validatedAdUnit);
  });
  return validatedAdUnits;
}
Object(__WEBPACK_IMPORTED_MODULE_4__src_hook_js__["a" /* getHook */])('checkAdUnitSetup').before(function (fn, adUnits) {
  var usingNewSizeMapping = isUsingNewSizeMapping(adUnits);

  if (usingNewSizeMapping) {
    // if adUnits are found using the sizeMappingV2 spec, we run additional checks on them for checking the validity of sizeConfig object
    // in addition to running the base checks on the mediaType object and return the adUnit without calling the base function.
    adUnits = checkAdUnitSetupHook(adUnits);
    return fn.bail(adUnits);
  } else {
    // if presence of sizeMappingV2 spec is not detected on adUnits, we default back to the original checks defined in the base function.
    return fn.call(this, adUnits);
  }
}); // checks if the sizeConfig object declared at the Bidder level is in the right format or not.

function checkBidderSizeConfigFormat(sizeConfig) {
  var didCheckPass = true;

  if (Array.isArray(sizeConfig) && sizeConfig.length > 0) {
    sizeConfig.forEach(function (config) {
      var keys = Object.keys(config);

      if (__WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js___default()(keys, 'minViewPort') && __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js___default()(keys, 'relevantMediaTypes') && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isArrayOfNums"](config.minViewPort, 2) && Array.isArray(config.relevantMediaTypes) && config.relevantMediaTypes.length > 0 && (config.relevantMediaTypes.length > 1 ? config.relevantMediaTypes.every(function (mt) {
        return __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js___default()(['banner', 'video', 'native'], mt);
      }) : ['none', 'banner', 'video', 'native'].indexOf(config.relevantMediaTypes[0]) > -1)) {
        didCheckPass = didCheckPass && true;
      } else {
        didCheckPass = false;
      }
    });
  } else {
    didCheckPass = false;
  }

  return didCheckPass;
}
Object(__WEBPACK_IMPORTED_MODULE_4__src_hook_js__["a" /* getHook */])('getBids').before(function (fn, bidderInfo) {
  // check if the adUnit is using sizeMappingV2 specs and store the result in _sizeMappingUsageMap.
  if (typeof sizeMappingInternalStore.getAuctionDetail(bidderInfo.auctionId) === 'undefined') {
    var isUsingSizeMappingBool = isUsingNewSizeMapping(bidderInfo.adUnits); // initialize sizeMappingInternalStore for the first time for a particular auction

    sizeMappingInternalStore.initializeStore(bidderInfo.auctionId, isUsingSizeMappingBool);
  }

  if (sizeMappingInternalStore.getAuctionDetail(bidderInfo.auctionId).usingSizeMappingV2) {
    // if adUnit is found using sizeMappingV2 specs, run the getBids function which processes the sizeConfig object
    // and returns the bids array for a particular bidder.
    var bids = getBids(bidderInfo);
    return fn.bail(bids);
  } else {
    // if not using sizeMappingV2, default back to the getBids function defined in adapterManager.
    return fn.call(this, bidderInfo);
  }
});
/**
 * Given an Ad Unit or a Bid as an input, returns a boolean telling if the Ad Unit/ Bid is active based on label checks
 * @param {Object<BidOrAdUnit>} bidOrAdUnit - Either the Ad Unit object or the Bid object
 * @param {Array<string>} activeLabels - List of active labels passed as an argument to pbjs.requestBids function
 * @param {string} adUnitCode - Unique string identifier for an Ad Unit.
 * @param {number} adUnitInstance - Instance count of an 'Identical' ad unit.
 * @returns {boolean} Represents if the Ad Unit or the Bid is active or not
 */

function isLabelActivated(bidOrAdUnit, activeLabels, adUnitCode, adUnitInstance) {
  var labelOperator;
  var labelsFound = Object.keys(bidOrAdUnit).filter(function (prop) {
    return prop === 'labelAny' || prop === 'labelAll';
  });

  if (labelsFound && labelsFound.length > 1) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("Size Mapping V2:: ".concat(bidOrAdUnit.code ? "Ad Unit: ".concat(bidOrAdUnit.code, "(").concat(adUnitInstance, ") => Ad unit has multiple label operators. Using the first declared operator: ").concat(labelsFound[0]) : "Ad Unit: ".concat(adUnitCode, "(").concat(adUnitInstance, "), Bidder: ").concat(bidOrAdUnit.bidder, " => Bidder has multiple label operators. Using the first declared operator: ").concat(labelsFound[0])));
  }

  labelOperator = labelsFound[0];

  if (labelOperator && !activeLabels) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("Size Mapping V2:: ".concat(bidOrAdUnit.code ? "Ad Unit: ".concat(bidOrAdUnit.code, "(").concat(adUnitInstance, ") => Found '").concat(labelOperator, "' on ad unit, but 'labels' is not set. Did you pass 'labels' to pbjs.requestBids() ?") : "Ad Unit: ".concat(adUnitCode, "(").concat(adUnitInstance, "), Bidder: ").concat(bidOrAdUnit.bidder, " => Found '").concat(labelOperator, "' on bidder, but 'labels' is not set. Did you pass 'labels' to pbjs.requestBids() ?")));
    return true;
  }

  if (labelOperator === 'labelAll' && Array.isArray(bidOrAdUnit[labelOperator])) {
    if (bidOrAdUnit.labelAll.length === 0) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("Size Mapping V2:: Ad Unit: ".concat(bidOrAdUnit.code, "(").concat(adUnitInstance, ") => Ad unit has declared property 'labelAll' with an empty array."));
      return true;
    }

    return bidOrAdUnit.labelAll.every(function (label) {
      return __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js___default()(activeLabels, label);
    });
  } else if (labelOperator === 'labelAny' && Array.isArray(bidOrAdUnit[labelOperator])) {
    if (bidOrAdUnit.labelAny.length === 0) {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("Size Mapping V2:: Ad Unit: ".concat(bidOrAdUnit.code, "(").concat(adUnitInstance, ") => Ad unit has declared property 'labelAny' with an empty array."));
      return true;
    }

    return bidOrAdUnit.labelAny.some(function (label) {
      return __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js___default()(activeLabels, label);
    });
  }

  return true;
}
/**
 * Processes the MediaTypes object and calculates the active size buckets for each Media Type. Uses `window.innerWidth` and `window.innerHeight`
 * to calculate the width and height of the active Viewport.
 * @param {MediaTypes} mediaTypes Contains information about supported media types for an Ad Unit and size information for each of those types
 * @returns {FilteredMediaTypes} Filtered mediaTypes object with relevant media types filtered by size buckets based on activeViewPort size
 */

function getFilteredMediaTypes(mediaTypes) {
  var activeViewportWidth, activeViewportHeight, transformedMediaTypes;
  transformedMediaTypes = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepClone"](mediaTypes);
  var activeSizeBucket = {
    banner: undefined,
    video: undefined,
    native: undefined
  };

  try {
    activeViewportWidth = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getWindowTop"]().innerWidth;
    activeViewportHeight = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getWindowTop"]().innerHeight;
  } catch (e) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("SizeMappingv2:: Unfriendly iframe blocks viewport size to be evaluated correctly");
    activeViewportWidth = window.innerWidth;
    activeViewportHeight = window.innerHeight;
  }

  var activeViewport = [activeViewportWidth, activeViewportHeight];
  Object.keys(mediaTypes).map(function (mediaType) {
    var sizeConfig = mediaTypes[mediaType].sizeConfig;

    if (sizeConfig) {
      activeSizeBucket[mediaType] = getActiveSizeBucket(sizeConfig, activeViewport);
      var filteredSizeConfig = sizeConfig.filter(function (config) {
        return config.minViewPort === activeSizeBucket[mediaType] && isSizeConfigActivated(mediaType, config);
      });
      transformedMediaTypes[mediaType] = _extends({
        filteredSizeConfig: filteredSizeConfig
      }, mediaTypes[mediaType]); // transform mediaTypes object

      var config = {
        banner: 'sizes',
        video: 'playerSize'
      };

      if (transformedMediaTypes[mediaType].filteredSizeConfig.length > 0) {
        // map sizes or playerSize property in filteredSizeConfig object to transformedMediaTypes.banner.sizes if mediaType is banner
        // or transformedMediaTypes.video.playerSize if the mediaType in video.
        // doesn't apply to native mediaType since native doesn't have any property defining 'sizes' or 'playerSize'.
        if (mediaType !== 'native') {
          transformedMediaTypes[mediaType][config[mediaType]] = transformedMediaTypes[mediaType].filteredSizeConfig[0][config[mediaType]];
        }
      } else {
        delete transformedMediaTypes[mediaType];
      }
    }
  }); // filter out 'undefined' values from activeSizeBucket object and attach sizes/playerSize information against the active size bucket.

  var sizeBucketToSizeMap = Object.keys(activeSizeBucket).filter(function (mediaType) {
    return activeSizeBucket[mediaType] !== undefined;
  }).reduce(function (sizeBucketToSizeMap, mediaType) {
    sizeBucketToSizeMap[mediaType] = {
      activeSizeBucket: activeSizeBucket[mediaType],
      activeSizeDimensions: mediaType === 'banner' ? // banner mediaType gets deleted incase no sizes are specified for a given size bucket, that's why this check is necessary
      transformedMediaTypes.banner ? transformedMediaTypes.banner.sizes : [] : mediaType === 'video' ? // video mediaType gets deleted incase no playerSize is specified for a given size bucket, that's why this check is necessary
      transformedMediaTypes.video ? transformedMediaTypes.video.playerSize : [] : 'NA'
    };
    return sizeBucketToSizeMap;
  }, {});
  return {
    mediaTypes: mediaTypes,
    sizeBucketToSizeMap: sizeBucketToSizeMap,
    activeViewport: activeViewport,
    transformedMediaTypes: transformedMediaTypes
  };
}
;
/**
 * Evaluates the given sizeConfig object and checks for various properties to determine if the sizeConfig is active or not. For example,
 * let's suppose the sizeConfig is for a Banner media type. Then, if the sizes property is found empty, it returns false, else returns true.
 * In case of a Video media type, it checks the playerSize property. If found empty, returns false, else returns true.
 * In case of a Native media type, it checks the active property. If found false, returns false, if found true, returns true.
 * @param {string} mediaType It can be 'banner', 'native' or 'video'
 * @param {Object<SizeConfig>} sizeConfig Represents the sizeConfig object which is active based on the current viewport size
 * @returns {boolean} Represents if the size config is active or not
 */

function isSizeConfigActivated(mediaType, sizeConfig) {
  switch (mediaType) {
    case 'banner':
      // we need this check, sizeConfig.sizes[0].length > 0, in place because a sizeBucket can have sizes: [],
      // gets converted to sizes: [[]] in the checkAdUnitSetupHook function
      return sizeConfig.sizes && sizeConfig.sizes.length > 0 && sizeConfig.sizes[0].length > 0;

    case 'video':
      // for why we need the last check, read the above comment
      return sizeConfig.playerSize && sizeConfig.playerSize.length > 0 && sizeConfig.playerSize[0].length > 0;

    case 'native':
      return sizeConfig.active;

    default:
      return false;
  }
}
/**
 * Returns the active size bucket for a given media type
 * @param {Array<SizeConfig>} sizeConfig SizeConfig defines the characteristics of an Ad Unit categorised into multiple size buckets per media type
 * @param {Array} activeViewport Viewport size of the browser in the form [w, h] (w -> width, h -> height)
 * Calculated at the time of making call to pbjs.requestBids function
 * @returns {Array} The active size bucket matching the activeViewPort, for example: [750, 0]
 */

function getActiveSizeBucket(sizeConfig, activeViewport) {
  var activeSizeBucket = [];
  sizeConfig.sort(function (a, b) {
    return a.minViewPort[0] - b.minViewPort[0];
  }).forEach(function (config) {
    if (activeViewport[0] >= config.minViewPort[0]) {
      if (activeViewport[1] >= config.minViewPort[1]) {
        activeSizeBucket = config.minViewPort;
      } else {
        activeSizeBucket = [];
      }
    }
  });
  return activeSizeBucket;
}
function getRelevantMediaTypesForBidder(sizeConfig, activeViewport) {
  if (internal.checkBidderSizeConfigFormat(sizeConfig)) {
    var activeSizeBucket = internal.getActiveSizeBucket(sizeConfig, activeViewport);
    return sizeConfig.filter(function (config) {
      return config.minViewPort === activeSizeBucket;
    })[0]['relevantMediaTypes'];
  }

  return [];
} // sets sizeMappingInternalStore for a given auctionId with relevant adUnit information returned from the call to 'getFilteredMediaTypes' function
// returns adUnit details object.

function getAdUnitDetail(auctionId, adUnit, labels) {
  // fetch all adUnits for an auction from the sizeMappingInternalStore
  var adUnitsForAuction = sizeMappingInternalStore.getAuctionDetail(auctionId).adUnits; // check if the adUnit exists already in the sizeMappingInterStore (check for equivalence of 'code' && 'mediaTypes' properties)

  var adUnitDetail = adUnitsForAuction.filter(function (adUnitDetail) {
    return adUnitDetail.adUnitCode === adUnit.code && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepEqual"](adUnitDetail.mediaTypes, adUnit.mediaTypes);
  });

  if (adUnitDetail.length > 0) {
    adUnitDetail[0].cacheHits++;
    return adUnitDetail[0];
  } else {
    var identicalAdUnit = adUnitsForAuction.filter(function (adUnitDetail) {
      return adUnitDetail.adUnitCode === adUnit.code;
    });
    var adUnitInstance = identicalAdUnit.length > 0 && typeof identicalAdUnit[0].instance === 'number' ? identicalAdUnit[identicalAdUnit.length - 1].instance + 1 : 1;

    var _isLabelActivated = internal.isLabelActivated(adUnit, labels, adUnit.code, adUnitInstance);

    var _ref = _isLabelActivated && internal.getFilteredMediaTypes(adUnit.mediaTypes),
        _ref$mediaTypes = _ref.mediaTypes,
        mediaTypes = _ref$mediaTypes === void 0 ? adUnit.mediaTypes : _ref$mediaTypes,
        sizeBucketToSizeMap = _ref.sizeBucketToSizeMap,
        activeViewport = _ref.activeViewport,
        transformedMediaTypes = _ref.transformedMediaTypes;

    var _adUnitDetail = {
      adUnitCode: adUnit.code,
      mediaTypes: mediaTypes,
      sizeBucketToSizeMap: sizeBucketToSizeMap,
      activeViewport: activeViewport,
      transformedMediaTypes: transformedMediaTypes,
      instance: adUnitInstance,
      isLabelActivated: _isLabelActivated,
      cacheHits: 0
    }; // set adUnitDetail in sizeMappingInternalStore against the correct 'auctionId'.

    sizeMappingInternalStore.setAuctionDetail(auctionId, _adUnitDetail);
    _isLabelActivated && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]("Size Mapping V2:: Ad Unit: ".concat(adUnit.code, "(").concat(adUnitInstance, ") => Active size buckets after filtration: "), sizeBucketToSizeMap);
    return _adUnitDetail;
  }
}
function getBids(_ref2) {
  var bidderCode = _ref2.bidderCode,
      auctionId = _ref2.auctionId,
      bidderRequestId = _ref2.bidderRequestId,
      adUnits = _ref2.adUnits,
      labels = _ref2.labels,
      src = _ref2.src;
  return adUnits.reduce(function (result, adUnit) {
    if (adUnit.mediaTypes && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isValidMediaTypes"](adUnit.mediaTypes)) {
      var _internal$getAdUnitDe = internal.getAdUnitDetail(auctionId, adUnit, labels),
          activeViewport = _internal$getAdUnitDe.activeViewport,
          transformedMediaTypes = _internal$getAdUnitDe.transformedMediaTypes,
          adUnitInstance = _internal$getAdUnitDe.instance,
          _isLabelActivated2 = _internal$getAdUnitDe.isLabelActivated,
          cacheHits = _internal$getAdUnitDe.cacheHits;

      if (_isLabelActivated2) {
        // check if adUnit has any active media types remaining, if not drop the adUnit from auction,
        // else proceed to evaluate the bids object.
        if (Object.keys(transformedMediaTypes).length === 0) {
          cacheHits === 0 && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]("Size Mapping V2:: Ad Unit: ".concat(adUnit.code, "(").concat(adUnitInstance, ") => Ad unit disabled since there are no active media types after sizeConfig filtration."));
          return result;
        }

        result.push(adUnit.bids.filter(function (bid) {
          return bid.bidder === bidderCode;
        }).reduce(function (bids, bid) {
          if (internal.isLabelActivated(bid, labels, adUnit.code, adUnitInstance)) {
            // handle native params
            var nativeParams = adUnit.nativeParams || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](adUnit, 'mediaTypes.native');

            if (nativeParams) {
              bid = _extends({}, bid, {
                nativeParams: Object(__WEBPACK_IMPORTED_MODULE_1__src_native_js__["g" /* processNativeAdUnitParams */])(nativeParams)
              });
            }

            bid = _extends({}, bid, __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getDefinedParams"](adUnit, ['mediaType', 'renderer']));

            if (bid.sizeConfig) {
              var relevantMediaTypes = internal.getRelevantMediaTypesForBidder(bid.sizeConfig, activeViewport);

              if (relevantMediaTypes.length === 0) {
                __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("Size Mapping V2:: Ad Unit: ".concat(adUnit.code, "(").concat(adUnitInstance, "), Bidder: ").concat(bidderCode, " => 'sizeConfig' is not configured properly. This bidder won't be eligible for sizeConfig checks and will remail active."));
                bid = _extends({}, bid);
              } else if (relevantMediaTypes[0] !== 'none') {
                var bidderMediaTypes = Object.keys(transformedMediaTypes).filter(function (mt) {
                  return relevantMediaTypes.indexOf(mt) > -1;
                }).reduce(function (mediaTypes, mediaType) {
                  mediaTypes[mediaType] = transformedMediaTypes[mediaType];
                  return mediaTypes;
                }, {});

                if (Object.keys(bidderMediaTypes).length > 0) {
                  bid = _extends({}, bid, {
                    mediaTypes: bidderMediaTypes
                  });
                } else {
                  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]("Size Mapping V2:: Ad Unit: ".concat(adUnit.code, "(").concat(adUnitInstance, "), Bidder: ").concat(bid.bidder, " => 'relevantMediaTypes' does not match with any of the active mediaTypes at the Ad Unit level. This bidder is disabled."));
                  return bids;
                }
              } else {
                __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]("Size Mapping V2:: Ad Unit: ".concat(adUnit.code, "(").concat(adUnitInstance, "), Bidder: ").concat(bid.bidder, " => 'relevantMediaTypes' is set to 'none' in sizeConfig for current viewport size. This bidder is disabled."));
                return bids;
              }
            }

            bids.push(_extends({}, bid, {
              adUnitCode: adUnit.code,
              transactionId: adUnit.transactionId,
              sizes: __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](transformedMediaTypes, 'banner.sizes') || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["deepAccess"](transformedMediaTypes, 'video.playerSize') || [],
              mediaTypes: bid.mediaTypes || transformedMediaTypes,
              bidId: bid.bid_id || __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getUniqueIdentifierStr"](),
              bidderRequestId: bidderRequestId,
              auctionId: auctionId,
              src: src,
              bidRequestsCount: __WEBPACK_IMPORTED_MODULE_2__src_adUnits_js__["a" /* adunitCounter */].getRequestsCounter(adUnit.code),
              bidderRequestsCount: __WEBPACK_IMPORTED_MODULE_2__src_adUnits_js__["a" /* adunitCounter */].getBidderRequestsCounter(adUnit.code, bid.bidder),
              bidderWinsCount: __WEBPACK_IMPORTED_MODULE_2__src_adUnits_js__["a" /* adunitCounter */].getBidderWinsCounter(adUnit.code, bid.bidder)
            }));
            return bids;
          } else {
            __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]("Size Mapping V2:: Ad Unit: ".concat(adUnit.code, "(").concat(adUnitInstance, "), Bidder: ").concat(bid.bidder, " => Label check for this bidder has failed. This bidder is disabled."));
            return bids;
          }
        }, []));
      } else {
        cacheHits === 0 && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]("Size Mapping V2:: Ad Unit: ".concat(adUnit.code, "(").concat(adUnitInstance, ") => Ad unit is disabled due to failing label check."));
      }
    } else {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("Size Mapping V2:: Ad Unit: ".concat(adUnit.code, " => Ad unit has declared invalid 'mediaTypes' or has not declared a 'mediaTypes' property"));
      return result;
    }

    return result;
  }, []).reduce(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["flatten"], []).filter(function (val) {
    return val !== '';
  });
}

/***/ })

},[692]);