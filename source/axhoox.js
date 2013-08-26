;(function(PACKAGE, $, $axure, console, makeSandbox) {

    if (!window.hasOwnProperty(PACKAGE)) {

        window[PACKAGE] = {
            init    : false
        };

    } else {

        // We've already been here. Definetely there's more than one
        // starter on page and it's nothing more, nothing less
        // than a usual waste of time.
        console.warn('Duplicated starter on page. Fix it please.');
        return;
    }

    var

    ////////////////////////////////////////////////////////////////////////////////////
    // constants
    ////////////////////////////////////////////////////////////////////////////////////

    // for debugging purposes
    USER_SCRIPT_NAME_PREFIX = PACKAGE.toLowerCase() + '_',

    // object types corresponding to Axure scheme
    MASTER_REF_TYPE = 'referenceDiagramObject', // master reference
    DYNAMIC_PANEL_TYPE = 'dynamicPanel', // dynamic panel reference
    PAGE_TYPE = 'Axure:Page', // page
    BUTTON_SHAPE_TYPE = 'buttonShape',
    RICH_TEXT_PANEL_TYPE = 'richTextPanel',
    IMAGE_TYPE = 'image',

    // event names for basic hooks
    EVENT_NAMES = ['click', 'mouseover', 'mouseout', 'change', 'keyup', 'focus', 'blur' ],

    // special event names for a little bit special hooks
    SPECIAL_EVENT_NAMES = [
        'widgetIdToDragDropFunction',
        'widgetIdToDragFunction',
        'widgetIdToHideFunction',
        'widgetIdToMoveFunction',
        'widgetIdToPanelStateChangeFunction',
        'widgetIdToShowFunction',
        'widgetIdToStartDragFunction',
        'widgetIdToSwipeLeftFunction',
        'widgetIdToSwipeRightFunction'
    ],

    // regexps for querying rdo##AAA type functions
    RDO_RX = /^rdo(\d+)(\D+)$/,
    RDO_SPLIT_RX = /(rdo\d+\S+?(?=\,))/,

    // status master name BEWARE!!! it's RESERVED!!!
    STATUS_MASTER = 'axhoox-status',

    // "Status ready" and "Prepare master context" events.
    // Their names are also reserved in conjunction with
    // Status master. You can use them in different
    // masters especialy when you want to bubble them
    // up the document tree.
    STATUS_READY_EVENT = 'AxHooxReady',
    PREPARE_MASTER_CONTEXT_EVENT = 'AxHooxPrepareMasterContext',

    // bit flags for API method creation
    FL_ASIS = 0x0000,   // take as is - given function is ready to serve as a method
    FL_PROXY = 0x0001,  // wrap with a proxy function which create appropriate scope
    FL_VAL = 0x0002,    // proxy method should return a value instead of default context object return
    FL_W = 0x0004,      // writable, enable override
    FL_THIS = 0x0008,   // proxied fn should be applied to this
    FL_ALL = 0xFFFF,    // all flags enabled

    // API mapping sets
    // defined few hunred lines down
    API_MAP,

    // prototype of basic scriptContext
    _defaultContext,

    // prototype of masterContext
    _defaultMasterContext,

    ////////////////////////////////////////////////////////////////////////////////////
    // runtime vars
    ////////////////////////////////////////////////////////////////////////////////////

    // dictionary of Axure generated objects in translation to path's they occupy
    _scriptIdToPath = {},
    // paths translated to instantiated contexts
    _pathToContext = {},
    // Path's to masters ordered same as they were generated. For hooking custom events.
    _rdoFnToPath = [],
    // Widgets owning widgets and we're keeping track of this
    _scriptIdToOwnerIndex = {},

    // here is kept calling environment during the hook time
    _currentCallInfo,

    // Axure's own function for setting vars. Hooked.
    _savedSetVariableValueHandler,

    // Name of variable that will serve as a carrier for the script
    _triggeringVarName,

    // script cache
    _scripts = {};

    ////////////////////////////////////////////////////////////////////////////////////
    // Basic hooking.
    // Wraping any future calls with envelopes preserving state
    // and redirecting back to user's code parts
    ////////////////////////////////////////////////////////////////////////////////////

    // prepare a restore function
    function _makeRestoreFn(callInfo) {
        return function() {
            _currentCallInfo = callInfo;
        };
    }

    // save calling information object
    function _saveCallInfo(callInfo, args) {
        callInfo = $.extend(true, {}, callInfo, {
            restore : _makeRestoreFn(_currentCallInfo),
            args    : args
        });
        _currentCallInfo = callInfo;
    }

    // restore calling information object
    function _restoreCallInfo() {
        if (typeof (_currentCallInfo) !== 'undefined') {
            _currentCallInfo.restore();
        }
    }

    // wrap any function with an encelope preserving calling info object
    function _wrap(fn, callInfo) {
        return function() {
            _saveCallInfo(callInfo, Array.prototype.slice.call(arguments));
            fn.apply(this, arguments);
            _restoreCallInfo();
        };
    }

    // wrap an rdo function
    function _wrapRdoFn(rxResult, rdoIdx, eventName) {
        var rdoName = 'rdo' + rdoIdx + eventName,
            fn = window[rdoName];

        window[rdoName] = _wrap(window[rdoName], {
            eventName     : eventName,
            path        : _rdoFnToPath[rdoIdx]
        });
    }

    // wrap all handlers for provided eventName and scriptId
    function _wrapObjectEventHandlers(scriptId, eventName) {

        var domCtx = document.getElementById(scriptId),
            evInfo = $._data(domCtx, 'events'),
            $domCtx;

        if (!evInfo || !evInfo[eventName] || !evInfo[eventName].length) {
            // no handlers, return
            return;
        }

        $domCtx = $(domCtx);

        evInfo[eventName].forEach(function(ei) {
            var handler = ei.handler;
            $domCtx.off(eventName, handler);
            $domCtx.on(eventName, _wrap(handler, {
                eventName     : eventName,
                path        : _scriptIdToPath[scriptId]
            }));
        });

    }


    ////////////////////////////////////////////////////////////////////////////////////
    // ScriptContext API
    ////////////////////////////////////////////////////////////////////////////////////

    // agnostics (low level)

    // return context object for given path
    function _getContext(path) {
        if (typeof(_pathToContext[path]) === 'string') {
            // lazy evauation on a path basis
            var scriptId = _pathToContext[path],
                axObject = $axure.pageData.scriptIdToObject[scriptId],
                initContext = _getApiPrototype(axObject.type),
                o;

            if (axObject.type === MASTER_REF_TYPE) {
                initContext = $axure.pageData.masters[axObject.masterId]._axHooxMasterContext || initContext;
            }
            _pathToContext[path] = o = Object.create(initContext);
            ScriptContext.call(o, path, scriptId, _scriptIdToOwnerIndex[scriptId]);
            delete _scriptIdToOwnerIndex[scriptId];
            return o;
        }

        return _pathToContext[path];
    }

    // provide path ow owning object
    function _getOwnerPath(path) {
        var scriptId = _pathToContext[path], oidx;
        if (scriptId instanceof ScriptContext) {
            oidx = scriptId.ownerIdx;
        } else {
            oidx = _scriptIdToOwnerIndex[scriptId];
        }
        return oidx === -1 ? '/' : _rdoFnToPath[oidx];
    }

    // trigger any custom event on any master
    function _fireRemoteEvent(path, eventName, rdoIdx) {
        var bIsRdoIdx = typeof(rdoIdx) !== 'undefined', args, fn;
        args = Array.prototype.slice.call(arguments, bIsRdoIdx ? 3 : 2);
        rdoIdx = bIsRdoIdx ? rdoIdx : _rdoFnToPath.indexOf(path);
        fn = rdoIdx !== -1 && window['rdo' + rdoIdx + eventName];
        if (fn instanceof Function) {
            fn.apply(null, args);
        }
    }

    // return button shape's or rich text panel's formated html
    // or any other object's plain text
    function _getRtf(id, diagramObjectType) {

        // optimization for when type is already known
        diagramObjectType = diagramObjectType || $axure.getTypeFromScriptId(id);

        if (diagramObjectType === BUTTON_SHAPE_TYPE) {
            id = GetTextIdFromShape(id);
        }

        var idQuery = $('#' + id);
        if (idQuery.is('div')) {
            return idQuery.find('div[id$="_rtf"]').html();
        }

        if (idQuery.is('input') &&
            (idQuery.attr('type') === 'checkbox' || idQuery.attr('type') === 'radio')) {
            return idQuery.parent().find('label').find('div[id$="_rtf"]').html();
        }

        return idQuery.val();
    }

    // get the same without formating
    function _getText(id) {
        if ($axure.getTypeFromScriptId(id) === BUTTON_SHAPE_TYPE) {
            id = GetTextIdFromShape(id);
        }
        return GetWidgetText(id);
    }

    // provide object's with brand new formated html strings
    function _setRtf(id, htmlText, diagramObjectType) {
        // optimization for when type is already known
        diagramObjectType = diagramObjectType || $axure.getTypeFromScriptId(id);
        if (diagramObjectType === BUTTON_SHAPE_TYPE) {
            id = GetTextIdFromShape(id);
        }
        SetWidgetRichText(id, htmlText);
    }

    // set tooltip's tittle attribute on any prototype element
    function _setTooltipText(id, txt) {
        $('#' + id).attr('title', txt);
    }

    // The resulting style sheet of prototype's element
    function _computeObjectStyle(diagramObject, state, excludeDefault) {
        return $.extend({},
            excludeDefault !== true && $axure.pageData.stylesheet.defaultStyles[diagramObject.type],
            diagramObject.style && diagramObject.style.baseStyle && $axure.pageData.stylesheet.stylesById[diagramObject.style.baseStyle],
            diagramObject.style,
            typeof(state) === 'string' && state.length > 0 && diagramObject.getStateStyleOverrides(state)
        );
    }

    // Provide objects with new text content having preserve original formatting
    function _setText(id, txt, force) {

        var type, styleType, styleProps, finalStyle, diagramObject, currentState, $rtf, $targetSpan, $targetP, canClone;

        txt = txt || '';

        diagramObject = $axure.pageData.scriptIdToObject[id];
        currentState = GetWidgetCurrentState(id);

        type = styleType = diagramObject.type;

        if (type === BUTTON_SHAPE_TYPE) {
            id = GetTextIdFromShape(id);
            type = RICH_TEXT_PANEL_TYPE;
        }

        if (type === RICH_TEXT_PANEL_TYPE) {

            $rtf = $('#' + id).find('div[id$="_rtf"]');

            $targetP = $rtf.children('p:first');

            canClone = $targetP.length > 0 && $targetP.children('span').length > 0;

            // taken from axurerp_beforepagescript.js modified a little
            if (force === true || !canClone) {
                $targetP = $('<p><span></span></p>');
                finalStyle = _computeObjectStyle(diagramObject, null);
                styleProps = GetCssStyleProperties(finalStyle);
            } else {
                $targetP = $targetP.clone();
                $targetP.children('span:not(:first)').remove();
            }

            $targetP.children().text(txt.replace(/\n/g, '--NEWLINE--'));
            if (styleProps) {
                $targetP.find('*').andSelf().each(function (index, element) {
                    ApplyCssProps(element, styleProps);
                });
            }

            SetWidgetRichText(id, $targetP.get(0).outerHTML.replace(/--NEWLINE--/g, '<br/>'));

            if (currentState !== 'normal' && (force === true || !canClone)) {
                // re apply state overrides
                styleProps = GetCssStyleProperties(diagramObject.getStateStyleOverrides(currentState));
                $rtf.find('*').each(function(index, element) {
                    ApplyCssProps(element, styleProps);
                });
            }


        } else {
            SetWidgetFormText(id, txt);
        }

    }

    // Change object's custom style according to one of defined during design
    function _setCustomStyle(scriptId, state, styleName) {

        if ('undefined' === typeof styleName) {
            styleName = state;
            state = null;
        }

        var customStyle, objectStyle, diagramObject, currentState, $div, styleProps;

        customStyle = $axure.pageData.stylesheet.customStyles[styleName];

        if (!customStyle) {
            return;
        }

        diagramObject = $axure.pageData.scriptIdToObject[scriptId];

        while (diagramObject.isContained) {
            diagramObject = diagramObject.parent;
        }

        objectStyle = diagramObject.style || (diagramObject.style = {});

        if (typeof(state) === 'string') {
            if (!objectStyle.stateStyles) {
                objectStyle.stateStyles = {};
            }
            objectStyle = objectStyle.stateStyles[state] || (objectStyle.stateStyles[state] = {});
        }

        objectStyle.baseStyle = customStyle.id;

        currentState = GetWidgetCurrentState(scriptId);

        if (currentState === state || (currentState === 'normal' && state === null)) {
            // get contents

            $div = $('<div>' + _getRtf(scriptId, diagramObject.type) + '</div>');
            $elements = $div.find('*');
            if ($elements.length > 0) {
                // apply new style
                styleProps = GetCssStyleProperties(_computeObjectStyle(diagramObject, state));
                $elements.each(function(index, element) {
                    ApplyCssProps(element, styleProps);
                });
                // put contents back to widget
                _setRtf(scriptId, $div.html(), diagramObject.type);
            }
        }

    }



    // methods

    // for masters
    function _fireEvent(eventName) {
        var args = Array.prototype.slice.call(arguments, 1);
        args.splice(0, 0, this.path, eventName, this.rdoIdx);
        _fireRemoteEvent.apply(null, args);
    }

    // common set context getters

    // any which way I can according to provided absolute or relative path
    function _getNewContext(newPath) {
        if (newPath.charAt(0) === '/') {
            // absolute path
            return _getContext(newPath);
        }
        return _getContext(this.path !== '/' ? this.path + '/' + newPath : this.path + newPath);
    }

    // parent's
    function _getParentContext() {
        var path = this.path;
        if (path.length > 1){
            path = path.split('/').slice(0, -1).join('/') || '/';
            return _getNewContext(path);
        }
        return this;
    }

    // owning master or page
    function _getOwnerContext() {
        if (this.ownerIdx >= 0 ) {
            return _getNewContext(_rdoFnToPath[this.ownerIdx]);
        }
        return this.page;
    }

    // for dynamic panels

    // helper, persist panel's states as an array
    function _fixPanelStates(states) {
        Object.defineProperty(this, 'getStates', {
            value : function() {
                return states.concat();
            },
            writable : false,
            enumerable : false
        });
    }

    // helper, lazy aquire states array upon first request
    // keeping cached for any future use
    function _getPanelStates() {
        var axCtx = $axure.pageData.scriptIdToObject[this.scriptId],
            s = [],
            i, l = axCtx.diagrams.length;
        for (i = 0; i < l; i++) {
            s.push(axCtx.diagrams[i].label);
        }
        _fixPanelStates.call(this, s);
        return this.getStates();
    }

    // get the name of dynamic panel's current state
    function _getPanelState() {
        var sid = GetPanelState(this.scriptId),
            m = sid.match(/^pd(\d+)u\d+$/);
        if (m) {
            return this.getStates()[parseInt(m[1], 10)];
        }
        return '';
    }

    // change panel's state according to provided name or numeric index
    function _setPanelState(scriptId, s) {
        var states = this.getStates(), i = -1, args;
        if (typeof(s) === 'number' && s < states.length) {
            i = s;
        } else {
            i = states.indexOf(s);
        }
        if (i !== -1) {
            args = Array.prototype.slice.call(arguments);
            args[1] = 'pd' + i + scriptId;
            SetPanelState.apply(null, args);
        }
    }

    // return widget's bounds
    function _getRect() {
        var widget = $('#' + this.scriptId);
        return new Rectangle(
            Number(widget.css('left').replace('px', '')),
            Number(widget.css('top').replace('px', '')),
            Number(widget.css('width').replace('px', '')),
            Number(widget.css('height').replace('px', ''))
        );
    }

    // page wide any state change notiffications pub sub queue
    function _states(sName) {

        if (!this._states) {
            Object.defineProperty(this, '_states', {
                value : {},
                writable : false,
                enumerable : false
            });
        }

        var sKey = PACKAGE + '.' + sName,
            self = this;

        if (!this._states.hasOwnProperty(sName)) {
            this._states[sName] = {};
            Object.defineProperty(this._states[sName], 'notify', {
                value : function(fn, thisObj) {
                    $axure.messageCenter.addStateListener(sKey, function(k, s) {
                        fn.call(thisObj || self, sName, s);
                    });
                },
                writable : false,
                enumerable : false
            });
            Object.defineProperty(this._states[sName], 'state', {
                get : function() {
                    return $axure.messageCenter.getState(sKey);
                },
                set : function(s) {
                    $axure.messageCenter.setState(sKey, s);
                },
                enumerable : false
            });
        }

        return this._states[sName];
    }

    // Set variable's new value as string
    function _setVariable(varName, varValue) {
        if (varName === _triggeringVarName) {
            return;
        }
        _savedSetVariableValueHandler(varName, String(varValue));
    }

    ////////////////////////////////////////////////////////////////////////////////////
    // Constructor
    ////////////////////////////////////////////////////////////////////////////////////

    function ScriptContext(path, scriptId, ownerIndex) {

        var _iAmPage = typeof(scriptId) === 'undefined';

        Object.defineProperties(this, {
            path : {
                value : path,
                writable: false,
                enumerable: true
            },
            scriptId : {
                value : scriptId,
                writable : false,
                enumerable: !_iAmPage
            },
            rdoIdx : {
                value : this.type === MASTER_REF_TYPE ? _rdoFnToPath.indexOf(path) : undefined,
                writable: false,
                enumerable : false
            },
            ownerIdx : {
                value : ownerIndex,
                writable : false,
                enumerable : false
            },
            data : {
                value : {},
                writable : false,
                enumerable: true
            },
            label : {
                value : !_iAmPage ? $axure.pageData.scriptIdToObject[scriptId].label : undefined,
                writable : false,
                enumerable: !_iAmPage
            },
            page : {
                value : !_iAmPage ? _pathToContext['/'] : this,
                writable : false,
                enumerable: true
            },
            master : {
                value : this.type === MASTER_REF_TYPE ?
                    $axure.pageData.masters[$axure.pageData.scriptIdToObject[scriptId].masterId].name :
                    undefined,
                writable : false,
                enumerable: this.type === MASTER_REF_TYPE
            }
        });

        this.init();

    }

    ////////////////////////////////////////////////////////////////////////////////////
    // API mappings for a whole set
    ////////////////////////////////////////////////////////////////////////////////////

    // base prototype
    _defaultContext = Object.create(ScriptContext.prototype, {
        init : {
            value       : function() {return this;},
            writable    : true
        }
    });

    // mother of all masters
    _defaultMasterContext = Object.create(_defaultContext, {
        autostart : {
            value       : false,
            writable    : true
        }
    });

    API_MAP = {
        'referenceDiagramObject' : {
            protoroot    : _defaultMasterContext,
            include        : ['base'],
            names        : ['fireEvent'],
            methods        : [_fireEvent],
            flags        : [FL_ASIS]
        },
        'Axure:Page' : {
            names        : ['get', 'states', 'setVariable', 'getVariable'],
            methods        : [_getNewContext, _states, _setVariable, GetGlobalVariableValue],
            flags        : [FL_ASIS, FL_ASIS, FL_ASIS, FL_ASIS]
        },
        'dynamicPanel' : {
            include        : ['base'],
            names        : ['setVisibility', 'setState', 'setNextState', 'setPreviousState', 'getState', 'getStates', 'moveTo', 'moveBy', 'getRect'],
            methods        : [SetPanelVisibility, _setPanelState, SetPanelStateNext, SetPanelStatePrevious, _getPanelState, _getPanelStates, MoveWidgetTo, MoveWidgetBy, _getRect],
            flags        : [FL_PROXY, FL_PROXY | FL_THIS, FL_PROXY, FL_PROXY, FL_ASIS, FL_W, FL_PROXY, FL_PROXY, FL_ASIS],
            defaults    : {
                'setVisibility'        : ['', 'none', 500],
                'setState'            : [0, 'none', 'up', 500, 'none', 'up', 500],
                'setNextState'         : [false, 'none', 'up', 500, 'none', 'up', 500],
                'setPreviousState'     : [false, 'none', 'up', 500, 'none', 'up', 500],
                'moveTo'            : [0, 0, 'none', 500],
                'moveBy'            : [0, 0, 'none', 500]
            }
        },
        'hyperlink' : {
            include        : ['base', 'state', 'tooltips']
        },
        'richTextPanel' : {
            include        : ['axure-widget']
        },
        'buttonShape'    : {
            include        : ['axure-widget']
        },
        'textBox' : {
            include        : ['base', 'text']
        },
        'textArea' : {
            include        : ['base', 'text']
        },
        'imageBox'    : {
            include        : ['base']
        },
        'listBox' : {
            include        : ['base']
        },
        'comboBox' : {
            include        : ['base']
        },
        'checkbox' : {
            include        : ['base']
        },
        'inlineFrame' : {
            include        : ['base']
        },
        'imageMapRegion' : {
            include        : ['base', 'tooltips'],
            names        : ['scrollToThis'],
            methods        : [ScrollToWidget],
            flags        : [FL_PROXY],
            defaults    : {
                'scrollToThis'            : [false, true, 'none', 500]
            }
        },
        'axure-widget'  : {
            include        : ['base', 'rtf', 'state', 'tooltips']
        },
        'state' : {
            names        : ['setSelected', 'setNotSelected', 'disable', 'enable', 'getState', 'isSelected', 'isDisabled'],
            methods        : [SetWidgetSelected, SetWidgetNotSelected, DisableImageWidget, EnableImageWidget, GetWidgetCurrentState, IsWidgetSelected, IsWidgetDisabled],
            flags        : [FL_PROXY, FL_PROXY, FL_PROXY, FL_PROXY, FL_PROXY | FL_VAL, FL_PROXY | FL_VAL, FL_PROXY | FL_VAL]
        },
        'base' : {
            names        : ['get', 'getParent', 'getOwner'],
            methods        : [_getNewContext, _getParentContext, _getOwnerContext],
            flags        : [FL_ASIS, FL_ASIS, FL_ASIS]
        },
        'rtf'    : {
            names        : ['getText', 'getRtf', 'setRtf', 'setText', 'setCustomStyle'],
            methods        : [_getText, _getRtf, _setRtf, _setText, _setCustomStyle],
            flags        : [FL_PROXY | FL_VAL, FL_PROXY | FL_VAL, FL_PROXY, FL_PROXY, FL_PROXY],
            defaults    : {
            }
        },
        'text'    : {
            names        : ['getText', 'setText'],
            methods        : [_getText, _setText],
            flags        : [FL_PROXY | FL_VAL, FL_PROXY],
            defaults    : {
            }
        },
        'tooltips' : {
            names        : ['setTooltipText'],
            methods        : [_setTooltipText],
            flags        : [FL_PROXY]
        }
    };

    // helper turning Axure's functions into AxHoox methods
    function _createProxy(fn, flags, defaults) {
        defaults = defaults || [];
        return function() {
            var args = Array.prototype.slice.call(arguments).concat(defaults.slice(arguments.length)), r;
            args.unshift(this.scriptId);
            r = fn.apply(flags & FL_THIS ? this : null, args);
            return flags & FL_VAL ? r : this;
        };
    }

    // Prototype factory for every type defined in API_MAP
    function _getApiPrototype(type) {

        var s = API_MAP[type],
            sets,
            p,
            prop, props, propKeys,
            i, li, j, lj,
            ref;

        if (s instanceof ScriptContext) {
            return s;
        }

        sets = (s.include || []);
        p = s.protoroot;

        for (i = 0, li = sets.length; i < li; i++) {

            ref = _getApiPrototype(sets[i]);

            if (!p) {

                p = ref;

            } else if (!ref.isPrototypeOf(p)) {

                props = {};

                propKeys = Object.getOwnPropertyNames(ref);
                lj = propKeys.length;

                for (j = 0; j < lj; j++) {
                    prop = propKeys[j];
                    props[prop] = Object.getOwnPropertyDescriptor(ref, prop);
                }

                p = Object.create(p, props);

            }

        }

        props = {
            type : {
                value         : type,
                writable      : true,
                enumerable    : false
            }
        };

        if (s.names) {
            lj = s.names.length;
            for (j = 0; j < lj; j++) {
                prop = s.names[j];
                props[prop] = {
                    value       : s.flags[j] & FL_PROXY ? _createProxy(s.methods[j], s.flags[j], s.defaults && s.defaults[prop]) : s.methods[j],
                    writable    : s.flags[j] & FL_W,
                    enumerable  : false
                };
            }
        }

        s = API_MAP[type] = Object.create(p || _defaultContext, props);

        return s;

    }

    ////////////////////////////////////////////////////////////////////////////////////
    // Startup routines.
    // Turn on, tune in but not to let to get dropped out.
    ////////////////////////////////////////////////////////////////////////////////////

    // diagram object access

    // in case of ambiguity of a style settings recorded in diagram objects
    // we need to modify accessors from $axure.pageData.scriptIdToObject
    // and diagramObject.parent
    // to on the fly record access help information about associated script id
    // if an object is accessed through child's parent property
    function _parentAccessor() {
        if (this._accessHelpScriptId) {
            this._parent._accessHelpScriptId = GetShapeIdFromText(this._accessHelpScriptId);
        }
        return this._parent;
    }

    // style getter
    function _styleGetter() {
        if (this._accessHelpScriptId && !this._styleByScriptId[this._accessHelpScriptId] && this._style) {
            this._styleByScriptId[this._accessHelpScriptId] = $.extend(true, {}, this._style);
        }
        return this._accessHelpScriptId ? this._styleByScriptId[this._accessHelpScriptId] : this._style;
    }

    // style setter
    function _styleSetter(s) {
        if (this._accessHelpScriptId) {
            this._styleByScriptId[this._accessHelpScriptId] = s;
            if (!this._style) {
                this._style = $.extend(true, {}, s);
            }
        } else {
            this._style = s;
        }
    }

    // alltogether two ready to serve
    function _createStyleAccessors(diagramObject) {

        diagramObject._styleByScriptId = {};

        if (diagramObject.style) {
            diagramObject._style = diagramObject.style;
        }

        Object.defineProperty(diagramObject, 'style', {
            get : _styleGetter,
            set : _styleSetter,
            enumerable : true
        });
    }

    // and for $axure.pageData.scriptIdToObject access
    // only when more than one master's instance is present
    function _createAccessorsForScriptId(scriptId) {
        var diagramObject = $axure.pageData.scriptIdToObject[scriptId];
        Object.defineProperty($axure.pageData.scriptIdToObject, scriptId, {
            get : function() {
                diagramObject._accessHelpScriptId = scriptId;
                return diagramObject;
            },
            enumerable : true
        });
        if (diagramObject.isContained) {
            diagramObject._parent = diagramObject.parent;
            Object.defineProperty(diagramObject, 'parent', {
                get : _parentAccessor,
                enumerable : true
            });
        }
        _createStyleAccessors(diagramObject);
    }

    // traverse Axure's Document Object Model and get all the things we need
    // to be ready to provide future services in a safe and unobtrusive way
    function _traversePage() {
        var scriptIdx = 0, unlabeledIdx = 0;

        // tiny tiny helper
        function traverseDiagramObject(diagramObject, path, ownerIdx) {
            walkDiagramObjects(diagramObject.objects, path, ownerIdx);
        }

        // If you're not labelling your prototype's components
        // you get warnings and automatic labelling occurs.
        // Of course you do not need to have all object's
        // labelled but if you forget about those
        // which are subjects for scripting you can get
        // unpredictible results
        function warnNonLabeled(o, path) {
            var txt = 'Fixing non existent label for \n' +
            (o.type === MASTER_REF_TYPE ? 'Master:[' + $axure.pageData.masters[o.masterId].name + ']' : o.type) +
            '\n@' + path +
            '\nThe new label is ' + o.label +
            '\nand may appear in other paths.' +
            '\nBetter fix it in Axure.';
            console.warn(txt);
        }

        // main traversal, recursive
        function walkDiagramObjects(objects, path, ownerIdx) {
            var o, mo, po, newPath, scriptId, i, li, j;
            for (i = 0, li = objects.length; i < li; i++) {
                o = objects[i];
                if (o.isContained && o.type === RICH_TEXT_PANEL_TYPE && o.label.length === 0) {
                    o.label = 'txt';
                } else if (o.label.length === 0) {
                    unlabeledIdx++;
                    o.label = 'unlabeled-' + unlabeledIdx;
                    warnNonLabeled(o, path);
                }
                newPath = path + '/' + o.label;
                if (o.type === MASTER_REF_TYPE) {
                    _rdoFnToPath.push(newPath);
                    traverseDiagramObject($axure.pageData.masters[o.masterId].diagram, newPath, _rdoFnToPath.length - 1);
                    scriptId = $axure.pageData.objectPathToScriptId[scriptIdx].scriptId;
                } else {
                    scriptId = $axure.pageData.objectPathToScriptId[scriptIdx].scriptId;
                }

                if ( o.scriptIds.length > 1 ) {
                    _createAccessorsForScriptId(scriptId);
                }

                _pathToContext[newPath] = scriptId;
                _scriptIdToOwnerIndex[scriptId] = ownerIdx;
                _scriptIdToPath[scriptId] = newPath;
                scriptIdx++;

                if (o.type === DYNAMIC_PANEL_TYPE) {
                    for (j = o.diagrams.length - 1; j >= 0; j--) {
                        // traversing states from bottom to top
                        // to reflect real object placement in html
                        // I suppose. I wish ;)
                        traverseDiagramObject(o.diagrams[j], newPath, ownerIdx);
                    }
                } else if (o.type === BUTTON_SHAPE_TYPE || (o.type === RICH_TEXT_PANEL_TYPE && o.objects)) {
                    traverseDiagramObject(o, newPath, ownerIdx);
                }
            }
        }

        // we start with the root (page's) diagram
        traverseDiagramObject($axure.pageData.page.diagram, '', -1);

    }

    // Page context object should be operational from the very beginning
    function _initPageContext() {
        var p = '/',
            po = _pathToContext[p] = Object.create($axure.pageData.page._axHooxPageContext || _getApiPrototype(PAGE_TYPE));
        ScriptContext.call(po, p, undefined, -1);
        _currentCallInfo = {
            eventName     : null,
            path        : p
        };
    }

    // Hooking on to every Master's every possible custom event
    // Unfortunately we should check the whole window object.
    // Although master's magic numbers are no mystery to us any more
    // but the event's function's full names have to be settled.
    // Iterating through every window property separately is much
    // more time consuming then picking needles from this whole hay
    function _wrapRdoFunctions() {
        var wNames = ('' + Object.keys(window)).split(RDO_SPLIT_RX),
            i, l,
            r,
            fn, fName;

        l = wNames.length;
        i = 0;

        while (i < l) {

            fName = wNames[i];
            fn = window[fName];

            if (fn instanceof Function && (r = RDO_RX.exec(fName)) !== null) {

                window[fName] = _wrap(fn, {
                    eventName   : r[2],
                    path        : _rdoFnToPath[parseInt(r[1], 10)]
                });

                i += 2;

            } else {
                i++;
            }

        }
    }

    // Wrap up already established handlers for events
    // of elementary elements
    function _wrapEventHandlers() {
        $axure(function(o) {return o.type !== "referenceDiagramObject";}).getIds().forEach(function(scriptId) {
            EVENT_NAMES.forEach(function(eventName) {
                _wrapObjectEventHandlers(scriptId, eventName);
            });
        });
    }

    // And for special, dynamic panel's dragging, moving
    // showing and hiding animations callbacks
    function _wrapWidgetSpecialEventFunctions() {

        SPECIAL_EVENT_NAMES.forEach(function(eventName) {
            var scriptId, wc = window[eventName];
            for (scriptId in wc) {
                if (wc.hasOwnProperty(scriptId)) {
                    wc[scriptId] = _wrap(wc[scriptId], {
                        eventName   : eventName,
                        path        : _scriptIdToPath[scriptId]
                    });
                }
            }
        });

    }

    ////////////////////////////////////////////////////////////////////////////////////
    // The main hooking.
    // Handling setVariableValue requests
    ////////////////////////////////////////////////////////////////////////////////////

    // Helper chekcing if the right circumstances
    // occured
    function _handlerPrecheck(varname, value) {
            if (varname !== _triggeringVarName) {
                $axure.globalVariableProvider._setVariableValue.apply($axure.globalVariableProvider, arguments);
            } else if (value === PACKAGE) {
                console.warn(
                    "Probably you are using Google Chrome in local mode." +
                    "Strange things may happen. If they happen, switch to Firefox" +
                    "or put your work online and test through http."
                );
            } else if (!_currentCallInfo.args) {
                console.warn('Calling from unknown scope.');
            } else {
                return true;
            }
            return false;
    }

    // Helpers allowing functional
    // enhancements of prototype elements

    // For masters
    function prepareMasterContext(masterName, context) {
        Object.keys($axure.pageData.masters).some(function(mid) {
            var m = $axure.pageData.masters[mid];
            if (m.name !== masterName) {
                return false;
            }
            m._axHooxMasterContext = Object.create(_getApiPrototype(MASTER_REF_TYPE));
            $.extend(m._axHooxMasterContext, context);
            return true;
        });
    }

    // And for a page
    function preparePageContext(context) {
        $axure.pageData.page._axHooxPageContext = Object.create(_getApiPrototype(PAGE_TYPE));
        $.extend($axure.pageData.page._axHooxPageContext, context);
    }

    // Generate a unique id of an alphanumeric string
    // for having scripts being compiled only once.
    // CRC-32 hashing method seems to be reliable
    // and fast, enough to meet our expectations.
    function CRC32(s) {
        var iCRC = 0xFFFFFFFF, bytC, bytT, lngA, r, t = CRC32.aCRC32Table, i, l = s.length;
        for (i = 0; i < l; i++) {
            r = s.charCodeAt(i);
            do {
                bytC = r & 0xFF;
                bytT = (iCRC & 0xFF) ^ bytC;
                lngA = iCRC >>> 8;
                iCRC = lngA ^ t[bytT];
                r = r >>> 8;
            } while (r);
        }
        return '_' + ((iCRC ^ 0xFFFFFFFF) >>> 0).toString(16) + '_';
    }

    CRC32.aCRC32Table = [
        0x0, 0x77073096, 0xEE0E612C, 0x990951BA, 0x76DC419, 0x706AF48F, 0xE963A535, 0x9E6495A3,
        0xEDB8832, 0x79DCB8A4,    0xE0D5E91E, 0x97D2D988, 0x9B64C2B, 0x7EB17CBD, 0xE7B82D07, 0x90BF1D91,
        0x1DB71064, 0x6AB020F2, 0xF3B97148, 0x84BE41DE, 0x1ADAD47D, 0x6DDDE4EB, 0xF4D4B551, 0x83D385C7,
        0x136C9856, 0x646BA8C0, 0xFD62F97A, 0x8A65C9EC, 0x14015C4F, 0x63066CD9,    0xFA0F3D63, 0x8D080DF5,
        0x3B6E20C8, 0x4C69105E, 0xD56041E4, 0xA2677172, 0x3C03E4D1, 0x4B04D447, 0xD20D85FD, 0xA50AB56B,
        0x35B5A8FA, 0x42B2986C, 0xDBBBC9D6, 0xACBCF940, 0x32D86CE3, 0x45DF5C75, 0xDCD60DCF, 0xABD13D59,
        0x26D930AC, 0x51DE003A,    0xC8D75180, 0xBFD06116, 0x21B4F4B5, 0x56B3C423, 0xCFBA9599, 0xB8BDA50F,
        0x2802B89E, 0x5F058808, 0xC60CD9B2, 0xB10BE924,    0x2F6F7C87, 0x58684C11, 0xC1611DAB, 0xB6662D3D,
        0x76DC4190, 0x1DB7106, 0x98D220BC, 0xEFD5102A, 0x71B18589, 0x6B6B51F, 0x9FBFE4A5, 0xE8B8D433,
        0x7807C9A2, 0xF00F934, 0x9609A88E, 0xE10E9818, 0x7F6A0DBB, 0x86D3D2D, 0x91646C97, 0xE6635C01,
        0x6B6B51F4, 0x1C6C6162, 0x856530D8, 0xF262004E, 0x6C0695ED, 0x1B01A57B, 0x8208F4C1, 0xF50FC457,
        0x65B0D9C6, 0x12B7E950,    0x8BBEB8EA, 0xFCB9887C, 0x62DD1DDF, 0x15DA2D49, 0x8CD37CF3, 0xFBD44C65,
        0x4DB26158, 0x3AB551CE, 0xA3BC0074, 0xD4BB30E2,    0x4ADFA541, 0x3DD895D7, 0xA4D1C46D, 0xD3D6F4FB,
        0x4369E96A, 0x346ED9FC, 0xAD678846, 0xDA60B8D0, 0x44042D73, 0x33031DE5,    0xAA0A4C5F, 0xDD0D7CC9,
        0x5005713C, 0x270241AA, 0xBE0B1010, 0xC90C2086, 0x5768B525, 0x206F85B3, 0xB966D409, 0xCE61E49F,
        0x5EDEF90E, 0x29D9C998, 0xB0D09822, 0xC7D7A8B4, 0x59B33D17, 0x2EB40D81, 0xB7BD5C3B, 0xC0BA6CAD,
        0xEDB88320, 0x9ABFB3B6,    0x3B6E20C, 0x74B1D29A, 0xEAD54739, 0x9DD277AF, 0x4DB2615, 0x73DC1683,
        0xE3630B12, 0x94643B84, 0xD6D6A3E, 0x7A6A5AA8, 0xE40ECF0B, 0x9309FF9D, 0xA00AE27, 0x7D079EB1,
        0xF00F9344, 0x8708A3D2, 0x1E01F268, 0x6906C2FE, 0xF762575D, 0x806567CB, 0x196C3671, 0x6E6B06E7,
        0xFED41B76, 0x89D32BE0, 0x10DA7A5A, 0x67DD4ACC, 0xF9B9DF6F, 0x8EBEEFF9, 0x17B7BE43, 0x60B08ED5,
        0xD6D6A3E8, 0xA1D1937E, 0x38D8C2C4, 0x4FDFF252, 0xD1BB67F1, 0xA6BC5767, 0x3FB506DD, 0x48B2364B,
        0xD80D2BDA, 0xAF0A1B4C, 0x36034AF6, 0x41047A60, 0xDF60EFC3, 0xA867DF55, 0x316E8EEF, 0x4669BE79,
        0xCB61B38C, 0xBC66831A, 0x256FD2A0, 0x5268E236, 0xCC0C7795, 0xBB0B4703, 0x220216B9, 0x5505262F,
        0xC5BA3BBE, 0xB2BD0B28, 0x2BB45A92, 0x5CB36A04, 0xC2D7FFA7, 0xB5D0CF31, 0x2CD99E8B, 0x5BDEAE1D,
        0x9B64C2B0, 0xEC63F226, 0x756AA39C, 0x26D930A, 0x9C0906A9, 0xEB0E363F, 0x72076785, 0x5005713,
        0x95BF4A82, 0xE2B87A14, 0x7BB12BAE, 0xCB61B38, 0x92D28E9B, 0xE5D5BE0D, 0x7CDCEFB7, 0xBDBDF21,
        0x86D3D2D4, 0xF1D4E242, 0x68DDB3F8, 0x1FDA836E, 0x81BE16CD, 0xF6B9265B, 0x6FB077E1, 0x18B74777,
        0x88085AE6, 0xFF0F6A70, 0x66063BCA, 0x11010B5C, 0x8F659EFF, 0xF862AE69, 0x616BFFD3, 0x166CCF45,
        0xA00AE278, 0xD70DD2EE, 0x4E048354, 0x3903B3C2, 0xA7672661, 0xD06016F7, 0x4969474D, 0x3E6E77DB,
        0xAED16A4A, 0xD9D65ADC, 0x40DF0B66, 0x37D83BF0, 0xA9BCAE53, 0xDEBB9EC5, 0x47B2CF7F, 0x30B5FFE9,
        0xBDBDF21C, 0xCABAC28A, 0x53B39330, 0x24B4A3A6, 0xBAD03605, 0xCDD70693, 0x54DE5729, 0x23D967BF,
        0xB3667A2E, 0xC4614AB8, 0x5D681B02, 0x2A6F2B94, 0xB40BBE37, 0xC30C8EA1, 0x5A05DF1B, 0x2D02EF8D
    ];

    // Handling during warm up state
    // after issuing AxHooxPrepareMasterContext events on
    // Axhoox Status master's instances
    function _prepareMasterContextHandler(varname, value) {

        var args, masterContext, axObject, scriptParams, owner, scriptId, ord, shebang, crc, fn;

        if (!_handlerPrecheck.apply(null, arguments)) {
            return;
        }

        args = _currentCallInfo.args ? _currentCallInfo.args.slice() : [];

        scriptId = _pathToContext[_currentCallInfo.path];

        owner = scriptId instanceof ScriptContext ? $axure.pageData.page : $axure.pageData.scriptIdToObject[scriptId].owner;


        if (owner.type === 'Axure:Master') {
            if (owner.hasOwnProperty('_axHooxMasterContext')) {
                // already defined. nothing to do
                return;
            }
            owner._axHooxMasterContext = masterContext =  Object.create(_getApiPrototype(MASTER_REF_TYPE));
        }

        args.splice(0, 0, masterContext, prepareMasterContext, preparePageContext, _currentCallInfo.eventName);
        scriptParams = 'masterContext, prepareMasterContext, preparePageContext, eventName';

        ord = ((Object.keys(_scripts).length + 1) / 1000).toFixed(3).slice(-3);
        shebang = value.match(/\/\/#AXHOOX=(\S+)$/m);
        shebang = (shebang && ('_' + shebang[1])) || '';
        crc = CRC32(value);

        try {
            fn = _scripts[crc] || (_scripts[crc] = makeSandbox.call({
                scr : "(function usr_fn" + crc + "(" + scriptParams + ") {\n" + value + "\n});",
                name : USER_SCRIPT_NAME_PREFIX + ord + shebang
            }));
            fn.apply(null, args);
        } catch (e) {
            console.error(e);
        }

    }

    // Handling during runtime
    function _regularHandler(varname, value) {

        var args, ord, shebang, crc, fn;

        if (!_handlerPrecheck.apply(null, arguments)) {
            return;
        }

        args = _currentCallInfo.args ? _currentCallInfo.args.slice() : [];
        args.unshift(_currentCallInfo.eventName);
        args.unshift(_getContext(_currentCallInfo.path));

        ord = ((Object.keys(_scripts).length + 1) / 1000).toFixed(3).slice(-3);
        shebang = value.match(/\/\/#AXHOOX=(\S+)$/m);
        shebang = (shebang && ('_' + shebang[1])) || '';
        crc = CRC32(value);
        try {
            fn = _scripts[crc] || (_scripts[crc] = makeSandbox.call({
                scr : "(function usr_fn" + crc + "(scriptContext, eventName) {\n" + value + "\n});",
                name : USER_SCRIPT_NAME_PREFIX + ord + shebang
            }));
            fn.apply(null, args);
        } catch (e) {
            console.error(e.toString(), e.stack || '');
        }
    }

    // Handler set up and disposeal on an beforeunload event
    function _setHandler(handler, save) {
        if (save === true) {
            _savedSetVariableValueHandler = $axure.globalVariableProvider.setVariableValue;
            $(window).on('beforeunload', function() {
                $axure.globalVariableProvider.setVariableValue = _savedSetVariableValueHandler;
            });
        }

        $axure.globalVariableProvider.setVariableValue = handler;
    }

    // Only one small fix up
    function _fixAxureBugs() {

        var _GetCssStyleProperties = GetCssStyleProperties;
        window.GetCssStyleProperties = function GetCssStyleProperties(style) {
            var toApply = _GetCssStyleProperties(style);
            // fix for line spaacing default assumed as in Em
            if (toApply.parProps.lineHeight) {
                toApply.parProps.lineHeight += 'px';
            }
            // the same for font size
            if (toApply.runProps.fontSize) {
                toApply.runProps.fontSize += 'px';
            }

            return toApply;
        };
    }

    // Let's roll!
    function _init() {

        // Check if any of the variables will bring that magic key to us
        if (!$axure.globalVariableProvider.getDefinedVariables().some(function(v) {
            if ($axure.globalVariableProvider.getVariableValue(v) === PACKAGE) {
                _triggeringVarName = v;
                return true;
            }
        })) {
            // no triggering var. nothing to do.
            return;
        }

        // Fix what should be fixed.
        _fixAxureBugs();

        // Prepare what should be prepared
        _traversePage();
        _wrapRdoFunctions();
        _wrapEventHandlers();
        _wrapWidgetSpecialEventFunctions();

        // List of status master's instances
        var statusObjects = $axure(function(o) {
            return o.type === MASTER_REF_TYPE && $axure.pageData.masters[o.masterId].name === STATUS_MASTER;
        }).getIds();

        // Ready to handle warm up events
        _setHandler(_prepareMasterContextHandler, true);

        // raise prepare master context events
        statusObjects.forEach(function(sid) {
            _fireRemoteEvent(_scriptIdToPath[sid], PREPARE_MASTER_CONTEXT_EVENT);
        });

        // Set up regular handler after being warmed up
        _setHandler(_regularHandler);

        // Enable page object
        _initPageContext();

        // process instancess of masters with an autostart option
        $axure(function(o) {
            return o.type === MASTER_REF_TYPE &&
                $axure.pageData.masters[o.masterId]._axHooxMasterContext &&
                $axure.pageData.masters[o.masterId]._axHooxMasterContext.autostart;
        }).getIds().forEach(function(scriptId) {
            _getContext(_scriptIdToPath[scriptId]);
        });

        // Yes, we are ready for a runtime
        window[PACKAGE].init = true;

        // propagate ready events on all status instances
        statusObjects.forEach(function(sid) {
            _fireRemoteEvent(_scriptIdToPath[sid], STATUS_READY_EVENT);
        });
    }

    _init();

}(
    // package name
    'AXHOOX',
    // dependencies, we need them
    jQuery,
    // pretty much
    $axure,
    // console object safely faked in case of not present
    (function() {
        function noop() {}
        var con = console || {};
        ['log', 'error', 'warn'].forEach(function(p) {
            if (typeof(con[p]) !== 'function') {
                con[p] = noop;
            }
        });
        return con;
    }()),
    // sandboxing for uuser's script evaluation without letting to
    // have even a shadow a chance to break up the whole fragile piece above
    function() {
        this.scr += '\n//@ sourceURL=' + window.location.href.match(/(\S+\/)\S+$/)[1] + '__axhoox/' + this.name + '.js\n';
        return eval(this.scr);
    }
));
