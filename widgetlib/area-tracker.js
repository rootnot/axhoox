/**
 * Area tracker keeps information about mouse movements
 * over widgets provided for tracking.
 * Every time when mouse enters or lives tracking widget
 * the OnMouseEnter or OnMouseOut event is fired
 */

// constants
var MASTER_NAME = 'axx:area-tracker';
var CHECK_INTERVAL = 500; 
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
	mouseChange = false;
	var id, i;
	
	for (id in areas) {
		areas[id].check(mouseX, mouseY);
	}
	
	for (id in changedInstances) {
		i = changedInstances[id];
		delete changedInstances[id];
		i.instance.fireEvent([EVENTS[Number(i.hovered)]]);	
	}
	
}

function startCheck() {
	// checkId = setInterval(areaCheck, CHECK_INTERVAL);
	$(document.body).on('mousemove', mouseTracker);
}

function stopCheck() {
	// clearInterval(checkId);
	$(document.body).off('mousemove', mouseTracker);
}

// instance methods

function addTrack(widget) {
	
	if (!areas.length) {
		startCheck();
	}
	
	if (!areas[widget.scriptId]) {
		areas[widget.scriptId] = new TrackArea(widget.scriptId);
	}
	
	areas[widget.scriptId].addInstance(this);
	
}

function removeTrack(widget) {
	if (areas[widget.scriptId]) {
		areas[widget.scriptId].removeInstance(this);
		if (!areas.length) {
			stopCheck();
		}
	}
}

var api = {
	addTrack : addTrack,
	removeTrack : removeTrack
};


if (prepareMasterContext === arguments[0]) {
	// this is tricky. checking for masterContext presence generates reference error
	// when the var is not in any reachable scope
	// and there's now other than try catch way to check 
	prepareMasterContext(MASTER_NAME, api);
} else {
	$.extend(masterContext, api);
}
