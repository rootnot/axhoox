//#AXHOOX=axx:scrollbar-controller
/**
 * Universal scrollbar controller example.
 *
 * Contents of this file should be attached
 * to AxHooxPrepareMasterContext event of
 * axhoox-status or axhoox starter masters
 *
 * Controller instance when placed somewhere
 * inside the controled scrollbar master examines
 * if it's horizontal or vertical scrollbar
 *
 **/

var MASTER_DEFAULT_NAME = 'axx:scrollbar-controller';

// methods to attach to scrollbar
var OWNER_API_NAMES = ['activate', 'enable', 'disable', 'attachContent', 'getScroll', 'setScroll', 'onHandleHover', 'onHandleOut', 'onHandleDragStart', 'onHandleDrag', 'onHandleDragDrop', 'maxScroll', 'barMaxScroll'];

var API = {
    autostart : true,
    activate : activate,
    deactivate : deactivate,
    enable : enable,
    disable : disable,
    delayedDeactivation : delayedDeactivation,
    cancelDelayedDeactivation : cancelDelayedDeactivation,
    onHandleHover : onHandleHover,
    onHandleOut : onHandleOut,
    onHandleDragStart : onHandleDragStart,
    onHandleDragDrop : onHandleDragDrop,
    attachContent : attachContent,
    getScroll : getScroll,
    setScroll : setScroll,
    init : init
};

masterContext && $.extend(masterContext, API) || prepareMasterContext(MASTER_DEFAULT_NAME, API);

// constants
// names of dimmensioning properties
var _dimmensions = ['width', 'height', 'x', 'y'];
// a time to wait after mouseouts before deactivation
var deactivationDelay = 500;
// debouncing function / object to release load
function debounce(fn, delay) {
    if (!(this instanceof debounce)) {
        var _self = new debounce(fn, delay);
        return function() {
            _self._();
        };
    }
    var id;
    this._ = function() {
        if (!id) {
            id = setTimeout(function() {
                id = null;
                fn();
            }, delay);
        }
    };
}

function activate() {
    if (!this.data.active) {
        this.data.active = true;
        this.data.bar.get('dp-main').setState('active', 'fade', '', 300, 'fade', '', 300);
    }
    return this;
}

function deactivate(force) {
    if (this.data.active || force) {
        this.data.active = false;
        this.data.bar.get('dp-main').setState('idle', 'fade', '', 300, 'fade', '', 300);
    }
    return this;
}

function enable() {
    this.data.bar.get('dp-main/bs-activator').enable();
}

function disable() {
    this.data.bar.get('dp-main/bs-activator').disable();
}

function delayedDeactivation() {
    this.cancelDelayedDeactivation();
    this.deactivate();
}

function cancelDelayedDeactivation() {
    if (this.data.ddId) {
        clearTimeout(this.data.ddId);
        this.data.ddId = null;
    }
}

function onHandleHover() {
    if (this.data.handleDrag) {
        this.data.shouldDeactivateOnDrop = false;
    } else {
        this.cancelDelayedDeactivation();
    }
    return this;
}

function onHandleOut() {
    if (this.data.handleDrag) {
        this.data.shouldDeactivateOnDrop = true;
    } else {
        this.cancelDelayedDeactivation();
        this.data.ddId = setTimeout(delayedDeactivation.bind(this), deactivationDelay);
    }
    return this;
}

function onHandleDragStart() {
    this.data.handleDrag = true;
}

// private
function _updateContentPosition() {
    var coord = _dimmensions[this.data.barType + 2];
    var moveByParams = [0, 0];
    moveByParams[this.data.barType] = -this.data.scroll - this.data.content.getRect()[coord];
    this.data.content.moveBy.apply(this.data.content, moveByParams);
}

function _updateHandlePosition() {
    var coord = _dimmensions[this.data.barType + 2];
    var h = this.data.bar.get('dp-main/handle-idle');
	var currentHandlePos = h.getRect()[coord];
	var newHandlePos = this.data.scroll * this.data.barMaxScroll / this.data.maxScroll;
	var moveByParams = [0, 0];
	moveByParams[this.data.barType] = newHandlePos - currentHandlePos;
	// apply translation to handle
	h.moveBy.apply(h, moveByParams);
	// and the same to an invisible active handle
	h = this.data.bar.get('dp-main/handle-active');
	h.moveBy.apply(h, moveByParams);
}

function onHandleDrag() {
    var coord = _dimmensions[this.data.barType + 2];
    var pos = this.data.bar.get('dp-main/handle-active').getRect()[coord];
    pos = Math.min(this.data.barMaxScroll, Math.max(0, pos));
    var val = Math.round(pos / this.data.barMaxScroll * this.data.maxScroll);
    if (val !== this.data.scroll) {

        this.data.scroll = val;
        if (this.data.content) {
	        _updateContentPosition.bind(this)();
        }
        this.data.bar.fireEvent('OnChange', val);
    }
}

function onHandleDragDrop() {
    this.data.handleDrag = false;

    var h = this.data.bar.get('dp-main/handle-active');
    var hl = h.getRect()[_dimmensions[this.data.barType + 2]]; // handle location
    var d = hl < 0 ? -hl : hl > this.data.barMaxScroll ? this.data.barMaxScroll - hl : 0;

    if (d !== 0) {
        var moveByParams = [0, 0];
        moveByParams[this.data.barType] = d;
        // move handle in appropriate direction
        h.moveBy.apply(h, moveByParams);
        // reflect the same on an invisible idle handle
        h.moveBy.apply(this.data.bar.get('dp-main/handle-idle'), moveByParams);
    }

    if (this.data.shouldDeactivateOnDrop) {
        // run condition is happening sometimes and that's why we have forced deactivation
        this.deactivate(true);
    }

    return this;
}

function attachContent(cnt) {
    if (cnt.type !== 'dynamicPanel') {
        return;
    }
    this.data.content = cnt;
    var dim = _dimmensions[this.data.barType];
    this.data.maxScroll = cnt.getRect()[dim] - cnt.getParent().getRect()[dim];
}

function getScroll() {
    return this.data.scroll || 0;
}

function setScroll(v, triggerEvents) {
	v = Math.min(this.data.maxScroll, Math.max(0, v));
	if (v === this.data.scroll) {
		return;
	}
	this.data.scroll = v;
	_updateHandlePosition.bind(this)();
    if (this.data.content) {
        _updateContentPosition.bind(this)();
    }
    if (triggerEvents === true) {
        this.data.bar.fireEvent('OnChange', this.data.scroll);
    }
}

function init() {

    // assign owner as bar
    var bar = this.data.bar = this.getOwner();

    // set up internals
    // main rectangle
    var mr = bar.get('dp-main').getRect();
    // handle rectangle
    var hr = bar.get('dp-main/handle-active').getRect();
    if (mr.width > mr.height) {
        // horizontal scrollbars
        this.data.barType = 0;
        this.data.barMaxScroll = mr.width - hr.width;
    } else {
        // vertical scrollbars
        this.data.barType = 1;
        this.data.barMaxScroll = mr.height - hr.height;
    }

    this.data.maxScroll = 100;

    // debounce to gain better performance
    this.onHandleDrag = debounce(onHandleDrag.bind(this), 100);

   // provide visible API to owner
    OWNER_API_NAMES.forEach(function(prop) {
        var p = this[prop];
        if (typeof(p) === 'function') {
            // a method
            bar[prop] = p.bind(this);
        } else {
            // a data property
            var _selfData = this.data;
            Object.defineProperty(bar.data, prop, {
                get : function() {
                    return _selfData[prop];
                },
                set : function(v) {
                    _selfData[prop] = v;
                }
            });
        }
    }, this);

    // enable control
    this.enable();
}
