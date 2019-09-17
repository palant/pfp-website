'use strict';function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}/*
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
};function scryptWorker () {
  /*
  * This Source Code is subject to the terms of the Mozilla Public License
  * version 2.0 (the "License"). You can obtain a copy of the License at
  * http://mozilla.org/MPL/2.0/.
  */

  function toTypedArray(obj) {
    return obj;
  }

  function unwrapExports(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
    return module = {
      exports: {}
    }, fn(module, module.exports), module.exports;
  }

  var hash = createCommonjsModule(function (module, exports) {
    // MIT License. See LICENSE file for details.
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    function isSerializableHash(h) {
      return typeof h.saveState !== "undefined" && typeof h.restoreState !== "undefined" && typeof h.cleanSavedState !== "undefined";
    }

    exports.isSerializableHash = isSerializableHash; // TODO(dchest): figure out the standardized interface for XOF such as
    // SHAKE and BLAKE2X.
  });
  unwrapExports(hash);
  var hash_1 = hash.isSerializableHash;
  var constantTime = createCommonjsModule(function (module, exports) {
    // MIT License. See LICENSE file for details.
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    /**
     * NOTE! Due to the inability to guarantee real constant time evaluation of
     * anything in JavaScript VM, this is module is the best effort.
     */

    /**
     * Returns resultIfOne if subject is 1, or resultIfZero if subject is 0.
     *
     * Supports only 32-bit integers, so resultIfOne or resultIfZero are not
     * integers, they'll be converted to them with bitwise operations.
     */

    function select(subject, resultIfOne, resultIfZero) {
      return ~(subject - 1) & resultIfOne | subject - 1 & resultIfZero;
    }

    exports.select = select;
    /**
     * Returns 1 if a <= b, or 0 if not.
     * Arguments must be positive 32-bit integers less than or equal to 2^31 - 1.
     */

    function lessOrEqual(a, b) {
      return (a | 0) - (b | 0) - 1 >>> 31 & 1;
    }

    exports.lessOrEqual = lessOrEqual;
    /**
     * Returns 1 if a and b are of equal length and their contents
     * are equal, or 0 otherwise.
     *
     * Note that unlike in equal(), zero-length inputs are considered
     * the same, so this function will return 1.
     */

    function compare(a, b) {
      if (a.length !== b.length) {
        return 0;
      }

      var result = 0;

      for (var i = 0; i < a.length; i++) {
        result |= a[i] ^ b[i];
      }

      return 1 & result - 1 >>> 8;
    }

    exports.compare = compare;
    /**
     * Returns true if a and b are of equal non-zero length,
     * and their contents are equal, or false otherwise.
     *
     * Note that unlike in compare() zero-length inputs are considered
     * _not_ equal, so this function will return false.
     */

    function equal(a, b) {
      if (a.length === 0 || b.length === 0) {
        return false;
      }

      return compare(a, b) !== 0;
    }

    exports.equal = equal;
  });
  unwrapExports(constantTime);
  var constantTime_1 = constantTime.select;
  var constantTime_2 = constantTime.lessOrEqual;
  var constantTime_3 = constantTime.compare;
  var constantTime_4 = constantTime.equal;
  var wipe_1 = createCommonjsModule(function (module, exports) {
    // MIT License. See LICENSE file for details.
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    /**
     * Sets all values in the given array to zero and returns it.
     *
     * The fact that it sets bytes to zero can be relied on.
     *
     * There is no guarantee that this function makes data disappear from memory,
     * as runtime implementation can, for example, have copying garbage collector
     * that will make copies of sensitive data before we wipe it. Or that an
     * operating system will write our data to swap or sleep image. Another thing
     * is that an optimizing compiler can remove calls to this function or make it
     * no-op. There's nothing we can do with it, so we just do our best and hope
     * that everything will be okay and good will triumph over evil.
     */

    function wipe(array) {
      // Right now it's similar to array.fill(0). If it turns
      // out that runtimes optimize this call away, maybe
      // we can try something else.
      for (var i = 0; i < array.length; i++) {
        array[i] = 0;
      }

      return array;
    }

    exports.wipe = wipe;
  });
  unwrapExports(wipe_1);
  var wipe_2 = wipe_1.wipe;
  var hmac_1 = createCommonjsModule(function (module, exports) {
    // MIT License. See LICENSE file for details.
    Object.defineProperty(exports, "__esModule", {
      value: true
    }); // HMAC implements hash-based message authentication algorithm.

    var HMAC = function () {
      function HMAC(hash$1, key) {
        // Initialize inner and outer hashes.
        this._inner = new hash$1();
        this._outer = new hash$1(); // Set block and digest sizes for this HMAC
        // instance to values from the hash.

        this.blockSize = this._outer.blockSize;
        this.digestLength = this._outer.digestLength; // Pad temporary stores a key (or its hash) padded with zeroes.

        var pad = new Uint8Array(this.blockSize);

        if (key.length > this.blockSize) {
          // If key is bigger than hash block size, it must be
          // hashed and this hash is used as a key instead.
          this._inner.update(key).finish(pad).clean();
        } else {
          // Otherwise, copy the key into pad.
          pad.set(key);
        } // Now two different keys are derived from padded key
        // by xoring a different byte value to each.
        // To make inner hash key, xor byte 0x36 into pad.


        for (var i = 0; i < pad.length; i++) {
          pad[i] ^= 0x36;
        } // Update inner hash with the result.


        this._inner.update(pad); // To make outer hash key, xor byte 0x5c into pad.
        // But since we already xored 0x36 there, we must
        // first undo this by xoring it again.


        for (var i = 0; i < pad.length; i++) {
          pad[i] ^= 0x36 ^ 0x5c;
        } // Update outer hash with the result.


        this._outer.update(pad); // Save states of both hashes, so that we can quickly restore
        // them later in reset() without the need to remember the actual
        // key and perform this initialization again.


        if (hash.isSerializableHash(this._inner) && hash.isSerializableHash(this._outer)) {
          this._innerKeyedState = this._inner.saveState();
          this._outerKeyedState = this._outer.saveState();
        } // Clean pad.


        wipe_1.wipe(pad);
      } // Returns HMAC state to the state initialized with key
      // to make it possible to run HMAC over the other data with the same
      // key without creating a new instance.


      HMAC.prototype.reset = function () {
        if (!hash.isSerializableHash(this._inner) || !hash.isSerializableHash(this._outer)) {
          throw new Error("hmac: can't reset() because hash doesn't implement restoreState()");
        } // Restore keyed states of inner and outer hashes.


        this._inner.restoreState(this._innerKeyedState);

        this._outer.restoreState(this._outerKeyedState);

        this._finished = false;
        return this;
      }; // Cleans HMAC state.


      HMAC.prototype.clean = function () {
        if (hash.isSerializableHash(this._inner)) {
          this._inner.cleanSavedState(this._innerKeyedState);
        }

        if (hash.isSerializableHash(this._outer)) {
          this._outer.cleanSavedState(this._outerKeyedState);
        }

        this._inner.clean();

        this._outer.clean();
      }; // Updates state with provided data.


      HMAC.prototype.update = function (data) {
        this._inner.update(data);

        return this;
      }; // Finalizes HMAC and puts the result in out.


      HMAC.prototype.finish = function (out) {
        if (this._finished) {
          // If HMAC was finalized, outer hash is also finalized,
          // so it produces the same digest it produced when it
          // was finalized.
          this._outer.finish(out);

          return this;
        } // Finalize inner hash and store the result temporarily.


        this._inner.finish(out); // Update outer hash with digest of inner hash and and finalize it.


        this._outer.update(out.subarray(0, this.digestLength)).finish(out);

        this._finished = true;
        return this;
      }; // Returns message authentication code.


      HMAC.prototype.digest = function () {
        var out = new Uint8Array(this.digestLength);
        this.finish(out);
        return out;
      }; // Saves HMAC state.
      // This function is needed for PBKDF2 optimization.


      HMAC.prototype.saveState = function () {
        if (!hash.isSerializableHash(this._inner)) {
          throw new Error("hmac: can't saveState() because hash doesn't implement it");
        }

        return this._inner.saveState();
      };

      HMAC.prototype.restoreState = function (savedState) {
        if (!hash.isSerializableHash(this._inner) || !hash.isSerializableHash(this._outer)) {
          throw new Error("hmac: can't restoreState() because hash doesn't implement it");
        }

        this._inner.restoreState(savedState);

        this._outer.restoreState(this._outerKeyedState);

        this._finished = false;
        return this;
      };

      HMAC.prototype.cleanSavedState = function (savedState) {
        if (!hash.isSerializableHash(this._inner)) {
          throw new Error("hmac: can't cleanSavedState() because hash doesn't implement it");
        }

        this._inner.cleanSavedState(savedState);
      };

      return HMAC;
    }();

    exports.HMAC = HMAC;
    /**
     * Returns HMAC using the given hash constructor for the key over data.
     */

    function hmac(hash, key, data) {
      var h = new HMAC(hash, key);
      h.update(data);
      var digest = h.digest();
      h.clean();
      return digest;
    }

    exports.hmac = hmac;
    /**
     * Returns true if two HMAC digests are equal.
     * Uses contant-time comparison to avoid leaking timing information.
     *
     * Example:
     *
     *    const receivedDigest = ...
     *    const realDigest = hmac(SHA256, key, data);
     *    if (!equal(receivedDigest, realDigest)) {
     *        throw new Error("Authentication error");
     *    }
     */

    exports.equal = constantTime.equal;
  });
  unwrapExports(hmac_1);
  var hmac_2 = hmac_1.HMAC;
  var hmac_3 = hmac_1.hmac;
  var hmac_4 = hmac_1.equal;
  var int_1 = createCommonjsModule(function (module, exports) {
    // MIT License. See LICENSE file for details.
    Object.defineProperty(exports, "__esModule", {
      value: true
    }); // Shim using 16-bit pieces.

    function imulShim(a, b) {
      var ah = a >>> 16 & 0xffff,
          al = a & 0xffff;
      var bh = b >>> 16 & 0xffff,
          bl = b & 0xffff;
      return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
    }
    /** 32-bit integer multiplication.  */
    // Use system Math.imul if available, otherwise use our shim.


    exports.mul = Math.imul || imulShim;
    /** 32-bit integer addition.  */

    function add(a, b) {
      return a + b | 0;
    }

    exports.add = add;
    /**  32-bit integer subtraction.  */

    function sub(a, b) {
      return a - b | 0;
    }

    exports.sub = sub;
    /** 32-bit integer left rotation */

    function rotl(x, n) {
      return x << n | x >>> 32 - n;
    }

    exports.rotl = rotl;
    /** 32-bit integer left rotation */

    function rotr(x, n) {
      return x << 32 - n | x >>> n;
    }

    exports.rotr = rotr;

    function isIntegerShim(n) {
      return typeof n === "number" && isFinite(n) && Math.floor(n) === n;
    }
    /**
     * Returns true if the argument is an integer number.
     *
     * In ES2015, Number.isInteger.
     */


    exports.isInteger = Number.isInteger || isIntegerShim;
    /**
     *  Math.pow(2, 53) - 1
     *
     *  In ES2015 Number.MAX_SAFE_INTEGER.
     */

    exports.MAX_SAFE_INTEGER = 9007199254740991;
    /**
     * Returns true if the argument is a safe integer number
     * (-MIN_SAFE_INTEGER < number <= MAX_SAFE_INTEGER)
     *
     * In ES2015, Number.isSafeInteger.
     */

    exports.isSafeInteger = function (n) {
      return exports.isInteger(n) && n >= -exports.MAX_SAFE_INTEGER && n <= exports.MAX_SAFE_INTEGER;
    };
  });
  unwrapExports(int_1);
  var int_2 = int_1.mul;
  var int_3 = int_1.add;
  var int_4 = int_1.sub;
  var int_5 = int_1.rotl;
  var int_6 = int_1.rotr;
  var int_7 = int_1.isInteger;
  var int_8 = int_1.MAX_SAFE_INTEGER;
  var int_9 = int_1.isSafeInteger;
  var binary = createCommonjsModule(function (module, exports) {
    // MIT License. See LICENSE file for details.
    Object.defineProperty(exports, "__esModule", {
      value: true
    }); // TODO(dchest): add asserts for correct value ranges and array offsets.

    /**
     * Reads 2 bytes from array starting at offset as big-endian
     * signed 16-bit integer and returns it.
     */

    function readInt16BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }

      return (array[offset + 0] << 8 | array[offset + 1]) << 16 >> 16;
    }

    exports.readInt16BE = readInt16BE;
    /**
     * Reads 2 bytes from array starting at offset as big-endian
     * unsigned 16-bit integer and returns it.
     */

    function readUint16BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }

      return (array[offset + 0] << 8 | array[offset + 1]) >>> 0;
    }

    exports.readUint16BE = readUint16BE;
    /**
     * Reads 2 bytes from array starting at offset as little-endian
     * signed 16-bit integer and returns it.
     */

    function readInt16LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }

      return (array[offset + 1] << 8 | array[offset]) << 16 >> 16;
    }

    exports.readInt16LE = readInt16LE;
    /**
     * Reads 2 bytes from array starting at offset as little-endian
     * unsigned 16-bit integer and returns it.
     */

    function readUint16LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }

      return (array[offset + 1] << 8 | array[offset]) >>> 0;
    }

    exports.readUint16LE = readUint16LE;
    /**
     * Writes 2-byte big-endian representation of 16-bit unsigned
     * value to byte array starting at offset.
     *
     * If byte array is not given, creates a new 2-byte one.
     *
     * Returns the output byte array.
     */

    function writeUint16BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(2);
      }

      if (offset === void 0) {
        offset = 0;
      }

      out[offset + 0] = value >>> 8;
      out[offset + 1] = value >>> 0;
      return out;
    }

    exports.writeUint16BE = writeUint16BE;
    exports.writeInt16BE = writeUint16BE;
    /**
     * Writes 2-byte little-endian representation of 16-bit unsigned
     * value to array starting at offset.
     *
     * If byte array is not given, creates a new 2-byte one.
     *
     * Returns the output byte array.
     */

    function writeUint16LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(2);
      }

      if (offset === void 0) {
        offset = 0;
      }

      out[offset + 0] = value >>> 0;
      out[offset + 1] = value >>> 8;
      return out;
    }

    exports.writeUint16LE = writeUint16LE;
    exports.writeInt16LE = writeUint16LE;
    /**
     * Reads 4 bytes from array starting at offset as big-endian
     * signed 32-bit integer and returns it.
     */

    function readInt32BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }

      return array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3];
    }

    exports.readInt32BE = readInt32BE;
    /**
     * Reads 4 bytes from array starting at offset as big-endian
     * unsigned 32-bit integer and returns it.
     */

    function readUint32BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }

      return (array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3]) >>> 0;
    }

    exports.readUint32BE = readUint32BE;
    /**
     * Reads 4 bytes from array starting at offset as little-endian
     * signed 32-bit integer and returns it.
     */

    function readInt32LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }

      return array[offset + 3] << 24 | array[offset + 2] << 16 | array[offset + 1] << 8 | array[offset];
    }

    exports.readInt32LE = readInt32LE;
    /**
     * Reads 4 bytes from array starting at offset as little-endian
     * unsigned 32-bit integer and returns it.
     */

    function readUint32LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }

      return (array[offset + 3] << 24 | array[offset + 2] << 16 | array[offset + 1] << 8 | array[offset]) >>> 0;
    }

    exports.readUint32LE = readUint32LE;
    /**
     * Writes 4-byte big-endian representation of 32-bit unsigned
     * value to byte array starting at offset.
     *
     * If byte array is not given, creates a new 4-byte one.
     *
     * Returns the output byte array.
     */

    function writeUint32BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(4);
      }

      if (offset === void 0) {
        offset = 0;
      }

      out[offset + 0] = value >>> 24;
      out[offset + 1] = value >>> 16;
      out[offset + 2] = value >>> 8;
      out[offset + 3] = value >>> 0;
      return out;
    }

    exports.writeUint32BE = writeUint32BE;
    exports.writeInt32BE = writeUint32BE;
    /**
     * Writes 4-byte little-endian representation of 32-bit unsigned
     * value to array starting at offset.
     *
     * If byte array is not given, creates a new 4-byte one.
     *
     * Returns the output byte array.
     */

    function writeUint32LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(4);
      }

      if (offset === void 0) {
        offset = 0;
      }

      out[offset + 0] = value >>> 0;
      out[offset + 1] = value >>> 8;
      out[offset + 2] = value >>> 16;
      out[offset + 3] = value >>> 24;
      return out;
    }

    exports.writeUint32LE = writeUint32LE;
    exports.writeInt32LE = writeUint32LE;
    /**
     * Reads 8 bytes from array starting at offset as big-endian
     * signed 64-bit integer and returns it.
     *
     * Due to JavaScript limitation, supports values up to 2^53-1.
     *
     * XXX: not constant-time.
     */

    function readInt64BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }

      var hi = readInt32BE(array, offset);
      var lo = readInt32BE(array, offset + 4);
      var result = hi * 0x100000000 + lo; // TODO(dchest): make constant-time.

      if (lo < 0) {
        result += 0x100000000;
      }

      return result;
    }

    exports.readInt64BE = readInt64BE;
    /**
     * Reads 8 bytes from array starting at offset as big-endian
     * unsigned 64-bit integer and returns it.
     *
     * Due to JavaScript limitation, supports values up to 2^53-1.
     */

    function readUint64BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }

      var hi = readUint32BE(array, offset);
      var lo = readUint32BE(array, offset + 4);
      return hi * 0x100000000 + lo;
    }

    exports.readUint64BE = readUint64BE;
    /**
     * Reads 8 bytes from array starting at offset as little-endian
     * signed 64-bit integer and returns it.
     *
     * Due to JavaScript limitation, supports values up to 2^53-1.
     *
     * XXX: not constant-time.
     */

    function readInt64LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }

      var lo = readInt32LE(array, offset);
      var hi = readInt32LE(array, offset + 4);
      var result = hi * 0x100000000 + lo; // TODO(dchest): make constant-time.

      if (lo < 0) {
        result += 0x100000000;
      }

      return result;
    }

    exports.readInt64LE = readInt64LE;
    /**
     * Reads 8 bytes from array starting at offset as little-endian
     * unsigned 64-bit integer and returns it.
     *
     * Due to JavaScript limitation, supports values up to 2^53-1.
     */

    function readUint64LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }

      var lo = readUint32LE(array, offset);
      var hi = readUint32LE(array, offset + 4);
      return hi * 0x100000000 + lo;
    }

    exports.readUint64LE = readUint64LE;
    /**
     * Writes 8-byte big-endian representation of 64-bit unsigned
     * value to byte array starting at offset.
     *
     * Due to JavaScript limitation, supports values up to 2^53-1.
     *
     * If byte array is not given, creates a new 8-byte one.
     *
     * Returns the output byte array.
     */

    function writeUint64BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(8);
      }

      if (offset === void 0) {
        offset = 0;
      }

      writeUint32BE(value / 0x100000000 >>> 0, out, offset);
      writeUint32BE(value >>> 0, out, offset + 4);
      return out;
    }

    exports.writeUint64BE = writeUint64BE;
    exports.writeInt64BE = writeUint64BE;
    /**
     * Writes 8-byte little-endian representation of 64-bit unsigned
     * value to byte array starting at offset.
     *
     * Due to JavaScript limitation, supports values up to 2^53-1.
     *
     * If byte array is not given, creates a new 8-byte one.
     *
     * Returns the output byte array.
     */

    function writeUint64LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(8);
      }

      if (offset === void 0) {
        offset = 0;
      }

      writeUint32LE(value >>> 0, out, offset);
      writeUint32LE(value / 0x100000000 >>> 0, out, offset + 4);
      return out;
    }

    exports.writeUint64LE = writeUint64LE;
    exports.writeInt64LE = writeUint64LE;
    /**
     * Reads bytes from array starting at offset as big-endian
     * unsigned bitLen-bit integer and returns it.
     *
     * Supports bit lengths divisible by 8, up to 48.
     */

    function readUintBE(bitLength, array, offset) {
      if (offset === void 0) {
        offset = 0;
      } // TODO(dchest): implement support for bitLenghts non-divisible by 8


      if (bitLength % 8 !== 0) {
        throw new Error("readUintBE supports only bitLengths divisible by 8");
      }

      if (bitLength / 8 > array.length - offset) {
        throw new Error("readUintBE: array is too short for the given bitLength");
      }

      var result = 0;
      var mul = 1;

      for (var i = bitLength / 8 + offset - 1; i >= offset; i--) {
        result += array[i] * mul;
        mul *= 256;
      }

      return result;
    }

    exports.readUintBE = readUintBE;
    /**
     * Reads bytes from array starting at offset as little-endian
     * unsigned bitLen-bit integer and returns it.
     *
     * Supports bit lengths divisible by 8, up to 48.
     */

    function readUintLE(bitLength, array, offset) {
      if (offset === void 0) {
        offset = 0;
      } // TODO(dchest): implement support for bitLenghts non-divisible by 8


      if (bitLength % 8 !== 0) {
        throw new Error("readUintLE supports only bitLengths divisible by 8");
      }

      if (bitLength / 8 > array.length - offset) {
        throw new Error("readUintLE: array is too short for the given bitLength");
      }

      var result = 0;
      var mul = 1;

      for (var i = offset; i < offset + bitLength / 8; i++) {
        result += array[i] * mul;
        mul *= 256;
      }

      return result;
    }

    exports.readUintLE = readUintLE;
    /**
     * Writes a big-endian representation of bitLen-bit unsigned
     * value to array starting at offset.
     *
     * Supports bit lengths divisible by 8, up to 48.
     *
     * If byte array is not given, creates a new one.
     *
     * Returns the output byte array.
     */

    function writeUintBE(bitLength, value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(bitLength / 8);
      }

      if (offset === void 0) {
        offset = 0;
      } // TODO(dchest): implement support for bitLenghts non-divisible by 8


      if (bitLength % 8 !== 0) {
        throw new Error("writeUintBE supports only bitLengths divisible by 8");
      }

      if (!int_1.isSafeInteger(value)) {
        throw new Error("writeUintBE value must be an integer");
      }

      var div = 1;

      for (var i = bitLength / 8 + offset - 1; i >= offset; i--) {
        out[i] = value / div & 0xff;
        div *= 256;
      }

      return out;
    }

    exports.writeUintBE = writeUintBE;
    /**
     * Writes a little-endian representation of bitLen-bit unsigned
     * value to array starting at offset.
     *
     * Supports bit lengths divisible by 8, up to 48.
     *
     * If byte array is not given, creates a new one.
     *
     * Returns the output byte array.
     */

    function writeUintLE(bitLength, value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(bitLength / 8);
      }

      if (offset === void 0) {
        offset = 0;
      } // TODO(dchest): implement support for bitLenghts non-divisible by 8


      if (bitLength % 8 !== 0) {
        throw new Error("writeUintLE supports only bitLengths divisible by 8");
      }

      if (!int_1.isSafeInteger(value)) {
        throw new Error("writeUintLE value must be an integer");
      }

      var div = 1;

      for (var i = offset; i < offset + bitLength / 8; i++) {
        out[i] = value / div & 0xff;
        div *= 256;
      }

      return out;
    }

    exports.writeUintLE = writeUintLE;
    /**
     * Reads 4 bytes from array starting at offset as big-endian
     * 32-bit floating-point number and returns it.
     */

    function readFloat32BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }

      var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
      return view.getFloat32(offset);
    }

    exports.readFloat32BE = readFloat32BE;
    /**
     * Reads 4 bytes from array starting at offset as little-endian
     * 32-bit floating-point number and returns it.
     */

    function readFloat32LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }

      var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
      return view.getFloat32(offset, true);
    }

    exports.readFloat32LE = readFloat32LE;
    /**
     * Reads 8 bytes from array starting at offset as big-endian
     * 64-bit floating-point number ("double") and returns it.
     */

    function readFloat64BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }

      var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
      return view.getFloat64(offset);
    }

    exports.readFloat64BE = readFloat64BE;
    /**
     * Reads 8 bytes from array starting at offset as little-endian
     * 64-bit floating-point number ("double") and returns it.
     */

    function readFloat64LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }

      var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
      return view.getFloat64(offset, true);
    }

    exports.readFloat64LE = readFloat64LE;
    /**
     * Writes 4-byte big-endian floating-point representation of value
     * to byte array starting at offset.
     *
     * If byte array is not given, creates a new 4-byte one.
     *
     * Returns the output byte array.
     */

    function writeFloat32BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(4);
      }

      if (offset === void 0) {
        offset = 0;
      }

      var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
      view.setFloat32(offset, value);
      return out;
    }

    exports.writeFloat32BE = writeFloat32BE;
    /**
     * Writes 4-byte little-endian floating-point representation of value
     * to byte array starting at offset.
     *
     * If byte array is not given, creates a new 4-byte one.
     *
     * Returns the output byte array.
     */

    function writeFloat32LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(4);
      }

      if (offset === void 0) {
        offset = 0;
      }

      var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
      view.setFloat32(offset, value, true);
      return out;
    }

    exports.writeFloat32LE = writeFloat32LE;
    /**
     * Writes 8-byte big-endian floating-point representation of value
     * to byte array starting at offset.
     *
     * If byte array is not given, creates a new 8-byte one.
     *
     * Returns the output byte array.
     */

    function writeFloat64BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(8);
      }

      if (offset === void 0) {
        offset = 0;
      }

      var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
      view.setFloat64(offset, value);
      return out;
    }

    exports.writeFloat64BE = writeFloat64BE;
    /**
     * Writes 8-byte little-endian floating-point representation of value
     * to byte array starting at offset.
     *
     * If byte array is not given, creates a new 8-byte one.
     *
     * Returns the output byte array.
     */

    function writeFloat64LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(8);
      }

      if (offset === void 0) {
        offset = 0;
      }

      var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
      view.setFloat64(offset, value, true);
      return out;
    }

    exports.writeFloat64LE = writeFloat64LE;
  });
  unwrapExports(binary);
  var binary_1 = binary.readInt16BE;
  var binary_2 = binary.readUint16BE;
  var binary_3 = binary.readInt16LE;
  var binary_4 = binary.readUint16LE;
  var binary_5 = binary.writeUint16BE;
  var binary_6 = binary.writeInt16BE;
  var binary_7 = binary.writeUint16LE;
  var binary_8 = binary.writeInt16LE;
  var binary_9 = binary.readInt32BE;
  var binary_10 = binary.readUint32BE;
  var binary_11 = binary.readInt32LE;
  var binary_12 = binary.readUint32LE;
  var binary_13 = binary.writeUint32BE;
  var binary_14 = binary.writeInt32BE;
  var binary_15 = binary.writeUint32LE;
  var binary_16 = binary.writeInt32LE;
  var binary_17 = binary.readInt64BE;
  var binary_18 = binary.readUint64BE;
  var binary_19 = binary.readInt64LE;
  var binary_20 = binary.readUint64LE;
  var binary_21 = binary.writeUint64BE;
  var binary_22 = binary.writeInt64BE;
  var binary_23 = binary.writeUint64LE;
  var binary_24 = binary.writeInt64LE;
  var binary_25 = binary.readUintBE;
  var binary_26 = binary.readUintLE;
  var binary_27 = binary.writeUintBE;
  var binary_28 = binary.writeUintLE;
  var binary_29 = binary.readFloat32BE;
  var binary_30 = binary.readFloat32LE;
  var binary_31 = binary.readFloat64BE;
  var binary_32 = binary.readFloat64LE;
  var binary_33 = binary.writeFloat32BE;
  var binary_34 = binary.writeFloat32LE;
  var binary_35 = binary.writeFloat64BE;
  var binary_36 = binary.writeFloat64LE;
  var pbkdf2 = createCommonjsModule(function (module, exports) {
    // MIT License. See LICENSE file for details.
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    function deriveKey(hash, password, salt, iterations, length) {
      var prf = new hmac_1.HMAC(hash, password);
      var dlen = prf.digestLength;
      var ctr = new Uint8Array(4);
      var t = new Uint8Array(dlen);
      var u = new Uint8Array(dlen);
      var dk = new Uint8Array(length);
      var saltedState = prf.update(salt).saveState();

      for (var i = 0; i * dlen < length; i++) {
        binary.writeUint32BE(i + 1, ctr);
        prf.restoreState(saltedState).update(ctr).finish(u);

        for (var j = 0; j < dlen; j++) {
          t[j] = u[j];
        }

        for (var j = 2; j <= iterations; j++) {
          prf.reset().update(u).finish(u);

          for (var k = 0; k < dlen; k++) {
            t[k] ^= u[k];
          }
        }

        for (var j = 0; j < dlen && i * dlen + j < length; j++) {
          dk[i * dlen + j] = t[j];
        }
      }

      wipe_1.wipe(t);
      wipe_1.wipe(u);
      wipe_1.wipe(ctr);
      prf.cleanSavedState(saltedState);
      prf.clean();
      return dk;
    }

    exports.deriveKey = deriveKey;
  });
  unwrapExports(pbkdf2);
  var pbkdf2_1 = pbkdf2.deriveKey;
  var sha256 = createCommonjsModule(function (module, exports) {
    // MIT License. See LICENSE file for details.
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.DIGEST_LENGTH = 32;
    exports.BLOCK_SIZE = 64;
    /**
     * SHA2-256 cryptographic hash algorithm.
     */

    var SHA256 = function () {
      function SHA256() {
        /** Length of hash output */
        this.digestLength = exports.DIGEST_LENGTH;
        /** Block size */

        this.blockSize = exports.BLOCK_SIZE; // Note: Int32Array is used instead of Uint32Array for performance reasons.

        this._state = new Int32Array(8); // hash state

        this._temp = new Int32Array(64); // temporary state

        this._buffer = new Uint8Array(128); // buffer for data to hash

        this._bufferLength = 0; // number of bytes in buffer

        this._bytesHashed = 0; // number of total bytes hashed

        this._finished = false; // indicates whether the hash was finalized

        this.reset();
      }

      SHA256.prototype._initState = function () {
        this._state[0] = 0x6a09e667;
        this._state[1] = 0xbb67ae85;
        this._state[2] = 0x3c6ef372;
        this._state[3] = 0xa54ff53a;
        this._state[4] = 0x510e527f;
        this._state[5] = 0x9b05688c;
        this._state[6] = 0x1f83d9ab;
        this._state[7] = 0x5be0cd19;
      };
      /**
       * Resets hash state making it possible
       * to re-use this instance to hash other data.
       */


      SHA256.prototype.reset = function () {
        this._initState();

        this._bufferLength = 0;
        this._bytesHashed = 0;
        this._finished = false;
        return this;
      };
      /**
       * Cleans internal buffers and resets hash state.
       */


      SHA256.prototype.clean = function () {
        wipe_1.wipe(this._buffer);
        wipe_1.wipe(this._temp);
        this.reset();
      };
      /**
       * Updates hash state with the given data.
       *
       * Throws error when trying to update already finalized hash:
       * instance must be reset to update it again.
       */


      SHA256.prototype.update = function (data, dataLength) {
        if (dataLength === void 0) {
          dataLength = data.length;
        }

        if (this._finished) {
          throw new Error("SHA256: can't update because hash was finished.");
        }

        var dataPos = 0;
        this._bytesHashed += dataLength;

        if (this._bufferLength > 0) {
          while (this._bufferLength < this.blockSize && dataLength > 0) {
            this._buffer[this._bufferLength++] = data[dataPos++];
            dataLength--;
          }

          if (this._bufferLength === this.blockSize) {
            hashBlocks(this._temp, this._state, this._buffer, 0, this.blockSize);
            this._bufferLength = 0;
          }
        }

        if (dataLength >= this.blockSize) {
          dataPos = hashBlocks(this._temp, this._state, data, dataPos, dataLength);
          dataLength %= this.blockSize;
        }

        while (dataLength > 0) {
          this._buffer[this._bufferLength++] = data[dataPos++];
          dataLength--;
        }

        return this;
      };
      /**
       * Finalizes hash state and puts hash into out.
       * If hash was already finalized, puts the same value.
       */


      SHA256.prototype.finish = function (out) {
        if (!this._finished) {
          var bytesHashed = this._bytesHashed;
          var left = this._bufferLength;
          var bitLenHi = bytesHashed / 0x20000000 | 0;
          var bitLenLo = bytesHashed << 3;
          var padLength = bytesHashed % 64 < 56 ? 64 : 128;
          this._buffer[left] = 0x80;

          for (var i = left + 1; i < padLength - 8; i++) {
            this._buffer[i] = 0;
          }

          binary.writeUint32BE(bitLenHi, this._buffer, padLength - 8);
          binary.writeUint32BE(bitLenLo, this._buffer, padLength - 4);
          hashBlocks(this._temp, this._state, this._buffer, 0, padLength);
          this._finished = true;
        }

        for (var i = 0; i < this.digestLength / 4; i++) {
          binary.writeUint32BE(this._state[i], out, i * 4);
        }

        return this;
      };
      /**
       * Returns the final hash digest.
       */


      SHA256.prototype.digest = function () {
        var out = new Uint8Array(this.digestLength);
        this.finish(out);
        return out;
      };
      /**
       * Function useful for HMAC/PBKDF2 optimization.
       * Returns hash state to be used with restoreState().
       * Only chain value is saved, not buffers or other
       * state variables.
       */


      SHA256.prototype.saveState = function () {
        if (this._finished) {
          throw new Error("SHA256: cannot save finished state");
        }

        return {
          state: new Int32Array(this._state),
          buffer: this._bufferLength > 0 ? new Uint8Array(this._buffer) : undefined,
          bufferLength: this._bufferLength,
          bytesHashed: this._bytesHashed
        };
      };
      /**
       * Function useful for HMAC/PBKDF2 optimization.
       * Restores state saved by saveState() and sets bytesHashed
       * to the given value.
       */


      SHA256.prototype.restoreState = function (savedState) {
        this._state.set(savedState.state);

        this._bufferLength = savedState.bufferLength;

        if (savedState.buffer) {
          this._buffer.set(savedState.buffer);
        }

        this._bytesHashed = savedState.bytesHashed;
        this._finished = false;
        return this;
      };
      /**
       * Cleans state returned by saveState().
       */


      SHA256.prototype.cleanSavedState = function (savedState) {
        wipe_1.wipe(savedState.state);

        if (savedState.buffer) {
          wipe_1.wipe(savedState.buffer);
        }

        savedState.bufferLength = 0;
        savedState.bytesHashed = 0;
      };

      return SHA256;
    }();

    exports.SHA256 = SHA256; // Constants

    var K = new Int32Array([0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2]);

    function hashBlocks(w, v, p, pos, len) {
      while (len >= 64) {
        var a = v[0];
        var b = v[1];
        var c = v[2];
        var d = v[3];
        var e = v[4];
        var f = v[5];
        var g = v[6];
        var h = v[7];

        for (var i = 0; i < 16; i++) {
          var j = pos + i * 4;
          w[i] = binary.readUint32BE(p, j);
        }

        for (var i = 16; i < 64; i++) {
          var u = w[i - 2];
          var t1 = (u >>> 17 | u << 32 - 17) ^ (u >>> 19 | u << 32 - 19) ^ u >>> 10;
          u = w[i - 15];
          var t2 = (u >>> 7 | u << 32 - 7) ^ (u >>> 18 | u << 32 - 18) ^ u >>> 3;
          w[i] = (t1 + w[i - 7] | 0) + (t2 + w[i - 16] | 0);
        }

        for (var i = 0; i < 64; i++) {
          var t1 = (((e >>> 6 | e << 32 - 6) ^ (e >>> 11 | e << 32 - 11) ^ (e >>> 25 | e << 32 - 25)) + (e & f ^ ~e & g) | 0) + (h + (K[i] + w[i] | 0) | 0) | 0;
          var t2 = ((a >>> 2 | a << 32 - 2) ^ (a >>> 13 | a << 32 - 13) ^ (a >>> 22 | a << 32 - 22)) + (a & b ^ a & c ^ b & c) | 0;
          h = g;
          g = f;
          f = e;
          e = d + t1 | 0;
          d = c;
          c = b;
          b = a;
          a = t1 + t2 | 0;
        }

        v[0] += a;
        v[1] += b;
        v[2] += c;
        v[3] += d;
        v[4] += e;
        v[5] += f;
        v[6] += g;
        v[7] += h;
        pos += 64;
        len -= 64;
      }

      return pos;
    }

    function hash(data) {
      var h = new SHA256();
      h.update(data);
      var digest = h.digest();
      h.clean();
      return digest;
    }

    exports.hash = hash;
  });
  unwrapExports(sha256);
  var sha256_1 = sha256.DIGEST_LENGTH;
  var sha256_2 = sha256.BLOCK_SIZE;
  var sha256_3 = sha256.SHA256;
  var sha256_4 = sha256.hash;
  var scrypt = createCommonjsModule(function (module, exports) {
    // MIT License. See LICENSE file for details.
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var Scrypt = function () {
      function Scrypt(N, r, p) {
        this._step = 256; // initial step for non-blocking calculation
        // Check parallelization parameter.

        if (p <= 0) {
          throw new Error("scrypt: incorrect p");
        } // Check r parameter.


        if (r <= 0) {
          throw new Error("scrypt: incorrect r");
        } // Check that N is within supported range.


        if (N < 1 || N > Math.pow(2, 31)) {
          throw new Error('scrypt: N must be between 2 and 2^31');
        } // Check that N is a power of two.


        if (!int_1.isInteger(N) || (N & N - 1) !== 0) {
          throw new Error("scrypt: N must be a power of 2");
        }

        var MAX_INT = 1 << 31 >>> 0;

        if (r * p >= 1 << 30 || r > MAX_INT / 128 / p || r > MAX_INT / 256 || N > MAX_INT / 128 / r) {
          throw new Error("scrypt: parameters are too large");
        } // XXX we can use Uint32Array, but Int32Array is faster, especially in Safari.


        this._V = new Int32Array(32 * (N + 2) * r);
        this._XY = this._V.subarray(32 * N * r);
        this.N = N;
        this.r = r;
        this.p = p;
      }

      Scrypt.prototype.deriveKey = function (password, salt, dkLen) {
        var B = pbkdf2.deriveKey(sha256.SHA256, password, salt, 1, this.p * 128 * this.r);

        for (var i = 0; i < this.p; i++) {
          smix(B.subarray(i * 128 * this.r), this.r, this.N, this._V, this._XY);
        }

        var result = pbkdf2.deriveKey(sha256.SHA256, password, B, 1, dkLen);
        wipe_1.wipe(B);
        return result;
      };

      Scrypt.prototype.deriveKeyNonBlocking = function (password, salt, dkLen) {
        var _this = this;

        var B = pbkdf2.deriveKey(sha256.SHA256, password, salt, 1, this.p * 128 * this.r);
        var tail = Promise.resolve(this._step);

        var _loop_1 = function _loop_1(i) {
          tail = tail.then(function (step) {
            return smixAsync(B.subarray(i * 128 * _this.r), _this.r, _this.N, _this._V, _this._XY, step);
          });
        };

        for (var i = 0; i < this.p; i++) {
          _loop_1(i);
        }

        return tail.then(function (step) {
          var result = pbkdf2.deriveKey(sha256.SHA256, password, B, 1, dkLen);
          wipe_1.wipe(B);
          _this._step = step;
          return result;
        });
      };

      Scrypt.prototype.clean = function () {
        wipe_1.wipe(this._V);
      };

      return Scrypt;
    }();

    exports.Scrypt = Scrypt;
    /**
     * Derives a key from password and salt with parameters
     * N — CPU/memory cost, r — block size, p — parallelization,
     * containing dkLen bytes.
     */

    function deriveKey(password, salt, N, r, p, dkLen) {
      return new Scrypt(N, r, p).deriveKey(password, salt, dkLen);
    }

    exports.deriveKey = deriveKey;
    /**
     * Same as deriveKey, but performs calculation in a non-blocking way,
     * making sure to not take more than 100 ms per blocking calculation.
     */

    function deriveKeyNonBlocking(password, salt, N, r, p, dkLen) {
      return new Scrypt(N, r, p).deriveKeyNonBlocking(password, salt, dkLen);
    }

    exports.deriveKeyNonBlocking = deriveKeyNonBlocking;

    function smix(B, r, N, V, XY) {
      var xi = 0;
      var yi = 32 * r;
      var tmp = new Int32Array(16);

      for (var i = 0; i < 32 * r; i++) {
        V[i] = binary.readUint32LE(B, i * 4);
      }

      for (var i = 0; i < N; i++) {
        blockMix(tmp, V, i * (32 * r), (i + 1) * (32 * r), r);
      }

      for (var i = 0; i < N; i += 2) {
        var j = integerify(XY, xi, r) & N - 1;
        blockXOR(XY, xi, V, j * (32 * r), 32 * r);
        blockMix(tmp, XY, xi, yi, r);
        j = integerify(XY, yi, r) & N - 1;
        blockXOR(XY, yi, V, j * (32 * r), 32 * r);
        blockMix(tmp, XY, yi, xi, r);
      }

      for (var i = 0; i < 32 * r; i++) {
        binary.writeUint32LE(XY[xi + i], B, i * 4);
      }

      wipe_1.wipe(tmp);
    }

    var nextTick = typeof setImmediate !== 'undefined' ? setImmediate : setTimeout;

    function splitCalc(start, end, step, fn) {
      return new Promise(function (fulfill) {
        var adjusted = false;
        var startTime;
        var TARGET_MS = 100; // target milliseconds per calculation

        function nextStep() {
          if (!adjusted) {
            // Get current time.
            startTime = Date.now();
          } // Perform the next step of calculation.


          start = fn(start, start + step < end ? start + step : end);

          if (start < end) {
            if (!adjusted) {
              // There are more steps to do.
              // Measure the time it took for calculation and decide
              // if we should increase the step.
              var dur = Date.now() - startTime;

              if (dur < TARGET_MS) {
                if (dur <= 0) {
                  // Double the steps if duration is too small or negative.
                  step *= 2;
                } else {
                  step = Math.floor(step * 100 / dur);
                }
              } else {
                // Don't bother with adjusting steps anymore.
                adjusted = true;
              }
            }

            nextTick(function () {
              nextStep();
            });
          } else {
            fulfill(step);
          }
        }

        nextStep();
      });
    }

    function smixAsync(B, r, N, V, XY, initialStep) {
      var xi = 0;
      var yi = 32 * r;
      var tmp = new Int32Array(16);

      for (var i = 0; i < 32 * r; i++) {
        V[i] = binary.readUint32LE(B, i * 4);
      }

      return Promise.resolve(initialStep).then(function (step) {
        return splitCalc(0, N, step, function (i, end) {
          for (; i < end; i++) {
            blockMix(tmp, V, i * (32 * r), (i + 1) * (32 * r), r);
          }

          return i;
        });
      }).then(function (step) {
        return splitCalc(0, N, step, function (i, end) {
          for (; i < end; i += 2) {
            var j = integerify(XY, xi, r) & N - 1;
            blockXOR(XY, xi, V, j * (32 * r), 32 * r);
            blockMix(tmp, XY, xi, yi, r);
            j = integerify(XY, yi, r) & N - 1;
            blockXOR(XY, yi, V, j * (32 * r), 32 * r);
            blockMix(tmp, XY, yi, xi, r);
          }

          return i;
        });
      }).then(function (step) {
        for (var i = 0; i < 32 * r; i++) {
          binary.writeUint32LE(XY[xi + i], B, i * 4);
        }

        wipe_1.wipe(tmp);
        return step;
      });
    }

    function salsaXOR(tmp, B, bin, bout) {
      var j0 = tmp[0] ^ B[bin++],
          j1 = tmp[1] ^ B[bin++],
          j2 = tmp[2] ^ B[bin++],
          j3 = tmp[3] ^ B[bin++],
          j4 = tmp[4] ^ B[bin++],
          j5 = tmp[5] ^ B[bin++],
          j6 = tmp[6] ^ B[bin++],
          j7 = tmp[7] ^ B[bin++],
          j8 = tmp[8] ^ B[bin++],
          j9 = tmp[9] ^ B[bin++],
          j10 = tmp[10] ^ B[bin++],
          j11 = tmp[11] ^ B[bin++],
          j12 = tmp[12] ^ B[bin++],
          j13 = tmp[13] ^ B[bin++],
          j14 = tmp[14] ^ B[bin++],
          j15 = tmp[15] ^ B[bin++];
      var x0 = j0,
          x1 = j1,
          x2 = j2,
          x3 = j3,
          x4 = j4,
          x5 = j5,
          x6 = j6,
          x7 = j7,
          x8 = j8,
          x9 = j9,
          x10 = j10,
          x11 = j11,
          x12 = j12,
          x13 = j13,
          x14 = j14,
          x15 = j15;
      var u;

      for (var i = 0; i < 8; i += 2) {
        u = x0 + x12;
        x4 ^= u << 7 | u >>> 32 - 7;
        u = x4 + x0;
        x8 ^= u << 9 | u >>> 32 - 9;
        u = x8 + x4;
        x12 ^= u << 13 | u >>> 32 - 13;
        u = x12 + x8;
        x0 ^= u << 18 | u >>> 32 - 18;
        u = x5 + x1;
        x9 ^= u << 7 | u >>> 32 - 7;
        u = x9 + x5;
        x13 ^= u << 9 | u >>> 32 - 9;
        u = x13 + x9;
        x1 ^= u << 13 | u >>> 32 - 13;
        u = x1 + x13;
        x5 ^= u << 18 | u >>> 32 - 18;
        u = x10 + x6;
        x14 ^= u << 7 | u >>> 32 - 7;
        u = x14 + x10;
        x2 ^= u << 9 | u >>> 32 - 9;
        u = x2 + x14;
        x6 ^= u << 13 | u >>> 32 - 13;
        u = x6 + x2;
        x10 ^= u << 18 | u >>> 32 - 18;
        u = x15 + x11;
        x3 ^= u << 7 | u >>> 32 - 7;
        u = x3 + x15;
        x7 ^= u << 9 | u >>> 32 - 9;
        u = x7 + x3;
        x11 ^= u << 13 | u >>> 32 - 13;
        u = x11 + x7;
        x15 ^= u << 18 | u >>> 32 - 18;
        u = x0 + x3;
        x1 ^= u << 7 | u >>> 32 - 7;
        u = x1 + x0;
        x2 ^= u << 9 | u >>> 32 - 9;
        u = x2 + x1;
        x3 ^= u << 13 | u >>> 32 - 13;
        u = x3 + x2;
        x0 ^= u << 18 | u >>> 32 - 18;
        u = x5 + x4;
        x6 ^= u << 7 | u >>> 32 - 7;
        u = x6 + x5;
        x7 ^= u << 9 | u >>> 32 - 9;
        u = x7 + x6;
        x4 ^= u << 13 | u >>> 32 - 13;
        u = x4 + x7;
        x5 ^= u << 18 | u >>> 32 - 18;
        u = x10 + x9;
        x11 ^= u << 7 | u >>> 32 - 7;
        u = x11 + x10;
        x8 ^= u << 9 | u >>> 32 - 9;
        u = x8 + x11;
        x9 ^= u << 13 | u >>> 32 - 13;
        u = x9 + x8;
        x10 ^= u << 18 | u >>> 32 - 18;
        u = x15 + x14;
        x12 ^= u << 7 | u >>> 32 - 7;
        u = x12 + x15;
        x13 ^= u << 9 | u >>> 32 - 9;
        u = x13 + x12;
        x14 ^= u << 13 | u >>> 32 - 13;
        u = x14 + x13;
        x15 ^= u << 18 | u >>> 32 - 18;
      }

      B[bout++] = tmp[0] = x0 + j0 | 0;
      B[bout++] = tmp[1] = x1 + j1 | 0;
      B[bout++] = tmp[2] = x2 + j2 | 0;
      B[bout++] = tmp[3] = x3 + j3 | 0;
      B[bout++] = tmp[4] = x4 + j4 | 0;
      B[bout++] = tmp[5] = x5 + j5 | 0;
      B[bout++] = tmp[6] = x6 + j6 | 0;
      B[bout++] = tmp[7] = x7 + j7 | 0;
      B[bout++] = tmp[8] = x8 + j8 | 0;
      B[bout++] = tmp[9] = x9 + j9 | 0;
      B[bout++] = tmp[10] = x10 + j10 | 0;
      B[bout++] = tmp[11] = x11 + j11 | 0;
      B[bout++] = tmp[12] = x12 + j12 | 0;
      B[bout++] = tmp[13] = x13 + j13 | 0;
      B[bout++] = tmp[14] = x14 + j14 | 0;
      B[bout++] = tmp[15] = x15 + j15 | 0;
    }

    function blockCopy(dst, di, src, si, len) {
      while (len--) {
        dst[di++] = src[si++];
      }
    }

    function blockXOR(dst, di, src, si, len) {
      while (len--) {
        dst[di++] ^= src[si++];
      }
    }

    function blockMix(tmp, B, bin, bout, r) {
      blockCopy(tmp, 0, B, bin + (2 * r - 1) * 16, 16);

      for (var i = 0; i < 2 * r; i += 2) {
        salsaXOR(tmp, B, bin + i * 16, bout + i * 8);
        salsaXOR(tmp, B, bin + i * 16 + 16, bout + i * 8 + r * 16);
      }
    }

    function integerify(B, bi, r) {
      return B[bi + (2 * r - 1) * 16];
    }
  });
  unwrapExports(scrypt);
  var scrypt_1 = scrypt.Scrypt;
  var scrypt_2 = scrypt.deriveKey;
  var scrypt_3 = scrypt.deriveKeyNonBlocking;
  /*
  * This Source Code is subject to the terms of the Mozilla Public License
  * version 2.0 (the "License"). You can obtain a copy of the License at
  * http://mozilla.org/MPL/2.0/.
  */

  var N = 32768;
  var r = 8;
  var p = 1;
  var hasher = new scrypt_1(N, r, p);

  function scrypt$1(password, salt, length) {
    return hasher.deriveKey(password, salt, length);
  }

  if (typeof self != "undefined") {
    self.onmessage = function (_ref) {
      var _ref$data = _ref.data,
          jobId = _ref$data.jobId,
          password = _ref$data.password,
          salt = _ref$data.salt,
          length = _ref$data.length;
      self.postMessage({
        jobId: jobId,
        result: hasher.deriveKey(toTypedArray(password), toTypedArray(salt), length)
      });
    };
  }

  if (typeof exports != "undefined") exports.scrypt = scrypt$1;
}function pbkdf2Worker () {

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }
  /*
  * This Source Code is subject to the terms of the Mozilla Public License
  * version 2.0 (the "License"). You can obtain a copy of the License at
  * http://mozilla.org/MPL/2.0/.
  */


  function toTypedArray(obj) {
    return obj;
  }
  /*
  * This Source Code is subject to the terms of the Mozilla Public License
  * version 2.0 (the "License"). You can obtain a copy of the License at
  * http://mozilla.org/MPL/2.0/.
  */

  /* eslint operator-assignment: "off" */


  var NUM_ITERATIONS = 256 * 1024;
  var DIGEST_LENGTH = 20;
  var BLOCK_SIZE = 64;

  var hasher = function () {
    var heap = new ArrayBuffer(0x10000);
    var maxPaddedChunkLength = BLOCK_SIZE * 2;
    var input = new Int32Array(heap, 0, maxPaddedChunkLength >> 2);
    var state = new Int32Array(heap, maxPaddedChunkLength + 320, 5);

    var _RushaCore = RushaCore({
      Int32Array: Int32Array
    }, {}, heap),
        hash = _RushaCore.hash;
    /**
     * Initializes the current state, this should be called when the processing
     * starts.
     */


    function initState() {
      state[0] = 1732584193;
      state[1] = -271733879;
      state[2] = -1732584194;
      state[3] = 271733878;
      state[4] = -1009589776;
    }
    /**
     * Writes the result of the hash calculation into an array.
     * @param {Uint8Array} outarray
     *   20 bytes array to write the result into
     */


    function getResult(outarray) {
      var view = new DataView(outarray.buffer);
      view.setInt32(0, state[0], false);
      view.setInt32(4, state[1], false);
      view.setInt32(8, state[2], false);
      view.setInt32(12, state[3], false);
      view.setInt32(16, state[4], false);
    }
    /**
     * Pads the chunk currently in processing, should be called before
     * processing the last message block.
     * @param {number} chunkLength
     *   length of the current chunk
     * @param {number} messageLength
     *   overall length of the message
     */


    function padData(chunkLength, messageLength) {
      var paddedLength = BLOCK_SIZE;
      if (chunkLength + 9 >= BLOCK_SIZE) paddedLength = BLOCK_SIZE * 2;

      for (var i = chunkLength + 3 - (chunkLength + 3) % 4; i < BLOCK_SIZE - 8; i = i + 4) {
        input[i >> 2] = 0;
      }

      input[chunkLength >> 2] ^= 0x80 << 24 - (chunkLength % 4 << 3);
      input[paddedLength - 8 >> 2] = messageLength >>> 29;
      input[paddedLength - 4 >> 2] = messageLength << 3;
      return paddedLength;
    }
    /**
     * Takes the state of a previous hashing operation as input data. This
     * function assumes that this will be the last chunk and pads it. It also
     * assumes that there was a block of data preceding it (typical for HMAC).
     */


    function inputFromState(state) {
      input[0] = state[0];
      input[1] = state[1];
      input[2] = state[2];
      input[3] = state[3];
      input[4] = state[4];
      var chunkLength = state.length << 2;
      return padData(chunkLength, BLOCK_SIZE + chunkLength);
    }
    /**
     * Takes a typed array as input data.
     * @param {Uint8Array} array
     *   Typed array containing the data
     * @param {number} offset
     *   Offset of the data in the array
     * @param {number} length
     *   Size of the data, cannot be larger than BLOCK_SIZE
     */


    function inputFromArray(array, offset, length) {
      var view = new DataView(array.buffer, array.byteOffset + offset, length);
      var pos = 0;

      for (; pos + 3 < length; pos = pos + 4) {
        input[pos >> 2] = view.getInt32(pos, false);
      }

      var remaining = length % 4;

      if (remaining) {
        input[pos >> 2] = array[offset + pos] << 24 | array[offset + pos + 1] << 16 | array[offset + pos + 2] << 8;
      }
    }
    /**
     * Pre-processes a single block of data and returns the resulting state,
     * allowing to calculate hashes efficiently for different inputs sharing the
     * same first block.
     * @param {Uint8Array} array
     *   Typed array containing the data, must have size BLOCK_SIZE
     * @return {Int32Array}
     *   Copy of the hasher state the operation resulted into
     */


    function preprocessBlock(array) {
      initState();
      inputFromArray(array, 0, BLOCK_SIZE);
      hash(BLOCK_SIZE, maxPaddedChunkLength);
      return new Int32Array(hasher.state);
    }
    /**
     * Takes the current hasher state as the input and hashes it on top of a
     * pre-processed block of data represented by the parameter.
     * @param {Int32Array}
     *   Result of a previous preprocessBlock call
     */


    function hashCurrentState(initialState) {
      var chunkLength = inputFromState(state);
      state.set(initialState);
      hash(chunkLength, maxPaddedChunkLength);
    }
    /**
     * Hashes an arbitrary-length array with data.
     * @param {Uint8Array} array
     *   Typed array containing the data
     * @param {Int32Array} [initialState]
     *   Result of a previous preprocessBlock call, if omitted the operation
     *   starts with a clean state.
     */


    function hashArray(array, initialState) {
      var messageLength = array.length;

      if (initialState) {
        messageLength += BLOCK_SIZE;
        hasher.state.set(initialState);
      } else initState();

      var offset = 0;

      for (; array.length > offset + BLOCK_SIZE; offset = offset + BLOCK_SIZE) {
        inputFromArray(array, offset, BLOCK_SIZE);
        hash(BLOCK_SIZE, maxPaddedChunkLength);
      }

      var remaining = array.length - offset;
      inputFromArray(array, offset, remaining);
      hash(padData(remaining, messageLength), maxPaddedChunkLength);
    }

    return {
      state: state,
      getResult: getResult,
      preprocessBlock: preprocessBlock,
      hashCurrentState: hashCurrentState,
      hashArray: hashArray
    };
  }();

  function prepareKey(password) {
    // HMAC doesn't use the key directly, it rather zero-pads it to BLOCK_SIZE
    // and xors all bytes with a constant (0x36 for the inner key and 0x5x for
    // the outer one). We can prepare both key variants so that this operation
    // won't need to be repeated - and also feed them to SHA1 already since they
    // will always be the first block of the hashing operation.
    var ikey = new Uint8Array(BLOCK_SIZE);

    if (password.length > BLOCK_SIZE) {
      hasher.hashArray(password);
      hasher.getResult(ikey);
    } else ikey.set(password);

    var okey = Uint8Array.from(ikey);

    for (var i = 0; i < BLOCK_SIZE; i++) {
      ikey[i] ^= 0x36;
      okey[i] ^= 0x5c;
    }

    return [hasher.preprocessBlock(ikey), hasher.preprocessBlock(okey)];
  }

  function pbkdf2(password, salt, iterations, length) {
    length |= 0;

    var _prepareKey = prepareKey(password),
        _prepareKey2 = _slicedToArray(_prepareKey, 2),
        ikey = _prepareKey2[0],
        okey = _prepareKey2[1];

    var numChunks = Math.ceil(length / DIGEST_LENGTH);
    var result = new Int32Array(numChunks * DIGEST_LENGTH >>> 2);
    var offset = 0;

    for (var i = 1; i <= numChunks; i++) {
      // First iteration works on the and i as 32-bit big-endian number.
      salt[salt.length - 4] = i >>> 24 & 0xFF;
      salt[salt.length - 3] = i >>> 16 & 0xFF;
      salt[salt.length - 2] = i >>> 8 & 0xFF;
      salt[salt.length - 1] = i >>> 0 & 0xFF; // First HMAC operation processes the salt, slightly more complicated
      // because the salt's length is arbitrary.

      hasher.hashArray(salt, ikey);
      hasher.hashCurrentState(okey);
      result.set(hasher.state, offset); // Subsequent iterations work on the result of the previous iteration.

      for (var j = 1; j < iterations; j++) {
        // Subsequent HMAC operations always operate on the state of the previous
        // operation preceded by the inner/outer key, we can take some shortcuts
        // here.
        hasher.hashCurrentState(ikey);
        hasher.hashCurrentState(okey);

        for (var k = 0; k < hasher.state.length; k++) {
          result[offset + k] ^= hasher.state[k];
        }
      }

      offset += DIGEST_LENGTH >> 2;
    } // Convert result to big-endian


    var view = new DataView(result.buffer);

    for (var _i = 0; _i < result.length; _i++) {
      view.setInt32(_i << 2, result[_i], false);
    }

    return new Uint8Array(result.buffer, 0, length);
  }

  if (typeof self != "undefined") {
    self.onmessage = function (_ref) {
      var _ref$data = _ref.data,
          jobId = _ref$data.jobId,
          password = _ref$data.password,
          salt = _ref$data.salt,
          length = _ref$data.length;
      self.postMessage({
        jobId: jobId,
        result: pbkdf2(toTypedArray(password), toTypedArray(salt), NUM_ITERATIONS, length)
      });
    };
  }

  if (typeof exports != "undefined") exports.pbkdf2 = pbkdf2; // The following snippet is taken from rusha 0.8.4:
  // https://github.com/srijs/rusha/blob/v0.8.4/rusha.js#L307

  /* eslint-disable */

  /*
   * Rusha, a JavaScript implementation of the Secure Hash Algorithm, SHA-1,
   * as defined in FIPS PUB 180-1, tuned for high performance with large inputs.
   * (http://github.com/srijs/rusha)
   *
   * Inspired by Paul Johnstons implementation (http://pajhome.org.uk/crypt/md5).
   *
   * Copyright (c) 2013 Sam Rijs (http://awesam.de).
   * Released under the terms of the MIT license as follows:
   *
   * Permission is hereby granted, free of charge, to any person obtaining a
   * copy of this software and associated documentation files (the "Software"),
   * to deal in the Software without restriction, including without limitation
   * the rights to use, copy, modify, merge, publish, distribute, sublicense,
   * and/or sell copies of the Software, and to permit persons to whom the
   * Software is furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
   * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
   * IN THE SOFTWARE.
   */

  function RushaCore(stdlib, foreign, heap) {
    'use asm';

    var H = new stdlib.Int32Array(heap);

    function hash(k, x) {
      // k in bytes
      k = k | 0;
      x = x | 0;
      var i = 0,
          j = 0,
          y0 = 0,
          z0 = 0,
          y1 = 0,
          z1 = 0,
          y2 = 0,
          z2 = 0,
          y3 = 0,
          z3 = 0,
          y4 = 0,
          z4 = 0,
          t0 = 0,
          t1 = 0;
      y0 = H[x + 320 >> 2] | 0;
      y1 = H[x + 324 >> 2] | 0;
      y2 = H[x + 328 >> 2] | 0;
      y3 = H[x + 332 >> 2] | 0;
      y4 = H[x + 336 >> 2] | 0;

      for (i = 0; (i | 0) < (k | 0); i = i + 64 | 0) {
        z0 = y0;
        z1 = y1;
        z2 = y2;
        z3 = y3;
        z4 = y4;

        for (j = 0; (j | 0) < 64; j = j + 4 | 0) {
          t1 = H[i + j >> 2] | 0;
          t0 = ((y0 << 5 | y0 >>> 27) + (y1 & y2 | ~y1 & y3) | 0) + ((t1 + y4 | 0) + 1518500249 | 0) | 0;
          y4 = y3;
          y3 = y2;
          y2 = y1 << 30 | y1 >>> 2;
          y1 = y0;
          y0 = t0;
          H[k + j >> 2] = t1;
        }

        for (j = k + 64 | 0; (j | 0) < (k + 80 | 0); j = j + 4 | 0) {
          t1 = (H[j - 12 >> 2] ^ H[j - 32 >> 2] ^ H[j - 56 >> 2] ^ H[j - 64 >> 2]) << 1 | (H[j - 12 >> 2] ^ H[j - 32 >> 2] ^ H[j - 56 >> 2] ^ H[j - 64 >> 2]) >>> 31;
          t0 = ((y0 << 5 | y0 >>> 27) + (y1 & y2 | ~y1 & y3) | 0) + ((t1 + y4 | 0) + 1518500249 | 0) | 0;
          y4 = y3;
          y3 = y2;
          y2 = y1 << 30 | y1 >>> 2;
          y1 = y0;
          y0 = t0;
          H[j >> 2] = t1;
        }

        for (j = k + 80 | 0; (j | 0) < (k + 160 | 0); j = j + 4 | 0) {
          t1 = (H[j - 12 >> 2] ^ H[j - 32 >> 2] ^ H[j - 56 >> 2] ^ H[j - 64 >> 2]) << 1 | (H[j - 12 >> 2] ^ H[j - 32 >> 2] ^ H[j - 56 >> 2] ^ H[j - 64 >> 2]) >>> 31;
          t0 = ((y0 << 5 | y0 >>> 27) + (y1 ^ y2 ^ y3) | 0) + ((t1 + y4 | 0) + 1859775393 | 0) | 0;
          y4 = y3;
          y3 = y2;
          y2 = y1 << 30 | y1 >>> 2;
          y1 = y0;
          y0 = t0;
          H[j >> 2] = t1;
        }

        for (j = k + 160 | 0; (j | 0) < (k + 240 | 0); j = j + 4 | 0) {
          t1 = (H[j - 12 >> 2] ^ H[j - 32 >> 2] ^ H[j - 56 >> 2] ^ H[j - 64 >> 2]) << 1 | (H[j - 12 >> 2] ^ H[j - 32 >> 2] ^ H[j - 56 >> 2] ^ H[j - 64 >> 2]) >>> 31;
          t0 = ((y0 << 5 | y0 >>> 27) + (y1 & y2 | y1 & y3 | y2 & y3) | 0) + ((t1 + y4 | 0) - 1894007588 | 0) | 0;
          y4 = y3;
          y3 = y2;
          y2 = y1 << 30 | y1 >>> 2;
          y1 = y0;
          y0 = t0;
          H[j >> 2] = t1;
        }

        for (j = k + 240 | 0; (j | 0) < (k + 320 | 0); j = j + 4 | 0) {
          t1 = (H[j - 12 >> 2] ^ H[j - 32 >> 2] ^ H[j - 56 >> 2] ^ H[j - 64 >> 2]) << 1 | (H[j - 12 >> 2] ^ H[j - 32 >> 2] ^ H[j - 56 >> 2] ^ H[j - 64 >> 2]) >>> 31;
          t0 = ((y0 << 5 | y0 >>> 27) + (y1 ^ y2 ^ y3) | 0) + ((t1 + y4 | 0) - 899497514 | 0) | 0;
          y4 = y3;
          y3 = y2;
          y2 = y1 << 30 | y1 >>> 2;
          y1 = y0;
          y0 = t0;
          H[j >> 2] = t1;
        }

        y0 = y0 + z0 | 0;
        y1 = y1 + z1 | 0;
        y2 = y2 + z2 | 0;
        y3 = y3 + z3 | 0;
        y4 = y4 + z4 | 0;
      }

      H[x + 320 >> 2] = y0;
      H[x + 324 >> 2] = y1;
      H[x + 328 >> 2] = y2;
      H[x + 332 >> 2] = y3;
      H[x + 336 >> 2] = y4;
    }

    return {
      hash: hash
    };
  }
}/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */

function functionToURL(func) {
  var text = "(" + func.toString() + ")()";
  return URL.createObjectURL(new Blob([text], {
    type: "text/javascript"
  }));
}

var currentURL = null;
var browser = {
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
      if (path == "worker/scrypt.js") return functionToURL(scryptWorker);else if (path == "worker/pbkdf2.js") return functionToURL(pbkdf2Worker);else return path;
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

  browser.runtime.onConnect._emit(port);
});
window.addEventListener("show-panel", function (event) {
  currentURL = "https://" + event.detail;
});/*
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
function EventTarget$1() {
  var result = Object.create(proto);
  result._listeners = [];
  return result;
}
function emit(obj, eventName) {
  var results = [];

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (obj._listeners[eventName] || [])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var listener = _step.value;
      results.push(listener.apply(void 0, args));
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

  return Promise.all(results);
}/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */
var ports = new Map();
function getPort(name) {
  if (!ports.has(name)) {
    var targets = [];
    var wrapper = EventTarget$1();
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
}/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */

function toTypedArray(obj) {
  return obj;
}/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */
var AES_KEY_SIZE = 256; // I, l, O, 0, 1 excluded because of potential confusion. ", ', \ excluded
// because of common bugs in web interfaces (magic quotes).

var LOWERCASE = "abcdefghjkmnpqrstuvwxyz";
var UPPERCASE = "ABCDEFGHJKMNPQRSTUVWXYZ";
var NUMBER = "23456789";
var SYMBOL = "!#$%&()*+,-./:;<=>?@[]^_{|}~";
var encoder = new TextEncoder("utf-8");
var decoder = new TextDecoder("utf-8");
var maxJobId = 0;
var scryptWorker$1 = null;
var pbkdf2Worker$1 = null;

function deriveBits(password, salt, length) {
  return new Promise(function (resolve, reject) {
    if (!scryptWorker$1) scryptWorker$1 = new Worker(browser.runtime.getURL("worker/scrypt.js"));
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

      scryptWorker$1 = null;
      reject("worker-error");
    };

    var cleanup = function cleanup() {
      scryptWorker$1.removeEventListener("message", messageCallback);
      scryptWorker$1.removeEventListener("error", errorCallback);
    };

    scryptWorker$1.addEventListener("message", messageCallback);
    scryptWorker$1.addEventListener("error", errorCallback);
    scryptWorker$1.postMessage({
      jobId: currentJobId,
      password: encoder.encode(password),
      salt: encoder.encode(salt),
      length: parseInt(length, 10)
    });
  });
}

function deriveBitsLegacy(password, salt, length) {
  return new Promise(function (resolve, reject) {
    if (!pbkdf2Worker$1) pbkdf2Worker$1 = new Worker(browser.runtime.getURL("worker/pbkdf2.js"));
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

      pbkdf2Worker$1 = null;
      reject("worker-error");
    };

    var cleanup = function cleanup() {
      pbkdf2Worker$1.removeEventListener("message", messageCallback);
      pbkdf2Worker$1.removeEventListener("error", errorCallback);
    };

    pbkdf2Worker$1.addEventListener("message", messageCallback);
    pbkdf2Worker$1.addEventListener("error", errorCallback);
    pbkdf2Worker$1.postMessage({
      jobId: currentJobId,
      password: encoder.encode(password),
      // Reserve 4 bytes at the end of the salt, PBKDF2 will need them
      salt: encoder.encode(salt + "    "),
      length: parseInt(length, 10)
    });
  });
}

function derivePassword(params) {
  var salt = params.domain + "\0" + params.name;
  if (params.revision) salt += "\0" + params.revision;
  return Promise.resolve().then(function () {
    return deriveBits(params.masterPassword, salt, params.length);
  }).then(function (array) {
    return toPassword(array, params.lower, params.upper, params.number, params.symbol);
  });
}
function deriveKey(params) {
  return Promise.resolve().then(function () {
    return deriveBits(params.masterPassword, atob(params.salt), AES_KEY_SIZE / 8);
  }).then(function (array) {
    return crypto.subtle.importKey("raw", array, "AES-GCM", false, ["encrypt", "decrypt"]);
  });
}
function encryptData(key, plaintext) {
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

    return toBase64(initializationVector) + "_" + toBase64(buffer);
  });
}
function decryptData(key, ciphertext) {
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
}
function generateRandom(length) {
  var array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return toBase64(array);
}
function importHmacSecret(rawSecret) {
  return Promise.resolve().then(function () {
    return crypto.subtle.importKey("raw", fromBase64(rawSecret), {
      name: "HMAC",
      hash: "SHA-256"
    }, false, ["sign"]);
  });
}
function getDigest(hmacSecret, data) {
  return Promise.resolve().then(function () {
    return crypto.subtle.sign({
      name: "HMAC",
      hash: "SHA-256"
    }, hmacSecret, encoder.encode(data));
  }).then(function (signature) {
    return toBase64(signature);
  });
}
function derivePasswordLegacy(params) {
  var salt = params.domain + "\0" + params.name;
  if (params.revision) salt += "\0" + params.revision;
  return Promise.resolve().then(function () {
    return deriveBitsLegacy(params.masterPassword, salt, params.length);
  }).then(function (array) {
    return toPassword(array, params.lower, params.upper, params.number, params.symbol);
  });
}

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

    for (var _i = 0, _charsets = charsets; _i < _charsets.length; _i++) {
      var charset = _charsets[_i];

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

  for (var _i2 = start; _i2 < start + len; _i2++) {
    hash = pearsonHashPermutations[hash ^ buffer[_i2]];
  }

  return hash;
}
function toBase64(buffer) {
  var array = new Uint8Array(buffer);
  var result = [];

  for (var i = 0; i < array.length; i++) {
    result.push(String.fromCharCode(array[i]));
  }

  return btoa(result.join(""));
}
function fromBase64(string) {
  var decoded = atob(string);
  var result = new Uint8Array(decoded.length);

  for (var i = 0; i < decoded.length; i++) {
    result[i] = decoded.charCodeAt(i);
  }

  return result;
} // Our Base32 variant follows RFC 4648 but uses a custom alphabet to remove
// ambiguous characters: 0, 1, O, I.

var base32Alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
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

  for (var _i3 = 0; _i3 < str.length; _i3++) {
    current = current << 5 | mapping.get(str[_i3]);
    currentBits += 5;

    if (currentBits >= 8) {
      var remainder = currentBits - 8;
      result[pos++] = current >> remainder;
      current &= ~(31 << remainder);
      currentBits = remainder;
    }
  }

  return result;
}/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */
var CURRENT_FORMAT = 3;
var formatKey = "format";
var saltKey = "salt";
var hmacSecretKey = "hmac-secret";
var prefsPrefix = "pref:";
var keyCallback = null;
function setKeyCallback(callback) {
  keyCallback = callback;
}
var hmacSecretCallback = null;
function setHmacSecretCallback(callback) {
  hmacSecretCallback = callback;
}

function getKey() {
  var key = keyCallback && keyCallback();
  if (!key) throw "master_password_required";
  return key;
}

function encrypt(data, key, json) {
  return Promise.resolve().then(function () {
    if (typeof key == "undefined") key = getKey();
    if (!key) return data;
    if (json !== false) data = JSON.stringify(data);
    return encryptData(key, data);
  });
}
function decrypt(data, key, json) {
  return Promise.resolve().then(function () {
    if (typeof key == "undefined") key = getKey();
    if (!key) return data;
    return decryptData(key, data).then(function (plaintext) {
      if (json !== false) plaintext = JSON.parse(plaintext);
      return plaintext;
    });
  });
}
function nameToStorageKey(data) {
  var hmacSecret = hmacSecretCallback && hmacSecretCallback();
  if (!hmacSecret) return Promise.reject("master_password_required");
  return getDigest(hmacSecret, data);
}

function has(name) {
  return browser.storage.local.get(name).then(function (items) {
    return items.hasOwnProperty(name);
  });
}

function hasPrefix(prefix) {
  return browser.storage.local.get(null).then(function (items) {
    return Object.keys(items).some(function (name) {
      return name.startsWith(prefix);
    });
  });
}

function get(name, key) {
  return browser.storage.local.get(name).then(function (items) {
    if (!items.hasOwnProperty(name)) return undefined;
    return decrypt(items[name], key);
  });
}

function getAllByPrefix(prefix, key) {
  return browser.storage.local.get(null).then(function (items) {
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

function set(name, value, key) {
  return encrypt(value, key).then(function (ciphertext) {
    return browser.storage.local.set(_defineProperty({}, name, ciphertext));
  }).then(function () {
    return emit(storage, "set", name);
  });
}

function delete_(name) {
  return browser.storage.local.remove(name).then(function () {
    if (Array.isArray(name)) return Promise.all(name.map(function (n) {
      return emit(storage, "delete", n);
    }));else return emit(storage, "delete", name);
  });
}

function deleteByPrefix(prefix) {
  return browser.storage.local.get(null).then(function (items) {
    var keys = Object.keys(items).filter(function (name) {
      return name.startsWith(prefix);
    });
    return delete_(keys);
  });
}

function clear() {
  return browser.storage.local.get(null).then(function (items) {
    var keys = Object.keys(items).filter(function (name) {
      return !name.startsWith(prefsPrefix);
    });
    return delete_(keys);
  });
}

var storage = Object.assign(EventTarget$1(), {
  has: has,
  hasPrefix: hasPrefix,
  get: get,
  getAllByPrefix: getAllByPrefix,
  set: set,
  "delete": delete_,
  deleteByPrefix: deleteByPrefix,
  clear: clear
});/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */
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
        actions.push(derivePasswordLegacy(params).then(function (password) {
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
}/*
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
};/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */
var masterPasswordCallback = null;
function setMasterPasswordCallback(callback) {
  masterPasswordCallback = callback;
}
var lock = new Lock();
var STORAGE_PREFIX = "site:";

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
  return nameToStorageKey(site).then(function (digest) {
    return "".concat(STORAGE_PREFIX).concat(digest);
  });
}

function _getPasswordPrefix(site) {
  return _getSiteKey(site).then(function (key) {
    return "".concat(key, ":");
  });
}

function _getPasswordKey(site, name, revision) {
  return Promise.all([nameToStorageKey(site), nameToStorageKey(site + "\0" + name + "\0" + (revision || ""))]).then(function (_ref) {
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
function getPasswords(host) {
  return getAlias(host).then(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        origSite = _ref4[0],
        site = _ref4[1];

    return Promise.all([origSite, site, _getPasswords(site)]);
  });
}
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
        masterPassword: masterPasswordCallback(),
        domain: site,
        name: name,
        revision: revision,
        length: length,
        lower: lower,
        upper: upper,
        number: number,
        symbol: symbol
      };
      return derivePassword(params);
    }

    throw "unknown_generation_method";
  });
}
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

    for (var _i = 0, _Object$keys = Object.keys(result); _i < _Object$keys.length; _i++) {
      var site = _Object$keys[_i];
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
function getAllSites() {
  return storage.getAllByPrefix(STORAGE_PREFIX).then(function (data) {
    var sites = [];

    for (var _i2 = 0, _Object$keys2 = Object.keys(data); _i2 < _Object$keys2.length; _i2++) {
      var key = _Object$keys2[_i2];
      var siteData = data[key];
      if (siteData.type || siteData.alias) continue;
      sites.push(siteData.site);
    }

    sites.sort();
    return sites;
  });
}
function exportPasswordData() {
  var extraKeys = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var exportedKeys = [saltKey, hmacSecretKey].concat(extraKeys);
  return storage.getAllByPrefix("", null).then(function (data) {
    for (var _i3 = 0, _Object$keys3 = Object.keys(data); _i3 < _Object$keys3.length; _i3++) {
      var key = _Object$keys3[_i3];
      if (!key.startsWith(STORAGE_PREFIX) && !exportedKeys.includes(key)) delete data[key];
    }

    return JSON.stringify({
      application: "pfp",
      format: 3,
      data: data
    });
  });
}
var importers = [];
function registerImporter(importer) {
  importers.push(importer);
}
function importPasswordData(data, masterPass) {
  var currentIndex = 0;

  function setRaw(key, value) {
    return storage.set(key, value, null);
  }

  function tryNext() {
    var importer = importers[currentIndex++];
    return importer(data, setRaw, setSite, setPassword, masterPass)["catch"](function (e) {
      if (e != "unknown_data_format" || currentIndex >= importers.length) throw e;
      return tryNext();
    });
  }

  return lock.acquire().then(tryNext)["finally"](function () {
    return lock.release();
  });
}
function setPassword(entry) {
  return _getPasswordKey(entry.site, entry.name, entry.revision).then(function (key) {
    return storage.set(key, entry);
  });
}
function setSite(entry) {
  return _getSiteKey(entry.site).then(function (key) {
    return storage.set(key, entry);
  });
}
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
var migrationInProgress = null;
function migrateData$1(masterPassword) {
  if (!migrationInProgress) {
    migrationInProgress = lock.acquire().then(function () {
      return migrateData(masterPassword, STORAGE_PREFIX, setPassword);
    })["finally"](function () {
      migrationInProgress = null;
      lock.release();
    });
  }

  return migrationInProgress;
}
function isMigrating() {
  return !!migrationInProgress;
}/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */
var events = EventTarget$1();
function getPref(name, defaultValue) {
  var key = prefsPrefix + name;
  return browser.storage.local.get(key).then(function (items) {
    return key in items ? items[key] : defaultValue;
  });
}
function setPref(name, value) {
  var key = prefsPrefix + name;
  return browser.storage.local.set(_defineProperty({}, key, value)).then(function () {
    return emit(events, name, name, value);
  });
}/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */
var rememberedMaster = null;
var key = null;
var hmacSecret = null;
var lockTimer = null;
var autoLockSuspended = false;
var events$1 = new EventTarget$1();

setMasterPasswordCallback(getMasterPassword);
setKeyCallback(function () {
  return key;
});
setHmacSecretCallback(function () {
  return hmacSecret;
});
function getState() {
  if (isMigrating()) return Promise.resolve("migrating");
  if (rememberedMaster) return Promise.resolve("known");
  return storage.has(hmacSecretKey).then(function (value) {
    return value ? "set" : "unset";
  });
}
function getMasterPassword() {
  if (!rememberedMaster) throw "master_password_required";
  return rememberedMaster;
}
function getSalt() {
  return storage.get(saltKey, null);
}

function _suspendAutoLock() {
  if (lockTimer !== null) clearTimeout(lockTimer);
  lockTimer = null;
}

function suspendAutoLock() {
  _suspendAutoLock();

  autoLockSuspended = true;
}

function _resumeAutoLock() {
  Promise.all([getPref("autolock", true), getPref("autolock_delay", 10)]).then(function (_ref) {
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
events.on("autolock", function (name, value) {
  if (value) {
    if (!autoLockSuspended) _resumeAutoLock();
  } else _suspendAutoLock();
});
function deriveKeyWithPassword(salt, masterPassword) {
  return Promise.resolve().then(function () {
    if (masterPassword) return masterPassword;
    if (rememberedMaster) return rememberedMaster;
    throw "master_password_required";
  }).then(function (masterPassword) {
    return deriveKey({
      masterPassword: masterPassword,
      salt: salt
    });
  });
}

function clearData(noLock) {
  return (noLock ? Promise.resolve() : lock.acquire()).then(function () {
    return storage.clear();
  })["finally"](function () {
    return noLock || lock.release();
  });
}

function changePassword(masterPassword, noLock) {
  var salt = generateRandom(16);
  return deriveKeyWithPassword(salt, masterPassword).then(function (newKey) {
    return emit(events$1, "changingPassword", noLock).then(function () {
      return clearData(noLock);
    }).then(function () {
      var rawHmacSecret = generateRandom(32);
      return Promise.all([importHmacSecret(rawHmacSecret), storage.set(formatKey, CURRENT_FORMAT, null), storage.set(saltKey, salt, null), storage.set(hmacSecretKey, rawHmacSecret, newKey)]);
    }).then(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 1),
          newHmacSecret = _ref4[0];

      rememberedMaster = masterPassword;
      key = newKey;
      hmacSecret = newHmacSecret;
    });
  });
}
function checkPassword(masterPassword) {
  var needsMigrating = false;
  return Promise.all([storage.get(formatKey, null), storage.get(saltKey, null)]).then(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        format = _ref6[0],
        salt = _ref6[1];

    if (format && format != CURRENT_FORMAT) return Promise.reject();
    if (!format) needsMigrating = true;
    if (!salt) return Promise.reject();
    return deriveKeyWithPassword(salt, masterPassword);
  }).then(function (newKey) {
    return storage.get(hmacSecretKey, newKey).then(function (rawHmacSecret) {
      return importHmacSecret(rawHmacSecret);
    }).then(function (newHmacSecret) {
      rememberedMaster = masterPassword;
      key = newKey;
      hmacSecret = newHmacSecret;

      if (needsMigrating) {
        migrateData$1(masterPassword)["catch"](function (e) {
          return console.error(e);
        });
        throw "migrating";
      }
    });
  })["catch"](function (e) {
    throw e == "migrating" ? e : "declined";
  });
}
function forgetPassword() {
  rememberedMaster = null;
  key = null;
  hmacSecret = null;
  return Promise.resolve();
}
function rekey(salt, rawHmacSecret, newKey) {
  return storage.getAllByPrefix(STORAGE_PREFIX).then(function (entries) {
    return Promise.all([entries, importHmacSecret(rawHmacSecret), storage.set(saltKey, salt, null), storage.set(hmacSecretKey, rawHmacSecret, newKey), storage["delete"](Object.keys(entries))]);
  }).then(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        entries = _ref8[0],
        newHmacSecret = _ref8[1];

    key = newKey;
    hmacSecret = newHmacSecret;
    var actions = [];

    for (var _key in entries) {
      var value = entries[_key];
      if (value.type) actions.push(setPassword(value));else actions.push(setSite(value));
    }

    return Promise.all(actions);
  });
}/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */
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
function getLink(_ref) {
  var type = _ref.type,
      param = _ref.param;
  if (type == "url") return param;else if (type == "relnotes") return "https://pfp.works/release-notes/".concat(param);else if (type == "documentation") return "https://pfp.works/documentation/".concat(param, "/");
  throw new Error("Unexpected link type");
}
function openLink(options) {
  return browser.tabs.create({
    url: getLink(options),
    active: true
  }).then(function (tab) {});
}
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
}/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */
var maxScriptID = 0;
function fillIn(passwordData) {
  return Promise.all([getPassword(passwordData), getCurrentHost().then(function (currentHost) {
    return Promise.all([currentHost, getAlias(currentHost)]);
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
      var port = getPort("contentScript");
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
}/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */
var blockSize = 14;
var version = 1;
var versionSize = 1;
var saltSize = 16;
var ivSize = 12;
var tagSize = 16;
function getValidChars() {
  return base32Alphabet;
}
function getCode(passwordData) {
  return Promise.resolve().then(function () {
    return getPassword(passwordData);
  }).then(function (password) {
    // Zero-pad passwords to fill up the row (don't allow deducing password
    // length from size of encrypted data)
    var passwordLen = new TextEncoder("utf-8").encode(password).length;

    while ((versionSize + saltSize + ivSize + tagSize + passwordLen) % blockSize) {
      password += "\0";
      passwordLen++;
    }

    return Promise.all([getSalt(), encrypt(password, undefined, false), passwordLen]);
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

    for (var _i = 0, _arr = [versionStr, salt, iv, ciphertext]; _i < _arr.length; _i++) {
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

          buffer[pos] = pearsonHash(buffer, blockStart, blockSize, virtualByte);
          pos++;
        }
      }
    } // Convert the data to Base32 and add separators


    return formatCode(toBase32(buffer));
  });
}
function formatCode(recoveryCode) {
  return recoveryCode.replace(new RegExp("[^".concat(base32Alphabet, "]"), "gi"), "").replace(/\w{24}/g, "$&\n").replace(/\w{12}(?=\w)/g, "$&:").replace(/\w{4}(?=\w)/g, "$&-");
}
function isValid(recoveryCode) {
  return Promise.resolve().then(function () {
    var buffer = fromBase32(recoveryCode);
    if (buffer.length % (blockSize + 1)) return "invalid-length";
    var blocks = buffer.length / (blockSize + 1);

    for (var i = 0; i < blocks; i++) {
      var blockStart = i * (blockSize + 1);
      if (i == blocks - 1 && buffer[blockStart + blockSize] == pearsonHash(buffer, blockStart, blockSize, 255 - i)) return "ok";
      if (buffer[blockStart + blockSize] != pearsonHash(buffer, blockStart, blockSize, i)) return "checksum_mismatch";
    }

    return "unterminated";
  });
}
function decodeCode(recoveryCode) {
  return Promise.resolve().then(function () {
    return isValid(recoveryCode);
  }).then(function (validationResult) {
    if (validationResult != "ok") throw validationResult; // isRecoveryCodeValid already validated the checksums, remove them.

    var buffer = fromBase32(recoveryCode);
    var withoutChecksums = new Uint8Array(buffer.length / (blockSize + 1) * blockSize);

    for (var i = 0, j = 0; i < buffer.length; i++) {
      if ((i + 1) % (blockSize + 1) != 0) withoutChecksums[j++] = buffer[i];
    }

    buffer = withoutChecksums;
    var pos = 0;
    if (buffer[pos] != version) throw "wrong_version";
    pos += versionSize;
    if (buffer.length < versionSize + saltSize + ivSize + tagSize) throw new Error("Unexpected: too little data");
    var salt = toBase64(buffer.slice(pos, pos += saltSize));
    var iv = toBase64(buffer.slice(pos, pos += ivSize));
    var ciphertext = toBase64(buffer.slice(pos));
    return Promise.all(["".concat(iv, "_").concat(ciphertext), deriveKeyWithPassword(salt)]);
  }).then(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        encrypted = _ref4[0],
        key = _ref4[1];

    return decrypt(encrypted, key, false);
  }).then(function (decoded) {
    return decoded.replace(/\0+$/, "");
  });
}/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */
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


function fetch$1(url, options) {
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

function authorize() {
  var url = getEndPoint("auth", {
    response_type: "token",
    client_id: clientId,
    redirect_uri: redirectUri
  });
  return openAndWait(url, redirectUri).then(function (url) {
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
}
function getManualAuthURL() {
  return getEndPoint("auth", {
    response_type: "token",
    client_id: clientId,
    redirect_uri: redirectUriManual
  });
}
function processAuthCode(code) {
  return Promise.resolve(code);
}
function get$1(path, token) {
  return fetch$1(getEndPoint("download"), {
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
}
function put(path, contents, replaceRevision, token) {
  var mode = replaceRevision ? {
    ".tag": "update",
    "update": replaceRevision
  } : "add";
  return fetch$1(getEndPoint("upload"), {
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
}var dropboxProvider = /*#__PURE__*/Object.freeze({authorize: authorize,getManualAuthURL: getManualAuthURL,processAuthCode: processAuthCode,get: get$1,put: put});/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */
var endpoints$1 = {
  "auth": "https://accounts.google.com/o/oauth2/v2/auth",
  "token": "https://www.googleapis.com/oauth2/v4/token",
  "files": "https://www.googleapis.com/drive/v2/files",
  "upload": "https://www.googleapis.com/upload/drive/v2/files"
};
var clientId$1 = "413724158571-0d0fqalv9vupfvhd5oo2j7q6ti2jr8vq.apps.googleusercontent.com";
var redirectUri$1 = "http://localhost:37602/";
var redirectUriManual$1 = "urn:ietf:wg:oauth:2.0:oob";

function getEndPoint$1(name, params) {
  var result = endpoints$1[name];

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
  data.append("client_id", clientId$1);
  data.append("grant_type", "refresh_token");
  return fetch(getEndPoint$1("token"), {
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

function authorize$1() {
  var url = getEndPoint$1("auth", {
    response_type: "code",
    client_id: clientId$1,
    redirect_uri: redirectUri$1,
    scope: "https://www.googleapis.com/auth/drive.appdata",
    access_type: "offline"
  });
  return openAndWait(url, redirectUri$1).then(function (url) {
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
    return processAuthCode$1(response.code, redirectUri$1);
  });
}
function getManualAuthURL$1() {
  return getEndPoint$1("auth", {
    response_type: "code",
    client_id: clientId$1,
    redirect_uri: redirectUriManual$1,
    scope: "https://www.googleapis.com/auth/drive.appdata",
    access_type: "offline"
  });
}
function processAuthCode$1(code, redirectUri) {
  var data = new URLSearchParams();
  data.append("code", code);
  data.append("client_id", clientId$1);
  data.append("redirect_uri", redirectUri || redirectUriManual$1);
  data.append("grant_type", "authorization_code");
  return fetch(getEndPoint$1("token"), {
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
}
function get$2(path, token) {
  if (path.startsWith("/")) path = path.substr(1);
  return getAccessToken(token).then(function (accessToken) {
    var url = getEndPoint$1("files", {
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
      var url = "".concat(getEndPoint$1("files"), "/").concat(file.id, "?alt=media");
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
}
function put$1(path, contents, replaceRevision, token) {
  if (path.startsWith("/")) path = path.substr(1);
  return getAccessToken(token).then(function (accessToken) {
    if (replaceRevision) {
      var _replaceRevision = _slicedToArray(replaceRevision, 2),
          id = _replaceRevision[0],
          etag = _replaceRevision[1];

      var url = "".concat(getEndPoint$1("upload"), "/").concat(id, "?uploadType=media");
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
      var _url = getEndPoint$1("upload", {
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
}var gdriveProvider = /*#__PURE__*/Object.freeze({authorize: authorize$1,getManualAuthURL: getManualAuthURL$1,processAuthCode: processAuthCode$1,get: get$2,put: put$1});/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */
var oauthProp = "http://tools.ietf.org/html/rfc6749#section-4.2";
var clientId$2 = "http://localhost:37602/";
var clientIdManual = "https://pfp.works";
var scope = "pfp";
var redirectUri$2 = "http://localhost:37602/";
var redirectUriManual$2 = "https://pfp.works/oauth-endpoint/";
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

function authorize$2(username) {
  return accountInfo(username).then(function (endpoints) {
    var url = addQuery(endpoints.auth, {
      response_type: "token",
      client_id: clientId$2,
      scope: scope + ":rw",
      redirect_uri: redirectUri$2
    });
    return openAndWait(url, redirectUri$2);
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
}
function getManualAuthURL$2(username) {
  return accountInfo(username).then(function (endpoints) {
    return addQuery(endpoints.auth, {
      response_type: "token",
      scope: scope + ":rw",
      client_id: clientIdManual,
      redirect_uri: redirectUriManual$2
    });
  });
}
function processAuthCode$2(code) {
  return Promise.resolve(code);
}
function get$3(path, token, username) {
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
}
function put$2(path, contents, replaceRevision, token, username) {
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
}var remotestorageProvider = /*#__PURE__*/Object.freeze({authorize: authorize$2,getManualAuthURL: getManualAuthURL$2,processAuthCode: processAuthCode$2,get: get$3,put: put$2});/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */
var MAX_RETRIES = 5;
var MILLIS_IN_SECOND = 1000;
var MILLIS_IN_MINUTE = 60 * MILLIS_IN_SECOND;
var MILLIS_IN_HOUR = 60 * MILLIS_IN_MINUTE;
var events$2 = EventTarget$1();

function getProvider(provider) {
  if (provider == "dropbox") return dropboxProvider;else if (provider == "gdrive") return gdriveProvider;else if (provider == "remotestorage") return remotestorageProvider;else throw new Error("Unknown sync provider");
}

var tracker = {
  enabled: false,
  prefix: "sync:",
  override: false,
  onModified: function onModified(key) {
    if (this.override || !key.startsWith(STORAGE_PREFIX)) return Promise.resolve();
    return storage.set(this.prefix + key, true, null);
  },
  enable: function enable(startUp) {
    var _this = this;

    if (this.enabled) return Promise.resolve();
    this.enabled = true;

    if (startUp) {
      storage.on("set", this.onModified);
      storage.on("delete", this.onModified);
      return Promise.resolve();
    } else {
      return storage.getAllByPrefix(STORAGE_PREFIX, null).then(function (items) {
        storage.on("set", _this.onModified);
        storage.on("delete", _this.onModified);
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
    storage.off("set", this.onModified);
    storage.off("delete", this.onModified);
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

      emit(events$2, "dataModified");
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

    return deriveKeyWithPassword(data[saltKey]).then(function (decryptionKey) {
      return Promise.all([decryptionKey, decrypt(data[hmacSecretKey], decryptionKey)]);
    })["catch"](function (error) {
      console.error(error);
      throw "sync_wrong_master_password";
    }).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          decryptionKey = _ref2[0],
          hmacSecret = _ref2[1];

      return rekey(data[saltKey], hmacSecret, decryptionKey);
    }).then(function () {
      return _this4.sync(nestingLevel + 1);
    });
  },
  _calculateSignature: function _calculateSignature(data, revision, rawSecret) {
    var values = [revision];
    var keys = Object.keys(data);
    keys.sort();

    for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
      var key = _keys[_i];
      values.push([key, data[key]]);
    }

    return importHmacSecret(rawSecret).then(function (secret) {
      return getDigest(secret, JSON.stringify(values));
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
      emit(events$2, "dataModified");
      return storage.set(this.storageKey, this.data, null);
    }

    var path = "/passwords.json";
    var _this$data = this.data,
        provider = _this$data.provider,
        token = _this$data.token,
        username = _this$data.username;
    var action = (nestingLevel ? Promise.resolve() : lock.acquire()).then(function () {
      return Promise.all([getProvider(provider).get(path, token, username), exportPasswordData([_this5.secretKey])]);
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

      if (!remote || _typeof(remote) != "object" || remote.application != local.application || remote.format != 2 && remote.format != 3 || !remote.data || _typeof(remote.data) != "object" || typeof remote.data[saltKey] != "string" || typeof remote.data[hmacSecretKey] != "string") {
        throw "sync_unknown_data_format";
      }

      if (remote.data[saltKey] != local.data[saltKey]) {
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
          return decrypt(remote.data[_this5.secretKey]);
        });
        validation = validation.then(function (secret) {
          return Promise.all([secret, _this5._validateSignature(remote.data, remote.revision, secret, remote.signature)]);
        }).then(function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 1),
              secret = _ref6[0];

          _this5.data.secret = secret;
          _this5.data.revision = remote.revision;
          emit(events$2, "dataModified");
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
        for (var _i2 = 0, _Object$keys = Object.keys(remote.data); _i2 < _Object$keys.length; _i2++) {
          var key = _Object$keys[_i2];

          if (!modifiedKeys.has(key)) {
            local.data[key] = remote.data[key];
            additions.push([key, local.data[key]]);
          } else if (local.data[key] != remote.data[key]) modified = true;
        }

        for (var _i3 = 0, _Object$keys2 = Object.keys(local.data); _i3 < _Object$keys2.length; _i3++) {
          var _key = _Object$keys2[_i3];

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
            _this5.data.secret = generateRandom(32);
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
          emit(events$2, "dataModified");
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

      if (_this5.data) {
        _this5.data.lastSync = Date.now();
        action = storage.set(_this5.storageKey, _this5.data, null);
      }

      if (!nestingLevel) {
        tracker.override = false;
        _this5.currentSync = null;
        emit(events$2, "dataModified");
        lock.release();
      }

      return action;
    });
    if (!nestingLevel) this.currentSync = action;
    delete this.data.error;
    emit(events$2, "dataModified");
    return Promise.all([action, storage.set(this.storageKey, this.data, null)]);
  },
  _reportError: function _reportError(e) {
    if (!this.data) return Promise.resolve();
    this.data.error = String(e);
    if (typeof e != "string") console.error(e);
    emit(events$2, "dataModified");
    return storage.set(this.storageKey, this.data, null);
  },
  _changingPassword: function _changingPassword(noLock) {
    // Disable sync before clearing data, otherwise it will create change
    // entries for everything removed.
    this.disable(noLock);
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
      emit(events$2, "dataModified");

      _this6._start();

      events$1.on("changingPassword", _this6._changingPassword);
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

      emit(events$2, "dataModified");
      events$1.off("changingPassword", _this7._changingPassword);
      return Promise.all([storage["delete"](_this7.storageKey), storage["delete"](_this7.secretKey), tracker.disable()]);
    })["finally"](function () {
      return noLock || lock.release();
    });
  }
};
engine._changingPassword = engine._changingPassword.bind(engine);
engine._check = engine._check.bind(engine);
engine.init();
function getSyncData() {
  return engine.data || {};
}
function isSyncing() {
  return !!engine.currentSync;
}
function authorize$3(provider, username) {
  return getProvider(provider).authorize(username).then(function (token) {
    return engine.setup(provider, token, username);
  })["catch"](function (error) {
    console.error(error);
  });
}
function getManualAuthURL$3(provider, username) {
  return getProvider(provider).getManualAuthURL(username);
}
function manualAuthorization(provider, username, code) {
  return getProvider(provider).processAuthCode(code).then(function (token) {
    return engine.setup(provider, token, username);
  });
}
function disableSync(noLock) {
  return engine.disable(noLock);
}
function sync() {
  return engine.sync();
}/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */
var port$1 = getPort("*");
port$1.on("_proxy", handleMessage);
var api = {
  passwords: {
    exportPasswordData: exportPasswordData,
    importPasswordData: importPasswordData,
    getPasswords: getPasswords,
    addAlias: addAlias,
    removeAlias: removeAlias,
    addGenerated: addGenerated,
    addStored: addStored,
    removePassword: removePassword,
    getPassword: getPassword,
    setNotes: setNotes,
    getAllPasswords: getAllPasswords,
    getAllSites: getAllSites,
    isMigrating: isMigrating
  },
  masterPassword: {
    changePassword: changePassword,
    checkPassword: checkPassword,
    forgetPassword: forgetPassword
  },
  passwordRetrieval: {
    fillIn: fillIn
  },
  prefs: {
    getPref: getPref,
    setPref: setPref
  },
  recoveryCodes: {
    getValidChars: getValidChars,
    getCode: getCode,
    formatCode: formatCode,
    isValid: isValid,
    decodeCode: decodeCode
  },
  sync: {
    authorize: authorize$3,
    getManualAuthURL: getManualAuthURL$3,
    manualAuthorization: manualAuthorization,
    disableSync: disableSync,
    sync: sync
  },
  ui: {
    showAllPasswords: showAllPasswords,
    getLink: getLink,
    openLink: openLink
  }
};

function handleMessage(_ref) {
  var messageId = _ref.messageId,
      moduleName = _ref.moduleName,
      method = _ref.method,
      args = _ref.args;
  Promise.resolve().then(function () {
    if (!api.hasOwnProperty(moduleName) || !api[moduleName].hasOwnProperty(method)) throw new Error("Unknown API call");
    return api[moduleName][method];
  }).then(function (func) {
    return func.apply(void 0, _toConsumableArray(args));
  }).then(function (result) {
    port$1.emit("_proxyResponse-" + messageId, [null, result]);
  })["catch"](function (error) {
    if (typeof error != "string") {
      console.error(error);
      if (error && error.stack) error = error + "\n" + error.stack;else error = String(error);
    }

    port$1.emit("_proxyResponse-" + messageId, [error, null]);
  });
}/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */

function importUnchanged(data, setRaw) {
  var mergeActions = [];

  for (var key in data) {
    if (key.startsWith(STORAGE_PREFIX)) mergeActions.push(setRaw(key, data[key]));
  }

  return Promise.all(mergeActions);
}

function decryptThenImport(data, masterPass, setSite, setPassword) {
  return deriveKeyWithPassword(data[saltKey], masterPass).then(function (decryptionKey) {
    return Promise.all([decryptionKey, decrypt(data[hmacSecretKey], decryptionKey)]);
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
      if (key.startsWith(STORAGE_PREFIX)) decryptActions.push(decrypt(data[key], decryptionKey));
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
              masterPassword: masterPass || getMasterPassword(),
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
            if (entry.type == "generated2") action = derivePassword(params);else action = derivePasswordLegacy(params);
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

    if (!data || _typeof(data) != "object" || data.application != "pfp" || data.format != 2 && data.format != 3 || !data.data || _typeof(data.data) != "object" || typeof data.data[saltKey] != "string" || typeof data.data[hmacSecretKey] != "string") {
      throw "unknown_data_format";
    }

    return Promise.all([storage.get(saltKey, null), storage.get(hmacSecretKey, null)]);
  }).then(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        saltRaw = _ref4[0],
        hmacSecretRaw = _ref4[1];

    if (masterPass) return decryptThenImport(data.data, masterPass, setSite, setPassword);else if (saltRaw == data.data[saltKey] && hmacSecretRaw == data.data[hmacSecretKey]) {
      // Backup was created with the same crypto parameters, we can just import
      // the entries as they are, without decrypting them first.
      return importUnchanged(data.data, setRaw);
    } else return decryptThenImport(data.data, null, setSite, setPassword);
  });
}

registerImporter(import_);/*
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

function import_$1(data, setRaw, setSite, setPassword) {
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

registerImporter(import_$1);/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */

function getSyncState() {
  var data = getSyncData();
  return {
    provider: data.provider || null,
    username: data.username || null,
    lastSync: data.lastSync || null,
    error: data.error || null,
    isSyncing: isSyncing()
  };
}

var panelPort = getPort("panel");
panelPort.on("connect", function () {
  suspendAutoLock();
  Promise.all([getCurrentHost(), getState()]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        currentHost = _ref2[0],
        masterPasswordState = _ref2[1];

    if (masterPasswordState != "known") return panelPort.emit("init", {
      masterPasswordState: masterPasswordState,
      origSite: currentHost,
      sync: getSyncState()
    });
    return getPasswords(currentHost).then(function (_ref3) {
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
  resumeAutoLock();
});
events$2.on("dataModified", function () {
  var state = getSyncState();
  panelPort.emit("init", {
    sync: state
  });
});var locale = {
  "ok": "OK",
  "cancel": "Cancel",
  "no_site_placeholder": "(none)",
  "allpasswords@App@title": "All passwords known to PfP",
  "allpasswords@App@show_notes": "Show notes",
  "allpasswords@App@show_passwords": "Show passwords",
  "allpasswords@App@intro": "Here you can create an encrypted backup of your data. This page is also safe to print as long as the passwords aren't shown, the information shown is sufficient to recreate the passwords (same master password has to be used).",
  "allpasswords@App@show_passwords_confirm": "This will display all your passwords on screen, please only proceed if nobody can watch over your shoulder. This action might take some time to complete.",
  "components@Confirm@yes": "Yes",
  "components@Confirm@no": "No",
  "components@EnterMaster@master_password": "Enter master password:",
  "components@EnterMaster@submit": "Access passwords",
  "components@EnterMaster@password_too_short": "The master password should be at least 6 characters long.",
  "components@EnterMaster@password_declined": "This doesn't seem to be the master password you have used before.",
  "components@PasswordMessage@password_ready": "Your password is ready, click again anywhere to copy it.",
  "components@PasswordMessage@password_copied": "Password has been copied to clipboard.",
  "components@PasswordMessage@username_copied": "User name has been copied to clipboard.",
  "components@PasswordMessage@no_such_password": "Unknown password!",
  "components@PasswordMessage@unknown_generation_method": "Unknown password generation method!",
  "components@PasswordMessage@wrong_site": "You are not on the right website!",
  "components@PasswordMessage@no_password_fields": "The page has no password fields or the password fields belong to a different site! Maybe click the user name field and try again.",
  "components@PasswordMessage@import_success": "Passwords data has been imported.",
  "components@PasswordMessage@unknown_data_format": "Unknown data format!",
  "components@PasswordMessage@syntax_error": "The file contains errors and could not be imported.",
  "components@Setting@autolock_title": "Enable auto-lock",
  "components@Setting@autolock_description": "Lock passwords automatically when the panel is closed",
  "components@Setting@autolock_delay_title": "Auto-lock delay",
  "components@Setting@autolock_delay_description": "Interval in minutes after which the passwords should be locked",
  "components@UnknownError@close": "Close",
  "components@UnknownError@description": "The operation failed unexpectedly.",
  "components@UnknownError@more": "Show error message",
  "panel@App@select_site": "Select site",
  "panel@App@password_list": "Password list",
  "panel@App@sync": "Data sync",
  "panel@App@settings": "Settings",
  "panel@App@lock_passwords": "Lock passwords",
  "web@App@compat_message": "Your browser lacks the required functionality for this application. At least Mozilla Firefox 43, Google Chrome 51, Opera 38, Apple Safari 11 or Microsoft Edge 12 is required.",
  "allpasswords@components@GlobalActions@export": "Export password definitions to a file",
  "allpasswords@components@GlobalActions@import": "Import password definitions from a file",
  "allpasswords@components@GlobalActions@print": "Print",
  "allpasswords@components@GlobalActions@import_with_master": "It seems that this backup was created with a different master password. It can still be imported, all generated passwords will be converted to stored passwords however.",
  "allpasswords@components@GlobalActions@import_confirm": "Your existing passwords might get overwritten. Are you sure you want to proceed?",
  "allpasswords@components@PasswordInfo@password_type_stored": "Stored password, recovery code below",
  "allpasswords@components@PasswordInfo@recovery_code_explanation": "Recovery codes can be entered instead of the password when adding a stored password. They are safe to print, decryption is only possible with the right master password.",
  "allpasswords@components@SiteInfo@aliases_label": "Aliases:",
  "panel@components@GeneratedPassword@replace_warning": "Making this a generated password will change its value. Make sure that you already filled in \"current password\" in the website's password change form.",
  "panel@components@GeneratedPassword@keep_notes": "Keep notes from original password",
  "panel@components@GeneratedPassword@length_label": "Length:",
  "panel@components@GeneratedPassword@allowed_characters_label": "Allowed characters:",
  "panel@components@GeneratedPassword@submit": "Generate password",
  "panel@components@GeneratedPassword@no_characters_selected": "At least one character set has to be selected.",
  "panel@components@ManualAuth@token_label": "Please paste the code given by the storage provider:",
  "panel@components@NotesEditor@notes_label": "Password notes:",
  "panel@components@NotesEditor@submit": "Save notes",
  "panel@components@PasswordEntry@password_menu": "All actions",
  "panel@components@PasswordEntry@password_type_generated2": "Generated password",
  "panel@components@PasswordEntry@password_type_stored": "Stored password",
  "panel@components@PasswordEntry@password_length": "Length:",
  "panel@components@PasswordEntry@allowed_characters": "Allowed characters:",
  "panel@components@PasswordEntry@notes": "Notes:",
  "panel@components@PasswordEntry@remove_confirmation": "Do you really want to remove the password \"{1}\" for the website {2}?",
  "panel@components@PasswordEntry@remove_confirmation_notes": "This password has notes attached to it: {1}",
  "panel@components@PasswordMenu@to_document": "Fill in",
  "panel@components@PasswordMenu@to_clipboard": "Copy to clipboard",
  "panel@components@PasswordMenu@to_clipboard_username": "Copy user name",
  "panel@components@PasswordMenu@show_qrcode": "Show as QR code",
  "panel@components@PasswordMenu@add_notes": "Add notes",
  "panel@components@PasswordMenu@edit_notes": "Edit notes",
  "panel@components@PasswordMenu@make_generated": "Replace by generated password",
  "panel@components@PasswordMenu@bump_revision": "Generate new password for this user name",
  "panel@components@PasswordMenu@remove_password": "Remove password",
  "panel@components@PasswordNameEntry@username_label": "User name:",
  "panel@components@PasswordNameEntry@change_password_revision": "Need a new password for the same username?",
  "panel@components@PasswordNameEntry@revision_label": "Revision:",
  "panel@components@PasswordNameEntry@username_required": "Please enter your user name or an arbitrary name if the website doesn't require one.",
  "panel@components@PasswordNameEntry@username_exists": "This user name and revision combination already exists. Maybe increase the revision number?",
  "panel@components@RecoveryCode@label": "Recovery code:",
  "panel@components@RecoveryCode@remove_line": "Remove line",
  "panel@components@RecoveryCode@checksum_mismatch": "Row is mistyped or not the next row.",
  "panel@components@RecoveryCode@wrong_version": "Unknown recovery code format, maybe generated by a newer version.",
  "panel@components@RemoteStorageUsernameInput@username_label": "Please enter your remoteStorage user address:",
  "panel@components@RemoteStorageUsernameInput@get_account": "Don't have remoteStorage? Learn where to get an account or how to host your own.",
  "panel@components@RemoteStorageUsernameInput@invalid_username": "This doesn't seem to be a valid remoteStorage user address.",
  "panel@components@SiteSelection@no_sites": "No sites matched your search",
  "panel@components@SiteSelection@submit": "Select",
  "panel@components@StoredPassword@warning": "Generated passwords are preferable, these can be easily recovered as long as you still remember your master password and user name.",
  "panel@components@StoredPassword@password_label": "Password:",
  "panel@components@StoredPassword@use_recovery": "Use recovery code",
  "panel@components@StoredPassword@cancel_recovery": "Enter password directly",
  "panel@components@StoredPassword@submit": "Save password",
  "panel@components@StoredPassword@password_value_required": "Please enter the password you used on this website.",
  "panel@pages@ChangeMaster@new_master_message": "You didn't define a master password yet, please do so below.",
  "panel@pages@ChangeMaster@reset_master_message": "Warning: If you change your master password all your existing passwords will be reset.",
  "panel@pages@ChangeMaster@master_security_message": "It is essential that you choose a strong master password.",
  "panel@pages@ChangeMaster@new_master": "New master password:",
  "panel@pages@ChangeMaster@new_master_repeat": "Repeat password:",
  "panel@pages@ChangeMaster@submit": "Set master password",
  "panel@pages@ChangeMaster@weak_password": "Your master password is too simple and wouldn't take long enough to guess. It is recommended that you choose a more complicated password. Do you really want to proceed with this master password?",
  "panel@pages@ChangeMaster@passwords_differ": "Passwords don't match.",
  "panel@pages@EnterMaster@reset": "Reset master password",
  "panel@pages@Migration@title": "Legacy passwords and data are no longer supported",
  "panel@pages@Migration@intro": "In order for PfP: Pain-free Passwords to be more robust, some outdated functionality has been removed:",
  "panel@pages@Migration@change1": "Legacy (EasyPasswords 1.x) generated passwords are no longer supported. If you still have any, these will be converted to stored passwords now.",
  "panel@pages@Migration@change2": "Legacy (unencrypted) backups will no longer be imported.",
  "panel@pages@Migration@conclusion": "None of this is likely to affect you. Still, you might want to create a new backup just so you have one with current data.",
  "panel@pages@Migration@in_progress": "Updating your data, please wait…",
  "panel@pages@Migration@continue": "Continue",
  "panel@pages@PasswordList@site": "Website name:",
  "panel@pages@PasswordList@alias_description": "You indicated that {1} shares passwords with this website.",
  "panel@pages@PasswordList@remove_alias": "Revert",
  "panel@pages@PasswordList@add_alias": "This website shares passwords with another?",
  "panel@pages@PasswordList@select_alias": "Mark \"{1}\" as an alias for:",
  "panel@pages@PasswordList@remove_alias_confirmation": "Do you really want to stop treating {1} as an alias for {2}?",
  "panel@pages@PasswordList@passwords_label": "Passwords:",
  "panel@pages@PasswordList@no_passwords_message": "No passwords yet",
  "panel@pages@PasswordList@generate_password_link": "Generate new password",
  "panel@pages@PasswordList@stored_password_link": "Enter stored password",
  "panel@pages@PasswordList@show_all_passwords": "Show all passwords",
  "panel@pages@SelectSite@label": "Please select a site:",
  "panel@pages@Sync@provider_label": "Uploading to:",
  "panel@pages@Sync@lastTime_label": "Last upload:",
  "panel@pages@Sync@lastTime_now": "Running…",
  "panel@pages@Sync@lastTime_never": "Never",
  "panel@pages@Sync@failed": "(failed)",
  "panel@pages@Sync@succeeded": "(succeeded)",
  "panel@pages@Sync@reauthorize": "Reauthorize…",
  "panel@pages@Sync@do_sync": "Upload now",
  "panel@pages@Sync@disable": "Disable sync",
  "panel@pages@Sync@disable_confirmation": "Do you really want to disable sync functionality? Your data will no longer be backed up to your provider automatically.",
  "panel@pages@Sync@selection_label": "Please select your storage provider:",
  "panel@pages@Sync@how_heading": "How does this work?",
  "panel@pages@Sync@how_text": "You grant PfP access to a directory within your personal account on Dropbox or another storage provider. This access will be used to upload a file with encrypted data regularly. It's the same data as with your manual backup, but you can connect multiple devices to the same account and changes will propagate to all of them automatically – assuming that they all use the same master password.",
  "panel@pages@Sync@security_heading": "Is this safe?",
  "panel@pages@Sync@security_text": "Yes. PfP can only access its own file, not the other files stored in your account. Also, the file's data is fully encrypted and can only be decrypted using your master password.",
  "panel@pages@Sync@no_account_heading": "What if I don't have an account?",
  "panel@pages@Sync@no_account_text": "It doesn't matter, you can create an account for free. You don't need to use that account for anything beyond PfP.",
  "panel@pages@Sync@sync_invalid_token": "Access has been denied, you probably need to authorize PfP again.",
  "panel@pages@Sync@sync_unknown_data_format": "Format of currently stored data is unrecognized, it might have been created by a newer PfP version.",
  "panel@pages@Sync@sync_connection_error": "Server connection failed.",
  "panel@pages@Sync@sync_too_many_retries": "Too many retries after conflicting modifications.",
  "panel@pages@Sync@sync_multiple_candidates": "Your storage provider has multiple PfP files stored for some reason. You probably need to delete PfP data there and sync again.",
  "panel@pages@Sync@sync_malformed_response": "Your storage provider responded in a way that PfP could not understand.",
  "panel@pages@Sync@sync_wrong_master_password": "It seems that the currently stored data was encrypted with a different master password.",
  "panel@pages@Sync@sync_unrelated_client": "It seems that remote data has been created by an unrelated PfP instance. If you want to sync to it, disable sync now and set it up again.",
  "panel@pages@Sync@sync_tampered_data": "It seems that remote data has either been tampered with or reset to an older revision. Remove remote data to fix this issue.",
  "panel@pages@Sync@sync_master_password_required": "Initial sync requires passwords to be unlocked, please click \"Upload now\" to retry.",
  "panel@pages@learn_more": "Learn more…"
};/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */
var port$2 = {
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
    return port$2;
  },
  getBackgroundPage: function getBackgroundPage() {
    return Promise.reject(new Error("Not implemented"));
  }
};
var i18n = {
  getMessage: function getMessage(id) {
    return locale[id];
  }
};
window.addEventListener("fromBackground", function (event) {
  port$2.onMessage._emit(event.detail);
});/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */
function $t(id) {
  var path;

  if (id.length && id[0] == "/") {
    path = "";
    id = id.substr(1);
  } else if (this.$options.localePath) path = this.$options.localePath;else throw new Error("Components without localePath option can only use absolute string paths");

  while (id.length) {
    if (id[0] == ".") {
      path = path.replace(/\/?[^/]+$/, "");
      id = id.substr(1);
    } else if (id[0] == "(") {
      var index = id.indexOf(")");
      if (index < 0) throw new Error("Unclosed path component in string ID.");
      if (path) path += "/";
      path += id.substring(1, index);
      id = id.substr(index + 1);
    } else break;
  }

  if (path) id = path.replace(/\//g, "@") + "@" + id;
  var message = i18n.getMessage(id);

  for (var i = 0; i < (arguments.length <= 1 ? 0 : arguments.length - 1); i++) {
    message = message.replace(new RegExp("\\{".concat(i + 1, "\\}"), "g"), i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1]);
  }

  return message;
}
var I18n = {
  install: function install(Vue) {
    Vue.prototype.$t = $t;
  }
};/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */
function getSiteDisplayName(site) {
  if (site == "pfp.invalid") return $t("/no_site_placeholder");else if (site) return site;else return "???";
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
}/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */
var vowelRegexp = /[AEIOUaeiouªºÀ-ÆÈ-ÏÒ-ÖÙ-Üà-æè-ïò-öù-üĀ-ąĒ-ěĨ-İĲĳŌ-őŨ-ųƠơƯưǍ-ǜǞ-ǣǪ-ǭǺ-ǽȀ-ȏȔ-ȗȦ-ȱΆΈ-ΊΌΎ-ΑΕΗΙΟΥΩ-αεηιουω-ώϒ-ϔϵЀЁЄІЇЍЎАЕИЙОУЫЭ-аеийоуыэ-ёєіїѝўӐ-ӓӖӗӢ-ӧӬ-ӳӸӹᴬᴭᴱᴵᴼᵁᵃᵉᵒᵘᵢᵤḀḁḔ-ḝḬ-ḯṌ-ṓṲ-ṻẚẠ-ựἀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-ΰῦ-Ύῲ-ῴῶ-ῼⁱₐ-ₒℐℑΩÅℯℰℴℹⅇⅈﬁﬃＡＥＩＯＵａｅｉｏ]/;
var digitRegexp = /\d/;
var fallbackKeys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

var isLetter = function () {
  try {
    var regexp = new RegExp("\\p{Letter}", "u");
    return function (_char) {
      return regexp.test(_char);
    };
  } catch (e) {
    // Fallback if Unicode property escapes aren't supported
    return function (_char2) {
      return _char2.toLowerCase() != _char2 || _char2.toUpperCase() != _char2;
    };
  }
}();

function isDigit(_char3) {
  return digitRegexp.test(_char3);
}

function isUpperCase(_char4) {
  return _char4 == _char4.toUpperCase() && !isDigit(_char4);
}

function isConsonant(_char5) {
  return !vowelRegexp.test(_char5) && !isDigit(_char5);
}

var accessKeys = null;
var accessKeyElements = null;
var observer = null;

function onKeyDown(event) {
  if (!accessKeys && event.key == "Alt" && !event.ctrlKey && !event.metaKey) showHints();else if (accessKeys && event.altKey && !event.ctrlKey && !event.metaKey) triggerHint(event);
}

function onKeyUp(event) {
  if (!event.altKey) hideHints();
}

function onBlur(event) {
  if (event.eventPhase == Event.AT_TARGET) hideHints();
}

function showHints() {
  var elements = [];
  var root = document.querySelector(".modalOverlay") || document;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = root.querySelectorAll("button,label,a")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var element = _step.value;
      if (element.hasAttribute("data-noaccesskey")) continue;
      if (element.classList.contains("tab")) elements.push([0, element.title.trim(), element]);else if (element.localName == "button") elements.push([1, element.textContent.trim(), element]);else if (element.localName != "a") elements.push([2, element.textContent.trim(), element]);else if (!element.classList.contains("iconic-link")) elements.push([3, element.textContent.trim() || element.title.trim(), element]);else elements.push([4, element.textContent.trim() || element.title.trim(), element]);
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

  elements.sort(function (a, b) {
    return a[0] - b[0];
  });
  accessKeys = new Map();

  function findAccessKey(text, element) {
    var letters = [];

    for (var i = 0; i < text.length; i++) {
      if (!letters.includes(text[i]) && (isLetter(text[i]) || isDigit(text[i]))) letters.push(text[i]);
    }

    for (var _len = arguments.length, selectors = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      selectors[_key - 2] = arguments[_key];
    }

    for (var _i = 0, _selectors = selectors; _i < _selectors.length; _i++) {
      var selector = _selectors[_i];

      for (var _i2 = 0, _letters = letters; _i2 < _letters.length; _i2++) {
        var letter = _letters[_i2];

        if (selector(letter) && !accessKeys.has(letter.toUpperCase())) {
          accessKeys.set(letter.toUpperCase(), element);
          return true;
        }
      }
    }

    return false;
  }

  var needFallback = [];

  for (var _i3 = 0, _elements = elements; _i3 < _elements.length; _i3++) {
    var _elements$_i = _slicedToArray(_elements[_i3], 3),
        text = _elements$_i[1],
        _element = _elements$_i[2];

    if (!findAccessKey(text, _element, isUpperCase, isConsonant, isLetter, function () {
      return true;
    })) needFallback.push(_element);
  }

  for (var _i4 = 0, _needFallback = needFallback; _i4 < _needFallback.length; _i4++) {
    var _element2 = _needFallback[_i4];

    for (var i = 0; i < fallbackKeys.length; i++) {
      if (!accessKeys.has(fallbackKeys[i])) {
        accessKeys.set(fallbackKeys[i], _element2);
        break;
      }
    }
  }

  accessKeyElements = [];
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = accessKeys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _step2$value = _slicedToArray(_step2.value, 2),
          letter = _step2$value[0],
          _element3 = _step2$value[1];

      var found = false;

      for (var child = _element3.firstChild; child; child = child.nextSibling) {
        if (child.nodeType == Node.TEXT_NODE) {
          var text = child.nodeValue;
          var index = text.indexOf(letter);
          if (index < 0) index = text.indexOf(letter.toLowerCase());

          if (index >= 0) {
            found = true;
            var replacements = [];
            if (index > 0) replacements.push(document.createTextNode(text.substr(0, index)));
            var span = document.createElement("span");
            span.className = "accessKeyMarker";
            span.textContent = text.substr(index, 1);
            replacements.push(span);
            accessKeyElements.push(span);
            if (index + 1 < text.length) replacements.push(document.createTextNode(text.substr(index + 1)));

            _element3.replaceChild(replacements[0], child);

            var insertionPoint = replacements[0].nextSibling;

            for (var _i5 = 1; _i5 < replacements.length; _i5++) {
              _element3.insertBefore(replacements[_i5], insertionPoint);
            }

            break;
          }
        }
      }

      if (!found) {
        var hint = document.createElement("div");
        hint.className = "accessKeyHint";
        hint.textContent = letter;

        _element3.parentNode.appendChild(hint);

        hint.style.left = _element3.offsetLeft + (_element3.offsetWidth - hint.offsetWidth) / 2 + "px";
        hint.style.top = _element3.offsetTop + (_element3.offsetHeight - hint.offsetHeight) / 2 + "px";
        accessKeyElements.push(hint);
      }
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

  observer = new MutationObserver(hideHints);
  observer.observe(document, {
    childList: true,
    attributes: true,
    subtree: true
  });
}

function hideHints() {
  if (!accessKeys) return;
  accessKeys = null;

  if (accessKeyElements) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = accessKeyElements[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var element = _step3.value;
        if (!element.parentNode) continue;

        if (element.localName == "span") {
          var text = "";

          if (element.previousSibling && element.previousSibling.nodeType == Node.TEXT_NODE) {
            text += element.previousSibling.nodeValue;
            element.parentNode.removeChild(element.previousSibling);
          }

          text += element.textContent;

          if (element.nextSibling && element.nextSibling.nodeType == Node.TEXT_NODE) {
            text += element.nextSibling.nodeValue;
            element.parentNode.removeChild(element.nextSibling);
          }

          element.parentNode.replaceChild(document.createTextNode(text), element);
        } else element.parentNode.removeChild(element);
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
  }

  accessKeyElements = null;
  if (observer) observer.disconnect();
  observer = null;
}

function triggerHint(event) {
  var element = accessKeys.get(event.key.toUpperCase());

  if (element) {
    event.preventDefault();

    if (element.localName == "label" && element.hasAttribute("for")) {
      var target = document.getElementById(element.getAttribute("for"));
      target.focus();
      target.click();
    } else element.click();
  }
}

var AccessKeys = {
  install: function install(Vue) {
    window.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("keyup", onKeyUp, true);
    window.addEventListener("blur", onBlur, true);
  }
};/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */
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
        emit.apply(void 0, [port$3, message.eventName].concat(_toConsumableArray(message.args)));
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
var port$3 = new EventTarget$1();
port$3.name = portName;

port$3.emit = function (eventName) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  nativePort.postMessage({
    eventName: eventName,
    args: args
  });
};

port$3.disconnect = function () {
};

nativePort.onMessage.addListener(function (message) {
  if (messageQueue) messageQueue.push(message);else emit.apply(void 0, [port$3, message.eventName].concat(_toConsumableArray(message.args)));
});/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */
var errorHandlers = new Map();
var currentHandlers = new Map();
var maxMessageId = 0;

function sendMessage(message) {
  return new Promise(function (resolve, reject) {
    var messageId = message.messageId = port$3.name + ++maxMessageId;
    port$3.once("_proxyResponse-" + messageId, function (_ref) {
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
    port$3.emit("_proxy", message);
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
var passwordRetrieval = Proxy("passwordRetrieval", ["fillIn"]);
var prefs = Proxy("prefs", ["getPref", "setPref"]);
var recoveryCodes = Proxy("recoveryCodes", ["getValidChars", "getCode", "formatCode", "isValid", "decodeCode"]);
var sync$1 = Proxy("sync", ["authorize", "getManualAuthURL", "manualAuthorization", "disableSync", "sync"]);
var ui = Proxy("ui", ["showAllPasswords", "getLink", "openLink"]);//
var script = {
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
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.$isWebClient
    ? _c(
        "a",
        { attrs: { href: _vm.url, target: "_blank", rel: "noopener" } },
        [_vm._t("default")],
        2
      )
    : _c(
        "a",
        {
          attrs: { href: "#" },
          on: {
            click: function($event) {
              $event.preventDefault();
              return _vm.click($event)
            }
          }
        },
        [_vm._t("default")],
        2
      )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var ExternalLink = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );//

var script$1 = {
  name: "IconicLink",
  props: {
    title: {
      type: String,
      required: true
    }
  }
};/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("a", {
    attrs: { href: "#", title: _vm.title, "aria-label": _vm.title },
    on: {
      click: function($event) {
        $event.preventDefault();
        return _vm.$emit("click")
      }
    }
  })
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var IconicLink = normalizeComponent_1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );//
//
//
//
//
//
//
//
//
//
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
var script$2 = {
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
      savedActiveElement: null,
      observer: null
    };
  },
  beforeMount: function beforeMount() {
    if (activeModal) this.savedActiveElement = activeModal.savedActiveElement;else this.savedActiveElement = document.activeElement;
    activeModal = this;
  },
  mounted: function mounted() {
    this.ensureDocHeight();
    this.observer = new MutationObserver(this.ensureDocHeight);
    this.observer.observe(this.$el, {
      childList: true,
      attributes: true,
      subtree: true
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (activeModal == this) {
      document.body.style.minHeight = "";
      if (this.savedActiveElement) this.savedActiveElement.focus();
      activeModal = null;
    }

    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
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
};/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
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
          $event.stopPropagation();
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
            ? _c(
                "div",
                { staticClass: "modalOverlay-cancel-container" },
                [
                  _c("iconic-link", {
                    directives: [{ name: "cancel", rawName: "v-cancel" }],
                    ref: "cancel",
                    staticClass: "cancel",
                    attrs: { title: _vm.$t("/cancel") },
                    on: {
                      click: function($event) {
                        return _vm.$emit("cancel")
                      }
                    }
                  })
                ],
                1
              )
            : _vm._e(),
          _c("div", [_vm._t("default")], 2)
        ]
      )
    ]
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var ModalOverlay = normalizeComponent_1(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    undefined,
    undefined
  );//

var script$3 = {
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
        var error = child.update();

        if (error && !seenErrors) {
          seenErrors = true;
          child.$el.focus();
        }
      });
      if (!seenErrors) this.$emit("validated");
    }
  }
};/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "form",
    {
      on: {
        submit: function($event) {
          $event.preventDefault();
          return _vm.submit($event)
        }
      }
    },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var ValidatedForm = normalizeComponent_1(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    undefined,
    undefined
  );//

var script$4 = {
  name: "ValidatedInput",
  props: {
    "value": {
      type: String,
      required: true
    },
    "error": {
      type: Object,
      "default": null
    },
    "visible": {
      type: Boolean,
      "default": true
    }
  },
  data: function data() {
    return {
      actualValue: this.value,
      eagerValidation: false
    };
  },
  watch: {
    value: function value() {
      this.actualValue = this.value;
      this.update();
    },
    actualValue: function actualValue() {
      this.$emit("input", this.actualValue);
    }
  },
  methods: {
    update: function update() {
      if (!this.eagerValidation) return null;
      var error = null;
      this.$emit("validate", this.value, function (e) {
        return error = e;
      });
      this.$emit("update:error", error);
      return error;
    }
  }
};/* script */
const __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.visible
    ? _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model.trim",
            value: _vm.actualValue,
            expression: "actualValue",
            modifiers: { trim: true }
          }
        ],
        domProps: { value: _vm.actualValue },
        on: {
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.actualValue = $event.target.value.trim();
          },
          blur: function($event) {
            return _vm.$forceUpdate()
          }
        }
      })
    : _vm._e()
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var ValidatedInput = normalizeComponent_1(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    undefined,
    undefined
  );/*
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

Vue.use(I18n);
Vue.use(AccessKeys);
Vue.component("external-link", ExternalLink);
Vue.component("iconic-link", IconicLink);
Vue.component("modal-overlay", ModalOverlay);
Vue.component("validated-form", ValidatedForm);
Vue.component("validated-input", ValidatedInput);
Vue.directive("focus", {
  inserted: function inserted(element, binding) {
    if (typeof binding.value == "undefined" || binding.value) element.focus();
  }
});
Vue.directive("cancel", {
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
Vue.directive("select", {
  inserted: function inserted(element) {
    element.select();
  }
});
Vue.directive("scroll-active", {
  update: function update(element) {
    if (element.classList.contains("active")) element.scrollIntoView({
      block: "nearest"
    });
  }
});
Vue.directive("keyboard-navigation", {
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
Vue.mixin({
  beforeCreate: function beforeCreate() {
    if (this.$options.name == "App") this.$app = this;else if (this.$parent) this.$app = this.$parent.$app;
  }
});
function runApp(App) {
  var isWebClient = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  Vue.prototype.$isWebClient = isWebClient;

  function init() {
    window.removeEventListener("load", init);
    new Vue({
      el: "#app",
      render: function render(createElement) {
        return createElement(App);
      }
    });
  }

  if (document.readyState != "complete") window.addEventListener("load", init);else init();
}//
function validateMasterPassword(value, setError) {
  if (value.length < 6) setError(this.$t("/(components)(EnterMaster)password_too_short"));
}
var script$5 = {
  name: "EnterMaster",
  localePath: "components/EnterMaster",
  props: {
    callback: {
      type: Function,
      "default": null
    },
    warning: {
      type: String,
      "default": null
    },
    cancelable: {
      type: Boolean,
      "default": true
    }
  },
  data: function data() {
    return {
      masterPassword: "",
      masterPasswordError: null
    };
  },
  methods: {
    submit: function submit() {
      var _this = this;

      if (this.callback) {
        this.callback(this.masterPassword);
        this.$emit("done", true);
      } else {
        masterPassword.checkPassword(this.masterPassword).then(function () {
          _this.$emit("done", true);
        })["catch"](function (error) {
          if (error == "declined") _this.masterPasswordError = _this.$t("password_declined");else if (error == "migrating") _this.$emit("done", error);else _this.$app.showUnknownError(error);
        });
      }
    },
    validateMasterPassword: validateMasterPassword
  }
};/* script */
const __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "validated-form",
    {
      on: { validated: _vm.submit },
      nativeOn: {
        reset: function($event) {
          $event.preventDefault();
          return _vm.$emit("done", false)
        }
      }
    },
    [
      _vm.warning
        ? _c("div", { staticClass: "warning" }, [_vm._v(_vm._s(_vm.warning))])
        : _vm._e(),
      _c("label", { attrs: { for: "master-password" } }, [
        _vm._v(_vm._s(_vm.$t("master_password")))
      ]),
      _c("validated-input", {
        directives: [{ name: "focus", rawName: "v-focus" }],
        attrs: {
          id: "master-password",
          type: "password",
          error: _vm.masterPasswordError
        },
        on: {
          "update:error": function($event) {
            _vm.masterPasswordError = $event;
          },
          validate: _vm.validateMasterPassword
        },
        model: {
          value: _vm.masterPassword,
          callback: function($$v) {
            _vm.masterPassword = $$v;
          },
          expression: "masterPassword"
        }
      }),
      _vm.masterPasswordError
        ? _c("div", { staticClass: "error" }, [
            _vm._v(" " + _vm._s(_vm.masterPasswordError) + " ")
          ])
        : _vm._e(),
      _c("div", { staticClass: "button-container" }, [
        _c("button", { attrs: { type: "submit" } }, [
          _vm._v(_vm._s(_vm.$t("submit")))
        ]),
        _vm.cancelable
          ? _c("button", { attrs: { type: "reset" } }, [
              _vm._v(_vm._s(_vm.$t("/cancel")))
            ])
          : _vm._e()
      ]),
      _vm._t("default")
    ],
    2
  )
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  const __vue_inject_styles__$5 = undefined;
  /* scoped */
  const __vue_scope_id__$5 = undefined;
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var EnterMaster = normalizeComponent_1(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    undefined,
    undefined
  );//
var script$6 = {
  name: "EnterMaster",
  localePath: "panel/pages/EnterMaster",
  components: {
    "enter-master": EnterMaster
  },
  methods: {
    done: function done(success) {
      var _this = this;

      if (!success) return;
      if (success == "migrating") this.$app.masterPasswordState = "migrating";else {
        passwords.getPasswords(this.$app.origSite).then(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 3),
              origSite = _ref2[0],
              site = _ref2[1],
              pwdList = _ref2[2];

          _this.$app.origSite = origSite;
          _this.$app.site = site;
          _this.$app.pwdList = pwdList;
          _this.$app.masterPasswordState = "known";
        })["catch"](this.$app.showUnknownError);
      }
    }
  }
};/* script */
const __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _c(
        "enter-master",
        {
          staticClass: "page",
          attrs: { cancelable: false },
          on: { done: _vm.done }
        },
        [
          _c("div", { staticClass: "link-container" }, [
            _c(
              "a",
              {
                attrs: { href: "#" },
                on: {
                  click: function($event) {
                    $event.preventDefault();
                    _vm.$app.resettingMaster = true;
                  }
                }
              },
              [_vm._v(" " + _vm._s(_vm.$t("reset")) + " ")]
            )
          ])
        ]
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  const __vue_inject_styles__$6 = undefined;
  /* scoped */
  const __vue_scope_id__$6 = undefined;
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var EnterMaster$1 = normalizeComponent_1(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    undefined,
    undefined
  );//
var script$7 = {
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
      this.value = zxcvbn(this.password).score;
    }
  }
};/* script */
const __vue_script__$7 = script$7;

/* template */
var __vue_render__$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
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
};
var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

  /* style */
  const __vue_inject_styles__$7 = undefined;
  /* scoped */
  const __vue_scope_id__$7 = undefined;
  /* module identifier */
  const __vue_module_identifier__$7 = undefined;
  /* functional template */
  const __vue_is_functional_template__$7 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var PasswordScore = normalizeComponent_1(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    undefined,
    undefined
  );//
var script$8 = {
  name: "ChangeMaster",
  localePath: "panel/pages/ChangeMaster",
  components: {
    "password-score": PasswordScore
  },
  data: function data() {
    return {
      newMaster: "",
      newMasterError: null,
      newMasterRepeat: "",
      newMasterRepeatError: null
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
          masterPassword.changePassword(_this.newMaster).then(function () {
            return passwords.getPasswords(_this.$app.origSite);
          }).then(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 3),
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
    validateMasterPasswordRepeat: function validateMasterPasswordRepeat(value, setError) {
      if (value != this.newMaster) setError(this.$t("passwords_differ"));
    }
  }
};/* script */
const __vue_script__$8 = script$8;

/* template */
var __vue_render__$8 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "validated-form",
    {
      staticClass: "page",
      on: { validated: _vm.submit },
      nativeOn: {
        reset: function($event) {
          $event.preventDefault();
          _vm.hasPassword && (_vm.$app.resettingMaster = false);
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
            [_vm._v(" " + _vm._s(_vm.$t(".learn_more")) + " ")]
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
        attrs: {
          id: "new-master",
          type: "password",
          error: _vm.newMasterError
        },
        on: {
          "update:error": function($event) {
            _vm.newMasterError = $event;
          },
          validate: _vm.validateMasterPassword
        },
        model: {
          value: _vm.newMaster,
          callback: function($$v) {
            _vm.newMaster = $$v;
          },
          expression: "newMaster"
        }
      }),
      _vm.newMasterError
        ? _c("div", { staticClass: "error" }, [
            _vm._v(" " + _vm._s(_vm.newMasterError) + " ")
          ])
        : _vm._e(),
      _c("password-score", {
        ref: "passwordScore",
        attrs: { password: _vm.newMaster }
      }),
      _c(
        "label",
        { staticClass: "block-start", attrs: { for: "new-master-repeat" } },
        [_vm._v(_vm._s(_vm.$t("new_master_repeat")))]
      ),
      _c("validated-input", {
        attrs: {
          id: "new-master-repeat",
          type: "password",
          error: _vm.newMasterRepeatError
        },
        on: {
          "update:error": function($event) {
            _vm.newMasterRepeatError = $event;
          },
          validate: _vm.validateMasterPasswordRepeat
        },
        model: {
          value: _vm.newMasterRepeat,
          callback: function($$v) {
            _vm.newMasterRepeat = $$v;
          },
          expression: "newMasterRepeat"
        }
      }),
      _vm.newMasterRepeatError
        ? _c("div", { staticClass: "error" }, [
            _vm._v(" " + _vm._s(_vm.newMasterRepeatError) + " ")
          ])
        : _vm._e(),
      _c("div", { staticClass: "button-container" }, [
        _c("button", { attrs: { type: "submit" } }, [
          _vm._v(_vm._s(_vm.$t("submit")))
        ]),
        _vm.hasPassword
          ? _c(
              "button",
              {
                directives: [{ name: "cancel", rawName: "v-cancel" }],
                attrs: { type: "reset" }
              },
              [_vm._v(_vm._s(_vm.$t("/cancel")))]
            )
          : _vm._e()
      ])
    ],
    1
  )
};
var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;

  /* style */
  const __vue_inject_styles__$8 = undefined;
  /* scoped */
  const __vue_scope_id__$8 = undefined;
  /* module identifier */
  const __vue_module_identifier__$8 = undefined;
  /* functional template */
  const __vue_is_functional_template__$8 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var ChangeMaster = normalizeComponent_1(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    undefined,
    undefined
  );//
var script$9 = {
  name: "Migration",
  localePath: "panel/pages/Migration",
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
        var _ref2 = _slicedToArray(_ref, 3),
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
};/* script */
const __vue_script__$9 = script$9;

/* template */
var __vue_render__$9 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "migration page" }, [
    _c("h1", [_vm._v(_vm._s(_vm.$t("title")))]),
    _vm.inProgress
      ? _c("div", { staticClass: "migration-in-progress" }, [
          _c("div", { staticClass: "migration-spinning-wheel" }),
          _c("div", [_vm._v(_vm._s(_vm.$t("in_progress")))])
        ])
      : _vm._e(),
    _c("p", [_vm._v(_vm._s(_vm.$t("intro")))]),
    _c("ul", [
      _c("li", [_vm._v(_vm._s(_vm.$t("change1")))]),
      _c("li", [_vm._v(_vm._s(_vm.$t("change2")))])
    ]),
    _c("p", [_vm._v(_vm._s(_vm.$t("conclusion")))]),
    _c(
      "p",
      [
        _c("external-link", { attrs: { type: "relnotes", param: "2.2.0" } }, [
          _vm._v(" " + _vm._s(_vm.$t(".learn_more")) + " ")
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
            [_vm._v(_vm._s(_vm.$t("continue")))]
          )
        ])
      : _vm._e()
  ])
};
var __vue_staticRenderFns__$9 = [];
__vue_render__$9._withStripped = true;

  /* style */
  const __vue_inject_styles__$9 = undefined;
  /* scoped */
  const __vue_scope_id__$9 = undefined;
  /* module identifier */
  const __vue_module_identifier__$9 = undefined;
  /* functional template */
  const __vue_is_functional_template__$9 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Migration = normalizeComponent_1(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    undefined,
    undefined
  );//

var messageHideDelay = 3000;
var script$a = {
  name: "PasswordMessage",
  localePath: "components/PasswordMessage",
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
};/* script */
const __vue_script__$a = script$a;

/* template */
var __vue_render__$a = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.messages.hasOwnProperty(_vm.message)
    ? _c("div", { class: _vm.success ? "success" : "warning" }, [
        _vm._v(_vm._s(_vm.$t(_vm.message)))
      ])
    : _vm._e()
};
var __vue_staticRenderFns__$a = [];
__vue_render__$a._withStripped = true;

  /* style */
  const __vue_inject_styles__$a = undefined;
  /* scoped */
  const __vue_scope_id__$a = undefined;
  /* module identifier */
  const __vue_module_identifier__$a = undefined;
  /* functional template */
  const __vue_is_functional_template__$a = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var PasswordMessage = normalizeComponent_1(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    undefined,
    undefined
  );//

var script$b = {
  name: "PasswordNameEntry",
  localePath: "panel/components/PasswordNameEntry",
  props: {
    value: {
      type: String,
      required: true
    },
    revision: {
      type: String,
      required: true
    },
    readonly: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      name: this.value,
      error: null,
      actualRevision: this.revision,
      revisionVisible: this.revision != "1"
    };
  },
  watch: {
    value: function value() {
      this.name = this.value;
    },
    name: function name() {
      this.$emit("input", this.name);
    },
    actualRevision: function actualRevision() {
      this.$emit("update:revision", this.actualRevision);
      if (this.error == this.$t("username_exists")) this.error = null;
    },
    revisionVisible: function revisionVisible() {
      var _this = this;

      if (this.revisionVisible) {
        this.$nextTick(function () {
          _this.$refs.revision.focus();
        });
      }
    }
  },
  methods: {
    validateName: function validateName(value, setError) {
      if (!value) setError(this.$t("username_required"));
    },
    nameConflict: function nameConflict() {
      this.error = this.$t("username_exists");
      this.revisionVisible = true;
    }
  }
};/* script */
const __vue_script__$b = script$b;

/* template */
var __vue_render__$b = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "password-name-entry" },
    [
      _c("label", { attrs: { for: "user-name" } }, [
        _vm._v(_vm._s(_vm.$t("username_label")))
      ]),
      _c(
        "validated-input",
        _vm._b(
          {
            directives: [{ name: "focus", rawName: "v-focus" }],
            attrs: { id: "user-name", error: _vm.error, type: "text" },
            on: {
              "update:error": function($event) {
                _vm.error = $event;
              },
              validate: _vm.validateName
            },
            model: {
              value: _vm.name,
              callback: function($$v) {
                _vm.name = $$v;
              },
              expression: "name"
            }
          },
          "validated-input",
          { readonly: _vm.readonly },
          false
        )
      ),
      _vm.error
        ? _c("div", { staticClass: "error" }, [
            _vm._v(" " + _vm._s(_vm.error) + " ")
          ])
        : _vm._e(),
      !_vm.revisionVisible && !_vm.readonly
        ? _c(
            "a",
            {
              staticClass: "change-password-revision",
              attrs: { href: "#" },
              on: {
                click: function($event) {
                  $event.preventDefault();
                  _vm.revisionVisible = true;
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
              [_vm._v(_vm._s(_vm.$t("revision_label")))]
            ),
            _c(
              "input",
              _vm._b(
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model.trim",
                      value: _vm.actualRevision,
                      expression: "actualRevision",
                      modifiers: { trim: true }
                    }
                  ],
                  ref: "revision",
                  attrs: { id: "password-revision", type: "text" },
                  domProps: { value: _vm.actualRevision },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.actualRevision = $event.target.value.trim();
                    },
                    blur: function($event) {
                      return _vm.$forceUpdate()
                    }
                  }
                },
                "input",
                { readonly: _vm.readonly },
                false
              )
            )
          ]
        : _vm._e()
    ],
    2
  )
};
var __vue_staticRenderFns__$b = [];
__vue_render__$b._withStripped = true;

  /* style */
  const __vue_inject_styles__$b = undefined;
  /* scoped */
  const __vue_scope_id__$b = undefined;
  /* module identifier */
  const __vue_module_identifier__$b = undefined;
  /* functional template */
  const __vue_is_functional_template__$b = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var PasswordNameEntry = normalizeComponent_1(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    undefined,
    undefined
  );//
var script$c = {
  name: "GeneratedPassword",
  localePath: "panel/components/GeneratedPassword",
  components: {
    "password-name-entry": PasswordNameEntry
  },
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
      name: name,
      revision: revision || "1",
      length: getProp("length", 16),
      lower: getProp("lower", true),
      upper: getProp("upper", true),
      number: getProp("number", true),
      symbol: getProp("symbol", true),
      charsets: "",
      charsetsError: null,
      keepNotes: !!this.password
    };
  },
  watch: {
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
    updateCharsets: function updateCharsets() {
      this.charsets = [this.lower, this.upper, this.number, this.symbol].join(" ");
    },
    validateCharsets: function validateCharsets(value, setError) {
      if (value.split(" ").every(function (c) {
        return c == "false";
      })) setError(this.$t("no_characters_selected"));
    },
    submit: function submit() {
      var _this2 = this;

      var revision = this.revision != "1" ? this.revision : "";
      passwords.addGenerated({
        site: this.$app.site,
        name: this.name,
        revision: revision,
        length: this.length,
        lower: this.lower,
        upper: this.upper,
        number: this.number,
        symbol: this.symbol,
        notes: this.keepNotes ? this.password.notes : null
      }, this.options.replacing).then(function (pwdList) {
        _this2.$app.pwdList = pwdList;

        _this2.$emit("cancel");
      })["catch"](function (error) {
        if (error == "alreadyExists") _this2.$refs["name-entry"].nameConflict();else _this2.$app.showUnknownError(error);
      });
    }
  }
};/* script */
const __vue_script__$c = script$c;

/* template */
var __vue_render__$c = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
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
                _vm._v(_vm._s(_vm.$t("replace_warning")))
              ])
            : _vm._e(),
          _c("password-name-entry", {
            ref: "name-entry",
            class: { "block-start": _vm.options.replacing },
            attrs: { revision: _vm.revision, readonly: _vm.options.replacing },
            on: {
              "update:revision": function($event) {
                _vm.revision = $event;
              }
            },
            model: {
              value: _vm.name,
              callback: function($$v) {
                _vm.name = $$v;
              },
              expression: "name"
            }
          }),
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
                        $$c = $$el.checked ? true : false;
                      if (Array.isArray($$a)) {
                        var $$v = null,
                          $$i = _vm._i($$a, $$v);
                        if ($$el.checked) {
                          $$i < 0 && (_vm.keepNotes = $$a.concat([$$v]));
                        } else {
                          $$i > -1 &&
                            (_vm.keepNotes = $$a
                              .slice(0, $$i)
                              .concat($$a.slice($$i + 1)));
                        }
                      } else {
                        _vm.keepNotes = $$c;
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
            [_vm._v(_vm._s(_vm.$t("length_label")))]
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
                  _vm.length = _vm._n($event.target.value);
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
            [_vm._v(_vm._s(_vm.$t("allowed_characters_label")))]
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
                      $$c = $$el.checked ? true : false;
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v);
                      if ($$el.checked) {
                        $$i < 0 && (_vm.lower = $$a.concat([$$v]));
                      } else {
                        $$i > -1 &&
                          (_vm.lower = $$a
                            .slice(0, $$i)
                            .concat($$a.slice($$i + 1)));
                      }
                    } else {
                      _vm.lower = $$c;
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
                      $$c = $$el.checked ? true : false;
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v);
                      if ($$el.checked) {
                        $$i < 0 && (_vm.upper = $$a.concat([$$v]));
                      } else {
                        $$i > -1 &&
                          (_vm.upper = $$a
                            .slice(0, $$i)
                            .concat($$a.slice($$i + 1)));
                      }
                    } else {
                      _vm.upper = $$c;
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
                      $$c = $$el.checked ? true : false;
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v);
                      if ($$el.checked) {
                        $$i < 0 && (_vm.number = $$a.concat([$$v]));
                      } else {
                        $$i > -1 &&
                          (_vm.number = $$a
                            .slice(0, $$i)
                            .concat($$a.slice($$i + 1)));
                      }
                    } else {
                      _vm.number = $$c;
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
                      $$c = $$el.checked ? true : false;
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v);
                      if ($$el.checked) {
                        $$i < 0 && (_vm.symbol = $$a.concat([$$v]));
                      } else {
                        $$i > -1 &&
                          (_vm.symbol = $$a
                            .slice(0, $$i)
                            .concat($$a.slice($$i + 1)));
                      }
                    } else {
                      _vm.symbol = $$c;
                    }
                  }
                }
              }),
              _vm._v("+^;")
            ])
          ]),
          _c("validated-input", {
            attrs: { error: _vm.charsetsError, visible: false },
            on: {
              "update:error": function($event) {
                _vm.charsetsError = $event;
              },
              validate: _vm.validateCharsets
            },
            model: {
              value: _vm.charsets,
              callback: function($$v) {
                _vm.charsets = $$v;
              },
              expression: "charsets"
            }
          }),
          _vm.charsetsError
            ? _c("div", { staticClass: "error" }, [
                _vm._v(_vm._s(_vm.charsetsError))
              ])
            : _vm._e(),
          _c("div", { staticClass: "button-container" }, [
            _c("button", { attrs: { type: "submit" } }, [
              _vm._v(_vm._s(_vm.$t("submit")))
            ]),
            _c("button", { attrs: { type: "reset" } }, [
              _vm._v(_vm._s(_vm.$t("/cancel")))
            ])
          ])
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$c = [];
__vue_render__$c._withStripped = true;

  /* style */
  const __vue_inject_styles__$c = undefined;
  /* scoped */
  const __vue_scope_id__$c = undefined;
  /* module identifier */
  const __vue_module_identifier__$c = undefined;
  /* functional template */
  const __vue_is_functional_template__$c = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var GeneratedPassword = normalizeComponent_1(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$c,
    __vue_script__$c,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    undefined,
    undefined
  );/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */

function set$1(data) {
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
}//
var script$d = {
  name: "NotesEditor",
  localePath: "panel/components/NotesEditor",
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
};/* script */
const __vue_script__$d = script$d;

/* template */
var __vue_render__$d = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
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
              $event.preventDefault();
              return _vm.saveNotes($event)
            },
            reset: function($event) {
              $event.preventDefault();
              return _vm.$emit("cancel")
            }
          }
        },
        [
          _c("div", [
            _vm._v(_vm._s(_vm.$t(".(PasswordNameEntry)username_label")))
          ]),
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
            [_vm._v(_vm._s(_vm.$t("notes_label")))]
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
                _vm.value = $event.target.value.trim();
              },
              blur: function($event) {
                return _vm.$forceUpdate()
              }
            }
          }),
          _vm._v(" "),
          _c("div", { staticClass: "button-container" }, [
            _c("button", { attrs: { type: "submit" } }, [
              _vm._v(_vm._s(_vm.$t("submit")))
            ]),
            _c("button", { attrs: { type: "reset" } }, [
              _vm._v(_vm._s(_vm.$t("/cancel")))
            ])
          ])
        ]
      )
    ]
  )
};
var __vue_staticRenderFns__$d = [];
__vue_render__$d._withStripped = true;

  /* style */
  const __vue_inject_styles__$d = undefined;
  /* scoped */
  const __vue_scope_id__$d = undefined;
  /* module identifier */
  const __vue_module_identifier__$d = undefined;
  /* functional template */
  const __vue_is_functional_template__$d = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var NotesEditor = normalizeComponent_1(
    { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
    __vue_inject_styles__$d,
    __vue_script__$d,
    __vue_scope_id__$d,
    __vue_is_functional_template__$d,
    __vue_module_identifier__$d,
    undefined,
    undefined
  );//
var script$e = {
  name: "QRCode",
  localePath: "panel/components/QRCode",
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
    var qr = new JSQR();
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
};/* script */
const __vue_script__$e = script$e;

/* template */
var __vue_render__$e = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
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
      _c("div", [_vm._v(_vm._s(_vm.$t(".(PasswordNameEntry)username_label")))]),
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
};
var __vue_staticRenderFns__$e = [];
__vue_render__$e._withStripped = true;

  /* style */
  const __vue_inject_styles__$e = undefined;
  /* scoped */
  const __vue_scope_id__$e = undefined;
  /* module identifier */
  const __vue_module_identifier__$e = undefined;
  /* functional template */
  const __vue_is_functional_template__$e = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var QRCode = normalizeComponent_1(
    { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
    __vue_inject_styles__$e,
    __vue_script__$e,
    __vue_scope_id__$e,
    __vue_is_functional_template__$e,
    __vue_module_identifier__$e,
    undefined,
    undefined
  );//

var script$f = {
  name: "PasswordMenu",
  localePath: "panel/components/PasswordMenu",
  props: {
    password: {
      type: Object,
      required: true
    }
  }
};/* script */
const __vue_script__$f = script$f;

/* template */
var __vue_render__$f = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
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
                  $event.preventDefault();
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
                $event.preventDefault();
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
                $event.preventDefault();
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
              $event.preventDefault();
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
              $event.preventDefault();
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
                  $event.preventDefault();
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
              $event.preventDefault();
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
              $event.preventDefault();
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
};
var __vue_staticRenderFns__$f = [];
__vue_render__$f._withStripped = true;

  /* style */
  const __vue_inject_styles__$f = undefined;
  /* scoped */
  const __vue_scope_id__$f = undefined;
  /* module identifier */
  const __vue_module_identifier__$f = undefined;
  /* functional template */
  const __vue_is_functional_template__$f = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var PasswordMenu = normalizeComponent_1(
    { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
    __vue_inject_styles__$f,
    __vue_script__$f,
    __vue_scope_id__$f,
    __vue_is_functional_template__$f,
    __vue_module_identifier__$f,
    undefined,
    undefined
  );//
var script$g = {
  name: "PasswordEntry",
  localePath: "panel/components/PasswordEntry",
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

      if (password.notes) tooltip += "\n" + this.$t("notes") + " " + password.notes;
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
        set$1(_this3.value);

        _this3.$parent.showPasswordMessage("password_copied");
      };

      if (this.value) doCopy();else {
        this.ensureValue().then(function () {
          if (!_this3.$isWebClient) doCopy();else {
            _this3.$parent.showPasswordMessage("password_ready");

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
      set$1(this.password.name);
      this.$parent.showPasswordMessage("username_copied");
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
      var message = this.$t("remove_confirmation", this.password.name, this.$app.siteDisplayName);
      if (this.password.notes) message += " " + this.$t("remove_confirmation_notes", this.password.notes);
      this.$app.confirm(message).then(function (response) {
        if (response) {
          passwords.removePassword(_this5.password).then(function (pwdList) {
            return _this5.$app.pwdList = pwdList;
          })["catch"](_this5.$parent.showPasswordMessage);
        }
      });
    }
  }
};/* script */
const __vue_script__$g = script$g;

/* template */
var __vue_render__$g = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _c(
        "div",
        { staticClass: "password-container" },
        [
          _c("iconic-link", {
            staticClass: "password-menu-link iconic-link",
            class: { menuactive: _vm.modal == "menu" },
            attrs: { title: _vm.$t("password_menu") },
            on: {
              click: function($event) {
                _vm.modal = "menu";
              }
            }
          }),
          !_vm.$isWebClient
            ? _c("iconic-link", {
                directives: [
                  {
                    name: "focus",
                    rawName: "v-focus",
                    value: _vm.focus,
                    expression: "focus"
                  }
                ],
                staticClass: "to-document-link iconic-link",
                attrs: { title: _vm.$t(".(PasswordMenu)to_document") },
                on: { click: _vm.fillIn }
              })
            : _vm._e(),
          _c("iconic-link", {
            directives: [
              {
                name: "focus",
                rawName: "v-focus",
                value: _vm.$isWebClient && _vm.focus,
                expression: "$isWebClient && focus"
              }
            ],
            staticClass: "to-clipboard-link iconic-link",
            attrs: { title: _vm.$t(".(PasswordMenu)to_clipboard") },
            on: { click: _vm.copy }
          }),
          _c(
            "span",
            {
              staticClass: "user-name-container",
              attrs: { title: _vm.tooltip }
            },
            [
              _c("span", [_vm._v(_vm._s(_vm.password.name))]),
              _vm.password.revision
                ? _c("span", { staticClass: "password-revision" }, [
                    _vm._v(_vm._s(_vm.password.revision))
                  ])
                : _vm._e()
            ]
          )
        ],
        1
      ),
      _vm.modal == "generated"
        ? _c("generated-password", {
            attrs: { password: _vm.password, options: _vm.passwordOptions },
            on: {
              cancel: function($event) {
                _vm.modal = null;
              }
            }
          })
        : _vm._e(),
      _vm.modal == "menu"
        ? _c("password-menu", {
            attrs: { password: _vm.password },
            on: {
              cancel: function($event) {
                _vm.modal = null;
              }
            }
          })
        : _vm._e(),
      _vm.modal == "qrcode"
        ? _c("qr-code", {
            attrs: { password: _vm.password, value: _vm.value },
            on: {
              cancel: function($event) {
                _vm.modal = null;
              }
            }
          })
        : _vm._e(),
      _vm.modal == "notes"
        ? _c("notes-editor", {
            attrs: { password: _vm.password },
            on: {
              cancel: function($event) {
                _vm.modal = null;
              }
            }
          })
        : _vm._e()
    ],
    1
  )
};
var __vue_staticRenderFns__$g = [];
__vue_render__$g._withStripped = true;

  /* style */
  const __vue_inject_styles__$g = undefined;
  /* scoped */
  const __vue_scope_id__$g = undefined;
  /* module identifier */
  const __vue_module_identifier__$g = undefined;
  /* functional template */
  const __vue_is_functional_template__$g = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var PasswordEntry = normalizeComponent_1(
    { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$g },
    __vue_inject_styles__$g,
    __vue_script__$g,
    __vue_scope_id__$g,
    __vue_is_functional_template__$g,
    __vue_module_identifier__$g,
    undefined,
    undefined
  );//
var script$h = {
  name: "SiteSelection",
  localePath: "panel/components/SiteSelection",
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
};/* script */
const __vue_script__$h = script$h;

/* template */
var __vue_render__$h = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "form",
    {
      staticClass: "modal-form",
      on: {
        submit: function($event) {
          $event.preventDefault();
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
              $event.preventDefault();
              _vm.activeIndex = Math.min(
                _vm.activeIndex + 1,
                _vm.sites.length - 1
              );
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
              $event.preventDefault();
              _vm.activeIndex = Math.max(_vm.activeIndex - 1, -1);
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
            _vm.value = $event.target.value.trim();
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
            ? _c("div", [_vm._v(" " + _vm._s(_vm.$t("no_sites")) + " ")])
            : _vm._e()
        ],
        2
      ),
      _c("div", { staticClass: "button-container" }, [
        _c("button", { attrs: { type: "submit" } }, [
          _vm._v(_vm._s(_vm.$t("submit")))
        ])
      ])
    ]
  )
};
var __vue_staticRenderFns__$h = [];
__vue_render__$h._withStripped = true;

  /* style */
  const __vue_inject_styles__$h = undefined;
  /* scoped */
  const __vue_scope_id__$h = undefined;
  /* module identifier */
  const __vue_module_identifier__$h = undefined;
  /* functional template */
  const __vue_is_functional_template__$h = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var SiteSelection = normalizeComponent_1(
    { render: __vue_render__$h, staticRenderFns: __vue_staticRenderFns__$h },
    __vue_inject_styles__$h,
    __vue_script__$h,
    __vue_scope_id__$h,
    __vue_is_functional_template__$h,
    __vue_module_identifier__$h,
    undefined,
    undefined
  );//
var script$i = {
  name: "RecoveryCode",
  localePath: "panel/components/RecoveryCode",
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
      var _ref2 = _slicedToArray(_ref, 2),
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
          _this$getValue2 = _slicedToArray(_this$getValue, 2),
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
              return recoveryCodes.decodeCode(code).then(function (password) {
                _this2.$emit("done", password);

                if (error) throw error;
              })["catch"](function (error) {
                if (error == "wrong_version") throw _this2.$t(error);

                _this2.$app.showUnknownError(error);
              });
            }

            return error ? Promise.reject(error) : Promise.resolve();
          } else {
            if (result == "checksum_mismatch") error = _this2.$t(result);else error = result;
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
};/* script */
const __vue_script__$i = script$i;

/* template */
var __vue_render__$i = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("form", { staticClass: "modal-form" }, [
    _c(
      "label",
      { staticClass: "block-start", attrs: { for: "recoveryInput" } },
      [_vm._v(_vm._s(_vm.$t("label")))]
    ),
    _c(
      "div",
      { staticClass: "recovery-code-accepted" },
      _vm._l(_vm.accepted, function(line, index) {
        return _c(
          "div",
          { key: line },
          [
            _vm._v(" " + _vm._s(line) + " "),
            index == _vm.accepted.length - 1
              ? _c("iconic-link", {
                  staticClass: "recovery-code-strip cancel",
                  attrs: { title: _vm.$t("remove_line") },
                  on: {
                    click: function($event) {
                      return _vm.accepted.pop()
                    }
                  }
                })
              : _vm._e()
          ],
          1
        )
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
};
var __vue_staticRenderFns__$i = [];
__vue_render__$i._withStripped = true;

  /* style */
  const __vue_inject_styles__$i = undefined;
  /* scoped */
  const __vue_scope_id__$i = undefined;
  /* module identifier */
  const __vue_module_identifier__$i = undefined;
  /* functional template */
  const __vue_is_functional_template__$i = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var RecoveryCode = normalizeComponent_1(
    { render: __vue_render__$i, staticRenderFns: __vue_staticRenderFns__$i },
    __vue_inject_styles__$i,
    __vue_script__$i,
    __vue_scope_id__$i,
    __vue_is_functional_template__$i,
    __vue_module_identifier__$i,
    undefined,
    undefined
  );//
var script$j = {
  name: "StoredPassword",
  localePath: "panel/components/StoredPassword",
  components: {
    "password-name-entry": PasswordNameEntry,
    "recovery-code": RecoveryCode
  },
  data: function data() {
    return {
      name: "",
      revision: "1",
      password: "",
      passwordError: null,
      recoveryActive: false
    };
  },
  watch: {
    recoveryActive: function recoveryActive() {
      var _this = this;

      if (!this.recoveryActive) this.$nextTick(function () {
        return _this.$refs.password.$el.focus();
      });
    }
  },
  methods: {
    validatePassword: function validatePassword(value, setError) {
      if (!value) setError(this.$t("password_value_required"));
    },
    setPassword: function setPassword(password) {
      this.recoveryActive = false;
      this.password = password;
    },
    submit: function submit() {
      var _this2 = this;

      var revision = this.revision != "1" ? this.revision : "";
      passwords.addStored({
        site: this.$app.site,
        name: this.name,
        revision: revision,
        password: this.password
      }).then(function (pwdList) {
        _this2.$app.pwdList = pwdList;

        _this2.$emit("cancel");
      })["catch"](function (error) {
        if (error == "alreadyExists") _this2.$refs["name-entry"].nameConflict();else _this2.$app.showUnknownError(error);
      });
    }
  }
};/* script */
const __vue_script__$j = script$j;

/* template */
var __vue_render__$j = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
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
            _vm._v(_vm._s(_vm.$t("warning")))
          ]),
          _c("password-name-entry", {
            ref: "name-entry",
            staticClass: "block-start",
            attrs: { revision: _vm.revision },
            on: {
              "update:revision": function($event) {
                _vm.revision = $event;
              }
            },
            model: {
              value: _vm.name,
              callback: function($$v) {
                _vm.name = $$v;
              },
              expression: "name"
            }
          }),
          !_vm.recoveryActive
            ? [
                _c(
                  "label",
                  {
                    staticClass: "block-start",
                    attrs: { for: "password-value" }
                  },
                  [_vm._v(_vm._s(_vm.$t("password_label")))]
                ),
                _c("validated-input", {
                  ref: "password",
                  attrs: {
                    id: "password-value",
                    error: _vm.passwordError,
                    type: "password"
                  },
                  on: {
                    "update:error": function($event) {
                      _vm.passwordError = $event;
                    },
                    validate: _vm.validatePassword
                  },
                  model: {
                    value: _vm.password,
                    callback: function($$v) {
                      _vm.password = $$v;
                    },
                    expression: "password"
                  }
                }),
                _vm.passwordError
                  ? _c("div", { staticClass: "error" }, [
                      _vm._v(" " + _vm._s(_vm.passwordError) + " ")
                    ])
                  : _vm._e(),
                _c(
                  "a",
                  {
                    staticClass: "use-recovery",
                    attrs: { href: "#" },
                    on: {
                      click: function($event) {
                        $event.preventDefault();
                        _vm.recoveryActive = true;
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
                        $event.preventDefault();
                        _vm.recoveryActive = false;
                      }
                    }
                  },
                  [_vm._v(_vm._s(_vm.$t("cancel_recovery")))]
                )
              ],
          _c("div", { staticClass: "button-container" }, [
            _c("button", { attrs: { type: "submit" } }, [
              _vm._v(_vm._s(_vm.$t("submit")))
            ]),
            _c("button", { attrs: { type: "reset" } }, [
              _vm._v(_vm._s(_vm.$t("/cancel")))
            ])
          ])
        ],
        2
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$j = [];
__vue_render__$j._withStripped = true;

  /* style */
  const __vue_inject_styles__$j = undefined;
  /* scoped */
  const __vue_scope_id__$j = undefined;
  /* module identifier */
  const __vue_module_identifier__$j = undefined;
  /* functional template */
  const __vue_is_functional_template__$j = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var StoredPassword = normalizeComponent_1(
    { render: __vue_render__$j, staticRenderFns: __vue_staticRenderFns__$j },
    __vue_inject_styles__$j,
    __vue_script__$j,
    __vue_scope_id__$j,
    __vue_is_functional_template__$j,
    __vue_module_identifier__$j,
    undefined,
    undefined
  );//
var script$k = {
  name: "PasswordList",
  localePath: "panel/pages/PasswordList",
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
          var _ref2 = _slicedToArray(_ref, 3),
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
            var _ref4 = _slicedToArray(_ref3, 3),
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
};/* script */
const __vue_script__$k = script$k;

/* template */
var __vue_render__$k = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "page" },
    [
      _vm.$app.site == _vm.$app.siteDisplayName
        ? [
            _c("label", { attrs: { for: "site" } }, [
              _vm._v(_vm._s(_vm.$t("site")))
            ]),
            _c(
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
                  param: "https://" + _vm.$app.site,
                  "data-noaccesskey": ""
                }
              },
              [_vm._v(" " + _vm._s(_vm.$app.siteDisplayName) + " ")]
            )
          ]
        : [
            _c("div", [_vm._v(_vm._s(_vm.$t("site")))]),
            _c(
              "div",
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
            )
          ],
      _vm.$app.origSite != _vm.$app.site
        ? _c("div", { staticClass: "alias-container" }, [
            _vm._v(
              " " + _vm._s(_vm.$t("alias_description", _vm.$app.origSite)) + " "
            ),
            _c(
              "a",
              {
                attrs: { href: "#" },
                on: {
                  click: function($event) {
                    $event.preventDefault();
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
                  $event.preventDefault();
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
                  _vm.modal = null;
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
            password_ready: false,
            password_copied: true,
            username_copied: true,
            no_such_password: false,
            unknown_generation_method: false,
            wrong_site: false,
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
              attrs: { role: "list" },
              on: { keydown: _vm.keyboardNavigation }
            },
            _vm._l(_vm.$app.pwdList, function(password, index) {
              return _c("password-entry", {
                key: password.name + "\0" + password.revision,
                attrs: {
                  role: "listitem",
                  password: password,
                  focus: index == 0
                }
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
                  $event.preventDefault();
                  _vm.modal = "generated";
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
                _vm.modal = null;
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
                  $event.preventDefault();
                  _vm.modal = "stored";
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
                _vm.modal = null;
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
                $event.preventDefault();
                return _vm.showAll($event)
              }
            }
          },
          [_vm._v(" " + _vm._s(_vm.$t("show_all_passwords")) + " ")]
        )
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__$k = [];
__vue_render__$k._withStripped = true;

  /* style */
  const __vue_inject_styles__$k = undefined;
  /* scoped */
  const __vue_scope_id__$k = undefined;
  /* module identifier */
  const __vue_module_identifier__$k = undefined;
  /* functional template */
  const __vue_is_functional_template__$k = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var PasswordList = normalizeComponent_1(
    { render: __vue_render__$k, staticRenderFns: __vue_staticRenderFns__$k },
    __vue_inject_styles__$k,
    __vue_script__$k,
    __vue_scope_id__$k,
    __vue_is_functional_template__$k,
    __vue_module_identifier__$k,
    undefined,
    undefined
  );//
var script$l = {
  name: "SelectSite",
  localePath: "panel/pages/SelectSite",
  components: {
    "site-selection": SiteSelection
  },
  methods: {
    selected: function selected(site) {
      var _this = this;

      passwords.getPasswords(site).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 3),
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
};/* script */
const __vue_script__$l = script$l;

/* template */
var __vue_render__$l = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "page" },
    [
      _c("site-selection", {
        attrs: { message: _vm.$t("label"), callback: _vm.selected }
      })
    ],
    1
  )
};
var __vue_staticRenderFns__$l = [];
__vue_render__$l._withStripped = true;

  /* style */
  const __vue_inject_styles__$l = undefined;
  /* scoped */
  const __vue_scope_id__$l = undefined;
  /* module identifier */
  const __vue_module_identifier__$l = undefined;
  /* functional template */
  const __vue_is_functional_template__$l = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var SelectSite = normalizeComponent_1(
    { render: __vue_render__$l, staticRenderFns: __vue_staticRenderFns__$l },
    __vue_inject_styles__$l,
    __vue_script__$l,
    __vue_scope_id__$l,
    __vue_is_functional_template__$l,
    __vue_module_identifier__$l,
    undefined,
    undefined
  );//
var script$m = {
  name: "Setting",
  localePath: "components/Setting",
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
      prefs.setPref(this.name, this.value);
    }
  },
  created: function created() {
    var _this = this;

    prefs.getPref(this.name, this.defValue).then(function (value) {
      return _this.value = value;
    });
  }
};/* script */
const __vue_script__$m = script$m;

/* template */
var __vue_render__$m = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
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
                $$c = $$el.checked ? true : false;
              if (Array.isArray($$a)) {
                var $$v = null,
                  $$i = _vm._i($$a, $$v);
                if ($$el.checked) {
                  $$i < 0 && (_vm.value = $$a.concat([$$v]));
                } else {
                  $$i > -1 &&
                    (_vm.value = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
                }
              } else {
                _vm.value = $$c;
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
              _vm.value = $event.target.value;
            }
          }
        })
      : _vm._e()
  ])
};
var __vue_staticRenderFns__$m = [];
__vue_render__$m._withStripped = true;

  /* style */
  const __vue_inject_styles__$m = undefined;
  /* scoped */
  const __vue_scope_id__$m = undefined;
  /* module identifier */
  const __vue_module_identifier__$m = undefined;
  /* functional template */
  const __vue_is_functional_template__$m = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Setting = normalizeComponent_1(
    { render: __vue_render__$m, staticRenderFns: __vue_staticRenderFns__$m },
    __vue_inject_styles__$m,
    __vue_script__$m,
    __vue_scope_id__$m,
    __vue_is_functional_template__$m,
    __vue_module_identifier__$m,
    undefined,
    undefined
  );//
var script$n = {
  name: "Settings",
  components: {
    setting: Setting
  }
};/* script */
const __vue_script__$n = script$n;

/* template */
var __vue_render__$n = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
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
};
var __vue_staticRenderFns__$n = [];
__vue_render__$n._withStripped = true;

  /* style */
  const __vue_inject_styles__$n = undefined;
  /* scoped */
  const __vue_scope_id__$n = undefined;
  /* module identifier */
  const __vue_module_identifier__$n = undefined;
  /* functional template */
  const __vue_is_functional_template__$n = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Settings = normalizeComponent_1(
    { render: __vue_render__$n, staticRenderFns: __vue_staticRenderFns__$n },
    __vue_inject_styles__$n,
    __vue_script__$n,
    __vue_scope_id__$n,
    __vue_is_functional_template__$n,
    __vue_module_identifier__$n,
    undefined,
    undefined
  );//

var script$o = {
  name: "ManualAuth",
  localePath: "panel/components/ManualAuth",
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
};/* script */
const __vue_script__$o = script$o;

/* template */
var __vue_render__$o = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
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
              $event.preventDefault();
              return _vm.done($event)
            }
          }
        },
        [
          _c("label", { attrs: { for: "sync-token" } }, [
            _vm._v(_vm._s(_vm.$t("token_label")))
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
                _vm.token = $event.target.value.trim();
              },
              blur: function($event) {
                return _vm.$forceUpdate()
              }
            }
          }),
          _c("div", { staticClass: "button-container" }, [
            _c("button", { attrs: { type: "submit" } }, [
              _vm._v(_vm._s(_vm.$t("/ok")))
            ])
          ])
        ]
      )
    ]
  )
};
var __vue_staticRenderFns__$o = [];
__vue_render__$o._withStripped = true;

  /* style */
  const __vue_inject_styles__$o = undefined;
  /* scoped */
  const __vue_scope_id__$o = undefined;
  /* module identifier */
  const __vue_module_identifier__$o = undefined;
  /* functional template */
  const __vue_is_functional_template__$o = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var ManualAuth = normalizeComponent_1(
    { render: __vue_render__$o, staticRenderFns: __vue_staticRenderFns__$o },
    __vue_inject_styles__$o,
    __vue_script__$o,
    __vue_scope_id__$o,
    __vue_is_functional_template__$o,
    __vue_module_identifier__$o,
    undefined,
    undefined
  );//

var script$p = {
  name: "RemoteStorageUsernameInput",
  localePath: "panel/components/RemoteStorageUsernameInput",
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
      username: "",
      usernameError: null
    };
  },
  methods: {
    done: function done() {
      this.$emit("cancel");
      if (this.callback && this.username) this.callback(this.username);
    },
    validateUsername: function validateUsername(value, setError) {
      var index = value.indexOf("@");
      if (index <= 0 || /\s/.test(value)) setError(this.$t("invalid_username"));else {
        var host = value.substr(index + 1).toLowerCase(); // URL object will always encode non-ASCII characters, yet all of them
        // are valid. Replace by ASCII letters for validation.

        host = host.replace(/[\u0080-\uFFFF]/g, "a");

        try {
          if (new URL("https://" + host + "/").hostname != host) throw "invalid";
        } catch (e) {
          setError(this.$t("invalid_username"));
        }
      }
    }
  }
};/* script */
const __vue_script__$p = script$p;

/* template */
var __vue_render__$p = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
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
            _vm._v(_vm._s(_vm.$t("username_label")))
          ]),
          _c("validated-input", {
            directives: [{ name: "focus", rawName: "v-focus" }],
            attrs: {
              id: "username",
              error: _vm.usernameError,
              placeholder: "me@example.com"
            },
            on: {
              "update:error": function($event) {
                _vm.usernameError = $event;
              },
              validate: _vm.validateUsername
            },
            model: {
              value: _vm.username,
              callback: function($$v) {
                _vm.username = $$v;
              },
              expression: "username"
            }
          }),
          _vm.usernameError
            ? _c("div", { staticClass: "error" }, [
                _vm._v(" " + _vm._s(_vm.usernameError) + " ")
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
                [_vm._v(" " + _vm._s(_vm.$t("get_account")) + " ")]
              )
            ],
            1
          ),
          _c("div", { staticClass: "button-container" }, [
            _c("button", { attrs: { type: "submit" } }, [
              _vm._v(_vm._s(_vm.$t("/ok")))
            ])
          ])
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$p = [];
__vue_render__$p._withStripped = true;

  /* style */
  const __vue_inject_styles__$p = undefined;
  /* scoped */
  const __vue_scope_id__$p = undefined;
  /* module identifier */
  const __vue_module_identifier__$p = undefined;
  /* functional template */
  const __vue_is_functional_template__$p = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var RemoteStorageUsernameInput = normalizeComponent_1(
    { render: __vue_render__$p, staticRenderFns: __vue_staticRenderFns__$p },
    __vue_inject_styles__$p,
    __vue_script__$p,
    __vue_scope_id__$p,
    __vue_is_functional_template__$p,
    __vue_module_identifier__$p,
    undefined,
    undefined
  );//
var script$q = {
  name: "Sync",
  localePath: "panel/pages/Sync",
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
      sync$1.sync();
    },
    disableSync: function disableSync() {
      var _this = this;

      this.$app.confirm(this.$t("disable_confirmation")).then(function (disable) {
        if (disable) {
          sync$1.disableSync().then(function () {
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
          return sync$1.manualAuthorization(provider, username, code)["catch"](_this2.$app.showUnknownError);
        };

        sync$1.getManualAuthURL(provider, username).then(function (url) {
          wnd.location.href = url;
        })["catch"](function (error) {
          _this2.manualAuthCallback = null;
          wnd.close();

          _this2.$app.showUnknownError(error);
        });
      } else {
        sync$1.authorize(provider, username);
        window.close();
      }
    }
  }
};/* script */
const __vue_script__$q = script$q;

/* template */
var __vue_render__$q = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "page" },
    [
      _vm.$app.sync.provider
        ? [
            _c("div", [_vm._v(_vm._s(_vm.$t("provider_label")))]),
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
              _vm._v(_vm._s(_vm.$t("lastTime_label")))
            ]),
            _c(
              "div",
              [
                _vm.$app.sync.isSyncing
                  ? [_vm._v(_vm._s(_vm.$t("lastTime_now")))]
                  : _vm.$app.sync.lastSync
                  ? [
                      _vm._v(
                        _vm._s(
                          new Date(_vm.$app.sync.lastSync).toLocaleString()
                        )
                      )
                    ]
                  : [_vm._v(_vm._s(_vm.$t("lastTime_never")))],
                _vm.$app.sync.lastSync && !_vm.$app.sync.isSyncing
                  ? [
                      _vm.$app.sync.error
                        ? _c("span", { staticClass: "sync-failed" }, [
                            _vm._v(_vm._s(" " + _vm.$t("failed")))
                          ])
                        : [_vm._v(_vm._s(" " + _vm.$t("succeeded")))]
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
                              $event.preventDefault();
                              return _vm.authorize(_vm.$app.sync.provider)
                            }
                          }
                        },
                        [_vm._v(" " + _vm._s(_vm.$t("reauthorize")) + " ")]
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
                _vm._v(_vm._s(_vm.$t("disable")))
              ])
            ])
          ]
        : [
            _c("div", { staticClass: "sync-section" }, [
              _vm._v(_vm._s(_vm.$t("selection_label")))
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
                        $event.preventDefault();
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
              _vm._v(_vm._s(_vm.$t("how_heading")))
            ]),
            _c(
              "div",
              { staticClass: "sync-explanation" },
              [
                _vm._v(" " + _vm._s(_vm.$t("how_text")) + " "),
                _c(
                  "external-link",
                  { attrs: { type: "documentation", param: "sync" } },
                  [_vm._v(" " + _vm._s(_vm.$t(".learn_more")) + " ")]
                )
              ],
              1
            ),
            _c("div", { staticClass: "block-start sync-section" }, [
              _vm._v(_vm._s(_vm.$t("security_heading")))
            ]),
            _c("div", { staticClass: "sync-explanation" }, [
              _vm._v(_vm._s(_vm.$t("security_text")))
            ]),
            _c("div", { staticClass: "block-start sync-section" }, [
              _vm._v(_vm._s(_vm.$t("no_account_heading")))
            ]),
            _c("div", { staticClass: "sync-explanation" }, [
              _vm._v(_vm._s(_vm.$t("no_account_text")))
            ])
          ],
      _vm.manualAuthCallback
        ? _c("manual-auth", {
            attrs: { callback: _vm.manualAuthCallback },
            on: {
              cancel: function($event) {
                _vm.manualAuthCallback = null;
              }
            }
          })
        : _vm._e(),
      _vm.remoteStorageUsernameCallback
        ? _c("remoteStorage-username-input", {
            attrs: { callback: _vm.remoteStorageUsernameCallback },
            on: {
              cancel: function($event) {
                _vm.remoteStorageUsernameCallback = null;
              }
            }
          })
        : _vm._e()
    ],
    2
  )
};
var __vue_staticRenderFns__$q = [];
__vue_render__$q._withStripped = true;

  /* style */
  const __vue_inject_styles__$q = undefined;
  /* scoped */
  const __vue_scope_id__$q = undefined;
  /* module identifier */
  const __vue_module_identifier__$q = undefined;
  /* functional template */
  const __vue_is_functional_template__$q = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Sync = normalizeComponent_1(
    { render: __vue_render__$q, staticRenderFns: __vue_staticRenderFns__$q },
    __vue_inject_styles__$q,
    __vue_script__$q,
    __vue_scope_id__$q,
    __vue_is_functional_template__$q,
    __vue_module_identifier__$q,
    undefined,
    undefined
  );//

var script$r = {
  name: "Confirm",
  localePath: "components/Confirm",
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
};/* script */
const __vue_script__$r = script$r;

/* template */
var __vue_render__$r = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
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
};
var __vue_staticRenderFns__$r = [];
__vue_render__$r._withStripped = true;

  /* style */
  const __vue_inject_styles__$r = undefined;
  /* scoped */
  const __vue_scope_id__$r = undefined;
  /* module identifier */
  const __vue_module_identifier__$r = undefined;
  /* functional template */
  const __vue_is_functional_template__$r = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Confirm = normalizeComponent_1(
    { render: __vue_render__$r, staticRenderFns: __vue_staticRenderFns__$r },
    __vue_inject_styles__$r,
    __vue_script__$r,
    __vue_scope_id__$r,
    __vue_is_functional_template__$r,
    __vue_module_identifier__$r,
    undefined,
    undefined
  );//

var script$s = {
  name: "UnknownError",
  localePath: "components/UnknownError",
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
};/* script */
const __vue_script__$s = script$s;

/* template */
var __vue_render__$s = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "unknown-error warning" },
    [
      _c("iconic-link", {
        staticClass: "unknown-error-cancel cancel",
        attrs: { title: _vm.$t("close") },
        on: {
          click: function($event) {
            return _vm.$emit("close")
          }
        }
      }),
      _c("span", [_vm._v(_vm._s(_vm.$t("description") + " "))]),
      !_vm.showDetails
        ? _c(
            "a",
            {
              attrs: { href: "#" },
              on: {
                click: function($event) {
                  $event.preventDefault();
                  _vm.showDetails = true;
                }
              }
            },
            [_vm._v(_vm._s(_vm.$t("more")))]
          )
        : _c("div", { staticClass: "unknown-error-details" }, [
            _vm._v(_vm._s(_vm.stringify(_vm.error)))
          ])
    ],
    1
  )
};
var __vue_staticRenderFns__$s = [];
__vue_render__$s._withStripped = true;

  /* style */
  const __vue_inject_styles__$s = undefined;
  /* scoped */
  const __vue_scope_id__$s = undefined;
  /* module identifier */
  const __vue_module_identifier__$s = undefined;
  /* functional template */
  const __vue_is_functional_template__$s = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var UnknownError = normalizeComponent_1(
    { render: __vue_render__$s, staticRenderFns: __vue_staticRenderFns__$s },
    __vue_inject_styles__$s,
    __vue_script__$s,
    __vue_scope_id__$s,
    __vue_is_functional_template__$s,
    __vue_module_identifier__$s,
    undefined,
    undefined
  );//
var pages = ["select-site", "password-list", "sync", "settings"];
var initialData = {
  site: null,
  origSite: null,
  pwdList: null,
  masterPasswordState: null,
  sync: null
};
var app = null;
port$3.on("init", function (state) {
  var target = app || initialData;

  for (var _i = 0, _Object$keys = Object.keys(initialData); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    if (key in state) target[key] = state[key];
  }
});
var script$t = {
  name: "App",
  localePath: "panel/App",
  components: {
    "change-master": ChangeMaster,
    "enter-master": EnterMaster$1,
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
};/* script */
const __vue_script__$t = script$t;

/* template */
var __vue_render__$t = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
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
            $event.preventDefault();
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
                _vm.unknownError = null;
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
                "nav",
                {
                  directives: [
                    {
                      name: "keyboard-navigation",
                      rawName: "v-keyboard-navigation",
                      value: _vm.tab,
                      expression: "tab"
                    }
                  ],
                  staticClass: "tablist",
                  attrs: { role: "list" }
                },
                [
                  _c("div"),
                  _c("iconic-link", {
                    staticClass: "tab select-site",
                    class: { active: _vm.currentPage == "select-site" },
                    attrs: { role: "listitem", title: _vm.$t("select_site") },
                    on: {
                      click: function($event) {
                        _vm.currentPage = "select-site";
                      }
                    }
                  }),
                  _c("iconic-link", {
                    staticClass: "tab password-list",
                    class: { active: _vm.currentPage == "password-list" },
                    attrs: { role: "listitem", title: _vm.$t("password_list") },
                    on: {
                      click: function($event) {
                        _vm.currentPage = "password-list";
                      }
                    }
                  }),
                  _c("iconic-link", {
                    staticClass: "tab sync",
                    class: {
                      active: _vm.currentPage == "sync",
                      failed:
                        _vm.$app.sync.error &&
                        _vm.$app.sync.error != "sync_connection_error"
                    },
                    attrs: { role: "listitem", title: _vm.$t("sync") },
                    on: {
                      click: function($event) {
                        _vm.currentPage = "sync";
                      }
                    }
                  }),
                  _c("iconic-link", {
                    staticClass: "tab settings",
                    class: { active: _vm.currentPage == "settings" },
                    attrs: { role: "listitem", title: _vm.$t("settings") },
                    on: {
                      click: function($event) {
                        _vm.currentPage = "settings";
                      }
                    }
                  }),
                  _c("div", { staticClass: "spacer" }),
                  _c("iconic-link", {
                    staticClass: "tab lock",
                    attrs: {
                      role: "listitem",
                      title: _vm.$t("lock_passwords")
                    },
                    on: { click: _vm.lockPasswords }
                  })
                ],
                1
              ),
              _vm.currentPage == "select-site"
                ? _c("select-site", {
                    on: {
                      selected: function($event) {
                        _vm.currentPage = "password-list";
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
};
var __vue_staticRenderFns__$t = [];
__vue_render__$t._withStripped = true;

  /* style */
  const __vue_inject_styles__$t = undefined;
  /* scoped */
  const __vue_scope_id__$t = undefined;
  /* module identifier */
  const __vue_module_identifier__$t = undefined;
  /* functional template */
  const __vue_is_functional_template__$t = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var PanelApp = normalizeComponent_1(
    { render: __vue_render__$t, staticRenderFns: __vue_staticRenderFns__$t },
    __vue_inject_styles__$t,
    __vue_script__$t,
    __vue_scope_id__$t,
    __vue_is_functional_template__$t,
    __vue_module_identifier__$t,
    undefined,
    undefined
  );//
var script$u = {
  name: "EnterMaster",
  components: {
    "enter-master": EnterMaster
  },
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
  methods: {
    done: function done(success) {
      this.$emit("done", success);
    }
  }
};/* script */
const __vue_script__$u = script$u;

/* template */
var __vue_render__$u = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "modal-overlay",
    {
      on: {
        cancel: function($event) {
          return _vm.done(false)
        }
      }
    },
    [
      _c("enter-master", {
        staticClass: "modal-form",
        attrs: { warning: _vm.warning, callback: _vm.callback },
        on: { done: _vm.done }
      })
    ],
    1
  )
};
var __vue_staticRenderFns__$u = [];
__vue_render__$u._withStripped = true;

  /* style */
  const __vue_inject_styles__$u = undefined;
  /* scoped */
  const __vue_scope_id__$u = undefined;
  /* module identifier */
  const __vue_module_identifier__$u = undefined;
  /* functional template */
  const __vue_is_functional_template__$u = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var EnterMaster$2 = normalizeComponent_1(
    { render: __vue_render__$u, staticRenderFns: __vue_staticRenderFns__$u },
    __vue_inject_styles__$u,
    __vue_script__$u,
    __vue_scope_id__$u,
    __vue_is_functional_template__$u,
    __vue_module_identifier__$u,
    undefined,
    undefined
  );//
var script$v = {
  name: "GlobalActions",
  localePath: "allpasswords/components/GlobalActions",
  components: {
    "enter-master": EnterMaster$2
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
      })["catch"](this.$app.showGlobalMessage);
    },
    selectImportFile: function selectImportFile() {
      this.$refs.importFile.click();
    },
    importFileSelected: function importFileSelected(event) {
      var _this2 = this;

      var reader = new FileReader();

      reader.onload = function () {
        _this2.$app.confirm(_this2.$t("import_confirm")).then(function (accepted) {
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

        _this3.$app.showGlobalMessage("import_success");

        _this3.$app.updateData();
      })["catch"](function (error) {
        _this3.$app.inProgress = false;
        if (error == "wrong_master_password") _this3.enterMasterCallback = function (newMaster) {
          return _this3.doImport(data, newMaster);
        };else _this3.$app.showGlobalMessage(error);
      });
    },
    printPage: function printPage() {
      window.print();
    }
  }
};/* script */
const __vue_script__$v = script$v;

/* template */
var __vue_render__$v = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "global-actions" },
    [
      _c("iconic-link", {
        staticClass: "export",
        attrs: { title: _vm.$t("export") },
        on: { click: _vm.exportData }
      }),
      _c("iconic-link", {
        staticClass: "import",
        attrs: { title: _vm.$t("import") },
        on: { click: _vm.selectImportFile }
      }),
      _c("iconic-link", {
        staticClass: "print",
        attrs: { title: _vm.$t("print") },
        on: { click: _vm.printPage }
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
            staticClass: "modal-form",
            attrs: {
              warning: _vm.$t("import_with_master"),
              callback: _vm.enterMasterCallback
            },
            on: {
              done: function($event) {
                _vm.enterMasterCallback = null;
              }
            }
          })
        : _vm._e()
    ],
    1
  )
};
var __vue_staticRenderFns__$v = [];
__vue_render__$v._withStripped = true;

  /* style */
  const __vue_inject_styles__$v = undefined;
  /* scoped */
  const __vue_scope_id__$v = undefined;
  /* module identifier */
  const __vue_module_identifier__$v = undefined;
  /* functional template */
  const __vue_is_functional_template__$v = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var GlobalActions = normalizeComponent_1(
    { render: __vue_render__$v, staticRenderFns: __vue_staticRenderFns__$v },
    __vue_inject_styles__$v,
    __vue_script__$v,
    __vue_scope_id__$v,
    __vue_is_functional_template__$v,
    __vue_module_identifier__$v,
    undefined,
    undefined
  );//

var script$w = {
  name: "Shortcuts",
  props: {
    letters: {
      type: Array,
      required: true
    }
  }
};/* script */
const __vue_script__$w = script$w;

/* template */
var __vue_render__$w = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
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
              $event.preventDefault();
              return _vm.$emit("clicked", letter.param)
            }
          }
        },
        [_vm._v(_vm._s(letter.letter))]
      )
    }),
    0
  )
};
var __vue_staticRenderFns__$w = [];
__vue_render__$w._withStripped = true;

  /* style */
  const __vue_inject_styles__$w = undefined;
  /* scoped */
  const __vue_scope_id__$w = undefined;
  /* module identifier */
  const __vue_module_identifier__$w = undefined;
  /* functional template */
  const __vue_is_functional_template__$w = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Shortcuts = normalizeComponent_1(
    { render: __vue_render__$w, staticRenderFns: __vue_staticRenderFns__$w },
    __vue_inject_styles__$w,
    __vue_script__$w,
    __vue_scope_id__$w,
    __vue_is_functional_template__$w,
    __vue_module_identifier__$w,
    undefined,
    undefined
  );//
var script$x = {
  name: "PasswordInfo",
  localePath: "allpasswords/components/PasswordInfo",
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
        set$1(_this3.value);

        _this3.showPasswordMessage("password_copied");
      };

      if (this.value) doCopy();else {
        this.ensureValue().then(function () {
          if (!_this3.$isWebClient) doCopy();else {
            _this3.showPasswordMessage("password_ready");

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

      var message = this.$t("/(panel)(components)(PasswordEntry)remove_confirmation", this.password.name, this.siteDisplayName);
      if (this.password.notes) message += " " + this.$t("/(panel)(components)(PasswordEntry)remove_confirmation_notes", this.password.notes);
      this.$app.confirm(message).then(function (accepted) {
        if (!accepted) return;
        passwords.removePassword(_this4.password).then(function () {
          _this4.$emit("removed");
        })["catch"](_this4.showPasswordMessage);
      });
    },
    activate: function activate() {
      this.$refs["to-clipboard"].$el.focus();
    }
  }
};/* script */
const __vue_script__$x = script$x;

/* template */
var __vue_render__$x = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "password-info-container" },
    [
      _c("password-message", {
        ref: "password-message",
        attrs: {
          messages: {
            password_ready: false,
            password_copied: true,
            no_such_password: false,
            unknown_generation_method: false
          }
        }
      }),
      _c(
        "div",
        { staticClass: "password-container" },
        [
          _c("iconic-link", {
            ref: "to-clipboard",
            staticClass: "to-clipboard-link",
            attrs: {
              title: _vm.$t("/(panel)(components)(PasswordMenu)to_clipboard")
            },
            on: { click: _vm.copy }
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
          _c("iconic-link", {
            staticClass: "password-remove-link",
            attrs: {
              title: _vm.$t("/(panel)(components)(PasswordMenu)remove_password")
            },
            on: { click: _vm.removePassword }
          })
        ],
        1
      ),
      _c(
        "div",
        { staticClass: "password-info" },
        [
          _vm.password.type == "generated2"
            ? [
                _c("div", { staticClass: "password-type" }, [
                  _vm._v(
                    _vm._s(
                      _vm.$t(
                        "/(panel)(components)(PasswordEntry)password_type_generated2"
                      )
                    )
                  )
                ]),
                _c("div", [
                  _vm._v(
                    _vm._s(
                      _vm.$t(
                        "/(panel)(components)(PasswordEntry)password_length"
                      )
                    ) +
                      " " +
                      _vm._s(_vm.password.length)
                  )
                ]),
                _c("div", [
                  _vm._v(
                    _vm._s(
                      _vm.$t(
                        "/(panel)(components)(PasswordEntry)allowed_characters"
                      )
                    ) +
                      " " +
                      _vm._s(_vm.allowedChars)
                  )
                ])
              ]
            : _vm.password.type == "stored"
            ? [
                _c(
                  "div",
                  { staticClass: "password-type" },
                  [
                    [_vm._v(_vm._s(_vm.$t("password_type_stored")))],
                    _c("span", {
                      staticClass: "help-icon",
                      attrs: {
                        title: _vm.$t("recovery_code_explanation"),
                        "aria-label": _vm.$t("recovery_code_explanation")
                      }
                    })
                  ],
                  2
                ),
                _vm.recoveryCode
                  ? _c("pre", [_vm._v(_vm._s(_vm.recoveryCode))])
                  : _vm._e()
              ]
            : _vm._e(),
          _vm.showNotes && _vm.password.notes
            ? _c("div", [
                _vm._v(
                  _vm._s(_vm.$t("/(panel)(components)(PasswordEntry)notes")) +
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
};
var __vue_staticRenderFns__$x = [];
__vue_render__$x._withStripped = true;

  /* style */
  const __vue_inject_styles__$x = undefined;
  /* scoped */
  const __vue_scope_id__$x = undefined;
  /* module identifier */
  const __vue_module_identifier__$x = undefined;
  /* functional template */
  const __vue_is_functional_template__$x = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var PasswordInfo = normalizeComponent_1(
    { render: __vue_render__$x, staticRenderFns: __vue_staticRenderFns__$x },
    __vue_inject_styles__$x,
    __vue_script__$x,
    __vue_scope_id__$x,
    __vue_is_functional_template__$x,
    __vue_module_identifier__$x,
    undefined,
    undefined
  );//
var script$y = {
  name: "SiteInfo",
  localePath: "allpasswords/components/SiteInfo",
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
};/* script */
const __vue_script__$y = script$y;

/* template */
var __vue_render__$y = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
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
                      $event.preventDefault();
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
            _vm._v(
              " " +
                _vm._s(_vm.$t("aliases_label")) +
                " " +
                _vm._s(
                  _vm.site.aliases
                    .slice()
                    .sort()
                    .join(", ")
                ) +
                " "
            )
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
};
var __vue_staticRenderFns__$y = [];
__vue_render__$y._withStripped = true;

  /* style */
  const __vue_inject_styles__$y = undefined;
  /* scoped */
  const __vue_scope_id__$y = undefined;
  /* module identifier */
  const __vue_module_identifier__$y = undefined;
  /* functional template */
  const __vue_is_functional_template__$y = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var SiteInfo = normalizeComponent_1(
    { render: __vue_render__$y, staticRenderFns: __vue_staticRenderFns__$y },
    __vue_inject_styles__$y,
    __vue_script__$y,
    __vue_scope_id__$y,
    __vue_is_functional_template__$y,
    __vue_module_identifier__$y,
    undefined,
    undefined
  );//
var script$z = {
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
};/* script */
const __vue_script__$z = script$z;

/* template */
var __vue_render__$z = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
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
};
var __vue_staticRenderFns__$z = [];
__vue_render__$z._withStripped = true;

  /* style */
  const __vue_inject_styles__$z = undefined;
  /* scoped */
  const __vue_scope_id__$z = undefined;
  /* module identifier */
  const __vue_module_identifier__$z = undefined;
  /* functional template */
  const __vue_is_functional_template__$z = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var SiteList = normalizeComponent_1(
    { render: __vue_render__$z, staticRenderFns: __vue_staticRenderFns__$z },
    __vue_inject_styles__$z,
    __vue_script__$z,
    __vue_scope_id__$z,
    __vue_is_functional_template__$z,
    __vue_module_identifier__$z,
    undefined,
    undefined
  );//

var script$A = {
  name: "InProgress"
};/* script */
const __vue_script__$A = script$A;

/* template */
var __vue_render__$A = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("modal-overlay", { attrs: { cancelable: false } }, [
    _c("div", { staticClass: "in-progress" }, [
      _c("div", { staticClass: "spinning-wheel" })
    ])
  ])
};
var __vue_staticRenderFns__$A = [];
__vue_render__$A._withStripped = true;

  /* style */
  const __vue_inject_styles__$A = undefined;
  /* scoped */
  const __vue_scope_id__$A = undefined;
  /* module identifier */
  const __vue_module_identifier__$A = undefined;
  /* functional template */
  const __vue_is_functional_template__$A = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var InProgress = normalizeComponent_1(
    { render: __vue_render__$A, staticRenderFns: __vue_staticRenderFns__$A },
    __vue_inject_styles__$A,
    __vue_script__$A,
    __vue_scope_id__$A,
    __vue_is_functional_template__$A,
    __vue_module_identifier__$A,
    undefined,
    undefined
  );//
var script$B = {
  name: "App",
  localePath: "allpasswords/App",
  components: {
    "confirm": Confirm,
    "password-message": PasswordMessage,
    "unknown-error": UnknownError,
    "global-actions": GlobalActions,
    "site-list": SiteList,
    "enter-master": EnterMaster$2,
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
        this.confirm(this.$t("show_passwords_confirm")).then(function (accepted) {
          if (accepted) _this.confirmedPasswords = true;else _this.showPasswords = false;
        });
      }
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    document.title = this.$t("title");
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
    showUnknownError: function showUnknownError(error) {
      if (error == "canceled") return;
      this.unknownError = error;
    },
    updateData: function updateData() {
      this.$refs.siteList.updateData();
    }
  }
};/* script */
const __vue_script__$B = script$B;

/* template */
var __vue_render__$B = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
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
          $event.preventDefault();
          return _vm.testUnknownError($event)
        }
      }
    },
    [
      _vm.inProgress ? _c("in-progress") : _vm._e(),
      _vm.masterPromise
        ? _c("enter-master", { on: { done: _vm.enterMasterDone } })
        : _vm._e(),
      _c("confirm", { ref: "confirm" }),
      _vm.unknownError
        ? _c("unknown-error", {
            attrs: { error: _vm.unknownError },
            on: {
              close: function($event) {
                _vm.unknownError = null;
              }
            }
          })
        : _vm._e(),
      _c("password-message", {
        ref: "global-message",
        attrs: {
          messages: {
            import_success: true,
            unknown_data_format: false,
            syntax_error: false
          }
        }
      }),
      _c(
        "div",
        { staticClass: "title-container" },
        [
          _c("h1", { staticClass: "title" }, [_vm._v(_vm._s(_vm.$t("title")))]),
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
                    $$c = $$el.checked ? true : false;
                  if (Array.isArray($$a)) {
                    var $$v = null,
                      $$i = _vm._i($$a, $$v);
                    if ($$el.checked) {
                      $$i < 0 && (_vm.showNotes = $$a.concat([$$v]));
                    } else {
                      $$i > -1 &&
                        (_vm.showNotes = $$a
                          .slice(0, $$i)
                          .concat($$a.slice($$i + 1)));
                    }
                  } else {
                    _vm.showNotes = $$c;
                  }
                }
              }
            }),
            _vm._v(_vm._s(_vm.$t("show_notes")))
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
                    $$c = $$el.checked ? true : false;
                  if (Array.isArray($$a)) {
                    var $$v = null,
                      $$i = _vm._i($$a, $$v);
                    if ($$el.checked) {
                      $$i < 0 && (_vm.showPasswords = $$a.concat([$$v]));
                    } else {
                      $$i > -1 &&
                        (_vm.showPasswords = $$a
                          .slice(0, $$i)
                          .concat($$a.slice($$i + 1)));
                    }
                  } else {
                    _vm.showPasswords = $$c;
                  }
                }
              }
            }),
            _vm._v(_vm._s(_vm.$t("show_passwords")))
          ])
        ])
      ]),
      _c("div", { staticClass: "intro" }, [_vm._v(_vm._s(_vm.$t("intro")))]),
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
};
var __vue_staticRenderFns__$B = [];
__vue_render__$B._withStripped = true;

  /* style */
  const __vue_inject_styles__$B = undefined;
  /* scoped */
  const __vue_scope_id__$B = undefined;
  /* module identifier */
  const __vue_module_identifier__$B = undefined;
  /* functional template */
  const __vue_is_functional_template__$B = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var AllPasswordsApp = normalizeComponent_1(
    { render: __vue_render__$B, staticRenderFns: __vue_staticRenderFns__$B },
    __vue_inject_styles__$B,
    __vue_script__$B,
    __vue_scope_id__$B,
    __vue_is_functional_template__$B,
    __vue_module_identifier__$B,
    undefined,
    undefined
  );//
var script$C = {
  name: "App",
  components: {
    "panel-app": PanelApp,
    "allpasswords-app": AllPasswordsApp
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
};/* script */
const __vue_script__$C = script$C;

/* template */
var __vue_render__$C = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      !_vm.browserSupported
        ? _c("div", { staticClass: "warning" }, [
            _vm._v(_vm._s(_vm.$t("compat_message")))
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
};
var __vue_staticRenderFns__$C = [];
__vue_render__$C._withStripped = true;

  /* style */
  const __vue_inject_styles__$C = undefined;
  /* scoped */
  const __vue_scope_id__$C = undefined;
  /* module identifier */
  const __vue_module_identifier__$C = undefined;
  /* functional template */
  const __vue_is_functional_template__$C = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var App = normalizeComponent_1(
    { render: __vue_render__$C, staticRenderFns: __vue_staticRenderFns__$C },
    __vue_inject_styles__$C,
    __vue_script__$C,
    __vue_scope_id__$C,
    __vue_is_functional_template__$C,
    __vue_module_identifier__$C,
    undefined,
    undefined
  );/*
 * This Source Code is subject to the terms of the Mozilla Public License
 * version 2.0 (the "License"). You can obtain a copy of the License at
 * http://mozilla.org/MPL/2.0/.
 */
runApp(App, true);