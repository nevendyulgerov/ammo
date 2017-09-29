(function (base) {
    'use strict';

    /**
     * Library: Ammo
     * Version: 1.0.0
     * Standard: ECMAScript 2015
     * Author: Neven Dyulgerov
     * License: Released under the MIT license
     *
     * Description:
     * Provides general purpose utility belt for building web applications with JS
     * Ammo is available via the global variable {ammo}
     */

    base.ammo = function () {

        /**
         * Private
         * Contx
         * @param context
         * @returns {*|HTMLDocument}
         */
        var contx = function contx(context) {
            return context || base.document;
        };

        /**
         * On DOM Ready
         * @param callback
         */
        var onDomReady = function onDomReady(callback) {
            base.document.addEventListener('DOMContentLoaded', callback);
        };

        /**
         * Delegate Event
         * @param event
         * @param className
         * @param callback
         * @param context
         */
        var delegateEvent = function delegateEvent(event, className, callback, context) {
            contx(context).addEventListener(event, function (e) {
                if (e.target && e.target.classList.contains(className)) {
                    callback(e);
                }
            });
        };

        /**
         * Get Closest
         * @param selector
         * @param className
         * @param context
         * @returns {*}
         */
        var getClosest = function getClosest(className, selector, context) {
            return contx(context).querySelectorAll(className).closest(selector);
        };

        /**
         * Public
         * Get Class
         * @param className
         * @param context
         * @returns {NodeList}
         */
        var getClass = function getClass(className, context) {
            return contx(context).getElementsByClassName(className);
        };

        /**
         * Public
         * Get Tag
         * @param tagName
         * @param context
         * @returns {NodeList}
         */
        var getTag = function getTag(tagName, context) {
            return contx(context).getElementsByTagName(tagName);
        };

        /**
         * Public
         * Get Id
         * @param idName
         * @param context
         * @returns {Element}
         */
        var getId = function getId(idName, context) {
            return contx(context).getElementById(idName);
        };

        /**
         * Get Element
         * @param selector
         * @param context
         * @returns {NodeList}
         */
        var getEl = function getEl(selector, context) {
            return contx(context).querySelectorAll(selector);
        };

        /**
         * Public
         * Filter Class
         * @param className
         * @param els
         * @returns {Array}
         */
        var filterClass = function filterClass(className, els) {
            var filtered = [];
            each(els, function (el) {
                if (el.classList.contains(className)) {
                    filtered.push(el);
                }
            });
            return filtered;
        };

        /**
         * Public
         * Append
         * @param html
         * @param context
         * @returns {*}
         */
        var append = function append(html, context) {
            contx(context).insertAdjacentHTML('afterend', html.toString());
            return base.ammo;
        };

        /**
         * Public
         * Append In
         * @param html
         * @param context
         * @returns {*}
         */
        var appendIn = function appendIn(html, context) {
            contx(context).insertAdjacentHTML('beforeend', html.toString());
            return base.ammo;
        };

        /**
         * Public
         * Prepend
         * @param html
         * @param context
         * @returns {*}
         */
        var prepend = function prepend(html, context) {
            contx(context).insertAdjacentHTML('afterbegin', html.toString());
            return base.ammo;
        };

        /**
         * Public
         * Prepend In
         * @param html
         * @param context
         */
        var prependIn = function prependIn(html, context) {
            contx(context).insertAdjacentHTML('beforebegin', html.toString());
            return base.ammo;
        };

        /**
         * Public
         * Remove
         * @param el
         * @param parent
         * @returns {*}
         */
        var remove = function remove(el, parent) {
            (parent || el.parentNode).removeChild(el);
            return base.ammo;
        };

        /**
         * Public
         * Each
         * @param elements
         * @param callback
         */
        var each = function each(elements, callback) {
            Object.keys(elements).forEach(function (k, i) {
                callback(elements[k], i);
            });
        };

        /**
         * Public
         * Filter
         * @param items
         * @param key
         * @param value
         * @returns {Array}
         */
        var filter = function filter(items, key, value) {
            var filtered = [];
            items.filter(function (item, index) {
                if (item[key] === value) {
                    filtered.push({
                        index: index,
                        item: item
                    });
                }
            });
            return filtered;
        };

        /**
         * Public
         * Is Object
         * @param val
         * @returns {boolean}
         */
        var isObj = function isObj(val) {
            return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && !isArr(val) && !isNull(val);
        };

        /**
         * Public
         * Is Null
         * @param val
         * @returns {boolean}
         */
        var isNull = function isNull(val) {
            return val === null;
        };

        /**
         * Public
         * Is Number
         * @param val
         * @returns {boolean}
         */
        var isNum = function isNum(val) {
            return typeof val === 'number' && !isNaN(val);
        };

        /**
         * Public
         * Is Function
         * @param val
         * @returns {boolean}
         */
        var isFunc = function isFunc(val) {
            return typeof val === 'function';
        };

        /**
         * Public
         * Is Array
         * @param val
         * @returns {boolean}
         */
        var isArr = function isArr(val) {
            return Array.isArray(val);
        };

        /**
         * Public
         * Is String
         * @param val
         * @returns {boolean}
         */
        var isStr = function isStr(val) {
            return typeof val === 'string';
        };

        /**
         * Public
         * Is Undefined
         * @param val
         * @returns {boolean}
         */
        var isUndef = function isUndef(val) {
            return typeof val === 'undefined';
        };

        /**
         * Public
         * Is Boolean
         * @param val
         * @returns {boolean}
         */
        var isBool = function isBool(val) {
            return typeof val === 'boolean';
        };

        /**
         * Public
         * Has Property
         * @param obj
         * @param prop
         * @returns {boolean}
         */
        var hasProp = function hasProp(obj, prop) {
            return obj.hasOwnProperty(prop);
        };

        /**
         * Public
         * Has Method
         * @param obj
         * @param method
         * @returns {boolean}
         */
        var hasMethod = function hasMethod(obj, method) {
            return hasProp(obj, method) && isFunc(method);
        };

        /**
         * Public
         * Has Key
         * @param obj
         * @param key
         * @returns {boolean}
         */
        var hasKey = function hasKey(obj, key) {
            return getKeys(obj).indexOf(key) > -1;
        };

        /**
         * Public
         * Get Keys
         * @param obj
         * @returns {Array}
         */
        var getKeys = function getKeys(obj) {
            return Object.keys(obj);
        };

        /**
         * Public
         * JSON Copy
         * @param obj
         */
        var jsonCopy = function jsonCopy(obj) {
            return JSON.parse(JSON.stringify(obj));
        };

        /**
         * Public
         * Get Url Param
         * @param name
         * @returns {Array|{index: number, input: string}|*|string}
         */
        var getUrlParam = function getUrlParam(name) {
            var match = new RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
            return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
        };

        /**
         * Public
         * Random Inclusive
         * @param min
         * @param max
         * @returns {*}
         */
        var randomInclusive = function randomInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        /**
         * Public
         * Recursive Iterator
         * @param handler
         * @param complete
         * @param index
         * @returns {*}
         */
        var recurIter = function recurIter(handler, complete, index) {
            index = index || 0;
            handler(index, function (canRecur) {
                if (!canRecur) {
                    return complete();
                }
                recurIter(handler, complete, ++index);
            });
        };

        /**
         * Public
         * Poll
         * @param handler
         * @param complete
         * @param interval
         */
        var poll = function poll(handler, complete, interval) {
            setTimeout(function () {
                handler(function (canPoll) {
                    if (canPoll) {
                        return poll(handler, complete, interval);
                    }
                    complete();
                });
            }, interval);
        };

        /**
         * Public
         * Buffer
         * @returns {function(*=, *=, *=)}
         */
        var buffer = function buffer() {
            var timers = {};
            return function (id, ms, clb) {
                if (!id) {
                    timers[id] = '0';
                }
                if (timers[id]) {
                    clearTimeout(timers[id]);
                }
                timers[id] = setTimeout(clb, ms);
            };
        };

        /**
         * Public
         * Extends
         * @returns {object}
         */
        var extend = function extend() {
            var _arguments = arguments;

            var obj = arguments[0];
            var enhancedObj = Object.assign(obj, {});
            var extenders = [];
            getKeys(arguments).forEach(function (k, i) {
                if (i > 0) {
                    extenders.push(_arguments[k]);
                }
            });
            extenders.forEach(function (extender) {
                Object.assign(enhancedObj, extender);
            });
            return enhancedObj;
        };

        /**
         * Public
         * Compile
         * @param html
         * @param items
         * @returns {string}
         */
        var compile = function compile(html, items) {
            var tag = {
                start: '{iter}',
                end: '{/iter}'
            };
            var iterators = function (html) {
                var iterators = [];
                var indexStart = html.indexOf(tag.start);
                var indexEnd = html.indexOf(tag.end);
                if (indexStart > -1 && indexEnd > -1) {
                    while (indexStart > -1 && indexEnd > -1) {
                        iterators.push({
                            indexStart: indexStart,
                            indexEnd: indexEnd,
                            html: html.substring(indexStart, indexEnd).replace(tag.start, '').replace(tag.end, '').replace(/>\s+</g, '><').trim()
                        });
                        indexStart = html.indexOf(tag.start, indexStart + 1);
                        indexEnd = html.indexOf(tag.end, indexEnd + 1);
                    }
                }
                return iterators;
            }(html);
            var compileTemplate = function compileTemplate(html, items) {
                var compiled = '';
                items.forEach(function (item) {
                    var keys = Object.keys(item);
                    var template = html;

                    if (iterators.length > 0) {
                        iterators.forEach(function (iter) {
                            var iterHtml = '';
                            var itemHtml = iter.html;
                            template = template.substring(0, iter.indexStart).trim() + tag.start + template.substring(iter.indexEnd + tag.end.length, template.length - 1).trim();

                            keys.forEach(function (k) {
                                itemHtml = iter.html.replace(new RegExp('{key}', 'g'), k);
                                itemHtml = itemHtml.replace(new RegExp('{value}', 'g'), item[k]);
                                iterHtml += itemHtml;
                            });
                            template = template.replace(tag.start, iterHtml);
                        });
                    } else {
                        keys.forEach(function (k) {
                            template = template.replace(new RegExp('{' + k + '}', 'g'), item[k]);
                        });
                    }
                    compiled += template;
                });
                return compiled;
            };

            return compileTemplate(html, items);
        };

        /**
         * Public
         * Template
         * @param html
         * @param items
         * @returns {{render: (function(*=, *=)), update: (function(*, *, *))}}
         */
        var template = function template(html, items) {
            var compiled = '';
            var observerTag = {
                start: '{{',
                end: '}}'
            };
            var dataAttr = {
                id: 'data-ammo-id',
                idValue: 'data-ammo-id-value',
                observer: 'data-ammo-observer'
            };
            var identifierRegex = /(id:[a-zA-Z]+)/g;
            var getObserverSchema = function getObserverSchema() {
                return {
                    indexStart: 0,
                    indexEnd: 0,
                    name: '',
                    value: '',
                    context: '',
                    selector: ''
                };
            };
            var getTemplate = function getTemplate(observerName, observable) {
                return '<span ' + dataAttr.observer + '="' + observerName + '">' + observable + '</span>';
            };
            var getIdentifier = function getIdentifier(html) {
                var match = html.match(identifierRegex);
                var tag = match[0];
                var index = tag.indexOf(':');
                return tag.substring(index + 1, tag.length);
            };
            var setIdentifier = function setIdentifier(html, identifier, value) {
                var match = html.match(identifierRegex);
                var tag = match[0];
                var index = html.indexOf(tag);
                return '' + html.substring(0, index - 1) + dataAttr.id + '=' + identifier + ' ' + dataAttr.idValue + '=' + value + html.substring(index + tag.length + 1, html.length);
            };
            var identifier = getIdentifier(html);
            var getObservers = function getObservers(html) {
                var observersArr = [];
                var indexStart = html.indexOf(observerTag.start);
                var indexEnd = html.indexOf(observerTag.end);
                if (indexStart > -1 && indexEnd > -1) {
                    while (indexStart > -1 && indexEnd > -1) {
                        var observer = getObserverSchema();
                        observer.name = html.substring(indexStart, indexEnd).replace(observerTag.start, '').replace(observerTag.end, '');
                        observersArr.push(observer);
                        indexStart = html.indexOf(observerTag.start, indexStart + 1);
                        indexEnd = html.indexOf(observerTag.end, indexEnd + 1);
                    }
                }
                return observersArr;
            };
            var observers = getObservers(html);
            var compileTemplate = function compileTemplate(html, items, observers, identifier) {
                var compiled = '';
                items.forEach(function (item) {
                    var template = html;
                    template = setIdentifier(template, identifier, item[identifier]);

                    if (observers.length > 0) {
                        observers.forEach(function (observer) {
                            observer.value = item[observer.name];
                            template = template.replace(new RegExp(observerTag.start + observer.name + observerTag.end, 'g'), getTemplate(observer.name, item[observer.name]));
                        });
                    }
                    compiled += template;
                });
                return compiled.replace(/{/g, '').replace(/}/g, '');
            };
            compiled = compileTemplate(html, items, observers, identifier);

            return {
                render: function render(domTarget, callback) {
                    appendIn(compiled, domTarget);
                    if (isFunc(callback)) {
                        callback();
                    }
                },
                update: function update(id, name, value) {
                    var context = contx().querySelectorAll('[' + dataAttr.id + '="' + identifier + '"][' + dataAttr.idValue + '="' + id + '"]')[0];
                    context.querySelectorAll('[' + dataAttr.observer + '="' + name + '"]')[0].textContent = value;
                },
                getId: function getId(item) {
                    return item.getAttribute(dataAttr.id);
                },
                getIdValue: function getIdValue(item) {
                    return item.getAttribute(dataAttr.idValue);
                }
            };
        };

        /**
         * Public
         * Request
         * @param options
         */
        var req = function req(options) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        options.callback(null, JSON.parse(xhr.responseText));
                    } else {
                        options.callback(xhr.responseText, null);
                    }
                }
            };
            xhr.open(options.type || 'GET', options.url);
            if (options.data) {
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                var params = '';
                var dataKeys = getKeys(options.data);
                dataKeys.forEach(function (k) {
                    params += k + '=' + encodeURIComponent(options.data[k]);
                });
                xhr.send(params);
            } else {
                xhr.send();
            }
        };

        var store = function store(key) {
            var storage = void 0;
            if (typeof key !== "string") {
                return new Error("[Storage] Invalid storage key. Provide a key{string}.");
            }

            var storageTemplates = {
                localStorage: {
                    getStorage: function getStorage() {
                        return localStorage;
                    },
                    setStorageItem: function setStorageItem(key, value) {
                        this.getStorage().setItem(key, value);
                    },
                    getStorageItem: function getStorageItem(key) {
                        return this.getStorage().getItem(key);
                    },
                    removeStorageItem: function removeStorageItem(key) {
                        this.getStorage().removeItem(key);
                    }
                }
            };
            storage = storageTemplates.localStorage;

            var _getData = function _getData(key) {
                return decodeData(storage.getStorageItem(key));
            };
            var _setData = function _setData(key, data) {
                storage.setStorageItem(key, encodeData(data));
            };
            var _removeData = function _removeData(key) {
                storage.removeStorageItem(key);
            };
            var decodeData = function decodeData(data) {
                return JSON.parse(data);
            };
            var encodeData = function encodeData(data) {
                return JSON.stringify(data);
            };

            return {
                setTemplate: function setTemplate(template, storageApi) {
                    if (typeof template !== "string") {
                        return new Error("[Storage] Invalid template name. Provide a name{string}.");
                    }
                    if ((typeof storageApi === 'undefined' ? 'undefined' : _typeof(storageApi)) !== "object" || typeof storageApi.setStorageItem !== "function" || typeof storageApi.getStorageItem !== "function" || typeof storageApi.removeStorageItem !== "function") {
                        return new Error("[Storage] Invalid storage API. Provide an API, containing getStorageItem{function}, setStorageItem{function}, removeStorageItem{function}.");
                    }
                    storageTemplates[template] = storageApi;
                    storage = storageApi;
                    return this;
                },
                getData: function getData() {
                    var data = _getData(key);
                    return data !== null ? _getData(key) : undefined;
                },
                setData: function setData(newData) {
                    _setData(key, newData);
                    return this;
                },
                removeData: function removeData() {
                    _removeData(key);
                    return this;
                },
                getItem: function getItem(itemKey) {
                    var data = this.getData();
                    return data[itemKey];
                },
                setItem: function setItem(itemKey, itemValue) {
                    var data = this.getData();
                    data[itemKey] = itemValue;
                    _setData(key, data);
                    return this;
                },
                removeItem: function removeItem(itemKey) {
                    var data = this.getData();
                    data[itemKey] = undefined;
                    _setData(key, data);
                    return this;
                }
            };
        };

        /**
         * Public
         * Sequence
         * @returns {{chain: chain, execute: execute}}
         */
        var sequence = function sequence() {
            var chained = [];
            var value = void 0;
            var error = void 0;

            var chain = function chain(func) {
                if (chained) {
                    chained.push(func);
                }
                return this;
            };
            var execute = function execute(index) {
                var callback = void 0;
                index = typeof index === "number" ? index : 0;
                if (!chained || index >= chained.length) {
                    return true;
                }

                callback = chained[index];
                callback({
                    resolve: function resolve(_value) {
                        value = _value;
                        execute(++index);
                    },
                    reject: function reject(_error) {
                        error = _error;
                        execute(++index);
                    },
                    response: {
                        value: value,
                        error: error
                    }
                });
            };

            return {
                chain: chain,
                execute: execute
            };
        };

        /**
         * Public
         * App
         * @param config
         * @returns {Error}
         */
        var app = function app(config) {
            var hasConfig = false;
            var isGlobal = false;

            if ((typeof config === 'undefined' ? 'undefined' : _typeof(config)) === "object" && config !== null) {
                hasConfig = true;
            }
            if (hasConfig && typeof config.global === "boolean") {
                isGlobal = config.global;
            }
            if (isGlobal && !hasConfig || isGlobal && hasConfig && !config.name) {
                return new Error("[Initialzr] Invalid initialization. Global applications require a name. Pass a name as part of the app's config.");
            }
            var app = {
                config: config || {},
                nodes: {}
            };
            var schemas = {
                "default": ["events", "renderers", "actions"],
                "app": ["events", "actions", "common", "modules", "core"]
            };

            var factory = function factory() {
                var augment = function augment(nodeFamily) {
                    var nodes = app.nodes;
                    var families = !Array.isArray(nodeFamily) ? ["" + nodeFamily] : nodeFamily;
                    families.map(function (nf) {
                        if (!nodes.hasOwnProperty(nf)) {
                            nodes[nf] = {};
                        }
                    });
                    return this;
                };
                var addSchema = function addSchema(schemaName, schema) {
                    if (!schemas.hasOwnProperty(schemaName) && Array.isArray(schema)) {
                        schemas[schemaName] = schema;
                    }
                    return this;
                };
                var schema = function schema(_schema) {
                    if (schemas.hasOwnProperty(_schema)) {
                        augment(schemas[_schema]);
                    }
                    return this;
                };
                var addNode = function addNode(nodeFamily, nodeName, func) {
                    var nodes = app.nodes;
                    if (nodes.hasOwnProperty(nodeFamily) && !nodes[nodeFamily].hasOwnProperty(nodeName) && typeof func === "function") {
                        nodes[nodeFamily][nodeName] = func;
                    }
                    return this;
                };
                var getNode = function getNode(nodeFamily, nodeName) {
                    var nodes = app.nodes;
                    if (nodes.hasOwnProperty(nodeFamily) && nodes[nodeFamily].hasOwnProperty(nodeName) && typeof nodes[nodeFamily][nodeName] === "function") {
                        return nodes[nodeFamily][nodeName];
                    } else {
                        return false;
                    }
                };
                var callNode = function callNode(nodeFamily, nodeName, params) {
                    var nodeParams = typeof params !== "undefined" ? params : {};
                    var node = getNode(nodeFamily, nodeName);
                    if (node) {
                        node(nodeParams);
                    }
                    return this;
                };
                var getNodes = function getNodes(nodeFamily) {
                    return nodeFamily && app.nodes.hasOwnProperty(nodeFamily) ? app.nodes[nodeFamily] : app.nodes;
                };
                var configure = function configure(nodeFamily) {
                    var nodes = app.nodes;
                    if (nodes.hasOwnProperty(nodeFamily)) {
                        return {
                            node: function node(nodeName, func) {
                                addNode(nodeFamily, nodeName, func);
                                return this;
                            },
                            configure: configure
                        };
                    }
                    return false;
                };
                var nodeExists = function nodeExists(nodeFamily, nodeName) {
                    return typeof getNode(nodeFamily, nodeName) === "function";
                };
                var getConfig = function getConfig(name) {
                    var config = app.config;
                    if (config.hasOwnProperty(name)) {
                        return config[name];
                    } else {
                        return false;
                    }
                };
                var createInstance = function createInstance() {
                    return {
                        schema: schema,
                        addSchema: addSchema,
                        augment: augment,
                        configure: configure,
                        addNode: addNode,
                        getNode: getNode,
                        callNode: callNode,
                        nodeExists: nodeExists,
                        getNodes: getNodes,
                        getConfig: getConfig
                    };
                };

                return createInstance();
            };
            var setGlobal = function setGlobal(instance) {
                base[app.config.name] = base[app.config.name] || instance;
            };

            if (isGlobal) {
                setGlobal(factory());
            } else {
                return factory();
            }
        };

        /**
         * Public API
         */
        return {
            onDomReady: onDomReady,
            delegateEvent: delegateEvent,
            getClosest: getClosest,
            getClass: getClass,
            getTag: getTag,
            getId: getId,
            getEl: getEl,
            filterClass: filterClass,
            append: append,
            appendIn: appendIn,
            prepend: prepend,
            prependIn: prependIn,
            remove: remove,
            each: each,
            filter: filter,
            jsonCopy: jsonCopy,
            isObj: isObj,
            isNull: isNull,
            isNum: isNum,
            isFunc: isFunc,
            isArr: isArr,
            isStr: isStr,
            isUndef: isUndef,
            isBool: isBool,
            hasProp: hasProp,
            hasMethod: hasMethod,
            hasKey: hasKey,
            getKeys: getKeys,
            getUrlParam: getUrlParam,
            randomInclusive: randomInclusive,
            recurIter: recurIter,
            poll: poll,
            buffer: buffer,
            extend: extend,
            compile: compile,
            template: template,
            req: req,
            store: store,
            sequence: sequence,
            app: app
        };
    }();
})(window);