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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************!*\
  !*** external "Vue" ***!
  \**********************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = Vue;

/***/ }),
/* 1 */
/*!****************************!*\
  !*** ./lib/eventTarget.js ***!
  \****************************/
/*! no static exports found */
/*! exports used: EventTarget, emit */
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
/* 2 */
/*!*************************!*\
  !*** external "zxcvbn" ***!
  \*************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = zxcvbn;

/***/ }),
/* 3 */
/*!***********************!*\
  !*** external "JSQR" ***!
  \***********************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = JSQR;

/***/ }),
/* 4 */
/*!************************************!*\
  !*** ./web/index.js + 190 modules ***!
  \************************************/
/*! no exports provided */
/*! all exports used */
/*! ModuleConcatenation bailout: Cannot concat with ./lib/eventTarget.js (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "JSQR" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "Vue" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "zxcvbn" (<- Module is not an ECMAScript module) */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "Vue"
var external_Vue_ = __webpack_require__(0);
var external_Vue_default = /*#__PURE__*/__webpack_require__.n(external_Vue_);

// CONCATENATED MODULE: ./locale/en-US.properties
/* harmony default export */ var en_US_properties = ({"password_too_short":"The master password should be at least 6 characters long.","passwords_differ":"Passwords don't match.","weak_password":"Your master password is too simple and wouldn't take long enough to guess. It is recommended that you choose a more complicated password. Do you really want to proceed with this master password?","password_declined":"This doesn't seem to be the master password you have used before.","decryption_failure":"Some data could not be decrypted, maybe wrong master password was used?","user_name_required":"Please enter your user name or an arbitrary name if the website doesn't require one.","user_name_exists":"This user name and revision combination already exists. Maybe increase the revision number?","no_characters_selected":"At least one character set has to be selected.","password_value_required":"Please enter the password you used on this website.","password_type_generated2":"Generated password","password_type_stored":"Stored password","password_type_stored_with_recovery":"Stored password, recovery code below","recovery_code_explanation":"Recovery codes can be entered instead of the password when adding a stored password. They are safe to print, decryption is only possible with the right master password.","password_info_notes":"Notes:","remove_password_confirmation":"Do you really want to remove the password \"{1}\" for the website {2}?","remove_password_confirmation_notes":"This password has notes attached to it: {1}","remove_alias_confirmation":"Do you really want to stop treating {1} as an alias for {2}?","recovery_checksum_mismatch":"Row is mistyped or not the next row.","sync_invalid_token":"Access has been denied, you probably need to authorize PfP again.","sync_unknown_data_format":"Format of currently stored data is unrecognized, it might have been created by a newer PfP version.","sync_connection_error":"Server connection failed.","sync_too_many_retries":"Too many retries after conflicting modifications.","sync_multiple_candidates":"Your storage provider has multiple PfP files stored for some reason. You probably need to delete PfP data there and sync again.","sync_malformed_response":"Your storage provider responded in a way that PfP could not understand.","sync_wrong_master_password":"It seems that the currently stored data was encrypted with a different master password.","sync_unrelated_client":"It seems that remote data has been created by an unrelated PfP instance. If you want to sync to it, disable sync now and set it up again.","sync_tampered_data":"It seems that remote data has either been tampered with or reset to an older revision. Remove remote data to fix this issue.","sync_master_password_required":"Initial sync requires passwords to be unlocked, please click \"Upload now\" to retry.","ok":"OK","cancel":"Cancel","close":"Close","yes":"Yes","no":"No","no_site_placeholder":"(none)","learn_more":"Learn more…","unknown_error":"The operation failed unexpectedly.","unknown_error_more":"Show error message","new_master_message":"You didn't define a master password yet, please do so below.","reset_master_message":"Warning: If you change your master password all your existing passwords will be reset.","master_security_message":"It is essential that you choose a strong master password.","new_master":"New master password:","new_master_repeat":"Please reenter password:","change_master_submit":"Set master password","master_password":"Enter master password:","enter_master_submit":"Access passwords","reset_master_link":"Reset master password","migration_title":"Legacy passwords and data are no longer supported","migration_intro":"In order for PfP: Pain-free Passwords to be more robust, some outdated functionality has been removed:","migration_change1":"Legacy (EasyPasswords 1.x) generated passwords are no longer supported. If you still have any, these will be converted to stored passwords now.","migration_change2":"Legacy (unencrypted) backups will no longer be imported.","migration_conclusion":"None of this is likely to affect you. Still, you might want to create a new backup just so you have one with current data.","migration_in_progress":"Updating your data, please wait…","migration_continue":"Continue","select_site_label":"Select site","password_list":"Password list","sync_setup":"Set up sync","sync_state":"Show sync state","settings":"Settings","site":"Website name:","add_alias":"This website shares passwords with another?","alias_description":"You indicated that {1} shares passwords with this website.","remove_alias":"Revert","show_all_passwords":"Show all passwords","lock_passwords":"Lock passwords","password_copied_message":"Password has been copied to clipboard.","username_copied_message":"User name has been copied to clipboard.","no_such_password":"Unknown password!","unknown_generation_method":"Unknown password generation method!","wrong_site_message":"You are not on the right website!","no_password_fields":"The page has no password fields or the password fields belong to a different site! Maybe click the user name and try again.","no_passwords_message":"No passwords yet","password_ready_message":"Your password is ready, click again anywhere to copy it.","passwords_label":"Passwords:","password_menu":"All actions","to_document":"Fill in","to_clipboard":"Copy to clipboard","to_clipboard_username":"Copy user name","show_qrcode":"Show as QR code","add_notes":"Add notes","edit_notes":"Edit notes","make_generated":"Replace by generated password","bump_revision":"Generate new password for this user name","remove_password":"Remove password","generate_password_link":"Generate new password","stored_password_link":"Enter stored password","replace_password_warning":"Making this a generated password will change its value. Make sure that you already filled in \"current password\" in the website's password change form.","user_name":"User name:","change_password_revision":"Need a new password for the same username?","password_revision":"Revision:","keep_notes":"Keep notes from original password","password_length":"Length:","allowed_characters":"Allowed characters:","generate_password":"Generate password","stored_password_warning":"Generated passwords are preferable, these can be easily recovered as long as you still remember your master password and user name.","password_value":"Password:","use_recovery":"Use recovery code","save_password":"Save password","select_alias":"Mark \"{1}\" as an alias for:","select_site":"Please select a site:","autocomplete_no_sites":"No sites matched your search","select":"Select","recovery_code":"Recovery code:","recovery_remove_line":"Remove line","cancel_recovery":"Enter password directly","password_notes":"Password notes:","save_notes":"Save notes","sync_selection_label":"Please select your storage provider:","sync_how_label":"How does this work?","sync_how_explanation":"You grant PfP access to a directory within your personal account on Dropbox or another storage provider. This access will be used to upload a file with encrypted data regularly. It's the same data as with your manual backup, but you can connect multiple devices to the same account and changes will propagate to all of them automatically – assuming that they all use the same master password.","sync_safe_label":"Is this safe?","sync_safe_explanation":"Yes. PfP can only access its own file, not the other files stored in your account. Also, the file's data is fully encrypted and can only be decrypted using your master password.","sync_no_account_label":"What if I don't have an account?","sync_no_account_explanation":"It doesn't matter, you can create an account for free. You don't need to use that account for anything beyond PfP.","sync_token_label":"Please paste the code given by the storage provider:","sync_provider":"Uploading to:","sync_lastTime":"Last upload:","sync_lastTime_never":"Never","sync_lastTime_now":"Running…","sync_succeeded":"(succeeded)","sync_failed":"(failed)","do_sync":"Upload now","sync_reauthorize":"Reauthorize…","sync_disable":"Disable sync","sync_disable_confirmation":"Do you really want to disable sync functionality? Your data will no longer be backed up to your provider automatically.","remoteStorage_username_label":"Please enter your remoteStorage user address:","remoteStorage_get_account":"Don't have remoteStorage? Learn where to get an account or how to host your own.","remoteStorage_invalid_username":"This doesn't seem to be a valid remoteStorage user address.","allpasswords_title":"All passwords known to PfP","allpasswords_export":"Save password definitions to a file","allpasswords_import":"Import password definitions from a file","allpasswords_print":"Print","allpasswords_show_notes":"Show notes","allpasswords_show_passwords":"Show passwords","allpasswords_intro":"Here you can create an encrypted backup of your data. This page is also safe to print as long as the passwords aren't shown, the information shown is sufficient to recreate the passwords (same master password has to be used).","allpasswords_aliases":"Aliases:","master_password_required":"Your passwords are currently locked. Please unlock them by clicking PfP icon and try again.","unknown_data_format":"Unknown data format!","syntax_error":"The file contains errors and could not be imported.","allpasswords_import_confirm":"Your existing passwords might get overwritten. Are you sure you want to proceed?","allpasswords_import_with_master":"It seems that this backup was created with a different master password. It can still be imported, all generated passwords will be converted to stored passwords however.","allpasswords_import_success":"Passwords data has been imported.","allpasswords_show_confirm":"This will display all your passwords on screen, please only proceed if nobody can watch over your shoulder. This action might take some time to complete.","web_compat_message":"Your browser lacks the required functionality for this application. At least Mozilla Firefox 43, Google Chrome 51, Opera 38, Apple Safari 11 or Microsoft Edge 12 is required.","autolock_title":"Enable auto-lock","autolock_description":"Lock passwords automatically when the panel is closed","autolock_delay_title":"Auto-lock delay","autolock_delay_description":"Interval in minutes after which the passwords should be locked"});
// CONCATENATED MODULE: ./web/eventTarget.js
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
// CONCATENATED MODULE: ./web/contentBrowserAPI.js
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */




var port = {
  postMessage: function postMessage(payload) {
    window.dispatchEvent(new CustomEvent("toBackground", {
      detail: payload
    }));
  },
  disconnect: function disconnect() {},
  onMessage: new EventTarget()
};
var runtime = {
  connect: function connect(params) {
    return port;
  },
  getBackgroundPage: function getBackgroundPage() {
    return Promise.reject(new Error("Not implemented"));
  }
};
var i18n = {
  getMessage: function getMessage(id) {
    return en_US_properties[id];
  }
};
window.addEventListener("fromBackground", function (event) {
  port.onMessage._emit(event.detail);
});
// CONCATENATED MODULE: ./ui/common.js
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */



function validateMasterPassword(val) {
  if (val.value.length < 6) val.error = this.$t("password_too_short");
}
function getSiteDisplayName(site) {
  if (site == "pfp.invalid") return i18n.getMessage("no_site_placeholder");else if (site) return site;else return "???";
}
function keyboardNavigationType(event) {
  var rtl = document.documentElement.getAttribute("dir") == "rtl";

  switch (event.key) {
    case "ArrowUp":
      return "back";

    case rtl ? "ArrowRight" : "ArrowLeft":
      return "backinrow";

    case "ArrowDown":
      return "forward";

    case rtl ? "ArrowLeft" : "ArrowRight":
      return "forwardinrow";

    case "Home":
      return "startinrow";

    case "PageUp":
      return "start";

    case "End":
      return "endinrow";

    case "PageDown":
      return "end";
  }

  return null;
}
// CONCATENATED MODULE: ./ui/i18n.js
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */



/* harmony default export */ var ui_i18n = ({
  install: function install(Vue) {
    Vue.prototype.$t = function (id) {
      var message = i18n.getMessage(id);

      for (var i = 0; i < (arguments.length <= 1 ? 0 : arguments.length - 1); i++) {
        message = message.replace(new RegExp("\\{".concat(i + 1, "\\}"), "g"), i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1]);
      }

      return message;
    };
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/components/ExternalLink.vue?vue&type=template&id=86bb9e1e&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.$isWebClient
    ? _c(
        "a",
        { attrs: { href: _vm.url, target: "_blank" } },
        [_vm._t("default")],
        2
      )
    : _c(
        "a",
        {
          attrs: { href: "#" },
          on: {
            click: function($event) {
              $event.preventDefault()
              return _vm.click($event)
            }
          }
        },
        [_vm._t("default")],
        2
      )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./ui/components/ExternalLink.vue?vue&type=template&id=86bb9e1e&

// EXTERNAL MODULE: ./lib/eventTarget.js
var eventTarget = __webpack_require__(1);

// CONCATENATED MODULE: ./ui/messaging.js
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */


function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }



var messageQueue = null;
var portName = "contentScript";

if (typeof runtime.getBackgroundPage == "function") {
  // If we can access the background page we are not in a content script.
  portName = document.documentElement.dataset.portname;
  messageQueue = [];
  document.addEventListener("DOMContentLoaded", function (event) {
    var queue = messageQueue;
    messageQueue = null;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = queue[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var message = _step.value;
        eventTarget["emit"].apply(void 0, [messaging_port, message.eventName].concat(_toConsumableArray(message.args)));
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
  });
}

var nativePort = runtime.connect({
  name: portName
});
var messaging_port = new eventTarget["EventTarget"]();
messaging_port.name = portName;

messaging_port.emit = function (eventName) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  nativePort.postMessage({
    eventName: eventName,
    args: args
  });
};

messaging_port.disconnect = function () {
  nativePort.disconnect();
};

nativePort.onMessage.addListener(function (message) {
  if (messageQueue) messageQueue.push(message);else eventTarget["emit"].apply(void 0, [messaging_port, message.eventName].concat(_toConsumableArray(message.args)));
});
// CONCATENATED MODULE: ./ui/proxy.js
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


var errorHandlers = new Map();
var currentHandlers = new Map();
var maxMessageId = 0;

function sendMessage(message) {
  return new Promise(function (resolve, reject) {
    var messageId = message.messageId = messaging_port.name + ++maxMessageId;
    messaging_port.once("_proxyResponse-" + messageId, function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          error = _ref2[0],
          result = _ref2[1];

      if (error) {
        var handler = errorHandlers.get(error);

        if (handler) {
          var promise = currentHandlers.get(error);

          if (!promise) {
            promise = handler(error, message).then(function () {
              currentHandlers["delete"](error);
            })["catch"](function (e) {
              currentHandlers["delete"](error);
              throw e;
            });
            currentHandlers.set(error, promise);
          } // Have the handler deal with the error and retry.


          promise.then(function () {
            return sendMessage(message);
          }).then(resolve, reject);
        } else reject(error);
      } else resolve(result);
    });
    messaging_port.emit("_proxy", message);
  });
}

function Proxy(moduleName, methods) {
  var proxy = {};

  var _loop = function _loop(i) {
    var method = methods[i];

    proxy[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return sendMessage({
        moduleName: moduleName,
        method: method,
        args: args
      });
    };
  };

  for (var i = 0; i < methods.length; i++) {
    _loop(i);
  }

  return proxy;
}

function setErrorHandler(error, handler) {
  errorHandlers.set(error, handler);
}
var passwords = Proxy("passwords", ["exportPasswordData", "importPasswordData", "getPasswords", "addAlias", "removeAlias", "addGenerated", "addStored", "removePassword", "getPassword", "setNotes", "getAllPasswords", "getAllSites", "isMigrating"]);
var masterPassword = Proxy("masterPassword", ["changePassword", "checkPassword", "forgetPassword"]);
var passwordRetrieval = Proxy("passwordRetrieval", ["fillIn", "copyToClipboard"]);
var prefs = Proxy("prefs", ["get", "set"]);
var recoveryCodes = Proxy("recoveryCodes", ["getValidChars", "getCode", "formatCode", "isValid", "decodeCode"]);
var sync = Proxy("sync", ["authorize", "getManualAuthURL", "manualAuthorization", "disable", "sync"]);
var ui = Proxy("ui", ["showAllPasswords", "getLink", "openLink"]);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/components/ExternalLink.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var ExternalLinkvue_type_script_lang_js_ = ({
  name: "ExternalLink",
  props: {
    type: {
      type: String,
      required: true
    },
    param: {
      type: String,
      required: true
    }
  },
  data: function data() {
    return {
      url: "#"
    };
  },
  mounted: function mounted() {
    var _this = this;

    ui.getLink({
      type: this.type,
      param: this.param
    }).then(function (url) {
      return _this.url = url;
    })["catch"](this.$app.showUnknownError);
  },
  methods: {
    click: function click() {
      ui.openLink({
        type: this.type,
        param: this.param
      })["catch"](this.$app.showUnknownError);
    }
  }
});
// CONCATENATED MODULE: ./ui/components/ExternalLink.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ExternalLinkvue_type_script_lang_js_ = (ExternalLinkvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./ui/components/ExternalLink.vue





/* normalize component */

var component = normalizeComponent(
  components_ExternalLinkvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "ui/components/ExternalLink.vue"
/* harmony default export */ var ExternalLink = (component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/components/ModalOverlay.vue?vue&type=template&id=f8d9e722&
var ModalOverlayvue_type_template_id_f8d9e722_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "modalOverlay",
      on: {
        click: function($event) {
          if ($event.target !== $event.currentTarget) {
            return null
          }
          return _vm.$emit("cancel")
        },
        keydown: function($event) {
          $event.stopPropagation()
        }
      }
    },
    [
      _c(
        "div",
        {
          ref: "inner",
          staticClass: "modalOverlay-inner",
          class: { stretch: _vm.stretch, cancelable: _vm.cancelable }
        },
        [
          _vm.cancelable
            ? _c("div", { staticClass: "modalOverlay-cancel-container" }, [
                _c("a", {
                  directives: [{ name: "cancel", rawName: "v-cancel" }],
                  ref: "cancel",
                  staticClass: "cancel",
                  attrs: { href: "#", title: _vm.$t("cancel") },
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      return _vm.$emit("cancel")
                    }
                  }
                })
              ])
            : _vm._e(),
          _c("div", [_vm._t("default")], 2)
        ]
      )
    ]
  )
}
var ModalOverlayvue_type_template_id_f8d9e722_staticRenderFns = []
ModalOverlayvue_type_template_id_f8d9e722_render._withStripped = true


// CONCATENATED MODULE: ./ui/components/ModalOverlay.vue?vue&type=template&id=f8d9e722&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/components/ModalOverlay.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// Account for new modal opening before the old one finished destroying.
var activeModal = null;
/* harmony default export */ var ModalOverlayvue_type_script_lang_js_ = ({
  name: "ModalOverlay",
  props: {
    cancelable: {
      type: Boolean,
      "default": true
    },
    focusCancel: {
      type: Boolean,
      "default": false
    },
    stretch: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      savedActiveElement: null
    };
  },
  beforeMount: function beforeMount() {
    if (activeModal) this.savedActiveElement = activeModal.savedActiveElement;else this.savedActiveElement = document.activeElement;
    activeModal = this;
  },
  mounted: function mounted() {
    this.ensureDocHeight();
  },
  updated: function updated() {
    this.ensureDocHeight();
  },
  beforeDestroy: function beforeDestroy() {
    if (activeModal == this) {
      document.body.style.minHeight = "";
      if (this.savedActiveElement) this.savedActiveElement.focus();
      activeModal = null;
    }
  },
  methods: {
    ensureDocHeight: function ensureDocHeight() {
      // TODO: This is quite hacky, is there a more straightforward way?
      var style = window.getComputedStyle(this.$el, "");
      var height = this.$refs.inner.offsetHeight + parseInt(style.paddingTop) + parseInt(style.paddingBottom);
      document.body.style.minHeight = height + "px";
      if (this.focusCancel) this.$refs.cancel.focus();
    }
  }
});
// CONCATENATED MODULE: ./ui/components/ModalOverlay.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ModalOverlayvue_type_script_lang_js_ = (ModalOverlayvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/components/ModalOverlay.vue





/* normalize component */

var ModalOverlay_component = normalizeComponent(
  components_ModalOverlayvue_type_script_lang_js_,
  ModalOverlayvue_type_template_id_f8d9e722_render,
  ModalOverlayvue_type_template_id_f8d9e722_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var ModalOverlay_api; }
ModalOverlay_component.options.__file = "ui/components/ModalOverlay.vue"
/* harmony default export */ var ModalOverlay = (ModalOverlay_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/components/ValidatedForm.vue?vue&type=template&id=e3f704d4&
var ValidatedFormvue_type_template_id_e3f704d4_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "form",
    {
      on: {
        submit: function($event) {
          $event.preventDefault()
          return _vm.submit($event)
        }
      }
    },
    [_vm._t("default")],
    2
  )
}
var ValidatedFormvue_type_template_id_e3f704d4_staticRenderFns = []
ValidatedFormvue_type_template_id_e3f704d4_render._withStripped = true


// CONCATENATED MODULE: ./ui/components/ValidatedForm.vue?vue&type=template&id=e3f704d4&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/components/ValidatedForm.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var ValidatedFormvue_type_script_lang_js_ = ({
  name: "ValidatedForm",
  methods: {
    forValidatedChildren: function forValidatedChildren(callback, vm) {
      if (!vm) vm = this;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = vm.$children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var child = _step.value;
          if (child.$options.name == "ValidatedInput") callback(child);else this.forValidatedChildren(callback, child);
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
    },
    submit: function submit() {
      var seenErrors = false;
      this.forValidatedChildren(function (child) {
        child.eagerValidation = true;
        var error = child.update(true).error;

        if (error && !seenErrors) {
          seenErrors = true;
          child.$el.focus();
        }
      });
      if (!seenErrors) this.$emit("validated");
    }
  }
});
// CONCATENATED MODULE: ./ui/components/ValidatedForm.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ValidatedFormvue_type_script_lang_js_ = (ValidatedFormvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/components/ValidatedForm.vue





/* normalize component */

var ValidatedForm_component = normalizeComponent(
  components_ValidatedFormvue_type_script_lang_js_,
  ValidatedFormvue_type_template_id_e3f704d4_render,
  ValidatedFormvue_type_template_id_e3f704d4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var ValidatedForm_api; }
ValidatedForm_component.options.__file = "ui/components/ValidatedForm.vue"
/* harmony default export */ var ValidatedForm = (ValidatedForm_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/components/ValidatedInput.vue?vue&type=template&id=2f0b5c68&
var ValidatedInputvue_type_template_id_2f0b5c68_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("input", {
    domProps: { value: _vm.value.value },
    on: { input: _vm.update, change: _vm.update }
  })
}
var ValidatedInputvue_type_template_id_2f0b5c68_staticRenderFns = []
ValidatedInputvue_type_template_id_2f0b5c68_render._withStripped = true


// CONCATENATED MODULE: ./ui/components/ValidatedInput.vue?vue&type=template&id=2f0b5c68&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/components/ValidatedInput.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var ValidatedInputvue_type_script_lang_js_ = ({
  name: "ValidatedInput",
  props: {
    "value": {
      type: Object,
      required: true,
      validator: function validator(val) {
        return typeof val.value == "string";
      }
    }
  },
  data: function data() {
    return {
      eagerValidation: false
    };
  },
  methods: {
    setValue: function setValue(value) {
      this.$el.value = value;
      this.update();
    },
    update: function update(forced) {
      var value = this.$el.value.trim();
      if (forced !== true && value == this.value.value) return null;
      var newData = {
        value: value,
        error: this.value.error
      };

      if (this.eagerValidation) {
        newData.error = null;
        this.$emit("validate", newData);
      }

      this.$emit("input", newData);
      return newData;
    }
  }
});
// CONCATENATED MODULE: ./ui/components/ValidatedInput.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ValidatedInputvue_type_script_lang_js_ = (ValidatedInputvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/components/ValidatedInput.vue





/* normalize component */

var ValidatedInput_component = normalizeComponent(
  components_ValidatedInputvue_type_script_lang_js_,
  ValidatedInputvue_type_template_id_2f0b5c68_render,
  ValidatedInputvue_type_template_id_2f0b5c68_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var ValidatedInput_api; }
ValidatedInput_component.options.__file = "ui/components/ValidatedInput.vue"
/* harmony default export */ var ValidatedInput = (ValidatedInput_component.exports);
// CONCATENATED MODULE: ./ui/vue.js
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */










if (!("isConnected" in Node.prototype)) {
  // Edge and Firefox <53 don't have Node.isConnected
  Object.defineProperty(Node.prototype, "isConnected", {
    get: function get() {
      return document.contains(this);
    }
  });
}

external_Vue_default.a.use(ui_i18n);
external_Vue_default.a.component("external-link", ExternalLink);
external_Vue_default.a.component("modal-overlay", ModalOverlay);
external_Vue_default.a.component("validated-form", ValidatedForm);
external_Vue_default.a.component("validated-input", ValidatedInput);
external_Vue_default.a.directive("focus", {
  inserted: function inserted(element, binding) {
    if (typeof binding.value == "undefined" || binding.value) element.focus();
  }
});
external_Vue_default.a.directive("cancel", {
  inserted: function inserted(element, binding, vnode) {
    vnode.context.$el.addEventListener("keydown", function (event) {
      if (event.defaultPrevented || event.key != "Escape" || event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
        return;
      }

      if (!element.isConnected) return;
      event.preventDefault();
      element.click();
    });
  }
});
external_Vue_default.a.directive("select", {
  inserted: function inserted(element) {
    element.select();
  }
});
external_Vue_default.a.directive("scroll-active", {
  update: function update(element) {
    if (element.classList.contains("active")) element.scrollIntoView({
      block: "nearest"
    });
  }
});
external_Vue_default.a.directive("keyboard-navigation", {
  inserted: function inserted(element, binding) {
    element.addEventListener("keydown", function (event) {
      if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) return;
      var type = keyboardNavigationType(event);
      if (!type) return;
      var current = document.activeElement;
      var elements = document.getElementsByClassName(binding.expression);
      var index = [].indexOf.call(elements, current);
      if (index < 0) return;
      event.preventDefault();
      if (type.startsWith("back") && index - 1 >= 0) elements[index - 1].focus();else if (type.startsWith("forward") && index + 1 < elements.length) elements[index + 1].focus();else if (type.startsWith("start")) elements[0].focus();else if (type.startsWith("end")) elements[elements.length - 1].focus();
    });
  }
});
external_Vue_default.a.mixin({
  beforeCreate: function beforeCreate() {
    if (this.$options.name == "App") this.$app = this;else if (this.$parent) this.$app = this.$parent.$app;
  }
});
function runApp(App) {
  var isWebClient = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  external_Vue_default.a.prototype.$isWebClient = isWebClient;

  function init() {
    window.removeEventListener("load", init);
    new external_Vue_default.a({
      el: "#app",
      render: function render(createElement) {
        return createElement(App);
      }
    });
  }

  window.addEventListener("load", init);
}
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./web/App.vue?vue&type=template&id=19c0bea8&
var Appvue_type_template_id_19c0bea8_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      !_vm.browserSupported
        ? _c("div", { staticClass: "warning" }, [
            _vm._v(_vm._s(_vm.$t("web_compat_message")))
          ])
        : _vm._e(),
      _vm.currentPage == "panel"
        ? [
            _c("link", {
              attrs: { rel: "stylesheet", href: "panel/panel.css" }
            }),
            _c("panel-app")
          ]
        : _vm._e(),
      _vm.currentPage == "allpasswords"
        ? [
            _c("link", {
              attrs: {
                rel: "stylesheet",
                href: "allpasswords/allpasswords.css"
              }
            }),
            _c("allpasswords-app")
          ]
        : _vm._e()
    ],
    2
  )
}
var Appvue_type_template_id_19c0bea8_staticRenderFns = []
Appvue_type_template_id_19c0bea8_render._withStripped = true


// CONCATENATED MODULE: ./web/App.vue?vue&type=template&id=19c0bea8&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/App.vue?vue&type=template&id=4ab8aec9&
var Appvue_type_template_id_4ab8aec9_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      on: {
        keydown: [
          function($event) {
            if (!$event.type.indexOf("key") && $event.keyCode !== 69) {
              return null
            }
            if (!$event.ctrlKey) {
              return null
            }
            $event.preventDefault()
            return _vm.testUnknownError($event)
          },
          function($event) {
            if (!$event.ctrlKey) {
              return null
            }
            if ($event.shiftKey || $event.altKey || $event.metaKey) {
              return null
            }
            return _vm.tabNavigation($event)
          },
          function($event) {
            if (!$event.metaKey) {
              return null
            }
            if ($event.ctrlKey || $event.shiftKey || $event.altKey) {
              return null
            }
            return _vm.tabNavigation($event)
          }
        ]
      }
    },
    [
      _c("confirm", { ref: "confirm" }),
      _vm.unknownError
        ? _c("unknown-error", {
            attrs: { error: _vm.unknownError },
            on: {
              close: function($event) {
                _vm.unknownError = null
              }
            }
          })
        : _vm._e(),
      _vm.masterPasswordState == "unset" ||
      (_vm.masterPasswordState == "set" && _vm.resettingMaster)
        ? _c("change-master")
        : _vm.masterPasswordState == "set"
        ? _c("enter-master")
        : _vm.masterPasswordState == "migrating"
        ? _c("migration")
        : _vm.masterPasswordState == "known"
        ? _c(
            "div",
            { staticClass: "tabs" },
            [
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "keyboard-navigation",
                      rawName: "v-keyboard-navigation",
                      value: _vm.tab,
                      expression: "tab"
                    }
                  ],
                  staticClass: "tablist"
                },
                [
                  _c("div"),
                  _c("a", {
                    staticClass: "tab select-site",
                    class: { active: _vm.currentPage == "select-site" },
                    attrs: { href: "#", title: _vm.$t("select_site_label") },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        _vm.currentPage = "select-site"
                      }
                    }
                  }),
                  _c("a", {
                    staticClass: "tab password-list",
                    class: { active: _vm.currentPage == "password-list" },
                    attrs: { href: "#", title: _vm.$t("password_list") },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        _vm.currentPage = "password-list"
                      }
                    }
                  }),
                  _c("a", {
                    staticClass: "tab sync",
                    class: {
                      active: _vm.currentPage == "sync",
                      failed:
                        _vm.$app.sync.error &&
                        _vm.$app.sync.error != "sync_connection_error"
                    },
                    attrs: {
                      href: "#",
                      title: _vm.$t(
                        _vm.$app.sync.provider ? "sync_state" : "sync_setup"
                      )
                    },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        _vm.currentPage = "sync"
                      }
                    }
                  }),
                  _c("a", {
                    staticClass: "tab settings",
                    class: { active: _vm.currentPage == "settings" },
                    attrs: { href: "#", title: _vm.$t("settings") },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        _vm.currentPage = "settings"
                      }
                    }
                  }),
                  _c("div", { staticClass: "spacer" }),
                  _c("a", {
                    directives: [{ name: "cancel", rawName: "v-cancel" }],
                    staticClass: "tab lock",
                    attrs: { href: "#", title: _vm.$t("lock_passwords") },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        return _vm.lockPasswords($event)
                      }
                    }
                  })
                ]
              ),
              _vm.currentPage == "select-site"
                ? _c("select-site", {
                    on: {
                      selected: function($event) {
                        _vm.currentPage = "password-list"
                      }
                    }
                  })
                : _vm._e(),
              _vm.currentPage == "password-list"
                ? _c("password-list")
                : _vm.currentPage == "sync"
                ? _c("sync")
                : _vm.currentPage == "settings"
                ? _c("settings")
                : _vm._e()
            ],
            1
          )
        : _vm._e()
    ],
    1
  )
}
var Appvue_type_template_id_4ab8aec9_staticRenderFns = []
Appvue_type_template_id_4ab8aec9_render._withStripped = true


// CONCATENATED MODULE: ./ui/panel/App.vue?vue&type=template&id=4ab8aec9&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/pages/EnterMaster.vue?vue&type=template&id=2fabdb37&
var EnterMastervue_type_template_id_2fabdb37_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "validated-form",
    { staticClass: "page", on: { validated: _vm.submit } },
    [
      _c("label", { attrs: { for: "master-password" } }, [
        _vm._v(_vm._s(_vm.$t("master_password")))
      ]),
      _c("validated-input", {
        directives: [{ name: "focus", rawName: "v-focus" }],
        attrs: { id: "master-password", type: "password" },
        on: { validate: _vm.validateMasterPassword },
        model: {
          value: _vm.masterPassword,
          callback: function($$v) {
            _vm.masterPassword = $$v
          },
          expression: "masterPassword"
        }
      }),
      _vm.masterPassword.error
        ? _c("div", { staticClass: "error" }, [
            _vm._v(" " + _vm._s(_vm.masterPassword.error) + " ")
          ])
        : _vm._e(),
      _c("div", { staticClass: "button-container" }, [
        _c("button", [_vm._v(_vm._s(_vm.$t("enter_master_submit")))])
      ]),
      _c("div", { staticClass: "link-container" }, [
        _c(
          "a",
          {
            attrs: { href: "#" },
            on: {
              click: function($event) {
                $event.preventDefault()
                _vm.$app.resettingMaster = true
              }
            }
          },
          [_vm._v(" " + _vm._s(_vm.$t("reset_master_link")) + " ")]
        )
      ])
    ],
    1
  )
}
var EnterMastervue_type_template_id_2fabdb37_staticRenderFns = []
EnterMastervue_type_template_id_2fabdb37_render._withStripped = true


// CONCATENATED MODULE: ./ui/panel/pages/EnterMaster.vue?vue&type=template&id=2fabdb37&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/pages/EnterMaster.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


function EnterMastervue_type_script_lang_js_slicedToArray(arr, i) { return EnterMastervue_type_script_lang_js_arrayWithHoles(arr) || EnterMastervue_type_script_lang_js_iterableToArrayLimit(arr, i) || EnterMastervue_type_script_lang_js_nonIterableRest(); }

function EnterMastervue_type_script_lang_js_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function EnterMastervue_type_script_lang_js_iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function EnterMastervue_type_script_lang_js_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



/* harmony default export */ var EnterMastervue_type_script_lang_js_ = ({
  name: "EnterMaster",
  data: function data() {
    return {
      masterPassword: {
        value: ""
      }
    };
  },
  methods: {
    submit: function submit() {
      var _this = this;

      masterPassword.checkPassword(this.masterPassword.value).then(function () {
        return passwords.getPasswords(_this.$app.origSite);
      }).then(function (_ref) {
        var _ref2 = EnterMastervue_type_script_lang_js_slicedToArray(_ref, 3),
            origSite = _ref2[0],
            site = _ref2[1],
            pwdList = _ref2[2];

        _this.$app.origSite = origSite;
        _this.$app.site = site;
        _this.$app.pwdList = pwdList;
        _this.$app.masterPasswordState = "known";
      })["catch"](function (error) {
        if (error == "declined") _this.masterPassword.error = _this.$t("password_declined");else if (error == "migrating") _this.$app.masterPasswordState = "migrating";else _this.$app.showUnknownError(error);
      });
    },
    validateMasterPassword: validateMasterPassword
  }
});
// CONCATENATED MODULE: ./ui/panel/pages/EnterMaster.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_EnterMastervue_type_script_lang_js_ = (EnterMastervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/panel/pages/EnterMaster.vue





/* normalize component */

var EnterMaster_component = normalizeComponent(
  pages_EnterMastervue_type_script_lang_js_,
  EnterMastervue_type_template_id_2fabdb37_render,
  EnterMastervue_type_template_id_2fabdb37_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var EnterMaster_api; }
EnterMaster_component.options.__file = "ui/panel/pages/EnterMaster.vue"
/* harmony default export */ var EnterMaster = (EnterMaster_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/pages/ChangeMaster.vue?vue&type=template&id=43f96e25&
var ChangeMastervue_type_template_id_43f96e25_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "validated-form",
    {
      staticClass: "page",
      on: { validated: _vm.submit },
      nativeOn: {
        reset: function($event) {
          $event.preventDefault()
          _vm.hasPassword && (_vm.$app.resettingMaster = false)
        }
      }
    },
    [
      _c(
        "div",
        [
          !_vm.hasPassword
            ? [_vm._v(" " + _vm._s(_vm.$t("new_master_message")) + " ")]
            : _c("div", { staticClass: "warning" }, [
                _vm._v(" " + _vm._s(_vm.$t("reset_master_message")) + " ")
              ]),
          _vm._v(" " + _vm._s(_vm.$t("master_security_message")) + " "),
          _c(
            "external-link",
            {
              attrs: {
                type: "documentation",
                param: "choosing-master-password"
              }
            },
            [_vm._v(" " + _vm._s(_vm.$t("learn_more")) + " ")]
          )
        ],
        2
      ),
      _c(
        "label",
        { staticClass: "block-start", attrs: { for: "new-master" } },
        [_vm._v(_vm._s(_vm.$t("new_master")))]
      ),
      _c("validated-input", {
        directives: [{ name: "focus", rawName: "v-focus" }],
        attrs: { id: "new-master", type: "password" },
        on: { validate: _vm.validateMasterPassword },
        model: {
          value: _vm.newMaster,
          callback: function($$v) {
            _vm.newMaster = $$v
          },
          expression: "newMaster"
        }
      }),
      _vm.newMaster.error
        ? _c("div", { staticClass: "error" }, [
            _vm._v(" " + _vm._s(_vm.newMaster.error) + " ")
          ])
        : _vm._e(),
      _c("password-score", {
        ref: "passwordScore",
        attrs: { password: _vm.newMaster.value }
      }),
      _c(
        "label",
        { staticClass: "block-start", attrs: { for: "new-master-repeat" } },
        [_vm._v(_vm._s(_vm.$t("new_master_repeat")))]
      ),
      _c("validated-input", {
        attrs: { id: "new-master-repeat", type: "password" },
        on: { validate: _vm.validateMasterPasswordRepeat },
        model: {
          value: _vm.newMasterRepeat,
          callback: function($$v) {
            _vm.newMasterRepeat = $$v
          },
          expression: "newMasterRepeat"
        }
      }),
      _vm.newMasterRepeat.error
        ? _c("div", { staticClass: "error" }, [
            _vm._v(" " + _vm._s(_vm.newMasterRepeat.error) + " ")
          ])
        : _vm._e(),
      _c("div", { staticClass: "button-container" }, [
        _c("button", { attrs: { type: "submit" } }, [
          _vm._v(_vm._s(_vm.$t("change_master_submit")))
        ]),
        _vm.hasPassword
          ? _c(
              "button",
              {
                directives: [{ name: "cancel", rawName: "v-cancel" }],
                attrs: { type: "reset" }
              },
              [_vm._v(_vm._s(_vm.$t("cancel")))]
            )
          : _vm._e()
      ])
    ],
    1
  )
}
var ChangeMastervue_type_template_id_43f96e25_staticRenderFns = []
ChangeMastervue_type_template_id_43f96e25_render._withStripped = true


// CONCATENATED MODULE: ./ui/panel/pages/ChangeMaster.vue?vue&type=template&id=43f96e25&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/components/PasswordScore.vue?vue&type=template&id=7a83d774&
var PasswordScorevue_type_template_id_7a83d774_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "password-score", attrs: { "data-score": _vm.value } },
    [
      _c("div", { staticClass: "password-score-0" }),
      _c("div", { staticClass: "password-score-1" }),
      _c("div", { staticClass: "password-score-2" }),
      _c("div", { staticClass: "password-score-3" }),
      _c("div", { staticClass: "password-score-4" })
    ]
  )
}
var PasswordScorevue_type_template_id_7a83d774_staticRenderFns = []
PasswordScorevue_type_template_id_7a83d774_render._withStripped = true


// CONCATENATED MODULE: ./ui/panel/components/PasswordScore.vue?vue&type=template&id=7a83d774&

// EXTERNAL MODULE: external "zxcvbn"
var external_zxcvbn_ = __webpack_require__(2);
var external_zxcvbn_default = /*#__PURE__*/__webpack_require__.n(external_zxcvbn_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/components/PasswordScore.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var PasswordScorevue_type_script_lang_js_ = ({
  name: "PasswordScore",
  props: {
    password: {
      type: String,
      required: true
    }
  },
  data: function data() {
    return {
      value: 0
    };
  },
  watch: {
    password: function password() {
      this.value = external_zxcvbn_default()(this.password).score;
    }
  }
});
// CONCATENATED MODULE: ./ui/panel/components/PasswordScore.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_PasswordScorevue_type_script_lang_js_ = (PasswordScorevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/panel/components/PasswordScore.vue





/* normalize component */

var PasswordScore_component = normalizeComponent(
  components_PasswordScorevue_type_script_lang_js_,
  PasswordScorevue_type_template_id_7a83d774_render,
  PasswordScorevue_type_template_id_7a83d774_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var PasswordScore_api; }
PasswordScore_component.options.__file = "ui/panel/components/PasswordScore.vue"
/* harmony default export */ var PasswordScore = (PasswordScore_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/pages/ChangeMaster.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


function ChangeMastervue_type_script_lang_js_slicedToArray(arr, i) { return ChangeMastervue_type_script_lang_js_arrayWithHoles(arr) || ChangeMastervue_type_script_lang_js_iterableToArrayLimit(arr, i) || ChangeMastervue_type_script_lang_js_nonIterableRest(); }

function ChangeMastervue_type_script_lang_js_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function ChangeMastervue_type_script_lang_js_iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function ChangeMastervue_type_script_lang_js_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




/* harmony default export */ var ChangeMastervue_type_script_lang_js_ = ({
  name: "ChangeMaster",
  components: {
    "password-score": PasswordScore
  },
  data: function data() {
    return {
      newMaster: {
        value: ""
      },
      newMasterRepeat: {
        value: ""
      }
    };
  },
  computed: {
    hasPassword: function hasPassword() {
      return this.$app.masterPasswordState != "unset";
    }
  },
  methods: {
    submit: function submit() {
      var _this = this;

      var score = this.$refs.passwordScore.value;
      var ask = score < 3 ? this.$app.confirm(this.$t("weak_password")) : Promise.resolve(true);
      ask.then(function (accepted) {
        if (accepted) {
          masterPassword.changePassword(_this.newMaster.value).then(function () {
            return passwords.getPasswords(_this.$app.origSite);
          }).then(function (_ref) {
            var _ref2 = ChangeMastervue_type_script_lang_js_slicedToArray(_ref, 3),
                origSite = _ref2[0],
                site = _ref2[1],
                pwdList = _ref2[2];

            _this.$app.origSite = origSite;
            _this.$app.site = site;
            _this.$app.pwdList = pwdList;
            _this.$app.masterPasswordState = "known";
            _this.$app.resettingMaster = false;
          })["catch"](_this.$app.showUnknownError);
        }
      });
    },
    validateMasterPassword: validateMasterPassword,
    validateMasterPasswordRepeat: function validateMasterPasswordRepeat(newData) {
      if (newData.value != this.newMaster.value) newData.error = this.$t("passwords_differ");
    }
  }
});
// CONCATENATED MODULE: ./ui/panel/pages/ChangeMaster.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_ChangeMastervue_type_script_lang_js_ = (ChangeMastervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/panel/pages/ChangeMaster.vue





/* normalize component */

var ChangeMaster_component = normalizeComponent(
  pages_ChangeMastervue_type_script_lang_js_,
  ChangeMastervue_type_template_id_43f96e25_render,
  ChangeMastervue_type_template_id_43f96e25_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var ChangeMaster_api; }
ChangeMaster_component.options.__file = "ui/panel/pages/ChangeMaster.vue"
/* harmony default export */ var ChangeMaster = (ChangeMaster_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/pages/Migration.vue?vue&type=template&id=ebb4322a&
var Migrationvue_type_template_id_ebb4322a_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "migration page" }, [
    _c("h1", [_vm._v(_vm._s(_vm.$t("migration_title")))]),
    _vm.inProgress
      ? _c("div", { staticClass: "migration-in-progress" }, [
          _c("div", { staticClass: "migration-spinning-wheel" }),
          _c("div", [_vm._v(_vm._s(_vm.$t("migration_in_progress")))])
        ])
      : _vm._e(),
    _c("p", [_vm._v(_vm._s(_vm.$t("migration_intro")))]),
    _c("ul", [
      _c("li", [_vm._v(_vm._s(_vm.$t("migration_change1")))]),
      _c("li", [_vm._v(_vm._s(_vm.$t("migration_change2")))])
    ]),
    _c("p", [_vm._v(_vm._s(_vm.$t("migration_conclusion")))]),
    _c(
      "p",
      [
        _c("external-link", { attrs: { type: "relnotes", param: "2.2.0" } }, [
          _vm._v(" " + _vm._s(_vm.$t("learn_more")) + " ")
        ])
      ],
      1
    ),
    !_vm.inProgress
      ? _c("div", { staticClass: "button-container" }, [
          _c(
            "button",
            {
              directives: [{ name: "focus", rawName: "v-focus" }],
              on: { click: _vm.done }
            },
            [_vm._v(_vm._s(_vm.$t("migration_continue")))]
          )
        ])
      : _vm._e()
  ])
}
var Migrationvue_type_template_id_ebb4322a_staticRenderFns = []
Migrationvue_type_template_id_ebb4322a_render._withStripped = true


// CONCATENATED MODULE: ./ui/panel/pages/Migration.vue?vue&type=template&id=ebb4322a&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/pages/Migration.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


function Migrationvue_type_script_lang_js_slicedToArray(arr, i) { return Migrationvue_type_script_lang_js_arrayWithHoles(arr) || Migrationvue_type_script_lang_js_iterableToArrayLimit(arr, i) || Migrationvue_type_script_lang_js_nonIterableRest(); }

function Migrationvue_type_script_lang_js_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function Migrationvue_type_script_lang_js_iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function Migrationvue_type_script_lang_js_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


/* harmony default export */ var Migrationvue_type_script_lang_js_ = ({
  name: "Migration",
  data: function data() {
    return {
      inProgress: true,
      timeout: null
    };
  },
  mounted: function mounted() {
    this.timeout = window.setInterval(this.checkStatus, 100);
  },
  methods: {
    checkStatus: function checkStatus() {
      var _this = this;

      if (this.$app.masterPasswordState != "migrating") {
        this.migrated();
        return;
      }

      passwords.isMigrating().then(function (migrating) {
        if (!migrating) _this.migrated();
      })["catch"](this.$app.showUnknownError);
    },
    migrated: function migrated() {
      window.clearTimeout(this.timeout);
      this.timeout = null;
      this.inProgress = false;
    },
    done: function done() {
      var _this2 = this;

      passwords.getPasswords(this.$app.origSite).then(function (_ref) {
        var _ref2 = Migrationvue_type_script_lang_js_slicedToArray(_ref, 3),
            origSite = _ref2[0],
            site = _ref2[1],
            pwdList = _ref2[2];

        _this2.$app.origSite = origSite;
        _this2.$app.site = site;
        _this2.$app.pwdList = pwdList;
        _this2.$app.masterPasswordState = "known";
      })["catch"](this.$app.showUnknownError);
    }
  }
});
// CONCATENATED MODULE: ./ui/panel/pages/Migration.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_Migrationvue_type_script_lang_js_ = (Migrationvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/panel/pages/Migration.vue





/* normalize component */

var Migration_component = normalizeComponent(
  pages_Migrationvue_type_script_lang_js_,
  Migrationvue_type_template_id_ebb4322a_render,
  Migrationvue_type_template_id_ebb4322a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var Migration_api; }
Migration_component.options.__file = "ui/panel/pages/Migration.vue"
/* harmony default export */ var Migration = (Migration_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/pages/PasswordList.vue?vue&type=template&id=23cab64c&
var PasswordListvue_type_template_id_23cab64c_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "page" },
    [
      _c("label", { attrs: { for: "site" } }, [_vm._v(_vm._s(_vm.$t("site")))]),
      _vm.$app.site == _vm.$app.siteDisplayName
        ? _c(
            "external-link",
            {
              directives: [
                {
                  name: "focus",
                  rawName: "v-focus",
                  value: !_vm.$app.pwdList.length,
                  expression: "!$app.pwdList.length"
                }
              ],
              attrs: {
                id: "site",
                type: "url",
                param: "https://" + _vm.$app.site
              }
            },
            [_vm._v(" " + _vm._s(_vm.$app.siteDisplayName) + " ")]
          )
        : _c(
            "span",
            {
              directives: [
                {
                  name: "focus",
                  rawName: "v-focus",
                  value: !_vm.$app.pwdList.length,
                  expression: "!$app.pwdList.length"
                }
              ],
              staticClass: "special-site",
              attrs: { tabindex: "0" }
            },
            [_vm._v(" " + _vm._s(_vm.$app.siteDisplayName) + " ")]
          ),
      _vm.$app.origSite != _vm.$app.site
        ? _c("span", { staticClass: "alias-container" }, [
            _vm._v(
              " " + _vm._s(_vm.$t("alias_description", _vm.$app.origSite)) + " "
            ),
            _c(
              "a",
              {
                attrs: { href: "#" },
                on: {
                  click: function($event) {
                    $event.preventDefault()
                    return _vm.removeAlias($event)
                  }
                }
              },
              [_vm._v(" " + _vm._s(_vm.$t("remove_alias")) + " ")]
            )
          ])
        : _vm.$app.site &&
          _vm.$app.site != "pfp.invalid" &&
          !_vm.$app.pwdList.length
        ? _c(
            "a",
            {
              staticClass: "alias-container",
              attrs: { href: "#" },
              on: {
                click: function($event) {
                  $event.preventDefault()
                  return _vm.addAlias($event)
                }
              }
            },
            [_vm._v(" " + _vm._s(_vm.$t("add_alias")) + " ")]
          )
        : _vm._e(),
      _vm.modal == "site-selection"
        ? _c(
            "modal-overlay",
            {
              attrs: { stretch: true },
              on: {
                cancel: function($event) {
                  _vm.modal = null
                }
              }
            },
            [
              _c("site-selection", {
                attrs: {
                  message: _vm.$t("select_alias", _vm.$app.origSite),
                  callback: _vm.selectionCallback
                }
              })
            ],
            1
          )
        : _vm._e(),
      _c("password-message", {
        ref: "password-message",
        staticClass: "block-start",
        attrs: {
          messages: {
            password_ready_message: false,
            password_copied_message: true,
            username_copied_message: true,
            no_such_password: false,
            unknown_generation_method: false,
            wrong_site_message: false,
            no_password_fields: false
          }
        }
      }),
      _c("div", { staticClass: "block-start" }, [
        _vm._v(_vm._s(_vm.$t("passwords_label")))
      ]),
      !_vm.$app.pwdList.length
        ? _c("div", [_vm._v(_vm._s(_vm.$t("no_passwords_message")))])
        : _c(
            "div",
            {
              staticClass: "password-list-container",
              on: { keydown: _vm.keyboardNavigation }
            },
            _vm._l(_vm.$app.pwdList, function(password, index) {
              return _c("password-entry", {
                key: password.name + "\0" + password.revision,
                attrs: { password: password, focus: index == 0 }
              })
            }),
            1
          ),
      _vm.$app.site
        ? _c(
            "a",
            {
              staticClass: "add-password-link",
              attrs: { href: "#" },
              on: {
                click: function($event) {
                  $event.preventDefault()
                  _vm.modal = "generated"
                }
              }
            },
            [_vm._v(" " + _vm._s(_vm.$t("generate_password_link")) + " ")]
          )
        : _vm._e(),
      _vm.modal == "generated"
        ? _c("generated-password", {
            on: {
              cancel: function($event) {
                _vm.modal = null
              }
            }
          })
        : _vm._e(),
      _vm.$app.site
        ? _c(
            "a",
            {
              staticClass: "add-password-link",
              attrs: { href: "#" },
              on: {
                click: function($event) {
                  $event.preventDefault()
                  _vm.modal = "stored"
                }
              }
            },
            [_vm._v(" " + _vm._s(_vm.$t("stored_password_link")) + " ")]
          )
        : _vm._e(),
      _vm.modal == "stored"
        ? _c("stored-password", {
            on: {
              cancel: function($event) {
                _vm.modal = null
              }
            }
          })
        : _vm._e(),
      _c("div", { staticClass: "link-container" }, [
        _c(
          "a",
          {
            attrs: { href: "#" },
            on: {
              click: function($event) {
                $event.preventDefault()
                return _vm.showAll($event)
              }
            }
          },
          [_vm._v(" " + _vm._s(_vm.$t("show_all_passwords")) + " ")]
        )
      ])
    ],
    1
  )
}
var PasswordListvue_type_template_id_23cab64c_staticRenderFns = []
PasswordListvue_type_template_id_23cab64c_render._withStripped = true


// CONCATENATED MODULE: ./ui/panel/pages/PasswordList.vue?vue&type=template&id=23cab64c&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/components/PasswordMessage.vue?vue&type=template&id=449c9290&
var PasswordMessagevue_type_template_id_449c9290_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.messages.hasOwnProperty(_vm.message)
    ? _c("div", { class: _vm.success ? "success" : "warning" }, [
        _vm._v(_vm._s(_vm.$t(_vm.message)))
      ])
    : _vm._e()
}
var PasswordMessagevue_type_template_id_449c9290_staticRenderFns = []
PasswordMessagevue_type_template_id_449c9290_render._withStripped = true


// CONCATENATED MODULE: ./ui/components/PasswordMessage.vue?vue&type=template&id=449c9290&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/components/PasswordMessage.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//


var messageHideDelay = 3000;
/* harmony default export */ var PasswordMessagevue_type_script_lang_js_ = ({
  name: "PasswordMessage",
  props: {
    messages: {
      type: Object,
      required: true
    }
  },
  data: function data() {
    return {
      message: null,
      resetTimeout: null
    };
  },
  computed: {
    success: function success() {
      return this.messages[this.message];
    }
  },
  watch: {
    message: function message() {
      var _this = this;

      if (!this.message) return;

      if (this.messages.hasOwnProperty(this.message)) {
        if (this.resetTimeout) window.clearTimeout(this.resetTimeout);
        this.resetTimeout = window.setTimeout(function () {
          _this.resetTimeout = _this.message = null;
        }, messageHideDelay);
      } else this.$app.showUnknownError(this.message);
    }
  }
});
// CONCATENATED MODULE: ./ui/components/PasswordMessage.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_PasswordMessagevue_type_script_lang_js_ = (PasswordMessagevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/components/PasswordMessage.vue





/* normalize component */

var PasswordMessage_component = normalizeComponent(
  components_PasswordMessagevue_type_script_lang_js_,
  PasswordMessagevue_type_template_id_449c9290_render,
  PasswordMessagevue_type_template_id_449c9290_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var PasswordMessage_api; }
PasswordMessage_component.options.__file = "ui/components/PasswordMessage.vue"
/* harmony default export */ var PasswordMessage = (PasswordMessage_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/components/GeneratedPassword.vue?vue&type=template&id=8323884e&
var GeneratedPasswordvue_type_template_id_8323884e_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "modal-overlay",
    {
      attrs: { stretch: true },
      on: {
        cancel: function($event) {
          return _vm.$emit("cancel")
        }
      }
    },
    [
      _c(
        "validated-form",
        {
          staticClass: "modal-form",
          on: { validated: _vm.submit },
          nativeOn: {
            reset: function($event) {
              return _vm.$emit("cancel")
            }
          }
        },
        [
          _vm.options.replacing
            ? _c("div", { staticClass: "warning replacing" }, [
                _vm._v(_vm._s(_vm.$t("replace_password_warning")))
              ])
            : _vm._e(),
          _c(
            "label",
            {
              class: { "block-start": _vm.options.replacing },
              attrs: { for: "user-name" }
            },
            [_vm._v(_vm._s(_vm.$t("user_name")))]
          ),
          _c(
            "validated-input",
            _vm._b(
              {
                directives: [{ name: "focus", rawName: "v-focus" }],
                attrs: { id: "user-name", type: "text" },
                on: { validate: _vm.validateName },
                model: {
                  value: _vm.name,
                  callback: function($$v) {
                    _vm.name = typeof $$v === "string" ? $$v.trim() : $$v
                  },
                  expression: "name"
                }
              },
              "validated-input",
              { readonly: _vm.options.replacing },
              false
            )
          ),
          _vm.name.error
            ? _c("div", { staticClass: "error" }, [
                _vm._v(" " + _vm._s(_vm.name.error) + " ")
              ])
            : _vm._e(),
          !_vm.revisionVisible && !_vm.options.replacing
            ? _c(
                "a",
                {
                  staticClass: "change-password-revision",
                  attrs: { href: "#" },
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      _vm.revisionVisible = true
                    }
                  }
                },
                [_vm._v(" " + _vm._s(_vm.$t("change_password_revision")) + " ")]
              )
            : _vm.revisionVisible
            ? [
                _c(
                  "label",
                  {
                    staticClass: "block-start",
                    attrs: { for: "password-revision" }
                  },
                  [_vm._v(_vm._s(_vm.$t("password_revision")))]
                ),
                _c(
                  "input",
                  _vm._b(
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model.trim",
                          value: _vm.revision,
                          expression: "revision",
                          modifiers: { trim: true }
                        }
                      ],
                      ref: "revision",
                      attrs: { id: "password-revision", type: "text" },
                      domProps: { value: _vm.revision },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.revision = $event.target.value.trim()
                        },
                        blur: function($event) {
                          return _vm.$forceUpdate()
                        }
                      }
                    },
                    "input",
                    { readonly: _vm.options.replacing },
                    false
                  )
                )
              ]
            : _vm._e(),
          _vm.password && _vm.password.notes
            ? _c("label", { staticClass: "block-start" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.keepNotes,
                      expression: "keepNotes"
                    }
                  ],
                  attrs: { type: "checkbox" },
                  domProps: {
                    checked: Array.isArray(_vm.keepNotes)
                      ? _vm._i(_vm.keepNotes, null) > -1
                      : _vm.keepNotes
                  },
                  on: {
                    change: function($event) {
                      var $$a = _vm.keepNotes,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 && (_vm.keepNotes = $$a.concat([$$v]))
                        } else {
                          $$i > -1 &&
                            (_vm.keepNotes = $$a
                              .slice(0, $$i)
                              .concat($$a.slice($$i + 1)))
                        }
                      } else {
                        _vm.keepNotes = $$c
                      }
                    }
                  }
                }),
                _vm._v(" " + _vm._s(_vm.$t("keep_notes")) + " ")
              ])
            : _vm._e(),
          _c(
            "label",
            { staticClass: "block-start", attrs: { for: "password-length" } },
            [_vm._v(_vm._s(_vm.$t("password_length")))]
          ),
          _c("div", { staticClass: "length-container" }, [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model.number",
                  value: _vm.length,
                  expression: "length",
                  modifiers: { number: true }
                }
              ],
              attrs: {
                id: "password-length",
                type: "range",
                min: "4",
                max: "24",
                step: "1"
              },
              domProps: { value: _vm.length },
              on: {
                __r: function($event) {
                  _vm.length = _vm._n($event.target.value)
                },
                blur: function($event) {
                  return _vm.$forceUpdate()
                }
              }
            }),
            _c("span", { staticClass: "password-length-value" }, [
              _vm._v(_vm._s(_vm.length))
            ])
          ]),
          _c(
            "label",
            { staticClass: "block-start", attrs: { for: "charset-lower" } },
            [_vm._v(_vm._s(_vm.$t("allowed_characters")))]
          ),
          _c("div", { staticClass: "charsets-container" }, [
            _c("label", [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.lower,
                    expression: "lower"
                  }
                ],
                attrs: { id: "charset-lower", type: "checkbox" },
                domProps: {
                  checked: Array.isArray(_vm.lower)
                    ? _vm._i(_vm.lower, null) > -1
                    : _vm.lower
                },
                on: {
                  change: function($event) {
                    var $$a = _vm.lower,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 && (_vm.lower = $$a.concat([$$v]))
                      } else {
                        $$i > -1 &&
                          (_vm.lower = $$a
                            .slice(0, $$i)
                            .concat($$a.slice($$i + 1)))
                      }
                    } else {
                      _vm.lower = $$c
                    }
                  }
                }
              }),
              _vm._v("abc")
            ]),
            _c("label", [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.upper,
                    expression: "upper"
                  }
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(_vm.upper)
                    ? _vm._i(_vm.upper, null) > -1
                    : _vm.upper
                },
                on: {
                  change: function($event) {
                    var $$a = _vm.upper,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 && (_vm.upper = $$a.concat([$$v]))
                      } else {
                        $$i > -1 &&
                          (_vm.upper = $$a
                            .slice(0, $$i)
                            .concat($$a.slice($$i + 1)))
                      }
                    } else {
                      _vm.upper = $$c
                    }
                  }
                }
              }),
              _vm._v("XYZ")
            ]),
            _c("label", [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.number,
                    expression: "number"
                  }
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(_vm.number)
                    ? _vm._i(_vm.number, null) > -1
                    : _vm.number
                },
                on: {
                  change: function($event) {
                    var $$a = _vm.number,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 && (_vm.number = $$a.concat([$$v]))
                      } else {
                        $$i > -1 &&
                          (_vm.number = $$a
                            .slice(0, $$i)
                            .concat($$a.slice($$i + 1)))
                      }
                    } else {
                      _vm.number = $$c
                    }
                  }
                }
              }),
              _vm._v("789")
            ]),
            _c("label", [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.symbol,
                    expression: "symbol"
                  }
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(_vm.symbol)
                    ? _vm._i(_vm.symbol, null) > -1
                    : _vm.symbol
                },
                on: {
                  change: function($event) {
                    var $$a = _vm.symbol,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 && (_vm.symbol = $$a.concat([$$v]))
                      } else {
                        $$i > -1 &&
                          (_vm.symbol = $$a
                            .slice(0, $$i)
                            .concat($$a.slice($$i + 1)))
                      }
                    } else {
                      _vm.symbol = $$c
                    }
                  }
                }
              }),
              _vm._v("+^;")
            ])
          ]),
          _c("validated-input", {
            ref: "charsets",
            attrs: { hidden: "" },
            on: { validate: _vm.validateCharsets },
            model: {
              value: _vm.charsets,
              callback: function($$v) {
                _vm.charsets = $$v
              },
              expression: "charsets"
            }
          }),
          _vm.charsets.error
            ? _c("div", { staticClass: "error" }, [
                _vm._v(_vm._s(_vm.charsets.error))
              ])
            : _vm._e(),
          _c("div", { staticClass: "button-container" }, [
            _c("button", { attrs: { type: "submit" } }, [
              _vm._v(_vm._s(_vm.$t("generate_password")))
            ]),
            _c("button", { attrs: { type: "reset" } }, [
              _vm._v(_vm._s(_vm.$t("cancel")))
            ])
          ])
        ],
        2
      )
    ],
    1
  )
}
var GeneratedPasswordvue_type_template_id_8323884e_staticRenderFns = []
GeneratedPasswordvue_type_template_id_8323884e_render._withStripped = true


// CONCATENATED MODULE: ./ui/panel/components/GeneratedPassword.vue?vue&type=template&id=8323884e&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/components/GeneratedPassword.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var GeneratedPasswordvue_type_script_lang_js_ = ({
  name: "GeneratedPassword",
  props: {
    password: {
      type: Object,
      "default": null
    },
    options: {
      type: Object,
      "default": Object
    }
  },
  data: function data() {
    var _this = this;

    var getProp = function getProp(prop, defValue) {
      if (_this.password && prop in _this.password) return _this.password[prop];else return defValue;
    };

    var name = getProp("name", "");
    var revision = getProp("revision");

    if (this.options.incRevision) {
      var pwdList = this.$app.pwdList;
      revision = (parseInt(revision, 10) || 1) + 1;
      if (revision < 2) revision = 2;

      while (pwdList.some(function (pwd) {
        return pwd.name == name && pwd.revision == revision;
      })) {
        revision++;
      }
    }

    return {
      name: {
        value: name,
        error: null
      },
      revision: revision || "1",
      revisionVisible: !!revision,
      length: getProp("length", 16),
      lower: getProp("lower", true),
      upper: getProp("upper", true),
      number: getProp("number", true),
      symbol: getProp("symbol", true),
      charsets: {
        value: "",
        error: null
      },
      keepNotes: !!this.password
    };
  },
  watch: {
    revision: function revision() {
      if (this.name.error == this.$t("user_name_exists")) this.name.error = null;
    },
    revisionVisible: function revisionVisible() {
      var _this2 = this;

      if (this.revisionVisible) {
        this.$nextTick(function () {
          _this2.$refs.revision.focus();
        });
      }
    },
    lower: function lower() {
      this.updateCharsets();
    },
    upper: function upper() {
      this.updateCharsets();
    },
    number: function number() {
      this.updateCharsets();
    },
    symbol: function symbol() {
      this.updateCharsets();
    }
  },
  mounted: function mounted() {
    this.updateCharsets();
  },
  methods: {
    validateName: function validateName(newData) {
      if (!newData.value) newData.error = this.$t("user_name_required");
    },
    updateCharsets: function updateCharsets() {
      this.$refs.charsets.setValue([this.lower, this.upper, this.number, this.symbol].join(" "));
    },
    validateCharsets: function validateCharsets(newData) {
      if (newData.value.split(" ").every(function (c) {
        return c == "false";
      })) newData.error = this.$t("no_characters_selected");
    },
    submit: function submit() {
      var _this3 = this;

      var revision = this.revision != "1" ? this.revision : "";
      passwords.addGenerated({
        site: this.$app.site,
        name: this.name.value,
        revision: revision,
        length: this.length,
        lower: this.lower,
        upper: this.upper,
        number: this.number,
        symbol: this.symbol,
        notes: this.keepNotes ? this.password.notes : null
      }, this.options.replacing).then(function (pwdList) {
        _this3.$app.pwdList = pwdList;

        _this3.$emit("cancel");
      })["catch"](function (error) {
        if (error == "alreadyExists") {
          _this3.name.error = _this3.$t("user_name_exists");
          _this3.revisionVisible = true;
        } else _this3.$app.showUnknownError(error);
      });
    }
  }
});
// CONCATENATED MODULE: ./ui/panel/components/GeneratedPassword.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_GeneratedPasswordvue_type_script_lang_js_ = (GeneratedPasswordvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/panel/components/GeneratedPassword.vue





/* normalize component */

var GeneratedPassword_component = normalizeComponent(
  components_GeneratedPasswordvue_type_script_lang_js_,
  GeneratedPasswordvue_type_template_id_8323884e_render,
  GeneratedPasswordvue_type_template_id_8323884e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var GeneratedPassword_api; }
GeneratedPassword_component.options.__file = "ui/panel/components/GeneratedPassword.vue"
/* harmony default export */ var GeneratedPassword = (GeneratedPassword_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/components/PasswordEntry.vue?vue&type=template&id=2745ee26&
var PasswordEntryvue_type_template_id_2745ee26_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("div", { staticClass: "password-container" }, [
        _c("a", {
          staticClass: "password-menu-link iconic-link",
          class: { menuactive: _vm.modal == "menu" },
          attrs: { href: "#", title: _vm.$t("password_menu") },
          on: {
            click: function($event) {
              $event.preventDefault()
              _vm.modal = "menu"
            }
          }
        }),
        !_vm.$isWebClient
          ? _c("a", {
              directives: [
                {
                  name: "focus",
                  rawName: "v-focus",
                  value: _vm.focus,
                  expression: "focus"
                }
              ],
              staticClass: "to-document-link iconic-link",
              attrs: { href: "#", title: _vm.$t("to_document") },
              on: {
                click: function($event) {
                  $event.preventDefault()
                  return _vm.fillIn($event)
                }
              }
            })
          : _vm._e(),
        _c("a", {
          directives: [
            {
              name: "focus",
              rawName: "v-focus",
              value: _vm.$isWebClient && _vm.focus,
              expression: "$isWebClient && focus"
            }
          ],
          staticClass: "to-clipboard-link iconic-link",
          attrs: { href: "#", title: _vm.$t("to_clipboard") },
          on: {
            click: function($event) {
              $event.preventDefault()
              return _vm.copy($event)
            }
          }
        }),
        _c(
          "span",
          { staticClass: "user-name-container", attrs: { title: _vm.tooltip } },
          [
            _c("span", [_vm._v(_vm._s(_vm.password.name))]),
            _vm.password.revision
              ? _c("span", { staticClass: "password-revision" }, [
                  _vm._v(_vm._s(_vm.password.revision))
                ])
              : _vm._e()
          ]
        )
      ]),
      _vm.modal == "generated"
        ? _c("generated-password", {
            attrs: { password: _vm.password, options: _vm.passwordOptions },
            on: {
              cancel: function($event) {
                _vm.modal = null
              }
            }
          })
        : _vm._e(),
      _vm.modal == "menu"
        ? _c("password-menu", {
            attrs: { password: _vm.password },
            on: {
              cancel: function($event) {
                _vm.modal = null
              }
            }
          })
        : _vm._e(),
      _vm.modal == "qrcode"
        ? _c("qr-code", {
            attrs: { password: _vm.password, value: _vm.value },
            on: {
              cancel: function($event) {
                _vm.modal = null
              }
            }
          })
        : _vm._e(),
      _vm.modal == "notes"
        ? _c("notes-editor", {
            attrs: { password: _vm.password },
            on: {
              cancel: function($event) {
                _vm.modal = null
              }
            }
          })
        : _vm._e()
    ],
    1
  )
}
var PasswordEntryvue_type_template_id_2745ee26_staticRenderFns = []
PasswordEntryvue_type_template_id_2745ee26_render._withStripped = true


// CONCATENATED MODULE: ./ui/panel/components/PasswordEntry.vue?vue&type=template&id=2745ee26&

// CONCATENATED MODULE: ./ui/clipboard.js
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */


function set(data) {
  var prevActiveElement = document.activeElement;
  var dummy = document.createElement("textarea");
  dummy.style.position = "absolute";
  dummy.style.width = "0px";
  dummy.style.height = "0px";
  dummy.style.left = "-1000px";
  document.body.appendChild(dummy);
  dummy.value = data;
  dummy.select();
  document.execCommand("copy", false, null);
  document.body.removeChild(dummy);
  if (prevActiveElement) prevActiveElement.focus();
}
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/components/NotesEditor.vue?vue&type=template&id=6b7be546&
var NotesEditorvue_type_template_id_6b7be546_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "modal-overlay",
    {
      attrs: { stretch: true },
      on: {
        cancel: function($event) {
          return _vm.$emit("cancel")
        }
      }
    },
    [
      _c(
        "form",
        {
          staticClass: "modal-form",
          on: {
            submit: function($event) {
              $event.preventDefault()
              return _vm.saveNotes($event)
            },
            reset: function($event) {
              $event.preventDefault()
              return _vm.$emit("cancel")
            }
          }
        },
        [
          _c("label", [_vm._v(_vm._s(_vm.$t("user_name")))]),
          _c("div", [
            _vm._v(" " + _vm._s(_vm.password.name) + " "),
            _vm.password.revision
              ? _c("span", { staticClass: "password-revision" }, [
                  _vm._v(_vm._s(_vm.password.revision))
                ])
              : _vm._e()
          ]),
          _c(
            "label",
            { staticClass: "block-start", attrs: { for: "notes-textarea" } },
            [_vm._v(_vm._s(_vm.$t("password_notes")))]
          ),
          _c("textarea", {
            directives: [
              {
                name: "model",
                rawName: "v-model.trim",
                value: _vm.value,
                expression: "value",
                modifiers: { trim: true }
              },
              { name: "focus", rawName: "v-focus" }
            ],
            attrs: { id: "notes-textarea" },
            domProps: { value: _vm.value },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.value = $event.target.value.trim()
              },
              blur: function($event) {
                return _vm.$forceUpdate()
              }
            }
          }),
          _vm._v(" "),
          _c("div", { staticClass: "button-container" }, [
            _c("button", { attrs: { type: "submit" } }, [
              _vm._v(_vm._s(_vm.$t("save_notes")))
            ]),
            _c("button", { attrs: { type: "reset" } }, [
              _vm._v(_vm._s(_vm.$t("cancel")))
            ])
          ])
        ]
      )
    ]
  )
}
var NotesEditorvue_type_template_id_6b7be546_staticRenderFns = []
NotesEditorvue_type_template_id_6b7be546_render._withStripped = true


// CONCATENATED MODULE: ./ui/panel/components/NotesEditor.vue?vue&type=template&id=6b7be546&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/components/NotesEditor.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var NotesEditorvue_type_script_lang_js_ = ({
  props: {
    password: {
      type: Object,
      required: true
    }
  },
  data: function data() {
    return {
      value: this.password.notes || ""
    };
  },
  methods: {
    saveNotes: function saveNotes() {
      var _this = this;

      passwords.setNotes(this.password, this.value).then(function (pwdList) {
        _this.$app.pwdList = pwdList;

        _this.$emit("cancel");
      })["catch"](this.$app.showUnknownError);
    }
  }
});
// CONCATENATED MODULE: ./ui/panel/components/NotesEditor.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_NotesEditorvue_type_script_lang_js_ = (NotesEditorvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/panel/components/NotesEditor.vue





/* normalize component */

var NotesEditor_component = normalizeComponent(
  components_NotesEditorvue_type_script_lang_js_,
  NotesEditorvue_type_template_id_6b7be546_render,
  NotesEditorvue_type_template_id_6b7be546_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var NotesEditor_api; }
NotesEditor_component.options.__file = "ui/panel/components/NotesEditor.vue"
/* harmony default export */ var NotesEditor = (NotesEditor_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/components/QRCode.vue?vue&type=template&id=068b728f&
var QRCodevue_type_template_id_068b728f_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "modal-overlay",
    {
      attrs: { "focus-cancel": true },
      on: {
        cancel: function($event) {
          return _vm.$emit("cancel")
        }
      }
    },
    [
      _c("label", [_vm._v(_vm._s(_vm.$t("user_name")))]),
      _c("div", [
        _c("span", [_vm._v(_vm._s(_vm.password.name))]),
        _vm.password.revision
          ? _c("span", { staticClass: "password-revision" }, [
              _vm._v(_vm._s(_vm.password.revision))
            ])
          : _vm._e()
      ]),
      _c("div", { staticClass: "block-start qrcode-canvas-container" }, [
        _c("canvas", {
          ref: "canvas",
          attrs: { width: _vm.matrix.pixelWidth, height: _vm.matrix.pixelWidth }
        })
      ])
    ]
  )
}
var QRCodevue_type_template_id_068b728f_staticRenderFns = []
QRCodevue_type_template_id_068b728f_render._withStripped = true


// CONCATENATED MODULE: ./ui/panel/components/QRCode.vue?vue&type=template&id=068b728f&

// EXTERNAL MODULE: external "JSQR"
var external_JSQR_ = __webpack_require__(3);
var external_JSQR_default = /*#__PURE__*/__webpack_require__.n(external_JSQR_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/components/QRCode.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var QRCodevue_type_script_lang_js_ = ({
  name: "QRCode",
  props: {
    password: {
      type: Object,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  data: function data() {
    var qr = new external_JSQR_default.a();
    var code = new qr.Code();
    code.encodeMode = code.ENCODE_MODE.BYTE;
    code.version = code.DEFAULT;
    code.errorCorrection = code.ERROR_CORRECTION.M;
    var input = new qr.Input();
    input.dataType = input.DATA_TYPE.TEXT;
    input.data = this.value;
    var matrix = new qr.Matrix(input, code);
    matrix.margin = 0;
    matrix.scale = 8;
    return {
      matrix: matrix
    };
  },
  mounted: function mounted() {
    var canvas = this.$refs.canvas;
    var context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "black";
    this.matrix.draw(canvas, 0, 0);
  }
});
// CONCATENATED MODULE: ./ui/panel/components/QRCode.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_QRCodevue_type_script_lang_js_ = (QRCodevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/panel/components/QRCode.vue





/* normalize component */

var QRCode_component = normalizeComponent(
  components_QRCodevue_type_script_lang_js_,
  QRCodevue_type_template_id_068b728f_render,
  QRCodevue_type_template_id_068b728f_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var QRCode_api; }
QRCode_component.options.__file = "ui/panel/components/QRCode.vue"
/* harmony default export */ var QRCode = (QRCode_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/components/PasswordMenu.vue?vue&type=template&id=c7db5e4a&
var PasswordMenuvue_type_template_id_c7db5e4a_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "modal-overlay",
    {
      directives: [
        {
          name: "keyboard-navigation",
          rawName: "v-keyboard-navigation",
          value: _vm.password - _vm.menu - _vm.entry,
          expression: "password-menu-entry"
        }
      ],
      on: {
        cancel: function($event) {
          return _vm.$emit("cancel")
        }
      }
    },
    [
      !_vm.$isWebClient
        ? _c(
            "a",
            {
              directives: [{ name: "focus", rawName: "v-focus" }],
              staticClass: "password-menu-entry",
              attrs: { href: "#" },
              on: {
                click: function($event) {
                  $event.preventDefault()
                  return _vm.$parent.fillIn($event)
                }
              }
            },
            [
              _c("span", { staticClass: "to-document-link iconic-link" }),
              _vm._v(" " + _vm._s(_vm.$t("to_document")) + " ")
            ]
          )
        : _vm._e(),
      _c("div", { staticClass: "password-menu-entry-container" }, [
        _c(
          "a",
          {
            directives: [
              {
                name: "focus",
                rawName: "v-focus",
                value: _vm.$isWebClient,
                expression: "$isWebClient"
              }
            ],
            staticClass: "password-menu-entry",
            attrs: { href: "#" },
            on: {
              click: function($event) {
                $event.preventDefault()
                return _vm.$parent.copy($event)
              }
            }
          },
          [
            _c("span", { staticClass: "to-clipboard-link iconic-link" }),
            _vm._v(" " + _vm._s(_vm.$t("to_clipboard")) + " ")
          ]
        ),
        _c(
          "a",
          {
            staticClass: "password-menu-entry",
            attrs: { href: "#" },
            on: {
              click: function($event) {
                $event.preventDefault()
                return _vm.$parent.copyUsername($event)
              }
            }
          },
          [_vm._v(" " + _vm._s(_vm.$t("to_clipboard_username")) + " ")]
        )
      ]),
      _c(
        "a",
        {
          staticClass: "password-menu-entry",
          attrs: { href: "#" },
          on: {
            click: function($event) {
              $event.preventDefault()
              return _vm.$parent.showQRCode($event)
            }
          }
        },
        [
          _c("span", { staticClass: "show-qrcode-link iconic-link" }),
          _vm._v(" " + _vm._s(_vm.$t("show_qrcode")) + " ")
        ]
      ),
      _c(
        "a",
        {
          staticClass: "password-menu-entry",
          attrs: { href: "#" },
          on: {
            click: function($event) {
              $event.preventDefault()
              return _vm.$parent.showNotes($event)
            }
          }
        },
        [
          _c("span", { staticClass: "notes-link iconic-link" }),
          _vm._v(
            " " +
              _vm._s(_vm.$t(_vm.password.notes ? "edit_notes" : "add_notes")) +
              " "
          )
        ]
      ),
      _vm.password.type == "stored"
        ? _c(
            "a",
            {
              staticClass: "password-menu-entry",
              attrs: { href: "#" },
              on: {
                click: function($event) {
                  $event.preventDefault()
                  return _vm.$parent.makeGenerated($event)
                }
              }
            },
            [
              _c("span", { staticClass: "make-generated-link iconic-link" }),
              _vm._v(" " + _vm._s(_vm.$t("make_generated")) + " ")
            ]
          )
        : _vm._e(),
      _c(
        "a",
        {
          staticClass: "password-menu-entry",
          attrs: { href: "#" },
          on: {
            click: function($event) {
              $event.preventDefault()
              return _vm.$parent.bumpRevision($event)
            }
          }
        },
        [
          _c("span", { staticClass: "bump-revision-link iconic-link" }),
          _vm._v(" " + _vm._s(_vm.$t("bump_revision")) + " ")
        ]
      ),
      _c(
        "a",
        {
          staticClass: "password-menu-entry",
          attrs: { href: "#" },
          on: {
            click: function($event) {
              $event.preventDefault()
              return _vm.$parent.removePassword($event)
            }
          }
        },
        [
          _c("span", { staticClass: "password-remove-link iconic-link" }),
          _vm._v(" " + _vm._s(_vm.$t("remove_password")) + " ")
        ]
      )
    ]
  )
}
var PasswordMenuvue_type_template_id_c7db5e4a_staticRenderFns = []
PasswordMenuvue_type_template_id_c7db5e4a_render._withStripped = true


// CONCATENATED MODULE: ./ui/panel/components/PasswordMenu.vue?vue&type=template&id=c7db5e4a&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/components/PasswordMenu.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var PasswordMenuvue_type_script_lang_js_ = ({
  props: {
    password: {
      type: Object,
      required: true
    }
  }
});
// CONCATENATED MODULE: ./ui/panel/components/PasswordMenu.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_PasswordMenuvue_type_script_lang_js_ = (PasswordMenuvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/panel/components/PasswordMenu.vue





/* normalize component */

var PasswordMenu_component = normalizeComponent(
  components_PasswordMenuvue_type_script_lang_js_,
  PasswordMenuvue_type_template_id_c7db5e4a_render,
  PasswordMenuvue_type_template_id_c7db5e4a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var PasswordMenu_api; }
PasswordMenu_component.options.__file = "ui/panel/components/PasswordMenu.vue"
/* harmony default export */ var PasswordMenu = (PasswordMenu_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/components/PasswordEntry.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ var PasswordEntryvue_type_script_lang_js_ = ({
  components: {
    "generated-password": GeneratedPassword,
    "notes-editor": NotesEditor,
    "qr-code": QRCode,
    "password-menu": PasswordMenu
  },
  props: {
    password: {
      type: Object,
      required: true
    },
    focus: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      value: null,
      passwordOptions: null,
      modal: null
    };
  },
  computed: {
    tooltip: function tooltip() {
      var tooltip = "";
      var password = this.password;

      if (password.type == "generated2") {
        tooltip = this.$t("password_type_generated2");
        tooltip += "\n" + this.$t("password_length");
        tooltip += " " + password.length;
        tooltip += "\n" + this.$t("allowed_characters");
        if (password.lower) tooltip += " " + "abc";
        if (password.upper) tooltip += " " + "XYZ";
        if (password.number) tooltip += " " + "789";
        if (password.symbol) tooltip += " " + "+^;";
      } else if (password.type == "stored") tooltip = this.$t("password_type_stored");

      if (password.notes) tooltip += "\n" + this.$t("password_info_notes") + " " + password.notes;
      return tooltip;
    }
  },
  watch: {
    password: function password() {
      this.value = null;
    }
  },
  methods: {
    ensureValue: function ensureValue() {
      var _this = this;

      if (this.value) return Promise.resolve();
      return passwords.getPassword(this.password).then(function (value) {
        _this.value = value;
      });
    },
    fillIn: function fillIn() {
      var _this2 = this;

      this.modal = null;
      passwordRetrieval.fillIn(this.password).then(function () {
        return window.close();
      })["catch"](function (error) {
        return _this2.$parent.showPasswordMessage(error);
      });
    },
    copy: function copy() {
      var _this3 = this;

      this.modal = null;

      var doCopy = function doCopy() {
        set(_this3.value);

        _this3.$parent.showPasswordMessage("password_copied_message");
      };

      if (this.value) doCopy();else {
        this.ensureValue().then(function () {
          if (!_this3.$isWebClient) doCopy();else {
            _this3.$parent.showPasswordMessage("password_ready_message");

            var handler = function handler(event) {
              window.removeEventListener("click", handler, true);
              event.stopPropagation();
              event.preventDefault();
              doCopy();
            };

            window.addEventListener("click", handler, true);
          }
        })["catch"](function (error) {
          return _this3.$parent.showPasswordMessage(error);
        });
      }
    },
    copyUsername: function copyUsername() {
      this.modal = null;
      set(this.password.name);
      this.$parent.showPasswordMessage("username_copied_message");
    },
    showQRCode: function showQRCode() {
      var _this4 = this;

      this.modal = null;
      this.ensureValue().then(function () {
        _this4.modal = "qrcode";
      })["catch"](function (error) {
        return _this4.$parent.showPasswordMessage(error);
      });
    },
    showNotes: function showNotes() {
      this.modal = "notes";
    },
    makeGenerated: function makeGenerated() {
      this.passwordOptions = {
        replacing: true
      };
      this.modal = "generated";
    },
    bumpRevision: function bumpRevision() {
      this.passwordOptions = {
        incRevision: true
      };
      this.modal = "generated";
    },
    removePassword: function removePassword() {
      var _this5 = this;

      this.modal = null;
      var message = this.$t("remove_password_confirmation", this.password.name, this.$app.siteDisplayName);
      if (this.password.notes) message += " " + this.$t("remove_password_confirmation_notes", this.password.notes);
      this.$app.confirm(message).then(function (response) {
        if (response) {
          passwords.removePassword(_this5.password).then(function (pwdList) {
            return _this5.$app.pwdList = pwdList;
          })["catch"](_this5.$parent.showPasswordMessage);
        }
      });
    }
  }
});
// CONCATENATED MODULE: ./ui/panel/components/PasswordEntry.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_PasswordEntryvue_type_script_lang_js_ = (PasswordEntryvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/panel/components/PasswordEntry.vue





/* normalize component */

var PasswordEntry_component = normalizeComponent(
  components_PasswordEntryvue_type_script_lang_js_,
  PasswordEntryvue_type_template_id_2745ee26_render,
  PasswordEntryvue_type_template_id_2745ee26_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var PasswordEntry_api; }
PasswordEntry_component.options.__file = "ui/panel/components/PasswordEntry.vue"
/* harmony default export */ var PasswordEntry = (PasswordEntry_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/components/SiteSelection.vue?vue&type=template&id=48cab294&
var SiteSelectionvue_type_template_id_48cab294_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "form",
    {
      staticClass: "modal-form",
      on: {
        submit: function($event) {
          $event.preventDefault()
          return _vm.done(_vm.value)
        }
      }
    },
    [
      _c("label", { attrs: { for: "site-selection-site" } }, [
        _vm._v(_vm._s(_vm.message))
      ]),
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model.trim",
            value: _vm.value,
            expression: "value",
            modifiers: { trim: true }
          },
          { name: "focus", rawName: "v-focus" },
          { name: "select", rawName: "v-select" }
        ],
        attrs: {
          id: "site-selection-site",
          type: "text",
          placeholder: "example.com",
          autocomplete: "off"
        },
        domProps: { value: _vm.value },
        on: {
          keydown: [
            function($event) {
              if (
                !$event.type.indexOf("key") &&
                _vm._k(
                  $event.keyCode,
                  "arrow-down",
                  undefined,
                  $event.key,
                  undefined
                )
              ) {
                return null
              }
              $event.preventDefault()
              _vm.activeIndex = Math.min(
                _vm.activeIndex + 1,
                _vm.sites.length - 1
              )
            },
            function($event) {
              if (
                !$event.type.indexOf("key") &&
                _vm._k(
                  $event.keyCode,
                  "arrow-up",
                  undefined,
                  $event.key,
                  undefined
                )
              ) {
                return null
              }
              $event.preventDefault()
              _vm.activeIndex = Math.max(_vm.activeIndex - 1, -1)
            },
            function($event) {
              if (
                !$event.type.indexOf("key") &&
                _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
              ) {
                return null
              }
              return _vm.enter($event)
            }
          ],
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.value = $event.target.value.trim()
          },
          blur: function($event) {
            return _vm.$forceUpdate()
          }
        }
      }),
      _c(
        "div",
        { staticClass: "site-autocomplete" },
        [
          _vm._l(_vm.sites, function(site, index) {
            return _c(
              "div",
              {
                directives: [
                  { name: "scroll-active", rawName: "v-scroll-active" }
                ],
                key: site.name,
                class: {
                  "site-entry": true,
                  active: _vm.activeIndex == index,
                  "special-site": site.name != site.displayName
                },
                on: {
                  click: function($event) {
                    return _vm.done(site.name)
                  }
                }
              },
              [
                _vm._v(" " + _vm._s(site.prefix)),
                _c("strong", [_vm._v(_vm._s(site.match))]),
                _vm._v(_vm._s(site.suffix) + " ")
              ]
            )
          }),
          !_vm.sites.length
            ? _c("div", [
                _vm._v(" " + _vm._s(_vm.$t("autocomplete_no_sites")) + " ")
              ])
            : _vm._e()
        ],
        2
      ),
      _c("div", { staticClass: "button-container" }, [
        _c("button", { attrs: { type: "submit" } }, [
          _vm._v(_vm._s(_vm.$t("select")))
        ])
      ])
    ]
  )
}
var SiteSelectionvue_type_template_id_48cab294_staticRenderFns = []
SiteSelectionvue_type_template_id_48cab294_render._withStripped = true


// CONCATENATED MODULE: ./ui/panel/components/SiteSelection.vue?vue&type=template&id=48cab294&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/components/SiteSelection.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var SiteSelectionvue_type_script_lang_js_ = ({
  props: {
    message: {
      type: String,
      required: true
    },
    callback: {
      type: Function,
      required: true
    }
  },
  data: function data() {
    return {
      value: this.$app.site && this.$app.siteDisplayName,
      allSites: null,
      sites: [],
      activeIndex: -1,
      pageSize: 0
    };
  },
  watch: {
    value: function value() {
      this.updateSites();
    }
  },
  mounted: function mounted() {
    var _this = this;

    passwords.getAllSites().then(function (sites) {
      var index = sites.indexOf("pfp.invalid");
      if (index >= 0) sites.splice(index, 1);
      sites.unshift("pfp.invalid");
      _this.allSites = sites.map(function (site) {
        return {
          name: site,
          displayName: getSiteDisplayName(site)
        };
      });

      _this.updateSites();
    })["catch"](this.$app.showUnknownError);
  },
  updated: function updated() {
    // If our parent is ModalOverlay, make sure to notify it about updates.
    if (this.$parent.ensureDocHeight) this.$parent.ensureDocHeight();
  },
  methods: {
    updateSites: function updateSites() {
      var _this2 = this;

      this.sites = this.allSites.filter(function (site) {
        var index = site.displayName.indexOf(_this2.value);
        if (index < 0) return false;
        site.prefix = site.displayName.substr(0, index);
        site.match = site.displayName.substr(index, _this2.value.length);
        site.suffix = site.displayName.substr(index + _this2.value.length);
        return true;
      });
    },
    enter: function enter(event) {
      if (this.activeIndex >= 0 && this.activeIndex < this.sites.length) {
        this.done(this.sites[this.activeIndex].name);
        event.preventDefault();
      }
    },
    done: function done(site) {
      if (site) this.callback(site);
    }
  }
});
// CONCATENATED MODULE: ./ui/panel/components/SiteSelection.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SiteSelectionvue_type_script_lang_js_ = (SiteSelectionvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/panel/components/SiteSelection.vue





/* normalize component */

var SiteSelection_component = normalizeComponent(
  components_SiteSelectionvue_type_script_lang_js_,
  SiteSelectionvue_type_template_id_48cab294_render,
  SiteSelectionvue_type_template_id_48cab294_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var SiteSelection_api; }
SiteSelection_component.options.__file = "ui/panel/components/SiteSelection.vue"
/* harmony default export */ var SiteSelection = (SiteSelection_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/components/StoredPassword.vue?vue&type=template&id=bef38d42&
var StoredPasswordvue_type_template_id_bef38d42_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "modal-overlay",
    {
      attrs: { stretch: true },
      on: {
        cancel: function($event) {
          return _vm.$emit("cancel")
        }
      }
    },
    [
      _c(
        "validated-form",
        {
          staticClass: "modal-form",
          on: { validated: _vm.submit },
          nativeOn: {
            reset: function($event) {
              return _vm.$emit("cancel")
            }
          }
        },
        [
          _c("div", { staticClass: "warning" }, [
            _vm._v(_vm._s(_vm.$t("stored_password_warning")))
          ]),
          _c(
            "label",
            { staticClass: "block-start", attrs: { for: "user-name" } },
            [_vm._v(_vm._s(_vm.$t("user_name")))]
          ),
          _c("validated-input", {
            directives: [{ name: "focus", rawName: "v-focus" }],
            attrs: { id: "user-name", type: "text" },
            on: { validate: _vm.validateName },
            model: {
              value: _vm.name,
              callback: function($$v) {
                _vm.name = typeof $$v === "string" ? $$v.trim() : $$v
              },
              expression: "name"
            }
          }),
          _vm.name.error
            ? _c("div", { staticClass: "error" }, [
                _vm._v(" " + _vm._s(_vm.name.error) + " ")
              ])
            : _vm._e(),
          !_vm.revisionVisible
            ? _c(
                "a",
                {
                  staticClass: "change-password-revision",
                  attrs: { href: "#" },
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      _vm.revisionVisible = true
                    }
                  }
                },
                [_vm._v(" " + _vm._s(_vm.$t("change_password_revision")) + " ")]
              )
            : [
                _c(
                  "label",
                  {
                    staticClass: "block-start",
                    attrs: { for: "password-revision" }
                  },
                  [_vm._v(_vm._s(_vm.$t("password_revision")))]
                ),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model.trim",
                      value: _vm.revision,
                      expression: "revision",
                      modifiers: { trim: true }
                    }
                  ],
                  attrs: { id: "password-revision", type: "text" },
                  domProps: { value: _vm.revision },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.revision = $event.target.value.trim()
                    },
                    blur: function($event) {
                      return _vm.$forceUpdate()
                    }
                  }
                })
              ],
          !_vm.recoveryActive
            ? [
                _c(
                  "label",
                  {
                    staticClass: "block-start",
                    attrs: { for: "password-value" }
                  },
                  [_vm._v(_vm._s(_vm.$t("password_value")))]
                ),
                _c("validated-input", {
                  attrs: { id: "password-value", type: "password" },
                  on: { validate: _vm.validatePassword },
                  model: {
                    value: _vm.password,
                    callback: function($$v) {
                      _vm.password = typeof $$v === "string" ? $$v.trim() : $$v
                    },
                    expression: "password"
                  }
                }),
                _vm.password.error
                  ? _c("div", { staticClass: "error" }, [
                      _vm._v(" " + _vm._s(_vm.password.error) + " ")
                    ])
                  : _vm._e(),
                _c(
                  "a",
                  {
                    staticClass: "use-recovery",
                    attrs: { href: "#" },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        _vm.recoveryActive = true
                      }
                    }
                  },
                  [_vm._v(_vm._s(_vm.$t("use_recovery")))]
                )
              ]
            : [
                _c("recovery-code", { on: { done: _vm.setPassword } }),
                _c(
                  "a",
                  {
                    staticClass: "cancel-recovery",
                    attrs: { href: "#" },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        _vm.recoveryActive = false
                      }
                    }
                  },
                  [_vm._v(_vm._s(_vm.$t("cancel_recovery")))]
                )
              ],
          _c("div", { staticClass: "button-container" }, [
            _c("button", { attrs: { type: "submit" } }, [
              _vm._v(_vm._s(_vm.$t("save_password")))
            ]),
            _c("button", { attrs: { type: "reset" } }, [
              _vm._v(_vm._s(_vm.$t("cancel")))
            ])
          ])
        ],
        2
      )
    ],
    1
  )
}
var StoredPasswordvue_type_template_id_bef38d42_staticRenderFns = []
StoredPasswordvue_type_template_id_bef38d42_render._withStripped = true


// CONCATENATED MODULE: ./ui/panel/components/StoredPassword.vue?vue&type=template&id=bef38d42&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/components/RecoveryCode.vue?vue&type=template&id=2ff81d63&
var RecoveryCodevue_type_template_id_2ff81d63_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("form", { staticClass: "modal-form" }, [
    _c(
      "label",
      { staticClass: "block-start", attrs: { for: "recoveryInput" } },
      [_vm._v(_vm._s(_vm.$t("recovery_code")))]
    ),
    _c(
      "div",
      { staticClass: "recovery-code-accepted" },
      _vm._l(_vm.accepted, function(line, index) {
        return _c("div", { key: line }, [
          _vm._v(" " + _vm._s(line) + " "),
          index == _vm.accepted.length - 1
            ? _c("a", {
                staticClass: "recovery-code-strip cancel",
                attrs: { href: "#", title: _vm.$t("recovery_remove_line") },
                on: {
                  click: function($event) {
                    $event.preventDefault()
                    return _vm.accepted.pop()
                  }
                }
              })
            : _vm._e()
        ])
      }),
      0
    ),
    _c("textarea", {
      directives: [{ name: "focus", rawName: "v-focus" }],
      ref: "recoveryInput",
      attrs: {
        id: "recoveryInput",
        autocomplete: "off",
        autocorrect: "off",
        spellcheck: "false"
      },
      on: {
        input: _vm.processInput,
        change: _vm.processInput,
        keydown: [
          function($event) {
            if (
              !$event.type.indexOf("key") &&
              _vm._k($event.keyCode, "delete", [8, 46], $event.key, [
                "Backspace",
                "Delete",
                "Del"
              ])
            ) {
              return null
            }
            return _vm.onDelete($event)
          },
          function($event) {
            if (
              !$event.type.indexOf("key") &&
              _vm._k(
                $event.keyCode,
                "backspace",
                undefined,
                $event.key,
                undefined
              )
            ) {
              return null
            }
            return _vm.onBackspace($event)
          }
        ]
      }
    }),
    _vm._v(" "),
    _vm.currentError
      ? _c("div", { staticClass: "error" }, [_vm._v(_vm._s(_vm.currentError))])
      : _vm._e()
  ])
}
var RecoveryCodevue_type_template_id_2ff81d63_staticRenderFns = []
RecoveryCodevue_type_template_id_2ff81d63_render._withStripped = true


// CONCATENATED MODULE: ./ui/panel/components/RecoveryCode.vue?vue&type=template&id=2ff81d63&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/components/RecoveryCode.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


function RecoveryCodevue_type_script_lang_js_slicedToArray(arr, i) { return RecoveryCodevue_type_script_lang_js_arrayWithHoles(arr) || RecoveryCodevue_type_script_lang_js_iterableToArrayLimit(arr, i) || RecoveryCodevue_type_script_lang_js_nonIterableRest(); }

function RecoveryCodevue_type_script_lang_js_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function RecoveryCodevue_type_script_lang_js_iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function RecoveryCodevue_type_script_lang_js_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


/* harmony default export */ var RecoveryCodevue_type_script_lang_js_ = ({
  data: function data() {
    return {
      validChars: "",
      currentError: null,
      accepted: []
    };
  },
  mounted: function mounted() {
    var _this = this;

    recoveryCodes.getValidChars().then(function (validChars) {
      _this.validChars = validChars;
    })["catch"](this.$app.showUnknownError);
  },
  methods: {
    insert: function insert(str, substr, pos) {
      return str.substr(0, pos) + substr + str.substr(pos);
    },
    getValue: function getValue() {
      var input = this.$refs.recoveryInput;
      var value = input.value;
      value = this.insert(value, "\0", input.selectionEnd);
      value = this.insert(value, "\0", input.selectionStart);
      return [value, input.selectionDirection];
    },
    setValue: function setValue(_ref) {
      var _ref2 = RecoveryCodevue_type_script_lang_js_slicedToArray(_ref, 2),
          value = _ref2[0],
          selectionDirection = _ref2[1];

      var input = this.$refs.recoveryInput;
      var selection = [value.indexOf("\0"), value.lastIndexOf("\0") - 1];
      input.value = value.replace(/\0/g, "");
      input.setSelectionRange(selection[0], selection[1], selectionDirection);
    },
    formatValue: function formatValue(value) {
      value = value.toUpperCase();
      value = value.replace(new RegExp("[^".concat(this.validChars, "\0]"), "gi"), "");
      value = value.replace(/(?:\w\0*){23}\w/g, "$&\n");
      value = value.replace(/(?:\w\0*){11}\w(?=\0*\w)/g, "$&:");
      value = value.replace(/(?:\w\0*){3}\w(?=\0*\w)/g, "$&-");
      return value;
    },
    processInput: function processInput() {
      var _this2 = this;

      var _this$getValue = this.getValue(),
          _this$getValue2 = RecoveryCodevue_type_script_lang_js_slicedToArray(_this$getValue, 2),
          value = _this$getValue2[0],
          selectionDirection = _this$getValue2[1];

      value = this.formatValue(value);
      this.setValue([value, selectionDirection]);

      if (!value.includes("\n")) {
        this.currentError = null;
        return;
      }

      var error = null;

      var checkSubstr = function checkSubstr(fromIndex) {
        var index = value.lastIndexOf("\n", fromIndex);
        if (fromIndex < 0 || index < 0) return error ? Promise.reject(error) : Promise.resolve();
        var code = _this2.accepted.join("") + value.substr(0, index);
        return recoveryCodes.isValid(code).then(function (result) {
          if (result == "ok" || result == "unterminated") {
            _this2.accepted = _this2.formatValue(code).trim().replace(/\0/g, "").split("\n");

            _this2.setValue([value.substr(index + 1), selectionDirection]);

            if (result == "ok") {
              recoveryCodes.decodeCode(code).then(function (password) {
                _this2.$emit("done", password);
              })["catch"](_this2.$app.showUnknownError);
            }

            return error ? Promise.reject(error) : Promise.resolve();
          } else {
            if (result == "checksum-mismatch") error = _this2.$t("recovery_checksum_mismatch");else error = result;
            return checkSubstr(index - 1);
          }
        });
      };

      checkSubstr().then(function () {
        _this2.currentError = null;
      })["catch"](function (error) {
        _this2.currentError = error;
      });
    },
    onDelete: function onDelete() {
      var input = this.$refs.recoveryInput;
      if (input.selectionStart != input.selectionEnd) return;

      while (input.selectionStart < input.value.length - 1 && !/\w/.test(input.value[input.selectionStart])) {
        input.selectionStart++;
      }
    },
    onBackspace: function onBackspace() {
      var input = this.$refs.recoveryInput;
      if (input.selectionStart != input.selectionEnd) return;

      while (input.selectionEnd > 0 && !/\w/.test(input.value[input.selectionEnd - 1])) {
        input.selectionEnd--;
      }
    }
  }
});
// CONCATENATED MODULE: ./ui/panel/components/RecoveryCode.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_RecoveryCodevue_type_script_lang_js_ = (RecoveryCodevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/panel/components/RecoveryCode.vue





/* normalize component */

var RecoveryCode_component = normalizeComponent(
  components_RecoveryCodevue_type_script_lang_js_,
  RecoveryCodevue_type_template_id_2ff81d63_render,
  RecoveryCodevue_type_template_id_2ff81d63_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var RecoveryCode_api; }
RecoveryCode_component.options.__file = "ui/panel/components/RecoveryCode.vue"
/* harmony default export */ var RecoveryCode = (RecoveryCode_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/components/StoredPassword.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var StoredPasswordvue_type_script_lang_js_ = ({
  name: "StoredPassword",
  components: {
    "recovery-code": RecoveryCode
  },
  data: function data() {
    return {
      name: "",
      revision: "1",
      revisionVisible: false,
      password: {
        value: "",
        error: null
      },
      recoveryActive: false
    };
  },
  watch: {
    revision: function revision() {
      if (this.name.error == this.$t("user_name_exists")) this.name.error = null;
    }
  },
  methods: {
    validateName: function validateName(newData) {
      if (!newData.value) newData.error = this.$t("user_name_required");
    },
    validatePassword: function validatePassword(newData) {
      if (!newData.value) newData.error = this.$t("password_value_required");
    },
    setPassword: function setPassword(password) {
      this.recoveryActive = false;
      this.password.value = password;
    },
    submit: function submit() {
      var _this = this;

      var revision = this.revision != "1" ? this.revision : "";
      passwords.addStored({
        site: this.$app.site,
        name: this.name.value,
        revision: revision,
        password: this.password.value
      }).then(function (pwdList) {
        _this.$app.pwdList = pwdList;

        _this.$emit("cancel");
      })["catch"](function (error) {
        if (error == "alreadyExists") {
          _this.name.error = _this.$t("user_name_exists");
          _this.revisionVisible = true;
        } else _this.$app.showUnknownError(error);
      });
    }
  }
});
// CONCATENATED MODULE: ./ui/panel/components/StoredPassword.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_StoredPasswordvue_type_script_lang_js_ = (StoredPasswordvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/panel/components/StoredPassword.vue





/* normalize component */

var StoredPassword_component = normalizeComponent(
  components_StoredPasswordvue_type_script_lang_js_,
  StoredPasswordvue_type_template_id_bef38d42_render,
  StoredPasswordvue_type_template_id_bef38d42_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var StoredPassword_api; }
StoredPassword_component.options.__file = "ui/panel/components/StoredPassword.vue"
/* harmony default export */ var StoredPassword = (StoredPassword_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/pages/PasswordList.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


function PasswordListvue_type_script_lang_js_slicedToArray(arr, i) { return PasswordListvue_type_script_lang_js_arrayWithHoles(arr) || PasswordListvue_type_script_lang_js_iterableToArrayLimit(arr, i) || PasswordListvue_type_script_lang_js_nonIterableRest(); }

function PasswordListvue_type_script_lang_js_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function PasswordListvue_type_script_lang_js_iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function PasswordListvue_type_script_lang_js_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








/* harmony default export */ var PasswordListvue_type_script_lang_js_ = ({
  name: "PasswordList",
  components: {
    "password-message": PasswordMessage,
    "generated-password": GeneratedPassword,
    "password-entry": PasswordEntry,
    "site-selection": SiteSelection,
    "stored-password": StoredPassword
  },
  data: function data() {
    return {
      modal: null,
      selectionCallback: null
    };
  },
  methods: {
    keyboardNavigation: function keyboardNavigation(event) {
      if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) return;
      var type = keyboardNavigationType(event);
      if (!type) return;
      var current = document.activeElement;
      if (!current.parentNode.classList.contains("password-container")) return;
      var container = current.parentNode;
      var elements = container.getElementsByClassName("iconic-link");
      var index = [].indexOf.call(elements, current);
      if (index < 0) return;
      event.preventDefault();

      if (type.endsWith("inrow")) {
        if (type == "backinrow" && index - 1 >= 0) elements[index - 1].focus();else if (type == "forwardinrow" && index + 1 < elements.length) elements[index + 1].focus();else if (type == "startinrow") elements[0].focus();else if (type == "endinrow") elements[elements.length - 1].focus();
      } else {
        var containers = this.$el.getElementsByClassName("password-container");
        var containerIndex = [].indexOf.call(containers, container);
        if (type == "back" && containerIndex - 1 >= 0) containers[containerIndex - 1].getElementsByClassName("iconic-link")[index].focus();else if (type == "forward" && containerIndex + 1 < containers.length) containers[containerIndex + 1].getElementsByClassName("iconic-link")[index].focus();else if (type == "start") containers[0].getElementsByClassName("iconic-link")[index].focus();else if (type == "end") containers[containers.length - 1].getElementsByClassName("iconic-link")[index].focus();
      }
    },
    showPasswordMessage: function showPasswordMessage(message) {
      this.$refs["password-message"].message = message;
    },
    addAlias: function addAlias() {
      var _this = this;

      this.selectionCallback = function (site) {
        _this.modal = null;
        if (site == _this.$app.origSite) return;
        passwords.addAlias(_this.$app.origSite, site).then(function () {
          return passwords.getPasswords(_this.$app.origSite);
        }).then(function (_ref) {
          var _ref2 = PasswordListvue_type_script_lang_js_slicedToArray(_ref, 3),
              origSite = _ref2[0],
              site = _ref2[1],
              pwdList = _ref2[2];

          _this.$app.origSite = origSite;
          _this.$app.site = site;
          _this.$app.pwdList = pwdList;
        })["catch"](_this.$app.showUnknownError);
      };

      this.modal = "site-selection";
    },
    removeAlias: function removeAlias() {
      var _this2 = this;

      var message = this.$t("remove_alias_confirmation", this.$app.origSite, this.$app.siteDisplayName);
      this.$app.confirm(message).then(function (response) {
        if (response) {
          passwords.removeAlias(_this2.$app.origSite).then(function () {
            return passwords.getPasswords(_this2.$app.origSite);
          }).then(function (_ref3) {
            var _ref4 = PasswordListvue_type_script_lang_js_slicedToArray(_ref3, 3),
                origSite = _ref4[0],
                site = _ref4[1],
                pwdList = _ref4[2];

            _this2.$app.origSite = origSite;
            _this2.$app.site = site;
            _this2.$app.pwdList = pwdList;
          })["catch"](_this2.$app.showUnknownError);
        }
      });
    },
    showAll: function showAll() {
      ui.showAllPasswords().then(function () {
        return window.close();
      })["catch"](this.$app.showUnknownError);
    }
  }
});
// CONCATENATED MODULE: ./ui/panel/pages/PasswordList.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_PasswordListvue_type_script_lang_js_ = (PasswordListvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/panel/pages/PasswordList.vue





/* normalize component */

var PasswordList_component = normalizeComponent(
  pages_PasswordListvue_type_script_lang_js_,
  PasswordListvue_type_template_id_23cab64c_render,
  PasswordListvue_type_template_id_23cab64c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var PasswordList_api; }
PasswordList_component.options.__file = "ui/panel/pages/PasswordList.vue"
/* harmony default export */ var PasswordList = (PasswordList_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/pages/SelectSite.vue?vue&type=template&id=a4e066d4&
var SelectSitevue_type_template_id_a4e066d4_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "page" },
    [
      _c("site-selection", {
        attrs: { message: _vm.$t("select_site"), callback: _vm.selected }
      })
    ],
    1
  )
}
var SelectSitevue_type_template_id_a4e066d4_staticRenderFns = []
SelectSitevue_type_template_id_a4e066d4_render._withStripped = true


// CONCATENATED MODULE: ./ui/panel/pages/SelectSite.vue?vue&type=template&id=a4e066d4&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/pages/SelectSite.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//


function SelectSitevue_type_script_lang_js_slicedToArray(arr, i) { return SelectSitevue_type_script_lang_js_arrayWithHoles(arr) || SelectSitevue_type_script_lang_js_iterableToArrayLimit(arr, i) || SelectSitevue_type_script_lang_js_nonIterableRest(); }

function SelectSitevue_type_script_lang_js_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function SelectSitevue_type_script_lang_js_iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function SelectSitevue_type_script_lang_js_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



/* harmony default export */ var SelectSitevue_type_script_lang_js_ = ({
  name: "SelectSite",
  components: {
    "site-selection": SiteSelection
  },
  methods: {
    selected: function selected(site) {
      var _this = this;

      passwords.getPasswords(site).then(function (_ref) {
        var _ref2 = SelectSitevue_type_script_lang_js_slicedToArray(_ref, 3),
            origSite = _ref2[0],
            site = _ref2[1],
            pwdList = _ref2[2];

        _this.$app.origSite = origSite;
        _this.$app.site = site;
        _this.$app.pwdList = pwdList;

        _this.$emit("selected");
      })["catch"](this.$app.showUnknownError);
    }
  }
});
// CONCATENATED MODULE: ./ui/panel/pages/SelectSite.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_SelectSitevue_type_script_lang_js_ = (SelectSitevue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/panel/pages/SelectSite.vue





/* normalize component */

var SelectSite_component = normalizeComponent(
  pages_SelectSitevue_type_script_lang_js_,
  SelectSitevue_type_template_id_a4e066d4_render,
  SelectSitevue_type_template_id_a4e066d4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var SelectSite_api; }
SelectSite_component.options.__file = "ui/panel/pages/SelectSite.vue"
/* harmony default export */ var SelectSite = (SelectSite_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/pages/Settings.vue?vue&type=template&id=1b118916&
var Settingsvue_type_template_id_1b118916_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "page" },
    [
      _c("setting", {
        attrs: { name: "autolock", "def-value": true, focus: true }
      }),
      _c("setting", { attrs: { name: "autolock_delay", "def-value": 10 } })
    ],
    1
  )
}
var Settingsvue_type_template_id_1b118916_staticRenderFns = []
Settingsvue_type_template_id_1b118916_render._withStripped = true


// CONCATENATED MODULE: ./ui/panel/pages/Settings.vue?vue&type=template&id=1b118916&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/components/Setting.vue?vue&type=template&id=df095c18&
var Settingvue_type_template_id_df095c18_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "setting" }, [
    _c("div", { staticClass: "setting-label" }, [
      _c("label", { attrs: { for: _vm.name } }, [
        _vm._v(_vm._s(_vm.$t(_vm.name + "_title")))
      ]),
      _c("span", { staticClass: "description" }, [
        _vm._v(_vm._s(_vm.$t(_vm.name + "_description")))
      ])
    ]),
    typeof _vm.defValue == "boolean"
      ? _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.value,
              expression: "value"
            },
            {
              name: "focus",
              rawName: "v-focus",
              value: _vm.focus,
              expression: "focus"
            }
          ],
          attrs: { id: _vm.name, type: "checkbox" },
          domProps: {
            checked: Array.isArray(_vm.value)
              ? _vm._i(_vm.value, null) > -1
              : _vm.value
          },
          on: {
            change: function($event) {
              var $$a = _vm.value,
                $$el = $event.target,
                $$c = $$el.checked ? true : false
              if (Array.isArray($$a)) {
                var $$v = null,
                  $$i = _vm._i($$a, $$v)
                if ($$el.checked) {
                  $$i < 0 && (_vm.value = $$a.concat([$$v]))
                } else {
                  $$i > -1 &&
                    (_vm.value = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
                }
              } else {
                _vm.value = $$c
              }
            }
          }
        })
      : typeof _vm.defValue == "number"
      ? _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.value,
              expression: "value"
            },
            {
              name: "focus",
              rawName: "v-focus",
              value: _vm.focus,
              expression: "focus"
            }
          ],
          attrs: { id: _vm.name, type: "number", min: "0" },
          domProps: { value: _vm.value },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.value = $event.target.value
            }
          }
        })
      : _vm._e()
  ])
}
var Settingvue_type_template_id_df095c18_staticRenderFns = []
Settingvue_type_template_id_df095c18_render._withStripped = true


// CONCATENATED MODULE: ./ui/components/Setting.vue?vue&type=template&id=df095c18&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/components/Setting.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var Settingvue_type_script_lang_js_ = ({
  name: "Setting",
  props: {
    name: {
      type: String,
      required: true
    },
    defValue: {
      type: [Boolean, Number],
      required: true
    },
    focus: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      value: this.defValue
    };
  },
  watch: {
    value: function value() {
      prefs.set(this.name, this.value);
    }
  },
  created: function created() {
    var _this = this;

    prefs.get(this.name, this.defValue).then(function (value) {
      return _this.value = value;
    });
  }
});
// CONCATENATED MODULE: ./ui/components/Setting.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Settingvue_type_script_lang_js_ = (Settingvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/components/Setting.vue





/* normalize component */

var Setting_component = normalizeComponent(
  components_Settingvue_type_script_lang_js_,
  Settingvue_type_template_id_df095c18_render,
  Settingvue_type_template_id_df095c18_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var Setting_api; }
Setting_component.options.__file = "ui/components/Setting.vue"
/* harmony default export */ var Setting = (Setting_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/pages/Settings.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var Settingsvue_type_script_lang_js_ = ({
  name: "Settings",
  components: {
    setting: Setting
  }
});
// CONCATENATED MODULE: ./ui/panel/pages/Settings.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_Settingsvue_type_script_lang_js_ = (Settingsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/panel/pages/Settings.vue





/* normalize component */

var Settings_component = normalizeComponent(
  pages_Settingsvue_type_script_lang_js_,
  Settingsvue_type_template_id_1b118916_render,
  Settingsvue_type_template_id_1b118916_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var Settings_api; }
Settings_component.options.__file = "ui/panel/pages/Settings.vue"
/* harmony default export */ var Settings = (Settings_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/pages/Sync.vue?vue&type=template&id=d5a9dde4&
var Syncvue_type_template_id_d5a9dde4_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "page" },
    [
      _vm.$app.sync.provider
        ? [
            _c("div", [_vm._v(_vm._s(_vm.$t("sync_provider")))]),
            _c(
              "div",
              [
                _vm._v(
                  " " +
                    _vm._s(_vm.labelForProvider(_vm.$app.sync.provider)) +
                    " "
                ),
                _vm.$app.sync.username
                  ? [_vm._v(" (" + _vm._s(_vm.$app.sync.username) + ") ")]
                  : _vm._e()
              ],
              2
            ),
            _c("div", { staticClass: "block-start" }, [
              _vm._v(_vm._s(_vm.$t("sync_lastTime")))
            ]),
            _c(
              "div",
              [
                _vm.$app.sync.isSyncing
                  ? [_vm._v(_vm._s(_vm.$t("sync_lastTime_now")))]
                  : _vm.$app.sync.lastSync
                  ? [
                      _vm._v(
                        _vm._s(
                          new Date(_vm.$app.sync.lastSync).toLocaleString()
                        )
                      )
                    ]
                  : [_vm._v(_vm._s(_vm.$t("sync_lastTime_never")))],
                _vm.$app.sync.lastSync && !_vm.$app.sync.isSyncing
                  ? [
                      _vm.$app.sync.error
                        ? _c("span", { staticClass: "sync-failed" }, [
                            _vm._v(_vm._s(" " + _vm.$t("sync_failed")))
                          ])
                        : [_vm._v(_vm._s(" " + _vm.$t("sync_succeeded")))]
                    ]
                  : _vm._e()
              ],
              2
            ),
            _vm.$app.sync.error
              ? _c("div", { staticClass: "warning sync-error" }, [
                  _vm._v(" " + _vm._s(_vm.localize(_vm.$app.sync.error)) + " "),
                  _vm.$app.sync.error == "sync_invalid_token"
                    ? _c(
                        "a",
                        {
                          attrs: { href: "#" },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.authorize(_vm.$app.sync.provider)
                            }
                          }
                        },
                        [_vm._v(" " + _vm._s(_vm.$t("sync_reauthorize")) + " ")]
                      )
                    : _vm._e()
                ])
              : _vm._e(),
            _c("div", { staticClass: "button-container" }, [
              _c(
                "button",
                {
                  directives: [{ name: "focus", rawName: "v-focus" }],
                  attrs: { disabled: _vm.$app.sync.isSyncing },
                  on: { click: _vm.doSync }
                },
                [_vm._v(_vm._s(_vm.$t("do_sync")))]
              ),
              _c("button", { on: { click: _vm.disableSync } }, [
                _vm._v(_vm._s(_vm.$t("sync_disable")))
              ])
            ])
          ]
        : [
            _c("div", { staticClass: "sync-section" }, [
              _vm._v(_vm._s(_vm.$t("sync_selection_label")))
            ]),
            _c(
              "div",
              {
                directives: [
                  {
                    name: "keyboard-navigation",
                    rawName: "v-keyboard-navigation",
                    value: _vm.sync - _vm.provider - _vm.link,
                    expression: "sync-provider-link"
                  }
                ],
                staticClass: "sync-provider-selection"
              },
              _vm._l(_vm.providers, function(provider, index) {
                return _c(
                  "a",
                  {
                    directives: [
                      {
                        name: "focus",
                        rawName: "v-focus",
                        value: index == 0,
                        expression: "index == 0"
                      }
                    ],
                    key: provider.name,
                    staticClass: "sync-provider-link",
                    attrs: { href: "#" },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        return _vm.authorize(provider.name)
                      }
                    }
                  },
                  [
                    _c("span", {
                      staticClass: "sync-provider-icon",
                      class: provider.name
                    }),
                    _c("span", [_vm._v(_vm._s(provider.label))])
                  ]
                )
              }),
              0
            ),
            _c("div", { staticClass: "block-start sync-section" }, [
              _vm._v(_vm._s(_vm.$t("sync_how_label")))
            ]),
            _c(
              "div",
              { staticClass: "sync-explanation" },
              [
                _vm._v(" " + _vm._s(_vm.$t("sync_how_explanation")) + " "),
                _c(
                  "external-link",
                  { attrs: { type: "documentation", param: "sync" } },
                  [_vm._v(" " + _vm._s(_vm.$t("learn_more")) + " ")]
                )
              ],
              1
            ),
            _c("div", { staticClass: "block-start sync-section" }, [
              _vm._v(_vm._s(_vm.$t("sync_safe_label")))
            ]),
            _c("div", { staticClass: "sync-explanation" }, [
              _vm._v(_vm._s(_vm.$t("sync_safe_explanation")))
            ]),
            _c("div", { staticClass: "block-start sync-section" }, [
              _vm._v(_vm._s(_vm.$t("sync_no_account_label")))
            ]),
            _c("div", { staticClass: "sync-explanation" }, [
              _vm._v(_vm._s(_vm.$t("sync_no_account_explanation")))
            ])
          ],
      _vm.manualAuthCallback
        ? _c("manual-auth", {
            attrs: { callback: _vm.manualAuthCallback },
            on: {
              cancel: function($event) {
                _vm.manualAuthCallback = null
              }
            }
          })
        : _vm._e(),
      _vm.remoteStorageUsernameCallback
        ? _c("remoteStorage-username-input", {
            attrs: { callback: _vm.remoteStorageUsernameCallback },
            on: {
              cancel: function($event) {
                _vm.remoteStorageUsernameCallback = null
              }
            }
          })
        : _vm._e()
    ],
    2
  )
}
var Syncvue_type_template_id_d5a9dde4_staticRenderFns = []
Syncvue_type_template_id_d5a9dde4_render._withStripped = true


// CONCATENATED MODULE: ./ui/panel/pages/Sync.vue?vue&type=template&id=d5a9dde4&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/components/ManualAuth.vue?vue&type=template&id=0229b50f&
var ManualAuthvue_type_template_id_0229b50f_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "modal-overlay",
    {
      on: {
        cancel: function($event) {
          return _vm.$emit("cancel")
        }
      }
    },
    [
      _c(
        "form",
        {
          staticClass: "modal-form",
          on: {
            submit: function($event) {
              $event.preventDefault()
              return _vm.done($event)
            }
          }
        },
        [
          _c("label", { attrs: { for: "sync-token" } }, [
            _vm._v(_vm._s(_vm.$t("sync_token_label")))
          ]),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model.trim",
                value: _vm.token,
                expression: "token",
                modifiers: { trim: true }
              },
              { name: "focus", rawName: "v-focus" }
            ],
            attrs: { id: "sync-token" },
            domProps: { value: _vm.token },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.token = $event.target.value.trim()
              },
              blur: function($event) {
                return _vm.$forceUpdate()
              }
            }
          }),
          _c("div", { staticClass: "button-container" }, [
            _c("button", { attrs: { type: "submit" } }, [
              _vm._v(_vm._s(_vm.$t("ok")))
            ])
          ])
        ]
      )
    ]
  )
}
var ManualAuthvue_type_template_id_0229b50f_staticRenderFns = []
ManualAuthvue_type_template_id_0229b50f_render._withStripped = true


// CONCATENATED MODULE: ./ui/panel/components/ManualAuth.vue?vue&type=template&id=0229b50f&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/components/ManualAuth.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var ManualAuthvue_type_script_lang_js_ = ({
  name: "ManualAuth",
  props: {
    callback: {
      type: Function,
      required: true
    }
  },
  data: function data() {
    return {
      token: ""
    };
  },
  methods: {
    done: function done() {
      this.$emit("cancel");
      if (this.token) this.callback(this.token);
    }
  }
});
// CONCATENATED MODULE: ./ui/panel/components/ManualAuth.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ManualAuthvue_type_script_lang_js_ = (ManualAuthvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/panel/components/ManualAuth.vue





/* normalize component */

var ManualAuth_component = normalizeComponent(
  components_ManualAuthvue_type_script_lang_js_,
  ManualAuthvue_type_template_id_0229b50f_render,
  ManualAuthvue_type_template_id_0229b50f_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var ManualAuth_api; }
ManualAuth_component.options.__file = "ui/panel/components/ManualAuth.vue"
/* harmony default export */ var ManualAuth = (ManualAuth_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/components/RemoteStorageUsernameInput.vue?vue&type=template&id=7eef2980&
var RemoteStorageUsernameInputvue_type_template_id_7eef2980_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "modal-overlay",
    {
      on: {
        cancel: function($event) {
          return _vm.$emit("cancel")
        }
      }
    },
    [
      _c(
        "validated-form",
        { staticClass: "modal-form", on: { validated: _vm.done } },
        [
          _c("label", { attrs: { for: "username" } }, [
            _vm._v(_vm._s(_vm.$t("remoteStorage_username_label")))
          ]),
          _c("validated-input", {
            directives: [{ name: "focus", rawName: "v-focus" }],
            attrs: { id: "username", placeholder: "me@example.com" },
            on: { validate: _vm.validateUsername },
            model: {
              value: _vm.username,
              callback: function($$v) {
                _vm.username = typeof $$v === "string" ? $$v.trim() : $$v
              },
              expression: "username"
            }
          }),
          _vm.username.error
            ? _c("div", { staticClass: "error" }, [
                _vm._v(" " + _vm._s(_vm.username.error) + " ")
              ])
            : _vm._e(),
          _c(
            "div",
            { staticClass: "remoteStorage-hosting-link" },
            [
              _c(
                "external-link",
                {
                  attrs: {
                    type: "url",
                    param: "https://wiki.remotestorage.io/Servers"
                  }
                },
                [
                  _vm._v(
                    " " + _vm._s(_vm.$t("remoteStorage_get_account")) + " "
                  )
                ]
              )
            ],
            1
          ),
          _c("div", { staticClass: "button-container" }, [
            _c("button", { attrs: { type: "submit" } }, [
              _vm._v(_vm._s(_vm.$t("ok")))
            ])
          ])
        ],
        1
      )
    ],
    1
  )
}
var RemoteStorageUsernameInputvue_type_template_id_7eef2980_staticRenderFns = []
RemoteStorageUsernameInputvue_type_template_id_7eef2980_render._withStripped = true


// CONCATENATED MODULE: ./ui/panel/components/RemoteStorageUsernameInput.vue?vue&type=template&id=7eef2980&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/components/RemoteStorageUsernameInput.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var RemoteStorageUsernameInputvue_type_script_lang_js_ = ({
  name: "ManualAuth",
  props: {
    target: {
      type: String,
      required: true
    },
    callback: {
      type: Function,
      required: true
    }
  },
  data: function data() {
    return {
      username: {
        value: ""
      }
    };
  },
  methods: {
    done: function done() {
      this.$emit("cancel");
      if (this.callback && this.username.value) this.callback(this.username.value);
    },
    validateUsername: function validateUsername(newData) {
      var index = newData.value.indexOf("@");
      if (index <= 0 || /\s/.test(newData.value)) newData.error = this.$t("remoteStorage_invalid_username");else {
        var host = newData.value.substr(index + 1).toLowerCase(); // URL object will always encode non-ASCII characters, yet all of them
        // are valid. Replace by ASCII letters for validation.

        host = host.replace(/[\u0080-\uFFFF]/g, "a");

        try {
          if (new URL("https://" + host + "/").hostname != host) throw "invalid";
        } catch (e) {
          newData.error = this.$t("remoteStorage_invalid_username");
        }
      }
    }
  }
});
// CONCATENATED MODULE: ./ui/panel/components/RemoteStorageUsernameInput.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_RemoteStorageUsernameInputvue_type_script_lang_js_ = (RemoteStorageUsernameInputvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/panel/components/RemoteStorageUsernameInput.vue





/* normalize component */

var RemoteStorageUsernameInput_component = normalizeComponent(
  components_RemoteStorageUsernameInputvue_type_script_lang_js_,
  RemoteStorageUsernameInputvue_type_template_id_7eef2980_render,
  RemoteStorageUsernameInputvue_type_template_id_7eef2980_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var RemoteStorageUsernameInput_api; }
RemoteStorageUsernameInput_component.options.__file = "ui/panel/components/RemoteStorageUsernameInput.vue"
/* harmony default export */ var RemoteStorageUsernameInput = (RemoteStorageUsernameInput_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/pages/Sync.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var Syncvue_type_script_lang_js_ = ({
  name: "Sync",
  components: {
    "manual-auth": ManualAuth,
    "remoteStorage-username-input": RemoteStorageUsernameInput
  },
  data: function data() {
    return {
      providers: [{
        name: "dropbox",
        label: "Dropbox"
      }, {
        name: "gdrive",
        label: "Google Drive"
      }, {
        name: "remotestorage",
        label: "remoteStorage"
      }],
      manualAuthCallback: null,
      remoteStorageUsernameCallback: null
    };
  },
  methods: {
    labelForProvider: function labelForProvider(name) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.providers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var provider = _step.value;
          if (provider.name == name) return provider.label;
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

      return name;
    },
    localize: function localize(error) {
      if (/\s/.test(error)) return error;
      return this.$t(error) || error;
    },
    doSync: function doSync() {
      sync.sync();
    },
    disableSync: function disableSync() {
      var _this = this;

      this.$app.confirm(this.$t("sync_disable_confirmation")).then(function (disable) {
        if (disable) {
          sync.disable().then(function () {
            _this.$app.sync = {
              provider: null
            };
          });
        }
      });
    },
    authorize: function authorize(provider, username) {
      var _this2 = this;

      if (provider == "remotestorage" && !username) {
        this.remoteStorageUsernameCallback = function (username) {
          return _this2.authorize(provider, username);
        };

        return;
      }

      if (this.$isWebClient) {
        var wnd = window.open("about:blank", "_blank");

        wnd.onload = function () {
          wnd.document.body.textContent = "You will be redirected to the authorization page of your sync provider shortly.";
        };

        this.manualAuthCallback = function (code) {
          return sync.manualAuthorization(provider, username, code)["catch"](_this2.$app.showUnknownError);
        };

        sync.getManualAuthURL(provider, username).then(function (url) {
          wnd.location.href = url;
        })["catch"](function (error) {
          _this2.manualAuthCallback = null;
          wnd.close();

          _this2.$app.showUnknownError(error);
        });
      } else {
        sync.authorize(provider, username);
        window.close();
      }
    }
  }
});
// CONCATENATED MODULE: ./ui/panel/pages/Sync.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_Syncvue_type_script_lang_js_ = (Syncvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/panel/pages/Sync.vue





/* normalize component */

var Sync_component = normalizeComponent(
  pages_Syncvue_type_script_lang_js_,
  Syncvue_type_template_id_d5a9dde4_render,
  Syncvue_type_template_id_d5a9dde4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var Sync_api; }
Sync_component.options.__file = "ui/panel/pages/Sync.vue"
/* harmony default export */ var Sync = (Sync_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/components/Confirm.vue?vue&type=template&id=a7691b38&
var Confirmvue_type_template_id_a7691b38_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.message
    ? _c("modal-overlay", { on: { cancel: _vm.reject } }, [
        _c("div", [_vm._v(_vm._s(_vm.message))]),
        _c("div", { staticClass: "button-container" }, [
          _c(
            "button",
            {
              directives: [{ name: "focus", rawName: "v-focus" }],
              on: { click: _vm.accept }
            },
            [_vm._v(_vm._s(_vm.$t("yes")))]
          ),
          _c("button", { on: { click: _vm.reject } }, [
            _vm._v(_vm._s(_vm.$t("no")))
          ])
        ])
      ])
    : _vm._e()
}
var Confirmvue_type_template_id_a7691b38_staticRenderFns = []
Confirmvue_type_template_id_a7691b38_render._withStripped = true


// CONCATENATED MODULE: ./ui/components/Confirm.vue?vue&type=template&id=a7691b38&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/components/Confirm.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var Confirmvue_type_script_lang_js_ = ({
  name: "Confirm",
  data: function data() {
    return {
      message: null,
      callback: null
    };
  },
  methods: {
    accept: function accept() {
      this.callback(true);
      this.message = this.callback = null;
    },
    reject: function reject() {
      this.callback(false);
      this.message = this.callback = null;
    }
  }
});
// CONCATENATED MODULE: ./ui/components/Confirm.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Confirmvue_type_script_lang_js_ = (Confirmvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/components/Confirm.vue





/* normalize component */

var Confirm_component = normalizeComponent(
  components_Confirmvue_type_script_lang_js_,
  Confirmvue_type_template_id_a7691b38_render,
  Confirmvue_type_template_id_a7691b38_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var Confirm_api; }
Confirm_component.options.__file = "ui/components/Confirm.vue"
/* harmony default export */ var Confirm = (Confirm_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/components/UnknownError.vue?vue&type=template&id=04dc75ea&
var UnknownErrorvue_type_template_id_04dc75ea_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "warning" }, [
    _c("a", {
      staticClass: "unknown-error-cancel cancel",
      attrs: { href: "#", title: _vm.$t("close") },
      on: {
        click: function($event) {
          $event.preventDefault()
          return _vm.$emit("close")
        }
      }
    }),
    _c("span", [_vm._v(_vm._s(_vm.$t("unknown_error") + " "))]),
    !_vm.showDetails
      ? _c(
          "a",
          {
            attrs: { href: "#" },
            on: {
              click: function($event) {
                $event.preventDefault()
                _vm.showDetails = true
              }
            }
          },
          [_vm._v(_vm._s(_vm.$t("unknown_error_more")))]
        )
      : _c("div", { staticClass: "unknown-error-details" }, [
          _vm._v(_vm._s(_vm.stringify(_vm.error)))
        ])
  ])
}
var UnknownErrorvue_type_template_id_04dc75ea_staticRenderFns = []
UnknownErrorvue_type_template_id_04dc75ea_render._withStripped = true


// CONCATENATED MODULE: ./ui/components/UnknownError.vue?vue&type=template&id=04dc75ea&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/components/UnknownError.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var UnknownErrorvue_type_script_lang_js_ = ({
  name: "UnknownError",
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  data: function data() {
    return {
      showDetails: false
    };
  },
  methods: {
    stringify: function stringify(error) {
      if (error.stack) return error + "\n" + error.stack;else return String(error);
    }
  }
});
// CONCATENATED MODULE: ./ui/components/UnknownError.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_UnknownErrorvue_type_script_lang_js_ = (UnknownErrorvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/components/UnknownError.vue





/* normalize component */

var UnknownError_component = normalizeComponent(
  components_UnknownErrorvue_type_script_lang_js_,
  UnknownErrorvue_type_template_id_04dc75ea_render,
  UnknownErrorvue_type_template_id_04dc75ea_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var UnknownError_api; }
UnknownError_component.options.__file = "ui/components/UnknownError.vue"
/* harmony default export */ var UnknownError = (UnknownError_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/panel/App.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//














var pages = ["select-site", "password-list", "sync", "settings"];
var initialData = {
  site: null,
  origSite: null,
  pwdList: null,
  masterPasswordState: null,
  sync: null
};
var app = null;
messaging_port.on("init", function (state) {
  var target = app || initialData;

  for (var _i = 0, _Object$keys = Object.keys(initialData); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    if (key in state) target[key] = state[key];
  }
});
/* harmony default export */ var Appvue_type_script_lang_js_ = ({
  name: "App",
  components: {
    "change-master": ChangeMaster,
    "enter-master": EnterMaster,
    "migration": Migration,
    "password-list": PasswordList,
    "select-site": SelectSite,
    "settings": Settings,
    "sync": Sync,
    "confirm": Confirm,
    "unknown-error": UnknownError
  },
  data: function data() {
    return Object.assign({
      unknownError: null,
      resettingMaster: false,
      currentPage: initialData.site === "" ? "select-site" : "password-list"
    }, initialData);
  },
  computed: {
    siteDisplayName: function siteDisplayName() {
      return getSiteDisplayName(this.site);
    }
  },
  watch: {
    site: function site() {
      if (this.currentPage == "password-list" && this.site === "") this.currentPage = "select-site";
    }
  },
  created: function created() {
    app = this;
  },
  methods: {
    testUnknownError: function testUnknownError() {
      this.showUnknownError(new Error("Unexpected error triggered via Ctrl+E"));
    },
    tabNavigation: function tabNavigation(event) {
      var type = keyboardNavigationType(event);
      var index = pages.indexOf(this.currentPage);
      if (!type || index < 0) return;
      event.preventDefault();
      if (type.startsWith("back") && index - 1 >= 0) this.currentPage = pages[index - 1];else if (type.startsWith("forward") && index + 1 < pages.length) this.currentPage = pages[index + 1];else if (type.startsWith("start")) this.currentPage = pages[0];else if (type.startsWith("end")) this.currentPage = pages[pages.length - 1];
    },
    confirm: function confirm(message) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var confirm = _this.$refs.confirm;
        confirm.message = message;
        confirm.callback = resolve;
      });
    },
    showUnknownError: function showUnknownError(error) {
      this.unknownError = error;
    },
    lockPasswords: function lockPasswords() {
      var _this2 = this;

      masterPassword.forgetPassword().then(function () {
        return _this2.masterPasswordState = "set";
      })["catch"](this.showUnknownError);
    }
  }
});
// CONCATENATED MODULE: ./ui/panel/App.vue?vue&type=script&lang=js&
 /* harmony default export */ var panel_Appvue_type_script_lang_js_ = (Appvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/panel/App.vue





/* normalize component */

var App_component = normalizeComponent(
  panel_Appvue_type_script_lang_js_,
  Appvue_type_template_id_4ab8aec9_render,
  Appvue_type_template_id_4ab8aec9_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var App_api; }
App_component.options.__file = "ui/panel/App.vue"
/* harmony default export */ var panel_App = (App_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/allpasswords/App.vue?vue&type=template&id=63a462b4&
var Appvue_type_template_id_63a462b4_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      on: {
        keydown: function($event) {
          if (!$event.type.indexOf("key") && $event.keyCode !== 69) {
            return null
          }
          if (!$event.ctrlKey) {
            return null
          }
          $event.preventDefault()
          return _vm.testUnknownError($event)
        }
      }
    },
    [
      _vm.inProgress ? _c("in-progress") : _vm._e(),
      _vm.masterPromise
        ? _c("enter-master", { on: { cancel: _vm.enterMasterDone } })
        : _vm._e(),
      _c("confirm", { ref: "confirm" }),
      _vm.unknownError
        ? _c("unknown-error", {
            attrs: { error: _vm.unknownError },
            on: {
              close: function($event) {
                _vm.unknownError = null
              }
            }
          })
        : _vm._e(),
      _c("password-message", {
        ref: "global-message",
        attrs: {
          messages: {
            allpasswords_import_success: true
          }
        }
      }),
      _c(
        "div",
        { staticClass: "title-container" },
        [
          _c("h1", { staticClass: "title" }, [
            _vm._v(_vm._s(_vm.$t("allpasswords_title")))
          ]),
          _c("global-actions")
        ],
        1
      ),
      _c("div", { staticClass: "options" }, [
        _c("div", [
          _c("label", [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.showNotes,
                  expression: "showNotes"
                }
              ],
              attrs: { type: "checkbox" },
              domProps: {
                checked: Array.isArray(_vm.showNotes)
                  ? _vm._i(_vm.showNotes, null) > -1
                  : _vm.showNotes
              },
              on: {
                change: function($event) {
                  var $$a = _vm.showNotes,
                    $$el = $event.target,
                    $$c = $$el.checked ? true : false
                  if (Array.isArray($$a)) {
                    var $$v = null,
                      $$i = _vm._i($$a, $$v)
                    if ($$el.checked) {
                      $$i < 0 && (_vm.showNotes = $$a.concat([$$v]))
                    } else {
                      $$i > -1 &&
                        (_vm.showNotes = $$a
                          .slice(0, $$i)
                          .concat($$a.slice($$i + 1)))
                    }
                  } else {
                    _vm.showNotes = $$c
                  }
                }
              }
            }),
            _vm._v(_vm._s(_vm.$t("allpasswords_show_notes")))
          ])
        ]),
        _c("div", [
          _c("label", [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.showPasswords,
                  expression: "showPasswords"
                }
              ],
              attrs: { type: "checkbox" },
              domProps: {
                checked: Array.isArray(_vm.showPasswords)
                  ? _vm._i(_vm.showPasswords, null) > -1
                  : _vm.showPasswords
              },
              on: {
                change: function($event) {
                  var $$a = _vm.showPasswords,
                    $$el = $event.target,
                    $$c = $$el.checked ? true : false
                  if (Array.isArray($$a)) {
                    var $$v = null,
                      $$i = _vm._i($$a, $$v)
                    if ($$el.checked) {
                      $$i < 0 && (_vm.showPasswords = $$a.concat([$$v]))
                    } else {
                      $$i > -1 &&
                        (_vm.showPasswords = $$a
                          .slice(0, $$i)
                          .concat($$a.slice($$i + 1)))
                    }
                  } else {
                    _vm.showPasswords = $$c
                  }
                }
              }
            }),
            _vm._v(_vm._s(_vm.$t("allpasswords_show_passwords")))
          ])
        ])
      ]),
      _c("div", { staticClass: "intro" }, [
        _vm._v(_vm._s(_vm.$t("allpasswords_intro")))
      ]),
      _c("site-list", {
        ref: "siteList",
        attrs: {
          "show-notes": _vm.showNotes,
          "show-passwords": _vm.confirmedPasswords && _vm.showPasswords
        }
      })
    ],
    1
  )
}
var Appvue_type_template_id_63a462b4_staticRenderFns = []
Appvue_type_template_id_63a462b4_render._withStripped = true


// CONCATENATED MODULE: ./ui/allpasswords/App.vue?vue&type=template&id=63a462b4&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/allpasswords/components/GlobalActions.vue?vue&type=template&id=a5878ba8&
var GlobalActionsvue_type_template_id_a5878ba8_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "global-actions" },
    [
      _c("a", {
        staticClass: "export",
        attrs: { href: "#", title: _vm.$t("allpasswords_export") },
        on: {
          click: function($event) {
            $event.preventDefault()
            return _vm.exportData($event)
          }
        }
      }),
      _c("a", {
        staticClass: "import",
        attrs: { href: "#", title: _vm.$t("allpasswords_import") },
        on: {
          click: function($event) {
            $event.preventDefault()
            return _vm.selectImportFile($event)
          }
        }
      }),
      _c("a", {
        staticClass: "print",
        attrs: { href: "#", title: _vm.$t("allpasswords_print") },
        on: {
          click: function($event) {
            $event.preventDefault()
            return _vm.printPage($event)
          }
        }
      }),
      _c("input", {
        ref: "importFile",
        attrs: {
          type: "file",
          accept: "application/json,text/csv",
          hidden: ""
        },
        on: { change: _vm.importFileSelected }
      }),
      _c("iframe", { ref: "frame", staticClass: "exportDataFrame" }),
      _vm.enterMasterCallback
        ? _c("enter-master", {
            attrs: {
              warning: _vm.$t("allpasswords_import_with_master"),
              callback: _vm.enterMasterCallback
            },
            on: {
              cancel: function($event) {
                _vm.enterMasterCallback = null
              }
            }
          })
        : _vm._e()
    ],
    1
  )
}
var GlobalActionsvue_type_template_id_a5878ba8_staticRenderFns = []
GlobalActionsvue_type_template_id_a5878ba8_render._withStripped = true


// CONCATENATED MODULE: ./ui/allpasswords/components/GlobalActions.vue?vue&type=template&id=a5878ba8&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/allpasswords/modals/EnterMaster.vue?vue&type=template&id=103845fc&
var EnterMastervue_type_template_id_103845fc_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "modal-overlay",
    {
      on: {
        cancel: function($event) {
          return _vm.$emit("cancel", false)
        }
      }
    },
    [
      _c(
        "validated-form",
        {
          staticClass: "modal-form",
          on: { validated: _vm.submit },
          nativeOn: {
            reset: function($event) {
              $event.preventDefault()
              return _vm.$emit("cancel", false)
            }
          }
        },
        [
          _vm.warning
            ? _c("div", { staticClass: "warning" }, [
                _vm._v(_vm._s(_vm.warning))
              ])
            : _vm._e(),
          _c("label", { attrs: { for: "master-password" } }, [
            _vm._v(_vm._s(_vm.$t("master_password")))
          ]),
          _c("validated-input", {
            directives: [{ name: "focus", rawName: "v-focus" }],
            attrs: { id: "master-password", type: "password" },
            on: { validate: _vm.validateMasterPassword },
            model: {
              value: _vm.masterPassword,
              callback: function($$v) {
                _vm.masterPassword = $$v
              },
              expression: "masterPassword"
            }
          }),
          _vm.masterPassword.error
            ? _c("div", { staticClass: "error" }, [
                _vm._v(" " + _vm._s(_vm.masterPassword.error) + " ")
              ])
            : _vm._e(),
          _c("div", { staticClass: "button-container" }, [
            _c("button", { attrs: { type: "submit" } }, [
              _vm._v(_vm._s(_vm.$t("enter_master_submit")))
            ]),
            _c("button", { attrs: { type: "reset" } }, [
              _vm._v(_vm._s(_vm.$t("cancel")))
            ])
          ])
        ],
        1
      )
    ],
    1
  )
}
var EnterMastervue_type_template_id_103845fc_staticRenderFns = []
EnterMastervue_type_template_id_103845fc_render._withStripped = true


// CONCATENATED MODULE: ./ui/allpasswords/modals/EnterMaster.vue?vue&type=template&id=103845fc&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/allpasswords/modals/EnterMaster.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var modals_EnterMastervue_type_script_lang_js_ = ({
  name: "EnterMaster",
  props: {
    callback: {
      type: Function,
      "default": null
    },
    warning: {
      type: String,
      "default": null
    }
  },
  data: function data() {
    return {
      masterPassword: {
        value: ""
      }
    };
  },
  methods: {
    submit: function submit() {
      var _this = this;

      if (this.callback) {
        this.callback(this.masterPassword.value);
        this.$emit("cancel", true);
      } else {
        masterPassword.checkPassword(this.masterPassword.value).then(function () {
          _this.$emit("cancel", true);
        })["catch"](function (error) {
          if (error == "declined") _this.masterPassword.error = _this.$t("password_declined");else _this.$app.showUnknownError(error);
        });
      }
    },
    validateMasterPassword: validateMasterPassword
  }
});
// CONCATENATED MODULE: ./ui/allpasswords/modals/EnterMaster.vue?vue&type=script&lang=js&
 /* harmony default export */ var allpasswords_modals_EnterMastervue_type_script_lang_js_ = (modals_EnterMastervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/allpasswords/modals/EnterMaster.vue





/* normalize component */

var modals_EnterMaster_component = normalizeComponent(
  allpasswords_modals_EnterMastervue_type_script_lang_js_,
  EnterMastervue_type_template_id_103845fc_render,
  EnterMastervue_type_template_id_103845fc_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var modals_EnterMaster_api; }
modals_EnterMaster_component.options.__file = "ui/allpasswords/modals/EnterMaster.vue"
/* harmony default export */ var modals_EnterMaster = (modals_EnterMaster_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/allpasswords/components/GlobalActions.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var GlobalActionsvue_type_script_lang_js_ = ({
  name: "GlobalActions",
  components: {
    "enter-master": modals_EnterMaster
  },
  data: function data() {
    return {
      enterMasterCallback: null
    };
  },
  methods: {
    exportData: function exportData() {
      var _this = this;

      passwords.exportPasswordData().then(function (data) {
        // See https://bugzil.la/1379960, in Firefox this will only work with a
        // link inside a frame.
        var frameDoc = _this.$refs.frame.contentDocument;
        var link = frameDoc.body.lastChild;

        if (!link || link.localName != "a") {
          link = frameDoc.createElement("a");
          frameDoc.body.appendChild(link);
        }

        var blob = new Blob([data], {
          type: "application/json"
        });
        link.href = URL.createObjectURL(blob);
        link.download = "passwords-backup-" + new Date().toISOString().replace(/T.*/, "") + ".json";
        link.click();
      })["catch"](this.$app.showUnknownError);
    },
    selectImportFile: function selectImportFile() {
      this.$refs.importFile.click();
    },
    importFileSelected: function importFileSelected(event) {
      var _this2 = this;

      var reader = new FileReader();

      reader.onload = function () {
        _this2.$app.confirm(_this2.$t("allpasswords_import_confirm")).then(function (accepted) {
          if (accepted) _this2.doImport(reader.result);
        });
      };

      reader.readAsText(event.target.files[0]);
      event.target.value = "";
    },
    doImport: function doImport(data, masterPass) {
      var _this3 = this;

      this.$app.inProgress = true;
      passwords.importPasswordData(data, masterPass).then(function () {
        _this3.$app.inProgress = false;

        _this3.$app.showGlobalMessage("allpasswords_import_success");

        _this3.$app.updateData();
      })["catch"](function (error) {
        _this3.$app.inProgress = false;
        if (error == "wrong_master_password") _this3.enterMasterCallback = function (newMaster) {
          return _this3.doImport(data, newMaster);
        };else _this3.$app.showUnknownError(error);
      });
    },
    printPage: function printPage() {
      window.print();
    }
  }
});
// CONCATENATED MODULE: ./ui/allpasswords/components/GlobalActions.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_GlobalActionsvue_type_script_lang_js_ = (GlobalActionsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/allpasswords/components/GlobalActions.vue





/* normalize component */

var GlobalActions_component = normalizeComponent(
  components_GlobalActionsvue_type_script_lang_js_,
  GlobalActionsvue_type_template_id_a5878ba8_render,
  GlobalActionsvue_type_template_id_a5878ba8_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var GlobalActions_api; }
GlobalActions_component.options.__file = "ui/allpasswords/components/GlobalActions.vue"
/* harmony default export */ var GlobalActions = (GlobalActions_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/allpasswords/components/SiteList.vue?vue&type=template&id=9a7520ba&
var SiteListvue_type_template_id_9a7520ba_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "list" },
    [
      _c("shortcuts", {
        attrs: { letters: _vm.getLetters(_vm.sites) },
        on: { clicked: _vm.scrollToSite }
      }),
      _vm._l(_vm.sites, function(site) {
        return _c("site-info", {
          key: site.site,
          ref: "site." + site.site,
          refInFor: true,
          attrs: {
            site: site,
            "show-notes": _vm.showNotes,
            "show-passwords": _vm.showPasswords
          },
          on: {
            removed: function($event) {
              return _vm.removeSite(site)
            }
          }
        })
      })
    ],
    2
  )
}
var SiteListvue_type_template_id_9a7520ba_staticRenderFns = []
SiteListvue_type_template_id_9a7520ba_render._withStripped = true


// CONCATENATED MODULE: ./ui/allpasswords/components/SiteList.vue?vue&type=template&id=9a7520ba&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/allpasswords/components/Shortcuts.vue?vue&type=template&id=465c82bf&
var Shortcutsvue_type_template_id_465c82bf_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "keyboard-navigation",
          rawName: "v-keyboard-navigation",
          value: _vm.shortcut - _vm.letter,
          expression: "shortcut-letter"
        }
      ],
      staticClass: "shortcuts"
    },
    _vm._l(_vm.letters, function(letter, index) {
      return _c(
        "a",
        {
          directives: [
            {
              name: "focus",
              rawName: "v-focus",
              value: index == 0,
              expression: "index == 0"
            }
          ],
          key: letter.letter,
          staticClass: "shortcut-letter",
          attrs: { href: "#" },
          on: {
            click: function($event) {
              $event.preventDefault()
              return _vm.$emit("clicked", letter.param)
            }
          }
        },
        [_vm._v(_vm._s(letter.letter))]
      )
    }),
    0
  )
}
var Shortcutsvue_type_template_id_465c82bf_staticRenderFns = []
Shortcutsvue_type_template_id_465c82bf_render._withStripped = true


// CONCATENATED MODULE: ./ui/allpasswords/components/Shortcuts.vue?vue&type=template&id=465c82bf&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/allpasswords/components/Shortcuts.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var Shortcutsvue_type_script_lang_js_ = ({
  name: "Shortcuts",
  props: {
    letters: {
      type: Array,
      required: true
    }
  }
});
// CONCATENATED MODULE: ./ui/allpasswords/components/Shortcuts.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Shortcutsvue_type_script_lang_js_ = (Shortcutsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/allpasswords/components/Shortcuts.vue





/* normalize component */

var Shortcuts_component = normalizeComponent(
  components_Shortcutsvue_type_script_lang_js_,
  Shortcutsvue_type_template_id_465c82bf_render,
  Shortcutsvue_type_template_id_465c82bf_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var Shortcuts_api; }
Shortcuts_component.options.__file = "ui/allpasswords/components/Shortcuts.vue"
/* harmony default export */ var Shortcuts = (Shortcuts_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/allpasswords/components/SiteInfo.vue?vue&type=template&id=6d2b9bb3&
var SiteInfovue_type_template_id_6d2b9bb3_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "site-container" },
    [
      _c(
        "div",
        { staticClass: "site-name" },
        [
          _vm.$isWebClient
            ? _c(
                "a",
                {
                  attrs: { href: "#" },
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      return _vm.goToSite($event)
                    }
                  }
                },
                [_vm._v(_vm._s(_vm.displayName))]
              )
            : [_vm._v(_vm._s(_vm.displayName))]
        ],
        2
      ),
      _vm.site.aliases.length
        ? _c("div", [
            _c("span", [_vm._v(_vm._s(_vm.$t("allpasswords_aliases")))]),
            _c("span", [
              _vm._v(
                _vm._s(
                  _vm.site.aliases
                    .slice()
                    .sort()
                    .join(", ")
                )
              )
            ])
          ])
        : _vm._e(),
      _vm._l(_vm.site.passwords, function(password) {
        return _c("password-info", {
          key: password.name,
          ref: "password",
          refInFor: true,
          attrs: {
            password: password,
            "site-display-name": _vm.displayName,
            "show-notes": _vm.showNotes,
            "show-passwords": _vm.showPasswords
          },
          on: {
            removed: function($event) {
              return _vm.removePassword(password)
            }
          }
        })
      })
    ],
    2
  )
}
var SiteInfovue_type_template_id_6d2b9bb3_staticRenderFns = []
SiteInfovue_type_template_id_6d2b9bb3_render._withStripped = true


// CONCATENATED MODULE: ./ui/allpasswords/components/SiteInfo.vue?vue&type=template&id=6d2b9bb3&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/allpasswords/components/PasswordInfo.vue?vue&type=template&id=6765f007&
var PasswordInfovue_type_template_id_6765f007_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "password-info-container" },
    [
      _c("password-message", {
        ref: "password-message",
        attrs: {
          messages: {
            password_ready_message: false,
            password_copied_message: true
          }
        }
      }),
      _c("div", { staticClass: "password-container" }, [
        _c("a", {
          ref: "to-clipboard",
          staticClass: "to-clipboard-link",
          attrs: { href: "#", title: _vm.$t("to_clipboard") },
          on: {
            click: function($event) {
              $event.preventDefault()
              return _vm.copy($event)
            }
          }
        }),
        _c("span", { staticClass: "user-name-container" }, [
          _c("span", { staticClass: "user-name" }, [
            _vm._v(_vm._s(_vm.password.name))
          ]),
          _vm.password.revision
            ? _c("span", { staticClass: "password-revision" }, [
                _vm._v(_vm._s(_vm.password.revision))
              ])
            : _vm._e()
        ]),
        _vm.showPasswords && _vm.value
          ? _c("span", { staticClass: "password-value" }, [
              _vm._v(_vm._s(_vm.value))
            ])
          : _vm._e(),
        _c("a", {
          staticClass: "password-remove-link",
          attrs: { href: "#", title: _vm.$t("remove_password") },
          on: {
            click: function($event) {
              $event.preventDefault()
              return _vm.removePassword($event)
            }
          }
        })
      ]),
      _c(
        "div",
        { staticClass: "password-info" },
        [
          _vm.password.type == "generated2"
            ? [
                _c("div", { staticClass: "password-type" }, [
                  _vm._v(_vm._s(_vm.$t("password_type_generated2")) + " ")
                ]),
                _c("div", [
                  _vm._v(
                    _vm._s(_vm.$t("password_length")) +
                      " " +
                      _vm._s(_vm.password.length)
                  )
                ]),
                _c("div", [
                  _vm._v(
                    _vm._s(_vm.$t("allowed_characters")) +
                      " " +
                      _vm._s(_vm.allowedChars)
                  )
                ])
              ]
            : _vm.password.type == "stored"
            ? [
                _c("div", { staticClass: "password-type" }, [
                  _vm._v(
                    _vm._s(_vm.$t("password_type_stored_with_recovery")) + " "
                  ),
                  _c("span", {
                    staticClass: "help-icon",
                    attrs: { title: _vm.$t("recovery_code_explanation") }
                  })
                ]),
                _vm.recoveryCode
                  ? _c("pre", [_vm._v(_vm._s(_vm.recoveryCode))])
                  : _vm._e()
              ]
            : _vm._e(),
          _vm.showNotes && _vm.password.notes
            ? _c("div", [
                _vm._v(
                  _vm._s(_vm.$t("password_info_notes")) +
                    " " +
                    _vm._s(_vm.password.notes)
                )
              ])
            : _vm._e()
        ],
        2
      )
    ],
    1
  )
}
var PasswordInfovue_type_template_id_6765f007_staticRenderFns = []
PasswordInfovue_type_template_id_6765f007_render._withStripped = true


// CONCATENATED MODULE: ./ui/allpasswords/components/PasswordInfo.vue?vue&type=template&id=6765f007&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/allpasswords/components/PasswordInfo.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var PasswordInfovue_type_script_lang_js_ = ({
  name: "PasswordInfo",
  components: {
    "password-message": PasswordMessage
  },
  props: {
    password: {
      type: Object,
      required: true
    },
    siteDisplayName: {
      type: String,
      required: true
    },
    showNotes: {
      type: Boolean,
      required: true
    },
    showPasswords: {
      type: Boolean,
      required: true
    }
  },
  data: function data() {
    return {
      value: null,
      recoveryCode: null
    };
  },
  computed: {
    allowedChars: function allowedChars() {
      var chars = [];
      if (this.password.lower) chars.push("abc");
      if (this.password.upper) chars.push("XYZ");
      if (this.password.number) chars.push("789");
      if (this.password.symbol) chars.push("+^;");
      return chars.join(" ");
    }
  },
  watch: {
    showPasswords: function showPasswords() {
      if (this.showPasswords) this.ensureValue()["catch"](this.showPasswordMessage);
    }
  },
  mounted: function mounted() {
    var _this = this;

    if (this.password.type == "stored" && !this.recoveryCode) {
      recoveryCodes.getCode(this.password).then(function (code) {
        _this.recoveryCode = code;
      })["catch"](this.showPasswordMessage);
    }
  },
  methods: {
    ensureValue: function ensureValue() {
      var _this2 = this;

      if (this.value) return Promise.resolve();
      return passwords.getPassword(this.password).then(function (value) {
        _this2.value = value;
      });
    },
    showPasswordMessage: function showPasswordMessage(message) {
      this.$refs["password-message"].message = message;
    },
    copy: function copy() {
      var _this3 = this;

      var doCopy = function doCopy() {
        set(_this3.value);

        _this3.showPasswordMessage("password_copied_message");
      };

      if (this.value) doCopy();else {
        this.ensureValue().then(function () {
          if (!_this3.$isWebClient) doCopy();else {
            _this3.showPasswordMessage("password_ready_message");

            var handler = function handler(event) {
              window.removeEventListener("click", handler, true);
              event.stopPropagation();
              event.preventDefault();
              doCopy();
            };

            window.addEventListener("click", handler, true);
          }
        })["catch"](this.showPasswordMessage);
      }
    },
    removePassword: function removePassword() {
      var _this4 = this;

      var message = this.$t("remove_password_confirmation", this.password.name, this.siteDisplayName);
      if (this.password.notes) message += " " + this.$t("remove_password_confirmation_notes", this.password.notes);
      this.$app.confirm(message).then(function (accepted) {
        if (!accepted) return;
        passwords.removePassword(_this4.password).then(function () {
          _this4.$emit("removed");
        })["catch"](_this4.showPasswordMessage);
      });
    },
    activate: function activate() {
      this.$refs["to-clipboard"].focus();
    }
  }
});
// CONCATENATED MODULE: ./ui/allpasswords/components/PasswordInfo.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_PasswordInfovue_type_script_lang_js_ = (PasswordInfovue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/allpasswords/components/PasswordInfo.vue





/* normalize component */

var PasswordInfo_component = normalizeComponent(
  components_PasswordInfovue_type_script_lang_js_,
  PasswordInfovue_type_template_id_6765f007_render,
  PasswordInfovue_type_template_id_6765f007_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var PasswordInfo_api; }
PasswordInfo_component.options.__file = "ui/allpasswords/components/PasswordInfo.vue"
/* harmony default export */ var PasswordInfo = (PasswordInfo_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/allpasswords/components/SiteInfo.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ var SiteInfovue_type_script_lang_js_ = ({
  name: "SiteInfo",
  components: {
    "password-info": PasswordInfo
  },
  props: {
    site: {
      type: Object,
      required: true
    },
    showNotes: {
      type: Boolean,
      required: true
    },
    showPasswords: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    displayName: function displayName() {
      return getSiteDisplayName(this.site.site);
    }
  },
  methods: {
    goToSite: function goToSite() {
      window.dispatchEvent(new CustomEvent("show-panel", {
        detail: this.site.site
      }));
    },
    removePassword: function removePassword(password) {
      var passwords = this.site.passwords;
      var index = passwords.indexOf(password);
      if (index >= 0) passwords.splice(index, 1);
      if (!passwords.length) this.$emit("removed");
    },
    activate: function activate() {
      this.$el.scrollIntoView(true);
      this.$refs.password[0].activate();
    }
  }
});
// CONCATENATED MODULE: ./ui/allpasswords/components/SiteInfo.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SiteInfovue_type_script_lang_js_ = (SiteInfovue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/allpasswords/components/SiteInfo.vue





/* normalize component */

var SiteInfo_component = normalizeComponent(
  components_SiteInfovue_type_script_lang_js_,
  SiteInfovue_type_template_id_6d2b9bb3_render,
  SiteInfovue_type_template_id_6d2b9bb3_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var SiteInfo_api; }
SiteInfo_component.options.__file = "ui/allpasswords/components/SiteInfo.vue"
/* harmony default export */ var SiteInfo = (SiteInfo_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/allpasswords/components/SiteList.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ var SiteListvue_type_script_lang_js_ = ({
  name: "SiteList",
  components: {
    "shortcuts": Shortcuts,
    "site-info": SiteInfo
  },
  props: {
    showNotes: {
      type: Boolean,
      required: true
    },
    showPasswords: {
      type: Boolean,
      required: true
    }
  },
  data: function data() {
    return {
      sites: []
    };
  },
  mounted: function mounted() {
    this.updateData();
  },
  methods: {
    updateData: function updateData() {
      var _this = this;

      passwords.getAllPasswords().then(function (sites) {
        var siteNames = Object.keys(sites);
        siteNames.sort();
        {
          var index = siteNames.indexOf("pfp.invalid");

          if (index >= 0) {
            siteNames.splice(index, 1);
            siteNames.unshift("pfp.invalid");
          }
        }
        var siteList = [];

        for (var _i = 0, _siteNames = siteNames; _i < _siteNames.length; _i++) {
          var name = _siteNames[_i];
          siteList.push(sites[name]);
        }

        _this.sites = siteList;
      })["catch"](this.$app.showUnknownError);
    },
    getLetters: function getLetters(sites) {
      var letters = [];
      var currentLetter = null;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = sites[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var site = _step.value;
          var letter = getSiteDisplayName(site.site).toUpperCase()[0];

          if (letter != currentLetter && letter != "(") {
            currentLetter = letter;
            letters.push({
              letter: letter,
              param: site.site
            });
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

      return letters;
    },
    scrollToSite: function scrollToSite(site) {
      this.$refs["site." + site][0].activate();
    },
    removeSite: function removeSite(site) {
      var index = this.sites.indexOf(site);
      if (index >= 0) this.sites.splice(index, 1);
    }
  }
});
// CONCATENATED MODULE: ./ui/allpasswords/components/SiteList.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_SiteListvue_type_script_lang_js_ = (SiteListvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/allpasswords/components/SiteList.vue





/* normalize component */

var SiteList_component = normalizeComponent(
  components_SiteListvue_type_script_lang_js_,
  SiteListvue_type_template_id_9a7520ba_render,
  SiteListvue_type_template_id_9a7520ba_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var SiteList_api; }
SiteList_component.options.__file = "ui/allpasswords/components/SiteList.vue"
/* harmony default export */ var SiteList = (SiteList_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ui/allpasswords/modals/InProgress.vue?vue&type=template&id=5c272c80&
var InProgressvue_type_template_id_5c272c80_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("modal-overlay", { attrs: { cancelable: false } }, [
    _c("div", { staticClass: "in-progress" }, [
      _c("div", { staticClass: "spinning-wheel" })
    ])
  ])
}
var InProgressvue_type_template_id_5c272c80_staticRenderFns = []
InProgressvue_type_template_id_5c272c80_render._withStripped = true


// CONCATENATED MODULE: ./ui/allpasswords/modals/InProgress.vue?vue&type=template&id=5c272c80&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/allpasswords/modals/InProgress.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var InProgressvue_type_script_lang_js_ = ({
  name: "InProgress"
});
// CONCATENATED MODULE: ./ui/allpasswords/modals/InProgress.vue?vue&type=script&lang=js&
 /* harmony default export */ var modals_InProgressvue_type_script_lang_js_ = (InProgressvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/allpasswords/modals/InProgress.vue





/* normalize component */

var InProgress_component = normalizeComponent(
  modals_InProgressvue_type_script_lang_js_,
  InProgressvue_type_template_id_5c272c80_render,
  InProgressvue_type_template_id_5c272c80_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var InProgress_api; }
InProgress_component.options.__file = "ui/allpasswords/modals/InProgress.vue"
/* harmony default export */ var InProgress = (InProgress_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./ui/allpasswords/App.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//










/* harmony default export */ var allpasswords_Appvue_type_script_lang_js_ = ({
  name: "App",
  components: {
    "confirm": Confirm,
    "password-message": PasswordMessage,
    "unknown-error": UnknownError,
    "global-actions": GlobalActions,
    "site-list": SiteList,
    "enter-master": modals_EnterMaster,
    "in-progress": InProgress
  },
  data: function data() {
    return {
      inProgress: false,
      masterPromise: null,
      unknownError: null,
      showNotes: !("hideNotes" in window.localStorage),
      showPasswords: false,
      confirmedPasswords: false
    };
  },
  watch: {
    showNotes: function showNotes() {
      if (this.showNotes) delete window.localStorage.hideNotes;else window.localStorage.hideNotes = true;
    },
    showPasswords: function showPasswords() {
      var _this = this;

      if (this.showPasswords && !this.confirmedPasswords) {
        this.confirm(this.$t("allpasswords_show_confirm")).then(function (accepted) {
          if (accepted) _this.confirmedPasswords = true;else _this.showPasswords = false;
        });
      }
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    document.title = this.$t("allpasswords_title");
    setErrorHandler("master_password_required", function () {
      return new Promise(function (resolve, reject) {
        _this2.masterPromise = {
          resolve: resolve,
          reject: reject
        };
      });
    });
  },
  methods: {
    testUnknownError: function testUnknownError() {
      this.showUnknownError(new Error("Unexpected error triggered via Ctrl+E"));
    },
    confirm: function confirm(message) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var confirm = _this3.$refs.confirm;
        confirm.message = message;
        confirm.callback = resolve;
      });
    },
    enterMasterDone: function enterMasterDone(success) {
      var _this$masterPromise = this.masterPromise,
          resolve = _this$masterPromise.resolve,
          reject = _this$masterPromise.reject;
      this.masterPromise = null;
      if (success) resolve();else reject("canceled");
    },
    showGlobalMessage: function showGlobalMessage(message) {
      this.$refs["global-message"].message = message;
    },
    localize: function localize(error) {
      if (/\s/.test(error)) return error;
      return this.$t(error) || error;
    },
    showUnknownError: function showUnknownError(error) {
      if (error == "canceled") return;
      this.unknownError = this.localize(error);
    },
    updateData: function updateData() {
      this.$refs.siteList.updateData();
    }
  }
});
// CONCATENATED MODULE: ./ui/allpasswords/App.vue?vue&type=script&lang=js&
 /* harmony default export */ var ui_allpasswords_Appvue_type_script_lang_js_ = (allpasswords_Appvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./ui/allpasswords/App.vue





/* normalize component */

var allpasswords_App_component = normalizeComponent(
  ui_allpasswords_Appvue_type_script_lang_js_,
  Appvue_type_template_id_63a462b4_render,
  Appvue_type_template_id_63a462b4_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var allpasswords_App_api; }
allpasswords_App_component.options.__file = "ui/allpasswords/App.vue"
/* harmony default export */ var allpasswords_App = (allpasswords_App_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2!./node_modules/vue-loader/lib??vue-loader-options!./web/App.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var lib_vue_loader_options_web_Appvue_type_script_lang_js_ = ({
  name: "App",
  components: {
    "panel-app": panel_App,
    "allpasswords-app": allpasswords_App
  },
  data: function data() {
    return {
      browserSupported: true,
      currentPage: ""
    };
  },
  watch: {
    currentPage: function currentPage() {
      window.dispatchEvent(new CustomEvent("port-connected", {
        detail: this.currentPage
      }));
    }
  },
  mounted: function mounted() {
    var _this = this;

    Promise.resolve().then(function () {
      if (!"asdf".includes("d")) throw new Error("String.includes() returned unexpected result");
      if (![1, 2, 3, 4].includes(3)) throw new Error("Array.includes() returned unexpected result");
      if (new KeyboardEvent("keydown", {
        key: "Escape"
      }).key != "Escape") throw new Error("KeyboardEvent() returned unexpected result");
      return crypto.subtle.importKey("raw", new Uint8Array(16), "AES-GCM", false, ["encrypt"]);
    })["catch"](function (error) {
      _this.browserSupported = false;
      console.log(error);
    });
    window.addEventListener("show-panel", function () {
      _this.currentPage = "panel";
    });
    window.addEventListener("show-allpasswords", function () {
      _this.currentPage = "allpasswords";
    });
    this.currentPage = "panel";
    document.getElementById("loading").remove();
  }
});
// CONCATENATED MODULE: ./web/App.vue?vue&type=script&lang=js&
 /* harmony default export */ var web_Appvue_type_script_lang_js_ = (lib_vue_loader_options_web_Appvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./web/App.vue





/* normalize component */

var web_App_component = normalizeComponent(
  web_Appvue_type_script_lang_js_,
  Appvue_type_template_id_19c0bea8_render,
  Appvue_type_template_id_19c0bea8_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var web_App_api; }
web_App_component.options.__file = "web/App.vue"
/* harmony default export */ var web_App = (web_App_component.exports);
// CONCATENATED MODULE: ./web/index.js
/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */




runApp(web_App, true);

/***/ })
/******/ ]);