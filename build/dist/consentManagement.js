pbjsChunk([248],{

/***/ 337:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(338);


/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allowAuction", function() { return allowAuction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userCMP", function() { return userCMP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "consentTimeout", function() { return consentTimeout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gdprScope", function() { return gdprScope; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticConsentData", function() { return staticConsentData; });
/* harmony export (immutable) */ __webpack_exports__["requestBidsHook"] = requestBidsHook;
/* harmony export (immutable) */ __webpack_exports__["resetConsentData"] = resetConsentData;
/* harmony export (immutable) */ __webpack_exports__["setConsentConfig"] = setConsentConfig;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_string_includes_js__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_string_includes_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_string_includes_js__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * This module adds GDPR consentManagement support to prebid.js.  It interacts with
 * supported CMPs (Consent Management Platforms) to grab the user's consent information
 * and make it available for any GDPR supported adapters to read/pass this information to
 * their system.
 */





var DEFAULT_CMP = 'iab';
var DEFAULT_CONSENT_TIMEOUT = 10000;
var DEFAULT_ALLOW_AUCTION_WO_CONSENT = true;
var allowAuction = {
  value: DEFAULT_ALLOW_AUCTION_WO_CONSENT,
  definedInConfig: false
};
var userCMP;
var consentTimeout;
var gdprScope;
var staticConsentData;
var cmpVersion = 0;
var consentData;
var addedConsentHook = false; // add new CMPs here, with their dedicated lookup function

var cmpCallMap = {
  'iab': lookupIabConsent,
  'static': lookupStaticConsentData
};
/**
 * This function reads the consent string from the config to obtain the consent information of the user.
 * @param {function(string)} cmpSuccess acts as a success callback when the value is read from config; pass along consentObject (string) from CMP
 * @param {function(string)} cmpError acts as an error callback while interacting with the config string; pass along an error message (string)
 * @param {object} hookConfig contains module related variables (see comment in requestBidsHook function)
 */

function lookupStaticConsentData(cmpSuccess, cmpError, hookConfig) {
  cmpSuccess(staticConsentData, hookConfig);
}
/**
 * This function handles interacting with an IAB compliant CMP to obtain the consent information of the user.
 * Given the async nature of the CMP's API, we pass in acting success/error callback functions to exit this function
 * based on the appropriate result.
 * @param {function(string)} cmpSuccess acts as a success callback when CMP returns a value; pass along consentObject (string) from CMP
 * @param {function(string)} cmpError acts as an error callback while interacting with CMP; pass along an error message (string)
 * @param {object} hookConfig contains module related variables (see comment in requestBidsHook function)
 */


function lookupIabConsent(cmpSuccess, cmpError, hookConfig) {
  function findCMP() {
    var f = window;
    var cmpFrame;
    var cmpFunction;

    while (!cmpFrame) {
      try {
        if (typeof f.__tcfapi === 'function' || typeof f.__cmp === 'function') {
          if (typeof f.__tcfapi === 'function') {
            cmpVersion = 2;
            cmpFunction = f.__tcfapi;
          } else {
            cmpVersion = 1;
            cmpFunction = f.__cmp;
          }

          cmpFrame = f;
          break;
        }
      } catch (e) {} // need separate try/catch blocks due to the exception errors thrown when trying to check for a frame that doesn't exist in 3rd party env


      try {
        if (f.frames['__tcfapiLocator']) {
          cmpVersion = 2;
          cmpFrame = f;
          break;
        }
      } catch (e) {}

      try {
        if (f.frames['__cmpLocator']) {
          cmpVersion = 1;
          cmpFrame = f;
          break;
        }
      } catch (e) {}

      if (f === window.top) break;
      f = f.parent;
    }

    return {
      cmpFrame: cmpFrame,
      cmpFunction: cmpFunction
    };
  }

  function v2CmpResponseCallback(tcfData, success) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('Received a response from CMP', tcfData);

    if (success) {
      if (tcfData.eventStatus === 'tcloaded' || tcfData.eventStatus === 'useractioncomplete') {
        cmpSuccess(tcfData, hookConfig);
      } else if (tcfData.eventStatus === 'cmpuishown' && tcfData.tcString && tcfData.purposeOneTreatment === true) {
        cmpSuccess(tcfData, hookConfig);
      }
    } else {
      cmpError('CMP unable to register callback function.  Please check CMP setup.', hookConfig);
    }
  }

  function handleV1CmpResponseCallbacks() {
    var cmpResponse = {};

    function afterEach() {
      if (cmpResponse.getConsentData && cmpResponse.getVendorConsents) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('Received all requested responses from CMP', cmpResponse);
        cmpSuccess(cmpResponse, hookConfig);
      }
    }

    return {
      consentDataCallback: function consentDataCallback(consentResponse) {
        cmpResponse.getConsentData = consentResponse;
        afterEach();
      },
      vendorConsentsCallback: function vendorConsentsCallback(consentResponse) {
        cmpResponse.getVendorConsents = consentResponse;
        afterEach();
      }
    };
  }

  var v1CallbackHandler = handleV1CmpResponseCallbacks();
  var cmpCallbacks = {};

  var _findCMP = findCMP(),
      cmpFrame = _findCMP.cmpFrame,
      cmpFunction = _findCMP.cmpFunction;

  if (!cmpFrame) {
    return cmpError('CMP not found.', hookConfig);
  } // to collect the consent information from the user, we perform two calls to the CMP in parallel:
  // first to collect the user's consent choices represented in an encoded string (via getConsentData)
  // second to collect the user's full unparsed consent information (via getVendorConsents)
  // the following code also determines where the CMP is located and uses the proper workflow to communicate with it:
  // check to see if CMP is found on the same window level as prebid and call it directly if so
  // check to see if prebid is in a safeframe (with CMP support)
  // else assume prebid may be inside an iframe and use the IAB CMP locator code to see if CMP's located in a higher parent window. this works in cross domain iframes
  // if the CMP is not found, the iframe function will call the cmpError exit callback to abort the rest of the CMP workflow


  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isFn"](cmpFunction)) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('Detected CMP API is directly accessible, calling it now...');

    if (cmpVersion === 1) {
      cmpFunction('getConsentData', null, v1CallbackHandler.consentDataCallback);
      cmpFunction('getVendorConsents', null, v1CallbackHandler.vendorConsentsCallback);
    } else if (cmpVersion === 2) {
      cmpFunction('addEventListener', cmpVersion, v2CmpResponseCallback);
    }
  } else if (cmpVersion === 1 && inASafeFrame() && typeof window.$sf.ext.cmp === 'function') {
    // this safeframe workflow is only supported with TCF v1 spec; the v2 recommends to use the iframe postMessage route instead (even if you are in a safeframe).
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('Detected Prebid.js is encased in a SafeFrame and CMP is registered, calling it now...');
    callCmpWhileInSafeFrame('getConsentData', v1CallbackHandler.consentDataCallback);
    callCmpWhileInSafeFrame('getVendorConsents', v1CallbackHandler.vendorConsentsCallback);
  } else {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('Detected CMP is outside the current iframe where Prebid.js is located, calling it now...');

    if (cmpVersion === 1) {
      callCmpWhileInIframe('getConsentData', cmpFrame, v1CallbackHandler.consentDataCallback);
      callCmpWhileInIframe('getVendorConsents', cmpFrame, v1CallbackHandler.vendorConsentsCallback);
    } else if (cmpVersion === 2) {
      callCmpWhileInIframe('addEventListener', cmpFrame, v2CmpResponseCallback);
    }
  }

  function inASafeFrame() {
    return !!(window.$sf && window.$sf.ext);
  }

  function callCmpWhileInSafeFrame(commandName, callback) {
    function sfCallback(msgName, data) {
      if (msgName === 'cmpReturn') {
        var responseObj = commandName === 'getConsentData' ? data.vendorConsentData : data.vendorConsents;
        callback(responseObj);
      }
    } // find sizes from adUnits object


    var adUnits = hookConfig.adUnits;
    var width = 1;
    var height = 1;

    if (Array.isArray(adUnits) && adUnits.length > 0) {
      var sizes = __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["getAdUnitSizes"](adUnits[0]);
      width = sizes[0][0];
      height = sizes[0][1];
    }

    window.$sf.ext.register(width, height, sfCallback);
    window.$sf.ext.cmp(commandName);
  }

  function callCmpWhileInIframe(commandName, cmpFrame, moduleCallback) {
    var apiName = cmpVersion === 2 ? '__tcfapi' : '__cmp';
    /* Setup up a __cmp function to do the postMessage and stash the callback.
      This function behaves (from the caller's perspective identicially to the in-frame __cmp call */

    window[apiName] = function (cmd, arg, callback) {
      var callId = Math.random() + '';
      var callName = "".concat(apiName, "Call");

      var msg = _defineProperty({}, callName, {
        command: cmd,
        parameter: arg,
        callId: callId
      });

      if (cmpVersion !== 1) msg[callName].version = cmpVersion;
      cmpCallbacks[callId] = callback;
      cmpFrame.postMessage(msg, '*');
    };
    /** when we get the return message, call the stashed callback */


    window.addEventListener('message', readPostMessageResponse, false); // call CMP

    window[apiName](commandName, null, moduleCallback);

    function readPostMessageResponse(event) {
      var cmpDataPkgName = "".concat(apiName, "Return");
      var json = typeof event.data === 'string' && __WEBPACK_IMPORTED_MODULE_4_core_js_pure_features_string_includes_js___default()(event.data, cmpDataPkgName) ? JSON.parse(event.data) : event.data;

      if (json[cmpDataPkgName] && json[cmpDataPkgName].callId) {
        var payload = json[cmpDataPkgName]; // TODO - clean up this logic (move listeners?); we have duplicate messages responses because 2 eventlisteners are active from the 2 cmp requests running in parallel

        if (typeof cmpCallbacks[payload.callId] !== 'undefined') {
          cmpCallbacks[payload.callId](payload.returnValue, payload.success);
        }
      }
    }
  }
}
/**
 * If consentManagement module is enabled (ie included in setConfig), this hook function will attempt to fetch the
 * user's encoded consent string from the supported CMP.  Once obtained, the module will store this
 * data as part of a gdprConsent object which gets transferred to adapterManager's gdprDataHandler object.
 * This information is later added into the bidRequest object for any supported adapters to read/pass along to their system.
 * @param {object} reqBidsConfigObj required; This is the same param that's used in pbjs.requestBids.
 * @param {function} fn required; The next function in the chain, used by hook.js
 */


function requestBidsHook(fn, reqBidsConfigObj) {
  // preserves all module related variables for the current auction instance (used primiarily for concurrent auctions)
  var hookConfig = {
    context: this,
    args: [reqBidsConfigObj],
    nextFn: fn,
    adUnits: reqBidsConfigObj.adUnits || pbjs.adUnits,
    bidsBackHandler: reqBidsConfigObj.bidsBackHandler,
    haveExited: false,
    timer: null
  }; // in case we already have consent (eg during bid refresh)

  if (consentData) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('User consent information already known.  Pulling internally stored information...');
    return exitModule(null, hookConfig);
  }

  if (!__WEBPACK_IMPORTED_MODULE_3_core_js_pure_features_array_includes_js___default()(Object.keys(cmpCallMap), userCMP)) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("CMP framework (".concat(userCMP, ") is not a supported framework.  Aborting consentManagement module and resuming auction."));
    return hookConfig.nextFn.apply(hookConfig.context, hookConfig.args);
  }

  cmpCallMap[userCMP].call(this, processCmpData, cmpFailed, hookConfig); // only let this code run if module is still active (ie if the callbacks used by CMPs haven't already finished)

  if (!hookConfig.haveExited) {
    if (consentTimeout === 0) {
      processCmpData(undefined, hookConfig);
    } else {
      hookConfig.timer = setTimeout(cmpTimedOut.bind(null, hookConfig), consentTimeout);
    }
  }
}
/**
 * This function checks the consent data provided by CMP to ensure it's in an expected state.
 * If it's bad, we exit the module depending on config settings.
 * If it's good, then we store the value and exits the module.
 * @param {object} consentObject required; object returned by CMP that contains user's consent choices
 * @param {object} hookConfig contains module related variables (see comment in requestBidsHook function)
 */

function processCmpData(consentObject, hookConfig) {
  function checkV1Data(consentObject) {
    var gdprApplies = consentObject && consentObject.getConsentData && consentObject.getConsentData.gdprApplies;
    return !!(typeof gdprApplies !== 'boolean' || gdprApplies === true && !(__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](consentObject.getConsentData.consentData) && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isPlainObject"](consentObject.getVendorConsents) && Object.keys(consentObject.getVendorConsents).length > 1));
  }

  function checkV2Data() {
    // if CMP does not respond with a gdprApplies boolean, use defaultGdprScope (gdprScope)
    var gdprApplies = consentObject && typeof consentObject.gdprApplies === 'boolean' ? consentObject.gdprApplies : gdprScope;
    var tcString = consentObject && consentObject.tcString;
    return !!(typeof gdprApplies !== 'boolean' || gdprApplies === true && !__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](tcString));
  } // do extra things for static config


  if (userCMP === 'static') {
    cmpVersion = consentObject.getConsentData ? 1 : consentObject.getTCData ? 2 : 0; // remove extra layer in static v2 data object so it matches normal v2 CMP object for processing step

    if (cmpVersion === 2) {
      consentObject = consentObject.getTCData;
    }
  } // determine which set of checks to run based on cmpVersion


  var checkFn = cmpVersion === 1 ? checkV1Data : cmpVersion === 2 ? checkV2Data : null; // Raise deprecation warning if 'allowAuctionWithoutConsent' is used with TCF 2.

  if (allowAuction.definedInConfig && cmpVersion === 2) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("'allowAuctionWithoutConsent' ignored for TCF 2");
  } else if (!allowAuction.definedInConfig && cmpVersion === 1) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]("'allowAuctionWithoutConsent' using system default: (".concat(DEFAULT_ALLOW_AUCTION_WO_CONSENT, ")."));
  }

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isFn"](checkFn)) {
    if (checkFn(consentObject)) {
      cmpFailed("CMP returned unexpected value during lookup process.", hookConfig, consentObject);
    } else {
      clearTimeout(hookConfig.timer);
      storeConsentData(consentObject);
      exitModule(null, hookConfig);
    }
  } else {
    cmpFailed('Unable to derive CMP version to process data.  Consent object does not conform to TCF v1 or v2 specs.', hookConfig, consentObject);
  }
}
/**
 * General timeout callback when interacting with CMP takes too long.
 */


function cmpTimedOut(hookConfig) {
  cmpFailed('CMP workflow exceeded timeout threshold.', hookConfig);
}
/**
 * This function contains the controlled steps to perform when there's a problem with CMP.
 * @param {string} errMsg required; should be a short descriptive message for why the failure/issue happened.
 * @param {object} hookConfig contains module related variables (see comment in requestBidsHook function)
 * @param {object} extraArgs contains additional data that's passed along in the error/warning messages for easier debugging
*/


function cmpFailed(errMsg, hookConfig, extraArgs) {
  clearTimeout(hookConfig.timer); // still set the consentData to undefined when there is a problem as per config options

  if (allowAuction.value && cmpVersion === 1) {
    storeConsentData(undefined);
  }

  exitModule(errMsg, hookConfig, extraArgs);
}
/**
 * Stores CMP data locally in module and then invokes gdprDataHandler.setConsentData() to make information available in adaptermanger.js for later in the auction
 * @param {object} cmpConsentObject required; an object representing user's consent choices (can be undefined in certain use-cases for this function only)
 */


function storeConsentData(cmpConsentObject) {
  if (cmpVersion === 1) {
    consentData = {
      consentString: cmpConsentObject ? cmpConsentObject.getConsentData.consentData : undefined,
      vendorData: cmpConsentObject ? cmpConsentObject.getVendorConsents : undefined,
      gdprApplies: cmpConsentObject ? cmpConsentObject.getConsentData.gdprApplies : gdprScope
    };
  } else {
    consentData = {
      consentString: cmpConsentObject ? cmpConsentObject.tcString : undefined,
      vendorData: cmpConsentObject || undefined,
      gdprApplies: cmpConsentObject && typeof cmpConsentObject.gdprApplies === 'boolean' ? cmpConsentObject.gdprApplies : gdprScope
    };
  }

  consentData.apiVersion = cmpVersion;
  __WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__["gdprDataHandler"].setConsentData(consentData);
}
/**
 * This function handles the exit logic for the module.
 * While there are several paths in the module's logic to call this function, we only allow 1 of the 3 potential exits to happen before suppressing others.
 *
 * We prevent multiple exits to avoid conflicting messages in the console depending on certain scenarios.
 * One scenario could be auction was canceled due to timeout with CMP being reached.
 * While the timeout is the accepted exit and runs first, the CMP's callback still tries to process the user's data (which normally leads to a good exit).
 * In this case, the good exit will be suppressed since we already decided to cancel the auction.
 *
 * Three exit paths are:
 * 1. good exit where auction runs (CMP data is processed normally).
 * 2. bad exit but auction still continues (warning message is logged, CMP data is undefined and still passed along).
 * 3. bad exit with auction canceled (error message is logged).
 * @param {string} errMsg optional; only to be used when there was a 'bad' exit.  String is a descriptive message for the failure/issue encountered.
 * @param {object} hookConfig contains module related variables (see comment in requestBidsHook function)
 * @param {object} extraArgs contains additional data that's passed along in the error/warning messages for easier debugging
 */


function exitModule(errMsg, hookConfig, extraArgs) {
  if (hookConfig.haveExited === false) {
    hookConfig.haveExited = true;
    var context = hookConfig.context;
    var args = hookConfig.args;
    var nextFn = hookConfig.nextFn;

    if (errMsg) {
      if (allowAuction.value && cmpVersion === 1) {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"](errMsg + " 'allowAuctionWithoutConsent' activated.", extraArgs);
        nextFn.apply(context, args);
      } else {
        __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"](errMsg + ' Canceling auction as per consentManagement config.', extraArgs);

        if (typeof hookConfig.bidsBackHandler === 'function') {
          hookConfig.bidsBackHandler();
        } else {
          __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]('Error executing bidsBackHandler');
        }
      }
    } else {
      nextFn.apply(context, args);
    }
  }
}
/**
 * Simply resets the module's consentData variable back to undefined, mainly for testing purposes
 */


function resetConsentData() {
  consentData = undefined;
  userCMP = undefined;
  cmpVersion = 0;
  __WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__["gdprDataHandler"].setConsentData(null);
}
/**
 * A configuration function that initializes some module variables, as well as add a hook into the requestBids function
 * @param {{cmp:string, timeout:number, allowAuctionWithoutConsent:boolean, defaultGdprScope:boolean}} config required; consentManagement module config settings; cmp (string), timeout (int), allowAuctionWithoutConsent (boolean)
 */

function setConsentConfig(config) {
  // if `config.gdpr` or `config.usp` exist, assume new config format.
  // else for backward compatability, just use `config`
  config = config.gdpr || config.usp ? config.gdpr : config;

  if (!config || _typeof(config) !== 'object') {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('consentManagement config not defined, exiting consent manager');
    return;
  }

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](config.cmpApi)) {
    userCMP = config.cmpApi;
  } else {
    userCMP = DEFAULT_CMP;
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]("consentManagement config did not specify cmp.  Using system default setting (".concat(DEFAULT_CMP, ")."));
  }

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isNumber"](config.timeout)) {
    consentTimeout = config.timeout;
  } else {
    consentTimeout = DEFAULT_CONSENT_TIMEOUT;
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]("consentManagement config did not specify timeout.  Using system default setting (".concat(DEFAULT_CONSENT_TIMEOUT, ")."));
  }

  if (typeof config.allowAuctionWithoutConsent === 'boolean') {
    allowAuction.value = config.allowAuctionWithoutConsent;
    allowAuction.definedInConfig = true;
  } // if true, then gdprApplies should be set to true


  gdprScope = config.defaultGdprScope === true;
  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('consentManagement module has been activated...');

  if (userCMP === 'static') {
    if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isPlainObject"](config.consentData)) {
      staticConsentData = config.consentData;
      consentTimeout = 0;
    } else {
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logError"]("consentManagement config with cmpApi: 'static' did not specify consentData. No consents will be available to adapters.");
    }
  }

  if (!addedConsentHook) {
    pbjs.requestBids.before(requestBidsHook, 50);
  }

  addedConsentHook = true;
}
__WEBPACK_IMPORTED_MODULE_1__src_config_js__["b" /* config */].getConfig('consentManagement', function (config) {
  return setConsentConfig(config.consentManagement);
});

/***/ })

},[337]);