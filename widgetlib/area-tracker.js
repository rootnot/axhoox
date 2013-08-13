/**
 * Area Tracker keeps information about mouse movements
 * over widgets provided for tracking.
 * 
 * Many widgets can be added to a single instance
 * of Area tracker, then mouse actions OnMouseEnter and OnMouseOut 
 * on any of them will trigger corresponding events on it.
 * 
 * Widgets added for tracking do not have to be
 * in the foreground so you can create invisible areas  
 * not influencing with other widgets of prototype.
 * 
 * 50 miliseconds of mouse inactivity should occur to propagate
 * mouse over / mouse out change on an Area Tracker for a group 
 * of tracking widgets. 
 * 
 * Non rectangle shapes are treated as rectangles with areas
 * corresponding to their bounds.
 */


// widget info
var MASTER_DEFAULT_NAME = 'axx:area-tracker';

var API = {
    addTrack : addTrack,
    removeTrack : removeTrack,
    getTracks : getTracks,
    popTrack : popTrack,
    init : init
}

masterContext && $.extend(masterContext, API) || prepareMasterContext(MASTER_DEFAULT_NAME, API);

// constants
var CHECK_INTERVAL = 50; 
var EVENTS = ['OnMouseOut', 'OnMouseEnter'];

// runtime
var areas = {}, changedInstances = {};
var mouseX, mouseY, mouseChange = false;
var checkId;


// data structure

function TrackArea(scriptId) {
	var $w = $('#' + scriptId);
	var o = $w.offset();
	this.scriptId = scriptId;
	this.t = o.top;
	this.l = o.left;
	this.b = o.top + $w.height();
	this.r = o.left + $w.width();
	this.instances = {};
	this.hovered = false;
}

TrackArea.prototype = {
	check:function(x, y) {
		var hovered = x >= this.l && x <= this.r && y >= this.t && y <= this.b;
		if (hovered !== this.hovered) {
			this.hovered = hovered;
			for (var i in this.instances) {
				if (!changedInstances[i]) {
					changedInstances[i] = {
						instance : this.instances[i],
						hovered : hovered
					};
				} else {
					delete changedInstances[i];
				}
			}
		}
	},
	addInstance : function(instance) {
		this.instances[instance.scriptId] = instance;
	},
	removeInstance : function(instance) {
		if (this.instances[instance.scriptId]) {
			delete this.instances[instance.scriptId];
		}
		if (!this.instances.length) {
			this.remove();
		}
	},
	remove : function() {
		delete areas[this.scriptId];
	}
};

// class methods

function mouseTracker(e) {
	// console.log('mouseTracker');
	clearTimeout(checkId);
	mouseChange = mouseChange || (mouseX !== e.pageX) || (mouseY !== e.pageY);
	mouseX = e.pageX;
	mouseY = e.pageY;
	checkId = setTimeout(areaCheck, CHECK_INTERVAL);
}

function areaCheck() {
	if (!mouseChange) {
		return;
	}
	stopTrack();
	var id, i;
	
	for (id in areas) {
		areas[id].check(mouseX, mouseY);
	}
	
	for (id in changedInstances) {
		i = changedInstances[id];
		delete changedInstances[id];
		i.instance.data.hovered = i.hovered;
		i.instance.fireEvent([EVENTS[Number(i.hovered)]]);	
	}
	mouseChange = false;
	startTrack();
}

function startTrack() {
	// checkId = setInterval(areaCheck, CHECK_INTERVAL);
	$(window).on('mousemove', mouseTracker);
}

function stopTrack() {
	// clearInterval(checkId);
	$(window).off('mousemove', mouseTracker);
}

// instance methods

function addTrack(widget) {
    
    if (this.data.tracks.indexOf(widget.path) !== -1) {
        return;
    }
    
    this.data.tracks.push(widget.path);
	
	if (!areas.length) {
		startTrack();
	}
	
	if (!areas[widget.scriptId]) {
		areas[widget.scriptId] = new TrackArea(widget.scriptId);
	}
	
	areas[widget.scriptId].addInstance(this);
	return this;
	
}

function removeTrack(widget, force) {
    
    var tidx = this.data.tracks.indexOf(widget.path);
    
    if (tidx === -1 && force !== true) {
        return;
    } else if (tidx !== -1) {
        this.data.tracks.splice(tidx, 1);
    }
    
	if (areas[widget.scriptId]) {
		areas[widget.scriptId].removeInstance(this);
		if (!areas.length) {
			stopTrack();
		}
	}
	return this;
}

function getTracks() {
    return this.data.tracks.slice();
}

function popTrack() {
    if (this.data.tracks.length) {
        this.removeTrack(this.get(this.data.tracks.pop()), true);
    }
    return this;
}

function init() {
    this.data.tracks = [];
    Object.defineProperty(this, 'trackcount', {
        get : function() {
            return this.data.tracks.length;
        }
    });
    Object.defineProperty(this, 'trackedAreasHovered', {
        get : function () {
            return this.data.hovered;
        }
    });
}

