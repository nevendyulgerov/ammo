# AmmoJS
## General purpose utility belt for building front-end applications with JavaScript

Ammo is a light-weight JavaScript utility belt for building lean front-end applications. Ammo offers core functionality for DOM interactions, data manipulation, template rendering, UI state management, event buffering, promises, polling. This library can replace heavy (in-size) libraries like jQuery, as it offers identical helpers without the size overhead.

Ammo is built on top of the ESMAScript 2015 standard. Safe transpiling is possible to older standards like ES5.

Ammo is 30KB in size. Minified version is 8KB. GZipped version is ~3KB. This small package exposes the following public API:

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

// Usage
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

// Usage
ammo.delegateEvent('click', '.my-selector', (e) => {
    console.log(`event delegated to ${e.target}`);
}, document.body);
```
