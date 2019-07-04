var __webpack_require__ =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**************************!*\
  !*** ./lib/passwords.js ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var storage = __webpack_require__(/*! ./storage */ 5);

var crypto = __webpack_require__(/*! ./crypto */ 3);

var masterPassword = __webpack_require__(/*! ./masterPassword */ 1);

var lock = exports.lock = new (__webpack_require__(/*! ./lock */ 19))();
var STORAGE_PREFIX = exports.STORAGE_PREFIX = "site:";

function _normalizeSite(site) {
  // Remove trailing dots
  if (site && site[site.length - 1] == ".") site = site.substr(0, site.length - 1); // Remove www. prefix

  if (site.substr(0, 4) == "www.") site = site.substr(4);
  return site;
}

function _sortPasswords(list) {
  list.sort(function (a, b) {
    if (a.name < b.name) return -1;else if (a.name > b.name) return 1;else {
      var rev1 = a.revision ? parseInt(a.revision, 10) : 1;
      var rev2 = b.revision ? parseInt(b.revision, 10) : 1;
      if (!isNaN(rev1) && !isNaN(rev2)) return rev1 - rev2;else if (a.revision < b.revision) return -1;else if (a.revision > b.revision) return 1;else return 0;
    }
  });
  return list;
}

function _getSiteKey(site) {
  return masterPassword.getDigest(site).then(function (digest) {
    return "".concat(STORAGE_PREFIX).concat(digest);
  });
}

function _getPasswordPrefix(site) {
  return _getSiteKey(site).then(function (key) {
    return "".concat(key, ":");
  });
}

function _getPasswordKey(site, name, revision) {
  return Promise.all([masterPassword.getDigest(site), masterPassword.getDigest(site + "\0" + name + "\0" + (revision || ""))]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        digest1 = _ref2[0],
        digest2 = _ref2[1];

    return "".concat(STORAGE_PREFIX).concat(digest1, ":").concat(digest2);
  });
}

function _getSiteData(site) {
  return _getSiteKey(site).then(function (key) {
    return storage.get(key).then(function (data) {
      if (data) return data;else return {};
    });
  });
}

function _hasPasswords(site) {
  return _getPasswordPrefix(site).then(function (prefix) {
    return storage.hasPrefix(prefix);
  });
}

function _getPasswords(site) {
  return _getPasswordPrefix(site).then(function (prefix) {
    return storage.getAllByPrefix(prefix);
  }).then(function (data) {
    return _sortPasswords(Object.keys(data).map(function (key) {
      return data[key];
    }));
  });
}

function _ensureSiteData(site) {
  return _getSiteKey(site).then(function (key) {
    return storage.has(key).then(function (exists) {
      if (!exists) return storage.set(key, {
        site: site
      });
      return null;
    });
  });
}

function _deleteSiteData(site) {
  return _getSiteKey(site).then(function (key) {
    return storage["delete"](key);
  });
}

function _deletePassword(site, name, revision) {
  return _getPasswordKey(site, name, revision).then(function (key) {
    return storage["delete"](key);
  });
}

function getAlias(host) {
  var origSite = _normalizeSite(host);

  return _getSiteData(origSite).then(function (siteData) {
    return [origSite, siteData.alias || origSite];
  });
}

exports.getAlias = getAlias;

function addAlias(site, alias) {
  return lock.acquire().then(function () {
    return _hasPasswords(site);
  }).then(function (hasPasswords) {
    if (hasPasswords) throw "site_has_passwords";
    return setSite({
      site: site,
      alias: alias
    });
  })["finally"](function () {
    return lock.release();
  });
}

exports.addAlias = addAlias;

function removeAlias(site) {
  return lock.acquire().then(function () {
    return _getSiteData(site);
  }).then(function (siteData) {
    if (!siteData || !siteData.alias) throw "no_such_alias";
  }).then(function () {
    return _deleteSiteData(site);
  })["finally"](function () {
    return lock.release();
  });
}

exports.removeAlias = removeAlias;

function getPasswords(host) {
  return getAlias(host).then(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        origSite = _ref4[0],
        site = _ref4[1];

    return Promise.all([origSite, site, _getPasswords(site)]);
  });
}

exports.getPasswords = getPasswords;

function getPassword(passwordData) {
  return _getPasswordKey(passwordData.site, passwordData.name, passwordData.revision).then(function (key) {
    return storage.get(key);
  }).then(function (passwordData) {
    if (!passwordData) throw "no_such_password";
    if (passwordData.type == "stored") return passwordData.password;

    if (passwordData.type == "generated2") {
      var site = passwordData.site,
          name = passwordData.name,
          revision = passwordData.revision,
          length = passwordData.length,
          lower = passwordData.lower,
          upper = passwordData.upper,
          number = passwordData.number,
          symbol = passwordData.symbol;
      var params = {
        masterPassword: masterPassword.get(),
        domain: site,
        name: name,
        revision: revision,
        length: length,
        lower: lower,
        upper: upper,
        number: number,
        symbol: symbol
      };
      return crypto.derivePassword(params);
    }

    throw "unknown_generation_method";
  });
}

exports.getPassword = getPassword;

function getAllPasswords() {
  return storage.getAllByPrefix(STORAGE_PREFIX).then(function (data) {
    var entries = Object.keys(data).map(function (key) {
      return data[key];
    });
    var result = Object.create(null);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var siteData = _step.value;
        if (siteData.type || siteData.alias) continue;
        result[siteData.site] = siteData;
        siteData.passwords = [];
        siteData.aliases = [];
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = entries[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var passwordData = _step2.value;
        if (!passwordData.type) continue;
        var _siteData = result[passwordData.site];
        if (_siteData) _siteData.passwords.push(passwordData);else _deletePassword(passwordData.site, passwordData.name, passwordData.revision);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = entries[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var _siteData2 = _step3.value;
        if (_siteData2.type || !_siteData2.alias) continue;
        var targetSiteData = result[_siteData2.alias];
        if (targetSiteData && targetSiteData.passwords.length) targetSiteData.aliases.push(_siteData2.site);else _deleteSiteData(_siteData2.site);
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
          _iterator3["return"]();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    for (var _i2 = 0, _Object$keys = Object.keys(result); _i2 < _Object$keys.length; _i2++) {
      var site = _Object$keys[_i2];
      var _siteData3 = result[site];

      if (_siteData3.passwords.length) {
        _sortPasswords(_siteData3.passwords);

        _siteData3.aliases.sort();
      } else {
        delete result[site];

        _deleteSiteData(site);
      }
    }

    return result;
  });
}

exports.getAllPasswords = getAllPasswords;

function getAllSites() {
  return storage.getAllByPrefix(STORAGE_PREFIX).then(function (data) {
    var sites = [];

    for (var _i3 = 0, _Object$keys2 = Object.keys(data); _i3 < _Object$keys2.length; _i3++) {
      var key = _Object$keys2[_i3];
      var siteData = data[key];
      if (siteData.type || siteData.alias) continue;
      sites.push(siteData.site);
    }

    sites.sort();
    return sites;
  });
}

exports.getAllSites = getAllSites;

function exportPasswordData() {
  var extraKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var exportedKeys = [masterPassword.saltKey, masterPassword.hmacSecretKey].concat(extraKeys);
  return storage.getAllByPrefix("", null).then(function (data) {
    for (var _i4 = 0, _Object$keys3 = Object.keys(data); _i4 < _Object$keys3.length; _i4++) {
      var key = _Object$keys3[_i4];
      if (!key.startsWith(STORAGE_PREFIX) && !exportedKeys.includes(key)) delete data[key];
    }

    return JSON.stringify({
      application: "pfp",
      format: 3,
      data: data
    });
  });
}

exports.exportPasswordData = exportPasswordData;

function importPasswordData(data, masterPass) {
  var importers = [__webpack_require__(/*! ./importers/default */ 20), __webpack_require__(/*! ./importers/lastPass */ 21)];

  function setRaw(key, value) {
    return storage.set(key, value, null);
  }

  function tryNext() {
    var importer = importers.shift();
    return importer["import"](data, setRaw, setSite, setPassword, masterPass)["catch"](function (e) {
      if (e != "unknown_data_format" || !importers.length) throw e;
      return tryNext();
    });
  }

  return lock.acquire().then(tryNext)["finally"](function () {
    return lock.release();
  });
}

exports.importPasswordData = importPasswordData;

function setPassword(entry) {
  return _getPasswordKey(entry.site, entry.name, entry.revision).then(function (key) {
    return storage.set(key, entry);
  });
}

exports.setPassword = setPassword;

function setSite(entry) {
  return _getSiteKey(entry.site).then(function (key) {
    return storage.set(key, entry);
  });
}

exports.setSite = setSite;

function addGenerated(_ref5, replaceExisting) {
  var site = _ref5.site,
      name = _ref5.name,
      revision = _ref5.revision,
      length = _ref5.length,
      lower = _ref5.lower,
      upper = _ref5.upper,
      number = _ref5.number,
      symbol = _ref5.symbol,
      notes = _ref5.notes;
  return lock.acquire().then(function () {
    return _ensureSiteData(site);
  }).then(function () {
    return _getPasswordKey(site, name, revision);
  }).then(function (key) {
    if (replaceExisting) return [key, false];
    return Promise.all([key, storage.has(key)]);
  }).then(function (_ref6) {
    var _ref7 = _slicedToArray(_ref6, 2),
        key = _ref7[0],
        exists = _ref7[1];

    if (exists) throw "alreadyExists";
    var type = "generated2";
    var data = {
      site: site,
      name: name,
      revision: revision,
      type: type,
      length: length,
      lower: lower,
      upper: upper,
      number: number,
      symbol: symbol
    };
    if (notes) data.notes = notes;
    return storage.set(key, data);
  }).then(function (_) {
    return _getPasswords(site);
  })["finally"](function () {
    return lock.release();
  });
}

exports.addGenerated = addGenerated;

function addStored(_ref8) {
  var site = _ref8.site,
      name = _ref8.name,
      revision = _ref8.revision,
      password = _ref8.password,
      notes = _ref8.notes;
  return lock.acquire().then(function () {
    return _ensureSiteData(site);
  }).then(function () {
    return _getPasswordKey(site, name, revision);
  }).then(function (key) {
    return Promise.all([key, storage.has(key)]);
  }).then(function (_ref9) {
    var _ref10 = _slicedToArray(_ref9, 2),
        key = _ref10[0],
        exists = _ref10[1];

    if (exists) throw "alreadyExists";
    var data = {
      type: "stored",
      site: site,
      name: name,
      revision: revision,
      password: password
    };
    if (notes) data.notes = notes;
    return storage.set(key, data);
  }).then(function (_) {
    return _getPasswords(site);
  })["finally"](function () {
    return lock.release();
  });
}

exports.addStored = addStored;

function removePassword(passwordData) {
  return lock.acquire().then(function () {
    return _getPasswordKey(passwordData.site, passwordData.name, passwordData.revision);
  }).then(function (key) {
    return storage.has(key).then(function (exists) {
      if (!exists) throw "no_such_password";
      return storage["delete"](key);
    });
  }).then(function (_) {
    return _getPasswords(passwordData.site);
  })["finally"](function () {
    return lock.release();
  });
}

exports.removePassword = removePassword;

function setNotes(passwordData, notes) {
  return lock.acquire().then(function () {
    return _getPasswordKey(passwordData.site, passwordData.name, passwordData.revision);
  }).then(function (key) {
    return Promise.all([key, storage.get(key)]);
  }).then(function (_ref11) {
    var _ref12 = _slicedToArray(_ref11, 2),
        key = _ref12[0],
        data = _ref12[1];

    if (!data) throw "no_such_password";
    if (notes) data.notes = notes;else delete data.notes;
    return storage.set(key, data);
  }).then(function (_) {
    return _getPasswords(passwordData.site);
  })["finally"](function () {
    return lock.release();
  });
}

exports.setNotes = setNotes;

function getNotes(passwordData) {
  return _getPasswordKey(passwordData.site, passwordData.name, passwordData.revision).then(function (key) {
    return storage.get(key);
  }).then(function (passwordData) {
    if (!passwordData) throw "no_such_password";
    return passwordData.notes;
  });
}

exports.getNotes = getNotes;
var migrationInProgress = null;

function migrateData(masterPassword) {
  if (!migrationInProgress) {
    migrationInProgress = lock.acquire().then(function () {
      return __webpack_require__(/*! ./migration */ 22).migrateData(masterPassword, STORAGE_PREFIX, setPassword);
    })["finally"](function () {
      migrationInProgress = null;
      lock.release();
    });
  }

  return migrationInProgress;
}

exports.migrateData = migrateData;

exports.isMigrating = function () {
  return !!migrationInProgress;
};

/***/ }),
/* 1 */
/*!*******************************!*\
  !*** ./lib/masterPassword.js ***!
  \*******************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var prefs = __webpack_require__(/*! ./prefs */ 9);

var storage = __webpack_require__(/*! ./storage */ 5);

var crypto = __webpack_require__(/*! ./crypto */ 3);

var CURRENT_FORMAT = 3;
var formatKey = exports.formatKey = "format";
var saltKey = exports.saltKey = "salt";
var hmacSecretKey = exports.hmacSecretKey = "hmac-secret";
var rememberedMaster = null;
var key = null;
var hmacSecret = null;
var lockTimer = null;
var autoLockSuspended = false;
Object.defineProperty(exports, "state", {
  enumerable: true,
  get: function get() {
    if (__webpack_require__(/*! ./passwords */ 0).isMigrating()) return Promise.resolve("migrating");
    if (rememberedMaster) return Promise.resolve("known");
    return storage.has(hmacSecretKey).then(function (value) {
      return value ? "set" : "unset";
    });
  }
});

exports.get = function () {
  if (!rememberedMaster) throw "master_password_required";
  return rememberedMaster;
};

exports.getSalt = function () {
  return storage.get(saltKey, null);
};

function getKey() {
  if (!key) throw "master_password_required";
  return key;
}

exports.encrypt = function (data, key, json) {
  return Promise.resolve().then(function () {
    if (typeof key == "undefined") key = getKey();
    if (!key) return data;
    if (json !== false) data = JSON.stringify(data);
    return crypto.encryptData(key, data);
  });
};

exports.decrypt = function (data, key, json) {
  return Promise.resolve().then(function () {
    if (typeof key == "undefined") key = getKey();
    if (!key) return data;
    return crypto.decryptData(key, data).then(function (plaintext) {
      if (json !== false) plaintext = JSON.parse(plaintext);
      return plaintext;
    });
  });
};

exports.getDigest = function (data) {
  if (!hmacSecret) return Promise.reject("master_password_required");
  return crypto.getDigest(hmacSecret, data);
};

function _suspendAutoLock() {
  if (lockTimer !== null) clearTimeout(lockTimer);
  lockTimer = null;
}

function suspendAutoLock() {
  _suspendAutoLock();

  autoLockSuspended = true;
}

exports.suspendAutoLock = suspendAutoLock;

function _resumeAutoLock() {
  Promise.all([prefs.get("autolock", true), prefs.get("autolock_delay", 10)]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        autolock = _ref2[0],
        autolock_delay = _ref2[1];

    if (autolock) {
      if (autolock_delay <= 0) forgetPassword();else lockTimer = setTimeout(forgetPassword, autolock_delay * 60 * 1000);
    }
  });
}

function resumeAutoLock() {
  _suspendAutoLock();

  _resumeAutoLock();

  autoLockSuspended = false;
}

exports.resumeAutoLock = resumeAutoLock;
prefs.on("autolock", function (name, value) {
  if (value) {
    if (!autoLockSuspended) _resumeAutoLock();
  } else _suspendAutoLock();
});

function deriveKey(salt, masterPassword) {
  return Promise.resolve().then(function () {
    if (masterPassword) return masterPassword;
    if (rememberedMaster) return rememberedMaster;
    throw "master_password_required";
  }).then(function (masterPassword) {
    return crypto.deriveKey({
      masterPassword: masterPassword,
      salt: salt
    });
  });
}

exports.deriveKey = deriveKey;

function clearData(noLock) {
  var _require = __webpack_require__(/*! ./passwords */ 0),
      lock = _require.lock;

  return (noLock ? Promise.resolve() : lock.acquire()).then(function () {
    return storage.clear();
  })["finally"](function () {
    return noLock || lock.release();
  });
}

function changePassword(masterPassword, noLock) {
  var salt = crypto.generateRandom(16);
  return deriveKey(salt, masterPassword).then(function (newKey) {
    // Disable sync before clearing data, otherwise it will create change
    // entries for everything removed.
    return __webpack_require__(/*! ./sync */ 7).disable(noLock).then(function () {
      return clearData(noLock);
    }).then(function () {
      var rawHmacSecret = crypto.generateRandom(32);
      return Promise.all([crypto.importHmacSecret(rawHmacSecret), storage.set(formatKey, CURRENT_FORMAT, null), storage.set(saltKey, salt, null), storage.set(hmacSecretKey, rawHmacSecret, newKey)]);
    }).then(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 1),
          newHmacSecret = _ref4[0];

      rememberedMaster = masterPassword;
      key = newKey;
      hmacSecret = newHmacSecret;
    });
  });
}

exports.changePassword = changePassword;

function checkPassword(masterPassword) {
  var needsMigrating = false;
  return Promise.all([storage.get(formatKey, null), storage.get(saltKey, null)]).then(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        format = _ref6[0],
        salt = _ref6[1];

    if (format && format != CURRENT_FORMAT) return Promise.reject();
    if (!format) needsMigrating = true;
    if (!salt) return Promise.reject();
    return deriveKey(salt, masterPassword);
  }).then(function (newKey) {
    return storage.get(hmacSecretKey, newKey).then(function (rawHmacSecret) {
      return crypto.importHmacSecret(rawHmacSecret);
    }).then(function (newHmacSecret) {
      rememberedMaster = masterPassword;
      key = newKey;
      hmacSecret = newHmacSecret;

      if (needsMigrating) {
        __webpack_require__(/*! ./passwords */ 0).migrateData(masterPassword)["catch"](function (e) {
          return console.error(e);
        });

        throw "migrating";
      }
    });
  })["catch"](function (e) {
    throw e == "migrating" ? e : "declined";
  });
}

exports.checkPassword = checkPassword;

function forgetPassword() {
  rememberedMaster = null;
  key = null;
  hmacSecret = null;
  return Promise.resolve();
}

exports.forgetPassword = forgetPassword;

function rekey(salt, rawHmacSecret, newKey) {
  var passwords = __webpack_require__(/*! ./passwords */ 0);

  var prefix = passwords.STORAGE_PREFIX;
  return storage.getAllByPrefix(prefix).then(function (entries) {
    return Promise.all([entries, crypto.importHmacSecret(rawHmacSecret), storage.set(saltKey, salt, null), storage.set(hmacSecretKey, rawHmacSecret, newKey), storage["delete"](Object.keys(entries))]);
  }).then(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        entries = _ref8[0],
        newHmacSecret = _ref8[1];

    key = newKey;
    hmacSecret = newHmacSecret;
    var actions = [];

    for (var _key in entries) {
      var value = entries[_key];
      if (value.type) actions.push(passwords.setPassword(value));else actions.push(passwords.setSite(value));
    }

    return Promise.all(actions);
  });
}

exports.rekey = rekey;

/***/ }),
/* 2 */
/*!*************************************!*\
  !*** ./web/backgroundBrowserAPI.js ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */


var _require = __webpack_require__(/*! ./eventTarget */ 12),
    EventTarget = _require.EventTarget;

function textToURL(text) {
  return URL.createObjectURL(new Blob([text], {
    type: "text/javascript"
  }));
}

var currentURL = null;
module.exports = {
  storage: {
    local: {
      get: function get(keys) {
        if (typeof keys == "string") keys = [keys];
        if (!keys) keys = Object.keys(localStorage);
        var items = {};
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;
            if (key in localStorage) items[key] = JSON.parse(localStorage[key]);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return Promise.resolve(items);
      },
      set: function set(items) {
        return Promise.resolve().then(function () {
          for (var _i = 0, _Object$keys = Object.keys(items); _i < _Object$keys.length; _i++) {
            var key = _Object$keys[_i];
            localStorage[key] = JSON.stringify(items[key]);
          }
        });
      },
      remove: function remove(keys) {
        return Promise.resolve().then(function () {
          if (typeof keys == "string") keys = [keys];
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var key = _step2.value;
              delete localStorage[key];
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        });
      },
      clear: function clear() {
        return Promise.resolve().then(function () {
          localStorage.clear();
        });
      }
    }
  },
  tabs: {
    query: function query(params) {
      if (params.active && currentURL) return Promise.resolve([{
        url: currentURL
      }]);else return Promise.resolve([]);
    },
    create: function create(params) {
      if (params.url != "ui/allpasswords/allpasswords.html") return Promise.reject(new Error("Not implemented"));
      window.dispatchEvent(new Event("show-allpasswords"));
      return Promise.resolve();
    }
  },
  runtime: {
    getURL: function getURL(path) {
      if (path == "worker/scrypt.js") return textToURL(__webpack_require__(/*! ../worker/scrypt.js */ 13));else if (path == "worker/pbkdf2.js") return textToURL(__webpack_require__(/*! ../worker/pbkdf2.js */ 14));else return path;
    },
    onConnect: new EventTarget()
  }
};
var port = {
  postMessage: function postMessage(payload) {
    window.dispatchEvent(new CustomEvent("fromBackground", {
      detail: payload
    }));
  },
  onMessage: new EventTarget(),
  onDisconnect: new EventTarget()
};
window.addEventListener("toBackground", function (event) {
  port.onMessage._emit(event.detail);
});
window.addEventListener("port-connected", function (event) {
  port.name = event.detail;

  module.exports.runtime.onConnect._emit(port);
});
window.addEventListener("show-panel", function (event) {
  currentURL = "https://" + event.detail;
});

/***/ }),
/* 3 */
/*!***********************!*\
  !*** ./lib/crypto.js ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = __webpack_require__(/*! ./typedArrayConversion */ 15),
    toTypedArray = _require.toTypedArray;

var AES_KEY_SIZE = 256; // I, l, O, 0, 1 excluded because of potential confusion. ", ', \ excluded
// because of common bugs in web interfaces (magic quotes).

var LOWERCASE = "abcdefghjkmnpqrstuvwxyz";
var UPPERCASE = "ABCDEFGHJKMNPQRSTUVWXYZ";
var NUMBER = "23456789";
var SYMBOL = "!#$%&()*+,-./:;<=>?@[]^_{|}~";
var encoder = new TextEncoder("utf-8");
var decoder = new TextDecoder("utf-8");
var maxJobId = 0;
var scryptWorker = null;
var pbkdf2Worker = null;

function deriveBits(password, salt, length) {
  return new Promise(function (resolve, reject) {
    if (!scryptWorker) scryptWorker = new Worker(__webpack_require__(/*! ./browserAPI */ 2).runtime.getURL("worker/scrypt.js"));
    var currentJobId = ++maxJobId;

    var messageCallback = function messageCallback(_ref) {
      var _ref$data = _ref.data,
          jobId = _ref$data.jobId,
          result = _ref$data.result;
      if (jobId != currentJobId) return;
      cleanup();
      resolve(toTypedArray(result));
    };

    var errorCallback = function errorCallback() {
      cleanup(); // The worker is probably in a bad state, create a new one next time.

      scryptWorker = null;
      reject("worker-error");
    };

    var cleanup = function cleanup() {
      scryptWorker.removeEventListener("message", messageCallback);
      scryptWorker.removeEventListener("error", errorCallback);
    };

    scryptWorker.addEventListener("message", messageCallback);
    scryptWorker.addEventListener("error", errorCallback);
    scryptWorker.postMessage({
      jobId: currentJobId,
      password: encoder.encode(password),
      salt: encoder.encode(salt),
      length: parseInt(length, 10)
    });
  });
}

function deriveBitsLegacy(password, salt, length) {
  return new Promise(function (resolve, reject) {
    if (!pbkdf2Worker) pbkdf2Worker = new Worker(__webpack_require__(/*! ./browserAPI */ 2).runtime.getURL("worker/pbkdf2.js"));
    var currentJobId = ++maxJobId;

    var messageCallback = function messageCallback(_ref2) {
      var _ref2$data = _ref2.data,
          jobId = _ref2$data.jobId,
          result = _ref2$data.result;
      if (jobId != currentJobId) return;
      cleanup();
      resolve(toTypedArray(result));
    };

    var errorCallback = function errorCallback() {
      cleanup(); // The worker is probably in a bad state, create a new one next time.

      pbkdf2Worker = null;
      reject("worker-error");
    };

    var cleanup = function cleanup() {
      pbkdf2Worker.removeEventListener("message", messageCallback);
      pbkdf2Worker.removeEventListener("error", errorCallback);
    };

    pbkdf2Worker.addEventListener("message", messageCallback);
    pbkdf2Worker.addEventListener("error", errorCallback);
    pbkdf2Worker.postMessage({
      jobId: currentJobId,
      password: encoder.encode(password),
      // Reserve 4 bytes at the end of the salt, PBKDF2 will need them
      salt: encoder.encode(salt + "    "),
      length: parseInt(length, 10)
    });
  });
}

exports.derivePassword = function (params) {
  var salt = params.domain + "\0" + params.name;
  if (params.revision) salt += "\0" + params.revision;
  return Promise.resolve().then(function () {
    return deriveBits(params.masterPassword, salt, params.length);
  }).then(function (array) {
    return toPassword(array, params.lower, params.upper, params.number, params.symbol);
  });
};

exports.deriveKey = function (params) {
  return Promise.resolve().then(function () {
    return deriveBits(params.masterPassword, atob(params.salt), AES_KEY_SIZE / 8);
  }).then(function (array) {
    return crypto.subtle.importKey("raw", array, "AES-GCM", false, ["encrypt", "decrypt"]);
  });
};

exports.encryptData = function (key, plaintext) {
  return Promise.resolve().then(function () {
    var initializationVector = new Uint8Array(12);
    crypto.getRandomValues(initializationVector);
    return Promise.all([initializationVector, crypto.subtle.encrypt({
      name: "AES-GCM",
      iv: initializationVector,
      tagLength: 128
    }, key, encoder.encode(plaintext))]);
  }).then(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        initializationVector = _ref4[0],
        buffer = _ref4[1];

    var array = new Uint8Array(buffer);
    var result = [];

    for (var i = 0; i < array.length; i++) {
      result.push(String.fromCharCode(array[i]));
    }

    return toBase64(initializationVector) + "_" + toBase64(buffer);
  });
};

exports.decryptData = function (key, ciphertext) {
  return Promise.resolve().then(function () {
    var _ciphertext$split$map = ciphertext.split("_", 2).map(fromBase64),
        _ciphertext$split$map2 = _slicedToArray(_ciphertext$split$map, 2),
        initializationVector = _ciphertext$split$map2[0],
        data = _ciphertext$split$map2[1];

    return crypto.subtle.decrypt({
      name: "AES-GCM",
      iv: initializationVector,
      tagLength: 128
    }, key, data);
  }).then(function (buffer) {
    return decoder.decode(buffer);
  });
};

exports.generateRandom = function (length) {
  var array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return toBase64(array);
};

exports.importHmacSecret = function (rawSecret) {
  return Promise.resolve().then(function () {
    return crypto.subtle.importKey("raw", fromBase64(rawSecret), {
      name: "HMAC",
      hash: "SHA-256"
    }, false, ["sign"]);
  });
};

exports.getDigest = function (hmacSecret, data) {
  return Promise.resolve().then(function () {
    return crypto.subtle.sign({
      name: "HMAC",
      hash: "SHA-256"
    }, hmacSecret, encoder.encode(data));
  }).then(function (signature) {
    return toBase64(signature);
  });
};

exports.derivePasswordLegacy = function (params) {
  var salt = params.domain + "\0" + params.name;
  if (params.revision) salt += "\0" + params.revision;
  return Promise.resolve().then(function () {
    return deriveBitsLegacy(params.masterPassword, salt, params.length);
  }).then(function (array) {
    return toPassword(array, params.lower, params.upper, params.number, params.symbol);
  });
};

function toPassword(array, lower, upper, number, symbol) {
  var charsets = [];
  if (lower) charsets.push(LOWERCASE);
  if (upper) charsets.push(UPPERCASE);
  if (number) charsets.push(NUMBER);
  if (symbol) charsets.push(SYMBOL);

  var lengthSum = function lengthSum(previous, current) {
    return previous + current.length;
  };

  var numChars = charsets.reduce(lengthSum, 0);
  var seen = new Set();
  var result = [];

  for (var i = 0; i < array.length; i++) {
    if (charsets.length - seen.size >= array.length - i) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = seen.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var value = _step.value;

          var _index = charsets.indexOf(value);

          if (_index >= 0) charsets.splice(_index, 1);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      seen.clear();
      numChars = charsets.reduce(lengthSum, 0);
    }

    var index = array[i] % numChars;

    for (var _i2 = 0, _charsets = charsets; _i2 < _charsets.length; _i2++) {
      var charset = _charsets[_i2];

      if (index < charset.length) {
        result.push(charset[index]);
        seen.add(charset);
        break;
      }

      index -= charset.length;
    }
  }

  return result.join("");
}

var pearsonHashPermutations = null;

function pearsonHash(buffer, start, len, virtualByte) {
  if (!pearsonHashPermutations) {
    pearsonHashPermutations = new Array(256);

    for (var i = 0; i < pearsonHashPermutations.length; i++) {
      pearsonHashPermutations[i] = (i + 379) * 467 & 0xFF;
    }
  }

  var hash = pearsonHashPermutations[virtualByte];

  for (var _i3 = start; _i3 < start + len; _i3++) {
    hash = pearsonHashPermutations[hash ^ buffer[_i3]];
  }

  return hash;
}

exports.pearsonHash = pearsonHash;

function toBase64(buffer) {
  var array = new Uint8Array(buffer);
  var result = [];

  for (var i = 0; i < array.length; i++) {
    result.push(String.fromCharCode(array[i]));
  }

  return btoa(result.join(""));
}

exports.toBase64 = toBase64;

function fromBase64(string) {
  var decoded = atob(string);
  var result = new Uint8Array(decoded.length);

  for (var i = 0; i < decoded.length; i++) {
    result[i] = decoded.charCodeAt(i);
  }

  return result;
}

exports.fromBase64 = fromBase64; // Our Base32 variant follows RFC 4648 but uses a custom alphabet to remove
// ambiguous characters: 0, 1, O, I.

var base32Alphabet = exports.base32Alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function toBase32(buffer) {
  var pos = 0;
  var current = 0;
  var currentBits = 0;
  var result = [];

  while (pos < buffer.length || currentBits >= 5) {
    if (currentBits < 5) {
      current = current << 8 | buffer[pos++];
      currentBits += 8;
    }

    var remainder = currentBits - 5;
    result.push(base32Alphabet[current >> remainder]);
    current &= ~(31 << remainder);
    currentBits = remainder;
  } // Our input is always padded, so there should never be data left here


  if (currentBits) throw new Error("Unexpected: length of data encoded to base32 has to be a multiple of five");
  return result.join("");
}

exports.toBase32 = toBase32;

function fromBase32(str) {
  str = str.replace(new RegExp("[^".concat(base32Alphabet, "]"), "g"), "").toUpperCase();
  if (str.length % 8) throw new Error("Unexpected: length of data decoded from base32 has to be a multiple of eight");
  var mapping = new Map();

  for (var i = 0; i < base32Alphabet.length; i++) {
    mapping.set(base32Alphabet[i], i);
  }

  var pos = 0;
  var current = 0;
  var currentBits = 0;
  var result = new Uint8Array(str.length / 8 * 5);

  for (var _i4 = 0; _i4 < str.length; _i4++) {
    current = current << 5 | mapping.get(str[_i4]);
    currentBits += 5;

    if (currentBits >= 8) {
      var remainder = currentBits - 8;
      result[pos++] = current >> remainder;
      current &= ~(31 << remainder);
      currentBits = remainder;
    }
  }

  return result;
}

exports.fromBase32 = fromBase32;

/***/ }),
/* 4 */
/*!*******************!*\
  !*** ./lib/ui.js ***!
  \*******************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */


var browser = __webpack_require__(/*! ./browserAPI */ 2);

function getCurrentHost() {
  return browser.tabs.query({
    lastFocusedWindow: true,
    active: true
  }).then(function (tabs) {
    if (!tabs.length) return Promise.reject();
    return new URL(tabs[0].url);
  }).then(function (url) {
    if (url.protocol != "http:" && url.protocol != "https:") return Promise.reject();
    return url.hostname || "";
  })["catch"](function () {
    return "";
  });
}

exports.getCurrentHost = getCurrentHost;

function showAllPasswords() {
  var url = browser.runtime.getURL("ui/allpasswords/allpasswords.html"); // Only look for existing tab in the active window, don't activate
  // background windows to avoid unexpected effects.

  return browser.tabs.query({
    url: url,
    lastFocusedWindow: true
  })["catch"](function (error) {
    // Querying will fail for extension URLs before Firefox 56, see
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1271354
    return [];
  }).then(function (tabs) {
    if (tabs.length) return browser.tabs.update(tabs[0].id, {
      active: true
    });else {
      return browser.tabs.create({
        url: url,
        active: true
      });
    }
  });
}

exports.showAllPasswords = showAllPasswords;

function getLink(_ref) {
  var type = _ref.type,
      param = _ref.param;
  if (type == "url") return param;else if (type == "relnotes") return "https://pfp.works/release-notes/".concat(param);else if (type == "documentation") return "https://pfp.works/documentation/".concat(param, "/");
  throw new Error("Unexpected link type");
}

exports.getLink = getLink;

function openLink(options) {
  return browser.tabs.create({
    url: getLink(options),
    active: true
  }).then(function (tab) {});
}

exports.openLink = openLink;

function openAndWait(url, expectedUrl) {
  return browser.tabs.create({
    url: url,
    active: true
  }).then(function (tab) {
    var id = tab.id;
    return new Promise(function (resolve, reject) {
      var updateCallback = function updateCallback(tabId, changeInfo, tab) {
        if (tabId == id && tab.url.startsWith(expectedUrl)) {
          resolve(tab.url);
          browser.tabs.remove(id);
          browser.tabs.onUpdated.removeListener(updateCallback);
          browser.tabs.onRemoved.removeListener(removeCallback);
        }
      };

      var removeCallback = function removeCallback(tabId, removeInfo) {
        if (tabId == id) {
          reject("tab-closed");
          browser.tabs.onUpdated.removeListener(updateCallback);
          browser.tabs.onRemoved.removeListener(removeCallback);
        }
      };

      browser.tabs.onUpdated.addListener(updateCallback);
      browser.tabs.onRemoved.addListener(removeCallback);
    });
  });
}

exports.openAndWait = openAndWait;

/***/ }),
/* 5 */
/*!************************!*\
  !*** ./lib/storage.js ***!
  \************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var browser = __webpack_require__(/*! ./browserAPI */ 2);

var _require = __webpack_require__(/*! ./crypto */ 3),
    generateSalt = _require.generateSalt,
    deriveKey = _require.deriveKey;

var prefsPrefix = "pref:";

function has(name) {
  return browser.storage.local.get(name).then(function (items) {
    return items.hasOwnProperty(name);
  });
}

exports.has = has;

function hasPrefix(prefix) {
  return browser.storage.local.get(null).then(function (items) {
    return Object.keys(items).some(function (name) {
      return name.startsWith(prefix);
    });
  });
}

exports.hasPrefix = hasPrefix;

function get(name, key) {
  return browser.storage.local.get(name).then(function (items) {
    if (!items.hasOwnProperty(name)) return undefined;
    return __webpack_require__(/*! ./masterPassword */ 1).decrypt(items[name], key);
  });
}

exports.get = get;

function getAllByPrefix(prefix, key) {
  return browser.storage.local.get(null).then(function (items) {
    var _require2 = __webpack_require__(/*! ./masterPassword */ 1),
        decrypt = _require2.decrypt;

    var result = {};
    var names = Object.keys(items).filter(function (name) {
      return name.startsWith(prefix) && !name.startsWith(prefsPrefix);
    });

    var decryptNextName = function decryptNextName() {
      if (!names.length) return result;
      var name = names.pop();
      return decrypt(items[name], key).then(function (plaintext) {
        result[name] = plaintext;
        return decryptNextName();
      });
    };

    return decryptNextName();
  });
}

exports.getAllByPrefix = getAllByPrefix;

function set(name, value, key) {
  return __webpack_require__(/*! ./masterPassword */ 1).encrypt(value, key).then(function (ciphertext) {
    return browser.storage.local.set(_defineProperty({}, name, ciphertext));
  }).then(function () {
    return triggerModificationListeners(name);
  });
}

exports.set = set;

function delete_(name) {
  return browser.storage.local.remove(name).then(function () {
    if (Array.isArray(name)) return Promise.all(name.map(function (n) {
      return triggerModificationListeners(n);
    }));else return triggerModificationListeners(name);
  });
}

exports["delete"] = delete_;

function deleteByPrefix(prefix) {
  return browser.storage.local.get(null).then(function (items) {
    var keys = Object.keys(items).filter(function (name) {
      return name.startsWith(prefix);
    });
    return delete_(keys);
  });
}

exports.deleteByPrefix = deleteByPrefix;

function clear() {
  return browser.storage.local.get(null).then(function (items) {
    var keys = Object.keys(items).filter(function (name) {
      return !name.startsWith(prefsPrefix);
    });
    return delete_(keys);
  });
}

exports.clear = clear;
var modificationListeners = [];

function triggerModificationListeners(key) {
  return Promise.all(modificationListeners.map(function (listener) {
    return listener(key);
  }));
}

function addModificationListener(listener) {
  modificationListeners.push(listener);
}

exports.addModificationListener = addModificationListener;

function removeModificationListener(listener) {
  var index = modificationListeners.indexOf(listener);
  if (index >= 0) modificationListeners.splice(index, 1);
}

exports.removeModificationListener = removeModificationListener;

/***/ }),
/* 6 */
/*!**************************!*\
  !*** ./lib/messaging.js ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */


function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var browser = __webpack_require__(/*! ./browserAPI */ 2);

var _require = __webpack_require__(/*! ./eventTarget */ 8),
    EventTarget = _require.EventTarget,
    emit = _require.emit;

var ports = new Map();

exports.getPort = function (name) {
  if (!ports.has(name)) {
    var targets = [];
    var wrapper = EventTarget();
    browser.runtime.onConnect.addListener(function (port) {
      if (name == "*" || port.name == name) {
        targets.push(port);
        port.onDisconnect.addListener(function (port) {
          var index = targets.indexOf(port);
          if (index >= 0) targets.splice(index, 1);
          emit(wrapper, "disconnect");
        });
        port.onMessage.addListener(function (message) {
          emit.apply(void 0, [wrapper, message.eventName].concat(_toConsumableArray(message.args)));
        });
        emit(wrapper, "connect");
      }
    });

    wrapper.emit = function (eventName) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      for (var _i = 0, _targets = targets; _i < _targets.length; _i++) {
        var target = _targets[_i];
        target.postMessage({
          eventName: eventName,
          args: args
        });
      }
    };

    ports.set(name, wrapper);
  }

  return ports.get(name);
};

/***/ }),
/* 7 */
/*!*********************!*\
  !*** ./lib/sync.js ***!
  \*********************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var crypto = __webpack_require__(/*! ./crypto */ 3);

var masterPassword = __webpack_require__(/*! ./masterPassword */ 1);

var passwords = __webpack_require__(/*! ./passwords */ 0);

var storage = __webpack_require__(/*! ./storage */ 5);

var lock = passwords.lock,
    passwordsPrefix = passwords.STORAGE_PREFIX;
var MAX_RETRIES = 5;
var MILLIS_IN_SECOND = 1000;
var MILLIS_IN_MINUTE = 60 * MILLIS_IN_SECOND;
var MILLIS_IN_HOUR = 60 * MILLIS_IN_MINUTE;

function getProvider(provider) {
  if (provider == "dropbox") return __webpack_require__(/*! ./sync-providers/dropbox */ 16);else if (provider == "gdrive") return __webpack_require__(/*! ./sync-providers/gdrive */ 17);else if (provider == "remotestorage") return __webpack_require__(/*! ./sync-providers/remotestorage */ 18);else throw new Error("Unknown sync provider");
}

var tracker = {
  enabled: false,
  prefix: "sync:",
  override: false,
  onModified: function onModified(key) {
    if (this.override || !key.startsWith(passwordsPrefix)) return Promise.resolve();
    return storage.set(this.prefix + key, true, null);
  },
  enable: function enable(startUp) {
    var _this = this;

    if (this.enabled) return Promise.resolve();
    this.enabled = true;
    var waitFor;

    if (startUp) {
      storage.addModificationListener(this.onModified);
      return Promise.resolve();
    } else {
      return storage.getAllByPrefix(passwordsPrefix, null).then(function (items) {
        storage.addModificationListener(_this.onModified);
        var actions = [];

        for (var key in items) {
          actions.push(storage.set(_this.prefix + key, true, null));
        }

        return Promise.all(actions);
      });
    }
  },
  disable: function disable() {
    if (!this.enabled) return Promise.resolve();
    storage.removeModificationListener(this.onModified);
    this.enabled = false;
    return this.clearModifiedKeys();
  },
  getModifiedKeys: function getModifiedKeys() {
    var _this2 = this;

    return storage.getAllByPrefix(this.prefix, null).then(function (items) {
      return new Set(Object.keys(items).map(function (key) {
        return key.substr(_this2.prefix.length);
      }));
    });
  },
  clearModifiedKeys: function clearModifiedKeys() {
    return storage.deleteByPrefix(this.prefix);
  }
};
tracker.onModified = tracker.onModified.bind(tracker);
var engine = {
  storageKey: "syncData",
  secretKey: "sync-secret",
  checkInterval: 10 * MILLIS_IN_MINUTE,
  syncInterval: MILLIS_IN_HOUR,
  data: null,
  currentSync: null,
  _timeout: null,
  init: function init() {
    var _this3 = this;

    storage.get(this.storageKey, null).then(function (value) {
      _this3.data = value;

      if (_this3.data) {
        tracker.enable(true);

        _this3._start();
      }

      triggerModificationListeners();
    });
  },
  _start: function _start() {
    this._stop();

    this._timeout = setInterval(this._check, this.checkInterval);

    this._check();
  },
  _stop: function _stop() {
    if (this._timeout !== null) clearTimeout(this._timeout);
    this._timeout = null;
  },
  _check: function _check() {
    var now = Date.now();
    if (!this.data.lastSync || this.data.lastSync > now || now - this.data.lastSync >= this.syncInterval) this.sync();
  },
  _rekey: function _rekey(data, nestingLevel) {
    var _this4 = this;

    return masterPassword.deriveKey(data[masterPassword.saltKey]).then(function (decryptionKey) {
      return Promise.all([decryptionKey, masterPassword.decrypt(data[masterPassword.hmacSecretKey], decryptionKey)]);
    })["catch"](function (error) {
      console.error(error);
      throw "sync_wrong_master_password";
    }).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          decryptionKey = _ref2[0],
          hmacSecret = _ref2[1];

      return masterPassword.rekey(data[masterPassword.saltKey], hmacSecret, decryptionKey);
    }).then(function () {
      return _this4.sync(nestingLevel + 1);
    });
  },
  _calculateSignature: function _calculateSignature(data, revision, rawSecret) {
    var values = [revision];
    var keys = Object.keys(data);
    keys.sort();

    for (var _i2 = 0, _keys = keys; _i2 < _keys.length; _i2++) {
      var key = _keys[_i2];
      values.push([key, data[key]]);
    }

    return crypto.importHmacSecret(rawSecret).then(function (secret) {
      return crypto.getDigest(secret, JSON.stringify(values));
    });
  },
  _validateSignature: function _validateSignature(data, revision, rawSecret, expectedSignature) {
    return this._calculateSignature(data, revision, rawSecret).then(function (signature) {
      if (signature != expectedSignature) throw "sync_tampered_data";
    });
  },
  sync: function sync() {
    var _this5 = this;

    var nestingLevel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    if (!nestingLevel && this.currentSync) return this.currentSync;

    if (!navigator.onLine) {
      this.data.error = "sync_connection_error";
      triggerModificationListeners();
      return storage.set(this.storageKey, this.data, null);
    }

    var path = "/passwords.json";
    var _this$data = this.data,
        provider = _this$data.provider,
        token = _this$data.token,
        username = _this$data.username;
    var action = (nestingLevel ? Promise.resolve() : lock.acquire()).then(function () {
      return Promise.all([getProvider(provider).get(path, token, username), passwords.exportPasswordData([_this5.secretKey])]);
    }).then(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          remoteData = _ref4[0],
          localData = _ref4[1];

      var local = JSON.parse(localData);
      if (!remoteData) return Promise.resolve([null, null, local, null]);
      var remote;

      try {
        remote = JSON.parse(remoteData.contents);
      } catch (e) {
        throw "sync_unknown_data_format";
      }

      if (!remote || _typeof(remote) != "object" || remote.application != local.application || remote.format != 2 && remote.format != 3 || !remote.data || _typeof(remote.data) != "object" || typeof remote.data[masterPassword.saltKey] != "string" || typeof remote.data[masterPassword.hmacSecretKey] != "string") {
        throw "sync_unknown_data_format";
      }

      if (remote.data[masterPassword.saltKey] != local.data[masterPassword.saltKey]) {
        throw {
          toString: function toString() {
            return "rekey_required";
          },
          data: remote.data
        };
      }

      if (local.data[_this5.secretKey] && local.data[_this5.secretKey] != remote.data[_this5.secretKey]) throw "sync_unrelated_client";
      var validation = Promise.resolve();

      if (remote.data[_this5.secretKey]) {
        if (typeof remote.revision != "number" || remote.revision <= 0 || typeof remote.signature != "string") throw "sync_unknown_data_format";
        if (_this5.data.revision && remote.revision < _this5.data.revision) throw "sync_tampered_data";
        if (_this5.data.secret) validation = validation.then(function () {
          return _this5.data.secret;
        });else validation = validation.then(function () {
          return masterPassword.decrypt(remote.data[_this5.secretKey]);
        });
        validation = validation.then(function (secret) {
          return Promise.all([secret, _this5._validateSignature(remote.data, remote.revision, secret, remote.signature)]);
        }).then(function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 1),
              secret = _ref6[0];

          _this5.data.secret = secret;
          _this5.data.revision = remote.revision;
          triggerModificationListeners();
          return storage.set(_this5.storageKey, _this5.data, null);
        });
      }

      return validation.then(function () {
        return Promise.all([remote, remoteData.revision, local, tracker.getModifiedKeys()]);
      });
    }).then(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 4),
          remote = _ref8[0],
          fileRevision = _ref8[1],
          local = _ref8[2],
          modifiedKeys = _ref8[3];

      var modified = !remote;
      var additions = [];
      var removals = [];

      if (remote) {
        for (var _i3 = 0, _Object$keys = Object.keys(remote.data); _i3 < _Object$keys.length; _i3++) {
          var key = _Object$keys[_i3];

          if (!modifiedKeys.has(key)) {
            local.data[key] = remote.data[key];
            additions.push([key, local.data[key]]);
          } else if (local.data[key] != remote.data[key]) modified = true;
        }

        for (var _i4 = 0, _Object$keys2 = Object.keys(local.data); _i4 < _Object$keys2.length; _i4++) {
          var _key = _Object$keys2[_i4];

          if (!remote.data.hasOwnProperty(_key)) {
            if (!modifiedKeys.has(_key)) {
              delete local.data[_key];
              removals.push(_key);
            } else modified = true;
          }
        }
      }

      var updateAction = Promise.resolve();

      if (modified) {
        local.revision = (_this5.data.revision || 0) + 1;

        if (!_this5.data.secret) {
          updateAction = updateAction.then(function () {
            _this5.data.secret = crypto.generateRandom(32);
            return storage.set(_this5.secretKey, _this5.data.secret);
          }).then(function () {
            return storage.get(_this5.secretKey, null);
          }).then(function (encrypted) {
            local.data[_this5.secretKey] = encrypted;
          });
        }

        updateAction = updateAction.then(function () {
          return _this5._calculateSignature(local.data, local.revision, _this5.data.secret);
        }).then(function (signature) {
          local.signature = signature;
          return getProvider(provider).put(path, JSON.stringify(local), fileRevision, token, username);
        }).then(function () {
          _this5.data.revision = local.revision;
          triggerModificationListeners();
          storage.set(_this5.storageKey, _this5.data, null);
        });
      }

      return Promise.all([additions, removals, updateAction]);
    }).then(function (_ref9) {
      var _ref10 = _slicedToArray(_ref9, 3),
          additions = _ref10[0],
          removals = _ref10[1],
          _ = _ref10[2];

      tracker.override = true;
      var actions = [tracker.clearModifiedKeys()];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = additions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              key = _step$value[0],
              value = _step$value[1];

          actions.push(storage.set(key, value, null));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (removals.length) actions.push(storage["delete"](removals));
      return Promise.all(actions);
    })["catch"](function (e) {
      if (e == "rekey_required") return _this5._rekey(e.data, nestingLevel);else if (e == "master_password_required") return _this5._reportError("sync_master_password_required");else if (e == "sync_wrong_revision") {
        // Remote revision changed, retry sync
        if (nestingLevel < MAX_RETRIES) return _this5.sync(nestingLevel + 1);else return _this5._reportError("sync_too_many_retries");
      } else return _this5._reportError(e);
    })["finally"](function () {
      var actions = null;

      if (_this5.data) {
        _this5.data.lastSync = Date.now();
        action = storage.set(_this5.storageKey, _this5.data, null);
      }

      if (!nestingLevel) {
        tracker.override = false;
        _this5.currentSync = null;
        triggerModificationListeners();
        lock.release();
      }

      return action;
    });
    if (!nestingLevel) this.currentSync = action;
    delete this.data.error;
    triggerModificationListeners();
    return Promise.all([action, storage.set(this.storageKey, this.data, null)]);
  },
  _reportError: function _reportError(e) {
    if (!this.data) return Promise.resolve();
    this.data.error = String(e);
    if (typeof e != "string") console.error(e);
    triggerModificationListeners();
    return storage.set(this.storageKey, this.data, null);
  },
  setup: function setup(provider, token, username) {
    var _this6 = this;

    return lock.acquire().then(function () {
      return tracker.enable();
    }).then(function () {
      _this6.data = {
        provider: provider,
        token: token,
        username: username
      };
      triggerModificationListeners();

      _this6._start();

      return storage.set(_this6.storageKey, _this6.data, null);
    })["finally"](function () {
      return lock.release();
    });
  },
  disable: function disable(noLock) {
    var _this7 = this;

    if (!this.data) return Promise.resolve();
    return (noLock ? Promise.resolve() : lock.acquire()).then(function () {
      _this7.data = null;

      _this7._stop();

      triggerModificationListeners();
      return Promise.all([storage["delete"](_this7.storageKey), storage["delete"](_this7.secretKey), tracker.disable()]);
    })["finally"](function () {
      return noLock || lock.release();
    });
  }
};
engine._check = engine._check.bind(engine);
engine.init();
Object.defineProperty(exports, "syncData", {
  enumerable: true,
  get: function get() {
    return engine.data;
  }
});
Object.defineProperty(exports, "isSyncing", {
  enumerable: true,
  get: function get() {
    return !!engine.currentSync;
  }
});

exports.authorize = function (provider, username) {
  return getProvider(provider).authorize(username).then(function (token) {
    return engine.setup(provider, token, username);
  })["catch"](function (error) {
    console.error(error);
  });
};

exports.getManualAuthURL = function (provider, username) {
  return getProvider(provider).getManualAuthURL(username);
};

exports.manualAuthorization = function (provider, username, code) {
  return getProvider(provider).processAuthCode(code).then(function (token) {
    return engine.setup(provider, token, username);
  });
};

exports.disable = function (noLock) {
  return engine.disable(noLock);
};

exports.sync = function () {
  return engine.sync();
};

var modificationListeners = [];

function triggerModificationListeners() {
  for (var _i5 = 0, _modificationListener = modificationListeners; _i5 < _modificationListener.length; _i5++) {
    var listener = _modificationListener[_i5];
    listener();
  }
}

function addModificationListener(listener) {
  modificationListeners.push(listener);
}

exports.addModificationListener = addModificationListener;

function removeModificationListener(listener) {
  var index = modificationListeners.indexOf(listener);
  if (index >= 0) modificationListeners.splice(index, 1);
}

exports.removeModificationListener = removeModificationListener;

/***/ }),
/* 8 */
/*!****************************!*\
  !*** ./lib/eventTarget.js ***!
  \****************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */


var proto = {
  on: function on(eventName, listener) {
    if (!(eventName in this._listeners)) this._listeners[eventName] = [];

    this._listeners[eventName].push(listener);
  },
  off: function off(eventName, listener) {
    var index = eventName in this._listeners ? this._listeners[eventName].indexOf(listener) : -1;
    if (index >= 0) this._listeners[eventName].splice(index, 1);
  },
  once: function once(eventName, listener) {
    var _this = this;

    var wrapper = function wrapper() {
      _this.off(eventName, wrapper);

      listener.apply(void 0, arguments);
    };

    this.on(eventName, wrapper);
  }
};

exports.EventTarget = function () {
  var result = Object.create(proto);
  result._listeners = [];
  return result;
};

exports.emit = function (obj, eventName) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (obj._listeners[eventName] || [])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var listener = _step.value;
      listener.apply(void 0, args);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

/***/ }),
/* 9 */
/*!**********************!*\
  !*** ./lib/prefs.js ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var browser = __webpack_require__(/*! ./browserAPI */ 2);

var _require = __webpack_require__(/*! ./eventTarget */ 8),
    EventTarget = _require.EventTarget,
    emit = _require.emit;

exports = module.exports = EventTarget();

function get(name, defaultValue) {
  var key = "pref:" + name;
  return browser.storage.local.get(key).then(function (items) {
    return key in items ? items[key] : defaultValue;
  });
}

exports.get = get;

function set(name, value) {
  var key = "pref:" + name;
  return browser.storage.local.set(_defineProperty({}, key, value)).then(function () {
    return emit(exports, name, name, value);
  });
}

exports.set = set;

/***/ }),
/* 10 */
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

__webpack_require__(/*! ./proxy */ 11);

var browser = __webpack_require__(/*! ./browserAPI */ 2);

var messaging = __webpack_require__(/*! ./messaging */ 6);

var passwords = __webpack_require__(/*! ./passwords */ 0);

var masterPassword = __webpack_require__(/*! ./masterPassword */ 1);

var sync = __webpack_require__(/*! ./sync */ 7);

var _require = __webpack_require__(/*! ./ui */ 4),
    getCurrentHost = _require.getCurrentHost;

function getSyncState() {
  var data = sync.syncData || {};
  return {
    provider: data.provider || null,
    username: data.username || null,
    lastSync: data.lastSync || null,
    error: data.error || null,
    isSyncing: sync.isSyncing
  };
}

var panelPort = messaging.getPort("panel");
panelPort.on("connect", function () {
  masterPassword.suspendAutoLock();
  Promise.all([getCurrentHost(), masterPassword.state]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        currentHost = _ref2[0],
        masterPasswordState = _ref2[1];

    if (masterPasswordState != "known") return panelPort.emit("init", {
      masterPasswordState: masterPasswordState,
      origSite: currentHost,
      sync: getSyncState()
    });
    return passwords.getPasswords(currentHost).then(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 3),
          origSite = _ref4[0],
          site = _ref4[1],
          pwdList = _ref4[2];

      panelPort.emit("init", {
        masterPasswordState: masterPasswordState,
        origSite: origSite,
        site: site,
        pwdList: pwdList,
        sync: getSyncState()
      });
    });
  });
});
panelPort.on("disconnect", function () {
  masterPassword.resumeAutoLock();
});
sync.addModificationListener(function () {
  var state = getSyncState();
  panelPort.emit("init", {
    sync: state
  });

  if (browser.browserAction && browser.browserAction.setBadgeText) {
    browser.browserAction.setBadgeText({
      text: state.error && state.error != "sync_connection_error" ? "!" : ""
    });
    browser.browserAction.setBadgeBackgroundColor({
      color: [255, 0, 0, 255]
    });
  }
});

/***/ }),
/* 11 */
/*!**********************!*\
  !*** ./lib/proxy.js ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */


function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var port = __webpack_require__(/*! ./messaging */ 6).getPort("*");

port.on("_proxy", handleMessage);

function handleMessage(_ref) {
  var messageId = _ref.messageId,
      moduleName = _ref.moduleName,
      method = _ref.method,
      args = _ref.args;
  Promise.resolve().then(function () {
    if (moduleName == "passwords") return __webpack_require__(/*! ./passwords */ 0);else if (moduleName == "masterPassword") return __webpack_require__(/*! ./masterPassword */ 1);else if (moduleName == "passwordRetrieval") return __webpack_require__(/*! ./passwordRetrieval */ 23);else if (moduleName == "prefs") return __webpack_require__(/*! ./prefs */ 9);else if (moduleName == "recoveryCodes") return __webpack_require__(/*! ./recoveryCodes */ 24);else if (moduleName == "sync") return __webpack_require__(/*! ./sync */ 7);else if (moduleName == "ui") return __webpack_require__(/*! ./ui */ 4);else throw new Error("Unknown module");
  }).then(function (obj) {
    return obj[method].apply(obj, _toConsumableArray(args));
  }).then(function (result) {
    port.emit("_proxyResponse-" + messageId, [null, result]);
  })["catch"](function (error) {
    if (typeof error != "string") {
      console.error(error);
      if (error && error.stack) error = error + "\n" + error.stack;else error = String(error);
    }

    port.emit("_proxyResponse-" + messageId, [error, null]);
  });
}

/***/ }),
/* 12 */
/*!****************************!*\
  !*** ./web/eventTarget.js ***!
  \****************************/
/*! exports provided: EventTarget */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is referenced from these modules with unsupported syntax: ./web/backgroundBrowserAPI.js (referenced with cjs require) */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventTarget", function() { return EventTarget; });
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */


function EventTarget() {
  this._listeners = [];
}
EventTarget.prototype = {
  addListener: function addListener(listener) {
    this._listeners.push(listener);
  },
  removeListener: function removeListener(listener) {
    var index = this._listeners.indexOf(listener);

    if (index >= 0) this._listeners.splice(index, 1);
  },
  _emit: function _emit() {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this._listeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var listener = _step.value;
        listener.apply(void 0, arguments);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
};

/***/ }),
/* 13 */
/*!**************************!*\
  !*** ./worker/scrypt.js ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = "!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(t,\"__esModule\",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&\"object\"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,\"default\",{enumerable:!0,value:t}),2&e&&\"string\"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,\"a\",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p=\"\",n(n.s=4)}([function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0}),e.wipe=function(t){for(var e=0;e<t.length;e++)t[e]=0;return t}},function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var r=n(3);function i(t,e,n){return void 0===e&&(e=new Uint8Array(2)),void 0===n&&(n=0),e[n+0]=t>>>8,e[n+1]=t>>>0,e}function o(t,e,n){return void 0===e&&(e=new Uint8Array(2)),void 0===n&&(n=0),e[n+0]=t>>>0,e[n+1]=t>>>8,e}function s(t,e){return void 0===e&&(e=0),t[e]<<24|t[e+1]<<16|t[e+2]<<8|t[e+3]}function a(t,e){return void 0===e&&(e=0),(t[e]<<24|t[e+1]<<16|t[e+2]<<8|t[e+3])>>>0}function u(t,e){return void 0===e&&(e=0),t[e+3]<<24|t[e+2]<<16|t[e+1]<<8|t[e]}function f(t,e){return void 0===e&&(e=0),(t[e+3]<<24|t[e+2]<<16|t[e+1]<<8|t[e])>>>0}function c(t,e,n){return void 0===e&&(e=new Uint8Array(4)),void 0===n&&(n=0),e[n+0]=t>>>24,e[n+1]=t>>>16,e[n+2]=t>>>8,e[n+3]=t>>>0,e}function h(t,e,n){return void 0===e&&(e=new Uint8Array(4)),void 0===n&&(n=0),e[n+0]=t>>>0,e[n+1]=t>>>8,e[n+2]=t>>>16,e[n+3]=t>>>24,e}function d(t,e,n){return void 0===e&&(e=new Uint8Array(8)),void 0===n&&(n=0),c(t/4294967296>>>0,e,n),c(t>>>0,e,n+4),e}function l(t,e,n){return void 0===e&&(e=new Uint8Array(8)),void 0===n&&(n=0),h(t>>>0,e,n),h(t/4294967296>>>0,e,n+4),e}e.readInt16BE=function(t,e){return void 0===e&&(e=0),(t[e+0]<<8|t[e+1])<<16>>16},e.readUint16BE=function(t,e){return void 0===e&&(e=0),(t[e+0]<<8|t[e+1])>>>0},e.readInt16LE=function(t,e){return void 0===e&&(e=0),(t[e+1]<<8|t[e])<<16>>16},e.readUint16LE=function(t,e){return void 0===e&&(e=0),(t[e+1]<<8|t[e])>>>0},e.writeUint16BE=i,e.writeInt16BE=i,e.writeUint16LE=o,e.writeInt16LE=o,e.readInt32BE=s,e.readUint32BE=a,e.readInt32LE=u,e.readUint32LE=f,e.writeUint32BE=c,e.writeInt32BE=c,e.writeUint32LE=h,e.writeInt32LE=h,e.readInt64BE=function(t,e){void 0===e&&(e=0);var n=s(t,e),r=s(t,e+4),i=4294967296*n+r;return r<0&&(i+=4294967296),i},e.readUint64BE=function(t,e){return void 0===e&&(e=0),4294967296*a(t,e)+a(t,e+4)},e.readInt64LE=function(t,e){void 0===e&&(e=0);var n=u(t,e),r=4294967296*u(t,e+4)+n;return n<0&&(r+=4294967296),r},e.readUint64LE=function(t,e){void 0===e&&(e=0);var n=f(t,e);return 4294967296*f(t,e+4)+n},e.writeUint64BE=d,e.writeInt64BE=d,e.writeUint64LE=l,e.writeInt64LE=l,e.readUintBE=function(t,e,n){if(void 0===n&&(n=0),t%8!=0)throw new Error(\"readUintBE supports only bitLengths divisible by 8\");if(t/8>e.length-n)throw new Error(\"readUintBE: array is too short for the given bitLength\");for(var r=0,i=1,o=t/8+n-1;o>=n;o--)r+=e[o]*i,i*=256;return r},e.readUintLE=function(t,e,n){if(void 0===n&&(n=0),t%8!=0)throw new Error(\"readUintLE supports only bitLengths divisible by 8\");if(t/8>e.length-n)throw new Error(\"readUintLE: array is too short for the given bitLength\");for(var r=0,i=1,o=n;o<n+t/8;o++)r+=e[o]*i,i*=256;return r},e.writeUintBE=function(t,e,n,i){if(void 0===n&&(n=new Uint8Array(t/8)),void 0===i&&(i=0),t%8!=0)throw new Error(\"writeUintBE supports only bitLengths divisible by 8\");if(!r.isSafeInteger(e))throw new Error(\"writeUintBE value must be an integer\");for(var o=1,s=t/8+i-1;s>=i;s--)n[s]=e/o&255,o*=256;return n},e.writeUintLE=function(t,e,n,i){if(void 0===n&&(n=new Uint8Array(t/8)),void 0===i&&(i=0),t%8!=0)throw new Error(\"writeUintLE supports only bitLengths divisible by 8\");if(!r.isSafeInteger(e))throw new Error(\"writeUintLE value must be an integer\");for(var o=1,s=i;s<i+t/8;s++)n[s]=e/o&255,o*=256;return n},e.readFloat32BE=function(t,e){return void 0===e&&(e=0),new DataView(t.buffer,t.byteOffset,t.byteLength).getFloat32(e)},e.readFloat32LE=function(t,e){return void 0===e&&(e=0),new DataView(t.buffer,t.byteOffset,t.byteLength).getFloat32(e,!0)},e.readFloat64BE=function(t,e){return void 0===e&&(e=0),new DataView(t.buffer,t.byteOffset,t.byteLength).getFloat64(e)},e.readFloat64LE=function(t,e){return void 0===e&&(e=0),new DataView(t.buffer,t.byteOffset,t.byteLength).getFloat64(e,!0)},e.writeFloat32BE=function(t,e,n){return void 0===e&&(e=new Uint8Array(4)),void 0===n&&(n=0),new DataView(e.buffer,e.byteOffset,e.byteLength).setFloat32(n,t),e},e.writeFloat32LE=function(t,e,n){return void 0===e&&(e=new Uint8Array(4)),void 0===n&&(n=0),new DataView(e.buffer,e.byteOffset,e.byteLength).setFloat32(n,t,!0),e},e.writeFloat64BE=function(t,e,n){return void 0===e&&(e=new Uint8Array(8)),void 0===n&&(n=0),new DataView(e.buffer,e.byteOffset,e.byteLength).setFloat64(n,t),e},e.writeFloat64LE=function(t,e,n){return void 0===e&&(e=new Uint8Array(8)),void 0===n&&(n=0),new DataView(e.buffer,e.byteOffset,e.byteLength).setFloat64(n,t,!0),e}},function(t,e){function n(t){return(n=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&\"function\"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?\"symbol\":typeof t})(t)}var r;r=function(){return this}();try{r=r||new Function(\"return this\")()}catch(t){\"object\"===(\"undefined\"==typeof window?\"undefined\":n(window))&&(r=window)}t.exports=r},function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0}),e.mul=Math.imul||function(t,e){var n=65535&t,r=65535&e;return n*r+((t>>>16&65535)*r+n*(e>>>16&65535)<<16>>>0)|0},e.add=function(t,e){return t+e|0},e.sub=function(t,e){return t-e|0},e.rotl=function(t,e){return t<<e|t>>>32-e},e.rotr=function(t,e){return t<<32-e|t>>>e},e.isInteger=Number.isInteger||function(t){return\"number\"==typeof t&&isFinite(t)&&Math.floor(t)===t},e.MAX_SAFE_INTEGER=9007199254740991,e.isSafeInteger=function(t){return e.isInteger(t)&&t>=-e.MAX_SAFE_INTEGER&&t<=e.MAX_SAFE_INTEGER}},function(t,e,n){\"use strict\";var r=n(5).toTypedArray,i=new(0,n(6).Scrypt)(32768,8,1);t.exports=i,\"undefined\"!=typeof self&&(self.onmessage=function(t){var e=t.data,n=e.jobId,o=e.password,s=e.salt,a=e.length;self.postMessage({jobId:n,result:i.deriveKey(r(o),r(s),a)})})},function(t,e,n){\"use strict\";e.toTypedArray=function(t){return t}},function(t,e,n){\"use strict\";(function(t){Object.defineProperty(e,\"__esModule\",{value:!0});var r=n(10),i=n(14),o=n(3),s=n(1),a=n(0),u=function(){function t(t,e,n){if(this._step=256,n<=0)throw new Error(\"scrypt: incorrect p\");if(e<=0)throw new Error(\"scrypt: incorrect r\");if(t<1||t>Math.pow(2,31))throw new Error(\"scrypt: N must be between 2 and 2^31\");if(!o.isInteger(t)||0!=(t&t-1))throw new Error(\"scrypt: N must be a power of 2\");if(e*n>=1<<30||e>16777216/n||e>8388608||t>16777216/e)throw new Error(\"scrypt: parameters are too large\");this._V=new Int32Array(32*(t+2)*e),this._XY=this._V.subarray(32*t*e),this.N=t,this.r=e,this.p=n}return t.prototype.deriveKey=function(t,e,n){for(var o=r.deriveKey(i.SHA256,t,e,1,128*this.p*this.r),s=0;s<this.p;s++)f(o.subarray(128*s*this.r),this.r,this.N,this._V,this._XY);var u=r.deriveKey(i.SHA256,t,o,1,n);return a.wipe(o),u},t.prototype.deriveKeyNonBlocking=function(t,e,n){for(var o=this,u=r.deriveKey(i.SHA256,t,e,1,128*this.p*this.r),f=Promise.resolve(this._step),c=function(t){f=f.then(function(e){return function(t,e,n,r,i,o){for(var u=32*e,f=new Int32Array(16),c=0;c<32*e;c++)r[c]=s.readUint32LE(t,4*c);return Promise.resolve(o).then(function(t){return h(0,n,t,function(t,n){for(;t<n;t++)p(f,r,t*(32*e),(t+1)*(32*e),e);return t})}).then(function(t){return h(0,n,t,function(t,o){for(;t<o;t+=2){var s=v(i,0,e)&n-1;l(i,0,r,s*(32*e),32*e),p(f,i,0,u,e),s=v(i,u,e)&n-1,l(i,u,r,s*(32*e),32*e),p(f,i,u,0,e)}return t})}).then(function(n){for(var r=0;r<32*e;r++)s.writeUint32LE(i[0+r],t,4*r);return a.wipe(f),n})}(u.subarray(128*t*o.r),o.r,o.N,o._V,o._XY,e)})},d=0;d<this.p;d++)c(d);return f.then(function(e){var s=r.deriveKey(i.SHA256,t,u,1,n);return a.wipe(u),o._step=e,s})},t.prototype.clean=function(){a.wipe(this._V)},t}();function f(t,e,n,r,i){for(var o=32*e,u=new Int32Array(16),f=0;f<32*e;f++)r[f]=s.readUint32LE(t,4*f);for(f=0;f<n;f++)p(u,r,f*(32*e),(f+1)*(32*e),e);for(f=0;f<n;f+=2){var c=v(i,0,e)&n-1;l(i,0,r,c*(32*e),32*e),p(u,i,0,o,e),l(i,o,r,(c=v(i,o,e)&n-1)*(32*e),32*e),p(u,i,o,0,e)}for(f=0;f<32*e;f++)s.writeUint32LE(i[0+f],t,4*f);a.wipe(u)}e.Scrypt=u,e.deriveKey=function(t,e,n,r,i,o){return new u(n,r,i).deriveKey(t,e,o)},e.deriveKeyNonBlocking=function(t,e,n,r,i,o){return new u(n,r,i).deriveKeyNonBlocking(t,e,o)};var c=void 0!==t?t:setTimeout;function h(t,e,n,r){return new Promise(function(i){var o,s=!1,a=100;!function u(){if(s||(o=Date.now()),(t=r(t,t+n<e?t+n:e))<e){if(!s){var f=Date.now()-o;f<a?f<=0?n*=2:n=Math.floor(100*n/f):s=!0}c(function(){u()})}else i(n)}()})}function d(t,e,n,r){for(var i,o=t[0]^e[n++],s=t[1]^e[n++],a=t[2]^e[n++],u=t[3]^e[n++],f=t[4]^e[n++],c=t[5]^e[n++],h=t[6]^e[n++],d=t[7]^e[n++],l=t[8]^e[n++],p=t[9]^e[n++],v=t[10]^e[n++],y=t[11]^e[n++],w=t[12]^e[n++],b=t[13]^e[n++],_=t[14]^e[n++],m=t[15]^e[n++],g=o,E=s,S=a,L=u,I=f,U=c,T=h,A=d,O=l,B=p,H=v,M=y,F=w,j=b,k=_,z=m,K=0;K<8;K+=2)g^=(i=(F^=(i=(O^=(i=(I^=(i=g+F)<<7|i>>>25)+g)<<9|i>>>23)+I)<<13|i>>>19)+O)<<18|i>>>14,U^=(i=(E^=(i=(j^=(i=(B^=(i=U+E)<<7|i>>>25)+U)<<9|i>>>23)+B)<<13|i>>>19)+j)<<18|i>>>14,H^=(i=(T^=(i=(S^=(i=(k^=(i=H+T)<<7|i>>>25)+H)<<9|i>>>23)+k)<<13|i>>>19)+S)<<18|i>>>14,z^=(i=(M^=(i=(A^=(i=(L^=(i=z+M)<<7|i>>>25)+z)<<9|i>>>23)+L)<<13|i>>>19)+A)<<18|i>>>14,g^=(i=(L^=(i=(S^=(i=(E^=(i=g+L)<<7|i>>>25)+g)<<9|i>>>23)+E)<<13|i>>>19)+S)<<18|i>>>14,U^=(i=(I^=(i=(A^=(i=(T^=(i=U+I)<<7|i>>>25)+U)<<9|i>>>23)+T)<<13|i>>>19)+A)<<18|i>>>14,H^=(i=(B^=(i=(O^=(i=(M^=(i=H+B)<<7|i>>>25)+H)<<9|i>>>23)+M)<<13|i>>>19)+O)<<18|i>>>14,z^=(i=(k^=(i=(j^=(i=(F^=(i=z+k)<<7|i>>>25)+z)<<9|i>>>23)+F)<<13|i>>>19)+j)<<18|i>>>14;e[r++]=t[0]=g+o|0,e[r++]=t[1]=E+s|0,e[r++]=t[2]=S+a|0,e[r++]=t[3]=L+u|0,e[r++]=t[4]=I+f|0,e[r++]=t[5]=U+c|0,e[r++]=t[6]=T+h|0,e[r++]=t[7]=A+d|0,e[r++]=t[8]=O+l|0,e[r++]=t[9]=B+p|0,e[r++]=t[10]=H+v|0,e[r++]=t[11]=M+y|0,e[r++]=t[12]=F+w|0,e[r++]=t[13]=j+b|0,e[r++]=t[14]=k+_|0,e[r++]=t[15]=z+m|0}function l(t,e,n,r,i){for(;i--;)t[e++]^=n[r++]}function p(t,e,n,r,i){!function(t,e,n,r,i){for(;i--;)t[e++]=n[r++]}(t,0,e,n+16*(2*i-1),16);for(var o=0;o<2*i;o+=2)d(t,e,n+16*o,r+8*o),d(t,e,n+16*o+16,r+8*o+16*i)}function v(t,e,n){return t[e+16*(2*n-1)]}}).call(this,n(7).setImmediate)},function(t,e,n){(function(t){var r=void 0!==t&&t||\"undefined\"!=typeof self&&self||window,i=Function.prototype.apply;function o(t,e){this._id=t,this._clearFn=e}e.setTimeout=function(){return new o(i.call(setTimeout,r,arguments),clearTimeout)},e.setInterval=function(){return new o(i.call(setInterval,r,arguments),clearInterval)},e.clearTimeout=e.clearInterval=function(t){t&&t.close()},o.prototype.unref=o.prototype.ref=function(){},o.prototype.close=function(){this._clearFn.call(r,this._id)},e.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},e.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},e._unrefActive=e.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;e>=0&&(t._idleTimeoutId=setTimeout(function(){t._onTimeout&&t._onTimeout()},e))},n(8),e.setImmediate=\"undefined\"!=typeof self&&self.setImmediate||void 0!==t&&t.setImmediate||this&&this.setImmediate,e.clearImmediate=\"undefined\"!=typeof self&&self.clearImmediate||void 0!==t&&t.clearImmediate||this&&this.clearImmediate}).call(this,n(2))},function(t,e,n){(function(t,e){!function(t,n){\"use strict\";if(!t.setImmediate){var r,i,o,s,a,u=1,f={},c=!1,h=t.document,d=Object.getPrototypeOf&&Object.getPrototypeOf(t);d=d&&d.setTimeout?d:t,\"[object process]\"==={}.toString.call(t.process)?r=function(t){e.nextTick(function(){p(t)})}:!function(){if(t.postMessage&&!t.importScripts){var e=!0,n=t.onmessage;return t.onmessage=function(){e=!1},t.postMessage(\"\",\"*\"),t.onmessage=n,e}}()?t.MessageChannel?((o=new MessageChannel).port1.onmessage=function(t){p(t.data)},r=function(t){o.port2.postMessage(t)}):h&&\"onreadystatechange\"in h.createElement(\"script\")?(i=h.documentElement,r=function(t){var e=h.createElement(\"script\");e.onreadystatechange=function(){p(t),e.onreadystatechange=null,i.removeChild(e),e=null},i.appendChild(e)}):r=function(t){setTimeout(p,0,t)}:(s=\"setImmediate$\"+Math.random()+\"$\",a=function(e){e.source===t&&\"string\"==typeof e.data&&0===e.data.indexOf(s)&&p(+e.data.slice(s.length))},t.addEventListener?t.addEventListener(\"message\",a,!1):t.attachEvent(\"onmessage\",a),r=function(e){t.postMessage(s+e,\"*\")}),d.setImmediate=function(t){\"function\"!=typeof t&&(t=new Function(\"\"+t));for(var e=new Array(arguments.length-1),n=0;n<e.length;n++)e[n]=arguments[n+1];var i={callback:t,args:e};return f[u]=i,r(u),u++},d.clearImmediate=l}function l(t){delete f[t]}function p(t){if(c)setTimeout(p,0,t);else{var e=f[t];if(e){c=!0;try{!function(t){var e=t.callback,r=t.args;switch(r.length){case 0:e();break;case 1:e(r[0]);break;case 2:e(r[0],r[1]);break;case 3:e(r[0],r[1],r[2]);break;default:e.apply(n,r)}}(e)}finally{l(t),c=!1}}}}}(\"undefined\"==typeof self?void 0===t?this:t:self)}).call(this,n(2),n(9))},function(t,e){var n,r,i=t.exports={};function o(){throw new Error(\"setTimeout has not been defined\")}function s(){throw new Error(\"clearTimeout has not been defined\")}function a(t){if(n===setTimeout)return setTimeout(t,0);if((n===o||!n)&&setTimeout)return n=setTimeout,setTimeout(t,0);try{return n(t,0)}catch(e){try{return n.call(null,t,0)}catch(e){return n.call(this,t,0)}}}!function(){try{n=\"function\"==typeof setTimeout?setTimeout:o}catch(t){n=o}try{r=\"function\"==typeof clearTimeout?clearTimeout:s}catch(t){r=s}}();var u,f=[],c=!1,h=-1;function d(){c&&u&&(c=!1,u.length?f=u.concat(f):h=-1,f.length&&l())}function l(){if(!c){var t=a(d);c=!0;for(var e=f.length;e;){for(u=f,f=[];++h<e;)u&&u[h].run();h=-1,e=f.length}u=null,c=!1,function(t){if(r===clearTimeout)return clearTimeout(t);if((r===s||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(t);try{r(t)}catch(e){try{return r.call(null,t)}catch(e){return r.call(this,t)}}}(t)}}function p(t,e){this.fun=t,this.array=e}function v(){}i.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];f.push(new p(t,e)),1!==f.length||c||a(l)},p.prototype.run=function(){this.fun.apply(null,this.array)},i.title=\"browser\",i.browser=!0,i.env={},i.argv=[],i.version=\"\",i.versions={},i.on=v,i.addListener=v,i.once=v,i.off=v,i.removeListener=v,i.removeAllListeners=v,i.emit=v,i.prependListener=v,i.prependOnceListener=v,i.listeners=function(t){return[]},i.binding=function(t){throw new Error(\"process.binding is not supported\")},i.cwd=function(){return\"/\"},i.chdir=function(t){throw new Error(\"process.chdir is not supported\")},i.umask=function(){return 0}},function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var r=n(11),i=n(1),o=n(0);e.deriveKey=function(t,e,n,s,a){for(var u=new r.HMAC(t,e),f=u.digestLength,c=new Uint8Array(4),h=new Uint8Array(f),d=new Uint8Array(f),l=new Uint8Array(a),p=u.update(n).saveState(),v=0;v*f<a;v++){i.writeUint32BE(v+1,c),u.restoreState(p).update(c).finish(d);for(var y=0;y<f;y++)h[y]=d[y];for(y=2;y<=s;y++){u.reset().update(d).finish(d);for(var w=0;w<f;w++)h[w]^=d[w]}for(y=0;y<f&&v*f+y<a;y++)l[v*f+y]=h[y]}return o.wipe(h),o.wipe(d),o.wipe(c),u.cleanSavedState(p),u.clean(),l}},function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var r=n(12),i=n(13),o=n(0),s=function(){function t(t,e){this._inner=new t,this._outer=new t,this.blockSize=this._outer.blockSize,this.digestLength=this._outer.digestLength;var n=new Uint8Array(this.blockSize);e.length>this.blockSize?this._inner.update(e).finish(n).clean():n.set(e);for(var i=0;i<n.length;i++)n[i]^=54;this._inner.update(n);for(i=0;i<n.length;i++)n[i]^=106;this._outer.update(n),r.isSerializableHash(this._inner)&&r.isSerializableHash(this._outer)&&(this._innerKeyedState=this._inner.saveState(),this._outerKeyedState=this._outer.saveState()),o.wipe(n)}return t.prototype.reset=function(){if(!r.isSerializableHash(this._inner)||!r.isSerializableHash(this._outer))throw new Error(\"hmac: can't reset() because hash doesn't implement restoreState()\");return this._inner.restoreState(this._innerKeyedState),this._outer.restoreState(this._outerKeyedState),this._finished=!1,this},t.prototype.clean=function(){r.isSerializableHash(this._inner)&&this._inner.cleanSavedState(this._innerKeyedState),r.isSerializableHash(this._outer)&&this._outer.cleanSavedState(this._outerKeyedState),this._inner.clean(),this._outer.clean()},t.prototype.update=function(t){return this._inner.update(t),this},t.prototype.finish=function(t){return this._finished?(this._outer.finish(t),this):(this._inner.finish(t),this._outer.update(t.subarray(0,this.digestLength)).finish(t),this._finished=!0,this)},t.prototype.digest=function(){var t=new Uint8Array(this.digestLength);return this.finish(t),t},t.prototype.saveState=function(){if(!r.isSerializableHash(this._inner))throw new Error(\"hmac: can't saveState() because hash doesn't implement it\");return this._inner.saveState()},t.prototype.restoreState=function(t){if(!r.isSerializableHash(this._inner)||!r.isSerializableHash(this._outer))throw new Error(\"hmac: can't restoreState() because hash doesn't implement it\");return this._inner.restoreState(t),this._outer.restoreState(this._outerKeyedState),this._finished=!1,this},t.prototype.cleanSavedState=function(t){if(!r.isSerializableHash(this._inner))throw new Error(\"hmac: can't cleanSavedState() because hash doesn't implement it\");this._inner.cleanSavedState(t)},t}();e.HMAC=s,e.hmac=function(t,e,n){var r=new s(t,e);r.update(n);var i=r.digest();return r.clean(),i},e.equal=i.equal},function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0}),e.isSerializableHash=function(t){return void 0!==t.saveState&&void 0!==t.restoreState&&void 0!==t.cleanSavedState}},function(t,e,n){\"use strict\";function r(t,e){if(t.length!==e.length)return 0;for(var n=0,r=0;r<t.length;r++)n|=t[r]^e[r];return 1&n-1>>>8}Object.defineProperty(e,\"__esModule\",{value:!0}),e.select=function(t,e,n){return~(t-1)&e|t-1&n},e.lessOrEqual=function(t,e){return(0|t)-(0|e)-1>>>31&1},e.compare=r,e.equal=function(t,e){return 0!==t.length&&0!==e.length&&0!==r(t,e)}},function(t,e,n){\"use strict\";Object.defineProperty(e,\"__esModule\",{value:!0});var r=n(1),i=n(0);e.DIGEST_LENGTH=32,e.BLOCK_SIZE=64;var o=function(){function t(){this.digestLength=e.DIGEST_LENGTH,this.blockSize=e.BLOCK_SIZE,this._state=new Int32Array(8),this._temp=new Int32Array(64),this._buffer=new Uint8Array(128),this._bufferLength=0,this._bytesHashed=0,this._finished=!1,this.reset()}return t.prototype._initState=function(){this._state[0]=1779033703,this._state[1]=3144134277,this._state[2]=1013904242,this._state[3]=2773480762,this._state[4]=1359893119,this._state[5]=2600822924,this._state[6]=528734635,this._state[7]=1541459225},t.prototype.reset=function(){return this._initState(),this._bufferLength=0,this._bytesHashed=0,this._finished=!1,this},t.prototype.clean=function(){i.wipe(this._buffer),i.wipe(this._temp),this.reset()},t.prototype.update=function(t,e){if(void 0===e&&(e=t.length),this._finished)throw new Error(\"SHA256: can't update because hash was finished.\");var n=0;if(this._bytesHashed+=e,this._bufferLength>0){for(;this._bufferLength<this.blockSize&&e>0;)this._buffer[this._bufferLength++]=t[n++],e--;this._bufferLength===this.blockSize&&(a(this._temp,this._state,this._buffer,0,this.blockSize),this._bufferLength=0)}for(e>=this.blockSize&&(n=a(this._temp,this._state,t,n,e),e%=this.blockSize);e>0;)this._buffer[this._bufferLength++]=t[n++],e--;return this},t.prototype.finish=function(t){if(!this._finished){var e=this._bytesHashed,n=this._bufferLength,i=e/536870912|0,o=e<<3,s=e%64<56?64:128;this._buffer[n]=128;for(var u=n+1;u<s-8;u++)this._buffer[u]=0;r.writeUint32BE(i,this._buffer,s-8),r.writeUint32BE(o,this._buffer,s-4),a(this._temp,this._state,this._buffer,0,s),this._finished=!0}for(u=0;u<this.digestLength/4;u++)r.writeUint32BE(this._state[u],t,4*u);return this},t.prototype.digest=function(){var t=new Uint8Array(this.digestLength);return this.finish(t),t},t.prototype.saveState=function(){if(this._finished)throw new Error(\"SHA256: cannot save finished state\");return{state:new Int32Array(this._state),buffer:this._bufferLength>0?new Uint8Array(this._buffer):void 0,bufferLength:this._bufferLength,bytesHashed:this._bytesHashed}},t.prototype.restoreState=function(t){return this._state.set(t.state),this._bufferLength=t.bufferLength,t.buffer&&this._buffer.set(t.buffer),this._bytesHashed=t.bytesHashed,this._finished=!1,this},t.prototype.cleanSavedState=function(t){i.wipe(t.state),t.buffer&&i.wipe(t.buffer),t.bufferLength=0,t.bytesHashed=0},t}();e.SHA256=o;var s=new Int32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]);function a(t,e,n,i,o){for(;o>=64;){for(var a=e[0],u=e[1],f=e[2],c=e[3],h=e[4],d=e[5],l=e[6],p=e[7],v=0;v<16;v++){var y=i+4*v;t[v]=r.readUint32BE(n,y)}for(v=16;v<64;v++){var w=t[v-2],b=(w>>>17|w<<15)^(w>>>19|w<<13)^w>>>10,_=((w=t[v-15])>>>7|w<<25)^(w>>>18|w<<14)^w>>>3;t[v]=(b+t[v-7]|0)+(_+t[v-16]|0)}for(v=0;v<64;v++){b=(((h>>>6|h<<26)^(h>>>11|h<<21)^(h>>>25|h<<7))+(h&d^~h&l)|0)+(p+(s[v]+t[v]|0)|0)|0,_=((a>>>2|a<<30)^(a>>>13|a<<19)^(a>>>22|a<<10))+(a&u^a&f^u&f)|0;p=l,l=d,d=h,h=c+b|0,c=f,f=u,u=a,a=b+_|0}e[0]+=a,e[1]+=u,e[2]+=f,e[3]+=c,e[4]+=h,e[5]+=d,e[6]+=l,e[7]+=p,i+=64,o-=64}return i}e.hash=function(t){var e=new o;e.update(t);var n=e.digest();return e.clean(),n}}]);";

/***/ }),
/* 14 */
/*!**************************!*\
  !*** ./worker/pbkdf2.js ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = "!function(t){var r={};function e(n){if(r[n])return r[n].exports;var a=r[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,e),a.l=!0,a.exports}e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:n})},e.r=function(t){\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(t,\"__esModule\",{value:!0})},e.t=function(t,r){if(1&r&&(t=e(t)),8&r)return t;if(4&r&&\"object\"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,\"default\",{enumerable:!0,value:t}),2&r&&\"string\"!=typeof t)for(var a in t)e.d(n,a,function(r){return t[r]}.bind(null,a));return n},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,\"a\",r),r},e.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},e.p=\"\",e(e.s=0)}([function(t,r,e){\"use strict\";function n(t,r){return function(t){if(Array.isArray(t))return t}(t)||function(t,r){var e=[],n=!0,a=!1,o=void 0;try{for(var u,f=t[Symbol.iterator]();!(n=(u=f.next()).done)&&(e.push(u.value),!r||e.length!==r);n=!0);}catch(t){a=!0,o=t}finally{try{n||null==f.return||f.return()}finally{if(a)throw o}}return e}(t,r)||function(){throw new TypeError(\"Invalid attempt to destructure non-iterable instance\")}()}var a=e(1).toTypedArray,o=20,u=64,f=function(){var t=new ArrayBuffer(65536),r=2*u,e=new Int32Array(t,0,r>>2),n=new Int32Array(t,r+320,5),a=function(t,r,e){\"use asm\";var n=new t.Int32Array(e);function a(t,r){t=t|0;r=r|0;var e=0,a=0,o=0,u=0,f=0,s=0,i=0,l=0,c=0,y=0,h=0,v=0,p=0,d=0;o=n[r+320>>2]|0;f=n[r+324>>2]|0;i=n[r+328>>2]|0;c=n[r+332>>2]|0;h=n[r+336>>2]|0;for(e=0;(e|0)<(t|0);e=e+64|0){u=o;s=f;l=i;y=c;v=h;for(a=0;(a|0)<64;a=a+4|0){d=n[e+a>>2]|0;p=((o<<5|o>>>27)+(f&i|~f&c)|0)+((d+h|0)+1518500249|0)|0;h=c;c=i;i=f<<30|f>>>2;f=o;o=p;n[t+a>>2]=d}for(a=t+64|0;(a|0)<(t+80|0);a=a+4|0){d=(n[a-12>>2]^n[a-32>>2]^n[a-56>>2]^n[a-64>>2])<<1|(n[a-12>>2]^n[a-32>>2]^n[a-56>>2]^n[a-64>>2])>>>31;p=((o<<5|o>>>27)+(f&i|~f&c)|0)+((d+h|0)+1518500249|0)|0;h=c;c=i;i=f<<30|f>>>2;f=o;o=p;n[a>>2]=d}for(a=t+80|0;(a|0)<(t+160|0);a=a+4|0){d=(n[a-12>>2]^n[a-32>>2]^n[a-56>>2]^n[a-64>>2])<<1|(n[a-12>>2]^n[a-32>>2]^n[a-56>>2]^n[a-64>>2])>>>31;p=((o<<5|o>>>27)+(f^i^c)|0)+((d+h|0)+1859775393|0)|0;h=c;c=i;i=f<<30|f>>>2;f=o;o=p;n[a>>2]=d}for(a=t+160|0;(a|0)<(t+240|0);a=a+4|0){d=(n[a-12>>2]^n[a-32>>2]^n[a-56>>2]^n[a-64>>2])<<1|(n[a-12>>2]^n[a-32>>2]^n[a-56>>2]^n[a-64>>2])>>>31;p=((o<<5|o>>>27)+(f&i|f&c|i&c)|0)+((d+h|0)-1894007588|0)|0;h=c;c=i;i=f<<30|f>>>2;f=o;o=p;n[a>>2]=d}for(a=t+240|0;(a|0)<(t+320|0);a=a+4|0){d=(n[a-12>>2]^n[a-32>>2]^n[a-56>>2]^n[a-64>>2])<<1|(n[a-12>>2]^n[a-32>>2]^n[a-56>>2]^n[a-64>>2])>>>31;p=((o<<5|o>>>27)+(f^i^c)|0)+((d+h|0)-899497514|0)|0;h=c;c=i;i=f<<30|f>>>2;f=o;o=p;n[a>>2]=d}o=o+u|0;f=f+s|0;i=i+l|0;c=c+y|0;h=h+v|0}n[r+320>>2]=o;n[r+324>>2]=f;n[r+328>>2]=i;n[r+332>>2]=c;n[r+336>>2]=h}return{hash:a}}({Int32Array:Int32Array},{},t).hash;function o(){n[0]=1732584193,n[1]=-271733879,n[2]=-1732584194,n[3]=271733878,n[4]=-1009589776}function s(t,r){var n=u;t+9>=u&&(n=2*u);for(var a=t+3-(t+3)%4;a<u-8;a+=4)e[a>>2]=0;return e[t>>2]^=128<<24-(t%4<<3),e[n-8>>2]=r>>>29,e[n-4>>2]=r<<3,n}function i(t,r,n){for(var a=new DataView(t.buffer,t.byteOffset+r,n),o=0;o+3<n;o+=4)e[o>>2]=a.getInt32(o,!1);n%4&&(e[o>>2]=t[r+o]<<24|t[r+o+1]<<16|t[r+o+2]<<8)}return{state:n,getResult:function(t){var r=new DataView(t.buffer);r.setInt32(0,n[0],!1),r.setInt32(4,n[1],!1),r.setInt32(8,n[2],!1),r.setInt32(12,n[3],!1),r.setInt32(16,n[4],!1)},preprocessBlock:function(t){return o(),i(t,0,u),a(u,r),new Int32Array(f.state)},hashCurrentState:function(t){var o=function(t){e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],e[4]=t[4];var r=t.length<<2;return s(r,u+r)}(n);n.set(t),a(o,r)},hashArray:function(t,e){var n=t.length;e?(n+=u,f.state.set(e)):o();for(var l=0;t.length>l+u;l+=u)i(t,l,u),a(u,r);var c=t.length-l;i(t,l,c),a(s(c,n),r)}}}();function s(t,r,e,a){a|=0;for(var s=n(function(t){var r=new Uint8Array(u);t.length>u?(f.hashArray(t),f.getResult(r)):r.set(t);for(var e=Uint8Array.from(r),n=0;n<u;n++)r[n]^=54,e[n]^=92;return[f.preprocessBlock(r),f.preprocessBlock(e)]}(t),2),i=s[0],l=s[1],c=Math.ceil(a/o),y=new Int32Array(c*o>>>2),h=0,v=1;v<=c;v++){r[r.length-4]=v>>>24&255,r[r.length-3]=v>>>16&255,r[r.length-2]=v>>>8&255,r[r.length-1]=v>>>0&255,f.hashArray(r,i),f.hashCurrentState(l),y.set(f.state,h);for(var p=1;p<e;p++){f.hashCurrentState(i),f.hashCurrentState(l);for(var d=0;d<f.state.length;d++)y[h+d]^=f.state[d]}h+=o>>2}for(var g=new DataView(y.buffer),b=0;b<y.length;b++)g.setInt32(b<<2,y[b],!1);return new Uint8Array(y.buffer,0,a)}r.pbkdf2=s,\"undefined\"!=typeof self&&(self.onmessage=function(t){var r=t.data,e=r.jobId,n=r.password,o=r.salt,u=r.length;self.postMessage({jobId:e,result:s(a(n),a(o),262144,u)})})},function(t,r,e){\"use strict\";r.toTypedArray=function(t){return t}}]);";

/***/ }),
/* 15 */
/*!*************************************!*\
  !*** ./lib/typedArrayConversion.js ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */
 // This is a dummy, a real conversion is only necessary in unit tests.

exports.toTypedArray = function (obj) {
  return obj;
};

/***/ }),
/* 16 */
/*!***************************************!*\
  !*** ./lib/sync-providers/dropbox.js ***!
  \***************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ui = __webpack_require__(/*! ../ui */ 4);

var endpoints = {
  "auth": "https://www.dropbox.com/oauth2/authorize",
  "download": "https://content.dropboxapi.com/2/files/download",
  "upload": "https://content.dropboxapi.com/2/files/upload"
};
var clientId = "mah5dtksdflznfc";
var redirectUri = "https://www.dropbox.com/1/oauth2/redirect_receiver";
var redirectUriManual = "https://www.dropbox.com/1/oauth2/display_token";

function getEndPoint(name, params) {
  var result = endpoints[name];

  if (params) {
    var query = [];

    for (var _i = 0, _Object$keys = Object.keys(params); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      query.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
    }

    result = result + "?" + query.join("&");
  }

  return result;
} // We shouldn't need to fake fetch() with XMLHttpRequest here but due to
// https://crbug.com/784528 accessing response headers isn't currently possibl
// otherwise.


function fetch(url, options) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.open(options.method || "GET", url);
    request.responseType = "text";
    request.withCredentials = false;

    if (options.headers) {
      for (var _i2 = 0, _Object$keys2 = Object.keys(options.headers); _i2 < _Object$keys2.length; _i2++) {
        var key = _Object$keys2[_i2];
        request.setRequestHeader(key, options.headers[key]);
      }
    }

    request.addEventListener("load", function (event) {
      var status = request.status;

      if (status >= 200 && status <= 299) {
        resolve({
          text: request.response,
          headers: {
            get: function get(header) {
              return request.getResponseHeader(header);
            }
          }
        });
      } else {
        try {
          reject(JSON.parse(request.response).error_summary.replace(/\/\.*$/, ""));
        } catch (e) {
          reject(new Error("Unexpected server response: ".concat(status, " ").concat(request.statusText)));
        }
      }
    });
    request.addEventListener("error", function (event) {
      reject("sync_connection_error");
    });
    request.send(options.body || null);
  });
}

exports.authorize = function () {
  var url = getEndPoint("auth", {
    response_type: "token",
    client_id: clientId,
    redirect_uri: redirectUri
  });
  return ui.openAndWait(url, redirectUri).then(function (url) {
    var hash = new URL(url).hash;
    if (!hash) throw "sync_malformed_response";
    var response = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = hash.substr(1).split("&")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var pair = _step.value;

        var _pair$split$map = pair.split("=", 2).map(function (s) {
          return decodeURIComponent(s);
        }),
            _pair$split$map2 = _slicedToArray(_pair$split$map, 2),
            key = _pair$split$map2[0],
            value = _pair$split$map2[1];

        response[key] = value;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (response.token_type != "bearer" || !response.access_token) throw "sync_malformed_response";
    return response.access_token;
  });
};

exports.getManualAuthURL = function () {
  return getEndPoint("auth", {
    response_type: "token",
    client_id: clientId,
    redirect_uri: redirectUriManual
  });
};

exports.processAuthCode = function (code) {
  return Promise.resolve(code);
};

exports.get = function (path, token) {
  return fetch(getEndPoint("download"), {
    headers: {
      "Authorization": "Bearer ".concat(token),
      "Dropbox-API-Arg": JSON.stringify({
        path: path
      })
    }
  }).then(function (response) {
    var metadata = response.headers.get("Dropbox-API-Result");
    if (!metadata) throw "sync_malformed_response";
    metadata = JSON.parse(metadata);
    if (!metadata.rev) throw "sync_malformed_response";
    return {
      revision: metadata.rev,
      contents: response.text
    };
  })["catch"](function (error) {
    if (error == "path/not_found") return null;else if (error == "invalid_access_token") throw "sync_invalid_token";else if (typeof error == "string" && error != "sync_connection_error") throw new Error("Unexpected error: ".concat(error));else throw error;
  });
};

exports.put = function (path, contents, replaceRevision, token) {
  var mode = replaceRevision ? {
    ".tag": "update",
    "update": replaceRevision
  } : "add";
  return fetch(getEndPoint("upload"), {
    method: "POST",
    headers: {
      "Authorization": "Bearer ".concat(token),
      "Dropbox-API-Arg": JSON.stringify({
        path: path,
        mode: mode,
        mute: true
      }),
      "Content-Type": "application/octet-stream"
    },
    body: contents
  })["catch"](function (error) {
    if (error == "path/conflict/file") throw "sync_wrong_revision";else if (error == "invalid_access_token") throw "sync_invalid_token";else if (typeof error == "string" && error != "sync_connection_error") throw new Error("Unexpected error: ".concat(error));else throw error;
  });
};

/***/ }),
/* 17 */
/*!**************************************!*\
  !*** ./lib/sync-providers/gdrive.js ***!
  \**************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var ui = __webpack_require__(/*! ../ui */ 4);

var endpoints = {
  "auth": "https://accounts.google.com/o/oauth2/v2/auth",
  "token": "https://www.googleapis.com/oauth2/v4/token",
  "files": "https://www.googleapis.com/drive/v2/files",
  "upload": "https://www.googleapis.com/upload/drive/v2/files"
};
var clientId = "413724158571-0d0fqalv9vupfvhd5oo2j7q6ti2jr8vq.apps.googleusercontent.com";
var redirectUri = "http://localhost:37602/";
var redirectUriManual = "urn:ietf:wg:oauth:2.0:oob";

function getEndPoint(name, params) {
  var result = endpoints[name];

  if (params) {
    var query = [];

    for (var _i = 0, _Object$keys = Object.keys(params); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      query.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
    }

    result = result + "?" + query.join("&");
  }

  return result;
}

function handleError(response) {
  return response.text().then(function (data) {
    try {
      var parsed = JSON.parse(data);
      var code = parsed.error;
      if (_typeof(code) == "object") code = code.errors.map(function (e) {
        return e.reason;
      }).join("/");
      if (code == "authError" || code == "invalid_grant") return Promise.reject("sync_invalid_token");else if (code == "conditionNotMet") return Promise.reject("sync_wrong_revision");else {
        var message = parsed.error;
        if (_typeof(message) == "object") message = message.errors.map(function (e) {
          return e.message;
        }).join(", ");
        return Promise.reject(new Error("Unexpected server error: ".concat(message)));
      }
    } catch (e) {// Not a JSON response or unexpected data, ignore
    }

    return Promise.reject(new Error("Unexpected server response: ".concat(response.status, " ").concat(response.statusText)));
  });
}

function getAccessToken(refreshToken) {
  var data = new URLSearchParams();
  data.append("refresh_token", refreshToken);
  data.append("client_id", clientId);
  data.append("grant_type", "refresh_token");
  return fetch(getEndPoint("token"), {
    method: "POST",
    body: data.toString(),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then(function (response) {
    if (!response.ok) return handleError(response);
    return response.json();
  }).then(function (data) {
    if (!data.access_token) throw "sync_malformed_response";
    return data.access_token;
  });
}

exports.authorize = function () {
  var url = getEndPoint("auth", {
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "https://www.googleapis.com/auth/drive.appdata",
    access_type: "offline"
  });
  return ui.openAndWait(url, redirectUri).then(function (url) {
    var params = new URL(url).search;
    if (!params) throw "sync_malformed_response";
    var response = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = params.substr(1).split("&")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var pair = _step.value;

        var _pair$split$map = pair.split("=", 2).map(function (s) {
          return decodeURIComponent(s);
        }),
            _pair$split$map2 = _slicedToArray(_pair$split$map, 2),
            key = _pair$split$map2[0],
            value = _pair$split$map2[1];

        response[key] = value;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (!response.code) throw "sync_malformed_response";
    return exports.processAuthCode(response.code, redirectUri);
  });
};

exports.getManualAuthURL = function () {
  return getEndPoint("auth", {
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUriManual,
    scope: "https://www.googleapis.com/auth/drive.appdata",
    access_type: "offline"
  });
};

exports.processAuthCode = function (code, redirectUri) {
  var data = new URLSearchParams();
  data.append("code", code);
  data.append("client_id", clientId);
  data.append("redirect_uri", redirectUri || redirectUriManual);
  data.append("grant_type", "authorization_code");
  return fetch(getEndPoint("token"), {
    method: "POST",
    body: data.toString(),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then(function (response) {
    if (!response.ok) return handleError(response);
    return response.json();
  }).then(function (data) {
    if (!data.refresh_token) throw "sync_malformed_response";
    return data.refresh_token;
  });
};

exports.get = function (path, token) {
  if (path.startsWith("/")) path = path.substr(1);
  return getAccessToken(token).then(function (accessToken) {
    var url = getEndPoint("files", {
      q: "title='".concat(path, "' and 'appdata' in parents")
    });
    return fetch(url, {
      headers: {
        Authorization: "Bearer ".concat(accessToken)
      }
    }).then(function (response) {
      if (!response.ok) return handleError(response);
      return response.json();
    }).then(function (data) {
      var files = data.items.filter(function (file) {
        return file.appDataContents && !file.labels.trashed;
      });
      if (files.length == 0) return null;
      if (files.length != 1) throw "sync_multiple_candidates";
      var file = files[0];
      var url = "".concat(getEndPoint("files"), "/").concat(file.id, "?alt=media");
      return fetch(url, {
        headers: {
          Authorization: "Bearer ".concat(accessToken)
        }
      }).then(function (response) {
        if (!response.ok) return handleError(response);
        return response.text();
      }).then(function (contents) {
        return {
          revision: [file.id, file.etag],
          contents: contents
        };
      });
    });
  });
};

exports.put = function (path, contents, replaceRevision, token) {
  if (path.startsWith("/")) path = path.substr(1);
  return getAccessToken(token).then(function (accessToken) {
    if (replaceRevision) {
      var _replaceRevision = _slicedToArray(replaceRevision, 2),
          id = _replaceRevision[0],
          etag = _replaceRevision[1];

      var url = "".concat(getEndPoint("upload"), "/").concat(id, "?uploadType=media");
      return fetch(url, {
        method: "PUT",
        headers: {
          Authorization: "Bearer ".concat(accessToken),
          "If-Match": etag
        },
        body: contents
      }).then(function (response) {
        if (!response.ok) return handleError(response);
        return Promise.resolve();
      });
    } else {
      var _url = getEndPoint("upload", {
        uploadType: "multipart"
      });

      var data = new FormData();
      data.append("metadata", new Blob([JSON.stringify({
        title: path,
        parents: [{
          id: "appdata"
        }]
      })], {
        type: "application/json"
      }));
      data.append("media", new Blob([contents], {
        type: "application/octet-stream"
      }));
      return fetch(_url, {
        method: "POST",
        headers: {
          Authorization: "Bearer ".concat(accessToken)
        },
        body: data
      }).then(function (response) {
        if (!response.ok) return handleError(response);
        return Promise.resolve();
      });
    }
  });
};

/***/ }),
/* 18 */
/*!*********************************************!*\
  !*** ./lib/sync-providers/remotestorage.js ***!
  \*********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var ui = __webpack_require__(/*! ../ui */ 4);

var oauthProp = "http://tools.ietf.org/html/rfc6749#section-4.2";
var clientId = "http://localhost:37602/";
var clientIdManual = "https://pfp.works";
var scope = "pfp";
var redirectUri = "http://localhost:37602/";
var redirectUriManual = "https://pfp.works/oauth-endpoint/";
var accountCache = new Map();

function accountInfo(username) {
  if (accountCache.has(username)) return Promise.resolve(accountCache.get(username));
  var host = username.substr(username.indexOf("@") + 1);
  var url = "https://".concat(host, "/.well-known/webfinger?resource=").concat(encodeURIComponent("acct:" + username));
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (response) {
    if (!Array.isArray(response.links)) throw "sync_malformed_response";
    var link = null;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = response.links[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var l = _step.value;
        if (l.rel == "http://tools.ietf.org/id/draft-dejong-remotestorage") link = l;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (!link || typeof link.href != "string" || !link.href) throw "sync_malformed_response";
    if (_typeof(link.properties) != "object" || !link.properties || typeof link.properties[oauthProp] != "string" || !link.properties[oauthProp]) throw "sync_malformed_response";
    accountCache.set(username, {
      auth: link.properties[oauthProp],
      base: link.href
    });
    return accountCache.get(username);
  });
}

function addQuery(url, params) {
  var query = [];

  for (var _i = 0, _Object$keys = Object.keys(params); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    query.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
  }

  return url + (url.includes("?") ? "&" : "?") + query.join("&");
}

function joinPaths(url) {
  for (var _len = arguments.length, parts = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    parts[_key - 1] = arguments[_key];
  }

  for (var _i2 = 0, _parts = parts; _i2 < _parts.length; _i2++) {
    var part = _parts[_i2];
    url = url.replace(/\/+$/, "");
    part = part.replace(/^\/+/, "");
    url += "/" + part;
  }

  return url;
}

exports.authorize = function (username) {
  return accountInfo(username).then(function (endpoints) {
    var url = addQuery(endpoints.auth, {
      response_type: "token",
      client_id: clientId,
      scope: scope + ":rw",
      redirect_uri: redirectUri
    });
    return ui.openAndWait(url, redirectUri);
  }).then(function (url) {
    var hash = new URL(url).hash;
    if (!hash) throw "sync_malformed_response";
    var response = {};
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = hash.substr(1).split("&")[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var pair = _step2.value;

        var _pair$split$map = pair.split("=", 2).map(function (s) {
          return decodeURIComponent(s);
        }),
            _pair$split$map2 = _slicedToArray(_pair$split$map, 2),
            key = _pair$split$map2[0],
            value = _pair$split$map2[1];

        response[key] = value;
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    if (!response.access_token) throw "sync_malformed_response";
    return response.access_token;
  });
};

exports.getManualAuthURL = function (username) {
  return accountInfo(username).then(function (endpoints) {
    return addQuery(endpoints.auth, {
      response_type: "token",
      scope: scope + ":rw",
      client_id: clientIdManual,
      redirect_uri: redirectUriManual
    });
  });
};

exports.processAuthCode = function (code) {
  return Promise.resolve(code);
};

exports.get = function (path, token, username) {
  return accountInfo(username).then(function (endpoints) {
    return fetch(joinPaths(endpoints.base, scope, path), {
      headers: {
        "Authorization": "Bearer ".concat(token)
      }
    });
  }).then(function (response) {
    if (response.status == 401 || response.status == 403) throw "sync_invalid_token";else if (response.status == 404) throw "not_found";else if (response.status != 200) throw new Error("Unexpected server response: ".concat(response.status, " ").concat(response.statusText));
    var revision = response.headers.get("ETag");
    if (!revision) throw "sync_malformed_response";
    return Promise.all([revision, response.text()]);
  }).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        revision = _ref2[0],
        contents = _ref2[1];

    return {
      revision: revision,
      contents: contents
    };
  })["catch"](function (error) {
    if (error == "not_found") return null;else throw error;
  });
};

exports.put = function (path, contents, replaceRevision, token, username) {
  return accountInfo(username).then(function (endpoints) {
    var headers = {
      "Authorization": "Bearer ".concat(token),
      "Content-Type": "application/octet-stream"
    };
    if (replaceRevision) headers["If-Match"] = replaceRevision;else headers["If-None-Match"] = "*";
    return fetch(joinPaths(endpoints.base, scope, path), {
      method: "PUT",
      headers: headers,
      body: contents
    });
  }).then(function (response) {
    if (response.status == 401 || response.status == 403) throw "sync_invalid_token";else if (response.status == 412) throw "sync_wrong_revision";else if (response.status != 200 && response.status != 201) throw new Error("Unexpected server response: ".concat(response.status, " ").concat(response.statusText));
  });
};

/***/ }),
/* 19 */
/*!*********************!*\
  !*** ./lib/lock.js ***!
  \*********************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */


if (typeof Promise.prototype["finally"] == "undefined") {
  Promise.prototype["finally"] = function (callback) {
    return this.then(function (result) {
      callback();
      return result;
    }, function (e) {
      callback();
      throw e;
    });
  };
}

function Lock() {
  this._queue = [];
}

Lock.prototype = {
  _locked: false,
  _queue: null,
  acquire: function acquire() {
    var _this = this;

    return new Promise(function (resolve, reject) {
      if (_this._locked) _this._queue.push(resolve);else {
        _this._locked = true;
        resolve();
      }
    });
  },
  release: function release() {
    if (!this._locked) throw new Error("Releasing lock without acquiring first");
    if (this._queue.length) this._queue.shift()();else this._locked = false;
  }
};
module.exports = Lock;

/***/ }),
/* 20 */
/*!**********************************!*\
  !*** ./lib/importers/default.js ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var storage = __webpack_require__(/*! ../storage */ 5);

var masterPassword = __webpack_require__(/*! ../masterPassword */ 1);

var passwords = __webpack_require__(/*! ../passwords */ 0);

var crypto = __webpack_require__(/*! ../crypto */ 3);

function importUnchanged(data, setRaw) {
  var mergeActions = [];

  for (var key in data) {
    if (key.startsWith(passwords.STORAGE_PREFIX)) mergeActions.push(setRaw(key, data[key]));
  }

  return Promise.all(mergeActions);
}

function decryptThenImport(data, masterPass, setSite, setPassword) {
  return masterPassword.deriveKey(data[masterPassword.saltKey], masterPass).then(function (decryptionKey) {
    return Promise.all([decryptionKey, masterPassword.decrypt(data[masterPassword.hmacSecretKey], decryptionKey)]);
  })["catch"](function (error) {
    if (error == "master_password_required") throw error;
    console.error(error);
    throw "wrong_master_password";
  }).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        decryptionKey = _ref2[0],
        hmacSecret = _ref2[1];

    var decryptActions = [];

    for (var key in data) {
      if (key.startsWith(passwords.STORAGE_PREFIX)) decryptActions.push(masterPassword.decrypt(data[key], decryptionKey));
    }

    return Promise.all(decryptActions);
  }).then(function (entries) {
    var mergeActions = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var entry = _step.value;
        if (!entry.type) mergeActions.push(setSite(entry));else if (entry.type == "generated2" || entry.type == "generated") {
          if (masterPass || entry.type == "generated") {
            var params = {
              masterPassword: masterPass || masterPassword.get(),
              domain: entry.site,
              name: entry.name,
              revision: entry.revision,
              length: entry.length,
              lower: entry.lower,
              upper: entry.upper,
              number: entry.number,
              symbol: entry.symbol
            };
            var action;
            if (entry.type == "generated2") action = crypto.derivePassword(params);else action = crypto.derivePasswordLegacy(params);
            mergeActions.push(action.then(function (password) {
              var data = {
                type: "stored",
                site: entry.site,
                name: entry.name,
                revision: entry.revision,
                password: password
              };
              if (entry.notes) data.notes = entry.notes;
              return setPassword(data);
            }));
          } else mergeActions.push(setPassword(entry));
        } else if (entry.type == "stored") mergeActions.push(setPassword(entry));
      };

      for (var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return Promise.all(mergeActions);
  });
}

function import_(data, setRaw, setSite, setPassword, masterPass) {
  return Promise.resolve().then(function () {
    try {
      data = JSON.parse(data);
    } catch (e) {
      throw "unknown_data_format";
    }

    if (!data || _typeof(data) != "object" || data.application != "pfp" || data.format != 2 && data.format != 3 || !data.data || _typeof(data.data) != "object" || typeof data.data[masterPassword.saltKey] != "string" || typeof data.data[masterPassword.hmacSecretKey] != "string") {
      throw "unknown_data_format";
    }

    return Promise.all([storage.get(masterPassword.saltKey, null), storage.get(masterPassword.hmacSecretKey, null)]);
  }).then(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        saltRaw = _ref4[0],
        hmacSecretRaw = _ref4[1];

    if (masterPass) return decryptThenImport(data.data, masterPass, setSite, setPassword);else if (saltRaw == data.data[masterPassword.saltKey] && hmacSecretRaw == data.data[masterPassword.hmacSecretKey]) {
      // Backup was created with the same crypto parameters, we can just import
      // the entries as they are, without decrypting them first.
      return importUnchanged(data.data, setRaw);
    } else return decryptThenImport(data.data, null, setSite, setPassword);
  });
}

exports["import"] = import_;

/***/ }),
/* 21 */
/*!***********************************!*\
  !*** ./lib/importers/lastPass.js ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */


function parseCSV(fileContents) {
  var header = "url,username,password,extra,name,grouping,fav";
  var headerFields = header.split(",");
  fileContents = fileContents.trim() + "\n"; // Ensure we've got UNIX style line endings

  fileContents = fileContents.replace(/\r\n/g, "\n"); // Quick sanity check, does this file have the right header?

  if (!fileContents.startsWith(header + "\n")) throw "unknown_data_format"; // LastPass will sometimes encode "&", "<" and ">" into HTML entities when
  // exporting data, revert that.

  fileContents = fileContents.replace(/&lt;/ig, "<").replace(/&gt;/ig, ">").replace(/&amp;/ig, "&");
  var quotedValueRegexp = /^"((?:[^"]|"")*)"(?:,|(?=\n))/;
  var unquotedValueRegexp = /(.*?)(?:,|(?=\n))/;
  var entries = [];
  var currentEntry = [];
  var prevChar = null;

  while (fileContents) {
    if (fileContents[0] == "\n") {
      // End of current entry
      if (prevChar == ",") {
        currentEntry.push("");
        prevChar = null;
      }

      if (currentEntry.length != headerFields.length) {
        console.error(new Error("Syntax error, unexpected number of values in a line\n" + JSON.stringify(currentEntry)));
        throw "syntax_error";
      }

      var entry = {};

      for (var j = 0; j < headerFields.length; j++) {
        entry[headerFields[j]] = currentEntry[j];
      }

      entries.push(entry);
      currentEntry = [];
      fileContents = fileContents.substr(1);
    } else {
      var quoted = fileContents[0] == '"';
      var regexp = quoted ? quotedValueRegexp : unquotedValueRegexp;
      var match = regexp.exec(fileContents);

      if (!match) {
        console.error(new Error("Syntax error, could not find end of value\n" + fileContents.replace(/\n.*/, "")));
        throw "syntax_error";
      }

      prevChar = match[0].slice(-1);
      currentEntry.push(quoted ? match[1].replace(/""/g, '"') : match[1]);
      fileContents = fileContents.substr(match[0].length);
    }
  }

  return entries;
}

function getSite(url, passwordName) {
  if (url == "http://sn") {
    // This is a secure note, not associated with any website
    return "pfp.invalid";
  }

  try {
    return new URL(url).hostname;
  } catch (e) {} // Ignore invalid URLs, LastPass doesn't validate them
  // No valid URL, but maybe password name is the site here


  if (passwordName.includes(".") && !/[\s/]/.test(passwordName)) return passwordName;
  return null;
}

function import_(data, setRaw, setSite, setPassword) {
  return Promise.resolve().then(function () {
    var mergeActions = [];
    var seenSites = new Set();
    var seenPasswords = new Set();
    var entries = parseCSV(data);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _step.value,
            url = _step$value.url,
            username = _step$value.username,
            password = _step$value.password,
            extra = _step$value.extra,
            name = _step$value.name;
        var site = getSite(url, name);

        if (!site) {
          // TODO: Warn user about skipped entries
          continue;
        } // FIXME - Duplicated from _normalizeSite in passwords.js
        // Remove trailing dots


        if (site[site.length - 1] == ".") site = site.substr(0, site.length - 1); // Remove www. prefix

        if (site.substr(0, 4) == "www.") site = site.substr(4); // No username can happen for secure notes, use password name as fallback

        if (!username) username = name;

        if (!username) {
          // TODO: Warn user about skipped entries
          continue;
        }

        if (!seenSites.has(site)) {
          mergeActions.push(setSite({
            site: site
          }));
          seenSites.add(site);
        }

        if (extra || password) {
          var revision = "";
          if (name && name != site && name != username) revision = name;

          while (seenPasswords.has(JSON.stringify([site, username, revision]))) {
            var match = /^(.*?)(\d+)/.exec(revision);
            if (match) revision = match[1] + (parseInt(match[2], 10) + 1);else revision += "2";
          }

          seenPasswords.add(JSON.stringify([site, username, revision]));
          var entry = {
            site: site,
            type: "stored",
            name: username,
            revision: revision,
            password: password
          };
          if (extra) entry.notes = extra;
          mergeActions.push(setPassword(entry));
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return Promise.all(mergeActions);
  });
}

exports["import"] = import_;

/***/ }),
/* 22 */
/*!**************************!*\
  !*** ./lib/migration.js ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */


var crypto = __webpack_require__(/*! ./crypto */ 3);

var storage = __webpack_require__(/*! ./storage */ 5);

function migrateData(masterPassword, STORAGE_PREFIX, setPassword) {
  return storage.getAllByPrefix(STORAGE_PREFIX).then(function (data) {
    var actions = [];
    var entries = Object.keys(data).map(function (key) {
      return data[key];
    });
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var passwordData = _step.value;
        if (passwordData.type != "generated") return "continue";
        var site = passwordData.site,
            name = passwordData.name,
            revision = passwordData.revision,
            length = passwordData.length,
            lower = passwordData.lower,
            upper = passwordData.upper,
            number = passwordData.number,
            symbol = passwordData.symbol,
            notes = passwordData.notes;
        var params = {
          masterPassword: masterPassword,
          domain: site,
          name: name,
          revision: revision,
          length: length,
          lower: lower,
          upper: upper,
          number: number,
          symbol: symbol
        };
        actions.push(crypto.derivePasswordLegacy(params).then(function (password) {
          var entry = {
            type: "stored",
            site: site,
            name: name,
            revision: revision,
            password: password
          };
          if (notes) entry.notes = notes;
          return setPassword(entry);
        }));
      };

      for (var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _ret = _loop();

        if (_ret === "continue") continue;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return Promise.all(actions);
  }).then(function () {
    return storage.set("format", 3, null);
  });
}

exports.migrateData = migrateData;

/***/ }),
/* 23 */
/*!**********************************!*\
  !*** ./lib/passwordRetrieval.js ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var browser = __webpack_require__(/*! ./browserAPI */ 2);

var _require = __webpack_require__(/*! ./ui */ 4),
    getCurrentHost = _require.getCurrentHost;

var passwords = __webpack_require__(/*! ./passwords */ 0);

var maxScriptID = 0;

function fillIn(passwordData) {
  return Promise.all([passwords.getPassword(passwordData), getCurrentHost().then(function (currentHost) {
    return Promise.all([currentHost, passwords.getAlias(currentHost)]);
  })]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        password = _ref2[0],
        _ref2$ = _slicedToArray(_ref2[1], 2),
        currentHost = _ref2$[0],
        _ref2$$ = _slicedToArray(_ref2$[1], 2),
        _ = _ref2$$[0],
        currentSite = _ref2$$[1];

    if (currentSite != passwordData.site) return Promise.reject("wrong_site");
    return new Promise(function (resolve, reject) {
      var scriptID = ++maxScriptID;

      var port = __webpack_require__(/*! ./messaging */ 6).getPort("contentScript");

      port.on("done", function doneHandler(_ref3) {
        var source = _ref3.scriptID,
            result = _ref3.result;
        if (source != scriptID) return;
        port.off("done", doneHandler);
        if (result) reject(result);else {
          resolve(); // Make sure that the popup is closed on Firefox Android,
          // work-around for https://bugzil.la/1433604

          browser.tabs.update({
            active: true
          });
        }
      });
      browser.tabs.executeScript({
        code: "var _parameters = " + JSON.stringify({
          scriptID: scriptID,
          host: currentHost,
          name: passwordData.name,
          password: password
        })
      })["catch"](reject);
      browser.tabs.executeScript({
        file: "contentScript/fillIn.js"
      })["catch"](reject);
    });
  });
}

exports.fillIn = fillIn;

/***/ }),
/* 24 */
/*!******************************!*\
  !*** ./lib/recoveryCodes.js ***!
  \******************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var crypto = __webpack_require__(/*! ./crypto */ 3);

var passwords = __webpack_require__(/*! ./passwords */ 0);

var masterPassword = __webpack_require__(/*! ./masterPassword */ 1);

var blockSize = 14;
var version = 1;
var versionSize = 1;
var saltSize = 16;
var ivSize = 12;
var tagSize = 16;
var validChars = crypto.base32Alphabet;

exports.getValidChars = function () {
  return validChars;
};

function getCode(passwordData) {
  return Promise.resolve().then(function () {
    return passwords.getPassword(passwordData);
  }).then(function (password) {
    // Zero-pad passwords to fill up the row (don't allow deducing password
    // length from size of encrypted data)
    var passwordLen = new TextEncoder("utf-8").encode(password).length;

    while ((versionSize + saltSize + ivSize + tagSize + passwordLen) % blockSize) {
      password += "\0";
      passwordLen++;
    }

    return Promise.all([masterPassword.getSalt(), masterPassword.encrypt(password, undefined, false), passwordLen]);
  }).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 3),
        salt = _ref2[0],
        encrypted = _ref2[1],
        passwordLen = _ref2[2];

    var _encrypted$split = encrypted.split("_", 2),
        _encrypted$split2 = _slicedToArray(_encrypted$split, 2),
        iv = _encrypted$split2[0],
        ciphertext = _encrypted$split2[1];

    if (typeof ciphertext != "string") throw new Error("Unexpected: couldn't find IV in encrypted password");
    var versionStr = String.fromCharCode(version);

    var _map = [salt, iv, ciphertext].map(atob);

    var _map2 = _slicedToArray(_map, 3);

    salt = _map2[0];
    iv = _map2[1];
    ciphertext = _map2[2];
    if (salt.length != saltSize) throw new Error("Unexpected: salt length isn't 16");
    if (iv.length != ivSize) throw new Error("Unexpected: IV length isn't 12");
    if (ciphertext.length != passwordLen + tagSize) throw new Error("Unexpected: ciphertext length isn't increased by tag size"); // We add one checksum byte to each block (output row)

    var dataLen = versionStr.length + salt.length + iv.length + ciphertext.length;
    var blocks = Math.ceil(dataLen / blockSize);
    var buffer = new Uint8Array(dataLen + blocks);
    var pos = 0;
    var blockIndex = 0;

    for (var _i2 = 0, _arr2 = [versionStr, salt, iv, ciphertext]; _i2 < _arr2.length; _i2++) {
      var string = _arr2[_i2];

      for (var i = 0; i < string.length; i++) {
        buffer[pos++] = string.charCodeAt(i);

        if (pos % (blockSize + 1) == blockSize) {
          var blockStart = pos - blockSize;
          var virtualByte = blockIndex++;

          if (virtualByte == blocks - 1) {
            // Indicate final row
            virtualByte = 255 - virtualByte;
          }

          buffer[pos] = crypto.pearsonHash(buffer, blockStart, blockSize, virtualByte);
          pos++;
        }
      }
    } // Convert the data to Base32 and add separators


    return formatCode(crypto.toBase32(buffer));
  });
}

exports.getCode = getCode;

function formatCode(recoveryCode) {
  return recoveryCode.replace(new RegExp("[^".concat(validChars, "]"), "gi"), "").replace(/\w{24}/g, "$&\n").replace(/\w{12}(?=\w)/g, "$&:").replace(/\w{4}(?=\w)/g, "$&-");
}

exports.formatCode = formatCode;

function isValid(recoveryCode) {
  return Promise.resolve().then(function () {
    var buffer = crypto.fromBase32(recoveryCode);
    if (buffer.length % (blockSize + 1)) return "invalid-length";
    var blocks = buffer.length / (blockSize + 1);

    for (var i = 0; i < blocks; i++) {
      var blockStart = i * (blockSize + 1);
      if (i == blocks - 1 && buffer[blockStart + blockSize] == crypto.pearsonHash(buffer, blockStart, blockSize, 255 - i)) return "ok";
      if (buffer[blockStart + blockSize] != crypto.pearsonHash(buffer, blockStart, blockSize, i)) return "checksum_mismatch";
    }

    return "unterminated";
  });
}

exports.isValid = isValid;

function decodeCode(recoveryCode) {
  return Promise.resolve().then(function () {
    return isValid(recoveryCode);
  }).then(function (validationResult) {
    if (validationResult != "ok") throw validationResult; // isRecoveryCodeValid already validated the checksums, remove them.

    var buffer = crypto.fromBase32(recoveryCode);
    var withoutChecksums = new Uint8Array(buffer.length / (blockSize + 1) * blockSize);

    for (var i = 0, j = 0; i < buffer.length; i++) {
      if ((i + 1) % (blockSize + 1) != 0) withoutChecksums[j++] = buffer[i];
    }

    buffer = withoutChecksums;
    var pos = 0;
    if (buffer[pos] != version) throw "wrong_version";
    pos += versionSize;
    if (buffer.length < versionSize + saltSize + ivSize + tagSize) throw new Error("Unexpected: too little data");
    var salt = crypto.toBase64(buffer.slice(pos, pos += saltSize));
    var iv = crypto.toBase64(buffer.slice(pos, pos += ivSize));
    var ciphertext = crypto.toBase64(buffer.slice(pos));
    return Promise.all(["".concat(iv, "_").concat(ciphertext), masterPassword.deriveKey(salt)]);
  }).then(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        encrypted = _ref4[0],
        key = _ref4[1];

    return masterPassword.decrypt(encrypted, key, false);
  }).then(function (decoded) {
    return decoded.replace(/\0+$/, "");
  });
}

exports.decodeCode = decodeCode;

/***/ })
/******/ ]);