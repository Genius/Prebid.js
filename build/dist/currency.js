pbjsChunk([239],{

/***/ 366:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(367);


/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currencySupportEnabled", function() { return currencySupportEnabled; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currencyRates", function() { return currencyRates; });
/* harmony export (immutable) */ __webpack_exports__["setConfig"] = setConfig;
/* harmony export (immutable) */ __webpack_exports__["addBidResponseHook"] = addBidResponseHook;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_prebidGlobal_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_bidfactory_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_constants_json__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_constants_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__src_constants_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__src_ajax_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__src_utils_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__src_config_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__src_hook_js__ = __webpack_require__(13);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }








var DEFAULT_CURRENCY_RATE_URL = 'https://cdn.jsdelivr.net/gh/prebid/currency-file@1/latest.json?date=$$TODAY$$';
var CURRENCY_RATE_PRECISION = 4;
var bidResponseQueue = [];
var conversionCache = {};
var currencyRatesLoaded = false;
var needToCallForCurrencyFile = true;
var adServerCurrency = 'USD';
var currencySupportEnabled = false;
var currencyRates = {};
var bidderCurrencyDefault = {};
var defaultRates;
/**
 * Configuration function for currency
 * @param  {string} [config.adServerCurrency = 'USD']
 *  ISO 4217 3-letter currency code that represents the target currency. (e.g. 'EUR').  If this value is present,
 *  the currency conversion feature is activated.
 * @param  {number} [config.granularityMultiplier = 1]
 *  A decimal value representing how mcuh to scale the price granularity calculations.
 * @param  {object} config.bidderCurrencyDefault
 *  An optional argument to specify bid currencies for bid adapters.  This option is provided for the transitional phase
 *  before every bid adapter will specify its own bid currency.  If the adapter specifies a bid currency, this value is
 *  ignored for that bidder.
 *
 *  example:
 *  {
 *    rubicon: 'USD'
 *  }
 * @param  {string} [config.conversionRateFile = 'URL pointing to conversion file']
 *  Optional path to a file containing currency conversion data.  Prebid.org hosts a file that is used as the default,
 *  if not specified.
 * @param  {object} [config.rates]
 *  This optional argument allows you to specify the rates with a JSON object, subverting the need for a external
 *  config.conversionRateFile parameter.  If this argument is specified, the conversion rate file will not be loaded.
 *
 *  example:
 *  {
 *    'GBP': { 'CNY': 8.8282, 'JPY': 141.7, 'USD': 1.2824 },
 *    'USD': { 'CNY': 6.8842, 'GBP': 0.7798, 'JPY': 110.49 }
 *  }
 *  @param {object} [config.defaultRates]
 *  This optional currency rates definition follows the same format as config.rates, however it is only utilized if
 *  there is an error loading the config.conversionRateFile.
 */

function setConfig(config) {
  var url = DEFAULT_CURRENCY_RATE_URL;

  if (_typeof(config.rates) === 'object') {
    currencyRates.conversions = config.rates;
    currencyRatesLoaded = true;
    needToCallForCurrencyFile = false; // don't call if rates are already specified
  }

  if (_typeof(config.defaultRates) === 'object') {
    defaultRates = config.defaultRates; // set up the default rates to be used if the rate file doesn't get loaded in time

    currencyRates.conversions = defaultRates;
    currencyRatesLoaded = true;
  }

  if (typeof config.adServerCurrency === 'string') {
    __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logInfo"]('enabling currency support', arguments);
    adServerCurrency = config.adServerCurrency;

    if (config.conversionRateFile) {
      __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logInfo"]('currency using override conversionRateFile:', config.conversionRateFile);
      url = config.conversionRateFile;
    } // see if the url contains a date macro
    // this is a workaround to the fact that jsdelivr doesn't currently support setting a 24-hour HTTP cache header
    // So this is an approach to let the browser cache a copy of the file each day
    // We should remove the macro once the CDN support a day-level HTTP cache setting


    var macroLocation = url.indexOf('$$TODAY$$');

    if (macroLocation !== -1) {
      // get the date to resolve the macro
      var d = new Date();
      var month = "".concat(d.getMonth() + 1);
      var day = "".concat(d.getDate());
      if (month.length < 2) month = "0".concat(month);
      if (day.length < 2) day = "0".concat(day);
      var todaysDate = "".concat(d.getFullYear()).concat(month).concat(day); // replace $$TODAY$$ with todaysDate

      url = "".concat(url.substring(0, macroLocation)).concat(todaysDate).concat(url.substring(macroLocation + 9, url.length));
    }

    initCurrency(url);
  } else {
    // currency support is disabled, setting defaults
    __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logInfo"]('disabling currency support');
    resetCurrency();
  }

  if (_typeof(config.bidderCurrencyDefault) === 'object') {
    bidderCurrencyDefault = config.bidderCurrencyDefault;
  }
}
__WEBPACK_IMPORTED_MODULE_5__src_config_js__["b" /* config */].getConfig('currency', function (config) {
  return setConfig(config.currency);
});

function errorSettingsRates(msg) {
  if (defaultRates) {
    __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logWarn"](msg);
    __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logWarn"]('Currency failed loading rates, falling back to currency.defaultRates');
  } else {
    __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logError"](msg);
  }
}

function initCurrency(url) {
  conversionCache = {};
  currencySupportEnabled = true;
  __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logInfo"]('Installing addBidResponse decorator for currency module', arguments); // Adding conversion function to prebid global for external module and on page use

  Object(__WEBPACK_IMPORTED_MODULE_0__src_prebidGlobal_js__["a" /* getGlobal */])().convertCurrency = function (cpm, fromCurrency, toCurrency) {
    return parseFloat(cpm) * getCurrencyConversion(fromCurrency, toCurrency);
  };

  Object(__WEBPACK_IMPORTED_MODULE_6__src_hook_js__["a" /* getHook */])('addBidResponse').before(addBidResponseHook, 100); // call for the file if we haven't already

  if (needToCallForCurrencyFile) {
    needToCallForCurrencyFile = false;
    Object(__WEBPACK_IMPORTED_MODULE_3__src_ajax_js__["a" /* ajax */])(url, {
      success: function success(response) {
        try {
          currencyRates = JSON.parse(response);
          __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logInfo"]('currencyRates set to ' + JSON.stringify(currencyRates));
          currencyRatesLoaded = true;
          processBidResponseQueue();
        } catch (e) {
          errorSettingsRates('Failed to parse currencyRates response: ' + response);
        }
      },
      error: errorSettingsRates
    });
  }
}

function resetCurrency() {
  __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logInfo"]('Uninstalling addBidResponse decorator for currency module', arguments);
  Object(__WEBPACK_IMPORTED_MODULE_6__src_hook_js__["a" /* getHook */])('addBidResponse').getHooks({
    hook: addBidResponseHook
  }).remove();
  delete Object(__WEBPACK_IMPORTED_MODULE_0__src_prebidGlobal_js__["a" /* getGlobal */])().convertCurrency;
  adServerCurrency = 'USD';
  conversionCache = {};
  currencySupportEnabled = false;
  currencyRatesLoaded = false;
  needToCallForCurrencyFile = true;
  currencyRates = {};
  bidderCurrencyDefault = {};
}

function addBidResponseHook(fn, adUnitCode, bid) {
  if (!bid) {
    return fn.call(this, adUnitCode); // if no bid, call original and let it display warnings
  }

  var bidder = bid.bidderCode || bid.bidder;

  if (bidderCurrencyDefault[bidder]) {
    var currencyDefault = bidderCurrencyDefault[bidder];

    if (bid.currency && currencyDefault !== bid.currency) {
      __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logWarn"]("Currency default '".concat(bidder, ": ").concat(currencyDefault, "' ignored. adapter specified '").concat(bid.currency, "'"));
    } else {
      bid.currency = currencyDefault;
    }
  } // default to USD if currency not set


  if (!bid.currency) {
    __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logWarn"]('Currency not specified on bid.  Defaulted to "USD"');
    bid.currency = 'USD';
  } // used for analytics


  bid.getCpmInNewCurrency = function (toCurrency) {
    return (parseFloat(this.cpm) * getCurrencyConversion(this.currency, toCurrency)).toFixed(3);
  }; // execute immediately if the bid is already in the desired currency


  if (bid.currency === adServerCurrency) {
    return fn.call(this, adUnitCode, bid);
  }

  bidResponseQueue.push(wrapFunction(fn, this, [adUnitCode, bid]));

  if (!currencySupportEnabled || currencyRatesLoaded) {
    processBidResponseQueue();
  }
}

function processBidResponseQueue() {
  while (bidResponseQueue.length > 0) {
    bidResponseQueue.shift()();
  }
}

function wrapFunction(fn, context, params) {
  return function () {
    var bid = params[1];

    if (bid !== undefined && 'currency' in bid && 'cpm' in bid) {
      var fromCurrency = bid.currency;

      try {
        var conversion = getCurrencyConversion(fromCurrency);

        if (conversion !== 1) {
          bid.cpm = (parseFloat(bid.cpm) * conversion).toFixed(4);
          bid.currency = adServerCurrency;
        }
      } catch (e) {
        __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logWarn"]('Returning NO_BID, getCurrencyConversion threw error: ', e);
        params[1] = Object(__WEBPACK_IMPORTED_MODULE_1__src_bidfactory_js__["a" /* createBid */])(__WEBPACK_IMPORTED_MODULE_2__src_constants_json__["STATUS"].NO_BID, {
          bidder: bid.bidderCode || bid.bidder,
          bidId: bid.requestId
        });
      }
    }

    return fn.apply(context, params);
  };
}

function getCurrencyConversion(fromCurrency) {
  var toCurrency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : adServerCurrency;
  var conversionRate = null;
  var rates;
  var cacheKey = "".concat(fromCurrency, "->").concat(toCurrency);

  if (cacheKey in conversionCache) {
    conversionRate = conversionCache[cacheKey];
    __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logMessage"]('Using conversionCache value ' + conversionRate + ' for ' + cacheKey);
  } else if (currencySupportEnabled === false) {
    if (fromCurrency === 'USD') {
      conversionRate = 1;
    } else {
      throw new Error('Prebid currency support has not been enabled and fromCurrency is not USD');
    }
  } else if (fromCurrency === toCurrency) {
    conversionRate = 1;
  } else {
    if (fromCurrency in currencyRates.conversions) {
      // using direct conversion rate from fromCurrency to toCurrency
      rates = currencyRates.conversions[fromCurrency];

      if (!(toCurrency in rates)) {
        // bid should fail, currency is not supported
        throw new Error('Specified adServerCurrency in config \'' + toCurrency + '\' not found in the currency rates file');
      }

      conversionRate = rates[toCurrency];
      __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logInfo"]('getCurrencyConversion using direct ' + fromCurrency + ' to ' + toCurrency + ' conversionRate ' + conversionRate);
    } else if (toCurrency in currencyRates.conversions) {
      // using reciprocal of conversion rate from toCurrency to fromCurrency
      rates = currencyRates.conversions[toCurrency];

      if (!(fromCurrency in rates)) {
        // bid should fail, currency is not supported
        throw new Error('Specified fromCurrency \'' + fromCurrency + '\' not found in the currency rates file');
      }

      conversionRate = roundFloat(1 / rates[fromCurrency], CURRENCY_RATE_PRECISION);
      __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logInfo"]('getCurrencyConversion using reciprocal ' + fromCurrency + ' to ' + toCurrency + ' conversionRate ' + conversionRate);
    } else {
      // first defined currency base used as intermediary
      var anyBaseCurrency = Object.keys(currencyRates.conversions)[0];

      if (!(fromCurrency in currencyRates.conversions[anyBaseCurrency])) {
        // bid should fail, currency is not supported
        throw new Error('Specified fromCurrency \'' + fromCurrency + '\' not found in the currency rates file');
      }

      var toIntermediateConversionRate = 1 / currencyRates.conversions[anyBaseCurrency][fromCurrency];

      if (!(toCurrency in currencyRates.conversions[anyBaseCurrency])) {
        // bid should fail, currency is not supported
        throw new Error('Specified adServerCurrency in config \'' + toCurrency + '\' not found in the currency rates file');
      }

      var fromIntermediateConversionRate = currencyRates.conversions[anyBaseCurrency][toCurrency];
      conversionRate = roundFloat(toIntermediateConversionRate * fromIntermediateConversionRate, CURRENCY_RATE_PRECISION);
      __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logInfo"]('getCurrencyConversion using intermediate ' + fromCurrency + ' thru ' + anyBaseCurrency + ' to ' + toCurrency + ' conversionRate ' + conversionRate);
    }
  }

  if (!(cacheKey in conversionCache)) {
    __WEBPACK_IMPORTED_MODULE_4__src_utils_js__["logMessage"]('Adding conversionCache value ' + conversionRate + ' for ' + cacheKey);
    conversionCache[cacheKey] = conversionRate;
  }

  return conversionRate;
}

function roundFloat(num, dec) {
  var d = 1;

  for (var i = 0; i < dec; i++) {
    d += '0';
  }

  return Math.round(num * d) / d;
}

/***/ })

},[366]);