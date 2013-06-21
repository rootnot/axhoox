;(function($, $axure) {
    
    //debugger;
    
    //console.log('Starting...');
    
    console.log('starting...');
    
    // constants
    
    var PACKAGE = 'AXHOOX';
    
    // object type that is a master reference
    var MASTER_REF_TYPE = 'referenceDiagramObject';
    
    // object type that is a dynamic panel reference
    var PANEL_REF_TYPE = 'dynamicPanel';
    
    // event names for hooks
    var EVENT_NAMES = ['click', 'mouseover', 'mouseout', 'change', 'keyup', 'focus', 'blur' ];
    
    // regexp for querying rdo##AAA type functions
    var RDO_RX = /^rdo(\d+)(\D+)$/;
    
    
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
    function _saveCallInfo(callInfo) {
		callInfo.restore = _makeRestoreFn(_currentCallInfo);
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
    		_saveCallInfo(callInfo);
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
		
		path = path || this.path;
		
		var rdoIdx = _rdoFnToPath.indexOf(path);
		var fn = rdoIdx !== -1 && window['rdo' + rdoIdx + eventName];
		
		if (fn instanceof Function) {
			fn();
		}
		
		return this;
		
	}
	
	
	// methods
	
	function _fireEvent(eventName) {
		_fireRemoteEvent(this.path, eventName);
	}
	
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
	
	// API mapping sets
	var API_MAP = {
		'referenceDiagramObject' : {
			names		: ['fireEvent'],
			methods		: [_fireEvent]
		},
		'Axure:Page' : {
			names		: ['get'],
			methods		: [_getNewContext]
		},
		'default' : {
			names		: ['get', 'getParent'],
			methods		: [_getNewContext, _getParentContext]
		}
	}
	
	function _createApi(o, sets, addDefaults) {
		
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
				o[s.names[j]] = s.methods[j];
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
    		console.log('traverseDiagramObject:' + path);
    		console.dir(diagramObject);
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
    	
		//debugger;
    	traverseDiagramObject($axure.pageData.page.diagram, '');
    	
    	console.dir(_rdoFnToPath);
    	console.dir(_pathToContext);
    	console.dir(_scriptIdToPath);
    	
    	for (var i = 0, l = _rdoFnToPath.length; i < l; i++) {
    		_rdoFnToPath[i] = _rdoFnToPath[i].path;
    	}
    	
    	console.dir(_rdoFnToPath);
    	
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

	function _startMainHandler(_triggeringVarName) {
		
		var handlerEnabled;
		
		function handleVarChange(msg, data) {
			
			if (!handlerEnabled) {
				return;
			}
			
			
	    	if (msg === "setGlobalVar" && data.globalVarName === _triggeringVarName) {
	    		console.log('Starting ...');
	    		
	    		var scriptContext = _getContext(_currentCallInfo.path);
	    		
	    		var scr = "(function(scriptContext) {\n" + data.globalVarValue + "\n});";
	    		
	    		handlerEnabled = false;
	    		$axure.globalVariableProvider.setVariableValue(_triggeringVarName, '');
	    		handlerEnabled = true;
	    		
	    		try {
	    			var fn = eval(scr);
	    			fn(scriptContext);
	    		} catch (e) {
	    			console.log(e);
	    		}
	    		
	    	}
	    }
	    
	    $axure.messageCenter.addMessageListener(handleVarChange);
		
		handlerEnabled = true;
	    
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
    	_startMainHandler(_triggeringVarName);
    	
    	window[PACKAGE].init = true;
    }
    
    if (!Object.hasOwnProperty(window, PACKAGE)) {
    	_init();
    }
    
    // console.log(window._rgUtils);
    
})(jQuery, $axure);
//@ sourceURL=__js/axhoox.js