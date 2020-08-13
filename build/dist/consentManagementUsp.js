pbjsChunk([247],{

/***/ 345:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(346);


/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "consentAPI", function() { return consentAPI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "consentTimeout", function() { return consentTimeout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticConsentData", function() { return staticConsentData; });
/* harmony export (immutable) */ __webpack_exports__["requestBidsHook"] = requestBidsHook;
/* harmony export (immutable) */ __webpack_exports__["resetConsentData"] = resetConsentData;
/* harmony export (immutable) */ __webpack_exports__["setConsentConfig"] = setConsentConfig;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__ = __webpack_require__(7);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * This module adds USPAPI (CCPA) consentManagement support to prebid.js. It
 * interacts with supported USP Consent APIs to grab the user's consent
 * information and make it available for any USP (CCPA) supported adapters to
 * read/pass this information to their system.
 */



var DEFAULT_CONSENT_API = 'iab';
var DEFAULT_CONSENT_TIMEOUT = 50;
var USPAPI_VERSION = 1;
var consentAPI;
var consentTimeout;
var staticConsentData;
var consentData;
var addedConsentHook = false; // consent APIs

var uspCallMap = {
  'iab': lookupUspConsent,
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
 * This function handles interacting with an USP compliant consent manager to obtain the consent information of the user.
 * Given the async nature of the USP's API, we pass in acting success/error callback functions to exit this function
 * based on the appropriate result.
 * @param {function(string)} uspSuccess acts as a success callback when USPAPI returns a value; pass along consentObject (string) from USPAPI
 * @param {function(string)} uspError acts as an error callback while interacting with USPAPI; pass along an error message (string)
 * @param {object} hookConfig contains module related variables (see comment in requestBidsHook function)
 */


function lookupUspConsent(uspSuccess, uspError, hookConfig) {
  function handleUspApiResponseCallbacks() {
    var uspResponse = {};

    function afterEach() {
      if (uspResponse.usPrivacy) {
        uspSuccess(uspResponse, hookConfig);
      } else {
        uspError('Unable to get USP consent string.', hookConfig);
      }
    }

    return {
      consentDataCallback: function consentDataCallback(consentResponse, success) {
        if (success && consentResponse.uspString) {
          uspResponse.usPrivacy = consentResponse.uspString;
        }

        afterEach();
      }
    };
  }

  var callbackHandler = handleUspApiResponseCallbacks();
  var uspapiCallbacks = {}; // to collect the consent information from the user, we perform a call to USPAPI
  // to collect the user's consent choices represented as a string (via getUSPData)
  // the following code also determines where the USPAPI is located and uses the proper workflow to communicate with it:
  // - use the USPAPI locator code to see if USP's located in the current window or an ancestor window. This works in friendly or cross domain iframes
  // - if USPAPI is not found, the iframe function will call the uspError exit callback to abort the rest of the USPAPI workflow
  // - try to call the __uspapi() function directly, otherwise use the postMessage() api
  // find the CMP frame/window

  try {
    // try to call __uspapi directly
    window.__uspapi('getUSPData', USPAPI_VERSION, callbackHandler.consentDataCallback);
  } catch (e) {
    // must not have been accessible, try using postMessage() api
    var f = window;
    var uspapiFrame;

    while (!uspapiFrame) {
      try {
        if (f.frames['__uspapiLocator']) uspapiFrame = f;
      } catch (e) {}

      if (f === window.top) break;
      f = f.parent;
    }

    if (!uspapiFrame) {
      return uspError('USP CMP not found.', hookConfig);
    }

    callUspApiWhileInIframe('getUSPData', uspapiFrame, callbackHandler.consentDataCallback);
  }

  function callUspApiWhileInIframe(commandName, uspapiFrame, moduleCallback) {
    /* Setup up a __uspapi function to do the postMessage and stash the callback.
      This function behaves, from the caller's perspective, identicially to the in-frame __uspapi call (although it is not synchronous) */
    window.__uspapi = function (cmd, ver, callback) {
      var callId = Math.random() + '';
      var msg = {
        __uspapiCall: {
          command: cmd,
          version: ver,
          callId: callId
        }
      };
      uspapiCallbacks[callId] = callback;
      uspapiFrame.postMessage(msg, '*');
    };
    /** when we get the return message, call the stashed callback */


    window.addEventListener('message', readPostMessageResponse, false); // call uspapi

    window.__uspapi(commandName, USPAPI_VERSION, uspapiCallback);

    function readPostMessageResponse(event) {
      var res = event && event.data && event.data.__uspapiReturn;

      if (res && res.callId) {
        if (typeof uspapiCallbacks[res.callId] !== 'undefined') {
          uspapiCallbacks[res.callId](res.returnValue, res.success);
          delete uspapiCallbacks[res.callId];
        }
      }
    }

    function uspapiCallback(consentObject, success) {
      window.removeEventListener('message', readPostMessageResponse, false);
      moduleCallback(consentObject, success);
    }
  }
}
/**
 * If consentManagementUSP module is enabled (ie included in setConfig), this hook function will attempt to fetch the
 * user's encoded consent string from the supported USPAPI. Once obtained, the module will store this
 * data as part of a uspConsent object which gets transferred to adapterManager's uspDataHandler object.
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
  };

  if (!uspCallMap[consentAPI]) {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]("USP framework (".concat(consentAPI, ") is not a supported framework. Aborting consentManagement module and resuming auction."));
    return hookConfig.nextFn.apply(hookConfig.context, hookConfig.args);
  }

  uspCallMap[consentAPI].call(this, processUspData, uspapiFailed, hookConfig); // only let this code run if module is still active (ie if the callbacks used by USPs haven't already finished)

  if (!hookConfig.haveExited) {
    if (consentTimeout === 0) {
      processUspData(undefined, hookConfig);
    } else {
      hookConfig.timer = setTimeout(uspapiTimeout.bind(null, hookConfig), consentTimeout);
    }
  }
}
/**
 * This function checks the consent data provided by USPAPI to ensure it's in an expected state.
 * If it's bad, we exit the module depending on config settings.
 * If it's good, then we store the value and exits the module.
 * @param {object} consentObject required; object returned by USPAPI that contains user's consent choices
 * @param {object} hookConfig contains module related variables (see comment in requestBidsHook function)
 */

function processUspData(consentObject, hookConfig) {
  var valid = !!(consentObject && consentObject.usPrivacy);

  if (!valid) {
    uspapiFailed("USPAPI returned unexpected value during lookup process.", hookConfig, consentObject);
    return;
  }

  clearTimeout(hookConfig.timer);
  storeUspConsentData(consentObject);
  exitModule(null, hookConfig);
}
/**
 * General timeout callback when interacting with USPAPI takes too long.
 */


function uspapiTimeout(hookConfig) {
  uspapiFailed('USPAPI workflow exceeded timeout threshold.', hookConfig);
}
/**
 * This function contains the controlled steps to perform when there's a problem with USPAPI.
 * @param {string} errMsg required; should be a short descriptive message for why the failure/issue happened.
 * @param {object} hookConfig contains module related variables (see comment in requestBidsHook function)
 * @param {object} extraArgs contains additional data that's passed along in the error/warning messages for easier debugging
*/


function uspapiFailed(errMsg, hookConfig, extraArgs) {
  clearTimeout(hookConfig.timer);
  exitModule(errMsg, hookConfig, extraArgs);
}
/**
 * Stores USP data locally in module and then invokes uspDataHandler.setConsentData() to make information available in adaptermanger.js for later in the auction
 * @param {object} cmpConsentObject required; an object representing user's consent choices (can be undefined in certain use-cases for this function only)
 */


function storeUspConsentData(consentObject) {
  if (consentObject && consentObject.usPrivacy) {
    consentData = consentObject.usPrivacy;
    __WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__["uspDataHandler"].setConsentData(consentData);
  }
}
/**
 * This function handles the exit logic for the module.
 * There are a couple paths in the module's logic to call this function and we only allow 1 of the 2 potential exits to happen before suppressing others.
 *
 * We prevent multiple exits to avoid conflicting messages in the console depending on certain scenarios.
 * One scenario could be auction was canceled due to timeout with USPAPI being reached.
 * While the timeout is the accepted exit and runs first, the USP's callback still tries to process the user's data (which normally leads to a good exit).
 * In this case, the good exit will be suppressed since we already decided to cancel the auction.
 *
 * Three exit paths are:
 * 1. good exit where auction runs (USPAPI data is processed normally).
 * 2. bad exit but auction still continues (warning message is logged, USPAPI data is undefined and still passed along).
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
      __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"](errMsg + ' Resuming auction without consent data as per consentManagement config.', extraArgs);
    }

    nextFn.apply(context, args);
  }
}
/**
 * Simply resets the module's consentData variable back to undefined, mainly for testing purposes
 */


function resetConsentData() {
  consentData = undefined;
  consentAPI = undefined;
  __WEBPACK_IMPORTED_MODULE_2__src_adapterManager_js__["uspDataHandler"].setConsentData(null);
}
/**
 * A configuration function that initializes some module variables, as well as add a hook into the requestBids function
 * @param {object} config required; consentManagementUSP module config settings; usp (string), timeout (int), allowAuctionWithoutConsent (boolean)
 */

function setConsentConfig(config) {
  config = config.usp;

  if (!config || _typeof(config) !== 'object') {
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logWarn"]('consentManagement.usp config not defined, exiting usp consent manager');
    return;
  }

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isStr"](config.cmpApi)) {
    consentAPI = config.cmpApi;
  } else {
    consentAPI = DEFAULT_CONSENT_API;
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]("consentManagement.usp config did not specify cmpApi. Using system default setting (".concat(DEFAULT_CONSENT_API, ")."));
  }

  if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isNumber"](config.timeout)) {
    consentTimeout = config.timeout;
  } else {
    consentTimeout = DEFAULT_CONSENT_TIMEOUT;
    __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]("consentManagement.usp config did not specify timeout. Using system default setting (".concat(DEFAULT_CONSENT_TIMEOUT, ")."));
  }

  __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["logInfo"]('USPAPI consentManagement module has been activated...');

  if (consentAPI === 'static') {
    if (__WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isPlainObject"](config.consentData) && __WEBPACK_IMPORTED_MODULE_0__src_utils_js__["isPlainObject"](config.consentData.getUSPData)) {
      if (config.consentData.getUSPData.uspString) staticConsentData = {
        usPrivacy: config.consentData.getUSPData.uspString
      };
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

},[345]);