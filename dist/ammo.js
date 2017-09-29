
((base) => {
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

    base.ammo = (() => {

        /**
         * Private
         * Contx
         * @param context
         * @returns {*|HTMLDocument}
         */
        let contx = (context) => {
            return context || base.document;
        };


        /**
         * On DOM Ready
         * @param callback
         */
        let onDomReady = (callback) => {
            base.document.addEventListener('DOMContentLoaded', callback);
        };


        /**
         * Delegate Event
         * @param event
         * @param className
         * @param callback
         * @param context
         */
        let delegateEvent = (event, className, callback, context) => {
            contx(context).addEventListener(event, (e) => {
                if ( e.target && e.target.classList.contains(className) ) {
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
        let getClosest = (className, selector, context) => {
            return contx(context).querySelectorAll(className).closest(selector);
        };


        /**
         * Public
         * Get Class
         * @param className
         * @param context
         * @returns {NodeList}
         */
        let getClass = (className, context) => {
            return contx(context).getElementsByClassName(className);
        };


        /**
         * Public
         * Get Tag
         * @param tagName
         * @param context
         * @returns {NodeList}
         */
        let getTag = (tagName, context) => {
            return contx(context).getElementsByTagName(tagName);
        };


        /**
         * Public
         * Get Id
         * @param idName
         * @param context
         * @returns {Element}
         */
        let getId = (idName, context) => {
            return contx(context).getElementById(idName);
        };


        /**
         * Get Element
         * @param selector
         * @param context
         * @returns {NodeList}
         */
        let getEl = (selector, context) => {
            return contx(context).querySelectorAll(selector);
        };


        /**
         * Public
         * Filter Class
         * @param className
         * @param els
         * @returns {Array}
         */
        let filterClass = (className, els) => {
            let filtered = [];
            each(els, (el) => {
                if ( el.classList.contains(className) ) {
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
        let append = (html, context) => {
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
        let appendIn = (html, context) => {
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
        let prepend = (html, context) => {
            contx(context).insertAdjacentHTML('afterbegin', html.toString());
            return base.ammo;
        };


        /**
         * Public
         * Prepend In
         * @param html
         * @param context
         */
        let prependIn = (html, context) => {
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
        let remove = (el, parent) => {
            (parent || el.parentNode).removeChild(el);
            return base.ammo;
        };


        /**
         * Public
         * Each
         * @param elements
         * @param callback
         */
        let each = (elements, callback) => {
            Object.keys(elements).forEach((k, i) => {
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
        let filter = (items, key, value) => {
            let filtered = [];
            items.filter((item, index) => {
                if ( item[key] === value ) {
                    filtered.push({
                        index,
                        item
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
        let isObj = function(val) {
            return typeof val === 'object' && !isArr(val) && !isNull(val);
        };


        /**
         * Public
         * Is Null
         * @param val
         * @returns {boolean}
         */
        let isNull = function(val) {
            return val === null;
        };


        /**
         * Public
         * Is Number
         * @param val
         * @returns {boolean}
         */
        let isNum = function(val) {
            return typeof val === 'number' && !isNaN(val);
        };


        /**
         * Public
         * Is Function
         * @param val
         * @returns {boolean}
         */
        let isFunc = function(val) {
            return typeof val === 'function';
        };


        /**
         * Public
         * Is Array
         * @param val
         * @returns {boolean}
         */
        let isArr = function(val) {
            return Array.isArray(val);
        };


        /**
         * Public
         * Is String
         * @param val
         * @returns {boolean}
         */
        let isStr = function(val) {
            return typeof val === 'string';
        };


        /**
         * Public
         * Is Undefined
         * @param val
         * @returns {boolean}
         */
        let isUndef = function(val) {
            return typeof val === 'undefined';
        };


        /**
         * Public
         * Is Boolean
         * @param val
         * @returns {boolean}
         */
        let isBool = function(val) {
            return typeof val === 'boolean';
        };


        /**
         * Public
         * Has Property
         * @param obj
         * @param prop
         * @returns {boolean}
         */
        let hasProp = function(obj, prop) {
            return obj.hasOwnProperty(prop);
        };


        /**
         * Public
         * Has Method
         * @param obj
         * @param method
         * @returns {boolean}
         */
        let hasMethod = function(obj, method) {
            return hasProp(obj, method) && isFunc(method);
        };


        /**
         * Public
         * Has Key
         * @param obj
         * @param key
         * @returns {boolean}
         */
        let hasKey = function(obj, key) {
            return getKeys(obj).indexOf(key) > -1;
        };


        /**
         * Public
         * Get Keys
         * @param obj
         * @returns {Array}
         */
        let getKeys = function(obj) {
            return Object.keys(obj);
        };


        /**
         * Public
         * JSON Copy
         * @param obj
         */
        let jsonCopy = (obj) => {
            return JSON.parse(JSON.stringify(obj));
        };


        /**
         * Public
         * Get Url Param
         * @param name
         * @returns {Array|{index: number, input: string}|*|string}
         */
        let getUrlParam = (name) => {
            let match = new RegExp(`[?&]${name}=([^&]*)`).exec(window.location.search);
            return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
        };


        /**
         * Public
         * Random Inclusive
         * @param min
         * @param max
         * @returns {*}
         */
        let randomInclusive = (min, max) => {
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
        let recurIter = (handler, complete, index) => {
            index = index || 0;
            handler(index, (canRecur) => {
                if ( ! canRecur ) {
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
        let poll = (handler, complete, interval) => {
            setTimeout(() => {
                handler((canPoll) => {
                    if ( canPoll ) {
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
        let buffer = function() {
            let timers = {};
            return (id, ms, clb) => {
                if ( ! id ) {
                    timers[id] = '0';
                }
                if ( timers[id] ) {
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
        let extend = function() {
            let obj = arguments[0];
            let enhancedObj = Object.assign(obj, {});
            let extenders = [];
            getKeys(arguments).forEach((k, i) => {
                if ( i > 0 ) {
                    extenders.push(arguments[k]);
                }
            });
            extenders.forEach((extender) => {
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
        let compile = (html, items) => {
            let tag = {
                start: '{iter}',
                end: '{/iter}'
            };
            let iterators = ((html) => {
                let iterators = [];
                let indexStart = html.indexOf(tag.start);
                let indexEnd = html.indexOf(tag.end);
                if ( indexStart > -1 && indexEnd > -1 ) {
                    while ( indexStart > -1 && indexEnd > -1 ) {
                        iterators.push({
                            indexStart,
                            indexEnd,
                            html: html.substring(indexStart, indexEnd).replace(tag.start, '').replace(tag.end, '').replace(/>\s+</g, '><').trim()
                        });
                        indexStart = html.indexOf(tag.start, indexStart + 1);
                        indexEnd = html.indexOf(tag.end, indexEnd + 1);
                    }
                }
                return iterators;
            })(html);
            let compileTemplate = (html, items) => {
                let compiled = '';
                items.forEach((item) => {
                    let keys = Object.keys(item);
                    let template = html;

                    if ( iterators.length > 0 ) {
                        iterators.forEach((iter) => {
                            let iterHtml = '';
                            let itemHtml = iter.html;
                            template = template.substring(0, iter.indexStart).trim()+tag.start+template.substring(iter.indexEnd + tag.end.length, template.length - 1).trim();

                            keys.forEach((k) => {
                                itemHtml = iter.html.replace(new RegExp('{key}', 'g'), k);
                                itemHtml = itemHtml.replace(new RegExp('{value}', 'g'), item[k]);
                                iterHtml += itemHtml;
                            });
                            template = template.replace(tag.start, iterHtml);
                        });
                    } else {
                        keys.forEach((k) => {
                            template = template.replace(new RegExp('{'+k+'}', 'g'), item[k]);
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
        let template = (html, items) => {
            let compiled = '';
            let observerTag = {
                start: '{{',
                end: '}}'
            };
            let dataAttr = {
                id: 'data-ammo-id',
                idValue: 'data-ammo-id-value',
                observer: 'data-ammo-observer'
            };
            let identifierRegex = /(id:[a-zA-Z]+)/g;
            let getObserverSchema = () => {
                return {
                    indexStart: 0,
                    indexEnd: 0,
                    name: '',
                    value: '',
                    context: '',
                    selector: ''
                };
            };
            let getTemplate = (observerName, observable) => {
                return `<span ${dataAttr.observer}="${observerName}">${observable}</span>`;
            };
            let getIdentifier = (html) => {
                let match = html.match(identifierRegex);
                let tag = match[0];
                let index = tag.indexOf(':');
                return tag.substring(index + 1, tag.length);
            };
            let setIdentifier = (html, identifier, value) => {
                let match = html.match(identifierRegex);
                let tag = match[0];
                let index = html.indexOf(tag);
                return `${html.substring(0, index - 1)}${dataAttr.id}=${identifier} ${dataAttr.idValue}=${value}${html.substring(index + tag.length + 1, html.length)}`;
            };
            let identifier = getIdentifier(html);
            let getObservers = (html) => {
                let observersArr = [];
                let indexStart = html.indexOf(observerTag.start);
                let indexEnd = html.indexOf(observerTag.end);
                if ( indexStart > -1 && indexEnd > -1 ) {
                    while ( indexStart > -1 && indexEnd > -1 ) {
                        let observer = getObserverSchema();
                        observer.name = html.substring(indexStart, indexEnd).replace(observerTag.start, '').replace(observerTag.end, '');
                        observersArr.push(observer);
                        indexStart = html.indexOf(observerTag.start, indexStart + 1);
                        indexEnd = html.indexOf(observerTag.end, indexEnd + 1);
                    }
                }
                return observersArr;
            };
            let observers = getObservers(html);
            let compileTemplate = (html, items, observers, identifier) => {
                let compiled = '';
                items.forEach((item) => {
                    let template = html;
                    template = setIdentifier(template, identifier, item[identifier]);

                    if ( observers.length > 0 ) {
                        observers.forEach((observer) => {
                            observer.value = item[observer.name];
                            template = template.replace(new RegExp(observerTag.start+observer.name+observerTag.end, 'g'), getTemplate(observer.name, item[observer.name]));
                        });
                    }
                    compiled += template;
                });
                return compiled.replace(/{/g, '').replace(/}/g, '');
            };
            compiled = compileTemplate(html, items, observers, identifier);

            return {
                render(domTarget, callback) {
                    appendIn(compiled, domTarget);
                    if ( isFunc(callback) ) {
                        callback();
                    }
                },
                update(id, name, value) {
                    let context = contx().querySelectorAll(`[${dataAttr.id}="${identifier}"][${dataAttr.idValue}="${id}"]`)[0];
                    context.querySelectorAll(`[${dataAttr.observer}="${name}"]`)[0].textContent = value;
                },
                getId(item) {
                    return item.getAttribute(dataAttr.id);
                },
                getIdValue(item) {
                    return item.getAttribute(dataAttr.idValue);
                }
            };
        };


        /**
         * Public
         * Request
         * @param options
         */
        let req = (options) => {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if ( xhr.readyState === XMLHttpRequest.DONE ) {
                    if ( xhr.status === 200 ) {
                        options.callback(null, JSON.parse(xhr.responseText));
                    } else {
                        options.callback(xhr.responseText, null);
                    }
                }
            };
            xhr.open(options.type || 'GET', options.url);
            if ( options.data ) {
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                let params = '';
                let dataKeys = getKeys(options.data);
                dataKeys.forEach((k) => {
                    params += `${k}=${encodeURIComponent(options.data[k])}`;
                });
                xhr.send(params);
            } else {
                xhr.send();
            }
        };


        let store = function(key) {
            let storage;
            if ( typeof key !== "string" ) {
                return new Error("[Storage] Invalid storage key. Provide a key{string}.");
            }

            let storageTemplates = {
                localStorage: {
                    getStorage: function() {
                        return localStorage;
                    },
                    setStorageItem: function(key, value) {
                        this.getStorage().setItem(key, value);
                    },
                    getStorageItem: function(key) {
                        return this.getStorage().getItem(key);
                    },
                    removeStorageItem: function(key) {
                        this.getStorage().removeItem(key);
                    }
                }
            };
            storage = storageTemplates.localStorage;

            let getData = function(key) {
                return decodeData(storage.getStorageItem(key));
            };
            let setData = function(key, data) {
                storage.setStorageItem(key, encodeData(data));
            };
            let removeData = function(key) {
                storage.removeStorageItem(key);
            };
            let decodeData = function(data) {
                return JSON.parse(data);
            };
            let encodeData = function(data) {
                return JSON.stringify(data);
            };

            return {
                setTemplate: function(template, storageApi) {
                    if ( typeof template !== "string" ) {
                        return new Error("[Storage] Invalid template name. Provide a name{string}.");
                    }
                    if ( typeof storageApi !== "object" || typeof storageApi.setStorageItem !== "function" || typeof storageApi.getStorageItem !== "function" || typeof storageApi.removeStorageItem !== "function" ) {
                        return new Error("[Storage] Invalid storage API. Provide an API, containing getStorageItem{function}, setStorageItem{function}, removeStorageItem{function}.");
                    }
                    storageTemplates[template] = storageApi;
                    storage = storageApi;
                    return this;
                },
                getData: function() {
                    let data = getData(key);
                    return data !== null ? getData(key) : undefined;
                },
                setData: function(newData) {
                    setData(key, newData);
                    return this;
                },
                removeData: function() {
                    removeData(key);
                    return this;
                },
                getItem: function(itemKey) {
                    let data = this.getData();
                    return data[itemKey];
                },
                setItem: function(itemKey, itemValue) {
                    let data = this.getData();
                    data[itemKey] = itemValue;
                    setData(key, data);
                    return this;
                },
                removeItem: function(itemKey) {
                    let data = this.getData();
                    data[itemKey] = undefined;
                    setData(key, data);
                    return this;
                }
            };
        };


        /**
         * Public
         * Sequence
         * @returns {{chain: chain, execute: execute}}
         */
        let sequence = function() {
            let chained = [];
            let value;
            let error;

            let chain = function(func) {
                if ( chained ) {
                    chained.push(func);
                }
                return this;
            };
            let execute = function(index) {
                let callback;
                index = typeof index === "number" ? index : 0;
                if ( ! chained || index >= chained.length ) {
                    return true;
                }

                callback = chained[index];
                callback({
                    resolve: function(_value) {
                        value = _value;
                        execute(++index);
                    },
                    reject: function(_error) {
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
        let app = function(config) {
            let hasConfig = false;
            let isGlobal = false;

            if ( typeof config === "object" && config !== null ) {
                hasConfig = true;
            }
            if ( hasConfig && typeof config.global === "boolean" ) {
                isGlobal = config.global;
            }
            if ( isGlobal && !hasConfig || isGlobal && hasConfig && !config.name ) {
                return new Error("[Initialzr] Invalid initialization. Global applications require a name. Pass a name as part of the app's config.");
            }
            let app = {
                config: config || {},
                nodes: {}
            };
            let schemas = {
                "default": ["events", "renderers", "actions"],
                "app": ["events", "actions", "common", "modules", "core"]
            };

            let factory = function() {
                let augment = function(nodeFamily) {
                    let nodes = app.nodes;
                    let families = !Array.isArray(nodeFamily) ? [""+nodeFamily] : nodeFamily;
                    families.map(function (nf) {
                        if ( ! nodes.hasOwnProperty(nf) ) {
                            nodes[nf] = {};
                        }
                    });
                    return this;
                };
                let addSchema = function(schemaName, schema) {
                    if ( ! schemas.hasOwnProperty(schemaName) && Array.isArray(schema) ) {
                        schemas[schemaName] = schema;
                    }
                    return this;
                };
                let schema = function(schema) {
                    if ( schemas.hasOwnProperty(schema) ) {
                        augment(schemas[schema]);
                    }
                    return this;
                };
                let addNode = function(nodeFamily, nodeName, func) {
                    let nodes = app.nodes;
                    if ( nodes.hasOwnProperty(nodeFamily) && ! nodes[nodeFamily].hasOwnProperty(nodeName) && typeof func === "function" ) {
                        nodes[nodeFamily][nodeName] = func;
                    }
                    return this;
                };
                let getNode = function(nodeFamily, nodeName) {
                    let nodes = app.nodes;
                    if ( nodes.hasOwnProperty(nodeFamily) && nodes[nodeFamily].hasOwnProperty(nodeName) && typeof nodes[nodeFamily][nodeName] === "function" ) {
                        return nodes[nodeFamily][nodeName];
                    } else {
                        return false;
                    }
                };
                let callNode = function(nodeFamily, nodeName, params) {
                    let nodeParams = typeof params !== "undefined" ? params : {};
                    let node = getNode(nodeFamily, nodeName);
                    if ( node ) {
                        node(nodeParams);
                    }
                    return this;
                };
                let getNodes = function(nodeFamily) {
                    return nodeFamily && app.nodes.hasOwnProperty(nodeFamily) ? app.nodes[nodeFamily] : app.nodes;
                };
                let configure = function(nodeFamily) {
                    let nodes = app.nodes;
                    if ( nodes.hasOwnProperty(nodeFamily) ) {
                        return {
                            node: function(nodeName, func) {
                                addNode(nodeFamily, nodeName, func);
                                return this;
                            },
                            configure: configure
                        };
                    }
                    return false;
                };
                let nodeExists = function(nodeFamily, nodeName) {
                    return typeof getNode(nodeFamily, nodeName) === "function";
                };
                let getConfig = function(name) {
                    let config = app.config;
                    if ( config.hasOwnProperty(name) ) {
                        return config[name];
                    } else {
                        return false;
                    }
                };
                let createInstance = function() {
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
            let setGlobal = function(instance) {
                base[app.config.name] = base[app.config.name] || instance;
            };

            if ( isGlobal ) {
                setGlobal(factory());
            } else {
                return factory();
            }
        };


        /**
         * Public API
         */
        return {
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
        };
    })();
})(window);
