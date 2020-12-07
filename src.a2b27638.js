// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/vue/dist/vue.runtime.esm.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*!
 * Vue.js v2.6.12
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */

/*  */
var emptyObject = Object.freeze({}); // These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.

function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function isTrue(v) {
  return v === true;
}

function isFalse(v) {
  return v === false;
}
/**
 * Check if value is primitive.
 */


function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number' || // $flow-disable-line
  typeof value === 'symbol' || typeof value === 'boolean';
}
/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */


function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
/**
 * Get the raw type string of a value, e.g., [object Object].
 */


var _toString = Object.prototype.toString;

function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */


function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}
/**
 * Check if val is a valid array index.
 */


function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}

function isPromise(val) {
  return isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function';
}
/**
 * Convert a value to a string that is actually rendered.
 */


function toString(val) {
  return val == null ? '' : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
}
/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */


function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */


function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');

  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}
/**
 * Check if a tag is a built-in tag.
 */


var isBuiltInTag = makeMap('slot,component', true);
/**
 * Check if an attribute is a reserved attribute.
 */

var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
/**
 * Remove an item from an array.
 */

function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);

    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}
/**
 * Check whether an object has the property.
 */


var hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
/**
 * Create a cached version of a pure function.
 */


function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Camelize a hyphen-delimited string.
 */


var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
/**
 * Capitalize a string.
 */

var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
/**
 * Hyphenate a camelCase string.
 */

var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});
/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */

function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }

  boundFn._length = fn.length;
  return boundFn;
}

function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}

var bind = Function.prototype.bind ? nativeBind : polyfillBind;
/**
 * Convert an Array-like object to a real Array.
 */

function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);

  while (i--) {
    ret[i] = list[i + start];
  }

  return ret;
}
/**
 * Mix properties into target object.
 */


function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }

  return to;
}
/**
 * Merge an Array of Objects into a single Object.
 */


function toObject(arr) {
  var res = {};

  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }

  return res;
}
/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */


function noop(a, b, c) {}
/**
 * Always return false.
 */


var no = function (a, b, c) {
  return false;
};
/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */


var identity = function (_) {
  return _;
};
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */


function looseEqual(a, b) {
  if (a === b) {
    return true;
  }

  var isObjectA = isObject(a);
  var isObjectB = isObject(b);

  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);

      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */


function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }

  return -1;
}
/**
 * Ensure a function is called only once.
 */


function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

var SSR_ATTR = 'data-server-rendered';
var ASSET_TYPES = ['component', 'directive', 'filter'];
var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured', 'serverPrefetch'];
/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
};
/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */

var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
/**
 * Check if a string starts with $ or _
 */

function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}
/**
 * Define a property.
 */


function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
/**
 * Parse simple path.
 */


var bailRE = new RegExp("[^" + unicodeRegExp.source + ".$_\\d]");

function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }

  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }

      obj = obj[segments[i]];
    }

    return obj;
  };
}
/*  */
// can we use __proto__?


var hasProto = '__proto__' in {}; // Browser environment sniffing

var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0 || weexPlatform === 'android';
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === 'ios';
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/); // Firefox has a "watch" function on Object.prototype...

var nativeWatch = {}.watch;
var supportsPassive = false;

if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    }); // https://github.com/facebook/flow/issues/285

    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
} // this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV


var _isServer;

var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }

  return _isServer;
}; // detect devtools


var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
/* istanbul ignore next */

function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */
// $flow-disable-line


if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set =
  /*@__PURE__*/
  function () {
    function Set() {
      this.set = Object.create(null);
    }

    Set.prototype.has = function has(key) {
      return this.set[key] === true;
    };

    Set.prototype.add = function add(key) {
      this.set[key] = true;
    };

    Set.prototype.clear = function clear() {
      this.set = Object.create(null);
    };

    return Set;
  }();
}
/*  */


var warn = noop;
var tip = noop;
var generateComponentTrace = noop; // work around flow check

var formatComponentName = noop;

if ("development" !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;

  var classify = function (str) {
    return str.replace(classifyRE, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && !config.silent) {
      console.error("[Vue warn]: " + msg + trace);
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && !config.silent) {
      console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }

    var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;

    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
  };

  var repeat = function (str, n) {
    var res = '';

    while (n) {
      if (n % 2 === 1) {
        res += str;
      }

      if (n > 1) {
        str += str;
      }

      n >>= 1;
    }

    return res;
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;

      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];

          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }

        tree.push(vm);
        vm = vm.$parent;
      }

      return '\n\nfound in\n\n' + tree.map(function (vm, i) {
        return "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
      }).join('\n');
    } else {
      return "\n\n(found in " + formatComponentName(vm) + ")";
    }
  };
}
/*  */


var uid = 0;
/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */

var Dep = function Dep() {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify() {
  // stabilize the subscriber list first
  var subs = this.subs.slice();

  if ("development" !== 'production' && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) {
      return a.id - b.id;
    });
  }

  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
}; // The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.


Dep.target = null;
var targetStack = [];

function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
/*  */


var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = {
  child: {
    configurable: true
  }
}; // DEPRECATED: alias for componentInstance for backwards compat.

/* istanbul ignore next */

prototypeAccessors.child.get = function () {
  return this.componentInstance;
};

Object.defineProperties(VNode.prototype, prototypeAccessors);

var createEmptyVNode = function (text) {
  if (text === void 0) text = '';
  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
} // optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.


function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data, // #7975
  // clone children array to avoid mutating original in case of cloning
  // a child.
  vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */


var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
/**
 * Intercept mutating methods and emit events
 */

methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [],
        len = arguments.length;

    while (len--) args[len] = arguments[len];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;

    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;

      case 'splice':
        inserted = args.slice(2);
        break;
    }

    if (inserted) {
      ob.observeArray(inserted);
    } // notify change


    ob.dep.notify();
    return result;
  });
});
/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */

var shouldObserve = true;

function toggleObserving(value) {
  shouldObserve = value;
}
/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */


var Observer = function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);

  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }

    this.observeArray(value);
  } else {
    this.walk(value);
  }
};
/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */


Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};
/**
 * Observe a list of Array items.
 */


Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
}; // helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */


function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}
/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */

/* istanbul ignore next */


function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}
/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */


function observe(value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return;
  }

  var ob;

  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }

  if (asRootData && ob) {
    ob.vmCount++;
  }

  return ob;
}
/**
 * Define a reactive property on an Object.
 */


function defineReactive$$1(obj, key, val, customSetter, shallow) {
  var dep = new Dep();
  var property = Object.getOwnPropertyDescriptor(obj, key);

  if (property && property.configurable === false) {
    return;
  } // cater for pre-defined getter/setters


  var getter = property && property.get;
  var setter = property && property.set;

  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;

      if (Dep.target) {
        dep.depend();

        if (childOb) {
          childOb.dep.depend();

          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }

      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */

      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      /* eslint-enable no-self-compare */


      if ("development" !== 'production' && customSetter) {
        customSetter();
      } // #7981: for accessor properties without setter


      if (getter && !setter) {
        return;
      }

      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }

      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}
/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */


function set(target, key, val) {
  if ("development" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot set reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }

  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
    return val;
  }

  if (!ob) {
    target[key] = val;
    return val;
  }

  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val;
}
/**
 * Delete a property and trigger change if necessary.
 */


function del(target, key) {
  if ("development" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot delete reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
    return;
  }

  if (!hasOwn(target, key)) {
    return;
  }

  delete target[key];

  if (!ob) {
    return;
  }

  ob.dep.notify();
}
/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */


function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();

    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}
/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */


var strats = config.optionMergeStrategies;
/**
 * Options with restrictions
 */

if ("development" !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
    }

    return defaultStrat(parent, child);
  };
}
/**
 * Helper that recursively merges two data objects together.
 */


function mergeData(to, from) {
  if (!from) {
    return to;
  }

  var key, toVal, fromVal;
  var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i]; // in case the object is already observed...

    if (key === '__ob__') {
      continue;
    }

    toVal = to[key];
    fromVal = from[key];

    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }

  return to;
}
/**
 * Data
 */


function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }

    if (!parentVal) {
      return childVal;
    } // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.


    return function mergedDataFn() {
      return mergeData(typeof childVal === 'function' ? childVal.call(this, this) : childVal, typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm, vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm, vm) : parentVal;

      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}

strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "development" !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
      return parentVal;
    }

    return mergeDataOrFn(parentVal, childVal);
  }

  return mergeDataOrFn(parentVal, childVal, vm);
};
/**
 * Hooks and props are merged as arrays.
 */


function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}

function dedupeHooks(hooks) {
  var res = [];

  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }

  return res;
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});
/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */

function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);

  if (childVal) {
    "development" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal);
  } else {
    return res;
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});
/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */

strats.watch = function (parentVal, childVal, vm, key) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) {
    parentVal = undefined;
  }

  if (childVal === nativeWatch) {
    childVal = undefined;
  }
  /* istanbul ignore if */


  if (!childVal) {
    return Object.create(parentVal || null);
  }

  if ("development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = {};
  extend(ret, parentVal);

  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];

    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }

    ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
  }

  return ret;
};
/**
 * Other object hashes.
 */


strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal, vm, key) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = Object.create(null);
  extend(ret, parentVal);

  if (childVal) {
    extend(ret, childVal);
  }

  return ret;
};

strats.provide = mergeDataOrFn;
/**
 * Default strategy.
 */

var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};
/**
 * Validate component names
 */


function checkComponents(options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName(name) {
  if (!new RegExp("^[a-zA-Z][\\-\\.0-9_" + unicodeRegExp.source + "]*$").test(name)) {
    warn('Invalid component name: "' + name + '". Component names ' + 'should conform to valid custom element name in html5 specification.');
  }

  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + name);
  }
}
/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */


function normalizeProps(options, vm) {
  var props = options.props;

  if (!props) {
    return;
  }

  var res = {};
  var i, val, name;

  if (Array.isArray(props)) {
    i = props.length;

    while (i--) {
      val = props[i];

      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = {
          type: null
        };
      } else if ("development" !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : {
        type: val
      };
    }
  } else if ("development" !== 'production') {
    warn("Invalid value for option \"props\": expected an Array or an Object, " + "but got " + toRawType(props) + ".", vm);
  }

  options.props = res;
}
/**
 * Normalize all injections into Object-based format
 */


function normalizeInject(options, vm) {
  var inject = options.inject;

  if (!inject) {
    return;
  }

  var normalized = options.inject = {};

  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = {
        from: inject[i]
      };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val) ? extend({
        from: key
      }, val) : {
        from: val
      };
    }
  } else if ("development" !== 'production') {
    warn("Invalid value for option \"inject\": expected an Array or an Object, " + "but got " + toRawType(inject) + ".", vm);
  }
}
/**
 * Normalize raw function directives into object format.
 */


function normalizeDirectives(options) {
  var dirs = options.directives;

  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];

      if (typeof def$$1 === 'function') {
        dirs[key] = {
          bind: def$$1,
          update: def$$1
        };
      }
    }
  }
}

function assertObjectType(name, value, vm) {
  if (!isPlainObject(value)) {
    warn("Invalid value for option \"" + name + "\": expected an Object, " + "but got " + toRawType(value) + ".", vm);
  }
}
/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */


function mergeOptions(parent, child, vm) {
  if ("development" !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child); // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.

  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }

    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;

  for (key in parent) {
    mergeField(key);
  }

  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }

  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }

  return options;
}
/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */


function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }

  var assets = options[type]; // check local registration variations first

  if (hasOwn(assets, id)) {
    return assets[id];
  }

  var camelizedId = camelize(id);

  if (hasOwn(assets, camelizedId)) {
    return assets[camelizedId];
  }

  var PascalCaseId = capitalize(camelizedId);

  if (hasOwn(assets, PascalCaseId)) {
    return assets[PascalCaseId];
  } // fallback to prototype chain


  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];

  if ("development" !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }

  return res;
}
/*  */


function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key]; // boolean casting

  var booleanIndex = getTypeIndex(Boolean, prop.type);

  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);

      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  } // check default value


  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key); // since the default value is a fresh copy,
    // make sure to observe it.

    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }

  if ("development" !== 'production' && // skip validation for weex recycle-list child component props
  !false) {
    assertProp(prop, key, value, vm, absent);
  }

  return value;
}
/**
 * Get the default value of a prop.
 */


function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined;
  }

  var def = prop.default; // warn against non-factory defaults for Object & Array

  if ("development" !== 'production' && isObject(def)) {
    warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  } // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger


  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
    return vm._props[key];
  } // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context


  return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}
/**
 * Assert whether a prop is valid.
 */


function assertProp(prop, name, value, vm, absent) {
  if (prop.required && absent) {
    warn('Missing required prop: "' + name + '"', vm);
    return;
  }

  if (value == null && !prop.required) {
    return;
  }

  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];

  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }

    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(getInvalidTypeMessage(name, value, expectedTypes), vm);
    return;
  }

  var validator = prop.validator;

  if (validator) {
    if (!validator(value)) {
      warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType(value, type) {
  var valid;
  var expectedType = getType(type);

  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase(); // for primitive wrapper objects

    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }

  return {
    valid: valid,
    expectedType: expectedType
  };
}
/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */


function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isSameType(a, b) {
  return getType(a) === getType(b);
}

function getTypeIndex(type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }

  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i;
    }
  }

  return -1;
}

function getInvalidTypeMessage(name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." + " Expected " + expectedTypes.map(capitalize).join(', ');
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType); // check if we need to specify expected value

  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }

  message += ", got " + receivedType + " "; // check if we need to specify received value

  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }

  return message;
}

function styleValue(value, type) {
  if (type === 'String') {
    return "\"" + value + "\"";
  } else if (type === 'Number') {
    return "" + Number(value);
  } else {
    return "" + value;
  }
}

function isExplicable(value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) {
    return value.toLowerCase() === elem;
  });
}

function isBoolean() {
  var args = [],
      len = arguments.length;

  while (len--) args[len] = arguments[len];

  return args.some(function (elem) {
    return elem.toLowerCase() === 'boolean';
  });
}
/*  */


function handleError(err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();

  try {
    if (vm) {
      var cur = vm;

      while (cur = cur.$parent) {
        var hooks = cur.$options.errorCaptured;

        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;

              if (capture) {
                return;
              }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }

    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling(handler, context, args, vm, info) {
  var res;

  try {
    res = args ? handler.apply(context, args) : handler.call(context);

    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) {
        return handleError(e, vm, info + " (Promise/async)");
      }); // issue #9511
      // avoid catch triggering multiple times when nested calls

      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }

  return res;
}

function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }

  logError(err, vm, info);
}

function logError(err, vm, info) {
  if ("development" !== 'production') {
    warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
  }
  /* istanbul ignore else */


  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err;
  }
}
/*  */


var isUsingMicroTask = false;
var callbacks = [];
var pending = false;

function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;

  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
} // Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).


var timerFunc; // The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:

/* istanbul ignore next, $flow-disable-line */

if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();

  timerFunc = function () {
    p.then(flushCallbacks); // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.

    if (isIOS) {
      setTimeout(noop);
    }
  };

  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) || // PhantomJS and iOS 7.x
MutationObserver.toString() === '[object MutationObserverConstructor]')) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });

  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };

  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick(cb, ctx) {
  var _resolve;

  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });

  if (!pending) {
    pending = true;
    timerFunc();
  } // $flow-disable-line


  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    });
  }
}
/*  */

/* not type checking this file because flow doesn't play well with Proxy */


var initProxy;

if ("development" !== 'production') {
  var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn("Property or method \"" + key + "\" is not defined on the instance but " + 'referenced during render. Make sure that this property is reactive, ' + 'either in the data option, or for class-based components, by ' + 'initializing the property. ' + 'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
  };

  var warnReservedPrefix = function (target, key) {
    warn("Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " + 'properties starting with "$" or "_" are not proxied in the Vue instance to ' + 'prevent conflicts with Vue internals. ' + 'See: https://vuejs.org/v2/api/#data', target);
  };

  var hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set(target, key, value) {
        if (isBuiltInModifier(key)) {
          warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
          return false;
        } else {
          target[key] = value;
          return true;
        }
      }
    });
  }

  var hasHandler = {
    has: function has(target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data);

      if (!has && !isAllowed) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return has || !isAllowed;
    }
  };
  var getHandler = {
    get: function get(target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return target[key];
    }
  };

  initProxy = function initProxy(vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}
/*  */


var seenObjects = new _Set();
/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */

function traverse(val) {
  _traverse(val, seenObjects);

  seenObjects.clear();
}

function _traverse(val, seen) {
  var i, keys;
  var isA = Array.isArray(val);

  if (!isA && !isObject(val) || Object.isFrozen(val) || val instanceof VNode) {
    return;
  }

  if (val.__ob__) {
    var depId = val.__ob__.dep.id;

    if (seen.has(depId)) {
      return;
    }

    seen.add(depId);
  }

  if (isA) {
    i = val.length;

    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys = Object.keys(val);
    i = keys.length;

    while (i--) {
      _traverse(val[keys[i]], seen);
    }
  }
}

var mark;
var measure;

if ("development" !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */

  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = function (tag) {
      return perf.mark(tag);
    };

    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag); // perf.clearMeasures(name)
    };
  }
}
/*  */


var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first

  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  };
});

function createFnInvoker(fns, vm) {
  function invoker() {
    var arguments$1 = arguments;
    var fns = invoker.fns;

    if (Array.isArray(fns)) {
      var cloned = fns.slice();

      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler");
    }
  }

  invoker.fns = fns;
  return invoker;
}

function updateListeners(on, oldOn, add, remove$$1, createOnceHandler, vm) {
  var name, def$$1, cur, old, event;

  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);

    if (isUndef(cur)) {
      "development" !== 'production' && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }

      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }

      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }

  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}
/*  */


function mergeVNodeHook(def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }

  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook() {
    hook.apply(this, arguments); // important: remove merged hook to ensure it's called only once
    // and prevent memory leak

    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}
/*  */


function extractPropsFromVNodeData(data, Ctor, tag) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;

  if (isUndef(propOptions)) {
    return;
  }

  var res = {};
  var attrs = data.attrs;
  var props = data.props;

  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);

      if ("development" !== 'production') {
        var keyInLowerCase = key.toLowerCase();

        if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
          tip("Prop \"" + keyInLowerCase + "\" is passed to component " + formatComponentName(tag || Ctor) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
        }
      }

      checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
    }
  }

  return res;
}

function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];

      if (!preserve) {
        delete hash[key];
      }

      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];

      if (!preserve) {
        delete hash[altKey];
      }

      return true;
    }
  }

  return false;
}
/*  */
// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:
// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.


function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }

  return children;
} // 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.


function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}

function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}

function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;

  for (i = 0; i < children.length; i++) {
    c = children[i];

    if (isUndef(c) || typeof c === 'boolean') {
      continue;
    }

    lastIndex = res.length - 1;
    last = res[lastIndex]; //  nested

    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, (nestedIndex || '') + "_" + i); // merge adjacent text nodes

        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }

        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }

        res.push(c);
      }
    }
  }

  return res;
}
/*  */


function initProvide(vm) {
  var provide = vm.$options.provide;

  if (provide) {
    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
  }
}

function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);

  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if ("development" !== 'production') {
        defineReactive$$1(vm, key, result[key], function () {
          warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject(inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]; // #6574 in case the inject object is observed...

      if (key === '__ob__') {
        continue;
      }

      var provideKey = inject[key].from;
      var source = vm;

      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break;
        }

        source = source.$parent;
      }

      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
        } else if ("development" !== 'production') {
          warn("Injection \"" + key + "\" not found", vm);
        }
      }
    }

    return result;
  }
}
/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */


function resolveSlots(children, context) {
  if (!children || !children.length) {
    return {};
  }

  var slots = {};

  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data; // remove slot attribute if the node is resolved as a Vue slot node

    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    } // named slots should only be respected if the vnode was rendered in the
    // same context.


    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
      var name = data.slot;
      var slot = slots[name] || (slots[name] = []);

      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  } // ignore slots that contains only whitespace


  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }

  return slots;
}

function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === ' ';
}
/*  */


function normalizeScopedSlots(slots, normalSlots, prevSlots) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;

  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized;
  } else if (isStable && prevSlots && prevSlots !== emptyObject && key === prevSlots.$key && !hasNormalSlots && !prevSlots.$hasNormal) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots;
  } else {
    res = {};

    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  } // expose normal slots on scopedSlots


  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  } // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error


  if (slots && Object.isExtensible(slots)) {
    slots._normalized = res;
  }

  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res;
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res) ? [res] // single vnode
    : normalizeChildren(res);
    return res && (res.length === 0 || res.length === 1 && res[0].isComment // #9658
    ) ? undefined : res;
  }; // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.


  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }

  return normalized;
}

function proxyNormalSlot(slots, key) {
  return function () {
    return slots[key];
  };
}
/*  */

/**
 * Runtime helper for rendering v-for lists.
 */


function renderList(val, render) {
  var ret, i, l, keys, key;

  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);

    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);

    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();

      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);

      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }

  if (!isDef(ret)) {
    ret = [];
  }

  ret._isVList = true;
  return ret;
}
/*  */

/**
 * Runtime helper for rendering <slot>
 */


function renderSlot(name, fallback, props, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;

  if (scopedSlotFn) {
    // scoped slot
    props = props || {};

    if (bindObject) {
      if ("development" !== 'production' && !isObject(bindObject)) {
        warn('slot v-bind without argument expects an Object', this);
      }

      props = extend(extend({}, bindObject), props);
    }

    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;

  if (target) {
    return this.$createElement('template', {
      slot: target
    }, nodes);
  } else {
    return nodes;
  }
}
/*  */

/**
 * Runtime helper for resolving filters
 */


function resolveFilter(id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity;
}
/*  */


function isKeyNotMatch(expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}
/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */


function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;

  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
}
/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */


function bindObjectProps(data, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }

      var hash;

      var loop = function (key) {
        if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }

        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);

        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});

            on["update:" + key] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop(key);
    }
  }

  return data;
}
/*  */

/**
 * Runtime helper for rendering static trees.
 */


function renderStatic(index, isInFor) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index]; // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.

  if (tree && !isInFor) {
    return tree;
  } // otherwise, render a fresh tree.


  tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, null, this // for render fns generated for functional component templates
  );
  markStatic(tree, "__static__" + index, false);
  return tree;
}
/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */


function markOnce(tree, index, key) {
  markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
  return tree;
}

function markStatic(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], key + "_" + i, isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}
/*  */


function bindObjectListeners(data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "development" !== 'production' && warn('v-on without argument expects an Object value', this);
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};

      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }

  return data;
}
/*  */


function resolveScopedSlots(fns, // see flow/vnode
res, // the following are added in 2.6
hasDynamicKeys, contentHashKey) {
  res = res || {
    $stable: !hasDynamicKeys
  };

  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];

    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }

      res[slot.key] = slot.fn;
    }
  }

  if (contentHashKey) {
    res.$key = contentHashKey;
  }

  return res;
}
/*  */


function bindDynamicKeys(baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];

    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ("development" !== 'production' && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn("Invalid value for dynamic directive argument (expected string or null): " + key, this);
    }
  }

  return baseObj;
} // helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.


function prependModifier(value, symbol) {
  return typeof value === 'string' ? symbol + value : value;
}
/*  */


function installRenderHelpers(target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}
/*  */


function FunctionalRenderContext(data, props, children, parent, Ctor) {
  var this$1 = this;
  var options = Ctor.options; // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check

  var contextVm;

  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent); // $flow-disable-line

    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent; // $flow-disable-line

    parent = parent._original;
  }

  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);

  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(data.scopedSlots, this$1.$slots = resolveSlots(children, parent));
    }

    return this$1.$slots;
  };

  Object.defineProperty(this, 'scopedSlots', {
    enumerable: true,
    get: function get() {
      return normalizeScopedSlots(data.scopedSlots, this.slots());
    }
  }); // support for compiled functional template

  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options; // pre-resolve slots for renderSlot()

    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);

      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }

      return vnode;
    };
  } else {
    this._c = function (a, b, c, d) {
      return createElement(contextVm, a, b, c, d, needNormalization);
    };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;

  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) {
      mergeProps(props, data.attrs);
    }

    if (isDef(data.props)) {
      mergeProps(props, data.props);
    }
  }

  var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);
  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext);
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);

    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }

    return res;
  }
}

function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;

  if ("development" !== 'production') {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }

  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }

  return clone;
}

function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}
/*  */

/*  */

/*  */

/*  */
// inline hooks to be invoked on component VNodes during patch


var componentVNodeHooks = {
  init: function init(vnode, hydrating) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow

      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },
  prepatch: function prepatch(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
    );
  },
  insert: function insert(vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }

    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  },
  destroy: function destroy(vnode) {
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  }
};
var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  var baseCtor = context.$options._base; // plain options object: turn it into a constructor

  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  } // if at this stage it's not a constructor or an async component factory,
  // reject.


  if (typeof Ctor !== 'function') {
    if ("development" !== 'production') {
      warn("Invalid Component definition: " + String(Ctor), context);
    }

    return;
  } // async component


  var asyncFactory;

  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);

    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }

  data = data || {}; // resolve constructor options in case global mixins are applied after
  // component constructor creation

  resolveConstructorOptions(Ctor); // transform component v-model data into props & events

  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  } // extract props


  var propsData = extractPropsFromVNodeData(data, Ctor, tag); // functional component

  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  } // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners


  var listeners = data.on; // replace with listeners with .native modifier
  // so it gets processed during parent component patch.

  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot
    // work around flow
    var slot = data.slot;
    data = {};

    if (slot) {
      data.slot = slot;
    }
  } // install component management hooks onto the placeholder node


  installComponentHooks(data); // return a placeholder vnode

  var name = Ctor.options.name || tag;
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, {
    Ctor: Ctor,
    propsData: propsData,
    listeners: listeners,
    tag: tag,
    children: children
  }, asyncFactory);
  return vnode;
}

function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  }; // check inline-template render functions

  var inlineTemplate = vnode.data.inlineTemplate;

  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }

  return new vnode.componentOptions.Ctor(options);
}

function installComponentHooks(data) {
  var hooks = data.hook || (data.hook = {});

  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];

    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1(f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };

  merged._merged = true;
  return merged;
} // transform component v-model info (value and callback) into
// prop and event handler respectively.


function transformModel(options, data) {
  var prop = options.model && options.model.prop || 'value';
  var event = options.model && options.model.event || 'input';
  (data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;

  if (isDef(existing)) {
    if (Array.isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}
/*  */


var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2; // wrapper function for providing a more flexible interface
// without getting yelled at by flow

function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }

  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }

  return _createElement(context, tag, data, children, normalizationType);
}

function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    "development" !== 'production' && warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
    return createEmptyVNode();
  } // object syntax in v-bind


  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }

  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  } // warn against non-primitive key


  if ("development" !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
    {
      warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
    }
  } // support single function children as default scoped slot


  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = {
      default: children[0]
    };
    children.length = 0;
  }

  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }

  var vnode, ns;

  if (typeof tag === 'string') {
    var Ctor;
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);

    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ("development" !== 'production' && isDef(data) && isDef(data.nativeOn)) {
        warn("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">.", context);
      }

      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }

  if (Array.isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns)) {
      applyNS(vnode, ns);
    }

    if (isDef(data)) {
      registerDeepBindings(data);
    }

    return vnode;
  } else {
    return createEmptyVNode();
  }
}

function applyNS(vnode, ns, force) {
  vnode.ns = ns;

  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }

  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];

      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== 'svg')) {
        applyNS(child, ns, force);
      }
    }
  }
} // ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes


function registerDeepBindings(data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }

  if (isObject(data.class)) {
    traverse(data.class);
  }
}
/*  */


function initRender(vm) {
  vm._vnode = null; // the root of the child tree

  vm._staticTrees = null; // v-once cached trees

  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree

  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject; // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates

  vm._c = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  }; // normalization is always applied for the public version, used in
  // user-written render functions.


  vm.$createElement = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  }; // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated


  var parentData = parentVnode && parentVnode.data;
  /* istanbul ignore else */

  if ("development" !== 'production') {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

var currentRenderingInstance = null;

function renderMixin(Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(_parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
    } // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.


    vm.$vnode = _parentVnode; // render self

    var vnode;

    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render"); // return error render result,
      // or previous vnode to prevent render error causing blank component

      /* istanbul ignore else */

      if ("development" !== 'production' && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    } // if the returned array contains only a single node, allow it


    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    } // return empty vnode in case the render function errored out


    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
      }

      vnode = createEmptyVNode();
    } // set parent


    vnode.parent = _parentVnode;
    return vnode;
  };
}
/*  */


function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === 'Module') {
    comp = comp.default;
  }

  return isObject(comp) ? base.extend(comp) : comp;
}

function createAsyncPlaceholder(factory, data, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = {
    data: data,
    context: context,
    children: children,
    tag: tag
  };
  return node;
}

function resolveAsyncComponent(factory, baseCtor) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }

  if (isDef(factory.resolved)) {
    return factory.resolved;
  }

  var owner = currentRenderingInstance;

  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null;
    owner.$on('hook:destroyed', function () {
      return remove(owners, owner);
    });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        owners[i].$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;

        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }

        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor); // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)

      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });
    var reject = once(function (reason) {
      "development" !== 'production' && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));

      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });
    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);

          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;

              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;

            if (isUndef(factory.resolved)) {
              reject("development" !== 'production' ? "timeout (" + res.timeout + "ms)" : null);
            }
          }, res.timeout);
        }
      }
    }

    sync = false; // return in case resolved synchronously

    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}
/*  */


function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}
/*  */


function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];

      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}
/*  */

/*  */


function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false; // init parent attached events

  var listeners = vm.$options._parentListeners;

  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add(event, fn) {
  target.$on(event, fn);
}

function remove$1(event, fn) {
  target.$off(event, fn);
}

function createOnceHandler(event, fn) {
  var _target = target;
  return function onceHandler() {
    var res = fn.apply(null, arguments);

    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  };
}

function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin(Vue) {
  var hookRE = /^hook:/;

  Vue.prototype.$on = function (event, fn) {
    var vm = this;

    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn); // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup

      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }

    return vm;
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;

    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }

    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this; // all

    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    } // array of events


    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }

      return vm;
    } // specific event


    var cbs = vm._events[event];

    if (!cbs) {
      return vm;
    }

    if (!fn) {
      vm._events[event] = null;
      return vm;
    } // specific handler


    var cb;
    var i = cbs.length;

    while (i--) {
      cb = cbs[i];

      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }

    return vm;
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;

    if ("development" !== 'production') {
      var lowerCaseEvent = event.toLowerCase();

      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
      }
    }

    var cbs = vm._events[event];

    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";

      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }

    return vm;
  };
}
/*  */


var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  };
}

function initLifecycle(vm) {
  var options = vm.$options; // locate first non-abstract parent

  var parent = options.parent;

  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }

    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;
  vm.$children = [];
  vm.$refs = {};
  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode; // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.

    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false
      /* removeOnly */
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }

    restoreActiveInstance(); // update __vue__ reference

    if (prevEl) {
      prevEl.__vue__ = null;
    }

    if (vm.$el) {
      vm.$el.__vue__ = vm;
    } // if parent is an HOC, update its $el as well


    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    } // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.

  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;

    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;

    if (vm._isBeingDestroyed) {
      return;
    }

    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true; // remove self from parent

    var parent = vm.$parent;

    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    } // teardown watchers


    if (vm._watcher) {
      vm._watcher.teardown();
    }

    var i = vm._watchers.length;

    while (i--) {
      vm._watchers[i].teardown();
    } // remove reference from data ob
    // frozen object may not have observer.


    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    } // call the last hook...


    vm._isDestroyed = true; // invoke destroy hooks on current rendered tree

    vm.__patch__(vm._vnode, null); // fire destroyed hook


    callHook(vm, 'destroyed'); // turn off all instance listeners.

    vm.$off(); // remove __vue__ reference

    if (vm.$el) {
      vm.$el.__vue__ = null;
    } // release circular reference (#6759)


    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent(vm, el, hydrating) {
  vm.$el = el;

  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;

    if ("development" !== 'production') {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
        warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
      } else {
        warn('Failed to mount component: template or render function not defined.', vm);
      }
    }
  }

  callHook(vm, 'beforeMount');
  var updateComponent;
  /* istanbul ignore if */

  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;
      mark(startTag);

      var vnode = vm._render();

      mark(endTag);
      measure("vue " + name + " render", startTag, endTag);
      mark(startTag);

      vm._update(vnode, hydrating);

      mark(endTag);
      measure("vue " + name + " patch", startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  } // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined


  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true
  /* isRenderWatcher */
  );
  hydrating = false; // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook

  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }

  return vm;
}

function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  if ("development" !== 'production') {
    isUpdatingChildComponent = true;
  } // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.
  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.


  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key); // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.

  var needsForceUpdate = !!(renderChildren || // has new static slots
  vm.$options._renderChildren || // has old static slots
  hasDynamicScopedSlot);
  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) {
    // update child tree's parent
    vm._vnode.parent = parentVnode;
  }

  vm.$options._renderChildren = renderChildren; // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render

  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject; // update props

  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];

    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?

      props[key] = validateProp(key, propOptions, propsData, vm);
    }

    toggleObserving(true); // keep a copy of raw propsData

    vm.$options.propsData = propsData;
  } // update listeners


  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners); // resolve slots + force update if has children

  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if ("development" !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) {
      return true;
    }
  }

  return false;
}

function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;

    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }

  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;

    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'activated');
  }
}

function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;

    if (isInInactiveTree(vm)) {
      return;
    }
  }

  if (!vm._inactive) {
    vm._inactive = true;

    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'deactivated');
  }
}

function callHook(vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";

  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }

  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }

  popTarget();
}
/*  */


var MAX_UPDATE_COUNT = 100;
var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;
/**
 * Reset the scheduler's state.
 */

function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0;
  has = {};

  if ("development" !== 'production') {
    circular = {};
  }

  waiting = flushing = false;
} // Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.


var currentFlushTimestamp = 0; // Async edge case fix requires storing an event listener's attach timestamp.

var getNow = Date.now; // Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)

if (inBrowser && !isIE) {
  var performance = window.performance;

  if (performance && typeof performance.now === 'function' && getNow() > document.createEvent('Event').timeStamp) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () {
      return performance.now();
    };
  }
}
/**
 * Flush both queues and run the watchers.
 */


function flushSchedulerQueue() {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id; // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.

  queue.sort(function (a, b) {
    return a.id - b.id;
  }); // do not cache length because more watchers might be pushed
  // as we run existing watchers

  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];

    if (watcher.before) {
      watcher.before();
    }

    id = watcher.id;
    has[id] = null;
    watcher.run(); // in dev build, check and stop circular updates.

    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;

      if (circular[id] > MAX_UPDATE_COUNT) {
        warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
        break;
      }
    }
  } // keep copies of post queues before resetting state


  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();
  resetSchedulerState(); // call component updated and activated hooks

  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue); // devtool hook

  /* istanbul ignore if */

  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks(queue) {
  var i = queue.length;

  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;

    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}
/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */


function queueActivatedComponent(vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks(queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true
    /* true */
    );
  }
}
/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */


function queueWatcher(watcher) {
  var id = watcher.id;

  if (has[id] == null) {
    has[id] = true;

    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;

      while (i > index && queue[i].id > watcher.id) {
        i--;
      }

      queue.splice(i + 1, 0, watcher);
    } // queue the flush


    if (!waiting) {
      waiting = true;

      if ("development" !== 'production' && !config.async) {
        flushSchedulerQueue();
        return;
      }

      nextTick(flushSchedulerQueue);
    }
  }
}
/*  */


var uid$2 = 0;
/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */

var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
  this.vm = vm;

  if (isRenderWatcher) {
    vm._watcher = this;
  }

  vm._watchers.push(this); // options


  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }

  this.cb = cb;
  this.id = ++uid$2; // uid for batching

  this.active = true;
  this.dirty = this.lazy; // for lazy watchers

  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = "development" !== 'production' ? expOrFn.toString() : ''; // parse expression for getter

  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);

    if (!this.getter) {
      this.getter = noop;
      "development" !== 'production' && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
    }
  }

  this.value = this.lazy ? undefined : this.get();
};
/**
 * Evaluate the getter, and re-collect dependencies.
 */


Watcher.prototype.get = function get() {
  pushTarget(this);
  var value;
  var vm = this.vm;

  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
    } else {
      throw e;
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }

    popTarget();
    this.cleanupDeps();
  }

  return value;
};
/**
 * Add a dependency to this directive.
 */


Watcher.prototype.addDep = function addDep(dep) {
  var id = dep.id;

  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);

    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};
/**
 * Clean up for dependency collection.
 */


Watcher.prototype.cleanupDeps = function cleanupDeps() {
  var i = this.deps.length;

  while (i--) {
    var dep = this.deps[i];

    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }

  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};
/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */


Watcher.prototype.update = function update() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};
/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */


Watcher.prototype.run = function run() {
  if (this.active) {
    var value = this.get();

    if (value !== this.value || // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated.
    isObject(value) || this.deep) {
      // set new value
      var oldValue = this.value;
      this.value = value;

      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};
/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */


Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get();
  this.dirty = false;
};
/**
 * Depend on all deps collected by this watcher.
 */


Watcher.prototype.depend = function depend() {
  var i = this.deps.length;

  while (i--) {
    this.deps[i].depend();
  }
};
/**
 * Remove self from all dependencies' subscriber list.
 */


Watcher.prototype.teardown = function teardown() {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }

    var i = this.deps.length;

    while (i--) {
      this.deps[i].removeSub(this);
    }

    this.active = false;
  }
};
/*  */


var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };

  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;

  if (opts.props) {
    initProps(vm, opts.props);
  }

  if (opts.methods) {
    initMethods(vm, opts.methods);
  }

  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true
    /* asRootData */
    );
  }

  if (opts.computed) {
    initComputed(vm, opts.computed);
  }

  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {}; // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.

  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent; // root instance props should be converted

  if (!isRoot) {
    toggleObserving(false);
  }

  var loop = function (key) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */

    if ("development" !== 'production') {
      var hyphenatedKey = hyphenate(key);

      if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
        warn("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop.", vm);
      }

      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    } // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.


    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop(key);

  toggleObserving(true);
}

function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};

  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
  } // proxy data on instance


  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;

  while (i--) {
    var key = keys[i];

    if ("development" !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn("Method \"" + key + "\" has already been defined as a data property.", vm);
      }
    }

    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  } // observe data


  observe(data, true
  /* asRootData */
  );
}

function getData(data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();

  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = {
  lazy: true
};

function initComputed(vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null); // computed properties are just getters during SSR

  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;

    if ("development" !== 'production' && getter == null) {
      warn("Getter is missing for computed property \"" + key + "\".", vm);
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    } // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.


    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if ("development" !== 'production') {
      if (key in vm.$data) {
        warn("The computed property \"" + key + "\" is already defined in data.", vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
      }
    }
  }
}

function defineComputed(target, key, userDef) {
  var shouldCache = !isServerRendering();

  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }

  if ("development" !== 'production' && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn("Computed property \"" + key + "\" was assigned to but it has no setter.", this);
    };
  }

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];

    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }

      if (Dep.target) {
        watcher.depend();
      }

      return watcher.value;
    }
  };
}

function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this);
  };
}

function initMethods(vm, methods) {
  var props = vm.$options.props;

  for (var key in methods) {
    if ("development" !== 'production') {
      if (typeof methods[key] !== 'function') {
        warn("Method \"" + key + "\" has type \"" + typeof methods[key] + "\" in the component definition. " + "Did you reference the function correctly?", vm);
      }

      if (props && hasOwn(props, key)) {
        warn("Method \"" + key + "\" has already been defined as a prop.", vm);
      }

      if (key in vm && isReserved(key)) {
        warn("Method \"" + key + "\" conflicts with an existing Vue instance method. " + "Avoid defining component methods that start with _ or $.");
      }
    }

    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];

    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }

  if (typeof handler === 'string') {
    handler = vm[handler];
  }

  return vm.$watch(expOrFn, handler, options);
}

function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};

  dataDef.get = function () {
    return this._data;
  };

  var propsDef = {};

  propsDef.get = function () {
    return this._props;
  };

  if ("development" !== 'production') {
    dataDef.set = function () {
      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
    };

    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }

  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);
  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;

    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }

    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);

    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, "callback for immediate watcher \"" + watcher.expression + "\"");
      }
    }

    return function unwatchFn() {
      watcher.teardown();
    };
  };
}
/*  */


var uid$3 = 0;

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this; // a uid

    vm._uid = uid$3++;
    var startTag, endTag;
    /* istanbul ignore if */

    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + vm._uid;
      endTag = "vue-perf-end:" + vm._uid;
      mark(startTag);
    } // a flag to avoid this being observed


    vm._isVue = true; // merge options

    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    /* istanbul ignore else */


    if ("development" !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    } // expose real self


    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props

    initState(vm);
    initProvide(vm); // resolve provide after data/props

    callHook(vm, 'created');
    /* istanbul ignore if */

    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure("vue " + vm._name + " init", startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options); // doing this because it's faster than dynamic enumeration.

  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;

  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;

    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions; // check if there are any late-modified/attached options (#4976)

      var modifiedOptions = resolveModifiedOptions(Ctor); // update base extend options

      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }

      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);

      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }

  return options;
}

function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;

  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }

      modified[key] = latest[key];
    }
  }

  return modified;
}

function Vue(options) {
  if ("development" !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }

  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
/*  */

function initUse(Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);

    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    } // additional parameters


    var args = toArray(arguments, 1);
    args.unshift(this);

    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }

    installedPlugins.push(plugin);
    return this;
  };
}
/*  */


function initMixin$1(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}
/*  */


function initExtend(Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;
  /**
   * Class inheritance
   */

  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});

    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }

    var name = extendOptions.name || Super.options.name;

    if ("development" !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent(options) {
      this._init(options);
    };

    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super; // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.

    if (Sub.options.props) {
      initProps$1(Sub);
    }

    if (Sub.options.computed) {
      initComputed$1(Sub);
    } // allow further extension/mixin/plugin usage


    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use; // create asset registers, so extended classes
    // can have their private assets too.

    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    }); // enable recursive self-lookup

    if (name) {
      Sub.options.components[name] = Sub;
    } // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.


    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options); // cache constructor

    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}

function initProps$1(Comp) {
  var props = Comp.options.props;

  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1(Comp) {
  var computed = Comp.options.computed;

  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}
/*  */


function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if ("development" !== 'production' && type === 'component') {
          validateComponentName(id);
        }

        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }

        if (type === 'directive' && typeof definition === 'function') {
          definition = {
            bind: definition,
            update: definition
          };
        }

        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });
}
/*  */


function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */


  return false;
}

function pruneCache(keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;

  for (var key in cache) {
    var cachedNode = cache[key];

    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);

      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry(cache, key, keys, current) {
  var cached$$1 = cache[key];

  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }

  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];
var KeepAlive = {
  name: 'keep-alive',
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  created: function created() {
    this.cache = Object.create(null);
    this.keys = [];
  },
  destroyed: function destroyed() {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },
  mounted: function mounted() {
    var this$1 = this;
    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) {
        return matches(val, name);
      });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) {
        return !matches(val, name);
      });
    });
  },
  render: function render() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;

    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;

      if ( // not included
      include && (!name || !matches(include, name)) || // excluded
      exclude && name && matches(exclude, name)) {
        return vnode;
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;

      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance; // make current key freshest

        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key); // prune oldest entry

        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }

    return vnode || slot && slot[0];
  }
};
var builtInComponents = {
  KeepAlive: KeepAlive
};
/*  */

function initGlobalAPI(Vue) {
  // config
  var configDef = {};

  configDef.get = function () {
    return config;
  };

  if ("development" !== 'production') {
    configDef.set = function () {
      warn('Do not replace the Vue.config object, set individual fields instead.');
    };
  }

  Object.defineProperty(Vue, 'config', configDef); // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.

  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };
  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick; // 2.6 explicit observable API

  Vue.observable = function (obj) {
    observe(obj);
    return obj;
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  }); // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.

  Vue.options._base = Vue;
  extend(Vue.options.components, builtInComponents);
  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  }
}); // expose FunctionalRenderContext for ssr runtime helper installation

Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});
Vue.version = '2.6.12';
/*  */
// these are reserved for web because they are directly compiled away
// during template compilation

var isReservedAttr = makeMap('style,class'); // attributes that should be using props for binding

var acceptValue = makeMap('input,textarea,option,select,progress');

var mustUseProp = function (tag, type, attr) {
  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false' ? 'false' // allow arbitrary string value for contenteditable
  : key === 'contenteditable' && isValidContentEditableValue(value) ? value : 'true';
};

var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');
var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : '';
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false;
};
/*  */


function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;

  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;

    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }

  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }

  return renderClass(data.staticClass, data.class);
}

function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}

function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  /* istanbul ignore next */


  return '';
}

function concat(a, b) {
  return a ? b ? a + ' ' + b : a : b || '';
}

function stringifyClass(value) {
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }

  if (isObject(value)) {
    return stringifyObject(value);
  }

  if (typeof value === 'string') {
    return value;
  }
  /* istanbul ignore next */


  return '';
}

function stringifyArray(value) {
  var res = '';
  var stringified;

  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) {
        res += ' ';
      }

      res += stringified;
    }
  }

  return res;
}

function stringifyObject(value) {
  var res = '';

  for (var key in value) {
    if (value[key]) {
      if (res) {
        res += ' ';
      }

      res += key;
    }
  }

  return res;
}
/*  */


var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};
var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot'); // this map is intentionally selective, only covering SVG elements that may
// contain child elements.

var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag);
};

function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return 'svg';
  } // basic support for MathML
  // note it doesn't support other MathML elements being component roots


  if (tag === 'math') {
    return 'math';
  }
}

var unknownElementCache = Object.create(null);

function isUnknownElement(tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true;
  }

  if (isReservedTag(tag)) {
    return false;
  }

  tag = tag.toLowerCase();
  /* istanbul ignore if */

  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }

  var el = document.createElement(tag);

  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');
/*  */

/**
 * Query an element selector if it's not an element already.
 */

function query(el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);

    if (!selected) {
      "development" !== 'production' && warn('Cannot find element: ' + el);
      return document.createElement('div');
    }

    return selected;
  } else {
    return el;
  }
}
/*  */


function createElement$1(tagName, vnode) {
  var elm = document.createElement(tagName);

  if (tagName !== 'select') {
    return elm;
  } // false or null will remove the attribute but undefined will not


  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }

  return elm;
}

function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function createComment(text) {
  return document.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  node.removeChild(child);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function parentNode(node) {
  return node.parentNode;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps =
/*#__PURE__*/
Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});
/*  */

var ref = {
  create: function create(_, vnode) {
    registerRef(vnode);
  },
  update: function update(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy(vnode) {
    registerRef(vnode, true);
  }
};

function registerRef(vnode, isRemoval) {
  var key = vnode.data.ref;

  if (!isDef(key)) {
    return;
  }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;

  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}
/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */


var emptyNode = new VNode('', {}, []);
var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode(a, b) {
  return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
}

function sameInputType(a, b) {
  if (a.tag !== 'input') {
    return true;
  }

  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};

  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;

    if (isDef(key)) {
      map[key] = i;
    }
  }

  return map;
}

function createPatchFunction(backend) {
  var i, j;
  var cbs = {};
  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];

    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    function remove$$1() {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }

    remove$$1.listeners = listeners;
    return remove$$1;
  }

  function removeNode(el) {
    var parent = nodeOps.parentNode(el); // element may have already been removed due to v-html / v-text

    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1(vnode, inVPre) {
    return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function (ignore) {
      return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
    })) && config.isUnknownElement(vnode.tag);
  }

  var creatingElmInVPre = 0;

  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check

    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;

    if (isDef(tag)) {
      if ("development" !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }

        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
        }
      }

      vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
      setScope(vnode);
      /* istanbul ignore if */

      {
        createChildren(vnode, children, insertedVnodeQueue);

        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }

        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;

    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;

      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false
        /* hydrating */
        );
      } // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.


      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);

        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }

        return true;
      }
    }
  }

  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }

    vnode.elm = vnode.componentInstance.$el;

    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode); // make sure to invoke the insert hook

      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i; // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.

    var innerNode = vnode;

    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;

      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }

        insertedVnodeQueue.push(innerNode);
        break;
      }
    } // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself


    insert(parentElm, vnode.elm, refElm);
  }

  function insert(parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if ("development" !== 'production') {
        checkDuplicateKeys(children);
      }

      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }

    return isDef(vnode.tag);
  }

  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }

    i = vnode.data.hook; // Reuse variable

    if (isDef(i)) {
      if (isDef(i.create)) {
        i.create(emptyNode, vnode);
      }

      if (isDef(i.insert)) {
        insertedVnodeQueue.push(vnode);
      }
    }
  } // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.


  function setScope(vnode) {
    var i;

    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;

      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }

        ancestor = ancestor.parent;
      }
    } // for slot content they should also get the scopeId from the host instance.


    if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook(vnode) {
    var i, j;
    var data = vnode.data;

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) {
        i(vnode);
      }

      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode);
      }
    }

    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes(vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];

      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;

      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      } // recursively invoke hooks on child component root node


      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }

      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }

      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm; // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions

    var canMove = !removeOnly;

    if ("development" !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }

        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);

        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];

          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }

        newStartVnode = newCh[++newStartIdx];
      }
    }

    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys(children) {
    var seenKeys = {};

    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;

      if (isDef(key)) {
        if (seenKeys[key]) {
          warn("Duplicate keys detected: '" + key + "'. This may cause an update error.", vnode.context);
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld(node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];

      if (isDef(c) && sameVnode(node, c)) {
        return i;
      }
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }

      return;
    } // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.


    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }

    var i;
    var data = vnode.data;

    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;

    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) {
        cbs.update[i](oldVnode, vnode);
      }

      if (isDef(i = data.hook) && isDef(i = i.update)) {
        i(oldVnode, vnode);
      }
    }

    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) {
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        }
      } else if (isDef(ch)) {
        if ("development" !== 'production') {
          checkDuplicateKeys(ch);
        }

        if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }

        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
        i(oldVnode, vnode);
      }
    }
  }

  function invokeInsertHook(vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false; // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).

  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key'); // Note: this is a browser-only function so we can assume elms are DOM nodes.

  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || data && data.pre;
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    } // assert node match


    if ("development" !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false;
      }
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode, true
        /* hydrating */
        );
      }

      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }

    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }

              return false;
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;

            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }

              childNode = childNode.nextSibling;
            } // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.


            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }

              return false;
            }
          }
        }
      }

      if (isDef(data)) {
        var fullInvoke = false;

        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }

        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }

    return true;
  }

  function assertNodeMatch(node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || !isUnknownElement$$1(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3);
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) {
        invokeDestroyHook(oldVnode);
      }

      return;
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);

      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }

          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            } else if ("development" !== 'production') {
              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
            }
          } // either not server-rendered, or hydration failed.
          // create an empty node and replace it


          oldVnode = emptyNodeAt(oldVnode);
        } // replacing existing element


        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm); // create new node

        createElm(vnode, insertedVnodeQueue, // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm)); // update parent placeholder node element, recursively

        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);

          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }

            ancestor.elm = vnode.elm;

            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              } // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.


              var insert = ancestor.data.hook.insert;

              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }

            ancestor = ancestor.parent;
          }
        } // destroy old node


        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}
/*  */


var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
  var dirsWithInsert = [];
  var dirsWithPostpatch = [];
  var key, oldDir, dir;

  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];

    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);

      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);

      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };

    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1(dirs, vm) {
  var res = Object.create(null);

  if (!dirs) {
    // $flow-disable-line
    return res;
  }

  var i, dir;

  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];

    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }

    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  } // $flow-disable-line


  return res;
}

function getRawDirName(dir) {
  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
}

function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];

  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
    }
  }
}

var baseModules = [ref, directives];
/*  */

function updateAttrs(oldVnode, vnode) {
  var opts = vnode.componentOptions;

  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }

  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }

  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];

    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  } // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max

  /* istanbul ignore if */


  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }

  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr(el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr(el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.

    /* istanbul ignore if */
    if (isIE && !isIE9 && el.tagName === 'TEXTAREA' && key === 'placeholder' && value !== '' && !el.__ieph) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };

      el.addEventListener('input', blocker); // $flow-disable-line

      el.__ieph = true;
      /* IE placeholder patched */
    }

    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};
/*  */

function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }

  var cls = genClassForVnode(vnode); // handle transition classes

  var transitionClass = el._transitionClasses;

  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  } // set the class


  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};
/*  */

/*  */

/*  */

/*  */
// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.

var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';
/*  */
// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.

function normalizeEvents(on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  } // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4

  /* istanbul ignore if */


  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1(event, handler, capture) {
  var _target = target$1; // save current target element in closure

  return function onceHandler() {
    var res = handler.apply(null, arguments);

    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  };
} // #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.


var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1(name, handler, capture, passive) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;

    handler = original._wrapper = function (e) {
      if ( // no bubbling, should always fire.
      // this is just a safety net in case event.timeStamp is unreliable in
      // certain weird environments...
      e.target === e.currentTarget || // event is fired after handler attachment
      e.timeStamp >= attachedTimestamp || // bail for environments that have buggy event.timeStamp implementations
      // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
      // #9681 QtWebEngine event.timeStamp is negative value
      e.timeStamp <= 0 || // #9448 bail if event is fired in another document in a multi-page
      // electron/nw.js app, since event.timeStamp will be using a different
      // starting reference
      e.target.ownerDocument !== document) {
        return original.apply(this, arguments);
      }
    };
  }

  target$1.addEventListener(name, handler, supportsPassive ? {
    capture: capture,
    passive: passive
  } : capture);
}

function remove$2(name, handler, capture, _target) {
  (_target || target$1).removeEventListener(name, handler._wrapper || handler, capture);
}

function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }

  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};
/*  */

var svgContainer;

function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }

  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key]; // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)

    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) {
        vnode.children.length = 0;
      }

      if (cur === oldProps[key]) {
        continue;
      } // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property


      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur; // avoid resetting cursor position when value is the same

      var strCur = isUndef(cur) ? '' : String(cur);

      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;

      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }

      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if ( // skip the update if old and new VDOM state is the same.
    // `value` is handled separately because the DOM value may be temporarily
    // out of sync with VDOM state due to focus, composition and modifiers.
    // This  #4521 by skipping the unnecessary `checked` update.
    cur !== oldProps[key]) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
} // check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue(elm, checkVal) {
  return !elm.composing && (elm.tagName === 'OPTION' || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
}

function isNotInFocusAndDirty(elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true; // #6157
  // work around IE bug when accessing document.activeElement in an iframe

  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {}

  return notInFocus && elm.value !== checkVal;
}

function isDirtyWithModifiers(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime

  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }

    if (modifiers.trim) {
      return value.trim() !== newVal.trim();
    }
  }

  return value !== newVal;
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};
/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
}); // merge static and dynamic style data on the same vnode

function normalizeStyleData(data) {
  var style = normalizeStyleBinding(data.style); // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it

  return data.staticStyle ? extend(data.staticStyle, style) : style;
} // normalize possible array / string values into Object


function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }

  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle);
  }

  return bindingStyle;
}
/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */


function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;

    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;

      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }

  var parentNode = vnode;

  while (parentNode = parentNode.parent) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }

  return res;
}
/*  */


var cssVarRE = /^--/;
var importantRE = /\s*!important$/;

var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);

    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];
var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);

  if (prop !== 'filter' && prop in emptyStyle) {
    return prop;
  }

  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);

  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;

    if (name in emptyStyle) {
      return name;
    }
  }
});

function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {}; // if static style exists, stylebinding already merged into it when doing normalizeStyleData

  var oldStyle = oldStaticStyle || oldStyleBinding;
  var style = normalizeStyleBinding(vnode.data.style) || {}; // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.

  vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;
  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }

  for (name in newStyle) {
    cur = newStyle[name];

    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};
/*  */

var whitespaceRE = /\s+/;
/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */

function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";

    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}
/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */


function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }

    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';

    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }

    cur = cur.trim();

    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}
/*  */


function resolveTransition(def$$1) {
  if (!def$$1) {
    return;
  }
  /* istanbul ignore else */


  if (typeof def$$1 === 'object') {
    var res = {};

    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }

    extend(res, def$$1);
    return res;
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1);
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: name + "-enter",
    enterToClass: name + "-enter-to",
    enterActiveClass: name + "-enter-active",
    leaveClass: name + "-leave",
    leaveToClass: name + "-leave-to",
    leaveActiveClass: name + "-leave-active"
  };
});
var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation'; // Transition property/event sniffing

var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';

if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }

  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
} // binding to window is necessary to make hot reload work in IE in strict mode


var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout :
/* istanbul ignore next */
function (fn) {
  return fn();
};

function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);

  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }

  removeClass(el, cls);
}

function whenTransitionEnds(el, expectedType, cb) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;

  if (!type) {
    return cb();
  }

  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;

  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };

  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };

  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el); // JSDOM may return undefined for transition properties

  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);
  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */

  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }

  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  };
}

function getTimeout(delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
} // Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors


function toMs(s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}
/*  */


function enter(vnode, toggleDisplay) {
  var el = vnode.elm; // call leave callback now

  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;

    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data)) {
    return;
  }
  /* istanbul ignore if */


  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration; // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.

  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;

  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return;
  }

  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
  var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);
  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }

      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }

    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];

      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }

      enterHook && enterHook(el, cb);
    });
  } // start enter transition


  beforeEnterHook && beforeEnterHook(el);

  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);

      if (!cb.cancelled) {
        addTransitionClass(el, toClass);

        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave(vnode, rm) {
  var el = vnode.elm; // call enter callback now

  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;

    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data) || el.nodeType !== 1) {
    return rm();
  }
  /* istanbul ignore if */


  if (isDef(el._leaveCb)) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);
  var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }

    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }

      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }

    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave() {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return;
    } // record leaving element


    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }

    beforeLeave && beforeLeave(el);

    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);

        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);

          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }

    leave && leave(el, cb);

    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
} // only used in dev mode


function checkDuration(val, name, vnode) {
  if (typeof val !== 'number') {
    warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
  } else if (isNaN(val)) {
    warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
  }
}

function isValidDuration(val) {
  return typeof val === 'number' && !isNaN(val);
}
/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */


function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }

  var invokerFns = fn.fns;

  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}

function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1(vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};
var platformModules = [attrs, klass, events, domProps, style, transition];
/*  */
// the directive module should be applied last, after all
// built-in modules have been applied.

var modules = platformModules.concat(baseModules);
var patch = createPatchFunction({
  nodeOps: nodeOps,
  modules: modules
});
/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */

if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;

    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted(el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }

      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;

      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd); // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.

        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */

        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context); // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.

      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);

      if (curOptions.some(function (o, i) {
        return !looseEqual(o, prevOptions[i]);
      })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple ? binding.value.some(function (v) {
          return hasNoMatchingOption(v, curOptions);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);

        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */

  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;

  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
    return;
  }

  var selected, option;

  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];

    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;

      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }

        return;
      }
    }
  }

  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption(value, options) {
  return options.every(function (o) {
    return !looseEqual(o, value);
  });
}

function getValue(option) {
  return '_value' in option ? option._value : option.value;
}

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) {
    return;
  }

  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}
/*  */
// recursively search for possible transition defined inside the component root


function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}

var show = {
  bind: function bind(el, ref, vnode) {
    var value = ref.value;
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;

    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },
  update: function update(el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;
    /* istanbul ignore if */

    if (!value === !oldValue) {
      return;
    }

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;

    if (transition$$1) {
      vnode.data.show = true;

      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },
  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};
var platformDirectives = {
  model: directive,
  show: show
};
/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
}; // in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered

function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;

  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}

function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options; // props

  for (var key in options.propsData) {
    data[key] = comp[key];
  } // events.
  // extract listeners and pass them directly to the transition methods


  var listeners = options._parentListeners;

  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }

  return data;
}

function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    });
  }
}

function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}

var isNotTextNode = function (c) {
  return c.tag || isAsyncPlaceholder(c);
};

var isVShowDirective = function (d) {
  return d.name === 'show';
};

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,
  render: function render(h) {
    var this$1 = this;
    var children = this.$slots.default;

    if (!children) {
      return;
    } // filter out text nodes (possible whitespaces)


    children = children.filter(isNotTextNode);
    /* istanbul ignore if */

    if (!children.length) {
      return;
    } // warn multiple elements


    if ("development" !== 'production' && children.length > 1) {
      warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
    }

    var mode = this.mode; // warn invalid mode

    if ("development" !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
      warn('invalid <transition> mode: ' + mode, this.$parent);
    }

    var rawChild = children[0]; // if this is a component root node and the component's
    // parent container node also has transition, skip.

    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    } // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive


    var child = getRealChild(rawChild);
    /* istanbul ignore if */

    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    } // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.


    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild); // mark v-show
    // so that the transition module can hand over the control to the directive

    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && // #6687 component root is a comment node
    !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data); // handle transition mode

      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }

        var delayedLeave;

        var performLeave = function () {
          delayedLeave();
        };

        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        });
      }
    }

    return rawChild;
  }
};
/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);
delete props.mode;
var TransitionGroup = {
  props: props,
  beforeMount: function beforeMount() {
    var this$1 = this;
    var update = this._update;

    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1); // force removing pass

      this$1.__patch__(this$1._vnode, this$1.kept, false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
      );

      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },
  render: function render(h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];

      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c;
          (c.data || (c.data = {})).transition = transitionData;
        } else if ("development" !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? opts.Ctor.options.name || opts.tag || '' : c.tag;
          warn("<transition-group> children must be keyed: <" + name + ">");
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];

      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();

        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }

      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children);
  },
  updated: function updated() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || 'v') + '-move';

    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    } // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.


    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation); // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line

    this._reflow = document.body.offsetHeight;
    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (e && e.target !== el) {
            return;
          }

          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },
  methods: {
    hasMove: function hasMove(el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false;
      }
      /* istanbul ignore if */


      if (this._hasMove) {
        return this._hasMove;
      } // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.


      var clone = el.cloneNode();

      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) {
          removeClass(clone, cls);
        });
      }

      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};

function callPendingCbs(c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */


  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;

  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};
/*  */
// install platform specific utils

Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement; // install platform runtime directives & components

extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents); // install platform patch function

Vue.prototype.__patch__ = inBrowser ? patch : noop; // public mount method

Vue.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
}; // devtools global hook

/* istanbul ignore next */


if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if ("development" !== 'production' && "development" !== 'test') {
        console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
      }
    }

    if ("development" !== 'production' && "development" !== 'test' && config.productionTip !== false && typeof console !== 'undefined') {
      console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
    }
  }, 0);
}
/*  */


var _default = Vue;
exports.default = _default;
},{}],"node_modules/vuex/dist/vuex.esm.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLogger = createLogger;
exports.install = install;
exports.mapState = exports.mapMutations = exports.mapGetters = exports.mapActions = exports.createNamespacedHelpers = exports.Store = exports.default = void 0;

/*!
 * vuex v3.6.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin(Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({
      beforeCreate: vuexInit
    });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;

    Vue.prototype._init = function (options) {
      if (options === void 0) options = {};
      options.init = options.init ? [vuexInit].concat(options.init) : vuexInit;

      _init.call(this, options);
    };
  }
  /**
   * Vuex init hook, injected into each instances init hooks list.
   */


  function vuexInit() {
    var options = this.$options; // store injection

    if (options.store) {
      this.$store = typeof options.store === 'function' ? options.store() : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin(store) {
  if (!devtoolHook) {
    return;
  }

  store._devtoolHook = devtoolHook;
  devtoolHook.emit('vuex:init', store);
  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });
  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, {
    prepend: true
  });
  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, {
    prepend: true
  });
}
/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */


function find(list, f) {
  return list.filter(f)[0];
}
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


function deepCopy(obj, cache) {
  if (cache === void 0) cache = []; // just return if obj is immutable value

  if (obj === null || typeof obj !== 'object') {
    return obj;
  } // if obj is hit, it is in circular structure


  var hit = find(cache, function (c) {
    return c.original === obj;
  });

  if (hit) {
    return hit.copy;
  }

  var copy = Array.isArray(obj) ? [] : {}; // put the copy into cache at first
  // because we want to refer it in recursive deepCopy

  cache.push({
    original: obj,
    copy: copy
  });
  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });
  return copy;
}
/**
 * forEach for object
 */


function forEachValue(obj, fn) {
  Object.keys(obj).forEach(function (key) {
    return fn(obj[key], key);
  });
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

function isPromise(val) {
  return val && typeof val.then === 'function';
}

function assert(condition, msg) {
  if (!condition) {
    throw new Error("[vuex] " + msg);
  }
}

function partial(fn, arg) {
  return function () {
    return fn(arg);
  };
} // Base data struct for store's module, package with some attribute and method


var Module = function Module(rawModule, runtime) {
  this.runtime = runtime; // Store some children item

  this._children = Object.create(null); // Store the origin module object which passed by programmer

  this._rawModule = rawModule;
  var rawState = rawModule.state; // Store the origin module's state

  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = {
  namespaced: {
    configurable: true
  }
};

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced;
};

Module.prototype.addChild = function addChild(key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild(key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild(key) {
  return this._children[key];
};

Module.prototype.hasChild = function hasChild(key) {
  return key in this._children;
};

Module.prototype.update = function update(rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;

  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }

  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }

  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild(fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter(fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction(fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation(fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties(Module.prototype, prototypeAccessors);

var ModuleCollection = function ModuleCollection(rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get(path) {
  return path.reduce(function (module, key) {
    return module.getChild(key);
  }, this.root);
};

ModuleCollection.prototype.getNamespace = function getNamespace(path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '');
  }, '');
};

ModuleCollection.prototype.update = function update$1(rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
  var this$1 = this;
  if (runtime === void 0) runtime = true;

  if ("development" !== 'production') {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);

  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  } // register nested modules


  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister(path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ("development" !== 'production') {
      console.warn("[vuex] trying to unregister module '" + key + "', which is " + "not registered");
    }

    return;
  }

  if (!child.runtime) {
    return;
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered(path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (parent) {
    return parent.hasChild(key);
  }

  return false;
};

function update(path, targetModule, newModule) {
  if ("development" !== 'production') {
    assertRawModule(path, newModule);
  } // update target module


  targetModule.update(newModule); // update nested modules

  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ("development" !== 'production') {
          console.warn("[vuex] trying to add a new module '" + key + "' on hot reloading, " + 'manual reload is needed');
        }

        return;
      }

      update(path.concat(key), targetModule.getChild(key), newModule.modules[key]);
    }
  }
}

var functionAssert = {
  assert: function (value) {
    return typeof value === 'function';
  },
  expected: 'function'
};
var objectAssert = {
  assert: function (value) {
    return typeof value === 'function' || typeof value === 'object' && typeof value.handler === 'function';
  },
  expected: 'function or object with "handler" function'
};
var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule(path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) {
      return;
    }

    var assertOptions = assertTypes[key];
    forEachValue(rawModule[key], function (value, type) {
      assert(assertOptions.assert(value), makeAssertionMessage(path, key, type, value, assertOptions.expected));
    });
  });
}

function makeAssertionMessage(path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";

  if (path.length > 0) {
    buf += " in module \"" + path.join('.') + "\"";
  }

  buf += " is " + JSON.stringify(value) + ".";
  return buf;
}

var Vue; // bind on install

var Store = function Store(options) {
  var this$1 = this;
  if (options === void 0) options = {}; // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731

  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ("development" !== 'production') {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins;
  if (plugins === void 0) plugins = [];
  var strict = options.strict;
  if (strict === void 0) strict = false; // store internal state

  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null); // bind commit and dispatch to self

  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;

  this.dispatch = function boundDispatch(type, payload) {
    return dispatch.call(store, type, payload);
  };

  this.commit = function boundCommit(type, payload, options) {
    return commit.call(store, type, payload, options);
  }; // strict mode


  this.strict = strict;
  var state = this._modules.root.state; // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters

  installModule(this, state, [], this._modules.root); // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)

  resetStoreVM(this, state); // apply plugins

  plugins.forEach(function (plugin) {
    return plugin(this$1);
  });
  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;

  if (useDevtools) {
    devtoolPlugin(this);
  }
};

exports.Store = Store;
var prototypeAccessors$1 = {
  state: {
    configurable: true
  }
};

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state;
};

prototypeAccessors$1.state.set = function (v) {
  if ("development" !== 'production') {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit(_type, _payload, _options) {
  var this$1 = this; // check object-style commit

  var ref = unifyObjectStyle(_type, _payload, _options);
  var type = ref.type;
  var payload = ref.payload;
  var options = ref.options;
  var mutation = {
    type: type,
    payload: payload
  };
  var entry = this._mutations[type];

  if (!entry) {
    if ("development" !== 'production') {
      console.error("[vuex] unknown mutation type: " + type);
    }

    return;
  }

  this._withCommit(function () {
    entry.forEach(function commitIterator(handler) {
      handler(payload);
    });
  });

  this._subscribers.slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
  .forEach(function (sub) {
    return sub(mutation, this$1.state);
  });

  if ("development" !== 'production' && options && options.silent) {
    console.warn("[vuex] mutation type: " + type + ". Silent option has been removed. " + 'Use the filter functionality in the vue-devtools');
  }
};

Store.prototype.dispatch = function dispatch(_type, _payload) {
  var this$1 = this; // check object-style dispatch

  var ref = unifyObjectStyle(_type, _payload);
  var type = ref.type;
  var payload = ref.payload;
  var action = {
    type: type,
    payload: payload
  };
  var entry = this._actions[type];

  if (!entry) {
    if ("development" !== 'production') {
      console.error("[vuex] unknown action type: " + type);
    }

    return;
  }

  try {
    this._actionSubscribers.slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .filter(function (sub) {
      return sub.before;
    }).forEach(function (sub) {
      return sub.before(action, this$1.state);
    });
  } catch (e) {
    if ("development" !== 'production') {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1 ? Promise.all(entry.map(function (handler) {
    return handler(payload);
  })) : entry[0](payload);
  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers.filter(function (sub) {
          return sub.after;
        }).forEach(function (sub) {
          return sub.after(action, this$1.state);
        });
      } catch (e) {
        if ("development" !== 'production') {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }

      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers.filter(function (sub) {
          return sub.error;
        }).forEach(function (sub) {
          return sub.error(action, this$1.state, error);
        });
      } catch (e) {
        if ("development" !== 'production') {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }

      reject(error);
    });
  });
};

Store.prototype.subscribe = function subscribe(fn, options) {
  return genericSubscribe(fn, this._subscribers, options);
};

Store.prototype.subscribeAction = function subscribeAction(fn, options) {
  var subs = typeof fn === 'function' ? {
    before: fn
  } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options);
};

Store.prototype.watch = function watch(getter, cb, options) {
  var this$1 = this;

  if ("development" !== 'production') {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }

  return this._watcherVM.$watch(function () {
    return getter(this$1.state, this$1.getters);
  }, cb, options);
};

Store.prototype.replaceState = function replaceState(state) {
  var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule(path, rawModule, options) {
  if (options === void 0) options = {};

  if (typeof path === 'string') {
    path = [path];
  }

  if ("development" !== 'production') {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);

  installModule(this, this.state, path, this._modules.get(path), options.preserveState); // reset store to update getters...

  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule(path) {
  var this$1 = this;

  if (typeof path === 'string') {
    path = [path];
  }

  if ("development" !== 'production') {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);

  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });

  resetStore(this);
};

Store.prototype.hasModule = function hasModule(path) {
  if (typeof path === 'string') {
    path = [path];
  }

  if ("development" !== 'production') {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path);
};

Store.prototype.hotUpdate = function hotUpdate(newOptions) {
  this._modules.update(newOptions);

  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit(fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties(Store.prototype, prototypeAccessors$1);

function genericSubscribe(fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend ? subs.unshift(fn) : subs.push(fn);
  }

  return function () {
    var i = subs.indexOf(fn);

    if (i > -1) {
      subs.splice(i, 1);
    }
  };
}

function resetStore(store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state; // init all modules

  installModule(store, state, [], store._modules.root, true); // reset vm

  resetStoreVM(store, state, hot);
}

function resetStoreVM(store, state, hot) {
  var oldVm = store._vm; // bind store public getters

  store.getters = {}; // reset local getters cache

  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () {
        return store._vm[key];
      },
      enumerable: true // for local getters

    });
  }); // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins

  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent; // enable strict mode for new vm

  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }

    Vue.nextTick(function () {
      return oldVm.$destroy();
    });
  }
}

function installModule(store, rootState, path, module, hot) {
  var isRoot = !path.length;

  var namespace = store._modules.getNamespace(path); // register in namespace map


  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && "development" !== 'production') {
      console.error("[vuex] duplicate namespace " + namespace + " for the namespaced module " + path.join('/'));
    }

    store._modulesNamespaceMap[namespace] = module;
  } // set state


  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];

    store._withCommit(function () {
      if ("development" !== 'production') {
        if (moduleName in parentState) {
          console.warn("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + path.join('.') + "\"");
        }
      }

      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);
  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });
  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });
  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });
  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}
/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */


function makeLocalContext(store, namespace, path) {
  var noNamespace = namespace === '';
  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;

        if ("development" !== 'production' && !store._actions[type]) {
          console.error("[vuex] unknown local action type: " + args.type + ", global type: " + type);
          return;
        }
      }

      return store.dispatch(type, payload);
    },
    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;

        if ("development" !== 'production' && !store._mutations[type]) {
          console.error("[vuex] unknown local mutation type: " + args.type + ", global type: " + type);
          return;
        }
      }

      store.commit(type, payload, options);
    }
  }; // getters and state object must be gotten lazily
  // because they will be changed by vm update

  Object.defineProperties(local, {
    getters: {
      get: noNamespace ? function () {
        return store.getters;
      } : function () {
        return makeLocalGetters(store, namespace);
      }
    },
    state: {
      get: function () {
        return getNestedState(store.state, path);
      }
    }
  });
  return local;
}

function makeLocalGetters(store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) {
        return;
      } // extract local getter type


      var localType = type.slice(splitPos); // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.

      Object.defineProperty(gettersProxy, localType, {
        get: function () {
          return store.getters[type];
        },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace];
}

function registerMutation(store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler(payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction(store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler(payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);

    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }

    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);

        throw err;
      });
    } else {
      return res;
    }
  });
}

function registerGetter(store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ("development" !== 'production') {
      console.error("[vuex] duplicate getter key: " + type);
    }

    return;
  }

  store._wrappedGetters[type] = function wrappedGetter(store) {
    return rawGetter(local.state, // local state
    local.getters, // local getters
    store.state, // root state
    store.getters // root getters
    );
  };
}

function enableStrictMode(store) {
  store._vm.$watch(function () {
    return this._data.$$state;
  }, function () {
    if ("development" !== 'production') {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, {
    deep: true,
    sync: true
  });
}

function getNestedState(state, path) {
  return path.reduce(function (state, key) {
    return state[key];
  }, state);
}

function unifyObjectStyle(type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ("development" !== 'production') {
    assert(typeof type === 'string', "expects string as the type, but found " + typeof type + ".");
  }

  return {
    type: type,
    payload: payload,
    options: options
  };
}

function install(_Vue) {
  if (Vue && _Vue === Vue) {
    if ("development" !== 'production') {
      console.error('[vuex] already installed. Vue.use(Vuex) should be called only once.');
    }

    return;
  }

  Vue = _Vue;
  applyMixin(Vue);
}
/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */


var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};

  if ("development" !== 'production' && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }

  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState() {
      var state = this.$store.state;
      var getters = this.$store.getters;

      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);

        if (!module) {
          return;
        }

        state = module.context.state;
        getters = module.context.getters;
      }

      return typeof val === 'function' ? val.call(this, state, getters) : state[val];
    }; // mark vuex getter for devtools


    res[key].vuex = true;
  });
  return res;
});
/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */

exports.mapState = mapState;
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};

  if ("development" !== 'production' && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }

  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation() {
      var args = [],
          len = arguments.length;

      while (len--) args[len] = arguments[len]; // Get the commit method from store


      var commit = this.$store.commit;

      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);

        if (!module) {
          return;
        }

        commit = module.context.commit;
      }

      return typeof val === 'function' ? val.apply(this, [commit].concat(args)) : commit.apply(this.$store, [val].concat(args));
    };
  });
  return res;
});
/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */

exports.mapMutations = mapMutations;
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};

  if ("development" !== 'production' && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }

  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val; // The namespace has been mutated by normalizeNamespace

    val = namespace + val;

    res[key] = function mappedGetter() {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return;
      }

      if ("development" !== 'production' && !(val in this.$store.getters)) {
        console.error("[vuex] unknown getter: " + val);
        return;
      }

      return this.$store.getters[val];
    }; // mark vuex getter for devtools


    res[key].vuex = true;
  });
  return res;
});
/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */

exports.mapGetters = mapGetters;
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};

  if ("development" !== 'production' && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }

  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction() {
      var args = [],
          len = arguments.length;

      while (len--) args[len] = arguments[len]; // get dispatch function from store


      var dispatch = this.$store.dispatch;

      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);

        if (!module) {
          return;
        }

        dispatch = module.context.dispatch;
      }

      return typeof val === 'function' ? val.apply(this, [dispatch].concat(args)) : dispatch.apply(this.$store, [val].concat(args));
    };
  });
  return res;
});
/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */

exports.mapActions = mapActions;

var createNamespacedHelpers = function (namespace) {
  return {
    mapState: mapState.bind(null, namespace),
    mapGetters: mapGetters.bind(null, namespace),
    mapMutations: mapMutations.bind(null, namespace),
    mapActions: mapActions.bind(null, namespace)
  };
};
/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */


exports.createNamespacedHelpers = createNamespacedHelpers;

function normalizeMap(map) {
  if (!isValidMap(map)) {
    return [];
  }

  return Array.isArray(map) ? map.map(function (key) {
    return {
      key: key,
      val: key
    };
  }) : Object.keys(map).map(function (key) {
    return {
      key: key,
      val: map[key]
    };
  });
}
/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */


function isValidMap(map) {
  return Array.isArray(map) || isObject(map);
}
/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */


function normalizeNamespace(fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }

    return fn(namespace, map);
  };
}
/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */


function getModuleByNamespace(store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];

  if ("development" !== 'production' && !module) {
    console.error("[vuex] module namespace not found in " + helper + "(): " + namespace);
  }

  return module;
} // Credits: borrowed code from fcomb/redux-logger


function createLogger(ref) {
  if (ref === void 0) ref = {};
  var collapsed = ref.collapsed;
  if (collapsed === void 0) collapsed = true;
  var filter = ref.filter;
  if (filter === void 0) filter = function (mutation, stateBefore, stateAfter) {
    return true;
  };
  var transformer = ref.transformer;
  if (transformer === void 0) transformer = function (state) {
    return state;
  };
  var mutationTransformer = ref.mutationTransformer;
  if (mutationTransformer === void 0) mutationTransformer = function (mut) {
    return mut;
  };
  var actionFilter = ref.actionFilter;
  if (actionFilter === void 0) actionFilter = function (action, state) {
    return true;
  };
  var actionTransformer = ref.actionTransformer;
  if (actionTransformer === void 0) actionTransformer = function (act) {
    return act;
  };
  var logMutations = ref.logMutations;
  if (logMutations === void 0) logMutations = true;
  var logActions = ref.logActions;
  if (logActions === void 0) logActions = true;
  var logger = ref.logger;
  if (logger === void 0) logger = console;
  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return;
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + mutation.type + formattedTime;
          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + action.type + formattedTime;
          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  };
}

function startMessage(logger, message, collapsed) {
  var startMessage = collapsed ? logger.groupCollapsed : logger.group; // render

  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage(logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime() {
  var time = new Date();
  return " @ " + pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3);
}

function repeat(str, times) {
  return new Array(times + 1).join(str);
}

function pad(num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num;
}

var index = {
  Store: Store,
  install: install,
  version: '3.6.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};
var _default = index;
exports.default = _default;
},{}],"src/exceptions/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  FileNameExist: '35001'
};
exports.default = _default;
},{}],"src/store/modules/exceptions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("/src/exceptions/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = function state() {
  var codes = {};
  Object.keys(_index.default).forEach(function (key) {
    codes[_index.default[key]] = null;
  });
  return {
    codes: codes
  };
};

var getters = {};
var mutations = {
  setException: function setException(state, _ref) {
    var code = _ref.code,
        value = _ref.value;
    state.codes[code] = value;
  }
};
var actions = {
  throw: function _throw(context, _ref2) {
    var code = _ref2.code,
        exception = _ref2.exception;
    context.commit('setException', {
      code: code,
      value: exception
    });
  },
  close: function close(context, code) {
    context.commit('setException', {
      code: code,
      value: null
    });
  }
};
var _default = {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
};
exports.default = _default;
},{"/src/exceptions/index":"src/exceptions/index.js"}],"src/Modals/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  ContextMenu: '35001',
  Workspace: '35002'
};
exports.default = _default;
},{}],"src/store/modules/modals.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("/src/Modals/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = function state() {
  var modals = {};
  Object.keys(_index.default).forEach(function (key) {
    modals[_index.default[key]] = null;
  });
  return {
    modals: modals
  };
};

var getters = {};
var mutations = {
  setModal: function setModal(state, _ref) {
    var modal = _ref.modal,
        value = _ref.value;
    state.modals[modal] = value;
  }
};
var actions = {
  open: function open(context, _ref2) {
    var modal = _ref2.modal,
        value = _ref2.value;
    context.commit('setModal', {
      modal: modal,
      value: value
    });
  },
  close: function close(context, modal) {
    context.commit('setModal', {
      modal: modal,
      value: null
    });
  }
};
var _default = {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
};
exports.default = _default;
},{"/src/Modals/index":"src/Modals/index.js"}],"node_modules/store/src/util.js":[function(require,module,exports) {
var global = arguments[3];
var assign = make_assign()
var create = make_create()
var trim = make_trim()
var Global = (typeof window !== 'undefined' ? window : global)

module.exports = {
	assign: assign,
	create: create,
	trim: trim,
	bind: bind,
	slice: slice,
	each: each,
	map: map,
	pluck: pluck,
	isList: isList,
	isFunction: isFunction,
	isObject: isObject,
	Global: Global
}

function make_assign() {
	if (Object.assign) {
		return Object.assign
	} else {
		return function shimAssign(obj, props1, props2, etc) {
			for (var i = 1; i < arguments.length; i++) {
				each(Object(arguments[i]), function(val, key) {
					obj[key] = val
				})
			}			
			return obj
		}
	}
}

function make_create() {
	if (Object.create) {
		return function create(obj, assignProps1, assignProps2, etc) {
			var assignArgsList = slice(arguments, 1)
			return assign.apply(this, [Object.create(obj)].concat(assignArgsList))
		}
	} else {
		function F() {} // eslint-disable-line no-inner-declarations
		return function create(obj, assignProps1, assignProps2, etc) {
			var assignArgsList = slice(arguments, 1)
			F.prototype = obj
			return assign.apply(this, [new F()].concat(assignArgsList))
		}
	}
}

function make_trim() {
	if (String.prototype.trim) {
		return function trim(str) {
			return String.prototype.trim.call(str)
		}
	} else {
		return function trim(str) {
			return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
		}
	}
}

function bind(obj, fn) {
	return function() {
		return fn.apply(obj, Array.prototype.slice.call(arguments, 0))
	}
}

function slice(arr, index) {
	return Array.prototype.slice.call(arr, index || 0)
}

function each(obj, fn) {
	pluck(obj, function(val, key) {
		fn(val, key)
		return false
	})
}

function map(obj, fn) {
	var res = (isList(obj) ? [] : {})
	pluck(obj, function(v, k) {
		res[k] = fn(v, k)
		return false
	})
	return res
}

function pluck(obj, fn) {
	if (isList(obj)) {
		for (var i=0; i<obj.length; i++) {
			if (fn(obj[i], i)) {
				return obj[i]
			}
		}
	} else {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (fn(obj[key], key)) {
					return obj[key]
				}
			}
		}
	}
}

function isList(val) {
	return (val != null && typeof val != 'function' && typeof val.length == 'number')
}

function isFunction(val) {
	return val && {}.toString.call(val) === '[object Function]'
}

function isObject(val) {
	return val && {}.toString.call(val) === '[object Object]'
}

},{}],"node_modules/store/src/store-engine.js":[function(require,module,exports) {
var util = require('./util')
var slice = util.slice
var pluck = util.pluck
var each = util.each
var bind = util.bind
var create = util.create
var isList = util.isList
var isFunction = util.isFunction
var isObject = util.isObject

module.exports = {
	createStore: createStore
}

var storeAPI = {
	version: '2.0.12',
	enabled: false,
	
	// get returns the value of the given key. If that value
	// is undefined, it returns optionalDefaultValue instead.
	get: function(key, optionalDefaultValue) {
		var data = this.storage.read(this._namespacePrefix + key)
		return this._deserialize(data, optionalDefaultValue)
	},

	// set will store the given value at key and returns value.
	// Calling set with value === undefined is equivalent to calling remove.
	set: function(key, value) {
		if (value === undefined) {
			return this.remove(key)
		}
		this.storage.write(this._namespacePrefix + key, this._serialize(value))
		return value
	},

	// remove deletes the key and value stored at the given key.
	remove: function(key) {
		this.storage.remove(this._namespacePrefix + key)
	},

	// each will call the given callback once for each key-value pair
	// in this store.
	each: function(callback) {
		var self = this
		this.storage.each(function(val, namespacedKey) {
			callback.call(self, self._deserialize(val), (namespacedKey || '').replace(self._namespaceRegexp, ''))
		})
	},

	// clearAll will remove all the stored key-value pairs in this store.
	clearAll: function() {
		this.storage.clearAll()
	},

	// additional functionality that can't live in plugins
	// ---------------------------------------------------

	// hasNamespace returns true if this store instance has the given namespace.
	hasNamespace: function(namespace) {
		return (this._namespacePrefix == '__storejs_'+namespace+'_')
	},

	// createStore creates a store.js instance with the first
	// functioning storage in the list of storage candidates,
	// and applies the the given mixins to the instance.
	createStore: function() {
		return createStore.apply(this, arguments)
	},
	
	addPlugin: function(plugin) {
		this._addPlugin(plugin)
	},
	
	namespace: function(namespace) {
		return createStore(this.storage, this.plugins, namespace)
	}
}

function _warn() {
	var _console = (typeof console == 'undefined' ? null : console)
	if (!_console) { return }
	var fn = (_console.warn ? _console.warn : _console.log)
	fn.apply(_console, arguments)
}

function createStore(storages, plugins, namespace) {
	if (!namespace) {
		namespace = ''
	}
	if (storages && !isList(storages)) {
		storages = [storages]
	}
	if (plugins && !isList(plugins)) {
		plugins = [plugins]
	}

	var namespacePrefix = (namespace ? '__storejs_'+namespace+'_' : '')
	var namespaceRegexp = (namespace ? new RegExp('^'+namespacePrefix) : null)
	var legalNamespaces = /^[a-zA-Z0-9_\-]*$/ // alpha-numeric + underscore and dash
	if (!legalNamespaces.test(namespace)) {
		throw new Error('store.js namespaces can only have alphanumerics + underscores and dashes')
	}
	
	var _privateStoreProps = {
		_namespacePrefix: namespacePrefix,
		_namespaceRegexp: namespaceRegexp,

		_testStorage: function(storage) {
			try {
				var testStr = '__storejs__test__'
				storage.write(testStr, testStr)
				var ok = (storage.read(testStr) === testStr)
				storage.remove(testStr)
				return ok
			} catch(e) {
				return false
			}
		},

		_assignPluginFnProp: function(pluginFnProp, propName) {
			var oldFn = this[propName]
			this[propName] = function pluginFn() {
				var args = slice(arguments, 0)
				var self = this

				// super_fn calls the old function which was overwritten by
				// this mixin.
				function super_fn() {
					if (!oldFn) { return }
					each(arguments, function(arg, i) {
						args[i] = arg
					})
					return oldFn.apply(self, args)
				}

				// Give mixing function access to super_fn by prefixing all mixin function
				// arguments with super_fn.
				var newFnArgs = [super_fn].concat(args)

				return pluginFnProp.apply(self, newFnArgs)
			}
		},

		_serialize: function(obj) {
			return JSON.stringify(obj)
		},

		_deserialize: function(strVal, defaultVal) {
			if (!strVal) { return defaultVal }
			// It is possible that a raw string value has been previously stored
			// in a storage without using store.js, meaning it will be a raw
			// string value instead of a JSON serialized string. By defaulting
			// to the raw string value in case of a JSON parse error, we allow
			// for past stored values to be forwards-compatible with store.js
			var val = ''
			try { val = JSON.parse(strVal) }
			catch(e) { val = strVal }

			return (val !== undefined ? val : defaultVal)
		},
		
		_addStorage: function(storage) {
			if (this.enabled) { return }
			if (this._testStorage(storage)) {
				this.storage = storage
				this.enabled = true
			}
		},

		_addPlugin: function(plugin) {
			var self = this

			// If the plugin is an array, then add all plugins in the array.
			// This allows for a plugin to depend on other plugins.
			if (isList(plugin)) {
				each(plugin, function(plugin) {
					self._addPlugin(plugin)
				})
				return
			}

			// Keep track of all plugins we've seen so far, so that we
			// don't add any of them twice.
			var seenPlugin = pluck(this.plugins, function(seenPlugin) {
				return (plugin === seenPlugin)
			})
			if (seenPlugin) {
				return
			}
			this.plugins.push(plugin)

			// Check that the plugin is properly formed
			if (!isFunction(plugin)) {
				throw new Error('Plugins must be function values that return objects')
			}

			var pluginProperties = plugin.call(this)
			if (!isObject(pluginProperties)) {
				throw new Error('Plugins must return an object of function properties')
			}

			// Add the plugin function properties to this store instance.
			each(pluginProperties, function(pluginFnProp, propName) {
				if (!isFunction(pluginFnProp)) {
					throw new Error('Bad plugin property: '+propName+' from plugin '+plugin.name+'. Plugins should only return functions.')
				}
				self._assignPluginFnProp(pluginFnProp, propName)
			})
		},
		
		// Put deprecated properties in the private API, so as to not expose it to accidential
		// discovery through inspection of the store object.
		
		// Deprecated: addStorage
		addStorage: function(storage) {
			_warn('store.addStorage(storage) is deprecated. Use createStore([storages])')
			this._addStorage(storage)
		}
	}

	var store = create(_privateStoreProps, storeAPI, {
		plugins: []
	})
	store.raw = {}
	each(store, function(prop, propName) {
		if (isFunction(prop)) {
			store.raw[propName] = bind(store, prop)			
		}
	})
	each(storages, function(storage) {
		store._addStorage(storage)
	})
	each(plugins, function(plugin) {
		store._addPlugin(plugin)
	})
	return store
}

},{"./util":"node_modules/store/src/util.js"}],"node_modules/store/storages/localStorage.js":[function(require,module,exports) {
var util = require('../src/util')
var Global = util.Global

module.exports = {
	name: 'localStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll,
}

function localStorage() {
	return Global.localStorage
}

function read(key) {
	return localStorage().getItem(key)
}

function write(key, data) {
	return localStorage().setItem(key, data)
}

function each(fn) {
	for (var i = localStorage().length - 1; i >= 0; i--) {
		var key = localStorage().key(i)
		fn(read(key), key)
	}
}

function remove(key) {
	return localStorage().removeItem(key)
}

function clearAll() {
	return localStorage().clear()
}

},{"../src/util":"node_modules/store/src/util.js"}],"node_modules/store/storages/oldFF-globalStorage.js":[function(require,module,exports) {
// oldFF-globalStorage provides storage for Firefox
// versions 6 and 7, where no localStorage, etc
// is available.

var util = require('../src/util')
var Global = util.Global

module.exports = {
	name: 'oldFF-globalStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll,
}

var globalStorage = Global.globalStorage

function read(key) {
	return globalStorage[key]
}

function write(key, data) {
	globalStorage[key] = data
}

function each(fn) {
	for (var i = globalStorage.length - 1; i >= 0; i--) {
		var key = globalStorage.key(i)
		fn(globalStorage[key], key)
	}
}

function remove(key) {
	return globalStorage.removeItem(key)
}

function clearAll() {
	each(function(key, _) {
		delete globalStorage[key]
	})
}

},{"../src/util":"node_modules/store/src/util.js"}],"node_modules/store/storages/oldIE-userDataStorage.js":[function(require,module,exports) {
// oldIE-userDataStorage provides storage for Internet Explorer
// versions 6 and 7, where no localStorage, sessionStorage, etc
// is available.

var util = require('../src/util')
var Global = util.Global

module.exports = {
	name: 'oldIE-userDataStorage',
	write: write,
	read: read,
	each: each,
	remove: remove,
	clearAll: clearAll,
}

var storageName = 'storejs'
var doc = Global.document
var _withStorageEl = _makeIEStorageElFunction()
var disable = (Global.navigator ? Global.navigator.userAgent : '').match(/ (MSIE 8|MSIE 9|MSIE 10)\./) // MSIE 9.x, MSIE 10.x

function write(unfixedKey, data) {
	if (disable) { return }
	var fixedKey = fixKey(unfixedKey)
	_withStorageEl(function(storageEl) {
		storageEl.setAttribute(fixedKey, data)
		storageEl.save(storageName)
	})
}

function read(unfixedKey) {
	if (disable) { return }
	var fixedKey = fixKey(unfixedKey)
	var res = null
	_withStorageEl(function(storageEl) {
		res = storageEl.getAttribute(fixedKey)
	})
	return res
}

function each(callback) {
	_withStorageEl(function(storageEl) {
		var attributes = storageEl.XMLDocument.documentElement.attributes
		for (var i=attributes.length-1; i>=0; i--) {
			var attr = attributes[i]
			callback(storageEl.getAttribute(attr.name), attr.name)
		}
	})
}

function remove(unfixedKey) {
	var fixedKey = fixKey(unfixedKey)
	_withStorageEl(function(storageEl) {
		storageEl.removeAttribute(fixedKey)
		storageEl.save(storageName)
	})
}

function clearAll() {
	_withStorageEl(function(storageEl) {
		var attributes = storageEl.XMLDocument.documentElement.attributes
		storageEl.load(storageName)
		for (var i=attributes.length-1; i>=0; i--) {
			storageEl.removeAttribute(attributes[i].name)
		}
		storageEl.save(storageName)
	})
}

// Helpers
//////////

// In IE7, keys cannot start with a digit or contain certain chars.
// See https://github.com/marcuswestin/store.js/issues/40
// See https://github.com/marcuswestin/store.js/issues/83
var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g")
function fixKey(key) {
	return key.replace(/^\d/, '___$&').replace(forbiddenCharsRegex, '___')
}

function _makeIEStorageElFunction() {
	if (!doc || !doc.documentElement || !doc.documentElement.addBehavior) {
		return null
	}
	var scriptTag = 'script',
		storageOwner,
		storageContainer,
		storageEl

	// Since #userData storage applies only to specific paths, we need to
	// somehow link our data to a specific path.  We choose /favicon.ico
	// as a pretty safe option, since all browsers already make a request to
	// this URL anyway and being a 404 will not hurt us here.  We wrap an
	// iframe pointing to the favicon in an ActiveXObject(htmlfile) object
	// (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
	// since the iframe access rules appear to allow direct access and
	// manipulation of the document element, even for a 404 page.  This
	// document can be used instead of the current document (which would
	// have been limited to the current path) to perform #userData storage.
	try {
		/* global ActiveXObject */
		storageContainer = new ActiveXObject('htmlfile')
		storageContainer.open()
		storageContainer.write('<'+scriptTag+'>document.w=window</'+scriptTag+'><iframe src="/favicon.ico"></iframe>')
		storageContainer.close()
		storageOwner = storageContainer.w.frames[0].document
		storageEl = storageOwner.createElement('div')
	} catch(e) {
		// somehow ActiveXObject instantiation failed (perhaps some special
		// security settings or otherwse), fall back to per-path storage
		storageEl = doc.createElement('div')
		storageOwner = doc.body
	}

	return function(storeFunction) {
		var args = [].slice.call(arguments, 0)
		args.unshift(storageEl)
		// See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
		// and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
		storageOwner.appendChild(storageEl)
		storageEl.addBehavior('#default#userData')
		storageEl.load(storageName)
		storeFunction.apply(this, args)
		storageOwner.removeChild(storageEl)
		return
	}
}

},{"../src/util":"node_modules/store/src/util.js"}],"node_modules/store/storages/cookieStorage.js":[function(require,module,exports) {
// cookieStorage is useful Safari private browser mode, where localStorage
// doesn't work but cookies do. This implementation is adopted from
// https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage

var util = require('../src/util')
var Global = util.Global
var trim = util.trim

module.exports = {
	name: 'cookieStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll,
}

var doc = Global.document

function read(key) {
	if (!key || !_has(key)) { return null }
	var regexpStr = "(?:^|.*;\\s*)" +
		escape(key).replace(/[\-\.\+\*]/g, "\\$&") +
		"\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"
	return unescape(doc.cookie.replace(new RegExp(regexpStr), "$1"))
}

function each(callback) {
	var cookies = doc.cookie.split(/; ?/g)
	for (var i = cookies.length - 1; i >= 0; i--) {
		if (!trim(cookies[i])) {
			continue
		}
		var kvp = cookies[i].split('=')
		var key = unescape(kvp[0])
		var val = unescape(kvp[1])
		callback(val, key)
	}
}

function write(key, data) {
	if(!key) { return }
	doc.cookie = escape(key) + "=" + escape(data) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/"
}

function remove(key) {
	if (!key || !_has(key)) {
		return
	}
	doc.cookie = escape(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
}

function clearAll() {
	each(function(_, key) {
		remove(key)
	})
}

function _has(key) {
	return (new RegExp("(?:^|;\\s*)" + escape(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(doc.cookie)
}

},{"../src/util":"node_modules/store/src/util.js"}],"node_modules/store/storages/sessionStorage.js":[function(require,module,exports) {
var util = require('../src/util')
var Global = util.Global

module.exports = {
	name: 'sessionStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll
}

function sessionStorage() {
	return Global.sessionStorage
}

function read(key) {
	return sessionStorage().getItem(key)
}

function write(key, data) {
	return sessionStorage().setItem(key, data)
}

function each(fn) {
	for (var i = sessionStorage().length - 1; i >= 0; i--) {
		var key = sessionStorage().key(i)
		fn(read(key), key)
	}
}

function remove(key) {
	return sessionStorage().removeItem(key)
}

function clearAll() {
	return sessionStorage().clear()
}

},{"../src/util":"node_modules/store/src/util.js"}],"node_modules/store/storages/memoryStorage.js":[function(require,module,exports) {
// memoryStorage is a useful last fallback to ensure that the store
// is functions (meaning store.get(), store.set(), etc will all function).
// However, stored values will not persist when the browser navigates to
// a new page or reloads the current page.

module.exports = {
	name: 'memoryStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll,
}

var memoryStorage = {}

function read(key) {
	return memoryStorage[key]
}

function write(key, data) {
	memoryStorage[key] = data
}

function each(callback) {
	for (var key in memoryStorage) {
		if (memoryStorage.hasOwnProperty(key)) {
			callback(memoryStorage[key], key)
		}
	}
}

function remove(key) {
	delete memoryStorage[key]
}

function clearAll(key) {
	memoryStorage = {}
}

},{}],"node_modules/store/storages/all.js":[function(require,module,exports) {
module.exports = [
	// Listed in order of usage preference
	require('./localStorage'),
	require('./oldFF-globalStorage'),
	require('./oldIE-userDataStorage'),
	require('./cookieStorage'),
	require('./sessionStorage'),
	require('./memoryStorage')
]

},{"./localStorage":"node_modules/store/storages/localStorage.js","./oldFF-globalStorage":"node_modules/store/storages/oldFF-globalStorage.js","./oldIE-userDataStorage":"node_modules/store/storages/oldIE-userDataStorage.js","./cookieStorage":"node_modules/store/storages/cookieStorage.js","./sessionStorage":"node_modules/store/storages/sessionStorage.js","./memoryStorage":"node_modules/store/storages/memoryStorage.js"}],"node_modules/store/plugins/lib/json2.js":[function(require,module,exports) {
/* eslint-disable */

//  json2.js
//  2016-10-28
//  Public Domain.
//  NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
//  See http://www.JSON.org/js.html
//  This code should be minified before deployment.
//  See http://javascript.crockford.com/jsmin.html

//  USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
//  NOT CONTROL.

//  This file creates a global JSON object containing two methods: stringify
//  and parse. This file provides the ES5 JSON capability to ES3 systems.
//  If a project might run on IE8 or earlier, then this file should be included.
//  This file does nothing on ES5 systems.

//      JSON.stringify(value, replacer, space)
//          value       any JavaScript value, usually an object or array.
//          replacer    an optional parameter that determines how object
//                      values are stringified for objects. It can be a
//                      function or an array of strings.
//          space       an optional parameter that specifies the indentation
//                      of nested structures. If it is omitted, the text will
//                      be packed without extra whitespace. If it is a number,
//                      it will specify the number of spaces to indent at each
//                      level. If it is a string (such as "\t" or "&nbsp;"),
//                      it contains the characters used to indent at each level.
//          This method produces a JSON text from a JavaScript value.
//          When an object value is found, if the object contains a toJSON
//          method, its toJSON method will be called and the result will be
//          stringified. A toJSON method does not serialize: it returns the
//          value represented by the name/value pair that should be serialized,
//          or undefined if nothing should be serialized. The toJSON method
//          will be passed the key associated with the value, and this will be
//          bound to the value.

//          For example, this would serialize Dates as ISO strings.

//              Date.prototype.toJSON = function (key) {
//                  function f(n) {
//                      // Format integers to have at least two digits.
//                      return (n < 10)
//                          ? "0" + n
//                          : n;
//                  }
//                  return this.getUTCFullYear()   + "-" +
//                       f(this.getUTCMonth() + 1) + "-" +
//                       f(this.getUTCDate())      + "T" +
//                       f(this.getUTCHours())     + ":" +
//                       f(this.getUTCMinutes())   + ":" +
//                       f(this.getUTCSeconds())   + "Z";
//              };

//          You can provide an optional replacer method. It will be passed the
//          key and value of each member, with this bound to the containing
//          object. The value that is returned from your method will be
//          serialized. If your method returns undefined, then the member will
//          be excluded from the serialization.

//          If the replacer parameter is an array of strings, then it will be
//          used to select the members to be serialized. It filters the results
//          such that only members with keys listed in the replacer array are
//          stringified.

//          Values that do not have JSON representations, such as undefined or
//          functions, will not be serialized. Such values in objects will be
//          dropped; in arrays they will be replaced with null. You can use
//          a replacer function to replace those with JSON values.

//          JSON.stringify(undefined) returns undefined.

//          The optional space parameter produces a stringification of the
//          value that is filled with line breaks and indentation to make it
//          easier to read.

//          If the space parameter is a non-empty string, then that string will
//          be used for indentation. If the space parameter is a number, then
//          the indentation will be that many spaces.

//          Example:

//          text = JSON.stringify(["e", {pluribus: "unum"}]);
//          // text is '["e",{"pluribus":"unum"}]'

//          text = JSON.stringify(["e", {pluribus: "unum"}], null, "\t");
//          // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

//          text = JSON.stringify([new Date()], function (key, value) {
//              return this[key] instanceof Date
//                  ? "Date(" + this[key] + ")"
//                  : value;
//          });
//          // text is '["Date(---current time---)"]'

//      JSON.parse(text, reviver)
//          This method parses a JSON text to produce an object or array.
//          It can throw a SyntaxError exception.

//          The optional reviver parameter is a function that can filter and
//          transform the results. It receives each of the keys and values,
//          and its return value is used instead of the original value.
//          If it returns what it received, then the structure is not modified.
//          If it returns undefined then the member is deleted.

//          Example:

//          // Parse the text. Values that look like ISO date strings will
//          // be converted to Date objects.

//          myData = JSON.parse(text, function (key, value) {
//              var a;
//              if (typeof value === "string") {
//                  a =
//   /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
//                  if (a) {
//                      return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
//                          +a[5], +a[6]));
//                  }
//              }
//              return value;
//          });

//          myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
//              var d;
//              if (typeof value === "string" &&
//                      value.slice(0, 5) === "Date(" &&
//                      value.slice(-1) === ")") {
//                  d = new Date(value.slice(5, -1));
//                  if (d) {
//                      return d;
//                  }
//              }
//              return value;
//          });

//  This is a reference implementation. You are free to copy, modify, or
//  redistribute.

/*jslint
    eval, for, this
*/

/*property
    JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== "object") {
    JSON = {};
}

(function () {
    "use strict";

    var rx_one = /^[\],:{}\s]*$/;
    var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
    var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10
            ? "0" + n
            : n;
    }

    function this_value() {
        return this.valueOf();
    }

    if (typeof Date.prototype.toJSON !== "function") {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear() + "-" +
                        f(this.getUTCMonth() + 1) + "-" +
                        f(this.getUTCDate()) + "T" +
                        f(this.getUTCHours()) + ":" +
                        f(this.getUTCMinutes()) + ":" +
                        f(this.getUTCSeconds()) + "Z"
                : null;
        };

        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;
    }

    var gap;
    var indent;
    var meta;
    var rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        rx_escapable.lastIndex = 0;
        return rx_escapable.test(string)
            ? "\"" + string.replace(rx_escapable, function (a) {
                var c = meta[a];
                return typeof c === "string"
                    ? c
                    : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) + "\""
            : "\"" + string + "\"";
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i;          // The loop counter.
        var k;          // The member key.
        var v;          // The member value.
        var length;
        var mind = gap;
        var partial;
        var value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === "object" &&
                typeof value.toJSON === "function") {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === "function") {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case "string":
            return quote(value);

        case "number":

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value)
                ? String(value)
                : "null";

        case "boolean":
        case "null":

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce "null". The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is "object", we might be dealing with an object or an array or
// null.

        case "object":

// Due to a specification blunder in ECMAScript, typeof null is "object",
// so watch out for that case.

            if (!value) {
                return "null";
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === "[object Array]") {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || "null";
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? "[]"
                    : gap
                        ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
                        : "[" + partial.join(",") + "]";
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === "object") {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === "string") {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                gap
                                    ? ": "
                                    : ":"
                            ) + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                gap
                                    ? ": "
                                    : ":"
                            ) + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? "{}"
                : gap
                    ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
                    : "{" + partial.join(",") + "}";
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== "function") {
        meta = {    // table of character substitutions
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            "\"": "\\\"",
            "\\": "\\\\"
        };
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = "";
            indent = "";

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " ";
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === "string") {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== "function" &&
                    (typeof replacer !== "object" ||
                    typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify");
            }

// Make a fake root object containing our value under the key of "".
// Return the result of stringifying the value.

            return str("", {"": value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== "function") {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k;
                var v;
                var value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            rx_dangerous.lastIndex = 0;
            if (rx_dangerous.test(text)) {
                text = text.replace(rx_dangerous, function (a) {
                    return "\\u" +
                            ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with "()" and "new"
// because they can cause invocation, and "=" because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with "@" (a non-JSON character). Second, we
// replace all simple value tokens with "]" characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or "]" or
// "," or ":" or "{" or "}". If that is so, then the text is safe for eval.

            if (
                rx_one.test(
                    text
                        .replace(rx_two, "@")
                        .replace(rx_three, "]")
                        .replace(rx_four, "")
                )
            ) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The "{" operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval("(" + text + ")");

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return (typeof reviver === "function")
                    ? walk({"": j}, "")
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError("JSON.parse");
        };
    }
}());
},{}],"node_modules/store/plugins/json2.js":[function(require,module,exports) {
module.exports = json2Plugin

function json2Plugin() {
	require('./lib/json2')
	return {}
}

},{"./lib/json2":"node_modules/store/plugins/lib/json2.js"}],"node_modules/store/dist/store.legacy.js":[function(require,module,exports) {
var engine = require('../src/store-engine')

var storages = require('../storages/all')
var plugins = [require('../plugins/json2')]

module.exports = engine.createStore(storages, plugins)

},{"../src/store-engine":"node_modules/store/src/store-engine.js","../storages/all":"node_modules/store/storages/all.js","../plugins/json2":"node_modules/store/plugins/json2.js"}],"src/server/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _store = _interopRequireDefault(require("store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var makeImmutable = function makeImmutable(obj) {
  return JSON.parse(JSON.stringify(obj));
};

var generator = function generator() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var seed = 1;
  return {
    generate: function generate() {
      return prefix + Math.random().toString(36).substring(2) + new Date().getTime().toString(36).substring(2);
    }
  };
};

var pidGenerator = generator('100');
var fidGenerator = generator('200');

var getId = function getId() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var generator = arguments.length > 1 ? arguments[1] : undefined;
  return function () {
    return prefix + generator.generate();
  };
};

var getPid = getId('p', pidGenerator);
var getFid = getId('f', fidGenerator);
var buffer = {
  projects: [],
  contents: [],
  getProject: function getProject(pid) {
    var returnIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return returnIndex ? buffer.projects.findIndex(function (project) {
      return project.pid === pid;
    }) : buffer.projects.find(function (project) {
      return project.pid === pid;
    });
  },
  getContent: function getContent(cid) {
    var returnIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return returnIndex ? buffer.contents.findIndex(function (content) {
      return content.cid === cid;
    }) : buffer.contents.find(function (content) {
      return content.cid === cid;
    });
  }
};

var setup = function setup() {
  _store.default.each(function (value, key) {
    if (key.startsWith('p')) {
      buffer.projects.push(value);
    }
  });

  _store.default.each(function (value, key) {
    if (key.startsWith('f')) {
      var file = value;
      var project = buffer.getProject(file.pid);

      if (!project.files) {
        project.files = [];
      }

      project.files.push(file);
    }

    if (key.startsWith('c')) {
      var _content = value;
      buffer.contents.push(_content);
    }
  });
};

var server = {
  user: {
    get: function get(username, password) {
      return new Promise(function (resolve) {
        resolve({
          uid: '0003535',
          username: username,
          password: password
        });
      });
    }
  },
  workspace: {
    set: function set(uid, workspace) {
      var wid = 'w' + uid;
      return new Promise(function (resolve) {
        workspace = {
          pid: workspace.pid,
          fid: workspace.fid,
          openedFilesId: workspace.openedFilesId
        };

        _store.default.set(wid, workspace);

        resolve(makeImmutable(workspace));
      });
    },
    get: function get(uid) {
      var wid = 'w' + uid;
      return new Promise(function (resolve) {
        var workspace = _store.default.get(wid);

        resolve(workspace);
      }).then(function (workspace) {
        if (!workspace) {
          return {
            project: null,
            file: null,
            openedFiles: []
          };
        }

        return Promise.all([workspace.project ? server.project.get(workspace.project.pid) : Promise.resolve(null), workspace.file ? server.file.get(workspace.fid) : Promise.resolve(null)]).then(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              project = _ref2[0],
              file = _ref2[1];

          return Promise.all(workspace.openedFilesId.map(function (fid) {
            return server.file.get(pid, fid);
          })).then(function (openedFiles) {
            return makeImmutable({
              project: project,
              file: file,
              openedFiles: openedFiles
            });
          });
        });
      });
    }
  },
  project: {
    create: function create(project) {
      var pid = getPid();
      project = {
        pid: pid,
        createdTime: new Date().getTime(),
        status: {
          isDelete: '0'
        },
        name: project.name,
        desc: project.desc || '',
        avatar: project.avatar || '',
        files: project.files || []
      };
      return new Promise(function (resolve) {
        buffer.projects.push(project);

        _store.default.set(pid, project);

        resolve(makeImmutable(project));
      });
    },
    get: function get(pid) {
      if (pid == null) {
        return new Promise(function (resolve) {
          resolve(makeImmutable(buffer.projects));
        });
      }

      return Promise.resolve(makeImmutable(buffer.getProject(pid)));
    },
    remove: function remove(pid) {
      var ReturnIndex = true;
      buffer.projects.splice(buffer.getProject(pid, ReturnIndex), 1);
      return new Promise(function (resolve) {
        var project = _store.default.get(pid);

        _store.default.remove(pid);

        resolve(project);
      });
    }
  },
  file: {
    create: function create(pid, file) {
      var mid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0';
      var NotUpdate = false;
      var fid = getFid();
      var promise = file.type === 0 ? server.content.create(pid, fid, '') : Promise.resolve(null);
      return promise.then(function (content) {
        file = {
          fid: fid,
          pid: pid,
          mid: mid,
          createdTime: new Date().getTime(),
          updatedTime: '-1',
          openedTime: '-1',
          status: {
            isDelete: '0',
            isFold: '1'
          },
          name: file.name,
          ext: file.ext,
          type: file.type
        };

        if (content) {
          file.cid = content.cid;
        }

        return server.file.set(fid, file, NotUpdate);
      }).then(function (file) {
        buffer.getProject(pid).files.push(file);
        return makeImmutable(file);
      });
    },
    set: function set(fid, file) {
      var update = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return new Promise(function (resolve) {
        if (update) {
          file.updatedTime = new Date().getTime();
        }

        var files = buffer.projects;

        if (!buffer.getProject(file.pid)) {
          files.push(content);
        } else {
          files[files.findIndex(function (file) {
            return file.fid === fid;
          })] = file;
        }

        _store.default.set(fid, file);

        resolve(makeImmutable(file));
      });
    },
    get: function get(pid, fid) {
      return new Promise(function (resolve) {
        var file = buffer.getProject(pid).files.find(function (file) {
          return file.fid === fid;
        });
        resolve(makeImmutable(file));
      });
    },
    remove: function remove(pid, fid) {
      var project = buffer.getProject(pid);
      project.files.splice(project.files.findIndex(function (file) {
        return file.fid === fid;
      }), 1);
      return new Promise(function (resolve) {
        var file = _store.default.get(fid);

        file.status.isDelete = '1';

        _store.default.set(fid, file);

        resolve(file);
      });
    }
  },
  content: {
    create: function create(pid, fid, content) {
      var cid = server.content._toCid(pid, fid);

      return server.content.set(cid, content);
    },
    get: function get(cid) {
      return new Promise(function (resolve) {
        resolve(_store.default.get(cid));
      });
    },
    set: function set(cid) {
      var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      content = {
        cid: cid,
        branch: '@',
        chunk: '@',
        updatedTime: new Date().getTime(),
        content: content
      };
      return new Promise(function (resolve) {
        _store.default.set(cid, content);

        if (!buffer.getContent(cid)) {
          buffer.contents.push(content);
        } else {
          var ReturnIndex = true;
          buffer.contents[buffer.getContent(cid, ReturnIndex)] = content;
        }

        resolve(makeImmutable(content));
      });
    },
    _toCid: function _toCid(pid, fid) {
      return 'c' + pid.substring(1) + '-' + fid.substring(1);
    }
  }
};
setup();
var _default = server;
exports.default = _default;
},{"store":"node_modules/store/dist/store.legacy.js"}],"src/api/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("/src/server/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = Object.create(null);
Object.keys(_index.default).map(function (key) {
  var type = key;
  var fns = _index.default[type];
  Object.keys(fns).map(function (key) {
    if (key.startsWith('_')) {
      return;
    }

    var fnName = key + type.substring(0, 1).toUpperCase() + type.substring(1);
    api[fnName] = fns[key];
  });
});
var _default = api; // import api from '../mock/index.js'
// function getProjects(uid) {
//   return Promise.resolve(api.get('/projects'))
// }
// function getProject(pid) {
//   return Promise.resolve(api.get(`/project/${pid}`)).then(raw => {
//     const data = JSON.parse(JSON.stringify(raw))
//     const { files, tempFiles } = FileHandler.buildTree(data.files)
//     data.files = files
//     data.tempFiles = tempFiles
//     console.warn('data.tempFiles', data.tempFiles)
//     return data
//   })
// }
// function getWorkspace(uid) {
//   return Promise.resolve(api.get(`/workspace`)).then(raw => {
//     const data = JSON.parse(JSON.stringify(raw))
//     const { project } = data
//     data.fileList = project.files
//     data.currentTab = project.files.find(file => file.fid === data.currentTab)
//     data.tabs = data.tabs.map(tab => {
//       return project.files.find(file => file.fid === tab)
//     })
//     const { files, tempFiles } = FileHandler.buildTree(project.files)
//     project.files = files
//     project.tempFiles = tempFiles
//     return data
//   })
// }
// function getFile(pid, fid) {
//   return Promise.resolve(api.get(`/project/${pid}/file/${fid}`))
// }
// function setProjects(uid) {
// }
// export {
//   getProjects,
//   getProject,
//   getWorkspace,
//   getFile,
// }
// const FileHandler = {
//   /**
//    * 可能存在当前 file 的 parent 尚未存储在 fileMap 中的情况,
//    * 所以把这个动作记录下来,
//    * 当以后的遍历中检测到当前 file.fid 有 buffer 的时候再执行存储动作
//    * @param {Array<File>} fileList
//    */
//   buildTree(fileList) {
//     const files = []
//     const tempFiles = []
//     /* 1 */
//     const buffer = Object.create(null)
//     const fileMap = Object.create(null)
//     for (let i = 0; i < fileList.length; i++) {
//       const file = fileList[i]
//       fileMap[file.fid] = file
//       if (buffer[file.fid]) {
//         file.children = buffer[file.fid]
//         file.children.forEach(child => {
//           child.parent = file
//         })
//         buffer[file.fid] = null
//       }
//       const parentFid = file.parent
//       if (parentFid === '0') {
//         file.parent = null
//         files.push(file)
//         continue
//       }
//       if (parentFid === '-1') {
//         file.parent = null
//         tempFiles.push(file)
//         continue
//       }
//       const parentFile = fileMap[parentFid]
//       if (!parentFile) {
//         let bufferOfFid = buffer[parentFid]
//         if (!bufferOfFid) {
//           bufferOfFid = buffer[parentFid] = []
//         }
//         bufferOfFid.push(file)
//         continue
//       }
//       if (!parentFile.children) {
//         parentFile.children = []
//       }
//       parentFile.children.push(file)
//       file.parent = parentFile
//     }
//     return {
//       files,
//       tempFiles,
//     }
//   }
// }

exports.default = _default;
},{"/src/server/index":"src/server/index.js"}],"src/store/modules/projects.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("/src/api/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = function state() {
  return {
    projects: []
  };
};

var getters = {};
var mutations = {
  setProjects: function setProjects(state, projects) {
    state.projects = projects.slice();
  },
  addProject: function addProject(state, project) {
    state.projects.push(project);
  }
};
var actions = {
  requestProjects: function requestProjects(context) {
    return _index.default.getProject().then(function (data) {
      context.commit('setProjects', data);
      return data;
    });
  },
  createProject: function createProject(context, project) {
    return _index.default.createProject(project).then(function (project) {
      context.commit('addProject', project);
      return project;
    });
  },
  removeProject: function removeProject(context, pid) {
    return _index.default.removeProject(pid);
  }
};
var _default = {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
};
exports.default = _default;
},{"/src/api/index":"src/api/index.js"}],"src/store/modules/user.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("/src/api/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = function state() {
  return {
    user: null
  };
};

var getters = {};
var mutations = {
  setUser: function setUser(state, user) {
    state.user = user;
  }
};
var actions = {
  loginAsync: function loginAsync(context, _ref) {
    var username = _ref.username,
        password = _ref.password;
    return _index.default.getUser(username, password).then(function (user) {
      context.commit('setUser', user);
    });
  }
};
var _default = {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
};
exports.default = _default;
},{"/src/api/index":"src/api/index.js"}],"src/store/modules/workspace.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("/src/api/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var state = function state() {
  return {
    project: null,
    file: null,
    openedFiles: [],
    placeholderFile: null
  };
};

var getters = {
  openedFilesOrderDesc: function openedFilesOrderDesc(state) {
    return state.openedFiles.slice().sort(function (a, b) {
      b.openedTime - a.openedTime;
    });
  },
  lastOpenedFile: function lastOpenedFile(state, getters) {
    var files = getters.openedFilesOrderDesc;
    return files[files.length - 1] || null;
  }
};
var mutations = {
  setWorkspace: function setWorkspace(state, workspace) {
    if (!workspace) {
      return;
    }

    state.project = workspace.project;
    state.file = workspace.file;
    state.openedFiles = workspace.openedFiles;
  },
  setProject: function setProject(state, project) {
    state.project = project;
  },
  setFile: function setFile(state, file) {
    state.file = file;
  },
  setOpenedFiles: function setOpenedFiles(state, openedFiles) {
    state.setOpenedFiles = openedFiles;
  },
  addOpenedFile: function addOpenedFile(state, file) {
    var toIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;
    var isExist = state.openedFiles.find(function (openedFile) {
      return openedFile.fid === file.fid;
    });

    if (isExist) {
      return;
    }

    state.openedFiles.splice(toIndex, 0, file);
  },
  removeOpenedFile: function removeOpenedFile(state, file) {
    var index = state.openedFiles.findIndex(function (openedFile) {
      return openedFile.fid === file.fid;
    });

    if (index === -1) {
      return;
    }

    state.openedFiles.splice(index, 1);
  },
  addFile: function addFile(state, file) {
    var files = state.project.files;
    files.push(file);
  },
  removeFile: function removeFile(state, file) {
    var files = state.project.files;
    files.find(function (f) {
      return f.fid === file.fid;
    }).status.isDelete = '1';
  },
  foldFile: function foldFile(state, file) {
    file.status.isFold = '1';
  },
  unfoldFile: function unfoldFile(state, file) {
    file.status.isFold = '0';
  },
  setPlaceholderFile: function setPlaceholderFile(state, file) {
    state.placeholderFile = file;
  },
  removePlaceholderFile: function removePlaceholderFile(state) {
    var file = state.placeholderFile;
    var files = state.project.files;
    files.splice(files.findIndex(function (f) {
      return f.fid === file.fid;
    }), 1);
  },
  setPlaceholderFileInfo: function setPlaceholderFileInfo(state, file) {
    state.placeholderFile = _objectSpread({}, state.placeholderFile, {}, file);
  }
};
var actions = {
  requestWorkspace: function requestWorkspace(context, uid) {
    return _index.default.getWorkspace(uid);
  },
  requestContent: function requestContent(context, cid) {
    return _index.default.getContent(cid);
  },
  createWorkspaceAsync: function createWorkspaceAsync(context, pid) {
    return _index.default.getProject(pid).then(function (project) {
      return context.dispatch('initWorkspace', {
        project: project
      });
    });
  },
  createFileAsync: function createFileAsync(context, file) {
    return _index.default.createFile(file.pid, file, file.mid).then(function (file) {
      context.commit('addFile', file);
    });
  },
  removeFileAsync: function removeFileAsync(context, file) {
    return _index.default.removeFile(file.pid, file.fid).then(function () {
      context.commit('removeOpenedFile', file);
      context.commit('removeFile', file);
    });
  },
  saveWorkspace: function saveWorkspace(_ref, uid) {
    var state = _ref.state;
    return _index.default.setWorkspace(uid, {
      pid: state.project ? state.project.pid : '-1',
      fid: state.file ? state.file.fid : '-1',
      openedFilesId: state.openedFiles ? state.openedFiles.map(function (file) {
        return file.fid;
      }) : []
    });
  },
  initWorkspace: function initWorkspace(context, workspace) {
    workspace = _objectSpread({
      project: null,
      file: null,
      openedFiles: []
    }, workspace);
    context.commit('setWorkspace', workspace);
  },
  openFile: function openFile(context, file) {
    var NotUpdate = false;
    var openedTime = new Date().getTime();
    file = _objectSpread({}, file, {
      openedTime: openedTime
    });

    _index.default.setFile(file.fid, file, NotUpdate);

    context.commit('setFile', file);
    context.commit('addOpenedFile', file);
  },
  closeFile: function closeFile(context, file) {
    context.commit('removeOpenedFile', file);

    if (file.fid === context.state.file.fid) {
      context.commit('setFile', context.getters.lastOpenedFile);
    }
  },
  getPlaceholderFile: function getPlaceholderFile(context) {
    return context.state.placeholderFile;
  },
  createPlaceholderFile: function createPlaceholderFile(context, file) {
    file = _objectSpread({
      fid: '-1',
      name: '',
      ext: ''
    }, file);
    context.commit('addFile', file);
    context.commit('setPlaceholderFile', file);
  },
  removePlaceholderFile: function removePlaceholderFile(context) {
    context.commit('removePlaceholderFile');
    context.commit('setPlaceholderFile', null);
  },
  setPlaceholderFileInfo: function setPlaceholderFileInfo(context, file) {
    context.commit('setPlaceholderFileInfo', file);
  },
  transformPlaceholderFileToFile: function transformPlaceholderFileToFile(context) {
    var placeholderFile = context.state.placeholderFile;

    if (placeholderFile.name.length === 0) {
      context.dispatch('removePlaceholderFile');
      return;
    }

    return _index.default.createFile(placeholderFile.pid, placeholderFile, placeholderFile.mid).then(function (file) {
      context.dispatch('removePlaceholderFile');
      context.commit('addFile', file);
    });
  },
  getContent: function getContent(context, file) {
    return _index.default.getContent(file.cid);
  },
  saveContent: function saveContent(context, file) {
    return _index.default.setContent(file.cid, file.content);
  },
  toggleFold: function toggleFold(context, file) {
    file.status.isFold === '1' ? context.commit('unfoldFile', file) : context.commit('foldFile', file);
  },
  unfoldFile: function unfoldFile(context, file) {
    context.commit('unfoldFile', file);
  },
  foldFile: function foldFile(context, file) {
    context.commit('foldFile', file);
  }
};
var _default = {
  namespaced: true,
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
};
exports.default = _default;
},{"/src/api/index":"src/api/index.js"}],"src/store/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _exceptions = _interopRequireDefault(require("./modules/exceptions"));

var _modals = _interopRequireDefault(require("./modules/modals"));

var _projects = _interopRequireDefault(require("./modules/projects"));

var _user = _interopRequireDefault(require("./modules/user"));

var _workspace = _interopRequireDefault(require("./modules/workspace"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue.default.use(_vuex.default);

var debug = "development" !== 'production';

var _default = new _vuex.default.Store({
  modules: {
    exceptions: _exceptions.default,
    modals: _modals.default,
    projects: _projects.default,
    user: _user.default,
    workspace: _workspace.default
  },
  strict: debug
});

exports.default = _default;
},{"vue":"node_modules/vue/dist/vue.runtime.esm.js","vuex":"node_modules/vuex/dist/vuex.esm.js","./modules/exceptions":"src/store/modules/exceptions.js","./modules/modals":"src/store/modules/modals.js","./modules/projects":"src/store/modules/projects.js","./modules/user":"src/store/modules/user.js","./modules/workspace":"src/store/modules/workspace.js"}],"src/utils/Ayarin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function capitalize(str) {
  if (!str) {
    return '';
  }

  str = str.toString();
  return str.charAt(0).toUpperCase() + str.slice(1);
}

var _default = {
  capitalize: capitalize
};
exports.default = _default;
},{}],"src/utils/Khala.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Khala =
/*#__PURE__*/
function () {
  function Khala() {
    var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object.create(null);

    _classCallCheck(this, Khala);

    this.events = events;
  }

  _createClass(Khala, [{
    key: "on",
    value: function on(event, fn) {
      (this.events[event] || (this.events[event] = [])).push(fn);
      return this;
    }
  }, {
    key: "off",
    value: function off(event, fn) {
      if (arguments.length === 0) {
        this.events = Object.create(null);
        return this;
      }

      var cbs = this.events[event];

      if (!cbs) {
        return this;
      }

      if (!fn) {
        this.events[event] = null;
        return this;
      }

      for (var i = 0; i < cbs.length; i++) {
        if (cbs[i] === fn) {
          cbs.splice(i, i);
          break;
        }
      }

      return this;
    }
  }, {
    key: "emit",
    value: function emit(event) {
      var cbs = this.events[event];

      if (cbs) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        for (var i = 0; i < cbs.length; i++) {
          cbs[i].apply(null, args);
        }
      } else {
        console.warn("event ".concat(event, " is not exist"));
      }
    }
  }, {
    key: "once",
    value: function once(event, fn) {
      var _this = this;

      var on = function on() {
        _this.off(event);

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        fn.apply(null, args);
      };

      this.on(event, on);
      return this;
    }
  }]);

  return Khala;
}();

var _default = Khala;
exports.default = _default;
},{}],"src/utils/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Ayarin", {
  enumerable: true,
  get: function () {
    return _Ayarin.default;
  }
});
Object.defineProperty(exports, "Khala", {
  enumerable: true,
  get: function () {
    return _Khala.default;
  }
});

var _Ayarin = _interopRequireDefault(require("./Ayarin"));

var _Khala = _interopRequireDefault(require("./Khala"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./Ayarin":"src/utils/Ayarin.js","./Khala":"src/utils/Khala.js"}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"node_modules/vue-hot-reload-api/dist/index.js":[function(require,module,exports) {
var Vue // late bind
var version
var map = Object.create(null)
if (typeof window !== 'undefined') {
  window.__VUE_HOT_MAP__ = map
}
var installed = false
var isBrowserify = false
var initHookName = 'beforeCreate'

exports.install = function (vue, browserify) {
  if (installed) { return }
  installed = true

  Vue = vue.__esModule ? vue.default : vue
  version = Vue.version.split('.').map(Number)
  isBrowserify = browserify

  // compat with < 2.0.0-alpha.7
  if (Vue.config._lifecycleHooks.indexOf('init') > -1) {
    initHookName = 'init'
  }

  exports.compatible = version[0] >= 2
  if (!exports.compatible) {
    console.warn(
      '[HMR] You are using a version of vue-hot-reload-api that is ' +
        'only compatible with Vue.js core ^2.0.0.'
    )
    return
  }
}

/**
 * Create a record for a hot module, which keeps track of its constructor
 * and instances
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  if(map[id]) { return }

  var Ctor = null
  if (typeof options === 'function') {
    Ctor = options
    options = Ctor.options
  }
  makeOptionsHot(id, options)
  map[id] = {
    Ctor: Ctor,
    options: options,
    instances: []
  }
}

/**
 * Check if module is recorded
 *
 * @param {String} id
 */

exports.isRecorded = function (id) {
  return typeof map[id] !== 'undefined'
}

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot(id, options) {
  if (options.functional) {
    var render = options.render
    options.render = function (h, ctx) {
      var instances = map[id].instances
      if (ctx && instances.indexOf(ctx.parent) < 0) {
        instances.push(ctx.parent)
      }
      return render(h, ctx)
    }
  } else {
    injectHook(options, initHookName, function() {
      var record = map[id]
      if (!record.Ctor) {
        record.Ctor = this.constructor
      }
      record.instances.push(this)
    })
    injectHook(options, 'beforeDestroy', function() {
      var instances = map[id].instances
      instances.splice(instances.indexOf(this), 1)
    })
  }
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook(options, name, hook) {
  var existing = options[name]
  options[name] = existing
    ? Array.isArray(existing) ? existing.concat(hook) : [existing, hook]
    : [hook]
}

function tryWrap(fn) {
  return function (id, arg) {
    try {
      fn(id, arg)
    } catch (e) {
      console.error(e)
      console.warn(
        'Something went wrong during Vue component hot-reload. Full reload required.'
      )
    }
  }
}

function updateOptions (oldOptions, newOptions) {
  for (var key in oldOptions) {
    if (!(key in newOptions)) {
      delete oldOptions[key]
    }
  }
  for (var key$1 in newOptions) {
    oldOptions[key$1] = newOptions[key$1]
  }
}

exports.rerender = tryWrap(function (id, options) {
  var record = map[id]
  if (!options) {
    record.instances.slice().forEach(function (instance) {
      instance.$forceUpdate()
    })
    return
  }
  if (typeof options === 'function') {
    options = options.options
  }
  if (record.Ctor) {
    record.Ctor.options.render = options.render
    record.Ctor.options.staticRenderFns = options.staticRenderFns
    record.instances.slice().forEach(function (instance) {
      instance.$options.render = options.render
      instance.$options.staticRenderFns = options.staticRenderFns
      // reset static trees
      // pre 2.5, all static trees are cached together on the instance
      if (instance._staticTrees) {
        instance._staticTrees = []
      }
      // 2.5.0
      if (Array.isArray(record.Ctor.options.cached)) {
        record.Ctor.options.cached = []
      }
      // 2.5.3
      if (Array.isArray(instance.$options.cached)) {
        instance.$options.cached = []
      }

      // post 2.5.4: v-once trees are cached on instance._staticTrees.
      // Pure static trees are cached on the staticRenderFns array
      // (both already reset above)

      // 2.6: temporarily mark rendered scoped slots as unstable so that
      // child components can be forced to update
      var restore = patchScopedSlots(instance)
      instance.$forceUpdate()
      instance.$nextTick(restore)
    })
  } else {
    // functional or no instance created yet
    record.options.render = options.render
    record.options.staticRenderFns = options.staticRenderFns

    // handle functional component re-render
    if (record.options.functional) {
      // rerender with full options
      if (Object.keys(options).length > 2) {
        updateOptions(record.options, options)
      } else {
        // template-only rerender.
        // need to inject the style injection code for CSS modules
        // to work properly.
        var injectStyles = record.options._injectStyles
        if (injectStyles) {
          var render = options.render
          record.options.render = function (h, ctx) {
            injectStyles.call(ctx)
            return render(h, ctx)
          }
        }
      }
      record.options._Ctor = null
      // 2.5.3
      if (Array.isArray(record.options.cached)) {
        record.options.cached = []
      }
      record.instances.slice().forEach(function (instance) {
        instance.$forceUpdate()
      })
    }
  }
})

exports.reload = tryWrap(function (id, options) {
  var record = map[id]
  if (options) {
    if (typeof options === 'function') {
      options = options.options
    }
    makeOptionsHot(id, options)
    if (record.Ctor) {
      if (version[1] < 2) {
        // preserve pre 2.2 behavior for global mixin handling
        record.Ctor.extendOptions = options
      }
      var newCtor = record.Ctor.super.extend(options)
      // prevent record.options._Ctor from being overwritten accidentally
      newCtor.options._Ctor = record.options._Ctor
      record.Ctor.options = newCtor.options
      record.Ctor.cid = newCtor.cid
      record.Ctor.prototype = newCtor.prototype
      if (newCtor.release) {
        // temporary global mixin strategy used in < 2.0.0-alpha.6
        newCtor.release()
      }
    } else {
      updateOptions(record.options, options)
    }
  }
  record.instances.slice().forEach(function (instance) {
    if (instance.$vnode && instance.$vnode.context) {
      instance.$vnode.context.$forceUpdate()
    } else {
      console.warn(
        'Root or manually mounted instance modified. Full reload required.'
      )
    }
  })
})

// 2.6 optimizes template-compiled scoped slots and skips updates if child
// only uses scoped slots. We need to patch the scoped slots resolving helper
// to temporarily mark all scoped slots as unstable in order to force child
// updates.
function patchScopedSlots (instance) {
  if (!instance._u) { return }
  // https://github.com/vuejs/vue/blob/dev/src/core/instance/render-helpers/resolve-scoped-slots.js
  var original = instance._u
  instance._u = function (slots) {
    try {
      // 2.6.4 ~ 2.6.6
      return original(slots, true)
    } catch (e) {
      // 2.5 / >= 2.6.7
      return original(slots, null, true)
    }
  }
  return function () {
    instance._u = original
  }
}

},{}],"src/components/sidebar/components/menu-item/menu-item.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("/src/utils/index");

//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'menu-item',
  props: {
    data: Object
  },
  computed: {
    name: function name() {
      return _index.Ayarin.capitalize(this.data.name);
    }
  }
};
exports.default = _default;
        var $c163b7 = exports.default || module.exports;
      
      if (typeof $c163b7 === 'function') {
        $c163b7 = $c163b7.options;
      }
    
        /* template */
        Object.assign($c163b7, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "menu-item" }, [
    _c("div", { staticClass: "wrap" }, [
      _c("img", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.data.icon.length > 0,
            expression: "data.icon.length > 0"
          }
        ],
        staticClass: "icon",
        attrs: { src: _vm.data.icon, alt: _vm.data.name }
      }),
      _vm._v(" "),
      _c("span", { staticClass: "placeholder" }, [_vm._v(_vm._s(_vm.name))])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-c163b7",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$c163b7', $c163b7);
          } else {
            api.reload('$c163b7', $c163b7);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"/src/utils/index":"src/utils/index.js","_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/sidebar/sidebar.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _menuItem = _interopRequireDefault(require("./components/menu-item/menu-item"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'sidebar',
  props: {
    name: {
      type: String,
      default: 'workspace'
    }
  },
  data: function data() {
    return {
      menuItems: [{
        name: 'workspace',
        icon: ''
      }, {
        name: 'projects',
        icon: ''
      }, {
        name: 'marine',
        icon: ''
      }, {
        name: 'extensions',
        icon: ''
      }],
      setting: {
        name: 'setting',
        icon: ''
      },
      currentName: this.name
    };
  },
  methods: {
    change: function change() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentName;
      var lastName = this.currentName;
      this.currentName = name;
      this.$emit('onChange', name, lastName);
    },
    callSetting: function callSetting() {}
  },
  components: {
    MenuItem: _menuItem.default
  }
};
exports.default = _default;
        var $fe25d0 = exports.default || module.exports;
      
      if (typeof $fe25d0 === 'function') {
        $fe25d0 = $fe25d0.options;
      }
    
        /* template */
        Object.assign($fe25d0, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "sidebar" }, [
    _c(
      "div",
      { staticClass: "upper-part" },
      _vm._l(_vm.menuItems, function(menuItem) {
        return _c("menu-item", {
          key: menuItem.name,
          ref: "menuItems",
          refInFor: true,
          class: _vm.currentName === menuItem.name ? "active" : "",
          attrs: { data: menuItem },
          nativeOn: {
            click: function($event) {
              return _vm.change(menuItem.name)
            }
          }
        })
      }),
      1
    ),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "lower-part" },
      [
        _c("menu-item", {
          attrs: { data: _vm.setting },
          nativeOn: {
            click: function($event) {
              return _vm.callSetting($event)
            }
          }
        })
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-fe25d0",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$fe25d0', $fe25d0);
          } else {
            api.reload('$fe25d0', $fe25d0);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"./components/menu-item/menu-item":"src/components/sidebar/components/menu-item/menu-item.vue","_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/searcher/searcher.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
var _default = {
  name: 'searcher',
  data: function data() {
    return {
      keyword: ''
    };
  },
  methods: {
    search: function search() {
      this.$emit('onSearch', this.keyword);
    }
  }
};
exports.default = _default;
        var $cfd9a7 = exports.default || module.exports;
      
      if (typeof $cfd9a7 === 'function') {
        $cfd9a7 = $cfd9a7.options;
      }
    
        /* template */
        Object.assign($cfd9a7, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "searcher" }, [
    _c("input", {
      directives: [
        {
          name: "model",
          rawName: "v-model",
          value: _vm.keyword,
          expression: "keyword"
        }
      ],
      staticClass: "inputer",
      attrs: { type: "text", placeholder: "Search Project" },
      domProps: { value: _vm.keyword },
      on: {
        input: function($event) {
          if ($event.target.composing) {
            return
          }
          _vm.keyword = $event.target.value
        }
      }
    })
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-cfd9a7",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$cfd9a7', $cfd9a7);
          } else {
            api.reload('$cfd9a7', $cfd9a7);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/project-plane/project-plane.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("/src/Modals/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'project-plane',
  props: {
    project: Object
  },
  methods: {
    onContextMenu: function onContextMenu(event) {// this.$store.dispatch('modals/open', {
      //   layer: Modals.ContextMenu,
      //   value: {
      //     menuList: ContextMenu.project,
      //     position: {
      //       top: event.clientY + 'px',
      //       left: event.clientX + 'px',
      //     },
      //   },
      // })
    }
  }
};
exports.default = _default;
        var $9a2e92 = exports.default || module.exports;
      
      if (typeof $9a2e92 === 'function') {
        $9a2e92 = $9a2e92.options;
      }
    
        /* template */
        Object.assign($9a2e92, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "project-plane",
      on: {
        contextmenu: function($event) {
          $event.preventDefault()
          $event.stopPropagation()
          return _vm.onContextMenu($event)
        }
      }
    },
    [
      _c("div", { staticClass: "avatar-container" }, [
        _c("img", {
          staticClass: "avatar",
          attrs: { src: _vm.project.avatar, alt: _vm.project.name }
        })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "info" }, [
        _c("div", { staticClass: "name" }, [_vm._v(_vm._s(_vm.project.name))]),
        _vm._v(" "),
        _c("div", { staticClass: "desc" }, [_vm._v(_vm._s(_vm.project.desc))])
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-9a2e92",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$9a2e92', $9a2e92);
          } else {
            api.reload('$9a2e92', $9a2e92);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"/src/Modals/index":"src/Modals/index.js","_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/source-item/source-item.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'source-item',
  props: {
    icon: String,
    name: String,
    type: Number
  }
};
exports.default = _default;
        var $05aaa5 = exports.default || module.exports;
      
      if (typeof $05aaa5 === 'function') {
        $05aaa5 = $05aaa5.options;
      }
    
        /* template */
        Object.assign($05aaa5, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "source-item" }, [
    _c("div", { staticClass: "left" }, [
      _c("div", {
        staticClass: "icon",
        class: { "hide-icon": _vm.type === 0 }
      }),
      _vm._v(" "),
      _c("div", { staticClass: "name" }, [_vm._v(_vm._s(_vm.name))])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-05aaa5",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$05aaa5', $05aaa5);
          } else {
            api.reload('$05aaa5', $05aaa5);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/enums/fileEnum.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  FileType: {
    File: 0,
    Folder: 1
  }
};
exports.default = _default;
},{}],"src/enums/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FileEnum", {
  enumerable: true,
  get: function () {
    return _fileEnum.default;
  }
});

var _fileEnum = _interopRequireDefault(require("./fileEnum"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./fileEnum":"src/enums/fileEnum.js"}],"src/helpers/fileHelper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("/src/enums/index");

var _default = {
  isFolder: function isFolder(file) {
    return file.type === _index.FileEnum.FileType.Folder;
  },
  isFile: function isFile(file) {
    return file.type === _index.FileEnum.FileType.File;
  },
  isSame: function isSame(fileA, fileB) {
    return fileA.fid === fileB.fid && fileA.pid === fileB.pid;
  },
  sort: function sort(f) {
    var _this = this;

    var folders = [];
    var files = [];
    f.forEach(function (file) {
      _this.isFolder(file) ? folders.push(file) : files.push(file);
    });
    return folders.concat(files);
  },
  mountedInRoot: function mountedInRoot(file) {
    return file.mid === '0';
  },
  isDelete: function isDelete(file) {
    return file.status.isDelete === '1';
  },
  isPlaceholder: function isPlaceholder(file) {
    return file.fid === '-1';
  },
  getNameAndExt: function getNameAndExt(fullName) {
    fullName = fullName.split('.');
    var name = '';
    var ext = '';

    if (fullName.length === 1) {
      name = fullName[0];
    } else {
      if (fullName[0].length === 0) {
        name = '.' + fullName[1];
      } else {
        name = fullName[0];
        ext = fullName[1];
      }
    }

    return {
      name: name,
      ext: ext
    };
  }
};
exports.default = _default;
},{"/src/enums/index":"src/enums/index.js"}],"src/helpers/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FileHelper", {
  enumerable: true,
  get: function () {
    return _fileHelper.default;
  }
});

var _fileHelper = _interopRequireDefault(require("./fileHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./fileHelper":"src/helpers/fileHelper.js"}],"src/components/catalogue/components/catalogue-node/catalogue-node.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sourceItem = _interopRequireDefault(require("/src/components/source-item/source-item"));

var _index = _interopRequireDefault(require("/src/Modals/index"));

var _index2 = require("/src/enums/index");

var _index3 = require("/src/helpers/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'catalogue-node',
  inject: ['khala'],
  props: {
    data: Object,
    active: Object
  },
  data: function data() {
    return {
      fileFullName: ''
    };
  },
  computed: {
    isDelete: function isDelete() {
      return this.data.status.isDelete;
    },
    files: function files() {
      var _this = this;

      return _index3.FileHelper.sort(this.$store.state.workspace.project.files.filter(function (file) {
        return file.mid === _this.data.fid;
      }));
    },
    size: function size() {
      var len = this.data.files.length;

      if (len > 10) {
        return 'size-max';
      }
    }
  },
  mounted: function mounted() {
    if (_index3.FileHelper.isPlaceholder(this.data)) {
      this.$refs.inputer.focus();
    }
  },
  watch: {
    fileFullName: function fileFullName(fullName) {
      this.$store.dispatch('workspace/setPlaceholderFileInfo', _index3.FileHelper.getNameAndExt(fullName));
    }
  },
  methods: {
    onClick: function onClick() {
      this.khala.emit('onClick', this.data);
    },
    onContextMenu: function onContextMenu(event) {
      var _this2 = this;

      this.khala.emit('onContextMenu', {
        y: event.clientY,
        x: event.clientX,
        file: this.data,
        unfold: function unfold() {
          _this2.$store.dispatch('workspace/unfoldFile', _this2.data);
        }
      });
    }
  },
  components: {
    SourceItem: _sourceItem.default
  }
};
exports.default = _default;
        var $cf43d5 = exports.default || module.exports;
      
      if (typeof $cf43d5 === 'function') {
        $cf43d5 = $cf43d5.options;
      }
    
        /* template */
        Object.assign($cf43d5, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "root" },
    [
      _vm.data.fid === "-1"
        ? [
            _c("div", { staticClass: "placeholder-file" }, [
              _c("div", { staticClass: "icon" }),
              _vm._v(" "),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.fileFullName,
                    expression: "fileFullName"
                  }
                ],
                ref: "inputer",
                staticClass: "inputer",
                attrs: { type: "text" },
                domProps: { value: _vm.fileFullName },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.fileFullName = $event.target.value
                  }
                }
              })
            ])
          ]
        : [
            _vm.isDelete === "0"
              ? _c(
                  "div",
                  {
                    staticClass: "catalogue-node",
                    on: {
                      click: function($event) {
                        $event.stopPropagation()
                        return _vm.onClick($event)
                      },
                      contextmenu: function($event) {
                        $event.preventDefault()
                        $event.stopPropagation()
                        return _vm.onContextMenu($event)
                      }
                    }
                  },
                  [
                    _c("source-item", {
                      staticClass: "i-source-item",
                      class: {
                        active: _vm.active && _vm.active.fid === _vm.data.fid,
                        "icon-active": _vm.data.status.isFold === "0"
                      },
                      attrs: {
                        icon: _vm.data.icon,
                        name:
                          _vm.data.name +
                          (_vm.data.ext ? "." + _vm.data.ext : ""),
                        type: _vm.data.type
                      }
                    }),
                    _vm._v(" "),
                    _vm.files && _vm.files.length > 0
                      ? [
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.data.status.isFold === "0",
                                  expression: "data.status.isFold === '0'"
                                }
                              ],
                              staticClass: "content"
                            },
                            _vm._l(_vm.files, function(child) {
                              return _c("catalogue-node", {
                                key: child.fid,
                                attrs: { data: child, active: _vm.active }
                              })
                            }),
                            1
                          )
                        ]
                      : _vm._e()
                  ],
                  2
                )
              : _vm._e()
          ]
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$cf43d5', $cf43d5);
          } else {
            api.reload('$cf43d5', $cf43d5);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"/src/components/source-item/source-item":"src/components/source-item/source-item.vue","/src/Modals/index":"src/Modals/index.js","/src/enums/index":"src/enums/index.js","/src/helpers/index":"src/helpers/index.js","_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/catalogue/catalogue.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _catalogueNode = _interopRequireDefault(require("./components/catalogue-node/catalogue-node"));

var _index = require("/src/utils/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'catalogue',
  props: {
    catalogues: Array,
    catalogue: Object,
    active: Object
  },
  provide: function provide() {
    return {
      khala: this.khala
    };
  },
  beforeCreate: function beforeCreate() {
    this.khala = new _index.Khala();
  },
  created: function created() {
    var _this = this;

    this.khala.on('onClick', function (data) {
      _this.$emit('onSelect', data);
    });
    this.khala.on('onContextMenu', function (data) {
      _this.$emit('onContextMenu', data);
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.khala.off('click');
  },
  components: {
    CatalogueNode: _catalogueNode.default
  }
};
exports.default = _default;
        var $4d945f = exports.default || module.exports;
      
      if (typeof $4d945f === 'function') {
        $4d945f = $4d945f.options;
      }
    
        /* template */
        Object.assign($4d945f, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "catalogue" },
    [
      _vm.catalogues && _vm.catalogues.length > 0
        ? _vm._l(_vm.catalogues, function(catalogue) {
            return _c("catalogue-node", {
              key: catalogue.fid,
              attrs: { data: catalogue, active: _vm.active }
            })
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.catalogue
        ? [
            _c("catalogue-node", {
              attrs: { data: _vm.catalogue, active: _vm.active }
            })
          ]
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$4d945f', $4d945f);
          } else {
            api.reload('$4d945f', $4d945f);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"./components/catalogue-node/catalogue-node":"src/components/catalogue/components/catalogue-node/catalogue-node.vue","/src/utils/index":"src/utils/index.js","_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/icon/typeMap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {};
exports.default = _default;
},{}],"src/components/icon/icon.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeMap = _interopRequireDefault(require("./typeMap.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
var _default = {
  name: 'icon',
  props: {
    type: {
      type: String,
      required: true
    },
    alt: String
  },
  computed: {
    src: function src() {
      return this.type;
    }
  }
};
exports.default = _default;
        var $3ba2ec = exports.default || module.exports;
      
      if (typeof $3ba2ec === 'function') {
        $3ba2ec = $3ba2ec.options;
      }
    
        /* template */
        Object.assign($3ba2ec, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "icon" }, [_vm._v(_vm._s(_vm.src))])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-3ba2ec",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$3ba2ec', $3ba2ec);
          } else {
            api.reload('$3ba2ec', $3ba2ec);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"./typeMap.js":"src/components/icon/typeMap.js","_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/static-icon/typeMap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {};
exports.default = _default;
},{}],"src/components/static-icon/static-icon.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeMap = _interopRequireDefault(require("./typeMap.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
var _default = {
  name: 'icon',
  props: {
    type: {
      type: String,
      required: true
    },
    alt: String
  },
  computed: {
    src: function src() {
      return this.type;
    }
  }
};
exports.default = _default;
        var $4b96e1 = exports.default || module.exports;
      
      if (typeof $4b96e1 === 'function') {
        $4b96e1 = $4b96e1.options;
      }
    
        /* template */
        Object.assign($4b96e1, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "icon" }, [_vm._v(_vm._s(_vm.src))])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-4b96e1",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$4b96e1', $4b96e1);
          } else {
            api.reload('$4b96e1', $4b96e1);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"./typeMap.js":"src/components/static-icon/typeMap.js","_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/explorer/components/explorer-workspace/components/create-file-modal/create-file-modal.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("/src/Modals/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
var _default = {
  name: 'create-file-modal',
  methods: {
    onClose: function onClose() {
      this.$store.dispatch('modals/close', _index.default.Workspace);
      this.$emit('onClose');
    }
  }
};
exports.default = _default;
        var $e507fd = exports.default || module.exports;
      
      if (typeof $e507fd === 'function') {
        $e507fd = $e507fd.options;
      }
    
        /* template */
        Object.assign($e507fd, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", {
    staticClass: "create-file-modal",
    on: {
      click: function($event) {
        $event.stopPropagation()
        return _vm.onClose($event)
      }
    }
  })
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-e507fd",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$e507fd', $e507fd);
          } else {
            api.reload('$e507fd', $e507fd);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"/src/Modals/index":"src/Modals/index.js","_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/folder/folder.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'folder',
  props: {
    isFold: {
      type: Boolean,
      default: true
    },
    flexGrow: {
      type: String,
      default: '1'
    }
  },
  data: function data() {
    return {
      fold_: this.isFold,
      flexGrow_: this.isFold ? '0' : this.flexGrow
    };
  },
  methods: {
    toggleFold: function toggleFold() {
      this.fold_ = !this.fold_;
      this.onFold();
      this.$emit('onChange', this.fold_);
    },
    onFold: function onFold() {
      this.flexGrow_ = this.fold_ ? '0' : this.flexGrow;
    },
    fold: function fold() {
      this.fold_ = true;
      this.flexGrow_ = '0';
    },
    unfold: function unfold() {
      this.fold_ = false;
      this.flexGrow_ = this.flexGrow;
    }
  }
};
exports.default = _default;
        var $233d73 = exports.default || module.exports;
      
      if (typeof $233d73 === 'function') {
        $233d73 = $233d73.options;
      }
    
        /* template */
        Object.assign($233d73, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "folder", style: { flex: _vm.flexGrow_ } }, [
    _c(
      "div",
      { staticClass: "header", on: { click: _vm.toggleFold } },
      [_vm._t("header")],
      2
    ),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "body", class: { fold: _vm.fold_ } },
      [_vm._t("body")],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-233d73",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$233d73', $233d73);
          } else {
            api.reload('$233d73', $233d73);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/explorer/components/explorer-workspace/components/file-filter/file-filter.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _folder = _interopRequireDefault(require("/src/components/folder/folder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'file-filter',
  props: {
    name: String,
    files: [],
    isFold: {
      type: Boolean,
      default: true
    },
    flexGrow: String
  },
  data: function data() {
    return {
      isIconFold: this.isFold,
      isHideLayerMarker: false
    };
  },
  methods: {
    showBorder: function showBorder() {
      this.isHideLayerMarker = false;
    },
    hideBorder: function hideBorder() {
      this.isHideLayerMarker = true;
    },
    onChange: function onChange(isFold) {
      this.isIconFold = isFold;
    },
    fold: function fold() {
      this.isIconFold = true;
      this.$refs.folder.fold();
    },
    unfold: function unfold() {
      this.isIconFold = false;
      this.$refs.folder.unfold();
    }
  },
  components: {
    Folder: _folder.default
  }
};
exports.default = _default;
        var $2dbe7a = exports.default || module.exports;
      
      if (typeof $2dbe7a === 'function') {
        $2dbe7a = $2dbe7a.options;
      }
    
        /* template */
        Object.assign($2dbe7a, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("folder", {
    ref: "folder",
    staticClass: "section section-files",
    attrs: { isFold: _vm.isIconFold, flexGrow: _vm.flexGrow },
    on: { onChange: _vm.onChange },
    scopedSlots: _vm._u(
      [
        {
          key: "header",
          fn: function() {
            return [
              _c("div", { staticClass: "filter filter-files" }, [
                _c("div", { staticClass: "left" }, [
                  _c("div", {
                    staticClass: "icon",
                    class: { "active-icon": !_vm.isIconFold }
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "name" }, [_vm._v(_vm._s(_vm.name))])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "right" }, [_vm._t("menu")], 2)
              ])
            ]
          },
          proxy: true
        },
        {
          key: "body",
          fn: function() {
            return [
              _c(
                "div",
                {
                  staticClass: "catalogue-container",
                  attrs: { id: "deep-layer-mark" },
                  on: { mouseenter: _vm.showBorder, mouseleave: _vm.hideBorder }
                },
                [
                  _c(
                    "div",
                    {
                      class: _vm.isHideLayerMarker
                        ? "hide-layer-mark"
                        : "show-layer-mark"
                    },
                    [_vm._t("catalogue")],
                    2
                  )
                ]
              )
            ]
          },
          proxy: true
        }
      ],
      null,
      true
    )
  })
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-2dbe7a",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$2dbe7a', $2dbe7a);
          } else {
            api.reload('$2dbe7a', $2dbe7a);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"/src/components/folder/folder":"src/components/folder/folder.vue","_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/configs/ContextMenuConfig.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = require("/src/enums/index");

var _index2 = _interopRequireDefault(require("/src/Modals/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contextmenu = {
  get: function get(type, payload) {
    return contextmenu[type](payload);
  },
  file: function file(payload) {
    var $store = payload.$store;
    var file = payload.file;
    return [{
      name: payload.name
    }, {
      name: 'Delete',
      fn: function fn() {
        $store.dispatch('workspace/removeFileAsync', file);
      }
    }];
  },
  folder: function folder(payload) {
    var $store = payload.$store;
    var unfold = payload.unfold;
    var pid = payload.pid;
    var mid = payload.mid;
    var menuList = [{
      name: 'Create File',
      fn: function fn() {
        unfold();
        $store.dispatch('modals/open', {
          modal: _index2.default.Workspace,
          value: {
            mid: mid,
            pid: pid,
            type: _index.FileEnum.FileType.File
          }
        });
        $store.dispatch('workspace/createPlaceholderFile', {
          pid: pid,
          mid: mid,
          type: _index.FileEnum.FileType.File
        });
      }
    }, {
      name: 'Create Folder',
      fn: function fn() {
        unfold();
        $store.dispatch('modals/open', {
          modal: _index2.default.Workspace,
          value: {
            mid: mid,
            pid: pid,
            type: _index.FileEnum.FileType.Folder
          }
        });
        $store.dispatch('workspace/createPlaceholderFile', {
          pid: pid,
          mid: mid,
          type: _index.FileEnum.FileType.Folder
        });
      }
    }];

    if (payload.name) {
      menuList.unshift({
        name: payload.name
      });
    }

    if (payload.file) {
      menuList.push({
        name: 'Delete',
        fn: function fn() {
          $store.dispatch('workspace/removeFileAsync', payload.file);
        }
      });
    }

    return menuList;
  }
};
var _default = contextmenu;
exports.default = _default;
},{"/src/enums/index":"src/enums/index.js","/src/Modals/index":"src/Modals/index.js"}],"src/configs/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ContextMenuConfig", {
  enumerable: true,
  get: function () {
    return _ContextMenuConfig.default;
  }
});

var _ContextMenuConfig = _interopRequireDefault(require("./ContextMenuConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./ContextMenuConfig":"src/configs/ContextMenuConfig.js"}],"src/components/explorer/components/explorer-workspace/explorer-workspace.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _searcher = _interopRequireDefault(require("/src/components/searcher/searcher"));

var _projectPlane = _interopRequireDefault(require("/src/components/project-plane/project-plane"));

var _catalogue = _interopRequireDefault(require("/src/components/catalogue/catalogue"));

var _icon = _interopRequireDefault(require("/src/components/icon/icon"));

var _staticIcon = _interopRequireDefault(require("/src/components/static-icon/static-icon"));

var _createFileModal = _interopRequireDefault(require("./components/create-file-modal/create-file-modal"));

var _fileFilter = _interopRequireDefault(require("./components/file-filter/file-filter"));

var _index = _interopRequireDefault(require("/src/exceptions/index"));

var _index2 = _interopRequireDefault(require("/src/Modals/index"));

var _index3 = require("/src/enums/index");

var _index4 = require("/src/helpers/index");

var _index5 = require("/src/configs/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var DefaultPid = '-1';
var _default = {
  name: 'explorer-workspace',
  props: {
    pid: {
      type: String,
      default: DefaultPid
    }
  },
  data: function data() {
    return {
      requested: false,
      isFilesFold: true
    };
  },
  computed: {
    user: function user() {
      return this.$store.state.user.user;
    },
    project: function project() {
      return this.$store.state.workspace.project;
    },
    file: function file() {
      return this.$store.state.workspace.file;
    },
    openedFiles: function openedFiles() {
      return this.$store.state.workspace.openedFiles;
    },
    projectFiles: function projectFiles() {
      return _index4.FileHelper.sort(this.project.files.filter(function (file) {
        return file.mid === '0';
      }));
    },
    fileNameExistException: function fileNameExistException() {
      return this.$store.state.exceptions.codes[_index.default.FileNameExist];
    },
    createFileModal: function createFileModal() {
      return this.$store.state.modals.modals[_index2.default.Workspace];
    }
  },
  watch: {
    user: function user(_user) {
      this.getWorkspace();
    },
    fileNameExistException: function fileNameExistException(exception) {
      console.warn('Exception', exception);
    }
  },
  created: function created() {
    this.getWorkspace(); // setTimeout(() => {
    //   console.warn('Exception Test')
    //   this.$store.dispatch('exceptions/throw', {
    //     code: Exceptions.SAME_FILE_ERROR,
    //     exception: {
    //       msg: '重复文件错误',
    //     }
    //   })
    // }, 1000)
  },
  methods: {
    getWorkspace: function getWorkspace() {
      var _this = this;

      if (this.pid !== DefaultPid) {
        this.requested = true;
        this.$store.dispatch('workspace/createWorkspaceAsync', this.pid);
        return;
      }

      if (!this.user || this.requested) {
        return;
      }

      this.$store.dispatch('workspace/requestWorkspace', this.user.uid).then(function () {
        _this.requested = true;
      });
    },
    onCreateFile: function onCreateFile() {
      var mid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '0';
      var pid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.pid;

      if (!pid) {
        return;
      }

      this.$refs.filesFilter.unfold();
      this.$store.dispatch('modals/open', {
        modal: _index2.default.Workspace,
        value: {
          mid: mid,
          pid: pid,
          type: _index3.FileEnum.FileType.File
        }
      });
      this.$store.dispatch('workspace/createPlaceholderFile', {
        pid: pid,
        mid: mid,
        type: _index3.FileEnum.FileType.File
      });
    },
    onCreateFolder: function onCreateFolder() {
      var mid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '0';
      var pid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.pid;

      if (!pid) {
        return;
      }

      this.$refs.filesFilter.unfold();
      this.$store.dispatch('modals/open', {
        modal: _index2.default.Workspace,
        value: {
          mid: mid,
          pid: pid,
          type: _index3.FileEnum.FileType.Folder
        }
      });
      this.$store.dispatch('workspace/createPlaceholderFile', {
        pid: pid,
        mid: mid,
        type: _index3.FileEnum.FileType.Folder
      });
    },
    onCreateFileModalClose: function onCreateFileModalClose() {
      this.$store.dispatch('workspace/transformPlaceholderFileToFile');
    },
    onSelect: function onSelect(file) {
      if (_index4.FileHelper.isFolder(file)) {
        this.$store.dispatch('workspace/toggleFold', file);
        return;
      }

      this.$store.dispatch('workspace/openFile', file);
    },
    onContextMenu: function onContextMenu(eventOrData) {
      var _this2 = this;

      var position = null;
      var contextMenuType = '';
      var payload = {
        $store: this.$store
      };

      if (eventOrData.file) {
        position = {
          top: eventOrData.y + 'px',
          left: eventOrData.x + 'px'
        };
        contextMenuType = _index4.FileHelper.isFolder(eventOrData.file) ? 'folder' : 'file';
        payload.pid = eventOrData.file.pid;
        payload.mid = eventOrData.file.fid;
        payload.file = eventOrData.file;
        payload.name = eventOrData.file.name + eventOrData.file.ext;
        payload.unfold = eventOrData.unfold;
      } else {
        position = {
          top: event.clientY + 'px',
          left: event.clientX + 'px'
        };
        contextMenuType = 'folder';
        payload.pid = this.pid;
        payload.mid = '0';

        payload.unfold = function () {
          _this2.$refs.filesFilter.unfold();
        };
      }

      this.$store.dispatch('modals/open', {
        modal: _index2.default.ContextMenu,
        value: {
          menuList: _index5.ContextMenuConfig.get(contextMenuType, payload),
          position: position
        }
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (!this.user) {
      return;
    }

    this.$store.dispatch('workspace/saveWorkspace', this.user.uid);
  },
  components: {
    Searcher: _searcher.default,
    ProjectPlane: _projectPlane.default,
    Catalogue: _catalogue.default,
    Icon: _icon.default,
    StaticIcon: _staticIcon.default,
    FileFilter: _fileFilter.default,
    CreateFileModal: _createFileModal.default
  }
};
exports.default = _default;
        var $e0e0e4 = exports.default || module.exports;
      
      if (typeof $e0e0e4 === 'function') {
        $e0e0e4 = $e0e0e4.options;
      }
    
        /* template */
        Object.assign($e0e0e4, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "explorer-workspace" },
    [
      _vm._m(0),
      _vm._v(" "),
      _vm.project
        ? [
            _vm.project
              ? _c("project-plane", { attrs: { project: _vm.project } })
              : _vm._e(),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "body",
                on: {
                  contextmenu: function($event) {
                    $event.preventDefault()
                    $event.stopPropagation()
                    return _vm.onContextMenu($event)
                  }
                }
              },
              [
                _c("file-filter", {
                  attrs: { name: "Open Files" },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "menu",
                        fn: function() {
                          return [
                            _c("static-icon", {
                              staticClass: "i-icon",
                              attrs: { type: _vm.openedFiles.length + "" }
                            })
                          ]
                        },
                        proxy: true
                      },
                      {
                        key: "catalogue",
                        fn: function() {
                          return [
                            _c("catalogue", {
                              attrs: {
                                catalogues: _vm.openedFiles,
                                active: _vm.file
                              },
                              on: {
                                onSelect: _vm.onSelect,
                                onContextMenu: _vm.onContextMenu
                              }
                            })
                          ]
                        },
                        proxy: true
                      }
                    ],
                    null,
                    false,
                    960105659
                  )
                }),
                _vm._v(" "),
                _c("file-filter", {
                  ref: "filesFilter",
                  attrs: { name: "Files", flexGrow: "2" },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "menu",
                        fn: function() {
                          return [
                            _c("icon", {
                              staticClass: "i-icon",
                              attrs: { type: "addFile" },
                              nativeOn: {
                                click: function($event) {
                                  $event.stopPropagation()
                                  return _vm.onCreateFile()
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c("icon", {
                              staticClass: "i-icon",
                              attrs: { type: "addFolder" },
                              nativeOn: {
                                click: function($event) {
                                  $event.stopPropagation()
                                  return _vm.onCreateFolder()
                                }
                              }
                            })
                          ]
                        },
                        proxy: true
                      },
                      {
                        key: "catalogue",
                        fn: function() {
                          return [
                            _c("catalogue", {
                              attrs: {
                                catalogues: _vm.projectFiles,
                                active: _vm.file
                              },
                              on: {
                                onSelect: _vm.onSelect,
                                onContextMenu: _vm.onContextMenu
                              }
                            })
                          ]
                        },
                        proxy: true
                      }
                    ],
                    null,
                    false,
                    3736074322
                  )
                })
              ],
              1
            )
          ]
        : _vm._e(),
      _vm._v(" "),
      _c("create-file-modal", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.createFileModal,
            expression: "createFileModal"
          }
        ],
        on: { onClose: _vm.onCreateFileModalClose }
      })
    ],
    2
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "header" }, [
      _c("div", { staticClass: "title" }, [_vm._v("Workspace")])
    ])
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$e0e0e4', $e0e0e4);
          } else {
            api.reload('$e0e0e4', $e0e0e4);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"/src/components/searcher/searcher":"src/components/searcher/searcher.vue","/src/components/project-plane/project-plane":"src/components/project-plane/project-plane.vue","/src/components/catalogue/catalogue":"src/components/catalogue/catalogue.vue","/src/components/icon/icon":"src/components/icon/icon.vue","/src/components/static-icon/static-icon":"src/components/static-icon/static-icon.vue","./components/create-file-modal/create-file-modal":"src/components/explorer/components/explorer-workspace/components/create-file-modal/create-file-modal.vue","./components/file-filter/file-filter":"src/components/explorer/components/explorer-workspace/components/file-filter/file-filter.vue","/src/exceptions/index":"src/exceptions/index.js","/src/Modals/index":"src/Modals/index.js","/src/enums/index":"src/enums/index.js","/src/helpers/index":"src/helpers/index.js","/src/configs/index":"src/configs/index.js","_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/mock/images/hotaru.jpg":[function(require,module,exports) {
module.exports = "hotaru.1baa04cd.jpg";
},{}],"src/mock/images/baabara.jpg":[function(require,module,exports) {
module.exports = "baabara.68685ded.jpg";
},{}],"src/mock/images/kure.jpg":[function(require,module,exports) {
module.exports = "kure.e19e6b2c.jpg";
},{}],"src/mock/images/kokusei.jpg":[function(require,module,exports) {
module.exports = "kokusei.670c494c.jpg";
},{}],"src/components/explorer/components/explorer-projects/explorer-projects.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _icon = _interopRequireDefault(require("/src/components/icon/icon"));

var _searcher = _interopRequireDefault(require("/src/components/searcher/searcher"));

var _projectPlane = _interopRequireDefault(require("/src/components/project-plane/project-plane"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var randomAvatar = function () {
  var avatars = [require('/src/mock/images/hotaru.jpg'), require('/src/mock/images/baabara.jpg'), require('/src/mock/images/kure.jpg'), require('/src/mock/images/kokusei.jpg')];
  return function () {
    var seed = parseInt(Math.random() * 4);
    console.log('seed', seed);
    return avatars[seed];
  };
}();

var _default = {
  name: 'explorer-projects',
  computed: {
    projects: function projects() {
      return this.$store.state.projects.projects;
    }
  },
  created: function created() {
    this.$store.dispatch('projects/requestProjects');
  },
  methods: {
    onClickOfProjectPlane: function onClickOfProjectPlane(pid) {
      this.$emit('onClick', 'projects', pid);
    },
    onAddProject: function onAddProject() {
      this.addProject();
    },
    addProject: function addProject() {
      this.$store.dispatch('projects/createProject', {
        name: Math.random().toString(36).substring(2),
        desc: 'Minato Editor, powered by Aqua',
        avatar: randomAvatar()
      });
    }
  },
  components: {
    Icon: _icon.default,
    Searcher: _searcher.default,
    ProjectPlane: _projectPlane.default
  }
};
exports.default = _default;
        var $7fe597 = exports.default || module.exports;
      
      if (typeof $7fe597 === 'function') {
        $7fe597 = $7fe597.options;
      }
    
        /* template */
        Object.assign($7fe597, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "explorer-projects" }, [
    _c("div", { staticClass: "header" }, [
      _c("div", { staticClass: "title" }, [_vm._v("Projects")]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "menu-list" },
        [
          _c("icon", {
            staticClass: "i-icon",
            attrs: { type: "add" },
            nativeOn: {
              click: function($event) {
                return _vm.onAddProject($event)
              }
            }
          })
        ],
        1
      )
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "body" },
      [
        _c("searcher", { staticClass: "searcher-patch" }),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "project-list" },
          _vm._l(_vm.projects, function(project) {
            return _c("project-plane", {
              key: project.pid,
              staticClass: "project-plane",
              attrs: { project: project },
              nativeOn: {
                click: function($event) {
                  return _vm.onClickOfProjectPlane(project.pid)
                }
              }
            })
          }),
          1
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-7fe597",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$7fe597', $7fe597);
          } else {
            api.reload('$7fe597', $7fe597);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"/src/components/icon/icon":"src/components/icon/icon.vue","/src/components/searcher/searcher":"src/components/searcher/searcher.vue","/src/components/project-plane/project-plane":"src/components/project-plane/project-plane.vue","/src/mock/images/hotaru.jpg":"src/mock/images/hotaru.jpg","/src/mock/images/baabara.jpg":"src/mock/images/baabara.jpg","/src/mock/images/kure.jpg":"src/mock/images/kure.jpg","/src/mock/images/kokusei.jpg":"src/mock/images/kokusei.jpg","_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/explorer/components/explorer-marine/explorer-marine.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'explorer-marine'
};
exports.default = _default;
        var $121def = exports.default || module.exports;
      
      if (typeof $121def === 'function') {
        $121def = $121def.options;
      }
    
        /* template */
        Object.assign($121def, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "explorer-marine" }, [
      _c("div", { staticClass: "header" }, [
        _c("div", { staticClass: "title" }, [_vm._v("Marine")]),
        _vm._v(" "),
        _c("div", { staticClass: "menu-list" })
      ])
    ])
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-121def",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$121def', $121def);
          } else {
            api.reload('$121def', $121def);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/explorer/components/explorer-extensions/explorer-extensions.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'explorer-extensions'
};
exports.default = _default;
        var $3ab728 = exports.default || module.exports;
      
      if (typeof $3ab728 === 'function') {
        $3ab728 = $3ab728.options;
      }
    
        /* template */
        Object.assign($3ab728, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "explorer-extensions" }, [
      _c("div", { staticClass: "header" }, [
        _c("div", { staticClass: "title" }, [_vm._v("Extensions")]),
        _vm._v(" "),
        _c("div", { staticClass: "menu-list" })
      ])
    ])
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-3ab728",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$3ab728', $3ab728);
          } else {
            api.reload('$3ab728', $3ab728);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/explorer/explorer.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _explorerWorkspace = _interopRequireDefault(require("./components/explorer-workspace/explorer-workspace"));

var _explorerProjects = _interopRequireDefault(require("./components/explorer-projects/explorer-projects"));

var _explorerMarine = _interopRequireDefault(require("./components/explorer-marine/explorer-marine"));

var _explorerExtensions = _interopRequireDefault(require("./components/explorer-extensions/explorer-extensions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'explorer',
  props: {
    explorer: String
  },
  data: function data() {
    return {
      pid: "-1"
    };
  },
  computed: {
    current: function current() {
      var nameOrComponent = this.explorer;

      if (typeof nameOrComponent === 'string') {
        var name = nameOrComponent;
        return 'explorer-' + name;
      } else {
        var component = nameOrComponent;
        return component;
      }
    }
  },
  methods: {
    clickDispatcher: function clickDispatcher(source, payload) {
      switch (source) {
        case 'projects':
          this.changeToWorkspace(payload);
      }
    },
    changeToWorkspace: function changeToWorkspace(pid) {
      this.$parent.change('workspace');
      this.pid = pid;
    }
  },
  components: {
    ExplorerWorkspace: _explorerWorkspace.default,
    ExplorerProjects: _explorerProjects.default,
    ExplorerMarine: _explorerMarine.default,
    ExplorerExtensions: _explorerExtensions.default
  }
};
exports.default = _default;
        var $8d3665 = exports.default || module.exports;
      
      if (typeof $8d3665 === 'function') {
        $8d3665 = $8d3665.options;
      }
    
        /* template */
        Object.assign($8d3665, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "explorer" },
    [
      _c(
        "transition",
        { attrs: { name: "transition-fade" } },
        [
          _c(_vm.current, {
            tag: "component",
            attrs: { pid: _vm.pid },
            on: { onClick: _vm.clickDispatcher }
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-8d3665",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$8d3665', $8d3665);
          } else {
            api.reload('$8d3665', $8d3665);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"./components/explorer-workspace/explorer-workspace":"src/components/explorer/components/explorer-workspace/explorer-workspace.vue","./components/explorer-projects/explorer-projects":"src/components/explorer/components/explorer-projects/explorer-projects.vue","./components/explorer-marine/explorer-marine":"src/components/explorer/components/explorer-marine/explorer-marine.vue","./components/explorer-extensions/explorer-extensions":"src/components/explorer/components/explorer-extensions/explorer-extensions.vue","_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/tab/tab.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _icon = _interopRequireDefault(require("/src/components/icon/icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
var DefaultIconSrc = '';
var _default = {
  name: 'tab',
  props: {
    tab: Object
  },
  computed: {
    icon: function icon() {
      return this.tab.icon || DefaultIconSrc;
    },
    title: function title() {
      var ext = this.tab.ext.length > 0 ? '.' + this.tab.ext : '';
      return this.tab.name + ext;
    }
  },
  methods: {
    close: function close() {
      this.$emit('onClose', this.tab);
    }
  },
  components: {
    Icon: _icon.default
  }
};
exports.default = _default;
        var $e3dc0c = exports.default || module.exports;
      
      if (typeof $e3dc0c === 'function') {
        $e3dc0c = $e3dc0c.options;
      }
    
        /* template */
        Object.assign($e3dc0c, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "tab" }, [
    _c("div", { staticClass: "left" }, [
      _c("img", { attrs: { src: _vm.icon } }),
      _vm._v(" "),
      _c("span", [_vm._v(_vm._s(_vm.title))])
    ]),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "right",
        on: {
          click: function($event) {
            $event.stopPropagation()
            return _vm.close($event)
          }
        }
      },
      [_c("icon", { staticClass: "i-icon", attrs: { type: "close" } })],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-e3dc0c",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$e3dc0c', $e3dc0c);
          } else {
            api.reload('$e3dc0c', $e3dc0c);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"/src/components/icon/icon":"src/components/icon/icon.vue","_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/tabs/tabs.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tab = _interopRequireDefault(require("../tab/tab"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'tabs',
  props: {
    tabs: Array,
    currentTab: Object
  },
  methods: {
    change: function change(tab) {
      this.$emit('onChange', tab);
    },
    close: function close(tab) {
      this.$emit('onClose', tab);
    }
  },
  components: {
    Tab: _tab.default
  }
};
exports.default = _default;
        var $b87837 = exports.default || module.exports;
      
      if (typeof $b87837 === 'function') {
        $b87837 = $b87837.options;
      }
    
        /* template */
        Object.assign($b87837, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "tabs" }, [
    _c(
      "div",
      { staticClass: "tab-list" },
      _vm._l(_vm.tabs, function(tab) {
        return _c("tab", {
          key: tab.fid,
          staticClass: "i-tab",
          class: { active: _vm.currentTab && _vm.currentTab.fid === tab.fid },
          attrs: { tab: tab },
          on: { onClose: _vm.close },
          nativeOn: {
            click: function($event) {
              return _vm.change(tab)
            }
          }
        })
      }),
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-b87837",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$b87837', $b87837);
          } else {
            api.reload('$b87837', $b87837);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"../tab/tab":"src/components/tab/tab.vue","_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"../aQua/src/utils/Algorithm.js":[function(require,module,exports) {
module.exports = {
  binarySearch: function binarySearch(start, end, checkFn) {
    var lastCenter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : -1;
    var center = parseInt((start + end) / 2);
    var result = checkFn(center, lastCenter);
    return result < 0 ? binarySearch(start, center, checkFn, center) : result > 0 ? binarySearch(center, end, checkFn, center) : center;
  }
};
},{}],"../aQua/src/utils/DataTransferItemHandler.js":[function(require,module,exports) {
module.exports = {
  handle: function handle(dataTransferItem, handler) {
    var kind = dataTransferItem.kind,
        type = dataTransferItem.type;

    if (kind === 'string') {
      if (type.match('^text/plain')) {
        dataTransferItem.getAsString(handler.text);
      } else if (type.match('^text/html')) {
        dataTransferItem.getAsString(handler.html);
      } else {
        console.error("Unknown tpye ".concat(type, " in string"));
      }
    }

    if (kind === 'file') {
      console.warn('find file', type);

      if (type.match('^image/')) {
        dataTransferItem.getAsFile(handler.file);
      } else {
        console.error("Unknown tpye ".concat(type, " in file"));
      }
    }
  }
};
},{}],"../aQua/src/utils/DOM.js":[function(require,module,exports) {
module.exports = {
  e: function e(tag) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var node = document.createElement(tag);

    if (props) {
      var keys = Object.keys(props);
      var key;

      for (var i = 0; i < keys.length; i++) {
        key = keys[i];
        node.setAttribute(key, props[key]);
      }
    }

    if (children) {
      this.appendChild(node, children);
    }

    return node;
  },
  t: function t(content) {
    return document.createTextNode(content);
  },
  f: function f() {
    return document.createDocumentFragment();
  },
  appendChild: function appendChild(parent, children) {
    var startFrom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;
    var existChildren = parent.children;
    var existChildrenLen = existChildren.length;

    if (startFrom > existChildrenLen || existChildrenLen === 0) {
      return this._appendChild(parent, children);
    }

    var anchor = existChildren[startFrom];
    return this._insertChild(parent, children, anchor);
  },
  replaceChild: function replaceChild(parent, newChild, oldChild) {
    return parent.replaceChild(newChild, oldChild);
  },
  removeChild: function removeChild(parent, children) {
    return parent.removeChild(children);
  },
  insertBefore: function insertBefore(children, anchor) {
    return anchor.parentNode.insertBefore(children, anchor);
  },
  clear: function clear(ele) {
    ele.innerHTML = '';
  },
  _appendChild: function _appendChild(parent, children) {
    return parent.appendChild(this._toFragment(children));
  },
  _insertChild: function _insertChild(parent, children, anchor) {
    return parent.insertBefore(children, anchor);
  },
  _toFragment: function _toFragment(eles) {
    var $f = this.f();

    if (Array.isArray(eles)) {
      for (var i = 0; i < eles.length; i++) {
        $f.appendChild(this._toEle(eles[i]));
      }
    } else {
      $f.appendChild(this._toEle(eles));
    }

    return $f;
  },
  _toEle: function _toEle(obj) {
    return typeof obj === 'string' ? this.t(obj) : obj;
  }
};
},{}],"../aQua/src/utils/Iterator.js":[function(require,module,exports) {
module.exports = {
  iterate: function iterate(obj, fn) {
    var keys = Object.keys(obj);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      fn(obj[key], key);
    }
  }
};
},{}],"../aQua/src/utils/Khala.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Khala =
/*#__PURE__*/
function () {
  function Khala() {
    var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object.create(null);

    _classCallCheck(this, Khala);

    this.events = events;
  }

  _createClass(Khala, [{
    key: "on",
    value: function on(event, fn) {
      (this.events[event] || (this.events[event] = [])).push(fn);
      return this;
    }
  }, {
    key: "off",
    value: function off(event, fn) {
      if (arguments.length === 0) {
        this.events = Object.create(null);
        return this;
      }

      var cbs = this.events[event];

      if (!cbs) {
        return this;
      }

      if (!fn) {
        this.events[event] = null;
        return this;
      }

      for (var i = 0; i < cbs.length; i++) {
        if (cbs[i] === fn) {
          cbs.splice(i, i);
          break;
        }
      }

      return this;
    }
  }, {
    key: "emit",
    value: function emit(event) {
      var cbs = this.events[event];

      if (cbs) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        for (var i = 0; i < cbs.length; i++) {
          cbs[i].apply(null, args);
        }
      } else {
        console.warn("event ".concat(event, " is not exist"));
      }
    }
  }, {
    key: "once",
    value: function once(event, fn) {
      var _this = this;

      var on = function on() {
        _this.off(event);

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        fn.apply(null, args);
      };

      this.on(event, on);
      return this;
    }
  }]);

  return Khala;
}();

module.exports = Khala;
},{}],"../aQua/src/utils/Kizuna.js":[function(require,module,exports) {
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var KEYBOARD_MAP = {
  'backspace': 8,
  'tab': 9,
  'enter': 13,
  'shift': 16,
  'ctrl': 17,
  'alt': 18,
  'esc': 27,
  'space': 32,
  'pageup': 33,
  'pagedown': 34,
  'end': 35,
  'home': 36,
  '←': 37,
  'left': 37,
  'arrow-left': 37,
  '↑': 38,
  'up': 38,
  'arrow-up': 38,
  '→': 39,
  'right': 39,
  'arrow-right': 39,
  '↓': 40,
  'down': 40,
  'arrow-down': 40,
  'insert': 45,
  'delete': 46,
  '\'': 222
};
var MOUSE_MAP = {
  'leftmousedown': 1,
  'rightmousedown': 3,
  'scrollmousedown': 2,
  'leftmousemove': 4,
  'rightmousemove': 6,
  'scrollmousemove': 5,
  'leftmouseup': 7,
  'rightmouseup': 9,
  'scrollmouseup': 8,
  'shift': 160,
  'ctrl': 170,
  'alt': 180
};

var Kizuna =
/*#__PURE__*/
function () {
  function Kizuna() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$mouseKeyAlias = _ref.mouseKeyAlias,
        mouseKeyAlias = _ref$mouseKeyAlias === void 0 ? Object.create(null) : _ref$mouseKeyAlias,
        _ref$keyboardKeyAlias = _ref.keyboardKeyAlias,
        keyboardKeyAlias = _ref$keyboardKeyAlias === void 0 ? Object.create(null) : _ref$keyboardKeyAlias,
        _ref$keyboardEvents = _ref.keyboardEvents,
        keyboardEvents = _ref$keyboardEvents === void 0 ? [] : _ref$keyboardEvents,
        _ref$mouseEvents = _ref.mouseEvents,
        mouseEvents = _ref$mouseEvents === void 0 ? Object.create(null) : _ref$mouseEvents;

    _classCallCheck(this, Kizuna);

    this.keyboardKeyAlias = _objectSpread({}, KEYBOARD_MAP, {}, keyboardKeyAlias);
    this.mouseKeyAlias = _objectSpread({}, MOUSE_MAP, {}, mouseKeyAlias);
    this.keyboardEvents = keyboardEvents;
    this.mouseEvents = mouseEvents;
    this.break = '+';
    this.keydowns = [];
    this.mouseId = 0;
    this.mouseState = Object.create(null);
  }

  _createClass(Kizuna, [{
    key: "resetState",
    value: function resetState() {
      this.keydowns = [];
      this.mouseState = Object.create(null);
    }
  }, {
    key: "load",
    value: function load(keys, fn, type) {
      var _this = this;

      if (type === 'keyboard') {
        var permutation = [];
        var id = -1;

        if (typeof keys === 'string') {
          id = keys.trim().toLowerCase().split(this.break).reduce(function (total, key) {
            var keyCode = _this.getKeyboardKeyCode(key.trim());

            permutation.push(keyCode);
            return total + keyCode;
          }, 0);
        }

        (this.keyboardEvents[id] || (this.keyboardEvents[id] = [])).push({
          permutation: permutation,
          fn: fn
        });
        return;
      }

      if (type === 'mouse') {
        var _id = -1;

        _id = keys.trim().toLowerCase().split(this.break).reduce(function (total, key) {
          return total + _this.getMouseKeyCode(key.trim());
        }, 0);
        this.mouseEvents[_id] = fn;
      }
    }
  }, {
    key: "emitKeyboardFn",
    value: function emitKeyboardFn(event, payload) {
      keydowns = this.keydowns;
      var id = 0;

      for (var i = 0; i < keydowns.length; i++) {
        id = id + keydowns[i];
      }

      var events = this.keyboardEvents[id];
      if (!events) return;

      out: for (var _i = 0; _i < events.length; _i++) {
        var _events$_i = events[_i],
            permutation = _events$_i.permutation,
            fn = _events$_i.fn;

        for (var j = 0; j < keydowns.length; j++) {
          if (permutation.indexOf(keydowns[j]) === -1) {
            continue out;
          }
        }

        fn(event, payload);
      }
    }
  }, {
    key: "emitMouseFn",
    value: function emitMouseFn(event, payload) {
      var events = this.mouseEvents[this.mouseId];
      events && events(event, payload);
    }
  }, {
    key: "on",
    value: function on(ele, eventType, fn) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
        capture: false,
        passive: false,
        once: false
      };

      if (eventType === 'scroll') {
        this.on(ele, 'mousewheel', function (event) {
          event.delta = event.wheelDelta > 0 ? -1 : 1;
          fn(event);
        }, options);
        this.on(ele, 'DOMMouseScroll', function (event) {
          event.delta = event.detail > 0 ? 1 : -1;
          fn(event);
        }, options);
        return;
      }

      ele.addEventListener(eventType, fn, options);
    }
  }, {
    key: "filterMousedown",
    value: function filterMousedown(event) {
      var id = event.which;
      id = id + this.getStateBonus(event);
      this.mouseId = id;
      this.mouseState = Object.create(null);
      this.emitMouseFn(event, this.mouseState);
    }
  }, {
    key: "filterMousemove",
    value: function filterMousemove(event) {
      var id = (event.which || 1) + 3;
      id = id + this.getStateBonus(event);
      this.mouseId = id;
      this.emitMouseFn(event, this.mouseState);
    }
  }, {
    key: "filterMouseup",
    value: function filterMouseup(event) {
      var id = event.which + 6;
      id = id + this.getStateBonus(event);
      this.mouseId = id;
      this.emitMouseFn(event, this.mouseState);
    }
  }, {
    key: "filterKeydown",
    value: function filterKeydown(event) {
      var keyCode = event.keyCode;
      var keydownIndex = this.keydowns.indexOf(keyCode);

      if (!event.shiftKey) {
        var shiftKeyPos = this.keydowns.indexOf(16);

        if (shiftKeyPos !== -1) {
          this.keydowns.splice(shiftKeyPos, 1);
        }
      }

      if (!event.ctrlKey) {
        var ctrlKeyPos = this.keydowns.indexOf(17);

        if (ctrlKeyPos !== -1) {
          this.keydowns.splice(ctrlKeyPos, 1);
        }
      }

      if (!event.altKey) {
        var altKeyPos = this.keydowns.indexOf(18);

        if (altKeyPos !== -1) {
          this.keydowns.splice(altKeyPos, 1);
        }
      }

      if (keydownIndex === -1) {
        this.keydowns.push(keyCode);
      }

      this.emitKeyboardFn(event);
    }
  }, {
    key: "filterKeyup",
    value: function filterKeyup(event) {
      var keyCode = event.keyCode;
      var keydownIndex = this.keydowns.indexOf(keyCode);
      /* 减去输入法开启时造成的残留 */

      var progressIndex = this.keydowns.indexOf(229);

      if (progressIndex !== -1) {
        this.keydowns.splice(progressIndex, 1);
      }

      if (!event.shiftKey && keydownIndex !== -1) {
        this.keydowns.splice(keydownIndex, 1);
      }

      if (!event.ctrlKey && keydownIndex !== -1) {
        this.keydowns.splice(keydownIndex, 1);
      }

      if (!event.altKey && keydownIndex !== -1) {
        this.keydowns.splice(keydownIndex, 1);
      }

      if (keyCode !== 16 && keyCode !== 17 && keyCode !== 18 && keydownIndex !== -1) {
        this.keydowns.splice(keydownIndex, 1);
      }
    }
  }, {
    key: "filterInput",
    value: function filterInput(event) {
      console.error('event', event);
    }
  }, {
    key: "setKeyboardKeyAlias",
    value: function setKeyboardKeyAlias(name, code) {
      this.keyboardKeyAlias[name] = code;
    }
  }, {
    key: "setMouseKeyAlias",
    value: function setMouseKeyAlias(name, code) {
      this.mouseKeyAlias[name] = code;
    }
    /* Private  */

  }, {
    key: "getKeyboardKeyCode",
    value: function getKeyboardKeyCode(key) {
      return this.keyboardKeyAlias[key] || key.toUpperCase().charCodeAt(0);
    }
  }, {
    key: "getMouseKeyCode",
    value: function getMouseKeyCode(key) {
      return this.mouseKeyAlias[key];
    }
  }, {
    key: "getStateBonus",
    value: function getStateBonus(event) {
      var id = 0;

      if (event.shiftKey) {
        id = id + 160;
      }

      if (event.ctrlKey) {
        id = id + 170;
      }

      if (event.altKey) {
        id = id + 180;
      }

      return id;
    }
  }]);

  return Kizuna;
}();

module.exports = Kizuna;
},{}],"../aQua/src/utils/Limiter.js":[function(require,module,exports) {
function getCurrentTime() {
  return new Date().getTime();
}

module.exports = {
  debounce: function debounce(fn) {
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
    var timeoutId = 0;
    return function () {
      clearTimeout(timeoutId);

      for (var _len = arguments.length, payload = new Array(_len), _key = 0; _key < _len; _key++) {
        payload[_key] = arguments[_key];
      }

      timeoutId = setTimeout.apply(void 0, [fn, timeout].concat(payload));
    };
  },
  limit: function limit(fn) {
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 17;
    var lastTimeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 17;
    var timeoutId = null;
    var lastTime = 0;
    return function () {
      for (var _len2 = arguments.length, payload = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        payload[_key2] = arguments[_key2];
      }

      clearTimeout(timeoutId);

      if (getCurrentTime() - lastTime >= timeout) {
        lastTime = getCurrentTime();
        fn.apply(void 0, payload);
      } else {
        timeoutId = setTimeout(function () {
          lastTime = getCurrentTime();
          fn.apply(void 0, payload);
        }, lastTimeout);
      }
    };
  },
  toNextTick: function toNextTick(fn) {
    var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 17;
    var lastTime = 0;
    var busy = false;
    return function () {
      for (var _len3 = arguments.length, payload = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        payload[_key3] = arguments[_key3];
      }

      if (busy) {
        return;
      }

      busy = true;
      setTimeout(function () {
        fn.apply(void 0, payload);
        lastTime = getCurrentTime();
        busy = false;
      }, Math.max(0, timeout - getCurrentTime() + lastTime));
    };
  }
};
},{}],"../aQua/src/utils/Marker.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Marker =
/*#__PURE__*/
function () {
  function Marker() {
    var marks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object.create(null);

    _classCallCheck(this, Marker);

    this.marks = marks;
  }

  _createClass(Marker, [{
    key: "load",
    value: function load(name, mark) {
      var onUse = null;

      if (mark.once) {
        if (mark.nextTick) {
          onUse = function onUse(obj, name) {
            for (var _len = arguments.length, payload = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
              payload[_key - 2] = arguments[_key];
            }

            var result = mark.effect.apply(mark, payload);
            setTimeout(function () {
              obj[name] = false;
            });
            return result;
          };
        } else {
          onUse = function onUse(obj, name) {
            for (var _len2 = arguments.length, payload = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
              payload[_key2 - 2] = arguments[_key2];
            }

            var result = mark.effect.apply(mark, payload);
            obj[name] = false;
            return result;
          };
        }
      } else {
        if (isNaN(mark.hp)) {// #Error
        }

        if (mark.nextTick) {
          onUse = function onUse(obj, name) {
            for (var _len3 = arguments.length, payload = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
              payload[_key3 - 2] = arguments[_key3];
            }

            var result = mark.effect.apply(mark, payload);
            setTimeout(function () {
              mark.hp = mark.hp - 1;

              if (mark.hp <= 0) {
                obj[name] = false;
              }
            });
            return result;
          };
        } else {
          onUse = function onUse(obj, name) {
            for (var _len4 = arguments.length, payload = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
              payload[_key4 - 2] = arguments[_key4];
            }

            var result = mark.effect.apply(mark, payload);
            mark.hp = mark.hp - 1;

            if (mark.hp <= 0) {
              obj[name] = false;
            }

            return result;
          };
        }
      }

      this.marks[name] = onUse;
    }
  }, {
    key: "use",
    value: function use(obj, name) {
      var onUse = this.get(name);

      if (!onUse) {// #Error
      }

      if (obj[name] === true) {
        for (var _len5 = arguments.length, payload = new Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
          payload[_key5 - 2] = arguments[_key5];
        }

        return onUse.apply(void 0, [obj, name].concat(payload));
      }
    }
  }, {
    key: "mark",
    value: function mark(obj, name) {
      obj[name] = true;
    }
  }, {
    key: "isMarked",
    value: function isMarked(obj, name) {
      return obj[name] === true;
    }
  }, {
    key: "get",
    value: function get(name) {
      return this.marks[name];
    }
  }]);

  return Marker;
}();

module.exports = Marker;
},{}],"../aQua/src/utils/Progress.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Progress =
/*#__PURE__*/
function () {
  function Progress() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$progress = _ref.progress,
        progress = _ref$progress === void 0 ? 0 : _ref$progress,
        _ref$max = _ref.max,
        max = _ref$max === void 0 ? 100 : _ref$max,
        _ref$onstart = _ref.onstart,
        onstart = _ref$onstart === void 0 ? null : _ref$onstart,
        _ref$onprogress = _ref.onprogress,
        onprogress = _ref$onprogress === void 0 ? null : _ref$onprogress,
        _ref$onend = _ref.onend,
        onend = _ref$onend === void 0 ? null : _ref$onend;

    _classCallCheck(this, Progress);

    this.progress = 0;
    this.max = 100;
    this.onstart = onstart;
    this.onprogress = onprogress;
    this.onend = onend;
    this.isStart = false;
  }

  _createClass(Progress, [{
    key: "set",
    value: function set(progress) {
      for (var _len = arguments.length, payload = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        payload[_key - 1] = arguments[_key];
      }

      if (this.isStart) {} else {
        this.isStart = true;
        this.onstart && this.onstart.apply(this, [this.progress, this.max].concat(payload));
      }

      this.progress = progress;
      this.onprogress && this.onprogress.apply(this, [this.progress, this.max].concat(payload));

      if (this.progress >= this.max) {
        this.progress = this.max;
        this.onend && this.onend.apply(this, [this.progress, this.max].concat(payload));
      }
    }
  }, {
    key: "add",
    value: function add(progress) {
      for (var _len2 = arguments.length, payload = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        payload[_key2 - 1] = arguments[_key2];
      }

      this.set.apply(this, [this.progress + progress].concat(payload));
    }
  }]);

  return Progress;
}();

module.exports = Progress;
},{}],"../aQua/src/utils/Range.js":[function(require,module,exports) {
module.exports = {
  create: function create(node, start, end) {
    var range = document.createRange();
    range.setStart(node, start);
    range.setEnd(node, end);
    return range;
  }
};
},{}],"../aQua/src/utils/SimpleSet.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SimpleSet =
/*#__PURE__*/
function () {
  function SimpleSet() {
    var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var unique = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object.create(null);

    _classCallCheck(this, SimpleSet);

    this.arr = arr;
    this.unique = unique;
  }

  _createClass(SimpleSet, [{
    key: "add",
    value: function add(name, payload) {
      var index = this.unique[name];

      if (index !== undefined) {
        this.arr[index] = null;
      }

      this.unique[name] = this.arr.length;
      this.arr.push({
        name: name,
        payload: payload
      });
    }
  }, {
    key: "use",
    value: function use() {
      var arr = this.arr;
      this.reset();
      return [arr, function (arr, cb) {
        for (var i = 0; i < arr.length; i++) {
          var item = arr[i];

          if (item === null) {
            continue;
          }

          cb(item);
        }
      }];
    }
  }, {
    key: "reset",
    value: function reset() {
      this.unique = Object.create(null);
      this.arr = [];
    }
  }]);

  return SimpleSet;
}();

module.exports = SimpleSet;
},{}],"../aQua/src/utils/SizeObserver.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SizeObserver =
/*#__PURE__*/
function () {
  function SizeObserver() {
    var _this = this;

    _classCallCheck(this, SizeObserver);

    this.map = new Map();
    this.resizeObserver = new ResizeObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];

        var cb = _this.map.get(entry.target);

        cb && cb(entry);
      }
    });
  }

  _createClass(SizeObserver, [{
    key: "observe",
    value: function observe($ele) {
      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.map.set($ele, cb);
      this.resizeObserver.observe($ele);
    }
  }, {
    key: "unobserve",
    value: function unobserve($ele) {
      this.map.delete($ele);
      this.resizeObserver.unobserve($ele);
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      this.map.clear();
      this.resizeObserver.disconnect();
    }
  }]);

  return SizeObserver;
}();

module.exports = SizeObserver;
},{}],"../aQua/src/utils/TrieTree.js":[function(require,module,exports) {
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ConsumeCount = {
  Zero: 0,
  Part: 1,
  All: 2
};
var EndOfWord = true;
var NotEndOfWord = false;

var TrieNode =
/*#__PURE__*/
function () {
  function TrieNode() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var isEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    _classCallCheck(this, TrieNode);

    this.value = value;
    this.isEnd = isEnd;
    this.children = children;
  }
  /**
   * 消耗 str
   * @param  {[type]} str [需要消耗的字符串]
   * @return {Array<Number, TrieNode, ConsumeCount>}     [[str 消耗的字符, 消耗字符的节点, 消耗字符的节点的消耗字符的数量的类型]]
   */


  _createClass(TrieNode, [{
    key: "consume",
    value: function consume(str) {
      var targetNode = null;
      var targetValue = '';
      var children = this.children;

      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var childValue = child.value;

        if (childValue[0] === str[0]) {
          targetNode = child;
          targetValue = childValue;
          break;
        }
      }

      if (!targetNode) {
        return [0, this, ConsumeCount.Zero];
      }

      var pointer = 0;

      for (; pointer < targetValue.length; pointer++) {
        if (targetValue[pointer] !== str[pointer]) {
          return [pointer, targetNode, ConsumeCount.Part];
        }
      }

      return [pointer, targetNode, ConsumeCount.All];
    }
  }]);

  return TrieNode;
}();

var TrieTree =
/*#__PURE__*/
function () {
  function TrieTree(strs) {
    _classCallCheck(this, TrieTree);

    this.root = new TrieNode();
  }

  _createClass(TrieTree, [{
    key: "addAsArray",
    value: function addAsArray(strArr) {
      for (var i = 0; i < strArr.length; i++) {
        this.add(strArr[i]);
      }
    }
    /**
     * 添加一个 String 到该树中
     */

  }, {
    key: "add",
    value: function add(str) {
      if (str.length < 1) {
        return;
      }

      var strLength = str.length;
      var currentStr = str;

      for (var strPointer = 0, currentNode = this.root; currentNode != null;) {
        var _currentNode$consume = currentNode.consume(currentStr),
            _currentNode$consume2 = _slicedToArray(_currentNode$consume, 3),
            move = _currentNode$consume2[0],
            nextNode = _currentNode$consume2[1],
            consumedCountType = _currentNode$consume2[2];

        if (consumedCountType === ConsumeCount.Zero) {
          nextNode.children.push(new TrieNode(currentStr, EndOfWord));
          return;
        }

        var nextNodeValue = nextNode.value;

        if (consumedCountType === ConsumeCount.Part) {
          nextNode.children = [new TrieNode(nextNodeValue.substring(move, nextNodeValue.length), EndOfWord, nextNode.children)];
          nextNode.value = nextNodeValue.substring(0, move);
          nextNode.isEnd = NotEndOfWord;
        }

        strPointer = strPointer + move;

        if (strPointer === strLength) {
          nextNode.isEnd = EndOfWord;
          return;
        }

        currentStr = str.substring(strPointer, strLength);
        currentNode = nextNode;
      }
    }
    /**
     * 查找 str 为前缀的所有 word
     * @param  {String} str [需要查找的前缀]
     * @return {Array<String>}
     */

  }, {
    key: "startsWith",
    value: function startsWith() {
      var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var prefix = '';
      var currentStr = str;
      var targetNode = null;
      var isTerminate = true;

      outer: for (var currentNode = this.root; currentNode.children.length !== 0;) {
        var children = currentNode.children;

        inner: for (var i = 0; i < children.length; i++) {
          var nextNode = children[i];
          var nextNodeValue = nextNode.value;
          var nextNodeValueLength = nextNodeValue.length;

          if (currentStr.length <= nextNodeValueLength) {
            // 成功匹配, 直接退出
            if (nextNodeValue.startsWith(currentStr)) {
              targetNode = nextNode;
              break outer;
            } // 匹配失败, 尝试下一个


            continue;
          }

          if (!currentStr.startsWith(nextNodeValue)) {
            // 匹配失败, 尝试下一个
            continue;
          } // 匹配成功了前缀的一部分, 替换 currentNode 为匹配成功的 nextNode


          currentNode = nextNode;
          currentStr = currentStr.substring(nextNodeValueLength);
          prefix = prefix + nextNodeValue; // 如果走完了循环依然没有匹配到部分前缀, 或者全部前缀, 那么就是匹配失败
          // 这里为了绕过这个逻辑, 使用了一个标识

          isTerminate = false;
          break inner;
        }

        if (isTerminate) {
          return [];
        } else {
          isTerminate = true;
        }
      } // 如果树内没有任何节点


      if (!targetNode) {
        return [];
      }

      return this.collect(targetNode, prefix);
    }
    /**
     * 收集一个节点下的所有 word
     * @param  {TrieNode} trieNode [需要收集的节点]
     * @param  {String} prefix   [需要加上的前缀]
     * @return {Array<String>}
     */

  }, {
    key: "collect",
    value: function collect() {
      var trieNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.root;
      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      var collectWord = function collectWord(trieNode, prefix, collector) {
        prefix = prefix + trieNode.value;

        if (trieNode.isEnd) {
          collector.push(prefix);
        }

        var children = trieNode.children;

        for (var i = 0; i < children.length; i++) {
          collectWord(children[i], prefix, collector);
        }

        return collector;
      };

      return collectWord(trieNode, prefix, []);
    }
  }]);

  return TrieTree;
}();

module.exports = TrieTree;
},{}],"../aQua/src/utils/SpecialCharSet.js":[function(require,module,exports) {
module.exports = {
  ZeroWidthSpace: '​' // &#8203;

};
},{}],"../aQua/src/utils/Noop.js":[function(require,module,exports) {
function Noop() {}

module.exports = Noop;
},{}],"../aQua/src/utils/rAF.js":[function(require,module,exports) {
module.exports = window.requestAnimationFrame;
},{}],"../aQua/src/utils/Echo.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Echo =
/*#__PURE__*/
function () {
  function Echo() {
    _classCallCheck(this, Echo);
  }

  _createClass(Echo, [{
    key: "error",
    value: function error(errorType, msg) {
      console.error("".concat(errorType, ": ").concat(msg));
    }
  }]);

  return Echo;
}();

module.exports = Echo;
},{}],"../aQua/src/utils/index.js":[function(require,module,exports) {
var Algorithm = require('./Algorithm');

var DataTransferItemHandler = require('./DataTransferItemHandler');

var DOM = require('./DOM');

var Iterator = require('./Iterator');

var Khala = require('./Khala');

var Kizuna = require('./Kizuna');

var Limiter = require('./Limiter');

var Marker = require('./Marker');

var Progress = require('./Progress');

var Range = require('./Range');

var SimpleSet = require('./SimpleSet');

var SizeObserver = require('./SizeObserver');

var TrieTree = require('./TrieTree');

var SpecialCharSet = require('./SpecialCharSet');

var Noop = require('./Noop');

var rAF = require('./rAF');

var Echo = require('./Echo');

module.exports = {
  Algorithm: Algorithm,
  DataTransferItemHandler: DataTransferItemHandler,
  DOM: DOM,
  Iterator: Iterator,
  Khala: Khala,
  Kizuna: Kizuna,
  Limiter: Limiter,
  Marker: Marker,
  Progress: Progress,
  Range: Range,
  SimpleSet: SimpleSet,
  SizeObserver: SizeObserver,
  TrieTree: TrieTree,
  SpecialCharSet: SpecialCharSet,
  Noop: Noop,
  rAF: rAF,
  Echo: new Echo()
};
},{"./Algorithm":"../aQua/src/utils/Algorithm.js","./DataTransferItemHandler":"../aQua/src/utils/DataTransferItemHandler.js","./DOM":"../aQua/src/utils/DOM.js","./Iterator":"../aQua/src/utils/Iterator.js","./Khala":"../aQua/src/utils/Khala.js","./Kizuna":"../aQua/src/utils/Kizuna.js","./Limiter":"../aQua/src/utils/Limiter.js","./Marker":"../aQua/src/utils/Marker.js","./Progress":"../aQua/src/utils/Progress.js","./Range":"../aQua/src/utils/Range.js","./SimpleSet":"../aQua/src/utils/SimpleSet.js","./SizeObserver":"../aQua/src/utils/SizeObserver.js","./TrieTree":"../aQua/src/utils/TrieTree.js","./SpecialCharSet":"../aQua/src/utils/SpecialCharSet.js","./Noop":"../aQua/src/utils/Noop.js","./rAF":"../aQua/src/utils/rAF.js","./Echo":"../aQua/src/utils/Echo.js"}],"../aQua/src/components/ActionMgr.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ActionMgr =
/*#__PURE__*/
function () {
  function ActionMgr(aqua) {
    _classCallCheck(this, ActionMgr);

    this.aqua = aqua;
    this.chronicle = aqua.chronicle;
    this.actions = Object.create(null);
  }

  _createClass(ActionMgr, [{
    key: "exec",
    value: function exec(name) {
      var instance = this.get(name);

      for (var _len = arguments.length, payload = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        payload[_key - 1] = arguments[_key];
      }

      return instance.exec.apply(instance, [this.aqua].concat(payload));
    }
  }, {
    key: "execWithName",
    value: function execWithName(name, fnName) {
      var instance = this.get(name);

      for (var _len2 = arguments.length, payload = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        payload[_key2 - 2] = arguments[_key2];
      }

      return instance[fnName].apply(instance, [this.aqua].concat(payload));
    }
  }, {
    key: "get",
    value: function get(name) {
      return this.actions[name];
    }
  }, {
    key: "load",
    value: function load(Action) {
      var _this = this;

      var instance = new Action();
      var customMerge = instance.customMerge ? instance.merge : null;
      this.actions[instance.name] = instance;

      if (!instance.shortcuts) {
        return;
      }

      for (var i = 0; i < instance.shortcuts.length; i++) {
        var shortcut = instance.shortcuts[i];

        if (instance.record) {
          this.aqua.kizuna.load(shortcut, function (event, payload) {
            var name = instance.name;

            _this.chronicle.start(name, _this.aqua.cursorMgr.extract());

            instance.exec(_this.aqua, event, payload);

            _this.chronicle.end(name, _this.aqua.cursorMgr.extract(), customMerge);
          }, instance.eventType);
        } else {
          this.aqua.kizuna.load(shortcut, function (event, payload) {
            var name = instance.name;
            instance.exec(_this.aqua, event, payload);
          }, instance.eventType);
        }
      }
    }
  }]);

  return ActionMgr;
}();

module.exports = ActionMgr;
},{}],"../aQua/src/models/CatalogueNode.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CatalogueNode =
/*#__PURE__*/
function () {
  function CatalogueNode() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$type = _ref.type,
        type = _ref$type === void 0 ? null : _ref$type,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? '' : _ref$name,
        _ref$ext = _ref.ext,
        ext = _ref$ext === void 0 ? '' : _ref$ext,
        _ref$src = _ref.src,
        src = _ref$src === void 0 ? '' : _ref$src,
        _ref$children = _ref.children,
        children = _ref$children === void 0 ? [] : _ref$children,
        _ref$status = _ref.status,
        status = _ref$status === void 0 ? Object.create(null) : _ref$status;

    _classCallCheck(this, CatalogueNode);

    this.type = type;
    this.name = name;
    this.ext = ext;
    this.src = src;
    this.children = children;
    this.status = status;
  }

  _createClass(CatalogueNode, [{
    key: "filename",
    get: function get() {
      var ext = this.ext.length > 0 ? '.' + this.ext : this.ext;
      return this.name + ext;
    },
    set: function set(filename) {
      var words = filename.split('.');
      this.ext = words[words.length - 1];
      this.name = words.slice(0, words.length - 1).join('.');
    }
  }]);

  return CatalogueNode;
}();

module.exports = CatalogueNode;
},{}],"../aQua/src/models/Chunk.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Chunk =
/*#__PURE__*/
function () {
  function Chunk() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$parent = _ref.parent,
        parent = _ref$parent === void 0 ? null : _ref$parent,
        _ref$children = _ref.children,
        children = _ref$children === void 0 ? [] : _ref$children,
        _ref$size = _ref.size,
        size = _ref$size === void 0 ? 0 : _ref$size,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? 0 : _ref$height,
        _ref$status = _ref.status,
        status = _ref$status === void 0 ? null : _ref$status,
        _ref$tag = _ref.tag,
        tag = _ref$tag === void 0 ? null : _ref$tag,
        _ref$level = _ref.level,
        level = _ref$level === void 0 ? 0 : _ref$level,
        _ref$chunkVolume = _ref.chunkVolume,
        chunkVolume = _ref$chunkVolume === void 0 ? 20 : _ref$chunkVolume,
        _ref$volume = _ref.volume,
        volume = _ref$volume === void 0 ? 128 : _ref$volume;

    _classCallCheck(this, Chunk);

    this._size = 0;
    this.parent = parent;
    this.children = children;
    this.size = size;
    this.height = height;
    this.status = status;
    this.tag = tag;
    this.level = level;
    this.chunkVolume = chunkVolume;
    this.volume = volume;
  }

  _createClass(Chunk, [{
    key: "get",
    value: function get(index) {
      return this.children[index];
    }
  }, {
    key: "bubble",
    value: function bubble(cb) {
      if (cb(this) === false) {
        return null;
      }

      return this.parent !== null ? this.parent.bubble(cb) : null;
    }
  }, {
    key: "clone",
    value: function clone() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new Chunk(_objectSpread({
        parent: this.parent,
        children: [],
        size: 0,
        height: 0,
        status: this.status,
        tag: this.tag,
        level: this.level,
        chunkVolume: this.chunkVolume,
        volume: this.volume
      }, options));
    }
  }, {
    key: "splice",
    value: function splice(start, deleteCount) {
      var items = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      if (items !== null) {
        var _this$children;

        return (_this$children = this.children).splice.apply(_this$children, [start, deleteCount].concat(_toConsumableArray(items)));
      } else {
        return this.children.splice(start, deleteCount);
      }
    }
    /**
     * 不检测 parent 的存在，请求前必须保证 parent 的存在
     * @return {number} 自身在 parent 中的 index
     */

  }, {
    key: "selfIndex",
    value: function selfIndex() {
      return this.parent.children.indexOf(this);
    }
  }, {
    key: "size",
    set: function set(s) {
      if (this.level === 0) {
        return;
      }

      this._size = s;
    },
    get: function get() {
      return this.level === 0 ? this.children.length : this._size;
    }
  }, {
    key: "length",
    get: function get() {
      return this.children.length;
    }
  }]);

  return Chunk;
}();

module.exports = Chunk;
},{}],"../aQua/src/enums/ActionEventType.js":[function(require,module,exports) {
module.exports = {
  Keyboard: 'keyboard',
  Mouse: 'mouse'
};
},{}],"../aQua/src/enums/ArgOpt.js":[function(require,module,exports) {
module.exports = {
  /* Korwa */
  EnableDefineProperty: true,

  /* Viewport */
  SkipVisionCheck: true,

  /* Selection */
  SelectionDirectionIsNone: 0,
  SelectionDirectionIsTopLeft: -1,
  SelectionDirectionIsBottomRight: 1,

  /* Coord */
  ContainEqual: true
};
},{}],"../aQua/src/enums/CatalogueNodeType.js":[function(require,module,exports) {
module.exports = {
  Project: 1,
  Folder: 2,
  File: 3
};
},{}],"../aQua/src/enums/ChronicleStatus.js":[function(require,module,exports) {
module.exports = {
  Pending: 1,
  Recording: 2
};
},{}],"../aQua/src/enums/CSSVariables.js":[function(require,module,exports) {
module.exports = {
  LineWidth: '--line-width',
  RamWidth: '--ram-width',
  Progress: '--progress'
};
},{}],"../aQua/src/enums/HTMLVariables.js":[function(require,module,exports) {
module.exports = {
  DisableMouseEvent: 'aqua-disable-mouse-event'
};
},{}],"../aQua/src/enums/LineStatus.js":[function(require,module,exports) {
module.exports = {
  DELETED: -1,
  HIDDEN: 0,
  CREATED: 1,
  DONE: 2,
  UPDATED: 3,
  explain: function explain(num) {
    if (num === 2) {
      return 'DONE';
    }

    if (num === 1) {
      return 'CREATED';
    }

    if (num === 3) {
      return 'UPDATED';
    }

    if (num === -1) {
      return 'DELETED';
    }

    if (num === 0) {
      return 'HIDDEN';
    }
  }
};
},{}],"../aQua/src/enums/PluginType.js":[function(require,module,exports) {
module.exports = {
  Custom: 1,
  Buildin: 2
};
},{}],"../aQua/src/enums/index.js":[function(require,module,exports) {
var ActionEventType = require('./ActionEventType');

var ArgOpt = require('./ArgOpt');

var CatalogueNodeType = require('./CatalogueNodeType');

var ChronicleStatus = require('./ChronicleStatus');

var CSSVariables = require('./CSSVariables');

var HTMLVariables = require('./HTMLVariables');

var LineStatus = require('./LineStatus');

var PluginType = require('./PluginType');

module.exports = {
  ActionEventType: ActionEventType,
  ArgOpt: ArgOpt,
  CatalogueNodeType: CatalogueNodeType,
  ChronicleStatus: ChronicleStatus,
  CSSVariables: CSSVariables,
  HTMLVariables: HTMLVariables,
  LineStatus: LineStatus,
  PluginType: PluginType
};
},{"./ActionEventType":"../aQua/src/enums/ActionEventType.js","./ArgOpt":"../aQua/src/enums/ArgOpt.js","./CatalogueNodeType":"../aQua/src/enums/CatalogueNodeType.js","./ChronicleStatus":"../aQua/src/enums/ChronicleStatus.js","./CSSVariables":"../aQua/src/enums/CSSVariables.js","./HTMLVariables":"../aQua/src/enums/HTMLVariables.js","./LineStatus":"../aQua/src/enums/LineStatus.js","./PluginType":"../aQua/src/enums/PluginType.js"}],"../aQua/src/models/Content.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../enums/index'),
    ContentType = _require.ContentType;

var Content =
/*#__PURE__*/
function () {
  function Content() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$value = _ref.value,
        value = _ref$value === void 0 ? '' : _ref$value,
        _ref$type = _ref.type,
        type = _ref$type === void 0 ? ContentType.TEXT : _ref$type,
        _ref$next = _ref.next,
        next = _ref$next === void 0 ? null : _ref$next,
        _ref$prev = _ref.prev,
        prev = _ref$prev === void 0 ? null : _ref$prev;

    _classCallCheck(this, Content);

    this.value = value;
    this.type = type;
    this.next = next;
    this.prev = prev;
  }

  _createClass(Content, [{
    key: "setPrev",
    value: function setPrev(prev) {
      this.prev = prev;
      prev && (prev.next = this);
      return prev;
    }
  }, {
    key: "setNext",
    value: function setNext(next) {
      this.next = next;
      next && (next.prev = this);
      return next;
    }
  }, {
    key: "insert",
    value: function insert(content) {
      var contentNext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.next;
      content.tail().setNext(contentNext);
      this.setNext(content);
      return this;
    }
  }, {
    key: "append",
    value: function append(content) {
      this.tail().setNext(content);
      return content;
    }
  }, {
    key: "search",
    value: function search(x) {
      var targetContent = null;
      this.traverseAll(function (contentIns) {
        var type = contentIns.type;
        var len = type === ContentType.TEXT ? contentIns.value.length : 1;

        if (x <= len) {
          targetContent = contentIns;
          return false;
        }

        x = x - len;
      });
      return {
        content: targetContent,
        index: x
      };
    }
  }, {
    key: "currentSize",
    value: function currentSize() {
      var type = this.type;

      if (type === ContentType.IMAGE) {
        return 1;
      } else {
        return this.value.length;
      }
    }
  }, {
    key: "size",
    value: function size() {
      var effect = 0;
      this.traverseAll(function (contentIns) {
        effect = effect + contentIns.currentSize();
      });
      return effect;
    }
  }, {
    key: "traverse",
    value: function traverse(cb) {
      if (this.next) {
        if (cb(this.next) === false) {
          return null;
        }

        return this.next.traverse(cb);
      }

      return null;
    }
  }, {
    key: "traverseAll",
    value: function traverseAll(cb) {
      if (cb(this) === false) {
        return null;
      }

      return this.traverse(cb);
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Content({
        value: this.value,
        type: this.type,
        next: this.next,
        prev: this.prev
      });
    }
  }, {
    key: "tail",
    value: function tail() {
      var tail = this;
      this.traverse(function (contentIns) {
        tail = contentIns;
      });
      return tail;
    }
  }]);

  return Content;
}();

module.exports = Content;
},{"../enums/index":"../aQua/src/enums/index.js"}],"../aQua/src/models/Coord.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Coord =
/*#__PURE__*/
function () {
  function Coord() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$y = _ref.y,
        y = _ref$y === void 0 ? 0 : _ref$y,
        _ref$x = _ref.x,
        x = _ref$x === void 0 ? 0 : _ref$x,
        _ref$insideY = _ref.insideY,
        insideY = _ref$insideY === void 0 ? 0 : _ref$insideY,
        _ref$maxInsideY = _ref.maxInsideY,
        maxInsideY = _ref$maxInsideY === void 0 ? 0 : _ref$maxInsideY;

    _classCallCheck(this, Coord);

    this.y = y;
    this.x = x;
    this.insideY = insideY;
    this.maxInsideY = maxInsideY;
  }

  _createClass(Coord, [{
    key: "assign",
    value: function assign(coord) {
      this.y = coord.y;
      this.x = coord.x;
      this.insideY = coord.insideY;
      this.maxInsideY = coord.maxInsideY;
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Coord({
        y: this.y,
        x: this.x,
        insideY: this.insideY,
        maxInsideY: this.maxInsideY
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$y = _ref2.y,
          y = _ref2$y === void 0 ? 0 : _ref2$y,
          _ref2$x = _ref2.x,
          x = _ref2$x === void 0 ? 0 : _ref2$x;

      this.y = y;
      this.x = x;
    }
  }, {
    key: "extract",
    value: function extract() {
      var coord = Object.create(null);
      coord.y = this.y;
      coord.x = this.x;
      return coord;
    }
  }, {
    key: "greater",
    value: function greater(coord) {
      var equal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var diffY = this.y - coord.y;

      if (diffY > 0) {
        return true;
      }

      if (diffY < 0) {
        return false;
      }

      var diffX = this.x - coord.x;

      if (diffX > 0) {
        return true;
      }

      if (diffX < 0) {
        return false;
      }

      return equal;
    }
  }, {
    key: "less",
    value: function less(coord) {
      var equal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var diffY = this.y - coord.y;

      if (diffY < 0) {
        return true;
      }

      if (diffY > 0) {
        return false;
      }

      var diffX = this.x - coord.x;

      if (diffX < 0) {
        return true;
      }

      if (diffX > 0) {
        return false;
      }

      return equal;
    }
  }, {
    key: "equal",
    value: function equal(coord) {
      return this.y === coord.y && this.x === coord.x;
    }
  }]);

  return Coord;
}();

module.exports = Coord;
},{}],"../aQua/src/models/Doc.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Chunk = require('./Chunk');

var NO_BUBBLE = 1;
var NO_EFFECT = 2;

var Doc =
/*#__PURE__*/
function () {
  function Doc() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$root = _ref.root,
        root = _ref$root === void 0 ? new Chunk() : _ref$root;

    _classCallCheck(this, Doc);

    this.root = root;
  }

  _createClass(Doc, [{
    key: "setRoot",
    value: function setRoot(root) {
      var levelup = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      root.level = root.level + levelup;
      this.root = root;
    }
  }, {
    key: "isLeaf",
    value: function isLeaf(chunk) {
      var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      return chunk.level < base;
    }
  }, {
    key: "isRoot",
    value: function isRoot(chunk) {
      return chunk === this.root;
    }
  }, {
    key: "isLegal",
    value: function isLegal(index) {
      return index >= 0 && index < this.root.size;
    }
  }, {
    key: "getOffset",
    value: function getOffset(chunk) {
      return chunk.parent !== null ? chunk.parent.children.indexOf(chunk) : -1;
    }
  }, {
    key: "correct",
    value: function correct(index) {
      var contain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'size';

      if (index < 0) {
        return 0;
      }

      var max = this.root[type];

      if (index > max) {
        return contain ? max - 1 : max;
      }

      if (index === max) {
        return contain ? max - 1 : max;
      }

      return index;
    }
  }, {
    key: "getByHeight",
    value: function getByHeight(height) {
      var isContainBottomBorder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var chunk = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.root;
      return this._searchByHeight(this.correct(height, false, 'height'), 0, isContainBottomBorder, chunk);
    }
  }, {
    key: "_searchByHeight",
    value: function _searchByHeight(height, size) {
      var isContainBottomBorder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var chunk = arguments.length > 3 ? arguments[3] : undefined;
      var children = chunk.children;

      if (chunk.level < 1) {
        var i = 0;
        var child = null;

        for (; i < children.length; i++) {
          child = children[i];

          if (height > child.height) {
            height = height - child.height;
            size = size + 1;
            continue;
          }

          if (height === child.height && !isContainBottomBorder) {
            height = height - child.height;
            size = size + 1;
            continue;
          }

          return {
            chunk: chunk,
            offset: i,
            size: size,
            height: height
          };
        }

        return {
          chunk: chunk,
          offset: i - 1,
          size: size - 1,
          height: child.height
        };
      } else {
        for (var _i = 0; _i < children.length; _i++) {
          var _child = children[_i];

          if (height > _child.height) {
            height = height - _child.height;
            size = size + _child.size;
            continue;
          }

          return this._searchByHeight(height, size, isContainBottomBorder, _child);
        }
      }
    }
  }, {
    key: "get",
    value: function get(index) {
      var returnHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var chunk = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.root;
      return returnHeight ? this._searchWithHeight(this.correct(index, true), chunk, true, 0) : this._search(this.correct(index, true), chunk, true);
    }
  }, {
    key: "search",
    value: function search(index) {
      var chunk = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.root;
      return this._search(this.correct(index), chunk);
    }
    /* Private */

  }, {
    key: "_search",
    value: function _search(index, chunk, contain) {
      if (chunk.level < 1) {
        return {
          chunk: chunk,
          offset: index
        };
      }

      var children = chunk.children;

      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var size = child.size;

        if (index > (contain ? size - 1 : size)) {
          index = index - size;
          continue;
        }

        return this._search(index, child, contain);
      }
    }
  }, {
    key: "_searchWithHeight",
    value: function _searchWithHeight(index, chunk, contain, height) {
      if (chunk.level < 1) {
        var _children = chunk.children;

        for (var i = 0; i < index; i++) {
          height = height + _children[i].height;
        }

        return {
          chunk: chunk,
          offset: index,
          height: height
        };
      }

      var children = chunk.children;

      for (var _i2 = 0; _i2 < children.length; _i2++) {
        var child = children[_i2];
        var size = child.size;

        if (index > (contain ? size - 1 : size)) {
          index = index - size;
          height = height + child.height;
          continue;
        }

        return this._searchWithHeight(index, child, contain, height);
      }
    }
  }, {
    key: "bubble",
    value: function bubble(objs, cb, breakCb, after) {
      if (objs.length === 1 && this.isRoot(objs[0])) {
        return cb(objs[0]);
      }

      var effectObjs = [];
      var firstObj = objs[0];
      var lastParent = firstObj.parent;
      cb(firstObj, lastParent);

      for (var i = 1; i < objs.length; i++) {
        var obj = objs[i];
        var parent = obj.parent;

        if (lastParent !== parent) {
          breakCb(lastParent);
          effectObjs.push(lastParent);
        }

        cb(obj);
        lastParent = parent;
      }

      breakCb(lastParent);
      effectObjs.push(lastParent);
      after(effectObjs);
      return this.bubble(effectObjs, cb, breakCb, after);
    }
  }, {
    key: "getLeaves",
    value: function getLeaves() {
      var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.root.size;
      var chunk = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.root;
      var objs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
      start = this.correct(start);
      end = this.correct(end);
      return this._tryGetLeaves({
        start: start,
        count: end - start,
        objs: objs
      }, chunk, function (chunk, pak) {
        var harvest = chunk.children.slice(pak.start, pak.start + pak.count);
        pak.objs = pak.objs.concat(harvest);
        pak.start = 0;
        pak.count = pak.count - harvest.length;
      }).objs;
    }
  }, {
    key: "getZeroLevelChunks",
    value: function getZeroLevelChunks() {
      var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.root.size;
      var chunk = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.root;
      var chunks = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
      return this._tryGetLeaves({
        start: start,
        count: end - start,
        chunks: chunks
      }, chunk, function (chunk, pak) {
        var end = -1;
        var isEntire = false;
        var expectSize = pak.start + pak.count;
        var limitSize = chunk.size;

        if (expectSize < limitSize) {
          end = expectSize;
        } else {
          end = limitSize;
          isEntire = pak.start === 0;
        }

        pak.chunks.push({
          chunk: chunk,
          isEntire: isEntire,
          start: pak.start,
          end: end
        });
        pak.count = pak.count - (end - pak.start);
        pak.start = 0;
      }).chunks;
    }
    /* Private */

  }, {
    key: "_tryGetLeaves",
    value: function _tryGetLeaves(pak, chunk, cb) {
      if (pak.count < 1) {
        return pak;
      }

      if (this.isLeaf(chunk)) {
        cb(chunk, pak);
        return pak;
      }

      var children = chunk.children;

      for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var size = child.size;

        if (pak.start >= size) {
          pak.start = pak.start - size;
          continue;
        }

        this._tryGetLeaves(pak, children[i], cb);

        if (pak.count < 1) {
          return pak;
        }
      }

      return pak;
    }
  }, {
    key: "insert",
    value: function insert(index, objs, payload) {
      if (objs.length === 0) {
        return 0;
      }

      var _ref2 = typeof index === 'number' ? this.search(index) : index,
          chunk = _ref2.chunk,
          offset = _ref2.offset;

      chunk.splice(offset, 0, objs);
      this.onInsert && this.onInsert(chunk, objs, payload);
      var volume = chunk.level > 0 ? chunk.chunkVolume : chunk.volume;

      if (chunk.length > volume) {
        this.onOverflow && this.onOverflow(chunk);
      }
    }
    /**
     * 注意跨 chunk 删除
     */

  }, {
    key: "remove",
    value: function remove(index) {
      var deleteCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var payload = arguments.length > 2 ? arguments[2] : undefined;
      var objs = [];

      if (typeof index === 'number') {
        var effectChunks = [];
        var effectObjs = [];
        var releaseChunks = [];
        var chunks = this.getZeroLevelChunks(index, index + deleteCount);

        for (var i = 0; i < chunks.length; i++) {
          var _chunks$i = chunks[i],
              chunk = _chunks$i.chunk,
              start = _chunks$i.start,
              end = _chunks$i.end,
              isEntire = _chunks$i.isEntire;

          if (isEntire) {
            releaseChunks.push(chunk);
            objs = objs.concat(chunk.children);
          } else {
            var effectObj = chunk.splice(start, end - start);
            effectChunks.push(chunk);
            effectObjs.push(effectObj);
            objs = objs.concat(effectObj);
          }
        }

        for (var _i3 = 0; _i3 < effectChunks.length; _i3++) {
          this.onRemove && this.onRemove(effectChunks[_i3], effectObjs[_i3], payload);
        }

        releaseChunks.length > 0 && this.onRelease && this.onRelease(releaseChunks);
      } else {
        var _chunk = index.chunk,
            offset = index.offset;
        objs = _chunk.splice(offset, deleteCount);
        this.onRemove && this.onRemove(_chunk, objs, payload);
        _chunk.size === 0 && this.onRelease && this.onRelease(_chunk);
      }

      return objs;
    }
  }, {
    key: "toChunks",
    value: function toChunks(chunk, objs) {
      var copys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var volume = parseInt(chunk.level > 0 ? chunk.chunkVolume : chunk.volume);
      var count = Math.ceil(objs.length / volume);
      var floor = 0;

      for (var i = 0; i < count; i++) {
        var copy = chunk.clone({
          parent: null
        });
        this.insert({
          chunk: copy,
          offset: 0
        }, objs.slice(floor, floor = floor + volume));
        copys.push(copy);
      }

      return copys;
    }
    /* Rare */

  }, {
    key: "onInsert",
    value: function onInsert(chunk, objs, payload) {
      var effectSize = 0;
      var effectHeight = 0;

      if (this.isLeaf(chunk)) {
        effectSize = effectSize + objs.length;

        for (var i = 0; i < objs.length; i++) {
          var newcomer = objs[i];
          effectHeight = effectHeight + newcomer.height;
          newcomer.parent = chunk;
        }
      } else {
        for (var _i4 = 0; _i4 < objs.length; _i4++) {
          var _newcomer = objs[_i4];
          effectSize = effectSize + _newcomer.size;
          effectHeight = effectHeight + _newcomer.height;
          _newcomer.parent = chunk;
        }
      }

      if (payload === NO_EFFECT) {
        return;
      }

      if (payload === NO_BUBBLE) {
        chunk.size = chunk.size + effectSize;
        chunk.height = chunk.height + effectHeight;
        return;
      }

      chunk.bubble(function (chunk) {
        chunk.size = chunk.size + effectSize;
        chunk.height = chunk.height + effectHeight;
      });
    }
  }, {
    key: "onRemove",
    value: function onRemove(chunk, objs, payload) {
      if (payload === NO_EFFECT) {
        return;
      }

      var effectSize = 0;
      var effectHeight = 0;

      if (this.isLeaf(chunk)) {
        effectSize = effectSize + objs.length;

        for (var i = 0; i < objs.length; i++) {
          var existed = objs[i];
          effectHeight = effectHeight + existed.height;
        }
      } else {
        for (var _i5 = 0; _i5 < objs.length; _i5++) {
          var _existed = objs[_i5];
          effectSize = effectSize + _existed.size;
          effectHeight = effectHeight + _existed.height;
        }
      }

      if (payload === NO_BUBBLE) {
        chunk.size = chunk.size - effectSize;
        chunk.height = chunk.height - effectHeight;
        return;
      }

      chunk.bubble(function (chunk) {
        chunk.size = chunk.size - effectSize;
        chunk.height = chunk.height - effectHeight;
      });
    }
  }, {
    key: "onOverflow",
    value: function onOverflow(chunk) {
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var volume = chunk.level > 0 ? chunk.chunkVolume : chunk.volume;
      var halfVolume = parseInt(volume / 2);
      var splitChildren = this.remove({
        chunk: chunk,
        offset: halfVolume
      }, chunk.children.length - halfVolume, NO_BUBBLE);
      var copys = this.toChunks(chunk, splitChildren);

      if (this.isRoot(chunk)) {
        var newRoot = chunk.clone();
        this.setRoot(newRoot);
        this.insert({
          chunk: newRoot,
          offset: 0
        }, [chunk].concat(copys));
      } else {
        this.insert({
          chunk: chunk.parent,
          offset: this.getOffset(chunk) + 1
        }, copys, NO_EFFECT);
      }
    }
  }, {
    key: "onRelease",
    value: function onRelease(chunk) {
      if (Array.isArray(chunk)) {
        var chunks = chunk;

        if (chunks.length > 1) {
          var firstChunk = chunks[0];
          var chunkParent = firstChunk.parent;
          var offset = this.getOffset(firstChunk);
          var count = 1;

          for (var i = 1; i < chunks.length; i++) {
            var _chunk2 = chunks[i];
            var parent = _chunk2.parent;

            if (parent !== chunkParent) {
              this.remove({
                chunk: chunkParent,
                offset: offset
              }, count);
              chunkParent = parent;
              offset = this.getOffset(_chunk2);
              count = 1;
            } else {
              count = count + 1;
            }
          }

          this.remove({
            chunk: chunkParent,
            offset: offset
          }, count);
          return;
        }

        chunk = chunks[0];
      }

      if (this.isRoot(chunk)) {
        console.info('Try to remove root');
        chunk.level = 0;
        return;
      }

      this.remove({
        chunk: chunk.parent,
        offset: this.getOffset(chunk)
      }, 1);
    }
  }, {
    key: "size",
    get: function get() {
      return this.root.size;
    }
  }, {
    key: "height",
    get: function get() {
      return this.root.height;
    }
  }]);

  return Doc;
}();

module.exports = Doc;
},{"./Chunk":"../aQua/src/models/Chunk.js"}],"../aQua/src/models/ExtendedLine.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../utils/index'),
    Range = _require.Range;

var LINE_HEIGHT = 25;
var FONT_SIZE = 12;

var ExtendedLine =
/*#__PURE__*/
function () {
  function ExtendedLine($line, korwa) {
    _classCallCheck(this, ExtendedLine);

    this.$line = $line;
    this.$code = $line.children[1].firstChild;
    this.korwa = korwa;
    this.updateMap();
  }

  _createClass(ExtendedLine, [{
    key: "updateMap",
    value: function updateMap() {
      this.map = this.genMap();
    }
    /**
     * 得到指定元素(x, x + 1)的 rect
     * @param  {Number} x [指定位置]
     * @return {Rect || null}   [description]
     */

  }, {
    key: "getElementRect",
    value: function getElementRect(x) {
      var map = this.map;
      /* Temp */

      if (x > this.length) {
        x = this.length - 1;
      }

      for (var i = map.length - 1; i >= 0; i -= 2) {
        if (x < map[i]) {
          continue;
        }

        var insideX = x - map[i];
        var ele = map[i + 1];
        var eleType = ele.tagName;
        return eleType ? ele.getBoundingClientRect() : Range.create(ele, insideX, insideX + 1).getBoundingClientRect();
      }

      return null;
    }
  }, {
    key: "getCurrentBlock",
    value: function getCurrentBlock(x) {
      var map = this.map;
      var end = map.length - 1;
      var leftBorder = 0;
      var rightBorder = map[end];

      for (var i = end; i >= 0; i -= 2) {
        var logicalX = map[i];

        if (x < logicalX) {
          continue;
        }

        if (x === logicalX) {
          leftBorder = map[i - 2] || leftBorder;
          rightBorder = map[i + 2] || rightBorder;
          break;
        }

        leftBorder = logicalX;
        rightBorder = map[i + 2];
        break;
      }

      return {
        leftBorder: leftBorder,
        rightBorder: rightBorder
      };
    } // 这个 $y 是相对该行的 line-box 的偏移, 而非相对 scroller 的偏移

  }, {
    key: "getInsideY",
    value: function getInsideY($y) {
      var lineRects = this.getClientRects();
      var insideY = lineRects.length - 1;

      if (insideY === 0) {
        return insideY;
      }

      var top = this.getClientRect().top;

      for (; insideY >= 0; insideY--) {
        var bottom = this.transformToRealBottom(lineRects[insideY].bottom) - top;

        if ($y > bottom) {
          break;
        }
      }

      return insideY + 1;
    }
  }, {
    key: "transformToLayoutY",
    value: function transformToLayoutY(insideY) {
      var rects = this.getClientRects();
      return this.transformToInsideLayoutY(rects[insideY].bottom);
    }
  }, {
    key: "transformToInsideLayoutY",
    value: function transformToInsideLayoutY($y) {
      return $y - this.getClientRect().top;
    }
  }, {
    key: "getClientRect",
    value: function getClientRect() {
      return this.korwa.getClientRect(this.$line);
    }
  }, {
    key: "getClientRects",
    value: function getClientRects() {
      return this.korwa.getClientRects(this.$code);
    }
  }, {
    key: "genMap",
    value: function genMap() {
      var $nodes = this.$code.childNodes; // 由于空格之类的字符不生成包裹的父元素, 如果使用 children 那么这些空格由于不算作 ElementType, 会被忽略 导致报错

      var len = $nodes.length;
      var map = [0];

      for (var i = 0; i < len; i++) {
        var $node = $nodes[i];
        var pointer = i * 2;
        var $element = $node.firstChild || $node; // $element can be text node or img node

        map[pointer + 1] = $element;
        map[pointer + 2] = ($element.length || 1) + map[pointer];
      }

      return map;
    }
  }, {
    key: "transformToRealBottom",
    value: function transformToRealBottom($y) {
      return $y + (LINE_HEIGHT - FONT_SIZE) / 2;
    }
  }, {
    key: "getInsideLineHeight",
    value: function getInsideLineHeight() {
      var insideY = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var rects = this.getClientRects();
      var maxInsideY = rects.length - 1;
    }
  }, {
    key: "length",
    get: function get() {
      return this.map[this.map.length - 1];
    }
  }]);

  return ExtendedLine;
}();

module.exports = ExtendedLine;
},{"../utils/index":"../aQua/src/utils/index.js"}],"../aQua/src/interfaces/Action.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../enums/index'),
    ActionEventType = _require.ActionEventType;

var Action =
/*#__PURE__*/
function () {
  function Action() {
    _classCallCheck(this, Action);

    this.name = null;
    this.shortcuts = [];
    this.eventType = ActionEventType.Keyboard;
    this.customMerge = false;
    this.record = true;
  }

  _createClass(Action, [{
    key: "exec",
    value: function exec() {}
  }, {
    key: "undo",
    value: function undo() {}
  }, {
    key: "redo",
    value: function redo() {}
  }, {
    key: "merge",
    value: function merge() {}
  }]);

  return Action;
}();

module.exports = Action;
},{"../enums/index":"../aQua/src/enums/index.js"}],"../aQua/src/interfaces/Cursor.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Cursor =
/*#__PURE__*/
function () {
  function Cursor() {
    _classCallCheck(this, Cursor);

    this.tags = [];
    this.name = this.constructor.name;
    this.desc = '';
    this.state = Object.create(null);
  }

  _createClass(Cursor, [{
    key: "release",
    value: function release() {}
  }, {
    key: "create",
    value: function create() {}
  }]);

  return Cursor;
}();

module.exports = Cursor;
},{}],"../aQua/src/interfaces/Asset.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Asset =
/*#__PURE__*/
function () {
  function Asset() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var prev = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var next = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    _classCallCheck(this, Asset);

    this.data = data;
    this.type = type;
    this.prev = prev;
    this.next = next;
  }

  _createClass(Asset, [{
    key: "getAlive",
    value: function getAlive() {
      if (this.length > 0) {
        return this;
      }

      return this.next ? this.next.isAlive() : null;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.length === 0;
    }
  }, {
    key: "setPrev",
    value: function setPrev(prev) {
      this.prev = prev;

      if (!prev) {
        return this;
      }

      prev.last = this;
      return prev;
    }
  }, {
    key: "setHead",
    value: function setHead(prev) {
      return this.head.setPrev(prev);
    }
  }, {
    key: "setNext",
    value: function setNext(next) {
      this.next = next;

      if (!next) {
        return this;
      }

      next.prev = this;
      return next;
    }
  }, {
    key: "setTail",
    value: function setTail(next) {
      return this.tail.setNext(next);
    }
    /* Override Request, x > 0 */

  }, {
    key: "insert",
    value: function insert(content, x) {}
    /* Override Request */

  }, {
    key: "delete",
    value: function _delete(start, end) {}
    /* Override Request */

  }, {
    key: "get",
    value: function get(start, end) {}
  }, {
    key: "length",
    get: function get() {
      return this.data.length;
    }
  }, {
    key: "head",
    get: function get() {
      return this.prev ? this.prev.head : this;
    }
  }, {
    key: "tail",
    get: function get() {
      return this.next ? this.next.tail : this;
    }
  }]);

  return Asset;
}();

module.exports = Asset;
},{}],"../aQua/src/interfaces/Mode.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mode = function Mode() {
  _classCallCheck(this, Mode);

  this.name = null;
  this.caseSensitive = false;
};

module.exports = Mode;
},{}],"../aQua/src/interfaces/Line.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Line =
/*#__PURE__*/
function () {
  function Line() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var desc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var marks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, Line);

    this.name = name;
    this.desc = desc;
    this.marks = marks;
  }

  _createClass(Line, [{
    key: "create",
    value: function create() {
      var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return this.template(content);
    }
  }, {
    key: "template",
    value: function template() {
      var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    }
  }]);

  return Line;
}();

module.exports = Line;
},{}],"../aQua/src/interfaces/Option.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Option =
/*#__PURE__*/
function () {
  function Option() {
    _classCallCheck(this, Option);

    this.alias = [];
    this.value = null;
    this.desc = '';
    this.request = false;
  }

  _createClass(Option, [{
    key: "set",
    value: function set(value) {
      this.value = value;
    }
  }, {
    key: "get",
    value: function get() {
      return this.value;
    }
  }]);

  return Option;
}();

module.exports = Option;
},{}],"../aQua/src/interfaces/Plugin.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../enums/index'),
    PluginType = _require.PluginType;

var Plugin =
/*#__PURE__*/
function () {
  function Plugin() {
    _classCallCheck(this, Plugin);

    this.name = '';
    this.desc = '';
    this.type = PluginType.Custom;
    this.enabled = false;
  }

  _createClass(Plugin, [{
    key: "install",
    value: function install(aqua) {
      this.enabled = true;
    }
  }, {
    key: "uninstall",
    value: function uninstall() {
      this.enabled = false;
    }
  }]);

  return Plugin;
}();

module.exports = Plugin;
},{"../enums/index":"../aQua/src/enums/index.js"}],"../aQua/src/interfaces/Pool.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Pool =
/*#__PURE__*/
function () {
  function Pool(Recycle) {
    _classCallCheck(this, Pool);

    this.pool = [];
    this.Recycle = Recycle;
  }

  _createClass(Pool, [{
    key: "create",
    value: function create() {}
  }, {
    key: "get",
    value: function get() {}
  }, {
    key: "put",
    value: function put(recycle) {}
  }, {
    key: "clear",
    value: function clear() {}
  }, {
    key: "size",
    get: function get() {
      return this.pool.length;
    }
  }]);

  return Pool;
}();

module.exports = Pool;
},{}],"../aQua/src/interfaces/Processor.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Processor =
/*#__PURE__*/
function () {
  function Processor() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var targets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, Processor);

    this.name = name;
    this.desc = '';
    this.targets = targets;
    this.onCreated();
  }

  _createClass(Processor, [{
    key: "aim",
    value: function aim() {
      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!target) {
        return;
      }

      this.targets.push(target);
    }
  }, {
    key: "tokenize",
    value: function tokenize(data) {
      return data;
    }
  }]);

  return Processor;
}();

module.exports = Processor;
},{}],"../aQua/src/interfaces/Recycle.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Recycle =
/*#__PURE__*/
function () {
  function Recycle() {
    _classCallCheck(this, Recycle);
  }

  _createClass(Recycle, [{
    key: "onCreate",
    value: function onCreate() {}
  }, {
    key: "onDestroy",
    value: function onDestroy() {}
  }, {
    key: "unuse",
    value: function unuse() {}
  }, {
    key: "reuse",
    value: function reuse() {}
  }]);

  return Recycle;
}();

module.exports = Recycle;
},{}],"../aQua/src/interfaces/index.js":[function(require,module,exports) {
var Action = require('./Action');

var Cursor = require('./Cursor');

var Asset = require('./Asset');

var Mode = require('./Mode');

var Line = require('./Line');

var Option = require('./Option');

var Plugin = require('./Plugin');

var Pool = require('./Pool');

var Processor = require('./Processor');

var Recycle = require('./Recycle');

module.exports = {
  Action: Action,
  Cursor: Cursor,
  Asset: Asset,
  Mode: Mode,
  Line: Line,
  Option: Option,
  Plugin: Plugin,
  Pool: Pool,
  Processor: Processor,
  Recycle: Recycle
};
},{"./Action":"../aQua/src/interfaces/Action.js","./Cursor":"../aQua/src/interfaces/Cursor.js","./Asset":"../aQua/src/interfaces/Asset.js","./Mode":"../aQua/src/interfaces/Mode.js","./Line":"../aQua/src/interfaces/Line.js","./Option":"../aQua/src/interfaces/Option.js","./Plugin":"../aQua/src/interfaces/Plugin.js","./Pool":"../aQua/src/interfaces/Pool.js","./Processor":"../aQua/src/interfaces/Processor.js","./Recycle":"../aQua/src/interfaces/Recycle.js"}],"../aQua/src/assets/FolderAsset.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Asset = _require.Asset;
/**
 * data: {
 *     coord: {
 *         y<Number>,
 *         x<Number>,
 *     },
 *     contents<Asset | String>
 * }
 */


var FolderAsset =
/*#__PURE__*/
function (_Asset) {
  _inherits(FolderAsset, _Asset);

  function FolderAsset(data, prev, next) {
    _classCallCheck(this, FolderAsset);

    return _possibleConstructorReturn(this, _getPrototypeOf(FolderAsset).call(this, data, 'FolderAsset', prev, next));
  }

  _createClass(FolderAsset, [{
    key: "insert",
    value: function insert(asset, x) {
      this.setNext(asset);
    }
  }, {
    key: "delete",
    value: function _delete(start) {
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.length;
    }
  }, {
    key: "get",
    value: function get(start) {
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.length;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.data;
    }
  }, {
    key: "length",
    get: function get() {
      return this.data ? 1 : 0;
    }
  }]);

  return FolderAsset;
}(Asset);

module.exports = FolderAsset;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/assets/ImageAsset.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Asset = _require.Asset;
/**
 * data: {
 *     src: '',
 *     alt: '',
 * }
 */


var ImageAsset =
/*#__PURE__*/
function (_Asset) {
  _inherits(ImageAsset, _Asset);

  function ImageAsset(data, prev, next) {
    _classCallCheck(this, ImageAsset);

    return _possibleConstructorReturn(this, _getPrototypeOf(ImageAsset).call(this, data, 'ImageAsset', prev, next));
  }

  _createClass(ImageAsset, [{
    key: "insert",
    value: function insert(asset, x) {
      asset.setTail(this.next);
      this.setNext(asset);
    }
  }, {
    key: "delete",
    value: function _delete(start, end) {
      var len = this.length;

      if (start === len) {
        return this.next.delete(0, end - len);
      }

      if (end <= len) {
        return this._delete();
      }

      var returnContent = this._delete();

      returnContent.setNext(this.next.delete(0, end - len));

      if (this.next.isEmpty()) {
        this.setNext(this.next.next);
      }

      return returnContent;
    }
  }, {
    key: "get",
    value: function get(start) {
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.length;
      return new ImageAsset(this.data);
    }
    /* Rare */

  }, {
    key: "_delete",
    value: function _delete() {
      var deleteData = this.data;
      this.data = null;
      return new ImageAsset(deleteData);
    }
  }, {
    key: "length",
    get: function get() {
      return this.data ? 1 : 0;
    }
  }]);

  return ImageAsset;
}(Asset);

module.exports = ImageAsset;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/assets/StringAsset.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Asset = _require.Asset;

var StringAsset =
/*#__PURE__*/
function (_Asset) {
  _inherits(StringAsset, _Asset);

  function StringAsset(data, prev, next) {
    var _this;

    _classCallCheck(this, StringAsset);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(StringAsset).call(this, data, 'StringAsset', prev, next));
    _this.max = 1024;
    return _this;
  }

  _createClass(StringAsset, [{
    key: "setNext",
    value: function setNext(next) {
      if (!next) {
        return this;
      }

      if (this.type === next.type && this.length + next.length < this.max) {
        this.data = this.data + next.data;
        return _get(_getPrototypeOf(StringAsset.prototype), "setNext", this).call(this, next.next);
      }

      return _get(_getPrototypeOf(StringAsset.prototype), "setNext", this).call(this, next);
    }
    /* Override */

    /**
     * 1. 见 @project/src/models/Line 的 write, 理论上不会有 x === 0 的判断分支
     * @param  {String || Asset} asset
     * @param  {Number} x       [x > 0]
     */

  }, {
    key: "insert",
    value: function insert(asset, x) {
      var data = this.data;
      var len = this.length;

      if (typeof asset === 'string' || asset.type === this.type) {
        this.data = data.substring(0, x) + asset.data + data.substring(x, len);

        this._checkOverflow();

        return;
      }
      /* 1 */


      if (x === 0) {// asset.head.setPrev(this.prev)
        // asset.setTail(this)
      } else if (x === len) {
        asset.setTail(this.next);
        this.setNext(asset.head);
      } else {
        var after = new StringAsset(data.substring(x, len));
        this.data = data.substring(0, x);
        after.setTail(this.next);
        asset.setTail(after);
        this.setNext(asset.head);
      }
    }
  }, {
    key: "delete",
    value: function _delete(start) {
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.length;
      var deleteData = this.data.substring(start, end);
      this.data = this.data.substring(0, start) + this.data.substring(end, this.length);
      return new StringAsset(deleteData);
    }
  }, {
    key: "get",
    value: function get(start) {
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.length;
      return new StringAsset(this.data.substring(start, end));
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.data;
    }
    /* Private */

  }, {
    key: "_checkOverflow",
    value: function _checkOverflow() {
      if (this.length > this.max) {
        var half = parseInt(this.max / 2);
        var cs = new StringAsset(this.data.substring(half, this.length));
        this.data = this.data.substring(0, half);
        cs.setTail(this.next);
        this.setNext(cs);
      }
    }
  }]);

  return StringAsset;
}(Asset);

module.exports = StringAsset; // 0123->#->@@@->456789
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/assets/index.js":[function(require,module,exports) {
var FolderAsset = require('./FolderAsset');

var ImageAsset = require('./ImageAsset');

var StringAsset = require('./StringAsset');

module.exports = {
  FolderAsset: FolderAsset,
  ImageAsset: ImageAsset,
  StringAsset: StringAsset
};
},{"./FolderAsset":"../aQua/src/assets/FolderAsset.js","./ImageAsset":"../aQua/src/assets/ImageAsset.js","./StringAsset":"../aQua/src/assets/StringAsset.js"}],"../aQua/src/models/Line.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../assets/index'),
    StringAsset = _require.StringAsset;

var _require2 = require('../enums/index'),
    LineStatus = _require2.LineStatus;

var Line =
/*#__PURE__*/
function () {
  function Line() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? 0 : _ref$height,
        _ref$data = _ref.data,
        data = _ref$data === void 0 ? '' : _ref$data,
        _ref$status = _ref.status,
        status = _ref$status === void 0 ? LineStatus.CREATED : _ref$status,
        _ref$parent = _ref.parent,
        parent = _ref$parent === void 0 ? null : _ref$parent;

    _classCallCheck(this, Line);

    this._height = 0;
    this._heightBuffer = 0;
    this.height = height;
    this.data = data;
    this.status = status;
    this.parent = parent;
  }

  _createClass(Line, [{
    key: "search",

    /**
     * 1. 由于是小于等于，理论上每个 Asset 链的除了第一个块，返回的 index 不会为 0
     * @param  {number} x
     * @return {{ asset: this, index: x }}
     */
    value: function search(x) {
      var result = null;
      this.traverse(function (asset) {
        var len = asset.length;
        /* 1 */

        if (x <= len) {
          result = {
            asset: asset,
            index: x
          };
          return false;
        }

        if (!asset.next) {
          result = {
            asset: asset,
            index: len
          };
          return false;
        }

        x = x - len;
      });
      return result;
    }
    /**
     * 1. 当 x 为 0 直接插入头部，避免在 Asset 内部处理 Line.prototype.data 的头部指向
     * @param  {String || Asset}
     * @param  {Number} x
     */

  }, {
    key: "write",
    value: function write(content) {
      var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.length;

      if (content.length === 0) {
        return;
      }

      this.setStatus(LineStatus.UPDATED);

      var dataType = _typeof(this.data);

      var contentType = _typeof(content);

      if (dataType === 'string') {
        if (contentType === 'string') {
          this.data = this.data.substring(0, x) + content + this.data.substring(x, this.length);
        } else {
          /* 1 */
          if (x === 0) {
            content.setTail(new StringAsset(this.data));
            this.data = content;
          } else {
            this.data = new StringAsset(this.data);

            var _this$search = this.search(x),
                _asset = _this$search.asset,
                index = _this$search.index;

            _asset.insert(content, index);
          }
        }
      } else {
        if (contentType === 'string') {
          content = new StringAsset(content);
        }
        /* 1 */


        if (x === 0) {
          content.setTail(this.data);
          this.data = content;
        } else {
          var _this$search2 = this.search(x),
              _asset2 = _this$search2.asset,
              _index = _this$search2.index;

          _asset2.insert(content, _index);
        }
      }
    }
    /**
     * 1. 从 start 开始的 asset 开始截取
     * @param  {Number} start
     * @param  {Number} end
     * @return {String || Asset}
     */

  }, {
    key: "delete",
    value: function _delete() {
      var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.length;

      if (start === end) {
        return '';
      }

      this.setStatus(LineStatus.UPDATED);

      if (typeof this.data === 'string') {
        var _deletedData = this.data.substring(start, end);

        this.data = this.data.substring(0, start) + this.data.substring(end, this.length);
        return _deletedData;
      }

      if (start === 0 && end === this.length) {
        var _deletedData2 = this.data;
        this.data = '';
        return _deletedData2;
      }

      var _this$_transformXs = this._transformXs(start, end);

      start = _this$_transformXs.start;
      end = _this$_transformXs.end;
      asset = _this$_transformXs.asset;
      var len = asset.length;

      if (end <= len) {
        var _deletedData3 = asset.delete(start, end);

        this._removeEmpty(asset);

        return _deletedData3;
      }

      var deletedData = asset.delete(start, len);
      end = end - len;
      var head = deletedData;
      /* 2 -> */

      this.traverse(function (asset) {
        var len = asset.length;

        if (end > len) {
          deletedData = deletedData.setNext(asset.delete(0, len));
        } else {
          deletedData = deletedData.setNext(asset.delete(0, end));
          return false;
        }

        end = end - len;
      }, asset.next);

      this._removeEmpty(asset);

      return head;
    }
    /**
     * 1. 从 start 开始的 asset 开始截取
     * 2. 因为需要返回一个链的 head, 所以预先处理第一个 asset 来保存 head
     * @param  {Number} start
     * @param  {Number} end
     * @return {String || Asset}
     */

  }, {
    key: "read",
    value: function read() {
      var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.length;

      if (start === end) {
        return '';
      }

      if (typeof this.data === 'string') {
        return this.data.substring(start, end);
      }
      /* 1 */


      var _this$_transformXs2 = this._transformXs(start, end);

      start = _this$_transformXs2.start;
      end = _this$_transformXs2.end;
      asset = _this$_transformXs2.asset;

      /* <- 2 */
      var len = asset.length;

      if (end <= len) {
        return asset.get(start, end);
      }

      var data = asset.get(start, len);
      end = end - len;
      var head = data;
      /* 2 -> */

      this.traverse(function (asset) {
        var len = asset.length;

        if (end > len) {
          data = data.setNext(asset.get(0, len));
        } else {
          data = data.setNext(asset.get(0, end));
          return false;
        }

        end = end - len;
      }, asset.next);
      return head;
    }
  }, {
    key: "traverse",
    value: function traverse(cb) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.data;

      for (var _asset3 = data; _asset3 !== null; _asset3 = _asset3.next) {
        if (cb(_asset3) === false) {
          return;
        }
      }

      return;
    }
  }, {
    key: "setStatus",
    value: function setStatus(status) {
      if (status === LineStatus.CREATED) {
        return;
      }

      if (this.status === LineStatus.CREATED && status === LineStatus.UPDATED) {
        return;
      }

      this.status = status;
    }
  }, {
    key: "release",
    value: function release() {
      this.setStatus(LineStatus.DELETED);
    }
  }, {
    key: "isAlive",
    value: function isAlive() {
      return this.status > 1;
    }
  }, {
    key: "isDeleted",
    value: function isDeleted() {
      return this.status === LineStatus.DELETED;
    }
  }, {
    key: "isHidden",
    value: function isHidden() {
      return this.status === LineStatus.HIDDEN;
    }
  }, {
    key: "isCreated",
    value: function isCreated() {
      return this.status === LineStatus.CREATED;
    }
  }, {
    key: "isDone",
    value: function isDone() {
      return this.status === LineStatus.DONE;
    }
  }, {
    key: "isUpdated",
    value: function isUpdated() {
      return this.status === LineStatus.UPDATED;
    }
  }, {
    key: "flushHeightBuffer",
    value: function flushHeightBuffer() {
      var buffer = this._heightBuffer;
      this._heightBuffer = 0;
      return buffer;
    }
  }, {
    key: "requestLineNum",
    value: function requestLineNum() {
      return this.parent.children.indexOf(this) + this._requestLineNum(this.parent);
    }
  }, {
    key: "_requestLineNum",
    value: function _requestLineNum(obj) {
      if (!obj.parent) {
        return 0;
      }

      var children = obj.parent.children;
      var index = children.indexOf(obj);
      var size = 0;

      for (var i = 0; i < index; i++) {
        size = size + children[i].size;
      }

      return size + this._requestLineNum(obj.parent);
    }
    /**
     * 找到 start 对应的 asset
     * @param  {Number} start
     * @param  {Number} end
     * @param  {Asset} startAsset
     * @return {start<Number>, end<Number>, asset<Asset>}
     */

  }, {
    key: "_transformXs",
    value: function _transformXs(start, end) {
      var startAsset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.data;
      var result = null;

      if (start === 0) {
        return {
          start: start,
          end: end,
          asset: startAsset
        };
      }

      this.traverse(function (asset) {
        var len = asset.length;

        if (start >= len) {
          start = start - len;
          end = end - len;
          return;
        }

        result = {
          start: start === 0 && !asset.next ? start : start,
          end: end,
          asset: asset
        };
        return false;
      }, startAsset);

      if (!result) {
        var len = this.length;
        result = {
          start: len,
          end: len,
          asset: this.data.tail
        };
      } // console.error(result)


      return result;
    }
  }, {
    key: "_removeEmpty",
    value: function _removeEmpty() {
      var startAsset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.data;
      this.traverse(function (asset) {
        if (asset.isEmpty()) {
          return;
        }

        startAsset.setNext(asset);
        return false;
      }, startAsset.next);

      if (startAsset.isEmpty()) {
        if (startAsset === this.data) {
          this.data = startAsset.next || '';
          startAsset.next && startAsset.next.setPrev(null);
        } else {
          startAsset.prev.setNext(startAsset.next);
        }
      }
    }
  }, {
    key: "extract",
    value: function extract() {
      if (typeof this.data === 'string') {
        return ['StringLiteral', this.data];
      }

      var assets = [];
      this.traverse(function (asset) {
        assets.push(assets.type, assets.data);
      });
      return assets;
    }
  }, {
    key: "id",
    get: function get() {
      if (this._id) {
        return this._id;
      }

      return this._id = 'L' + (new Date().getTime() + Math.random()).toString(36).replace('.', '');
    }
  }, {
    key: "height",
    set: function set(height) {
      this._heightBuffer = this._heightBuffer + (height - this._height);
      this._height = height;
    },
    get: function get() {
      return this._height;
    }
  }, {
    key: "length",
    get: function get() {
      if (typeof this.data === 'string') {
        return this.data.length;
      }

      var sum = 0;
      this.traverse(function (asset) {
        sum = sum + asset.length;
      });
      return sum;
    }
  }], [{
    key: "setStatus",
    value: function setStatus(lines, status) {
      if (Array.isArray(lines)) {
        for (var i = 0; i < lines.length; i++) {
          lines[i].setStatus(status);
        }

        return;
      }

      lines.setStatus(status);
    }
    /**
     * 批量转化 data 数组中的 start 到 end 之间为 Line Instance
     * @param  {Array}  data
     * @param  {Number} start
     * @param  {Number} end
     * @return {Array<Line>}
     */

  }, {
    key: "toInstances",
    value: function toInstances() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : data.length;
      var instances = [];

      for (var i = start; i < end; i++) {
        instances.push(new Line({
          data: data[i]
        }));
      }

      return instances;
    }
  }]);

  return Line;
}();

module.exports = Line;
},{"../assets/index":"../aQua/src/assets/index.js","../enums/index":"../aQua/src/enums/index.js"}],"../aQua/src/models/MacroStep.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MacroStep =
/*#__PURE__*/
function () {
  function MacroStep() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$author = _ref.author,
        author = _ref$author === void 0 ? null : _ref$author,
        _ref$micros = _ref.micros,
        micros = _ref$micros === void 0 ? null : _ref$micros,
        _ref$before = _ref.before,
        before = _ref$before === void 0 ? null : _ref$before,
        _ref$after = _ref.after,
        after = _ref$after === void 0 ? null : _ref$after;

    _classCallCheck(this, MacroStep);

    var currentTime = this.getTime();
    this.type = type;
    this.author = author;
    this.micros = micros;
    this.before = before;
    this.after = after;
    this.createdTime = currentTime;
    this.updatedTime = currentTime;
  }

  _createClass(MacroStep, [{
    key: "update",
    value: function update() {
      var micros = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.micros = micros;
      this.updatedTime = this.getTime();
    }
  }, {
    key: "getTime",
    value: function getTime() {
      return new Date().getTime();
    }
  }]);

  return MacroStep;
}();

module.exports = MacroStep;
},{}],"../aQua/src/models/MicroStep.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MicroStep =
/*#__PURE__*/
function () {
  function MicroStep() {
    var record = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, MicroStep);

    var currentTime = this.getTime();
    this.record = record;
    this.createdTime = currentTime;
  }

  _createClass(MicroStep, [{
    key: "getTime",
    value: function getTime() {
      return new Date().getTime();
    }
  }]);

  return MicroStep;
}();

module.exports = MicroStep;
},{}],"../aQua/src/models/Selection.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Coord = require('./Coord');

var _require = require('../enums/index'),
    ArgOpt = _require.ArgOpt;

var Selection =
/*#__PURE__*/
function () {
  function Selection() {
    _classCallCheck(this, Selection);

    this._base = new Coord();
    this.start = new Coord();
    this.end = new Coord();
    this.direction = ArgOpt.SelectionDirectionIsNone;
    this.collapsed = true;
  }

  _createClass(Selection, [{
    key: "isCollapsed",
    value: function isCollapsed() {
      return this.collapsed;
    }
  }, {
    key: "isContainCoord",
    value: function isContainCoord(coord) {
      if (coord.y < this.start.y) {
        return false;
      }

      if (coord.y > this.end.y) {
        return false;
      }

      if (coord.x < this.start.x) {
        return false;
      }

      if (coord.x > this.end.x) {
        return false;
      }

      return true;
    }
  }, {
    key: "reorder",
    value: function reorder(base, terminal) {
      this.collapsed = false;
      var diffY = terminal.y - base.y;

      if (diffY > 0) {
        this.setStart(base);
        this.setEnd(terminal);
        this.direction = ArgOpt.SelectionDirectionIsBottomRight;
        return;
      }

      if (diffY < 0) {
        this.setStart(terminal);
        this.setEnd(base);
        this.direction = ArgOpt.SelectionDirectionIsTopLeft;
        return;
      }

      var diffX = terminal.x - base.x;

      if (diffX > 0) {
        this.setStart(base);
        this.setEnd(terminal);
        this.direction = ArgOpt.SelectionDirectionIsBottomRight;
        return;
      }

      if (diffX < 0) {
        this.setStart(terminal);
        this.setEnd(base);
        this.direction = ArgOpt.SelectionDirectionIsTopLeft;
        return;
      }

      this.direction = ArgOpt.SelectionDirectionIsNone;
      this.collapsed = true;
    }
  }, {
    key: "containMinLines",
    value: function containMinLines() {
      var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.start;
      var terminal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.end;
      var diffY = terminal.y - base.y;

      if (diffY > 1 || diffY < -1) {
        return 3;
      }

      if (diffY === 0) {
        var diffInsideY = terminal.insideY - base.insideY;

        if (diffInsideY === 0) {
          return terminal.logicalX - base.logicalX === 0 ? 0 : 1;
        }

        if (diffInsideY > 1 || diffInsideY < -1) {
          return 3;
        }

        if (diffInsideY === 1 || diffInsideY === -1) {
          return 2;
        }
      }

      if (diffY === 1) {
        return Math.min(terminal.insideY + base.maxInsideY - base.insideY + 2, 3);
      }

      if (diffY === -1) {
        return Math.min(base.insideY + terminal.maxInsideY - terminal.insideY + 2, 3);
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this._base = new Coord();
      this.start = new Coord();
      this.end = new Coord();
      this.collapsed = true;
    }
  }, {
    key: "setStart",
    value: function setStart(coord) {
      this.start.assign(coord);
    }
  }, {
    key: "setEnd",
    value: function setEnd(coord) {
      this.end.assign(coord);
    }
  }, {
    key: "getStart",
    value: function getStart() {
      return this.start;
    }
  }, {
    key: "getEnd",
    value: function getEnd() {
      return this.end;
    }
  }, {
    key: "clone",
    value: function clone() {
      var selection = new Selection();
      selection._base = this._base.clone();
      selection.start = this.start.clone();
      selection.end = this.end.clone();
      selection.direction = this.direction;
      selection.collapsed = this.collapsed;
      return selection;
    }
    /**
     * 请保证 selection 与当前 selection 重合再调用此方法
     * @param  {Selection} selection
     */

  }, {
    key: "merge",
    value: function merge(selection) {
      if (selection.collapsed) {
        return;
      }

      this.collapsed = selection.collapsed;
      var direction = selection.direction;

      if (direction === ArgOpt.SelectionDirectionIsBottomRight) {
        if (selection.base.less(this.base)) {
          this.base = selection.base;
        }
      } else if (direction === ArgOpt.SelectionDirectionIsTopLeft) {
        if (selection.base.greater(this.base)) {
          this.base = selection.base;
        }
      }

      if (selection.start.less(this.start)) {
        this.start.assign(selection.start);
      }

      if (selection.end.greater(this.end)) {
        this.end.assign(selection.end);
      }
    }
  }, {
    key: "extract",
    value: function extract() {
      var direction = this.direction;

      if (direction === ArgOpt.SelectionDirectionIsNone) {
        return null;
      }

      if (direction === ArgOpt.SelectionDirectionIsTopLeft) {
        return {
          base: this.end.extract(),
          terminal: this.start.extract()
        };
      }

      if (direction === ArgOpt.SelectionDirectionIsBottomRight) {
        return {
          base: this.start.extract(),
          terminal: this.end.extract()
        };
      }
    }
  }, {
    key: "base",
    set: function set(coord) {
      this._base.assign(coord);
    },
    get: function get() {
      return this._base;
    }
  }, {
    key: "terminal",
    set: function set(coord) {
      this.reorder(this._base, coord);
    }
  }]);

  return Selection;
}();

module.exports = Selection;
},{"./Coord":"../aQua/src/models/Coord.js","../enums/index":"../aQua/src/enums/index.js"}],"../aQua/src/models/Snippet.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Snippet =
/*#__PURE__*/
function () {
  function Snippet() {
    var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var states = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, Snippet);

    this.start = start;
    this.end = end;
    this.states = states;
  }

  _createClass(Snippet, [{
    key: "freeze",
    value: function freeze() {}
  }]);

  return Snippet;
}();

module.exports = Snippet;
},{}],"../aQua/src/models/Viewport.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Viewport =
/*#__PURE__*/
function () {
  function Viewport() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$y = _ref.y,
        y = _ref$y === void 0 ? 0 : _ref$y,
        _ref$x = _ref.x,
        x = _ref$x === void 0 ? 0 : _ref$x,
        _ref$height = _ref.height,
        height = _ref$height === void 0 ? 0 : _ref$height,
        _ref$width = _ref.width,
        width = _ref$width === void 0 ? 0 : _ref$width,
        _ref$lps = _ref.lps,
        lps = _ref$lps === void 0 ? 0 : _ref$lps,
        _ref$lines = _ref.lines,
        lines = _ref$lines === void 0 ? [] : _ref$lines,
        _ref$$lines = _ref.$lines,
        $lines = _ref$$lines === void 0 ? [] : _ref$$lines,
        _ref$status = _ref.status,
        status = _ref$status === void 0 ? Object.create(null) : _ref$status;

    _classCallCheck(this, Viewport);

    this.y = y;
    this.x = x;
    this.height = height;
    this.width = width;
    this.lps = lps; // Lines Per Screen

    this.lines = lines;
    this.$lines = $lines;
    this.status = status;
    this.visibleArea = {
      start: -1,
      end: -1
    };
    this.renderArea = {
      start: -1,
      end: -1
    };
    this.lines = [];
  }

  _createClass(Viewport, [{
    key: "update",
    value: function update(y) {
      this.y = y;
      return {
        ceiling: this.ceiling,
        floor: this.floor
      };
    }
  }, {
    key: "isVisionLost",
    value: function isVisionLost() {
      var visibleArea = this.visibleArea;
      var renderArea = this.renderArea;
      return visibleArea.end > renderArea.end || visibleArea.start < renderArea.start;
    }
  }, {
    key: "updateVisibleArea",
    value: function updateVisibleArea(start, end) {
      var visibleArea = this.visibleArea;
      visibleArea.start = start;
      visibleArea.end = end;
      return visibleArea;
    }
  }, {
    key: "getVisibleArea",
    value: function getVisibleArea() {
      return this.visibleArea;
    }
  }, {
    key: "updateRenderArea",
    value: function updateRenderArea(start, end) {
      var renderArea = this.renderArea;
      renderArea.start = start;
      renderArea.end = end;
      return renderArea;
    }
  }, {
    key: "getRenderArea",
    value: function getRenderArea() {
      var _this$renderArea = this.renderArea,
          start = _this$renderArea.start,
          end = _this$renderArea.end;
      return {
        start: start,
        end: end
      };
    }
  }, {
    key: "$getLine",
    value: function $getLine(lineNum) {
      var _this$renderArea2 = this.renderArea,
          start = _this$renderArea2.start,
          end = _this$renderArea2.end;

      if (lineNum < start || lineNum > end) {
        return null;
      }

      return this.$lines[lineNum - start];
    }
  }, {
    key: "getLine",
    value: function getLine(lineNum) {// const { start, end } = this.renderArea
      // if (lineNum < start || lineNum > end) {
      //     return null
      // }
      // return this.lines[lineNum - start]
    }
  }, {
    key: "ceiling",
    get: function get() {
      return this.y;
    }
  }, {
    key: "floor",
    get: function get() {
      return this.y + this.height;
    }
  }]);

  return Viewport;
}();

module.exports = Viewport;
},{}],"../aQua/src/models/index.js":[function(require,module,exports) {
var CatalogueNode = require('./CatalogueNode');

var Chunk = require('./Chunk');

var Content = require('./Content');

var Coord = require('./Coord');

var Doc = require('./Doc');

var ExtendedLine = require('./ExtendedLine');

var Line = require('./Line');

var MacroStep = require('./MacroStep');

var MicroStep = require('./MicroStep');

var Selection = require('./Selection');

var Snippet = require('./Snippet');

var Viewport = require('./Viewport');

module.exports = {
  CatalogueNode: CatalogueNode,
  Chunk: Chunk,
  Content: Content,
  Coord: Coord,
  Doc: Doc,
  ExtendedLine: ExtendedLine,
  Line: Line,
  MacroStep: MacroStep,
  MicroStep: MicroStep,
  Selection: Selection,
  Snippet: Snippet,
  Viewport: Viewport
};
},{"./CatalogueNode":"../aQua/src/models/CatalogueNode.js","./Chunk":"../aQua/src/models/Chunk.js","./Content":"../aQua/src/models/Content.js","./Coord":"../aQua/src/models/Coord.js","./Doc":"../aQua/src/models/Doc.js","./ExtendedLine":"../aQua/src/models/ExtendedLine.js","./Line":"../aQua/src/models/Line.js","./MacroStep":"../aQua/src/models/MacroStep.js","./MicroStep":"../aQua/src/models/MicroStep.js","./Selection":"../aQua/src/models/Selection.js","./Snippet":"../aQua/src/models/Snippet.js","./Viewport":"../aQua/src/models/Viewport.js"}],"../aQua/src/helpers/AssetHelper.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = {
  append: function append(source, content) {
    var sourceType = _typeof(source);

    var contentType = _typeof(content);

    var sourceAsset = null;
    var contentAsset = null;

    if (sourceType === 'string') {
      if (contentType === 'string') {
        return source + content;
      }

      sourceAsset = new StringAsset(source);
      contentAsset = content;
    } else {
      sourceAsset = source;

      if (contentType === 'string') {
        contentAsset = new StringAsset(content);
      }
    }

    sourceAsset.setTail(contentAsset);
    return sourceAsset;
  }
};
},{}],"../aQua/src/helpers/CoordHelper.js":[function(require,module,exports) {
module.exports = {
  greater: function greater(coordA, coordB) {
    var equal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var diffY = coordA.y - coordB.y;

    if (diffY > 0) {
      return true;
    }

    if (diffY < 0) {
      return false;
    }

    var diffX = coordA.x - coordB.x;

    if (diffX > 0) {
      return true;
    }

    if (diffX < 0) {
      return false;
    }

    return equal;
  },
  less: function less(coordA, coordB) {
    var equal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var diffY = coordA.y - coordB.y;

    if (diffY < 0) {
      return true;
    }

    if (diffY > 0) {
      return false;
    }

    var diffX = coordA.x - coordB.x;

    if (diffX < 0) {
      return true;
    }

    if (diffX > 0) {
      return false;
    }

    return equal;
  },
  equal: function equal(coordA, coordB) {
    return coordA.y === coordB.y && coordA.x === coordB.x;
  }
};
},{}],"../aQua/src/helpers/LineHelper.js":[function(require,module,exports) {
module.exports = {
  setHeight: function setHeight(lines, heights) {
    for (var i = 0; i < lines.length; i++) {
      lines[i].height = heights[i];
    }
  }
};
},{}],"../aQua/src/helpers/index.js":[function(require,module,exports) {
var AssetHelper = require('./AssetHelper');

var CoordHelper = require('./CoordHelper');

var LineHelper = require('./LineHelper');

module.exports = {
  AssetHelper: AssetHelper,
  CoordHelper: CoordHelper,
  LineHelper: LineHelper
};
},{"./AssetHelper":"../aQua/src/helpers/AssetHelper.js","./CoordHelper":"../aQua/src/helpers/CoordHelper.js","./LineHelper":"../aQua/src/helpers/LineHelper.js"}],"../aQua/src/components/Chronicle.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../models/index'),
    MacroStep = _require.MacroStep,
    MicroStep = _require.MicroStep;

var _require2 = require('../helpers/index'),
    CoordHelper = _require2.CoordHelper,
    AssetHelper = _require2.AssetHelper;

var Chronicle =
/*#__PURE__*/
function () {
  function Chronicle(aqua) {
    _classCallCheck(this, Chronicle);

    this.khala = aqua.khala;
    this.backMacroEvents = [];
    this.forwardMacroEvents = [];
    this.options = {
      mergeDisabled: false,
      mergeTimeout: 1500
    };
    this.currentMacroEvent = null;
  }

  _createClass(Chronicle, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.khala.on('microEvent', function (data) {
        _this.record(data);
      });
    }
  }, {
    key: "record",
    value: function record(data) {
      if (!this.currentMacroEvent) {
        return;
      }

      var micros = this.currentMacroEvent.micros;
      var prev = micros[micros.length - 1];
      var next = new MicroStep(data);

      if (!prev) {
        this.currentMacroEvent.micros.push(next);
        return;
      }

      var isMerged = this.mergeMicro(prev, next);
      isMerged || this.currentMacroEvent.micros.push(next);
    }
  }, {
    key: "start",
    value: function start(type) {
      var before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var macro = new MacroStep(type);
      macro.micros = [];
      macro.before = before;
      this.currentMacroEvent = macro;
    }
  }, {
    key: "end",
    value: function end(type) {
      var after = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var merge = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.merge;
      var macro = this.currentMacroEvent;

      if (!macro) {
        return;
      }

      macro.after = after;

      if (macro.micros.length === 0) {
        this.currentMacroEvent = null;
        return;
      }

      this.currentMacroEvent = null;

      if (this.backMacroEvents.length > 0) {
        this.backMacroEvents = [];
      }

      if (this.forwardMacroEvents.length < 1) {
        this.forwardMacroEvents.push(macro);
        return;
      }

      if (!merge) {
        merge = this.merge;
      }

      merge(macro, this, this.mergeStrategy) || this.forwardMacroEvents.push(macro);
    }
    /**
     * 如果存在连续的坐标但是中间夹了不同 source 的 microStep, 由于情况较少, 且需要做额外的处理, 不处理这种情况.
     * 1. 前后的类型不同, 不合并
     * 2. 前后的起始坐标不同, 不合并
     * 3. 合并坐标以及内容
     *     3.1 如果后一个 macro 的影响行数只有1, 那么合并后的内容会在前一个 macro 的最后一行的最后面, 所以需要加上 x
     * @param  {MicroStep}   prev []
     * @param  {MicroStep} next []
     * @return {Boolean}        [next 是否已经被合并]
     */

  }, {
    key: "mergeMicro",
    value: function mergeMicro(prev, next) {
      var prevRecord = prev.record;
      var nextRecord = next.record;
      /* 1 */

      if (prevRecord.source !== nextRecord.source) {
        return false;
      }
      /* 2 */


      if (!CoordHelper.equal(prevRecord.start, nextRecord.start)) {
        return false;
      }
      /* 3 */


      var prevContents = prevRecord.contents;
      var nextContents = nextRecord.contents;
      prevContents[prevContents.length - 1] = AssetHelper.append(prevContents[prevContents.length - 1], nextContents[0]);
      var prevEnd = prevRecord.end;

      if (nextContents.length < 2) {
        /* 3.1 */
        prevEnd.x = prevEnd.x + nextRecord.end.x - nextRecord.start.x;
      } else {
        prevRecord.contents = prevContents.concat(nextContents.slice(1));
        prevEnd.y = prevEnd.y + nextRecord.end.y - nextRecord.start.y;
        prevEnd.x = prevEnd.x + nextRecord.end.x - nextRecord.start.x;
      }

      return true;
    }
    /**
     * TODO: 需要考虑协同下的 merge 情况
     * 1. 过滤不需要 merge 的情况
     * @param  {Function} next
     * @param  {[type]}   chronicle
     * @param  {[type]}   mergeStrategy
     * @return {[type]}
     */

  }, {
    key: "merge",
    value: function merge(next, chronicle, mergeStrategy) {
      return; // console.log('Merge', chronicle.forwardMacroEvents)
      // const macros = chronicle.forwardMacroEvents
      // const len = macros.length
      // const prev = macros[len - 1]
      // /* 1 */
      // if (!mergeStrategy(next, prev, chronicle.options)) {
      //     return false
      // }
      // let nextRecord = null
      // let yAcc = 0
      // let xAcc = 0
      // for (let i = 0; i < prev.length; i++) {
      //     const prevRecord = prev.record
      // }
      // prev.updateTime = prev.getTime()
    }
  }, {
    key: "mergeStrategy",
    value: function mergeStrategy(next, prev, options) {
      if (options.mergeDisabled) {
        return false;
      }

      if (next.author !== prev.author) {
        return false;
      }

      if (next.type !== prev.type) {
        return false;
      }

      if (next.updateTime - prev.createdTime > options.mergeTimeout) {
        return false;
      }

      return true;
    }
  }, {
    key: "back",
    value: function back(fn) {
      var macroEvent = this.forwardMacroEvents.pop();

      if (!macroEvent) {
        return fn(macroEvent);
      }

      this.backMacroEvents.push(macroEvent);
      return fn(macroEvent);
    }
  }, {
    key: "forward",
    value: function forward(fn) {
      var macroEvent = this.backMacroEvents.pop();

      if (!macroEvent) {
        return fn(macroEvent);
      }

      this.forwardMacroEvents.push(macroEvent);
      return fn(macroEvent);
    }
  }, {
    key: "extract",
    value: function extract() {
      return {
        backMacroEvents: this.backMacroEvents,
        forwardMacroEvents: this.forwardMacroEvents
      };
    }
  }, {
    key: "rebuild",
    value: function rebuild(chronicle) {
      if (!chronicle) {
        this.backMacroEvents = [];
        this.forwardMacroEvents = [];
        return;
      }

      this.backMacroEvents = chronicle.backMacroEvents;
      this.forwardMacroEvents = chronicle.forwardMacroEvents;
    }
  }]);

  return Chronicle;
}();

module.exports = Chronicle;
},{"../models/index":"../aQua/src/models/index.js","../helpers/index":"../aQua/src/helpers/index.js"}],"../aQua/src/components/ContentMgr.js":[function(require,module,exports) {
function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../models/index'),
    Content = _require.Content;

var _require2 = require('../utils/index'),
    DOM = _require2.DOM,
    SpecialCharSet = _require2.SpecialCharSet;

var ContentMgr =
/*#__PURE__*/
function () {
  function ContentMgr(aqua) {
    _classCallCheck(this, ContentMgr);

    this.aqua = aqua;
    this.processor = aqua.processorMgr;
  }

  _createClass(ContentMgr, [{
    key: "traverse",
    value: function traverse(data, cb) {
      if (typeof data === 'string') {
        cb(data);
        return;
      }

      for (var asset = data; asset !== null; asset = asset.next) {
        cb(asset);
      }
    } // parse(raw, lang = this.aqua.state.mod.lang) {
    //     lang = this.aqua.modeMgr.getLang(lang)
    //     return lang.parse(raw)
    // }

  }, {
    key: "tokenize",
    value: function tokenize(assets) {
      var _this = this;

      var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.aqua.state.mod.mode;
      var tokens = [];
      lang = this.aqua.modeMgr.getLang(lang);
      this.traverse(assets, function (asset) {
        tokens = tokens.concat(_this.processor.tokenize(asset, lang));
      });
      return tokens;
    }
  }, {
    key: "toElements",
    value: function toElements(tokens) {
      var elements = [];
      var $root = DOM.f();

      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        var type = token.type;

        if (type === 'word') {
          var _$child = DOM.e('span', {
            'class': 'aqua-block-' + token.type
          }, [DOM.t(token.value)]);

          DOM.appendChild($root, _$child);
          continue;
        }

        if (type === 'newline') {
          elements.push($root);
          $root = (_readOnlyError("$root"), DOM.f());
          continue;
        }

        if (type === 'image') {
          var _$child2 = DOM.e('img', {
            'class': 'aqua-block-' + token.type,
            'src': token.value
          });

          DOM.appendChild($root, _$child2);
          continue;
        }

        var $child = DOM.t(token.value);
        DOM.appendChild($root, $child); // const $child = type === 'image' ? DOM.e('img', {'class': 'aqua-block-' + token.type, 'src': token.value}, [DOM.t(token.value)]) :
        //     type ? DOM.e('span', {'class': 'aqua-block-' + token.type}, [DOM.t(token.value)]) :
        // DOM.appendChild(
        //     $root,
        //     $child,
        // )
        // elements.push(this._toElements(tokens[i]))
      }

      return elements;
    }
  }, {
    key: "_toElements",
    value: function _toElements(tokens) {
      var len = tokens.length;
      var $root = DOM.f();

      if (len === 0) {
        DOM.appendChild($root, DOM.e('span', {
          'class': 'aqua-block-empty'
        }, DOM.t(SpecialCharSet.ZeroWidthSpace)));
      }

      for (var i = 0; i < len; i++) {
        var token = tokens[i];
        var type = token.type;
        var $child = null;

        if (type === 'image') {
          $child = DOM.e('img', {
            'class': 'aqua-block-' + token.type,
            'src': token.value
          });

          $child.onload = function () {};
        } else {
          $child = type ? DOM.e('span', {
            'class': 'aqua-block-' + token.type
          }, [DOM.t(token.value)]) : DOM.t(token.value);
        }

        DOM.appendChild($root, $child);
      }

      return $root;
    }
  }, {
    key: "split",
    value: function split(content) {
      if (typeof content === 'string') {
        return content.split('\n');
      }
    }
  }, {
    key: "split",
    value: function split(content) {
      var divider = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '\n';
      var result = [];
      content.traverseAll(function (contentIns) {
        var type = contentIns.type;

        if (type === ContentType.TEXT) {
          var contents = contentIns.value.split(divider);

          for (var i = 0; i < contents.length; i++) {
            result.push(new Content({
              value: contents[i]
            }));
          }

          return;
        }

        if (type === ContentType.IMAGE) {
          var imageContent = new Content({
            value: contentIns.value,
            type: contentIns.type
          });
          result.length === 0 ? result.push(imageContent) : result[result.length - 1].next(imageContent);
          return;
        }
      });
      return result;
    }
  }]);

  return ContentMgr;
}();

module.exports = ContentMgr;
},{"../models/index":"../aQua/src/models/index.js","../utils/index":"../aQua/src/utils/index.js"}],"../aQua/src/components/CursorMgr.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../enums/index'),
    ArgOpt = _require.ArgOpt;

var _require2 = require('../helpers/index'),
    CoordHelper = _require2.CoordHelper;

var ObjectMap =
/*#__PURE__*/
function () {
  function ObjectMap() {
    _classCallCheck(this, ObjectMap);

    this.arr = [];
    this.map = Object.create(null);
  }

  _createClass(ObjectMap, [{
    key: "useIterator",
    value: function useIterator(str) {
      var map = this.map;
      var arr = this.arr;
      var i = -1;
      var index = -1;
      return function () {
        i = i + 1;
        index = arr[i];
        var max = arr.length - 1;

        if (i > max) {
          i = max;
          return null;
        }

        return {
          key: index,
          value: map[index]
        };
      };
    }
  }, {
    key: "traverse",
    value: function traverse(cb) {
      var arr = this.arr;

      for (var i = 0; i < arr.length; i++) {
        cb(arr[i]);
      }
    }
  }, {
    key: "getByIndex",
    value: function getByIndex(index) {
      return this.map[this.arr[index]];
    }
  }, {
    key: "get",
    value: function get(key) {
      return this.map[key];
    }
  }, {
    key: "set",
    value: function set(key, value) {
      this.binaryInsert(key);
      this.map[key] = value;
    }
  }, {
    key: "binaryInsert",
    value: function binaryInsert(key) {
      var arr = this.arr;

      if (arr.length === 0) {
        arr.push(key);
        return;
      }

      var right = arr.length - 1;

      if (key > arr[right]) {
        arr.push(key);
        return;
      }

      var left = 0;

      if (key < arr[left]) {
        arr.unshift(key);
        return;
      }

      var center = -1;

      while (right - left > 1) {
        center = parseInt((left + right) / 2);

        if (key < arr[center]) {
          right = center - 1;
        } else {
          left = center + 1;
        }
      }

      if (key < arr[left]) {
        arr.splice(left, 0, key);
        return;
      }

      if (key > arr[right]) {
        arr.splice(right, 0, key);
        return;
      }

      arr.splice(left + 1, 0, key);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.arr = [];
      this.map = Object.create(null);
    }
  }, {
    key: "size",
    get: function get() {
      return this.arr.length;
    }
  }]);

  return ObjectMap;
}();

var OffsetMap =
/*#__PURE__*/
function () {
  function OffsetMap() {
    _classCallCheck(this, OffsetMap);

    this.map = new ObjectMap();
  }

  _createClass(OffsetMap, [{
    key: "traverse",
    value: function traverse(cb) {
      var map = this.map;
      map.traverse(function (y) {
        var xObjectMap = map.get(y);
        xObjectMap.traverse(function (x) {
          cb({
            y: y,
            x: x
          }, xObjectMap.get(x));
        });
      });
    }
  }, {
    key: "useIterator",
    value: function useIterator() {
      var yAndXObjectMapGenerator = this.map.useIterator('Y');
      var xAndOffsetCoordGenerator = null;
      var yAndXObjectMap = null;
      var offsetCoordList = null;
      var offsetIndex = -1;
      var y = -1;
      var x = -1;
      var that = this;

      var next = function next() {
        if (offsetCoordList) {
          /* 尝试拿到下一个 offsetCoord */
          var offsetCoord = offsetCoordList[offsetIndex + 1];
          /* 拿到了就直接返回 */

          if (offsetCoord) {
            offsetIndex = offsetIndex + 1;
            return {
              start: {
                y: y,
                x: x
              },
              offsetCoord: offsetCoord
            };
          }
        }

        var xAndOffsetCoord = null;
        /* 如果没有的话, 尝试拿到下一个 x 下的 offsetCoordList */

        /* 没有 x 生成器, 从当前 y 生成器拿一个 */

        if (xAndOffsetCoordGenerator) {
          /* 尝试拿到下一个 x */
          xAndOffsetCoord = xAndOffsetCoordGenerator();
        }
        /* 有当前 y 下 x 生成器, 且拿到了下一个 */


        if (xAndOffsetCoord) {
          x = xAndOffsetCoord.key;
          offsetCoordList = xAndOffsetCoord.value;
          offsetIndex = -1;
          return next();
        }
        /* 再试一次, 可能只是当前 y 下的 xObjectMap 到头了, 但是下一个 y 可能有 */


        yAndXObjectMap = yAndXObjectMapGenerator();
        /* 下一个 y 也没有 */

        if (!yAndXObjectMap) {
          return null;
        }
        /* 惊了, 有了 */


        y = yAndXObjectMap.key;
        xAndOffsetCoordGenerator = yAndXObjectMap.value.useIterator('X');
        xAndOffsetCoord = xAndOffsetCoordGenerator();
        x = xAndOffsetCoord.key;
        offsetCoordList = xAndOffsetCoord.value;
        offsetIndex = -1;
        return next();
      };

      return next;
    }
  }, {
    key: "get",
    value: function get(coord) {
      var xObjectMap = this.map.get(coord.y);

      if (!xObjectMap) {
        return null;
      }

      var offsetCoord = xObjectMap.get(coord.x);

      if (!offsetCoord) {
        return null;
      }

      return offsetCoord;
    }
    /**
     * 1. 标记一个 offsetCoord 被更新过了, 以便当使用 useIterator 的时候, 保证这个更新过的 offsetCoord 不会被跳过
     * 2. 标记一个 offsetCoord 的 x 偏移量
     * @param {CoordLike} coord       [偏移起始点]
     * @param {CoordLike} offsetCoord [偏移坐标向量]
     */

  }, {
    key: "add",
    value: function add(coord, offsetCoord) {
      var xObjectMap = this.map.get(coord.y);

      if (!xObjectMap) {
        xObjectMap = new ObjectMap();
        this.map.set(coord.y, xObjectMap);
        xObjectMap.set(coord.x, [offsetCoord]);
        return;
      }

      var prevOffsetCoord = xObjectMap.get(coord.x);

      if (!prevOffsetCoord) {
        xObjectMap.set(coord.x, [offsetCoord]);
        return;
      }

      xObjectMap.get(coord.x).push(offsetCoord);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.map.reset();
    }
  }, {
    key: "size",
    get: function get() {
      return this.map.size;
    }
  }]);

  return OffsetMap;
}();

var CursorMgr =
/*#__PURE__*/
function () {
  function CursorMgr(aqua) {
    _classCallCheck(this, CursorMgr);

    this.aqua = aqua;
    this.primary = null;
    this.mods = Object.create(null);
    this.cursors = [];
    this.offsetMap = new OffsetMap();
  }

  _createClass(CursorMgr, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.create();
      this.traverse(function (cursor) {
        cursor.y = 0;
        cursor.x = 0;
      });
      this.aqua.khala.on('microEvent', function (data) {
        var source = data.source,
            start = data.start,
            end = data.end;

        if (source === 'write') {
          _this.offsetMap.add(start, {
            y: end.y - start.y,
            x: end.x - start.x
          });

          return;
        }

        if (source === 'delete') {
          _this.offsetMap.add(start, {
            y: start.y - end.y,
            x: start.x - end.x
          });

          return;
        }
      });
    }
  }, {
    key: "setPrimary",
    value: function setPrimary(cursor) {
      this.primary = cursor;
    }
  }, {
    key: "getPrimary",
    value: function getPrimary(cb) {
      cb && cb(this.primary);
      return this.primary;
    }
  }, {
    key: "isPrimary",
    value: function isPrimary(cursor) {
      return cursor === this.primary;
    }
  }, {
    key: "pureTraverse",
    value: function pureTraverse(cb) {
      var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.size;
      var cursors = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.cursors;

      for (var i = start; i < end; i++) {
        if (cb(cursors[i], i) === false) {
          return;
        }
      }
    }
  }, {
    key: "traverse",
    value: function traverse(cb) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$viewport = _ref.viewport,
          viewport = _ref$viewport === void 0 ? this.aqua.viewport : _ref$viewport,
          _ref$cursors = _ref.cursors,
          cursors = _ref$cursors === void 0 ? this.cursors : _ref$cursors,
          _ref$filter = _ref.filter,
          filter = _ref$filter === void 0 ? function (cursor) {
        return true;
      } : _ref$filter,
          _ref$detect = _ref.detect,
          detect = _ref$detect === void 0 ? true : _ref$detect,
          _ref$after = _ref.after,
          after = _ref$after === void 0 ? null : _ref$after,
          _ref$track = _ref.track,
          track = _ref$track === void 0 ? true : _ref$track;

      console.groupCollapsed('action start');
      var flusher = this.useFlushOffsetIterator();

      for (var i = 0; i < cursors.length; i++) {
        console.group('当前光标序号', i);
        var cursor = cursors[i];
        flusher.next(cursor);
        console.warn('光标位置', cursor.coord.extract());
        filter(cursor, i) && cb(cursor, i);
        console.groupEnd('当前光标序号', i);
      }

      detect && this.detect();
      /* 检测光标与选区的冲突 */

      after && after();
      flusher.reset();
      console.groupEnd('action start');
      this.aqua.renderer.renderGroup('standard', viewport);
      track && this.aqua.renderer.renderWithLowPriority('tracker', viewport);
    }
  }, {
    key: "create",
    value: function create() {
      var coord = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var setPrimary = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var modName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Anchor';
      var Cursor = this.mods[modName];
      var cursor = new Cursor(this.aqua);

      if (coord) {
        cursor.coord.assign(coord);
      }

      setPrimary && this.setPrimary(cursor);
      this.cursors.push(cursor);
      this.resort();
      return cursor;
    }
  }, {
    key: "removeAll",
    value: function removeAll() {
      var exceptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.primary;

      if (!Array.isArray(exceptions)) {
        exceptions = [exceptions];
      }

      this.cursors = exceptions;
    }
  }, {
    key: "remove",
    value: function remove(cursors) {
      if (!Array.isArray(cursors)) {
        cursors = [cursors];
      }

      for (var i = 0; i < cursors.length; i++) {
        var cursor = cursors[i];
        var index = this.cursors.indexOf(cursor);

        if (index !== -1) {
          this.cursors.splice(index, 1);
        }
      }
    }
  }, {
    key: "flushOffset",
    value: function flushOffset() {
      var flusher = this.useFlushOffsetIterator();

      if (!flusher) {
        return;
      }

      this.pureTraverse(function (cursor) {
        flusher.next(cursor);
      });
      flusher.reset();
    }
  }, {
    key: "resort",
    value: function resort() {
      var cursors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.cursors;
      cursors.sort(function (cursorA, cursorB) {
        var diffY = cursorA.y - cursorB.y;
        return diffY === 0 ? cursorA.x - cursorB.x : diffY;
      });
    }
    /**
     * 用于检测 cursor 在 cursors 中是否重合, 返回与其重合的光标列表
     * @param  {Cursor} cursor  [检测的光标]
     * @param  {Array<Cursor>} cursors [光标处于的光标列表]
     * @return {Array<Cursor>}         [与 cursor 重合的光标]
     */

  }, {
    key: "detectCursorCoordOverlay",
    value: function detectCursorCoordOverlay() {
      var cursor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.primary;
      var cursors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.cursors;

      if (cursors.length < 2) {
        return null;
      }

      var index = cursors.indexOf(cursor);

      if (index === -1) {// #Error
      }

      var coord = cursor.coord;
      var prev = cursors[index - 1];

      if (prev) {
        if (prev.selection.isCollapsed()) {
          if (coord.equal(prev.coord)) {
            return prev;
          }
        } else {
          if (coord.less(prev.selection.end)) {
            return prev;
          }
        }
      }

      var next = cursors[index + 1];

      if (next) {
        if (next.selection.isCollapsed()) {
          if (coord.equal(next.coord)) {
            return next;
          }
        } else {
          if (coord.greater(next.selection.start)) {
            return next;
          }
        }
      }

      return null;
    }
    /**
     * 用于检测 cursor 与其 selection 在 cursors 中是否重合, 返回与其重合的光标列表
     * @param  {Cursor} cursor  [检测的光标]
     * @param  {Array<Cursor>} cursors [光标处于的光标列表]
     * @return {Array<Cursor>}         [与 cursor 重合的光标]
     */

  }, {
    key: "detectCursorSelectionOverlay",
    value: function detectCursorSelectionOverlay() {
      var cursor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.primary;
      var cursors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.cursors;
      var overlayCursors = [];

      if (cursors.length < 2) {
        return overlayCursors;
      }

      var index = cursors.indexOf(cursor);

      if (index === -1) {// #Error
      }

      var selection = cursor.selection;

      if (selection.isCollapsed()) {
        return overlayCursors;
      }

      var direction = cursor.selection.direction;

      if (direction === ArgOpt.SelectionDirectionIsTopLeft) {
        for (var i = index - 1; i >= 0; i--) {
          var prev = cursors[i];

          if (prev.selection.isCollapsed()) {
            if (prev.coord.greater(selection.start)) {
              overlayCursors.push(prev);
              continue;
            }

            return overlayCursors;
          } else {
            if (prev.selection.end.greater(selection.start)) {
              overlayCursors.push(prev);
              continue;
            }

            return overlayCursors;
          }
        }

        return overlayCursors;
      }

      if (direction === ArgOpt.SelectionDirectionIsBottomRight) {
        for (var _i = index + 1; _i < cursors.length; _i++) {
          var next = cursors[_i];

          if (next.selection.isCollapsed()) {
            if (next.coord.less(selection.end)) {
              overlayCursors.push(next);
              continue;
            }

            return overlayCursors;
          } else {
            if (next.selection.start.less(selection.end)) {
              overlayCursors.push(next);
              continue;
            }

            return overlayCursors;
          }
        }
      } // #Error


      return overlayCursors;
    }
  }, {
    key: "detect",
    value: function detect() {
      var cursors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.cursors;

      if (cursors.length < 2) {
        return;
      }

      var remover = this.useDelayRemover();

      for (var i = 0; i < cursors.length - 1; i++) {
        var current = cursors[i];
        var next = cursors[i + 1];
        var currentSelection = current.selection;
        var nextSelection = next.selection;

        if (currentSelection.isCollapsed()) {
          // 当前光标没选区
          if (nextSelection.isCollapsed()) {
            // 下一个光标也没选区
            if (current.coord.equal(next.coord)) {
              // 重叠了就删除当前的光标
              remover.push(current, next);
            }

            continue;
          } else {
            // 下一个光标有选区
            if (current.coord.greater(nextSelection.start, ArgOpt.ContainEqual)) {
              // 但是当前光标的位置比下一个选区的起点还大
              remover.push(current, next);
              continue;
            }
          }
        } else {
          // 当前光标有选区
          if (nextSelection.isCollapsed()) {
            // 下一个光标没选区
            if (currentSelection.end.greater(next.coord, ArgOpt.ContainEqual)) {
              // 但是当前光标的选区终点比下一个光标还大
              next.merge(current);
              remover.push(current, next);
              continue;
            }
          } else {
            // 下一个光标有选区
            if (currentSelection.end.greater(nextSelection.start)) {
              // 但是当前光标的选区终点比下一个光标的选区起点还大
              next.merge(current);
              remover.push(current, next);
              continue;
            }
          }
        }
      }

      remover.remove();
    }
    /* Tool */

    /**
     * 在调用遍历类的方法进行删除操作时, 由于直接删除会导致数组下标对不上, 会报错.
     * 所以在遍历时, 需要将删除的光标推入队列, 然后在遍历结束后进行删除
     * @param  {Array}  list             [光标的删除队列]
     * @param  {Cursor} primaryCandidate [该光标在队列清空后作为主光标]
     * @return {Object}                  []
     */

  }, {
    key: "useDelayRemover",
    value: function useDelayRemover() {
      var _this2 = this;

      var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var primaryCandidate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var push = function push(cursor, fromCursor) {
        if (_this2.isPrimary(cursor)) {
          primaryCandidate = fromCursor;
        }

        list.push(cursor);
      };

      var remove = function remove() {
        var setPrimary = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        setPrimary && primaryCandidate && _this2.setPrimary(primaryCandidate);
        list.length > 0 && _this2.remove(list);
        return list;
      };

      return {
        push: push,
        remove: remove
      };
    }
    /**
     * 只允许设定光标的位置信息哦
     * @return {Object} [description]
     */

  }, {
    key: "useCreator",
    value: function useCreator() {
      var self = this;
      var cursors = [];

      var push = function push(cb) {
        var modName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Anchor';
        var cursor = self.usePhantom(modName);
        cursors.push(cursor);
        cb(cursor);
      };

      var create = function create() {
        return cursors;
      };

      return {
        push: push,
        create: create
      };
    }
  }, {
    key: "usePhantom",
    value: function usePhantom() {
      var modName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Anchor';
      var Cursor = this.mods[modName];
      return new Cursor(this.aqua);
    }
  }, {
    key: "useFlushOffsetIterator",
    value: function useFlushOffsetIterator() {
      var offsetMap = this.offsetMap;
      var offsetCoordGenerator = offsetMap.useIterator();
      var yAcc = 0;
      var xAcc = 0;
      var lastY = -1;
      var isTerminate = false;
      var nextOffsetCoord = null;
      return {
        next: function next(cursor) {
          var offsetUpdater = cursor.useOffsetUpdater();
          var coord = cursor.coord.clone();
          coord.y = coord.y + yAcc;

          if (coord.y === lastY) {
            coord.x = coord.x + xAcc;
          } else {
            xAcc = 0;
          }

          while (true) {
            if (!isTerminate) {
              nextOffsetCoord = offsetCoordGenerator();
            }

            if (!nextOffsetCoord) {
              break;
            }

            var _nextOffsetCoord = nextOffsetCoord,
                start = _nextOffsetCoord.start,
                offsetCoord = _nextOffsetCoord.offsetCoord;

            if (CoordHelper.less(coord, start, ArgOpt.ContainEqual)) {
              lastY = offsetCoord.y < 0 ? start.y : start.y + offsetCoord.y;
              isTerminate = true;
              break;
            }

            yAcc = yAcc + offsetCoord.y;
            var currentY = offsetCoord.y < 0 ? start.y : start.y + offsetCoord.y;

            if (start.y !== lastY) {
              xAcc = 0;
            }

            xAcc = xAcc + offsetCoord.x;
            lastY = currentY;
            isTerminate = false;
          }

          offsetUpdater.setY(yAcc);
          offsetUpdater.setX(xAcc);
          cursor.updateOffset(offsetUpdater.flush(), lastY);
        },
        reset: function reset() {
          offsetMap.reset();
        }
      };
    }
    /**
     * Line 与 Mode 存的是实例, 因为他们是一个 Handler. Cursor 存的是构造函数, 因为需要返回实例
     * @param  {Cursor} Cursor [Cursor 的构造函数]
     * @return {CursorMgr}
     */

  }, {
    key: "load",
    value: function load(Cursor) {
      var name = Cursor.name;
      this.mods[name] = Cursor;

      if (!this.aqua.state.mod.cursor) {
        this.aqua.state.mod.cursor = Cursor;
      }

      return this;
    }
  }, {
    key: "extract",
    value: function extract() {
      var cursors = [];
      this.pureTraverse(function (cursor) {
        cursors.push(cursor.extract());
      });
      return {
        primary: this.cursors.indexOf(this.primary),
        cursors: cursors
      };
    }
  }, {
    key: "rebuild",
    value: function rebuild(data) {
      if (!data) {
        this.cursors = [];
        this.create();
        this.traverse(function (cursor) {
          cursor.y = 0;
          cursor.x = 0;
        });
        return;
      }

      var primary = data.primary,
          cursors = data.cursors;
      var creator = this.useCreator();

      var _loop = function _loop(i) {
        creator.push(function (cursor) {
          cursor.rebuild(cursors[i]);
        });
      };

      for (var i = 0; i < cursors.length; i++) {
        _loop(i);
      }

      this.cursors = creator.create();
      this.setPrimary(this.cursors[primary]);
    }
  }, {
    key: "size",
    get: function get() {
      return this.cursors.length;
    }
  }]);

  return CursorMgr;
}();

module.exports = CursorMgr;
},{"../enums/index":"../aQua/src/enums/index.js","../helpers/index":"../aQua/src/helpers/index.js"}],"../aQua/src/components/DetailBarMgr.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../enums/index'),
    CatalogueNodeType = _require.CatalogueNodeType;

var _require2 = require('../models/index'),
    CatalogueNode = _require2.CatalogueNode;

var Aqua = new CatalogueNode({
  name: 'aQua',
  type: CatalogueNodeType.Project,
  src: '\'',
  children: [new CatalogueNode({
    name: 'benchmark',
    type: CatalogueNodeType.Folder
  }), new CatalogueNode({
    name: 'docs',
    type: CatalogueNodeType.Folder,
    children: [new CatalogueNode({
      name: 'images',
      type: CatalogueNodeType.Folder,
      children: [new CatalogueNode({
        name: 'aqua-chan',
        type: CatalogueNodeType.File,
        ext: 'png'
      }), new CatalogueNode({
        name: 'aqua-eat',
        type: CatalogueNodeType.File,
        ext: 'jpg'
      }), new CatalogueNode({
        name: 'aqua-gun',
        type: CatalogueNodeType.File,
        ext: 'gif'
      })]
    }), new CatalogueNode({
      name: 'src',
      type: CatalogueNodeType.Folder,
      children: [new CatalogueNode({
        name: 'index',
        type: CatalogueNodeType.File,
        ext: 'js'
      })]
    })]
  }), new CatalogueNode({
    name: '.editorconfig',
    type: CatalogueNodeType.File
  }), new CatalogueNode({
    name: 'LICENSE',
    type: CatalogueNodeType.File
  }), new CatalogueNode({
    name: 'index',
    type: CatalogueNodeType.File,
    ext: 'js'
  })]
});

var DetailBarMgr =
/*#__PURE__*/
function () {
  function DetailBarMgr(aqua) {
    var catalogue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, DetailBarMgr);

    this.aqua = aqua;
    this.renderer = aqua.renderer;
    this.catalogue = catalogue;
  }

  _createClass(DetailBarMgr, [{
    key: "init",
    value: function init() {
      this.aqua.renderer.render('detailBar', [Aqua]);
    }
  }]);

  return DetailBarMgr;
}();

module.exports = DetailBarMgr;
},{"../enums/index":"../aQua/src/enums/index.js","../models/index":"../aQua/src/models/index.js"}],"../aQua/src/components/DocMgr.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../models/index'),
    Doc = _require.Doc,
    Coord = _require.Coord,
    Line = _require.Line,
    Chunk = _require.Chunk;

var _require2 = require('../enums/index'),
    LineStatus = _require2.LineStatus,
    DocUpdateOptions = _require2.DocUpdateOptions;

var _require3 = require('../helpers/index'),
    CoordHelper = _require3.CoordHelper;

var DocMgr =
/*#__PURE__*/
function () {
  function DocMgr(aqua) {
    _classCallCheck(this, DocMgr);

    this.khala = aqua.khala;
    this.docWatcher = aqua.docWatcher;
    this.chronicle = aqua.chronicle;
    this.cursorMgr = aqua.cursorMgr;
    this.doc = new Doc();
  }

  _createClass(DocMgr, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.docWatcher.on('resize', function (lines) {
        _this.resize(lines);
      });
      this.wrap();
      this.writePrototype('');
    }
    /**
     * 为 writePrototype 和 deletePrototype 添加更多特殊效果
     * @return {Undefined}
     */

  }, {
    key: "wrap",
    value: function wrap() {
      var _this2 = this;

      /**
       * 1. 将 writePrototype 作为 microEvent, 此时将计入 Undo & Redo
       * @param  {Boolean} options.isInsert [是否将 contengs 插入到下一行开头]
       * @param  {Boolean} options.track    [是否将该次写入计入 Undo & Redo]
       */
      this.write = function (contents) {
        var coordOrCursor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            _ref$isInsert = _ref.isInsert,
            isInsert = _ref$isInsert === void 0 ? false : _ref$isInsert,
            _ref$track = _ref.track,
            track = _ref$track === void 0 ? true : _ref$track;

        if (!Array.isArray(contents)) {
          contents = [contents];
        }

        var coord = coordOrCursor && coordOrCursor.coord || coordOrCursor || _this2.cursorMgr.getPrimary().coord;

        _this2.correctCoord(coord);

        var result = _this2.writePrototype(contents, coord, isInsert);

        if (track) {
          var start = coord.extract && coord.extract() || coord;

          if (isInsert) {
            start.x = _this2.getLine(start.y).length;
            contents.unshift('');
          }

          var end = {
            y: coord.y + result.y,
            x: result.y > 0 ? result.x : coord.x + result.x
          };

          _this2.khala.emit('microEvent', {
            source: 'write',
            contents: contents,
            start: start,
            end: end
          });
        }

        return result;
      };
      /**
       * 1. 将 deletePrototype 作为 microEvent, 此时将计入 Undo & Redo
       * @param  {Boolean} options.track    [是否将该次删除计入 Undo & Redo]
       */


      this.delete = function (start, end) {
        var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            _ref2$track = _ref2.track,
            track = _ref2$track === void 0 ? true : _ref2$track;

        _this2.correctCoord(start);

        _this2.correctCoord(end);

        if (CoordHelper.greater(start, end)) {
          var _ref3 = [end, start];
          start = _ref3[0];
          end = _ref3[1];
        }

        var result = _this2.deletePrototype(start, end);

        if (result.length === 0) {
          return result;
        }

        if (track) {
          start = start.extract && start.extract() || start;
          end = end.extract && end.extract() || end;

          _this2.khala.emit('microEvent', {
            source: 'delete',
            contents: result,
            start: start,
            end: end
          });
        }

        return result;
      };
    }
  }, {
    key: "resize",
    value: function resize(lines) {
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!lines) {
        return;
      }

      var effectChunks = [];
      var heightsCollection = [];
      var lastParent = lines[0].parent;
      var heightAcc = 0;

      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var heightDiff = line.flushHeightBuffer();
        var curParent = line.parent;

        if (curParent !== lastParent) {
          effectChunks.push(lastParent);
          heightsCollection.push(heightAcc);
          heightAcc = 0;
          lastParent = curParent;
        }

        heightAcc = heightAcc + heightDiff;
      }

      effectChunks.push(lastParent);
      heightsCollection.push(heightAcc);
      heightAcc = 0;
      var ACCPointer = 0;
      var heights = [];
      this.doc.bubble(effectChunks, function (chunk) {
        var height = heightsCollection[ACCPointer];
        chunk.height = chunk.height + height;
        heightAcc = heightAcc + height;
        ACCPointer = ACCPointer + 1;
      }, function () {
        heights.push(heightAcc);
        heightAcc = 0;
      }, function () {
        heightsCollection = heights;
        heights = [];
        ACCPointer = 0;
        heightAcc = 0;
      });
    }
  }, {
    key: "writePrototype",
    value: function writePrototype(contents) {
      var coord = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Coord();
      var isInsert = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (!Array.isArray(contents)) {
        contents = [contents];
      }

      var startLineNum = coord.y;
      var effectLines = [];

      if (this.doc.isLegal(startLineNum)) {
        var _this$doc$get = this.doc.get(startLineNum),
            chunk = _this$doc$get.chunk,
            offset = _this$doc$get.offset;

        var line = chunk.get(offset);

        if (isInsert) {
          var lines = Line.toInstances(contents);
          this.doc.insert(startLineNum + 1, lines);
          effectLines = lines;
        } else {
          effectLines.push(line);

          if (contents.length > 1) {
            var _lines = Line.toInstances(contents, 1);

            _lines[_lines.length - 1].write(line.delete(coord.x));

            this.doc.insert(startLineNum + 1, _lines);
            effectLines = effectLines.concat(_lines);
          }

          line.write(contents[0], coord.x);
        }
      } else {
        var _lines2 = Line.toInstances(contents);

        this.doc.insert(startLineNum, _lines2);
        effectLines = _lines2;
      }

      this.docWatcher.emit('change', {
        effectLineNum: startLineNum,
        effectLines: effectLines,
        source: 'write'
      });
      var effectY = contents.length - 1;
      return {
        y: isInsert ? effectY + 1 : effectY,
        x: contents[effectY].length
      };
    }
  }, {
    key: "deletePrototype",
    value: function deletePrototype(start, end) {
      var deleteAsset = [];

      if (start.y === end.y && start.x === end.x) {
        return deleteAsset;
      }

      var startLineNum = start.y;
      var endLineNum = end.y;
      var distance = endLineNum - startLineNum;
      var effectLines = [];
      var effectCount = 0;

      if (distance === 0) {
        var _this$doc$search = this.doc.search(startLineNum),
            chunk = _this$doc$search.chunk,
            offset = _this$doc$search.offset;

        var line = chunk.get(offset);
        deleteAsset.push(line.delete(start.x, end.x));
        effectLines = [line];
      }

      if (distance === 1) {
        var lines = this.doc.getLeaves(startLineNum, endLineNum + 1);
        var startLine = lines[0];
        var lastLine = lines[1];
        deleteAsset.push(startLine.delete(start.x));
        deleteAsset.push(lastLine.read(0, end.x));
        startLine.write(lastLine.read(end.x));
        lastLine.release(); // 用于其他地方的 diff 比较

        this.doc.remove(endLineNum, 1);
        effectLines = [startLine];
        effectCount = 1;
      }

      if (distance > 1) {
        var _lines3 = this.doc.getLeaves(startLineNum, endLineNum + 1);

        var _startLine = _lines3[0];
        var _lastLine = _lines3[_lines3.length - 1];
        deleteAsset.push(_startLine.delete(start.x));

        _startLine.write(_lastLine.read(end.x));

        Line.setStatus(_lines3.slice(1), LineStatus.DELETED);
        var removeLines = this.doc.remove(startLineNum + 1, endLineNum - startLineNum);

        for (var i = 0; i < removeLines.length - 1; i++) {
          deleteAsset.push(removeLines[i].data);
        }

        deleteAsset.push(removeLines[removeLines.length - 1].read(0, end.x));
        effectLines = [_startLine];
        effectCount = _lines3.length - 1;
      }

      this.docWatcher.emit('change', {
        effectLineNum: startLineNum,
        effectLines: effectLines,
        source: 'delete'
      });
      return deleteAsset;
    }
    /**
     * @param  {Coord} start [description]
     * @param  {Coord} end   [description]
     * @return {Array<Assets>}       [description]
     */

  }, {
    key: "read",
    value: function read(start, end) {
      var startLineNum = start.y;
      var endLineNum = end.y;
      var distance = end.y - start.y;

      if (distance === 0) {
        var _this$doc$get2 = this.doc.get(startLineNum),
            chunk = _this$doc$get2.chunk,
            offset = _this$doc$get2.offset;

        var line = chunk.get(offset);
        return [line.read(start.x, end.x)];
      }

      var lines = this.doc.getLeaves(startLineNum, endLineNum + 1);
      var firstLineContent = lines[0].read(start.x);
      var endLineContent = lines[1].read(0, end.x);

      if (distance === 1) {
        return [firstLineContent, endLineContent];
      }

      var result = [];
      result.push(firstLineContent);

      for (var i = 1; i < lines.length - 1; i++) {
        result.push(lines[i].read());
      }

      result.push(endLineContent);
      return result;
    }
  }, {
    key: "getLine",
    value: function getLine(lineNum) {
      var returnHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (returnHeight) {
        return this.getLineWithHeight(lineNum);
      }

      var _this$doc$get3 = this.doc.get(lineNum),
          chunk = _this$doc$get3.chunk,
          offset = _this$doc$get3.offset;

      return chunk.get(offset);
    }
  }, {
    key: "getLineWithHeight",
    value: function getLineWithHeight(lineNum) {
      var _this$doc$get4 = this.doc.get(lineNum, true),
          chunk = _this$doc$get4.chunk,
          offset = _this$doc$get4.offset,
          height = _this$doc$get4.height;

      var line = chunk.get(offset);
      line.top = height;
      return line;
    }
  }, {
    key: "getLineByHeight",
    value: function getLineByHeight(height) {
      var isContainBottomBorder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var _this$doc$getByHeight = this.doc.getByHeight(height, isContainBottomBorder),
          chunk = _this$doc$getByHeight.chunk,
          offset = _this$doc$getByHeight.offset,
          size = _this$doc$getByHeight.size,
          top = _this$doc$getByHeight.height;

      var line = chunk.get(offset);
      line.top = height - top;
      line.staticLineNum = size;
      return line;
    }
  }, {
    key: "getFirstLine",
    value: function getFirstLine() {
      var returnHeight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return returnHeight ? this.getLineWithHeight(0) : this.getLine(0);
    }
  }, {
    key: "getLastLine",
    value: function getLastLine() {
      var returnHeight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return returnHeight ? this.getLineWithHeight(Infinity) : this.getLine(Infinity);
    }
  }, {
    key: "getLines",
    value: function getLines(start) {
      var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : start + 1;
      return this.doc.getLeaves(start, end);
    }
  }, {
    key: "correctLineNum",
    value: function correctLineNum(lineNum) {
      return this.doc.correct(lineNum, true);
    }
  }, {
    key: "correctLineNumAsIndex",
    value: function correctLineNumAsIndex(lineNum) {
      return this.doc.correct(lineNum);
    }
  }, {
    key: "correctCoord",
    value: function correctCoord(coord) {
      var yMax = this.size;
      var y = coord.y;

      if (y < 0) {
        coord.y = 0;
        coord.x = 0;
        return coord;
      } else if (y >= yMax) {
        coord.y = yMax - 1;
        coord.x = this.getLastLine().length;
        return coord;
      }

      var xMax = this.getLine(y).length;
      var x = coord.x;
      coord.x = x < 0 ? 0 : x > xMax ? xMax : x;
      return coord;
    }
  }, {
    key: "extract",
    value: function extract() {
      return this.doc.getLeaves().map(function (line) {
        return line.extract();
      });
    }
  }, {
    key: "rebuild",
    value: function rebuild(doc) {
      if (!doc) {
        this.doc = new Doc();
        this.writePrototype('');
        return;
      }

      this.doc = new Doc();
      var contents = doc.map(function (line) {
        return line[1];
      });
      this.writePrototype(contents);
    }
  }, {
    key: "size",
    get: function get() {
      return this.doc.size;
    }
  }, {
    key: "height",
    get: function get() {
      return this.doc.height;
    }
  }, {
    key: "pseudoStartCoord",
    get: function get() {
      return {
        y: 0,
        x: 0
      };
    }
  }, {
    key: "pseudoEndCoord",
    get: function get() {
      return {
        y: this.size - 1,
        x: this.getLastLine().length
      };
    }
  }]);

  return DocMgr;
}();

module.exports = DocMgr;
},{"../models/index":"../aQua/src/models/index.js","../enums/index":"../aQua/src/enums/index.js","../helpers/index":"../aQua/src/helpers/index.js"}],"../aQua/src/components/Inputer.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../utils/index'),
    Limiter = _require.Limiter;

var Inputer =
/*#__PURE__*/
function () {
  function Inputer(aqua) {
    var $inputer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    _classCallCheck(this, Inputer);

    this.aqua = aqua;
    this.$inputer = $inputer;
    this.limitedPoll = Limiter.toNextTick(this.normalPoll.bind(this), 17, 17);
  }

  _createClass(Inputer, [{
    key: "focus",
    value: function focus() {
      if (!this.aqua.state.focus) {
        this.$inputer.focus({
          preventScroll: true
        });
      }
    }
  }, {
    key: "init",
    value: function init() {
      this.setInputer(this.aqua.uiMgr.get('inputer'));
    }
  }, {
    key: "setInputer",
    value: function setInputer($inputer) {
      this.$inputer = $inputer;
    }
  }, {
    key: "poll",
    value: function poll() {
      var immediate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      immediate ? this.normalPoll() : this.limitedPoll();
    }
  }, {
    key: "normalPoll",
    value: function normalPoll() {
      var text = this.$inputer.value;
      this.$inputer.value = '';
      this.aqua.khala.emit('input', text);
    }
  }]);

  return Inputer;
}();

module.exports = Inputer;
},{"../utils/index":"../aQua/src/utils/index.js"}],"../aQua/src/measurers/AsyncMeasurer.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AsyncMeasurer =
/*#__PURE__*/
function () {
  function AsyncMeasurer(aqua, extend) {
    _classCallCheck(this, AsyncMeasurer);

    this.aqua = aqua;
    this.$asyncMeasurers = Object.create(null);
    extend('getMeasurer', this.getMeasurer.bind(this));
  }

  _createClass(AsyncMeasurer, [{
    key: "getMeasurer",
    value: function getMeasurer(key, lineOrData, modName) {
      var $asyncMeasurers = this.$asyncMeasurers;
      var measurer = $asyncMeasurers[key];

      if (measurer) {
        return measurer;
      } // const $measure = this.createMeasure(modName)


      measurer = function measurer() {
        // const height = $measure.getBoundingClientRect().height
        var height = this.korwa.measureHeight();
        console.error('measure', height);
        delete $asyncMeasurers[key]; // $measure.remove()

        return height;
      };

      $asyncMeasurers[key] = measurer;
      DOM.appendChild($measure.children[1].firstChild, this.aqua.processorMgr.transformToElements(lineOrData));
      return measurer;
    }
  }]);

  return AsyncMeasurer;
}();

module.exports = AsyncMeasurer;
},{}],"../aQua/src/measurers/LineMeasurer.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../utils/index'),
    DOM = _require.DOM;

var LineMeasurer =
/*#__PURE__*/
function () {
  function LineMeasurer(aqua, extend) {
    _classCallCheck(this, LineMeasurer);

    this.aqua = aqua;
    this.lineHeight = Object.create(null);
    this.$measures = Object.create(null);
    this.init();
    extend('getSingleLineHeight', this.getSingleLineHeight.bind(this));
    extend('measureHeight', this.measureHeight.bind(this));
    extend('measureLinesHeight', this.measureLinesHeight.bind(this));
    extend('measure', this.measure.bind(this));
    extend('$getLine', this.$getLine.bind(this));
  }

  _createClass(LineMeasurer, [{
    key: "init",
    value: function init() {
      this.initMeasurers();
      this.measureSingleLineHeight();
    }
  }, {
    key: "initMeasurers",
    value: function initMeasurers() {
      var $f = DOM.f();
      var $lineMeasurer = this.aqua.uiMgr.get('lineMeasurer');
      var mods = this.aqua.lineMgr.mods;

      for (var name in mods) {
        var mod = mods[name];
        var $measure = mod.create();
        this.$measures[mod.name] = $measure;
        DOM.appendChild($f, $measure);
      }

      DOM.appendChild($lineMeasurer, $f);
    }
  }, {
    key: "getSingleLineHeight",
    value: function getSingleLineHeight() {
      var modName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.aqua.state.mod.line.name;
      return this.lineHeight[modName];
    }
  }, {
    key: "measureHeight",
    value: function measureHeight(lineNumOrLineOrData) {
      var modName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Text';
      return this.measure(lineNumOrLineOrData, modName).height;
    }
  }, {
    key: "measureLinesHeight",
    value: function measureLinesHeight(lines) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$viewport = _ref.viewport,
          viewport = _ref$viewport === void 0 ? null : _ref$viewport,
          _ref$startFrom = _ref.startFrom,
          startFrom = _ref$startFrom === void 0 ? -1 : _ref$startFrom;

      var heights = [];

      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        heights.push(this.measureHeight(line, 'Text'));
      }

      return heights;
    }
  }, {
    key: "measureSingleLineHeight",
    value: function measureSingleLineHeight() {
      var $measures = this.$measures;

      for (var modName in $measures) {
        this.lineHeight[modName] = this.measureHeight({
          data: ''
        }, modName);
      }
    }
  }, {
    key: "measure",
    value: function measure(lineNumOrLineOrData) {
      var modName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Text';
      return this.$getLine(lineNumOrLineOrData, modName).getBoundingClientRect();
    }
  }, {
    key: "$getLine",
    value: function $getLine(lineNumOrLineOrData) {
      var modName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Text';
      var lineOrData = lineNumOrLineOrData;
      var $line = null;

      if (typeof lineNumOrLineOrData === 'number') {
        var lineNum = lineNumOrLineOrData;
        $line = this.aqua.viewport.$getLine(lineNum);

        if ($line) {
          return $line;
        }

        lineOrData = this.aqua.docMgr.getLine(lineNum);
      }

      var $measure = this.$measures[modName];
      var $code = $measure.children[1].firstChild;
      DOM.clear($code);
      DOM.appendChild($code, this.aqua.processorMgr.transformToElements(lineOrData));
      return $measure;
    }
  }]);

  return LineMeasurer;
}();

module.exports = LineMeasurer;
},{"../utils/index":"../aQua/src/utils/index.js"}],"../aQua/src/measurers/RamMeasurer.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../utils/index'),
    DOM = _require.DOM,
    SizeObserver = _require.SizeObserver,
    rAF = _require.rAF;

var _require2 = require('../enums/index'),
    ArgOpt = _require2.ArgOpt;

var RamMeasurer =
/*#__PURE__*/
function () {
  function RamMeasurer(aqua, extend) {
    var _this = this;

    _classCallCheck(this, RamMeasurer);

    this.aqua = aqua;
    this.resizeObserver = null;
    this.$measureArr = [];
    this.init();
    this.lastDocSizeDigit = -1;
    this.ramWidth = -1;
    this.lineNumWidth = -1;
    extend('ramWidth', {
      get: function get() {
        return _this.ramWidth;
      }
    }, ArgOpt.EnableDefineProperty);
    extend('lineNumWidth', {
      get: function get() {
        return _this.lineNumWidth;
      }
    }, ArgOpt.EnableDefineProperty);
  }

  _createClass(RamMeasurer, [{
    key: "init",
    value: function init() {
      this.initMeasurers();
      this.listen();
      this.observe();
    }
  }, {
    key: "initMeasurers",
    value: function initMeasurers() {
      var $f = DOM.f();
      var $ramMeasurer = this.aqua.uiMgr.get('ramMeasurer');
      var mods = this.aqua.lineMgr.mods;

      for (var name in mods) {
        var mod = mods[name];
        var $measure = mod.create();
        this.disableCSSVariable($measure.firstChild.firstChild);
        this.$measureArr.push($measure.firstChild);
        DOM.appendChild($f, $measure);
      }

      DOM.appendChild($ramMeasurer, $f);
    }
  }, {
    key: "listen",
    value: function listen() {
      var _this2 = this;

      this.aqua.docWatcher.on('change', function (data) {
        var size = _this2.aqua.docMgr.size.toString();

        var sizeDigit = size.length;

        if (_this2.lastDocSizeDigit === sizeDigit) {
          return;
        }

        _this2.lastDocSizeDigit = sizeDigit;

        _this2.traverse(function ($measure) {
          rAF(function () {
            $measure.firstChild.textContent = size;
          });
        });
      });
    }
  }, {
    key: "observe",
    value: function observe() {
      var _this3 = this;

      this.resizeObserver = new SizeObserver();
      this.traverse(function ($measure) {
        _this3.resizeObserver.observe($measure, function (entry) {
          var target = entry.target;
          var contentRect = entry.contentRect;

          if (contentRect.height === 0 && contentRect.width === 0) {
            return;
          }

          _this3.ramWidth = target.clientWidth;
          _this3.lineNumWidth = target.firstChild.clientWidth;

          _this3.aqua.khala.emit('ramWidthResize', {
            ramWidth: _this3.ramWidth,
            lineNumWidth: _this3.lineNumWidth
          });
        });
      });
    }
  }, {
    key: "unobserve",
    value: function unobserve() {
      this.resizeObserver && this.resizeObserver.disconnect();
    }
    /* Rare */

  }, {
    key: "traverse",
    value: function traverse(cb) {
      var $measureArr = this.$measureArr;

      for (var i = 0; i < $measureArr.length; i++) {
        cb($measureArr[i]);
      }
    }
  }, {
    key: "disableCSSVariable",
    value: function disableCSSVariable($ele) {
      $ele.style.setProperty('width', 'auto');
      $ele.style.setProperty('left', 'unset');
    }
  }]);

  return RamMeasurer;
}();

module.exports = RamMeasurer;
},{"../utils/index":"../aQua/src/utils/index.js","../enums/index":"../aQua/src/enums/index.js"}],"../aQua/src/measurers/ViewportObserver.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../utils/index'),
    SizeObserver = _require.SizeObserver;

var ViewportObserver =
/*#__PURE__*/
function () {
  function ViewportObserver(aqua, extend) {
    _classCallCheck(this, ViewportObserver);

    this.aqua = aqua;
    this.resizeObserver = null;
    this.observe();
  }

  _createClass(ViewportObserver, [{
    key: "observe",
    value: function observe() {
      var _this = this;

      this.resizeObserver = new SizeObserver();
      this.resizeObserver.observe(this.aqua.uiMgr.get('viewport'), function (entry) {
        var contentRect = entry.contentRect;
        var viewport = _this.aqua.viewport;

        if (contentRect.height === 0 && contentRect.width === 0) {
          return;
        }

        viewport.height = contentRect.height;
        viewport.width = contentRect.width;

        _this.aqua.docWatcher.emit('change', {
          effectLines: _this.aqua.docMgr.getLines(0, _this.aqua.docMgr.size)
        });
      });
    }
  }, {
    key: "unobserve",
    value: function unobserve() {
      this.resizeObserver && this.resizeObserver.disconnect();
    }
  }]);

  return ViewportObserver;
}();

module.exports = ViewportObserver;
},{"../utils/index":"../aQua/src/utils/index.js"}],"../aQua/src/measurers/index.js":[function(require,module,exports) {
var AsyncMeasurer = require('./AsyncMeasurer');

var LineMeasurer = require('./LineMeasurer');

var RamMeasurer = require('./RamMeasurer');

var ViewportObserver = require('./ViewportObserver');

module.exports = {
  AsyncMeasurer: AsyncMeasurer,
  LineMeasurer: LineMeasurer,
  RamMeasurer: RamMeasurer,
  ViewportObserver: ViewportObserver
};
},{"./AsyncMeasurer":"../aQua/src/measurers/AsyncMeasurer.js","./LineMeasurer":"../aQua/src/measurers/LineMeasurer.js","./RamMeasurer":"../aQua/src/measurers/RamMeasurer.js","./ViewportObserver":"../aQua/src/measurers/ViewportObserver.js"}],"../aQua/src/components/Korwa.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../utils/index'),
    DOM = _require.DOM,
    Echo = _require.Echo;

var Measurers = require('../measurers/index');

var Korwa =
/*#__PURE__*/
function () {
  function Korwa(aqua) {
    _classCallCheck(this, Korwa);

    this.aqua = aqua;
  }

  _createClass(Korwa, [{
    key: "init",
    value: function init() {
      var _this = this;

      var extend = this.extend.bind(this);
      Object.keys(Measurers).forEach(function (name) {
        new Measurers[name](_this.aqua, extend, Korwa);
      });
    }
  }, {
    key: "getViewportRect",
    value: function getViewportRect() {
      return this.aqua.uiMgr.get('viewport').getBoundingClientRect();
    }
  }, {
    key: "getScrollerRect",
    value: function getScrollerRect() {
      return this.aqua.uiMgr.get('scroller').getBoundingClientRect();
    }
  }, {
    key: "getLineWidthRect",
    value: function getLineWidthRect() {
      return this.aqua.uiMgr.get('lineWidthCntr').getBoundingClientRect();
    }
  }, {
    key: "getClientRect",
    value: function getClientRect($ele) {
      return $ele.getBoundingClientRect();
    }
  }, {
    key: "getClientRects",
    value: function getClientRects($ele) {
      return $ele.getClientRects();
    }
  }, {
    key: "extend",
    value: function extend(key, fnOrProps) {
      var isDefineProperty = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (this[key]) {
        Echo.error('Korwa.prototype.extend', "key ".concat(key, " exist"));
      }

      if (isDefineProperty) {
        Object.defineProperty(this, key, fnOrProps);
        return;
      }

      this[key] = fnOrProps;
    }
  }]);

  return Korwa;
}();

module.exports = Korwa;
},{"../utils/index":"../aQua/src/utils/index.js","../measurers/index":"../aQua/src/measurers/index.js"}],"../aQua/src/components/LineMgr.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../models/index'),
    ExtendedLine = _require.ExtendedLine,
    Line = _require.Line;

var _require2 = require("../utils/index"),
    DOM = _require2.DOM;

var LineMgr =
/*#__PURE__*/
function () {
  function LineMgr(aqua) {
    _classCallCheck(this, LineMgr);

    this.aqua = aqua;
    this.mods = Object.create(null);
    this.$cntr = null;
    this.$children = null;
  }

  _createClass(LineMgr, [{
    key: "init",
    value: function init() {
      this.$cntr = this.aqua.uiMgr.get('lineCntr');
      this.$children = this.aqua.uiMgr.get('lineCntr').children;
    }
  }, {
    key: "load",
    value: function load(mod) {
      this.mods[mod.name] = mod;

      if (!this.aqua.state.mod.line) {
        this.aqua.state.mod.line = mod;
      }
    }
    /**
     * 将 Content 转化为 Line 对象
     * @param  {Array<Content>} contents
     * @return {Array<Line>}
     */

  }, {
    key: "toLines",
    value: function toLines(contents) {
      var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var end = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : contents.length;
      var lines = [];

      for (var i = start; i < end; i++) {
        lines[i] = new Line({
          content: contents[i]
        });
      }

      return lines;
    }
  }, {
    key: "extendLine",
    value: function extendLine(lineNum) {
      return new ExtendedLine(this.$getLine(lineNum), this.aqua.korwa);
    } // TODO

  }, {
    key: "$getLine",
    value: function $getLine(lineNum) {
      var viewport = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.aqua.viewport;
      return this.aqua.korwa.$getLine(lineNum);
    } // getCurrentBlock(lineNum, x) {
    //     const measuredLine = this.getMeasuredLine(lineNum)
    //     return measuredLine.getCurrentBlock(x)
    // }

  }, {
    key: "create",
    value: function create($content) {
      return this.getMod().create($content);
    }
    /* Private */

  }, {
    key: "mount",
    value: function mount($fragment) {
      var $lineCntr = this.aqua.uiMgr.get('lineCntr');
      this.aqua.uiMgr.mount($lineCntr, $fragment);
    }
  }, {
    key: "getMod",
    value: function getMod() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (typeof name !== 'string' && name) {
        return name;
      }

      return name ? this.mods[name] : this.aqua.state.mod.line;
    }
  }]);

  return LineMgr;
}();

module.exports = LineMgr;
},{"../models/index":"../aQua/src/models/index.js","../utils/index":"../aQua/src/utils/index.js"}],"../aQua/src/components/Locator.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CURSOR_HEIGHT = 22;
var LINE_HEIGHT = 24;
var FONT_SIZE = 12;

var _require = require('../utils/index'),
    Algorithm = _require.Algorithm;

var Locator =
/*#__PURE__*/
function () {
  function Locator(aqua) {
    _classCallCheck(this, Locator);

    this.lineMgr = aqua.lineMgr;
    this.doc = aqua.docMgr;
    this.korwa = aqua.korwa;
    this.scroller = aqua.scroller;
  } // ?


  _createClass(Locator, [{
    key: "getLayoutYAtLine",
    value: function getLayoutYAtLine(y) {
      var insideY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var extendedLine = this.lineMgr.extendLine(y);
      var lineRects = extendedLine.getClientRects();
      var maxInsideY = lineRects.length - 1;

      if (insideY < 0) {
        insideY = 0;
      } else if (insideY > maxInsideY) {
        insideY = maxInsideY;
      }

      var rect = lineRects[insideY];
      var measureRect = this.korwa.getScrollerRect();
      return (rect.bottom - rect.top) / 2 - this.scroller.y;
    }
  }, {
    key: "getYByLayoutY",
    value: function getYByLayoutY($y) {
      var maxHeight = this.doc.height;

      if ($y > maxHeight) {
        $y = maxHeight;
        $x = Infinity;
      } else if ($y < 0) {
        $y = 0;
        $x = 0;
      }

      var line = this.doc.getLineByHeight($y);
      var y = line.staticLineNum;
      var extendedLine = this.lineMgr.extendLine(y);
      var insideY = extendedLine.getInsideY($y - line.top);
      var lineRects = extendedLine.getClientRects();
      return {
        y: y,
        insideY: insideY,
        maxInsideY: lineRects.length - 1
      };
    }
  }, {
    key: "getXByLayoutX",
    value: function getXByLayoutX(y, insideY, $x) {
      var line = this.doc.getLine(y);

      if (line.length === 0) {
        return 0;
      }

      var extendedLine = this.lineMgr.extendLine(y);
      var lineRects = extendedLine.getClientRects();
      var maxInsideY = lineRects.length - 1;

      if (insideY < 0) {
        insideY = 0;
      } else if (insideY > maxInsideY) {
        insideY = maxInsideY;
      }

      var rect = lineRects[insideY];
      var measureRect = this.korwa.getLineWidthRect();
      var $xMax = rect.right - measureRect.left;
      var $xMin = rect.left - measureRect.left;
      var x = -1; // lineRects[insideY].rect.right 并不一定等于 lastCharRect.right (可能会大于 0.00001 左右)
      // 所以如果 $x 大于 该行最大长度, 直接设为最大长度可能是无效的
      // 在下面的二分查找中会继续处理该情况

      if ($x >= $xMax) {
        $x = $xMax;
      } else if ($x < $xMin) {
        $x = $xMin;
      }

      if (maxInsideY === 0) {
        Algorithm.binarySearch(0, extendedLine.length, function (center, lastCenter) {
          if (center === lastCenter) {
            x = center + 1;
            return 0;
          }

          var charRect = extendedLine.getElementRect(center);
          var left = charRect.left - measureRect.left;

          if ($x < left) {
            return -1;
          }

          var right = charRect.right - measureRect.left;

          if ($x > right) {
            return 1;
          }

          var half = charRect.width / 2;
          x = $x - left < half ? center : center + 1;
          return 0;
        });
      } else {
        Algorithm.binarySearch(0, extendedLine.length, function (center, lastCenter) {
          if (center === lastCenter) {
            x = center + 1;
            return 0;
          }

          var charRect = extendedLine.getElementRect(center);
          var charRectInsideY = extendedLine.getInsideY(extendedLine.transformToInsideLayoutY(charRect.bottom));

          if (insideY > charRectInsideY) {
            return 1;
          }

          if (insideY < charRectInsideY) {
            return -1;
          }

          var left = charRect.left - measureRect.left;

          if ($x < left) {
            return -1;
          }

          var right = charRect.right - measureRect.left;

          if ($x > right) {
            return 1;
          }

          var half = charRect.width / 2;
          x = $x - left < half ? center : center + 1;
          return 0;
        });
      }

      return x;
    }
  }, {
    key: "getCoordByLayout",
    value: function getCoordByLayout($y, $x) {
      var maxHeight = this.doc.height;

      if ($y > maxHeight) {
        $y = maxHeight;
        $x = Infinity;
      } else if ($y < 0) {
        $y = 0;
        $x = 0;
      }

      var line = this.doc.getLineByHeight($y);
      var lineNum = line.staticLineNum;
      var extendedLine = this.lineMgr.extendLine(y);
      var lineRects = extendedLine.getClientRects();
      var insideY = extendedLine.getInsideY($y - line.top);
      var rect = lineRects[insideY];
      var measureRect = this.korwa.getLineWidthRect();
      var $xMax = rect.right - measureRect.left;
      var $xMin = rect.left - measureRect.left;
      var x = -1;

      if ($x >= $xMax) {
        $x = $xMax;
      } else if ($x < $xMin) {
        $x = $xMin;
      }

      if (maxInsideY === 0) {
        Algorithm.binarySearch(0, extendedLine.length, function (center, lastCenter) {
          if (center === lastCenter) {
            x = center + 1;
            return 0;
          }

          var charRect = extendedLine.getElementRect(center);
          var left = charRect.left - measureRect.left;

          if ($x < left) {
            return -1;
          }

          var right = charRect.right - measureRect.left;

          if ($x > right) {
            return 1;
          }

          var half = charRect.width / 2;
          x = $x - left < half ? center : center + 1;
          return 0;
        });
      } else {
        Algorithm.binarySearch(0, extendedLine.length, function (center, lastCenter) {
          if (center === lastCenter) {
            x = center + 1;
            return 0;
          }

          var charRect = extendedLine.getElementRect(center);
          var charRectInsideY = extendedLine.getInsideY(extendedLine.transformToInsideLayoutY(charRect.bottom));

          if (insideY > charRectInsideY) {
            return 1;
          }

          if (insideY < charRectInsideY) {
            return -1;
          }

          var left = charRect.left - measureRect.left;

          if ($x < left) {
            return -1;
          }

          var right = charRect.right - measureRect.left;

          if ($x > right) {
            return 1;
          }

          var half = charRect.width / 2;
          x = $x - left < half ? center : center + 1;
          return 0;
        });
      }

      return {
        y: lineNum,
        x: x,
        insideY: insideY,
        maxInsideY: lineRects.length - 1
      };
    }
  }, {
    key: "getLayoutByCoord",
    value: function getLayoutByCoord(y, x, preferInsideY) {
      var yMax = this.doc.size;

      if (y < 0) {
        y = 0;
      } else if (y > yMax) {
        y = yMax - 1;
      } // const line = this.doc.getLine(y)


      var line = this.doc.getLineWithHeight(y);
      var extendedLine = this.lineMgr.extendLine(y);
      var xMax = line.length;

      if (xMax === 0) {
        return {
          y: this.transformToCursorPhysicalY(extendedLine.transformToLayoutY(0) + line.top),
          x: 0
        };
      }

      if (x < 0) {
        x = 0;
      } else if (x > xMax) {
        x = xMax;
      }

      var measureRect = this.korwa.getLineWidthRect();
      var xAtLast = x === xMax; // 如果是最后一格, 取 charRect 按照最后一个字取, 只不过在返回的时候返回 rect 的右边部分

      var charRectDirection = '';
      var charRect = null;
      var insideY = -1;
      charRect = extendedLine.getElementRect(xAtLast ? x - 1 : x);
      insideY = extendedLine.getInsideY(extendedLine.transformToInsideLayoutY(charRect.bottom));
      var $x = -1;

      if (preferInsideY == null) {
        charRectDirection = xAtLast ? 'right' : 'left';
      } else {
        var diff = preferInsideY - insideY;

        if (diff === 1) {
          charRect = extendedLine.getElementRect(x + 1);
          charRectDirection = 'left';
        } else if (diff === -1) {
          charRect = extendedLine.getElementRect(x - 1);
          charRectDirection = 'right';
        } else {
          charRectDirection = xAtLast ? 'right' : 'left';
        }

        insideY = preferInsideY;
      }

      return {
        y: this.transformToCursorPhysicalY(extendedLine.transformToLayoutY(insideY) + line.top),
        x: charRect[charRectDirection] - measureRect.left
      };
    }
  }, {
    key: "getInsideYByCoord",
    value: function getInsideYByCoord(y, x) {
      var extendedLine = this.lineMgr.extendLine(y);
      var charRect = extendedLine.getElementRect(Math.min(x, extendedLine.length - 1));
      return extendedLine.getInsideY(extendedLine.transformToInsideLayoutY(charRect.bottom));
    }
  }, {
    key: "getMaxInsideYByY",
    value: function getMaxInsideYByY(y) {
      var extendedLine = this.lineMgr.extendLine(y);
      var lineRects = extendedLine.getClientRects();
      return lineRects.length - 1;
    }
  }, {
    key: "transformToCursorPhysicalY",
    value: function transformToCursorPhysicalY(y) {
      return y - CURSOR_HEIGHT + (LINE_HEIGHT - FONT_SIZE) / 4;
    }
  }]);

  return Locator;
}();

module.exports = Locator;
},{"../utils/index":"../aQua/src/utils/index.js"}],"../aQua/src/options/index.js":[function(require,module,exports) {
module.exports = {
  el: null,
  content: '',
  ext: 'js',
  // extension: 'txt',
  ui: {
    theme: 'aqua',
    width: 'auto',
    height: 'auto',
    minHeight: '300',
    maxHeight: '1000',
    xOverflow: 'break',
    // 'scroll'
    yOverflow: 'scroll',
    // 'extend'
    background: function background($ctnr, DOM) {},
    foreground: function foreground($ctnr, DOM) {}
  },
  syntaxHint: {
    enabled: true
  },
  components: {
    scrollBar: true,
    minimap: true
  },
  scroller: {
    y: 0
  },
  options: {
    readOnly: false,
    multipleCursors: true
  },
  langs: {
    default: 'text',
    text: true,
    html: true,
    css: true,
    js: true
  },
  line: {
    start: 1,
    height: 25
  },
  lifetimes: {
    setup: function setup() {},
    ready: function ready() {},
    complete: function complete() {},
    destroyed: function destroyed() {}
  },
  plugins: []
};
},{}],"../aQua/src/components/OptionMgr.js":[function(require,module,exports) {
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Options = require('../options/index');

var OptionMgr =
/*#__PURE__*/
function () {
  function OptionMgr(aqua) {
    _classCallCheck(this, OptionMgr);

    this.aqua = aqua;
    this.options = Options;
  }

  _createClass(OptionMgr, [{
    key: "load",
    value: function load(options) {
      this.options = _objectSpread({}, this.options, {}, options);
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options;
      this.handleLifetimes(options.lifetimes);
      this.options.plugins = this.handlePlugins(options.plugins);
    }
  }, {
    key: "handleLifetimes",
    value: function handleLifetimes(lifetimes) {
      for (var name in lifetimes) {
        this.aqua.lifetimes.on(name, lifetimes[name]);
      }
    }
  }, {
    key: "handlePlugins",
    value: function handlePlugins(plugins) {
      return plugins.map(function (plugin) {
        if (plugin && plugin.install) {
          return plugin;
        }
      });
    }
  }, {
    key: "get",
    value: function get(key) {
      return this.options[key];
    }
  }, {
    key: "set",
    value: function set(key, value) {
      this.options[key] = value;
    }
  }]);

  return OptionMgr;
}();

module.exports = OptionMgr;
},{"../options/index":"../aQua/src/options/index.js"}],"../aQua/src/components/PluginMgr.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PluginMgr =
/*#__PURE__*/
function () {
  function PluginMgr(aqua) {
    _classCallCheck(this, PluginMgr);

    this.aqua = aqua;
    this.plugins = Object.create(null);
  }

  _createClass(PluginMgr, [{
    key: "install",
    value: function install(plugins) {
      var _this = this;

      var ins = function ins(plugin) {
        _this.plugins[plugin.name] = plugin;
        plugin.install(_this.aqua);
      };

      if (Array.isArray(plugins)) {
        plugins.forEach(ins);
        return;
      }

      ins(plugins);
    }
  }, {
    key: "uninstall",
    value: function uninstall(plugin) {
      this.plugins[plugin.name] = undefined;
      plugin.uninstall();
    }
  }]);

  return PluginMgr;
}();

module.exports = PluginMgr;
},{}],"../aQua/src/templates/index.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../utils/index'),
    DOM = _require.DOM;

var Template =
/*#__PURE__*/
function () {
  function Template() {
    _classCallCheck(this, Template);
  }

  _createClass(Template, [{
    key: "cursorTpl",
    get: function get() {
      return DOM.e('i', {
        'class': 'anchor',
        'style': 'left: 0px; top: 0px;'
      });
    }
  }, {
    key: "selectionTpl",
    get: function get() {
      return DOM.e('div', {
        'class': 'selection'
      });
    }
  }, {
    key: "selectedLineTpl",
    get: function get() {
      return DOM.e('div', {
        'class': 'selected-line'
      });
    }
  }, {
    key: "cursorMarkTpl",
    get: function get() {
      return DOM.e('div', {
        'class': 'aqua-cursor-mark'
      });
    }
  }, {
    key: "dictionaryItemTpl",
    get: function get() {
      return DOM.e('div', {
        'class': 'dictionary-item'
      });
    }
  }]);

  return Template;
}();

module.exports = new Template();
},{"../utils/index":"../aQua/src/utils/index.js"}],"../aQua/src/pools/DisposablePool.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Pool = _require.Pool;

var _require2 = require('../utils/index'),
    DOM = _require2.DOM,
    rAF = _require2.rAF;

var Template = require('../templates/index');

var DisposablePool =
/*#__PURE__*/
function (_Pool) {
  _inherits(DisposablePool, _Pool);

  function DisposablePool($container, template) {
    var _this;

    var pool = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    _classCallCheck(this, DisposablePool);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DisposablePool).call(this));
    _this.$container = $container;
    _this.templateType = template + 'Tpl';
    _this.pool = pool;
    _this.usedPointer = 0;
    _this.ids = Object.create(null);
    return _this;
  }

  _createClass(DisposablePool, [{
    key: "resetUnuse",
    value: function resetUnuse() {
      this.usedPointer = 0;
      this.ids = Object.create(null);
    }
  }, {
    key: "get",
    value: function get(id) {
      var _this2 = this;

      if (id !== undefined) {
        if (this.ids[id]) {
          return null;
        }

        this.ids[id] = true;
      }

      var $element = this.pool[this.usedPointer];

      if (!$element) {
        $element = Template[this.templateType];
        this.put($element);
      }

      if (!$element.parentNode) {
        rAF(function () {
          DOM.appendChild(_this2.$container, $element);
        });
      }

      this.usedPointer = this.usedPointer + 1;
      return $element;
    }
  }, {
    key: "put",
    value: function put($element) {
      this.pool.push($element);
    }
  }, {
    key: "clearUnuse",
    value: function clearUnuse() {
      var _this3 = this;

      var _loop = function _loop(i) {
        var $element = _this3.pool[i];

        if ($element) {
          rAF(function () {
            $element.remove();
          });
        }
      };

      for (var i = this.usedPointer; i < this.pool.length; i++) {
        _loop(i);
      }

      this.pool.length = this.usedPointer;
    }
  }]);

  return DisposablePool;
}(Pool);

module.exports = DisposablePool;
},{"../interfaces/index":"../aQua/src/interfaces/index.js","../utils/index":"../aQua/src/utils/index.js","../templates/index":"../aQua/src/templates/index.js"}],"../aQua/src/pools/LinePool.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Pool = _require.Pool;

var _require2 = require('../utils/index'),
    DOM = _require2.DOM;

var ElementPool =
/*#__PURE__*/
function (_Pool) {
  _inherits(ElementPool, _Pool);

  function ElementPool() {
    var _this;

    var pool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, ElementPool);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ElementPool).call(this));
    _this.pool = pool;
    return _this;
  }

  _createClass(ElementPool, [{
    key: "get",
    value: function get() {
      return this.pool.pop();
    }
  }, {
    key: "put",
    value: function put($ele) {
      this.pool.push($ele);
    }
  }, {
    key: "clear",
    value: function clear() {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.size;
      var size = this.size;
      var leftSize = size - count;

      for (var i = size - 1; i >= leftSize; i++) {
        this.pool[i].remove();
      }

      this.pool.length = leftSize;
    }
  }]);

  return ElementPool;
}(Pool);

module.exports = ElementPool;
},{"../interfaces/index":"../aQua/src/interfaces/index.js","../utils/index":"../aQua/src/utils/index.js"}],"../aQua/src/pools/index.js":[function(require,module,exports) {
var DisposablePool = require('./DisposablePool');

var LinePool = require('./LinePool');

module.exports = {
  DisposablePool: DisposablePool,
  LinePool: LinePool
};
},{"./DisposablePool":"../aQua/src/pools/DisposablePool.js","./LinePool":"../aQua/src/pools/LinePool.js"}],"../aQua/src/renderers/CursorRenderer.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../utils/index'),
    rAF = _require.rAF;

var _require2 = require('../pools/index'),
    DisposablePool = _require2.DisposablePool;

var BlinkAnimationConfig = {
  OpacityMin: '.05',
  OpacityMax: '1',
  BlinkInterval: 600
};

var CursorRenderer =
/*#__PURE__*/
function () {
  function CursorRenderer(aqua) {
    _classCallCheck(this, CursorRenderer);

    this.applyName = 'cursor';
    this.cursors = aqua.cursorMgr;
    this.marker = aqua.marker;
    this.$cursorCntr = aqua.uiMgr.get('cursorCntr');
    this.pool = new DisposablePool(this.$cursorCntr, 'cursor');
    this.pesudoOpacity = 1;
  }

  _createClass(CursorRenderer, [{
    key: "render",
    value: function render(viewport) {
      var _this = this;

      this.pool.resetUnuse();
      var renderArea = viewport.getRenderArea();

      if (this.cursors.offsetMap.size > 0) {
        this.cursors.flushOffset();
      }

      this.cursors.pureTraverse(function (cursor) {
        if (_this.cursors.isPrimary(cursor)) {
          _this.renderCursor(cursor);

          return;
        }

        if (cursor.y < renderArea.start || cursor.y >= renderArea.end) {
          return;
        }

        _this.renderCursor(cursor, cursor.status);
      });
      this.pool.clearUnuse();
      this.blink(true);
    }
  }, {
    key: "renderCursor",
    value: function renderCursor(cursor) {
      var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var $cursor = this.pool.get();
      var layout = cursor.updateLayout();
      var cssText = '';

      if (this.marker.isMarked(status, 'OverlayMark')) {
        cssText = this.marker.use(status, 'OverlayMark');
      }

      this.updateCursor($cursor, layout, cssText);
    }
  }, {
    key: "updateCursor",
    value: function updateCursor($cursor, layout) {
      var cssText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      rAF(function () {
        $cursor.style.cssText = cssText + "transform: translate(".concat(layout.x, "px, ").concat(layout.y, "px);");
      });
    }
  }, {
    key: "blink",
    value: function blink() {
      var _this2 = this;

      var focus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      clearTimeout(this.timeout);

      if (focus) {
        rAF(function () {
          _this2.$cursorCntr.style.opacity = _this2.pesudoOpacity = BlinkAnimationConfig.OpacityMax;
        });
      }

      this.timeout = setTimeout(function () {
        rAF(function () {
          _this2.$cursorCntr.style.opacity = _this2.pesudoOpacity = _this2.pesudoOpacity === BlinkAnimationConfig.OpacityMax ? BlinkAnimationConfig.OpacityMin : BlinkAnimationConfig.OpacityMax;
        });

        _this2.blink();
      }, BlinkAnimationConfig.BlinkInterval);
    }
  }]);

  return CursorRenderer;
}();

module.exports = CursorRenderer;
},{"../utils/index":"../aQua/src/utils/index.js","../pools/index":"../aQua/src/pools/index.js"}],"../aQua/src/renderers/InputerRenderer.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../utils/index'),
    rAF = _require.rAF;

var InputerRenderer =
/*#__PURE__*/
function () {
  function InputerRenderer(aqua) {
    _classCallCheck(this, InputerRenderer);

    this.applyName = 'inputer';
    this.scroller = aqua.scroller;
    this.cursors = aqua.cursorMgr;
    this.korwa = aqua.korwa;
    this.$inputerLocator = aqua.uiMgr.get('inputerLocator');
  }

  _createClass(InputerRenderer, [{
    key: "render",
    value: function render(viewport) {
      var _this = this;

      this.cursors.getPrimary(function (cursor) {
        if (!cursor) {
          // 初始化的时候 docMgr.write(''), 会渲染视图, 但此时 cursors.main 并没有生成
          return;
        }

        if (cursor.$y < viewport.ceiling || cursor.$y + _this.korwa.getSingleLineHeight() > viewport.floor) {
          return;
        }

        rAF(function () {
          _this.$inputerLocator.style.top = cursor.$y - _this.scroller.y + 'px';
          _this.$inputerLocator.style.left = cursor.$x + _this.korwa.ramWidth + 'px';
        });
      });
    }
  }]);

  return InputerRenderer;
}();

module.exports = InputerRenderer;
},{"../utils/index":"../aQua/src/utils/index.js"}],"../aQua/src/renderers/LineNumRenderer.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../utils/index'),
    rAF = _require.rAF;

var START_FROM = 1;

var LineNumRenderer =
/*#__PURE__*/
function () {
  function LineNumRenderer(aqua) {
    _classCallCheck(this, LineNumRenderer);

    this.applyName = 'lineNum';
  }

  _createClass(LineNumRenderer, [{
    key: "render",
    value: function render(viewport) {
      var $lines = viewport.$lines;
      var start = viewport.renderArea.start;

      for (var i = 0; i < $lines.length; i++) {
        var $lineNum = $lines[i].firstChild.firstChild;
        this.updateLineNum($lineNum, start + i + START_FROM);
      }
    }
  }, {
    key: "updateLineNum",
    value: function updateLineNum($lineNum, lineNum) {
      rAF(function () {
        $lineNum.textContent = lineNum;
      });
    }
  }]);

  return LineNumRenderer;
}();

module.exports = LineNumRenderer;
},{"../utils/index":"../aQua/src/utils/index.js"}],"../aQua/src/renderers/LineRenderer.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../pools/index'),
    LinePool = _require.LinePool;

var _require2 = require('../enums/index'),
    LineStatus = _require2.LineStatus;

var _require3 = require('../utils/index'),
    DOM = _require3.DOM,
    rAF = _require3.rAF;

var LineRenderer =
/*#__PURE__*/
function () {
  function LineRenderer(aqua) {
    _classCallCheck(this, LineRenderer);

    this.applyName = 'line';
    this.processor = aqua.processorMgr;
    this.lineMgr = aqua.lineMgr;
    this.doc = aqua.docMgr;
    this.korwa = aqua.korwa;
    this.$lineCntr = aqua.uiMgr.get('lineCntr');
    this.pool = new LinePool();
  }

  _createClass(LineRenderer, [{
    key: "render",
    value: function render(viewport, renderArea, oldRenderArea) {
      var oldLines = viewport.lines;
      var lines = viewport.lines = this.doc.getLines(renderArea.start, renderArea.end);
      var $diff = this.diff(viewport, lines, oldLines, renderArea, oldRenderArea);
      this.patch($diff);
    }
    /**
     * 1. 如果行号不相同, 直接去除
     * 2. 比较行号相同的部分, 返回需要渲染的 DOM 数组
     */

  }, {
    key: "diff",
    value: function diff(viewport, lines, oldLines, renderArea, oldRenderArea) {
      var oldIndex = 0;
      var oldIndexMax = 0;
      var $list = [];
      var start = renderArea.start,
          end = renderArea.end;
      var oStart = oldRenderArea.start,
          oEnd = oldRenderArea.end;
      /* 1 */

      if (end > oEnd && start >= oStart && start <= oEnd) {
        this.clip(viewport.$lines, 0, start - oStart);
        oldIndex = start - oStart;
        oldIndexMax = oEnd - oStart; // console.warn('Enter 1', oldIndex, oldIndexMax)
      } else if (start < oStart && end >= oStart && end <= oEnd) {
        this.clip(viewport.$lines, end - oStart, oEnd - oStart);
        oldIndex = 0;
        oldIndexMax = end - oStart; // console.warn('Enter 2', oldIndex, oldIndexMax)
      } else if (end < oStart || start > oEnd) {
        this.clip(viewport.$lines, 0, oEnd - oStart);
        oldIndex = 0;
        oldIndexMax = 0; // console.warn('Enter 3', oldIndex, oldIndexMax)
      } else if (start < oStart && end > oEnd) {
        oldIndex = 0;
        oldIndexMax = oEnd - oStart; // console.warn('Enter 4', oldIndex, oldIndexMax)
      } else {
        // start >= oStart && end <= oEnd
        this.clip(viewport.$lines, 0, start - oStart);
        this.clip(viewport.$lines, end - oStart, oEnd - oStart);
        oldIndex = start - oStart;
        oldIndexMax = end - oStart; // console.warn('Enter 5', oldIndex, oldIndexMax)
      }

      var curIndex = 0;
      var $lines = viewport.$lines;
      /* 2 */

      for (; curIndex < lines.length; curIndex++) {
        var oldLine = oldIndex < oldIndexMax ? oldLines[oldIndex] : null;
        var line = lines[curIndex];
        var status = line.status;

        if (line === oldLine) {
          line.setStatus(LineStatus.DONE);
          $list[curIndex] = $lines[oldIndex];

          if (status === LineStatus.DONE) {
            oldIndex = oldIndex + 1;
            continue;
          } else if (status === LineStatus.UPDATED) {
            this.patchLine(line, $lines[oldIndex]);
            oldIndex = oldIndex + 1;
          }
        } else {
          if (oldLine) {
            var oldStatus = oldLine.status;
            var hasDeleted = false;

            if (oldStatus === LineStatus.DELETED) {
              curIndex = curIndex - 1;
              hasDeleted = true; // line.setStatus(status)
            }

            while (oldStatus === LineStatus.DELETED) {
              oldIndex = oldIndex + 1;

              if (oldIndex < oldIndexMax) {
                oldStatus = oldLines[oldIndex].status;
              } else {
                break;
              }
            }

            if (hasDeleted) {
              continue;
            }
          }

          line.setStatus(LineStatus.DONE);
          var $line = this.pool.size > 0 ? this.pool.get() : this.lineMgr.create();
          $list[curIndex] = $line;
          this.patchLine(line, $line);
        }
      }

      viewport.$lines = $list;
      return $list;
    }
  }, {
    key: "patch",
    value: function patch($lines) {
      var $children = this.$lineCntr.children;
      var $index = 0; // console.info('当前DOM状态', Array.prototype.slice.call($children).map(item => item.textContent))

      for (var i = 0; i < $lines.length; i++) {
        var $line = $lines[i];

        if (!$line.parentNode) {
          $index = $index + 1;
          DOM.appendChild(this.$lineCntr, $line, i); // console.warn('需要渲染的行', $line.textContent)

          continue;
        }

        var $renderedLine = $children[$index];

        if (!$renderedLine) {
          console.error('诶?', $index);
          continue;
        }

        if ($line === $renderedLine) {
          // console.info('已渲染的行', $renderedLine.textContent)
          $index = $index + 1;
          continue;
        }

        if ($line !== $renderedLine) {
          // console.warn('需要删除的行', $renderedLine.textContent)
          i = i - 1;
          this.removeLine($renderedLine); // $renderedLine.remove()
        }
      }

      var leftLines = $children.length - $index; // $children.length - 1 - $index + 1

      if (leftLines > 0) {
        while (leftLines--) {
          this.removeLine($children[$index]); // $children[$index].remove()
        }
      }
    }
  }, {
    key: "clip",
    value: function clip($lines, start, end) {
      for (var i = start; i < end; i++) {
        var $line = $lines[i]; // $line && $line.remove()

        $line && this.removeLine($line);
      }
    }
  }, {
    key: "patchLine",
    value: function patchLine(line, $line) {
      var $code = $line.children[1].firstChild;
      $code.innerHTML = '';
      DOM.appendChild($code, this.processor.transformToElements(line));
    }
  }, {
    key: "removeLine",
    value: function removeLine($line) {
      // 可以先判断 $line.parent !== null 确保没有被渲染, 再执行删除, 如果 $line 已经被删除了, 再次被删除 仍然会被放进 linePool 里, 下次取的时候会出问题
      // 但是调用前已经保证了 $line 是扔未被删除的
      // 为了健壮还是做了判断...
      if ($line.parentNode) {
        $line.remove();
        this.pool.put($line);
      }
    }
  }]);

  return LineRenderer;
}();

module.exports = LineRenderer;
},{"../pools/index":"../aQua/src/pools/index.js","../enums/index":"../aQua/src/enums/index.js","../utils/index":"../aQua/src/utils/index.js"}],"../aQua/src/renderers/MinimapRenderer.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MinimapRenderer =
/*#__PURE__*/
function () {
  function MinimapRenderer(aqua) {
    _classCallCheck(this, MinimapRenderer);

    this.applyName = 'minimap';
    this.docMgr = aqua.docMgr;
    this.$minimap = aqua.uiMgr.get('minimap');
  }

  _createClass(MinimapRenderer, [{
    key: "render",
    value: function render(viewport) {
      return;
    }
  }]);

  return MinimapRenderer;
}();

module.exports = MinimapRenderer;
},{}],"../aQua/src/renderers/PadRenderer.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../utils/index'),
    rAF = _require.rAF;

var PadRenderer =
/*#__PURE__*/
function () {
  function PadRenderer(aqua) {
    _classCallCheck(this, PadRenderer);

    this.applyName = 'pad';
    this.docMgr = aqua.docMgr;
    this.$pad = aqua.uiMgr.get('lineCntr');
  }

  _createClass(PadRenderer, [{
    key: "render",
    value: function render(viewport) {
      var _this = this;

      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var pad = this.docMgr.getLineWithHeight(viewport.getRenderArea().start).top;
      rAF(function () {
        _this.$pad.style.transform = "translateY(".concat(pad, "px)");
      });
    }
  }]);

  return PadRenderer;
}();

module.exports = PadRenderer;
},{"../utils/index":"../aQua/src/utils/index.js"}],"../aQua/src/renderers/ScrollBarCursorRenderer.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../utils/index'),
    rAF = _require.rAF,
    DOM = _require.DOM;

var _require2 = require('../pools/index'),
    DisposablePool = _require2.DisposablePool;

var ArgOpt = {
  ScrollBarCursorHeight: 5
};

var ScrollBarCursor =
/*#__PURE__*/
function () {
  function ScrollBarCursor(aqua) {
    _classCallCheck(this, ScrollBarCursor);

    this.applyName = 'scrollBarCursor';
    this.docMgr = aqua.docMgr;
    this.cursorMgr = aqua.cursorMgr;
    this.scroller = aqua.scroller;
    this.pool = new DisposablePool(aqua.uiMgr.get('scrollBar'), 'cursorMark');
  }

  _createClass(ScrollBarCursor, [{
    key: "render",
    value: function render(viewport) {
      var _this = this;

      this.pool.resetUnuse();
      this.cursorMgr.pureTraverse(function (cursor) {
        _this.update(viewport, cursor);
      });
      this.pool.clearUnuse();
    }
  }, {
    key: "update",
    value: function update(viewport, cursor) {
      var y = this.scroller.transformY(viewport, cursor.$y, ArgOpt.ScrollBarCursorHeight);
      var $mark = this.pool.get(y);

      if (!$mark) {
        return;
      }

      rAF(function () {
        $mark.style.transform = "translateY(".concat(y, "px)");
      });
    }
  }]);

  return ScrollBarCursor;
}();

module.exports = ScrollBarCursor;
},{"../utils/index":"../aQua/src/utils/index.js","../pools/index":"../aQua/src/pools/index.js"}],"../aQua/src/renderers/ScrollBarRenderer.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../utils/index'),
    rAF = _require.rAF;
/* Temp */


var SLIDER_MIN_HEIGHT = 40;

var ScrollBarRenderer =
/*#__PURE__*/
function () {
  function ScrollBarRenderer(aqua) {
    _classCallCheck(this, ScrollBarRenderer);

    this.applyName = 'scrollBar';
    this.cursorMgr = aqua.cursorMgr;
    this.scroller = aqua.scroller;
    this.$scrollBar = aqua.uiMgr.get('scrollBar');
    this.$slider = this.$scrollBar.firstChild;
  }

  _createClass(ScrollBarRenderer, [{
    key: "render",
    value: function render(viewport) {
      this.update(this.$slider, viewport);
    }
  }, {
    key: "update",
    value: function update($slider, viewport) {
      var _this = this;

      var height = this.scroller.transformHeight(viewport, viewport.height, SLIDER_MIN_HEIGHT);
      var y = this.scroller.transformY(viewport, this.scroller.y, height);
      rAF(function () {
        _this.$slider.style.height = height + 'px';
        _this.$slider.style.transform = "translateY(".concat(y, "px)");
      });
    }
  }]);

  return ScrollBarRenderer;
}();

module.exports = ScrollBarRenderer;
},{"../utils/index":"../aQua/src/utils/index.js"}],"../aQua/src/renderers/ScrollerRenderer.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../utils/index'),
    rAF = _require.rAF;

var ScrollerRenderer =
/*#__PURE__*/
function () {
  function ScrollerRenderer(aqua) {
    _classCallCheck(this, ScrollerRenderer);

    this.applyName = 'scroller';
    this.scroller = aqua.scroller;
    this.$scroller = aqua.uiMgr.get('scroller');
  }

  _createClass(ScrollerRenderer, [{
    key: "render",
    value: function render(viewport) {
      this.updateScroller(this.$scroller, this.scroller.y);
    }
  }, {
    key: "updateScroller",
    value: function updateScroller($scroller, y) {
      var _this = this;

      rAF(function () {
        _this.$scroller.style.transform = "translateY(-".concat(y, "px)");
      });
    }
  }]);

  return ScrollerRenderer;
}();

module.exports = ScrollerRenderer;
},{"../utils/index":"../aQua/src/utils/index.js"}],"../aQua/src/renderers/SelectedLineRenderer.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../utils/index'),
    rAF = _require.rAF;

var _require2 = require('../pools/index'),
    DisposablePool = _require2.DisposablePool;

var SelectedLineRenderer =
/*#__PURE__*/
function () {
  function SelectedLineRenderer(aqua) {
    _classCallCheck(this, SelectedLineRenderer);

    this.applyName = 'selectedLine';
    this.doc = aqua.docMgr;
    this.cursors = aqua.cursorMgr;
    this.pool = new DisposablePool(aqua.uiMgr.get('selectedLineCntr'), 'selectedLine');
  }

  _createClass(SelectedLineRenderer, [{
    key: "render",
    value: function render(viewport) {
      var _this = this;

      this.pool.resetUnuse();
      var renderArea = viewport.getRenderArea();
      this.cursors.pureTraverse(function (cursor) {
        var y = cursor.y;

        if (y < renderArea.start || y >= renderArea.end) {
          return;
        }

        var _this$doc$getLineWith = _this.doc.getLineWithHeight(y),
            top = _this$doc$getLineWith.top,
            height = _this$doc$getLineWith.height;

        _this.updateSelectedLine(top, height);
      });
      this.pool.clearUnuse();
    }
  }, {
    key: "updateSelectedLine",
    value: function updateSelectedLine(top, height) {
      var $selectedLine = this.pool.get(top);

      if (!$selectedLine) {
        return;
      }

      rAF(function () {
        $selectedLine.style.cssText = "opacity: 1; top: ".concat(top, "px; height: ").concat(height, "px;");
      });
    }
  }]);

  return SelectedLineRenderer;
}();

module.exports = SelectedLineRenderer;
},{"../utils/index":"../aQua/src/utils/index.js","../pools/index":"../aQua/src/pools/index.js"}],"../aQua/src/renderers/SelectionRenderer.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../utils/index'),
    DOM = _require.DOM,
    rAF = _require.rAF;

var _require2 = require('../pools/index'),
    DisposablePool = _require2.DisposablePool;

var SelectionRenderer =
/*#__PURE__*/
function () {
  function SelectionRenderer(aqua) {
    _classCallCheck(this, SelectionRenderer);

    this.applyName = 'selection';
    this.korwa = aqua.korwa;
    this.locator = aqua.locator;
    this.cursors = aqua.cursorMgr;
    this.marker = aqua.marker;
    this.pool = new DisposablePool(aqua.uiMgr.get('selectionCntr'), 'selection');
  }

  _createClass(SelectionRenderer, [{
    key: "render",
    value: function render(viewport) {
      var _this = this;

      var renderArea = viewport.getRenderArea();
      this.pool.resetUnuse();
      this.cursors.pureTraverse(function (cursor) {
        if (cursor.selection.isCollapsed()) {
          return;
        }

        var start = cursor.selection.getStart();
        var end = cursor.selection.getEnd();

        if (start.y >= renderArea.end || end.y < renderArea.start) {
          return;
        }

        _this.renderSelection(cursor.selection, cursor.status);
      });
      this.pool.clearUnuse();
    }
  }, {
    key: "renderSelection",
    value: function renderSelection(selection) {
      var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var count = selection.containMinLines();
      var $selections = [];

      for (var i = count; i > 0; i--) {
        $selections.push(this.pool.get());
      }

      var cssText = '';

      if (this.marker.isMarked(status, 'OverlayMark')) {
        cssText = this.marker.use(status, 'OverlayMark');
      }

      this.updateSelection($selections, selection.getStart(), selection.getEnd(), cssText);
    }
  }, {
    key: "updateSelection",
    value: function updateSelection($selections, start, end) {
      var cssText = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      var count = $selections.length;
      var lineHeight = this.korwa.getSingleLineHeight();
      var startLayout = this.locator.getLayoutByCoord(start.y, start.x, start.insideY);
      var endLayout = this.locator.getLayoutByCoord(end.y, end.x, end.insideY);

      if (count === 1) {
        rAF(function () {
          $selections[0].style.cssText = cssText + "top: ".concat(startLayout.y, "px; left: ").concat(startLayout.x, "px; width: ").concat(endLayout.x - startLayout.x, "px; height: ").concat(lineHeight, "px;");
        });
        return;
      }

      if (count === 2) {
        rAF(function () {
          $selections[0].style.cssText = cssText + "top: ".concat(startLayout.y, "px; left: ").concat(startLayout.x, "px; right: 0; height: ").concat(lineHeight, "px");
          $selections[1].style.cssText = cssText + "top: ".concat(endLayout.y, "px; left: 0; width: ").concat(endLayout.x, "px; height: ").concat(lineHeight, "px");
        });
        return;
      }

      if (count === 3) {
        rAF(function () {
          $selections[0].style.cssText = cssText + "top: ".concat(startLayout.y, "px; left: ").concat(startLayout.x, "px; right: 0; height: ").concat(lineHeight, "px");
          $selections[1].style.cssText = cssText + "top: ".concat(endLayout.y, "px; left: 0; width: ").concat(endLayout.x, "px; height: ").concat(lineHeight, "px");
          $selections[2].style.cssText = cssText + "top: ".concat(startLayout.y + lineHeight, "px; left: 0; right: 0; bottom: 20px; height: ").concat(endLayout.y - startLayout.y - lineHeight, "px");
        });
      }

      return;
    }
  }]);

  return SelectionRenderer;
}();

module.exports = SelectionRenderer;
},{"../utils/index":"../aQua/src/utils/index.js","../pools/index":"../aQua/src/pools/index.js"}],"../aQua/src/renderers/TrackerRenderer.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../utils/index'),
    rAF = _require.rAF;

var TrackerRenderer =
/*#__PURE__*/
function () {
  function TrackerRenderer(aqua) {
    _classCallCheck(this, TrackerRenderer);

    this.applyName = 'tracker';
    this.scroller = aqua.scroller;
    this.cursors = aqua.cursorMgr;
    this.korwa = aqua.korwa;
  }

  _createClass(TrackerRenderer, [{
    key: "render",
    value: function render(viewport) {
      var _this = this;

      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.cursors.getPrimary(function (cursor) {
        if (!cursor) {
          // 初始化的时候 docMgr.write(''), 会渲染视图, 但此时 cursors.main 并没有生成
          return;
        }

        var $y = cursor.$y;

        if ($y < viewport.ceiling) {
          _this.scroller.scroll($y, true);

          return;
        }

        if ($y + _this.korwa.getSingleLineHeight() > viewport.floor) {
          _this.scroller.scroll($y - viewport.height + _this.korwa.getSingleLineHeight(), true);

          return;
        }
      });
    }
  }]);

  return TrackerRenderer;
}();

module.exports = TrackerRenderer;
},{"../utils/index":"../aQua/src/utils/index.js"}],"../aQua/src/renderers/index.js":[function(require,module,exports) {
var CursorRenderer = require('./CursorRenderer');

var InputerRenderer = require('./InputerRenderer');

var LineNumRenderer = require('./LineNumRenderer');

var LineRenderer = require('./LineRenderer');

var MinimapRenderer = require('./MinimapRenderer');

var PadRenderer = require('./PadRenderer');

var ScrollBarCursorRenderer = require('./ScrollBarCursorRenderer');

var ScrollBarRenderer = require('./ScrollBarRenderer');

var ScrollerRenderer = require('./ScrollerRenderer');

var SelectedLineRenderer = require('./SelectedLineRenderer');

var SelectionRenderer = require('./SelectionRenderer');

var TrackerRenderer = require('./TrackerRenderer');

module.exports = {
  CursorRenderer: CursorRenderer,
  InputerRenderer: InputerRenderer,
  LineNumRenderer: LineNumRenderer,
  LineRenderer: LineRenderer,
  MinimapRenderer: MinimapRenderer,
  PadRenderer: PadRenderer,
  ScrollBarCursorRenderer: ScrollBarCursorRenderer,
  ScrollBarRenderer: ScrollBarRenderer,
  ScrollerRenderer: ScrollerRenderer,
  SelectedLineRenderer: SelectedLineRenderer,
  SelectionRenderer: SelectionRenderer,
  TrackerRenderer: TrackerRenderer
};
},{"./CursorRenderer":"../aQua/src/renderers/CursorRenderer.js","./InputerRenderer":"../aQua/src/renderers/InputerRenderer.js","./LineNumRenderer":"../aQua/src/renderers/LineNumRenderer.js","./LineRenderer":"../aQua/src/renderers/LineRenderer.js","./MinimapRenderer":"../aQua/src/renderers/MinimapRenderer.js","./PadRenderer":"../aQua/src/renderers/PadRenderer.js","./ScrollBarCursorRenderer":"../aQua/src/renderers/ScrollBarCursorRenderer.js","./ScrollBarRenderer":"../aQua/src/renderers/ScrollBarRenderer.js","./ScrollerRenderer":"../aQua/src/renderers/ScrollerRenderer.js","./SelectedLineRenderer":"../aQua/src/renderers/SelectedLineRenderer.js","./SelectionRenderer":"../aQua/src/renderers/SelectionRenderer.js","./TrackerRenderer":"../aQua/src/renderers/TrackerRenderer.js"}],"../aQua/src/components/Renderer.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../helpers/index'),
    LineHelper = _require.LineHelper;

var _require2 = require('../utils/index'),
    DOM = _require2.DOM,
    rAF = _require2.rAF,
    Limiter = _require2.Limiter,
    SimpleSet = _require2.SimpleSet;

var _require3 = require('../enums/index'),
    ArgOpt = _require3.ArgOpt,
    CSSVariables = _require3.CSSVariables;

var Renderers = require('../renderers/index');

var Renderer =
/*#__PURE__*/
function () {
  function Renderer(aqua) {
    _classCallCheck(this, Renderer);

    this.aqua = aqua;
    this.renderers = null;
    this.groups = null;
    this.doc = aqua.docMgr;
    this.korwa = aqua.korwa;
    this.worker = aqua.workerMgr;
    this.renderSet = new SimpleSet();
    this.lowPriorityRenderSet = new SimpleSet();
    this.renderViewport = Limiter.toNextTick(this.renderViewport.bind(this), 17);
    this.startup = Limiter.toNextTick(this.startup.bind(this), 17);
  }

  _createClass(Renderer, [{
    key: "initRenders",
    value: function initRenders(Renders) {
      var _this = this;

      this.renderers = Object.create(null);
      Object.keys(Renderers).forEach(function (name) {
        _this.setRenderer(Renderers[name]);
      });
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      var _this2 = this;

      var viewport = this.aqua.viewport;
      var docWatcher = this.aqua.docWatcher;
      var khala = this.aqua.khala;
      var uiMgr = this.aqua.uiMgr;
      docWatcher.on('change', function (data) {
        var lines = data.effectLines;
        LineHelper.setHeight(lines, _this2.korwa.measureLinesHeight(lines));
        docWatcher.emit('resize', lines);

        _this2.renderViewport(viewport, ArgOpt.SkipVisionCheck);
      });
      docWatcher.on('change', function (data) {//    const code = this.aqua.docMgr.getLines(0, Infinity).map(line => line.toString()).join('\n')
        //    this.worker.post('highlight', {
        //        data: code,
        //    })
      });
      khala.on('scroll', function (y, force) {
        viewport.update(y);

        _this2.renderViewport(viewport, force);
      });
      var $components = uiMgr.get('components');
      var $lineWidthCntr = uiMgr.get('lineWidthCntr');
      khala.on('ramWidthResize', function () {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            ramWidth = _ref.ramWidth,
            lineNumWidth = _ref.lineNumWidth;

        rAF(function () {
          $components.style.setProperty(CSSVariables.LineWidth, lineNumWidth + 'px');
          $components.style.setProperty(CSSVariables.RamWidth, ramWidth + 'px');

          var lines = _this2.doc.getLines(0, _this2.doc.size);

          LineHelper.setHeight(lines, _this2.korwa.measureLinesHeight(lines));
          docWatcher.emit('resize', lines);

          _this2.renderViewport(viewport, ArgOpt.SkipVisionCheck);
        });
      });
      this.worker.on('highlight', Limiter.debounce(function (msg) {
        console.log('msg', msg); // viewport.getRenderArea()
        // this.renderViewport(viewport, ArgOpt.SkipVisionCheck)
      }), 500);
    }
  }, {
    key: "initGroups",
    value: function initGroups() {
      var _this3 = this;

      this.groups = Object.create(null);
      this.setGroup('standard', function (viewport) {
        _this3.render('cursor', viewport);

        _this3.render('inputer', viewport);

        _this3.render('selection', viewport);

        _this3.render('selectedLine', viewport);

        _this3.render('scrollBarCursor', viewport);

        _this3.render('lineNum', viewport);
      });
      this.setGroup('scroller', function (viewport) {
        _this3.render('scroller', viewport);

        _this3.render('scrollBar', viewport);
      });
    }
  }, {
    key: "init",
    value: function init() {
      this.initRenders(Renderers);
      this.initEvents();
      this.initGroups();
    }
  }, {
    key: "renderViewport",
    value: function renderViewport() {
      var viewport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.aqua.viewport;
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.renderGroup('scroller', viewport);
      var start = this.doc.getLineByHeight(viewport.ceiling).staticLineNum;
      var end = this.doc.getLineByHeight(viewport.floor, true).staticLineNum + 1;
      var visibleArea = viewport.updateVisibleArea(start, end);

      if (!force && !viewport.isVisionLost()) {
        return;
      }

      var renderStart = this.doc.correctLineNumAsIndex(visibleArea.start - viewport.lps);
      var renderEnd = this.doc.correctLineNumAsIndex(visibleArea.end + viewport.lps);
      var oldRenderArea = viewport.getRenderArea();
      var renderArea = viewport.updateRenderArea(renderStart, renderEnd);
      this.render('pad', viewport);
      this.render('line', viewport, renderArea, oldRenderArea);
      this.renderGroup('standard', viewport);
      this.render('minimap', viewport);
    }
  }, {
    key: "load",
    value: function load(Renderer) {
      this.setRenderer(Renderer);
    }
  }, {
    key: "setRenderer",
    value: function setRenderer(Renderer) {
      var renderer = new Renderer(this.aqua);
      this.renderers[renderer.applyName] = renderer;
    }
  }, {
    key: "getRenderer",
    value: function getRenderer(applyName) {
      return this.renderers[applyName];
    }
  }, {
    key: "render",
    value: function render(applyName) {
      for (var _len = arguments.length, payload = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        payload[_key - 1] = arguments[_key];
      }

      this.renderSet.add(applyName, payload);
      this.startup();
    }
  }, {
    key: "renderWithLowPriority",
    value: function renderWithLowPriority(applyName) {
      for (var _len2 = arguments.length, payload = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        payload[_key2 - 1] = arguments[_key2];
      }

      this.lowPriorityRenderSet.add(applyName, payload);
      this.startup();
    }
  }, {
    key: "renderImmediately",
    value: function renderImmediately(applyName) {
      var _this$getRenderer;

      for (var _len3 = arguments.length, payload = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        payload[_key3 - 1] = arguments[_key3];
      }

      (_this$getRenderer = this.getRenderer(applyName)).render.apply(_this$getRenderer, payload);
    }
  }, {
    key: "renderGroup",
    value: function renderGroup(groupName) {
      for (var _len4 = arguments.length, payload = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        payload[_key4 - 1] = arguments[_key4];
      }

      this.getGroup(groupName).apply(void 0, payload);
    }
  }, {
    key: "setGroup",
    value: function setGroup(name, cb) {
      this.groups[name] = cb;
    }
  }, {
    key: "getGroup",
    value: function getGroup(name) {
      return this.groups[name];
    }
  }, {
    key: "startup",
    value: function startup() {
      var _this4 = this;

      var _this$renderSet$use = this.renderSet.use(),
          _this$renderSet$use2 = _slicedToArray(_this$renderSet$use, 2),
          renderers = _this$renderSet$use2[0],
          traverse = _this$renderSet$use2[1];

      traverse(renderers, function (renderer) {
        _this4.renderImmediately.apply(_this4, [renderer.name].concat(_toConsumableArray(renderer.payload)));
      });
      {
        var _this$lowPriorityRend = this.lowPriorityRenderSet.use();

        var _this$lowPriorityRend2 = _slicedToArray(_this$lowPriorityRend, 2);

        renderers = _this$lowPriorityRend2[0];
        traverse = _this$lowPriorityRend2[1];
      }
      traverse(renderers, function (renderer) {
        _this4.renderImmediately.apply(_this4, [renderer.name].concat(_toConsumableArray(renderer.payload)));
      });
    }
  }]);

  return Renderer;
}();

module.exports = Renderer;
},{"../helpers/index":"../aQua/src/helpers/index.js","../utils/index":"../aQua/src/utils/index.js","../enums/index":"../aQua/src/enums/index.js","../renderers/index":"../aQua/src/renderers/index.js"}],"../aQua/src/components/Scroller.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../utils/index'),
    rAF = _require.rAF,
    Limiter = _require.Limiter;

var Scroller =
/*#__PURE__*/
function () {
  function Scroller(aqua) {
    _classCallCheck(this, Scroller);

    this.aqua = aqua;
    this.$el = null;
    this.y = -1;
    this.speed = -1;
    this.min = -1;
    this.max = -1;
    this.limitedScroll = Limiter.toNextTick(this.scrollPrototype.bind(this), 34, 34);
  }

  _createClass(Scroller, [{
    key: "init",
    value: function init() {
      var _this = this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$$el = _ref.$el,
          $el = _ref$$el === void 0 ? null : _ref$$el,
          _ref$y = _ref.y,
          y = _ref$y === void 0 ? -1 : _ref$y,
          _ref$speed = _ref.speed,
          speed = _ref$speed === void 0 ? -1 : _ref$speed,
          _ref$min = _ref.min,
          min = _ref$min === void 0 ? -1 : _ref$min,
          _ref$max = _ref.max,
          max = _ref$max === void 0 ? -1 : _ref$max;

      /* @Test */
      this.$el = $el;
      this.y = y;
      this.speed = speed;
      this.min = min;
      this.max = max;
      this.aqua.docWatcher.on('resize', function () {
        _this.max = _this.aqua.docMgr.height - _this.aqua.korwa.getSingleLineHeight();

        if (_this.y > _this.max) {
          _this.scroll(_this.max);
        }
      });
    }
  }, {
    key: "handleScroll",
    value: function handleScroll(event) {
      var y = this.correctY(this.y + event.delta * this.speed);
      this.scroll(y);

      if (y <= this.max && y >= this.min) {
        event.preventDefault();
        return;
      }
    }
  }, {
    key: "scroll",
    value: function scroll() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.y;
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.y = this.correctY(y);
      this.limitedScroll(this.y, force);
    }
  }, {
    key: "scrollImmediately",
    value: function scrollImmediately() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.y;
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.y = this.correctY(y);
      this.scrollPrototype(this.y, force);
    }
  }, {
    key: "scrollPrototype",
    value: function scrollPrototype() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.y;
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.aqua.khala.emit('scroll', y, force);
    }
  }, {
    key: "correctY",
    value: function correctY(y) {
      if (y <= this.min) {
        y = this.min;
      }

      if (y >= this.max) {
        y = this.max;
      }

      return y;
    }
  }, {
    key: "transformHeight",
    value: function transformHeight(viewport, heightInViewport) {
      var minHeight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      return Math.max(heightInViewport / (this.max + viewport.height) * viewport.height, minHeight);
    }
  }, {
    key: "transformY",
    value: function transformY(viewport, yInViewport) {
      var heightInScrollBar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      return yInViewport / this.max * (viewport.height - heightInScrollBar);
    }
  }]);

  return Scroller;
}();

module.exports = Scroller;
},{"../utils/index":"../aQua/src/utils/index.js"}],"../aQua/src/components/ProcessorMgr.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../utils/index'),
    DOM = _require.DOM,
    SpecialCharSet = _require.SpecialCharSet;

var ProcessorMgr =
/*#__PURE__*/
function () {
  function ProcessorMgr(aqua) {
    _classCallCheck(this, ProcessorMgr);

    this.aqua = aqua;
    this.registry = Object.create(null);
  }

  _createClass(ProcessorMgr, [{
    key: "tokenize",
    value: function tokenize(asset, options, cb) {}
  }, {
    key: "transformToElements",
    value: function transformToElements(line) {
      var _this = this;

      var fileType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.aqua.optionMgr.get('ext');
      var $root = DOM.f();

      if (line.length === 0) {
        DOM.appendChild($root, DOM.e('span', {
          'class': 'aqua-block-empty'
        }));
        return $root;
      }

      this.traverse(line.data, function (data, type) {
        var processor = _this.get(type);

        var tokens = processor.tokenize(data, fileType);
        processor.toElementsAndMount(tokens, $root, line);
      });
      return $root;
    }
  }, {
    key: "get",
    value: function get(type) {
      return this.registry[type];
    }
  }, {
    key: "traverse",
    value: function traverse(asset, cb) {
      var type = asset.type || 'string';

      if (type === 'string') {
        cb(asset, type);
        return;
      }

      for (; asset !== null; asset = asset.next) {
        cb(asset.data, asset.type);
      }
    }
  }, {
    key: "load",
    value: function load(Processor) {
      var processor = new Processor(this.aqua.docWatcher, this.aqua.korwa);
      var targets = processor.targets;

      for (var i = 0; i < targets.length; i++) {
        var target = targets[i];
        this.registry[target] = processor;
      }
    }
  }]);

  return ProcessorMgr;
}();

module.exports = ProcessorMgr;
},{"../utils/index":"../aQua/src/utils/index.js"}],"../aQua/src/components/Serializer.js":[function(require,module,exports) {
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Serializer =
/*#__PURE__*/
function () {
  function Serializer(aqua) {
    _classCallCheck(this, Serializer);

    this.aqua = aqua;
  }

  _createClass(Serializer, [{
    key: "serializeCursor",
    value: function serializeCursor() {
      var result = [];
      var cursorInfo = this.aqua.cursorMgr.extract();
      result.push(cursorInfo.primary, cursorInfo.cursors);
      return JSON.stringify(result);
    }
  }, {
    key: "deserializeCursor",
    value: function deserializeCursor(cursorStr) {
      var _JSON$parse = JSON.parse(cursorStr),
          _JSON$parse2 = _slicedToArray(_JSON$parse, 2),
          primary = _JSON$parse2[0],
          cursors = _JSON$parse2[1];

      return {
        primary: primary,
        cursors: cursors
      };
    }
  }, {
    key: "serializeDoc",
    value: function serializeDoc() {
      return JSON.stringify(this.aqua.docMgr.extract());
    }
  }, {
    key: "deserializeDoc",
    value: function deserializeDoc(docStr) {
      return JSON.parse(docStr);
    }
  }, {
    key: "serializeChronicle",
    value: function serializeChronicle() {
      return JSON.stringify(this.aqua.chronicle.extract());
    }
  }, {
    key: "deserializeChronicle",
    value: function deserializeChronicle(chronicleStr) {
      return JSON.parse(chronicleStr);
    }
  }, {
    key: "serializeOption",
    value: function serializeOption() {
      var options = {
        scroller: {
          y: this.aqua.scroller.y
        }
      };
      return JSON.stringify(options);
    }
  }, {
    key: "deserializeOption",
    value: function deserializeOption(optionStr) {
      return JSON.parse(optionsStr);
    }
  }, {
    key: "serialize",
    value: function serialize() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$doc = _ref.doc,
          doc = _ref$doc === void 0 ? true : _ref$doc,
          _ref$cursor = _ref.cursor,
          cursor = _ref$cursor === void 0 ? true : _ref$cursor,
          _ref$chronicle = _ref.chronicle,
          chronicle = _ref$chronicle === void 0 ? true : _ref$chronicle,
          _ref$option = _ref.option,
          option = _ref$option === void 0 ? true : _ref$option;

      var result = Object.create(null);

      if (doc) {
        result.doc = this.aqua.docMgr.extract();
      }

      if (cursor) {
        var cursorInfo = this.aqua.cursorMgr.extract();
        result.cursor = [cursorInfo.primary, cursorInfo.cursors];
      }

      if (chronicle) {
        result.chronicle = this.aqua.chronicle.extract();
      }

      if (option) {
        result.option = {
          scroller: {
            y: this.aqua.scroller.y
          }
        };
      }

      return JSON.stringify(result);
    }
  }, {
    key: "deserialize",
    value: function deserialize(aqua) {
      var result = JSON.parse(aqua);
      console.warn('deserialize', result);
      return result;
    }
  }]);

  return Serializer;
}();

module.exports = Serializer;
},{}],"../aQua/src/components/State.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = function State() {
  _classCallCheck(this, State);

  this.active = false, this.mousedown = false, this.mod = {
    line: null,
    cursor: null
  };
  this.file = {
    suffix: 'txt'
  };
  this.ui = {
    resized: false
  };
};

module.exports = State;
},{}],"../aQua/src/components/UIMgr.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../utils/index'),
    DOM = _require.DOM;

var UIMgr =
/*#__PURE__*/
function () {
  function UIMgr(aqua) {
    _classCallCheck(this, UIMgr);

    this.aqua = aqua;
    this.ui = Object.create(null);
    this.store = Object.create(null);
  }

  _createClass(UIMgr, [{
    key: "load",
    value: function load(name, fn) {
      var isExist = this.ui[name];

      if (isExist) {
        console.error("UI fn name ".concat(name, " has been registered"));
        return;
      }

      this.ui[name] = fn;
    }
  }, {
    key: "render",
    value: function render(name) {
      var fn = this.ui[name];

      if (!fn) {
        console.error("".concat(name, " render function not exist"));
        return;
      }

      for (var _len = arguments.length, payload = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        payload[_key - 1] = arguments[_key];
      }

      return fn.apply(void 0, payload);
    }
  }, {
    key: "set",
    value: function set(name, $node) {
      this.store[name] = $node;
    }
  }, {
    key: "get",
    value: function get(name) {
      return this.store[name];
    }
  }, {
    key: "mount",
    value: function mount(parent, children) {
      DOM.appendChild(parent, children);
    }
  }, {
    key: "mountByString",
    value: function mountByString(structure) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$placeholder = _ref.placeholder,
          placeholder = _ref$placeholder === void 0 ? Object.create(null) : _ref$placeholder,
          _ref$mounted = _ref.mounted,
          mounted = _ref$mounted === void 0 ? null : _ref$mounted,
          _ref$split = _ref.split,
          split = _ref$split === void 0 ? 4 : _ref$split;

      var $root = DOM.f();
      var tokens = getTokens(structure, split);
      var map = {
        0: $root
      };

      for (var i = 1; i < tokens.length; i = i + 2) {
        var token = tokens[i];
        var level = tokens[i - 1];
        var $ele = token[0] === '$' ? placeholder[token] : this.render(token);
        map[level] = $ele;
        DOM.appendChild(map[level - 1], $ele);
        mounted && mounted($ele, token);
      }

      return $root;

      function getTokens(structure, split) {
        var tokens = [];
        var token = '';
        var curType = 'space'; // 'space'

        var preSpace = 0;

        for (var _i = 0; _i < structure.length; _i++) {
          var char = structure[_i];

          if (char === '\n') {
            continue;
          } else if (char === ' ') {
            if (curType === 'word') {
              token = sendToken(tokens, token);
            }

            curType = 'space';
            token = token + char;
          } else {
            if (curType === 'space') {
              if (tokens[0] === undefined) {
                preSpace = token.length;
                token = sendToken(tokens, 1);
              } else {
                token = sendToken(tokens, (token.length - preSpace) / split + 1);
              }
            }

            curType = 'word';
            token = token + char;
          }
        }

        if (curType === 'word') {
          token = sendToken(tokens, token);
        }

        return tokens;
      }

      function sendToken(tokens, token) {
        tokens.push(token);
        return '';
      }
    }
  }]);

  return UIMgr;
}();

module.exports = UIMgr;
},{"../utils/index":"../aQua/src/utils/index.js"}],"../aQua/src/components/ViewportMgr.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../models/index'),
    Viewport = _require.Viewport;

var ViewportMgr =
/*#__PURE__*/
function () {
  function ViewportMgr(aqua) {
    _classCallCheck(this, ViewportMgr);

    this.aqua = aqua;
    this.main = null;
    this.viewports = [];
  }

  _createClass(ViewportMgr, [{
    key: "init",
    value: function init(options) {
      this.create(options);
      this.main = this.viewports[0];
      this.aqua.viewport = this.main;
    }
  }, {
    key: "create",
    value: function create(options) {
      var viewport = new Viewport(options);
      this.viewports.push(viewport);
      return viewport;
    }
  }, {
    key: "remove",
    value: function remove(vid) {
      var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      if (vid > 0) {
        this.viewports.splice(vid, count);
      }
    }
  }, {
    key: "get",
    value: function get(vid) {
      return this.viewports[vid];
    }
  }, {
    key: "traverse",
    value: function traverse(cb) {
      var viewports = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.viewports;

      for (var i = 0; i < viewports.length; i++) {
        cb(viewports[i]);
      }
    }
  }]);

  return ViewportMgr;
}();

module.exports = ViewportMgr;
},{"../models/index":"../aQua/src/models/index.js"}],"../aQua/src/components/WorkerMgr.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../utils/index'),
    Khala = _require.Khala;

var WorkerMgr =
/*#__PURE__*/
function () {
  function WorkerMgr(aqua) {
    _classCallCheck(this, WorkerMgr);

    this.aqua = aqua;
    this.workersNameAndPath = [];
    this.workers = Object.create(null);
    this.station = new Khala();
    this.init();
  }

  _createClass(WorkerMgr, [{
    key: "init",
    value: function init() {//     this.workers['highlight'] = new Worker('../workers/HighlightWorker.js')
      //     this.proxy('highlight', this.workers['highlight'])
    }
  }, {
    key: "get",
    value: function get(name) {
      return this.workers[name];
    }
  }, {
    key: "proxy",
    value: function proxy(name, worker) {
      var _this = this;

      worker.addEventListener('message', function (event) {
        _this.station.emit(name, event.data);
      });
    }
  }, {
    key: "on",
    value: function on(name, cb) {
      this.station.on(name, cb);
    }
  }, {
    key: "post",
    value: function post(name, payload, cb) {
      this.get(name).postMessage(payload);
    }
  }]);

  return WorkerMgr;
}();

module.exports = WorkerMgr;
},{"../utils/index":"../aQua/src/utils/index.js"}],"../aQua/src/components/index.js":[function(require,module,exports) {
var ActionMgr = require('./ActionMgr');

var Chronicle = require('./Chronicle');

var ContentMgr = require('./ContentMgr');

var CursorMgr = require('./CursorMgr');

var DetailBarMgr = require('./DetailBarMgr');

var DocMgr = require('./DocMgr');

var Inputer = require('./Inputer');

var Korwa = require('./Korwa');

var LineMgr = require('./LineMgr');

var Locator = require('./Locator');

var OptionMgr = require('./OptionMgr');

var PluginMgr = require('./PluginMgr');

var Renderer = require('./Renderer');

var Scroller = require('./Scroller');

var ProcessorMgr = require('./ProcessorMgr');

var Serializer = require('./Serializer');

var State = require('./State');

var UIMgr = require('./UIMgr');

var ViewportMgr = require('./ViewportMgr');

var WorkerMgr = require('./WorkerMgr');

module.exports = {
  ActionMgr: ActionMgr,
  Chronicle: Chronicle,
  ContentMgr: ContentMgr,
  CursorMgr: CursorMgr,
  DetailBarMgr: DetailBarMgr,
  DocMgr: DocMgr,
  Inputer: Inputer,
  Korwa: Korwa,
  LineMgr: LineMgr,
  Locator: Locator,
  OptionMgr: OptionMgr,
  PluginMgr: PluginMgr,
  ProcessorMgr: ProcessorMgr,
  Renderer: Renderer,
  Scroller: Scroller,
  Serializer: Serializer,
  State: State,
  UIMgr: UIMgr,
  ViewportMgr: ViewportMgr,
  WorkerMgr: WorkerMgr
};
},{"./ActionMgr":"../aQua/src/components/ActionMgr.js","./Chronicle":"../aQua/src/components/Chronicle.js","./ContentMgr":"../aQua/src/components/ContentMgr.js","./CursorMgr":"../aQua/src/components/CursorMgr.js","./DetailBarMgr":"../aQua/src/components/DetailBarMgr.js","./DocMgr":"../aQua/src/components/DocMgr.js","./Inputer":"../aQua/src/components/Inputer.js","./Korwa":"../aQua/src/components/Korwa.js","./LineMgr":"../aQua/src/components/LineMgr.js","./Locator":"../aQua/src/components/Locator.js","./OptionMgr":"../aQua/src/components/OptionMgr.js","./PluginMgr":"../aQua/src/components/PluginMgr.js","./Renderer":"../aQua/src/components/Renderer.js","./Scroller":"../aQua/src/components/Scroller.js","./ProcessorMgr":"../aQua/src/components/ProcessorMgr.js","./Serializer":"../aQua/src/components/Serializer.js","./State":"../aQua/src/components/State.js","./UIMgr":"../aQua/src/components/UIMgr.js","./ViewportMgr":"../aQua/src/components/ViewportMgr.js","./WorkerMgr":"../aQua/src/components/WorkerMgr.js"}],"../aQua/src/lines/Text.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Line = _require.Line;

var _require2 = require('../utils/index'),
    DOM = _require2.DOM;

var _require3 = require('../enums/index'),
    HTMLVariables = _require3.HTMLVariables;

var DisableMouseEvent = HTMLVariables.DisableMouseEvent;

var Text =
/*#__PURE__*/
function (_Line) {
  _inherits(Text, _Line);

  function Text() {
    var _this;

    _classCallCheck(this, Text);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Text).call(this, 'Text'));
    _this.$template = _this.template();
    return _this;
  }

  _createClass(Text, [{
    key: "create",
    value: function create() {
      var $content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var $line = this.$template.cloneNode(true);

      if ($content) {
        DOM.appendChild($line.children[1].firstChild, $content);
      }

      return $line;
    }
  }, {
    key: "template",
    value: function template() {
      var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return DOM.e('div', {
        'class': 'line'
      }, [DOM.e('div', _defineProperty({
        'class': 'prefix'
      }, DisableMouseEvent, 'true'), [DOM.e('div', {
        'class': 'line-num'
      })]), DOM.e('div', {
        'class': 'suffix'
      }, [DOM.e('code', {}, content ? [content] : null)])]);
    }
  }]);

  return Text;
}(Line);

module.exports = Text;
},{"../interfaces/index":"../aQua/src/interfaces/index.js","../utils/index":"../aQua/src/utils/index.js","../enums/index":"../aQua/src/enums/index.js"}],"../aQua/src/lines/Minato.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Line = _require.Line;

var _require2 = require('../utils/index'),
    DOM = _require2.DOM;

var _require3 = require('../enums/index'),
    HTMLVariables = _require3.HTMLVariables;

var DisableMouseEvent = HTMLVariables.DisableMouseEvent;

var Minato =
/*#__PURE__*/
function (_Line) {
  _inherits(Minato, _Line);

  function Minato() {
    var _this;

    _classCallCheck(this, Minato);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Minato).call(this, 'Minato'));
    _this.$template = _this.template();
    return _this;
  }

  _createClass(Minato, [{
    key: "create",
    value: function create() {
      var $content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var $line = this.$template.cloneNode(true);

      if ($content) {
        DOM.appendChild($line.children[1].firstChild, $content);
      }

      return $line;
    }
  }, {
    key: "template",
    value: function template() {
      var $content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return DOM.e('div', {
        'class': 'line line-minato'
      }, [DOM.e('div', {
        'class': 'prefix',
        'aqua-is-line-number': 'true'
      }, [DOM.e('div', {
        'class': 'line-num'
      })]), DOM.e('div', {
        'class': 'suffix'
      }, [DOM.e('code', {}, $content ? [$content] : null)])]);
    }
  }]);

  return Minato;
}(Line);

module.exports = Minato;
},{"../interfaces/index":"../aQua/src/interfaces/index.js","../utils/index":"../aQua/src/utils/index.js","../enums/index":"../aQua/src/enums/index.js"}],"../aQua/src/lines/index.js":[function(require,module,exports) {
var Text = require('./Text');

var Minato = require('./Minato');

module.exports = {
  Text: new Text(),
  Minato: new Minato()
};
},{"./Text":"../aQua/src/lines/Text.js","./Minato":"../aQua/src/lines/Minato.js"}],"../aQua/src/cursors/Anchor.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../models/index'),
    Coord = _require.Coord,
    Selection = _require.Selection;

var _require2 = require('../enums/index'),
    ArgOpt = _require2.ArgOpt;

var Anchor =
/*#__PURE__*/
function () {
  function Anchor(aqua) {
    _classCallCheck(this, Anchor);

    this.docMgr = aqua.docMgr;
    this.locator = aqua.locator;
    this.effect = new Coord().extract();
    this.coord = new Coord();
    this.layout = new Coord();
    this.selection = new Selection();
    this.filter = null;
    this.status = Object.create(null);
  }

  _createClass(Anchor, [{
    key: "useOffsetUpdater",
    value: function useOffsetUpdater() {
      var offsetY = 0;
      var offsetX = 0;
      return {
        setY: function setY(y) {
          offsetY = y;
        },
        setX: function setX(x) {
          offsetX = x;
        },
        flush: function flush(start) {
          return {
            y: offsetY,
            x: offsetX
          };
        }
      };
    }
  }, {
    key: "resetSelection",
    value: function resetSelection() {
      this.selection.base = this.coord.clone();
      this.selection.terminal = this.coord.clone();
    }
  }, {
    key: "moveToSelectionStart",
    value: function moveToSelectionStart() {
      this.coord = this.selection.start.clone();
    }
  }, {
    key: "moveToSelectionEnd",
    value: function moveToSelectionEnd() {
      this.coord = this.selection.end.clone();
    }
  }, {
    key: "updateLayout",
    value: function updateLayout() {
      var layout = this.locator.getLayoutByCoord(this.y, this.x, this.insideY !== this.maxInsideY ? this.insideY : null);
      this.layout.y = layout.y;
      this.layout.x = layout.x;
      return layout;
    }
  }, {
    key: "merge",
    value: function merge(cursor) {
      this.selection.merge(cursor.selection);

      if (this.selection.direction === ArgOpt.SelectionDirectionIsBottomRight) {
        this.coord.assign(this.selection.end);
      } else if (this.selection.direction === ArgOpt.SelectionDirectionIsTopLeft) {
        this.coord.assign(this.selection.start);
      }
    }
  }, {
    key: "updateOffset",
    value: function updateOffset(offsetCoord, lastY) {
      if (offsetCoord.y === 0 && offsetCoord.x === 0) {
        return;
      } // console.log('before Update', this.coord.clone(), JSON.parse(JSON.stringify(offsetCoord)), this.x)


      this.y = this.y + offsetCoord.y;
      this.x = this.y === lastY ? offsetCoord.x + this.x : this.x; // console.log('lastY, this.y', lastY, this.y)
      // console.log('offsetCoord.x, this.x', offsetCoord.x)
      // console.log('Update', this.coord.clone())

      if (this.selection.isCollapsed()) {
        return;
      }

      var coord = this.coord.clone();
      var selection = this.selection;
      var direction = selection.direction;

      if (direction === ArgOpt.SelectionDirectionIsBottomRight) {
        this.y = selection.start.y + offsetCoord.y;
        this.x = this.y === lastY ? selection.start.x + offsetCoord.x : selection.start.x;
        selection.base = this.coord.clone();
        selection.terminal = coord.clone();
      } else if (direction === ArgOpt.SelectionDirectionIsTopLeft) {
        this.y = selection.end.y + offsetCoord.y;
        this.x = this.y === lastY ? selection.end.x + offsetCoord.x : selection.end.x;
        selection.base = this.coord.clone();
        selection.terminal = coord.clone();
      }

      this.coord = coord.clone();
    }
  }, {
    key: "extract",
    value: function extract() {
      var data = Object.create(null);
      data.coord = this.coord.extract();
      data.selection = this.selection.extract();
      return data;
    }
  }, {
    key: "rebuild",
    value: function rebuild(data) {
      var coord = data.coord,
          selection = data.selection;

      if (selection) {
        this.y = selection.base.y;
        this.x = selection.base.x;
        this.selection.base = this.coord.clone();
        this.y = selection.terminal.y;
        this.x = selection.terminal.x;
        this.selection.terminal = this.coord.clone();
      }

      this.y = coord.y;
      this.x = coord.x;
    }
  }, {
    key: "y",
    set: function set(y) {
      this.coord.y = this.docMgr.correctLineNum(y);
      this.coord.maxInsideY = this.locator.getMaxInsideYByY(y);
    },
    get: function get() {
      return this.coord.y;
    }
  }, {
    key: "x",
    set: function set(x) {
      this.coord.x = Math.min(x, this.docMgr.getLine(this.coord.y).length);
      this.coord.insideY = this.locator.getInsideYByCoord(this.coord.y, this.coord.x);
    },
    get: function get() {
      return this.coord.x;
    }
  }, {
    key: "$y",
    set: function set($y) {
      var _this$locator$getYByL = this.locator.getYByLayoutY($y),
          y = _this$locator$getYByL.y,
          insideY = _this$locator$getYByL.insideY,
          maxInsideY = _this$locator$getYByL.maxInsideY;

      this.coord.y = y;
      this.coord.insideY = insideY;
      this.coord.maxInsideY = maxInsideY;
    },
    get: function get() {
      return this.layout.y;
    }
  }, {
    key: "$x",
    set: function set($x) {
      var x = this.locator.getXByLayoutX(this.coord.y, this.coord.insideY, $x);
      this.coord.x = x;
    },
    get: function get() {
      return this.layout.x;
    }
  }, {
    key: "insideY",
    set: function set(insideY) {
      this.coord.insideY = insideY;
      this.$x = this.$x;
    },
    get: function get() {
      return this.coord.insideY;
    }
  }, {
    key: "maxInsideY",
    get: function get() {
      return this.coord.maxInsideY;
    }
  }]);

  return Anchor;
}();

module.exports = Anchor;
},{"../models/index":"../aQua/src/models/index.js","../enums/index":"../aQua/src/enums/index.js"}],"../aQua/src/cursors/index.js":[function(require,module,exports) {
var Anchor = require('./Anchor');

module.exports = {
  Anchor: Anchor
};
},{"./Anchor":"../aQua/src/cursors/Anchor.js"}],"../aQua/src/actions/Backspace.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var Backspace =
/*#__PURE__*/
function (_Action) {
  _inherits(Backspace, _Action);

  function Backspace() {
    var _this;

    _classCallCheck(this, Backspace);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Backspace).call(this));
    _this.name = 'Backspace';
    _this.shortcuts = ['Backspace'];
    return _this;
  }

  _createClass(Backspace, [{
    key: "exec",
    value: function exec(aqua, event) {
      var _this2 = this;

      var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      aqua.cursorMgr.traverse(function (cursor) {
        _this2.backspace(aqua, cursor);
      });
    }
  }, {
    key: "backspace",
    value: function backspace(aqua, cursor) {
      var selection = cursor.selection;

      if (selection.isCollapsed()) {
        var coord = cursor.coord.clone();
        aqua.actionMgr.execWithName('MoveLeft', 'moveLeft', cursor);
        aqua.docMgr.delete(coord, cursor.coord);
        return;
      }

      aqua.docMgr.delete(selection.start, selection.end);
      cursor.moveToSelectionStart();
      cursor.resetSelection();
    }
  }]);

  return Backspace;
}(Action);

module.exports = Backspace;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/Copy.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var Copy =
/*#__PURE__*/
function (_Action) {
  _inherits(Copy, _Action);

  function Copy() {
    var _this;

    _classCallCheck(this, Copy);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Copy).call(this));
    _this.name = 'Copy';
    return _this;
  }

  _createClass(Copy, [{
    key: "exec",
    value: function exec(aqua, event, state) {
      event.preventDefault();
      var datas = [];
      aqua.cursorMgr.pureTraverse(function (cursor) {
        if (cursor.selection.isCollapsed()) {
          return;
        }

        var _cursor$selection = cursor.selection,
            start = _cursor$selection.start,
            end = _cursor$selection.end;
        datas.push(aqua.docMgr.read(start, end).join('\n'));
      });

      if (datas.length > 0) {
        event.clipboardData.setData('text/plain', datas.join('\n'));
      }
    }
  }]);

  return Copy;
}(Action);

module.exports = Copy;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/Cut.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var Cut =
/*#__PURE__*/
function (_Action) {
  _inherits(Cut, _Action);

  function Cut() {
    var _this;

    _classCallCheck(this, Cut);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Cut).call(this));
    _this.name = 'Cut';
    _this.shortcuts = ['Ctrl + LeftMousedown'];
    return _this;
  }

  _createClass(Cut, [{
    key: "exec",
    value: function exec(aqua, event, state) {
      console.error('Cut', event);
    }
  }]);

  return Cut;
}(Action);

module.exports = Cut;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/Paste.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var Paste =
/*#__PURE__*/
function (_Action) {
  _inherits(Paste, _Action);

  function Paste() {
    var _this;

    _classCallCheck(this, Paste);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Paste).call(this));
    _this.name = 'Paste';
    return _this;
  }

  _createClass(Paste, [{
    key: "exec",
    value: function exec(aqua, event, state) {
      event.preventDefault();
      aqua.chronicle.start('Paste', aqua.cursorMgr.extract());
      var data = event.clipboardData.getData('text/plain');
      var cursorSize = aqua.cursorMgr.size;
      var dataArr = data.split('\n');

      if (cursorSize === dataArr.length) {
        aqua.cursorMgr.traverse(function (cursor, index) {
          aqua.actionMgr.execWithName('Input', 'input', cursor, dataArr[index]);
        });
      } else {
        aqua.cursorMgr.traverse(function (cursor, index) {
          aqua.actionMgr.execWithName('Input', 'input', cursor, dataArr);
        });
      }

      aqua.chronicle.end('Paste', aqua.cursorMgr.extract());
    }
  }]);

  return Paste;
}(Action);

module.exports = Paste;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/Quote.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var _require2 = require('../enums/index'),
    ArgOpt = _require2.ArgOpt;

var Quote =
/*#__PURE__*/
function (_Action) {
  _inherits(Quote, _Action);

  function Quote() {
    var _this;

    _classCallCheck(this, Quote);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Quote).call(this));
    _this.name = 'Quote';
    _this.shortcuts = ["'"];
    return _this;
  }

  _createClass(Quote, [{
    key: "exec",
    value: function exec(aqua, event) {
      var _this2 = this;

      event.preventDefault();
      aqua.cursorMgr.traverse(function (cursor) {
        _this2.update(aqua, cursor);
      });
    }
  }, {
    key: "update",
    value: function update(aqua, cursor) {
      if (cursor.selection.isCollapsed()) {
        aqua.docMgr.write("'", cursor);
        cursor.x = cursor.x + 1;
        return;
      }

      var _cursor$selection = cursor.selection,
          start = _cursor$selection.start,
          end = _cursor$selection.end,
          direction = _cursor$selection.direction;
      aqua.docMgr.write("'", start);
      cursor.y = start.y;
      cursor.x = start.x + 1;
      var startCoord = cursor.coord.clone();
      cursor.y = end.y;
      cursor.x = end.y === start.y ? end.x + 1 : end.x;
      var endCoord = cursor.coord.clone();
      aqua.docMgr.write("'", endCoord);

      if (direction === ArgOpt.SelectionDirectionIsBottomRight) {
        cursor.selection.base = startCoord;
        cursor.selection.terminal = endCoord;
        cursor.coord = endCoord;
        return;
      }

      if (direction === ArgOpt.SelectionDirectionIsTopLeft) {
        cursor.selection.base = endCoord;
        cursor.selection.terminal = startCoord;
        cursor.coord = startCoord;
        return;
      }
    }
  }]);

  return Quote;
}(Action);

module.exports = Quote;
},{"../interfaces/index":"../aQua/src/interfaces/index.js","../enums/index":"../aQua/src/enums/index.js"}],"../aQua/src/actions/CtrlBackspace.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var CtrlBackspace =
/*#__PURE__*/
function (_Action) {
  _inherits(CtrlBackspace, _Action);

  function CtrlBackspace() {
    var _this;

    _classCallCheck(this, CtrlBackspace);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CtrlBackspace).call(this));
    _this.name = 'CtrlBackspace';
    _this.shortcuts = ['Ctrl + Backspace'];
    return _this;
  }

  _createClass(CtrlBackspace, [{
    key: "exec",
    value: function exec(aqua, event) {
      console.error(this.name);
    }
  }]);

  return CtrlBackspace;
}(Action);

module.exports = CtrlBackspace;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/CtrlDelete.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var CtrlDelete =
/*#__PURE__*/
function (_Action) {
  _inherits(CtrlDelete, _Action);

  function CtrlDelete() {
    var _this;

    _classCallCheck(this, CtrlDelete);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CtrlDelete).call(this));
    _this.name = 'CtrlDelete';
    _this.shortcuts = ['Ctrl + Delete'];
    return _this;
  }

  _createClass(CtrlDelete, [{
    key: "exec",
    value: function exec(aqua, event) {
      console.error(this.name);
    }
  }]);

  return CtrlDelete;
}(Action);

module.exports = CtrlDelete;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/CtrlEnter.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var CtrlEnter =
/*#__PURE__*/
function (_Action) {
  _inherits(CtrlEnter, _Action);

  function CtrlEnter() {
    var _this;

    _classCallCheck(this, CtrlEnter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CtrlEnter).call(this));
    _this.name = 'CtrlEnter';
    _this.shortcuts = ['Ctrl + Enter'];
    return _this;
  }

  _createClass(CtrlEnter, [{
    key: "exec",
    value: function exec(aqua, event) {
      event.preventDefault();
      var yAcc = 0;
      var lastY = -1;
      aqua.cursorMgr.traverse(function (cursor) {
        aqua.docMgr.write([''], cursor, {
          isInsert: true
        });

        if (lastY !== cursor.y) {
          yAcc = 0;
        }

        yAcc = yAcc + 1;
        lastY = cursor.y;
        cursor.y = cursor.y + yAcc;
        cursor.x = 0;
      });
    }
  }]);

  return CtrlEnter;
}(Action);

module.exports = CtrlEnter;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/Delete.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var Delete =
/*#__PURE__*/
function (_Action) {
  _inherits(Delete, _Action);

  function Delete() {
    var _this;

    _classCallCheck(this, Delete);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Delete).call(this));
    _this.name = 'Delete';
    _this.shortcuts = ['Delete'];
    return _this;
  }

  _createClass(Delete, [{
    key: "exec",
    value: function exec(aqua, event) {
      var _this2 = this;

      aqua.cursorMgr.traverse(function (cursor) {
        _this2.delete(aqua, cursor);
      });
    }
  }, {
    key: "delete",
    value: function _delete(aqua, cursor) {
      var selection = cursor.selection;

      if (selection.isCollapsed()) {
        var coord = aqua.actionMgr.execWithName('MoveRight', 'getMoveRightCoord', cursor);
        aqua.docMgr.delete(cursor.coord, coord);
        return;
      }

      aqua.docMgr.delete(selection.start, selection.end);
      cursor.moveToSelectionStart();
      cursor.resetSelection();
    }
  }]);

  return Delete;
}(Action);

module.exports = Delete;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/Enter.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var Enter =
/*#__PURE__*/
function (_Action) {
  _inherits(Enter, _Action);

  function Enter() {
    var _this;

    _classCallCheck(this, Enter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Enter).call(this));
    _this.name = 'Enter';
    _this.shortcuts = ['Enter'];
    return _this;
  }

  _createClass(Enter, [{
    key: "exec",
    value: function exec(aqua, event) {
      event.preventDefault();
      aqua.cursorMgr.traverse(function (cursor) {
        if (!cursor.selection.isCollapsed()) {
          aqua.actionMgr.execWithName('Backspace', 'backspace', cursor);
        }

        aqua.docMgr.write(['', ''], cursor);
        cursor.y = cursor.y + 1;
        cursor.x = 0;
      });
    }
  }]);

  return Enter;
}(Action);

module.exports = Enter;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/Input.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var Input =
/*#__PURE__*/
function (_Action) {
  _inherits(Input, _Action);

  function Input() {
    var _this;

    _classCallCheck(this, Input);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Input).call(this));
    _this.name = 'Input';
    return _this;
  }

  _createClass(Input, [{
    key: "exec",
    value: function exec(aqua, assets) {
      var _this2 = this;

      aqua.chronicle.start('Input', aqua.cursorMgr.extract());
      aqua.cursorMgr.traverse(function (cursor) {
        _this2.input(aqua, cursor, assets);
      });
      aqua.chronicle.end('Input', aqua.cursorMgr.extract());
    }
  }, {
    key: "input",
    value: function input(aqua, cursor, assets) {
      if (!cursor.selection.isCollapsed()) {
        aqua.actionMgr.execWithName('Backspace', 'backspace', cursor);
      }

      var _aqua$docMgr$write = aqua.docMgr.write(assets, cursor),
          y = _aqua$docMgr$write.y,
          x = _aqua$docMgr$write.x;

      cursor.y = cursor.y + y;
      cursor.x = cursor.x + x;
    }
  }]);

  return Input;
}(Action);

module.exports = Input;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/Tab.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var Tab =
/*#__PURE__*/
function (_Action) {
  _inherits(Tab, _Action);

  function Tab() {
    var _this;

    _classCallCheck(this, Tab);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tab).call(this));
    _this.name = 'Tab';
    _this.shortcuts = ['Tab'];
    return _this;
  }

  _createClass(Tab, [{
    key: "exec",
    value: function exec(aqua, event) {
      var _this2 = this;

      event.preventDefault();
      var offset = 0;
      var lastY = -1;
      aqua.cursorMgr.traverse(function (cursor, index) {
        if (cursor.y !== lastY) {
          lastY = cursor.y;
          offset = 0;
        } else {
          cursor.y = cursor.y + offset;
        }

        offset = offset + 1;

        _this2.update(aqua, cursor);

        cursor.y = cursor.y + 1;
        cursor.x = 0;
      });
    }
  }, {
    key: "update",
    value: function update(aqua, cursor) {
      if (cursor.selection.isCollapsed()) {
        return;
      }

      cursor.resetSelection();
      var content = this.genConsoleInfo(aqua.docMgr.read(cursor.selection.start, cursor.selection.end));
      aqua.docMgr.write(content, cursor.coord, {
        isInsert: true
      });
    }
  }, {
    key: "genConsoleInfo",
    value: function genConsoleInfo(infilling) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'log';
      var content = "console.log('".concat(infilling, ":', ").concat(infilling, ")");
      return content;
    }
  }]);

  return Tab;
}(Action);

module.exports = Tab;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/ShiftTab.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var ShiftTab =
/*#__PURE__*/
function (_Action) {
  _inherits(ShiftTab, _Action);

  function ShiftTab() {
    var _this;

    _classCallCheck(this, ShiftTab);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ShiftTab).call(this));
    _this.name = 'ShiftTab';
    _this.shortcuts = ['Shift + Tab'];
    return _this;
  }

  _createClass(ShiftTab, [{
    key: "exec",
    value: function exec(aqua, event) {
      event.preventDefault();
      console.error(this.name);
    }
  }]);

  return ShiftTab;
}(Action);

module.exports = ShiftTab;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/LeftMousedown.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var _require2 = require('../enums/index'),
    HTMLVariables = _require2.HTMLVariables,
    ActionEventType = _require2.ActionEventType;

var LeftMousedown =
/*#__PURE__*/
function (_Action) {
  _inherits(LeftMousedown, _Action);

  function LeftMousedown() {
    var _this;

    _classCallCheck(this, LeftMousedown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LeftMousedown).call(this));
    _this.name = 'LeftMousedown';
    _this.shortcuts = ['LeftMousedown'];
    _this.eventType = ActionEventType.Mouse;
    _this.record = false;
    return _this;
  }

  _createClass(LeftMousedown, [{
    key: "exec",
    value: function exec(aqua, event, state) {
      aqua.state.mousedown = true;
      var cursors = aqua.cursorMgr;

      if (cursors.size > 1) {
        cursors.removeAll();
      }

      var rect = aqua.korwa.getLineWidthRect();
      cursors.traverse(function (cursor) {
        if (event.target.getAttribute(HTMLVariables.DisableMouseEvent)) {
          return;
        }

        cursor.$y = event.clientY - rect.top;
        cursor.$x = event.clientX - rect.left;
        cursor.selection.base = cursor.coord;
        cursor.selection.terminal = cursor.coord;
      }, {
        filter: function filter(cursor) {
          return cursors.isPrimary(cursor);
        },
        detect: false
      });
    }
  }]);

  return LeftMousedown;
}(Action);

module.exports = LeftMousedown;
},{"../interfaces/index":"../aQua/src/interfaces/index.js","../enums/index":"../aQua/src/enums/index.js"}],"../aQua/src/actions/LeftMousemove.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var _require2 = require('../enums/index'),
    HTMLVariables = _require2.HTMLVariables,
    ActionEventType = _require2.ActionEventType;

var LeftMousemove =
/*#__PURE__*/
function (_Action) {
  _inherits(LeftMousemove, _Action);

  function LeftMousemove() {
    var _this;

    _classCallCheck(this, LeftMousemove);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LeftMousemove).call(this));
    _this.name = 'LeftMousemove';
    _this.shortcuts = ['LeftMousemove'];
    _this.eventType = ActionEventType.Mouse;
    _this.record = false;
    return _this;
  }

  _createClass(LeftMousemove, [{
    key: "exec",
    value: function exec(aqua, event, state) {
      var _this2 = this;

      if (!aqua.state.mousedown) {
        return;
      }

      var rect = aqua.korwa.getLineWidthRect();
      aqua.cursorMgr.traverse(function (cursor) {
        if (event.target.getAttribute(HTMLVariables.DisableMouseEvent)) {
          return;
        }

        cursor.$y = event.clientY - rect.top;
        cursor.$x = event.clientX - rect.left;
        cursor.selection.terminal = cursor.coord;
      }, {
        filter: function filter(cursor) {
          return aqua.cursorMgr.isPrimary(cursor);
        },
        detect: false,
        after: state.isCreateCursor ? function () {
          _this2.detectAndMark(aqua);
        } : null
      });
    }
  }, {
    key: "detectAndMark",
    value: function detectAndMark(aqua) {
      var cursors = aqua.cursorMgr.detectCursorSelectionOverlay();

      for (var i = 0; i < cursors.length; i++) {
        aqua.marker.mark(cursors[i].status, 'OverlayMark');
      }
    }
  }]);

  return LeftMousemove;
}(Action);

module.exports = LeftMousemove;
},{"../interfaces/index":"../aQua/src/interfaces/index.js","../enums/index":"../aQua/src/enums/index.js"}],"../aQua/src/actions/LeftMouseup.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var _require2 = require('../enums/index'),
    HTMLVariables = _require2.HTMLVariables,
    ActionEventType = _require2.ActionEventType;

var LeftMouseup =
/*#__PURE__*/
function (_Action) {
  _inherits(LeftMouseup, _Action);

  function LeftMouseup() {
    var _this;

    _classCallCheck(this, LeftMouseup);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LeftMouseup).call(this));
    _this.name = 'LeftMouseup';
    _this.desc = 'Locate';
    _this.shortcuts = ['LeftMouseup'];
    _this.eventType = ActionEventType.Mouse;
    _this.record = false;
    return _this;
  }

  _createClass(LeftMouseup, [{
    key: "exec",
    value: function exec(aqua, event, state) {
      var _this2 = this;

      aqua.state.mousedown = false;
      var rect = aqua.korwa.getLineWidthRect();
      aqua.cursorMgr.traverse(function (cursor) {
        if (event.target.getAttribute(HTMLVariables.DisableMouseEvent)) {
          return;
        }

        cursor.$y = event.clientY - rect.top;
        cursor.$x = event.clientX - rect.left;
        cursor.selection.terminal = cursor.coord;
      }, {
        filter: function filter(cursor) {
          return aqua.cursorMgr.isPrimary(cursor);
        },
        detect: false,
        after: state.isCreateCursor ? function () {
          _this2.detectAndRemove(aqua);
        } : null
      });
    }
  }, {
    key: "detectAndRemove",
    value: function detectAndRemove(aqua) {
      var overlayCursors = aqua.cursorMgr.detectCursorSelectionOverlay();

      if (overlayCursors.length === 0) {
        return;
      }

      var lastCursor = overlayCursors[overlayCursors.length - 1];
      aqua.cursorMgr.remove(overlayCursors);
      aqua.cursorMgr.getPrimary(function (cursor) {
        cursor.merge(lastCursor);
      });
    }
  }]);

  return LeftMouseup;
}(Action);

module.exports = LeftMouseup;
},{"../interfaces/index":"../aQua/src/interfaces/index.js","../enums/index":"../aQua/src/enums/index.js"}],"../aQua/src/actions/CreateCursor.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var _require2 = require('../enums/index'),
    ActionEventType = _require2.ActionEventType;

var CreateCursor =
/*#__PURE__*/
function (_Action) {
  _inherits(CreateCursor, _Action);

  function CreateCursor() {
    var _this;

    _classCallCheck(this, CreateCursor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CreateCursor).call(this));
    _this.name = 'CreateCursor';
    _this.shortcuts = ['Ctrl + LeftMousedown'];
    _this.eventType = ActionEventType.Mouse;
    _this.record = false;
    return _this;
  }

  _createClass(CreateCursor, [{
    key: "exec",
    value: function exec(aqua, event, state) {
      var rect = aqua.korwa.getLineWidthRect();
      var phantom = aqua.cursorMgr.usePhantom();
      phantom.$y = event.clientY - rect.top;
      phantom.$x = event.clientX - rect.left;
      var cursor = aqua.cursorMgr.create(phantom.coord);
      cursor.selection.base = cursor.coord;
      cursor.selection.terminal = cursor.coord;
      var overlayCursor = aqua.cursorMgr.detectCursorCoordOverlay(cursor);

      if (overlayCursor) {
        aqua.cursorMgr.remove(cursor);
        aqua.cursorMgr.setPrimary(overlayCursor);
      }
    }
  }]);

  return CreateCursor;
}(Action);

module.exports = CreateCursor;
},{"../interfaces/index":"../aQua/src/interfaces/index.js","../enums/index":"../aQua/src/enums/index.js"}],"../aQua/src/actions/CtrlLeftMousemove.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var _require2 = require('../enums/index'),
    ActionEventType = _require2.ActionEventType;

var CtrlLeftMousemove =
/*#__PURE__*/
function (_Action) {
  _inherits(CtrlLeftMousemove, _Action);

  function CtrlLeftMousemove() {
    var _this;

    _classCallCheck(this, CtrlLeftMousemove);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CtrlLeftMousemove).call(this));
    _this.name = 'CtrlLeftMousemove';
    _this.eventType = ActionEventType.Mouse;
    _this.shortcuts = ['Ctrl + LeftMousemove'];
    _this.record = false;
    return _this;
  }

  _createClass(CtrlLeftMousemove, [{
    key: "exec",
    value: function exec(aqua, event, state) {
      state.isCreateCursor = true;
      aqua.actionMgr.exec('LeftMousemove', event, state);
    }
  }]);

  return CtrlLeftMousemove;
}(Action);

module.exports = CtrlLeftMousemove;
},{"../interfaces/index":"../aQua/src/interfaces/index.js","../enums/index":"../aQua/src/enums/index.js"}],"../aQua/src/actions/CtrlLeftMouseup.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var _require2 = require('../enums/index'),
    ActionEventType = _require2.ActionEventType;

var CtrlLeftMouseUp =
/*#__PURE__*/
function (_Action) {
  _inherits(CtrlLeftMouseUp, _Action);

  function CtrlLeftMouseUp() {
    var _this;

    _classCallCheck(this, CtrlLeftMouseUp);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CtrlLeftMouseUp).call(this));
    _this.name = 'CtrlLeftMouseUp';
    _this.eventType = ActionEventType.Mouse;
    _this.shortcuts = ['Ctrl + LeftMouseUp'];
    _this.record = false;
    return _this;
  }

  _createClass(CtrlLeftMouseUp, [{
    key: "exec",
    value: function exec(aqua, event, state) {
      state.isCreateCursor = true;
      aqua.actionMgr.exec('LeftMouseup', event, state);
    }
  }]);

  return CtrlLeftMouseUp;
}(Action);

module.exports = CtrlLeftMouseUp;
},{"../interfaces/index":"../aQua/src/interfaces/index.js","../enums/index":"../aQua/src/enums/index.js"}],"../aQua/src/actions/MoveDown.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var MoveDown =
/*#__PURE__*/
function (_Action) {
  _inherits(MoveDown, _Action);

  function MoveDown() {
    var _this;

    _classCallCheck(this, MoveDown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MoveDown).call(this));
    _this.name = 'MoveDown';
    _this.shortcuts = ['↓'];
    return _this;
  }

  _createClass(MoveDown, [{
    key: "exec",
    value: function exec(aqua, event) {
      var _this2 = this;

      aqua.cursorMgr.traverse(function (cursor) {
        _this2.moveDown(aqua, cursor, true);
      });
    }
  }, {
    key: "moveDown",
    value: function moveDown(aqua, cursor) {
      var clearSelection = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (clearSelection) {
        cursor.resetSelection();
      }

      var coord = this.getMoveDownCoord(aqua, cursor.coord);

      if (cursor.coord === coord) {
        return;
      }

      if (cursor.y === coord.y) {
        if (coord.insideY !== null) {
          cursor.insideY = coord.insideY;
        } else if (coord.x !== null) {
          cursor.x = coord.x;
        }

        return;
      }

      cursor.y = coord.y;
      cursor.insideY = 0;
    }
  }, {
    key: "getMoveDownCoord",
    value: function getMoveDownCoord(aqua, coord) {
      var yPlus = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var insideYPlus = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      var max = aqua.docMgr.size - 1;
      var xMax = aqua.docMgr.getLine(coord.y).length;

      if (coord.y === max) {
        if (coord.x === xMax) {
          return coord;
        }

        return {
          y: coord.y,
          x: xMax,
          insideY: null
        };
      }

      if (coord.insideY < coord.maxInsideY) {
        return {
          y: coord.y,
          x: null,
          insideY: coord.insideY + 1
        };
      } else {
        return {
          y: coord.y + 1,
          x: null,
          insideY: null // 其实这里是返回 0 就可以了, 但是为了与 MoveUp 对应起来, 理由见 MoveUp.prototype.getMoveDownCoord.

        };
      }
    }
  }]);

  return MoveDown;
}(Action);

module.exports = MoveDown;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/MoveDownAsTerminal.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var MoveDownWithTerminal =
/*#__PURE__*/
function (_Action) {
  _inherits(MoveDownWithTerminal, _Action);

  function MoveDownWithTerminal() {
    var _this;

    _classCallCheck(this, MoveDownWithTerminal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MoveDownWithTerminal).call(this));
    _this.name = 'MoveDownWithTerminal';
    _this.shortcuts = ['Shift + ↓'];
    return _this;
  }

  _createClass(MoveDownWithTerminal, [{
    key: "exec",
    value: function exec(aqua, event) {
      var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      aqua.cursorMgr.traverse(function (cursor) {
        if (cursor.selection.isCollapsed()) {
          cursor.selection.base = cursor.coord;
        }

        aqua.actionMgr.execWithName('MoveDown', 'moveDown', cursor);
        cursor.selection.terminal = cursor.coord;
      });
    }
  }]);

  return MoveDownWithTerminal;
}(Action);

module.exports = MoveDownWithTerminal;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/MoveLeft.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var MoveLeft =
/*#__PURE__*/
function (_Action) {
  _inherits(MoveLeft, _Action);

  function MoveLeft() {
    var _this;

    _classCallCheck(this, MoveLeft);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MoveLeft).call(this));
    _this.name = 'MoveLeft';
    _this.shortcuts = ['←'];
    return _this;
  }

  _createClass(MoveLeft, [{
    key: "exec",
    value: function exec(aqua, event) {
      var _this2 = this;

      aqua.cursorMgr.traverse(function (cursor) {
        _this2.moveLeft(aqua, cursor, true);
      });
    }
  }, {
    key: "moveLeft",
    value: function moveLeft(aqua, cursor) {
      var clearSelection = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (clearSelection) {
        if (!cursor.selection.isCollapsed()) {
          var start = cursor.selection.start;

          if (!cursor.coord.equal(start)) {
            cursor.y = start.y;
            cursor.x = start.x;
            return;
          }

          cursor.resetSelection();
          return;
        }
      }

      var coord = this.getMoveLeftCoord(aqua, cursor.coord);

      if (cursor.coord === coord) {
        return;
      }

      if (cursor.y !== coord.y) {
        cursor.y = coord.y;
      }

      cursor.x = coord.x;
    }
  }, {
    key: "getMoveLeftCoord",
    value: function getMoveLeftCoord(aqua, coord) {
      var xMinus = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      if (coord.x <= 0) {
        if (coord.y === 0) {
          return coord;
        }

        return {
          y: coord.y - 1,
          x: Infinity
        };
      }

      return {
        y: coord.y,
        x: coord.x - 1
      };
    }
  }]);

  return MoveLeft;
}(Action);

module.exports = MoveLeft;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/MoveLeftAsTerminal.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var MoveLeftWithTerminal =
/*#__PURE__*/
function (_Action) {
  _inherits(MoveLeftWithTerminal, _Action);

  function MoveLeftWithTerminal() {
    var _this;

    _classCallCheck(this, MoveLeftWithTerminal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MoveLeftWithTerminal).call(this));
    _this.name = 'MoveLeftWithTerminal';
    _this.shortcuts = ['Shift + ←'];
    return _this;
  }

  _createClass(MoveLeftWithTerminal, [{
    key: "exec",
    value: function exec(aqua, event) {
      aqua.cursorMgr.traverse(function (cursor) {
        if (cursor.selection.isCollapsed()) {
          cursor.selection.base = cursor.coord;
        }

        aqua.actionMgr.execWithName('MoveLeft', 'moveLeft', cursor);
        cursor.selection.terminal = cursor.coord;
      });
    }
  }]);

  return MoveLeftWithTerminal;
}(Action);

module.exports = MoveLeftWithTerminal;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/MoveLeftBlock.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var MoveLeftBlock =
/*#__PURE__*/
function (_Action) {
  _inherits(MoveLeftBlock, _Action);

  function MoveLeftBlock() {
    var _this;

    _classCallCheck(this, MoveLeftBlock);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MoveLeftBlock).call(this));
    _this.name = 'MoveLeftBlock';
    _this.shortcuts = ['Ctrl + ←'];
    return _this;
  }

  _createClass(MoveLeftBlock, [{
    key: "exec",
    value: function exec(aqua, event) {
      var _this2 = this;

      aqua.cursorMgr.traverse(function (cursor) {
        _this2.moveToLeftBlock(aqua, cursor, true);
      });
    }
  }, {
    key: "moveToLeftBlock",
    value: function moveToLeftBlock(aqua, cursor) {
      var clearSelection = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (clearSelection) {
        if (!cursor.selection.isCollapsed()) {
          cursor.resetSelection();
          return;
        }
      }

      aqua.actionMgr.execWithName('MoveLeft', 'moveLeft', cursor);
      var leftBorder = this.getLeftBlockBorder(aqua, cursor);

      if (cursor.x === leftBorder) {
        return;
      }

      cursor.x = leftBorder;
    }
  }, {
    key: "getLeftBlockBorder",
    value: function getLeftBlockBorder(aqua, cursor) {
      var line = aqua.lineMgr.extendLine(cursor.y);
      var block = line.getCurrentBlock(cursor.x);
      return block.leftBorder;
    }
  }]);

  return MoveLeftBlock;
}(Action);

module.exports = MoveLeftBlock;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/MoveLeftBlockAsTerminal.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var MoveLeftBlockAsTerminal =
/*#__PURE__*/
function (_Action) {
  _inherits(MoveLeftBlockAsTerminal, _Action);

  function MoveLeftBlockAsTerminal() {
    var _this;

    _classCallCheck(this, MoveLeftBlockAsTerminal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MoveLeftBlockAsTerminal).call(this));
    _this.name = 'MoveLeftBlockAsTerminal';
    _this.shortcuts = ['Shift + Ctrl + ←'];
    return _this;
  }

  _createClass(MoveLeftBlockAsTerminal, [{
    key: "exec",
    value: function exec(aqua, event) {
      aqua.cursorMgr.traverse(function (cursor) {
        if (cursor.selection.isCollapsed()) {
          cursor.selection.base = cursor.coord;
        }

        aqua.actionMgr.execWithName('MoveLeftBlock', 'moveToLeftBlock', cursor);
        cursor.selection.terminal = cursor.coord;
      });
    }
  }]);

  return MoveLeftBlockAsTerminal;
}(Action);

module.exports = MoveLeftBlockAsTerminal;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/MoveRight.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var MoveRight =
/*#__PURE__*/
function (_Action) {
  _inherits(MoveRight, _Action);

  function MoveRight() {
    var _this;

    _classCallCheck(this, MoveRight);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MoveRight).call(this));
    _this.name = 'MoveRight';
    _this.shortcuts = ['→'];
    return _this;
  }

  _createClass(MoveRight, [{
    key: "exec",
    value: function exec(aqua, event) {
      var _this2 = this;

      aqua.cursorMgr.traverse(function (cursor) {
        _this2.moveRight(aqua, cursor, true);
      });
    }
  }, {
    key: "moveRight",
    value: function moveRight(aqua, cursor) {
      var clearSelection = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (clearSelection) {
        if (!cursor.selection.isCollapsed()) {
          var end = cursor.selection.end;

          if (!cursor.coord.equal(end)) {
            cursor.y = end.y;
            cursor.x = end.x;
            return;
          }

          cursor.resetSelection();
          return;
        }
      }

      var coord = this.getMoveRightCoord(aqua, cursor.coord);

      if (cursor.coord === coord) {
        return;
      }

      if (cursor.y !== coord.y) {
        cursor.y = coord.y;
      }

      cursor.x = coord.x;
    }
  }, {
    key: "getMoveRightCoord",
    value: function getMoveRightCoord(aqua, coord) {
      var xPlus = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var max = aqua.docMgr.size - 1;
      var xMax = aqua.docMgr.getLine(coord.y).length;

      if (coord.x >= xMax) {
        if (coord.y === max) {
          return coord;
        }

        return {
          y: coord.y + 1,
          x: 0
        };
      }

      return {
        y: coord.y,
        x: coord.x + 1
      };
    }
  }]);

  return MoveRight;
}(Action);

module.exports = MoveRight;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/MoveRightAsTerminal.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var MoveRightAsTerminal =
/*#__PURE__*/
function (_Action) {
  _inherits(MoveRightAsTerminal, _Action);

  function MoveRightAsTerminal() {
    var _this;

    _classCallCheck(this, MoveRightAsTerminal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MoveRightAsTerminal).call(this));
    _this.name = 'MoveRightAsTerminal';
    _this.shortcuts = ['Shift + →'];
    return _this;
  }

  _createClass(MoveRightAsTerminal, [{
    key: "exec",
    value: function exec(aqua, event) {
      aqua.cursorMgr.traverse(function (cursor) {
        if (cursor.selection.isCollapsed()) {
          cursor.selection.base = cursor.coord;
        }

        aqua.actionMgr.execWithName('MoveRight', 'moveRight', cursor);
        cursor.selection.terminal = cursor.coord;
      });
    }
  }]);

  return MoveRightAsTerminal;
}(Action);

module.exports = MoveRightAsTerminal;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/MoveRightBlock.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var MoveRightBlock =
/*#__PURE__*/
function (_Action) {
  _inherits(MoveRightBlock, _Action);

  function MoveRightBlock() {
    var _this;

    _classCallCheck(this, MoveRightBlock);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MoveRightBlock).call(this));
    _this.name = 'MoveRightBlock';
    _this.shortcuts = ['Ctrl + →'];
    return _this;
  }

  _createClass(MoveRightBlock, [{
    key: "exec",
    value: function exec(aqua, event) {
      var _this2 = this;

      aqua.cursorMgr.traverse(function (cursor) {
        _this2.moveToRightBlock(aqua, cursor, true);
      });
    }
  }, {
    key: "moveToRightBlock",
    value: function moveToRightBlock(aqua, cursor) {
      var clearSelection = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (clearSelection) {
        if (!cursor.selection.isCollapsed()) {
          cursor.resetSelection();
          return;
        }
      }

      aqua.actionMgr.execWithName('MoveRight', 'moveRight', cursor);
      var rightBorder = this.getRightBlockBorder(aqua, cursor);

      if (cursor.x === rightBorder) {
        return;
      }

      cursor.x = rightBorder;
    }
  }, {
    key: "getRightBlockBorder",
    value: function getRightBlockBorder(aqua, cursor) {
      var line = aqua.lineMgr.extendLine(cursor.y);
      var block = line.getCurrentBlock(cursor.x);
      return block.rightBorder;
    }
  }]);

  return MoveRightBlock;
}(Action);

module.exports = MoveRightBlock;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/MoveRightBlockAsTerminal.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var MoveRightBlockAsTerminal =
/*#__PURE__*/
function (_Action) {
  _inherits(MoveRightBlockAsTerminal, _Action);

  function MoveRightBlockAsTerminal() {
    var _this;

    _classCallCheck(this, MoveRightBlockAsTerminal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MoveRightBlockAsTerminal).call(this));
    _this.name = 'MoveRightBlockAsTerminal';
    _this.shortcuts = ['Shift + Ctrl + →'];
    return _this;
  }

  _createClass(MoveRightBlockAsTerminal, [{
    key: "exec",
    value: function exec(aqua, event) {
      aqua.cursorMgr.traverse(function (cursor) {
        if (cursor.selection.isCollapsed()) {
          cursor.selection.base = cursor.coord;
        }

        aqua.actionMgr.execWithName('MoveRightBlock', 'moveToRightBlock', cursor);
        cursor.selection.terminal = cursor.coord;
      });
    }
  }]);

  return MoveRightBlockAsTerminal;
}(Action);

module.exports = MoveRightBlockAsTerminal;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/MoveUp.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var MoveUp =
/*#__PURE__*/
function (_Action) {
  _inherits(MoveUp, _Action);

  function MoveUp() {
    var _this;

    _classCallCheck(this, MoveUp);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MoveUp).call(this));
    _this.name = 'MoveUp';
    _this.shortcuts = ['↑'];
    return _this;
  }

  _createClass(MoveUp, [{
    key: "exec",
    value: function exec(aqua, event) {
      var _this2 = this;

      aqua.cursorMgr.traverse(function (cursor) {
        _this2.moveUp(aqua, cursor, true);
      });
    }
  }, {
    key: "moveUp",
    value: function moveUp(aqua, cursor) {
      var clearSelection = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (clearSelection) {
        cursor.resetSelection();
      }

      var coord = this.getMoveUpCoord(aqua, cursor.coord);

      if (cursor.coord === coord) {
        return;
      }

      if (cursor.y === coord.y) {
        if (coord.insideY !== null) {
          cursor.insideY = coord.insideY;
        } else if (coord.x !== null) {
          cursor.x = coord.x;
        }

        return;
      }

      cursor.y = coord.y;
      cursor.insideY = cursor.maxInsideY;
    }
  }, {
    key: "getMoveUpCoord",
    value: function getMoveUpCoord(aqua, coord) {
      var yMinus = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var insideYMinus = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      if (coord.y === 0) {
        if (coord.x === 0) {
          return coord;
        }

        return {
          y: coord.y,
          x: 0,
          insideY: null
        };
      }

      if (coord.insideY > 0) {
        return {
          y: coord.y,
          x: null,
          insideY: coord.insideY - 1
        };
      } else {
        return {
          y: coord.y - 1,
          x: null,
          insideY: null // 由于需要获取 coord.y - 1 在被 cursor 设置后的 insideY, 所以这里只能返回 null

        };
      }
    }
  }]);

  return MoveUp;
}(Action);

module.exports = MoveUp;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/MoveUpAsTerminal.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var MoveUpAsTerminal =
/*#__PURE__*/
function (_Action) {
  _inherits(MoveUpAsTerminal, _Action);

  function MoveUpAsTerminal() {
    var _this;

    _classCallCheck(this, MoveUpAsTerminal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MoveUpAsTerminal).call(this));
    _this.name = 'MoveUpAsTerminal';
    _this.shortcuts = ['Shift + ↑'];
    return _this;
  }

  _createClass(MoveUpAsTerminal, [{
    key: "exec",
    value: function exec(aqua, event) {
      var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      aqua.cursorMgr.traverse(function (cursor) {
        if (cursor.selection.isCollapsed()) {
          cursor.selection.base = cursor.coord;
        }

        aqua.actionMgr.execWithName('MoveUp', 'moveUp', cursor);
        cursor.selection.terminal = cursor.coord;
      });
    }
  }]);

  return MoveUpAsTerminal;
}(Action);

module.exports = MoveUpAsTerminal;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/PageDown.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var PageDown =
/*#__PURE__*/
function (_Action) {
  _inherits(PageDown, _Action);

  function PageDown() {
    var _this;

    _classCallCheck(this, PageDown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PageDown).call(this));
    _this.name = 'PageDown';
    _this.shortcuts = ['PageDown'];
    return _this;
  }

  _createClass(PageDown, [{
    key: "exec",
    value: function exec(aqua, event) {
      var lineHeight = aqua.korwa.getSingleLineHeight();
      aqua.do(function (cursor) {
        cursor.$y = cursor.$y + aqua.viewport.height - lineHeight;
        cursor.$x = cursor.$x;
      });
    }
  }, {
    key: "update",
    value: function update(aqua, cursor, lineHeight) {
      cursor.$y = cursor.$y + aqua.viewport.height - lineHeight;
      cursor.$x = cursor.$x;
    }
  }]);

  return PageDown;
}(Action);

module.exports = PageDown;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/PageUp.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var PageUp =
/*#__PURE__*/
function (_Action) {
  _inherits(PageUp, _Action);

  function PageUp() {
    var _this;

    _classCallCheck(this, PageUp);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PageUp).call(this));
    _this.name = 'PageUp';
    _this.shortcuts = ['PageUp'];
    return _this;
  }

  _createClass(PageUp, [{
    key: "exec",
    value: function exec(aqua, event) {
      var lineHeight = aqua.korwa.getSingleLineHeight();
      aqua.do(function (cursor) {
        cursor.$y = cursor.$y - aqua.viewport.height + lineHeight;
        cursor.$x = cursor.$x;
      }, {
        acc: false
      });
    }
  }]);

  return PageUp;
}(Action);

module.exports = PageUp;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/RightMousedown.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var _require2 = require('../enums/index'),
    HTMLVariables = _require2.HTMLVariables,
    ActionEventType = _require2.ActionEventType;

var RightMousedown =
/*#__PURE__*/
function (_Action) {
  _inherits(RightMousedown, _Action);

  function RightMousedown() {
    var _this;

    _classCallCheck(this, RightMousedown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RightMousedown).call(this));
    _this.name = 'RightMousedown';
    _this.shortcuts = ['RightMousedown'];
    _this.eventType = ActionEventType.Mouse;
    _this.record = false;
    return _this;
  }

  _createClass(RightMousedown, [{
    key: "exec",
    value: function exec(aqua, event) {
      if (event.target.getAttribute(HTMLVariables.DisableMouseEvent)) {
        return;
      }

      console.log('OpenMenu');
    }
  }]);

  return RightMousedown;
}(Action);

module.exports = RightMousedown;
},{"../interfaces/index":"../aQua/src/interfaces/index.js","../enums/index":"../aQua/src/enums/index.js"}],"../aQua/src/actions/SelectAll.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var SelectAll =
/*#__PURE__*/
function (_Action) {
  _inherits(SelectAll, _Action);

  function SelectAll() {
    var _this;

    _classCallCheck(this, SelectAll);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SelectAll).call(this));
    _this.name = 'SelectAll';
    _this.shortcuts = ['Ctrl + A'];
    return _this;
  }

  _createClass(SelectAll, [{
    key: "exec",
    value: function exec(aqua, event) {
      aqua.cursorMgr.removeAll();
      aqua.cursorMgr.traverse(function (cursor) {
        cursor.y = 0;
        cursor.x = 0;
        cursor.selection.base = cursor.coord;
        cursor.y = Infinity;
        cursor.x = Infinity;
        cursor.selection.terminal = cursor.coord;
      }, {
        track: false
      });
    }
  }]);

  return SelectAll;
}(Action);

module.exports = SelectAll;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/ToDocFirst.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var ToDocFirst =
/*#__PURE__*/
function (_Action) {
  _inherits(ToDocFirst, _Action);

  function ToDocFirst() {
    var _this;

    _classCallCheck(this, ToDocFirst);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ToDocFirst).call(this));
    _this.name = 'ToDocFirst';
    _this.shortcuts = ['Ctrl + Home'];
    return _this;
  }

  _createClass(ToDocFirst, [{
    key: "exec",
    value: function exec(aqua, event) {
      var _this2 = this;

      aqua.cursorMgr.traverse(function (cursor) {
        if (!cursor.selection.isCollapsed()) {
          cursor.resetSelection();
        }

        _this2.update(aqua, cursor);
      });
    }
  }, {
    key: "update",
    value: function update(aqua, cursor) {
      cursor.y = 0;
      cursor.x = 0;
    }
  }]);

  return ToDocFirst;
}(Action);

module.exports = ToDocFirst;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/ToDocFirstAsTerminal.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var ToDocFirstAsTerminal =
/*#__PURE__*/
function (_Action) {
  _inherits(ToDocFirstAsTerminal, _Action);

  function ToDocFirstAsTerminal() {
    var _this;

    _classCallCheck(this, ToDocFirstAsTerminal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ToDocFirstAsTerminal).call(this));
    _this.name = 'ToDocFirstAsTerminal';
    _this.shortcuts = ['Shift + Ctrl + Home'];
    return _this;
  }

  _createClass(ToDocFirstAsTerminal, [{
    key: "exec",
    value: function exec(aqua, event) {
      var _this2 = this;

      aqua.cursorMgr.traverse(function (cursor) {
        _this2.update(aqua, cursor);
      });
    }
  }, {
    key: "update",
    value: function update(aqua, cursor) {
      if (cursor.selection.isCollapsed()) {
        cursor.selection.base = cursor.coord;
      }

      aqua.actionMgr.execWithName('ToDocFirst', 'update', cursor);
      cursor.selection.terminal = cursor.coord;
    }
  }]);

  return ToDocFirstAsTerminal;
}(Action);

module.exports = ToDocFirstAsTerminal;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/ToDocLast.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var ToDocLast =
/*#__PURE__*/
function (_Action) {
  _inherits(ToDocLast, _Action);

  function ToDocLast() {
    var _this;

    _classCallCheck(this, ToDocLast);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ToDocLast).call(this));
    _this.name = 'ToDocLast';
    _this.shortcuts = ['Ctrl + End'];
    return _this;
  }

  _createClass(ToDocLast, [{
    key: "exec",
    value: function exec(aqua, event) {
      var _this2 = this;

      aqua.cursorMgr.traverse(function (cursor) {
        if (!cursor.selection.isCollapsed()) {
          cursor.resetSelection();
        }

        _this2.update(aqua, cursor);
      });
    }
  }, {
    key: "update",
    value: function update(aqua, cursor) {
      cursor.y = Infinity;
      cursor.x = Infinity;
    }
  }]);

  return ToDocLast;
}(Action);

module.exports = ToDocLast;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/ToDocLastAsTerminal.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var ToDocLastAsTerminal =
/*#__PURE__*/
function (_Action) {
  _inherits(ToDocLastAsTerminal, _Action);

  function ToDocLastAsTerminal() {
    var _this;

    _classCallCheck(this, ToDocLastAsTerminal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ToDocLastAsTerminal).call(this));
    _this.name = 'ToDocLastAsTerminal';
    _this.shortcuts = ['Shift + Ctrl + End'];
    return _this;
  }

  _createClass(ToDocLastAsTerminal, [{
    key: "exec",
    value: function exec(aqua, event) {
      aqua.cursorMgr.traverse(function (cursor) {
        if (cursor.selection.isCollapsed()) {
          cursor.selection.base = cursor.coord;
        }

        aqua.actionMgr.execWithName('ToDocLast', 'update', cursor);
        cursor.selection.terminal = cursor.coord;
      });
    }
  }]);

  return ToDocLastAsTerminal;
}(Action);

module.exports = ToDocLastAsTerminal;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/ToEnd.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var ToEnd =
/*#__PURE__*/
function (_Action) {
  _inherits(ToEnd, _Action);

  function ToEnd() {
    var _this;

    _classCallCheck(this, ToEnd);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ToEnd).call(this));
    _this.name = 'ToEnd';
    _this.shortcuts = ['End'];
    return _this;
  }

  _createClass(ToEnd, [{
    key: "exec",
    value: function exec(aqua, event) {
      var _this2 = this;

      var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      aqua.cursorMgr.traverse(function (cursor) {
        if (!cursor.selection.isCollapsed()) {
          cursor.resetSelection();
        }

        _this2.update(aqua, cursor);
      });
    }
  }, {
    key: "update",
    value: function update(aqua, cursor) {
      cursor.x = Infinity;
    }
  }]);

  return ToEnd;
}(Action);

module.exports = ToEnd;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/ToEndAsTerminal.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var ToEndAsTerminal =
/*#__PURE__*/
function (_Action) {
  _inherits(ToEndAsTerminal, _Action);

  function ToEndAsTerminal() {
    var _this;

    _classCallCheck(this, ToEndAsTerminal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ToEndAsTerminal).call(this));
    _this.name = 'ToEndAsTerminal';
    _this.shortcuts = ['Shift + End'];
    return _this;
  }

  _createClass(ToEndAsTerminal, [{
    key: "exec",
    value: function exec(aqua, event) {
      var _this2 = this;

      aqua.cursorMgr.traverse(function (cursor) {
        _this2.update(aqua, cursor);
      });
    }
  }, {
    key: "update",
    value: function update(aqua, cursor) {
      if (cursor.selection.isCollapsed()) {
        cursor.selection.base = cursor.coord;
      }

      aqua.actionMgr.execWithName('ToEnd', 'update', cursor);
      cursor.selection.terminal = cursor.coord;
    }
  }]);

  return ToEndAsTerminal;
}(Action);

module.exports = ToEndAsTerminal;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/ToStart.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var ToStart =
/*#__PURE__*/
function (_Action) {
  _inherits(ToStart, _Action);

  function ToStart() {
    var _this;

    _classCallCheck(this, ToStart);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ToStart).call(this));
    _this.name = 'ToStart';
    _this.shortcuts = ['Home'];
    return _this;
  }

  _createClass(ToStart, [{
    key: "exec",
    value: function exec(aqua, event) {
      var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var fn = function fn(cursor) {
        var clearSelection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (clearSelection) {
          cursor.selection.reset();
        }

        cursor.x = 0;
      };

      if (state.cursor) {
        fn(state.cursor, false);
        return;
      }

      aqua.cursorMgr.traverse(fn, {
        acc: false
      });
    }
  }]);

  return ToStart;
}(Action);

module.exports = ToStart;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/ToStartAsTerminal.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var ToStartAsTerminal =
/*#__PURE__*/
function (_Action) {
  _inherits(ToStartAsTerminal, _Action);

  function ToStartAsTerminal() {
    var _this;

    _classCallCheck(this, ToStartAsTerminal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ToStartAsTerminal).call(this));
    _this.name = 'ToStartAsTerminal';
    _this.shortcuts = ['Shift + Home'];
    return _this;
  }

  _createClass(ToStartAsTerminal, [{
    key: "exec",
    value: function exec(aqua, event) {
      aqua.cursorMgr.traverse(function (cursor) {
        if (cursor.selection.isCollapsed()) {
          cursor.selection.base = cursor.coord;
        }

        aqua.actionMgr.exec('ToStart', event, {
          cursor: cursor
        });
        cursor.selection.terminal = cursor.coord;
      }, {
        acc: false
      });
    }
  }]);

  return ToStartAsTerminal;
}(Action);

module.exports = ToStartAsTerminal;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/Redo.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var Redo =
/*#__PURE__*/
function (_Action) {
  _inherits(Redo, _Action);

  function Redo() {
    var _this;

    _classCallCheck(this, Redo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Redo).call(this));
    _this.name = 'Redo';
    _this.shortcuts = ['Ctrl + Y'];
    _this.record = false;
    return _this;
  }

  _createClass(Redo, [{
    key: "exec",
    value: function exec(aqua, event) {
      var _this2 = this;

      event.preventDefault();
      aqua.chronicle.forward(function (macro) {
        if (!macro) {
          return;
        }

        _this2.redo(aqua, macro);
      });
    }
  }, {
    key: "redo",
    value: function redo(aqua, macro) {
      var micros = macro.micros;

      for (var i = 0; i < micros.length; i++) {
        var _micros$i$record = micros[i].record,
            source = _micros$i$record.source,
            start = _micros$i$record.start,
            end = _micros$i$record.end,
            contents = _micros$i$record.contents;

        if (source === 'write') {
          aqua.docMgr.write(contents, start, {
            track: false
          });
          continue;
        }

        if (source === 'delete') {
          aqua.docMgr.delete(start, end, {
            track: false
          });
          continue;
        }
      }

      aqua.cursorMgr.rebuild(macro.after);
    }
  }]);

  return Redo;
}(Action);

module.exports = Redo;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/Undo.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Action = _require.Action;

var Undo =
/*#__PURE__*/
function (_Action) {
  _inherits(Undo, _Action);

  function Undo() {
    var _this;

    _classCallCheck(this, Undo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Undo).call(this));
    _this.name = 'Undo';
    _this.shortcuts = ['Ctrl + Z'];
    _this.record = false;
    return _this;
  }

  _createClass(Undo, [{
    key: "exec",
    value: function exec(aqua, event) {
      var _this2 = this;

      event.preventDefault();
      aqua.chronicle.back(function (macro) {
        if (!macro) {
          return;
        }

        _this2.undo(aqua, macro);
      });
    }
  }, {
    key: "undo",
    value: function undo(aqua, macro) {
      var micros = macro.micros;

      for (var i = micros.length - 1; i >= 0; i--) {
        var _micros$i$record = micros[i].record,
            source = _micros$i$record.source,
            start = _micros$i$record.start,
            end = _micros$i$record.end,
            contents = _micros$i$record.contents;

        if (source === 'write') {
          aqua.docMgr.delete(start, end, {
            track: false
          });
          continue;
        }

        if (source === 'delete') {
          aqua.docMgr.write(contents, start, {
            track: false
          });
          continue;
        }
      }

      aqua.cursorMgr.rebuild(macro.before);
    }
  }]);

  return Undo;
}(Action);

module.exports = Undo;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/actions/index.js":[function(require,module,exports) {
var Backspace = require('./Backspace');

var Copy = require('./Copy');

var Cut = require('./Cut');

var Paste = require('./Paste');

var Quote = require('./Quote');

var CtrlBackspace = require('./CtrlBackspace');

var CtrlDelete = require('./CtrlDelete');

var CtrlEnter = require('./CtrlEnter');

var Delete = require('./Delete');

var Enter = require('./Enter');

var Input = require('./Input');

var Tab = require('./Tab');

var ShiftTab = require('./ShiftTab');

var LeftMousedown = require('./LeftMousedown');

var LeftMousemove = require('./LeftMousemove');

var LeftMouseup = require('./LeftMouseup');

var CreateCursor = require('./CreateCursor');

var CtrlLeftMousemove = require('./CtrlLeftMousemove');

var CtrlLeftMouseup = require('./CtrlLeftMouseup');

var MoveDown = require('./MoveDown');

var MoveDownAsTerminal = require('./MoveDownAsTerminal');

var MoveLeft = require('./MoveLeft');

var MoveLeftAsTerminal = require('./MoveLeftAsTerminal');

var MoveLeftBlock = require('./MoveLeftBlock');

var MoveLeftBlockAsTerminal = require('./MoveLeftBlockAsTerminal');

var MoveRight = require('./MoveRight');

var MoveRightAsTerminal = require('./MoveRightAsTerminal');

var MoveRightBlock = require('./MoveRightBlock');

var MoveRightBlockAsTerminal = require('./MoveRightBlockAsTerminal');

var MoveUp = require('./MoveUp');

var MoveUpAsTerminal = require('./MoveUpAsTerminal');

var PageDown = require('./PageDown');

var PageUp = require('./PageUp');

var RightMousedown = require('./RightMousedown');

var SelectAll = require('./SelectAll');

var ToDocFirst = require('./ToDocFirst');

var ToDocFirstAsTerminal = require('./ToDocFirstAsTerminal');

var ToDocLast = require('./ToDocLast');

var ToDocLastAsTerminal = require('./ToDocLastAsTerminal');

var ToEnd = require('./ToEnd');

var ToEndAsTerminal = require('./ToEndAsTerminal');

var ToStart = require('./ToStart');

var ToStartAsTerminal = require('./ToStartAsTerminal');

var Redo = require('./Redo');

var Undo = require('./Undo');

module.exports = {
  Backspace: Backspace,
  Copy: Copy,
  Cut: Cut,
  Paste: Paste,
  Quote: Quote,
  CtrlBackspace: CtrlBackspace,
  CtrlDelete: CtrlDelete,
  CtrlEnter: CtrlEnter,
  Delete: Delete,
  Enter: Enter,
  Input: Input,
  Tab: Tab,
  ShiftTab: ShiftTab,
  LeftMousedown: LeftMousedown,
  LeftMousemove: LeftMousemove,
  LeftMouseup: LeftMouseup,
  CreateCursor: CreateCursor,
  CtrlLeftMousemove: CtrlLeftMousemove,
  CtrlLeftMouseup: CtrlLeftMouseup,
  MoveDown: MoveDown,
  MoveDownAsTerminal: MoveDownAsTerminal,
  MoveLeft: MoveLeft,
  MoveLeftAsTerminal: MoveLeftAsTerminal,
  MoveLeftBlock: MoveLeftBlock,
  MoveLeftBlockAsTerminal: MoveLeftBlockAsTerminal,
  MoveRight: MoveRight,
  MoveRightAsTerminal: MoveRightAsTerminal,
  MoveRightBlock: MoveRightBlock,
  MoveRightBlockAsTerminal: MoveRightBlockAsTerminal,
  MoveUp: MoveUp,
  MoveUpAsTerminal: MoveUpAsTerminal,
  PageDown: PageDown,
  PageUp: PageUp,
  RightMousedown: RightMousedown,
  SelectAll: SelectAll,
  ToDocFirst: ToDocFirst,
  ToDocFirstAsTerminal: ToDocFirstAsTerminal,
  ToDocLast: ToDocLast,
  ToDocLastAsTerminal: ToDocLastAsTerminal,
  ToEnd: ToEnd,
  ToEndAsTerminal: ToEndAsTerminal,
  ToStart: ToStart,
  ToStartAsTerminal: ToStartAsTerminal,
  Redo: Redo,
  Undo: Undo
};
},{"./Backspace":"../aQua/src/actions/Backspace.js","./Copy":"../aQua/src/actions/Copy.js","./Cut":"../aQua/src/actions/Cut.js","./Paste":"../aQua/src/actions/Paste.js","./Quote":"../aQua/src/actions/Quote.js","./CtrlBackspace":"../aQua/src/actions/CtrlBackspace.js","./CtrlDelete":"../aQua/src/actions/CtrlDelete.js","./CtrlEnter":"../aQua/src/actions/CtrlEnter.js","./Delete":"../aQua/src/actions/Delete.js","./Enter":"../aQua/src/actions/Enter.js","./Input":"../aQua/src/actions/Input.js","./Tab":"../aQua/src/actions/Tab.js","./ShiftTab":"../aQua/src/actions/ShiftTab.js","./LeftMousedown":"../aQua/src/actions/LeftMousedown.js","./LeftMousemove":"../aQua/src/actions/LeftMousemove.js","./LeftMouseup":"../aQua/src/actions/LeftMouseup.js","./CreateCursor":"../aQua/src/actions/CreateCursor.js","./CtrlLeftMousemove":"../aQua/src/actions/CtrlLeftMousemove.js","./CtrlLeftMouseup":"../aQua/src/actions/CtrlLeftMouseup.js","./MoveDown":"../aQua/src/actions/MoveDown.js","./MoveDownAsTerminal":"../aQua/src/actions/MoveDownAsTerminal.js","./MoveLeft":"../aQua/src/actions/MoveLeft.js","./MoveLeftAsTerminal":"../aQua/src/actions/MoveLeftAsTerminal.js","./MoveLeftBlock":"../aQua/src/actions/MoveLeftBlock.js","./MoveLeftBlockAsTerminal":"../aQua/src/actions/MoveLeftBlockAsTerminal.js","./MoveRight":"../aQua/src/actions/MoveRight.js","./MoveRightAsTerminal":"../aQua/src/actions/MoveRightAsTerminal.js","./MoveRightBlock":"../aQua/src/actions/MoveRightBlock.js","./MoveRightBlockAsTerminal":"../aQua/src/actions/MoveRightBlockAsTerminal.js","./MoveUp":"../aQua/src/actions/MoveUp.js","./MoveUpAsTerminal":"../aQua/src/actions/MoveUpAsTerminal.js","./PageDown":"../aQua/src/actions/PageDown.js","./PageUp":"../aQua/src/actions/PageUp.js","./RightMousedown":"../aQua/src/actions/RightMousedown.js","./SelectAll":"../aQua/src/actions/SelectAll.js","./ToDocFirst":"../aQua/src/actions/ToDocFirst.js","./ToDocFirstAsTerminal":"../aQua/src/actions/ToDocFirstAsTerminal.js","./ToDocLast":"../aQua/src/actions/ToDocLast.js","./ToDocLastAsTerminal":"../aQua/src/actions/ToDocLastAsTerminal.js","./ToEnd":"../aQua/src/actions/ToEnd.js","./ToEndAsTerminal":"../aQua/src/actions/ToEndAsTerminal.js","./ToStart":"../aQua/src/actions/ToStart.js","./ToStartAsTerminal":"../aQua/src/actions/ToStartAsTerminal.js","./Redo":"../aQua/src/actions/Redo.js","./Undo":"../aQua/src/actions/Undo.js"}],"../aQua/src/ui/index.js":[function(require,module,exports) {
var _require = require('../utils/index'),
    DOM = _require.DOM;

module.exports = {
  /* Host */
  aqua: function aqua() {
    return DOM.e('div', {
      'class': 'aqua theme-aqua'
    });
  },

  /* Editor */
  editor: function editor() {
    return DOM.e('div', {
      'class': 'aqua-editor'
    });
  },

  /* Viewport */
  viewport: function viewport() {
    return DOM.e('div', {
      'class': 'aqua-viewport'
    });
  },
  scroller: function scroller() {
    return DOM.e('div', {
      'class': 'aqua-scroller'
    });
  },

  /* Components Container */
  components: function components() {
    return DOM.e('div', {
      'class': 'aqua-components aqua-variables'
    });
  },
  fullWidthCntr: function fullWidthCntr() {
    return DOM.e('div', {
      'class': 'full-width-container'
    });
  },
  lineWidthCntr: function lineWidthCntr() {
    return DOM.e('div', {
      'class': 'line-width-container'
    });
  },

  /* Fixed */
  fixed: function fixed() {
    return DOM.e('div', {
      'class': 'aqua-fixed'
    });
  },
  sideBarCntr: function sideBarCntr() {
    return DOM.e('div', {
      'class': 'side-bar-container'
    });
  },
  minimap: function minimap() {
    return DOM.e('div', {
      'class': 'aqua-minimap'
    });
  },
  scrollBar: function scrollBar() {
    return DOM.e('div', {
      'class': 'aqua-scroll-bar'
    }, [DOM.e('div', {
      'class': 'aqua-slider'
    })]);
  },

  /* Measurers */
  measurerCntr: function measurerCntr() {
    return DOM.e('div', {
      'class': 'measurer-container'
    });
  },
  ramMeasurer: function ramMeasurer() {
    return DOM.e('div', {
      'class': 'ram-measurer'
    });
  },
  lineMeasurer: function lineMeasurer() {
    return DOM.e('div', {
      'class': 'line-measurer'
    });
  },
  remMeasurer: function remMeasurer() {
    return DOM.e('div', {
      'class': 'rem-measurer'
    });
  },

  /* Container in Components Container */
  inputerCntr: function inputerCntr() {
    return DOM.e('div', {
      'class': 'inputer-container'
    });
  },
  cursorCntr: function cursorCntr() {
    return DOM.e('div', {
      'class': 'cursor-container'
    });
  },
  selectedLineCntr: function selectedLineCntr() {
    return DOM.e('div', {
      'class': 'selected-line-container'
    });
  },
  selectionCntr: function selectionCntr() {
    return DOM.e('div', {
      'class': 'selection-container'
    });
  },
  lineCntr: function lineCntr() {
    return DOM.e('div', {
      'class': 'line-container'
    });
  },

  /* Bg & Fg Container */
  bgCntr: function bgCntr() {
    return DOM.e('div', {
      'class': 'aqua-bg'
    });
  },
  fgCntr: function fgCntr() {
    return DOM.e('div', {
      'class': 'aqua-fg'
    });
  },

  /* Vital Components Children */
  inputerLocator: function inputerLocator() {
    return DOM.e('div', {
      'class': 'inputer-locator'
    });
  },
  inputer: function inputer() {
    return DOM.e('textarea', {
      'class': 'inputer',
      'autocomplete': 'off',
      // 关闭自动补全提示, 防止出戏 (笑
      'autocapitalize': 'off',
      // 关闭首字母大写, 用于移动端
      'autocorrect': 'off',
      // 自动纠正
      'tabindex': '0',
      // 默认
      'wrap': 'off' // 关闭换行, 非标准内容, 所以在 css 还会冗余处理一次

    });
  }
};
},{"../utils/index":"../aQua/src/utils/index.js"}],"../aQua/src/modes/Text.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Mode = _require.Mode;

function sendToken(tokens, token) {
  tokens.push(token);
}

var Syntax = {
  text: {
    '<': function _(next, token, tokens, modes, i) {
      if (token.length !== 0) {
        sendToken(tokens, {
          type: 'word',
          value: token
        });
      }

      sendToken(tokens, {
        type: 'mark',
        value: '<'
      });
    },
    '+': function _(next, token, tokens, modes, i) {
      if (token.length !== 0) {
        sendToken(tokens, {
          type: 'word',
          value: token
        });
      }

      sendToken(tokens, {
        type: 'plus',
        value: '+'
      });
    },
    '　': function _(next, token, tokens, modes, i) {
      if (token.length !== 0) {
        sendToken(tokens, {
          type: 'word',
          value: token
        });
      }

      modes.push('whitespace');
      return {
        token: next
      };
    },
    ' ': function _(next, token, tokens, modes, i) {
      if (token.length !== 0) {
        sendToken(tokens, {
          type: 'word',
          value: token
        });
      }

      modes.push('whitespace');
      return {
        token: next
      };
    },
    '\n': function _(next, token, tokens, modes, i) {
      if (token.length !== 0) {
        sendToken(tokens, {
          type: 'word',
          value: token
        });
      }

      sendToken(tokens, {
        type: 'newline',
        value: '\n'
      });
    },
    default: function _default(next, token, tokens, modes, i) {
      if (next === undefined) {
        sendToken(tokens, {
          type: 'word',
          value: token
        });
      } else {
        token = token + next;
      }

      return {
        token: token
      };
    }
  },
  whitespace: {
    ' ': function _(next, token, tokens, modes, i) {
      return {
        type: 'whitespace',
        token: token + next
      };
    },
    '　': function _(next, token, tokens, modes, i) {
      return {
        type: 'whitespace',
        token: token + next
      };
    },
    default: function _default(next, token, tokens, modes, i) {
      modes.pop();
      sendToken(tokens, {
        type: null,
        value: token
      });
      return {
        i: i - 1
      };
    }
  }
};

var Text =
/*#__PURE__*/
function (_Mode) {
  _inherits(Text, _Mode);

  function Text() {
    var _this;

    _classCallCheck(this, Text);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Text).call(this));
    _this.name = ['text', 'txt'];
    return _this;
  }

  _createClass(Text, [{
    key: "tokenize",
    value: function tokenize(raw) {
      var tokens = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      return raw.split('').map(function (char) {
        return {
          type: 'word',
          value: char
        };
      });
      var len = raw.length;
      var modes = ['text'];
      var token = '';

      for (var i = 0; i < len + 1; i++) {
        var current = raw[i];
        var mode = Syntax[modes[modes.length - 1]];
        var matched = mode[current];

        if (!matched) {
          var _feedback = mode.default(current, token, tokens, modes, i) || {};

          i = _feedback.i || i;
          token = _feedback.token || '';
          continue;
        }

        var feedback = matched(current, token, tokens, modes, i) || {};
        i = feedback.i || i;
        token = feedback.token || '';
      }

      console.log(tokens);
      return tokens;
    }
  }]);

  return Text;
}(Mode);

module.exports = Text;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/modes/JavaScript.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Mode = _require.Mode; // const esprima = require('esprima')


function genWhitespace() {
  var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var whitespace = '';

  while (num--) {
    whitespace = whitespace + ' ';
  }

  return whitespace;
}

var JavaScript =
/*#__PURE__*/
function (_Mode) {
  _inherits(JavaScript, _Mode);

  function JavaScript() {
    var _this;

    _classCallCheck(this, JavaScript);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(JavaScript).call(this));
    _this.name = ['javascript', 'js'];
    return _this;
  }

  _createClass(JavaScript, [{
    key: "tokenize",
    value: function tokenize(code) {
      // const tokens = esprima.tokenize(code, {
      //     tolerant: true,
      //     comment: true,
      //     range: true,
      // })
      // let start = 0
      // const result = []
      // tokens.forEach(token => {
      //     console.log('token', token)
      //     const whitespaceCount = token.range[0] - start
      //     if (whitespaceCount > 0) {
      //         result.push({
      //             type: null,
      //             value: genWhitespace(whitespaceCount),
      //         })
      //     }
      //     result.push(token)
      //     start = token.range[1]
      // })
      // const whitespaceCount = code.length - start
      // if (whitespaceCount > 0) {
      //     result.push({
      //         type: null,
      //         value: genWhitespace(whitespaceCount),
      //     })
      // }
      // return result
      return [{
        type: 'Temp',
        value: code
      }];
    }
  }]);

  return JavaScript;
}(Mode);

module.exports = JavaScript;
},{"../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/modes/index.js":[function(require,module,exports) {
var Text = require('./Text');

var JavaScript = require('./JavaScript');

module.exports = {
  Text: new Text(),
  JavaScript: new JavaScript()
};
},{"./Text":"../aQua/src/modes/Text.js","./JavaScript":"../aQua/src/modes/JavaScript.js"}],"../aQua/src/processors/CodeProcessor.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Processor = _require.Processor;

var _require2 = require('../utils/index'),
    DOM = _require2.DOM;

var modes = require('../modes/index');

var Colorful = {
  'Aqua': 'aqua'
};

var CodeProcessor =
/*#__PURE__*/
function (_Processor) {
  _inherits(CodeProcessor, _Processor);

  function CodeProcessor(docWatcher, lineMgr) {
    var _this;

    _classCallCheck(this, CodeProcessor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CodeProcessor).call(this, 'Code'));
    _this.docWatcher = docWatcher;
    _this.lineMgr = lineMgr;

    _this.loadModes(modes);

    return _this;
  }

  _createClass(CodeProcessor, [{
    key: "onCreated",
    value: function onCreated() {
      this.aim('string');
      this.aim('StringAsset');
    }
  }, {
    key: "tokenize",
    value: function tokenize(data, type) {
      var mode = this.getMode(type);
      return mode.tokenize(data);
    }
  }, {
    key: "toElement",
    value: function toElement(token) {
      var type = token.type,
          value = token.value;
      var dye = Colorful[value] || type;
      return type !== null ? DOM.e('span', {
        'class': 'aqua-block-' + dye
      }, [DOM.t(value)]) : DOM.t(value);
    }
  }, {
    key: "toElementsAndMount",
    value: function toElementsAndMount(tokens, $root) {
      var len = tokens.length;

      for (var i = 0; i < len; i++) {
        var $child = this.toElement(tokens[i]);
        DOM.appendChild($root, $child);
      }
    }
  }, {
    key: "loadModes",
    value: function loadModes(modes) {
      this.modes = Object.create(null);

      for (var name in modes) {
        this.loadMode(modes[name]);
      }
    }
  }, {
    key: "getMode",
    value: function getMode(type) {
      return this.modes[type];
    }
  }, {
    key: "loadMode",
    value: function loadMode(mode) {
      var modes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.modes;
      var names = typeof mode.name === 'string' ? [mode.name] : mode.name;

      for (var i = 0; i < names.length; i++) {
        var name = mode.caseSensitive ? names[i] : names[i].toLowerCase();
        modes[name] = mode;
      }
    }
  }]);

  return CodeProcessor;
}(Processor);

module.exports = CodeProcessor;
},{"../interfaces/index":"../aQua/src/interfaces/index.js","../utils/index":"../aQua/src/utils/index.js","../modes/index":"../aQua/src/modes/index.js"}],"../aQua/src/processors/ImageProcessor.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../interfaces/index'),
    Processor = _require.Processor;

var _require2 = require('../utils/index'),
    DOM = _require2.DOM;

var _require3 = require('../enums/index'),
    LineStatus = _require3.LineStatus;

var ImageProcessor =
/*#__PURE__*/
function (_Processor) {
  _inherits(ImageProcessor, _Processor);

  function ImageProcessor(docWatcher, korwa) {
    var _this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, ImageProcessor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageProcessor).call(this, 'Image'));
    _this.docWatcher = docWatcher;
    _this.korwa = korwa;
    _this.cache = Object.create(null);
    /**
     * this.maxSize = ''
     * this.allowList = ['image/*']
     */

    return _this;
  }

  _createClass(ImageProcessor, [{
    key: "onCreated",
    value: function onCreated() {
      this.aim('ImageAsset');
    }
  }, {
    key: "tokenize",
    value: function tokenize(data, type) {
      return [{
        type: 'image',
        value: data.src
      }];
    }
  }, {
    key: "toElement",
    value: function toElement(token, line) {
      var _this2 = this;

      var type = token.type,
          value = token.value;

      if (this.cache[value]) {
        return this.cache[value];
      }

      var $img = new Image();
      this.cache[value] = $img;

      var cb = function cb() {
        if (!line.isAlive()) {
          return;
        }

        line.setStatus(LineStatus.UPDATED);

        _this2.docWatcher.emit('change', {
          effectLines: [line]
        });
      };

      $img.onload = cb;
      $img.onerror = cb;
      $img.src = value;
      $img.classList.add('aqua-block' + type);
      return $img;
    }
  }, {
    key: "toElementsAndMount",
    value: function toElementsAndMount(tokens, $root, line) {
      var len = tokens.length;

      for (var i = 0; i < len; i++) {
        var $child = this.toElement(tokens[i], line);
        DOM.appendChild($root, $child);
      }
    }
  }]);

  return ImageProcessor;
}(Processor);

module.exports = ImageProcessor;
},{"../interfaces/index":"../aQua/src/interfaces/index.js","../utils/index":"../aQua/src/utils/index.js","../enums/index":"../aQua/src/enums/index.js"}],"../aQua/src/processors/index.js":[function(require,module,exports) {
var CodeProcessor = require('./CodeProcessor');

var ImageProcessor = require('./ImageProcessor');

module.exports = {
  CodeProcessor: CodeProcessor,
  ImageProcessor: ImageProcessor
};
},{"./CodeProcessor":"../aQua/src/processors/CodeProcessor.js","./ImageProcessor":"../aQua/src/processors/ImageProcessor.js"}],"../aQua/src/marks/index.js":[function(require,module,exports) {
module.exports = {
  OverlayMark: {
    once: true,
    nextTick: true,
    effect: function effect() {
      return 'background-color: rgba(255, 133, 173, .5);';
    }
  }
};
},{}],"../aQua/src/plugins/AquaProgress/index.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../../utils/index'),
    DOM = _require.DOM,
    rAF = _require.rAF;

var _require2 = require('../../enums/index'),
    PluginType = _require2.PluginType,
    CSSVariables = _require2.CSSVariables;

var _require3 = require('../../interfaces/index'),
    Plugin = _require3.Plugin;

var AquaProgress =
/*#__PURE__*/
function (_Plugin) {
  _inherits(AquaProgress, _Plugin);

  function AquaProgress() {
    var _this;

    _classCallCheck(this, AquaProgress);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AquaProgress).call(this));
    _this.$loading = _this.$template();
    _this.$progress = _this.$loading.firstChild.firstChild;
    _this.name = 'AquaProgress';
    _this.type = PluginType.Buildin;
    return _this;
  }

  _createClass(AquaProgress, [{
    key: "install",
    value: function install(aqua) {
      var _this2 = this;

      var lifetimes = aqua.lifetimes;
      var progress = aqua.progress;
      lifetimes.on('setup', function () {
        DOM.appendChild(aqua.uiMgr.get('aqua'), _this2.$loading);
      });
      /* TODO */

      lifetimes.on('complete', function () {
        setTimeout(function () {
          _this2.$loading.remove();
        }, 500);
      });

      progress.onprogress = function (progress, max) {
        _this2.setProgress(progress / max * 100);
      };
    }
  }, {
    key: "$template",
    value: function $template() {
      return DOM.e('div', {
        'class': 'aqua-loading aqua-bg'
      }, [DOM.e('div', {
        'class': 'loading'
      }, [DOM.e('div', {
        'class': 'progress'
      })]), DOM.e('div', {
        'class': 'strut'
      })]);
    }
  }, {
    key: "setProgress",
    value: function setProgress(progress) {
      this.$progress.style.setProperty(CSSVariables.Progress, -100 + progress + '%');
    }
  }, {
    key: "release",
    value: function release() {
      this.$loading = null;
      this.$progress = null;
    }
  }]);

  return AquaProgress;
}(Plugin);

module.exports = AquaProgress;
},{"../../utils/index":"../aQua/src/utils/index.js","../../enums/index":"../aQua/src/enums/index.js","../../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/plugins/AquaSyntaxHint/DictionaryRenderer.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('../../utils/index'),
    rAF = _require.rAF,
    DOM = _require.DOM;

var DictionaryRenderer =
/*#__PURE__*/
function () {
  function DictionaryRenderer(aqua) {
    _classCallCheck(this, DictionaryRenderer);

    this.applyName = 'dictionary';
    this.aqua = aqua;
    this.cursors = aqua.cursorMgr;
    this.korwa = aqua.korwa;
    this.inputer = aqua.inputer;
    this.isOpen = false;
    this.currentDictionary = [];
    this.init(aqua);
  }

  _createClass(DictionaryRenderer, [{
    key: "init",
    value: function init(aqua) {
      var _this = this;

      this.$list = DOM.e('div', {
        'class': 'dictionary-list'
      });
      this.$container = DOM.e('div', {
        'class': 'dictionary-container'
      }, [this.$list]);
      aqua.uiMgr.get('lineWidthCntr').appendChild(this.$container);
      this.$container.addEventListener('mousedown', function (event) {
        event.stopPropagation();
      });
      this.$container.addEventListener('mouseup', function (event) {
        event.stopPropagation();

        _this.inputer.focus();

        var target = event.target;
        var index = target.dataset.index;

        if (index === undefined) {
          target = target.parentNode;
        }

        index = target.dataset.index;
        var content = _this.currentDictionary[index];

        _this.cursors.pureTraverse(function (cursor) {
          _this.aqua.write(content.keyword, cursor);
        });

        _this.close();
      });
    }
  }, {
    key: "$template",
    value: function $template(data) {
      return DOM.e('div', {
        'class': 'dictionary-item',
        'data-index': data.index
      }, [DOM.e('span', {
        'class': 'keyword'
      }, data.keyword), DOM.e('span', {
        'class': 'type'
      }, data.type)]);
    }
  }, {
    key: "render",
    value: function render(viewport, dictionary) {
      this.currentDictionary = dictionary;

      if (!dictionary && dictionary.length === 0) {
        this.close();
        return;
      }

      var primary = this.cursors.getPrimary();
      this.update(dictionary);
      this.open(primary.$y + this.korwa.getSingleLineHeight(), primary.$x, dictionary);
    }
  }, {
    key: "update",
    value: function update(dictionary, selectIndex) {
      var _this2 = this;

      this.$list.innerHTML = '';
      DOM.appendChild(this.$list, dictionary.map(function (item, index) {
        return item.index = index, _this2.$template(item);
      }));
    }
  }, {
    key: "open",
    value: function open($y, $x) {
      var _this3 = this;

      var dictionary = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      this.isOpen = true;
      rAF(function () {
        _this3.$container.style.cssText = "top: ".concat($y, "px; left: ").concat($x, "px");

        _this3.$container.classList.add('dictionary-container-active');
      });
    }
  }, {
    key: "close",
    value: function close() {
      var _this4 = this;

      this.isOpen = false;
      rAF(function () {
        _this4.$container.classList.remove('dictionary-container-active');
      });
    }
  }]);

  return DictionaryRenderer;
}();

module.exports = DictionaryRenderer;
},{"../../utils/index":"../aQua/src/utils/index.js"}],"../aQua/src/plugins/AquaSyntaxHint/index.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('../../utils/index'),
    DOM = _require.DOM,
    rAF = _require.rAF;

var _require2 = require('../../enums/index'),
    PluginType = _require2.PluginType;

var DictionaryRenderer = require('./DictionaryRenderer');

var _require3 = require('../../interfaces/index'),
    Plugin = _require3.Plugin;

var AquaSyntaxHint =
/*#__PURE__*/
function (_Plugin) {
  _inherits(AquaSyntaxHint, _Plugin);

  function AquaSyntaxHint() {
    var _this;

    _classCallCheck(this, AquaSyntaxHint);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AquaSyntaxHint).call(this));
    _this.name = 'AquaSyntaxHint';
    _this.type = PluginType.Buildin;
    return _this;
  }

  _createClass(AquaSyntaxHint, [{
    key: "install",
    value: function install(aqua) {
      _get(_getPrototypeOf(AquaSyntaxHint.prototype), "install", this).call(this);

      var lifetimes = aqua.lifetimes;
      lifetimes.on('setup', function () {});
      lifetimes.on('ready', function () {});
      lifetimes.on('complete', function () {
        aqua.renderer.load(DictionaryRenderer);
      });
    }
  }, {
    key: "uninstall",
    value: function uninstall() {
      _get(_getPrototypeOf(AquaSyntaxHint.prototype), "uninstall", this).call(this);
    }
  }]);

  return AquaSyntaxHint;
}(Plugin);

module.exports = AquaSyntaxHint;
},{"../../utils/index":"../aQua/src/utils/index.js","../../enums/index":"../aQua/src/enums/index.js","./DictionaryRenderer":"../aQua/src/plugins/AquaSyntaxHint/DictionaryRenderer.js","../../interfaces/index":"../aQua/src/interfaces/index.js"}],"../aQua/src/plugins/index.js":[function(require,module,exports) {
var AquaProgress = require('./AquaProgress/index');

var AquaSyntaxHint = require('./AquaSyntaxHint/index');

module.exports = [new AquaProgress(), new AquaSyntaxHint()];
},{"./AquaProgress/index":"../aQua/src/plugins/AquaProgress/index.js","./AquaSyntaxHint/index":"../aQua/src/plugins/AquaSyntaxHint/index.js"}],"../aQua/src/aquaqua.jpg":[function(require,module,exports) {
module.exports = "aquaqua.22cd4232.jpg";
},{}],"../aQua/src/Aqua.js":[function(require,module,exports) {
function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('./utils/index'),
    DataTransferItemHandler = _require.DataTransferItemHandler,
    Iterator = _require.Iterator,
    Khala = _require.Khala,
    Kizuna = _require.Kizuna,
    Marker = _require.Marker,
    Noop = _require.Noop,
    Progress = _require.Progress;

var _require2 = require('./components/index'),
    ActionMgr = _require2.ActionMgr,
    Chronicle = _require2.Chronicle,
    ContentMgr = _require2.ContentMgr,
    CursorMgr = _require2.CursorMgr,
    DocMgr = _require2.DocMgr,
    Inputer = _require2.Inputer,
    Korwa = _require2.Korwa,
    LineMgr = _require2.LineMgr,
    Locator = _require2.Locator,
    OptionMgr = _require2.OptionMgr,
    PluginMgr = _require2.PluginMgr,
    ProcessorMgr = _require2.ProcessorMgr,
    Renderer = _require2.Renderer,
    Scroller = _require2.Scroller,
    Serializer = _require2.Serializer,
    State = _require2.State,
    UIMgr = _require2.UIMgr,
    ViewportMgr = _require2.ViewportMgr,
    WorkerMgr = _require2.WorkerMgr;

var _require3 = require('./models/index'),
    Coord = _require3.Coord,
    Content = _require3.Content;

var Lines = require('./lines/index');

var Cursors = require('./cursors/index');

var Actions = require('./actions/index');

var UI = require('./ui/index');

var Processors = require('./processors/index');

var Marks = require('./marks/index');

var plugins = require('./plugins/index');

var _require4 = require('./assets/index'),
    StringAsset = _require4.StringAsset,
    ImageAsset = _require4.ImageAsset;

var aqua = require('./aquaqua.jpg');

var Aqua =
/*#__PURE__*/
function () {
  function Aqua(options) {
    _classCallCheck(this, Aqua);

    this.optionMgr = new OptionMgr(this);
    this.workerMgr = new WorkerMgr(this);
    this.progress = new Progress();
    this.khala = new Khala();
    this.lifetimes = new Khala();
    this.docWatcher = new Khala();
    this.kizuna = new Kizuna();
    this.state = new State();
    this.marker = new Marker();
    this.loadOptions(options);
    this.uiMgr = new UIMgr(this);
    this.loadUI(UI);
    this.mountUI();
    this.pluginMgr = new PluginMgr(this);
    this.pluginMgr.install([].concat(_toConsumableArray(plugins), _toConsumableArray(this.optionMgr.get('plugins'))));
    this.optionMgr.normalize();
    this.lifetimes.emit('setup', this);
    this.progress.set(0);
    this.chronicle = new Chronicle(this);
    this.scroller = new Scroller(this);
    this.processorMgr = new ProcessorMgr(this);
    this.korwa = new Korwa(this);
    this.lineMgr = new LineMgr(this);
    this.cursorMgr = new CursorMgr(this);
    this.actionMgr = new ActionMgr(this);
    this.contentMgr = new ContentMgr(this);
    this.docMgr = new DocMgr(this);
    this.locator = new Locator(this);
    this.viewportMgr = new ViewportMgr(this);
    this.renderer = new Renderer(this);
    this.inputer = new Inputer(this);
    this.serializer = new Serializer(this);
    this.progress.set(20);
    this.loadMarks(Marks);
    this.loadProcessors(Processors);
    this.loadLines(Lines);
    this.loadCursors(Cursors);
    this.loadActions(Actions);
    this.loadViewportEvents();
    this.loadInputerEvents();
    this.loadDocumentEvents();
    this.expose();
    this.lifetimes.emit('ready', this);
    this.progress.set(60);
    this.init();
    this.lifetimes.emit('complete', this);
    this.progress.set(100);
    this.releaseExtendPlugins();
    this.progress = null;
    /* Dev test */

    window.aqua = this;
  }

  _createClass(Aqua, [{
    key: "releaseExtendPlugins",
    value: function releaseExtendPlugins() {
      Aqua.extendPlugins = null;
    }
  }, {
    key: "expose",
    value: function expose() {
      var _this = this;

      this.write = function () {
        var _this$docMgr;

        _this.chronicle.start('Input', _this.cursorMgr.extract());

        (_this$docMgr = _this.docMgr).write.apply(_this$docMgr, arguments);

        _this.chronicle.end('Input', _this.cursorMgr.extract());
      };

      this.read = this.docMgr.read.bind(this.docMgr);

      this.delete = function () {
        var _this$docMgr2;

        _this.chronicle.start('Delete', _this.cursorMgr.extract());

        (_this$docMgr2 = _this.docMgr).delete.apply(_this$docMgr2, arguments);

        _this.chronicle.end('Delete', _this.cursorMgr.extract());
      };

      this.do = this.cursorMgr.traverse.bind(this.cursorMgr);
    }
  }, {
    key: "init",
    value: function init() {
      this.lineMgr.init();
      this.korwa.init();
      this.docMgr.init();
      this.viewportMgr.init({
        y: 0,
        height: this.korwa.getViewportRect().height,
        lps: 10
      });
      this.scroller.init({
        y: 0,
        speed: 250,
        min: 0
      });
      this.renderer.init();
      this.cursorMgr.init();
      this.chronicle.init();
      this.inputer.init();
    }
  }, {
    key: "loadProcessors",
    value: function loadProcessors(Processors) {
      var _this2 = this;

      Iterator.iterate(Processors, function (Processor) {
        _this2.processorMgr.load(Processor);
      });
    }
  }, {
    key: "loadOptions",
    value: function loadOptions(options) {
      this.optionMgr.load(options);
    }
  }, {
    key: "loadMarks",
    value: function loadMarks(Marks) {
      var _this3 = this;

      Iterator.iterate(Marks, function (mark, name) {
        _this3.marker.load(name, mark);
      });
    }
  }, {
    key: "loadPlugins",
    value: function loadPlugins(plugins) {
      var _this4 = this;

      plugins.forEach(function (plugin) {
        plugin.install(_this4);
      });
    }
  }, {
    key: "loadUI",
    value: function loadUI(UI) {
      var _this5 = this;

      Iterator.iterate(UI, function (fn, name) {
        _this5.uiMgr.load(name, fn);
      });
    }
  }, {
    key: "mountUI",
    value: function mountUI() {
      var _this6 = this;

      var structure = "\n            aqua\n                editor\n                    bgCntr\n                    viewport\n                        inputerCntr\n                            inputerLocator\n                                inputer\n                        scroller\n                            components\n                                fullWidthCntr\n                                    selectedLineCntr\n                                lineWidthCntr\n                                    measurerCntr\n                                        ramMeasurer\n                                        lineMeasurer\n                                        remMeasurer\n                                    cursorCntr\n                                    selectionCntr\n                                    lineCntr\n                        fixed\n                            sideBarCntr\n                                minimap\n                                scrollBar\n                    fgCntr\n        ";
      var $aqua = this.uiMgr.mountByString(structure, {
        mounted: function mounted(ele, name) {
          _this6.uiMgr.set(name, ele);
        }
      });
      var $el = this.optionMgr.get('el');
      this.uiMgr.mount($el, $aqua);
    }
  }, {
    key: "loadLines",
    value: function loadLines(Lines) {
      var _this7 = this;

      Iterator.iterate(Lines, function (mod) {
        _this7.lineMgr.load(mod);
      });
    }
  }, {
    key: "loadCursors",
    value: function loadCursors(Cursors) {
      var _this8 = this;

      Iterator.iterate(Cursors, function (mod) {
        console.warn('load mod', mod);

        _this8.cursorMgr.load(mod);
      });
    }
  }, {
    key: "loadActions",
    value: function loadActions(Actions) {
      var _this9 = this;

      Iterator.iterate(Actions, function (action) {
        _this9.actionMgr.load(action);
      });
    }
  }, {
    key: "loadViewportEvents",
    value: function loadViewportEvents() {
      var _this10 = this;

      var $viewport = this.uiMgr.get('viewport');
      this.kizuna.on($viewport, 'contextmenu', function (event) {
        event.preventDefault();
      });
      this.kizuna.on($viewport, 'mousedown', function (event) {
        event.preventDefault();

        _this10.kizuna.filterMousedown(event);

        _this10.inputer.focus();
      });
      this.kizuna.on($viewport, 'mousemove', function (event) {
        event.preventDefault();

        _this10.kizuna.filterMousemove(event);
      });
      this.kizuna.on($viewport, 'mouseup', function (event) {
        event.preventDefault();

        _this10.kizuna.filterMouseup(event);
      });
      this.kizuna.on($viewport, 'scroll', function (event) {
        _this10.scroller.handleScroll(event);
      });
      this.kizuna.on($viewport, 'dragover', function (event) {
        event.preventDefault();
      });
      this.kizuna.on($viewport, 'drop', function (event) {
        event.preventDefault();
        console.error('Drop event event.dataTransfer', event.dataTransfer);
        DataTransferItemHandler.handle(event.dataTransfer, {
          text: function text(_text) {
            console.info('text', _text);
          },
          html: function html(_html) {
            var $test = document.getElementById('con');
            var regexp = new RegExp(/^(<!--StartFragment -->)([\s\S]*)(<!--EndFragment-->)/, 'gm');
            console.error(regexp.exec(_html)[2]);
            console.info('html', _html);
          },
          file: function file(_file) {
            console.info('file', _file);
          }
        });
      });
    }
  }, {
    key: "loadInputerEvents",
    value: function loadInputerEvents() {
      var _this11 = this;

      var $inputer = this.uiMgr.get('inputer');
      $inputer.focus();
      this.kizuna.on($inputer, 'focus', function (event) {
        _this11.state.focus = true;
      });
      this.kizuna.on($inputer, 'blur', function (event) {
        _this11.state.focus = false;
      });
      this.kizuna.on($inputer, 'input', function (event) {
        _this11.inputer.poll();
      });
      this.kizuna.on($inputer, 'keydown', function (event) {
        _this11.kizuna.filterKeydown(event);
      });
      this.kizuna.on($inputer, 'keyup', function (event) {
        // event.preventDefault()
        _this11.kizuna.filterKeyup(event);
      });
      this.kizuna.on($inputer, 'copy', function (event) {
        _this11.actionMgr.exec('Copy', event);
      });
      this.kizuna.on($inputer, 'cut', function (event) {
        _this11.actionMgr.exec('Cut', event);
      });
      this.kizuna.on($inputer, 'paste', function (event) {
        _this11.actionMgr.exec('Paste', event); // const items = event.clipboardData.items
        // console.error('Paste event.clipboardData', event.clipboardData)
        // if (!(event.clipboardData && items)) {
        //     return
        // }
        // for (let i = 0, len = items.length; i < len; i++) {
        //     DataTransferItemHandler.handle(items[i], {
        //         text: text => {
        //             console.info('text', text)
        //         },
        //         html: html => {
        //             const $test = document.getElementById('con')
        //             const regexp = new RegExp(/^(<!--StartFragment-->)([\s\S]*)(<!--EndFragment-->)/, 'gm')
        //             const c = regexp.exec(html)[2]
        //             console.error(c)
        //             $test.innerHTML = c
        //             console.info('html', html)
        //         },
        //         file: file => {
        //             console.info('file', file)
        //         }
        //     })
        // }
        // event.preventDefault()

      });
      this.khala.on('input', function (text) {
        _this11.actionMgr.exec('Input', text); // this.chronicle.start('Input', this.cursorMgr.extract())
        // this.cursorMgr.traverse(cursor => {
        //     if (!cursor.selection.isCollapsed()) {
        //         this.actionMgr.execWithName('Backspace', 'backspace', cursor)
        //     }
        //     const { y, x } = this.docMgr.write(text, cursor)
        //     cursor.y = cursor.y + y
        //     cursor.x = cursor.x + x
        // })
        // this.chronicle.end('Input', this.cursorMgr.extract())


        var dictionary = []; // Try to Get Dictionary

        _this11.renderer.render('dictionary', _this11.viewport, dictionary);
      });
    }
  }, {
    key: "loadDocumentEvents",
    value: function loadDocumentEvents() {
      var _this12 = this;

      this.kizuna.on(document, 'mousedown', function (event) {
        _this12.state.mousedown = true;
      });
      this.kizuna.on(document, 'mouseup', function (event) {
        _this12.state.mousedown = false;
      });
      this.kizuna.on(document, 'visibilitychange', function (event) {});
    }
  }, {
    key: "extract",
    value: function extract() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$doc = _ref.doc,
          doc = _ref$doc === void 0 ? true : _ref$doc,
          _ref$cursor = _ref.cursor,
          cursor = _ref$cursor === void 0 ? true : _ref$cursor,
          _ref$chronicle = _ref.chronicle,
          chronicle = _ref$chronicle === void 0 ? true : _ref$chronicle,
          _ref$option = _ref.option,
          option = _ref$option === void 0 ? true : _ref$option;

      var result = Object.create(null);

      if (doc) {
        result.doc = this.docMgr.extract();
      }

      if (cursor) {
        result.cursors = this.cursorMgr.extract();
      }

      if (chronicle) {
        result.chronicle = this.chronicle.extract();
      }

      if (option) {
        result.option = {
          scroller: {
            y: this.scroller.y
          }
        };
      }

      return result;
    }
  }, {
    key: "rebuild",
    value: function rebuild(config) {
      if (!config) {
        this.docMgr.rebuild(null);
        this.cursorMgr.rebuild(null);
        this.chronicle.rebuild(null);
        this.scroller.scroll(0, true);
        return;
      }

      this.docMgr.rebuild(config.doc);
      this.cursorMgr.rebuild(config.cursors);
      this.chronicle.rebuild(config.chronicle);
      this.scroller.scroll(config.option.scroller.y, true);
    }
  }], [{
    key: "use",
    value: function use(ExtendPlugin) {
      if (!this.extendPlugins) {
        this.extendPlugins = [];
      }

      if (this.extendPlugins.indexOf(ExtendPlugin) > -1) {
        return;
      }

      this.extendPlugins.push(ExtendPlugin);

      for (var _len = arguments.length, options = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        options[_key - 1] = arguments[_key];
      }

      ExtendPlugin.install ? ExtendPlugin.install.apply(ExtendPlugin, [Aqua].concat(options)) : _construct(ExtendPlugin, [Aqua].concat(options));
    }
  }]);

  return Aqua;
}();

module.exports = Aqua;
},{"./utils/index":"../aQua/src/utils/index.js","./components/index":"../aQua/src/components/index.js","./models/index":"../aQua/src/models/index.js","./lines/index":"../aQua/src/lines/index.js","./cursors/index":"../aQua/src/cursors/index.js","./actions/index":"../aQua/src/actions/index.js","./ui/index":"../aQua/src/ui/index.js","./processors/index":"../aQua/src/processors/index.js","./marks/index":"../aQua/src/marks/index.js","./plugins/index":"../aQua/src/plugins/index.js","./assets/index":"../aQua/src/assets/index.js","./aquaqua.jpg":"../aQua/src/aquaqua.jpg"}],"../aQua/index.js":[function(require,module,exports) {
var Aqua = require('./src/Aqua');

module.exports = Aqua;
},{"./src/Aqua":"../aQua/src/Aqua.js"}],"src/components/editor/aqua-chan.png":[function(require,module,exports) {
module.exports = "aqua-chan.27d6def6.png";
},{}],"src/components/editor/aqua.config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var bg = require('./aqua-chan.png');

var _default = {
  content: '',
  ui: {
    theme: 'aqua',
    xOverflow: 'break',
    // 'scroll'
    yOverflow: 'scroll' // 'extend'

  },
  assets: {
    image: {
      allow: ['inline', 'block']
    }
  },
  options: {
    readOnly: false,
    multipleCursors: true
  },
  langs: {
    default: 'text',
    text: true
  },
  line: {
    start: 1,
    height: 25
  },
  lifetimes: {
    setup: function setup(aqua) {
      aqua.uiMgr.get('bgCntr').innerHTML = "<img id=\"aq\" class=\"bg-image\" src=\"".concat(bg, "\" />");
    },
    ready: function ready(aqua) {},
    destroyed: function destroyed() {}
  },
  plugins: []
};
exports.default = _default;
},{"./aqua-chan.png":"src/components/editor/aqua-chan.png"}],"src/components/editor/editor.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../../../../aQua/index"));

var _ui = require("../../../../aQua/src/ui");

var _aqua = _interopRequireDefault(require("./aqua.config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  name: 'editor',
  props: {
    file: Object
  },
  data: function data() {
    return {};
  },
  mounted: function mounted() {// this.init({
    //   el: this.$refs.editor,
    //   ...aquaConfig,
    // })
  },
  watch: {
    file: function file(_file) {
      if (!_file) {
        return;
      }

      this.load(_file.content);
    }
  },
  methods: {
    init: function init() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.aqua = new _index.default(config);
    },
    onDocChange: function onDocChange() {
      console.warn('Aqua Doc Changed');
    },
    getEditorInfo: function getEditorInfo() {
      if (!this.file) {
        return null;
      }

      return {
        cid: this.file.cid,
        content: JSON.stringify(this.aqua.extract())
      };
    },
    load: function load(content) {
      var _this = this;

      this.init(_objectSpread({
        el: this.$refs.editor
      }, _aqua.default));

      var load_ = function load_(content) {
        _this.aqua.rebuild(content);
      };

      load_(content);
      this.load = load_;
    }
  }
};
exports.default = _default;
        var $aefaf6 = exports.default || module.exports;
      
      if (typeof $aefaf6 === 'function') {
        $aefaf6 = $aefaf6.options;
      }
    
        /* template */
        Object.assign($aefaf6, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", {
    ref: "editor",
    staticClass: "editor",
    attrs: { id: "editor" }
  })
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$aefaf6', $aefaf6);
          } else {
            api.reload('$aefaf6', $aefaf6);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"../../../../aQua/index":"../aQua/index.js","../../../../aQua/src/ui":"../aQua/src/ui/index.js","./aqua.config":"src/components/editor/aqua.config.js","_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/user-space/user-space.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
var _default = {
  name: 'user-space'
};
exports.default = _default;
        var $62485a = exports.default || module.exports;
      
      if (typeof $62485a === 'function') {
        $62485a = $62485a.options;
      }
    
        /* template */
        Object.assign($62485a, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "user-space" }, [
      _c("span", { staticClass: "default" }, [_vm._v("Empty now")])
    ])
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-62485a",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$62485a', $62485a);
          } else {
            api.reload('$62485a', $62485a);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/stage/stage.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tabs = _interopRequireDefault(require("/src/components/tabs/tabs"));

var _editor = _interopRequireDefault(require("/src/components/editor/editor"));

var _userSpace = _interopRequireDefault(require("/src/components/user-space/user-space"));

var _index = require("/src/helpers/index");

var _options = require("../../../../aQua/src/options");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'stage',
  data: function data() {
    return {
      fileAndContent: null
    };
  },
  computed: {
    openedFiles: function openedFiles() {
      return this.$store.state.workspace.openedFiles;
    },
    file: function file() {
      return this.$store.state.workspace.file;
    }
  },
  watch: {
    file: function file(_file, lastFile) {
      var _this = this;

      if (!_file) {
        this.fileAndContent = null;
        return;
      }

      if (_index.FileHelper.isFolder(_file)) {
        return;
      }

      var lastFileFid = lastFile ? lastFile.fid : NaN;

      if (_file.fid === lastFileFid) {
        return;
      }

      this.saveContent();
      var curFid = _file.fid;
      this.$store.dispatch('workspace/getContent', _file).then(function (info) {
        _this.handleInfo(info);

        if (_this.file.fid === curFid) {
          _this.fileAndContent = info;
        }
      });
    }
  },
  created: function created() {
    var _this2 = this;

    this['customHook:pageUnload'] = function () {
      if (_this2.openedFiles.length > 0) {
        _this2.saveContent();
      }
    };

    this.$khala.on('pageUnload', this['customHook:pageUnload']);
  },
  beforeDestroy: function beforeDestroy() {
    this.khala.off('pageUnload', this['customHook:pageUnload']);
  },
  methods: {
    onChange: function onChange(file) {
      if (file.fid === this.file.fid) {
        return;
      }

      this.$store.dispatch('workspace/openFile', file);
    },
    onClose: function onClose(file) {
      this.saveContent();
      this.$store.dispatch('workspace/closeFile', file);
    },
    onDocChange: function onDocChange() {},
    saveContent: function saveContent() {
      var editor = this.$refs.editor;
      var info = editor.getEditorInfo();

      if (!info) {
        return;
      }

      this.$store.dispatch('workspace/saveContent', info);
    },
    handleInfo: function handleInfo(info) {
      if (info.content === '') {
        return info;
      }

      info.content = JSON.parse(info.content);
      return info;
    }
  },
  components: {
    Tabs: _tabs.default,
    Editor: _editor.default,
    UserSpace: _userSpace.default
  }
};
exports.default = _default;
        var $3a418a = exports.default || module.exports;
      
      if (typeof $3a418a === 'function') {
        $3a418a = $3a418a.options;
      }
    
        /* template */
        Object.assign($3a418a, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "stage" },
    [
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.openedFiles.length > 0,
              expression: "openedFiles.length > 0"
            }
          ],
          staticClass: "wrap"
        },
        [
          _c("tabs", {
            attrs: { tabs: _vm.openedFiles, currentTab: _vm.file },
            on: { onChange: _vm.onChange, onClose: _vm.onClose }
          }),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "assets" },
            [
              _c("editor", {
                ref: "editor",
                attrs: { file: _vm.fileAndContent },
                on: { onDocChange: _vm.onDocChange }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("user-space", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.openedFiles.length <= 0,
            expression: "openedFiles.length <= 0"
          }
        ]
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-3a418a",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$3a418a', $3a418a);
          } else {
            api.reload('$3a418a', $3a418a);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"/src/components/tabs/tabs":"src/components/tabs/tabs.vue","/src/components/editor/editor":"src/components/editor/editor.vue","/src/components/user-space/user-space":"src/components/user-space/user-space.vue","/src/helpers/index":"src/helpers/index.js","../../../../aQua/src/options":"../aQua/src/options/index.js","_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/components/activity/activity.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
var _default = {
  name: 'activity'
};
exports.default = _default;
        var $543172 = exports.default || module.exports;
      
      if (typeof $543172 === 'function') {
        $543172 = $543172.options;
      }
    
        /* template */
        Object.assign($543172, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "activity" })
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-543172",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$543172', $543172);
          } else {
            api.reload('$543172', $543172);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/modals/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  ContextMenu: '35001',
  Workspace: '35002'
};
exports.default = _default;
},{}],"src/components/context-menu/context-menu.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("/src/modals/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'create-file',
  data: function data() {
    return {
      isShow: false,
      menuList: [],
      position: {
        top: 0,
        left: 0
      }
    };
  },
  computed: {
    contextMenuModal: function contextMenuModal() {
      return this.$store.state.modals.modals[_index.default.ContextMenu];
    }
  },
  watch: {
    contextMenuModal: function contextMenuModal(args) {
      if (!args) {
        this.isShow = false;
        this.menuList = [];
        this.position = {
          y: 0,
          x: 0
        };
        return;
      }

      this.isShow = true;
      this.menuList = args.menuList;
      this.position = args.position;
    }
  },
  methods: {
    onClose: function onClose() {
      this.$store.dispatch('modals/close', _index.default.ContextMenu);
    }
  }
};
exports.default = _default;
        var $1d5635 = exports.default || module.exports;
      
      if (typeof $1d5635 === 'function') {
        $1d5635 = $1d5635.options;
      }
    
        /* template */
        Object.assign($1d5635, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.isShow,
          expression: "isShow"
        }
      ],
      staticClass: "modal",
      on: {
        click: function($event) {
          $event.stopPropagation()
          return _vm.onClose($event)
        },
        contextmenu: function($event) {
          $event.stopPropagation()
        },
        mousedown: function($event) {
          if (
            !$event.type.indexOf("key") &&
            _vm._k($event.keyCode, "right", 39, $event.key, [
              "Right",
              "ArrowRight"
            ])
          ) {
            return null
          }
          if ("button" in $event && $event.button !== 2) {
            return null
          }
          $event.stopPropagation()
          return _vm.onClose($event)
        }
      }
    },
    [
      _c(
        "div",
        { staticClass: "menu-list", style: _vm.position },
        _vm._l(_vm.menuList, function(menuItem) {
          return _c(
            "div",
            {
              key: menuItem.name,
              staticClass: "menu-item",
              on: {
                click: function($event) {
                  menuItem.fn ? menuItem.fn() : null
                }
              }
            },
            [
              _c("div", { staticClass: "left" }, [
                _c("span", { staticClass: "name" }, [
                  _vm._v(_vm._s(menuItem.name))
                ])
              ]),
              _vm._v(" "),
              menuItem.hotKey
                ? _c("div", { staticClass: "right" }, [
                    _vm._v(_vm._s(menuItem.hotKey))
                  ])
                : _vm._e()
            ]
          )
        }),
        0
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-1d5635",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$1d5635', $1d5635);
          } else {
            api.reload('$1d5635', $1d5635);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"/src/modals/index":"src/modals/index.js","_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/App.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sidebar = _interopRequireDefault(require("/src/components/sidebar/sidebar"));

var _explorer = _interopRequireDefault(require("/src/components/explorer/explorer"));

var _stage = _interopRequireDefault(require("/src/components/stage/stage"));

var _activity = _interopRequireDefault(require("/src/components/activity/activity"));

var _contextMenu = _interopRequireDefault(require("/src/components/context-menu/context-menu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  data: function data() {
    return {
      currentExplorer: 'workspace',
      currentProject: null,
      isShowExplorer: true,
      isShowActivity: true
    };
  },
  created: function created() {
    var _this = this;

    window.onbeforeunload = function () {
      _this.$khala.emit('pageUnload');

      return 'Ayarin';
    };

    this.login();
  },
  methods: {
    change: function change(name) {
      if (this.currentExplorer === name && this.isShowExplorer) {
        this.isShowExplorer = false;
        return;
      }

      this.isShowExplorer = true;
      this.currentExplorer = name;
    },
    login: function login() {
      this.$store.dispatch('user/loginAsync', {
        username: 'ayarin',
        password: 'qwerty'
      });
    }
  },
  components: {
    Sidebar: _sidebar.default,
    Explorer: _explorer.default,
    Stage: _stage.default,
    Activity: _activity.default,
    ContextMenu: _contextMenu.default
  }
};
exports.default = _default;
        var $bd6e8e = exports.default || module.exports;
      
      if (typeof $bd6e8e === 'function') {
        $bd6e8e = $bd6e8e.options;
      }
    
        /* template */
        Object.assign($bd6e8e, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "minato", attrs: { id: "app" } }, [
    _c("div", { staticClass: "global-components" }, [_c("context-menu")], 1),
    _vm._v(" "),
    _vm._m(0),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "body" },
      [
        _c("sidebar", {
          attrs: { name: _vm.currentExplorer },
          on: { onChange: _vm.change }
        }),
        _vm._v(" "),
        _c(
          "transition",
          { attrs: { name: "explorer-fade" } },
          [
            _c("explorer", {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.isShowExplorer,
                  expression: "isShowExplorer"
                }
              ],
              key: "exloprer",
              attrs: { explorer: _vm.currentExplorer }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c("stage"),
        _vm._v(" "),
        _c("activity", {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.isShowActivity,
              expression: "isShowActivity"
            }
          ]
        })
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "footer" })
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "header" }, [
      _c("div", { staticClass: "app-sign" }, [
        _c("div", { staticClass: "logo" }),
        _vm._v(" "),
        _c("div", { staticClass: "name" }, [_vm._v("minato")])
      ])
    ])
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-bd6e8e",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$bd6e8e', $bd6e8e);
          } else {
            api.reload('$bd6e8e', $bd6e8e);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"/src/components/sidebar/sidebar":"src/components/sidebar/sidebar.vue","/src/components/explorer/explorer":"src/components/explorer/explorer.vue","/src/components/stage/stage":"src/components/stage/stage.vue","/src/components/activity/activity":"src/components/activity/activity.vue","/src/components/context-menu/context-menu":"src/components/context-menu/context-menu.vue","_css_loader":"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _index = _interopRequireDefault(require("./store/index"));

var _App = _interopRequireDefault(require("./App"));

var _index2 = require("/src/utils/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue.default.prototype.$khala = new _index2.Khala();
new _vue.default({
  store: _index.default,
  render: function render(h) {
    return h(_App.default);
  }
}).$mount('#app');
},{"vue":"node_modules/vue/dist/vue.runtime.esm.js","./store/index":"src/store/index.js","./App":"src/App.vue","/src/utils/index":"src/utils/index.js"}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "14143" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=src.a2b27638.js.map