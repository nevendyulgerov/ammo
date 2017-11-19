
((base) => {
    'use strict';

    /**
     * Library: Ammo
     * Version: 1.3.7
     * Standard: ECMAScript 2015
     * Author: Neven Dyulgerov
     * License: Released under the MIT license
     *
     * Description:
     * Provides general purpose utility belt for building front-end applications
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
         * @description Get random integer between two numbers
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
         * @description Iterate recursively
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
         * @description Poll over an interval of time
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
         * @description Buffer high-frequency events
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
         * @description Augment object with properties from other objects
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
         * @description Compile observable HTML strings to DOM nodes
         * @param html
         * @param items
         * @returns {object}
         */
        const template = (html, items) => {
            let compiled;
            const observerTag = {
                start: '{{',
                end: '}}'
            };
            const dataAttr = {
                id: 'data-ammo-key',
                idValue: 'data-ammo-key-value',
                observer: 'data-ammo-observer'
            };
            const valueObserver = '_ao_';
            const identifierRegex = /(key:[a-zA-Z]+)/g;
            const getObserverSchema = () => {
                return {
                    index: 0,
                    name: '',
                    value: '',
                    isAttr: false,
                    attr: ''
                };
            };
            const getIdentifier = (html) => {
                let match = html.match(identifierRegex);
                let tag = match[0];
                let index = tag.indexOf(':');
                return tag.substring(index + 1, tag.length);
            };
            const setIdentifier = (html, identifier, value) => {
                let match = html.match(identifierRegex);
                let tag = match[0];
                let index = html.indexOf(tag);
                return `${html.substring(0, index - 1)}${dataAttr.id}="${identifier}" ${dataAttr.idValue}="${value.toLowerCase()}"${html.substring(index + tag.length + 1, html.length)}`;
            };
            const identifier = getIdentifier(html);

            const getObservers = (html, getObserverSchema, observerTag) => {
                let observersArr = [];
                let indexStart = html.indexOf(observerTag.start);
                let indexEnd = html.indexOf(observerTag.end);
                if ( indexStart > -1 && indexEnd > -1 ) {
                    while ( indexStart > -1 && indexEnd > -1 ) {
                        let observer = getObserverSchema();
                        observer.name = html.substring(indexStart, indexEnd).replace(observerTag.start, '').replace(observerTag.end, '');
                        observersArr.push(observer);
                        if ( indexStart - 2 >= 0 && html[indexStart - 2] === '=' ) {
                            observer.isAttr = true;
                            let spaceIndex = indexStart - 3;
                            let attrLetterCount = 0;
                            let spaceFound = false;
                            let attrName = '';
                            while ( ! spaceFound && spaceIndex >= 0 ) {
                                if ( html[spaceIndex] === ' ' ) {
                                    spaceFound = true;
                                    observer.index = html.indexOf('>', spaceIndex);
                                    break;
                                }
                                attrName += html[spaceIndex];
                                spaceIndex--;
                                attrLetterCount++;
                            }
                            observer.attr = attrName.split('').reverse().join('');
                        } else {
                            observer.index = html.indexOf('>', indexStart - observerTag.start.length);
                        }
                        indexStart = html.indexOf(observerTag.start, indexStart + 1);
                        indexEnd = html.indexOf(observerTag.end, indexEnd + 1);
                    }
                }
                return observersArr;
            };
            let observers = getObservers(html, getObserverSchema, observerTag);

            const insertValueObserverTags = (html) => {
                let modifiedHtml = html;
                let valueObserverCount = 0;
                observers.forEach((observer) => {
                    if ( ! observer.isAttr ) {
                        if ( valueObserverCount > 0 ) {
                            modifiedHtml = [modifiedHtml.slice(0, observer.index + valueObserver.length - 1), valueObserver, modifiedHtml.slice(observer.index + valueObserver.length)].join('');
                        } else {
                            modifiedHtml = [modifiedHtml.slice(0, observer.index), valueObserver, modifiedHtml.slice(observer.index + 1)].join('');
                        }
                        valueObserverCount++;
                    }
                });
                return modifiedHtml;
            };

            html = insertValueObserverTags(html);

            let compileTemplate = (html, items, observers, identifier) => {
                let compiled = '';
                items.forEach((item) => {
                    let template = html;
                    template = setIdentifier(template, identifier, item[identifier]);

                    if ( observers.length > 0 ) {
                        observers.forEach(observer => {
                            observer.value = item[observer.name];
                            let closingTagIndex = template.indexOf('>', observer.index);
                            const observerAttr = ` data-ammo-observer="${observer.name}"`;

                            if ( ! observer.isAttr ) {
                                template = template.replace(new RegExp(valueObserver), `${observerAttr}>`);
                                template = template.replace(new RegExp(observerTag.start+observer.name+observerTag.end, 'g'), item[observer.name]);
                            } else {
                                template = [template.slice(0, closingTagIndex), observerAttr, template.slice(closingTagIndex)].join('');
                                template = template.replace(new RegExp(observerTag.start+observer.name+observerTag.end, 'g'), item[observer.name]);
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
                updateVal(key, name, value) {
                    selectAll(`[${dataAttr.id}="${identifier}"][${dataAttr.idValue}="${key.toLowerCase()}"]`).each(el => {
                        selectAll(`[${dataAttr.observer}="${name}"]`, el).each(observer => observer.innerHTML = value);
                    });
                },
                updateAttr(key, name, value) {
                    const internalObserver = observers.filter(observer => observer.name === name)[0];
                    selectAll(`[${dataAttr.id}="${identifier}"][${dataAttr.idValue}="${key.toLowerCase()}"]`).each(el => {
                        selectAll(`[${dataAttr.observer}="${name}"]`, el).each(observer => observer.setAttribute(internalObserver.attr, value));
                    });
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
         * @description AJAX API based on XMLHttpRequest
         * @param options
         */
        const req = (options) => {
            const xhr = new XMLHttpRequest();
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
                const dataKeys = getKeys(options.data);
                dataKeys.forEach((k) => params.push(`${k}=${(options.data[k])}`));
                xhr.send(params.join('&'));
            } else {
                xhr.send();
            }
        };


        /**
         * @description Local storage API
         * @param key
         * @returns {*}
         */
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

            const decodeData = function(data) {
                return JSON.parse(data);
            };
            const encodeData = function(data) {
                return JSON.stringify(data);
            };
            const getData = function(key) {
                return decodeData(storage.getStorageItem(key));
            };
            const setData = function(key, data) {
                storage.setStorageItem(key, encodeData(data));
            };
            const removeData = function(key) {
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
         * @description Create sequential execution for async functions
         * @returns {{chain: chain, execute: execute}}
         */
        const sequence = function() {
            const chained = [];
            let value;
            let error;

            const chain = function(func) {
                if ( chained ) {
                    chained.push(func);
                }
                return this;
            };
            const execute = function(index = 0) {
                if ( ! chained || index >= chained.length ) {
                    return true;
                }

                const callback = chained[index];
                callback({
                    resolve(_value) {
                        value = _value;
                        execute(++index);
                    },
                    reject(_error) {
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
         * @description Create encapsulated, augmentative, object-based application
         * @param {object} store
         * @param {object} props
         * @returns {Error}
         */
        const app = function(store, props) {
            const hasStore = isObj(store);
            const hasProps = isObj(props);
            const isGlobal = hasProps && isBool(props.global) && props.global;

            if ( isGlobal && ! hasProps || isGlobal && hasProps && isUndef(props.name) ) {
                throw new Error(`[ammo.app] Invalid initialization. Global applications require a name{string}. Pass a name as part of the app's props{object}.`);
            }
            let app = {
                store: hasStore ? store : {},
                props: hasProps ? props : {},
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

                const getProps = function(name) {
                    const props = app.props;
                    if ( hasProp(props, name) ) {
                        return props[name];
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

                const syncStorage = function() {
                    if ( isUndef(app.props.name) ) {
                        throw new Error(`[ammo.app] Invalid synchronization with localStorage. Synchronized apps require a name. Pass a name as part of the app's props.`);
                    }
                    storage = ammo.store(app.props.name);
                    storage.setData(app.store);
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
                        getProps,
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
                return setGlobal(factory());
            } else {
                return factory();
            }
        };


        /**
         * @description Set style property for given node
         * @param selection
         * @param index
         * @param prop
         * @param value
         */
        const style = (selection, prop, value, index) => {
            const currStyle = selection.style.getPropertyValue(prop);
            selection.style.setProperty(prop, isFunc(value) ? (value(selection, currStyle, index) || selection.style.getProperty(prop, currStyle)) : value, '');
        };


        /**
         * @description Set attribute property for given node
         * @param {object} selection
         * @param {string} prop
         * @param {string/function} value
         * @param {number} index
         */
        const attr = (selection, prop, value, index) => {
            const currValue = selection.getAttribute(prop);
            selection.setAttribute(prop, isFunc(value) ? (value(selection, currValue, index) || currValue) : value);
        };


        /**
         * @description Set innerHTML for given node
         * @param {object} selection
         * @param {(string|function)} value
         * @param {number=} index
         */
        const elText = (selection, value, index) => {
            const currText = selection.innerHTML;
            selection.innerHTML = isFunc(value) ? value(currText, index) || currText : value;
        };


        /**
         * @description Filter nodes based on signature (static - value is a string, dynamic - value is a function)
         * @param {object} selection
         * @param {(string|function)} value
         * @param {string} selector
         * @param {number=} index
         * @returns {*}
         */
        const filterNode = (selection, value, selector, index) => {
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
         * @description DOM manipulation API for single node
         * @param {(string|object)} selector
         * @param {object=} context
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
         * @description DOM manipulation API for node lists
         * @param {string} selector
         * @param {object=} context
         * @returns {object}
         */
        const selectAll = function(selector, context) {
            let selection = getEls(selector, context);
            let filtered;
            return {
                filter(value) {
                    filtered = [];
                    ammo.each(selection, (el, index) => {
                        if ( filterNode(el, value, selector, index) ) {
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
                each(handler) {
                    ammo.each(filtered || selection, handler);
                },
                eq(index) {
                    const nodes = filtered || selection;
                    return nodes.length > 0 && isObj(nodes[index]) ? nodes[index]: undefined;
                },
                index(indexSelector) {
                    let matchIndex = -1;
                    this.each((el, index) => {
                        if ( el.isSameNode(indexSelector) && matchIndex === -1 ) {
                            matchIndex = index;
                        }
                    });
                    return matchIndex;
                },
                async(handler, complete) {
                    const sequencer = ammo.sequence();
                    const nodes = filtered || selection;

                    ammo.each(nodes, (el, index) => {
                        sequencer.chain(seq => handler(seq.resolve, el, index, nodes.length));
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
         * @description Scroll spy API, exposing callbacks for 'scroll' events
         * @param {object} options
         */
        const scrollSpy = (options) => {
            const isValid = isObj(options) && (isNum(options.offset) || isFunc(options.offset)) && isObj(options.callbacks) && isFunc(options.callbacks.onBefore) && isFunc(options.callbacks.onAfter);

            if ( ! isValid ) {
                throw new Error('[Ammo.scrollSpy] Invalid initialization. Make sure to provide an options object, containing offset{number} and callbacks{object}, containing onBefore{function} and onAfter{function}.');
            }

            const offset = options.offset;
            const callbacks = options.callbacks;
            const initOnLoad = isBool(options.initOnLoad) ? options.initOnLoad : false;
            let docElem = document.documentElement;
            let didScroll = false;

            const scrollY = () => window.pageYOffset || docElem.scrollTop;

            const scrollPage = () => {
                const sy = scrollY();
                const targetOffset = isFunc(offset) ? offset() : offset;

                if ( sy < targetOffset ) {
                    callbacks.onBefore(sy, targetOffset);
                } else {
                    callbacks.onAfter(sy, targetOffset);
                }

                didScroll = false;
            };

            const init = function() {
                window.addEventListener('scroll', () => {
                    if ( !didScroll ) {
                        setTimeout( scrollPage, 50 );
                        didScroll = true;
                    }
                }, false);
            };

            if ( initOnLoad ) {
                scrollPage();
            }

            init();
        };


        /**
         * Public API
         */
        return {
            onDomReady,
            onHover,
            delegateEvent,
            getEl,
            getEls,
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
            template,
            req,
            store,
            sequence,
            app,
            select,
            selectAll,
            scrollSpy
        };
    })();
})(window);
