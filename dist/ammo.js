
((base) => {
    'use strict';

    /**
     * Library: Ammo
     * Version: 1.3.5
     * Standard: ECMAScript 2015
     * Author: Neven Dyulgerov
     * License: Released under the MIT license
     *
     * Description:
     * Provides general purpose utility belt for building web applications with JS
     * Ammo is available via the global variable {ammo}
     */

    base.ammo = (function() {


        /**
         * @description Provide DOM context
         * Contx
         * @param context
         * @returns {*|HTMLDocument}
         */
        const contx = (context) => context || base.document;


        /**
         * @description Event handler for DOM Ready
         * @param callback
         */
        const onDomReady = (callback) => {
            base.document.addEventListener('DOMContentLoaded', callback);
            return this;
        };


        /**
         * @description Event handler for hover
         * @param domEls
         * @param onIn
         * @param onOut
         */
        const onHover = (domEls, onIn, onOut) => {
            let lastHovered;
            each(domEls, (el) => {
                el.addEventListener('mouseenter', (e) => {
                    lastHovered = e.target;
                    onIn(e);
                });
                el.addEventListener('mouseout', (e) => {
                    onOut(e, lastHovered);
                });
            });
        };


        /**
         * @description Delegate event to given selector with className
         * @param event
         * @param className
         * @param callback
         * @param context
         */
        const delegateEvent = (event, className, callback, context) => {
            contx(context).addEventListener(event, (e) => {
                if ( e.target && e.target.classList.contains(className) ) {
                    callback(e);
                }
            });
        };


        /**
         * @description Get node by given selector
         * @param selector
         * @param context
         * @returns {Node}
         */
        const getEl = (selector, context) => contx(context).querySelector(selector);


        /**
         * @description Get node list by given selector
         * @param selector
         * @param context
         */
        const getEls = (selector, context) => contx(context).querySelectorAll(selector);


        /**
         * @description Remove node from the DOM
         * @param domEl
         */
        const removeEl = (domEl) => {
            domEl.parentNode.removeChild(domEl);
            return this;
        };


        /**
         * @description Check if element is hovered
         * @param selector
         * @returns {boolean}
         */
        const isHovered = (selector) => {
            const domEl = getEl(selector);
            return domEl.parentNode.querySelector(':hover') === domEl;
        };


        /**
         * @description Append HTML content after the end of a node
         * @param html
         * @param context
         * @returns {*}
         */
        const appendAfter = (html, context) => {
            contx(context).insertAdjacentHTML('afterend', html.toString());
            return this;
        };


        /**
         * @description Append HTML content before the end of a node
         * @param html
         * @param context
         * @returns {*}
         */
        const appendBefore = (html, context) => {
            contx(context).insertAdjacentHTML('beforeend', html.toString());
            return this;
        };


        /**
         * @description Prepend HTML content after the beginning of a node
         * @param html
         * @param context
         * @returns {*}
         */
        const prependAfter = (html, context) => {
            contx(context).insertAdjacentHTML('afterbegin', html.toString());
            return this;
        };


        /**
         * @description Prepend HTML content before the beginning of a node
         * @param html
         * @param context
         */
        const prependBefore = (html, context) => {
            contx(context).insertAdjacentHTML('beforebegin', html.toString());
            return this;
        };


        /**
         * @description Linear iterator for object properties
         * @param elements
         * @param callback
         */
        const each = (elements, callback) => {
            Object.keys(elements).forEach((k, i) => {
                callback(elements[k], i);
            });
            return this;
        };


        /**
         * @description Check if value is of type 'object'
         * @param val
         * @returns {boolean}
         */
        const isObj = val => typeof val === 'object' && !isArr(val) && !isNull(val);


        /**
         * @description Check if value is of type 'null'
         * @param val
         * @returns {boolean}
         */
        const isNull = val => val === null;


        /**
         * @description Check if value is of type 'number'
         * @param val
         * @returns {boolean}
         */
        const isNum = val => typeof val === 'number' && !isNaN(val);


        /**
         * @description Check if value is of type 'function'
         * @param val
         * @returns {boolean}
         */
        const isFunc = val => typeof val === 'function';


        /**
         * @description Check if value is of type 'array'
         * @param val
         * @returns {boolean}
         */
        const isArr = val => Array.isArray(val);


        /**
         * @description Check if value is of type 'string'
         * @param val
         * @returns {boolean}
         */
        const isStr = val => typeof val === 'string';


        /**
         * @description Check if value is of type 'undefined'
         * @param val
         * @returns {boolean}
         */
        const isUndef = val => typeof val === 'undefined';


        /**
         * @description Check if value is of type 'boolean'
         * @param val
         * @returns {boolean}
         */
        const isBool = val => typeof val === 'boolean';


        /**
         * @description Check if object has property
         * @param obj
         * @param prop
         * @returns {boolean}
         */
        const hasProp = (obj, prop) => obj.hasOwnProperty(prop);


        /**
         * @description Check if object has method
         * @param obj
         * @param method
         * @returns {boolean}
         */
        const hasMethod = (obj, method) => hasProp(obj, method) && isFunc(method);


        /**
         * @description Check if object has key
         * @param obj
         * @param key
         * @returns {boolean}
         */
        const hasKey = (obj, key) => getKeys(obj).indexOf(key) > -1;


        /**
         * @description Get object keys
         * @param obj
         * @returns {Array}
         */
        const getKeys = obj => Object.keys(obj);


        /**
         * @description Iterate over each key of an object
         * @param obj
         * @param callback
         */
        const eachKey = (obj, callback) => {
            Object.keys(obj).forEach((k, i) => callback(obj[k], k, i));
        };


        /**
         * @description Get url param
         * @param name
         * @returns {Array|{index: number, input: string}|*|string}
         */
        const getUrlParam = (name) => {
            const match = new RegExp(`[?&]${name}=([^&]*)`).exec(window.location.search);
            return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
        };


        /**
         * Public
         * Random Inclusive
         * @param min
         * @param max
         * @returns {*}
         */
        const randomInclusive = (min, max) => {
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
        const recurIter = (handler, complete, index) => {
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
        const poll = (handler, complete, interval) => {
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
        const buffer = function() {
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
        const extend = function() {
            let obj = arguments[0];
            let enhancedObj = Object.assign(obj, {});
            let extenders = [];
            eachKey(arguments, (argument, key, index) => {
                if ( index > 0 ) {
                    extenders.push(argument);
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
        const compile = (html, items) => {
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
        const template = (html, items) => {
            let compiled;
            let observerTag = {
                start: '{{',
                end: '}}'
            };
            let dataAttr = {
                id: 'data-ammo-key',
                idValue: 'data-ammo-key-value',
                observer: 'data-ammo-observer'
            };
            let identifierRegex = /(key:[a-zA-Z]+)/g;
            let getObserverSchema = () => {
                return {
                    indexStart: 0,
                    indexEnd: 0,
                    name: '',
                    value: '',
                    context: '',
                    selector: '',
                    isAttr: false
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

            let getObservers = (html, getObserverSchema, observerTag) => {
                let observersArr = [];
                let indexStart = html.indexOf(observerTag.start);
                let indexEnd = html.indexOf(observerTag.end);
                if ( indexStart > -1 && indexEnd > -1 ) {
                    while ( indexStart > -1 && indexEnd > -1 ) {
                        let observer = getObserverSchema();
                        observer.name = html.substring(indexStart, indexEnd).replace(observerTag.start, '').replace(observerTag.end, '');
                        observersArr.push(observer);
                        if ( indexStart - 2 > 0 && html[indexStart - 2] === '=' ) {
                            observer.isAttr = true;
                        }
                        indexStart = html.indexOf(observerTag.start, indexStart + 1);
                        indexEnd = html.indexOf(observerTag.end, indexEnd + 1);
                    }
                }
                return observersArr;
            };
            let observers = getObservers(html, getObserverSchema, observerTag);

            let compileTemplate = (html, items, observers, identifier) => {
                let compiled = '';
                items.forEach((item) => {
                    let template = html;
                    template = setIdentifier(template, identifier, item[identifier]);

                    if ( observers.length > 0 ) {
                        observers.forEach((observer) => {
                            observer.value = item[observer.name];
                            if ( ! observer.isAttr ) {
                                template = template.replace(new RegExp(observerTag.start+observer.name+observerTag.end, 'g'), getTemplate(observer.name, item[observer.name]));
                            } else {
                                template = template.replace(new RegExp(observerTag.start+observer.name+observerTag.end, 'g'), observer.value);
                            }
                        });
                    }
                    compiled += template;
                });
                return compiled.replace(/{/g, '').replace(/}/g, '');
            };
            compiled = compileTemplate(html, items, observers, identifier);

            return {
                render(domTarget, callback) {
                    domTarget.innerHTML = compiled;
                    if ( isFunc(callback) ) {
                        callback();
                    }
                },
                update(id, name, value) {
                    let context = contx().querySelector(`[${dataAttr.id}="${identifier}"][${dataAttr.idValue}="${id}"]`);
                    const domObservers = context.querySelectorAll(`[${dataAttr.observer}="${name}"]`);
                    each(domObservers, observer => observer.textContent = value);
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
        const req = (options) => {
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
                let params = [];
                let dataKeys = getKeys(options.data);
                dataKeys.forEach((k) => {
                    params.push(`${k}=${(options.data[k])}`);
                });
                xhr.send(params.join('&'));
            } else {
                xhr.send();
            }
        };

        const store = function(key) {
            let storage;
            if ( ! isStr(key) ) {
                return new Error("[Storage] Invalid storage key. Provide a key {string}.");
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

            let decodeData = function(data) {
                return JSON.parse(data);
            };
            let encodeData = function(data) {
                return JSON.stringify(data);
            };
            let getData = function(key) {
                return decodeData(storage.getStorageItem(key));
            };
            let setData = function(key, data) {
                storage.setStorageItem(key, encodeData(data));
            };
            let removeData = function(key) {
                storage.removeStorageItem(key);
            };

            return {
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
        const sequence = function() {
            let chained = [];
            let value;
            let error;

            const chain = function(func) {
                if ( chained ) {
                    chained.push(func);
                }
                return this;
            };
            const execute = function(index) {
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
                chain,
                execute
            };
        };


        /**
         * Public
         * App
         * @param {object} storeData
         * @param {object} config
         * @returns {Error}
         */
        const app = function(storeData, config) {
            const hasStore = isObj(storeData);
            const hasConfig = isObj(config);
            const isGlobal = hasConfig && isBool(config.global) && config.global;

            if ( isGlobal && ! hasConfig || isGlobal && hasConfig && isUndef(config.name) ) {
                return new Error(`[Initialzr] Invalid initialization. Global applications require a name. Pass a name as part of the app's config.`);
            }
            let app = {
                config: hasConfig ? config : {},
                store: hasStore ? storeData : {},
                storeKey: '',
                nodes: {}
            };
            let schemas = {
                'default': ['events', 'renderers', 'actions'],
                app: ['events', 'actions', 'common', 'modules', 'core']
            };
            let storage;
            const date = new Date();

            const factory = function() {
                const augment = function(nodeFamily) {
                    let nodes = app.nodes;
                    const families = !isArr(nodeFamily) ? [nodeFamily] : nodeFamily;
                    families.map(family => {
                        if ( ! hasProp(nodes, family) ) {
                            nodes[family] = {};
                        }
                    });
                    return this;
                };

                const addSchema = function(schemaName, schema) {
                    if ( ! hasProp(schemas, schemaName) && isArr(schema) ) {
                        schemas[schemaName] = schema;
                    }
                    return this;
                };

                const schema = function(schema) {
                    if ( hasProp(schemas, schema) ) {
                        augment(schemas[schema]);
                    }
                    return this;
                };

                const addNode = function(nodeFamily, nodeName, func) {
                    let nodes = app.nodes;
                    if ( hasProp(nodes, nodeFamily) && ! hasProp(nodes[nodeFamily], nodeName) && isFunc(func) ) {
                        nodes[nodeFamily][nodeName] = func;
                    }
                    return this;
                };

                const getNode = function(nodeFamily, nodeName) {
                    let nodes = app.nodes;
                    if ( hasProp(nodes, nodeFamily) && hasProp(nodes[nodeFamily], nodeName) && isFunc(nodes[nodeFamily][nodeName]) ) {
                        return nodes[nodeFamily][nodeName];
                    } else {
                        return false;
                    }
                };

                const callNode = function(nodeFamily, nodeName, params) {
                    const nodeParams = ! isUndef(params) ? params : {};
                    let node = getNode(nodeFamily, nodeName);
                    if ( node ) {
                        node(nodeParams);
                    }
                    return this;
                };

                const getNodes = function(nodeFamily) {
                    return nodeFamily && hasProp(app.nodes, nodeFamily) ? app.nodes[nodeFamily] : app.nodes;
                };

                const configure = function(nodeFamily) {
                    const nodes = app.nodes;
                    if ( hasProp(nodes, nodeFamily) ) {
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

                const nodeExists = function(nodeFamily, nodeName) {
                    return hasProp(app.nodes, nodeFamily) && isFunc(app.nodes[nodeFamily][nodeName]);
                };

                const getConfig = function(name) {
                    let config = app.config;
                    if ( hasProp(config, name) ) {
                        return config[name];
                    } else {
                        return false;
                    }
                };

                const inherit = function(app, nodeFamilies) {
                    const nodes = app.getNodes();

                    eachKey(nodes, (nodeFamily, familyName) => {
                        if ( nodeFamilies && nodeFamilies.indexOf(familyName) === -1 ) {
                            return false;
                        }
                        augment(familyName);
                        eachKey(nodeFamily, (node, nodeName) => addNode(familyName, nodeName, node));
                    });
                    return this;
                };

                const overwrite = function(nodeFamily) {
                    const nodes = app.nodes;
                    if ( hasProp(nodes, nodeFamily) ) {
                        return {
                            node: function(nodeName, func) {
                                nodes[nodeFamily][nodeName] = func;
                                return this;
                            },
                            overwrite: this.overwrite
                        };
                    }
                    return false;
                };

                const getStore = function(storeKey) {
                    const store = app.store;
                    return hasProp(store, storeKey) ? store[storeKey] : store;
                };

                const getStoreData = function(storeKey) {
                    const store = app.store;
                    return hasProp(store, storeKey) && ! isUndef(store[storeKey].lastValue) ? store[storeKey].lastValue : undefined;
                };

                const updateStore = function(storeKey, handler) {
                    const store = app.store;
                    if ( ! hasProp(store, storeKey) ) {
                        return false;
                    }
                    const dataItem = {
                        value: store[storeKey].lastValue ? handler(store[storeKey].lastValue) : handler(store[storeKey]),
                        modified: date.getTime()
                    };

                    store[storeKey] = {
                        values: isArr(store[storeKey].values) ? [...store[storeKey].values, ...[dataItem]] : [dataItem],
                        lastValue: dataItem.value,
                        modified: dataItem.modified
                    };
                    if ( storage ) {
                        storage.setItem(storeKey, dataItem.value);
                    }
                };

                const syncStorage = function(storeKey) {
                    if ( ! app.storeKey && isStr(storeKey) ) {
                        app.storeKey = storeKey;
                        storage = store(storeKey);
                        storage.setData(app.store);
                    }
                    return this;
                };

                const getStorage = function(storeKey) {
                    return isStr(storeKey) ? storage.getItem(storeKey) : storage.getData();
                };

                const createInstance = function() {
                    return {
                        schema,
                        addSchema,
                        augment,
                        configure,
                        addNode,
                        getNode,
                        callNode,
                        nodeExists,
                        getNodes,
                        getConfig,
                        inherit,
                        overwrite,
                        getStore,
                        getStoreData,
                        updateStore,
                        syncStorage,
                        getStorage
                    };
                };

                return createInstance();
            };

            const setGlobal = instance => base[app.config.name] = base[app.config.name] || instance;

            if ( isGlobal ) {
                setGlobal(factory());
            } else {
                return factory();
            }
        };


        /**
         *
         * @param selection
         * @param index
         * @param prop
         * @param value
         */
        const style = (selection, prop, value, index) => {
            selection.style.setProperty(prop, isFunc(value) ? value(selection, index) || selection.style.getProperty(prop) : value, '');
        };


        /**
         *
         * @param selection
         * @param prop
         * @param value
         * @param index
         */
        const attr = (selection, prop, value, index) => {
            const currValue = selection.getAttribute(prop);
            selection.setAttribute(prop, isFunc(value) ? (value(selection, currValue, index) || currValue) : value);
        };


        /**
         *
         * @param selection
         * @param value
         * @param index
         */
        const elText = (selection, value, index) => {
            selection.innerHTML = isFunc(value) ? value(selection.innerHTML, index) || selection.innerHTML : value;
        };

        /**
         *
         * @param selection
         * @param value
         * @param selector
         * @param index
         * @returns {*}
         */
        const filter = (selection, value, selector, index) => {
            if ( isFunc(value) ) {
                return value(selection, index);
            }
            if ( isStr(value) ) {
                if ( value.indexOf(':') === -1 ) {
                    return selection.classList.contains(value);
                }

                const matches = selection.parentNode.querySelectorAll(`${selector}${value}`);
                let isMatch = false;
                each(matches, el => {
                    if ( el.isSameNode(selection) && ! isMatch ) {
                        isMatch = true;
                    }
                });
                return isMatch;
            }
        };


        /**
         * @description Select a single DOM node, matching a selector
         * @param selector
         * @param context
         * @returns {object}
         */
        const select = function(selector, context) {
            let selection = isStr(selector) ? contx(context).querySelector(selector) : selector;
            return {
                find(findSelector) {
                    selection = getEl(findSelector, selection);
                    return this;
                },
                text(value) {
                    elText(selection, value, 0);
                    return this;
                },
                style(prop, value) {
                    style(selection, prop, value, 0);
                    return this;
                },
                attr(prop, value) {
                    attr(selection, prop, value, 0);
                    return this;
                },
                data(data) {
                    selection.innerHTML = data;
                    return this;
                },
                on(event, callback) {
                    selection.addEventListener(event, callback);
                    return this;
                },
                get: () => selection
            }
        };


        /**
         * @description Select all DOM nodes, matching a selector
         * @param selector
         * @param context
         * @returns {object}
         */
        const selectAll = function(selector, context) {
            let selection = contx(context).querySelectorAll(selector);
            let filtered;
            return {
                filter(value) {
                    filtered = [];
                    ammo.each(selection, (el, index) => {
                        if ( filter(el, value, selector, index) ) {
                            filtered.push(el);
                        }
                    });
                    selection = filtered;
                    return this;
                },
                find(findSelector) {
                    if ( filtered ) {
                        filtered = getEls(findSelector, filtered.firstChild);
                    } else {
                        selection = getEls(findSelector, selection.firstChild);
                    }
                    return this;
                },
                text(value) {
                    ammo.each(filtered || selection, (el, index) => elText(el, value, index));
                    return this;
                },
                style(prop, value) {
                    ammo.each(filtered || selection, (el, index) => style(el, prop, value, index));
                    return this;
                },
                attr(prop, value) {
                    ammo.each(filtered || selection, (el, index) => attr(el, prop, value, index));
                    return this;
                },
                data(data) {
                    ammo.each(filtered || selection, (el, index) => el.innerHTML = data[index]);
                    return this;
                },
                on(event, callback) {
                    ammo.each(filtered || selection, (el, index) => el.addEventListener(event, callback));
                    return this;
                },
                async(handler, complete) {
                    const sequencer = sequence();

                    ammo.each(filtered || selection, (el, index) => {
                        sequencer.chain(seq => handler(seq.resolve, el, index));
                    });

                    if ( isFunc(complete) ) {
                        sequencer.chain(seq => complete());
                    }

                    sequencer.execute();
                    return this;
                },
                get: () => filtered || selection
            }
        };


        /**
         * Public API
         */
        return {
            onDomReady,
            onHover,
            delegateEvent,
            getEl,
            isHovered,
            appendAfter,
            appendBefore,
            prependAfter,
            prependBefore,
            removeEl,
            each,
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
            eachKey,
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
            app,
            select,
            selectAll
        };
    })();
})(window);
