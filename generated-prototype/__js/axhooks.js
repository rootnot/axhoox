;(function($, $axure) {
    
    //debugger;
    
    //console.log('Starting...');
    
    console.log('starting...');
    
    var AX_QUERY = 'type=referenceDiagramObject';
    var EVENT_NAMES = ['click', 'mouseover', 'mouseout', 'change', 'keyup', 'focus', 'blur' ];
    
    var _q = $axure.query(AX_QUERY);
    
    var _rdoRx = /^rdo(\d+)(\D+)$/
    
    var _stack = [];
    
    
    // prepare new context stack object
    function _makeStackContext(domCtx, eventName, fnIdx) {
    	var axCtx = $axure.pageData.scriptIdToObject[domCtx.id];
    	return {
    		domCtx	: domCtx,
    		axCtx	: axCtx,
    		axIdx	: axCtx.scriptIds.indexOf(domCtx.id),
    		evName	: eventName,
    		fnIdx	: fnIdx || false
    	};
    }
    
	// wrap given function with context stack preparation and disposal
    function _wrap(fn, ctx) {
        // console.log('_wrap');
        return (function() {
            //console.log(ctx);
            _stack.push(ctx);
            fn.apply(this, arguments);
            _stack.pop();
            //console.log('Finished.');
        });
    }
    
    // wrap previously attached event handler(s)
    function _wrapEvent(scriptId, eventName) {
    	var domCtx = document.getElementById(scriptId);
    	var evInfo = $._data(domCtx, 'events');
    	if (!evInfo || !evInfo[eventName] || !evInfo[eventName].length) {
    		return;
    	}
    	
    	var $domCtx = $(domCtx);
    	
    	evInfo[eventName].forEach(function(ei) {
    		var handler = ei.handler;
    		var axCtx = $axure.pageData.scriptIdToObject[scriptId];
    		$domCtx.off(eventName, handler);
    		$domCtx.on(eventName, _wrap(handler, _makeStackContext(domCtx, eventName)));
    	});
    	
    	//console.log(scriptId, eventName, domCtx);
    	//console.dir($._data(domCtx, 'events'));
    	
    }
    
    // make a runtime wrap for future calls of $axure.eventManager.event(scriptId, function)
    // @param fn - previously used $axure.eventManager.event function
    // @param eventName - name of the event for context registration
    function _runtimeWrap(fn, eventName) {
        return (function(scriptId, finalFn) {
            return fn(scriptId, function() {
                _stack.push(_makeStackContext(document.getElementById(scriptId), eventName));
                finalFn.apply(this, arguments);
                _stack.pop();
            });
        });
    }
    
    
    // find a rdo function index for object satysfying objPath visible from givent context
    function _findNewContextScriptId(objPath, diagramElement, idIdx) {
    	
    	// find object with label == objPath
    	
    	for (var i = 0, n = diagramElement.objects.length; i < n; i++) {
    		if (diagramElement.objects[i].label === objPath && diagramElement.objects[i].scriptIds.length > idIdx) {
    			return diagramElement.objects[i].scriptIds[idIdx];
    		}
    	}
    	
    	// not found
    	return null;
    }
    
/***
    function __findNewContextScriptId(objPath, diagramElement, idIdx) {
    	var pathParts = objPath.split('/'), scriptId, label;
    	while(pathParts.length) {
    		label = pathParts.shift();
    		scriptId = scriptId ? _findByLabel(label, $axure.pageData.scriptIdToObject[scriptId]) _findByLabel(label, diagramElement, idIdx);
    	}
    }
***/

    function _findObjectId(objPath) {
        if (_stack.length) {
        	stackCtx = _stack[_stack.length - 1];
        	return _findNewContextScriptId(objPath, stackCtx.axCtx.parent, stackCtx.axIdx);
        } else {
        	// no stack - look from page context
        	return _findNewContextScriptId(objPath, $axure.pageData.page.diagram, 0);
        }
    }
    
    function _findObjectIdByPath(objPath) {
    	var a = $axure.pageData.objectPathToScriptId.sort(function(a,b) {
    		return a.idPath.length < b.idPath.length ? -1 : a.idPath.length > b.idPath.length ? 1 : 0;
    	})
    }
    
    function _makePathIndexes() {
    	console.log('_makePathIndexes');
    	var _pathToScriptId = {}, _scriptIdToPath = {}, _idPathToPath = {};
    	$axure.pageData.objectPathToScriptId.slice(0).sort(function(a,b) {
    		return a.idPath.length < b.idPath.length ? -1 : a.idPath.length > b.idPath.length ? 1 : 0;
    	}).forEach(function(e) {
    		
    		var idPath1 = e.idPath.slice(0, e.idPath.length - 1).join('-');
    		var oid = $axure.pageData.scriptIdToObject[e.scriptId].id;
    		var label = $axure.pageData.scriptIdToObject[e.scriptId].label;
    		var idPath = idPath1.length ? [idPath1, oid].join('-') : oid;
    		
    		var path = idPath1.length ? [_idPathToPath[idPath1], label].join('/') : label;
    		
    		_idPathToPath[idPath] = path;
    		_pathToScriptId[path] = e.scriptId;
    		_scriptIdToPath[e.scriptId] = path;
    		
    	});
    	
    	$.extend($axure.pageData, {
    		pathToScriptId : _pathToScriptId,
    		scriptIdToPath : _scriptIdToPath
    	});
    	
    	console.dir($axure);
    }
    
    _makePathIndexes();
    
    function _fireRemoteEvent(objPath, evName) {
        //debugger;
        
        console.log('_fireRemoteEvent:start')
        
        var scriptId, stackCtx, fn, fnIdx, fnName;
        
        scriptId = _findObjectId(objPath);
        
        if (!scriptId) {
        	// no such an object
	        console.log('_fireRemoteEvent:not found');
        	return;
        }
        
        console.log(scriptId);
        
        fnIdx = _q.$().index(document.getElementById(scriptId));
        fnName = 'rdo' + (fnIdx + 1) + evName;
        
        console.log(fnName)
        
        if (fnIdx != -1) {
            fn = window[fnName];
            if (fn instanceof Function) {
            	// call appropriate event handler
                fn();
            }
        }
        console.log('_fireRemoteEvent:end');
    }
    
    function _traverse() {
    	var fnIdx = 0, scriptIdx = 0;
    	var fnToPath = [], pathObj;
    	var scriptIdToPath = {};
    	var pathToScriptId = {};
    	
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
    				if (o.type === "referenceDiagramObject") {
						po.fnIdx = fnIdx;
						fnIdx ++;
						fnToPath.push(po);
						traverseDiagramObject($axure.pageData.masters[o.masterId].diagram, newPath);
	    				scriptId = $axure.pageData.objectPathToScriptId[scriptIdx].scriptId;
	    				po.scriptIdx = scriptIdx;
	    				po.scriptId = scriptId;
	    				po.docElement = document.getElementById(scriptId);
    				} else {
	    				scriptId = $axure.pageData.objectPathToScriptId[scriptIdx].scriptId;
    				} 
    				
    				pathToScriptId[newPath] = scriptId;
    				scriptIdToPath[scriptId] = newPath;
    				scriptIdx++;

    				if (o.type === "dynamicPanel") {
    					for (var j = 0, lj = o.diagrams.length; j < lj; j++) {
    						traverseDiagramObject(o.diagrams[j], newPath);
    					}
    				}
    			}
    		}
    	}
    	
		//debugger;
    	traverseDiagramObject($axure.pageData.page.diagram, '');
    	console.dir(fnToPath);
    	console.dir(pathToScriptId);
    	console.dir(scriptIdToPath);
    }
    
    _traverse();
    
    // create event wraps for existing event handlers
    $axure(function(o) {return o.type != "referenceDiagramObject";}).getIds().forEach(function(scriptId) {
	    EVENT_NAMES.forEach(function(eventName) {
	    	_wrapEvent(scriptId, eventName);
	    });
    })

    // wrap rdo###OnSomething functions
    Object.keys(window).forEach(function(k) {
        
        if (!(window[k] instanceof Function)) {
            return;
        }
        
        var r = _rdoRx.exec(k);
        var fnIdx, evName, domCtx;
        // console.log('Checking:' + k);
        if (r) {
            
            // console.log('Wrapping:' + k);
            
            fnIdx = parseInt(r[1]); // index parsed from function name
            evName = r[2]; // event name parsed from function name
            domCtx = _q.$().get(fnIdx - 1); // dom element associated with event emiter
            
            // console.log('Context prepared.')
            
            window[k] = _wrap(window[k], _makeStackContext(domCtx, evName, fnIdx));
            // console.log('Wrapped:' + k);
        }
    });
    
    // establish variable change listener
    $axure.messageCenter.addMessageListener(function(msg, data) {
    	if (msg === "setGlobalVar" && data.globalVarName === "OnRgMsg" && data.globalVarValue.length) {
    		console.log('Starting ...');
    		
    		var scriptContext = {
    			callingContext : _stack.length ? _stack[_stack.length - 1] : undefined,
    			fireRemoteEvent : _fireRemoteEvent,
    			findObjectId : _findObjectId
    		}
    		
    		var scr = "(function(scriptContext) {\n" + data.globalVarValue + "\n});";
    		$axure.globalVariableProvider.setVariableValue('OnRgMsg', '');
    		
    		try {
    			var fn = eval(scr);
    			fn(scriptContext);
    		} catch (e) {
    			console.log(e);
    		}
    		
    	}
    });
    
    // console.log('Functions wraped.');
    
    // console.log('Extending...');
    
    $.extend(true, window, {
        _rgUtils : {
            fireRemoteEvent :_fireRemoteEvent,
            findObjectId : _findObjectId
        }
    });
    
    // console.log(window._rgUtils);
    
})(jQuery, $axure);
//@ sourceURL=__js/apitest.js