# AmmoJS
## General purpose utility belt for building front-end applications with JavaScript

Ammo is a light-weight utility belt for building lean front-end applications. Ammo offers core functionality for DOM interactions, data manipulation, template rendering, UI state management, event buffering, promises, polling. This library can replace heavy-in-size libraries like jQuery, as it offers identical helpers without the size overhead.

Ammo is built on top of the ESMAScript 2015 standard. ES5 version of the library is available in this repo.

Ammo is built for people that want a light-weight library for building front-end applications fast. This library has zero dependencies and utilizes native JS methods.

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
 * @param {object/DomElement} context {optional}
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
 * @param {object/DomElement} context {optional}
 * @returns {Array/NodeList}
 */

// usage
let domInnerBox = ammo.getClosest('.inner-box', '.outer-box');
```

#### getClass()
```javascript
/**
 * Get Class
 * @param {string} className {required}
 * @param {object/DomElement} context {optional}
 * @returns {Array/NodeList}
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
 * @param {object/DomElement} context {optional}
 * @returns {Array/NodeList}
 */

// usage
let domInputs = ammo.getTag('input');
```

#### getId()
```javascript
/**
 * Get Id
 * @param {string} idName {required}
 * @param {object/DomElement} context {optional}
 * @returns {DomElement}
 */

// usage
let domUserJohn = ammo.getId('#user-john');
```

#### getEl()
```javascript
/**
 * Get Element
 * @param {string} selector {required}
 * @param {DomElement} context {optional}
 * @returns {Array/NodeList}
 */

// usage
let domItems = ammo.getEl('.item');
```

#### filterClass()
```javascript
/**
 * Filter Class
 * @param {string} selector {required}
 * @param {Array/NodeList} els {required}
 * @returns {Array/NodeList}
 */

// usage
let domItems = ammo.getClass('item', document.body);)
let selectedItems = ammo.filterClass('selected', domItems);
```

#### append()
```javascript
/**
 * Append
 * @param {string} html {required}
 * @param {DomElement} context {required}
 * @returns {*}
 * Appends a stringified html content after the closing tag of a DOM element
 */

 // usage
 ammo.append(`<span>Appended after the element</span>`, document.body);
```

#### appendIn()
```javascript
/**
 * Append
 * @param {string} html {required}
 * @param {DomElement} context {required}
 * @returns {*}
 * Appends a stringified html content before the closing tag of a DOM element
 */

 // usage
 ammo.appendIn(`<span>Appended before the closing tag of the element</span>`, document.body);
```

#### prepend()
```javascript
/**
 * Prepend
 * @param {string} html {required}
 * @param {DomElement} context {required}
 * @returns {*}
 * Appends a stringified html content after the opening tag of a DOM element
 */

 // usage
 ammo.prepend(`<span>Prepended after the opening tag of the element</span>`, document.body);
```

#### prependIn()
```javascript
/**
 * Prepend In
 * @param {string} html {required}
 * @param {DomElement} context {required}
 * @returns {*}
 * Appends a stringified html content before the opening tag of a DOM element
 */

 // usage
 ammo.appendIn(`<span>Prepended before the opening tag of the element</span>`, document.body);
```

#### remove()
```javascript
/**
 * Remove
 * @param {string} selector {required}
 * @param {object/DomElement} context {optional}
 * @returns {*}
 * Removes a DOM element
 */

 // usage
 ammo.remove('for-removal', document.body);
```

#### each()
```javascript
/**
 * Each
 * @param {Array/NodeList} elements
 * @param {function} callback
 * Iterates over a collection of DOM elements
 */

 // usage
 let domItems = ammo.getClass('item', document.body);
 ammo.each(domItems, (item, index) => {
    ammo.remove('item-header', item);
 });
```

#### filter()
```javascript
/**
 * Filter
 * @param {Array} items
 * @param {string} key
 * @param {mixed} value
 * @returns {Array}
 * Filters a collection by key-value comparison and returns a collection containing entries with signature {item: originalItemContents, index: originalItemIndex in the initial collection}. Useful for extracting data and cleaning the initial collection from extracted items.
 */

// usage
let users = [{
    name: 'John',
    eyeColor: 'blue'
}, {
    name: 'Jane',
    eyeColor: 'green'
}, {
    name: 'Andrew',
    eyeColor: 'blue'
}];
let filtered = ammo.filter(users, 'eyeColor', 'blue');

// filtered contains:
[{
    index: 0,
    item: {
        name: 'John',
        eyeColor: 'blue'
    }
}, {
    index: 2,
    item: {
        name: 'Andrew',
        eyeColor: 'blue'
    }
}];
```

#### isObj()
```javascript
/**
 * Is Object
 * @param {mixed} val
 * @returns {boolean}
 */

// usage
let user = {name: 'John'};
if ( ammo.isObj(user) ) {
    console.log('user is object');
}
```

#### isNull()
```javascript
/**
 * Is Null
 * @param {mixed} val
 * @returns {boolean}
 */

// usage
let user = null;
if ( ammo.isNull(user) ) {
    console.log('user is null');
}
```


#### isNum()
```javascript
/**
 * Is Number
 * @param {mixed} val
 * @returns {boolean}
 */

// usage
let user = 123;
if ( ammo.isNum(user) ) {
    console.log('user is number');
}
```



