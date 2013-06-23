;(function($, $axure) {
    
    //debugger;
    
    //console.log('Starting...');
    
    // constants
    
    var PACKAGE = 'AXHOOX';
    
    // object type that is a master reference
    var MASTER_REF_TYPE = 'referenceDiagramObject';
    
    // object type that is a dynamic panel reference
    var PANEL_REF_TYPE = 'dynamicPanel';
    
    // event names for hooks
    var EVENT_NAMES = ['click', 'mouseover', 'mouseout', 'change', 'keyup', 'focus', 'blur' ];
    
    // special events
    var SPECIAL_EVENT_NAMES = [
		'widgetIdToDragDropFunction',
		'widgetIdToDragFunction',
		'widgetIdToHideFunction',
		'widgetIdToMoveFunction',
		'widgetIdToPanelStateChangeFunction',
		'widgetIdToShowFunction',
		'widgetIdToStartDragFunction',
		'widgetIdToSwipeLeftFunction',
		'widgetIdToSwipeRightFunction',		
	];

    
    // regexp for querying rdo##AAA type functions
    var RDO_RX = /^rdo(\d+)(\D+)$/;
    
    // status master name
    var STATUS_MASTER = 'axhoox-status';
    
    // status ready event
    var STATUS_READY_EVENT = 'AxHooxReady';
    
    
    // runtime vars
    
    var _scriptIdToPath = {};
    var _pathToContext = {};
    var _rdoFnToPath = [];
    
    var _currentCallInfo;
    
    
    // preserving calling information
    
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
    		args	: args
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
    	return (function() {
    		_saveCallInfo(callInfo, Array.prototype.slice.call(arguments));
    		fn.apply(this, arguments);
    		_restoreCallInfo();
    	})
    }
    
    // wrap an rdo function
    function _wrapRdoFn(rdoIdx, eventName) {
    	var rdoName = 'rdo' + rdoIdx + eventName;
    	var fn = window[rdoName];
    	
    	window[rdoName] = _wrap(window[rdoName], {
    		eventName 	: eventName,
    		path		: _rdoFnToPath[rdoIdx]
    	});
    }
    
    // wrap all handlers for provided eventName and scriptId
    function _wrapObjectEventHandlers(scriptId, eventName) {
    	var domCtx = document.getElementById(scriptId);
    	var evInfo = $._data(domCtx, 'events');
    	
    	if (!evInfo || !evInfo[eventName] || !evInfo[eventName].length) {
    		// no handlers, return
    		return;
    	}
    	
    	var $domCtx = $(domCtx);
    	
    	evInfo[eventName].forEach(function(ei) {
    		var handler = ei.handler;
    		var axCtx = $axure.pageData.scriptIdToObject[scriptId];
    		$domCtx.off(eventName, handler);
    		$domCtx.on(eventName, _wrap(handler, {
	    		eventName 	: eventName,
	    		path		: _scriptIdToPath[scriptId]
    		}));
    	});
    	
    }


/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Context API
/////////////////////////////////////////////////////////////////////////////////////////////////////////

	// agnostics (low level)

    // return context object for given path
    function _getContext(path) {
    	if (typeof(_pathToContext[path]) === 'string') {
    		// lazy evauation on a path basis
    		_pathToContext[path] = new Context(path, _pathToContext[path]);
    	}
    	
    	return _pathToContext[path];
    }
    
	function _fireRemoteEvent(path, eventName) {
		
		var args = Array.prototype.slice.call(arguments, 2);
		
		var rdoIdx = _rdoFnToPath.indexOf(path);
		var fn = rdoIdx !== -1 && window['rdo' + rdoIdx + eventName];
		
		if (fn instanceof Function) {
			fn.apply(null, args);
		}
	}
	
	
	// methods
	
	// for masters
	function _fireEvent(eventName) {
		var args = Array.prototype.slice.call(arguments);
		args.unshift(this.path);
		_fireRemoteEvent.apply(null, args);
	}
	
	// common set
	function _getNewContext(newPath) {
		if (newPath.charAt(0) === '/') {
			// absolute path
			return _getContext(newPath);
		} else {
			return _getContext(this.path + '/' + newPath);
		}
	}
	
	function _getParentContext() {
		var path = this.path;
		if (path.length > 1){
			path = path.split('/').slice(0, -1).join('/');
			return _getNewContext(path);
		} else {
			return this;
		}
	}
	
	// for dynamic panels
	
	// persist states array in Context instance
	function _fixPanelStates(states) {
		Object.defineProperty(this, 'getStates', {
			value : function() {
				return states.concat();
			},
			writable : false,
			enumerable : false
		});
	}
	
	// aquire states array
	function _getPanelStates() {
		var axCtx = $axure.pageData.scriptIdToObject[this.scriptId];
		var s = [];
		for (var i = 0, l = axCtx.diagrams.length; i < l; i++) {
			s.push(axCtx.diagrams[i].label);
		}
		_fixPanelStates.call(this, s);
		return this.getStates();
	}
	
	// get current state of dynamic panel
	function _getPanelState() {
		var sid = GetPanelState(this.scriptId);
		var m = sid.match(/^pd(\d+)u\d+$/);
		if (m) {
			return this.getStates()[parseInt(m[1])];
		} else {
			return '';
		}
	}
	
	function _setPanelState(scriptId, s) {
		var states = this.getStates(), i = -1;
		if (typeof(s) === 'number' && s < states.length) {
			i = s;
		} else {
			i = states.indexOf(s);
		}
		if (i !== -1) {
			var args = Array.prototype.slice.call(arguments);
			args[1] = 'pd' + i + scriptId;
			SetPanelState.apply(null, args);
		}
	}
	
	
	//debugger;
	// flags for API method creation
	var FL_NONE = 0x0000;	// take as is - given function is ready serve as a method
	var FL_PROXY = 0x0001;	// wrap with a proxy function which create appropriate scope 
	var FL_VAL = 0x0002;	// method should return a value instead of default context object return 
	var FL_W = 0x0004;		// writable
	var FL_THIS = 0x0008	// apply proxied fn to this
	var FL_ALL = 0xFFFF;	// future use - all flags enabled
	
	// API mapping sets
	var API_MAP = {
		'referenceDiagramObject' : {
			names		: ['fireEvent'],
			methods		: [_fireEvent],
			flags		: [FL_NONE]
		},
		'Axure:Page' : {
			names		: ['get'],
			methods		: [_getNewContext],
			flags		: [FL_VAL]
		},
		'dynamicPanel' : {
			names		: ['setVisibility', 'setState', 'setNextState', 'setPreviousState', 'getState', 'getStates'],
			methods		: [SetPanelVisibility, _setPanelState, SetPanelStateNext, SetPanelStatePrevious, _getPanelState, _getPanelStates],
			flags		: [FL_PROXY, FL_PROXY | FL_THIS, FL_PROXY, FL_PROXY, FL_VAL, FL_W],
			defaults	: {
				'setVisibility'		: ['toggle', 'none', 0],
				'setState'			: [0, 'none', '', 0, 'none', '', 0],
				'setNextState' 		: [false, 'none', '', 0, 'none', '', 0],
				'setPreviousState' 	: [false, 'none', '', 0, 'none', '', 0]
			}
		},
		'textBox' : {
			names		: [],
			methods		: [],
			flags		: []
		},
		'textArea' : {
			names		: [],
			methods		: [],
			flags		: []
		},
		'listBox' : {
			names		: [],
			methods		: [],
			flags		: []
		},
		'comboBox' : {
			names		: [],
			methods		: [],
			flags		: []

		},
		'checkbox' : {
			names		: [],
			methods		: [],
			flags		: []
		},
		'default' : {
			names		: ['get', 'getParent'],
			methods		: [_getNewContext, _getParentContext],
			flags		: [FL_NONE, FL_NONE]
		}
	}
	
	function _createProxy(fn, flags, defaults) {
		defaults = defaults || [];
		return function() {
			var args = Array.prototype.slice.call(arguments).concat(defaults.slice(arguments.length));
			//args = args.concat(defaults.slice(args.length));
			args.unshift(this.scriptId);
			var r = fn.apply(flags & FL_THIS ? this : null, args);
			return flags & FL_VAL ? r : this;
		};
	}
	
	function _createApi(o, sets, addDefaults) {
		
		//debugger;
		
		addDefaults = addDefaults === false ? false : true;
		
		sets = $.isArray(sets) ? sets : [sets];
		
		if (addDefaults) {
			sets.unshift('default');
		}
		
		for (var i = 0, li = sets.length; i < li; i++) {
			var s = API_MAP[sets[i]];
			if (typeof(s) === 'undefined') {
				continue;
			}
			for (var j = 0, lj = s.names.length; j < lj; j++) {
				
				if (s.flags[j] & FL_PROXY) {
					s.methods[j] = _createProxy(s.methods[j], s.flags[j], s.defaults && s.defaults[s.names[j]]);
					s.flags[j] &= ~FL_PROXY;
				}
				
				Object.defineProperty(o, s.names[j], {
					value 		: s.methods[j],
					writable	: s.flags[j] & FL_W,
					enumerable	: false
				});
			}
		}
		
	}
    
    // Context class
    function Context(path, scriptId) {
    	
    	var _iAmPage = typeof(scriptId) === 'undefined';
    	var type = !_iAmPage ? $axure.getTypeFromScriptId(scriptId) : $axure.pageData.page.type;
    	
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
    		type : {
    			value : type,
    			writable : false,
    			enumerable: true

    		},
    		master : {
    			value : type === MASTER_REF_TYPE ? $axure.pageData.masters[$axure.pageData.scriptIdToObject[scriptId].masterId].name : undefined,
    			writable : false,
    			enumerable: type === MASTER_REF_TYPE
    		}
    	});
    	
    	_createApi(this, type, !_iAmPage);
    	
    }
    
/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Initialization
/////////////////////////////////////////////////////////////////////////////////////////////////////////

    // traverse axure object model and record appropriate values 
    function _traversePage() {
    	var fnIdx = 0, scriptIdx = 0;
    	var pathObj;
    	
    	function traverseDiagramObject(diagramObject, path) {
    		//console.log('traverseDiagramObject:' + path);
    		//console.dir(diagramObject);
    		walkDiagramObjects(diagramObject.objects, path);
    	}
    	
    	function walkDiagramObjects(objects, path) {
    		var o, mo, po, newPath, scriptId;
    		for (var i = 0, li = objects.length; i < li; i++) {
    			o = objects[i];
    			if (typeof(o.label) !== "undefined") {
    				newPath = path + '/' + o.label;
					po = {
						path : newPath
					}
    				if (o.type === MASTER_REF_TYPE) {
						po.fnIdx = fnIdx;
						fnIdx ++;
						_rdoFnToPath.push(po);
						traverseDiagramObject($axure.pageData.masters[o.masterId].diagram, newPath);
	    				scriptId = $axure.pageData.objectPathToScriptId[scriptIdx].scriptId;
	    				po.scriptIdx = scriptIdx;
	    				po.scriptId = scriptId;
	    				po.docElement = document.getElementById(scriptId);
    				} else {
	    				scriptId = $axure.pageData.objectPathToScriptId[scriptIdx].scriptId;
    				} 
    				
    				_pathToContext[newPath] = scriptId;
    				_scriptIdToPath[scriptId] = newPath;
    				scriptIdx++;

    				if (o.type === PANEL_REF_TYPE) {
    					for (var j = 0, lj = o.diagrams.length; j < lj; j++) {
    						traverseDiagramObject(o.diagrams[j], newPath);
    					}
    				}
    			}
    		}
    	}
    	
    	traverseDiagramObject($axure.pageData.page.diagram, '');
    	
    	for (var i = 0, l = _rdoFnToPath.length; i < l; i++) {
    		_rdoFnToPath[i] = _rdoFnToPath[i].path;
    	}
    	
    }

	function _initPageContext() {
		var p = '/';
    	_pathToContext[p] = new Context(p);
    	_currentCallInfo = {
    		eventName 	: null,
    		path		: p
    	};
	}

	function _wrapRdoFunctions() {
	    Object.keys(window).forEach(function(k) {
	        
	        if (!(window[k] instanceof Function)) {
	            return;
	        }
	        
	        var r = RDO_RX.exec(k);
	        var fnIdx, evName, domCtx;
	        // console.log('Checking:' + k);
	        if (r) {
	            
	            // console.log('Wrapping:' + k);
	            _wrapRdoFn(parseInt(r[1]), r[2]);
	            
	        }
	    });
	}
	
    // create event wraps for existing event handlers
	function _wrapEventHandlers() {
	    $axure(function(o) {return o.type != "referenceDiagramObject";}).getIds().forEach(function(scriptId) {
		    EVENT_NAMES.forEach(function(eventName) {
		    	_wrapObjectEventHandlers(scriptId, eventName)
		    });
	    });
	}
	
	function _wrapWidgetSpecialEventFunctions() {
		
		SPECIAL_EVENT_NAMES.forEach(function(eventName) {
			for (var scriptId in window[eventName]) {
				window[eventName][scriptId] = _wrap(window[eventName][scriptId], {
    				eventName 	: eventName,
    				path		: _scriptIdToPath[scriptId]
    			});
			}
		})
		
	}
	
	function _startMainHandler(_triggeringVarName) {
		var _setVariableValue = $axure.globalVariableProvider.setVariableValue;
		
		
		// this is the main hook
		$axure.globalVariableProvider.setVariableValue = function(varname, value) {
			if (varname !== _triggeringVarName) {
				return _setVariableValue.apply($axure.globalVariableProvider, arguments);
			}
			console.log('Starting ...');
			
			var args = _currentCallInfo.args.slice();
			args.unshift(_currentCallInfo.eventName);
			args.unshift(_getContext(_currentCallInfo.path));
			
			var scr = "(function(scriptContext, eventName) {\n" + value + "\n});";
			
			try {
				var fn = eval(scr);
				fn.apply(null, args);
			} catch (e) {
				console.dir(e);
			}
		}
		
	}

    
    function _init() {
    	
    	window[PACKAGE] = {
    		init	: false
    	};

		var _triggeringVarName;
		
		if (!$axure.globalVariableProvider.getDefinedVariables().some(function(v) {
			if ($axure.globalVariableProvider.getVariableValue(v) === PACKAGE) {
				_triggeringVarName = v;
				return true;
			}
		})) {
			// no triggering var. nothing to do.
			return;
		}

    	_traversePage();
    	_initPageContext();
    	_wrapRdoFunctions();
    	_wrapEventHandlers();
    	_wrapWidgetSpecialEventFunctions();
    	_startMainHandler(_triggeringVarName);
    	
    	window[PACKAGE].init = true;
    	
    	// propagate ready events on all status instances
    	$axure(function(o) {
    		return o.type === MASTER_REF_TYPE && $axure.pageData.masters[o.masterId].name === STATUS_MASTER;
    	}).getIds().forEach(function(sid) {
    		_fireRemoteEvent(_scriptIdToPath[sid], STATUS_READY_EVENT);
    	});
    }
    
    if (!Object.hasOwnProperty(window, PACKAGE)) {
    	_init();
    }
    
})(jQuery, $axure);
//@### sourceURL=__js/axhoox.js