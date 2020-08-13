pbjsChunk([141],{

/***/ 596:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(597);


/***/ }),

/***/ 597:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allowedFields", function() { return allowedFields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_floorDataForAuction", function() { return _floorDataForAuction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fieldMatchingFunctions", function() { return fieldMatchingFunctions; });
/* harmony export (immutable) */ __webpack_exports__["getFirstMatchingFloor"] = getFirstMatchingFloor;
/* harmony export (immutable) */ __webpack_exports__["getBiddersCpmAdjustment"] = getBiddersCpmAdjustment;
/* harmony export (immutable) */ __webpack_exports__["calculateAdjustedFloor"] = calculateAdjustedFloor;
/* harmony export (immutable) */ __webpack_exports__["getFloor"] = getFloor;
/* harmony export (immutable) */ __webpack_exports__["getFloorsDataForAuction"] = getFloorsDataForAuction;
/* harmony export (immutable) */ __webpack_exports__["getFloorDataFromAdUnits"] = getFloorDataFromAdUnits;
/* harmony export (immutable) */ __webpack_exports__["updateAdUnitsForAuction"] = updateAdUnitsForAuction;
/* harmony export (immutable) */ __webpack_exports__["pickRandomModel"] = pickRandomModel;
/* harmony export (immutable) */ __webpack_exports__["createFloorsDataForAuction"] = createFloorsDataForAuction;
/* harmony export (immutable) */ __webpack_exports__["continueAuction"] = continueAuction;
/* harmony export (immutable) */ __webpack_exports__["isFloorsDataValid"] = isFloorsDataValid;
/* harmony export (immutable) */ __webpack_exports__["parseFloorData"] = parseFloorData;
/* harmony export (immutable) */ __webpack_exports__["requestBidsHook"] = requestBidsHook;
/* harmony export (immutable) */ __webpack_exports__["handleFetchResponse"] = handleFetchResponse;
/* harmony export (immutable) */ __webpack_exports__["generateAndHandleFetch"] = generateAndHandleFetch;
/* harmony export (immutable) */ __webpack_exports__["handleSetFloorsConfig"] = handleSetFloorsConfig;
/* harmony export (immutable) */ __webpack_exports__["addBidResponseHook"] = addBidResponseHook;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_prebidGlobal_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_events_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_events_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__src_events_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_constants_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__src_constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_hook_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__src_bidfactory_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_pure_features_array_find_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_pure_features_array_find_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_pure_features_array_find_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__src_refererDetection_js__ = __webpack_require__(30);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











/**
 * @summary This Module is intended to provide users with the ability to dynamically set and enforce price floors on a per auction basis.
 */

var MODULE_NAME = 'Price Floors';
/**
 * @summary Instantiate Ajax so we control the timeout
 */

var ajax = Object(__WEBPACK_IMPORTED_MODULE_3__src_ajax_js__["b" /* ajaxBuilder */])(10000);
/**
 * @summary Allowed fields for rules to have
 */

var allowedFields = ['gptSlot', 'adUnitCode', 'size', 'domain', 'mediaType'];
/**
 * @summary This is a flag to indicate if a AJAX call is processing for a floors request
*/

var fetching = false;
/**
 * @summary so we only register for our hooks once
*/

var addedFloorsHook = false;
/**
 * @summary The config to be used. Can be updated via: setConfig or a real time fetch
 */

var _floorsConfig = {};
/**
 * @summary If a auction is to be delayed by an ongoing fetch we hold it here until it can be resumed
 */

var _delayedAuctions = [];
/**
 * @summary Each auction can have differing floors data depending on execution time or per adunit setup
 * So we will be saving each auction offset by it's auctionId in order to make sure data is not changed
 * Once the auction commences
 */

var _floorDataForAuction = {};
/**
 * @summary Simple function to round up to a certain decimal degree
 */

function roundUp(number, precision) {
  return Math.ceil(parseFloat(number) * Math.pow(10, precision)) / Math.pow(10, precision);
}

var referrerHostname;

function getHostNameFromReferer(referer) {
  referrerHostname = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["parseUrl"](referer, {
    noDecodeWholeURL: true
  }).hostname;
  return referrerHostname;
}
/**
 * @summary floor field types with their matching functions to resolve the actual matched value
 */


var fieldMatchingFunctions = {
  'size': function size(bidRequest, bidResponse) {
    return __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["parseGPTSingleSizeArray"](bidResponse.size) || '*';
  },
  'mediaType': function mediaType(bidRequest, bidResponse) {
    return bidResponse.mediaType || 'banner';
  },
  'gptSlot': function gptSlot(bidRequest, bidResponse) {
    return __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["getGptSlotInfoForAdUnitCode"](bidRequest.adUnitCode).gptSlot;
  },
  'domain': function domain(bidRequest, bidResponse) {
    return referrerHostname || getHostNameFromReferer(Object(__WEBPACK_IMPORTED_MODULE_9__src_refererDetection_js__["a" /* getRefererInfo */])().referer);
  },
  'adUnitCode': function adUnitCode(bidRequest, bidResponse) {
    return bidRequest.adUnitCode;
  }
};
/**
 * @summary Based on the fields array in floors data, it enumerates all possible matches based on exact match coupled with
 * a "*" catch-all match
 * Returns array of Tuple [exact match, catch all] for each field in rules file
 */

function enumeratePossibleFieldValues(floorFields, bidObject, responseObject) {
  // generate combination of all exact matches and catch all for each field type
  return floorFields.reduce(function (accum, field) {
    var exactMatch = fieldMatchingFunctions[field](bidObject, responseObject) || '*'; // storing exact matches as lowerCase since we want to compare case insensitively

    accum.push(exactMatch === '*' ? ['*'] : [exactMatch.toLowerCase(), '*']);
    return accum;
  }, []);
}
/**
 * @summary get's the first matching floor based on context provided.
 * Generates all possible rule matches and picks the first matching one.
 */


function getFirstMatchingFloor(floorData, bidObject) {
  var responseObject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var fieldValues = enumeratePossibleFieldValues(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](floorData, 'schema.fields') || [], bidObject, responseObject);
  if (!fieldValues.length) return {
    matchingFloor: floorData.default
  }; // look to see iof a request for this context was made already

  var matchingInput = fieldValues.map(function (field) {
    return field[0];
  }).join('-'); // if we already have gotten the matching rule from this matching input then use it! No need to look again

  var previousMatch = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](floorData, "matchingInputs.".concat(matchingInput));

  if (previousMatch) {
    return previousMatch;
  }

  var allPossibleMatches = generatePossibleEnumerations(fieldValues, __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](floorData, 'schema.delimiter') || '|');
  var matchingRule = __WEBPACK_IMPORTED_MODULE_8_core_js_pure_features_array_find_js___default()(allPossibleMatches, function (hashValue) {
    return floorData.values.hasOwnProperty(hashValue);
  });
  var matchingData = {
    matchingFloor: floorData.values[matchingRule] || floorData.default,
    matchingData: allPossibleMatches[0],
    // the first possible match is an "exact" so contains all data relevant for anlaytics adapters
    matchingRule: matchingRule
  }; // save for later lookup if needed

  __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepSetValue"](floorData, "matchingInputs.".concat(matchingInput), _objectSpread({}, matchingData));
  return matchingData;
}
/**
 * @summary Generates all possible rule hash's based on input array of array's
 * The generated list is of all possible key matches based on fields input
 * The list is sorted by least amount of * in rule to most with left most fields taking precedence
 */

function generatePossibleEnumerations(arrayOfFields, delimiter) {
  return arrayOfFields.reduce(function (accum, currentVal) {
    var ret = [];
    accum.map(function (obj) {
      currentVal.map(function (obj1) {
        ret.push(obj + delimiter + obj1);
      });
    });
    return ret;
  }).sort(function (left, right) {
    return left.split('*').length - right.split('*').length;
  });
}
/**
 * @summary If a the input bidder has a registered cpmadjustment it returns the input CPM after being adjusted
 */


function getBiddersCpmAdjustment(bidderName, inputCpm) {
  var adjustmentFunction = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](Object(__WEBPACK_IMPORTED_MODULE_0__src_prebidGlobal_js__["a" /* getGlobal */])(), "bidderSettings.".concat(bidderName, ".bidCpmAdjustment"));

  if (adjustmentFunction) {
    return parseFloat(adjustmentFunction(inputCpm));
  }

  return parseFloat(inputCpm);
}
/**
 * @summary This function takes the original floor and the adjusted floor in order to determine the bidders actual floor
 * With js rounding errors with decimal division we utilize similar method as shown in cpmBucketManager.js
 */

function calculateAdjustedFloor(oldFloor, newFloor) {
  var pow = Math.pow(10, 10);
  return oldFloor * pow / (newFloor * pow) * (oldFloor * pow) / pow;
}
/**
 * @summary gets the prebid set sizes depending on the input mediaType
 */

var getMediaTypesSizes = {
  banner: function banner(bid) {
    return __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bid, 'mediaTypes.banner.sizes') || [];
  },
  video: function video(bid) {
    return __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bid, 'mediaTypes.video.playerSize') || [];
  },
  native: function native(bid) {
    return __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bid, 'mediaTypes.native.image.sizes') ? [__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](bid, 'mediaTypes.native.image.sizes')] : [];
  }
};
/**
 * @summary for getFloor only, before selecting a rule, if a bidAdapter asks for * in their getFloor params
 * Then we may be able to get a better rule than the * ones depending on context of the adUnit
 */

function updateRequestParamsFromContext(bidRequest, requestParams) {
  // if adapter asks for *'s then we can do some logic to infer if we can get a more specific rule based on context of bid
  var mediaTypesOnBid = Object.keys(bidRequest.mediaTypes || {}); // if there is only one mediaType then we can just use it

  if (requestParams.mediaType === '*' && mediaTypesOnBid.length === 1) {
    requestParams.mediaType = mediaTypesOnBid[0];
  } // if they asked for * size, but for the given mediaType there is only one size, we can just use it


  if (requestParams.size === '*' && mediaTypesOnBid.indexOf(requestParams.mediaType) !== -1 && getMediaTypesSizes[requestParams.mediaType] && getMediaTypesSizes[requestParams.mediaType](bidRequest).length === 1) {
    requestParams.size = getMediaTypesSizes[requestParams.mediaType](bidRequest)[0];
  }

  return requestParams;
}
/**
 * @summary This is the function which will return a single floor based on the input requests
 * and matching it to a rule for the current auction
 */


function getFloor() {
  var requestParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    currency: 'USD',
    mediaType: '*',
    size: '*'
  };
  var bidRequest = this;
  var floorData = _floorDataForAuction[bidRequest.auctionId];
  if (!floorData || floorData.skipped) return {};
  requestParams = updateRequestParamsFromContext(bidRequest, requestParams);
  var floorInfo = getFirstMatchingFloor(floorData.data, _objectSpread({}, bidRequest), {
    mediaType: requestParams.mediaType,
    size: requestParams.size
  });
  var currency = requestParams.currency || floorData.data.currency; // if bidder asked for a currency which is not what floors are set in convert

  if (floorInfo.matchingFloor && currency !== floorData.data.currency) {
    try {
      floorInfo.matchingFloor = Object(__WEBPACK_IMPORTED_MODULE_0__src_prebidGlobal_js__["a" /* getGlobal */])().convertCurrency(floorInfo.matchingFloor, floorData.data.currency, currency);
    } catch (err) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logWarn"]("".concat(MODULE_NAME, ": Unable to get currency conversion for getFloor for bidder ").concat(bidRequest.bidder, ". You must have currency module enabled with defaultRates in your currency config")); // since we were unable to convert to the bidders requested currency, we send back just the actual floors currency to them

      currency = floorData.data.currency;
    }
  } // if cpmAdjustment flag is true and we have a valid floor then run the adjustment on it


  if (floorData.enforcement.bidAdjustment && floorInfo.matchingFloor) {
    var cpmAdjustment = getBiddersCpmAdjustment(bidRequest.bidder, floorInfo.matchingFloor);
    floorInfo.matchingFloor = cpmAdjustment ? calculateAdjustedFloor(floorInfo.matchingFloor, cpmAdjustment) : floorInfo.matchingFloor;
  }

  if (floorInfo.matchingFloor) {
    return {
      floor: roundUp(floorInfo.matchingFloor, 4),
      currency: currency
    };
  }

  return {};
}
/**
 * @summary Takes a floorsData object and converts it into a hash map with appropriate keys
 */

function getFloorsDataForAuction(floorData, adUnitCode) {
  var auctionFloorData = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepClone"](floorData);
  auctionFloorData.schema.delimiter = floorData.schema.delimiter || '|';
  auctionFloorData.values = normalizeRulesForAuction(auctionFloorData, adUnitCode); // default the currency to USD if not passed in

  auctionFloorData.currency = auctionFloorData.currency || 'USD';
  return auctionFloorData;
}
/**
 * @summary if adUnitCode needs to be added to the offset then it will add it else just return the values
 */

function normalizeRulesForAuction(floorData, adUnitCode) {
  var fields = floorData.schema.fields;
  var delimiter = floorData.schema.delimiter; // if we are building the floor data form an ad unit, we need to append adUnit code as to not cause collisions

  var prependAdUnitCode = adUnitCode && fields.indexOf('adUnitCode') === -1 && fields.unshift('adUnitCode');
  return Object.keys(floorData.values).reduce(function (rulesHash, oldKey) {
    var newKey = prependAdUnitCode ? "".concat(adUnitCode).concat(delimiter).concat(oldKey) : oldKey; // we store the rule keys as lower case for case insensitive compare

    rulesHash[newKey.toLowerCase()] = floorData.values[oldKey];
    return rulesHash;
  }, {});
}
/**
 * @summary This function will take the adUnits and generate a floor data object to be used during the auction
 * Only called if no set config or fetch level data has returned
 */


function getFloorDataFromAdUnits(adUnits) {
  return adUnits.reduce(function (accum, adUnit) {
    if (isFloorsDataValid(adUnit.floors)) {
      // if values already exist we want to not overwrite them
      if (!accum.values) {
        accum = getFloorsDataForAuction(adUnit.floors, adUnit.code);
        accum.location = 'adUnit';
      } else {
        var newRules = getFloorsDataForAuction(adUnit.floors, adUnit.code).values; // copy over the new rules into our values object

        _extends(accum.values, newRules);
      }
    }

    return accum;
  }, {});
}
/**
 * @summary This function takes the adUnits for the auction and update them accordingly as well as returns the rules hashmap for the auction
 */

function updateAdUnitsForAuction(adUnits, floorData, auctionId) {
  adUnits.forEach(function (adUnit) {
    adUnit.bids.forEach(function (bid) {
      if (floorData.skipped) {
        delete bid.getFloor;
      } else {
        bid.getFloor = getFloor;
      } // information for bid and analytics adapters


      bid.auctionId = auctionId;
      bid.floorData = {
        skipped: floorData.skipped,
        skipRate: floorData.skipRate,
        modelVersion: __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](floorData, 'data.modelVersion'),
        location: __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](floorData, 'data.location', 'noData'),
        floorProvider: floorData.floorProvider,
        fetchStatus: _floorsConfig.fetchStatus
      };
    });
  });
}
function pickRandomModel(modelGroups, weightSum) {
  // we loop through the models subtracting the current model weight from our random number
  // once we are at or below zero, we return the associated model
  var random = Math.floor(Math.random() * weightSum + 1);

  for (var i = 0; i < modelGroups.length; i++) {
    random -= modelGroups[i].modelWeight;

    if (random <= 0) {
      return modelGroups[i];
    }
  }
}
;
/**
 * @summary Updates the adUnits accordingly and returns the necessary floorsData for the current auction
 */

function createFloorsDataForAuction(adUnits, auctionId) {
  var resolvedFloorsData = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepClone"](_floorsConfig); // if using schema 2 pick a model here:

  if (__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](resolvedFloorsData, 'data.floorsSchemaVersion') === 2) {
    // merge the models specific stuff into the top level data settings (now it looks like floorsSchemaVersion 1!)
    var _resolvedFloorsData$d = resolvedFloorsData.data,
        modelGroups = _resolvedFloorsData$d.modelGroups,
        rest = _objectWithoutProperties(_resolvedFloorsData$d, ["modelGroups"]);

    resolvedFloorsData.data = _extends(rest, pickRandomModel(modelGroups, rest.modelWeightSum));
  } // if we do not have a floors data set, we will try to use data set on adUnits


  var useAdUnitData = Object.keys(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](resolvedFloorsData, 'data.values') || {}).length === 0;

  if (useAdUnitData) {
    resolvedFloorsData.data = getFloorDataFromAdUnits(adUnits);
  } else {
    resolvedFloorsData.data = getFloorsDataForAuction(resolvedFloorsData.data);
  } // if we still do not have a valid floor data then floors is not on for this auction, so skip


  if (Object.keys(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](resolvedFloorsData, 'data.values') || {}).length === 0) {
    resolvedFloorsData.skipped = true;
  } else {
    // determine the skip rate now
    var auctionSkipRate = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["getParameterByName"]('pbjs_skipRate') || resolvedFloorsData.skipRate;
    var isSkipped = Math.random() * 100 < parseFloat(auctionSkipRate);
    resolvedFloorsData.skipped = isSkipped;
  } // add floorData to bids


  updateAdUnitsForAuction(adUnits, resolvedFloorsData, auctionId);
  return resolvedFloorsData;
}
/**
 * @summary This is the function which will be called to exit our module and continue the auction.
 */

function continueAuction(hookConfig) {
  // only run if hasExited
  if (!hookConfig.hasExited) {
    // if this current auction is still fetching, remove it from the _delayedAuctions
    _delayedAuctions = _delayedAuctions.filter(function (auctionConfig) {
      return auctionConfig.timer !== hookConfig.timer;
    }); // We need to know the auctionId at this time. So we will use the passed in one or generate and set it ourselves

    hookConfig.reqBidsConfigObj.auctionId = hookConfig.reqBidsConfigObj.auctionId || __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["generateUUID"](); // now we do what we need to with adUnits and save the data object to be used for getFloor and enforcement calls

    _floorDataForAuction[hookConfig.reqBidsConfigObj.auctionId] = createFloorsDataForAuction(hookConfig.reqBidsConfigObj.adUnits || Object(__WEBPACK_IMPORTED_MODULE_0__src_prebidGlobal_js__["a" /* getGlobal */])().adUnits, hookConfig.reqBidsConfigObj.auctionId);
    hookConfig.nextFn.apply(hookConfig.context, [hookConfig.reqBidsConfigObj]);
    hookConfig.hasExited = true;
  }
}

function validateSchemaFields(fields) {
  if (Array.isArray(fields) && fields.length > 0 && fields.every(function (field) {
    return allowedFields.indexOf(field) !== -1;
  })) {
    return true;
  }

  __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"]("".concat(MODULE_NAME, ": Fields recieved do not match allowed fields"));
  return false;
}

function isValidRule(key, floor, numFields, delimiter) {
  if (typeof key !== 'string' || key.split(delimiter).length !== numFields) {
    return false;
  }

  return typeof floor === 'number';
}

function validateRules(floorsData, numFields, delimiter) {
  if (_typeof(floorsData.values) !== 'object') {
    return false;
  } // if an invalid rule exists we remove it


  floorsData.values = Object.keys(floorsData.values).reduce(function (filteredRules, key) {
    if (isValidRule(key, floorsData.values[key], numFields, delimiter)) {
      filteredRules[key] = floorsData.values[key];
    }

    return filteredRules;
  }, {}); // rules is only valid if at least one rule remains

  return Object.keys(floorsData.values).length > 0;
}

function modelIsValid(model) {
  // schema.fields has only allowed attributes
  if (!validateSchemaFields(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](model, 'schema.fields'))) {
    return false;
  }

  return validateRules(model, model.schema.fields.length, model.schema.delimiter || '|');
}
/**
 * @summary Mapping of floor schema version to it's corresponding validation
 */


var floorsSchemaValidation = {
  1: function _(data) {
    return modelIsValid(data);
  },
  2: function _(data) {
    // model groups should be an array with at least one element
    if (!Array.isArray(data.modelGroups) || data.modelGroups.length === 0) {
      return false;
    } // every model should have valid schema, as well as an accompanying modelWeight


    data.modelWeightSum = 0;
    return data.modelGroups.every(function (model) {
      if (typeof model.modelWeight === 'number' && modelIsValid(model)) {
        data.modelWeightSum += model.modelWeight;
        return true;
      }

      return false;
    });
  }
};
/**
 * @summary Fields array should have at least one entry and all should match allowed fields
 * Each rule in the values array should have a 'key' and 'floor' param
 * And each 'key' should have the correct number of 'fields' after splitting
 * on the delim. If rule does not match remove it. return if still at least 1 rule
 */

function isFloorsDataValid(floorsData) {
  if (_typeof(floorsData) !== 'object') {
    return false;
  }

  floorsData.floorsSchemaVersion = floorsData.floorsSchemaVersion || 1;

  if (typeof floorsSchemaValidation[floorsData.floorsSchemaVersion] !== 'function') {
    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"]("".concat(MODULE_NAME, ": Unknown floorsSchemaVersion: "), floorsData.floorsSchemaVersion);
    return false;
  }

  return floorsSchemaValidation[floorsData.floorsSchemaVersion](floorsData);
}
/**
 * @summary This function updates the global Floors Data field based on the new one passed in if it is valid
 */

function parseFloorData(floorsData, location) {
  if (floorsData && _typeof(floorsData) === 'object' && isFloorsDataValid(floorsData)) {
    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logInfo"]("".concat(MODULE_NAME, ": A ").concat(location, " set the auction floor data set to "), floorsData);
    return _objectSpread(_objectSpread({}, floorsData), {}, {
      location: location
    });
  }

  __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"]("".concat(MODULE_NAME, ": The floors data did not contain correct values"), floorsData);
}
/**
 *
 * @param {Object} reqBidsConfigObj required; This is the same param that's used in pbjs.requestBids.
 * @param {function} fn required; The next function in the chain, used by hook.js
 */

function requestBidsHook(fn, reqBidsConfigObj) {
  // preserves all module related variables for the current auction instance (used primiarily for concurrent auctions)
  var hookConfig = {
    reqBidsConfigObj: reqBidsConfigObj,
    context: this,
    nextFn: fn,
    haveExited: false,
    timer: null
  }; // If auction delay > 0 AND we are fetching -> Then wait until it finishes

  if (_floorsConfig.auctionDelay > 0 && fetching) {
    hookConfig.timer = setTimeout(function () {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logWarn"]("".concat(MODULE_NAME, ": Fetch attempt did not return in time for auction"));
      _floorsConfig.fetchStatus = 'timeout';
      continueAuction(hookConfig);
    }, _floorsConfig.auctionDelay);

    _delayedAuctions.push(hookConfig);
  } else {
    continueAuction(hookConfig);
  }
}
/**
 * @summary If an auction was queued to be delayed (waiting for a fetch) then this function will resume
 * those delayed auctions when delay is hit or success return or fail return
 */

function resumeDelayedAuctions() {
  _delayedAuctions.forEach(function (auctionConfig) {
    // clear the timeout
    clearTimeout(auctionConfig.timer);
    continueAuction(auctionConfig);
  });

  _delayedAuctions = [];
}
/**
 * This function handles the ajax response which comes from the user set URL to fetch floors data from
 * @param {object} fetchResponse The floors data response which came back from the url configured in config.floors
 */


function handleFetchResponse(fetchResponse) {
  fetching = false;
  _floorsConfig.fetchStatus = 'success';
  var floorResponse;

  try {
    floorResponse = JSON.parse(fetchResponse);
  } catch (ex) {
    floorResponse = fetchResponse;
  } // Update the global floors object according to the fetched data


  var fetchData = parseFloorData(floorResponse, 'fetch');

  if (fetchData) {
    // set .data to it
    _floorsConfig.data = fetchData; // set skipRate override if necessary

    _floorsConfig.skipRate = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["isNumber"](fetchData.skipRate) ? fetchData.skipRate : _floorsConfig.skipRate;
    _floorsConfig.floorProvider = fetchData.floorProvider || _floorsConfig.floorProvider;
  } // if any auctions are waiting for fetch to finish, we need to continue them!


  resumeDelayedAuctions();
}

function handleFetchError(status) {
  fetching = false;
  _floorsConfig.fetchStatus = 'error';
  __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"]("".concat(MODULE_NAME, ": Fetch errored with: "), status); // if any auctions are waiting for fetch to finish, we need to continue them!

  resumeDelayedAuctions();
}
/**
 * This function handles sending and recieving the AJAX call for a floors fetch
 * @param {object} floorsConfig the floors config coming from setConfig
 */


function generateAndHandleFetch(floorEndpoint) {
  // if a fetch url is defined and one is not already occuring, fire it!
  if (floorEndpoint.url && !fetching) {
    // default to GET and we only support GET for now
    var requestMethod = floorEndpoint.method || 'GET';

    if (requestMethod !== 'GET') {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"]("".concat(MODULE_NAME, ": 'GET' is the only request method supported at this time!"));
    } else {
      ajax(floorEndpoint.url, {
        success: handleFetchResponse,
        error: handleFetchError
      }, null, {
        method: 'GET'
      });
      fetching = true;
    }
  } else if (fetching) {
    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logWarn"]("".concat(MODULE_NAME, ": A fetch is already occuring. Skipping."));
  }
}
/**
 * @summary Updates our allowedFields and fieldMatchingFunctions with the publisher defined new ones
 */

function addFieldOverrides(overrides) {
  Object.keys(overrides).forEach(function (override) {
    // we only add it if it is not already in the allowed fields and if the passed in value is a function
    if (allowedFields.indexOf(override) === -1 && typeof overrides[override] === 'function') {
      allowedFields.push(override);
      fieldMatchingFunctions[override] = overrides[override];
    }
  });
}
/**
 * @summary This is the function which controls what happens during a pbjs.setConfig({...floors: {}}) is called
 */


function handleSetFloorsConfig(config) {
  _floorsConfig = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["pick"](config, ['enabled', function (enabled) {
    return enabled !== false;
  }, // defaults to true
  'auctionDelay', function (auctionDelay) {
    return auctionDelay || 0;
  }, 'floorProvider', function (floorProvider) {
    return __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](config, 'data.floorProvider', floorProvider);
  }, 'endpoint', function (endpoint) {
    return endpoint || {};
  }, 'skipRate', function () {
    return !isNaN(__WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](config, 'data.skipRate')) ? config.data.skipRate : config.skipRate || 0;
  }, 'enforcement', function (enforcement) {
    return __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["pick"](enforcement || {}, ['enforceJS', function (enforceJS) {
      return enforceJS !== false;
    }, // defaults to true
    'enforcePBS', function (enforcePBS) {
      return enforcePBS === true;
    }, // defaults to false
    'floorDeals', function (floorDeals) {
      return floorDeals === true;
    }, // defaults to false
    'bidAdjustment', function (bidAdjustment) {
      return bidAdjustment !== false;
    } // defaults to true
    ]);
  }, 'additionalSchemaFields', function (additionalSchemaFields) {
    return _typeof(additionalSchemaFields) === 'object' && Object.keys(additionalSchemaFields).length > 0 ? addFieldOverrides(additionalSchemaFields) : undefined;
  }, 'data', function (data) {
    return data && parseFloorData(data, 'setConfig') || _floorsConfig.data;
  } // do not overwrite if passed in data not valid
  ]); // if enabled then do some stuff

  if (_floorsConfig.enabled) {
    // handle the floors fetch
    generateAndHandleFetch(_floorsConfig.endpoint);

    if (!addedFloorsHook) {
      // register hooks / listening events
      // when auction finishes remove it's associated floor data after 3 seconds so we stil have it for latent responses
      __WEBPACK_IMPORTED_MODULE_4__src_events_js___default.a.on(__WEBPACK_IMPORTED_MODULE_5__src_constants_json___default.a.EVENTS.AUCTION_END, function (args) {
        setTimeout(function () {
          return delete _floorDataForAuction[args.auctionId];
        }, 3000);
      }); // we want our hooks to run after the currency hooks

      Object(__WEBPACK_IMPORTED_MODULE_0__src_prebidGlobal_js__["a" /* getGlobal */])().requestBids.before(requestBidsHook, 50); // if user has debug on then we want to allow the debugging module to run before this, assuming they are testing priceFloors
      // debugging is currently set at 5 priority

      Object(__WEBPACK_IMPORTED_MODULE_6__src_hook_js__["a" /* getHook */])('addBidResponse').before(addBidResponseHook, __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["debugTurnedOn"]() ? 4 : 50);
      addedFloorsHook = true;
    }
  } else {
    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logInfo"]("".concat(MODULE_NAME, ": Turning off module"));
    _floorsConfig = {};
    _floorDataForAuction = {};
    Object(__WEBPACK_IMPORTED_MODULE_6__src_hook_js__["a" /* getHook */])('addBidResponse').getHooks({
      hook: addBidResponseHook
    }).remove();
    Object(__WEBPACK_IMPORTED_MODULE_0__src_prebidGlobal_js__["a" /* getGlobal */])().requestBids.getHooks({
      hook: requestBidsHook
    }).remove();
    addedFloorsHook = false;
  }
}
/**
 * @summary Analytics adapters especially need context of what the floors module is doing in order
 * to best create informed models. This function attaches necessary information to the bidResponse object for processing
 */

function addFloorDataToBid(floorData, floorInfo, bid, adjustedCpm) {
  bid.floorData = {
    floorValue: floorInfo.matchingFloor,
    floorRule: floorInfo.matchingRule,
    floorCurrency: floorData.data.currency,
    cpmAfterAdjustments: adjustedCpm,
    enforcements: _objectSpread({}, floorData.enforcement),
    matchedFields: {}
  };
  floorData.data.schema.fields.forEach(function (field, index) {
    var matchedValue = floorInfo.matchingData.split(floorData.data.schema.delimiter)[index];
    bid.floorData.matchedFields[field] = matchedValue;
  });
}
/**
 * @summary takes the enforcement flags and the bid itself and determines if it should be floored
 */


function shouldFloorBid(floorData, floorInfo, bid) {
  var enforceJS = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](floorData, 'enforcement.enforceJS') !== false;
  var shouldFloorDeal = __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["deepAccess"](floorData, 'enforcement.floorDeals') === true || !bid.dealId;
  var bidBelowFloor = bid.floorData.cpmAfterAdjustments < floorInfo.matchingFloor;
  return enforceJS && bidBelowFloor && shouldFloorDeal;
}
/**
 * @summary The main driving force of floors. On bidResponse we hook in and intercept bidResponses.
 * And if the rule we find determines a bid should be floored we will do so.
 */


function addBidResponseHook(fn, adUnitCode, bid) {
  var floorData = _floorDataForAuction[this.bidderRequest.auctionId]; // if no floor data or associated bidRequest then bail

  var matchingBidRequest = __WEBPACK_IMPORTED_MODULE_8_core_js_pure_features_array_find_js___default()(this.bidderRequest.bids, function (bidRequest) {
    return bidRequest.bidId && bidRequest.bidId === bid.requestId;
  });

  if (!floorData || !bid || floorData.skipped || !matchingBidRequest) {
    return fn.call(this, adUnitCode, bid);
  } // get the matching rule


  var floorInfo = getFirstMatchingFloor(floorData.data, _objectSpread({}, matchingBidRequest), _objectSpread(_objectSpread({}, bid), {}, {
    size: [bid.width, bid.height]
  }));

  if (!floorInfo.matchingFloor) {
    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logWarn"]("".concat(MODULE_NAME, ": unable to determine a matching price floor for bidResponse"), bid);
    return fn.call(this, adUnitCode, bid);
  } // determine the base cpm to use based on if the currency matches the floor currency


  var adjustedCpm;
  var floorCurrency = floorData.data.currency.toUpperCase();
  var bidResponseCurrency = bid.currency || 'USD'; // if an adapter does not set a bid currency and currency module not on it may come in as undefined

  if (floorCurrency === bidResponseCurrency.toUpperCase()) {
    adjustedCpm = bid.cpm;
  } else if (bid.originalCurrency && floorCurrency === bid.originalCurrency.toUpperCase()) {
    adjustedCpm = bid.originalCpm;
  } else {
    try {
      adjustedCpm = Object(__WEBPACK_IMPORTED_MODULE_0__src_prebidGlobal_js__["a" /* getGlobal */])().convertCurrency(bid.cpm, bidResponseCurrency.toUpperCase(), floorCurrency);
    } catch (err) {
      __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logError"]("".concat(MODULE_NAME, ": Unable do get currency conversion for bidResponse to Floor Currency. Do you have Currency module enabled? ").concat(bid));
      return fn.call(this, adUnitCode, bid);
    }
  } // ok we got the bid response cpm in our desired currency. Now we need to run the bidders CPMAdjustment function if it exists


  adjustedCpm = getBiddersCpmAdjustment(bid.bidderCode, adjustedCpm); // add necessary data information for analytics adapters / floor providers would possibly need

  addFloorDataToBid(floorData, floorInfo, bid, adjustedCpm); // now do the compare!

  if (shouldFloorBid(floorData, floorInfo, bid)) {
    // bid fails floor -> throw it out
    // create basic bid no-bid with necessary data fro analytics adapters
    var flooredBid = Object(__WEBPACK_IMPORTED_MODULE_7__src_bidfactory_js__["a" /* createBid */])(__WEBPACK_IMPORTED_MODULE_5__src_constants_json___default.a.STATUS.NO_BID, matchingBidRequest);

    _extends(flooredBid, __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["pick"](bid, ['floorData', 'width', 'height', 'mediaType', 'currency', 'originalCpm', 'originalCurrency', 'getCpmInNewCurrency']));

    flooredBid.status = __WEBPACK_IMPORTED_MODULE_5__src_constants_json___default.a.BID_STATUS.BID_REJECTED; // if floor not met update bid with 0 cpm so it is not included downstream and marked as no-bid

    flooredBid.cpm = 0;
    __WEBPACK_IMPORTED_MODULE_2__src_utils_js__["logWarn"]("".concat(MODULE_NAME, ": ").concat(flooredBid.bidderCode, "'s Bid Response for ").concat(adUnitCode, " was rejected due to floor not met"), bid);
    return fn.call(this, adUnitCode, flooredBid);
  }

  return fn.call(this, adUnitCode, bid);
}
__WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('floors', function (config) {
  return handleSetFloorsConfig(config.floors);
});

/***/ })

},[596]);