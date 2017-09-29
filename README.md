# AmmoJS
## General purpose utility belt for building front-end applications with JavaScript

Ammo is a light-weight JavaScript utility belt for building lean front-end applications. Ammo offers core functionality for DOM interactions, data manipulation, template rendering, UI state management, event buffering, promises, polling. This library can replace heavy-in-size libraries like jQuery, as it offers identical helpers without the size overhead.

Ammo is built on top of the ESMAScript 2015 standard. ES5 version of the library is available in this repo.

Ammo is built for people that want a light-weight library for building front-end applications fast. This library has zero dependencies. Ammo utilizes native JS methods. By following this convention ammo can stay very lean and fast.

Ammo encourages using native code to achieve your desired functionality rather than relying on multiple abstraction libraries.

Ammo is 30KB in size and about 1000 lines of code. Minified version is 8KB. GZipped version is ~3KB. This small package exposes the following public API:

```javascript
onDomReady,
delegateEvent,
getClosest,
getClass,
getTag,
getId,
getEl,
filterClass,
append,
appendIn,
prepend,
prependIn,
remove,
each,
filter,
jsonCopy,
isObj,
isNull,
isNum,
isFunc,
isArr,
isStr,
isUndef,
isBool,
hasProp,
hasMethod,
hasKey,
getKeys,
getUrlParam,
randomInclusive,
recurIter,
poll,
buffer,
extend,
compile,
template,
req,
store,
sequence,
app
```

### API Breakdown

#### onDomReady()
```javascript
/**
 * On DOM Ready
 * @param callback
 */

// usage
ammo.onDomReady(() => {
    console.log('DOM ready');
});

```

#### delegateEvent()
```javascript
/**
 * Delegate Event
 * @param {string} event {required}
 * @param {string} className {required}
 * @param {function} callback {required}
 * @param {domElement} context {optional}
 */

// usage
ammo.delegateEvent('click', '.my-selector', (e) => {
    console.log(`event delegated to ${e.target}`);
}, document.body);
```

#### getClosest()
```javascript
/**
 * Get Closest
 * @param {string} selector {required}
 * @param {string} targetSelector {required}
 * @param {domElement} context {optional}
 * @returns {Array}
 */

// usage
let domInnerBox = ammo.getClosest('.inner-box', '.outer-box');
```

#### getClass()
```javascript
/**
 * Get Class
 * @param {string} className {required}
 * @param {string} context {optional}
 * @returns {Array}
 */

 // usage
 let domWidgets = ammo.getClass('widget');
 let domWidgetHeaders = ammo.getClass('widget-header', domWidgets);
```

#### getTag()
```javascript
/**
 * Get Tag
 * @param {string} tagName {required}
 * @param {string} context {optional}
 * @returns {Array}
 */

// usage
let domInputs = ammo.getTag('input');
```

#### getId()
```javascript
/**
 * Get Id
 * @param {string} idName {required}
 * @param {string} context {optional}
 * @returns {Element}
 */

// usage
let domUserJohn = ammo.getId('#user-john');
```

#### getEl()
```javascript
/**
 * Get Element
 * @param {string} selector {required}
 * @param {string} context {optional}
 * @returns {Array}
 */

// usage
let domItems = ammo.getEl('.item');
```

#### filterClass()
```javascript
/**
 * Filter Class
 * @param {string} selector {required}
 * @param {NodeList} els {required}
 * @returns {Array}
 */

// usage
let domItems = ammo.getClass('item', document.body);)
let selectedItems = ammo.filterClass('selected', domItems);
```
