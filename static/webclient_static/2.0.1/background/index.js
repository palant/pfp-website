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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* no static exports found */
/* all exports used */
/*!*******************************!*\
  !*** ./lib/masterPassword.js ***!
  \*******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */



var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var prefs = __webpack_require__(/*! ./prefs */ 9);
var storage = __webpack_require__(/*! ./storage */ 4);

var crypto = __webpack_require__(/*! ./crypto */ 3);

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
    if (__webpack_require__(/*! ./passwords */ 1).isMigrating()) return Promise.resolve("migrating");

    if (rememberedMaster) return Promise.resolve("known");

    return storage.has(hmacSecretKey).then(function (value) {
      if (value) return "set";

      // Try legacy format
      return storage.has("masterPassword").then(function (value) {
        return value ? "set" : "unset";
      });
    });
  }
});

exports.get = function () {
  if (!rememberedMaster) throw "master-password-required";

  return rememberedMaster;
};

exports.getSalt = function () {
  return storage.get(saltKey, null);
};

function getKey() {
  if (!key) throw "master-password-required";

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
  if (!hmacSecret) return Promise.reject("master-password-required");

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
    throw "master-password-required";
  }).then(function (masterPassword) {
    return crypto.deriveKey({ masterPassword: masterPassword, salt: salt });
  });
}
exports.deriveKey = deriveKey;

function changePassword(masterPassword, noLock) {
  var salt = crypto.generateRandom(16);
  return deriveKey(salt, masterPassword).then(function (newKey) {
    return __webpack_require__(/*! ./passwords */ 1).removeAll(noLock).then(function () {
      var rawHmacSecret = crypto.generateRandom(32);
      return Promise.all([crypto.importHmacSecret(rawHmacSecret), storage.set(saltKey, salt, null), storage.set(hmacSecretKey, rawHmacSecret, newKey)]);
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
  return storage.get(saltKey, null).then(function (salt) {
    if (!salt) {
      // Try legacy format
      return storage.get("masterPassword", null).then(function (value) {
        if (!value) return Promise.reject();

        var hash = value.hash,
            salt = value.salt;

        var params = {
          masterPassword: masterPassword,
          domain: "",
          name: salt,
          length: 2,
          lower: true,
          upper: false,
          number: false,
          symbol: false
        };
        return Promise.all([crypto.derivePasswordLegacy(params), hash]);
      }).then(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            hash = _ref6[0],
            expected = _ref6[1];

        if (hash == expected) {
          __webpack_require__(/*! ./passwords */ 1).migrateData(masterPassword);
          return Promise.reject("migrating");
        }

        return Promise.reject();
      });
    }

    return deriveKey(salt, masterPassword);
  }).then(function (newKey) {
    return storage.get(hmacSecretKey, newKey).then(function (rawHmacSecret) {
      return crypto.importHmacSecret(rawHmacSecret);
    }).then(function (newHmacSecret) {
      rememberedMaster = masterPassword;
      key = newKey;
      hmacSecret = newHmacSecret;
    });
  }).catch(function (e) {
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

/***/ }),
/* 1 */
/* no static exports found */
/* all exports used */
/*!**************************!*\
  !*** ./lib/passwords.js ***!
  \**************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */



var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var storage = __webpack_require__(/*! ./storage */ 4);

var crypto = __webpack_require__(/*! ./crypto */ 3);
var masterPassword = __webpack_require__(/*! ./masterPassword */ 0);

var lock = exports.lock = new (__webpack_require__(/*! ./lock */ 15))();

var STORAGE_PREFIX = exports.STORAGE_PREFIX = "site:";

function _normalizeSite(site) {
  // Remove trailing dots
  if (site && site[site.length - 1] == ".") site = site.substr(0, site.length - 1);

  // Remove www. prefix
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
    return "" + STORAGE_PREFIX + digest;
  });
}

function _getPasswordPrefix(site) {
  return _getSiteKey(site).then(function (key) {
    return key + ":";
  });
}

function _getPasswordKey(site, name, revision) {
  return Promise.all([masterPassword.getDigest(site), masterPassword.getDigest(site + "\0" + name + "\0" + (revision || ""))]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        digest1 = _ref2[0],
        digest2 = _ref2[1];

    return "" + STORAGE_PREFIX + digest1 + ":" + digest2;
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

function _setSiteData(site, siteData) {
  return _getSiteKey(site).then(function (key) {
    return storage.set(key, siteData);
  });
}

function _ensureSiteData(site) {
  return _getSiteKey(site).then(function (key) {
    return storage.has(key).then(function (exists) {
      if (!exists) return storage.set(key, { site: site });
      return null;
    });
  });
}

function _deleteSiteData(site) {
  return _getSiteKey(site).then(function (key) {
    return storage.delete(key);
  });
}

function _deletePassword(site, name, revision) {
  return _getPasswordKey(site, name, revision).then(function (key) {
    return storage.delete(key);
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
    if (hasPasswords) throw "site-has-passwords";

    return _setSiteData(site, { site: site, alias: alias });
  }).finally(function () {
    return lock.release();
  });
}
exports.addAlias = addAlias;

function removeAlias(site) {
  return lock.acquire().then(function () {
    return _getSiteData(site);
  }).then(function (siteData) {
    if (!siteData || !siteData.alias) throw "no-such-alias";
  }).then(function () {
    return _deleteSiteData(site);
  }).finally(function () {
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

function getPassword(site, name, revision) {
  return _getPasswordKey(site, name, revision).then(function (key) {
    return storage.get(key);
  }).then(function (passwordData) {
    if (!passwordData) throw "no-such-password";

    if (passwordData.type == "stored") return passwordData.password;

    if (passwordData.type == "generated2" || passwordData.type == "generated") {
      var length = passwordData.length,
          lower = passwordData.lower,
          upper = passwordData.upper,
          number = passwordData.number,
          symbol = passwordData.symbol;

      var params = {
        masterPassword: masterPassword.get(),
        domain: site,
        name: name, revision: revision, length: length, lower: lower, upper: upper, number: number, symbol: symbol
      };
      if (passwordData.type == "generated2") return crypto.derivePassword(params);else return crypto.derivePasswordLegacy(params);
    }

    throw "unknown-generation-method";
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
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
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
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
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
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = Object.keys(result)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var site = _step4.value;

        var _siteData3 = result[site];
        if (_siteData3.passwords.length) {
          _sortPasswords(_siteData3.passwords);
          _siteData3.aliases.sort();
        } else {
          delete result[site];
          _deleteSiteData(site);
        }
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    return result;
  });
}
exports.getAllPasswords = getAllPasswords;

function exportPasswordData() {
  return storage.getAllByPrefix("", null).then(function (data) {
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = Object.keys(data)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var key = _step5.value;

        if (!key.startsWith(STORAGE_PREFIX) && key != masterPassword.saltKey && key != masterPassword.hmacSecretKey) {
          delete data[key];
        }
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5.return) {
          _iterator5.return();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }

    return JSON.stringify({
      application: "pfp",
      format: 2,
      data: data
    });
  });
}
exports.exportPasswordData = exportPasswordData;

function importPasswordData(data) {
  var importers = [__webpack_require__(/*! ./importers/default */ 13), __webpack_require__(/*! ./importers/legacy */ 8), __webpack_require__(/*! ./importers/lastPass */ 14)];

  function setRaw(key, value) {
    return storage.set(key, value, null);
  }

  function setSite(entry) {
    return _setSiteData(entry.site, entry);
  }

  function setPassword(entry) {
    return _getPasswordKey(entry.site, entry.name, entry.revision).then(function (key) {
      return storage.set(key, entry);
    });
  }

  function tryNext() {
    var importer = importers.shift();
    return importer.import(data, setRaw, setSite, setPassword).catch(function (e) {
      if (e != "unknown-data-format" || !importers.length) throw e;
      return tryNext();
    });
  }

  return lock.acquire().then(tryNext).finally(function () {
    return lock.release();
  });
}
exports.importPasswordData = importPasswordData;

function addGenerated(_ref5, replaceExisting) {
  var site = _ref5.site,
      name = _ref5.name,
      revision = _ref5.revision,
      length = _ref5.length,
      lower = _ref5.lower,
      upper = _ref5.upper,
      number = _ref5.number,
      symbol = _ref5.symbol,
      legacy = _ref5.legacy;

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

    var type = legacy ? "generated" : "generated2";
    return storage.set(key, {
      site: site, name: name, revision: revision, type: type, length: length, lower: lower, upper: upper, number: number, symbol: symbol
    });
  }).then(function (_) {
    return _getPasswords(site);
  }).finally(function () {
    return lock.release();
  });
}
exports.addGenerated = addGenerated;

function addStored(_ref8) {
  var site = _ref8.site,
      name = _ref8.name,
      revision = _ref8.revision,
      password = _ref8.password;

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

    return storage.set(key, {
      type: "stored",
      site: site, name: name, revision: revision, password: password
    });
  }).then(function (_) {
    return _getPasswords(site);
  }).finally(function () {
    return lock.release();
  });
}
exports.addStored = addStored;

function removePassword(site, name, revision) {
  return lock.acquire().then(function () {
    return _getPasswordKey(site, name, revision);
  }).then(function (key) {
    return storage.has(key).then(function (exists) {
      if (!exists) throw "no-such-password";

      return storage.delete(key);
    });
  }).then(function (_) {
    return _getPasswords(site);
  }).finally(function () {
    return lock.release();
  });
}
exports.removePassword = removePassword;

function removeAll(noLock) {
  if (noLock) return storage.deleteByPrefix(STORAGE_PREFIX);

  return lock.acquire().then(function () {
    return storage.deleteByPrefix(STORAGE_PREFIX);
  }).finally(function () {
    return lock.release();
  });
}
exports.removeAll = removeAll;

function setNotes(site, name, revision, notes) {
  return lock.acquire().then(function () {
    return _getPasswordKey(site, name, revision);
  }).then(function (key) {
    return Promise.all([key, storage.get(key)]);
  }).then(function (_ref11) {
    var _ref12 = _slicedToArray(_ref11, 2),
        key = _ref12[0],
        data = _ref12[1];

    if (!data) throw "no-such-password";

    if (notes) data.notes = notes;else delete data.notes;
    return storage.set(key, data);
  }).then(function (_) {
    return _getPasswords(site);
  }).finally(function () {
    return lock.release();
  });
}
exports.setNotes = setNotes;

function getNotes(site, name, revision) {
  return _getPasswordKey(site, name, revision).then(function (key) {
    return storage.get(key);
  }).then(function (passwordData) {
    if (!passwordData) throw "no-such-password";
    return passwordData.notes;
  });
}
exports.getNotes = getNotes;

var migrationInProgress = null;

function migrateData(master) {
  function setSite(entry) {
    return _setSiteData(entry.site, entry);
  }

  function setPassword(entry) {
    return _getPasswordKey(entry.site, entry.name, entry.revision).then(function (key) {
      return storage.set(key, entry);
    });
  }

  if (!migrationInProgress) {
    var migration = __webpack_require__(/*! ./migration */ 16);
    migrationInProgress = lock.acquire().then(function () {
      return migration.migrateData(master, setSite, setPassword);
    }).finally(function () {
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
/* 2 */
/* no static exports found */
/* all exports used */
/*!**************************************!*\
  !*** ./web/background/browserAPI.js ***!
  \**************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */



var _require = __webpack_require__(/*! ../eventTarget */ 22),
    EventTarget = _require.EventTarget;

// Posting messages to proper origin isn't possible on file://


var targetOrigin = location.protocol != "file:" ? location.origin : "*";

var OrigWorker = window.Worker;
window.Worker = function (url, options) {
  function getURL(text) {
    return URL.createObjectURL(new Blob([text], { type: "text/javascript" }));
  }

  if (url == "../scrypt.js") {
    url = getURL(__webpack_require__(/*! ../../data/scrypt */ 24));
  } else if (url == "../pbkdf2.js") {
    url = getURL(__webpack_require__(/*! ../../data/pbkdf2 */ 23));
  }

  return new OrigWorker(url, options);
};
window.Worker.prototype = OrigWorker.prototype;

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
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
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
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = Object.keys(items)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var key = _step2.value;

              localStorage[key] = JSON.stringify(items[key]);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        });
      },

      remove: function remove(keys) {
        return Promise.resolve().then(function () {
          if (typeof keys == "string") keys = [keys];
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = keys[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var key = _step3.value;

              delete localStorage[key];
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
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
      return Promise.resolve([]);
    },
    create: function create(params) {
      if (params.url != "../allpasswords/allpasswords.html") return Promise.reject(new Error("Not implemented"));

      parent.postMessage({
        type: "show-allpasswords"
      }, targetOrigin);
      return Promise.resolve();
    }
  },
  runtime: {
    getURL: function getURL(path) {
      return "../" + path.replace(/^data\//, "");
    },
    onConnect: new EventTarget()
  }
};

var ports = [];

window.addEventListener("message", function (event) {
  // On Chrome, file:// is used as document origin yet messages get origin null
  if (event.origin != location.origin && !(event.origin == "null" && location.origin == "file://")) return;

  var message = event.data;
  if (message.type == "connect") {
    var port = ports[message.id] = {
      name: message.name,
      postMessage: function postMessage(payload) {
        event.source.postMessage({
          type: "message",
          id: message.id,
          target: message.name,
          payload: payload
        }, targetOrigin);
      },
      onMessage: new EventTarget(),
      onDisconnect: new EventTarget()
    };
    module.exports.runtime.onConnect._emit(port);
  } else if (message.type == "disconnect") {
    var _port = ports[message.id];
    if (_port) {
      delete ports[message.id];
      _port.onDisconnect._emit();
    }
  } else if (message.type == "message") {
    var _port2 = ports[message.id];
    if (_port2) _port2.onMessage._emit(message.payload);
  }
});

/***/ }),
/* 3 */
/* no static exports found */
/* all exports used */
/*!***********************!*\
  !*** ./lib/crypto.js ***!
  \***********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */



/* global crypto, TextEncoder, TextDecoder, atob, btoa, Worker */

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _require = __webpack_require__(/*! ./typedArrayConversion */ 21),
    toTypedArray = _require.toTypedArray;

var AES_KEY_SIZE = 256;

// I, l, O, 0, 1 excluded because of potential confusion. ", ', \ excluded
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
    if (!scryptWorker) scryptWorker = new Worker(__webpack_require__(/*! ./browserAPI */ 2).runtime.getURL("data/scrypt.js"));

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
      cleanup();

      // The worker is probably in a bad state, create a new one next time.
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
      length: length
    });
  });
}

function deriveBitsLegacy(password, salt, length) {
  return new Promise(function (resolve, reject) {
    if (!pbkdf2Worker) pbkdf2Worker = new Worker(__webpack_require__(/*! ./browserAPI */ 2).runtime.getURL("data/pbkdf2.js"));

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
      cleanup();

      // The worker is probably in a bad state, create a new one next time.
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
      length: length
    });
  });
}

function deriveKeyLegacy(password, salt, usage) {
  return deriveBitsLegacy(password, salt, AES_KEY_SIZE / 8).then(function (array) {
    return crypto.subtle.importKey("raw", array, "AES-CBC", false, [usage]);
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

    return Promise.all([initializationVector, crypto.subtle.encrypt({ "name": "AES-GCM", iv: initializationVector }, key, encoder.encode(plaintext))]);
  }).then(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        initializationVector = _ref4[0],
        buffer = _ref4[1];

    var array = new Uint8Array(buffer);
    var result = [];
    for (var i = 0; i < array.length; i++) {
      result.push(String.fromCharCode(array[i]));
    }return toBase64(initializationVector) + "_" + toBase64(buffer);
  });
};

exports.decryptData = function (key, ciphertext) {
  return Promise.resolve().then(function () {
    var _ciphertext$split$map = ciphertext.split("_", 2).map(fromBase64),
        _ciphertext$split$map2 = _slicedToArray(_ciphertext$split$map, 2),
        initializationVector = _ciphertext$split$map2[0],
        data = _ciphertext$split$map2[1];

    return crypto.subtle.decrypt({ "name": "AES-GCM", iv: initializationVector }, key, data);
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
    return crypto.subtle.importKey("raw", fromBase64(rawSecret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  });
};

exports.getDigest = function (hmacSecret, data) {
  return Promise.resolve().then(function () {
    return crypto.subtle.sign("HMAC", hmacSecret, encoder.encode(data));
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

exports.decryptPasswordLegacy = function (params) {
  var salt = params.domain + "\0" + params.name;
  return Promise.resolve().then(function () {
    return deriveKeyLegacy(params.masterPassword, salt, "decrypt");
  }).then(function (key) {
    var _params$encrypted$spl = params.encrypted.split("_", 2).map(fromBase64),
        _params$encrypted$spl2 = _slicedToArray(_params$encrypted$spl, 2),
        initializationVector = _params$encrypted$spl2[0],
        password = _params$encrypted$spl2[1];

    return crypto.subtle.decrypt({ "name": "AES-CBC", iv: initializationVector }, key, password).catch(function (e) {
      console.log(e);
      throw "decryption-failure";
    });
  }).then(function (buffer) {
    return decoder.decode(buffer);
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
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
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
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = charsets[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var charset = _step2.value;

        if (index < charset.length) {
          result.push(charset[index]);
          seen.add(charset);
          break;
        }
        index -= charset.length;
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
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
  for (var _i = start; _i < start + len; _i++) {
    hash = pearsonHashPermutations[hash ^ buffer[_i]];
  }return hash;
}
exports.pearsonHash = pearsonHash;

function toBase64(buffer) {
  var array = new Uint8Array(buffer);
  var result = [];
  for (var i = 0; i < array.length; i++) {
    result.push(String.fromCharCode(array[i]));
  }return btoa(result.join(""));
}
exports.toBase64 = toBase64;

function fromBase64(string) {
  var decoded = atob(string);
  var result = new Uint8Array(decoded.length);
  for (var i = 0; i < decoded.length; i++) {
    result[i] = decoded.charCodeAt(i);
  }return result;
}
exports.fromBase64 = fromBase64;

// Our Base32 variant follows RFC 4648 but uses a custom alphabet to remove
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
  }

  // Our input is always padded, so there should never be data left here
  if (currentBits) throw new Error("Unexpected: length of data encoded to base32 has to be a multiple of five");

  return result.join("");
}
exports.toBase32 = toBase32;

function fromBase32(str) {
  str = str.replace(new RegExp("[^" + base32Alphabet + "]", "g"), "").toUpperCase();
  if (str.length % 8) throw new Error("Unexpected: length of data decoded from base32 has to be a multiple of eight");

  var mapping = new Map();
  for (var i = 0; i < base32Alphabet.length; i++) {
    mapping.set(base32Alphabet[i], i);
  }var pos = 0;
  var current = 0;
  var currentBits = 0;
  var result = new Uint8Array(str.length / 8 * 5);
  for (var _i2 = 0; _i2 < str.length; _i2++) {
    current = current << 5 | mapping.get(str[_i2]);
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
/* no static exports found */
/* all exports used */
/*!************************!*\
  !*** ./lib/storage.js ***!
  \************************/
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

    return __webpack_require__(/*! ./masterPassword */ 0).decrypt(items[name], key);
  });
}
exports.get = get;

function getAllByPrefix(prefix, key) {
  return browser.storage.local.get(null).then(function (items) {
    var _require2 = __webpack_require__(/*! ./masterPassword */ 0),
        decrypt = _require2.decrypt;

    var result = {};
    var names = Object.keys(items).filter(function (name) {
      return name.startsWith(prefix);
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
  return __webpack_require__(/*! ./masterPassword */ 0).encrypt(value, key).then(function (ciphertext) {
    return browser.storage.local.set(_defineProperty({}, name, ciphertext));
  });
}
exports.set = set;

function delete_(name) {
  return browser.storage.local.remove(name);
}
exports.delete = delete_;

function deleteByPrefix(prefix) {
  return browser.storage.local.get(null).then(function (items) {
    var keys = Object.keys(items).filter(function (name) {
      return name.substr(0, prefix.length) == prefix;
    });
    return delete_(keys);
  });
}
exports.deleteByPrefix = deleteByPrefix;

/***/ }),
/* 5 */
/* no static exports found */
/* all exports used */
/*!*******************!*\
  !*** ./lib/ui.js ***!
  \*******************/
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
  }).catch(function () {
    return "";
  });
}
exports.getCurrentHost = getCurrentHost;

function showAllPasswords() {
  var url = browser.runtime.getURL("data/allpasswords/allpasswords.html");

  // Only look for existing tab in the active window, don't activate
  // background windows to avoid unexpected effects.
  return browser.tabs.query({
    url: url,
    lastFocusedWindow: true
  }).catch(function (error) {
    // Querying will fail for extension URLs before Firefox 56, see
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1271354
    return [];
  }).then(function (tabs) {
    if (tabs.length) return browser.tabs.update(tabs[0].id, { active: true });else {
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

  if (type == "relnotes") return "https://pfp.works/release-notes/" + param;else if (type == "documentation") return "https://pfp.works/documentation/" + param + "/";

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
  return browser.tabs.create({ url: url, active: true }).then(function (tab) {
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
/* 6 */
/* no static exports found */
/* all exports used */
/*!**************************!*\
  !*** ./lib/messaging.js ***!
  \**************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */



function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var browser = __webpack_require__(/*! ./browserAPI */ 2);

var _require = __webpack_require__(/*! ./eventTarget */ 7),
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
          emit.apply(undefined, [wrapper, message.eventName].concat(_toConsumableArray(message.args)));
        });

        emit(wrapper, "connect");
      }
    });

    wrapper.emit = function (eventName) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = targets[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var target = _step.value;

          target.postMessage({ eventName: eventName, args: args });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    };

    ports.set(name, wrapper);
  }

  return ports.get(name);
};

/***/ }),
/* 7 */
/* no static exports found */
/* all exports used */
/*!****************************!*\
  !*** ./lib/eventTarget.js ***!
  \****************************/
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
      listener.apply(undefined, arguments);
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
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (obj._listeners[eventName] || [])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var listener = _step.value;

      listener.apply(undefined, args);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};

/***/ }),
/* 8 */
/* no static exports found */
/* all exports used */
/*!*********************************!*\
  !*** ./lib/importers/legacy.js ***!
  \*********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var crypto = __webpack_require__(/*! ../crypto */ 3);
var masterPassword = __webpack_require__(/*! ../masterPassword */ 0);

function getNotesName(name, revision) {
  return name + "\0" + (revision || "") + "\0notes";
}

function importPassword(site, name, revision, data, setPassword) {
  if (!data || (typeof data === "undefined" ? "undefined" : _typeof(data)) != "object") return null;

  if (data.type == "generated" || data.type == "pbkdf2-sha1-generated") {
    var length = parseInt(data.length, 10);
    if (isNaN(length) || length < 4 || length > 24) return null;

    if (typeof data.lower != "boolean" || typeof data.upper != "boolean" || typeof data.number != "boolean" || typeof data.symbol != "boolean") {
      return null;
    }

    var result = {
      type: "generated",
      site: site, name: name, revision: revision,
      length: length,
      lower: data.lower,
      upper: data.upper,
      number: data.number,
      symbol: data.symbol
    };

    if (typeof data.notes == "string") {
      return crypto.decryptPasswordLegacy({
        masterPassword: masterPassword.get(),
        domain: site,
        name: getNotesName(name, revision),
        encrypted: data.notes
      }).then(function (notes) {
        result.notes = notes;
        return setPassword(result);
      });
    } else return setPassword(result);
  } else if (data.type == "stored" || data.type == "pbkdf2-sha1-aes256-encrypted") {
    if (!data.password || typeof data.password != "string") return null;

    return crypto.decryptPasswordLegacy({
      masterPassword: masterPassword.get(),
      domain: site,
      name: name,
      encrypted: data.password
    }).then(function (password) {
      var result = {
        type: "stored",
        site: site, name: name, revision: revision, password: password
      };

      if (typeof data.notes == "string") {
        return crypto.decryptPasswordLegacy({
          masterPassword: masterPassword.get(),
          domain: site,
          name: getNotesName(name, revision),
          encrypted: data.notes
        }).then(function (notes) {
          result.notes = notes;
          return setPassword(result);
        });
      } else return setPassword(result);
    });
  }

  return null;
}
exports.importPassword = importPassword;

function import_(data, setRaw, setSite, setPassword) {
  return Promise.resolve().then(function () {
    try {
      data = JSON.parse(data);
    } catch (e) {
      throw "unknown-data-format";
    }

    if (!data || (typeof data === "undefined" ? "undefined" : _typeof(data)) != "object" || data.application != "easypasswords" || data.format != 1 || !data.sites || _typeof(data.sites) != "object") {
      throw "unknown-data-format";
    }

    var mergeActions = [];
    for (var site in data.sites) {
      var importedData = data.sites[site];
      if (!importedData || (typeof importedData === "undefined" ? "undefined" : _typeof(importedData)) != "object") continue;

      mergeActions.push(setSite({ site: site }));

      if (importedData.passwords && _typeof(importedData.passwords) == "object") {
        for (var key in importedData.passwords) {
          var name = key;
          var revision = "";
          var index = key.indexOf("\n");
          if (index >= 0) {
            name = key.substr(0, index);
            revision = key.substr(index + 1);
          }

          mergeActions.push(importPassword(site, name, revision, importedData.passwords[key], setPassword));
        }
      }

      if (importedData.aliases && Symbol.iterator in importedData.aliases) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = importedData.aliases[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var alias = _step.value;

            if (!alias || typeof alias != "string") continue;

            mergeActions.push(setSite({ site: alias, alias: site }));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
    return Promise.all(mergeActions);
  });
}
exports.import = import_;

/***/ }),
/* 9 */
/* no static exports found */
/* all exports used */
/*!**********************!*\
  !*** ./lib/prefs.js ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */



function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var browser = __webpack_require__(/*! ./browserAPI */ 2);

var _require = __webpack_require__(/*! ./eventTarget */ 7),
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
/* no static exports found */
/* all exports used */
/*!*********************!*\
  !*** ./lib/sync.js ***!
  \*********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */



var storage = __webpack_require__(/*! ./storage */ 4);

Object.defineProperty(exports, "provider", {
  enumerable: true,
  get: function get() {
    return storage.get("syncData").then(function (value) {
      return value ? value.provider : null;
    });
  }
});

exports.authorize = function () {
  var provider = __webpack_require__(/*! ./sync-providers/dropbox */ 20);
  return provider.authorize().then(function (token) {
    storage.set("syncData", { provider: "dropbox", token: token });
  });
};

exports.disable = function () {
  return storage.delete("syncData");
};

/***/ }),
/* 11 */
/* no static exports found */
/* all exports used */
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */



var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

__webpack_require__(/*! ./proxy */ 18);

var messaging = __webpack_require__(/*! ./messaging */ 6);
var passwords = __webpack_require__(/*! ./passwords */ 1);
var masterPassword = __webpack_require__(/*! ./masterPassword */ 0);
var sync = __webpack_require__(/*! ./sync */ 10);

var _require = __webpack_require__(/*! ./ui */ 5),
    getCurrentHost = _require.getCurrentHost;

var panelPort = messaging.getPort("panel");
panelPort.on("connect", function () {
  masterPassword.suspendAutoLock();

  Promise.all([getCurrentHost(), masterPassword.state]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        currentHost = _ref2[0],
        masterPasswordState = _ref2[1];

    if (masterPasswordState != "known") return panelPort.emit("init", { masterPasswordState: masterPasswordState, origSite: currentHost });

    return Promise.all([passwords.getPasswords(currentHost), sync.provider]).then(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          _ref4$ = _slicedToArray(_ref4[0], 3),
          origSite = _ref4$[0],
          site = _ref4$[1],
          pwdList = _ref4$[2],
          syncProvider = _ref4[1];

      panelPort.emit("init", {
        masterPasswordState: masterPasswordState, origSite: origSite, site: site, pwdList: pwdList, syncProvider: syncProvider
      });
    });
  });
});
panelPort.on("disconnect", function () {
  masterPassword.resumeAutoLock();
});

var allPasswordsPort = messaging.getPort("allpasswords");
allPasswordsPort.on("forward-to-panel", function (_ref5) {
  var name = _ref5.name,
      args = _ref5.args;

  panelPort.emit.apply(panelPort, [name].concat(_toConsumableArray(args)));
});

// Hack: expose __webpack_require__ for simpler debugging
/* global __webpack_require__ */
module.exports = __webpack_require__;

/***/ }),
/* 12 */
/* no static exports found */
/* all exports used */
/*!*************************!*\
  !*** ./lib/platform.js ***!
  \*************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */



/* global window */

// Debugging - Edge won't let us see errors during startup, log them.

window.loggedErrors = [];
window.onerror = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  window.loggedErrors.push(args);
};

// TextEncoder and TextDecoder are unsupported in Edge
if (typeof window.TextEncoder == "undefined") {
  window.TextEncoder = function (encoding) {
    if (encoding != "utf-8") throw new Error("Unsupported encoding");
  };
  window.TextEncoder.prototype = {
    encode: function encode(str) {
      var bytes = [];
      var encoded = window.encodeURIComponent(str);
      for (var i = 0; i < encoded.length; i++) {
        if (encoded[i] == "%") {
          bytes.push(parseInt(encoded.substr(i + 1, 2), 16));
          i += 2;
        } else bytes.push(encoded.charCodeAt(i));
      }
      return Uint8Array.from(bytes);
    }
  };
}

if (typeof window.TextDecoder == "undefined") {
  window.TextDecoder = function (encoding) {
    if (encoding != "utf-8") throw new Error("Unsupported encoding");
  };
  window.TextDecoder.prototype = {
    decode: function decode(buffer) {
      var array = new Uint8Array(buffer);
      var bytes = [];
      for (var i = 0; i < array.length; i++) {
        bytes.push((array[i] < 16 ? "%0" : "%") + array[i].toString(16));
      }return window.decodeURIComponent(bytes.join(""));
    }
  };
}

/***/ }),
/* 13 */
/* no static exports found */
/* all exports used */
/*!**********************************!*\
  !*** ./lib/importers/default.js ***!
  \**********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var crypto = __webpack_require__(/*! ../crypto */ 3);
var storage = __webpack_require__(/*! ../storage */ 4);
var masterPassword = __webpack_require__(/*! ../masterPassword */ 0);
var passwords = __webpack_require__(/*! ../passwords */ 1);

function importUnchanged(data, setRaw) {
  var mergeActions = [];
  for (var key in data) {
    if (key.startsWith(passwords.STORAGE_PREFIX)) mergeActions.push(setRaw(key, data[key]));
  }
  return Promise.all(mergeActions);
}

function decryptThenImport(data, setSite, setPassword) {
  return crypto.deriveKey({
    masterPassword: masterPassword.get(),
    salt: data[masterPassword.saltKey]
  }).then(function (decryptionKey) {
    return Promise.all([decryptionKey, masterPassword.decrypt(data[masterPassword.hmacSecretKey], decryptionKey)]);
  }).catch(function (error) {
    console.error(error);
    throw "wrong-master-password";
  }).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        decryptionKey = _ref2[0],
        hmacSecret = _ref2[1];

    var decryptActions = [];
    for (var key in data) {
      if (key.startsWith(passwords.STORAGE_PREFIX)) decryptActions.push(masterPassword.decrypt(data[key], decryptionKey));
    }return Promise.all(decryptActions);
  }).then(function (entries) {
    var mergeActions = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var entry = _step.value;

        if (!entry.type) mergeActions.push(setSite(entry));else if (entry.type == "generated2" || entry.type == "generated" || entry.type == "stored") mergeActions.push(setPassword(entry));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
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

function import_(data, setRaw, setSite, setPassword) {
  return Promise.resolve().then(function () {
    try {
      data = JSON.parse(data);
    } catch (e) {
      throw "unknown-data-format";
    }

    if (!data || (typeof data === "undefined" ? "undefined" : _typeof(data)) != "object" || data.application != "pfp" || data.format != 2 || !data.data || _typeof(data.data) != "object" || typeof data.data[masterPassword.saltKey] != "string" || typeof data.data[masterPassword.hmacSecretKey] != "string") {
      throw "unknown-data-format";
    }

    return Promise.all([storage.get(masterPassword.saltKey, null), storage.get(masterPassword.hmacSecretKey, null)]);
  }).then(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        saltRaw = _ref4[0],
        hmacSecretRaw = _ref4[1];

    if (saltRaw == data.data[masterPassword.saltKey] && hmacSecretRaw == data.data[masterPassword.hmacSecretKey]) {
      // Backup was created with the same crypto parameters, we can just import
      // the entries as they are, without decrypting them first.
      return importUnchanged(data.data, setRaw);
    } else return decryptThenImport(data.data, setSite, setPassword);
  });
}
exports.import = import_;

/***/ }),
/* 14 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** ./lib/importers/lastPass.js ***!
  \***********************************/
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

  fileContents = fileContents.trim() + "\n";

  // Ensure we've got UNIX style line endings
  fileContents = fileContents.replace(/\r\n/g, "\n");

  // Quick sanity check, does this file have the right header?
  if (!fileContents.startsWith(header + "\n")) throw "unknown-data-format";

  // LastPass will sometimes encode "&", "<" and ">" into HTML entities when
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
        throw "syntax-error";
      }

      var entry = {};
      for (var j = 0; j < headerFields.length; j++) {
        entry[headerFields[j]] = currentEntry[j];
      }entries.push(entry);
      currentEntry = [];
      fileContents = fileContents.substr(1);
    } else {
      var quoted = fileContents[0] == '"';
      var regexp = quoted ? quotedValueRegexp : unquotedValueRegexp;
      var match = regexp.exec(fileContents);
      if (!match) {
        console.error(new Error("Syntax error, could not find end of value\n" + fileContents.replace(/\n.*/, "")));
        throw "syntax-error";
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
  } catch (e) {}
  // Ignore invalid URLs, LastPass doesn't validate them


  // No valid URL, but maybe password name is the site here
  if (passwordName.includes(".") && !/[\s\/]/.test(passwordName)) return passwordName;

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
        var _ref = _step.value;
        var url = _ref.url;
        var username = _ref.username;
        var password = _ref.password;
        var extra = _ref.extra;
        var name = _ref.name;

        var site = getSite(url, name);
        if (!site) {
          // TODO: Warn user about skipped entries
          continue;
        }

        // FIXME - Duplicated from _normalizeSite in passwords.js
        // Remove trailing dots
        if (site[site.length - 1] == ".") site = site.substr(0, site.length - 1);

        // Remove www. prefix
        if (site.substr(0, 4) == "www.") site = site.substr(4);

        // No username can happen for secure notes, use password name as fallback
        if (!username) username = name;
        if (!username) {
          // TODO: Warn user about skipped entries
          continue;
        }

        if (!seenSites.has(site)) {
          mergeActions.push(setSite({ site: site }));
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

          var entry = { site: site, type: "stored", name: username, revision: revision, password: password };
          if (extra) entry.notes = extra;
          mergeActions.push(setPassword(entry));
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
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
exports.import = import_;

/***/ }),
/* 15 */
/* no static exports found */
/* all exports used */
/*!*********************!*\
  !*** ./lib/lock.js ***!
  \*********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */



if (typeof Promise.prototype.finally == "undefined") {
  Promise.prototype.finally = function (callback) {
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
/* 16 */
/* no static exports found */
/* all exports used */
/*!**************************!*\
  !*** ./lib/migration.js ***!
  \**************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */



var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var masterPassword = __webpack_require__(/*! ./masterPassword */ 0);
var storage = __webpack_require__(/*! ./storage */ 4);
var importer = __webpack_require__(/*! ./importers/legacy */ 8);

var STORAGE_PREFIX = "site:";

function migrateData(master, setSite, setPassword) {
  return storage.getAllByPrefix(STORAGE_PREFIX, null).then(function (sites) {
    return Promise.all([sites, masterPassword.changePassword(master, true), storage.delete("masterPassword")]);
  }).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        sites = _ref2[0];

    var mergeActions = [];

    for (var site in sites) {
      var siteData = sites[site];
      site = site.substr(STORAGE_PREFIX.length);
      if (siteData.alias) {
        mergeActions.push(setSite({ site: site, alias: siteData.alias }));
        continue;
      }

      mergeActions.push(setSite({ site: site }));

      for (var key in siteData.passwords) {
        var name = key;
        var revision = "";
        var index = key.indexOf("\n");
        if (index >= 0) {
          name = key.substr(0, index);
          revision = key.substr(index + 1);
        }

        mergeActions.push(importer.importPassword(site, name, revision, siteData.passwords[key], setPassword));
      }
    }

    return Promise.all(mergeActions);
  });
}
exports.migrateData = migrateData;

/***/ }),
/* 17 */
/* no static exports found */
/* all exports used */
/*!**********************************!*\
  !*** ./lib/passwordRetrieval.js ***!
  \**********************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */



var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var browser = __webpack_require__(/*! ./browserAPI */ 2);

var _require = __webpack_require__(/*! ./ui */ 5),
    getCurrentHost = _require.getCurrentHost;

var passwords = __webpack_require__(/*! ./passwords */ 1);

var maxScriptID = 0;

function fillIn(site, name, revision) {
  return Promise.all([passwords.getPassword(site, name, revision), getCurrentHost().then(function (currentHost) {
    return Promise.all([currentHost, passwords.getAlias(currentHost)]);
  })]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        password = _ref2[0],
        _ref2$ = _slicedToArray(_ref2[1], 2),
        currentHost = _ref2$[0],
        _ref2$$ = _slicedToArray(_ref2$[1], 2),
        _ = _ref2$$[0],
        currentSite = _ref2$$[1];

    if (currentSite != site) return Promise.reject("wrong-site-message");

    return new Promise(function (resolve, reject) {
      var scriptID = ++maxScriptID;
      var port = __webpack_require__(/*! ./messaging */ 6).getPort("contentScript");

      port.on("done", function doneHandler(_ref3) {
        var source = _ref3.scriptID,
            result = _ref3.result;

        if (source != scriptID) return;

        port.off("done", doneHandler);
        if (result) reject(result);else {
          resolve();

          // Make sure that the popup is closed on Firefox Android,
          // work-around for https://bugzil.la/1433604
          browser.tabs.update({ active: true });
        }
      });

      browser.tabs.executeScript({
        code: "var _parameters = " + JSON.stringify({
          scriptID: scriptID,
          host: currentHost,
          name: name, password: password
        })
      }).catch(reject);

      browser.tabs.executeScript({ file: "data/fillIn.js" }).catch(reject);
    });
  });
}
exports.fillIn = fillIn;

/***/ }),
/* 18 */
/* no static exports found */
/* all exports used */
/*!**********************!*\
  !*** ./lib/proxy.js ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */



function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var port = __webpack_require__(/*! ./messaging */ 6).getPort("*");
port.on("_proxy", handleMessage);

function handleMessage(_ref) {
  var messageId = _ref.messageId,
      moduleName = _ref.moduleName,
      method = _ref.method,
      args = _ref.args;

  Promise.resolve().then(function () {
    if (moduleName == "passwords") return __webpack_require__(/*! ./passwords */ 1);else if (moduleName == "masterPassword") return __webpack_require__(/*! ./masterPassword */ 0);else if (moduleName == "passwordRetrieval") return __webpack_require__(/*! ./passwordRetrieval */ 17);else if (moduleName == "prefs") return __webpack_require__(/*! ./prefs */ 9);else if (moduleName == "recoveryCodes") return __webpack_require__(/*! ./recoveryCodes */ 19);else if (moduleName == "sync") return __webpack_require__(/*! ./sync */ 10);else if (moduleName == "ui") return __webpack_require__(/*! ./ui */ 5);else throw new Error("Unknown module");
  }).then(function (obj) {
    return obj[method].apply(obj, _toConsumableArray(args));
  }).then(function (result) {
    port.emit("_proxyResponse-" + messageId, [null, result]);
  }).catch(function (error) {
    if (typeof error != "string") {
      console.error(error);
      if (error && error.stack) error = error + "\n" + error.stack;else error = String(error);
    }
    port.emit("_proxyResponse-" + messageId, [error, null]);
  });
}

/***/ }),
/* 19 */
/* no static exports found */
/* all exports used */
/*!******************************!*\
  !*** ./lib/recoveryCodes.js ***!
  \******************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */



var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var crypto = __webpack_require__(/*! ./crypto */ 3);
var passwords = __webpack_require__(/*! ./passwords */ 1);
var masterPassword = __webpack_require__(/*! ./masterPassword */ 0);

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

function getCode(site, name, revision) {
  return Promise.resolve().then(function () {
    return passwords.getPassword(site, name, revision);
  }).then(function (password) {
    // Zero-pad passwords to fill up the row (don't allow deducing password
    // length from size of encrypted data)
    var passwordLen = new TextEncoder().encode(password).length;
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
    if (ciphertext.length != passwordLen + tagSize) throw new Error("Unexpected: ciphertext length isn't increased by tag size");

    // We add one checksum byte to each block (output row)
    var dataLen = versionStr.length + salt.length + iv.length + ciphertext.length;
    var blocks = Math.ceil(dataLen / blockSize);
    var buffer = new Uint8Array(dataLen + blocks);
    var pos = 0;
    var blockIndex = 0;
    var _arr = [versionStr, salt, iv, ciphertext];
    for (var _i = 0; _i < _arr.length; _i++) {
      var string = _arr[_i];
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
    }

    // Convert the data to Base32 and add separators
    return formatCode(crypto.toBase32(buffer));
  });
}
exports.getCode = getCode;

function formatCode(recoveryCode) {
  return recoveryCode.replace(new RegExp("[^" + validChars + "]", "gi"), "").replace(/\w{24}/g, "$&\n").replace(/\w{12}(?=\w)/g, "$&:").replace(/\w{4}(?=\w)/g, "$&-");
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
      if (buffer[blockStart + blockSize] != crypto.pearsonHash(buffer, blockStart, blockSize, i)) return "checksum-mismatch";
    }

    return "unterminated";
  });
}
exports.isValid = isValid;

function decodeCode(recoveryCode) {
  return Promise.resolve().then(function () {
    return isValid(recoveryCode);
  }).then(function (validationResult) {
    if (validationResult != "ok") throw validationResult;

    // isRecoveryCodeValid already validated the checksums, remove them.
    var buffer = crypto.fromBase32(recoveryCode);
    var withoutChecksums = new Uint8Array(buffer.length / (blockSize + 1) * blockSize);
    for (var i = 0, j = 0; i < buffer.length; i++) {
      if ((i + 1) % (blockSize + 1) != 0) withoutChecksums[j++] = buffer[i];
    }buffer = withoutChecksums;

    var pos = 0;
    if (buffer[pos] != version) throw "wrong-version";
    pos += versionSize;

    if (buffer.length < versionSize + saltSize + ivSize + tagSize) throw new Error("Unexpected: too little data");

    var salt = crypto.toBase64(buffer.slice(pos, pos += saltSize));
    var iv = crypto.toBase64(buffer.slice(pos, pos += ivSize));
    var ciphertext = crypto.toBase64(buffer.slice(pos));

    return Promise.all([iv + "_" + ciphertext, masterPassword.deriveKey(salt)]);
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

/***/ }),
/* 20 */
/* no static exports found */
/* all exports used */
/*!***************************************!*\
  !*** ./lib/sync-providers/dropbox.js ***!
  \***************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */



var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var ui = __webpack_require__(/*! ../ui */ 5);

var baseUri = "https://www.dropbox.com/1/oauth2/";
var clientId = "mah5dtksdflznfc";
var redirectUri = "https://0.0.0.0/";

function getEndPoint(name, params) {
  var result = baseUri + name;
  if (params) {
    var query = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(params)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        query.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    result = result + "?" + query.join("&");
  }
  return result;
}

exports.authorize = function () {
  var url = getEndPoint("authorize", {
    response_type: "token",
    client_id: clientId,
    redirect_uri: redirectUri
  });

  return ui.openAndWait(url, redirectUri).then(function (url) {
    var hash = new URL(url).hash;
    if (!hash) throw "malformed-response";

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
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    if (response.token_type != "bearer" || !response.access_token) throw "malformed-response";

    return response.access_token;
  });
};

/***/ }),
/* 21 */
/* no static exports found */
/* all exports used */
/*!*************************************!*\
  !*** ./lib/typedArrayConversion.js ***!
  \*************************************/
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
/* 22 */
/* no static exports found */
/* all exports used */
/*!****************************!*\
  !*** ./web/eventTarget.js ***!
  \****************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
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

        listener.apply(undefined, arguments);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
};

exports.EventTarget = EventTarget;

/***/ }),
/* 23 */
/* no static exports found */
/* all exports used */
/*!************************!*\
  !*** ./data/pbkdf2.js ***!
  \************************/
/***/ (function(module, exports) {

module.exports = "/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId]) {\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// identity function for calling harmony imports with the correct context\n/******/ \t__webpack_require__.i = function(value) { return value; };\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, {\n/******/ \t\t\t\tconfigurable: false,\n/******/ \t\t\t\tenumerable: true,\n/******/ \t\t\t\tget: getter\n/******/ \t\t\t});\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = 1);\n/******/ })\n/************************************************************************/\n/******/ ([\n/* 0 */\n/* no static exports found */\n/* all exports used */\n/*!*************************************!*\\\n  !*** ./lib/typedArrayConversion.js ***!\n  \\*************************************/\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n/*\n * This Source Code is subject to the terms of the Mozilla Public License\n * version 2.0 (the \"License\"). You can obtain a copy of the License at\n * http://mozilla.org/MPL/2.0/.\n */\n\n\n\n// This is a dummy, a real conversion is only necessary in unit tests.\n\nexports.toTypedArray = function (obj) {\n  return obj;\n};\n\n/***/ }),\n/* 1 */\n/* no static exports found */\n/* all exports used */\n/*!************************!*\\\n  !*** ./data/pbkdf2.js ***!\n  \\************************/\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n/*\n * This Source Code is subject to the terms of the Mozilla Public License\n * version 2.0 (the \"License\"). You can obtain a copy of the License at\n * http://mozilla.org/MPL/2.0/.\n */\n\n\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _require = __webpack_require__(/*! ../lib/typedArrayConversion */ 0),\n    toTypedArray = _require.toTypedArray;\n\n// We expand += intentionally to improve Chrome performance\n/* eslint operator-assignment: \"off\" */\n\nvar NUM_ITERATIONS = 256 * 1024;\nvar DIGEST_LENGTH = 20;\nvar BLOCK_SIZE = 64;\n\nvar hasher = function () {\n  var heap = new ArrayBuffer(0x10000);\n  var maxPaddedChunkLength = BLOCK_SIZE * 2;\n  var input = new Int32Array(heap, 0, maxPaddedChunkLength >> 2);\n  var state = new Int32Array(heap, maxPaddedChunkLength + 320, 5);\n\n  var _RushaCore = RushaCore({ Int32Array: Int32Array }, {}, heap),\n      hash = _RushaCore.hash;\n\n  /**\n   * Initializes the current state, this should be called when the processing\n   * starts.\n   */\n\n\n  function initState() {\n    state[0] = 1732584193;\n    state[1] = -271733879;\n    state[2] = -1732584194;\n    state[3] = 271733878;\n    state[4] = -1009589776;\n  }\n\n  /**\n   * Writes the result of the hash calculation into an array.\n   * @param {Uint8Array} outarray\n   *   20 bytes array to write the result into\n   */\n  function getResult(outarray) {\n    var view = new DataView(outarray.buffer);\n    view.setInt32(0, state[0], false);\n    view.setInt32(4, state[1], false);\n    view.setInt32(8, state[2], false);\n    view.setInt32(12, state[3], false);\n    view.setInt32(16, state[4], false);\n  }\n\n  /**\n   * Pads the chunk currently in processing, should be called before\n   * processing the last message block.\n   * @param {number} chunkLength\n   *   length of the current chunk\n   * @param {number} messageLength\n   *   overall length of the message\n   */\n  function padData(chunkLength, messageLength) {\n    var paddedLength = BLOCK_SIZE;\n    if (chunkLength + 9 >= BLOCK_SIZE) paddedLength = BLOCK_SIZE * 2;\n\n    for (var i = chunkLength + 3 - (chunkLength + 3) % 4; i < BLOCK_SIZE - 8; i = i + 4) {\n      input[i >> 2] = 0;\n    }input[chunkLength >> 2] ^= 0x80 << 24 - (chunkLength % 4 << 3);\n\n    input[paddedLength - 8 >> 2] = messageLength >>> 29;\n    input[paddedLength - 4 >> 2] = messageLength << 3;\n    return paddedLength;\n  }\n\n  /**\n   * Takes the state of a previous hashing operation as input data. This\n   * function assumes that this will be the last chunk and pads it. It also\n   * assumes that there was a block of data preceding it (typical for HMAC).\n   */\n  function inputFromState(state) {\n    input[0] = state[0];\n    input[1] = state[1];\n    input[2] = state[2];\n    input[3] = state[3];\n    input[4] = state[4];\n\n    var chunkLength = state.length << 2;\n    return padData(chunkLength, BLOCK_SIZE + chunkLength);\n  }\n\n  /**\n   * Takes a typed array as input data.\n   * @param {Uint8Array} array\n   *   Typed array containing the data\n   * @param {number} offset\n   *   Offset of the data in the array\n   * @param {number} length\n   *   Size of the data, cannot be larger than BLOCK_SIZE\n   */\n  function inputFromArray(array, offset, length) {\n    var view = new DataView(array.buffer, array.byteOffset + offset, length);\n    var pos = 0;\n    for (; pos + 3 < length; pos = pos + 4) {\n      input[pos >> 2] = view.getInt32(pos, false);\n    }var remaining = length % 4;\n    if (remaining) {\n      input[pos >> 2] = array[offset + pos] << 24 | array[offset + pos + 1] << 16 | array[offset + pos + 2] << 8;\n    }\n  }\n\n  /**\n   * Pre-processes a single block of data and returns the resulting state,\n   * allowing to calculate hashes efficiently for different inputs sharing the\n   * same first block.\n   * @param {Uint8Array} array\n   *   Typed array containing the data, must have size BLOCK_SIZE\n   * @return {Int32Array}\n   *   Copy of the hasher state the operation resulted into\n   */\n  function preprocessBlock(array) {\n    initState();\n    inputFromArray(array, 0, BLOCK_SIZE);\n    hash(BLOCK_SIZE, maxPaddedChunkLength);\n    return new Int32Array(hasher.state);\n  }\n\n  /**\n   * Takes the current hasher state as the input and hashes it on top of a\n   * pre-processed block of data represented by the parameter.\n   * @param {Int32Array}\n   *   Result of a previous preprocessBlock call\n   */\n  function hashCurrentState(initialState) {\n    var chunkLength = inputFromState(state);\n    state.set(initialState);\n    hash(chunkLength, maxPaddedChunkLength);\n  }\n\n  /**\n   * Hashes an arbitrary-length array with data.\n   * @param {Uint8Array} array\n   *   Typed array containing the data\n   * @param {Int32Array} [initialState]\n   *   Result of a previous preprocessBlock call, if omitted the operation\n   *   starts with a clean state.\n   */\n  function hashArray(array, initialState) {\n    var messageLength = array.length;\n    if (initialState) {\n      messageLength += BLOCK_SIZE;\n      hasher.state.set(initialState);\n    } else initState();\n\n    var offset = 0;\n    for (; array.length > offset + BLOCK_SIZE; offset = offset + BLOCK_SIZE) {\n      inputFromArray(array, offset, BLOCK_SIZE);\n      hash(BLOCK_SIZE, maxPaddedChunkLength);\n    }\n\n    var remaining = array.length - offset;\n    inputFromArray(array, offset, remaining);\n    hash(padData(remaining, messageLength), maxPaddedChunkLength);\n  }\n\n  return {\n    state: state,\n    getResult: getResult,\n    preprocessBlock: preprocessBlock,\n    hashCurrentState: hashCurrentState,\n    hashArray: hashArray\n  };\n}();\n\nfunction prepareKey(password) {\n  // HMAC doesn't use the key directly, it rather zero-pads it to BLOCK_SIZE\n  // and xors all bytes with a constant (0x36 for the inner key and 0x5x for\n  // the outer one). We can prepare both key variants so that this operation\n  // won't need to be repeated - and also feed them to SHA1 already since they\n  // will always be the first block of the hashing operation.\n  var ikey = new Uint8Array(BLOCK_SIZE);\n  if (password.length > BLOCK_SIZE) {\n    hasher.hashArray(password);\n    hasher.getResult(ikey);\n  } else ikey.set(password);\n\n  var okey = Uint8Array.from(ikey);\n  for (var i = 0; i < BLOCK_SIZE; i++) {\n    ikey[i] ^= 0x36;\n    okey[i] ^= 0x5c;\n  }\n\n  return [hasher.preprocessBlock(ikey), hasher.preprocessBlock(okey)];\n}\n\nfunction pbkdf2(password, salt, iterations, length) {\n  length |= 0;\n\n  var _prepareKey = prepareKey(password),\n      _prepareKey2 = _slicedToArray(_prepareKey, 2),\n      ikey = _prepareKey2[0],\n      okey = _prepareKey2[1];\n\n  var numChunks = Math.ceil(length / DIGEST_LENGTH);\n  var result = new Int32Array(numChunks * DIGEST_LENGTH >>> 2);\n  var offset = 0;\n\n  for (var i = 1; i <= numChunks; i++) {\n    // First iteration works on the and i as 32-bit big-endian number.\n    salt[salt.length - 4] = i >>> 24 & 0xFF;\n    salt[salt.length - 3] = i >>> 16 & 0xFF;\n    salt[salt.length - 2] = i >>> 8 & 0xFF;\n    salt[salt.length - 1] = i >>> 0 & 0xFF;\n\n    // First HMAC operation processes the salt, slightly more complicated\n    // because the salt's length is arbitrary.\n    hasher.hashArray(salt, ikey);\n    hasher.hashCurrentState(okey);\n    result.set(hasher.state, offset);\n\n    // Subsequent iterations work on the result of the previous iteration.\n    for (var j = 1; j < iterations; j++) {\n      // Subsequent HMAC operations always operate on the state of the previous\n      // operation preceded by the inner/outer key, we can take some shortcuts\n      // here.\n      hasher.hashCurrentState(ikey);\n      hasher.hashCurrentState(okey);\n      for (var k = 0; k < hasher.state.length; k++) {\n        result[offset + k] ^= hasher.state[k];\n      }\n    }\n\n    offset += DIGEST_LENGTH >> 2;\n  }\n\n  // Convert result to big-endian\n  var view = new DataView(result.buffer);\n  for (var _i = 0; _i < result.length; _i++) {\n    view.setInt32(_i << 2, result[_i], false);\n  }return new Uint8Array(result.buffer, 0, length);\n}\n\nexports.pbkdf2 = pbkdf2;\n\nif (typeof self != \"undefined\") {\n  self.onmessage = function (_ref) {\n    var _ref$data = _ref.data,\n        jobId = _ref$data.jobId,\n        password = _ref$data.password,\n        salt = _ref$data.salt,\n        length = _ref$data.length;\n\n    self.postMessage({\n      jobId: jobId,\n      result: pbkdf2(toTypedArray(password), toTypedArray(salt), NUM_ITERATIONS, length)\n    });\n  };\n}\n\n// The following snippet is taken from rusha 0.8.4:\n// https://github.com/srijs/rusha/blob/v0.8.4/rusha.js#L307\n\n/* eslint-disable */\n\n/*\n * Rusha, a JavaScript implementation of the Secure Hash Algorithm, SHA-1,\n * as defined in FIPS PUB 180-1, tuned for high performance with large inputs.\n * (http://github.com/srijs/rusha)\n *\n * Inspired by Paul Johnstons implementation (http://pajhome.org.uk/crypt/md5).\n *\n * Copyright (c) 2013 Sam Rijs (http://awesam.de).\n * Released under the terms of the MIT license as follows:\n *\n * Permission is hereby granted, free of charge, to any person obtaining a\n * copy of this software and associated documentation files (the \"Software\"),\n * to deal in the Software without restriction, including without limitation\n * the rights to use, copy, modify, merge, publish, distribute, sublicense,\n * and/or sell copies of the Software, and to permit persons to whom the\n * Software is furnished to do so, subject to the following conditions:\n *\n * The above copyright notice and this permission notice shall be included in\n * all copies or substantial portions of the Software.\n *\n * THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\n * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\n * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\n * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\n * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING\n * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS\n * IN THE SOFTWARE.\n */\n\nfunction RushaCore(stdlib, foreign, heap) {\n  'use asm';\n\n  var H = new stdlib.Int32Array(heap);\n  function hash(k, x) {\n    // k in bytes\n    k = k | 0;\n    x = x | 0;\n    var i = 0,\n        j = 0,\n        y0 = 0,\n        z0 = 0,\n        y1 = 0,\n        z1 = 0,\n        y2 = 0,\n        z2 = 0,\n        y3 = 0,\n        z3 = 0,\n        y4 = 0,\n        z4 = 0,\n        t0 = 0,\n        t1 = 0;\n    y0 = H[x + 320 >> 2] | 0;\n    y1 = H[x + 324 >> 2] | 0;\n    y2 = H[x + 328 >> 2] | 0;\n    y3 = H[x + 332 >> 2] | 0;\n    y4 = H[x + 336 >> 2] | 0;\n    for (i = 0; (i | 0) < (k | 0); i = i + 64 | 0) {\n      z0 = y0;\n      z1 = y1;\n      z2 = y2;\n      z3 = y3;\n      z4 = y4;\n      for (j = 0; (j | 0) < 64; j = j + 4 | 0) {\n        t1 = H[i + j >> 2] | 0;\n        t0 = ((y0 << 5 | y0 >>> 27) + (y1 & y2 | ~y1 & y3) | 0) + ((t1 + y4 | 0) + 1518500249 | 0) | 0;\n        y4 = y3;\n        y3 = y2;\n        y2 = y1 << 30 | y1 >>> 2;\n        y1 = y0;\n        y0 = t0;\n        H[k + j >> 2] = t1;\n      }\n      for (j = k + 64 | 0; (j | 0) < (k + 80 | 0); j = j + 4 | 0) {\n        t1 = (H[j - 12 >> 2] ^ H[j - 32 >> 2] ^ H[j - 56 >> 2] ^ H[j - 64 >> 2]) << 1 | (H[j - 12 >> 2] ^ H[j - 32 >> 2] ^ H[j - 56 >> 2] ^ H[j - 64 >> 2]) >>> 31;\n        t0 = ((y0 << 5 | y0 >>> 27) + (y1 & y2 | ~y1 & y3) | 0) + ((t1 + y4 | 0) + 1518500249 | 0) | 0;\n        y4 = y3;\n        y3 = y2;\n        y2 = y1 << 30 | y1 >>> 2;\n        y1 = y0;\n        y0 = t0;\n        H[j >> 2] = t1;\n      }\n      for (j = k + 80 | 0; (j | 0) < (k + 160 | 0); j = j + 4 | 0) {\n        t1 = (H[j - 12 >> 2] ^ H[j - 32 >> 2] ^ H[j - 56 >> 2] ^ H[j - 64 >> 2]) << 1 | (H[j - 12 >> 2] ^ H[j - 32 >> 2] ^ H[j - 56 >> 2] ^ H[j - 64 >> 2]) >>> 31;\n        t0 = ((y0 << 5 | y0 >>> 27) + (y1 ^ y2 ^ y3) | 0) + ((t1 + y4 | 0) + 1859775393 | 0) | 0;\n        y4 = y3;\n        y3 = y2;\n        y2 = y1 << 30 | y1 >>> 2;\n        y1 = y0;\n        y0 = t0;\n        H[j >> 2] = t1;\n      }\n      for (j = k + 160 | 0; (j | 0) < (k + 240 | 0); j = j + 4 | 0) {\n        t1 = (H[j - 12 >> 2] ^ H[j - 32 >> 2] ^ H[j - 56 >> 2] ^ H[j - 64 >> 2]) << 1 | (H[j - 12 >> 2] ^ H[j - 32 >> 2] ^ H[j - 56 >> 2] ^ H[j - 64 >> 2]) >>> 31;\n        t0 = ((y0 << 5 | y0 >>> 27) + (y1 & y2 | y1 & y3 | y2 & y3) | 0) + ((t1 + y4 | 0) - 1894007588 | 0) | 0;\n        y4 = y3;\n        y3 = y2;\n        y2 = y1 << 30 | y1 >>> 2;\n        y1 = y0;\n        y0 = t0;\n        H[j >> 2] = t1;\n      }\n      for (j = k + 240 | 0; (j | 0) < (k + 320 | 0); j = j + 4 | 0) {\n        t1 = (H[j - 12 >> 2] ^ H[j - 32 >> 2] ^ H[j - 56 >> 2] ^ H[j - 64 >> 2]) << 1 | (H[j - 12 >> 2] ^ H[j - 32 >> 2] ^ H[j - 56 >> 2] ^ H[j - 64 >> 2]) >>> 31;\n        t0 = ((y0 << 5 | y0 >>> 27) + (y1 ^ y2 ^ y3) | 0) + ((t1 + y4 | 0) - 899497514 | 0) | 0;\n        y4 = y3;\n        y3 = y2;\n        y2 = y1 << 30 | y1 >>> 2;\n        y1 = y0;\n        y0 = t0;\n        H[j >> 2] = t1;\n      }\n      y0 = y0 + z0 | 0;\n      y1 = y1 + z1 | 0;\n      y2 = y2 + z2 | 0;\n      y3 = y3 + z3 | 0;\n      y4 = y4 + z4 | 0;\n    }\n    H[x + 320 >> 2] = y0;\n    H[x + 324 >> 2] = y1;\n    H[x + 328 >> 2] = y2;\n    H[x + 332 >> 2] = y3;\n    H[x + 336 >> 2] = y4;\n  }\n  return { hash: hash };\n};\n\n/***/ })\n/******/ ]);";

/***/ }),
/* 24 */
/* no static exports found */
/* all exports used */
/*!************************!*\
  !*** ./data/scrypt.js ***!
  \************************/
/***/ (function(module, exports) {

module.exports = "/******/ (function(modules) { // webpackBootstrap\n/******/ \t// The module cache\n/******/ \tvar installedModules = {};\n/******/\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/\n/******/ \t\t// Check if module is in cache\n/******/ \t\tif(installedModules[moduleId]) {\n/******/ \t\t\treturn installedModules[moduleId].exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = installedModules[moduleId] = {\n/******/ \t\t\ti: moduleId,\n/******/ \t\t\tl: false,\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/\n/******/ \t\t// Execute the module function\n/******/ \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n/******/\n/******/ \t\t// Flag the module as loaded\n/******/ \t\tmodule.l = true;\n/******/\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/\n/******/\n/******/ \t// expose the modules object (__webpack_modules__)\n/******/ \t__webpack_require__.m = modules;\n/******/\n/******/ \t// expose the module cache\n/******/ \t__webpack_require__.c = installedModules;\n/******/\n/******/ \t// identity function for calling harmony imports with the correct context\n/******/ \t__webpack_require__.i = function(value) { return value; };\n/******/\n/******/ \t// define getter function for harmony exports\n/******/ \t__webpack_require__.d = function(exports, name, getter) {\n/******/ \t\tif(!__webpack_require__.o(exports, name)) {\n/******/ \t\t\tObject.defineProperty(exports, name, {\n/******/ \t\t\t\tconfigurable: false,\n/******/ \t\t\t\tenumerable: true,\n/******/ \t\t\t\tget: getter\n/******/ \t\t\t});\n/******/ \t\t}\n/******/ \t};\n/******/\n/******/ \t// getDefaultExport function for compatibility with non-harmony modules\n/******/ \t__webpack_require__.n = function(module) {\n/******/ \t\tvar getter = module && module.__esModule ?\n/******/ \t\t\tfunction getDefault() { return module['default']; } :\n/******/ \t\t\tfunction getModuleExports() { return module; };\n/******/ \t\t__webpack_require__.d(getter, 'a', getter);\n/******/ \t\treturn getter;\n/******/ \t};\n/******/\n/******/ \t// Object.prototype.hasOwnProperty.call\n/******/ \t__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };\n/******/\n/******/ \t// __webpack_public_path__\n/******/ \t__webpack_require__.p = \"\";\n/******/\n/******/ \t// Load entry module and return exports\n/******/ \treturn __webpack_require__(__webpack_require__.s = 5);\n/******/ })\n/************************************************************************/\n/******/ ([\n/* 0 */\n/* no static exports found */\n/* all exports used */\n/*!****************************************!*\\\n  !*** ./third-party/@stablelib/wipe.js ***!\n  \\****************************************/\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\n// Copyright (C) 2016 Dmitry Chestnykh\n// MIT License. See LICENSE file for details.\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/**\n * Sets all values in the given array to zero and returns it.\n *\n * The fact that it sets bytes to zero can be relied on.\n *\n * There is no guarantee that this function makes data disappear from memory,\n * as runtime implementation can, for example, have copying garbage collector\n * that will make copies of sensitive data before we wipe it. Or that an\n * operating system will write our data to swap or sleep image. Another thing\n * is that an optimizing compiler can remove calls to this function or make it\n * no-op. There's nothing we can do with it, so we just do our best and hope\n * that everything will be okay and good will triumph over evil.\n */\nfunction wipe(array) {\n    // Right now it's similar to array.fill(0). If it turns\n    // out that runtimes optimize this call away, maybe\n    // we can try something else.\n    for (var i = 0; i < array.length; i++) {\n        array[i] = 0;\n    }\n    return array;\n}\nexports.wipe = wipe;\n//# sourceMappingURL=wipe.js.map\n\n/***/ }),\n/* 1 */\n/* no static exports found */\n/* all exports used */\n/*!******************************************!*\\\n  !*** ./third-party/@stablelib/binary.js ***!\n  \\******************************************/\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\n// Copyright (C) 2016 Dmitry Chestnykh\n// MIT License. See LICENSE file for details.\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar int_1 = __webpack_require__(/*! @stablelib/int */ 2);\n// TODO(dchest): add asserts for correct value ranges and array offsets.\n/**\n * Reads 2 bytes from array starting at offset as big-endian\n * signed 16-bit integer and returns it.\n */\nfunction readInt16BE(array, offset) {\n    if (offset === void 0) {\n        offset = 0;\n    }\n    return (array[offset + 0] << 8 | array[offset + 1]) << 16 >> 16;\n}\nexports.readInt16BE = readInt16BE;\n/**\n * Reads 2 bytes from array starting at offset as big-endian\n * unsigned 16-bit integer and returns it.\n */\nfunction readUint16BE(array, offset) {\n    if (offset === void 0) {\n        offset = 0;\n    }\n    return (array[offset + 0] << 8 | array[offset + 1]) >>> 0;\n}\nexports.readUint16BE = readUint16BE;\n/**\n * Reads 2 bytes from array starting at offset as little-endian\n * signed 16-bit integer and returns it.\n */\nfunction readInt16LE(array, offset) {\n    if (offset === void 0) {\n        offset = 0;\n    }\n    return (array[offset + 1] << 8 | array[offset]) << 16 >> 16;\n}\nexports.readInt16LE = readInt16LE;\n/**\n * Reads 2 bytes from array starting at offset as little-endian\n * unsigned 16-bit integer and returns it.\n */\nfunction readUint16LE(array, offset) {\n    if (offset === void 0) {\n        offset = 0;\n    }\n    return (array[offset + 1] << 8 | array[offset]) >>> 0;\n}\nexports.readUint16LE = readUint16LE;\n/**\n * Writes 2-byte big-endian representation of 16-bit unsigned\n * value to byte array starting at offset.\n *\n * If byte array is not given, creates a new 2-byte one.\n *\n * Returns the output byte array.\n */\nfunction writeUint16BE(value, out, offset) {\n    if (out === void 0) {\n        out = new Uint8Array(2);\n    }\n    if (offset === void 0) {\n        offset = 0;\n    }\n    out[offset + 0] = value >>> 8;\n    out[offset + 1] = value >>> 0;\n    return out;\n}\nexports.writeUint16BE = writeUint16BE;\nexports.writeInt16BE = writeUint16BE;\n/**\n * Writes 2-byte little-endian representation of 16-bit unsigned\n * value to array starting at offset.\n *\n * If byte array is not given, creates a new 2-byte one.\n *\n * Returns the output byte array.\n */\nfunction writeUint16LE(value, out, offset) {\n    if (out === void 0) {\n        out = new Uint8Array(2);\n    }\n    if (offset === void 0) {\n        offset = 0;\n    }\n    out[offset + 0] = value >>> 0;\n    out[offset + 1] = value >>> 8;\n    return out;\n}\nexports.writeUint16LE = writeUint16LE;\nexports.writeInt16LE = writeUint16LE;\n/**\n * Reads 4 bytes from array starting at offset as big-endian\n * signed 32-bit integer and returns it.\n */\nfunction readInt32BE(array, offset) {\n    if (offset === void 0) {\n        offset = 0;\n    }\n    return array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3];\n}\nexports.readInt32BE = readInt32BE;\n/**\n * Reads 4 bytes from array starting at offset as big-endian\n * unsigned 32-bit integer and returns it.\n */\nfunction readUint32BE(array, offset) {\n    if (offset === void 0) {\n        offset = 0;\n    }\n    return (array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3]) >>> 0;\n}\nexports.readUint32BE = readUint32BE;\n/**\n * Reads 4 bytes from array starting at offset as little-endian\n * signed 32-bit integer and returns it.\n */\nfunction readInt32LE(array, offset) {\n    if (offset === void 0) {\n        offset = 0;\n    }\n    return array[offset + 3] << 24 | array[offset + 2] << 16 | array[offset + 1] << 8 | array[offset];\n}\nexports.readInt32LE = readInt32LE;\n/**\n * Reads 4 bytes from array starting at offset as little-endian\n * unsigned 32-bit integer and returns it.\n */\nfunction readUint32LE(array, offset) {\n    if (offset === void 0) {\n        offset = 0;\n    }\n    return (array[offset + 3] << 24 | array[offset + 2] << 16 | array[offset + 1] << 8 | array[offset]) >>> 0;\n}\nexports.readUint32LE = readUint32LE;\n/**\n * Writes 4-byte big-endian representation of 32-bit unsigned\n * value to byte array starting at offset.\n *\n * If byte array is not given, creates a new 4-byte one.\n *\n * Returns the output byte array.\n */\nfunction writeUint32BE(value, out, offset) {\n    if (out === void 0) {\n        out = new Uint8Array(4);\n    }\n    if (offset === void 0) {\n        offset = 0;\n    }\n    out[offset + 0] = value >>> 24;\n    out[offset + 1] = value >>> 16;\n    out[offset + 2] = value >>> 8;\n    out[offset + 3] = value >>> 0;\n    return out;\n}\nexports.writeUint32BE = writeUint32BE;\nexports.writeInt32BE = writeUint32BE;\n/**\n * Writes 4-byte little-endian representation of 32-bit unsigned\n * value to array starting at offset.\n *\n * If byte array is not given, creates a new 4-byte one.\n *\n * Returns the output byte array.\n */\nfunction writeUint32LE(value, out, offset) {\n    if (out === void 0) {\n        out = new Uint8Array(4);\n    }\n    if (offset === void 0) {\n        offset = 0;\n    }\n    out[offset + 0] = value >>> 0;\n    out[offset + 1] = value >>> 8;\n    out[offset + 2] = value >>> 16;\n    out[offset + 3] = value >>> 24;\n    return out;\n}\nexports.writeUint32LE = writeUint32LE;\nexports.writeInt32LE = writeUint32LE;\n/**\n * Reads 8 bytes from array starting at offset as big-endian\n * signed 64-bit integer and returns it.\n *\n * Due to JavaScript limitation, supports values up to 2^53-1.\n *\n * XXX: not constant-time.\n */\nfunction readInt64BE(array, offset) {\n    if (offset === void 0) {\n        offset = 0;\n    }\n    var hi = readInt32BE(array, offset);\n    var lo = readInt32BE(array, offset + 4);\n    var result = hi * 0x100000000 + lo;\n    // TODO(dchest): make constant-time.\n    if (lo < 0) {\n        result += 0x100000000;\n    }\n    return result;\n}\nexports.readInt64BE = readInt64BE;\n/**\n * Reads 8 bytes from array starting at offset as big-endian\n * unsigned 64-bit integer and returns it.\n *\n * Due to JavaScript limitation, supports values up to 2^53-1.\n */\nfunction readUint64BE(array, offset) {\n    if (offset === void 0) {\n        offset = 0;\n    }\n    var hi = readUint32BE(array, offset);\n    var lo = readUint32BE(array, offset + 4);\n    return hi * 0x100000000 + lo;\n}\nexports.readUint64BE = readUint64BE;\n/**\n * Reads 8 bytes from array starting at offset as little-endian\n * signed 64-bit integer and returns it.\n *\n * Due to JavaScript limitation, supports values up to 2^53-1.\n *\n * XXX: not constant-time.\n */\nfunction readInt64LE(array, offset) {\n    if (offset === void 0) {\n        offset = 0;\n    }\n    var lo = readInt32LE(array, offset);\n    var hi = readInt32LE(array, offset + 4);\n    var result = hi * 0x100000000 + lo;\n    // TODO(dchest): make constant-time.\n    if (lo < 0) {\n        result += 0x100000000;\n    }\n    return result;\n}\nexports.readInt64LE = readInt64LE;\n/**\n * Reads 8 bytes from array starting at offset as little-endian\n * unsigned 64-bit integer and returns it.\n *\n * Due to JavaScript limitation, supports values up to 2^53-1.\n */\nfunction readUint64LE(array, offset) {\n    if (offset === void 0) {\n        offset = 0;\n    }\n    var lo = readUint32LE(array, offset);\n    var hi = readUint32LE(array, offset + 4);\n    return hi * 0x100000000 + lo;\n}\nexports.readUint64LE = readUint64LE;\n/**\n * Writes 8-byte big-endian representation of 64-bit unsigned\n * value to byte array starting at offset.\n *\n * Due to JavaScript limitation, supports values up to 2^53-1.\n *\n * If byte array is not given, creates a new 8-byte one.\n *\n * Returns the output byte array.\n */\nfunction writeUint64BE(value, out, offset) {\n    if (out === void 0) {\n        out = new Uint8Array(8);\n    }\n    if (offset === void 0) {\n        offset = 0;\n    }\n    writeUint32BE(value / 0x100000000 >>> 0, out, offset);\n    writeUint32BE(value >>> 0, out, offset + 4);\n    return out;\n}\nexports.writeUint64BE = writeUint64BE;\nexports.writeInt64BE = writeUint64BE;\n/**\n * Writes 8-byte little-endian representation of 64-bit unsigned\n * value to byte array starting at offset.\n *\n * Due to JavaScript limitation, supports values up to 2^53-1.\n *\n * If byte array is not given, creates a new 8-byte one.\n *\n * Returns the output byte array.\n */\nfunction writeUint64LE(value, out, offset) {\n    if (out === void 0) {\n        out = new Uint8Array(8);\n    }\n    if (offset === void 0) {\n        offset = 0;\n    }\n    writeUint32LE(value >>> 0, out, offset);\n    writeUint32LE(value / 0x100000000 >>> 0, out, offset + 4);\n    return out;\n}\nexports.writeUint64LE = writeUint64LE;\nexports.writeInt64LE = writeUint64LE;\n/**\n * Reads bytes from array starting at offset as big-endian\n * unsigned bitLen-bit integer and returns it.\n *\n * Supports bit lengths divisible by 8, up to 48.\n */\nfunction readUintBE(bitLength, array, offset) {\n    if (offset === void 0) {\n        offset = 0;\n    }\n    // TODO(dchest): implement support for bitLenghts non-divisible by 8\n    if (bitLength % 8 !== 0) {\n        throw new Error(\"readUintBE supports only bitLengths divisible by 8\");\n    }\n    if (bitLength / 8 > array.length - offset) {\n        throw new Error(\"readUintBE: array is too short for the given bitLength\");\n    }\n    var result = 0;\n    var mul = 1;\n    for (var i = bitLength / 8 + offset - 1; i >= offset; i--) {\n        result += array[i] * mul;\n        mul *= 256;\n    }\n    return result;\n}\nexports.readUintBE = readUintBE;\n/**\n * Reads bytes from array starting at offset as little-endian\n * unsigned bitLen-bit integer and returns it.\n *\n * Supports bit lengths divisible by 8, up to 48.\n */\nfunction readUintLE(bitLength, array, offset) {\n    if (offset === void 0) {\n        offset = 0;\n    }\n    // TODO(dchest): implement support for bitLenghts non-divisible by 8\n    if (bitLength % 8 !== 0) {\n        throw new Error(\"readUintLE supports only bitLengths divisible by 8\");\n    }\n    if (bitLength / 8 > array.length - offset) {\n        throw new Error(\"readUintLE: array is too short for the given bitLength\");\n    }\n    var result = 0;\n    var mul = 1;\n    for (var i = offset; i < offset + bitLength / 8; i++) {\n        result += array[i] * mul;\n        mul *= 256;\n    }\n    return result;\n}\nexports.readUintLE = readUintLE;\n/**\n * Writes a big-endian representation of bitLen-bit unsigned\n * value to array starting at offset.\n *\n * Supports bit lengths divisible by 8, up to 48.\n *\n * If byte array is not given, creates a new one.\n *\n * Returns the output byte array.\n */\nfunction writeUintBE(bitLength, value, out, offset) {\n    if (out === void 0) {\n        out = new Uint8Array(bitLength / 8);\n    }\n    if (offset === void 0) {\n        offset = 0;\n    }\n    // TODO(dchest): implement support for bitLenghts non-divisible by 8\n    if (bitLength % 8 !== 0) {\n        throw new Error(\"writeUintBE supports only bitLengths divisible by 8\");\n    }\n    if (!int_1.isSafeInteger(value)) {\n        throw new Error(\"writeUintBE value must be an integer\");\n    }\n    var div = 1;\n    for (var i = bitLength / 8 + offset - 1; i >= offset; i--) {\n        out[i] = value / div & 0xff;\n        div *= 256;\n    }\n    return out;\n}\nexports.writeUintBE = writeUintBE;\n/**\n * Writes a little-endian representation of bitLen-bit unsigned\n * value to array starting at offset.\n *\n * Supports bit lengths divisible by 8, up to 48.\n *\n * If byte array is not given, creates a new one.\n *\n * Returns the output byte array.\n */\nfunction writeUintLE(bitLength, value, out, offset) {\n    if (out === void 0) {\n        out = new Uint8Array(bitLength / 8);\n    }\n    if (offset === void 0) {\n        offset = 0;\n    }\n    // TODO(dchest): implement support for bitLenghts non-divisible by 8\n    if (bitLength % 8 !== 0) {\n        throw new Error(\"writeUintLE supports only bitLengths divisible by 8\");\n    }\n    if (!int_1.isSafeInteger(value)) {\n        throw new Error(\"writeUintLE value must be an integer\");\n    }\n    var div = 1;\n    for (var i = offset; i < offset + bitLength / 8; i++) {\n        out[i] = value / div & 0xff;\n        div *= 256;\n    }\n    return out;\n}\nexports.writeUintLE = writeUintLE;\n/**\n * Reads 4 bytes from array starting at offset as big-endian\n * 32-bit floating-point number and returns it.\n */\nfunction readFloat32BE(array, offset) {\n    if (offset === void 0) {\n        offset = 0;\n    }\n    var view = new DataView(array.buffer, array.byteOffset, array.byteLength);\n    return view.getFloat32(offset);\n}\nexports.readFloat32BE = readFloat32BE;\n/**\n * Reads 4 bytes from array starting at offset as little-endian\n * 32-bit floating-point number and returns it.\n */\nfunction readFloat32LE(array, offset) {\n    if (offset === void 0) {\n        offset = 0;\n    }\n    var view = new DataView(array.buffer, array.byteOffset, array.byteLength);\n    return view.getFloat32(offset, true);\n}\nexports.readFloat32LE = readFloat32LE;\n/**\n * Reads 8 bytes from array starting at offset as big-endian\n * 64-bit floating-point number (\"double\") and returns it.\n */\nfunction readFloat64BE(array, offset) {\n    if (offset === void 0) {\n        offset = 0;\n    }\n    var view = new DataView(array.buffer, array.byteOffset, array.byteLength);\n    return view.getFloat64(offset);\n}\nexports.readFloat64BE = readFloat64BE;\n/**\n * Reads 8 bytes from array starting at offset as little-endian\n * 64-bit floating-point number (\"double\") and returns it.\n */\nfunction readFloat64LE(array, offset) {\n    if (offset === void 0) {\n        offset = 0;\n    }\n    var view = new DataView(array.buffer, array.byteOffset, array.byteLength);\n    return view.getFloat64(offset, true);\n}\nexports.readFloat64LE = readFloat64LE;\n/**\n * Writes 4-byte big-endian floating-point representation of value\n * to byte array starting at offset.\n *\n * If byte array is not given, creates a new 4-byte one.\n *\n * Returns the output byte array.\n */\nfunction writeFloat32BE(value, out, offset) {\n    if (out === void 0) {\n        out = new Uint8Array(4);\n    }\n    if (offset === void 0) {\n        offset = 0;\n    }\n    var view = new DataView(out.buffer, out.byteOffset, out.byteLength);\n    view.setFloat32(offset, value);\n    return out;\n}\nexports.writeFloat32BE = writeFloat32BE;\n/**\n * Writes 4-byte little-endian floating-point representation of value\n * to byte array starting at offset.\n *\n * If byte array is not given, creates a new 4-byte one.\n *\n * Returns the output byte array.\n */\nfunction writeFloat32LE(value, out, offset) {\n    if (out === void 0) {\n        out = new Uint8Array(4);\n    }\n    if (offset === void 0) {\n        offset = 0;\n    }\n    var view = new DataView(out.buffer, out.byteOffset, out.byteLength);\n    view.setFloat32(offset, value, true);\n    return out;\n}\nexports.writeFloat32LE = writeFloat32LE;\n/**\n * Writes 8-byte big-endian floating-point representation of value\n * to byte array starting at offset.\n *\n * If byte array is not given, creates a new 8-byte one.\n *\n * Returns the output byte array.\n */\nfunction writeFloat64BE(value, out, offset) {\n    if (out === void 0) {\n        out = new Uint8Array(8);\n    }\n    if (offset === void 0) {\n        offset = 0;\n    }\n    var view = new DataView(out.buffer, out.byteOffset, out.byteLength);\n    view.setFloat64(offset, value);\n    return out;\n}\nexports.writeFloat64BE = writeFloat64BE;\n/**\n * Writes 8-byte little-endian floating-point representation of value\n * to byte array starting at offset.\n *\n * If byte array is not given, creates a new 8-byte one.\n *\n * Returns the output byte array.\n */\nfunction writeFloat64LE(value, out, offset) {\n    if (out === void 0) {\n        out = new Uint8Array(8);\n    }\n    if (offset === void 0) {\n        offset = 0;\n    }\n    var view = new DataView(out.buffer, out.byteOffset, out.byteLength);\n    view.setFloat64(offset, value, true);\n    return out;\n}\nexports.writeFloat64LE = writeFloat64LE;\n//# sourceMappingURL=binary.js.map\n\n/***/ }),\n/* 2 */\n/* no static exports found */\n/* all exports used */\n/*!***************************************!*\\\n  !*** ./third-party/@stablelib/int.js ***!\n  \\***************************************/\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\n// Copyright (C) 2016 Dmitry Chestnykh\n// MIT License. See LICENSE file for details.\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\n// Shim using 16-bit pieces.\nfunction imulShim(a, b) {\n    var ah = a >>> 16 & 0xffff,\n        al = a & 0xffff;\n    var bh = b >>> 16 & 0xffff,\n        bl = b & 0xffff;\n    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;\n}\n/** 32-bit integer multiplication.  */\n// Use system Math.imul if available, otherwise use our shim.\nexports.mul = Math.imul || imulShim;\n/** 32-bit integer addition.  */\nfunction add(a, b) {\n    return a + b | 0;\n}\nexports.add = add;\n/**  32-bit integer subtraction.  */\nfunction sub(a, b) {\n    return a - b | 0;\n}\nexports.sub = sub;\n/** 32-bit integer left rotation */\nfunction rotl(x, n) {\n    return x << n | x >>> 32 - n;\n}\nexports.rotl = rotl;\n/** 32-bit integer left rotation */\nfunction rotr(x, n) {\n    return x << 32 - n | x >>> n;\n}\nexports.rotr = rotr;\nfunction isIntegerShim(n) {\n    return typeof n === \"number\" && isFinite(n) && Math.floor(n) === n;\n}\n/**\n * Returns true if the argument is an integer number.\n *\n * In ES2015, Number.isInteger.\n */\nexports.isInteger = Number.isInteger || isIntegerShim;\n/**\n *  Math.pow(2, 53) - 1\n *\n *  In ES2015 Number.MAX_SAFE_INTEGER.\n */\nexports.MAX_SAFE_INTEGER = 9007199254740991;\n/**\n * Returns true if the argument is a safe integer number\n * (-MIN_SAFE_INTEGER < number <= MAX_SAFE_INTEGER)\n *\n * In ES2015, Number.isSafeInteger.\n */\nexports.isSafeInteger = function (n) {\n    return exports.isInteger(n) && n >= -exports.MAX_SAFE_INTEGER && n <= exports.MAX_SAFE_INTEGER;\n};\n//# sourceMappingURL=int.js.map\n\n/***/ }),\n/* 3 */\n/* no static exports found */\n/* all exports used */\n/*!*************************************!*\\\n  !*** ./lib/typedArrayConversion.js ***!\n  \\*************************************/\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n/*\n * This Source Code is subject to the terms of the Mozilla Public License\n * version 2.0 (the \"License\"). You can obtain a copy of the License at\n * http://mozilla.org/MPL/2.0/.\n */\n\n\n\n// This is a dummy, a real conversion is only necessary in unit tests.\n\nexports.toTypedArray = function (obj) {\n  return obj;\n};\n\n/***/ }),\n/* 4 */\n/* no static exports found */\n/* all exports used */\n/*!******************************************!*\\\n  !*** ./third-party/@stablelib/scrypt.js ***!\n  \\******************************************/\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\n// Copyright (C) 2016 Dmitry Chestnykh\n// MIT License. See LICENSE file for details.\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar pbkdf2_1 = __webpack_require__(/*! @stablelib/pbkdf2 */ 9);\nvar sha256_1 = __webpack_require__(/*! @stablelib/sha256 */ 10);\nvar int_1 = __webpack_require__(/*! @stablelib/int */ 2);\nvar binary_1 = __webpack_require__(/*! @stablelib/binary */ 1);\nvar wipe_1 = __webpack_require__(/*! @stablelib/wipe */ 0);\nvar Scrypt = function () {\n    function Scrypt(N, r, p) {\n        // Check parallelization parameter.\n        if (p <= 0) {\n            throw new Error(\"scrypt: incorrect p\");\n        }\n        // Check r parameter.\n        if (r <= 0) {\n            throw new Error(\"scrypt: incorrect r\");\n        }\n        // Check that N is within supported range.\n        if (N < 1 || N > Math.pow(2, 31)) {\n            throw new Error('scrypt: N must be between 2 and 2^31');\n        }\n        // Check that N is a power of two.\n        if (!int_1.isInteger(N) || (N & N - 1) !== 0) {\n            throw new Error(\"scrypt: N must be a power of 2\");\n        }\n        var MAX_INT = 1 << 31 >>> 0;\n        if (r * p >= 1 << 30 || r > MAX_INT / 128 / p || r > MAX_INT / 256 || N > MAX_INT / 128 / r) {\n            throw new Error(\"scrypt: parameters are too large\");\n        }\n        // XXX we can use Uint32Array, but Int32Array is faster, especially in Safari.\n        this._V = new Int32Array(32 * (N + 2) * r);\n        this._XY = this._V.subarray(32 * N * r);\n        this.N = N;\n        this.r = r;\n        this.p = p;\n    }\n    Scrypt.prototype.deriveKey = function (password, salt, dkLen) {\n        var B = pbkdf2_1.deriveKey(sha256_1.SHA256, password, salt, 1, this.p * 128 * this.r);\n        for (var i = 0; i < this.p; i++) {\n            smix(B.subarray(i * 128 * this.r), this.r, this.N, this._V, this._XY);\n        }\n        var result = pbkdf2_1.deriveKey(sha256_1.SHA256, password, B, 1, dkLen);\n        wipe_1.wipe(B);\n        return result;\n    };\n    Scrypt.prototype.clean = function () {\n        wipe_1.wipe(this._V);\n    };\n    return Scrypt;\n}();\nexports.Scrypt = Scrypt;\nfunction smix(B, r, N, V, XY) {\n    var xi = 0;\n    var yi = 32 * r;\n    var tmp = new Int32Array(16);\n    for (var i = 0; i < 32 * r; i++) {\n        V[i] = binary_1.readUint32LE(B, i * 4);\n    }\n    for (var i = 0; i < N; i++) {\n        blockMix(tmp, V, i * (32 * r), (i + 1) * (32 * r), r);\n    }\n    for (var i = 0; i < N; i += 2) {\n        var j = integerify(XY, xi, r) & N - 1;\n        blockXOR(XY, xi, V, j * (32 * r), 32 * r);\n        blockMix(tmp, XY, xi, yi, r);\n        j = integerify(XY, yi, r) & N - 1;\n        blockXOR(XY, yi, V, j * (32 * r), 32 * r);\n        blockMix(tmp, XY, yi, xi, r);\n    }\n    for (var i = 0; i < 32 * r; i++) {\n        binary_1.writeUint32LE(XY[xi + i], B, i * 4);\n    }\n    wipe_1.wipe(tmp);\n}\nfunction salsaXOR(tmp, B, bin, bout) {\n    var j0 = tmp[0] ^ B[bin++],\n        j1 = tmp[1] ^ B[bin++],\n        j2 = tmp[2] ^ B[bin++],\n        j3 = tmp[3] ^ B[bin++],\n        j4 = tmp[4] ^ B[bin++],\n        j5 = tmp[5] ^ B[bin++],\n        j6 = tmp[6] ^ B[bin++],\n        j7 = tmp[7] ^ B[bin++],\n        j8 = tmp[8] ^ B[bin++],\n        j9 = tmp[9] ^ B[bin++],\n        j10 = tmp[10] ^ B[bin++],\n        j11 = tmp[11] ^ B[bin++],\n        j12 = tmp[12] ^ B[bin++],\n        j13 = tmp[13] ^ B[bin++],\n        j14 = tmp[14] ^ B[bin++],\n        j15 = tmp[15] ^ B[bin++];\n    var x0 = j0,\n        x1 = j1,\n        x2 = j2,\n        x3 = j3,\n        x4 = j4,\n        x5 = j5,\n        x6 = j6,\n        x7 = j7,\n        x8 = j8,\n        x9 = j9,\n        x10 = j10,\n        x11 = j11,\n        x12 = j12,\n        x13 = j13,\n        x14 = j14,\n        x15 = j15;\n    var u;\n    for (var i = 0; i < 8; i += 2) {\n        u = x0 + x12;\n        x4 ^= u << 7 | u >>> 32 - 7;\n        u = x4 + x0;\n        x8 ^= u << 9 | u >>> 32 - 9;\n        u = x8 + x4;\n        x12 ^= u << 13 | u >>> 32 - 13;\n        u = x12 + x8;\n        x0 ^= u << 18 | u >>> 32 - 18;\n        u = x5 + x1;\n        x9 ^= u << 7 | u >>> 32 - 7;\n        u = x9 + x5;\n        x13 ^= u << 9 | u >>> 32 - 9;\n        u = x13 + x9;\n        x1 ^= u << 13 | u >>> 32 - 13;\n        u = x1 + x13;\n        x5 ^= u << 18 | u >>> 32 - 18;\n        u = x10 + x6;\n        x14 ^= u << 7 | u >>> 32 - 7;\n        u = x14 + x10;\n        x2 ^= u << 9 | u >>> 32 - 9;\n        u = x2 + x14;\n        x6 ^= u << 13 | u >>> 32 - 13;\n        u = x6 + x2;\n        x10 ^= u << 18 | u >>> 32 - 18;\n        u = x15 + x11;\n        x3 ^= u << 7 | u >>> 32 - 7;\n        u = x3 + x15;\n        x7 ^= u << 9 | u >>> 32 - 9;\n        u = x7 + x3;\n        x11 ^= u << 13 | u >>> 32 - 13;\n        u = x11 + x7;\n        x15 ^= u << 18 | u >>> 32 - 18;\n        u = x0 + x3;\n        x1 ^= u << 7 | u >>> 32 - 7;\n        u = x1 + x0;\n        x2 ^= u << 9 | u >>> 32 - 9;\n        u = x2 + x1;\n        x3 ^= u << 13 | u >>> 32 - 13;\n        u = x3 + x2;\n        x0 ^= u << 18 | u >>> 32 - 18;\n        u = x5 + x4;\n        x6 ^= u << 7 | u >>> 32 - 7;\n        u = x6 + x5;\n        x7 ^= u << 9 | u >>> 32 - 9;\n        u = x7 + x6;\n        x4 ^= u << 13 | u >>> 32 - 13;\n        u = x4 + x7;\n        x5 ^= u << 18 | u >>> 32 - 18;\n        u = x10 + x9;\n        x11 ^= u << 7 | u >>> 32 - 7;\n        u = x11 + x10;\n        x8 ^= u << 9 | u >>> 32 - 9;\n        u = x8 + x11;\n        x9 ^= u << 13 | u >>> 32 - 13;\n        u = x9 + x8;\n        x10 ^= u << 18 | u >>> 32 - 18;\n        u = x15 + x14;\n        x12 ^= u << 7 | u >>> 32 - 7;\n        u = x12 + x15;\n        x13 ^= u << 9 | u >>> 32 - 9;\n        u = x13 + x12;\n        x14 ^= u << 13 | u >>> 32 - 13;\n        u = x14 + x13;\n        x15 ^= u << 18 | u >>> 32 - 18;\n    }\n    B[bout++] = tmp[0] = x0 + j0 | 0;\n    B[bout++] = tmp[1] = x1 + j1 | 0;\n    B[bout++] = tmp[2] = x2 + j2 | 0;\n    B[bout++] = tmp[3] = x3 + j3 | 0;\n    B[bout++] = tmp[4] = x4 + j4 | 0;\n    B[bout++] = tmp[5] = x5 + j5 | 0;\n    B[bout++] = tmp[6] = x6 + j6 | 0;\n    B[bout++] = tmp[7] = x7 + j7 | 0;\n    B[bout++] = tmp[8] = x8 + j8 | 0;\n    B[bout++] = tmp[9] = x9 + j9 | 0;\n    B[bout++] = tmp[10] = x10 + j10 | 0;\n    B[bout++] = tmp[11] = x11 + j11 | 0;\n    B[bout++] = tmp[12] = x12 + j12 | 0;\n    B[bout++] = tmp[13] = x13 + j13 | 0;\n    B[bout++] = tmp[14] = x14 + j14 | 0;\n    B[bout++] = tmp[15] = x15 + j15 | 0;\n}\nfunction blockCopy(dst, di, src, si, len) {\n    while (len--) {\n        dst[di++] = src[si++];\n    }\n}\nfunction blockXOR(dst, di, src, si, len) {\n    while (len--) {\n        dst[di++] ^= src[si++];\n    }\n}\nfunction blockMix(tmp, B, bin, bout, r) {\n    blockCopy(tmp, 0, B, bin + (2 * r - 1) * 16, 16);\n    for (var i = 0; i < 2 * r; i += 2) {\n        salsaXOR(tmp, B, bin + i * 16, bout + i * 8);\n        salsaXOR(tmp, B, bin + i * 16 + 16, bout + i * 8 + r * 16);\n    }\n}\nfunction integerify(B, bi, r) {\n    return B[bi + (2 * r - 1) * 16];\n}\n//# sourceMappingURL=scrypt.js.map\n\n/***/ }),\n/* 5 */\n/* no static exports found */\n/* all exports used */\n/*!************************!*\\\n  !*** ./data/scrypt.js ***!\n  \\************************/\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n/*\n * This Source Code is subject to the terms of the Mozilla Public License\n * version 2.0 (the \"License\"). You can obtain a copy of the License at\n * http://mozilla.org/MPL/2.0/.\n */\n\n\n\nvar N = 32768;\nvar r = 8;\nvar p = 1;\n\nvar _require = __webpack_require__(/*! ../lib/typedArrayConversion */ 3),\n    toTypedArray = _require.toTypedArray;\n\nvar _require2 = __webpack_require__(/*! @stablelib/scrypt */ 4),\n    Scrypt = _require2.Scrypt;\n\nvar hasher = new Scrypt(N, r, p);\n\nmodule.exports = hasher;\n\nif (typeof self != \"undefined\") {\n  self.onmessage = function (_ref) {\n    var _ref$data = _ref.data,\n        jobId = _ref$data.jobId,\n        password = _ref$data.password,\n        salt = _ref$data.salt,\n        length = _ref$data.length;\n\n    self.postMessage({\n      jobId: jobId,\n      result: hasher.deriveKey(toTypedArray(password), toTypedArray(salt), length)\n    });\n  };\n}\n\n/***/ }),\n/* 6 */\n/* no static exports found */\n/* all exports used */\n/*!*************************************************!*\\\n  !*** ./third-party/@stablelib/constant-time.js ***!\n  \\*************************************************/\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\n// Copyright (C) 2016 Dmitry Chestnykh\n// MIT License. See LICENSE file for details.\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/**\n * NOTE! Due to the inability to guarantee real constant time evaluation of\n * anything in JavaScript VM, this is module is the best effort.\n */\n/**\n * Returns resultIfOne if subject is 1, or resultIfZero if subject is 0.\n *\n * Supports only 32-bit integers, so resultIfOne or resultIfZero are not\n * integers, they'll be converted to them with bitwise operations.\n */\nfunction select(subject, resultIfOne, resultIfZero) {\n    return ~(subject - 1) & resultIfOne | subject - 1 & resultIfZero;\n}\nexports.select = select;\n/**\n * Returns 1 if a <= b, or 0 if not.\n * Arguments must be positive 32-bit integers less than or equal to 2^31 - 1.\n */\nfunction lessOrEqual(a, b) {\n    return (a | 0) - (b | 0) - 1 >>> 31 & 1;\n}\nexports.lessOrEqual = lessOrEqual;\n/**\n * Returns 1 if a and b are of equal length and their contents\n * are equal, or 0 otherwise.\n *\n * Note that unlike in equal(), zero-length inputs are considered\n * the same, so this function will return 1.\n */\nfunction compare(a, b) {\n    if (a.length !== b.length) {\n        return 0;\n    }\n    var result = 0;\n    for (var i = 0; i < a.length; i++) {\n        result |= a[i] ^ b[i];\n    }\n    return 1 & result - 1 >>> 8;\n}\nexports.compare = compare;\n/**\n * Returns true if a and b are of equal non-zero length,\n * and their contents are equal, or false otherwise.\n *\n * Note that unlike in compare() zero-length inputs are considered\n * _not_ equal, so this function will return false.\n */\nfunction equal(a, b) {\n    if (a.length === 0 || b.length === 0) {\n        return false;\n    }\n    return compare(a, b) !== 0;\n}\nexports.equal = equal;\n//# sourceMappingURL=constant-time.js.map\n\n/***/ }),\n/* 7 */\n/* no static exports found */\n/* all exports used */\n/*!****************************************!*\\\n  !*** ./third-party/@stablelib/hash.js ***!\n  \\****************************************/\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\n// Copyright (C) 2016 Dmitry Chestnykh\n// MIT License. See LICENSE file for details.\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction isSerializableHash(h) {\n    return typeof h.saveState !== \"undefined\" && typeof h.restoreState !== \"undefined\" && typeof h.cleanSavedState !== \"undefined\";\n}\nexports.isSerializableHash = isSerializableHash;\n// TODO(dchest): figure out the standardized interface for XOF such as\n// SHAKE and BLAKE2X.\n//# sourceMappingURL=hash.js.map\n\n/***/ }),\n/* 8 */\n/* no static exports found */\n/* all exports used */\n/*!****************************************!*\\\n  !*** ./third-party/@stablelib/hmac.js ***!\n  \\****************************************/\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\n// Copyright (C) 2016 Dmitry Chestnykh\n// MIT License. See LICENSE file for details.\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar hash_1 = __webpack_require__(/*! @stablelib/hash */ 7);\nvar constant_time_1 = __webpack_require__(/*! @stablelib/constant-time */ 6);\nvar wipe_1 = __webpack_require__(/*! @stablelib/wipe */ 0);\n// HMAC implements hash-based message authentication algorithm.\nvar HMAC = function () {\n    function HMAC(hash, key) {\n        // Initialize inner and outer hashes.\n        this._inner = new hash();\n        this._outer = new hash();\n        // Set block and digest sizes for this HMAC\n        // instance to values from the hash.\n        this.blockSize = this._outer.blockSize;\n        this.digestLength = this._outer.digestLength;\n        // Pad temporary stores a key (or its hash) padded with zeroes.\n        var pad = new Uint8Array(this.blockSize);\n        if (key.length > this.blockSize) {\n            // If key is bigger than hash block size, it must be\n            // hashed and this hash is used as a key instead.\n            this._inner.update(key).finish(pad).clean();\n        } else {\n            // Otherwise, copy the key into pad.\n            pad.set(key);\n        }\n        // Now two different keys are derived from padded key\n        // by xoring a different byte value to each.\n        // To make inner hash key, xor byte 0x36 into pad.\n        for (var i = 0; i < pad.length; i++) {\n            pad[i] ^= 0x36;\n        }\n        // Update inner hash with the result.\n        this._inner.update(pad);\n        // To make outer hash key, xor byte 0x5c into pad.\n        // But since we already xored 0x36 there, we must\n        // first undo this by xoring it again.\n        for (var i = 0; i < pad.length; i++) {\n            pad[i] ^= 0x36 ^ 0x5c;\n        }\n        // Update outer hash with the result.\n        this._outer.update(pad);\n        // Save states of both hashes, so that we can quickly restore\n        // them later in reset() without the need to remember the actual\n        // key and perform this initialization again.\n        if (hash_1.isSerializableHash(this._inner) && hash_1.isSerializableHash(this._outer)) {\n            this._innerKeyedState = this._inner.saveState();\n            this._outerKeyedState = this._outer.saveState();\n        }\n        // Clean pad.\n        wipe_1.wipe(pad);\n    }\n    // Returns HMAC state to the state initialized with key\n    // to make it possible to run HMAC over the other data with the same\n    // key without creating a new instance.\n    HMAC.prototype.reset = function () {\n        if (!hash_1.isSerializableHash(this._inner) || !hash_1.isSerializableHash(this._outer)) {\n            throw new Error(\"hmac: can't reset() because hash doesn't implement restoreState()\");\n        }\n        // Restore keyed states of inner and outer hashes.\n        this._inner.restoreState(this._innerKeyedState);\n        this._outer.restoreState(this._outerKeyedState);\n        this._finished = false;\n        return this;\n    };\n    // Cleans HMAC state.\n    HMAC.prototype.clean = function () {\n        if (hash_1.isSerializableHash(this._inner)) {\n            this._inner.cleanSavedState(this._innerKeyedState);\n        }\n        if (hash_1.isSerializableHash(this._outer)) {\n            this._outer.cleanSavedState(this._outerKeyedState);\n        }\n        this._inner.clean();\n        this._outer.clean();\n    };\n    // Updates state with provided data.\n    HMAC.prototype.update = function (data) {\n        this._inner.update(data);\n        return this;\n    };\n    // Finalizes HMAC and puts the result in out.\n    HMAC.prototype.finish = function (out) {\n        if (this._finished) {\n            // If HMAC was finalized, outer hash is also finalized,\n            // so it produces the same digest it produced when it\n            // was finalized.\n            this._outer.finish(out);\n            return this;\n        }\n        // Finalize inner hash and store the result temporarily.\n        this._inner.finish(out);\n        // Update outer hash with digest of inner hash and and finalize it.\n        this._outer.update(out.subarray(0, this.digestLength)).finish(out);\n        this._finished = true;\n        return this;\n    };\n    // Returns message authentication code.\n    HMAC.prototype.digest = function () {\n        var out = new Uint8Array(this.digestLength);\n        this.finish(out);\n        return out;\n    };\n    // Saves HMAC state.\n    // This function is needed for PBKDF2 optimization.\n    HMAC.prototype.saveState = function () {\n        if (!hash_1.isSerializableHash(this._inner)) {\n            throw new Error(\"hmac: can't saveState() because hash doesn't implement it\");\n        }\n        return this._inner.saveState();\n    };\n    HMAC.prototype.restoreState = function (savedState) {\n        if (!hash_1.isSerializableHash(this._inner) || !hash_1.isSerializableHash(this._outer)) {\n            throw new Error(\"hmac: can't restoreState() because hash doesn't implement it\");\n        }\n        this._inner.restoreState(savedState);\n        this._outer.restoreState(this._outerKeyedState);\n        this._finished = false;\n        return this;\n    };\n    HMAC.prototype.cleanSavedState = function (savedState) {\n        if (!hash_1.isSerializableHash(this._inner)) {\n            throw new Error(\"hmac: can't cleanSavedState() because hash doesn't implement it\");\n        }\n        this._inner.cleanSavedState(savedState);\n    };\n    return HMAC;\n}();\nexports.HMAC = HMAC;\n/**\n * Returns HMAC using the given hash constructor for the key over data.\n */\nfunction hmac(hash, key, data) {\n    var h = new HMAC(hash, key);\n    h.update(data);\n    var digest = h.digest();\n    h.clean();\n    return digest;\n}\nexports.hmac = hmac;\n/**\n * Returns true if two HMAC digests are equal.\n * Uses contant-time comparison to avoid leaking timing information.\n *\n * Example:\n *\n *    const receivedDigest = ...\n *    const realDigest = hmac(SHA256, key, data);\n *    if (!equal(receivedDigest, realDigest)) {\n *        throw new Error(\"Authentication error\");\n *    }\n */\nexports.equal = constant_time_1.equal;\n//# sourceMappingURL=hmac.js.map\n\n/***/ }),\n/* 9 */\n/* no static exports found */\n/* all exports used */\n/*!******************************************!*\\\n  !*** ./third-party/@stablelib/pbkdf2.js ***!\n  \\******************************************/\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\n// Copyright (C) 2016 Dmitry Chestnykh\n// MIT License. See LICENSE file for details.\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar hmac_1 = __webpack_require__(/*! @stablelib/hmac */ 8);\nvar binary_1 = __webpack_require__(/*! @stablelib/binary */ 1);\nvar wipe_1 = __webpack_require__(/*! @stablelib/wipe */ 0);\nfunction deriveKey(hash, password, salt, iterations, length) {\n    var prf = new hmac_1.HMAC(hash, password);\n    var dlen = prf.digestLength;\n    var ctr = new Uint8Array(4);\n    var t = new Uint8Array(dlen);\n    var u = new Uint8Array(dlen);\n    var dk = new Uint8Array(length);\n    var saltedState = prf.update(salt).saveState();\n    for (var i = 0; i * dlen < length; i++) {\n        binary_1.writeUint32BE(i + 1, ctr);\n        prf.restoreState(saltedState).update(ctr).finish(u);\n        for (var j = 0; j < dlen; j++) {\n            t[j] = u[j];\n        }\n        for (var j = 2; j <= iterations; j++) {\n            prf.reset().update(u).finish(u);\n            for (var k = 0; k < dlen; k++) {\n                t[k] ^= u[k];\n            }\n        }\n        for (var j = 0; j < dlen && i * dlen + j < length; j++) {\n            dk[i * dlen + j] = t[j];\n        }\n    }\n    wipe_1.wipe(t);\n    wipe_1.wipe(u);\n    wipe_1.wipe(ctr);\n    prf.cleanSavedState(saltedState);\n    prf.clean();\n    return dk;\n}\nexports.deriveKey = deriveKey;\n//# sourceMappingURL=pbkdf2.js.map\n\n/***/ }),\n/* 10 */\n/* no static exports found */\n/* all exports used */\n/*!******************************************!*\\\n  !*** ./third-party/@stablelib/sha256.js ***!\n  \\******************************************/\n/***/ (function(module, exports, __webpack_require__) {\n\n\"use strict\";\n\n// Copyright (C) 2016 Dmitry Chestnykh\n// MIT License. See LICENSE file for details.\n\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar binary_1 = __webpack_require__(/*! @stablelib/binary */ 1);\nvar wipe_1 = __webpack_require__(/*! @stablelib/wipe */ 0);\nexports.DIGEST_LENGTH = 32;\nexports.BLOCK_SIZE = 64;\n/**\n * SHA2-256 cryptographic hash algorithm.\n */\nvar SHA256 = function () {\n    function SHA256() {\n        /** Length of hash output */\n        this.digestLength = exports.DIGEST_LENGTH;\n        /** Block size */\n        this.blockSize = exports.BLOCK_SIZE;\n        // Note: Int32Array is used instead of Uint32Array for performance reasons.\n        this._state = new Int32Array(8); // hash state\n        this._temp = new Int32Array(64); // temporary state\n        this._buffer = new Uint8Array(128); // buffer for data to hash\n        this._bufferLength = 0; // number of bytes in buffer\n        this._bytesHashed = 0; // number of total bytes hashed\n        this._finished = false; // indicates whether the hash was finalized\n        this.reset();\n    }\n    SHA256.prototype._initState = function () {\n        this._state[0] = 0x6a09e667;\n        this._state[1] = 0xbb67ae85;\n        this._state[2] = 0x3c6ef372;\n        this._state[3] = 0xa54ff53a;\n        this._state[4] = 0x510e527f;\n        this._state[5] = 0x9b05688c;\n        this._state[6] = 0x1f83d9ab;\n        this._state[7] = 0x5be0cd19;\n    };\n    /**\n     * Resets hash state making it possible\n     * to re-use this instance to hash other data.\n     */\n    SHA256.prototype.reset = function () {\n        this._initState();\n        this._bufferLength = 0;\n        this._bytesHashed = 0;\n        this._finished = false;\n        return this;\n    };\n    /**\n     * Cleans internal buffers and resets hash state.\n     */\n    SHA256.prototype.clean = function () {\n        wipe_1.wipe(this._buffer);\n        wipe_1.wipe(this._temp);\n        this.reset();\n    };\n    /**\n     * Updates hash state with the given data.\n     *\n     * Throws error when trying to update already finalized hash:\n     * instance must be reset to update it again.\n     */\n    SHA256.prototype.update = function (data, dataLength) {\n        if (dataLength === void 0) {\n            dataLength = data.length;\n        }\n        if (this._finished) {\n            throw new Error(\"SHA256: can't update because hash was finished.\");\n        }\n        var dataPos = 0;\n        this._bytesHashed += dataLength;\n        if (this._bufferLength > 0) {\n            while (this._bufferLength < this.blockSize && dataLength > 0) {\n                this._buffer[this._bufferLength++] = data[dataPos++];\n                dataLength--;\n            }\n            if (this._bufferLength === this.blockSize) {\n                hashBlocks(this._temp, this._state, this._buffer, 0, this.blockSize);\n                this._bufferLength = 0;\n            }\n        }\n        if (dataLength >= this.blockSize) {\n            dataPos = hashBlocks(this._temp, this._state, data, dataPos, dataLength);\n            dataLength %= this.blockSize;\n        }\n        while (dataLength > 0) {\n            this._buffer[this._bufferLength++] = data[dataPos++];\n            dataLength--;\n        }\n        return this;\n    };\n    /**\n     * Finalizes hash state and puts hash into out.\n     * If hash was already finalized, puts the same value.\n     */\n    SHA256.prototype.finish = function (out) {\n        if (!this._finished) {\n            var bytesHashed = this._bytesHashed;\n            var left = this._bufferLength;\n            var bitLenHi = bytesHashed / 0x20000000 | 0;\n            var bitLenLo = bytesHashed << 3;\n            var padLength = bytesHashed % 64 < 56 ? 64 : 128;\n            this._buffer[left] = 0x80;\n            for (var i = left + 1; i < padLength - 8; i++) {\n                this._buffer[i] = 0;\n            }\n            binary_1.writeUint32BE(bitLenHi, this._buffer, padLength - 8);\n            binary_1.writeUint32BE(bitLenLo, this._buffer, padLength - 4);\n            hashBlocks(this._temp, this._state, this._buffer, 0, padLength);\n            this._finished = true;\n        }\n        for (var i = 0; i < this.digestLength / 4; i++) {\n            binary_1.writeUint32BE(this._state[i], out, i * 4);\n        }\n        return this;\n    };\n    /**\n     * Returns the final hash digest.\n     */\n    SHA256.prototype.digest = function () {\n        var out = new Uint8Array(this.digestLength);\n        this.finish(out);\n        return out;\n    };\n    /**\n     * Function useful for HMAC/PBKDF2 optimization.\n     * Returns hash state to be used with restoreState().\n     * Only chain value is saved, not buffers or other\n     * state variables.\n     */\n    SHA256.prototype.saveState = function () {\n        if (this._finished) {\n            throw new Error(\"SHA256: cannot save finished state\");\n        }\n        return {\n            state: new Int32Array(this._state),\n            buffer: this._bufferLength > 0 ? new Uint8Array(this._buffer) : undefined,\n            bufferLength: this._bufferLength,\n            bytesHashed: this._bytesHashed\n        };\n    };\n    /**\n     * Function useful for HMAC/PBKDF2 optimization.\n     * Restores state saved by saveState() and sets bytesHashed\n     * to the given value.\n     */\n    SHA256.prototype.restoreState = function (savedState) {\n        this._state.set(savedState.state);\n        this._bufferLength = savedState.bufferLength;\n        if (savedState.buffer) {\n            this._buffer.set(savedState.buffer);\n        }\n        this._bytesHashed = savedState.bytesHashed;\n        this._finished = false;\n        return this;\n    };\n    /**\n     * Cleans state returned by saveState().\n     */\n    SHA256.prototype.cleanSavedState = function (savedState) {\n        wipe_1.wipe(savedState.state);\n        if (savedState.buffer) {\n            wipe_1.wipe(savedState.buffer);\n        }\n        savedState.bufferLength = 0;\n        savedState.bytesHashed = 0;\n    };\n    return SHA256;\n}();\nexports.SHA256 = SHA256;\n// Constants\nvar K = new Int32Array([0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2]);\nfunction hashBlocks(w, v, p, pos, len) {\n    while (len >= 64) {\n        var a = v[0];\n        var b = v[1];\n        var c = v[2];\n        var d = v[3];\n        var e = v[4];\n        var f = v[5];\n        var g = v[6];\n        var h = v[7];\n        for (var i = 0; i < 16; i++) {\n            var j = pos + i * 4;\n            w[i] = binary_1.readUint32BE(p, j);\n        }\n        for (var i = 16; i < 64; i++) {\n            var u = w[i - 2];\n            var t1 = (u >>> 17 | u << 32 - 17) ^ (u >>> 19 | u << 32 - 19) ^ u >>> 10;\n            u = w[i - 15];\n            var t2 = (u >>> 7 | u << 32 - 7) ^ (u >>> 18 | u << 32 - 18) ^ u >>> 3;\n            w[i] = (t1 + w[i - 7] | 0) + (t2 + w[i - 16] | 0);\n        }\n        for (var i = 0; i < 64; i++) {\n            var t1 = (((e >>> 6 | e << 32 - 6) ^ (e >>> 11 | e << 32 - 11) ^ (e >>> 25 | e << 32 - 25)) + (e & f ^ ~e & g) | 0) + (h + (K[i] + w[i] | 0) | 0) | 0;\n            var t2 = ((a >>> 2 | a << 32 - 2) ^ (a >>> 13 | a << 32 - 13) ^ (a >>> 22 | a << 32 - 22)) + (a & b ^ a & c ^ b & c) | 0;\n            h = g;\n            g = f;\n            f = e;\n            e = d + t1 | 0;\n            d = c;\n            c = b;\n            b = a;\n            a = t1 + t2 | 0;\n        }\n        v[0] += a;\n        v[1] += b;\n        v[2] += c;\n        v[3] += d;\n        v[4] += e;\n        v[5] += f;\n        v[6] += g;\n        v[7] += h;\n        pos += 64;\n        len -= 64;\n    }\n    return pos;\n}\nfunction hash(data) {\n    var h = new SHA256();\n    h.update(data);\n    var digest = h.digest();\n    h.clean();\n    return digest;\n}\nexports.hash = hash;\n//# sourceMappingURL=sha256.js.map\n\n/***/ })\n/******/ ]);";

/***/ }),
/* 25 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** multi ./lib/platform.js ./lib/main.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /home/wladimir/repos/pfp/lib/platform.js */12);
module.exports = __webpack_require__(/*! /home/wladimir/repos/pfp/lib/main.js */11);


/***/ })
/******/ ]);