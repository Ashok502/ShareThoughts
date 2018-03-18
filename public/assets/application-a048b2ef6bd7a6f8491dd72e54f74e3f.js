/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
// jQuery 1.9 has removed the `$.browser` property, fancybox relies on
// it, so we patch it here if it's missing.
// This has been copied from jQuery migrate 1.1.1.
if ( !jQuery.browser ) {
  var uaMatch = function( ua ) {
    ua = ua.toLowerCase();

    var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
      /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
      /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
      /(msie) ([\w.]+)/.exec( ua ) ||
      ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
      [];

    return {
      browser: match[ 1 ] || "",
      version: match[ 2 ] || "0"
    };
  };

  matched = uaMatch( navigator.userAgent );
  browser = {};

  if ( matched.browser ) {
    browser[ matched.browser ] = true;
    browser.version = matched.version;
  }

  // Chrome is Webkit, but Webkit is also Safari.
  if ( browser.chrome ) {
    browser.webkit = true;
  } else if ( browser.webkit ) {
    browser.safari = true;
  }

  jQuery.browser = browser;
}
;
/*
 * FancyBox - jQuery Plugin
 * Simple and fancy lightbox alternative
 *
 * Examples and documentation at: http://fancybox.net
 *
 * Copyright (c) 2008 - 2010 Janis Skarnelis
 * That said, it is hardly a one-person project. Many people have submitted bugs, code, and offered their advice freely. Their support is greatly appreciated.
 *
 * Version: 1.3.4 (11/11/2010)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */


;(function($) {
	var tmp, loading, overlay, wrap, outer, content, close, title, nav_left, nav_right,

		selectedIndex = 0, selectedOpts = {}, selectedArray = [], currentIndex = 0, currentOpts = {}, currentArray = [],

		ajaxLoader = null, imgPreloader = new Image(), imgRegExp = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i, swfRegExp = /[^\.]\.(swf)\s*$/i,

		loadingTimer, loadingFrame = 1,

		titleHeight = 0, titleStr = '', start_pos, final_pos, busy = false, fx = $.extend($('<div/>')[0], { prop: 0 }),

		isIE6 = $.browser.msie && $.browser.version < 7 && !window.XMLHttpRequest,

		/*
		 * Private methods 
		 */

		_abort = function() {
			loading.hide();

			imgPreloader.onerror = imgPreloader.onload = null;

			if (ajaxLoader) {
				ajaxLoader.abort();
			}

			tmp.empty();
		},

		_error = function() {
			if (false === selectedOpts.onError(selectedArray, selectedIndex, selectedOpts)) {
				loading.hide();
				busy = false;
				return;
			}

			selectedOpts.titleShow = false;

			selectedOpts.width = 'auto';
			selectedOpts.height = 'auto';

			tmp.html( '<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>' );

			_process_inline();
		},

		_start = function() {
			var obj = selectedArray[ selectedIndex ],
				href, 
				type, 
				title,
				str,
				emb,
				ret;

			_abort();

			selectedOpts = $.extend({}, $.fn.fancybox.defaults, (typeof $(obj).data('fancybox') == 'undefined' ? selectedOpts : $(obj).data('fancybox')));

			ret = selectedOpts.onStart(selectedArray, selectedIndex, selectedOpts);

			if (ret === false) {
				busy = false;
				return;
			} else if (typeof ret == 'object') {
				selectedOpts = $.extend(selectedOpts, ret);
			}

			title = selectedOpts.title || (obj.nodeName ? $(obj).attr('title') : obj.title) || '';

			if (obj.nodeName && !selectedOpts.orig) {
				selectedOpts.orig = $(obj).children("img:first").length ? $(obj).children("img:first") : $(obj);
			}

			if (title === '' && selectedOpts.orig && selectedOpts.titleFromAlt) {
				title = selectedOpts.orig.attr('alt');
			}

			href = selectedOpts.href || (obj.nodeName ? $(obj).attr('href') : obj.href) || null;

			if ((/^(?:javascript)/i).test(href) || href == '#') {
				href = null;
			}

			if (selectedOpts.type) {
				type = selectedOpts.type;

				if (!href) {
					href = selectedOpts.content;
				}

			} else if (selectedOpts.content) {
				type = 'html';

			} else if (href) {
				if (href.match(imgRegExp)) {
					type = 'image';

				} else if (href.match(swfRegExp)) {
					type = 'swf';

				} else if ($(obj).hasClass("iframe")) {
					type = 'iframe';

				} else if (href.indexOf("#") === 0) {
					type = 'inline';

				} else {
					type = 'ajax';
				}
			}

			if (!type) {
				_error();
				return;
			}

			if (type == 'inline') {
				obj	= href.substr(href.indexOf("#"));
				type = $(obj).length > 0 ? 'inline' : 'ajax';
			}

			selectedOpts.type = type;
			selectedOpts.href = href;
			selectedOpts.title = title;

			if (selectedOpts.autoDimensions) {
				if (selectedOpts.type == 'html' || selectedOpts.type == 'inline' || selectedOpts.type == 'ajax') {
					selectedOpts.width = 'auto';
					selectedOpts.height = 'auto';
				} else {
					selectedOpts.autoDimensions = false;	
				}
			}

			if (selectedOpts.modal) {
				selectedOpts.overlayShow = true;
				selectedOpts.hideOnOverlayClick = false;
				selectedOpts.hideOnContentClick = false;
				selectedOpts.enableEscapeButton = false;
				selectedOpts.showCloseButton = false;
			}

			selectedOpts.padding = parseInt(selectedOpts.padding, 10);
			selectedOpts.margin = parseInt(selectedOpts.margin, 10);

			tmp.css('padding', (selectedOpts.padding + selectedOpts.margin));

			$('.fancybox-inline-tmp').unbind('fancybox-cancel').bind('fancybox-change', function() {
				$(this).replaceWith(content.children());				
			});

			switch (type) {
				case 'html' :
					tmp.html( selectedOpts.content );
					_process_inline();
				break;

				case 'inline' :
					if ( $(obj).parent().is('#fancybox-content') === true) {
						busy = false;
						return;
					}

					$('<div class="fancybox-inline-tmp" />')
						.hide()
						.insertBefore( $(obj) )
						.bind('fancybox-cleanup', function() {
							$(this).replaceWith(content.children());
						}).bind('fancybox-cancel', function() {
							$(this).replaceWith(tmp.children());
						});

					$(obj).appendTo(tmp);

					_process_inline();
				break;

				case 'image':
					busy = false;

					$.fancybox.showActivity();

					imgPreloader = new Image();

					imgPreloader.onerror = function() {
						_error();
					};

					imgPreloader.onload = function() {
						busy = true;

						imgPreloader.onerror = imgPreloader.onload = null;

						_process_image();
					};

					imgPreloader.src = href;
				break;

				case 'swf':
					selectedOpts.scrolling = 'no';

					str = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + selectedOpts.width + '" height="' + selectedOpts.height + '"><param name="movie" value="' + href + '"></param>';
					emb = '';

					$.each(selectedOpts.swf, function(name, val) {
						str += '<param name="' + name + '" value="' + val + '"></param>';
						emb += ' ' + name + '="' + val + '"';
					});

					str += '<embed src="' + href + '" type="application/x-shockwave-flash" width="' + selectedOpts.width + '" height="' + selectedOpts.height + '"' + emb + '></embed></object>';

					tmp.html(str);

					_process_inline();
				break;

				case 'ajax':
					busy = false;

					$.fancybox.showActivity();

					selectedOpts.ajax.win = selectedOpts.ajax.success;

					ajaxLoader = $.ajax($.extend({}, selectedOpts.ajax, {
						url	: href,
						data : selectedOpts.ajax.data || {},
						error : function(XMLHttpRequest, textStatus, errorThrown) {
							if ( XMLHttpRequest.status > 0 ) {
								_error();
							}
						},
						success : function(data, textStatus, XMLHttpRequest) {
							var o = typeof XMLHttpRequest == 'object' ? XMLHttpRequest : ajaxLoader;
							if (o.status == 200) {
								if ( typeof selectedOpts.ajax.win == 'function' ) {
									ret = selectedOpts.ajax.win(href, data, textStatus, XMLHttpRequest);

									if (ret === false) {
										loading.hide();
										return;
									} else if (typeof ret == 'string' || typeof ret == 'object') {
										data = ret;
									}
								}

								tmp.html( data );
								_process_inline();
							}
						}
					}));

				break;

				case 'iframe':
					_show();
				break;
			}
		},

		_process_inline = function() {
			var
				w = selectedOpts.width,
				h = selectedOpts.height;

			if (w.toString().indexOf('%') > -1) {
				w = parseInt( ($(window).width() - (selectedOpts.margin * 2)) * parseFloat(w) / 100, 10) + 'px';

			} else {
				w = w == 'auto' ? 'auto' : w + 'px';	
			}

			if (h.toString().indexOf('%') > -1) {
				h = parseInt( ($(window).height() - (selectedOpts.margin * 2)) * parseFloat(h) / 100, 10) + 'px';

			} else {
				h = h == 'auto' ? 'auto' : h + 'px';	
			}

			tmp.wrapInner('<div style="width:' + w + ';height:' + h + ';overflow: ' + (selectedOpts.scrolling == 'auto' ? 'auto' : (selectedOpts.scrolling == 'yes' ? 'scroll' : 'hidden')) + ';position:relative;"></div>');

			selectedOpts.width = tmp.width();
			selectedOpts.height = tmp.height();

			_show();
		},

		_process_image = function() {
			selectedOpts.width = imgPreloader.width;
			selectedOpts.height = imgPreloader.height;

			$("<img />").attr({
				'id' : 'fancybox-img',
				'src' : imgPreloader.src,
				'alt' : selectedOpts.title
			}).appendTo( tmp );

			_show();
		},

		_show = function() {
			var pos, equal;

			loading.hide();

			if (wrap.is(":visible") && false === currentOpts.onCleanup(currentArray, currentIndex, currentOpts)) {
				$.event.trigger('fancybox-cancel');

				busy = false;
				return;
			}

			busy = true;

			$(content.add( overlay )).unbind();

			$(window).unbind("resize.fb scroll.fb");
			$(document).unbind('keydown.fb');

			if (wrap.is(":visible") && currentOpts.titlePosition !== 'outside') {
				wrap.css('height', wrap.height());
			}

			currentArray = selectedArray;
			currentIndex = selectedIndex;
			currentOpts = selectedOpts;

			if (currentOpts.overlayShow) {
				overlay.css({
					'background-color' : currentOpts.overlayColor,
					'opacity' : currentOpts.overlayOpacity,
					'cursor' : currentOpts.hideOnOverlayClick ? 'pointer' : 'auto',
					'height' : $(document).height()
				});

				if (!overlay.is(':visible')) {
					if (isIE6) {
						$('select:not(#fancybox-tmp select)').filter(function() {
							return this.style.visibility !== 'hidden';
						}).css({'visibility' : 'hidden'}).one('fancybox-cleanup', function() {
							this.style.visibility = 'inherit';
						});
					}

					overlay.show();
				}
			} else {
				overlay.hide();
			}

			final_pos = _get_zoom_to();

			_process_title();

			if (wrap.is(":visible")) {
				$( close.add( nav_left ).add( nav_right ) ).hide();

				pos = wrap.position(),

				start_pos = {
					top	 : pos.top,
					left : pos.left,
					width : wrap.width(),
					height : wrap.height()
				};

				equal = (start_pos.width == final_pos.width && start_pos.height == final_pos.height);

				content.fadeTo(currentOpts.changeFade, 0.3, function() {
					var finish_resizing = function() {
						content.html( tmp.contents() ).fadeTo(currentOpts.changeFade, 1, _finish);
					};

					$.event.trigger('fancybox-change');

					content
						.empty()
						.removeAttr('filter')
						.css({
							'border-width' : currentOpts.padding,
							'width'	: final_pos.width - currentOpts.padding * 2,
							'height' : selectedOpts.autoDimensions ? 'auto' : final_pos.height - titleHeight - currentOpts.padding * 2
						});

					if (equal) {
						finish_resizing();

					} else {
						fx.prop = 0;

						$(fx).animate({prop: 1}, {
							 duration : currentOpts.changeSpeed,
							 easing : currentOpts.easingChange,
							 step : _draw,
							 complete : finish_resizing
						});
					}
				});

				return;
			}

			wrap.removeAttr("style");

			content.css('border-width', currentOpts.padding);

			if (currentOpts.transitionIn == 'elastic') {
				start_pos = _get_zoom_from();

				content.html( tmp.contents() );

				wrap.show();

				if (currentOpts.opacity) {
					final_pos.opacity = 0;
				}

				fx.prop = 0;

				$(fx).animate({prop: 1}, {
					 duration : currentOpts.speedIn,
					 easing : currentOpts.easingIn,
					 step : _draw,
					 complete : _finish
				});

				return;
			}

			if (currentOpts.titlePosition == 'inside' && titleHeight > 0) {	
				title.show();	
			}

			content
				.css({
					'width' : final_pos.width - currentOpts.padding * 2,
					'height' : selectedOpts.autoDimensions ? 'auto' : final_pos.height - titleHeight - currentOpts.padding * 2
				})
				.html( tmp.contents() );

			wrap
				.css(final_pos)
				.fadeIn( currentOpts.transitionIn == 'none' ? 0 : currentOpts.speedIn, _finish );
		},

		_format_title = function(title) {
			if (title && title.length) {
				if (currentOpts.titlePosition == 'float') {
					return '<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">' + title + '</td><td id="fancybox-title-float-right"></td></tr></table>';
				}

				return '<div id="fancybox-title-' + currentOpts.titlePosition + '">' + title + '</div>';
			}

			return false;
		},

		_process_title = function() {
			titleStr = currentOpts.title || '';
			titleHeight = 0;

			title
				.empty()
				.removeAttr('style')
				.removeClass();

			if (currentOpts.titleShow === false) {
				title.hide();
				return;
			}

			titleStr = $.isFunction(currentOpts.titleFormat) ? currentOpts.titleFormat(titleStr, currentArray, currentIndex, currentOpts) : _format_title(titleStr);

			if (!titleStr || titleStr === '') {
				title.hide();
				return;
			}

			title
				.addClass('fancybox-title-' + currentOpts.titlePosition)
				.html( titleStr )
				.appendTo( 'body' )
				.show();

			switch (currentOpts.titlePosition) {
				case 'inside':
					title
						.css({
							'width' : final_pos.width - (currentOpts.padding * 2),
							'marginLeft' : currentOpts.padding,
							'marginRight' : currentOpts.padding
						});

					titleHeight = title.outerHeight(true);

					title.appendTo( outer );

					final_pos.height += titleHeight;
				break;

				case 'over':
					title
						.css({
							'marginLeft' : currentOpts.padding,
							'width'	: final_pos.width - (currentOpts.padding * 2),
							'bottom' : currentOpts.padding
						})
						.appendTo( outer );
				break;

				case 'float':
					title
						.css('left', parseInt((title.width() - final_pos.width - 40)/ 2, 10) * -1)
						.appendTo( wrap );
				break;

				default:
					title
						.css({
							'width' : final_pos.width - (currentOpts.padding * 2),
							'paddingLeft' : currentOpts.padding,
							'paddingRight' : currentOpts.padding
						})
						.appendTo( wrap );
				break;
			}

			title.hide();
		},

		_set_navigation = function() {
			if (currentOpts.enableEscapeButton || currentOpts.enableKeyboardNav) {
				$(document).bind('keydown.fb', function(e) {
					if (e.keyCode == 27 && currentOpts.enableEscapeButton) {
						e.preventDefault();
						$.fancybox.close();

					} else if ((e.keyCode == 37 || e.keyCode == 39) && currentOpts.enableKeyboardNav && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'SELECT') {
						e.preventDefault();
						$.fancybox[ e.keyCode == 37 ? 'prev' : 'next']();
					}
				});
			}

			if (!currentOpts.showNavArrows) { 
				nav_left.hide();
				nav_right.hide();
				return;
			}

			if ((currentOpts.cyclic && currentArray.length > 1) || currentIndex !== 0) {
				nav_left.show();
			}

			if ((currentOpts.cyclic && currentArray.length > 1) || currentIndex != (currentArray.length -1)) {
				nav_right.show();
			}
		},

		_finish = function () {
			if (!$.support.opacity) {
				content.get(0).style.removeAttribute('filter');
				wrap.get(0).style.removeAttribute('filter');
			}

			if (selectedOpts.autoDimensions) {
				content.css('height', 'auto');
			}

			wrap.css('height', 'auto');

			if (titleStr && titleStr.length) {
				title.show();
			}

			if (currentOpts.showCloseButton) {
				close.show();
			}

			_set_navigation();
	
			if (currentOpts.hideOnContentClick)	{
				content.bind('click', $.fancybox.close);
			}

			if (currentOpts.hideOnOverlayClick)	{
				overlay.bind('click', $.fancybox.close);
			}

			$(window).bind("resize.fb", $.fancybox.resize);

			if (currentOpts.centerOnScroll) {
				$(window).bind("scroll.fb", $.fancybox.center);
			}

			if (currentOpts.type == 'iframe') {
				$('<iframe id="fancybox-frame" name="fancybox-frame' + new Date().getTime() + '" frameborder="0" hspace="0" ' + ($.browser.msie ? 'allowtransparency="true""' : '') + ' scrolling="' + selectedOpts.scrolling + '" src="' + currentOpts.href + '"></iframe>').appendTo(content);
			}

			wrap.show();

			busy = false;

			$.fancybox.center();

			currentOpts.onComplete(currentArray, currentIndex, currentOpts);

			_preload_images();
		},

		_preload_images = function() {
			var href, 
				objNext;

			if ((currentArray.length -1) > currentIndex) {
				href = currentArray[ currentIndex + 1 ].href;

				if (typeof href !== 'undefined' && href.match(imgRegExp)) {
					objNext = new Image();
					objNext.src = href;
				}
			}

			if (currentIndex > 0) {
				href = currentArray[ currentIndex - 1 ].href;

				if (typeof href !== 'undefined' && href.match(imgRegExp)) {
					objNext = new Image();
					objNext.src = href;
				}
			}
		},

		_draw = function(pos) {
			var dim = {
				width : parseInt(start_pos.width + (final_pos.width - start_pos.width) * pos, 10),
				height : parseInt(start_pos.height + (final_pos.height - start_pos.height) * pos, 10),

				top : parseInt(start_pos.top + (final_pos.top - start_pos.top) * pos, 10),
				left : parseInt(start_pos.left + (final_pos.left - start_pos.left) * pos, 10)
			};

			if (typeof final_pos.opacity !== 'undefined') {
				dim.opacity = pos < 0.5 ? 0.5 : pos;
			}

			wrap.css(dim);

			content.css({
				'width' : dim.width - currentOpts.padding * 2,
				'height' : dim.height - (titleHeight * pos) - currentOpts.padding * 2
			});
		},

		_get_viewport = function() {
			return [
				$(window).width() - (currentOpts.margin * 2),
				$(window).height() - (currentOpts.margin * 2),
				$(document).scrollLeft() + currentOpts.margin,
				$(document).scrollTop() + currentOpts.margin
			];
		},

		_get_zoom_to = function () {
			var view = _get_viewport(),
				to = {},
				resize = currentOpts.autoScale,
				double_padding = currentOpts.padding * 2,
				ratio;

			if (currentOpts.width.toString().indexOf('%') > -1) {
				to.width = parseInt((view[0] * parseFloat(currentOpts.width)) / 100, 10);
			} else {
				to.width = currentOpts.width + double_padding;
			}

			if (currentOpts.height.toString().indexOf('%') > -1) {
				to.height = parseInt((view[1] * parseFloat(currentOpts.height)) / 100, 10);
			} else {
				to.height = currentOpts.height + double_padding;
			}

			if (resize && (to.width > view[0] || to.height > view[1])) {
				if (selectedOpts.type == 'image' || selectedOpts.type == 'swf') {
					ratio = (currentOpts.width ) / (currentOpts.height );

					if ((to.width ) > view[0]) {
						to.width = view[0];
						to.height = parseInt(((to.width - double_padding) / ratio) + double_padding, 10);
					}

					if ((to.height) > view[1]) {
						to.height = view[1];
						to.width = parseInt(((to.height - double_padding) * ratio) + double_padding, 10);
					}

				} else {
					to.width = Math.min(to.width, view[0]);
					to.height = Math.min(to.height, view[1]);
				}
			}

			to.top = parseInt(Math.max(view[3] - 20, view[3] + ((view[1] - to.height - 40) * 0.5)), 10);
			to.left = parseInt(Math.max(view[2] - 20, view[2] + ((view[0] - to.width - 40) * 0.5)), 10);

			return to;
		},

		_get_obj_pos = function(obj) {
			var pos = obj.offset();

			pos.top += parseInt( obj.css('paddingTop'), 10 ) || 0;
			pos.left += parseInt( obj.css('paddingLeft'), 10 ) || 0;

			pos.top += parseInt( obj.css('border-top-width'), 10 ) || 0;
			pos.left += parseInt( obj.css('border-left-width'), 10 ) || 0;

			pos.width = obj.width();
			pos.height = obj.height();

			return pos;
		},

		_get_zoom_from = function() {
			var orig = selectedOpts.orig ? $(selectedOpts.orig) : false,
				from = {},
				pos,
				view;

			if (orig && orig.length) {
				pos = _get_obj_pos(orig);

				from = {
					width : pos.width + (currentOpts.padding * 2),
					height : pos.height + (currentOpts.padding * 2),
					top	: pos.top - currentOpts.padding - 20,
					left : pos.left - currentOpts.padding - 20
				};

			} else {
				view = _get_viewport();

				from = {
					width : currentOpts.padding * 2,
					height : currentOpts.padding * 2,
					top	: parseInt(view[3] + view[1] * 0.5, 10),
					left : parseInt(view[2] + view[0] * 0.5, 10)
				};
			}

			return from;
		},

		_animate_loading = function() {
			if (!loading.is(':visible')){
				clearInterval(loadingTimer);
				return;
			}

			$('div', loading).css('top', (loadingFrame * -40) + 'px');

			loadingFrame = (loadingFrame + 1) % 12;
		};

	/*
	 * Public methods 
	 */

	$.fn.fancybox = function(options) {
		if (!$(this).length) {
			return this;
		}

		$(this)
			.data('fancybox', $.extend({}, options, ($.metadata ? $(this).metadata() : {})))
			.unbind('click.fb')
			.bind('click.fb', function(e) {
				e.preventDefault();

				if (busy) {
					return;
				}

				busy = true;

				$(this).blur();

				selectedArray = [];
				selectedIndex = 0;

				var rel = $(this).attr('rel') || '';

				if (!rel || rel == '' || rel === 'nofollow') {
					selectedArray.push(this);

				} else {
					selectedArray = $("a[rel=" + rel + "], area[rel=" + rel + "]");
					selectedIndex = selectedArray.index( this );
				}

				_start();

				return;
			});

		return this;
	};

	$.fancybox = function(obj) {
		var opts;

		if (busy) {
			return;
		}

		busy = true;
		opts = typeof arguments[1] !== 'undefined' ? arguments[1] : {};

		selectedArray = [];
		selectedIndex = parseInt(opts.index, 10) || 0;

		if ($.isArray(obj)) {
			for (var i = 0, j = obj.length; i < j; i++) {
				if (typeof obj[i] == 'object') {
					$(obj[i]).data('fancybox', $.extend({}, opts, obj[i]));
				} else {
					obj[i] = $({}).data('fancybox', $.extend({content : obj[i]}, opts));
				}
			}

			selectedArray = jQuery.merge(selectedArray, obj);

		} else {
			if (typeof obj == 'object') {
				$(obj).data('fancybox', $.extend({}, opts, obj));
			} else {
				obj = $({}).data('fancybox', $.extend({content : obj}, opts));
			}

			selectedArray.push(obj);
		}

		if (selectedIndex > selectedArray.length || selectedIndex < 0) {
			selectedIndex = 0;
		}

		_start();
	};

	$.fancybox.showActivity = function() {
		clearInterval(loadingTimer);

		loading.show();
		loadingTimer = setInterval(_animate_loading, 66);
	};

	$.fancybox.hideActivity = function() {
		loading.hide();
	};

	$.fancybox.next = function() {
		return $.fancybox.pos( currentIndex + 1);
	};

	$.fancybox.prev = function() {
		return $.fancybox.pos( currentIndex - 1);
	};

	$.fancybox.pos = function(pos) {
		if (busy) {
			return;
		}

		pos = parseInt(pos);

		selectedArray = currentArray;

		if (pos > -1 && pos < currentArray.length) {
			selectedIndex = pos;
			_start();

		} else if (currentOpts.cyclic && currentArray.length > 1) {
			selectedIndex = pos >= currentArray.length ? 0 : currentArray.length - 1;
			_start();
		}

		return;
	};

	$.fancybox.cancel = function() {
		if (busy) {
			return;
		}

		busy = true;

		$.event.trigger('fancybox-cancel');

		_abort();

		selectedOpts.onCancel(selectedArray, selectedIndex, selectedOpts);

		busy = false;
	};

	// Note: within an iframe use - parent.$.fancybox.close();
	$.fancybox.close = function() {
		if (busy || wrap.is(':hidden')) {
			return;
		}

		busy = true;

		if (currentOpts && false === currentOpts.onCleanup(currentArray, currentIndex, currentOpts)) {
			busy = false;
			return;
		}

		_abort();

		$(close.add( nav_left ).add( nav_right )).hide();

		$(content.add( overlay )).unbind();

		$(window).unbind("resize.fb scroll.fb");
		$(document).unbind('keydown.fb');

		content.find('iframe').attr('src', isIE6 && /^https/i.test(window.location.href || '') ? 'javascript:void(false)' : 'about:blank');

		if (currentOpts.titlePosition !== 'inside') {
			title.empty();
		}

		wrap.stop();

		function _cleanup() {
			overlay.fadeOut('fast');

			title.empty().hide();
			wrap.hide();

			$.event.trigger('fancybox-cleanup');

			content.empty();

			currentOpts.onClosed(currentArray, currentIndex, currentOpts);

			currentArray = selectedOpts	= [];
			currentIndex = selectedIndex = 0;
			currentOpts = selectedOpts	= {};

			busy = false;
		}

		if (currentOpts.transitionOut == 'elastic') {
			start_pos = _get_zoom_from();

			var pos = wrap.position();

			final_pos = {
				top	 : pos.top ,
				left : pos.left,
				width :	wrap.width(),
				height : wrap.height()
			};

			if (currentOpts.opacity) {
				final_pos.opacity = 1;
			}

			title.empty().hide();

			fx.prop = 1;

			$(fx).animate({ prop: 0 }, {
				 duration : currentOpts.speedOut,
				 easing : currentOpts.easingOut,
				 step : _draw,
				 complete : _cleanup
			});

		} else {
			wrap.fadeOut( currentOpts.transitionOut == 'none' ? 0 : currentOpts.speedOut, _cleanup);
		}
	};

	$.fancybox.resize = function() {
		if (overlay.is(':visible')) {
			overlay.css('height', $(document).height());
		}

		$.fancybox.center(true);
	};

	$.fancybox.center = function() {
		var view, align;

		if (busy) {
			return;	
		}

		align = arguments[0] === true ? 1 : 0;
		view = _get_viewport();

		if (!align && (wrap.width() > view[0] || wrap.height() > view[1])) {
			return;	
		}

		wrap
			.stop()
			.animate({
				'top' : parseInt(Math.max(view[3] - 20, view[3] + ((view[1] - content.height() - 40) * 0.5) - currentOpts.padding)),
				'left' : parseInt(Math.max(view[2] - 20, view[2] + ((view[0] - content.width() - 40) * 0.5) - currentOpts.padding))
			}, typeof arguments[0] == 'number' ? arguments[0] : 200);
	};

	$.fancybox.init = function() {
		if ($("#fancybox-wrap").length) {
			return;
		}

		$('body').append(
			tmp	= $('<div id="fancybox-tmp"></div>'),
			loading	= $('<div id="fancybox-loading"><div></div></div>'),
			overlay	= $('<div id="fancybox-overlay"></div>'),
			wrap = $('<div id="fancybox-wrap"></div>')
		);

		outer = $('<div id="fancybox-outer"></div>')
			.append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>')
			.appendTo( wrap );

		outer.append(
			content = $('<div id="fancybox-content"></div>'),
			close = $('<a id="fancybox-close"></a>'),
			title = $('<div id="fancybox-title"></div>'),

			nav_left = $('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'),
			nav_right = $('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>')
		);

		close.click($.fancybox.close);
		loading.click($.fancybox.cancel);

		nav_left.click(function(e) {
			e.preventDefault();
			$.fancybox.prev();
		});

		nav_right.click(function(e) {
			e.preventDefault();
			$.fancybox.next();
		});

		if ($.fn.mousewheel) {
			wrap.bind('mousewheel.fb', function(e, delta) {
				if (busy) {
					e.preventDefault();

				} else if ($(e.target).get(0).clientHeight == 0 || $(e.target).get(0).scrollHeight === $(e.target).get(0).clientHeight) {
					e.preventDefault();
					$.fancybox[ delta > 0 ? 'prev' : 'next']();
				}
			});
		}

		if (!$.support.opacity) {
			wrap.addClass('fancybox-ie');
		}

		if (isIE6) {
			loading.addClass('fancybox-ie6');
			wrap.addClass('fancybox-ie6');

			$('<iframe id="fancybox-hide-sel-frame" src="' + (/^https/i.test(window.location.href || '') ? 'javascript:void(false)' : 'about:blank' ) + '" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(outer);
		}
	};

	$.fn.fancybox.defaults = {
		padding : 10,
		margin : 40,
		opacity : false,
		modal : false,
		cyclic : false,
		scrolling : 'auto',	// 'auto', 'yes' or 'no'

		width : 560,
		height : 340,

		autoScale : true,
		autoDimensions : true,
		centerOnScroll : false,

		ajax : {},
		swf : { wmode: 'transparent' },

		hideOnOverlayClick : true,
		hideOnContentClick : false,

		overlayShow : true,
		overlayOpacity : 0.7,
		overlayColor : '#777',

		titleShow : true,
		titlePosition : 'float', // 'float', 'outside', 'inside' or 'over'
		titleFormat : null,
		titleFromAlt : false,

		transitionIn : 'fade', // 'elastic', 'fade' or 'none'
		transitionOut : 'fade', // 'elastic', 'fade' or 'none'

		speedIn : 300,
		speedOut : 300,

		changeSpeed : 300,
		changeFade : 'fast',

		easingIn : 'swing',
		easingOut : 'swing',

		showCloseButton	 : true,
		showNavArrows : true,
		enableEscapeButton : true,
		enableKeyboardNav : true,

		onStart : function(){},
		onCancel : function(){},
		onComplete : function(){},
		onCleanup : function(){},
		onClosed : function(){},
		onError : function(){}
	};

	$(document).ready(function() {
		$.fancybox.init();
	});

})(jQuery);


(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/* ========================================================================
 * Bootstrap: transition.js v3.1.1
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd',
      'MozTransition'    : 'transitionend',
      'OTransition'      : 'oTransitionEnd otransitionend',
      'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.1.1
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent.trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.1.1
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options   = options
    this.$element  = $(element)
    this.$backdrop =
    this.isShown   = null

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one($.support.transition.end, function () {
            that.$element.focus().trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.focus().trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus()
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.focus()
      })
  })

  $(document)
    .on('show.bs.modal', '.modal', function () { $(document.body).addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.1.1
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle=dropdown]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)

      $this.focus()
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).focus()
      return $this.click()
    }

    var desc = ' li:not(.divider):visible a'
    var $items = $parent.find('[role=menu]' + desc + ', [role=listbox]' + desc)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).focus()
  }

  function clearMenus(e) {
    $(backdrop).remove()
    $(toggle).each(function () {
      var $parent = getParent($(this))
      var relatedTarget = { relatedTarget: this }
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu], [role=listbox]', Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.1.1
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var href
    var process  = $.proxy(this.process, this)

    this.$element       = $(element).is('body') ? $(window) : $(element)
    this.$body          = $('body')
    this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.offsets        = $([])
    this.targets        = $([])
    this.activeTarget   = null

    this.refresh()
    this.process()
  }

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

    this.offsets = $([])
    this.targets = $([])

    var self     = this
    var $targets = this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
    var maxScroll    = scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets.last()[0]) && this.activate(i)
    }

    if (activeTarget && scrollTop <= offsets[0]) {
      return activeTarget != (i = targets[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate( targets[i] )
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')

    var selector = this.selector +
        '[data-target="' + target + '"],' +
        this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.1.1
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.parent('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one($.support.transition.end, next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.1.1
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return
      var that = this;

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.hoverState = null

      var complete = function() {
        that.$element.trigger('shown.bs.' + that.type)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one($.support.transition.end, complete)
          .emulateTransitionEnd(150) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + '%') : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element.trigger('hidden.bs.' + that.type)
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth,
      height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    clearTimeout(this.timeout)
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.1.1
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content')[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.1.1
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (!data.resetText) $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
    e.preventDefault()
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.1.1
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')
        [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.1.1
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true
  }

  Carousel.prototype.cycle =  function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children()

    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) })
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    if ($next.hasClass('active')) return this.sliding = false

    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })
    this.$element.trigger(e)
    if (e.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      this.$element.one('slid.bs.carousel', function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
        $nextIndicator && $nextIndicator.addClass('active')
      })
    }

    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid.bs.carousel') }, 0)
        })
        .emulateTransitionEnd($active.css('transition-duration').slice(0, -1) * 1000)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger('slid.bs.carousel')
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: affix.js v3.1.1
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)
    this.$window = $(window)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      =
    this.unpin        =
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.RESET = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$window.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$window.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (this.affixed == 'top') position.top += scrollTop

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin) this.$element.css('top', '')

    var affixType = 'affix' + (affix ? '-' + affix : '')
    var e         = $.Event(affixType + '.bs.affix')

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

    this.$element
      .removeClass(Affix.RESET)
      .addClass(affixType)
      .trigger($.Event(affixType.replace('affix', 'affixed')))

    if (affix == 'bottom') {
      this.$element.offset({ top: scrollHeight - offsetBottom - this.$element.height() })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      $spy.affix(data)
    })
  })

}(jQuery);












function buildPrivatePub(doc) {
  var self = {
    connecting: false,
    fayeClient: null,
    fayeCallbacks: [],
    subscriptions: {},
    subscriptionCallbacks: {},

    faye: function(callback) {
      if (self.fayeClient) {
        callback(self.fayeClient);
      } else {
        self.fayeCallbacks.push(callback);
        if (self.subscriptions.server && !self.connecting) {
          self.connecting = true;
          var script = doc.createElement("script");
          script.type = "text/javascript";
          script.src = self.subscriptions.server + ".js";
          script.onload = self.connectToFaye;
          doc.documentElement.appendChild(script);
        }
      }
    },

    connectToFaye: function() {
      self.fayeClient = new Faye.Client(self.subscriptions.server);
      self.fayeClient.addExtension(self.fayeExtension);
      for (var i=0; i < self.fayeCallbacks.length; i++) {
        self.fayeCallbacks[i](self.fayeClient);
      };
    },

    fayeExtension: {
      outgoing: function(message, callback) {
        if (message.channel == "/meta/subscribe") {
          // Attach the signature and timestamp to subscription messages
          var subscription = self.subscriptions[message.subscription];
          if (!message.ext) message.ext = {};
          message.ext.private_pub_signature = subscription.signature;
          message.ext.private_pub_timestamp = subscription.timestamp;
        }
        callback(message);
      }
    },

    sign: function(options) {
      if (!self.subscriptions.server) {
        self.subscriptions.server = options.server;
      }
      self.subscriptions[options.channel] = options;
      self.faye(function(faye) {
        faye.subscribe(options.channel, self.handleResponse);
      });
    },

    handleResponse: function(message) {
      if (message.eval) {
        eval(message.eval);
      }
      if (callback = self.subscriptionCallbacks[message.channel]) {
        callback(message.data, message.channel);
      }
    },

    subscribe: function(channel, callback) {
      self.subscriptionCallbacks[channel] = callback;
    }
  };
  return self;
}

var PrivatePub = buildPrivatePub(document);
// This [jQuery](http://jquery.com/) plugin implements an `<iframe>`
// [transport](http://api.jquery.com/extending-ajax/#Transports) so that
// `$.ajax()` calls support the uploading of files using standard HTML file
// input fields. This is done by switching the exchange from `XMLHttpRequest`
// to a hidden `iframe` element containing a form that is submitted.

// The [source for the plugin](http://github.com/cmlenz/jquery-iframe-transport)
// is available on [Github](http://github.com/) and dual licensed under the MIT
// or GPL Version 2 licenses.

// ## Usage

// To use this plugin, you simply add an `iframe` option with the value `true`
// to the Ajax settings an `$.ajax()` call, and specify the file fields to
// include in the submssion using the `files` option, which can be a selector,
// jQuery object, or a list of DOM elements containing one or more
// `<input type="file">` elements:

//     $("#myform").submit(function() {
//         $.ajax(this.action, {
//             files: $(":file", this),
//             iframe: true
//         }).complete(function(data) {
//             console.log(data);
//         });
//     });

// The plugin will construct hidden `<iframe>` and `<form>` elements, add the
// file field(s) to that form, submit the form, and process the response.

// If you want to include other form fields in the form submission, include
// them in the `data` option, and set the `processData` option to `false`:

//     $("#myform").submit(function() {
//         $.ajax(this.action, {
//             data: $(":text", this).serializeArray(),
//             files: $(":file", this),
//             iframe: true,
//             processData: false
//         }).complete(function(data) {
//             console.log(data);
//         });
//     });

// ### Response Data Types

// As the transport does not have access to the HTTP headers of the server
// response, it is not as simple to make use of the automatic content type
// detection provided by jQuery as with regular XHR. If you can't set the
// expected response data type (for example because it may vary depending on
// the outcome of processing by the server), you will need to employ a
// workaround on the server side: Send back an HTML document containing just a
// `<textarea>` element with a `data-type` attribute that specifies the MIME
// type, and put the actual payload in the textarea:

//     <textarea data-type="application/json">
//       {"ok": true, "message": "Thanks so much"}
//     </textarea>

// The iframe transport plugin will detect this and pass the value of the
// `data-type` attribute on to jQuery as if it was the "Content-Type" response
// header, thereby enabling the same kind of conversions that jQuery applies
// to regular responses. For the example above you should get a Javascript
// object as the `data` parameter of the `complete` callback, with the
// properties `ok: true` and `message: "Thanks so much"`.

// ### Handling Server Errors

// Another problem with using an `iframe` for file uploads is that it is
// impossible for the javascript code to determine the HTTP status code of the
// servers response. Effectively, all of the calls you make will look like they
// are getting successful responses, and thus invoke the `done()` or
// `complete()` callbacks. You can only determine communicate problems using
// the content of the response payload. For example, consider using a JSON
// response such as the following to indicate a problem with an uploaded file:

//     <textarea data-type="application/json">
//       {"ok": false, "message": "Please only upload reasonably sized files."}
//     </textarea>

// ### Compatibility

// This plugin has primarily been tested on Safari 5 (or later), Firefox 4 (or
// later), and Internet Explorer (all the way back to version 6). While I
// haven't found any issues with it so far, I'm fairly sure it still doesn't
// work around all the quirks in all different browsers. But the code is still
// pretty simple overall, so you should be able to fix it and contribute a
// patch :)

// ## Annotated Source

(function($, undefined) {
  "use strict";

  // Register a prefilter that checks whether the `iframe` option is set, and
  // switches to the "iframe" data type if it is `true`.
  $.ajaxPrefilter(function(options, origOptions, jqXHR) {
    if (options.iframe) {
      return "iframe";
    }
  });

  // Register a transport for the "iframe" data type. It will only activate
  // when the "files" option has been set to a non-empty list of enabled file
  // inputs.
  $.ajaxTransport("iframe", function(options, origOptions, jqXHR) {
    var form = null,
        iframe = null,
        name = "iframe-" + $.now(),
        files = $(options.files).filter(":file:enabled"),
        markers = null,
        accepts;

    // This function gets called after a successful submission or an abortion
    // and should revert all changes made to the page to enable the
    // submission via this transport.
    function cleanUp() {
      markers.prop('disabled', false);
      form.remove();
      iframe.bind("load", function() { iframe.remove(); });
      iframe.attr("src", "javascript:false;");
    }

    // Remove "iframe" from the data types list so that further processing is
    // based on the content type returned by the server, without attempting an
    // (unsupported) conversion from "iframe" to the actual type.
    options.dataTypes.shift();

    if (files.length) {
      form = $("<form enctype='multipart/form-data' method='post'></form>").
        hide().attr({action: options.url, target: name});

      // If there is any additional data specified via the `data` option,
      // we add it as hidden fields to the form. This (currently) requires
      // the `processData` option to be set to false so that the data doesn't
      // get serialized to a string.
      if (typeof(options.data) === "string" && options.data.length > 0) {
        $.error("data must not be serialized");
      }
      $.each(options.data || {}, function(name, value) {
        if ($.isPlainObject(value)) {
          name = value.name;
          value = value.value;
        }
        $("<input type='hidden' />").attr({name:  name, value: value}).
          appendTo(form);
      });

      // Add a hidden `X-Requested-With` field with the value `IFrame` to the
      // field, to help server-side code to determine that the upload happened
      // through this transport.
      $("<input type='hidden' value='IFrame' name='X-Requested-With' />").
        appendTo(form);

      // Borrowed straight from the JQuery source
      // Provides a way of specifying the accepted data type similar to HTTP_ACCEPTS
      accepts = options.dataTypes[ 0 ] && options.accepts[ options.dataTypes[0] ] ?
        options.accepts[ options.dataTypes[0] ] + ( options.dataTypes[ 0 ] !== "*" ? ", */*; q=0.01" : "" ) :
        options.accepts[ "*" ]

      $("<input type='hidden' name='X-Http-Accept'>")
        .attr("value", accepts).appendTo(form);

      // Move the file fields into the hidden form, but first remember their
      // original locations in the document by replacing them with disabled
      // clones. This should also avoid introducing unwanted changes to the
      // page layout during submission.
      markers = files.after(function(idx) {
        return $(this).clone().prop("disabled", true);
      }).next();
      files.appendTo(form);

      return {

        // The `send` function is called by jQuery when the request should be
        // sent.
        send: function(headers, completeCallback) {
          iframe = $("<iframe src='javascript:false;' name='" + name +
            "' id='" + name + "' style='display:none'></iframe>");

          // The first load event gets fired after the iframe has been injected
          // into the DOM, and is used to prepare the actual submission.
          iframe.bind("load", function() {

            // The second load event gets fired when the response to the form
            // submission is received. The implementation detects whether the
            // actual payload is embedded in a `<textarea>` element, and
            // prepares the required conversions to be made in that case.
            iframe.unbind("load").bind("load", function() {
              var doc = this.contentWindow ? this.contentWindow.document :
                (this.contentDocument ? this.contentDocument : this.document),
                root = doc.documentElement ? doc.documentElement : doc.body,
                textarea = root.getElementsByTagName("textarea")[0],
                type = textarea && textarea.getAttribute("data-type") || null,
                status = textarea && textarea.getAttribute("data-status") || 200,
                statusText = textarea && textarea.getAttribute("data-statusText") || "OK",
                content = {
                  html: root.innerHTML,
                  text: type ?
                    textarea.value :
                    root ? (root.textContent || root.innerText) : null
                };
              cleanUp();
              if (!jqXHR.responseText) {
                jqXHR.responseText = content.text;
              }
              completeCallback(status, statusText, content, type ?
                ("Content-Type: " + type) :
                null);
            });

            // Now that the load handler has been set up, submit the form.
            form[0].submit();
          });

          // After everything has been set up correctly, the form and iframe
          // get injected into the DOM so that the submission can be
          // initiated.
          $("body").append(form, iframe);
        },

        // The `abort` function is called by jQuery when the request should be
        // aborted.
        abort: function() {
          if (iframe !== null) {
            iframe.unbind("load").attr("src", "javascript:false;");
            cleanUp();
          }
        }

      };
    }
  });

})(jQuery);



(function($) {

  var remotipart;

  $.remotipart = remotipart = {

    setup: function(form) {
      // Preserve form.data('ujs:submit-button') before it gets nulled by $.ajax.handleRemote
      var button = form.data('ujs:submit-button'),
          csrfParam = $('meta[name="csrf-param"]').attr('content'),
          csrfToken = $('meta[name="csrf-token"]').attr('content'),
          csrfInput = form.find('input[name="' + csrfParam + '"]').length;

      form
        // Allow setup part of $.rails.handleRemote to setup remote settings before canceling default remote handler
        // This is required in order to change the remote settings using the form details
        .one('ajax:beforeSend.remotipart', function(e, xhr, settings){
          // Delete the beforeSend bindings, since we're about to re-submit via ajaxSubmit with the beforeSubmit
          // hook that was just setup and triggered via the default `$.rails.handleRemote`
          // delete settings.beforeSend;
          delete settings.beforeSend;

          settings.iframe      = true;
          settings.files       = $($.rails.fileInputSelector, form);
          settings.data        = form.serializeArray();

          // Insert the name/value of the clicked submit button, if any
          if (button)
            settings.data.push(button);

          // jQuery 1.9 serializeArray() contains input:file entries
          // so exclude them from settings.data, otherwise files will not be sent
          settings.files.each(function(i, file){
            for (var j = settings.data.length - 1; j >= 0; j--)
              if (settings.data[j].name == file.name)
                settings.data.splice(j, 1);
          })

          settings.processData = false;

          // Modify some settings to integrate JS request with rails helpers and middleware
          if (settings.dataType === undefined) { settings.dataType = 'script *'; }
          settings.data.push({name: 'remotipart_submitted', value: true});
          if (csrfToken && csrfParam && !csrfInput) {
            settings.data.push({name: csrfParam, value: csrfToken});
          }

          // Allow remotipartSubmit to be cancelled if needed
          if ($.rails.fire(form, 'ajax:remotipartSubmit', [xhr, settings])) {
            // Second verse, same as the first
            $.rails.ajax(settings);
            setTimeout(function(){ $.rails.disableFormElements(form); }, 20);
          }

          //Run cleanup
          remotipart.teardown(form);

          // Cancel the jQuery UJS request
          return false;
        })

        // Keep track that we just set this particular form with Remotipart bindings
        // Note: The `true` value will get over-written with the `settings.dataType` from the `ajax:beforeSend` handler
        .data('remotipartSubmitted', true);
    },

    teardown: function(form) {
      form
        .unbind('ajax:beforeSend.remotipart')
        .removeData('remotipartSubmitted')
    }
  };

  $(document).on('ajax:aborted:file', 'form', function(){
    var form = $(this);

    remotipart.setup(form);

    // Manually call jquery-ujs remote call so that it can setup form and settings as usual,
    // and trigger the `ajax:beforeSend` callback to which remotipart binds functionality.
    $.rails.handleRemote(form);
    return false;
  });

})(jQuery);
/**
 * jquery.Jcrop.min.js v0.9.10 (build:20130117)
 * jQuery Image Cropping Plugin - released under MIT License
 * Copyright (c) 2008-2012 Tapmodo Interactive LLC
 * https://github.com/tapmodo/Jcrop
 */

(function(a){a.Jcrop=function(b,c){function i(a){return Math.round(a)+"px"}function j(a){return d.baseClass+"-"+a}function k(){return a.fx.step.hasOwnProperty("backgroundColor")}function l(b){var c=a(b).offset();return[c.left,c.top]}function m(a){return[a.pageX-e[0],a.pageY-e[1]]}function n(b){typeof b!="object"&&(b={}),d=a.extend(d,b),a.each(["onChange","onSelect","onRelease","onDblClick"],function(a,b){typeof d[b]!="function"&&(d[b]=function(){})})}function o(a,b,c){e=l(D),bc.setCursor(a==="move"?a:a+"-resize");if(a==="move")return bc.activateHandlers(q(b),v,c);var d=_.getFixed(),f=r(a),g=_.getCorner(r(f));_.setPressed(_.getCorner(f)),_.setCurrent(g),bc.activateHandlers(p(a,d),v,c)}function p(a,b){return function(c){if(!d.aspectRatio)switch(a){case"e":c[1]=b.y2;break;case"w":c[1]=b.y2;break;case"n":c[0]=b.x2;break;case"s":c[0]=b.x2}else switch(a){case"e":c[1]=b.y+1;break;case"w":c[1]=b.y+1;break;case"n":c[0]=b.x+1;break;case"s":c[0]=b.x+1}_.setCurrent(c),bb.update()}}function q(a){var b=a;return bd.watchKeys
(),function(a){_.moveOffset([a[0]-b[0],a[1]-b[1]]),b=a,bb.update()}}function r(a){switch(a){case"n":return"sw";case"s":return"nw";case"e":return"nw";case"w":return"ne";case"ne":return"sw";case"nw":return"se";case"se":return"nw";case"sw":return"ne"}}function s(a){return function(b){return d.disabled?!1:a==="move"&&!d.allowMove?!1:(e=l(D),W=!0,o(a,m(b)),b.stopPropagation(),b.preventDefault(),!1)}}function t(a,b,c){var d=a.width(),e=a.height();d>b&&b>0&&(d=b,e=b/a.width()*a.height()),e>c&&c>0&&(e=c,d=c/a.height()*a.width()),T=a.width()/d,U=a.height()/e,a.width(d).height(e)}function u(a){return{x:a.x*T,y:a.y*U,x2:a.x2*T,y2:a.y2*U,w:a.w*T,h:a.h*U}}function v(a){var b=_.getFixed();b.w>d.minSelect[0]&&b.h>d.minSelect[1]?(bb.enableHandles(),bb.done()):bb.release(),bc.setCursor(d.allowSelect?"crosshair":"default")}function w(a){if(d.disabled)return!1;if(!d.allowSelect)return!1;W=!0,e=l(D),bb.disableHandles(),bc.setCursor("crosshair");var b=m(a);return _.setPressed(b),bb.update(),bc.activateHandlers(x,v,a.type.substring
(0,5)==="touch"),bd.watchKeys(),a.stopPropagation(),a.preventDefault(),!1}function x(a){_.setCurrent(a),bb.update()}function y(){var b=a("<div></div>").addClass(j("tracker"));return g&&b.css({opacity:0,backgroundColor:"white"}),b}function be(a){G.removeClass().addClass(j("holder")).addClass(a)}function bf(a,b){function t(){window.setTimeout(u,l)}var c=a[0]/T,e=a[1]/U,f=a[2]/T,g=a[3]/U;if(X)return;var h=_.flipCoords(c,e,f,g),i=_.getFixed(),j=[i.x,i.y,i.x2,i.y2],k=j,l=d.animationDelay,m=h[0]-j[0],n=h[1]-j[1],o=h[2]-j[2],p=h[3]-j[3],q=0,r=d.swingSpeed;c=k[0],e=k[1],f=k[2],g=k[3],bb.animMode(!0);var s,u=function(){return function(){q+=(100-q)/r,k[0]=Math.round(c+q/100*m),k[1]=Math.round(e+q/100*n),k[2]=Math.round(f+q/100*o),k[3]=Math.round(g+q/100*p),q>=99.8&&(q=100),q<100?(bh(k),t()):(bb.done(),bb.animMode(!1),typeof b=="function"&&b.call(bs))}}();t()}function bg(a){bh([a[0]/T,a[1]/U,a[2]/T,a[3]/U]),d.onSelect.call(bs,u(_.getFixed())),bb.enableHandles()}function bh(a){_.setPressed([a[0],a[1]]),_.setCurrent([a[2],
a[3]]),bb.update()}function bi(){return u(_.getFixed())}function bj(){return _.getFixed()}function bk(a){n(a),br()}function bl(){d.disabled=!0,bb.disableHandles(),bb.setCursor("default"),bc.setCursor("default")}function bm(){d.disabled=!1,br()}function bn(){bb.done(),bc.activateHandlers(null,null)}function bo(){G.remove(),A.show(),A.css("visibility","visible"),a(b).removeData("Jcrop")}function bp(a,b){bb.release(),bl();var c=new Image;c.onload=function(){var e=c.width,f=c.height,g=d.boxWidth,h=d.boxHeight;D.width(e).height(f),D.attr("src",a),H.attr("src",a),t(D,g,h),E=D.width(),F=D.height(),H.width(E).height(F),M.width(E+L*2).height(F+L*2),G.width(E).height(F),ba.resize(E,F),bm(),typeof b=="function"&&b.call(bs)},c.src=a}function bq(a,b,c){var e=b||d.bgColor;d.bgFade&&k()&&d.fadeTime&&!c?a.animate({backgroundColor:e},{queue:!1,duration:d.fadeTime}):a.css("backgroundColor",e)}function br(a){d.allowResize?a?bb.enableOnly():bb.enableHandles():bb.disableHandles(),bc.setCursor(d.allowSelect?"crosshair":"default"),bb
.setCursor(d.allowMove?"move":"default"),d.hasOwnProperty("trueSize")&&(T=d.trueSize[0]/E,U=d.trueSize[1]/F),d.hasOwnProperty("setSelect")&&(bg(d.setSelect),bb.done(),delete d.setSelect),ba.refresh(),d.bgColor!=N&&(bq(d.shade?ba.getShades():G,d.shade?d.shadeColor||d.bgColor:d.bgColor),N=d.bgColor),O!=d.bgOpacity&&(O=d.bgOpacity,d.shade?ba.refresh():bb.setBgOpacity(O)),P=d.maxSize[0]||0,Q=d.maxSize[1]||0,R=d.minSize[0]||0,S=d.minSize[1]||0,d.hasOwnProperty("outerImage")&&(D.attr("src",d.outerImage),delete d.outerImage),bb.refresh()}var d=a.extend({},a.Jcrop.defaults),e,f=navigator.userAgent.toLowerCase(),g=/msie/.test(f),h=/msie [1-6]\./.test(f);typeof b!="object"&&(b=a(b)[0]),typeof c!="object"&&(c={}),n(c);var z={border:"none",visibility:"visible",margin:0,padding:0,position:"absolute",top:0,left:0},A=a(b),B=!0;if(b.tagName=="IMG"){if(A[0].width!=0&&A[0].height!=0)A.width(A[0].width),A.height(A[0].height);else{var C=new Image;C.src=A[0].src,A.width(C.width),A.height(C.height)}var D=A.clone().removeAttr("id").
css(z).show();D.width(A.width()),D.height(A.height()),A.after(D).hide()}else D=A.css(z).show(),B=!1,d.shade===null&&(d.shade=!0);t(D,d.boxWidth,d.boxHeight);var E=D.width(),F=D.height(),G=a("<div />").width(E).height(F).addClass(j("holder")).css({position:"relative",backgroundColor:d.bgColor}).insertAfter(A).append(D);d.addClass&&G.addClass(d.addClass);var H=a("<div />"),I=a("<div />").width("100%").height("100%").css({zIndex:310,position:"absolute",overflow:"hidden"}),J=a("<div />").width("100%").height("100%").css("zIndex",320),K=a("<div />").css({position:"absolute",zIndex:600}).dblclick(function(){var a=_.getFixed();d.onDblClick.call(bs,a)}).insertBefore(D).append(I,J);B&&(H=a("<img />").attr("src",D.attr("src")).css(z).width(E).height(F),I.append(H)),h&&K.css({overflowY:"hidden"});var L=d.boundary,M=y().width(E+L*2).height(F+L*2).css({position:"absolute",top:i(-L),left:i(-L),zIndex:290}).mousedown(w),N=d.bgColor,O=d.bgOpacity,P,Q,R,S,T,U,V=!0,W,X,Y;e=l(D);var Z=function(){function a(){var a={},b=["touchstart"
,"touchmove","touchend"],c=document.createElement("div"),d;try{for(d=0;d<b.length;d++){var e=b[d];e="on"+e;var f=e in c;f||(c.setAttribute(e,"return;"),f=typeof c[e]=="function"),a[b[d]]=f}return a.touchstart&&a.touchend&&a.touchmove}catch(g){return!1}}function b(){return d.touchSupport===!0||d.touchSupport===!1?d.touchSupport:a()}return{createDragger:function(a){return function(b){return d.disabled?!1:a==="move"&&!d.allowMove?!1:(e=l(D),W=!0,o(a,m(Z.cfilter(b)),!0),b.stopPropagation(),b.preventDefault(),!1)}},newSelection:function(a){return w(Z.cfilter(a))},cfilter:function(a){return a.pageX=a.originalEvent.changedTouches[0].pageX,a.pageY=a.originalEvent.changedTouches[0].pageY,a},isSupported:a,support:b()}}(),_=function(){function h(d){d=n(d),c=a=d[0],e=b=d[1]}function i(a){a=n(a),f=a[0]-c,g=a[1]-e,c=a[0],e=a[1]}function j(){return[f,g]}function k(d){var f=d[0],g=d[1];0>a+f&&(f-=f+a),0>b+g&&(g-=g+b),F<e+g&&(g+=F-(e+g)),E<c+f&&(f+=E-(c+f)),a+=f,c+=f,b+=g,e+=g}function l(a){var b=m();switch(a){case"ne":return[
b.x2,b.y];case"nw":return[b.x,b.y];case"se":return[b.x2,b.y2];case"sw":return[b.x,b.y2]}}function m(){if(!d.aspectRatio)return p();var f=d.aspectRatio,g=d.minSize[0]/T,h=d.maxSize[0]/T,i=d.maxSize[1]/U,j=c-a,k=e-b,l=Math.abs(j),m=Math.abs(k),n=l/m,r,s,t,u;return h===0&&(h=E*10),i===0&&(i=F*10),n<f?(s=e,t=m*f,r=j<0?a-t:t+a,r<0?(r=0,u=Math.abs((r-a)/f),s=k<0?b-u:u+b):r>E&&(r=E,u=Math.abs((r-a)/f),s=k<0?b-u:u+b)):(r=c,u=l/f,s=k<0?b-u:b+u,s<0?(s=0,t=Math.abs((s-b)*f),r=j<0?a-t:t+a):s>F&&(s=F,t=Math.abs(s-b)*f,r=j<0?a-t:t+a)),r>a?(r-a<g?r=a+g:r-a>h&&(r=a+h),s>b?s=b+(r-a)/f:s=b-(r-a)/f):r<a&&(a-r<g?r=a-g:a-r>h&&(r=a-h),s>b?s=b+(a-r)/f:s=b-(a-r)/f),r<0?(a-=r,r=0):r>E&&(a-=r-E,r=E),s<0?(b-=s,s=0):s>F&&(b-=s-F,s=F),q(o(a,b,r,s))}function n(a){return a[0]<0&&(a[0]=0),a[1]<0&&(a[1]=0),a[0]>E&&(a[0]=E),a[1]>F&&(a[1]=F),[Math.round(a[0]),Math.round(a[1])]}function o(a,b,c,d){var e=a,f=c,g=b,h=d;return c<a&&(e=c,f=a),d<b&&(g=d,h=b),[e,g,f,h]}function p(){var d=c-a,f=e-b,g;return P&&Math.abs(d)>P&&(c=d>0?a+P:a-P),Q&&Math.abs
(f)>Q&&(e=f>0?b+Q:b-Q),S/U&&Math.abs(f)<S/U&&(e=f>0?b+S/U:b-S/U),R/T&&Math.abs(d)<R/T&&(c=d>0?a+R/T:a-R/T),a<0&&(c-=a,a-=a),b<0&&(e-=b,b-=b),c<0&&(a-=c,c-=c),e<0&&(b-=e,e-=e),c>E&&(g=c-E,a-=g,c-=g),e>F&&(g=e-F,b-=g,e-=g),a>E&&(g=a-F,e-=g,b-=g),b>F&&(g=b-F,e-=g,b-=g),q(o(a,b,c,e))}function q(a){return{x:a[0],y:a[1],x2:a[2],y2:a[3],w:a[2]-a[0],h:a[3]-a[1]}}var a=0,b=0,c=0,e=0,f,g;return{flipCoords:o,setPressed:h,setCurrent:i,getOffset:j,moveOffset:k,getCorner:l,getFixed:m}}(),ba=function(){function f(a,b){e.left.css({height:i(b)}),e.right.css({height:i(b)})}function g(){return h(_.getFixed())}function h(a){e.top.css({left:i(a.x),width:i(a.w),height:i(a.y)}),e.bottom.css({top:i(a.y2),left:i(a.x),width:i(a.w),height:i(F-a.y2)}),e.right.css({left:i(a.x2),width:i(E-a.x2)}),e.left.css({width:i(a.x)})}function j(){return a("<div />").css({position:"absolute",backgroundColor:d.shadeColor||d.bgColor}).appendTo(c)}function k(){b||(b=!0,c.insertBefore(D),g(),bb.setBgOpacity(1,0,1),H.hide(),l(d.shadeColor||d.bgColor,1),bb.
isAwake()?n(d.bgOpacity,1):n(1,1))}function l(a,b){bq(p(),a,b)}function m(){b&&(c.remove(),H.show(),b=!1,bb.isAwake()?bb.setBgOpacity(d.bgOpacity,1,1):(bb.setBgOpacity(1,1,1),bb.disableHandles()),bq(G,0,1))}function n(a,e){b&&(d.bgFade&&!e?c.animate({opacity:1-a},{queue:!1,duration:d.fadeTime}):c.css({opacity:1-a}))}function o(){d.shade?k():m(),bb.isAwake()&&n(d.bgOpacity)}function p(){return c.children()}var b=!1,c=a("<div />").css({position:"absolute",zIndex:240,opacity:0}),e={top:j(),left:j().height(F),right:j().height(F),bottom:j()};return{update:g,updateRaw:h,getShades:p,setBgColor:l,enable:k,disable:m,resize:f,refresh:o,opacity:n}}(),bb=function(){function k(b){var c=a("<div />").css({position:"absolute",opacity:d.borderOpacity}).addClass(j(b));return I.append(c),c}function l(b,c){var d=a("<div />").mousedown(s(b)).css({cursor:b+"-resize",position:"absolute",zIndex:c}).addClass("ord-"+b);return Z.support&&d.bind("touchstart.jcrop",Z.createDragger(b)),J.append(d),d}function m(a){var b=d.handleSize;return l
(a,c++).css({opacity:d.handleOpacity}).width(b).height(b).addClass(j("handle"))}function n(a){return l(a,c++).addClass("jcrop-dragbar")}function o(a){var b;for(b=0;b<a.length;b++)g[a[b]]=n(a[b])}function p(a){var b,c;for(c=0;c<a.length;c++){switch(a[c]){case"n":b="hline";break;case"s":b="hline bottom";break;case"e":b="vline right";break;case"w":b="vline"}e[a[c]]=k(b)}}function q(a){var b;for(b=0;b<a.length;b++)f[a[b]]=m(a[b])}function r(a,b){d.shade||H.css({top:i(-b),left:i(-a)}),K.css({top:i(b),left:i(a)})}function t(a,b){K.width(Math.round(a)).height(Math.round(b))}function v(){var a=_.getFixed();_.setPressed([a.x,a.y]),_.setCurrent([a.x2,a.y2]),w()}function w(a){if(b)return x(a)}function x(a){var c=_.getFixed();t(c.w,c.h),r(c.x,c.y),d.shade&&ba.updateRaw(c),b||A(),a?d.onSelect.call(bs,u(c)):d.onChange.call(bs,u(c))}function z(a,c,e){if(!b&&!c)return;d.bgFade&&!e?D.animate({opacity:a},{queue:!1,duration:d.fadeTime}):D.css("opacity",a)}function A(){K.show(),d.shade?ba.opacity(O):z(O,!0),b=!0}function B(){F(),
K.hide(),d.shade?ba.opacity(1):z(1),b=!1,d.onRelease.call(bs)}function C(){h&&J.show()}function E(){h=!0;if(d.allowResize)return J.show(),!0}function F(){h=!1,J.hide()}function G(a){a?(X=!0,F()):(X=!1,E())}function L(){G(!1),v()}var b,c=370,e={},f={},g={},h=!1;d.dragEdges&&a.isArray(d.createDragbars)&&o(d.createDragbars),a.isArray(d.createHandles)&&q(d.createHandles),d.drawBorders&&a.isArray(d.createBorders)&&p(d.createBorders),a(document).bind("touchstart.jcrop-ios",function(b){a(b.currentTarget).hasClass("jcrop-tracker")&&b.stopPropagation()});var M=y().mousedown(s("move")).css({cursor:"move",position:"absolute",zIndex:360});return Z.support&&M.bind("touchstart.jcrop",Z.createDragger("move")),I.append(M),F(),{updateVisible:w,update:x,release:B,refresh:v,isAwake:function(){return b},setCursor:function(a){M.css("cursor",a)},enableHandles:E,enableOnly:function(){h=!0},showHandles:C,disableHandles:F,animMode:G,setBgOpacity:z,done:L}}(),bc=function(){function f(b){M.css({zIndex:450}),b?a(document).bind("touchmove.jcrop"
,k).bind("touchend.jcrop",l):e&&a(document).bind("mousemove.jcrop",h).bind("mouseup.jcrop",i)}function g(){M.css({zIndex:290}),a(document).unbind(".jcrop")}function h(a){return b(m(a)),!1}function i(a){return a.preventDefault(),a.stopPropagation(),W&&(W=!1,c(m(a)),bb.isAwake()&&d.onSelect.call(bs,u(_.getFixed())),g(),b=function(){},c=function(){}),!1}function j(a,d,e){return W=!0,b=a,c=d,f(e),!1}function k(a){return b(m(Z.cfilter(a))),!1}function l(a){return i(Z.cfilter(a))}function n(a){M.css("cursor",a)}var b=function(){},c=function(){},e=d.trackDocument;return e||M.mousemove(h).mouseup(i).mouseout(i),D.before(M),{activateHandlers:j,setCursor:n}}(),bd=function(){function e(){d.keySupport&&(b.show(),b.focus())}function f(a){b.hide()}function g(a,b,c){d.allowMove&&(_.moveOffset([b,c]),bb.updateVisible(!0)),a.preventDefault(),a.stopPropagation()}function i(a){if(a.ctrlKey||a.metaKey)return!0;Y=a.shiftKey?!0:!1;var b=Y?10:1;switch(a.keyCode){case 37:g(a,-b,0);break;case 39:g(a,b,0);break;case 38:g(a,0,-b);break;
case 40:g(a,0,b);break;case 27:d.allowSelect&&bb.release();break;case 9:return!0}return!1}var b=a('<input type="radio" />').css({position:"fixed",left:"-120px",width:"12px"}).addClass("jcrop-keymgr"),c=a("<div />").css({position:"absolute",overflow:"hidden"}).append(b);return d.keySupport&&(b.keydown(i).blur(f),h||!d.fixedSupport?(b.css({position:"absolute",left:"-20px"}),c.append(b).insertBefore(D)):b.insertBefore(D)),{watchKeys:e}}();Z.support&&M.bind("touchstart.jcrop",Z.newSelection),J.hide(),br(!0);var bs={setImage:bp,animateTo:bf,setSelect:bg,setOptions:bk,tellSelect:bi,tellScaled:bj,setClass:be,disable:bl,enable:bm,cancel:bn,release:bb.release,destroy:bo,focus:bd.watchKeys,getBounds:function(){return[E*T,F*U]},getWidgetSize:function(){return[E,F]},getScaleFactor:function(){return[T,U]},getOptions:function(){return d},ui:{holder:G,selection:K}};return g&&G.bind("selectstart",function(){return!1}),A.data("Jcrop",bs),bs},a.fn.Jcrop=function(b,c){var d;return this.each(function(){if(a(this).data("Jcrop")){if(
b==="api")return a(this).data("Jcrop");a(this).data("Jcrop").setOptions(b)}else this.tagName=="IMG"?a.Jcrop.Loader(this,function(){a(this).css({display:"block",visibility:"hidden"}),d=a.Jcrop(this,b),a.isFunction(c)&&c.call(d)}):(a(this).css({display:"block",visibility:"hidden"}),d=a.Jcrop(this,b),a.isFunction(c)&&c.call(d))}),this},a.Jcrop.Loader=function(b,c,d){function g(){f.complete?(e.unbind(".jcloader"),a.isFunction(c)&&c.call(f)):window.setTimeout(g,50)}var e=a(b),f=e[0];e.bind("load.jcloader",g).bind("error.jcloader",function(b){e.unbind(".jcloader"),a.isFunction(d)&&d.call(f)}),f.complete&&a.isFunction(c)&&(e.unbind(".jcloader"),c.call(f))},a.Jcrop.defaults={allowSelect:!0,allowMove:!0,allowResize:!0,trackDocument:!0,baseClass:"jcrop",addClass:null,bgColor:"black",bgOpacity:.6,bgFade:!1,borderOpacity:.4,handleOpacity:.5,handleSize:7,aspectRatio:0,keySupport:!0,createHandles:["n","s","e","w","nw","ne","se","sw"],createDragbars:["n","s","e","w"],createBorders:["n","s","e","w"],drawBorders:!0,dragEdges:!0
,fixedSupport:!0,touchSupport:null,shade:null,boxWidth:0,boxHeight:0,boundary:2,fadeTime:400,animationDelay:20,swingSpeed:3,minSelect:[0,0],maxSize:[0,0],minSize:[0,0],onChange:function(){},onSelect:function(){},onDblClick:function(){},onRelease:function(){}}})(jQuery);
(function ($) {
  window.jcrop_api = null;

  window.init_papercrop = function() {
    $("div[id$=_cropbox]").each(function() {

      var attachment = $(this).attr("id").replace("_cropbox", "");
      var preview    = !!$("#" + attachment + "_crop_preview").length;
      var aspect     = $("input#" + attachment + "_aspect").val();
      var width      = $(this).width();

      update_crop = function(coords) {
        var preview_width, rx, ry;

        if (preview) {
          preview_width = $("#" + attachment + "_crop_preview_wrapper").width();

          rx = preview_width / coords.w;
          ry = preview_width / coords.h;

          $("img#" + attachment + "_crop_preview").css({
            width      : Math.round(rx * $("input[id$='_" + attachment + "_original_w']").val()) + "px",
            height     : Math.round((ry * $("input[id$='_" + attachment + "_original_h']").val()) / aspect) + "px",
            marginLeft : "-" + Math.round(rx * coords.x) + "px",
            marginTop  : "-" + Math.round((ry * coords.y) / aspect) + "px"
          });
        }

        $("#" + attachment + "_crop_x").val(Math.round(coords.x));
        $("#" + attachment + "_crop_y").val(Math.round(coords.y));
        $("#" + attachment + "_crop_w").val(Math.round(coords.w));
        $("#" + attachment + "_crop_h").val(Math.round(coords.h));
      };

      $(this).find("img").Jcrop({
        onChange    : update_crop,
        onSelect    : update_crop,
        setSelect   : [0, 0, 250, 250],
        aspectRatio : aspect,
        boxWidth    : $("input[id$='_" + attachment + "_box_w']").val()
      }, function() {
        jcrop_api = this;
      });
    });
  };

  $(document).ready(function() {
    init_papercrop();
  });

}(jQuery));

/*
 *
 * More info at [www.dropzonejs.com](http://www.dropzonejs.com)
 *
 * Copyright (c) 2012, Matias Meno
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */


(function() {
  var Dropzone, Emitter, camelize, contentLoaded, detectVerticalSquash, drawImageIOSFix, noop, without,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  noop = function() {};

  Emitter = (function() {
    function Emitter() {}

    Emitter.prototype.addEventListener = Emitter.prototype.on;

    Emitter.prototype.on = function(event, fn) {
      this._callbacks = this._callbacks || {};
      if (!this._callbacks[event]) {
        this._callbacks[event] = [];
      }
      this._callbacks[event].push(fn);
      return this;
    };

    Emitter.prototype.emit = function() {
      var args, callback, callbacks, event, _i, _len;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      this._callbacks = this._callbacks || {};
      callbacks = this._callbacks[event];
      if (callbacks) {
        for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
          callback = callbacks[_i];
          callback.apply(this, args);
        }
      }
      return this;
    };

    Emitter.prototype.removeListener = Emitter.prototype.off;

    Emitter.prototype.removeAllListeners = Emitter.prototype.off;

    Emitter.prototype.removeEventListener = Emitter.prototype.off;

    Emitter.prototype.off = function(event, fn) {
      var callback, callbacks, i, _i, _len;
      if (!this._callbacks || arguments.length === 0) {
        this._callbacks = {};
        return this;
      }
      callbacks = this._callbacks[event];
      if (!callbacks) {
        return this;
      }
      if (arguments.length === 1) {
        delete this._callbacks[event];
        return this;
      }
      for (i = _i = 0, _len = callbacks.length; _i < _len; i = ++_i) {
        callback = callbacks[i];
        if (callback === fn) {
          callbacks.splice(i, 1);
          break;
        }
      }
      return this;
    };

    return Emitter;

  })();

  Dropzone = (function(_super) {
    var extend, resolveOption;

    __extends(Dropzone, _super);

    Dropzone.prototype.Emitter = Emitter;


    /*
    This is a list of all available events you can register on a dropzone object.
    
    You can register an event handler like this:
    
        dropzone.on("dragEnter", function() { });
     */

    Dropzone.prototype.events = ["drop", "dragstart", "dragend", "dragenter", "dragover", "dragleave", "addedfile", "removedfile", "thumbnail", "error", "errormultiple", "processing", "processingmultiple", "uploadprogress", "totaluploadprogress", "sending", "sendingmultiple", "success", "successmultiple", "canceled", "canceledmultiple", "complete", "completemultiple", "reset", "maxfilesexceeded", "maxfilesreached", "queuecomplete"];

    Dropzone.prototype.defaultOptions = {
      url: null,
      method: "post",
      withCredentials: false,
      parallelUploads: 2,
      uploadMultiple: false,
      maxFilesize: 256,
      paramName: "file",
      createImageThumbnails: true,
      maxThumbnailFilesize: 10,
      thumbnailWidth: 120,
      thumbnailHeight: 120,
      filesizeBase: 1000,
      maxFiles: null,
      filesizeBase: 1000,
      params: {},
      clickable: true,
      ignoreHiddenFiles: true,
      acceptedFiles: null,
      acceptedMimeTypes: null,
      autoProcessQueue: true,
      autoQueue: true,
      addRemoveLinks: false,
      previewsContainer: null,
      capture: null,
      dictDefaultMessage: "Drop files here to upload",
      dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
      dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
      dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
      dictInvalidFileType: "You can't upload files of this type.",
      dictResponseError: "Server responded with {{statusCode}} code.",
      dictCancelUpload: "Cancel upload",
      dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
      dictRemoveFile: "Remove file",
      dictRemoveFileConfirmation: null,
      dictMaxFilesExceeded: "You can not upload any more files.",
      accept: function(file, done) {
        return done();
      },
      init: function() {
        return noop;
      },
      forceFallback: false,
      fallback: function() {
        var child, messageElement, span, _i, _len, _ref;
        this.element.className = "" + this.element.className + " dz-browser-not-supported";
        _ref = this.element.getElementsByTagName("div");
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          if (/(^| )dz-message($| )/.test(child.className)) {
            messageElement = child;
            child.className = "dz-message";
            continue;
          }
        }
        if (!messageElement) {
          messageElement = Dropzone.createElement("<div class=\"dz-message\"><span></span></div>");
          this.element.appendChild(messageElement);
        }
        span = messageElement.getElementsByTagName("span")[0];
        if (span) {
          span.textContent = this.options.dictFallbackMessage;
        }
        return this.element.appendChild(this.getFallbackForm());
      },
      resize: function(file) {
        var info, srcRatio, trgRatio;
        info = {
          srcX: 0,
          srcY: 0,
          srcWidth: file.width,
          srcHeight: file.height
        };
        srcRatio = file.width / file.height;
        info.optWidth = this.options.thumbnailWidth;
        info.optHeight = this.options.thumbnailHeight;
        if ((info.optWidth == null) && (info.optHeight == null)) {
          info.optWidth = info.srcWidth;
          info.optHeight = info.srcHeight;
        } else if (info.optWidth == null) {
          info.optWidth = srcRatio * info.optHeight;
        } else if (info.optHeight == null) {
          info.optHeight = (1 / srcRatio) * info.optWidth;
        }
        trgRatio = info.optWidth / info.optHeight;
        if (file.height < info.optHeight || file.width < info.optWidth) {
          info.trgHeight = info.srcHeight;
          info.trgWidth = info.srcWidth;
        } else {
          if (srcRatio > trgRatio) {
            info.srcHeight = file.height;
            info.srcWidth = info.srcHeight * trgRatio;
          } else {
            info.srcWidth = file.width;
            info.srcHeight = info.srcWidth / trgRatio;
          }
        }
        info.srcX = (file.width - info.srcWidth) / 2;
        info.srcY = (file.height - info.srcHeight) / 2;
        return info;
      },

      /*
      Those functions register themselves to the events on init and handle all
      the user interface specific stuff. Overwriting them won't break the upload
      but can break the way it's displayed.
      You can overwrite them if you don't like the default behavior. If you just
      want to add an additional event handler, register it on the dropzone object
      and don't overwrite those options.
       */
      drop: function(e) {
        return this.element.classList.remove("dz-drag-hover");
      },
      dragstart: noop,
      dragend: function(e) {
        return this.element.classList.remove("dz-drag-hover");
      },
      dragenter: function(e) {
        return this.element.classList.add("dz-drag-hover");
      },
      dragover: function(e) {
        return this.element.classList.add("dz-drag-hover");
      },
      dragleave: function(e) {
        return this.element.classList.remove("dz-drag-hover");
      },
      paste: noop,
      reset: function() {
        return this.element.classList.remove("dz-started");
      },
      addedfile: function(file) {
        var node, removeFileEvent, removeLink, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;
        if (this.element === this.previewsContainer) {
          this.element.classList.add("dz-started");
        }
        if (this.previewsContainer) {
          file.previewElement = Dropzone.createElement(this.options.previewTemplate.trim());
          file.previewTemplate = file.previewElement;
          this.previewsContainer.appendChild(file.previewElement);
          _ref = file.previewElement.querySelectorAll("[data-dz-name]");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            node = _ref[_i];
            node.textContent = file.name;
          }
          _ref1 = file.previewElement.querySelectorAll("[data-dz-size]");
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            node = _ref1[_j];
            node.innerHTML = this.filesize(file.size);
          }
          if (this.options.addRemoveLinks) {
            file._removeLink = Dropzone.createElement("<a class=\"dz-remove\" href=\"javascript:undefined;\" data-dz-remove>" + this.options.dictRemoveFile + "</a>");
            file.previewElement.appendChild(file._removeLink);
          }
          removeFileEvent = (function(_this) {
            return function(e) {
              e.preventDefault();
              e.stopPropagation();
              if (file.status === Dropzone.UPLOADING) {
                return Dropzone.confirm(_this.options.dictCancelUploadConfirmation, function() {
                  return _this.removeFile(file);
                });
              } else {
                if (_this.options.dictRemoveFileConfirmation) {
                  return Dropzone.confirm(_this.options.dictRemoveFileConfirmation, function() {
                    return _this.removeFile(file);
                  });
                } else {
                  return _this.removeFile(file);
                }
              }
            };
          })(this);
          _ref2 = file.previewElement.querySelectorAll("[data-dz-remove]");
          _results = [];
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            removeLink = _ref2[_k];
            _results.push(removeLink.addEventListener("click", removeFileEvent));
          }
          return _results;
        }
      },
      removedfile: function(file) {
        var _ref;
        if (file.previewElement) {
          if ((_ref = file.previewElement) != null) {
            _ref.parentNode.removeChild(file.previewElement);
          }
        }
        return this._updateMaxFilesReachedClass();
      },
      thumbnail: function(file, dataUrl) {
        var thumbnailElement, _i, _len, _ref;
        if (file.previewElement) {
          file.previewElement.classList.remove("dz-file-preview");
          _ref = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            thumbnailElement = _ref[_i];
            thumbnailElement.alt = file.name;
            thumbnailElement.src = dataUrl;
          }
          return setTimeout(((function(_this) {
            return function() {
              return file.previewElement.classList.add("dz-image-preview");
            };
          })(this)), 1);
        }
      },
      error: function(file, message) {
        var node, _i, _len, _ref, _results;
        if (file.previewElement) {
          file.previewElement.classList.add("dz-error");
          if (typeof message !== "String" && message.error) {
            message = message.error;
          }
          _ref = file.previewElement.querySelectorAll("[data-dz-errormessage]");
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            node = _ref[_i];
            _results.push(node.textContent = message);
          }
          return _results;
        }
      },
      errormultiple: noop,
      processing: function(file) {
        if (file.previewElement) {
          file.previewElement.classList.add("dz-processing");
          if (file._removeLink) {
            return file._removeLink.textContent = this.options.dictCancelUpload;
          }
        }
      },
      processingmultiple: noop,
      uploadprogress: function(file, progress, bytesSent) {
        var node, _i, _len, _ref, _results;
        if (file.previewElement) {
          _ref = file.previewElement.querySelectorAll("[data-dz-uploadprogress]");
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            node = _ref[_i];
            if (node.nodeName === 'PROGRESS') {
              _results.push(node.value = progress);
            } else {
              _results.push(node.style.width = "" + progress + "%");
            }
          }
          return _results;
        }
      },
      totaluploadprogress: noop,
      sending: noop,
      sendingmultiple: noop,
      success: function(file) {
        if (file.previewElement) {
          return file.previewElement.classList.add("dz-success");
        }
      },
      successmultiple: noop,
      canceled: function(file) {
        return this.emit("error", file, "Upload canceled.");
      },
      canceledmultiple: noop,
      complete: function(file) {
        if (file._removeLink) {
          file._removeLink.textContent = this.options.dictRemoveFile;
        }
        if (file.previewElement) {
          return file.previewElement.classList.add("dz-complete");
        }
      },
      completemultiple: noop,
      maxfilesexceeded: noop,
      maxfilesreached: noop,
      queuecomplete: noop,
      previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><img data-dz-thumbnail /></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Check</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Error</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <g id=\"Check-+-Oval-2\" sketch:type=\"MSLayerGroup\" stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n          <path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" sketch:type=\"MSShapeGroup\"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>"
    };

    extend = function() {
      var key, object, objects, target, val, _i, _len;
      target = arguments[0], objects = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      for (_i = 0, _len = objects.length; _i < _len; _i++) {
        object = objects[_i];
        for (key in object) {
          val = object[key];
          target[key] = val;
        }
      }
      return target;
    };

    function Dropzone(element, options) {
      var elementOptions, fallback, _ref;
      this.element = element;
      this.version = Dropzone.version;
      this.defaultOptions.previewTemplate = this.defaultOptions.previewTemplate.replace(/\n*/g, "");
      this.clickableElements = [];
      this.listeners = [];
      this.files = [];
      if (typeof this.element === "string") {
        this.element = document.querySelector(this.element);
      }
      if (!(this.element && (this.element.nodeType != null))) {
        throw new Error("Invalid dropzone element.");
      }
      if (this.element.dropzone) {
        throw new Error("Dropzone already attached.");
      }
      Dropzone.instances.push(this);
      this.element.dropzone = this;
      elementOptions = (_ref = Dropzone.optionsForElement(this.element)) != null ? _ref : {};
      this.options = extend({}, this.defaultOptions, elementOptions, options != null ? options : {});
      if (this.options.forceFallback || !Dropzone.isBrowserSupported()) {
        return this.options.fallback.call(this);
      }
      if (this.options.url == null) {
        this.options.url = this.element.getAttribute("action");
      }
      if (!this.options.url) {
        throw new Error("No URL provided.");
      }
      if (this.options.acceptedFiles && this.options.acceptedMimeTypes) {
        throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
      }
      if (this.options.acceptedMimeTypes) {
        this.options.acceptedFiles = this.options.acceptedMimeTypes;
        delete this.options.acceptedMimeTypes;
      }
      this.options.method = this.options.method.toUpperCase();
      if ((fallback = this.getExistingFallback()) && fallback.parentNode) {
        fallback.parentNode.removeChild(fallback);
      }
      if (this.options.previewsContainer !== false) {
        if (this.options.previewsContainer) {
          this.previewsContainer = Dropzone.getElement(this.options.previewsContainer, "previewsContainer");
        } else {
          this.previewsContainer = this.element;
        }
      }
      if (this.options.clickable) {
        if (this.options.clickable === true) {
          this.clickableElements = [this.element];
        } else {
          this.clickableElements = Dropzone.getElements(this.options.clickable, "clickable");
        }
      }
      this.init();
    }

    Dropzone.prototype.getAcceptedFiles = function() {
      var file, _i, _len, _ref, _results;
      _ref = this.files;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        if (file.accepted) {
          _results.push(file);
        }
      }
      return _results;
    };

    Dropzone.prototype.getRejectedFiles = function() {
      var file, _i, _len, _ref, _results;
      _ref = this.files;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        if (!file.accepted) {
          _results.push(file);
        }
      }
      return _results;
    };

    Dropzone.prototype.getFilesWithStatus = function(status) {
      var file, _i, _len, _ref, _results;
      _ref = this.files;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        if (file.status === status) {
          _results.push(file);
        }
      }
      return _results;
    };

    Dropzone.prototype.getQueuedFiles = function() {
      return this.getFilesWithStatus(Dropzone.QUEUED);
    };

    Dropzone.prototype.getUploadingFiles = function() {
      return this.getFilesWithStatus(Dropzone.UPLOADING);
    };

    Dropzone.prototype.getActiveFiles = function() {
      var file, _i, _len, _ref, _results;
      _ref = this.files;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        if (file.status === Dropzone.UPLOADING || file.status === Dropzone.QUEUED) {
          _results.push(file);
        }
      }
      return _results;
    };

    Dropzone.prototype.init = function() {
      var eventName, noPropagation, setupHiddenFileInput, _i, _len, _ref, _ref1;
      if (this.element.tagName === "form") {
        this.element.setAttribute("enctype", "multipart/form-data");
      }
      if (this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message")) {
        this.element.appendChild(Dropzone.createElement("<div class=\"dz-default dz-message\"><span>" + this.options.dictDefaultMessage + "</span></div>"));
      }
      if (this.clickableElements.length) {
        setupHiddenFileInput = (function(_this) {
          return function() {
            if (_this.hiddenFileInput) {
              document.body.removeChild(_this.hiddenFileInput);
            }
            _this.hiddenFileInput = document.createElement("input");
            _this.hiddenFileInput.setAttribute("type", "file");
            if ((_this.options.maxFiles == null) || _this.options.maxFiles > 1) {
              _this.hiddenFileInput.setAttribute("multiple", "multiple");
            }
            _this.hiddenFileInput.className = "dz-hidden-input";
            if (_this.options.acceptedFiles != null) {
              _this.hiddenFileInput.setAttribute("accept", _this.options.acceptedFiles);
            }
            if (_this.options.capture != null) {
              _this.hiddenFileInput.setAttribute("capture", _this.options.capture);
            }
            _this.hiddenFileInput.style.visibility = "hidden";
            _this.hiddenFileInput.style.position = "absolute";
            _this.hiddenFileInput.style.top = "0";
            _this.hiddenFileInput.style.left = "0";
            _this.hiddenFileInput.style.height = "0";
            _this.hiddenFileInput.style.width = "0";
            document.body.appendChild(_this.hiddenFileInput);
            return _this.hiddenFileInput.addEventListener("change", function() {
              var file, files, _i, _len;
              files = _this.hiddenFileInput.files;
              if (files.length) {
                for (_i = 0, _len = files.length; _i < _len; _i++) {
                  file = files[_i];
                  _this.addFile(file);
                }
              }
              return setupHiddenFileInput();
            });
          };
        })(this);
        setupHiddenFileInput();
      }
      this.URL = (_ref = window.URL) != null ? _ref : window.webkitURL;
      _ref1 = this.events;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        eventName = _ref1[_i];
        this.on(eventName, this.options[eventName]);
      }
      this.on("uploadprogress", (function(_this) {
        return function() {
          return _this.updateTotalUploadProgress();
        };
      })(this));
      this.on("removedfile", (function(_this) {
        return function() {
          return _this.updateTotalUploadProgress();
        };
      })(this));
      this.on("canceled", (function(_this) {
        return function(file) {
          return _this.emit("complete", file);
        };
      })(this));
      this.on("complete", (function(_this) {
        return function(file) {
          if (_this.getUploadingFiles().length === 0 && _this.getQueuedFiles().length === 0) {
            return setTimeout((function() {
              return _this.emit("queuecomplete");
            }), 0);
          }
        };
      })(this));
      noPropagation = function(e) {
        e.stopPropagation();
        if (e.preventDefault) {
          return e.preventDefault();
        } else {
          return e.returnValue = false;
        }
      };
      this.listeners = [
        {
          element: this.element,
          events: {
            "dragstart": (function(_this) {
              return function(e) {
                return _this.emit("dragstart", e);
              };
            })(this),
            "dragenter": (function(_this) {
              return function(e) {
                noPropagation(e);
                return _this.emit("dragenter", e);
              };
            })(this),
            "dragover": (function(_this) {
              return function(e) {
                var efct;
                try {
                  efct = e.dataTransfer.effectAllowed;
                } catch (_error) {}
                e.dataTransfer.dropEffect = 'move' === efct || 'linkMove' === efct ? 'move' : 'copy';
                noPropagation(e);
                return _this.emit("dragover", e);
              };
            })(this),
            "dragleave": (function(_this) {
              return function(e) {
                return _this.emit("dragleave", e);
              };
            })(this),
            "drop": (function(_this) {
              return function(e) {
                noPropagation(e);
                return _this.drop(e);
              };
            })(this),
            "dragend": (function(_this) {
              return function(e) {
                return _this.emit("dragend", e);
              };
            })(this)
          }
        }
      ];
      this.clickableElements.forEach((function(_this) {
        return function(clickableElement) {
          return _this.listeners.push({
            element: clickableElement,
            events: {
              "click": function(evt) {
                if ((clickableElement !== _this.element) || (evt.target === _this.element || Dropzone.elementInside(evt.target, _this.element.querySelector(".dz-message")))) {
                  return _this.hiddenFileInput.click();
                }
              }
            }
          });
        };
      })(this));
      this.enable();
      return this.options.init.call(this);
    };

    Dropzone.prototype.destroy = function() {
      var _ref;
      this.disable();
      this.removeAllFiles(true);
      if ((_ref = this.hiddenFileInput) != null ? _ref.parentNode : void 0) {
        this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);
        this.hiddenFileInput = null;
      }
      delete this.element.dropzone;
      return Dropzone.instances.splice(Dropzone.instances.indexOf(this), 1);
    };

    Dropzone.prototype.updateTotalUploadProgress = function() {
      var activeFiles, file, totalBytes, totalBytesSent, totalUploadProgress, _i, _len, _ref;
      totalBytesSent = 0;
      totalBytes = 0;
      activeFiles = this.getActiveFiles();
      if (activeFiles.length) {
        _ref = this.getActiveFiles();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          file = _ref[_i];
          totalBytesSent += file.upload.bytesSent;
          totalBytes += file.upload.total;
        }
        totalUploadProgress = 100 * totalBytesSent / totalBytes;
      } else {
        totalUploadProgress = 100;
      }
      return this.emit("totaluploadprogress", totalUploadProgress, totalBytes, totalBytesSent);
    };

    Dropzone.prototype._getParamName = function(n) {
      if (typeof this.options.paramName === "function") {
        return this.options.paramName(n);
      } else {
        return "" + this.options.paramName + (this.options.uploadMultiple ? "[" + n + "]" : "");
      }
    };

    Dropzone.prototype.getFallbackForm = function() {
      var existingFallback, fields, fieldsString, form;
      if (existingFallback = this.getExistingFallback()) {
        return existingFallback;
      }
      fieldsString = "<div class=\"dz-fallback\">";
      if (this.options.dictFallbackText) {
        fieldsString += "<p>" + this.options.dictFallbackText + "</p>";
      }
      fieldsString += "<input type=\"file\" name=\"" + (this._getParamName(0)) + "\" " + (this.options.uploadMultiple ? 'multiple="multiple"' : void 0) + " /><input type=\"submit\" value=\"Upload!\"></div>";
      fields = Dropzone.createElement(fieldsString);
      if (this.element.tagName !== "FORM") {
        form = Dropzone.createElement("<form action=\"" + this.options.url + "\" enctype=\"multipart/form-data\" method=\"" + this.options.method + "\"></form>");
        form.appendChild(fields);
      } else {
        this.element.setAttribute("enctype", "multipart/form-data");
        this.element.setAttribute("method", this.options.method);
      }
      return form != null ? form : fields;
    };

    Dropzone.prototype.getExistingFallback = function() {
      var fallback, getFallback, tagName, _i, _len, _ref;
      getFallback = function(elements) {
        var el, _i, _len;
        for (_i = 0, _len = elements.length; _i < _len; _i++) {
          el = elements[_i];
          if (/(^| )fallback($| )/.test(el.className)) {
            return el;
          }
        }
      };
      _ref = ["div", "form"];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tagName = _ref[_i];
        if (fallback = getFallback(this.element.getElementsByTagName(tagName))) {
          return fallback;
        }
      }
    };

    Dropzone.prototype.setupEventListeners = function() {
      var elementListeners, event, listener, _i, _len, _ref, _results;
      _ref = this.listeners;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elementListeners = _ref[_i];
        _results.push((function() {
          var _ref1, _results1;
          _ref1 = elementListeners.events;
          _results1 = [];
          for (event in _ref1) {
            listener = _ref1[event];
            _results1.push(elementListeners.element.addEventListener(event, listener, false));
          }
          return _results1;
        })());
      }
      return _results;
    };

    Dropzone.prototype.removeEventListeners = function() {
      var elementListeners, event, listener, _i, _len, _ref, _results;
      _ref = this.listeners;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elementListeners = _ref[_i];
        _results.push((function() {
          var _ref1, _results1;
          _ref1 = elementListeners.events;
          _results1 = [];
          for (event in _ref1) {
            listener = _ref1[event];
            _results1.push(elementListeners.element.removeEventListener(event, listener, false));
          }
          return _results1;
        })());
      }
      return _results;
    };

    Dropzone.prototype.disable = function() {
      var file, _i, _len, _ref, _results;
      this.clickableElements.forEach(function(element) {
        return element.classList.remove("dz-clickable");
      });
      this.removeEventListeners();
      _ref = this.files;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        _results.push(this.cancelUpload(file));
      }
      return _results;
    };

    Dropzone.prototype.enable = function() {
      this.clickableElements.forEach(function(element) {
        return element.classList.add("dz-clickable");
      });
      return this.setupEventListeners();
    };

    Dropzone.prototype.filesize = function(size) {
      var cutoff, i, selectedSize, selectedUnit, unit, units, _i, _len;
      units = ['TB', 'GB', 'MB', 'KB', 'b'];
      selectedSize = selectedUnit = null;
      for (i = _i = 0, _len = units.length; _i < _len; i = ++_i) {
        unit = units[i];
        cutoff = Math.pow(this.options.filesizeBase, 4 - i) / 10;
        if (size >= cutoff) {
          selectedSize = size / Math.pow(this.options.filesizeBase, 4 - i);
          selectedUnit = unit;
          break;
        }
      }
      selectedSize = Math.round(10 * selectedSize) / 10;
      return "<strong>" + selectedSize + "</strong> " + selectedUnit;
    };

    Dropzone.prototype._updateMaxFilesReachedClass = function() {
      if ((this.options.maxFiles != null) && this.getAcceptedFiles().length >= this.options.maxFiles) {
        if (this.getAcceptedFiles().length === this.options.maxFiles) {
          this.emit('maxfilesreached', this.files);
        }
        return this.element.classList.add("dz-max-files-reached");
      } else {
        return this.element.classList.remove("dz-max-files-reached");
      }
    };

    Dropzone.prototype.drop = function(e) {
      var files, items;
      if (!e.dataTransfer) {
        return;
      }
      this.emit("drop", e);
      files = e.dataTransfer.files;
      if (files.length) {
        items = e.dataTransfer.items;
        if (items && items.length && (items[0].webkitGetAsEntry != null)) {
          this._addFilesFromItems(items);
        } else {
          this.handleFiles(files);
        }
      }
    };

    Dropzone.prototype.paste = function(e) {
      var items, _ref;
      if ((e != null ? (_ref = e.clipboardData) != null ? _ref.items : void 0 : void 0) == null) {
        return;
      }
      this.emit("paste", e);
      items = e.clipboardData.items;
      if (items.length) {
        return this._addFilesFromItems(items);
      }
    };

    Dropzone.prototype.handleFiles = function(files) {
      var file, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        _results.push(this.addFile(file));
      }
      return _results;
    };

    Dropzone.prototype._addFilesFromItems = function(items) {
      var entry, item, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        if ((item.webkitGetAsEntry != null) && (entry = item.webkitGetAsEntry())) {
          if (entry.isFile) {
            _results.push(this.addFile(item.getAsFile()));
          } else if (entry.isDirectory) {
            _results.push(this._addFilesFromDirectory(entry, entry.name));
          } else {
            _results.push(void 0);
          }
        } else if (item.getAsFile != null) {
          if ((item.kind == null) || item.kind === "file") {
            _results.push(this.addFile(item.getAsFile()));
          } else {
            _results.push(void 0);
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Dropzone.prototype._addFilesFromDirectory = function(directory, path) {
      var dirReader, entriesReader;
      dirReader = directory.createReader();
      entriesReader = (function(_this) {
        return function(entries) {
          var entry, _i, _len;
          for (_i = 0, _len = entries.length; _i < _len; _i++) {
            entry = entries[_i];
            if (entry.isFile) {
              entry.file(function(file) {
                if (_this.options.ignoreHiddenFiles && file.name.substring(0, 1) === '.') {
                  return;
                }
                file.fullPath = "" + path + "/" + file.name;
                return _this.addFile(file);
              });
            } else if (entry.isDirectory) {
              _this._addFilesFromDirectory(entry, "" + path + "/" + entry.name);
            }
          }
        };
      })(this);
      return dirReader.readEntries(entriesReader, function(error) {
        return typeof console !== "undefined" && console !== null ? typeof console.log === "function" ? console.log(error) : void 0 : void 0;
      });
    };

    Dropzone.prototype.accept = function(file, done) {
      if (file.size > this.options.maxFilesize * 1024 * 1024) {
        return done(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(file.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize));
      } else if (!Dropzone.isValidFile(file, this.options.acceptedFiles)) {
        return done(this.options.dictInvalidFileType);
      } else if ((this.options.maxFiles != null) && this.getAcceptedFiles().length >= this.options.maxFiles) {
        done(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles));
        return this.emit("maxfilesexceeded", file);
      } else {
        return this.options.accept.call(this, file, done);
      }
    };

    Dropzone.prototype.addFile = function(file) {
      file.upload = {
        progress: 0,
        total: file.size,
        bytesSent: 0
      };
      this.files.push(file);
      file.status = Dropzone.ADDED;
      this.emit("addedfile", file);
      this._enqueueThumbnail(file);
      return this.accept(file, (function(_this) {
        return function(error) {
          if (error) {
            file.accepted = false;
            _this._errorProcessing([file], error);
          } else {
            file.accepted = true;
            if (_this.options.autoQueue) {
              _this.enqueueFile(file);
            }
          }
          return _this._updateMaxFilesReachedClass();
        };
      })(this));
    };

    Dropzone.prototype.enqueueFiles = function(files) {
      var file, _i, _len;
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        this.enqueueFile(file);
      }
      return null;
    };

    Dropzone.prototype.enqueueFile = function(file) {
      if (file.status === Dropzone.ADDED && file.accepted === true) {
        file.status = Dropzone.QUEUED;
        if (this.options.autoProcessQueue) {
          return setTimeout(((function(_this) {
            return function() {
              return _this.processQueue();
            };
          })(this)), 0);
        }
      } else {
        throw new Error("This file can't be queued because it has already been processed or was rejected.");
      }
    };

    Dropzone.prototype._thumbnailQueue = [];

    Dropzone.prototype._processingThumbnail = false;

    Dropzone.prototype._enqueueThumbnail = function(file) {
      if (this.options.createImageThumbnails && file.type.match(/image.*/) && file.size <= this.options.maxThumbnailFilesize * 1024 * 1024) {
        this._thumbnailQueue.push(file);
        return setTimeout(((function(_this) {
          return function() {
            return _this._processThumbnailQueue();
          };
        })(this)), 0);
      }
    };

    Dropzone.prototype._processThumbnailQueue = function() {
      if (this._processingThumbnail || this._thumbnailQueue.length === 0) {
        return;
      }
      this._processingThumbnail = true;
      return this.createThumbnail(this._thumbnailQueue.shift(), (function(_this) {
        return function() {
          _this._processingThumbnail = false;
          return _this._processThumbnailQueue();
        };
      })(this));
    };

    Dropzone.prototype.removeFile = function(file) {
      if (file.status === Dropzone.UPLOADING) {
        this.cancelUpload(file);
      }
      this.files = without(this.files, file);
      this.emit("removedfile", file);
      if (this.files.length === 0) {
        return this.emit("reset");
      }
    };

    Dropzone.prototype.removeAllFiles = function(cancelIfNecessary) {
      var file, _i, _len, _ref;
      if (cancelIfNecessary == null) {
        cancelIfNecessary = false;
      }
      _ref = this.files.slice();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        if (file.status !== Dropzone.UPLOADING || cancelIfNecessary) {
          this.removeFile(file);
        }
      }
      return null;
    };

    Dropzone.prototype.createThumbnail = function(file, callback) {
      var fileReader;
      fileReader = new FileReader;
      fileReader.onload = (function(_this) {
        return function() {
          if (file.type === "image/svg+xml") {
            _this.emit("thumbnail", file, fileReader.result);
            if (callback != null) {
              callback();
            }
            return;
          }
          return _this.createThumbnailFromUrl(file, fileReader.result, callback);
        };
      })(this);
      return fileReader.readAsDataURL(file);
    };

    Dropzone.prototype.createThumbnailFromUrl = function(file, imageUrl, callback) {
      var img;
      img = document.createElement("img");
      img.onload = (function(_this) {
        return function() {
          var canvas, ctx, resizeInfo, thumbnail, _ref, _ref1, _ref2, _ref3;
          file.width = img.width;
          file.height = img.height;
          resizeInfo = _this.options.resize.call(_this, file);
          if (resizeInfo.trgWidth == null) {
            resizeInfo.trgWidth = resizeInfo.optWidth;
          }
          if (resizeInfo.trgHeight == null) {
            resizeInfo.trgHeight = resizeInfo.optHeight;
          }
          canvas = document.createElement("canvas");
          ctx = canvas.getContext("2d");
          canvas.width = resizeInfo.trgWidth;
          canvas.height = resizeInfo.trgHeight;
          drawImageIOSFix(ctx, img, (_ref = resizeInfo.srcX) != null ? _ref : 0, (_ref1 = resizeInfo.srcY) != null ? _ref1 : 0, resizeInfo.srcWidth, resizeInfo.srcHeight, (_ref2 = resizeInfo.trgX) != null ? _ref2 : 0, (_ref3 = resizeInfo.trgY) != null ? _ref3 : 0, resizeInfo.trgWidth, resizeInfo.trgHeight);
          thumbnail = canvas.toDataURL("image/png");
          _this.emit("thumbnail", file, thumbnail);
          if (callback != null) {
            return callback();
          }
        };
      })(this);
      if (callback != null) {
        img.onerror = callback;
      }
      return img.src = imageUrl;
    };

    Dropzone.prototype.processQueue = function() {
      var i, parallelUploads, processingLength, queuedFiles;
      parallelUploads = this.options.parallelUploads;
      processingLength = this.getUploadingFiles().length;
      i = processingLength;
      if (processingLength >= parallelUploads) {
        return;
      }
      queuedFiles = this.getQueuedFiles();
      if (!(queuedFiles.length > 0)) {
        return;
      }
      if (this.options.uploadMultiple) {
        return this.processFiles(queuedFiles.slice(0, parallelUploads - processingLength));
      } else {
        while (i < parallelUploads) {
          if (!queuedFiles.length) {
            return;
          }
          this.processFile(queuedFiles.shift());
          i++;
        }
      }
    };

    Dropzone.prototype.processFile = function(file) {
      return this.processFiles([file]);
    };

    Dropzone.prototype.processFiles = function(files) {
      var file, _i, _len;
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        file.processing = true;
        file.status = Dropzone.UPLOADING;
        this.emit("processing", file);
      }
      if (this.options.uploadMultiple) {
        this.emit("processingmultiple", files);
      }
      return this.uploadFiles(files);
    };

    Dropzone.prototype._getFilesWithXhr = function(xhr) {
      var file, files;
      return files = (function() {
        var _i, _len, _ref, _results;
        _ref = this.files;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          file = _ref[_i];
          if (file.xhr === xhr) {
            _results.push(file);
          }
        }
        return _results;
      }).call(this);
    };

    Dropzone.prototype.cancelUpload = function(file) {
      var groupedFile, groupedFiles, _i, _j, _len, _len1, _ref;
      if (file.status === Dropzone.UPLOADING) {
        groupedFiles = this._getFilesWithXhr(file.xhr);
        for (_i = 0, _len = groupedFiles.length; _i < _len; _i++) {
          groupedFile = groupedFiles[_i];
          groupedFile.status = Dropzone.CANCELED;
        }
        file.xhr.abort();
        for (_j = 0, _len1 = groupedFiles.length; _j < _len1; _j++) {
          groupedFile = groupedFiles[_j];
          this.emit("canceled", groupedFile);
        }
        if (this.options.uploadMultiple) {
          this.emit("canceledmultiple", groupedFiles);
        }
      } else if ((_ref = file.status) === Dropzone.ADDED || _ref === Dropzone.QUEUED) {
        file.status = Dropzone.CANCELED;
        this.emit("canceled", file);
        if (this.options.uploadMultiple) {
          this.emit("canceledmultiple", [file]);
        }
      }
      if (this.options.autoProcessQueue) {
        return this.processQueue();
      }
    };

    resolveOption = function() {
      var args, option;
      option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (typeof option === 'function') {
        return option.apply(this, args);
      }
      return option;
    };

    Dropzone.prototype.uploadFile = function(file) {
      return this.uploadFiles([file]);
    };

    Dropzone.prototype.uploadFiles = function(files) {
      var file, formData, handleError, headerName, headerValue, headers, i, input, inputName, inputType, key, method, option, progressObj, response, updateProgress, url, value, xhr, _i, _j, _k, _l, _len, _len1, _len2, _len3, _m, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
      xhr = new XMLHttpRequest();
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        file.xhr = xhr;
      }
      method = resolveOption(this.options.method, files);
      url = resolveOption(this.options.url, files);
      xhr.open(method, url, true);
      xhr.withCredentials = !!this.options.withCredentials;
      response = null;
      handleError = (function(_this) {
        return function() {
          var _j, _len1, _results;
          _results = [];
          for (_j = 0, _len1 = files.length; _j < _len1; _j++) {
            file = files[_j];
            _results.push(_this._errorProcessing(files, response || _this.options.dictResponseError.replace("{{statusCode}}", xhr.status), xhr));
          }
          return _results;
        };
      })(this);
      updateProgress = (function(_this) {
        return function(e) {
          var allFilesFinished, progress, _j, _k, _l, _len1, _len2, _len3, _results;
          if (e != null) {
            progress = 100 * e.loaded / e.total;
            for (_j = 0, _len1 = files.length; _j < _len1; _j++) {
              file = files[_j];
              file.upload = {
                progress: progress,
                total: e.total,
                bytesSent: e.loaded
              };
            }
          } else {
            allFilesFinished = true;
            progress = 100;
            for (_k = 0, _len2 = files.length; _k < _len2; _k++) {
              file = files[_k];
              if (!(file.upload.progress === 100 && file.upload.bytesSent === file.upload.total)) {
                allFilesFinished = false;
              }
              file.upload.progress = progress;
              file.upload.bytesSent = file.upload.total;
            }
            if (allFilesFinished) {
              return;
            }
          }
          _results = [];
          for (_l = 0, _len3 = files.length; _l < _len3; _l++) {
            file = files[_l];
            _results.push(_this.emit("uploadprogress", file, progress, file.upload.bytesSent));
          }
          return _results;
        };
      })(this);
      xhr.onload = (function(_this) {
        return function(e) {
          var _ref;
          if (files[0].status === Dropzone.CANCELED) {
            return;
          }
          if (xhr.readyState !== 4) {
            return;
          }
          response = xhr.responseText;
          if (xhr.getResponseHeader("content-type") && ~xhr.getResponseHeader("content-type").indexOf("application/json")) {
            try {
              response = JSON.parse(response);
            } catch (_error) {
              e = _error;
              response = "Invalid JSON response from server.";
            }
          }
          updateProgress();
          if (!((200 <= (_ref = xhr.status) && _ref < 300))) {
            return handleError();
          } else {
            return _this._finished(files, response, e);
          }
        };
      })(this);
      xhr.onerror = (function(_this) {
        return function() {
          if (files[0].status === Dropzone.CANCELED) {
            return;
          }
          return handleError();
        };
      })(this);
      progressObj = (_ref = xhr.upload) != null ? _ref : xhr;
      progressObj.onprogress = updateProgress;
      headers = {
        "Accept": "application/json",
        "Cache-Control": "no-cache",
        "X-Requested-With": "XMLHttpRequest"
      };
      if (this.options.headers) {
        extend(headers, this.options.headers);
      }
      for (headerName in headers) {
        headerValue = headers[headerName];
        xhr.setRequestHeader(headerName, headerValue);
      }
      formData = new FormData();
      if (this.options.params) {
        _ref1 = this.options.params;
        for (key in _ref1) {
          value = _ref1[key];
          formData.append(key, value);
        }
      }
      for (_j = 0, _len1 = files.length; _j < _len1; _j++) {
        file = files[_j];
        this.emit("sending", file, xhr, formData);
      }
      if (this.options.uploadMultiple) {
        this.emit("sendingmultiple", files, xhr, formData);
      }
      if (this.element.tagName === "FORM") {
        _ref2 = this.element.querySelectorAll("input, textarea, select, button");
        for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
          input = _ref2[_k];
          inputName = input.getAttribute("name");
          inputType = input.getAttribute("type");
          if (input.tagName === "SELECT" && input.hasAttribute("multiple")) {
            _ref3 = input.options;
            for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
              option = _ref3[_l];
              if (option.selected) {
                formData.append(inputName, option.value);
              }
            }
          } else if (!inputType || ((_ref4 = inputType.toLowerCase()) !== "checkbox" && _ref4 !== "radio") || input.checked) {
            formData.append(inputName, input.value);
          }
        }
      }
      for (i = _m = 0, _ref5 = files.length - 1; 0 <= _ref5 ? _m <= _ref5 : _m >= _ref5; i = 0 <= _ref5 ? ++_m : --_m) {
        formData.append(this._getParamName(i), files[i], files[i].name);
      }
      return xhr.send(formData);
    };

    Dropzone.prototype._finished = function(files, responseText, e) {
      var file, _i, _len;
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        file.status = Dropzone.SUCCESS;
        this.emit("success", file, responseText, e);
        this.emit("complete", file);
      }
      if (this.options.uploadMultiple) {
        this.emit("successmultiple", files, responseText, e);
        this.emit("completemultiple", files);
      }
      if (this.options.autoProcessQueue) {
        return this.processQueue();
      }
    };

    Dropzone.prototype._errorProcessing = function(files, message, xhr) {
      var file, _i, _len;
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        file = files[_i];
        file.status = Dropzone.ERROR;
        this.emit("error", file, message, xhr);
        this.emit("complete", file);
      }
      if (this.options.uploadMultiple) {
        this.emit("errormultiple", files, message, xhr);
        this.emit("completemultiple", files);
      }
      if (this.options.autoProcessQueue) {
        return this.processQueue();
      }
    };

    return Dropzone;

  })(Emitter);

  Dropzone.version = "4.0.1";

  Dropzone.options = {};

  Dropzone.optionsForElement = function(element) {
    if (element.getAttribute("id")) {
      return Dropzone.options[camelize(element.getAttribute("id"))];
    } else {
      return void 0;
    }
  };

  Dropzone.instances = [];

  Dropzone.forElement = function(element) {
    if (typeof element === "string") {
      element = document.querySelector(element);
    }
    if ((element != null ? element.dropzone : void 0) == null) {
      throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
    }
    return element.dropzone;
  };

  Dropzone.autoDiscover = true;

  Dropzone.discover = function() {
    var checkElements, dropzone, dropzones, _i, _len, _results;
    if (document.querySelectorAll) {
      dropzones = document.querySelectorAll(".dropzone");
    } else {
      dropzones = [];
      checkElements = function(elements) {
        var el, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = elements.length; _i < _len; _i++) {
          el = elements[_i];
          if (/(^| )dropzone($| )/.test(el.className)) {
            _results.push(dropzones.push(el));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };
      checkElements(document.getElementsByTagName("div"));
      checkElements(document.getElementsByTagName("form"));
    }
    _results = [];
    for (_i = 0, _len = dropzones.length; _i < _len; _i++) {
      dropzone = dropzones[_i];
      if (Dropzone.optionsForElement(dropzone) !== false) {
        _results.push(new Dropzone(dropzone));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Dropzone.blacklistedBrowsers = [/opera.*Macintosh.*version\/12/i];

  Dropzone.isBrowserSupported = function() {
    var capableBrowser, regex, _i, _len, _ref;
    capableBrowser = true;
    if (window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector) {
      if (!("classList" in document.createElement("a"))) {
        capableBrowser = false;
      } else {
        _ref = Dropzone.blacklistedBrowsers;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          regex = _ref[_i];
          if (regex.test(navigator.userAgent)) {
            capableBrowser = false;
            continue;
          }
        }
      }
    } else {
      capableBrowser = false;
    }
    return capableBrowser;
  };

  without = function(list, rejectedItem) {
    var item, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      item = list[_i];
      if (item !== rejectedItem) {
        _results.push(item);
      }
    }
    return _results;
  };

  camelize = function(str) {
    return str.replace(/[\-_](\w)/g, function(match) {
      return match.charAt(1).toUpperCase();
    });
  };

  Dropzone.createElement = function(string) {
    var div;
    div = document.createElement("div");
    div.innerHTML = string;
    return div.childNodes[0];
  };

  Dropzone.elementInside = function(element, container) {
    if (element === container) {
      return true;
    }
    while (element = element.parentNode) {
      if (element === container) {
        return true;
      }
    }
    return false;
  };

  Dropzone.getElement = function(el, name) {
    var element;
    if (typeof el === "string") {
      element = document.querySelector(el);
    } else if (el.nodeType != null) {
      element = el;
    }
    if (element == null) {
      throw new Error("Invalid `" + name + "` option provided. Please provide a CSS selector or a plain HTML element.");
    }
    return element;
  };

  Dropzone.getElements = function(els, name) {
    var e, el, elements, _i, _j, _len, _len1, _ref;
    if (els instanceof Array) {
      elements = [];
      try {
        for (_i = 0, _len = els.length; _i < _len; _i++) {
          el = els[_i];
          elements.push(this.getElement(el, name));
        }
      } catch (_error) {
        e = _error;
        elements = null;
      }
    } else if (typeof els === "string") {
      elements = [];
      _ref = document.querySelectorAll(els);
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        el = _ref[_j];
        elements.push(el);
      }
    } else if (els.nodeType != null) {
      elements = [els];
    }
    if (!((elements != null) && elements.length)) {
      throw new Error("Invalid `" + name + "` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");
    }
    return elements;
  };

  Dropzone.confirm = function(question, accepted, rejected) {
    if (window.confirm(question)) {
      return accepted();
    } else if (rejected != null) {
      return rejected();
    }
  };

  Dropzone.isValidFile = function(file, acceptedFiles) {
    var baseMimeType, mimeType, validType, _i, _len;
    if (!acceptedFiles) {
      return true;
    }
    acceptedFiles = acceptedFiles.split(",");
    mimeType = file.type;
    baseMimeType = mimeType.replace(/\/.*$/, "");
    for (_i = 0, _len = acceptedFiles.length; _i < _len; _i++) {
      validType = acceptedFiles[_i];
      validType = validType.trim();
      if (validType.charAt(0) === ".") {
        if (file.name.toLowerCase().indexOf(validType.toLowerCase(), file.name.length - validType.length) !== -1) {
          return true;
        }
      } else if (/\/\*$/.test(validType)) {
        if (baseMimeType === validType.replace(/\/.*$/, "")) {
          return true;
        }
      } else {
        if (mimeType === validType) {
          return true;
        }
      }
    }
    return false;
  };

  if (typeof jQuery !== "undefined" && jQuery !== null) {
    jQuery.fn.dropzone = function(options) {
      return this.each(function() {
        return new Dropzone(this, options);
      });
    };
  }

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Dropzone;
  } else {
    window.Dropzone = Dropzone;
  }

  Dropzone.ADDED = "added";

  Dropzone.QUEUED = "queued";

  Dropzone.ACCEPTED = Dropzone.QUEUED;

  Dropzone.UPLOADING = "uploading";

  Dropzone.PROCESSING = Dropzone.UPLOADING;

  Dropzone.CANCELED = "canceled";

  Dropzone.ERROR = "error";

  Dropzone.SUCCESS = "success";


  /*
  
  Bugfix for iOS 6 and 7
  Source: http://stackoverflow.com/questions/11929099/html5-canvas-drawimage-ratio-bug-ios
  based on the work of https://github.com/stomita/ios-imagefile-megapixel
   */

  detectVerticalSquash = function(img) {
    var alpha, canvas, ctx, data, ey, ih, iw, py, ratio, sy;
    iw = img.naturalWidth;
    ih = img.naturalHeight;
    canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = ih;
    ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    data = ctx.getImageData(0, 0, 1, ih).data;
    sy = 0;
    ey = ih;
    py = ih;
    while (py > sy) {
      alpha = data[(py - 1) * 4 + 3];
      if (alpha === 0) {
        ey = py;
      } else {
        sy = py;
      }
      py = (ey + sy) >> 1;
    }
    ratio = py / ih;
    if (ratio === 0) {
      return 1;
    } else {
      return ratio;
    }
  };

  drawImageIOSFix = function(ctx, img, sx, sy, sw, sh, dx, dy, dw, dh) {
    var vertSquashRatio;
    vertSquashRatio = detectVerticalSquash(img);
    return ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh / vertSquashRatio);
  };


  /*
   * contentloaded.js
   *
   * Author: Diego Perini (diego.perini at gmail.com)
   * Summary: cross-browser wrapper for DOMContentLoaded
   * Updated: 20101020
   * License: MIT
   * Version: 1.2
   *
   * URL:
   * http://javascript.nwbox.com/ContentLoaded/
   * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
   */

  contentLoaded = function(win, fn) {
    var add, doc, done, init, poll, pre, rem, root, top;
    done = false;
    top = true;
    doc = win.document;
    root = doc.documentElement;
    add = (doc.addEventListener ? "addEventListener" : "attachEvent");
    rem = (doc.addEventListener ? "removeEventListener" : "detachEvent");
    pre = (doc.addEventListener ? "" : "on");
    init = function(e) {
      if (e.type === "readystatechange" && doc.readyState !== "complete") {
        return;
      }
      (e.type === "load" ? win : doc)[rem](pre + e.type, init, false);
      if (!done && (done = true)) {
        return fn.call(win, e.type || e);
      }
    };
    poll = function() {
      var e;
      try {
        root.doScroll("left");
      } catch (_error) {
        e = _error;
        setTimeout(poll, 50);
        return;
      }
      return init("poll");
    };
    if (doc.readyState !== "complete") {
      if (doc.createEventObject && root.doScroll) {
        try {
          top = !win.frameElement;
        } catch (_error) {}
        if (top) {
          poll();
        }
      }
      doc[add](pre + "DOMContentLoaded", init, false);
      doc[add](pre + "readystatechange", init, false);
      return win[add](pre + "load", init, false);
    }
  };

  Dropzone._autoDiscoverFunction = function() {
    if (Dropzone.autoDiscover) {
      return Dropzone.discover();
    }
  };

  contentLoaded(window, Dropzone._autoDiscoverFunction);

}).call(this);
function buildMap(){var a=[],b=[];for(var c in Config.emoji_data){for(var d=0;d<Config.emoji_data[c][0].length;d++)a.push(Config.escape_rx(":"+Config.emoji_data[c][3][0])+":"),b.push(Config.emoji_data[c][0][0]),Config.map[Config.emoji_data[c][3][0]]=Config.emoji_data[c][0][0],Config.mapcolon[":"+Config.emoji_data[c][3][0]+":"]=Config.emoji_data[c][0][0],Config.reversemap[Config.emoji_data[c][0][0]]=Config.emoji_data[c][3][0];Config.rx_colons=new RegExp("("+a.join("|")+")","g"),Config.rx_codes=new RegExp("("+b.join("|")+")","g")}}function cancelEvent(a){return a=a||window.event,a&&(a=a.originalEvent||a,a.stopPropagation&&a.stopPropagation(),a.preventDefault&&a.preventDefault()),!1}function getGuid(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0,c="x"==a?b:3&b|8;return c.toString(16)})}!function(a){return"function"==typeof define&&define.amd?define(["jquery"],function(b){return a(b,window,document)}):"object"==typeof exports?module.exports=a(require("jquery"),window,document):a(jQuery,window,document)}(function(a,b,c){"use strict";var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H;z={paneClass:"nano-pane",sliderClass:"nano-slider",contentClass:"nano-content",enabledClass:"has-scrollbar",flashedClass:"flashed",activeClass:"active",iOSNativeScrolling:!1,preventPageScrolling:!1,disableResize:!1,alwaysVisible:!1,flashDelay:1500,sliderMinHeight:20,sliderMaxHeight:null,documentContext:null,windowContext:null},u="scrollbar",t="scroll",l="mousedown",m="mouseenter",n="mousemove",p="mousewheel",o="mouseup",s="resize",h="drag",i="enter",w="up",r="panedown",f="DOMMouseScroll",g="down",x="wheel",j="keydown",k="keyup",v="touchmove",d="Microsoft Internet Explorer"===b.navigator.appName&&/msie 7./i.test(b.navigator.appVersion)&&b.ActiveXObject,e=null,D=b.requestAnimationFrame,y=b.cancelAnimationFrame,F=c.createElement("div").style,H=function(){var a,b,c,d,e,f;for(d=["t","webkitT","MozT","msT","OT"],a=e=0,f=d.length;f>e;a=++e)if(c=d[a],b=d[a]+"ransform",b in F)return d[a].substr(0,d[a].length-1);return!1}(),G=function(a){return H===!1?!1:""===H?a:H+a.charAt(0).toUpperCase()+a.substr(1)},E=G("transform"),B=E!==!1,A=function(){var a,b,d;return a=c.createElement("div"),b=a.style,b.position="absolute",b.width="100px",b.height="100px",b.overflow=t,b.top="-9999px",c.body.appendChild(a),d=a.offsetWidth-a.clientWidth,c.body.removeChild(a),d},C=function(){var a,c,d;return c=b.navigator.userAgent,(a=/(?=.+Mac OS X)(?=.+Firefox)/.test(c))?(d=/Firefox\/\d{2}\./.exec(c),d&&(d=d[0].replace(/\D+/g,"")),a&&+d>23):!1},q=function(){function j(d,f){this.el=d,this.options=f,e||(e=A()),this.$el=a(this.el),this.doc=a(this.options.documentContext||c),this.win=a(this.options.windowContext||b),this.body=this.doc.find("body"),this.$content=this.$el.children("."+this.options.contentClass),this.$content.attr("tabindex",this.options.tabIndex||0),this.content=this.$content[0],this.previousPosition=0,this.options.iOSNativeScrolling&&null!=this.el.style.WebkitOverflowScrolling?this.nativeScrolling():this.generate(),this.createEvents(),this.addEvents(),this.reset()}return j.prototype.preventScrolling=function(a,b){if(this.isActive)if(a.type===f)(b===g&&a.originalEvent.detail>0||b===w&&a.originalEvent.detail<0)&&a.preventDefault();else if(a.type===p){if(!a.originalEvent||!a.originalEvent.wheelDelta)return;(b===g&&a.originalEvent.wheelDelta<0||b===w&&a.originalEvent.wheelDelta>0)&&a.preventDefault()}},j.prototype.nativeScrolling=function(){this.$content.css({WebkitOverflowScrolling:"touch"}),this.iOSNativeScrolling=!0,this.isActive=!0},j.prototype.updateScrollValues=function(){var a,b;a=this.content,this.maxScrollTop=a.scrollHeight-a.clientHeight,this.prevScrollTop=this.contentScrollTop||0,this.contentScrollTop=a.scrollTop,b=this.contentScrollTop>this.previousPosition?"down":this.contentScrollTop<this.previousPosition?"up":"same",this.previousPosition=this.contentScrollTop,"same"!==b&&this.$el.trigger("update",{position:this.contentScrollTop,maximum:this.maxScrollTop,direction:b}),this.iOSNativeScrolling||(this.maxSliderTop=this.paneHeight-this.sliderHeight,this.sliderTop=0===this.maxScrollTop?0:this.contentScrollTop*this.maxSliderTop/this.maxScrollTop)},j.prototype.setOnScrollStyles=function(){var a;B?(a={},a[E]="translate(0, "+this.sliderTop+"px)"):a={top:this.sliderTop},D?(y&&this.scrollRAF&&y(this.scrollRAF),this.scrollRAF=D(function(b){return function(){return b.scrollRAF=null,b.slider.css(a)}}(this))):this.slider.css(a)},j.prototype.createEvents=function(){this.events={down:function(a){return function(b){return a.isBeingDragged=!0,a.offsetY=b.pageY-a.slider.offset().top,a.slider.is(b.target)||(a.offsetY=0),a.pane.addClass(a.options.activeClass),a.doc.bind(n,a.events[h]).bind(o,a.events[w]),a.body.bind(m,a.events[i]),!1}}(this),drag:function(a){return function(b){return a.sliderY=b.pageY-a.$el.offset().top-a.paneTop-(a.offsetY||.5*a.sliderHeight),a.scroll(),a.contentScrollTop>=a.maxScrollTop&&a.prevScrollTop!==a.maxScrollTop?a.$el.trigger("scrollend"):0===a.contentScrollTop&&0!==a.prevScrollTop&&a.$el.trigger("scrolltop"),!1}}(this),up:function(a){return function(b){return a.isBeingDragged=!1,a.pane.removeClass(a.options.activeClass),a.doc.unbind(n,a.events[h]).unbind(o,a.events[w]),a.body.unbind(m,a.events[i]),!1}}(this),resize:function(a){return function(b){a.reset()}}(this),panedown:function(a){return function(b){return a.sliderY=(b.offsetY||b.originalEvent.layerY)-.5*a.sliderHeight,a.scroll(),a.events.down(b),!1}}(this),scroll:function(a){return function(b){a.updateScrollValues(),a.isBeingDragged||(a.iOSNativeScrolling||(a.sliderY=a.sliderTop,a.setOnScrollStyles()),null!=b&&(a.contentScrollTop>=a.maxScrollTop?(a.options.preventPageScrolling&&a.preventScrolling(b,g),a.prevScrollTop!==a.maxScrollTop&&a.$el.trigger("scrollend")):0===a.contentScrollTop&&(a.options.preventPageScrolling&&a.preventScrolling(b,w),0!==a.prevScrollTop&&a.$el.trigger("scrolltop"))))}}(this),wheel:function(a){return function(b){var c;return null!=b?(c=b.delta||b.wheelDelta||b.originalEvent&&b.originalEvent.wheelDelta||-b.detail||b.originalEvent&&-b.originalEvent.detail,c&&(a.sliderY+=-c/3),a.scroll(),!1):void 0}}(this),enter:function(a){return function(b){var c;return a.isBeingDragged&&1!==(b.buttons||b.which)?(c=a.events)[w].apply(c,arguments):void 0}}(this)}},j.prototype.addEvents=function(){var a;this.removeEvents(),a=this.events,this.options.disableResize||this.win.bind(s,a[s]),this.iOSNativeScrolling||(this.slider.bind(l,a[g]),this.pane.bind(l,a[r]).bind(""+p+" "+f,a[x])),this.$content.bind(""+t+" "+p+" "+f+" "+v,a[t])},j.prototype.removeEvents=function(){var a;a=this.events,this.win.unbind(s,a[s]),this.iOSNativeScrolling||(this.slider.unbind(),this.pane.unbind()),this.$content.unbind(""+t+" "+p+" "+f+" "+v,a[t])},j.prototype.generate=function(){var a,c,d,f,g,h,i;return f=this.options,h=f.paneClass,i=f.sliderClass,a=f.contentClass,(g=this.$el.children("."+h)).length||g.children("."+i).length||this.$el.append('<div class="'+h+'"><div class="'+i+'" /></div>'),this.pane=this.$el.children("."+h),this.slider=this.pane.find("."+i),0===e&&C()?(d=b.getComputedStyle(this.content,null).getPropertyValue("padding-right").replace(/[^0-9.]+/g,""),c={right:-14,paddingRight:+d+14}):e&&(c={right:-e},this.$el.addClass(f.enabledClass)),null!=c&&this.$content.css(c),this},j.prototype.restore=function(){this.stopped=!1,this.iOSNativeScrolling||this.pane.show(),this.addEvents()},j.prototype.reset=function(){var a,b,c,f,g,h,i,j,k,l,m,n;return this.iOSNativeScrolling?void(this.contentHeight=this.content.scrollHeight):(this.$el.find("."+this.options.paneClass).length||this.generate().stop(),this.stopped&&this.restore(),a=this.content,f=a.style,g=f.overflowY,d&&this.$content.css({height:this.$content.height()}),b=a.scrollHeight+e,l=parseInt(this.$el.css("max-height"),10),l>0&&(this.$el.height(""),this.$el.height(a.scrollHeight>l?l:a.scrollHeight)),i=this.pane.outerHeight(!1),k=parseInt(this.pane.css("top"),10),h=parseInt(this.pane.css("bottom"),10),j=i+k+h,n=Math.round(j/b*i),n<this.options.sliderMinHeight?n=this.options.sliderMinHeight:null!=this.options.sliderMaxHeight&&n>this.options.sliderMaxHeight&&(n=this.options.sliderMaxHeight),g===t&&f.overflowX!==t&&(n+=e),this.maxSliderTop=j-n,this.contentHeight=b,this.paneHeight=i,this.paneOuterHeight=j,this.sliderHeight=n,this.paneTop=k,this.slider.height(n),this.events.scroll(),this.pane.show(),this.isActive=!0,a.scrollHeight===a.clientHeight||this.pane.outerHeight(!0)>=a.scrollHeight&&g!==t?(this.pane.hide(),this.isActive=!1):this.el.clientHeight===a.scrollHeight&&g===t?this.slider.hide():this.slider.show(),this.pane.css({opacity:this.options.alwaysVisible?1:"",visibility:this.options.alwaysVisible?"visible":""}),c=this.$content.css("position"),("static"===c||"relative"===c)&&(m=parseInt(this.$content.css("right"),10),m&&this.$content.css({right:"",marginRight:m})),this)},j.prototype.scroll=function(){return this.isActive?(this.sliderY=Math.max(0,this.sliderY),this.sliderY=Math.min(this.maxSliderTop,this.sliderY),this.$content.scrollTop(this.maxScrollTop*this.sliderY/this.maxSliderTop),this.iOSNativeScrolling||(this.updateScrollValues(),this.setOnScrollStyles()),this):void 0},j.prototype.scrollBottom=function(a){return this.isActive?(this.$content.scrollTop(this.contentHeight-this.$content.height()-a).trigger(p),this.stop().restore(),this):void 0},j.prototype.scrollTop=function(a){return this.isActive?(this.$content.scrollTop(+a).trigger(p),this.stop().restore(),this):void 0},j.prototype.scrollTo=function(a){return this.isActive?(this.scrollTop(this.$el.find(a).get(0).offsetTop),this):void 0},j.prototype.stop=function(){return y&&this.scrollRAF&&(y(this.scrollRAF),this.scrollRAF=null),this.stopped=!0,this.removeEvents(),this.iOSNativeScrolling||this.pane.hide(),this},j.prototype.destroy=function(){return this.stopped||this.stop(),!this.iOSNativeScrolling&&this.pane.length&&this.pane.remove(),d&&this.$content.height(""),this.$content.removeAttr("tabindex"),this.$el.hasClass(this.options.enabledClass)&&(this.$el.removeClass(this.options.enabledClass),this.$content.css({right:""})),this},j.prototype.flash=function(){return!this.iOSNativeScrolling&&this.isActive?(this.reset(),this.pane.addClass(this.options.flashedClass),setTimeout(function(a){return function(){a.pane.removeClass(a.options.flashedClass)}}(this),this.options.flashDelay),this):void 0},j}(),a.fn.nanoScroller=function(b){return this.each(function(){var c,d;if((d=this.nanoscroller)||(c=a.extend({},z,b),this.nanoscroller=d=new q(this,c)),b&&"object"==typeof b){if(a.extend(d.options,b),null!=b.scrollBottom)return d.scrollBottom(b.scrollBottom);if(null!=b.scrollTop)return d.scrollTop(b.scrollTop);if(b.scrollTo)return d.scrollTo(b.scrollTo);if("bottom"===b.scroll)return d.scrollBottom(0);if("top"===b.scroll)return d.scrollTop(0);if(b.scroll&&b.scroll instanceof a)return d.scrollTo(b.scroll);if(b.stop)return d.stop();if(b.destroy)return d.destroy();if(b.flash)return d.flash()}return d.reset()})},a.fn.nanoScroller.Constructor=q}),!function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b(require,exports,module):a.Tether=b()}(this,function(a,b,c){"use strict";function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function e(a){var b=getComputedStyle(a),c=b.position;if("fixed"===c)return a;for(var d=a;d=d.parentNode;){var e=void 0;try{e=getComputedStyle(d)}catch(f){}if("undefined"==typeof e||null===e)return d;var g=e.overflow,h=e.overflowX,i=e.overflowY;if(/(auto|scroll)/.test(g+i+h)&&("absolute"!==c||["relative","absolute","fixed"].indexOf(e.position)>=0))return d}return document.body}function f(a){var b=void 0;a===document?(b=document,a=document.documentElement):b=a.ownerDocument;var c=b.documentElement,d={},e=a.getBoundingClientRect();for(var f in e)d[f]=e[f];var g=y(b);return d.top-=g.top,d.left-=g.left,"undefined"==typeof d.width&&(d.width=document.body.scrollWidth-d.left-d.right),"undefined"==typeof d.height&&(d.height=document.body.scrollHeight-d.top-d.bottom),d.top=d.top-c.clientTop,d.left=d.left-c.clientLeft,d.right=b.body.clientWidth-d.width-d.left,d.bottom=b.body.clientHeight-d.height-d.top,d}function g(a){return a.offsetParent||document.documentElement}function h(){var a=document.createElement("div");a.style.width="100%",a.style.height="200px";var b=document.createElement("div");i(b.style,{position:"absolute",top:0,left:0,pointerEvents:"none",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),b.appendChild(a),document.body.appendChild(b);var c=a.offsetWidth;b.style.overflow="scroll";var d=a.offsetWidth;c===d&&(d=b.clientWidth),document.body.removeChild(b);var e=c-d;return{width:e,height:e}}function i(){var a=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],b=[];return Array.prototype.push.apply(b,arguments),b.slice(1).forEach(function(b){if(b)for(var c in b)({}).hasOwnProperty.call(b,c)&&(a[c]=b[c])}),a}function j(a,b){if("undefined"!=typeof a.classList)b.split(" ").forEach(function(b){b.trim()&&a.classList.remove(b)});else{var c=new RegExp("(^| )"+b.split(" ").join("|")+"( |$)","gi"),d=m(a).replace(c," ");n(a,d)}}function k(a,b){if("undefined"!=typeof a.classList)b.split(" ").forEach(function(b){b.trim()&&a.classList.add(b)});else{j(a,b);var c=m(a)+(" "+b);n(a,c)}}function l(a,b){if("undefined"!=typeof a.classList)return a.classList.contains(b);var c=m(a);return new RegExp("(^| )"+b+"( |$)","gi").test(c)}function m(a){return a.className instanceof SVGAnimatedString?a.className.baseVal:a.className}function n(a,b){a.setAttribute("class",b)}function o(a,b,c){c.forEach(function(c){-1===b.indexOf(c)&&l(a,c)&&j(a,c)}),b.forEach(function(b){l(a,b)||k(a,b)})}function d(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function p(a,b){var c=arguments.length<=2||void 0===arguments[2]?1:arguments[2];return a+c>=b&&b>=a-c}function q(){return"undefined"!=typeof performance&&"undefined"!=typeof performance.now?performance.now():+new Date}function r(){for(var a={top:0,left:0},b=arguments.length,c=Array(b),d=0;b>d;d++)c[d]=arguments[d];return c.forEach(function(b){var c=b.top,d=b.left;"string"==typeof c&&(c=parseFloat(c,10)),"string"==typeof d&&(d=parseFloat(d,10)),a.top+=c,a.left+=d}),a}function s(a,b){return"string"==typeof a.left&&-1!==a.left.indexOf("%")&&(a.left=parseFloat(a.left,10)/100*b.width),"string"==typeof a.top&&-1!==a.top.indexOf("%")&&(a.top=parseFloat(a.top,10)/100*b.height),a}function t(a,b){return"scrollParent"===b?b=a.scrollParent:"window"===b&&(b=[pageXOffset,pageYOffset,innerWidth+pageXOffset,innerHeight+pageYOffset]),b===document&&(b=b.documentElement),"undefined"!=typeof b.nodeType&&!function(){var a=f(b),c=a,d=getComputedStyle(b);b=[c.left,c.top,a.width+c.left,a.height+c.top],R.forEach(function(a,c){a=a[0].toUpperCase()+a.substr(1),"Top"===a||"Left"===a?b[c]+=parseFloat(d["border"+a+"Width"]):b[c]-=parseFloat(d["border"+a+"Width"])})}(),b}var u=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),v=void 0;"undefined"==typeof v&&(v={modules:[]});var w=function(){var a=0;return function(){return++a}}(),x={},y=function(a){var b=a._tetherZeroElement;"undefined"==typeof b&&(b=a.createElement("div"),b.setAttribute("data-tether-id",w()),i(b.style,{top:0,left:0,position:"absolute"}),a.body.appendChild(b),a._tetherZeroElement=b);var c=b.getAttribute("data-tether-id");if("undefined"==typeof x[c]){x[c]={};var d=b.getBoundingClientRect();for(var e in d)x[c][e]=d[e];A(function(){delete x[c]})}return x[c]},z=[],A=function(a){z.push(a)},B=function(){for(var a=void 0;a=z.pop();)a()},C=function(){function a(){d(this,a)}return u(a,[{key:"on",value:function(a,b,c){var d=arguments.length<=3||void 0===arguments[3]?!1:arguments[3];"undefined"==typeof this.bindings&&(this.bindings={}),"undefined"==typeof this.bindings[a]&&(this.bindings[a]=[]),this.bindings[a].push({handler:b,ctx:c,once:d})}},{key:"once",value:function(a,b,c){this.on(a,b,c,!0)}},{key:"off",value:function(a,b){if("undefined"==typeof this.bindings||"undefined"==typeof this.bindings[a])if("undefined"==typeof b)delete this.bindings[a];else for(var c=0;c<this.bindings[a].length;)this.bindings[a][c].handler===b?this.bindings[a].splice(c,1):++c}},{key:"trigger",value:function(a){if("undefined"!=typeof this.bindings&&this.bindings[a])for(var b=0;b<this.bindings[a].length;){var c=this.bindings[a][b],d=c.handler,e=c.ctx,f=c.once,g=e;"undefined"==typeof g&&(g=this);for(var h=arguments.length,i=Array(h>1?h-1:0),j=1;h>j;j++)i[j-1]=arguments[j];d.apply(g,i),f?this.bindings[a].splice(b,1):++b}}}]),a}();v.Utils={getScrollParent:e,getBounds:f,getOffsetParent:g,extend:i,addClass:k,removeClass:j,hasClass:l,updateClasses:o,defer:A,flush:B,uniqueId:w,Evented:C,getScrollBarSize:h};var D=function(){function a(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!b||c.length!==b);d=!0);}catch(i){e=!0,f=i}finally{try{!d&&h["return"]&&h["return"]()}finally{if(e)throw f}}return c}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),u=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();if("undefined"==typeof v)throw new Error("You must include the utils.js file before tether.js");var E=v.Utils,e=E.getScrollParent,f=E.getBounds,g=E.getOffsetParent,i=E.extend,k=E.addClass,j=E.removeClass,o=E.updateClasses,A=E.defer,B=E.flush,h=E.getScrollBarSize,F=function(){for(var a=document.createElement("div"),b=["transform","webkitTransform","OTransform","MozTransform","msTransform"],c=0;c<b.length;++c){var d=b[c];if(void 0!==a.style[d])return d}}(),G=[],H=function(){G.forEach(function(a){a.position(!1)}),B()};!function(){var a=null,b=null,c=null,d=function e(){return"undefined"!=typeof b&&b>16?(b=Math.min(b-16,250),void(c=setTimeout(e,250))):void("undefined"!=typeof a&&q()-a<10||("undefined"!=typeof c&&(clearTimeout(c),c=null),a=q(),H(),b=q()-a))};["resize","scroll","touchmove"].forEach(function(a){window.addEventListener(a,d)})}();var I={center:"center",left:"right",right:"left"},J={middle:"middle",top:"bottom",bottom:"top"},K={top:0,left:0,middle:"50%",center:"50%",bottom:"100%",right:"100%"},L=function(a,b){var c=a.left,d=a.top;return"auto"===c&&(c=I[b.left]),"auto"===d&&(d=J[b.top]),{left:c,top:d}},M=function(a){var b=a.left,c=a.top;return"undefined"!=typeof K[a.left]&&(b=K[a.left]),"undefined"!=typeof K[a.top]&&(c=K[a.top]),{left:b,top:c}},N=function(a){var b=a.split(" "),c=D(b,2),d=c[0],e=c[1];return{top:d,left:e}},O=N,P=function(){function a(b){var c=this;d(this,a),this.position=this.position.bind(this),G.push(this),this.history=[],this.setOptions(b,!1),v.modules.forEach(function(a){"undefined"!=typeof a.initialize&&a.initialize.call(c)}),this.position()}return u(a,[{key:"getClass",value:function(){var a=arguments.length<=0||void 0===arguments[0]?"":arguments[0],b=this.options.classes;return"undefined"!=typeof b&&b[a]?this.options.classes[a]:this.options.classPrefix?this.options.classPrefix+"-"+a:a}},{key:"setOptions",value:function(a){var b=this,c=arguments.length<=1||void 0===arguments[1]?!0:arguments[1],d={offset:"0 0",targetOffset:"0 0",targetAttachment:"auto auto",classPrefix:"tether"};this.options=i(d,a);var f=this.options,g=f.element,h=f.target,j=f.targetModifier;if(this.element=g,this.target=h,this.targetModifier=j,"viewport"===this.target?(this.target=document.body,this.targetModifier="visible"):"scroll-handle"===this.target&&(this.target=document.body,this.targetModifier="scroll-handle"),["element","target"].forEach(function(a){if("undefined"==typeof b[a])throw new Error("Tether Error: Both element and target must be defined");"undefined"!=typeof b[a].jquery?b[a]=b[a][0]:"string"==typeof b[a]&&(b[a]=document.querySelector(b[a]))}),k(this.element,this.getClass("element")),this.options.addTargetClasses!==!1&&k(this.target,this.getClass("target")),!this.options.attachment)throw new Error("Tether Error: You must provide an attachment");this.targetAttachment=O(this.options.targetAttachment),this.attachment=O(this.options.attachment),this.offset=N(this.options.offset),this.targetOffset=N(this.options.targetOffset),"undefined"!=typeof this.scrollParent&&this.disable(),this.scrollParent="scroll-handle"===this.targetModifier?this.target:e(this.target),this.options.enabled!==!1&&this.enable(c)}},{key:"getTargetBounds",value:function(){if("undefined"==typeof this.targetModifier)return f(this.target);if("visible"===this.targetModifier){if(this.target===document.body)return{top:pageYOffset,left:pageXOffset,height:innerHeight,width:innerWidth};var a=f(this.target),b={height:a.height,width:a.width,top:a.top,left:a.left};return b.height=Math.min(b.height,a.height-(pageYOffset-a.top)),b.height=Math.min(b.height,a.height-(a.top+a.height-(pageYOffset+innerHeight))),b.height=Math.min(innerHeight,b.height),b.height-=2,b.width=Math.min(b.width,a.width-(pageXOffset-a.left)),b.width=Math.min(b.width,a.width-(a.left+a.width-(pageXOffset+innerWidth))),b.width=Math.min(innerWidth,b.width),b.width-=2,b.top<pageYOffset&&(b.top=pageYOffset),b.left<pageXOffset&&(b.left=pageXOffset),b}if("scroll-handle"===this.targetModifier){var a=void 0,c=this.target;c===document.body?(c=document.documentElement,a={left:pageXOffset,top:pageYOffset,height:innerHeight,width:innerWidth}):a=f(c);var d=getComputedStyle(c),e=c.scrollWidth>c.clientWidth||[d.overflow,d.overflowX].indexOf("scroll")>=0||this.target!==document.body,g=0;e&&(g=15);var h=a.height-parseFloat(d.borderTopWidth)-parseFloat(d.borderBottomWidth)-g,b={width:15,height:.975*h*(h/c.scrollHeight),left:a.left+a.width-parseFloat(d.borderLeftWidth)-15},i=0;408>h&&this.target===document.body&&(i=-11e-5*Math.pow(h,2)-.00727*h+22.58),this.target!==document.body&&(b.height=Math.max(b.height,24));var j=this.target.scrollTop/(c.scrollHeight-h);return b.top=j*(h-b.height-i)+a.top+parseFloat(d.borderTopWidth),this.target===document.body&&(b.height=Math.max(b.height,24)),b}}},{key:"clearCache",value:function(){this._cache={}}},{key:"cache",value:function(a,b){return"undefined"==typeof this._cache&&(this._cache={}),"undefined"==typeof this._cache[a]&&(this._cache[a]=b.call(this)),this._cache[a]}},{key:"enable",value:function(){var a=arguments.length<=0||void 0===arguments[0]?!0:arguments[0];this.options.addTargetClasses!==!1&&k(this.target,this.getClass("enabled")),k(this.element,this.getClass("enabled")),this.enabled=!0,this.scrollParent!==document&&this.scrollParent.addEventListener("scroll",this.position),a&&this.position()}},{key:"disable",value:function(){j(this.target,this.getClass("enabled")),j(this.element,this.getClass("enabled")),this.enabled=!1,"undefined"!=typeof this.scrollParent&&this.scrollParent.removeEventListener("scroll",this.position)}},{key:"destroy",value:function(){var a=this;this.disable(),G.forEach(function(b,c){return b===a?void G.splice(c,1):void 0})}},{key:"updateAttachClasses",value:function(a,b){var c=this;a=a||this.attachment,b=b||this.targetAttachment;var d=["left","top","bottom","right","middle","center"];"undefined"!=typeof this._addAttachClasses&&this._addAttachClasses.length&&this._addAttachClasses.splice(0,this._addAttachClasses.length),"undefined"==typeof this._addAttachClasses&&(this._addAttachClasses=[]);var e=this._addAttachClasses;a.top&&e.push(this.getClass("element-attached")+"-"+a.top),a.left&&e.push(this.getClass("element-attached")+"-"+a.left),b.top&&e.push(this.getClass("target-attached")+"-"+b.top),b.left&&e.push(this.getClass("target-attached")+"-"+b.left);var f=[];d.forEach(function(a){f.push(c.getClass("element-attached")+"-"+a),f.push(c.getClass("target-attached")+"-"+a)}),A(function(){"undefined"!=typeof c._addAttachClasses&&(o(c.element,c._addAttachClasses,f),c.options.addTargetClasses!==!1&&o(c.target,c._addAttachClasses,f),delete c._addAttachClasses)})}},{key:"position",value:function(){var a=this,b=arguments.length<=0||void 0===arguments[0]?!0:arguments[0];if(this.enabled){this.clearCache();var c=L(this.targetAttachment,this.attachment);this.updateAttachClasses(this.attachment,c);var d=this.cache("element-bounds",function(){return f(a.element)}),e=d.width,i=d.height;if(0===e&&0===i&&"undefined"!=typeof this.lastSize){var j=this.lastSize;e=j.width,i=j.height}else this.lastSize={width:e,height:i};var k=this.cache("target-bounds",function(){return a.getTargetBounds()}),l=k,m=s(M(this.attachment),{width:e,height:i}),n=s(M(c),l),o=s(this.offset,{width:e,height:i}),p=s(this.targetOffset,l);m=r(m,o),n=r(n,p);for(var q=k.left+n.left-m.left,t=k.top+n.top-m.top,u=0;u<v.modules.length;++u){var w=v.modules[u],x=w.position.call(this,{left:q,top:t,targetAttachment:c,targetPos:k,elementPos:d,offset:m,targetOffset:n,manualOffset:o,manualTargetOffset:p,scrollbarSize:z,attachment:this.attachment});if(x===!1)return!1;"undefined"!=typeof x&&"object"==typeof x&&(t=x.top,q=x.left)}var y={page:{top:t,left:q},viewport:{top:t-pageYOffset,bottom:pageYOffset-t-i+innerHeight,left:q-pageXOffset,right:pageXOffset-q-e+innerWidth}},z=void 0;return document.body.scrollWidth>window.innerWidth&&(z=this.cache("scrollbar-size",h),y.viewport.bottom-=z.height),document.body.scrollHeight>window.innerHeight&&(z=this.cache("scrollbar-size",h),y.viewport.right-=z.width),(-1===["","static"].indexOf(document.body.style.position)||-1===["","static"].indexOf(document.body.parentElement.style.position))&&(y.page.bottom=document.body.scrollHeight-t-i,y.page.right=document.body.scrollWidth-q-e),"undefined"!=typeof this.options.optimizations&&this.options.optimizations.moveElement!==!1&&"undefined"==typeof this.targetModifier&&!function(){var b=a.cache("target-offsetparent",function(){return g(a.target)}),c=a.cache("target-offsetparent-bounds",function(){return f(b)}),d=getComputedStyle(b),e=c,h={};if(["Top","Left","Bottom","Right"].forEach(function(a){h[a.toLowerCase()]=parseFloat(d["border"+a+"Width"])}),c.right=document.body.scrollWidth-c.left-e.width+h.right,c.bottom=document.body.scrollHeight-c.top-e.height+h.bottom,y.page.top>=c.top+h.top&&y.page.bottom>=c.bottom&&y.page.left>=c.left+h.left&&y.page.right>=c.right){var i=b.scrollTop,j=b.scrollLeft;y.offset={top:y.page.top-c.top+i-h.top,left:y.page.left-c.left+j-h.left}}}(),this.move(y),this.history.unshift(y),this.history.length>3&&this.history.pop(),b&&B(),!0}}},{key:"move",value:function(a){var b=this;if("undefined"!=typeof this.element.parentNode){var c={};for(var d in a){c[d]={};for(var e in a[d]){for(var f=!1,h=0;h<this.history.length;++h){var j=this.history[h];if("undefined"!=typeof j[d]&&!p(j[d][e],a[d][e])){f=!0;break}}f||(c[d][e]=!0)}}var k={top:"",left:"",right:"",bottom:""},l=function(a,c){var d="undefined"!=typeof b.options.optimizations,e=d?b.options.optimizations.gpu:null;if(e!==!1){var f=void 0,g=void 0;a.top?(k.top=0,f=c.top):(k.bottom=0,f=-c.bottom),a.left?(k.left=0,g=c.left):(k.right=0,g=-c.right),k[F]="translateX("+Math.round(g)+"px) translateY("+Math.round(f)+"px)","msTransform"!==F&&(k[F]+=" translateZ(0)")}else a.top?k.top=c.top+"px":k.bottom=c.bottom+"px",a.left?k.left=c.left+"px":k.right=c.right+"px"},m=!1;if((c.page.top||c.page.bottom)&&(c.page.left||c.page.right)?(k.position="absolute",l(c.page,a.page)):(c.viewport.top||c.viewport.bottom)&&(c.viewport.left||c.viewport.right)?(k.position="fixed",l(c.viewport,a.viewport)):"undefined"!=typeof c.offset&&c.offset.top&&c.offset.left?!function(){k.position="absolute";var d=b.cache("target-offsetparent",function(){return g(b.target)});g(b.element)!==d&&A(function(){b.element.parentNode.removeChild(b.element),d.appendChild(b.element)}),l(c.offset,a.offset),m=!0}():(k.position="absolute",l({top:!0,left:!0},a.page)),!m){for(var n=!0,o=this.element.parentNode;o&&"BODY"!==o.tagName;){if("static"!==getComputedStyle(o).position){n=!1;break}o=o.parentNode}n||(this.element.parentNode.removeChild(this.element),document.body.appendChild(this.element))}var q={},r=!1;for(var e in k){var s=k[e],t=this.element.style[e];""!==t&&""!==s&&["top","left","bottom","right"].indexOf(e)>=0&&(t=parseFloat(t),s=parseFloat(s)),t!==s&&(r=!0,q[e]=s)}r&&A(function(){i(b.element.style,q)})}}}]),a}();P.modules=[],v.position=H;var Q=i(P,v),D=function(){function a(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!b||c.length!==b);d=!0);}catch(i){e=!0,f=i}finally{try{!d&&h["return"]&&h["return"]()}finally{if(e)throw f}}return c}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),E=v.Utils,f=E.getBounds,i=E.extend,o=E.updateClasses,A=E.defer,R=["left","top","right","bottom"];v.modules.push({position:function(a){var b=this,c=a.top,d=a.left,e=a.targetAttachment;if(!this.options.constraints)return!0;var g=this.cache("element-bounds",function(){return f(b.element)}),h=g.height,j=g.width;if(0===j&&0===h&&"undefined"!=typeof this.lastSize){var k=this.lastSize;j=k.width,h=k.height}var l=this.cache("target-bounds",function(){return b.getTargetBounds()}),m=l.height,n=l.width,p=[this.getClass("pinned"),this.getClass("out-of-bounds")];this.options.constraints.forEach(function(a){var b=a.outOfBoundsClass,c=a.pinnedClass;b&&p.push(b),c&&p.push(c)}),p.forEach(function(a){["left","top","right","bottom"].forEach(function(b){p.push(a+"-"+b)})});var q=[],r=i({},e),s=i({},this.attachment);return this.options.constraints.forEach(function(a){var f=a.to,g=a.attachment,i=a.pin;"undefined"==typeof g&&(g="");var k=void 0,l=void 0;if(g.indexOf(" ")>=0){var o=g.split(" "),p=D(o,2);l=p[0],k=p[1]}else k=l=g;var u=t(b,f);("target"===l||"both"===l)&&(c<u[1]&&"top"===r.top&&(c+=m,r.top="bottom"),c+h>u[3]&&"bottom"===r.top&&(c-=m,r.top="top")),"together"===l&&(c<u[1]&&"top"===r.top&&("bottom"===s.top?(c+=m,r.top="bottom",c+=h,s.top="top"):"top"===s.top&&(c+=m,r.top="bottom",c-=h,s.top="bottom")),c+h>u[3]&&"bottom"===r.top&&("top"===s.top?(c-=m,r.top="top",c-=h,s.top="bottom"):"bottom"===s.top&&(c-=m,r.top="top",c+=h,s.top="top")),"middle"===r.top&&(c+h>u[3]&&"top"===s.top?(c-=h,s.top="bottom"):c<u[1]&&"bottom"===s.top&&(c+=h,s.top="top"))),("target"===k||"both"===k)&&(d<u[0]&&"left"===r.left&&(d+=n,r.left="right"),d+j>u[2]&&"right"===r.left&&(d-=n,r.left="left")),"together"===k&&(d<u[0]&&"left"===r.left?"right"===s.left?(d+=n,r.left="right",d+=j,s.left="left"):"left"===s.left&&(d+=n,r.left="right",d-=j,s.left="right"):d+j>u[2]&&"right"===r.left?"left"===s.left?(d-=n,r.left="left",d-=j,s.left="right"):"right"===s.left&&(d-=n,r.left="left",d+=j,s.left="left"):"center"===r.left&&(d+j>u[2]&&"left"===s.left?(d-=j,s.left="right"):d<u[0]&&"right"===s.left&&(d+=j,s.left="left"))),("element"===l||"both"===l)&&(c<u[1]&&"bottom"===s.top&&(c+=h,s.top="top"),c+h>u[3]&&"top"===s.top&&(c-=h,s.top="bottom")),("element"===k||"both"===k)&&(d<u[0]&&"right"===s.left&&(d+=j,s.left="left"),d+j>u[2]&&"left"===s.left&&(d-=j,s.left="right")),"string"==typeof i?i=i.split(",").map(function(a){return a.trim()}):i===!0&&(i=["top","left","right","bottom"]),i=i||[];var v=[],w=[];c<u[1]&&(i.indexOf("top")>=0?(c=u[1],v.push("top")):w.push("top")),c+h>u[3]&&(i.indexOf("bottom")>=0?(c=u[3]-h,v.push("bottom")):w.push("bottom")),d<u[0]&&(i.indexOf("left")>=0?(d=u[0],v.push("left")):w.push("left")),d+j>u[2]&&(i.indexOf("right")>=0?(d=u[2]-j,v.push("right")):w.push("right")),v.length&&!function(){var a=void 0;a="undefined"!=typeof b.options.pinnedClass?b.options.pinnedClass:b.getClass("pinned"),
q.push(a),v.forEach(function(b){q.push(a+"-"+b)})}(),w.length&&!function(){var a=void 0;a="undefined"!=typeof b.options.outOfBoundsClass?b.options.outOfBoundsClass:b.getClass("out-of-bounds"),q.push(a),w.forEach(function(b){q.push(a+"-"+b)})}(),(v.indexOf("left")>=0||v.indexOf("right")>=0)&&(s.left=r.left=!1),(v.indexOf("top")>=0||v.indexOf("bottom")>=0)&&(s.top=r.top=!1),(r.top!==e.top||r.left!==e.left||s.top!==b.attachment.top||s.left!==b.attachment.left)&&b.updateAttachClasses(s,r)}),A(function(){b.options.addTargetClasses!==!1&&o(b.target,q,p),o(b.element,q,p)}),{top:c,left:d}}});var E=v.Utils,f=E.getBounds,o=E.updateClasses,A=E.defer;v.modules.push({position:function(a){var b=this,c=a.top,d=a.left,e=this.cache("element-bounds",function(){return f(b.element)}),g=e.height,h=e.width,i=this.getTargetBounds(),j=c+g,k=d+h,l=[];c<=i.bottom&&j>=i.top&&["left","right"].forEach(function(a){var b=i[a];(b===d||b===k)&&l.push(a)}),d<=i.right&&k>=i.left&&["top","bottom"].forEach(function(a){var b=i[a];(b===c||b===j)&&l.push(a)});var m=[],n=[],p=["left","top","right","bottom"];return m.push(this.getClass("abutted")),p.forEach(function(a){m.push(b.getClass("abutted")+"-"+a)}),l.length&&n.push(this.getClass("abutted")),l.forEach(function(a){n.push(b.getClass("abutted")+"-"+a)}),A(function(){b.options.addTargetClasses!==!1&&o(b.target,n,m),o(b.element,n,m)}),!0}});var D=function(){function a(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!b||c.length!==b);d=!0);}catch(i){e=!0,f=i}finally{try{!d&&h["return"]&&h["return"]()}finally{if(e)throw f}}return c}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();return v.modules.push({position:function(a){var b=a.top,c=a.left;if(this.options.shift){var d=this.options.shift;"function"==typeof this.options.shift&&(d=this.options.shift.call(this,{top:b,left:c}));var e=void 0,f=void 0;if("string"==typeof d){d=d.split(" "),d[1]=d[1]||d[0];var g=D(d,2);e=g[0],f=g[1],e=parseFloat(e,10),f=parseFloat(f,10)}else e=d.top,f=d.left;return b+=e,c+=f,{top:b,left:c}}}}),Q});var Config={};Config.Emoji={"00a9":["\xa9",["copyright"]],"00ae":["\xae",["registered"]],"203c":["\u203c",["bangbang"]],2049:["\u2049",["interrobang"]],2122:["\u2122",["tm"]],2139:["\u2139",["information_source"]],2194:["\u2194",["left_right_arrow"]],2195:["\u2195",["arrow_up_down"]],2196:["\u2196",["arrow_upper_left"]],2197:["\u2197",["arrow_upper_right"]],2198:["\u2198",["arrow_lower_right"]],2199:["\u2199",["arrow_lower_left"]],"21a9":["\u21a9",["leftwards_arrow_with_hook"]],"21aa":["\u21aa",["arrow_right_hook"]],"231a":["\u231a",["watch"]],"231b":["\u231b",["hourglass"]],"23e9":["\u23e9",["fast_forward"]],"23ea":["\u23ea",["rewind"]],"23eb":["\u23eb",["arrow_double_up"]],"23ec":["\u23ec",["arrow_double_down"]],"23f0":["\u23f0",["alarm_clock"]],"23f3":["\u23f3",["hourglass_flowing_sand"]],"24c2":["\u24c2",["m"]],"25aa":["\u25aa",["black_small_square"]],"25ab":["\u25ab",["white_small_square"]],"25b6":["\u25b6",["arrow_forward"]],"25c0":["\u25c0",["arrow_backward"]],"25fb":["\u25fb",["white_medium_square"]],"25fc":["\u25fc",["black_medium_square"]],"25fd":["\u25fd",["white_medium_small_square"]],"25fe":["\u25fe",["black_medium_small_square"]],2600:["\u2600",["sunny"]],2601:["\u2601",["cloud"]],"260e":["\u260e",["phone","telephone"]],2611:["\u2611",["ballot_box_with_check"]],2614:["\u2614",["umbrella"]],2615:["\u2615",["coffee"]],"261d":["\u261d",["point_up"]],"263a":["\u263a",["relaxed"]],2648:["\u2648",["aries"]],2649:["\u2649",["taurus"]],"264a":["\u264a",["gemini"]],"264b":["\u264b",["cancer"]],"264c":["\u264c",["leo"]],"264d":["\u264d",["virgo"]],"264e":["\u264e",["libra"]],"264f":["\u264f",["scorpius"]],2650:["\u2650",["sagittarius"]],2651:["\u2651",["capricorn"]],2652:["\u2652",["aquarius"]],2653:["\u2653",["pisces"]],2660:["\u2660",["spades"]],2663:["\u2663",["clubs"]],2665:["\u2665",["hearts"]],2666:["\u2666",["diamonds"]],2668:["\u2668",["hotsprings"]],"267b":["\u267b",["recycle"]],"267f":["\u267f",["wheelchair"]],2693:["\u2693",["anchor"]],"26a0":["\u26a0",["warning"]],"26a1":["\u26a1",["zap"]],"26aa":["\u26aa",["white_circle"]],"26ab":["\u26ab",["black_circle"]],"26bd":["\u26bd",["soccer"]],"26be":["\u26be",["baseball"]],"26c4":["\u26c4",["snowman"]],"26c5":["\u26c5",["partly_sunny"]],"26ce":["\u26ce",["ophiuchus"]],"26d4":["\u26d4",["no_entry"]],"26ea":["\u26ea",["church"]],"26f2":["\u26f2",["fountain"]],"26f3":["\u26f3",["golf"]],"26f5":["\u26f5",["boat","sailboat"]],"26fa":["\u26fa",["tent"]],"26fd":["\u26fd",["fuelpump"]],2702:["\u2702",["scissors"]],2705:["\u2705",["white_check_mark"]],2708:["\u2708",["airplane"]],2709:["\u2709",["email","envelope"]],"270a":["\u270a",["fist"]],"270b":["\u270b",["hand","raised_hand"]],"270c":["\u270c",["v"]],"270f":["\u270f",["pencil2"]],2712:["\u2712",["black_nib"]],2714:["\u2714",["heavy_check_mark"]],2716:["\u2716",["heavy_multiplication_x"]],2728:["\u2728",["sparkles"]],2733:["\u2733",["eight_spoked_asterisk"]],2734:["\u2734",["eight_pointed_black_star"]],2744:["\u2744",["snowflake"]],2747:["\u2747",["sparkle"]],"274c":["\u274c",["x"]],"274e":["\u274e",["negative_squared_cross_mark"]],2753:["\u2753",["question"]],2754:["\u2754",["grey_question"]],2755:["\u2755",["grey_exclamation"]],2757:["\u2757",["exclamation","heavy_exclamation_mark"]],2764:["\u2764",["heart"],"<3"],2795:["\u2795",["heavy_plus_sign"]],2796:["\u2796",["heavy_minus_sign"]],2797:["\u2797",["heavy_division_sign"]],"27a1":["\u27a1",["arrow_right"]],"27b0":["\u27b0",["curly_loop"]],"27bf":["\u27bf",["loop"]],2934:["\u2934",["arrow_heading_up"]],2935:["\u2935",["arrow_heading_down"]],"2b05":["\u2b05",["arrow_left"]],"2b06":["\u2b06",["arrow_up"]],"2b07":["\u2b07",["arrow_down"]],"2b1b":["\u2b1b",["black_large_square"]],"2b1c":["\u2b1c",["white_large_square"]],"2b50":["\u2b50",["star"]],"2b55":["\u2b55",["o"]],3030:["\u3030",["wavy_dash"]],"303d":["\u303d",["part_alternation_mark"]],3297:["\u3297",["congratulations"]],3299:["\u3299",["secret"]],"1f004":["\ud83c\udc04",["mahjong"]],"1f0cf":["\ud83c\udccf",["black_joker"]],"1f170":["\ud83c\udd70",["a"]],"1f171":["\ud83c\udd71",["b"]],"1f17e":["\ud83c\udd7e",["o2"]],"1f17f":["\ud83c\udd7f",["parking"]],"1f18e":["\ud83c\udd8e",["ab"]],"1f191":["\ud83c\udd91",["cl"]],"1f192":["\ud83c\udd92",["cool"]],"1f193":["\ud83c\udd93",["free"]],"1f194":["\ud83c\udd94",["id"]],"1f195":["\ud83c\udd95",["new"]],"1f196":["\ud83c\udd96",["ng"]],"1f197":["\ud83c\udd97",["ok"]],"1f198":["\ud83c\udd98",["sos"]],"1f199":["\ud83c\udd99",["up"]],"1f19a":["\ud83c\udd9a",["vs"]],"1f201":["\ud83c\ude01",["koko"]],"1f202":["\ud83c\ude02",["sa"]],"1f21a":["\ud83c\ude1a",["u7121"]],"1f22f":["\ud83c\ude2f",["u6307"]],"1f232":["\ud83c\ude32",["u7981"]],"1f233":["\ud83c\ude33",["u7a7a"]],"1f234":["\ud83c\ude34",["u5408"]],"1f235":["\ud83c\ude35",["u6e80"]],"1f236":["\ud83c\ude36",["u6709"]],"1f237":["\ud83c\ude37",["u6708"]],"1f238":["\ud83c\ude38",["u7533"]],"1f239":["\ud83c\ude39",["u5272"]],"1f23a":["\ud83c\ude3a",["u55b6"]],"1f250":["\ud83c\ude50",["ideograph_advantage"]],"1f251":["\ud83c\ude51",["accept"]],"1f300":["\ud83c\udf00",["cyclone"]],"1f301":["\ud83c\udf01",["foggy"]],"1f302":["\ud83c\udf02",["closed_umbrella"]],"1f303":["\ud83c\udf03",["night_with_stars"]],"1f304":["\ud83c\udf04",["sunrise_over_mountains"]],"1f305":["\ud83c\udf05",["sunrise"]],"1f306":["\ud83c\udf06",["city_sunset"]],"1f307":["\ud83c\udf07",["city_sunrise"]],"1f308":["\ud83c\udf08",["rainbow"]],"1f309":["\ud83c\udf09",["bridge_at_night"]],"1f30a":["\ud83c\udf0a",["ocean"]],"1f30b":["\ud83c\udf0b",["volcano"]],"1f30c":["\ud83c\udf0c",["milky_way"]],"1f30d":["\ud83c\udf0d",["earth_africa"]],"1f30e":["\ud83c\udf0e",["earth_americas"]],"1f30f":["\ud83c\udf0f",["earth_asia"]],"1f310":["\ud83c\udf10",["globe_with_meridians"]],"1f311":["\ud83c\udf11",["new_moon"]],"1f312":["\ud83c\udf12",["waxing_crescent_moon"]],"1f313":["\ud83c\udf13",["first_quarter_moon"]],"1f314":["\ud83c\udf14",["moon","waxing_gibbous_moon"]],"1f315":["\ud83c\udf15",["full_moon"]],"1f316":["\ud83c\udf16",["waning_gibbous_moon"]],"1f317":["\ud83c\udf17",["last_quarter_moon"]],"1f318":["\ud83c\udf18",["waning_crescent_moon"]],"1f319":["\ud83c\udf19",["crescent_moon"]],"1f320":["\ud83c\udf20",["stars"]],"1f31a":["\ud83c\udf1a",["new_moon_with_face"]],"1f31b":["\ud83c\udf1b",["first_quarter_moon_with_face"]],"1f31c":["\ud83c\udf1c",["last_quarter_moon_with_face"]],"1f31d":["\ud83c\udf1d",["full_moon_with_face"]],"1f31e":["\ud83c\udf1e",["sun_with_face"]],"1f31f":["\ud83c\udf1f",["star2"]],"1f330":["\ud83c\udf30",["chestnut"]],"1f331":["\ud83c\udf31",["seedling"]],"1f332":["\ud83c\udf32",["evergreen_tree"]],"1f333":["\ud83c\udf33",["deciduous_tree"]],"1f334":["\ud83c\udf34",["palm_tree"]],"1f335":["\ud83c\udf35",["cactus"]],"1f337":["\ud83c\udf37",["tulip"]],"1f338":["\ud83c\udf38",["cherry_blossom"]],"1f339":["\ud83c\udf39",["rose"]],"1f33a":["\ud83c\udf3a",["hibiscus"]],"1f33b":["\ud83c\udf3b",["sunflower"]],"1f33c":["\ud83c\udf3c",["blossom"]],"1f33d":["\ud83c\udf3d",["corn"]],"1f33e":["\ud83c\udf3e",["ear_of_rice"]],"1f33f":["\ud83c\udf3f",["herb"]],"1f340":["\ud83c\udf40",["four_leaf_clover"]],"1f341":["\ud83c\udf41",["maple_leaf"]],"1f342":["\ud83c\udf42",["fallen_leaf"]],"1f343":["\ud83c\udf43",["leaves"]],"1f344":["\ud83c\udf44",["mushroom"]],"1f345":["\ud83c\udf45",["tomato"]],"1f346":["\ud83c\udf46",["eggplant"]],"1f347":["\ud83c\udf47",["grapes"]],"1f348":["\ud83c\udf48",["melon"]],"1f349":["\ud83c\udf49",["watermelon"]],"1f34a":["\ud83c\udf4a",["tangerine"]],"1f34b":["\ud83c\udf4b",["lemon"]],"1f34c":["\ud83c\udf4c",["banana"]],"1f34d":["\ud83c\udf4d",["pineapple"]],"1f34e":["\ud83c\udf4e",["apple"]],"1f34f":["\ud83c\udf4f",["green_apple"]],"1f350":["\ud83c\udf50",["pear"]],"1f351":["\ud83c\udf51",["peach"]],"1f352":["\ud83c\udf52",["cherries"]],"1f353":["\ud83c\udf53",["strawberry"]],"1f354":["\ud83c\udf54",["hamburger"]],"1f355":["\ud83c\udf55",["pizza"]],"1f356":["\ud83c\udf56",["meat_on_bone"]],"1f357":["\ud83c\udf57",["poultry_leg"]],"1f358":["\ud83c\udf58",["rice_cracker"]],"1f359":["\ud83c\udf59",["rice_ball"]],"1f35a":["\ud83c\udf5a",["rice"]],"1f35b":["\ud83c\udf5b",["curry"]],"1f35c":["\ud83c\udf5c",["ramen"]],"1f35d":["\ud83c\udf5d",["spaghetti"]],"1f35e":["\ud83c\udf5e",["bread"]],"1f35f":["\ud83c\udf5f",["fries"]],"1f360":["\ud83c\udf60",["sweet_potato"]],"1f361":["\ud83c\udf61",["dango"]],"1f362":["\ud83c\udf62",["oden"]],"1f363":["\ud83c\udf63",["sushi"]],"1f364":["\ud83c\udf64",["fried_shrimp"]],"1f365":["\ud83c\udf65",["fish_cake"]],"1f366":["\ud83c\udf66",["icecream"]],"1f367":["\ud83c\udf67",["shaved_ice"]],"1f368":["\ud83c\udf68",["ice_cream"]],"1f369":["\ud83c\udf69",["doughnut"]],"1f36a":["\ud83c\udf6a",["cookie"]],"1f36b":["\ud83c\udf6b",["chocolate_bar"]],"1f36c":["\ud83c\udf6c",["candy"]],"1f36d":["\ud83c\udf6d",["lollipop"]],"1f36e":["\ud83c\udf6e",["custard"]],"1f36f":["\ud83c\udf6f",["honey_pot"]],"1f370":["\ud83c\udf70",["cake"]],"1f371":["\ud83c\udf71",["bento"]],"1f372":["\ud83c\udf72",["stew"]],"1f373":["\ud83c\udf73",["egg"]],"1f374":["\ud83c\udf74",["fork_and_knife"]],"1f375":["\ud83c\udf75",["tea"]],"1f376":["\ud83c\udf76",["sake"]],"1f377":["\ud83c\udf77",["wine_glass"]],"1f378":["\ud83c\udf78",["cocktail"]],"1f379":["\ud83c\udf79",["tropical_drink"]],"1f37a":["\ud83c\udf7a",["beer"]],"1f37b":["\ud83c\udf7b",["beers"]],"1f37c":["\ud83c\udf7c",["baby_bottle"]],"1f380":["\ud83c\udf80",["ribbon"]],"1f381":["\ud83c\udf81",["gift"]],"1f382":["\ud83c\udf82",["birthday"]],"1f383":["\ud83c\udf83",["jack_o_lantern"]],"1f384":["\ud83c\udf84",["christmas_tree"]],"1f385":["\ud83c\udf85",["santa"]],"1f386":["\ud83c\udf86",["fireworks"]],"1f387":["\ud83c\udf87",["sparkler"]],"1f388":["\ud83c\udf88",["balloon"]],"1f389":["\ud83c\udf89",["tada"]],"1f38a":["\ud83c\udf8a",["confetti_ball"]],"1f38b":["\ud83c\udf8b",["tanabata_tree"]],"1f38c":["\ud83c\udf8c",["crossed_flags"]],"1f38d":["\ud83c\udf8d",["bamboo"]],"1f38e":["\ud83c\udf8e",["dolls"]],"1f38f":["\ud83c\udf8f",["flags"]],"1f390":["\ud83c\udf90",["wind_chime"]],"1f391":["\ud83c\udf91",["rice_scene"]],"1f392":["\ud83c\udf92",["school_satchel"]],"1f393":["\ud83c\udf93",["mortar_board"]],"1f3a0":["\ud83c\udfa0",["carousel_horse"]],"1f3a1":["\ud83c\udfa1",["ferris_wheel"]],"1f3a2":["\ud83c\udfa2",["roller_coaster"]],"1f3a3":["\ud83c\udfa3",["fishing_pole_and_fish"]],"1f3a4":["\ud83c\udfa4",["microphone"]],"1f3a5":["\ud83c\udfa5",["movie_camera"]],"1f3a6":["\ud83c\udfa6",["cinema"]],"1f3a7":["\ud83c\udfa7",["headphones"]],"1f3a8":["\ud83c\udfa8",["art"]],"1f3a9":["\ud83c\udfa9",["tophat"]],"1f3aa":["\ud83c\udfaa",["circus_tent"]],"1f3ab":["\ud83c\udfab",["ticket"]],"1f3ac":["\ud83c\udfac",["clapper"]],"1f3ad":["\ud83c\udfad",["performing_arts"]],"1f3ae":["\ud83c\udfae",["video_game"]],"1f3af":["\ud83c\udfaf",["dart"]],"1f3b0":["\ud83c\udfb0",["slot_machine"]],"1f3b1":["\ud83c\udfb1",["8ball"]],"1f3b2":["\ud83c\udfb2",["game_die"]],"1f3b3":["\ud83c\udfb3",["bowling"]],"1f3b4":["\ud83c\udfb4",["flower_playing_cards"]],"1f3b5":["\ud83c\udfb5",["musical_note"]],"1f3b6":["\ud83c\udfb6",["notes"]],"1f3b7":["\ud83c\udfb7",["saxophone"]],"1f3b8":["\ud83c\udfb8",["guitar"]],"1f3b9":["\ud83c\udfb9",["musical_keyboard"]],"1f3ba":["\ud83c\udfba",["trumpet"]],"1f3bb":["\ud83c\udfbb",["violin"]],"1f3bc":["\ud83c\udfbc",["musical_score"]],"1f3bd":["\ud83c\udfbd",["running_shirt_with_sash"]],"1f3be":["\ud83c\udfbe",["tennis"]],"1f3bf":["\ud83c\udfbf",["ski"]],"1f3c0":["\ud83c\udfc0",["basketball"]],"1f3c1":["\ud83c\udfc1",["checkered_flag"]],"1f3c2":["\ud83c\udfc2",["snowboarder"]],"1f3c3":["\ud83c\udfc3",["runner","running"]],"1f3c4":["\ud83c\udfc4",["surfer"]],"1f3c6":["\ud83c\udfc6",["trophy"]],"1f3c7":["\ud83c\udfc7",["horse_racing"]],"1f3c8":["\ud83c\udfc8",["football"]],"1f3c9":["\ud83c\udfc9",["rugby_football"]],"1f3ca":["\ud83c\udfca",["swimmer"]],"1f3e0":["\ud83c\udfe0",["house"]],"1f3e1":["\ud83c\udfe1",["house_with_garden"]],"1f3e2":["\ud83c\udfe2",["office"]],"1f3e3":["\ud83c\udfe3",["post_office"]],"1f3e4":["\ud83c\udfe4",["european_post_office"]],"1f3e5":["\ud83c\udfe5",["hospital"]],"1f3e6":["\ud83c\udfe6",["bank"]],"1f3e7":["\ud83c\udfe7",["atm"]],"1f3e8":["\ud83c\udfe8",["hotel"]],"1f3e9":["\ud83c\udfe9",["love_hotel"]],"1f3ea":["\ud83c\udfea",["convenience_store"]],"1f3eb":["\ud83c\udfeb",["school"]],"1f3ec":["\ud83c\udfec",["department_store"]],"1f3ed":["\ud83c\udfed",["factory"]],"1f3ee":["\ud83c\udfee",["izakaya_lantern","lantern"]],"1f3ef":["\ud83c\udfef",["japanese_castle"]],"1f3f0":["\ud83c\udff0",["european_castle"]],"1f400":["\ud83d\udc00",["rat"]],"1f401":["\ud83d\udc01",["mouse2"]],"1f402":["\ud83d\udc02",["ox"]],"1f403":["\ud83d\udc03",["water_buffalo"]],"1f404":["\ud83d\udc04",["cow2"]],"1f405":["\ud83d\udc05",["tiger2"]],"1f406":["\ud83d\udc06",["leopard"]],"1f407":["\ud83d\udc07",["rabbit2"]],"1f408":["\ud83d\udc08",["cat2"]],"1f409":["\ud83d\udc09",["dragon"]],"1f40a":["\ud83d\udc0a",["crocodile"]],"1f40b":["\ud83d\udc0b",["whale2"]],"1f40c":["\ud83d\udc0c",["snail"]],"1f40d":["\ud83d\udc0d",["snake"]],"1f40e":["\ud83d\udc0e",["racehorse"]],"1f40f":["\ud83d\udc0f",["ram"]],"1f410":["\ud83d\udc10",["goat"]],"1f411":["\ud83d\udc11",["sheep"]],"1f412":["\ud83d\udc12",["monkey"]],"1f413":["\ud83d\udc13",["rooster"]],"1f414":["\ud83d\udc14",["chicken"]],"1f415":["\ud83d\udc15",["dog2"]],"1f416":["\ud83d\udc16",["pig2"]],"1f417":["\ud83d\udc17",["boar"]],"1f418":["\ud83d\udc18",["elephant"]],"1f419":["\ud83d\udc19",["octopus"]],"1f41a":["\ud83d\udc1a",["shell"]],"1f41b":["\ud83d\udc1b",["bug"]],"1f41c":["\ud83d\udc1c",["ant"]],"1f41d":["\ud83d\udc1d",["bee","honeybee"]],"1f41e":["\ud83d\udc1e",["beetle"]],"1f41f":["\ud83d\udc1f",["fish"]],"1f420":["\ud83d\udc20",["tropical_fish"]],"1f421":["\ud83d\udc21",["blowfish"]],"1f422":["\ud83d\udc22",["turtle"]],"1f423":["\ud83d\udc23",["hatching_chick"]],"1f424":["\ud83d\udc24",["baby_chick"]],"1f425":["\ud83d\udc25",["hatched_chick"]],"1f426":["\ud83d\udc26",["bird"]],"1f427":["\ud83d\udc27",["penguin"]],"1f428":["\ud83d\udc28",["koala"]],"1f429":["\ud83d\udc29",["poodle"]],"1f42a":["\ud83d\udc2a",["dromedary_camel"]],"1f42b":["\ud83d\udc2b",["camel"]],"1f42c":["\ud83d\udc2c",["dolphin","flipper"]],"1f42d":["\ud83d\udc2d",["mouse"]],"1f42e":["\ud83d\udc2e",["cow"]],"1f42f":["\ud83d\udc2f",["tiger"]],"1f430":["\ud83d\udc30",["rabbit"]],"1f431":["\ud83d\udc31",["cat"]],"1f432":["\ud83d\udc32",["dragon_face"]],"1f433":["\ud83d\udc33",["whale"]],"1f434":["\ud83d\udc34",["horse"]],"1f435":["\ud83d\udc35",["monkey_face"]],"1f436":["\ud83d\udc36",["dog"]],"1f437":["\ud83d\udc37",["pig"]],"1f438":["\ud83d\udc38",["frog"]],"1f439":["\ud83d\udc39",["hamster"]],"1f43a":["\ud83d\udc3a",["wolf"]],"1f43b":["\ud83d\udc3b",["bear"]],"1f43c":["\ud83d\udc3c",["panda_face"]],"1f43d":["\ud83d\udc3d",["pig_nose"]],"1f43e":["\ud83d\udc3e",["feet","paw_prints"]],"1f440":["\ud83d\udc40",["eyes"]],"1f442":["\ud83d\udc42",["ear"]],"1f443":["\ud83d\udc43",["nose"]],"1f444":["\ud83d\udc44",["lips"]],"1f445":["\ud83d\udc45",["tongue"]],"1f446":["\ud83d\udc46",["point_up_2"]],"1f447":["\ud83d\udc47",["point_down"]],"1f448":["\ud83d\udc48",["point_left"]],"1f449":["\ud83d\udc49",["point_right"]],"1f44a":["\ud83d\udc4a",["facepunch","punch"]],"1f44b":["\ud83d\udc4b",["wave"]],"1f44c":["\ud83d\udc4c",["ok_hand"]],"1f44d":["\ud83d\udc4d",["+1","thumbsup"]],"1f44e":["\ud83d\udc4e",["-1","thumbsdown"]],"1f44f":["\ud83d\udc4f",["clap"]],"1f450":["\ud83d\udc50",["open_hands"]],"1f451":["\ud83d\udc51",["crown"]],"1f452":["\ud83d\udc52",["womans_hat"]],"1f453":["\ud83d\udc53",["eyeglasses"]],"1f454":["\ud83d\udc54",["necktie"]],"1f455":["\ud83d\udc55",["shirt","tshirt"]],"1f456":["\ud83d\udc56",["jeans"]],"1f457":["\ud83d\udc57",["dress"]],"1f458":["\ud83d\udc58",["kimono"]],"1f459":["\ud83d\udc59",["bikini"]],"1f45a":["\ud83d\udc5a",["womans_clothes"]],"1f45b":["\ud83d\udc5b",["purse"]],"1f45c":["\ud83d\udc5c",["handbag"]],"1f45d":["\ud83d\udc5d",["pouch"]],"1f45e":["\ud83d\udc5e",["mans_shoe","shoe"]],"1f45f":["\ud83d\udc5f",["athletic_shoe"]],"1f460":["\ud83d\udc60",["high_heel"]],"1f461":["\ud83d\udc61",["sandal"]],"1f462":["\ud83d\udc62",["boot"]],"1f463":["\ud83d\udc63",["footprints"]],"1f464":["\ud83d\udc64",["bust_in_silhouette"]],"1f465":["\ud83d\udc65",["busts_in_silhouette"]],"1f466":["\ud83d\udc66",["boy"]],"1f467":["\ud83d\udc67",["girl"]],"1f468":["\ud83d\udc68",["man"]],"1f469":["\ud83d\udc69",["woman"]],"1f46a":["\ud83d\udc6a",["family"]],"1f46b":["\ud83d\udc6b",["couple"]],"1f46c":["\ud83d\udc6c",["two_men_holding_hands"]],"1f46d":["\ud83d\udc6d",["two_women_holding_hands"]],"1f46e":["\ud83d\udc6e",["cop"]],"1f46f":["\ud83d\udc6f",["dancers"]],"1f470":["\ud83d\udc70",["bride_with_veil"]],"1f471":["\ud83d\udc71",["person_with_blond_hair"]],"1f472":["\ud83d\udc72",["man_with_gua_pi_mao"]],"1f473":["\ud83d\udc73",["man_with_turban"]],"1f474":["\ud83d\udc74",["older_man"]],"1f475":["\ud83d\udc75",["older_woman"]],"1f476":["\ud83d\udc76",["baby"]],"1f477":["\ud83d\udc77",["construction_worker"]],"1f478":["\ud83d\udc78",["princess"]],"1f479":["\ud83d\udc79",["japanese_ogre"]],"1f47a":["\ud83d\udc7a",["japanese_goblin"]],"1f47b":["\ud83d\udc7b",["ghost"]],"1f47c":["\ud83d\udc7c",["angel"]],"1f47d":["\ud83d\udc7d",["alien"]],"1f47e":["\ud83d\udc7e",["space_invader"]],"1f47f":["\ud83d\udc7f",["imp"]],"1f480":["\ud83d\udc80",["skull"]],"1f481":["\ud83d\udc81",["information_desk_person"]],"1f482":["\ud83d\udc82",["guardsman"]],"1f483":["\ud83d\udc83",["dancer"]],"1f484":["\ud83d\udc84",["lipstick"]],"1f485":["\ud83d\udc85",["nail_care"]],"1f486":["\ud83d\udc86",["massage"]],"1f487":["\ud83d\udc87",["haircut"]],"1f488":["\ud83d\udc88",["barber"]],"1f489":["\ud83d\udc89",["syringe"]],"1f48a":["\ud83d\udc8a",["pill"]],"1f48b":["\ud83d\udc8b",["kiss"]],"1f48c":["\ud83d\udc8c",["love_letter"]],"1f48d":["\ud83d\udc8d",["ring"]],"1f48e":["\ud83d\udc8e",["gem"]],"1f48f":["\ud83d\udc8f",["couplekiss"]],"1f490":["\ud83d\udc90",["bouquet"]],"1f491":["\ud83d\udc91",["couple_with_heart"]],"1f492":["\ud83d\udc92",["wedding"]],"1f493":["\ud83d\udc93",["heartbeat"]],"1f494":["\ud83d\udc94",["broken_heart"],"</3"],"1f495":["\ud83d\udc95",["two_hearts"]],"1f496":["\ud83d\udc96",["sparkling_heart"]],"1f497":["\ud83d\udc97",["heartpulse"]],"1f498":["\ud83d\udc98",["cupid"]],"1f499":["\ud83d\udc99",["blue_heart"],"<3"],"1f49a":["\ud83d\udc9a",["green_heart"],"<3"],"1f49b":["\ud83d\udc9b",["yellow_heart"],"<3"],"1f49c":["\ud83d\udc9c",["purple_heart"],"<3"],"1f49d":["\ud83d\udc9d",["gift_heart"]],"1f49e":["\ud83d\udc9e",["revolving_hearts"]],"1f49f":["\ud83d\udc9f",["heart_decoration"]],"1f4a0":["\ud83d\udca0",["diamond_shape_with_a_dot_inside"]],"1f4a1":["\ud83d\udca1",["bulb"]],"1f4a2":["\ud83d\udca2",["anger"]],"1f4a3":["\ud83d\udca3",["bomb"]],"1f4a4":["\ud83d\udca4",["zzz"]],"1f4a5":["\ud83d\udca5",["boom","collision"]],"1f4a6":["\ud83d\udca6",["sweat_drops"]],"1f4a7":["\ud83d\udca7",["droplet"]],"1f4a8":["\ud83d\udca8",["dash"]],"1f4a9":["\ud83d\udca9",["hankey","poop","shit"]],"1f4aa":["\ud83d\udcaa",["muscle"]],"1f4ab":["\ud83d\udcab",["dizzy"]],"1f4ac":["\ud83d\udcac",["speech_balloon"]],"1f4ad":["\ud83d\udcad",["thought_balloon"]],"1f4ae":["\ud83d\udcae",["white_flower"]],"1f4af":["\ud83d\udcaf",["100"]],"1f4b0":["\ud83d\udcb0",["moneybag"]],"1f4b1":["\ud83d\udcb1",["currency_exchange"]],"1f4b2":["\ud83d\udcb2",["heavy_dollar_sign"]],"1f4b3":["\ud83d\udcb3",["credit_card"]],"1f4b4":["\ud83d\udcb4",["yen"]],"1f4b5":["\ud83d\udcb5",["dollar"]],"1f4b6":["\ud83d\udcb6",["euro"]],"1f4b7":["\ud83d\udcb7",["pound"]],"1f4b8":["\ud83d\udcb8",["money_with_wings"]],"1f4b9":["\ud83d\udcb9",["chart"]],"1f4ba":["\ud83d\udcba",["seat"]],"1f4bb":["\ud83d\udcbb",["computer"]],"1f4bc":["\ud83d\udcbc",["briefcase"]],"1f4bd":["\ud83d\udcbd",["minidisc"]],"1f4be":["\ud83d\udcbe",["floppy_disk"]],"1f4bf":["\ud83d\udcbf",["cd"]],"1f4c0":["\ud83d\udcc0",["dvd"]],"1f4c1":["\ud83d\udcc1",["file_folder"]],"1f4c2":["\ud83d\udcc2",["open_file_folder"]],"1f4c3":["\ud83d\udcc3",["page_with_curl"]],"1f4c4":["\ud83d\udcc4",["page_facing_up"]],"1f4c5":["\ud83d\udcc5",["date"]],"1f4c6":["\ud83d\udcc6",["calendar"]],"1f4c7":["\ud83d\udcc7",["card_index"]],"1f4c8":["\ud83d\udcc8",["chart_with_upwards_trend"]],"1f4c9":["\ud83d\udcc9",["chart_with_downwards_trend"]],"1f4ca":["\ud83d\udcca",["bar_chart"]],"1f4cb":["\ud83d\udccb",["clipboard"]],"1f4cc":["\ud83d\udccc",["pushpin"]],"1f4cd":["\ud83d\udccd",["round_pushpin"]],"1f4ce":["\ud83d\udcce",["paperclip"]],"1f4cf":["\ud83d\udccf",["straight_ruler"]],"1f4d0":["\ud83d\udcd0",["triangular_ruler"]],"1f4d1":["\ud83d\udcd1",["bookmark_tabs"]],"1f4d2":["\ud83d\udcd2",["ledger"]],"1f4d3":["\ud83d\udcd3",["notebook"]],"1f4d4":["\ud83d\udcd4",["notebook_with_decorative_cover"]],"1f4d5":["\ud83d\udcd5",["closed_book"]],"1f4d6":["\ud83d\udcd6",["book","open_book"]],"1f4d7":["\ud83d\udcd7",["green_book"]],"1f4d8":["\ud83d\udcd8",["blue_book"]],"1f4d9":["\ud83d\udcd9",["orange_book"]],"1f4da":["\ud83d\udcda",["books"]],"1f4db":["\ud83d\udcdb",["name_badge"]],"1f4dc":["\ud83d\udcdc",["scroll"]],"1f4dd":["\ud83d\udcdd",["memo","pencil"]],"1f4de":["\ud83d\udcde",["telephone_receiver"]],"1f4df":["\ud83d\udcdf",["pager"]],"1f4e0":["\ud83d\udce0",["fax"]],"1f4e1":["\ud83d\udce1",["satellite"]],"1f4e2":["\ud83d\udce2",["loudspeaker"]],"1f4e3":["\ud83d\udce3",["mega"]],"1f4e4":["\ud83d\udce4",["outbox_tray"]],"1f4e5":["\ud83d\udce5",["inbox_tray"]],"1f4e6":["\ud83d\udce6",["package"]],"1f4e7":["\ud83d\udce7",["e-mail"]],"1f4e8":["\ud83d\udce8",["incoming_envelope"]],"1f4e9":["\ud83d\udce9",["envelope_with_arrow"]],"1f4ea":["\ud83d\udcea",["mailbox_closed"]],"1f4eb":["\ud83d\udceb",["mailbox"]],"1f4ec":["\ud83d\udcec",["mailbox_with_mail"]],"1f4ed":["\ud83d\udced",["mailbox_with_no_mail"]],"1f4ee":["\ud83d\udcee",["postbox"]],"1f4ef":["\ud83d\udcef",["postal_horn"]],"1f4f0":["\ud83d\udcf0",["newspaper"]],"1f4f1":["\ud83d\udcf1",["iphone"]],"1f4f2":["\ud83d\udcf2",["calling"]],"1f4f3":["\ud83d\udcf3",["vibration_mode"]],"1f4f4":["\ud83d\udcf4",["mobile_phone_off"]],"1f4f5":["\ud83d\udcf5",["no_mobile_phones"]],"1f4f6":["\ud83d\udcf6",["signal_strength"]],"1f4f7":["\ud83d\udcf7",["camera"]],"1f4f9":["\ud83d\udcf9",["video_camera"]],"1f4fa":["\ud83d\udcfa",["tv"]],"1f4fb":["\ud83d\udcfb",["radio"]],"1f4fc":["\ud83d\udcfc",["vhs"]],"1f500":["\ud83d\udd00",["twisted_rightwards_arrows"]],"1f501":["\ud83d\udd01",["repeat"]],"1f502":["\ud83d\udd02",["repeat_one"]],"1f503":["\ud83d\udd03",["arrows_clockwise"]],"1f504":["\ud83d\udd04",["arrows_counterclockwise"]],"1f505":["\ud83d\udd05",["low_brightness"]],"1f506":["\ud83d\udd06",["high_brightness"]],"1f507":["\ud83d\udd07",["mute"]],"1f508":["\ud83d\udd09",["speaker"]],"1f509":["\ud83d\udd09",["sound"]],"1f50a":["\ud83d\udd0a",["loud_sound"]],"1f50b":["\ud83d\udd0b",["battery"]],"1f50c":["\ud83d\udd0c",["electric_plug"]],"1f50d":["\ud83d\udd0d",["mag"]],"1f50e":["\ud83d\udd0e",["mag_right"]],"1f50f":["\ud83d\udd0f",["lock_with_ink_pen"]],"1f510":["\ud83d\udd10",["closed_lock_with_key"]],"1f511":["\ud83d\udd11",["key"]],"1f512":["\ud83d\udd12",["lock"]],"1f513":["\ud83d\udd13",["unlock"]],"1f514":["\ud83d\udd14",["bell"]],"1f515":["\ud83d\udd15",["no_bell"]],"1f516":["\ud83d\udd16",["bookmark"]],"1f517":["\ud83d\udd17",["link"]],"1f518":["\ud83d\udd18",["radio_button"]],"1f519":["\ud83d\udd19",["back"]],"1f51a":["\ud83d\udd1a",["end"]],"1f51b":["\ud83d\udd1b",["on"]],"1f51c":["\ud83d\udd1c",["soon"]],"1f51d":["\ud83d\udd1d",["top"]],"1f51e":["\ud83d\udd1e",["underage"]],"1f51f":["\ud83d\udd1f",["keycap_ten"]],"1f520":["\ud83d\udd20",["capital_abcd"]],"1f521":["\ud83d\udd21",["abcd"]],"1f522":["\ud83d\udd22",["1234"]],"1f523":["\ud83d\udd23",["symbols"]],"1f524":["\ud83d\udd24",["abc"]],"1f525":["\ud83d\udd25",["fire"]],"1f526":["\ud83d\udd26",["flashlight"]],"1f527":["\ud83d\udd27",["wrench"]],"1f528":["\ud83d\udd28",["hammer"]],"1f529":["\ud83d\udd29",["nut_and_bolt"]],"1f52a":["\ud83d\udd2a",["hocho"]],"1f52b":["\ud83d\udd2b",["gun"]],"1f52c":["\ud83d\udd2c",["microscope"]],"1f52d":["\ud83d\udd2d",["telescope"]],"1f52e":["\ud83d\udd2e",["crystal_ball"]],"1f52f":["\ud83d\udd2f",["six_pointed_star"]],"1f530":["\ud83d\udd30",["beginner"]],"1f531":["\ud83d\udd31",["trident"]],"1f532":["\ud83d\udd32",["black_square_button"]],"1f533":["\ud83d\udd33",["white_square_button"]],"1f534":["\ud83d\udd34",["red_circle"]],"1f535":["\ud83d\udd35",["large_blue_circle"]],"1f536":["\ud83d\udd36",["large_orange_diamond"]],"1f537":["\ud83d\udd37",["large_blue_diamond"]],"1f538":["\ud83d\udd38",["small_orange_diamond"]],"1f539":["\ud83d\udd39",["small_blue_diamond"]],"1f53a":["\ud83d\udd3a",["small_red_triangle"]],"1f53b":["\ud83d\udd3b",["small_red_triangle_down"]],"1f53c":["\ud83d\udd3c",["arrow_up_small"]],"1f53d":["\ud83d\udd3d",["arrow_down_small"]],"1f550":["\ud83d\udd50",["clock1"]],"1f551":["\ud83d\udd51",["clock2"]],"1f552":["\ud83d\udd52",["clock3"]],"1f553":["\ud83d\udd53",["clock4"]],"1f554":["\ud83d\udd54",["clock5"]],"1f555":["\ud83d\udd55",["clock6"]],"1f556":["\ud83d\udd56",["clock7"]],"1f557":["\ud83d\udd57",["clock8"]],"1f558":["\ud83d\udd58",["clock9"]],"1f559":["\ud83d\udd59",["clock10"]],"1f55a":["\ud83d\udd5a",["clock11"]],"1f55b":["\ud83d\udd5b",["clock12"]],"1f55c":["\ud83d\udd5c",["clock130"]],"1f55d":["\ud83d\udd5d",["clock230"]],"1f55e":["\ud83d\udd5e",["clock330"]],"1f55f":["\ud83d\udd5f",["clock430"]],"1f560":["\ud83d\udd60",["clock530"]],"1f561":["\ud83d\udd61",["clock630"]],"1f562":["\ud83d\udd62",["clock730"]],"1f563":["\ud83d\udd63",["clock830"]],"1f564":["\ud83d\udd64",["clock930"]],"1f565":["\ud83d\udd65",["clock1030"]],"1f566":["\ud83d\udd66",["clock1130"]],"1f567":["\ud83d\udd67",["clock1230"]],"1f5fb":["\ud83d\uddfb",["mount_fuji"]],"1f5fc":["\ud83d\uddfc",["tokyo_tower"]],"1f5fd":["\ud83d\uddfd",["statue_of_liberty"]],"1f5fe":["\ud83d\uddfe",["japan"]],"1f5ff":["\ud83d\uddff",["moyai"]],"1f600":["\ud83d\ude00",["grinning"]],"1f601":["\ud83d\ude01",["grin"]],"1f602":["\ud83d\ude02",["joy"]],"1f603":["\ud83d\ude03",["smiley"],":)"],"1f604":["\ud83d\ude04",["smile"],":)"],"1f605":["\ud83d\ude05",["sweat_smile"]],"1f606":["\ud83d\ude06",["satisfied"]],"1f607":["\ud83d\ude07",["innocent"]],"1f608":["\ud83d\ude08",["smiling_imp"]],"1f609":["\ud83d\ude09",["wink"],";)"],"1f60a":["\ud83d\ude0a",["blush"]],"1f60b":["\ud83d\ude0b",["yum"]],"1f60c":["\ud83d\ude0c",["relieved"]],"1f60d":["\ud83d\ude0d",["heart_eyes"]],"1f60e":["\ud83d\ude0e",["sunglasses"]],"1f60f":["\ud83d\ude0f",["smirk"]],"1f610":["\ud83d\ude10",["neutral_face"]],"1f611":["\ud83d\ude11",["expressionless"]],"1f612":["\ud83d\ude12",["unamused"]],"1f613":["\ud83d\ude13",["sweat"]],"1f614":["\ud83d\ude14",["pensive"]],"1f615":["\ud83d\ude15",["confused"]],"1f616":["\ud83d\ude16",["confounded"]],"1f617":["\ud83d\ude17",["kissing"]],"1f618":["\ud83d\ude18",["kissing_heart"]],"1f619":["\ud83d\ude19",["kissing_smiling_eyes"]],"1f61a":["\ud83d\ude1a",["kissing_closed_eyes"]],"1f61b":["\ud83d\ude1b",["stuck_out_tongue"]],"1f61c":["\ud83d\ude1c",["stuck_out_tongue_winking_eye"],";p"],"1f61d":["\ud83d\ude1d",["stuck_out_tongue_closed_eyes"]],"1f61e":["\ud83d\ude1e",["disappointed"],":("],"1f61f":["\ud83d\ude1f",["worried"]],"1f620":["\ud83d\ude20",["angry"]],"1f621":["\ud83d\ude21",["rage"]],"1f622":["\ud83d\ude22",["cry"],":'("],"1f623":["\ud83d\ude23",["persevere"]],"1f624":["\ud83d\ude24",["triumph"]],"1f625":["\ud83d\ude25",["disappointed_relieved"]],"1f626":["\ud83d\ude26",["frowning"]],"1f627":["\ud83d\ude27",["anguished"]],"1f628":["\ud83d\ude28",["fearful"]],"1f629":["\ud83d\ude29",["weary"]],"1f62a":["\ud83d\ude2a",["sleepy"]],"1f62b":["\ud83d\ude2b",["tired_face"]],"1f62c":["\ud83d\ude2c",["grimacing"]],"1f62d":["\ud83d\ude2d",["sob"],":'("],"1f62e":["\ud83d\ude2e",["open_mouth"]],"1f62f":["\ud83d\ude2f",["hushed"]],"1f630":["\ud83d\ude30",["cold_sweat"]],"1f631":["\ud83d\ude31",["scream"]],"1f632":["\ud83d\ude32",["astonished"]],"1f633":["\ud83d\ude33",["flushed"]],"1f634":["\ud83d\ude34",["sleeping"]],"1f635":["\ud83d\ude35",["dizzy_face"]],"1f636":["\ud83d\ude36",["no_mouth"]],"1f637":["\ud83d\ude37",["mask"]],"1f638":["\ud83d\ude38",["smile_cat"]],"1f639":["\ud83d\ude39",["joy_cat"]],"1f63a":["\ud83d\ude3a",["smiley_cat"]],"1f63b":["\ud83d\ude3b",["heart_eyes_cat"]],"1f63c":["\ud83d\ude3c",["smirk_cat"]],"1f63d":["\ud83d\ude3d",["kissing_cat"]],"1f63e":["\ud83d\ude3e",["pouting_cat"]],"1f63f":["\ud83d\ude3f",["crying_cat_face"]],"1f640":["\ud83d\ude40",["scream_cat"]],"1f645":["\ud83d\ude45",["no_good"]],"1f646":["\ud83d\ude46",["ok_woman"]],"1f647":["\ud83d\ude47",["bow"]],"1f648":["\ud83d\ude48",["see_no_evil"]],"1f649":["\ud83d\ude49",["hear_no_evil"]],"1f64a":["\ud83d\ude4a",["speak_no_evil"]],"1f64b":["\ud83d\ude4b",["raising_hand"]],"1f64c":["\ud83d\ude4c",["raised_hands"]],"1f64d":["\ud83d\ude4d",["person_frowning"]],"1f64e":["\ud83d\ude4e",["person_with_pouting_face"]],"1f64f":["\ud83d\ude4f",["pray"]],"1f680":["\ud83d\ude80",["rocket"]],"1f681":["\ud83d\ude81",["helicopter"]],"1f682":["\ud83d\ude82",["steam_locomotive"]],"1f683":["\ud83d\ude83",["railway_car"]],"1f68b":["\ud83d\ude8b",["train"]],"1f684":["\ud83d\ude84",["bullettrain_side"]],"1f685":["\ud83d\ude85",["bullettrain_front"]],"1f686":["\ud83d\ude86",["train2"]],"1f687":["\ud83d\ude87",["metro"]],"1f688":["\ud83d\ude88",["light_rail"]],"1f689":["\ud83d\ude89",["station"]],"1f68a":["\ud83d\ude8a",["tram"]],"1f68c":["\ud83d\ude8c",["bus"]],"1f68d":["\ud83d\ude8d",["oncoming_bus"]],"1f68e":["\ud83d\ude8e",["trolleybus"]],"1f68f":["\ud83d\ude8f",["busstop"]],"1f690":["\ud83d\ude90",["minibus"]],"1f691":["\ud83d\ude91",["ambulance"]],"1f692":["\ud83d\ude92",["fire_engine"]],"1f693":["\ud83d\ude93",["police_car"]],"1f694":["\ud83d\ude94",["oncoming_police_car"]],"1f695":["\ud83d\ude95",["taxi"]],
"1f696":["\ud83d\ude96",["oncoming_taxi"]],"1f697":["\ud83d\ude97",["car","red_car"]],"1f698":["\ud83d\ude98",["oncoming_automobile"]],"1f699":["\ud83d\ude99",["blue_car"]],"1f69a":["\ud83d\ude9a",["truck"]],"1f69b":["\ud83d\ude9b",["articulated_lorry"]],"1f69c":["\ud83d\ude9c",["tractor"]],"1f69d":["\ud83d\ude9d",["monorail"]],"1f69e":["\ud83d\ude9e",["mountain_railway"]],"1f69f":["\ud83d\ude9f",["suspension_railway"]],"1f6a0":["\ud83d\udea0",["mountain_cableway"]],"1f6a1":["\ud83d\udea1",["aerial_tramway"]],"1f6a2":["\ud83d\udea2",["ship"]],"1f6a3":["\ud83d\udea3",["rowboat"]],"1f6a4":["\ud83d\udea4",["speedboat"]],"1f6a5":["\ud83d\udea5",["traffic_light"]],"1f6a6":["\ud83d\udea6",["vertical_traffic_light"]],"1f6a7":["\ud83d\udea7",["construction"]],"1f6a8":["\ud83d\udea8",["rotating_light"]],"1f6a9":["\ud83d\udea9",["triangular_flag_on_post"]],"1f6aa":["\ud83d\udeaa",["door"]],"1f6ab":["\ud83d\udeab",["no_entry_sign"]],"1f6ac":["\ud83d\udeac",["smoking"]],"1f6ad":["\ud83d\udead",["no_smoking"]],"1f6ae":["\ud83d\udeae",["put_litter_in_its_place"]],"1f6af":["\ud83d\udeaf",["do_not_litter"]],"1f6b0":["\ud83d\udeb0",["potable_water"]],"1f6b1":["\ud83d\udeb1",["non-potable_water"]],"1f6b2":["\ud83d\udeb2",["bike"]],"1f6b3":["\ud83d\udeb3",["no_bicycles"]],"1f6b4":["\ud83d\udeb4",["bicyclist"]],"1f6b5":["\ud83d\udeb5",["mountain_bicyclist"]],"1f6b6":["\ud83d\udeb6",["walking"]],"1f6b7":["\ud83d\udeb7",["no_pedestrians"]],"1f6b8":["\ud83d\udeb8",["children_crossing"]],"1f6b9":["\ud83d\udeb9",["mens"]],"1f6ba":["\ud83d\udeba",["womens"]],"1f6bb":["\ud83d\udebb",["restroom"]],"1f6bc":["\ud83d\udebc",["baby_symbol"]],"1f6bd":["\ud83d\udebd",["toilet"]],"1f6be":["\ud83d\udebe",["wc"]],"1f6bf":["\ud83d\udebf",["shower"]],"1f6c0":["\ud83d\udec0",["bath"]],"1f6c1":["\ud83d\udec1",["bathtub"]],"1f6c2":["\ud83d\udec2",["passport_control"]],"1f6c3":["\ud83d\udec3",["customs"]],"1f6c4":["\ud83d\udec4",["baggage_claim"]],"1f6c5":["\ud83d\udec5",["left_luggage"]],"0023":["#\u20e3",["hash"]],"0030":["0\u20e3",["zero"]],"0031":["1\u20e3",["one"]],"0032":["2\u20e3",["two"]],"0033":["3\u20e3",["three"]],"0034":["4\u20e3",["four"]],"0035":["5\u20e3",["five"]],"0036":["6\u20e3",["six"]],"0037":["7\u20e3",["seven"]],"0038":["8\u20e3",["eight"]],"0039":["9\u20e3",["nine"]],"1f1e8-1f1f3":["\ud83c\udde8\ud83c\uddf3",["cn"]],"1f1e9-1f1ea":["\ud83c\udde9\ud83c\uddea",["de"]],"1f1ea-1f1f8":["\ud83c\uddea\ud83c\uddf8",["es"]],"1f1eb-1f1f7":["\ud83c\uddeb\ud83c\uddf7",["fr"]],"1f1ec-1f1e7":["\ud83c\uddec\ud83c\udde7",["gb","uk"]],"1f1ee-1f1f9":["\ud83c\uddee\ud83c\uddf9",["it"]],"1f1ef-1f1f5":["\ud83c\uddef\ud83c\uddf5",["jp"]],"1f1f0-1f1f7":["\ud83c\uddf0\ud83c\uddf7",["kr"]],"1f1f7-1f1fa":["\ud83c\uddf7\ud83c\uddfa",["ru"]],"1f1fa-1f1f8":["\ud83c\uddfa\ud83c\uddf8",["us"]]},Config.EmojiCategories=[["1f604","1f603","1f600","1f60a","263a","1f609","1f60d","1f618","1f61a","1f617","1f619","1f61c","1f61d","1f61b","1f633","1f601","1f614","1f60c","1f612","1f61e","1f623","1f622","1f602","1f62d","1f62a","1f625","1f630","1f605","1f613","1f629","1f62b","1f628","1f631","1f620","1f621","1f624","1f616","1f606","1f60b","1f637","1f60e","1f634","1f635","1f632","1f61f","1f626","1f627","1f608","1f47f","1f62e","1f62c","1f610","1f615","1f62f","1f636","1f607","1f60f","1f611","1f472","1f473","1f46e","1f477","1f482","1f476","1f466","1f467","1f468","1f469","1f474","1f475","1f471","1f47c","1f478","1f63a","1f638","1f63b","1f63d","1f63c","1f640","1f63f","1f639","1f63e","1f479","1f47a","1f648","1f649","1f64a","1f480","1f47d","1f4a9","1f525","2728","1f31f","1f4ab","1f4a5","1f4a2","1f4a6","1f4a7","1f4a4","1f4a8","1f442","1f440","1f443","1f445","1f444","1f44d","1f44e","1f44c","1f44a","270a","270c","1f44b","270b","1f450","1f446","1f447","1f449","1f448","1f64c","1f64f","261d","1f44f","1f4aa","1f6b6","1f3c3","1f483","1f46b","1f46a","1f46c","1f46d","1f48f","1f491","1f46f","1f646","1f645","1f481","1f64b","1f486","1f487","1f485","1f470","1f64e","1f64d","1f647","1f3a9","1f451","1f452","1f45f","1f45e","1f461","1f460","1f462","1f455","1f454","1f45a","1f457","1f3bd","1f456","1f458","1f459","1f4bc","1f45c","1f45d","1f45b","1f453","1f380","1f302","1f484","1f49b","1f499","1f49c","1f49a","2764","1f494","1f497","1f493","1f495","1f496","1f49e","1f498","1f48c","1f48b","1f48d","1f48e","1f464","1f465","1f4ac","1f463","1f4ad"],["1f436","1f43a","1f431","1f42d","1f439","1f430","1f438","1f42f","1f428","1f43b","1f437","1f43d","1f42e","1f417","1f435","1f412","1f434","1f411","1f418","1f43c","1f427","1f426","1f424","1f425","1f423","1f414","1f40d","1f422","1f41b","1f41d","1f41c","1f41e","1f40c","1f419","1f41a","1f420","1f41f","1f42c","1f433","1f40b","1f404","1f40f","1f400","1f403","1f405","1f407","1f409","1f40e","1f410","1f413","1f415","1f416","1f401","1f402","1f432","1f421","1f40a","1f42b","1f42a","1f406","1f408","1f429","1f43e","1f490","1f338","1f337","1f340","1f339","1f33b","1f33a","1f341","1f343","1f342","1f33f","1f33e","1f344","1f335","1f334","1f332","1f333","1f330","1f331","1f33c","1f310","1f31e","1f31d","1f31a","1f311","1f312","1f313","1f314","1f315","1f316","1f317","1f318","1f31c","1f31b","1f319","1f30d","1f30e","1f30f","1f30b","1f30c","1f320","2b50","2600","26c5","2601","26a1","2614","2744","26c4","1f300","1f301","1f308","1f30a"],["1f38d","1f49d","1f38e","1f392","1f393","1f38f","1f386","1f387","1f390","1f391","1f383","1f47b","1f385","1f384","1f381","1f38b","1f389","1f38a","1f388","1f38c","1f52e","1f3a5","1f4f7","1f4f9","1f4fc","1f4bf","1f4c0","1f4bd","1f4be","1f4bb","1f4f1","260e","1f4de","1f4df","1f4e0","1f4e1","1f4fa","1f4fb","1f50a","1f509","1f508","1f507","1f514","1f515","1f4e3","1f4e2","23f3","231b","23f0","231a","1f513","1f512","1f50f","1f510","1f511","1f50e","1f4a1","1f526","1f506","1f505","1f50c","1f50b","1f50d","1f6c0","1f6c1","1f6bf","1f6bd","1f527","1f529","1f528","1f6aa","1f6ac","1f4a3","1f52b","1f52a","1f48a","1f489","1f4b0","1f4b4","1f4b5","1f4b7","1f4b6","1f4b3","1f4b8","1f4f2","1f4e7","1f4e5","1f4e4","2709","1f4e9","1f4e8","1f4ef","1f4eb","1f4ea","1f4ec","1f4ed","1f4ee","1f4e6","1f4dd","1f4c4","1f4c3","1f4d1","1f4ca","1f4c8","1f4c9","1f4dc","1f4cb","1f4c5","1f4c6","1f4c7","1f4c1","1f4c2","2702","1f4cc","1f4ce","2712","270f","1f4cf","1f4d0","1f4d5","1f4d7","1f4d8","1f4d9","1f4d3","1f4d4","1f4d2","1f4da","1f4d6","1f516","1f4db","1f52c","1f52d","1f4f0","1f3a8","1f3ac","1f3a4","1f3a7","1f3bc","1f3b5","1f3b6","1f3b9","1f3bb","1f3ba","1f3b7","1f3b8","1f47e","1f3ae","1f0cf","1f3b4","1f004","1f3b2","1f3af","1f3c8","1f3c0","26bd","26be","1f3be","1f3b1","1f3c9","1f3b3","26f3","1f6b5","1f6b4","1f3c1","1f3c7","1f3c6","1f3bf","1f3c2","1f3ca","1f3c4","1f3a3","2615","1f375","1f376","1f37c","1f37a","1f37b","1f378","1f379","1f377","1f374","1f355","1f354","1f35f","1f357","1f356","1f35d","1f35b","1f364","1f371","1f363","1f365","1f359","1f358","1f35a","1f35c","1f372","1f362","1f361","1f373","1f35e","1f369","1f36e","1f366","1f368","1f367","1f382","1f370","1f36a","1f36b","1f36c","1f36d","1f36f","1f34e","1f34f","1f34a","1f34b","1f352","1f347","1f349","1f353","1f351","1f348","1f34c","1f350","1f34d","1f360","1f346","1f345","1f33d"],["1f3e0","1f3e1","1f3eb","1f3e2","1f3e3","1f3e5","1f3e6","1f3ea","1f3e9","1f3e8","1f492","26ea","1f3ec","1f3e4","1f307","1f306","1f3ef","1f3f0","26fa","1f3ed","1f5fc","1f5fe","1f5fb","1f304","1f305","1f303","1f5fd","1f309","1f3a0","1f3a1","26f2","1f3a2","1f6a2","26f5","1f6a4","1f6a3","2693","1f680","2708","1f4ba","1f681","1f682","1f68a","1f689","1f69e","1f686","1f684","1f685","1f688","1f687","1f69d","1f683","1f68b","1f68e","1f68c","1f68d","1f699","1f698","1f697","1f695","1f696","1f69b","1f69a","1f6a8","1f693","1f694","1f692","1f691","1f690","1f6b2","1f6a1","1f69f","1f6a0","1f69c","1f488","1f68f","1f3ab","1f6a6","1f6a5","26a0","1f6a7","1f530","26fd","1f3ee","1f3b0","2668","1f5ff","1f3aa","1f3ad","1f4cd","1f6a9","1f1ef-1f1f5","1f1f0-1f1f7","1f1e9-1f1ea","1f1e8-1f1f3","1f1fa-1f1f8","1f1eb-1f1f7","1f1ea-1f1f8","1f1ee-1f1f9","1f1f7-1f1fa","1f1ec-1f1e7"],["0031","0032","0033","0034","0035","0036","0037","0038","0039","0030","1f51f","1f522","0023","1f523","2b06","2b07","2b05","27a1","1f520","1f521","1f524","2197","2196","2198","2199","2194","2195","1f504","25c0","25b6","1f53c","1f53d","21a9","21aa","2139","23ea","23e9","23eb","23ec","2935","2934","1f197","1f500","1f501","1f502","1f195","1f199","1f192","1f193","1f196","1f4f6","1f3a6","1f201","1f22f","1f233","1f235","1f234","1f232","1f250","1f239","1f23a","1f236","1f21a","1f6bb","1f6b9","1f6ba","1f6bc","1f6be","1f6b0","1f6ae","1f17f","267f","1f6ad","1f237","1f238","1f202","24c2","1f6c2","1f6c4","1f6c5","1f6c3","1f251","3299","3297","1f191","1f198","1f194","1f6ab","1f51e","1f4f5","1f6af","1f6b1","1f6b3","1f6b7","1f6b8","26d4","2733","2747","274e","2705","2734","1f49f","1f19a","1f4f3","1f4f4","1f170","1f171","1f18e","1f17e","1f4a0","27bf","267b","2648","2649","264a","264b","264c","264d","264e","264f","2650","2651","2652","2653","26ce","1f52f","1f3e7","1f4b9","1f4b2","1f4b1","00a9","00ae","2122","274c","203c","2049","2757","2753","2755","2754","2b55","1f51d","1f51a","1f519","1f51b","1f51c","1f503","1f55b","1f567","1f550","1f55c","1f551","1f55d","1f552","1f55e","1f553","1f55f","1f554","1f560","1f555","1f556","1f557","1f558","1f559","1f55a","1f561","1f562","1f563","1f564","1f565","1f566","2716","2795","2796","2797","2660","2665","2663","2666","1f4ae","1f4af","2714","2611","1f518","1f517","27b0","3030","303d","1f531","25fc","25fb","25fe","25fd","25aa","25ab","1f53a","1f532","1f533","26ab","26aa","1f534","1f535","1f53b","2b1c","2b1b","1f536","1f537","1f538","1f539"]],Config.EmojiCategorySpritesheetDimens=[[7,27],[4,29],[7,33],[3,34],[7,34]],Config.emoji_data={"00a9":[["\xa9"],"\ue24e","\udbba\udf29",["copyright"],0,0],"00ae":[["\xae"],"\ue24f","\udbba\udf2d",["registered"],0,1],"203c":[["\u203c\ufe0f","\u203c"],"","\udbba\udf06",["bangbang"],0,2],2049:[["\u2049\ufe0f","\u2049"],"","\udbba\udf05",["interrobang"],0,3],2122:[["\u2122"],"\ue537","\udbba\udf2a",["tm"],0,4],2139:[["\u2139\ufe0f","\u2139"],"","\udbba\udf47",["information_source"],0,5],2194:[["\u2194\ufe0f","\u2194"],"","\udbba\udef6",["left_right_arrow"],0,6],2195:[["\u2195\ufe0f","\u2195"],"","\udbba\udef7",["arrow_up_down"],0,7],2196:[["\u2196\ufe0f","\u2196"],"\ue237","\udbba\udef2",["arrow_upper_left"],0,8],2197:[["\u2197\ufe0f","\u2197"],"\ue236","\udbba\udef0",["arrow_upper_right"],0,9],2198:[["\u2198\ufe0f","\u2198"],"\ue238","\udbba\udef1",["arrow_lower_right"],0,10],2199:[["\u2199\ufe0f","\u2199"],"\ue239","\udbba\udef3",["arrow_lower_left"],0,11],"21a9":[["\u21a9\ufe0f","\u21a9"],"","\udbba\udf83",["leftwards_arrow_with_hook"],0,12],"21aa":[["\u21aa\ufe0f","\u21aa"],"","\udbba\udf88",["arrow_right_hook"],0,13],"231a":[["\u231a\ufe0f","\u231a"],"","\udbb8\udc1d",["watch"],0,14],"231b":[["\u231b\ufe0f","\u231b"],"","\udbb8\udc1c",["hourglass"],0,15],"23e9":[["\u23e9"],"\ue23c","\udbba\udefe",["fast_forward"],0,16],"23ea":[["\u23ea"],"\ue23d","\udbba\udeff",["rewind"],0,17],"23eb":[["\u23eb"],"","\udbba\udf03",["arrow_double_up"],0,18],"23ec":[["\u23ec"],"","\udbba\udf02",["arrow_double_down"],0,19],"23f0":[["\u23f0"],"\ue02d","\udbb8\udc2a",["alarm_clock"],0,20],"23f3":[["\u23f3"],"","\udbb8\udc1b",["hourglass_flowing_sand"],0,21],"24c2":[["\u24c2\ufe0f","\u24c2"],"\ue434","\udbb9\udfe1",["m"],0,22],"25aa":[["\u25aa\ufe0f","\u25aa"],"\ue21a","\udbba\udf6e",["black_small_square"],0,23],"25ab":[["\u25ab\ufe0f","\u25ab"],"\ue21b","\udbba\udf6d",["white_small_square"],0,24],"25b6":[["\u25b6\ufe0f","\u25b6"],"\ue23a","\udbba\udefc",["arrow_forward"],0,25],"25c0":[["\u25c0\ufe0f","\u25c0"],"\ue23b","\udbba\udefd",["arrow_backward"],0,26],"25fb":[["\u25fb\ufe0f","\u25fb"],"\ue21b","\udbba\udf71",["white_medium_square"],0,27],"25fc":[["\u25fc\ufe0f","\u25fc"],"\ue21a","\udbba\udf72",["black_medium_square"],0,28],"25fd":[["\u25fd\ufe0f","\u25fd"],"\ue21b","\udbba\udf6f",["white_medium_small_square"],0,29],"25fe":[["\u25fe\ufe0f","\u25fe"],"\ue21a","\udbba\udf70",["black_medium_small_square"],1,0],2600:[["\u2600\ufe0f","\u2600"],"\ue04a","\udbb8\udc00",["sunny"],1,1],2601:[["\u2601\ufe0f","\u2601"],"\ue049","\udbb8\udc01",["cloud"],1,2],"260e":[["\u260e\ufe0f","\u260e"],"\ue009","\udbb9\udd23",["phone","telephone"],1,3],2611:[["\u2611\ufe0f","\u2611"],"","\udbba\udf8b",["ballot_box_with_check"],1,4],2614:[["\u2614\ufe0f","\u2614"],"\ue04b","\udbb8\udc02",["umbrella"],1,5],2615:[["\u2615\ufe0f","\u2615"],"\ue045","\udbba\udd81",["coffee"],1,6],"261d":[["\u261d\ufe0f","\u261d"],"\ue00f","\udbba\udf98",["point_up"],1,7],"263a":[["\u263a\ufe0f","\u263a"],"\ue414","\udbb8\udf36",["relaxed"],1,8],2648:[["\u2648\ufe0f","\u2648"],"\ue23f","\udbb8\udc2b",["aries"],1,9],2649:[["\u2649\ufe0f","\u2649"],"\ue240","\udbb8\udc2c",["taurus"],1,10],"264a":[["\u264a\ufe0f","\u264a"],"\ue241","\udbb8\udc2d",["gemini"],1,11],"264b":[["\u264b\ufe0f","\u264b"],"\ue242","\udbb8\udc2e",["cancer"],1,12],"264c":[["\u264c\ufe0f","\u264c"],"\ue243","\udbb8\udc2f",["leo"],1,13],"264d":[["\u264d\ufe0f","\u264d"],"\ue244","\udbb8\udc30",["virgo"],1,14],"264e":[["\u264e\ufe0f","\u264e"],"\ue245","\udbb8\udc31",["libra"],1,15],"264f":[["\u264f\ufe0f","\u264f"],"\ue246","\udbb8\udc32",["scorpius"],1,16],2650:[["\u2650\ufe0f","\u2650"],"\ue247","\udbb8\udc33",["sagittarius"],1,17],2651:[["\u2651\ufe0f","\u2651"],"\ue248","\udbb8\udc34",["capricorn"],1,18],2652:[["\u2652\ufe0f","\u2652"],"\ue249","\udbb8\udc35",["aquarius"],1,19],2653:[["\u2653\ufe0f","\u2653"],"\ue24a","\udbb8\udc36",["pisces"],1,20],2660:[["\u2660\ufe0f","\u2660"],"\ue20e","\udbba\udf1b",["spades"],1,21],2663:[["\u2663\ufe0f","\u2663"],"\ue20f","\udbba\udf1d",["clubs"],1,22],2665:[["\u2665\ufe0f","\u2665"],"\ue20c","\udbba\udf1a",["hearts"],1,23],2666:[["\u2666\ufe0f","\u2666"],"\ue20d","\udbba\udf1c",["diamonds"],1,24],2668:[["\u2668\ufe0f","\u2668"],"\ue123","\udbb9\udffa",["hotsprings"],1,25],"267b":[["\u267b\ufe0f","\u267b"],"","\udbba\udf2c",["recycle"],1,26],"267f":[["\u267f\ufe0f","\u267f"],"\ue20a","\udbba\udf20",["wheelchair"],1,27],2693:[["\u2693\ufe0f","\u2693"],"\ue202","\udbb9\udcc1",["anchor"],1,28],"26a0":[["\u26a0\ufe0f","\u26a0"],"\ue252","\udbba\udf23",["warning"],1,29],"26a1":[["\u26a1\ufe0f","\u26a1"],"\ue13d","\udbb8\udc04",["zap"],2,0],"26aa":[["\u26aa\ufe0f","\u26aa"],"\ue219","\udbba\udf65",["white_circle"],2,1],"26ab":[["\u26ab\ufe0f","\u26ab"],"\ue219","\udbba\udf66",["black_circle"],2,2],"26bd":[["\u26bd\ufe0f","\u26bd"],"\ue018","\udbb9\udfd4",["soccer"],2,3],"26be":[["\u26be\ufe0f","\u26be"],"\ue016","\udbb9\udfd1",["baseball"],2,4],"26c4":[["\u26c4\ufe0f","\u26c4"],"\ue048","\udbb8\udc03",["snowman"],2,5],"26c5":[["\u26c5\ufe0f","\u26c5"],"\ue04a\ue049","\udbb8\udc0f",["partly_sunny"],2,6],"26ce":[["\u26ce"],"\ue24b","\udbb8\udc37",["ophiuchus"],2,7],"26d4":[["\u26d4\ufe0f","\u26d4"],"\ue137","\udbba\udf26",["no_entry"],2,8],"26ea":[["\u26ea\ufe0f","\u26ea"],"\ue037","\udbb9\udcbb",["church"],2,9],"26f2":[["\u26f2\ufe0f","\u26f2"],"\ue121","\udbb9\udcbc",["fountain"],2,10],"26f3":[["\u26f3\ufe0f","\u26f3"],"\ue014","\udbb9\udfd2",["golf"],2,11],"26f5":[["\u26f5\ufe0f","\u26f5"],"\ue01c","\udbb9\udfea",["boat","sailboat"],2,12],"26fa":[["\u26fa\ufe0f","\u26fa"],"\ue122","\udbb9\udffb",["tent"],2,13],"26fd":[["\u26fd\ufe0f","\u26fd"],"\ue03a","\udbb9\udff5",["fuelpump"],2,14],2702:[["\u2702\ufe0f","\u2702"],"\ue313","\udbb9\udd3e",["scissors"],2,15],2705:[["\u2705"],"","\udbba\udf4a",["white_check_mark"],2,16],2708:[["\u2708\ufe0f","\u2708"],"\ue01d","\udbb9\udfe9",["airplane"],2,17],2709:[["\u2709\ufe0f","\u2709"],"\ue103","\udbb9\udd29",["email","envelope"],2,18],"270a":[["\u270a"],"\ue010","\udbba\udf93",["fist"],2,19],"270b":[["\u270b"],"\ue012","\udbba\udf95",["hand","raised_hand"],2,20],"270c":[["\u270c\ufe0f","\u270c"],"\ue011","\udbba\udf94",["v"],2,21],"270f":[["\u270f\ufe0f","\u270f"],"\ue301","\udbb9\udd39",["pencil2"],2,22],2712:[["\u2712\ufe0f","\u2712"],"","\udbb9\udd36",["black_nib"],2,23],2714:[["\u2714\ufe0f","\u2714"],"","\udbba\udf49",["heavy_check_mark"],2,24],2716:[["\u2716\ufe0f","\u2716"],"\ue333","\udbba\udf53",["heavy_multiplication_x"],2,25],2728:[["\u2728"],"\ue32e","\udbba\udf60",["sparkles"],2,26],2733:[["\u2733\ufe0f","\u2733"],"\ue206","\udbba\udf62",["eight_spoked_asterisk"],2,27],2734:[["\u2734\ufe0f","\u2734"],"\ue205","\udbba\udf61",["eight_pointed_black_star"],2,28],2744:[["\u2744\ufe0f","\u2744"],"","\udbb8\udc0e",["snowflake"],2,29],2747:[["\u2747\ufe0f","\u2747"],"\ue32e","\udbba\udf77",["sparkle"],3,0],"274c":[["\u274c"],"\ue333","\udbba\udf45",["x"],3,1],"274e":[["\u274e"],"\ue333","\udbba\udf46",["negative_squared_cross_mark"],3,2],2753:[["\u2753"],"\ue020","\udbba\udf09",["question"],3,3],2754:[["\u2754"],"\ue336","\udbba\udf0a",["grey_question"],3,4],2755:[["\u2755"],"\ue337","\udbba\udf0b",["grey_exclamation"],3,5],2757:[["\u2757\ufe0f","\u2757"],"\ue021","\udbba\udf04",["exclamation","heavy_exclamation_mark"],3,6],2764:[["\u2764\ufe0f","\u2764"],"\ue022","\udbba\udf0c",["heart"],3,7,"<3"],2795:[["\u2795"],"","\udbba\udf51",["heavy_plus_sign"],3,8],2796:[["\u2796"],"","\udbba\udf52",["heavy_minus_sign"],3,9],2797:[["\u2797"],"","\udbba\udf54",["heavy_division_sign"],3,10],"27a1":[["\u27a1\ufe0f","\u27a1"],"\ue234","\udbba\udefa",["arrow_right"],3,11],"27b0":[["\u27b0"],"","\udbba\udf08",["curly_loop"],3,12],"27bf":[["\u27bf"],"\ue211","\udbba\udc2b",["loop"],3,13],2934:[["\u2934\ufe0f","\u2934"],"\ue236","\udbba\udef4",["arrow_heading_up"],3,14],2935:[["\u2935\ufe0f","\u2935"],"\ue238","\udbba\udef5",["arrow_heading_down"],3,15],"2b05":[["\u2b05\ufe0f","\u2b05"],"\ue235","\udbba\udefb",["arrow_left"],3,16],"2b06":[["\u2b06\ufe0f","\u2b06"],"\ue232","\udbba\udef8",["arrow_up"],3,17],"2b07":[["\u2b07\ufe0f","\u2b07"],"\ue233","\udbba\udef9",["arrow_down"],3,18],"2b1b":[["\u2b1b\ufe0f","\u2b1b"],"\ue21a","\udbba\udf6c",["black_large_square"],3,19],"2b1c":[["\u2b1c\ufe0f","\u2b1c"],"\ue21b","\udbba\udf6b",["white_large_square"],3,20],"2b50":[["\u2b50\ufe0f","\u2b50"],"\ue32f","\udbba\udf68",["star"],3,21],"2b55":[["\u2b55\ufe0f","\u2b55"],"\ue332","\udbba\udf44",["o"],3,22],3030:[["\u3030"],"","\udbba\udf07",["wavy_dash"],3,23],"303d":[["\u303d\ufe0f","\u303d"],"\ue12c","\udbba\udc1b",["part_alternation_mark"],3,24],3297:[["\u3297\ufe0f","\u3297"],"\ue30d","\udbba\udf43",["congratulations"],3,25],3299:[["\u3299\ufe0f","\u3299"],"\ue315","\udbba\udf2b",["secret"],3,26],"1f004":[["\ud83c\udc04\ufe0f","\ud83c\udc04"],"\ue12d","\udbba\udc0b",["mahjong"],3,27],"1f0cf":[["\ud83c\udccf"],"","\udbba\udc12",["black_joker"],3,28],"1f170":[["\ud83c\udd70"],"\ue532","\udbb9\udd0b",["a"],3,29],"1f171":[["\ud83c\udd71"],"\ue533","\udbb9\udd0c",["b"],4,0],"1f17e":[["\ud83c\udd7e"],"\ue535","\udbb9\udd0e",["o2"],4,1],"1f17f":[["\ud83c\udd7f\ufe0f","\ud83c\udd7f"],"\ue14f","\udbb9\udff6",["parking"],4,2],"1f18e":[["\ud83c\udd8e"],"\ue534","\udbb9\udd0d",["ab"],4,3],"1f191":[["\ud83c\udd91"],"","\udbba\udf84",["cl"],4,4],"1f192":[["\ud83c\udd92"],"\ue214","\udbba\udf38",["cool"],4,5],"1f193":[["\ud83c\udd93"],"","\udbba\udf21",["free"],4,6],"1f194":[["\ud83c\udd94"],"\ue229","\udbba\udf81",["id"],4,7],"1f195":[["\ud83c\udd95"],"\ue212","\udbba\udf36",["new"],4,8],"1f196":[["\ud83c\udd96"],"","\udbba\udf28",["ng"],4,9],"1f197":[["\ud83c\udd97"],"\ue24d","\udbba\udf27",["ok"],4,10],"1f198":[["\ud83c\udd98"],"","\udbba\udf4f",["sos"],4,11],"1f199":[["\ud83c\udd99"],"\ue213","\udbba\udf37",["up"],4,12],"1f19a":[["\ud83c\udd9a"],"\ue12e","\udbba\udf32",["vs"],4,13],"1f201":[["\ud83c\ude01"],"\ue203","\udbba\udf24",["koko"],4,14],"1f202":[["\ud83c\ude02"],"\ue228","\udbba\udf3f",["sa"],4,15],"1f21a":[["\ud83c\ude1a\ufe0f","\ud83c\ude1a"],"\ue216","\udbba\udf3a",["u7121"],4,16],"1f22f":[["\ud83c\ude2f\ufe0f","\ud83c\ude2f"],"\ue22c","\udbba\udf40",["u6307"],4,17],"1f232":[["\ud83c\ude32"],"","\udbba\udf2e",["u7981"],4,18],"1f233":[["\ud83c\ude33"],"\ue22b","\udbba\udf2f",["u7a7a"],4,19],"1f234":[["\ud83c\ude34"],"","\udbba\udf30",["u5408"],4,20],"1f235":[["\ud83c\ude35"],"\ue22a","\udbba\udf31",["u6e80"],4,21],"1f236":[["\ud83c\ude36"],"\ue215","\udbba\udf39",["u6709"],4,22],"1f237":[["\ud83c\ude37"],"\ue217","\udbba\udf3b",["u6708"],4,23],"1f238":[["\ud83c\ude38"],"\ue218","\udbba\udf3c",["u7533"],4,24],"1f239":[["\ud83c\ude39"],"\ue227","\udbba\udf3e",["u5272"],4,25],"1f23a":[["\ud83c\ude3a"],"\ue22d","\udbba\udf41",["u55b6"],4,26],"1f250":[["\ud83c\ude50"],"\ue226","\udbba\udf3d",["ideograph_advantage"],4,27],"1f251":[["\ud83c\ude51"],"","\udbba\udf50",["accept"],4,28],"1f300":[["\ud83c\udf00"],"\ue443","\udbb8\udc05",["cyclone"],4,29],"1f301":[["\ud83c\udf01"],"","\udbb8\udc06",["foggy"],5,0],"1f302":[["\ud83c\udf02"],"\ue43c","\udbb8\udc07",["closed_umbrella"],5,1],"1f303":[["\ud83c\udf03"],"\ue44b","\udbb8\udc08",["night_with_stars"],5,2],"1f304":[["\ud83c\udf04"],"\ue04d","\udbb8\udc09",["sunrise_over_mountains"],5,3],"1f305":[["\ud83c\udf05"],"\ue449","\udbb8\udc0a",["sunrise"],5,4],"1f306":[["\ud83c\udf06"],"\ue146","\udbb8\udc0b",["city_sunset"],5,5],"1f307":[["\ud83c\udf07"],"\ue44a","\udbb8\udc0c",["city_sunrise"],5,6],"1f308":[["\ud83c\udf08"],"\ue44c","\udbb8\udc0d",["rainbow"],5,7],"1f309":[["\ud83c\udf09"],"\ue44b","\udbb8\udc10",["bridge_at_night"],5,8],"1f30a":[["\ud83c\udf0a"],"\ue43e","\udbb8\udc38",["ocean"],5,9],"1f30b":[["\ud83c\udf0b"],"","\udbb8\udc3a",["volcano"],5,10],"1f30c":[["\ud83c\udf0c"],"\ue44b","\udbb8\udc3b",["milky_way"],5,11],"1f30d":[["\ud83c\udf0d"],"","",["earth_africa"],5,12],"1f30e":[["\ud83c\udf0e"],"","",["earth_americas"],5,13],"1f30f":[["\ud83c\udf0f"],"","\udbb8\udc39",["earth_asia"],5,14],"1f310":[["\ud83c\udf10"],"","",["globe_with_meridians"],5,15],"1f311":[["\ud83c\udf11"],"","\udbb8\udc11",["new_moon"],5,16],"1f312":[["\ud83c\udf12"],"","",["waxing_crescent_moon"],5,17],"1f313":[["\ud83c\udf13"],"\ue04c","\udbb8\udc13",["first_quarter_moon"],5,18],"1f314":[["\ud83c\udf14"],"\ue04c","\udbb8\udc12",["moon","waxing_gibbous_moon"],5,19],"1f315":[["\ud83c\udf15"],"","\udbb8\udc15",["full_moon"],5,20],"1f316":[["\ud83c\udf16"],"","",["waning_gibbous_moon"],5,21],"1f317":[["\ud83c\udf17"],"","",["last_quarter_moon"],5,22],"1f318":[["\ud83c\udf18"],"","",["waning_crescent_moon"],5,23],"1f319":[["\ud83c\udf19"],"\ue04c","\udbb8\udc14",["crescent_moon"],5,24],"1f31a":[["\ud83c\udf1a"],"","",["new_moon_with_face"],5,25],"1f31b":[["\ud83c\udf1b"],"\ue04c","\udbb8\udc16",["first_quarter_moon_with_face"],5,26],"1f31c":[["\ud83c\udf1c"],"","",["last_quarter_moon_with_face"],5,27],"1f31d":[["\ud83c\udf1d"],"","",["full_moon_with_face"],5,28],"1f31e":[["\ud83c\udf1e"],"","",["sun_with_face"],5,29],"1f31f":[["\ud83c\udf1f"],"\ue335","\udbba\udf69",["star2"],6,0],"1f320":[["\ud83c\udf20"],"","\udbba\udf6a",["stars"],6,1],"1f330":[["\ud83c\udf30"],"","\udbb8\udc4c",["chestnut"],6,2],"1f331":[["\ud83c\udf31"],"\ue110","\udbb8\udc3e",["seedling"],6,3],"1f332":[["\ud83c\udf32"],"","",["evergreen_tree"],6,4],"1f333":[["\ud83c\udf33"],"","",["deciduous_tree"],6,5],"1f334":[["\ud83c\udf34"],"\ue307","\udbb8\udc47",["palm_tree"],6,6],"1f335":[["\ud83c\udf35"],"\ue308","\udbb8\udc48",["cactus"],6,7],"1f337":[["\ud83c\udf37"],"\ue304","\udbb8\udc3d",["tulip"],6,8],"1f338":[["\ud83c\udf38"],"\ue030","\udbb8\udc40",["cherry_blossom"],6,9],"1f339":[["\ud83c\udf39"],"\ue032","\udbb8\udc41",["rose"],6,10],"1f33a":[["\ud83c\udf3a"],"\ue303","\udbb8\udc45",["hibiscus"],6,11],"1f33b":[["\ud83c\udf3b"],"\ue305","\udbb8\udc46",["sunflower"],6,12],"1f33c":[["\ud83c\udf3c"],"\ue305","\udbb8\udc4d",["blossom"],6,13],"1f33d":[["\ud83c\udf3d"],"","\udbb8\udc4a",["corn"],6,14],"1f33e":[["\ud83c\udf3e"],"\ue444","\udbb8\udc49",["ear_of_rice"],6,15],"1f33f":[["\ud83c\udf3f"],"\ue110","\udbb8\udc4e",["herb"],6,16],"1f340":[["\ud83c\udf40"],"\ue110","\udbb8\udc3c",["four_leaf_clover"],6,17],"1f341":[["\ud83c\udf41"],"\ue118","\udbb8\udc3f",["maple_leaf"],6,18],"1f342":[["\ud83c\udf42"],"\ue119","\udbb8\udc42",["fallen_leaf"],6,19],"1f343":[["\ud83c\udf43"],"\ue447","\udbb8\udc43",["leaves"],6,20],"1f344":[["\ud83c\udf44"],"","\udbb8\udc4b",["mushroom"],6,21],"1f345":[["\ud83c\udf45"],"\ue349","\udbb8\udc55",["tomato"],6,22],"1f346":[["\ud83c\udf46"],"\ue34a","\udbb8\udc56",["eggplant"],6,23],"1f347":[["\ud83c\udf47"],"","\udbb8\udc59",["grapes"],6,24],"1f348":[["\ud83c\udf48"],"","\udbb8\udc57",["melon"],6,25],"1f349":[["\ud83c\udf49"],"\ue348","\udbb8\udc54",["watermelon"],6,26],"1f34a":[["\ud83c\udf4a"],"\ue346","\udbb8\udc52",["tangerine"],6,27],"1f34b":[["\ud83c\udf4b"],"","",["lemon"],6,28],"1f34c":[["\ud83c\udf4c"],"","\udbb8\udc50",["banana"],6,29],"1f34d":[["\ud83c\udf4d"],"","\udbb8\udc58",["pineapple"],7,0],"1f34e":[["\ud83c\udf4e"],"\ue345","\udbb8\udc51",["apple"],7,1],"1f34f":[["\ud83c\udf4f"],"\ue345","\udbb8\udc5b",["green_apple"],7,2],"1f350":[["\ud83c\udf50"],"","",["pear"],7,3],"1f351":[["\ud83c\udf51"],"","\udbb8\udc5a",["peach"],7,4],"1f352":[["\ud83c\udf52"],"","\udbb8\udc4f",["cherries"],7,5],"1f353":[["\ud83c\udf53"],"\ue347","\udbb8\udc53",["strawberry"],7,6],"1f354":[["\ud83c\udf54"],"\ue120","\udbba\udd60",["hamburger"],7,7],"1f355":[["\ud83c\udf55"],"","\udbba\udd75",["pizza"],7,8],"1f356":[["\ud83c\udf56"],"","\udbba\udd72",["meat_on_bone"],7,9],"1f357":[["\ud83c\udf57"],"","\udbba\udd76",["poultry_leg"],7,10],"1f358":[["\ud83c\udf58"],"\ue33d","\udbba\udd69",["rice_cracker"],7,11],"1f359":[["\ud83c\udf59"],"\ue342","\udbba\udd61",["rice_ball"],7,12],"1f35a":[["\ud83c\udf5a"],"\ue33e","\udbba\udd6a",["rice"],7,13],"1f35b":[["\ud83c\udf5b"],"\ue341","\udbba\udd6c",["curry"],7,14],"1f35c":[["\ud83c\udf5c"],"\ue340","\udbba\udd63",["ramen"],7,15],"1f35d":[["\ud83c\udf5d"],"\ue33f","\udbba\udd6b",["spaghetti"],7,16],"1f35e":[["\ud83c\udf5e"],"\ue339","\udbba\udd64",["bread"],7,17],"1f35f":[["\ud83c\udf5f"],"\ue33b","\udbba\udd67",["fries"],7,18],"1f360":[["\ud83c\udf60"],"","\udbba\udd74",["sweet_potato"],7,19],"1f361":[["\ud83c\udf61"],"\ue33c","\udbba\udd68",["dango"],7,20],"1f362":[["\ud83c\udf62"],"\ue343","\udbba\udd6d",["oden"],7,21],"1f363":[["\ud83c\udf63"],"\ue344","\udbba\udd6e",["sushi"],7,22],"1f364":[["\ud83c\udf64"],"","\udbba\udd7f",["fried_shrimp"],7,23],"1f365":[["\ud83c\udf65"],"","\udbba\udd73",["fish_cake"],7,24],"1f366":[["\ud83c\udf66"],"\ue33a","\udbba\udd66",["icecream"],7,25],"1f367":[["\ud83c\udf67"],"\ue43f","\udbba\udd71",["shaved_ice"],7,26],"1f368":[["\ud83c\udf68"],"","\udbba\udd77",["ice_cream"],7,27],"1f369":[["\ud83c\udf69"],"","\udbba\udd78",["doughnut"],7,28],"1f36a":[["\ud83c\udf6a"],"","\udbba\udd79",["cookie"],7,29],"1f36b":[["\ud83c\udf6b"],"","\udbba\udd7a",["chocolate_bar"],8,0],"1f36c":[["\ud83c\udf6c"],"","\udbba\udd7b",["candy"],8,1],"1f36d":[["\ud83c\udf6d"],"","\udbba\udd7c",["lollipop"],8,2],"1f36e":[["\ud83c\udf6e"],"","\udbba\udd7d",["custard"],8,3],"1f36f":[["\ud83c\udf6f"],"","\udbba\udd7e",["honey_pot"],8,4],"1f370":[["\ud83c\udf70"],"\ue046","\udbba\udd62",["cake"],8,5],"1f371":[["\ud83c\udf71"],"\ue34c","\udbba\udd6f",["bento"],8,6],"1f372":[["\ud83c\udf72"],"\ue34d","\udbba\udd70",["stew"],8,7],"1f373":[["\ud83c\udf73"],"\ue147","\udbba\udd65",["egg"],8,8],"1f374":[["\ud83c\udf74"],"\ue043","\udbba\udd80",["fork_and_knife"],8,9],"1f375":[["\ud83c\udf75"],"\ue338","\udbba\udd84",["tea"],8,10],"1f376":[["\ud83c\udf76"],"\ue30b","\udbba\udd85",["sake"],8,11],"1f377":[["\ud83c\udf77"],"\ue044","\udbba\udd86",["wine_glass"],8,12],"1f378":[["\ud83c\udf78"],"\ue044","\udbba\udd82",["cocktail"],8,13],"1f379":[["\ud83c\udf79"],"\ue044","\udbba\udd88",["tropical_drink"],8,14],"1f37a":[["\ud83c\udf7a"],"\ue047","\udbba\udd83",["beer"],8,15],"1f37b":[["\ud83c\udf7b"],"\ue30c","\udbba\udd87",["beers"],8,16],"1f37c":[["\ud83c\udf7c"],"","",["baby_bottle"],8,17],"1f380":[["\ud83c\udf80"],"\ue314","\udbb9\udd0f",["ribbon"],8,18],"1f381":[["\ud83c\udf81"],"\ue112","\udbb9\udd10",["gift"],8,19],"1f382":[["\ud83c\udf82"],"\ue34b","\udbb9\udd11",["birthday"],8,20],"1f383":[["\ud83c\udf83"],"\ue445","\udbb9\udd1f",["jack_o_lantern"],8,21],"1f384":[["\ud83c\udf84"],"\ue033","\udbb9\udd12",["christmas_tree"],8,22],"1f385":[["\ud83c\udf85"],"\ue448","\udbb9\udd13",["santa"],8,23],"1f386":[["\ud83c\udf86"],"\ue117","\udbb9\udd15",["fireworks"],8,24],"1f387":[["\ud83c\udf87"],"\ue440","\udbb9\udd1d",["sparkler"],8,25],"1f388":[["\ud83c\udf88"],"\ue310","\udbb9\udd16",["balloon"],8,26],"1f389":[["\ud83c\udf89"],"\ue312","\udbb9\udd17",["tada"],8,27],"1f38a":[["\ud83c\udf8a"],"","\udbb9\udd20",["confetti_ball"],8,28],"1f38b":[["\ud83c\udf8b"],"","\udbb9\udd21",["tanabata_tree"],8,29],"1f38c":[["\ud83c\udf8c"],"\ue143","\udbb9\udd14",["crossed_flags"],9,0],"1f38d":[["\ud83c\udf8d"],"\ue436","\udbb9\udd18",["bamboo"],9,1],"1f38e":[["\ud83c\udf8e"],"\ue438","\udbb9\udd19",["dolls"],9,2],"1f38f":[["\ud83c\udf8f"],"\ue43b","\udbb9\udd1c",["flags"],9,3],"1f390":[["\ud83c\udf90"],"\ue442","\udbb9\udd1e",["wind_chime"],9,4],"1f391":[["\ud83c\udf91"],"\ue446","\udbb8\udc17",["rice_scene"],9,5],"1f392":[["\ud83c\udf92"],"\ue43a","\udbb9\udd1b",["school_satchel"],9,6],"1f393":[["\ud83c\udf93"],"\ue439","\udbb9\udd1a",["mortar_board"],9,7],"1f3a0":[["\ud83c\udfa0"],"","\udbb9\udffc",["carousel_horse"],9,8],"1f3a1":[["\ud83c\udfa1"],"\ue124","\udbb9\udffd",["ferris_wheel"],9,9],"1f3a2":[["\ud83c\udfa2"],"\ue433","\udbb9\udffe",["roller_coaster"],9,10],"1f3a3":[["\ud83c\udfa3"],"\ue019","\udbb9\udfff",["fishing_pole_and_fish"],9,11],"1f3a4":[["\ud83c\udfa4"],"\ue03c","\udbba\udc00",["microphone"],9,12],"1f3a5":[["\ud83c\udfa5"],"\ue03d","\udbba\udc01",["movie_camera"],9,13],"1f3a6":[["\ud83c\udfa6"],"\ue507","\udbba\udc02",["cinema"],9,14],"1f3a7":[["\ud83c\udfa7"],"\ue30a","\udbba\udc03",["headphones"],9,15],"1f3a8":[["\ud83c\udfa8"],"\ue502","\udbba\udc04",["art"],9,16],"1f3a9":[["\ud83c\udfa9"],"\ue503","\udbba\udc05",["tophat"],9,17],"1f3aa":[["\ud83c\udfaa"],"","\udbba\udc06",["circus_tent"],9,18],"1f3ab":[["\ud83c\udfab"],"\ue125","\udbba\udc07",["ticket"],9,19],"1f3ac":[["\ud83c\udfac"],"\ue324","\udbba\udc08",["clapper"],9,20],"1f3ad":[["\ud83c\udfad"],"\ue503","\udbba\udc09",["performing_arts"],9,21],"1f3ae":[["\ud83c\udfae"],"","\udbba\udc0a",["video_game"],9,22],"1f3af":[["\ud83c\udfaf"],"\ue130","\udbba\udc0c",["dart"],9,23],"1f3b0":[["\ud83c\udfb0"],"\ue133","\udbba\udc0d",["slot_machine"],9,24],"1f3b1":[["\ud83c\udfb1"],"\ue42c","\udbba\udc0e",["8ball"],9,25],"1f3b2":[["\ud83c\udfb2"],"","\udbba\udc0f",["game_die"],9,26],"1f3b3":[["\ud83c\udfb3"],"","\udbba\udc10",["bowling"],9,27],"1f3b4":[["\ud83c\udfb4"],"","\udbba\udc11",["flower_playing_cards"],9,28],"1f3b5":[["\ud83c\udfb5"],"\ue03e","\udbba\udc13",["musical_note"],9,29],"1f3b6":[["\ud83c\udfb6"],"\ue326","\udbba\udc14",["notes"],10,0],"1f3b7":[["\ud83c\udfb7"],"\ue040","\udbba\udc15",["saxophone"],10,1],"1f3b8":[["\ud83c\udfb8"],"\ue041","\udbba\udc16",["guitar"],10,2],"1f3b9":[["\ud83c\udfb9"],"","\udbba\udc17",["musical_keyboard"],10,3],"1f3ba":[["\ud83c\udfba"],"\ue042","\udbba\udc18",["trumpet"],10,4],"1f3bb":[["\ud83c\udfbb"],"","\udbba\udc19",["violin"],10,5],"1f3bc":[["\ud83c\udfbc"],"\ue326","\udbba\udc1a",["musical_score"],10,6],"1f3bd":[["\ud83c\udfbd"],"","\udbb9\udfd0",["running_shirt_with_sash"],10,7],"1f3be":[["\ud83c\udfbe"],"\ue015","\udbb9\udfd3",["tennis"],10,8],"1f3bf":[["\ud83c\udfbf"],"\ue013","\udbb9\udfd5",["ski"],10,9],"1f3c0":[["\ud83c\udfc0"],"\ue42a","\udbb9\udfd6",["basketball"],10,10],"1f3c1":[["\ud83c\udfc1"],"\ue132","\udbb9\udfd7",["checkered_flag"],10,11],"1f3c2":[["\ud83c\udfc2"],"","\udbb9\udfd8",["snowboarder"],10,12],"1f3c3":[["\ud83c\udfc3"],"\ue115","\udbb9\udfd9",["runner","running"],10,13],"1f3c4":[["\ud83c\udfc4"],"\ue017","\udbb9\udfda",["surfer"],10,14],"1f3c6":[["\ud83c\udfc6"],"\ue131","\udbb9\udfdb",["trophy"],10,15],"1f3c7":[["\ud83c\udfc7"],"","",["horse_racing"],10,16],"1f3c8":[["\ud83c\udfc8"],"\ue42b","\udbb9\udfdd",["football"],10,17],"1f3c9":[["\ud83c\udfc9"],"","",["rugby_football"],10,18],"1f3ca":[["\ud83c\udfca"],"\ue42d","\udbb9\udfde",["swimmer"],10,19],"1f3e0":[["\ud83c\udfe0"],"\ue036","\udbb9\udcb0",["house"],10,20],
"1f3e1":[["\ud83c\udfe1"],"\ue036","\udbb9\udcb1",["house_with_garden"],10,21],"1f3e2":[["\ud83c\udfe2"],"\ue038","\udbb9\udcb2",["office"],10,22],"1f3e3":[["\ud83c\udfe3"],"\ue153","\udbb9\udcb3",["post_office"],10,23],"1f3e4":[["\ud83c\udfe4"],"","",["european_post_office"],10,24],"1f3e5":[["\ud83c\udfe5"],"\ue155","\udbb9\udcb4",["hospital"],10,25],"1f3e6":[["\ud83c\udfe6"],"\ue14d","\udbb9\udcb5",["bank"],10,26],"1f3e7":[["\ud83c\udfe7"],"\ue154","\udbb9\udcb6",["atm"],10,27],"1f3e8":[["\ud83c\udfe8"],"\ue158","\udbb9\udcb7",["hotel"],10,28],"1f3e9":[["\ud83c\udfe9"],"\ue501","\udbb9\udcb8",["love_hotel"],10,29],"1f3ea":[["\ud83c\udfea"],"\ue156","\udbb9\udcb9",["convenience_store"],11,0],"1f3eb":[["\ud83c\udfeb"],"\ue157","\udbb9\udcba",["school"],11,1],"1f3ec":[["\ud83c\udfec"],"\ue504","\udbb9\udcbd",["department_store"],11,2],"1f3ed":[["\ud83c\udfed"],"\ue508","\udbb9\udcc0",["factory"],11,3],"1f3ee":[["\ud83c\udfee"],"\ue30b","\udbb9\udcc2",["izakaya_lantern","lantern"],11,4],"1f3ef":[["\ud83c\udfef"],"\ue505","\udbb9\udcbe",["japanese_castle"],11,5],"1f3f0":[["\ud83c\udff0"],"\ue506","\udbb9\udcbf",["european_castle"],11,6],"1f400":[["\ud83d\udc00"],"","",["rat"],11,7],"1f401":[["\ud83d\udc01"],"","",["mouse2"],11,8],"1f402":[["\ud83d\udc02"],"","",["ox"],11,9],"1f403":[["\ud83d\udc03"],"","",["water_buffalo"],11,10],"1f404":[["\ud83d\udc04"],"","",["cow2"],11,11],"1f405":[["\ud83d\udc05"],"","",["tiger2"],11,12],"1f406":[["\ud83d\udc06"],"","",["leopard"],11,13],"1f407":[["\ud83d\udc07"],"","",["rabbit2"],11,14],"1f408":[["\ud83d\udc08"],"","",["cat2"],11,15],"1f409":[["\ud83d\udc09"],"","",["dragon"],11,16],"1f40a":[["\ud83d\udc0a"],"","",["crocodile"],11,17],"1f40b":[["\ud83d\udc0b"],"","",["whale2"],11,18],"1f40c":[["\ud83d\udc0c"],"","\udbb8\uddb9",["snail"],11,19],"1f40d":[["\ud83d\udc0d"],"\ue52d","\udbb8\uddd3",["snake"],11,20],"1f40e":[["\ud83d\udc0e"],"\ue134","\udbb9\udfdc",["racehorse"],11,21],"1f40f":[["\ud83d\udc0f"],"","",["ram"],11,22],"1f410":[["\ud83d\udc10"],"","",["goat"],11,23],"1f411":[["\ud83d\udc11"],"\ue529","\udbb8\uddcf",["sheep"],11,24],"1f412":[["\ud83d\udc12"],"\ue528","\udbb8\uddce",["monkey"],11,25],"1f413":[["\ud83d\udc13"],"","",["rooster"],11,26],"1f414":[["\ud83d\udc14"],"\ue52e","\udbb8\uddd4",["chicken"],11,27],"1f415":[["\ud83d\udc15"],"","",["dog2"],11,28],"1f416":[["\ud83d\udc16"],"","",["pig2"],11,29],"1f417":[["\ud83d\udc17"],"\ue52f","\udbb8\uddd5",["boar"],12,0],"1f418":[["\ud83d\udc18"],"\ue526","\udbb8\uddcc",["elephant"],12,1],"1f419":[["\ud83d\udc19"],"\ue10a","\udbb8\uddc5",["octopus"],12,2],"1f41a":[["\ud83d\udc1a"],"\ue441","\udbb8\uddc6",["shell"],12,3],"1f41b":[["\ud83d\udc1b"],"\ue525","\udbb8\uddcb",["bug"],12,4],"1f41c":[["\ud83d\udc1c"],"","\udbb8\uddda",["ant"],12,5],"1f41d":[["\ud83d\udc1d"],"","\udbb8\udde1",["bee","honeybee"],12,6],"1f41e":[["\ud83d\udc1e"],"","\udbb8\udde2",["beetle"],12,7],"1f41f":[["\ud83d\udc1f"],"\ue019","\udbb8\uddbd",["fish"],12,8],"1f420":[["\ud83d\udc20"],"\ue522","\udbb8\uddc9",["tropical_fish"],12,9],"1f421":[["\ud83d\udc21"],"\ue019","\udbb8\uddd9",["blowfish"],12,10],"1f422":[["\ud83d\udc22"],"","\udbb8\udddc",["turtle"],12,11],"1f423":[["\ud83d\udc23"],"\ue523","\udbb8\udddd",["hatching_chick"],12,12],"1f424":[["\ud83d\udc24"],"\ue523","\udbb8\uddba",["baby_chick"],12,13],"1f425":[["\ud83d\udc25"],"\ue523","\udbb8\uddbb",["hatched_chick"],12,14],"1f426":[["\ud83d\udc26"],"\ue521","\udbb8\uddc8",["bird"],12,15],"1f427":[["\ud83d\udc27"],"\ue055","\udbb8\uddbc",["penguin"],12,16],"1f428":[["\ud83d\udc28"],"\ue527","\udbb8\uddcd",["koala"],12,17],"1f429":[["\ud83d\udc29"],"\ue052","\udbb8\uddd8",["poodle"],12,18],"1f42a":[["\ud83d\udc2a"],"","",["dromedary_camel"],12,19],"1f42b":[["\ud83d\udc2b"],"\ue530","\udbb8\uddd6",["camel"],12,20],"1f42c":[["\ud83d\udc2c"],"\ue520","\udbb8\uddc7",["dolphin","flipper"],12,21],"1f42d":[["\ud83d\udc2d"],"\ue053","\udbb8\uddc2",["mouse"],12,22],"1f42e":[["\ud83d\udc2e"],"\ue52b","\udbb8\uddd1",["cow"],12,23],"1f42f":[["\ud83d\udc2f"],"\ue050","\udbb8\uddc0",["tiger"],12,24],"1f430":[["\ud83d\udc30"],"\ue52c","\udbb8\uddd2",["rabbit"],12,25],"1f431":[["\ud83d\udc31"],"\ue04f","\udbb8\uddb8",["cat"],12,26],"1f432":[["\ud83d\udc32"],"","\udbb8\uddde",["dragon_face"],12,27],"1f433":[["\ud83d\udc33"],"\ue054","\udbb8\uddc3",["whale"],12,28],"1f434":[["\ud83d\udc34"],"\ue01a","\udbb8\uddbe",["horse"],12,29],"1f435":[["\ud83d\udc35"],"\ue109","\udbb8\uddc4",["monkey_face"],13,0],"1f436":[["\ud83d\udc36"],"\ue052","\udbb8\uddb7",["dog"],13,1],"1f437":[["\ud83d\udc37"],"\ue10b","\udbb8\uddbf",["pig"],13,2],"1f438":[["\ud83d\udc38"],"\ue531","\udbb8\uddd7",["frog"],13,3],"1f439":[["\ud83d\udc39"],"\ue524","\udbb8\uddca",["hamster"],13,4],"1f43a":[["\ud83d\udc3a"],"\ue52a","\udbb8\uddd0",["wolf"],13,5],"1f43b":[["\ud83d\udc3b"],"\ue051","\udbb8\uddc1",["bear"],13,6],"1f43c":[["\ud83d\udc3c"],"","\udbb8\udddf",["panda_face"],13,7],"1f43d":[["\ud83d\udc3d"],"\ue10b","\udbb8\udde0",["pig_nose"],13,8],"1f43e":[["\ud83d\udc3e"],"\ue536","\udbb8\udddb",["feet","paw_prints"],13,9],"1f440":[["\ud83d\udc40"],"\ue419","\udbb8\udd90",["eyes"],13,10],"1f442":[["\ud83d\udc42"],"\ue41b","\udbb8\udd91",["ear"],13,11],"1f443":[["\ud83d\udc43"],"\ue41a","\udbb8\udd92",["nose"],13,12],"1f444":[["\ud83d\udc44"],"\ue41c","\udbb8\udd93",["lips"],13,13],"1f445":[["\ud83d\udc45"],"\ue409","\udbb8\udd94",["tongue"],13,14],"1f446":[["\ud83d\udc46"],"\ue22e","\udbba\udf99",["point_up_2"],13,15],"1f447":[["\ud83d\udc47"],"\ue22f","\udbba\udf9a",["point_down"],13,16],"1f448":[["\ud83d\udc48"],"\ue230","\udbba\udf9b",["point_left"],13,17],"1f449":[["\ud83d\udc49"],"\ue231","\udbba\udf9c",["point_right"],13,18],"1f44a":[["\ud83d\udc4a"],"\ue00d","\udbba\udf96",["facepunch","punch"],13,19],"1f44b":[["\ud83d\udc4b"],"\ue41e","\udbba\udf9d",["wave"],13,20],"1f44c":[["\ud83d\udc4c"],"\ue420","\udbba\udf9f",["ok_hand"],13,21],"1f44d":[["\ud83d\udc4d"],"\ue00e","\udbba\udf97",["+1","thumbsup"],13,22],"1f44e":[["\ud83d\udc4e"],"\ue421","\udbba\udfa0",["-1","thumbsdown"],13,23],"1f44f":[["\ud83d\udc4f"],"\ue41f","\udbba\udf9e",["clap"],13,24],"1f450":[["\ud83d\udc50"],"\ue422","\udbba\udfa1",["open_hands"],13,25],"1f451":[["\ud83d\udc51"],"\ue10e","\udbb9\udcd1",["crown"],13,26],"1f452":[["\ud83d\udc52"],"\ue318","\udbb9\udcd4",["womans_hat"],13,27],"1f453":[["\ud83d\udc53"],"","\udbb9\udcce",["eyeglasses"],13,28],"1f454":[["\ud83d\udc54"],"\ue302","\udbb9\udcd3",["necktie"],13,29],"1f455":[["\ud83d\udc55"],"\ue006","\udbb9\udccf",["shirt","tshirt"],14,0],"1f456":[["\ud83d\udc56"],"","\udbb9\udcd0",["jeans"],14,1],"1f457":[["\ud83d\udc57"],"\ue319","\udbb9\udcd5",["dress"],14,2],"1f458":[["\ud83d\udc58"],"\ue321","\udbb9\udcd9",["kimono"],14,3],"1f459":[["\ud83d\udc59"],"\ue322","\udbb9\udcda",["bikini"],14,4],"1f45a":[["\ud83d\udc5a"],"\ue006","\udbb9\udcdb",["womans_clothes"],14,5],"1f45b":[["\ud83d\udc5b"],"","\udbb9\udcdc",["purse"],14,6],"1f45c":[["\ud83d\udc5c"],"\ue323","\udbb9\udcf0",["handbag"],14,7],"1f45d":[["\ud83d\udc5d"],"","\udbb9\udcf1",["pouch"],14,8],"1f45e":[["\ud83d\udc5e"],"\ue007","\udbb9\udccc",["mans_shoe","shoe"],14,9],"1f45f":[["\ud83d\udc5f"],"\ue007","\udbb9\udccd",["athletic_shoe"],14,10],"1f460":[["\ud83d\udc60"],"\ue13e","\udbb9\udcd6",["high_heel"],14,11],"1f461":[["\ud83d\udc61"],"\ue31a","\udbb9\udcd7",["sandal"],14,12],"1f462":[["\ud83d\udc62"],"\ue31b","\udbb9\udcd8",["boot"],14,13],"1f463":[["\ud83d\udc63"],"\ue536","\udbb9\udd53",["footprints"],14,14],"1f464":[["\ud83d\udc64"],"","\udbb8\udd9a",["bust_in_silhouette"],14,15],"1f465":[["\ud83d\udc65"],"","",["busts_in_silhouette"],14,16],"1f466":[["\ud83d\udc66"],"\ue001","\udbb8\udd9b",["boy"],14,17],"1f467":[["\ud83d\udc67"],"\ue002","\udbb8\udd9c",["girl"],14,18],"1f468":[["\ud83d\udc68"],"\ue004","\udbb8\udd9d",["man"],14,19],"1f469":[["\ud83d\udc69"],"\ue005","\udbb8\udd9e",["woman"],14,20],"1f46a":[["\ud83d\udc6a"],"","\udbb8\udd9f",["family"],14,21],"1f46b":[["\ud83d\udc6b"],"\ue428","\udbb8\udda0",["couple"],14,22],"1f46c":[["\ud83d\udc6c"],"","",["two_men_holding_hands"],14,23],"1f46d":[["\ud83d\udc6d"],"","",["two_women_holding_hands"],14,24],"1f46e":[["\ud83d\udc6e"],"\ue152","\udbb8\udda1",["cop"],14,25],"1f46f":[["\ud83d\udc6f"],"\ue429","\udbb8\udda2",["dancers"],14,26],"1f470":[["\ud83d\udc70"],"","\udbb8\udda3",["bride_with_veil"],14,27],"1f471":[["\ud83d\udc71"],"\ue515","\udbb8\udda4",["person_with_blond_hair"],14,28],"1f472":[["\ud83d\udc72"],"\ue516","\udbb8\udda5",["man_with_gua_pi_mao"],14,29],"1f473":[["\ud83d\udc73"],"\ue517","\udbb8\udda6",["man_with_turban"],15,0],"1f474":[["\ud83d\udc74"],"\ue518","\udbb8\udda7",["older_man"],15,1],"1f475":[["\ud83d\udc75"],"\ue519","\udbb8\udda8",["older_woman"],15,2],"1f476":[["\ud83d\udc76"],"\ue51a","\udbb8\udda9",["baby"],15,3],"1f477":[["\ud83d\udc77"],"\ue51b","\udbb8\uddaa",["construction_worker"],15,4],"1f478":[["\ud83d\udc78"],"\ue51c","\udbb8\uddab",["princess"],15,5],"1f479":[["\ud83d\udc79"],"","\udbb8\uddac",["japanese_ogre"],15,6],"1f47a":[["\ud83d\udc7a"],"","\udbb8\uddad",["japanese_goblin"],15,7],"1f47b":[["\ud83d\udc7b"],"\ue11b","\udbb8\uddae",["ghost"],15,8],"1f47c":[["\ud83d\udc7c"],"\ue04e","\udbb8\uddaf",["angel"],15,9],"1f47d":[["\ud83d\udc7d"],"\ue10c","\udbb8\uddb0",["alien"],15,10],"1f47e":[["\ud83d\udc7e"],"\ue12b","\udbb8\uddb1",["space_invader"],15,11],"1f47f":[["\ud83d\udc7f"],"\ue11a","\udbb8\uddb2",["imp"],15,12],"1f480":[["\ud83d\udc80"],"\ue11c","\udbb8\uddb3",["skull"],15,13],"1f481":[["\ud83d\udc81"],"\ue253","\udbb8\uddb4",["information_desk_person"],15,14],"1f482":[["\ud83d\udc82"],"\ue51e","\udbb8\uddb5",["guardsman"],15,15],"1f483":[["\ud83d\udc83"],"\ue51f","\udbb8\uddb6",["dancer"],15,16],"1f484":[["\ud83d\udc84"],"\ue31c","\udbb8\udd95",["lipstick"],15,17],"1f485":[["\ud83d\udc85"],"\ue31d","\udbb8\udd96",["nail_care"],15,18],"1f486":[["\ud83d\udc86"],"\ue31e","\udbb8\udd97",["massage"],15,19],"1f487":[["\ud83d\udc87"],"\ue31f","\udbb8\udd98",["haircut"],15,20],"1f488":[["\ud83d\udc88"],"\ue320","\udbb8\udd99",["barber"],15,21],"1f489":[["\ud83d\udc89"],"\ue13b","\udbb9\udd09",["syringe"],15,22],"1f48a":[["\ud83d\udc8a"],"\ue30f","\udbb9\udd0a",["pill"],15,23],"1f48b":[["\ud83d\udc8b"],"\ue003","\udbba\udc23",["kiss"],15,24],"1f48c":[["\ud83d\udc8c"],"\ue103\ue328","\udbba\udc24",["love_letter"],15,25],"1f48d":[["\ud83d\udc8d"],"\ue034","\udbba\udc25",["ring"],15,26],"1f48e":[["\ud83d\udc8e"],"\ue035","\udbba\udc26",["gem"],15,27],"1f48f":[["\ud83d\udc8f"],"\ue111","\udbba\udc27",["couplekiss"],15,28],"1f490":[["\ud83d\udc90"],"\ue306","\udbba\udc28",["bouquet"],15,29],"1f491":[["\ud83d\udc91"],"\ue425","\udbba\udc29",["couple_with_heart"],16,0],"1f492":[["\ud83d\udc92"],"\ue43d","\udbba\udc2a",["wedding"],16,1],"1f493":[["\ud83d\udc93"],"\ue327","\udbba\udf0d",["heartbeat"],16,2],"1f494":[["\ud83d\udc94"],"\ue023","\udbba\udf0e",["broken_heart"],16,3,"</3"],"1f495":[["\ud83d\udc95"],"\ue327","\udbba\udf0f",["two_hearts"],16,4],"1f496":[["\ud83d\udc96"],"\ue327","\udbba\udf10",["sparkling_heart"],16,5],"1f497":[["\ud83d\udc97"],"\ue328","\udbba\udf11",["heartpulse"],16,6],"1f498":[["\ud83d\udc98"],"\ue329","\udbba\udf12",["cupid"],16,7],"1f499":[["\ud83d\udc99"],"\ue32a","\udbba\udf13",["blue_heart"],16,8,"<3"],"1f49a":[["\ud83d\udc9a"],"\ue32b","\udbba\udf14",["green_heart"],16,9,"<3"],"1f49b":[["\ud83d\udc9b"],"\ue32c","\udbba\udf15",["yellow_heart"],16,10,"<3"],"1f49c":[["\ud83d\udc9c"],"\ue32d","\udbba\udf16",["purple_heart"],16,11,"<3"],"1f49d":[["\ud83d\udc9d"],"\ue437","\udbba\udf17",["gift_heart"],16,12],"1f49e":[["\ud83d\udc9e"],"\ue327","\udbba\udf18",["revolving_hearts"],16,13],"1f49f":[["\ud83d\udc9f"],"\ue204","\udbba\udf19",["heart_decoration"],16,14],"1f4a0":[["\ud83d\udca0"],"","\udbba\udf55",["diamond_shape_with_a_dot_inside"],16,15],"1f4a1":[["\ud83d\udca1"],"\ue10f","\udbba\udf56",["bulb"],16,16],"1f4a2":[["\ud83d\udca2"],"\ue334","\udbba\udf57",["anger"],16,17],"1f4a3":[["\ud83d\udca3"],"\ue311","\udbba\udf58",["bomb"],16,18],"1f4a4":[["\ud83d\udca4"],"\ue13c","\udbba\udf59",["zzz"],16,19],"1f4a5":[["\ud83d\udca5"],"","\udbba\udf5a",["boom","collision"],16,20],"1f4a6":[["\ud83d\udca6"],"\ue331","\udbba\udf5b",["sweat_drops"],16,21],"1f4a7":[["\ud83d\udca7"],"\ue331","\udbba\udf5c",["droplet"],16,22],"1f4a8":[["\ud83d\udca8"],"\ue330","\udbba\udf5d",["dash"],16,23],"1f4a9":[["\ud83d\udca9"],"\ue05a","\udbb9\udcf4",["hankey","poop","shit"],16,24],"1f4aa":[["\ud83d\udcaa"],"\ue14c","\udbba\udf5e",["muscle"],16,25],"1f4ab":[["\ud83d\udcab"],"\ue407","\udbba\udf5f",["dizzy"],16,26],"1f4ac":[["\ud83d\udcac"],"","\udbb9\udd32",["speech_balloon"],16,27],"1f4ad":[["\ud83d\udcad"],"","",["thought_balloon"],16,28],"1f4ae":[["\ud83d\udcae"],"","\udbba\udf7a",["white_flower"],16,29],"1f4af":[["\ud83d\udcaf"],"","\udbba\udf7b",["100"],17,0],"1f4b0":[["\ud83d\udcb0"],"\ue12f","\udbb9\udcdd",["moneybag"],17,1],"1f4b1":[["\ud83d\udcb1"],"\ue149","\udbb9\udcde",["currency_exchange"],17,2],"1f4b2":[["\ud83d\udcb2"],"\ue12f","\udbb9\udce0",["heavy_dollar_sign"],17,3],"1f4b3":[["\ud83d\udcb3"],"","\udbb9\udce1",["credit_card"],17,4],"1f4b4":[["\ud83d\udcb4"],"","\udbb9\udce2",["yen"],17,5],"1f4b5":[["\ud83d\udcb5"],"\ue12f","\udbb9\udce3",["dollar"],17,6],"1f4b6":[["\ud83d\udcb6"],"","",["euro"],17,7],"1f4b7":[["\ud83d\udcb7"],"","",["pound"],17,8],"1f4b8":[["\ud83d\udcb8"],"","\udbb9\udce4",["money_with_wings"],17,9],"1f4b9":[["\ud83d\udcb9"],"\ue14a","\udbb9\udcdf",["chart"],17,10],"1f4ba":[["\ud83d\udcba"],"\ue11f","\udbb9\udd37",["seat"],17,11],"1f4bb":[["\ud83d\udcbb"],"\ue00c","\udbb9\udd38",["computer"],17,12],"1f4bc":[["\ud83d\udcbc"],"\ue11e","\udbb9\udd3b",["briefcase"],17,13],"1f4bd":[["\ud83d\udcbd"],"\ue316","\udbb9\udd3c",["minidisc"],17,14],"1f4be":[["\ud83d\udcbe"],"\ue316","\udbb9\udd3d",["floppy_disk"],17,15],"1f4bf":[["\ud83d\udcbf"],"\ue126","\udbba\udc1d",["cd"],17,16],"1f4c0":[["\ud83d\udcc0"],"\ue127","\udbba\udc1e",["dvd"],17,17],"1f4c1":[["\ud83d\udcc1"],"","\udbb9\udd43",["file_folder"],17,18],"1f4c2":[["\ud83d\udcc2"],"","\udbb9\udd44",["open_file_folder"],17,19],"1f4c3":[["\ud83d\udcc3"],"\ue301","\udbb9\udd40",["page_with_curl"],17,20],"1f4c4":[["\ud83d\udcc4"],"\ue301","\udbb9\udd41",["page_facing_up"],17,21],"1f4c5":[["\ud83d\udcc5"],"","\udbb9\udd42",["date"],17,22],"1f4c6":[["\ud83d\udcc6"],"","\udbb9\udd49",["calendar"],17,23],"1f4c7":[["\ud83d\udcc7"],"\ue148","\udbb9\udd4d",["card_index"],17,24],"1f4c8":[["\ud83d\udcc8"],"\ue14a","\udbb9\udd4b",["chart_with_upwards_trend"],17,25],"1f4c9":[["\ud83d\udcc9"],"","\udbb9\udd4c",["chart_with_downwards_trend"],17,26],"1f4ca":[["\ud83d\udcca"],"\ue14a","\udbb9\udd4a",["bar_chart"],17,27],"1f4cb":[["\ud83d\udccb"],"\ue301","\udbb9\udd48",["clipboard"],17,28],"1f4cc":[["\ud83d\udccc"],"","\udbb9\udd4e",["pushpin"],17,29],"1f4cd":[["\ud83d\udccd"],"","\udbb9\udd3f",["round_pushpin"],18,0],"1f4ce":[["\ud83d\udcce"],"","\udbb9\udd3a",["paperclip"],18,1],"1f4cf":[["\ud83d\udccf"],"","\udbb9\udd50",["straight_ruler"],18,2],"1f4d0":[["\ud83d\udcd0"],"","\udbb9\udd51",["triangular_ruler"],18,3],"1f4d1":[["\ud83d\udcd1"],"\ue301","\udbb9\udd52",["bookmark_tabs"],18,4],"1f4d2":[["\ud83d\udcd2"],"\ue148","\udbb9\udd4f",["ledger"],18,5],"1f4d3":[["\ud83d\udcd3"],"\ue148","\udbb9\udd45",["notebook"],18,6],"1f4d4":[["\ud83d\udcd4"],"\ue148","\udbb9\udd47",["notebook_with_decorative_cover"],18,7],"1f4d5":[["\ud83d\udcd5"],"\ue148","\udbb9\udd02",["closed_book"],18,8],"1f4d6":[["\ud83d\udcd6"],"\ue148","\udbb9\udd46",["book","open_book"],18,9],"1f4d7":[["\ud83d\udcd7"],"\ue148","\udbb9\udcff",["green_book"],18,10],"1f4d8":[["\ud83d\udcd8"],"\ue148","\udbb9\udd00",["blue_book"],18,11],"1f4d9":[["\ud83d\udcd9"],"\ue148","\udbb9\udd01",["orange_book"],18,12],"1f4da":[["\ud83d\udcda"],"\ue148","\udbb9\udd03",["books"],18,13],"1f4db":[["\ud83d\udcdb"],"","\udbb9\udd04",["name_badge"],18,14],"1f4dc":[["\ud83d\udcdc"],"","\udbb9\udcfd",["scroll"],18,15],"1f4dd":[["\ud83d\udcdd"],"\ue301","\udbb9\udd27",["memo","pencil"],18,16],"1f4de":[["\ud83d\udcde"],"\ue009","\udbb9\udd24",["telephone_receiver"],18,17],"1f4df":[["\ud83d\udcdf"],"","\udbb9\udd22",["pager"],18,18],"1f4e0":[["\ud83d\udce0"],"\ue00b","\udbb9\udd28",["fax"],18,19],"1f4e1":[["\ud83d\udce1"],"\ue14b","\udbb9\udd31",["satellite"],18,20],"1f4e2":[["\ud83d\udce2"],"\ue142","\udbb9\udd2f",["loudspeaker"],18,21],"1f4e3":[["\ud83d\udce3"],"\ue317","\udbb9\udd30",["mega"],18,22],"1f4e4":[["\ud83d\udce4"],"","\udbb9\udd33",["outbox_tray"],18,23],"1f4e5":[["\ud83d\udce5"],"","\udbb9\udd34",["inbox_tray"],18,24],"1f4e6":[["\ud83d\udce6"],"\ue112","\udbb9\udd35",["package"],18,25],"1f4e7":[["\ud83d\udce7"],"\ue103","\udbba\udf92",["e-mail"],18,26],"1f4e8":[["\ud83d\udce8"],"\ue103","\udbb9\udd2a",["incoming_envelope"],18,27],"1f4e9":[["\ud83d\udce9"],"\ue103","\udbb9\udd2b",["envelope_with_arrow"],18,28],"1f4ea":[["\ud83d\udcea"],"\ue101","\udbb9\udd2c",["mailbox_closed"],18,29],"1f4eb":[["\ud83d\udceb"],"\ue101","\udbb9\udd2d",["mailbox"],19,0],"1f4ec":[["\ud83d\udcec"],"","",["mailbox_with_mail"],19,1],"1f4ed":[["\ud83d\udced"],"","",["mailbox_with_no_mail"],19,2],"1f4ee":[["\ud83d\udcee"],"\ue102","\udbb9\udd2e",["postbox"],19,3],"1f4ef":[["\ud83d\udcef"],"","",["postal_horn"],19,4],"1f4f0":[["\ud83d\udcf0"],"","\udbba\udc22",["newspaper"],19,5],"1f4f1":[["\ud83d\udcf1"],"\ue00a","\udbb9\udd25",["iphone"],19,6],"1f4f2":[["\ud83d\udcf2"],"\ue104","\udbb9\udd26",["calling"],19,7],"1f4f3":[["\ud83d\udcf3"],"\ue250","\udbba\udc39",["vibration_mode"],19,8],"1f4f4":[["\ud83d\udcf4"],"\ue251","\udbba\udc3a",["mobile_phone_off"],19,9],"1f4f5":[["\ud83d\udcf5"],"","",["no_mobile_phones"],19,10],"1f4f6":[["\ud83d\udcf6"],"\ue20b","\udbba\udc38",["signal_strength"],19,11],"1f4f7":[["\ud83d\udcf7"],"\ue008","\udbb9\udcef",["camera"],19,12],"1f4f9":[["\ud83d\udcf9"],"\ue03d","\udbb9\udcf9",["video_camera"],19,13],"1f4fa":[["\ud83d\udcfa"],"\ue12a","\udbba\udc1c",["tv"],19,14],"1f4fb":[["\ud83d\udcfb"],"\ue128","\udbba\udc1f",["radio"],19,15],"1f4fc":[["\ud83d\udcfc"],"\ue129","\udbba\udc20",["vhs"],19,16],"1f500":[["\ud83d\udd00"],"","",["twisted_rightwards_arrows"],19,17],"1f501":[["\ud83d\udd01"],"","",["repeat"],19,18],"1f502":[["\ud83d\udd02"],"","",["repeat_one"],19,19],"1f503":[["\ud83d\udd03"],"","\udbba\udf91",["arrows_clockwise"],19,20],"1f504":[["\ud83d\udd04"],"","",["arrows_counterclockwise"],19,21],"1f505":[["\ud83d\udd05"],"","",["low_brightness"],19,22],"1f506":[["\ud83d\udd06"],"","",["high_brightness"],19,23],"1f507":[["\ud83d\udd07"],"","",["mute"],19,24],"1f508":[["\ud83d\udd08"],"","",["speaker"],19,25],"1f509":[["\ud83d\udd09"],"","",["sound"],19,26],"1f50a":[["\ud83d\udd0a"],"\ue141","\udbba\udc21",["loud_sound"],19,27],"1f50b":[["\ud83d\udd0b"],"","\udbb9\udcfc",["battery"],19,28],"1f50c":[["\ud83d\udd0c"],"","\udbb9\udcfe",["electric_plug"],19,29],"1f50d":[["\ud83d\udd0d"],"\ue114","\udbba\udf85",["mag"],20,0],"1f50e":[["\ud83d\udd0e"],"\ue114","\udbba\udf8d",["mag_right"],20,1],"1f50f":[["\ud83d\udd0f"],"\ue144","\udbba\udf90",["lock_with_ink_pen"],20,2],"1f510":[["\ud83d\udd10"],"\ue144","\udbba\udf8a",["closed_lock_with_key"],20,3],"1f511":[["\ud83d\udd11"],"\ue03f","\udbba\udf82",["key"],20,4],"1f512":[["\ud83d\udd12"],"\ue144","\udbba\udf86",["lock"],20,5],"1f513":[["\ud83d\udd13"],"\ue145","\udbba\udf87",["unlock"],20,6],"1f514":[["\ud83d\udd14"],"\ue325","\udbb9\udcf2",["bell"],20,7],"1f515":[["\ud83d\udd15"],"","",["no_bell"],20,8],"1f516":[["\ud83d\udd16"],"","\udbba\udf8f",["bookmark"],20,9],"1f517":[["\ud83d\udd17"],"","\udbba\udf4b",["link"],20,10],"1f518":[["\ud83d\udd18"],"","\udbba\udf8c",["radio_button"],20,11],"1f519":[["\ud83d\udd19"],"\ue235","\udbba\udf8e",["back"],20,12],"1f51a":[["\ud83d\udd1a"],"","\udbb8\udc1a",["end"],20,13],"1f51b":[["\ud83d\udd1b"],"","\udbb8\udc19",["on"],20,14],"1f51c":[["\ud83d\udd1c"],"","\udbb8\udc18",["soon"],20,15],"1f51d":[["\ud83d\udd1d"],"\ue24c","\udbba\udf42",["top"],20,16],"1f51e":[["\ud83d\udd1e"],"\ue207","\udbba\udf25",["underage"],20,17],"1f51f":[["\ud83d\udd1f"],"","\udbba\udc3b",["keycap_ten"],20,18],"1f520":[["\ud83d\udd20"],"","\udbba\udf7c",["capital_abcd"],20,19],"1f521":[["\ud83d\udd21"],"","\udbba\udf7d",["abcd"],20,20],"1f522":[["\ud83d\udd22"],"","\udbba\udf7e",["1234"],20,21],"1f523":[["\ud83d\udd23"],"","\udbba\udf7f",["symbols"],20,22],"1f524":[["\ud83d\udd24"],"","\udbba\udf80",["abc"],20,23],"1f525":[["\ud83d\udd25"],"\ue11d","\udbb9\udcf6",["fire"],20,24],"1f526":[["\ud83d\udd26"],"","\udbb9\udcfb",["flashlight"],20,25],"1f527":[["\ud83d\udd27"],"","\udbb9\udcc9",["wrench"],20,26],"1f528":[["\ud83d\udd28"],"\ue116","\udbb9\udcca",["hammer"],20,27],"1f529":[["\ud83d\udd29"],"","\udbb9\udccb",["nut_and_bolt"],20,28],"1f52a":[["\ud83d\udd2a"],"","\udbb9\udcfa",["hocho","knife"],20,29],"1f52b":[["\ud83d\udd2b"],"\ue113","\udbb9\udcf5",["gun"],21,0],"1f52c":[["\ud83d\udd2c"],"","",["microscope"],21,1],"1f52d":[["\ud83d\udd2d"],"","",["telescope"],21,2],"1f52e":[["\ud83d\udd2e"],"\ue23e","\udbb9\udcf7",["crystal_ball"],21,3],"1f52f":[["\ud83d\udd2f"],"\ue23e","\udbb9\udcf8",["six_pointed_star"],21,4],"1f530":[["\ud83d\udd30"],"\ue209","\udbb8\udc44",["beginner"],21,5],"1f531":[["\ud83d\udd31"],"\ue031","\udbb9\udcd2",["trident"],21,6],"1f532":[["\ud83d\udd32"],"\ue21a","\udbba\udf64",["black_square_button"],21,7],"1f533":[["\ud83d\udd33"],"\ue21b","\udbba\udf67",["white_square_button"],21,8],"1f534":[["\ud83d\udd34"],"\ue219","\udbba\udf63",["red_circle"],21,9],"1f535":[["\ud83d\udd35"],"\ue21a","\udbba\udf64",["large_blue_circle"],21,10],"1f536":[["\ud83d\udd36"],"\ue21b","\udbba\udf73",["large_orange_diamond"],21,11],"1f537":[["\ud83d\udd37"],"\ue21b","\udbba\udf74",["large_blue_diamond"],21,12],"1f538":[["\ud83d\udd38"],"\ue21b","\udbba\udf75",["small_orange_diamond"],21,13],"1f539":[["\ud83d\udd39"],"\ue21b","\udbba\udf76",["small_blue_diamond"],21,14],"1f53a":[["\ud83d\udd3a"],"","\udbba\udf78",["small_red_triangle"],21,15],"1f53b":[["\ud83d\udd3b"],"","\udbba\udf79",["small_red_triangle_down"],21,16],"1f53c":[["\ud83d\udd3c"],"","\udbba\udf01",["arrow_up_small"],21,17],"1f53d":[["\ud83d\udd3d"],"","\udbba\udf00",["arrow_down_small"],21,18],"1f550":[["\ud83d\udd50"],"\ue024","\udbb8\udc1e",["clock1"],21,19],"1f551":[["\ud83d\udd51"],"\ue025","\udbb8\udc1f",["clock2"],21,20],"1f552":[["\ud83d\udd52"],"\ue026","\udbb8\udc20",["clock3"],21,21],"1f553":[["\ud83d\udd53"],"\ue027","\udbb8\udc21",["clock4"],21,22],"1f554":[["\ud83d\udd54"],"\ue028","\udbb8\udc22",["clock5"],21,23],"1f555":[["\ud83d\udd55"],"\ue029","\udbb8\udc23",["clock6"],21,24],"1f556":[["\ud83d\udd56"],"\ue02a","\udbb8\udc24",["clock7"],21,25],"1f557":[["\ud83d\udd57"],"\ue02b","\udbb8\udc25",["clock8"],21,26],"1f558":[["\ud83d\udd58"],"\ue02c","\udbb8\udc26",["clock9"],21,27],"1f559":[["\ud83d\udd59"],"\ue02d","\udbb8\udc27",["clock10"],21,28],"1f55a":[["\ud83d\udd5a"],"\ue02e","\udbb8\udc28",["clock11"],21,29],"1f55b":[["\ud83d\udd5b"],"\ue02f","\udbb8\udc29",["clock12"],22,0],"1f55c":[["\ud83d\udd5c"],"","",["clock130"],22,1],"1f55d":[["\ud83d\udd5d"],"","",["clock230"],22,2],"1f55e":[["\ud83d\udd5e"],"","",["clock330"],22,3],"1f55f":[["\ud83d\udd5f"],"","",["clock430"],22,4],"1f560":[["\ud83d\udd60"],"","",["clock530"],22,5],"1f561":[["\ud83d\udd61"],"","",["clock630"],22,6],"1f562":[["\ud83d\udd62"],"","",["clock730"],22,7],"1f563":[["\ud83d\udd63"],"","",["clock830"],22,8],"1f564":[["\ud83d\udd64"],"","",["clock930"],22,9],"1f565":[["\ud83d\udd65"],"","",["clock1030"],22,10],"1f566":[["\ud83d\udd66"],"","",["clock1130"],22,11],"1f567":[["\ud83d\udd67"],"","",["clock1230"],22,12],"1f5fb":[["\ud83d\uddfb"],"\ue03b","\udbb9\udcc3",["mount_fuji"],22,13],"1f5fc":[["\ud83d\uddfc"],"\ue509","\udbb9\udcc4",["tokyo_tower"],22,14],"1f5fd":[["\ud83d\uddfd"],"\ue51d","\udbb9\udcc6",["statue_of_liberty"],22,15],"1f5fe":[["\ud83d\uddfe"],"","\udbb9\udcc7",["japan"],22,16],"1f5ff":[["\ud83d\uddff"],"","\udbb9\udcc8",["moyai"],22,17],"1f600":[["\ud83d\ude00"],"","",["grinning"],22,18,":D"],"1f601":[["\ud83d\ude01"],"\ue404","\udbb8\udf33",["grin"],22,19],"1f602":[["\ud83d\ude02"],"\ue412","\udbb8\udf34",["joy"],22,20],"1f603":[["\ud83d\ude03"],"\ue057","\udbb8\udf30",["smiley"],22,21,":)"],"1f604":[["\ud83d\ude04"],"\ue415","\udbb8\udf38",["smile"],22,22,":)"],"1f605":[["\ud83d\ude05"],"\ue415\ue331","\udbb8\udf31",["sweat_smile"],22,23],"1f606":[["\ud83d\ude06"],"\ue40a","\udbb8\udf32",["satisfied"],22,24],"1f607":[["\ud83d\ude07"],"","",["innocent"],22,25],"1f608":[["\ud83d\ude08"],"","",["smiling_imp"],22,26],"1f609":[["\ud83d\ude09"],"\ue405","\udbb8\udf47",["wink"],22,27,";)"],"1f60a":[["\ud83d\ude0a"],"\ue056","\udbb8\udf35",["blush"],22,28],"1f60b":[["\ud83d\ude0b"],"\ue056","\udbb8\udf2b",["yum"],22,29],"1f60c":[["\ud83d\ude0c"],"\ue40a","\udbb8\udf3e",["relieved"],23,0],"1f60d":[["\ud83d\ude0d"],"\ue106","\udbb8\udf27",["heart_eyes"],23,1],"1f60e":[["\ud83d\ude0e"],"","",["sunglasses"],23,2],"1f60f":[["\ud83d\ude0f"],"\ue402","\udbb8\udf43",["smirk"],23,3],"1f610":[["\ud83d\ude10"],"","",["neutral_face"],23,4],"1f611":[["\ud83d\ude11"],"","",["expressionless"],23,5],"1f612":[["\ud83d\ude12"],"\ue40e","\udbb8\udf26",["unamused"],23,6],"1f613":[["\ud83d\ude13"],"\ue108","\udbb8\udf44",["sweat"],23,7],"1f614":[["\ud83d\ude14"],"\ue403","\udbb8\udf40",["pensive"],23,8],"1f615":[["\ud83d\ude15"],"","",["confused"],23,9],"1f616":[["\ud83d\ude16"],"\ue407","\udbb8\udf3f",["confounded"],23,10],"1f617":[["\ud83d\ude17"],"","",["kissing"],23,11],"1f618":[["\ud83d\ude18"],"\ue418","\udbb8\udf2c",["kissing_heart"],23,12],"1f619":[["\ud83d\ude19"],"","",["kissing_smiling_eyes"],23,13],"1f61a":[["\ud83d\ude1a"],"\ue417","\udbb8\udf2d",["kissing_closed_eyes"],23,14],"1f61b":[["\ud83d\ude1b"],"","",["stuck_out_tongue"],23,15,":p"],"1f61c":[["\ud83d\ude1c"],"\ue105","\udbb8\udf29",["stuck_out_tongue_winking_eye"],23,16,";p"],"1f61d":[["\ud83d\ude1d"],"\ue409","\udbb8\udf2a",["stuck_out_tongue_closed_eyes"],23,17],"1f61e":[["\ud83d\ude1e"],"\ue058","\udbb8\udf23",["disappointed"],23,18,":("],"1f61f":[["\ud83d\ude1f"],"","",["worried"],23,19],"1f620":[["\ud83d\ude20"],"\ue059","\udbb8\udf20",["angry"],23,20],"1f621":[["\ud83d\ude21"],"\ue416","\udbb8\udf3d",["rage"],23,21],"1f622":[["\ud83d\ude22"],"\ue413","\udbb8\udf39",["cry"],23,22,":'("],"1f623":[["\ud83d\ude23"],"\ue406","\udbb8\udf3c",["persevere"],23,23],"1f624":[["\ud83d\ude24"],"\ue404","\udbb8\udf28",["triumph"],23,24],"1f625":[["\ud83d\ude25"],"\ue401","\udbb8\udf45",["disappointed_relieved"],23,25],"1f626":[["\ud83d\ude26"],"","",["frowning"],23,26],"1f627":[["\ud83d\ude27"],"","",["anguished"],23,27],"1f628":[["\ud83d\ude28"],"\ue40b","\udbb8\udf3b",["fearful"],23,28],"1f629":[["\ud83d\ude29"],"\ue403","\udbb8\udf21",["weary"],23,29],"1f62a":[["\ud83d\ude2a"],"\ue408","\udbb8\udf42",["sleepy"],24,0],"1f62b":[["\ud83d\ude2b"],"\ue406","\udbb8\udf46",["tired_face"],24,1],"1f62c":[["\ud83d\ude2c"],"","",["grimacing"],24,2],"1f62d":[["\ud83d\ude2d"],"\ue411","\udbb8\udf3a",["sob"],24,3,":'("],"1f62e":[["\ud83d\ude2e"],"","",["open_mouth"],24,4],"1f62f":[["\ud83d\ude2f"],"","",["hushed"],24,5],"1f630":[["\ud83d\ude30"],"\ue40f","\udbb8\udf25",["cold_sweat"],24,6],"1f631":[["\ud83d\ude31"],"\ue107","\udbb8\udf41",["scream"],24,7],"1f632":[["\ud83d\ude32"],"\ue410","\udbb8\udf22",["astonished"],24,8],"1f633":[["\ud83d\ude33"],"\ue40d","\udbb8\udf2f",["flushed"],24,9],"1f634":[["\ud83d\ude34"],"","",["sleeping"],24,10],"1f635":[["\ud83d\ude35"],"\ue406","\udbb8\udf24",["dizzy_face"],24,11],"1f636":[["\ud83d\ude36"],"","",["no_mouth"],24,12],"1f637":[["\ud83d\ude37"],"\ue40c","\udbb8\udf2e",["mask"],24,13],"1f638":[["\ud83d\ude38"],"\ue404","\udbb8\udf49",["smile_cat"],24,14],"1f639":[["\ud83d\ude39"],"\ue412","\udbb8\udf4a",["joy_cat"],24,15],"1f63a":[["\ud83d\ude3a"],"\ue057","\udbb8\udf48",["smiley_cat"],24,16],"1f63b":[["\ud83d\ude3b"],"\ue106","\udbb8\udf4c",["heart_eyes_cat"],24,17],"1f63c":[["\ud83d\ude3c"],"\ue404","\udbb8\udf4f",["smirk_cat"],24,18],"1f63d":[["\ud83d\ude3d"],"\ue418","\udbb8\udf4b",["kissing_cat"],24,19],"1f63e":[["\ud83d\ude3e"],"\ue416","\udbb8\udf4e",["pouting_cat"],24,20],"1f63f":[["\ud83d\ude3f"],"\ue413","\udbb8\udf4d",["crying_cat_face"],24,21],"1f640":[["\ud83d\ude40"],"\ue403","\udbb8\udf50",["scream_cat"],24,22],"1f645":[["\ud83d\ude45"],"\ue423","\udbb8\udf51",["no_good"],24,23],"1f646":[["\ud83d\ude46"],"\ue424","\udbb8\udf52",["ok_woman"],24,24],"1f647":[["\ud83d\ude47"],"\ue426","\udbb8\udf53",["bow"],24,25],"1f648":[["\ud83d\ude48"],"","\udbb8\udf54",["see_no_evil"],24,26],"1f649":[["\ud83d\ude49"],"","\udbb8\udf56",["hear_no_evil"],24,27],"1f64a":[["\ud83d\ude4a"],"","\udbb8\udf55",["speak_no_evil"],24,28],"1f64b":[["\ud83d\ude4b"],"\ue012","\udbb8\udf57",["raising_hand"],24,29],"1f64c":[["\ud83d\ude4c"],"\ue427","\udbb8\udf58",["raised_hands"],25,0],"1f64d":[["\ud83d\ude4d"],"\ue403","\udbb8\udf59",["person_frowning"],25,1],"1f64e":[["\ud83d\ude4e"],"\ue416","\udbb8\udf5a",["person_with_pouting_face"],25,2],"1f64f":[["\ud83d\ude4f"],"\ue41d","\udbb8\udf5b",["pray"],25,3],"1f680":[["\ud83d\ude80"],"\ue10d","\udbb9\udfed",["rocket"],25,4],"1f681":[["\ud83d\ude81"],"","",["helicopter"],25,5],"1f682":[["\ud83d\ude82"],"","",["steam_locomotive"],25,6],"1f683":[["\ud83d\ude83"],"\ue01e","\udbb9\udfdf",["railway_car"],25,7],"1f684":[["\ud83d\ude84"],"\ue435","\udbb9\udfe2",["bullettrain_side"],25,8],"1f685":[["\ud83d\ude85"],"\ue01f","\udbb9\udfe3",["bullettrain_front"],25,9],"1f686":[["\ud83d\ude86"],"","",["train2"],25,10],"1f687":[["\ud83d\ude87"],"\ue434","\udbb9\udfe0",["metro"],25,11],"1f688":[["\ud83d\ude88"],"","",["light_rail"],25,12],"1f689":[["\ud83d\ude89"],"\ue039","\udbb9\udfec",["station"],25,13],"1f68a":[["\ud83d\ude8a"],"","",["tram"],25,14],"1f68b":[["\ud83d\ude8b"],"","",["train"],25,15],"1f68c":[["\ud83d\ude8c"],"\ue159","\udbb9\udfe6",["bus"],25,16],"1f68d":[["\ud83d\ude8d"],"","",["oncoming_bus"],25,17],"1f68e":[["\ud83d\ude8e"],"","",["trolleybus"],25,18],"1f68f":[["\ud83d\ude8f"],"\ue150","\udbb9\udfe7",["busstop"],25,19],"1f690":[["\ud83d\ude90"],"","",["minibus"],25,20],"1f691":[["\ud83d\ude91"],"\ue431","\udbb9\udff3",["ambulance"],25,21],"1f692":[["\ud83d\ude92"],"\ue430","\udbb9\udff2",["fire_engine"],25,22],"1f693":[["\ud83d\ude93"],"\ue432","\udbb9\udff4",["police_car"],25,23],"1f694":[["\ud83d\ude94"],"","",["oncoming_police_car"],25,24],"1f695":[["\ud83d\ude95"],"\ue15a","\udbb9\udfef",["taxi"],25,25],"1f696":[["\ud83d\ude96"],"","",["oncoming_taxi"],25,26],"1f697":[["\ud83d\ude97"],"\ue01b","\udbb9\udfe4",["car","red_car"],25,27],"1f698":[["\ud83d\ude98"],"","",["oncoming_automobile"],25,28],"1f699":[["\ud83d\ude99"],"\ue42e","\udbb9\udfe5",["blue_car"],25,29],"1f69a":[["\ud83d\ude9a"],"\ue42f","\udbb9\udff1",["truck"],26,0],"1f69b":[["\ud83d\ude9b"],"","",["articulated_lorry"],26,1],"1f69c":[["\ud83d\ude9c"],"","",["tractor"],26,2],"1f69d":[["\ud83d\ude9d"],"","",["monorail"],26,3],"1f69e":[["\ud83d\ude9e"],"","",["mountain_railway"],26,4],"1f69f":[["\ud83d\ude9f"],"","",["suspension_railway"],26,5],"1f6a0":[["\ud83d\udea0"],"","",["mountain_cableway"],26,6],"1f6a1":[["\ud83d\udea1"],"","",["aerial_tramway"],26,7],"1f6a2":[["\ud83d\udea2"],"\ue202","\udbb9\udfe8",["ship"],26,8],"1f6a3":[["\ud83d\udea3"],"","",["rowboat"],26,9],"1f6a4":[["\ud83d\udea4"],"\ue135","\udbb9\udfee",["speedboat"],26,10],"1f6a5":[["\ud83d\udea5"],"\ue14e","\udbb9\udff7",["traffic_light"],26,11],"1f6a6":[["\ud83d\udea6"],"","",["vertical_traffic_light"],26,12],"1f6a7":[["\ud83d\udea7"],"\ue137","\udbb9\udff8",["construction"],26,13],"1f6a8":[["\ud83d\udea8"],"\ue432","\udbb9\udff9",["rotating_light"],26,14],"1f6a9":[["\ud83d\udea9"],"","\udbba\udf22",["triangular_flag_on_post"],26,15],"1f6aa":[["\ud83d\udeaa"],"","\udbb9\udcf3",["door"],26,16],"1f6ab":[["\ud83d\udeab"],"","\udbba\udf48",["no_entry_sign"],26,17],"1f6ac":[["\ud83d\udeac"],"\ue30e","\udbba\udf1e",["smoking"],26,18],
"1f6ad":[["\ud83d\udead"],"\ue208","\udbba\udf1f",["no_smoking"],26,19],"1f6ae":[["\ud83d\udeae"],"","",["put_litter_in_its_place"],26,20],"1f6af":[["\ud83d\udeaf"],"","",["do_not_litter"],26,21],"1f6b0":[["\ud83d\udeb0"],"","",["potable_water"],26,22],"1f6b1":[["\ud83d\udeb1"],"","",["non-potable_water"],26,23],"1f6b2":[["\ud83d\udeb2"],"\ue136","\udbb9\udfeb",["bike"],26,24],"1f6b3":[["\ud83d\udeb3"],"","",["no_bicycles"],26,25],"1f6b4":[["\ud83d\udeb4"],"","",["bicyclist"],26,26],"1f6b5":[["\ud83d\udeb5"],"","",["mountain_bicyclist"],26,27],"1f6b6":[["\ud83d\udeb6"],"\ue201","\udbb9\udff0",["walking"],26,28],"1f6b7":[["\ud83d\udeb7"],"","",["no_pedestrians"],26,29],"1f6b8":[["\ud83d\udeb8"],"","",["children_crossing"],27,0],"1f6b9":[["\ud83d\udeb9"],"\ue138","\udbba\udf33",["mens"],27,1],"1f6ba":[["\ud83d\udeba"],"\ue139","\udbba\udf34",["womens"],27,2],"1f6bb":[["\ud83d\udebb"],"\ue151","\udbb9\udd06",["restroom"],27,3],"1f6bc":[["\ud83d\udebc"],"\ue13a","\udbba\udf35",["baby_symbol"],27,4],"1f6bd":[["\ud83d\udebd"],"\ue140","\udbb9\udd07",["toilet"],27,5],"1f6be":[["\ud83d\udebe"],"\ue309","\udbb9\udd08",["wc"],27,6],"1f6bf":[["\ud83d\udebf"],"","",["shower"],27,7],"1f6c0":[["\ud83d\udec0"],"\ue13f","\udbb9\udd05",["bath"],27,8],"1f6c1":[["\ud83d\udec1"],"","",["bathtub"],27,9],"1f6c2":[["\ud83d\udec2"],"","",["passport_control"],27,10],"1f6c3":[["\ud83d\udec3"],"","",["customs"],27,11],"1f6c4":[["\ud83d\udec4"],"","",["baggage_claim"],27,12],"1f6c5":[["\ud83d\udec5"],"","",["left_luggage"],27,13],"0023-20e3":[["#\ufe0f\u20e3","#\u20e3"],"\ue210","\udbba\udc2c",["hash"],27,14],"0030-20e3":[["0\ufe0f\u20e3","0\u20e3"],"\ue225","\udbba\udc37",["zero"],27,15],"0031-20e3":[["1\ufe0f\u20e3","1\u20e3"],"\ue21c","\udbba\udc2e",["one"],27,16],"0032-20e3":[["2\ufe0f\u20e3","2\u20e3"],"\ue21d","\udbba\udc2f",["two"],27,17],"0033-20e3":[["3\ufe0f\u20e3","3\u20e3"],"\ue21e","\udbba\udc30",["three"],27,18],"0034-20e3":[["4\ufe0f\u20e3","4\u20e3"],"\ue21f","\udbba\udc31",["four"],27,19],"0035-20e3":[["5\ufe0f\u20e3","5\u20e3"],"\ue220","\udbba\udc32",["five"],27,20],"0036-20e3":[["6\ufe0f\u20e3","6\u20e3"],"\ue221","\udbba\udc33",["six"],27,21],"0037-20e3":[["7\ufe0f\u20e3","7\u20e3"],"\ue222","\udbba\udc34",["seven"],27,22],"0038-20e3":[["8\ufe0f\u20e3","8\u20e3"],"\ue223","\udbba\udc35",["eight"],27,23],"0039-20e3":[["9\ufe0f\u20e3","9\u20e3"],"\ue224","\udbba\udc36",["nine"],27,24],"1f1e8-1f1f3":[["\ud83c\udde8\ud83c\uddf3"],"\ue513","\udbb9\udced",["cn"],27,25],"1f1e9-1f1ea":[["\ud83c\udde9\ud83c\uddea"],"\ue50e","\udbb9\udce8",["de"],27,26],"1f1ea-1f1f8":[["\ud83c\uddea\ud83c\uddf8"],"\ue511","\udbb9\udceb",["es"],27,27],"1f1eb-1f1f7":[["\ud83c\uddeb\ud83c\uddf7"],"\ue50d","\udbb9\udce7",["fr"],27,28],"1f1ec-1f1e7":[["\ud83c\uddec\ud83c\udde7"],"\ue510","\udbb9\udcea",["gb","uk"],27,29],"1f1ee-1f1f9":[["\ud83c\uddee\ud83c\uddf9"],"\ue50f","\udbb9\udce9",["it"],28,0],"1f1ef-1f1f5":[["\ud83c\uddef\ud83c\uddf5"],"\ue50b","\udbb9\udce5",["jp"],28,1],"1f1f0-1f1f7":[["\ud83c\uddf0\ud83c\uddf7"],"\ue514","\udbb9\udcee",["kr"],28,2],"1f1f7-1f1fa":[["\ud83c\uddf7\ud83c\uddfa"],"\ue512","\udbb9\udcec",["ru"],28,3],"1f1fa-1f1f8":[["\ud83c\uddfa\ud83c\uddf8"],"\ue50c","\udbb9\udce6",["us"],28,4]},Config.smileys={"<3":"heart","</3":"broken_heart",":)":"blush","(:":"blush",":-)":"blush","C:":"smile","c:":"smile",":D":"smile",":-D":"smile",";)":"wink",";-)":"wink","):":"disappointed",":(":"disappointed",":-(":"disappointed",":'(":"cry","=)":"smiley","=-)":"smiley",":*":"kiss",":-*":"kiss",":>":"laughing",":->":"laughing","8)":"sunglasses",":\\\\":"confused",":-\\\\":"confused",":/":"confused",":-/":"confused",":|":"neutral_face",":-|":"neutral_face",":o":"open_mouth",":-o":"open_mouth",">:(":"angry",">:-(":"angry",":p":"stuck_out_tongue",":-p":"stuck_out_tongue",":P":"stuck_out_tongue",":-P":"stuck_out_tongue",":b":"stuck_out_tongue",":-b":"stuck_out_tongue",";p":"stuck_out_tongue_winking_eye",";-p":"stuck_out_tongue_winking_eye",";b":"stuck_out_tongue_winking_eye",";-b":"stuck_out_tongue_winking_eye",";P":"stuck_out_tongue_winking_eye",";-P":"stuck_out_tongue_winking_eye",":o)":"monkey_face","D:":"anguished"},Config.inits={},Config.map={},Config.mapcolon={};var a=[];Config.reversemap={},Config.init_emoticons=function(){if(!Config.inits.emoticons){Config.init_colons(),Config.inits.emoticons=1;var a=[];Config.map.emoticons={};for(var b in Config.emoticons_data){var c=b.replace(/\&/g,"&amp;").replace(/\</g,"&lt;").replace(/\>/g,"&gt;");Config.map.colons[emoji.emoticons_data[b]]&&(Config.map.emoticons[c]=Config.map.colons[Config.emoticons_data[b]],a.push(Config.escape_rx(c)))}Config.rx_emoticons=new RegExp("(^|\\s)("+a.join("|")+")(?=$|[\\s|\\?\\.,!])","g")}},Config.init_colons=function(){if(!Config.inits.colons){Config.inits.colons=1,Config.rx_colons=new RegExp(":[^\\s:]+:","g"),Config.map.colons={};for(var a in Config.data)for(var b=0;b<Config.data[a][3].length;b++)Config.map.colons[emoji.data[a][3][b]]=a}},Config.init_unified=function(){Config.inits.unified||(Config.inits.unified=1,buildMap())},Config.escape_rx=function(a){return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},function(a){function b(a){h=a}function c(){i=!0}function d(){return i?(i=!1,""):h}function e(){var a,b,c,e=Array.prototype.slice.call(arguments),f=e.pop(),g=[],h=1==e.length,i=!0,m=d();for(b=0;b<e.length;b++)if(c=e[b]=m+e[b],"xt_"!=c.substr(0,3)&&void 0!==j[c])g.push(j[c]);else if(l){try{a=localStorage.getItem(c)}catch(n){l=!1}try{a=void 0===a||null===a?!1:JSON.parse(a)}catch(n){a=!1}g.push(j[c]=a)}else k?i=!1:g.push(j[c]=!1);return i?f(h?g[0]:g):void chrome.storage.local.get(e,function(a){var d;for(g=[],b=0;b<e.length;b++)c=e[b],d=a[c],d=void 0===d||null===d?!1:JSON.parse(d),g.push(j[c]=d);f(h?g[0]:g)})}function f(a,b){var c,e,f={},g=d();for(c in a)if(a.hasOwnProperty(c))if(e=a[c],c=g+c,j[c]=e,e=JSON.stringify(e),l)try{localStorage.setItem(c,e)}catch(h){l=!1}else f[c]=e;return l||!k?void(b&&b()):void chrome.storage.local.set(f,b)}function g(){var a,b,c,e=Array.prototype.slice.call(arguments),f=d();for("function"==typeof e[e.length-1]&&(c=e.pop()),a=0;a<e.length;a++)if(b=e[a]=f+e[a],delete j[b],l)try{localStorage.removeItem(b)}catch(g){l=!1}k?chrome.storage.local.remove(e,c):c&&c()}var h="",i=!1,j={},k=!!(a.chrome&&chrome.storage&&chrome.storage.local),l=!k&&!!a.localStorage;a.ConfigStorage={prefix:b,noPrefix:c,get:e,set:f,remove:g}}(this),function(a,b,c){var d=1,e=3,f=["p","div","pre","form"],g=27,h=9;a.emojiarea={assetsPath:"",iconSize:25,icons:{}};var i=":joy:,:kissing_heart:,:heart:,:heart_eyes:,:blush:,:grin:,:+1:,:relaxed:,:pensive:,:smile:,:sob:,:kiss:,:unamused:,:flushed:,:stuck_out_tongue_winking_eye:,:see_no_evil:,:wink:,:smiley:,:cry:,:stuck_out_tongue_closed_eyes:,:scream:,:rage:,:smirk:,:disappointed:,:sweat_smile:,:kissing_closed_eyes:,:speak_no_evil:,:relieved:,:grinning:,:yum:,:laughing:,:ok_hand:,:neutral_face:,:confused:".split(",");a.fn.emojiarea=function(b){return b=a.extend({},b),this.each(function(){var d=a(this);if("contentEditable"in c.body&&b.wysiwyg!==!1){var e=getGuid();new m(d,e,a.extend({},b))}else{var e=getGuid();new l(d,e,b)}d.attr({"data-emojiable":"converted","data-id":e,"data-type":"original-input"})})};var j={};j.restoreSelection=function(){return b.getSelection?function(a){var c=b.getSelection();c.removeAllRanges();for(var d=0,e=a.length;e>d;++d)c.addRange(a[d])}:c.selection&&c.selection.createRange?function(a){a&&a.select()}:void 0}(),j.saveSelection=function(){return b.getSelection?function(){var a=b.getSelection(),c=[];if(a.rangeCount)for(var d=0,e=a.rangeCount;e>d;++d)c.push(a.getRangeAt(d));return c}:c.selection&&c.selection.createRange?function(){var a=c.selection;return"none"!==a.type.toLowerCase()?a.createRange():null}:void 0}(),j.replaceSelection=function(){return b.getSelection?function(a){var d,e=b.getSelection(),f="string"==typeof a?c.createTextNode(a):a;e.getRangeAt&&e.rangeCount&&(d=e.getRangeAt(0),d.deleteContents(),d.insertNode(f),d.setStart(f,0),b.setTimeout(function(){d=c.createRange(),d.setStartAfter(f),d.collapse(!0),e.removeAllRanges(),e.addRange(d)},0))}:c.selection&&c.selection.createRange?function(a){var b=c.selection.createRange();"string"==typeof a?b.text=a:b.pasteHTML(a.outerHTML)}:void 0}(),j.insertAtCursor=function(a,b){a=" "+a;var d,e,f,g=b.value;"undefined"!=typeof b.selectionStart&&"undefined"!=typeof b.selectionEnd?(e=b.selectionStart,d=b.selectionEnd,b.value=g.substring(0,e)+a+g.substring(b.selectionEnd),b.selectionStart=b.selectionEnd=e+a.length):"undefined"!=typeof c.selection&&"undefined"!=typeof c.selection.createRange&&(b.focus(),f=c.selection.createRange(),f.text=a,f.select())},j.extend=function(a,b){if("undefined"!=typeof a&&a||(a={}),"object"==typeof b)for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a},j.escapeRegex=function(a){return(a+"").replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")},j.htmlEntities=function(a){return String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},j.emojiInserted=function(a,b){ConfigStorage.get("emojis_recent",function(b){b=b||i||[];var c=b.indexOf(a);return c?(-1!=c&&b.splice(c,1),b.unshift(a),b.length>42&&(b=b.slice(42)),void ConfigStorage.set({emojis_recent:b})):!1})};var k=function(){};k.prototype.setup=function(){var a=this;this.$editor.on("focus",function(){a.hasFocus=!0}),this.$editor.on("blur",function(){a.hasFocus=!1}),a.emojiMenu=new n(a),this.setupButton()},k.prototype.setupButton=function(){var b=this,c=a("[data-id="+this.id+"][data-type=picker]");c.on("click",function(a){b.emojiMenu.show(b)}),this.$button=c,this.$dontHideOnClick="emoji-picker"},k.createIcon=function(b,c){var d=b[0],e="/assets/emoji_picker/emoji_spritesheet_0.png",f="/assets/emoji_picker/emoji_spritesheet_1.png",g="/assets/emoji_picker/emoji_spritesheet_2.png",h="/assets/emoji_picker/emoji_spritesheet_3.png",i="/assets/emoji_picker/emoji_spritesheet_4.png",k=b[1],l=b[2],m=b[3],n="/emoji_picker/emoji_spritesheet_!.png",o="/assets/emoji_picker/blank.gif",p=c&&Config.Mobile?26:a.emojiarea.iconSize,q=-(p*l),r=-(p*k),s=Config.EmojiCategorySpritesheetDimens[d][1]*p,t=Config.EmojiCategorySpritesheetDimens[d][0]*p,u="display:inline-block;",w=(n.replace("!",d),new RegExp("emoji_spritesheet_"+d)),x=[e,f,g,h,i],y=null,z="";return $.each(x,function(a,b){return y=b.match(w),null!=y?z=y.input:void 0}),u+="width:"+p+"px;",u+="height:"+p+"px;",u+="background:url('"+z+"') "+q+"px "+r+"px no-repeat;",u+="background-size:"+s+"px "+t+"px;",'<img src="'+o+'" class="img" style="'+u+'" alt="'+j.htmlEntities(m)+'">'},a.emojiarea.createIcon=k.createIcon;var l=function(a,b,c){this.options=c,this.$textarea=a,this.$editor=a,this.id=b,this.setup()};l.prototype.insert=function(b){a.emojiarea.icons.hasOwnProperty(b)&&(j.insertAtCursor(b,this.$textarea[0]),j.emojiInserted(b,this.menu),this.$textarea.trigger("change"))},l.prototype.val=function(){return"\n"==this.$textarea?"":this.$textarea.val()},j.extend(l.prototype,k.prototype);var m=function(b,d,e){var f=this;this.options=e||{},"unicode"===a(b).attr("data-emoji-input")?this.options.inputMethod="unicode":this.options.inputMethod="image",this.id=d,this.$textarea=b,this.emojiPopup=e.emojiPopup,this.$editor=a("<div>").addClass("emoji-wysiwyg-editor").addClass(a(b)[0].className),this.$editor.data("self",this),b.attr("maxlength")&&this.$editor.attr("maxlength",b.attr("maxlength"));var g=this.emojiPopup.unicodeToImage(b.val());this.$editor.html(g),this.$editor.attr({"data-id":d,"data-type":"input",placeholder:b.attr("placeholder"),contenteditable:"true"});var h="blur change";this.options.norealTime||(h+=" keyup"),this.$editor.on(h,function(a){return f.onChange.apply(f,[a])}),this.$editor.on("mousedown focus",function(){c.execCommand("enableObjectResizing",!1,!1)}),this.$editor.on("blur",function(){c.execCommand("enableObjectResizing",!0,!0)});var i=this.$editor;this.$editor.on("change keydown keyup resize scroll",function(a){8!=a.which&&i.text().length+i.find("img").length>=i.attr("maxlength")&&a.preventDefault(),f.updateBodyPadding(i)}),b.hide().after(this.$editor),this.$textarea.after("<i class='emoji-picker-icon emoji-picker "+this.options.popupButtonClasses+"' data-id='"+d+"' data-type='picker'></i>"),this.setup(),a(c.body).on("mousedown",function(){f.hasFocus&&(f.selection=j.saveSelection())})};m.prototype.updateBodyPadding=function(b){var c=a("[data-id="+this.id+"][data-type=picker]");a(b).hasScrollbar()?(c.hasClass("parent-has-scroll")||c.addClass("parent-has-scroll"),a(b).hasClass("parent-has-scroll")||a(b).addClass("parent-has-scroll")):(c.hasClass("parent-has-scroll")&&c.removeClass("parent-has-scroll"),a(b).hasClass("parent-has-scroll")&&a(b).removeClass("parent-has-scroll"))},m.prototype.onChange=function(a){this.$textarea.val(this.val()).trigger("change")},m.prototype.insert=function(b){var c="";if("unicode"==this.options.inputMethod)c=this.emojiPopup.colonToUnicode(b);else{var d=a(k.createIcon(a.emojiarea.icons[b]));d[0].attachEvent&&d[0].attachEvent("onresizestart",function(a){a.returnValue=!1},!1),c=d[0]}this.$editor.trigger("focus"),this.selection&&j.restoreSelection(this.selection);try{j.replaceSelection(c)}catch(e){}j.emojiInserted(b,this.menu),this.onChange()},m.prototype.val=function(){for(var a=[],b=[],c=this.emojiPopup,g=function(){a.push(b.join("")),b=[]},h=function(a){if(a.nodeType===e)b.push(a.nodeValue);else if(a.nodeType===d){var c=a.tagName.toLowerCase(),i=-1!==f.indexOf(c);if(i&&b.length&&g(),"img"===c){var j=a.getAttribute("alt")||"";return void(j&&b.push(j))}"br"===c&&g();for(var k=a.childNodes,l=0;l<k.length;l++)h(k[l]);i&&b.length&&g()}},i=this.$editor[0].childNodes,j=0;j<i.length;j++)h(i[j]);b.length&&g();var k=a.join("\n");return c.colonToUnicode(k)},j.extend(m.prototype,k.prototype),jQuery.fn.hasScrollbar=function(){var a=this.get(0).scrollHeight;return this.outerHeight()<a?!0:!1};var n=function(d){var e=this;e.id=d.id;var f=a(c.body),i=a(b);this.visible=!1,this.emojiarea=d,n.menuZIndex=5e3,this.$menu=a("<div>"),this.$menu.addClass("emoji-menu"),this.$menu.attr("data-id",e.id),this.$menu.attr("data-type","menu"),this.$menu.hide(),this.$itemsTailWrap=a('<div class="emoji-items-wrap1"></div>').appendTo(this.$menu),this.$categoryTabs=a('<table class="emoji-menu-tabs"><tr><td><a class="emoji-menu-tab icon-recent" ></a></td><td><a class="emoji-menu-tab icon-smile" ></a></td><td><a class="emoji-menu-tab icon-flower"></a></td><td><a class="emoji-menu-tab icon-bell"></a></td><td><a class="emoji-menu-tab icon-car"></a></td><td><a class="emoji-menu-tab icon-grid"></a></td></tr></table>').appendTo(this.$itemsTailWrap),this.$itemsWrap=a('<div class="emoji-items-wrap nano mobile_scrollable_wrap"></div>').appendTo(this.$itemsTailWrap),this.$items=a('<div class="emoji-items nano-content">').appendTo(this.$itemsWrap),f.append(this.$menu),Config.Mobile||this.$itemsWrap.nanoScroller({preventPageScrolling:!0,tabIndex:-1}),f.on("keydown",function(a){(a.keyCode===g||a.keyCode===h)&&e.hide()}),f.on("message_send",function(a){e.hide()}),f.on("mouseup",function(c){c=c.originalEvent||c;var d=c.originalTarget||c.target||b;if(!a(d).hasClass(e.emojiarea.$dontHideOnClick)){for(;d&&d!=b;)if(d=d.parentNode,d==e.$menu[0]||e.emojiarea&&d==e.emojiarea.$button[0])return;e.hide()}}),i.on("resize",function(){e.visible&&e.reposition()}),this.$menu.on("mouseup","a",function(a){return a.stopPropagation(),!1}),this.$menu.on("click","a",function(c){if(e.emojiarea.updateBodyPadding(e.emojiarea.$editor),a(this).hasClass("emoji-menu-tab"))return e.getTabIndex(this)!==e.currentCategory&&e.selectCategory(e.getTabIndex(this)),!1;var d=a(".label",a(this)).text();return b.setTimeout(function(){e.onItemSelected(d),(c.ctrlKey||c.metaKey)&&e.hide()},0),c.stopPropagation(),!1}),this.selectCategory(0)};n.prototype.getTabIndex=function(a){return this.$categoryTabs.find(".emoji-menu-tab").index(a)},n.prototype.selectCategory=function(a){this.$categoryTabs.find(".emoji-menu-tab").each(function(b){b===a?this.className+="-selected":this.className=this.className.replace("-selected","")}),this.currentCategory=a,this.load(a),Config.Mobile||this.$itemsWrap.nanoScroller({scroll:"top"})},n.prototype.onItemSelected=function(a){this.emojiarea.$editor.text().length+this.emojiarea.$editor.find("img").length>=this.emojiarea.$editor.attr("maxlength")||this.emojiarea.insert(a)},n.prototype.load=function(b){var c=[],d=a.emojiarea.icons,e=a.emojiarea.assetsPath,f=this;e.length&&"/"!==e.charAt(e.length-1)&&(e+="/");var g=function(){f.$items.html(c.join("")),Config.Mobile||setTimeout(function(){f.$itemsWrap.nanoScroller()},100)};if(b>0){for(var h in d)d.hasOwnProperty(h)&&d[h][0]===b-1&&c.push('<a href="javascript:void(0)" title="'+j.htmlEntities(h)+'">'+k.createIcon(d[h],!0)+'<span class="label">'+j.htmlEntities(h)+"</span></a>");g()}else ConfigStorage.get("emojis_recent",function(a){a=a||i||[];var b,e;for(e=0;e<a.length;e++)b=a[e],d[b]&&c.push('<a href="javascript:void(0)" title="'+j.htmlEntities(b)+'">'+k.createIcon(d[b],!0)+'<span class="label">'+j.htmlEntities(b)+"</span></a>");g()})},n.prototype.reposition=function(){this.tether||(this.tether=new Tether({element:'[data-id="'+this.id+'"][data-type="menu"]',target:'[data-id="'+this.id+'"][data-type="picker"]',attachment:"left center",targetAttachment:"bottom left",offset:"0 12px",constraints:[{to:"html",pin:!0}]}))},n.prototype.hide=function(a){this.visible=!1,this.$menu.hide("fast")},n.prototype.show=function(b){return this.visible?this.hide():(this.reposition(),a(this.$menu).css("z-index",++n.menuZIndex),this.$menu.show("fast"),this.currentCategory||this.load(0),void(this.visible=!0))}}(jQuery,window,document),function(){this.EmojiPicker=function(){function a(a){var b,c;null==a&&(a={}),$.emojiarea.iconSize=null!=(b=a.iconSize)?b:25,$.emojiarea.assetsPath=null!=(c=a.assetsPath)?c:"",this.generateEmojiIconSets(a),a.emojiable_selector||(a.emojiable_selector="[data-emojiable=true]"),this.options=a}return a.prototype.discover=function(){var a;return(a=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream)?void 0:$(this.options.emojiable_selector).emojiarea($.extend({emojiPopup:this,norealTime:!0},this.options))},a.prototype.generateEmojiIconSets=function(a){var b,c,d,e,f,g,h,i,j,k;for(f={},i={},e=void 0,g=void 0,d=void 0,h=void 0,c=void 0,j=void 0,b=void 0,k=void 0,g=0;g<Config.EmojiCategories.length;){for(k=Config.EmojiCategorySpritesheetDimens[g][1],e=0;e<Config.EmojiCategories[g].length;)c=Config.Emoji[Config.EmojiCategories[g][e]],h=c[1][0],j=Math.floor(e/k),b=e%k,f[":"+h+":"]=[g,j,b,":"+h+":"],i[h]=c[0],e++;g++}return $.emojiarea.icons=f,$.emojiarea.reverseIcons=i},a.prototype.colonToUnicode=function(a){return a?(Config.rx_colons||Config.init_unified(),a.replace(Config.rx_colons,function(a){var b;return b=Config.mapcolon[a],b?b:""})):""},a.prototype.unicodeToImage=function(a){return a?(Config.rx_codes||Config.init_unified(),a.replace(Config.rx_codes,function(a){var b,c;return c=Config.reversemap[a],c?(c=":"+c+":",b=$.emojiarea.createIcon($.emojiarea.icons[c])):""})):""},a.prototype.colonToImage=function(a){return a?(Config.rx_colons||Config.init_unified(),a.replace(Config.rx_colons,function(a){var b;return a?b=$.emojiarea.createIcon($.emojiarea.icons[a]):""})):""},a}()}.call(this);
$(function () {
  window.emojiPicker = new EmojiPicker({
    emojiable_selector: '[data-emojiable=true]',
    assetsPath: '/assets/emoji_picker',
    popupButtonClasses: 'fa fa-smile-o',
  });
  window.emojiPicker.discover();
});


(function() {


}).call(this);
(function(a) {
    "use strict", typeof define == "function" && define.amd ? define(["jquery", "load-image", "bootstrap"], a) : a(window.jQuery, window.loadImage)
})(function(a, b) {
    "use strict", a.extend(a.fn.modal.defaults, {delegate: document, selector: null, filter: "*", index: 0, href: null, preloadRange: 2, offsetWidth: 100, offsetHeight: 200, canvas: !1, slideshow: 0, imageClickDivision: .5});
    var c = a.fn.modal.Constructor.prototype.show, d = a.fn.modal.Constructor.prototype.hide;
    a.extend(a.fn.modal.Constructor.prototype, {initLinks: function() {
            var b = this, c = this.options, d = c.selector || "a[data-target=" + c.target + "]";
            this.$links = a(c.delegate).find(d).filter(c.filter).each(function(a) {
                b.getUrl(this) === c.href && (c.index = a)
            }), this.$links[c.index] || (c.index = 0)
        }, getUrl: function(b) {
            return b.href || a(b).data("href")
        }, startSlideShow: function() {
            var a = this;
            this.options.slideshow && (this._slideShow = window.setTimeout(function() {
                a.next()
            }, this.options.slideshow))
        }, stopSlideShow: function() {
            window.clearTimeout(this._slideShow)
        }, toggleSlideShow: function() {
            var a = this.$element.find(".modal-slideshow");
            this.options.slideshow ? (this.options.slideshow = 0, this.stopSlideShow()) : (this.options.slideshow = a.data("slideshow") || 5e3, this.startSlideShow()), a.find("i").toggleClass("icon-play icon-pause")
        }, preloadImages: function() {
            var b = this.options, c = b.index + b.preloadRange + 1, d, e;
            for (e = b.index - b.preloadRange; e < c; e += 1)
                d = this.$links[e], d && e !== b.index && a("<img>").prop("src", this.getUrl(d))
        }, loadImage: function() {
            var a = this, c = this.$element, d = this.options.index, e = this.getUrl(this.$links[d]), f;
            this.abortLoad(), this.stopSlideShow(), c.trigger("beforeLoad"), this._loadingTimeout = window.setTimeout(function() {
                c.addClass("modal-loading")
            }, 100), f = c.find(".modal-image").children().removeClass("in"), window.setTimeout(function() {
                f.remove()
            }, 3e3), c.find(".modal-title").text(this.$links[d].title), c.find(".modal-download").prop("href", e), this._loadingImage = b(e, function(b) {
                a.img = b, window.clearTimeout(a._loadingTimeout), c.removeClass("modal-loading"), c.trigger("load"), a.showImage(b), a.startSlideShow()
            }, this._loadImageOptions), this.preloadImages()
        }, showImage: function(b) {
            var c = this.$element, d = a.support.transition && c.hasClass("fade"), e = d ? c.animate : c.css, f = c.find(".modal-image"), g, h;
            f.css({width: b.width, height: b.height}), c.find(".modal-title").css({width: Math.max(b.width, 380)}), a(window).width() > 480 && (d && (g = c.clone().hide().appendTo(document.body)), e.call(c.stop(), {"margin-top": -((g || c).outerHeight() / 2), "margin-left": -((g || c).outerWidth() / 2)}), g && g.remove()), f.append(b), h = b.offsetWidth, c.trigger("display"), d ? c.is(":visible") ? a(b).on(a.support.transition.end, function(d) {
                d.target === b && (a(b).off(a.support.transition.end), c.trigger("displayed"))
            }).addClass("in") : (a(b).addClass("in"), c.one("shown", function() {
                c.trigger("displayed")
            })) : (a(b).addClass("in"), c.trigger("displayed"))
        }, abortLoad: function() {
            this._loadingImage && (this._loadingImage.onload = this._loadingImage.onerror = null), window.clearTimeout(this._loadingTimeout)
        }, prev: function() {
            var a = this.options;
            a.index -= 1, a.index < 0 && (a.index = this.$links.length - 1), this.loadImage()
        }, next: function() {
            var a = this.options;
            a.index += 1, a.index > this.$links.length - 1 && (a.index = 0), this.loadImage()
        }, keyHandler: function(a) {
            switch (a.which) {
                case 37:
                case 38:
                    a.preventDefault(), this.prev();
                    break;
                case 39:
                case 40:
                    a.preventDefault(), this.next()
                }
        }, wheelHandler: function(a) {
            a.preventDefault(), a = a.originalEvent, this._wheelCounter = this._wheelCounter || 0, this._wheelCounter += a.wheelDelta || a.detail || 0;
            if (a.wheelDelta && this._wheelCounter >= 120 || !a.wheelDelta && this._wheelCounter < 0)
                this.prev(), this._wheelCounter = 0;
            else if (a.wheelDelta && this._wheelCounter <= -120 || !a.wheelDelta && this._wheelCounter > 0)
                this.next(), this._wheelCounter = 0
        }, initGalleryEvents: function() {
            var b = this, c = this.$element;
            c.find(".modal-image").on("click.modal-gallery", function(c) {
                var d = a(this);
                b.$links.length === 1 ? b.hide() : (c.pageX - d.offset().left) / d.width() < b.options.imageClickDivision ? b.prev(c) : b.next(c)
            }), c.find(".modal-prev").on("click.modal-gallery", function(a) {
                b.prev(a)
            }), c.find(".modal-next").on("click.modal-gallery", function(a) {
                b.next(a)
            }), c.find(".modal-slideshow").on("click.modal-gallery", function(a) {
                b.toggleSlideShow(a)
            }), a(document).on("keydown.modal-gallery", function(a) {
                b.keyHandler(a)
            }).on("mousewheel.modal-gallery, DOMMouseScroll.modal-gallery", function(a) {
                b.wheelHandler(a)
            })
        }, destroyGalleryEvents: function() {
            var b = this.$element;
            this.abortLoad(), this.stopSlideShow(), b.find(".modal-image, .modal-prev, .modal-next, .modal-slideshow").off("click.modal-gallery"), a(document).off("keydown.modal-gallery").off("mousewheel.modal-gallery, DOMMouseScroll.modal-gallery")
        }, show: function() {
            if (!this.isShown && this.$element.hasClass("modal-gallery")) {
                var b = this.$element, d = this.options, e = a(window).width(), f = a(window).height();
                b.hasClass("modal-fullscreen") ? (this._loadImageOptions = {maxWidth: e, maxHeight: f, canvas: d.canvas}, b.hasClass("modal-fullscreen-stretch") && (this._loadImageOptions.minWidth = e, this._loadImageOptions.minHeight = f)) : this._loadImageOptions = {maxWidth: e - d.offsetWidth, maxHeight: f - d.offsetHeight, canvas: d.canvas}, e > 480 && b.css({"margin-top": -(b.outerHeight() / 2), "margin-left": -(b.outerWidth() / 2)}), this.initGalleryEvents(), this.initLinks(), this.$links.length && (b.find(".modal-slideshow, .modal-prev, .modal-next").toggle(this.$links.length !== 1), b.toggleClass("modal-single", this.$links.length === 1), this.loadImage())
            }
            c.apply(this, arguments)
        }, hide: function() {
            this.isShown && this.$element.hasClass("modal-gallery") && (this.options.delegate = document, this.options.href = null, this.destroyGalleryEvents()), d.apply(this, arguments)
        }}), a(function() {
        a(document.body).on("click.modal-gallery.data-api", '[data-toggle="modal-gallery"]', function(b) {
            var c = a(this), d = c.data(), e = a(d.target), f = e.data("modal"), g;
            f || (d = a.extend(e.data(), d)), d.selector || (d.selector = "a[rel=gallery]"), g = a(b.target).closest(d.selector), g.length && e.length && (b.preventDefault(), d.href = g.prop("href") || g.data("href"), d.delegate = g[0] !== this ? this : document, f && a.extend(f.options, d), e.modal(d))
        })
    })
});
(function($) {
    'use strict';

    //<editor-fold desc="Shims">
    if (!String.prototype.includes) {
        (function() {
            'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
            var toString = {}.toString;
            var defineProperty = (function() {
                // IE 8 only supports `Object.defineProperty` on DOM elements
                try {
                    var object = {};
                    var $defineProperty = Object.defineProperty;
                    var result = $defineProperty(object, object, object) && $defineProperty;
                } catch (error) {
                }
                return result;
            }());
            var indexOf = ''.indexOf;
            var includes = function(search) {
                if (this == null) {
                    throw TypeError();
                }
                var string = String(this);
                if (search && toString.call(search) == '[object RegExp]') {
                    throw TypeError();
                }
                var stringLength = string.length;
                var searchString = String(search);
                var searchLength = searchString.length;
                var position = arguments.length > 1 ? arguments[1] : undefined;
                // `ToInteger`
                var pos = position ? Number(position) : 0;
                if (pos != pos) { // better `isNaN`
                    pos = 0;
                }
                var start = Math.min(Math.max(pos, 0), stringLength);
                // Avoid the `indexOf` call if no match is possible
                if (searchLength + start > stringLength) {
                    return false;
                }
                return indexOf.call(string, searchString, pos) != -1;
            };
            if (defineProperty) {
                defineProperty(String.prototype, 'includes', {
                    'value': includes,
                    'configurable': true,
                    'writable': true
                });
            } else {
                String.prototype.includes = includes;
            }
        }());
    }

    if (!String.prototype.startsWith) {
        (function() {
            'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
            var defineProperty = (function() {
                // IE 8 only supports `Object.defineProperty` on DOM elements
                try {
                    var object = {};
                    var $defineProperty = Object.defineProperty;
                    var result = $defineProperty(object, object, object) && $defineProperty;
                } catch (error) {
                }
                return result;
            }());
            var toString = {}.toString;
            var startsWith = function(search) {
                if (this == null) {
                    throw TypeError();
                }
                var string = String(this);
                if (search && toString.call(search) == '[object RegExp]') {
                    throw TypeError();
                }
                var stringLength = string.length;
                var searchString = String(search);
                var searchLength = searchString.length;
                var position = arguments.length > 1 ? arguments[1] : undefined;
                // `ToInteger`
                var pos = position ? Number(position) : 0;
                if (pos != pos) { // better `isNaN`
                    pos = 0;
                }
                var start = Math.min(Math.max(pos, 0), stringLength);
                // Avoid the `indexOf` call if no match is possible
                if (searchLength + start > stringLength) {
                    return false;
                }
                var index = -1;
                while (++index < searchLength) {
                    if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
                        return false;
                    }
                }
                return true;
            };
            if (defineProperty) {
                defineProperty(String.prototype, 'startsWith', {
                    'value': startsWith,
                    'configurable': true,
                    'writable': true
                });
            } else {
                String.prototype.startsWith = startsWith;
            }
        }());
    }

    if (!Object.keys) {
        Object.keys = function(
                o, // object
                k, // key
                r  // result array
                ) {
            // initialize object and result
            r = [];
            // iterate over object keys
            for (k in o)
                // fill result array with non-prototypical keys
                r.hasOwnProperty.call(o, k) && r.push(k);
            // return result
            return r
        };
    }
    //</editor-fold>

    // Case insensitive contains search
    $.expr[':'].icontains = function(obj, index, meta) {
        var $obj = $(obj);
        var haystack = ($obj.data('tokens') || $obj.text()).toUpperCase();
        return haystack.includes(meta[3].toUpperCase());
    };

    // Case insensitive begins search
    $.expr[':'].ibegins = function(obj, index, meta) {
        var $obj = $(obj);
        var haystack = ($obj.data('tokens') || $obj.text()).toUpperCase();
        return haystack.startsWith(meta[3].toUpperCase());
    };

    // Case and accent insensitive contains search
    $.expr[':'].aicontains = function(obj, index, meta) {
        var $obj = $(obj);
        var haystack = ($obj.data('tokens') || $obj.data('normalizedText') || $obj.text()).toUpperCase();
        return haystack.includes(meta[3].toUpperCase());
    };

    // Case and accent insensitive begins search
    $.expr[':'].aibegins = function(obj, index, meta) {
        var $obj = $(obj);
        var haystack = ($obj.data('tokens') || $obj.data('normalizedText') || $obj.text()).toUpperCase();
        return haystack.startsWith(meta[3].toUpperCase());
    };

    /**
     * Remove all diatrics from the given text.
     * @access private
     * @param {String} text
     * @returns {String}
     */
    function normalizeToBase(text) {
        var rExps = [
            {re: /[\xC0-\xC6]/g, ch: "A"},
            {re: /[\xE0-\xE6]/g, ch: "a"},
            {re: /[\xC8-\xCB]/g, ch: "E"},
            {re: /[\xE8-\xEB]/g, ch: "e"},
            {re: /[\xCC-\xCF]/g, ch: "I"},
            {re: /[\xEC-\xEF]/g, ch: "i"},
            {re: /[\xD2-\xD6]/g, ch: "O"},
            {re: /[\xF2-\xF6]/g, ch: "o"},
            {re: /[\xD9-\xDC]/g, ch: "U"},
            {re: /[\xF9-\xFC]/g, ch: "u"},
            {re: /[\xC7-\xE7]/g, ch: "c"},
            {re: /[\xD1]/g, ch: "N"},
            {re: /[\xF1]/g, ch: "n"}
        ];
        $.each(rExps, function() {
            text = text.replace(this.re, this.ch);
        });
        return text;
    }


    function htmlEscape(html) {
        var escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '`': '&#x60;'
        };
        var source = '(?:' + Object.keys(escapeMap).join('|') + ')',
                testRegexp = new RegExp(source),
                replaceRegexp = new RegExp(source, 'g'),
                string = html == null ? '' : '' + html;
        return testRegexp.test(string) ? string.replace(replaceRegexp, function(match) {
            return escapeMap[match];
        }) : string;
    }

    var Selectpicker = function(element, options, e) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }

        this.$element = $(element);
        this.$newElement = null;
        this.$button = null;
        this.$menu = null;
        this.$lis = null;
        this.options = options;

        // If we have no title yet, try to pull it from the html title attribute (jQuery doesnt' pick it up as it's not a
        // data-attribute)
        if (this.options.title === null) {
            this.options.title = this.$element.attr('title');
        }

        //Expose public methods
        this.val = Selectpicker.prototype.val;
        this.render = Selectpicker.prototype.render;
        this.refresh = Selectpicker.prototype.refresh;
        this.setStyle = Selectpicker.prototype.setStyle;
        this.selectAll = Selectpicker.prototype.selectAll;
        this.deselectAll = Selectpicker.prototype.deselectAll;
        this.destroy = Selectpicker.prototype.remove;
        this.remove = Selectpicker.prototype.remove;
        this.show = Selectpicker.prototype.show;
        this.hide = Selectpicker.prototype.hide;

        this.init();
    };

    Selectpicker.VERSION = '1.7.2';

    // part of this is duplicated in i18n/defaults-en_US.js. Make sure to update both.
    Selectpicker.DEFAULTS = {
        noneSelectedText: 'Nothing selected',
        noneResultsText: 'No results matched {0}',
        countSelectedText: function(numSelected, numTotal) {
            return (numSelected == 1) ? "{0} item selected" : "{0} items selected";
        },
        maxOptionsText: function(numAll, numGroup) {
            return [
                (numAll == 1) ? 'Limit reached ({n} item max)' : 'Limit reached ({n} items max)',
                (numGroup == 1) ? 'Group limit reached ({n} item max)' : 'Group limit reached ({n} items max)'
            ];
        },
        selectAllText: 'Select All',
        deselectAllText: 'Deselect All',
        doneButton: false,
        doneButtonText: 'Close',
        multipleSeparator: ', ',
        styleBase: 'btn',
        style: 'btn-default',
        size: 'auto',
        title: null,
        selectedTextFormat: 'values',
        width: false,
        container: false,
        hideDisabled: false,
        showSubtext: false,
        showIcon: true,
        showContent: true,
        dropupAuto: true,
        header: false,
        liveSearch: false,
        liveSearchPlaceholder: null,
        liveSearchNormalize: false,
        liveSearchStyle: 'contains',
        actionsBox: false,
        iconBase: 'glyphicon',
        tickIcon: 'glyphicon-ok',
        maxOptions: false,
        mobile: false,
        selectOnTab: false,
        dropdownAlignRight: false
    };

    Selectpicker.prototype = {
        constructor: Selectpicker,
        init: function() {
            var that = this,
                    id = this.$element.attr('id');

            this.$element.addClass('bs-select-hidden');
            // store originalIndex (key) and newIndex (value) in this.liObj for fast accessibility
            // allows us to do this.$lis.eq(that.liObj[index]) instead of this.$lis.filter('[data-original-index="' + index + '"]')
            this.liObj = {};
            this.multiple = this.$element.prop('multiple');
            this.autofocus = this.$element.prop('autofocus');
            this.$newElement = this.createView();
            this.$element.after(this.$newElement);
            this.$button = this.$newElement.children('button');
            this.$menu = this.$newElement.children('.dropdown-menu');
            this.$menuInner = this.$menu.children('.inner');
            this.$searchbox = this.$menu.find('input');

            if (this.options.dropdownAlignRight)
                this.$menu.addClass('dropdown-menu-right');

            if (typeof id !== 'undefined') {
                this.$button.attr('data-id', id);
                $('label[for="' + id + '"]').click(function(e) {
                    e.preventDefault();
                    that.$button.focus();
                });
            }

            this.checkDisabled();
            this.clickListener();
            if (this.options.liveSearch)
                this.liveSearchListener();
            this.render();
            this.setStyle();
            this.setWidth();
            if (this.options.container)
                this.selectPosition();
            this.$menu.data('this', this);
            this.$newElement.data('this', this);
            if (this.options.mobile)
                this.mobile();

            this.$newElement.on('hide.bs.dropdown', function(e) {
                that.$element.trigger('hide.bs.select', e);
            });

            this.$newElement.on('hidden.bs.dropdown', function(e) {
                that.$element.trigger('hidden.bs.select', e);
            });

            this.$newElement.on('show.bs.dropdown', function(e) {
                that.$element.trigger('show.bs.select', e);
            });

            this.$newElement.on('shown.bs.dropdown', function(e) {
                that.$element.trigger('shown.bs.select', e);
            });

            setTimeout(function() {
                that.$element.trigger('loaded.bs.select');
            });
        },
        createDropdown: function() {
            // Options
            // If we are multiple, then add the show-tick class by default
            var multiple = this.multiple ? ' show-tick' : '',
                    inputGroup = this.$element.parent().hasClass('input-group') ? ' input-group-btn' : '',
                    autofocus = this.autofocus ? ' autofocus' : '';
            // Elements
            var header = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + '</div>' : '';
            var searchbox = this.options.liveSearch ?
                    '<div class="bs-searchbox">' +
                    '<input type="text" class="form-control" autocomplete="off"' +
                    (null === this.options.liveSearchPlaceholder ? '' : ' placeholder="' + htmlEscape(this.options.liveSearchPlaceholder) + '"') + '>' +
                    '</div>'
                    : '';
            var actionsbox = this.multiple && this.options.actionsBox ?
                    '<div class="bs-actionsbox">' +
                    '<div class="btn-group btn-group-sm btn-block">' +
                    '<button type="button" class="actions-btn bs-select-all btn btn-default">' +
                    this.options.selectAllText +
                    '</button>' +
                    '<button type="button" class="actions-btn bs-deselect-all btn btn-default">' +
                    this.options.deselectAllText +
                    '</button>' +
                    '</div>' +
                    '</div>'
                    : '';
            var donebutton = this.multiple && this.options.doneButton ?
                    '<div class="bs-donebutton">' +
                    '<div class="btn-group btn-block">' +
                    '<button type="button" class="btn btn-sm btn-default">' +
                    this.options.doneButtonText +
                    '</button>' +
                    '</div>' +
                    '</div>'
                    : '';
            var drop =
                    '<div class="btn-group bootstrap-select' + multiple + inputGroup + '">' +
                    '<button type="button" class="' + this.options.styleBase + ' dropdown-toggle" data-toggle="dropdown"' + autofocus + '>' +
                    '<span class="filter-option pull-left"></span>&nbsp;' +
                    '<span class="caret"></span>' +
                    '</button>' +
                    '<div class="dropdown-menu open">' +
                    header +
                    searchbox +
                    actionsbox +
                    '<ul class="dropdown-menu inner" role="menu">' +
                    '</ul>' +
                    donebutton +
                    '</div>' +
                    '</div>';

            return $(drop);
        },
        createView: function() {
            var $drop = this.createDropdown(),
                    li = this.createLi();

            $drop.find('ul')[0].innerHTML = li;
            return $drop;
        },
        reloadLi: function() {
            //Remove all children.
            this.destroyLi();
            //Re build
            var li = this.createLi();
            this.$menuInner[0].innerHTML = li;
        },
        destroyLi: function() {
            this.$menu.find('li').remove();
        },
        createLi: function() {
            var that = this,
                    _li = [],
                    optID = 0,
                    titleOption = document.createElement('option'),
                    liIndex = -1; // increment liIndex whenever a new <li> element is created to ensure liObj is correct

            // Helper functions
            /**
             * @param content
             * @param [index]
             * @param [classes]
             * @param [optgroup]
             * @returns {string}
             */
            var generateLI = function(content, index, classes, optgroup) {
                return '<li' +
                        ((typeof classes !== 'undefined' & '' !== classes) ? ' class="' + classes + '"' : '') +
                        ((typeof index !== 'undefined' & null !== index) ? ' data-original-index="' + index + '"' : '') +
                        ((typeof optgroup !== 'undefined' & null !== optgroup) ? 'data-optgroup="' + optgroup + '"' : '') +
                        '>' + content + '</li>';
            };

            /**
             * @param text
             * @param [classes]
             * @param [inline]
             * @param [tokens]
             * @returns {string}
             */
            var generateA = function(text, classes, inline, tokens) {
                return '<a tabindex="0"' +
                        (typeof classes !== 'undefined' ? ' class="' + classes + '"' : '') +
                        (typeof inline !== 'undefined' ? ' style="' + inline + '"' : '') +
                        (that.options.liveSearchNormalize ? ' data-normalized-text="' + normalizeToBase(htmlEscape(text)) + '"' : '') +
                        (typeof tokens !== 'undefined' || tokens !== null ? ' data-tokens="' + tokens + '"' : '') +
                        '>' + text +
                        '<span class="' + that.options.iconBase + ' ' + that.options.tickIcon + ' check-mark"></span>' +
                        '</a>';
            };

            if (this.options.title && !this.multiple) {
                // this option doesn't create a new <li> element, but does add a new option, so liIndex is decreased
                // since liObj is recalculated on every refresh, liIndex needs to be decreased even if the titleOption is already appended
                liIndex--;

                if (!this.$element.find('.bs-title-option').length) {
                    // Use native JS to prepend option (faster)
                    var element = this.$element[0];
                    titleOption.className = 'bs-title-option';
                    titleOption.appendChild(document.createTextNode(this.options.title));
                    titleOption.value = '';
                    element.insertBefore(titleOption, element.firstChild);
                    // Check if selected attribute is already set on an option. If not, select the titleOption option.
                    if (element.options[element.selectedIndex].getAttribute('selected') === null)
                        titleOption.selected = true;
                }
            }

            this.$element.find('option').each(function(index) {
                var $this = $(this);

                liIndex++;

                if ($this.hasClass('bs-title-option'))
                    return;

                // Get the class and text for the option
                var optionClass = this.className || '',
                        inline = this.style.cssText,
                        text = $this.data('content') ? $this.data('content') : $this.html(),
                        tokens = $this.data('tokens') ? $this.data('tokens') : null,
                        subtext = typeof $this.data('subtext') !== 'undefined' ? '<small class="text-muted">' + $this.data('subtext') + '</small>' : '',
                        icon = typeof $this.data('icon') !== 'undefined' ? '<span class="' + that.options.iconBase + ' ' + $this.data('icon') + '"></span> ' : '',
                        isDisabled = this.disabled || this.parentElement.tagName === 'OPTGROUP' && this.parentElement.disabled;

                if (icon !== '' && isDisabled) {
                    icon = '<span>' + icon + '</span>';
                }

                if (that.options.hideDisabled && isDisabled) {
                    liIndex--;
                    return;
                }

                if (!$this.data('content')) {
                    // Prepend any icon and append any subtext to the main text.
                    text = icon + '<span class="text">' + text + subtext + '</span>';
                }

                if (this.parentElement.tagName === 'OPTGROUP' && $this.data('divider') !== true) {
                    if ($this.index() === 0) { // Is it the first option of the optgroup?
                        optID += 1;

                        // Get the opt group label
                        var label = this.parentElement.label,
                                labelSubtext = typeof $this.parent().data('subtext') !== 'undefined' ? '<small class="text-muted">' + $this.parent().data('subtext') + '</small>' : '',
                                labelIcon = $this.parent().data('icon') ? '<span class="' + that.options.iconBase + ' ' + $this.parent().data('icon') + '"></span> ' : '',
                                optGroupClass = ' ' + this.parentElement.className || '';

                        label = labelIcon + '<span class="text">' + label + labelSubtext + '</span>';

                        if (index !== 0 && _li.length > 0) { // Is it NOT the first option of the select && are there elements in the dropdown?
                            liIndex++;
                            _li.push(generateLI('', null, 'divider', optID + 'div'));
                        }
                        liIndex++;
                        _li.push(generateLI(label, null, 'dropdown-header' + optGroupClass, optID));
                    }
                    _li.push(generateLI(generateA(text, 'opt ' + optionClass + optGroupClass, inline, tokens), index, '', optID));
                } else if ($this.data('divider') === true) {
                    _li.push(generateLI('', index, 'divider'));
                } else if ($this.data('hidden') === true) {
                    _li.push(generateLI(generateA(text, optionClass, inline, tokens), index, 'hidden is-hidden'));
                } else {
                    if (this.previousElementSibling && this.previousElementSibling.tagName === 'OPTGROUP') {
                        liIndex++;
                        _li.push(generateLI('', null, 'divider', optID + 'div'));
                    }
                    _li.push(generateLI(generateA(text, optionClass, inline, tokens), index));
                }

                that.liObj[index] = liIndex;
            });

            //If we are not multiple, we don't have a selected item, and we don't have a title, select the first element so something is set in the button
            if (!this.multiple && this.$element.find('option:selected').length === 0 && !this.options.title) {
                this.$element.find('option').eq(0).prop('selected', true).attr('selected', 'selected');
            }

            return _li.join('');
        },
        findLis: function() {
            if (this.$lis == null)
                this.$lis = this.$menu.find('li');
            return this.$lis;
        },
        /**
         * @param [updateLi] defaults to true
         */
        render: function(updateLi) {
            var that = this,
                    notDisabled;

            //Update the LI to match the SELECT
            if (updateLi !== false) {
                this.$element.find('option').each(function(index) {
                    var $lis = that.findLis().eq(that.liObj[index]);

                    that.setDisabled(index, this.disabled || this.parentElement.tagName === 'OPTGROUP' && this.parentElement.disabled, $lis);
                    that.setSelected(index, this.selected, $lis);
                });
            }

            this.tabIndex();

            var selectedItems = this.$element.find('option').map(function() {
                if (this.selected) {
                    if (that.options.hideDisabled && (this.disabled || this.parentElement.tagName === 'OPTGROUP' && this.parentElement.disabled))
                        return false;

                    var $this = $(this),
                            icon = $this.data('icon') && that.options.showIcon ? '<i class="' + that.options.iconBase + ' ' + $this.data('icon') + '"></i> ' : '',
                            subtext;

                    if (that.options.showSubtext && $this.data('subtext') && !that.multiple) {
                        subtext = ' <small class="text-muted">' + $this.data('subtext') + '</small>';
                    } else {
                        subtext = '';
                    }
                    if (typeof $this.attr('title') !== 'undefined') {
                        return $this.attr('title');
                    } else if ($this.data('content') && that.options.showContent) {
                        return $this.data('content');
                    } else {
                        return icon + $this.html() + subtext;
                    }
                }
            }).toArray();

            //Fixes issue in IE10 occurring when no default option is selected and at least one option is disabled
            //Convert all the values into a comma delimited string
            var title = !this.multiple ? selectedItems[0] : selectedItems.join(this.options.multipleSeparator);

            //If this is multi select, and the selectText type is count, the show 1 of 2 selected etc..
            if (this.multiple && this.options.selectedTextFormat.indexOf('count') > -1) {
                var max = this.options.selectedTextFormat.split('>');
                if ((max.length > 1 && selectedItems.length > max[1]) || (max.length == 1 && selectedItems.length >= 2)) {
                    notDisabled = this.options.hideDisabled ? ', [disabled]' : '';
                    var totalCount = this.$element.find('option').not('[data-divider="true"], [data-hidden="true"]' + notDisabled).length,
                            tr8nText = (typeof this.options.countSelectedText === 'function') ? this.options.countSelectedText(selectedItems.length, totalCount) : this.options.countSelectedText;
                    title = tr8nText.replace('{0}', selectedItems.length.toString()).replace('{1}', totalCount.toString());
                }
            }

            if (this.options.title == undefined) {
                this.options.title = this.$element.attr('title');
            }

            if (this.options.selectedTextFormat == 'static') {
                title = this.options.title;
            }

            //If we dont have a title, then use the default, or if nothing is set at all, use the not selected text
            if (!title) {
                title = typeof this.options.title !== 'undefined' ? this.options.title : this.options.noneSelectedText;
            }

            //strip all html-tags and trim the result
            this.$button.attr('title', $.trim(title.replace(/<[^>]*>?/g, '')));
            this.$button.children('.filter-option').html(title);

            this.$element.trigger('rendered.bs.select');
        },
        /**
         * @param [style]
         * @param [status]
         */
        setStyle: function(style, status) {
            if (this.$element.attr('class')) {
                this.$newElement.addClass(this.$element.attr('class').replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ''));
            }

            var buttonClass = style ? style : this.options.style;

            if (status == 'add') {
                this.$button.addClass(buttonClass);
            } else if (status == 'remove') {
                this.$button.removeClass(buttonClass);
            } else {
                this.$button.removeClass(this.options.style);
                this.$button.addClass(buttonClass);
            }
        },
        liHeight: function(refresh) {
            if (!refresh && (this.options.size === false || this.sizeInfo))
                return;

            var newElement = document.createElement('div'),
                    menu = document.createElement('div'),
                    menuInner = document.createElement('ul'),
                    divider = document.createElement('li'),
                    li = document.createElement('li'),
                    a = document.createElement('a'),
                    text = document.createElement('span'),
                    header = this.options.header ? this.$menu.find('.popover-title')[0].cloneNode(true) : null,
                    search = this.options.liveSearch ? document.createElement('div') : null,
                    actions = this.options.actionsBox && this.multiple ? this.$menu.find('.bs-actionsbox')[0].cloneNode(true) : null,
                    doneButton = this.options.doneButton && this.multiple ? this.$menu.find('.bs-donebutton')[0].cloneNode(true) : null;

            text.className = 'text';
            newElement.className = this.$menu[0].parentNode.className + ' open';
            menu.className = 'dropdown-menu open';
            menuInner.className = 'dropdown-menu inner';
            divider.className = 'divider';

            text.appendChild(document.createTextNode('Inner text'));
            a.appendChild(text);
            li.appendChild(a);
            menuInner.appendChild(li);
            menuInner.appendChild(divider);
            if (header)
                menu.appendChild(header);
            if (search) {
                // create a span instead of input as creating an input element is slower
                var input = document.createElement('span');
                search.className = 'bs-searchbox';
                input.className = 'form-control';
                search.appendChild(input);
                menu.appendChild(search);
            }
            if (actions)
                menu.appendChild(actions);
            menu.appendChild(menuInner);
            if (doneButton)
                menu.appendChild(doneButton);
            newElement.appendChild(menu);

            document.body.appendChild(newElement);

            var liHeight = a.offsetHeight,
                    headerHeight = header ? header.offsetHeight : 0,
                    searchHeight = search ? search.offsetHeight : 0,
                    actionsHeight = actions ? actions.offsetHeight : 0,
                    doneButtonHeight = doneButton ? doneButton.offsetHeight : 0,
                    dividerHeight = $(divider).outerHeight(true),
                    // fall back to jQuery if getComputedStyle is not supported
                    menuStyle = getComputedStyle ? getComputedStyle(menu) : false,
                    $menu = menuStyle ? $(menu) : null,
                    menuPadding = parseInt(menuStyle ? menuStyle.paddingTop : $menu.css('paddingTop')) +
                    parseInt(menuStyle ? menuStyle.paddingBottom : $menu.css('paddingBottom')) +
                    parseInt(menuStyle ? menuStyle.borderTopWidth : $menu.css('borderTopWidth')) +
                    parseInt(menuStyle ? menuStyle.borderBottomWidth : $menu.css('borderBottomWidth')),
                    menuExtras = menuPadding +
                    parseInt(menuStyle ? menuStyle.marginTop : $menu.css('marginTop')) +
                    parseInt(menuStyle ? menuStyle.marginBottom : $menu.css('marginBottom')) + 2;

            document.body.removeChild(newElement);

            this.sizeInfo = {
                liHeight: liHeight,
                headerHeight: headerHeight,
                searchHeight: searchHeight,
                actionsHeight: actionsHeight,
                doneButtonHeight: doneButtonHeight,
                dividerHeight: dividerHeight,
                menuPadding: menuPadding,
                menuExtras: menuExtras
            };
        },
        setSize: function() {
            this.findLis();
            this.liHeight();
            var that = this,
                    $menu = this.$menu,
                    $menuInner = this.$menuInner,
                    $window = $(window),
                    selectHeight = this.$newElement[0].offsetHeight,
                    liHeight = this.sizeInfo['liHeight'],
                    headerHeight = this.sizeInfo['headerHeight'],
                    searchHeight = this.sizeInfo['searchHeight'],
                    actionsHeight = this.sizeInfo['actionsHeight'],
                    doneButtonHeight = this.sizeInfo['doneButtonHeight'],
                    divHeight = this.sizeInfo['dividerHeight'],
                    menuPadding = this.sizeInfo['menuPadding'],
                    menuExtras = this.sizeInfo['menuExtras'],
                    notDisabled = this.options.hideDisabled ? '.disabled' : '',
                    menuHeight,
                    getHeight,
                    selectOffsetTop,
                    selectOffsetBot,
                    posVert = function() {
                selectOffsetTop = that.$newElement.offset().top - $window.scrollTop();
                selectOffsetBot = $window.height() - selectOffsetTop - selectHeight;
            };

            posVert();

            if (this.options.header)
                $menu.css('padding-top', 0);

            if (this.options.size === 'auto') {
                var getSize = function() {
                    var minHeight,
                            hasClass = function(className, include) {
                        return function(element) {
                            if (include) {
                                return (element.classList ? element.classList.contains(className) : $(element).hasClass(className));
                            } else {
                                return !(element.classList ? element.classList.contains(className) : $(element).hasClass(className));
                            }
                        };
                    },
                            lis = that.$menuInner[0].getElementsByTagName('li'),
                            lisVisible = Array.prototype.filter ? Array.prototype.filter.call(lis, hasClass('hidden', false)) : that.$lis.not('.hidden'),
                            optGroup = Array.prototype.filter ? Array.prototype.filter.call(lisVisible, hasClass('dropdown-header', true)) : lisVisible.filter('.dropdown-header');

                    posVert();
                    menuHeight = selectOffsetBot - menuExtras;

                    if (that.options.container) {
                        if (!$menu.data('height'))
                            $menu.data('height', $menu.height());
                        getHeight = $menu.data('height');
                    } else {
                        getHeight = $menu.height();
                    }

                    if (that.options.dropupAuto) {
                        that.$newElement.toggleClass('dropup', selectOffsetTop > selectOffsetBot && (menuHeight - menuExtras) < getHeight);
                    }
                    if (that.$newElement.hasClass('dropup')) {
                        menuHeight = selectOffsetTop - menuExtras;
                    }

                    if ((lisVisible.length + optGroup.length) > 3) {
                        minHeight = liHeight * 3 + menuExtras - 2;
                    } else {
                        minHeight = 0;
                    }

                    $menu.css({
                        'max-height': menuHeight + 'px',
                        'overflow': 'hidden',
                        'min-height': minHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight + 'px'
                    });
                    $menuInner.css({
                        'max-height': menuHeight - headerHeight - searchHeight - actionsHeight - doneButtonHeight - menuPadding + 'px',
                        'overflow-y': 'auto',
                        'min-height': Math.max(minHeight - menuPadding, 0) + 'px'
                    });
                };
                getSize();
                this.$searchbox.off('input.getSize propertychange.getSize').on('input.getSize propertychange.getSize', getSize);
                $window.off('resize.getSize scroll.getSize').on('resize.getSize scroll.getSize', getSize);
            } else if (this.options.size && this.options.size != 'auto' && this.$lis.not(notDisabled).length > this.options.size) {
                var optIndex = this.$lis.not('.divider').not(notDisabled).children().slice(0, this.options.size).last().parent().index(),
                        divLength = this.$lis.slice(0, optIndex + 1).filter('.divider').length;
                menuHeight = liHeight * this.options.size + divLength * divHeight + menuPadding;

                if (that.options.container) {
                    if (!$menu.data('height'))
                        $menu.data('height', $menu.height());
                    getHeight = $menu.data('height');
                } else {
                    getHeight = $menu.height();
                }

                if (that.options.dropupAuto) {
                    //noinspection JSUnusedAssignment
                    this.$newElement.toggleClass('dropup', selectOffsetTop > selectOffsetBot && (menuHeight - menuExtras) < getHeight);
                }
                $menu.css({
                    'max-height': menuHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight + 'px',
                    'overflow': 'hidden',
                    'min-height': ''
                });
                $menuInner.css({
                    'max-height': menuHeight - menuPadding + 'px',
                    'overflow-y': 'auto',
                    'min-height': ''
                });
            }
        },
        setWidth: function() {
            if (this.options.width === 'auto') {
                this.$menu.css('min-width', '0');

                // Get correct width if element is hidden
                var $selectClone = this.$menu.parent().clone().appendTo('body'),
                        $selectClone2 = this.options.container ? this.$newElement.clone().appendTo('body') : $selectClone,
                        ulWidth = $selectClone.children('.dropdown-menu').outerWidth(),
                        btnWidth = $selectClone2.css('width', 'auto').children('button').outerWidth();

                $selectClone.remove();
                $selectClone2.remove();

                // Set width to whatever's larger, button title or longest option
                this.$newElement.css('width', Math.max(ulWidth, btnWidth) + 'px');
            } else if (this.options.width === 'fit') {
                // Remove inline min-width so width can be changed from 'auto'
                this.$menu.css('min-width', '');
                this.$newElement.css('width', '').addClass('fit-width');
            } else if (this.options.width) {
                // Remove inline min-width so width can be changed from 'auto'
                this.$menu.css('min-width', '');
                this.$newElement.css('width', this.options.width);
            } else {
                // Remove inline min-width/width so width can be changed
                this.$menu.css('min-width', '');
                this.$newElement.css('width', '');
            }
            // Remove fit-width class if width is changed programmatically
            if (this.$newElement.hasClass('fit-width') && this.options.width !== 'fit') {
                this.$newElement.removeClass('fit-width');
            }
        },
        selectPosition: function() {
            var that = this,
                    drop = '<div />',
                    $drop = $(drop),
                    pos,
                    actualHeight,
                    getPlacement = function($element) {
                $drop.addClass($element.attr('class').replace(/form-control|fit-width/gi, '')).toggleClass('dropup', $element.hasClass('dropup'));
                pos = $element.offset();
                actualHeight = $element.hasClass('dropup') ? 0 : $element[0].offsetHeight;
                $drop.css({
                    'top': pos.top + actualHeight,
                    'left': pos.left,
                    'width': $element[0].offsetWidth,
                    'position': 'absolute'
                });
            };

            this.$newElement.on('click', function() {
                if (that.isDisabled()) {
                    return;
                }
                getPlacement($(this));
                $drop.appendTo(that.options.container);
                $drop.toggleClass('open', !$(this).hasClass('open'));
                $drop.append(that.$menu);
            });

            $(window).on('resize scroll', function() {
                getPlacement(that.$newElement);
            });

            this.$element.on('hide.bs.select', function() {
                that.$menu.data('height', that.$menu.height());
                $drop.detach();
            });
        },
        setSelected: function(index, selected, $lis) {
            if (!$lis) {
                var $lis = this.findLis().eq(this.liObj[index]);
            }

            $lis.toggleClass('selected', selected);
        },
        setDisabled: function(index, disabled, $lis) {
            if (!$lis) {
                var $lis = this.findLis().eq(this.liObj[index]);
            }

            if (disabled) {
                $lis.addClass('disabled').children('a').attr('href', '#').attr('tabindex', -1);
            } else {
                $lis.removeClass('disabled').children('a').removeAttr('href').attr('tabindex', 0);
            }
        },
        isDisabled: function() {
            return this.$element[0].disabled;
        },
        checkDisabled: function() {
            var that = this;

            if (this.isDisabled()) {
                this.$newElement.addClass('disabled');
                this.$button.addClass('disabled').attr('tabindex', -1);
            } else {
                if (this.$button.hasClass('disabled')) {
                    this.$newElement.removeClass('disabled');
                    this.$button.removeClass('disabled');
                }

                if (this.$button.attr('tabindex') == -1 && !this.$element.data('tabindex')) {
                    this.$button.removeAttr('tabindex');
                }
            }

            this.$button.click(function() {
                return !that.isDisabled();
            });
        },
        tabIndex: function() {
            if (this.$element.is('[tabindex]')) {
                this.$element.data('tabindex', this.$element.attr('tabindex'));
                this.$button.attr('tabindex', this.$element.data('tabindex'));
            }
        },
        clickListener: function() {
            var that = this,
                    $document = $(document);

            this.$newElement.on('touchstart.dropdown', '.dropdown-menu', function(e) {
                e.stopPropagation();
            });

            $document.data('spaceSelect', false);

            this.$button.on('keyup', function(e) {
                if (/(32)/.test(e.keyCode.toString(10)) && $document.data('spaceSelect')) {
                    e.preventDefault();
                    $document.data('spaceSelect', false);
                }
            });

            this.$newElement.on('click', function() {
                that.setSize();
                that.$element.on('shown.bs.select', function() {
                    if (!that.options.liveSearch && !that.multiple) {
                        that.$menu.find('.selected a').focus();
                    } else if (!that.multiple) {
                        var selectedIndex = that.liObj[that.$element[0].selectedIndex];

                        if (typeof selectedIndex !== 'number')
                            return;

                        // scroll to selected option
                        var offset = that.$lis.eq(selectedIndex)[0].offsetTop - that.$menuInner[0].offsetTop;
                        offset = offset - that.$menuInner[0].offsetHeight / 2 + that.sizeInfo.liHeight / 2;
                        that.$menuInner[0].scrollTop = offset;
                    }
                });
            });

            this.$menu.on('click', 'li a', function(e) {
                var $this = $(this),
                        clickedIndex = $this.parent().data('originalIndex'),
                        prevValue = that.$element.val(),
                        prevIndex = that.$element.prop('selectedIndex');

                // Don't close on multi choice menu
                if (that.multiple) {
                    e.stopPropagation();
                }

                e.preventDefault();

                //Don't run if we have been disabled
                if (!that.isDisabled() && !$this.parent().hasClass('disabled')) {
                    var $options = that.$element.find('option'),
                            $option = $options.eq(clickedIndex),
                            state = $option.prop('selected'),
                            $optgroup = $option.parent('optgroup'),
                            maxOptions = that.options.maxOptions,
                            maxOptionsGrp = $optgroup.data('maxOptions') || false;

                    if (!that.multiple) { // Deselect all others if not multi select box
                        $options.prop('selected', false);
                        $option.prop('selected', true);
                        that.$menu.find('.selected').removeClass('selected');
                        that.setSelected(clickedIndex, true);
                    } else { // Toggle the one we have chosen if we are multi select.
                        $option.prop('selected', !state);
                        that.setSelected(clickedIndex, !state);
                        $this.blur();

                        if (maxOptions !== false || maxOptionsGrp !== false) {
                            var maxReached = maxOptions < $options.filter(':selected').length,
                                    maxReachedGrp = maxOptionsGrp < $optgroup.find('option:selected').length;

                            if ((maxOptions && maxReached) || (maxOptionsGrp && maxReachedGrp)) {
                                if (maxOptions && maxOptions == 1) {
                                    $options.prop('selected', false);
                                    $option.prop('selected', true);
                                    that.$menu.find('.selected').removeClass('selected');
                                    that.setSelected(clickedIndex, true);
                                } else if (maxOptionsGrp && maxOptionsGrp == 1) {
                                    $optgroup.find('option:selected').prop('selected', false);
                                    $option.prop('selected', true);
                                    var optgroupID = $this.parent().data('optgroup');
                                    that.$menu.find('[data-optgroup="' + optgroupID + '"]').removeClass('selected');
                                    that.setSelected(clickedIndex, true);
                                } else {
                                    var maxOptionsArr = (typeof that.options.maxOptionsText === 'function') ?
                                            that.options.maxOptionsText(maxOptions, maxOptionsGrp) : that.options.maxOptionsText,
                                            maxTxt = maxOptionsArr[0].replace('{n}', maxOptions),
                                            maxTxtGrp = maxOptionsArr[1].replace('{n}', maxOptionsGrp),
                                            $notify = $('<div class="notify"></div>');
                                    // If {var} is set in array, replace it
                                    /** @deprecated */
                                    if (maxOptionsArr[2]) {
                                        maxTxt = maxTxt.replace('{var}', maxOptionsArr[2][maxOptions > 1 ? 0 : 1]);
                                        maxTxtGrp = maxTxtGrp.replace('{var}', maxOptionsArr[2][maxOptionsGrp > 1 ? 0 : 1]);
                                    }

                                    $option.prop('selected', false);

                                    that.$menu.append($notify);

                                    if (maxOptions && maxReached) {
                                        $notify.append($('<div>' + maxTxt + '</div>'));
                                        that.$element.trigger('maxReached.bs.select');
                                    }

                                    if (maxOptionsGrp && maxReachedGrp) {
                                        $notify.append($('<div>' + maxTxtGrp + '</div>'));
                                        that.$element.trigger('maxReachedGrp.bs.select');
                                    }

                                    setTimeout(function() {
                                        that.setSelected(clickedIndex, false);
                                    }, 10);

                                    $notify.delay(750).fadeOut(300, function() {
                                        $(this).remove();
                                    });
                                }
                            }
                        }
                    }

                    if (!that.multiple) {
                        that.$button.focus();
                    } else if (that.options.liveSearch) {
                        that.$searchbox.focus();
                    }

                    // Trigger select 'change'
                    if ((prevValue != that.$element.val() && that.multiple) || (prevIndex != that.$element.prop('selectedIndex') && !that.multiple)) {
                        that.$element.change();
                        // $option.prop('selected') is current option state (selected/unselected). state is previous option state.
                        that.$element.trigger('changed.bs.select', [clickedIndex, $option.prop('selected'), state]);
                    }
                }
            });

            this.$menu.on('click', 'li.disabled a, .popover-title, .popover-title :not(.close)', function(e) {
                if (e.currentTarget == this) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (that.options.liveSearch && !$(e.target).hasClass('close')) {
                        that.$searchbox.focus();
                    } else {
                        that.$button.focus();
                    }
                }
            });

            this.$menu.on('click', 'li.divider, li.dropdown-header', function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (that.options.liveSearch) {
                    that.$searchbox.focus();
                } else {
                    that.$button.focus();
                }
            });

            this.$menu.on('click', '.popover-title .close', function() {
                that.$button.click();
            });

            this.$searchbox.on('click', function(e) {
                e.stopPropagation();
            });

            this.$menu.on('click', '.actions-btn', function(e) {
                if (that.options.liveSearch) {
                    that.$searchbox.focus();
                } else {
                    that.$button.focus();
                }

                e.preventDefault();
                e.stopPropagation();

                if ($(this).hasClass('bs-select-all')) {
                    that.selectAll();
                } else {
                    that.deselectAll();
                }
                that.$element.change();
            });

            this.$element.change(function() {
                that.render(false);
            });
        },
        liveSearchListener: function() {
            var that = this,
                    $no_results = $('<li class="no-results"></li>');

            this.$newElement.on('click.dropdown.data-api touchstart.dropdown.data-api', function() {
                that.$menuInner.find('.active').removeClass('active');
                if (!!that.$searchbox.val()) {
                    that.$searchbox.val('');
                    that.$lis.not('.is-hidden').removeClass('hidden');
                    if (!!$no_results.parent().length)
                        $no_results.remove();
                }
                if (!that.multiple)
                    that.$menuInner.find('.selected').addClass('active');
                setTimeout(function() {
                    that.$searchbox.focus();
                }, 10);
            });

            this.$searchbox.on('click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api', function(e) {
                e.stopPropagation();
            });

            this.$searchbox.on('input propertychange', function() {
                if (that.$searchbox.val()) {
                    var $searchBase = that.$lis.not('.is-hidden').removeClass('hidden').children('a');
                    if (that.options.liveSearchNormalize) {
                        $searchBase = $searchBase.not(':a' + that._searchStyle() + '(' + normalizeToBase(that.$searchbox.val()) + ')');
                    } else {
                        $searchBase = $searchBase.not(':' + that._searchStyle() + '(' + that.$searchbox.val() + ')');
                    }
                    $searchBase.parent().addClass('hidden');

                    that.$lis.filter('.dropdown-header').each(function() {
                        var $this = $(this),
                                optgroup = $this.data('optgroup');

                        if (that.$lis.filter('[data-optgroup=' + optgroup + ']').not($this).not('.hidden').length === 0) {
                            $this.addClass('hidden');
                            that.$lis.filter('[data-optgroup=' + optgroup + 'div]').addClass('hidden');
                        }
                    });

                    var $lisVisible = that.$lis.not('.hidden');

                    // hide divider if first or last visible, or if followed by another divider
                    $lisVisible.each(function(index) {
                        var $this = $(this);

                        if ($this.hasClass('divider') && (
                                $this.index() === $lisVisible.eq(0).index() ||
                                $this.index() === $lisVisible.last().index() ||
                                $lisVisible.eq(index + 1).hasClass('divider'))) {
                            $this.addClass('hidden');
                        }
                    });

                    if (!that.$lis.not('.hidden, .no-results').length) {
                        if (!!$no_results.parent().length) {
                            $no_results.remove();
                        }
                        $no_results.html(that.options.noneResultsText.replace('{0}', '"' + htmlEscape(that.$searchbox.val()) + '"')).show();
                        that.$menuInner.append($no_results);
                    } else if (!!$no_results.parent().length) {
                        $no_results.remove();
                    }

                } else {
                    that.$lis.not('.is-hidden').removeClass('hidden');
                    if (!!$no_results.parent().length) {
                        $no_results.remove();
                    }
                }

                that.$lis.filter('.active').removeClass('active');
                that.$lis.not('.hidden, .divider, .dropdown-header').eq(0).addClass('active').children('a').focus();
                $(this).focus();
            });
        },
        _searchStyle: function() {
            var style = 'icontains';
            switch (this.options.liveSearchStyle) {
                case 'begins':
                case 'startsWith':
                    style = 'ibegins';
                    break;
                case 'contains':
                default:
                    break; //no need to change the default
            }

            return style;
        },
        val: function(value) {
            if (typeof value !== 'undefined') {
                this.$element.val(value);
                this.render();

                return this.$element;
            } else {
                return this.$element.val();
            }
        },
        selectAll: function() {
            this.findLis();
            this.$element.find('option:enabled').not('[data-divider], [data-hidden]').prop('selected', true);
            this.$lis.not('.divider, .dropdown-header, .disabled, .hidden').addClass('selected');
            this.render(false);
        },
        deselectAll: function() {
            this.findLis();
            this.$element.find('option:enabled').not('[data-divider], [data-hidden]').prop('selected', false);
            this.$lis.not('.divider, .dropdown-header, .disabled, .hidden').removeClass('selected');
            this.render(false);
        },
        keydown: function(e) {
            var $this = $(this),
                    $parent = $this.is('input') ? $this.parent().parent() : $this.parent(),
                    $items,
                    that = $parent.data('this'),
                    index,
                    next,
                    first,
                    last,
                    prev,
                    nextPrev,
                    prevIndex,
                    isActive,
                    selector = ':not(.disabled, .hidden, .dropdown-header, .divider)',
                    keyCodeMap = {
                32: ' ',
                48: '0',
                49: '1',
                50: '2',
                51: '3',
                52: '4',
                53: '5',
                54: '6',
                55: '7',
                56: '8',
                57: '9',
                59: ';',
                65: 'a',
                66: 'b',
                67: 'c',
                68: 'd',
                69: 'e',
                70: 'f',
                71: 'g',
                72: 'h',
                73: 'i',
                74: 'j',
                75: 'k',
                76: 'l',
                77: 'm',
                78: 'n',
                79: 'o',
                80: 'p',
                81: 'q',
                82: 'r',
                83: 's',
                84: 't',
                85: 'u',
                86: 'v',
                87: 'w',
                88: 'x',
                89: 'y',
                90: 'z',
                96: '0',
                97: '1',
                98: '2',
                99: '3',
                100: '4',
                101: '5',
                102: '6',
                103: '7',
                104: '8',
                105: '9'
            };

            if (that.options.liveSearch)
                $parent = $this.parent().parent();

            if (that.options.container)
                $parent = that.$menu;

            $items = $('[role=menu] li a', $parent);

            isActive = that.$menu.parent().hasClass('open');

            if (!isActive && (e.keyCode >= 48 && e.keyCode <= 57 || event.keyCode >= 65 && event.keyCode <= 90)) {
                if (!that.options.container) {
                    that.setSize();
                    that.$menu.parent().addClass('open');
                    isActive = true;
                } else {
                    that.$newElement.trigger('click');
                }
                that.$searchbox.focus();
            }

            if (that.options.liveSearch) {
                if (/(^9$|27)/.test(e.keyCode.toString(10)) && isActive && that.$menu.find('.active').length === 0) {
                    e.preventDefault();
                    that.$menu.parent().removeClass('open');
                    if (that.options.container)
                        that.$newElement.removeClass('open');
                    that.$button.focus();
                }
                // $items contains li elements when liveSearch is enabled
                $items = $('[role=menu] li:not(.disabled, .hidden, .dropdown-header, .divider)', $parent);
                if (!$this.val() && !/(38|40)/.test(e.keyCode.toString(10))) {
                    if ($items.filter('.active').length === 0) {
                        $items = that.$newElement.find('li');
                        if (that.options.liveSearchNormalize) {
                            $items = $items.filter(':a' + that._searchStyle() + '(' + normalizeToBase(keyCodeMap[e.keyCode]) + ')');
                        } else {
                            $items = $items.filter(':' + that._searchStyle() + '(' + keyCodeMap[e.keyCode] + ')');
                        }
                    }
                }
            }

            if (!$items.length)
                return;

            if (/(38|40)/.test(e.keyCode.toString(10))) {
                index = $items.index($items.filter(':focus'));
                first = $items.parent(selector).first().data('originalIndex');
                last = $items.parent(selector).last().data('originalIndex');
                next = $items.eq(index).parent().nextAll(selector).eq(0).data('originalIndex');
                prev = $items.eq(index).parent().prevAll(selector).eq(0).data('originalIndex');
                nextPrev = $items.eq(next).parent().prevAll(selector).eq(0).data('originalIndex');

                if (that.options.liveSearch) {
                    $items.each(function(i) {
                        if (!$(this).hasClass('disabled')) {
                            $(this).data('index', i);
                        }
                    });
                    index = $items.index($items.filter('.active'));
                    first = $items.first().data('index');
                    last = $items.last().data('index');
                    next = $items.eq(index).nextAll().eq(0).data('index');
                    prev = $items.eq(index).prevAll().eq(0).data('index');
                    nextPrev = $items.eq(next).prevAll().eq(0).data('index');
                }

                prevIndex = $this.data('prevIndex');

                if (e.keyCode == 38) {
                    if (that.options.liveSearch)
                        index -= 1;
                    if (index != nextPrev && index > prev)
                        index = prev;
                    if (index < first)
                        index = first;
                    if (index == prevIndex)
                        index = last;
                } else if (e.keyCode == 40) {
                    if (that.options.liveSearch)
                        index += 1;
                    if (index == -1)
                        index = 0;
                    if (index != nextPrev && index < next)
                        index = next;
                    if (index > last)
                        index = last;
                    if (index == prevIndex)
                        index = first;
                }

                $this.data('prevIndex', index);

                if (!that.options.liveSearch) {
                    $items.eq(index).focus();
                } else {
                    e.preventDefault();
                    if (!$this.hasClass('dropdown-toggle')) {
                        $items.removeClass('active').eq(index).addClass('active').children('a').focus();
                        $this.focus();
                    }
                }

            } else if (!$this.is('input')) {
                var keyIndex = [],
                        count,
                        prevKey;

                $items.each(function() {
                    if (!$(this).parent().hasClass('disabled')) {
                        if ($.trim($(this).text().toLowerCase()).substring(0, 1) == keyCodeMap[e.keyCode]) {
                            keyIndex.push($(this).parent().index());
                        }
                    }
                });

                count = $(document).data('keycount');
                count++;
                $(document).data('keycount', count);

                prevKey = $.trim($(':focus').text().toLowerCase()).substring(0, 1);

                if (prevKey != keyCodeMap[e.keyCode]) {
                    count = 1;
                    $(document).data('keycount', count);
                } else if (count >= keyIndex.length) {
                    $(document).data('keycount', 0);
                    if (count > keyIndex.length)
                        count = 1;
                }

                $items.eq(keyIndex[count - 1]).focus();
            }

            // Select focused option if "Enter", "Spacebar" or "Tab" (when selectOnTab is true) are pressed inside the menu.
            if ((/(13|32)/.test(e.keyCode.toString(10)) || (/(^9$)/.test(e.keyCode.toString(10)) && that.options.selectOnTab)) && isActive) {
                if (!/(32)/.test(e.keyCode.toString(10)))
                    e.preventDefault();
                if (!that.options.liveSearch) {
                    var elem = $(':focus');
                    elem.click();
                    // Bring back focus for multiselects
                    elem.focus();
                    // Prevent screen from scrolling if the user hit the spacebar
                    e.preventDefault();
                    // Fixes spacebar selection of dropdown items in FF & IE
                    $(document).data('spaceSelect', true);
                } else if (!/(32)/.test(e.keyCode.toString(10))) {
                    that.$menu.find('.active a').click();
                    $this.focus();
                }
                $(document).data('keycount', 0);
            }

            if ((/(^9$|27)/.test(e.keyCode.toString(10)) && isActive && (that.multiple || that.options.liveSearch)) || (/(27)/.test(e.keyCode.toString(10)) && !isActive)) {
                that.$menu.parent().removeClass('open');
                if (that.options.container)
                    that.$newElement.removeClass('open');
                that.$button.focus();
            }
        },
        mobile: function() {
            this.$element.addClass('mobile-device').appendTo(this.$newElement);
            if (this.options.container)
                this.$menu.hide();
        },
        refresh: function() {
            this.$lis = null;
            this.reloadLi();
            this.render();
            this.checkDisabled();
            this.liHeight(true);
            this.setStyle();
            this.setWidth();
            if (this.$lis)
                this.$searchbox.trigger('propertychange');

            this.$element.trigger('refreshed.bs.select');
        },
        hide: function() {
            this.$newElement.hide();
        },
        show: function() {
            this.$newElement.show();
        },
        remove: function() {
            this.$newElement.remove();
            this.$element.remove();
        }
    };

    // SELECTPICKER PLUGIN DEFINITION
    // ==============================
    function Plugin(option, event) {
        // get the args of the outer function..
        var args = arguments;
        // The arguments of the function are explicitly re-defined from the argument list, because the shift causes them
        // to get lost/corrupted in android 2.3 and IE9 #715 #775
        var _option = option,
                _event = event;
        [].shift.apply(args);

        var value;
        var chain = this.each(function() {
            var $this = $(this);
            if ($this.is('select')) {
                var data = $this.data('selectpicker'),
                        options = typeof _option == 'object' && _option;

                if (!data) {
                    var config = $.extend({}, Selectpicker.DEFAULTS, $.fn.selectpicker.defaults || {}, $this.data(), options);
                    $this.data('selectpicker', (data = new Selectpicker(this, config, _event)));
                } else if (options) {
                    for (var i in options) {
                        if (options.hasOwnProperty(i)) {
                            data.options[i] = options[i];
                        }
                    }
                }

                if (typeof _option == 'string') {
                    if (data[_option] instanceof Function) {
                        value = data[_option].apply(data, args);
                    } else {
                        value = data.options[_option];
                    }
                }
            }
        });

        if (typeof value !== 'undefined') {
            //noinspection JSUnusedAssignment
            return value;
        } else {
            return chain;
        }
    }

    var old = $.fn.selectpicker;
    $.fn.selectpicker = Plugin;
    $.fn.selectpicker.Constructor = Selectpicker;

    // SELECTPICKER NO CONFLICT
    // ========================
    $.fn.selectpicker.noConflict = function() {
        $.fn.selectpicker = old;
        return this;
    };

    $(document)
            .data('keycount', 0)
            .on('keydown', '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input', Selectpicker.prototype.keydown)
            .on('focusin.modal', '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="menu"], .bs-searchbox input', function(e) {
        e.stopPropagation();
    });

    // SELECTPICKER DATA-API
    // =====================
    $(window).on('load.bs.select.data-api', function() {
        $('.selectpicker').each(function() {
            var $selectpicker = $(this);
            Plugin.call($selectpicker, $selectpicker.data());
        })
    });
})(jQuery);
(function() {
  jQuery(function() {
    $("a[rel~=popover], .has-popover").popover();
    return $("a[rel~=tooltip], .has-tooltip").tooltip();
  });

}).call(this);
/**
 * Bootstrap.js by @fat & @mdo
 * Copyright 2012 Twitter, Inc.
 * http://www.apache.org/licenses/LICENSE-2.0.txt
 */

!function(a) {
    a(function() {
        "use strict", a.support.transition = function() {
            var a = function() {
                var a = document.createElement("bootstrap"), b = {WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd", msTransition: "MSTransitionEnd", transition: "transitionend"}, c;
                for (c in b)
                    if (a.style[c] !== undefined)
                        return b[c]
            }();
            return a && {end: a}
        }()
    })
}(window.jQuery), !function(a) {
    "use strict";
    var b = '[data-dismiss="alert"]', c = function(c) {
        a(c).on("click", b, this.close)
    };
    c.prototype.close = function(b) {
        function f() {
            e.trigger("closed").remove()
        }
        var c = a(this), d = c.attr("data-target"), e;
        d || (d = c.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), e = a(d), b && b.preventDefault(), e.length || (e = c.hasClass("alert") ? c : c.parent()), e.trigger(b = a.Event("close"));
        if (b.isDefaultPrevented())
            return;
        e.removeClass("in"), a.support.transition && e.hasClass("fade") ? e.on(a.support.transition.end, f) : f()
    }, a.fn.alert = function(b) {
        return this.each(function() {
            var d = a(this), e = d.data("alert");
            e || d.data("alert", e = new c(this)), typeof b == "string" && e[b].call(d)
        })
    }, a.fn.alert.Constructor = c, a(function() {
        a("body").on("click.alert.data-api", b, c.prototype.close)
    })
}(window.jQuery), !function(a) {
    "use strict";
    var b = function(b, c) {
        this.$element = a(b), this.options = a.extend({}, a.fn.button.defaults, c)
    };
    b.prototype.setState = function(a) {
        var b = "disabled", c = this.$element, d = c.data(), e = c.is("input") ? "val" : "html";
        a += "Text", d.resetText || c.data("resetText", c[e]()), c[e](d[a] || this.options[a]), setTimeout(function() {
            a == "loadingText" ? c.addClass(b).attr(b, b) : c.removeClass(b).removeAttr(b)
        }, 0)
    }, b.prototype.toggle = function() {
        var a = this.$element.parent('[data-toggle="buttons-radio"]');
        a && a.find(".active").removeClass("active"), this.$element.toggleClass("active")
    }, a.fn.button = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("button"), f = typeof c == "object" && c;
            e || d.data("button", e = new b(this, f)), c == "toggle" ? e.toggle() : c && e.setState(c)
        })
    }, a.fn.button.defaults = {loadingText: "loading..."}, a.fn.button.Constructor = b, a(function() {
        a("body").on("click.button.data-api", "[data-toggle^=button]", function(b) {
            var c = a(b.target);
            c.hasClass("btn") || (c = c.closest(".btn")), c.button("toggle")
        })
    })
}(window.jQuery), !function(a) {
    "use strict";
    var b = function(b, c) {
        this.$element = a(b), this.options = c, this.options.slide && this.slide(this.options.slide), this.options.pause == "hover" && this.$element.on("mouseenter", a.proxy(this.pause, this)).on("mouseleave", a.proxy(this.cycle, this))
    };
    b.prototype = {cycle: function(b) {
            return b || (this.paused = !1), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
        }, to: function(b) {
            var c = this.$element.find(".active"), d = c.parent().children(), e = d.index(c), f = this;
            if (b > d.length - 1 || b < 0)
                return;
            return this.sliding ? this.$element.one("slid", function() {
                f.to(b)
            }) : e == b ? this.pause().cycle() : this.slide(b > e ? "next" : "prev", a(d[b]))
        }, pause: function(a) {
            return a || (this.paused = !0), clearInterval(this.interval), this.interval = null, this
        }, next: function() {
            if (this.sliding)
                return;
            return this.slide("next")
        }, prev: function() {
            if (this.sliding)
                return;
            return this.slide("prev")
        }, slide: function(b, c) {
            var d = this.$element.find(".active"), e = c || d[b](), f = this.interval, g = b == "next" ? "left" : "right", h = b == "next" ? "first" : "last", i = this, j = a.Event("slide");
            this.sliding = !0, f && this.pause(), e = e.length ? e : this.$element.find(".item")[h]();
            if (e.hasClass("active"))
                return;
            if (a.support.transition && this.$element.hasClass("slide")) {
                this.$element.trigger(j);
                if (j.isDefaultPrevented())
                    return;
                e.addClass(b), e[0].offsetWidth, d.addClass(g), e.addClass(g), this.$element.one(a.support.transition.end, function() {
                    e.removeClass([b, g].join(" ")).addClass("active"), d.removeClass(["active", g].join(" ")), i.sliding = !1, setTimeout(function() {
                        i.$element.trigger("slid")
                    }, 0)
                })
            } else {
                this.$element.trigger(j);
                if (j.isDefaultPrevented())
                    return;
                d.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
            }
            return f && this.cycle(), this
        }}, a.fn.carousel = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("carousel"), f = a.extend({}, a.fn.carousel.defaults, typeof c == "object" && c);
            e || d.data("carousel", e = new b(this, f)), typeof c == "number" ? e.to(c) : typeof c == "string" || (c = f.slide) ? e[c]() : f.interval && e.cycle()
        })
    }, a.fn.carousel.defaults = {interval: 5e3, pause: "hover"}, a.fn.carousel.Constructor = b, a(function() {
        a("body").on("click.carousel.data-api", "[data-slide]", function(b) {
            var c = a(this), d, e = a(c.attr("data-target") || (d = c.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, "")), f = !e.data("modal") && a.extend({}, e.data(), c.data());
            e.carousel(f), b.preventDefault()
        })
    })
}(window.jQuery), !function(a) {
    "use strict";
    var b = function(b, c) {
        this.$element = a(b), this.options = a.extend({}, a.fn.collapse.defaults, c), this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle()
    };
    b.prototype = {constructor: b, dimension: function() {
            var a = this.$element.hasClass("width");
            return a ? "width" : "height"
        }, show: function() {
            var b, c, d, e;
            if (this.transitioning)
                return;
            b = this.dimension(), c = a.camelCase(["scroll", b].join("-")), d = this.$parent && this.$parent.find("> .accordion-group > .in");
            if (d && d.length) {
                e = d.data("collapse");
                if (e && e.transitioning)
                    return;
                d.collapse("hide"), e || d.data("collapse", null)
            }
            this.$element[b](0), this.transition("addClass", a.Event("show"), "shown"), this.$element[b](this.$element[0][c])
        }, hide: function() {
            var b;
            if (this.transitioning)
                return;
            b = this.dimension(), this.reset(this.$element[b]()), this.transition("removeClass", a.Event("hide"), "hidden"), this.$element[b](0)
        }, reset: function(a) {
            var b = this.dimension();
            return this.$element.removeClass("collapse")[b](a || "auto")[0].offsetWidth, this.$element[a !== null ? "addClass" : "removeClass"]("collapse"), this
        }, transition: function(b, c, d) {
            var e = this, f = function() {
                c == "show" && e.reset(), e.transitioning = 0, e.$element.trigger(d)
            };
            this.$element.trigger(c);
            if (c.isDefaultPrevented())
                return;
            this.transitioning = 1, this.$element[b]("in"), a.support.transition && this.$element.hasClass("collapse") ? this.$element.one(a.support.transition.end, f) : f()
        }, toggle: function() {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }}, a.fn.collapse = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("collapse"), f = typeof c == "object" && c;
            e || d.data("collapse", e = new b(this, f)), typeof c == "string" && e[c]()
        })
    }, a.fn.collapse.defaults = {toggle: !0}, a.fn.collapse.Constructor = b, a(function() {
        a("body").on("click.collapse.data-api", "[data-toggle=collapse]", function(b) {
            var c = a(this), d, e = c.attr("data-target") || b.preventDefault() || (d = c.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""), f = a(e).data("collapse") ? "toggle" : c.data();
            a(e).collapse(f)
        })
    })
}(window.jQuery), !function(a) {
    function d() {
        a(b).parent().removeClass("open")
    }
    "use strict";
    var b = '[data-toggle="dropdown"]', c = function(b) {
        var c = a(b).on("click.dropdown.data-api", this.toggle);
        a("html").on("click.dropdown.data-api", function() {
            c.parent().removeClass("open")
        })
    };
    c.prototype = {constructor: c, toggle: function(b) {
            var c = a(this), e, f, g;
            if (c.is(".disabled, :disabled"))
                return;
            return f = c.attr("data-target"), f || (f = c.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, "")), e = a(f), e.length || (e = c.parent()), g = e.hasClass("open"), d(), g || e.toggleClass("open"), !1
        }}, a.fn.dropdown = function(b) {
        return this.each(function() {
            var d = a(this), e = d.data("dropdown");
            e || d.data("dropdown", e = new c(this)), typeof b == "string" && e[b].call(d)
        })
    }, a.fn.dropdown.Constructor = c, a(function() {
        a("html").on("click.dropdown.data-api", d), a("body").on("click.dropdown", ".dropdown form", function(a) {
            a.stopPropagation()
        }).on("click.dropdown.data-api", b, c.prototype.toggle)
    })
}(window.jQuery), !function(a) {
    function c() {
        var b = this, c = setTimeout(function() {
            b.$element.off(a.support.transition.end), d.call(b)
        }, 500);
        this.$element.one(a.support.transition.end, function() {
            clearTimeout(c), d.call(b)
        })
    }
    function d(a) {
        this.$element.hide().trigger("hidden"), e.call(this)
    }
    function e(b) {
        var c = this, d = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var e = a.support.transition && d;
            this.$backdrop = a('<div class="modal-backdrop ' + d + '" />').appendTo(document.body), this.options.backdrop != "static" && this.$backdrop.click(a.proxy(this.hide, this)), e && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), e ? this.$backdrop.one(a.support.transition.end, b) : b()
        } else
            !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, a.proxy(f, this)) : f.call(this)) : b && b()
    }
    function f() {
        this.$backdrop.remove(), this.$backdrop = null
    }
    function g() {
        var b = this;
        this.isShown && this.options.keyboard ? a(document).on("keyup.dismiss.modal", function(a) {
            a.which == 27 && b.hide()
        }) : this.isShown || a(document).off("keyup.dismiss.modal")
    }
    "use strict";
    var b = function(b, c) {
        this.options = c, this.$element = a(b).delegate('[data-dismiss="modal"]', "click.dismiss.modal", a.proxy(this.hide, this))
    };
    b.prototype = {constructor: b, toggle: function() {
            return this[this.isShown ? "hide" : "show"]()
        }, show: function() {
            var b = this, c = a.Event("show");
            this.$element.trigger(c);
            if (this.isShown || c.isDefaultPrevented())
                return;
            a("body").addClass("modal-open"), this.isShown = !0, g.call(this), e.call(this, function() {
                var c = a.support.transition && b.$element.hasClass("fade");
                b.$element.parent().length || b.$element.appendTo(document.body), b.$element.show(), c && b.$element[0].offsetWidth, b.$element.addClass("in"), c ? b.$element.one(a.support.transition.end, function() {
                    b.$element.trigger("shown")
                }) : b.$element.trigger("shown")
            })
        }, hide: function(b) {
            b && b.preventDefault();
            var e = this;
            b = a.Event("hide"), this.$element.trigger(b);
            if (!this.isShown || b.isDefaultPrevented())
                return;
            this.isShown = !1, a("body").removeClass("modal-open"), g.call(this), this.$element.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? c.call(this) : d.call(this)
        }}, a.fn.modal = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("modal"), f = a.extend({}, a.fn.modal.defaults, d.data(), typeof c == "object" && c);
            e || d.data("modal", e = new b(this, f)), typeof c == "string" ? e[c]() : f.show && e.show()
        })
    }, a.fn.modal.defaults = {backdrop: !0, keyboard: !0, show: !0}, a.fn.modal.Constructor = b, a(function() {
        a("body").on("click.modal.data-api", '[data-toggle="modal"]', function(b) {
            var c = a(this), d, e = a(c.attr("data-target") || (d = c.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, "")), f = e.data("modal") ? "toggle" : a.extend({}, e.data(), c.data());
            b.preventDefault(), e.modal(f)
        })
    })
}(window.jQuery), !function(a) {
    "use strict";
    var b = function(a, b) {
        this.init("tooltip", a, b)
    };
    b.prototype = {constructor: b, init: function(b, c, d) {
            var e, f;
            this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.enabled = !0, this.options.trigger != "manual" && (e = this.options.trigger == "hover" ? "mouseenter" : "focus", f = this.options.trigger == "hover" ? "mouseleave" : "blur", this.$element.on(e, this.options.selector, a.proxy(this.enter, this)), this.$element.on(f, this.options.selector, a.proxy(this.leave, this))), this.options.selector ? this._options = a.extend({}, this.options, {trigger: "manual", selector: ""}) : this.fixTitle()
        }, getOptions: function(b) {
            return b = a.extend({}, a.fn[this.type].defaults, b, this.$element.data()), b.delay && typeof b.delay == "number" && (b.delay = {show: b.delay, hide: b.delay}), b
        }, enter: function(b) {
            var c = a(b.currentTarget)[this.type](this._options).data(this.type);
            if (!c.options.delay || !c.options.delay.show)
                return c.show();
            clearTimeout(this.timeout), c.hoverState = "in", this.timeout = setTimeout(function() {
                c.hoverState == "in" && c.show()
            }, c.options.delay.show)
        }, leave: function(b) {
            var c = a(b.currentTarget)[this.type](this._options).data(this.type);
            if (!c.options.delay || !c.options.delay.hide)
                return c.hide();
            clearTimeout(this.timeout), c.hoverState = "out", this.timeout = setTimeout(function() {
                c.hoverState == "out" && c.hide()
            }, c.options.delay.hide)
        }, show: function() {
            var a, b, c, d, e, f, g;
            if (this.hasContent() && this.enabled) {
                a = this.tip(), this.setContent(), this.options.animation && a.addClass("fade"), f = typeof this.options.placement == "function" ? this.options.placement.call(this, a[0], this.$element[0]) : this.options.placement, b = /in/.test(f), a.remove().css({top: 0, left: 0, display: "block"}).appendTo(b ? this.$element : document.body), c = this.getPosition(b), d = a[0].offsetWidth, e = a[0].offsetHeight;
                switch (b ? f.split(" ")[1] : f) {
                    case"bottom":
                        g = {top: c.top + c.height, left: c.left + c.width / 2 - d / 2};
                        break;
                    case"top":
                        g = {top: c.top - e, left: c.left + c.width / 2 - d / 2};
                        break;
                    case"left":
                        g = {top: c.top + c.height / 2 - e / 2, left: c.left - d};
                        break;
                    case"right":
                        g = {top: c.top + c.height / 2 - e / 2, left: c.left + c.width}
                }
                a.css(g).addClass(f).addClass("in")
            }
        }, isHTML: function(a) {
            return typeof a != "string" || a.charAt(0) === "<" && a.charAt(a.length - 1) === ">" && a.length >= 3 || /^(?:[^<]*<[\w\W]+>[^>]*$)/.exec(a)
        }, setContent: function() {
            var a = this.tip(), b = this.getTitle();
            a.find(".tooltip-inner")[this.isHTML(b) ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
        }, hide: function() {
            function d() {
                var b = setTimeout(function() {
                    c.off(a.support.transition.end).remove()
                }, 500);
                c.one(a.support.transition.end, function() {
                    clearTimeout(b), c.remove()
                })
            }
            var b = this, c = this.tip();
            c.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? d() : c.remove()
        }, fixTitle: function() {
            var a = this.$element;
            (a.attr("title") || typeof a.attr("data-original-title") != "string") && a.attr("data-original-title", a.attr("title") || "").removeAttr("title")
        }, hasContent: function() {
            return this.getTitle()
        }, getPosition: function(b) {
            return a.extend({}, b ? {top: 0, left: 0} : this.$element.offset(), {width: this.$element[0].offsetWidth, height: this.$element[0].offsetHeight})
        }, getTitle: function() {
            var a, b = this.$element, c = this.options;
            return a = b.attr("data-original-title") || (typeof c.title == "function" ? c.title.call(b[0]) : c.title), a
        }, tip: function() {
            return this.$tip = this.$tip || a(this.options.template)
        }, validate: function() {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        }, enable: function() {
            this.enabled = !0
        }, disable: function() {
            this.enabled = !1
        }, toggleEnabled: function() {
            this.enabled = !this.enabled
        }, toggle: function() {
            this[this.tip().hasClass("in") ? "hide" : "show"]()
        }}, a.fn.tooltip = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("tooltip"), f = typeof c == "object" && c;
            e || d.data("tooltip", e = new b(this, f)), typeof c == "string" && e[c]()
        })
    }, a.fn.tooltip.Constructor = b, a.fn.tooltip.defaults = {animation: !0, placement: "top", selector: !1, template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover", title: "", delay: 0}
}(window.jQuery), !function(a) {
    "use strict";
    var b = function(a, b) {
        this.init("popover", a, b)
    };
    b.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype, {constructor: b, setContent: function() {
            var a = this.tip(), b = this.getTitle(), c = this.getContent();
            a.find(".popover-title")[this.isHTML(b) ? "html" : "text"](b), a.find(".popover-content > *")[this.isHTML(c) ? "html" : "text"](c), a.removeClass("fade top bottom left right in")
        }, hasContent: function() {
            return this.getTitle() || this.getContent()
        }, getContent: function() {
            var a, b = this.$element, c = this.options;
            return a = b.attr("data-content") || (typeof c.content == "function" ? c.content.call(b[0]) : c.content), a
        }, tip: function() {
            return this.$tip || (this.$tip = a(this.options.template)), this.$tip
        }}), a.fn.popover = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("popover"), f = typeof c == "object" && c;
            e || d.data("popover", e = new b(this, f)), typeof c == "string" && e[c]()
        })
    }, a.fn.popover.Constructor = b, a.fn.popover.defaults = a.extend({}, a.fn.tooltip.defaults, {placement: "right", content: "", template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'})
}(window.jQuery), !function(a) {
    function b(b, c) {
        var d = a.proxy(this.process, this), e = a(b).is("body") ? a(window) : a(b), f;
        this.options = a.extend({}, a.fn.scrollspy.defaults, c), this.$scrollElement = e.on("scroll.scroll.data-api", d), this.selector = (this.options.target || (f = a(b).attr("href")) && f.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = a("body").on("click.scroll.data-api", this.selector, d), this.refresh(), this.process()
    }
    "use strict", b.prototype = {constructor: b, refresh: function() {
            var b = this, c;
            this.offsets = a([]), this.targets = a([]), c = this.$body.find(this.selector).map(function() {
                var b = a(this), c = b.data("target") || b.attr("href"), d = /^#\w/.test(c) && a(c);
                return d && c.length && [[d.position().top, c]] || null
            }).sort(function(a, b) {
                return a[0] - b[0]
            }).each(function() {
                b.offsets.push(this[0]), b.targets.push(this[1])
            })
        }, process: function() {
            var a = this.$scrollElement.scrollTop() + this.options.offset, b = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, c = b - this.$scrollElement.height(), d = this.offsets, e = this.targets, f = this.activeTarget, g;
            if (a >= c)
                return f != (g = e.last()[0]) && this.activate(g);
            for (g = d.length; g--; )
                f != e[g] && a >= d[g] && (!d[g + 1] || a <= d[g + 1]) && this.activate(e[g])
        }, activate: function(b) {
            var c, d;
            this.activeTarget = b, a(this.selector).parent(".active").removeClass("active"), d = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]', c = a(d).parent("li").addClass("active"), c.parent(".dropdown-menu") && (c = c.closest("li.dropdown").addClass("active")), c.trigger("activate")
        }}, a.fn.scrollspy = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("scrollspy"), f = typeof c == "object" && c;
            e || d.data("scrollspy", e = new b(this, f)), typeof c == "string" && e[c]()
        })
    }, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.defaults = {offset: 10}, a(function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            b.scrollspy(b.data())
        })
    })
}(window.jQuery), !function(a) {
    "use strict";
    var b = function(b) {
        this.element = a(b)
    };
    b.prototype = {constructor: b, show: function() {
            var b = this.element, c = b.closest("ul:not(.dropdown-menu)"), d = b.attr("data-target"), e, f, g;
            d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, ""));
            if (b.parent("li").hasClass("active"))
                return;
            e = c.find(".active a").last()[0], g = a.Event("show", {relatedTarget: e}), b.trigger(g);
            if (g.isDefaultPrevented())
                return;
            f = a(d), this.activate(b.parent("li"), c), this.activate(f, f.parent(), function() {
                b.trigger({type: "shown", relatedTarget: e})
            })
        }, activate: function(b, c, d) {
            function g() {
                e.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), b.addClass("active"), f ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d()
            }
            var e = c.find("> .active"), f = d && a.support.transition && e.hasClass("fade");
            f ? e.one(a.support.transition.end, g) : g(), e.removeClass("in")
        }}, a.fn.tab = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("tab");
            e || d.data("tab", e = new b(this)), typeof c == "string" && e[c]()
        })
    }, a.fn.tab.Constructor = b, a(function() {
        a("body").on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(b) {
            b.preventDefault(), a(this).tab("show")
        })
    })
}(window.jQuery), !function(a) {
    "use strict";
    var b = function(b, c) {
        this.$element = a(b), this.options = a.extend({}, a.fn.typeahead.defaults, c), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.$menu = a(this.options.menu).appendTo("body"), this.source = this.options.source, this.shown = !1, this.listen()
    };
    b.prototype = {constructor: b, select: function() {
            var a = this.$menu.find(".active").attr("data-value");
            return this.$element.val(this.updater(a)).change(), this.hide()
        }, updater: function(a) {
            return a
        }, show: function() {
            var b = a.extend({}, this.$element.position(), {height: this.$element[0].offsetHeight});
            return this.$menu.css({top: b.top + b.height, left: b.left}), this.$menu.show(), this.shown = !0, this
        }, hide: function() {
            return this.$menu.hide(), this.shown = !1, this
        }, lookup: function(b) {
            var c = this, d, e;
            return this.query = this.$element.val(), this.query ? (d = a.grep(this.source, function(a) {
                return c.matcher(a)
            }), d = this.sorter(d), d.length ? this.render(d.slice(0, this.options.items)).show() : this.shown ? this.hide() : this) : this.shown ? this.hide() : this
        }, matcher: function(a) {
            return~a.toLowerCase().indexOf(this.query.toLowerCase())
        }, sorter: function(a) {
            var b = [], c = [], d = [], e;
            while (e = a.shift())
                e.toLowerCase().indexOf(this.query.toLowerCase()) ? ~e.indexOf(this.query) ? c.push(e) : d.push(e) : b.push(e);
            return b.concat(c, d)
        }, highlighter: function(a) {
            var b = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            return a.replace(new RegExp("(" + b + ")", "ig"), function(a, b) {
                return"<strong>" + b + "</strong>"
            })
        }, render: function(b) {
            var c = this;
            return b = a(b).map(function(b, d) {
                return b = a(c.options.item).attr("data-value", d), b.find("a").html(c.highlighter(d)), b[0]
            }), b.first().addClass("active"), this.$menu.html(b), this
        }, next: function(b) {
            var c = this.$menu.find(".active").removeClass("active"), d = c.next();
            d.length || (d = a(this.$menu.find("li")[0])), d.addClass("active")
        }, prev: function(a) {
            var b = this.$menu.find(".active").removeClass("active"), c = b.prev();
            c.length || (c = this.$menu.find("li").last()), c.addClass("active")
        }, listen: function() {
            this.$element.on("blur", a.proxy(this.blur, this)).on("keypress", a.proxy(this.keypress, this)).on("keyup", a.proxy(this.keyup, this)), (a.browser.webkit || a.browser.msie) && this.$element.on("keydown", a.proxy(this.keypress, this)), this.$menu.on("click", a.proxy(this.click, this)).on("mouseenter", "li", a.proxy(this.mouseenter, this))
        }, keyup: function(a) {
            switch (a.keyCode) {
                case 40:
                case 38:
                    break;
                case 9:
                case 13:
                    if (!this.shown)
                        return;
                    this.select();
                    break;
                case 27:
                    if (!this.shown)
                        return;
                    this.hide();
                    break;
                default:
                    this.lookup()
            }
            a.stopPropagation(), a.preventDefault()
        }, keypress: function(a) {
            if (!this.shown)
                return;
            switch (a.keyCode) {
                case 9:
                case 13:
                case 27:
                    a.preventDefault();
                    break;
                case 38:
                    if (a.type != "keydown")
                        break;
                    a.preventDefault(), this.prev();
                    break;
                case 40:
                    if (a.type != "keydown")
                        break;
                    a.preventDefault(), this.next()
            }
            a.stopPropagation()
        }, blur: function(a) {
            var b = this;
            setTimeout(function() {
                b.hide()
            }, 150)
        }, click: function(a) {
            a.stopPropagation(), a.preventDefault(), this.select()
        }, mouseenter: function(b) {
            this.$menu.find(".active").removeClass("active"), a(b.currentTarget).addClass("active")
        }}, a.fn.typeahead = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("typeahead"), f = typeof c == "object" && c;
            e || d.data("typeahead", e = new b(this, f)), typeof c == "string" && e[c]()
        })
    }, a.fn.typeahead.defaults = {source: [], items: 8, menu: '<ul class="typeahead dropdown-menu"></ul>', item: '<li><a href="#"></a></li>'}, a.fn.typeahead.Constructor = b, a(function() {
        a("body").on("focus.typeahead.data-api", '[data-provide="typeahead"]', function(b) {
            var c = a(this);
            if (c.data("typeahead"))
                return;
            b.preventDefault(), c.typeahead(c.data())
        })
    })
}(window.jQuery);
(function(a) {
    "use strict";
    var b = a.HTMLCanvasElement && a.HTMLCanvasElement.prototype, c = a.BlobBuilder || a.WebKitBlobBuilder || a.MozBlobBuilder, d = c && a.atob && a.ArrayBuffer && a.Uint8Array && function(a) {
        var b, d, e, f, g, h;
        a.split(",")[0].indexOf("base64") >= 0 ? b = atob(a.split(",")[1]) : b = decodeURIComponent(a.split(",")[1]), d = new ArrayBuffer(b.length), e = new Uint8Array(d);
        for (f = 0; f < b.length; f += 1)
            e[f] = b.charCodeAt(f);
        return g = new c, g.append(d), h = a.split(",")[0].split(":")[1].split(";")[0], g.getBlob(h)
    };
    a.HTMLCanvasElement && !b.toBlob && (b.mozGetAsFile ? b.toBlob = function(a, b) {
        a(this.mozGetAsFile("blob", b))
    } : b.toDataURL && d && (b.toBlob = function(a, b) {
        a(d(this.toDataURL(b)))
    })), typeof define != "undefined" && define.amd ? define(function() {
        return d
    }) : a.dataURLtoBlob = d
})(this);
(function() {


}).call(this);
(function() {


}).call(this);
/**
 * Chat logic
 *
 * Most of the js functionality is inspired from anatgarg.com
 * jQuery tag Module from the tutorial
 * http://anantgarg.com/2009/05/13/gmail-facebook-style-jquery-chat/
 *
 */



var chatboxFocus = new Array();
var chatBoxes = new Array();

var ready = function() {

    chatBox = {
        /**
         * creates an inline chatbox on the page by calling the
         * createChatBox function passing along the unique conversation_id
         *
         * @param conversation_id
         */

        chatWith: function(conversation_id) {

            chatBox.createChatBox(conversation_id);
            $("#chatbox_" + conversation_id + " .chatboxtextarea").focus();
        },
        /**
         * closes the chatbox by essentially hiding it from the page
         *
         * @param conversation_id
         */

        close: function(conversation_id) {
            $('#chatbox_' + conversation_id).css('display', 'none');
            chatBox.restructure();
        },
        /**
         * Plays a notification sound when a new chat message arrives
         */

        notify: function() {
            var audioplayer = $('#chatAudio')[0];
        },
        /**
         * Handles 'smart layouts' of the chatboxes. Like when new chatboxes are
         * added or removed from the view, it restructures them so that they appear
         * neatly aligned on the page
         */

        restructure: function() {
            align = 0;
            for (x in chatBoxes) {
                chatbox_id = chatBoxes[x];

                if ($("#chatbox_" + chatbox_id).css('display') != 'none') {
                    if (align == 0) {
                        $("#chatbox_" + chatbox_id).css('right', '20px');
                    } else {
                        width = (align) * (280 + 7) + 20;
                        $("#chatbox_" + chatbox_id).css('right', width + 'px');
                    }
                    align++;
                }
            }

        },
        /**
         * Takes in two parameters. It is responsible for fetching the specific conversation's
         * html page and appending it to the body of our home page e.g if conversation_id = 1
         *
         * $.get("conversations/1, function(data){
         *    // rest of the logic here
         * }, "html")
         *
         * @param conversation_id
         * @param minimizeChatBox
         */

        createChatBox: function(conversation_id, minimizeChatBox) {
            if ($("#chatbox_" + conversation_id).length > 0) {
                if ($("#chatbox_" + conversation_id).css('display') == 'none') {
                    $("#chatbox_" + conversation_id).css('display', 'block');
                    chatBox.restructure();
                }
                $("#chatbox_" + conversation_id + " .chatboxtextarea").focus();
                return;
            }

            $("body").append('<div id="chatbox_' + conversation_id + '" class="chatbox"></div>')

            $.get("/conversations/" + conversation_id, function(data) {
                $('#chatbox_' + conversation_id).html(data);
                $("#chatbox_" + conversation_id + " .chatboxcontent").scrollTop($("#chatbox_" + conversation_id + " .chatboxcontent")[0].scrollHeight);
            }, "html");

            $("#chatbox_" + conversation_id).css('bottom', '0px');

            chatBoxeslength = 0;

            for (x in chatBoxes) {
                if ($("#chatbox_" + chatBoxes[x]).css('display') != 'none') {
                    chatBoxeslength++;
                }
            }

            if (chatBoxeslength == 0) {
                $("#chatbox_" + conversation_id).css('right', '20px');
            } else {
                width = (chatBoxeslength) * (280 + 7) + 20;
                $("#chatbox_" + conversation_id).css('right', width + 'px');
            }

            chatBoxes.push(conversation_id);

            if (minimizeChatBox == 1) {
                minimizedChatBoxes = new Array();

                if ($.cookie('chatbox_minimized')) {
                    minimizedChatBoxes = $.cookie('chatbox_minimized').split(/\|/);
                }
                minimize = 0;
                for (j = 0; j < minimizedChatBoxes.length; j++) {
                    if (minimizedChatBoxes[j] == conversation_id) {
                        minimize = 1;
                    }
                }

                if (minimize == 1) {
                    $('#chatbox_' + conversation_id + ' .chatboxcontent').css('display', 'none');
                    $('#chatbox_' + conversation_id + ' .chatboxinput').css('display', 'none');
                }
            }

            chatboxFocus[conversation_id] = false;

            $("#chatbox_" + conversation_id + " .chatboxtextarea").blur(function() {
                chatboxFocus[conversation_id] = false;
                $("#chatbox_" + conversation_id + " .chatboxtextarea").removeClass('chatboxtextareaselected');
            }).focus(function() {
                chatboxFocus[conversation_id] = true;
                $('#chatbox_' + conversation_id + ' .chatboxhead').removeClass('chatboxblink');
                $("#chatbox_" + conversation_id + " .chatboxtextarea").addClass('chatboxtextareaselected');
            });

            $("#chatbox_" + conversation_id).click(function() {
                if ($('#chatbox_' + conversation_id + ' .chatboxcontent').css('display') != 'none') {
                    $("#chatbox_" + conversation_id + " .chatboxtextarea").focus();
                }
            });

            $("#chatbox_" + conversation_id).show();

        },
        /**
         * Responsible for listening to the keypresses when chatting. If the Enter button is pressed,
         * we submit our conversation form to our rails app
         *
         * @param event
         * @param chatboxtextarea
         * @param conversation_id
         */

        checkInputKey: function(event, chatboxtextarea, conversation_id) {
            if (event.keyCode == 13 && event.shiftKey == 0) {
                event.preventDefault();

                message = chatboxtextarea.val();
                message = message.replace(/^\s+|\s+$/g, "");

                if (message != '') {
                    $('#conversation_form_' + conversation_id).submit();
                    $(chatboxtextarea).val('');
                    $(chatboxtextarea).focus();
                    $(chatboxtextarea).css('height', '44px');
                }
            }

            var adjustedHeight = chatboxtextarea.clientHeight;
            var maxHeight = 94;

            if (maxHeight > adjustedHeight) {
                adjustedHeight = Math.max(chatboxtextarea.scrollHeight, adjustedHeight);
                if (maxHeight)
                    adjustedHeight = Math.min(maxHeight, adjustedHeight);
                if (adjustedHeight > chatboxtextarea.clientHeight)
                    $(chatboxtextarea).css('height', adjustedHeight + 8 + 'px');
            } else {
                $(chatboxtextarea).css('overflow', 'auto');
            }

        },
        /**
         * Responsible for handling the growth of chatboxes as they increase on the page
         * Keeps track of the minimized chatboxes etc
         *
         * @param conversation_id
         */

        toggleChatBoxGrowth: function(conversation_id) {
            if ($('#chatbox_' + conversation_id + ' .chatboxcontent').css('display') == 'none') {

                var minimizedChatBoxes = new Array();

                if ($.cookie('chatbox_minimized')) {
                    minimizedChatBoxes = $.cookie('chatbox_minimized').split(/\|/);
                }

                var newCookie = '';

                for (i = 0; i < minimizedChatBoxes.length; i++) {
                    if (minimizedChatBoxes[i] != conversation_id) {
                        newCookie += conversation_id + '|';
                    }
                }

                newCookie = newCookie.slice(0, -1)


                $.cookie('chatbox_minimized', newCookie);
                $('#chatbox_' + conversation_id + ' .chatboxcontent').css('display', 'block');
                $('#chatbox_' + conversation_id + ' .chatboxinput').css('display', 'block');
                $("#chatbox_" + conversation_id + " .chatboxcontent").scrollTop($("#chatbox_" + conversation_id + " .chatboxcontent")[0].scrollHeight);
            } else {

                var newCookie = conversation_id;

                if ($.cookie('chatbox_minimized')) {
                    newCookie += '|' + $.cookie('chatbox_minimized');
                }


                $.cookie('chatbox_minimized', newCookie);
                $('#chatbox_' + conversation_id + ' .chatboxcontent').css('display', 'none');
                $('#chatbox_' + conversation_id + ' .chatboxinput').css('display', 'none');
            }

        }



    }


    /**
     * Cookie plugin
     *
     * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
     * Dual licensed under the MIT and GPL licenses:
     * http://www.opensource.org/licenses/mit-license.php
     * http://www.gnu.org/licenses/gpl.html
     *
     */

    jQuery.cookie = function(name, value, options) {
        if (typeof value != 'undefined') { // name and value given, set cookie
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            // CAUTION: Needed to parenthesize options.path and options.domain
            // in the following expressions, otherwise they evaluate to undefined
            // in the packed version for some reason...
            var path = options.path ? '; path=' + (options.path) : '';
            var domain = options.domain ? '; domain=' + (options.domain) : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else { // only name given, get cookie
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    };


}

$(document).ready(ready);
$(document).on("page:load", ready);
(function() {


}).call(this);
(function() {


}).call(this);
/* 
 * flowplayer.js 3.2.6. The Flowplayer API
 * 
 * Copyright 2009-2011 Flowplayer Oy
 * 
 * This file is part of Flowplayer.
 * 
 * Flowplayer is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Flowplayer is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Flowplayer.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * Date: 2011-02-04 05:45:28 -0500 (Fri, 04 Feb 2011)
 * Revision: 614 
 */

(function() {
    function g(o) {
        console.log("$f.fireEvent", [].slice.call(o))
    }
    function k(q) {
        if (!q || typeof q != "object") {
            return q
        }
        var o = new q.constructor();
        for (var p in q) {
            if (q.hasOwnProperty(p)) {
                o[p] = k(q[p])
            }
        }
        return o
    }
    function m(t, q) {
        if (!t) {
            return
        }
        var o, p = 0, r = t.length;
        if (r === undefined) {
            for (o in t) {
                if (q.call(t[o], o, t[o]) === false) {
                    break
                }
            }
        } else {
            for (var s = t[0]; p < r && q.call(s, p, s) !== false; s = t[++p]) {
            }
        }
        return t
    }
    function c(o) {
        return document.getElementById(o)
    }
    function i(q, p, o) {
        if (typeof p != "object") {
            return q
        }
        if (q && p) {
            m(p, function(r, s) {
                if (!o || typeof s != "function") {
                    q[r] = s
                }
            })
        }
        return q
    }
    function n(s) {
        var q = s.indexOf(".");
        if (q != -1) {
            var p = s.slice(0, q) || "*";
            var o = s.slice(q + 1, s.length);
            var r = [];
            m(document.getElementsByTagName(p), function() {
                if (this.className && this.className.indexOf(o) != -1) {
                    r.push(this)
                }
            });
            return r
        }
    }
    function f(o) {
        o = o || window.event;
        if (o.preventDefault) {
            o.stopPropagation();
            o.preventDefault()
        } else {
            o.returnValue = false;
            o.cancelBubble = true
        }
        return false
    }
    function j(q, o, p) {
        q[o] = q[o] || [];
        q[o].push(p)
    }
    function e() {
        return"_" + ("" + Math.random()).slice(2, 10)
    }
    var h = function(t, r, s) {
        var q = this, p = {}, u = {};
        q.index = r;
        if (typeof t == "string") {
            t = {url: t}
        }
        i(this, t, true);
        m(("Begin*,Start,Pause*,Resume*,Seek*,Stop*,Finish*,LastSecond,Update,BufferFull,BufferEmpty,BufferStop").split(","), function() {
            var v = "on" + this;
            if (v.indexOf("*") != -1) {
                v = v.slice(0, v.length - 1);
                var w = "onBefore" + v.slice(2);
                q[w] = function(x) {
                    j(u, w, x);
                    return q
                }
            }
            q[v] = function(x) {
                j(u, v, x);
                return q
            };
            if (r == -1) {
                if (q[w]) {
                    s[w] = q[w]
                }
                if (q[v]) {
                    s[v] = q[v]
                }
            }
        });
        i(this, {onCuepoint: function(x, w) {
                if (arguments.length == 1) {
                    p.embedded = [null, x];
                    return q
                }
                if (typeof x == "number") {
                    x = [x]
                }
                var v = e();
                p[v] = [x, w];
                if (s.isLoaded()) {
                    s._api().fp_addCuepoints(x, r, v)
                }
                return q
            }, update: function(w) {
                i(q, w);
                if (s.isLoaded()) {
                    s._api().fp_updateClip(w, r)
                }
                var v = s.getConfig();
                var x = (r == -1) ? v.clip : v.playlist[r];
                i(x, w, true)
            }, _fireEvent: function(v, y, w, A) {
                if (v == "onLoad") {
                    m(p, function(B, C) {
                        if (C[0]) {
                            s._api().fp_addCuepoints(C[0], r, B)
                        }
                    });
                    return false
                }
                A = A || q;
                if (v == "onCuepoint") {
                    var z = p[y];
                    if (z) {
                        return z[1].call(s, A, w)
                    }
                }
                if (y && "onBeforeBegin,onMetaData,onStart,onUpdate,onResume".indexOf(v) != -1) {
                    i(A, y);
                    if (y.metaData) {
                        if (!A.duration) {
                            A.duration = y.metaData.duration
                        } else {
                            A.fullDuration = y.metaData.duration
                        }
                    }
                }
                var x = true;
                m(u[v], function() {
                    x = this.call(s, A, y, w)
                });
                return x
            }});
        if (t.onCuepoint) {
            var o = t.onCuepoint;
            q.onCuepoint.apply(q, typeof o == "function" ? [o] : o);
            delete t.onCuepoint
        }
        m(t, function(v, w) {
            if (typeof w == "function") {
                j(u, v, w);
                delete t[v]
            }
        });
        if (r == -1) {
            s.onCuepoint = this.onCuepoint
        }
    };
    var l = function(p, r, q, t) {
        var o = this, s = {}, u = false;
        if (t) {
            i(s, t)
        }
        m(r, function(v, w) {
            if (typeof w == "function") {
                s[v] = w;
                delete r[v]
            }
        });
        i(this, {animate: function(y, z, x) {
                if (!y) {
                    return o
                }
                if (typeof z == "function") {
                    x = z;
                    z = 500
                }
                if (typeof y == "string") {
                    var w = y;
                    y = {};
                    y[w] = z;
                    z = 500
                }
                if (x) {
                    var v = e();
                    s[v] = x
                }
                if (z === undefined) {
                    z = 500
                }
                r = q._api().fp_animate(p, y, z, v);
                return o
            }, css: function(w, x) {
                if (x !== undefined) {
                    var v = {};
                    v[w] = x;
                    w = v
                }
                r = q._api().fp_css(p, w);
                i(o, r);
                return o
            }, show: function() {
                this.display = "block";
                q._api().fp_showPlugin(p);
                return o
            }, hide: function() {
                this.display = "none";
                q._api().fp_hidePlugin(p);
                return o
            }, toggle: function() {
                this.display = q._api().fp_togglePlugin(p);
                return o
            }, fadeTo: function(y, x, w) {
                if (typeof x == "function") {
                    w = x;
                    x = 500
                }
                if (w) {
                    var v = e();
                    s[v] = w
                }
                this.display = q._api().fp_fadeTo(p, y, x, v);
                this.opacity = y;
                return o
            }, fadeIn: function(w, v) {
                return o.fadeTo(1, w, v)
            }, fadeOut: function(w, v) {
                return o.fadeTo(0, w, v)
            }, getName: function() {
                return p
            }, getPlayer: function() {
                return q
            }, _fireEvent: function(w, v, x) {
                if (w == "onUpdate") {
                    var z = q._api().fp_getPlugin(p);
                    if (!z) {
                        return
                    }
                    i(o, z);
                    delete o.methods;
                    if (!u) {
                        m(z.methods, function() {
                            var B = "" + this;
                            o[B] = function() {
                                var C = [].slice.call(arguments);
                                var D = q._api().fp_invoke(p, B, C);
                                return D === "undefined" || D === undefined ? o : D
                            }
                        });
                        u = true
                    }
                }
                var A = s[w];
                if (A) {
                    var y = A.apply(o, v);
                    if (w.slice(0, 1) == "_") {
                        delete s[w]
                    }
                    return y
                }
                return o
            }})
    };
    function b(q, G, t) {
        var w = this, v = null, D = false, u, s, F = [], y = {}, x = {}, E, r, p, C, o, A;
        i(w, {id: function() {
                return E
            }, isLoaded: function() {
                return(v !== null && v.fp_play !== undefined && !D)
            }, getParent: function() {
                return q
            }, hide: function(H) {
                if (H) {
                    q.style.height = "0px"
                }
                if (w.isLoaded()) {
                    v.style.height = "0px"
                }
                return w
            }, show: function() {
                q.style.height = A + "px";
                if (w.isLoaded()) {
                    v.style.height = o + "px"
                }
                return w
            }, isHidden: function() {
                return w.isLoaded() && parseInt(v.style.height, 10) === 0
            }, load: function(J) {
                if (!w.isLoaded() && w._fireEvent("onBeforeLoad") !== false) {
                    var H = function() {
                        u = q.innerHTML;
                        if (u && !flashembed.isSupported(G.version)) {
                            q.innerHTML = ""
                        }
                        if (J) {
                            J.cached = true;
                            j(x, "onLoad", J)
                        }
                        flashembed(q, G, {config: t})
                    };
                    var I = 0;
                    m(a, function() {
                        this.unload(function(K) {
                            if (++I == a.length) {
                                H()
                            }
                        })
                    })
                }
                return w
            }, unload: function(J) {
                if (this.isFullscreen() && /WebKit/i.test(navigator.userAgent)) {
                    if (J) {
                        J(false)
                    }
                    return w
                }
                if (u.replace(/\s/g, "") !== "") {
                    if (w._fireEvent("onBeforeUnload") === false) {
                        if (J) {
                            J(false)
                        }
                        return w
                    }
                    D = true;
                    try {
                        if (v) {
                            v.fp_close();
                            w._fireEvent("onUnload")
                        }
                    } catch (H) {
                    }
                    var I = function() {
                        v = null;
                        q.innerHTML = u;
                        D = false;
                        if (J) {
                            J(true)
                        }
                    };
                    setTimeout(I, 50)
                } else {
                    if (J) {
                        J(false)
                    }
                }
                return w
            }, getClip: function(H) {
                if (H === undefined) {
                    H = C
                }
                return F[H]
            }, getCommonClip: function() {
                return s
            }, getPlaylist: function() {
                return F
            }, getPlugin: function(H) {
                var J = y[H];
                if (!J && w.isLoaded()) {
                    var I = w._api().fp_getPlugin(H);
                    if (I) {
                        J = new l(H, I, w);
                        y[H] = J
                    }
                }
                return J
            }, getScreen: function() {
                return w.getPlugin("screen")
            }, getControls: function() {
                return w.getPlugin("controls")._fireEvent("onUpdate")
            }, getLogo: function() {
                try {
                    return w.getPlugin("logo")._fireEvent("onUpdate")
                } catch (H) {
                }
            }, getPlay: function() {
                return w.getPlugin("play")._fireEvent("onUpdate")
            }, getConfig: function(H) {
                return H ? k(t) : t
            }, getFlashParams: function() {
                return G
            }, loadPlugin: function(K, J, M, L) {
                if (typeof M == "function") {
                    L = M;
                    M = {}
                }
                var I = L ? e() : "_";
                w._api().fp_loadPlugin(K, J, M, I);
                var H = {};
                H[I] = L;
                var N = new l(K, null, w, H);
                y[K] = N;
                return N
            }, getState: function() {
                return w.isLoaded() ? v.fp_getState() : -1
            }, play: function(I, H) {
                var J = function() {
                    if (I !== undefined) {
                        w._api().fp_play(I, H)
                    } else {
                        w._api().fp_play()
                    }
                };
                if (w.isLoaded()) {
                    J()
                } else {
                    if (D) {
                        setTimeout(function() {
                            w.play(I, H)
                        }, 50)
                    } else {
                        w.load(function() {
                            J()
                        })
                    }
                }
                return w
            }, getVersion: function() {
                var I = "flowplayer.js 3.2.6";
                if (w.isLoaded()) {
                    var H = v.fp_getVersion();
                    H.push(I);
                    return H
                }
                return I
            }, _api: function() {
                if (!w.isLoaded()) {
                    throw"Flowplayer " + w.id() + " not loaded when calling an API method"
                }
                return v
            }, setClip: function(H) {
                w.setPlaylist([H]);
                return w
            }, getIndex: function() {
                return p
            }, _swfHeight: function() {
                return v.clientHeight
            }});
        m(("Click*,Load*,Unload*,Keypress*,Volume*,Mute*,Unmute*,PlaylistReplace,ClipAdd,Fullscreen*,FullscreenExit,Error,MouseOver,MouseOut").split(","), function() {
            var H = "on" + this;
            if (H.indexOf("*") != -1) {
                H = H.slice(0, H.length - 1);
                var I = "onBefore" + H.slice(2);
                w[I] = function(J) {
                    j(x, I, J);
                    return w
                }
            }
            w[H] = function(J) {
                j(x, H, J);
                return w
            }
        });
        m(("pause,resume,mute,unmute,stop,toggle,seek,getStatus,getVolume,setVolume,getTime,isPaused,isPlaying,startBuffering,stopBuffering,isFullscreen,toggleFullscreen,reset,close,setPlaylist,addClip,playFeed,setKeyboardShortcutsEnabled,isKeyboardShortcutsEnabled").split(","), function() {
            var H = this;
            w[H] = function(J, I) {
                if (!w.isLoaded()) {
                    return w
                }
                var K = null;
                if (J !== undefined && I !== undefined) {
                    K = v["fp_" + H](J, I)
                } else {
                    K = (J === undefined) ? v["fp_" + H]() : v["fp_" + H](J)
                }
                return K === "undefined" || K === undefined ? w : K
            }
        });
        w._fireEvent = function(Q) {
            if (typeof Q == "string") {
                Q = [Q]
            }
            var R = Q[0], O = Q[1], M = Q[2], L = Q[3], K = 0;
            if (t.debug) {
                g(Q)
            }
            if (!w.isLoaded() && R == "onLoad" && O == "player") {
                v = v || c(r);
                o = w._swfHeight();
                m(F, function() {
                    this._fireEvent("onLoad")
                });
                m(y, function(S, T) {
                    T._fireEvent("onUpdate")
                });
                s._fireEvent("onLoad")
            }
            if (R == "onLoad" && O != "player") {
                return
            }
            if (R == "onError") {
                if (typeof O == "string" || (typeof O == "number" && typeof M == "number")) {
                    O = M;
                    M = L
                }
            }
            if (R == "onContextMenu") {
                m(t.contextMenu[O], function(S, T) {
                    T.call(w)
                });
                return
            }
            if (R == "onPluginEvent" || R == "onBeforePluginEvent") {
                var H = O.name || O;
                var I = y[H];
                if (I) {
                    I._fireEvent("onUpdate", O);
                    return I._fireEvent(M, Q.slice(3))
                }
                return
            }
            if (R == "onPlaylistReplace") {
                F = [];
                var N = 0;
                m(O, function() {
                    F.push(new h(this, N++, w))
                })
            }
            if (R == "onClipAdd") {
                if (O.isInStream) {
                    return
                }
                O = new h(O, M, w);
                F.splice(M, 0, O);
                for (K = M + 1; K < F.length; K++) {
                    F[K].index++
                }
            }
            var P = true;
            if (typeof O == "number" && O < F.length) {
                C = O;
                var J = F[O];
                if (J) {
                    P = J._fireEvent(R, M, L)
                }
                if (!J || P !== false) {
                    P = s._fireEvent(R, M, L, J)
                }
            }
            m(x[R], function() {
                P = this.call(w, O, M);
                if (this.cached) {
                    x[R].splice(K, 1)
                }
                if (P === false) {
                    return false
                }
                K++
            });
            return P
        };
        function B() {
            if ($f(q)) {
                $f(q).getParent().innerHTML = "";
                p = $f(q).getIndex();
                a[p] = w
            } else {
                a.push(w);
                p = a.length - 1
            }
            A = parseInt(q.style.height, 10) || q.clientHeight;
            E = q.id || "fp" + e();
            r = G.id || E + "_api";
            G.id = r;
            t.playerId = E;
            if (typeof t == "string") {
                t = {clip: {url: t}}
            }
            if (typeof t.clip == "string") {
                t.clip = {url: t.clip}
            }
            t.clip = t.clip || {};
            if (q.getAttribute("href", 2) && !t.clip.url) {
                t.clip.url = q.getAttribute("href", 2)
            }
            s = new h(t.clip, -1, w);
            t.playlist = t.playlist || [t.clip];
            var I = 0;
            m(t.playlist, function() {
                var K = this;
                if (typeof K == "object" && K.length) {
                    K = {url: "" + K}
                }
                m(t.clip, function(L, M) {
                    if (M !== undefined && K[L] === undefined && typeof M != "function") {
                        K[L] = M
                    }
                });
                t.playlist[I] = K;
                K = new h(K, I, w);
                F.push(K);
                I++
            });
            m(t, function(K, L) {
                if (typeof L == "function") {
                    if (s[K]) {
                        s[K](L)
                    } else {
                        j(x, K, L)
                    }
                    delete t[K]
                }
            });
            m(t.plugins, function(K, L) {
                if (L) {
                    y[K] = new l(K, L, w)
                }
            });
            if (!t.plugins || t.plugins.controls === undefined) {
                y.controls = new l("controls", null, w)
            }
            y.canvas = new l("canvas", null, w);
            u = q.innerHTML;
            function J(L) {
                var K = w.hasiPadSupport && w.hasiPadSupport();
                if (/iPad|iPhone|iPod/i.test(navigator.userAgent) && !/.flv$/i.test(F[0].url) && !K) {
                    return true
                }
                if (!w.isLoaded() && w._fireEvent("onBeforeClick") !== false) {
                    w.load()
                }
                return f(L)
            }
            function H() {
                if (u.replace(/\s/g, "") !== "") {
                    if (q.addEventListener) {
                        q.addEventListener("click", J, false)
                    } else {
                        if (q.attachEvent) {
                            q.attachEvent("onclick", J)
                        }
                    }
                } else {
                    if (q.addEventListener) {
                        q.addEventListener("click", f, false)
                    }
                    w.load()
                }
            }
            setTimeout(H, 0)
        }
        if (typeof q == "string") {
            var z = c(q);
            if (!z) {
                throw"Flowplayer cannot access element: " + q
            }
            q = z;
            B()
        } else {
            B()
        }
    }
    var a = [];
    function d(o) {
        this.length = o.length;
        this.each = function(p) {
            m(o, p)
        };
        this.size = function() {
            return o.length
        }
    }
    window.flowplayer = window.$f = function() {
        var p = null;
        var o = arguments[0];
        if (!arguments.length) {
            m(a, function() {
                if (this.isLoaded()) {
                    p = this;
                    return false
                }
            });
            return p || a[0]
        }
        if (arguments.length == 1) {
            if (typeof o == "number") {
                return a[o]
            } else {
                if (o == "*") {
                    return new d(a)
                }
                m(a, function() {
                    if (this.id() == o.id || this.id() == o || this.getParent() == o) {
                        p = this;
                        return false
                    }
                });
                return p
            }
        }
        if (arguments.length > 1) {
            var t = arguments[1], q = (arguments.length == 3) ? arguments[2] : {};
            if (typeof t == "string") {
                t = {src: t}
            }
            t = i({bgcolor: "#000000", version: [9, 0], expressInstall: "http://static.flowplayer.org/swf/expressinstall.swf", cachebusting: false}, t);
            if (typeof o == "string") {
                if (o.indexOf(".") != -1) {
                    var s = [];
                    m(n(o), function() {
                        s.push(new b(this, k(t), k(q)))
                    });
                    return new d(s)
                } else {
                    var r = c(o);
                    return new b(r !== null ? r : o, t, q)
                }
            } else {
                if (o) {
                    return new b(o, t, q)
                }
            }
        }
        return null
    };
    i(window.$f, {fireEvent: function() {
            var o = [].slice.call(arguments);
            var q = $f(o[0]);
            return q ? q._fireEvent(o.slice(1)) : null
        }, addPlugin: function(o, p) {
            b.prototype[o] = p;
            return $f
        }, each: m, extend: i});
    if (typeof jQuery == "function") {
        jQuery.fn.flowplayer = function(q, p) {
            if (!arguments.length || typeof arguments[0] == "number") {
                var o = [];
                this.each(function() {
                    var r = $f(this);
                    if (r) {
                        o.push(r)
                    }
                });
                return arguments.length ? o[arguments[0]] : new d(o)
            }
            return this.each(function() {
                $f(this, k(q), p ? k(p) : {})
            })
        }
    }
})();
(function() {
    var e = typeof jQuery == "function";
    var i = {width: "100%", height: "100%", allowfullscreen: true, allowscriptaccess: "always", quality: "high", version: null, onFail: null, expressInstall: null, w3c: false, cachebusting: false};
    if (e) {
        jQuery.tools = jQuery.tools || {};
        jQuery.tools.flashembed = {version: "1.0.4", conf: i}
    }
    function j() {
        if (c.done) {
            return false
        }
        var l = document;
        if (l && l.getElementsByTagName && l.getElementById && l.body) {
            clearInterval(c.timer);
            c.timer = null;
            for (var k = 0; k < c.ready.length; k++) {
                c.ready[k].call()
            }
            c.ready = null;
            c.done = true
        }
    }
    var c = e ? jQuery : function(k) {
        if (c.done) {
            return k()
        }
        if (c.timer) {
            c.ready.push(k)
        } else {
            c.ready = [k];
            c.timer = setInterval(j, 13)
        }
    };
    function f(l, k) {
        if (k) {
            for (key in k) {
                if (k.hasOwnProperty(key)) {
                    l[key] = k[key]
                }
            }
        }
        return l
    }
    function g(k) {
        switch (h(k)) {
            case"string":
                k = k.replace(new RegExp('(["\\\\])', "g"), "\\$1");
                k = k.replace(/^\s?(\d+)%/, "$1pct");
                return'"' + k + '"';
            case"array":
                return"[" + b(k, function(n) {
                    return g(n)
                }).join(",") + "]";
            case"function":
                return'"function()"';
            case"object":
                var l = [];
                for (var m in k) {
                    if (k.hasOwnProperty(m)) {
                        l.push('"' + m + '":' + g(k[m]))
                    }
                }
                return"{" + l.join(",") + "}"
        }
        return String(k).replace(/\s/g, " ").replace(/\'/g, '"')
    }
    function h(l) {
        if (l === null || l === undefined) {
            return false
        }
        var k = typeof l;
        return(k == "object" && l.push) ? "array" : k
    }
    if (window.attachEvent) {
        window.attachEvent("onbeforeunload", function() {
            __flash_unloadHandler = function() {
            };
            __flash_savedUnloadHandler = function() {
            }
        })
    }
    function b(k, n) {
        var m = [];
        for (var l in k) {
            if (k.hasOwnProperty(l)) {
                m[l] = n(k[l])
            }
        }
        return m
    }
    function a(r, t) {
        var q = f({}, r);
        var s = document.all;
        var n = '<object width="' + q.width + '" height="' + q.height + '"';
        if (s && !q.id) {
            q.id = "_" + ("" + Math.random()).substring(9)
        }
        if (q.id) {
            n += ' id="' + q.id + '"'
        }
        if (q.cachebusting) {
            q.src += ((q.src.indexOf("?") != -1 ? "&" : "?") + Math.random())
        }
        if (q.w3c || !s) {
            n += ' data="' + q.src + '" type="application/x-shockwave-flash"'
        } else {
            n += ' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'
        }
        n += ">";
        if (q.w3c || s) {
            n += '<param name="movie" value="' + q.src + '" />'
        }
        q.width = q.height = q.id = q.w3c = q.src = null;
        for (var l in q) {
            if (q[l] !== null) {
                n += '<param name="' + l + '" value="' + q[l] + '" />'
            }
        }
        var o = "";
        if (t) {
            for (var m in t) {
                if (t[m] !== null) {
                    o += m + "=" + (typeof t[m] == "object" ? g(t[m]) : t[m]) + "&"
                }
            }
            o = o.substring(0, o.length - 1);
            n += '<param name="flashvars" value=\'' + o + "' />"
        }
        n += "</object>";
        return n
    }
    function d(m, p, l) {
        var k = flashembed.getVersion();
        f(this, {getContainer: function() {
                return m
            }, getConf: function() {
                return p
            }, getVersion: function() {
                return k
            }, getFlashvars: function() {
                return l
            }, getApi: function() {
                return m.firstChild
            }, getHTML: function() {
                return a(p, l)
            }});
        var q = p.version;
        var r = p.expressInstall;
        var o = !q || flashembed.isSupported(q);
        if (o) {
            p.onFail = p.version = p.expressInstall = null;
            m.innerHTML = a(p, l)
        } else {
            if (q && r && flashembed.isSupported([6, 65])) {
                f(p, {src: r});
                l = {MMredirectURL: location.href, MMplayerType: "PlugIn", MMdoctitle: document.title};
                m.innerHTML = a(p, l)
            } else {
                if (m.innerHTML.replace(/\s/g, "") !== "") {
                } else {
                    m.innerHTML = "<h2>Flash version " + q + " or greater is required</h2><h3>" + (k[0] > 0 ? "Your version is " + k : "You have no flash plugin installed") + "</h3>" + (m.tagName == "A" ? "<p>Click here to download latest version</p>" : "<p>Download latest version from <a href='http://www.adobe.com/go/getflashplayer'>here</a></p>");
                    if (m.tagName == "A") {
                        m.onclick = function() {
                            location.href = "http://www.adobe.com/go/getflashplayer"
                        }
                    }
                }
            }
        }
        if (!o && p.onFail) {
            var n = p.onFail.call(this);
            if (typeof n == "string") {
                m.innerHTML = n
            }
        }
        if (document.all) {
            window[p.id] = document.getElementById(p.id)
        }
    }
    window.flashembed = function(l, m, k) {
        if (typeof l == "string") {
            var n = document.getElementById(l);
            if (n) {
                l = n
            } else {
                c(function() {
                    flashembed(l, m, k)
                });
                return
            }
        }
        if (!l) {
            return
        }
        if (typeof m == "string") {
            m = {src: m}
        }
        var o = f({}, i);
        f(o, m);
        return new d(l, o, k)
    };
    f(window.flashembed, {getVersion: function() {
            var m = [0, 0];
            if (navigator.plugins && typeof navigator.plugins["Shockwave Flash"] == "object") {
                var l = navigator.plugins["Shockwave Flash"].description;
                if (typeof l != "undefined") {
                    l = l.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                    var n = parseInt(l.replace(/^(.*)\..*$/, "$1"), 10);
                    var r = /r/.test(l) ? parseInt(l.replace(/^.*r(.*)$/, "$1"), 10) : 0;
                    m = [n, r]
                }
            } else {
                if (window.ActiveXObject) {
                    try {
                        var p = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")
                    } catch (q) {
                        try {
                            p = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                            m = [6, 0];
                            p.AllowScriptAccess = "always"
                        } catch (k) {
                            if (m[0] == 6) {
                                return m
                            }
                        }
                        try {
                            p = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
                        } catch (o) {
                        }
                    }
                    if (typeof p == "object") {
                        l = p.GetVariable("$version");
                        if (typeof l != "undefined") {
                            l = l.replace(/^\S+\s+(.*)$/, "$1").split(",");
                            m = [parseInt(l[0], 10), parseInt(l[2], 10)]
                        }
                    }
                }
            }
            return m
        }, isSupported: function(k) {
            var m = flashembed.getVersion();
            var l = (m[0] > k[0]) || (m[0] == k[0] && m[1] >= k[1]);
            return l
        }, domReady: c, asString: g, getHTML: a});
    if (e) {
        jQuery.fn.flashembed = function(l, k) {
            var m = null;
            this.each(function() {
                m = flashembed(this, l, k)
            });
            return l.api === false ? this : m
        }
    }
})();
(function() {


}).call(this);
(function() {


}).call(this);
// VERSION: 2.2 LAST UPDATE: 13.03.2012
/*
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 *
 * Made by Wilq32, wilq32@gmail.com, Wroclaw, Poland, 01.2009
 * Website: http://code.google.com/p/jqueryrotate/
 */

// Documentation removed from script file (was kinda useless and outdated)

(function($) {
    var supportedCSS, styles = document.getElementsByTagName("head")[0].style, toCheck = "transformProperty WebkitTransform OTransform msTransform MozTransform".split(" ");
    for (var a = 0; a < toCheck.length; a++)
        if (styles[toCheck[a]] !== undefined)
            supportedCSS = toCheck[a];
    // Bad eval to preven google closure to remove it from code o_O
    // After compresion replace it back to var IE = 'v' == '\v'
    var IE = eval('"v"=="\v"');

    jQuery.fn.extend({
        rotate: function(parameters)
        {
            if (this.length === 0 || typeof parameters == "undefined")
                return;
            if (typeof parameters == "number")
                parameters = {
                    angle: parameters
                };
            var returned = [];
            for (var i = 0, i0 = this.length; i < i0; i++)
            {
                var element = this.get(i);
                if (!element.Wilq32 || !element.Wilq32.PhotoEffect) {

                    var paramClone = $.extend(true, {}, parameters);
                    var newRotObject = new Wilq32.PhotoEffect(element, paramClone)._rootObj;

                    returned.push($(newRotObject));
                }
                else {
                    element.Wilq32.PhotoEffect._handleRotation(parameters);
                }
            }
            return returned;
        },
        getRotateAngle: function() {
            var ret = [];
            for (var i = 0, i0 = this.length; i < i0; i++)
            {
                var element = this.get(i);
                if (element.Wilq32 && element.Wilq32.PhotoEffect) {
                    ret[i] = element.Wilq32.PhotoEffect._angle;
                }
            }
            return ret;
        },
        stopRotate: function() {
            for (var i = 0, i0 = this.length; i < i0; i++)
            {
                var element = this.get(i);
                if (element.Wilq32 && element.Wilq32.PhotoEffect) {
                    clearTimeout(element.Wilq32.PhotoEffect._timer);
                }
            }
        }
    });

    // Library agnostic interface

    Wilq32 = window.Wilq32 || {};
    Wilq32.PhotoEffect = (function() {

        if (supportedCSS) {
            return function(img, parameters) {
                img.Wilq32 = {
                    PhotoEffect: this
                };

                this._img = this._rootObj = this._eventObj = img;
                this._handleRotation(parameters);
            }
        } else {
            return function(img, parameters) {
                // Make sure that class and id are also copied - just in case you would like to refeer to an newly created object
                this._img = img;

                this._rootObj = document.createElement('span');
                this._rootObj.style.display = "inline-block";
                this._rootObj.Wilq32 =
                        {
                            PhotoEffect: this
                        };
                img.parentNode.insertBefore(this._rootObj, img);

                if (img.complete) {
                    this._Loader(parameters);
                } else {
                    var self = this;
                    // TODO: Remove jQuery dependency
                    jQuery(this._img).bind("load", function()
                    {
                        self._Loader(parameters);
                    });
                }
            }
        }
    })();

    Wilq32.PhotoEffect.prototype = {
        _setupParameters: function(parameters) {
            this._parameters = this._parameters || {};
            if (typeof this._angle !== "number")
                this._angle = 0;
            if (typeof parameters.angle === "number")
                this._angle = parameters.angle;
            this._parameters.animateTo = (typeof parameters.animateTo === "number") ? (parameters.animateTo) : (this._angle);

            this._parameters.step = parameters.step || this._parameters.step || null;
            this._parameters.easing = parameters.easing || this._parameters.easing || function(x, t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            }
            this._parameters.duration = parameters.duration || this._parameters.duration || 1000;
            this._parameters.callback = parameters.callback || this._parameters.callback || function() {
            };
            if (parameters.bind && parameters.bind != this._parameters.bind)
                this._BindEvents(parameters.bind);
        },
        _handleRotation: function(parameters) {
            this._setupParameters(parameters);
            if (this._angle == this._parameters.animateTo) {
                this._rotate(this._angle);
            }
            else {
                this._animateStart();
            }
        },
        _BindEvents: function(events) {
            if (events && this._eventObj)
            {
                // Unbinding previous Events
                if (this._parameters.bind) {
                    var oldEvents = this._parameters.bind;
                    for (var a in oldEvents)
                        if (oldEvents.hasOwnProperty(a))
                            // TODO: Remove jQuery dependency
                            jQuery(this._eventObj).unbind(a, oldEvents[a]);
                }

                this._parameters.bind = events;
                for (var a in events)
                    if (events.hasOwnProperty(a))
                        // TODO: Remove jQuery dependency
                        jQuery(this._eventObj).bind(a, events[a]);
            }
        },
        _Loader: (function()
        {
            if (IE)
                return function(parameters)
                {
                    var width = this._img.width;
                    var height = this._img.height;
                    this._img.parentNode.removeChild(this._img);

                    this._vimage = this.createVMLNode('image');
                    this._vimage.src = this._img.src;
                    this._vimage.style.height = height + "px";
                    this._vimage.style.width = width + "px";
                    this._vimage.style.position = "absolute"; // FIXES IE PROBLEM - its only rendered if its on absolute position!
                    this._vimage.style.top = "0px";
                    this._vimage.style.left = "0px";

                    /* Group minifying a small 1px precision problem when rotating object */
                    this._container = this.createVMLNode('group');
                    this._container.style.width = width;
                    this._container.style.height = height;
                    this._container.style.position = "absolute";
                    this._container.setAttribute('coordsize', width - 1 + ',' + (height - 1)); // This -1, -1 trying to fix ugly problem with small displacement on IE
                    this._container.appendChild(this._vimage);

                    this._rootObj.appendChild(this._container);
                    this._rootObj.style.position = "relative"; // FIXES IE PROBLEM
                    this._rootObj.style.width = width + "px";
                    this._rootObj.style.height = height + "px";
                    this._rootObj.setAttribute('id', this._img.getAttribute('id'));
                    this._rootObj.className = this._img.className;
                    this._eventObj = this._rootObj;
                    this._handleRotation(parameters);
                }
            else
                return function(parameters)
                {
                    this._rootObj.setAttribute('id', this._img.getAttribute('id'));
                    this._rootObj.className = this._img.className;

                    this._width = this._img.width;
                    this._height = this._img.height;
                    this._widthHalf = this._width / 2; // used for optimisation
                    this._heightHalf = this._height / 2;// used for optimisation

                    var _widthMax = Math.sqrt((this._height) * (this._height) + (this._width) * (this._width));

                    this._widthAdd = _widthMax - this._width;
                    this._heightAdd = _widthMax - this._height;	// widthMax because maxWidth=maxHeight
                    this._widthAddHalf = this._widthAdd / 2; // used for optimisation
                    this._heightAddHalf = this._heightAdd / 2;// used for optimisation

                    this._img.parentNode.removeChild(this._img);

                    this._aspectW = ((parseInt(this._img.style.width, 10)) || this._width) / this._img.width;
                    this._aspectH = ((parseInt(this._img.style.height, 10)) || this._height) / this._img.height;

                    this._canvas = document.createElement('canvas');
                    this._canvas.setAttribute('width', this._width);
                    this._canvas.style.position = "relative";
                    this._canvas.style.left = -this._widthAddHalf + "px";
                    this._canvas.style.top = -this._heightAddHalf + "px";
                    this._canvas.Wilq32 = this._rootObj.Wilq32;

                    this._rootObj.appendChild(this._canvas);
                    this._rootObj.style.width = this._width + "px";
                    this._rootObj.style.height = this._height + "px";
                    this._eventObj = this._canvas;

                    this._cnv = this._canvas.getContext('2d');
                    this._handleRotation(parameters);
                }
        })(),
        _animateStart: function()
        {
            if (this._timer) {
                clearTimeout(this._timer);
            }
            this._animateStartTime = +new Date;
            this._animateStartAngle = this._angle;
            this._animate();
        },
        _animate: function()
        {
            var actualTime = +new Date;
            var checkEnd = actualTime - this._animateStartTime > this._parameters.duration;

            // TODO: Bug for animatedGif for static rotation ? (to test)
            if (checkEnd && !this._parameters.animatedGif)
            {
                clearTimeout(this._timer);
            }
            else
            {
                if (this._canvas || this._vimage || this._img) {
                    var angle = this._parameters.easing(0, actualTime - this._animateStartTime, this._animateStartAngle, this._parameters.animateTo - this._animateStartAngle, this._parameters.duration);
                    this._rotate((~~(angle * 10)) / 10);
                }
                if (this._parameters.step) {
                    this._parameters.step(this._angle);
                }
                var self = this;
                this._timer = setTimeout(function()
                {
                    self._animate.call(self);
                }, 10);
            }

            // To fix Bug that prevents using recursive function in callback I moved this function to back
            if (this._parameters.callback && checkEnd) {
                this._angle = this._parameters.animateTo;
                this._rotate(this._angle);
                this._parameters.callback.call(this._rootObj);
            }
        },
        _rotate: (function()
        {
            var rad = Math.PI / 180;
            if (IE)
                return function(angle)
                {
                    this._angle = angle;
                    this._container.style.rotation = (angle % 360) + "deg";
                }
            else if (supportedCSS)
                return function(angle) {
                    this._angle = angle;
                    this._img.style[supportedCSS] = "rotate(" + (angle % 360) + "deg)";
                }
            else
                return function(angle)
                {
                    this._angle = angle;
                    angle = (angle % 360) * rad;
                    // clear canvas
                    this._canvas.width = this._width + this._widthAdd;
                    this._canvas.height = this._height + this._heightAdd;

                    // REMEMBER: all drawings are read from backwards.. so first function is translate, then rotate, then translate, translate..
                    this._cnv.translate(this._widthAddHalf, this._heightAddHalf);	// at least center image on screen
                    this._cnv.translate(this._widthHalf, this._heightHalf);			// we move image back to its orginal
                    this._cnv.rotate(angle);										// rotate image
                    this._cnv.translate(-this._widthHalf, -this._heightHalf);		// move image to its center, so we can rotate around its center
                    this._cnv.scale(this._aspectW, this._aspectH); // SCALE - if needed ;)
                    this._cnv.drawImage(this._img, 0, 0);							// First - we draw image
                }

        })()
    }

    if (IE)
    {
        Wilq32.PhotoEffect.prototype.createVMLNode = (function() {
            document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
            try {
                !document.namespaces.rvml && document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
                return function(tagName) {
                    return document.createElement('<rvml:' + tagName + ' class="rvml">');
                };
            } catch (e) {
                return function(tagName) {
                    return document.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
                };
            }
        })();
    }

})(jQuery);
/**
 * BxSlider v4.1.2 - Fully loaded, responsive content slider
 * http://bxslider.com
 *
 * Copyright 2014, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
 * Written while drinking Belgian ales and listening to jazz
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */

!function(t) {
    var e = {}, s = {mode: "horizontal", slideSelector: "", infiniteLoop: !0, hideControlOnEnd: !1, speed: 500, easing: null, slideMargin: 0, startSlide: 0, randomStart: !1, captions: !1, ticker: !1, tickerHover: !1, adaptiveHeight: !1, adaptiveHeightSpeed: 500, video: !1, useCSS: !0, preloadImages: "visible", responsive: !0, slideZIndex: 50, touchEnabled: !0, swipeThreshold: 50, oneToOneTouch: !0, preventDefaultSwipeX: !0, preventDefaultSwipeY: !1, pager: !0, pagerType: "full", pagerShortSeparator: " / ", pagerSelector: null, buildPager: null, pagerCustom: null, controls: !0, nextText: "Next", prevText: "Prev", nextSelector: null, prevSelector: null, autoControls: !1, startText: "Start", stopText: "Stop", autoControlsCombine: !1, autoControlsSelector: null, auto: !1, pause: 4e3, autoStart: !0, autoDirection: "next", autoHover: !1, autoDelay: 0, minSlides: 1, maxSlides: 1, moveSlides: 0, slideWidth: 0, onSliderLoad: function() {
        }, onSlideBefore: function() {
        }, onSlideAfter: function() {
        }, onSlideNext: function() {
        }, onSlidePrev: function() {
        }, onSliderResize: function() {
        }};
    t.fn.bxSlider = function(n) {
        if (0 == this.length)
            return this;
        if (this.length > 1)
            return this.each(function() {
                t(this).bxSlider(n)
            }), this;
        var o = {}, r = this;
        e.el = this;
        var a = t(window).width(), l = t(window).height(), d = function() {
            o.settings = t.extend({}, s, n), o.settings.slideWidth = parseInt(o.settings.slideWidth), o.children = r.children(o.settings.slideSelector), o.children.length < o.settings.minSlides && (o.settings.minSlides = o.children.length), o.children.length < o.settings.maxSlides && (o.settings.maxSlides = o.children.length), o.settings.randomStart && (o.settings.startSlide = Math.floor(Math.random() * o.children.length)), o.active = {index: o.settings.startSlide}, o.carousel = o.settings.minSlides > 1 || o.settings.maxSlides > 1, o.carousel && (o.settings.preloadImages = "all"), o.minThreshold = o.settings.minSlides * o.settings.slideWidth + (o.settings.minSlides - 1) * o.settings.slideMargin, o.maxThreshold = o.settings.maxSlides * o.settings.slideWidth + (o.settings.maxSlides - 1) * o.settings.slideMargin, o.working = !1, o.controls = {}, o.interval = null, o.animProp = "vertical" == o.settings.mode ? "top" : "left", o.usingCSS = o.settings.useCSS && "fade" != o.settings.mode && function() {
                var t = document.createElement("div"), e = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                for (var i in e)
                    if (void 0 !== t.style[e[i]])
                        return o.cssPrefix = e[i].replace("Perspective", "").toLowerCase(), o.animProp = "-" + o.cssPrefix + "-transform", !0;
                return!1
            }(), "vertical" == o.settings.mode && (o.settings.maxSlides = o.settings.minSlides), r.data("origStyle", r.attr("style")), r.children(o.settings.slideSelector).each(function() {
                t(this).data("origStyle", t(this).attr("style"))
            }), c()
        }, c = function() {
            r.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'), o.viewport = r.parent(), o.loader = t('<div class="bx-loading" />'), o.viewport.prepend(o.loader), r.css({width: "horizontal" == o.settings.mode ? 100 * o.children.length + 215 + "%" : "auto", position: "relative"}), o.usingCSS && o.settings.easing ? r.css("-" + o.cssPrefix + "-transition-timing-function", o.settings.easing) : o.settings.easing || (o.settings.easing = "swing"), f(), o.viewport.css({width: "100%", overflow: "hidden", position: "relative"}), o.viewport.parent().css({maxWidth: p()}), o.settings.pager || o.viewport.parent().css({margin: "0 auto 0px"}), o.children.css({"float": "horizontal" == o.settings.mode ? "left" : "none", listStyle: "none", position: "relative"}), o.children.css("width", u()), "horizontal" == o.settings.mode && o.settings.slideMargin > 0 && o.children.css("marginRight", o.settings.slideMargin), "vertical" == o.settings.mode && o.settings.slideMargin > 0 && o.children.css("marginBottom", o.settings.slideMargin), "fade" == o.settings.mode && (o.children.css({position: "absolute", zIndex: 0, display: "none"}), o.children.eq(o.settings.startSlide).css({zIndex: o.settings.slideZIndex, display: "block"})), o.controls.el = t('<div class="bx-controls" />'), o.settings.captions && P(), o.active.last = o.settings.startSlide == x() - 1, o.settings.video && r.fitVids();
            var e = o.children.eq(o.settings.startSlide);
            "all" == o.settings.preloadImages && (e = o.children), o.settings.ticker ? o.settings.pager = !1 : (o.settings.pager && T(), o.settings.controls && C(), o.settings.auto && o.settings.autoControls && E(), (o.settings.controls || o.settings.autoControls || o.settings.pager) && o.viewport.after(o.controls.el)), g(e, h)
        }, g = function(e, i) {
            var s = e.find("img, iframe").length;
            if (0 == s)
                return i(), void 0;
            var n = 0;
            e.find("img, iframe").each(function() {
                t(this).one("load", function() {
                    ++n == s && i()
                }).each(function() {
                    this.complete && t(this).load()
                })
            })
        }, h = function() {
            if (o.settings.infiniteLoop && "fade" != o.settings.mode && !o.settings.ticker) {
                var e = "vertical" == o.settings.mode ? o.settings.minSlides : o.settings.maxSlides, i = o.children.slice(0, e).clone().addClass("bx-clone"), s = o.children.slice(-e).clone().addClass("bx-clone");
                r.append(i).prepend(s)
            }
            o.loader.remove(), S(), "vertical" == o.settings.mode && (o.settings.adaptiveHeight = !0), o.viewport.height(v()), r.redrawSlider(), o.settings.onSliderLoad(o.active.index), o.initialized = !0, o.settings.responsive && t(window).bind("resize", Z), o.settings.auto && o.settings.autoStart && H(), o.settings.ticker && L(), o.settings.pager && q(o.settings.startSlide), o.settings.controls && W(), o.settings.touchEnabled && !o.settings.ticker && O()
        }, v = function() {
            var e = 0, s = t();
            if ("vertical" == o.settings.mode || o.settings.adaptiveHeight)
                if (o.carousel) {
                    var n = 1 == o.settings.moveSlides ? o.active.index : o.active.index * m();
                    for (s = o.children.eq(n), i = 1; i <= o.settings.maxSlides - 1; i++)
                        s = n + i >= o.children.length ? s.add(o.children.eq(i - 1)) : s.add(o.children.eq(n + i))
                } else
                    s = o.children.eq(o.active.index);
            else
                s = o.children;
            return"vertical" == o.settings.mode ? (s.each(function() {
                e += t(this).outerHeight()
            }), o.settings.slideMargin > 0 && (e += o.settings.slideMargin * (o.settings.minSlides - 1))) : e = Math.max.apply(Math, s.map(function() {
                return t(this).outerHeight(!1)
            }).get()), e
        }, p = function() {
            var t = "100%";
            return o.settings.slideWidth > 0 && (t = "horizontal" == o.settings.mode ? o.settings.maxSlides * o.settings.slideWidth + (o.settings.maxSlides - 1) * o.settings.slideMargin : o.settings.slideWidth), t
        }, u = function() {
            var t = o.settings.slideWidth, e = o.viewport.width();
            return 0 == o.settings.slideWidth || o.settings.slideWidth > e && !o.carousel || "vertical" == o.settings.mode ? t = e : o.settings.maxSlides > 1 && "horizontal" == o.settings.mode && (e > o.maxThreshold || e < o.minThreshold && (t = (e - o.settings.slideMargin * (o.settings.minSlides - 1)) / o.settings.minSlides)), t
        }, f = function() {
            var t = 1;
            if ("horizontal" == o.settings.mode && o.settings.slideWidth > 0)
                if (o.viewport.width() < o.minThreshold)
                    t = o.settings.minSlides;
                else if (o.viewport.width() > o.maxThreshold)
                    t = o.settings.maxSlides;
                else {
                    var e = o.children.first().width();
                    t = Math.floor(o.viewport.width() / e)
                }
            else
                "vertical" == o.settings.mode && (t = o.settings.minSlides);
            return t
        }, x = function() {
            var t = 0;
            if (o.settings.moveSlides > 0)
                if (o.settings.infiniteLoop)
                    t = o.children.length / m();
                else
                    for (var e = 0, i = 0; e < o.children.length; )
                        ++t, e = i + f(), i += o.settings.moveSlides <= f() ? o.settings.moveSlides : f();
            else
                t = Math.ceil(o.children.length / f());
            return t
        }, m = function() {
            return o.settings.moveSlides > 0 && o.settings.moveSlides <= f() ? o.settings.moveSlides : f()
        }, S = function() {
            if (o.children.length > o.settings.maxSlides && o.active.last && !o.settings.infiniteLoop) {
                if ("horizontal" == o.settings.mode) {
                    var t = o.children.last(), e = t.position();
                    b(-(e.left - (o.viewport.width() - t.width())), "reset", 0)
                } else if ("vertical" == o.settings.mode) {
                    var i = o.children.length - o.settings.minSlides, e = o.children.eq(i).position();
                    b(-e.top, "reset", 0)
                }
            } else {
                var e = o.children.eq(o.active.index * m()).position();
                o.active.index == x() - 1 && (o.active.last = !0), void 0 != e && ("horizontal" == o.settings.mode ? b(-e.left, "reset", 0) : "vertical" == o.settings.mode && b(-e.top, "reset", 0))
            }
        }, b = function(t, e, i, s) {
            if (o.usingCSS) {
                var n = "vertical" == o.settings.mode ? "translate3d(0, " + t + "px, 0)" : "translate3d(" + t + "px, 0, 0)";
                r.css("-" + o.cssPrefix + "-transition-duration", i / 1e3 + "s"), "slide" == e ? (r.css(o.animProp, n), r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                    r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), D()
                })) : "reset" == e ? r.css(o.animProp, n) : "ticker" == e && (r.css("-" + o.cssPrefix + "-transition-timing-function", "linear"), r.css(o.animProp, n), r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                    r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), b(s.resetValue, "reset", 0), N()
                }))
            } else {
                var a = {};
                a[o.animProp] = t, "slide" == e ? r.animate(a, i, o.settings.easing, function() {
                    D()
                }) : "reset" == e ? r.css(o.animProp, t) : "ticker" == e && r.animate(a, speed, "linear", function() {
                    b(s.resetValue, "reset", 0), N()
                })
            }
        }, w = function() {
            for (var e = "", i = x(), s = 0; i > s; s++) {
                var n = "";
                o.settings.buildPager && t.isFunction(o.settings.buildPager) ? (n = o.settings.buildPager(s), o.pagerEl.addClass("bx-custom-pager")) : (n = s + 1, o.pagerEl.addClass("bx-default-pager")), e += '<div class="bx-pager-item"><a href="" data-slide-index="' + s + '" class="bx-pager-link">' + n + "</a></div>"
            }
            o.pagerEl.html(e)
        }, T = function() {
            o.settings.pagerCustom ? o.pagerEl = t(o.settings.pagerCustom) : (o.pagerEl = t('<div class="bx-pager" />'), o.settings.pagerSelector ? t(o.settings.pagerSelector).html(o.pagerEl) : o.controls.el.addClass("bx-has-pager").append(o.pagerEl), w()), o.pagerEl.on("click", "a", I)
        }, C = function() {
            o.controls.next = t('<a class="bx-next" href="">' + o.settings.nextText + "</a>"), o.controls.prev = t('<a class="bx-prev" href="">' + o.settings.prevText + "</a>"), o.controls.next.bind("click", y), o.controls.prev.bind("click", z), o.settings.nextSelector && t(o.settings.nextSelector).append(o.controls.next), o.settings.prevSelector && t(o.settings.prevSelector).append(o.controls.prev), o.settings.nextSelector || o.settings.prevSelector || (o.controls.directionEl = t('<div class="bx-controls-direction" />'), o.controls.directionEl.append(o.controls.prev).append(o.controls.next), o.controls.el.addClass("bx-has-controls-direction").append(o.controls.directionEl))
        }, E = function() {
            o.controls.start = t('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + o.settings.startText + "</a></div>"), o.controls.stop = t('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + o.settings.stopText + "</a></div>"), o.controls.autoEl = t('<div class="bx-controls-auto" />'), o.controls.autoEl.on("click", ".bx-start", k), o.controls.autoEl.on("click", ".bx-stop", M), o.settings.autoControlsCombine ? o.controls.autoEl.append(o.controls.start) : o.controls.autoEl.append(o.controls.start).append(o.controls.stop), o.settings.autoControlsSelector ? t(o.settings.autoControlsSelector).html(o.controls.autoEl) : o.controls.el.addClass("bx-has-controls-auto").append(o.controls.autoEl), A(o.settings.autoStart ? "stop" : "start")
        }, P = function() {
            o.children.each(function() {
                var e = t(this).find("img:first").attr("title");
                void 0 != e && ("" + e).length && t(this).append('<div class="bx-caption"><span>' + e + "</span></div>")
            })
        }, y = function(t) {
            o.settings.auto && r.stopAuto(), r.goToNextSlide(), t.preventDefault()
        }, z = function(t) {
            o.settings.auto && r.stopAuto(), r.goToPrevSlide(), t.preventDefault()
        }, k = function(t) {
            r.startAuto(), t.preventDefault()
        }, M = function(t) {
            r.stopAuto(), t.preventDefault()
        }, I = function(e) {
            o.settings.auto && r.stopAuto();
            var i = t(e.currentTarget), s = parseInt(i.attr("data-slide-index"));
            s != o.active.index && r.goToSlide(s), e.preventDefault()
        }, q = function(e) {
            var i = o.children.length;
            return"short" == o.settings.pagerType ? (o.settings.maxSlides > 1 && (i = Math.ceil(o.children.length / o.settings.maxSlides)), o.pagerEl.html(e + 1 + o.settings.pagerShortSeparator + i), void 0) : (o.pagerEl.find("a").removeClass("active"), o.pagerEl.each(function(i, s) {
                t(s).find("a").eq(e).addClass("active")
            }), void 0)
        }, D = function() {
            if (o.settings.infiniteLoop) {
                var t = "";
                0 == o.active.index ? t = o.children.eq(0).position() : o.active.index == x() - 1 && o.carousel ? t = o.children.eq((x() - 1) * m()).position() : o.active.index == o.children.length - 1 && (t = o.children.eq(o.children.length - 1).position()), t && ("horizontal" == o.settings.mode ? b(-t.left, "reset", 0) : "vertical" == o.settings.mode && b(-t.top, "reset", 0))
            }
            o.working = !1, o.settings.onSlideAfter(o.children.eq(o.active.index), o.oldIndex, o.active.index)
        }, A = function(t) {
            o.settings.autoControlsCombine ? o.controls.autoEl.html(o.controls[t]) : (o.controls.autoEl.find("a").removeClass("active"), o.controls.autoEl.find("a:not(.bx-" + t + ")").addClass("active"))
        }, W = function() {
            1 == x() ? (o.controls.prev.addClass("disabled"), o.controls.next.addClass("disabled")) : !o.settings.infiniteLoop && o.settings.hideControlOnEnd && (0 == o.active.index ? (o.controls.prev.addClass("disabled"), o.controls.next.removeClass("disabled")) : o.active.index == x() - 1 ? (o.controls.next.addClass("disabled"), o.controls.prev.removeClass("disabled")) : (o.controls.prev.removeClass("disabled"), o.controls.next.removeClass("disabled")))
        }, H = function() {
            o.settings.autoDelay > 0 ? setTimeout(r.startAuto, o.settings.autoDelay) : r.startAuto(), o.settings.autoHover && r.hover(function() {
                o.interval && (r.stopAuto(!0), o.autoPaused = !0)
            }, function() {
                o.autoPaused && (r.startAuto(!0), o.autoPaused = null)
            })
        }, L = function() {
            var e = 0;
            if ("next" == o.settings.autoDirection)
                r.append(o.children.clone().addClass("bx-clone"));
            else {
                r.prepend(o.children.clone().addClass("bx-clone"));
                var i = o.children.first().position();
                e = "horizontal" == o.settings.mode ? -i.left : -i.top
            }
            b(e, "reset", 0), o.settings.pager = !1, o.settings.controls = !1, o.settings.autoControls = !1, o.settings.tickerHover && !o.usingCSS && o.viewport.hover(function() {
                r.stop()
            }, function() {
                var e = 0;
                o.children.each(function() {
                    e += "horizontal" == o.settings.mode ? t(this).outerWidth(!0) : t(this).outerHeight(!0)
                });
                var i = o.settings.speed / e, s = "horizontal" == o.settings.mode ? "left" : "top", n = i * (e - Math.abs(parseInt(r.css(s))));
                N(n)
            }), N()
        }, N = function(t) {
            speed = t ? t : o.settings.speed;
            var e = {left: 0, top: 0}, i = {left: 0, top: 0};
            "next" == o.settings.autoDirection ? e = r.find(".bx-clone").first().position() : i = o.children.first().position();
            var s = "horizontal" == o.settings.mode ? -e.left : -e.top, n = "horizontal" == o.settings.mode ? -i.left : -i.top, a = {resetValue: n};
            b(s, "ticker", speed, a)
        }, O = function() {
            o.touch = {start: {x: 0, y: 0}, end: {x: 0, y: 0}}, o.viewport.bind("touchstart", X)
        }, X = function(t) {
            if (o.working)
                t.preventDefault();
            else {
                o.touch.originalPos = r.position();
                var e = t.originalEvent;
                o.touch.start.x = e.changedTouches[0].pageX, o.touch.start.y = e.changedTouches[0].pageY, o.viewport.bind("touchmove", Y), o.viewport.bind("touchend", V)
            }
        }, Y = function(t) {
            var e = t.originalEvent, i = Math.abs(e.changedTouches[0].pageX - o.touch.start.x), s = Math.abs(e.changedTouches[0].pageY - o.touch.start.y);
            if (3 * i > s && o.settings.preventDefaultSwipeX ? t.preventDefault() : 3 * s > i && o.settings.preventDefaultSwipeY && t.preventDefault(), "fade" != o.settings.mode && o.settings.oneToOneTouch) {
                var n = 0;
                if ("horizontal" == o.settings.mode) {
                    var r = e.changedTouches[0].pageX - o.touch.start.x;
                    n = o.touch.originalPos.left + r
                } else {
                    var r = e.changedTouches[0].pageY - o.touch.start.y;
                    n = o.touch.originalPos.top + r
                }
                b(n, "reset", 0)
            }
        }, V = function(t) {
            o.viewport.unbind("touchmove", Y);
            var e = t.originalEvent, i = 0;
            if (o.touch.end.x = e.changedTouches[0].pageX, o.touch.end.y = e.changedTouches[0].pageY, "fade" == o.settings.mode) {
                var s = Math.abs(o.touch.start.x - o.touch.end.x);
                s >= o.settings.swipeThreshold && (o.touch.start.x > o.touch.end.x ? r.goToNextSlide() : r.goToPrevSlide(), r.stopAuto())
            } else {
                var s = 0;
                "horizontal" == o.settings.mode ? (s = o.touch.end.x - o.touch.start.x, i = o.touch.originalPos.left) : (s = o.touch.end.y - o.touch.start.y, i = o.touch.originalPos.top), !o.settings.infiniteLoop && (0 == o.active.index && s > 0 || o.active.last && 0 > s) ? b(i, "reset", 200) : Math.abs(s) >= o.settings.swipeThreshold ? (0 > s ? r.goToNextSlide() : r.goToPrevSlide(), r.stopAuto()) : b(i, "reset", 200)
            }
            o.viewport.unbind("touchend", V)
        }, Z = function() {
            var e = t(window).width(), i = t(window).height();
            (a != e || l != i) && (a = e, l = i, r.redrawSlider(), o.settings.onSliderResize.call(r, o.active.index))
        };
        return r.goToSlide = function(e, i) {
            if (!o.working && o.active.index != e)
                if (o.working = !0, o.oldIndex = o.active.index, o.active.index = 0 > e ? x() - 1 : e >= x() ? 0 : e, o.settings.onSlideBefore(o.children.eq(o.active.index), o.oldIndex, o.active.index), "next" == i ? o.settings.onSlideNext(o.children.eq(o.active.index), o.oldIndex, o.active.index) : "prev" == i && o.settings.onSlidePrev(o.children.eq(o.active.index), o.oldIndex, o.active.index), o.active.last = o.active.index >= x() - 1, o.settings.pager && q(o.active.index), o.settings.controls && W(), "fade" == o.settings.mode)
                    o.settings.adaptiveHeight && o.viewport.height() != v() && o.viewport.animate({height: v()}, o.settings.adaptiveHeightSpeed), o.children.filter(":visible").fadeOut(o.settings.speed).css({zIndex: 0}), o.children.eq(o.active.index).css("zIndex", o.settings.slideZIndex + 1).fadeIn(o.settings.speed, function() {
                        t(this).css("zIndex", o.settings.slideZIndex), D()
                    });
                else {
                    o.settings.adaptiveHeight && o.viewport.height() != v() && o.viewport.animate({height: v()}, o.settings.adaptiveHeightSpeed);
                    var s = 0, n = {left: 0, top: 0};
                    if (!o.settings.infiniteLoop && o.carousel && o.active.last)
                        if ("horizontal" == o.settings.mode) {
                            var a = o.children.eq(o.children.length - 1);
                            n = a.position(), s = o.viewport.width() - a.outerWidth()
                        } else {
                            var l = o.children.length - o.settings.minSlides;
                            n = o.children.eq(l).position()
                        }
                    else if (o.carousel && o.active.last && "prev" == i) {
                        var d = 1 == o.settings.moveSlides ? o.settings.maxSlides - m() : (x() - 1) * m() - (o.children.length - o.settings.maxSlides), a = r.children(".bx-clone").eq(d);
                        n = a.position()
                    } else if ("next" == i && 0 == o.active.index)
                        n = r.find("> .bx-clone").eq(o.settings.maxSlides).position(), o.active.last = !1;
                    else if (e >= 0) {
                        var c = e * m();
                        n = o.children.eq(c).position()
                    }
                    if ("undefined" != typeof n) {
                        var g = "horizontal" == o.settings.mode ? -(n.left - s) : -n.top;
                        b(g, "slide", o.settings.speed)
                    }
                }
        }, r.goToNextSlide = function() {
            if (o.settings.infiniteLoop || !o.active.last) {
                var t = parseInt(o.active.index) + 1;
                r.goToSlide(t, "next")
            }
        }, r.goToPrevSlide = function() {
            if (o.settings.infiniteLoop || 0 != o.active.index) {
                var t = parseInt(o.active.index) - 1;
                r.goToSlide(t, "prev")
            }
        }, r.startAuto = function(t) {
            o.interval || (o.interval = setInterval(function() {
                "next" == o.settings.autoDirection ? r.goToNextSlide() : r.goToPrevSlide()
            }, o.settings.pause), o.settings.autoControls && 1 != t && A("stop"))
        }, r.stopAuto = function(t) {
            o.interval && (clearInterval(o.interval), o.interval = null, o.settings.autoControls && 1 != t && A("start"))
        }, r.getCurrentSlide = function() {
            return o.active.index
        }, r.getCurrentSlideElement = function() {
            return o.children.eq(o.active.index)
        }, r.getSlideCount = function() {
            return o.children.length
        }, r.redrawSlider = function() {
            o.children.add(r.find(".bx-clone")).outerWidth(u()), o.viewport.css("height", v()), o.settings.ticker || S(), o.active.last && (o.active.index = x() - 1), o.active.index >= x() && (o.active.last = !0), o.settings.pager && !o.settings.pagerCustom && (w(), q(o.active.index))
        }, r.destroySlider = function() {
            o.initialized && (o.initialized = !1, t(".bx-clone", this).remove(), o.children.each(function() {
                void 0 != t(this).data("origStyle") ? t(this).attr("style", t(this).data("origStyle")) : t(this).removeAttr("style")
            }), void 0 != t(this).data("origStyle") ? this.attr("style", t(this).data("origStyle")) : t(this).removeAttr("style"), t(this).unwrap().unwrap(), o.controls.el && o.controls.el.remove(), o.controls.next && o.controls.next.remove(), o.controls.prev && o.controls.prev.remove(), o.pagerEl && o.settings.controls && o.pagerEl.remove(), t(".bx-caption", this).remove(), o.controls.autoEl && o.controls.autoEl.remove(), clearInterval(o.interval), o.settings.responsive && t(window).unbind("resize", Z))
        }, r.reloadSlider = function(t) {
            void 0 != t && (n = t), r.destroySlider(), d()
        }, d(), this
    }
}(jQuery);
/*!
 * jQuery Raty - A Star Rating Plugin
 *
 * The MIT License
 *
 * @author  : Washington Botelho
 * @doc     : http://wbotelhos.com/raty
 * @version : 2.7.0
 *
 */


;
(function($) {
    'use strict';

    var methods = {
        init: function(options) {
            return this.each(function() {
                this.self = $(this);

                methods.destroy.call(this.self);

                this.opt = $.extend(true, {}, $.fn.raty.defaults, options);

                methods._adjustCallback.call(this);
                methods._adjustNumber.call(this);
                methods._adjustHints.call(this);

                this.opt.score = methods._adjustedScore.call(this, this.opt.score);

                if (this.opt.starType !== 'img') {
                    methods._adjustStarType.call(this);
                }

                methods._adjustPath.call(this);
                methods._createStars.call(this);

                if (this.opt.cancel) {
                    methods._createCancel.call(this);
                }

                if (this.opt.precision) {
                    methods._adjustPrecision.call(this);
                }

                methods._createScore.call(this);
                methods._apply.call(this, this.opt.score);
                methods._setTitle.call(this, this.opt.score);
                methods._target.call(this, this.opt.score);

                if (this.opt.readOnly) {
                    methods._lock.call(this);
                } else {
                    this.style.cursor = 'pointer';

                    methods._binds.call(this);
                }
            });
        },
        _adjustCallback: function() {
            var options = ['number', 'readOnly', 'score', 'scoreName', 'target'];

            for (var i = 0; i < options.length; i++) {
                if (typeof this.opt[options[i]] === 'function') {
                    this.opt[options[i]] = this.opt[options[i]].call(this);
                }
            }
        },
        _adjustedScore: function(score) {
            if (!score) {
                return score;
            }

            return methods._between(score, 0, this.opt.number);
        },
        _adjustHints: function() {
            if (!this.opt.hints) {
                this.opt.hints = [];
            }

            if (!this.opt.halfShow && !this.opt.half) {
                return;
            }

            var steps = this.opt.precision ? 10 : 2;

            for (var i = 0; i < this.opt.number; i++) {
                var group = this.opt.hints[i];

                if (Object.prototype.toString.call(group) !== '[object Array]') {
                    group = [group];
                }

                this.opt.hints[i] = [];

                for (var j = 0; j < steps; j++) {
                    var
                            hint = group[j],
                            last = group[group.length - 1];

                    if (last === undefined) {
                        last = null;
                    }

                    this.opt.hints[i][j] = hint === undefined ? last : hint;
                }
            }
        },
        _adjustNumber: function() {
            this.opt.number = methods._between(this.opt.number, 1, this.opt.numberMax);
        },
        _adjustPath: function() {
            this.opt.path = this.opt.path || '';

            if (this.opt.path && this.opt.path.charAt(this.opt.path.length - 1) !== '/') {
                this.opt.path += '/';
            }
        },
        _adjustPrecision: function() {
            this.opt.half = true;
        },
        _adjustStarType: function() {
            var replaces = ['cancelOff', 'cancelOn', 'starHalf', 'starOff', 'starOn'];

            this.opt.path = '';

            for (var i = 0; i < replaces.length; i++) {
                this.opt[replaces[i]] = this.opt[replaces[i]].replace('.', '-');
            }
        },
        _apply: function(score) {
            methods._fill.call(this, score);

            if (score) {
                if (score > 0) {
                    this.score.val(score);
                }

                methods._roundStars.call(this, score);
            }
        },
        _between: function(value, min, max) {
            return Math.min(Math.max(parseFloat(value), min), max);
        },
        _binds: function() {
            if (this.cancel) {
                methods._bindOverCancel.call(this);
                methods._bindClickCancel.call(this);
                methods._bindOutCancel.call(this);
            }

            methods._bindOver.call(this);
            methods._bindClick.call(this);
            methods._bindOut.call(this);
        },
        _bindClick: function() {
            var that = this;

            that.stars.on('click.raty', function(evt) {
                var
                        execute = true,
                        score = (that.opt.half || that.opt.precision) ? that.self.data('score') : (this.alt || $(this).data('alt'));

                if (that.opt.click) {
                    execute = that.opt.click.call(that, +score, evt);
                }

                if (execute || execute === undefined) {
                    if (that.opt.half && !that.opt.precision) {
                        score = methods._roundHalfScore.call(that, score);
                    }

                    methods._apply.call(that, score);
                }
            });
        },
        _bindClickCancel: function() {
            var that = this;

            that.cancel.on('click.raty', function(evt) {
                that.score.removeAttr('value');

                if (that.opt.click) {
                    that.opt.click.call(that, null, evt);
                }
            });
        },
        _bindOut: function() {
            var that = this;

            that.self.on('mouseleave.raty', function(evt) {
                var score = +that.score.val() || undefined;

                methods._apply.call(that, score);
                methods._target.call(that, score, evt);
                methods._resetTitle.call(that);

                if (that.opt.mouseout) {
                    that.opt.mouseout.call(that, score, evt);
                }
            });
        },
        _bindOutCancel: function() {
            var that = this;

            that.cancel.on('mouseleave.raty', function(evt) {
                var icon = that.opt.cancelOff;

                if (that.opt.starType !== 'img') {
                    icon = that.opt.cancelClass + ' ' + icon;
                }

                methods._setIcon.call(that, this, icon);

                if (that.opt.mouseout) {
                    var score = +that.score.val() || undefined;

                    that.opt.mouseout.call(that, score, evt);
                }
            });
        },
        _bindOver: function() {
            var that = this,
                    action = that.opt.half ? 'mousemove.raty' : 'mouseover.raty';

            that.stars.on(action, function(evt) {
                var score = methods._getScoreByPosition.call(that, evt, this);

                methods._fill.call(that, score);

                if (that.opt.half) {
                    methods._roundStars.call(that, score, evt);
                    methods._setTitle.call(that, score, evt);

                    that.self.data('score', score);
                }

                methods._target.call(that, score, evt);

                if (that.opt.mouseover) {
                    that.opt.mouseover.call(that, score, evt);
                }
            });
        },
        _bindOverCancel: function() {
            var that = this;

            that.cancel.on('mouseover.raty', function(evt) {
                var
                        starOff = that.opt.path + that.opt.starOff,
                        icon = that.opt.cancelOn;

                if (that.opt.starType === 'img') {
                    that.stars.attr('src', starOff);
                } else {
                    icon = that.opt.cancelClass + ' ' + icon;

                    that.stars.attr('class', starOff);
                }

                methods._setIcon.call(that, this, icon);
                methods._target.call(that, null, evt);

                if (that.opt.mouseover) {
                    that.opt.mouseover.call(that, null);
                }
            });
        },
        _buildScoreField: function() {
            return $('<input />', {name: this.opt.scoreName, type: 'hidden'}).appendTo(this);
        },
        _createCancel: function() {
            var icon = this.opt.path + this.opt.cancelOff,
                    cancel = $('<' + this.opt.starType + ' />', {title: this.opt.cancelHint, 'class': this.opt.cancelClass});

            if (this.opt.starType === 'img') {
                cancel.attr({src: icon, alt: 'x'});
            } else {
                // TODO: use $.data
                cancel.attr('data-alt', 'x').addClass(icon);
            }

            if (this.opt.cancelPlace === 'left') {
                this.self.prepend('&#160;').prepend(cancel);
            } else {
                this.self.append('&#160;').append(cancel);
            }

            this.cancel = cancel;
        },
        _createScore: function() {
            var score = $(this.opt.targetScore);

            this.score = score.length ? score : methods._buildScoreField.call(this);
        },
        _createStars: function() {
            for (var i = 1; i <= this.opt.number; i++) {
                var
                        name = methods._nameForIndex.call(this, i),
                        attrs = {alt: i, src: this.opt.path + this.opt[name]};

                if (this.opt.starType !== 'img') {
                    attrs = {'data-alt': i, 'class': attrs.src}; // TODO: use $.data.
                }

                attrs.title = methods._getHint.call(this, i);

                $('<' + this.opt.starType + ' />', attrs).appendTo(this);

                if (this.opt.space) {
                    this.self.append(i < this.opt.number ? '&#160;' : '');
                }
            }

            this.stars = this.self.children(this.opt.starType);
        },
        _error: function(message) {
            $(this).text(message);

            $.error(message);
        },
        _fill: function(score) {
            var hash = 0;

            for (var i = 1; i <= this.stars.length; i++) {
                var
                        icon,
                        star = this.stars[i - 1],
                        turnOn = methods._turnOn.call(this, i, score);

                if (this.opt.iconRange && this.opt.iconRange.length > hash) {
                    var irange = this.opt.iconRange[hash];

                    icon = methods._getRangeIcon.call(this, irange, turnOn);

                    if (i <= irange.range) {
                        methods._setIcon.call(this, star, icon);
                    }

                    if (i === irange.range) {
                        hash++;
                    }
                } else {
                    icon = this.opt[turnOn ? 'starOn' : 'starOff'];

                    methods._setIcon.call(this, star, icon);
                }
            }
        },
        _getFirstDecimal: function(number) {
            var
                    decimal = number.toString().split('.')[1],
                    result = 0;

            if (decimal) {
                result = parseInt(decimal.charAt(0), 10);

                if (decimal.slice(1, 5) === '9999') {
                    result++;
                }
            }

            return result;
        },
        _getRangeIcon: function(irange, turnOn) {
            return turnOn ? irange.on || this.opt.starOn : irange.off || this.opt.starOff;
        },
        _getScoreByPosition: function(evt, icon) {
            var score = parseInt(icon.alt || icon.getAttribute('data-alt'), 10);

            if (this.opt.half) {
                var
                        size = methods._getWidth.call(this),
                        percent = parseFloat((evt.pageX - $(icon).offset().left) / size);

                score = score - 1 + percent;
            }

            return score;
        },
        _getHint: function(score, evt) {
            if (score !== 0 && !score) {
                return this.opt.noRatedMsg;
            }

            var
                    decimal = methods._getFirstDecimal.call(this, score),
                    integer = Math.ceil(score),
                    group = this.opt.hints[(integer || 1) - 1],
                    hint = group,
                    set = !evt || this.move;

            if (this.opt.precision) {
                if (set) {
                    decimal = decimal === 0 ? 9 : decimal - 1;
                }

                hint = group[decimal];
            } else if (this.opt.halfShow || this.opt.half) {
                decimal = set && decimal === 0 ? 1 : decimal > 5 ? 1 : 0;

                hint = group[decimal];
            }

            return hint === '' ? '' : hint || score;
        },
        _getWidth: function() {
            var width = this.stars[0].width || parseFloat(this.stars.eq(0).css('font-size'));

            if (!width) {
                methods._error.call(this, 'Could not get the icon width!');
            }

            return width;
        },
        _lock: function() {
            var hint = methods._getHint.call(this, this.score.val());

            this.style.cursor = '';
            this.title = hint;

            this.score.prop('readonly', true);
            this.stars.prop('title', hint);

            if (this.cancel) {
                this.cancel.hide();
            }

            this.self.data('readonly', true);
        },
        _nameForIndex: function(i) {
            return this.opt.score && this.opt.score >= i ? 'starOn' : 'starOff';
        },
        _resetTitle: function(star) {
            for (var i = 0; i < this.opt.number; i++) {
                this.stars[i].title = methods._getHint.call(this, i + 1);
            }
        },
        _roundHalfScore: function(score) {
            var integer = parseInt(score, 10),
                    decimal = methods._getFirstDecimal.call(this, score);

            if (decimal !== 0) {
                decimal = decimal > 5 ? 1 : 0.5;
            }

            return integer + decimal;
        },
        _roundStars: function(score, evt) {
            var
                    decimal = (score % 1).toFixed(2),
                    name;

            if (evt || this.move) {
                name = decimal > 0.5 ? 'starOn' : 'starHalf';
            } else if (decimal > this.opt.round.down) {               // Up:   [x.76 .. x.99]
                name = 'starOn';

                if (this.opt.halfShow && decimal < this.opt.round.up) { // Half: [x.26 .. x.75]
                    name = 'starHalf';
                } else if (decimal < this.opt.round.full) {             // Down: [x.00 .. x.5]
                    name = 'starOff';
                }
            }

            if (name) {
                var
                        icon = this.opt[name],
                        star = this.stars[Math.ceil(score) - 1];

                methods._setIcon.call(this, star, icon);
            }                                                         // Full down: [x.00 .. x.25]
        },
        _setIcon: function(star, icon) {
            star[this.opt.starType === 'img' ? 'src' : 'className'] = this.opt.path + icon;
        },
        _setTarget: function(target, score) {
            if (score) {
                score = this.opt.targetFormat.toString().replace('{score}', score);
            }

            if (target.is(':input')) {
                target.val(score);
            } else {
                target.html(score);
            }
        },
        _setTitle: function(score, evt) {
            if (score) {
                var
                        integer = parseInt(Math.ceil(score), 10),
                        star = this.stars[integer - 1];

                star.title = methods._getHint.call(this, score, evt);
            }
        },
        _target: function(score, evt) {
            if (this.opt.target) {
                var target = $(this.opt.target);

                if (!target.length) {
                    methods._error.call(this, 'Target selector invalid or missing!');
                }

                var mouseover = evt && evt.type === 'mouseover';

                if (score === undefined) {
                    score = this.opt.targetText;
                } else if (score === null) {
                    score = mouseover ? this.opt.cancelHint : this.opt.targetText;
                } else {
                    if (this.opt.targetType === 'hint') {
                        score = methods._getHint.call(this, score, evt);
                    } else if (this.opt.precision) {
                        score = parseFloat(score).toFixed(1);
                    }

                    var mousemove = evt && evt.type === 'mousemove';

                    if (!mouseover && !mousemove && !this.opt.targetKeep) {
                        score = this.opt.targetText;
                    }
                }

                methods._setTarget.call(this, target, score);
            }
        },
        _turnOn: function(i, score) {
            return this.opt.single ? (i === score) : (i <= score);
        },
        _unlock: function() {
            this.style.cursor = 'pointer';
            this.removeAttribute('title');

            this.score.removeAttr('readonly');

            this.self.data('readonly', false);

            for (var i = 0; i < this.opt.number; i++) {
                this.stars[i].title = methods._getHint.call(this, i + 1);
            }

            if (this.cancel) {
                this.cancel.css('display', '');
            }
        },
        cancel: function(click) {
            return this.each(function() {
                var self = $(this);

                if (self.data('readonly') !== true) {
                    methods[click ? 'click' : 'score'].call(self, null);

                    this.score.removeAttr('value');
                }
            });
        },
        click: function(score) {
            return this.each(function() {
                if ($(this).data('readonly') !== true) {
                    score = methods._adjustedScore.call(this, score);

                    methods._apply.call(this, score);

                    if (this.opt.click) {
                        this.opt.click.call(this, score, $.Event('click'));
                    }

                    methods._target.call(this, score);
                }
            });
        },
        destroy: function() {
            return this.each(function() {
                var self = $(this),
                        raw = self.data('raw');

                if (raw) {
                    self.off('.raty').empty().css({cursor: raw.style.cursor}).removeData('readonly');
                } else {
                    self.data('raw', self.clone()[0]);
                }
            });
        },
        getScore: function() {
            var score = [],
                    value;

            this.each(function() {
                value = this.score.val();

                score.push(value ? +value : undefined);
            });

            return (score.length > 1) ? score : score[0];
        },
        move: function(score) {
            return this.each(function() {
                var
                        integer = parseInt(score, 10),
                        decimal = methods._getFirstDecimal.call(this, score);

                if (integer >= this.opt.number) {
                    integer = this.opt.number - 1;
                    decimal = 10;
                }

                var
                        width = methods._getWidth.call(this),
                        steps = width / 10,
                        star = $(this.stars[integer]),
                        percent = star.offset().left + steps * decimal,
                        evt = $.Event('mousemove', {pageX: percent});

                this.move = true;

                star.trigger(evt);

                this.move = false;
            });
        },
        readOnly: function(readonly) {
            return this.each(function() {
                var self = $(this);

                if (self.data('readonly') !== readonly) {
                    if (readonly) {
                        self.off('.raty').children('img').off('.raty');

                        methods._lock.call(this);
                    } else {
                        methods._binds.call(this);
                        methods._unlock.call(this);
                    }

                    self.data('readonly', readonly);
                }
            });
        },
        reload: function() {
            return methods.set.call(this, {});
        },
        score: function() {
            var self = $(this);

            return arguments.length ? methods.setScore.apply(self, arguments) : methods.getScore.call(self);
        },
        set: function(options) {
            return this.each(function() {
                $(this).raty($.extend({}, this.opt, options));
            });
        },
        setScore: function(score) {
            return this.each(function() {
                if ($(this).data('readonly') !== true) {
                    score = methods._adjustedScore.call(this, score);

                    methods._apply.call(this, score);
                    methods._target.call(this, score);
                }
            });
        }
    };

    $.fn.raty = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist!');
        }
    };

    $.fn.raty.defaults = {
        cancel: false,
        cancelClass: 'raty-cancel',
        cancelHint: 'Cancel this rating!',
        cancelOff: 'cancel-off.png',
        cancelOn: 'cancel-on.png',
        cancelPlace: 'left',
        click: undefined,
        half: false,
        halfShow: true,
        hints: ['bad', 'poor', 'regular', 'good', 'gorgeous'],
        iconRange: undefined,
        mouseout: undefined,
        mouseover: undefined,
        noRatedMsg: 'Not rated yet!',
        number: 5,
        numberMax: 20,
        path: undefined,
        precision: false,
        readOnly: false,
        round: {down: 0.25, full: 0.6, up: 0.76},
        score: undefined,
        scoreName: 'score',
        single: false,
        space: true,
        starHalf: 'star-half.png',
        starOff: 'star-off.png',
        starOn: 'star-on.png',
        starType: 'img',
        target: undefined,
        targetFormat: '{score}',
        targetKeep: false,
        targetScore: undefined,
        targetText: '',
        targetType: 'hint'
    };

})(jQuery);
(function() {


}).call(this);
(function($) {
    window.NestedFormEvents = function() {
        this.addFields = $.proxy(this.addFields, this);
        this.removeFields = $.proxy(this.removeFields, this);
    };

    NestedFormEvents.prototype = {
        addFields: function(e) {
            // Setup
            var link = e.currentTarget;
            var assoc = $(link).data('association');                // Name of child
            var blueprint = $('#' + $(link).data('blueprint-id'));
            var content = blueprint.data('blueprint');                // Fields template

            // Make the context correct by replacing <parents> with the generated ID
            // of each of the parent objects
            var context = ($(link).closest('.fields').closestChild('input, textarea, select').eq(0).attr('name') || '').replace(new RegExp('\[[a-z_]+\]$'), '');

            // context will be something like this for a brand new form:
            // project[tasks_attributes][1255929127459][assignments_attributes][1255929128105]
            // or for an edit form:
            // project[tasks_attributes][0][assignments_attributes][1]
            if (context) {
                var parentNames = context.match(/[a-z_]+_attributes(?=\]\[(new_)?\d+\])/g) || [];
                var parentIds = context.match(/[0-9]+/g) || [];

                for (var i = 0; i < parentNames.length; i++) {
                    if (parentIds[i]) {
                        content = content.replace(
                                new RegExp('(_' + parentNames[i] + ')_.+?_', 'g'),
                                '$1_' + parentIds[i] + '_');

                        content = content.replace(
                                new RegExp('(\\[' + parentNames[i] + '\\])\\[.+?\\]', 'g'),
                                '$1[' + parentIds[i] + ']');
                    }
                }
            }

            // Make a unique ID for the new child
            var regexp = new RegExp('new_' + assoc, 'g');
            var new_id = this.newId();
            content = $.trim(content.replace(regexp, new_id));

            var field = this.insertFields(content, assoc, link);
            // bubble up event upto document (through form)
            field
                    .trigger({type: 'nested:fieldAdded', field: field})
                    .trigger({type: 'nested:fieldAdded:' + assoc, field: field});
            return false;
        },
        newId: function() {
            return new Date().getTime();
        },
        insertFields: function(content, assoc, link) {
            var target = $(link).data('target');
            if (target) {
                return $(content).appendTo($(target));
            } else {
                return $(content).insertBefore(link);
            }
        },
        removeFields: function(e) {
            var $link = $(e.currentTarget),
                    assoc = $link.data('association'); // Name of child to be removed

            var hiddenField = $link.prev('input[type=hidden]');
            hiddenField.val('1');

            var field = $link.closest('.fields');
            field.hide();

            field
                    .trigger({type: 'nested:fieldRemoved', field: field})
                    .trigger({type: 'nested:fieldRemoved:' + assoc, field: field});
            return false;
        }
    };

    window.nestedFormEvents = new NestedFormEvents();
    $(document)
            .delegate('form a.add_nested_fields', 'click', nestedFormEvents.addFields)
            .delegate('form a.remove_nested_fields', 'click', nestedFormEvents.removeFields);
})(jQuery);

// http://plugins.jquery.com/project/closestChild
/*
 * Copyright 2011, Tobias Lindig
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 */
(function($) {
    $.fn.closestChild = function(selector) {
        // breadth first search for the first matched node
        if (selector && selector != '') {
            var queue = [];
            queue.push(this);
            while (queue.length > 0) {
                var node = queue.shift();
                var children = node.children();
                for (var i = 0; i < children.length; ++i) {
                    var child = $(children[i]);
                    if (child.is(selector)) {
                        return child; //well, we found one
                    }
                    queue.push(child);
                }
            }
        }
        return $();//nothing found
    };
})(jQuery);
(function() {


}).call(this);
(function() {


}).call(this);
$.fn.raty.defaults.half = false;
$.fn.raty.defaults.halfShow = true;
$.fn.raty.defaults.path = "/assets";
$.fn.raty.defaults.cancel = false;

$(function(){
$(".star").each(function() {
var $readonly = ($(this).attr('data-readonly') == 'true');
var $half     = ($(this).attr('data-enable-half') == 'true');
var $halfShow = ($(this).attr('data-half-show') == 'true');
var $single   = ($(this).attr('data-single') == 'true');
$(this).raty({
score: function() {
return $(this).attr('data-rating')
},
number: function() {
return $(this).attr('data-star-count')
},
half:        $half,
halfShow:    $halfShow,
single:      $single,
path:        $(this).attr('data-star-path'),
starOn:      $(this).attr('data-star-on'),
starOff:     $(this).attr('data-star-off'),
starHalf:    $(this).attr('data-star-half'),
cancel:      $(this).attr('data-cancel'),
cancelPlace: $(this).attr('data-cancel-place'),
cancelHint:  $(this).attr('data-cancel-hint'),
cancelOn:    $(this).attr('data-cancel-on'),
cancelOff:   $(this).attr('data-cancel-off'),
noRatedMsg:  $(this).attr('data-no-rated-message'),
round:       $(this).attr('data-round'),
space:       $(this).attr('data-space'),
target:      $(this).attr('data-target'),
targetText:  $(this).attr('data-target-text'),
targetType:  $(this).attr('data-target-type'),
targetFormat: $(this).attr('data-target-format'),
targetScoret: $(this).attr('data-target-score'),
readOnly: $readonly,
click: function(score, evt) {
var _this = this;
if (score == null) { score = 0; }
$.post('/rate',
{
score: score,
dimension: $(this).attr('data-dimension'),
id: $(this).attr('data-id'),
klass: $(this).attr('data-classname')
},
function(data) {
if(data) {
// success code goes here ...

if ($(_this).attr('data-disable-after-rate') == 'true') {
$(_this).raty('set', { readOnly: true, score: score });
}
}
});
}
});
});
});
var ready = function() {

    /**
     * When the send message link on our home page is clicked
     * send an ajax request to our rails app with the sender_id and
     * recipient_id
     */

    $('.start-conversation').click(function(e) {
        e.preventDefault();

        var sender_id = $(this).data('sid');
        var recipient_id = $(this).data('rip');

        $.post("/conversations", {sender_id: sender_id, recipient_id: recipient_id}, function(data) {
            chatBox.chatWith(data.conversation_id);
        });
    });

    /**
     * Used to minimize the chatbox
     */

    $(document).on('click', '.toggleChatBox', function(e) {
        e.preventDefault();

        var id = $(this).data('cid');
        chatBox.toggleChatBoxGrowth(id);
    });

    /**
     * Used to close the chatbox
     */

    $(document).on('click', '.closeChat', function(e) {
        e.preventDefault();

        var id = $(this).data('cid');
        chatBox.close(id);
    });


    /**
     * Listen on keypress' in our chat textarea and call the
     * chatInputKey in chat.js for inspection
     */

    $(document).on('keydown', '.chatboxtextarea', function(event) {

        var id = $(this).data('cid');
        chatBox.checkInputKey(event, $(this), id);
    });

    /**
     * When a conversation link is clicked show up the respective
     * conversation chatbox
     */

    $('a.conversation').click(function(e) {
        e.preventDefault();

        var conversation_id = $(this).data('cid');
        chatBox.chatWith(conversation_id);
    });


}

$(document).ready(ready);
$(document).on("page:load", ready);
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//












$(function() {
    $('.pagination a').click(function() {
        $.get(this.href, null, null, 'script');
        return false;
    });
});

$(document).ready(function() {
    $('#selecctall').click(function(event) {  //on click
        if (this.checked) { // check select status
            $('.check_all').each(function() { //loop through each checkbox
                this.checked = true;  //select all checkboxes with class "checkbox1"
            });
        } else {
            $('.check_all').each(function() { //loop through each checkbox
                this.checked = false; //deselect all checkboxes with class "checkbox1"
            });
        }
    });
});

$(".selectpicker").selectpicker();
